'use client'

import { useEffect, useState } from 'react'
import { cursuri, module, lectii } from '@/lib/mockData'
import { getStore } from '@/lib/mockStore'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Lock, BookOpen } from 'lucide-react'
import SedinteRamaseElev from '@/components/SedinteRamaseElev'
import { useElevCursantId } from '@/hooks/useElevCursantId'

export default function InvataCursPage() {
  const params = useParams<{ cursId: string }>()
  const cursId = params.cursId
  const cursantId = useElevCursantId()
  const [ready, setReady] = useState(false)

  useEffect(() => setReady(true), [])

  const curs = cursuri.find(c => c.id === cursId)

  if (!ready || !cursantId) return <p className="text-slate-400">Se încarcă…</p>
  if (!curs) notFound()

  const store = getStore()
  const insc = store.inscrieri.find(
    i => i.cursant_id === cursantId && i.curs_id === cursId && i.activ
  )
  const modulActivId = insc?.modul_activ_id ?? null
  const modulActiv = module.find(m => m.id === modulActivId)

  const isUnlocked = (lectieId: string) =>
    store.progres.some(
      p => p.cursant_id === cursantId && p.lectie_id === lectieId && p.bifat
    )

  const moduleCurs = module
    .filter(m => m.curs_id === cursId)
    .sort((a, b) => a.ordine - b.ordine)
    .map(m => ({
      ...m,
      lectii: lectii.filter(l => l.modul_id === m.id).sort((a, b) => a.ordine - b.ordine),
    }))

  // Module trecute: au cel puțin o lecție bifat, dar nu sunt modulul activ
  const moduleTrecute = moduleCurs.filter(
    m => m.id !== modulActivId && m.lectii.some(l => isUnlocked(l.id))
  )

  const renderLectie = (
    l: { id: string; titlu: string; ordine: number },
    opts: { showLocked: boolean }
  ) => {
    const unlocked = isUnlocked(l.id)
    if (!unlocked && !opts.showLocked) return null

    const inner = (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100">
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
            unlocked ? 'text-white' : 'bg-slate-100 text-slate-400'
          }`}
          style={unlocked ? { backgroundColor: curs.culoare } : undefined}
        >
          {unlocked ? <Check size={14} /> : <Lock size={14} />}
        </span>
        <span
          className={`text-sm font-medium flex-1 ${
            unlocked ? 'text-slate-800' : 'text-slate-400'
          }`}
        >
          {l.titlu}
        </span>
        {!unlocked && (
          <span className="text-[10px] uppercase text-slate-300">în clasă</span>
        )}
      </div>
    )

    return (
      <li key={l.id}>
        {unlocked ? (
          <Link
            href={`/invata/${cursId}/${l.id}`}
            className="block hover:shadow-sm transition-all rounded-xl"
          >
            {inner}
          </Link>
        ) : (
          <div className="opacity-70 cursor-not-allowed">{inner}</div>
        )}
      </li>
    )
  }

  return (
    <div>
      <Link
        href="/invata"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm mb-6"
      >
        <ArrowLeft size={16} /> Înapoi la cursuri
      </Link>

      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-3 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: curs.culoare }} />
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-slate-900">{curs.nume}</h1>
            <p className="text-slate-500 text-sm">{curs.descriere}</p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <SedinteRamaseElev cursantId={cursantId} />
        </div>
      </div>

      {!modulActiv ? (
        <p className="mt-8 text-slate-400">Profesorul nu ți-a asociat încă un modul.</p>
      ) : (
        <div className="mt-8 space-y-10">
          <section>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-0.5">
                  Modulul tău acum
                </p>
                <h2 className="font-bold text-slate-900">{modulActiv.nume}</h2>
                <p className="text-xs text-slate-400">
                  {
                    lectii
                      .filter(l => l.modul_id === modulActiv.id)
                      .filter(l => isUnlocked(l.id)).length
                  }
                  /{lectii.filter(l => l.modul_id === modulActiv.id).length} lecții deblocate
                </p>
              </div>
            </div>

            <ul className="space-y-2">
              {lectii
                .filter(l => l.modul_id === modulActiv.id)
                .sort((a, b) => a.ordine - b.ordine)
                .map(l => renderLectie(l, { showLocked: true }))}
            </ul>
          </section>

          {moduleTrecute.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-slate-400" />
                <h2 className="font-bold text-slate-800">Module trecute — poți recapitula</h2>
              </div>

              <div className="space-y-6">
                {moduleTrecute.map(modul => {
                  const unlocked = modul.lectii.filter(l => isUnlocked(l.id))
                  return (
                    <div key={modul.id}>
                      <h3 className="text-sm font-semibold text-slate-600 mb-2">
                        {modul.nume}
                        <span className="ml-2 text-xs font-normal text-slate-400">
                          {unlocked.length} lecții
                        </span>
                      </h3>
                      <ul className="space-y-2">
                        {modul.lectii.map(l => renderLectie(l, { showLocked: false }))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
