# LECȚIA 3 — Mișcarea între camere
**Modulul 5 · Proiect RPG în consolă · 2 ore**  
**Code Kids Play · RPG Creator**

> Eroul nostru stă acum într-un loc și se uită la meniu. Azi îl punem în mișcare: tastezi `nord`, `sud`, `est` sau `vest`, iar jocul îți descrie camera în care ai ajuns. Pentru asta avem nevoie de trei lucruri: **camerele** (nume și descrieri în tablouri), **drumurile dintre ele** (un tablou cu două dimensiuni) și o **buclă principală** care citește comenzi până când jucătorul iese.  
> Proiect: **„Joc_L43.cpp”** · te plimbi prin cele șase camere ale castelului.

---

## Obiectiv
La finalul orei ai un joc în care eroul se mută între camere cu comenzi text, vede descrierea și ieșirile fiecărei camere, nu poate trece prin pereți și poate cere ajutor, starea sau harta.  
**Minim:** eroul se mută între cel puțin trei camere cu comenzile `nord` și `sud`.  
**Ținta orei (Complet):** toate cele șase camere, patru direcții, descrieri, ajutor, hartă și structura `Joc`.

## De ce contează
Aproape orice joc are o **buclă principală**: citește ce vrea jucătorul, schimbă starea jocului, afișează rezultatul și o ia de la capăt. Mai mult, ideea de a ține o hartă într-un tablou (cu `-1` pentru „nu se poate”) apare în jocuri, în roboți care se deplasează într-un labirint și în aplicațiile de navigare. Ce înveți azi folosești în toate lecțiile următoare.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: tablouri, `struct`, funcții |
| 10–35 | Camerele: nume, descrieri, ieșiri (**Exemplele 1–3**) |
| 35–55 | Bucla principală de comenzi (**Exemplele 4–5**) |
| 55–85 | Direcții, mutare, descrierea camerei (**Exemplele 6–8**) |
| 85–100 | Ajutor, stare, hartă (**Exemplul 9**; Exemplul 10, despre vizite, este opțional) |
| 100–118 | Jocul lecției, **Joc_L43.cpp** (**Exemplul 12**; Exemplul 11 este opțional) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Camerele castelului

### Exemplul 1 — Camera curentă **[Esențial]**

Fiecare cameră are un număr, de la `0` la `5`, iar numele ei se află în tabloul `NUME_CAMERA`, pe poziția respectivă. Eroul ține minte doar **numărul** camerei în care se află:

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
    int camera = 0;
    cout << "Esti in: " << NUME_CAMERA[camera] << "\n";

    camera = 1;
    cout << "Acum esti in: " << NUME_CAMERA[camera] << "\n";

    camera = 5;
    cout << "Acum esti in: " << NUME_CAMERA[camera] << "\n";
    return 0;
}
```

**Ieșire:**
```
Esti in: Poarta castelului
Acum esti in: Sala Mare
Acum esti in: Turnul
```

Să te muți dintr-o cameră în alta înseamnă doar să schimbi un număr.

### Exemplul 2 — Descrieri **[Esențial]**

Fiecare cameră are și o descriere. O punem într-un al doilea tablou, în aceeași ordine. Camera `c` are numele `NUME_CAMERA[c]` și descrierea `DESCRIERE[c]`:

```cpp
#include <iostream>
#include <string>
using namespace std;

const int NR_CAMERE = 6;
const string NUME_CAMERA[NR_CAMERE] = {
    "Poarta castelului", "Sala Mare", "Armuraria",
    "Bucataria", "Pivnita", "Turnul"
};
const string DESCRIERE[NR_CAMERE] = {
    "Poarta veche, ruginita, scartaie in vant. In fata ta se vede Sala Mare.",
    "O sala uriasa, cu un candelabru plin de panze de paianjen.",
    "Pe pereti atarna scuturi si sulite ruginite.",
    "Oale mari, cuptoare reci si miros de supa veche.",
    "Un loc intunecat si umed, cu butoaie sparte.",
    "Camera din varful turnului. In mijloc sta un cufar greu, incuiat."
};

