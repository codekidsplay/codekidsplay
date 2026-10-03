# LECȚIA 9 — Sortarea vectorilor
**Modulul 2 · Bucle și vectori · 2 ore**  
**Code Kids Play · Loop Master**

> Azi pui valorile **în ordine**: crescătoare sau descrescătoare. Înveți să interschimbi două valori, scrii două metode de sortare făcute de tine și vezi la final și comanda gata făcută din C++.  
> Proiect: **„Clasamentul clasei”** · fișier: `Prenume_Nume_M2L9.cpp` (ex. `Ana_Pop_M2L9.cpp`)

---

## Obiectiv
La finalul orei interschimbi două elemente, verifici dacă un vector este sortat, sortezi crescător și descrescător (metoda bulelor și metoda selecției), sortezi nume, sortezi vectori paraleli și folosești `sort` din biblioteca standard.  
**Minim:** un program care sortează crescător un vector de numere.  
**Ținta orei (Complet):** + sortare descrescătoare și un clasament (nume + notă) afișat în ordine.

## De ce contează
Clasamente, liste alfabetice, „cele mai ieftine produse”, „cei mai buni jucători”: totul cere ordine. Un vector sortat este și mai rapid de folosit (la căutare, la mediană, la podium). Sortarea este una dintre cele mai importante teme din informatică, iar tu scrii azi primul tău algoritm de acest fel.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: căutare, ștergere, inserare |
| 10–30 | Interschimbarea a două valori și verificarea ordinii (**Exemplele 1–3**) |
| 30–60 | Sortarea prin metoda bulelor (**Exemplele 4–7**) |
| 60–80 | Sortarea prin selecție (**Exemplele 8–9**) |
| 80–100 | Nume, vectori paraleli, mediană, `sort` (**Exemplele 10–13**) |
| 100–118 | Proiecte (**Exemplele 14–16**) |
| 118–120 | Recap și temă |

---

## 1. Interschimbarea a două valori

Sortarea se bazează pe o operație mică: **interschimbarea** (swap). Imaginează-ți două pahare, unul cu suc și unul cu apă. Ca să le schimbi conținutul, ai nevoie de un al treilea pahar gol.

```
aux = a;     // pui sucul din primul pahar în paharul gol
a = b;       // torni apa în primul pahar
b = aux;     // torni sucul în al doilea pahar
```

Dacă ai scrie direct `a = b; b = a;`, ai pierde valoarea inițială a lui `a`.

### Exemplul 1 — Swap cu variabilă ajutătoare

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 5;
    int b = 9;

    cout << "Inainte: a = " << a << ", b = " << b << endl;

    int aux = a;
    a = b;
    b = aux;

    cout << "Dupa:    a = " << a << ", b = " << b << endl;
    return 0;
}
```

**Ieșire:**
```
Inainte: a = 5, b = 9
Dupa:    a = 9, b = 5
```

### Exemplul 2 — Swap între două elemente ale vectorului

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[5] = {10, 20, 30, 40, 50};

    int aux = v[0];
    v[0] = v[4];
    v[4] = aux;

    for (int i = 0; i < 5; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
50 20 30 40 10 
```

Același principiu, dar cu elemente de vector. În C++ există și o comandă gata făcută, `swap(v[0], v[4]);`, din biblioteca `<algorithm>`. Pentru început scrii tu interschimbarea de mână, ca s-o înțelegi.

### Exemplul 3 — Este vectorul sortat?

