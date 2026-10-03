export const cursuri = [
  { id: 'c1', nume: 'C++', descriere: 'Programare în C++ de la zero', culoare: '#2563EB' },
  { id: 'c2', nume: 'Arduino', descriere: 'Electronică și programare cu Arduino', culoare: '#F59E0B' },
  { id: 'c3', nume: 'Blender', descriere: 'Modelare 3D cu Blender', culoare: '#7C3AED' },
  { id: 'c4', nume: 'Python', descriere: 'Programare Python - teorie și jocuri', culoare: '#3776AB' },
  { id: 'c5', nume: 'HTML CSS JavaScript', descriere: 'Site-uri de la zero: HTML, CSS și JavaScript', culoare: '#10B981' },
  { id: 'c6', nume: 'Robotică Lego WeDo 2.0', descriere: 'Robotică cu LEGO WeDo 2.0 — construcție + programare vizuală (2 module)', culoare: '#DC2626' },
  { id: 'c7', nume: 'Scratch', descriere: 'Programare vizuală cu Scratch — jocuri și povești', culoare: '#F97316' },
  { id: 'c8', nume: 'micro:bit', descriere: 'BBC micro:bit — MakeCode (blocuri) + Python pe placă (3 module)', culoare: '#00A86B' },
  { id: 'c9', nume: 'Tinkercad 3D', descriere: 'Design 3D simplu cu Tinkercad — forme, print și creativitate', culoare: '#0EA5E9' },
  { id: 'c10', nume: 'micro:bit Python', descriere: 'Python pe micro:bit — senzori, LED și proiecte pe placă', culoare: '#8B5CF6' },
  { id: 'c11', nume: 'Unity', descriere: 'Jocuri 3D cu Unity — scene, scripturi și proiecte interactive', culoare: '#64748B' },
  { id: 'c12', nume: 'Roblox Studio', descriere: 'Jocuri pe Roblox cu Luau — pentru 12+: Studio, scripturi, scor și publicare', culoare: '#E11D48' },
]

/** Iconuri pe cardurile de landing (opțional) */
export const cursIconLanding: Record<string, string> = {
  c1: '/icons/cpp.png',
  c2: '/icons/arduino.png',
  c3: '/icons/blender.png',
  c4: '/icons/python.png',
  c5: '/icons/html.png',
  c6: '/icons/lego.png',
  c7: '/icons/scratch.png',
  c8: '/icons/microbit.png',
  c9: '/icons/tinkercad.png',
  c10: '/icons/microbit-python.png',
  c11: '/icons/unity.png',
  c12: '/icons/roblox.png',
}

/** Grupe vârstă pe landing — un curs poate apărea în mai multe benzi */
export const grupeVarsta = [
  {
    id: '8-10',
    label: 'Micii Exploratori (8–10 ani)',
    blurb: 'Primii pași în tehnologie prin joacă logică, gândire creativă și construcții\u00A0interactive.',
    curs_ids: ['c6', 'c7', 'c8', 'c9'],
  },
  {
    id: '10-14',
    label: 'Micii Creatori Digitali (10–12 ani)',
    blurb: 'De la joacă la proiecte reale: site-uri web, programe în Python, gadgeturi inteligente și modele\u00A03D.',
    curs_ids: ['c5', 'c4', 'c10', 'c3'],
  },
  {
    id: '14plus',
    label: 'Micii Programatori (12+ ani)',
    blurb: 'Proiecte și autonomie: C++, Arduino, Unity și Roblox Studio.',
    curs_ids: ['c1', 'c2', 'c11', 'c12'],
  },
] as const

