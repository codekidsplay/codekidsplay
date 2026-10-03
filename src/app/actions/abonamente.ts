'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/env'
import { module as moduleCurriculum } from '@/lib/mockData'
import { dataSfarsitAcces, esteActiv, pretAutodidact } from '@/lib/autodidact'

/**
 * Admin: acces la toți cursanții.
 * Profesor: doar la cursanții asignați lui (profesor_cursanti).
 * `cursantIds === null` înseamnă fără restricție (admin).
 */
async function verificaAcces() {
  if (!isSupabaseAdminConfigured()) return { ok: false as const, error: 'Supabase Admin neconfigurat.' }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false as const, error: 'Neautentificat.' }
  const admin = createAdminClient()
  const { data: profile } = await admin.from('profile').select('rol').eq('id', auth.user.id).maybeSingle()
  if (profile?.rol === 'admin') {
    return { ok: true as const, admin, userId: auth.user.id, rol: 'admin' as const, cursantIds: null as string[] | null }
  }
  if (profile?.rol === 'profesor') {
    const { data: links } = await admin
      .from('profesor_cursanti')
      .select('cursant_id')
      .eq('profesor_id', auth.user.id)
    const cursantIds = (links ?? []).map(l => l.cursant_id as string)
    return { ok: true as const, admin, userId: auth.user.id, rol: 'profesor' as const, cursantIds }
  }
  return { ok: false as const, error: 'Acces interzis.' }
}

/** Profesorul poate lucra doar cu cursanții asignați lui. */
function poateCursant(acces: { cursantIds: string[] | null }, cursantId: string): boolean {
  return acces.cursantIds === null || acces.cursantIds.includes(cursantId)
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
  sedinte: Array<{
    id: string
    cursant_id: string
    abonament_id: string | null
    prezent: boolean
    consuma_sedinta: boolean
  }>
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
  const acces = await verificaAcces()
  if (!acces.ok) return acces
  const { admin, cursantIds } = acces

  // Profesor fără cursanți asignați: nimic de afișat
  if (cursantIds !== null && cursantIds.length === 0) {
    return { ok: true, data: { cursanti: [], abonamente: [], sedinte: [], plati: [] } }
  }

  const filtru = <T extends { in: (col: string, vals: string[]) => T }>(q: T, col: string): T =>
    cursantIds === null ? q : q.in(col, cursantIds)

  const [{ data: cursanti }, { data: abonamente }, { data: sedinte }, { data: plati }] =
    await Promise.all([
      filtru(
        admin.from('cursanti').select('id, nume, prenume, email_parinte, activ'),
        'id',
      ).order('created_at', { ascending: false }),
      filtru(
        admin.from('abonamente').select('id, cursant_id, tip, sedinte_incluse, pret, data_start, activ'),
        'cursant_id',
      ),
      filtru(
        admin.from('sedinte').select('id, cursant_id, abonament_id, prezent, consuma_sedinta'),
        'cursant_id',
      ),
      filtru(
        admin.from('plati').select('id, cursant_id, abonament_id, suma, data_plata, metoda, nota'),
        'cursant_id',
      ).order('data_plata', { ascending: false }),
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
    abonament_id: string | null
    data: string
    prezent: boolean
    consuma_sedinta: boolean
    nota: string | null
  }>
  plati: AbonamenteDate['plati']
}

export async function getDetaliiCursantAbonamentAction(
  cursantId: string,
): Promise<{ ok: true; data: DetaliiCursantAbonament } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Supabase nu e configurat.' }
  if (!/^[0-9a-f-]{36}$/i.test(cursantId)) return { ok: false, error: 'ID cursant invalid.' }
  const acces = await verificaAcces()
  if (!acces.ok) return acces
  if (!poateCursant(acces, cursantId)) return { ok: false, error: 'Nu ai acces la acest cursant.' }
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
        .select('id, cursant_id, abonament_id, data, prezent, consuma_sedinta, nota')
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

/**
 * Înregistrează o plată și un pachet nou de ședințe.
 * Ședințele se ADAUGĂ la soldul cursantului (nu înlocuiesc restul vechi):
 *   sold nou = sold vechi + ședințe plătite  (ex. 2+4=6, sau −2+4=2).
 * Abonamentul vechi e dezactivat doar ca „pachet curent”; consumurile rămân în istoric.
 */
export async function inregistreazaPlataAction(
  input: InregistreazaPlataInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const acces = await verificaAcces()
  if (!acces.ok) return acces
  const { admin } = acces

  if (!/^[0-9a-f-]{36}$/i.test(input.cursant_id)) return { ok: false, error: 'Cursant invalid.' }
  if (!poateCursant(acces, input.cursant_id)) {
    return { ok: false, error: 'Nu ai acces la acest cursant.' }
  }
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

// ─── Abonament Autodidact (1 modul, 30 de zile, fără ședințe) ─────────────────

export type AutodidactAcces = {
  id: string
  modul_id: string
  curs_id: string
  pret: number
  data_start: string
  data_sfarsit: string
}

const DATA_ISO = /^\d{4}-\d{2}-\d{2}$/

async function accesuriAutodidact(
  admin: ReturnType<typeof createAdminClient>,
  cursantId: string,
): Promise<AutodidactAcces[]> {
  const { data, error } = await admin
    .from('acces_autodidact')
    .select('id, modul_id, curs_id, pret, data_start, data_sfarsit')
    .eq('cursant_id', cursantId)
    .order('data_sfarsit', { ascending: false })
  if (error) return [] // tabel inexistent (migrare nerulată) → fără accesuri
  return (data ?? []).map(r => ({ ...r, pret: Number(r.pret) }))
}

export type AutodidactCursant = {
  accesuri: AutodidactAcces[]
  /** Prețul propus pentru următorul modul, azi. */
  pretUrmator: { pret: number; motiv: string }
}

export async function listAutodidactCursantAction(
  cursantId: string,
): Promise<{ ok: true; data: AutodidactCursant } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Supabase nu e configurat.' }
  if (!/^[0-9a-f-]{36}$/i.test(cursantId)) return { ok: false, error: 'ID cursant invalid.' }
  const acces = await verificaAcces()
  if (!acces.ok) return acces
  if (!poateCursant(acces, cursantId)) return { ok: false, error: 'Nu ai acces la acest cursant.' }

  const accesuri = await accesuriAutodidact(acces.admin, cursantId)
  const azi = new Date().toISOString().slice(0, 10)
  const { pret, motiv } = pretAutodidact(accesuri, azi)
  return { ok: true, data: { accesuri, pretUrmator: { pret, motiv } } }
}

/** Prețul propus pentru o dată de plată (formularul îl recalculează când se schimbă data). */
export async function pretAutodidactAction(
  cursantId: string,
  dataPlata: string,
): Promise<{ ok: true; pret: number; motiv: string } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Supabase nu e configurat.' }
  if (!/^[0-9a-f-]{36}$/i.test(cursantId)) return { ok: false, error: 'ID cursant invalid.' }
  if (!DATA_ISO.test(dataPlata)) return { ok: false, error: 'Dată invalidă.' }
  const acces = await verificaAcces()
  if (!acces.ok) return acces
  if (!poateCursant(acces, cursantId)) return { ok: false, error: 'Nu ai acces la acest cursant.' }

  const accesuri = await accesuriAutodidact(acces.admin, cursantId)
  const { pret, motiv } = pretAutodidact(accesuri, dataPlata)
  return { ok: true, pret, motiv }
}

