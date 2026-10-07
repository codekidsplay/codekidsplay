# LECȚIA 9 — Curățare cod și depanare
**Modulul 5 · Proiect RPG în consolă · 2 ore**  
**Code Maker Club · RPG Creator**

> Jocul tău a crescut: are sute de linii, zeci de funcții și destule locuri în care se poate ascunde o greșeală. Azi nu adăugăm o regulă nouă de joc, ci învățăm cum arată **un cod îngrijit**, cum **găsim o greșeală** pas cu pas și cum **verificăm automat** că funcțiile merg bine, cu un meniu de **teste interne**.  
> Proiect: **„Joc_L49.cpp”** · meniul „9. Teste interne”.

---

## Obiectiv
La finalul orei știi să faci codul mai ușor de citit (nume bune, constante, funcții scurte, comentarii utile), cum cauți o greșeală cu afișări de control și cum scrii teste simple. Jocul tău are opțiunea „Teste interne”, care verifică 15 lucruri deodată.  
**Minim:** înțelegi diferența dintre cod încâlcit și cod curat și rulezi testele interne.  
**Ținta orei (Complet):** adaugi testele în jocul tău, găsești o greșeală ascunsă și îți îngrijești codul.

## De ce contează
Programatorii citesc cod mult mai mult decât scriu. Un cod curat se citește repede, se repară ușor și poate fi arătat cu mândrie. Testele sunt plasa de siguranță: după fiecare schimbare rulezi testele și afli imediat dacă ai stricat ceva.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: funcții și constante |
| 10–40 | Cod curat: nume, constante, comentarii, funcții mici (**Exemplele 1–4**) |
| 40–70 | Depanare: găsim greșelile (**Exemplele 5 și 6**) |
| 70–90 | Teste automate (**Exemplele 7 și 8**) |
| 90–105 | Jocul lecției, **Joc_L49.cpp** (**Exemplul 12**) |
| 105–118 | Idei în plus (**Exemplele 9–11**, opționale) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Cod curat

### Exemplul 1 — Același program, scris încâlcit și scris curat **[Esențial]**

Ambele programe fac exact același lucru: calculează câte monede îți rămân după ce cumperi 2 poțiuni. Care se înțelege mai ușor?

**Încâlcit:**

```cpp
#include <iostream>
using namespace std;
int main(){int a=20,b=8,c=2;int d=a-b*c;if(d<0)d=0;cout<<d<<"\n";return 0;}
```

**Ieșire:**
```
4
```

**Curat:**

```cpp
#include <iostream>
using namespace std;

int main() {
    int monede = 20;
    int pretPotiune = 8;
    int cantitate = 2;

    int ramas = monede - pretPotiune * cantitate;
    if (ramas < 0) {
        ramas = 0;
    }

    cout << "Monede ramase: " << ramas << "\n";
    return 0;
}
```

**Ieșire:**
```
Monede ramase: 4
```

Ce a făcut diferența: **nume cu sens** (`monede`, nu `a`), **o instrucțiune pe linie**, **indentare** și **rânduri goale** între pași.

### Exemplul 2 — Numerele magice devin constante **[Esențial]**

Un număr scris direct în cod (`160`, `120`) se numește **număr magic**: cine citește nu știe ce înseamnă și, dacă vrei să-l schimbi, trebuie să-l cauți peste tot. Dăm numelui o constantă:

```cpp
#include <iostream>
#include <string>
using namespace std;

const int PRAG_AVENTURIER = 120;
const int PRAG_EROU = 160;

string rang(int puncte) {
    if (puncte >= PRAG_EROU) {
        return "Erou al castelului";
    }
    if (puncte >= PRAG_AVENTURIER) {
        return "Aventurier";
    }
    return "Incepator curajos";
}

int main() {
    int scoruri[] = {170, 130, 40};
    for (int s : scoruri) {
        cout << s << " puncte -> " << rang(s) << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
170 puncte -> Erou al castelului
130 puncte -> Aventurier
40 puncte -> Incepator curajos
```

