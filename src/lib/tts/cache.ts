import { head, put } from '@vercel/blob'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

const TMP_DIR = path.join('/tmp', 'codekidsplay-tts')

function blobPath(cursId: string, lectieId: string, hash: string) {
  return `tts/${cursId}/${lectieId}/${hash}.wav`
}

function tmpPath(cursId: string, lectieId: string, hash: string) {
  return path.join(TMP_DIR, `${cursId}_${lectieId}_${hash}.wav`)
}

export async function getCachedTtsUrl(
  cursId: string,
  lectieId: string,
  hash: string,
): Promise<string | null> {
  const pathname = blobPath(cursId, lectieId, hash)

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const meta = await head(pathname)
      if (meta?.url) return meta.url
    } catch {
      // miss
    }
  }

  const local = tmpPath(cursId, lectieId, hash)
  if (existsSync(local)) {
    return `/api/tts/file?cursId=${encodeURIComponent(cursId)}&lectieId=${encodeURIComponent(lectieId)}&hash=${hash}`
  }

  return null
}

export async function saveTtsAudio(
  cursId: string,
  lectieId: string,
  hash: string,
  audio: Uint8Array,
): Promise<string> {
  const pathname = blobPath(cursId, lectieId, hash)

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(pathname, Buffer.from(audio), {
      access: 'public',
      contentType: 'audio/wav',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return blob.url
  }

  await mkdir(TMP_DIR, { recursive: true })
  const local = tmpPath(cursId, lectieId, hash)
  await writeFile(local, Buffer.from(audio))
  return `/api/tts/file?cursId=${encodeURIComponent(cursId)}&lectieId=${encodeURIComponent(lectieId)}&hash=${hash}`
}

export async function readLocalTtsFile(
  cursId: string,
  lectieId: string,
  hash: string,
): Promise<Buffer | null> {
  const local = tmpPath(cursId, lectieId, hash)
  if (!existsSync(local)) return null
  return readFile(local)
}
