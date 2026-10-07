# LECȚIA 7 — Divizibilitate și numere prime
**Modulul 3 · Funcții, string, algoritmi · 2 ore**  
**Code Maker Club · Problem Solver**

> Azi explorăm „personalitatea” numerelor: cu ce se împart exact, care sunt numerele **prime** (cele care nu se împart decât la 1 și la ele însele) și cum aflăm cel mai mare divizor comun. Sunt teme clasice de olimpiadă și baza criptografiei moderne.  
> Proiect: **„Laboratorul de numere”** · fișier: `Prenume_Nume_M3L7.cpp` (ex. `Ana_Pop_M3L7.cpp`)

---

## Obiectiv
La finalul orei verifici dacă un număr se împarte exact la altul, afli divizorii unui număr, scrii o funcție `estePrim` (simplă și rapidă), afișezi numerele prime dintr-un interval, descompui un număr în factori primi, calculezi `cmmdc` și `cmmmc` și folosești ciurul lui Eratostene.  
**Minim:** funcțiile `estePrim` și `numarDivizori`.  
**Ținta orei (Complet):** + `cmmdc`, factorizare și un meniu care le folosește.

## De ce contează
Numerele prime protejează parolele și plățile din internet (criptografia se bazează pe faptul că e greu să descompui numere foarte mari în factori primi). Iar ideile din această lecție, optimizarea unui algoritm și folosirea unor proprietăți ale numerelor, te ajută la orice problemă matematică din programare.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `%` și algoritmi pe cifre |
| 10–30 | Divizibilitate, divizori (**Exemplele 1–3**) |
| 30–50 | Optimizare: de ce ajunge să verificăm până la rădăcină (**Exemplul 4**) |
| 50–80 | Numere prime (**Exemplele 5–8**) |
| 80–100 | Factori primi, `cmmdc`, `cmmmc` (**Exemplele 9–11**) |
| 100–118 | Numere speciale (**Exemplele 12–13**), ciurul și Goldbach (**Exemplele 14–15**, nivel mai ridicat) și proiectul (**Exemplul 16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Divizibilitate și divizori

Spunem că `a` este **divizibil** cu `b` (sau că `b` este **divizor** al lui `a`) dacă `a` se împarte exact la `b`, adică restul este zero: `a % b == 0`.

```
12 % 3 == 0   → 12 se împarte exact la 3   (3 este divizor al lui 12)
12 % 5 == 2   → 12 nu se împarte exact la 5
```

Orice număr `n > 0` are cel puțin doi divizori: `1` și `n`. Divizorii lui `12` sunt `1, 2, 3, 4, 6, 12`.

### Exemplul 1 — Funcția `divide` **[Esențial]**

```cpp
#include <iostream>
using namespace std;

bool divide(int a, int b) {
    return a % b == 0;
}

int main() {
    cout << "3 divide 12? " << divide(12, 3) << endl;
    cout << "5 divide 12? " << divide(12, 5) << endl;

    for (int i = 1; i <= 20; i++) {
        if (divide(i, 4)) {
            cout << i << " este multiplu de 4" << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
3 divide 12? 1
5 divide 12? 0
4 este multiplu de 4
8 este multiplu de 4
12 este multiplu de 4
16 este multiplu de 4
20 este multiplu de 4
```

Un `bool` se afișează `1` (adevărat) sau `0` (fals). Atenție la ordinea parametrilor: `divide(12, 3)` verifică dacă `3` divide `12`, adică `12 % 3 == 0`.

### Exemplul 2 — Toți divizorii unui număr **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void afiseazaDivizori(int n) {
    cout << "Divizorii lui " << n << ": ";
    for (int d = 1; d <= n; d++) {
        if (n % d == 0) {
            cout << d << " ";
        }
    }
    cout << endl;
}

