import { cursuri, module, lectii } from '@/lib/mockData'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'

export default async function CursDetaliuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const curs = cursuri.find(c => c.id === id)
  if (!curs) notFound()

  const moduleCurs = module
    .filter(m => m.curs_id === id)
    .sort((a, b) => a.ordine - b.ordine)
    .map(m => ({
      ...m,
      lectii: lectii.filter(l => l.modul_id === m.id).sort((a, b) => a.ordine - b.ordine),
    }))

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cursuri" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-4 h-10 rounded-full" style={{ backgroundColor: curs.culoare }} />
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{curs.nume}</h1>
            <p className="text-slate-400 text-sm">{moduleCurs.length} module · {moduleCurs.reduce((s, m) => s + m.lectii.length, 0)} lecții totale</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {moduleCurs.map(modul => (
          <div key={modul.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${curs.culoare}20` }}>
                <BookOpen size={16} style={{ color: curs.culoare }} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{modul.nume}</h3>
                <p className="text-slate-400 text-xs">{modul.lectii.length} lecții</p>
              </div>
            </div>
            <div className="p-5 space-y-2">
              {modul.lectii.map(l => (
                <div
                  key={l.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50"
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white"
                    style={{ backgroundColor: curs.culoare }}
                  >
                    {l.ordine}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{l.titlu}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
