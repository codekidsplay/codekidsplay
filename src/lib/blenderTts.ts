import { readFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'
import { createHash } from 'crypto'
import { BLENDER_LESSON_COUNT } from '@/lib/blender'
import { speechJsonResponse, type ScratchM1SpeechResult } from '@/lib/scratchM1Tts'
import { getCachedUrl, saveAudio, synthesize } from '@/lib/tinkercadTts'

const PROFILE = 'blender-naratie-v1'

function naratiePath(modul: number, lesson: number): string | null {
  const dir = path.join(process.cwd(), 'content', 'lectii', 'blender', `modul${modul}`)
  if (!existsSync(dir)) return null
  const prefix = `L${lesson}-`
  const file = readdirSync(dir).find(f => f.startsWith(prefix) && f.endsWith('.naratie.txt'))
  return file ? path.join(dir, file) : null
}

export type BlenderSpeechResult = ScratchM1SpeechResult

/** Resolve or generate TTS for Blender modul 1–4, lecția 1–10. */
export async function getBlenderSpeech(modul: number, lesson: number): Promise<BlenderSpeechResult> {
  if (!Number.isInteger(modul) || modul < 1 || modul > 4) {
    return { ok: false, status: 400, error: 'Parametru m invalid. Folosește ?m=1 … ?m=4.' }
  }
  if (!Number.isInteger(lesson) || lesson < 1 || lesson > BLENDER_LESSON_COUNT) {
    return { ok: false, status: 400, error: `Parametru l invalid. Folosește ?l=1 … ?l=${BLENDER_LESSON_COUNT}.` }
  }
  const file = naratiePath(modul, lesson)
  if (!file) return { ok: false, status: 404, error: `Narația M${modul} L${lesson} lipsește.` }

  const text = readFileSync(file, 'utf8').trim()
  const hash = createHash('sha256').update(`${PROFILE}\nm${modul}\nl${lesson}\n${text}`).digest('hex').slice(0, 16)
  const dir = `tts/blender/m${modul}/l${lesson}`

  const cached = await getCachedUrl(dir, hash)
  if (cached) return { ok: true, url: cached, cached: true, lesson }
  try {
    const { bytes, mediaType } = await synthesize(text)
    const url = await saveAudio(dir, hash, bytes, mediaType)
    return { ok: true, url, cached: false, lesson }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[tts blender M${modul} L${lesson}]`, message, err)
    return { ok: false, status: 502, error: 'Nu am putut genera vocea.', detail: message.slice(0, 300) }
  }
}

export { speechJsonResponse }
