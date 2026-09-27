import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from './env'

export async function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase nu e configurat (URL / anon key).')
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // Server Component — cookies read-only; middleware reîmprospătează sesiunea
        }
      },
    },
  })
}
