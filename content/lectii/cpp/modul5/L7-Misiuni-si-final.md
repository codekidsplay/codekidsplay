# LECȚIA 7 — Misiuni și condiții de câștig
**Modulul 5 · Proiect RPG în consolă · 2 ore**  
**Code Maker Club · RPG Creator**

> Până acum eroul tău se plimbă, ia obiecte, se luptă și cumpără, dar jocul nu se termină niciodată. Azi îi dăm **un scop**: să învingă goblinul, să găsească cheia și să deschidă cufărul din turn. Adăugăm o listă de **misiuni** cu bife, **condițiile de câștig și de pierdere** și un ecran final cu scorul. Pentru asta folosim variabile `bool`, care țin minte ce s-a întâmplat în joc.  
> Proiect: **„Joc_L47.cpp”** · poți câștiga sau pierde jocul.

---

## Obiectiv
La finalul orei jocul are trei misiuni, comanda `misiuni` care le afișează cu bife, comanda `deschide` pentru cufărul din turn, un ecran de câștig (cufărul deschis) și unul de pierdere (viața ajunge la zero), amândouă cu scorul final.  
**Minim:** variabile `bool` pentru misiuni și un mesaj la câștig.  
**Ținta orei (Complet):** comanda `misiuni`, câștig și pierdere, scorul final și ieșirea corectă din bucla principală.

## De ce contează
Un joc fără sfârșit nu e un joc. Din punct de vedere al programării, azi înveți despre **starea jocului** ținută în variabile `bool` (steaguri, *flags*) și despre **condiții compuse** (`&&`, `||`, `!`). Același tipar apare peste tot: „utilizatorul este autentificat?”, „comanda a fost plătită?”, „nivelul este terminat?”.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `bool`, `&&`, `||`, `!` |
| 10–35 | Steaguri și lista de misiuni (**Exemplele 1 și 2**) |
| 35–60 | Condițiile de câștig și de pierdere (**Exemplele 3–5**) |
| 60–85 | Cufărul din turn și scorul final (**Exemplele 6–8**) |
| 85–100 | Jocul lecției, **Joc_L47.cpp** (**Exemplul 12**) |
| 100–118 | Idei în plus (**Exemplele 9–11**, opționale) și testare |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Steaguri și misiuni

### Exemplul 1 — Steagurile jocului **[Esențial]**

Un **steag** este o variabilă `bool` care ține minte un fapt: „goblinul a fost învins?”, „am găsit cheia?”, „cufărul este deschis?”. Toate pornesc cu `false`. Pe parcurs, jocul le schimbă în `true`. `boolalpha` face ca `cout` să scrie `true`/`false` în loc de `1`/`0`:

```cpp
#include <iostream>
using namespace std;

int main() {
    bool monstruInvins = false;
    bool cheiaGasita = false;
    bool cufarDeschis = false;
    cout << boolalpha;

    cout << "La inceput:  monstru " << monstruInvins << ", cheie " << cheiaGasita
         << ", cufar " << cufarDeschis << "\n";

    monstruInvins = true;
    cout << "Dupa lupta:  monstru " << monstruInvins << ", cheie " << cheiaGasita
         << ", cufar " << cufarDeschis << "\n";

    cheiaGasita = true;
    cout << "Dupa cheie:  monstru " << monstruInvins << ", cheie " << cheiaGasita
         << ", cufar " << cufarDeschis << "\n";
    return 0;
}
```

**Ieșire:**
```
La inceput:  monstru false, cheie false, cufar false
Dupa lupta:  monstru true, cheie false, cufar false
Dupa cheie:  monstru true, cheie true, cufar false
```

### Exemplul 2 — Lista de misiuni, cu bife **[Esențial]**

Lista de misiuni citește steagurile și afișează `[x]` pentru misiunile terminate și `[ ]` pentru celelalte. Expresia `(condiție ? "a" : "b")` alege între două texte:

```cpp
#include <iostream>
using namespace std;

void afiseazaMisiuni(bool monstruInvins, bool cheiaGasita, bool cufarDeschis) {
    cout << "--- Misiunile tale ---\n";
    cout << (monstruInvins ? "[x]" : "[ ]") << " Invinge goblinul din pivnita\n";
    cout << (cheiaGasita ? "[x]" : "[ ]") << " Gaseste cheia\n";
    cout << (cufarDeschis ? "[x]" : "[ ]") << " Deschide cufarul din Turn\n";
}

int main() {
    afiseazaMisiuni(false, false, false);
    cout << "\n";
    afiseazaMisiuni(true, true, false);
    cout << "\n";
    afiseazaMisiuni(true, true, true);
    return 0;
}
```

**Ieșire:**
```
--- Misiunile tale ---
[ ] Invinge goblinul din pivnita
[ ] Gaseste cheia
[ ] Deschide cufarul din Turn

--- Misiunile tale ---
[x] Invinge goblinul din pivnita
[x] Gaseste cheia
[ ] Deschide cufarul din Turn

--- Misiunile tale ---
[x] Invinge goblinul din pivnita
[x] Gaseste cheia
[x] Deschide cufarul din Turn
```

---

## 2. Câștig și pierdere

### Exemplul 3 — Condiția de deschidere: `&&` **[Esențial]**

