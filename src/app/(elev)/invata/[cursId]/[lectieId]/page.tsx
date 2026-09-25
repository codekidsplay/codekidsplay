'use client'

import { useEffect, useState } from 'react'
import { cursuri, module, lectii } from '@/lib/mockData'
import { getStore } from '@/lib/mockStore'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import AscultaLectie, { textLectiePentruAscultare } from '@/components/AscultaLectie'
import { useElevCursantId } from '@/hooks/useElevCursantId'

export default function InvataLectiePage() {
  const params = useParams<{ cursId: string; lectieId: string }>()
  const { cursId, lectieId } = params
  const cursantId = useElevCursantId()
  const [ready, setReady] = useState(false)

  useEffect(() => setReady(true), [])

  const curs = cursuri.find(c => c.id === cursId)
  const lectie = lectii.find(l => l.id === lectieId)
  const modul = lectie ? module.find(m => m.id === lectie.modul_id) : undefined

  if (!ready || !cursantId) return <p className="text-slate-400">Se încarcă…</p>
  if (!curs || !lectie || !modul || modul.curs_id !== cursId) {
    return <p className="text-slate-500">Lecția nu a fost găsită.</p>
  }

  const store = getStore()
  const unlocked = store.progres.some(
    p => p.cursant_id === cursantId && p.lectie_id === lectieId && p.bifat
  )

  const lectiiModul = lectii
    .filter(l => l.modul_id === modul.id)
    .sort((a, b) => a.ordine - b.ordine)
  const unlockedIds = new Set(
    store.progres
      .filter(p => p.cursant_id === cursantId && p.bifat)
      .map(p => p.lectie_id)
  )
  const navigabile = lectiiModul.filter(l => unlockedIds.has(l.id))
  const idx = navigabile.findIndex(l => l.id === lectieId)
  const prev = idx > 0 ? navigabile[idx - 1] : null
  const next = idx >= 0 && idx < navigabile.length - 1 ? navigabile[idx + 1] : null

  if (!unlocked) {
    return (
      <div className="text-center py-16">
        <Lock className="mx-auto text-slate-300 mb-4" size={36} />
        <h1 className="text-xl font-bold text-slate-800 mb-2">Lecție încă blocată</h1>
        <p className="text-slate-500 text-sm mb-6">
          Profesorul o deblochează după ce o faceți în clasă.
        </p>
        <Link href={`/invata/${cursId}`} className="text-sky-600 text-sm font-medium">
          ← Înapoi la modul
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        href={`/invata/${cursId}`}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm mb-6"
      >
        <ArrowLeft size={16} /> {modul.nume}
      </Link>

      <article className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: curs.culoare }}>
          Lecția {lectie.ordine} · ~2 ore
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{lectie.titlu}</h1>

        <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-4">
          <CheckCircle2 size={18} /> Deblocată de profesor — poți citi acasă
        </div>

        <AscultaLectie
          accentColor={curs.culoare}
          text={textLectiePentruAscultare({
            titlu: lectie.titlu,
            ordine: lectie.ordine,
            modulNume: modul.nume,
          })}
        />

        <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
          <p>
            Conținutul complet vine din{' '}
            <code className="text-sm bg-slate-100 px-1.5 py-0.5 rounded">lectii/</code>.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Planul orei (~2h)</li>
            <li>Exemple practice</li>
            <li>Exerciții în clasă</li>
            <li>Temă pentru acasă</li>
          </ul>
        </div>
      </article>

      <nav className="flex items-center justify-between mt-6 gap-4">
        {prev ? (
          <Link
            href={`/invata/${cursId}/${prev.id}`}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} /> {prev.titlu}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/invata/${cursId}/${next.id}`}
            className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl"
            style={{ backgroundColor: curs.culoare }}
          >
            Următoarea <ArrowRight size={16} />
          </Link>
        ) : (
          <Link
            href={`/invata/${cursId}`}
            className="text-sm font-medium px-4 py-2 rounded-xl bg-slate-800 text-white"
          >
            Înapoi la modul
          </Link>
        )}
      </nav>
    </div>
  )
}
