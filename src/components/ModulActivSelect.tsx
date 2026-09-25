'use client'

import { setModulActiv } from '@/lib/mockStore'

interface Props {
  inscriereId: string
  module: Array<{ id: string; nume: string }>
  value: string | null
  onChange: () => void
  cursNume: string
}

export default function ModulActivSelect({
  inscriereId,
  module,
  value,
  onChange,
  cursNume,
}: Props) {
  const selected = module.find(m => m.id === value)

  return (
    <div className="rounded-xl border-2 border-dashed border-sky-200 bg-sky-50/80 p-4">
      <p className="text-sm font-semibold text-sky-900">Asociază modulul pentru {cursNume}</p>
      <p className="text-xs text-sky-700/80 mt-1 mb-3">
        Elevul vede modulul ales (lecții noi) și poate recapitula lecțiile bifate din modulele
        trecute. Dacă debifezi o lecție, dispare de la copil. Schimbi modulul când trece la 2, 3…
      </p>
      <label className="block">
        <span className="sr-only">Modul asociat</span>
        <select
          className="w-full border border-sky-200 rounded-xl px-3 py-2.5 text-sm font-medium bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
          value={value ?? ''}
          onChange={e => {
            setModulActiv(inscriereId, e.target.value)
            onChange()
          }}
        >
          <option value="" disabled>
            — Alege modulul —
          </option>
          {module.map(m => (
            <option key={m.id} value={m.id}>
              {m.nume}
            </option>
          ))}
        </select>
      </label>
      {selected && (
        <p className="mt-2 text-xs text-emerald-700 font-medium">
          Activ acum: {selected.nume} — poți bifa lecțiile din acest modul.
        </p>
      )}
    </div>
  )
}
