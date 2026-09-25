import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'

export default function TermeniPage() {
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
          Termeni și condiții
        </h1>
        <p className="text-[var(--ckp-muted)] text-sm mb-10">
          Code Kids Play Focșani · Ultima actualizare: septembrie 2026
        </p>

        <div className="space-y-8 text-[var(--ckp-ink-soft)] text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              1. Cine suntem și date de contact
            </h2>
            <p>
              Prezentul document stabilește termenii și condițiile de participare la cursurile și atelierele
              educative de programare, robotică și tehnologie organizate sub marca <strong>Code Kids Play</strong> în Focșani,
              precum și regulile de utilizare a platformei digitale dedicate elevilor și părinților.
            </p>
            <p className="mt-2">
              <strong>Locație atelier:</strong> Str. Republicii 16 bis, etaj 1, Clădirea RIX, Focșani, județul Vrancea.<br />
              <strong>Email:</strong>{' '}
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
              2. Definiții
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Prestator / Atelier:</strong> Code Kids Play Focșani.</li>
              <li><strong>Beneficiar / Cursant:</strong> copilul sau adolescentul participant la cursuri.</li>
              <li><strong>Reprezentant legal / Client:</strong> părintele sau tutorele legal al cursantului, persoana adultă care efectuează înscrierea și achită contravaloarea serviciilor.</li>
              <li><strong>Platformă:</strong> aplicația web Code Kids Play dedicată evidenței progresului, temelor practice, materialelor de curs și comunicării cu părinții.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              3. Înscrierea și politica de livrare a cursurilor
            </h2>
            <p>
              Înscrierea la ateliere sau la ședințele demonstrative se realizează de către reprezentantul legal prin
              completarea formularului online, telefonic sau direct la sediul atelierului.
            </p>
            <p className="mt-2">
              În urma confirmării înscrierii și achitării primei tranșe / abonamentului, reprezentantul legal primește
              pe email sau WhatsApp detaliile necesare începerii cursului: orarul exact, grupa alocată, adresa atelierului,
              instrucțiunile de acces și datele de autentificare pe platformă (username și PIN elev).
            </p>
            <p className="mt-2">
              <strong>Echipamente de lucru:</strong> La orele cu prezență fizică, cursanții lucrează exclusiv pe calculatoarele
              și stațiile de lucru asigurate în atelier. Nu se lucrează de pe telefon sau tabletă.
            </p>
            <p className="mt-2">
              <strong>Software educativ:</strong> Programele și mediile de dezvoltare utilizate (Scratch, Python, VS Code,
              Blender, Tinkercad, Roblox Studio, Arduino IDE etc.) sunt instrumente educaționale gratuite sau open-source.
              Instalarea lor pe calculatoarele de acasă nu necesită costuri de licențiere din partea părinților.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              4. Organizarea grupelor și programa modulară
            </h2>
            <p>
              Grupele sunt constituite dintr-un număr de 6 până la 10 cursanți (maximum 12 în cazuri speciale),
              repartizați în funcție de categoria de vârstă și nivelul de experiență:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Micii Exploratori (8–10 ani):</strong> robotică LEGO WeDo 2.0, Scratch, micro:bit, Tinkercad 3D.</li>
              <li><strong>Micii Creatori Digitali (10–12 ani):</strong> HTML/CSS/JS, Python, micro:bit Python, modelare Blender.</li>
              <li><strong>Micii Programatori (12+ ani):</strong> C++, Arduino, Unity (C#), Roblox Studio (Lua).</li>
            </ul>
            <p className="mt-2">
              Numărul optim pentru desfășurarea unei grupe este de minimum 6 cursanți. În cazul în care o grupă nu întrunește
              acest număr, ne rezervăm dreptul de a propune reprogramarea orarului sau comasarea cu o grupă compatibilă,
              cu acordul prealabil al părinților.
            </p>
            <p className="mt-2">
              Programa este structurată modular, permițând elevilor parcurgerea ritmică a fiecărui modul și posibilitatea
              de a relua traseul educațional fără dificultate în cazul unei pauze temporare.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              5. Abonamente, tarife și pachete de ședințe
            </h2>
            <p>
              Participarea la atelierele Code Kids Play se realizează în baza abonamentelor structurate pe număr de ședințe
              (fiecare ședință de atelier are o durată de <strong>2 ore de lucru intensiv / practic</strong>). Rezervarea fermă
              a locului în grupă este garantată prin achitarea pachetului ales.
            </p>
            <div className="mt-3 bg-[var(--ckp-sand)]/40 border border-[var(--ckp-ink)]/10 rounded-xl p-4 space-y-2 text-sm">
              <p className="font-semibold text-[var(--ckp-ink)]">Pachetele de abonament disponibile:</p>
              <ul className="space-y-1.5 list-disc pl-5">
                <li>
                  <strong>Abonament 4 ședințe (8 ore):</strong> 350 lei <span className="text-[var(--ckp-muted)]">(echivalent ~43,75 lei / ora de programare)</span>
                </li>
                <li>
                  <strong>Abonament 8 ședințe (16 ore):</strong> 700 lei + <strong>1 ședință BONUS inclusă (2 ore gratuite)</strong> <span className="text-[var(--ckp-muted)]">(echivalent ~38,8 lei / ora de programare)</span>
                </li>
                <li>
                  <strong>Abonament 12 ședințe (24 ore):</strong> 1.050 lei + <strong>2 ședințe BONUS incluse (4 ore gratuite)</strong> <span className="text-[var(--ckp-muted)]">(echivalent ~37,5 lei / ora de programare)</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-[var(--ckp-ink)]/10 text-xs text-[var(--ckp-ink-soft)] space-y-1">
                <p>🎁 <strong>Bonus Recomandare:</strong> +1 ședință gratuită (2 ore) pentru fiecare prieten recomandat care se înscrie la cursuri.</p>
              </div>
            </div>
            <p className="mt-3">
              Abonamentul se achită la începutul fiecărui ciclu de ședințe (până la data de 8 a lunii sau la epuizarea pachetului anterior).
              Depășirea termenului de plată cu mai mult de 10 zile calendaristice poate atrage eliberarea locului în grupă
              către un alt solicitant aflat pe lista de așteptare.
            </p>
            <p className="mt-2">
              Modalitățile de plată acceptate sunt transferul bancar (ordin de plată), plata cu cardul sau numerar la sediu.
              Pentru plățile cu cardul nu se percepe niciun comision suplimentar. Evidența ședințelor rămase și a bonusurilor
              acumulate este actualizată transparent în contul de elev/părinte de pe platformă.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              6. Calendar, sărbători legale și compensarea ședințelor
            </h2>
            <p>
              Atelierul nu ține cursuri în zilele declarate oficial sărbători legale naționale (de ex. 1 Decembrie,
              vacanța de iarnă Crăciun/Revelion, zilele de Paște, 1 Mai etc.).
            </p>
            <p className="mt-2">
              Abonamentul lunar are o valoare fixă pe parcursul anului școlar. Lunile de curs care au 3 săptămâni
              (datorită vacanțelor sau sărbătorilor legale) sunt compensate în mod natural de lunile cu 5 săptămâni din an,
              asigurând o medie echilibrată a ședințelor efectuate pe termen mediu și lung.
            </p>
            <p className="mt-2">
              Vacanțele școlare oficiale și sărbătorile legale nu modifică și nu diminuează valoarea abonamentului lunar constant.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              7. Prezență, absențe și sistemul de recuperare
            </h2>
            <p>
              În cazul în care cursantul nu poate participa la o ședință, părintele are obligația de a anunța atelierul
              cu cel puțin 24 de ore înainte (sau în dimineața zilei respective în situații medicale neprevăzute).
            </p>
            <p className="mt-2">
              <strong>Recuperarea se realizează prin următoarele canale:</strong>
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                <strong>Platforma online de suport:</strong> Cursantul are acces gratuit permanent cu username și PIN la
                lecția parcursă, codul sursă, provocările practice și materialele didactice pentru a exersa în ritm propriu de acasă.
              </li>
              <li>
                <strong>Recuperare la atelier:</strong> În măsura locurilor disponibile în alte grupe similare de nivel,
                elevul poate participa la o ședință de recuperare, cu programare prealabilă agreată cu instructorul.
              </li>
            </ul>
            <p className="mt-2">
              Ședințele la care elevul absentează fără notificare prealabilă se consideră efectuate și nu se pot recupera fizic.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              8. Politica de renunțare, retragere și rambursare
            </h2>
            <p>
              <strong>Înainte de începerea cursului:</strong> În cazul în care reprezentantul legal solicită renunțarea la curs
              înainte de participarea la prima ședință (în termen de maximum 14–30 de zile de la efectuarea plății în avans),
              contravaloarea achitată va fi rambursată integral în contul bancar indicat în cererea scrisă.
            </p>
            <p className="mt-2">
              <strong>Motive tehnice sau organizatorice:</strong> Dacă un curs nu se poate desfășura din motive imputabile
              organizatorului (probleme tehnice, indisponibilitate grupă) și nu se convine o reprogramare, sumele achitate
              în avans pentru ședințele neefectuate se restituie integral.
            </p>
            <p className="mt-2">
              <strong>Ședințe deja efectuate:</strong> Contravaloarea ședințelor la care cursantul a participat deja nu este returnabilă.
            </p>
            <p className="mt-2">
              <strong>Retragere voluntară pe parcursul modulului:</strong> Dacă reprezentantul legal decide retragerea cursantului
              în cursul unui modul achitat, se poate restitui contravaloarea ședințelor viitoare neefectuate, după reținerea unei taxe
              administrative de procesare și rezervare a locului în valoare de 100 lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              9. Siguranța în atelier și utilizarea responsabilă a echipamentelor
            </h2>
            <p>
              Code Kids Play pune la dispoziția fiecărui copil calculatoare performante, kituri modulare de robotică
              (LEGO WeDo 2.0), plăci de dezvoltare (BBC micro:bit, Arduino), senzori și componente conexe.
            </p>
            <p className="mt-2">
              Cursanții sunt instruiți și ghidați să utilizeze echipamentele cu atenție și respect. În situația excepțională
              în care un cursant deteriorează în mod intenționat sau din neglijență gravă un echipament hardware, reprezentantul
              legal poate fi invitat să suporte costul remedierii sau al piesei deteriorate.
            </p>
            <p className="mt-2">
              În atelier încurajăm cooperarea, curiozitatea și respectul reciproc. Comportamentele agresive sau perturbatoare
              repetate care împiedică buna desfășurare a orelor nu sunt tolerate și pot conduce la întreruperea accesului la curs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              10. Preluarea minorilor
            </h2>
            <p>
              Părinții sau tutorii legali au responsabilitatea de a asigura sosirea punctuală a copiilor la curs și
              preluarea acestora de la sediul atelierului imediat la finalizarea orei.
            </p>
            <p className="mt-2">
              În cazul în care părintele dorește ca minorul să vină sau să plece neînsoțit de la atelier, va completa
              un acord scris prealabil în care își asumă responsabilitatea deplasării copilului.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              11. Proprietate intelectuală și materiale media (Foto / Video)
            </h2>
            <p>
              <strong>Creațiile elevilor:</strong> Toate proiectele, jocurile, animațiile și programele create de copii
              în cadrul atelierului rămân proprietatea lor intelectuală.
            </p>
            <p className="mt-2">
              <strong>Materialele atelierului:</strong> Structura cursurilor, suporturile didactice, aplicațiile demonstrative
              și conținutul platformei sunt proprietatea Code Kids Play și sunt destinate exclusiv învățării individuale,
              fiind interzisă reproducerea sau comercializarea lor fără acord scris.
            </p>
            <p className="mt-2">
              <strong>Materiale foto/video:</strong> În cadrul atelierelor se pot realiza ocazional fotografii sau scurte
              materiale video pentru documentarea proiectelor, evaluarea calității didactice sau promovare pe canalele
              oficiale (site, Facebook, Instagram, TikTok). Acestea se realizează <em>exclusiv cu acordul prealabil exprimat
              de reprezentantul legal</em> la înscriere. Nicio imagine nu va fi folosită într-un mod care să aducă atingere demnității copilului.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              12. Protecția datelor cu caracter personal (GDPR)
            </h2>
            <p>
              Code Kids Play respectă cu strictețe confidențialitatea datelor dumneavoastră și ale copilului, în conformitate
              cu Regulamentul General privind Protecția Datelor (RGPD - Regulamentul UE 2016/679).
            </p>
            <p className="mt-2">
              Datele colectate (nume părinte, telefon, email, nume și vârstă copil) sunt utilizate exclusiv pentru organizarea
              grupelor, transmiterea notificărilor legate de orar, emiterea documentelor fiscale și acordarea accesului pe platformă.
              Pentru detalii complete, consultați pagina noastră dedicată de{' '}
              <Link href="/confidentialitate" className="text-[var(--ckp-blue)] hover:underline">
                Politică de Confidențialitate
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--ckp-ink)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              13. Reclamații, conciliere și soluționarea litigiilor
            </h2>
            <p>
              Echipa noastră depune toate eforturile pentru ca experiența fiecărui copil și a părinților să fie una excelentă.
              Dacă aveți orice nelămurire sau sesizare, vă rugăm să ne contactați direct pe email la{' '}
              <a href="mailto:codekidsplay@gmail.com" className="text-[var(--ckp-blue)] hover:underline">
                codekidsplay@gmail.com
              </a>{' '}
              sau telefonic la{' '}
              <a href="tel:+40736830830" className="text-[var(--ckp-blue)] hover:underline">
                0736 830 830
              </a>, iar situația va fi soluționată cu prioritate pe cale amiabilă.
            </p>
            <p className="mt-2">
              În cazul în care doriți să apelați la autoritățile competente, aveți acces la mecanismele oficiale:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" className="text-[var(--ckp-blue)] hover:underline">
                  Autoritatea Națională pentru Protecția Consumatorilor (ANPC)
                </a>
              </li>
              <li>
                <a href="https://anpc.ro/ce-este-sol/" target="_blank" rel="noopener noreferrer" className="text-[var(--ckp-blue)] hover:underline">
                  Platforma SOL (Soluționarea Online a Litigiilor)
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