Cufărul se deschide doar dacă eroul se află în **Turn** *și* are **cheia**. Cele două condiții se leagă cu `&&` („și”): rezultatul este `true` doar când ambele sunt adevărate:

```cpp
#include <iostream>
using namespace std;

const int CAMERA_TURN = 5;

int main() {
    cout << boolalpha;
    int camere[] = {1, 5};
    bool chei[] = {false, true};

    for (int camera : camere) {
        for (bool areCheia : chei) {
            bool poateDeschide = (camera == CAMERA_TURN) && areCheia;
            cout << "camera " << camera << ", cheie " << areCheia << " -> poate deschide: " << poateDeschide << "\n";
        }
    }
    return 0;
}
```

**Ieșire:**
```
camera 1, cheie false -> poate deschide: false
camera 1, cheie true -> poate deschide: false
camera 5, cheie false -> poate deschide: false
camera 5, cheie true -> poate deschide: true
```

Doar combinația „camera 5 *și* cheie” dă `true`. Alți operatori logici: `||` înseamnă „sau”, iar `!` înseamnă „nu”.

### Exemplul 4 — Condiția de pierdere **[Esențial]**

Jocul se pierde dacă viața eroului ajunge la `0`. Folosim funcția `esteViu` din lecția 2:

```cpp
#include <iostream>
using namespace std;

struct Jucator {
    int viata = 30;
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
    int lovituri[] = {8, 9, 7, 10};

    for (int lovitura : lovituri) {
        raneste(eroul, lovitura);
        cout << "Viata: " << eroul.viata << "\n";
        if (!esteViu(eroul)) {
            cout << "Ai pierdut...\n";
            break;
        }
    }
    return 0;
}
```

**Ieșire:**
```
Viata: 22
Viata: 13
Viata: 6
Viata: 0
Ai pierdut...
```

După cea de-a patra lovitură (8 + 9 + 7 + 10 = 34 ≥ 30), viața este `0`, iar `!esteViu(eroul)` oprește bucla.

### Exemplul 5 — Ecranul final: trei situații **[Esențial]**

Când bucla de joc se termină, trebuie să știm **de ce**: a câștigat, a pierdut sau a ieșit singur? Funcția `afiseazaFinal` alege mesajul. Dacă jucătorul doar a ieșit, nu afișăm nimic:

```cpp
#include <iostream>
#include <string>
using namespace std;

void afiseazaFinal(const string &nume, bool cufarDeschis, bool esteViu, int scor, int monede) {
    if (cufarDeschis) {
        cout << "*****************************\n";
        cout << "   FELICITARI, " << nume << "!\n";
        cout << "   Ai gasit comoara castelului!\n";
        cout << "*****************************\n";
    } else if (!esteViu) {
        cout << "Ai pierdut... Castelul isi pastreaza secretul.\n";
    } else {
        cout << "(ai iesit din joc)\n";
        return;
    }
    cout << "Scor final: " << scor + monede << "\n";
}

int main() {
    afiseazaFinal("Ana", true, true, 135, 25);
    cout << "\n";
    afiseazaFinal("Ana", false, false, 35, 0);
    cout << "\n";
    afiseazaFinal("Ana", false, true, 35, 10);
    return 0;
}
```

**Ieșire:**
```
*****************************
   FELICITARI, Ana!
   Ai gasit comoara castelului!
*****************************
Scor final: 160

Ai pierdut... Castelul isi pastreaza secretul.
Scor final: 35

(ai iesit din joc)
```

---

## 3. Cufărul și scorul

### Exemplul 6 — `deschide`: mesaje pentru fiecare caz **[Esențial]**

Comanda `deschide` poate eșua în trei feluri: ești în altă cameră, nu ai cheia sau cufărul e deja deschis. Verificăm cazurile greșite întâi, fiecare cu `return`, iar la sfârșit rămâne cazul fericit:

```cpp
#include <iostream>
using namespace std;

const int CAMERA_TURN = 5;

bool deschide(int camera, bool areCheia, bool &cufarDeschis) {
    if (camera != CAMERA_TURN) {
        cout << "Aici nu este niciun cufar.\n";
        return false;
    }
    if (cufarDeschis) {
        cout << "Cufarul este deja deschis.\n";
        return false;
    }
    if (!areCheia) {
        cout << "Cufarul este incuiat. Ai nevoie de o cheie.\n";
        return false;
    }
    cout << "Cheia se potriveste! Cufarul se deschide.\n";
    cufarDeschis = true;
    return true;
}

int main() {
    bool cufar = false;
    deschide(1, true, cufar);
    deschide(5, false, cufar);
    deschide(5, true, cufar);
    deschide(5, true, cufar);
    return 0;
}
```

**Ieșire:**
```
Aici nu este niciun cufar.
Cufarul este incuiat. Ai nevoie de o cheie.
Cheia se potriveste! Cufarul se deschide.
Cufarul este deja deschis.
```

Această tehnică, numită *verificări timpurii* (*guard clauses*), ține codul simplu: fiecare caz greșit este tratat și părăsit imediat.

### Exemplul 7 — Scorul final **[Esențial]**

Scorul final adună punctele câștigate (obiecte, monstru, cufăr) și monedele rămase. Iată cum se adună într-un joc complet câștigat:

