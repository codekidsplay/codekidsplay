# LECȚIA 2 — Jucătorul
**Modulul 5 · Proiect RPG în consolă · 2 ore**  
**Code Kids Play · RPG Creator**

> Un joc fără erou nu este joc. Azi îl creăm pe **eroul tău**: are un nume, viață, putere de atac, monede și scor. Toate aceste date aparțin aceluiași personaj, deci le punem împreună într-o **structură** (`struct`), exact ca la fișa elevului din Modulul 4. Desenăm și o **bară de viață** din caractere, ca în jocurile adevărate, și scriem funcții care îl rănesc sau îl vindecă.  
> Proiect: **„Joc_L42.cpp”** · jocul din lecția trecută, cu eroul adăugat.

---

## Obiectiv
La finalul orei definești o `struct Jucator` cu valori implicite, citești numele eroului, afișezi starea lui cu o bară de viață și scrii funcții care îi scad sau îi cresc viața fără ca aceasta să iasă din limite.  
**Minim:** `struct Jucator` și o funcție care îi afișează starea.  
**Ținta orei (Complet):** + bara de viață, funcțiile `raneste` și `vindeca`, citirea numelui și integrarea în jocul din lecția 1.

## De ce contează
Fără `struct`, ar trebui să ținem în program patru-cinci variabile separate pentru fiecare erou și să le trimitem pe toate la fiecare funcție. Cu `struct`, eroul este **un singur obiect** pe care îl trimitem ușor oriunde. În lecțiile următoare, eroul va merge prin camere, va purta obiecte și se va lupta, deci structura lui trebuie să fie bine gândită de la început.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `struct`, funcții cu referințe |
| 10–40 | Structura `Jucator`, valori implicite, afișarea stării (**Exemplele 1–4**) |
| 40–60 | Bara de viață (**Exemplul 5**) |
| 60–85 | Rănire, vindecare, limite (**Exemplele 6 și 9**) |
| 85–100 | Citirea numelui și crearea eroului (**Exemplele 7 și 8**) |
| 100–118 | Jocul lecției, **Joc_L42.cpp** (**Exemplul 12**; Exemplele 10–11 sunt opționale) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Eroul ca structură

### Exemplul 1 — Problema: variabile separate

Să ținem datele a doi eroi în variabile obișnuite:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nume1 = "Ana";
    int viata1 = 30;
    int monede1 = 10;

    string nume2 = "Dan";
    int viata2 = 25;
    int monede2 = 5;

    cout << nume1 << ": viata " << viata1 << ", monede " << monede1 << "\n";
    cout << nume2 << ": viata " << viata2 << ", monede " << monede2 << "\n";
    return 0;
}
```

**Ieșire:**
```
Ana: viata 30, monede 10
Dan: viata 25, monede 5
```

Funcționează, dar se complică repede: pentru un al treilea erou mai scriem trei variabile, iar o funcție de afișare ar avea nevoie de trei parametri. Soluția este `struct`.

### Exemplul 2 — Prima structură: `Jucator` **[Esențial]**

O `struct` grupează mai multe valori sub un singur nume. Valorile din interior se numesc **câmpuri**, iar accesul la ele se face cu punct:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Jucator {
    string nume;
    int viata;
    int monede;
};

int main() {
    Jucator eroul;
    eroul.nume = "Ana";
    eroul.viata = 30;
    eroul.monede = 10;

    cout << eroul.nume << ": viata " << eroul.viata << ", monede " << eroul.monede << "\n";
    return 0;
}
```

**Ieșire:**
```
Ana: viata 30, monede 10
```

`Jucator` este un **tip nou**, ca `int` sau `string`. `eroul` este o variabilă de tipul acesta. Definiția structurii se scrie **înaintea** funcțiilor care o folosesc și se încheie cu `;`.

### Exemplul 3 — Valori implicite **[Esențial]**

