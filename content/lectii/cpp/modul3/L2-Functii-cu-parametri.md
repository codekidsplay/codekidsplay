# LECȚIA 2 — Funcții cu parametri
**Modulul 3 · Funcții, string, algoritmi · 2 ore**  
**Code Kids Play · Problem Solver**

> Azi înveți să **trimiți informații** unei funcții. O funcție `linie()` desenează mereu aceeași linie; o funcție `linie(n)` desenează o linie de **orice lungime** i-o ceri. Parametrii fac funcțiile flexibile.  
> Proiect: **„Desenatorul parametric”** · fișier: `Prenume_Nume_M3L2.cpp` (ex. `Ana_Pop_M3L2.cpp`)

---

## Obiectiv
La finalul orei scrii funcții cu unul sau mai mulți parametri, le apelezi cu argumente potrivite, înțelegi că parametrii sunt **copii**, trimiți vectori către funcții și folosești o referință (`&`) ca să modifici o variabilă din exterior.  
**Minim:** o funcție cu un parametru și una cu doi parametri.  
**Ținta orei (Complet):** + o funcție care primește un vector și un program cu meniu, organizat pe funcții cu parametri.

## De ce contează
Funcțiile fără parametri fac mereu același lucru. Cu parametri, aceeași funcție rezolvă o familie întreagă de probleme: „afișează de `n` ori”, „adună oricare două numere”, „salută pe oricine”. Este diferența dintre o ștampilă fixă și o ștampilă la care poți schimba literele.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: funcții `void` fără parametri |
| 10–35 | Un parametru, doi parametri, ordinea argumentelor (**Exemplele 1–5**) |
| 35–55 | Parametrii sunt copii; expresii ca argumente (**Exemplele 6–8**) |
| 55–75 | Tipuri diferite: `double`, `string`, `char` (**Exemplele 9–10**) |
| 75–100 | Vectori ca parametri și referințe (**Exemplele 11–14**; nivel mai ridicat, vezi nota de la secțiunea 4) |
| 100–118 | Proiecte (**Exemplele 15–17**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Primul parametru

Un **parametru** este o variabilă scrisă între parantezele funcției. Ea primește o valoare în momentul apelului.

```
void numeFunctie(tip nume) {
    // aici folosesti "nume" ca pe o variabila obisnuita
}

numeFunctie(valoare);   // apelul: "valoare" este argumentul
```

Terminologie: ce scrii la **definiție** se numește **parametru**; ce scrii la **apel** se numește **argument**. Parametrul este „cutia”, argumentul este „ce pui în cutie”.

### Exemplul 1 — Linie de lungime aleasă **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void linie(int lungime) {
    for (int i = 0; i < lungime; i++) {
        cout << "-";
    }
    cout << endl;
}

int main() {
    linie(5);
    linie(12);
    linie(3);
    return 0;
}
```

**Ieșire:**
```
-----
------------
---
```

Funcția `linie` este scrisă o singură dată, dar trei apeluri produc trei linii diferite. La primul apel, `lungime` este `5`; la al doilea, `12`; la al treilea, `3`.

### Exemplul 2 — Două parametri: caracter și lungime **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void linie(char c, int lungime) {
    for (int i = 0; i < lungime; i++) {
        cout << c;
    }
    cout << endl;
}

int main() {
    linie('*', 10);
    linie('=', 20);
    linie('#', 4);
    return 0;
}
```

**Ieșire:**
```
**********
====================
####
```

Parametrii se despart prin virgulă și **fiecare** are propriul tip: `char c, int lungime`. Nu poți scrie `char c, lungime`.

### Exemplul 3 — Adunarea a două numere **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void afiseazaSuma(int a, int b) {
    cout << a << " + " << b << " = " << a + b << endl;
}

