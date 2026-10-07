/** Env helpers — fără throw la import (build-safe). */

export function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? ''
}

export function getSupabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? ''
}

export function getSupabaseServiceRoleKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? ''
}

export function isSupabaseConfigured(): boolean {
  const url = getSupabaseUrl()
  const key = getSupabaseAnonKey()
  if (!url || !key) return false
  if (url.includes('placeholder')) return false
  if (key.includes('placeholder')) return false
  return true
}

export function isSupabaseAdminConfigured(): boolean {
  return isSupabaseConfigured() && Boolean(getSupabaseServiceRoleKey())
}

/** Email intern pentru elev (Auth cere email; UI folosește username + PIN). */
export function elevAuthEmail(username: string): string {
  const u = username.trim().toLowerCase()
  return `${u}@elev.codemakerclub.ro`
}

/** Parolă Auth derivată din PIN (min. 6 caractere cerute de Supabase). */
export function elevAuthPassword(pin: string): string {
  return `ckp-elev-${pin}`
}
