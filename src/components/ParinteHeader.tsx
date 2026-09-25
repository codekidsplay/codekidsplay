'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { logout } from '@/lib/auth'
import BrandLogo from '@/components/BrandLogo'

export default function ParinteHeader({ email }: { email: string }) {
  const router = useRouter()

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" href="/parinte" />
          <div>
            <p className="font-bold text-slate-900">Code Kids Play</p>
            <p className="text-xs text-slate-500">Cont părinte · {email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            logout()
            router.replace('/login')
          }}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
        >
          <LogOut size={16} /> Ieșire
        </button>
      </div>
    </header>
  )
}
