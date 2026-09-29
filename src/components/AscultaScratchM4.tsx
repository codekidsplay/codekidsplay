'use client'

import AscultaScratchPlayer from '@/components/AscultaScratchPlayer'
import { scratchM4TtsApiUrl } from '@/lib/scratchM4'

/** Ascultă — Scratch Modul 4 (L1–L10). */
export default function AscultaScratchM4({
  ordine,
  accentColor = '#f83030',
}: {
  ordine: number
  accentColor?: string
}) {
  return (
    <AscultaScratchPlayer
      ordine={ordine}
      apiUrl={scratchM4TtsApiUrl}
      logLabel="AscultaScratchM4"
      accentColor={accentColor}
    />
  )
}
