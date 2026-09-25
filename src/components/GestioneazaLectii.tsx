'use client'

import { useState, useTransition } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, Save, ChevronDown, ChevronRight, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  curs: {
    id: string
    nume: string
    culoare: string
    module: Array<{
      id: string
      nume: string
      ordine: number
      lectii: Array<{ id: string; titlu: string; continut: string | null; ordine: number }>
    }>
  }
}

export default function GestioneazaLectii({ curs }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [expandedModul, setExpandedModul] = useState<string | null>(curs.module[0]?.id ?? null)
  const [newLectie, setNewLectie] = useState<Record<string, string>>({})
  const [editLectie, setEditLectie] = useState<Record<string, { titlu: string; continut: string }>>({})
  const [saving, setSaving] = useState<string | null>(null)

  const adaugaLectie = async (modulId: string) => {
    const titlu = newLectie[modulId]?.trim()
    if (!titlu) return

    const modul = curs.module.find(m => m.id === modulId)
    const ordine = (modul?.lectii.length ?? 0) + 1

    await supabase.from('lectii').insert({ modul_id: modulId, titlu, ordine })
    setNewLectie(prev => ({ ...prev, [modulId]: '' }))
    startTransition(() => router.refresh())
  }

  const stergeeLectie = async (lectieId: string) => {
    if (!confirm('Ștergi lecția? Progresul cursanților pentru această lecție va fi și el șters.')) return
    await supabase.from('lectii').delete().eq('id', lectieId)
    startTransition(() => router.refresh())
  }

  const salveazaLectie = async (lectieId: string) => {
    const data = editLectie[lectieId]
    if (!data) return
    setSaving(lectieId)
    await supabase.from('lectii').update({ titlu: data.titlu, continut: data.continut }).eq('id', lectieId)
    setEditLectie(prev => {
      const n = { ...prev }
      delete n[lectieId]
      return n
    })
    setSaving(null)
    startTransition(() => router.refresh())
  }

  return (
    <div className="space-y-4">
      {curs.module.map(modul => {
        const isOpen = expandedModul === modul.id

        return (
          <div key={modul.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <button
              onClick={() => setExpandedModul(isOpen ? null : modul.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${curs.culoare}20` }}>
                  <BookOpen size={16} style={{ color: curs.culoare }} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900">{modul.nume}</p>
                  <p className="text-slate-400 text-xs">{modul.lectii.length} lecții</p>
                </div>
              </div>
              {isOpen ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
            </button>

            {isOpen && (
              <div className="border-t border-slate-100 p-5 space-y-3">
                {modul.lectii.map(lectie => {
                  const isEditing = !!editLectie[lectie.id]

                  return (
                    <div key={lectie.id} className="border border-slate-100 rounded-xl p-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            value={editLectie[lectie.id].titlu}
                            onChange={e => setEditLectie(prev => ({
                              ...prev,
                              [lectie.id]: { ...prev[lectie.id], titlu: e.target.value }
                            }))}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <textarea
                            value={editLectie[lectie.id].continut}
                            onChange={e => setEditLectie(prev => ({
                              ...prev,
                              [lectie.id]: { ...prev[lectie.id], continut: e.target.value }
                            }))}
                            rows={4}
                            placeholder="Conținut lecție (opțional)..."
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => salveazaLectie(lectie.id)}
                              disabled={saving === lectie.id}
                              className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
                            >
                              <Save size={13} /> {saving === lectie.id ? 'Salvează...' : 'Salvează'}
                            </button>
                            <button
                              onClick={() => setEditLectie(prev => { const n = { ...prev }; delete n[lectie.id]; return n })}
                              className="text-xs text-slate-500 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              Anulează
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="font-medium text-slate-800 text-sm">
                              <span className="text-slate-400 mr-1.5">L{lectie.ordine}.</span>
                              {lectie.titlu}
                            </p>
                            {lectie.continut && (
                              <p className="text-slate-400 text-xs mt-1 line-clamp-2">{lectie.continut}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => setEditLectie(prev => ({
                                ...prev,
                                [lectie.id]: { titlu: lectie.titlu, continut: lectie.continut ?? '' }
                              }))}
                              className="text-xs text-slate-400 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              Editează
                            </button>
                            <button
                              onClick={() => stergeeLectie(lectie.id)}
                              className="text-xs text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                <div className="flex gap-2 pt-2">
                  <input
                    value={newLectie[modul.id] ?? ''}
                    onChange={e => setNewLectie(prev => ({ ...prev, [modul.id]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && adaugaLectie(modul.id)}
                    placeholder="Titlu lectie nouă..."
                    className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => adaugaLectie(modul.id)}
                    className="flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2.5 rounded-xl transition-colors"
                    style={{ backgroundColor: curs.culoare }}
                  >
                    <Plus size={16} /> Adaugă
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
