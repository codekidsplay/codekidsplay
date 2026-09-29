'use client'

import { cursuri, module, lectii } from '@/lib/mockData'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import SedinteRamaseElev from '@/components/SedinteRamaseElev'
import { useElevCursantId } from '@/hooks/useElevCursantId'
import { useProgresCursant } from '@/hooks/useProgresCursant'
import { getSession } from '@/lib/auth'
import { useEffect, useState } from 'react'

export default function InvataHomePage() {
  const cursantId = useElevCursantId()
  const { data, loading } = useProgresCursant(cursantId)
  const [prenume, setPrenume] = useState('prietene')

  useEffect(() => {
    const s = getSession()
    if (s?.rol === 'elev') setPrenume(s.prenume)
    else if (data?.cursant) setPrenume(data.cursant.prenume)
  }, [data])

  if (!cursantId || loading) {
    return <p className="text-slate-400">Se încarcă…</p>
  }

  const unlocked = new Set((data?.progres ?? []).filter(p => p.bifat).map(p => p.lectie_id))
  const cursuriInscrise = cursuri.filter(c =>
    (data?.inscrieri ?? []).some(i => i.curs_id === c.id && i.activ),
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

      {cursuriInscrise.length === 0 ? (
        <p className="text-slate-500 text-sm bg-white rounded-2xl border border-slate-100 p-5">
          Nu ești înscris încă la un curs. Întreabă profesorul.
        </p>
      ) : (
        <div className="space-y-4">
          {cursuriInscrise.map(curs => {
            const insc = data?.inscrieri.find(i => i.curs_id === curs.id && i.activ)
            const modulActiv = module.find(m => m.id === insc?.modul_activ_id)
            const moduleCurs = module.filter(m => m.curs_id === curs.id)
            const lectiiCurs = lectii.filter(l => moduleCurs.some(m => m.id === l.modul_id))
            const bifate = lectiiCurs.filter(l => unlocked.has(l.id)).length
            const totalActiv = lectii.filter(l => l.modul_id === modulActiv?.id).length
            const bifateActiv = lectii
              .filter(l => l.modul_id === modulActiv?.id)
              .filter(l => unlocked.has(l.id)).length
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
      )}
    </div>
  )
}
