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
  data_nastere: string
  username?: string
  pin?: string
  parola_parinte?: string
  curs_id?: string | null
  /** UUID profesor — admin alege; dacă e gol și caller e profesor, se auto-asignează */
  profesor_id?: string | null
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
  const dataNastere = input.data_nastere.trim()

  if (!prenume || !nume) {
    return { ok: false, error: 'Completează prenumele și numele copilului.' }
  }
  if (!emailParinte.includes('@')) {
    return { ok: false, error: 'Email-ul părintelui e invalid.' }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNastere)) {
    return { ok: false, error: 'Data nașterii e obligatorie.' }
  }
  const dn = new Date(dataNastere + 'T12:00:00')
  if (Number.isNaN(dn.getTime()) || dn > new Date()) {
    return { ok: false, error: 'Data nașterii invalidă.' }
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
      data_nastere: dataNastere,
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

  // Asignare profesor
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  let profesorId = input.profesor_id?.trim() || null
  if (!profesorId && auth.user) {
    const { data: me } = await admin
      .from('profile')
      .select('rol')
      .eq('id', auth.user.id)
      .maybeSingle()
    if (me?.rol === 'profesor') profesorId = auth.user.id
  }
  if (profesorId) {
    await admin.from('profesor_cursanti').upsert({
      profesor_id: profesorId,
      cursant_id: cursant.id,
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

export async function listCursantiAction(): Promise<
  | {
      ok: true
      data: Array<{
        id: string
        nume: string
        prenume: string
        email_parinte: string
        telefon_parinte: string | null
        data_nastere: string | null
        data_inscriere: string
        activ: boolean
        username?: string
        created_at?: string
      }>
      inscrieri: Array<{
        id: string
        cursant_id: string
        curs_id: string
        modul_activ_id: string | null
        activ: boolean
      }>
      solduri: Record<string, { incluse: number; ramase: number }>
    }
  | { ok: false; error: string; data: []; inscrieri: []; solduri: Record<string, never> }
> {
  if (!isSupabaseConfigured()) {
    return { ok: false as const, error: 'unconfigured', data: [], inscrieri: [], solduri: {} }
  }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) {
    return { ok: false as const, error: 'Neautentificat', data: [], inscrieri: [], solduri: {} }
  }

  const admin = isSupabaseAdminConfigured() ? createAdminClient() : null
  const client = admin ?? supabase

  const { data: profile } = await client
    .from('profile')
    .select('rol')
    .eq('id', auth.user.id)
    .maybeSingle()

  if (!profile || (profile.rol !== 'admin' && profile.rol !== 'profesor')) {
    return { ok: false as const, error: 'Acces interzis', data: [], inscrieri: [], solduri: {} }
  }

  let cursantRows:
    | Array<{
        id: string
        nume: string
        prenume: string
        email_parinte: string
        telefon_parinte: string | null
        data_nastere: string | null
        data_inscriere: string
        activ: boolean
      }>
    | null = null

  if (profile.rol === 'profesor') {
    const { data: links } = await client
      .from('profesor_cursanti')
      .select('cursant_id')
      .eq('profesor_id', auth.user.id)
    const ids = (links ?? []).map(l => l.cursant_id)
    if (ids.length === 0) return { ok: true as const, data: [], inscrieri: [], solduri: {} }
    const { data, error } = await client
      .from('cursanti')
      .select('id, nume, prenume, email_parinte, telefon_parinte, data_nastere, data_inscriere, activ')
      .in('id', ids)
      .order('created_at', { ascending: false })
    if (error) return { ok: false as const, error: error.message, data: [], inscrieri: [], solduri: {} }
    cursantRows = data ?? []
  } else {
    const { data, error } = await client
      .from('cursanti')
      .select('id, nume, prenume, email_parinte, telefon_parinte, data_nastere, data_inscriere, activ')
      .order('created_at', { ascending: false })
    if (error) return { ok: false as const, error: error.message, data: [], inscrieri: [], solduri: {} }
    cursantRows = data ?? []
  }

  const cursantIds = cursantRows.map(c => c.id)
  let inscrieri: Array<{
    id: string
    cursant_id: string
    curs_id: string
    modul_activ_id: string | null
    activ: boolean
  }> = []
  const solduri: Record<string, { incluse: number; ramase: number }> = {}

  if (cursantIds.length > 0) {
    const [{ data: insc }, { data: abonamente }, { data: sedinte }] = await Promise.all([
      client
        .from('inscrieri')
        .select('id, cursant_id, curs_id, modul_activ_id, activ')
        .in('cursant_id', cursantIds),
      client
        .from('abonamente')
        .select('id, cursant_id, sedinte_incluse')
        .in('cursant_id', cursantIds)
        .eq('activ', true),
      client
        .from('sedinte')
        .select('abonament_id')
        .in('cursant_id', cursantIds)
        .eq('consuma_sedinta', true),
    ])
    inscrieri = insc ?? []

    const consumate = new Map<string, number>()
    for (const s of sedinte ?? []) {
      consumate.set(s.abonament_id, (consumate.get(s.abonament_id) ?? 0) + 1)
    }
    for (const ab of abonamente ?? []) {
      solduri[ab.cursant_id] = {
        incluse: ab.sedinte_incluse,
        ramase: ab.sedinte_incluse - (consumate.get(ab.id) ?? 0),
      }
    }
  }

  return { ok: true as const, data: cursantRows, inscrieri, solduri }
}

export async function getCursantAction(cursantId: string): Promise<
  | {
      ok: true
      data: {
        id: string
        nume: string
        prenume: string
        email_parinte: string
        telefon_parinte: string | null
        data_nastere: string | null
        data_inscriere: string
        activ: boolean
      }
    }
  | { ok: false; error: string; denied?: boolean }
> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'unconfigured' }
  }
  if (!/^[0-9a-f-]{36}$/i.test(cursantId)) {
    return { ok: false, error: 'id invalid' }
  }

  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false, error: 'Neautentificat', denied: true }

  const admin = isSupabaseAdminConfigured() ? createAdminClient() : null
  const client = admin ?? supabase

  const { data: profile } = await client
    .from('profile')
    .select('rol')
    .eq('id', auth.user.id)
    .maybeSingle()

  if (!profile || (profile.rol !== 'admin' && profile.rol !== 'profesor')) {
    return { ok: false, error: 'Acces interzis', denied: true }
  }

  if (profile.rol === 'profesor') {
    const { data: link } = await client
      .from('profesor_cursanti')
      .select('cursant_id')
      .eq('profesor_id', auth.user.id)
      .eq('cursant_id', cursantId)
      .maybeSingle()
    if (!link) return { ok: false, error: 'Nu ai acces la acest cursant.', denied: true }
  }

  const { data, error } = await client
    .from('cursanti')
    .select('id, nume, prenume, email_parinte, telefon_parinte, data_nastere, data_inscriere, activ')
    .eq('id', cursantId)
    .maybeSingle()

  if (error) return { ok: false, error: error.message }
  if (!data) return { ok: false, error: 'Cursantul nu a fost găsit.' }
  return { ok: true, data }
}

