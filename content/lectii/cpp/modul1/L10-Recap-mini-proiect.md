# LECȚIA 10 — Recapitulare și mini-proiect: Modulul 1
**Modulul 1 · Bazele C++ · 2 ore**  
**Code Maker Club · Junior Coder**

> Azi aduni tot ce ai învățat în Modulul 1 într-un singur program: un **quiz** sau un **calculator cu meniu**. La final primești insigna **Junior Coder**.  
> Proiect: **mini-proiectul tău** · fișier: `Prenume_Nume_M1_Proiect.cpp` (ex. `Ana_Pop_M1_Proiect.cpp`)

---

## Obiectiv
La finalul orei ai recapitulat `cout`, `cin`, variabile, tipuri de date, `if`, `else`, operatori logici și `switch`, și ai construit un program complet, curat și comentat, pe care îl poți explica în 30 de secunde.  
**Minim:** proiectul ales funcționează și folosește `cin`, `cout` și `if` sau `switch`.  
**Ținta orei (Complet):** + antet și comentarii, mesaje clare, o ramură `default`/`else` pentru date greșite, test cu minimum două seturi de date și prezentare.

## De ce contează
Un modul se încheie cu un proiect pentru că programarea se învață **construind**. În această oră nu mai înveți o regulă nouă: folosești regulile pe care le știi deja ca să rezolvi o problemă întreagă, de la început până la sfârșit. Așa se lucrează și la olimpiade, și în meseria de programator.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–25 | Recapitulare pe foaie și în cod (**Exemplele 1–9**) |
| 25–40 | Depanare: găsim greșelile (**Exemplele 10–11**) |
| 40–50 | Alegem proiectul și parcurgem lista de verificare |
| 50–100 | Construim proiectul (**Exemplele 12–16** ca model) |
| 100–115 | Prezentarea proiectelor (demo) |
| 115–120 | Mini-test, insigna **Junior Coder** și temă |

---

## 1. Recapitulare: cele 9 lecții în 9 programe

Fiecare program mic de mai jos rezumă o lecție. Citește-l, spune cu voce tare ce face și ce lecție ilustrează.

### Exemplul 1 — L1: afișare și caractere speciale

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "+--------------+" << endl;
    cout << "| Salut, Alex! |" << endl;
    cout << "+--------------+" << endl;
    cout << "Nivel:\t1" << endl;
    cout << "Motto:\t\"Cod, joaca, repeta\"" << endl;
    return 0;
}
```

### Exemplul 2 — L2: antet și comentarii

```cpp
/*
   Program: Salut cu comentarii
   Autor:   Ana Pop
   Scop:    exemplu de program ordonat
*/
#include <iostream>
using namespace std;

int main() {
    // ----- Mesajul principal -----
    cout << "Programul meu este ordonat." << endl;

    // cout << "Aceasta linie este oprita temporar." << endl;

    return 0;   // totul a mers bine
}
```

### Exemplul 3 — L3: variabile `int` și `const`

```cpp
#include <iostream>
using namespace std;

int main() {
    const int VIATA_MAXIMA = 100;
    int viata = VIATA_MAXIMA;
    int scor = 0;

    viata -= 30;
    scor += 250;
    scor++;

    cout << "Viata: " << viata << "/" << VIATA_MAXIMA << endl;
    cout << "Scor: " << scor << endl;
    return 0;
}
```

### Exemplul 4 — L4: `cin`, câtul și restul

```cpp
#include <iostream>
using namespace std;

int main() {
    int minute;

    cout << "Minute: ";
    cin >> minute;

    cout << minute << " minute = " << minute / 60 << " ore si "
         << minute % 60 << " minute" << endl;
    return 0;
}
```

**Rulare** (tastezi `135`):
```
Minute: 135
135 minute = 2 ore si 15 minute
```

### Exemplul 5 — L5: tipuri de date

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nume;
    double inaltime;
    char initiala;

    cout << "Prenume: ";
    cin >> nume;
    cout << "Inaltime (m): ";
    cin >> inaltime;

    initiala = nume[0];
    bool inalt = inaltime > 1.60;

    cout << "Initiala: " << initiala << endl;
    cout << "Inaltime: " << inaltime << " m" << endl;
    cout << "Peste 1.60 m? " << inalt << endl;
    return 0;
}
```

