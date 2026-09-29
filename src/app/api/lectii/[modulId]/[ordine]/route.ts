import { NextResponse } from 'next/server'
import { getLectieMarkdown } from '@/lib/lectiiContent'

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ modulId: string; ordine: string }> },
) {
  const { modulId, ordine } = await ctx.params
  const n = parseInt(ordine, 10)
  if (!modulId || !Number.isInteger(n) || n < 1) {
    return NextResponse.json({ error: 'Parametri invalizi' }, { status: 400 })
  }
  const markdown = getLectieMarkdown(modulId, n)
  if (!markdown) {
    return NextResponse.json({ markdown: null })
  }
  return NextResponse.json({ markdown })
}
