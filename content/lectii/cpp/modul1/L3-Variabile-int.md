# LECȚIA 3 — Variabile `int`
**Modulul 1 · Bazele C++ · 2 ore**  
**Code Kids Play · Junior Coder**

> Azi înveți să păstrezi numere în memoria calculatorului, să le dai un nume, să le schimbi și să calculezi cu ele.  
> Proiect: **„Fișa jucătorului”** · fișier: `Prenume_Nume_L3.cpp` (ex. `Ana_Pop_L3.cpp`)

---

## Obiectiv
La finalul orei știi să declari variabile de tip `int`, să le dai valori, să le afișezi și să calculezi cu ele (adunare, scădere, înmulțire). Știi și să alegi nume corecte pentru variabile și să folosești `const` pentru valori care nu se schimbă.  
**Minim:** un program cu minimum 3 variabile `int` și o sumă afișată.  
**Ținta orei (Complet):** + produs, o valoare modificată pe parcurs și cel puțin un `const`.

## De ce contează
Într-un joc, scorul crește, viața scade, nivelul se schimbă. Toate aceste valori sunt păstrate în **variabile**. Fără variabile, un program ar putea doar să afișeze text fix. Cu ele, programul poate să țină minte și să calculeze.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ce este o variabilă (**Exemplul 1**) |
| 15–40 | Atribuire, schimbarea valorii, reguli de nume (**Exemplele 2–6**) |
| 40–65 | Calcule și valori care depind de alte valori (**Exemplele 7–10**) |
| 65–85 | `const`, scurtături și schimbarea a două valori (**Exemplele 11–13**) |
| 85–110 | Proiect: fișa jucătorului și bonul de casă (**Exemplele 14–15**) |
| 110–120 | Greșeli frecvente și temă |

---

## 1. Ce este o variabilă

O **variabilă** este o „cutie” din memoria calculatorului, care are:
- un **nume** (cum o strigi în program);
- un **tip** (ce fel de lucru poate ține);
- o **valoare** (ce se află în ea acum).

Tipul pe care îl învățăm azi este **`int`**, de la *integer* = număr întreg: `5`, `-3`, `0`, `1250`. Nu poate ține zecimale (`2.5`), pentru acelea avem alt tip, în lecția 5.

Ca să folosești o variabilă, o **declari**: scrii tipul, apoi numele, apoi (de obicei) valoarea.

```
tip  nume  =  valoare ;
int  scor  =  100     ;
```

### Exemplul 1 — Prima variabilă

```cpp
#include <iostream>
using namespace std;

int main() {
    int varsta = 12;
    cout << varsta << endl;
    return 0;
}
```

**Ieșire:**
```
12
```

Atenție la diferența dintre cele două forme:
- `cout << varsta;` afișează **valoarea** din variabilă (`12`);
- `cout << "varsta";` afișează **textul** `varsta`, adică cuvântul, nu numărul.

Numele variabilei **nu** se pune între ghilimele când vrei valoarea ei.

---

## 2. Atribuire, schimbare și afișare

Semnul `=` din C++ nu înseamnă „egal” ca la matematică. Înseamnă **„pune în cutie”**. Ce este în dreapta se calculează, iar rezultatul se pune în variabila din stânga.

### Exemplul 2 — Valoarea se poate schimba

```cpp
#include <iostream>
using namespace std;

int main() {
    int scor = 0;
    cout << "Scor la start: " << scor << endl;

    scor = 50;
    cout << "Scor dupa primul nivel: " << scor << endl;

    scor = 120;
    cout << "Scor dupa al doilea nivel: " << scor << endl;
    return 0;
}
```

**Ieșire:**
```
Scor la start: 0
Scor dupa primul nivel: 50
Scor dupa al doilea nivel: 120
```

Observă: `int` se scrie **o singură dată**, la declarare. Când schimbi valoarea, scrii doar `scor = 50;`. Variabila păstrează **ultima** valoare pe care i-ai dat-o.

### Exemplul 3 — Text și valoare pe același rând

```cpp
#include <iostream>
using namespace std;

int main() {
    int an = 2026;
    int nivel = 7;

    cout << "Suntem in anul " << an << "." << endl;
    cout << "Am ajuns la nivelul " << nivel << " din 10." << endl;
    return 0;
}
```

