'use client'

import { useEffect, useState } from 'react'
import { cursanti, cursuri, module, lectii } from '@/lib/mockData'
import { getStore } from '@/lib/mockStore'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import SedinteRamaseElev from '@/components/SedinteRamaseElev'
import { useElevCursantId } from '@/hooks/useElevCursantId'

export default function InvataHomePage() {
  const cursantId = useElevCursantId()
  const [storeTick, setStoreTick] = useState(0)

  useEffect(() => {
    setStoreTick(t => t + 1)
  }, [cursantId])

  if (!cursantId) {
    return <p className="text-slate-400">Se încarcă…</p>
  }

  const store = getStore()
  void storeTick

  const cursant = cursanti.find(c => c.id === cursantId)
  const prenume = cursant?.prenume ?? 'prietene'

  const cursuriInscrise = cursuri.filter(c =>
    store.inscrieri.some(i => i.cursant_id === cursantId && i.curs_id === c.id && i.activ)
  )

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Salut, {prenume}!</h1>
          <p className="text-slate-500">
            Modulul actual + lecțiile bifate din modulele trecute (pentru recapitulare).
          </p>
        </div>
        <div className="flex-shrink-0">
          <SedinteRamaseElev cursantId={cursantId} />
        </div>
      </div>

      <div className="space-y-4">
        {cursuriInscrise.map(curs => {
          const insc = store.inscrieri.find(
            i => i.cursant_id === cursantId && i.curs_id === curs.id
          )
          const modulActiv = module.find(m => m.id === insc?.modul_activ_id)
          const moduleCurs = module.filter(m => m.curs_id === curs.id)
          const lectiiCurs = lectii.filter(l => moduleCurs.some(m => m.id === l.modul_id))
          const bifate = lectiiCurs.filter(l =>
            store.progres.some(
              p => p.cursant_id === cursantId && p.lectie_id === l.id && p.bifat
            )
          ).length
          const totalActiv = lectii.filter(l => l.modul_id === modulActiv?.id).length
          const bifateActiv = lectii
            .filter(l => l.modul_id === modulActiv?.id)
            .filter(l =>
              store.progres.some(
                p => p.cursant_id === cursantId && p.lectie_id === l.id && p.bifat
              )
            ).length
          const pct = totalActiv ? Math.round((bifateActiv / totalActiv) * 100) : 0

          return (
            <Link
              key={curs.id}
              href={`/invata/${curs.id}`}
              className="block bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${curs.culoare}20` }}
                >
                  <BookOpen size={22} style={{ color: curs.culoare }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-bold text-lg text-slate-900">{curs.nume}</h2>
                    <ArrowRight
                      size={18}
                      className="text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0"
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {modulActiv?.nume ?? 'Fără modul'} · {bifateActiv}/{totalActiv} în modulul
                    actual
                    {bifate > bifateActiv ? ` · +${bifate - bifateActiv} de recapitulat` : ''}
                  </p>
                  <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: curs.culoare }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
