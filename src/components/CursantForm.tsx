'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Cursuri = { id: string; nume: string }[]

interface Props {
  cursantId?: string
}

export default function CursantForm({ cursantId }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [cursuri, setCursuri] = useState<Cursuri>([])
  const [cursuriBifate, setCursuriBifate] = useState<string[]>([])
  const [form, setForm] = useState({
    nume: '',
    prenume: '',
    email_parinte: '',
    telefon_parinte: '',
    data_inscriere: new Date().toISOString().split('T')[0],
    activ: true,
  })

  useEffect(() => {
    supabase.from('cursuri').select('id, nume').order('nume').then(({ data }) => {
      setCursuri(data ?? [])
    })

    if (cursantId) {
      supabase
        .from('cursanti')
        .select('*')
        .eq('id', cursantId)
        .single()
        .then(({ data }) => {
          if (data) {
            setForm({
              nume: data.nume,
              prenume: data.prenume,
              email_parinte: data.email_parinte,
              telefon_parinte: data.telefon_parinte ?? '',
              data_inscriere: data.data_inscriere,
              activ: data.activ,
            })
          }
        })

      supabase
        .from('inscrieri')
        .select('curs_id')
        .eq('cursant_id', cursantId)
        .then(({ data }) => {
          setCursuriBifate(data?.map(i => i.curs_id) ?? [])
        })
    }
  }, [cursantId])

  const toggleCurs = (cursId: string) => {
    setCursuriBifate(prev =>
      prev.includes(cursId) ? prev.filter(id => id !== cursId) : [...prev, cursId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let id = cursantId

      if (cursantId) {
        await supabase.from('cursanti').update(form).eq('id', cursantId)
      } else {
        const { data } = await supabase.from('cursanti').insert(form).select('id').single()
        id = data?.id
      }

      if (!id) throw new Error('No ID returned')

      const { data: existingInscrieri } = await supabase
        .from('inscrieri')
        .select('curs_id')
        .eq('cursant_id', id)

      const existing = existingInscrieri?.map(i => i.curs_id) ?? []
      const toAdd = cursuriBifate.filter(cid => !existing.includes(cid))
      const toRemove = existing.filter(cid => !cursuriBifate.includes(cid))

      if (toAdd.length > 0) {
        await supabase.from('inscrieri').insert(
          toAdd.map(curs_id => ({ cursant_id: id!, curs_id }))
        )
      }
      if (toRemove.length > 0) {
        await supabase
          .from('inscrieri')
          .delete()
          .eq('cursant_id', id)
          .in('curs_id', toRemove)
      }

      router.push('/cursanti')
      router.refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
        <h2 className="font-semibold text-slate-700 text-lg">Date personale</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nume *</label>
            <input
              required
              value={form.nume}
              onChange={e => setForm({ ...form, nume: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Popescu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Prenume *</label>
            <input
              required
              value={form.prenume}
              onChange={e => setForm({ ...form, prenume: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Andrei"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email părinte *</label>
          <input
            required
            type="email"
            value={form.email_parinte}
            onChange={e => setForm({ ...form, email_parinte: e.target.value })}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="parinte@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Telefon</label>
            <input
              value={form.telefon_parinte}
              onChange={e => setForm({ ...form, telefon_parinte: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="07xx xxx xxx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Data înscrierii</label>
            <input
              type="date"
              value={form.data_inscriere}
              onChange={e => setForm({ ...form, data_inscriere: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="activ"
            checked={form.activ}
            onChange={e => setForm({ ...form, activ: e.target.checked })}
            className="w-4 h-4 rounded border-slate-300 text-blue-600"
          />
          <label htmlFor="activ" className="text-sm font-medium text-slate-700">Cont activ</label>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-semibold text-slate-700 text-lg mb-4">Cursuri înscrise</h2>
        <div className="grid grid-cols-2 gap-3">
          {cursuri.map(curs => (
            <label
              key={curs.id}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                cursuriBifate.includes(curs.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-100 hover:border-slate-200 bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={cursuriBifate.includes(curs.id)}
                onChange={() => toggleCurs(curs.id)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600"
              />
              <span className={`font-medium text-sm ${cursuriBifate.includes(curs.id) ? 'text-blue-700' : 'text-slate-700'}`}>
                {curs.nume}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/30 transition-colors"
        >
          <Save size={18} />
          {loading ? 'Se salvează...' : 'Salvează'}
        </button>
        <Link href="/cursanti" className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-medium transition-colors">
          <ArrowLeft size={18} /> Înapoi
        </Link>
      </div>
    </form>
  )
}
