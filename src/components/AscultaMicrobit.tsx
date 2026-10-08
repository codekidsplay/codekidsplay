'use client'

import AscultaScratchPlayer from '@/components/AscultaScratchPlayer'
import { microbitTtsApiUrl } from '@/lib/microbit'

/** Ascultă — micro:bit (modul 1–4, lecția 1–10). */
export default function AscultaMicrobit({
  modul,
  ordine,
  accentColor = '#0EA5E9',
}: {
  modul: number
  ordine: number
  accentColor?: string
}) {
  return (
    <AscultaScratchPlayer
      ordine={ordine}
      apiUrl={o => microbitTtsApiUrl(modul, o)}
      logLabel={`AscultaMicrobitM${modul}`}
      accentColor={accentColor}
    />
  )
}
