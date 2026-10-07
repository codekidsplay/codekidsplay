# LECȚIA 4 — Obiecte și rucsac
**Modulul 5 · Proiect RPG în consolă · 2 ore**  
**Code Maker Club · RPG Creator**

> Un castel fără comori nu e un castel. Azi punem **obiecte** prin camere: o sabie în armurărie, o poțiune în bucătărie, o cheie în pivniță. Eroul învață să le ia de pe jos (`ia`), să vadă ce are în **rucsac** (`inventar`) și să folosească o poțiune (`foloseste`). Rucsacul este un `vector` de texte, exact ca la lista de note din Modulul 4.  
> Proiect: **„Joc_L44.cpp”** · găsești obiecte și le folosești.

---

## Obiectiv
La finalul orei jocul are obiecte așezate în camere, comanda `ia` mută un obiect de pe jos în rucsac, `inventar` îl listează, iar `foloseste` consumă o poțiune și îți dă viață înapoi.  
**Minim:** un rucsac (`vector<string>`) în care adaugi și din care afișezi obiecte.  
**Ținta orei (Complet):** obiectele din camere, comenzile `ia`, `inventar`, `foloseste` și funcția `pozitie`.

## De ce contează
Inventarul este în aproape orice joc: de la Minecraft la jocurile de cărți. Tehnic este o **listă care crește și scade**: adaugi cu `push_back`, cauți cu o buclă, ștergi cu `erase`. Sunt exact operațiile pe care le-ai exersat în Modulul 4, aplicate acum la ceva care îți place.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `vector`, `push_back`, `erase` |
| 10–30 | Rucsacul și obiectele din camere (**Exemplele 1 și 2**) |
| 30–55 | Căutare în vector: `pozitie` (**Exemplul 3**) |
| 55–80 | `ia` și `inventar` (**Exemplele 4 și 5**) |
| 80–100 | `foloseste`: ștergerea unui obiect (**Exemplele 6–8**) |
| 100–118 | Jocul lecției, **Joc_L44.cpp** (**Exemplul 12**; Exemplele 9–11 sunt opționale) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Rucsacul și obiectele din cameră

### Exemplul 1 — Rucsacul: un `vector<string>` **[Esențial]**

