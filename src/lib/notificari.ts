/** Template + canale notificare părinte — Code Maker Club Focșani */

/** Folosit în email + WhatsApp (înscriere, oferte, ședințe epuizate) */
export function textPrezentaObligatorie(): string {
  return `Prezența la curs este obligatorie pe durata anului școlar.
În caz de absență, cursantul recuperează lecția pe platforma Code Maker Club Focșani.`
}

export function mesajSedinteEpuizate(prenumeCopil: string): string {
  return `Bună ziua!

Pentru ${prenumeCopil} a fost ultima ședință. Vă așteptăm în continuare cu următoarea ofertă:

Detalii abonamente Code Maker Club Focșani:
✅ 4 ședințe - 8 ore - 300 de lei / 37,5 lei ora de programare

✅ 9 ședințe - 18 ore - 600 de lei / 33,3 lei ora de programare

✅ 14 ședințe - 28 de ore - 900 de lei / 32,1 lei ora de programare

✅ 19 ședințe - 38 de ore - 1200 de lei / 31,5 lei ora de programare

🚀 Autodidact (acasă, pe platformă) - 1 modul - 10 lecții - 20 de ore de programare disponibile 30 de zile - 200 de lei / 10 lei ora de programare

🎁 Bonus: +1 ședință gratuită la recomandare, când copilul recomandat se înscrie la curs.
🎁 Bonus: +1 ședință cadou de ziua de naștere.
🎁 Bonus: un cadou surpriză la terminarea anumitor module.

⏱️ Ședința durează 2 ore.

${textPrezentaObligatorie()}

Mulțumim!
Code Maker Club Focșani`
}

/** Mesaj scurt politică / înscriere — email + WhatsApp */
export function mesajPoliticaPrezenta(): string {
  return `Bună ziua!

${textPrezentaObligatorie()}

Mulțumim!
Code Maker Club Focșani`
}

export function subiectEmailSedinteEpuizate(prenumeCopil: string): string {
  return `Code Maker Club Focșani — ședințe epuizate pentru ${prenumeCopil}`
}

export function subiectEmailPoliticaPrezenta(): string {
  return `Code Maker Club Focșani — prezența la curs`
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