**Rulare** (tastezi `Ioana` și `1.62`):
```
Prenume: Ioana
Inaltime (m): 1.62
Initiala: I
Inaltime: 1.62 m
Peste 1.60 m? 1
```

### Exemplul 6 — L6: `if`

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota;

    cout << "Nota: ";
    cin >> nota;

    if (nota >= 5) {
        cout << "Admis!" << endl;
    }
    if (nota == 10) {
        cout << "Nota maxima!" << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `10`):
```
Nota: 10
Admis!
Nota maxima!
```

### Exemplul 7 — L7: `else if`

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota;

    cout << "Nota: ";
    cin >> nota;

    if (nota >= 9) {
        cout << "Foarte bine" << endl;
    } else if (nota >= 7) {
        cout << "Bine" << endl;
    } else if (nota >= 5) {
        cout << "Suficient" << endl;
    } else {
        cout << "Insuficient" << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `6`):
```
Nota: 6
Suficient
```

### Exemplul 8 — L8: operatori logici

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Un numar: ";
    cin >> n;

    if (n >= 1 && n <= 100) {
        cout << "Este in intervalul [1, 100]." << endl;
    } else {
        cout << "Este in afara intervalului." << endl;
    }

    if (n % 2 == 0 || n % 5 == 0) {
        cout << "Se imparte la 2 sau la 5." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `15`):
```
Un numar: 15
Este in intervalul [1, 100].
Se imparte la 2 sau la 5.
```

### Exemplul 9 — L9: `switch`

```cpp
#include <iostream>
using namespace std;

int main() {
    int optiune;

    cout << "1 = start, 2 = pauza, 3 = iesire: ";
    cin >> optiune;

    switch (optiune) {
        case 1:
            cout << "Jocul porneste." << endl;
            break;
        case 2:
            cout << "Joc in pauza." << endl;
            break;
        case 3:
            cout << "La revedere!" << endl;
            break;
        default:
            cout << "Optiune invalida." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `2`):
```
1 = start, 2 = pauza, 3 = iesire: 2
Joc in pauza.
```

**Încearcă tu (10 min)**  
- [ ] Alegi 3 dintre cele 9 programe și le rescrii **fără să te uiți**  
- [ ] Spui cu voce tare, pentru fiecare, ce lecție ilustrează  
- [ ] Notezi pe foaie ce ți s-a părut mai greu din tot Modulul 1  

---

## 2. Depanare: găsește greșelile

Un programator petrece mult timp **căutând greșeli**. Este o aptitudine care se antrenează.

### Exemplul 10 — Programul cu 6 greșeli

Programul ar trebui să citească două numere și să spună care este mai mare. Are **6 greșeli** (de scriere și de logică). Găsește-le înainte de a citi soluția.

```cpp
#include <iostream>
using namespace std

int main() {
    int a, b;
    cout << "Introdu doua numere: ";
    cin << a << b;

    if (a = b) {
        cout << "Egale" << endl
    } else if (a > b) {
        cout << a << " este mai mare";
    } else
        cout >> b << " este mai mare";
    return 0;
}
```

**Cum lucrezi:** compilează programul, citește prima eroare, repară-o, compilează iar. Una câte una.

### Exemplul 11 — Soluția

```cpp
#include <iostream>
using namespace std;                       // 1. lipsea ;

