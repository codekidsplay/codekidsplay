'use client'

import RequireAuth from '@/components/RequireAuth'

/** Cererile conțin date personale ale părinților — doar admin. */
export default function CereriLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={['admin']} fallback="/admin">
      {children}
    </RequireAuth>
  )
}