void descrie(int c) {
    cout << "== " << NUME_CAMERA[c] << " ==\n";
    cout << DESCRIERE[c] << "\n";
}

int main() {
    descrie(0);
    cout << "\n";
    descrie(4);
    return 0;
}
```

**Ieșire:**
```
== Poarta castelului ==
Poarta veche, ruginita, scartaie in vant. In fata ta se vede Sala Mare.

== Pivnita ==
Un loc intunecat si umed, cu butoaie sparte.
```

**Încearcă tu (5 min)**  
- [ ] Schimbă o descriere și rulează din nou  
- [ ] Apelează `descrie` pentru toate cele 6 camere, cu o buclă `for`  

### Exemplul 3 — Drumurile: un tablou cu două dimensiuni **[Esențial]**

Din fiecare cameră pornesc până la patru drumuri: nord, sud, est, vest. Pentru fiecare cameră ținem patru numere, adică **numărul camerei în care ajungi** pe drumul respectiv, sau `-1` dacă drumul nu există. Așa obținem un tablou cu **două dimensiuni**: `IESIRI[camera][directie]`:

```cpp
#include <iostream>
#include <string>
using namespace std;

const int NR_CAMERE = 6;
const string DIRECTII[4] = {"nord", "sud", "est", "vest"};
const string NUME_CAMERA[NR_CAMERE] = {
    "Poarta castelului", "Sala Mare", "Armuraria",
    "Bucataria", "Pivnita", "Turnul"
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

int main() {
    for (int c = 0; c < NR_CAMERE; c++) {
        cout << NUME_CAMERA[c] << ":";
        for (int d = 0; d < 4; d++) {
            if (IESIRI[c][d] >= 0) {
                cout << " " << DIRECTII[d] << "->" << NUME_CAMERA[IESIRI[c][d]] << ";";
            }
        }
        cout << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Poarta castelului: nord->Sala Mare;
Sala Mare: nord->Turnul; sud->Poarta castelului; est->Bucataria; vest->Armuraria;
Armuraria: est->Sala Mare;
Bucataria: sud->Pivnita; vest->Sala Mare;
Pivnita: nord->Bucataria;
Turnul: sud->Sala Mare;
```

Direcțiile sunt numerotate: nord = `0`, sud = `1`, est = `2`, vest = `3` (în Exemplul 6 le vom da nume cu constante). Citește un rând din tablou: `{5, 0, 3, 2}` pentru Sala Mare înseamnă „la nord este camera 5, la sud camera 0, la est camera 3, la vest camera 2”. Poți compara cu harta din lecția 1.

---

## 2. Bucla principală

### Exemplul 4 — Citim comenzi până la `iesire` **[Esențial]**

Bucla principală a unui joc citește o comandă, o execută și repetă. Se oprește când jucătorul scrie `iesire`:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string cmd;
    bool gata = false;

    while (!gata) {
        cout << "> ";
        if (!(cin >> cmd)) {
            break;
        }
        if (cmd == "iesire") {
            gata = true;
            cout << "La revedere!\n";
        } else {
            cout << "Ai scris: " << cmd << "\n";
        }
    }
    return 0;
}
```

**Rulare** (tastezi `salut`, `nord`, `iesire`):
```
> salut
Ai scris: salut
> nord
Ai scris: nord
> iesire
La revedere!
```

`cin >> cmd` citește un cuvânt. Dacă intrarea se termină (nu mai vine nimic de la tastatură), `cin >> cmd` este fals, iar `break` oprește bucla, deci programul nu rămâne blocat.

### Exemplul 5 — Un culoar cu trei camere

Înainte de castelul întreg, să încercăm un culoar simplu cu trei camere, una după alta. `nord` înseamnă „camera următoare”, iar `sud` „camera dinainte”:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    const string NUME[3] = {"Intrarea", "Culoarul", "Sala tronului"};
    int camera = 0;
    string cmd;

    cout << "Esti in: " << NUME[camera] << "\n";
    while (true) {
        cout << "> ";
        if (!(cin >> cmd) || cmd == "iesire") {
            break;
        }
        if (cmd == "nord") {
            if (camera < 2) {
                camera++;
                cout << "Esti in: " << NUME[camera] << "\n";
            } else {
                cout << "Nu poti merge mai departe.\n";
            }
        } else if (cmd == "sud") {
            if (camera > 0) {
                camera--;
                cout << "Esti in: " << NUME[camera] << "\n";
            } else {
                cout << "Aici este iesirea din castel.\n";
            }
        } else {
            cout << "Nu inteleg comanda.\n";
        }
    }
    return 0;
}
```

**Rulare** (tastezi `sud`, `nord`, `nord`, `nord`, `sud`, `dans`, `iesire`):
```
Esti in: Intrarea
> sud
Aici este iesirea din castel.
> nord
Esti in: Culoarul
> nord
Esti in: Sala tronului
> nord
Nu poti merge mai departe.
> sud
Esti in: Culoarul
> dans
Nu inteleg comanda.
> iesire
```

Merge, dar pentru un castel cu drumuri în patru direcții ar fi nevoie de multe `if`-uri. De aceea folosim tabloul `IESIRI`.

---

## 3. Mutarea prin tabloul de ieșiri

### Exemplul 6 — Din cuvânt în direcție **[Esențial]**

Jucătorul scrie `nord`, dar noi vrem numărul direcției (`NORD`, adică `0`). Funcția `directieDin` face traducerea și acceptă și scurtăturile `n`, `s`, `e`, `v`. Dacă textul nu este o direcție, întoarce `-1`:

```cpp
#include <iostream>
#include <string>
using namespace std;

const int NORD = 0;
const int SUD = 1;
const int EST = 2;
const int VEST = 3;

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

int main() {
    string comenzi[] = {"nord", "e", "vest", "s", "stare", "sus"};
    for (const string &c : comenzi) {
        cout << c << " -> " << directieDin(c) << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
nord -> 0
e -> 2
vest -> 3
s -> 1
stare -> -1
sus -> -1
```

### Exemplul 7 — Mutarea: `muta` **[Esențial]**

Funcția `muta` caută în tabloul `IESIRI` camera spre care duce direcția aleasă. Dacă valoarea este `-1`, nu se poate merge acolo și camera rămâne aceeași. Funcția întoarce `true` dacă mutarea a reușit:

```cpp
#include <iostream>
#include <string>
using namespace std;

const int NORD = 0;
const int SUD = 1;
const int EST = 2;
const int VEST = 3;
const string DIRECTII[4] = {"nord", "sud", "est", "vest"};
const string NUME_CAMERA[6] = {
    "Poarta castelului", "Sala Mare", "Armuraria",
    "Bucataria", "Pivnita", "Turnul"
};
const int IESIRI[6][4] = {
    {1, -1, -1, -1},
    {5, 0, 3, 2},
    {-1, -1, 1, -1},
    {-1, 4, -1, 1},
    {3, -1, -1, -1},
    {-1, 1, -1, -1}
};

bool muta(int &camera, int directie) {
    int urmatoarea = IESIRI[camera][directie];
    if (urmatoarea < 0) {
        cout << "Nu poti merge spre " << DIRECTII[directie] << ".\n";
        return false;
    }
    camera = urmatoarea;
    cout << "Mergi spre " << DIRECTII[directie] << " si ajungi in: " << NUME_CAMERA[camera] << "\n";
    return true;
}

int main() {
    int camera = 0;
    int drum[] = {NORD, EST, SUD, SUD, NORD, VEST};
    for (int d : drum) {
        muta(camera, d);
    }
    return 0;
}
```

**Ieșire:**
```
Mergi spre nord si ajungi in: Sala Mare
Mergi spre est si ajungi in: Bucataria
Mergi spre sud si ajungi in: Pivnita
Nu poti merge spre sud.
Mergi spre nord si ajungi in: Bucataria
Mergi spre vest si ajungi in: Sala Mare
```

Parametrul `int &camera` este o **referință**: funcția modifică direct numărul camerei eroului. În joc, vom scrie `muta(Joc &g, int directie)` și vom modifica `g.j.camera`.

### Exemplul 8 — Descrierea camerei, cu ieșiri **[Esențial]**

De fiecare dată când eroul intră într-o cameră, afișăm numele, descrierea și **ieșirile** (doar cele care există, adică acolo unde `IESIRI` nu este `-1`):

```cpp
#include <iostream>
#include <string>
using namespace std;

const string DIRECTII[4] = {"nord", "sud", "est", "vest"};
const string NUME_CAMERA[6] = {
    "Poarta castelului", "Sala Mare", "Armuraria",
    "Bucataria", "Pivnita", "Turnul"
};
const string DESCRIERE[6] = {
    "Poarta veche, ruginita, scartaie in vant.",
    "O sala uriasa, cu un candelabru plin de panze de paianjen.",
    "Pe pereti atarna scuturi si sulite ruginite.",
    "Oale mari, cuptoare reci si miros de supa veche.",
    "Un loc intunecat si umed, cu butoaie sparte.",
    "Camera din varful turnului. In mijloc sta un cufar greu."
};
const int IESIRI[6][4] = {
    {1, -1, -1, -1},
    {5, 0, 3, 2},
    {-1, -1, 1, -1},
    {-1, 4, -1, 1},
    {3, -1, -1, -1},
    {-1, 1, -1, -1}
};

void descrieCamera(int c) {
    cout << "\n== " << NUME_CAMERA[c] << " ==\n";
    cout << DESCRIERE[c] << "\n";
    cout << "Iesiri:";
    for (int d = 0; d < 4; d++) {
        if (IESIRI[c][d] >= 0) {
            cout << " " << DIRECTII[d];
        }
    }
    cout << "\n";
}

int main() {
    descrieCamera(0);
    descrieCamera(1);
    descrieCamera(2);
    return 0;
}
```

**Ieșire:**
```

== Poarta castelului ==
Poarta veche, ruginita, scartaie in vant.
Iesiri: nord

== Sala Mare ==
O sala uriasa, cu un candelabru plin de panze de paianjen.
Iesiri: nord sud est vest

== Armuraria ==
Pe pereti atarna scuturi si sulite ruginite.
Iesiri: est
```

---

## 4. Alte comenzi

### Exemplul 9 — `ajutor`, `stare`, `harta`, comandă necunoscută

Un joc trebuie să răspundă și la ce nu înțelege. Dacă jucătorul scrie o comandă necunoscută, îi spunem să scrie `ajutor`, în loc să tăcem:

```cpp
#include <iostream>
#include <string>
using namespace std;

void afiseazaAjutor() {
    cout << "Comenzi: nord, sud, est, vest, stare, harta, ajutor, iesire\n";
}

int main() {
    string cmd;
    int camera = 1;
    int scor = 0;
    bool gata = false;

    while (!gata) {
        cout << "> ";
        if (!(cin >> cmd)) {
            break;
        }
        if (cmd == "ajutor") {
            afiseazaAjutor();
        } else if (cmd == "stare") {
            cout << "Camera " << camera << ", scor " << scor << "\n";
        } else if (cmd == "harta") {
            cout << "(aici va aparea harta)\n";
        } else if (cmd == "iesire") {
            gata = true;
        } else {
            cout << "Nu inteleg comanda. Scrie ajutor.\n";
        }
    }
    return 0;
}
```

**Rulare** (tastezi `ajutor`, `stare`, `zzz`, `harta`, `iesire`):
```
> ajutor
Comenzi: nord, sud, est, vest, stare, harta, ajutor, iesire
> stare
Camera 1, scor 0
> zzz
Nu inteleg comanda. Scrie ajutor.
> harta
(aici va aparea harta)
> iesire
```

### Exemplul 10 — Camere vizitate *(Provocare, opțional)*

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

Un tablou de `bool` ne spune ce camere a vizitat eroul. Așa putem afișa „Ai explorat 3 din 6 camere”:

```cpp
#include <iostream>
using namespace std;

int main() {
    const int NR_CAMERE = 6;
    bool vizitat[NR_CAMERE] = {};
    int drum[] = {0, 1, 2, 1, 3, 4, 3};

    for (int camera : drum) {
        vizitat[camera] = true;
    }

    int numar = 0;
    for (int i = 0; i < NR_CAMERE; i++) {
        if (vizitat[i]) {
            numar++;
        }
    }
    cout << "Ai explorat " << numar << " din " << NR_CAMERE << " camere.\n";
    return 0;
}
```

**Ieșire:**
```
Ai explorat 5 din 6 camere.
```

### Exemplul 11 — Verificăm harta *(Provocare, opțional)*

Dacă din camera `A` mergi spre nord și ajungi în `B`, atunci din `B` mergând spre sud trebuie să ajungi în `A`. Un program poate verifica singur toate drumurile. Direcțiile sunt în perechi: `0` cu `1` (nord/sud) și `2` cu `3` (est/vest), deci opusul lui `d` este `d ^ 1`:

```cpp
#include <iostream>
using namespace std;

const int IESIRI[6][4] = {
    {1, -1, -1, -1},
    {5, 0, 3, 2},
    {-1, -1, 1, -1},
    {-1, 4, -1, 1},
    {3, -1, -1, -1},
    {-1, 1, -1, -1}
};

int main() {
    int probleme = 0;
    for (int c = 0; c < 6; c++) {
        for (int d = 0; d < 4; d++) {
            int vecin = IESIRI[c][d];
            if (vecin >= 0 && IESIRI[vecin][d ^ 1] != c) {
                cout << "Problema la camera " << c << ", directia " << d << "\n";
                probleme++;
            }
        }
    }
    cout << "Probleme gasite: " << probleme << "\n";
    return 0;
}
```

**Ieșire:**
```
Probleme gasite: 0
```

Dacă adaugi o cameră nouă și greșești un număr, programul îți spune imediat unde.

---

## 5. Jocul lecției

### Exemplul 12 — **Joc_L43.cpp**: te plimbi prin castel **[Esențial]**

Pornim de la **Joc_L42.cpp**. Adăugăm constantele și tablourile camerelor, structura `Joc` (starea jocului: eroul și dacă jocul s-a terminat), funcțiile `directieDin`, `descrieCamera`, `muta`, `afiseazaAjutor`, `dupaMutare` și `joaca` (bucla principală). Opțiunea `1` din meniu creează eroul și pornește `joaca`. Harta primește acum camera curentă și marchează eroul cu `*`.

Iată ce s-a **schimbat** față de lecția trecută (`+` = linii de adăugat, `-` = linii de șters, `...` = restul codului rămâne la fel):

```diff
...
 // ---------- constante ----------
 const string NUME_JOC = "CASTELUL UITAT";
+const int NR_CAMERE = 6;
+const int NORD = 0;
+const int SUD = 1;
+const int EST = 2;
+const int VEST = 3;
+
+const int CAMERA_POARTA = 0;
+
+const string DIRECTII[4] = {"nord", "sud", "est", "vest"};
+
+const string NUME_CAMERA[NR_CAMERE] = {
+    "Poarta castelului", "Sala Mare", "Armuraria",
+    "Bucataria", "Pivnita", "Turnul"
+};
+
+const string DESCRIERE[NR_CAMERE] = {
+    "Poarta veche, ruginita, scartaie in vant. In fata ta se vede Sala Mare.",
+    "O sala uriasa, cu un candelabru plin de panze de paianjen. Un negustor ciudat zambeste in colt.",
+    "Pe pereti atarna scuturi si sulite ruginite. Aici se pastreaza armele castelului.",
+    "Oale mari, cuptoare reci si miros de supa veche. O scara coboara spre pivnita.",
+    "Un loc intunecat si umed, cu butoaie sparte. Se aude un mormait.",
+    "Camera din varful turnului. In mijloc sta un cufar greu, incuiat."
+};
+
+// iesirile fiecarei camere, in ordinea: nord, sud, est, vest (-1 = nu exista)
+const int IESIRI[NR_CAMERE][4] = {
+    {1, -1, -1, -1},
+    {5, 0, 3, 2},
+    {-1, -1, 1, -1},
+    {-1, 4, -1, 1},
+    {3, -1, -1, -1},
+    {-1, 1, -1, -1}
+};
 
 // ---------- structuri ----------
...
     int monede = 10;
     int scor = 0;
+    int camera = CAMERA_POARTA;
+};
+struct Joc {
+    Jucator j;
+    bool gata = false;
 };
 
...
     cout << "Monede: " << j.monede << "\n";
     cout << "Scor:   " << j.scor << "\n";
+    cout << "Locatie: " << NUME_CAMERA[j.camera] << "\n";
 }
 
...
 }
 
+void afiseazaAjutor() {
+    cout << "\nComenzi:\n";
+    cout << "  nord, sud, est, vest   - te muti (sau n, s, e, v)\n";
+    cout << "  stare                  - vezi viata, monedele, scorul\n";
+    cout << "  harta                  - vezi harta castelului\n";
+    cout << "  ajutor                 - afisezi aceasta lista\n";
+    cout << "  iesire                 - parasesti jocul\n";
+}
+
 // ---------- lumea jocului ----------
+int directieDin(const string &cmd) {
+    if (cmd == "nord" || cmd == "n") {
+        return NORD;
+    }
+    if (cmd == "sud" || cmd == "s") {
+        return SUD;
+    }
+    if (cmd == "est" || cmd == "e") {
+        return EST;
+    }
+    if (cmd == "vest" || cmd == "v") {
+        return VEST;
+    }
+    return -1;
+}
+
+void descrieCamera(const Joc &g) {
+    int c = g.j.camera;
+    cout << "\n== " << NUME_CAMERA[c] << " ==\n";
+    cout << DESCRIERE[c] << "\n";
+    cout << "Iesiri:";
+    for (int d = 0; d < 4; d++) {
+        if (IESIRI[c][d] >= 0) {
+            cout << " " << DIRECTII[d];
+        }
+    }
+    cout << "\n";
+}
+
+bool muta(Joc &g, int directie) {
+    int urmatoarea = IESIRI[g.j.camera][directie];
+    if (urmatoarea < 0) {
+        cout << "Nu poti merge in directia aceea.\n";
+        return false;
+    }
+    g.j.camera = urmatoarea;
+    return true;
+}
 
 // ---------- lupta ----------
...
 
 // ---------- bucla jocului ----------
+void dupaMutare(Joc &g) {
+    descrieCamera(g);
+}
+
+void joaca(Joc &g) {
+    descrieCamera(g);
+    string cmd;
+    while (!g.gata) {
+        cout << "\n> ";
+        if (!(cin >> cmd)) {
+            break;
+        }
+        cin.ignore(numeric_limits<streamsize>::max(), '\n');
+        int d = directieDin(cmd);
+        if (d >= 0) {
+            if (muta(g, d)) {
+                dupaMutare(g);
+            }
+        } else if (cmd == "stare") {
+            afiseazaStare(g.j);
+        } else if (cmd == "harta") {
+            afiseazaHarta(g.j.camera);
+        } else if (cmd == "ajutor") {
+            afiseazaAjutor();
+        } else if (cmd == "iesire") {
+            g.gata = true;
+        } else {
+            cout << "Nu inteleg comanda. Scrie ajutor.\n";
+        }
+    }
+}
 
 // ---------- meniul principal ----------
 void jocNou() {
-    Jucator j = creeazaJucator();
-    afiseazaStare(j);
-    cout << "\nUn monstru te loveste: -12 viata.\n";
-    raneste(j, 12);
-    afiseazaStare(j);
-    cout << "\nBei o potiune: +5 viata.\n";
-    vindeca(j, 5);
-    afiseazaStare(j);
+    Joc g;
+    g.j = creeazaJucator();
+    joaca(g);
 }
 
...
             case 3:
                 afiseazaPoveste();
+                afiseazaAjutor();
                 break;
             case 0:
```

Pentru ordinea funcțiilor: fiecare funcție se scrie **înaintea** celei care o apelează (de exemplu `descrieCamera` înainte de `dupaMutare`, iar `dupaMutare` înainte de `joaca`).

<details>
<summary>Fișierul complet <code>Joc_L43.cpp</code> (ca să compari cu al tău)</summary>

```cpp
/*
   Joc RPG in consola: CASTELUL UITAT
   Fisier: Joc_L43.cpp
   Autor:  Prenume Nume
*/
#include <iostream>
#include <string>
#include <limits>
using namespace std;

// ---------- constante ----------
const string NUME_JOC = "CASTELUL UITAT";
const int NR_CAMERE = 6;
const int NORD = 0;
const int SUD = 1;
const int EST = 2;
const int VEST = 3;

const int CAMERA_POARTA = 0;

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
};
struct Joc {
    Jucator j;
    bool gata = false;
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

**Rulare** (tastezi `1`, `Ana`, `ajutor`, `sud`, `nord`, `vest`, `est`, `est`, `sud`, `nord`, `harta`, `stare`, `iesire`, `0`):
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

> ajutor

Comenzi:
  nord, sud, est, vest   - te muti (sau n, s, e, v)
  stare                  - vezi viata, monedele, scorul
  harta                  - vezi harta castelului
  ajutor                 - afisezi aceasta lista
  iesire                 - parasesti jocul

> sud
Nu poti merge in directia aceea.

> nord

== Sala Mare ==
O sala uriasa, cu un candelabru plin de panze de paianjen. Un negustor ciudat zambeste in colt.
Iesiri: nord sud est vest

> vest

== Armuraria ==
Pe pereti atarna scuturi si sulite ruginite. Aici se pastreaza armele castelului.
Iesiri: est

> est

== Sala Mare ==
O sala uriasa, cu un candelabru plin de panze de paianjen. Un negustor ciudat zambeste in colt.
Iesiri: nord sud est vest

> est

== Bucataria ==
Oale mari, cuptoare reci si miros de supa veche. O scara coboara spre pivnita.
Iesiri: sud vest

> sud

== Pivnita ==
Un loc intunecat si umed, cu butoaie sparte. Se aude un mormait.
Iesiri: nord

> nord

== Bucataria ==
Oale mari, cuptoare reci si miros de supa veche. O scara coboara spre pivnita.
Iesiri: sud vest

> harta

