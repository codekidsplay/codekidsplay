'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Edit } from 'lucide-react'
import { cursuri, module, lectii } from '@/lib/mockData'
import { getStore, type BifareResult } from '@/lib/mockStore'
import ProgresLectiiMock from '@/components/ProgresLectiiMock'
import AbonamentNotificariPanel from '@/components/AbonamentNotificariPanel'
import ModulActivSelect from '@/components/ModulActivSelect'
import InscrieriCursuriPanel from '@/components/InscrieriCursuriPanel'
import ConturiAccesPanel from '@/components/ConturiAccesPanel'

interface Cursant {
  id: string
  nume: string
  prenume: string
  email_parinte: string
  telefon_parinte: string | null
}

export default function CursantProgresClient({ cursant }: { cursant: Cursant }) {
  const [lastBifare, setLastBifare] = useState<BifareResult | null>(null)
  const [tick, setTick] = useState(0)

  const store = useMemo(() => getStore(), [tick, lastBifare])

  const cursantInscrieri = store.inscrieri.filter(i => i.cursant_id === cursant.id && i.activ)

  const cursuriCursant = cursantInscrieri
    .map(i => {
      const curs = cursuri.find(c => c.id === i.curs_id)
      if (!curs) return null
      const moduleCurs = module
        .filter(m => m.curs_id === curs.id)
        .sort((a, b) => a.ordine - b.ordine)
        .map(m => ({
          ...m,
          lectii: lectii.filter(l => l.modul_id === m.id).sort((a, b) => a.ordine - b.ordine),
        }))
      return { ...curs, module: moduleCurs, inscriere: i }
    })
    .filter(Boolean) as Array<{
    id: string
    nume: string
    culoare: string
    module: Array<{
      id: string
      nume: string
      ordine: number
      lectii: Array<{ id: string; titlu: string; ordine: number; modul_id: string }>
    }>
    inscriere: (typeof cursantInscrieri)[0]
  }>

  const totalLectii = cursuriCursant.reduce(
    (sum, c) => sum + c.module.reduce((s, m) => s + m.lectii.length, 0),
    0
  )
  const lectiiParcurse = store.progres.filter(p => p.cursant_id === cursant.id && p.bifat).length
  const procentGlobal = totalLectii > 0 ? Math.round((lectiiParcurse / totalLectii) * 100) : 0

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cursanti" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">
            {cursant.nume} {cursant.prenume}
          </h1>
          <p className="text-slate-500 mt-1">{cursant.email_parinte}</p>
        </div>
        <Link
          href={`/cursanti/${cursant.id}/editeaza`}
          className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-medium transition-colors"
        >
          <Edit size={16} /> Editează
        </Link>
      </div>

      <ConturiAccesPanel cursant={cursant} />

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-900">Progres global</h2>
            <span className="text-2xl font-bold text-blue-600">{procentGlobal}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${procentGlobal}%` }}
            />
          </div>
          <p className="text-slate-400 text-sm mt-2">
            {lectiiParcurse} din {totalLectii} lecții · bifă = unlock acasă + max 1 ședință/zi
          </p>
        </div>

        <AbonamentNotificariPanel
          cursantId={cursant.id}
          prenume={cursant.prenume}
          emailParinte={cursant.email_parinte}
          telefonParinte={cursant.telefon_parinte}
          lastBifare={lastBifare}
        />
      </div>

      <InscrieriCursuriPanel cursantId={cursant.id} onChange={() => setTick(t => t + 1)} />

      {cursuriCursant.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <p className="text-slate-400">Cursantul nu este înscris la niciun curs.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cursuriCursant.map(curs => {
            const totalCurs = curs.module.reduce((s, m) => s + m.lectii.length, 0)
            const parcurseCurs = curs.module.reduce(
              (s, m) =>
                s +
                m.lectii.filter(l =>
                  store.progres.some(
                    p => p.cursant_id === cursant.id && p.lectie_id === l.id && p.bifat
                  )
                ).length,
              0
            )
            const procentCurs = totalCurs > 0 ? Math.round((parcurseCurs / totalCurs) * 100) : 0
            const modulActivId = curs.inscriere.modul_activ_id

            return (
              <div key={curs.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-8 rounded-full" style={{ backgroundColor: curs.culoare }} />
                    <div>
                      <h3 className="font-bold text-slate-900">{curs.nume}</h3>
                      <p className="text-slate-400 text-sm">
                        {parcurseCurs}/{totalCurs} lecții
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-lg" style={{ color: curs.culoare }}>
                    {procentCurs}%
                  </span>
                </div>

                <div className="p-5 space-y-5">
                  <ModulActivSelect
                    cursNume={curs.nume}
                    inscriereId={curs.inscriere.id}
                    module={curs.module.map(m => ({ id: m.id, nume: m.nume }))}
                    value={modulActivId}
                    onChange={() => setTick(t => t + 1)}
                  />

                  {curs.module.map(modul => {
                    const isActiv = modul.id === modulActivId
                    const parcurseModul = modul.lectii.filter(l =>
                      store.progres.some(
                        p => p.cursant_id === cursant.id && p.lectie_id === l.id && p.bifat
                      )
                    ).length
                    return (
                      <div
                        key={modul.id}
                        className={isActiv ? '' : 'opacity-60'}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-slate-700">
                            {modul.nume}
                            {isActiv && (
                              <span className="ml-2 text-[10px] uppercase tracking-wide text-emerald-600 font-bold">
                                activ
                              </span>
                            )}
                          </h4>
                          <span className="text-sm text-slate-400">
                            {parcurseModul}/{modul.lectii.length}
                            {!isActiv && parcurseModul > 0 ? ' · citibile acasă' : ''}
                          </span>
                        </div>
                        <ProgresLectiiMock
                          lectii={modul.lectii}
                          cursantId={cursant.id}
                          modulActivId={modulActivId}
                          culoareCurs={curs.culoare}
                          onBifare={r => {
                            setLastBifare(r)
                            setTick(t => t + 1)
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
