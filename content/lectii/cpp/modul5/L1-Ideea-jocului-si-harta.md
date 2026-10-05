# LECȚIA 1 — Ideea jocului și harta
**Modulul 5 · Proiect RPG în consolă · 2 ore**  
**Code Kids Play · RPG Creator**

> Începem cea mai frumoasă parte a cursului: **ne facem propriul joc**. Un RPG (*role-playing game*, „joc de aventură în care joci un rol”) are un erou, camere de explorat, obiecte de găsit, monștri de învins și o comoară de câștigat. În următoarele 10 lecții construim, pas cu pas, jocul **„Castelul Uitat”**, în consolă, fără grafică. Azi punem bazele: povestea, meniul principal și **harta castelului desenată din text**.  
> Proiect: **„Joc_L41.cpp”** · la sfârșitul fiecărei lecții jocul **rulează** într-o versiune nouă.

---

## Obiectiv
La finalul orei ai un meniu principal care nu se strică la date greșite, o poveste afișată pe ecran și harta castelului desenată în consolă, cu un semn care arată unde se află eroul. Ai și planul proiectului pentru următoarele 9 lecții.  
**Minim:** meniul principal funcțional (joc nou, harta, cum se joacă, ieșire).  
**Ținta orei (Complet):** + harta cu marcajul `*` și povestea jocului, scrise în funcții separate.

## De ce contează
Toate jocurile încep cu o idee și cu un plan. Un joc mare nu se scrie dintr-o dată: se scrie **în bucăți mici**, iar după fiecare bucată se rulează programul. Astăzi alegem bucățile. Folosești tot ce ai învățat în cursul de C++: funcții, `string`, `switch`, bucle și citire sigură.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Ideea jocului și planul celor 10 lecții |
| 10–30 | Titlul, povestea, meniul principal (**Exemplele 1–4**) |
| 30–50 | Împărțim programul în funcții (**Exemplul 5**) |
| 50–80 | Camerele și harta desenată din text (**Exemplele 6–10**) |
| 80–95 | Planul proiectului (**Exemplul 11**) |
| 95–118 | Jocul complet al lecției, **Joc_L41.cpp** (**Exemplul 12**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 0. Cum arată jocul nostru

Jocul se joacă prin **comenzi scrise de la tastatură**. Eroul pornește de la poarta castelului, explorează camerele, ia obiecte, învinge un goblin, găsește o cheie și deschide cufărul din turn.

```
== Sala Mare ==
O sala uriasa, cu un candelabru plin de panze de paianjen.
Iesiri: nord sud est vest

> est
```

Harta castelului (șase camere) arată așa:

```
                 [ 5 TURNUL    ]
                        |
[ 2 ARMURARIA ]--[ 1 SALA MARE ]--[ 3 BUCATARIA ]
                        |                |
                 [ 0 POARTA    ]  [ 4 PIVNITA   ]
```

Tu poți schimba tema (pirați, spațiu, școală, junglă) oricând, pentru că numele și descrierile stau în tablouri, nu în mijlocul codului.

### Planul celor 10 lecții

| Lecția | Ce adăugăm jocului |
|--------|--------------------|
| 1 | Meniul și harta (azi) |
| 2 | Jucătorul: nume, viață, scor |
| 3 | Mișcarea între camere |
| 4 | Obiecte și rucsac |
| 5 | Monstrul și lupta |
| 6 | Magazinul și monedele |
| 7 | Misiuni, câștig și pierdere |
| 8 | Salvare și încărcare |
| 9 | Curățare, teste, depanare |
| 10 | Prezentare și finalul jocului |

---

## 1. Titlul și povestea

### Exemplul 1 — Titlul jocului **[Esențial]**

Un joc începe cu un titlu. Îl punem într-o constantă, ca să-l poți schimba într-un singur loc:

```cpp
#include <iostream>
#include <string>
using namespace std;

const string NUME_JOC = "CASTELUL UITAT";

int main() {
    cout << "=============================\n";
    cout << "   " << NUME_JOC << "\n";
    cout << "=============================\n";
    return 0;
}
```

**Ieșire:**
```
=============================
   CASTELUL UITAT
=============================
```

Dacă vrei alt titlu, schimbi doar `NUME_JOC`. Textele din cod le scriem **fără diacritice** (`Pivnita`, nu `Pivnița`), ca să se afișeze corect pe orice calculator.

### Exemplul 2 — Povestea **[Esențial]**

O poveste scurtă dă sens jocului. Trei-patru propoziții sunt suficiente:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Demult, un rege intelept a ascuns o comoara in Turnul castelului.\n";
    cout << "Cheia comorii a fost luata de un goblin, care s-a ascuns in pivnita.\n";
    cout << "Tu esti eroul care trebuie sa gaseasca cheia si sa deschida cufarul.\n";
    return 0;
}
```

**Ieșire:**
```
Demult, un rege intelept a ascuns o comoara in Turnul castelului.
Cheia comorii a fost luata de un goblin, care s-a ascuns in pivnita.
Tu esti eroul care trebuie sa gaseasca cheia si sa deschida cufarul.
```

**Încearcă tu (5 min)**  
- [ ] Schimbă povestea: alege tema ta (pirați, spațiu, junglă) și scrie 3 propoziții  
- [ ] Dă un nume jocului tău, în loc de „Castelul Uitat”  

---

## 2. Meniul principal

### Exemplul 3 — Un meniu cu `switch` **[Esențial]**

Meniul principal arată opțiunile și citește alegerea. Folosim citirea sigură din Modulul 4, ca programul să nu se blocheze la litere:

```cpp
#include <iostream>
#include <string>
#include <limits>
using namespace std;

