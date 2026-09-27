'use client'

import { getSession, type Session } from '@/lib/auth'
import { cursantIdsPentruProfesor } from '@/lib/profesorAsignari'

/** null = admin (toți); array = doar acești id-uri */
export function cursantIdsVizibile(session: Session | null): string[] | null {
  if (!session) return []
  if (session.rol === 'admin') return null
  if (session.rol === 'profesor') {
    const fromDb = Array.isArray(session.cursant_ids) ? session.cursant_ids : []
    // Include și asignări locale (cursanți demo u1…) + email profesor
    const fromLocal = cursantIdsPentruProfesor(session.email)
    return [...new Set([...fromDb, ...fromLocal])]
  }
  return []
}

export function filtreazaDupaVizibilitate<T extends { id: string }>(
  items: T[],
  session: Session | null,
): T[] {
  const ids = cursantIdsVizibile(session)
  if (ids === null) return items
  const set = new Set(ids)
  return items.filter(i => set.has(i.id))
}

export function poateAccesaCursant(session: Session | null, cursantId: string): boolean {
  const ids = cursantIdsVizibile(session)
  if (ids === null) return true
  return ids.includes(cursantId)
}

export function getStaffSession(): Session | null {
  const s = getSession()
  if (s?.rol === 'admin' || s?.rol === 'profesor') return s
  return null
}
