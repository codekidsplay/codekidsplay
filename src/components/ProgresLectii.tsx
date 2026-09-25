'use client'

import { useState, useTransition } from 'react'
import { supabase } from '@/lib/supabase'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Lectie {
  id: string
  titlu: string
  ordine: number
}

interface Props {
  lectii: Lectie[]
  cursantId: string
  progresMap: Record<string, { bifat: boolean; data_bifat: string | null }>
  culoareCurs: string
}

export default function ProgresLectii({ lectii, cursantId, progresMap, culoareCurs }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [localProgres, setLocalProgres] = useState<Record<string, boolean>>(
    Object.fromEntries(lectii.map(l => [l.id, progresMap[l.id]?.bifat ?? false]))
  )
  const [loading, setLoading] = useState<string | null>(null)

  const toggleLectie = async (lectieId: string) => {
    if (loading) return
    setLoading(lectieId)

    const nouBifat = !localProgres[lectieId]
    setLocalProgres(prev => ({ ...prev, [lectieId]: nouBifat }))

    const existing = progresMap[lectieId]

    if (existing !== undefined) {
      await supabase
        .from('progres')
        .update({ bifat: nouBifat, data_bifat: nouBifat ? new Date().toISOString() : null })
        .eq('cursant_id', cursantId)
        .eq('lectie_id', lectieId)
    } else {
      await supabase.from('progres').insert({
        cursant_id: cursantId,
        lectie_id: lectieId,
        bifat: nouBifat,
        data_bifat: nouBifat ? new Date().toISOString() : null,
      })
    }

    setLoading(null)
    startTransition(() => router.refresh())
  }

  return (
    <div className="space-y-2">
      {lectii.map((lectie, idx) => {
        const bifat = localProgres[lectie.id] ?? false
        const isLoading = loading === lectie.id

        return (
          <button
            key={lectie.id}
            onClick={() => toggleLectie(lectie.id)}
            disabled={isLoading}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
              bifat
                ? 'border-current bg-opacity-10'
                : 'border-slate-100 hover:border-slate-200 bg-slate-50'
            } ${isLoading ? 'opacity-60 cursor-wait' : 'cursor-pointer'}`}
            style={bifat ? { borderColor: culoareCurs, backgroundColor: `${culoareCurs}15` } : {}}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                bifat ? 'text-white' : 'border-slate-300 bg-white'
              }`}
              style={bifat ? { backgroundColor: culoareCurs, borderColor: culoareCurs } : {}}
            >
              {bifat && <Check size={13} strokeWidth={3} />}
            </div>
            <span className={`text-sm font-medium ${bifat ? 'line-through opacity-70' : 'text-slate-700'}`}>
              Lecția {lectie.ordine}: {lectie.titlu}
            </span>
            {bifat && progresMap[lectie.id]?.data_bifat && (
              <span className="ml-auto text-xs text-slate-400 flex-shrink-0">
                {new Date(progresMap[lectie.id].data_bifat!).toLocaleDateString('ro-RO')}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