int citesteInt(const string &mesaj, int minim, int maxim) {
    int x;
    while (true) {
        cout << mesaj;
        if (cin >> x) {
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            if (x >= minim && x <= maxim) {
                return x;
            }
        } else {
            if (cin.eof()) {
                return minim;
            }
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
        }
        cout << "Valoare invalida.\n";
    }
}

int main() {
    cout << "1. Joc nou\n";
    cout << "2. Cum se joaca\n";
    cout << "0. Iesire\n";
    int optiune = citesteInt("Alege: ", 0, 2);

    switch (optiune) {
        case 1:
            cout << "Jocul va incepe in curand.\n";
            break;
        case 2:
            cout << "Explorezi castelul si cauti comoara.\n";
            break;
        case 0:
            cout << "La revedere!\n";
            break;
    }
    return 0;
}
```

**Rulare** (tastezi `abc`, `7`, `2`):
```
1. Joc nou
2. Cum se joaca
0. Iesire
Alege: abc
Valoare invalida.
Alege: 7
Valoare invalida.
Alege: 2
Explorezi castelul si cauti comoara.
```

Prima valoare (`abc`) nu este număr, a doua (`7`) este în afara intervalului, iar a treia (`2`) este corectă. Funcția `citesteInt` se va repeta în toate programele noastre; o copiezi o dată și o ai pentru tot jocul.

### Exemplul 4 — Meniul se repetă până la ieșire **[Esențial]**

Un meniu adevărat se afișează din nou după fiecare alegere, până când jucătorul alege `0`:

```cpp
#include <iostream>
#include <string>
#include <limits>
using namespace std;

int citesteInt(const string &mesaj, int minim, int maxim) {
    int x;
    while (true) {
        cout << mesaj;
        if (cin >> x) {
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            if (x >= minim && x <= maxim) {
                return x;
            }
        } else {
            if (cin.eof()) {
                return minim;
            }
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
        }
        cout << "Valoare invalida.\n";
    }
}

int main() {
    int optiune;
    do {
        cout << "\n1. Joc nou\n";
        cout << "2. Cum se joaca\n";
        cout << "0. Iesire\n";
        optiune = citesteInt("Alege: ", 0, 2);

        switch (optiune) {
            case 1:
                cout << "Jocul va incepe in curand.\n";
                break;
            case 2:
                cout << "Explorezi castelul si cauti comoara.\n";
                break;
            case 0:
                cout << "La revedere!\n";
                break;
        }
    } while (optiune != 0);
    return 0;
}
```

**Rulare** (tastezi `2`, `1`, `0`):
```

1. Joc nou
2. Cum se joaca
0. Iesire
Alege: 2
Explorezi castelul si cauti comoara.

1. Joc nou
2. Cum se joaca
0. Iesire
Alege: 1
Jocul va incepe in curand.

