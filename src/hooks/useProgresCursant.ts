'use client'

import { useCallback, useEffect, useState } from 'react'
import { getProgresCursantAction, type ProgresCursantData } from '@/app/actions/progres'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'
import { lectii } from '@/lib/mockData'
import { esteActiv } from '@/lib/autodidact'

/**
 * Pentru elev: lecțiile modulelor „Autodidact” aflate în perioada de acces sunt
 * deschise din prima zi (progres sintetic). După expirare dispar singure.
 * Nu se scrie nimic în baza de date și nu se consumă ședințe.
 */
function aplicaAutodidact(data: ProgresCursantData): ProgresCursantData {
  const azi = new Date().toISOString().slice(0, 10)
  const active = (data.autodidact ?? []).filter(a => esteActiv(a, azi))
  if (active.length === 0) return data

  const progres = [...data.progres]
  const inscrieri = [...data.inscrieri]
  const avute = new Set(progres.filter(p => p.bifat).map(p => p.lectie_id))

  for (const a of active) {
    for (const l of lectii.filter(x => x.modul_id === a.modul_id)) {
      if (avute.has(l.id)) continue
      avute.add(l.id)
      progres.push({
        id: `autodidact-${a.id}-${l.id}`,
        cursant_id: data.cursant?.id ?? '',
        lectie_id: l.id,
        bifat: true,
        data_bifat: a.data_start,
      })
    }
    // Cursul trebuie să apară în „Cursurile mele”; dacă nu e deja înscris, îl adăugăm virtual.
    const idx = inscrieri.findIndex(i => i.curs_id === a.curs_id && i.activ)
    if (idx >= 0) {
      // Înscris la curs, dar fără modul activ → afișăm modulul autodidact
      if (!inscrieri[idx].modul_activ_id) {
        inscrieri[idx] = { ...inscrieri[idx], modul_activ_id: a.modul_id }
      }
    } else {
      inscrieri.push({
        id: `autodidact-${a.id}`,
        cursant_id: data.cursant?.id ?? '',
        curs_id: a.curs_id,
        modul_activ_id: a.modul_id,
        activ: true,
      })
    }
  }
  return { ...data, progres, inscrieri }
}

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
      setData(aplicaAutodidact(r.data))
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
