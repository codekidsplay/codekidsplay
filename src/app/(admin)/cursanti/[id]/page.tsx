'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { getCursant, type Cursant } from '@/lib/mockStore'
import CursantProgresClient from '@/components/CursantProgresClient'

export default function CursantProgresPagina({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [cursant, setCursant] = useState<Cursant | null | undefined>(undefined)

  useEffect(() => {
    setCursant(getCursant(id) ?? null)
  }, [id])

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
      }}
    />
  )
}
