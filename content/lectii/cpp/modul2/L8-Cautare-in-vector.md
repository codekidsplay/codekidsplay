# LECȚIA 8 — Căutarea în vector
**Modulul 2 · Bucle și vectori · 2 ore**  
**Code Kids Play · Loop Master**

> Azi înveți să „cauți” într-un vector, ca atunci când apeși Ctrl+F într-o listă: **există** valoarea? **unde** se află? **de câte ori** apare? Mai înveți să **ștergi** și să **inserezi** elemente.  
> Proiect: **„Agenda telefonică”** · fișier: `Prenume_Nume_M2L8.cpp` (ex. `Ana_Pop_M2L8.cpp`)

---

## Obiectiv
La finalul orei verifici dacă o valoare există într-un vector, găsești prima poziție, numeri aparițiile, cauți într-un vector de nume și modifici vectorul prin ștergere și inserare.  
**Minim:** un program care spune dacă un număr există într-un vector și pe ce poziție.  
**Ținta orei (Complet):** + numărarea aparițiilor și o agendă cu meniu, în care cauți un nume și afișezi telefonul.

## De ce contează
Agenda din telefon, căutarea unui produs într-un magazin online, verificarea unei parole într-o listă: toate încep cu **căutare**. Metoda de azi se numește **căutare liniară**: te uiți la fiecare element, pe rând, până îl găsești sau până se termină vectorul. Este simplă și funcționează oricând.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: statistici pe vectori |
| 10–35 | Există? Pe ce poziție? (**Exemplele 1–4**) |
| 35–60 | Numărare, toate pozițiile, ultima apariție (**Exemplele 5–7**) |
| 60–80 | Căutare în vectori de nume, verificări (**Exemplele 8–11**) |
| 80–100 | Ștergere și inserare (**Exemplele 12–13**) |
| 100–118 | Proiecte (**Exemplele 14–16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **7 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Există valoarea? Pe ce poziție?

Ideea: parcurgi vectorul și compari fiecare element cu valoarea căutată. Poți folosi o variabilă „steag” (`bool`), pe care o schimbi când găsești valoarea (Modulul 1, lecția 5).

### Exemplul 1 — Există valoarea în vector? **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[7] = {12, 5, 38, 7, 21, 9, 14};
    int x = 21;
    bool gasit = false;

    for (int i = 0; i < 7; i++) {
        if (v[i] == x) {
            gasit = true;
        }
    }

    if (gasit) {
        cout << x << " exista in vector." << endl;
    } else {
        cout << x << " nu exista in vector." << endl;
    }
    return 0;
}
```

**Ieșire:**
```
21 exista in vector.
```

Pornim cu `gasit = false` („presupunem că nu e”). Dacă găsim valoarea, schimbăm în `true`. **Nu** punem `else gasit = false` în buclă; ar șterge un rezultat deja găsit.

### Exemplul 2 — Prima poziție (cu `break`) **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[8] = {4, 9, 15, 9, 22, 3, 9, 30};
    int x = 9;
    int poz = -1;

    for (int i = 0; i < 8; i++) {
        if (v[i] == x) {
            poz = i;
            break;
        }
    }

    if (poz == -1) {
        cout << x << " nu a fost gasit." << endl;
    } else {
        cout << x << " apare prima data pe pozitia " << poz << endl;
    }
    return 0;
}
```

**Ieșire:**
```
9 apare prima data pe pozitia 1
```

Folosim `poz = -1` pentru „negăsit”. De ce `-1`? Pentru că niciun indice valid nu este negativ, deci `-1` nu poate fi confundat cu o poziție reală. `break` oprește căutarea imediat ce găsim prima apariție.

### Exemplul 3 — Căutare cu valoarea citită **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 6;
    int cod[N] = {1012, 2055, 3101, 4020, 5517, 6003};
    int x;

    cout << "Cod produs: ";
    cin >> x;

    int poz = -1;
    for (int i = 0; i < N; i++) {
        if (cod[i] == x) {
            poz = i;
            break;
        }
    }

    if (poz != -1) {
        cout << "Produsul exista, raftul " << poz + 1 << "." << endl;
    } else {
        cout << "Produs inexistent." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `4020`):
