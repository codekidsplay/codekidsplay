# LECȚIA 6 — Magazin și monede
**Modulul 5 · Proiect RPG în consolă · 2 ore**  
**Code Kids Play · RPG Creator**

> Eroul tău a câștigat monede în luptă. E timpul să le cheltuiască! În **Sala Mare** își are tejgheaua **negustorul Pip**: vinde poțiuni, elixiruri, un scut și o amuletă, iar cumpără înapoi (la jumătate de preț) ce nu mai folosești. Azi scriem magazinul: o listă de produse, cumpărarea cu verificarea monedelor, vânzarea și obiectele care te ajută singure în luptă.  
> Proiect: **„Joc_L46.cpp”** · negustorul Pip își deschide magazinul.

---

## Obiectiv
La finalul orei jocul are un magazin cu patru produse. Eroul poate cumpăra (dacă are destule monede), poate vinde obiecte din rucsac și își vede efectul în luptă: scutul reduce loviturile primite, iar amuleta îi crește atacul. Elixirul vindecă mai mult decât poțiunea.  
**Minim:** o listă de produse cu prețuri și o funcție `cumpara` care verifică monedele.  
**Ținta orei (Complet):** meniul magazinului, `vinde`, produsele care îți dau bonusuri și integrarea în joc.

## De ce contează
Orice aplicație cu cumpărare funcționează la fel: o listă de produse, o verificare („ai destui bani?”) și o modificare a stării (bani mai puțini, obiect în plus). Tabloul de produse, cu două tablouri „paralele” (nume și preț), este o tehnică simplă pe care ai folosit-o și în Modulul 2. Fii atent la **validări**: un magazin care te lasă să cumperi fără bani sau să vinzi ce nu ai este un magazin stricat.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: tablouri, `vector`, `struct`, funcții cu `&` |
| 10–30 | Produsele și prețurile (**Exemplele 1 și 2**) |
| 30–55 | `cumpara`, meniul magazinului (**Exemplele 3–5**) |
| 55–80 | Vânzarea (**Exemplul 6**) |
| 80–100 | Bonusuri din obiecte, elixirul (**Exemplele 7 și 8**) |
| 100–118 | Jocul lecției, **Joc_L46.cpp** (**Exemplul 12**; Exemplele 9–11 sunt opționale) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Produsele

### Exemplul 1 — Lista de produse **[Esențial]**

Ținem produsele în **două tablouri paralele**: unul cu numele, unul cu prețurile. Produsul de pe poziția `i` are numele `PRODUS[i]` și prețul `PRET[i]`:

```cpp
#include <iostream>
#include <string>
using namespace std;

const int NR_PRODUSE = 4;
const string PRODUS[NR_PRODUSE] = {"Potiune", "Elixir", "Scut", "Amuleta"};
const int PRET[NR_PRODUSE] = {8, 15, 12, 20};

int main() {
    cout << "=== Negustorul Pip ===\n";
    for (int i = 0; i < NR_PRODUSE; i++) {
        cout << "  " << i + 1 << ". " << PRODUS[i] << " - " << PRET[i] << " monede\n";
    }
    return 0;
}
```

**Ieșire:**
```
=== Negustorul Pip ===
  1. Potiune - 8 monede
  2. Elixir - 15 monede
  3. Scut - 12 monede
  4. Amuleta - 20 monede
```

Pentru jucător numerotăm de la `1`; în program poziția începe de la `0`. Tema ta: schimbă produsele și prețurile după tema jocului.

### Exemplul 2 — Cumpărarea, cu verificare **[Esențial]**

