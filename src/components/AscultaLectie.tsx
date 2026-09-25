'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, Pause, Play, Square } from 'lucide-react'

interface Props {
  text: string
  accentColor?: string
}

type Status = 'idle' | 'playing' | 'paused' | 'unsupported'

export default function AscultaLectie({ text, accentColor = '#0ea5e9' }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setStatus('unsupported')
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Oprește la schimbarea lecției / textului
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setStatus(s => (s === 'unsupported' ? s : 'idle'))
    }
  }, [text])

  const pickRoVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    return (
      voices.find(v => v.lang.toLowerCase().startsWith('ro')) ||
      voices.find(v => v.lang.toLowerCase().includes('ro')) ||
      null
    )
  }

  // Chrome încarcă vocile asincron
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const load = () => window.speechSynthesis.getVoices()
    load()
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load)
  }, [])

  const start = () => {
    if (!text.trim() || status === 'unsupported') return
    window.speechSynthesis.cancel()

    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ro-RO'
    u.rate = 0.95
    const voice = pickRoVoice()
    if (voice) u.voice = voice

    u.onend = () => setStatus('idle')
    u.onerror = () => setStatus('idle')

    utterRef.current = u
    window.speechSynthesis.speak(u)
    setStatus('playing')
  }

  const pause = () => {
    window.speechSynthesis.pause()
    setStatus('paused')
  }

  const resume = () => {
    window.speechSynthesis.resume()
    setStatus('playing')
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setStatus('idle')
  }

  if (status === 'unsupported') {
    return (
      <p className="text-xs text-slate-400 mb-4">
        Ascultarea nu e disponibilă pe acest dispozitiv / browser.
      </p>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {status === 'idle' && (
        <button
          type="button"
          onClick={start}
          className="inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: accentColor }}
        >
          <Volume2 size={16} /> Ascultă lecția
        </button>
      )}
      {status === 'playing' && (
        <>
          <button
            type="button"
            onClick={pause}
            className="inline-flex items-center gap-2 text-sm font-medium bg-slate-800 text-white px-4 py-2 rounded-xl"
          >
            <Pause size={16} /> Pauză
          </button>
          <button
            type="button"
            onClick={stop}
            className="inline-flex items-center gap-2 text-sm font-medium border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50"
          >
            <Square size={14} /> Oprește
          </button>
        </>
      )}
      {status === 'paused' && (
        <>
          <button
            type="button"
            onClick={resume}
            className="inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl"
            style={{ backgroundColor: accentColor }}
          >
            <Play size={16} /> Continuă
          </button>
          <button
            type="button"
            onClick={stop}
            className="inline-flex items-center gap-2 text-sm font-medium border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-50"
          >
            <Square size={14} /> Oprește
          </button>
        </>
      )}
    </div>
  )
}

/** Text de citit pentru TTS — când vine markdown, îl trimitem aici */
export function textLectiePentruAscultare(opts: {
  titlu: string
  ordine: number
  modulNume: string
}): string {
  return [
    `Lecția ${opts.ordine}: ${opts.titlu}.`,
    `Modul: ${opts.modulNume}.`,
    'În această lecție înveți noțiunile din clasă, cu exemple practice, exerciții și temă pentru acasă.',
    'Deschide lecția pe ecran și urmărește împreună cu vocea, sau reia după ce ai terminat de ascultat.',
  ].join(' ')
}