export type InregistreazaAutodidactInput = {
  cursant_id: string
  modul_id: string
  /** Suma încasată; implicit prețul calculat (200 / 150 / 100). */
  suma?: number
  data_plata: string
  metoda: 'cash' | 'transfer' | 'card'
  nota?: string | null
}

/**
 * Înregistrează plata și deschide TOATE lecțiile modulului pentru 30 de zile.
 * Nu modifică soldul de ședințe.
 */
export async function inregistreazaAutodidactAction(
  input: InregistreazaAutodidactInput,
): Promise<{ ok: true; pret: number; data_sfarsit: string } | { ok: false; error: string }> {
  const acces = await verificaAcces()
  if (!acces.ok) return acces
  const { admin } = acces

  if (!/^[0-9a-f-]{36}$/i.test(input.cursant_id)) return { ok: false, error: 'Cursant invalid.' }
  if (!poateCursant(acces, input.cursant_id)) return { ok: false, error: 'Nu ai acces la acest cursant.' }
  if (!DATA_ISO.test(input.data_plata)) return { ok: false, error: 'Dată invalidă.' }
  if (!['cash', 'transfer', 'card'].includes(input.metoda)) return { ok: false, error: 'Metodă invalidă.' }

  const modul = moduleCurriculum.find(m => m.id === input.modul_id)
  if (!modul) return { ok: false, error: 'Modul necunoscut.' }

  const accesuri = await accesuriAutodidact(admin, input.cursant_id)
  const dataStart = input.data_plata

  if (accesuri.some(a => a.modul_id === modul.id && esteActiv(a, dataStart))) {
    return { ok: false, error: 'Cursantul are deja acces activ la acest modul.' }
  }

  const calculat = pretAutodidact(accesuri, dataStart).pret
  const suma = input.suma ?? calculat
  if (!(suma > 0)) return { ok: false, error: 'Sumă invalidă.' }

  const dataSfarsit = dataSfarsitAcces(dataStart)
  const nota = [`Autodidact · ${modul.nume}`, input.nota?.trim()].filter(Boolean).join(' · ')

  const { data: plata, error: plataErr } = await admin
    .from('plati')
    .insert({
      cursant_id: input.cursant_id,
      abonament_id: null,
      suma,
      data_plata: dataStart,
      metoda: input.metoda,
      nota,
      creat_de: acces.userId,
    })
    .select('id')
    .single()
  if (plataErr || !plata) return { ok: false, error: plataErr?.message ?? 'Nu am putut salva plata.' }

  const { error: accesErr } = await admin.from('acces_autodidact').insert({
    cursant_id: input.cursant_id,
    modul_id: modul.id,
    curs_id: modul.curs_id,
    pret: suma,
    data_start: dataStart,
    data_sfarsit: dataSfarsit,
    plata_id: plata.id,
    creat_de: acces.userId,
  })
  if (accesErr) {
    await admin.from('plati').delete().eq('id', plata.id) // nu lăsăm plată fără acces
    return {
      ok: false,
      error: /acces_autodidact/.test(accesErr.message)
        ? 'Tabelul acces_autodidact lipsește — rulează migrarea SQL în Supabase.'
        : accesErr.message,
    }
  }

  return { ok: true, pret: suma, data_sfarsit: dataSfarsit }
}
