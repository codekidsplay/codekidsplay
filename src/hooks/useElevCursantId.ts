'use client'

import { useEffect, useState } from 'react'
import { getSession } from '@/lib/auth'

/** Returnează cursant_id din sesiunea elev (null până e gata). */
export function useElevCursantId(): string | null {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    const s = getSession()
    if (s?.rol === 'elev') setId(s.cursant_id)
  }, [])

  return id
}
