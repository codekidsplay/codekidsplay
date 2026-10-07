# LECȚIA 8 — Numere aleatoare cu `rand()`
**Modulul 3 · Funcții, string, algoritmi · 2 ore**  
**Code Maker Club · Problem Solver**

> Azi faci programele **imprevizibile**: un zar virtual, o monedă care se învârte, un număr secret de ghicit, o parolă generată la întâmplare. Fără numere aleatoare nu există jocuri interesante.  
> Proiect: **„Duelul de zaruri”** · fișier: `Prenume_Nume_M3L8.cpp` (ex. `Ana_Pop_M3L8.cpp`)

---

## Obiectiv
La finalul orei folosești `rand()` și `srand(time(0))`, generezi numere într-un interval ales, simulezi un zar și o monedă, alegi un element la întâmplare dintr-un vector, amesteci un vector și construiești un joc simplu cu un adversar „calculator”.  
**Minim:** un zar virtual care dă numere între 1 și 6, diferite la fiecare rulare.  
**Ținta orei (Complet):** + un joc „ghicește numărul secret” și duelul de zaruri.

## De ce contează
Fără întâmplare, un joc ar fi mereu la fel: același zar, aceleași cărți, același inamic. Numerele aleatoare apar în jocuri, simulări științifice, teste, loterii și securitate. Azi înveți metoda clasică din C++ și, la final, afli ce se folosește în programele profesionale.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: funcții cu `return` |
| 10–30 | `rand()`, `srand` și de ce avem nevoie de ele (**Exemplele 1–2**) |
| 30–55 | Numere într-un interval: zar, monedă (**Exemplele 3–6**) |
| 55–75 | Statistici, litere și alegeri aleatoare (**Exemplele 7–10**) |
| 75–100 | Jocul „ghicește numărul”, amestecarea unui vector (**Exemplele 11–13**) |
| 100–118 | Proiecte (**Exemplele 14–16**) |
| 118–120 | Recap și temă |

> **Atenție la rezultatele din lecție.** Rezultatele unui program cu numere aleatoare **diferă la fiecare rulare**. Ieșirile afișate aici sunt doar *exemple*; la tine vor apărea alte valori. Important este ca ele să respecte regulile programului (de exemplu, un zar să dea numai valori de la 1 la 6).

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. `rand()` și `srand()`

Funcția `rand()` (din `<cstdlib>`) returnează un număr întreg „aleator” între `0` și o valoare foarte mare (`RAND_MAX`, cel puțin 32767).

De fapt, numerele sunt generate printr-o formulă matematică; de aceea se numesc *pseudo-aleatoare*: par întâmplătoare, dar pornesc dintr-o valoare inițială numită **sămânță** (*seed*). Aceeași sămânță dă mereu aceeași secvență.

- `srand(valoare);` stabilește sămânța (se apelează **o singură dată**, la începutul programului);
- `srand(time(0));` folosește ora curentă (în secunde) ca sămânță, deci la fiecare rulare altă secvență (`time` este în `<ctime>`).

### Exemplul 1 — `rand()` fără `srand` **[Esențial]**

```cpp
#include <iostream>
#include <cstdlib>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        cout << rand() << endl;
    }
    return 0;
}
```

**Exemplu de ieșire (pe calculatorul tău numerele pot fi altele, dar vor fi aceleași la fiecare rulare):**
```
16807
282475249
1622650073
984943658
1144108930
```

Rulează programul de mai multe ori: de fiecare dată obții **aceleași** numere. Fără sămânță, secvența pornește mereu din același loc. Pentru un joc, aceasta nu e bine.