int main() {
    afiseazaSuma(3, 4);
    afiseazaSuma(10, 25);
    afiseazaSuma(-5, 8);
    return 0;
}
```

**Ieșire:**
```
3 + 4 = 7
10 + 25 = 35
-5 + 8 = 3
```

Funcția primește două valori și le folosește ca pe niște variabile locale. Aceeași funcție calculează suma pentru orice pereche de numere.

### Exemplul 4 — Salută pe cine vrei

```cpp
#include <iostream>
#include <string>
using namespace std;

void saluta(string nume) {
    cout << "Salut, " << nume << "! Bine ai venit!" << endl;
}

int main() {
    saluta("Ana");
    saluta("Bogdan");

    string prieten;
    cout << "Numele prietenului: ";
    cin >> prieten;
    saluta(prieten);
    return 0;
}
```

**Rulare** (tastezi `Carmen`):
```
Salut, Ana! Bine ai venit!
Salut, Bogdan! Bine ai venit!
Numele prietenului: Carmen
Salut, Carmen! Bine ai venit!
```

Argumentul poate fi un text scris direct (`"Ana"`) sau o variabilă (`prieten`). Contează doar ca **tipul** să se potrivească.

### Exemplul 5 — Ordinea argumentelor contează **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void scadere(int descazut, int scazator) {
    cout << descazut << " - " << scazator << " = " << descazut - scazator << endl;
}

int main() {
    scadere(10, 3);
    scadere(3, 10);
    return 0;
}
```

**Ieșire:**
```
10 - 3 = 7
3 - 10 = -7
```

Argumentele se potrivesc cu parametrii **în ordine**: primul argument merge în primul parametru, al doilea în al doilea. Inversate, rezultatul se schimbă.

**Încearcă tu (8 min)**  
- [ ] Scrii o funcție `repeta(int ori)` care afișează „Hip!” de atâtea ori  
- [ ] Scrii o funcție `produs(int a, int b)` care afișează produsul  
- [ ] Apelezi funcția cu valori diferite și compari rezultatele  

---

## 2. Parametrii sunt copii

Când apelezi `f(x)`, valoarea lui `x` este **copiată** în parametru. Funcția lucrează cu o copie; originalul din `main` rămâne neschimbat.

### Exemplul 6 — Modificarea copiei nu schimbă originalul **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void dubleaza(int n) {
    n = n * 2;
    cout << "In functie: n = " << n << endl;
}

int main() {
    int numar = 7;
    dubleaza(numar);
    cout << "In main: numar = " << numar << endl;
    return 0;
}
```

**Ieșire:**
```
In functie: n = 14
In main: numar = 7
```

Funcția a dublat **copia**, dar `numar` din `main` a rămas `7`. Imaginează-ți că dai unui coleg o fotocopie a temei: dacă scrie pe ea, originalul tău nu se schimbă.

### Exemplul 7 — Expresii ca argumente

```cpp
#include <iostream>
using namespace std;

void afiseazaPatrat(int x) {
    cout << x << "^2 = " << x * x << endl;
}

int main() {
    int a = 3;
    afiseazaPatrat(a);
    afiseazaPatrat(a + 4);
    afiseazaPatrat(a * 2);
    afiseazaPatrat(10);
    return 0;
}
```

**Ieșire:**
```
3^2 = 9
7^2 = 49
6^2 = 36
10^2 = 100
```

Argumentul poate fi un număr, o variabilă sau o **expresie**. Expresia este calculată mai întâi, iar rezultatul ajunge în parametru: `a + 4` devine `7`.

### Exemplul 8 — Dreptunghi de dimensiuni alese

```cpp
#include <iostream>
using namespace std;

void dreptunghi(int linii, int coloane, char c) {
    for (int i = 0; i < linii; i++) {
        for (int j = 0; j < coloane; j++) {
            cout << c;
        }
        cout << endl;
    }
}

int main() {
    dreptunghi(2, 8, '#');
    cout << endl;
    dreptunghi(3, 5, '*');
    return 0;
}
```

**Ieșire:**
```
########
########

*****
*****
*****
```

Trei parametri: `linii`, `coloane`, `c`. Ai transformat bucla imbricată din Modulul 2 într-o „unealtă” reutilizabilă.

---

## 3. Tipuri diferite de parametri

### Exemplul 9 — `double` și conversia automată

```cpp
#include <iostream>
using namespace std;

