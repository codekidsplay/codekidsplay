'use client'

import { useCallback, useEffect, useState } from 'react'
import { Check, ChevronRight, Mail, Phone, Trash2 } from 'lucide-react'
import {
  listCereriAction,
  setStatusCerereAction,
  stergeCerereAction,
  type CerereContact,
  type StatusCerere,
} from '@/app/actions/cereri'

const STATUSURI: { id: StatusCerere; label: string; cls: string }[] = [
  { id: 'noua', label: 'Nouă', cls: 'bg-amber-100 text-amber-800' },
  { id: 'contactata', label: 'Contactată', cls: 'bg-blue-100 text-blue-800' },
  { id: 'inscris', label: 'Înscris', cls: 'bg-emerald-100 text-emerald-800' },
  { id: 'refuzata', label: 'Refuzată', cls: 'bg-slate-200 text-slate-700' },
]

type Filtru = 'toate' | StatusCerere

function formatOra(iso: string): string {
  return new Date(iso).toLocaleString('ro-RO', {
    timeZone: 'Europe/Bucharest',
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export default function CereriPanel() {
  const [cereri, setCereri] = useState<CerereContact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtru, setFiltru] = useState<Filtru>('toate')
  const [deschisId, setDeschisId] = useState<string | null>(null)

  const incarca = useCallback(async () => {
    const r = await listCereriAction()
    if (r.ok) {
      setCereri(r.data)
      setError(null)
    } else {
      setError(r.error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void incarca()
  }, [incarca])

  async function schimbaStatus(id: string, status: StatusCerere) {
    const r = await setStatusCerereAction(id, status)
    if (r.ok) setCereri(prev => prev.map(c => (c.id === id ? { ...c, status } : c)))
    else setError(r.error)
  }

  async function sterge(c: CerereContact) {
    if (!window.confirm(`Ștergi definitiv cererea de la ${c.nume}?`)) return
    const r = await stergeCerereAction(c.id)
    if (r.ok) setCereri(prev => prev.filter(x => x.id !== c.id))
    else setError(r.error)
  }

  const noi = cereri.filter(c => c.status === 'noua').length
  const vizibile = filtru === 'toate' ? cereri : cereri.filter(c => c.status === filtru)

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-900">Cereri de contact</h1>
      <p className="text-slate-500 mt-1 mb-6">
        Mesajele trimise din formularul de pe site. {noi > 0 ? `${noi} noi.` : 'Nicio cerere nouă.'}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {(['toate', ...STATUSURI.map(s => s.id)] as Filtru[]).map(f => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltru(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filtru === f ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f === 'toate' ? 'Toate' : STATUSURI.find(s => s.id === f)?.label}
          </button>
        ))}
      </div>

      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
      {loading ? <p className="text-slate-500">Se încarcă…</p> : null}
      {!loading && vizibile.length === 0 && !error ? (
        <p className="text-slate-500">Nu sunt cereri în această categorie.</p>
      ) : null}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {vizibile.map(c => {
          const st = STATUSURI.find(s => s.id === c.status)
          const deschis = deschisId === c.id
          return (
            <article key={c.id} className={c.status === 'noua' ? 'bg-amber-50/40' : ''}>
              <button
                type="button"
                onClick={() => setDeschisId(deschis ? null : c.id)}
                aria-expanded={deschis}
                className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50"
              >
                <ChevronRight
                  size={14}
                  className={`shrink-0 text-slate-400 transition-transform ${deschis ? 'rotate-90' : ''}`}
                />
                <span className="font-semibold text-slate-900 text-sm w-36 shrink-0 truncate">{c.nume}</span>
                <span className="text-sm text-slate-500 truncate flex-1 min-w-0">{c.mesaj}</span>
                <span className="text-xs text-slate-400 shrink-0 hidden sm:block">{formatOra(c.created_at)}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${st?.cls}`}>{st?.label}</span>
              </button>

              {deschis ? (
                <div className="px-4 pb-4 pl-11">
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 text-blue-700 hover:underline">
                      <Mail size={14} /> {c.email}
                    </a>
                    <a href={`tel:${c.telefon}`} className="inline-flex items-center gap-1.5 text-blue-700 hover:underline">
                      <Phone size={14} /> {c.telefon}
                    </a>
                    <span className="text-xs text-slate-400 self-center sm:hidden">{formatOra(c.created_at)}</span>
                  </div>
                  <p className="mt-3 text-slate-800 whitespace-pre-line text-sm leading-relaxed">{c.mesaj}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-700">
                    <Check size={13} /> Acord Termeni și condiții (versiunea {c.termeni_versiune}) · {formatOra(c.created_at)}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {STATUSURI.map(s => (
                      <button
                        key={s.id}
                        type="button"
                        disabled={c.status === s.id}
                        onClick={() => void schimbaStatus(c.id, s.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:bg-slate-100 disabled:opacity-60"
                      >
                        {s.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => void sterge(c)}
                      className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={13} /> Șterge
                    </button>
                  </div>
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </div>
  )
}
