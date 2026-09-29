/** Etichetă de nivel lângă titlul modulului (ex. Starter). */
export default function ModulNivelBadge({ nivel }: { nivel?: string }) {
  if (!nivel) return null

  const styles: Record<string, string> = {
    Starter: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    Explorer: 'bg-sky-50 text-sky-700 ring-sky-100',
    Builder: 'bg-amber-50 text-amber-800 ring-amber-100',
    Creator: 'bg-orange-50 text-orange-700 ring-orange-100',
    Master: 'bg-slate-100 text-slate-700 ring-slate-200',
    Crafter: 'bg-slate-800 text-white ring-slate-800',
  }

  const tone = styles[nivel] ?? 'bg-slate-50 text-slate-600 ring-slate-100'

  return (
    <span
      className={`inline-flex items-center align-middle text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-md ring-1 ring-inset ${tone}`}
    >
      {nivel}
    </span>
  )
}
