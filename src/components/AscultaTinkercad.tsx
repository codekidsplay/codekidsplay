'use client'

import AscultaScratchPlayer from '@/components/AscultaScratchPlayer'
import { tinkercadTtsApiUrl } from '@/lib/tinkercad'

/** Ascultă — Tinkercad (modul 1–5, lecția 1–10). */
export default function AscultaTinkercad({
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
      apiUrl={o => tinkercadTtsApiUrl(modul, o)}
      logLabel={`AscultaTinkercadM${modul}`}
      accentColor={accentColor}
    />
  )
}
