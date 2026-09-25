import { cursanti, abonamente, plati, sedinte, cursuri, inscrieri } from '@/lib/mockData'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, CreditCard, Calendar } from 'lucide-react'
import AdaugaSedintaButton from '@/components/AdaugaSedintaButton'
import AdaugaPlataButton from '@/components/AdaugaPlataButton'

export default async function CursantAbonamentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cursant = cursanti.find(c => c.id === id)
  if (!cursant) notFound()

  const aboCursant = abonamente.filter(a => a.cursant_id === id)
  const platiCursant = plati.filter(p => p.cursant_id === id)
  const sedinteCursant = sedinte.filter(s => s.cursant_id === id).sort((a, b) => b.data.localeCompare(a.data))

  const aboActiv = aboCursant.find(a => a.activ)
  const sedinteConsume = aboActiv
    ? sedinte.filter(s => s.cursant_id === id && s.abonament_id === aboActiv.id && s.prezent).length
    : 0
  const sold = aboActiv ? aboActiv.sedinte_incluse - sedinteConsume : 0

  const cursuriCursant = inscrieri
    .filter(i => i.cursant_id === id)
    .map(i => cursuri.find(c => c.id === i.curs_id))
    .filter(Boolean)

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/abonamente" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">{cursant.nume} {cursant.prenume}</h1>
          <p className="text-slate-500 mt-1">{cursant.email_parinte}</p>
        </div>
        <Link href={`/cursanti/${id}`} className="text-sm text-blue-600 hover:underline font-medium">
          Vezi progres lecții →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Sold */}
        <div className={`rounded-2xl p-6 shadow-sm border-2 ${sold <= 1 ? 'border-amber-300 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}>
          <p className="text-slate-600 font-medium mb-2">Sold ședințe</p>
          <p className={`text-5xl font-black ${sold <= 1 ? 'text-amber-500' : 'text-emerald-600'}`}>{sold}</p>
          <p className="text-slate-500 text-sm mt-1">din {aboActiv?.sedinte_incluse ?? 0} plătite</p>
          {sold <= 1 && <p className="text-amber-600 text-xs font-semibold mt-2">⚠ Reînnoire necesară</p>}
        </div>

        {/* Abonament activ */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <p className="text-slate-600 font-medium mb-2">Abonament activ</p>
          {aboActiv ? (
            <>
              <p className="text-2xl font-bold text-slate-900">
                {aboActiv.tip === 'lunar' ? 'Lunar' : `Pachet ${aboActiv.sedinte_incluse}`}
              </p>
              <p className="text-blue-600 font-bold mt-1">{aboActiv.pret} lei</p>
              <p className="text-slate-400 text-xs mt-1">din {new Date(aboActiv.data_start).toLocaleDateString('ro-RO')}</p>
            </>
          ) : (
            <p className="text-slate-400">Niciun abonament activ</p>
          )}
        </div>

        {/* Total plătit */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <p className="text-slate-600 font-medium mb-2">Total plătit</p>
          <p className="text-3xl font-bold text-slate-900">{platiCursant.reduce((s, p) => s + p.suma, 0)} lei</p>
          <p className="text-slate-400 text-sm mt-1">{platiCursant.length} plăți</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Ședințe */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-slate-400" />
              <h2 className="font-bold text-slate-900">Ședințe</h2>
              <span className="text-slate-400 text-sm">({sedinteCursant.length} total)</span>
            </div>
            {aboActiv && <AdaugaSedintaButton cursantId={id} abonamentId={aboActiv.id} />}
          </div>
          <div className="p-5 space-y-2 max-h-96 overflow-y-auto">
            {sedinteCursant.length === 0 ? (
              <p className="text-slate-400 text-center py-6">Nicio ședință înregistrată</p>
            ) : (
              sedinteCursant.map(s => (
                <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl ${s.prezent ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  {s.prezent
                    ? <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                    : <XCircle size={18} className="text-red-400 flex-shrink-0" />
                  }
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {new Date(s.data).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    {s.nota && <p className="text-xs text-slate-400">{s.nota}</p>}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.prezent ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                    {s.prezent ? 'Prezent' : 'Absent'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Plăți */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-slate-400" />
              <h2 className="font-bold text-slate-900">Istoricul plăților</h2>
              <span className="text-slate-400 text-sm">({platiCursant.length} total)</span>
            </div>
            <AdaugaPlataButton
              cursantId={id}
              abonamentId={aboActiv?.id}
              numarCursant={`${cursant.nume} ${cursant.prenume}`}
            />
          </div>
          <div className="p-5 space-y-3">
            {platiCursant.length === 0 ? (
              <p className="text-slate-400 text-center py-6">Nicio plată înregistrată</p>
            ) : (
              [...platiCursant].reverse().map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-900">{new Date(p.data_plata).toLocaleDateString('ro-RO')}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{p.metoda}</span>
                      {p.nota && <span className="text-xs text-slate-400">{p.nota}</span>}
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold text-lg">{p.suma} lei</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