Regula magazinului: poți cumpăra doar dacă ai **cel puțin** atâtea monede cât costă produsul. După cumpărare, monedele scad:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int monede = 20;
    string produs = "Scut";
    int pret = 12;

    cout << "Ai " << monede << " monede. Vrei sa cumperi: " << produs << " (" << pret << ")\n";
    if (monede >= pret) {
        monede -= pret;
        cout << "Cumparat! Ti-au ramas " << monede << " monede.\n";
    } else {
        cout << "Nu ai destule monede.\n";
    }

    produs = "Amuleta";
    pret = 20;
    cout << "Vrei sa cumperi: " << produs << " (" << pret << ")\n";
    if (monede >= pret) {
        monede -= pret;
        cout << "Cumparat! Ti-au ramas " << monede << " monede.\n";
    } else {
        cout << "Nu ai destule monede (iti trebuie " << pret << ", ai " << monede << ").\n";
    }
    return 0;
}
```

**Ieșire:**
```
Ai 20 monede. Vrei sa cumperi: Scut (12)
Cumparat! Ti-au ramas 8 monede.
Vrei sa cumperi: Amuleta (20)
Nu ai destule monede (iti trebuie 20, ai 8).
```

---

## 2. Funcția `cumpara` și meniul

### Exemplul 3 — `cumpara`: monede, rucsac, mesaj **[Esențial]**

Punem regula într-o funcție care primește eroul (prin `&`, pentru că îl modifică) și numărul produsului. Dacă are monede, plătește și produsul intră în rucsac:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int NR_PRODUSE = 4;
const string PRODUS[NR_PRODUSE] = {"Potiune", "Elixir", "Scut", "Amuleta"};
const int PRET[NR_PRODUSE] = {8, 15, 12, 20};

struct Jucator {
    string nume = "Ana";
    int monede = 20;
    vector<string> inventar;
};

void cumpara(Jucator &j, int i) {
    if (j.monede < PRET[i]) {
        cout << "Nu ai destule monede (iti trebuie " << PRET[i] << ").\n";
        return;
    }
    j.monede -= PRET[i];
    j.inventar.push_back(PRODUS[i]);
    cout << "Ai cumparat: " << PRODUS[i] << ".\n";
}

int main() {
    Jucator eroul;
    cumpara(eroul, 0);
    cumpara(eroul, 2);
    cumpara(eroul, 3);

    cout << "Monede ramase: " << eroul.monede << "\n";
    cout << "In rucsac:";
    for (const string &o : eroul.inventar) {
        cout << " [" << o << "]";
    }
    cout << "\n";
    return 0;
}
```

**Ieșire:**
```
Ai cumparat: Potiune.
Ai cumparat: Scut.
Nu ai destule monede (iti trebuie 20).
Monede ramase: 0
In rucsac: [Potiune] [Scut]
```

Cu 20 de monede: poțiunea costă 8 (rămân 12), scutul 12 (rămân 0), iar amuleta (20) nu mai poate fi cumpărată.

### Exemplul 4 — Meniul magazinului **[Esențial]**

Jucătorul rămâne în magazin cât timp vrea. Meniul se repetă cu `do … while` până când alege `0`:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <limits>
using namespace std;

const int NR_PRODUSE = 4;
const string PRODUS[NR_PRODUSE] = {"Potiune", "Elixir", "Scut", "Amuleta"};
const int PRET[NR_PRODUSE] = {8, 15, 12, 20};

struct Jucator {
    int monede = 20;
    vector<string> inventar;
};

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

void cumpara(Jucator &j, int i) {
    if (j.monede < PRET[i]) {
        cout << "Nu ai destule monede (iti trebuie " << PRET[i] << ").\n";
        return;
    }
    j.monede -= PRET[i];
    j.inventar.push_back(PRODUS[i]);
    cout << "Ai cumparat: " << PRODUS[i] << ".\n";
}

int main() {
    Jucator eroul;
    int optiune;
    do {
        cout << "\n=== Negustorul Pip === (monedele tale: " << eroul.monede << ")\n";
        for (int i = 0; i < NR_PRODUSE; i++) {
            cout << "  " << i + 1 << ". " << PRODUS[i] << " - " << PRET[i] << " monede\n";
        }
        cout << "  0. Iesi din magazin\n";
        optiune = citesteInt("Alege: ", 0, NR_PRODUSE);
        if (optiune >= 1) {
            cumpara(eroul, optiune - 1);
        }
    } while (optiune != 0);
    cout << "La revedere!\n";
    return 0;
}
```

**Rulare** (tastezi `1`, `3`, `3`, `9`, `0`):
```

