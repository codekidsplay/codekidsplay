'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, Pause, Play, Square, Loader2 } from 'lucide-react'

interface Props {
  cursId: string
  lectieId: string
  accentColor?: string
  useGemini?: boolean
  fallbackText?: string
}

type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'unsupported' | 'error'

export default function AscultaLectie({
  cursId,
  lectieId,
  accentColor = '#0ea5e9',
  useGemini = false,
  fallbackText = '',
}: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const audioRef = useRef<HTMLAudioElement | null>(null)

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
    u.rate = 0.9
    const voice = pickRoVoice()
    if (voice) u.voice = voice
    u.onend = () => setStatus('idle')
    u.onerror = () => setStatus('idle')
    window.speechSynthesis.speak(u)
    setStatus('playing')
  }

  const startGemini = async () => {
    setStatus('loading')
    try {
      const res = await fetch(
        `/api/tts?cursId=${encodeURIComponent(cursId)}&lectieId=${encodeURIComponent(lectieId)}`,
      )
      const data = (await res.json()) as {
        url?: string
        fallbackText?: string
      }

      if (!res.ok || !data.url) {
        const fb = data.fallbackText || fallbackText
        if (fb) {
          startWebSpeech(fb)
          return
        }
        setStatus('error')
        return
      }

      const audio = new Audio(data.url)
      audioRef.current = audio
      audio.onended = () => setStatus('idle')
      audio.onerror = () => setStatus('error')
      await audio.play()
      setStatus('playing')
    } catch {
      if (fallbackText) startWebSpeech(fallbackText)
      else setStatus('error')
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

  if (status === 'unsupported') return null

  return (
    <div className="mb-6">
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
      </div>
    </div>
  )
}