Rucsacul este o listă de nume de obiecte. Nu știm câte obiecte va avea eroul, deci folosim un `vector`, care crește singur:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> inventar;

    inventar.push_back("Sabie");
    inventar.push_back("Potiune");
    inventar.push_back("Cheie");

    cout << "In rucsac ai " << inventar.size() << " obiecte:\n";
    for (size_t i = 0; i < inventar.size(); i++) {
        cout << "  " << i + 1 << ". " << inventar[i] << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
In rucsac ai 3 obiecte:
  1. Sabie
  2. Potiune
  3. Cheie
```

Numerotăm de la `1` pentru jucător (`i + 1`), dar poziția din vector începe de la `0`. Să nu le încurci.

### Exemplul 2 — Obiectele din camere **[Esențial]**

Fiecare cameră poate avea cel mult un obiect. Folosim un tablou de `string`, cu o poziție pentru fiecare cameră. Un text **gol** (`""`) înseamnă „nu este nimic aici”:

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
    string obiect[NR_CAMERE];
    obiect[2] = "Sabie";
    obiect[3] = "Potiune";
    obiect[4] = "Cheie";

    for (int c = 0; c < NR_CAMERE; c++) {
        cout << NUME_CAMERA[c] << ": ";
        if (obiect[c].empty()) {
            cout << "nimic\n";
        } else {
            cout << obiect[c] << "\n";
        }
    }
    return 0;
}
```

**Ieșire:**
```
Poarta castelului: nimic
Sala Mare: nimic
Armuraria: Sabie
Bucataria: Potiune
Pivnita: Cheie
Turnul: nimic
```

Tabloul `obiect` pornește cu toate textele goale. Camera 2 (Armuraria) are o sabie, camera 3 o poțiune, camera 4 o cheie.

---

## 2. Căutarea în rucsac

### Exemplul 3 — `pozitie`: unde se află un obiect? **[Esențial]**

Ca să folosim sau să ștergem un obiect, trebuie să știm pe ce poziție se află. Funcția `pozitie` parcurge vectorul și întoarce poziția sau `-1` dacă nu l-a găsit (ca la căutarea din Modulul 2):

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

int main() {
    vector<string> inventar = {"Sabie", "Potiune", "Cheie"};

    cout << "Potiune: pozitia " << pozitie(inventar, "Potiune") << "\n";
    cout << "Cheie:   pozitia " << pozitie(inventar, "Cheie") << "\n";
    cout << "Scut:    pozitia " << pozitie(inventar, "Scut") << " (nu exista)\n";

    if (pozitie(inventar, "Sabie") >= 0) {
        cout << "Ai o sabie!\n";
    }
    return 0;
}
```

**Ieșire:**
```
Potiune: pozitia 1
Cheie:   pozitia 2
Scut:    pozitia -1 (nu exista)
Ai o sabie!
```

Regula: `pozitie(...) >= 0` înseamnă „îl am”; `-1` înseamnă „nu îl am”.

---

## 3. Comanda `ia` și `inventar`

### Exemplul 4 — `ia`: din cameră în rucsac **[Esențial]**

Când eroul ia un obiect, el trebuie să **dispară de pe jos** și să **apară în rucsac**. Altfel, jucătorul ar putea lua aceeași sabie de o mie de ori:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> inventar;
    string obiectAici = "Sabie";    // obiectul de pe jos, in camera curenta
    string cmd;

    while (cin >> cmd && cmd != "iesire") {
        if (cmd == "ia") {
            if (obiectAici.empty()) {
                cout << "Nu este nimic de luat aici.\n";
            } else {
                cout << "Ai luat: " << obiectAici << ".\n";
                inventar.push_back(obiectAici);
                obiectAici = "";
            }
        } else {
            cout << "Nu inteleg comanda.\n";
        }
    }
    cout << "In rucsac: " << inventar.size() << " obiect(e)\n";
    return 0;
}
```

**Rulare** (tastezi `ia`, `ia`, `dans`, `iesire`):
```
ia
Ai luat: Sabie.
ia
Nu este nimic de luat aici.
dans
Nu inteleg comanda.
iesire
In rucsac: 1 obiect(e)
```

Prima comandă `ia` ia sabia, iar a doua nu mai găsește nimic.

### Exemplul 5 — `inventar`: afișarea rucsacului **[Esențial]**

Un rucsac gol trebuie să spună că e gol, nu să afișeze o listă fără nimic:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

void afiseazaInventar(const vector<string> &inventar) {
    if (inventar.empty()) {
        cout << "Rucsacul este gol.\n";
        return;
    }
    cout << "In rucsac:\n";
    for (size_t i = 0; i < inventar.size(); i++) {
        cout << "  " << i + 1 << ". " << inventar[i] << "\n";
    }
}

int main() {
    vector<string> inventar;
    afiseazaInventar(inventar);

    inventar.push_back("Sabie");
    inventar.push_back("Potiune");
    afiseazaInventar(inventar);
    return 0;
}
```

**Ieșire:**
```
Rucsacul este gol.
In rucsac:
  1. Sabie
  2. Potiune
```

---

## 4. Comanda `foloseste`

### Exemplul 6 — Poțiunea se consumă: `erase` **[Esențial]**

O poțiune se bea o singură dată. După folosire, o scoatem din rucsac cu `erase`. Funcția primește poziția găsită de `pozitie`:

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

void afiseaza(const vector<string> &v) {
    cout << "Rucsac:";
    for (const string &o : v) {
        cout << " [" << o << "]";
    }
    cout << "\n";
}

int main() {
    vector<string> inventar = {"Sabie", "Potiune", "Cheie"};
    int viata = 10;
    afiseaza(inventar);

    int p = pozitie(inventar, "Potiune");
    if (p >= 0) {
        viata += 15;
        inventar.erase(inventar.begin() + p);
        cout << "Ai baut potiunea. Viata: " << viata << "\n";
    }
    afiseaza(inventar);
    return 0;
}
```

**Ieșire:**
```
Rucsac: [Sabie] [Potiune] [Cheie]
Ai baut potiunea. Viata: 25
Rucsac: [Sabie] [Cheie]
```

`inventar.begin() + p` înseamnă „începutul vectorului, mutat cu `p` poziții”. Elementele de după cel șters se mută cu o poziție la stânga.

### Exemplul 7 — `foloseste`: obiectul îl scrie jucătorul **[Esențial]**

Comanda `foloseste` întreabă ce obiect vrei să folosești, apoi verifică dacă îl ai:

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

int main() {
    vector<string> inventar = {"Sabie", "Potiune"};
    int viata = 10;

    for (int incercare = 0; incercare < 3; incercare++) {
        string nume;
        cout << "Ce obiect folosesti? ";
        cin >> nume;

        int p = pozitie(inventar, nume);
        if (p < 0) {
            cout << "Nu ai asa ceva in rucsac.\n";
        } else if (nume == "Potiune") {
            viata += 15;
            inventar.erase(inventar.begin() + p);
            cout << "Te simti mai bine! Viata: " << viata << "\n";
        } else {
            cout << nume << " nu se foloseste asa.\n";
        }
    }
    return 0;
}
```

**Rulare** (tastezi `Cheie`, `Potiune`, `Potiune`):
```
Ce obiect folosesti? Cheie
Nu ai asa ceva in rucsac.
Ce obiect folosesti? Potiune
Te simti mai bine! Viata: 25
Ce obiect folosesti? Potiune
Nu ai asa ceva in rucsac.
```

Prima încercare nu găsește `Cheie`, a doua bea poțiunea, iar a treia nu mai găsește nicio poțiune, pentru că a fost consumată.

### Exemplul 8 — Obiecte care te ajută singure

Sabia nu se „bea”: dacă o ai, atacul tău crește automat. În lecția 5 vom folosi asta în luptă. Iată ideea, pe scurt:

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
    return total;
}

int main() {
    vector<string> inventar;
    cout << "Fara sabie, atacul este " << atacTotal(inventar, 5) << "\n";

    inventar.push_back("Sabie");
    cout << "Cu sabia, atacul este " << atacTotal(inventar, 5) << "\n";
    return 0;
}
```

**Ieșire:**
```
Fara sabie, atacul este 5
Cu sabia, atacul este 8
```

---

## 5. Alte idei cu rucsacul

### Exemplul 9 — Rucsac cu loc limitat *(Provocare, opțional)*

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

Rucsacul poate avea o limită:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int MAX_RUCSAC = 3;

bool adauga(vector<string> &inventar, const string &obiect) {
    if ((int)inventar.size() >= MAX_RUCSAC) {
        cout << "Rucsacul este plin! Nu poti lua: " << obiect << "\n";
        return false;
    }
    inventar.push_back(obiect);
    cout << "Ai luat: " << obiect << "\n";
    return true;
}

int main() {
    vector<string> inventar;
    string de_luat[] = {"Sabie", "Potiune", "Cheie", "Scut", "Harta"};
    for (const string &o : de_luat) {
        adauga(inventar, o);
    }
    cout << "Obiecte in rucsac: " << inventar.size() << "/" << MAX_RUCSAC << "\n";
    return 0;
}
```

**Ieșire:**
```
Ai luat: Sabie
Ai luat: Potiune
Ai luat: Cheie
Rucsacul este plin! Nu poti lua: Scut
Rucsacul este plin! Nu poti lua: Harta
Obiecte in rucsac: 3/3
```

### Exemplul 10 — Inventar în ordine alfabetică *(Provocare, opțional)*

Cu `sort` din `<algorithm>` pui rucsacul în ordine alfabetică:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<string> inventar = {"Sabie", "Potiune", "Cheie", "Amuleta", "Scut"};

    sort(inventar.begin(), inventar.end());

    cout << "Inventar in ordine alfabetica:\n";
    for (const string &o : inventar) {
        cout << "  " << o << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Inventar in ordine alfabetica:
  Amuleta
  Cheie
  Potiune
  Sabie
  Scut
```

### Exemplul 11 — Câte poțiuni am? *(Provocare, opțional)*

Eroul poate ține mai multe obiecte la fel. O funcție le numără:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int numara(const vector<string> &lista, const string &nume) {
    int n = 0;
    for (const string &o : lista) {
        if (o == nume) {
            n++;
        }
    }
    return n;
}

int main() {
    vector<string> inventar = {"Potiune", "Sabie", "Potiune", "Potiune", "Cheie"};
    cout << "Potiuni: " << numara(inventar, "Potiune") << "\n";
    cout << "Sabii:   " << numara(inventar, "Sabie") << "\n";
    cout << "Scuturi: " << numara(inventar, "Scut") << "\n";
    return 0;
}
```

**Ieșire:**
```
Potiuni: 3
Sabii:   1
Scuturi: 0
```

---

## 6. Jocul lecției

### Exemplul 12 — **Joc_L44.cpp**: găsești și folosești obiecte **[Esențial]**

Pornim de la **Joc_L43.cpp**. Adăugăm: `#include <vector>`, câmpul `inventar` în `Jucator`, tabloul `obiect` în `Joc`, funcțiile `pozitie`, `initObiecte`, `iaObiect`, `afiseazaInventar` și `foloseste`, descrierea obiectelor în `descrieCamera` și cele trei comenzi noi în `joaca`. Constantele pentru camere (`CAMERA_ARMURARIA`, `CAMERA_BUCATARIA`, `CAMERA_PIVNITA`) apar acum, ca să nu scriem numere „magice” în `initObiecte`.

Iată ce s-a **schimbat** față de lecția trecută (`+` = linii de adăugat, `...` = restul codului rămâne la fel):

```diff
...
 #include <string>
 #include <limits>
+#include <vector>
 using namespace std;
 
...
 
 const int CAMERA_POARTA = 0;
+const int CAMERA_ARMURARIA = 2;
+const int CAMERA_BUCATARIA = 3;
+const int CAMERA_PIVNITA = 4;
 
 const string DIRECTII[4] = {"nord", "sud", "est", "vest"};
...
     int scor = 0;
     int camera = CAMERA_POARTA;
+    vector<string> inventar;
 };
 struct Joc {
     Jucator j;
     bool gata = false;
+    string obiect[NR_CAMERE];
 };
 
...
 }
 
+int pozitie(const vector<string> &lista, const string &nume) {
+    for (size_t i = 0; i < lista.size(); i++) {
+        if (lista[i] == nume) {
+            return (int)i;
+        }
+    }
+    return -1;
+}
+
 void afiseazaStare(const Jucator &j) {
     cout << "--- " << j.nume << " ---\n";
...
     cout << "  stare                  - vezi viata, monedele, scorul\n";
     cout << "  harta                  - vezi harta castelului\n";
+    cout << "  ia                     - iei obiectul din camera\n";
+    cout << "  inventar               - vezi ce ai in rucsac\n";
+    cout << "  foloseste              - folosesti un obiect\n";
     cout << "  ajutor                 - afisezi aceasta lista\n";
     cout << "  iesire                 - parasesti jocul\n";
...
     cout << "\n== " << NUME_CAMERA[c] << " ==\n";
     cout << DESCRIERE[c] << "\n";
+    if (!g.obiect[c].empty()) {
+        cout << "Pe jos se afla: " << g.obiect[c] << ".\n";
+    }
     cout << "Iesiri:";
     for (int d = 0; d < 4; d++) {
...
     g.j.camera = urmatoarea;
     return true;
+}
+
+void initObiecte(Joc &g) {
+    g.obiect[CAMERA_ARMURARIA] = "Sabie";
+    g.obiect[CAMERA_BUCATARIA] = "Potiune";
+    g.obiect[CAMERA_PIVNITA] = "Cheie";
+}
+
+void iaObiect(Joc &g) {
+    string &obiect = g.obiect[g.j.camera];
+    if (obiect.empty()) {
+        cout << "Nu este nimic de luat aici.\n";
+        return;
+    }
+    cout << "Ai luat: " << obiect << ".\n";
+    g.j.inventar.push_back(obiect);
+    g.j.scor += 5;
+    obiect = "";
+}
+
+void afiseazaInventar(const Jucator &j) {
+    if (j.inventar.empty()) {
+        cout << "Rucsacul este gol.\n";
+        return;
+    }
+    cout << "In rucsac:\n";
+    for (size_t i = 0; i < j.inventar.size(); i++) {
+        cout << "  " << i + 1 << ". " << j.inventar[i] << "\n";
+    }
+}
+
+void foloseste(Joc &g) {
+    string nume;
+    cout << "Ce obiect folosesti? ";
+    cin >> nume;
+    cin.ignore(numeric_limits<streamsize>::max(), '\n');
+    int p = pozitie(g.j.inventar, nume);
+    if (p < 0) {
+        cout << "Nu ai asa ceva in rucsac.\n";
+        return;
+    }
+    if (nume == "Potiune") {
+        vindeca(g.j, 15);
+        cout << "Bei potiunea. Te simti mai bine!\n";
+        g.j.inventar.erase(g.j.inventar.begin() + p);
+    } else {
+        cout << nume << " nu se foloseste asa. Il porti la tine si te ajuta singur.\n";
+    }
 }
 
...
         } else if (cmd == "ajutor") {
             afiseazaAjutor();
+        } else if (cmd == "ia") {
+            iaObiect(g);
+        } else if (cmd == "inventar") {
+            afiseazaInventar(g.j);
+        } else if (cmd == "foloseste") {
+            foloseste(g);
         } else if (cmd == "iesire") {
             g.gata = true;
...
     Joc g;
     g.j = creeazaJucator();
+    initObiecte(g);
     joaca(g);
 }
```

<details>
<summary>Fișierul complet <code>Joc_L44.cpp</code> (ca să compari cu al tău)</summary>

```cpp
/*
   Joc RPG in consola: CASTELUL UITAT
   Fisier: Joc_L44.cpp
   Autor:  Prenume Nume
*/
#include <iostream>
#include <string>
#include <limits>
#include <vector>
using namespace std;

// ---------- constante ----------
const string NUME_JOC = "CASTELUL UITAT";
const int NR_CAMERE = 6;
const int NORD = 0;
const int SUD = 1;
const int EST = 2;
const int VEST = 3;

const int CAMERA_POARTA = 0;
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

int pozitie(const vector<string> &lista, const string &nume) {
    for (size_t i = 0; i < lista.size(); i++) {
        if (lista[i] == nume) {
            return (int)i;
        }
    }
    return -1;
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
    } else {
        cout << nume << " nu se foloseste asa. Il porti la tine si te ajuta singur.\n";
    }
}

// ---------- lupta ----------

// ---------- magazinul ----------

// ---------- misiuni si final ----------

// ---------- salvare ----------

// ---------- teste ----------

// ---------- bucla jocului ----------
void dupaMutare(Joc &g) {
    descrieCamera(g);
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
        } else if (cmd == "iesire") {
            g.gata = true;
        } else {
            cout << "Nu inteleg comanda. Scrie ajutor.\n";
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

**Rulare** (tastezi `1`, `Ana`, `inventar`, `ia`, `nord`, `vest`, `ia`, `est`, `est`, `ia`, `inventar`, `foloseste`, `Potiune`, `inventar`, `stare`, `iesire`, `0`):
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

> inventar
Rucsacul este gol.

> ia
Nu este nimic de luat aici.

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

> inventar
In rucsac:
  1. Sabie
  2. Potiune

> foloseste
Ce obiect folosesti? Potiune
Bei potiunea. Te simti mai bine!

> inventar
In rucsac:
  1. Sabie

> stare
--- Ana ---
Viata:  [##########] 30/30
Atac:   5
Monede: 10
Scor:   10
Locatie: Bucataria

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

### Exercițiul A — Joc_L44.cpp (obligatoriu)
Scrie programul din Exemplul 12, pornind de la `Joc_L43.cpp`. Joacă-l: ia sabia, ia poțiunea, vezi rucsacul, folosește poțiunea. Încearcă și `ia` într-o cameră goală și `foloseste` cu un obiect pe care nu îl ai.

### Exercițiul B — Obiectele tale
Schimbă obiectele din joc și camerele în care se află, după tema ta (de exemplu: „Harta” în Sala Mare, „Lanterna” la Poartă). Păstrează `Cheie`, `Sabie` și `Potiune`, pentru că le vom folosi în lecțiile următoare.

### Exercițiul C — Mesaj pentru fiecare obiect
Fă ca `ia` să afișeze un mesaj special pentru fiecare obiect (de exemplu, pentru sabie: „Este grea, dar bine ascuțită.”).

### Exercițiul D — Rucsac plin *(Provocare, opțional)*
Adaugă o limită pentru rucsac (Exemplul 9), cu o constantă `MAX_RUCSAC`.

### Exercițiul E — Aruncă un obiect *(Provocare, opțional)*
Adaugă comanda `arunca`: scoate un obiect din rucsac și îl lasă în camera curentă, doar dacă acolo nu mai este alt obiect.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Obiectele apar în descrierea camerelor și dispar după ce sunt luate  
- [ ] `ia`, `inventar` și `foloseste` funcționează, inclusiv când rucsacul e gol  
- [ ] Poțiunea îți dă viață și dispare din rucsac, iar viața nu depășește maximul  
- [ ] Ai salvat fișierul ca `Joc_L44.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Permite mai multe obiecte pe jos într-o cameră (un `vector<string>` pentru fiecare cameră)  
- [ ] Adaugă o comandă `uita-te` care descrie un obiect în detaliu  
- [ ] Afișează inventarul grupat: `Potiune x2`  
- [ ] Fă obiectele să aibă valoare (monede) pe care o folosim în magazin, în lecția 6  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Obiectul rămâne pe jos după ce l-ai luat | Nu ai golit locul din cameră | `obiect = "";` după `push_back` |
| Programul se oprește la `erase` | Poziția este `-1` (obiect negăsit) | Verifică `p >= 0` înainte de `erase` |
| Obiectul șters nu este cel dorit | Ai confundat numărul afișat (de la 1) cu poziția (de la 0) | Pozițiile din vector încep de la `0`; la afișare scrii `i + 1` |
| `error: no match for 'operator+'` la `erase` | Ai scris `inventar.erase(p)` | `inventar.erase(inventar.begin() + p)` |
| Poți folosi o poțiune de câte ori vrei | Nu ai scos-o din rucsac | `erase` după folosire |
| `foloseste` nu găsește „potiune” | Majuscula contează | `Potiune` ≠ `potiune`; scrie la fel ca în joc |

---

## Recapitulare pe scurt

- Rucsacul este un `vector<string>`: `push_back` adaugă, `erase` șterge, `size()` numără.
- Obiectele din camere sunt într-un tablou `string obiect[NR_CAMERE]`; textul gol `""` = „nimic”.
- `pozitie(lista, nume)` întoarce poziția sau `-1`.
- `ia` mută un obiect din cameră în rucsac; `foloseste` consumă o poțiune și vindecă eroul.
- Unele obiecte (sabia) nu se consumă: te ajută singure, cât timp le ai în rucsac.

---

## Temă
1. Termină Exercițiul A și joacă-l de câteva ori, încercând toate comenzile, și cele greșite.  
2. Scrie pe hârtie **monstrul** jocului tău: nume, viață, cât de tare lovește și ce recompensă dă.  
3. Adaugă încă un tip de obiect la alegere (un mesaj la `ia`, un efect la `foloseste`).  
4. Salvează tot ca `Joc_L44.cpp`.

---

## Ce urmează — Lecția 5
**Monștri și luptă.** În pivniță locuiește un goblin. Învățăm `rand()` pentru zaruri, scriem o structură `Monstru` și o luptă pe ture: ataci, bei o poțiune sau fugi.
