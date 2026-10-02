/** Identifiers for Scratch · Modul 5. */
export const SCRATCH_M5_CURS_ID = 'c7'
export const SCRATCH_M5_MODUL_ID = 'm28'
export const SCRATCH_M5_LESSON_COUNT = 10

export function isScratchM5Lesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= SCRATCH_M5_LESSON_COUNT
}

/** TTS JSON endpoint for a Modul 5 lesson (L1–L10). */
export function scratchM5TtsApiUrl(ordine: number): string {
  return `/api/tts/scratch-m5?l=${ordine}`
}
