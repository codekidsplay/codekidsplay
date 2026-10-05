'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, setSession, type Rol, type Session } from '@/lib/auth'
import { getAuthSessionAction } from '@/app/actions/auth'
import { termeniParinteStatusAction, accepteazaTermeniParinteAction } from '@/app/actions/termeniParinte'
import Link from 'next/link'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'

interface Props {
  roles: Rol[]
  children: React.ReactNode
  /** Unde redirect dacă nu e logat / rol greșit */
  fallback?: string
}

function persistFromAuth(auth: NonNullable<Awaited<ReturnType<typeof getAuthSessionAction>>>): Session {
  if (auth.rol === 'admin') {
    return { rol: 'admin', email: auth.email, nume: auth.nume, userId: auth.userId }
  }
  if (auth.rol === 'profesor') {
    return {
      rol: 'profesor',
      email: auth.email,
      nume: auth.nume,
      userId: auth.userId,
      cursant_ids: auth.cursant_ids,
    }
  }
  if (auth.rol === 'parinte') {
    return {
      rol: 'parinte',
      email: auth.email,
      nume: auth.nume,
      cursant_ids: auth.cursant_ids,
    }
  }
  return {
    rol: 'elev',
    username: auth.username,
    cursant_id: auth.cursant_id,
    prenume: auth.prenume,
    nume: auth.nume,
  }
}

export default function RequireAuth({ roles, children, fallback = '/login' }: Props) {
  const router = useRouter()
  const [session, setSessionState] = useState<Session | null | undefined>(undefined)
  const [termeniDeAcceptat, setTermeniDeAcceptat] = useState(false)
  const [bifat, setBifat] = useState(false)
  const [salvez, setSalvez] = useState(false)
  const [eroare, setEroare] = useState<string | null>(null)

  const rolesKey = roles.join(',')

  useEffect(() => {
    let cancelled = false

    void (async () => {
      if (isSupabaseConfiguredClient()) {
        const auth = await getAuthSessionAction()
        if (cancelled) return
        if (!auth || !roles.includes(auth.rol)) {
          setSessionState(null)
          router.replace(fallback)
          return
        }
        const local = persistFromAuth(auth)
        setSession(local)
        if (auth.rol === 'parinte') {
          const st = await termeniParinteStatusAction()
          if (cancelled) return
          setTermeniDeAcceptat(st.trebuieAcceptat)
        }
        setSessionState(local)
        return
      }

      const s = getSession()
      setSessionState(s)
      if (!s || !roles.includes(s.rol)) {
        router.replace(fallback)
      }
    })()

    return () => {
      cancelled = true
    }
    // roles via rolesKey — evită loop pe array nou la fiecare render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesKey, fallback, router])

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">
        Se verifică sesiunea…
      </div>
    )
  }

  if (!session || !roles.includes(session.rol)) {
    return null
  }

  if (termeniDeAcceptat) {
    const accepta = async () => {
      setSalvez(true)
      setEroare(null)
      const r = await accepteazaTermeniParinteAction()
      setSalvez(false)
      if (!r.ok) {
        setEroare(r.error)
        return
      }
      setTermeniDeAcceptat(false)
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Termeni și Condiții</h1>
          <p className="text-sm text-slate-600">
            Pentru a continua, te rugăm să citești și să accepți Termenii și Condițiile.
          </p>
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={bifat}
              onChange={e => setBifat(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 accent-blue-600"
            />
            <span className="text-sm text-slate-700">
              Am citit și accept{' '}
              <Link
                href="/termeni"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline underline-offset-2"
              >
                Termenii și Condițiile
              </Link>
              .
            </span>
          </label>
          {eroare ? <p className="text-sm text-red-600">{eroare}</p> : null}
          <button
            type="button"
            disabled={!bifat || salvez}
            onClick={() => void accepta()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            {salvez ? 'Salvez…' : 'Continuă'}
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
