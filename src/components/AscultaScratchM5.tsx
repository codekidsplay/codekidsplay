'use client'

import AscultaScratchPlayer from '@/components/AscultaScratchPlayer'
import { scratchM5TtsApiUrl } from '@/lib/scratchM5'

/** Ascultă — Scratch Modul 5 (L1–L10). */
export default function AscultaScratchM5({
  ordine,
  accentColor = '#f83030',
}: {
  ordine: number
  accentColor?: string
}) {
  return (
    <AscultaScratchPlayer
      ordine={ordine}
      apiUrl={scratchM5TtsApiUrl}
      logLabel="AscultaScratchM5"
      accentColor={accentColor}
    />
  )
}
