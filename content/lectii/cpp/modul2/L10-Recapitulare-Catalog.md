# LECȚIA 10 — Recapitulare Modul 2 și proiectul „Catalogul de note”
**Modulul 2 · Bucle și vectori · 2 ore**  
**Code Kids Play · Loop Master**

> Azi încheiem Modulul 2. Recapitulăm tot ce am învățat (bucle și vectori), găsim și reparăm greșeli într-un cod „stricat”, rezolvăm un test scurt și construim **Catalogul de note**: un program cu meniu care adaugă, afișează, caută, sortează și șterge elevi.  
> Proiect: **„Catalogul de note”** · fișier: `Prenume_Nume_M2L10.cpp` (ex. `Ana_Pop_M2L10.cpp`)

---

## Obiectiv
La finalul orei îți amintești și folosești toate buclele, vectorii, căutarea și sortarea, depanezi greșeli tipice și predai un program complet, cu meniu.  
**Minim:** catalogul cu adăugare, afișare și statistici (medie, minim, maxim).  
**Ținta orei (Complet):** + căutare, clasament sortat și ștergere, cu verificări pentru situațiile limită (catalog gol, catalog plin, nume inexistent).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–25 | Recapitulare cu exemple scurte (**Exemplele 1–9**) |
| 25–45 | Vânătoare de greșeli: depanare (**Exemplele 10–12**) |
| 45–60 | Test scurt cu răspunsuri |
| 60–110 | Proiect: Catalogul de note (**Exemplele 13–14**) |
| 110–120 | Predare, recap, ce urmează în Modulul 3 |

---

## 1. Recapitulare rapidă

### Ce ai învățat în Modulul 2

| Lecția | Tema | Ideea-cheie |
|--------|------|-------------|
| 1 | `for` | Repetă de un număr cunoscut de ori: `for (int i = 0; i < n; i++)` |
| 2 | Suma, produsul, numărarea | Acumulator (`suma = 0; suma += …`) și contor (`contor++`) |
| 3 | `while` | Repetă cât timp condiția e adevărată; citire până la o valoare-santinelă |
| 4 | `do-while` | Rulează cel puțin o dată: meniuri, validări |
| 5 | Bucle imbricate | Rânduri și coloane: figuri, tabele, numere prime |
| 6 | Vectori | `tip nume[N];` indici de la `0` la `N - 1` |
| 7 | Calcule cu vectori | Sumă, medie, minim, maxim, numărări |
| 8 | Căutare | `bool gasit`, `int poz = -1`, ștergere și inserare |
| 9 | Sortare | Swap, Bubble Sort, Selection Sort |

### Exemplul 1 — `for`: suma pătratelor

```cpp
#include <iostream>
using namespace std;

int main() {
    int suma = 0;
    for (int i = 1; i <= 5; i++) {
        suma += i * i;
    }
    cout << "1^2 + 2^2 + ... + 5^2 = " << suma << endl;
    return 0;
}
```

**Ieșire:**
```
1^2 + 2^2 + ... + 5^2 = 55
```

### Exemplul 2 — `while`: suma cifrelor

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 58231;
    int suma = 0;

    while (n > 0) {
        suma += n % 10;
        n /= 10;
    }

    cout << "Suma cifrelor: " << suma << endl;
    return 0;
}
```

**Ieșire:**
```
Suma cifrelor: 19
```

### Exemplul 3 — `do-while`: validare

```cpp
#include <iostream>
using namespace std;

int main() {
    int varsta;

    do {
        cout << "Varsta (5-18): ";
        cin >> varsta;
    } while (varsta < 5 || varsta > 18);

    cout << "Varsta acceptata: " << varsta << endl;
    return 0;
}
```

**Rulare** (tastezi `3`, apoi `25`, apoi `12`):
```
Varsta (5-18): 3
Varsta (5-18): 25
Varsta (5-18): 12
Varsta acceptata: 12
```

### Exemplul 4 — Bucle imbricate: triunghi de numere

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 4; i++) {
        for (int j = i; j >= 1; j--) {
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
21
321
4321
```

### Exemplul 5 — Vector: citire și afișare inversă

```cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 4;
    int v[N];

    for (int i = 0; i < N; i++) {
        cout << "v[" << i << "] = ";
        cin >> v[i];
    }

    cout << "Invers: ";
    for (int i = N - 1; i >= 0; i--) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Rulare** (tastezi `3 6 9 12`):
```
v[0] = 3
v[1] = 6
v[2] = 9
v[3] = 12
Invers: 12 9 6 3 
```

### Exemplul 6 — Statistici: media, minimul, maximul

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[6] = {8, 10, 6, 9, 7, 10};
    int suma = 0;
    int minim = nota[0];
    int maxim = nota[0];

    for (int i = 0; i < 6; i++) {
        suma += nota[i];
        if (nota[i] < minim) minim = nota[i];
        if (nota[i] > maxim) maxim = nota[i];
    }

    cout << "Media: " << (double)suma / 6 << endl;
    cout << "Minim: " << minim << ", maxim: " << maxim << endl;
    return 0;
}
```

**Ieșire:**
```
Media: 8.33333
Minim: 6, maxim: 10
```

### Exemplul 7 — Numărare cu condiție

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[8] = {4, 9, 5, 3, 10, 7, 2, 8};
    int corigenti = 0;

    for (int i = 0; i < 8; i++) {
        if (nota[i] < 5) {
            corigenti++;
        }
    }

    cout << "Corigenti: " << corigenti << " din 8" << endl;
    return 0;
}
```

**Ieșire:**
```
Corigenti: 3 din 8
```

### Exemplul 8 — Căutare: pe ce poziție este valoarea?

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[6] = {14, 7, 22, 9, 31, 5};
    int x = 9;
    int poz = -1;

    for (int i = 0; i < 6; i++) {
        if (v[i] == x) {
            poz = i;
            break;
        }
    }

    if (poz == -1) {
        cout << "Negasit" << endl;
    } else {
        cout << x << " este pe pozitia " << poz << endl;
    }
    return 0;
}
```

**Ieșire:**
```
9 este pe pozitia 3
```

### Exemplul 9 — Sortare descrescătoare (Bubble Sort)

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[6] = {14, 7, 22, 9, 31, 5};
    int n = 6;

    for (int pas = 0; pas < n - 1; pas++) {
        for (int i = 0; i < n - 1 - pas; i++) {
            if (v[i] < v[i + 1]) {
                int aux = v[i];
                v[i] = v[i + 1];
                v[i + 1] = aux;
            }
        }
    }

    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
31 22 14 9 7 5 
```

---

## 2. Vânătoarea de greșeli (depanare)

Programele de mai jos **compilează**, dar rezultatul este greșit. Pentru fiecare: (1) citește codul, (2) ghicește ce afișează, (3) rulează-l și compară, (4) găsește greșeala, (5) repară-l.

### Exemplul 10 — Maximul „care nu e maxim”

```cpp
#include <iostream>
using namespace std;

int main() {
    int temp[5] = {-7, -3, -12, -1, -9};
    int maxim = 0;

    for (int i = 0; i < 5; i++) {
        if (temp[i] > maxim) {
            maxim = temp[i];
        }
    }

    cout << "Cea mai mare temperatura: " << maxim << endl;
    return 0;
}
```

**Ieșire:**
```
Cea mai mare temperatura: 0
```

**Greșeala:** `maxim` pornește de la `0`, iar toate temperaturile sunt negative, deci nu depășesc niciodată `0`. **Reparație:** `int maxim = temp[0];`.

### Exemplul 11 — Media „fără zecimale”

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[4] = {9, 8, 8, 10};
    int suma = 0;

    for (int i = 0; i < 4; i++) {
        suma += nota[i];
    }

    double medie = suma / 4;
    cout << "Media: " << medie << endl;
    return 0;
}
```

**Ieșire:**
```
Media: 8
```

**Greșeala:** `suma / 4` este o împărțire între numere întregi (`35 / 4 = 8`), iar abia apoi rezultatul ajunge în `double`. **Reparație:** `double medie = (double)suma / 4;`.

### Exemplul 12 — Bucla „care nu face nimic”

```cpp
#include <iostream>
using namespace std;

int main() {
    int suma = 0;
    int i;

    for (i = 1; i <= 5; i++); {
        suma += i;
    }

    cout << "Suma: " << suma << endl;
    return 0;
}
```

**Ieșire:**
```
Suma: 6
```

Compilatorul te avertizează aici: `warning: for loop has empty body`. Citește mereu avertismentele!

**Greșeala:** `;` pus din greșeală după paranteza buclei `for` o transformă într-o buclă cu **corp vid**: ea doar numără de la 1 la 5, fără să adune nimic. Blocul `{ … }` de după rămâne separat și se execută **o singură dată**, cu `i = 6`. **Reparație:** șterge `;` de după `for (…)`.

