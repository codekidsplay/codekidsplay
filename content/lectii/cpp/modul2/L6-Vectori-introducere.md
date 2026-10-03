# LECȚIA 6 — Vectori: mai multe valori sub un singur nume
**Modulul 2 · Bucle și vectori · 2 ore**  
**Code Kids Play · Loop Master**

> Azi înveți să păstrezi **mai multe valori de același tip** într-o singură „cutie cu sertare”: un vector (în limbajul C++ clasic, un *array*). Îl citești, îl afișezi și îl modifici cu ajutorul buclelor `for`.  
> Proiect: **„Notele mele”** · fișier: `Prenume_Nume_M2L6.cpp` (ex. `Ana_Pop_M2L6.cpp`)

---

## Obiectiv
La finalul orei declari un vector, îi dai valori, îl citești de la tastatură, îl afișezi cu `for`, folosești corect indicii (de la `0`) și eviți ieșirea din vector.  
**Minim:** un vector de 5 numere, citit și afișat.  
**Ținta orei (Complet):** + modificarea elementelor și afișarea lor în ordine inversă, cu indicii verificați.

## De ce contează
Imaginează-ți că vrei să păstrezi notele a 30 de elevi. Să creezi 30 de variabile (`nota1`, `nota2`, …, `nota30`) ar fi imposibil de folosit. Un vector rezolvă problema: **o singură denumire, 30 de „sertare”**, iar bucla `for` trece prin ele.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `for` și bucle imbricate |
| 10–30 | Ce este un vector și cum se declară (**Exemplele 1–4**) |
| 30–55 | Citire și afișare cu `for` (**Exemplele 5–8**) |
| 55–80 | Modificarea elementelor, tipuri diferite (**Exemplele 9–12**) |
| 80–100 | Capacitate și număr real de elemente, siguranța indicilor (**Exemplele 13–14**) |
| 100–118 | Proiecte (**Exemplele 15–17**) |
| 118–120 | Recap și temă |

---

## 1. Ce este un vector

Un vector este un șir de variabile **de același tip**, așezate unele lângă altele în memorie și numerotate. Numărul fiecărui „sertar” se numește **indice** (sau poziție).

```
Declarare:   tip nume[dimensiune];

int nota[5];    // 5 sertare de tip int: nota[0], nota[1], nota[2], nota[3], nota[4]
```

**Foarte important:** numerotarea începe de la **0**. Un vector cu 5 elemente are indicii `0, 1, 2, 3, 4`. Ultimul indice este `dimensiune - 1`, nu `dimensiune`.

```
  indice:    0     1     2     3     4
           +-----+-----+-----+-----+-----+
  nota:    |  9  |  7  | 10  |  8  |  6  |
           +-----+-----+-----+-----+-----+
```

Accesezi un element cu paranteze drepte: `nota[2]` este elementul de pe poziția 2 (al **treilea**, pentru că numărăm de la 0).

### Exemplul 1 — De ce nu merg variabilele separate

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota1 = 9;
    int nota2 = 7;
    int nota3 = 10;

    cout << nota1 << " " << nota2 << " " << nota3 << endl;
    cout << "Suma: " << nota1 + nota2 + nota3 << endl;
    return 0;
}
```

**Ieșire:**
```
9 7 10
Suma: 26
```

Pentru 3 note merge. Pentru 30 ar trebui 30 de variabile și 30 de adunări scrise de mână. De aceea avem vectori.

### Exemplul 2 — Primul vector

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[3];

    nota[0] = 9;
    nota[1] = 7;
    nota[2] = 10;

    cout << "Prima nota: " << nota[0] << endl;
    cout << "A doua nota: " << nota[1] << endl;
    cout << "A treia nota: " << nota[2] << endl;
    return 0;
}
```

**Ieșire:**
```
Prima nota: 9
A doua nota: 7
A treia nota: 10
```

Atribuim valori fiecărui sertar în parte și le citim la fel. Observă: prima notă este `nota[0]`, nu `nota[1]`.

### Exemplul 3 — Valori date de la început

