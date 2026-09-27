'use client'

import RequireAuth from '@/components/RequireAuth'

/** Doar adminul gestionează echipa de profesori */
export default function ProfesoriLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={['admin']} fallback="/admin">
      {children}
    </RequireAuth>
  )
}
