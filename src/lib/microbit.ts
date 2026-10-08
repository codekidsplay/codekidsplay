/** Identifiers for micro:bit (blocuri + Python): 4 module × 10 lecții. */
export const MICROBIT_LESSON_COUNT = 10

/** id modul din mockData → număr modul narațiune (folder content/lectii/microbit/modulN). */
export const MICROBIT_MODUL_NUMERE: Record<string, number> = {
  m21: 1,
  m22: 2,
  m23: 3,
  m41: 4,
}

export function microbitModulNumar(modulId: string): number | null {
  return MICROBIT_MODUL_NUMERE[modulId] ?? null
}

export function isMicrobitLesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= MICROBIT_LESSON_COUNT
}

export function microbitTtsApiUrl(modul: number, ordine: number): string {
  return `/api/tts/microbit?m=${modul}&l=${ordine}`
}
