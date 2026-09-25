import { cursanti } from '@/lib/mockData'
import { notFound } from 'next/navigation'
import CursantProgresClient from '@/components/CursantProgresClient'

export default async function CursantProgresPagina({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cursant = cursanti.find(c => c.id === id)
  if (!cursant) notFound()

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
