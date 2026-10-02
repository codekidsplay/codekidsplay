'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, X, UserCheck, UserX, Layers, CalendarPlus } from 'lucide-react'
import { cursuri, module } from '@/lib/mockData'
import { getStore, getCursanti, abonamentActiv, sedinteRamase, type Cursant } from '@/lib/mockStore'
import CursantAvatar from '@/components/CursantAvatar'
import { getStaffSession, filtreazaDupaVizibilitate } from '@/lib/vizibilitateCursanti'
import { listCursantiAction } from '@/app/actions/cursanti'
import { getAuthSessionAction } from '@/app/actions/auth'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'

export default function CursantiLista() {
  const [ready, setReady] = useState(false)
  const [q, setQ] = useState('')
  const [cursId, setCursId] = useState('')
  const [modulId, setModulId] = useState('')
  const [status, setStatus] = useState<'toti' | 'activ' | 'inactiv'>('toti')
  const [inscrisiLuna, setInscrisiLuna] = useState(false)
  const [tick, setTick] = useState(0)
  const [isProfesor, setIsProfesor] = useState(false)
  const [remoteCursanti, setRemoteCursanti] = useState<Cursant[] | null>(null)
  const [remoteInscrieri, setRemoteInscrieri] = useState<
    Array<{
      id: string
      cursant_id: string
      curs_id: string
      modul_activ_id: string | null
      activ: boolean
    }>
  >([])
  const [remoteSolduri, setRemoteSolduri] = useState<
    Record<string, { incluse: number; ramase: number }>
  >({})
  const [supabaseLoading, setSupabaseLoading] = useState(isSupabaseConfiguredClient())

  useEffect(() => {
    setReady(true)
    setTick(t => t + 1)
    setIsProfesor(getStaffSession()?.rol === 'profesor')

    if (!isSupabaseConfiguredClient()) {
      setSupabaseLoading(false)
      return
    }

    void (async () => {
      const auth = await getAuthSessionAction()
      if (auth?.rol === 'profesor') {
        try {
          const raw = localStorage.getItem('ckp-session-v1')
          if (raw) {
            const s = JSON.parse(raw)
            localStorage.setItem(
              'ckp-session-v1',
              JSON.stringify({ ...s, cursant_ids: auth.cursant_ids }),
            )
          }
        } catch {
          /* ignore */
        }
        setIsProfesor(true)
      }
      const r = await listCursantiAction()
      if (r.ok) {
        setRemoteCursanti(
          r.data.map(c => ({
            id: c.id,
            nume: c.nume,
            prenume: c.prenume,
            email_parinte: c.email_parinte,
            telefon_parinte: c.telefon_parinte,
            data_inscriere: c.data_inscriere,
            activ: c.activ,
          })),
        )
        setRemoteInscrieri(r.inscrieri)
        setRemoteSolduri(r.solduri)
      } else {
        setRemoteCursanti([])
        setRemoteInscrieri([])
        setRemoteSolduri({})
      }
      setSupabaseLoading(false)
      setTick(t => t + 1)
    })()
  }, [])

  const store = useMemo(() => (ready ? getStore() : null), [ready, tick])
  const totiCursanti = useMemo(() => {
    if (!ready) return []
    if (isSupabaseConfiguredClient()) {
      return remoteCursanti ?? []
    }
    return filtreazaDupaVizibilitate(getCursanti(), getStaffSession())
  }, [ready, tick, remoteCursanti])

  const inscrieri = useMemo(() => {
    if (isSupabaseConfiguredClient()) return remoteInscrieri
    return store?.inscrieri ?? []
  }, [store, remoteInscrieri])

  const modulePentruCurs = useMemo(() => {
    if (!cursId) return module.slice().sort((a, b) => a.ordine - b.ordine)
    return module.filter(m => m.curs_id === cursId).sort((a, b) => a.ordine - b.ordine)
  }, [cursId])

  useEffect(() => {
    if (modulId && cursId) {
      const ok = module.some(m => m.id === modulId && m.curs_id === cursId)
      if (!ok) setModulId('')
    }
  }, [cursId, modulId])

  const activi = totiCursanti.filter(c => c.activ).length
  const inactivi = totiCursanti.filter(c => !c.activ).length
  const cursuriActiveCount = useMemo(() => {
    const allowed = new Set(totiCursanti.map(c => c.id))
    return new Set(
      inscrieri.filter(i => i.activ && allowed.has(i.cursant_id)).map(i => i.curs_id),
    ).size
  }, [inscrieri, totiCursanti])

  const inscrisiLunaCount = useMemo(() => {
    const n = new Date()
    return totiCursanti.filter(c => {
      const d = new Date(c.data_inscriere + 'T12:00:00')
      return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
    }).length
  }, [totiCursanti])

  const esteInscrisLunaAsta = (dataInscriere: string) => {
    const d = new Date(dataInscriere + 'T12:00:00')
    const n = new Date()
    return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
  }

  const filtrati = useMemo(() => {
    const query = q.trim().toLowerCase()

    return totiCursanti.filter(c => {
      if (status === 'activ' && !c.activ) return false
      if (status === 'inactiv' && c.activ) return false

      if (query) {
        const full = `${c.prenume} ${c.nume} ${c.email_parinte}`.toLowerCase()
        if (!full.includes(query)) return false
      }

      const insc = inscrieri.filter(i => i.cursant_id === c.id && i.activ)

      if (inscrisiLuna && !esteInscrisLunaAsta(c.data_inscriere)) return false

      if (cursId) {
        if (!insc.some(i => i.curs_id === cursId)) return false
      }

      if (modulId) {
        if (!insc.some(i => i.modul_activ_id === modulId)) return false
      }

      return true
    })
  }, [inscrieri, totiCursanti, q, cursId, modulId, status, inscrisiLuna])

  const areFiltre = q || cursId || modulId || status !== 'toti' || inscrisiLuna

  const soldPentru = (cursantId: string): { incluse: number; ramase: number } | null => {
    if (isSupabaseConfiguredClient()) {
      return remoteSolduri[cursantId] ?? null
    }
    if (!store) return null
    const ab = abonamentActiv(cursantId, store)
    if (!ab) return null
    return { incluse: ab.sedinte_incluse, ramase: sedinteRamase(ab.id, store) }
  }

  if (!ready || (!store && !isSupabaseConfiguredClient()) || supabaseLoading) {
    return <p className="text-slate-400">Se încarcă…</p>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cursanți Code Kids Play</h1>
          <p className="text-slate-500 mt-1">
            {isProfesor
              ? 'Doar cursanții asignați'
              : 'Evidența elevilor și înscrierilor'}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <button
          type="button"
          onClick={() => {
            setStatus(status === 'activ' ? 'toti' : 'activ')
            setInscrisiLuna(false)
          }}
          className={`rounded-xl p-4 shadow-sm border text-left transition-all ${
            status === 'activ'
              ? 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-300'
              : 'bg-white border-slate-100'
          }`}
        >
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-2.5">
            <UserCheck size={18} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{activi}</p>
          <p className="text-slate-700 text-sm font-medium mt-0.5">Cursanți activi</p>
        </button>

        <button
          type="button"
          onClick={() => {
            setStatus(status === 'inactiv' ? 'toti' : 'inactiv')
            setInscrisiLuna(false)
          }}
          className={`rounded-xl p-4 shadow-sm border text-left transition-all ${
            status === 'inactiv'
              ? 'bg-red-50 border-red-200 ring-2 ring-red-300'
              : 'bg-white border-slate-100'
          }`}
        >
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-2.5">
            <UserX size={18} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{inactivi}</p>
          <p className="text-slate-700 text-sm font-medium mt-0.5">Inactivi</p>
        </button>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center mb-2.5">
            <Layers size={18} className="text-violet-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{cursuriActiveCount}</p>
          <p className="text-slate-700 text-sm font-medium mt-0.5">Cursuri active</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setInscrisiLuna(!inscrisiLuna)
            if (!inscrisiLuna) setStatus('toti')
          }}
          className={`rounded-xl p-4 shadow-sm border text-left transition-all ${
            inscrisiLuna
              ? 'bg-sky-50 border-sky-200 ring-2 ring-sky-300'
              : 'bg-white border-slate-100'
          }`}
        >
          <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center mb-2.5">
            <CalendarPlus size={18} className="text-sky-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{inscrisiLunaCount}</p>
          <p className="text-slate-700 text-sm font-medium mt-0.5">Înscriși luna asta</p>
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
              onChange={e => {
                setStatus(e.target.value as typeof status)
                setInscrisiLuna(false)
              }}
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
                setInscrisiLuna(false)
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
                <th className="text-left px-6 py-4 text-slate-500 font-semibold text-sm">Ședințe</th>
                <th className="text-right px-6 py-4 text-slate-500 font-semibold text-sm">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtrati.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400 text-sm">
                    Niciun cursant nu corespunde filtrelor.
                  </td>
                </tr>
              ) : (
                filtrati.map(c => {
                  const insc = inscrieri.filter(i => i.cursant_id === c.id && i.activ)
                  const cursuriCursant = insc
                    .map(i => cursuri.find(cur => cur.id === i.curs_id))
                    .filter(Boolean)
                  const moduleActive = insc
                    .map(i => module.find(m => m.id === i.modul_activ_id))
                    .filter(Boolean)
                  const sold = soldPentru(c.id)

                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <CursantAvatar id={c.id} nume={c.nume} prenume={c.prenume} />
                          <p className="font-semibold text-slate-900">
                            {c.prenume} {c.nume}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sold ? (
                          <div>
                            <p
                              className={`text-sm font-semibold ${
                                sold.ramase <= 0
                                  ? 'text-amber-600'
                                  : sold.ramase <= 1
                                    ? 'text-amber-600'
                                    : 'text-emerald-600'
                              }`}
                            >
                              {sold.ramase}
                              <span className="text-slate-400 font-normal"> / {sold.incluse}</span>
                            </p>
                            <p className="text-[11px] text-slate-400">rămase</p>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
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
