/**
 * Trimitere email prin Resend — DOAR pe server (acțiuni server / route handlers).
 * Nu importa acest fișier din componente client sau din mockStore.
 */
import {
  mesajSedinteEpuizate,
  subiectEmailSedinteEpuizate,
} from '@/lib/notificari'

const EXPEDITOR = 'Code Maker Club Focșani <notificari@codemakerclub.ro>'
const RASPUNS_LA = 'contact@codemakerclub.ro'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function textInHtml(text: string): string {
  return `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1e293b;white-space:pre-line">${escapeHtml(text)}</div>`
}

export type RezultatEmail = { ok: true; id: string } | { ok: false; error: string }

export async function trimiteEmail(opts: {
  to: string
  subject: string
  text: string
}): Promise<RezultatEmail> {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) return { ok: false, error: 'RESEND_API_KEY lipsește' }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EXPEDITOR,
        to: [opts.to],
        reply_to: RASPUNS_LA,
        subject: opts.subject,
        text: opts.text,
        html: textInHtml(opts.text),
      }),
      signal: AbortSignal.timeout(10_000),
    })
    const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string }
    if (!res.ok || !json.id) {
      return { ok: false, error: json.message ?? `Resend HTTP ${res.status}` }
    }
    return { ok: true, id: json.id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Eroare de rețea' }
  }
}

export async function trimiteEmailSedinteEpuizateReal(opts: {
  emailParinte: string
  prenumeCopil: string
}): Promise<RezultatEmail> {
  return trimiteEmail({
    to: opts.emailParinte,
    subject: subiectEmailSedinteEpuizate(opts.prenumeCopil),
    text: mesajSedinteEpuizate(opts.prenumeCopil),
  })
}
