'use client'

import RequireAuth from '@/components/RequireAuth'

/** Doar adminul vede abonamentele și plățile */
export default function AbonamenteLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth roles={['admin']} fallback="/admin">
      {children}
    </RequireAuth>
  )
}
