/** Identifiers for Scratch · Modul 2 (Logică / Logic Explorer). */
export const SCRATCH_M2_CURS_ID = 'c7'
export const SCRATCH_M2_MODUL_ID = 'm17'
export const SCRATCH_M2_LESSON_COUNT = 10

export function isScratchM2Lesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= SCRATCH_M2_LESSON_COUNT
}

/** TTS JSON endpoint for a Modul 2 lesson (L1–L10). */
export function scratchM2TtsApiUrl(ordine: number): string {
  return `/api/tts/scratch-m2?l=${ordine}`
}