int main() {
    int a, b;
    cout << "Introdu doua numere: ";
    cin >> a >> b;                         // 2. cin foloseste >>, nu <<

    if (a == b) {                          // 3. == pentru comparatie, nu =
        cout << "Egale" << endl;           // 4. lipsea ;
    } else if (a > b) {
        cout << a << " este mai mare" << endl;
    } else {                               // 5. acolade pentru ramura else
        cout << b << " este mai mare" << endl;   // 6. cout foloseste <<, nu >>
    }
    return 0;
}
```

**Rulare** (tastezi `12 7`):
```
Introdu doua numere: 12 7
12 este mai mare
```

Greșelile 1, 2, 4 și 6 le prinde compilatorul. Greșeala 3 (`=` în loc de `==`) compilează, dar programul ar da rezultate greșite. Greșeala 5 (lipsa acoladelor) nu strică programul, dar este un obicei prost. **Testarea cu valori** prinde ce nu prinde compilatorul.

---

## 3. Alege proiectul

Alegi **unul** dintre cele două proiecte. Ambele folosesc ce ai învățat în Modulul 1.

| Proiect | Ce face | Ce folosești |
|---------|---------|--------------|
| **A. Quiz** | pune întrebări, numără punctele, spune rezultatul | `cout`, `cin`, `if`, `else if`, variabile |
| **B. Calculator cu meniu** | oferă un meniu de operații și calculează | `cout`, `cin`, `switch`, `if`, tipuri de date |

### Lista de verificare (o completezi înainte de demo)
- [ ] Are **antet** (nume, dată, scop) și minimum 3 comentarii utile  
- [ ] Folosește `cin` și `cout`, cu mesaje clare înainte de fiecare citire  
- [ ] Folosește `if` / `else if` **sau** `switch` (ideal, ambele)  
- [ ] Are o ramură `else` sau `default` pentru date greșite  
- [ ] Rulează fără erori, cu minimum **2 seturi de date** diferite  
- [ ] Indentare corectă și nume clare pentru variabile  
- [ ] Îl poți explica în **30 de secunde**  

---

## 4. Modele pentru proiecte

Cele cinci exemple de mai jos sunt modele. Nu le copia. Folosește-le ca idee și construiește programul **tău**, cu întrebări sau operații alese de tine.

### Proiectul A — Quiz

### Exemplul 12 — Quiz cu 3 întrebări

```cpp
/*
   Program: Quiz C++
   Autor:   Ana Pop
   Scop:    3 intrebari, cu scor la final
*/
#include <iostream>
using namespace std;

int main() {
    int scor = 0;
    char raspuns;

    cout << "===== QUIZ C++ =====" << endl;

    // ----- Intrebarea 1 -----
    cout << "1. Ce afiseaza instructiunea cout?" << endl;
    cout << "   a) un text pe ecran   b) un desen   c) un sunet" << endl;
    cout << "   Raspuns: ";
    cin >> raspuns;
    if (raspuns == 'a') {
        cout << "   Corect!" << endl;
        scor++;
    } else {
        cout << "   Gresit. Raspunsul era a)." << endl;
    }

    // ----- Intrebarea 2 -----
    cout << "2. Cu ce semn se incheie o instructiune?" << endl;
    cout << "   a) .   b) ;   c) :" << endl;
    cout << "   Raspuns: ";
    cin >> raspuns;
    if (raspuns == 'b') {
        cout << "   Corect!" << endl;
        scor++;
    } else {
        cout << "   Gresit. Raspunsul era b)." << endl;
    }

    // ----- Intrebarea 3 -----
    cout << "3. Cat este 17 % 5 ?" << endl;
    int numar;
    cout << "   Raspuns: ";
    cin >> numar;
    if (numar == 2) {
        cout << "   Corect!" << endl;
        scor++;
    } else {
        cout << "   Gresit. Raspunsul era 2." << endl;
    }

    cout << endl << "Scor final: " << scor << " din 3" << endl;
    return 0;
}
```

**Rulare** (tastezi `a`, `b`, `3`):
```
===== QUIZ C++ =====
1. Ce afiseaza instructiunea cout?
   a) un text pe ecran   b) un desen   c) un sunet
   Raspuns: a
   Corect!