Dacă mâine vrei ca „Eroul” să înceapă de la 200 de puncte, schimbi **o singură linie**.

### Exemplul 3 — Comentarii care ajută

Un comentariu bun explică **de ce** faci ceva, nu repetă ce face codul. Compară:

```cpp
#include <iostream>
using namespace std;

int pretVanzare(int pretCumparare) {
    // negustorul rascumpara la jumatate din pret (rotunjit in jos)
    return pretCumparare / 2;
}

int main() {
    int x = 7;      // x este egal cu 7        <- comentariu inutil
    cout << "Pretul de vanzare: " << pretVanzare(15) << "\n";
    cout << "x = " << x << "\n";
    return 0;
}
```

**Ieșire:**
```
Pretul de vanzare: 7
x = 7
```

Comentariul din funcție este util: spune **regula jocului**. Cel de la `x` este inutil, fiindcă se vede și fără el.

### Exemplul 4 — O funcție mare, împărțită în funcții mici **[Esențial]**

O funcție ar trebui să facă **un singur lucru**. Aici, afișarea stării eroului este împărțită în trei părți, iar `afiseazaStare` doar le apelează:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Jucator {
    string nume = "Ana";
    int viata = 22;
    int monede = 45;
    vector<string> inventar = {"Sabie", "Cheie"};
};

void afiseazaNume(const Jucator &j) {
    cout << "Erou: " << j.nume << "\n";
}

void afiseazaStatistici(const Jucator &j) {
    cout << "Viata: " << j.viata << "  Monede: " << j.monede << "\n";
}

void afiseazaRucsac(const Jucator &j) {
    cout << "Rucsac: ";
    for (const string &o : j.inventar) {
        cout << o << " ";
    }
    cout << "\n";
}

void afiseazaStare(const Jucator &j) {
    afiseazaNume(j);
    afiseazaStatistici(j);
    afiseazaRucsac(j);
}

int main() {
    Jucator ana;
    afiseazaStare(ana);
    return 0;
}
```

**Ieșire:**
```
Erou: Ana
Viata: 22  Monede: 45
Rucsac: Sabie Cheie 
```

Dacă vrei să schimbi felul în care arată rucsacul, știi exact unde: în `afiseazaRucsac`.

---

## 2. Depanare (*debugging*)

O greșeală în program se numește **bug**. Când rezultatul nu e cel așteptat, nu ghici! Procedează așa:
1. **Reproduci** greșeala (ce date o provoacă?).
2. **Afișezi valorile** de pe parcurs cu `cout`.
3. **Găsești primul loc** unde valoarea nu mai este cea așteptată.
4. **Repari** și rulezi din nou.

### Exemplul 5 — Viața depășește maximul **[Esențial]**

Eroul are `viata = 28` din maxim `30` și bea o poțiune de `10`. Afișăm valorile de control (`[DEBUG]`) ca să vedem ce se întâmplă:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

void vindecaGresit(int &viata, int viataMax, int puncte) {
    viata += puncte;
    cout << "[DEBUG] viata = " << viata << ", maxim = " << viataMax << "\n";
}

void vindeca(int &viata, int viataMax, int puncte) {
    viata = min(viata + puncte, viataMax);
    cout << "[DEBUG] viata = " << viata << ", maxim = " << viataMax << "\n";
}

int main() {
    int viata = 28;
    cout << "Varianta gresita:\n";
    vindecaGresit(viata, 30, 10);

    viata = 28;
    cout << "Varianta corecta:\n";
    vindeca(viata, 30, 10);
    return 0;
}
```

**Ieșire:**
```
Varianta gresita:
[DEBUG] viata = 38, maxim = 30
Varianta corecta:
[DEBUG] viata = 30, maxim = 30
```

Afișarea arată clar problema: `38` este peste maxim. Funcția `min(a, b)` alege valoarea mai mică și rezolvă totul.

### Exemplul 6 — Bara de viață rămâne goală **[Esențial]**

Bara de viață ar trebui să afișeze `[#####.....]` pentru viața `15` din `30`, dar apare goală. Afișăm pasul intermediar:

