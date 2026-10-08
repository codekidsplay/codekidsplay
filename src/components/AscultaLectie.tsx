'use client'

import AscultaScratchPlayer from '@/components/AscultaScratchPlayer'
import { getAscultaConfig } from '@/lib/ttsRegistry'

/** Buton „Ascultă” generic: apare doar dacă lecția are narație înregistrată în ttsRegistry. */
export default function AscultaLectie({
  modulId,
  ordine,
  accentColor,
}: {
  modulId: string
  ordine: number
  accentColor?: string
}) {
  const cfg = getAscultaConfig(modulId, ordine)
  if (!cfg) return null
  return (
    <AscultaScratchPlayer
      ordine={ordine}
      apiUrl={cfg.apiUrl}
      logLabel={cfg.logLabel}
      accentColor={accentColor}
    />
  )
}
