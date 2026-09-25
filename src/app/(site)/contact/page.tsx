import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import ContactForm from '@/components/ContactForm'

const MAP_EMBED =
  'https://www.google.com/maps?q=Strada+Republicii+16+bis,+Foc%C8%99ani&output=embed'

const channels = [
  {
    label: 'Telefon / WhatsApp',
    value: '0736 830 830',
    href: 'tel:+40736830830',
    secondaryHref: 'https://wa.me/40736830830',
    secondaryLabel: 'WhatsApp',
    tone: 'var(--ckp-blue)',
    toneSoft: 'rgba(8,64,200,0.1)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'codekidsplay@gmail.com',
    href: 'mailto:codekidsplay@gmail.com',
    tone: 'var(--ckp-purple)',
    toneSoft: 'rgba(136,32,184,0.1)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    label: 'Atelier',
    value: 'Str. Republicii 16 bis, etaj 1 · Clădirea RIX, Focșani',
    href: 'https://maps.google.com/?q=Strada+Republicii+16+bis,+Focșani',
    tone: 'var(--ckp-red)',
    toneSoft: 'rgba(248,48,48,0.1)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
] as const

export default function ContactPage() {
  return (
    <div className="min-h-screen text-[var(--ckp-ink)] relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            'radial-gradient(ellipse 80% 50% at 10% -10%, rgba(8,64,200,0.14), transparent 55%)',
            'radial-gradient(ellipse 60% 40% at 90% 5%, rgba(136,32,184,0.12), transparent 50%)',
            'radial-gradient(ellipse 50% 35% at 70% 90%, rgba(248,48,48,0.08), transparent 55%)',
            'linear-gradient(180deg, #eef3f9 0%, var(--ckp-foam) 38%, #f5f7fb 100%)',
          ].join(', '),
        }}
      />

      <header className="px-5 sm:px-8 lg:px-12 py-5 flex items-center justify-between">
        <BrandLogo size="nav" href="/" />
        <Link
          href="/"
          className="text-sm font-medium text-[var(--ckp-ink-soft)] hover:text-[var(--ckp-blue)] transition-colors"
        >
          Înapoi la site
        </Link>
      </header>

      <main>
        {/* Brand-led intro */}
        <section className="px-5 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-12 sm:pb-16 max-w-5xl mx-auto">
          <p
            className="ckp-fade-up text-[var(--ckp-blue)] text-sm font-semibold tracking-wide mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Code Kids Play · Focșani
          </p>
          <h1
            className="ckp-fade-up-delay text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.1] mb-4 max-w-xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Hai să vorbim.
          </h1>
          <p className="ckp-fade-up-delay-2 text-[var(--ckp-muted)] text-lg sm:text-xl max-w-lg leading-relaxed">
            Locuri în grupe, orar sau o vizită la atelier — sună, scrie pe WhatsApp sau lasă-ne un mesaj.
          </p>
        </section>

        {/* Channels + form */}
        <section className="px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] gap-12 lg:gap-16 items-start">
            <div className="ckp-fade-up space-y-8">
              <div>
                <h2
                  className="text-xl font-semibold mb-6 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Unde ne găsești rapid
                </h2>
                <ul className="space-y-6">
                  {channels.map(ch => (
                    <li key={ch.label} className="flex gap-4 items-start">
                      <span
                        className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                        style={{ background: ch.toneSoft, color: ch.tone }}
                        aria-hidden
                      >
                        {ch.icon}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <span className="block text-sm text-[var(--ckp-muted)] mb-1">{ch.label}</span>
                        <a
                          href={ch.href}
                          target={ch.href.startsWith('http') ? '_blank' : undefined}
                          rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-semibold text-[var(--ckp-ink)] hover:text-[var(--ckp-blue)] transition-colors break-words"
                        >
                          {ch.value}
                        </a>
                        {'secondaryHref' in ch && ch.secondaryHref ? (
                          <a
                            href={ch.secondaryHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 inline-flex text-sm font-medium text-[var(--ckp-blue)] hover:underline"
                          >
                            {ch.secondaryLabel} ↗
                          </a>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-[var(--ckp-muted)] leading-relaxed border-t border-[var(--ckp-ink)]/8 pt-6">
                Răspundem de obicei în aceeași zi în timpul săptămânii. Pentru înscriere, e util să ne spui vârsta
                copilului și atelierul care te interesează.
              </p>
            </div>

            <div className="ckp-fade-up-delay">
              <h2
                className="text-xl font-semibold mb-2 tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Scrie-ne
              </h2>
              <p className="text-[var(--ckp-muted)] text-sm mb-6 leading-relaxed">
                Completează formularul — se deschide email-ul tău cu mesajul pregătit.
              </p>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Full-bleed map */}
        <section className="relative">
          <div className="px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto mb-4 sm:mb-5">
            <h2
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Pe hartă
            </h2>
            <p className="text-sm text-[var(--ckp-muted)] mt-1">Clădirea RIX · Str. Republicii 16 bis, etaj 1</p>
          </div>
          <div className="w-full h-[min(52vh,420px)] min-h-[260px] border-y border-[var(--ckp-ink)]/8 bg-[var(--ckp-mist)]">
            <iframe
              title="Harta Code Kids Play Focșani"
              src={MAP_EMBED}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        <footer className="px-5 sm:px-8 lg:px-12 py-8 text-center text-sm text-[var(--ckp-muted)]">
          <Link href="/" className="hover:text-[var(--ckp-blue)] transition-colors">
            ← Code Kids Play
          </Link>
        </footer>
      </main>
    </div>
  )
}