```cpp
#include <iostream>
#include <string>
using namespace std;

string baraGresita(int valoare, int maxim) {
    int plin = valoare / maxim * 10;
    cout << "[DEBUG] plin = " << plin << "\n";
    return "[" + string(plin, '#') + string(10 - plin, '.') + "]";
}

string bara(int valoare, int maxim) {
    int plin = valoare * 10 / maxim;
    cout << "[DEBUG] plin = " << plin << "\n";
    return "[" + string(plin, '#') + string(10 - plin, '.') + "]";
}

int main() {
    cout << baraGresita(15, 30) << "\n";
    cout << bara(15, 30) << "\n";
    return 0;
}
```

**Ieșire:**
```
[DEBUG] plin = 0
[..........]
[DEBUG] plin = 5
[#####.....]
```

Cauza: `15 / 30` este **împărțire între întregi**, deci `0` (nu `0.5`), iar `0 * 10` rămâne `0`. Dacă **înmulțim întâi** (`15 * 10 / 30`), obținem `5`. Este o capcană clasică la împărțirea cu numere întregi.

---

## 3. Teste automate

### Exemplul 7 — Funcția `verifica` **[Esențial]**

Verificarea manuală este obositoare. Scriem o funcție `verifica(nume, condiție)` care numără testele și anunță doar pe cele **picate**:

```cpp
#include <iostream>
#include <string>
using namespace std;

int teste = 0;
int picate = 0;

void verifica(const string &nume, bool conditie) {
    teste++;
    if (!conditie) {
        picate++;
        cout << "PICAT: " << nume << "\n";
    }
}

int pretVanzare(const string &obiect) {
    if (obiect == "Elixir") {
        return 7;
    }
    return 4;
}

int main() {
    verifica("elixir se vinde cu 7", pretVanzare("Elixir") == 7);
    verifica("sabia se vinde cu 4", pretVanzare("Sabie") == 4);
    verifica("orice altceva se vinde cu 4", pretVanzare("Scut") == 4);

    cout << "Teste: " << teste << ", picate: " << picate << "\n";
    return 0;
}
```

**Ieșire:**
```
Teste: 3, picate: 0
```

Dacă toate trec, nu apare niciun `PICAT`, iar rezumatul spune `picate: 0`.

### Exemplul 8 — Un test care prinde o greșeală **[Esențial]**

Funcția `pozitie` caută un obiect în rucsac și întoarce poziția lui (de la `0`) sau `-1` dacă nu-l găsește. Cineva a greșit-o: întoarce `i + 1`. Testele o prind imediat:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int teste = 0;
int picate = 0;

void verifica(const string &nume, bool conditie) {
    teste++;
    if (!conditie) {
        picate++;
        cout << "PICAT: " << nume << "\n";
    }
}

int pozitie(const vector<string> &v, const string &cautat) {
    for (size_t i = 0; i < v.size(); i++) {
        if (v[i] == cautat) {
            return i + 1;   // GRESEALA: pozitiile incep de la 0
        }
    }
    return -1;
}

int main() {
    vector<string> v = {"Sabie", "Potiune"};
    verifica("prima pozitie este 0", pozitie(v, "Sabie") == 0);
    verifica("a doua pozitie este 1", pozitie(v, "Potiune") == 1);
    verifica("lipsa da -1", pozitie(v, "Scut") == -1);

    cout << "Teste: " << teste << ", picate: " << picate << "\n";
    return 0;
}
```

**Ieșire:**
```
PICAT: prima pozitie este 0
PICAT: a doua pozitie este 1
Teste: 3, picate: 2
```

Două teste pică și arată exact unde e problema. Înlocuiește `i + 1` cu `i`, rulează din nou și toate trec. Fără teste, greșeala ar fi apărut abia în joc, când rucsacul ar fi „pierdut” obiecte.

---

## 4. Alte idei

### Exemplul 9 — `assert`, verificarea care oprește programul *(Provocare, opțional)*

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

`assert(condiție)` din `<cassert>` **oprește programul** cu un mesaj dacă condiția este falsă. E util pentru lucruri care nu au voie niciodată să se întâmple:

```cpp
#include <iostream>
#include <cassert>
#include <string>
#include <vector>
using namespace std;