void arieCerc(double raza) {
    const double PI = 3.14159;
    cout << "Raza " << raza << " -> aria " << PI * raza * raza << endl;
}

int main() {
    arieCerc(2.5);
    arieCerc(10);
    return 0;
}
```

**Ieșire:**
```
Raza 2.5 -> aria 19.6349
Raza 10 -> aria 314.159
```

Chiar dacă al doilea apel primește `10` (un număr întreg), parametrul este `double`, deci `10` se transformă automat în `10.0`. Invers (de la zecimal la întreg) s-ar pierde zecimalele, de aceea fii atent la tipuri.

### Exemplul 10 — `string` și `int`: repetarea unui text

```cpp
#include <iostream>
#include <string>
using namespace std;

void repeta(string text, int ori) {
    for (int i = 0; i < ori; i++) {
        cout << text << " ";
    }
    cout << endl;
}

int main() {
    repeta("Ha", 3);
    repeta("Code", 2);
    repeta("Hip", 4);
    return 0;
}
```

**Ieșire:**
```
Ha Ha Ha 
Code Code 
Hip Hip Hip Hip 
```

---

## 4. Vectori ca parametri și referințe

> **Notă:** această secțiune este puțin mai grea decât restul lecției. Dacă ți se pare dificilă, nu e o problemă: citește Exemplele 11 și 13 (ideea de bază), încearcă exercițiile din „Încearcă tu”, iar restul îl reiei acasă. Proiectul lecției se poate face fără Exemplele 12 și 14.

### Exemplul 11 — Un vector trimis unei funcții **[Esențial]**

Pentru un vector trimiți **și** numărul lui de elemente, pentru că funcția nu știe singură câte elemente are.

```cpp
#include <iostream>
using namespace std;

void afiseazaVector(int v[], int n) {
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
}

int main() {
    int a[5] = {4, 8, 15, 16, 23};
    int b[3] = {100, 200, 300};

    afiseazaVector(a, 5);
    afiseazaVector(b, 3);
    return 0;
}
```

**Ieșire:**
```
4 8 15 16 23 
100 200 300 
```

Parametrul `int v[]` înseamnă „un vector de întregi, de orice lungime”. La apel scrii doar numele vectorului, fără paranteze: `afiseazaVector(a, 5);`.

### Exemplul 12 — Funcția poate modifica vectorul primit *(Provocare, opțional)*

Spre deosebire de numerele simple, un vector **nu** este copiat: funcția lucrează chiar cu vectorul original.

```cpp
#include <iostream>
using namespace std;

void adaugaBonus(int v[], int n, int bonus) {
    for (int i = 0; i < n; i++) {
        v[i] += bonus;
    }
}

void afiseaza(int v[], int n) {
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
}

int main() {
    int punctaj[4] = {50, 60, 70, 80};

    cout << "Inainte: ";
    afiseaza(punctaj, 4);

    adaugaBonus(punctaj, 4, 10);

    cout << "Dupa:    ";
    afiseaza(punctaj, 4);
    return 0;
}
```

**Ieșire:**
```
Inainte: 50 60 70 80 
Dupa:    60 70 80 90 
```

După apel, vectorul din `main` s-a schimbat. Aceasta este o diferență importantă: valorile simple se copiază, vectorii se transmit „pe original”. Folosește asta cu grijă: o funcție care primește un vector îl poate strica.

### Exemplul 13 — Referința, cel mai simplu caz **[Esențial]**

Până acum funcțiile au primit **copii**. Dacă vrei ca o funcție să schimbe chiar variabila din `main`, pui `&` în fața numelui parametrului. Comparăm două funcții aproape identice:

```cpp
#include <iostream>
using namespace std;

void maresteFaraReferinta(int n) {
    n = n + 1;                  // schimba doar copia
}

void maresteCuReferinta(int &n) {
    n = n + 1;                  // schimba variabila originala
}

