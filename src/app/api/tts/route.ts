import { experimental_generateSpeech as generateSpeech } from 'ai'
import { google } from '@ai-sdk/google'
import { cursuri, lectii, module } from '@/lib/mockData'
import { getLectieMarkdown } from '@/lib/lectiiContent'
import { isMicExploratorCurs } from '@/lib/miciexploratori'
import { getCachedTtsUrl, saveTtsAudio } from '@/lib/tts/cache'
import { markdownToSpeechText, speechTextHash } from '@/lib/tts/speechText'

export const maxDuration = 120

/** Schimbă când schimbi ritmul/voce — invalidează cache-ul vechi */
const TTS_PROFILE = 'gemini-flash-kore-slow-v4-pauses'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursId = searchParams.get('cursId')?.trim()
  const lectieId = searchParams.get('lectieId')?.trim()

  if (!cursId || !lectieId) {
    return Response.json({ error: 'Lipsesc cursId sau lectieId.' }, { status: 400 })
  }

  if (!isMicExploratorCurs(cursId)) {
    return Response.json(
      { error: 'Ascultarea Gemini e disponibilă doar pentru Micii Exploratori (8–10 ani).' },
      { status: 403 },
    )
  }

  const curs = cursuri.find(c => c.id === cursId)
  const lectie = lectii.find(l => l.id === lectieId)
  const modul = lectie ? module.find(m => m.id === lectie.modul_id) : undefined

  if (!curs || !lectie || !modul || modul.curs_id !== cursId) {
    return Response.json({ error: 'Lecția nu a fost găsită.' }, { status: 404 })
  }

  const markdown = getLectieMarkdown(modul.id, lectie.ordine)
  if (!markdown) {
    return Response.json({ error: 'Lecția nu are încă text pe site.' }, { status: 404 })
  }

  const speechText = markdownToSpeechText(markdown, {
    titlu: lectie.titlu,
    ordine: lectie.ordine,
  })
  const hash = speechTextHash(`${TTS_PROFILE}\n${speechText}`)

  const cachedUrl = await getCachedTtsUrl(cursId, lectieId, hash)
  if (cachedUrl) {
    return Response.json({ url: cachedUrl, cached: true, hash })
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      {
        error:
          'Lipseste GOOGLE_GENERATIVE_AI_API_KEY. Adaugă cheia în Vercel / .env.local pentru Gemini TTS.',
        fallbackText: speechText,
      },
      { status: 503 },
    )
  }

  try {
    const result = await generateSpeech({
      model: google.speech('gemini-2.5-flash-preview-tts'),
      text: speechText,
      voice: 'Kore',
      instructions:
        'IMPORTANT: Speak VERY SLOWLY. ' +
        'Citește în română, clar, cald, pentru copii de 8–10 ani. ' +
        'Viteza: foarte lentă — ca un învățător care dictează, nu ca un adult care povestește rapid. ' +
        'Fă o pauză clară după fiecare propoziție. Silabește puțin mai larg. Nu accelera niciodată.',
    })

    const bytes = result.audio.uint8Array
    const url = await saveTtsAudio(cursId, lectieId, hash, bytes)

    return Response.json({ url, cached: false, hash })
  } catch (err) {
    console.error('[tts]', err)
    return Response.json(
      {
        error: 'Nu am putut genera vocea acum. Încearcă din nou peste puțin.',
        fallbackText: speechText,
      },
      { status: 502 },
    )
  }
}
