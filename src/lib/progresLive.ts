import { cursuri, module, lectii } from '@/lib/mockData'
import type { ProgresCursantData } from '@/app/actions/progres'

export type RezumatCopilLive = {
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

export function rezumatDinProgres(cursantId: string, data: ProgresCursantData): RezumatCopilLive {
  const unlocked = new Set(data.progres.filter(p => p.bifat).map(p => p.lectie_id))
  const inscrieri = data.inscrieri.filter(i => i.activ)

  const cursuriInfo = inscrieri
    .map(i => {
      const curs = cursuri.find(c => c.id === i.curs_id)
      if (!curs) return null
      const moduleCurs = module.filter(m => m.curs_id === curs.id)
      const lectiiCurs = lectii.filter(l => moduleCurs.some(m => m.id === l.modul_id))
      const bifate = lectiiCurs.filter(l => unlocked.has(l.id)).length
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
    .filter(Boolean) as RezumatCopilLive['cursuri']

  const lectiiBifate = cursuriInfo.reduce((s, c) => s + c.bifate, 0)
  const lectiiTotal = cursuriInfo.reduce((s, c) => s + c.total, 0)

  return {
    cursantId,
    sedinteRamase: data.abonament?.sedinte_ramase ?? null,
    sedinteIncluse: data.abonament?.sedinte_incluse ?? null,
    tipAbonament: data.abonament?.tip ?? null,
    lectiiBifate,
    lectiiTotal,
    procent: lectiiTotal ? Math.round((lectiiBifate / lectiiTotal) * 100) : 0,
    cursuri: cursuriInfo,
  }
}

export function progresPeModuleLive(
  cursId: string,
  data: ProgresCursantData,
) {
  const unlocked = new Set(data.progres.filter(p => p.bifat).map(p => p.lectie_id))
  return module
    .filter(m => m.curs_id === cursId)
    .sort((a, b) => a.ordine - b.ordine)
    .map(m => {
      const lectiiM = lectii
        .filter(l => l.modul_id === m.id)
        .sort((a, b) => a.ordine - b.ordine)
        .map(l => ({
          id: l.id,
          titlu: l.titlu,
          ordine: l.ordine,
          bifat: unlocked.has(l.id),
        }))
      const bifate = lectiiM.filter(l => l.bifat).length
      return {
        id: m.id,
        nume: m.nume,
        ordine: m.ordine,
        bifate,
        total: lectiiM.length,
        lectii: lectiiM,
      }
    })
}
