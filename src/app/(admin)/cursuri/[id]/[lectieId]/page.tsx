import { cursuri, module, lectii } from '@/lib/mockData'
import { getLectieMarkdown } from '@/lib/lectiiContent'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react'
import LectieMarkdown from '@/components/LectieMarkdown'

export default async function ProfesorLectiePage({
  params,
}: {
  params: Promise<{ id: string; lectieId: string }>
}) {
  const { id: cursId, lectieId } = await params
  const curs = cursuri.find(c => c.id === cursId)
  const lectie = lectii.find(l => l.id === lectieId)
  if (!curs || !lectie) notFound()

  const modul = module.find(m => m.id === lectie.modul_id)
  if (!modul || modul.curs_id !== cursId) notFound()

  const markdown = getLectieMarkdown(modul.id, lectie.ordine)

  const lectiiModul = lectii
    .filter(l => l.modul_id === modul.id)
    .sort((a, b) => a.ordine - b.ordine)
  const idx = lectiiModul.findIndex(l => l.id === lectieId)
  const prev = idx > 0 ? lectiiModul[idx - 1] : null
  const next = idx >= 0 && idx < lectiiModul.length - 1 ? lectiiModul[idx + 1] : null

  return (
    <div>
      <Link
        href={`/cursuri/${cursId}`}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm mb-6"
      >
        <ArrowLeft size={16} /> {modul.nume}
      </Link>

      <div className="mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: curs.culoare }}
        >
          <Eye size={12} /> Vizualizare profesor
        </span>
      </div>

      <article className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: curs.culoare }}>
          {curs.nume} · Lecția {lectie.ordine}
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{lectie.titlu}</h1>

        {markdown ? (
          <LectieMarkdown markdown={markdown} accentColor={curs.culoare} />
        ) : (
          <div className="rounded-xl bg-amber-50 border border-amber-100 p-5 text-amber-900 text-sm space-y-2">
            <p className="font-semibold">Conținutul acestei lecții nu e încă încărcat pe site.</p>
            <p>
              Titlul există în programă. Fișierul markdown va apărea aici când e adăugat în{' '}
              <code className="bg-amber-100 px-1 rounded">content/lectii/</code>.
            </p>
          </div>
        )}
      </article>

      <nav className="flex items-center justify-between mt-6 gap-4">
        {prev ? (
          <Link
            href={`/cursuri/${cursId}/${prev.id}`}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} /> L{prev.ordine}. {prev.titlu}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/cursuri/${cursId}/${next.id}`}
            className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl"
            style={{ backgroundColor: curs.culoare }}
          >
            L{next.ordine}. {next.titlu} <ArrowRight size={16} />
          </Link>
        ) : (
          <Link
            href={`/cursuri/${cursId}`}
            className="text-sm font-medium px-4 py-2 rounded-xl bg-slate-800 text-white"
          >
            Înapoi la curs
          </Link>
        )}
      </nav>
    </div>
  )
}