### Exemplul 2 — `srand(time(0))`: de fiecare dată altceva **[Esențial]**

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));

    for (int i = 0; i < 5; i++) {
        cout << rand() << endl;
    }
    return 0;
}
```

**Exemplu de ieșire (la fiecare rulare, alte valori):**
```
453129870
776712828
1806893730
896667883
1404358582
```

Linia `srand(time(0));` se pune **o singură dată**, la începutul lui `main`. Dacă ai pune-o într-o buclă sau într-o funcție apelată des, în aceeași secundă ai primi mereu aceleași numere (pentru că `time(0)` nu s-a schimbat).

**Încearcă tu (6 min)**  
- [ ] Rulezi Exemplul 1 de trei ori și compari rezultatele  
- [ ] Rulezi Exemplul 2 de trei ori, cu pauză de o secundă între rulări  
- [ ] Muți `srand(time(0));` în interiorul buclei și observi ce se întâmplă  

---

## 2. Numere într-un interval: zaruri și monede

Numerele mari din `rand()` nu sunt utile direct. Vrem, de exemplu, numere de la 1 la 6. Aici ne ajută operatorul `%` (restul împărțirii):

| Expresie | Valori posibile |
|----------|-----------------|
| `rand() % 6` | `0, 1, 2, 3, 4, 5` |
| `rand() % 6 + 1` | `1, 2, 3, 4, 5, 6` (un zar) |
| `rand() % 2` | `0, 1` (o monedă) |

Formula generală pentru un număr între `a` și `b` (inclusiv):

```
a + rand() % (b - a + 1)
```

De exemplu, pentru un număr între 10 și 20: `10 + rand() % 11`.

### Exemplul 3 — Un zar virtual **[Esențial]**

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));

    int zar = rand() % 6 + 1;
    cout << "Ai aruncat zarul: " << zar << endl;
    return 0;
}
```

**Exemplu de ieșire:**
```
Ai aruncat zarul: 1
```

### Exemplul 4 — Funcție `intre(a, b)` **[Esențial]**

Folosim formula de mai des, deci o punem într-o funcție:

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int intre(int a, int b) {
    return a + rand() % (b - a + 1);
}

int main() {
    srand(time(0));

    cout << "Zar (1-6): " << intre(1, 6) << endl;
    cout << "Numar intre 10 si 20: " << intre(10, 20) << endl;
    cout << "Temperatura intre -5 si 5: " << intre(-5, 5) << endl;
    cout << "Procent (0-100): " << intre(0, 100) << endl;
    return 0;
}
```

**Exemplu de ieșire:**
```
Zar (1-6): 2
Numar intre 10 si 20: 12
Temperatura intre -5 si 5: -2
Procent (0-100): 24
```

Funcția `intre(a, b)` poate fi copiată în orice program cu numere aleatoare. Apelezi `srand` o singură dată, în `main`, nu în funcție.

### Exemplul 5 — Aruncăm zarul de 10 ori **[Esențial]**

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int zar() {
    return rand() % 6 + 1;
}

int main() {
    srand(time(0));

    int suma = 0;
    cout << "Aruncari: ";
    for (int i = 0; i < 10; i++) {
        int z = zar();
        cout << z << " ";
        suma += z;
    }
    cout << endl << "Suma: " << suma << endl;
    cout << "Media: " << suma / 10.0 << endl;
    return 0;
}
```

**Exemplu de ieșire:**
```
Aruncari: 3 3 3 5 6 4 2 5 3 2 
Suma: 36
Media: 3.6
```

La un zar corect, media se apropie de `3.5` (valoarea medie a numerelor de la 1 la 6) cu cât faci mai multe aruncări.

### Exemplul 6 — Moneda: cap sau pajură

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

string moneda() {
    if (rand() % 2 == 0) {
        return "cap";
    }
    return "pajura";
}

