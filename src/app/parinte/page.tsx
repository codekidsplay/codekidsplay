'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import RequireAuth from '@/components/RequireAuth'
import ParinteHeader from '@/components/ParinteHeader'
import CursantAvatar from '@/components/CursantAvatar'
import { getSession, type Session } from '@/lib/auth'
import { cursanti } from '@/lib/mockData'
import { getStore } from '@/lib/mockStore'
import { rezumatCopil } from '@/lib/parinteStats'
import { ArrowRight, Users } from 'lucide-react'

function ParinteHome() {
  const [session, setSession] = useState<Extract<Session, { rol: 'parinte' }> | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const s = getSession()
    if (s?.rol === 'parinte') setSession(s)
    setReady(true)
  }, [])

  if (!ready || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">
        Se încarcă…
      </div>
    )
  }

  const store = getStore()
  const copii = cursanti.filter(c => session.cursant_ids.includes(c.id))

  return (
    <div className="min-h-screen bg-slate-50">
      <ParinteHeader email={session.email} />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Users size={20} className="text-slate-500" />
          <h1 className="text-2xl font-bold text-slate-900">Copiii mei</h1>
        </div>

        <div className="space-y-3">
          {copii.map(c => {
            const r = rezumatCopil(c.id, store)
            const sold =
              r.sedinteRamase === null
                ? 'Fără abonament activ'
                : r.sedinteRamase > 0
                  ? `${r.sedinteRamase} ședințe rămase`
                  : 'Ședințele s-au terminat'

            return (
              <Link
                key={c.id}
                href={`/parinte/${c.id}`}
                className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 hover:border-slate-200 hover:shadow-sm transition-all group"
              >
                <CursantAvatar prenume={c.prenume} nume={c.nume} id={c.id} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">
                    {c.prenume} {c.nume}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Progres {r.procent}% · {sold}
                  </p>
                  {r.cursuri.length > 0 && (
                    <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-xs">
                      <div
                        className="h-full rounded-full bg-sky-500"
                        style={{ width: `${r.procent}%` }}
                      />
                    </div>
                  )}
                </div>
                <ArrowRight
                  size={18}
                  className="text-slate-300 group-hover:text-slate-600 flex-shrink-0"
                />
              </Link>
            )
          })}
          {copii.length === 0 && (
            <p className="text-slate-500 text-sm">Niciun copil asociat acestui cont.</p>
          )}
        </div>

        <p className="mt-8 text-sm text-slate-400">
          Elevul se loghează separat cu username + PIN pe{' '}
          <Link href="/login" className="text-sky-600 underline">
            Login → Elev
          </Link>
          .
        </p>
      </main>
    </div>
  )
}

export default function ParintePage() {
  return (
    <RequireAuth roles={['parinte']}>
      <ParinteHome />
    </RequireAuth>
  )
}
