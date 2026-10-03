# LECȚIA 1 — Introducere în C++ și primul program
**Modulul 1 · Bazele C++ · 2 ore**  
**Code Kids Play · Junior Coder**

> Azi scrii primul tău program în C++, îl rulezi și faci calculatorul să **afișeze** ce vrei tu: text, tabele și desene.  
> Proiect: **„Cartea mea de vizită”** + un desen din caractere · fișier: `Prenume_Nume_L1.cpp` (ex. `Ana_Pop_L1.cpp`)

---

## Obiectiv
La finalul orei știi să deschizi un fișier nou în mediul de programare, să scrii structura de bază a unui program C++, să îl compilezi și să afișezi pe ecran mai multe rânduri de text.  
**Minim:** un program care afișează cel puțin 4 rânduri, fiecare pe linia ei.  
**Ținta orei (Complet):** + tabel cu `\t`, ghilimele în text și un desen din caractere.

## De ce contează
Aproape tot ce face un program începe cu **afișarea** unui rezultat: un scor în joc, un meniu, un mesaj de eroare. Dacă știi să controlezi ce apare pe ecran, ai făcut primul pas spre orice program mai mare. C++ este folosit în jocuri, în sisteme de operare și în aplicații care trebuie să fie rapide, iar învățând de la început structura lui, o să o recunoști în fiecare program viitor.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Ce este C++ și cum ajunge un program la calculator |
| 10–25 | Pregătim mediul de lucru și deschidem un fișier nou |
| 25–50 | Primul program, linie cu linie (**Exemplele 1–2**) |
| 50–75 | Linie nouă: `\n` și `endl` (**Exemplele 3–6**) |
| 75–95 | Tab, ghilimele și bară oblică (**Exemplele 7–10**) |
| 95–115 | Desene din caractere (**Exemplele 11–16**) |
| 115–120 | Recap și temă |

*(Exercițiile din clasă le faci în timpul orei, între exemple. Detaliile sunt mai jos.)*

---

## 1. Ce este C++ și cum funcționează

**C++** este un limbaj de programare. Un program este o listă de instrucțiuni scrise într-un limbaj pe care omul îl poate citi, dar calculatorul nu îl înțelege direct.

Drumul unui program arată așa:

1. **Scrii** codul într-un fișier cu extensia `.cpp` (se numește *cod sursă*).
2. **Compilatorul** traduce codul în limbajul calculatorului. Dacă ai greșit ceva de scris, aici primești mesaje de eroare.
3. **Rulezi** programul și vezi rezultatul.

Limbajul a fost creat de **Bjarne Stroustrup**, pornind de la limbajul **C**. Se folosește la jocuri, sisteme de operare, aplicații pentru telefon și la olimpiadele de informatică din România.

> Dacă ai învățat deja Scratch: acolo trăgeai blocuri, aici le **scrii** cu tastatura. Ideile (instrucțiuni, ordine, repetare) sunt aceleași.

---

## 2. Pregătim mediul de lucru

Programul în care scrii, compilezi și rulezi codul se numește **IDE**. La atelier folosim **Code::Blocks**. Acasă poți folosi și un compilator online (de exemplu OnlineGDB), dacă nu ai instalat nimic.

### Pași pentru primul fișier (Code::Blocks)
1. Deschide **Code::Blocks**.
2. Mergi la **File → New → Empty File**.
3. Salvează imediat ca `Prenume_Nume_L1.cpp` (**File → Save file as…**). Extensia `.cpp` este obligatorie.
4. Scrie codul, apoi apasă **Build and Run** (tasta **F9**).

**Încearcă tu (3 min)**  
- [ ] Ai un fișier gol, salvat cu extensia `.cpp`  
- [ ] Știi unde este butonul **Build and Run**  
- [ ] Ți-ai scris numele în numele fișierului  

---

## 3. Primul program, linie cu linie

