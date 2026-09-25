'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, type Rol, type Session } from '@/lib/auth'

interface Props {
  roles: Rol[]
  children: React.ReactNode
  /** Unde redirect dacă nu e logat / rol greșit */
  fallback?: string
}

export default function RequireAuth({ roles, children, fallback = '/login' }: Props) {
  const router = useRouter()
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  const rolesKey = roles.join(',')

  useEffect(() => {
    const s = getSession()
    setSession(s)
    if (!s || !roles.includes(s.rol)) {
      router.replace(fallback)
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