**Ieșire:**
```
Suntem in anul 2026.
Am ajuns la nivelul 7 din 10.
```

Cu `<<` poți lega pe același rând text, valori și `endl`, în orice ordine.

### Exemplul 4 — Mai multe variabile deodată

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 4, b = 9, c = 15;
    int x, y;
    x = 20;
    y = 30;

    cout << a << " " << b << " " << c << endl;
    cout << x << " " << y << endl;
    return 0;
}
```

**Ieșire:**
```
4 9 15
20 30
```

Mai multe variabile de același tip se pot declara pe un singur rând, separate prin virgulă. Poți să le dai valoare imediat (`a = 4`) sau mai târziu (`x = 20;`).

> **Atenție:** o variabilă declarată **fără valoare** (`int x;`) are la început o valoare necunoscută, ce poate fi orice număr. Nu o afișa și nu calcula cu ea înainte să îi dai o valoare.

### Exemplul 5 — Variabilă care primește valoarea alteia

```cpp
#include <iostream>
using namespace std;

int main() {
    int vieti = 3;
    int vietiRamase = vieti;

    cout << "Vieti la inceput: " << vieti << endl;
    cout << "Vieti ramase: " << vietiRamase << endl;

    vieti = 1;
    cout << "Dupa schimbare, vieti = " << vieti << endl;
    cout << "Dar vietiRamase = " << vietiRamase << endl;
    return 0;
}
```

**Ieșire:**
```
Vieti la inceput: 3
Vieti ramase: 3
Dupa schimbare, vieti = 1
Dar vietiRamase = 3
```

`vietiRamase = vieti;` **copiază** valoarea. După copiere, cele două cutii sunt independente: dacă schimbi una, cealaltă rămâne la fel.

### Reguli pentru numele variabilelor

| Regulă | Corect | Greșit |
|--------|--------|--------|
| Conține litere, cifre și `_` | `scor1`, `nr_vieti` | `scor-1`, `nr vieti` |
| Nu începe cu cifră | `nivel2` | `2nivel` |
| Nu are spații | `numarElevi`, `numar_elevi` | `numar elevi` |
| Nu e cuvânt rezervat (`int`, `return`, `main`…) | `valoare` | `int`, `return` |
| Literele mari și mici contează | `Scor` și `scor` sunt variabile diferite | |
| Fără diacritice | `varsta` | `vârstă` |

Alege nume care **spun ce conține** variabila: `scor`, `nivel`, `pretBilet` sunt mult mai bune decât `a`, `b`, `x1`. (În exemple de matematică, `a` și `b` sunt în regulă.)

### Exemplul 6 — Litere mari și mici: două variabile diferite

```cpp
#include <iostream>
using namespace std;

int main() {
    int Scor = 10;
    int scor = 99;

    cout << "Scor = " << Scor << endl;
    cout << "scor = " << scor << endl;
    return 0;
}
```

**Ieșire:**
```
Scor = 10
scor = 99
```

Funcționează, dar este o idee proastă să ai nume care diferă doar prin literă mare. Obișnuiește-te să scrii numele **mereu la fel**.

**Încearcă tu (10 min)**  
- [ ] Declari 3 variabile `int` pentru: vârsta ta, anul nașterii și numărul de frați  
- [ ] Le afișezi pe rânduri separate, cu text în fața fiecăreia  
- [ ] Schimbi o valoare la mijlocul programului și afișezi din nou  
- [ ] Încerci un nume greșit (`2scor`) și citești eroarea  

---

## 3. Calcule cu variabile

Cu `int` poți folosi operatorii:

| Operator | Ce face | Exemplu | Rezultat |
|----------|---------|---------|----------|
| `+` | adunare | `5 + 3` | `8` |
| `-` | scădere | `5 - 3` | `2` |
| `*` | înmulțire | `5 * 3` | `15` |

(Împărțirea și restul vin în lecția 4, pentru că au câteva capcane.)

### Exemplul 7 — Suma a două numere

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 5;
    int b = 3;
    int suma = a + b;

    cout << "Suma = " << suma << endl;
    return 0;
}
```

**Ieșire:**
```
Suma = 8
```

Calculul `a + b` se face întâi, iar rezultatul este pus în `suma`.

