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

export function genereazaPin(len = 4): string {
  let s = ''
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10).toString()
  return s
}

export function genereazaParola(len = 8): string {
  const chars = 'abcdefghijkmnpqrstuvwxyz23456789'
  let s = ''
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)]
  return s
}

export function mesajWhatsAppLogin(opts: {
  prenume: string
  username: string
  pin: string
  email_parinte: string
  parola_parinte: string
}): string {
  return [
    `Salut! Conturi Code Kids Play pentru ${opts.prenume}:`,
    ``,
    `Părinte: ${opts.email_parinte}`,
    `Parolă: ${opts.parola_parinte}`,
    ``,
    `Elev: username ${opts.username}`,
    `PIN: ${opts.pin}`,
    ``,
    `Intră pe site → Login.`,
  ].join('\n')
}

export function destinateDupaLogin(rol: 'admin' | 'profesor' | 'parinte' | 'elev'): string {
  if (rol === 'admin' || rol === 'profesor') return '/admin'
  if (rol === 'parinte') return '/parinte'
  return '/invata'
}
