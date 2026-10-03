# LECȚIA 2 — Comentarii și structura programului
**Modulul 1 · Bazele C++ · 2 ore**  
**Code Kids Play · Junior Coder**

> Azi înveți să scrii un program **ordonat**: cu structură clară, indentare corectă și comentarii care explică ce face codul.  
> Proiect: **„Programul meu comentat”** · fișier: `Prenume_Nume_L2.cpp` (ex. `Ana_Pop_L2.cpp`)

---

## Obiectiv
La finalul orei știi ce rol are fiecare parte a unui program C++, scrii comentarii cu `//` și `/* */`, folosești comentariile ca să oprești temporar o linie de cod și îți formatezi programele astfel încât să poată fi citite ușor.  
**Minim:** un program cu antet și minimum 3 comentarii utile.  
**Ținta orei (Complet):** + comentarii pe secțiuni, o linie dezactivată pentru test și explicarea pe foaie a fiecărei părți din structură.

## De ce contează
Un program nu este citit doar de calculator. Îl citești tu peste două săptămâni, când ai uitat ce ai vrut să faci, îl citește colegul de echipă și îl citește profesorul la olimpiadă. Comentariile și ordinea din cod fac diferența dintre un program pe care îl poți continua și unul pe care îl rescrii de la zero.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Recapitulare L1 și ce înseamnă „program complet” |
| 15–40 | Structura programului: `#include`, `using namespace std;`, `main`, `return 0` (**Exemplele 1–2**) |
| 40–70 | Comentarii `//` și `/* */` (**Exemplele 3–7**) |
| 70–95 | Indentare, spații și cod ordonat (**Exemplele 8–10**) |
| 95–115 | `return 0`, dezactivarea codului și mini-proiect (**Exemplele 11–14**) |
| 115–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L1

Din lecția trecută știi deja:
- cum arată un program minim și cum îl rulezi;
- `cout << "text";` afișează text;
- `\n` și `endl` trec pe rândul următor;
- `\t`, `\"` și `\\` sunt caractere speciale.

**Încearcă tu (3 min)**  
- [ ] Scrii de memorie un program care afișează numele tău pe două rânduri  
- [ ] Îl rulezi fără să te uiți în lecția anterioară  

---

## 2. Structura unui program C++

Orice program pe care îl scriem în acest modul are aceeași formă:

### Exemplul 1 — Scheletul unui program

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Structura mea de baza" << endl;
    return 0;
}
```

| Partea | Rolul ei |
|--------|----------|
| `#include <iostream>` | Aduce în program instrumentele pentru afișare și citire (`cout`, `cin`). Se scrie la început. |
| `using namespace std;` | Spune compilatorului unde să caute `cout`. Fără ea trebuie să scrii `std::cout`. |
| `int main()` | **Funcția principală.** Orice program pornește de aici, nu există program fără `main`. |
| `{` și `}` | Acoladele marchează începutul și sfârșitul blocului de cod din `main`. |
| `cout << …;` | O **instrucțiune**. Programul le execută una după alta, de sus în jos. |
| `return 0;` | Încheie `main` și anunță sistemul că totul a mers bine. |

Regula care se aplică peste tot: **fiecare instrucțiune se termină cu `;`**. Liniile `#include` și `int main()` nu au `;` la final.

### Exemplul 2 — Mai multe instrucțiuni, executate pe rând

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Pasul 1: pornesc" << endl;
    cout << "Pasul 2: lucrez" << endl;
    cout << "Pasul 3: termin" << endl;
    return 0;
}
```

**Ieșire:**
```
Pasul 1: pornesc
Pasul 2: lucrez
Pasul 3: termin
```

Programul merge **de sus în jos**, exact în ordinea în care ai scris instrucțiunile. Dacă schimbi ordinea liniilor, se schimbă și ce vezi pe ecran.

**Încearcă tu (5 min)**  
- [ ] Rulezi Exemplul 2 și apoi inversezi două linii. Ce s-a schimbat?  
- [ ] Explici pe foaie, cu cuvintele tale, rolul lui `main`  
- [ ] Știi să spui pe de rost cele 4 părți ale scheletului  

---

## 3. Comentariile

Un **comentariu** este text scris în program, pe care compilatorul îl **ignoră complet**. Este făcut pentru oamenii care citesc codul.

C++ are două feluri de comentarii:

| Tip | Cum se scrie | Când îl folosești |
|-----|--------------|-------------------|
| pe o linie | `// text` | Explicații scurte; tot ce urmează după `//` pe linia respectivă este ignorat |
| pe mai multe linii | `/* text */` | Explicații mai lungi; tot ce este între `/*` și `*/` este ignorat |

