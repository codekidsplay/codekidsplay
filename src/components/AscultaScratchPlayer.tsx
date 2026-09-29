'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, Pause, Play, Square, Loader2, RotateCcw } from 'lucide-react'

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Player Ascultă: Pauză / −15 s / Oprește + bară pe același rând. */
export default function AscultaScratchPlayer({
  ordine,
  apiUrl,
  logLabel,
  accentColor = '#f83030',
}: {
  ordine: number
  apiUrl: (ordine: number) => string
  logLabel: string
  accentColor?: string
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'error'>('idle')
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const seekingRef = useRef(false)

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
    setCurrent(0)
    setDuration(0)
    setStatus('idle')
  }

  const rewind15 = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, audio.currentTime - 15)
    setCurrent(audio.currentTime)
  }

  const start = async () => {
    setStatus('loading')
    try {
      const res = await fetch(apiUrl(ordine))
      const data = (await res.json()) as { url?: string; error?: string; detail?: string }
      if (!res.ok || !data.url) {
        console.error(`[${logLabel}]`, ordine, data.error, data.detail)
        setStatus('error')
        return
      }
      const audio = new Audio(data.url)
      audioRef.current = audio
      audio.onended = () => {
        setStatus('idle')
        setCurrent(0)
      }
      audio.onerror = () => setStatus('error')
      audio.ontimeupdate = () => {
        if (!seekingRef.current) setCurrent(audio.currentTime)
      }
      audio.onloadedmetadata = () => setDuration(audio.duration || 0)
      audio.ondurationchange = () => setDuration(audio.duration || 0)
      await audio.play()
      setStatus('playing')
    } catch (e) {
      console.error(`[${logLabel}]`, ordine, e)
      setStatus('error')
    }
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
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
      {status === 'playing' || status === 'paused' ? (
        <>
          {status === 'playing' ? (
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
          ) : (
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
          )}
          <button
            type="button"
            onClick={rewind15}
            className="inline-flex items-center gap-2 text-sm font-medium border border-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50"
            title="Înapoi 15 secunde"
          >
            <RotateCcw size={16} /> −15 s
          </button>
          <button
            type="button"
            onClick={stop}
            className="inline-flex items-center gap-2 text-sm font-medium border border-slate-200 text-slate-600 px-4 py-2 rounded-xl"
          >
            <Square size={14} /> Oprește
          </button>
          <div className="flex items-center gap-2 min-w-[10rem] flex-1 basis-40 max-w-xs sm:ml-1">
            <span className="text-xs tabular-nums text-slate-500 w-9 shrink-0">{formatTime(current)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(current, duration || 0)}
              onPointerDown={() => {
                seekingRef.current = true
              }}
              onPointerUp={e => {
                const audio = audioRef.current
                const v = Number((e.target as HTMLInputElement).value)
                if (audio) {
                  audio.currentTime = v
                  setCurrent(v)
                }
                seekingRef.current = false
              }}
              onChange={e => {
                setCurrent(Number(e.target.value))
              }}
              className="w-full h-2 cursor-pointer"
              style={{ accentColor }}
              aria-label="Poziție audio"
            />
            <span className="text-xs tabular-nums text-slate-500 w-9 shrink-0 text-right">
              {formatTime(duration)}
            </span>
          </div>
        </>
      ) : null}
    </div>
  )
}