int pozitie(const vector<string> &v, const string &cautat) {
    for (size_t i = 0; i < v.size(); i++) {
        if (v[i] == cautat) {
            return i;
        }
    }
    return -1;
}

int main() {
    vector<string> v = {"Sabie", "Potiune"};
    assert(pozitie(v, "Sabie") == 0);
    assert(pozitie(v, "Potiune") == 1);
    assert(pozitie(v, "Scut") == -1);
    cout << "Toate asertiunile au trecut.\n";
    return 0;
}
```

**Ieșire:**
```
Toate asertiunile au trecut.
```

### Exemplul 10 — Testăm harta: ieșirile sunt simetrice *(Provocare, opțional)*

Dacă din camera A poți merge spre nord în B, atunci din B trebuie să poți merge spre sud în A. Direcțiile sunt `0=nord, 1=sud, 2=est, 3=vest`; direcția opusă se obține cu `d ^ 1` (0↔1 și 2↔3):

```cpp
#include <iostream>
using namespace std;

const int NR_CAMERE = 4;
const int IESIRI[NR_CAMERE][4] = {
    {1, -1, -1, -1},
    {-1, 0, 2, -1},
    {-1, -1, -1, 1},
    {-1, -1, -1, -1}
};

int main() {
    bool ok = true;
    for (int c = 0; c < NR_CAMERE; c++) {
        for (int d = 0; d < 4; d++) {
            int vecin = IESIRI[c][d];
            if (vecin >= 0 && IESIRI[vecin][d ^ 1] != c) {
                cout << "Problema: camera " << c << " are iesire in directia " << d
                     << " spre camera " << vecin << ", dar nu si invers.\n";
                ok = false;
            }
        }
    }
    cout << (ok ? "Harta este in regula." : "Harta are probleme.") << "\n";
    return 0;
}
```

**Ieșire:**
```
Harta este in regula.
```

### Exemplul 11 — Testăm o luptă de 200 de ori *(Provocare, opțional)*

Pentru lucruri cu zaruri, un singur test nu ajunge. Simulăm 200 de lupte și verificăm că eroul (atac 8, viață 30) bate mereu un goblin (viață 14, atac 3, lovește cu 0–2 în plus):

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int zar(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
}

bool luptaCastigata() {
    int eroul = 30;
    int goblin = 14;
    while (eroul > 0 && goblin > 0) {
        goblin -= 8 + zar(0, 2);
        if (goblin > 0) {
            eroul -= 3 + zar(0, 2);
        }
    }
    return eroul > 0;
}

int main() {
    srand(time(0));
    int victorii = 0;
    for (int i = 0; i < 200; i++) {
        if (luptaCastigata()) {
            victorii++;
        }
    }
    cout << "Victorii: " << victorii << " din 200\n";
    return 0;
}
```

**Exemplu de ieșire** (la tine numerele aleatoare vor fi altele):
```
Victorii: 200 din 200
```

---

## 5. Jocul lecției

### Exemplul 12 — **Joc_L49.cpp**: teste interne **[Esențial]**

Pornim de la **Joc_L48.cpp**. Adăugăm secțiunea „teste” (variabilele `teste` și `picate`, funcția `verifica` și funcția `ruleazaTeste`) și opțiunea **9. Teste interne** în meniu. Funcția `ruleazaTeste` verifică 15 lucruri din joc: căutarea în rucsac, viața, bara, prețurile, mișcările și simetria hărții.

Iată ce s-a **schimbat** față de lecția trecută (`+` = linii de adăugat, `-` = linii de șters, `...` = restul codului rămâne la fel):