int main() {
    int puncte = 10;

    maresteFaraReferinta(puncte);
    cout << "Dupa prima functie: " << puncte << endl;

    maresteCuReferinta(puncte);
    cout << "Dupa a doua functie: " << puncte << endl;
    return 0;
}
```

**Ieșire:**
```
Dupa prima functie: 10
Dupa a doua functie: 11
```

Prima funcție a mărit doar copia, deci `puncte` a rămas `10`. A doua a primit **variabila originală** (cu alt nume), deci `puncte` a devenit `11`. Singura diferență în cod este `&`. Atât trebuie să reții pentru început; exemplul următor merge puțin mai departe.

### Exemplul 14 — Referința (`&`): modificăm și variabile simple *(Provocare, opțional)*

Dacă pui `&` în fața numelui unui parametru, nu mai primești o copie, ci **chiar variabila originală** (cu alt nume). Se numește parametru **prin referință**.

```cpp
#include <iostream>
using namespace std;

void schimba(int &a, int &b) {
    int aux = a;
    a = b;
    b = aux;
}

void dubleaza(int &n) {
    n = n * 2;
}

int main() {
    int x = 5;
    int y = 9;

    schimba(x, y);
    cout << "x = " << x << ", y = " << y << endl;

    dubleaza(x);
    cout << "x dublat = " << x << endl;
    return 0;
}
```

**Ieșire:**
```
x = 9, y = 5
x dublat = 18
```

Acum funcțiile modifică variabilele din `main`. `schimba` este exact interschimbarea din sortare (Modulul 2, lecția 9), pe care o poți refolosi oriunde. Fără `&`, `schimba` ar interschimba doar copiile, iar `x` și `y` ar rămâne neschimbate.

**Încearcă tu (10 min)**  
- [ ] Scrii o funcție care primește un vector și afișează doar elementele pare  
- [ ] Scrii o funcție care dublează toate elementele unui vector  
- [ ] Scrii o funcție `incrementeaza(int &n)` care mărește `n` cu 1  

---

## 5. Proiecte

### Exemplul 15 — Statistici pentru un vector, într-o funcție

```cpp
#include <iostream>
using namespace std;

void statistici(int v[], int n) {
    int suma = 0;
    int minim = v[0];
    int maxim = v[0];

    for (int i = 0; i < n; i++) {
        suma += v[i];
        if (v[i] < minim) minim = v[i];
        if (v[i] > maxim) maxim = v[i];
    }

    cout << "Suma: " << suma << endl;
    cout << "Media: " << (double)suma / n << endl;
    cout << "Minim: " << minim << ", maxim: " << maxim << endl;
}

int main() {
    int note1[5] = {9, 7, 10, 8, 6};
    int note2[3] = {10, 10, 9};

    cout << "Clasa A:" << endl;
    statistici(note1, 5);

    cout << "Clasa B:" << endl;
    statistici(note2, 3);
    return 0;
}
```

**Ieșire:**
```
Clasa A:
Suma: 40
Media: 8
Minim: 6, maxim: 10
Clasa B:
Suma: 29
Media: 9.66667
Minim: 9, maxim: 10
```

O funcție, două clase, același calcul. Fără funcție ar fi trebuit să copiezi tot codul de statistici de două ori.

### Exemplul 16 — Un program cu funcții și o referință pentru citire

```cpp
#include <iostream>
using namespace std;

void citesteNota(int &nota) {
    do {
        cout << "Nota (1-10): ";
        cin >> nota;
    } while (nota < 1 || nota > 10);
}

void citesteVector(int v[], int n) {
    for (int i = 0; i < n; i++) {
        cout << "Elevul " << i + 1 << endl;
        citesteNota(v[i]);
    }
}

void afiseazaCatalog(int v[], int n) {
    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". nota " << v[i] << endl;
    }
}

