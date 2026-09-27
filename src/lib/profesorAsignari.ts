/**
 * Asignări profesor ↔ cursant (mock localStorage).
 * În producție: tabela public.profesor_cursanti + session.cursant_ids la login.
 */

const KEY = 'ckp-profesor-asignari-v2'

export type ProfesorAsignare = {
  /** email (mock) sau userId (Supabase — se sincronizează în session) */
  profesor_key: string
  cursant_id: string
}

function load(): ProfesorAsignare[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as ProfesorAsignare[]
  } catch {
    return []
  }
}

function save(rows: ProfesorAsignare[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(rows))
}

export function getAsignari(): ProfesorAsignare[] {
  return load()
}

export function cursantIdsPentruProfesor(profesorKey: string): string[] {
  const k = profesorKey.trim().toLowerCase()
  return load()
    .filter(a => a.profesor_key.toLowerCase() === k)
    .map(a => a.cursant_id)
}

export function asigneazaCursantProfesor(profesorKey: string, cursantId: string) {
  const k = profesorKey.trim().toLowerCase()
  const rows = load()
  if (rows.some(a => a.profesor_key.toLowerCase() === k && a.cursant_id === cursantId)) return
  rows.push({ profesor_key: k, cursant_id: cursantId })
  save(rows)
}

export function setProfesoriPentruCursant(cursantId: string, profesorKeys: string[]) {
  const keys = profesorKeys.map(k => k.trim().toLowerCase()).filter(Boolean)
  const rows = load().filter(a => a.cursant_id !== cursantId)
  for (const k of keys) {
    rows.push({ profesor_key: k, cursant_id: cursantId })
  }
  save(rows)
}

export function profesoriKeysPentruCursant(cursantId: string): string[] {
  return load().filter(a => a.cursant_id === cursantId).map(a => a.profesor_key)
}
