'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CreditCard } from 'lucide-react'
import AdaugaPlataButton from '@/components/AdaugaPlataButton'
import {
  getDetaliiCursantAbonamentAction,
  type DetaliiCursantAbonament,
} from '@/app/actions/abonamente'

export default function CursantAbonamentDetail({ cursantId }: { cursantId: string }) {
  const [data, setData] = useState<DetaliiCursantAbonament | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const r = await getDetaliiCursantAbonamentAction(cursantId)
    if (r.ok) {
      setData(r.data)
      setError(null)
    } else {
      setError(r.error)
    }
    setLoading(false)
  }, [cursantId])

  useEffect(() => {
    void refresh()
  }, [refresh])

  if (loading) return <p className="text-slate-400">Se încarcă…</p>

  if (error || !data?.cursant) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 mb-4">{error ?? 'Cursantul nu a fost găsit.'}</p>
        <Link href="/abonamente" className="text-blue-600 hover:underline font-medium">
          ← Înapoi la abonamente
        </Link>
      </div>
    )
  }

  const { cursant, abonamente, sedinte, plati } = data
  const aboActiv = abonamente.find(a => a.activ)
  const sedinteConsume = aboActiv
    ? sedinte.filter(s => s.abonament_id === aboActiv.id && s.prezent).length
    : 0
  const sold = aboActiv ? aboActiv.sedinte_incluse - sedinteConsume : 0

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
        <Link href={`/cursanti/${cursantId}`} className="text-sm text-blue-600 hover:underline font-medium">
          Vezi progres lecții →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className={`rounded-2xl p-6 shadow-sm border-2 ${sold <= 1 ? 'border-amber-300 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}>
          <p className="text-slate-600 font-medium mb-2">Sold ședințe</p>
          <p className={`text-5xl font-black ${sold <= 1 ? 'text-amber-500' : 'text-emerald-600'}`}>{sold}</p>
          <p className="text-slate-500 text-sm mt-1">din {aboActiv?.sedinte_incluse ?? 0} plătite</p>
          {sold <= 1 && <p className="text-amber-600 text-xs font-semibold mt-2">⚠ Reînnoire necesară</p>}
        </div>

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

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <p className="text-slate-600 font-medium mb-2">Total plătit</p>
          <p className="text-3xl font-bold text-slate-900">{plati.reduce((s, p) => s + p.suma, 0)} lei</p>
          <p className="text-slate-400 text-sm mt-1">{plati.length} plăți</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden max-w-2xl">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard size={18} className="text-slate-400" />
            <h2 className="font-bold text-slate-900">Istoricul plăților</h2>
            <span className="text-slate-400 text-sm">({plati.length} total)</span>
          </div>
          <AdaugaPlataButton
            cursantId={cursantId}
            abonamentId={aboActiv?.id}
            numarCursant={`${cursant.nume} ${cursant.prenume}`}
            onSaved={refresh}
          />
        </div>
        <div className="p-5 space-y-3">
          {plati.length === 0 ? (
            <p className="text-slate-400 text-center py-6">Nicio plată înregistrată</p>
          ) : (
            plati.map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-900">
                    {new Date(p.data_plata + 'T12:00:00').toLocaleDateString('ro-RO')}
                  </p>
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
  )
}
