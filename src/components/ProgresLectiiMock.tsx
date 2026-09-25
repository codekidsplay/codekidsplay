'use client'

import { useCallback, useEffect, useState } from 'react'
import { Check, AlertTriangle } from 'lucide-react'
import {
  bifareLectie,
  getStore,
  type BifareResult,
} from '@/lib/mockStore'

interface Lectie {
  id: string
  titlu: string
  ordine: number
  modul_id: string
}

interface Props {
  lectii: Lectie[]
  cursantId: string
  modulActivId: string | null
  culoareCurs: string
  onBifare?: (result: BifareResult) => void
}

export default function ProgresLectiiMock({
  lectii,
  cursantId,
  modulActivId,
  culoareCurs,
  onBifare,
}: Props) {
  const [progres, setProgres] = useState<Record<string, boolean>>({})
  const [dateBifat, setDateBifat] = useState<Record<string, string | null>>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const syncFromStore = useCallback(() => {
    const store = getStore()
    const map: Record<string, boolean> = {}
    const dates: Record<string, string | null> = {}
    for (const l of lectii) {
      const p = store.progres.find(x => x.cursant_id === cursantId && x.lectie_id === l.id)
      map[l.id] = p?.bifat ?? false
      dates[l.id] = p?.data_bifat ?? null
    }
    setProgres(map)
    setDateBifat(dates)
  }, [lectii, cursantId])

  useEffect(() => {
    syncFromStore()
  }, [syncFromStore])

  const toggle = async (lectieId: string) => {
    if (loading) return
    setError(null)

    const alreadyOn = progres[lectieId] ?? false
    if (alreadyOn) {
      const ok = window.confirm(
        'Debifezi lecția?\n\n' +
          '• Copilul NU o mai poate citi acasă\n' +
          '• Ședința consumată NU se returnează\n' +
          '• Dacă o re-bifezi ulterior, nu mai scade încă o ședință'
      )
      if (!ok) return
    }

    setLoading(lectieId)
    const result = await bifareLectie(cursantId, lectieId)
    setLoading(null)
    if (!result.ok) {
      setError(result.error ?? 'Eroare la bifare')
      return
    }
    syncFromStore()
    onBifare?.(result)
  }

  return (
    <div className="space-y-2">
      {error && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 flex items-center gap-2">
          <AlertTriangle size={14} /> {error}
        </p>
      )}
      {lectii.map(lectie => {
        const bifat = progres[lectie.id] ?? false
        const dinModulActiv = modulActivId === lectie.modul_id
        const isLoading = loading === lectie.id

        return (
          <button
            key={lectie.id}
            onClick={() => toggle(lectie.id)}
            disabled={isLoading || (!dinModulActiv && !bifat)}
            title={
              !dinModulActiv && !bifat
                ? 'Asociază acest modul ca să poți bifa lecțiile'
                : undefined
            }
            className="w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={
              bifat
                ? { borderColor: culoareCurs, backgroundColor: `${culoareCurs}15`, cursor: 'pointer' }
                : { borderColor: '#f1f5f9', backgroundColor: '#f8fafc', cursor: dinModulActiv ? 'pointer' : 'not-allowed' }
            }
          >
            <div
              className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              style={
                bifat
                  ? { backgroundColor: culoareCurs, borderColor: culoareCurs }
                  : { borderColor: '#cbd5e1', backgroundColor: 'white' }
              }
            >
              {bifat && <Check size={13} strokeWidth={3} color="white" />}
            </div>
            <span className={`text-sm font-medium ${bifat ? 'line-through opacity-60 text-slate-500' : 'text-slate-700'}`}>
              Lecția {lectie.ordine}: {lectie.titlu}
            </span>
            {!dinModulActiv && (
              <span className="ml-auto text-[10px] uppercase tracking-wide text-slate-400">alt modul</span>
            )}
            {bifat && dateBifat[lectie.id] && (
              <span className="ml-auto text-xs text-slate-400 flex-shrink-0">
                {new Date(dateBifat[lectie.id]!).toLocaleDateString('ro-RO')}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