```
Cod produs: 4020
Produsul exista, raftul 4.
```

**Rulare** (tastezi `9999`):
```
Cod produs: 9999
Produs inexistent.
```

### Exemplul 4 — Căutare cu `while` (se oprește singură)

Aceeași căutare, dar cu `while`: continuăm cât timp **nu am găsit** și **nu am ajuns la capăt**.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[6] = {8, 14, 3, 27, 6, 19};
    int x = 27;
    int i = 0;

    while (i < 6 && v[i] != x) {
        i++;
    }

    if (i < 6) {
        cout << "Gasit pe pozitia " << i << endl;
    } else {
        cout << "Negasit" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Gasit pe pozitia 3
```

Ordinea condițiilor contează: `i < 6` trebuie verificat **primul**. Altfel, dacă `i` ajunge la `6`, am citi `v[6]`, în afara vectorului (Lecția 6). Cu `&&`, dacă prima condiție e falsă, a doua nu se mai evaluează.

**Încearcă tu (8 min)**  
- [ ] Verifici dacă numărul 100 există într-un vector  
- [ ] Afișezi poziția primei apariții a unui număr citit  
- [ ] Rescrii căutarea cu `while`  

---

## 2. Numărare, toate pozițiile, ultima apariție

### Exemplul 5 — De câte ori apare o valoare **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[12] = {9, 7, 10, 9, 8, 9, 6, 10, 9, 7, 8, 9};
    int x = 9;
    int aparitii = 0;

    for (int i = 0; i < 12; i++) {
        if (nota[i] == x) {
            aparitii++;
        }
    }

    cout << "Nota " << x << " apare de " << aparitii << " ori." << endl;
    return 0;
}
```

**Ieșire:**
```
Nota 9 apare de 5 ori.
```

### Exemplul 6 — Toate pozițiile **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[10] = {2, 7, 2, 5, 2, 9, 7, 2, 1, 4};
    int x = 2;
    int gasite = 0;

    cout << "Valoarea " << x << " apare pe pozitiile:";
    for (int i = 0; i < 10; i++) {
        if (v[i] == x) {
            cout << " " << i;
            gasite++;
        }
    }

    if (gasite == 0) {
        cout << " (nicio pozitie)";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Valoarea 2 apare pe pozitiile: 0 2 4 7
```

### Exemplul 7 — Ultima apariție

Două soluții: parcurgi de la sfârșit sau parcurgi tot și actualizezi poziția de fiecare dată.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[8] = {5, 3, 5, 8, 5, 1, 3, 5};
    int x = 3;

    int ultima = -1;
    for (int i = 0; i < 8; i++) {
        if (v[i] == x) {
            ultima = i;
        }
    }
    cout << "Varianta 1 (actualizam): ultima pozitie = " << ultima << endl;

    int poz = -1;
    for (int i = 7; i >= 0; i--) {
        if (v[i] == x) {
            poz = i;
            break;
        }
    }
    cout << "Varianta 2 (de la sfarsit): ultima pozitie = " << poz << endl;
    return 0;
}
```

**Ieșire:**
```
Varianta 1 (actualizam): ultima pozitie = 6
Varianta 2 (de la sfarsit): ultima pozitie = 6
```

În varianta 1 nu folosim `break`, ca să ajungem până la capăt; fiecare nouă apariție suprascrie poziția. În varianta 2 mergem de la coadă către început și ne oprim la prima apariție întâlnită.

**Încearcă tu (10 min)**  
- [ ] Numeri de câte ori apare cifra 0 într-un vector  
- [ ] Afișezi toate pozițiile unde apare un număr citit  
- [ ] Găsești ultima poziție pe care apare un număr  

---

## 3. Căutare în vectori de nume, verificări

### Exemplul 8 — Căutăm un nume

Pentru `string`, compararea cu `==` merge direct (Modulul 1, lecția 5).

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nume[5] = {"Ana", "Bogdan", "Carmen", "Dan", "Elena"};
    string cautat;

    cout << "Cauta elevul: ";
    cin >> cautat;

    int poz = -1;
    for (int i = 0; i < 5; i++) {
        if (nume[i] == cautat) {
            poz = i;
            break;
        }
    }

    if (poz == -1) {
        cout << cautat << " nu este in clasa." << endl;
    } else {
        cout << cautat << " este elevul numarul " << poz + 1 << "." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `Carmen`):
```
Cauta elevul: Carmen
Carmen este elevul numarul 3.
```

Atenție: `"carmen"` cu literă mică nu este același lucru cu `"Carmen"`. Compararea face diferența între litere mari și mici.

### Exemplul 9 — Căutare într-un vector, răspuns în alt vector

Vectori paraleli, din nou: cauți în unul, afișezi din celălalt.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string tara[4] = {"Romania", "Franta", "Italia", "Spania"};
    string capitala[4] = {"Bucuresti", "Paris", "Roma", "Madrid"};
    string cautat;

    cout << "Tara: ";
    cin >> cautat;

    bool gasit = false;
    for (int i = 0; i < 4; i++) {
        if (tara[i] == cautat) {
            cout << "Capitala: " << capitala[i] << endl;
            gasit = true;
        }
    }

    if (!gasit) {
        cout << "Tara necunoscuta." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `Italia`):
```
Tara: Italia
Capitala: Roma
```

### Exemplul 10 — Sunt toate numerele pozitive?

Pentru „toate elementele respectă o regulă”, ideea se inversează: cauți **un contraexemplu**. Dacă găsești unul, răspunsul este „nu”.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[6] = {4, 12, 7, -3, 9, 15};
    bool toatePozitive = true;

    for (int i = 0; i < 6; i++) {
        if (v[i] <= 0) {
            toatePozitive = false;
            break;
        }
    }

    if (toatePozitive) {
        cout << "Toate numerele sunt pozitive." << endl;
    } else {
        cout << "Exista cel putin un numar nepozitiv." << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Exista cel putin un numar nepozitiv.
```

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

### Exemplul 11 — Există duplicate? *(Provocare, opțional)*

Comparăm fiecare element cu cele de după el, ceea ce înseamnă o buclă imbricată (Lecția 5).

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[7] = {14, 8, 31, 8, 20, 5, 14};

    cout << "Valori care se repeta:" << endl;
    bool exista = false;

    for (int i = 0; i < 7; i++) {
        for (int j = i + 1; j < 7; j++) {
            if (v[i] == v[j]) {
                cout << " - " << v[i] << " (pozitiile " << i << " si " << j << ")" << endl;
                exista = true;
            }
        }
    }

    if (!exista) {
        cout << "Niciuna, toate sunt distincte." << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Valori care se repeta:
 - 14 (pozitiile 0 si 6)
 - 8 (pozitiile 1 si 3)
```

Bucla interioară pornește de la `i + 1`, ca să nu compare un element cu el însuși și să nu repete perechile (dacă ai verificat `(0, 3)`, nu mai verifici `(3, 0)`).

**Încearcă tu (10 min)**  
- [ ] Verifici dacă un vector conține vreun număr negativ  
- [ ] Verifici dacă toate numerele sunt pare  
- [ ] Cauți un nume într-un vector de 5 prieteni  

---

## 4. Ștergere și inserare

Un vector are dimensiune fixă, dar cu o variabilă `n` (numărul de elemente folosite) poți „șterge” sau „insera”, prin mutarea elementelor.

### Exemplul 12 — Ștergem un element **[Esențial]**

Ștergem elementul de pe poziția `p`: mutăm toate elementele de după el cu **o poziție la stânga**, apoi micșorăm `n`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[10] = {10, 20, 30, 40, 50};
    int n = 5;
    int p = 2;

    for (int i = p; i < n - 1; i++) {
        v[i] = v[i + 1];
    }
    n--;

    cout << "Dupa stergere: ";
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Dupa stergere: 10 20 40 50 
```

```
Inainte:   10  20  30  40  50      (stergem poziția 2, adică 30)
v[2] = v[3]  →  10  20  40  40  50
v[3] = v[4]  →  10  20  40  50  50
n devine 4   →  10  20  40  50
```

Ultimul element rămâne în memorie, dar nu mai este în „zona folosită” (`n` s-a micșorat), așa că nu mai apare.

### Exemplul 13 — Inserăm un element

Inserăm valoarea `x` pe poziția `p`: mutăm elementele de la `p` încolo cu **o poziție la dreapta**, **începând de la coadă** (altfel s-ar suprascrie), apoi punem `x`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[10] = {10, 20, 40, 50};
    int n = 4;
    int p = 2;
    int x = 30;

    for (int i = n; i > p; i--) {
        v[i] = v[i - 1];
    }
    v[p] = x;
    n++;

    cout << "Dupa inserare: ";
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Dupa inserare: 10 20 30 40 50 
```

Ordinea contează: la ștergere mutăm de la **început** spre sfârșit, la inserare mutăm de la **sfârșit** spre început. Încearcă pe hârtie cu 4 pătrățele ca să vezi de ce.

---

## 5. Proiecte

### Exemplul 14 — Cel mai apropiat număr de o valoare *(Provocare, opțional)*

Căutăm elementul cu **diferența** cea mai mică față de o țintă. Diferența trebuie luată fără semn, așa că folosim o mică verificare.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[7] = {12, 45, 33, 8, 27, 51, 19};
    int tinta = 30;

    int pozBest = 0;
    int diferentaBest = v[0] - tinta;
    if (diferentaBest < 0) {
        diferentaBest = -diferentaBest;
    }

    for (int i = 1; i < 7; i++) {
        int dif = v[i] - tinta;
        if (dif < 0) {
            dif = -dif;
        }
        if (dif < diferentaBest) {
            diferentaBest = dif;
            pozBest = i;
        }
    }

    cout << "Cel mai apropiat de " << tinta << " este " << v[pozBest]
         << " (diferenta " << diferentaBest << ")" << endl;
    return 0;
}
```

**Ieșire:**
```
Cel mai apropiat de 30 este 33 (diferenta 3)
```

Este același șablon ca la minim, dar minimizăm **diferența**, nu valoarea. Valoarea absolută o obținem simplu: dacă diferența e negativă, îi schimbăm semnul (`dif = -dif`).

### Exemplul 15 — Agenda cu o singură căutare

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nume[4] = {"Mama", "Tata", "Bunica", "Prieten"};
    string tel[4] = {"0721111111", "0722222222", "0723333333", "0724444444"};
    string cautat;

    cout << "Pe cine suni? ";
    cin >> cautat;

    int poz = -1;
    for (int i = 0; i < 4; i++) {
        if (nume[i] == cautat) {
            poz = i;
        }
    }

    if (poz >= 0) {
        cout << nume[poz] << ": " << tel[poz] << endl;
    } else {
        cout << "Contact negasit." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `Bunica`):
```
Pe cine suni? Bunica
Bunica: 0723333333
```

### Exemplul 16 — „Agenda telefonică” (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Agenda telefonica
   Scop:    meniu cu adaugare, cautare, afisare si stergere contacte
*/
#include <iostream>
#include <string>
using namespace std;

int main() {
    const int MAXIM = 20;
    string nume[MAXIM];
    string tel[MAXIM];
    int n = 0;
    int optiune;

    do {
        cout << endl << "===== AGENDA - contacte: " << n << " =====" << endl;
        cout << "1. Adauga contact" << endl;
        cout << "2. Cauta contact" << endl;
        cout << "3. Afiseaza toate" << endl;
        cout << "4. Sterge contact" << endl;
        cout << "0. Iesire" << endl;
        cout << "Alege: ";
        cin >> optiune;

        switch (optiune) {
            case 1:
                if (n == MAXIM) {
                    cout << "Agenda este plina." << endl;
                } else {
                    cout << "Nume: ";
                    cin >> nume[n];
                    cout << "Telefon: ";
                    cin >> tel[n];
                    n++;
                    cout << "Contact adaugat." << endl;
                }
                break;
            case 2: {
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
                    cout << "Contact negasit." << endl;
                } else {
                    cout << nume[poz] << ": " << tel[poz] << endl;
                }
                break;
            }
            case 3:
                if (n == 0) {
                    cout << "Agenda este goala." << endl;
                }
                for (int i = 0; i < n; i++) {
                    cout << i + 1 << ". " << nume[i] << " - " << tel[i] << endl;
                }
                break;
            case 4: {
                string cautat;
                cout << "Nume de sters: ";
                cin >> cautat;
                int poz = -1;
                for (int i = 0; i < n; i++) {
                    if (nume[i] == cautat) {
                        poz = i;
                        break;
                    }
                }
                if (poz == -1) {
                    cout << "Contact negasit." << endl;
                } else {
                    for (int i = poz; i < n - 1; i++) {
                        nume[i] = nume[i + 1];
                        tel[i] = tel[i + 1];
                    }
                    n--;
                    cout << "Contact sters." << endl;
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

**Rulare** (tastezi `1 Ana 0711 1 Dan 0722 3 2 Dan 4 Ana 3 0`):
```

===== AGENDA - contacte: 0 =====
1. Adauga contact
2. Cauta contact
3. Afiseaza toate
4. Sterge contact
0. Iesire
Alege: 1
Nume: Ana
Telefon: 0711
Contact adaugat.

===== AGENDA - contacte: 1 =====
1. Adauga contact
2. Cauta contact
3. Afiseaza toate
4. Sterge contact
0. Iesire
Alege: 1
Nume: Dan
Telefon: 0722
Contact adaugat.

===== AGENDA - contacte: 2 =====
1. Adauga contact
2. Cauta contact
3. Afiseaza toate
4. Sterge contact
0. Iesire
Alege: 3
1. Ana - 0711
2. Dan - 0722

===== AGENDA - contacte: 2 =====
1. Adauga contact
2. Cauta contact
3. Afiseaza toate
4. Sterge contact
0. Iesire
Alege: 2
Nume cautat: Dan
Dan: 0722

===== AGENDA - contacte: 2 =====
1. Adauga contact
2. Cauta contact
3. Afiseaza toate
4. Sterge contact
0. Iesire
Alege: 4
Nume de sters: Ana
Contact sters.

===== AGENDA - contacte: 1 =====
1. Adauga contact
2. Cauta contact
3. Afiseaza toate
4. Sterge contact
0. Iesire
Alege: 3
1. Dan - 0722

===== AGENDA - contacte: 1 =====
1. Adauga contact
2. Cauta contact
3. Afiseaza toate
4. Sterge contact
0. Iesire
Alege: 0
La revedere!
```

Aceasta este o aplicație adevărată, în sub 100 de linii. Combină: meniu cu `do-while` + `switch`, vectori paraleli, variabila `n` ca număr de contacte folosite, căutare liniară, ștergere prin mutare și verificarea limitelor (agenda plină / goală).

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Agenda telefonică” (obligatoriu)
Scrie programul din Exemplul 16. Adaugă o opțiune nouă: „5. Câte contacte încep cu o literă dată”. (Indiciu: `nume[i][0]` este prima literă din textul `nume[i]`, de tip `char`.)

### Exercițiul B — Inventar
Doi vectori paraleli: produse și cantități. Meniu: afișează stocul, caută un produs, vinde o cantitate (se scade din stoc, doar dacă există destulă) și un raport cu produsele epuizate.

### Exercițiul C — Numere unice *(Provocare, opțional)*
Citește `n` numere (maxim 30) și afișează doar valorile care apar o singură dată.

### Exercițiul D — Eliminarea unei valori
Șterge **toate** aparițiile unei valori dintr-un vector (nu doar prima). Atenție la poziția în care continui verificarea după o ștergere.

### Exercițiul E — Inserare în ordine *(Provocare, opțional)*
Dat fiind un vector deja în ordine crescătoare, inserează o valoare nouă pe poziția corectă, astfel încât vectorul să rămână în ordine.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Căutarea folosește `-1` sau `bool` pentru „negăsit”  
- [ ] Meniul se repetă până la `0`  
- [ ] Ai tratat cazurile: agendă goală, agendă plină, contact negăsit  
- [ ] Ștergerea mută elementele corect și micșorează `n`  
- [ ] Fișierul se numește `Prenume_Nume_M2L8.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă o căutare care găsește contacte după prefixul numelui (de exemplu, toate cele care încep cu „Ma”)  
- [ ] Împiedică adăugarea a două contacte cu același nume  
- [ ] Adaugă o opțiune care modifică numărul de telefon al unui contact  
- [ ] Afișează agenda în ordine inversă  
- [ ] Verifică dacă un cuvânt citit este palindrom (se citește la fel în ambele sensuri), cu două poziții care se apropie de mijloc  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| „Negăsit” deși valoarea există | Ai pus `else gasit = false;` în buclă | Pune-o pe `false` doar înainte de buclă |
| Poziția afișată este mereu `-1` | Compari cu altceva (`=` în loc de `==`) sau cauți în vectorul greșit | `if (v[i] == x)` |
| Ai găsit valoarea, dar bucla continuă | Lipsește `break` | Adaugă `break;` după ce ai găsit |
| Citești dincolo de vector | `while (v[i] != x && i < n)` (ordinea condițiilor) | `while (i < n && v[i] != x)` |
| La ștergere dispare un element în plus | Ai uitat să micșorezi `n` sau ai mutat de la coadă | Mută de la `p` spre sfârșit, apoi `n--` |
| La inserare se pierd valori | Ai mutat de la început | Mută de la coadă spre `p` |
| `"ana"` nu găsește `"Ana"` | Literele mari și mici sunt diferite | Introdu exact aceeași formă |
| Contactele cu spații în nume se citesc greșit | `cin >>` se oprește la spațiu | Deocamdată folosești nume dintr-un singur cuvânt |

---

## Recapitulare pe scurt

- **Căutare liniară:** parcurgi elementele pe rând și compari cu valoarea căutată.
- „Există?” → un `bool gasit`, schimbat în `true` când găsești.
- „Unde?” → un `int poz = -1`, pus pe `i` când găsești, plus `break`.
- „De câte ori?” → un contor `aparitii++`.
- „Toate respectă regula?” → cauți un contraexemplu.
- Cu `while`, scrie întâi condiția pe indice: `i < n && v[i] != x`.
- **Ștergere:** muți elementele de după `p` cu o poziție la stânga (de la început), apoi `n--`.
- **Inserare:** muți elementele de la `p` cu o poziție la dreapta (de la coadă), pui valoarea, apoi `n++`.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Citește 10 numere și un număr `x`. Spune dacă `x` apare, pe ce poziții și de câte ori.  
3. Citește un vector și afișează **primul** și **ultimul** număr negativ (sau un mesaj dacă nu există).  
4. Scrie un program care citește 6 cuvinte și verifică dacă un cuvânt introdus de utilizator se află printre ele, indicând poziția.  
5. **Bonus:** modifică agenda astfel încât la ieșire să afișeze un rezumat cu numărul de contacte adăugate și al celor șterse în timpul sesiunii (două contoare noi).  
6. Salvează tot ca `Tema_M2L8_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 9
Punem vectorii **în ordine**: aflăm cum se interschimbă două valori și scriem prima noastră metodă de **sortare**.
