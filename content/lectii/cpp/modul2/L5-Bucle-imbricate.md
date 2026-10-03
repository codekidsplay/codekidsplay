# LECȚIA 5 — Bucle imbricate (o buclă în altă buclă)
**Modulul 2 · Bucle și vectori · 2 ore**  
**Code Kids Play · Loop Master**

> Azi pui o buclă **în interiorul altei bucle**. Așa desenezi triunghiuri, piramide și table de șah din caractere și construiești tabele întregi, linie cu linie.  
> Proiect: **„Desenatorul de figuri”** · fișier: `Prenume_Nume_M2L5.cpp` (ex. `Ana_Pop_M2L5.cpp`)

---

## Obiectiv
La finalul orei înțelegi cum se execută două bucle una în alta, desenezi dreptunghiuri, triunghiuri și piramide din `*`, generezi tabele și folosești `break` într-o buclă interioară.  
**Minim:** un dreptunghi și un triunghi desenate cu bucle imbricate.  
**Ținta orei (Complet):** + o piramidă și un meniu cu mai multe figuri.

## De ce contează
Multe lucruri din lumea reală au **rânduri și coloane**: o tablă de șah, un tabel de note, un ecran de pixeli, harta unui joc. Pentru ele ai nevoie de o buclă pentru rânduri și, pentru fiecare rând, o altă buclă pentru coloane.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `for`, `while`, `do-while` |
| 10–30 | Ideea de buclă imbricată și urmărirea pas cu pas (**Exemplele 1–3**) |
| 30–60 | Dreptunghiuri și triunghiuri din `*` (**Exemplele 4–8**) |
| 60–80 | Piramida și tabelele (**Exemplele 9–11**) |
| 80–100 | Tabla de șah, `break` în bucla interioară, numere prime (**Exemplele 12–14**) |
| 100–118 | Proiecte (**Exemplele 15–16**) |
| 118–120 | Recap și temă |

---

## 1. Cum funcționează o buclă imbricată

Gândește-te la un ceas. Acul minutelor face o tură completă (60 de minute) pentru **fiecare** oră a acului orelor. Bucla din exterior este ora, bucla din interior este minutul.

```
for (int i = 1; i <= 3; i++) {          // bucla EXTERIOARA (randuri)
    for (int j = 1; j <= 4; j++) {      // bucla INTERIOARA (coloane)
        // se executa de 3 x 4 = 12 ori
    }
}
```

Regula de aur: pentru **o singură** valoare a lui `i`, bucla interioară rulează **complet**, de la început până la sfârșit. Abia apoi `i` crește.

### Exemplul 1 — Urmărim perechile (i, j)

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 2; j++) {
            cout << "i=" << i << " j=" << j << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
i=1 j=1
i=1 j=2
i=2 j=1
i=2 j=2
i=3 j=1
i=3 j=2
```

Vezi cum `j` parcurge 1 și 2 pentru fiecare `i`. În total corpul interior se execută `3 × 2 = 6` ori.

### Exemplul 2 — Un rând de steluțe

Înainte de două bucle, o buclă simplă care desenează un rând:

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int j = 1; j <= 5; j++) {
        cout << "*";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
*****
```

`cout << "*"` fără `endl` lasă cursorul pe același rând, deci steluțele se așază una lângă alta. `endl` de după buclă mută cursorul pe rândul următor.

### Exemplul 3 — Dreptunghi de 3 rânduri și 5 coloane

Repetăm de 3 ori rândul din exemplul anterior:

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 5; j++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
*****
*****
*****
```

Observă unde este `endl`: **după** bucla interioară, dar **în** bucla exterioară. Un rând se termină după ce ai pus toate coloanele lui.

**Încearcă tu (8 min)**  
- [ ] Schimbi dreptunghiul în 5 rânduri și 10 coloane  
- [ ] Desenezi cu `#` în loc de `*`  
- [ ] Mutezi `endl` în interiorul buclei interioare și observi ce se întâmplă  

---

## 2. Dreptunghiuri și triunghiuri

### Exemplul 4 — Pătrat cu latura citită

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Latura: ";
    cin >> n;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cout << "# ";
        }
        cout << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `4`):
```
Latura: 4
# # # # 
# # # # 
# # # # 
# # # # 
```

Spațiul din `"# "` face figura mai pătrată pe ecran, pentru că literele sunt mai înalte decât late.

### Exemplul 5 — Triunghi dreptunghic

Cheia: bucla interioară depinde de `i`. Pe rândul 1 desenăm 1 steluță, pe rândul 2 desenăm 2 etc.

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
*
**
***
****
*****
```

Condiția `j <= i` este tot secretul: numărul de coloane crește odată cu numărul rândului.

### Exemplul 6 — Triunghi întors

Pe primul rând 5 steluțe, pe ultimul una singură:

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 5; i >= 1; i--) {
        for (int j = 1; j <= i; j++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
*****
****
***
**
*
```

