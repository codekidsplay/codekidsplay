'use client'

import { useState } from 'react'
import { cursuri } from '@/lib/mockData'
import { getStore, toggleInscriereCurs } from '@/lib/mockStore'
import { toggleInscriereCursAction } from '@/app/actions/progres'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'

interface Props {
  cursantId: string
  onChange: () => void
  /** Cursuri active (din Supabase) — dacă e furnizat, panoul nu mai citește mock store */
  inscrieriActive?: Set<string>
}

function isUuid(id: string): boolean {
  return /^[0-9a-f-]{36}$/i.test(id)
}

export default function InscrieriCursuriPanel({ cursantId, onChange, inscrieriActive }: Props) {
  const useSupabase = isSupabaseConfiguredClient() && isUuid(cursantId)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const activeIds =
    useSupabase && inscrieriActive
      ? inscrieriActive
      : new Set(
          getStore()
            .inscrieri.filter(i => i.cursant_id === cursantId && i.activ)
            .map(i => i.curs_id),
        )

  const onToggle = async (cursId: string) => {
    setError(null)
    if (useSupabase) {
      setLoading(cursId)
      const result = await toggleInscriereCursAction(cursantId, cursId)
      setLoading(null)
      if (!result.ok) {
        setError(result.error)
        return
      }
    } else {
      toggleInscriereCurs(cursantId, cursId)
    }
    onChange()
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
      <h2 className="font-semibold text-slate-900">Cursuri (C++, Python, …)</h2>
      <p className="text-sm text-slate-400 mt-1 mb-4">
        Bifează la ce cursuri e înscris elevul. Apoi, pe fiecare curs, alegi modulul (Modul 1, 2…).
      </p>
      {error && <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {cursuri.map(c => {
          const on = activeIds.has(c.id)
          return (
            <button
              key={c.id}
              type="button"
              disabled={loading === c.id}
              onClick={() => onToggle(c.id)}
              className="px-3.5 py-2 rounded-xl text-sm font-medium border-2 transition-all disabled:opacity-50"
              style={
                on
                  ? {
                      borderColor: c.culoare,
                      backgroundColor: `${c.culoare}18`,
                      color: c.culoare,
                    }
                  : { borderColor: '#e2e8f0', backgroundColor: '#f8fafc', color: '#64748b' }
              }
            >
              {on ? '✓ ' : ''}
              {c.nume}
            </button>
          )
        })}
      </div>
    </div>
  )
}
