# LECȚIA 1 — Bucla `for`
**Modulul 2 · Bucle și vectori · 2 ore**  
**Code Kids Play · Loop Master**

> Azi înveți să-i spui calculatorului „repetă de câte ori vreau eu”, fără să scrii aceeași linie de 100 de ori.  
> Proiect: **„Tabla înmulțirii”** · fișier: `Prenume_Nume_M2L1.cpp` (ex. `Ana_Pop_M2L1.cpp`)

---

## Obiectiv
La finalul orei folosești bucla `for` ca să repeți o instrucțiune de un număr cunoscut de ori, știi ce rol au cele trei părți dintre paranteze (start, condiție, pas), numeri crescător, descrescător și din 2 în 2, și afișezi tabele simple.  
**Minim:** un program care afișează numerele de la 1 la `n`, cu `n` citit de la tastatură.  
**Ținta orei (Complet):** + numărătoare inversă, un pas diferit de 1 și tabla înmulțirii pentru un număr citit.

## De ce contează
Programele reale repetă lucruri tot timpul: desenează 60 de cadre pe secundă, verifică 30 de elevi dintr-o clasă, numără scorul pe 10 niveluri. Fără bucle, ai scrie fiecare pas de mână. Cu `for`, trei rânduri fac munca a 100.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Recapitulare Modulul 1 și problema repetării (**Exemplul 1**) |
| 15–45 | Anatomia lui `for`: start, condiție, pas (**Exemplele 2–5**) |
| 45–70 | Variații: invers, cu pas, între două valori (**Exemplele 6–9**) |
| 70–90 | `for` cu `char` și cu `if` în interior (**Exemplele 10–12**) |
| 90–115 | Proiecte (**Exemplele 13–16**) |
| 115–120 | Recap și temă |

---

## 1. De ce avem nevoie de bucle

### Exemplul 1 — Fără buclă și cu buclă

Vrei să afișezi de 5 ori mesajul „Salut!”. Fără buclă:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Salut!" << endl;
    cout << "Salut!" << endl;
    cout << "Salut!" << endl;
    cout << "Salut!" << endl;
    cout << "Salut!" << endl;
    return 0;
}
```

Cu bucla `for`:

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << "Salut!" << endl;
    }
    return 0;
}
```

Ambele afișează de 5 ori „Salut!”. Dar ce faci dacă ți se cere de 500 de ori? Varianta cu buclă se schimbă într-un singur loc (`5` devine `500`).

---

## 2. Anatomia lui `for`

```
for (start; conditie; pas) {
    // instructiuni repetate
}
```

| Parte | Rol | În `for (int i = 1; i <= 5; i++)` |
|-------|-----|-----------------------------------|
| **start** | se execută o singură dată, la început | `int i = 1` (creează contorul `i`, pornit de la 1) |
| **condiție** | se verifică înaintea fiecărei repetări; dacă e adevărată, se repetă | `i <= 5` |
| **pas** | se execută după fiecare repetare | `i++` (mărește `i` cu 1) |

Ordinea în care se execută lucrurile:
1. se execută **start**;
2. se verifică **condiția**: dacă e falsă, bucla se oprește; dacă e adevărată, merge mai departe;
3. se execută **corpul** buclei (instrucțiunile din acolade);
4. se execută **pasul**;
5. se revine la punctul 2.

Variabila `i` se numește **contor**. O repetare a corpului buclei se numește **iterație**.

### Exemplul 2 — Numerele de la 1 la 10

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 10; i++) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
1 2 3 4 5 6 7 8 9 10 
```

Poți folosi contorul în interior: aici îl afișăm, urmat de un spațiu. După buclă, `cout << endl;` trece pe rândul următor.

### Exemplul 3 — Ce se întâmplă la fiecare iterație

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 4; i++) {
        cout << "Iteratia " << i << ": i = " << i << ", dublul lui i = " << i * 2 << endl;
    }
    cout << "Bucla s-a terminat." << endl;
    return 0;
}
```

**Ieșire:**
```
Iteratia 1: i = 1, dublul lui i = 2
Iteratia 2: i = 2, dublul lui i = 4
Iteratia 3: i = 3, dublul lui i = 6
Iteratia 4: i = 4, dublul lui i = 8
Bucla s-a terminat.
```

Când `i` devine 5, condiția `i <= 4` este falsă și bucla se oprește. Ultima valoare afișată este 4. Mesajul de după buclă apare o singură dată.

