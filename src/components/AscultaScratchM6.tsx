'use client'

import AscultaScratchPlayer from '@/components/AscultaScratchPlayer'
import { scratchM6TtsApiUrl } from '@/lib/scratchM6'

/** Ascultă — Scratch Modul 6 (L1–L10). */
export default function AscultaScratchM6({
  ordine,
  accentColor = '#f83030',
}: {
  ordine: number
  accentColor?: string
}) {
  return (
    <AscultaScratchPlayer
      ordine={ordine}
      apiUrl={scratchM6TtsApiUrl}
      logLabel="AscultaScratchM6"
      accentColor={accentColor}
    />
  )
}