=== Negustorul Pip === (monedele tale: 20)
  1. Potiune - 8 monede
  2. Elixir - 15 monede
  3. Scut - 12 monede
  4. Amuleta - 20 monede
  0. Iesi din magazin
Alege: 1
Ai cumparat: Potiune.

=== Negustorul Pip === (monedele tale: 12)
  1. Potiune - 8 monede
  2. Elixir - 15 monede
  3. Scut - 12 monede
  4. Amuleta - 20 monede
  0. Iesi din magazin
Alege: 3
Ai cumparat: Scut.

=== Negustorul Pip === (monedele tale: 0)
  1. Potiune - 8 monede
  2. Elixir - 15 monede
  3. Scut - 12 monede
  4. Amuleta - 20 monede
  0. Iesi din magazin
Alege: 3
Nu ai destule monede (iti trebuie 12).

=== Negustorul Pip === (monedele tale: 0)
  1. Potiune - 8 monede
  2. Elixir - 15 monede
  3. Scut - 12 monede
  4. Amuleta - 20 monede
  0. Iesi din magazin
Alege: 9
Valoare invalida.
Alege: 0
La revedere!
```

Alegerea `9` este respinsă de `citesteInt` (nu există produs cu numărul acela), iar `0` închide magazinul. Pentru numărul ales de jucător (`optiune`) produsul se află pe poziția `optiune - 1`.

### Exemplul 5 — Magazinul se află doar într-o cameră **[Esențial]**

Negustorul Pip stă în Sala Mare (camera `1`). Dacă eroul scrie `magazin` în altă parte, îi spunem unde să meargă:

```cpp
#include <iostream>
#include <string>
using namespace std;

const int CAMERA_SALA = 1;

void magazin(int camera) {
    if (camera != CAMERA_SALA) {
        cout << "Negustorul nu este aici. Il gasesti in Sala Mare.\n";
        return;
    }
    cout << "Bine ai venit la negustorul Pip!\n";
}

int main() {
    int drum[] = {0, 1, 3, 1};
    for (int camera : drum) {
        cout << "Camera " << camera << ": ";
        magazin(camera);
    }
    return 0;
}
```

**Ieșire:**
```
Camera 0: Negustorul nu este aici. Il gasesti in Sala Mare.
Camera 1: Bine ai venit la negustorul Pip!
Camera 3: Negustorul nu este aici. Il gasesti in Sala Mare.
Camera 1: Bine ai venit la negustorul Pip!
```

---

## 3. Vânzarea

### Exemplul 6 — `vinde`: jumătate de preț **[Esențial]**

Negustorul cumpără ce nu mai vrei, dar cu jumătate din preț (`PRET[i] / 2`). Un obiect care nu se află în lista lui valorează `4` monede. **Cheia nu se vinde**: fără ea nu poți deschide cufărul, iar jocul ar deveni imposibil:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <limits>
using namespace std;

const int NR_PRODUSE = 4;
const string PRODUS[NR_PRODUSE] = {"Potiune", "Elixir", "Scut", "Amuleta"};
const int PRET[NR_PRODUSE] = {8, 15, 12, 20};

struct Jucator {
    int monede = 5;
    vector<string> inventar = {"Sabie", "Potiune", "Cheie"};
};

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

int pretVanzare(const string &nume) {
    for (int i = 0; i < NR_PRODUSE; i++) {
        if (PRODUS[i] == nume) {
            return PRET[i] / 2;
        }
    }
    return 4;
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
    cout << "Ai vandut: " << nume << ". Monede: " << j.monede << "\n";
}

int main() {
    Jucator eroul;
    vinde(eroul);
    vinde(eroul);
    vinde(eroul);
    return 0;
}
```

