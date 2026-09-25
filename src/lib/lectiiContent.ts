import { readdirSync, readFileSync, existsSync } from 'fs'
import path from 'path'

/** Mapare modul (mockData) → folder relativ în content/lectii */
const MODUL_FOLDER: Record<string, string> = {
  m1: 'cpp/modul1',
  m12: 'robotica-lego/modul1',
  m13: 'robotica-lego/modul2',
  m16: 'scratch/modul1',
  m17: 'scratch/modul2',
  m18: 'scratch/modul3',
  m19: 'scratch/modul4',
  m21: 'microbit/modul1',
  m22: 'microbit/modul2',
  m23: 'microbit/modul3',
}

function contentRoot() {
  return path.join(process.cwd(), 'content', 'lectii')
}

/**
 * Încarcă conținutul markdown al unei lecții după modul_id + numărul lecției (ordine).
 * Returnează null dacă nu există fișier pe disc.
 */
export function getLectieMarkdown(modulId: string, ordine: number): string | null {
  const folderRel = MODUL_FOLDER[modulId]
  if (!folderRel) return null

  const dir = path.join(contentRoot(), folderRel)
  if (!existsSync(dir)) return null

  const files = readdirSync(dir).filter(f => f.endsWith('.md') && f.startsWith('L'))
  const match = files.find(f => {
    const m = f.match(/^L(\d+)/i)
    return m && parseInt(m[1], 10) === ordine
  })
  if (!match) return null

  try {
    return readFileSync(path.join(dir, match), 'utf8')
  } catch {
    return null
  }
}

export function hasLectieContent(modulId: string, ordine: number): boolean {
  return getLectieMarkdown(modulId, ordine) !== null
}

export function moduleCuContinutDisponibil(): string[] {
  return Object.keys(MODUL_FOLDER)
}
