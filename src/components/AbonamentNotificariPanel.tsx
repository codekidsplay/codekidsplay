'use client'

import { useEffect, useState } from 'react'
import { Copy, Check, Mail, MessageCircle, RotateCcw } from 'lucide-react'
import {
  abonamentActiv,
  getStore,
  resetStore,
  sedinteRamase,
  type BifareResult,
} from '@/lib/mockStore'
import { mesajSedinteEpuizate } from '@/lib/notificari'

interface Props {
  cursantId: string
  prenume: string
  emailParinte: string
  telefonParinte: string | null
  lastBifare?: BifareResult | null
}

export default function AbonamentNotificariPanel({
  cursantId,
  prenume,
  emailParinte,
  telefonParinte,
  lastBifare,
}: Props) {
  const [ramase, setRamase] = useState<number | null>(null)
  const [incluse, setIncluse] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [emailNote, setEmailNote] = useState<string | null>(null)

  const refresh = () => {
    const store = getStore()
    const ab = abonamentActiv(cursantId, store)
    if (!ab) {
      setRamase(null)
      setIncluse(null)
      return
    }
    setIncluse(ab.sedinte_incluse)
    setRamase(sedinteRamase(ab.id, store))
  }

  useEffect(() => {
    refresh()
  }, [cursantId, lastBifare])

  useEffect(() => {
    if (lastBifare?.emailTrimis) {
      setEmailNote(`Email stub trimis către ${emailParinte} (vezi consola browser)`)
    }
  }, [lastBifare, emailParinte])

  const mesaj = mesajSedinteEpuizate(prenume)
  const alerta = ramase !== null && ramase <= 0

  const copyWhatsApp = async () => {
    await navigator.clipboard.writeText(mesaj)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openWhatsApp = () => {
    const phone = (telefonParinte ?? '').replace(/\D/g, '')
    const text = encodeURIComponent(mesaj)
    const url = phone
      ? `https://wa.me/40${phone.replace(/^0/, '')}?text=${text}`
      : `https://wa.me/?text=${text}`
    window.open(url, '_blank')
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-900">Abonament</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {incluse != null ? `${incluse} ședințe incluse` : 'Fără abonament activ'}
            </p>
          </div>
          {ramase != null && (
            <div className="text-right">
              <p
                className={`text-3xl font-bold ${
                  ramase < 0 ? 'text-red-600' : ramase === 0 ? 'text-amber-600' : 'text-emerald-600'
                }`}
              >
                {ramase}
              </p>
              <p className="text-xs text-slate-400">ședințe rămase</p>
            </div>
          )}
        </div>
        {lastBifare?.consumNou && (
          <p className="mt-3 text-xs text-slate-500">Ultima bifă a consumat 1 ședință.</p>
        )}
        {lastBifare && lastBifare.ok && lastBifare.bifat && !lastBifare.consumNou && (
          <p className="mt-3 text-xs text-slate-500">
            Ultima bifă: deblocare fără consum nou (deja taxată / ședință azi).
          </p>
        )}
        {lastBifare && lastBifare.ok && !lastBifare.bifat && (
          <p className="mt-3 text-xs text-slate-500">
            Lecție debifată — copilul nu o mai poate citi. Ședința nu s-a returnat.
          </p>
        )}
      </div>

      {alerta && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 space-y-4">
          <div>
            <h3 className="font-semibold text-amber-900">Ședințe epuizate {ramase != null && ramase < 0 ? `(${ramase})` : ''}</h3>
            <p className="text-sm text-amber-800 mt-1">
              Poți continua să bifezi. Trimite oferta către părinte:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyWhatsApp}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copiat!' : 'Copiază WhatsApp'}
            </button>
            <button
              type="button"
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-800 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <MessageCircle size={16} /> Deschide WhatsApp
            </button>
            <button
              type="button"
              onClick={() => {
                setEmailNote(`Email stub → ${emailParinte} (vezi consola)`)
                console.info('[email-stub manual]', { to: emailParinte, body: mesaj })
              }}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <Mail size={16} /> Stub email
            </button>
          </div>

          {emailNote && <p className="text-xs text-amber-800">{emailNote}</p>}

          <pre className="text-xs text-slate-600 bg-white/70 border border-amber-100 rounded-xl p-3 whitespace-pre-wrap max-h-48 overflow-auto">
            {mesaj}
          </pre>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          resetStore()
          refresh()
          window.location.reload()
        }}
        className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-600"
      >
        <RotateCcw size={12} /> Reset date demo
      </button>
    </div>
  )
}