2. Cu ce semn se incheie o instructiune?
   a) .   b) ;   c) :
   Raspuns: b
   Corect!
3. Cat este 17 % 5 ?
   Raspuns: 3
   Gresit. Raspunsul era 2.

Scor final: 2 din 3
```

Ideile importante:
- variabila `scor` pornește de la `0` și crește cu `scor++` la fiecare răspuns corect;
- `raspuns` se reutilizează pentru mai multe întrebări;
- fiecare întrebare are propriul `if … else`, cu feedback imediat.

### Exemplul 13 — Quiz cu mesaj final în funcție de scor

```cpp
/*
   Program: Quiz Modul 1
   Scop:    4 intrebari si un calificativ final
*/
#include <iostream>
using namespace std;

int main() {
    int scor = 0;
    int raspuns;

    cout << "===== QUIZ MODUL 1 =====" << endl;
    cout << "Raspunde cu numarul variantei (1, 2 sau 3)." << endl << endl;

    cout << "1. Care tip pastreaza numere cu zecimale?" << endl;
    cout << "   1) int   2) double   3) char" << endl;
    cout << "   Raspuns: ";
    cin >> raspuns;
    if (raspuns == 2) {
        scor++;
    }

    cout << "2. Ce rezultat are 7 / 2 intre doua numere int?" << endl;
    cout << "   1) 3.5   2) 4   3) 3" << endl;
    cout << "   Raspuns: ";
    cin >> raspuns;
    if (raspuns == 3) {
        scor++;
    }

    cout << "3. Ce operator verifica egalitatea?" << endl;
    cout << "   1) =   2) ==   3) !=" << endl;
    cout << "   Raspuns: ";
    cin >> raspuns;
    if (raspuns == 2) {
        scor++;
    }

    cout << "4. Ce instructiune se foloseste la meniuri?" << endl;
    cout << "   1) switch   2) cout   3) const" << endl;
    cout << "   Raspuns: ";
    cin >> raspuns;
    if (raspuns == 1) {
        scor++;
    }

    cout << endl << "Ai raspuns corect la " << scor << " din 4 intrebari." << endl;

    if (scor == 4) {
        cout << "Calificativ: EXCELENT. Esti gata de Modulul 2!" << endl;
    } else if (scor >= 2) {
        cout << "Calificativ: BINE. Mai repeta ce ai gresit." << endl;
    } else {
        cout << "Calificativ: MAI EXERSEAZA. Reia lectiile si incearca din nou." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `2`, `3`, `2`, `1`):
```
===== QUIZ MODUL 1 =====
Raspunde cu numarul variantei (1, 2 sau 3).

1. Care tip pastreaza numere cu zecimale?
   1) int   2) double   3) char
   Raspuns: 2
2. Ce rezultat are 7 / 2 intre doua numere int?
   1) 3.5   2) 4   3) 3
   Raspuns: 3
3. Ce operator verifica egalitatea?
   1) =   2) ==   3) !=
   Raspuns: 2
4. Ce instructiune se foloseste la meniuri?
   1) switch   2) cout   3) const
   Raspuns: 1

Ai raspuns corect la 4 din 4 intrebari.
Calificativ: EXCELENT. Esti gata de Modulul 2!
```

Aici adaugi un nivel în plus: la final, un lanț `else if` transformă scorul într-un mesaj.

### Proiectul B — Calculator cu meniu

### Exemplul 14 — Calculator cu `switch`

```cpp
/*
   Program: Calculator cu meniu
   Scop:    adunare, scadere, inmultire, impartire pe doua numere
*/
#include <iostream>
using namespace std;

int main() {
    int optiune;
    double a, b;

    cout << "===== CALCULATOR =====" << endl;
    cout << "1. Adunare" << endl;
    cout << "2. Scadere" << endl;
    cout << "3. Inmultire" << endl;
    cout << "4. Impartire" << endl;
    cout << "Alege operatia: ";
    cin >> optiune;

    cout << "Primul numar: ";
    cin >> a;
    cout << "Al doilea numar: ";
    cin >> b;

    switch (optiune) {
        case 1:
            cout << a << " + " << b << " = " << a + b << endl;
            break;
        case 2:
            cout << a << " - " << b << " = " << a - b << endl;
            break;
        case 3:
            cout << a << " * " << b << " = " << a * b << endl;
            break;
        case 4:
            cout << a << " / " << b << " = " << a / b << endl;
            break;
        default:
            cout << "Optiune invalida." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `4`, `7` și `2`):
```
===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
4. Impartire
Alege operatia: 4
Primul numar: 7
Al doilea numar: 2
7 / 2 = 3.5
```

Numerele sunt `double`, deci împărțirea păstrează zecimalele. Dar ce se întâmplă dacă împarți la 0? Rezolvăm în exemplul următor.

### Exemplul 15 — Calculator protejat la împărțirea cu zero

```cpp
/*
   Program: Calculator sigur
   Autor:   Maria Ionescu
   Scop:    calculator cu meniu, protejat la impartirea cu zero
*/
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int optiune;
    double a, b;

    // ----- Meniul -----
    cout << "===== CALCULATOR SIGUR =====" << endl;
    cout << "1. Adunare    2. Scadere" << endl;
    cout << "3. Inmultire  4. Impartire" << endl;
    cout << "5. Cat si rest (numere intregi)" << endl;
    cout << "Alege operatia: ";
    cin >> optiune;

    // ----- Verific optiunea inainte de a cere numerele -----
    if (optiune < 1 || optiune > 5) {
        cout << "Optiune invalida. Alege un numar intre 1 si 5." << endl;
        return 0;
    }

    cout << "Primul numar: ";
    cin >> a;
    cout << "Al doilea numar: ";
    cin >> b;

    cout << fixed << setprecision(2);

    // ----- Calculul -----
    switch (optiune) {
        case 1:
            cout << a << " + " << b << " = " << a + b << endl;
            break;
        case 2:
            cout << a << " - " << b << " = " << a - b << endl;
            break;
        case 3:
            cout << a << " * " << b << " = " << a * b << endl;
            break;
        case 4:
            if (b == 0) {
                cout << "Eroare: nu se poate imparti la zero." << endl;
            } else {
                cout << a << " / " << b << " = " << a / b << endl;
            }
            break;
        case 5: {
            int x = (int)a;
            int y = (int)b;
            if (y == 0) {
                cout << "Eroare: nu se poate imparti la zero." << endl;
            } else {
                cout << x << " = " << y << " * " << x / y << " + " << x % y << endl;
            }
            break;
        }
    }
    return 0;
}
```

**Rulare 1** (tastezi `4`, `10` și `0`):
```
===== CALCULATOR SIGUR =====
1. Adunare    2. Scadere
3. Inmultire  4. Impartire
5. Cat si rest (numere intregi)
Alege operatia: 4
Primul numar: 10
Al doilea numar: 0
Eroare: nu se poate imparti la zero.
```

**Rulare 2** (tastezi `5`, `47` și `6`):
```
===== CALCULATOR SIGUR =====
1. Adunare    2. Scadere
3. Inmultire  4. Impartire
5. Cat si rest (numere intregi)
Alege operatia: 5
Primul numar: 47
Al doilea numar: 6
47 = 6 * 7 + 5
```

Acesta este nivelul „Complet”: antet, comentarii pe secțiuni, verificarea opțiunii **înainte** de a citi numerele, protecție la împărțirea cu 0 și formatare cu 2 zecimale.

### Exemplul 16 — Proiect combinat: Quiz cu meniu de categorii

```cpp
/*
   Program: Quiz pe categorii
   Scop:    combina switch (meniu), if (verificari) si variabile
*/
#include <iostream>
using namespace std;

