# CodeKids C++ — Curriculum 4 Module
**Vârsta țintă:** 12+ ani  
**Format:** 5 module × 10 lecții × ~2 ore  
**Total:** 50 lecții (~100 ore)

> Principiu: o idee nouă pe lecție, multe exemple, exerciții practice, probleme tip pbinfo (unde e cazul), proiect mic la final de modul.

---

## Vedere de ansamblu

| Modul | Titlu | Focus | Rezultat |
|-------|--------|--------|----------|
| **1** | Bazele C++ | Consolă, variabile, condiții | Programe scurte cu `cin`/`cout` și `if` |
| **2** | Bucle și vectori | Repetiție + date multiple | Probleme cu numărări, sume, array 1D (vectori „clasici”) |
| **3** | Funcții, string, algoritmi | Modularizare + text | Cod organizat, probleme mai complexe |
| **4** | Proiecte și autonomie | Fișiere, `std::vector`, structuri, proiecte | Mini-aplicații complete la consolă |
| **5** | Proiect RPG în consolă | Un singur joc, construit pe 10 lecții | Joc de aventură cu hartă, inventar, luptă și salvare |

---

# MODULUL 1 — Bazele C++
**Obiectiv:** să scrie programe simple, să citească date și să ia decizii.  
**Lecții full:** `lectii/cpp/modul1/` · Badge: **Junior Coder** · ~2h + Bonus/Provocare

| # | Titlu | Conținut | Proiect / exercițiu cheie |
|---|--------|----------|---------------------------|
| L1 | Introducere + primul program | Ce e C++, IDE, `cout`, `\n`, `endl`, escape | Card „Despre mine” + desen ASCII |
| L2 | Comentarii + structura programului | `//`, `/* */`, `#include`, `main`, namespace | Cod comentat corect |
| L3 | Variabile `int` | Declarare, afișare, reguli nume, `const` | Calculator sumă pe ecran |
| L4 | `cin` + operații aritmetice | `+ - * / %`, citire de la tastatură | Probleme tip pbinfo (sumă, produs, cât) |
| L5 | Tipuri de date | `double`, `char`, `bool`, `string`, ASCII | Convertor simplu / inițiale |
| L6 | Operatori relaționali + `if` | `< > <= >= == !=` | „Ești admis?” / temperatură |
| L7 | `if-else` și `else if` | Ramificații | Note, max dintre 2–3 numere |
| L8 | Operatori logici | `&& \|\| !`, intervale | Intervale, parole simple |
| L9 | `switch` | Meniuri, zile, opțiuni | Meniu restaurant / zilele săptămânii |
| L10 | Recapitulare Modul 1 | Mix L1–L9 | **Mini-proiect:** Quiz scor / calculator meniu |

**Temă tipică Modul 1:** 2–3 probleme pe lecție + refacerea exemplelor.

---

# MODULUL 2 — Bucle și vectori
**Obiectiv:** să repete acțiuni și să lucreze cu mai multe valori.

| # | Titlu | Conținut | Proiect / exercițiu cheie |
|---|--------|----------|---------------------------|
| L11 | Bucla `for` | Contor, start/stop/pas | Afișare 1..N, tabela înmulțirii |
| L12 | `for` — sumă, produs, numărare | Acumulatoare | Sumă numere, câte pare |
| L13 | Bucla `while` | Condiție, citire până la stop | Citire până la 0 |
| L14 | `do-while` + alegerea buclei | Meniuri, validare input | Meniu care se repetă |
| L15 | Nested loops | Pattern-uri, tabele | Triunghiuri din `*` |
| L16 | Array 1D — introducere | Declarare, index, citire/afișare | Vector de note |
| L17 | Parcurgere vector | Sumă, medie, min, max | Statistici clasă |
| L18 | Căutare în vector | Căutare liniară, numărare | „Există valoarea X?” |
| L19 | Sortare simplă (intro) | Swap, bubble/selecție pe scurt | Sortare note crescător |
| L20 | Recapitulare Modul 2 | Mix bucle + vectori | **Mini-proiect:** Catalog note |