**Rulare** (tastezi `2`, `2`, `1`):
```
Ce vinzi?
  1. Sabie (4 monede)
  2. Potiune (4 monede)
  3. Cheie (4 monede)
Numarul obiectului (0 = renunt): 2
Ai vandut: Potiune. Monede: 9
Ce vinzi?
  1. Sabie (4 monede)
  2. Cheie (4 monede)
Numarul obiectului (0 = renunt): 2
Cheia nu se vinde! Fara ea nu poti deschide cufarul.
Ce vinzi?
  1. Sabie (4 monede)
  2. Cheie (4 monede)
Numarul obiectului (0 = renunt): 1
Ai vandut: Sabie. Monede: 13
```

Prima vânzare: poțiunea (`PRET / 2 = 4`). A doua: încearcă să vândă cheia (respinsă). A treia: vinde sabia (valoarea implicită `4`).

---

## 4. Obiecte care te ajută

### Exemplul 7 — Bonusuri din rucsac: scut și amuletă **[Esențial]**

Unele obiecte nu se consumă: te ajută cât timp le ai în rucsac. **Scutul** reduce cu `2` puncte loviturile primite, **amuleta** adaugă `2` la atac, iar **sabia** (din lecția 4) adaugă `3`. Funcțiile `atacTotal` și `aparare` adună aceste bonusuri:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int pozitie(const vector<string> &lista, const string &nume) {
    for (size_t i = 0; i < lista.size(); i++) {
        if (lista[i] == nume) {
            return (int)i;
        }
    }
    return -1;
}

int atacTotal(const vector<string> &inventar, int atacDeBaza) {
    int total = atacDeBaza;
    if (pozitie(inventar, "Sabie") >= 0) {
        total += 3;
    }
    if (pozitie(inventar, "Amuleta") >= 0) {
        total += 2;
    }
    return total;
}

int aparare(const vector<string> &inventar) {
    if (pozitie(inventar, "Scut") >= 0) {
        return 2;
    }
    return 0;
}

int main() {
    vector<string> a;
    vector<string> b = {"Sabie"};
    vector<string> c = {"Sabie", "Amuleta", "Scut"};

    cout << "Fara obiecte:   atac " << atacTotal(a, 5) << ", aparare " << aparare(a) << "\n";
    cout << "Cu sabie:       atac " << atacTotal(b, 5) << ", aparare " << aparare(b) << "\n";
    cout << "Echipat complet: atac " << atacTotal(c, 5) << ", aparare " << aparare(c) << "\n";
    return 0;
}
```

**Ieșire:**
```
Fara obiecte:   atac 5, aparare 0
Cu sabie:       atac 8, aparare 0
Echipat complet: atac 10, aparare 2
```

În luptă, daunele primite devin `atacul monstrului + zar - aparare`, dar nu mai puțin de `1` (altfel un scut puternic ar face eroul nemuritor).

### Exemplul 8 — Elixirul vindecă mai mult

Poțiunea dă `15` puncte de viață, elixirul `30`. În funcția `foloseste`, adăugăm o ramură nouă pentru elixir:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int pozitie(const vector<string> &lista, const string &nume) {
    for (size_t i = 0; i < lista.size(); i++) {
        if (lista[i] == nume) {
            return (int)i;
        }
    }
    return -1;
}

void foloseste(vector<string> &inventar, int &viata, int viataMax, const string &nume) {
    int p = pozitie(inventar, nume);
    if (p < 0) {
        cout << "Nu ai " << nume << ".\n";
        return;
    }
    int vindecare = 0;
    if (nume == "Potiune") {
        vindecare = 15;
    } else if (nume == "Elixir") {
        vindecare = 30;
    } else {
        cout << nume << " nu se foloseste asa.\n";
        return;
    }
    viata += vindecare;
    if (viata > viataMax) {
        viata = viataMax;
    }
    inventar.erase(inventar.begin() + p);
    cout << "Folosesti " << nume << ": +" << vindecare << ". Viata: " << viata << "/" << viataMax << "\n";
}

int main() {
    vector<string> inventar = {"Potiune", "Elixir", "Scut"};
    int viata = 5;
    foloseste(inventar, viata, 30, "Potiune");
    foloseste(inventar, viata, 30, "Elixir");
    foloseste(inventar, viata, 30, "Scut");
    foloseste(inventar, viata, 30, "Elixir");
    return 0;
}
```

