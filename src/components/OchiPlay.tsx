'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const STORAGE_KEY = 'ckp-ochi-scor'
const SCORE_CAP = 888
const IDLE_FIRST_MS = 2000
const IDLE_EVERY_MS = 4800

type FlipAnim = 'to180' | 'to360' | null

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

/** Ochi Code Maker Club — idle bounce + click flip/scor (la 888 → reset 0). */
export default function OchiPlay({ className = '' }: { className?: string }) {
  const [score, setScore] = useState(0)
  const [ready, setReady] = useState(false)
  const [anim, setAnim] = useState<FlipAnim>(null)
  const [idle, setIdle] = useState(false)
  const [inView, setInView] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [jackpot, setJackpot] = useState(false)
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

  // Bounce singur când e vizibil (nu în timpul flip / jackpot)
  useEffect(() => {
    if (!inView || anim || jackpot || prefersReducedMotion()) return

    const nudge = () => setIdle(true)
    const first = window.setTimeout(nudge, IDLE_FIRST_MS)
    const every = window.setInterval(nudge, IDLE_EVERY_MS)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(every)
    }
  }, [inView, anim, jackpot])

  useEffect(() => {
    if (!jackpot) return
    const t = window.setTimeout(() => {
      setJackpot(false)
      setScore(0)
      setAnim(null)
      persist(0)
    }, 650)
    return () => window.clearTimeout(t)
  }, [jackpot])

  const blueOnLeft = score % 2 === 1
  const busy = anim !== null || jackpot

  const onClick = () => {
    if (jackpot) return
    setIdle(false)
    const next = score + 1
    setAnim(next % 2 === 1 ? 'to180' : 'to360')
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

  const imgClass = [
    'w-14 h-14 sm:w-16 sm:h-16 object-contain select-none',
    'transform-gpu',
    anim === 'to180' ? 'ckp-ochi-to180' : '',
    anim === 'to360' ? 'ckp-ochi-to360' : '',
    !anim && blueOnLeft ? 'ckp-ochi-flipped' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      onAnimationEnd={(e) => {
        if (e.target instanceof HTMLImageElement) setAnim(null)
      }}
      className={`group relative inline-flex cursor-pointer items-center gap-2 rounded-full p-1 -m-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ckp-purple)]/40 [perspective:480px] ${className}`}
      aria-label={
        ready
          ? `Ochi Code Maker Club — scor ${score}. Apasă ca să întoarcă ochii.`
          : 'Ochi Code Maker Club'
      }
      title="Psst… apasă pe ochi"
    >
      <span
        className={`inline-flex ${idle && !busy ? 'ckp-ochi-idle' : ''}`}
        onAnimationEnd={() => setIdle(false)}
      >
        <Image
          src="/logo-mark.png"
          alt=""
          width={64}
          height={64}
          unoptimized
          className={imgClass}
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