Un vector este crescător dacă **fiecare element este mai mic sau egal cu cel de după el**. Căutăm un „contraexemplu” (Lecția 8).

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[5] = {2, 5, 5, 9, 12};
    int b[5] = {2, 7, 4, 9, 12};

    bool aSortat = true;
    bool bSortat = true;

    for (int i = 0; i < 4; i++) {
        if (a[i] > a[i + 1]) aSortat = false;
        if (b[i] > b[i + 1]) bSortat = false;
    }

    if (aSortat) {
        cout << "Vectorul a: sortat" << endl;
    } else {
        cout << "Vectorul a: nesortat" << endl;
    }

    if (bSortat) {
        cout << "Vectorul b: sortat" << endl;
    } else {
        cout << "Vectorul b: nesortat" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Vectorul a: sortat
Vectorul b: nesortat
```

Bucla merge până la `i < 4` (nu `5`), pentru că folosim `v[i + 1]` și nu vrem să ieșim din vector.

**Încearcă tu (8 min)**  
- [ ] Interschimbi două variabile `int` citite de la tastatură  
- [ ] Interschimbi elementele de pe pozițiile 1 și 3 dintr-un vector  
- [ ] Verifici dacă un vector de 6 numere este descrescător  

---

## 2. Sortarea prin metoda bulelor (Bubble Sort)

Ideea este foarte simplă: parcurgi vectorul și compari **vecinii**. Dacă doi vecini sunt în ordine greșită, îi interschimbi. După o parcurgere completă, cel mai mare element „iese la suprafață” (ca o bulă) la capătul vectorului.

```
v = 5  3  8  1

Pas 1: (5,3) → schimb:  3  5  8  1
Pas 2: (5,8) → corect:  3  5  8  1
Pas 3: (8,1) → schimb:  3  5  1  8     ← 8, cel mai mare, a ajuns la capăt
```

Repeți parcurgerea până când totul e în ordine.

### Exemplul 4 — O singură trecere

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[5] = {5, 3, 8, 1, 4};
    int n = 5;

    for (int i = 0; i < n - 1; i++) {
        if (v[i] > v[i + 1]) {
            int aux = v[i];
            v[i] = v[i + 1];
            v[i + 1] = aux;
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
3 5 1 4 8 
```

După o singură trecere, cel mai mare element, `8`, a ajuns la sfârșit. Restul nu sunt încă în ordine. Mai trebuie treceri.

### Exemplul 5 — Sortare completă (crescător)

Repetăm trecerea de `n - 1` ori, cu o buclă exterioară.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[7] = {29, 4, 17, 8, 42, 1, 15};
    int n = 7;

    for (int pas = 0; pas < n - 1; pas++) {
        for (int i = 0; i < n - 1 - pas; i++) {
            if (v[i] > v[i + 1]) {
                int aux = v[i];
                v[i] = v[i + 1];
                v[i + 1] = aux;
            }
        }
    }

    cout << "Sortat crescator: ";
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Sortat crescator: 1 4 8 15 17 29 42 
```

Bucla interioară merge până la `n - 1 - pas`: după fiecare trecere, ultimele `pas` elemente sunt deja la locul lor și nu trebuie verificate din nou.

### Exemplul 6 — Sortare descrescătoare

Singura schimbare: comparația. În loc de `>`, folosim `<`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[7] = {29, 4, 17, 8, 42, 1, 15};
    int n = 7;

    for (int pas = 0; pas < n - 1; pas++) {
        for (int i = 0; i < n - 1 - pas; i++) {
            if (v[i] < v[i + 1]) {
                int aux = v[i];
                v[i] = v[i + 1];
                v[i + 1] = aux;
            }
        }
    }

    cout << "Sortat descrescator: ";
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Sortat descrescator: 42 29 17 15 8 4 1 
```

### Exemplul 7 — Vedem fiecare pas

Afișăm vectorul după fiecare trecere, ca să vezi cum „urcă” elementele mari.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[6] = {6, 2, 9, 1, 7, 3};
    int n = 6;

    cout << "Start:    ";
    for (int i = 0; i < n; i++) cout << v[i] << " ";
    cout << endl;

    for (int pas = 0; pas < n - 1; pas++) {
        for (int i = 0; i < n - 1 - pas; i++) {
            if (v[i] > v[i + 1]) {
                int aux = v[i];
                v[i] = v[i + 1];
                v[i + 1] = aux;
            }
        }
        cout << "Trecerea " << pas + 1 << ": ";
        for (int i = 0; i < n; i++) cout << v[i] << " ";
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Start:    6 2 9 1 7 3 
Trecerea 1: 2 6 1 7 3 9 
Trecerea 2: 2 1 6 3 7 9 
Trecerea 3: 1 2 3 6 7 9 
Trecerea 4: 1 2 3 6 7 9 
Trecerea 5: 1 2 3 6 7 9 
```

Observă că după trecerea 1 ultimul element este cel mai mare, după trecerea 2 ultimele două sunt la locul lor ș.a.m.d.

**Încearcă tu (10 min)**  
- [ ] Sortezi un vector de 8 numere crescător  
- [ ] Îl sortezi descrescător, schimbând un singur caracter  
- [ ] Afișezi vectorul după fiecare trecere, pe hârtie și în program  

---

## 3. Sortarea prin selecție

Altă idee: la fiecare pas **alegi cel mai mic element** din partea nesortată și îl pui în față, prin interschimbare. Folosești șablonul pentru poziția minimului (Lecția 7).

```
v = 5  3  8  1
pas 0: cel mai mic din tot vectorul e 1 (poz 3) → swap cu v[0] →  1  3  8  5
pas 1: cel mai mic din {3, 8, 5} e 3 (poz 1) → deja la loc      →  1  3  8  5
pas 2: cel mai mic din {8, 5} e 5 (poz 3) → swap cu v[2]        →  1  3  5  8
```

### Exemplul 8 — Selection Sort

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[7] = {29, 4, 17, 8, 42, 1, 15};
    int n = 7;

    for (int i = 0; i < n - 1; i++) {
        int pozMin = i;
        for (int j = i + 1; j < n; j++) {
            if (v[j] < v[pozMin]) {
                pozMin = j;
            }
        }
        int aux = v[i];
        v[i] = v[pozMin];
        v[pozMin] = aux;
    }

    cout << "Sortat crescator: ";
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Sortat crescator: 1 4 8 15 17 29 42 
```

Bucla interioară caută poziția minimului în zona de la `i` până la capăt. Apoi o singură interschimbare mută minimul pe locul `i`. Față de metoda bulelor, aici faci mult mai puține interschimbări.

### Exemplul 9 — Podium: primele 3 valori

După sortare descrescătoare, primele elemente sunt cele mai mari.

```cpp
#include <iostream>
using namespace std;

int main() {
    int punctaj[8] = {120, 340, 95, 410, 275, 380, 60, 300};
    int n = 8;

    for (int i = 0; i < n - 1; i++) {
        int pozMax = i;
        for (int j = i + 1; j < n; j++) {
            if (punctaj[j] > punctaj[pozMax]) {
                pozMax = j;
            }
        }
        int aux = punctaj[i];
        punctaj[i] = punctaj[pozMax];
        punctaj[pozMax] = aux;
    }

    cout << "PODIUM" << endl;
    cout << "Locul 1: " << punctaj[0] << endl;
    cout << "Locul 2: " << punctaj[1] << endl;
    cout << "Locul 3: " << punctaj[2] << endl;
    return 0;
}
```

**Ieșire:**
```
PODIUM
Locul 1: 410
Locul 2: 380
Locul 3: 340
```

Aici am pus **maximul** în față (selecție descrescătoare). Dacă ai nevoie doar de primele 3, ai putea opri bucla după 3 pași; dar sortarea completă îți dă și restul clasamentului.

---

## 4. Nume, vectori paraleli, mediană, `sort`

### Exemplul 10 — Sortare alfabetică

Pentru `string`, operatorii `<` și `>` compară în ordine alfabetică (și funcționează bine când toate numele încep cu literă mare).

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nume[5] = {"Elena", "Bogdan", "Dan", "Ana", "Carmen"};
    int n = 5;

    for (int pas = 0; pas < n - 1; pas++) {
        for (int i = 0; i < n - 1 - pas; i++) {
            if (nume[i] > nume[i + 1]) {
                string aux = nume[i];
                nume[i] = nume[i + 1];
                nume[i + 1] = aux;
            }
        }
    }

    cout << "Lista alfabetica:" << endl;
    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". " << nume[i] << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Lista alfabetica:
1. Ana
2. Bogdan
3. Carmen
4. Dan
5. Elena
```

Algoritmul este același; se schimbă doar tipul (`string aux`).

### Exemplul 11 — Vectori paraleli: sortăm după notă

Când sortezi un vector, trebuie să muți **împreună** și elementul corespunzător din vectorul paralel. Altfel, „Ana” ar primi nota altcuiva!

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nume[5] = {"Ana", "Bogdan", "Carmen", "Dan", "Elena"};
    int nota[5] = {8, 10, 7, 9, 6};
    int n = 5;

    for (int pas = 0; pas < n - 1; pas++) {
        for (int i = 0; i < n - 1 - pas; i++) {
            if (nota[i] < nota[i + 1]) {
                int auxNota = nota[i];
                nota[i] = nota[i + 1];
                nota[i + 1] = auxNota;

                string auxNume = nume[i];
                nume[i] = nume[i + 1];
                nume[i + 1] = auxNume;
            }
        }
    }

    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". " << nume[i] << " - " << nota[i] << endl;
    }
    return 0;
}
```

**Ieșire:**
```
1. Bogdan - 10
2. Dan - 9
3. Ana - 8
4. Carmen - 7
5. Elena - 6
```

Decizia se ia pe `nota`, dar **ambele** vectori sunt interschimbate. Dacă uiți unul, numele și notele se „desincronizează”.

### Exemplul 12 — Mediana

**Mediana** este valoarea din mijloc a unui șir ordonat. Dacă numărul de elemente este impar, este elementul de la mijloc; dacă e par, media celor două din mijloc.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[7] = {9, 3, 12, 5, 7, 20, 1};
    int n = 7;

    for (int i = 0; i < n - 1; i++) {
        int pozMin = i;
        for (int j = i + 1; j < n; j++) {
            if (v[j] < v[pozMin]) pozMin = j;
        }
        int aux = v[i];
        v[i] = v[pozMin];
        v[pozMin] = aux;
    }

    cout << "Vector sortat: ";
    for (int i = 0; i < n; i++) cout << v[i] << " ";
    cout << endl;

    double mediana;
    if (n % 2 == 1) {
        mediana = v[n / 2];
    } else {
        mediana = (v[n / 2 - 1] + v[n / 2]) / 2.0;
    }
    cout << "Mediana: " << mediana << endl;
    return 0;
}
```

**Ieșire:**
```
Vector sortat: 1 3 5 7 9 12 20 
Mediana: 7
```

Pentru `n = 7`, mijlocul este la poziția `7 / 2 = 3`. Pentru un număr par de elemente, se face media celor două din mijloc.

### Exemplul 13 — Comanda gata făcută: `sort`

Biblioteca standard are deja o sortare foarte rapidă. Se află în `<algorithm>`:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int v[8] = {29, 4, 17, 8, 42, 1, 15, 23};
    int n = 8;

    sort(v, v + n);

    cout << "Sortat cu sort(): ";
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Sortat cu sort(): 1 4 8 15 17 23 29 42 
```

`sort(v, v + n)` sortează primele `n` elemente. În probleme reale vei folosi aproape sigur `sort`, dar acum scrii sortarea singur, pentru că **trebuie să înțelegi ce se întâmplă în spate**. La teme și la test folosești metodele învățate azi, nu `sort`, dacă nu ți se spune altfel.

---

## 5. Proiecte

### Exemplul 14 — Citim numere și le sortăm

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[50];
    int n;

    do {
        cout << "Cate numere (1-50)? ";
        cin >> n;
    } while (n < 1 || n > 50);

    for (int i = 0; i < n; i++) {
        cout << "v[" << i << "] = ";
        cin >> v[i];
    }

    for (int pas = 0; pas < n - 1; pas++) {
        for (int i = 0; i < n - 1 - pas; i++) {
            if (v[i] > v[i + 1]) {
                int aux = v[i];
                v[i] = v[i + 1];
                v[i + 1] = aux;
            }
        }
    }

    cout << "Cel mai mic: " << v[0] << endl;
    cout << "Cel mai mare: " << v[n - 1] << endl;
    cout << "Sortat: ";
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Rulare** (tastezi `5`, apoi `40 -3 17 8 25`):
```
Cate numere (1-50)? 5
v[0] = 40
v[1] = -3
v[2] = 17
v[3] = 8
v[4] = 25
Cel mai mic: -3
Cel mai mare: 40
Sortat: -3 8 17 25 40 
```

După sortare, minimul și maximul sunt chiar la capete: `v[0]` și `v[n - 1]`. Este o altă cale de a le găsi.

### Exemplul 15 — Valorile distincte dintr-un vector sortat

Într-un vector sortat, valorile egale sunt una lângă alta. Deci duplicatele se găsesc comparând vecinii.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[10] = {1, 1, 2, 3, 3, 3, 5, 8, 8, 9};
    int n = 10;

    cout << "Valori distincte: ";
    cout << v[0] << " ";
    for (int i = 1; i < n; i++) {
        if (v[i] != v[i - 1]) {
            cout << v[i] << " ";
        }
    }
    cout << endl;

    int distincte = 1;
    for (int i = 1; i < n; i++) {
        if (v[i] != v[i - 1]) {
            distincte++;
        }
    }
    cout << "Numar de valori distincte: " << distincte << endl;
    return 0;
}
```

**Ieșire:**
```
Valori distincte: 1 2 3 5 8 9 
Numar de valori distincte: 6
```

Aceasta este una dintre marile utilități ale sortării: o problemă grea (duplicatele) devine ușoară.

### Exemplul 16 — „Clasamentul clasei” (mini-proiect)

```cpp
/*
   Program: Clasamentul clasei
   Scop:    citeste nume si note, afiseaza clasamentul
            (de la cea mai mare nota la cea mai mica) si podiumul
*/
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nume[30];
    int nota[30];
    int n;

    do {
        cout << "Numar de elevi (1-30): ";
        cin >> n;
    } while (n < 1 || n > 30);

    for (int i = 0; i < n; i++) {
        cout << "Elevul " << i + 1 << " - nume: ";
        cin >> nume[i];
        do {
            cout << "           nota (1-10): ";
            cin >> nota[i];
        } while (nota[i] < 1 || nota[i] > 10);
    }

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

    cout << endl << "===== CLASAMENT =====" << endl;
    int loc = 1;
    for (int i = 0; i < n; i++) {
        if (i > 0 && nota[i] < nota[i - 1]) {
            loc = i + 1;
        }
        cout << "Locul " << loc << ": " << nume[i] << " (" << nota[i] << ")" << endl;
    }

    cout << endl << "Podium:" << endl;
    for (int i = 0; i < n && i < 3; i++) {
        cout << " * " << nume[i] << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `5` elevi: `Ana 8`, `Bogdan 10`, `Carmen 8`, `Dan 6`, `Elena 9`):
