/**
 * Helperi puri (fără localStorage) — folosiți de mock și de Supabase actions.
 */

export function genereazaUsername(prenume: string, nume: string): string {
  const p = prenume
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
  const n = nume
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
  return `${p}.${n.charAt(0) || 'x'}`
}

/** Număr aleator criptografic în [0, max). */
function aleator(max: number): number {
  const buf = new Uint32Array(1)
  const limita = Math.floor(0x100000000 / max) * max // evită bias de modulo
  do {
    crypto.getRandomValues(buf)
  } while (buf[0] >= limita)
  return buf[0] % max
}

export function genereazaPin(len = 4): string {
  let s = ''
  for (let i = 0; i < len; i++) s += aleator(10).toString()
  return s
}

export function genereazaParola(len = 8): string {
  const chars = 'abcdefghijkmnpqrstuvwxyz23456789'
  let s = ''
  for (let i = 0; i < len; i++) s += chars[aleator(chars.length)]
  return s
}

const SITE_LOGIN_URL = 'https://codekidsplay.ro/login'
const SITE_TERMENI_URL = 'https://codekidsplay.ro/termeni'

export function mesajWhatsAppLogin(opts: {
  prenume: string
  username: string
  pin: string
  email_parinte: string
  parola_parinte: string
}): string {
  return [
    `Bună ziua! 👋`,
    `Iată conturile Code Kids Play pentru ${opts.prenume}:`,
    ``,
    `👨‍👩‍👧 *Cont părinte*`,
    `Email: ${opts.email_parinte}`,
    `Parolă: ${opts.parola_parinte}`,
    ``,
    `🎮 *Cont elev*`,
    `Username: ${opts.username}`,
    `PIN: ${opts.pin}`,
    ``,
    `🔗 Intrați aici: ${SITE_LOGIN_URL}`,
    `📄 Termeni și condiții: ${SITE_TERMENI_URL}`,
    ``,
    `Mulțumim și mult succes! 🚀`,
    `Echipa Code Kids Play`,
  ].join('\n')
}

export function destinateDupaLogin(rol: 'admin' | 'profesor' | 'parinte' | 'elev'): string {
  if (rol === 'admin' || rol === 'profesor') return '/admin'
  if (rol === 'parinte') return '/parinte'
  return '/invata'
}
