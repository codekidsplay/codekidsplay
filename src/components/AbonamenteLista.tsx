'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { CreditCard, TrendingUp, AlertCircle, Search, X, Download, Banknote } from 'lucide-react'
import AdaugaPlataButton from '@/components/AdaugaPlataButton'
import CursantAvatar from '@/components/CursantAvatar'
import { listAbonamenteAction, type AbonamenteDate } from '@/app/actions/abonamente'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'
import { calculeazaSoldCursant, culoareSold } from '@/lib/soldSedinte'
import {
  LUNI_RO,
  aniDisponibili,
  defaultPerioadaDinPlati,
  descarcaPdfIncasari,
  filtreazaPlatiPerioada,
  totalSiPeMetode,
} from '@/lib/incasari'

const DATE_GOALE: AbonamenteDate = { cursanti: [], abonamente: [], sedinte: [], plati: [] }

export default function AbonamenteLista() {
  const useSupabase = isSupabaseConfiguredClient()
  const [date, setDate] = useState<AbonamenteDate>(DATE_GOALE)
  const [loading, setLoading] = useState(useSupabase)
  const [eroare, setEroare] = useState<string | null>(null)

  const refresh = async () => {
    if (!useSupabase) {
      setLoading(false)
      return
    }
    const r = await listAbonamenteAction()
    if (r.ok) {
      setDate(r.data)
      setEroare(null)
    } else {
      setEroare(r.error)
    }
    setLoading(false)
  }

  useEffect(() => {
    void refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { cursanti, abonamente, sedinte, plati } = date

  const getSoldCursant = useCallback(
    (cursantId: string) => calculeazaSoldCursant(cursantId, abonamente, sedinte),
    [abonamente, sedinte],
  )

  const initial = defaultPerioadaDinPlati(plati)
  const [luna, setLuna] = useState(initial.luna)
  const [an, setAn] = useState(initial.an)
  const [q, setQ] = useState('')
  const [tip, setTip] = useState<'toti' | 'lunar' | 'pachet' | 'fara'>('toti')
  const [status, setStatus] = useState<'toti' | 'activ' | 'inactiv'>('toti')
  const [soldFiltru, setSoldFiltru] = useState<'toti' | 'scazut' | 'ok'>('toti')

  useEffect(() => {
    const p = defaultPerioadaDinPlati(plati)
    setLuna(p.luna)
    setAn(p.an)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plati.length])

  const platiPerioada = useMemo(() => filtreazaPlatiPerioada(plati, luna, an), [plati, luna, an])
  const { total: totalIncasat, peMetode } = useMemo(
    () => totalSiPeMetode(platiPerioada),
    [platiPerioada],
  )
  const ani = useMemo(() => aniDisponibili(plati), [plati])
  const perioadaLabel = `${LUNI_RO[luna]} ${an}`

  const cursantiActivi = cursanti.filter(c => c.activ)
  const solduriActivi = cursantiActivi.map(c => ({ ...c, ...getSoldCursant(c.id) }))
  const cuSoldMic = solduriActivi.filter(c => c.sedintePlate > 0 && c.sold <= 1).length

  const filtrati = useMemo(() => {
    const query = q.trim().toLowerCase()
    return cursanti.filter(c => {
      if (status === 'activ' && !c.activ) return false
      if (status === 'inactiv' && c.activ) return false

      if (query) {
        const full = `${c.prenume} ${c.nume} ${c.email_parinte}`.toLowerCase()
        if (!full.includes(query)) return false
      }

      const { sold, aboActiv, sedintePlate } = getSoldCursant(c.id)

      if (tip === 'lunar' && aboActiv?.tip !== 'lunar') return false
      if (tip === 'pachet' && aboActiv?.tip !== 'pachet') return false
      if (tip === 'fara' && aboActiv) return false

      if (soldFiltru === 'scazut') {
        if (sedintePlate <= 0 || sold > 1) return false
      }
      if (soldFiltru === 'ok') {
        if (sedintePlate <= 0 || sold <= 1) return false
      }

      return true
    })
  }, [q, tip, status, soldFiltru, cursanti, getSoldCursant])

  const areFiltre = q || tip !== 'toti' || status !== 'toti' || soldFiltru !== 'toti'

  if (useSupabase && loading) {
    return <p className="text-slate-400">Se încarcă…</p>
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Abonamente & Plăți</h1>
          <p className="text-slate-500 mt-1">Evidența financiară și sold ședințe</p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <label className="min-w-[140px]">
            <span className="text-xs font-medium text-slate-500 mb-1 block">Lună</span>
            <select
              value={luna}
              onChange={e => setLuna(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              {LUNI_RO.map((nume, i) => (
                <option key={nume} value={i}>
                  {nume}
                </option>
              ))}
            </select>
          </label>
          <label className="min-w-[100px]">
            <span className="text-xs font-medium text-slate-500 mb-1 block">An</span>
            <select
              value={an}
              onChange={e => setAn(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              {ani.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() =>
              descarcaPdfIncasari({
                luna,
                an,
                plati: platiPerioada,
                cursanti,
              })
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Download size={16} />
            PDF {LUNI_RO[luna]}
          </button>
        </div>
      </div>

      {eroare && (
        <p className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
          {eroare}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-2.5">
            <TrendingUp size={18} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalIncasat} lei</p>
          <p className="text-slate-700 text-sm font-medium mt-0.5">Total încasat</p>
          <p className="text-slate-400 text-xs mt-0.5">
            {perioadaLabel} · {platiPerioada.length} plăți
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-2.5">
            <Banknote size={18} className="text-teal-600" />
          </div>
          <p className="text-slate-700 text-sm font-medium mb-1.5">Modalități</p>
          <ul className="space-y-0.5">
            <li className="flex items-baseline justify-between gap-2 leading-tight">
              <span className="text-xs text-slate-500">Cash</span>
              <span className="text-sm font-bold text-slate-900 tabular-nums">{peMetode.cash} lei</span>
            </li>
            <li className="flex items-baseline justify-between gap-2 leading-tight">
              <span className="text-xs text-slate-500">Transfer</span>
              <span className="text-sm font-bold text-slate-900 tabular-nums">{peMetode.transfer} lei</span>
            </li>
            <li className="flex items-baseline justify-between gap-2 leading-tight">
              <span className="text-xs text-slate-500">Card</span>
              <span className="text-sm font-bold text-slate-900 tabular-nums">{peMetode.card} lei</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-2.5">
            <CreditCard size={18} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {abonamente.filter(a => a.activ).length}
          </p>
          <p className="text-slate-700 text-sm font-medium mt-0.5">Abonamente active</p>
        </div>

        <button
          type="button"
          onClick={() => setSoldFiltru(soldFiltru === 'scazut' ? 'toti' : 'scazut')}
          className={`rounded-xl p-4 shadow-sm border text-left transition-all ${
            cuSoldMic > 0 || soldFiltru === 'scazut'
              ? 'bg-amber-50 border-amber-200'
              : 'bg-white border-slate-100'
          } ${soldFiltru === 'scazut' ? 'ring-2 ring-amber-300' : ''}`}
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 ${
              cuSoldMic > 0 ? 'bg-amber-100' : 'bg-slate-50'
            }`}
          >
            <AlertCircle
              size={18}
              className={cuSoldMic > 0 ? 'text-amber-500' : 'text-slate-400'}
            />
          </div>
          <p className="text-2xl font-bold text-slate-900">{cuSoldMic}</p>
          <p className="text-slate-700 text-sm font-medium mt-0.5">Sold scăzut</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-end">
          <label className="flex-1 min-w-[180px]">
            <span className="text-xs font-medium text-slate-500 mb-1 block">Caută</span>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Nume sau email părinte…"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </label>

          <label className="min-w-[140px]">
            <span className="text-xs font-medium text-slate-500 mb-1 block">Tip abonament</span>
            <select
              value={tip}
              onChange={e => setTip(e.target.value as typeof tip)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="toti">Toate</option>
              <option value="lunar">Lunar</option>
              <option value="pachet">Pachet</option>
              <option value="fara">Fără abonament</option>
            </select>
          </label>

          <label className="min-w-[120px]">
            <span className="text-xs font-medium text-slate-500 mb-1 block">Status</span>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as typeof status)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="toti">Toți</option>
              <option value="activ">Activi</option>
              <option value="inactiv">Inactivi</option>
            </select>
          </label>

          <label className="min-w-[140px]">
            <span className="text-xs font-medium text-slate-500 mb-1 block">Sold</span>
            <select
              value={soldFiltru}
              onChange={e => setSoldFiltru(e.target.value as typeof soldFiltru)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="toti">Toate</option>
              <option value="scazut">Scăzut (≤1)</option>
              <option value="ok">OK (&gt;1)</option>
            </select>
          </label>

          {areFiltre && (
            <button
              type="button"
              onClick={() => {
                setQ('')
                setTip('toti')
                setStatus('toti')
                setSoldFiltru('toti')
              }}
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 px-3 py-2.5"
            >
              <X size={14} /> Resetează
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3">
          <h2 className="font-bold text-slate-900 text-lg">Sold ședințe per cursant</h2>
          <p className="text-sm text-slate-400">{filtrati.length} afișați</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-3 text-slate-500 font-semibold text-sm">Cursant</th>
                <th className="text-left px-6 py-3 text-slate-500 font-semibold text-sm">
                  Tip abonament
                </th>
                <th className="text-left px-6 py-3 text-slate-500 font-semibold text-sm">
                  Ședințe plătite
                </th>
                <th className="text-left px-6 py-3 text-slate-500 font-semibold text-sm">Consumate</th>
                <th className="text-left px-6 py-3 text-slate-500 font-semibold text-sm">Sold rămas</th>
                <th className="text-right px-6 py-3 text-slate-500 font-semibold text-sm">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {filtrati.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 text-sm">
                    Niciun cursant pentru filtrele alese.
                  </td>
                </tr>
              ) : (
                filtrati.map(c => {
                  const { sedintePlate, sedinteConsume, sold, aboActiv } = getSoldCursant(c.id)
                  const areSedinte = sedintePlate > 0 || sedinteConsume > 0
                  return (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/80">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <CursantAvatar id={c.id} nume={c.nume} prenume={c.prenume} />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {c.prenume} {c.nume}
                            </p>
                            <p className="text-xs text-slate-400">{c.email_parinte}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {aboActiv ? (
                          <span className="capitalize">{aboActiv.tip}</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {areSedinte ? sedintePlate : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {areSedinte ? sedinteConsume : '—'}
                      </td>
                      <td className="px-6 py-4">
                        {areSedinte ? (
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${culoareSold(sold)}`}>
                              {sold}
                            </span>
                            <span className="text-slate-400 text-sm">ședințe</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <AdaugaPlataButton
                            cursantId={c.id}
                            abonamentId={aboActiv?.id}
                            numarCursant={`${c.prenume} ${c.nume}`}
                            onSaved={refresh}
                          />
                          <Link
                            href={`/abonamente/${c.id}`}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline whitespace-nowrap"
                          >
                            Detalii →
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="font-bold text-slate-900 text-lg">Plăți — {perioadaLabel}</h2>
          <p className="text-sm text-slate-400">{platiPerioada.length} înregistrări</p>
        </div>
        <div className="space-y-3">
          {platiPerioada.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">
              Nicio plată în {perioadaLabel}.
            </p>
          ) : (
            [...platiPerioada]
              .sort((a, b) => b.data_plata.localeCompare(a.data_plata))
              .map(p => {
                const cursant = cursanti.find(c => c.id === p.cursant_id)
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      {cursant ? (
                        <CursantAvatar
                          id={cursant.id}
                          nume={cursant.nume}
                          prenume={cursant.prenume}
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-slate-100" />
                      )}
                      <div>
                        <p className="font-semibold text-slate-900">
                          {cursant?.prenume} {cursant?.nume}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {new Date(p.data_plata + 'T12:00:00').toLocaleDateString('ro-RO')} ·{' '}
                          {p.metoda}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600 text-lg">{p.suma} lei</p>
                      {p.nota && <p className="text-slate-400 text-xs">{p.nota}</p>}
                    </div>
                  </div>
                )
              })
          )}
        </div>
      </div>
    </div>
  )
}