1. Joc nou
2. Cum se joaca
0. Iesire
Alege: 0
La revedere!
```

---

## 3. Funcții pentru fiecare parte

### Exemplul 5 — Fiecare lucru într-o funcție **[Esențial]**

Programele mari nu se scriu în `main`. Pentru fiecare parte a jocului scriem o funcție cu un nume care spune ce face. Astfel `main` se citește ca o rețetă:

```cpp
#include <iostream>
#include <string>
using namespace std;

const string NUME_JOC = "CASTELUL UITAT";

void afiseazaTitlu() {
    cout << "=============================\n";
    cout << "   " << NUME_JOC << "\n";
    cout << "=============================\n";
}

void afiseazaPoveste() {
    cout << "Demult, un rege intelept a ascuns o comoara in Turnul castelului.\n";
    cout << "Tu esti eroul care trebuie sa o gaseasca.\n";
}

void afiseazaMeniu() {
    cout << "  1. Joc nou\n";
    cout << "  2. Cum se joaca\n";
    cout << "  0. Iesire\n";
}

int main() {
    afiseazaTitlu();
    afiseazaPoveste();
    afiseazaMeniu();
    return 0;
}
```

**Ieșire:**
```
=============================
   CASTELUL UITAT
=============================
Demult, un rege intelept a ascuns o comoara in Turnul castelului.
Tu esti eroul care trebuie sa o gaseasca.
  1. Joc nou
  2. Cum se joaca
  0. Iesire
```

Regula noastră: o funcție face **un singur lucru**. Când vom avea 700 de linii, funcțiile mici ne vor salva.

---

## 4. Camerele și harta

### Exemplul 6 — Camerele castelului într-un tablou

Castelul are șase camere. Le numerotăm de la `0` la `5` și le punem într-un tablou de `string`. Numărul camerei este **poziția** ei în tablou:

```cpp
#include <iostream>
#include <string>
using namespace std;

const int NR_CAMERE = 6;
const string NUME_CAMERA[NR_CAMERE] = {
    "Poarta castelului", "Sala Mare", "Armuraria",
    "Bucataria", "Pivnita", "Turnul"
};