int main() {
    afiseazaDivizori(12);
    afiseazaDivizori(17);
    afiseazaDivizori(36);
    afiseazaDivizori(1);
    return 0;
}
```

**Ieșire:**
```
Divizorii lui 12: 1 2 3 4 6 12 
Divizorii lui 17: 1 17 
Divizorii lui 36: 1 2 3 4 6 9 12 18 36 
Divizorii lui 1: 1 
```

Încercăm, pe rând, fiecare `d` de la `1` la `n`. Cei pentru care restul este `0` sunt divizori.

### Exemplul 3 — Numărul și suma divizorilor **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int numarDivizori(int n) {
    int contor = 0;
    for (int d = 1; d <= n; d++) {
        if (n % d == 0) {
            contor++;
        }
    }
    return contor;
}

int sumaDivizorilor(int n) {
    int suma = 0;
    for (int d = 1; d <= n; d++) {
        if (n % d == 0) {
            suma += d;
        }
    }
    return suma;
}

int main() {
    int numere[4] = {12, 17, 28, 100};

    for (int i = 0; i < 4; i++) {
        int n = numere[i];
        cout << n << ": " << numarDivizori(n) << " divizori, suma "
             << sumaDivizorilor(n) << endl;
    }
    return 0;
}
```

**Ieșire:**
```
12: 6 divizori, suma 28
17: 2 divizori, suma 18
28: 6 divizori, suma 56
100: 9 divizori, suma 217
```

Acestea sunt șabloanele de numărare și de sumă din Modulul 2, cu o condiție de divizibilitate.

**Încearcă tu (8 min)**  
- [ ] Afișezi toți divizorii lui 60  
- [ ] Afli cine are mai mulți divizori, 48 sau 50  
- [ ] Afișezi multiplii lui 7 mai mici decât 100  

---

## 2. Optimizare: ajunge să verificăm până la rădăcină

Divizorii vin în **perechi**. Pentru `n = 36`:

```
1 × 36    2 × 18    3 × 12    4 × 9    6 × 6
```

În fiecare pereche, un divizor este mai mic sau egal cu `√n`, iar celălalt mai mare. Deci ajunge să căutăm `d` doar până la `√n` și, când găsim un divizor `d`, îl obținem automat și pe `n / d`. Pentru `n = 1000000` verificăm doar 1000 de numere în loc de un milion! Vom scrie condiția `d * d <= n`, ca să evităm calculul cu `sqrt`.

### Exemplul 4 — Divizori în perechi

```cpp
#include <iostream>
using namespace std;

void divizoriRapid(int n) {
    cout << "Perechile de divizori ale lui " << n << ":" << endl;
    for (int d = 1; d * d <= n; d++) {
        if (n % d == 0) {
            if (d == n / d) {
                cout << "  " << d << " (radacina patrata)" << endl;
            } else {
                cout << "  " << d << " si " << n / d << endl;
            }
        }
    }
}

int main() {
    divizoriRapid(36);
    divizoriRapid(30);
    return 0;
}
```

**Ieșire:**
```
Perechile de divizori ale lui 36:
  1 si 36
  2 si 18
  3 si 12
  4 si 9
  6 (radacina patrata)
Perechile de divizori ale lui 30:
  1 si 30
  2 si 15
  3 si 10
  5 si 6
```

Cazul `d == n / d` apare doar când `n` este pătrat perfect (36 = 6 · 6); atunci afișăm divizorul o singură dată. Din acest moment, cuvintele-cheie de optimizare sunt: **`d * d <= n`**.

---

## 3. Numere prime

Un număr natural este **prim** dacă are **exact doi divizori**: `1` și el însuși. Primele numere prime sunt `2, 3, 5, 7, 11, 13, …`. Atenție: `1` **nu** este prim (are un singur divizor), iar `2` este singurul prim par.

### Exemplul 5 — Varianta simplă: contăm divizorii **[Esențial]**

```cpp
#include <iostream>
using namespace std;

bool estePrim(int n) {
    int divizori = 0;
    for (int d = 1; d <= n; d++) {
        if (n % d == 0) {
            divizori++;
        }
    }
    return divizori == 2;
}

int main() {
    for (int n = 0; n <= 15; n++) {
        cout << n << ": ";
        if (estePrim(n)) {
            cout << "prim" << endl;
        } else {
            cout << "nu e prim" << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
0: nu e prim
1: nu e prim
2: prim
3: prim
4: nu e prim
5: prim
6: nu e prim
7: prim
8: nu e prim
9: nu e prim
10: nu e prim
11: prim
12: nu e prim
13: prim
14: nu e prim
15: nu e prim
```

Definiția a fost scrisă direct în cod: „exact doi divizori”. Funcționează corect și pentru `0` și `1` (care nu sunt prime). Dar este lentă pentru numere mari.

### Exemplul 6 — Varianta rapidă (până la rădăcină) **[Esențial]**