---

# MODULUL 3 — Funcții, string, algoritmi
**Obiectiv:** să organizeze codul și să lucreze cu text + probleme mai grele.

| # | Titlu | Conținut | Proiect / exercițiu cheie |
|---|--------|----------|---------------------------|
| L21 | Funcții fără parametri | De ce modularizăm | `saluta()`, `deseneaza()` |
| L22 | Funcții cu parametri | Argumente | `afiseazaSuma(a,b)` |
| L23 | Funcții cu `return` | Valori returnate | `maxim`, `estePar`, `factorial` mic |
| L24 | String — bazele | `string`, lungime, index, concatenare | Palindrom simplu |
| L25 | String — căutare și litere | Parcurgere caracter cu caracter | Numără vocale |
| L26 | Algoritmi pe cifre | Extragere cifre, sumă cifre, oglindit | Probleme tip olimpiadă ușoară |
| L27 | Divizibilitate + numere prime (intro) | `%`, divizori | Este prim? |
| L28 | Numere aleatoare (`rand`) + probleme combinate | `rand()`, `srand(time(0))`, `%` pentru un interval, zar, monedă | Zar virtual + set pbinfo / antrenament |
| L29 | Debugging + stil de cod | Erori tipice, indentare, nume clare | Repară 5 programe greșite |
| L30 | Recapitulare Modul 3 | Mix | **Mini-proiect:** Generator parole (cu `rand`) / cifruri litere |

---

# MODULUL 4 — Proiecte și autonomie
**Obiectiv:** să construiască mini-aplicații complete și să lucreze independent.

| # | Titlu | Conținut | Proiect / exercițiu cheie |
|---|--------|----------|---------------------------|
| L31 | Fișiere text — citire și scriere | `ifstream`, `ofstream`, citire valori/linii, salvare rezultate | Citește note din fișier și scrie un raport |
| L32 | `vector` din STL | `#include <vector>`, `push_back`, `size()`, `[ ]`, parcurgere, `pop_back`, `clear` | Listă de note care crește fără limită |
| L33 | Structuri (`struct`) | Date grupate | Elev: nume + notă |
| L34 | `vector` de structuri | Listă de obiecte, adăugare, căutare, ștergere | Catalog cu nume + note |
| L35 | Meniuri + stare program | Loop principal, opțiuni | Schelet aplicație |
| L36 | Proiect A — Joc pe consolă | Logică joc, scor, reguli | Ghici numărul / X și 0 simplu |
| L37 | Proiect B — Magazin / inventar | CRUD simplu pe listă | Adaugă / listează / caută produs |
| L38 | Proiect C — Quiz educațional | Întrebări, scor, salvare | Quiz C++ cu scor în fișier |
| L39 | Optimizare + prezentare | Refactor, comentarii, demo | Pregătire prezentare |
| L40 | Showcase final | Prezentare proiecte | **Proiect final la alegere** |

---

# MODULUL 5 — Proiect RPG în consolă
**Obiectiv:** să construiască, lecție cu lecție, un joc de aventură complet, folosind tot ce a învățat.  
**Format:** un singur proiect pe 10 lecții; la finalul fiecărei lecții jocul **rulează** într-o versiune nouă.  
**Pre-cerință:** Modulele 1–4 (în special funcții, `vector`, `struct`, fișiere, `rand`). Badge: **RPG Creator**.

