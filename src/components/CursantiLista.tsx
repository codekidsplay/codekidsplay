'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, X } from 'lucide-react'
import { cursanti, cursuri, module } from '@/lib/mockData'
import { getStore } from '@/lib/mockStore'
import CursantAvatar from '@/components/CursantAvatar'

export default function CursantiLista() {
  const [ready, setReady] = useState(false)
  const [q, setQ] = useState('')
  const [cursId, setCursId] = useState('')
  const [modulId, setModulId] = useState('')
  const [status, setStatus] = useState<'toti' | 'activ' | 'inactiv'>('toti')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    setReady(true)
    setTick(t => t + 1)
  }, [])

  const store = useMemo(() => (ready ? getStore() : null), [ready, tick])

  const modulePentruCurs = useMemo(() => {
    if (!cursId) return module.slice().sort((a, b) => a.ordine - b.ordine)
    return module.filter(m => m.curs_id === cursId).sort((a, b) => a.ordine - b.ordine)
  }, [cursId])

  // Dacă schimbi cursul și modulul ales nu mai aparține, resetează modulul
  useEffect(() => {
    if (modulId && cursId) {
      const ok = module.some(m => m.id === modulId && m.curs_id === cursId)
      if (!ok) setModulId('')
    }
  }, [cursId, modulId])

  const filtrati = useMemo(() => {
    if (!store) return []
    const query = q.trim().toLowerCase()

    return cursanti.filter(c => {
      if (status === 'activ' && !c.activ) return false
      if (status === 'inactiv' && c.activ) return false

      if (query) {
        const full = `${c.nume} ${c.prenume} ${c.email_parinte}`.toLowerCase()
        if (!full.includes(query)) return false
      }

      const insc = store.inscrieri.filter(i => i.cursant_id === c.id && i.activ)

      if (cursId) {
        if (!insc.some(i => i.curs_id === cursId)) return false
      }

      if (modulId) {
        if (!insc.some(i => i.modul_activ_id === modulId)) return false
      }

      return true
    })
  }, [store, q, cursId, modulId, status])

  const activi = cursanti.filter(c => c.activ).length
  const areFiltre = q || cursId || modulId || status !== 'toti'

  if (!ready || !store) {
    return <p className="text-slate-400">Se încarcă…</p>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cursanți</h1>
          <p className="text-slate-500 mt-1">
            {filtrati.length} afișați · {cursanti.length} total · {activi} activi
          </p>
        </div>
        <Link
          href="/cursanti/adauga"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-600/30 transition-colors"
        >
          <Plus size={18} />
          Adaugă cursant
        </Link>
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
            <span className="text-xs font-medium text-slate-500 mb-1 block">Curs</span>
            <select
              value={cursId}
              onChange={e => setCursId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Toate</option>
              {cursuri.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nume}
                </option>
              ))}
            </select>
          </label>

          <label className="min-w-[200px]">
            <span className="text-xs font-medium text-slate-500 mb-1 block">Modul activ</span>
            <select
              value={modulId}
              onChange={e => setModulId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Toate</option>
              {modulePentruCurs.map(m => (
                <option key={m.id} value={m.id}>
                  {m.nume}
                </option>
              ))}
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

          {areFiltre && (
            <button
              type="button"
              onClick={() => {
                setQ('')
                setCursId('')
                setModulId('')
                setStatus('toti')
              }}
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 px-3 py-2.5"
            >
              <X size={14} /> Resetează
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-slate-500 font-semibold text-sm">Cursant</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold text-sm">Contact</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold text-sm">Cursuri</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold text-sm">Modul activ</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold text-sm">Înscris</th>
                <th className="text-left px-6 py-4 text-slate-500 font-semibold text-sm">Status</th>
                <th className="text-right px-6 py-4 text-slate-500 font-semibold text-sm">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtrati.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">
                    Niciun cursant nu corespunde filtrelor.
                  </td>
                </tr>
              ) : (
                filtrati.map(c => {
                  const insc = store.inscrieri.filter(i => i.cursant_id === c.id && i.activ)
                  const cursuriCursant = insc
                    .map(i => cursuri.find(cur => cur.id === i.curs_id))
                    .filter(Boolean)
                  const moduleActive = insc
                    .map(i => module.find(m => m.id === i.modul_activ_id))
                    .filter(Boolean)

                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <CursantAvatar id={c.id} nume={c.nume} prenume={c.prenume} />
                          <p className="font-semibold text-slate-900">
                            {c.nume} {c.prenume}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700 text-sm">{c.email_parinte}</p>
                        {c.telefon_parinte && (
                          <p className="text-slate-400 text-xs mt-0.5">{c.telefon_parinte}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {cursuriCursant.length === 0 ? (
                            <span className="text-slate-400 text-sm">—</span>
                          ) : (
                            cursuriCursant.map(curs => (
                              <span
                                key={curs!.id}
                                className="text-xs px-2 py-0.5 rounded-[10px] font-medium border whitespace-nowrap"
                                style={{
                                  backgroundColor: `${curs!.culoare}18`,
                                  color: curs!.culoare,
                                  borderColor: `${curs!.culoare}55`,
                                }}
                              >
                                {curs!.nume}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          {moduleActive.length === 0 ? (
                            <span className="text-slate-400 text-sm">—</span>
                          ) : (
                            moduleActive.map(m => (
                              <span key={m!.id} className="text-xs text-slate-600 whitespace-nowrap">
                                {m!.nume}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                        {new Date(c.data_inscriere).toLocaleDateString('ro-RO')}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-[10px] font-medium border whitespace-nowrap ${
                            c.activ
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : 'bg-red-50 text-red-600 border-red-300'
                          }`}
                        >
                          {c.activ ? 'Activ' : 'Inactiv'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/cursanti/${c.id}`}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                          >
                            Progres
                          </Link>
                          <span className="text-slate-200">|</span>
                          <Link
                            href={`/cursanti/${c.id}/editeaza`}
                            className="text-sm text-slate-500 hover:text-slate-700 font-medium hover:underline"
                          >
                            Editează
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
    </div>
  )
}
