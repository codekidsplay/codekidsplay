/**
 * Client browser simplu (compatibil cu componente vechi: CursantForm, etc.).
 * Auth SSR: `@/lib/supabase/client` + `@/lib/supabase/server`.
 */
import { createClient } from '@supabase/supabase-js'
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from '@/lib/supabase/env'

export const supabase = isSupabaseConfigured()
  ? createClient(getSupabaseUrl(), getSupabaseAnonKey())
  : (null as unknown as ReturnType<typeof createClient>)
