/**
 * Abonament „Autodidact” — reguli pure (fără acces la baza de date).
 *
 *  - 1 modul, toate lecțiile deschise din prima zi, 30 de zile.
 *  - Preț: 200 lei (primul modul), 150 lei (al doilea), 100 lei (al treilea și următoarele).
 *  - Reducerea se aplică dacă modulul următor se cumpără în cel mult 5 zile de la expirarea
 *    celui precedent (lanț neîntrerupt); altfel prețul revine la 200 lei.
 */

export const ZILE_ACCES = 30
export const ZILE_TOLERANTA = 5
/** Prețul în funcție de poziția în lanț: 0 = primul, 1 = al doilea, 2+ = următoarele. */
export const PRETURI_AUTODIDACT = [200, 150, 100] as const

export type IntervalAcces = { data_start: string; data_sfarsit: string }

const MS_ZI = 86_400_000

function ms(iso: string): number {
  return Date.parse(`${iso}T00:00:00Z`)
}

export function adaugaZile(iso: string, zile: number): string {
  return new Date(ms(iso) + zile * MS_ZI).toISOString().slice(0, 10)
}

/** Zile întregi de la `a` la `b` (b − a). */
export function diferentaZile(a: string, b: string): number {
  return Math.round((ms(b) - ms(a)) / MS_ZI)
}

/** Ultima zi de acces: 30 de zile inclusiv ziua plății. */
export function dataSfarsitAcces(dataStart: string): string {
  return adaugaZile(dataStart, ZILE_ACCES - 1)
}

export function esteActiv(a: IntervalAcces, azi: string): boolean {
  return a.data_start <= azi && azi <= a.data_sfarsit
}

export function zileRamase(a: IntervalAcces, azi: string): number {
  return Math.max(0, diferentaZile(azi, a.data_sfarsit) + 1)
}

/**
 * Câte module consecutive (fără pauză > 5 zile) preced cumpărarea din `dataCumparare`.
 * 0 → prima cumpărare / lanț întrerupt, 1 → al doilea modul, 2+ → următoarele.
 */
export function lungimeLant(accesuri: IntervalAcces[], dataCumparare: string): number {
  const sortate = [...accesuri].sort((x, y) => y.data_sfarsit.localeCompare(x.data_sfarsit))
  if (sortate.length === 0) return 0

  // Ultimul acces trebuie să fie încă valid sau expirat de cel mult 5 zile
  if (diferentaZile(sortate[0].data_sfarsit, dataCumparare) > ZILE_TOLERANTA) return 0

  let lant = 1
  for (let i = 1; i < sortate.length; i++) {
    const curent = sortate[i - 1]
    const precedent = sortate[i]
    if (diferentaZile(precedent.data_sfarsit, curent.data_start) > ZILE_TOLERANTA) break
    lant++
  }
  return lant
}

export function pretAutodidact(accesuri: IntervalAcces[], dataCumparare: string): {
  pret: number
  lant: number
  motiv: string
} {
  const lant = lungimeLant(accesuri, dataCumparare)
  const pret = PRETURI_AUTODIDACT[Math.min(lant, PRETURI_AUTODIDACT.length - 1)]
  const motiv =
    lant === 0
      ? accesuri.length === 0
        ? 'Primul modul autodidact'
        : `Pauză de peste ${ZILE_TOLERANTA} zile de la ultimul modul — preț întreg`
      : lant === 1
        ? `Al doilea modul consecutiv (în maxim ${ZILE_TOLERANTA} zile de la expirare)`
        : `Modul consecutiv nr. ${lant + 1}`
  return { pret, lant, motiv }
}
