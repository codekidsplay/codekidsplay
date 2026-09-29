'use client'

import { useEffect, useState } from 'react'
import { cursuri, module, lectii } from '@/lib/mockData'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import { useElevCursantId } from '@/hooks/useElevCursantId'
import { useProgresCursant } from '@/hooks/useProgresCursant'
import LectieMarkdown from '@/components/LectieMarkdown'

export default function InvataLectiePage() {
  const params = useParams<{ cursId: string; lectieId: string }>()
  const { cursId, lectieId } = params
  const cursantId = useElevCursantId()
  const { data, loading } = useProgresCursant(cursantId)
  const [markdown, setMarkdown] = useState<string | null>(null)

  const curs = cursuri.find(c => c.id === cursId)
  const lectie = lectii.find(l => l.id === lectieId)
  const modul = lectie ? module.find(m => m.id === lectie.modul_id) : undefined

  useEffect(() => {
    if (!modul || !lectie) return
    let cancelled = false
    void fetch(`/api/lectii/${modul.id}/${lectie.ordine}`)
      .then(r => r.json())
      .then((j: { markdown?: string | null }) => {
        if (!cancelled) setMarkdown(j.markdown ?? null)
      })
      .catch(() => {
        if (!cancelled) setMarkdown(null)
      })
    return () => {
      cancelled = true
    }
  }, [modul, lectie])

  if (!cursantId || loading) return <p className="text-slate-400">Se încarcă…</p>
  if (!curs || !lectie || !modul || modul.curs_id !== cursId) {
    return <p className="text-slate-500">Lecția nu a fost găsită.</p>
  }

  const unlockedIds = new Set((data?.progres ?? []).filter(p => p.bifat).map(p => p.lectie_id))
  const unlocked = unlockedIds.has(lectieId)

  const lectiiModul = lectii
    .filter(l => l.modul_id === modul.id)
    .sort((a, b) => a.ordine - b.ordine)
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

        {markdown ? (
          <LectieMarkdown markdown={markdown} accentColor={curs.culoare} />
        ) : (
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>Conținutul lecției se încarcă… Sau îl vezi cu profesorul în clasă.</p>
            <code className="text-sm bg-slate-100 px-1.5 py-0.5 rounded">lectii/</code>
          </div>
        )}
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
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 ml-auto"
          >
            {next.titlu} <ArrowRight size={16} />
          </Link>
        ) : null}
      </nav>
    </div>
  )
}