**Ieșire:**
```
Folosesti Potiune: +15. Viata: 20/30
Folosesti Elixir: +30. Viata: 30/30
Scut nu se foloseste asa.
Nu ai Elixir.
```

---

## 5. Alte idei

### Exemplul 9 — Oferta zilei *(Provocare, opțional)*

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

Un negustor poate avea o ofertă: un produs ales la întâmplare costă cu jumătate mai puțin. Aici prețul este calculat dintr-un zar:

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

const int NR_PRODUSE = 4;
const string PRODUS[NR_PRODUSE] = {"Potiune", "Elixir", "Scut", "Amuleta"};
const int PRET[NR_PRODUSE] = {8, 15, 12, 20};

int main() {
    srand((unsigned)time(0));
    int oferta = rand() % NR_PRODUSE;

    cout << "OFERTA ZILEI: " << PRODUS[oferta] << " la jumatate de pret!\n";
    for (int i = 0; i < NR_PRODUSE; i++) {
        int pret = (i == oferta) ? PRET[i] / 2 : PRET[i];
        cout << "  " << PRODUS[i] << " - " << pret << " monede\n";
    }
    return 0;
}
```

**Exemplu de ieșire** (la tine numerele aleatoare vor fi altele):
```
OFERTA ZILEI: Elixir la jumatate de pret!
  Potiune - 8 monede
  Elixir - 7 monede
  Scut - 12 monede
  Amuleta - 20 monede
```

### Exemplul 10 — Istoricul cumpărăturilor *(Provocare, opțional)*

Magazinul poate nota ce ai cumpărat și cât ai cheltuit:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> cumparaturi = {"Potiune", "Scut", "Potiune"};
    vector<int> preturi = {8, 12, 8};

    int total = 0;
    cout << "Istoric cumparaturi:\n";
    for (size_t i = 0; i < cumparaturi.size(); i++) {
        cout << "  " << i + 1 << ". " << cumparaturi[i] << " - " << preturi[i] << " monede\n";
        total += preturi[i];
    }
    cout << "Total cheltuit: " << total << " monede\n";
    return 0;
}
```

**Ieșire:**
```
Istoric cumparaturi:
  1. Potiune - 8 monede
  2. Scut - 12 monede
  3. Potiune - 8 monede
Total cheltuit: 28 monede
```

### Exemplul 11 — Produsele, de la cel mai ieftin *(Provocare, opțional)*

Cu `sort` și un comparator (ca la catalogul clasei, din Modulul 4) afișăm produsele în ordinea prețului:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Produs {
    string nume;
    int pret;
};

bool maiIeftin(const Produs &a, const Produs &b) {
    return a.pret < b.pret;
}

int main() {
    vector<Produs> produse = {
        {"Potiune", 8}, {"Elixir", 15}, {"Scut", 12}, {"Amuleta", 20}
    };
    sort(produse.begin(), produse.end(), maiIeftin);

    for (const Produs &p : produse) {
        cout << p.nume << " - " << p.pret << " monede\n";
    }
    return 0;
}
```

**Ieșire:**
```
Potiune - 8 monede
Scut - 12 monede
Elixir - 15 monede
Amuleta - 20 monede
```

---

## 6. Jocul lecției

### Exemplul 12 — **Joc_L46.cpp**: magazinul negustorului Pip **[Esențial]**

Pornim de la **Joc_L45.cpp**. Adăugăm: constantele `NR_PRODUSE`, `PRODUS`, `PRET` și `CAMERA_SALA`, funcțiile `aparare`, `pretVanzare`, `cumpara`, `vinde` și `magazin`, o ramură pentru `Elixir` în `foloseste`, bonusul amuletei în `atacTotal` și comanda `magazin` în `joaca`. În `lupta`, loviturile monstrului țin acum cont de apărare.

Iată ce s-a **schimbat** față de lecția trecută (`+` = linii de adăugat, `-` = linii de șters, `...` = restul codului rămâne la fel):

```diff
...
 
 const int CAMERA_POARTA = 0;