export const cursBlurbLanding: Record<string, string> = {
  c1: 'Logică, algoritmi și primul limbaj serios, de la „Hello World” la proiecte pe consolă.',
  c2: 'LED-uri, senzori și circuite: electronica prinde viață sub mâinile lor.',
  c3: 'Modele 3D, materiale și animații simple într-un studio creativ.',
  c4: 'Sintaxă clară, jocuri și automatizări — perfect ca al doilea limbaj.',
  c5: 'De la pagină goală la site interactiv: HTML, CSS și JavaScript.',
  c6: 'Construim roboți interactivi cu motoare și senzori, apoi le dăm viață prin programare vizuală.',
  c7: 'Blocuri colorate, personaje animate și primele jocuri create de la zero.',
  c8: 'Matrice LED, senzori și radio: învățăm mai întâi cu blocuri vizuale, apoi trecem la Python pe placa fizică.',
  c9: 'Dezvoltăm gândirea spațială: învățăm să construim, să combinăm forme 3D și să proiectăm propriile modele pe calculator.',
  c10: 'Scriem Python direct pe micro:bit: LED, senzori și proiecte pe placa fizică.',
  c11: 'Jocuri și lumi 3D: învățăm crearea scenelor, fizica obiectelor și logica de joc în Unity (C#).',
  c12: 'Pentru 12+: Obby pas cu pas — construiești în Studio, apoi Luau, scor pe ecran și publici jocul.',
}