| # | Titlu | Conținut | Ce are jocul la final de lecție |
|---|--------|----------|----------------------------------|
| L41 | Ideea jocului + harta | Povestea, camere, meniu principal, planul proiectului | Meniu + harta desenată în consolă |
| L42 | Jucătorul (`struct`) | Nume, viață, scor, afișare stare | Jucător creat și afișat |
| L43 | Mișcarea între camere | `switch`, bucla principală, hartă cu camere | Te plimbi prin 5–6 camere |
| L44 | Obiecte și inventar | `vector`, adăugare/ștergere, afișare | Găsești și folosești obiecte |
| L45 | Monștri și luptă | `rand()`, funcții, tururi, viață | Luptă cu un monstru |
| L46 | Magazin și monede | Cumpărare/vânzare, validări | Magazin cu 4–5 produse |
| L47 | Misiuni și condiții de câștig | Stări, `bool`, mesaje finale | Poți câștiga sau pierde jocul |
| L48 | Salvare și încărcare | `ifstream`, `ofstream` | Continuă jocul de unde l-ai lăsat |
| L49 | Curățare cod + depanare | Funcții clare, comentarii, testare, bug-uri | Cod ordonat, fără erori |
| L50 | Prezentare + finalul jocului | Demo, feedback colegilor, îmbunătățiri | **Jocul final prezentat** |

**Reguli ale proiectului**
- Fiecare lecție se încheie cu o versiune funcțională salvată (`Joc_L41.cpp`, `Joc_L42.cpp`…).
- Elevul alege tema (fantasy, spațiu, pirați, școală etc.) și personalizează povestea și numele.
- Fără grafică: totul se desfășoară în consolă, ca să meargă pe orice calculator.

---

## Ritmul recomandat (12+ ani)

| Aspect | Recomandare |
|--------|-------------|
| Durată lecție | ~2 ore |
| Teorie | max 20–25 min |
| Practică | restul orei |
| Exemple pe lecție | 8–12 |
| Exerciții în clasă | 4–6 |
| Temă | 2–3 probleme + refacere exemple |
| Pauză mentală | 1 joc/desen ASCII sau challenge scurt / lecție |

### Pași pe vârste
- **12–13 ani:** ritm normal, mai multe desene/jocuri în Modulul 1 și probleme competitive ușoare în Modulele 2–3  
- **14+ ani:** mai multe probleme tip pbinfo, proiecte mai ambițioase în Modulul 4  

---

## Evaluare pe module

| Modul | Cum verifici |
|-------|----------------|
| 1 | Mini-test + proiect meniu/`if` |
| 2 | Catalog note (vector + bucle) |
| 3 | Set 5 probleme + mini-proiect string/funcții |
| 4 | Proiect final prezentat (10–15 min) |
| 5 | Joc RPG funcțional + demo (10–15 min) |

**Diploma / badge sugerat:**
- Modul 1 → *Junior Coder*
- Modul 2 → *Loop Master*
- Modul 3 → *Problem Solver*
- Modul 4 → *CodeKids Graduate*
- Modul 5 → *RPG Creator*

---

## Ce NU bagăm (încă) la 12+ ani

- Pointeri avansați  
- OOP greu (clase/moștenire detaliată)  
- STL complex (`map`, `set`, algoritmi) — eventual doar menționat; **`vector` se învață** în Modulul 4  
- Template-uri, smart pointers, multithreading  

> Focus: **logică + practică + încredere**, nu sintaxă avansată.

---

## Ordinea materialelor de scris

1. **Modul 1** — L1 (gata) → L2…L10  
2. **Modul 2** — L11…L20  
3. **Modul 3** — L21…L30  
4. **Modul 4** — L31…L40  

Fiecare lecție: plan 2h + exemple + exerciții + temă + preview lecția următoare (ca L1).

---

## Notă pentru profesor

- Dacă un grup e mai lent: împarte L7/L8 sau L16/L17 în câte 2 ședințe.  
- Dacă un grup e rapid: adaugă 1–2 probleme pbinfo bonus, nu sări concepte.  
- La finalul fiecărui modul: 1 lecție doar de recapitulare + proiect (L10, L20, L30, L40).

---

**Următorul pas:** scriem **L2** în același format ca L1 (markdown + PDF pe Desktop).
