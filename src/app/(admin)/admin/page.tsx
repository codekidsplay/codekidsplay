import { cursanti, cursuri, inscrieri, progres } from '@/lib/mockData'
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'
import CursantAvatar from '@/components/CursantAvatar'

export default function Dashboard() {
  const activi = cursanti.filter(c => c.activ).length
  const lectiiParcurse = progres.filter(p => p.bifat).length

  const cards = [
    {
      label: 'Total Cursanți',
      value: cursanti.length,
      sub: `${activi} activi`,
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      label: 'Cursuri disponibile',
      value: cursuri.length,
      sub: 'C++, Python, Web, Arduino...',
      icon: BookOpen,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Înscrieri totale',
      value: inscrieri.length,
      sub: 'cursant-curs',
      icon: TrendingUp,
      color: 'text-violet-500',
      bg: 'bg-violet-50',
    },
    {
      label: 'Lecții parcurse',
      value: lectiiParcurse,
      sub: 'bifate de cursanți',
      icon: Award,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
  ]

  const recenti = [...cursanti].reverse().slice(0, 5)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Bun venit în platforma Code Kids Play</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {cards.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon size={22} className={color} />
            </div>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            <p className="text-slate-700 font-medium mt-1">{label}</p>
            <p className="text-slate-400 text-sm mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Cursanți recenți</h2>
          <Link href="/cursanti" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Vezi toți →
          </Link>
        </div>

        <div className="space-y-3">
          {recenti.map((c) => {
            const cursuriCursant = inscrieri
              .filter(i => i.cursant_id === c.id)
              .map(i => cursuri.find(cur => cur.id === i.curs_id)?.nume)
              .filter(Boolean)

            return (
              <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <CursantAvatar id={c.id} nume={c.nume} prenume={c.prenume} />
                  <div>
                    <p className="font-semibold text-slate-900">{c.nume} {c.prenume}</p>
                    <p className="text-slate-400 text-xs">{new Date(c.data_inscriere).toLocaleDateString('ro-RO')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex gap-1">
                    {cursuriCursant.slice(0, 2).map(curs => (
                      <span key={curs} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{curs}</span>
                    ))}
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.activ ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                    {c.activ ? 'Activ' : 'Inactiv'}
                  </span>
                  <Link href={`/cursanti/${c.id}`} className="text-blue-600 text-sm hover:underline">
                    Progres →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
