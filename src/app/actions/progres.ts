'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { defaultModulPentruCurs } from '@/lib/curriculum'
import { lectii } from '@/lib/mockData'
import { mesajSedinteEpuizate, trimiteEmailSedinteEpuizate } from '@/lib/notificari'

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function isUuid(id: string): boolean {
  return /^[0-9a-f-]{36}$/i.test(id)
}

/** Verifică rolul apelantului + acces la cursant (admin = orice cursant, profesor = doar asignat). */
async function verificaAcces(cursantId: string): Promise<
  | { ok: true; userId: string; client: ReturnType<typeof createAdminClient> }
  | { ok: false; error: string }
> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Supabase nu e configurat.' }
  if (!isUuid(cursantId)) return { ok: false, error: 'ID cursant invalid.' }

  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false, error: 'Neautentificat.' }

  const client = createAdminClient()

  const { data: profile } = await client
    .from('profile')
    .select('rol')
    .eq('id', auth.user.id)
    .maybeSingle()

  if (!profile || (profile.rol !== 'admin' && profile.rol !== 'profesor')) {
    return { ok: false, error: 'Acces interzis.' }
  }

  if (profile.rol === 'profesor') {
    const { data: link } = await client
      .from('profesor_cursanti')
      .select('cursant_id')
      .eq('profesor_id', auth.user.id)
      .eq('cursant_id', cursantId)
      .maybeSingle()
    if (!link) return { ok: false, error: 'Nu ai acces la acest cursant.' }
  }

  return { ok: true, userId: auth.user.id, client }
}

export type ProgresCursantData = {
  inscrieri: Array<{
    id: string
    cursant_id: string
    curs_id: string
    modul_activ_id: string | null
    activ: boolean
  }>
  progres: Array<{
    id: string
    cursant_id: string
    lectie_id: string
    bifat: boolean
    data_bifat: string | null
  }>
  abonament: {
    id: string
    sedinte_incluse: number
    sedinte_ramase: number
  } | null
}

export async function getProgresCursantAction(
  cursantId: string,
): Promise<{ ok: true; data: ProgresCursantData } | { ok: false; error: string }> {
  const acces = await verificaAcces(cursantId)
  if (!acces.ok) return acces
  const { client } = acces

  const [{ data: inscrieri }, { data: progres }, { data: abonament }] = await Promise.all([
    client.from('inscrieri').select('id, cursant_id, curs_id, modul_activ_id, activ').eq('cursant_id', cursantId),
    client.from('progres').select('id, cursant_id, lectie_id, bifat, data_bifat').eq('cursant_id', cursantId),
    client.from('abonamente').select('id, sedinte_incluse').eq('cursant_id', cursantId).eq('activ', true).maybeSingle(),
  ])

  let ab: ProgresCursantData['abonament'] = null
  if (abonament) {
    const { count } = await client
      .from('sedinte')
      .select('id', { count: 'exact', head: true })
      .eq('abonament_id', abonament.id)
      .eq('consuma_sedinta', true)
    ab = {
      id: abonament.id,
      sedinte_incluse: abonament.sedinte_incluse,
      sedinte_ramase: abonament.sedinte_incluse - (count ?? 0),
    }
  }

  return {
    ok: true,
    data: { inscrieri: inscrieri ?? [], progres: progres ?? [], abonament: ab },
  }
}

