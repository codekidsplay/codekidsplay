'use client'

import { abonamentActiv, getStore, sedinteRamase } from '@/lib/mockStore'

interface Props {
  cursantId: string
}

/** Afișare prietenoasă pentru elev — fără sold negativ / prețuri */
export default function SedinteRamaseElev({ cursantId }: Props) {
  const store = getStore()
  const ab = abonamentActiv(cursantId, store)
  if (!ab) return null

  const ramase = sedinteRamase(ab.id, store)

  if (ramase > 0) {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3.5 py-2 text-sm text-emerald-800 whitespace-nowrap ml-auto">
        <span className="font-bold text-emerald-700 text-base">{ramase}</span>
        <span>
          {ramase === 1 ? 'ședință rămasă' : 'ședințe rămase'}
        </span>
      </div>
    )
  }

  return (
    <div className="ml-auto max-w-[240px] text-right rounded-xl bg-amber-50 border border-amber-100 px-3.5 py-2 text-sm text-amber-900">
      Ședințele s-au terminat, spune-i părintelui 😊
    </div>
  )
}