+const int CAMERA_SALA = 1;
 const int CAMERA_ARMURARIA = 2;
 const int CAMERA_BUCATARIA = 3;
...
     {-1, 1, -1, -1}
 };
+const int NR_PRODUSE = 4;
+const string PRODUS[NR_PRODUSE] = {"Potiune", "Elixir", "Scut", "Amuleta"};
+const int PRET[NR_PRODUSE] = {8, 15, 12, 20};
 
 // ---------- structuri ----------
...
         total += 3;
     }
+    if (pozitie(j.inventar, "Amuleta") >= 0) {
+        total += 2;
+    }
     return total;
+}
+
+int aparare(const Jucator &j) {
+    if (pozitie(j.inventar, "Scut") >= 0) {
+        return 2;
+    }
+    return 0;
 }
 
...
     cout << "  inventar               - vezi ce ai in rucsac\n";
     cout << "  foloseste              - folosesti un obiect\n";
+    cout << "  magazin                - cumperi si vinzi (doar in Sala Mare)\n";
     cout << "  ajutor                 - afisezi aceasta lista\n";
     cout << "  iesire                 - parasesti jocul\n";
...
         vindeca(g.j, 15);
         cout << "Bei potiunea. Te simti mai bine!\n";
+        g.j.inventar.erase(g.j.inventar.begin() + p);
+    } else if (nume == "Elixir") {
+        vindeca(g.j, 30);
+        cout << "Bei elixirul. Ai din nou putere!\n";
         g.j.inventar.erase(g.j.inventar.begin() + p);
     } else {
...
             break;
         }
