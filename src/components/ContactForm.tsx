'use client'

import { useState, FormEvent } from 'react'
import { cursuri } from '@/lib/mockData'

const MOTIVE = [
  { value: 'inscriere', label: 'Înscriere / loc în grupă' },
  { value: 'intrebare-curs', label: 'Întrebare despre un curs' },
  { value: 'orar', label: 'Orar / program' },
  { value: 'parteneriat', label: 'Parteneriat' },
  { value: 'altceva', label: 'Altceva' },
] as const

const VARSTE = [
  { value: '', label: '— alege —' },
  { value: '8-10', label: '8–10 ani' },
  { value: '10-12', label: '10–12 ani' },
  { value: '12+', label: '12+ ani' },
  { value: 'alt', label: 'Altă vârstă / mai mulți copii' },
] as const

/** Acceptă 07xx…, +407…, 00407…, cu spații / liniuțe; gol = ok (câmp opțional). */
function isValidRoPhone(raw: string): boolean {
  const trimmed = raw.trim()
  if (!trimmed) return true
  let d = trimmed.replace(/[\s.\-/()]/g, '')
  if (d.startsWith('0040')) d = `+40${d.slice(4)}`
  else if (d.startsWith('40') && !d.startsWith('+') && d.length === 11) d = `+${d}`
  if (/^\+40\d{9}$/.test(d)) return true
  if (/^0\d{9}$/.test(d)) return true
  return false
}

const fieldClass =
  'w-full rounded-xl border border-[var(--ckp-ink)]/12 bg-[var(--ckp-foam)] px-4 py-3.5 text-[var(--ckp-ink)] placeholder:text-[var(--ckp-muted)]/50 outline-none transition-[border-color,box-shadow] focus:border-[var(--ckp-blue)] focus:shadow-[0_0_0_3px_rgba(8,64,200,0.12)]'

const fieldErrorClass =
  'w-full rounded-xl border border-[var(--ckp-red)]/50 bg-[var(--ckp-foam)] px-4 py-3.5 text-[var(--ckp-ink)] outline-none focus:border-[var(--ckp-red)] focus:shadow-[0_0_0_3px_rgba(248,48,48,0.12)]'

