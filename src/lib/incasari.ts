/** Helpers încasări lunare — Abonamente & Plăți */

export type PlataLike = {
  id: string
  cursant_id: string
  suma: number
  data_plata: string
  metoda: 'cash' | 'transfer' | 'card'
  nota: string | null
}

export const LUNI_RO = [
  'Ianuarie',
  'Februarie',
  'Martie',
  'Aprilie',
  'Mai',
  'Iunie',
  'Iulie',
  'August',
  'Septembrie',
  'Octombrie',
  'Noiembrie',
  'Decembrie',
] as const

export function defaultPerioadaDinPlati(plati: PlataLike[]): { luna: number; an: number } {
  if (plati.length > 0) {
    const latest = [...plati].sort((a, b) => b.data_plata.localeCompare(a.data_plata))[0]
    const d = new Date(latest.data_plata + 'T12:00:00')
    return { luna: d.getMonth(), an: d.getFullYear() }
  }
  const n = new Date()
  return { luna: n.getMonth(), an: n.getFullYear() }
}

export function filtreazaPlatiPerioada(
  plati: PlataLike[],
  luna: number,
  an: number,
): PlataLike[] {
  return plati.filter(p => {
    const d = new Date(p.data_plata + 'T12:00:00')
    return d.getMonth() === luna && d.getFullYear() === an
  })
}

export function totalSiPeMetode(plati: PlataLike[]) {
  const peMetode = { cash: 0, transfer: 0, card: 0 }
  let total = 0
  for (const p of plati) {
    total += p.suma
    peMetode[p.metoda] += p.suma
  }
  return { total, peMetode }
}

export function aniDisponibili(plati: PlataLike[]): number[] {
  const set = new Set<number>()
  const current = new Date().getFullYear()
  set.add(current)
  for (const p of plati) {
    set.add(new Date(p.data_plata + 'T12:00:00').getFullYear())
  }
  return [...set].sort((a, b) => b - a)
}

type CursantLike = { id: string; nume: string; prenume: string }

