'use client'

import { useEffect, useMemo, useState } from 'react'
import { Users, BookOpen, TrendingUp, GraduationCap, CalendarCheck } from 'lucide-react'
import Link from 'next/link'
import { cursuri } from '@/lib/mockData'
import { getStore, getCursanti, type Cursant } from '@/lib/mockStore'
import CursantAvatar from '@/components/CursantAvatar'
import { filtreazaDupaVizibilitate, getStaffSession } from '@/lib/vizibilitateCursanti'
import { listCursantiAction } from '@/app/actions/cursanti'
import { getAuthSessionAction } from '@/app/actions/auth'
import { listStaffAction } from '@/app/actions/profesori'
import { sedinteEfectuateLunaCurentaAction } from '@/app/actions/activitate'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'

export default function DashboardHome() {
  const [ready, setReady] = useState(false)
  const [isProfesor, setIsProfesor] = useState(false)
  const [remoteCursanti, setRemoteCursanti] = useState<Cursant[] | null>(null)
  const [remoteInscrieri, setRemoteInscrieri] = useState<
    Array<{ cursant_id: string; curs_id: string; activ: boolean }>
  >([])
  const [totalProfesori, setTotalProfesori] = useState(0)
  const [sedinteLuna, setSedinteLuna] = useState(0)
  const [supabaseLoading, setSupabaseLoading] = useState(isSupabaseConfiguredClient())

  useEffect(() => {
    setReady(true)
    setIsProfesor(getStaffSession()?.rol === 'profesor')

    if (!isSupabaseConfiguredClient()) {
      setSupabaseLoading(false)
      return
    }

    void (async () => {
      const auth = await getAuthSessionAction()
      const eProfesor = auth?.rol === 'profesor'
      if (eProfesor) {
        setIsProfesor(true)
        try {
          const raw = localStorage.getItem('ckp-session-v1')
          if (raw) {
            const s = JSON.parse(raw)
            localStorage.setItem(
              'ckp-session-v1',
              JSON.stringify({ ...s, cursant_ids: auth.cursant_ids }),
            )
          }
        } catch {
          /* ignore */
        }
      }
      const [r, staff, sedinte] = await Promise.all([
        listCursantiAction(),
        listStaffAction(),
        sedinteEfectuateLunaCurentaAction(),
      ])
      if (r.ok) {
        setRemoteCursanti(
          r.data.map(c => ({
            id: c.id,
            nume: c.nume,
            prenume: c.prenume,
            email_parinte: c.email_parinte,
            telefon_parinte: c.telefon_parinte,
            data_inscriere: c.data_inscriere,
            activ: c.activ,
          })),
        )
        setRemoteInscrieri(r.inscrieri)
      } else {
        setRemoteCursanti([])
        setRemoteInscrieri([])
      }
      if (staff.ok) {
        setTotalProfesori(staff.data.filter(p => p.rol === 'profesor').length)
      }
      if (sedinte.ok) setSedinteLuna(sedinte.count)
      setSupabaseLoading(false)
    })()
  }, [])

  const { cards, recenti, insc } = useMemo(() => {
    if (!ready) {
      return {
        cards: [],
        recenti: [] as Cursant[],
        insc: [] as Array<{ cursant_id: string; curs_id: string; activ: boolean }>,
      }
    }
    const session = getStaffSession()
    const store = getStore()
    const visible = isSupabaseConfiguredClient()
      ? (remoteCursanti ?? [])
      : filtreazaDupaVizibilitate(getCursanti(), session)
    const visibleActivi = visible.filter(c => c.activ)
    const ids = new Set(visible.map(c => c.id))
    const inscSource = isSupabaseConfiguredClient() ? remoteInscrieri : store.inscrieri
    const insc = inscSource.filter(i => ids.has(i.cursant_id))
    const cursuriCuInscrieri = new Set(insc.filter(i => i.activ).map(i => i.curs_id)).size

    const cards = [
      {
        label: isProfesor ? 'Cursanți activi' : 'Total Cursanți',
        value: isProfesor ? visibleActivi.length : visible.length,
        icon: Users,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
      },
      {
        label: isProfesor ? 'Cursuri active' : 'Cursuri disponibile',
        value: isProfesor ? cursuriCuInscrieri : cursuri.length,
        icon: BookOpen,
        color: 'text-emerald-500',
        bg: 'bg-emerald-50',
      },
      {
        label: 'Înscrieri',
        value: insc.length,
        icon: TrendingUp,
        color: 'text-violet-500',
        bg: 'bg-violet-50',
      },
      {
        label: 'Ședințe luna asta',
        value: sedinteLuna,
        icon: CalendarCheck,
        color: 'text-amber-500',
        bg: 'bg-amber-50',
      },
      ...(isProfesor
        ? []
        : [
            {
              label: 'Total profesori',
              value: totalProfesori,
              icon: GraduationCap,
              color: 'text-rose-500',
              bg: 'bg-rose-50',
            },
          ]),
    ]

    const recenti = [...visible].reverse().slice(0, 5)
    return { cards, recenti, insc }
  }, [ready, isProfesor, remoteCursanti, remoteInscrieri, totalProfesori, sedinteLuna])

  if (!ready || supabaseLoading) {
    return <p className="text-slate-400">Se încarcă…</p>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          {isProfesor
            ? 'Statistici pentru cursanții tăi'
            : 'Bun venit în platforma Code Maker Club'}
        </p>
      </div>

      <div
        className={`grid grid-cols-2 gap-4 mb-6 ${
          isProfesor ? 'xl:grid-cols-4' : 'lg:grid-cols-3 xl:grid-cols-5'
        }`}
      >
        {cards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-2.5`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-slate-700 text-sm font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {isProfesor ? 'Cursanți activi' : 'Cursanți recenți'}
          </h2>
          <Link href="/cursanti" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Vezi toți →
          </Link>
        </div>

        {recenti.length === 0 ? (
          <p className="text-slate-400 text-sm">
            {isProfesor
              ? 'Nu ai încă cursanți asignați. Cere adminului să te lege de elevi.'
              : 'Niciun cursant încă.'}
          </p>
        ) : (
          <div className="space-y-3">
            {recenti.map(c => {
              const cursuriCursant =
                insc
                  .filter(i => i.cursant_id === c.id)
                  .map(i => cursuri.find(cur => cur.id === i.curs_id)?.nume)
                  .filter(Boolean) ?? []

              return (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CursantAvatar id={c.id} nume={c.nume} prenume={c.prenume} />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {c.prenume} {c.nume}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {new Date(c.data_inscriere).toLocaleDateString('ro-RO')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex gap-1">
                      {cursuriCursant.slice(0, 2).map(curs => (
                        <span
                          key={curs}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                        >
                          {curs}
                        </span>
                      ))}
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        c.activ
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {c.activ ? 'Activ' : 'Inactiv'}
                    </span>
                    <Link
                      href={`/cursanti/${c.id}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Progres →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
