import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'
import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseAdminConfigured,
} from './env'

/** Doar pe server — ocolește RLS. Nu importa în Client Components. */
export function createAdminClient() {
  if (!isSupabaseAdminConfigured()) {
    throw new Error(
      'Lipsește SUPABASE_SERVICE_ROLE_KEY. Adaugă secretul din Dashboard → API Keys (service_role / secret).',
    )
  }
  return createClient<Database>(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
