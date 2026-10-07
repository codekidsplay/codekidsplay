# LECȚIA 7 — Calcule cu vectori: sumă, medie, minim, maxim
**Modulul 2 · Bucle și vectori · 2 ore**  
**Code Maker Club · Loop Master**

> Azi parcurgi un vector și afli lucruri despre el: **suma**, **media**, **cel mai mic** și **cel mai mare** element, câte elemente respectă o regulă și **unde** se află. Exact ce face un catalog sau o aplicație de statistici.  
> Proiect: **„Statistica clasei”** · fișier: `Prenume_Nume_M2L7.cpp` (ex. `Ana_Pop_M2L7.cpp`)

---

## Obiectiv
La finalul orei calculezi suma și media unui vector, găsești minimul și maximul (valoarea și poziția), numeri elementele care respectă o condiție și construiești un mic raport de statistici.  
**Minim:** suma, media, minimul și maximul unui vector de note.  
**Ținta orei (Complet):** + numărarea notelor peste medie și un raport cu numele elevului cu cea mai mare notă.

## De ce contează
Un vector în sine nu spune prea multe. Valoarea apare când îl „interoghezi”: care e media clasei? cine are cea mai mare notă? câți elevi au promovat? Aceste întrebări se rezolvă cu câteva șabloane simple, pe care le vei folosi toată viața de programator.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: declarare, citire, afișare vectori |
| 10–35 | Suma și media (**Exemplele 1–3**) |
| 35–60 | Minim și maxim, cu poziții (**Exemplele 4–6**) |
| 60–85 | Numărări cu condiție (**Exemplele 7–10**) |
| 85–100 | Calcule mai avansate (**Exemplele 11–13**) |
| 100–118 | Proiecte (**Exemplele 14–16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Suma și media

Șablonul este cel din Lecția 2 (acumulatorul), dar acum valorile vin dintr-un vector: pornești cu `suma = 0` și adaugi fiecare `v[i]`.

### Exemplul 1 — Suma elementelor **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[6] = {4, 8, 15, 16, 23, 42};
    int suma = 0;

    for (int i = 0; i < 6; i++) {
        suma += v[i];
    }

    cout << "Suma este " << suma << endl;
    return 0;
}
```

**Ieșire:**
```
Suma este 108
```

Aici nu citim, nu afișăm elementele: doar le adunăm. `suma` pornește de la `0` (elementul neutru la adunare), altfel ai porni cu o valoare necunoscută.

### Exemplul 2 — Media aritmetică **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[5] = {9, 7, 10, 8, 6};
    int suma = 0;

    for (int i = 0; i < 5; i++) {
        suma += nota[i];
    }

    double medie = (double)suma / 5;
    cout << "Suma: " << suma << endl;
    cout << "Media: " << medie << endl;
    return 0;
}
```

**Ieșire:**
```
Suma: 40
Media: 8
```

`(double)suma / 5` transformă suma în număr zecimal înainte de împărțire (Modulul 1, lecția 4). Fără asta, `40 / 5` ar rămâne întreg, iar la alte date ai pierde zecimalele.

### Exemplul 3 — Media cu zecimale **[Esențial]**

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const int N = 4;
    int nota[N] = {10, 9, 9, 8};
    int suma = 0;

    for (int i = 0; i < N; i++) {
        suma += nota[i];
    }

    double medie = (double)suma / N;
    cout << fixed << setprecision(2);
    cout << "Media: " << medie << endl;
    return 0;
}
```

**Ieșire:**
```
Media: 9.00
```

Împărțim la `N`, nu la un număr scris de mână. Dacă mâine vectorul are 30 de note, schimbi doar `N`. Cu `setprecision(2)` afișăm media cu două zecimale.

**Încearcă tu (8 min)**  
- [ ] Calculezi suma a 8 numere dintr-un vector  
- [ ] Calculezi media a 6 note și o afișezi cu 1 zecimală  
- [ ] Citești 5 numere de la tastatură și afișezi suma lor  

---

## 2. Minimul și maximul

Ideea: presupui că **primul element** este cel mai mare (sau cel mai mic), apoi parcurgi restul și actualizezi când găsești unul mai bun.

### Exemplul 4 — Elementul maxim **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[7] = {12, 45, 7, 31, 45, 2, 19};
    int maxim = v[0];

    for (int i = 1; i < 7; i++) {
        if (v[i] > maxim) {
            maxim = v[i];
        }
    }

    cout << "Maximul este " << maxim << endl;
    return 0;
}
```

