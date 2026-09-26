import { createHash } from 'crypto'

/** Curăță markdown-ul lecției pentru citire cu voce (fără cod, HTML, tabele grele). */
export function markdownToSpeechText(markdown: string, opts?: { titlu?: string; ordine?: number }): string {
  let t = markdown

  t = t.replace(/```[\s\S]*?```/g, ' ')
  t = t.replace(/`[^`]+`/g, ' ')
  t = t.replace(/<iframe[\s\S]*?<\/iframe>/gi, ' ')
  t = t.replace(/<[^>]+>/g, ' ')
  t = t.replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  t = t.replace(/^#{1,6}\s+/gm, '')
  t = t.replace(/^\|.*\|$/gm, ' ')
  t = t.replace(/^[-*_]{3,}\s*$/gm, ' ')
  t = t.replace(/^>\s?/gm, '')
  t = t.replace(/^[-*+]\s+/gm, '')
  t = t.replace(/^\d+\.\s+/gm, '')
  t = t.replace(/\*\*|__/g, '')
  t = t.replace(/\*/g, '')
  t = t.replace(/_/g, ' ')
  t = t.replace(/\s+/g, ' ').trim()

  const header =
    opts?.ordine != null && opts?.titlu
      ? `Lecția ${opts.ordine}: ${opts.titlu}. `
      : opts?.titlu
        ? `${opts.titlu}. `
        : ''

  // Limită sigură pentru TTS (input + durată audio)
  const max = 5500
  let body = t.length > max ? `${t.slice(0, max)} … Sfârșitul fragmentului citit.` : t

  // Pauze naturale — ajută ritmul lent pentru copii
  body = body
    .replace(/([.!?])\s+/g, '$1 ... ')
    .replace(/:\s+/g, '. ... ')
    .replace(/;\s+/g, '. ... ')

  return `${header}${body}`.trim()
}

export function speechTextHash(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16)
}
