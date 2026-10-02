'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Banknote, CalendarCheck, CreditCard, Download, UserPlus, Users } from 'lucide-react'
import {
  activitateProfesorAction,
  type EvenimentActivitate,
  type RezumatProfesor,
} from '@/app/actions/activitate'
import { LUNI_RO, descarcaPdfActivitateProfesor } from '@/lib/incasari'

const TIPURI: Record<EvenimentActivitate['tip'], { label: string; cls: string }> = {
  copil: { label: 'Copil nou', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  plata: { label: 'Încasare', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  incarcare: { label: 'Ședințe încărcate', cls: 'bg-violet-50 text-violet-700 border-violet-200' },
  sedinta: { label: 'Ședință efectuată', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
}

type FiltruTip = 'toate' | EvenimentActivitate['tip']

export default function ActivitateProfesor({ profesorId }: { profesorId: string }) {
  const acum = new Date()
  const [luna, setLuna] = useState(acum.getMonth())
  const [an, setAn] = useState(acum.getFullYear())
  const [prof, setProf] = useState<RezumatProfesor | null>(null)
  const [events, setEvents] = useState<EvenimentActivitate[]>([])
  const [migrareLipsa, setMigrareLipsa] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [filtru, setFiltru] = useState<FiltruTip>('toate')

  useEffect(() => {
    let anulat = false
    setLoading(true)
    void activitateProfesorAction(profesorId, luna, an).then(r => {
      if (anulat) return
      if (r.ok) {
        setProf(r.profesor)
        setEvents(r.evenimente)
        setMigrareLipsa(r.migrareLipsa)
        setError(null)
      } else {
        setError(r.error)
      }
      setLoading(false)
    })
    return () => {
      anulat = true
    }
  }, [profesorId, luna, an])

  const ani = [acum.getFullYear() - 1, acum.getFullYear(), acum.getFullYear() + 1]

  const eventsFiltrate = filtru === 'toate' ? events : events.filter(e => e.tip === filtru)
  const numarPeTip = (t: EvenimentActivitate['tip']) => events.filter(e => e.tip === t).length
  const optiuniFiltru: Array<{ id: FiltruTip; label: string; n: number }> = [
    { id: 'toate', label: 'Toate', n: events.length },
    { id: 'copil', label: TIPURI.copil.label, n: numarPeTip('copil') },
    { id: 'plata', label: TIPURI.plata.label, n: numarPeTip('plata') },
    { id: 'incarcare', label: TIPURI.incarcare.label, n: numarPeTip('incarcare') },
    { id: 'sedinta', label: TIPURI.sedinta.label, n: numarPeTip('sedinta') },
  ]

  const carduri = prof
    ? [
        { icon: UserPlus, label: 'Copii înregistrați', val: prof.copii_inregistrati, sub: `${prof.copii_asignati} asignați în total` },
        { icon: Banknote, label: 'Total încasat', val: `${prof.incasat} lei`, sub: `${prof.nr_plati} plăți primite de el` },
        { icon: CreditCard, label: 'Ședințe încărcate', val: prof.sedinte_incarcate, sub: 'prin plățile înregistrate de el' },
        { icon: CalendarCheck, label: 'Ședințe efectuate', val: prof.sedinte_efectuate, sub: 'bifate personal de el' },
      ]
    : []

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/profesori" className="text-slate-400 hover:text-slate-600">
          <ArrowLeft size={22} />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">{prof?.nume ?? 'Profesor'}</h1>
          <p className="text-slate-500 mt-1">{prof?.email}</p>
        </div>
        <div className="flex gap-2">
          <select
            value={luna}
            onChange={e => setLuna(Number(e.target.value))}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
          >
            {LUNI_RO.map((n, i) => (
              <option key={n} value={i}>{n}</option>
            ))}
          </select>
          <select
            value={an}
            onChange={e => setAn(Number(e.target.value))}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
          >
            {ani.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button
            type="button"
            disabled={!prof}
            onClick={() => {
              if (!prof) return
              descarcaPdfActivitateProfesor({ luna, an, profesor: prof, evenimente: eventsFiltrate })
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <Download size={16} />
            Descarcă PDF
          </button>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4">{error}</p>
      ) : null}
      {migrareLipsa ? (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4">
          Pentru istoricul copiilor înregistrați rulează migrarea <code>20261002210000_cursanti_creat_de.sql</code> în
          Supabase. Încasările și ședințele se văd deja.
        </p>
      ) : null}

      {loading && !prof ? <p className="text-slate-400">Se încarcă…</p> : null}

      {prof ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {carduri.map(c => (
              <div key={c.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <c.icon size={18} className="text-slate-400 mb-2" />
                <p className="text-2xl font-bold text-slate-900">{c.val}</p>
                <p className="text-sm font-medium text-slate-700">{c.label}</p>
                <p className="text-xs text-slate-400">{c.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <Users size={18} className="text-slate-400" />
              <h2 className="font-bold text-slate-900">
                Istoric · {LUNI_RO[luna]} {an}
              </h2>
              <span className="text-slate-400 text-sm">({eventsFiltrate.length})</span>
            </div>
            <div className="px-5 py-3 border-b border-slate-100 flex flex-wrap gap-2">
              {optiuniFiltru.map(o => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setFiltru(o.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                    filtru === o.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {o.label} <span className="opacity-70">({o.n})</span>
                </button>
              ))}
            </div>
            {eventsFiltrate.length === 0 ? (
              <p className="text-slate-400 text-center py-10">
                {events.length === 0
                  ? 'Nicio activitate în această lună.'
                  : 'Nimic pentru filtrul ales în această lună.'}
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {eventsFiltrate.map((e, i) => (
                  <li key={i} className="flex items-center gap-4 px-5 py-3">
                    <span className="w-24 text-sm text-slate-500 tabular-nums">
                      {new Date(e.data.length > 10 ? e.data : e.data + 'T12:00:00').toLocaleDateString('ro-RO')}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-[10px] font-medium border whitespace-nowrap ${TIPURI[e.tip].cls}`}>
                      {TIPURI[e.tip].label}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="font-semibold text-slate-900">{e.cursant}</span>
                      <span className="text-slate-500 text-sm"> · {e.detalii}</span>
                    </span>
                    {e.suma != null ? (
                      <span className="font-bold text-emerald-600">{e.suma} lei</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}