const esc = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Deschide dialogul print → Salvează ca PDF. */
export function descarcaPdfIncasari(opts: {
  luna: number
  an: number
  plati: PlataLike[]
  cursanti: CursantLike[]
}) {
  const { total, peMetode } = totalSiPeMetode(opts.plati)
  const perioada = `${LUNI_RO[opts.luna]} ${opts.an}`
  const rows = [...opts.plati]
    .sort((a, b) => a.data_plata.localeCompare(b.data_plata))
    .map(p => {
      const c = opts.cursanti.find(x => x.id === p.cursant_id)
      const nume = c ? `${c.prenume} ${c.nume}` : '—'
      const data = new Date(p.data_plata + 'T12:00:00').toLocaleDateString('ro-RO')
      return `<tr>
        <td>${data}</td>
        <td>${esc(nume)}</td>
        <td>${p.metoda}</td>
        <td style="text-align:right">${p.suma} lei</td>
        <td>${esc(p.nota ?? '')}</td>
      </tr>`
    })
    .join('')

  const html = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8" />
  <title>Încasări ${perioada} — Code Maker Club</title>
  <style>
    body { font-family: system-ui, sans-serif; color: #0f172a; padding: 32px; }
    h1 { font-size: 20px; margin: 0 0 4px; }
    .sub { color: #64748b; margin-bottom: 24px; font-size: 14px; }
    .sum { display: flex; gap: 24px; margin-bottom: 24px; font-size: 14px; }
    .sum strong { font-size: 18px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { border-bottom: 1px solid #e2e8f0; padding: 8px 6px; text-align: left; }
    th { color: #64748b; font-weight: 600; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <h1>Code Maker Club — Încasări</h1>
  <p class="sub">${perioada}</p>
  <div class="sum">
    <div>Total<br/><strong>${total} lei</strong></div>
    <div>Cash<br/><strong>${peMetode.cash} lei</strong></div>
    <div>Transfer<br/><strong>${peMetode.transfer} lei</strong></div>
    <div>Card<br/><strong>${peMetode.card} lei</strong></div>
    <div>Plăți<br/><strong>${opts.plati.length}</strong></div>
  </div>
  <table>
    <thead>
      <tr><th>Data</th><th>Cursant</th><th>Metodă</th><th style="text-align:right">Sumă</th><th>Notă</th></tr>
    </thead>
    <tbody>
      ${rows || '<tr><td colspan="5">Nicio plată în această perioadă.</td></tr>'}
    </tbody>
  </table>
</body>
</html>`

  // iframe ascuns: nu poate fi blocat ca pop-up
  const iframe = document.createElement('iframe')
  iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden'
  document.body.appendChild(iframe)
  const doc = iframe.contentDocument
  const win = iframe.contentWindow
  if (!doc || !win) {
    iframe.remove()
    alert('Nu s-a putut genera PDF-ul. Încearcă din alt browser.')
    return
  }
  doc.open()
  doc.write(html)
  doc.close()
  setTimeout(() => {
    win.focus()
    win.print()
    setTimeout(() => iframe.remove(), 60_000)
  }, 300)
}

/** Deschide dialogul print → Salvează ca PDF pentru activitatea unui profesor. */
export function descarcaPdfActivitateProfesor(opts: {
  luna: number
  an: number
  profesor: {
    nume: string
    email: string
    copii_inregistrati: number
    copii_asignati: number
    incasat: number
    nr_plati: number
    sedinte_incarcate: number
    sedinte_efectuate: number
  }
  evenimente: Array<{ tip: string; data: string; cursant: string; detalii: string; suma?: number }>
}) {
  const perioada = `${LUNI_RO[opts.luna]} ${opts.an}`
  const p = opts.profesor
  const tipLabel: Record<string, string> = {
    copil: 'Copil nou',
    plata: 'Încasare',
    incarcare: 'Ședințe încărcate',
    sedinta: 'Ședință efectuată',
  }
  const rows = opts.evenimente
    .map(e => {
      const data = new Date(e.data.length > 10 ? e.data : e.data + 'T12:00:00').toLocaleDateString('ro-RO')
      return `<tr>
        <td>${data}</td>
        <td>${esc(tipLabel[e.tip] ?? e.tip)}</td>
        <td>${esc(e.cursant)}</td>
        <td>${esc(e.detalii)}</td>
        <td style="text-align:right">${e.suma != null ? `${e.suma} lei` : ''}</td>
      </tr>`
    })
    .join('')

  const html = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8" />
  <title>Activitate ${esc(p.nume)} ${perioada} — Code Maker Club</title>
  <style>
    body { font-family: system-ui, sans-serif; color: #0f172a; padding: 32px; }
    h1 { font-size: 20px; margin: 0 0 4px; }
    .sub { color: #64748b; margin-bottom: 24px; font-size: 14px; }
    .sum { display: flex; flex-wrap: wrap; gap: 24px; margin-bottom: 24px; font-size: 14px; }
    .sum strong { font-size: 18px; }
    .sum small { color: #94a3b8; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { border-bottom: 1px solid #e2e8f0; padding: 8px 6px; text-align: left; }
    th { color: #64748b; font-weight: 600; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <h1>Code Maker Club — Activitate profesor</h1>
  <p class="sub">${esc(p.nume)}${p.email ? ` · ${esc(p.email)}` : ''} · ${perioada}</p>
  <div class="sum">
    <div>Copii înregistrați<br/><strong>${p.copii_inregistrati}</strong><br/><small>${p.copii_asignati} asignați în total</small></div>
    <div>Total încasat<br/><strong>${p.incasat} lei</strong><br/><small>${p.nr_plati} plăți</small></div>
    <div>Ședințe încărcate<br/><strong>${p.sedinte_incarcate}</strong></div>
    <div>Ședințe efectuate<br/><strong>${p.sedinte_efectuate}</strong></div>
  </div>
  <table>
    <thead>
      <tr><th>Data</th><th>Tip</th><th>Cursant</th><th>Detalii</th><th style="text-align:right">Sumă</th></tr>
    </thead>
    <tbody>
      ${rows || '<tr><td colspan="5">Nicio activitate în această lună.</td></tr>'}
    </tbody>
  </table>
</body>
</html>`

  const iframe = document.createElement('iframe')
  iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden'
  document.body.appendChild(iframe)
  const doc = iframe.contentDocument
  const win = iframe.contentWindow
  if (!doc || !win) {
    iframe.remove()
    alert('Nu s-a putut genera PDF-ul. Încearcă din alt browser.')
    return
  }
  doc.open()
  doc.write(html)
  doc.close()
  setTimeout(() => {
    win.focus()
    win.print()
    setTimeout(() => iframe.remove(), 60_000)
  }, 300)
}
