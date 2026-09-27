'use client'

import { useState } from 'react'
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
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 pt-[38px] pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <BrandLogo size="lg" href={null} priority />
            <p className="text-slate-300 text-sm">Autentificare</p>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setTab('adult')
                setError('')
              }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-[10px] transition-colors ${
                tab === 'adult' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
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
                tab === 'elev' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
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
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 rounded-xl disabled:opacity-60"
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
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 tracking-widest focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="••••"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-xl disabled:opacity-60"
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