### Exemplul 8 — Diferență și produs

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 12;
    int y = 5;

    int diferenta = x - y;
    int produs = x * y;

    cout << x << " - " << y << " = " << diferenta << endl;
    cout << x << " * " << y << " = " << produs << endl;
    return 0;
}
```

**Ieșire:**
```
12 - 5 = 7
12 * 5 = 60
```

### Exemplul 9 — Calcul direct în `cout`

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 6;
    int b = 4;

    cout << "a + b = " << a + b << endl;
    cout << "a - b = " << a - b << endl;
    cout << "a * b = " << a * b << endl;
    cout << "(a + b) * 2 = " << (a + b) * 2 << endl;
    return 0;
}
```

**Ieșire:**
```
a + b = 10
a - b = 2
a * b = 24
(a + b) * 2 = 20
```

Poți pune calculul direct în `cout`, fără să îl salvezi într-o variabilă. Ca la matematică, **înmulțirea se face înaintea adunării**, iar parantezele schimbă ordinea.

### Exemplul 10 — Perimetru și arie

```cpp
#include <iostream>
using namespace std;

int main() {
    int lungime = 8;
    int latime = 5;

    int perimetru = 2 * (lungime + latime);
    int arie = lungime * latime;

    cout << "Dreptunghi " << lungime << " x " << latime << endl;
    cout << "Perimetru = " << perimetru << endl;
    cout << "Arie = " << arie << endl;
    return 0;
}
```

**Ieșire:**
```
Dreptunghi 8 x 5
Perimetru = 26
Arie = 40
```

**Încearcă tu (10 min)**  
- [ ] Calculezi perimetrul și aria unui pătrat cu latura 7  
- [ ] Calculezi prețul pentru 6 înghețate de 4 lei bucata  
- [ ] Afișezi fiecare rezultat cu un text explicativ  

---

## 4. `const`, scurtături și schimbarea a două valori

### Exemplul 11 — `const`: valoare care nu se schimbă

```cpp
#include <iostream>
using namespace std;

int main() {
    const int ZILE_SAPTAMANA = 7;
    const int ORE_ZI = 24;

    int ore = ZILE_SAPTAMANA * ORE_ZI;

    cout << "O saptamana are " << ZILE_SAPTAMANA << " zile." << endl;
    cout << "O saptamana are " << ore << " de ore." << endl;
    return 0;
}
```

**Ieșire:**
```
O saptamana are 7 zile.
O saptamana are 168 de ore.
```

Cuvântul `const` înseamnă „constantă”: valoarea nu mai poate fi schimbată după declarare. Dacă încerci `ZILE_SAPTAMANA = 8;`, compilatorul dă eroare. Este o protecție utilă pentru valori fixe. Prin tradiție, numele constantelor se scriu cu **litere mari**.

### Exemplul 12 — Scurtături: `+=`, `-=`, `++`, `--`

```cpp
#include <iostream>
using namespace std;

int main() {
    int scor = 10;

    scor = scor + 5;
    cout << "scor = scor + 5  ->  " << scor << endl;

    scor += 5;
    cout << "scor += 5        ->  " << scor << endl;

    scor -= 3;
    cout << "scor -= 3        ->  " << scor << endl;

    scor++;
    cout << "scor++           ->  " << scor << endl;

    scor--;
    cout << "scor--           ->  " << scor << endl;
    return 0;
}
```

**Ieșire:**
```
scor = scor + 5  ->  15
scor += 5        ->  20
scor -= 3        ->  17
scor++           ->  18
scor--           ->  17
```

| Scurtătură | Înseamnă |
|------------|----------|
| `x += 5;` | `x = x + 5;` |
| `x -= 3;` | `x = x - 3;` |
| `x++;` | `x = x + 1;` |
| `x--;` | `x = x - 1;` |

Instrucțiunea `scor = scor + 5;` te poate încurca la început. Citește-o așa: „calculează `scor + 5`, apoi pune rezultatul înapoi în `scor`”. Este cum crește scorul într-un joc.

### Exemplul 13 — Schimb între două variabile

