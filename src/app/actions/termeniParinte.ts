'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isSupabaseConfigured, isSupabaseAdminConfigured } from '@/lib/supabase/env'
import { TERMENI_VERSIUNE } from '@/lib/termeni'

/**
 * Părintele trebuie să accepte Termenii la prima autentificare (și la fiecare versiune nouă).
 * Dacă migrarea nu e rulată (coloane lipsă), NU blocăm accesul.
 */
export async function termeniParinteStatusAction(): Promise<{ trebuieAcceptat: boolean }> {
  if (!isSupabaseConfigured()) return { trebuieAcceptat: false }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { trebuieAcceptat: false }

  const client = isSupabaseAdminConfigured() ? createAdminClient() : supabase
  const { data, error } = await client
    .from('profile')
    .select('rol, termeni_versiune')
    .eq('id', auth.user.id)
    .maybeSingle()

  if (error || !data) return { trebuieAcceptat: false }
  if (data.rol !== 'parinte') return { trebuieAcceptat: false }
  return { trebuieAcceptat: data.termeni_versiune !== TERMENI_VERSIUNE }
}

export async function accepteazaTermeniParinteAction(): Promise<
  { ok: true } | { ok: false; error: string }
> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Supabase neconfigurat.' }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false, error: 'Neautentificat.' }

  const client = isSupabaseAdminConfigured() ? createAdminClient() : supabase
  const { data: profil } = await client
    .from('profile')
    .select('rol')
    .eq('id', auth.user.id)
    .maybeSingle()
  if (!profil || profil.rol !== 'parinte') return { ok: false, error: 'Acces interzis.' }

  const { error } = await client
    .from('profile')
    .update({
      termeni_acceptati_la: new Date().toISOString(),
      termeni_versiune: TERMENI_VERSIUNE,
    })
    .eq('id', auth.user.id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