```
Numar de elevi (1-30): 5
Elevul 1 - nume: Ana
           nota (1-10): 8
Elevul 2 - nume: Bogdan
           nota (1-10): 10
Elevul 3 - nume: Carmen
           nota (1-10): 8
Elevul 4 - nume: Dan
           nota (1-10): 6
Elevul 5 - nume: Elena
           nota (1-10): 9

===== CLASAMENT =====
Locul 1: Bogdan (10)
Locul 2: Elena (9)
Locul 3: Carmen (8)
Locul 3: Ana (8)
Locul 5: Dan (6)

Podium:
 * Bogdan
 * Elena
 * Carmen
```

Detaliul important: **locurile egale**. Ana și Carmen au aceeași notă, deci amândouă sunt pe locul 3, iar Dan, următorul, este pe locul 5 (nu 4). Variabila `loc` se schimbă doar când nota devine mai mică decât a elevului dinainte. Condiția `i < n && i < 3` din podium evită afișarea a trei elevi când sunt mai puțini în clasă.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Clasamentul clasei” (obligatoriu)
Scrie programul din Exemplul 16. Adaugă la final media clasei și numărul elevilor care au nota maximă.

### Exercițiul B — Sortare după două reguli
Sortează numerele pare în ordine crescătoare, apoi cele impare în ordine crescătoare, într-un singur vector: toate cele pare întâi, apoi cele impare. (Indiciu: poți construi doi vectori și îi unești.)

