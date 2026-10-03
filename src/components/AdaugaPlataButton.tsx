'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import {
  inregistreazaPlataAction,
  inregistreazaAutodidactAction,
  pretAutodidactAction,
} from '@/app/actions/abonamente'
import { cursuri, module as moduleCurriculum } from '@/lib/mockData'
import { ZILE_ACCES } from '@/lib/autodidact'

interface Props {
  cursantId: string
  abonamentId?: string
  numarCursant: string
  onSaved?: () => void
}

export default function AdaugaPlataButton({ cursantId, numarCursant, onSaved }: Props) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mod, setMod] = useState<'sedinte' | 'autodidact'>('sedinte')
  const [modulId, setModulId] = useState('')
  const [pretMotiv, setPretMotiv] = useState<string | null>(null)
  const [form, setForm] = useState({
    suma: '',
    data_plata: new Date().toISOString().split('T')[0],
    metoda: 'cash' as 'cash' | 'transfer' | 'card',
    tip_abonament: 'lunar' as 'lunar' | 'pachet',
    sedinte_incluse: '4',
    nota: '',
  })

  /** Propune prețul autodidact (200 / 150 / 100) în funcție de istoricul cursantului. */
  const propunePret = async (dataPlata: string) => {
    const r = await pretAutodidactAction(cursantId, dataPlata)
    if (r.ok) {
      setForm(f => ({ ...f, suma: String(r.pret) }))
      setPretMotiv(r.motiv)
    }
  }

  const alegeMod = (m: 'sedinte' | 'autodidact') => {
    setMod(m)
    setError(null)
    if (m === 'autodidact') void propunePret(form.data_plata)
    else {
      setPretMotiv(null)
      setForm(f => ({ ...f, suma: '' }))
    }
  }

  const handleSave = async () => {
    if (mod === 'autodidact') {
      if (!modulId) {
        setError('Alege modulul pentru abonamentul autodidact')
        return
      }
      if (!form.suma || isNaN(Number(form.suma)) || Number(form.suma) <= 0) {
        setError('Introduceți o sumă validă')
        return
      }
      setSaving(true)
      setError(null)
      const r = await inregistreazaAutodidactAction({
        cursant_id: cursantId,
        modul_id: modulId,
        suma: Number(form.suma),
        data_plata: form.data_plata,
        metoda: form.metoda,
        nota: form.nota,
      })
      setSaving(false)
      if (!r.ok) {
        setError(r.error)
        return
      }
      setOpen(false)
      setModulId('')
      setForm({ ...form, suma: '', nota: '' })
      onSaved?.()
      return
    }
    if (!form.suma || isNaN(Number(form.suma)) || Number(form.suma) <= 0) {
      setError('Introduceți o sumă validă')
      return
    }
    const sedinteIncluse = Number(form.sedinte_incluse)
    if (!sedinteIncluse || sedinteIncluse <= 0) {
      setError('Introduceți un număr de ședințe valid')
      return
    }
    setSaving(true)
    setError(null)
    const result = await inregistreazaPlataAction({
      cursant_id: cursantId,
      suma: Number(form.suma),
      data_plata: form.data_plata,
      metoda: form.metoda,
      nota: form.nota,
      tip_abonament: form.tip_abonament,
      sedinte_incluse: sedinteIncluse,
    })
    setSaving(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setOpen(false)
    setForm({ ...form, suma: '', nota: '' })
    onSaved?.()
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

            <div className="flex gap-2 mb-4">
              {([
                ['sedinte', 'Ședințe'],
                ['autodidact', 'Autodidact'],
              ] as const).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => alegeMod(k)}
                  className={`flex-1 py-2 rounded-xl border-2 font-semibold text-sm transition-all ${mod === k ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {mod === 'sedinte' ? (
              <p className="text-sm text-slate-400 mb-4">
                Pentru {numarCursant}. Ședințele se <strong className="text-slate-600">adăugă</strong> la
                soldul existent (ex. 2 rămase + 4 plătite = 6).
              </p>
            ) : (
              <p className="text-sm text-slate-400 mb-4">
                Pentru {numarCursant}. Se deschid <strong className="text-slate-600">toate lecțiile</strong>{' '}
                modulului pentru {ZILE_ACCES} de zile. Nu se scad ședințe.
              </p>
            )}

            {error && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4">
                {error}
              </p>
            )}

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

              {mod === 'sedinte' && (
              <>
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
                    {['9', '14', '19'].map(n => (
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
                      value={!['9', '14', '19'].includes(form.sedinte_incluse) ? form.sedinte_incluse : ''}
                      onChange={e => setForm({ ...form, sedinte_incluse: e.target.value })}
                      placeholder="alt nr"
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>
              )}
              </>
              )}

              {mod === 'autodidact' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Modul *</label>
                  <select
                    value={modulId}
                    onChange={e => setModulId(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="">Alege modulul…</option>
                    {cursuri
                      .filter(c => moduleCurriculum.some(m => m.curs_id === c.id))
                      .map(c => (
                        <optgroup key={c.id} label={c.nume}>
                          {moduleCurriculum
                            .filter(m => m.curs_id === c.id)
                            .sort((a, b) => a.ordine - b.ordine)
                            .map(m => (
                              <option key={m.id} value={m.id}>
                                {m.nume}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                  </select>
                  {pretMotiv && <p className="text-xs text-emerald-700 mt-1.5">{pretMotiv}</p>}
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
                  onChange={e => {
                    setForm({ ...form, data_plata: e.target.value })
                    if (mod === 'autodidact' && e.target.value) void propunePret(e.target.value)
                  }}
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
                onClick={() => void handleSave()}
                disabled={saving}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60"
              >
                {saving ? 'Salvez…' : 'Salvează plata'}
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