> Notă: la `while` se întâmplă la fel: `while (conditie);` creează o buclă fără corp, care poate rula la nesfârșit.

---

## 3. Test scurt (10 minute, fără calculator)

Răspunde pe foaie, apoi deschide răspunsurile.

**1.** Ce afișează?
```
for (int i = 2; i <= 10; i += 3) cout << i << " ";
```

**2.** Câte steluțe se afișează?
```
for (int i = 1; i <= 3; i++)
    for (int j = 1; j <= 4; j++)
        cout << "*";
```

**3.** Un vector are 8 elemente. Care este ultimul indice valid?

**4.** Ce diferență există între `while` și `do-while`?

**5.** Ce valoare trebuie să aibă `suma` înainte de o buclă care adună elemente?

**6.** Cum găsești poziția maximului dintr-un vector?

**7.** De ce `a = b; b = a;` nu interschimbă `a` și `b`?

**8.** Ce trebuie interschimbat când sortezi „nume” după „notă”?

<details>
<summary><b>Răspunsuri</b></summary>

1. `2 5 8` (după 8 urmează 11, care depășește 10).
2. 12 steluțe (3 × 4).
3. `7` (indicii sunt de la 0 la 7).
4. `do-while` verifică condiția **după** corp, deci rulează cel puțin o dată; `while` o verifică înainte și poate să nu ruleze deloc.
5. `0`.
6. Pornești cu `pozMax = 0`, parcurgi de la `i = 1` și, dacă `v[i] > v[pozMax]`, faci `pozMax = i`.
7. După `a = b;` valoarea veche a lui `a` s-a pierdut, deci `b = a;` pune în `b` aceeași valoare. Ai nevoie de o variabilă ajutătoare.
8. Ambii vectori: și notele, și numele, în același timp.

</details>

---

## 4. Proiect final: „Catalogul de note”

Programul reunește tot ce ai învățat în modul: meniu cu `do-while` + `switch`, vectori paraleli, validare, statistici, căutare, sortare și ștergere.

### Exemplul 13 — Varianta de bază (adaugă, afișează, statistici)

Începe cu varianta scurtă, apoi o extinzi în Exemplul 14.

```cpp
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    const int MAXIM = 30;
    string nume[MAXIM];
    int nota[MAXIM];
    int n = 0;
    int optiune;

    do {
        cout << endl << "===== CATALOG - elevi: " << n << " =====" << endl;
        cout << "1. Adauga elev" << endl;
        cout << "2. Afiseaza catalogul" << endl;
        cout << "3. Statistici" << endl;
        cout << "0. Iesire" << endl;
        cout << "Alege: ";
        cin >> optiune;

        switch (optiune) {
            case 1:
                if (n == MAXIM) {
                    cout << "Catalogul este plin." << endl;
                } else {
                    cout << "Nume: ";
                    cin >> nume[n];
                    do {
                        cout << "Nota (1-10): ";
                        cin >> nota[n];
                    } while (nota[n] < 1 || nota[n] > 10);
                    n++;
                    cout << "Elev adaugat." << endl;
                }
                break;
            case 2:
                if (n == 0) {
                    cout << "Catalogul este gol." << endl;
                }
                for (int i = 0; i < n; i++) {
                    cout << i + 1 << ". " << nume[i] << " - " << nota[i] << endl;
                }
                break;
            case 3:
                if (n == 0) {
                    cout << "Nu exista date." << endl;
                } else {
                    int suma = 0;
                    int pozMax = 0;
                    int pozMin = 0;
                    for (int i = 0; i < n; i++) {
                        suma += nota[i];
                        if (nota[i] > nota[pozMax]) pozMax = i;
                        if (nota[i] < nota[pozMin]) pozMin = i;
                    }
                    cout << fixed << setprecision(2);
                    cout << "Media: " << (double)suma / n << endl;
                    cout << "Cea mai mare: " << nume[pozMax] << " (" << nota[pozMax] << ")" << endl;
                    cout << "Cea mai mica: " << nume[pozMin] << " (" << nota[pozMin] << ")" << endl;
                }
                break;
            case 0:
                cout << "La revedere!" << endl;
                break;
            default:
                cout << "Optiune invalida." << endl;
        }
    } while (optiune != 0);

    return 0;
}
```