int main() {
    srand(time(0));

    int cap = 0;
    int pajura = 0;

    for (int i = 0; i < 20; i++) {
        string rezultat = moneda();
        cout << rezultat << " ";
        if (rezultat == "cap") {
            cap++;
        } else {
            pajura++;
        }
    }
    cout << endl << "Cap: " << cap << ", pajura: " << pajura << endl;
    return 0;
}
```

**Exemplu de ieșire:**
```
cap cap cap cap pajura pajura pajura cap cap pajura pajura pajura cap pajura cap cap pajura pajura cap cap 
Cap: 11, pajura: 9
```

Nu te aștepta la exact 10 și 10; în 20 de aruncări diferențe mici sunt normale.

**Încearcă tu (8 min)**  
- [ ] Simulezi aruncarea a două zaruri și afișezi suma  
- [ ] Generezi 5 numere între 50 și 60  
- [ ] Numeri de câte ori iese „cap” în 100 de aruncări  

---

## 3. Statistici, litere și alegeri aleatoare

### Exemplul 7 — Zarul este corect? Numărăm fiecare față

Aruncăm zarul de 6000 de ori și numărăm cât de des iese fiecare față, cu un vector de contoare (ca la frecvența literelor, lecția 5).

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));

    int frecv[7] = {0};
    const int ARUNCARI = 6000;

    for (int i = 0; i < ARUNCARI; i++) {
        int z = rand() % 6 + 1;
        frecv[z]++;
    }

    for (int fata = 1; fata <= 6; fata++) {
        cout << "Fata " << fata << ": " << frecv[fata] << " ori" << endl;
    }
    return 0;
}
```

**Exemplu de ieșire (fiecare față apare de aproximativ 1000 de ori):**
```
Fata 1: 1033 ori
Fata 2: 965 ori
Fata 3: 1007 ori
Fata 4: 983 ori
Fata 5: 1011 ori
Fata 6: 1001 ori
```

Valoarea aruncată devine **indice** în vector (`frecv[z]++`), tehnica din Modulul 2. Un zar bun va da, pentru fiecare față, valori apropiate de 1000.

### Exemplul 8 — Numere zecimale între 0 și 1

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

double aleatorZecimal() {
    return rand() / (RAND_MAX + 1.0);
}

int main() {
    srand(time(0));

    for (int i = 0; i < 5; i++) {
        cout << aleatorZecimal() << endl;
    }

    double temperatura = 15 + aleatorZecimal() * 10;
    cout << "Temperatura intre 15 si 25: " << temperatura << endl;
    return 0;
}
```

**Exemplu de ieșire:**
```
0.211029
0.756298
0.108216
0.793494
0.252257
Temperatura intre 15 si 25: 21.8571
```

Prin împărțirea la `RAND_MAX + 1.0` obținem un număr de la `0` (inclusiv) la `1` (exclus). Îl poți scala: `15 + aleatorZecimal() * 10` este între 15 și 25.

### Exemplul 9 — Litere și cuvinte aleatoare

Literele au coduri consecutive (lecția 5), deci o literă aleatoare este `'a' + rand() % 26`.

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

char literaAleatoare() {
    return 'a' + rand() % 26;
}

string cuvantAleator(int lungime) {
    string cuvant = "";
    for (int i = 0; i < lungime; i++) {
        cuvant += literaAleatoare();
    }
    return cuvant;
}

int main() {
    srand(time(0));

    for (int i = 0; i < 5; i++) {
        cout << cuvantAleator(6) << endl;
    }
    return 0;
}
```

**Exemplu de ieșire:**
```
qyvbir
nbdfzi
ybsfcv
zooimz
jlqhkt
```

### Exemplul 10 — Alegem un element la întâmplare

