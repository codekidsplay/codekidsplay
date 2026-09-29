'use client'

import AscultaScratchPlayer from '@/components/AscultaScratchPlayer'
import { scratchM1TtsApiUrl } from '@/lib/scratchM1'

/** Ascultă — Scratch Modul 1 (L1–L10). */
export default function AscultaScratchM1({
  ordine,
  accentColor = '#f83030',
}: {
  ordine: number
  accentColor?: string
}) {
  return (
    <AscultaScratchPlayer
      ordine={ordine}
      apiUrl={scratchM1TtsApiUrl}
      logLabel="AscultaScratchM1"
      accentColor={accentColor}
    />
  )
}