export async function updateCursantAction(
  cursantId: string,
  input: {
    prenume: string
    nume: string
    email_parinte: string
    telefon_parinte?: string | null
    data_nastere: string
    activ: boolean
  },
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isSupabaseAdminConfigured()) {
    return { ok: false, error: 'Supabase Admin neconfigurat.' }
  }
  if (!/^[0-9a-f-]{36}$/i.test(cursantId)) {
    return { ok: false, error: 'ID cursant invalid.' }
  }

  const prenume = input.prenume.trim()
  const nume = input.nume.trim()
  const email = input.email_parinte.trim().toLowerCase()
  const dataNastere = input.data_nastere.trim()
  if (!prenume || !nume) return { ok: false, error: 'Completează numele.' }
  if (!email.includes('@')) return { ok: false, error: 'Email invalid.' }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNastere)) {
    return { ok: false, error: 'Data nașterii e obligatorie.' }
  }
  const dn = new Date(dataNastere + 'T12:00:00')
  if (Number.isNaN(dn.getTime()) || dn > new Date()) {
    return { ok: false, error: 'Data nașterii invalidă.' }
  }

  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false, error: 'Neautentificat.' }

  const admin = createAdminClient()
  const { data: profile } = await admin
    .from('profile')
    .select('rol')
    .eq('id', auth.user.id)
    .maybeSingle()

  if (!profile || (profile.rol !== 'admin' && profile.rol !== 'profesor')) {
    return { ok: false, error: 'Acces interzis.' }
  }

  if (profile.rol === 'profesor') {
    const { data: link } = await admin
      .from('profesor_cursanti')
      .select('cursant_id')
      .eq('profesor_id', auth.user.id)
      .eq('cursant_id', cursantId)
      .maybeSingle()
    if (!link) return { ok: false, error: 'Nu ai acces la acest cursant.' }
  }

  const { error } = await admin
    .from('cursanti')
    .update({
      prenume,
      nume,
      email_parinte: email,
      telefon_parinte: input.telefon_parinte?.trim() || null,
      data_nastere: dataNastere,
      activ: input.activ,
    })
    .eq('id', cursantId)

  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

