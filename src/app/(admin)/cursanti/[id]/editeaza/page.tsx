import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cursanti } from '@/lib/mockData'
import { notFound } from 'next/navigation'

export default async function EditeazaCursantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cursant = cursanti.find(c => c.id === id)
  if (!cursant) notFound()

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/cursanti/${id}`} className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Editează cursant</h1>
          <p className="text-slate-500 mt-1">{cursant.nume} {cursant.prenume}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center max-w-lg">
        <p className="text-slate-500 mb-4">
          Editarea cursanților va fi activă după configurarea Supabase.
        </p>
        <Link
          href={`/cursanti/${id}`}
          className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
        >
          ← Înapoi la progres
        </Link>
      </div>
    </div>
  )
}
