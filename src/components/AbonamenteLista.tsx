'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CreditCard, TrendingUp, AlertCircle, CheckCircle, Search, X } from 'lucide-react'
import { cursanti, abonamente, plati, sedinte } from '@/lib/mockData'
import AdaugaPlataButton from '@/components/AdaugaPlataButton'
import CursantAvatar from '@/components/CursantAvatar'

function getSoldCursant(cursantId: string) {
  const aboCursant = abonamente.filter(a => a.cursant_id === cursantId && a.activ)
  if (!aboCursant.length) return { sedintePlate: 0, sedinteConsume: 0, sold: 0, aboActiv: null as (typeof abonamente)[0] | null }
  const aboActiv = aboCursant[aboCursant.length - 1]
  const sedinteConsume = sedinte.filter(
    s => s.cursant_id === cursantId && s.abonament_id === aboActiv.id && s.prezent
  ).length
  const sold = aboActiv.sedinte_incluse - sedinteConsume
  return { sedintePlate: aboActiv.sedinte_incluse, sedinteConsume, sold, aboActiv }
}

export default function AbonamenteLista() {
  const [q, setQ] = useState('')
  const [tip, setTip] = useState<'toti' | 'lunar' | 'pachet' | 'fara'>('toti')
  const [status, setStatus] = useState<'toti' | 'activ' | 'inactiv'>('toti')
  const [soldFiltru, setSoldFiltru] = useState<'toti' | 'scazut' | 'ok'>('toti')

  const totalIncasat = plati.reduce((s, p) => s + p.suma, 0)
  const cursantiActivi = cursanti.filter(c => c.activ)
  const solduriActivi = cursantiActivi.map(c => ({ ...c, ...getSoldCursant(c.id) }))
  const cuSoldMic = solduriActivi.filter(c => c.aboActiv && c.sold <= 1).length

  const filtrati = useMemo(() => {
    const query = q.trim().toLowerCase()
    return cursanti.filter(c => {
      if (status === 'activ' && !c.activ) return false
      if (status === 'inactiv' && c.activ) return false

      if (query) {
        const full = `${c.nume} ${c.prenume} ${c.email_parinte}`.toLowerCase()
        if (!full.includes(query)) return false
      }

      const { sold, aboActiv } = getSoldCursant(c.id)

      if (tip === 'lunar' && aboActiv?.tip !== 'lunar') return false
      if (tip === 'pachet' && aboActiv?.tip !== 'pachet') return false
      if (tip === 'fara' && aboActiv) return false

      if (soldFiltru === 'scazut') {
        if (!aboActiv || sold > 1) return false
      }
      if (soldFiltru === 'ok') {
        if (!aboActiv || sold <= 1) return false
      }

      return true
    })
  }, [q, tip, status, soldFiltru])

  const areFiltre = q || tip !== 'toti' || status !== 'toti' || soldFiltru !== 'toti'

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Abonamente & Plăți</h1>
        <p className="text-slate-500 mt-1">Evidența financiară și sold ședințe</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp size={22} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalIncasat} lei</p>
          <p className="text-slate-700 font-medium mt-1">Total încasat</p>
          <p className="text-slate-400 text-sm mt-0.5">{plati.length} plăți înregistrate</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <CreditCard size={22} className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{abonamente.filter(a => a.activ).length}</p>
          <p className="text-slate-700 font-medium mt-1">Abonamente active</p>
          <p className="text-slate-400 text-sm mt-0.5">
            {abonamente.filter(a => a.tip === 'lunar' && a.activ).length} lunare ·{' '}
            {abonamente.filter(a => a.tip === 'pachet' && a.activ).length} pachete
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSoldFiltru(soldFiltru === 'scazut' ? 'toti' : 'scazut')}
          className={`rounded-2xl p-6 shadow-sm border text-left transition-all ${
            cuSoldMic > 0 || soldFiltru === 'scazut'
              ? 'bg-amber-50 border-amber-200'
              : 'bg-white border-slate-100'
          } ${soldFiltru === 'scazut' ? 'ring-2 ring-amber-300' : ''}`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              cuSoldMic > 0 ? 'bg-amber-100' : 'bg-slate-50'
            }`}
          >
            <AlertCircle size={22} className={cuSoldMic > 0 ? 'text-amber-500' : 'text-slate-400'} />
          </div>
          <p className="text-3xl font-bold text-slate-900">{cuSoldMic}</p>
          <p className="text-slate-700 font-medium mt-1">Sold scăzut</p>
          <p className="text-slate-400 text-sm mt-0.5">
            ≤1 ședință · click pentru filtru
          </p>
        </button>
      </div>

      {/* Filtre */}
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
                <th className="text-left px-6 py-3 text-slate-500 font-semibold text-sm">Tip abonament</th>
                <th className="text-left px-6 py-3 text-slate-500 font-semibold text-sm">Ședințe plătite</th>
                <th className="text-left px-6 py-3 text-slate-500 font-semibold text-sm">Consumate</th>
                <th className="text-left px-6 py-3 text-slate-500 font-semibold text-sm">Sold rămas</th>
                <th className="text-right px-6 py-3 text-slate-500 font-semibold text-sm">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtrati.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                    Niciun cursant nu corespunde filtrelor.
                  </td>
                </tr>
              ) : (
                filtrati.map(c => {
                  const { sedintePlate, sedinteConsume, sold, aboActiv } = getSoldCursant(c.id)
                  const procentConsumat =
                    sedintePlate > 0 ? Math.round((sedinteConsume / sedintePlate) * 100) : 0

                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <CursantAvatar id={c.id} nume={c.nume} prenume={c.prenume} />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {c.nume} {c.prenume}
                            </p>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-[10px] border font-medium ${
                                c.activ
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : 'bg-red-50 text-red-600 border-red-300'
                              }`}
                            >
                              {c.activ ? 'Activ' : 'Inactiv'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {aboActiv ? (
                          <span
                            className={`inline-block text-xs px-2.5 py-1 rounded-[10px] font-medium border whitespace-nowrap ${
                              aboActiv.tip === 'lunar'
                                ? 'border-blue-300 bg-blue-50 text-blue-700'
                                : 'border-violet-300 bg-violet-50 text-violet-700'
                            }`}
                          >
                            {aboActiv.tip === 'lunar'
                              ? `Lunar · ${aboActiv.pret} lei`
                              : `Pachet · ${aboActiv.pret} lei`}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-medium">
                        {sedintePlate || '—'}
                      </td>
                      <td className="px-6 py-4">
                        {sedintePlate > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-100 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{
                                  width: `${procentConsumat}%`,
                                  backgroundColor:
                                    procentConsumat >= 80
                                      ? '#EF4444'
                                      : procentConsumat >= 50
                                        ? '#F59E0B'
                                        : '#10B981',
                                }}
                              />
                            </div>
                            <span className="text-slate-600 text-sm">{sedinteConsume}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {aboActiv ? (
                          <div className="flex items-center gap-2">
                            {sold <= 1 ? (
                              <AlertCircle size={15} className="text-amber-500" />
                            ) : (
                              <CheckCircle size={15} className="text-emerald-500" />
                            )}
                            <span
                              className={`font-bold text-lg ${
                                sold <= 1
                                  ? 'text-amber-500'
                                  : sold <= 3
                                    ? 'text-slate-700'
                                    : 'text-emerald-600'
                              }`}
                            >
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
                            numarCursant={`${c.nume} ${c.prenume}`}
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
        <h2 className="font-bold text-slate-900 text-lg mb-5">Ultimele plăți</h2>
        <div className="space-y-3">
          {[...plati].reverse().map(p => {
            const cursant = cursanti.find(c => c.id === p.cursant_id)
            return (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  {cursant ? (
                    <CursantAvatar id={cursant.id} nume={cursant.nume} prenume={cursant.prenume} />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-slate-100" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">
                      {cursant?.nume} {cursant?.prenume}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {new Date(p.data_plata).toLocaleDateString('ro-RO')} · {p.metoda}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600 text-lg">{p.suma} lei</p>
                  {p.nota && <p className="text-slate-400 text-xs">{p.nota}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
