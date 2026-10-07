# LECȚIA 10 — Prezentare și finalul jocului
**Modulul 5 · Proiect RPG în consolă · 2 ore**  
**Code Maker Club · RPG Creator**

> Ai ajuns la ultima oră! Ai construit, lecție cu lecție, un joc adevărat: cu hartă, erou, rucsac, monștri, magazin, misiuni și salvare. Azi punem ultimele retușuri (rang pe ecranul final, ecranul „Despre joc”), ți-l faci **al tău** (altă temă, altă cameră, alt monstru), rezolvi un mic test și îl **prezinți** colegilor.  
> Proiect: **„Joc_L50.cpp”** · jocul tău final.

---

## Obiectiv
La finalul orei ai jocul terminat, personalizat după povestea ta, și îl prezinți în 3–5 minute. Primești diploma **RPG Creator**.  
**Minim:** jocul rulează de la început până la final, are numele tău în „Despre joc” și îl poți prezenta.  
**Ținta orei (Complet):** jocul are rang pe ecranul final, o temă proprie (cel puțin o cameră sau un monstru nou) și o prezentare clară.

## De ce contează
Un proiect terminat și prezentat valorează mai mult decât zece proiecte lăsate la jumătate. Să explici cum ai gândit un program este o abilitate la fel de importantă ca scrisul codului: așa lucrează programatorii într-o echipă. Iar acum ai în mână un proiect de care poți fi mândru.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: ce am construit în 10 lecții |
| 10–35 | Rang și ecranul „Despre” (**Exemplele 1 și 2**) |
| 35–65 | Personalizare: temă, cameră, monstru nou (**Exemplele 3–5**) |
| 65–80 | Fișa jocului și diploma (**Exemplele 6–8**) |
| 80–95 | Jocul final, **Joc_L50.cpp** (**Exemplul 12**) și testul final |
| 95–115 | Prezentările |
| 115–120 | Diplome și încheiere |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Ultimele retușuri

### Exemplul 1 — Rangul de pe ecranul final **[Esențial]**

În loc să arătăm doar un număr, jocul îți dă un **rang**. Scorul total (puncte + monede) se compară cu două praguri:

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

void afiseazaScorFinal(int scor, int monede) {
    int total = scor + monede;
    cout << "Scor final: " << total << "  (" << rang(total) << ")\n";
}

int main() {
    afiseazaScorFinal(135, 25);
    afiseazaScorFinal(100, 20);
    afiseazaScorFinal(60, 10);
    return 0;
}
```

**Ieșire:**
```
Scor final: 160  (Erou al castelului)
Scor final: 120  (Aventurier)
Scor final: 70  (Incepator curajos)
```

### Exemplul 2 — Ecranul „Despre joc” **[Esențial]**

Orice joc are un ecran cu titlul și autorul. Folosește numele **tău** la `Autor`:

```cpp
#include <iostream>
#include <string>
using namespace std;

const string NUME_JOC = "CASTELUL UITAT";

void afiseazaDespre() {
    cout << "\n" << NUME_JOC << " - un joc creat de elevii Code Maker Club.\n";
    cout << "Scris in C++, in consola, cu structuri, vectori si fisiere.\n";
    cout << "Autor: Ana Popescu\n";
}

int main() {
    afiseazaDespre();
    return 0;
}
```

**Ieșire:**
```

CASTELUL UITAT - un joc creat de elevii Code Maker Club.
Scris in C++, in consola, cu structuri, vectori si fisiere.
Autor: Ana Popescu
```

---

## 2. Jocul devine al tău

Structura jocului nu depinde de poveste: hărțile, descrierile și numele sunt **date** (tablouri și constante). Dacă le schimbi, schimbi povestea fără să atingi logica.

### Exemplul 3 — Altă temă, aceleași camere **[Esențial]**

Povestea ar putea fi în spațiu, nu într-un castel. Schimbăm doar numele jocului, numele camerelor și descrierile:

```cpp
#include <iostream>
#include <string>
using namespace std;

const string NUME_JOC = "STATIA PIERDUTA";
const int NR_CAMERE = 6;

const string NUME_CAMERA[NR_CAMERE] = {
    "Sas de intrare", "Sala de comanda", "Laboratorul",
    "Dormitoarele", "Depozitul", "Camera reactorului"
};

