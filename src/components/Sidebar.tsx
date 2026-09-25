'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Users,
  BookOpen,
  LayoutDashboard,
  CreditCard,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { getSession, logout } from '@/lib/auth'
import { useEffect, useState } from 'react'
import BrandLogo from '@/components/BrandLogo'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/cursanti', label: 'Cursanți', icon: Users },
  { href: '/cursuri', label: 'Lecții', icon: BookOpen },
  { href: '/abonamente', label: 'Abonamente & Plăți', icon: CreditCard },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [adminName, setAdminName] = useState('')

  useEffect(() => {
    const s = getSession()
    if (s?.rol === 'admin') setAdminName(s.nume)
  }, [])

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col shadow-xl z-50">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" href="/admin" />
          <div>
            <h1 className="font-bold text-lg leading-tight">Code Kids Play</h1>
            <p className="text-slate-400 text-xs">{adminName || 'Admin'}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === '/admin'
              ? pathname === '/admin'
              : pathname === href || pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{label}</span>
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-700 space-y-2">
        <button
          type="button"
          onClick={() => {
            logout()
            router.replace('/login')
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <LogOut size={18} />
          <span className="font-medium">Ieșire</span>
        </button>
        <p className="text-slate-500 text-xs text-center">© 2026 Code Kids Play</p>
      </div>
    </aside>
  )
}