Un erou nou începe mereu cu aceeași viață și aceeași sumă de monede. Le scriem direct în structură, cu `=`. Astfel nu uităm să le inițializăm:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Jucator {
    string nume;
    int viata = 30;
    int viataMax = 30;
    int atac = 5;
    int monede = 10;
    int scor = 0;
};

int main() {
    Jucator a;
    a.nume = "Ana";

    Jucator b;
    b.nume = "Dan";
    b.monede = 50;

    cout << a.nume << ": viata " << a.viata << ", atac " << a.atac << ", monede " << a.monede << "\n";
    cout << b.nume << ": viata " << b.viata << ", atac " << b.atac << ", monede " << b.monede << "\n";
    return 0;
}
```

**Ieșire:**
```
Ana: viata 30, atac 5, monede 10
Dan: viata 30, atac 5, monede 50
```

Ambii eroi au pornit cu aceleași valori, dar `b` și-a schimbat monedele. Fiecare variabilă de tip `Jucator` are propriile câmpuri.

---

## 2. Afișarea stării

### Exemplul 4 — Funcția `afiseazaStare` **[Esențial]**

Trimitem eroul funcției ca `const Jucator &`: `&` evită copierea, iar `const` promite că funcția doar citește:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Jucator {
    string nume;
    int viata = 30;
    int viataMax = 30;
    int atac = 5;
    int monede = 10;
    int scor = 0;
};

void afiseazaStare(const Jucator &j) {
    cout << "--- " << j.nume << " ---\n";
    cout << "Viata:  " << j.viata << "/" << j.viataMax << "\n";
    cout << "Atac:   " << j.atac << "\n";
    cout << "Monede: " << j.monede << "\n";
    cout << "Scor:   " << j.scor << "\n";
}

int main() {
    Jucator eroul;
    eroul.nume = "Ana";
    afiseazaStare(eroul);
    return 0;
}
```

**Ieșire:**
```
--- Ana ---
Viata:  30/30
Atac:   5
Monede: 10
Scor:   0
```

### Exemplul 5 — Bara de viață **[Esențial]**

În jocurile adevărate, viața se vede ca o bară. O desenăm din `#` (viață) și `.` (viață pierdută). Bara are mereu 10 căsuțe; câte sunt pline depinde de procentul de viață rămasă:

```cpp
#include <iostream>
#include <string>
using namespace std;

string bara(int valoare, int maxim) {
    if (valoare < 0) {
        valoare = 0;
    }
    int plin = valoare * 10 / maxim;
    return "[" + string(plin, '#') + string(10 - plin, '.') + "]";
}

int main() {
    cout << bara(30, 30) << " 30/30\n";
    cout << bara(24, 30) << " 24/30\n";
    cout << bara(15, 30) << " 15/30\n";
    cout << bara(4, 30) << " 4/30\n";
    cout << bara(0, 30) << " 0/30\n";
    cout << bara(-5, 30) << " -5/30 (nu se strica)\n";
    return 0;
}
```

**Ieșire:**
```
[##########] 30/30
[########..] 24/30
[#####.....] 15/30
[#.........] 4/30
[..........] 0/30
[..........] -5/30 (nu se strica)
```

`valoare * 10 / maxim` este o împărțire între numere întregi, deci rezultatul se rotunjește în jos: `24 * 10 / 30` este `8`. Bara se „golește” treptat, pe măsură ce viața scade.

---

## 3. Rănire și vindecare

### Exemplul 6 — `raneste` și `vindeca`, cu limite **[Esențial]**

Viața nu poate fi mai mică decât `0` și nici mai mare decât `viataMax`. Punem aceste limite **o singură dată**, în funcții, ca să nu le uităm în restul jocului. Funcțiile primesc eroul prin **referință** (`&`, fără `const`), pentru că îl modifică:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Jucator {
    string nume;
    int viata = 30;
    int viataMax = 30;
};

void raneste(Jucator &j, int puncte) {
    j.viata -= puncte;
    if (j.viata < 0) {
        j.viata = 0;
    }
}