export async function toggleInscriereCursAction(
  cursantId: string,
  cursId: string,
): Promise<{ ok: true; inscris: boolean } | { ok: false; error: string }> {
  const acces = await verificaAcces(cursantId)
  if (!acces.ok) return acces
  const { client } = acces

  const { data: existing } = await client
    .from('inscrieri')
    .select('id, activ')
    .eq('cursant_id', cursantId)
    .eq('curs_id', cursId)
    .maybeSingle()

  if (existing) {
    const { error } = await client
      .from('inscrieri')
      .update({ activ: !existing.activ })
      .eq('id', existing.id)
    if (error) return { ok: false, error: error.message }
    return { ok: true, inscris: !existing.activ }
  }

  const { error } = await client.from('inscrieri').insert({
    cursant_id: cursantId,
    curs_id: cursId,
    modul_activ_id: defaultModulPentruCurs(cursId),
    activ: true,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true, inscris: true }
}

export async function setModulActivAction(
  cursantId: string,
  inscriereId: string,
  modulId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const acces = await verificaAcces(cursantId)
  if (!acces.ok) return acces
  const { client } = acces

  const { error } = await client
    .from('inscrieri')
    .update({ modul_activ_id: modulId })
    .eq('id', inscriereId)
    .eq('cursant_id', cursantId)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export type BifareResult = {
  ok: boolean
  error?: string
  bifat: boolean
  consumNou: boolean
  sedinteRamase: number | null
  alertaSold: boolean
  emailTrimis: boolean
  whatsappMesaj: string | null
}

/** Bifează / debifează o lecție pentru un cursant real din Supabase (unlock + consum ședință). */
export async function bifareLectieAction(cursantId: string, lectieId: string): Promise<BifareResult> {
  const empty = (extra: Partial<BifareResult> = {}): BifareResult => ({
    ok: false,
    bifat: false,
    consumNou: false,
    sedinteRamase: null,
    alertaSold: false,
    emailTrimis: false,
    whatsappMesaj: null,
    ...extra,
  })

  const acces = await verificaAcces(cursantId)
  if (!acces.ok) return empty({ error: acces.error })
  const { client, userId } = acces

  const lectie = lectii.find(l => l.id === lectieId)
  if (!lectie) return empty({ error: 'Lecție inexistentă.' })

  const { data: cursant } = await client
    .from('cursanti')
    .select('id, prenume, email_parinte')
    .eq('id', cursantId)
    .maybeSingle()
  if (!cursant) return empty({ error: 'Cursant inexistent.' })

  const { data: existing } = await client
    .from('progres')
    .select('id, bifat, sedinta_id, consum_sedinta_aplicat')
    .eq('cursant_id', cursantId)
    .eq('lectie_id', lectieId)
    .maybeSingle()

  const currentlyBifat = existing?.bifat ?? false

  const { data: abonament } = await client
    .from('abonamente')
    .select('id, sedinte_incluse')
    .eq('cursant_id', cursantId)
    .eq('activ', true)
    .maybeSingle()

  const sedinteRamaseFn = async (abonamentId: string, sedinteIncluse: number) => {
    const { count } = await client
      .from('sedinte')
      .select('id', { count: 'exact', head: true })
      .eq('abonament_id', abonamentId)
      .eq('consuma_sedinta', true)
    return sedinteIncluse - (count ?? 0)
  }

  // Debifare: scoate unlock acasă; NU refundăm; păstrăm consum_sedinta_aplicat
  if (currentlyBifat) {
    if (existing) {
      await client.from('progres').update({ bifat: false, data_bifat: null }).eq('id', existing.id)
    }
    const ramase = abonament ? await sedinteRamaseFn(abonament.id, abonament.sedinte_incluse) : null
    return { ok: true, bifat: false, consumNou: false, sedinteRamase: ramase, alertaSold: false, emailTrimis: false, whatsappMesaj: null }
  }

  // Bifare: doar din modulul asociat
  const { data: inscriereOk } = await client
    .from('inscrieri')
    .select('id')
    .eq('cursant_id', cursantId)
    .eq('activ', true)
    .eq('modul_activ_id', lectie.modul_id)
    .maybeSingle()

  if (!inscriereOk) return empty({ error: 'Lecția nu e din modulul asociat cursantului.' })

  let consumNou = false
  let sedintaId: string | null = existing?.sedinta_id ?? null
  let ramase: number | null = null
  let alertaSold = false
  let emailTrimis = false
  let whatsappMesaj: string | null = null

  const dejaConsumat = existing?.consum_sedinta_aplicat === true

  if (abonament) {
    const azi = todayISO()

    if (dejaConsumat) {
      consumNou = false
    } else {
      const { data: existentAzi } = await client
        .from('sedinte')
        .select('id')
        .eq('cursant_id', cursantId)
        .eq('abonament_id', abonament.id)
        .eq('data', azi)
        .eq('consuma_sedinta', true)
        .maybeSingle()

      if (existentAzi) {
        sedintaId = existentAzi.id
        consumNou = false
      } else {
        const { data: noua } = await client
          .from('sedinte')
          .insert({
            cursant_id: cursantId,
            abonament_id: abonament.id,
            data: azi,
            prezent: true,
            consuma_sedinta: true,
            lectie_id: lectieId,
            creat_de: userId,
          })
          .select('id')
          .single()
        sedintaId = noua?.id ?? null
        consumNou = true
      }
    }

    ramase = await sedinteRamaseFn(abonament.id, abonament.sedinte_incluse)
    alertaSold = ramase <= 0

    if (alertaSold && consumNou) {
      whatsappMesaj = mesajSedinteEpuizate(cursant.prenume)
      const startZi = `${azi}T00:00:00`
      const { data: dejaAzi } = await client
        .from('notificari_email')
        .select('id')
        .eq('cursant_id', cursantId)
        .eq('tip', 'sedinte_epuizate')
        .gte('trimis_la', startZi)
        .maybeSingle()
      if (!dejaAzi) {
        await client.from('notificari_email').insert({
          cursant_id: cursantId,
          tip: 'sedinte_epuizate',
          email_catre: cursant.email_parinte,
          sedinte_ramase: ramase,
        })
        await trimiteEmailSedinteEpuizate({
          emailParinte: cursant.email_parinte,
          prenumeCopil: cursant.prenume,
          sedinteRamase: ramase,
        })
        emailTrimis = true
      }
    } else if (alertaSold) {
      whatsappMesaj = mesajSedinteEpuizate(cursant.prenume)
    }
  }

  if (existing) {
    await client
      .from('progres')
      .update({
        bifat: true,
        data_bifat: new Date().toISOString(),
        sedinta_id: sedintaId,
        consum_sedinta_aplicat: true,
        bifat_de: userId,
      })
      .eq('id', existing.id)
  } else {
    await client.from('progres').insert({
      cursant_id: cursantId,
      lectie_id: lectieId,
      bifat: true,
      data_bifat: new Date().toISOString(),
      sedinta_id: sedintaId,
      consum_sedinta_aplicat: true,
      bifat_de: userId,
    })
  }

  return { ok: true, bifat: true, consumNou, sedinteRamase: ramase, alertaSold, emailTrimis, whatsappMesaj }
}
