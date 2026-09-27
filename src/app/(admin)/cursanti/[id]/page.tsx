'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { getCursant, type Cursant } from '@/lib/mockStore'
import CursantProgresClient from '@/components/CursantProgresClient'
import { getCursantAction } from '@/app/actions/cursanti'
import { getAuthSessionAction } from '@/app/actions/auth'
import { getStaffSession, poateAccesaCursant } from '@/lib/vizibilitateCursanti'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'

const SESSION_KEY = 'ckp-session-v1'

function isUuid(id: string) {
  return /^[0-9a-f-]{36}$/i.test(id)
}

function syncProfesorSession(cursantIds: string[]) {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return
    const s = JSON.parse(raw) as { rol?: string; cursant_ids?: string[] }
    if (s.rol !== 'profesor') return
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ ...s, cursant_ids: cursantIds }),
    )
  } catch {
    /* ignore */
  }
}

export default function CursantProgresPagina({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [cursant, setCursant] = useState<Cursant | null | undefined>(undefined)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      // Cursant real (UUID) + Supabase
      if (isSupabaseConfiguredClient() && isUuid(id)) {
        const r = await getCursantAction(id)
        if (cancelled) return
        if (!r.ok) {
          setDenied(Boolean(r.denied))
          setCursant(null)
          return
        }
        // Reînnoiește lista din sesiune (profesor)
        const auth = await getAuthSessionAction()
        if (auth?.rol === 'profesor') {
          syncProfesorSession(auth.cursant_ids)
        }
        setDenied(false)
        setCursant({
          id: r.data.id,
          nume: r.data.nume,
          prenume: r.data.prenume,
          email_parinte: r.data.email_parinte,
          telefon_parinte: r.data.telefon_parinte,
          data_nastere: r.data.data_nastere,
          data_inscriere: r.data.data_inscriere,
          activ: r.data.activ,
        })
        return
      }

      // Demo / mock
      const session = getStaffSession()
      if (!poateAccesaCursant(session, id)) {
        setDenied(true)
        setCursant(null)
        return
      }
      setDenied(false)
      setCursant(getCursant(id) ?? null)
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [id])

  if (denied) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center max-w-lg">
        <p className="text-slate-600 mb-4">Nu ai acces la acest cursant.</p>
        <Link href="/cursanti" className="text-blue-600 font-medium hover:underline">
          ← Înapoi la cursanți
        </Link>
      </div>
    )
  }

  if (cursant === undefined) {
    return <p className="text-slate-400">Se încarcă…</p>
  }

  if (!cursant) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center max-w-lg">
        <p className="text-slate-600 mb-4">Cursantul nu a fost găsit.</p>
        <Link href="/cursanti" className="text-blue-600 font-medium hover:underline">
          ← Înapoi la cursanți
        </Link>
      </div>
    )
  }

  return (
    <CursantProgresClient
      cursant={{
        id: cursant.id,
        nume: cursant.nume,
        prenume: cursant.prenume,
        email_parinte: cursant.email_parinte,
        telefon_parinte: cursant.telefon_parinte,
        data_nastere: cursant.data_nastere,
        activ: cursant.activ,
      }}
    />
  )
}
