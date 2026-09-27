'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import {
  elevAuthEmail,
  elevAuthPassword,
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/env'
import { defaultModulPentruCurs } from '@/lib/curriculum'
import {
  genereazaParola,
  genereazaPin,
  genereazaUsername,
} from '@/lib/authHelpers'

export type AdaugaCursantInput = {
  prenume: string
  nume: string
  email_parinte: string
  telefon_parinte?: string | null
  username?: string
  pin?: string
  parola_parinte?: string
  curs_id?: string | null
}

export type AdaugaCursantResult =
  | {
      ok: true
      cursant_id: string
      username: string
      pin: string
      email_parinte: string
      parola_parinte: string
      parola_parinte_noua: boolean
    }
  | { ok: false; error: string }

function normalizeUsername(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9._-]/g, '')
}

export async function adaugaCursantAction(
  input: AdaugaCursantInput,
): Promise<AdaugaCursantResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'Supabase nu e configurat.' }
  }
  if (!isSupabaseAdminConfigured()) {
    return {
      ok: false,
      error:
        'Lipsește SUPABASE_SERVICE_ROLE_KEY pe server. Adaug-o în .env.local (secret, nu NEXT_PUBLIC).',
    }
  }

  const prenume = input.prenume.trim()
  const nume = input.nume.trim()
  const emailParinte = input.email_parinte.trim().toLowerCase()
  const telefon = input.telefon_parinte?.trim() || null

  if (!prenume || !nume) {
    return { ok: false, error: 'Completează prenumele și numele copilului.' }
  }
  if (!emailParinte.includes('@')) {
    return { ok: false, error: 'Email-ul părintelui e invalid.' }
  }

  let username = normalizeUsername(input.username || '') || genereazaUsername(prenume, nume)
  if (!/^[a-z0-9._-]{2,32}$/.test(username)) {
    return { ok: false, error: 'Username invalid (2–32 caractere: a-z, 0-9, . _ -).' }
  }

  const pin =
    input.pin && /^\d{4,6}$/.test(input.pin.trim())
      ? input.pin.trim()
      : genereazaPin(4)

  const admin = createAdminClient()

  const { data: existingUser } = await admin
    .from('cursanti')
    .select('id')
    .eq('username', username)
    .maybeSingle()

  if (existingUser) {
    return { ok: false, error: `Username-ul „${username}” e deja folosit.` }
  }

  const { data: cursant, error: cursantErr } = await admin
    .from('cursanti')
    .insert({
      prenume,
      nume,
      email_parinte: emailParinte,
      telefon_parinte: telefon,
      username,
      activ: true,
    })
    .select('id')
    .single()

  if (cursantErr || !cursant) {
    return { ok: false, error: cursantErr?.message ?? 'Nu am putut crea fișa cursantului.' }
  }

  // Cont elev (email intern + PIN ca parolă derivată)
  const elevEmail = elevAuthEmail(username)
  const { data: elevAuth, error: elevAuthErr } = await admin.auth.admin.createUser({
    email: elevEmail,
    password: elevAuthPassword(pin),
    email_confirm: true,
    app_metadata: { rol: 'elev', cursant_id: cursant.id },
    user_metadata: { username, prenume, nume },
  })

  if (elevAuthErr || !elevAuth.user) {
    await admin.from('cursanti').delete().eq('id', cursant.id)
    return {
      ok: false,
      error: elevAuthErr?.message ?? 'Nu am putut crea contul elevului în Auth.',
    }
  }

  const { error: elevProfileErr } = await admin.from('profile').insert({
    id: elevAuth.user.id,
    rol: 'elev',
    cursant_id: cursant.id,
    nume_afisat: `${prenume} ${nume}`,
  })

  if (elevProfileErr) {
    await admin.auth.admin.deleteUser(elevAuth.user.id)
    await admin.from('cursanti').delete().eq('id', cursant.id)
    return { ok: false, error: elevProfileErr.message }
  }

  // Cont părinte: reutilizează dacă există deja
  let parolaParinte = input.parola_parinte?.trim() || ''
  let parolaNoua = false
  let parinteUserId: string | null = null

  const { data: listed } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const existingParinte = listed?.users?.find(
    u => u.email?.toLowerCase() === emailParinte,
  )

  if (existingParinte) {
    parinteUserId = existingParinte.id
    // Nu returnăm parola veche (nu o cunoaștem) — admin setează una nouă dacă a completat câmpul
    if (parolaParinte.length >= 6) {
      await admin.auth.admin.updateUserById(existingParinte.id, {
        password: parolaParinte,
      })
      parolaNoua = true
    } else {
      parolaParinte = '(parolă existentă — neschimbată)'
    }
  } else {
    if (parolaParinte.length < 6) parolaParinte = genereazaParola(8)
    parolaNoua = true
    const { data: parinteAuth, error: parinteAuthErr } = await admin.auth.admin.createUser({
      email: emailParinte,
      password: parolaParinte,
      email_confirm: true,
      app_metadata: { rol: 'parinte' },
      user_metadata: { nume: `Părinte ${nume}` },
    })
    if (parinteAuthErr || !parinteAuth.user) {
      await admin.auth.admin.deleteUser(elevAuth.user.id)
      await admin.from('cursanti').delete().eq('id', cursant.id)
      return {
        ok: false,
        error: parinteAuthErr?.message ?? 'Nu am putut crea contul părintelui.',
      }
    }
    parinteUserId = parinteAuth.user.id
    await admin.from('profile').upsert({
      id: parinteUserId,
      rol: 'parinte',
      cursant_id: null,
      nume_afisat: `Părinte ${nume}`,
    })
  }

  if (parinteUserId) {
    await admin.from('parinte_cursanti').upsert({
      parinte_id: parinteUserId,
      cursant_id: cursant.id,
    })
  }

  if (input.curs_id) {
    await admin.from('inscrieri').insert({
      cursant_id: cursant.id,
      curs_id: input.curs_id,
      modul_activ_id: defaultModulPentruCurs(input.curs_id),
      activ: true,
    })
  }

  return {
    ok: true,
    cursant_id: cursant.id,
    username,
    pin,
    email_parinte: emailParinte,
    parola_parinte: parolaParinte,
    parola_parinte_noua: parolaNoua,
  }
}

export async function usernameDisponibilAction(username: string): Promise<boolean> {
  if (!isSupabaseAdminConfigured()) return true
  const u = normalizeUsername(username)
  if (!u) return false
  const admin = createAdminClient()
  const { data } = await admin.from('cursanti').select('id').eq('username', u).maybeSingle()
  return !data
}

export async function listCursantiAction() {
  if (!isSupabaseConfigured()) return { ok: false as const, error: 'unconfigured', data: [] }
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cursanti')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return { ok: false as const, error: error.message, data: [] }
  return { ok: true as const, data: data ?? [] }
}
