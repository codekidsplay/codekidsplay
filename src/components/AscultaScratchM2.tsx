'use client'

import AscultaScratchPlayer from '@/components/AscultaScratchPlayer'
import { scratchM2TtsApiUrl } from '@/lib/scratchM2'

/** Ascultă — Scratch Modul 2 (L1–L10). */
export default function AscultaScratchM2({
  ordine,
  accentColor = '#f83030',
}: {
  ordine: number
  accentColor?: string
}) {
  return (
    <AscultaScratchPlayer
      ordine={ordine}
      apiUrl={scratchM2TtsApiUrl}
      logLabel="AscultaScratchM2"
      accentColor={accentColor}
    />
  )
}