export const module = [
  // C++ — curriculum 4 module × 10 lecții (10–13 ani)
  { id: 'm1', curs_id: 'c1', nume: 'Modul 1 — Bazele C++', ordine: 1, badge: 'Junior Coder' },
  { id: 'm2', curs_id: 'c1', nume: 'Modul 2 — Bucle și vectori', ordine: 2, badge: 'Loop Master' },
  { id: 'm14', curs_id: 'c1', nume: 'Modul 3 — Funcții, string, algoritmi', ordine: 3, badge: 'Problem Solver' },
  { id: 'm15', curs_id: 'c1', nume: 'Modul 4 — Proiecte și autonomie', ordine: 4, badge: 'CodeKids Graduate' },
  // Arduino
  { id: 'm3', curs_id: 'c2', nume: 'Arduino Modul 1 - Introducere în electronică', ordine: 1 },
  { id: 'm4', curs_id: 'c2', nume: 'Arduino Modul 2 - Proiecte Arduino', ordine: 2 },
  // Blender
  { id: 'm5', curs_id: 'c3', nume: 'Blender Modul 1 - Modelare 3D', ordine: 1 },
  // Python
  { id: 'm6', curs_id: 'c4', nume: 'Python Modul 1 - Introducere în Python', ordine: 1 },
  { id: 'm7', curs_id: 'c4', nume: 'Python Modul 2 - Python Avansat', ordine: 2 },
  { id: 'm8', curs_id: 'c4', nume: 'Python Modul 3 - Jocuri cu Python', ordine: 3 },
  // HTML CSS JS
  { id: 'm9', curs_id: 'c5', nume: 'HTML Modul 1 - Introducere în HTML', ordine: 1 },
  { id: 'm10', curs_id: 'c5', nume: 'CSS Modul 2 - Stilizare cu CSS', ordine: 2 },
  { id: 'm11', curs_id: 'c5', nume: 'JavaScript Modul 3 - Programare web', ordine: 3 },
  // Robotică WeDo 2.0
  { id: 'm12', curs_id: 'c6', nume: 'Modul 1 — Construcție și senzori (WeDo 2.0)', ordine: 1, badge: 'Robot Starter' },
  { id: 'm13', curs_id: 'c6', nume: 'Modul 2 — Proiecte avansate (WeDo 2.0)', ordine: 2, badge: 'Robot Inventor' },
  // Scratch — 6 module × 10 lecții (8–10 ani; M5 și M6 = 10+)
  {
    id: 'm16',
    curs_id: 'c7',
    nume: 'Modul 1 — Primii pași',
    ordine: 1,
    badge: 'Scratch Starter',
    nivel: 'Starter',
    descriere: '9 proiecte noi + prezentare. Fiecare oră se închide cu ceva jucabil sau privibil.',
  },
  {
    id: 'm17',
    curs_id: 'c7',
    nume: 'Modul 2 — Logică',
    ordine: 2,
    badge: 'Logic Explorer',
    nivel: 'Explorer',
    descriere: '9 proiecte noi + polish pe labirint. Dacă, variabile, bucle și mesaje.',
  },
  {
    id: 'm18',
    curs_id: 'c7',
    nume: 'Modul 3 — Jocuri',
    ordine: 3,
    badge: 'Game Builder',
    nivel: 'Builder',
    descriere: '9 proiecte de joc + polish. Capstone: „Prinde obiectele”.',
  },
  {
    id: 'm19',
    curs_id: 'c7',
    nume: 'Modul 4 — Proiecte și autonomie',
    ordine: 4,
    badge: 'Scratch Creator',
    nivel: 'Creator',
    descriere: '6 proiecte: 1 joc Creator al tău (L1→L6→L7) + 5 antrenamente.',
  },
  {
    id: 'm28',
    curs_id: 'c7',
    nume: 'Modul 5 — Mecanici de joc · 10+ ani',
    ordine: 5,
    badge: 'Maestru de jocuri',
    nivel: 'Master',
    descriere: '6 antrenamente (gravitație, scroll, inamici…) + 1 proiect mare.',
  },
  {
    id: 'm20',
    curs_id: 'c7',
    nume: 'Modul 6 — Lume de cuburi · 10+ ani',
    ordine: 6,
    badge: 'Cube Crafter',
    nivel: 'Crafter',
    descriere: '1 proiect pe toate 10 lecțiile: lumea de cuburi (sparge, pune, craft).',
  },
  // micro:bit — 3 module × 10 lecții
  { id: 'm21', curs_id: 'c8', nume: 'Modul 1 — MakeCode (blocuri)', ordine: 1, badge: 'micro:bit Starter' },
  { id: 'm22', curs_id: 'c8', nume: 'Modul 2 — Proiecte (blocuri + radio)', ordine: 2, badge: 'micro:bit Maker' },
  { id: 'm23', curs_id: 'c8', nume: 'Modul 3 — Python pe micro:bit', ordine: 3, badge: 'micro:bit Coder' },
  // Roblox Studio — 4 module × 10 lecții (12+ ani; Obby pe verticală)
  { id: 'm24', curs_id: 'c12', nume: 'Modul 1 — Place Builder', ordine: 1, badge: 'Place Builder' },
  { id: 'm25', curs_id: 'c12', nume: 'Modul 2 — Script Starter', ordine: 2, badge: 'Script Starter' },
  { id: 'm26', curs_id: 'c12', nume: 'Modul 3 — Game Logic', ordine: 3, badge: 'Game Logic' },
  { id: 'm27', curs_id: 'c12', nume: 'Modul 4 — Game Creator', ordine: 4, badge: 'Roblox Creator' },
  // Tinkercad 3D — 5 module × 10 lecții (8–10; M5 Design Pro = 10+)
  {
    id: 'm29',
    curs_id: 'c9',
    nume: 'Modul 1 — Bazele Tinkercad',
    ordine: 1,
    badge: 'Shape Starter',
    descriere: '10 proiecte: de la căsuță și forme la insula în miniatură.',
  },
  {
    id: 'm30',
    curs_id: 'c9',
    nume: 'Modul 2 — Obiecte utile',
    ordine: 2,
    badge: 'Object Maker',
    descriere: '10 obiecte practice pentru birou, baie și acasă + proiect la alegere.',
  },
  {
    id: 'm31',
    curs_id: 'c9',
    nume: 'Modul 3 — Creativ și mecanic',
    ordine: 3,
    badge: 'Motion Maker',
    descriere: '10 proiecte cu piese mobile, îmbinări și un mecanism la final.',
  },
  {
    id: 'm32',
    curs_id: 'c9',
    nume: 'Modul 4 — Orașul nostru',
    ordine: 4,
    badge: 'City Builder',
    descriere: '10 lecții pe plăci: construiești zona ta din orașul comun.',
  },
  {
    id: 'm33',
    curs_id: 'c9',
    nume: 'Modul 5 — Design Pro · 10+ ani',
    ordine: 5,
    badge: 'Design Pro',
    descriere: '10 lecții tehnice: toleranțe, Codeblocks, Circuits · recomandat 10+.',
  },
]