```cpp
#include <iostream>
using namespace std;

int main() {
    int scor = 0;
    int monede = 10;

    scor += 5 * 3;      // 3 obiecte luate: 5 puncte fiecare
    scor += 20;         // monstrul invins
    monede += 15;       // recompensa de la monstru
    scor += 100;        // cufarul deschis

    cout << "Puncte:  " << scor << "\n";
    cout << "Monede:  " << monede << "\n";
    cout << "Total:   " << scor + monede << "\n";
    return 0;
}
```

**Ieșire:**
```
Puncte:  135
Monede:  25
Total:   160
```

### Exemplul 8 — Un indiciu pentru jucător

Dacă jucătorul nu știe ce are de făcut, jocul îl poate ajuta. Funcția `indiciu` privește steagurile în ordine și spune următorul pas:

```cpp
#include <iostream>
#include <string>
using namespace std;

string indiciu(bool monstruInvins, bool cheiaGasita, bool cufarDeschis) {
    if (cufarDeschis) {
        return "Ai terminat toate misiunile!";
    }
    if (!monstruInvins) {
        return "Coboara in pivnita si infrunta goblinul.";
    }
    if (!cheiaGasita) {
        return "Ia cheia din pivnita.";
    }
    return "Du cheia in Turn si deschide cufarul.";
}

int main() {
    cout << indiciu(false, false, false) << "\n";
    cout << indiciu(true, false, false) << "\n";
    cout << indiciu(true, true, false) << "\n";
    cout << indiciu(true, true, true) << "\n";
    return 0;
}
```

**Ieșire:**
```
Coboara in pivnita si infrunta goblinul.
Ia cheia din pivnita.
Du cheia in Turn si deschide cufarul.
Ai terminat toate misiunile!
```

---

## 4. Alte idei

### Exemplul 9 — Misiune secundară: colecționarul *(Provocare, opțional)*

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

O misiune secundară: „Adună cel puțin 3 obiecte”. Starea ei nu este un steag, ci se **calculează** din rucsac:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

bool colectionar(const vector<string> &inventar) {
    return inventar.size() >= 3;
}

int main() {
    vector<string> inventar;
    string de_luat[] = {"Sabie", "Potiune", "Cheie"};

    for (const string &o : de_luat) {
        inventar.push_back(o);
        cout << (colectionar(inventar) ? "[x]" : "[ ]") << " Adauga 3 obiecte (" << inventar.size() << "/3)\n";
    }
    return 0;
}
```

**Ieșire:**
```
[ ] Adauga 3 obiecte (1/3)
[ ] Adauga 3 obiecte (2/3)
[x] Adauga 3 obiecte (3/3)
```

### Exemplul 10 — Limită de mutări *(Provocare, opțional)*

Un joc poate avea o limită de timp, adică un număr maxim de mutări. Când se termină, jocul se pierde:

```cpp
#include <iostream>
using namespace std;

int main() {
    const int MAX_MUTARI = 5;
    int mutari = 0;
    bool gata = false;

    while (!gata) {
        mutari++;
        cout << "Mutarea " << mutari << " din " << MAX_MUTARI << "\n";
        if (mutari >= MAX_MUTARI) {
            cout << "Timpul a expirat! Ai pierdut.\n";
            gata = true;
        }
    }
    return 0;
}
```

**Ieșire:**
```
Mutarea 1 din 5
Mutarea 2 din 5
Mutarea 3 din 5
Mutarea 4 din 5
Mutarea 5 din 5
Timpul a expirat! Ai pierdut.
```

### Exemplul 11 — Mai multe finaluri *(Provocare, opțional)*

Scorul final poate decide **ce fel de final** vezi:

```cpp
#include <iostream>
#include <string>
using namespace std;

string finalPentru(int total) {
    if (total >= 160) {
        return "Final de aur: toti din regat te cunosc!";
    }
    if (total >= 120) {
        return "Final de argint: o aventura reusita.";
    }
    return "Final de bronz: ai reusit, dar poti mai mult.";
}