Ai două cutii, `a` și `b`, și vrei să le schimbi conținutul. Dacă scrii `a = b; b = a;`, pierzi valoarea inițială a lui `a`. Soluția: o a treia cutie, ajutătoare.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int b = 20;
    cout << "Inainte: a = " << a << ", b = " << b << endl;

    int ajutor = a;   // salvez valoarea lui a
    a = b;            // a primeste valoarea lui b
    b = ajutor;       // b primeste vechea valoare a lui a

    cout << "Dupa:    a = " << a << ", b = " << b << endl;
    return 0;
}
```

**Ieșire:**
```
Inainte: a = 10, b = 20
Dupa:    a = 20, b = 10
```

Această tehnică se numește **interschimbare** și o vei întâlni foarte des, mai ales la sortări.

**Încearcă tu (10 min)**  
- [ ] Declari o constantă `const int NIVEL_MAXIM = 10;` și o afișezi  
- [ ] Faci un scor care pornește de la 0 și crește de 3 ori, cu `+=`  
- [ ] Interschimbi două variabile, cu o a treia ajutătoare  

---

## 5. Proiecte mici

### Exemplul 14 — Fișa jucătorului

```cpp
/*
   Program: Fisa jucatorului
   Scop:    afiseaza starea unui jucator dupa o lupta
*/
#include <iostream>
using namespace std;

int main() {
    const int VIATA_MAXIMA = 100;

    int viata = VIATA_MAXIMA;
    int scor = 0;
    int nivel = 1;

    cout << "=== START ===" << endl;
    cout << "Viata: " << viata << "/" << VIATA_MAXIMA << endl;
    cout << "Scor: " << scor << endl;
    cout << "Nivel: " << nivel << endl;

    // jucatorul invinge un monstru, dar pierde viata
    viata -= 35;
    scor += 250;

    // trece la nivelul urmator
    nivel++;
    scor += 100;

    cout << endl;
    cout << "=== DUPA LUPTA ===" << endl;
    cout << "Viata: " << viata << "/" << VIATA_MAXIMA << endl;
    cout << "Scor: " << scor << endl;
    cout << "Nivel: " << nivel << endl;
    return 0;
}
```

**Ieșire:**
```
=== START ===
Viata: 100/100
Scor: 0
Nivel: 1

=== DUPA LUPTA ===
Viata: 65/100
Scor: 350
Nivel: 2
```

### Exemplul 15 — Bon de casă

```cpp
#include <iostream>
using namespace std;

