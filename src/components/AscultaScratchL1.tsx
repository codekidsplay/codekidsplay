'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, Pause, Play, Square, Loader2 } from 'lucide-react'

/** Pilot Ascultă — doar Scratch M1 L1 */
export default function AscultaScratchL1({ accentColor = '#f83030' }: { accentColor?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'error'>('idle')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setStatus('idle')
  }

  const start = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/tts/scratch-l1')
      const data = (await res.json()) as { url?: string }
      if (!res.ok || !data.url) {
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
      setStatus('error')
    }
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {status === 'idle' || status === 'error' ? (
        <button
          type="button"
          onClick={() => void start()}
          className="inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl hover:opacity-90"
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
            onClick={() => {
              audioRef.current?.pause()
              setStatus('paused')
            }}
            className="inline-flex items-center gap-2 text-sm font-medium bg-slate-800 text-white px-4 py-2 rounded-xl"
          >
            <Pause size={16} /> Pauză
          </button>
          <button
            type="button"
            onClick={stop}
            className="inline-flex items-center gap-2 text-sm font-medium border border-slate-200 text-slate-600 px-4 py-2 rounded-xl"
          >
            <Square size={14} /> Oprește
          </button>
        </>
      ) : null}
      {status === 'paused' ? (
        <>
          <button
            type="button"
            onClick={() => {
              void audioRef.current?.play()
              setStatus('playing')
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl"
            style={{ backgroundColor: accentColor }}
          >
            <Play size={16} /> Continuă
          </button>
          <button
            type="button"
            onClick={stop}
            className="inline-flex items-center gap-2 text-sm font-medium border border-slate-200 text-slate-600 px-4 py-2 rounded-xl"
          >
            <Square size={14} /> Oprește
          </button>
        </>
      ) : null}
    </div>
  )
}