### Exemplul 4 — Numărul de repetări îl alege utilizatorul

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Pana la ce numar numaram? ";
    cin >> n;

    for (int i = 1; i <= n; i++) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
```

**Rulare** (tastezi `7`):
```
Pana la ce numar numaram? 7
1 2 3 4 5 6 7 
```

Aici apare adevărata putere a buclei: aceeași linie de cod funcționează pentru `7`, pentru `70` sau pentru `700`.

### Exemplul 5 — Începem de la 0

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "De la 1: ";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }

    cout << endl << "De la 0: ";
    for (int i = 0; i < 5; i++) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
De la 1: 1 2 3 4 5 
De la 0: 0 1 2 3 4 
```

Ambele bucle se repetă de **5 ori**, dar scrise diferit:
- `i = 1; i <= 5` numără de la 1 până la 5 inclusiv;
- `i = 0; i < 5` numără de la 0 până la 4.

A doua formă (`i = 0; i < n`) este foarte răspândită în C++, pentru că vectorii pe care îi învățăm mai târziu încep de la poziția 0. Reține-o: **de la 0 și cu `<`**, sau **de la 1 și cu `<=`**.

**Încearcă tu (10 min)**  
- [ ] Afișezi de 8 ori un mesaj la alegere  
- [ ] Afișezi numerele de la 1 la `n`, cu `n` citit  
- [ ] Desenezi pe foaie un tabel cu valorile lui `i` pentru `for (int i = 3; i <= 7; i++)`  

---

## 3. Variații ale lui `for`

### Exemplul 6 — Numărătoare inversă

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 10; i >= 1; i--) {
        cout << i << "... ";
    }
    cout << endl << "Start!" << endl;
    return 0;
}
```

**Ieșire:**
```
10... 9... 8... 7... 6... 5... 4... 3... 2... 1... 
Start!
```

Pentru a număra **descrescător**: pornești de la valoarea mare, condiția folosește `>=` (sau `>`), iar pasul este `i--`.

### Exemplul 7 — Pas diferit de 1

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Numere pare pana la 20: ";
    for (int i = 2; i <= 20; i += 2) {
        cout << i << " ";
    }

    cout << endl << "Din 5 in 5: ";
    for (int i = 0; i <= 50; i += 5) {
        cout << i << " ";
    }

    cout << endl << "Numere impare pana la 15: ";
    for (int i = 1; i <= 15; i += 2) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Numere pare pana la 20: 2 4 6 8 10 12 14 16 18 20 
Din 5 in 5: 0 5 10 15 20 25 30 35 40 45 50 
Numere impare pana la 15: 1 3 5 7 9 11 13 15 
```

`i += 2` înseamnă `i = i + 2` (ai învățat scurtătura în Modulul 1, lecția 3). Pasul poate fi orice număr.

### Exemplul 8 — Între două numere citite

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;

    cout << "De la: ";
    cin >> a;
    cout << "Pana la: ";
    cin >> b;

    for (int i = a; i <= b; i++) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
```

**Rulare 1** (tastezi `4` și `9`):
```
De la: 4
Pana la: 9
4 5 6 7 8 9 
```

**Rulare 2** (tastezi `9` și `4`):
```
De la: 9
Pana la: 4

```

La a doua rulare nu apare nimic: condiția `9 <= 4` este falsă de la început, deci corpul buclei **nu se execută niciodată**. Este normal, nu o eroare. Dacă vrei să tratezi și cazul invers, adaugi un `if` care schimbă între ele `a` și `b`.

### Exemplul 9 — Contorul crește cu o regulă proprie

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Puterile lui 2: ";
    for (int p = 1; p <= 1000; p *= 2) {
        cout << p << " ";
    }

    cout << endl << "Impartim la 10 la fiecare pas: ";
    for (int x = 1000; x >= 1; x /= 10) {
        cout << x << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Puterile lui 2: 1 2 4 8 16 32 64 128 256 512 
Impartim la 10 la fiecare pas: 1000 100 10 1 
```

Pasul nu trebuie să fie `++` sau `--`. Poate fi orice instrucțiune: `p *= 2` dublează valoarea la fiecare iterație, iar `x /= 10` o împarte la 10.

**Încearcă tu (10 min)**  
- [ ] Afișezi numerele de la 20 la 1  
- [ ] Afișezi multiplii lui 7 până la 70  
- [ ] Afișezi puterile lui 3 până la 500 (1, 3, 9, 27, …)  

---

## 4. `for` cu `char` și cu `if` în interior

### Exemplul 10 — Literele alfabetului