export default function ContactForm() {
  const [nume, setNume] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [motiv, setMotiv] = useState<string>(MOTIVE[0].value)
  const [varsta, setVarsta] = useState('')
  const [atelier, setAtelier] = useState('')
  const [mesaj, setMesaj] = useState('')
  const [telefonError, setTelefonError] = useState<string | null>(null)
  const [trimis, setTrimis] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValidRoPhone(telefon)) {
      setTelefonError('Folosește un număr din România: 07xx xxx xxx sau +40 7xx… (spațiile sunt ok).')
      return
    }
    setTelefonError(null)

    const motivLabel = MOTIVE.find(m => m.value === motiv)?.label ?? motiv
    const varstaLabel = VARSTE.find(v => v.value === varsta)?.label
    const atelierLabel = cursuri.find(c => c.id === atelier)?.nume

    const subject = encodeURIComponent(`[${motivLabel}] ${nume.trim() || 'Contact'} — site CKP`)
    const body = encodeURIComponent(
      [
        'Salut, Code Kids Play!',
        '',
        'Am un mesaj de pe formularul de pe site:',
        '',
        `• Motiv: ${motivLabel}`,
        `• Nume: ${nume.trim()}`,
        `• Email: ${email.trim()}`,
        telefon.trim() ? `• Telefon: ${telefon.trim()}` : null,
        varsta ? `• Vârsta copilului: ${varstaLabel ?? varsta}` : null,
        atelierLabel ? `• Atelier de interes: ${atelierLabel}` : null,
        '',
        '———',
        '',
        mesaj.trim(),
        '',
        '———',
        'Trimis din codekidsplay.vercel.app/contact',
      ]
        .filter(line => line !== null)
        .join('\n'),
    )
    window.location.href = `mailto:codekidsplay@gmail.com?subject=${subject}&body=${body}`
    setTrimis(true)
  }

  if (trimis) {
    return (
      <div
        className="ckp-fade-up rounded-2xl border border-[var(--ckp-blue)]/20 bg-[var(--ckp-blue)]/[0.06] px-5 py-6 sm:px-6 sm:py-7"
        role="status"
      >
        <p
          className="text-xl font-semibold text-[var(--ckp-ink)] mb-2 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Mulțumim — mesajul e pregătit.
        </p>
        <p className="text-[var(--ckp-ink-soft)] leading-relaxed mb-4">
          Ar trebui să ți se fi deschis aplicația de email, cu totul completat. Apasă <strong>Trimite</strong> acolo ca
          să ne ajungă. Revenim de obicei în aceeași zi lucrătoare.
        </p>
        <p className="text-sm text-[var(--ckp-muted)] leading-relaxed mb-5">
          Dacă email-ul nu s-a deschis (sau nu ai un client de mail pe acest aparat), scrie-ne direct:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:codekidsplay@gmail.com"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--ckp-blue)] hover:bg-[var(--ckp-blue-deep)] text-white font-semibold px-5 py-2.5 text-sm transition-colors"
          >
            Email
          </a>
          <a
            href="https://wa.me/40736830830"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--ckp-ink)]/15 bg-white hover:border-[var(--ckp-blue)]/40 text-[var(--ckp-ink)] font-semibold px-5 py-2.5 text-sm transition-colors"
          >
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setTrimis(false)}
            className="inline-flex items-center justify-center rounded-xl text-[var(--ckp-blue)] font-medium px-3 py-2.5 text-sm hover:underline"
          >
            Modifică formularul
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="motiv" className="block text-sm font-medium text-[var(--ckp-ink-soft)] mb-1.5">
          Motivul contactării
        </label>
        <select
          id="motiv"
          name="motiv"
          required
          value={motiv}
          onChange={e => setMotiv(e.target.value)}
          className={fieldClass}
        >
          {MOTIVE.map(m => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nume" className="block text-sm font-medium text-[var(--ckp-ink-soft)] mb-1.5">
            Nume
          </label>
          <input
            id="nume"
            name="nume"
            required
            autoComplete="name"
            placeholder="Prenume și nume"
            value={nume}
            onChange={e => setNume(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--ckp-ink-soft)] mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ex. parinte@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="telefon" className="block text-sm font-medium text-[var(--ckp-ink-soft)] mb-1.5">
          Telefon <span className="text-[var(--ckp-muted)] font-normal">(opțional)</span>
        </label>
        <input
          id="telefon"
          name="telefon"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="07xx xxx xxx sau +40 7xx…"
          value={telefon}
          onChange={e => {
            setTelefon(e.target.value)
            if (telefonError) setTelefonError(null)
          }}
          aria-invalid={telefonError ? true : undefined}
          aria-describedby={telefonError ? 'telefon-error' : undefined}
          className={telefonError ? fieldErrorClass : fieldClass}
        />
        {telefonError ? (
          <p id="telefon-error" className="mt-1.5 text-sm text-[var(--ckp-red)]" role="alert">
            {telefonError}
          </p>
        ) : (
          <p className="mt-1.5 text-xs text-[var(--ckp-muted)]">Acceptă spații, +40 sau 07…</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="varsta" className="block text-sm font-medium text-[var(--ckp-ink-soft)] mb-1.5">
            Vârsta copilului <span className="text-[var(--ckp-muted)] font-normal">(opțional)</span>
          </label>
          <select
            id="varsta"
            name="varsta"
            value={varsta}
            onChange={e => setVarsta(e.target.value)}
            className={fieldClass}
          >
            {VARSTE.map(v => (
              <option key={v.value || 'empty'} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="atelier" className="block text-sm font-medium text-[var(--ckp-ink-soft)] mb-1.5">
            Atelier de interes <span className="text-[var(--ckp-muted)] font-normal">(opțional)</span>
          </label>
          <select
            id="atelier"
            name="atelier"
            value={atelier}
            onChange={e => setAtelier(e.target.value)}
            className={fieldClass}
          >
            <option value="">— alege —</option>
            {cursuri.map(c => (
              <option key={c.id} value={c.id}>
                {c.nume}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="mesaj" className="block text-sm font-medium text-[var(--ckp-ink-soft)] mb-1.5">
          Mesaj
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          required
          rows={5}
          placeholder="Detalii: orar preferat, întrebări…"
          value={mesaj}
          onChange={e => setMesaj(e.target.value)}
          className={`${fieldClass} resize-y min-h-[140px]`}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-[var(--ckp-red)] hover:bg-[var(--ckp-red-deep)] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
        >
          Trimite mesajul
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <p className="text-sm text-[var(--ckp-muted)] leading-snug max-w-xs">
          Se deschide email-ul tău cu mesajul gata — apoi apeși Trimite acolo.
        </p>
      </div>
    </form>
  )
}