### Exemplul 1 — „Salut, lume!”

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Salut, lume!";
    return 0;
}
```

**Ieșire:**
```
Salut, lume!
```

| Linia | Cod | Ce face |
|-------|-----|---------|
| 1 | `#include <iostream>` | Aduce în program biblioteca pentru afișare și citire (`cout`, `cin`) |
| 2 | `using namespace std;` | Ne permite să scriem `cout` în loc de `std::cout` |
| 4 | `int main() {` | **Punctul de start.** Programul rulează ce se află între `{` și `}` |
| 5 | `cout << "Salut, lume!";` | Afișează textul dintre ghilimele |
| 6 | `return 0;` | Spune că programul s-a terminat fără probleme |
| 7 | `}` | Închide `main` |

Trei reguli pe care să le ții minte de acum:
- Fiecare instrucțiune se termină cu **`;`** (punct și virgulă).
- Textul de afișat se pune între **ghilimele drepte** `"…"`.
- C++ face diferență între litere mari și mici: `cout` este corect, `Cout` nu.

### Exemplul 2 — Același program, fără `using namespace std;`

```cpp
#include <iostream>

int main() {
    std::cout << "Salut, lume!";
    return 0;
}
```

Rezultatul este identic. Aici scriem `std::` în fața lui `cout`, pentru că nu am folosit linia `using namespace std;`. Noi vom folosi de obicei varianta scurtă, dar e bine să recunoști și varianta lungă când o vezi în alte coduri.

**Încearcă tu (5 min)**  
- [ ] Scrii Exemplul 1 **de mână**, fără copy-paste  
- [ ] Apeși **Build and Run** și vezi mesajul  
- [ ] Schimbi textul cu numele tău și rulezi din nou  

---

## 4. Linie nouă: `\n` și `endl`

### Exemplul 3 — Două afișări, dar lipite

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Imi place C++.";
    cout << "Programarea e distractiva.";
    return 0;
}
```

**Ieșire:**
```
Imi place C++.Programarea e distractiva.
```

`cout` **nu** trece singur pe rândul următor. Dacă vrei rânduri separate, trebuie să îi spui tu.

### Exemplul 4 — Linie nouă cu `\n`

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Imi place C++.\n";
    cout << "Programarea e distractiva.\n";
    return 0;
}
```

**Ieșire:**
```
Imi place C++.
Programarea e distractiva.
```

`\n` înseamnă „rând nou” (*new line*). Se scrie **în interiorul** ghilimelelor.

### Exemplul 5 — Linie nouă cu `endl`

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Prima linie" << endl;
    cout << "A doua linie" << endl;
    cout << "A treia linie" << endl;
    return 0;
}
```

`endl` face același lucru ca `\n`, dar se scrie **în afara** ghilimelelor, legat cu `<<`. Poți folosi oricare dintre ele; important este să fii consecvent în același program.

### Exemplul 6 — Linie goală și mai multe lucruri într-un singur `cout`

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Titlu" << endl << endl;
    cout << "Rand 1" << endl << "Rand 2" << endl;
    cout << "Gata!\n\n";
    cout << "Sfarsit";
    return 0;
}
```

**Ieșire:**
```
Titlu

Rand 1
Rand 2
Gata!

Sfarsit
```

Observă:
- `<<` poate lega mai multe bucăți într-un singur `cout`.
- Două `endl` (sau două `\n`) la rând lasă o **linie goală**.

**Încearcă tu (8 min)**  
- [ ] Rulezi Exemplele 3 și 4 și compari ce se afișează  
- [ ] Scrii 4 rânduri cu numele, clasa, școala și un hobby, fiecare pe linia lui  
- [ ] Lași o linie goală între nume și restul  

---

## 5. Caractere speciale (escape)

Unele caractere nu se pot scrie direct între ghilimele, așa că folosim o bară oblică `\` urmată de o literă.

| Secvență | Ce afișează |
|----------|-------------|
| `\n` | rând nou |
| `\t` | tab (un spațiu mare, pentru aliniere) |
| `\"` | ghilimele `"` |
| `\\` | o bară oblică `\` |

### Exemplul 7 — Tabel cu `\t`

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Nume\tClasa\tNota\n";
    cout << "Ana\t7A\t10\n";
    cout << "Ion\t7B\t9\n";
    return 0;
}
```

**Ieșire:**
```
Nume    Clasa   Nota
Ana     7A      10
Ion     7B      9
```

