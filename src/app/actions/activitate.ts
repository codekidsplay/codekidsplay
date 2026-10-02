'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/env'

export type EvenimentActivitate = {
  tip: 'copil' | 'plata' | 'incarcare' | 'sedinta'
  data: string // ISO (YYYY-MM-DD sau timestamp)
  cursant: string
  detalii: string
  suma?: number
}

export type RezumatProfesor = {
  profesor_id: string
  nume: string
  email: string
  copii_asignati: number
  copii_inregistrati: number
  incasat: number
  nr_plati: number
  sedinte_incarcate: number
  sedinte_efectuate: number
}

type Rez<T> = ({ ok: true } & T) | { ok: false; error: string }

async function verificaAdmin() {
  if (!isSupabaseConfigured() || !isSupabaseAdminConfigured()) {
    return { ok: false as const, error: 'Supabase nu e configurat complet.' }
  }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false as const, error: 'Neautentificat.' }
  const admin = createAdminClient()
  const { data: p } = await admin.from('profile').select('rol').eq('id', auth.user.id).maybeSingle()
  if (p?.rol !== 'admin') return { ok: false as const, error: 'Doar adminul are acces.' }
  return { ok: true as const, admin }
}

function interval(luna: number, an: number) {
  const pad = (n: number) => String(n).padStart(2, '0')
  const start = `${an}-${pad(luna + 1)}-01`
  const next = luna === 11 ? { l: 1, a: an + 1 } : { l: luna + 2, a: an }
  const end = `${next.a}-${pad(next.l)}-01`
  return { start, end }
}

type Admin = ReturnType<typeof createAdminClient>

/** Datele unui profesor pentru o lună. `creat_de` pe cursanti poate lipsi dacă migrarea nu e rulată. */
async function colecteaza(admin: Admin, profesorId: string, luna: number, an: number) {
  const { start, end } = interval(luna, an)

  const [{ data: links }, plati, sedinte, copii] = await Promise.all([
    admin.from('profesor_cursanti').select('cursant_id').eq('profesor_id', profesorId),
    admin
      .from('plati')
      .select('id, cursant_id, abonament_id, suma, data_plata, metoda, nota')
      .eq('creat_de', profesorId)
      .gte('data_plata', start)
      .lt('data_plata', end)
      .order('data_plata', { ascending: false }),
    admin
      .from('sedinte')
      .select('id, cursant_id, data, consuma_sedinta, lectie_id')
      .eq('creat_de', profesorId)
      .gte('data', start)
      .lt('data', end)
      .order('data', { ascending: false }),
    admin
      .from('cursanti')
      .select('id, prenume, nume, created_at')
      .eq('creat_de', profesorId)
      .gte('created_at', start)
      .lt('created_at', end),
  ])

  const migrareLipsa = !!copii.error
  const platiRows = plati.data ?? []
  const sedinteRows = sedinte.data ?? []
  const copiiRows = copii.error ? [] : (copii.data ?? [])

  const aboIds = platiRows.map(p => p.abonament_id).filter(Boolean) as string[]
  const { data: abo } = aboIds.length
    ? await admin.from('abonamente').select('id, sedinte_incluse, tip').in('id', aboIds)
    : { data: [] as Array<{ id: string; sedinte_incluse: number; tip: string }> }
  const aboById = new Map((abo ?? []).map(a => [a.id, a]))

  const cursantIds = Array.from(
    new Set([...platiRows.map(p => p.cursant_id), ...sedinteRows.map(s => s.cursant_id)]),
  )
  const { data: cursNume } = cursantIds.length
    ? await admin.from('cursanti').select('id, prenume, nume').in('id', cursantIds)
    : { data: [] as Array<{ id: string; prenume: string; nume: string }> }
  const numeById = new Map((cursNume ?? []).map(c => [c.id, `${c.prenume} ${c.nume}`]))

  return {
    asignati: (links ?? []).length,
    platiRows,
    sedinteRows,
    copiiRows,
    aboById,
    numeById,
    migrareLipsa,
  }
}

