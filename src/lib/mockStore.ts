import {
  abonamente as abonamenteSeed,
  sedinte as sedinteSeed,
  progres as progresSeed,
  inscrieri as inscrieriSeed,
  cursanti,
  lectii,
  type TipAbonament,
} from './mockData'
import { mesajSedinteEpuizate, trimiteEmailSedinteEpuizate } from './notificari'

export type Sedinta = {
  id: string
  cursant_id: string
  abonament_id: string
  data: string
  prezent: boolean
  consuma_sedinta: boolean
  lectie_id: string | null
  nota: string | null
}

export type Progres = {
  id: string
  cursant_id: string
  lectie_id: string
  bifat: boolean
  data_bifat: string | null
  sedinta_id: string | null
  /** Odată true, re-bifarea NU mai consumă ședință (nici după debifare greșită) */
  consum_sedinta_aplicat: boolean
}

export type Inscriere = {
  id: string
  cursant_id: string
  curs_id: string
  data_inscriere: string
  modul_activ_id: string | null
  activ: boolean
}

export type Abonament = {
  id: string
  cursant_id: string
  tip: TipAbonament
  sedinte_incluse: number
  pret: number
  data_start: string
  data_sfarsit: string | null
  activ: boolean
}

export type NotificareLog = {
  cursant_id: string
  tip: 'sedinte_epuizate'
  data: string
}

type Store = {
  progres: Progres[]
  sedinte: Sedinta[]
  inscrieri: Inscriere[]
  abonamente: Abonament[]
  notificari: NotificareLog[]
}

const STORAGE_KEY = 'ckp-mock-store-v2'

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function seedStore(): Store {
  return {
    abonamente: abonamenteSeed.map(a => ({ ...a })),
    inscrieri: inscrieriSeed.map(i => ({
      ...i,
      modul_activ_id:
        i.curs_id === 'c1' ? 'm1' :
        i.curs_id === 'c4' ? 'm6' :
        i.curs_id === 'c5' ? 'm9' :
        i.curs_id === 'c2' ? 'm3' :
        i.curs_id === 'c6' ? 'm12' :
        i.curs_id === 'c7' ? 'm16' : null,
      activ: true,
    })),
    sedinte: sedinteSeed.map(s => ({
      ...s,
      consuma_sedinta: true,
      lectie_id: null,
    })),
    progres: progresSeed.map(p => ({
      ...p,
      sedinta_id: null,
      // lecțiile deja bifate în seed = deja „consumate” conceptual — nu mai taxa la re-bifă
      consum_sedinta_aplicat: p.bifat,
    })),
    notificari: [],
  }
}

function loadStore(): Store {
  if (typeof window === 'undefined') return seedStore()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Store
  } catch { /* ignore */ }
  const s = seedStore()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  return s
}

function saveStore(store: Store) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getStore(): Store {
  return loadStore()
}

export function resetStore() {
  const s = seedStore()
  saveStore(s)
  return s
}

export function sedinteRamase(abonamentId: string, store = getStore()): number {
  const ab = store.abonamente.find(a => a.id === abonamentId)
  if (!ab) return 0
  const consumate = store.sedinte.filter(
    s => s.abonament_id === abonamentId && s.consuma_sedinta
  ).length
  return ab.sedinte_incluse - consumate
}

export function abonamentActiv(cursantId: string, store = getStore()) {
  return store.abonamente.find(a => a.cursant_id === cursantId && a.activ) ?? null
}

export function sedintaConsumataAzi(
  cursantId: string,
  abonamentId: string,
  data = todayISO(),
  store = getStore()
) {
  return (
    store.sedinte.find(
      s =>
        s.cursant_id === cursantId &&
        s.abonament_id === abonamentId &&
        s.data === data &&
        s.consuma_sedinta
    ) ?? null
  )
}

export type BifareResult = {
  ok: boolean
  error?: string
  bifat: boolean
  consumNou: boolean
  sedinteRamase: number | null
  alertaSold: boolean
  emailTrimis: boolean
  whatsappMesaj: string | null
}

/** Profesor bifează: unlock permanent + max 1 consum/zi; sold poate fi negativ.
 * Debifare / re-bifă greșită NU mai consumă ședință (consum_sedinta_aplicat).
 */