### Exemplul 8 — Ghilimele în text

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Profesorul a spus: \"Bravo!\"" << endl;
    return 0;
}
```

**Ieșire:**
```
Profesorul a spus: "Bravo!"
```

Fără bara `\` în fața ghilimelelor, compilatorul ar crede că textul s-a terminat și ar da eroare.

### Exemplul 9 — Bara oblică într-o cale de fișier

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Fisierul meu: C:\\CodeKids\\L1.cpp" << endl;
    return 0;
}
```

**Ieșire:**
```
Fisierul meu: C:\CodeKids\L1.cpp
```

Pentru a afișa o bară `\`, o scrii de două ori: `\\`.

### Exemplul 10 — Toate la un loc

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Folder:\tC:\\Jocuri\\Minecraft" << endl;
    cout << "Mesaj:\t\"Salut, CodeKids!\"" << endl;
    cout << "Status:\tGata" << endl;
    return 0;
}
```

**Ieșire:**
```
Folder: C:\Jocuri\Minecraft
Mesaj:  "Salut, CodeKids!"
Status: Gata
```

**Încearcă tu (8 min)**  
- [ ] Faci un tabel cu 3 coloane și 3 rânduri folosind `\t`  
- [ ] Afișezi o replică cu ghilimele, de exemplu: `Mama a zis: "Fa-ti tema!"`  
- [ ] Afișezi o cale de forma `D:\Poze\Vacanta`  

---

## 6. Desene din caractere

Aici începe partea creativă: desenezi cu litere și simboluri. Fiecare rând al desenului este un `cout` separat. Atenție la **spații**, pentru că ele poziționează desenul.

### Exemplul 11 — Pisică

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "  /\\_/\\" << endl;
    cout << " ( o.o )" << endl;
    cout << "  > ^ <" << endl;
    return 0;
}
```

**Ieșire:**
```
  /\_/\
 ( o.o )
  > ^ <
```

Urechile folosesc `\\` ca să apară o singură bară `\` pe ecran.

### Exemplul 12 — Brad

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "    *" << endl;
    cout << "   ***" << endl;
    cout << "  *****" << endl;
    cout << " *******" << endl;
    cout << "*********" << endl;
    cout << "    |" << endl;
    return 0;
}
```

### Exemplul 13 — Cutie cu chenar

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "+----------------+" << endl;
    cout << "|  CODE KIDS     |" << endl;
    cout << "|  Clasa: 7A     |" << endl;
    cout << "+----------------+" << endl;
    return 0;
}
```

**Ieșire:**
```
+----------------+
|  CODE KIDS     |
|  Clasa: 7A     |
+----------------+
```

Ca să iasă chenarul drept, fiecare rând trebuie să aibă **aceeași lungime**. Numără caracterele sau folosește un rând de `-` ca etalon.

### Exemplul 14 — Casă

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "     /\\" << endl;
    cout << "    /  \\" << endl;
    cout << "   /____\\" << endl;
    cout << "   | [] |" << endl;
    cout << "   |    |" << endl;
    cout << "   |_##_|" << endl;
    return 0;
}
```

### Exemplul 15 — Robot cu mesaj

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "   _____" << endl;
    cout << "  | o o |" << endl;
    cout << "  |  -  |   \"Salut! Sunt R2-CK.\"" << endl;
    cout << " /|_____|\\" << endl;
    cout << "  /     \\" << endl;
    return 0;
}
```

Aici ai combinat desen, ghilimele cu `\"` și bare `\\` într-un singur program.

