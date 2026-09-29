'use client'

import AscultaScratchPlayer from '@/components/AscultaScratchPlayer'
import { scratchM3TtsApiUrl } from '@/lib/scratchM3'

/** Ascultă — Scratch Modul 3 (L1–L10). */
export default function AscultaScratchM3({
  ordine,
  accentColor = '#f83030',
}: {
  ordine: number
  accentColor?: string
}) {
  return (
    <AscultaScratchPlayer
      ordine={ordine}
      apiUrl={scratchM3TtsApiUrl}
      logLabel="AscultaScratchM3"
      accentColor={accentColor}
    />
  )
}
