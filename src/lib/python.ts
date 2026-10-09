export const PYTHON_LESSON_COUNT = 10
/** id modul (mockData) → număr modul Python (1–4). */
export const PYTHON_MODUL_NUMERE: Record<string, number> = { m6: 1, m7: 2, m8: 3, m40: 4 }
export function pythonModulNumar(modulId: string): number | null {
  return PYTHON_MODUL_NUMERE[modulId] ?? null
}
export function isPythonLesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= PYTHON_LESSON_COUNT
}
export function pythonTtsApiUrl(modul: number, ordine: number): string {
  return `/api/tts/python?m=${modul}&l=${ordine}`
}
