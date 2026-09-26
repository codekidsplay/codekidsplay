import Link from 'next/link'
import Image from 'next/image'
import { cursuri, grupeVarsta, cursBlurbLanding, cursIconLanding } from '@/lib/mockData'
import BrandLogo from '@/components/BrandLogo'

const grupColors = ['var(--ckp-blue)', 'var(--ckp-purple)', 'var(--ckp-red)'] as const

export default function LandingPage() {
  return (
    <div className="bg-[var(--ckp-foam)] text-[var(--ckp-ink)]">
      {/* —— Hero —— */}
      <section className="relative min-h-[92svh] sm:min-h-[100svh] overflow-hidden">
        <Image
          src="/hero-codekids.jpg"
          alt="Copii la atelierele Code Kids Play"
          fill
          priority
          className="object-cover object-center ckp-ken"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 ckp-fade-in"
          style={{
            background: [
              'linear-gradient(105deg, rgba(12,31,43,0.58) 0%, rgba(12,31,43,0.38) 48%, rgba(12,31,43,0.22) 100%)',
              'linear-gradient(115deg, rgba(8,64,200,0.32) 0%, rgba(136,32,184,0.24) 50%, rgba(248,48,48,0.18) 100%)',
            ].join(', '),
          }}
        />

        <div className="relative z-10 min-h-[92svh] sm:min-h-[100svh] flex flex-col">
          <nav className="flex items-center justify-between px-5 sm:px-8 lg:px-12 py-5">
            <BrandLogo size="nav" href="/" priority />
            <Link
              href="/login"
              className="text-sm font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/35 px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              Intră în cont
            </Link>
          </nav>

          <div className="flex-1 flex flex-col justify-end px-5 sm:px-8 lg:px-12 pb-10 sm:pb-16 lg:pb-20 max-w-4xl">
            <p
              className="ckp-fade-up text-white text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Code Kids Play
            </p>
            <h1
              className="ckp-fade-up-delay text-white/95 text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight leading-snug max-w-xl mb-3"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Programare pentru copii, pe înțelesul lor.
            </h1>
            <p className="ckp-fade-up-delay text-[var(--ckp-muted-on-dark)] text-base sm:text-lg max-w-md mb-6 sm:mb-8 leading-relaxed">
              Ateliere în Focșani: Scratch, Python, C++, HTML/CSS, Arduino, Robotica Lego.
            </p>
            <div className="ckp-fade-up-delay-2 flex flex-col sm:flex-row gap-3 w-full sm:w-auto max-w-sm sm:max-w-none">
              <a
                href="#cursuri"
                className="inline-flex items-center justify-center bg-[var(--ckp-red)] hover:bg-[var(--ckp-red-deep)] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-center w-full sm:w-auto shadow-md"
              >
                Vezi cursurile
              </a>
              <Link
                href="/login"
                className="inline-flex items-center justify-center bg-white text-[var(--ckp-blue)] hover:bg-[var(--ckp-muted-on-dark)] font-semibold px-6 py-3.5 rounded-xl transition-colors text-center w-full sm:w-auto shadow-sm"
              >
                Login elev / părinte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* —— Cursuri pe vârstă —— */}
      <section id="cursuri" className="px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-20 sm:pb-28">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ce va învăța copilul tău
          </h2>
          <p className="text-[var(--ckp-muted)] text-lg max-w-xl mb-14">
            În funcție de vârstă, copilul poate începe unul din aceste ateliere.
          </p>

          <div className="space-y-16">
            {grupeVarsta.map((grup, gi) => {
              const accent = grupColors[gi % grupColors.length]
              const items = grup.curs_ids
                .map(id => cursuri.find(c => c.id === id))
                .filter(Boolean) as typeof cursuri

              return (
                <div key={grup.id}>
                  <h3
                    className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2"
                    style={{ color: accent, fontFamily: 'var(--font-display)' }}
                  >
                    {grup.label}
                  </h3>
                  <p className="text-[var(--ckp-muted)] text-base mb-8 max-w-2xl text-pretty">{grup.blurb}</p>

                  <ul className="grid sm:grid-cols-2 gap-4">
                    {items.map(c => {
                      const icon = cursIconLanding[c.id]
                      return (
                        <li
                          key={`${grup.id}-${c.id}`}
                          className="rounded-2xl border border-[var(--ckp-ink)]/10 bg-white p-5 hover:border-[var(--ckp-ink)]/20 transition-colors"
                        >
                          <div className="flex gap-4 items-start">
                            {icon ? (
                              <Image
                                src={icon}
                                alt=""
                                width={56}
                                height={56}
                                className="w-14 h-14 rounded-xl object-cover shrink-0"
                                unoptimized
                              />
                            ) : null}
                            <div className="min-w-0">
                              <p
                                className="text-lg font-semibold mb-2"
                                style={{ color: accent, fontFamily: 'var(--font-display)' }}
                              >
                                {c.nume}
                              </p>
                              <p className="text-[var(--ckp-ink-soft)] text-base leading-relaxed">
                                {cursBlurbLanding[c.id] ?? c.descriere}
                              </p>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* —— Cum merge —— */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 0% 0%, rgba(8,64,200,0.12), transparent), radial-gradient(ellipse 60% 50% at 100% 30%, rgba(136,32,184,0.12), transparent), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(248,48,48,0.08), transparent), #f7f9fc',
          }}
        />
        <div className="relative px-5 sm:px-8 lg:px-12 py-20 sm:py-28 max-w-5xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Cum învățăm
          </h2>
          <p className="text-[var(--ckp-muted)] text-lg max-w-lg mb-14">
            Clasă, acasă, progres — totul interconectat.
          </p>

          <ol className="grid sm:grid-cols-3 gap-10 sm:gap-8">
            {[
              {
                n: '01',
                t: 'În clasă',
                d: 'Lucrăm practic la atelier, iar instructorul bifează conceptele parcurse și evoluția fiecărui elev.',
                color: 'var(--ckp-blue)',
              },
              {
                n: '02',
                t: 'Acasă',
                d: 'Elevul se conectează simplu (username + PIN) pentru a continua proiectele și a exersa pe lecțiile deblocate.',
                color: 'var(--ckp-purple)',
              },
              {
                n: '03',
                t: 'Părinte',
                d: 'Monitorizezi în timp real din contul tău: vezi progresul pe module, proiectele create și ședințele rămase.',
                color: 'var(--ckp-red)',
              },
            ].map(step => (
              <li key={step.n}>
                <p
                  className="text-sm font-semibold tracking-widest mb-3"
                  style={{ color: step.color, fontFamily: 'var(--font-body)' }}
                >
                  {step.n}
                </p>
                <h3
                  className="text-xl font-semibold mb-2 text-[var(--ckp-ink)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {step.t}
                </h3>
                <p className="text-[var(--ckp-ink-soft)] text-base leading-relaxed">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* —— CTA —— */}
      <section
        className="px-5 sm:px-8 lg:px-12 py-20 sm:py-24 text-white"
        style={{
          background:
            'linear-gradient(135deg, var(--ckp-blue) 0%, var(--ckp-purple) 55%, var(--ckp-red) 120%)',
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Hai în atelier.
            </h2>
            <p className="text-white/95 text-lg max-w-md">
              Locuri limitate în grupe. Rezervă un loc sau contactează-ne pentru detalii.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-[var(--ckp-purple)] font-semibold px-6 py-3 rounded-xl hover:bg-[var(--ckp-muted-on-dark)] transition"
            >
              Contactează-ne
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center border-2 border-white text-white font-medium px-6 py-3 rounded-xl hover:bg-white/15 transition-colors"
            >
              Intră în cont
            </Link>
          </div>
        </div>
      </section>

      <footer
        className="px-5 sm:px-8 lg:px-12 py-8 border-t border-white/25 text-white text-sm grid grid-cols-1 sm:grid-cols-3 items-center gap-4"
        style={{ background: 'var(--ckp-blue-deep)' }}
      >
        <div className="flex items-center gap-4 justify-center sm:justify-start">
          <BrandLogo size="sm" href="/" />
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/codekidsplayfocsani/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/85 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/codekidsplayfocsani/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/85 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@code.kids.play.fo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-white/85 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13.2a8.27 8.27 0 004.78 1.51V11.3a4.85 4.85 0 01-1.2-.16v-4.45z" />
              </svg>
            </a>
          </div>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link
            href="/termeni"
            className="text-white/85 hover:text-white underline-offset-2 hover:underline"
          >
            Termeni
          </Link>
          <Link
            href="/confidentialitate"
            className="text-white/85 hover:text-white underline-offset-2 hover:underline"
          >
            Confidențialitate
          </Link>
          <a
            href="https://anpc.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/85 hover:text-white underline-offset-2 hover:underline"
          >
            ANPC
          </a>
          <a
            href="https://anpc.ro/ce-este-sol/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/85 hover:text-white underline-offset-2 hover:underline"
          >
            SOL
          </a>
        </nav>
        <span className="text-center sm:text-right">
          Code Kids Play Focșani · © {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  )
}