export async function rezumatProfesoriAction(
  luna: number,
  an: number,
): Promise<Rez<{ data: RezumatProfesor[]; migrareLipsa: boolean }>> {
  const g = await verificaAdmin()
  if (!g.ok) return g
  const { admin } = g

  const { data: profs } = await admin
    .from('profile')
    .select('id, nume_afisat')
    .eq('rol', 'profesor')
    .order('created_at', { ascending: true })
  const { data: listed } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const emailById = new Map((listed?.users ?? []).map(u => [u.id, u.email ?? '']))

  let migrareLipsa = false
  const data: RezumatProfesor[] = []
  for (const p of profs ?? []) {
    const c = await colecteaza(admin, p.id, luna, an)
    if (c.migrareLipsa) migrareLipsa = true
    data.push({
      profesor_id: p.id,
      nume: p.nume_afisat || emailById.get(p.id) || '—',
      email: emailById.get(p.id) ?? '',
      copii_asignati: c.asignati,
      copii_inregistrati: c.copiiRows.length,
      incasat: c.platiRows.reduce((s, x) => s + Number(x.suma), 0),
      nr_plati: c.platiRows.length,
      sedinte_incarcate: c.platiRows.reduce(
        (s, x) => s + (c.aboById.get(x.abonament_id ?? '')?.sedinte_incluse ?? 0),
        0,
      ),
      sedinte_efectuate: c.sedinteRows.filter(s => s.consuma_sedinta).length,
    })
  }
  return { ok: true, data, migrareLipsa }
}

export async function activitateProfesorAction(
  profesorId: string,
  luna: number,
  an: number,
): Promise<
  Rez<{ profesor: RezumatProfesor; evenimente: EvenimentActivitate[]; migrareLipsa: boolean }>
> {
  const g = await verificaAdmin()
  if (!g.ok) return g
  if (!/^[0-9a-f-]{36}$/i.test(profesorId)) return { ok: false, error: 'ID invalid.' }
  const { admin } = g

  const { data: p } = await admin
    .from('profile')
    .select('id, nume_afisat, rol')
    .eq('id', profesorId)
    .maybeSingle()
  if (!p || p.rol !== 'profesor') return { ok: false, error: 'Profesorul nu a fost găsit.' }
  const { data: u } = await admin.auth.admin.getUserById(profesorId)

  const c = await colecteaza(admin, profesorId, luna, an)

  const evenimente: EvenimentActivitate[] = [
    ...c.copiiRows.map(x => ({
      tip: 'copil' as const,
      data: x.created_at,
      cursant: `${x.prenume} ${x.nume}`,
      detalii: 'Cursant înregistrat',
    })),
    ...c.platiRows.flatMap(x => {
      const abo = c.aboById.get(x.abonament_id ?? '')
      const cursant = c.numeById.get(x.cursant_id) ?? '—'
      const ev: EvenimentActivitate[] = [
        {
          tip: 'plata',
          data: x.data_plata,
          cursant,
          detalii: `Încasare ${x.metoda}${x.nota ? ` · ${x.nota}` : ''}`,
          suma: Number(x.suma),
        },
      ]
      if (abo) {
        ev.push({
          tip: 'incarcare',
          data: x.data_plata,
          cursant,
          detalii: `${abo.sedinte_incluse} ședințe încărcate (${abo.tip === 'lunar' ? 'lunar' : 'pachet'})`,
        })
      }
      return ev
    }),
    ...c.sedinteRows.map(x => ({
      tip: 'sedinta' as const,
      data: x.data,
      cursant: c.numeById.get(x.cursant_id) ?? '—',
      detalii: x.consuma_sedinta ? 'Ședință efectuată (consumată)' : 'Ședință înregistrată',
    })),
  ].sort((a, b) => b.data.localeCompare(a.data))

  return {
    ok: true,
    migrareLipsa: c.migrareLipsa,
    evenimente,
    profesor: {
      profesor_id: profesorId,
      nume: p.nume_afisat || u.user?.email || '—',
      email: u.user?.email ?? '',
      copii_asignati: c.asignati,
      copii_inregistrati: c.copiiRows.length,
      incasat: c.platiRows.reduce((s, x) => s + Number(x.suma), 0),
      nr_plati: c.platiRows.length,
      sedinte_incarcate: c.platiRows.reduce(
        (s, x) => s + (c.aboById.get(x.abonament_id ?? '')?.sedinte_incluse ?? 0),
        0,
      ),
      sedinte_efectuate: c.sedinteRows.filter(s => s.consuma_sedinta).length,
    },
  }
}
