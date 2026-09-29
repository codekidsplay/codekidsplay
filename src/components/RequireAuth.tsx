'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, setSession, type Rol, type Session } from '@/lib/auth'
import { getAuthSessionAction } from '@/app/actions/auth'
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

  return <>{children}</>
}
