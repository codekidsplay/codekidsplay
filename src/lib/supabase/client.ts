import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from './env'

export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase nu e configurat (URL / anon key).')
  }
  return createBrowserClient<Database>(getSupabaseUrl(), getSupabaseAnonKey())
}