                 [ 5 TURNUL    ]
                        |
[ 2 ARMURARIA ]--[ 1 SALA MARE ]--[*3 BUCATARIA ]
                        |                |
                 [ 0 POARTA    ]  [ 4 PIVNITA   ]
(* = aici esti tu)

> stare
--- Ana ---
Viata:  [##########] 30/30
Atac:   5
Monede: 10
Scor:   0
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

### Exercițiul A — Joc_L43.cpp (obligatoriu)
Scrie programul din Exemplul 12, pornind de la `Joc_L42.cpp`. Compilează după fiecare funcție nouă. Apoi plimbă-te prin toate cele 6 camere și verifică că nu poți trece prin pereți.

### Exercițiul B — Descrieri noi
Schimbă descrierile camerelor, ca să se potrivească temei tale. Adaugă pentru fiecare cameră un detaliu care te-ar face curios (un zgomot, un miros, o lumină).

### Exercițiul C — Scurtături
Adaugă comenzile `nord`, `sud` etc. cu majuscule (de exemplu `Nord`). *Indiciu:* transformă comanda în litere mici înainte de comparare, cu `tolower`.

### Exercițiul D — Camera a șaptea *(Provocare, opțional)*
Adaugă o cameră nouă (de exemplu, o grădină, la vest de Poartă). Trebuie să schimbi `NR_CAMERE`, `NUME_CAMERA`, `DESCRIERE`, `IESIRI` și harta. Verifică drumurile cu programul din Exemplul 11.

### Exercițiul E — Numărătoare de mutări *(Provocare, opțional)*
Numără câte mutări a făcut eroul și afișează numărul în `afiseazaStare`.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Te poți plimba prin toate cele 6 camere  
- [ ] Spre un perete apare mesajul „Nu poți merge…”, iar camera nu se schimbă  
- [ ] Comenzile `stare`, `harta`, `ajutor` și `iesire` funcționează  
- [ ] O comandă necunoscută nu strică jocul  
- [ ] Ai salvat fișierul ca `Joc_L43.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă direcțiile `sus` și `jos` (o scară spre un al doilea etaj)  
- [ ] Ascunde o ușă: o cameră în care poți intra doar dacă ai un anumit obiect (te pregătește pentru lecția 4)  
- [ ] Afișează camera curentă colorată pe hartă  
- [ ] Citește despre algoritmul de căutare în lățime (*BFS*), folosit ca să găsești cel mai scurt drum într-un labirint  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Programul se oprește (sau dă erori ciudate) când mergi spre un perete | Ai folosit `-1` ca număr de cameră | Verifică `IESIRI[…] < 0` înainte de a schimba camera |
| `Segmentation fault` sau valori ciudate | Ai citit din afara tabloului (`NUME_CAMERA[6]`) | Camerele au numere `0`…`5`; verifică indicii |
| Eroul nu se mută, deși mutarea a reușit | Funcția `muta` primește eroul fără `&` | `bool muta(Joc &g, int directie)` |
| Jocul se blochează când nu mai vine nimic de la tastatură | Bucla nu se oprește la sfârșitul intrării | `if (!(cin >> cmd)) { break; }` |
| Comanda `Nord` nu este recunoscută | Programul compară exact litere mici | Transformă comanda în litere mici sau acceptă mai multe variante |
| Descrierea nu corespunde camerei | Tablourile nu sunt în aceeași ordine | `NUME_CAMERA[c]` și `DESCRIERE[c]` trebuie să fie pe aceeași poziție |

---

## Recapitulare pe scurt

- Camerele sunt numerotate; numele și descrierile stau în tablouri cu aceeași ordine.
- `IESIRI[camera][directie]` spune în ce cameră ajungi sau `-1` dacă nu se poate.
- Bucla principală: citește comanda, execută, afișează, repetă până la `iesire`.
- `directieDin` transformă un cuvânt într-o direcție; `muta` verifică tabloul și schimbă camera.
- `struct Joc` ține starea jocului (eroul și dacă s-a terminat); o trimitem prin `&` funcțiilor care o modifică.
- O comandă necunoscută primește un răspuns prietenos, nu tăcere.

---

## Temă
1. Termină Exercițiul A și plimbă-te prin castel de cel puțin două ori, încercând și drumurile imposibile.  
2. Desenează pe hârtie harta jocului tău cu 6 camere. Pentru fiecare cameră, scrie rândul din `IESIRI` (nord, sud, est, vest, cu `-1` unde nu există drum).  
3. Scrie descrieri noi pentru camerele tale.  
4. Salvează tot ca `Joc_L43.cpp`.

---

## Ce urmează — Lecția 4
**Obiecte și rucsac.** Eroul învață să ia obiecte de pe jos (`ia`), să vadă ce are în rucsac (`inventar`) și să folosească o poțiune. Folosim `vector`, căutare în vector și ștergerea unui element, adică exact ce ai învățat în Modulul 4.
