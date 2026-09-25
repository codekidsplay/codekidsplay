'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import RequireAuth from '@/components/RequireAuth'
import BrandLogo from '@/components/BrandLogo'
import { getSession, logout } from '@/lib/auth'
import { useEffect, useState } from 'react'

function ElevChrome({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [prenume, setPrenume] = useState('')

  useEffect(() => {
    const s = getSession()
    if (s?.rol === 'elev') setPrenume(s.prenume)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50">
      <header className="border-b border-sky-100/80 bg-white/70 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/invata" className="flex items-center gap-3">
            <BrandLogo size="sm" href={null} />
            <div>
              <p className="font-bold text-slate-900 leading-tight">Code Kids Play</p>
              <p className="text-xs text-slate-500">
                {prenume ? `Salut, ${prenume}` : 'Spațiul meu de învățare'}
              </p>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => {
              logout()
              router.replace('/login')
            }}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <LogOut size={16} /> Ieșire
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

export default function ElevLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireAuth roles={['elev']}>
      <ElevChrome>{children}</ElevChrome>
    </RequireAuth>
  )
}
