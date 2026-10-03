'use client'

import { useEffect, useState } from 'react'
import { Rocket } from 'lucide-react'
import {
  listAutodidactCursantAction,
  type AutodidactCursant,
} from '@/app/actions/abonamente'
import { module as moduleCurriculum } from '@/lib/mockData'
import { esteActiv, zileRamase } from '@/lib/autodidact'

function dataRo(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('ro-RO')
}

/** Staff: accesurile „Autodidact” ale cursantului + prețul propus pentru următorul modul. */
export default function AutodidactPanel({ cursantId }: { cursantId: string }) {
  const [data, setData] = useState<AutodidactCursant | null>(null)

  useEffect(() => {
    let cancelled = false
    void listAutodidactCursantAction(cursantId).then(r => {
      if (!cancelled && r.ok) setData(r.data)
    })
    return () => {
      cancelled = true
    }
  }, [cursantId])

  if (!data || data.accesuri.length === 0) return null

  const azi = new Date().toISOString().slice(0, 10)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Rocket size={18} className="text-fuchsia-600" />
        <h2 className="font-semibold text-slate-900">Autodidact</h2>
      </div>
      <ul className="space-y-2">
        {data.accesuri.map(a => {
          const modul = moduleCurriculum.find(m => m.id === a.modul_id)
          const activ = esteActiv(a, azi)
          return (
            <li
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-2 text-sm rounded-xl border border-slate-100 px-3 py-2"
            >
              <span className="font-medium text-slate-800">{modul?.nume ?? a.modul_id}</span>
              <span className="text-slate-500">
                {dataRo(a.data_start)} – {dataRo(a.data_sfarsit)} · {a.pret} lei
              </span>
              <span
                className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${
                  activ ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {activ ? `activ · ${zileRamase(a, azi)} zile` : 'expirat'}
              </span>
            </li>
          )
        })}
      </ul>
      <p className="text-xs text-slate-400 mt-3">
        Următorul modul azi: <strong className="text-slate-600">{data.pretUrmator.pret} lei</strong> —{' '}
        {data.pretUrmator.motiv}
      </p>
    </div>
  )
}
