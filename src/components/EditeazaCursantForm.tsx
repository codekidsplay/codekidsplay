'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { getCursantAction, updateCursantAction } from '@/app/actions/cursanti'
import { getCursant } from '@/lib/mockStore'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'

function isUuid(id: string) {
  return /^[0-9a-f-]{36}$/i.test(id)
}

export default function EditeazaCursantForm({ cursantId }: { cursantId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [form, setForm] = useState({
    prenume: '',
    nume: '',
    email_parinte: '',
    telefon_parinte: '',
    data_nastere: '',
    activ: true,
  })

  useEffect(() => {
    const load = async () => {
      if (isSupabaseConfiguredClient() && isUuid(cursantId)) {
        const r = await getCursantAction(cursantId)
        if (!r.ok) {
          setNotFound(true)
          setLoading(false)
          return
        }
        setForm({
          prenume: r.data.prenume,
          nume: r.data.nume,
          email_parinte: r.data.email_parinte,
          telefon_parinte: r.data.telefon_parinte ?? '',
          data_nastere: r.data.data_nastere ?? '',
          activ: r.data.activ,
        })
        setLoading(false)
        return
      }

      const c = getCursant(cursantId)
      if (!c) {
        setNotFound(true)
        setLoading(false)
        return
      }
      setForm({
        prenume: c.prenume,
        nume: c.nume,
        email_parinte: c.email_parinte,
        telefon_parinte: c.telefon_parinte ?? '',
        data_nastere: c.data_nastere ?? '',
        activ: c.activ,
      })
      setLoading(false)
    }
    void load()
  }, [cursantId])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.data_nastere)) {
      setError('Data nașterii e obligatorie.')
      return
    }
    setSaving(true)

    if (isSupabaseConfiguredClient() && isUuid(cursantId)) {
      const r = await updateCursantAction(cursantId, {
        prenume: form.prenume,
        nume: form.nume,
        email_parinte: form.email_parinte,
        telefon_parinte: form.telefon_parinte || null,
        data_nastere: form.data_nastere,
        activ: form.activ,
      })
      setSaving(false)
      if (!r.ok) {
        setError(r.error)
        return
      }
      router.push(`/cursanti/${cursantId}`)
      return
    }

    setSaving(false)
    setError('Cursant demo — editarea se salvează doar pentru cursanți din Supabase.')
  }

  if (loading) {
    return <p className="text-slate-400">Se încarcă…</p>
  }

  if (notFound) {
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
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href={`/cursanti/${cursantId}`}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft size={22} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Editează cursant</h1>
          <p className="text-slate-500 mt-1">
            {form.nume} {form.prenume}
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 max-w-xl space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700 mb-1.5 block">Prenume *</span>
            <input
              value={form.prenume}
              onChange={e => setForm({ ...form, prenume: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 mb-1.5 block">Nume *</span>
            <input
              value={form.nume}
              onChange={e => setForm({ ...form, nume: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
              required
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1.5 block">Data nașterii *</span>
          <input
            type="date"
            value={form.data_nastere}
            onChange={e => setForm({ ...form, data_nastere: e.target.value })}
            max={new Date().toISOString().slice(0, 10)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1.5 block">Email părinte *</span>
          <input
            type="email"
            value={form.email_parinte}
            onChange={e => setForm({ ...form, email_parinte: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1.5 block">Telefon</span>
          <input
            type="tel"
            value={form.telefon_parinte}
            onChange={e => setForm({ ...form, telefon_parinte: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-blue-500"
            placeholder="07xx xxx xxx"
          />
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.activ}
            onChange={e => setForm({ ...form, activ: e.target.checked })}
            className="rounded border-slate-300"
          />
          <span className="text-sm font-medium text-slate-700">Cursant activ</span>
        </label>

        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            <Save size={18} />
            {saving ? 'Salvez…' : 'Salvează'}
          </button>
          <Link
            href={`/cursanti/${cursantId}`}
            className="inline-flex items-center px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Anulează
          </Link>
        </div>
      </form>
    </div>
  )
}
