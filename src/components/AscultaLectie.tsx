'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, Pause, Play, Square, Loader2, Turtle, Rabbit } from 'lucide-react'

/** Ritm implicit pentru 8–10 ani (1 = normal) */
const DEFAULT_RATE = 0.55

interface Props {
  cursId: string
  lectieId: string
  accentColor?: string
  useGemini?: boolean
  fallbackText?: string
}

type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'unsupported' | 'error'

function applyAudioRate(audio: HTMLAudioElement, rate: number) {
  audio.defaultPlaybackRate = rate
  audio.playbackRate = rate
  try {
    audio.preservesPitch = true
    // Safari
    ;(audio as HTMLAudioElement & { webkitPreservesPitch?: boolean }).webkitPreservesPitch = true
  } catch {
    /* ignore */
  }
}

export default function AscultaLectie({
  cursId,
  lectieId,
  accentColor = '#0ea5e9',
  useGemini = false,
  fallbackText = '',
}: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [hint, setHint] = useState<string | null>(null)
  const [rate, setRate] = useState(DEFAULT_RATE)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const rateRef = useRef(DEFAULT_RATE)

  useEffect(() => {
    rateRef.current = rate
    if (audioRef.current) applyAudioRate(audioRef.current, rate)
  }, [rate])

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  useEffect(() => {
    audioRef.current?.pause()
    audioRef.current = null
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setStatus('idle')
    setHint(null)
  }, [cursId, lectieId])

  const pickRoVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    return (
      voices.find(v => v.lang.toLowerCase().startsWith('ro')) ||
      voices.find(v => v.lang.toLowerCase().includes('ro')) ||
      null
    )
  }

  const startWebSpeech = (text: string) => {
    if (!text.trim() || !('speechSynthesis' in window)) {
      setStatus('unsupported')
      return
    }
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ro-RO'
    u.rate = rateRef.current
    const voice = pickRoVoice()
    if (voice) u.voice = voice
    u.onend = () => setStatus('idle')
    u.onerror = () => setStatus('idle')
    window.speechSynthesis.speak(u)
    setStatus('playing')
    setHint(`Voce browser · ${Math.round(rateRef.current * 100)}% viteză`)
  }

  const startGemini = async () => {
    setStatus('loading')
    setHint(null)
    try {
      const res = await fetch(
        `/api/tts?cursId=${encodeURIComponent(cursId)}&lectieId=${encodeURIComponent(lectieId)}`,
      )
      const data = (await res.json()) as {
        url?: string
        cached?: boolean
        error?: string
        fallbackText?: string
      }

      if (!res.ok || !data.url) {
        const fb = data.fallbackText || fallbackText
        if (fb) {
          setHint(data.error || 'Folosim vocea din browser.')
          startWebSpeech(fb)
          return
        }
        setHint(data.error || 'Nu am putut porni ascultarea.')
        setStatus('error')
        return
      }

      const audio = new Audio(data.url)
      applyAudioRate(audio, rateRef.current)

      const keepSlow = () => applyAudioRate(audio, rateRef.current)
      audio.addEventListener('loadedmetadata', keepSlow)
      audio.addEventListener('play', keepSlow)
      audio.addEventListener('playing', keepSlow)
      audio.addEventListener('ratechange', () => {
        if (Math.abs(audio.playbackRate - rateRef.current) > 0.01) {
          applyAudioRate(audio, rateRef.current)
        }
      })

      audioRef.current = audio
      audio.onended = () => setStatus('idle')
      audio.onerror = () => {
        setHint('Eroare la redare. Încearcă din nou.')
        setStatus('error')
      }
      await audio.play()
      keepSlow()
      setStatus('playing')
      setHint(
        `${data.cached ? 'Din cache' : 'Gemini'} · viteză ${Math.round(rateRef.current * 100)}%`,
      )
    } catch {
      if (fallbackText) {
        setHint('Conexiune eșuată — voce din browser.')
        startWebSpeech(fallbackText)
      } else {
        setHint('Nu am putut porni ascultarea.')
        setStatus('error')
      }
    }
  }

  const start = () => {
    if (useGemini) void startGemini()
    else startWebSpeech(fallbackText)
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setStatus('paused')
      return
    }
    window.speechSynthesis.pause()
    setStatus('paused')
  }

  const resume = () => {
    if (audioRef.current) {
      applyAudioRate(audioRef.current, rateRef.current)
      void audioRef.current.play()
      setStatus('playing')
      return
    }
    window.speechSynthesis.resume()
    setStatus('playing')
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setStatus('idle')
  }

  const slower = () => setRate(r => Math.max(0.4, Math.round((r - 0.1) * 10) / 10))
  const faster = () => setRate(r => Math.min(1, Math.round((r + 0.1) * 10) / 10))

  if (status === 'unsupported') {
    return (
      <p className="text-xs text-slate-400 mb-4">
        Ascultarea nu e disponibilă pe acest dispozitiv / browser.
      </p>
    )
  }

  return (
    <div className="mb-6 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {status === 'idle' || status === 'error' ? (
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            <Volume2 size={16} /> Ascultă lecția
          </button>
        ) : null}
        {status === 'loading' ? (
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 text-sm font-medium bg-slate-200 text-slate-600 px-4 py-2 rounded-xl"
          >
            <Loader2 size={16} className="animate-spin" /> Pregătesc vocea…
          </button>
        ) : null}
        {status === 'playing' ? (
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
        ) : null}
        {status === 'paused' ? (
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
        ) : null}

        <button
          type="button"
          onClick={slower}
          className="inline-flex items-center gap-1.5 text-xs font-medium border border-slate-200 text-slate-600 px-3 py-2 rounded-xl hover:bg-slate-50"
          title="Mai lent"
        >
          <Turtle size={14} /> Mai lent
        </button>
        <button
          type="button"
          onClick={faster}
          className="inline-flex items-center gap-1.5 text-xs font-medium border border-slate-200 text-slate-600 px-3 py-2 rounded-xl hover:bg-slate-50"
          title="Mai rapid"
        >
          <Rabbit size={14} /> Mai rapid
        </button>
        <span className="text-xs text-slate-500 tabular-nums">{Math.round(rate * 100)}%</span>
      </div>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      {useGemini && status === 'idle' ? (
        <p className="text-xs text-slate-400">
          Ritm implicit 55% — poți apăsa „Mai lent” în timpul redării. Prima generare ~30–60s.
        </p>
      ) : null}
    </div>
  )
}
