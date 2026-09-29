'use client'

import { useCallback, useEffect, useState } from 'react'
import { getProgresCursantAction, type ProgresCursantData } from '@/app/actions/progres'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'

export function useProgresCursant(cursantId: string | null) {
  const [data, setData] = useState<ProgresCursantData | null>(null)
  const [loading, setLoading] = useState(Boolean(cursantId))
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    if (!cursantId) {
      setData(null)
      setLoading(false)
      return
    }
    if (!isSupabaseConfiguredClient()) {
      setData(null)
      setLoading(false)
      setError('Supabase neconfigurat')
      return
    }
    setLoading(true)
    const r = await getProgresCursantAction(cursantId)
    if (r.ok) {
      setData(r.data)
      setError(null)
    } else {
      setData(null)
      setError(r.error)
    }
    setLoading(false)
  }, [cursantId])

  useEffect(() => {
    void reload()
  }, [reload])

  return { data, loading, error, reload }
}