int main() {
    cout << "Camerele castelului:\n";
    for (int i = 0; i < NR_CAMERE; i++) {
        cout << "  " << i << ". " << NUME_CAMERA[i] << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Camerele castelului:
  0. Poarta castelului
  1. Sala Mare
  2. Armuraria
  3. Bucataria
  4. Pivnita
  5. Turnul
```

Pentru a schimba tema, înlocuiești doar numele din tablou. Restul programului rămâne la fel.

### Exemplul 7 — O cameră desenată: caseta **[Esențial]**

Fiecare cameră se desenează ca o „casetă” de aceeași lățime. Folosim `to_string` ca să transformăm numărul în text, iar numele sunt completate cu spații, ca toate casetele să aibă 15 caractere:

```cpp
#include <iostream>
#include <string>
using namespace std;

string caseta(int numar, const string &nume) {
    return "[ " + to_string(numar) + " " + nume + " ]";
}

int main() {
    cout << caseta(0, "POARTA   ") << "\n";
    cout << caseta(1, "SALA MARE") << "\n";
    cout << caseta(2, "ARMURARIA") << "\n";
    return 0;
}
```

**Ieșire:**
```
[ 0 POARTA    ]
[ 1 SALA MARE ]
[ 2 ARMURARIA ]
```

Funcția **întoarce** textul, nu îl afișează. Așa o putem folosi ori de câte ori avem nevoie de ea, inclusiv în exemplul următor.

### Exemplul 8 — Spații la început: `string(n, ' ')`

Pentru a pune o casetă „la mijloc” avem nevoie de spații înaintea ei. `string(n, c)` construiește un text format din `n` caractere `c`:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << string(10, '-') << "\n";
    cout << string(5, ' ') << "ajung la mijloc" << "\n";
    cout << string(3, '*') << " " << string(3, '#') << "\n";
    return 0;
}
```

**Ieșire:**
```
----------
     ajung la mijloc
*** ###
```

### Exemplul 9 — Harta întreagă **[Esențial]**

Acum punem casetele laolaltă. Așezăm turnul sus, în mijloc, apoi rândul din mijloc cu trei camere și, jos, poarta și pivnița. Liniile `|` sunt drumurile dintre camere:

```cpp
#include <iostream>
#include <string>
using namespace std;

string caseta(int numar, const string &nume) {
    return "[ " + to_string(numar) + " " + nume + " ]";
}

void afiseazaHarta() {
    cout << string(17, ' ') << caseta(5, "TURNUL   ") << "\n";
    cout << string(24, ' ') << "|\n";
    cout << caseta(2, "ARMURARIA") << "--" << caseta(1, "SALA MARE") << "--" << caseta(3, "BUCATARIA") << "\n";
    cout << string(24, ' ') << "|" << string(16, ' ') << "|\n";
    cout << string(17, ' ') << caseta(0, "POARTA   ") << "  " << caseta(4, "PIVNITA  ") << "\n";
}

int main() {
    afiseazaHarta();
    return 0;
}
```

**Ieșire:**
```
                 [ 5 TURNUL    ]
                        |
[ 2 ARMURARIA ]--[ 1 SALA MARE ]--[ 3 BUCATARIA ]
                        |                |
                 [ 0 POARTA    ]  [ 4 PIVNITA   ]
```

Numerele `17`, `24` și `16` au fost alese ca să se alinieze drumurile cu mijlocul casetelor. Poți să le schimbi și să vezi ce se întâmplă cu harta.

### Exemplul 10 — Unde sunt eu? Marcajul `*`

Hărții îi adăugăm un parametru: numărul camerei în care se află eroul. Caseta acelei camere primește `*` în loc de spațiu. Dacă numărul este `-1`, nicio cameră nu este marcată (de exemplu, în meniul principal):

```cpp
#include <iostream>
#include <string>
using namespace std;

string caseta(int numar, const string &nume, int camera) {
    string semn = (numar == camera) ? "*" : " ";
    return "[" + semn + to_string(numar) + " " + nume + " ]";
}

void afiseazaHarta(int camera) {
    cout << string(17, ' ') << caseta(5, "TURNUL   ", camera) << "\n";
    cout << string(24, ' ') << "|\n";
    cout << caseta(2, "ARMURARIA", camera) << "--" << caseta(1, "SALA MARE", camera)
         << "--" << caseta(3, "BUCATARIA", camera) << "\n";
    cout << string(24, ' ') << "|" << string(16, ' ') << "|\n";
    cout << string(17, ' ') << caseta(0, "POARTA   ", camera) << "  "
         << caseta(4, "PIVNITA  ", camera) << "\n";
}

int main() {
    cout << "Esti in Sala Mare:\n";
    afiseazaHarta(1);
    cout << "\nEsti la Poarta:\n";
    afiseazaHarta(0);
    return 0;
}
```

**Ieșire:**
```
Esti in Sala Mare:
                 [ 5 TURNUL    ]
                        |
[ 2 ARMURARIA ]--[*1 SALA MARE ]--[ 3 BUCATARIA ]
                        |                |
                 [ 0 POARTA    ]  [ 4 PIVNITA   ]

Esti la Poarta:
                 [ 5 TURNUL    ]
                        |
[ 2 ARMURARIA ]--[ 1 SALA MARE ]--[ 3 BUCATARIA ]
                        |                |
                 [*0 POARTA    ]  [ 4 PIVNITA   ]
```

Expresia `(numar == camera) ? "*" : " "` înseamnă: „dacă `numar == camera`, rezultatul este `*`, altfel spațiu”.

---

## 5. Planul proiectului

### Exemplul 11 — Foaia de plan, cu bife

Un programator își planifică munca. Iată o listă a lecțiilor cu bife; ultima valoare spune câte lecții sunt deja terminate:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    const int NR_ETAPE = 10;
    const string ETAPE[NR_ETAPE] = {
        "Meniu si harta", "Jucatorul", "Miscarea intre camere", "Obiecte si rucsac",
        "Monstrul si lupta", "Magazinul", "Misiuni si final", "Salvare si incarcare",
        "Curatare si teste", "Prezentare"
    };
    int terminate = 1;

    for (int i = 0; i < NR_ETAPE; i++) {
        cout << (i < terminate ? "[x] " : "[ ] ") << i + 1 << ". " << ETAPE[i] << "\n";
    }
    cout << "\nTerminat: " << terminate * 100 / NR_ETAPE << "%\n";
    return 0;
}
```

**Ieșire:**
```
[x] 1. Meniu si harta
[ ] 2. Jucatorul
[ ] 3. Miscarea intre camere
[ ] 4. Obiecte si rucsac
[ ] 5. Monstrul si lupta
[ ] 6. Magazinul
[ ] 7. Misiuni si final
[ ] 8. Salvare si incarcare
[ ] 9. Curatare si teste
[ ] 10. Prezentare

Terminat: 10%
```

---

## 6. Jocul lecției

### Exemplul 12 — **Joc_L41.cpp**: meniul principal și harta **[Esențial]**

Reunim tot ce am făcut: titlul, povestea, harta și meniul. Opțiunea `1` doar anunță că jocul începe în lecția următoare. Scrie programul **pe bucăți**: întâi funcțiile, apoi meniul; compilează după fiecare funcție.

<details>
<summary>Fișierul complet <code>Joc_L41.cpp</code> (ca să compari cu al tău)</summary>

```cpp
/*
   Joc RPG in consola: CASTELUL UITAT
   Fisier: Joc_L41.cpp
   Autor:  Prenume Nume
*/
#include <iostream>
#include <string>
#include <limits>
using namespace std;

// ---------- constante ----------
const string NUME_JOC = "CASTELUL UITAT";

// ---------- structuri ----------

// ---------- citire sigura ----------
int citesteInt(const string &mesaj, int minim, int maxim) {
    int x;
    while (true) {
        cout << mesaj;
        if (cin >> x) {
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            if (x >= minim && x <= maxim) {
                return x;
            }
        } else {
            if (cin.eof()) {
                return minim;
            }
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
        }
        cout << "Valoare invalida.\n";
    }
}

// ---------- jucatorul ----------

// ---------- povestea, harta, ajutorul ----------
void afiseazaTitlu() {
    cout << "\n=============================\n";
    cout << "   " << NUME_JOC << "\n";
    cout << "=============================\n";
}

void afiseazaPoveste() {
    cout << "\nDemult, un rege intelept a ascuns o comoara in Turnul castelului.\n";
    cout << "Cheia comorii a fost luata de un goblin, care s-a ascuns in pivnita.\n";
    cout << "Tu esti eroul care trebuie sa gaseasca cheia si sa deschida cufarul.\n";
}

string caseta(int numar, int camera) {
    const string NUME_SCURT[6] = {
        "POARTA   ", "SALA MARE", "ARMURARIA", "BUCATARIA", "PIVNITA  ", "TURNUL   "
    };
    string semn = (numar == camera) ? "*" : " ";
    return "[" + semn + to_string(numar) + " " + NUME_SCURT[numar] + " ]";
}

void afiseazaHarta(int camera) {
    cout << "\n";
    cout << string(17, ' ') << caseta(5, camera) << "\n";
    cout << string(24, ' ') << "|\n";
    cout << caseta(2, camera) << "--" << caseta(1, camera) << "--" << caseta(3, camera) << "\n";
    cout << string(24, ' ') << "|" << string(16, ' ') << "|\n";
    cout << string(17, ' ') << caseta(0, camera) << "  " << caseta(4, camera) << "\n";
    if (camera >= 0) {
        cout << "(* = aici esti tu)\n";
    }
}

// ---------- lumea jocului ----------

// ---------- lupta ----------

// ---------- magazinul ----------

// ---------- misiuni si final ----------

// ---------- salvare ----------

// ---------- teste ----------

// ---------- bucla jocului ----------

// ---------- meniul principal ----------
void jocNou() {
    cout << "\nJocul va incepe in lectia urmatoare.\n";
}

void afiseazaMeniu() {
    afiseazaTitlu();
    cout << "  1. Joc nou\n";
    cout << "  2. Harta castelului\n";
    cout << "  3. Cum se joaca\n";
    cout << "  0. Iesire\n";
}

int main() {
    int optiune;
    do {
        afiseazaMeniu();
        optiune = citesteInt("Alege: ", 0, 9);
        switch (optiune) {
            case 1:
                jocNou();
                break;
            case 2:
                afiseazaHarta(-1);
                break;
            case 3:
                afiseazaPoveste();
                break;
            case 0:
                cout << "\nLa revedere!\n";
                break;
            default:
                cout << "Optiunea nu exista.\n";
        }
    } while (optiune != 0);
    return 0;
}
```

**Rulare** (tastezi `2`, `3`, `1`, `0`):
```

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  0. Iesire
Alege: 2

                 [ 5 TURNUL    ]
                        |
[ 2 ARMURARIA ]--[ 1 SALA MARE ]--[ 3 BUCATARIA ]
                        |                |
                 [ 0 POARTA    ]  [ 4 PIVNITA   ]

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  0. Iesire
Alege: 3

Demult, un rege intelept a ascuns o comoara in Turnul castelului.
Cheia comorii a fost luata de un goblin, care s-a ascuns in pivnita.
Tu esti eroul care trebuie sa gaseasca cheia si sa deschida cufarul.

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  0. Iesire
Alege: 1

Jocul va incepe in lectia urmatoare.

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  0. Iesire
Alege: 0

La revedere!
```

</details>

Observă cum arată `main`: este doar un meniu, iar fiecare opțiune apelează o funcție. Acesta este scheletul pe care îl vom folosi în tot modulul.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Joc_L41.cpp (obligatoriu)
Scrie programul din Exemplul 12. Apoi **personalizează-l**: schimbă numele jocului și povestea, apoi numele camerelor (de exemplu, o navă spațială cu camere precum „Puntea”, „Motoarele” sau „Laboratorul”). Dacă schimbi lungimea numelor, ajustează harta ca să rămână aliniată.

### Exercițiul B — Povestea ta
Adaugă o opțiune în meniu: „Povestea”. Ea afișează povestea jocului într-o funcție separată, `afiseazaPoveste`.

### Exercițiul C — O cameră în plus *(Provocare, opțional)*
Desenează pe hârtie o a șaptea cameră (de exemplu, o grădină), apoi adaugă-o pe hartă în cod.

### Exercițiul D — Harta ta *(Provocare, opțional)*
Desenează pe hârtie harta jocului tău: 6 camere și drumurile dintre ele. Pe ea vei lucra în lecția următoare.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Meniul se repetă până la `0` și nu se strică la litere  
- [ ] Harta se desenează corect, cu aliniere bună  
- [ ] Textele din cod sunt fără diacritice  
- [ ] Ai salvat fișierul ca `Joc_L41.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă la hartă o legendă: „`*` = aici ești tu”  
- [ ] Afișează titlul în litere mari desenate din caractere (*ASCII art*)  
- [ ] Adaugă un mesaj de bun venit care depinde de ora zilei (caută `<ctime>`)  
- [ ] Citește despre jocul *Colossal Cave Adventure*, unul dintre primele jocuri din lume, făcut în întregime din text  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Harta nu este aliniată | Numărul de spații nu se potrivește | Numără caracterele: o casetă are 15, mijlocul ei este la 7 |
| Caracterele ciudate în loc de diacritice | Consola nu le afișează | Scrie textele din cod fără diacritice |
| `error: 'to_string' was not declared` | Lipsește biblioteca | `#include <string>` |
| Meniul se repetă la nesfârșit după o literă | Citirea a rămas în stare de eroare | Folosește `citesteInt` (cu `cin.clear()` și `cin.ignore`) |
| `jump to case label` | Ai declarat o variabilă într-un `case` fără acolade | `case X: { … break; }` |
| Funcție folosită înainte să fie scrisă | Ordinea în fișier | Funcțiile se scriu înaintea locului unde sunt apelate |

---

## Recapitulare pe scurt

- Un RPG are erou, camere, obiecte, monștri și un scop. Îl construim în 10 pași, cu un program care rulează la fiecare pas.
- Textele jocului stau în constante și tablouri (`NUME_JOC`, `NUME_CAMERA`), ca să poți schimba tema ușor.
- Meniul: `do … while`, `switch` și citire sigură (`citesteInt`).
- Fiecare parte a programului este o funcție cu un singur rol.
- `string(n, c)` construiește un text din `n` caractere; `to_string(x)` transformă un număr în text.
- Harta se desenează din casete de aceeași lățime, iar camera curentă este marcată cu `*`.

---

## Temă
1. Termină Exercițiul A și rulează jocul de cel puțin trei ori, cu date corecte și greșite.  
2. Desenează pe hârtie harta jocului tău, cu 6 camere, și notează numele lor.  
3. Scrie pe o foaie cele **trei lucruri** pe care vrei să le poată face eroul tău (de exemplu: deschide uși, luptă, cumpără).  
4. Salvează tot ca `Joc_L41.cpp`.

---

## Ce urmează — Lecția 2
**Jucătorul.** Creăm eroul: o `struct` cu nume, viață, monede și scor, o bară de viață desenată din caractere și funcții care îl rănesc sau îl vindecă.
