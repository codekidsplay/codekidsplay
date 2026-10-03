/** Template + canale notificare părinte — Code Kids Play Focsani */

/** Folosit în email + WhatsApp (înscriere, oferte, ședințe epuizate) */
export function textPrezentaObligatorie(): string {
  return `Prezența la curs este obligatorie pe durata anului școlar.
În caz de absență, cursantul recuperează lecția pe platforma Code Kids Play Focsani.`
}

export function mesajSedinteEpuizate(prenumeCopil: string): string {
  return `Buna ziua!

Pentru ${prenumeCopil} a fost ultima sedinta, va asteptam in continuare cu urmatoarea oferta:

Detalii abonamente Code Kids Play Focsani:
✅ 4 sedinte - 8 ore - 300 lei / 37,5 lei ora de programare

✅ 9 sedinte - 18 ore - 600 lei / 33.3 lei ora de programare

✅ 14 sedinte - 28 ore - 900 lei / 32.1 lei ora de programare

✅ 19 sedinte - 38 ore - 1200 lei / 31.5 lei ora de programare

🎁 Bonus: + 1 sedinta gratuita la recomandare iar acel copil se inscrie la curs.
🎁 Bonus: + 1 sedinta cadou la ziua de nastere.
🎁 Bonus: un cadou surpriză la terminarea anumitor module.

Sedinta dureaza 2 ore.

${textPrezentaObligatorie()}

Multumim!
Code Kids Play Focsani`
}

/** Mesaj scurt politică / înscriere — email + WhatsApp */
export function mesajPoliticaPrezenta(): string {
  return `Buna ziua!

${textPrezentaObligatorie()}

Multumim!
Code Kids Play Focsani`
}

export function subiectEmailSedinteEpuizate(prenumeCopil: string): string {
  return `Code Kids Play Focsani — ședințe epuizate pentru ${prenumeCopil}`
}

export function subiectEmailPoliticaPrezenta(): string {
  return `Code Kids Play Focsani — prezența la curs`
}

/** Stub: în producție → Resend / Supabase Edge Function */
export async function trimiteEmailSedinteEpuizate(opts: {
  emailParinte: string
  prenumeCopil: string
  sedinteRamase: number
}): Promise<{ ok: true; canal: 'email-stub'; preview: string }> {
  const body = mesajSedinteEpuizate(opts.prenumeCopil)
  console.info('[email-stub]', {
    to: opts.emailParinte,
    subject: subiectEmailSedinteEpuizate(opts.prenumeCopil),
    sedinteRamase: opts.sedinteRamase,
    body,
  })
  return { ok: true, canal: 'email-stub', preview: body }
}
