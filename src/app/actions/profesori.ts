'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/env'

async function requireStaff(): Promise<
  { ok: true; userId: string; rol: string } | { ok: false; error: string }
> {
  if (!isSupabaseConfigured() || !isSupabaseAdminConfigured()) {
    return { ok: false, error: 'Supabase nu e configurat complet.' }
  }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) {
    return { ok: false, error: 'Trebuie să fii autentificat.' }
  }

  const admin = createAdminClient()
  const { data: profile } = await admin
    .from('profile')
    .select('rol')
    .eq('id', auth.user.id)
    .maybeSingle()

  if (!profile || (profile.rol !== 'admin' && profile.rol !== 'profesor')) {
    return { ok: false, error: 'Acces interzis.' }
  }
  return { ok: true, userId: auth.user.id, rol: profile.rol }
}

async function requireAdmin(): Promise<
  { ok: true; userId: string } | { ok: false; error: string }
> {
  const staff = await requireStaff()
  if (!staff.ok) return staff
  if (staff.rol !== 'admin') {
    return { ok: false, error: 'Doar adminul poate gestiona profesorii.' }
  }
  return { ok: true, userId: staff.userId }
}

export type StaffMember = {
  id: string
  email: string
  nume: string
  rol: 'admin' | 'profesor'
}

export async function listStaffAction(): Promise<
  { ok: true; data: StaffMember[] } | { ok: false; error: string; data: [] }
> {
  const gate = await requireStaff()
  if (!gate.ok) return { ok: false, error: gate.error, data: [] }

  const admin = createAdminClient()
  const { data: profiles, error } = await admin
    .from('profile')
    .select('id, rol, nume_afisat')
    .in('rol', ['admin', 'profesor'])
    .order('created_at', { ascending: true })

  if (error) return { ok: false, error: error.message, data: [] }

  const { data: listed } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const byId = new Map((listed?.users ?? []).map(u => [u.id, u]))

  const data: StaffMember[] = (profiles ?? [])
    .filter(p => p.rol === 'admin' || p.rol === 'profesor')
    .map(p => {
      const u = byId.get(p.id)
      const isAdmin = p.rol === 'admin'
      return {
        id: p.id,
        // Nu expunem emailul de login al adminului către profesori
        email: isAdmin ? '' : (u?.email ?? '—'),
        nume: p.nume_afisat || (isAdmin ? 'Admin' : u?.email) || '—',
        rol: p.rol as 'admin' | 'profesor',
      }
    })

  return { ok: true, data }
}

export async function adaugaProfesorAction(input: {
  nume: string
  email: string
  parola: string
}): Promise<{ ok: true; email: string } | { ok: false; error: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return gate

  const nume = input.nume.trim()
  const email = input.email.trim().toLowerCase()
  const parola = input.parola

  if (!nume) return { ok: false, error: 'Numele e obligatoriu.' }
  if (!email.includes('@')) return { ok: false, error: 'Email invalid.' }
  if (parola.length < 8) return { ok: false, error: 'Parola trebuie să aibă minim 8 caractere.' }

  const admin = createAdminClient()

  const { data: listed } = await admin.auth.admin.listUsers({ perPage: 1000 })
  if (listed?.users?.some(u => u.email?.toLowerCase() === email)) {
    return { ok: false, error: 'Există deja un cont cu acest email.' }
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: parola,
    email_confirm: true,
    app_metadata: { rol: 'profesor' },
    user_metadata: { nume },
  })

  if (error || !data.user) {
    return { ok: false, error: error?.message ?? 'Nu am putut crea contul.' }
  }

  const { error: pErr } = await admin.from('profile').insert({
    id: data.user.id,
    rol: 'profesor',
    cursant_id: null,
    nume_afisat: nume,
  })

  if (pErr) {
    await admin.auth.admin.deleteUser(data.user.id)
    return { ok: false, error: pErr.message }
  }

  return { ok: true, email }
}
