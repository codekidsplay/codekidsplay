'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { defaultModulPentruCurs } from '@/lib/curriculum'
import { lectii } from '@/lib/mockData'
import { mesajSedinteEpuizate, trimiteEmailSedinteEpuizate } from '@/lib/notificari'
import { calculeazaSoldCursant } from '@/lib/soldSedinte'

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function isUuid(id: string): boolean {
  return /^[0-9a-f-]{36}$/i.test(id)
}

type AccesOk = { ok: true; userId: string; client: ReturnType<typeof createAdminClient>; rol: string }
type AccesFail = { ok: false; error: string }

/** Acces staff (scriere) sau părinte/elev pe propriul cursant (citire). */
async function verificaAcces(
  cursantId: string,
  mode: 'read' | 'write' = 'write',
): Promise<AccesOk | AccesFail> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Supabase nu e configurat.' }
  if (!isUuid(cursantId)) return { ok: false, error: 'ID cursant invalid.' }

  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { ok: false, error: 'Neautentificat.' }

  const client = createAdminClient()

  const { data: profile } = await client
    .from('profile')
    .select('rol, cursant_id')
    .eq('id', auth.user.id)
    .maybeSingle()

  if (!profile) return { ok: false, error: 'Acces interzis.' }

  if (profile.rol === 'admin') {
    return { ok: true, userId: auth.user.id, client, rol: profile.rol }
  }

  if (profile.rol === 'profesor') {
    const { data: link } = await client
      .from('profesor_cursanti')
      .select('cursant_id')
      .eq('profesor_id', auth.user.id)
      .eq('cursant_id', cursantId)
      .maybeSingle()
    if (!link) return { ok: false, error: 'Nu ai acces la acest cursant.' }
    return { ok: true, userId: auth.user.id, client, rol: profile.rol }
  }

  if (mode === 'read' && profile.rol === 'parinte') {
    const { data: link } = await client
      .from('parinte_cursanti')
      .select('cursant_id')
      .eq('parinte_id', auth.user.id)
      .eq('cursant_id', cursantId)
      .maybeSingle()
    if (!link) return { ok: false, error: 'Nu ai acces la acest cursant.' }
    return { ok: true, userId: auth.user.id, client, rol: profile.rol }
  }

  if (mode === 'read' && profile.rol === 'elev' && profile.cursant_id === cursantId) {
    return { ok: true, userId: auth.user.id, client, rol: profile.rol }
  }

  return { ok: false, error: 'Acces interzis.' }
}

export type ProgresCursantData = {
  cursant: { id: string; prenume: string; nume: string } | null
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
    tip: string
    sedinte_incluse: number
    sedinte_ramase: number
  } | null
  sedinte: Array<{
    id: string
    cursant_id: string
    abonament_id: string | null
    data: string
    prezent: boolean
    consuma_sedinta: boolean
    lectie_id: string | null
    nota: string | null
  }>
}

export async function getProgresCursantAction(
  cursantId: string,
): Promise<{ ok: true; data: ProgresCursantData } | { ok: false; error: string }> {
  const acces = await verificaAcces(cursantId, 'read')
  if (!acces.ok) return acces
  const { client } = acces

  const [{ data: cursant }, { data: inscrieri }, { data: progres }, { data: abonamente }, { data: sedinte }] =
    await Promise.all([
      client.from('cursanti').select('id, prenume, nume').eq('id', cursantId).maybeSingle(),
      client.from('inscrieri').select('id, cursant_id, curs_id, modul_activ_id, activ').eq('cursant_id', cursantId),
      client.from('progres').select('id, cursant_id, lectie_id, bifat, data_bifat').eq('cursant_id', cursantId),
      client
        .from('abonamente')
        .select('id, tip, sedinte_incluse, activ, cursant_id')
        .eq('cursant_id', cursantId),
      client
        .from('sedinte')
        .select('id, cursant_id, abonament_id, data, prezent, consuma_sedinta, lectie_id, nota')
        .eq('cursant_id', cursantId)
        .order('data', { ascending: false }),
    ])

  let ab: ProgresCursantData['abonament'] = null
  const aboActiv = (abonamente ?? []).find(a => a.activ) ?? null
  const areConsum = (sedinte ?? []).some(s => s.consuma_sedinta)
  if ((abonamente ?? []).length > 0 || areConsum) {
    const sold = calculeazaSoldCursant(cursantId, abonamente ?? [], sedinte ?? [])
    const oarecare = (abonamente ?? [])[0]
    ab = {
      id: aboActiv?.id ?? oarecare?.id ?? '',
      tip: aboActiv?.tip ?? oarecare?.tip ?? 'lunar',
      sedinte_incluse: sold.sedintePlate,
      sedinte_ramase: sold.sold,
    }
  }

  return {
    ok: true,
    data: {
      cursant: cursant ?? null,
      inscrieri: inscrieri ?? [],
      progres: progres ?? [],
      abonament: ab,
      sedinte: sedinte ?? [],
    },
  }
}