```diff
...
 
 // ---------- teste ----------
+int teste = 0;
+int picate = 0;
+
+void verifica(const string &nume, bool conditie) {
+    teste++;
+    if (!conditie) {
+        picate++;
+        cout << "PICAT: " << nume << "\n";
+    }
+}
+
+void ruleazaTeste() {
+    teste = 0;
+    picate = 0;
+
+    vector<string> v = {"Sabie", "Potiune"};
+    verifica("pozitie gaseste", pozitie(v, "Potiune") == 1);
+    verifica("pozitie nu gaseste", pozitie(v, "Scut") == -1);
+
+    Jucator j;
+    raneste(j, 10);
+    verifica("raneste scade viata", j.viata == 20);
+    raneste(j, 100);
+    verifica("viata nu coboara sub 0", j.viata == 0);
+    verifica("jucatorul mort", !esteViu(j));
+    vindeca(j, 1000);
+    verifica("viata nu depaseste maximul", j.viata == j.viataMax);
+
+    verifica("bara plina", bara(30, 30) == "[##########]");
+    verifica("bara goala", bara(0, 30) == "[..........]");
+    verifica("bara pe jumatate", bara(15, 30) == "[#####.....]");
+
+    verifica("pret vanzare produs", pretVanzare("Elixir") == 7);
+    verifica("pret vanzare alt obiect", pretVanzare("Sabie") == 4);
+
+    Joc g;
+    verifica("miscare valida", muta(g, NORD) && g.j.camera == CAMERA_SALA);
+    verifica("miscare inapoi", muta(g, SUD) && g.j.camera == CAMERA_POARTA);
+    verifica("nu exista iesire spre vest din Poarta", IESIRI[CAMERA_POARTA][VEST] == -1);
+
+    bool hartaOk = true;
+    for (int c = 0; c < NR_CAMERE; c++) {
+        for (int d = 0; d < 4; d++) {
+            int vecin = IESIRI[c][d];
+            if (vecin >= 0 && IESIRI[vecin][d ^ 1] != c) {
+                hartaOk = false;
+            }
+        }
+    }
+    verifica("harta este simetrica", hartaOk);
+
+    cout << "Teste: " << teste << ", picate: " << picate << "\n";
+}
 
 // ---------- bucla jocului ----------
...
     cout << "  3. Cum se joaca\n";
     cout << "  4. Continua jocul\n";
+    cout << "  9. Teste interne\n";
     cout << "  0. Iesire\n";
 }
...
                 continuaJoc();
                 break;
+            case 9:
+                ruleazaTeste();
+                break;
             case 0:
                 cout << "\nLa revedere!\n";
```

Alege din meniu opțiunea `9`: dacă totul este în regulă, vezi `Teste: 15, picate: 0`. Dacă modifici ceva în joc și un test pică, afli imediat **ce** ai stricat.

<details>
<summary>Fișierul complet <code>Joc_L49.cpp</code> (ca să compari cu al tău)</summary>