int main() {
    int categorie, raspuns;
    int scor = 0;

    cout << "===== QUIZ PE CATEGORII =====" << endl;
    cout << "1. Matematica" << endl;
    cout << "2. Programare" << endl;
    cout << "3. Cultura generala" << endl;
    cout << "Alege categoria: ";
    cin >> categorie;

    switch (categorie) {
        case 1:
            cout << "Cat face 6 * 7 ? ";
            cin >> raspuns;
            if (raspuns == 42) {
                scor++;
            }
            break;
        case 2:
            cout << "Care este indexul primei litere dintr-un string (0 sau 1)? ";
            cin >> raspuns;
            if (raspuns == 0) {
                scor++;
            }
            break;
        case 3:
            cout << "Cate zile are o saptamana? ";
            cin >> raspuns;
            if (raspuns == 7) {
                scor++;
            }
            break;
        default:
            cout << "Categorie inexistenta." << endl;
            return 0;
    }

    if (scor == 1) {
        cout << "Corect! Ai primit 1 punct." << endl;
    } else {
        cout << "Gresit. Mai incearca!" << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `1` și `42`):
```
===== QUIZ PE CATEGORII =====
1. Matematica
2. Programare
3. Cultura generala
Alege categoria: 1
Cat face 6 * 7 ? 42
Corect! Ai primit 1 punct.
```

---

## 5. Prezentarea proiectului (demo)

Prezinți programul colegilor, în 30–60 de secunde:
1. **Ce face** programul (o propoziție).
2. **Rulezi** programul cu un set de date.
3. **Arăți** o secvență din cod și spui ce lecție ilustrează (de exemplu: „aici folosesc `switch`”).
4. **Răspunzi** la o întrebare a colegilor sau a profesorului.

---

## 6. Mini-test de verificare

Fără să rulezi nimic, scrie pe foaie ce afișează fiecare secvență. Apoi verifică răspunsurile de la final.

```
1)  int a = 7, b = 2;
    cout << a / b << " " << a % b;

2)  double x = 7 / 2;
    cout << x;

3)  int n = 5;
    n += 3;
    n--;
    cout << n;

4)  int x = 4;
    if (x > 3 && x < 10) cout << "A"; else cout << "B";

5)  int k = 1;
    switch (k) {
        case 1: cout << "X";
        case 2: cout << "Y"; break;
        case 3: cout << "Z";
    }

6)  char c = 'A';
    cout << c + 1;

7)  string s = "Cod";
    cout << s + "Kids" << s.length();

8)  int x = 10;
    if (x == 5) cout << "A"; else if (x > 5) cout << "B"; else cout << "C";

9)  cout << 2 + 3 * 4 << " " << (2 + 3) * 4;

10) bool b = 5 < 3 || 2 == 2;
    cout << b;
```

<details>
<summary>Răspunsuri</summary>

1. `3 1`
2. `3` (împărțirea `7 / 2` se face între numere întregi, deci dă `3`, apoi se pune în `double`)
3. `7`
4. `A`
5. `XY` (nu există `break` după `case 1`, deci programul continuă în `case 2`)
6. `66` (`c + 1` este un număr; codul ASCII al lui `'A'` este 65, plus 1)
7. `CodKids3`
8. `B`
9. `14 20`
10. `1`

</details>

---

## Proiect / exerciții de finalizat AZI

### Proiectul tău (obligatoriu)
Construiește **Quiz-ul** sau **Calculatorul cu meniu**, urmând lista de verificare din secțiunea 3. Salvează-l ca `Prenume_Nume_M1_Proiect.cpp`.

### Dacă termini repede
Treci pe lista de bonusuri de mai jos.

**Gata când:**
- [ ] Proiectul ales funcționează și poate fi rulat fără erori  
- [ ] Are antet, comentarii, indentare corectă și mesaje clare  
- [ ] Folosește `cin`, `cout` și `if` / `else if` / `switch`  
- [ ] Reacționează corect la date greșite (`else` / `default`)  
- [ ] L-ai testat cu minimum 2 seturi de date  
- [ ] L-ai prezentat și l-ai explicat în 30 de secunde  
- [ ] Ai primit insigna **Junior Coder**  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Quiz cu 5 întrebări și mesaj final în funcție de scor  
- [ ] Calculator care protejează împărțirea la 0 (ca în Exemplul 15)  
- [ ] Adaugă la calculator o opțiune pentru media a două numere sau pentru ridicarea la pătrat (`a * a`)  
- [ ] Pune în quiz o întrebare cu răspuns numeric și una cu răspuns text (`string`)  
- [ ] Scrie pe foaie 3 idei pentru proiectul tău din Modulul 2 (bucle și vectori)  

---

## Greșeli frecvente în proiecte

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Scorul rămâne 0 | `scor++` e în afara `if`, sau compari cu `=` | `if (r == 'a') { scor++; }` |
| Răspunsul text nu este recunoscut | `cin >> text;` citește doar un cuvânt | Cere răspunsuri dintr-un singur cuvânt sau dintr-o literă |
| Programul pare că „nu răspunde” | Așteaptă un `cin` fără mesaj | Afișează un mesaj înainte de fiecare citire |
| Rezultat greșit la împărțire | Variabilele sunt `int` | Folosește `double` |
| Programul se oprește la împărțirea cu zero | Nu ai verificat împărțitorul | `if (b == 0) …` |
| Meniul acceptă orice opțiune | Lipsește `default` / `else` | Adaugă o ramură pentru opțiuni invalide |
| Răspunsul `A` nu e acceptat, deși e corect | `'A'` și `'a'` sunt caractere diferite | Acceptă ambele: `r == 'a' \|\| r == 'A'` |
| Cod greu de citit | Fără indentare și fără comentarii | Reformatează și adaugă comentarii pe secțiuni |

---

## Recapitularea Modulului 1

- **L1:** `cout`, `\n`, `endl`, caractere speciale, desene.
- **L2:** structura programului, comentarii, indentare.
- **L3:** variabile `int`, `const`, `+ - *`, `+=`, `++`.
- **L4:** `cin`, `/` și `%`, probleme cu cifre și timp.
- **L5:** `double`, `char`, `bool`, `string`, ASCII.
- **L6:** comparații și `if`.
- **L7:** `else`, `else if`, `if` imbricat.
- **L8:** `&&`, `||`, `!`, intervale.
- **L9:** `switch`, `break`, `default`, grupări de cazuri.
- **L10:** un program complet, de la idee la demo.

---

## Insigna Junior Coder

Felicitări! Dacă ai bifat toată lista de verificare, ai primit insigna **Junior Coder**. Ai învățat să scrii programe care afișează, citesc, calculează și iau decizii. Asta este fundația pe care construim în Modulul 2.

---

## Temă
1. Îmbunătățește proiectul cu **o singură** idee mică: un mesaj în plus, o opțiune nouă sau o verificare suplimentară.  
2. Pe foaie, scrie 3 lucruri pe care le-ai învățat în Modulul 1 și 1 lucru pe care vrei să-l înțelegi mai bine.  
3. Repetă cele 9 programe de recapitulare (Exemplele 1–9) și rescrie-le din memorie.  
4. **Bonus:** rezolvă 3 probleme simple de pe [pbinfo.ro](https://www.pbinfo.ro) legate de `cin`, `cout` și `if` (pe baza indicațiilor profesorului).  
5. Salvează tot ca `Tema_L10_Prenume_Nume.cpp`.

---

## Ce urmează — Modulul 2: „Bucle și vectori”
Învățăm să **repetăm** acțiuni cu `for`, `while` și `do-while` și să lucrăm cu **mai multe valori deodată** folosind vectorii. Programele tale vor putea citi 100 de numere cu aceleași trei linii de cod!