void vindeca(Jucator &j, int puncte) {
    j.viata += puncte;
    if (j.viata > j.viataMax) {
        j.viata = j.viataMax;
    }
}

int main() {
    Jucator eroul;
    eroul.nume = "Ana";
    cout << "Start:        " << eroul.viata << "\n";

    raneste(eroul, 12);
    cout << "Dupa -12:     " << eroul.viata << "\n";

    vindeca(eroul, 5);
    cout << "Dupa +5:      " << eroul.viata << "\n";

    vindeca(eroul, 100);
    cout << "Dupa +100:    " << eroul.viata << " (nu depaseste maximul)\n";

    raneste(eroul, 100);
    cout << "Dupa -100:    " << eroul.viata << " (nu coboara sub 0)\n";
    return 0;
}
```

**Ieșire:**
```
Start:        30
Dupa -12:     18
Dupa +5:      23
Dupa +100:    30 (nu depaseste maximul)
Dupa -100:    0 (nu coboara sub 0)
```

### Exemplul 7 — Citim numele eroului

Numele poate avea spații („Ana Maria”), deci îl citim cu `getline`. Dacă jucătorul apasă doar Enter, primește numele „Erou”:

```cpp
#include <iostream>
#include <string>
using namespace std;

string citesteText(const string &mesaj) {
    string s;
    cout << mesaj;
    getline(cin, s);
    if (s.empty()) {
        return "Erou";
    }
    return s;
}

int main() {
    string nume = citesteText("Cum se numeste eroul tau? ");
    cout << "Bun venit, " << nume << "!\n";

    string alt = citesteText("Alt nume (sau Enter): ");
    cout << "Bun venit, " << alt << "!\n";
    return 0;
}
```

**Rulare** (tastezi `Ana Maria`, ``):
```
Cum se numeste eroul tau? Ana Maria
Bun venit, Ana Maria!
Alt nume (sau Enter): 
Bun venit, Erou!
```

### Exemplul 8 — `creeazaJucator()` întoarce un erou nou **[Esențial]**

O funcție poate întoarce o structură întreagă. Partea de pregătire a eroului (citirea numelui) se adună într-o singură funcție:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Jucator {
    string nume;
    int viata = 30;
    int viataMax = 30;
    int atac = 5;
    int monede = 10;
    int scor = 0;
};

string citesteText(const string &mesaj) {
    string s;
    cout << mesaj;
    getline(cin, s);
    if (s.empty()) {
        return "Erou";
    }
    return s;
}

Jucator creeazaJucator() {
    Jucator j;
    j.nume = citesteText("Cum se numeste eroul tau? ");
    return j;
}

int main() {
    Jucator eroul = creeazaJucator();
    cout << "Ai creat eroul " << eroul.nume << " cu " << eroul.viata << " puncte de viata.\n";
    return 0;
}
```

**Rulare** (tastezi `Mihai`):
```
Cum se numeste eroul tau? Mihai
Ai creat eroul Mihai cu 30 puncte de viata.
```

### Exemplul 9 — Mai trăiește? **[Esențial]**

Funcția `esteViu` întoarce `true` cât timp eroul are viață. O vom folosi în luptă, în lecția 5, ca să știm când se termină jocul:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Jucator {
    string nume = "Ana";
    int viata = 30;
    int viataMax = 30;
};

void raneste(Jucator &j, int puncte) {
    j.viata -= puncte;
    if (j.viata < 0) {
        j.viata = 0;
    }
}

bool esteViu(const Jucator &j) {
    return j.viata > 0;
}