int main() {
    int totaluri[] = {170, 130, 90};
    for (int t : totaluri) {
        cout << "Total " << t << ": " << finalPentru(t) << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Total 170: Final de aur: toti din regat te cunosc!
Total 130: Final de argint: o aventura reusita.
Total 90: Final de bronz: ai reusit, dar poti mai mult.
```

---

## 5. Jocul lecției

### Exemplul 12 — **Joc_L47.cpp**: poți câștiga sau pierde **[Esențial]**

Pornim de la **Joc_L46.cpp**. Adăugăm în `Joc` cele două steaguri noi, `cheiaGasita` și `cufarDeschis`; funcțiile `afiseazaMisiuni`, `deschideCufar` și `afiseazaFinal`; comenzile `deschide` și `misiuni` și apelul `afiseazaFinal(g)` la sfârșitul lui `joaca`. În `iaObiect`, când eroul ia cheia, `cheiaGasita` devine `true`. Constanta `CAMERA_TURN` apare acum.

Iată ce s-a **schimbat** față de lecția trecută (`+` = linii de adăugat, `-` = linii de șters, `...` = restul codului rămâne la fel):

```diff
...
 const int CAMERA_BUCATARIA = 3;
 const int CAMERA_PIVNITA = 4;
+const int CAMERA_TURN = 5;
 
 const string DIRECTII[4] = {"nord", "sud", "est", "vest"};
...
     string obiect[NR_CAMERE];
     bool monstruInvins = false;
+    bool cheiaGasita = false;
+    bool cufarDeschis = false;
 };
 struct Monstru {
...
     cout << "  foloseste              - folosesti un obiect\n";
     cout << "  magazin                - cumperi si vinzi (doar in Sala Mare)\n";
+    cout << "  deschide               - deschizi cufarul (doar in Turn)\n";
+    cout << "  misiuni                - vezi ce ai de facut\n";
     cout << "  ajutor                 - afisezi aceasta lista\n";
     cout << "  iesire                 - parasesti jocul\n";
...
     g.j.inventar.push_back(obiect);
     g.j.scor += 5;
+    if (obiect == "Cheie") {
+        g.cheiaGasita = true;
+    }
     obiect = "";
 }
...
 
 // ---------- misiuni si final ----------
+void afiseazaMisiuni(const Joc &g) {
+    cout << "\n--- Misiunile tale ---\n";
+    cout << (g.monstruInvins ? "[x]" : "[ ]") << " Invinge goblinul din pivnita\n";
+    cout << (g.cheiaGasita ? "[x]" : "[ ]") << " Gaseste cheia\n";
+    cout << (g.cufarDeschis ? "[x]" : "[ ]") << " Deschide cufarul din Turn\n";
+}
+
+void deschideCufar(Joc &g) {
+    if (g.j.camera != CAMERA_TURN) {
+        cout << "Aici nu este niciun cufar.\n";
+        return;
+    }
+    if (pozitie(g.j.inventar, "Cheie") < 0) {
+        cout << "Cufarul este incuiat. Ai nevoie de o cheie.\n";
+        return;
+    }
+    cout << "Cheia se potriveste! Cufarul se deschide si lumineaza tot turnul.\n";
+    g.cufarDeschis = true;
+    g.j.scor += 100;
+    g.gata = true;
+}
+void afiseazaFinal(const Joc &g) {
+    if (g.cufarDeschis) {
+        cout << "\n*****************************\n";
+        cout << "   FELICITARI, " << g.j.nume << "!\n";
+        cout << "   Ai gasit comoara castelului!\n";
+        cout << "*****************************\n";
+    } else if (!esteViu(g.j)) {
+        cout << "\nAi pierdut... Castelul isi pastreaza secretul.\n";
+    } else {
+        return;
+    }
+    cout << "Scor final: " << g.j.scor + g.j.monede << "\n";
+}
 
 // ---------- salvare ----------
...
         } else if (cmd == "magazin") {
             magazin(g);
+        } else if (cmd == "deschide") {
+            deschideCufar(g);
+        } else if (cmd == "misiuni") {
+            afiseazaMisiuni(g);
         } else if (cmd == "iesire") {
             g.gata = true;
...
         }
         if (!esteViu(g.j)) {
-            cout << "\nAi pierdut. Jocul s-a terminat.\n";
             g.gata = true;
         }
     }
+    afiseazaFinal(g);
 }
```

Observă bucla din `joaca`: ea se oprește când `g.gata` devine `true`. Se întâmplă în trei situații: jucătorul scrie `iesire`, eroul rămâne fără viață sau cufărul este deschis. Abia apoi `afiseazaFinal` decide ce mesaj afișăm.

<details>
<summary>Fișierul complet <code>Joc_L47.cpp</code> (ca să compari cu al tău)</summary>

```cpp
/*
   Joc RPG in consola: CASTELUL UITAT
   Fisier: Joc_L47.cpp
   Autor:  Prenume Nume
*/
#include <iostream>
#include <string>
#include <limits>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

// ---------- constante ----------
const string NUME_JOC = "CASTELUL UITAT";
const int NR_CAMERE = 6;
const int NORD = 0;
const int SUD = 1;
const int EST = 2;
const int VEST = 3;

const int CAMERA_POARTA = 0;
const int CAMERA_SALA = 1;
const int CAMERA_ARMURARIA = 2;
const int CAMERA_BUCATARIA = 3;
const int CAMERA_PIVNITA = 4;
const int CAMERA_TURN = 5;

const string DIRECTII[4] = {"nord", "sud", "est", "vest"};

const string NUME_CAMERA[NR_CAMERE] = {
    "Poarta castelului", "Sala Mare", "Armuraria",
    "Bucataria", "Pivnita", "Turnul"
};

const string DESCRIERE[NR_CAMERE] = {
    "Poarta veche, ruginita, scartaie in vant. In fata ta se vede Sala Mare.",
    "O sala uriasa, cu un candelabru plin de panze de paianjen. Un negustor ciudat zambeste in colt.",
    "Pe pereti atarna scuturi si sulite ruginite. Aici se pastreaza armele castelului.",
    "Oale mari, cuptoare reci si miros de supa veche. O scara coboara spre pivnita.",
    "Un loc intunecat si umed, cu butoaie sparte. Se aude un mormait.",
    "Camera din varful turnului. In mijloc sta un cufar greu, incuiat."
};

