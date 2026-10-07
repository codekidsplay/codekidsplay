# LECȚIA 3 — Funcții care returnează valori
**Modulul 3 · Funcții, string, algoritmi · 2 ore**  
**Code Maker Club · Problem Solver**

> Până acum funcțiile tale **afișau** ceva. Azi înveți funcții care **calculează un răspuns și îl trimit înapoi**, cu `return`, ca să-l poți folosi mai departe: într-o variabilă, într-o condiție sau în alt calcul.  
> Proiect: **„Calculatorul cu funcții”** · fișier: `Prenume_Nume_M3L3.cpp` (ex. `Ana_Pop_M3L3.cpp`)

---

## Obiectiv
La finalul orei scrii funcții cu tip de întoarcere (`int`, `double`, `bool`, `string`, `long long`), folosești `return`, apelezi funcțiile în expresii și în condiții, scrii funcții de tip „da/nu” (`estePar`), calculezi `factorial` și `putere` și lucrezi cu funcții care primesc vectori.  
**Minim:** funcțiile `maxim(a, b)` și `estePar(n)`.  
**Ținta orei (Complet):** + `factorial`, o funcție pe un vector și un calculator cu meniu, construit din funcții.

## De ce contează
O funcție care doar afișează e greu de reutilizat: rezultatul „dispare” pe ecran. O funcție care **returnează** rezultatul îți dă voie să faci orice cu el: îl afișezi, îl aduni cu altceva, îl compari, îl dai altei funcții. Aproape toate funcțiile utile din programare returnează ceva.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: parametri și referințe |
| 10–30 | `return` și tipul funcției (**Exemplele 1–3**) |
| 30–55 | Maxim, minim, funcții care apelează funcții (**Exemplele 4–5**) |
| 55–75 | Funcții `bool`: „este par?”, „există?” (**Exemplele 6–7**) |
| 75–100 | `factorial`, `putere`, funcții pe vectori (**Exemplele 8–11**) |
| 100–118 | Proiecte (**Exemplele 12–16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. `return` și tipul funcției

Până acum scriam `void` în fața funcțiilor. Dacă în loc de `void` pui un **tip** (`int`, `double`, `bool`, `string`), funcția trebuie să trimită înapoi o valoare de acel tip, cu instrucțiunea `return`.

```
tip numeFunctie(parametri) {
    // calcule
    return valoare;       // valoarea "iese" din functie
}
```

La apel, funcția „se transformă” în valoarea returnată. Dacă `dublu(5)` returnează `10`, atunci `cout << dublu(5);` afișează `10`, iar `int r = dublu(5);` pune `10` în `r`.

### Exemplul 1 — Prima funcție cu `return` **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int dublu(int x) {
    return x * 2;
}

int main() {
    cout << dublu(5) << endl;
    cout << dublu(21) << endl;
    return 0;
}
```

**Ieșire:**
```
10
42
```

Funcția este de tip `int`, deci trebuie să returneze un număr întreg. Instrucțiunea `return x * 2;` calculează valoarea și o trimite la locul apelului.

### Exemplul 2 — Valoarea returnată poate fi folosită oriunde **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int patrat(int x) {
    return x * x;
}

int main() {
    int a = patrat(4);
    int b = patrat(a);
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "patrat(3) + patrat(4) = " << patrat(3) + patrat(4) << endl;

    if (patrat(5) > 20) {
        cout << "25 este mai mare ca 20" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
a = 16
b = 256
patrat(3) + patrat(4) = 25
25 este mai mare ca 20
```

Un apel de funcție se poate folosi oriunde ai folosi o valoare: într-o variabilă (`int a = …`), ca argument pentru altă funcție (`patrat(a)`), într-o adunare, într-un `if`. Aceasta este puterea lui `return`.

### Exemplul 3 — `return` oprește funcția

Când execuția ajunge la `return`, funcția se termină imediat; nimic din ce urmează nu se mai execută.

```cpp
#include <iostream>
using namespace std;

int semn(int x) {
    if (x < 0) {
        return -1;
    }
    if (x > 0) {
        return 1;
    }
    return 0;
}

int main() {
    cout << "semn(-8) = " << semn(-8) << endl;
    cout << "semn(0) = " << semn(0) << endl;
    cout << "semn(15) = " << semn(15) << endl;
    return 0;
}
```

**Ieșire:**
```
semn(-8) = -1
semn(0) = 0
semn(15) = 1
```

