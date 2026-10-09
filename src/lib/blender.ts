export const BLENDER_LESSON_COUNT = 10
/** id modul (mockData) → număr modul Blender (1–4). */
export const BLENDER_MODUL_NUMERE: Record<string, number> = { m5: 1, m37: 2, m38: 3, m39: 4 }
export function blenderModulNumar(modulId: string): number | null {
  return BLENDER_MODUL_NUMERE[modulId] ?? null
}
export function isBlenderLesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= BLENDER_LESSON_COUNT
}
export function blenderTtsApiUrl(modul: number, ordine: number): string {
  return `/api/tts/blender?m=${modul}&l=${ordine}`
}
