'use client'

import { useEffect, useState } from 'react'
import { GraduationCap, Save, Shield } from 'lucide-react'
import {
  adaugaProfesorAction,
  listStaffAction,
  type StaffMember,
} from '@/app/actions/profesori'
import { getSession } from '@/lib/auth'
import { genereazaParola } from '@/lib/authHelpers'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'

export default function ProfesoriPanel() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loadingList, setLoadingList] = useState(true)
  const [nume, setNume] = useState('')
  const [email, setEmail] = useState('')
  const [parola, setParola] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [okMsg, setOkMsg] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const refresh = async () => {
    setLoadingList(true)
    const r = await listStaffAction()
    if (r.ok) setStaff(r.data)
    setLoadingList(false)
  }

  useEffect(() => {
    const s = getSession()
    setIsAdmin(s?.rol === 'admin')
    if (isSupabaseConfiguredClient()) {
      void refresh()
    } else {
      setLoadingList(false)
    }
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setOkMsg(null)
    setSaving(true)
    const r = await adaugaProfesorAction({ nume, email, parola })
    setSaving(false)
    if (!r.ok) {
      setError(r.error)
      return
    }
    setOkMsg(`Profesor creat: ${r.email}. Poate intra pe Login.`)
    setNume('')
    setEmail('')
    setParola('')
    await refresh()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Profesori</h1>
        <p className="text-slate-500 mt-1">Echipa care gestionează cursanții și lecțiile</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-bold text-slate-900 text-lg mb-4">Echipă</h2>
          {loadingList ? (
            <p className="text-sm text-slate-400">Se încarcă…</p>
          ) : staff.length === 0 ? (
            <p className="text-sm text-slate-400">Niciun membru încă (sau Supabase neconfigurat).</p>
          ) : (
            <ul className="space-y-3">
              {staff.map(m => (
                <li
                  key={m.id}
                  className="flex items-center justify-between gap-3 p-4 rounded-xl bg-slate-50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        m.rol === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-violet-100 text-violet-700'
                      }`}
                    >
                      {m.rol === 'admin' ? <Shield size={18} /> : <GraduationCap size={18} />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{m.nume}</p>
                      {m.rol !== 'admin' && m.email ? (
                        <p className="text-xs text-slate-400 truncate">{m.email}</p>
                      ) : null}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-[10px] font-medium border whitespace-nowrap ${
                      m.rol === 'admin'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-violet-50 text-violet-700 border-violet-200'
                    }`}
                  >
                    {m.rol === 'admin' ? 'Admin' : 'Profesor'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-bold text-slate-900 text-lg mb-1">Adaugă profesor</h2>
          <p className="text-sm text-slate-400 mb-5">
            Cont email + parolă · același login ca adminul
          </p>

          {!isAdmin ? (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              Doar adminul poate adăuga profesori.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700 mb-1.5 block">Nume *</span>
                <input
                  value={nume}
                  onChange={e => setNume(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
                  placeholder="ex. Maria Popescu"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700 mb-1.5 block">Email *</span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
                  placeholder="profesor@email.com"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700 mb-1.5 block">Parolă *</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={parola}
                    onChange={e => setParola(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 font-mono outline-none focus:border-blue-500"
                    placeholder="minim 8 caractere"
                    minLength={8}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setParola(genereazaParola(10))}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    Generează
                  </button>
                </div>
              </label>

              {error ? (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  {error}
                </p>
              ) : null}
              {okMsg ? (
                <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                  {okMsg}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
              >
                <Save size={18} />
                {saving ? 'Salvez…' : 'Creează cont'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