### Exemplul 3 — Comentariu pe o linie

```cpp
#include <iostream>
using namespace std;

int main() {
    // Aici afisez un salut
    cout << "Salut, programatorule!" << endl;
    return 0;
}
```

Comentariul nu apare pe ecran. Ieșirea este doar: `Salut, programatorule!`

### Exemplul 4 — Comentariu la capătul unei linii

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Nivel: 1" << endl;   // afisez nivelul curent
    cout << "Scor: 0" << endl;    // la inceput scorul este zero
    return 0;                     // programul s-a terminat bine
}
```

Comentariul poate sta și **după** cod, pe aceeași linie. Pentru claritate, aliniază-le frumos unele sub altele.

### Exemplul 5 — Comentariu pe mai multe linii

```cpp
#include <iostream>
using namespace std;

int main() {
    /* Acest program afiseaza
       un mesaj de bun venit.
       Il folosesc la lectia 2. */
    cout << "Bun venit la Code Kids Play!" << endl;
    return 0;
}
```

Tot ce se află între `/*` și `*/` este ignorat, indiferent câte rânduri ocupă. Atenție: **nu poți pune un `/* */` în interiorul altui `/* */`**. Primul `*/` închide comentariul, iar restul textului devine cod și dă eroare.

### Exemplul 6 — Antetul unui program

Pe primele rânduri ale unui program serios se scrie un **antet**: cine l-a făcut, când și ce face.

```cpp
/*
   Program: Fisa mea de jucator
   Autor:   Alex Popescu
   Data:    3 octombrie 2026
   Scop:    afiseaza datele unui jucator
*/
#include <iostream>
using namespace std;

int main() {
    cout << "Jucator: Alex" << endl;
    cout << "Nivel: 5" << endl;
    return 0;
}
```

### Exemplul 7 — Comentarii pe secțiuni

Când programul are mai multe părți, pune câte un comentariu înaintea fiecărei părți. Așa găsești rapid ce cauți.

```cpp
#include <iostream>
using namespace std;

int main() {
    // ----- Titlul -----
    cout << "=== MENIU ===" << endl;

    // ----- Optiunile -----
    cout << "1. Joc nou" << endl;
    cout << "2. Continua" << endl;
    cout << "3. Iesire" << endl;

    // ----- Final -----
    return 0;
}
```

### Ce comentăm și ce nu

Comentariile bune explică **de ce** sau **ce urmează să facă** o parte de cod. Comentariile care repetă exact ce se vede în cod sunt inutile.

| Comentariu inutil | Comentariu util |
|-------------------|-----------------|
| `// afisez text` pe fiecare linie | `// ----- Afisez meniul principal -----` |
| `// pun return 0` | `// programul se termina aici cu succes` |
| `// cout` | `// titlul jocului, apare in centru` |

**Încearcă tu (10 min)**  
- [ ] Adaugi un antet (nume, dată, scop) peste programul tău din L1  
- [ ] Pui minimum 3 comentarii pe secțiuni, nu pe fiecare linie  
- [ ] Scrii un comentariu pe mai multe linii care explică ce face programul  

---

## 4. Indentarea și ordinea în cod

Compilatorul nu ține cont de spații, de rânduri goale și de modul în care ai aliniat codul. Dar **omul** ține cont. De aceea respectăm trei reguli:

1. Ce se află în interiorul `{ }` se împinge spre dreapta cu **4 spații** (sau un Tab). Asta se numește **indentare**.
2. Fiecare instrucțiune stă pe **rândul ei**.
3. Între părțile programului lăsăm câte o **linie goală**.

### Exemplul 8 — Același program, scris urât și frumos

