import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PREFIXE_PROTEJATE = [
  '/admin',
  '/profesori',
  '/cursanti',
  '/cursuri',
  '/abonamente',
  '/invata',
  '/parinte',
]

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url.includes('placeholder') || key.includes('placeholder')) {
    return supabaseResponse
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value)
        }
        supabaseResponse = NextResponse.next({ request })
        for (const { name, value, options } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options)
        }
      },
    },
  })

  // Reîmprospătează sesiunea (nu elimina — necesar pentru SSR)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protecție de rută: zonele private cer sesiune. Rolurile se verifică
  // în continuare în layout-uri și în acțiunile de pe server.
  const { pathname } = request.nextUrl
  const esteProtejat = PREFIXE_PROTEJATE.some(
    p => pathname === p || pathname.startsWith(`${p}/`)
  )
  if (esteProtejat && !user) {
    const login = request.nextUrl.clone()
    login.pathname = '/login'
    login.search = ''
    const redirect = NextResponse.redirect(login)
    for (const c of supabaseResponse.cookies.getAll()) redirect.cookies.set(c)
    return redirect
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
