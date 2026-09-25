'use client'

import { cursuri, module, lectii } from '@/lib/mockData'
import {
  abonamentActiv,
  getStore,
  sedinteRamase,
} from '@/lib/mockStore'

type StoreLike = ReturnType<typeof getStore>

export type RezumatCopil = {
  cursantId: string
  sedinteRamase: number | null
  sedinteIncluse: number | null
  tipAbonament: string | null
  lectiiBifate: number
  lectiiTotal: number
  procent: number
  cursuri: Array<{
    id: string
    nume: string
    culoare: string
    modulActiv: string | null
    bifate: number
    total: number
    procent: number
  }>
}

export function rezumatCopil(cursantId: string, store: StoreLike = getStore()): RezumatCopil {
  const ab = abonamentActiv(cursantId, store)
  const inscrieri = store.inscrieri.filter(i => i.cursant_id === cursantId && i.activ)

  const cursuriInfo = inscrieri
    .map(i => {
      const curs = cursuri.find(c => c.id === i.curs_id)
      if (!curs) return null
      const moduleCurs = module.filter(m => m.curs_id === curs.id)
      const lectiiCurs = lectii.filter(l => moduleCurs.some(m => m.id === l.modul_id))
      const bifate = lectiiCurs.filter(l =>
        store.progres.some(p => p.cursant_id === cursantId && p.lectie_id === l.id && p.bifat)
      ).length
      const total = lectiiCurs.length
      const modulActiv = module.find(m => m.id === i.modul_activ_id)
      return {
        id: curs.id,
        nume: curs.nume,
        culoare: curs.culoare,
        modulActiv: modulActiv?.nume ?? null,
        bifate,
        total,
        procent: total ? Math.round((bifate / total) * 100) : 0,
      }
    })
    .filter(Boolean) as RezumatCopil['cursuri']

  const lectiiBifate = cursuriInfo.reduce((s, c) => s + c.bifate, 0)
  const lectiiTotal = cursuriInfo.reduce((s, c) => s + c.total, 0)

  return {
    cursantId,
    sedinteRamase: ab ? sedinteRamase(ab.id, store) : null,
    sedinteIncluse: ab?.sedinte_incluse ?? null,
    tipAbonament: ab?.tip ?? null,
    lectiiBifate,
    lectiiTotal,
    procent: lectiiTotal ? Math.round((lectiiBifate / lectiiTotal) * 100) : 0,
    cursuri: cursuriInfo,
  }
}

export function istoriculSedinte(cursantId: string, store: StoreLike = getStore()) {
  return store.sedinte
    .filter(s => s.cursant_id === cursantId)
    .sort((a, b) => b.data.localeCompare(a.data))
}

export function progresPeModule(cursantId: string, cursId: string, store: StoreLike = getStore()) {
  return module
    .filter(m => m.curs_id === cursId)
    .sort((a, b) => a.ordine - b.ordine)
    .map(m => {
      const lectiiModul = lectii.filter(l => l.modul_id === m.id).sort((a, b) => a.ordine - b.ordine)
      const bifate = lectiiModul.filter(l =>
        store.progres.some(p => p.cursant_id === cursantId && p.lectie_id === l.id && p.bifat)
      )
      return {
        ...m,
        total: lectiiModul.length,
        bifate: bifate.length,
        procent: lectiiModul.length
          ? Math.round((bifate.length / lectiiModul.length) * 100)
          : 0,
        lectii: lectiiModul.map(l => ({
          id: l.id,
          titlu: l.titlu,
          ordine: l.ordine,
          bifat: store.progres.some(
            p => p.cursant_id === cursantId && p.lectie_id === l.id && p.bifat
          ),
        })),
      }
    })
}