### Exercițiul C — Cele mai ieftine produse
Citește numele și prețul a `n` produse. Sortează-le crescător după preț și afișează cele mai ieftine 3 produse.

### Exercițiul D — Sortare alfabetică a prietenilor
Citește 6 nume și afișează-le în ordine alfabetică, apoi în ordine inversă.

### Exercițiul E — Mediana unei serii
Citește `n` numere, sortează vectorul și afișează mediana (cu atenție la cazul `n` par).

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Interschimbarea folosește o variabilă ajutătoare  
- [ ] Sortarea funcționează și crescător, și descrescător  
- [ ] La vectori paraleli, **ambii** vectori sunt interschimbați  
- [ ] Ai testat cu un vector deja sortat și cu unul în ordine inversă  
- [ ] Fișierul se numește `Prenume_Nume_M2L9.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Optimizează sortarea bulelor: oprește bucla dacă într-o trecere nu s-a făcut nicio interschimbare  
- [ ] Numără câte interschimbări face fiecare metodă (bule vs. selecție) pe același vector  
- [ ] Sortează un vector de `double` (temperaturi)  
- [ ] Sortează cuvintele după lungime, nu alfabetic (`nume[i].length()`)  
- [ ] Caută un număr într-un vector sortat cu **căutare binară**: compari cu elementul din mijloc și arunci jumătate din vector la fiecare pas  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Ambele valori devin egale după swap | `a = b; b = a;` fără variabilă ajutătoare | `aux = a; a = b; b = aux;` |
| Se citește dincolo de vector în bucla de sortare | `i < n` cu `v[i + 1]` în corp | `i < n - 1` (sau `n - 1 - pas`) |
| Vectorul nu este complet sortat | Prea puține treceri | Bucla exterioară: `pas < n - 1` |
| Sortează invers decât voiai | Ai folosit `>` în loc de `<` | `>` pentru crescător, `<` pentru descrescător |
| Numele nu se potrivesc cu notele după sortare | Ai interschimbat doar vectorul notelor | Interschimbă **și** vectorul numelor |
| `string aux` nu merge cu `int aux` | Tip greșit pentru variabila ajutătoare | Același tip ca elementele vectorului |
| `sort` dă eroare | Lipsește `#include <algorithm>` | Adaugă biblioteca |
| Sortarea alfabetică pune „ana” după „Zoe” | Literele mici au cod mai mare decât cele mari | Scrie toate numele cu majusculă la început |