Pentru un vector cu `n` elemente, un indice aleator este `rand() % n`.

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));

    string sfaturi[5] = {
        "Testeaza programul cu valori diferite.",
        "Citeste cu atentie mesajele de eroare.",
        "Imparte problema in functii mici.",
        "Fa pauze si bea apa.",
        "Greselile sunt parte din invatare."
    };

    int index = rand() % 5;
    cout << "Sfatul zilei: " << sfaturi[index] << endl;

    string culori[4] = {"rosu", "verde", "albastru", "galben"};
    cout << "Culoarea norocoasa: " << culori[rand() % 4] << endl;
    return 0;
}
```

**Exemplu de ieșire:**
```
Sfatul zilei: Fa pauze si bea apa.
Culoarea norocoasa: rosu
```

Această tehnică stă în spatele „sfatului zilei”, al unui mesaj aleator sau al unei cărți extrase dintr-un pachet.

**Încearcă tu (10 min)**  
- [ ] Aruncă două zaruri de 1000 de ori și numără de câte ori iese suma 7  
- [ ] Adaugă 3 sfaturi proprii în vectorul din Exemplul 10  
- [ ] Generează un cuvânt aleator de 8 litere mari (`'A' + rand() % 26`)  

---

## 4. Jocul „ghicește numărul” și amestecarea unui vector

### Exemplul 11 — Calculatorul alege, tu ghicești **[Esențial]**

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));

    int secret = rand() % 100 + 1;
    int incercare;
    int incercari = 0;

    cout << "M-am gandit la un numar intre 1 si 100. Ghiceste-l!" << endl;

    do {
        cout << "Incercarea ta: ";
        cin >> incercare;
        incercari++;

        if (incercare < secret) {
            cout << "Prea mic!" << endl;
        } else if (incercare > secret) {
            cout << "Prea mare!" << endl;
        }
    } while (incercare != secret);

    cout << "Bravo! Ai ghicit din " << incercari << " incercari." << endl;
    return 0;
}
```

**Exemplu de rulare** (strategia „mijlocul intervalului”; numărul secret diferă la fiecare joc):
```
M-am gandit la un numar intre 1 si 100. Ghiceste-l!
Incercarea ta: 50
Prea mare!
Incercarea ta: 25
Prea mare!
Incercarea ta: 12
Prea mare!
Incercarea ta: 6
Prea mare!
Incercarea ta: 3
Prea mic!
Incercarea ta: 4
Bravo! Ai ghicit din 6 incercari.
```

Comparat cu jocul din Modulul 2, numărul secret nu mai este fixat în cod: se schimbă la fiecare joc. Strategia cea mai bună: încerci mereu mijlocul intervalului rămas (50, apoi 25 sau 75 etc.); în maximum 7 încercări găsești orice număr între 1 și 100.

### Exemplul 12 — Amestecăm un vector (algoritmul Fisher–Yates)

Pentru a amesteca, parcurgem vectorul de la coadă către început: pentru fiecare poziție `i`, alegem la întâmplare o poziție `j` de la `0` la `i` și interschimbăm `v[i]` cu `v[j]`.

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

void amesteca(int v[], int n) {
    for (int i = n - 1; i > 0; i--) {
        int j = rand() % (i + 1);
        int aux = v[i];
        v[i] = v[j];
        v[j] = aux;
    }
}

void afiseaza(int v[], int n) {
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
}

int main() {
    srand(time(0));

    int carti[10];
    for (int i = 0; i < 10; i++) {
        carti[i] = i + 1;
    }

    cout << "Inainte: ";
    afiseaza(carti, 10);

    amesteca(carti, 10);
    cout << "Amestecat: ";
    afiseaza(carti, 10);
    return 0;
}
```

**Exemplu de ieșire:**
```
Inainte: 1 2 3 4 5 6 7 8 9 10 
Amestecat: 5 9 3 10 1 8 7 4 2 6 
```

Fiecare număr apare în rezultat o singură dată, doar că într-o altă ordine. Așa se amestecă un pachet de cărți într-un joc. Funcția folosește interschimbarea din Modulul 2.

### Exemplul 13 — Un PIN aleator de 4 cifre

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

string genereazaPin(int lungime) {
    string pin = "";
    for (int i = 0; i < lungime; i++) {
        pin += (char)('0' + rand() % 10);
    }
    return pin;
}

int main() {
    srand(time(0));

    cout << "PIN nou: " << genereazaPin(4) << endl;
    cout << "Cod mai lung: " << genereazaPin(8) << endl;
    return 0;
}
```