Funcția are mai multe `return`, dar se execută doar unul, cel întâlnit primul. Important: **orice drum** prin funcție trebuie să se termine cu un `return`. Dacă ai uitat unul, compilatorul te avertizează (`control reaches end of non-void function`), iar programul poate da rezultate ciudate.

**Încearcă tu (8 min)**  
- [ ] Scrii o funcție `triplu(int x)` care returnează de trei ori valoarea  
- [ ] Afișezi `triplu(4) + triplu(5)`  
- [ ] Scrii o funcție care returnează `-1` pentru numere negative și `0` altfel  

---

## 2. Maxim, minim, funcții care apelează funcții

### Exemplul 4 — Maximul a două numere **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int maxim(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}

int minim(int a, int b) {
    if (a < b) {
        return a;
    }
    return b;
}

int main() {
    cout << "maxim(7, 12) = " << maxim(7, 12) << endl;
    cout << "minim(7, 12) = " << minim(7, 12) << endl;
    cout << "maxim(-3, -9) = " << maxim(-3, -9) << endl;
    return 0;
}
```

**Ieșire:**
```
maxim(7, 12) = 12
minim(7, 12) = 7
maxim(-3, -9) = -3
```

Biblioteca standard are deja funcțiile `max` și `min`, dar azi le scrii singur, ca să înțelegi cum lucrează.

### Exemplul 5 — Maximul a trei numere, cu o funcție care o folosește pe alta

```cpp
#include <iostream>
using namespace std;

int maxim(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}

int maxim3(int a, int b, int c) {
    return maxim(maxim(a, b), c);
}

int main() {
    cout << "maxim3(4, 9, 6) = " << maxim3(4, 9, 6) << endl;
    cout << "maxim3(10, 2, 3) = " << maxim3(10, 2, 3) << endl;
    cout << "maxim3(1, 5, 8) = " << maxim3(1, 5, 8) << endl;
    return 0;
}
```

**Ieșire:**
```
maxim3(4, 9, 6) = 9
maxim3(10, 2, 3) = 10
maxim3(1, 5, 8) = 8
```

`maxim3` nu reia logica de la zero: întâi alege cel mai mare dintre `a` și `b`, apoi compară rezultatul cu `c`. Funcțiile mici, bine făcute, devin cărămizi pentru funcții mai mari.

---

## 3. Funcții „da/nu” (`bool`)

O funcție care răspunde la o întrebare cu **da** sau **nu** returnează `bool` (`true` sau `false`). Numele lor începe, de obicei, cu `este…` sau `are…`, ca să se citească natural într-un `if`.

### Exemplul 6 — `estePar` **[Esențial]**

```cpp
#include <iostream>
using namespace std;

