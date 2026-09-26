import { readFileSync, existsSync } from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const hash = params.get('hash')?.trim()
  const ext = params.get('ext') === 'wav' ? 'wav' : 'mp3'
  if (!hash || !/^[a-f0-9]{16}$/.test(hash)) {
    return new Response('Bad request', { status: 400 })
  }
  const file = path.join('/tmp', 'codekidsplay-tts', `${hash}.${ext}`)
  if (!existsSync(file)) return new Response('Not found', { status: 404 })
  const buf = readFileSync(file)
  return new Response(buf, {
    headers: {
      'Content-Type': ext === 'wav' ? 'audio/wav' : 'audio/mpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