int main() {
    int nota[3];

    citesteVector(nota, 3);
    cout << "--- Catalog ---" << endl;
    afiseazaCatalog(nota, 3);
    return 0;
}
```

**Rulare** (tastezi `9`, `12`, `7`, `10`):
```
Elevul 1
Nota (1-10): 9
Elevul 2
Nota (1-10): 12
Nota (1-10): 7
Elevul 3
Nota (1-10): 10
--- Catalog ---
1. nota 9
2. nota 7
3. nota 10
```

`citesteNota` primește un element de vector **prin referință** și îl completează direct, iar validarea este ascunsă în ea. `citesteVector` o apelează pentru fiecare element. Observă cât de scurt este `main`.

### Exemplul 17 — „Desenatorul parametric” (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Desenatorul parametric
   Scop:    figuri desenate de functii cu parametri, alese dintr-un meniu
*/
#include <iostream>
using namespace std;

void patrat(int n, char c) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << c << " ";
        }
        cout << endl;
    }
}

void triunghi(int n, char c) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cout << c << " ";
        }
        cout << endl;
    }
}

void piramida(int n, char c) {
    for (int i = 1; i <= n; i++) {
        for (int s = 1; s <= n - i; s++) {
            cout << " ";
        }
        for (int j = 1; j <= 2 * i - 1; j++) {
            cout << c;
        }
        cout << endl;
    }
}

void meniu() {
    cout << endl << "===== DESENATOR =====" << endl;
    cout << "1. Patrat" << endl;
    cout << "2. Triunghi" << endl;
    cout << "3. Piramida" << endl;
    cout << "0. Iesire" << endl;
    cout << "Alege: ";
}

int main() {
    int optiune;

    do {
        meniu();
        cin >> optiune;

        if (optiune >= 1 && optiune <= 3) {
            int n;
            char c;
            cout << "Marimea (1-15): ";
            cin >> n;
            cout << "Caracterul: ";
            cin >> c;

            if (n < 1 || n > 15) {
                cout << "Marime invalida." << endl;
            } else if (optiune == 1) {
                patrat(n, c);
            } else if (optiune == 2) {
                triunghi(n, c);
            } else {
                piramida(n, c);
            }
        } else if (optiune != 0) {
            cout << "Optiune invalida." << endl;
        }
    } while (optiune != 0);

    cout << "La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1 3 #`, `3 4 *`, `0`):
```

===== DESENATOR =====
1. Patrat
2. Triunghi
3. Piramida
0. Iesire
Alege: 1
Marimea (1-15): 3
Caracterul: #
# # # 
# # # 
# # # 

===== DESENATOR =====
1. Patrat
2. Triunghi
3. Piramida
0. Iesire
Alege: 3
Marimea (1-15): 4
Caracterul: *
   *
  ***
 *****
*******

===== DESENATOR =====
1. Patrat
2. Triunghi
3. Piramida
0. Iesire
Alege: 0
La revedere!
```

Compară cu Desenatorul din Modulul 2: aceleași figuri, dar acum fiecare este o funcție cu parametri, iar `main` este mult mai ușor de citit. Poți chema `patrat(5, '@')` de oriunde, fără să copiezi codul.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Desenatorul parametric” (obligatoriu)
Scrie programul din Exemplul 17 și adaugă o a patra figură, tot ca funcție cu parametri (de exemplu `dreptunghiGol(int linii, int coloane, char c)`).

### Exercițiul B — Funcții matematice cu afișare
Scrie funcțiile: `afiseazaMedia(double a, double b)`, `afiseazaMaxim(int a, int b)` și `afiseazaPutere(int baza, int exponent)` (puterea calculată cu o buclă). Apelează-le cu cel puțin 3 perechi de valori.

### Exercițiul C — Vectori și funcții *(Provocare, opțional)*
Scrie trei funcții: `citesteVector(int v[], int n)`, `afiseazaVector(int v[], int n)` și `inverseaza(int v[], int n)` (inversează vectorul pe loc). În `main` citește 6 numere, inversează-le și afișează-le.