export async function toggleInscriereCursAction(
  cursantId: string,
  cursId: string,
): Promise<{ ok: true; inscris: boolean } | { ok: false; error: string }> {
  const acces = await verificaAcces(cursantId, 'write')
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
  const acces = await verificaAcces(cursantId, 'write')
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

  const acces = await verificaAcces(cursantId, 'write')
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

  const soldCursantFn = async (): Promise<number | null> => {
    const [{ data: toateAbo }, { data: toateSedinte }] = await Promise.all([
      client
        .from('abonamente')
        .select('id, cursant_id, sedinte_incluse, activ')
        .eq('cursant_id', cursantId),
      client
        .from('sedinte')
        .select('cursant_id, abonament_id, consuma_sedinta')
        .eq('cursant_id', cursantId)
        .eq('consuma_sedinta', true),
    ])
    if (!(toateAbo ?? []).length && !(toateSedinte ?? []).length) return null
    return calculeazaSoldCursant(cursantId, toateAbo ?? [], toateSedinte ?? []).sold
  }

  if (currentlyBifat) {
    if (existing) {
      await client.from('progres').update({ bifat: false, data_bifat: null }).eq('id', existing.id)
    }
    return {
      ok: true,
      bifat: false,
      consumNou: false,
      sedinteRamase: await soldCursantFn(),
      alertaSold: false,
      emailTrimis: false,
      whatsappMesaj: null,
    }
  }

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

  {
    const azi = todayISO()

    if (dejaConsumat) {
      consumNou = false
    } else {
      // Max 1 consum / cursant / zi (indiferent de abonament)
      const { data: existentAzi } = await client
        .from('sedinte')
        .select('id')
        .eq('cursant_id', cursantId)
        .eq('data', azi)
        .eq('consuma_sedinta', true)
        .limit(1)
        .maybeSingle()

      if (existentAzi) {
        sedintaId = existentAzi.id
        consumNou = false
      } else {
        // Consumul se înregistrează MEREU (chiar fără abonament activ → sold negativ)
        const { data: noua, error: sedErr } = await client
          .from('sedinte')
          .insert({
            cursant_id: cursantId,
            abonament_id: abonament?.id ?? null,
            data: azi,
            prezent: true,
            consuma_sedinta: true,
            lectie_id: lectieId,
            creat_de: userId,
          })
          .select('id')
          .single()
        if (sedErr?.code === '23505') {
          // Cursă: o altă cerere a consumat deja ședința de azi (index unic)
          const { data: concurenta } = await client
            .from('sedinte')
            .select('id')
            .eq('cursant_id', cursantId)
            .eq('data', azi)
            .eq('consuma_sedinta', true)
            .limit(1)
            .maybeSingle()
          if (!concurenta) {
            return empty({ error: 'Nu am putut scădea ședința. Încearcă din nou.' })
          }
          sedintaId = concurenta.id
          consumNou = false
        } else if (sedErr || !noua) {
          return empty({
            error: `Nu am putut scădea ședința: ${sedErr?.message ?? 'eroare necunoscută'}. Lecția nu a fost bifată.`,
          })
        } else {
          sedintaId = noua.id
          consumNou = true
        }
      }
    }

    ramase = await soldCursantFn()
    alertaSold = ramase !== null && ramase <= 0

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
          sedinte_ramase: ramase ?? 0,
        })
        await trimiteEmailSedinteEpuizate({
          emailParinte: cursant.email_parinte,
          prenumeCopil: cursant.prenume,
          sedinteRamase: ramase ?? 0,
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