// iesirile fiecarei camere, in ordinea: nord, sud, est, vest (-1 = nu exista)
const int IESIRI[NR_CAMERE][4] = {
    {1, -1, -1, -1},
    {5, 0, 3, 2},
    {-1, -1, 1, -1},
    {-1, 4, -1, 1},
    {3, -1, -1, -1},
    {-1, 1, -1, -1}
};
const int NR_PRODUSE = 4;
const string PRODUS[NR_PRODUSE] = {"Potiune", "Elixir", "Scut", "Amuleta"};
const int PRET[NR_PRODUSE] = {8, 15, 12, 20};

// ---------- structuri ----------
struct Jucator {
    string nume;
    int viata = 30;
    int viataMax = 30;
    int atac = 5;
    int monede = 10;
    int scor = 0;
    int camera = CAMERA_POARTA;
    vector<string> inventar;
};
struct Joc {
    Jucator j;
    bool gata = false;
    string obiect[NR_CAMERE];
    bool monstruInvins = false;
    bool cheiaGasita = false;
    bool cufarDeschis = false;
};
struct Monstru {
    string nume;
    int viata;
    int viataMax;
    int atac;
    int recompensa;
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

int zar(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
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

int pozitie(const vector<string> &lista, const string &nume) {
    for (size_t i = 0; i < lista.size(); i++) {
        if (lista[i] == nume) {
            return (int)i;
        }
    }
    return -1;
}

int atacTotal(const Jucator &j) {
    int total = j.atac;
    if (pozitie(j.inventar, "Sabie") >= 0) {
        total += 3;
    }
    if (pozitie(j.inventar, "Amuleta") >= 0) {
        total += 2;
    }
    return total;
}

int aparare(const Jucator &j) {
    if (pozitie(j.inventar, "Scut") >= 0) {
        return 2;
    }
    return 0;
}

void afiseazaStare(const Jucator &j) {
    cout << "--- " << j.nume << " ---\n";
    cout << "Viata:  " << bara(j.viata, j.viataMax) << " " << j.viata << "/" << j.viataMax << "\n";
    cout << "Atac:   " << j.atac << "\n";
    cout << "Monede: " << j.monede << "\n";
    cout << "Scor:   " << j.scor << "\n";
    cout << "Locatie: " << NUME_CAMERA[j.camera] << "\n";
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

void afiseazaAjutor() {
    cout << "\nComenzi:\n";
    cout << "  nord, sud, est, vest   - te muti (sau n, s, e, v)\n";
    cout << "  stare                  - vezi viata, monedele, scorul\n";
    cout << "  harta                  - vezi harta castelului\n";
    cout << "  ia                     - iei obiectul din camera\n";
    cout << "  inventar               - vezi ce ai in rucsac\n";
    cout << "  foloseste              - folosesti un obiect\n";
    cout << "  magazin                - cumperi si vinzi (doar in Sala Mare)\n";
    cout << "  deschide               - deschizi cufarul (doar in Turn)\n";
    cout << "  misiuni                - vezi ce ai de facut\n";
    cout << "  ajutor                 - afisezi aceasta lista\n";
    cout << "  iesire                 - parasesti jocul\n";
}

// ---------- lumea jocului ----------
int directieDin(const string &cmd) {
    if (cmd == "nord" || cmd == "n") {
        return NORD;
    }
    if (cmd == "sud" || cmd == "s") {
        return SUD;
    }
    if (cmd == "est" || cmd == "e") {
        return EST;
    }
    if (cmd == "vest" || cmd == "v") {
        return VEST;
    }
    return -1;
}

void descrieCamera(const Joc &g) {
    int c = g.j.camera;
    cout << "\n== " << NUME_CAMERA[c] << " ==\n";
    cout << DESCRIERE[c] << "\n";
    if (!g.obiect[c].empty()) {
        cout << "Pe jos se afla: " << g.obiect[c] << ".\n";
    }
    cout << "Iesiri:";
    for (int d = 0; d < 4; d++) {
        if (IESIRI[c][d] >= 0) {
            cout << " " << DIRECTII[d];
        }
    }
    cout << "\n";
}

bool muta(Joc &g, int directie) {
    int urmatoarea = IESIRI[g.j.camera][directie];
    if (urmatoarea < 0) {
        cout << "Nu poti merge in directia aceea.\n";
        return false;
    }
    g.j.camera = urmatoarea;
    return true;
}

void initObiecte(Joc &g) {
    g.obiect[CAMERA_ARMURARIA] = "Sabie";
    g.obiect[CAMERA_BUCATARIA] = "Potiune";
    g.obiect[CAMERA_PIVNITA] = "Cheie";
}

void iaObiect(Joc &g) {
    string &obiect = g.obiect[g.j.camera];
    if (obiect.empty()) {
        cout << "Nu este nimic de luat aici.\n";
        return;
    }
    cout << "Ai luat: " << obiect << ".\n";
    g.j.inventar.push_back(obiect);
    g.j.scor += 5;
    if (obiect == "Cheie") {
        g.cheiaGasita = true;
    }
    obiect = "";
}

void afiseazaInventar(const Jucator &j) {
    if (j.inventar.empty()) {
        cout << "Rucsacul este gol.\n";
        return;
    }
    cout << "In rucsac:\n";
    for (size_t i = 0; i < j.inventar.size(); i++) {
        cout << "  " << i + 1 << ". " << j.inventar[i] << "\n";
    }
}

void foloseste(Joc &g) {
    string nume;
    cout << "Ce obiect folosesti? ";
    cin >> nume;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    int p = pozitie(g.j.inventar, nume);
    if (p < 0) {
        cout << "Nu ai asa ceva in rucsac.\n";
        return;
    }
    if (nume == "Potiune") {
        vindeca(g.j, 15);
        cout << "Bei potiunea. Te simti mai bine!\n";
        g.j.inventar.erase(g.j.inventar.begin() + p);
    } else if (nume == "Elixir") {
        vindeca(g.j, 30);
        cout << "Bei elixirul. Ai din nou putere!\n";
        g.j.inventar.erase(g.j.inventar.begin() + p);
    } else {
        cout << nume << " nu se foloseste asa. Il porti la tine si te ajuta singur.\n";
    }
}

// ---------- lupta ----------
void lupta(Joc &g) {
    Monstru m = {"Goblin", 14, 14, 4, 15};
    cout << "\n!!! Un " << m.nume << " iti iese in cale !!!\n";
    while (m.viata > 0 && esteViu(g.j)) {
        cout << "\n" << g.j.nume << " " << bara(g.j.viata, g.j.viataMax) << " " << g.j.viata;
        cout << "   |   " << m.nume << " " << bara(m.viata, m.viataMax) << " " << m.viata << "\n";
        int alegere = citesteInt("1 Ataca   2 Potiune   3 Fugi: ", 1, 3);
        if (alegere == 1) {
            int lovitura = atacTotal(g.j) + zar(0, 2);
            m.viata -= lovitura;
            cout << "Il lovesti pe " << m.nume << " cu " << lovitura << " puncte!\n";
        } else if (alegere == 2) {
            int p = pozitie(g.j.inventar, "Potiune");
            if (p < 0) {
                cout << "Nu ai nicio potiune!\n";
                continue;
            }
            vindeca(g.j, 15);
            g.j.inventar.erase(g.j.inventar.begin() + p);
            cout << "Bei o potiune si te simti mai bine.\n";
        } else {
            cout << "Fugi inapoi in Bucatarie!\n";
            g.j.camera = CAMERA_BUCATARIA;
            return;
        }
        if (m.viata <= 0) {
            break;
        }
        int dauna = m.atac + zar(0, 2) - aparare(g.j);
        if (dauna < 1) {
            dauna = 1;
        }
        raneste(g.j, dauna);
        cout << m.nume << " te loveste cu " << dauna << " puncte!\n";
    }
    if (esteViu(g.j)) {
        cout << "\nAi invins " << m.nume << "! Primesti " << m.recompensa << " monede.\n";
        g.j.monede += m.recompensa;
        g.j.scor += 20;
        g.monstruInvins = true;
    }
}

// ---------- magazinul ----------
int pretVanzare(const string &nume) {
    for (int i = 0; i < NR_PRODUSE; i++) {
        if (PRODUS[i] == nume) {
            return PRET[i] / 2;
        }
    }
    return 4;
}

void cumpara(Jucator &j, int i) {
    if (j.monede < PRET[i]) {
        cout << "Nu ai destule monede (iti trebuie " << PRET[i] << ").\n";
        return;
    }
    j.monede -= PRET[i];
    j.inventar.push_back(PRODUS[i]);
    cout << "Ai cumparat: " << PRODUS[i] << ".\n";
}

void vinde(Jucator &j) {
    if (j.inventar.empty()) {
        cout << "Nu ai nimic de vandut.\n";
        return;
    }
    cout << "Ce vinzi?\n";
    for (size_t i = 0; i < j.inventar.size(); i++) {
        cout << "  " << i + 1 << ". " << j.inventar[i] << " (" << pretVanzare(j.inventar[i]) << " monede)\n";
    }
    int nr = citesteInt("Numarul obiectului (0 = renunt): ", 0, (int)j.inventar.size());
    if (nr == 0) {
        return;
    }
    string nume = j.inventar[nr - 1];
    if (nume == "Cheie") {
        cout << "Cheia nu se vinde! Fara ea nu poti deschide cufarul.\n";
        return;
    }
    j.monede += pretVanzare(nume);
    j.inventar.erase(j.inventar.begin() + (nr - 1));
    cout << "Ai vandut: " << nume << ".\n";
}

void magazin(Joc &g) {
    if (g.j.camera != CAMERA_SALA) {
        cout << "Negustorul nu este aici. Il gasesti in Sala Mare.\n";
        return;
    }
    int optiune;
    do {
        cout << "\n=== Negustorul Pip === (monedele tale: " << g.j.monede << ")\n";
        for (int i = 0; i < NR_PRODUSE; i++) {
            cout << "  " << i + 1 << ". " << PRODUS[i] << " - " << PRET[i] << " monede\n";
        }
        cout << "  " << NR_PRODUSE + 1 << ". Vinde un obiect\n";
        cout << "  0. Iesi din magazin\n";
        optiune = citesteInt("Alege: ", 0, NR_PRODUSE + 1);
        if (optiune >= 1 && optiune <= NR_PRODUSE) {
            cumpara(g.j, optiune - 1);
        } else if (optiune == NR_PRODUSE + 1) {
            vinde(g.j);
        }
    } while (optiune != 0);
}

// ---------- misiuni si final ----------
void afiseazaMisiuni(const Joc &g) {
    cout << "\n--- Misiunile tale ---\n";
    cout << (g.monstruInvins ? "[x]" : "[ ]") << " Invinge goblinul din pivnita\n";
    cout << (g.cheiaGasita ? "[x]" : "[ ]") << " Gaseste cheia\n";
    cout << (g.cufarDeschis ? "[x]" : "[ ]") << " Deschide cufarul din Turn\n";
}

void deschideCufar(Joc &g) {
    if (g.j.camera != CAMERA_TURN) {
        cout << "Aici nu este niciun cufar.\n";
        return;
    }
    if (pozitie(g.j.inventar, "Cheie") < 0) {
        cout << "Cufarul este incuiat. Ai nevoie de o cheie.\n";
        return;
    }
    cout << "Cheia se potriveste! Cufarul se deschide si lumineaza tot turnul.\n";
    g.cufarDeschis = true;
    g.j.scor += 100;
    g.gata = true;
}
void afiseazaFinal(const Joc &g) {
    if (g.cufarDeschis) {
        cout << "\n*****************************\n";
        cout << "   FELICITARI, " << g.j.nume << "!\n";
        cout << "   Ai gasit comoara castelului!\n";
        cout << "*****************************\n";
    } else if (!esteViu(g.j)) {
        cout << "\nAi pierdut... Castelul isi pastreaza secretul.\n";
    } else {
        return;
    }
    cout << "Scor final: " << g.j.scor + g.j.monede << "\n";
}

// ---------- salvare ----------

// ---------- teste ----------

// ---------- bucla jocului ----------
void dupaMutare(Joc &g) {
    descrieCamera(g);
    if (g.j.camera == CAMERA_PIVNITA && !g.monstruInvins) {
        lupta(g);
        if (esteViu(g.j) && g.j.camera != CAMERA_PIVNITA) {
            descrieCamera(g);
        }
    }
}

void joaca(Joc &g) {
    descrieCamera(g);
    string cmd;
    while (!g.gata) {
        cout << "\n> ";
        if (!(cin >> cmd)) {
            break;
        }
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        int d = directieDin(cmd);
        if (d >= 0) {
            if (muta(g, d)) {
                dupaMutare(g);
            }
        } else if (cmd == "stare") {
            afiseazaStare(g.j);
        } else if (cmd == "harta") {
            afiseazaHarta(g.j.camera);
        } else if (cmd == "ajutor") {
            afiseazaAjutor();
        } else if (cmd == "ia") {
            iaObiect(g);
        } else if (cmd == "inventar") {
            afiseazaInventar(g.j);
        } else if (cmd == "foloseste") {
            foloseste(g);
        } else if (cmd == "magazin") {
            magazin(g);
        } else if (cmd == "deschide") {
            deschideCufar(g);
        } else if (cmd == "misiuni") {
            afiseazaMisiuni(g);
        } else if (cmd == "iesire") {
            g.gata = true;
        } else {
            cout << "Nu inteleg comanda. Scrie ajutor.\n";
        }
        if (!esteViu(g.j)) {
            g.gata = true;
        }
    }
    afiseazaFinal(g);
}

// ---------- meniul principal ----------
void jocNou() {
    Joc g;
    g.j = creeazaJucator();
    initObiecte(g);
    joaca(g);
}

void afiseazaMeniu() {
    afiseazaTitlu();
    cout << "  1. Joc nou\n";
    cout << "  2. Harta castelului\n";
    cout << "  3. Cum se joaca\n";
    cout << "  0. Iesire\n";
}

int main() {
    srand((unsigned)time(0));
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
                afiseazaAjutor();
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

**Exemplu de rulare** (tastezi `1`, `Ana`, `nord`, `vest`, `ia`, `est`, `est`, `ia`, `misiuni`, `sud`, `1`, `1`, `ia`, `nord`, `vest`, `nord`, `deschide`, `0`; la tine zarurile dau alte rezultate):
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

== Poarta castelului ==
Poarta veche, ruginita, scartaie in vant. In fata ta se vede Sala Mare.
Iesiri: nord

> nord

== Sala Mare ==
O sala uriasa, cu un candelabru plin de panze de paianjen. Un negustor ciudat zambeste in colt.
Iesiri: nord sud est vest

> vest

== Armuraria ==
Pe pereti atarna scuturi si sulite ruginite. Aici se pastreaza armele castelului.
Pe jos se afla: Sabie.
Iesiri: est

> ia
Ai luat: Sabie.

> est

== Sala Mare ==
O sala uriasa, cu un candelabru plin de panze de paianjen. Un negustor ciudat zambeste in colt.
Iesiri: nord sud est vest

> est

== Bucataria ==
Oale mari, cuptoare reci si miros de supa veche. O scara coboara spre pivnita.
Pe jos se afla: Potiune.
Iesiri: sud vest

> ia
Ai luat: Potiune.

> misiuni

--- Misiunile tale ---
[ ] Invinge goblinul din pivnita
[ ] Gaseste cheia
[ ] Deschide cufarul din Turn

> sud

== Pivnita ==
Un loc intunecat si umed, cu butoaie sparte. Se aude un mormait.
Pe jos se afla: Cheie.
Iesiri: nord

!!! Un Goblin iti iese in cale !!!

Ana [##########] 30   |   Goblin [##########] 14
1 Ataca   2 Potiune   3 Fugi: 1
Il lovesti pe Goblin cu 9 puncte!
Goblin te loveste cu 6 puncte!

Ana [########..] 24   |   Goblin [###.......] 5
1 Ataca   2 Potiune   3 Fugi: 1
Il lovesti pe Goblin cu 8 puncte!

Ai invins Goblin! Primesti 15 monede.

> ia
Ai luat: Cheie.

> nord

== Bucataria ==
Oale mari, cuptoare reci si miros de supa veche. O scara coboara spre pivnita.
Iesiri: sud vest

> vest

== Sala Mare ==
O sala uriasa, cu un candelabru plin de panze de paianjen. Un negustor ciudat zambeste in colt.
Iesiri: nord sud est vest

> nord

== Turnul ==
Camera din varful turnului. In mijloc sta un cufar greu, incuiat.
Iesiri: sud

> deschide
Cheia se potriveste! Cufarul se deschide si lumineaza tot turnul.

*****************************
   FELICITARI, Ana!
   Ai gasit comoara castelului!
*****************************
Scor final: 160

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

### Exercițiul A — Joc_L47.cpp (obligatoriu)
Scrie programul din Exemplul 12, pornind de la `Joc_L46.cpp`. Joacă-l până la capăt: câștigă o dată, pierde o dată (lasă goblinul să te învingă) și ieși o dată cu `iesire`. Verifică cele trei ecrane.

### Exercițiul B — Misiunile tale
Schimbă misiunile după povestea ta (de exemplu: „Găsește harta”, „Salvează prințesa”). Actualizează lista din `afiseazaMisiuni` și condiția de câștig din `deschideCufar`.

### Exercițiul C — Comanda `indiciu`
Adaugă comanda `indiciu`, care spune jucătorului următorul pas (Exemplul 8), în funcție de steaguri.

### Exercițiul D — Misiune secundară *(Provocare, opțional)*
Adaugă misiunea „Cumpără un obiect de la negustor” (un steag `aCumparat`, setat în `cumpara`) și afișeaz-o în lista de misiuni.

### Exercițiul E — Finaluri diferite *(Provocare, opțional)*
Folosește Exemplul 11 și afișează un final diferit în funcție de scor.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Lista de misiuni se actualizează pe măsură ce joci  
- [ ] Poți câștiga (cufărul deschis) și poți pierde (viața `0`)  
- [ ] Cufărul nu se deschide fără cheie sau în altă cameră  
- [ ] Ieșirea cu `iesire` nu afișează mesaj de câștig sau de pierdere  
- [ ] Ai salvat fișierul ca `Joc_L47.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă un al doilea cufăr (într-o altă cameră) cu altă cheie  
- [ ] Afișează timpul de joc (caută `<chrono>` sau `time(0)`) pe ecranul final  
- [ ] Adaugă un „clasament” al scorurilor într-un fișier (te pregătește pentru lecția 8)  
- [ ] Fă ca unele obiecte să apară abia după ce îndeplinești o misiune  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Cufărul se deschide fără cheie | Condiție incompletă | Verifică `pozitie(inventar, "Cheie") >= 0` |
| Jocul nu se termină după ce deschizi cufărul | Nu ai pus `g.gata = true` | Setează `gata` în `deschideCufar` |
| Apare „Ai pierdut” când ieși cu `iesire` | `afiseazaFinal` nu verifică motivul | `if (cufarDeschis) … else if (!esteViu) … else return;` |
| Lista de misiuni nu se schimbă | Steagul nu este actualizat | `g.monstruInvins = true;` după luptă, `g.cheiaGasita = true;` la `ia` |
| `=` în loc de `==` într-o condiție | Greșeală de tastare | `if (camera == CAMERA_TURN)`; compilatorul poate avertiza |
| Folosești `&` în loc de `&&` | Sunt operatori diferiți | `&&` = „și” logic |
| Câștigi și pierzi în același timp | Ordinea verificărilor | Verifică întâi câștigul, apoi pierderea |

---

## Recapitulare pe scurt

- Un **steag** este o variabilă `bool` care ține minte un fapt din joc.
- Condițiile compuse: `&&` (și), `||` (sau), `!` (nu).
- `cond ? "a" : "b"` alege un text în funcție de o condiție.
- Câștig: cufărul deschis (în Turn, cu cheia). Pierdere: viața `0`. Ieșire: `iesire`.
- *Verificările timpurii* (cazurile greșite cu `return`) fac funcțiile ușor de citit.
- Scorul final = puncte + monede.

---

## Temă
1. Termină Exercițiul A și joacă toate cele trei finaluri.  
2. Joacă jocul cu un coleg sau un părinte, **fără să-i explici nimic**, și notează unde se încurcă sau ce nu înțelege.  
3. Gândește-te: ce ar trebui să rămână dacă jucătorul închide jocul la jumătate? Scrie pe hârtie ce date trebuie salvate.  
4. Salvează tot ca `Joc_L47.cpp`.

---

## Ce urmează — Lecția 8
**Salvare și încărcare.** Până acum, dacă închizi jocul, pierzi totul. Folosim fișierele (`ofstream` și `ifstream`) ca să salvăm eroul, rucsacul și starea camerelor și să ne continuăm aventura data viitoare.
