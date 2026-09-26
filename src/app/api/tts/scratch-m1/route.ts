import { experimental_generateSpeech as generateSpeech } from 'ai'
import { gateway } from '@ai-sdk/gateway'
import { google } from '@ai-sdk/google'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { createHash } from 'crypto'
import { put, head } from '@vercel/blob'

export const maxDuration = 120

/** Cache bust when voice profile or narration style changes */
const PROFILE = 'scratch-m1-naratie-v1'

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

function parseLesson(searchParams: URLSearchParams): number | null {
  const raw = searchParams.get('l') ?? searchParams.get('ordine')
  if (!raw) return null
  const n = Number.parseInt(raw, 10)
  if (!Number.isInteger(n) || n < 1 || n > 10) return null
  return n
}

function naratiePath(lesson: number) {
  const file = NARATIE_FILES[lesson]
  return path.join(process.cwd(), 'content', 'lectii', 'scratch', 'modul1', file)
}

function hashText(lesson: number, text: string) {
  return createHash('sha256')
    .update(`${PROFILE}\nl${lesson}\n${text}`)
    .digest('hex')
    .slice(0, 16)
}

async function getCachedUrl(lesson: number, hash: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  for (const ext of ['mp3', 'wav'] as const) {
    const pathname = `tts/scratch-m1/l${lesson}/${hash}.${ext}`
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
  lesson: number,
  hash: string,
  bytes: Uint8Array,
  mediaType: string,
): Promise<string> {
  const ext = mediaType.includes('wav') ? 'wav' : 'mp3'
  const contentType = ext === 'wav' ? 'audio/wav' : 'audio/mpeg'
  const pathname = `tts/scratch-m1/l${lesson}/${hash}.${ext}`

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

/** Scratch Modul 1 · L1–L10 — ?l=1 … ?l=10 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lesson = parseLesson(searchParams)
  if (lesson === null) {
    return Response.json(
      { error: 'Parametru l invalid. Folosește ?l=1 … ?l=10.' },
      { status: 400 },
    )
  }

  const file = naratiePath(lesson)
  if (!existsSync(file)) {
    return Response.json(
      { error: `Narația L${lesson} lipsește.` },
      { status: 404 },
    )
  }

  const text = readFileSync(file, 'utf8').trim()
  const hash = hashText(lesson, text)

  const cached = await getCachedUrl(lesson, hash)
  if (cached) return Response.json({ url: cached, cached: true, lesson })

  try {
    const useGoogle = Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    const result = useGoogle
      ? await generateSpeech({
          model: google.speech('gemini-2.5-pro-preview-tts'),
          text,
          voice: 'Aoede',
          instructions:
            'Citește în română, cald și natural, ca o învățătoare prietenoasă pentru copii de 8–10 ani. Pauze scurte între propoziții. Fără ton robotic.',
        })
      : await generateSpeech({
          model: gateway.speechModel('openai/tts-1-hd'),
          text,
          voice: 'nova',
          outputFormat: 'mp3',
          speed: 0.85,
          language: 'ro',
        })

    const bytes = result.audio.uint8Array
    const mediaType = result.audio.mediaType || 'audio/mpeg'
    const url = await saveAudio(lesson, hash, bytes, mediaType)
    return Response.json({ url, cached: false, lesson })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[tts scratch-m1 L${lesson}]`, message, err)
    return Response.json(
      {
        error: 'Nu am putut genera vocea.',
        detail: message.slice(0, 300),
      },
      { status: 502 },
    )
  }
}