const string DESCRIERE[NR_CAMERE] = {
    "Usa grea se inchide in spatele tau. Luminile palpaie.",
    "Ecrane vechi si butoane care clipesc. Un robot-negustor te priveste.",
    "Eprubete sparte si un miros ciudat.",
    "Paturi suprapuse si haine uitate.",
    "Cutii metalice, intr-o umbra rece. Se aude un zgomot.",
    "Un seif greu, inchis cu cheie, sta in mijlocul camerei."
};

int main() {
    cout << "=== " << NUME_JOC << " ===\n";
    for (int i = 0; i < NR_CAMERE; i++) {
        cout << i << ". " << NUME_CAMERA[i] << ": " << DESCRIERE[i] << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
=== STATIA PIERDUTA ===
0. Sas de intrare: Usa grea se inchide in spatele tau. Luminile palpaie.
1. Sala de comanda: Ecrane vechi si butoane care clipesc. Un robot-negustor te priveste.
2. Laboratorul: Eprubete sparte si un miros ciudat.
3. Dormitoarele: Paturi suprapuse si haine uitate.
4. Depozitul: Cutii metalice, intr-o umbra rece. Se aude un zgomot.
5. Camera reactorului: Un seif greu, inchis cu cheie, sta in mijlocul camerei.
```

Schimbi și obiectele (`Sabie` → `Cheie magnetica`) și monștrii (`Goblin` → `Robot defect`), iar jocul devine altul.

### Exemplul 4 — O cameră nouă **[Esențial]**

Pentru o cameră nouă, adaugi **un element în fiecare tablou** (`NUME_CAMERA`, `DESCRIERE`, un rând în `IESIRI`) și mărești `NR_CAMERE`. Plus: legi noua cameră de una veche, în **ambele sensuri**. Iată o Grădină (camera 6) legată la vest de Poarta castelului (camera 0):

```cpp
#include <iostream>
#include <string>
using namespace std;

const int NR_CAMERE = 7;
const string DIRECTII[4] = {"nord", "sud", "est", "vest"};
const string NUME_CAMERA[NR_CAMERE] = {
    "Poarta castelului", "Sala Mare", "Armuraria",
    "Bucataria", "Pivnita", "Turnul", "Gradina"
};

// ordinea: nord, sud, est, vest (-1 = nu exista iesire)
const int IESIRI[NR_CAMERE][4] = {
    {1, -1, -1, 6},   // Poarta: acum are iesire si spre vest (Gradina)
    {5, 0, 3, 2},
    {-1, -1, 1, -1},
    {-1, 4, -1, 1},
    {3, -1, -1, -1},
    {-1, 1, -1, -1},
    {-1, -1, 0, -1}   // Gradina: iesire doar spre est (inapoi la Poarta)
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
Poarta castelului: nord->Sala Mare; vest->Gradina;
Sala Mare: nord->Turnul; sud->Poarta castelului; est->Bucataria; vest->Armuraria;
Armuraria: est->Sala Mare;
Bucataria: sud->Pivnita; vest->Sala Mare;
Pivnita: nord->Bucataria;
Turnul: sud->Sala Mare;
Gradina: est->Poarta castelului;
```

Observă că și camera veche `Poarta castelului` a primit o ieșire nouă (`6` pe poziția `vest`). Dacă uiți una dintre cele două legături, jucătorul poate intra în grădină, dar nu mai poate ieși. Testul „harta este simetrică” din lecția 9 te avertizează!

> **Atenție:** cu o cameră în plus, funcțiile care folosesc `NR_CAMERE` merg singure, dar obiectele din cameră (`obiect[NR_CAMERE]`) și salvarea au și ele nevoie de elementul nou.

### Exemplul 5 — Un monstru nou **[Esențial]**

Monștrii sunt date: nume, viață, atac și recompensă. Adăugarea unuia este doar o linie nouă într-o listă:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Monstru {
    string nume;
    int viata;
    int atac;
    int recompensa;
};

int main() {
    vector<Monstru> monstri = {
        {"Goblin", 14, 3, 15},
        {"Schelet", 20, 4, 20},
        {"Dragon de gheata", 35, 6, 50}   // monstrul tau!
    };

    for (const Monstru &m : monstri) {
        cout << m.nume << ": viata " << m.viata << ", atac " << m.atac
             << ", recompensa " << m.recompensa << " monede\n";
    }
    return 0;
}
```

**Ieșire:**
```
Goblin: viata 14, atac 3, recompensa 15 monede
Schelet: viata 20, atac 4, recompensa 20 monede
Dragon de gheata: viata 35, atac 6, recompensa 50 monede
```

**Echilibrul jocului:** un monstru foarte puternic poate face jocul imposibil. Înainte de a-l adăuga, joacă și întreabă-te: „Pot să-l înving cu obiectele pe care le am până atunci?”.

---

## 3. Fișa, ghidul și diploma

### Exemplul 6 — Fișa jocului **[Esențial]**

La prezentare vei spune ce conține jocul. Un `struct` poate ține „fișa” lui:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct FisaJoc {
    string titlu;
    string autor;
    int camere;
    int monstri;
    int obiecte;
};

void afiseazaFisa(const FisaJoc &f) {
    cout << "Joc:      " << f.titlu << "\n";
    cout << "Autor:    " << f.autor << "\n";
    cout << "Camere:   " << f.camere << "\n";
    cout << "Monstri:  " << f.monstri << "\n";
    cout << "Obiecte:  " << f.obiecte << "\n";
}

int main() {
    FisaJoc fisa = {"Castelul Uitat", "Ana Popescu", 6, 3, 5};
    afiseazaFisa(fisa);
    return 0;
}
```

**Ieșire:**
```
Joc:      Castelul Uitat
Autor:    Ana Popescu
Camere:   6
Monstri:  3
Obiecte:  5
```

### Exemplul 7 — Ghidul prezentării

O prezentare bună are pași clari. Îi ținem într-un `vector` și îi numerotăm cu un ciclu:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> pasi = {
        "Spune cum se numeste jocul si despre ce este povestea",
        "Arata harta si explica cum te misti",
        "Joaca 2-3 minute: ia un obiect, intra intr-o lupta",
        "Arata un lucru de care esti mandru in cod",
        "Spune ce ai invatat si ce ai vrea sa adaugi"
    };

    cout << "Ghidul prezentarii:\n";
    for (size_t i = 0; i < pasi.size(); i++) {
        cout << i + 1 << ". " << pasi[i] << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Ghidul prezentarii:
1. Spune cum se numeste jocul si despre ce este povestea
2. Arata harta si explica cum te misti
3. Joaca 2-3 minute: ia un obiect, intra intr-o lupta
4. Arata un lucru de care esti mandru in cod
5. Spune ce ai invatat si ce ai vrea sa adaugi
```

### Exemplul 8 — Diploma, centrată în consolă **[Esențial]**

Un text se centrează calculând câte spații trebuie puse în față: `(lățime − lungimea textului) / 2`. Cu `string(n, ' ')` obținem acele spații:

```cpp
#include <iostream>
#include <string>
using namespace std;

void afiseazaCentrat(const string &text, int latime) {
    int spatii = (latime - (int)text.size()) / 2;
    if (spatii < 0) {
        spatii = 0;
    }
    cout << string(spatii, ' ') << text << "\n";
}

int main() {
    const int LATIME = 40;
    string nume = "Ana Popescu";

    cout << string(LATIME, '=') << "\n";
    afiseazaCentrat("DIPLOMA", LATIME);
    afiseazaCentrat("RPG Creator", LATIME);
    afiseazaCentrat("", LATIME);
    afiseazaCentrat(nume, LATIME);
    afiseazaCentrat("a creat un joc in C++", LATIME);
    cout << string(LATIME, '=') << "\n";
    return 0;
}
```

**Ieșire:**
```
========================================
                DIPLOMA
              RPG Creator
                    
              Ana Popescu
         a creat un joc in C++
========================================
```

---

## 4. Alte idei

### Exemplul 9 — Statistici de joc: numărăm mutările *(Provocare, opțional)*

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

Adăugăm în joc un contor de statistici, afișat pe ecranul final:

```cpp
#include <iostream>
using namespace std;

struct Statistici {
    int mutari = 0;
    int lupte = 0;
    int cumparaturi = 0;
};

void afiseazaStatistici(const Statistici &s) {
    cout << "--- Statisticile aventurii ---\n";
    cout << "Mutari:      " << s.mutari << "\n";
    cout << "Lupte:       " << s.lupte << "\n";
    cout << "Cumparaturi: " << s.cumparaturi << "\n";
}

int main() {
    Statistici s;
    for (int i = 0; i < 9; i++) {
        s.mutari++;
    }
    s.lupte++;
    s.cumparaturi += 2;
    afiseazaStatistici(s);
    return 0;
}
```

**Ieșire:**
```
--- Statisticile aventurii ---
Mutari:      9
Lupte:       1
Cumparaturi: 2
```

### Exemplul 10 — Clasamentul celor mai bune 3 scoruri *(Provocare, opțional)*

Ținem scorurile într-un `vector<int>` și le sortăm descrescător cu `sort` și `greater<int>()`:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

int main() {
    vector<int> scoruri = {120, 165, 90, 140, 175};
    sort(scoruri.begin(), scoruri.end(), greater<int>());

    cout << "Top 3 scoruri:\n";
    for (int i = 0; i < 3 && i < (int)scoruri.size(); i++) {
        cout << i + 1 << ". " << scoruri[i] << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Top 3 scoruri:
1. 175
2. 165
3. 140
```

### Exemplul 11 — Mesaj de întâmpinare aleator *(Provocare, opțional)*

La fiecare pornire, jocul alege un mesaj diferit din listă:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));
    vector<string> mesaje = {
        "Castelul te asteapta, curajosule!",
        "Se zice ca in turn se ascunde o comoara.",
        "Ai grija la goblinul din pivnita!"
    };
    cout << mesaje[rand() % mesaje.size()] << "\n";
    return 0;
}
```

**Exemplu de ieșire** (la tine numerele aleatoare vor fi altele):
```
Se zice ca in turn se ascunde o comoara.
```

---

## 5. Jocul final

### Exemplul 12 — **Joc_L50.cpp**: jocul complet **[Esențial]**

Pornim de la **Joc_L49.cpp**. Adăugăm cele două constante de rang (`PRAG_AVENTURIER`, `PRAG_EROU`), funcția `rang`, ecranul `afiseazaDespre` și opțiunea **5. Despre joc** în meniu. Pe ecranul final apare acum și rangul.

Iată ce s-a **schimbat** față de lecția trecută (`+` = linii de adăugat, `-` = linii de șters, `...` = restul codului rămâne la fel):

```diff
...
 const int PRET[NR_PRODUSE] = {8, 15, 12, 20};
 const string FISIER_SALVARE = "salvare.txt";
+const int PRAG_AVENTURIER = 120;
+const int PRAG_EROU = 160;
 
 // ---------- structuri ----------
...
     g.gata = true;
 }
+string rang(int puncte) {
+    if (puncte >= PRAG_EROU) {
+        return "Erou al castelului";
+    }
+    if (puncte >= PRAG_AVENTURIER) {
+        return "Aventurier";
+    }
+    return "Incepator curajos";
+}
 void afiseazaFinal(const Joc &g) {
     if (g.cufarDeschis) {
...
         return;
     }
-    cout << "Scor final: " << g.j.scor + g.j.monede << "\n";
+    int total = g.j.scor + g.j.monede;
+    cout << "Scor final: " << total << "  (" << rang(total) << ")\n";
 }
 
...
     joaca(g);
 }
+void afiseazaDespre() {
+    cout << "\n" << NUME_JOC << " - un joc creat de elevii Code Maker Club.\n";
+    cout << "Scris in C++, in consola, cu structuri, vectori si fisiere.\n";
+    cout << "Autor: Prenume Nume\n";
+}
 
 void afiseazaMeniu() {
...
     cout << "  3. Cum se joaca\n";
     cout << "  4. Continua jocul\n";
+    cout << "  5. Despre joc\n";
     cout << "  9. Teste interne\n";
     cout << "  0. Iesire\n";
...
                 continuaJoc();
                 break;
+            case 5:
+                afiseazaDespre();
+                break;
             case 9:
                 ruleazaTeste();
```

În `afiseazaDespre`, **înlocuiește `Prenume Nume`** cu numele tău.

<details>
<summary>Fișierul complet <code>Joc_L50.cpp</code> (ca să compari cu al tău)</summary>

```cpp
/*
   Joc RPG in consola: CASTELUL UITAT
   Fisier: Joc_L50.cpp
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
const int PRAG_AVENTURIER = 120;
const int PRAG_EROU = 160;

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
string rang(int puncte) {
    if (puncte >= PRAG_EROU) {
        return "Erou al castelului";
    }
    if (puncte >= PRAG_AVENTURIER) {
        return "Aventurier";
    }
    return "Incepator curajos";
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
    int total = g.j.scor + g.j.monede;
    cout << "Scor final: " << total << "  (" << rang(total) << ")\n";
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
void afiseazaDespre() {
    cout << "\n" << NUME_JOC << " - un joc creat de elevii Code Maker Club.\n";
    cout << "Scris in C++, in consola, cu structuri, vectori si fisiere.\n";
    cout << "Autor: Prenume Nume\n";
}

void afiseazaMeniu() {
    afiseazaTitlu();
    cout << "  1. Joc nou\n";
    cout << "  2. Harta castelului\n";
    cout << "  3. Cum se joaca\n";
    cout << "  4. Continua jocul\n";
    cout << "  5. Despre joc\n";
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
            case 5:
                afiseazaDespre();
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

**Exemplu de rulare** (tastezi `1`, `Ana`, `nord`, `vest`, `ia`, `est`, `est`, `ia`, `sud`, `1`, `1`, `ia`, `nord`, `vest`, `nord`, `deschide`, `5`, `0`; la tine zarurile dau alte rezultate):
```

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  4. Continua jocul
  5. Despre joc
  9. Teste interne
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

> sud

== Pivnita ==
Un loc intunecat si umed, cu butoaie sparte. Se aude un mormait.
Pe jos se afla: Cheie.
Iesiri: nord

!!! Un Goblin iti iese in cale !!!

Ana [##########] 30   |   Goblin [##########] 14
1 Ataca   2 Potiune   3 Fugi: 1
Il lovesti pe Goblin cu 10 puncte!
Goblin te loveste cu 4 puncte!

Ana [########..] 26   |   Goblin [##........] 4
1 Ataca   2 Potiune   3 Fugi: 1
Il lovesti pe Goblin cu 9 puncte!

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
Scor final: 160  (Erou al castelului)

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  4. Continua jocul
  5. Despre joc
  9. Teste interne
  0. Iesire
Alege: 5

CASTELUL UITAT - un joc creat de elevii Code Maker Club.
Scris in C++, in consola, cu structuri, vectori si fisiere.
Autor: Prenume Nume

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  4. Continua jocul
  5. Despre joc
  9. Teste interne
  0. Iesire
Alege: 0

La revedere!
```

</details>

---

## Testul final (10 întrebări)

Răspunde pe hârtie, apoi verifică răspunsurile.

1. Ce tip de variabilă ține minte că „monstrul a fost învins”?  
2. Cu ce cuvânt trimiți o variabilă într-o funcție **prin referință**, ca funcția s-o poată modifica?  
3. Ce afișează `string(3, '#')`?  
4. Ce valoare are `15 / 30` între întregi?  
5. Ce variabilă `bool` oprește bucla principală a jocului când devine `true`?  
6. Ce bibliotecă folosești pentru fișiere?  
7. Dacă salvezi `nume`, apoi `viata`, în ce ordine trebuie să le citești?  
8. Ce valoare întoarce `pozitie(v, "Scut")` dacă obiectul nu este în vector?  
9. De ce folosim constante (`const int`) în loc de numere scrise direct în cod?  
10. Care sunt pașii pe care îi faci când cauți o greșeală în program?

<details>
<summary>Răspunsuri</summary>

1. `bool` (de exemplu `monstruInvins`).  
2. Cu `&` în lista de parametri: `void raneste(Jucator &j, int puncte)`.  
3. `###`.  
4. `0` (împărțirea între întregi trunchiază).  
5. `gata` (`g.gata = true;`): o setează `iesire`, moartea eroului sau cufărul deschis.  
6. `<fstream>`.  
7. În aceeași ordine: întâi `nume`, apoi `viata`.  
8. `-1`.  
9. Ca să fie ușor de înțeles și de schimbat: modifici valoarea într-un singur loc.  
10. Reproduci greșeala, afișezi valori de control cu `cout`, găsești primul loc unde valoarea e greșită, apoi repari.

</details>

---

## Prezentarea (3–5 minute)

Folosește ghidul din Exemplul 7:
1. **Titlul și povestea**: despre ce este jocul tău?  
2. **Demonstrație**: joacă 2–3 minute în fața colegilor.  
3. **Codul**: arată o funcție de care ești mândru și explică în 2–3 propoziții ce face.  
4. **Ce ai învățat** și **ce ai mai adăuga**.  

**Ce urmărim la prezentare:**
- [ ] Jocul pornește și rulează fără să se blocheze  
- [ ] Se poate câștiga și se poate pierde  
- [ ] Ai personalizat ceva (temă, cameră, monstru, obiect)  
- [ ] Poți explica cu vorbele tale cum funcționează o parte din cod  
- [ ] Testele interne (opțiunea 9) arată `picate: 0`  

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Joc_L50.cpp (obligatoriu)
Scrie programul din Exemplul 12, pornind de la `Joc_L49.cpp`. Pune-ți numele la „Despre joc”. Joacă-l de la început până la câștig.

### Exercițiul B — Fă-l al tău (obligatoriu, cel puțin un lucru)
Alege **cel puțin una** dintre variante:
- schimbă numele jocului și numele camerelor/descrierile (Exemplul 3);
- adaugă o cameră nouă (Exemplul 4);
- adaugă un monstru sau un obiect nou (Exemplul 5);
- schimbă misiunile și mesajele de final.

### Exercițiul C — Rulează testele
Alege opțiunea 9 și verifică să nu pice niciun test, mai ales după personalizare.

### Exercițiul D — Pregătește prezentarea
Exersează o dată prezentarea (3–5 minute) cu ghidul din Exemplul 7.

### Exercițiul E — Ultima provocare *(opțional)*
Adaugă statistici pe ecranul final (Exemplul 9) sau un clasament de scoruri (Exemplul 10).

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Jocul poate fi câștigat și pierdut, salvat și continuat  
- [ ] Ai personalizat cel puțin un lucru  
- [ ] „Despre joc” conține numele tău  
- [ ] Testele interne arată `picate: 0`  
- [ ] Ai salvat fișierul ca `Joc_L50.cpp`  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Jucătorul intră într-o cameră nouă și nu mai poate ieși | Ai legat camera într-un singur sens | Adaugă ieșirea și în camera nouă, și în cea veche |
| Programul se oprește la o cameră nouă | Ai uitat să mărești `NR_CAMERE` sau un tablou | Toate tablourile trebuie să aibă `NR_CAMERE` elemente |
| Salvarea nu merge după ce ai adăugat o cameră | Fișierul vechi are 6 camere, nu 7 | Șterge `salvare.txt` și salvează din nou |
| Monstrul nou face jocul imposibil | Statistici prea mari | Redu viața sau atacul și testează |
| `Prenume Nume` apare în joc | Ai uitat să-ți pui numele | Editează `afiseazaDespre` |
| Jocul nu se potrivește cu povestea | Ai schimbat numele camerelor, dar nu și obiectele | Verifică toate textele (obiecte, monștri, misiuni) |

---

## Recapitulare pe scurt (tot modulul 5)

- Ai construit un joc în etape: hartă → erou → mișcare → obiecte → luptă → magazin → misiuni → salvare → teste → final.
- Datele (camere, monștri, produse) stau în **tablouri și structuri**, iar logica în **funcții**.
- Ai folosit: `struct`, `vector`, `enum`-uri simulate cu constante, `rand`, fișiere, funcții cu referințe, teste automate.
- Un proiect se termină cu **curățare, teste și prezentare**.

---

## Felicitări!

Ai terminat cursul de C++ **Code Maker Club**: de la primul `cout` la un joc complet, scris de tine. Ai absolvit toate cele 5 module și ai primit titlul **RPG Creator**. Ce poți face mai departe:
- să-ți extinzi jocul (mai multe camere, mai mulți monștri, mai multe misiuni);
- să încerci un joc nou, cu altă poveste;
- să înveți mai departe: clase, pointeri, grafică (SFML), jocuri 2D;
- să le arăți jocul familiei și prietenilor.

Mulțumim că ai programat cu noi!
