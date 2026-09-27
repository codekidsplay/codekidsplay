/**
 * Auth mock (localStorage) — fallback când Supabase Admin nu e configurat.
 * Fluxul real: `app/actions/auth.ts` + `app/actions/cursanti.ts`.
 */

import { cursanti } from './mockData'
import { getCursant } from './mockStore'
import {
  destinateDupaLogin as destinateDupaLoginHelper,
  genereazaParola,
  genereazaPin,
  genereazaUsername,
  mesajWhatsAppLogin,
} from './authHelpers'

export {
  genereazaParola,
  genereazaPin,
  genereazaUsername,
  mesajWhatsAppLogin,
} from './authHelpers'

export type Rol = 'admin' | 'parinte' | 'elev' | 'profesor'

export type Session =
  | { rol: 'admin' | 'profesor'; email: string; nume: string }
  | { rol: 'parinte'; email: string; nume: string; cursant_ids: string[] }
  | { rol: 'elev'; username: string; cursant_id: string; prenume: string; nume: string }

export type ContEmail = {
  tip: 'admin' | 'parinte'
  email: string
  parola: string
  nume: string
  cursant_ids: string[]
}

export type ContElev = {
  tip: 'elev'
  cursant_id: string
  username: string
  pin: string
}

export type CredsStore = {
  email: ContEmail[]
  elev: ContElev[]
}

const CREDS_KEY = 'ckp-auth-creds-v1'
const SESSION_KEY = 'ckp-session-v1'

function seedCreds(): CredsStore {
  const elevAccounts: ContElev[] = cursanti.map(c => ({
    tip: 'elev' as const,
    cursant_id: c.id,
    username: genereazaUsername(c.prenume, c.nume),
    pin: c.id === 'u1' ? '1234' : c.id === 'u2' ? '2345' : c.id === 'u3' ? '3456' : '4567',
  }))

  // Părinți: un cont per email (mai mulți copii → același email)
  const byEmail = new Map<string, string[]>()
  for (const c of cursanti) {
    const list = byEmail.get(c.email_parinte) ?? []
    list.push(c.id)
    byEmail.set(c.email_parinte, list)
  }

  const parentAccounts: ContEmail[] = [...byEmail.entries()].map(([email, ids]) => {
    const first = cursanti.find(c => c.id === ids[0])!
    return {
      tip: 'parinte' as const,
      email,
      parola: 'parinte123',
      nume: `Părinte ${first.nume}`,
      cursant_ids: ids,
    }
  })

  return {
    email: [
      {
        tip: 'admin',
        email: 'admin@codekidsplay.ro',
        parola: 'admin123',
        nume: 'Admin CodeKids',
        cursant_ids: [],
      },
      ...parentAccounts,
    ],
    elev: elevAccounts,
  }
}

export function usernameElevDisponibil(username: string, excludeCursantId?: string): boolean {
  const u = username.trim().toLowerCase()
  if (!u) return false
  return !getCreds().elev.some(
    e => e.username.toLowerCase() === u && e.cursant_id !== excludeCursantId,
  )
}

function loadCreds(): CredsStore {
  if (typeof window === 'undefined') return seedCreds()
  try {
    const raw = localStorage.getItem(CREDS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as CredsStore
      // asigură admin + elevi lipsă din seed
      return mergeSeed(parsed)
    }
  } catch { /* ignore */ }
  const s = seedCreds()
  localStorage.setItem(CREDS_KEY, JSON.stringify(s))
  return s
}

function mergeSeed(existing: CredsStore): CredsStore {
  const seed = seedCreds()
  const emails = new Set(existing.email.map(e => e.email.toLowerCase()))
  const elevIds = new Set(existing.elev.map(e => e.cursant_id))
  for (const e of seed.email) {
    if (!emails.has(e.email.toLowerCase())) existing.email.push(e)
  }
  for (const e of seed.elev) {
    if (!elevIds.has(e.cursant_id)) existing.elev.push(e)
  }
  saveCreds(existing)
  return existing
}

function saveCreds(store: CredsStore) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CREDS_KEY, JSON.stringify(store))
}

export function getCreds(): CredsStore {
  return loadCreds()
}

export function getContElev(cursantId: string): ContElev | null {
  return getCreds().elev.find(e => e.cursant_id === cursantId) ?? null
}

export function getContParinte(email: string): ContEmail | null {
  return (
    getCreds().email.find(
      e => e.tip === 'parinte' && e.email.toLowerCase() === email.toLowerCase()
    ) ?? null
  )
}

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Session
  } catch {
    return null
  }
}