int main() {
    Jucator eroul;
    int lovituri[] = {10, 12, 15};

    for (int lovitura : lovituri) {
        raneste(eroul, lovitura);
        cout << "Lovitura de " << lovitura << " -> viata " << eroul.viata;
        if (esteViu(eroul)) {
            cout << " (mai lupta)\n";
        } else {
            cout << " (a cazut!)\n";
        }
    }
    return 0;
}
```

**Ieșire:**
```
Lovitura de 10 -> viata 20 (mai lupta)
Lovitura de 12 -> viata 8 (mai lupta)
Lovitura de 15 -> viata 0 (a cazut!)
```

---

## 4. Alte idei cu structuri

### Exemplul 10 — Doi eroi, un câștigător *(Provocare, opțional)*

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

Putem pune mai mulți eroi într-un tablou și să-i comparăm:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Jucator {
    string nume;
    int viata;
    int atac;
};

int main() {
    Jucator echipa[2] = {
        {"Ana", 30, 6},
        {"Dan", 25, 9}
    };

    int cel = 0;
    for (int i = 1; i < 2; i++) {
        if (echipa[i].atac > echipa[cel].atac) {
            cel = i;
        }
    }
    cout << "Cel mai puternic: " << echipa[cel].nume << " (atac " << echipa[cel].atac << ")\n";
    return 0;
}
```

**Ieșire:**
```
Cel mai puternic: Dan (atac 9)
```

### Exemplul 11 — Alegem clasa eroului *(Provocare, opțional)*

Jucătorul poate alege o clasă, care schimbă valorile de pornire:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Jucator {
    string clasa;
    int viata;
    int atac;
};

Jucator alegeClasa(int numar) {
    Jucator j;
    switch (numar) {
        case 1:
            j = {"Razboinic", 40, 6};
            break;
        case 2:
            j = {"Magician", 25, 9};
            break;
        default:
            j = {"Hot", 30, 7};
    }
    return j;
}