/**
 * Șterge definitiv un cursant (DOAR admin).
 * - Blocat dacă are plăți înregistrate (se dezactivează în schimb).
 * - Șterge contul elevului; contul părintelui rămâne dacă mai are alți copii.
 */
export async function stergeCursantAction(
  cursantId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isSupabaseAdminConfigured()) return { ok: false, error: 'Supabase Admin neconfigurat.' }
  if (!/^[0-9a-f-]{36}$/i.test(cursantId)) return { ok: false, error: 'ID cursant invalid.' }

  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false, error: 'Neautentificat.' }

  const admin = createAdminClient()
  const { data: me } = await admin.from('profile').select('rol').eq('id', auth.user.id).maybeSingle()
  if (me?.rol !== 'admin') return { ok: false, error: 'Doar adminul poate șterge cursanți.' }

  const { count: nrPlati } = await admin
    .from('plati')
    .select('id', { count: 'exact', head: true })
    .eq('cursant_id', cursantId)
  if ((nrPlati ?? 0) > 0) {
    return {
      ok: false,
      error: `Cursantul are ${nrPlati} plăți înregistrate și nu poate fi șters. Dezactivează-l (debifează „Cursant activ”).`,
    }
  }

  const { data: cursant } = await admin
    .from('cursanti')
    .select('id, email_parinte')
    .eq('id', cursantId)
    .maybeSingle()
  if (!cursant) return { ok: false, error: 'Cursantul nu a fost găsit.' }

  // Conturi legate: elevul (profile.cursant_id) și părinții (parinte_cursanti)
  const { data: elevi } = await admin
    .from('profile')
    .select('id')
    .eq('cursant_id', cursantId)
    .eq('rol', 'elev')
  const { data: linkuri } = await admin
    .from('parinte_cursanti')
    .select('parinte_id')
    .eq('cursant_id', cursantId)

  const { error: delErr } = await admin.from('cursanti').delete().eq('id', cursantId)
  if (delErr) return { ok: false, error: delErr.message }

  for (const e of elevi ?? []) {
    await admin.from('profile').delete().eq('id', e.id)
    await admin.auth.admin.deleteUser(e.id)
  }

  // Părinte fără alți copii: ștergem și contul lui
  for (const l of linkuri ?? []) {
    const { count } = await admin
      .from('parinte_cursanti')
      .select('cursant_id', { count: 'exact', head: true })
      .eq('parinte_id', l.parinte_id)
    if ((count ?? 0) === 0) {
      await admin.from('profile').delete().eq('id', l.parinte_id).eq('rol', 'parinte')
      await admin.auth.admin.deleteUser(l.parinte_id)
    }
  }

  return { ok: true }
}

