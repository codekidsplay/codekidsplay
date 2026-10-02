/** Identifiers for Scratch · Modul 6. */
export const SCRATCH_M6_CURS_ID = 'c7'
export const SCRATCH_M6_MODUL_ID = 'm20'
export const SCRATCH_M6_LESSON_COUNT = 10

export function isScratchM6Lesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= SCRATCH_M6_LESSON_COUNT
}

/** TTS JSON endpoint for a Modul 6 lesson (L1–L10). */
export function scratchM6TtsApiUrl(ordine: number): string {
  return `/api/tts/scratch-m6?l=${ordine}`
}
