'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const STORAGE_KEY = 'ckp-ochi-scor'
const SCORE_CAP = 888

type FlipAnim = 'to180' | 'to360' | null

function persist(n: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(n))
  } catch {
    /* ignore */
  }
}

/** Ochi Code Kids Play — click = jumătate de flip + scor (la 888 → reset 0). */
export default function OchiPlay({ className = '' }: { className?: string }) {
  const [score, setScore] = useState(0)
  const [ready, setReady] = useState(false)
  const [anim, setAnim] = useState<FlipAnim>(null)
  const [showScore, setShowScore] = useState(false)
  const [jackpot, setJackpot] = useState(false)

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

  // După ce apare 888, scurtă pauză apoi reset la 0
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

  const onClick = () => {
    if (jackpot) return
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
      type="button"
      onClick={onClick}
      onAnimationEnd={() => setAnim(null)}
      className={`group relative inline-flex items-center gap-2 rounded-full p-1 -m-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ckp-purple)]/40 [perspective:480px] ${className}`}
      aria-label={
        ready
          ? `Ochi Code Kids Play — scor ${score}. Apasă ca să întoarcă ochii.`
          : 'Ochi Code Kids Play'
      }
      title="Psst… apasă pe ochi"
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
