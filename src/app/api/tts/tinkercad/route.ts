import { getTinkercadSpeech, speechJsonResponse } from '@/lib/tinkercadTts'
import { TINKERCAD_LESSON_COUNT } from '@/lib/tinkercad'

export const maxDuration = 180

function parseIntParam(searchParams: URLSearchParams, keys: string[]): number | null {
  for (const k of keys) {
    const raw = searchParams.get(k)
    if (raw) {
      const n = Number.parseInt(raw, 10)
      return Number.isInteger(n) ? n : null
    }
  }
  return null
}

/** Tinkercad · ?m=1…5 & ?l=1…10 */
export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams
  const modul = parseIntParam(sp, ['m', 'modul'])
  const lesson = parseIntParam(sp, ['l', 'ordine'])
  if (modul === null || modul < 1 || modul > 5) {
    return Response.json({ error: 'Parametru m invalid. Folosește ?m=1 … ?m=5.' }, { status: 400 })
  }
  if (lesson === null || lesson < 1 || lesson > TINKERCAD_LESSON_COUNT) {
    return Response.json(
      { error: `Parametru l invalid. Folosește ?l=1 … ?l=${TINKERCAD_LESSON_COUNT}.` },
      { status: 400 },
    )
  }
  return speechJsonResponse(await getTinkercadSpeech(modul, lesson))
}
