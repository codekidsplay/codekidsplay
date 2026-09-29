/** Identifiers for Scratch · Modul 4 (Proiecte & autonomie / Scratch Creator). */
export const SCRATCH_M4_CURS_ID = 'c7'
export const SCRATCH_M4_MODUL_ID = 'm19'
export const SCRATCH_M4_LESSON_COUNT = 10

export function isScratchM4Lesson(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= SCRATCH_M4_LESSON_COUNT
}

/** TTS JSON endpoint for a Modul 4 lesson (L1–L10). */
export function scratchM4TtsApiUrl(ordine: number): string {
  return `/api/tts/scratch-m4?l=${ordine}`
}
