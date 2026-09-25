import { cursuri, module, lectii } from '@/lib/mockData'
import Link from 'next/link'
import { BookOpen, ChevronRight } from 'lucide-react'

export default function CursuriPage() {
  const cursuriCuModule = cursuri.map(curs => ({
    ...curs,
    module: module
      .filter(m => m.curs_id === curs.id)
      .sort((a, b) => a.ordine - b.ordine)
      .map(m => ({
        ...m,
        lectii: lectii.filter(l => l.modul_id === m.id).sort((a, b) => a.ordine - b.ordine),
      })),
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Lecții — vizualizare profesor</h1>
        <p className="text-slate-500 mt-1">
          {cursuri.length} cursuri · click pe un curs, apoi pe o lecție pentru conținutul complet
        </p>
      </div>

      <div className="space-y-6">
        {cursuriCuModule.map(curs => {
          const totalLectii = curs.module.reduce((s, m) => s + m.lectii.length, 0)

          return (
            <div key={curs.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="h-1.5" style={{ backgroundColor: curs.culoare }} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${curs.culoare}20` }}
                    >
                      <BookOpen size={18} style={{ color: curs.culoare }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{curs.nume}</h2>
                      <p className="text-slate-400 text-sm">
                        {curs.module.length} module · {totalLectii} lecții
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/cursuri/${curs.id}`}
                    className="text-sm font-medium hover:underline flex items-center gap-1"
                    style={{ color: curs.culoare }}
                  >
                    Detalii <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="space-y-3">
                  {curs.module.map((modul) => (
                    <div key={modul.id} className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-800 text-sm">{modul.nume}</h3>
                        <span className="text-xs text-slate-400">{modul.lectii.length} lecții</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {modul.lectii.slice(0, 5).map((l) => (
                          <span
                            key={l.id}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${curs.culoare}15`, color: curs.culoare }}
                          >
                            L{l.ordine}: {l.titlu}
                          </span>
                        ))}
                        {modul.lectii.length > 5 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-500">
                            +{modul.lectii.length - 5} mai multe
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
