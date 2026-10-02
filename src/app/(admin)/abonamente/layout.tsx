'use client'

import RequireAuth from '@/components/RequireAuth'

/** Admin: toți cursanții. Profesor: doar cursanții asignați lui. */
export default function AbonamenteLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={['admin', 'profesor']} fallback="/admin">
      {children}
    </RequireAuth>
  )
}