**Ieșire:**
```
Maximul este 45
```

Pornim cu `maxim = v[0]` și parcurgem de la `i = 1` (primul element e deja luat în calcul). Să NU pornești cu `maxim = 0`: dacă toate numerele ar fi negative, rezultatul ar fi greșit.

### Exemplul 5 — Minimul și maximul împreună **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int temp[8] = {-3, 5, 12, -8, 0, 7, 15, -1};
    int minim = temp[0];
    int maxim = temp[0];

    for (int i = 1; i < 8; i++) {
        if (temp[i] < minim) {
            minim = temp[i];
        }
        if (temp[i] > maxim) {
            maxim = temp[i];
        }
    }

    cout << "Temperatura minima: " << minim << endl;
    cout << "Temperatura maxima: " << maxim << endl;
    cout << "Diferenta: " << maxim - minim << endl;
    return 0;
}
```

**Ieșire:**
```
Temperatura minima: -8
Temperatura maxima: 15
Diferenta: 23
```

Un singur `for` poate căuta amândouă valorile. Vezi că funcționează și cu numere negative.

### Exemplul 6 — Poziția maximului

Uneori nu te interesează valoarea, ci **unde** se află. Păstrezi **indicele**, nu valoarea:

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[6] = {7, 9, 6, 10, 8, 10};
    int pozMax = 0;

    for (int i = 1; i < 6; i++) {
        if (nota[i] > nota[pozMax]) {
            pozMax = i;
        }
    }

    cout << "Cea mai mare nota este " << nota[pozMax] << endl;
    cout << "Se afla pe pozitia " << pozMax << " (elevul " << pozMax + 1 << ")" << endl;
    return 0;
}
```

**Ieșire:**
```
Cea mai mare nota este 10
Se afla pe pozitia 3 (elevul 4)
```

Dacă maximul apare de mai multe ori (aici `10` pe pozițiile 3 și 5), se păstrează **prima** apariție, pentru că folosim `>` și nu `>=`. Având poziția, poți afla valoarea (`nota[pozMax]`) și, mai târziu, alte date despre același elev.

**Încearcă tu (10 min)**  
- [ ] Găsești minimul unui vector de 10 numere  
- [ ] Afișezi poziția minimului  
- [ ] Testezi cu un vector cu toate valorile negative  

---

## 3. Numărări cu condiție

Șablonul este cel din Lecția 2 (contor): `if (condiție) contor++;`, dar aplicat pe fiecare element.

### Exemplul 7 — Câte numere sunt pare **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[8] = {3, 8, 12, 7, 20, 5, 6, 9};
    int pare = 0;
    int impare = 0;

    for (int i = 0; i < 8; i++) {
        if (v[i] % 2 == 0) {
            pare++;
        } else {
            impare++;
        }
    }

    cout << "Numere pare: " << pare << endl;
    cout << "Numere impare: " << impare << endl;
    return 0;
}
```

**Ieșire:**
```
Numere pare: 4
Numere impare: 4
```

### Exemplul 8 — Cine a promovat?

Presupunem că nota de trecere este 5.

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[10] = {4, 9, 7, 3, 10, 5, 8, 2, 6, 9};
    int promovati = 0;

    for (int i = 0; i < 10; i++) {
        if (nota[i] >= 5) {
            promovati++;
        }
    }

    cout << "Au promovat " << promovati << " din 10 elevi." << endl;
    cout << "Procent: " << promovati * 100 / 10 << "%" << endl;
    return 0;
}
```

**Ieșire:**
```
Au promovat 7 din 10 elevi.
Procent: 70%
```

