/** Culori avatar pe baza numelui — rotund + variat */

const AVATAR_PALETTE = [
  { bg: 'bg-sky-100', text: 'text-sky-700' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-violet-100', text: 'text-violet-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
  { bg: 'bg-teal-100', text: 'text-teal-700' },
  { bg: 'bg-orange-100', text: 'text-orange-700' },
  { bg: 'bg-indigo-100', text: 'text-indigo-700' },
] as const

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function avatarColors(key: string) {
  return AVATAR_PALETTE[hashString(key) % AVATAR_PALETTE.length]
}

export function avatarInitials(nume: string, prenume: string) {
  return `${nume[0] ?? ''}${prenume[0] ?? ''}`.toUpperCase()
}