**Rulare** (tastezi `1 Ana 9 1 Dan 6 2 3 0`):
```

===== CATALOG - elevi: 0 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
0. Iesire
Alege: 1
Nume: Ana
Nota (1-10): 9
Elev adaugat.

===== CATALOG - elevi: 1 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
0. Iesire
Alege: 1
Nume: Dan
Nota (1-10): 6
Elev adaugat.

===== CATALOG - elevi: 2 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
0. Iesire
Alege: 2
1. Ana - 9
2. Dan - 6

===== CATALOG - elevi: 2 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
0. Iesire
Alege: 3
Media: 7.50
Cea mai mare: Ana (9)
Cea mai mica: Dan (6)

===== CATALOG - elevi: 2 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
0. Iesire
Alege: 0
La revedere!
```

Observă că în `case 3` am declarat variabile (`int suma`, …) în interiorul unui `else { … }`, deci în acolade; așa nu apare eroarea de la `switch` (Modulul 1, lecția 9).

### Exemplul 14 — Varianta completă (cu căutare, clasament și ștergere)

```cpp
/*
   Program: Catalogul de note
   Scop:    gestioneaza elevi si note: adaugare, afisare, statistici,
            cautare, clasament si stergere
*/
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    const int MAXIM = 30;
    string nume[MAXIM];
    int nota[MAXIM];
    int n = 0;
    int optiune;

    do {
        cout << endl << "===== CATALOG - elevi: " << n << " =====" << endl;
        cout << "1. Adauga elev" << endl;
        cout << "2. Afiseaza catalogul" << endl;
        cout << "3. Statistici" << endl;
        cout << "4. Cauta elev" << endl;
        cout << "5. Clasament (sorteaza dupa nota)" << endl;
        cout << "6. Sterge elev" << endl;
        cout << "0. Iesire" << endl;
        cout << "Alege: ";
        cin >> optiune;

        switch (optiune) {
            case 1:
                if (n == MAXIM) {
                    cout << "Catalogul este plin." << endl;
                } else {
                    cout << "Nume: ";
                    cin >> nume[n];
                    do {
                        cout << "Nota (1-10): ";
                        cin >> nota[n];
                    } while (nota[n] < 1 || nota[n] > 10);
                    n++;
                    cout << "Elev adaugat." << endl;
                }
                break;

            case 2:
                if (n == 0) {
                    cout << "Catalogul este gol." << endl;
                }
                for (int i = 0; i < n; i++) {
                    cout << i + 1 << ". " << nume[i] << " - " << nota[i] << endl;
                }
                break;

            case 3:
                if (n == 0) {
                    cout << "Nu exista date." << endl;
                } else {
                    int suma = 0;
                    int pozMax = 0;
                    int pozMin = 0;
                    int promovati = 0;
                    for (int i = 0; i < n; i++) {
                        suma += nota[i];
                        if (nota[i] > nota[pozMax]) pozMax = i;
                        if (nota[i] < nota[pozMin]) pozMin = i;
                        if (nota[i] >= 5) promovati++;
                    }
                    cout << fixed << setprecision(2);
                    cout << "Media: " << (double)suma / n << endl;
                    cout << "Cea mai mare: " << nume[pozMax] << " (" << nota[pozMax] << ")" << endl;
                    cout << "Cea mai mica: " << nume[pozMin] << " (" << nota[pozMin] << ")" << endl;
                    cout << "Promovati: " << promovati << " din " << n << endl;
                }
                break;

            case 4: {
                string cautat;
                cout << "Nume cautat: ";
                cin >> cautat;
                int poz = -1;
                for (int i = 0; i < n; i++) {
                    if (nume[i] == cautat) {
                        poz = i;
                        break;
                    }
                }
                if (poz == -1) {
                    cout << "Elevul nu a fost gasit." << endl;
                } else {
                    cout << nume[poz] << " are nota " << nota[poz] << "." << endl;
                }
                break;
            }

            case 5:
                if (n == 0) {
                    cout << "Catalogul este gol." << endl;
                } else {
                    for (int i = 0; i < n - 1; i++) {
                        int pozMax = i;
                        for (int j = i + 1; j < n; j++) {
                            if (nota[j] > nota[pozMax]) {
                                pozMax = j;
                            }
                        }
                        int auxNota = nota[i];
                        nota[i] = nota[pozMax];
                        nota[pozMax] = auxNota;

                        string auxNume = nume[i];
                        nume[i] = nume[pozMax];
                        nume[pozMax] = auxNume;
                    }
                    cout << "--- Clasament ---" << endl;
                    int loc = 1;
                    for (int i = 0; i < n; i++) {
                        if (i > 0 && nota[i] < nota[i - 1]) {
                            loc = i + 1;
                        }
                        cout << "Locul " << loc << ": " << nume[i] << " (" << nota[i] << ")" << endl;
                    }
                }
                break;

            case 6: {
                string sters;
                cout << "Nume de sters: ";
                cin >> sters;
                int poz = -1;
                for (int i = 0; i < n; i++) {
                    if (nume[i] == sters) {
                        poz = i;
                        break;
                    }
                }
                if (poz == -1) {
                    cout << "Elevul nu a fost gasit." << endl;
                } else {
                    for (int i = poz; i < n - 1; i++) {
                        nume[i] = nume[i + 1];
                        nota[i] = nota[i + 1];
                    }
                    n--;
                    cout << "Elev sters." << endl;
                }
                break;
            }

            case 0:
                cout << "La revedere!" << endl;
                break;

            default:
                cout << "Optiune invalida." << endl;
        }
    } while (optiune != 0);

    return 0;
}
```

