import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import ContactForm from '@/components/ContactForm'

const MAP_LAT = '45.699011'
const MAP_LNG = '27.181703'
/** Embed pe coordonate (Clădirea RIX) — `?q=adresă&output=embed` cade pe glob. */
const MAP_EMBED = `https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=17&hl=ro&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_LAT},${MAP_LNG}`

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--ckp-foam)] text-[var(--ckp-ink)]">
      <header className="px-5 sm:px-8 lg:px-12 py-5 flex items-center justify-between border-b border-[var(--ckp-ink)]/10">
        <BrandLogo size="nav" href="/" />
        <Link href="/" className="text-sm font-medium text-[var(--ckp-blue)] hover:underline">
          Înapoi la site
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <h1
          className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Contact
        </h1>
        <p className="text-[var(--ckp-muted)] text-lg max-w-xl mb-12">
          Scrie-ne, sună-ne sau vino direct la atelier.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-14">
          <div>
            <h2
              className="text-lg font-semibold mb-3 text-[var(--ckp-ink)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Date de contact
            </h2>
            <ul className="space-y-4 text-[var(--ckp-ink-soft)]">
              <li className="flex gap-3 items-start">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--ckp-blue)]/10 text-[var(--ckp-blue)]"
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <div>
                  <span className="block text-sm text-[var(--ckp-muted)] mb-0.5">Telefon</span>
                  <a href="tel:+40736830830" className="text-[var(--ckp-blue)] hover:underline font-medium">
                    0736 830 830
                  </a>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--ckp-purple)]/10 text-[var(--ckp-purple)]"
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </span>
                <div>
                  <span className="block text-sm text-[var(--ckp-muted)] mb-0.5">Email</span>
                  <a
                    href="mailto:codekidsplay@gmail.com"
                    className="text-[var(--ckp-blue)] hover:underline font-medium"
                  >
                    codekidsplay@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--ckp-red)]/10 text-[var(--ckp-red)]"
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <span className="block text-sm text-[var(--ckp-muted)] mb-0.5">Adresă</span>
                  <p className="font-medium text-[var(--ckp-ink)]">
                    Str. Republicii 16 bis, etaj 1
                    <br />
                    Clădirea RIX, Focșani
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2
              className="text-lg font-semibold mb-3 text-[var(--ckp-ink)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Trimite un mesaj
            </h2>
            <ContactForm />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
            <h2
              className="text-lg font-semibold text-[var(--ckp-ink)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Unde ne găsești
            </h2>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--ckp-blue)] hover:underline"
            >
              Deschide în Google Maps ↗
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[var(--ckp-ink)]/10 bg-white aspect-[21/9] min-h-[240px]">
            <iframe
              title="Harta Code Kids Play Focșani — Clădirea RIX"
              src={MAP_EMBED}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </main>
    </div>
  )
}
