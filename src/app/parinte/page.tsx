'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import RequireAuth from '@/components/RequireAuth'
import ParinteHeader from '@/components/ParinteHeader'
import CursantAvatar from '@/components/CursantAvatar'
import { getSession, type Session } from '@/lib/auth'
import { cursanti } from '@/lib/mockData'
import { listCopiiParinteAction, type CopilParinte } from '@/app/actions/cursanti'
import { getProgresCursantAction, type ProgresCursantData } from '@/app/actions/progres'
import { rezumatDinProgres } from '@/lib/progresLive'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'
import { ArrowRight, Gamepad2, Users } from 'lucide-react'

type CopilCard = CopilParinte & { progres?: ProgresCursantData }

function ParinteHome() {
  const [session, setSession] = useState<Extract<Session, { rol: 'parinte' }> | null>(null)
  const [ready, setReady] = useState(false)
  const [copii, setCopii] = useState<CopilCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const s = getSession()
    if (s?.rol === 'parinte') setSession(s)
    setReady(true)

    if (!isSupabaseConfiguredClient()) {
      if (s?.rol === 'parinte') {
        setCopii(
          cursanti
            .filter(c => s.cursant_ids.includes(c.id))
            .map(c => ({
              id: c.id,
              nume: c.nume,
              prenume: c.prenume,
              email_parinte: c.email_parinte,
              telefon_parinte: c.telefon_parinte,
              activ: c.activ,
            })),
        )
      }
      setLoading(false)
      return
    }

    void (async () => {
      const r = await listCopiiParinteAction()
      if (!r.ok) {
        setCopii([])
        setLoading(false)
        return
      }
      try {
        const raw = localStorage.getItem('ckp-session-v1')
        if (raw) {
          const prev = JSON.parse(raw) as Session
          if (prev.rol === 'parinte') {
            localStorage.setItem(
              'ckp-session-v1',
              JSON.stringify({ ...prev, cursant_ids: r.cursant_ids }),
            )
            setSession({ ...prev, cursant_ids: r.cursant_ids })
          }
        }
      } catch {
        /* ignore */
      }

      const withProgres = await Promise.all(
        r.data.map(async c => {
          const p = await getProgresCursantAction(c.id)
          return { ...c, progres: p.ok ? p.data : undefined }
        }),
      )
      setCopii(withProgres)
      setLoading(false)
    })()
  }, [])

  if (!ready || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">
        Se încarcă…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ParinteHeader email={session.email} />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Users size={20} className="text-slate-500" />
          <h1 className="text-2xl font-bold text-slate-900">Copiii mei</h1>
        </div>

        <div className="space-y-3">
          {loading ? (
            <p className="text-slate-400 text-sm">Se încarcă…</p>
          ) : (
            <>
              {copii.map(c => {
                const r = c.progres
                  ? rezumatDinProgres(c.id, c.progres)
                  : {
                      procent: 0,
                      sedinteRamase: null as number | null,
                      cursuri: [] as Array<{ id: string }>,
                    }
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
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border-2 border-sky-200 bg-sky-50 p-5 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white">
            <Gamepad2 size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sky-950">Contul copilului</p>
            <p className="mt-0.5 text-sm text-sky-900">
              Copilul se loghează <strong>separat</strong>, cu <strong>username + PIN</strong>, la
              secțiunea <strong>Login → Elev</strong>. Datele le-ai primit pe WhatsApp la înscriere.
            </p>
          </div>
          <Link
            href="/login?tip=elev"
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-sky-700"
          >
            Login elev <ArrowRight size={18} />
          </Link>
        </div>
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
