'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/env'

async function verificaAdmin() {
  if (!isSupabaseAdminConfigured()) return { ok: false as const, error: 'Supabase Admin neconfigurat.' }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false as const, error: 'Neautentificat.' }
  const admin = createAdminClient()
  const { data: profile } = await admin.from('profile').select('rol').eq('id', auth.user.id).maybeSingle()
  if (profile?.rol !== 'admin') return { ok: false as const, error: 'Doar adminul are acces la zona financiară.' }
  return { ok: true as const, admin, userId: auth.user.id }
}

export type AbonamenteDate = {
  cursanti: Array<{
    id: string
    nume: string
    prenume: string
    email_parinte: string
    activ: boolean
  }>
  abonamente: Array<{
    id: string
    cursant_id: string
    tip: 'lunar' | 'pachet'
    sedinte_incluse: number
    pret: number
    data_start: string
    activ: boolean
  }>
  sedinte: Array<{ id: string; cursant_id: string; abonament_id: string; prezent: boolean }>
  plati: Array<{
    id: string
    cursant_id: string
    abonament_id: string | null
    suma: number
    data_plata: string
    metoda: 'cash' | 'transfer' | 'card'
    nota: string | null
  }>
}

export async function listAbonamenteAction(): Promise<
  { ok: true; data: AbonamenteDate } | { ok: false; error: string }
> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Supabase nu e configurat.' }
  const acces = await verificaAdmin()
  if (!acces.ok) return acces
  const { admin } = acces

  const [{ data: cursanti }, { data: abonamente }, { data: sedinte }, { data: plati }] =
    await Promise.all([
      admin.from('cursanti').select('id, nume, prenume, email_parinte, activ').order('created_at', { ascending: false }),
      admin.from('abonamente').select('id, cursant_id, tip, sedinte_incluse, pret, data_start, activ'),
      admin.from('sedinte').select('id, cursant_id, abonament_id, prezent'),
      admin.from('plati').select('id, cursant_id, abonament_id, suma, data_plata, metoda, nota').order('data_plata', { ascending: false }),
    ])

  return {
    ok: true,
    data: {
      cursanti: cursanti ?? [],
      abonamente: abonamente ?? [],
      sedinte: sedinte ?? [],
      plati: plati ?? [],
    },
  }
}

export type DetaliiCursantAbonament = {
  cursant: { id: string; nume: string; prenume: string; email_parinte: string } | null
  abonamente: AbonamenteDate['abonamente']
  sedinte: Array<{
    id: string
    cursant_id: string
    abonament_id: string
    data: string
    prezent: boolean
    nota: string | null
  }>
  plati: AbonamenteDate['plati']
}

export async function getDetaliiCursantAbonamentAction(
  cursantId: string,
): Promise<{ ok: true; data: DetaliiCursantAbonament } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Supabase nu e configurat.' }
  if (!/^[0-9a-f-]{36}$/i.test(cursantId)) return { ok: false, error: 'ID cursant invalid.' }
  const acces = await verificaAdmin()
  if (!acces.ok) return acces
  const { admin } = acces

  const [{ data: cursant }, { data: abonamente }, { data: sedinte }, { data: plati }] =
    await Promise.all([
      admin.from('cursanti').select('id, nume, prenume, email_parinte').eq('id', cursantId).maybeSingle(),
      admin
        .from('abonamente')
        .select('id, cursant_id, tip, sedinte_incluse, pret, data_start, activ')
        .eq('cursant_id', cursantId),
      admin
        .from('sedinte')
        .select('id, cursant_id, abonament_id, data, prezent, nota')
        .eq('cursant_id', cursantId)
        .order('data', { ascending: false }),
      admin
        .from('plati')
        .select('id, cursant_id, abonament_id, suma, data_plata, metoda, nota')
        .eq('cursant_id', cursantId)
        .order('data_plata', { ascending: false }),
    ])

  return {
    ok: true,
    data: {
      cursant: cursant ?? null,
      abonamente: abonamente ?? [],
      sedinte: sedinte ?? [],
      plati: plati ?? [],
    },
  }
}

export type InregistreazaPlataInput = {
  cursant_id: string
  suma: number
  data_plata: string
  metoda: 'cash' | 'transfer' | 'card'
  nota?: string | null
  tip_abonament: 'lunar' | 'pachet'
  sedinte_incluse: number
}

/** Înregistrează o plată; dezactivează abonamentul curent și pornește unul nou (reînnoire). */
export async function inregistreazaPlataAction(
  input: InregistreazaPlataInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const acces = await verificaAdmin()
  if (!acces.ok) return acces
  const { admin } = acces

  if (!/^[0-9a-f-]{36}$/i.test(input.cursant_id)) return { ok: false, error: 'Cursant invalid.' }
  if (!(input.suma > 0)) return { ok: false, error: 'Sumă invalidă.' }
  if (!(input.sedinte_incluse > 0)) return { ok: false, error: 'Număr ședințe invalid.' }

  await admin.from('abonamente').update({ activ: false }).eq('cursant_id', input.cursant_id).eq('activ', true)

  const { data: nouAbonament, error: aboErr } = await admin
    .from('abonamente')
    .insert({
      cursant_id: input.cursant_id,
      tip: input.tip_abonament,
      sedinte_incluse: input.sedinte_incluse,
      pret: input.suma,
      data_start: input.data_plata,
      activ: true,
    })
    .select('id')
    .single()

  if (aboErr || !nouAbonament) return { ok: false, error: aboErr?.message ?? 'Nu am putut crea abonamentul.' }

  const { error: plataErr } = await admin.from('plati').insert({
    cursant_id: input.cursant_id,
    abonament_id: nouAbonament.id,
    suma: input.suma,
    data_plata: input.data_plata,
    metoda: input.metoda,
    nota: input.nota?.trim() || null,
    creat_de: acces.userId,
  })

  if (plataErr) return { ok: false, error: plataErr.message }
  return { ok: true }
}