```cpp
#include <iostream>
using namespace std;

bool estePrim(int n) {
    if (n < 2) {
        return false;
    }
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    int teste[8] = {1, 2, 9, 17, 25, 97, 7919, 1000003};

    for (int i = 0; i < 8; i++) {
        cout << teste[i] << ": ";
        if (estePrim(teste[i])) {
            cout << "prim" << endl;
        } else {
            cout << "nu e prim" << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
1: nu e prim
2: prim
9: nu e prim
17: prim
25: nu e prim
97: prim
7919: prim
1000003: prim
```

Pașii sunt: numerele mai mici decât 2 nu sunt prime; încercăm divizorii de la `2` până la `√n`; dacă găsim unul, ieșim imediat cu `return false`. Dacă nu găsim niciunul, numărul este prim. Pentru `1000003` verificăm doar aproximativ o mie de numere.

### Exemplul 7 — Numerele prime dintr-un interval **[Esențial]**

```cpp
#include <iostream>
using namespace std;

bool estePrim(int n) {
    if (n < 2) {
        return false;
    }
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    int total = 0;

    cout << "Numerele prime pana la 100:" << endl;
    for (int n = 2; n <= 100; n++) {
        if (estePrim(n)) {
            cout << n << " ";
            total++;
        }
    }
    cout << endl << "Total: " << total << endl;
    return 0;
}
```

**Ieșire:**
```
Numerele prime pana la 100:
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 
Total: 25
```

Funcția `estePrim` face ca bucla din `main` să fie foarte simplă. Compară cu Modulul 2, lecția 5, unde aceeași verificare era scrisă direct în interiorul unei bucle imbricate.

### Exemplul 8 — Următorul număr prim

```cpp
#include <iostream>
using namespace std;

bool estePrim(int n) {
    if (n < 2) {
        return false;
    }
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

int urmatorulPrim(int n) {
    int candidat = n + 1;
    while (!estePrim(candidat)) {
        candidat++;
    }
    return candidat;
}

int main() {
    cout << "Dupa 10 vine " << urmatorulPrim(10) << endl;
    cout << "Dupa 13 vine " << urmatorulPrim(13) << endl;
    cout << "Dupa 100 vine " << urmatorulPrim(100) << endl;
    cout << "Dupa 1000 vine " << urmatorulPrim(1000) << endl;
    return 0;
}
```

**Ieșire:**
```
Dupa 10 vine 11
Dupa 13 vine 17
Dupa 100 vine 101
Dupa 1000 vine 1009
```

Nu știm câți pași vom face până la următorul prim, deci `while` este bucla potrivită (Modulul 2, lecția 3). Teoretic, bucla se termină mereu, pentru că există prime oricât de mari.

**Încearcă tu (10 min)**  
- [ ] Afișezi numerele prime între 100 și 150  
- [ ] Afli al 10-lea număr prim  
- [ ] Verifici dacă `2027` este prim  

---

## 4. Factori primi, `cmmdc`, `cmmmc`

### Exemplul 9 — Descompunerea în factori primi

Orice număr se scrie ca produs de numere prime: `60 = 2 · 2 · 3 · 5`. Împărțim pe `n` la `2` cât timp se poate, apoi la `3`, și tot așa.

```cpp
#include <iostream>
using namespace std;

void factorizeaza(int n) {
    cout << n << " = ";
    bool primul = true;

    for (int d = 2; d * d <= n; d++) {
        while (n % d == 0) {
            if (!primul) {
                cout << " * ";
            }
            cout << d;
            primul = false;
            n /= d;
        }
    }

    if (n > 1) {
        if (!primul) {
            cout << " * ";
        }
        cout << n;
    }
    cout << endl;
}

int main() {
    factorizeaza(60);
    factorizeaza(97);
    factorizeaza(360);
    factorizeaza(1001);
    return 0;
}
```

**Ieșire:**
```
60 = 2 * 2 * 3 * 5
97 = 97
360 = 2 * 2 * 2 * 3 * 3 * 5
1001 = 7 * 11 * 13
```

Un `while` în interiorul unui `for`: pentru fiecare `d` îl scoatem din `n` de câte ori se poate. La final, dacă a mai rămas ceva mai mare ca 1, acel rest este un factor prim (ultimul). Variabila `primul` decide dacă afișăm semnul `*` înainte de factor.

### Exemplul 10 — Cel mai mare divizor comun (`cmmdc`) și cel mai mic multiplu comun (`cmmmc`) **[Esențial]**

