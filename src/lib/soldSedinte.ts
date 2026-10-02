/**
 * Sold ședințe la nivel de cursant: suma tuturor pachetelor plătite
 * minus toate ședințele consumate (inclusiv pe abonamente vechi).
 *
 * Exemple:
 *   avea 2 rămase + plătește 4 → sold 6
 *   avea −2 + plătește 4 → sold 2
 *   0 rămase + predare fără plată → sold −1, −2…
 */

export type AbonamentPentruSold = {
  id: string
  cursant_id: string
  sedinte_incluse: number
  activ: boolean
  tip?: 'lunar' | 'pachet' | string
}

export type SedintaPentruSold = {
  cursant_id: string
  abonament_id?: string | null
  consuma_sedinta?: boolean
  prezent?: boolean
}

export type SoldCursant = {
  sedintePlate: number
  sedinteConsume: number
  sold: number
  aboActiv: AbonamentPentruSold | null
}

function consumaSedinta(s: SedintaPentruSold): boolean {
  if (typeof s.consuma_sedinta === 'boolean') return s.consuma_sedinta
  return s.prezent === true
}

export function calculeazaSoldCursant(
  cursantId: string,
  abonamente: AbonamentPentruSold[],
  sedinte: SedintaPentruSold[],
): SoldCursant {
  const aboCursant = abonamente.filter(a => a.cursant_id === cursantId)
  const aboActiv = aboCursant.find(a => a.activ) ?? null
  const sedintePlate = aboCursant.reduce((sum, a) => sum + a.sedinte_incluse, 0)
  const sedinteConsume = sedinte.filter(
    s => s.cursant_id === cursantId && consumaSedinta(s),
  ).length
  return {
    sedintePlate,
    sedinteConsume,
    sold: sedintePlate - sedinteConsume,
    aboActiv,
  }
}

/** Clasă Tailwind pentru sold: negativ / aproape epuizat / ok. */
export function culoareSold(sold: number): string {
  if (sold < 0) return 'text-red-600'
  if (sold <= 1) return 'text-amber-600'
  return 'text-emerald-600'
}