### Exemplul 9 — Suma doar a elementelor care îndeplinesc o regulă

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[9] = {5, 12, 7, 20, 3, 8, 15, 6, 11};
    int sumaPare = 0;
    int sumaMari = 0;

    for (int i = 0; i < 9; i++) {
        if (v[i] % 2 == 0) {
            sumaPare += v[i];
        }
        if (v[i] > 10) {
            sumaMari += v[i];
        }
    }

    cout << "Suma numerelor pare: " << sumaPare << endl;
    cout << "Suma numerelor mai mari ca 10: " << sumaMari << endl;
    return 0;
}
```

**Ieșire:**
```
Suma numerelor pare: 46
Suma numerelor mai mari ca 10: 58
```

Același acumulator, dar cu un `if` în fața lui: adaugi doar ce respectă regula.

### Exemplul 10 — Câte elemente sunt peste medie **[Esențial]**

Doi pași: întâi calculezi media, apoi o folosești pentru a număra. Sunt două parcurgeri.

```cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 8;
    int nota[N] = {6, 9, 7, 10, 5, 8, 9, 4};
    int suma = 0;

    for (int i = 0; i < N; i++) {
        suma += nota[i];
    }
    double medie = (double)suma / N;

    int pesteMedie = 0;
    for (int i = 0; i < N; i++) {
        if (nota[i] > medie) {
            pesteMedie++;
        }
    }

    cout << "Media clasei: " << medie << endl;
    cout << "Peste medie: " << pesteMedie << " elevi" << endl;
    return 0;
}
```

**Ieșire:**
```
Media clasei: 7.25
Peste medie: 4 elevi
```

Vezi cum cele două parcurgeri lucrează în echipă: prima produce o valoare (media), a doua o folosește. Nu poți număra „peste medie” înainte să știi media.

**Încearcă tu (10 min)**  
- [ ] Numeri câte note sunt de 10  
- [ ] Calculezi suma notelor sub 5  
- [ ] Afli câți elevi sunt sub medie  

---

## 4. Calcule mai avansate

### Exemplul 11 — Citim `n` note și facem toate statisticile

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int nota[30];
    int n;

    do {
        cout << "Cati elevi (1-30)? ";
        cin >> n;
    } while (n < 1 || n > 30);

    for (int i = 0; i < n; i++) {
        cout << "Nota elevului " << i + 1 << ": ";
        cin >> nota[i];
    }

    int suma = 0;
    int minim = nota[0];
    int maxim = nota[0];
    for (int i = 0; i < n; i++) {
        suma += nota[i];
        if (nota[i] < minim) {
            minim = nota[i];
        }
        if (nota[i] > maxim) {
            maxim = nota[i];
        }
    }

    cout << fixed << setprecision(2);
    cout << endl << "Suma: " << suma << endl;
    cout << "Media: " << (double)suma / n << endl;
    cout << "Minim: " << minim << endl;
    cout << "Maxim: " << maxim << endl;
    return 0;
}
```

**Rulare** (tastezi `4`, apoi `9 7 10 6`):
```
Cati elevi (1-30)? 4
Nota elevului 1: 9
Nota elevului 2: 7
Nota elevului 3: 10
Nota elevului 4: 6

Suma: 32
Media: 8.00
Minim: 6
Maxim: 10
```

Un singur `for` face suma, minimul și maximul în același timp. Atenție, pornim cu `minim = nota[0]` și `maxim = nota[0]` după ce vectorul a fost citit.

### Exemplul 12 — Cele două note extreme și diferența dintre ele

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[10] = {34, 12, 78, 56, 90, 23, 45, 67, 8, 51};
    int minim = v[0];
    int maxim = v[0];

    for (int i = 1; i < 10; i++) {
        if (v[i] < minim) minim = v[i];
        if (v[i] > maxim) maxim = v[i];
    }

    cout << "Cel mai mic: " << minim << endl;
    cout << "Cel mai mare: " << maxim << endl;
    cout << "Amplitudinea (max - min): " << maxim - minim << endl;
    return 0;
}
```

**Ieșire:**
```
Cel mai mic: 8
Cel mai mare: 90
Amplitudinea (max - min): 82
```

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

### Exemplul 13 — Concurs: media fără cea mai mică și cea mai mare notă *(Provocare, opțional)*

La multe concursuri se elimină nota cea mai mare și nota cea mai mică dată de juriu.

```cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 5;
    double juriu[N] = {9.5, 8.0, 9.0, 7.5, 9.5};
    double suma = 0;
    double minim = juriu[0];
    double maxim = juriu[0];

    for (int i = 0; i < N; i++) {
        suma += juriu[i];
        if (juriu[i] < minim) minim = juriu[i];
        if (juriu[i] > maxim) maxim = juriu[i];
    }

    double scor = (suma - minim - maxim) / (N - 2);

    cout << "Suma notelor: " << suma << endl;
    cout << "Eliminam: " << minim << " si " << maxim << endl;
    cout << "Scor final: " << scor << endl;
    return 0;
}
```

**Ieșire:**
```
Suma notelor: 43.5
Eliminam: 7.5 si 9.5
Scor final: 8.83333
```

Scăzând din sumă minimul și maximul, și împărțind la `N - 2`, obții media celor `N - 2` note rămase.

---

## 5. Proiecte

### Exemplul 14 — Histograma notelor *(Provocare, opțional)*

Pentru fiecare notă de la 1 la 10 numărăm câți elevi au luat-o și desenăm bare din `*`. Vectorul `frecventa` are 11 locuri, ca să folosim direct nota ca indice (indicele `0` rămâne nefolosit).

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[12] = {7, 9, 8, 7, 10, 9, 7, 6, 9, 8, 10, 7};
    int frecventa[11] = {0};

    for (int i = 0; i < 12; i++) {
        frecventa[nota[i]]++;
    }

    for (int n = 10; n >= 6; n--) {
        if (n < 10) {
            cout << " ";
        }
        cout << n << " | ";
        for (int j = 0; j < frecventa[n]; j++) {
            cout << "*";
        }
        cout << " (" << frecventa[n] << ")" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
10 | ** (2)
 9 | *** (3)
 8 | ** (2)
 7 | **** (4)
 6 | * (1)
```

