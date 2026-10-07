'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  elevAuthEmail,
  elevAuthPassword,
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/env'
import type { RolDb } from '@/lib/supabase/types'

export type AuthSessionPayload =
  | { rol: 'admin'; email: string; nume: string; userId: string }
  | {
      rol: 'profesor'
      email: string
      nume: string
      userId: string
      cursant_ids: string[]
    }
  | {
      rol: 'parinte'
      email: string
      nume: string
      userId: string
      cursant_ids: string[]
    }
  | {
      rol: 'elev'
      username: string
      cursant_id: string
      prenume: string
      nume: string
      userId: string
    }

export type AuthActionResult =
  | { ok: true; session: AuthSessionPayload }
  | { ok: false; error: string }

async function buildSession(userId: string): Promise<AuthActionResult> {
  const admin = isSupabaseAdminConfigured() ? createAdminClient() : null
  const supabase = await createClient()

  const client = admin ?? supabase
  const { data: profile, error } = await client
    .from('profile')
    .select('id, rol, cursant_id, nume_afisat')
    .eq('id', userId)
    .maybeSingle()

  if (error || !profile) {
    return { ok: false, error: 'Profil lipsă. Contactează administratorul.' }
  }

  const { data: authUser } = admin
    ? await admin.auth.admin.getUserById(userId)
    : await supabase.auth.getUser()

  const email = authUser?.user?.email ?? ''
  const rol = profile.rol as RolDb

  if (rol === 'admin') {
    return {
      ok: true,
      session: {
        rol: 'admin',
        email,
        nume: profile.nume_afisat || email,
        userId,
      },
    }
  }

  if (rol === 'profesor') {
    const { data: links, error: linkErr } = await client
      .from('profesor_cursanti')
      .select('cursant_id')
      .eq('profesor_id', userId)
    // Dacă migrația nu e rulatǎ încă, nu blocăm login-ul
    if (linkErr) {
      console.warn('[auth] profesor_cursanti:', linkErr.message)
    }
    return {
      ok: true,
      session: {
        rol: 'profesor',
        email,
        nume: profile.nume_afisat || email,
        userId,
        cursant_ids: linkErr ? [] : (links ?? []).map(l => l.cursant_id),
      },
    }
  }

  if (rol === 'parinte') {
    const { data: links } = await client
      .from('parinte_cursanti')
      .select('cursant_id')
      .eq('parinte_id', userId)
    return {
      ok: true,
      session: {
        rol: 'parinte',
        email,
        nume: profile.nume_afisat || `Părinte`,
        userId,
        cursant_ids: (links ?? []).map(l => l.cursant_id),
      },
    }
  }

  if (rol === 'elev' && profile.cursant_id) {
    const { data: cursant } = await client
      .from('cursanti')
      .select('id, prenume, nume, username, activ')
      .eq('id', profile.cursant_id)
      .maybeSingle()

    if (!cursant || !cursant.activ) {
      return { ok: false, error: 'Cont elev inactiv sau inexistent.' }
    }

    return {
      ok: true,
      session: {
        rol: 'elev',
        username: cursant.username,
        cursant_id: cursant.id,
        prenume: cursant.prenume,
        nume: cursant.nume,
        userId,
      },
    }
  }

  return { ok: false, error: 'Rol necunoscut.' }
}

export async function loginEmailAction(
  email: string,
  parola: string,
): Promise<AuthActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'Supabase nu e configurat.' }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password: parola,
  })

  if (error || !data.user) {
    return { ok: false, error: 'Email sau parolă greșită.' }
  }

  return buildSession(data.user.id)
}

export async function loginElevAction(
  username: string,
  pin: string,
): Promise<AuthActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'Supabase nu e configurat.' }
  }

  const u = username.trim().toLowerCase()
  if (!u || !/^\d{4,6}$/.test(pin.trim())) {
    return { ok: false, error: 'Username sau PIN greșit.' }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: elevAuthEmail(u),
    password: elevAuthPassword(pin.trim()),
  })

  if (error || !data.user) {
    return { ok: false, error: 'Username sau PIN greșit.' }
  }

  return buildSession(data.user.id)
}

export async function logoutAction(): Promise<void> {
  if (!isSupabaseConfigured()) return
  const supabase = await createClient()
  await supabase.auth.signOut()
}

export async function getAuthSessionAction(): Promise<AuthSessionPayload | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) return null
  const r = await buildSession(data.user.id)
  return r.ok ? r.session : null
}
