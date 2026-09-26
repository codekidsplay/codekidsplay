import { readLocalTtsFile } from '@/lib/tts/cache'
import { isMicExploratorCurs } from '@/lib/miciexploratori'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursId = searchParams.get('cursId')?.trim()
  const lectieId = searchParams.get('lectieId')?.trim()
  const hash = searchParams.get('hash')?.trim()

  if (!cursId || !lectieId || !hash) {
    return new Response('Parametri lipsă', { status: 400 })
  }
  if (!isMicExploratorCurs(cursId)) {
    return new Response('Forbidden', { status: 403 })
  }
  if (!/^[a-f0-9]{16}$/.test(hash)) {
    return new Response('Hash invalid', { status: 400 })
  }

  const buf = await readLocalTtsFile(cursId, lectieId, hash)
  if (!buf) return new Response('Not found', { status: 404 })

  return new Response(new Uint8Array(buf), {
    headers: {
      'Content-Type': 'audio/wav',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
