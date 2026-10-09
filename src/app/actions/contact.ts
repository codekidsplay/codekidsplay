'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { isSupabaseAdminConfigured } from '@/lib/supabase/env'
import { trimiteEmail } from '@/lib/emailResend'
import { TERMENI_VERSIUNE } from '@/lib/termeni'

const EMAIL_NOTIFICARE = 'codemakerclub@gmail.com'

export type CerereContactInput = {
  nume: string
  email: string
  telefon: string
  mesaj: string
  acord: boolean
  /** Honeypot: trebuie să rămână gol. */
  website?: string
}

export type CerereContactRezultat = { ok: true } | { ok: false; error: string }

const EROARE_GENERICA = `Nu am putut trimite mesajul. Scrie-ne direct la ${EMAIL_NOTIFICARE}.`

export async function trimiteCerereContactAction(
  input: CerereContactInput,
): Promise<CerereContactRezultat> {
  // Bot: răspundem „ok" fără să salvăm.
  if (input.website?.trim()) return { ok: true }

  const nume = input.nume?.trim() ?? ''
  const email = input.email?.trim() ?? ''
  const telefon = input.telefon?.trim() ?? ''
  const mesaj = input.mesaj?.trim() ?? ''

  if (!input.acord) return { ok: false, error: 'Trebuie să accepți Termenii și condițiile.' }
  if (!nume || nume.length > 120) return { ok: false, error: 'Completează numele.' }
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 200) {
    return { ok: false, error: 'Adresa de email nu este validă.' }
  }
  if (telefon.replace(/\D/g, '').length < 6 || telefon.length > 40) {
    return { ok: false, error: 'Completează un număr de telefon valid.' }
  }
  if (!mesaj || mesaj.length > 4000) {
    return { ok: false, error: 'Mesajul este gol sau prea lung (maxim 4000 de caractere).' }
  }

  if (!isSupabaseAdminConfigured()) {
    console.error('[contact] SUPABASE_SERVICE_ROLE_KEY lipsește')
    return { ok: false, error: EROARE_GENERICA }
  }

  const client = createAdminClient()
  const { data, error } = await client
    .from('cereri_contact')
    .insert({
      nume,
      email,
      telefon,
      mesaj,
      termeni_acceptati: true,
      termeni_versiune: TERMENI_VERSIUNE,
    })
    .select('created_at')
    .single()

  if (error || !data) {
    console.error('[contact] insert eșuat:', error?.message)
    return { ok: false, error: EROARE_GENERICA }
  }

  // Notificare — cererea e deja salvată, deci un eșec aici nu o invalidează.
  const ora = new Date(data.created_at).toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })
  const notif = await trimiteEmail({
    to: EMAIL_NOTIFICARE,
    subject: `Cerere nouă de pe site — ${nume}`,
    text: [
      'Ai primit o cerere nouă prin formularul de contact:',
      '',
      `Nume: ${nume}`,
      `Email: ${email}`,
      `Telefon: ${telefon}`,
      '',
      mesaj,
      '',
      `Acord Termeni și condiții (versiunea ${TERMENI_VERSIUNE}): DA`,
      `Înregistrat la: ${ora}`,
    ]
      .join('\n'),
  })
  if (!notif.ok) console.error('[contact] notificare email eșuată:', notif.error)

  return { ok: true }
}