```cpp
#include <iostream>
using namespace std;

int main() {
    for (char c = 'A'; c <= 'Z'; c++) {
        cout << c << " ";
    }
    cout << endl;

    for (char c = 'z'; c >= 'u'; c--) {
        cout << c;
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 
zyxwvu
```

Contorul poate fi și `char`, pentru că literele au coduri ASCII consecutive (Modulul 1, lecția 5). `c++` trece la litera următoare.

### Exemplul 11 — Pătratele numerelor

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Numar\tPatrat\tCub" << endl;
    for (int i = 1; i <= 8; i++) {
        cout << i << "\t" << i * i << "\t" << i * i * i << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Numar	Patrat	Cub
1	1	1
2	4	8
3	9	27
4	16	64
5	25	125
6	36	216
7	49	343
8	64	512
```

Un `for` combinat cu `\t` produce un tabel întreg. Calculele depind de contor, deci fiecare rând are valori diferite.

### Exemplul 12 — `for` cu `if`: Fizz și Buzz

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 15; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            cout << "FizzBuzz" << endl;
        } else if (i % 3 == 0) {
            cout << "Fizz" << endl;
        } else if (i % 5 == 0) {
            cout << "Buzz" << endl;
        } else {
            cout << i << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

Regula: numerele divizibile cu 3 devin „Fizz”, cele divizibile cu 5 devin „Buzz”, iar cele divizibile cu amândouă devin „FizzBuzz”. Este o problemă clasică, folosită chiar și la interviurile de angajare. Observă că cazul „amândouă” este verificat **primul**, pentru că este cel mai restrictiv (Modulul 1, lecția 7).

---

## 5. Proiecte mici

### Exemplul 13 — Tabla înmulțirii

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Tabla inmultirii cu: ";
    cin >> n;

    for (int i = 1; i <= 10; i++) {
        cout << n << " x " << i << " = " << n * i << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `7`):
```
Tabla inmultirii cu: 7
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
```

### Exemplul 14 — O linie de steluțe

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Cate stelute? ";
    cin >> n;

    for (int i = 1; i <= n; i++) {
        cout << "*";
    }
    cout << endl;
    return 0;
}
```

**Rulare** (tastezi `12`):
```
Cate stelute? 12
************
```

Fiecare iterație afișează o singură stea, fără `endl`, deci toate apar pe același rând. Un `endl` după buclă încheie rândul.

### Exemplul 15 — Rachetă cu numărătoare inversă

```cpp
/*
   Program: Racheta
   Scop:    numaratoare inversa cu mesaje diferite
*/
#include <iostream>
using namespace std;

int main() {
    int start;

    cout << "De la cat numaram? ";
    cin >> start;

    for (int i = start; i >= 1; i--) {
        cout << i << "...";
        if (i == 3) {
            cout << " pregatiti!";
        }
        if (i == 1) {
            cout << " aprindere motoare!";
        }
        cout << endl;
    }

    cout << "DECOLARE!" << endl;
    return 0;
}
```

**Rulare** (tastezi `5`):
```
De la cat numaram? 5
5...
4...
3... pregatiti!
2...
1... aprindere motoare!
DECOLARE!
```

### Exemplul 16 — Raportul unui an de economii

```cpp
/*
   Program: Economii
   Scop:    cat economisesti in 12 luni daca pui deoparte o suma fixa
*/
#include <iostream>
using namespace std;

int main() {
    int sumaLunara;

    cout << "Cat pui deoparte pe luna (lei)? ";
    cin >> sumaLunara;

    cout << "Luna\tEconomii" << endl;
    for (int luna = 1; luna <= 12; luna++) {
        cout << luna << "\t" << luna * sumaLunara << " lei" << endl;
    }

    cout << "In 12 luni ai " << 12 * sumaLunara << " lei." << endl;
    return 0;
}
```

**Rulare** (tastezi `50`):
```
Cat pui deoparte pe luna (lei)? 50
Luna	Economii
1	50 lei
2	100 lei
3	150 lei
4	200 lei
5	250 lei
6	300 lei
7	350 lei
8	400 lei
9	450 lei
10	500 lei
11	550 lei
12	600 lei
In 12 luni ai 600 lei.
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Tabla înmulțirii” (obligatoriu)
Citește un număr `n` și afișează tabla înmulțirii cu `n`, de la `n x 1` la `n x 10`, ca în Exemplul 13.

### Exercițiul B — Numere într-un interval
Citește două numere `a` și `b` și afișează toate numerele de la `a` la `b`. Dacă `a` este mai mare decât `b`, afișează-le în ordine descrescătoare.

### Exercițiul C — Multiplii
Citește un număr `n` și un număr `m`. Afișează primii `m` multipli ai lui `n` (de exemplu, pentru `n = 4` și `m = 5`: `4 8 12 16 20`).

### Exercițiul D — Alfabetul invers
Afișează alfabetul de la `Z` la `A`, apoi alfabetul cu litere mici de la `a` la `z`.

### Exercițiul E — Pătrate și cuburi
Citește un număr `n` și afișează un tabel cu numerele de la 1 la `n`, pătratele și cuburile lor, aliniat cu `\t`.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Folosește minimum o buclă `for`  
- [ ] Numărul de repetări vine de la tastatură (`cin`)  
- [ ] Ai testat cu minimum 2 valori diferite, inclusiv una mică (`1`)  
- [ ] Ai explicat pe foaie cele trei părți ale lui `for`  
- [ ] Fișierul se numește `Prenume_Nume_M2L1.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Afișează tabla înmulțirii pentru **toate** numerele de la 1 la 3, una după alta (pentru asta ai nevoie de un `for` în alt `for`, lecția 5 din acest modul, dar poți încerca să-l scrii singur)  
- [ ] Afișează numerele de la 1 la 100 care sunt divizibile cu 7  
- [ ] Scrie un program care afișează „Salut, <nume>!” de câte ori vrei tu  
- [ ] Afișează numerele de la 1 la 50, câte 10 pe fiecare rând (ajutor: `if (i % 10 == 0) cout << endl;`)  
- [ ] Afișează pe un rând: `1 2 3 4 5 4 3 2 1`  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Bucla nu se oprește niciodată | Condiția rămâne adevărată (de exemplu `i--` într-o buclă care crește) | Verifică dacă pasul duce spre oprire |
| Bucla nu se execută deloc | Condiția este falsă de la început (`i = 10; i < 5`) | Verifică valoarea de start și sensul comparației |
| Se repetă cu o dată mai mult sau mai puțin | `<` în loc de `<=` (sau invers) | Testează `n = 1` și `n = 2` și numără pe foaie |
| `for (int i = 0; i < 5; i++);` și corpul rulează o singură dată | Un `;` după paranteză încheie bucla | Fără `;` după `)` |
| `for (int i = 0, i < 5, i++)` | Ai folosit virgule în loc de `;` | Pune `;` între cele trei părți |
| `i was not declared` după buclă | `int i` declarat în `for` există doar în buclă | Declară `int i;` înainte de `for` dacă ai nevoie de el după |
| Afișarea e lipită | Ai uitat spațiul sau `endl` | `cout << i << " ";` |
| Valori foarte mari sau ciudate | Contorul a depășit limita lui `int` | Folosește condiții realiste sau `long long` (lecția următoare) |
| Contorul se modifică în corp | `i++` și în corp, și în paranteză | Modifică `i` o singură dată pe iterație, ca să nu sari peste valori |

---

## Recapitulare pe scurt

- `for (start; condiție; pas) { … }` repetă corpul cât timp condiția este adevărată.
- Start se execută o dată, condiția înainte de fiecare iterație, pasul după fiecare iterație.
- Numărare crescătoare: `for (int i = 1; i <= n; i++)`. Descrescătoare: `for (int i = n; i >= 1; i--)`. Din 2 în 2: `i += 2`.
- „De la 0 cu `<`” și „de la 1 cu `<=`” repetă de același număr de ori.
- Dacă condiția este falsă de la început, corpul nu se execută.
- Contorul poate fi și `char`, iar corpul poate conține `if`, `cin`, `cout`.
- Un `;` pus după paranteza lui `for` strică bucla.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie un program care citește un număr `n` și afișează primele `n` numere pare.  
3. Scrie un program care afișează tabla înmulțirii cu 9, dar de la `9 x 10` în jos spre `9 x 1`.  
4. Scrie un program care citește `n` și afișează expresia `1 + 2 + … + n` ca text (de exemplu, pentru `n = 5`: `1 + 2 + 3 + 4 + 5`), fără să calculezi suma. Atenție la ultimul termen: fără `+` după el!  
5. **Bonus:** program care afișează un „ceas cu număr de secunde”: de la `10` la `0`, cu mesajul „Timp expirat!” la final.  
6. Salvează tot ca `Tema_M2L1_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 2
Învățăm să **adunăm și să numărăm** cu ajutorul buclelor: sume, produse și numărări (de exemplu, „câte numere pare sunt între 1 și 100?”).
