'use client'

import { useEffect, useState } from 'react'
import {
  resetPinElev,
  resetParolaParinte,
  mesajWhatsAppLogin,
  asiguraConturiCursant,
} from '@/lib/auth'
import { Copy, KeyRound, RefreshCw, MessageCircle } from 'lucide-react'

interface Props {
  cursant: {
    id: string
    nume: string
    prenume: string
    email_parinte: string
    telefon_parinte: string | null
  }
}

export default function ConturiAccesPanel({ cursant }: Props) {
  const [ready, setReady] = useState(false)
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [parolaParinte, setParolaParinte] = useState('')
  const [copied, setCopied] = useState(false)

  const refresh = () => {
    const data = asiguraConturiCursant({
      cursant_id: cursant.id,
      prenume: cursant.prenume,
      nume: cursant.nume,
      email_parinte: cursant.email_parinte,
    })
    setUsername(data.username)
    setPin(data.pin)
    setParolaParinte(data.parola_parinte)
  }

  useEffect(() => {
    refresh()
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursant.id])

  if (!ready) return null

  const mesaj = mesajWhatsAppLogin({
    prenume: cursant.prenume,
    username,
    pin,
    email_parinte: cursant.email_parinte,
    parola_parinte: parolaParinte,
  })

  const copy = async () => {
    await navigator.clipboard.writeText(mesaj)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const waUrl = cursant.telefon_parinte
    ? `https://wa.me/4${cursant.telefon_parinte.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(mesaj)}`
    : null

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <KeyRound size={18} className="text-slate-500" />
        <h2 className="font-semibold text-slate-800">Conturi acces</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
        <div className="rounded-xl bg-slate-50 p-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Elev</p>
          <p>
            <span className="text-slate-500">Username:</span>{' '}
            <span className="font-mono font-medium text-slate-900">{username}</span>
          </p>
          <p>
            <span className="text-slate-500">PIN:</span>{' '}
            <span className="font-mono font-medium text-slate-900">{pin}</span>
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Părinte</p>
          <p>
            <span className="text-slate-500">Email:</span>{' '}
            <span className="font-medium text-slate-900">{cursant.email_parinte}</span>
          </p>
          <p>
            <span className="text-slate-500">Parolă:</span>{' '}
            <span className="font-mono font-medium text-slate-900">{parolaParinte}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 text-sm font-medium bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-slate-700"
        >
          <Copy size={14} /> {copied ? 'Copiat!' : 'Copiază date login'}
        </button>
        {waUrl && (
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-500"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        )}
        <button
          type="button"
          onClick={() => {
            const nou = resetPinElev(cursant.id)
            if (nou) setPin(nou)
          }}
          className="inline-flex items-center gap-2 text-sm font-medium border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50"
        >
          <RefreshCw size={14} /> Reset PIN elev
        </button>
        <button
          type="button"
          onClick={() => {
            const nou = resetParolaParinte(cursant.email_parinte)
            if (nou) setParolaParinte(nou)
          }}
          className="inline-flex items-center gap-2 text-sm font-medium border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50"
        >
          <RefreshCw size={14} /> Reset parolă părinte
        </button>
      </div>
    </div>
  )
}