const genLectii = (modulId: string, titluri: string[]) =>
  titluri.map((titlu, i) => ({ id: `${modulId}-l${i + 1}`, modul_id: modulId, titlu, ordine: i + 1, continut: null }))

export const lectii = [
  // C++ Modul 1 — Bazele
  ...genLectii('m1', [
    'Introducere + primul program',
    'Comentarii + structura programului',
    'Variabile int',
    'cin + operații aritmetice',
    'Tipuri de date',
    'Operatori relaționali + if',
    'if-else și else if',
    'Operatori logici',
    'switch',
    'Recapitulare Modul 1 — mini-proiect',
  ]),
  // C++ Modul 2 — Bucle și vectori
  ...genLectii('m2', [
    'Bucla for',
    'for — sumă, produs, numărare',
    'Bucla while',
    'do-while + alegerea buclei',
    'Nested loops',
    'Array 1D — introducere',
    'Parcurgere vector',
    'Căutare în vector',
    'Sortare simplă (intro)',
    'Recapitulare Modul 2 — catalog note',
  ]),
  // C++ Modul 3 — Funcții, string, algoritmi
  ...genLectii('m14', [
    'Funcții fără parametri',
    'Funcții cu parametri',
    'Funcții cu return',
    'String — bazele',
    'String — căutare și litere',
    'Algoritmi pe cifre',
    'Divizibilitate + numere prime',
    'Probleme combinate',
    'Debugging + stil de cod',
    'Recapitulare Modul 3 — mini-proiect',
  ]),
  // C++ Modul 4 — Proiecte
  ...genLectii('m15', [
    'Fișiere text — citire',
    'Fișiere text — scriere',
    'Structuri (struct)',
    'Vector de structuri',
    'Meniuri + stare program',
    'Proiect A — Joc pe consolă',
    'Proiect B — Magazin / inventar',
    'Proiect C — Quiz educațional',
    'Optimizare + prezentare',
    'Showcase final',
  ]),
  ...genLectii('m3', ['Ce este Arduino?', 'Primul program - LED Blink', 'Intrări digitale - buton', 'Semnale analogice', 'Senzor de temperatură', 'Display LCD', 'Motor servo', 'Senzor ultrasonic', 'Comunicare serială', 'Proiect final modul 1']),
  ...genLectii('m4', ['Proiect stație meteo', 'Proiect alarmă', 'Proiect mână robotică', 'Proiect joc reflexe', 'Proiect semafor inteligent', 'Proiect cântărire digitală', 'Comunicare Bluetooth', 'Proiect muzicuță', 'Proiect animație LED', 'Proiect final modul 2']),
  ...genLectii('m5', ['Interfața Blender', 'Navigare în 3D viewport', 'Modelare de bază - cuburi și sfere', 'Editare mesh', 'Modificatori', 'Materiale și culori', 'Iluminare și umbre', 'Animații simple', 'Randare', 'Proiect final - obiect 3D']),
  ...genLectii('m6', ['Ce este Python?', 'Instalare și primul program', 'Variabile și tipuri', 'Operatori și expresii', 'Input de la utilizator', 'Condiții if/elif/else', 'Bucle for și while', 'Liste și tupluri', 'Dicționare', 'Funcții']),
  ...genLectii('m7', ['Module și librării', 'Programare orientată pe obiecte', 'Fișiere I/O', 'Excepții și erori', 'List comprehensions', 'Lambda și map/filter', 'Biblioteca random', 'Biblioteca math', 'Introducere în turtle graphics', 'Proiect final modul 2']),
  ...genLectii('m8', ['Introducere în Pygame', 'Fereastra de joc', 'Forme și culori', 'Imagini și sprite-uri', 'Evenimente - tastatură și mouse', 'Mișcare și animație', 'Coliziuni', 'Sunet în jocuri', 'Scor și interfață', 'Proiect joc complet']),
  ...genLectii('m9', ['Ce este HTML?', 'Structura unei pagini', 'Titluri și paragrafe', 'Link-uri și imagini', 'Liste ordonate și neordonate', 'Tabele', 'Formulare', 'Div și span', 'HTML semantic', 'Mini site-ul meu']),
  ...genLectii('m10', ['Ce este CSS?', 'Selectori și proprietăți', 'Culori și fonturi', 'Box model', 'Flexbox', 'Grid layout', 'Poziționare', 'Animații CSS', 'Design responsiv', 'Stilizare mini site']),
  ...genLectii('m11', ['Ce este JavaScript?', 'Variabile și tipuri', 'Funcții', 'DOM - selectare elemente', 'DOM - modificare conținut', 'Evenimente click', 'Condiții și bucle', 'Arrays și metode', 'Fetch - date din internet', 'Mini joc interactiv']),
  ...genLectii('m12', [
    'Ce este WeDo 2.0? Hub + primul motor',
    'Motor: viteză, timp, direcție',
    'Senzor de înclinare',
    'Senzor de mișcare (distanță)',
    'Programe cu „dacă”',
    'Proiect: Vehiculul meu',
    'Proiect: Ventilator / elice',
    'Proiect: Creatura care reacționează',
    'Proiect combinat (motor + 2 senzori)',
    'Showcase + badge Robot Starter',
  ]),
  ...genLectii('m13', [
    'Recap M1 + misiunea Modulului 2',
    'Proiect: Braț / ridicător',
    'Proiect: Bariera / poarta automată',
    'Proiect: Alarmă / paznic',
    'Proiect: Împingător / sortare',
    'Doi senzori, un robot',
    'Provocare pe echipe (pistă)',
    'Debugging + optimizare',
    'Proiect final WeDo',
    'Showcase + badge Robot Inventor',
  ]),
  // Scratch Modul 1
  ...genLectii('m16', [
    'Primii pași + Cardul meu animat',
    'Lumea mea: 2 scene și costume',
    'Mișcare pe scenă',
    'Evenimente',
    'Blocuri de aspect',
    'Sunet',
    'Coordonate X și Y',
    'Repetă și așteaptă',
    'Mini-proiect: Personajul meu',
    'Recapitulare Modul 1 — completare + prezentare',
  ]),
  // Scratch Modul 2
  ...genLectii('m17', [
    'Dacă… atunci',
    'Dacă… altfel',
    'Detectare: atingere',
    'Taste și mouse',
    'Variabile: scor și vieți',
    'Operatori',
    'Forever și stop',
    'Mesaje între personaje',
    'Mini-proiect: Labirint',
    'Recapitulare Modul 2 — completare + prezentare',
  ]),
  // Scratch Modul 3
  ...genLectii('m18', [
    'Ideea de joc',
    'Coliziuni + feedback',
    'Scor pe scenă',
    'Vieți și Sfârșitul jocului',
    'Timer',
    'Nivele',
    'Clone',
    'Meniu de start',
    'Mini-proiect: Prinde obiectele',
    'Depanare și finisare',
  ]),
  // Scratch Modul 4 — proiecte concrete (fără „greu” în fiecare titlu)
  ...genLectii('m19', [
    'Pornești proiectul tău (motorul)',
    'Proiect: Poveste interactivă cu alegeri',
    'Proiect: Quiz pe runde',
    'Proiect: Clip pe acte',
    'Proiect: Labirint pe 2 nivele',
    'Proiectul tău — versiunea finală',
    'Depanare: găsești și repari greșelile',
    'Proiect: Felicitare pe scene',
    'Prezentare + insignă Scratch Creator',
    'Portofoliu Creator',
  ]),
  // Scratch Modul 5 — Mecanici de joc
  ...genLectii('m28', [
    'Gravitație și săritură',
    'Scroll / hărți extinse',
    'Inamici: patrulare și detecție',
    'Liste și inventar',
    'Blocuri proprii (My Blocks)',
    'Magazin cu monede',
    'Proiect mare — arhitectură și design',
    'Proiect mare — inamici, clone, coliziuni',
    'Proiect mare — joc complet',
    'Polish + prezentare + insignă Maestru de jocuri',
  ]),
  // Scratch Modul 6 — Lume de cuburi (începe cu punte de recap)
  ...genLectii('m20', [
    'Punte M5 + mișcare pe grilă',
    'Sparge blocuri (minat)',
    'Pune blocuri (construcție)',
    'Inventar (resurse pe scenă)',
    'Două zone / biomi',
    'Creatură / pericol + HP',
    'Crafting simplu (2→1)',
    'Misiune / obiectiv de victorie',
    'Meniu Start + instrucțiuni',
    'Polish + prezentare + insignă Cube Crafter',
  ]),
  // micro:bit Modul 1 — blocuri
  ...genLectii('m21', [
    'Intro MakeCode + flash',
    'Matrice LED 5×5',
    'Butoane A / B',
    'Variabile + input',
    'Dacă… atunci',
    'forever + pause',
    'Accelerometru',
    'Lumină + temperatură',
    'Proiect: joc mic pe LED',
    'Showcase + badge micro:bit Starter',
  ]),
  // micro:bit Modul 2 — proiecte blocuri
  ...genLectii('m22', [
    'Recap + misiunea Modulului 2',
    'Radio: două plăci',
    'Joc radio (2 jucători)',
    'Pini / LED extern',
    'Proiect: Alarmă inteligentă',
    'Proiect: Stație măsurători',
    'Proiect dublu: emițător + receptor',
    'Debug + optimizare',
    'Proiect final Maker',
    'Showcase + badge micro:bit Maker',
  ]),
  // micro:bit Modul 3 — Python
  ...genLectii('m23', [
    'De la blocuri la Python',
    'Display în Python',
    'Butoane în Python',
    'Variabile + if',
    'Senzori în Python',
    'Radio în Python',
    'Funcții (def)',
    'Port proiect M1/M2 → Python',
    'Proiect final Coder',
    'Showcase + badge micro:bit Coder',
  ]),
  // Roblox Modul 1 — Place Builder
  ...genLectii('m24', [
    'Studio + primul Place',
    'Explorer, Properties, Workspace',
    'Parts: forme, mutare, scalare',
    'Ancorare, materiale, culori',
    'Camera + Playtest',
    'Start (Spawn) + Finish',
    'Traseu Obby: platforme',
    'Checkpoint vizual (fără script)',
    'Mini-proiect: Lumea Obby',
    'Completare + prezentare + insignă Place Builder',
  ]),
  // Roblox Modul 2 — Script Starter
  ...genLectii('m25', [
    'Script vs LocalScript + print',
    'Client vs Server',
    'Variabile',
    'if / then / else',
    'Funcții simple',
    'Eveniment Touched',
    'ClickDetector',
    'for / while (simplu)',
    'Mini-proiect: ușă sau monedă',
    'Completare + prezentare + insignă Script Starter',
  ]),
  // Roblox Modul 3 — Game Logic
  ...genLectii('m26', [
    'leaderstats (scor pe jucător)',
    'GUI: scor pe ecran',
    'RemoteEvent (client → server)',
    'Serverul decide (securitate Minim)',
    'Checkpoint cu script',
    'Cădere / respawn',
    'Timer sau vieți',
    'Bucla de joc curată',
    'Mini-proiect: Obby + scor',
    'Completare + prezentare + insignă Game Logic',
  ]),
  // Roblox Modul 4 — Game Creator
  ...genLectii('m27', [
    'ModuleScript',
    'DataStore Minim',
    'NPC / inamic simplu',
    'Inventar sau shop (Minim) + securitate ca M3',
    'Polish: lumini, sunete, UI',
    'Playtest cu colegii',
    'Depanare + listă de bug-uri',
    'Pregătire publish',
    'Proiect final jucabil (Obby-ul tău)',
    'Publish + prezentare + insignă Roblox Creator',
  ]),
  // Tinkercad Modul 1 — Shape Starter
  ...genLectii('m29', [
    'Căsuța din forme simple',
    'Omul de zăpadă',
    'Fluturele simetric',
    'Bucata de brânză',
    'Ștampila cu text',
    'Barca cu pânze',
    'Racheta spațială',
    'Castelul cu creneluri',
    'Cana cu toartă',
    'Insula în miniatură — mini-proiect + feedback',
  ]),
  // Tinkercad Modul 2 — Object Maker
  ...genLectii('m30', [
    'Cuier de perete',
    'Suport pentru căști',
    'Cutie cu capac',
    'Rama foto',
    'Săpunieră cu scurgere',
    'Suport pentru periuțe',
    'Abajur cu decupaje',
    'Ghiveci cu farfurie',
    'Clemă pentru cabluri',
    'Obiect util la alegere — proiect de modul',
  ]),
  // Tinkercad Modul 3 — Motion Maker
  ...genLectii('m31', [
    'Roți dințate simple',
    'Mașinuță cu roți și axe',
    'Morișca de vânt',
    'Labirint cu bilă',
    'Puzzle 3D',
    'Set de piese de șah',
    'Zaruri personalizate',
    'Fortăreață cu pod mobil',
    'O atracție — carusel sau roată',
    'Proiect final de modul — mecanism la alegere',
  ]),
  // Tinkercad Modul 4 — City Builder
  ...genLectii('m32', [
    'Planul orașului',
    'Casa modulară',
    'Clădiri înalte',
    'Clădiri publice',
    'Străzi și intersecții',
    'Râul și podul',
    'Parcul',
    'Transport în oraș',
    'Detalii urbane',
    'Asamblare și prezentare — orașul comun',
  ]),
  // Tinkercad Modul 5 — Design Pro
  ...genLectii('m33', [
    'Precizie în modelare',
    'Import SVG',
    'Toleranțe pentru printare 3D',
    'Piese care se îmbină',
    'Cutie cu balama (print-in-place)',
    'Angrenaj funcțional',
    'Codeblocks I — forme prin cod',
    'Codeblocks II — obiect parametric',
    'Tinkercad Circuits — LED și Arduino simulat',
    'Produs complet — proiect final al cursului',
  ]),
]

export const cursanti: Array<{
  id: string
  nume: string
  prenume: string
  email_parinte: string
  telefon_parinte: string | null
  data_inscriere: string
  activ: boolean
}> = []

export const inscrieri: Array<{
  id: string
  cursant_id: string
  curs_id: string
  data_inscriere: string
}> = []

// Tipuri abonament
export type TipAbonament = 'lunar' | 'pachet'

export const abonamente: Array<{
  id: string
  cursant_id: string
  tip: TipAbonament
  sedinte_incluse: number   // total de predat (inclus bonus pachet)
  pret: number              // lei — Code Kids Play Focsani
  data_start: string
  data_sfarsit: string | null  // null = activ continuu (lunar)
  activ: boolean
}> = []

export const plati: Array<{
  id: string
  cursant_id: string
  abonament_id: string
  suma: number
  data_plata: string
  metoda: 'cash' | 'transfer' | 'card'
  nota: string | null
}> = []

// Ședințe (prezență)
export const sedinte: Array<{
  id: string
  cursant_id: string
  abonament_id: string
  data: string
  prezent: boolean
  nota: string | null
}> = []

export const progres: Array<{
  id: string
  cursant_id: string
  lectie_id: string
  bifat: boolean
  data_bifat: string | null
}> = []
