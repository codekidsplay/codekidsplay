import { experimental_generateSpeech as generateSpeech } from 'ai'
import { gateway } from '@ai-sdk/gateway'
import { google } from '@ai-sdk/google'
import { readFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'
import { createHash } from 'crypto'
import { put, head } from '@vercel/blob'
import { TINKERCAD_LESSON_COUNT } from '@/lib/tinkercad'
import { speechJsonResponse, type ScratchM1SpeechResult } from '@/lib/scratchM1Tts'

const PROFILE = 'tinkercad-naratie-v1'
/** OpenAI TTS acceptă maximum 4096 de caractere; rămânem sub limită. */
const MAX_CHARS = 3500

function modulDir(modul: number) {
  return path.join(process.cwd(), 'content', 'lectii', 'tinkercad', `modul${modul}`)
}

/** Găsește fișierul de narație pentru lecția N (L<N>-*.naratie.txt). */
function naratiePath(modul: number, lesson: number): string | null {
  const dir = modulDir(modul)
  if (!existsSync(dir)) return null
  const prefix = `L${lesson}-`
  const file = readdirSync(dir).find(f => f.startsWith(prefix) && f.endsWith('.naratie.txt'))
  return file ? path.join(dir, file) : null
}

function hashText(modul: number, lesson: number, text: string) {
  return createHash('sha256')
    .update(`${PROFILE}\nm${modul}\nl${lesson}\n${text}`)
    .digest('hex')
    .slice(0, 16)
}

export async function getCachedUrl(dir: string, hash: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  for (const ext of ['mp3', 'wav'] as const) {
    const pathname = `${dir}/${hash}.${ext}`
    try {
      const meta = await head(pathname)
      if (meta?.url) return meta.url
    } catch {
      /* miss */
    }
  }
  return null
}

export async function saveAudio(
  dir: string,
  hash: string,
  bytes: Uint8Array,
  mediaType: string,
): Promise<string> {
  const ext = mediaType.includes('wav') ? 'wav' : 'mp3'
  const contentType = ext === 'wav' ? 'audio/wav' : 'audio/mpeg'
  const pathname = `${dir}/${hash}.${ext}`

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(pathname, Buffer.from(bytes), {
      access: 'public',
      contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return blob.url
  }

  const b64 = Buffer.from(bytes).toString('base64')
  return `data:${contentType};base64,${b64}`
}

/** Împarte textul pe paragrafe, în bucăți de cel mult MAX_CHARS. */
export function splitForTts(text: string, max = MAX_CHARS): string[] {
  const chunks: string[] = []
  let cur = ''
  const push = () => {
    if (cur.trim()) chunks.push(cur.trim())
    cur = ''
  }
  const parts: string[] = []
  for (const para of text.split(/\n{2,}/)) {
    if (para.length <= max) {
      parts.push(para)
    } else {
      // paragraf prea lung: împarte pe propoziții
      for (const s of para.split(/(?<=[.!?])\s+/)) parts.push(s)
    }
  }
  for (const p of parts) {
    if (cur && cur.length + p.length + 2 > max) push()
    cur += (cur ? '\n\n' : '') + p
  }
  push()
  return chunks
}

export async function synthesize(text: string): Promise<{ bytes: Uint8Array; mediaType: string }> {
  const useGoogle = Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
  if (useGoogle) {
    const r = await generateSpeech({
      model: google.speech('gemini-2.5-pro-preview-tts'),
      text,
      voice: 'Aoede',
      instructions:
        'Citește în română, cald și natural, ca o învățătoare prietenoasă pentru copii de 8–10 ani. Pauze scurte între propoziții. Fără ton robotic.',
    })
    return { bytes: r.audio.uint8Array, mediaType: r.audio.mediaType || 'audio/wav' }
  }

  // OpenAI: bucăți MP3 în paralel, lipite în ordine (aceleași setări → aceleași cadre MP3).
  const chunks = splitForTts(text)
  const parts = await Promise.all(
    chunks.map(chunk =>
      generateSpeech({
        model: gateway.speechModel('openai/tts-1-hd'),
        text: chunk,
        voice: 'nova',
        outputFormat: 'mp3',
        speed: 0.85,
        language: 'ro',
      }),
    ),
  )
  const total = parts.reduce((n, p) => n + p.audio.uint8Array.length, 0)
  const out = new Uint8Array(total)
  let off = 0
  for (const p of parts) {
    out.set(p.audio.uint8Array, off)
    off += p.audio.uint8Array.length
  }
  return { bytes: out, mediaType: 'audio/mpeg' }
}

export type TinkercadSpeechResult = ScratchM1SpeechResult

/** Resolve or generate TTS for Tinkercad modul 1–5, lecția 1–10. */
export async function getTinkercadSpeech(
  modul: number,
  lesson: number,
): Promise<TinkercadSpeechResult> {
  if (!Number.isInteger(modul) || modul < 1 || modul > 5) {
    return { ok: false, status: 400, error: 'Parametru m invalid. Folosește ?m=1 … ?m=5.' }
  }
  if (!Number.isInteger(lesson) || lesson < 1 || lesson > TINKERCAD_LESSON_COUNT) {
    return {
      ok: false,
      status: 400,
      error: `Parametru l invalid. Folosește ?l=1 … ?l=${TINKERCAD_LESSON_COUNT}.`,
    }
  }

  const file = naratiePath(modul, lesson)
  if (!file) {
    return { ok: false, status: 404, error: `Narația M${modul} L${lesson} lipsește.` }
  }

  const text = readFileSync(file, 'utf8').trim()
  const hash = hashText(modul, lesson, text)
  const dir = `tts/tinkercad/m${modul}/l${lesson}`

  const cached = await getCachedUrl(dir, hash)
  if (cached) return { ok: true, url: cached, cached: true, lesson }

  try {
    const { bytes, mediaType } = await synthesize(text)
    const url = await saveAudio(dir, hash, bytes, mediaType)
    return { ok: true, url, cached: false, lesson }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[tts tinkercad M${modul} L${lesson}]`, message, err)
    return {
      ok: false,
      status: 502,
      error: 'Nu am putut genera vocea.',
      detail: message.slice(0, 300),
    }
  }
}

export { speechJsonResponse }