-        int dauna = m.atac + zar(0, 2);
+        int dauna = m.atac + zar(0, 2) - aparare(g.j);
         if (dauna < 1) {
             dauna = 1;
...
 
 // ---------- magazinul ----------
+int pretVanzare(const string &nume) {
+    for (int i = 0; i < NR_PRODUSE; i++) {
+        if (PRODUS[i] == nume) {
+            return PRET[i] / 2;
+        }
+    }
+    return 4;
+}
+
+void cumpara(Jucator &j, int i) {
+    if (j.monede < PRET[i]) {
+        cout << "Nu ai destule monede (iti trebuie " << PRET[i] << ").\n";
+        return;
+    }
+    j.monede -= PRET[i];
+    j.inventar.push_back(PRODUS[i]);
+    cout << "Ai cumparat: " << PRODUS[i] << ".\n";
+}
+
+void vinde(Jucator &j) {
+    if (j.inventar.empty()) {
+        cout << "Nu ai nimic de vandut.\n";
+        return;
+    }
+    cout << "Ce vinzi?\n";
+    for (size_t i = 0; i < j.inventar.size(); i++) {
+        cout << "  " << i + 1 << ". " << j.inventar[i] << " (" << pretVanzare(j.inventar[i]) << " monede)\n";
+    }
+    int nr = citesteInt("Numarul obiectului (0 = renunt): ", 0, (int)j.inventar.size());
+    if (nr == 0) {
+        return;
+    }
+    string nume = j.inventar[nr - 1];
+    if (nume == "Cheie") {
+        cout << "Cheia nu se vinde! Fara ea nu poti deschide cufarul.\n";
+        return;
+    }
+    j.monede += pretVanzare(nume);
+    j.inventar.erase(j.inventar.begin() + (nr - 1));
+    cout << "Ai vandut: " << nume << ".\n";
+}
+
+void magazin(Joc &g) {
+    if (g.j.camera != CAMERA_SALA) {
+        cout << "Negustorul nu este aici. Il gasesti in Sala Mare.\n";
+        return;
+    }
+    int optiune;
+    do {
+        cout << "\n=== Negustorul Pip === (monedele tale: " << g.j.monede << ")\n";
+        for (int i = 0; i < NR_PRODUSE; i++) {
+            cout << "  " << i + 1 << ". " << PRODUS[i] << " - " << PRET[i] << " monede\n";
+        }
+        cout << "  " << NR_PRODUSE + 1 << ". Vinde un obiect\n";
+        cout << "  0. Iesi din magazin\n";
+        optiune = citesteInt("Alege: ", 0, NR_PRODUSE + 1);
+        if (optiune >= 1 && optiune <= NR_PRODUSE) {
+            cumpara(g.j, optiune - 1);
+        } else if (optiune == NR_PRODUSE + 1) {
+            vinde(g.j);
+        }
+    } while (optiune != 0);
+}
 
 // ---------- misiuni si final ----------
...
         } else if (cmd == "foloseste") {
             foloseste(g);
+        } else if (cmd == "magazin") {
+            magazin(g);
         } else if (cmd == "iesire") {
             g.gata = true;
```

În Sala Mare, eroul poate acum să cumpere din monedele câștigate de la goblin. Dacă vrei să încerci magazinul fără să lupți, începi cu cele 10 monede de pornire.

<details>
<summary>Fișierul complet <code>Joc_L46.cpp</code> (ca să compari cu al tău)</summary>

```cpp
/*
   Joc RPG in consola: CASTELUL UITAT
   Fisier: Joc_L46.cpp
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
        } else if (cmd == "iesire") {
            g.gata = true;
        } else {
            cout << "Nu inteleg comanda. Scrie ajutor.\n";
        }
        if (!esteViu(g.j)) {
            cout << "\nAi pierdut. Jocul s-a terminat.\n";
            g.gata = true;
        }
    }
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

**Exemplu de rulare** (tastezi `1`, `Ana`, `nord`, `magazin`, `1`, `2`, `5`, `1`, `0`, `inventar`, `stare`, `iesire`, `0`; la tine zarurile dau alte rezultate):
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

> magazin

=== Negustorul Pip === (monedele tale: 10)
  1. Potiune - 8 monede
  2. Elixir - 15 monede
  3. Scut - 12 monede
  4. Amuleta - 20 monede
  5. Vinde un obiect
  0. Iesi din magazin
Alege: 1
Ai cumparat: Potiune.

=== Negustorul Pip === (monedele tale: 2)
  1. Potiune - 8 monede
  2. Elixir - 15 monede
  3. Scut - 12 monede
  4. Amuleta - 20 monede
  5. Vinde un obiect
  0. Iesi din magazin
Alege: 2
Nu ai destule monede (iti trebuie 15).

=== Negustorul Pip === (monedele tale: 2)
  1. Potiune - 8 monede
  2. Elixir - 15 monede
  3. Scut - 12 monede
  4. Amuleta - 20 monede
  5. Vinde un obiect
  0. Iesi din magazin
Alege: 5
Ce vinzi?
  1. Potiune (4 monede)
Numarul obiectului (0 = renunt): 1
Ai vandut: Potiune.

=== Negustorul Pip === (monedele tale: 6)
  1. Potiune - 8 monede
  2. Elixir - 15 monede
  3. Scut - 12 monede
  4. Amuleta - 20 monede
  5. Vinde un obiect
  0. Iesi din magazin
Alege: 0

> inventar
Rucsacul este gol.

> stare
--- Ana ---
Viata:  [##########] 30/30
Atac:   5
Monede: 6
Scor:   0
Locatie: Sala Mare

> iesire

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

### Exercițiul A — Joc_L46.cpp (obligatoriu)
Scrie programul din Exemplul 12, pornind de la `Joc_L45.cpp`. Cumpără un scut și vezi dacă loviturile primite se micșorează. Încearcă să cumperi ceva ce nu poți plăti, să vinzi cheia și să alegi un număr greșit.

### Exercițiul B — Produsele tale
Schimbă produsele, prețurile și efectele după tema ta (de exemplu: „Hartă” în loc de „Scut”). Păstrează cel puțin 4 produse și verifică dacă prețurile sunt echilibrate față de monedele care se pot câștiga.

### Exercițiul C — Negustorul vorbește
Adaugă mesaje pentru negustor: o urare când intri („Bine ai venit!”), o replică la cumpărare și una la plecare.

### Exercițiul D — Istoric de cumpărături *(Provocare, opțional)*
Pornind de la Exemplul 10, ține un istoric al cumpărăturilor din joc și afișează totalul cheltuit când ieși din magazin.

### Exercițiul E — Stoc limitat *(Provocare, opțional)*
Fiecare produs are un stoc (de exemplu, 2 poțiuni). Când stocul ajunge la `0`, produsul nu mai poate fi cumpărat. Folosește un al treilea tablou paralel, `STOC`.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Magazinul se deschide doar în Sala Mare  
- [ ] Nu poți cumpăra fără monede suficiente și nu poți vinde cheia  
- [ ] Scutul și amuleta schimbă lupta (se vede în loviturile primite și date)  
- [ ] Elixirul și poțiunea vindecă, dar nu peste viața maximă  
- [ ] Ai salvat fișierul ca `Joc_L46.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă un produs care nu poate fi cumpărat decât o singură dată (de exemplu, o armură)  
- [ ] Fă prețurile să se schimbe în fiecare zi de joc, după o regulă a ta  
- [ ] Adaugă un al doilea negustor într-o altă cameră, cu alte produse  
- [ ] Adaugă o funcție `afiseazaMonede` care colorează sau desenează monedele  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Poți cumpăra și când n-ai monede | Lipsește verificarea | `if (j.monede < PRET[i]) { … return; }` |
| Produsul greșit este cumpărat | Ai confundat numărul din meniu (de la 1) cu poziția (de la 0) | `cumpara(j, optiune - 1)` |
| Monedele devin negative | Ai scăzut înainte să verifici | Verifici întâi, scazi apoi |
| Cheia se vinde și jocul nu mai poate fi terminat | Lipsește regula pentru cheie | `if (nume == "Cheie") { … return; }` |
| Se șterge alt obiect decât cel vândut | Indicele din `erase` este greșit | `erase(begin() + (nr - 1))` |
| Scutul nu are efect | Uitat `- aparare(...)` în formula daunelor | `dauna = atac + zar - aparare(g.j)` și minimum `1` |
| Magazinul funcționează în orice cameră | Lipsește verificarea camerei | `if (g.j.camera != CAMERA_SALA) { … return; }` |

---

## Recapitulare pe scurt

- Produsele stau în tablouri paralele: `PRODUS[i]` și `PRET[i]`.
- Cumpărarea: verifici monedele, scazi prețul, adaugi produsul în rucsac.
- Vânzarea: calculezi prețul (jumătate), ștergi obiectul din rucsac, adaugi monedele; cheia nu se vinde.
- Meniul magazinului este o buclă `do … while` cu citire sigură.
- Obiectele care te ajută singure (sabia, amuleta, scutul) sunt verificate cu `pozitie(...) >= 0`.
- Daunele primite: `atac + zar - aparare`, dar cel puțin `1`.

---

## Temă
1. Termină Exercițiul A și joacă până când reușești să cumperi și să folosești fiecare produs.  
2. Fă un tabel cu produsele jocului tău: preț de cumpărare, preț de vânzare, efect.  
3. Gândește-te la **final**: ce trebuie să facă eroul ca să câștige? Ce îl face să piardă? Scrie 3–4 propoziții.  
4. Salvează tot ca `Joc_L46.cpp`.

---

## Ce urmează — Lecția 7
**Misiuni și condiții de câștig.** Până acum jocul nu are sfârșit. Adăugăm cufărul din turn, o listă de misiuni cu bife, o cheie care trebuie găsită și un ecran final cu scorul: poți câștiga, dar poți și pierde.