```cpp
/*
   Joc RPG in consola: CASTELUL UITAT
   Fisier: Joc_L49.cpp
   Autor:  Prenume Nume
*/
#include <iostream>
#include <string>
#include <limits>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <fstream>
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
const string FISIER_SALVARE = "salvare.txt";

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
    cout << "  salveaza               - salvezi jocul\n";
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
bool salveaza(const Joc &g) {
    ofstream fout(FISIER_SALVARE);
    if (!fout.is_open()) {
        return false;
    }
    const Jucator &j = g.j;
    fout << j.nume << "\n";
    fout << j.viata << " " << j.viataMax << " " << j.atac << " " << j.monede << " ";
    fout << j.scor << " " << j.camera << "\n";
    fout << g.monstruInvins << " " << g.cheiaGasita << " " << g.cufarDeschis << "\n";
    fout << j.inventar.size() << "\n";
    for (const string &o : j.inventar) {
        fout << o << "\n";
    }
    for (int i = 0; i < NR_CAMERE; i++) {
        fout << (g.obiect[i].empty() ? "-" : g.obiect[i]) << "\n";
    }
    return true;
}

bool incarca(Joc &g) {
    ifstream fin(FISIER_SALVARE);
    if (!fin.is_open()) {
        return false;
    }
    Joc nou;
    Jucator &j = nou.j;
    getline(fin, j.nume);
    fin >> j.viata >> j.viataMax >> j.atac >> j.monede >> j.scor >> j.camera;
    fin >> nou.monstruInvins >> nou.cheiaGasita >> nou.cufarDeschis;
    size_t n;
    fin >> n;
    string linie;
    getline(fin, linie);
    for (size_t i = 0; i < n; i++) {
        getline(fin, linie);
        j.inventar.push_back(linie);
    }
    for (int i = 0; i < NR_CAMERE; i++) {
        getline(fin, linie);
        nou.obiect[i] = (linie == "-") ? "" : linie;
    }
    if (!fin || j.camera < 0 || j.camera >= NR_CAMERE || j.viataMax <= 0) {
        return false;
    }
    g = nou;
    return true;
}

// ---------- teste ----------
int teste = 0;
int picate = 0;

void verifica(const string &nume, bool conditie) {
    teste++;
    if (!conditie) {
        picate++;
        cout << "PICAT: " << nume << "\n";
    }
}

void ruleazaTeste() {
    teste = 0;
    picate = 0;

    vector<string> v = {"Sabie", "Potiune"};
    verifica("pozitie gaseste", pozitie(v, "Potiune") == 1);
    verifica("pozitie nu gaseste", pozitie(v, "Scut") == -1);

    Jucator j;
    raneste(j, 10);
    verifica("raneste scade viata", j.viata == 20);
    raneste(j, 100);
    verifica("viata nu coboara sub 0", j.viata == 0);
    verifica("jucatorul mort", !esteViu(j));
    vindeca(j, 1000);
    verifica("viata nu depaseste maximul", j.viata == j.viataMax);

    verifica("bara plina", bara(30, 30) == "[##########]");
    verifica("bara goala", bara(0, 30) == "[..........]");
    verifica("bara pe jumatate", bara(15, 30) == "[#####.....]");

    verifica("pret vanzare produs", pretVanzare("Elixir") == 7);
    verifica("pret vanzare alt obiect", pretVanzare("Sabie") == 4);

    Joc g;
    verifica("miscare valida", muta(g, NORD) && g.j.camera == CAMERA_SALA);
    verifica("miscare inapoi", muta(g, SUD) && g.j.camera == CAMERA_POARTA);
    verifica("nu exista iesire spre vest din Poarta", IESIRI[CAMERA_POARTA][VEST] == -1);

    bool hartaOk = true;
    for (int c = 0; c < NR_CAMERE; c++) {
        for (int d = 0; d < 4; d++) {
            int vecin = IESIRI[c][d];
            if (vecin >= 0 && IESIRI[vecin][d ^ 1] != c) {
                hartaOk = false;
            }
        }
    }
    verifica("harta este simetrica", hartaOk);

    cout << "Teste: " << teste << ", picate: " << picate << "\n";
}

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
        } else if (cmd == "salveaza") {
            if (salveaza(g)) {
                cout << "Joc salvat.\n";
            } else {
                cout << "Nu am putut salva jocul.\n";
            }
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
void continuaJoc() {
    Joc g;
    if (!incarca(g)) {
        cout << "\nNu exista nicio salvare valida. Porneste un joc nou.\n";
        return;
    }
    cout << "\nJoc incarcat. Bine ai revenit, " << g.j.nume << "!\n";
    joaca(g);
}

void afiseazaMeniu() {
    afiseazaTitlu();
    cout << "  1. Joc nou\n";
    cout << "  2. Harta castelului\n";
    cout << "  3. Cum se joaca\n";
    cout << "  4. Continua jocul\n";
    cout << "  9. Teste interne\n";
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
            case 4:
                continuaJoc();
                break;
            case 9:
                ruleazaTeste();
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

**Exemplu de rulare** (tastezi `9`, `0`; la tine zarurile dau alte rezultate):
```

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  4. Continua jocul
  9. Teste interne
  0. Iesire
Alege: 9
Teste: 15, picate: 0

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  4. Continua jocul
  9. Teste interne
  0. Iesire
Alege: 0