**Cmmdc**(a, b) este cel mai mare număr care îi împarte pe amândoi. Algoritmul lui **Euclid**: cât timp `b` nu este zero, înlocuim perechea `(a, b)` cu `(b, a % b)`. Rezultatul este `a`.

```
cmmdc(48, 18):   (48, 18) → (18, 12) → (12, 6) → (6, 0)   rezultat: 6
```

**Cmmmc**(a, b) = (a · b) / cmmdc(a, b).

```cpp
#include <iostream>
using namespace std;

int cmmdc(int a, int b) {
    while (b != 0) {
        int rest = a % b;
        a = b;
        b = rest;
    }
    return a;
}

long long cmmmc(int a, int b) {
    return (long long)a / cmmdc(a, b) * b;
}

int main() {
    cout << "cmmdc(48, 18) = " << cmmdc(48, 18) << endl;
    cout << "cmmmc(48, 18) = " << cmmmc(48, 18) << endl;
    cout << "cmmdc(17, 5) = " << cmmdc(17, 5) << endl;
    cout << "cmmmc(4, 6) = " << cmmmc(4, 6) << endl;
    cout << "cmmdc(100, 75) = " << cmmdc(100, 75) << endl;
    return 0;
}
```

**Ieșire:**
```
cmmdc(48, 18) = 6
cmmmc(48, 18) = 144
cmmdc(17, 5) = 1
cmmmc(4, 6) = 12
cmmdc(100, 75) = 25
```

La `cmmmc` am scris întâi împărțirea, `a / cmmdc * b`, ca produsul `a · b` să nu depășească limita unui `int` când numerele sunt mari. Două numere cu `cmmdc = 1` se numesc **prime între ele** (de exemplu 17 și 5).

### Exemplul 11 — Fracție ireductibilă

Simplificăm o fracție împărțind numărătorul și numitorul la `cmmdc`.

```cpp
#include <iostream>
using namespace std;

int cmmdc(int a, int b) {
    while (b != 0) {
        int rest = a % b;
        a = b;
        b = rest;
    }
    return a;
}

void simplifica(int sus, int jos) {
    int d = cmmdc(sus, jos);
    cout << sus << "/" << jos << " = " << sus / d << "/" << jos / d << endl;
}

int main() {
    simplifica(12, 18);
    simplifica(35, 49);
    simplifica(7, 13);
    simplifica(100, 400);
    return 0;
}
```

**Ieșire:**
```
12/18 = 2/3
35/49 = 5/7
7/13 = 7/13
100/400 = 1/4
```

O fracție în care numărătorul și numitorul sunt prime între ele (`7/13`) nu mai poate fi simplificată: `cmmdc = 1`.

---

## 5. Numere speciale, ciurul, proiect

### Exemplul 12 — Numere perfecte

Un număr este **perfect** dacă este egal cu suma divizorilor lui mai mici decât el. De exemplu, `6 = 1 + 2 + 3`.

```cpp
#include <iostream>
using namespace std;

bool estePerfect(int n) {
    int suma = 0;
    for (int d = 1; d <= n / 2; d++) {
        if (n % d == 0) {
            suma += d;
        }
    }
    return n > 1 && suma == n;
}

int main() {
    cout << "Numere perfecte pana la 10000: ";
    for (int n = 2; n <= 10000; n++) {
        if (estePerfect(n)) {
            cout << n << " ";
        }
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Numere perfecte pana la 10000: 6 28 496 8128 
```

Un divizor propriu al lui `n` nu poate fi mai mare ca `n / 2`, deci căutăm doar până acolo. Numerele perfecte sunt foarte rare: sub zece mii există doar patru.

### Exemplul 13 — Numere prime „gemene”

Două numere prime care diferă prin 2 se numesc **gemene**: `(3, 5)`, `(11, 13)`.

```cpp
#include <iostream>
using namespace std;

bool estePrim(int n) {
    if (n < 2) {
        return false;
    }
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    cout << "Perechi de prime gemene pana la 100:" << endl;
    for (int n = 2; n + 2 <= 100; n++) {
        if (estePrim(n) && estePrim(n + 2)) {
            cout << "(" << n << ", " << n + 2 << ") ";
        }
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Perechi de prime gemene pana la 100:
(3, 5) (5, 7) (11, 13) (17, 19) (29, 31) (41, 43) (59, 61) (71, 73) 
```

