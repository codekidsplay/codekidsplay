'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { elevAuthEmail, elevAuthPassword, isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/env'
import { genereazaParola, genereazaPin, mesajWhatsAppLogin } from '@/lib/authHelpers'

function isUuid(id: string): boolean {
  return /^[0-9a-f-]{36}$/i.test(id)
}

async function verificaAcces(cursantId: string) {
  if (!isSupabaseAdminConfigured()) return { ok: false as const, error: 'Supabase Admin neconfigurat.' }
  if (!isUuid(cursantId)) return { ok: false as const, error: 'ID cursant invalid.' }

  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false as const, error: 'Neautentificat.' }

  const admin = createAdminClient()
  const { data: profile } = await admin.from('profile').select('rol').eq('id', auth.user.id).maybeSingle()
  if (!profile || (profile.rol !== 'admin' && profile.rol !== 'profesor')) {
    return { ok: false as const, error: 'Acces interzis.' }
  }
  if (profile.rol === 'profesor') {
    const { data: link } = await admin
      .from('profesor_cursanti')
      .select('cursant_id')
      .eq('profesor_id', auth.user.id)
      .eq('cursant_id', cursantId)
      .maybeSingle()
    if (!link) return { ok: false as const, error: 'Nu ai acces la acest cursant.' }
  }
  return { ok: true as const, admin }
}

export type ConturiCursantResult =
  | { ok: true; username: string; email_parinte: string; telefon_parinte: string | null }
  | { ok: false; error: string }

export async function getConturiCursantAction(cursantId: string): Promise<ConturiCursantResult> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Supabase nu e configurat.' }
  const acces = await verificaAcces(cursantId)
  if (!acces.ok) return acces
  const { data, error } = await acces.admin
    .from('cursanti')
    .select('username, email_parinte, telefon_parinte')
    .eq('id', cursantId)
    .maybeSingle()
  if (error || !data) return { ok: false, error: error?.message ?? 'Cursant inexistent.' }
  return {
    ok: true,
    username: data.username,
    email_parinte: data.email_parinte,
    telefon_parinte: data.telefon_parinte,
  }
}

export type ResetPinResult = { ok: true; pin: string; mesaj: string } | { ok: false; error: string }

/** Resetează PIN-ul contului elev (Auth intern) și returnează noul PIN + mesaj WhatsApp. */
export async function resetPinElevAction(cursantId: string): Promise<ResetPinResult> {
  const acces = await verificaAcces(cursantId)
  if (!acces.ok) return acces
  const { admin } = acces

  const { data: cursant, error } = await admin
    .from('cursanti')
    .select('username, prenume, email_parinte')
    .eq('id', cursantId)
    .maybeSingle()
  if (error || !cursant) return { ok: false, error: error?.message ?? 'Cursant inexistent.' }

  const elevEmail = elevAuthEmail(cursant.username)
  const { data: listed } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const elevUser = listed?.users?.find(u => u.email?.toLowerCase() === elevEmail)
  if (!elevUser) return { ok: false, error: 'Contul elevului nu a fost găsit în Auth.' }

  const pin = genereazaPin(4)
  const { error: updErr } = await admin.auth.admin.updateUserById(elevUser.id, {
    password: elevAuthPassword(pin),
  })
  if (updErr) return { ok: false, error: updErr.message }

  const mesaj = mesajWhatsAppLogin({
    prenume: cursant.prenume,
    username: cursant.username,
    pin,
    email_parinte: cursant.email_parinte,
    parola_parinte: '(neschimbată)',
  })
  return { ok: true, pin, mesaj }
}

export type ResetParolaResult = { ok: true; parola: string } | { ok: false; error: string }

/** Resetează parola contului părintelui asociat cursantului. */
export async function resetParolaParinteAction(cursantId: string): Promise<ResetParolaResult> {
  const acces = await verificaAcces(cursantId)
  if (!acces.ok) return acces
  const { admin } = acces

  const { data: cursant, error } = await admin
    .from('cursanti')
    .select('email_parinte')
    .eq('id', cursantId)
    .maybeSingle()
  if (error || !cursant) return { ok: false, error: error?.message ?? 'Cursant inexistent.' }

  const { data: listed } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const parinteUser = listed?.users?.find(
    u => u.email?.toLowerCase() === cursant.email_parinte.toLowerCase(),
  )
  if (!parinteUser) return { ok: false, error: 'Contul părintelui nu a fost găsit în Auth.' }
  const { data: rolP } = await admin.from('profile').select('rol').eq('id', parinteUser.id).maybeSingle()
  if (rolP && rolP.rol !== 'parinte') {
    return { ok: false, error: 'Emailul acesta aparține unui cont de personal – nu poate fi resetat de aici.' }
  }

  const parola = genereazaParola(8)
  const { error: updErr } = await admin.auth.admin.updateUserById(parinteUser.id, { password: parola })
  if (updErr) return { ok: false, error: updErr.message }

  return { ok: true, parola }
}
