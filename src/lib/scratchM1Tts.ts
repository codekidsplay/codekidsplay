import { experimental_generateSpeech as generateSpeech } from 'ai'
import { gateway } from '@ai-sdk/gateway'
import { google } from '@ai-sdk/google'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { createHash } from 'crypto'
import { put, head } from '@vercel/blob'
import { SCRATCH_M1_LESSON_COUNT } from '@/lib/scratchM1'

const NARATIE_FILES: Record<number, string> = {
  1: 'L1-Ce-este-Scratch.naratie.txt',
  2: 'L2-Scena-fundaluri-costume.naratie.txt',
  3: 'L3-Miscare-pe-scena.naratie.txt',
  4: 'L4-Evenimente.naratie.txt',
  5: 'L5-Blocuri-de-aspect.naratie.txt',
  6: 'L6-Sunet.naratie.txt',
  7: 'L7-Coordonate-XY.naratie.txt',
  8: 'L8-Repeta-si-asteapta.naratie.txt',
  9: 'L9-Mini-proiect-Personajul-meu.naratie.txt',
  10: 'L10-Recap-showcase.naratie.txt',
}

/**
 * L1 keeps the original Blob namespace + PROFILE so production cache stays valid.
 * L2–L10 use scratch-m1-naratie-v1 under tts/scratch-m1/lN/.
 */
function cacheConfig(lesson: number): { profile: string; blobDir: string } {
  if (lesson === 1) {
    return { profile: 'scratch-l1-naratie-v3', blobDir: 'tts/scratch-l1' }
  }
  return {
    profile: 'scratch-m1-naratie-v1',
    blobDir: `tts/scratch-m1/l${lesson}`,
  }
}

function naratiePath(lesson: number): string | null {
  const file = NARATIE_FILES[lesson]
  if (!file) return null
  return path.join(process.cwd(), 'content', 'lectii', 'scratch', 'modul1', file)
}

function hashText(profile: string, lesson: number, text: string) {
  // L1 hash must match the historical formula (profile + text only).
  const payload =
    lesson === 1 ? `${profile}\n${text}` : `${profile}\nl${lesson}\n${text}`
  return createHash('sha256').update(payload).digest('hex').slice(0, 16)
}

async function getCachedUrl(blobDir: string, hash: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  for (const ext of ['mp3', 'wav'] as const) {
    const pathname = `${blobDir}/${hash}.${ext}`
    try {
      const meta = await head(pathname)
      if (meta?.url) return meta.url
    } catch {
      /* miss */
    }
  }
  return null
}

async function saveAudio(
  blobDir: string,
  hash: string,
  bytes: Uint8Array,
  mediaType: string,
): Promise<string> {
  const ext = mediaType.includes('wav') ? 'wav' : 'mp3'
  const contentType = ext === 'wav' ? 'audio/wav' : 'audio/mpeg'
  const pathname = `${blobDir}/${hash}.${ext}`

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

async function synthesize(text: string) {
  const useGoogle = Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
  if (useGoogle) {
    return generateSpeech({
      model: google.speech('gemini-2.5-pro-preview-tts'),
      text,
      voice: 'Aoede',
      instructions:
        'Citește în română, cald și natural, ca o învățătoare prietenoasă pentru copii de 8–10 ani. Pauze scurte între propoziții. Fără ton robotic.',
    })
  }
  return generateSpeech({
    model: gateway.speechModel('openai/tts-1-hd'),
    text,
    voice: 'nova',
    outputFormat: 'mp3',
    speed: 0.85,
    language: 'ro',
  })
}

export type ScratchM1SpeechResult =
  | { ok: true; url: string; cached: boolean; lesson: number }
  | { ok: false; status: number; error: string; detail?: string }

/** Resolve or generate TTS for Scratch Modul 1 lesson 1–10. */
export async function getScratchM1Speech(lesson: number): Promise<ScratchM1SpeechResult> {
  if (!Number.isInteger(lesson) || lesson < 1 || lesson > SCRATCH_M1_LESSON_COUNT) {
    return {
      ok: false,
      status: 400,
      error: `Parametru l invalid. Folosește ?l=1 … ?l=${SCRATCH_M1_LESSON_COUNT}.`,
    }
  }

  const file = naratiePath(lesson)
  if (!file || !existsSync(file)) {
    return { ok: false, status: 404, error: `Narația L${lesson} lipsește.` }
  }

  const text = readFileSync(file, 'utf8').trim()
  const { profile, blobDir } = cacheConfig(lesson)
  const hash = hashText(profile, lesson, text)

  const cached = await getCachedUrl(blobDir, hash)
  if (cached) return { ok: true, url: cached, cached: true, lesson }

  try {
    const result = await synthesize(text)
    const bytes = result.audio.uint8Array
    const mediaType = result.audio.mediaType || 'audio/mpeg'
    const url = await saveAudio(blobDir, hash, bytes, mediaType)
    return { ok: true, url, cached: false, lesson }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[tts scratch-m1 L${lesson}]`, message, err)
    return {
      ok: false,
      status: 502,
      error: 'Nu am putut genera vocea.',
      detail: message.slice(0, 300),
    }
  }
}

export function speechJsonResponse(result: ScratchM1SpeechResult): Response {
  if (!result.ok) {
    return Response.json(
      { error: result.error, detail: result.detail },
      { status: result.status },
    )
  }

  const headers: HeadersInit = {}
  if (result.cached) {
    // Browser can reuse the JSON (and thus the Blob URL) within a session.
    headers['Cache-Control'] = 'public, max-age=86400, stale-while-revalidate=604800'
  } else {
    headers['Cache-Control'] = 'no-store'
  }

  return Response.json(
    { url: result.url, cached: result.cached, lesson: result.lesson },
    { headers },
  )
}