**Exemplu de ieșire:**
```
PIN nou: 5679
Cod mai lung: 10127362
```

Cifra aleatoare `rand() % 10` devine caracter prin `'0' + cifra` (lecția 5), apoi se lipește la text.

---

## 5. Proiecte

### Exemplul 14 — Piatră, foarfecă, hârtie **[Esențial]**

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

string nume(int alegere) {
    if (alegere == 1) return "piatra";
    if (alegere == 2) return "foarfeca";
    return "hartie";
}

int main() {
    srand(time(0));

    int tu;
    cout << "1 = piatra, 2 = foarfeca, 3 = hartie" << endl;
    do {
        cout << "Alegerea ta: ";
        cin >> tu;
    } while (tu < 1 || tu > 3);

    int calculator = rand() % 3 + 1;
    cout << "Tu: " << nume(tu) << ", calculatorul: " << nume(calculator) << endl;

    if (tu == calculator) {
        cout << "Egalitate!" << endl;
    } else if ((tu == 1 && calculator == 2) ||
               (tu == 2 && calculator == 3) ||
               (tu == 3 && calculator == 1)) {
        cout << "Ai castigat!" << endl;
    } else {
        cout << "Calculatorul a castigat." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `2`, la alegere):
```
1 = piatra, 2 = foarfeca, 3 = hartie
Alegerea ta: 2
Tu: foarfeca, calculatorul: piatra
Calculatorul a castigat.
```

Regulile câștigului sunt în cele trei perechi din `if`: piatra bate foarfeca, foarfeca bate hârtia, hârtia bate piatra. Ai folosit funcții, `rand`, validare cu `do-while` și operatori logici.

### Exemplul 15 — Estimăm numărul π cu numere aleatoare

Aruncăm la întâmplare puncte într-un pătrat cu latura 1. Dacă punctul cade în sfertul de cerc cu raza 1, `x² + y² ≤ 1`. Raportul punctelor din cerc la total tinde către `π / 4`.

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

double aleatorZecimal() {
    return rand() / (RAND_MAX + 1.0);
}

int main() {
    srand(time(0));

    const int PUNCTE = 1000000;
    int inCerc = 0;

    for (int i = 0; i < PUNCTE; i++) {
        double x = aleatorZecimal();
        double y = aleatorZecimal();
        if (x * x + y * y <= 1) {
            inCerc++;
        }
    }

    cout << "Puncte in cerc: " << inCerc << " din " << PUNCTE << endl;
    cout << "Estimare pentru pi: " << 4.0 * inCerc / PUNCTE << endl;
    return 0;
}
```

**Exemplu de ieșire (valoarea exactă este 3.14159…):**
```
Puncte in cerc: 785410 din 1000000
Estimare pentru pi: 3.14164
```

Metoda se numește **Monte Carlo** și este folosită în știință pentru probleme greu de rezolvat cu formule. Cu mai multe puncte, estimarea devine mai precisă.

### Exemplul 16 — „Duelul de zaruri” (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Duelul de zaruri
   Scop:    jucatorul si calculatorul arunca fiecare cate doua zaruri,
            in 5 runde; cine are suma mai mare castiga runda
*/
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

int zar() {
    return rand() % 6 + 1;
}

int main() {
    srand(time(0));

    string nume;
    cout << "Cum te cheama? ";
    cin >> nume;

    int scorJucator = 0;
    int scorCalculator = 0;

    for (int runda = 1; runda <= 5; runda++) {
        cout << endl << "--- Runda " << runda << " ---" << endl;
        cout << "Apasa 1 si Enter pentru a arunca zarurile: ";
        int dummy;
        cin >> dummy;

        int a = zar(), b = zar();
        int c = zar(), d = zar();
        int sumaJucator = a + b;
        int sumaCalculator = c + d;

        cout << nume << ": " << a << " + " << b << " = " << sumaJucator << endl;
        cout << "Calculator: " << c << " + " << d << " = " << sumaCalculator << endl;

        if (sumaJucator > sumaCalculator) {
            cout << "Runda este a ta!" << endl;
            scorJucator++;
        } else if (sumaJucator < sumaCalculator) {
            cout << "Runda este a calculatorului." << endl;
            scorCalculator++;
        } else {
            cout << "Egalitate, nimeni nu primeste punct." << endl;
        }
    }

    cout << endl << "===== SCOR FINAL =====" << endl;
    cout << nume << ": " << scorJucator << endl;
    cout << "Calculator: " << scorCalculator << endl;

    if (scorJucator > scorCalculator) {
        cout << "Felicitari, " << nume << "! Ai castigat duelul!" << endl;
    } else if (scorJucator < scorCalculator) {
        cout << "Calculatorul a castigat. Mai incearca!" << endl;
    } else {
        cout << "Meci egal!" << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `Ana`, apoi de cinci ori `1`):
```
Cum te cheama? Ana

--- Runda 1 ---
Apasa 1 si Enter pentru a arunca zarurile: 1
Ana: 3 + 2 = 5
Calculator: 5 + 2 = 7
Runda este a calculatorului.

--- Runda 2 ---
Apasa 1 si Enter pentru a arunca zarurile: 1
Ana: 3 + 3 = 6
Calculator: 1 + 1 = 2
Runda este a ta!

--- Runda 3 ---
Apasa 1 si Enter pentru a arunca zarurile: 1
Ana: 5 + 2 = 7
Calculator: 4 + 3 = 7
Egalitate, nimeni nu primeste punct.

--- Runda 4 ---
Apasa 1 si Enter pentru a arunca zarurile: 1
Ana: 2 + 6 = 8
Calculator: 3 + 4 = 7
Runda este a ta!

--- Runda 5 ---
Apasa 1 si Enter pentru a arunca zarurile: 1
Ana: 4 + 6 = 10
Calculator: 2 + 5 = 7
Runda este a ta!

===== SCOR FINAL =====
Ana: 3
Calculator: 1
Felicitari, Ana! Ai castigat duelul!
```

Observă cum funcția `zar()` păstrează codul curat: fiecare aruncare este un apel. Comanda `cin >> dummy` este doar o pauză între runde: programul așteaptă să tastezi un număr.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Duelul de zaruri” (obligatoriu)
Scrie programul din Exemplul 16. Adaugă: la egalitate, runda se repetă; la final se afișează câte runde ai câștigat din total.

### Exercițiul B — Jocul „ghicește numărul” îmbunătățit
Pornind de la Exemplul 11: limitează jucătorul la 7 încercări; la final spune dacă a pierdut și care era numărul. Adaugă întrebarea „Mai vrei să joci?” (d/n).

### Exercițiul C — Loteria
Alege 6 numere distincte între 1 și 49 (nu se pot repeta!) și afișează-le sortate. (Indiciu: generezi un număr și verifici într-un vector dacă a mai apărut, sau folosești `amesteca` pe numerele de la 1 la 49 și iei primele 6.)

### Exercițiul D — Generator de nume
Construiește nume de personaje din silabe aleatoare, de exemplu din vectorul `{"ka", "ri", "mo", "tu", "ze", "la"}`: alege 3 silabe și lipește-le (prima cu literă mare).

### Exercițiul E — Statistica a două zaruri
Aruncă două zaruri de 10000 de ori și numără de câte ori iese fiecare sumă de la 2 la 12. Care sumă este cea mai frecventă și de ce?

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] `srand(time(0));` este apelat **o singură dată**, în `main`  
- [ ] Ai o funcție `intre(a, b)` sau `zar()`  
- [ ] Intervalele sunt corecte (zarul dă 1–6, nu 0–5 și nu 1–7)  
- [ ] Ai rulat programul de mai multe ori și rezultatele diferă  
- [ ] Fișierul se numește `Prenume_Nume_M3L8.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Joc „Craps”: arunci două zaruri; 7 sau 11 la prima aruncare înseamnă victorie, 2, 3 sau 12 înseamnă înfrângere; altfel tot arunci până obții din nou aceeași sumă (victorie) sau 7 (înfrângere)  
- [ ] Simulează un „mini-RPG”: un monstru cu 20 de puncte de viață; jucătorul și monstrul lovesc pe rând cu zaruri (1–6), până când unul are viața ≤ 0  
- [ ] Generează o hartă de 5 × 10 caractere, cu `#` (obstacol) pe 20% dintre poziții și `.` în rest  
- [ ] Simulează 1000 de „zile” cu o probabilitate de ploaie de 30% și numără zilele ploioase  
- [ ] Citește despre biblioteca `<random>` din C++ modern (`mt19937`, `uniform_int_distribution`) și încearcă să refaci zarul cu ea  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Aceleași numere la fiecare rulare | Lipsește `srand` | `srand(time(0));` la începutul lui `main` |
| Același număr de mai multe ori la rând | `srand(time(0))` este apelat în buclă sau în funcție | O singură dată, la începutul programului |
| `error: 'time' was not declared` | Lipsește biblioteca | `#include <ctime>` |
| `error: 'rand' was not declared` | Lipsește biblioteca | `#include <cstdlib>` |
| Zarul dă 0 sau 7 | Interval greșit | `rand() % 6 + 1` |
| Numerele nu sunt în intervalul dorit | Formula este greșită | `a + rand() % (b - a + 1)` |
| `rand() % 0` oprește programul | Împărțire la zero (de exemplu `n` = 0) | Verifică dacă `n > 0` |
| Nu se simte „aleator” | Rulezi de două ori în aceeași secundă | Așteaptă o secundă sau folosește o sămânță citită de la utilizator |

---

## Recapitulare pe scurt

- `rand()` (din `<cstdlib>`) dă un număr întreg pseudo-aleator mare.
- `srand(time(0));` (cu `<ctime>`) pornește generatorul din ora curentă; se apelează **o singură dată**, la începutul lui `main`.
- Interval: `a + rand() % (b - a + 1)`. Zar: `rand() % 6 + 1`. Monedă: `rand() % 2`.
- Număr zecimal în `[0, 1)`: `rand() / (RAND_MAX + 1.0)`.
- Element aleator dintr-un vector cu `n` elemente: `v[rand() % n]`.
- Amestecare: parcurgi de la coadă și interschimbi `v[i]` cu `v[rand() % (i + 1)]`.
- Rezultatele diferă la fiecare rulare; verifici **regulile** (intervalele), nu valorile exacte.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău și rulează fiecare program de mai multe ori.  
2. Scrie un program „Zar de joc de rol” care citește ce zar vrea utilizatorul (d4, d6, d8, d10, d12, d20) și îl aruncă de câte ori cere.  
3. Scrie un program care generează 10 note aleatoare între 1 și 10 într-un vector, apoi afișează: notele, media, minimul, maximul și numărul notelor de 10.  
4. Scrie un joc „Aruncă cât mai aproape de 21”: pe rând, jucătorul poate arunca un zar de câte ori vrea; suma nu trebuie să depășească 21. Dacă o depășește, pierde.  
5. **Bonus:** scrie un program care generează un „cod secret” de 4 cifre diferite, iar jucătorul încearcă să-l ghicească; după fiecare încercare afișezi câte cifre sunt la locul lor (jocul „Mastermind” simplificat).  
6. Salvează tot ca `Tema_M3L8_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 9
Învățăm să **găsim și să reparăm erori** în programe: citim mesajele compilatorului, folosim afișări de control, urmărim variabilele și scriem cod curat, cu nume clare și indentare corectă.
