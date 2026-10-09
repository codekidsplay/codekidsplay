'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

export default function ContactForm() {
  const [nume, setNume] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [mesaj, setMesaj] = useState('')
  const [trimis, setTrimis] = useState(false)
  const [acord, setAcord] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!acord) return
    const subject = encodeURIComponent(`Mesaj de pe site — ${nume.trim() || 'Contact'}`)
    const body = encodeURIComponent(
      [
        'Salut, Code Maker Club!',
        '',
        'Am un mesaj pentru tine:',
        '',
        `• Nume: ${nume.trim()}`,
        `• Email: ${email.trim()}`,
        telefon.trim() ? `• Telefon: ${telefon.trim()}` : null,
        '',
        mesaj.trim(),
        '',
        'Trimis din codemakerclub/contact',
      ]
        .filter(line => line !== null)
        .join('\n'),
    )
    window.location.href = `mailto:codemakerclub@gmail.com?subject=${subject}&body=${body}`
    setTrimis(true)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="nume" className="block text-sm font-medium text-[var(--ckp-ink)] mb-1.5">
          Nume
        </label>
        <input
          id="nume"
          name="nume"
          required
          value={nume}
          onChange={e => setNume(e.target.value)}
          className="w-full rounded-xl border border-[var(--ckp-ink)]/15 bg-white px-4 py-3 text-[var(--ckp-ink)] outline-none focus:border-[var(--ckp-blue)]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--ckp-ink)] mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-xl border border-[var(--ckp-ink)]/15 bg-white px-4 py-3 text-[var(--ckp-ink)] outline-none focus:border-[var(--ckp-blue)]"
        />
      </div>
      <div>
        <label htmlFor="telefon" className="block text-sm font-medium text-[var(--ckp-ink)] mb-1.5">
          Telefon
        </label>
        <input
          id="telefon"
          name="telefon"
          type="tel"
          value={telefon}
          onChange={e => setTelefon(e.target.value)}
          className="w-full rounded-xl border border-[var(--ckp-ink)]/15 bg-white px-4 py-3 text-[var(--ckp-ink)] outline-none focus:border-[var(--ckp-blue)]"
        />
      </div>
      <div>
        <label htmlFor="mesaj" className="block text-sm font-medium text-[var(--ckp-ink)] mb-1.5">
          Mesaj
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          required
          rows={7}
          placeholder="Nume copil, vârstă, curs de interes…"
          value={mesaj}
          onChange={e => setMesaj(e.target.value)}
          className="w-full rounded-xl border border-[var(--ckp-ink)]/15 bg-white px-4 py-3 text-[var(--ckp-ink)] outline-none focus:border-[var(--ckp-blue)] resize-y min-h-[160px]"
        />
      </div>
      <label className="flex items-start gap-2.5 text-sm text-[var(--ckp-ink)] cursor-pointer">
        <input
          type="checkbox"
          required
          checked={acord}
          onChange={e => setAcord(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--ckp-red)]"
        />
        <span>
          Am citit și sunt de acord cu{' '}
          <Link href="/termeni" target="_blank" className="text-[var(--ckp-blue)] hover:underline">
            Termenii și condițiile
          </Link>{' '}
          și{' '}
          <Link href="/confidentialitate" target="_blank" className="text-[var(--ckp-blue)] hover:underline">
            Politica de confidențialitate
          </Link>
          .
        </span>
      </label>
      <button
        type="submit"
        disabled={!acord}
        className="inline-flex items-center justify-center bg-[var(--ckp-red)] hover:bg-[var(--ckp-red-deep)] text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Trimite mesajul
      </button>
      {trimis ? (
        <p className="text-sm text-[var(--ckp-muted)]">
          Se deschide aplicația ta de email. Dacă nu pornește, scrie-ne la{' '}
          <a href="mailto:codemakerclub@gmail.com" className="text-[var(--ckp-blue)] hover:underline">
            codemakerclub@gmail.com
          </a>
          .
        </p>
      ) : null}
    </form>
  )
}