bool estePar(int n) {
    if (n % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

int main() {
    for (int i = 1; i <= 6; i++) {
        if (estePar(i)) {
            cout << i << " este par" << endl;
        } else {
            cout << i << " este impar" << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
1 este impar
2 este par
3 este impar
4 este par
5 este impar
6 este par
```

Condiția din `if` a ajuns la fel de ușor de citit ca o propoziție: „dacă `i` este par”. Observă că nu a trebuit să scrii `estePar(i) == true`; funcția returnează deja un `bool`.

Varianta scurtă a funcției face același lucru. Expresia `n % 2 == 0` **este deja** `true` sau `false`, deci o poți returna direct:

```
bool estePar(int n) {
    return n % 2 == 0;
}
```

### Exemplul 7 — Funcții `bool` pe un vector: „există valoarea?”

```cpp
#include <iostream>
using namespace std;

bool exista(int v[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (v[i] == x) {
            return true;
        }
    }
    return false;
}

bool esteSortat(int v[], int n) {
    for (int i = 0; i < n - 1; i++) {
        if (v[i] > v[i + 1]) {
            return false;
        }
    }
    return true;
}

int main() {
    int v[6] = {2, 5, 7, 7, 10, 14};

    cout << "Exista 7? " << exista(v, 6, 7) << endl;
    cout << "Exista 8? " << exista(v, 6, 8) << endl;

    if (esteSortat(v, 6)) {
        cout << "Vectorul este sortat." << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Exista 7? 1
Exista 8? 0
Vectorul este sortat.
```

Un `bool` afișat cu `cout` apare ca `1` (adevărat) sau `0` (fals). Căutarea din Modulul 2 devine o funcție reutilizabilă: `return true;` iese imediat din funcție, deci nu mai e nevoie de `break`. Dacă bucla se termină fără să găsească, ajungem la `return false;`.

**Încearcă tu (10 min)**  
- [ ] Scrii o funcție `esteMultipluDe3(int n)` și o testezi  
- [ ] Scrii `estePozitiv(int n)` într-o singură linie  
- [ ] Scrii o funcție care verifică dacă toate elementele unui vector sunt pozitive  

---

## 4. Factorial, putere, funcții pe vectori

### Exemplul 8 — Factorialul unui număr **[Esențial]**

`n! = 1 · 2 · 3 · … · n`. De exemplu, `5! = 120`. Folosim `long long` pentru că rezultatul crește foarte repede.

```cpp
#include <iostream>
using namespace std;

long long factorial(int n) {
    long long rezultat = 1;
    for (int i = 2; i <= n; i++) {
        rezultat *= i;
    }
    return rezultat;
}

int main() {
    for (int i = 0; i <= 10; i++) {
        cout << i << "! = " << factorial(i) << endl;
    }
    cout << "20! = " << factorial(20) << endl;
    return 0;
}
```

**Ieșire:**
```
0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
7! = 5040
8! = 40320
9! = 362880
10! = 3628800
20! = 2432902008176640000
```

Pentru `n = 0` și `n = 1` bucla nu rulează deloc, iar funcția returnează `1`: exact valoarea corectă (`0! = 1`). Dincolo de `20!`, chiar și `long long` este depășit, deci rezultatele ar deveni greșite.

### Exemplul 9 — Puterea unui număr

```cpp
#include <iostream>
using namespace std;

long long putere(int baza, int exponent) {
    long long rezultat = 1;
    for (int i = 0; i < exponent; i++) {
        rezultat *= baza;
    }
    return rezultat;
}

int main() {
    cout << "2^10 = " << putere(2, 10) << endl;
    cout << "3^4 = " << putere(3, 4) << endl;
    cout << "10^9 = " << putere(10, 9) << endl;
    cout << "7^0 = " << putere(7, 0) << endl;
    return 0;
}
```

**Ieșire:**
```
2^10 = 1024
3^4 = 81
10^9 = 1000000000
7^0 = 1
```

### Exemplul 10 — Suma, media și maximul unui vector **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int suma(int v[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) {
        s += v[i];
    }
    return s;
}

double media(int v[], int n) {
    return (double)suma(v, n) / n;
}

int maximVector(int v[], int n) {
    int m = v[0];
    for (int i = 1; i < n; i++) {
        if (v[i] > m) {
            m = v[i];
        }
    }
    return m;
}

int main() {
    int nota[6] = {9, 7, 10, 8, 6, 10};

    cout << "Suma: " << suma(nota, 6) << endl;
    cout << "Media: " << media(nota, 6) << endl;
    cout << "Maximul: " << maximVector(nota, 6) << endl;
    return 0;
}
```

**Ieșire:**
```
Suma: 50
Media: 8.33333
Maximul: 10
```

Funcția `media` este de tip `double` și o folosește pe `suma`. Observă cum `main` a rămas cât se poate de scurt și clar, spre deosebire de Lecția 7 din Modulul 2, unde toate calculele erau scrise în `main`.

### Exemplul 11 — Returnăm o **poziție**

```cpp
#include <iostream>
using namespace std;

int pozitieMaxim(int v[], int n) {
    int poz = 0;
    for (int i = 1; i < n; i++) {
        if (v[i] > v[poz]) {
            poz = i;
        }
    }
    return poz;
}

int cauta(int v[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (v[i] == x) {
            return i;
        }
    }
    return -1;
}

int main() {
    int v[7] = {12, 45, 7, 31, 45, 2, 19};

    int p = pozitieMaxim(v, 7);
    cout << "Maximul " << v[p] << " este pe pozitia " << p << endl;
    cout << "7 se afla pe pozitia " << cauta(v, 7, 7) << endl;
    cout << "99 se afla pe pozitia " << cauta(v, 7, 99) << endl;
    return 0;
}
```

**Ieșire:**
```
Maximul 45 este pe pozitia 1
7 se afla pe pozitia 2
99 se afla pe pozitia -1
```

Rezultatul `-1` pentru „negăsit” este aceeași convenție din Modulul 2: niciun indice valid nu este negativ.

---

## 5. Proiecte

### Exemplul 12 — Calificativul unei note (`string` returnat) **[Esențial]**

```cpp
#include <iostream>
#include <string>
using namespace std;

string calificativ(int nota) {
    if (nota >= 9) {
        return "Foarte bine";
    } else if (nota >= 7) {
        return "Bine";
    } else if (nota >= 5) {
        return "Suficient";
    }
    return "Insuficient";
}

int main() {
    int note[5] = {10, 8, 5, 3, 9};

    for (int i = 0; i < 5; i++) {
        cout << "Nota " << note[i] << " -> " << calificativ(note[i]) << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Nota 10 -> Foarte bine
Nota 8 -> Bine
Nota 5 -> Suficient
Nota 3 -> Insuficient
Nota 9 -> Foarte bine
```

### Exemplul 13 — Ipotenuza: funcții care folosesc funcții

Teorema lui Pitagora: ipotenuza este `√(a² + b²)`. Funcția `sqrt` este în biblioteca `<cmath>`.

```cpp
#include <iostream>
#include <cmath>
using namespace std;

double patrat(double x) {
    return x * x;
}

double ipotenuza(double a, double b) {
    return sqrt(patrat(a) + patrat(b));
}

int main() {
    cout << "Catetele 3 si 4 -> ipotenuza " << ipotenuza(3, 4) << endl;
    cout << "Catetele 5 si 12 -> ipotenuza " << ipotenuza(5, 12) << endl;
    cout << "Catetele 1 si 1 -> ipotenuza " << ipotenuza(1, 1) << endl;
    return 0;
}
```

**Ieșire:**
```
Catetele 3 si 4 -> ipotenuza 5
Catetele 5 si 12 -> ipotenuza 13
Catetele 1 si 1 -> ipotenuza 1.41421
```

### Exemplul 14 — Mini-teste pentru funcțiile tale

Programatorii își verifică funcțiile cu teste mici: apelează funcția și compară cu răspunsul așteptat.

```cpp
#include <iostream>
#include <string>
using namespace std;

long long factorial(int n) {
    long long r = 1;
    for (int i = 2; i <= n; i++) {
        r *= i;
    }
    return r;
}

bool estePar(int n) {
    return n % 2 == 0;
}

void verifica(string nume, bool trecut) {
    if (trecut) {
        cout << "[OK]   " << nume << endl;
    } else {
        cout << "[GRESIT] " << nume << endl;
    }
}

int main() {
    verifica("factorial(0) == 1", factorial(0) == 1);
    verifica("factorial(5) == 120", factorial(5) == 120);
    verifica("estePar(10)", estePar(10));
    verifica("estePar(7) este fals", !estePar(7));
    verifica("factorial(4) == 25 (test gresit intentionat)", factorial(4) == 25);
    return 0;
}
```

**Ieșire:**
```
[OK]   factorial(0) == 1
[OK]   factorial(5) == 120
[OK]   estePar(10)
[OK]   estePar(7) este fals
[GRESIT] factorial(4) == 25 (test gresit intentionat)
```

Funcția `verifica` primește un text și un `bool` și afișează dacă testul a trecut. Ultimul test este greșit în mod intenționat, ca să vezi cum arată un test care pică. Când schimbi o funcție, rulezi din nou testele și vezi imediat dacă ai stricat ceva.

### Exemplul 15 — Funcții care se ajută între ele: numărăm numerele pare

```cpp
#include <iostream>
using namespace std;

bool estePar(int n) {
    return n % 2 == 0;
}

int numaraPare(int v[], int n) {
    int contor = 0;
    for (int i = 0; i < n; i++) {
        if (estePar(v[i])) {
            contor++;
        }
    }
    return contor;
}

int sumaPare(int v[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) {
        if (estePar(v[i])) {
            s += v[i];
        }
    }
    return s;
}

int main() {
    int v[8] = {3, 8, 12, 7, 20, 5, 6, 9};

    cout << "Numere pare: " << numaraPare(v, 8) << endl;
    cout << "Suma lor: " << sumaPare(v, 8) << endl;
    return 0;
}
```

**Ieșire:**
```
Numere pare: 4
Suma lor: 46
```

### Exemplul 16 — „Calculatorul cu funcții” (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Calculatorul cu functii
   Scop:    meniu cu operatii implementate ca functii care returneaza valori
*/
#include <iostream>
using namespace std;

int adunare(int a, int b) {
    return a + b;
}

int scadere(int a, int b) {
    return a - b;
}

long long inmultire(int a, int b) {
    return (long long)a * b;
}

bool impartire(int a, int b, double &rezultat) {
    if (b == 0) {
        return false;
    }
    rezultat = (double)a / b;
    return true;
}

long long factorial(int n) {
    long long r = 1;
    for (int i = 2; i <= n; i++) {
        r *= i;
    }
    return r;
}

bool estePar(int n) {
    return n % 2 == 0;
}

void meniu() {
    cout << endl << "===== CALCULATOR =====" << endl;
    cout << "1. Adunare" << endl;
    cout << "2. Scadere" << endl;
    cout << "3. Inmultire" << endl;
    cout << "4. Impartire" << endl;
    cout << "5. Factorial" << endl;
    cout << "6. Par sau impar" << endl;
    cout << "0. Iesire" << endl;
    cout << "Alege: ";
}

int main() {
    int optiune;

    do {
        meniu();
        cin >> optiune;

        if (optiune >= 1 && optiune <= 4) {
            int a, b;
            cout << "Primul numar: ";
            cin >> a;
            cout << "Al doilea numar: ";
            cin >> b;

            if (optiune == 1) {
                cout << "Rezultat: " << adunare(a, b) << endl;
            } else if (optiune == 2) {
                cout << "Rezultat: " << scadere(a, b) << endl;
            } else if (optiune == 3) {
                cout << "Rezultat: " << inmultire(a, b) << endl;
            } else {
                double r;
                if (impartire(a, b, r)) {
                    cout << "Rezultat: " << r << endl;
                } else {
                    cout << "Nu se poate imparti la 0." << endl;
                }
            }
        } else if (optiune == 5) {
            int n;
            cout << "n (0-20): ";
            cin >> n;
            if (n < 0 || n > 20) {
                cout << "Valoare in afara intervalului." << endl;
            } else {
                cout << n << "! = " << factorial(n) << endl;
            }
        } else if (optiune == 6) {
            int n;
            cout << "Numarul: ";
            cin >> n;
            if (estePar(n)) {
                cout << n << " este par." << endl;
            } else {
                cout << n << " este impar." << endl;
            }
        } else if (optiune != 0) {
            cout << "Optiune invalida." << endl;
        }
    } while (optiune != 0);

    cout << "La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1 7 5`, `4 9 0`, `4 7 2`, `5 6`, `6 13`, `0`):
```

===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
4. Impartire
5. Factorial
6. Par sau impar
0. Iesire
Alege: 1
Primul numar: 7
Al doilea numar: 5
Rezultat: 12

===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
4. Impartire
5. Factorial
6. Par sau impar
0. Iesire
Alege: 4
Primul numar: 9
Al doilea numar: 0
Nu se poate imparti la 0.

===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
4. Impartire
5. Factorial
6. Par sau impar
0. Iesire
Alege: 4
Primul numar: 7
Al doilea numar: 2
Rezultat: 3.5

===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
4. Impartire
5. Factorial
6. Par sau impar
0. Iesire
Alege: 5
n (0-20): 6
6! = 720

===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
4. Impartire
5. Factorial
6. Par sau impar
0. Iesire
Alege: 6
Numarul: 13
13 este impar.

===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
4. Impartire
5. Factorial
6. Par sau impar
0. Iesire
Alege: 0
La revedere!
```

Nou: funcția `impartire` **returnează** un `bool` (a reușit sau nu) și, în același timp, dă rezultatul prin parametrul-referință `rezultat`. Este un tipar des folosit când o operație poate eșua: împărțirea la zero este tratată în funcție, iar `main` doar întreabă „a mers?”.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Calculatorul cu funcții” (obligatoriu)
Scrie programul din Exemplul 16. Adaugă două operații noi, ca funcții cu `return`: `putere(baza, exponent)` și `maximul a două numere`.

### Exercițiul B — Funcții de verificare
Scrie funcțiile: `estePozitiv(int n)`, `esteMultipluDe(int n, int d)` și `esteInInterval(int x, int a, int b)` (adevărat dacă `a <= x <= b`). Testează-le cu un program care folosește `verifica` (Exemplul 14).

### Exercițiul C — Vectori
Scrie funcțiile `minimVector(int v[], int n)`, `numaraPeste(int v[], int n, int prag)` și `esteCrescator(int v[], int n)`. În `main` citește 6 numere și afișează rezultatele.

### Exercițiul D — Conversii
Scrie funcțiile `celsiusInFahrenheit(double c)` (formula: `c * 9 / 5 + 32`) și `kmInMile(double km)` (1 km = 0,621371 mile). Afișează un tabel de la 0 la 100 °C, din 10 în 10.

### Exercițiul E — Calificativ
Scrie funcția `string calificativ(double medie)` cu cinci categorii (Excelent, Foarte bine, Bine, Suficient, Insuficient). Citește mai multe medii și afișează calificativul fiecăreia.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Ai funcții de tip `int`, `bool`, `double` și `string`  
- [ ] Fiecare drum prin funcție se termină cu `return`  
- [ ] Ai apelat funcții în expresii și în condiții `if`  
- [ ] `main` doar citește, apelează și afișează  
- [ ] Fișierul se numește `Prenume_Nume_M3L3.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Scrie o funcție `combinari(int n, int k)` care folosește `factorial` (formula `n! / (k! · (n − k)!)`) — atenție la depășiri!  
- [ ] Scrie `cmmdc(int a, int b)` cu algoritmul lui Euclid (Modulul 2, lecția 3)  
- [ ] Scrie `esteBisect(int an)` și afișează toți anii bisecți dintr-un interval  
- [ ] Scrie o funcție care returnează câte cifre are un număr  
- [ ] Scrie funcțiile `suma`, `media`, `mediana` pentru un vector sortat și folosește-le într-un raport  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `control reaches end of non-void function` | Pe unele drumuri nu ai `return` | Adaugă un `return` la sfârșitul funcției |
| Funcția pare să „nu returneze nimic” | Ai folosit `void` sau ai uitat `return` | Schimbă tipul și adaugă `return valoare;` |
| `return-statement with a value, in function returning 'void'` | Ai scris `return x;` într-o funcție `void` | Schimbă `void` în tipul potrivit |
| Rezultat greșit la `factorial(15)` | Ai folosit `int` | Folosește `long long` |
| Apelezi `maxim(a, b);` și nu se întâmplă nimic | Valoarea returnată nu a fost folosită | `cout << maxim(a, b);` sau `int m = maxim(a, b);` |
| `bool` afișat ca `1` sau `0` | Așa afișează `cout` valorile logice | Folosește un `if` și afișează un text |
| Media apare întreagă | `return suma / n;` cu numere întregi | `return (double)suma / n;` |
| Instrucțiuni după `return` nu se execută | `return` oprește funcția | Pune `return` ultimul, pe fiecare drum |

---

## Recapitulare pe scurt

- Tipul din fața numelui (`int`, `double`, `bool`, `string`, `long long`) este tipul valorii returnate; `void` înseamnă că nu returnează nimic.
- `return valoare;` trimite valoarea la locul apelului și **oprește** funcția.
- Orice drum prin funcție trebuie să se termine cu `return` (cu excepția funcțiilor `void`).
- Un apel de funcție poate fi folosit ca o valoare: într-o variabilă, într-un calcul, într-un `if`, ca argument.
- Funcțiile `bool` se numesc `este…`/`are…` și fac codul să se citească ca o propoziție.
- Funcțiile pe vectori primesc `int v[]` și `n`; pot returna o sumă, un maxim, o poziție (`-1` = negăsit).
- O funcție poate apela altă funcție: construiești din cărămizi mici.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie funcțiile `maximVector`, `minimVector`, `media` și un program care citește 7 temperaturi și afișează un raport (maxim, minim, medie, diferența maxim − minim).  
3. Scrie o funcție `bool estePalindrom(int n)` care verifică dacă un număr se citește la fel din ambele sensuri (de exemplu `12321`) și afișează toate palindroamele între 100 și 300.  
4. Scrie funcția `long long sumaPana(int n)` care returnează `1 + 2 + … + n`, apoi verifică-o cu formula `n * (n + 1) / 2` pentru `n = 1…10`.  
5. **Bonus:** scrie funcții de test (ca în Exemplul 14) pentru toate funcțiile tale de la tema 2–4.  
6. Salvează tot ca `Tema_M3L3_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 4
Trecem de la numere la **text**: învățăm tipul `string` în profunzime: lungime, litere pe poziții, lipirea textelor, citirea unei propoziții întregi și primul nostru program cu palindroame.
