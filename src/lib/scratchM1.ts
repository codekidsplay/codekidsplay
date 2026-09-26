/** Identifiers for Scratch · Modul 1 (Primii pași / Scratch Starter). */
export const SCRATCH_M1_CURS_ID = 'c7'
export const SCRATCH_M1_MODUL_ID = 'm16'
export const SCRATCH_M1_LESSON_COUNT = 10

export function isScratchM1Lesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= SCRATCH_M1_LESSON_COUNT
}

/** TTS JSON endpoint for a Modul 1 lesson (L1–L10). */
export function scratchM1TtsApiUrl(ordine: number): string {
  return `/api/tts/scratch-m1?l=${ordine}`
}
