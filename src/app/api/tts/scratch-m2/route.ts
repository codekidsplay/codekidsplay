import { getScratchM2Speech, speechJsonResponse } from '@/lib/scratchM2Tts'
import { SCRATCH_M2_LESSON_COUNT } from '@/lib/scratchM2'

export const maxDuration = 120

function parseLesson(searchParams: URLSearchParams): number | null {
  const raw = searchParams.get('l') ?? searchParams.get('ordine')
  if (!raw) return null
  const n = Number.parseInt(raw, 10)
  if (!Number.isInteger(n) || n < 1 || n > SCRATCH_M2_LESSON_COUNT) return null
  return n
}

/** Scratch Modul 2 · L1–L10 — ?l=1 … ?l=10 */
export async function GET(request: Request) {
  const lesson = parseLesson(new URL(request.url).searchParams)
  if (lesson === null) {
    return Response.json(
      {
        error: `Parametru l invalid. Folosește ?l=1 … ?l=${SCRATCH_M2_LESSON_COUNT}.`,
      },
      { status: 400 },
    )
  }

  const result = await getScratchM2Speech(lesson)
  return speechJsonResponse(result)
}
