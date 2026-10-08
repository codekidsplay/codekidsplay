import { SCRATCH_M1_MODUL_ID } from '@/lib/scratchM1'
import { SCRATCH_M2_MODUL_ID } from '@/lib/scratchM2'
import { SCRATCH_M3_MODUL_ID } from '@/lib/scratchM3'
import { SCRATCH_M4_MODUL_ID } from '@/lib/scratchM4'
import { SCRATCH_M5_MODUL_ID } from '@/lib/scratchM5'
import { SCRATCH_M6_MODUL_ID } from '@/lib/scratchM6'
import { isMicrobitLesson, microbitModulNumar, microbitTtsApiUrl } from '@/lib/microbit'
import { isTinkercadLesson, tinkercadModulNumar, tinkercadTtsApiUrl } from '@/lib/tinkercad'

/**
 * Registru unic pentru butonul „Ascultă”.
 * Un curs nou cu narație se adaugă AICI (și în ruta /api/tts/...), fără a atinge paginile de lecție.
 */
export type AscultaConfig = {
  /** URL-ul JSON care întoarce audio pentru o lecție. */
  apiUrl: (ordine: number) => string
  /** Etichetă pentru loguri. */
  logLabel: string
}

const SCRATCH_MODULE_IDS: Record<string, number> = {
  [SCRATCH_M1_MODUL_ID]: 1,
  [SCRATCH_M2_MODUL_ID]: 2,
  [SCRATCH_M3_MODUL_ID]: 3,
  [SCRATCH_M4_MODUL_ID]: 4,
  [SCRATCH_M5_MODUL_ID]: 5,
  [SCRATCH_M6_MODUL_ID]: 6,
}

function isLessonInRange(ordine: number): boolean {
  return Number.isInteger(ordine) && ordine >= 1 && ordine <= 10
}

/** Returnează configurația audio pentru (modul, lecție) sau null dacă nu există narație. */
export function getAscultaConfig(modulId: string, ordine: number): AscultaConfig | null {
  const scratch = SCRATCH_MODULE_IDS[modulId]
  if (scratch !== undefined && isLessonInRange(ordine)) {
    return {
      apiUrl: o => `/api/tts/scratch-m${scratch}?l=${o}`,
      logLabel: `AscultaScratchM${scratch}`,
    }
  }

  const tk = tinkercadModulNumar(modulId)
  if (tk !== null && isTinkercadLesson(ordine)) {
    return { apiUrl: o => tinkercadTtsApiUrl(tk, o), logLabel: `AscultaTinkercadM${tk}` }
  }

  const mb = microbitModulNumar(modulId)
  if (mb !== null && isMicrobitLesson(ordine)) {
    return { apiUrl: o => microbitTtsApiUrl(mb, o), logLabel: `AscultaMicrobitM${mb}` }
  }

  return null
}
