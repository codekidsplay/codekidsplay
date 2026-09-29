/** Identifiers for Scratch · Modul 3 (Jocuri / Game Builder). */
export const SCRATCH_M3_CURS_ID = 'c7'
export const SCRATCH_M3_MODUL_ID = 'm18'
export const SCRATCH_M3_LESSON_COUNT = 10

export function isScratchM3Lesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= SCRATCH_M3_LESSON_COUNT
}

/** TTS JSON endpoint for a Modul 3 lesson (L1–L10). */
export function scratchM3TtsApiUrl(ordine: number): string {
  return `/api/tts/scratch-m3?l=${ordine}`
}
