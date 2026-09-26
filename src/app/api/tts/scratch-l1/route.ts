import { experimental_generateSpeech as generateSpeech } from 'ai'
import { gateway } from '@ai-sdk/gateway'
import { google } from '@ai-sdk/google'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { createHash } from 'crypto'
import { put, head } from '@vercel/blob'

export const maxDuration = 120

/** Păstrat pentru cache Blob L1 deja generat (PROFILE v3). L2–L10 → /api/tts/scratch-m1?l=N */
const PROFILE = 'scratch-l1-naratie-v3'

function naratiePath() {
  return path.join(
    process.cwd(),
    'content',
    'lectii',
    'scratch',
    'modul1',
    'L1-Ce-este-Scratch.naratie.txt',
  )
}

function hashText(text: string) {
  return createHash('sha256').update(`${PROFILE}\n${text}`).digest('hex').slice(0, 16)
}

async function getCachedUrl(hash: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  for (const ext of ['mp3', 'wav'] as const) {
    const pathname = `tts/scratch-l1/${hash}.${ext}`
    try {
      const meta = await head(pathname)
      if (meta?.url) return meta.url
    } catch {
      /* miss */
    }
  }
  return null
}

async function saveAudio(hash: string, bytes: Uint8Array, mediaType: string): Promise<string> {
  const ext = mediaType.includes('wav') ? 'wav' : 'mp3'
  const contentType = ext === 'wav' ? 'audio/wav' : 'audio/mpeg'
  const pathname = `tts/scratch-l1/${hash}.${ext}`

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

/** Compat: Scratch M1 L1 — preferă /api/tts/scratch-m1?l=1 pentru L2–L10 */
export async function GET() {
  const file = naratiePath()
  if (!existsSync(file)) {
    return Response.json({ error: 'Narația L1 lipsește.' }, { status: 404 })
  }

  const text = readFileSync(file, 'utf8').trim()
  const hash = hashText(text)

  const cached = await getCachedUrl(hash)
  if (cached) return Response.json({ url: cached, cached: true })

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
    const url = await saveAudio(hash, bytes, mediaType)
    return Response.json({ url, cached: false })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[tts scratch-l1]', message, err)
    return Response.json(
      {
        error: 'Nu am putut genera vocea.',
        detail: message.slice(0, 300),
      },
      { status: 502 },
    )
  }
}
