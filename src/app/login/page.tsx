'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  loginEmail,
  loginElev,
  destinateDupaLogin,
  type Session,
} from '@/lib/auth'
import { loginEmailAction, loginElevAction } from '@/app/actions/auth'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'
import BrandLogo from '@/components/BrandLogo'

type Tab = 'adult' | 'elev'

const SESSION_KEY = 'ckp-session-v1'

function persistSession(session: Session) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    /* ignore */
  }
}

export default function LoginForm() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('adult')

  // /login?tip=elev deschide direct fila Elev (link din pagina părintelui)
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('tip') === 'elev') setTab('elev')
  }, [])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [parola, setParola] = useState('')
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')

  const submitAdult = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (isSupabaseConfiguredClient()) {
      const r = await loginEmailAction(email, parola)
      setLoading(false)
      if (!r.ok) {
        setError(r.error)
        return
      }
      if (r.session.rol === 'parinte') {
        persistSession({
          rol: 'parinte',
          email: r.session.email,
          nume: r.session.nume,
          cursant_ids: r.session.cursant_ids,
        })
      } else if (r.session.rol === 'admin') {
        persistSession({
          rol: 'admin',
          email: r.session.email,
          nume: r.session.nume,
          userId: r.session.userId,
        })
      } else if (r.session.rol === 'profesor') {
        persistSession({
          rol: 'profesor',
          email: r.session.email,
          nume: r.session.nume,
          userId: r.session.userId,
          cursant_ids: r.session.cursant_ids,
        })
      } else {
        setError('Rol invalid pentru login adult.')
        return
      }
      router.replace(destinateDupaLogin(r.session))
      return
    }

    const r = loginEmail(email, parola)
    setLoading(false)
    if (!r.ok) {
      setError(r.error)
      return
    }
    router.replace(destinateDupaLogin(r.session))
  }

  const submitElev = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (isSupabaseConfiguredClient()) {
      const r = await loginElevAction(username, pin)
      setLoading(false)
      if (!r.ok) {
        setError(r.error)
        return
      }
      if (r.session.rol !== 'elev') {
        setError('Contul nu e de elev.')
        return
      }
      persistSession({
        rol: 'elev',
        username: r.session.username,
        cursant_id: r.session.cursant_id,
        prenume: r.session.prenume,
        nume: r.session.nume,
      })
      router.replace(destinateDupaLogin(r.session))
      return
    }

    const r = loginElev(username, pin)
    setLoading(false)
    if (!r.ok) {
      setError(r.error)
      return
    }
    router.replace(destinateDupaLogin(r.session))
  }

  return (
    <div className="relative min-h-screen flex items-start justify-center overflow-hidden px-4 pt-[38px] pb-16 bg-[var(--ckp-foam)]">
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div
          className="ckp-login-blob ckp-login-blob-a"
          style={{
            width: '55vw',
            height: '55vw',
            maxWidth: 520,
            maxHeight: 520,
            top: '-12%',
            left: '-10%',
            background: 'rgba(8, 64, 200, 0.32)',
          }}
        />
        <div
          className="ckp-login-blob ckp-login-blob-b"
          style={{
            width: '48vw',
            height: '48vw',
            maxWidth: 440,
            maxHeight: 440,
            top: '18%',
            right: '-14%',
            background: 'rgba(136, 32, 184, 0.28)',
          }}
        />
        <div
          className="ckp-login-blob ckp-login-blob-c"
          style={{
            width: '42vw',
            height: '42vw',
            maxWidth: 380,
            maxHeight: 380,
            bottom: '-8%',
            left: '28%',
            background: 'rgba(248, 48, 48, 0.22)',
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="ckp-fade-up text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <BrandLogo size="lg" href={null} priority />
            <p
              className="text-sm font-medium tracking-tight text-[var(--ckp-ink)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Code Maker Club
            </p>
            <p className="text-[var(--ckp-muted)] text-sm -mt-1">Autentificare</p>
          </Link>
        </div>

        <div className="ckp-fade-up-delay bg-white/90 backdrop-blur-sm rounded-2xl border border-[var(--ckp-ink)]/8 p-6 shadow-sm">
          <div className="flex rounded-xl bg-[var(--ckp-foam)] p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setTab('adult')
                setError('')
              }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-[10px] transition-colors ${
                tab === 'adult'
                  ? 'bg-white text-[var(--ckp-ink)] shadow-sm'
                  : 'text-[var(--ckp-muted)]'
              }`}
            >
              Profesor / Părinte
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('elev')
                setError('')
              }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-[10px] transition-colors ${
                tab === 'elev'
                  ? 'bg-white text-[var(--ckp-ink)] shadow-sm'
                  : 'text-[var(--ckp-muted)]'
              }`}
            >
              Elev
            </button>
          </div>

          {tab === 'adult' ? (
            <form onSubmit={submitAdult} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-[var(--ckp-ink)]/12 rounded-xl px-4 py-2.5 text-[var(--ckp-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--ckp-blue)]"
                  placeholder="email@exemplu.ro"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Parolă</label>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={parola}
                  onChange={e => setParola(e.target.value)}
                  className="w-full border border-[var(--ckp-ink)]/12 rounded-xl px-4 py-2.5 text-[var(--ckp-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--ckp-blue)]"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--ckp-blue)] hover:bg-[var(--ckp-blue-deep)] text-white font-medium py-3 rounded-xl disabled:opacity-60 transition-colors"
              >
                Intră
              </button>
            </form>
          ) : (
            <form onSubmit={submitElev} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
                <input
                  required
                  autoComplete="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full border border-[var(--ckp-ink)]/12 rounded-xl px-4 py-2.5 text-[var(--ckp-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--ckp-purple)]"
                  placeholder="andrei.p"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">PIN</label>
                <input
                  required
                  inputMode="numeric"
                  pattern="[0-9]{4,6}"
                  maxLength={6}
                  autoComplete="one-time-code"
                  value={pin}
                  onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
                  className="w-full border border-[var(--ckp-ink)]/12 rounded-xl px-4 py-2.5 text-[var(--ckp-ink)] tracking-widest focus:outline-none focus:ring-2 focus:ring-[var(--ckp-purple)]"
                  placeholder="••••"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--ckp-red)] hover:bg-[var(--ckp-red-deep)] text-white font-medium py-3 rounded-xl disabled:opacity-60 transition-colors"
              >
                Intră la lecții
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