### Exercițiul D — Referințe *(Provocare, opțional)*
Scrie o funcție `minMax(int a, int b, int &mic, int &mare)` care pune în `mic` valoarea cea mai mică dintre `a` și `b`, iar în `mare` pe cea mai mare. Testeaz-o în `main`.

### Exercițiul E — Chenar cu mesaj
Scrie o funcție `chenar(string mesaj, int latime)` care afișează mesajul încadrat între două linii de `*`, de lățimea dată.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Ai funcții cu 1, 2 și 3 parametri  
- [ ] *(Dacă ai ajuns la partea 4)* Ai trimis un vector către o funcție și ai folosit o referință (`&`) corect  
- [ ] Argumentele sunt în ordinea corectă a parametrilor  
- [ ] Fișierul se numește `Prenume_Nume_M3L2.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Scrie o funcție `ceas(int ore, int minute)` care afișează ora în forma `07:05` (cu zero în față când e nevoie)  
- [ ] Scrie o funcție `tabla(int n)` care afișează tabla înmulțirii cu `n`, și apeleaz-o pentru toate numerele de la 1 la 9  
- [ ] Scrie o funcție `sortare(int v[], int n)` care sortează un vector (Modulul 2, lecția 9), folosind `schimba(int &a, int &b)`  
- [ ] Încearcă o **valoare implicită**: `void linie(int lungime = 10)`; apelează `linie();` și `linie(4);`  
- [ ] Scrie o funcție `chenar(string text)` care calculează singură lățimea chenarului după lungimea textului (`text.length()`)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `too few arguments to function` | Ai apelat funcția cu mai puține argumente decât parametri | Trimite câte un argument pentru fiecare parametru |
| `too many arguments to function` | Ai dat prea multe argumente | Verifică definiția funcției |
| Rezultate inversate | Ai trimis argumentele în altă ordine | Ordinea de la apel = ordinea parametrilor |
| Funcția nu schimbă variabila din `main` | Parametrul este o copie (fără `&`) | Pune `&` la parametru, dacă vrei să modifici originalul |
| `unknown type name 'b'` la definiție | Ai uitat tipul pentru al doilea parametru: `(int a, b)` | `(int a, int b)` |
| Vectorul nu se afișează corect în funcție | Ai uitat să trimiți și `n` | `f(int v[], int n)` |
| La apel scrii `f(int a)` | Ai pus tipul la apel | La apel scrii doar valoarea: `f(a)` |
| Un `double` pierde zecimalele | Parametrul este `int` | Folosește `double` pentru numere zecimale |

---

## Recapitulare pe scurt

- **Parametru:** variabila din definiția funcției. **Argument:** valoarea trimisă la apel.
- Mai mulți parametri se despart prin virgulă, fiecare cu propriul tip: `void f(int a, char c)`.
- Argumentele se potrivesc cu parametrii **în ordine**.
- Parametrii obișnuiți sunt **copii**: funcția nu schimbă originalul.
- Un **vector** se trimite ca `int v[]`, împreună cu `n`; funcția îl poate modifica.
- Cu `&` (`int &a`) funcția lucrează cu **variabila originală** și o poate schimba.
- Argumentul poate fi un număr, o variabilă sau o expresie.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie o funcție `triunghi(int n)` și una `piramida(int n)`; apeleaz-o pentru `n` de la 1 la 4.  
3. Scrie un program care citește 5 note într-un vector, apoi apelează funcții separate pentru: afișare, medie, maxim și numărul notelor peste medie (fiecare afișează rezultatul).  
4. Scrie o funcție `schimba(int &a, int &b)` și folosește-o pentru a inversa un vector de 6 elemente.  
5. **Bonus:** scrie o funcție `mesaj(string text, int ori, char separator)` care afișează textul de `ori` ori, despărțit prin caracterul dat.  
6. Salvează tot ca `Tema_M3L2_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 3
Funcțiile învață să **dea răspunsuri**: cu `return` o funcție calculează o valoare și o trimite înapoi. Scriem `maxim(a, b)`, `estePar(n)` și `factorial(n)`.
