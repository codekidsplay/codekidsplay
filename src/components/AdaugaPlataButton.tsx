'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface Props {
  cursantId: string
  abonamentId?: string
  numarCursant: string
}

export default function AdaugaPlataButton({ numarCursant }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    suma: '',
    data_plata: new Date().toISOString().split('T')[0],
    metoda: 'cash' as 'cash' | 'transfer' | 'card',
    tip_abonament: 'lunar' as 'lunar' | 'pachet',
    sedinte_incluse: '4',
    nota: '',
  })

  const handleSave = () => {
    if (!form.suma || isNaN(Number(form.suma))) {
      alert('Introduceți o sumă validă')
      return
    }
    alert(`Plată înregistrată!\n\nCursant: ${numarCursant}\nSumă: ${form.suma} lei\nMetodă: ${form.metoda}\nTip: ${form.tip_abonament}\nȘedințe incluse: ${form.sedinte_incluse}\n\n(Se va salva în baza de date după conectarea Supabase)`)
    setOpen(false)
    setForm({ ...form, suma: '', nota: '' })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
      >
        <Plus size={13} /> Înregistrează plată
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900 text-lg">Înregistrează plată</h3>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Sumă (lei) *</label>
                <input
                  type="number"
                  value={form.suma}
                  onChange={e => setForm({ ...form, suma: e.target.value })}
                  placeholder="ex: 200"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tip abonament</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, tip_abonament: 'lunar', sedinte_incluse: '4' })}
                    className={`flex-1 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${form.tip_abonament === 'lunar' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500'}`}
                  >
                    Lunar (4 șed.)
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, tip_abonament: 'pachet' })}
                    className={`flex-1 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${form.tip_abonament === 'pachet' ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-500'}`}
                  >
                    Pachet
                  </button>
                </div>
              </div>

              {form.tip_abonament === 'pachet' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Număr ședințe incluse</label>
                  <div className="flex gap-2">
                    {['8', '10', '12'].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm({ ...form, sedinte_incluse: n })}
                        className={`flex-1 py-2 rounded-xl border-2 font-semibold text-sm transition-all ${form.sedinte_incluse === n ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-500'}`}
                      >
                        {n}
                      </button>
                    ))}
                    <input
                      type="number"
                      value={!['8','10','12'].includes(form.sedinte_incluse) ? form.sedinte_incluse : ''}
                      onChange={e => setForm({ ...form, sedinte_incluse: e.target.value })}
                      placeholder="alt nr"
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Metodă de plată</label>
                <div className="flex gap-2">
                  {(['cash', 'transfer', 'card'] as const).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setForm({ ...form, metoda: m })}
                      className={`flex-1 py-2 rounded-xl border-2 font-medium text-xs capitalize transition-all ${form.metoda === m ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Data plății</label>
                <input
                  type="date"
                  value={form.data_plata}
                  onChange={e => setForm({ ...form, data_plata: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Notă (opțional)</label>
                <input
                  value={form.nota}
                  onChange={e => setForm({ ...form, nota: e.target.value })}
                  placeholder="ex: Reînnoire august"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
              >
                Salvează plata
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