export async function setProfesoriCursantAction(
  cursantId: string,
  profesorIds: string[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isSupabaseAdminConfigured()) {
    return { ok: false, error: 'Supabase Admin neconfigurat.' }
  }
  if (!/^[0-9a-f-]{36}$/i.test(cursantId)) {
    return { ok: false, error: 'Cursant demo (u1…) — adaugă un cursant real din Adaugă cursant.' }
  }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false, error: 'Neautentificat.' }

  const admin = createAdminClient()
  const { data: me } = await admin.from('profile').select('rol').eq('id', auth.user.id).maybeSingle()
  if (me?.rol !== 'admin') return { ok: false, error: 'Doar adminul poate asigna profesori.' }

  await admin.from('profesor_cursanti').delete().eq('cursant_id', cursantId)
  const rows = profesorIds.filter(Boolean).map(profesor_id => ({
    profesor_id,
    cursant_id: cursantId,
  }))
  if (rows.length) {
    const { error } = await admin.from('profesor_cursanti').insert(rows)
    if (error) return { ok: false, error: error.message }
  }
  return { ok: true }
}

export async function getProfesoriCursantAction(
  cursantId: string,
): Promise<{ ok: true; profesor_ids: string[] } | { ok: false; error: string; profesor_ids: [] }> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'unconfigured', profesor_ids: [] }
  }
  if (!/^[0-9a-f-]{36}$/i.test(cursantId)) {
    return { ok: false, error: 'Cursant demo — folosește Adaugă cursant.', profesor_ids: [] }
  }
  const admin = isSupabaseAdminConfigured() ? createAdminClient() : await createClient()
  const { data, error } = await admin
    .from('profesor_cursanti')
    .select('profesor_id')
    .eq('cursant_id', cursantId)
  if (error) return { ok: false, error: error.message, profesor_ids: [] }
  return { ok: true, profesor_ids: (data ?? []).map(r => r.profesor_id) }
}

export type CopilParinte = {
  id: string
  nume: string
  prenume: string
  email_parinte: string
  telefon_parinte: string | null
  activ: boolean
}

/** Copiii legați de contul părinte logat (`parinte_cursanti`). */
export async function listCopiiParinteAction(): Promise<
  | { ok: true; data: CopilParinte[]; cursant_ids: string[] }
  | { ok: false; error: string; data: []; cursant_ids: [] }
> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'unconfigured', data: [], cursant_ids: [] }
  }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) {
    return { ok: false, error: 'Neautentificat', data: [], cursant_ids: [] }
  }

  const admin = isSupabaseAdminConfigured() ? createAdminClient() : null
  const client = admin ?? supabase

  const { data: profile } = await client
    .from('profile')
    .select('rol')
    .eq('id', auth.user.id)
    .maybeSingle()
  if (!profile || profile.rol !== 'parinte') {
    return { ok: false, error: 'Acces interzis', data: [], cursant_ids: [] }
  }

  const { data: links, error: linkErr } = await client
    .from('parinte_cursanti')
    .select('cursant_id')
    .eq('parinte_id', auth.user.id)
  if (linkErr) {
    return { ok: false, error: linkErr.message, data: [], cursant_ids: [] }
  }

  const ids = (links ?? []).map(l => l.cursant_id)
  if (ids.length === 0) return { ok: true, data: [], cursant_ids: [] }

  const { data, error } = await client
    .from('cursanti')
    .select('id, nume, prenume, email_parinte, telefon_parinte, activ')
    .in('id', ids)
    .order('prenume', { ascending: true })
  if (error) return { ok: false, error: error.message, data: [], cursant_ids: [] }

  return {
    ok: true,
    data: (data ?? []).map(c => ({
      id: c.id,
      nume: c.nume,
      prenume: c.prenume,
      email_parinte: c.email_parinte,
      telefon_parinte: c.telefon_parinte,
      activ: c.activ,
    })),
    cursant_ids: ids,
  }
}
