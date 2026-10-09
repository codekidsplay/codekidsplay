'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/env'

export type StatusCerere = 'noua' | 'contactata' | 'inscris' | 'refuzata'
const STATUSURI: StatusCerere[] = ['noua', 'contactata', 'inscris', 'refuzata']

export type CerereContact = {
  id: string
  nume: string
  email: string
  telefon: string
  mesaj: string
  termeni_versiune: string
  status: StatusCerere
  created_at: string
}

async function requireAdmin(): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isSupabaseConfigured() || !isSupabaseAdminConfigured()) {
    return { ok: false, error: 'Supabase nu e configurat complet.' }
  }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false, error: 'Trebuie să fii autentificat.' }
  const { data: profil } = await createAdminClient()
    .from('profile')
    .select('rol')
    .eq('id', auth.user.id)
    .maybeSingle()
  if (profil?.rol !== 'admin') return { ok: false, error: 'Doar adminul vede cererile.' }
  return { ok: true }
}

export async function listCereriAction(): Promise<
  { ok: true; data: CerereContact[] } | { ok: false; error: string }
> {
  const gate = await requireAdmin()
  if (!gate.ok) return gate
  const { data, error } = await createAdminClient()
    .from('cereri_contact')
    .select('id, nume, email, telefon, mesaj, termeni_versiune, status, created_at')
    .order('created_at', { ascending: false })
    .limit(500)
  if (error) {
    const lipsa = /status|cereri_contact/i.test(error.message)
    return {
      ok: false,
      error: lipsa
        ? 'Tabelul sau coloana „status” lipsește — rulează migrările pentru cereri_contact.'
        : error.message,
    }
  }
  return { ok: true, data: (data ?? []) as CerereContact[] }
}

export async function setStatusCerereAction(
  id: string,
  status: StatusCerere,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return gate
  if (!/^[0-9a-f-]{36}$/i.test(id) || !STATUSURI.includes(status)) {
    return { ok: false, error: 'Date invalide.' }
  }
  const { error } = await createAdminClient()
    .from('cereri_contact')
    .update({ status })
    .eq('id', id)
  return error ? { ok: false, error: error.message } : { ok: true }
}

export async function stergeCerereAction(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return gate
  if (!/^[0-9a-f-]{36}$/i.test(id)) return { ok: false, error: 'ID invalid.' }
  const { error } = await createAdminClient().from('cereri_contact').delete().eq('id', id)
  return error ? { ok: false, error: error.message } : { ok: true }
}
