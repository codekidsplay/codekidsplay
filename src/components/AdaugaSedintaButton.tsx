'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface Props {
  cursantId: string
  abonamentId: string
}

export default function AdaugaSedintaButton({ cursantId, abonamentId }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    data: new Date().toISOString().split('T')[0],
    prezent: true,
    nota: '',
  })

  const handleSave = () => {
    // Cu Supabase: insert în tabelul sedinte
    alert(`Ședință înregistrată!\nData: ${form.data}\nPrezent: ${form.prezent ? 'Da' : 'Nu'}\n\n(Se va salva în baza de date după conectarea Supabase)`)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <Plus size={13} /> Adaugă ședință
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900 text-lg">Adaugă ședință</h3>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Data ședinței</label>
                <input
                  type="date"
                  value={form.data}
                  onChange={e => setForm({ ...form, data: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Prezență</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, prezent: true })}
                    className={`flex-1 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${form.prezent ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500'}`}
                  >
                    ✓ Prezent
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, prezent: false })}
                    className={`flex-1 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${!form.prezent ? 'border-red-400 bg-red-50 text-red-600' : 'border-slate-200 text-slate-500'}`}
                  >
                    ✗ Absent
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Notă (opțional)</label>
                <input
                  value={form.nota}
                  onChange={e => setForm({ ...form, nota: e.target.value })}
                  placeholder="ex: A anunțat absența"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Salvează
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
              >
                Anulează
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