function setSession(session: Session | null) {
  if (typeof window === 'undefined') return
  if (!session) localStorage.removeItem(SESSION_KEY)
  else localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function logout() {
  setSession(null)
}

export type LoginResult =
  | { ok: true; session: Session }
  | { ok: false; error: string }

export function loginEmail(email: string, parola: string): LoginResult {
  const creds = getCreds()
  const cont = creds.email.find(
    e => e.email.toLowerCase() === email.trim().toLowerCase() && e.parola === parola
  )
  if (!cont) return { ok: false, error: 'Email sau parolă greșită.' }

  const session: Session =
    cont.tip === 'admin'
      ? { rol: 'admin', email: cont.email, nume: cont.nume }
      : {
          rol: 'parinte',
          email: cont.email,
          nume: cont.nume,
          cursant_ids: cont.cursant_ids,
        }
  setSession(session)
  return { ok: true, session }
}

export function loginElev(username: string, pin: string): LoginResult {
  const creds = getCreds()
  const cont = creds.elev.find(
    e => e.username.toLowerCase() === username.trim().toLowerCase() && e.pin === pin
  )
  if (!cont) return { ok: false, error: 'Username sau PIN greșit.' }

  const cursant = getCursant(cont.cursant_id)
  if (!cursant || !cursant.activ) {
    return { ok: false, error: 'Cont elev inactiv sau inexistent.' }
  }

  const session: Session = {
    rol: 'elev',
    username: cont.username,
    cursant_id: cont.cursant_id,
    prenume: cursant.prenume,
    nume: cursant.nume,
  }
  setSession(session)
  return { ok: true, session }
}

/** Asigură cont elev + leagă/creează cont părinte. Returnează date pentru WhatsApp. */
export function asiguraConturiCursant(opts: {
  cursant_id: string
  prenume: string
  nume: string
  email_parinte: string
  /** Dacă lipsesc, se generează automat */
  username?: string
  pin?: string
  parola_parinte?: string
}): {
  username: string
  pin: string
  email_parinte: string
  parola_parinte: string
  parola_parinte_noua: boolean
  error?: string
} {
  const store = getCreds()

  const usernameDoriti = opts.username?.trim().toLowerCase()
  if (usernameDoriti) {
    const conflict = store.elev.find(
      e => e.username.toLowerCase() === usernameDoriti && e.cursant_id !== opts.cursant_id,
    )
    if (conflict) {
      return {
        username: '',
        pin: '',
        email_parinte: opts.email_parinte,
        parola_parinte: '',
        parola_parinte_noua: false,
        error: `Username-ul „${usernameDoriti}” e deja folosit.`,
      }
    }
  }

  if (opts.pin !== undefined && opts.pin !== '' && !/^\d{4}$/.test(opts.pin)) {
    return {
      username: '',
      pin: '',
      email_parinte: opts.email_parinte,
      parola_parinte: '',
      parola_parinte_noua: false,
      error: 'PIN-ul trebuie să aibă exact 4 cifre.',
    }
  }

  let elev = store.elev.find(e => e.cursant_id === opts.cursant_id)
  if (!elev) {
    let username = usernameDoriti || genereazaUsername(opts.prenume, opts.nume)
    const taken = store.elev.some(
      e => e.username.toLowerCase() === username.toLowerCase() && e.cursant_id !== opts.cursant_id,
    )
    if (taken) username = `${username}${opts.cursant_id.replace(/\D/g, '')}`
    elev = {
      tip: 'elev',
      cursant_id: opts.cursant_id,
      username,
      pin: opts.pin && /^\d{4}$/.test(opts.pin) ? opts.pin : genereazaPin(4),
    }
    store.elev.push(elev)
  } else {
    if (usernameDoriti) elev.username = usernameDoriti
    if (opts.pin && /^\d{4}$/.test(opts.pin)) elev.pin = opts.pin
  }

  let parinte = store.email.find(
    e => e.tip === 'parinte' && e.email.toLowerCase() === opts.email_parinte.toLowerCase(),
  )
  let parolaNoua = false
  if (!parinte) {
    parolaNoua = true
    parinte = {
      tip: 'parinte',
      email: opts.email_parinte,
      parola: opts.parola_parinte?.trim() || genereazaParola(8),
      nume: `Părinte ${opts.nume}`,
      cursant_ids: [opts.cursant_id],
    }
    store.email.push(parinte)
  } else if (!parinte.cursant_ids.includes(opts.cursant_id)) {
    parinte.cursant_ids.push(opts.cursant_id)
  }

  saveCreds(store)
  return {
    username: elev.username,
    pin: elev.pin,
    email_parinte: parinte.email,
    parola_parinte: parinte.parola,
    parola_parinte_noua: parolaNoua,
  }
}

export function resetPinElev(cursantId: string): string | null {
  const store = getCreds()
  const elev = store.elev.find(e => e.cursant_id === cursantId)
  if (!elev) return null
  elev.pin = genereazaPin(4)
  saveCreds(store)
  return elev.pin
}

export function resetParolaParinte(email: string): string | null {
  const store = getCreds()
  const p = store.email.find(
    e => e.tip === 'parinte' && e.email.toLowerCase() === email.toLowerCase()
  )
  if (!p) return null
  p.parola = genereazaParola(8)
  saveCreds(store)
  return p.parola
}

export function destinateDupaLogin(session: Session | { rol: Rol }): string {
  return destinateDupaLoginHelper(session.rol)
}