`int frecventa[11] = {0};` pune `0` în toate cele 11 locuri. Instrucțiunea `frecventa[nota[i]]++` înseamnă: „pentru nota citită din vector, mărește contorul acelei note cu 1”. O buclă imbricată desenează barele (Lecția 5). Spațiul pus când `n < 10` aliniază numerele de o cifră cu cel de două cifre (`10`).

### Exemplul 15 — Elevul cu cea mai mare notă (două vectori paraleli)

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    const int N = 5;
    string nume[N] = {"Ana", "Bogdan", "Carmen", "Dan", "Elena"};
    int nota[N] = {8, 10, 9, 7, 10};

    int pozMax = 0;
    for (int i = 1; i < N; i++) {
        if (nota[i] > nota[pozMax]) {
            pozMax = i;
        }
    }

    cout << "Cea mai mare nota: " << nota[pozMax] << endl;
    cout << "Elev: " << nume[pozMax] << endl;

    cout << endl << "Toti elevii cu aceasta nota:" << endl;
    for (int i = 0; i < N; i++) {
        if (nota[i] == nota[pozMax]) {
            cout << " - " << nume[i] << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
Cea mai mare nota: 10
Elev: Bogdan

Toti elevii cu aceasta nota:
 - Bogdan
 - Elena
```

Vectorii `nume` și `nota` sunt „paraleli”: elementul `i` din ambii aparține aceluiași elev. Găsești poziția în unul și o folosești în celălalt. A doua parcurgere afișează toți elevii cu nota maximă, nu doar primul.

### Exemplul 16 — „Statistica clasei” (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Statistica clasei
   Scop:    citeste numele si nota elevilor, apoi afiseaza
            media, cel mai bun si cel mai slab elev, promovatii
*/
#include <iostream>
#include <iomanip>
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
    double medie = (double)suma / n;

    int pesteMedie = 0;
    for (int i = 0; i < n; i++) {
        if (nota[i] > medie) pesteMedie++;
    }

    cout << fixed << setprecision(2);
    cout << endl << "===== STATISTICA CLASEI =====" << endl;
    cout << "Media clasei:  " << medie << endl;
    cout << "Cel mai bun:   " << nume[pozMax] << " (" << nota[pozMax] << ")" << endl;
    cout << "Cel mai slab:  " << nume[pozMin] << " (" << nota[pozMin] << ")" << endl;
    cout << "Promovati:     " << promovati << " din " << n << endl;
    cout << "Peste medie:   " << pesteMedie << " elevi" << endl;
    return 0;
}
```

**Rulare** (tastezi `4` elevi: `Ana 8`, `Bogdan 10`, `Carmen 4`, `Dan 7`):
```
Numar de elevi (1-30): 4
Elevul 1 - nume: Ana
           nota (1-10): 8
Elevul 2 - nume: Bogdan
           nota (1-10): 10
Elevul 3 - nume: Carmen
           nota (1-10): 4
Elevul 4 - nume: Dan
           nota (1-10): 7

===== STATISTICA CLASEI =====
Media clasei:  7.25
Cel mai bun:   Bogdan (10)
Cel mai slab:  Carmen (4)
Promovati:     3 din 4
Peste medie:   2 elevi
```

Programul reunește: vectori paraleli, validare cu `do-while`, citire cu `for`, suma, minimul, maximul (prin poziții), numărări și un raport formatat. Ai scris un mini-catalog digital.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Statistica clasei” (obligatoriu)
Scrie programul din Exemplul 16. Adaugă la raport: numărul elevilor cu nota 10 și cel al elevilor corigenți (nota sub 5).

### Exercițiul B — Cumpărături
Un vector conține 8 prețuri. Afișează: suma totală, produsul cel mai scump, cel mai ieftin și câte produse costă mai mult decât media.

### Exercițiul C — Temperaturi
Citește 7 temperaturi (una pe zi). Afișează temperatura medie, ziua cea mai caldă și cea mai rece (ca număr de ordine) și câte zile au avut sub 0 grade.

### Exercițiul D — Al doilea cel mai mare
Dintr-un vector de 10 numere, afișează al doilea cel mai mare. Poți face asta în două parcurgeri: întâi maximul, apoi cel mai mare element **diferit** de maxim.

### Exercițiul E — Media ponderată
Un vector conține notele, altul ponderile (de exemplu, lucrări 40%, test 30%…). Calculează media ponderată: suma produselor `nota[i] * pondere[i]`, împărțită la suma ponderilor.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Suma pornește de la `0`, minimul/maximul de la `v[0]`  
- [ ] Media se calculează cu `(double)` (nu pierde zecimalele)  
- [ ] Ai testat cu un singur elev și cu valori negative / egale  
- [ ] Ai folosit cel puțin un vector paralel (nume + notă)  
- [ ] Fișierul se numește `Prenume_Nume_M2L7.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Afișează clasamentul „podium”: numele elevilor cu cele mai mari 3 note (fără sortare, prin căutări repetate)  
- [ ] Afișează câte note distincte există în vector  
- [ ] Verifică dacă toate elementele sunt egale  
- [ ] Verifică dacă vectorul este crescător (fiecare element ≥ cel dinaintea lui)  
- [ ] Calculează abaterea de la medie pentru fiecare notă (`nota[i] - medie`) și afișează-le într-un tabel  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Suma are o valoare uriașă sau ciudată | `int suma;` fără valoare inițială | `int suma = 0;` |
| Media apare întreagă (de ex. `8` în loc de `8.4`) | Împărțire între numere întregi | `(double)suma / n` |
| Maximul este greșit cu numere negative | Ai pornit cu `maxim = 0` | `maxim = v[0];` |
| Maximul/minimul este greșit | Ai uitat să actualizezi sau ai pus `<` în loc de `>` | Verifică direcția comparației |
| Media se împarte la alt număr decât numărul de note | Ai folosit un număr scris de mână | Împarte la `n` (numărul real de elemente) |
| Se afișează poziția în loc de valoare | Ai scris `pozMax` în loc de `nota[pozMax]` | Indice ≠ valoare |
| Se citesc mai multe elemente decât încap în vector | `n` este mai mare decât dimensiunea declarată | Verifică `n` înainte de citire |
| Ai uitat că indicii încep de la 0 | Afișezi `pozMax` în loc de `pozMax + 1` pentru utilizator | La afișare folosești `+ 1` |

---

## Recapitulare pe scurt

- **Suma:** `suma = 0;` apoi `suma += v[i];` într-un `for`.
- **Media:** `(double)suma / n`.
- **Maxim / minim:** pornești cu `v[0]`, parcurgi de la `i = 1` și actualizezi când găsești mai bine.
- **Poziția** maximului: păstrezi indicele (`pozMax`), iar valoarea este `v[pozMax]`.
- **Numărare:** `if (condiție) contor++;`
- **Sumă condiționată:** `if (condiție) suma += v[i];`
- Pentru vectori paraleli (`nume[i]`, `nota[i]`), indicele îi leagă.
- Uneori ai nevoie de **două parcurgeri**: prima calculează (media), a doua folosește rezultatul.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Citește 10 numere întregi și afișează: suma, media, minimul, maximul și cât de mult depășește maximul media.  
3. Citește 8 prețuri și afișează câte sunt sub 20 de lei, câte sunt între 20 și 50 și câte sunt peste 50.  
4. Scrie un program care citește `n` numere și afișează cel mai mare număr **par** (sau un mesaj dacă nu există niciunul).  
5. **Bonus:** pentru 5 elevi (nume + 3 note fiecare, în trei vectori), calculează media fiecăruia și afișează clasamentul „cine are cea mai mare medie”.  
6. Salvează tot ca `Tema_M2L7_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 8
Căutăm în vector: există valoarea X? pe ce poziție? de câte ori apare? Adică ce face un „Ctrl+F” într-o listă.