### Exemplul 16 — Bilet de joc (proiect mic)

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "*************************" << endl;
    cout << "*      BILET JOC        *" << endl;
    cout << "*************************" << endl;
    cout << "* Jucator:\tAlex      *" << endl;
    cout << "* Nivel:\t3         *" << endl;
    cout << "* Scor:\t\t1250      *" << endl;
    cout << "*************************" << endl;
    cout << "  \"Mult succes!\"" << endl;
    return 0;
}
```

Dacă `\t` ți se pare că strică marginea din dreapta, e normal: lățimea unui tab depinde de ecran. Pentru chenare perfecte, folosește **spații** în loc de `\t`. Aceasta este o ocazie bună să încerci amândouă variantele și să vezi diferența.

**Încearcă tu (15 min)**  
- [ ] Desenezi un obiect nou (inimă, steag, mașină, copac) din minimum 4 rânduri  
- [ ] Tragi un chenar din `+`, `-` și `|` în jurul unui text  
- [ ] Combini un desen cu o replică între ghilimele  

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Cartea mea de vizită” (obligatoriu)
Afișează, fiecare pe linia lui:
1. Numele tău
2. Clasa și școala
3. Hobby-ul preferat
4. Jocul sau limbajul de programare preferat
5. O propoziție între ghilimele, de exemplu un motto

### Exercițiul B — Meniu cu tab-uri
Afișează un meniu aliniat:

```
1.  Start
2.  Ajutor
3.  Iesire
```

### Exercițiul C — Dialog
Afișează două replici, cu numele vorbitorului înainte:

```
Ana:  "Ai terminat tema?"
Ion:  "Inca nu, dar programez!"
```

### Exercițiul D — Desen propriu
Desenează o **inimă**, un **steag** sau o **mașină** din caractere, minimum 5 rânduri.

### Exercițiul E — CODEKIDS pe verticală
Afișează cuvântul **CODEKIDS** cu câte o literă pe fiecare rând, în două moduri:
- cu 8 instrucțiuni `cout`;
- cu **un singur** `cout`, folosind `\n` (sau `endl`) între litere.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Exercițiul A are minimum 5 rânduri  
- [ ] Ai cel puțin un desen din caractere  
- [ ] Ai folosit măcar o dată `\t`, `\"` și `\\`  
- [ ] Fișierul se numește `Prenume_Nume_L1.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Afișează un **calendar** pentru o lună, aliniat cu `\t`  
- [ ] Desenează un brad mai mare, de 8 rânduri  
- [ ] Afișează un **cartuș de joc** cu viață, scor și nivel, într-un chenar drept  
- [ ] Scrie un program care afișează propria ta **poveste de 6 rânduri**, cu un titlu și un dialog  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `expected ';'` | Ai uitat `;` la finalul instrucțiunii | `cout << "Salut";` |
| `'Cout' was not declared` | Litere mari greșite | `cout` (litere mici) |
| `'cout' was not declared` | Ai uitat `#include <iostream>` sau `using namespace std;` | Adaugă-le la început |
| Eroare la ghilimele | Ai folosit ghilimele curbe `“ ”` din Word sau din chat | Folosește `"` de la tastatură |
| Ghilimelele din text dispar sau dau eroare | Ai uitat `\` în fața lor | `\"` |
| Programul pornește și se închide imediat | Fereastra se închide după rulare | Rulează din **Build and Run** în Code::Blocks sau lasă fereastra să stea deschisă |
| Desenul e strâmb | Spații lipsă sau în plus la început de rând | Numără spațiile și compară rând cu rând |
| `\n` apare ca text pe ecran | L-ai scris în afara ghilimelelor | `cout << "Text\n";` |

**Cum citești o eroare:** compilatorul îți spune **linia** (de exemplu `main.cpp:6`) și o descriere. Începe întotdeauna cu **prima** eroare din listă; adesea celelalte dispar după ce o repari pe aceea.

---

## Recapitulare pe scurt

- Un program C++ are cel puțin: `#include <iostream>`, `using namespace std;` și `int main() { … return 0; }`.
- `cout << "text";` afișează text. Fiecare instrucțiune se termină cu `;`.
- `\n` și `endl` trec pe rândul următor.
- `\t` face tab, `\"` afișează ghilimele, `\\` afișează o bară.
- Spațiile din interiorul ghilimelelor contează la desene.

Încă nu am învățat: comentarii, variabile, `cin` și tipuri de date. Ele urmează în lecțiile 2–5.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău (scrise de mână, nu copiate).  
2. Scrie un program **„Despre mine”** cu minimum 6 rânduri, care folosește un tab și ghilimele.  
3. Desenează o scenă din 8–10 rânduri (de exemplu o casă cu brad și soare).  
4. **Bonus:** fă un „meniu de joc” cu chenar, titlu și 4 opțiuni.  
5. Salvează tot ca `Tema_L1_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 2
Învățăm **comentariile** (`//` și `/* */`), structura unui program și cum scrii cod pe care îl poate citi și altcineva.