Condiția `estePrim(n) && estePrim(n + 2)` se citește exact ca propoziția: „n este prim și n + 2 este prim”.

> **Notă:** de aici înainte exemplele sunt mai grele. Ele sunt pentru cei care vor mai mult; dacă te simți nesigur, citește-le doar ca să vezi ce se poate face și treci direct la proiect. **Proiectul lecției se poate face fără ele.**

### Exemplul 14 — Ciurul lui Eratostene *(Provocare, opțional)*

Pentru a găsi **toate** numerele prime dintr-un interval mare, există o metodă veche de peste 2000 de ani: scrii toate numerele, apoi tai multiplii fiecărui prim. Ce rămâne netăiat sunt numerele prime.

```cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 100;
    bool prim[N + 1];

    for (int i = 0; i <= N; i++) {
        prim[i] = true;
    }
    prim[0] = false;
    prim[1] = false;

    for (int i = 2; i * i <= N; i++) {
        if (prim[i]) {
            for (int j = i * i; j <= N; j += i) {
                prim[j] = false;
            }
        }
    }

    int total = 0;
    for (int i = 2; i <= N; i++) {
        if (prim[i]) {
            cout << i << " ";
            total++;
        }
    }
    cout << endl << "Total: " << total << endl;
    return 0;
}
```

**Ieșire:**
```
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 
Total: 25
```

Vectorul `prim` are valoarea `true` pentru numerele despre care credem că sunt prime. Pentru fiecare prim `i`, marcăm cu `false` multiplii lui, începând de la `i * i` (cei mai mici au fost deja tăiați de primii mai mici). Pentru `N = 1000000`, ciurul găsește toate primele într-o fracțiune de secundă!

### Exemplul 15 — Conjectura lui Goldbach *(Provocare, opțional)*

Se crede (dar nu s-a demonstrat!) că **orice număr par mai mare ca 2 este suma a două numere prime**. Verificăm pentru câteva numere.

```cpp
#include <iostream>
using namespace std;

bool estePrim(int n) {
    if (n < 2) {
        return false;
    }
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

void goldbach(int n) {
    for (int p = 2; p <= n / 2; p++) {
        if (estePrim(p) && estePrim(n - p)) {
            cout << n << " = " << p << " + " << n - p << endl;
            return;
        }
    }
    cout << n << ": nu am gasit (ar fi un rezultat istoric!)" << endl;
}

int main() {
    for (int n = 4; n <= 30; n += 2) {
        goldbach(n);
    }
    return 0;
}
```

**Ieșire:**
```
4 = 2 + 2
6 = 3 + 3
8 = 3 + 5
10 = 3 + 7
12 = 5 + 7
14 = 3 + 11
16 = 3 + 13
18 = 5 + 13
20 = 3 + 17
22 = 3 + 19
24 = 5 + 19
26 = 3 + 23
28 = 5 + 23
30 = 7 + 23
```

Pentru fiecare număr par căutăm un prim `p` astfel încât și `n - p` să fie prim. Mesajul de la final nu apare niciodată, pentru că în calculatoare conjectura a fost verificată până la numere uriașe. Dacă ai găsi tu un contraexemplu, ai face istorie.

### Exemplul 16 — „Laboratorul de numere” (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Laboratorul de numere
   Scop:    meniu cu algoritmi pe divizori si numere prime
*/
#include <iostream>
using namespace std;