Varianta urâtă (dar corectă, compilatorul o acceptă):

```cpp
#include <iostream>
using namespace std;
int main(){cout<<"Salut";cout<<" lume";cout<<endl;return 0;}
```

Varianta frumoasă (același rezultat):

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Salut";
    cout << " lume";
    cout << endl;
    return 0;
}
```

Ambele afișează `Salut lume`. A doua se citește fără efort, iar o greșeală (un `;` uitat, o acoladă lipsă) se găsește mult mai ușor.

### Exemplul 9 — Rândurile goale despart ideile

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Nume: Ana" << endl;
    cout << "Clasa: 7A" << endl;

    cout << "Hobby: desen" << endl;
    cout << "Joc preferat: Minecraft" << endl;

    return 0;
}
```

Rândurile goale nu schimbă nimic la rulare. Ele separă „datele personale” de „preferințe” doar pentru ochiul celui care citește.

### Exemplul 10 — Fără `using namespace std;`

```cpp
#include <iostream>

int main() {
    std::cout << "Scriu std:: de fiecare data" << std::endl;
    std::cout << "Dar merge la fel de bine" << std::endl;
    return 0;
}
```

Aici, `std::` apare în fața fiecărui `cout` și `endl`. Este mai mult de scris, dar vei întâlni această formă în multe programe de pe internet. Tu poți folosi oricare variantă, atâta timp cât ești consecvent într-un program.

---

## 5. `return 0;` și comentarii ca instrument de test

### Exemplul 11 — Ce se întâmplă după `return 0;`

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Aceasta linie se vede." << endl;
    return 0;
    cout << "Aceasta linie nu se vede niciodata." << endl;
}
```

**Ieșire:**
```
Aceasta linie se vede.
```

`return 0;` încheie `main` pe loc. Instrucțiunile scrise după el nu mai sunt executate.

### Exemplul 12 — Dezactivez o linie cu `//`

Programatorii folosesc comentariile și pentru a **opri temporar** o linie de cod, fără să o șteargă. Se numește „a comenta o linie”.

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Linia 1" << endl;
    // cout << "Linia 2" << endl;
    cout << "Linia 3" << endl;
    return 0;
}
```

**Ieșire:**
```
Linia 1
Linia 3
```

Linia 2 nu a dispărut din cod, dar nu mai este executată. Ca să o repornești, ștergi `//`. În Code::Blocks poți comenta rapid o linie selectată cu **Ctrl + Shift + C**.

### Exemplul 13 — Dezactivez un bloc cu `/* */`

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Incepe jocul" << endl;

    /*
    cout << "Mod dificil: activ" << endl;
    cout << "Inamici: 20" << endl;
    */

    cout << "Mod usor: activ" << endl;
    return 0;
}
```

**Ieșire:**
```
Incepe jocul
Mod usor: activ
```

Cele două linii dintre `/*` și `*/` sunt ignorate. Este util când vrei să testezi o parte din program fără alta.

### Exemplul 14 — Mini-proiect: ecran de start, complet comentat

```cpp
/*
   Program: Ecran de start
   Autor:   Maria Ionescu
   Data:    3 octombrie 2026
   Scop:    afiseaza ecranul de pornire al unui joc
*/
#include <iostream>
using namespace std;

int main() {
    // ----- Titlul jocului -----
    cout << "+------------------------+" << endl;
    cout << "|     DRAGON QUEST       |" << endl;
    cout << "+------------------------+" << endl;

    // ----- Meniul -----
    cout << endl;
    cout << "  1. Joc nou" << endl;
    cout << "  2. Continua" << endl;
    cout << "  3. Setari" << endl;
    cout << "  4. Iesire" << endl;

    // ----- Mesaj de incheiere -----
    cout << endl;
    cout << "  \"Alege cu grija!\"" << endl;

    return 0;   // totul a mers bine
}
```

Observă ce ai combinat: antet, secțiuni, un comentariu la finalul unei linii, desen cu chenar, ghilimele cu `\"` și indentare corectă. Este un program mic, dar scris ca la carte.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Programul meu comentat” (obligatoriu)
Ia un program din L1 și îmbunătățește-l:
1. adaugă un antet cu numele tău, data și scopul programului;
2. adaugă minimum 3 comentarii utile, pe secțiuni;
3. verifică indentarea și rândurile goale.