La revedere!
```

</details>

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Joc_L49.cpp (obligatoriu)
Scrie programul din Exemplul 12, pornind de la `Joc_L48.cpp`. Rulează testele interne (opțiunea `9`) și verifică să vezi `picate: 0`.

### Exercițiul B — Curățenie în propriul cod
Parcurge codul jocului tău și verifică această listă:
- [ ] Toate funcțiile au nume care spun ce fac  
- [ ] Nu mai ai numere magice (le-ai înlocuit cu constante)  
- [ ] Codul are indentare uniformă  
- [ ] Există comentarii acolo unde regula nu se vede din cod  
- [ ] Nu ai cod rămas „pentru probă” (afișări `[DEBUG]` uitate)  

### Exercițiul C — Strică și repară
Strică **intenționat** o funcție (de exemplu, schimbă prețul poțiunii în `pretVanzare`), rulează testele și observă ce pică. Apoi repară și rulează din nou.

### Exercițiul D — Două teste noi
Adaugă în `ruleazaTeste` două teste ale tale (de exemplu, „Scutul costă 12” sau „din Sala Mare se poate merge la est”).

### Exercițiul E — Test de luptă *(Provocare, opțional)*
Adaugă un test care simulează lupta cu goblinul de 200 de ori (Exemplul 11) și verifică că eroul câștigă.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Opțiunea 9 afișează `Teste: 15, picate: 0` (sau mai multe teste, dacă ai adăugat)  
- [ ] Ai strâns toate numerele magice în constante  
- [ ] Ai citit tot codul și l-ai îngrijit conform listei  
- [ ] Ai salvat fișierul ca `Joc_L49.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Mută testele în funcții separate (`testeJucator`, `testeHarta`, `testeMagazin`)  
- [ ] Rugă un coleg să citească codul tău și să spună ce nu înțelege. Apoi îmbunătățește acele locuri  
- [ ] Adaugă un test care verifică salvarea: salvează un erou, încarcă-l și compară câmpurile  
- [ ] Caută în codul tău orice funcție mai lungă de 30 de linii și împart-o  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Viața depășește maximul | Lipsește limitarea | `viata = min(viata + puncte, viataMax);` |
| Bara de viață apare goală | Împărțire între întregi | Înmulțește întâi: `valoare * 10 / maxim` |
| Pozițiile din rucsac sunt mutate cu 1 | Numărătoarea începe de la `0` | Întoarce `i`, nu `i + 1` |
| Testele trec, dar jocul tot greșește | Testul nu verifică și cazul problemă | Adaugă un test pentru cazul care a greșit |
| Mesajele `[DEBUG]` apar și în jocul final | Le-ai uitat în cod | Șterge-le după ce ai găsit greșeala |
| Nu mai știi ce face o variabilă | Nume ca `a`, `b`, `x2` | Redenumește: `monede`, `viata`, `camera` |
| Am schimbat un număr și jocul s-a stricat | Același număr era scris în mai multe locuri | Folosește constante |

---

## Recapitulare pe scurt

- Cod curat: **nume cu sens**, **constante** în loc de numere magice, **funcții mici** cu un singur scop, **comentarii** care explică „de ce”.
- Depanare: reproduci, **afișezi valori de control**, găsești primul loc greșit, repari.
- `min(a, b)` limitează o valoare; împărțirea între întregi trunchiază (`15 / 30` este `0`).
- Teste: funcția `verifica` numără testele și arată doar ce pică.
- Rulează testele după fiecare schimbare mare.

---

## Temă
1. Termină Exercițiul A și rulează testele interne.  
2. Parcurge lista de la Exercițiul B și curăță cel puțin trei locuri din codul tău.  
3. Pregătește-ți **prezentarea de mâine**: scrie, în 3–4 propoziții, ce face jocul tău și ce ți-a plăcut cel mai mult să construiești.  
4. Salvează tot ca `Joc_L49.cpp`.

---

## Ce urmează — Lecția 10
**Prezentare și finalul jocului.** Punem ultimele retușuri (rang pe ecranul final, ecranul „Despre joc”), îți personalizezi povestea, rezolvi un mic test și îți prezinți jocul colegilor. La final primești diploma **RPG Creator**.