export async function bifareLectie(cursantId: string, lectieId: string): Promise<BifareResult> {
  const empty = (extra: Partial<BifareResult> = {}): BifareResult => ({
    ok: false,
    bifat: false,
    consumNou: false,
    sedinteRamase: null,
    alertaSold: false,
    emailTrimis: false,
    whatsappMesaj: null,
    ...extra,
  })

  const store = getStore()
  const lectie = lectii.find(l => l.id === lectieId)
  if (!lectie) return empty({ error: 'Lecție inexistentă' })

  const cursant = cursanti.find(c => c.id === cursantId)
  if (!cursant) return empty({ error: 'Cursant inexistent' })

  const existing = store.progres.find(p => p.cursant_id === cursantId && p.lectie_id === lectieId)
  const currentlyBifat = existing?.bifat ?? false

  // Debifare: scoate unlock acasă; NU refundăm; păstrăm consum_sedinta_aplicat
  if (currentlyBifat) {
    if (existing) {
      existing.bifat = false
      existing.data_bifat = null
    }
    saveStore(store)
    const ab = abonamentActiv(cursantId, store)
    return {
      ok: true,
      bifat: false,
      consumNou: false,
      sedinteRamase: ab ? sedinteRamase(ab.id, store) : null,
      alertaSold: false,
      emailTrimis: false,
      whatsappMesaj: null,
    }
  }

  // Bifare: doar din modulul asociat
  const inscriereOk = store.inscrieri.find(
    i => i.cursant_id === cursantId && i.activ && i.modul_activ_id === lectie.modul_id
  )
  if (!inscriereOk) {
    return empty({ error: 'Lecția nu e din modulul asociat cursantului' })
  }

  const ab = abonamentActiv(cursantId, store)
  let consumNou = false
  let sedintaId: string | null = existing?.sedinta_id ?? null
  let ramase: number | null = null
  let alertaSold = false
  let emailTrimis = false
  let whatsappMesaj: string | null = null

  const dejaConsumat = existing?.consum_sedinta_aplicat === true

  if (ab) {
    const azi = todayISO()

    if (dejaConsumat) {
      consumNou = false
    } else {
      const existentAzi = sedintaConsumataAzi(cursantId, ab.id, azi, store)
      if (existentAzi) {
        sedintaId = existentAzi.id
        consumNou = false
      } else {
        const noua: Sedinta = {
          id: `s-${Date.now()}`,
          cursant_id: cursantId,
          abonament_id: ab.id,
          data: azi,
          prezent: true,
          consuma_sedinta: true,
          lectie_id: lectieId,
          nota: null,
        }
        store.sedinte.push(noua)
        sedintaId = noua.id
        consumNou = true
      }
    }

    ramase = sedinteRamase(ab.id, store)
    alertaSold = ramase <= 0

    if (alertaSold && consumNou) {
      whatsappMesaj = mesajSedinteEpuizate(cursant.prenume)
      const dejaAzi = store.notificari.some(
        n => n.cursant_id === cursantId && n.tip === 'sedinte_epuizate' && n.data === azi
      )
      if (!dejaAzi) {
        store.notificari.push({ cursant_id: cursantId, tip: 'sedinte_epuizate', data: azi })
        await trimiteEmailSedinteEpuizate({
          emailParinte: cursant.email_parinte,
          prenumeCopil: cursant.prenume,
          sedinteRamase: ramase,
        })
        emailTrimis = true
      }
    } else if (alertaSold) {
      whatsappMesaj = mesajSedinteEpuizate(cursant.prenume)
    }
  }

  if (existing) {
    existing.bifat = true
    existing.data_bifat = new Date().toISOString()
    existing.sedinta_id = sedintaId
    existing.consum_sedinta_aplicat = true
  } else {
    store.progres.push({
      id: `p-${Date.now()}`,
      cursant_id: cursantId,
      lectie_id: lectieId,
      bifat: true,
      data_bifat: new Date().toISOString(),
      sedinta_id: sedintaId,
      consum_sedinta_aplicat: true,
    })
  }

  saveStore(store)
  return {
    ok: true,
    bifat: true,
    consumNou,
    sedinteRamase: ramase,
    alertaSold,
    emailTrimis,
    whatsappMesaj,
  }
}

export function setModulActiv(inscriereId: string, modulId: string) {
  const store = getStore()
  const i = store.inscrieri.find(x => x.id === inscriereId)
  if (i) {
    i.modul_activ_id = modulId
    saveStore(store)
  }
}

/** Înscrie / scoate cursantul de la un curs (C++, Python, …) */
export function toggleInscriereCurs(
  cursantId: string,
  cursId: string,
  opts?: { modulActivId?: string | null }
): { inscris: boolean } {
  const store = getStore()
  const existing = store.inscrieri.find(
    i => i.cursant_id === cursantId && i.curs_id === cursId
  )

  if (existing) {
    if (existing.activ) {
      existing.activ = false
      saveStore(store)
      return { inscris: false }
    }
    existing.activ = true
    if (opts?.modulActivId !== undefined) {
      existing.modul_activ_id = opts.modulActivId
    }
    saveStore(store)
    return { inscris: true }
  }

  const defaultModul =
    opts?.modulActivId ??
    (cursId === 'c1' ? 'm1' :
     cursId === 'c4' ? 'm6' :
     cursId === 'c5' ? 'm9' :
     cursId === 'c2' ? 'm3' :
     cursId === 'c6' ? 'm12' :
     cursId === 'c7' ? 'm16' : null)

  store.inscrieri.push({
    id: `i-${Date.now()}`,
    cursant_id: cursantId,
    curs_id: cursId,
    data_inscriere: new Date().toISOString().slice(0, 10),
    modul_activ_id: defaultModul,
    activ: true,
  })
  saveStore(store)
  return { inscris: true }
}
