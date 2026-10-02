/** Identifiers for Tinkercad 3D (5 module × 10 lecții). */
export const TINKERCAD_CURS_ID = 'c9'
export const TINKERCAD_LESSON_COUNT = 10

/** Modul Tinkercad (1–5) → id modul din mockData. */
export const TINKERCAD_MODUL_IDS: Record<number, string> = {
  1: 'm29',
  2: 'm30',
  3: 'm31',
  4: 'm32',
  5: 'm33',
}

/** Returnează numărul modulului Tinkercad (1–5) pentru un id de modul, sau null. */
export function tinkercadModulNumar(modulId: string): number | null {
  for (const [n, id] of Object.entries(TINKERCAD_MODUL_IDS)) {
    if (id === modulId) return Number(n)
  }
  return null
}

export function isTinkercadLesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= TINKERCAD_LESSON_COUNT
}

/** TTS JSON endpoint for a Tinkercad lesson. */
export function tinkercadTtsApiUrl(modul: number, ordine: number): string {
  return `/api/tts/tinkercad?m=${modul}&l=${ordine}`
}