### Exercițiul B — Fără comentarii inutile
Citește codul de mai jos și rescrie-l cu comentarii **bune** (care explică ideea, nu repetă codul):

```cpp
#include <iostream>
using namespace std;
int main() {
cout << "Nume: Alex" << endl;
cout << "Nivel: 3" << endl;
return 0;
}
```

### Exercițiul C — Depanare cu comentarii
Scrie un program cu 5 linii de `cout`. Comentează pe rând câte o linie și rulează de fiecare dată, ca să vezi ce dispare de pe ecran.

### Exercițiul D — Găsește greșelile
Corectează programul (are 4 greșeli) și apoi explică pe foaie fiecare corecție:

```cpp
#include <iostream
using namespace std

int main()
    cout << "Salut" << endl
    return 0;
}
```

### Exercițiul E — Explică structura
Pe o foaie, desenează scheletul unui program și scrie lângă fiecare linie ce rol are. Fără să te uiți în lecție.

**Gata când:**
- [ ] Programul compilează și rulează  
- [ ] Are antet și minimum 3 comentarii utile  
- [ ] Indentarea este corectă  
- [ ] Ai folosit și `//`, și `/* */`  
- [ ] Ai explicat pe foaie ce face fiecare parte a scheletului  
- [ ] Fișierul se numește `Prenume_Nume_L2.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Scrie un program care afișează un desen ASCII și comentează fiecare rând al desenului după ce reprezintă (ochi, nas, gură…)  
- [ ] Pune un comentariu pe mai multe linii care conține o „listă de idei” pentru programul de la L3  
- [ ] Fă un program cu 6 secțiuni, fiecare precedată de un comentariu cu titlu între liniuțe  
- [ ] Rescrie un program din L1 fără `using namespace std;`, folosind `std::`  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Tot programul dispare după un comentariu | Ai deschis `/*` și ai uitat `*/` | Închide comentariul cu `*/` |
| Eroare în codul de după comentariu | Ai pus `/* */` în interiorul altui `/* */` | Folosește `//` în interior sau comentează pe rând |
| Cod care „nu face nimic” | Linia a rămas comentată cu `//` din greșeală | Șterge `//` din fața ei |
| `expected ';'` | Ai uitat `;` la finalul unei instrucțiuni | `cout << "Salut";` |
| `expected '}'` | Ai uitat să închizi `main` | Verifică dacă fiecare `{` are un `}` |
| Cod după `return 0;` care nu se execută | `return 0;` încheie programul | Pune `return 0;` ultimul în `main` |
| `;` după `#include` sau după `int main()` | Aceste linii nu au `;` | Șterge `;` |
---

## Recapitulare pe scurt

- Un program are: `#include`, `using namespace std;`, `int main()` și blocul de cod între `{ }`.
- Programul se execută **de sus în jos**, instrucțiune cu instrucțiune.
- `//` comentează o linie, iar `/* … */` comentează mai multe linii. Compilatorul le ignoră.
- Comentariile bune explică ideea, nu repetă codul.
- Indentarea (4 spații în interiorul `{ }`) și rândurile goale fac codul ușor de citit.
- Comentariile pot opri temporar o linie sau un bloc de cod, util la testare.
- `return 0;` încheie programul.

---

## Temă
1. Refă **Exemplele 1–14** pe calculatorul tău (scrise de mână, nu copiate).  
2. Comentează toate programele tale din L1 (antet + secțiuni).  
3. Scrie un program nou, de 15–20 de rânduri, care afișează o „fișă de jucător” într-un chenar, cu antet și comentarii pe secțiuni.  
4. **Bonus:** fă un program cu un singur `cout` lung (pe mai multe rânduri de cod, cu `<<`), pe care îl comentezi pe bucăți.  
5. Salvează tot ca `Tema_L2_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 3
Învățăm **variabilele**: cum păstrezi un număr într-o „cutie” cu nume, cum îl afișezi și cum calculezi cu el.
