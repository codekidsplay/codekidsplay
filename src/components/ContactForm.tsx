'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [nume, setNume] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [mesaj, setMesaj] = useState('')
  const [trimis, setTrimis] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Mesaj de pe site — ${nume.trim() || 'Contact'}`)
    const body = encodeURIComponent(
      [
        'Salut, Code Kids Play!',
        '',
        'Am un mesaj de pe formularul de pe site:',
        '',
        `• Nume: ${nume.trim()}`,
        `• Email: ${email.trim()}`,
        telefon.trim() ? `• Telefon: ${telefon.trim()}` : null,
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

  const fieldClass =
    'w-full rounded-xl border border-[var(--ckp-ink)]/12 bg-[var(--ckp-foam)] px-4 py-3.5 text-[var(--ckp-ink)] placeholder:text-[var(--ckp-muted)]/50 outline-none transition-[border-color,box-shadow] focus:border-[var(--ckp-blue)] focus:shadow-[0_0_0_3px_rgba(8,64,200,0.12)]'

  return (
    <form onSubmit={onSubmit} className="space-y-5">
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
          placeholder="07xx xxx xxx"
          value={telefon}
          onChange={e => setTelefon(e.target.value)}
          className={fieldClass}
        />
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
          placeholder="Vârstă copil, curs de interes, întrebări…"
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
          Se deschide aplicația ta de email, cu mesajul gata de trimis.
        </p>
      </div>
      {trimis ? (
        <p
          className="ckp-fade-up text-sm text-[var(--ckp-ink-soft)] rounded-xl bg-[var(--ckp-blue)]/8 border border-[var(--ckp-blue)]/15 px-4 py-3"
          role="status"
        >
          Dacă email-ul nu s-a deschis, scrie-ne direct la{' '}
          <a href="mailto:codekidsplay@gmail.com" className="text-[var(--ckp-blue)] font-medium hover:underline">
            codekidsplay@gmail.com
          </a>{' '}
          sau pe WhatsApp la{' '}
          <a
            href="https://wa.me/40736830830"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--ckp-blue)] font-medium hover:underline"
          >
            0736 830 830
          </a>
          .
        </p>
      ) : null}
    </form>
  )
}