bool estePrim(int n) {
    if (n < 2) {
        return false;
    }
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

int cmmdc(int a, int b) {
    while (b != 0) {
        int rest = a % b;
        a = b;
        b = rest;
    }
    return a;
}

void divizori(int n) {
    cout << "Divizorii lui " << n << ": ";
    for (int d = 1; d <= n; d++) {
        if (n % d == 0) {
            cout << d << " ";
        }
    }
    cout << endl;
}

void factorizeaza(int n) {
    cout << n << " = ";
    bool primul = true;
    for (int d = 2; d * d <= n; d++) {
        while (n % d == 0) {
            if (!primul) {
                cout << " * ";
            }
            cout << d;
            primul = false;
            n /= d;
        }
    }
    if (n > 1) {
        if (!primul) {
            cout << " * ";
        }
        cout << n;
    }
    cout << endl;
}

void primeInInterval(int a, int b) {
    int total = 0;
    for (int n = a; n <= b; n++) {
        if (estePrim(n)) {
            cout << n << " ";
            total++;
        }
    }
    cout << endl << "Total: " << total << endl;
}

void meniu() {
    cout << endl << "===== LABORATOR DE NUMERE =====" << endl;
    cout << "1. Este prim?" << endl;
    cout << "2. Divizorii unui numar" << endl;
    cout << "3. Descompunere in factori primi" << endl;
    cout << "4. Cmmdc si cmmmc" << endl;
    cout << "5. Numerele prime dintr-un interval" << endl;
    cout << "0. Iesire" << endl;
    cout << "Alege: ";
}

int main() {
    int optiune;

    do {
        meniu();
        cin >> optiune;

        if (optiune == 1) {
            int n;
            cout << "Numarul: ";
            cin >> n;
            if (estePrim(n)) {
                cout << n << " este prim." << endl;
            } else {
                cout << n << " nu este prim." << endl;
            }
        } else if (optiune == 2) {
            int n;
            cout << "Numarul (pozitiv): ";
            cin >> n;
            if (n < 1) {
                cout << "Valoare invalida." << endl;
            } else {
                divizori(n);
            }
        } else if (optiune == 3) {
            int n;
            cout << "Numarul (peste 1): ";
            cin >> n;
            if (n < 2) {
                cout << "Valoare invalida." << endl;
            } else {
                factorizeaza(n);
            }
        } else if (optiune == 4) {
            int a, b;
            cout << "Doua numere pozitive: ";
            cin >> a >> b;
            if (a < 1 || b < 1) {
                cout << "Valori invalide." << endl;
            } else {
                int d = cmmdc(a, b);
                cout << "cmmdc = " << d << ", cmmmc = " << (long long)a / d * b << endl;
            }
        } else if (optiune == 5) {
            int a, b;
            cout << "Intervalul [a, b]: ";
            cin >> a >> b;
            if (a > b) {
                cout << "Intervalul este invalid." << endl;
            } else {
                primeInInterval(a, b);
            }
        } else if (optiune != 0) {
            cout << "Optiune invalida." << endl;
        }
    } while (optiune != 0);

    cout << "La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1 97`, `2 28`, `3 360`, `4 48 18`, `5 10 30`, `0`):
```

===== LABORATOR DE NUMERE =====
1. Este prim?
2. Divizorii unui numar
3. Descompunere in factori primi
4. Cmmdc si cmmmc
5. Numerele prime dintr-un interval
0. Iesire
Alege: 1
Numarul: 97
97 este prim.

===== LABORATOR DE NUMERE =====
1. Este prim?
2. Divizorii unui numar
3. Descompunere in factori primi
4. Cmmdc si cmmmc
5. Numerele prime dintr-un interval
0. Iesire
Alege: 2
Numarul (pozitiv): 28
Divizorii lui 28: 1 2 4 7 14 28 

===== LABORATOR DE NUMERE =====
1. Este prim?
2. Divizorii unui numar
3. Descompunere in factori primi
4. Cmmdc si cmmmc
5. Numerele prime dintr-un interval
0. Iesire
Alege: 3
Numarul (peste 1): 360
360 = 2 * 2 * 2 * 3 * 3 * 5

===== LABORATOR DE NUMERE =====
1. Este prim?
2. Divizorii unui numar
3. Descompunere in factori primi
4. Cmmdc si cmmmc
5. Numerele prime dintr-un interval
0. Iesire
Alege: 4
Doua numere pozitive: 48
18
cmmdc = 6, cmmmc = 144

===== LABORATOR DE NUMERE =====
1. Este prim?
2. Divizorii unui numar
3. Descompunere in factori primi
4. Cmmdc si cmmmc
5. Numerele prime dintr-un interval
0. Iesire
Alege: 5
Intervalul [a, b]: 10
30
11 13 17 19 23 29 
Total: 6

===== LABORATOR DE NUMERE =====
1. Este prim?
2. Divizorii unui numar
3. Descompunere in factori primi
4. Cmmdc si cmmmc
5. Numerele prime dintr-un interval
0. Iesire
Alege: 0
La revedere!
```

Observă cât de scurt este `main`: fiecare opțiune validează datele și apelează o funcție. Ai folosit tot ce înveți în modul: meniuri (`do-while`), funcții cu și fără `return`, `bool`, `while`, `for`, validări. Textul meniului este tot într-o funcție.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Laboratorul de numere” (obligatoriu)
Scrie programul din Exemplul 16 și adaugă o opțiune: „Următorul număr prim după n”.

### Exercițiul B — Numere prime speciale
Afișează numerele prime de 3 cifre care sunt și palindroame (de exemplu `101`, `131`). Poți folosi funcția `oglindit` din lecția anterioară.

### Exercițiul C — Fracții
Citește o fracție (numărător și numitor), simplifică-o și afișează rezultatul. Dacă numitorul este `0`, afișează un mesaj de eroare.

### Exercițiul D — Prime între ele
Citește două numere și spune dacă sunt prime între ele (cmmdc = 1). Afișează apoi toate numerele de la 1 la 50 care sunt prime cu 12.

### Exercițiul E — Ciurul *(Provocare, opțional)*
Folosește ciurul lui Eratostene pentru a afișa toate numerele prime până la 500, câte 10 pe rând, și numărul lor total.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] `estePrim` verifică doar până la `d * d <= n` și tratează `n < 2`  
- [ ] Ai o funcție `cmmdc` cu algoritmul lui Euclid  
- [ ] Meniul se repetă și are validări  
- [ ] Ai testat `1`, `2`, un număr prim mare și un pătrat perfect  
- [ ] Fișierul se numește `Prenume_Nume_M3L7.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Afișează primele 20 de numere prime  
- [ ] Afișează toate numerele prime de forma `2^k − 1` (prime Mersenne) pentru `k` până la 20  
- [ ] Scrie funcția `numarFactoriPrimi(n)` care numără factorii primi **distincți** ai lui `n`  
- [ ] Scrie funcția `cmmdc3(a, b, c)` folosind `cmmdc` de două ori  
- [ ] Afișează toate tripletele pitagorice `(a, b, c)` cu `c ≤ 50` (adică `a² + b² = c²`)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `1` apare ca prim | Lipsește verificarea `n < 2` | `if (n < 2) return false;` |
| `4` apare ca prim | Bucla începe de la `d = 1` sau se oprește prea devreme | Pornește de la `d = 2`; condiția `d * d <= n` |
| Programul rulează foarte lent pentru numere mari | Verifici până la `n` | Verifică doar până la `d * d <= n` |
| `cmmdc(0, 5)` sau valori negative | Algoritmul presupune numere pozitive | Validează intrările |
| `cmmmc` este greșit la numere mari | `a * b` depășește `int` | `(long long)a / cmmdc(a, b) * b` |
| Împărțire la zero (`n % 0`) | `d` sau `b` este `0` | Verifică înainte să împarți |
| Factorii primi se afișează de două ori | Ai folosit `if` în loc de `while` pentru împărțire | `while (n % d == 0)` |
| Lipsește ultimul factor prim | Ai uitat restul `n > 1` de la final | `if (n > 1) cout << n;` |

---

## Recapitulare pe scurt

- `a` este divizibil cu `b` dacă `a % b == 0`.
- Divizorii vin în perechi: ajunge să verifici până la `d * d <= n`.
- **Număr prim:** exact doi divizori (`1` și el însuși); `0` și `1` nu sunt prime; `2` este singurul prim par.
- `estePrim(n)`: `if (n < 2) return false; for (d = 2; d * d <= n; d++) if (n % d == 0) return false; return true;`
- **Factorizare:** pentru fiecare `d`, `while (n % d == 0) { afișează d; n /= d; }`, apoi, dacă `n > 1`, mai rămâne un factor.
- **Euclid:** `while (b != 0) { rest = a % b; a = b; b = rest; }` → rezultatul este `a`. `cmmmc = a / cmmdc * b`.
- **Ciurul lui Eratostene:** vector de `bool`; pentru fiecare prim `i` marchezi multiplii lui începând de la `i * i`.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie un program care citește un număr și afișează: dacă este prim, câți divizori are, suma divizorilor și descompunerea în factori primi.  
3. Afișează toate perechile de numere prime gemene dintre 100 și 300.  
4. Scrie funcția `bool primeIntreEle(int a, int b)` și afișează toate perechile `(a, b)` cu `1 ≤ a < b ≤ 10` care sunt prime între ele.  
5. **Bonus:** scrie un program care calculează câți divizori are fiecare număr de la 1 la 100 și afișează numărul cu cei mai mulți divizori.  
6. Salvează tot ca `Tema_M3L7_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 8
Facem numerele să fie **imprevizibile**: învățăm `rand()`, aruncăm zaruri virtuale, tragem la sorți și construim primele jocuri cu noroc.
