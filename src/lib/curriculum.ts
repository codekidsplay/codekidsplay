import { module } from '@/lib/mockData'

/** Primul modul (ordine) pentru un curs din curriculum-ul static. */
export function defaultModulPentruCurs(cursId: string): string | null {
  const list = module
    .filter(m => m.curs_id === cursId)
    .sort((a, b) => a.ordine - b.ordine)
  return list[0]?.id ?? null
}