Dacă știi valorile dinainte, le scrii între acolade, la declarare:

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[5] = {9, 7, 10, 8, 6};

    for (int i = 0; i < 5; i++) {
        cout << "nota[" << i << "] = " << nota[i] << endl;
    }
    return 0;
}
```

**Ieșire:**
```
nota[0] = 9
nota[1] = 7
nota[2] = 10
nota[3] = 8
nota[4] = 6
```

Bucla `for` merge de la `0` până la `i < 5`, deci `i` ia valorile 0, 1, 2, 3, 4, exact indicii vectorului. Aceasta este bucla standard pentru parcurgerea unui vector. Reține-o!

### Exemplul 4 — Dimensiunea dintr-o constantă

În loc să scrii `5` în mai multe locuri, folosești o constantă:

```cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 5;
    int v[N] = {10, 20, 30, 40, 50};

    cout << "Primul element: " << v[0] << endl;
    cout << "Ultimul element: " << v[N - 1] << endl;
    cout << "Numar de elemente: " << N << endl;
    return 0;
}
```

**Ieșire:**
```
Primul element: 10
Ultimul element: 50
Numar de elemente: 5
```

Ultimul element se află la `v[N - 1]`. Dacă schimbi `N`, tot programul se adaptează.

**Încearcă tu (8 min)**  
- [ ] Declari un vector cu 6 numere și le afișezi cu `for`  
- [ ] Afișezi doar primul și ultimul element  
- [ ] Schimbi dimensiunea și vezi că se adaptează  

---

## 2. Citire și afișare

### Exemplul 5 — Citim 5 numere și le afișăm

```cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 5;
    int v[N];

    for (int i = 0; i < N; i++) {
        cout << "v[" << i << "] = ";
        cin >> v[i];
    }

    cout << "Ai introdus: ";
    for (int i = 0; i < N; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Rulare** (tastezi `4 8 15 16 23`):
```
v[0] = 4
v[1] = 8
v[2] = 15
v[3] = 16
v[4] = 23
Ai introdus: 4 8 15 16 23 
```

Primul `for` **citește** în vector, al doilea `for` îl **afișează**. Folosim doi `for` separați: nu poți afișa ceva ce nu a fost încă citit complet.

### Exemplul 6 — Afișare în ordine inversă

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[6] = {3, 6, 9, 12, 15, 18};

    for (int i = 5; i >= 0; i--) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
18 15 12 9 6 3 
```

Bucla numără invers, de la ultimul indice (`5`) până la `0`. Întotdeauna ultimul indice este `dimensiunea - 1`.

### Exemplul 7 — Afișare numerotată („Elevul 1, 2…”)

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[4] = {10, 8, 9, 7};

    for (int i = 0; i < 4; i++) {
        cout << "Elevul " << i + 1 << ": nota " << nota[i] << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Elevul 1: nota 10
Elevul 2: nota 8
Elevul 3: nota 9
Elevul 4: nota 7
```

Oamenii numără de la 1, iar vectorul de la 0. Când afișezi pentru utilizator, folosești `i + 1`.

### Exemplul 8 — Elementele de pe poziții pare

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[8] = {5, 10, 15, 20, 25, 30, 35, 40};

    cout << "Pozitiile 0, 2, 4, 6: ";
    for (int i = 0; i < 8; i += 2) {
        cout << v[i] << " ";
    }
    cout << endl;

    cout << "Pozitiile 1, 3, 5, 7: ";
    for (int i = 1; i < 8; i += 2) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Pozitiile 0, 2, 4, 6: 5 15 25 35 
Pozitiile 1, 3, 5, 7: 10 20 30 40 
```

Cu pasul `i += 2` sari din două în două poziții. Începi de la `0` pentru pozițiile pare sau de la `1` pentru cele impare.

**Încearcă tu (10 min)**  
- [ ] Citești 6 numere și le afișezi invers  
- [ ] Afișezi doar elementele de pe poziții impare  
- [ ] Afișezi fiecare element pe un rând nou, numerotat de la 1  

---

## 3. Modificarea elementelor și alte tipuri

### Exemplul 9 — Modificăm valorile din vector

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota[5] = {6, 7, 8, 9, 10};

    nota[0] = 7;
    nota[4] = nota[4] - 1;

    for (int i = 0; i < 5; i++) {
        cout << nota[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
7 7 8 9 9 
```

Un element de vector se comportă ca o variabilă obișnuită: îi poți atribui valori și îl poți folosi în calcule.

### Exemplul 10 — Mărim toate elementele

```cpp
#include <iostream>
using namespace std;

int main() {
    int puncte[5] = {10, 20, 30, 40, 50};

    cout << "Inainte: ";
    for (int i = 0; i < 5; i++) {
        cout << puncte[i] << " ";
    }
    cout << endl;

    for (int i = 0; i < 5; i++) {
        puncte[i] += 5;
    }

    cout << "Dupa bonus: ";
    for (int i = 0; i < 5; i++) {
        cout << puncte[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Inainte: 10 20 30 40 50 
Dupa bonus: 15 25 35 45 55 
```

Un `for` poate modifica toate elementele cu o singură linie. Ar fi nevoie de 5 linii separate fără vectori.

### Exemplul 11 — Alte tipuri: `double`, `char` și `string`

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    double temp[4] = {21.5, 23.0, 19.8, 25.2};
    char litere[3] = {'C', '+', '+'};
    string zile[3] = {"Luni", "Marti", "Miercuri"};

    for (int i = 0; i < 4; i++) {
        cout << "Temperatura " << i + 1 << ": " << temp[i] << endl;
    }

    for (int i = 0; i < 3; i++) {
        cout << litere[i];
    }
    cout << endl;

    for (int i = 0; i < 3; i++) {
        cout << zile[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Temperatura 1: 21.5
Temperatura 2: 23
Temperatura 3: 19.8
Temperatura 4: 25.2
C++
Luni Marti Miercuri 
```

Un vector poate avea orice tip: `int`, `double`, `char`, `string`. Toate elementele aceluiași vector trebuie să aibă **același** tip.

### Exemplul 12 — Un vector umplut cu formule

```cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 8;
    int patrat[N];
    long long fib[N];

    for (int i = 0; i < N; i++) {
        patrat[i] = (i + 1) * (i + 1);
    }

    fib[0] = 1;
    fib[1] = 1;
    for (int i = 2; i < N; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    cout << "Patrate: ";
    for (int i = 0; i < N; i++) {
        cout << patrat[i] << " ";
    }
    cout << endl;

    cout << "Fibonacci: ";
    for (int i = 0; i < N; i++) {
        cout << fib[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Patrate: 1 4 9 16 25 36 49 64 
Fibonacci: 1 1 2 3 5 8 13 21 
```

Valorile pot fi calculate. În șirul lui Fibonacci, fiecare element este suma celor două dinaintea lui: `fib[i - 1] + fib[i - 2]`. Un vector îți permite să te uiți „înapoi” la elementele deja calculate.

---

## 4. Capacitate, număr real de elemente și indici siguri

### Exemplul 13 — Vector mare, folosim doar o parte

De multe ori nu știi dinainte câte valori vor fi. Declari un vector cu **capacitate** mare și ții minte într-o variabilă câte elemente ai folosit.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[100];
    int n;

    cout << "Cate numere (maxim 100)? ";
    cin >> n;

    if (n < 1 || n > 100) {
        cout << "Numar invalid." << endl;
        return 0;
    }

    for (int i = 0; i < n; i++) {
        cout << "v[" << i << "] = ";
        cin >> v[i];
    }

    cout << "Numerele in ordine inversa: ";
    for (int i = n - 1; i >= 0; i--) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Rulare** (tastezi `4`, apoi `10 20 30 40`):
```
Cate numere (maxim 100)? 4
v[0] = 10
v[1] = 20
v[2] = 30
v[3] = 40
Numerele in ordine inversa: 40 30 20 10 
```

Vectorul are 100 de locuri, dar folosim doar primele `n`. Verificăm `n` înainte de a citi, ca să nu depășim capacitatea.

### Exemplul 14 — Nu ieși din vector!

Cu un vector de 5 elemente, indicii valizi sunt `0–4`. Dacă folosești `v[5]` sau `v[-1]`, ajungi în memorie care **nu îți aparține**. C++ nu te oprește: programul poate afișa valori ciudate, se poate bloca sau poate părea că merge (ceea ce e și mai periculos).

Soluția: verifici indicele înainte să-l folosești.

```cpp
#include <iostream>
using namespace std;

int main() {
    int v[5] = {11, 22, 33, 44, 55};
    int poz;

    cout << "Ce pozitie vrei sa vezi (0-4)? ";
    cin >> poz;

    if (poz >= 0 && poz < 5) {
        cout << "v[" << poz << "] = " << v[poz] << endl;
    } else {
        cout << "Pozitie invalida! Indicii sunt intre 0 si 4." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `2`):
```
Ce pozitie vrei sa vezi (0-4)? 2
v[2] = 33
```

**Rulare** (tastezi `7`):
```
Ce pozitie vrei sa vezi (0-4)? 7
Pozitie invalida! Indicii sunt intre 0 si 4.
```

Regula: pentru un vector cu `n` elemente, indicele este valid doar dacă `0 <= indice < n`. Aceasta este una dintre cele mai frecvente surse de erori la programatori, inclusiv la cei experimentați.

**Încearcă tu (10 min)**  
- [ ] Citești `n` și apoi `n` numere, cu `n` verificat  
- [ ] Ceri utilizatorului o poziție și afișezi elementul doar dacă poziția e validă  
- [ ] Umpli un vector cu primele 10 numere pare  

---

## 5. Proiecte

### Exemplul 15 — Ziua săptămânii după număr

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string zile[7] = {"Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"};
    int nr;

    cout << "Numarul zilei (1-7): ";
    cin >> nr;

    if (nr >= 1 && nr <= 7) {
        cout << "Ziua " << nr << " este " << zile[nr - 1] << "." << endl;
    } else {
        cout << "Numar invalid." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `4`):
```
Numarul zilei (1-7): 4
Ziua 4 este Joi.
```

Utilizatorul numără de la 1, vectorul de la 0, deci folosim `zile[nr - 1]`. Un vector este foarte potrivit ca „tabel de căutare”: numărul ales îți dă direct răspunsul, fără `switch` cu șapte cazuri.

### Exemplul 16 — Inversăm vectorul pe loc

Interschimbăm primul element cu ultimul, al doilea cu penultimul etc. Pentru a schimba două valori avem nevoie de o variabilă ajutătoare.

```cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 6;
    int v[N] = {1, 2, 3, 4, 5, 6};

    for (int i = 0; i < N / 2; i++) {
        int aux = v[i];
        v[i] = v[N - 1 - i];
        v[N - 1 - i] = aux;
    }

    for (int i = 0; i < N; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
6 5 4 3 2 1 
```

Bucla merge doar până la jumătate (`N / 2`); dacă ar merge până la capăt, ar „inversa” vectorul de două ori și l-ar readuce la forma inițială. Variabila `aux` păstrează temporar o valoare, ca să nu o pierzi când o suprascrii.

### Exemplul 17 — „Notele mele” (mini-proiect)

```cpp
/*
   Program: Notele mele
   Scop:    citeste notele la 5 materii si le afiseaza
            intr-un tabel, apoi mareste nota de la o materie
*/
#include <iostream>
#include <string>
using namespace std;

int main() {
    const int N = 5;
    string materie[N] = {"Romana", "Matematica", "Engleza", "Informatica", "Sport"};
    int nota[N];

    for (int i = 0; i < N; i++) {
        do {
            cout << "Nota la " << materie[i] << " (1-10): ";
            cin >> nota[i];
        } while (nota[i] < 1 || nota[i] > 10);
    }

    cout << endl << "--- Catalog ---" << endl;
    for (int i = 0; i < N; i++) {
        cout << i + 1 << ". " << materie[i] << ": " << nota[i] << endl;
    }

    int ales;
    cout << endl << "Ce materie vrei sa corectezi (1-" << N << ")? ";
    cin >> ales;

    if (ales >= 1 && ales <= N) {
        cout << "Noua nota la " << materie[ales - 1] << ": ";
        cin >> nota[ales - 1];
        cout << materie[ales - 1] << " are acum nota " << nota[ales - 1] << "." << endl;
    } else {
        cout << "Materie inexistenta." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `9 12 8 10 10 7`, apoi `3` și `9`):
```
Nota la Romana (1-10): 9
Nota la Matematica (1-10): 12
Nota la Matematica (1-10): 8
Nota la Engleza (1-10): 10
Nota la Informatica (1-10): 10
Nota la Sport (1-10): 7

--- Catalog ---
1. Romana: 9
2. Matematica: 8
3. Engleza: 10
4. Informatica: 10
5. Sport: 7

Ce materie vrei sa corectezi (1-5)? 3
Noua nota la Engleza: 9
Engleza are acum nota 9.
```

Observă cum se combină tot ce ai învățat: doi vectori paraleli (`materie` și `nota`, cu aceleași indici), un `for` cu un `do-while` în interior pentru validare, afișare numerotată cu `i + 1` și verificarea indicelui înainte de modificare. La notele introduse, `12` a fost respins și s-a cerut din nou.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Notele mele” (obligatoriu)
Scrie programul din Exemplul 17, dar cu materiile tale. Adaugă o a șasea materie.

### Exercițiul B — Temperaturi
Citește 7 temperaturi (una pe zi) într-un vector de `double` și afișează-le numerotate, cu numele zilei din vectorul `zile` (ca la Exemplul 15).

### Exercițiul C — Vector cu formulă
Umple un vector cu primii 10 multipli ai lui 3 (`3, 6, 9, …, 30`) și afișează-l.

### Exercițiul D — Inversare
Citește `n` numere (maxim 50) și afișează-le în ordine inversă, apoi inversează vectorul pe loc (ca la Exemplul 16) și afișează-l din nou, în ordine normală.

### Exercițiul E — Prima și ultima
Citește `n` numere și afișează: primul, ultimul, al doilea, penultimul. Dacă `n < 4`, afișează un mesaj de eroare.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Folosești un vector cu dimensiune dată printr-o constantă  
- [ ] Citirea și afișarea se fac cu `for`  
- [ ] Indicii pornesc de la `0` și nu depășesc `dimensiune - 1`  
- [ ] Ai verificat indicele ales de utilizator  
- [ ] Fișierul se numește `Prenume_Nume_M2L6.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Citește 10 numere și afișează separat cele de pe poziții pare și cele de pe poziții impare  
- [ ] Umple un vector cu cifrele numărului `4721` (folosind `% 10` și `/ 10`) și afișează-l în ordine corectă  
- [ ] Rotește vectorul cu o poziție la stânga: `{1,2,3,4,5}` devine `{2,3,4,5,1}`  
- [ ] Interschimbă primul cu ultimul element, fără să parcurgi tot vectorul  
- [ ] Citește un cuvânt (`string`) și afișează literele lui câte una pe rând, numerotate, folosind `cuvant[i]` și `cuvant.length()`  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Valori ciudate (de ex. `-1245367`) | Ai afișat elemente la care nu ai atribuit nimic | Inițializează vectorul sau citește-l înainte |
| Ultimul element nu se afișează | `i < N - 1` în loc de `i < N` | `for (i = 0; i < N; i++)` |
| Programul se blochează sau afișează gunoi | Ai folosit `v[N]` (un indice în afara vectorului) | Ultimul indice este `N - 1` |
| Prima notă „lipsește” | Ai început de la `1` în loc de `0` | `for (int i = 0; …)` |
| `int v[n];` cu `n` citit de la tastatură | Dimensiunea trebuie să fie cunoscută la compilare | Folosești `const int N` sau o capacitate mare (ex. 100) |
| Eroare `invalid types … for array subscript` | Ai pus un indice de tip `double` sau text | Indicele trebuie să fie `int` |
| Ai copiat vectorul cu `b = a;` | Vectorii nu se copiază așa | Copiezi element cu element, într-un `for` |
| Elemente cu tipuri amestecate | Un vector are un singur tip | Folosești vectori separați |

---

## Recapitulare pe scurt

- Un vector este un șir de variabile de același tip, sub un singur nume: `tip nume[N];`
- Indicii sunt de la **0** la **N − 1**. Primul element este `v[0]`, ultimul `v[N - 1]`.
- Parcurgerea standard: `for (int i = 0; i < N; i++) { … v[i] … }`
- Poți da valori la declarare: `int v[3] = {5, 6, 7};`
- Citire: `cin >> v[i];` într-un `for`. Afișare: `cout << v[i];` într-un `for`.
- Un element se folosește ca orice variabilă: `v[2] = 10;`, `v[i] += 5;`
- Dacă nu știi câte elemente vor fi, declari o capacitate mare și ții minte câte folosești (`n`).
- Verifică **mereu** indicii: `0 <= indice < n`.

---

## Temă
1. Refă **Exemplele 1–17** pe calculatorul tău.  
2. Citește 10 numere într-un vector și afișează-le: o dată pe un singur rând, o dată câte unul pe rând, numerotate.  
3. Umple un vector de 12 elemente cu numărul de zile ale fiecărei luni (31, 28, 31, …) și afișează „Luna 3 are 31 de zile” pentru o lună aleasă de utilizator (cu verificare).  
4. Scrie un program care citește 5 prețuri (`double`) și le afișează, apoi aplică o reducere de 10% fiecărui preț și afișează noile prețuri.  
5. **Bonus:** umple un vector cu primele 15 numere din șirul lui Fibonacci și afișează-le câte 5 pe rând (folosește `if (…%5==0)` pentru a trece pe rând nou).  
6. Salvează tot ca `Tema_M2L6_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 7
Facem calcule cu vectori: **suma, media, minimul și maximul** unui șir de note, adică exact ce face un catalog.
