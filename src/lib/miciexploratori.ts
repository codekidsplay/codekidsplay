import { grupeVarsta } from '@/lib/mockData'

/** Cursuri din banda Micii Exploratori (8–10 ani): Lego, Scratch, micro:bit, Tinkercad */
export const MICI_EXPLORATORI_CURS_IDS = grupeVarsta.find(g => g.id === '8-10')?.curs_ids ?? [
  'c6',
  'c7',
  'c8',
  'c9',
]

export function isMicExploratorCurs(cursId: string): boolean {
  return (MICI_EXPLORATORI_CURS_IDS as readonly string[]).includes(cursId)
}
