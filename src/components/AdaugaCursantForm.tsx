'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { cursuri } from '@/lib/mockData'
import { adaugaCursant } from '@/lib/mockStore'
import { asiguraConturiCursant, genereazaUsername, usernameElevDisponibil } from '@/lib/auth'
import { adaugaCursantAction } from '@/app/actions/cursanti'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'

export default function AdaugaCursantForm() {
  const router = useRouter()
  const [prenume, setPrenume] = useState('')
  const [nume, setNume] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [parolaParinte, setParolaParinte] = useState('')
  const [cursId, setCursId] = useState('c7')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const sugestieUsername = () => {
    if (username.trim() || !prenume.trim() || !nume.trim()) return
    setUsername(genereazaUsername(prenume, nume))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!prenume.trim() || !nume.trim()) {
      setError('Completează prenumele și numele copilului.')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Email-ul părintelui e obligatoriu (pentru login).')
      return
    }
    if (!username.trim()) {
      setError('Username-ul copilului e obligatoriu.')
      return
    }
    if (!/^\d{4}$/.test(pin.trim())) {
      setError('PIN-ul copilului trebuie să aibă exact 4 cifre.')
      return
    }
    if (parolaParinte.trim().length < 6) {
      setError('Parola părintelui trebuie să aibă cel puțin 6 caractere.')
      return
    }

    setSaving(true)
    try {
      if (isSupabaseConfiguredClient()) {
        const r = await adaugaCursantAction({
          prenume,
          nume,
          email_parinte: email,
          telefon_parinte: telefon || null,
          username: username.trim(),
          pin: pin.trim(),
          parola_parinte: parolaParinte.trim(),
          curs_id: cursId || null,
        })
        if (!r.ok) {
          setError(r.error)
          setSaving(false)
          return
        }
        router.push(`/cursanti/${r.cursant_id}`)
        return
      }

      if (!usernameElevDisponibil(username.trim())) {
        setError(`Username-ul „${username.trim()}” e deja folosit.`)
        setSaving(false)
        return
      }

      const cursant = adaugaCursant({
        prenume,
        nume,
        email_parinte: email,
        telefon_parinte: telefon || null,
        curs_id: cursId || null,
      })

      const conturi = asiguraConturiCursant({
        cursant_id: cursant.id,
        prenume: cursant.prenume,
        nume: cursant.nume,
        email_parinte: cursant.email_parinte,
        username: username.trim(),
        pin: pin.trim(),
        parola_parinte: parolaParinte.trim(),
      })

      if (conturi.error) {
        setError(conturi.error)
        setSaving(false)
        return
      }

      router.push(`/cursanti/${cursant.id}`)
    } catch {
      setError('Nu am putut salva cursantul. Încearcă din nou.')
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cursanti" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Adaugă cursant</h1>
          <p className="text-slate-500 text-sm mt-1">
            {isSupabaseConfiguredClient()
              ? 'Salvează în Supabase + creează conturi Auth'
              : 'Mod local (mock) — configurează service role pentru Supabase'}
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 max-w-xl space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700 mb-1.5 block">Prenume copil *</span>
            <input
              value={prenume}
              onChange={e => setPrenume(e.target.value)}
              onBlur={sugestieUsername}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500"
              autoComplete="off"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 mb-1.5 block">Nume copil *</span>
            <input
              value={nume}
              onChange={e => setNume(e.target.value)}
              onBlur={sugestieUsername}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500"
              autoComplete="off"
              required
            />
          </label>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Cont elev
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700 mb-1.5 block">Username *</span>
              <input
                value={username}
                onChange={e => setUsername(e.target.value.replace(/\s/g, '').toLowerCase())}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono text-slate-900 outline-none focus:border-blue-500"
                placeholder="ex. andrei.p"
                autoComplete="off"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700 mb-1.5 block">PIN (4 cifre) *</span>
              <input
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono text-slate-900 outline-none focus:border-blue-500 tracking-widest"
                placeholder="1234"
                inputMode="numeric"
                maxLength={4}
                autoComplete="off"
                required
              />
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Cont părinte
          </p>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 mb-1.5 block">Email *</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500"
              placeholder="parinte@email.com"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 mb-1.5 block">Parolă *</span>
            <input
              type="text"
              value={parolaParinte}
              onChange={e => setParolaParinte(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono text-slate-900 outline-none focus:border-blue-500"
              placeholder="minim 6 caractere"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 mb-1.5 block">Telefon</span>
            <input
              type="tel"
              value={telefon}
              onChange={e => setTelefon(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500"
              placeholder="07xx xxx xxx"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1.5 block">Curs inițial</span>
          <select
            value={cursId}
            onChange={e => setCursId(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500 bg-white"
          >
            <option value="">— Fără înscriere încă —</option>
            {cursuri.map(c => (
              <option key={c.id} value={c.id}>
                {c.nume}
              </option>
            ))}
          </select>
        </label>

        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            <Save size={18} />
            {saving ? 'Salvez…' : 'Salvează'}
          </button>
          <Link
            href="/cursanti"
            className="inline-flex items-center px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Anulează
          </Link>
        </div>
      </form>
    </div>
  )
}