int main() {
    for (int c = 1; c <= 3; c++) {
        Jucator j = alegeClasa(c);
        cout << j.clasa << ": viata " << j.viata << ", atac " << j.atac << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Razboinic: viata 40, atac 6
Magician: viata 25, atac 9
Hot: viata 30, atac 7
```

---

## 5. Jocul lecției

### Exemplul 12 — **Joc_L42.cpp**: eroul intră în joc **[Esențial]**

Pornim de la **Joc_L41.cpp** și adăugăm, în ordine: structura `Jucator`, funcția `citesteText`, `bara`, `creeazaJucator`, `raneste`, `vindeca`, `esteViu` și `afiseazaStare`. La final, opțiunea `1` din meniu creează eroul și îi arată starea. Ca să vezi cum merg funcțiile, `jocNou` îl și rănește, apoi îl vindecă.

Iată ce s-a **schimbat** față de lecția trecută (liniile cu `+` se adaugă, cele cu `-` se șterg, iar `...` înseamnă „restul codului rămâne la fel”):

```diff
...
 
 // ---------- structuri ----------
+struct Jucator {
+    string nume;
+    int viata = 30;
+    int viataMax = 30;
+    int atac = 5;
+    int monede = 10;
+    int scor = 0;
+};
 
 // ---------- citire sigura ----------
...
 }
 
+string citesteText(const string &mesaj) {
+    string s;
+    cout << mesaj;
+    getline(cin, s);
+    if (s.empty()) {
+        return "Erou";
+    }
+    return s;
+}
+
 // ---------- jucatorul ----------
+string bara(int valoare, int maxim) {
+    if (valoare < 0) {
+        valoare = 0;
+    }
+    int plin = valoare * 10 / maxim;
+    return "[" + string(plin, '#') + string(10 - plin, '.') + "]";
+}
+
+Jucator creeazaJucator() {
+    Jucator j;
+    j.nume = citesteText("Cum se numeste eroul tau? ");
+    return j;
+}
+
+void raneste(Jucator &j, int puncte) {
+    j.viata -= puncte;
+    if (j.viata < 0) {
+        j.viata = 0;
+    }
+}
+
+void vindeca(Jucator &j, int puncte) {
+    j.viata += puncte;
+    if (j.viata > j.viataMax) {
+        j.viata = j.viataMax;
+    }
+}
+
+bool esteViu(const Jucator &j) {
+    return j.viata > 0;
+}
+
+void afiseazaStare(const Jucator &j) {
+    cout << "--- " << j.nume << " ---\n";
+    cout << "Viata:  " << bara(j.viata, j.viataMax) << " " << j.viata << "/" << j.viataMax << "\n";
+    cout << "Atac:   " << j.atac << "\n";
+    cout << "Monede: " << j.monede << "\n";
+    cout << "Scor:   " << j.scor << "\n";
+}
 
 // ---------- povestea, harta, ajutorul ----------
...
 // ---------- meniul principal ----------
 void jocNou() {
-    cout << "\nJocul va incepe in lectia urmatoare.\n";
+    Jucator j = creeazaJucator();
+    afiseazaStare(j);
+    cout << "\nUn monstru te loveste: -12 viata.\n";
+    raneste(j, 12);
+    afiseazaStare(j);
+    cout << "\nBei o potiune: +5 viata.\n";
+    vindeca(j, 5);
+    afiseazaStare(j);
 }
```

<details>
<summary>Fișierul complet <code>Joc_L42.cpp</code> (ca să compari cu al tău)</summary>

```cpp
/*
   Joc RPG in consola: CASTELUL UITAT
   Fisier: Joc_L42.cpp
   Autor:  Prenume Nume
*/
#include <iostream>
#include <string>
#include <limits>
using namespace std;

// ---------- constante ----------
const string NUME_JOC = "CASTELUL UITAT";

// ---------- structuri ----------
struct Jucator {
    string nume;
    int viata = 30;
    int viataMax = 30;
    int atac = 5;
    int monede = 10;
    int scor = 0;
};

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

string citesteText(const string &mesaj) {
    string s;
    cout << mesaj;
    getline(cin, s);
    if (s.empty()) {
        return "Erou";
    }
    return s;
}

// ---------- jucatorul ----------
string bara(int valoare, int maxim) {
    if (valoare < 0) {
        valoare = 0;
    }
    int plin = valoare * 10 / maxim;
    return "[" + string(plin, '#') + string(10 - plin, '.') + "]";
}

Jucator creeazaJucator() {
    Jucator j;
    j.nume = citesteText("Cum se numeste eroul tau? ");
    return j;
}

void raneste(Jucator &j, int puncte) {
    j.viata -= puncte;
    if (j.viata < 0) {
        j.viata = 0;
    }
}

void vindeca(Jucator &j, int puncte) {
    j.viata += puncte;
    if (j.viata > j.viataMax) {
        j.viata = j.viataMax;
    }
}

bool esteViu(const Jucator &j) {
    return j.viata > 0;
}

void afiseazaStare(const Jucator &j) {
    cout << "--- " << j.nume << " ---\n";
    cout << "Viata:  " << bara(j.viata, j.viataMax) << " " << j.viata << "/" << j.viataMax << "\n";
    cout << "Atac:   " << j.atac << "\n";
    cout << "Monede: " << j.monede << "\n";
    cout << "Scor:   " << j.scor << "\n";
}

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
    Jucator j = creeazaJucator();
    afiseazaStare(j);
    cout << "\nUn monstru te loveste: -12 viata.\n";
    raneste(j, 12);
    afiseazaStare(j);
    cout << "\nBei o potiune: +5 viata.\n";
    vindeca(j, 5);
    afiseazaStare(j);
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

**Rulare** (tastezi `1`, `Ana`, `0`):
```

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  0. Iesire
Alege: 1
Cum se numeste eroul tau? Ana
--- Ana ---
Viata:  [##########] 30/30
Atac:   5
Monede: 10
Scor:   0

Un monstru te loveste: -12 viata.
--- Ana ---
Viata:  [######....] 18/30
Atac:   5
Monede: 10
Scor:   0

Bei o potiune: +5 viata.
--- Ana ---
Viata:  [#######...] 23/30
Atac:   5
Monede: 10
Scor:   0

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

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Joc_L42.cpp (obligatoriu)
Scrie programul din Exemplul 12, pornind de la `Joc_L41.cpp`. Apoi schimbă valorile de pornire ale eroului (viață, monede, atac) după gustul tău și verifică dacă bara de viață arată bine.

### Exercițiul B — Mai multe câmpuri
Adaugă în `Jucator` un câmp `nivel` (pornește de la `1`) și afișează-l în `afiseazaStare`.

### Exercițiul C — Bara pentru monede *(Provocare, opțional)*
Scrie o funcție care desenează cu `*` câte o stea pentru fiecare 10 monede ale eroului (de exemplu, 35 de monede înseamnă `***`).

### Exercițiul D — Clasa eroului *(Provocare, opțional)*
Pornind de la Exemplul 11, lasă jucătorul să aleagă o clasă când își creează eroul, iar `creeazaJucator` să seteze valorile potrivite.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] `Jucator` are valori implicite, iar numele se citește de la tastatură  
- [ ] Bara de viață arată corect pentru viață plină, pe jumătate și zero  
- [ ] Viața nu iese niciodată din intervalul `0`…`viataMax`  
- [ ] Ai salvat fișierul ca `Joc_L42.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Colorează bara de viață: caută pe internet „ANSI escape codes C++” (funcționează în unele console)  
- [ ] Adaugă un câmp `experienta` și o funcție `castigaExperienta` care crește nivelul la fiecare 100 de puncte  
- [ ] Scrie funcția `afiseazaCompact` care afișează starea pe o singură linie  
- [ ] Adaugă un câmp `numeArma` și afișează-l în stare  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Funcția `raneste` nu schimbă viața | Ai uitat `&` la parametru | `void raneste(Jucator &j, int puncte)` |
| `error: expected ';' after struct definition` | Lipsește `;` după `}` | `struct Jucator { … };` |
| Viața devine negativă sau mai mare decât maximul | Limitele nu sunt puse | Verifică `< 0` și `> viataMax` în funcții |
| `getline` citește un text gol | A rămas un Enter în buffer după `cin >>` | Citește numele înainte de alte citiri sau folosește `cin.ignore()` |
| Bara arată `[..........]` când viața este plină | Împărțirea întreagă cu `maxim` greșit | `valoare * 10 / maxim` (nu `maxim / valoare`) |
| `error: 'Jucator' does not name a type` | Structura este definită după funcție | Definește `struct` înaintea funcțiilor |

---

## Recapitulare pe scurt

- `struct Jucator { … };` grupează datele eroului; câmpurile se accesează cu punct (`eroul.viata`).
- Valorile implicite se scriu în structură: `int viata = 30;`.
- `const Jucator &j` = citire fără copiere; `Jucator &j` = modificare a eroului original.
- Funcțiile `raneste` și `vindeca` păstrează viața între `0` și `viataMax`.
- `string(n, c)` desenează bara de viață; `valoare * 10 / maxim` spune câte căsuțe sunt pline.
- O funcție poate întoarce o structură întreagă (`creeazaJucator`).

---

## Temă
1. Termină Exercițiul A și testează jocul cu nume lungi, cu spații și cu nume gol.  
2. Rulează de mai multe ori `raneste` și `vindeca` cu valori mari și verifică limitele.  
3. Scrie pe hârtie ce **obiecte** ar putea găsi eroul tău (cel puțin patru) și ce face fiecare.  
4. Salvează tot ca `Joc_L42.cpp`.

---

## Ce urmează — Lecția 3
**Mișcarea între camere.** Eroul nostru învață să se plimbe prin castel: tastezi `nord`, `sud`, `est` sau `vest`, iar jocul îți descrie camera în care ai ajuns. Folosim tablouri, un tablou cu două dimensiuni pentru ieșiri și o buclă principală de joc.