**Rulare** (tastezi `1 Ana 8`, `1 Bogdan 10`, `1 Carmen 8`, `1 Dan 4`, apoi `3`, `5`, `4 Dan`, `6 Dan`, `2`, `0`):
```

===== CATALOG - elevi: 0 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
4. Cauta elev
5. Clasament (sorteaza dupa nota)
6. Sterge elev
0. Iesire
Alege: 1
Nume: Ana
Nota (1-10): 8
Elev adaugat.

===== CATALOG - elevi: 1 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
4. Cauta elev
5. Clasament (sorteaza dupa nota)
6. Sterge elev
0. Iesire
Alege: 1
Nume: Bogdan
Nota (1-10): 10
Elev adaugat.

===== CATALOG - elevi: 2 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
4. Cauta elev
5. Clasament (sorteaza dupa nota)
6. Sterge elev
0. Iesire
Alege: 1
Nume: Carmen
Nota (1-10): 8
Elev adaugat.

===== CATALOG - elevi: 3 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
4. Cauta elev
5. Clasament (sorteaza dupa nota)
6. Sterge elev
0. Iesire
Alege: 1
Nume: Dan
Nota (1-10): 4
Elev adaugat.

===== CATALOG - elevi: 4 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
4. Cauta elev
5. Clasament (sorteaza dupa nota)
6. Sterge elev
0. Iesire
Alege: 3
Media: 7.50
Cea mai mare: Bogdan (10)
Cea mai mica: Dan (4)
Promovati: 3 din 4

===== CATALOG - elevi: 4 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
4. Cauta elev
5. Clasament (sorteaza dupa nota)
6. Sterge elev
0. Iesire
Alege: 5
--- Clasament ---
Locul 1: Bogdan (10)
Locul 2: Ana (8)
Locul 2: Carmen (8)
Locul 4: Dan (4)

===== CATALOG - elevi: 4 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
4. Cauta elev
5. Clasament (sorteaza dupa nota)
6. Sterge elev
0. Iesire
Alege: 4
Nume cautat: Dan
Dan are nota 4.

===== CATALOG - elevi: 4 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
4. Cauta elev
5. Clasament (sorteaza dupa nota)
6. Sterge elev
0. Iesire
Alege: 6
Nume de sters: Dan
Elev sters.

===== CATALOG - elevi: 3 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
4. Cauta elev
5. Clasament (sorteaza dupa nota)
6. Sterge elev
0. Iesire
Alege: 2
1. Bogdan - 10
2. Ana - 8
3. Carmen - 8

===== CATALOG - elevi: 3 =====
1. Adauga elev
2. Afiseaza catalogul
3. Statistici
4. Cauta elev
5. Clasament (sorteaza dupa nota)
6. Sterge elev
0. Iesire
Alege: 0
La revedere!
```

Programul are ~150 de linii și este organizat în cazuri clare. Este o aplicație completă, pe care o poți extinde în Modulul 3 cu **funcții**, ca să fie și mai ordonată.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Catalogul de note” (obligatoriu)
Scrie varianta completă (Exemplul 14) cu elevii tăi preferați. **Nu copia**: scrie fiecare opțiune pe rând și testeaz-o înainte de a trece la următoarea.

