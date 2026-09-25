'use client'

import { cursuri } from '@/lib/mockData'
import { getStore, toggleInscriereCurs } from '@/lib/mockStore'

interface Props {
  cursantId: string
  onChange: () => void
}

export default function InscrieriCursuriPanel({ cursantId, onChange }: Props) {
  const store = getStore()
  const activeIds = new Set(
    store.inscrieri.filter(i => i.cursant_id === cursantId && i.activ).map(i => i.curs_id)
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
      <h2 className="font-semibold text-slate-900">Cursuri (C++, Python, …)</h2>
      <p className="text-sm text-slate-400 mt-1 mb-4">
        Bifează la ce cursuri e înscris elevul. Apoi, pe fiecare curs, alegi modulul (Modul 1, 2…).
      </p>
      <div className="flex flex-wrap gap-2">
        {cursuri.map(c => {
          const on = activeIds.has(c.id)
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                toggleInscriereCurs(cursantId, c.id)
                onChange()
              }}
              className="px-3.5 py-2 rounded-xl text-sm font-medium border-2 transition-all"
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
