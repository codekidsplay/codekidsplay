import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'

export default function ConfidentialitatePage() {
  return (
    <div className="min-h-screen bg-[var(--ckp-foam)] text-[var(--ckp-ink)]">
      <header className="px-5 sm:px-8 lg:px-12 py-5 flex items-center justify-between border-b border-[var(--ckp-ink)]/10">
        <BrandLogo size="nav" href="/" />
        <Link href="/" className="text-sm font-medium text-[var(--ckp-blue)] hover:underline">
          Înapoi la site
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <h1
          className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Notă de informare privind protecția datelor (GDPR)
        </h1>
        <p className="text-[var(--ckp-muted)] text-sm mb-10">
          Code Kids Play Focșani · Conform Regulamentului (UE) 2016/679 · Ultima actualizare: septembrie 2026
        </p>

        <div className="space-y-8 text-[var(--ckp-ink-soft)] text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              1. Cine suntem și calitatea de operator
            </h2>
            <p>
              Prezenta notă de informare explică modul în care <strong>Code Kids Play Focșani</strong> („noi”, „operatorul”),
              prelucrează datele cu caracter personal ale cursanților (copii și adolescenți) și ale reprezentanților lor legali
              (părinți sau tutori), cu respectarea Regulamentului General privind Protecția Datelor (RGPD / GDPR - Regulamentul UE 2016/679)
              și a legislației naționale aplicabile.
            </p>
            <p className="mt-2">
              <strong>Sediul atelierului:</strong> Str. Republicii 16 bis, etaj 1, Clădirea RIX, Focșani, jud. Vrancea.<br />
              <strong>Email de contact:</strong>{' '}
              <a href="mailto:codekidsplay@gmail.com" className="text-[var(--ckp-blue)] hover:underline">
                codekidsplay@gmail.com
              </a>
              <br />
              <strong>Telefon / WhatsApp:</strong>{' '}
              <a href="tel:+40736830830" className="text-[var(--ckp-blue)] hover:underline">
                0736 830 830
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              2. Ce date prelucrăm, scopurile și temeiurile legale
            </h2>
            <div className="space-y-4 mt-3">
              <div>
                <h3 className="font-semibold text-[var(--ckp-ink)]">
                  i. Înscrierea și derularea cursurilor / atelierelor practice
                </h3>
                <p className="text-sm mt-1">
                  <strong>Date prelucrate:</strong> Numele și prenumele părintelui/tutorelui, număr de telefon, adresă de email,
                  numele și prenumele copilului, data nașterii (vârsta) copilului, clasa/școala de proveniență (opțional), date necesare
                  facturării și evidenței abonamentului, eventuale mențiuni de sănătate sau cerințe speciale comunicate de părinte pentru siguranța la atelier.
                </p>
                <p className="text-sm mt-1">
                  <strong>Temei legal:</strong> Încheierea și executarea contractului / înscrierii la cursurile Code Kids Play (art. 6 alin. 1 lit. b din RGPD).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--ckp-ink)]">
                  ii. Accesul pe platforma online și evidența progresului
                </h3>
                <p className="text-sm mt-1">
                  <strong>Date prelucrate:</strong> Cont de elev (username, cod PIN securizat), module deblocate, prezență,
                  proiecte create și stadiul exercițiilor practice.
                </p>
                <p className="text-sm mt-1">
                  <strong>Temei legal:</strong> Executarea serviciului educațional contractat și interesul legitim de a asigura continuitatea învățării (art. 6 alin. 1 lit. b și f).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--ckp-ink)]">
                  iii. Îndeplinirea obligațiilor legale și financiare
                </h3>
                <p className="text-sm mt-1">
                  <strong>Date prelucrate:</strong> Nume, date de facturare, sume achitate, dovezi de plată și documente financiar-contabile.
                </p>
                <p className="text-sm mt-1">
                  <strong>Temei legal:</strong> Îndeplinirea unor obligații legale prevăzute de legislația fiscală și contabilă din România (art. 6 alin. 1 lit. c).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--ckp-ink)]">
                  iv. Păstrarea istoricului pentru reînscrieri facile
                </h3>
                <p className="text-sm mt-1">
                  În cazul în care elevul ia o pauză între module sau între anii școlari, păstrăm istoricul modulelor absolvite
                  pentru a permite reluarea fără efort a traseului adecvat de la punctul la care a rămas.
                </p>
                <p className="text-sm mt-1">
                  <strong>Temei legal:</strong> Consimțământul părintelui și interesul legitim reciproc (art. 6 alin. 1 lit. a și f).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--ckp-ink)]">
                  v. Comunicări informative, notificări de orar și noutăți
                </h3>
                <p className="text-sm mt-1">
                  Trimiterea de remindere privind orarul ședințelor, recuperările sau lansarea de noi module potrivite vârstei copilului.
                </p>
                <p className="text-sm mt-1">
                  <strong>Temei legal:</strong> Consimțământul părintelui sau interesul legitim pentru servicii conexe direct solicitate.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--ckp-ink)]">
                  vi. Materiale foto / video la atelier
                </h3>
                <p className="text-sm mt-1">
                  Fotografiile sau filmările ocazionale de la atelier (proiecte finale, lucru cu roboți, festivități de premiere)
                  se realizează și se publică <em>exclusiv pe baza consimțământului explicit</em> oferit de reprezentantul legal.
                </p>
                <p className="text-sm mt-1">
                  <strong>Temei legal:</strong> Consimțământul liber exprimat al părintelui (art. 6 alin. 1 lit. a).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              3. Sursa datelor
            </h2>
            <p>
              Majoritatea datelor sunt furnizate direct de către dumneavoastră prin completarea formularului de contact/înscriere,
              telefonic, prin email sau la sediul atelierului. Nu colectăm date personale despre minori din surse externe sau terțe părți.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              4. Destinatari și divulgarea datelor
            </h2>
            <p>
              Datele personale sunt confidențiale și nu sunt vândute, închiriate sau înstrăinate către terți în scopuri comerciale.
              Pentru buna funcționare a activității, datele pot fi transmise strict în măsura necesară către:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Furnizori de servicii contabile și de evidență financiară autorizați;</li>
              <li>Furnizori de procesare plăți securizate cu cardul (ex. procesatori bancari agreați), fără stocarea datelor cardului la nivelul atelierului;</li>
              <li>Furnizori de infrastructură cloud și găzduire sigură pentru platforma online;</li>
              <li>Autorități publice sau instanțe judecătorești, numai în cazurile strict prevăzute de lege.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              5. Transferuri internaționale
            </h2>
            <p>
              Datele personale sunt prelucrate și stocate în cadrul Uniunii Europene. Nu transferăm date cu caracter
              personal către țări terțe din afara Spațiului Economic European sau către organizații internaționale care nu
              asigură un nivel adecvat de protecție recunoscut prin decizii ale Comisiei Europene.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              6. Durata stocării datelor
            </h2>
            <p>
              Păstrăm datele cu caracter personal pe o perioadă adaptată fiecărui scop:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Date contractuale și de prezență:</strong> pe durata desfășurării cursului și ulterior pe perioada termenului de prescripție general de 3 ani de la finalizarea colaborării;</li>
              <li><strong>Documente contabile și facturi:</strong> pe perioada de 5 până la 10 ani impusă obligatoriu de legislația fiscală din România;</li>
              <li><strong>Date bazate pe consimțământ:</strong> până la retragerea consimțământului de către părinte.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              7. Drepturile dumneavoastră conform RGPD (GDPR)
            </h2>
            <p>
              În calitate de persoană vizată, beneficiați de drepturile garantate de Regulamentul General privind Protecția Datelor:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li><strong>Dreptul de acces:</strong> puteți solicita o copie a datelor personale prelucrate și detalii despre modul de utilizare;</li>
              <li><strong>Dreptul la rectificare:</strong> aveți dreptul de a corecta datele inexacte sau de a le completa pe cele incomplete;</li>
              <li><strong>Dreptul la ștergere („dreptul de a fi uitat”):</strong> puteți cere ștergerea datelor în măsura în care nu mai există temei legal pentru păstrarea lor;</li>
              <li><strong>Dreptul la restricționarea prelucrării:</strong> limitarea utilizării datelor în anumite circumstanțe prevăzute de lege;</li>
              <li><strong>Dreptul la portabilitatea datelor:</strong> primirea datelor furnizate într-un format structurat, utilizat în mod curent;</li>
              <li><strong>Dreptul de opoziție:</strong> dreptul de a vă opune prelucrării bazate pe interesul nostru legitim;</li>
              <li><strong>Dreptul de a retrage consimțământul:</strong> în orice moment, pentru activitățile bazate pe acord (fără a afecta legalitatea prelucrării efectuate anterior);</li>
              <li>
                <strong>Dreptul de a depune plângere:</strong> la Autoritatea Națională de Supraveghere a Prelucrării Datelor
                cu Caracter Personal (<a href="https://www.dataprotection.ro/" target="_blank" rel="noopener noreferrer" className="text-[var(--ckp-blue)] hover:underline">ANSPDCP</a>, B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, București).
              </li>
            </ul>
            <p className="mt-3">
              Pentru exercitarea oricărui drept, ne puteți trimite o solicitare la adresa de email{' '}
              <a href="mailto:codekidsplay@gmail.com" className="text-[var(--ckp-blue)] hover:underline">
                codekidsplay@gmail.com
              </a>. Răspundem prompt și fără taxe nejustificate în termenul legal de maximum 30 de zile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              8. Ce se întâmplă dacă refuzați furnizarea datelor?
            </h2>
            <p>
              Furnizarea datelor este voluntară. Totuși, refuzul de a furniza datele de identificare de bază (nume părinte,
              nume copil, telefon, email, vârstă elev) face imposibilă înscrierea și organizarea participării copilului
              la grupele de curs ale atelierului Code Kids Play.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              9. Contact și solicitări
            </h2>
            <p>
              Pentru orice întrebare referitoare la protecția datelor dumneavoastră și ale copilului dumneavoastră,
              suntem mereu disponibili:
            </p>
            <p className="mt-2">
              <strong>Code Kids Play Focșani</strong><br />
              Str. Republicii 16 bis, etaj 1, Clădirea RIX, Focșani<br />
              Email:{' '}
              <a href="mailto:codekidsplay@gmail.com" className="text-[var(--ckp-blue)] hover:underline">
                codekidsplay@gmail.com
              </a><br />
              Telefon: <a href="tel:+40736830830" className="text-[var(--ckp-blue)] hover:underline">0736 830 830</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
