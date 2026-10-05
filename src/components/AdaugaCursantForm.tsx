'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, MessageCircle, Save } from 'lucide-react'
import { cursuri } from '@/lib/mockData'
import { adaugaCursant } from '@/lib/mockStore'
import {
  adaugaCursantLaProfesorSesiune,
  asiguraConturiCursant,
  genereazaUsername,
  getCreds,
  getSession,
  usernameElevDisponibil,
} from '@/lib/auth'
import { genereazaParola, mesajWhatsAppLogin } from '@/lib/authHelpers'
import { adaugaCursantAction } from '@/app/actions/cursanti'
import { listStaffAction, type StaffMember } from '@/app/actions/profesori'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'

export default function AdaugaCursantForm() {
  const router = useRouter()
  const [prenume, setPrenume] = useState('')
  const [nume, setNume] = useState('')
  const [dataNastere, setDataNastere] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [parolaParinte, setParolaParinte] = useState('')
  const [cursId, setCursId] = useState('c7')
  const [profesorId, setProfesorId] = useState('')
  const [profesori, setProfesori] = useState<StaffMember[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [termeniAcceptati, setTermeniAcceptati] = useState(false)
  const [poatePleca, setPoatePleca] = useState(false)
  const trimiteWa = useRef(false)
  const [salvat, setSalvat] = useState<{ id: string; waUrl: string | null } | null>(null)

  /** După salvare: ecran cu butonul WhatsApp (link real, nu poate fi blocat ca pop-up). */
  const arataWhatsApp = (id: string) => {
    const mesaj = mesajWhatsAppLogin({
      prenume: prenume.trim(),
      username: username.trim(),
      pin: pin.trim(),
      email_parinte: email.trim(),
      parola_parinte: parolaParinte.trim(),
    })
    const cifre = telefon.replace(/\D/g, '')
    const nr = cifre.startsWith('40') ? cifre : cifre.startsWith('0') ? `4${cifre}` : cifre ? `40${cifre}` : ''
    // fără număr: WhatsApp deschide alegerea contactului
    const waUrl = `https://wa.me/${nr}?text=${encodeURIComponent(mesaj)}`
    setSalvat({ id, waUrl })
    setSaving(false)
  }

  useEffect(() => {
    const s = getSession()
    setIsAdmin(s?.rol === 'admin')
    if (s?.rol !== 'admin') return

    const load = async () => {
      if (isSupabaseConfiguredClient()) {
        const r = await listStaffAction()
        if (r.ok) setProfesori(r.data.filter(p => p.rol === 'profesor'))
      } else {
        setProfesori(
          getCreds()
            .email.filter(e => e.tip === 'profesor')
            .map(e => ({
              id: e.email,
              email: e.email,
              nume: e.nume,
              rol: 'profesor' as const,
            })),
        )
      }
    }
    void load()
  }, [])

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
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNastere)) {
      setError('Data nașterii e obligatorie.')
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

    if (!termeniAcceptati) {
      setError('Confirmă că părintele a citit și acceptă Termenii și Condițiile.')
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
          data_nastere: dataNastere,
          username: username.trim(),
          pin: pin.trim(),
          parola_parinte: parolaParinte.trim(),
          curs_id: cursId || null,
          profesor_id: profesorId || null,
          termeni_acceptati: termeniAcceptati,
          poate_pleca_singur: poatePleca,
        })
        if (!r.ok) {
          setError(r.error)
          setSaving(false)
          return
        }
        // Actualizează sesiunea profesorului cu noul cursant
        const session = getSession()
        if (session?.rol === 'profesor') {
          const ids = Array.from(new Set([...(session.cursant_ids ?? []), r.cursant_id]))
          localStorage.setItem(
            'ckp-session-v1',
            JSON.stringify({ ...session, cursant_ids: ids }),
          )
        } else if (profesorId) {
          // admin a asignat — ok în DB
        }
        if (trimiteWa.current) {
          arataWhatsApp(r.cursant_id)
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
        data_nastere: dataNastere,
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

      const session = getSession()
      if (session?.rol === 'profesor') {
        adaugaCursantLaProfesorSesiune(cursant.id)
      } else if (profesorId) {
        adaugaCursantLaProfesorSesiune(cursant.id, profesorId)
      }

      if (trimiteWa.current) {
        arataWhatsApp(cursant.id)
        return
      }
      router.push(`/cursanti/${cursant.id}`)
    } catch {
      setError('Nu am putut salva cursantul. Încearcă din nou.')
      setSaving(false)
    }
  }

  if (salvat) {
    return (
      <div className="max-w-xl bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
        <CheckCircle2 size={44} className="text-emerald-500 mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          {prenume} {nume} a fost salvat
        </h1>
        <p className="text-slate-500 text-sm mb-6">
          Trimite părintelui datele de logare pe WhatsApp.
          {!telefon.trim() && ' (Nu ai completat telefonul – alegi contactul în WhatsApp.)'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={salvat.waUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            <MessageCircle size={18} /> Trimite pe WhatsApp
          </a>
          <button
            type="button"
            onClick={() => router.push(`/cursanti/${salvat.id}`)}
            className="inline-flex items-center px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Deschide cursantul
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cursanti" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Adaugă cursant</h1>
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

        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1.5 block">Data nașterii *</span>
          <input
            type="date"
            value={dataNastere}
            onChange={e => setDataNastere(e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500"
            required
          />
        </label>

        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cont elev</p>
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
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cont părinte</p>
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
            <div className="flex gap-2">
              <input
                type="text"
                value={parolaParinte}
                onChange={e => setParolaParinte(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono text-slate-900 outline-none focus:border-blue-500"
                placeholder="minim 6 caractere"
                autoComplete="new-password"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setParolaParinte(genereazaParola(8))}
                className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-white bg-white shrink-0"
              >
                Generează
              </button>
            </div>
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

        {isAdmin && profesori.length > 0 ? (
          <label className="block">
            <span className="text-sm font-medium text-slate-700 mb-1.5 block">Profesor</span>
            <select
              value={profesorId}
              onChange={e => setProfesorId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500 bg-white"
            >
              <option value="">— Neasignat —</option>
              {profesori.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nume}
                  {p.email ? ` (${p.email})` : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1">
              Profesorul va vedea doar cursanții asignați lui.
            </p>
          </label>
        ) : null}

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={poatePleca}
            onChange={e => setPoatePleca(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 accent-blue-600"
          />
          <span className="text-sm text-slate-700">
            <span className="font-medium">Poate pleca singur după curs</span>
            <span className="block text-xs text-slate-400">
              Dacă nu e bifat, copilul este predat doar unui adult.
            </span>
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 cursor-pointer">
          <input
            type="checkbox"
            checked={termeniAcceptati}
            onChange={e => setTermeniAcceptati(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 accent-blue-600"
            required
          />
          <span className="text-sm text-slate-700">
            Părintele a citit și acceptă{' '}
            <Link
              href="/termeni"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline underline-offset-2"
            >
              Termenii și Condițiile
            </Link>
            , inclusiv recomandarea privind vârsta modulelor și interdicția de copiere și distribuire a lecțiilor. *
          </span>
        </label>

        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            onClick={() => { trimiteWa.current = false }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            <Save size={18} />
            {saving ? 'Salvez…' : 'Salvează'}
          </button>
          <button
            type="submit"
            disabled={saving}
            onClick={() => { trimiteWa.current = true }}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            <MessageCircle size={18} />
            Salvează + WhatsApp
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
