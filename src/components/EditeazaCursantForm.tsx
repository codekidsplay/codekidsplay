'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Trash2, UserRound } from 'lucide-react'
import { getCursantAction, stergeCursantAction, updateCursantAction } from '@/app/actions/cursanti'
import { getCursant } from '@/lib/mockStore'
import { getSession } from '@/lib/auth'
import { isSupabaseConfiguredClient } from '@/lib/supabase/publicFlag'
import ConturiAccesPanel from '@/components/ConturiAccesPanel'
import AsigneazaProfesorPanel from '@/components/AsigneazaProfesorPanel'

function isUuid(id: string) {
  return /^[0-9a-f-]{36}$/i.test(id)
}

export default function EditeazaCursantForm({ cursantId }: { cursantId: string }) {
  const router = useRouter()
  const [esteAdmin, setEsteAdmin] = useState(false)
  const [confirmStergere, setConfirmStergere] = useState('')
  const [stergere, setStergere] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [okMsg, setOkMsg] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [form, setForm] = useState({
    prenume: '',
    nume: '',
    email_parinte: '',
    telefon_parinte: '',
    data_nastere: '',
    activ: true,
    poate_pleca_singur: false,
  })

  useEffect(() => {
    setEsteAdmin(getSession()?.rol === 'admin')
  }, [])

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
          poate_pleca_singur: r.data.poate_pleca_singur,
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
        poate_pleca_singur: c.poate_pleca_singur === true,
      })
      setLoading(false)
    }
    void load()
  }, [cursantId])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setOkMsg(null)
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
        poate_pleca_singur: form.poate_pleca_singur,
      })
      setSaving(false)
      if (!r.ok) {
        setError(r.error)
        return
      }
      setOkMsg('Datele au fost salvate.')
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

  const cursantPentruPanouri = {
    id: cursantId,
    nume: form.nume,
    prenume: form.prenume,
    email_parinte: form.email_parinte,
    telefon_parinte: form.telefon_parinte || null,
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
            {form.prenume} {form.nume}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <UserRound size={18} className="text-slate-500" />
          <h2 className="font-semibold text-slate-800">Date cursant</h2>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 max-w-xl">
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

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.poate_pleca_singur}
              onChange={e => setForm({ ...form, poate_pleca_singur: e.target.checked })}
              className="mt-1 rounded border-slate-300"
            />
            <span className="text-sm text-slate-700">
              <span className="font-medium">Poate pleca singur după curs</span>
              <span className="block text-xs text-slate-400">
                Dacă nu e bifat, copilul este predat doar unui adult.
              </span>
            </span>
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
          {okMsg ? (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              {okMsg}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              <Save size={18} />
              {saving ? 'Salvez…' : 'Salvează datele'}
            </button>
            <Link
              href={`/cursanti/${cursantId}`}
              className="inline-flex items-center px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Înapoi la progres
            </Link>
          </div>
        </form>
      </div>

      <ConturiAccesPanel cursant={cursantPentruPanouri} />

      <AsigneazaProfesorPanel cursantId={cursantId} />

      {esteAdmin && isSupabaseConfiguredClient() && isUuid(cursantId) ? (
        <div className="mt-8 max-w-xl rounded-2xl border border-red-200 bg-red-50/60 p-6">
          <h2 className="font-bold text-red-700 mb-1">Zonă periculoasă</h2>
          <p className="text-sm text-slate-600 mb-4">
            Șterge definitiv cursantul, progresul și contul lui de elev. Contul părintelui se
            șterge doar dacă nu mai are alți copii. Nu se poate șterge un cursant cu plăți
            înregistrate – dezactivează-l în schimb.
          </p>
          <p className="text-sm text-slate-700 mb-2">
            Scrie <strong>{form.prenume} {form.nume}</strong> pentru confirmare:
          </p>
          <input
            value={confirmStergere}
            onChange={e => setConfirmStergere(e.target.value)}
            className="w-full rounded-xl border border-red-200 bg-white px-4 py-2.5 mb-3 outline-none focus:border-red-500"
            autoComplete="off"
          />
          <button
            type="button"
            disabled={
              stergere ||
              confirmStergere.trim().toLowerCase() !==
                `${form.prenume} ${form.nume}`.trim().toLowerCase()
            }
            onClick={async () => {
              setStergere(true)
              setError(null)
              const r = await stergeCursantAction(cursantId)
              if (!r.ok) {
                setError(r.error)
                setStergere(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
                return
              }
              router.push('/cursanti')
            }}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            <Trash2 size={18} />
            {stergere ? 'Șterg…' : 'Șterge cursantul'}
          </button>
        </div>
      ) : null}
    </div>
  )
}