int main() {
    const int PRET_SUC = 7;
    const int PRET_PIZZA = 28;
    const int PRET_INGHETATA = 9;

    int bucatiSuc = 3;
    int bucatiPizza = 2;
    int bucatiInghetata = 4;

    int totalSuc = bucatiSuc * PRET_SUC;
    int totalPizza = bucatiPizza * PRET_PIZZA;
    int totalInghetata = bucatiInghetata * PRET_INGHETATA;
    int total = totalSuc + totalPizza + totalInghetata;
    int reducere = 10;
    int dePlata = total - reducere;

    cout << "==== BON DE CASA ====" << endl;
    cout << "Produs\tBuc\tPret\tTotal" << endl;
    cout << "Suc\t" << bucatiSuc << "\t" << PRET_SUC << "\t" << totalSuc << endl;
    cout << "Pizza\t" << bucatiPizza << "\t" << PRET_PIZZA << "\t" << totalPizza << endl;
    cout << "Inghet.\t" << bucatiInghetata << "\t" << PRET_INGHETATA << "\t" << totalInghetata << endl;
    cout << "----------------------" << endl;
    cout << "Total:\t\t\t" << total << " lei" << endl;
    cout << "Reducere:\t\t" << reducere << " lei" << endl;
    cout << "DE PLATA:\t\t" << dePlata << " lei" << endl;
    return 0;
}
```

În acest program ai folosit tot ce știi: `const`, variabile, calcule, `\t` pentru aliniere și text. Dacă vrei să schimbi un preț, îl schimbi **într-un singur loc**, iar restul se actualizează singur. Acesta este avantajul variabilelor și al constantelor.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Fișa jucătorului” (obligatoriu)
Scrie un program cu minimum **3 variabile `int`** (de exemplu viață, scor, nivel). Afișează-le, modifică-le cel puțin o dată și afișează din nou valorile.

### Exercițiul B — Aria și perimetrul pătratului
Declară latura unui pătrat într-o variabilă. Calculează perimetrul și aria, apoi afișează-le cu text explicativ.

### Exercițiul C — Bani de buzunar
Ai `50` de lei. Cumperi 3 caiete de câte `6` lei și 2 pixuri de câte `4` lei. Calculează în program câți lei îți rămân. Folosește variabile, nu numere scrise direct în calcul.

### Exercițiul D — Interschimbare
Declară `int a = 7, b = 15;` și interschimbă-le cu o a treia variabilă. Afișează valorile înainte și după.

### Exercițiul E — O constantă și un calcul
Declară `const int MINUTE_ORA = 60;`. Calculează câte minute are o zi școlară de 6 ore și afișează rezultatul.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Ai minimum 3 variabile `int`, cu nume clare  
- [ ] Ai afișat valorile cu `cout`  
- [ ] Ai calculat o sumă sau un produs într-o variabilă  
- [ ] Ai folosit minimum un `const`  
- [ ] Fișierul se numește `Prenume_Nume_L3.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Calculează produsul a 3 numere  
- [ ] Interschimbă **trei** variabile, în cerc: `a` ia valoarea lui `b`, `b` pe a lui `c`, `c` pe a lui `a`  
- [ ] Afișează o frază de forma „Am 12 ani, iar anul viitor voi avea 13 ani”, calculând al doilea număr  
- [ ] Calculează câte secunde are o zi (24 · 60 · 60) cu constante pentru fiecare număr  
- [ ] Declară o variabilă și afișează-o **înainte** să îi dai valoare. Observă ce apare și explică pe foaie de ce nu este bine  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `'scor' was not declared` | Ai folosit variabila fără să o declari sau ai greșit numele | `int scor = 0;` |
| `redefinition of 'scor'` | Ai scris `int scor` de două ori | A doua oară scrii doar `scor = 5;` |
| `expected unqualified-id` la un nume | Numele începe cu cifră sau conține caractere interzise | `nivel2`, nu `2nivel` |
| Pe ecran apare cuvântul `scor`, nu numărul | Ai pus numele între ghilimele | `cout << scor;` |
| Un număr ciudat, foarte mare sau negativ | Ai folosit o variabilă fără valoare | `int x = 0;` |
| `assignment of read-only variable` | Ai încercat să schimbi un `const` | Elimină `const` sau nu mai modifica valoarea |
| `a = 5` când voiai să compari | Aici `=` atribuie, nu compară | Compararea vine în L6 |
| Rezultat greșit la `a + b * c` | Înmulțirea se face înainte de adunare | Folosește paranteze: `(a + b) * c` |
| Ai pus `;` după numele tipului | `int ;` nu declară nimic | `int scor;` |

---

## Recapitulare pe scurt

- O variabilă este o cutie cu nume, tip și valoare.
- `int` ține numere întregi. Se declară așa: `int scor = 0;`
- `=` înseamnă „pune în cutie”. Se calculează dreapta, apoi se pune în stânga.
- `cout << scor;` afișează valoarea, iar `cout << "scor";` afișează cuvântul.
- `+`, `-` și `*` calculează cu variabile. Parantezele schimbă ordinea.
- `x += 5;`, `x++;` și `x--;` modifică o variabilă existentă.
- `const` blochează o valoare care nu trebuie să se schimbe.
- Numele variabilelor: fără spații, fără diacritice, nu încep cu cifră.

---

## Temă
1. Refă **Exemplele 1–15** pe calculatorul tău.  
2. Scrie un program „Fișa mea”, care afișează 5 variabile `int` (vârstă, nr. frați, an de naștere, clasă, nr. de jocuri preferate).  
3. Scrie un program care calculează cât costă o excursie: 4 bilete de câte 35 de lei și 3 mese de câte 22 de lei, cu variabile și `const`.  
4. **Bonus:** program care afișează un mic tabel al înmulțirii cu 7, de la `7 * 1` la `7 * 5`, folosind o variabilă pentru numărul 7.  
5. Salvează tot ca `Tema_L3_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 4
Învățăm **`cin`**: programul va citi numere de la tastatură, nu le vei mai scrie în cod. Vom folosi și `/` (împărțire) și `%` (rest).
