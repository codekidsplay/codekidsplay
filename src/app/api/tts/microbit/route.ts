import { getMicrobitSpeech, speechJsonResponse } from '@/lib/microbitTts'

export const maxDuration = 180

/** micro:bit · ?m=1…4 & ?l=1…10 */
export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams
  const modul = Number.parseInt(sp.get('m') ?? sp.get('modul') ?? '', 10)
  const lesson = Number.parseInt(sp.get('l') ?? sp.get('ordine') ?? '', 10)
  return speechJsonResponse(await getMicrobitSpeech(modul, lesson))
}