### Exercițiul B — Extinde catalogul (la alegere, minim una)
- Adaugă opțiunea „Corectează nota unui elev” (căutare + citirea unei note noi, cu validare).  
- Adaugă opțiunea „Afișează elevii cu nota peste medie”.  
- Împiedică adăugarea a doi elevi cu același nume.  
- Afișează la statistici câți elevi au 10, câți au între 5 și 9 și câți sunt corigenți.

### Exercițiul C — Testează-ți programul
Completează o listă de teste: catalog gol (opțiunile 2, 3, 4, 5, 6), catalog cu un singur elev, catalog plin (30 de elevi), notă invalidă (0, 11), nume inexistent, opțiune de meniu inexistentă.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Meniul se repetă până la `0`  
- [ ] Ai minimum 5 opțiuni funcționale  
- [ ] Notele sunt validate (1–10)  
- [ ] Sunt tratate: catalog gol, catalog plin, nume negăsit  
- [ ] Ștergerea și sortarea mută **ambii** vectori  
- [ ] Ai completat testele din Exercițiul C  
- [ ] Fișierul se numește `Prenume_Nume_M2L10.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă un al treilea vector (de exemplu, absențe) și afișează un raport complet  
- [ ] Adaugă o opțiune „Elevii în ordine alfabetică”  
- [ ] Adaugă o histogramă a notelor, ca în Lecția 7  
- [ ] Adaugă o parolă de profesor cu 3 încercări la pornirea programului  
- [ ] Adaugă opțiunea „Resetează catalogul” cu o întrebare de confirmare (d/n)  

---

## Greșeli frecvente (la proiect)

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Catalogul „uită” elevii | Variabilele `n`, `nume`, `nota` sunt declarate în interiorul buclei | Declară-le înainte de `do` |
| `jump to case label` | Variabilă declarată într-un `case` fără acolade | `case 4: { … break; }` |
| După sortare, numele nu se potrivesc cu notele | Ai sortat doar un vector | Interschimbă ambii vectori |
| La statistici, media este greșită | Împarți la `MAXIM` în loc de `n` | `(double)suma / n` |
| La ștergere rămâne un „gol” | Ai uitat `n--` | Mută elementele, apoi `n--` |
| Se pot adăuga mai mult de 30 de elevi | Lipsește verificarea `n == MAXIM` | Verifică înainte de citire |
| Programul se oprește la nume cu spațiu | `cin >>` citește un singur cuvânt | Folosește nume dintr-un cuvânt |

---

## Recapitulare pe scurt (Modulul 2)

- **Bucle:** `for` (cunoști numărul de repetări), `while` (nu știi, poate zero ori), `do-while` (cel puțin o dată).
- **Șabloane:** acumulator (`suma += …`), contor (`contor++`), minim/maxim (pornești cu primul element), steag (`bool gasit`), poziție (`poz = -1`).
- **Bucle imbricate:** rânduri și coloane; corpul interior se execută de (exterior × interior) ori.
- **Vectori:** `tip nume[N];`, indici de la `0` la `N - 1`, parcurgere cu `for`, verificarea indicilor.
- **Căutare liniară** și **ștergere/inserare** prin mutarea elementelor.
- **Sortare:** swap cu variabilă ajutătoare, Bubble Sort, Selection Sort; la vectori paraleli se mută ambii vectori.

---

## Temă
1. Termină și testează **Catalogul de note**, apoi încarcă fișierul.  
2. Refă din memorie, fără să te uiți, trei programe mici: suma unui vector, maximul cu poziția lui și sortarea crescătoare.  
3. Scrie o listă cu 5 greșeli pe care le-ai făcut în Modulul 2 și cum le-ai reparat.  
4. **Bonus:** scrie un program „Jurnalul de temperaturi”: citește 7 temperaturi, afișează media, ziua cea mai caldă, ziua cea mai rece și temperaturile în ordine crescătoare.  
5. Salvează tot ca `Tema_M2L10_Prenume_Nume.cpp`.

---

## Felicitări — ai primit insigna **Loop Master**!

Ai terminat Modulul 2: stăpânești buclele și vectorii, două dintre cele mai importante unelte din programare.

## Ce urmează — Modulul 3
**Funcții, string-uri și algoritmi (Problem Solver):** împarți programele mari în bucăți mici și reutilizabile (funcții), lucrezi cu texte, generezi numere aleatoare cu `rand()` și rezolvi probleme combinate.
