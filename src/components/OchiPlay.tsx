'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const STORAGE_KEY = 'ckp-ochi-scor'
const SCORE_CAP = 888
const IDLE_FIRST_MS = 900
const IDLE_EVERY_MS = 2200

function persist(n: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(n))
  } catch {
    /* ignore */
  }
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Ochi Code Maker Club — idle bounce + click scor (fără flip; la 888 → reset 0). */
export default function OchiPlay({ className = '' }: { className?: string }) {
  const [score, setScore] = useState(0)
  const [ready, setReady] = useState(false)
  const [idle, setIdle] = useState(false)
  const [inView, setInView] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [jackpot, setJackpot] = useState(false)
  const [nudgeKey, setNudgeKey] = useState(0)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const n = raw ? Number.parseInt(raw, 10) : 0
      if (Number.isFinite(n) && n > 0) {
        if (n >= SCORE_CAP) {
          setScore(0)
          persist(0)
        } else {
          setScore(n)
          setShowScore(true)
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  useEffect(() => {
    const el = btnRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || jackpot || prefersReducedMotion()) return

    const startIdle = () => setIdle(true)
    const first = window.setTimeout(startIdle, IDLE_FIRST_MS)
    const every = window.setInterval(startIdle, IDLE_EVERY_MS)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(every)
    }
  }, [inView, jackpot])

  useEffect(() => {
    if (!jackpot) return
    const t = window.setTimeout(() => {
      setJackpot(false)
      setScore(0)
      persist(0)
    }, 650)
    return () => window.clearTimeout(t)
  }, [jackpot])

  const onClick = () => {
    if (jackpot) return
    setIdle(false)
    setNudgeKey((k) => k + 1)
    const next = score + 1
    setShowScore(true)

    if (next >= SCORE_CAP) {
      setScore(SCORE_CAP)
      setJackpot(true)
      persist(SCORE_CAP)
      return
    }

    setScore(next)
    persist(next)
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      className={`group relative inline-flex cursor-pointer items-center gap-2 rounded-full p-1 -m-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ckp-purple)]/40 ${className}`}
      aria-label={
        ready
          ? `Ochi Code Maker Club — scor ${score}. Apasă ca să crești scorul.`
          : 'Ochi Code Maker Club'
      }
      title="Psst… apasă pe ochi"
    >
      <span
        key={nudgeKey || undefined}
        className={`inline-flex ${idle && !jackpot && nudgeKey === 0 ? 'ckp-ochi-idle' : ''} ${
          nudgeKey > 0 && !jackpot ? 'ckp-ochi-nudge' : ''
        }`}
        onAnimationEnd={(e) => {
          if (e.animationName.includes('ochi-idle')) setIdle(false)
          if (e.animationName.includes('ochi-nudge')) setNudgeKey(0)
        }}
      >
        <Image
          src="/logo-mark.png"
          alt=""
          width={144}
          height={144}
          unoptimized
          className="w-28 h-28 sm:w-36 sm:h-36 object-contain select-none bg-transparent"
          draggable={false}
        />
      </span>
      <span
        className={`text-sm font-semibold tabular-nums transition-opacity duration-500 ${
          jackpot ? 'text-[var(--ckp-red)]' : 'text-[var(--ckp-purple)]'
        } ${showScore || score > 0 ? 'opacity-100' : 'opacity-0'}`}
        aria-live="polite"
      >
        {ready ? score : ''}
      </span>
    </button>
  )
}