Aici bucla exterioară numără invers (`i--`), iar cea interioară rămâne la fel.

### Exemplul 7 — Triunghi de numere

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++) {
            cout << j;
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
1
12
123
1234
12345
```

Acum afișăm `j`, nu steluța. Fiecare rând numără de la 1 până la numărul rândului.

### Exemplul 8 — Rânduri de cifre identice

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++) {
            cout << i;
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
1
22
333
4444
55555
```

Diferența față de exemplul anterior este doar `cout << i` în loc de `cout << j`. O schimbare mică, un desen cu totul diferit.

**Încearcă tu (10 min)**  
- [ ] Desenezi un triunghi de 8 rânduri  
- [ ] Faci triunghiul de numere cu 9 rânduri  
- [ ] Desenezi un triunghi care începe cu 1 steluță, crește la 5 și scade înapoi la 1 (două perechi de bucle, una după alta)  

---

## 3. Piramida și tabelele

### Exemplul 9 — Piramida centrată

Pe fiecare rând avem întâi **spații**, apoi **steluțe**. Numărul de spații scade, numărul de steluțe crește (1, 3, 5, 7…).

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 5;

    for (int i = 1; i <= n; i++) {
        for (int s = 1; s <= n - i; s++) {
            cout << " ";
        }
        for (int j = 1; j <= 2 * i - 1; j++) {
            cout << "*";
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
    *
   ***
  *****
 *******
*********
```

Pe rândul `i` ai `n - i` spații și `2 * i - 1` steluțe. Verifică pe rândul 3: `5 - 3 = 2` spații și `2 × 3 - 1 = 5` steluțe. Cele două bucle interioare sunt **una după alta**, nu una în alta, ambele în bucla exterioară.

### Exemplul 10 — Tabla înmulțirii (tabel complet)

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= 9; j++) {
            int p = i * j;
            if (p < 10) {
                cout << " ";
            }
            cout << p << " ";
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
 1  2  3  4  5  6  7  8  9 
 2  4  6  8 10 12 14 16 18 
 3  6  9 12 15 18 21 24 27 
 4  8 12 16 20 24 28 32 36 
 5 10 15 20 25 30 35 40 45 
 6 12 18 24 30 36 42 48 54 
 7 14 21 28 35 42 49 56 63 
 8 16 24 32 40 48 56 64 72 
 9 18 27 36 45 54 63 72 81 
```

Dacă produsul are o singură cifră, punem un spațiu în față, ca să rămână coloanele aliniate.

### Exemplul 11 — Tabel cu antet

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "   |";
    for (int j = 1; j <= 6; j++) {
        cout << "  " << j;
    }
    cout << endl << "---+------------------" << endl;

    for (int i = 1; i <= 6; i++) {
        cout << " " << i << " |";
        for (int j = 1; j <= 6; j++) {
            int p = i * j;
            if (p < 10) {
                cout << " ";
            }
            cout << " " << p;
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
   |  1  2  3  4  5  6
---+------------------
 1 |  1  2  3  4  5  6
 2 |  2  4  6  8 10 12
 3 |  3  6  9 12 15 18
 4 |  4  8 12 16 20 24
 5 |  5 10 15 20 25 30
 6 |  6 12 18 24 30 36
```

Prima buclă (singură) desenează antetul. A doua, imbricată, desenează rândurile. Fiecare rând începe cu numărul lui, apoi urmează produsele.

---

## 4. Tabla de șah, `break` și numere prime

### Exemplul 12 — Tabla de șah

Alternăm `#` și `.` în funcție de suma `i + j`: pară înseamnă `#`, impară înseamnă `.`.

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 8; i++) {
        for (int j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0) {
                cout << "# ";
            } else {
                cout << ". ";
            }
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
# . # . # . # . 
. # . # . # . # 
# . # . # . # . 
. # . # . # . # 
# . # . # . # . 
. # . # . # . # 
# . # . # . # . 
. # . # . # . # 
```

Aici ne-am numărat de la `0`, ca să ne obișnuim cu felul în care vor fi numerotate pozițiile în vectori, în lecția următoare.

### Exemplul 13 — Dreptunghi gol

Desenăm doar conturul; interiorul rămâne gol. Un punct este pe contur dacă e pe primul/ultimul rând sau pe prima/ultima coloană.

```cpp
#include <iostream>
using namespace std;

int main() {
    int linii = 5;
    int coloane = 9;

    for (int i = 1; i <= linii; i++) {
        for (int j = 1; j <= coloane; j++) {
            if (i == 1 || i == linii || j == 1 || j == coloane) {
                cout << "*";
            } else {
                cout << " ";
            }
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
*********
*       *
*       *
*       *
*********
```

### Exemplul 14 — Numerele prime până la 30 (cu `break`)

Un număr este **prim** dacă se împarte exact doar la 1 și la el însuși. Pentru fiecare număr `n`, căutăm un divizor `d`. Dacă găsim unul, `break` oprește **doar bucla interioară**.

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Numere prime pana la 30:" << endl;

    for (int n = 2; n <= 30; n++) {
        bool prim = true;

        for (int d = 2; d < n; d++) {
            if (n % d == 0) {
                prim = false;
                break;
            }
        }

        if (prim) {
            cout << n << " ";
        }
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Numere prime pana la 30:
2 3 5 7 11 13 17 19 23 29 
```

Pe fiecare număr `n` pornim presupunând că este prim (`prim = true`). Dacă găsim un divizor, schimbăm în `false` și ieșim din bucla interioară cu `break`, fără să mai căutăm. Bucla exterioară trece apoi la următorul `n`.

**Încearcă tu (10 min)**  
- [ ] Modifici tabla de șah la 6 × 6  
- [ ] Desenezi un dreptunghi gol de 4 × 12  
- [ ] Afișezi numerele prime până la 100  

---

## 5. Proiecte

### Exemplul 15 — Calendarul unei luni

Afișăm 30 de zile, câte 7 pe rând (o săptămână). Folosim un contor de zile și o buclă interioară pe zilele săptămânii.

```cpp
#include <iostream>
using namespace std;

int main() {
    int zile = 30;
    int zi = 1;

    cout << "Lu Ma Mi Jo Vi Sa Du" << endl;

    while (zi <= zile) {
        for (int s = 1; s <= 7 && zi <= zile; s++) {
            if (zi < 10) {
                cout << " ";
            }
            cout << zi << " ";
            zi++;
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Lu Ma Mi Jo Vi Sa Du
 1  2  3  4  5  6  7 
 8  9 10 11 12 13 14 
15 16 17 18 19 20 21 
22 23 24 25 26 27 28 
29 30 
```

Bucla `while` parcurge săptămânile, iar bucla `for` parcurge zilele dintr-o săptămână. Condiția `s <= 7 && zi <= zile` oprește rândul și când se termină luna, nu doar când se termină săptămâna. Aici am amestecat două tipuri de buclă, ceea ce este perfect normal.

### Exemplul 16 — Desenatorul de figuri (mini-proiect)

```cpp
/*
   Program: Desenatorul de figuri
   Scop:    meniu care deseneaza figuri din caractere
*/
#include <iostream>
using namespace std;

int main() {
    int optiune;

    do {
        cout << endl << "===== DESENATOR =====" << endl;
        cout << "1. Patrat" << endl;
        cout << "2. Triunghi" << endl;
        cout << "3. Piramida" << endl;
        cout << "0. Iesire" << endl;
        cout << "Alege: ";
        cin >> optiune;

        if (optiune >= 1 && optiune <= 3) {
            int n;
            cout << "Marimea (1-15): ";
            cin >> n;

            if (n < 1 || n > 15) {
                cout << "Marime invalida." << endl;
            } else if (optiune == 1) {
                for (int i = 1; i <= n; i++) {
                    for (int j = 1; j <= n; j++) {
                        cout << "# ";
                    }
                    cout << endl;
                }
            } else if (optiune == 2) {
                for (int i = 1; i <= n; i++) {
                    for (int j = 1; j <= i; j++) {
                        cout << "* ";
                    }
                    cout << endl;
                }
            } else {
                for (int i = 1; i <= n; i++) {
                    for (int s = 1; s <= n - i; s++) {
                        cout << " ";
                    }
                    for (int j = 1; j <= 2 * i - 1; j++) {
                        cout << "*";
                    }
                    cout << endl;
                }
            }
        } else if (optiune != 0) {
            cout << "Optiune invalida." << endl;
        }
    } while (optiune != 0);

    cout << "La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1`, `3`, `2`, `4`, `3`, `3`, `0`):
```

===== DESENATOR =====
1. Patrat
2. Triunghi
3. Piramida
0. Iesire
Alege: 1
Marimea (1-15): 3
# # # 
# # # 
# # # 

===== DESENATOR =====
1. Patrat
2. Triunghi
3. Piramida
0. Iesire
Alege: 2
Marimea (1-15): 4
* 
* * 
* * * 
* * * * 

===== DESENATOR =====
1. Patrat
2. Triunghi
3. Piramida
0. Iesire
Alege: 3
Marimea (1-15): 3
  *
 ***
*****

===== DESENATOR =====
1. Patrat
2. Triunghi
3. Piramida
0. Iesire
Alege: 0
La revedere!
```

În acest program ai folosit tot ce ai învățat în modulul: `do-while` pentru meniu, `if` pentru validare, trei variante de bucle imbricate și operatorii logici.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Desenatorul de figuri” (obligatoriu)
Scrie programul cu meniu din Exemplul 16, cu cel puțin 3 figuri. Poți adăuga o figură în plus, la alegere (triunghi întors, dreptunghi gol).

### Exercițiul B — Ceasul de nisip
Desenează o figură formată dintr-un triunghi întors (deasupra) și o piramidă (dedesubt), cu `n = 5`.

### Exercițiul C — Tabelul pătratelor
Afișează un tabel cu numerele de la 1 la 10, fiecare cu pătratul și cubul lui, pe același rând.

### Exercițiul D — Scara
Citește un număr `n` și desenează o scară din `n` trepte, sub forma unui triunghi dreptunghic din caracterul `#`, aliniat la **dreapta** (spații la început, apoi `#`).

### Exercițiul E — Numere perfecte
Un număr este **perfect** dacă este egal cu suma divizorilor lui mai mici decât el (de exemplu 6 = 1 + 2 + 3). Afișează toate numerele perfecte până la 500.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Meniul desenează cel puțin 3 figuri  
- [ ] Ai folosit minimum o buclă în altă buclă  
- [ ] `endl` este pus la locul potrivit (după bucla interioară)  
- [ ] Ai testat mărimi diferite (1, 5, 15)  
- [ ] Fișierul se numește `Prenume_Nume_M2L5.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Desenează un romb (piramidă + piramidă întoarsă)  
- [ ] Desenează un dreptunghi plin cu un contur diferit (de exemplu `#` pe contur și `.` în interior)  
- [ ] Desenează un „X” de `n × n` caractere: un `*` apare doar pe cele două diagonale  
- [ ] Citește caracterul cu care se desenează figura (`char`) și folosește-l în loc de `*`  
- [ ] Afișează toate perechile `(a, b)` cu `1 ≤ a ≤ b ≤ 9` care au suma 10  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Toate steluțele pe un singur rând | Ai uitat `endl` după bucla interioară | `cout << endl;` în bucla exterioară |
| Fiecare steluță pe alt rând | `endl` este în interiorul buclei interioare | Mută-l după `}` a buclei interioare |
| Triunghiul are același număr de steluțe pe fiecare rând | Bucla interioară merge până la `n`, nu până la `i` | `j <= i` |
| Piramida nu e centrată | Spațiile sunt prea puține sau prea multe | `n - i` spații pe rândul `i` |
| Aceeași variabilă `i` în ambele bucle | Contorul exterior este modificat de bucla interioară | Folosește nume diferite: `i` și `j` |
| `break` oprește tot programul | Crezi că `break` iese din toate buclele | `break` iese doar din bucla în care se află |
| Programul rulează foarte mult | Ai pus limite foarte mari la ambele bucle (ex. 100000 × 100000) | Numărul de execuții se **înmulțește** |

---

## Recapitulare pe scurt

- O buclă imbricată este o buclă în corpul altei bucle.
- Pentru fiecare pas al buclei exterioare, bucla interioară rulează **complet**.
- Numărul total de execuții ale corpului interior = (repetări exterioare) × (repetări interioare).
- Șablon de desen: bucla exterioară = **rândurile**, bucla interioară = **coloanele**, iar `endl` vine după bucla interioară.
- Triunghi: bucla interioară merge până la `i` (`j <= i`). Piramidă: `n - i` spații și `2 * i - 1` steluțe.
- `break` dintr-o buclă interioară oprește **doar** acea buclă.
- Folosește nume diferite pentru contoare: `i`, `j`, `s`.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Desenează un **brad de Crăciun**: o piramidă de 5 rânduri, urmată de un trunchi format din 2 rânduri cu câte un `|` la mijloc.  
3. Afișează **tabla înmulțirii** de la 1 la 10 cu antet pentru rânduri și coloane, aliniată corect (ca în Exemplul 11).  
4. Citește un număr `n` și afișează un triunghi în care pe rândul `i` apar numerele de la `i` până la `1`, în ordine descrescătoare (de exemplu pentru `n = 4`: `1`, `21`, `321`, `4321`).  
5. **Bonus:** afișează toate numerele prime până la 200, câte 10 pe rând.  
6. Salvează tot ca `Tema_M2L5_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 6
Facem cunoștință cu **vectorii**: un șir de variabile de același tip, ținute sub un singur nume, cu care poți păstra toate notele unei clase.
