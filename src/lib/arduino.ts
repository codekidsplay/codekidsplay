export const ARDUINO_LESSON_COUNT = 10
/** id modul (mockData) → număr modul Arduino (1–4). */
export const ARDUINO_MODUL_NUMERE: Record<string, number> = { m3: 1, m4: 2, m35: 3, m36: 4 }
export function arduinoModulNumar(modulId: string): number | null {
  return ARDUINO_MODUL_NUMERE[modulId] ?? null
}
export function isArduinoLesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= ARDUINO_LESSON_COUNT
}
export function arduinoTtsApiUrl(modul: number, ordine: number): string {
  return `/api/tts/arduino?m=${modul}&l=${ordine}`
}