---

## Recapitulare pe scurt

- **Swap:** `aux = a; a = b; b = aux;`, trei pași, trei „pahare”.
- **Bubble Sort:** compară vecinii și îi schimbă dacă sunt în ordine greșită. După fiecare trecere, cel mai mare ajunge la capăt. Două bucle: `pas < n - 1` și `i < n - 1 - pas`.
- **Selection Sort:** la fiecare pas găsești poziția minimului din partea nesortată și îl muți în față.
- Crescător: `>` (la bule) / minim. Descrescător: `<` (la bule) / maxim.
- La vectori paraleli interschimbi **ambele** vectori, în același timp.
- După sortare: minimul este `v[0]`, maximul este `v[n - 1]`, duplicatele sunt vecine, mediana este la mijloc.
- `sort(v, v + n);` din `<algorithm>` face același lucru, mult mai rapid.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Citește 8 numere. Sortează-le crescător cu metoda bulelor și afișează: vectorul sortat, al doilea cel mai mic și al doilea cel mai mare.  
3. Citește numele și vârsta a 5 copii. Afișează-i de la cel mai mic la cel mai mare.  
4. Scrie un program care citește 10 numere, le sortează descrescător (selecție) și afișează doar primele 3 și ultimul.  
5. **Bonus:** implementează sortarea bulelor optimizată (cu `bool` care oprește bucla când vectorul e deja sortat) și afișează câte treceri au fost necesare.  
6. Salvează tot ca `Tema_M2L9_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 10
Recapitulăm tot Modulul 2 (bucle și vectori), facem un test scurt și construim **Catalogul de note**, proiectul care încheie modulul.
