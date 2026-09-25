'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import RequireAuth from '@/components/RequireAuth'
import ParinteHeader from '@/components/ParinteHeader'
import CursantAvatar from '@/components/CursantAvatar'
import { getSession, type Session } from '@/lib/auth'
import { cursanti, lectii } from '@/lib/mockData'
import { getStore } from '@/lib/mockStore'
import {
  istoriculSedinte,
  progresPeModule,
  rezumatCopil,
} from '@/lib/parinteStats'
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react'

function ParinteCopilDetail() {
  const params = useParams<{ cursantId: string }>()
  const router = useRouter()
  const cursantId = params.cursantId
  const [session, setSession] = useState<Extract<Session, { rol: 'parinte' }> | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const s = getSession()
    if (s?.rol === 'parinte') {
      setSession(s)
      if (!s.cursant_ids.includes(cursantId)) {
        router.replace('/parinte')
      }
    }
    setReady(true)
  }, [cursantId, router])

  if (!ready || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">
        Se încarcă…
      </div>
    )
  }

  if (!session.cursant_ids.includes(cursantId)) return null

  const cursant = cursanti.find(c => c.id === cursantId)
  if (!cursant) {
    return (
      <div className="min-h-screen bg-slate-50">
        <ParinteHeader email={session.email} />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <p className="text-slate-500">Cursant negăsit.</p>
          <Link href="/parinte" className="text-sky-600 text-sm mt-4 inline-block">
            ← Înapoi
          </Link>
        </main>
      </div>
    )
  }

  const store = getStore()
  const r = rezumatCopil(cursantId, store)
  const sedinte = istoriculSedinte(cursantId, store)

  const soldLabel =
    r.sedinteRamase === null
      ? 'Fără abonament activ'
      : r.sedinteRamase > 0
        ? `${r.sedinteRamase} din ${r.sedinteIncluse} ședințe rămase`
        : `Sold epuizat (${r.sedinteRamase} din ${r.sedinteIncluse})`

  const soldClass =
    r.sedinteRamase === null
      ? 'bg-slate-50 text-slate-600 border-slate-100'
      : r.sedinteRamase > 0
        ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
        : 'bg-amber-50 text-amber-900 border-amber-100'

  return (
    <div className="min-h-screen bg-slate-50">
      <ParinteHeader email={session.email} />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/parinte"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6"
        >
          <ArrowLeft size={16} /> Copiii mei
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <CursantAvatar prenume={cursant.prenume} nume={cursant.nume} id={cursant.id} />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {cursant.prenume} {cursant.nume}
            </h1>
            <p className="text-sm text-slate-500">
              {r.lectiiBifate} din {r.lectiiTotal} lecții · {r.procent}%
            </p>
          </div>
        </div>

        <div className={`rounded-2xl border px-5 py-4 mb-6 ${soldClass}`}>
          <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">
            Abonament {r.tipAbonament ?? ''}
          </p>
          <p className="font-semibold text-lg">{soldLabel}</p>
          {r.sedinteRamase !== null && r.sedinteRamase <= 0 && (
            <p className="text-sm mt-1 opacity-80">
              Contactează profesorul pentru reînnoire.
            </p>
          )}
        </div>

        <section className="mb-8">
          <h2 className="font-semibold text-slate-900 mb-3">Progres pe cursuri</h2>
          {r.cursuri.length === 0 ? (
            <p className="text-sm text-slate-500 bg-white rounded-2xl border border-slate-100 p-5">
              Niciun curs activ.
            </p>
          ) : (
            <div className="space-y-4">
              {r.cursuri.map(curs => {
                const moduleInfo = progresPeModule(cursantId, curs.id, store)
                return (
                  <div
                    key={curs.id}
                    className="bg-white rounded-2xl border border-slate-100 p-5"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900" style={{ color: curs.culoare }}>
                          {curs.nume}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {curs.modulActiv
                            ? `Modul actual: ${curs.modulActiv}`
                            : 'Fără modul setat'}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-slate-700">
                        {curs.procent}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${curs.procent}%`, backgroundColor: curs.culoare }}
                      />
                    </div>

                    <div className="space-y-3">
                      {moduleInfo.map(m => (
                        <div key={m.id}>
                          <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className="font-medium text-slate-700">{m.nume}</span>
                            <span className="text-slate-400">
                              {m.bifate}/{m.total}
                            </span>
                          </div>
                          <ul className="space-y-1 pl-1">
                            {m.lectii.map(l => (
                              <li
                                key={l.id}
                                className="flex items-center gap-2 text-sm text-slate-600"
                              >
                                {l.bifat ? (
                                  <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                                ) : (
                                  <Circle size={14} className="text-slate-300 flex-shrink-0" />
                                )}
                                <span className={l.bifat ? '' : 'text-slate-400'}>
                                  {l.ordine}. {l.titlu}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-semibold text-slate-900 mb-3">Istoric ședințe</h2>
          {sedinte.length === 0 ? (
            <p className="text-sm text-slate-500 bg-white rounded-2xl border border-slate-100 p-5">
              Nicio ședință înregistrată încă.
            </p>
          ) : (
            <ul className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
              {sedinte.map(s => {
                const lectie = s.lectie_id ? lectii.find(l => l.id === s.lectie_id) : null
                return (
                  <li key={s.id} className="px-5 py-3.5 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800">
                        {new Date(s.data + 'T12:00:00').toLocaleDateString('ro-RO', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lectie ? lectie.titlu : s.nota || 'Ședință'}
                        {s.consuma_sedinta ? ' · consumă ședință' : ''}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium whitespace-nowrap px-2 py-1 rounded-[10px] ${
                        s.prezent
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {s.prezent ? 'Prezent' : 'Absent'}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default function ParinteCopilPage() {
  return (
    <RequireAuth roles={['parinte']}>
      <ParinteCopilDetail />
    </RequireAuth>
  )
}
