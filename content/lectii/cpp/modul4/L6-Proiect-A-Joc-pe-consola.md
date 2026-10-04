# LECȚIA 6 — Proiect A: joc pe consolă
**Modulul 4 · Proiecte și autonomie · 2 ore**  
**Code Kids Play · CodeKids Graduate**

> Azi nu mai învățăm instrucțiuni noi. Folosim tot ce știi (funcții, `vector`, `struct`, citire sigură, fișiere, numere aleatoare) ca să construim **două jocuri complete**: „Ghici numărul”, cu niveluri, scor și clasament salvat în fișier, și „X și 0”, cu doi jucători sau contra calculatorului. Vei vedea cum se împarte un joc în părți mici, cum se testează fiecare parte și cum se leagă totul.  
> Proiect: **„Ghici numărul”** sau **„X și 0”** (alegi tu) · fișier: `Prenume_Nume_M4L6.cpp` (ex. `Ana_Pop_M4L6.cpp`)

---

## Obiectiv
La finalul orei împarți un joc în funcții mici, testabile, construiești „Ghici numărul” cu niveluri, scor și clasament în fișier, reprezinți o tablă de joc într-un `vector`, verifici câștigătorul și remiza, scrii o strategie simplă pentru calculator și adaugi un meniu și un scor general.  
**Minim:** „Ghici numărul” cu limită de încercări și mesaje „prea mic / prea mare”.  
**Ținta orei (Complet):** ambele jocuri funcționale, cu meniu și scor, fiecare cu citire sigură a datelor.

## De ce contează
Un joc este cel mai bun mod de a învăța să structurezi un program: ai o **stare** (tabla, scorul, încercările), **reguli** (cine câștigă?), **tururi** (o buclă care se repetă) și un **utilizator** care greșește. Dacă ai făcut un joc cu aceste piese, poți face aproape orice aplicație. Iar în Modulul 5 vei construi un joc mare (RPG), folosind exact aceleași idei.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Cum se planifică un joc: stare, reguli, buclă |
| 10–45 | „Ghici numărul”: piese, scor, niveluri (**Exemplele 1–6**) |
| 45–60 | „Ghici numărul” complet (**Exemplul 7**) |
| 60–95 | „X și 0”: tabla, câștigătorul, mutări (**Exemplele 8–12**) |
| 95–115 | Calculatorul ca adversar (**Exemplul 13**, opțional), joc complet (**Exemplul 14**) |
| 115–120 | Predare și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **6 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 0. Cum planifici un joc

Înainte de cod, răspunde pe hârtie la patru întrebări:

| Întrebare | „Ghici numărul” | „X și 0” |
|-----------|-----------------|----------|
| Ce **date** are jocul? (starea) | numărul secret, încercările făcute | tabla cu 9 căsuțe, al cui e rândul |
| Care sunt **regulile**? | prea mic / prea mare; limită de încercări | 3 la rând câștigă; tabla plină = remiză |
| Ce se întâmplă la **fiecare tur**? | jucătorul ghicește | un jucător alege o căsuță |
| Cum **se termină**? | ghicit sau încercări epuizate | cineva câștigă sau tabla se umple |

Apoi spargi jocul în funcții mici: una citește mutarea, una verifică câștigătorul, una afișează tabla. Fiecare funcție se testează separat, **înainte** să le legi între ele.

---

## 1. „Ghici numărul”

### Exemplul 1 — Prima versiune, cu număr fix **[Esențial]**

Începem cu un număr secret **fix** (`37`), ca să putem testa ușor jocul. Abia la final îl înlocuim cu unul aleator.

```cpp
#include <iostream>
using namespace std;

int main() {
    int secret = 37;     // pentru test; mai tarziu vine din rand()
    int incercari = 0;
    int ghicit;

    do {
        cout << "Ghiceste (1-100): ";
        cin >> ghicit;
        incercari++;

        if (ghicit < secret) {
            cout << "Prea mic!" << endl;
        } else if (ghicit > secret) {
            cout << "Prea mare!" << endl;
        }
    } while (ghicit != secret);

    cout << "Bravo! Ai ghicit din " << incercari << " incercari." << endl;
    return 0;
}
```

**Rulare** (tastezi `50`, `25`, `40`, `30`, `35`, `37`):
```
Ghiceste (1-100): 50
Prea mare!
Ghiceste (1-100): 25
Prea mic!
Ghiceste (1-100): 40
Prea mare!
Ghiceste (1-100): 30
Prea mic!
Ghiceste (1-100): 35
Prea mic!
Ghiceste (1-100): 37
Bravo! Ai ghicit din 6 incercari.
```

Cu `37` fix, știi exact ce ar trebui să se întâmple și poți verifica jocul. Un număr aleator ar face testarea imposibilă: nu ai ști niciodată răspunsul corect.

### Exemplul 2 — Numărul secret aleator **[Esențial]**

Din Modulul 3 știi formula pentru un număr între `a` și `b`: `a + rand() % (b - a + 1)`. O punem într-o funcție și o **testăm**: generăm 1000 de numere și verificăm că toate sunt în interval.

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int genereaza(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
}

int main() {
    srand(time(0));

    bool ok = true;
    for (int i = 0; i < 1000; i++) {
        int x = genereaza(1, 100);
        if (x < 1 || x > 100) {
            ok = false;
        }
    }

    if (ok) {
        cout << "Toate cele 1000 de numere sunt intre 1 si 100." << endl;
    } else {
        cout << "EROARE: am gasit un numar in afara intervalului!" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Toate cele 1000 de numere sunt intre 1 si 100.
```

Dacă `ok` ar fi `false`, ai greșit formula. Rezultatul este mereu același (testul trece), chiar dacă numerele generate diferă de la o rulare la alta. Nu uita: `srand(time(0))` se apelează **o singură dată**, la începutul lui `main`.

### Exemplul 3 — Limită de încercări **[Esențial]**

Un joc fără limită nu are tensiune. Mutăm jocul într-o funcție care primește numărul secret și numărul maxim de încercări, și întoarce `true` dacă ai câștigat:

```cpp
#include <iostream>
using namespace std;

bool joaca(int secret, int maxIncercari) {
    for (int inc = 1; inc <= maxIncercari; inc++) {
        int g;
        cout << "Incercarea " << inc << "/" << maxIncercari << ": ";
        cin >> g;

        if (g == secret) {
            cout << "Bravo! Ai ghicit din " << inc << " incercari." << endl;
            return true;
        }
        if (g < secret) {
            cout << "Prea mic!" << endl;
        } else {
            cout << "Prea mare!" << endl;
        }
    }
    cout << "Ai pierdut! Numarul era " << secret << "." << endl;
    return false;
}

int main() {
    bool castigat = joaca(37, 5);
    if (castigat) {
        cout << "Rezultat: victorie" << endl;
    } else {
        cout << "Rezultat: infrangere" << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `10`, `20`, `30`, `40`, `50`):
```
Incercarea 1/5: 10
Prea mic!
Incercarea 2/5: 20
Prea mic!
Incercarea 3/5: 30
Prea mic!
Incercarea 4/5: 40
Prea mare!
Incercarea 5/5: 50
Prea mare!
Ai pierdut! Numarul era 37.
Rezultat: infrangere
```

Funcția `joaca(secret, maxIncercari)` nu știe de unde vine numărul secret: din `main` îi poți da un număr fix (la testare) sau unul aleator (în joc). Aceasta este marea putere a funcțiilor cu parametri.

### Exemplul 4 — Scorul **[Esențial]**

Cu cât ghicești mai repede, cu atât scorul e mai mare. Scorul este o regulă matematică, deci îl punem într-o funcție și îi verificăm valorile cu un tabel:

```cpp
#include <iostream>
using namespace std;

int calculeazaScor(int incercari, int maxIncercari) {
    if (incercari > maxIncercari) {
        return 0;
    }
    return (maxIncercari - incercari + 1) * 10;
}

int main() {
    int maxInc = 8;
    cout << "Incercari | Scor" << endl;
    for (int inc = 1; inc <= 9; inc++) {
        cout << "    " << inc << "     | " << calculeazaScor(inc, maxInc) << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Incercari | Scor
    1     | 80
    2     | 70
    3     | 60
    4     | 50
    5     | 40
    6     | 30
    7     | 20
    8     | 10
    9     | 0
```

Ghicești din prima, primești `80` de puncte; la ultima încercare, `10`; mai mult nu se poate. Funcția întoarce `0` dacă numărul de încercări depășește limita, adică un caz la care te-ai gândit dinainte.

### Exemplul 5 — Niveluri de dificultate **[Esențial]**

Fiecare nivel are un nume, un număr maxim și o limită de încercări. Păstrăm cele trei niveluri într-un **tablou de structuri constante**, iar jocul citește din el:

```cpp
#include <iostream>
#include <string>
#include <limits>
using namespace std;

struct Nivel {
    string nume;
    int maxim;
    int incercari;
};

const Nivel NIVELE[3] = {
    {"Usor", 50, 8},
    {"Mediu", 100, 7},
    {"Greu", 500, 9}
};

int citesteInt(const string &mesaj, int minim, int maxim) {
    while (true) {
        int x = 0;
        cout << mesaj;
        cin >> x;
        bool ok = !cin.fail();
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        if (ok && x >= minim && x <= maxim) {
            return x;
        }
        cout << "  Valoare invalida (" << minim << " - " << maxim << ")." << endl;
    }
}

int alegeNivel() {
    cout << "Alege nivelul:" << endl;
    for (int i = 0; i < 3; i++) {
        cout << i + 1 << ". " << NIVELE[i].nume << " (1-" << NIVELE[i].maxim
             << ", " << NIVELE[i].incercari << " incercari)" << endl;
    }
    return citesteInt("Nivel: ", 1, 3) - 1;
}

int main() {
    int n = alegeNivel();
    cout << "Ai ales nivelul " << NIVELE[n].nume << ": un numar intre 1 si "
         << NIVELE[n].maxim << ", cu " << NIVELE[n].incercari << " incercari." << endl;
    return 0;
}
```

**Rulare** (tastezi `7`, `2`):
```
Alege nivelul:
1. Usor (1-50, 8 incercari)
2. Mediu (1-100, 7 incercari)
3. Greu (1-500, 9 incercari)
Nivel: 7
  Valoare invalida (1 - 3).
Nivel: 2
Ai ales nivelul Mediu: un numar intre 1 si 100, cu 7 incercari.
```

`const` în fața tabloului înseamnă că valorile nu se mai pot schimba pe parcursul programului. Dacă mâine vrei un nivel nou, adaugi o linie în tablou; restul codului rămâne neschimbat.

### Exemplul 6 — Clasamentul: top 5 în fișier

Un joc fără clasament nu are motiv să fie rejucat. Păstrăm **cele mai bune 5 rezultate**: adăugăm rezultatul nou, sortăm descrescător după scor și tăiem lista la 5 elemente. Apoi salvăm în fișier.

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Rezultat {
    string nume;
    int scor;
};

const int TOP = 5;

bool dupaScor(const Rezultat &a, const Rezultat &b) {
    return a.scor > b.scor;
}

void adauga(vector<Rezultat> &clasament, const Rezultat &nou) {
    clasament.push_back(nou);
    sort(clasament.begin(), clasament.end(), dupaScor);
    if ((int)clasament.size() > TOP) {
        clasament.resize(TOP);
    }
}

void salveaza(const vector<Rezultat> &clasament, const string &fisier) {
    ofstream fout(fisier);
    for (const Rezultat &r : clasament) {
        fout << r.nume << " " << r.scor << endl;
    }
}

vector<Rezultat> incarca(const string &fisier) {
    vector<Rezultat> lista;
    ifstream fin(fisier);
    Rezultat r;
    while (fin >> r.nume >> r.scor) {
        lista.push_back(r);
    }
    return lista;
}

int main() {
    vector<Rezultat> clasament;
    adauga(clasament, {"Ana", 40});
    adauga(clasament, {"Bogdan", 70});
    adauga(clasament, {"Carmen", 55});
    adauga(clasament, {"Dan", 20});
    adauga(clasament, {"Elena", 80});
    adauga(clasament, {"Fane", 65});    // il scoate pe Dan (cel mai slab)
    adauga(clasament, {"Gabi", 10});    // prea slab: nu intra

    salveaza(clasament, "clasament_test.txt");

    vector<Rezultat> citit = incarca("clasament_test.txt");
    cout << "=== TOP " << TOP << " ===" << endl;
    int loc = 1;
    for (const Rezultat &r : citit) {
        cout << loc << ". " << r.nume << " - " << r.scor << endl;
        loc++;
    }
    return 0;
}
```

**Ieșire:**
```
=== TOP 5 ===
1. Elena - 80
2. Bogdan - 70
3. Fane - 65
4. Carmen - 55
5. Ana - 40
```

După fiecare adăugare, clasamentul are cel mult 5 rezultate: `resize(TOP)` taie tot ce depășește lista (aici, pe cel mai slab). „Gabi” cu 10 puncte nu a intrat, pentru că după sortare ar fi ajuns pe locul 7 și a fost tăiat imediat.

### Exemplul 7 — „Ghici numărul” complet **[Esențial]**

Acum legăm piesele: meniu, niveluri, număr aleator, limită de încercări, scor și clasament salvat. Programul de mai jos conține exact funcțiile pe care le-ai testat mai sus.

```cpp
/*
   Program: Ghici numarul
   Scop:    joc cu niveluri, scor si clasament salvat in fisier
*/
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <limits>
#include <cstdlib>
#include <ctime>
using namespace std;

struct Nivel {
    string nume;
    int maxim;
    int incercari;
};

struct Rezultat {
    string nume;
    int scor;
};

const Nivel NIVELE[3] = {
    {"Usor", 50, 8},
    {"Mediu", 100, 7},
    {"Greu", 500, 9}
};
const string FISIER = "clasament_ghici.txt";
const int TOP = 5;

// ---------- utilitare ----------
int citesteInt(const string &mesaj, int minim, int maxim) {
    while (true) {
        int x = 0;
        cout << mesaj;
        cin >> x;
        bool ok = !cin.fail();
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        if (ok && x >= minim && x <= maxim) {
            return x;
        }
        cout << "  Valoare invalida (" << minim << " - " << maxim << ")." << endl;
    }
}

int genereaza(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
}

// ---------- scor si clasament ----------
int calculeazaScor(int nivel, int incercariFolosite) {
    int ramase = NIVELE[nivel].incercari - incercariFolosite + 1;
    return ramase * 10 * (nivel + 1);
}

bool dupaScor(const Rezultat &a, const Rezultat &b) {
    return a.scor > b.scor;
}

vector<Rezultat> incarca() {
    vector<Rezultat> lista;
    ifstream fin(FISIER);
    Rezultat r;
    while (fin >> r.nume >> r.scor) {
        lista.push_back(r);
    }
    return lista;
}

void salveaza(const vector<Rezultat> &clasament) {
    ofstream fout(FISIER);
    for (const Rezultat &r : clasament) {
        fout << r.nume << " " << r.scor << endl;
    }
}

void adauga(vector<Rezultat> &clasament, const Rezultat &nou) {
    clasament.push_back(nou);
    sort(clasament.begin(), clasament.end(), dupaScor);
    if ((int)clasament.size() > TOP) {
        clasament.resize(TOP);
    }
}

void afiseazaClasament(const vector<Rezultat> &clasament) {
    cout << endl << "=== CLASAMENT (top " << TOP << ") ===" << endl;
    if (clasament.empty()) {
        cout << "Nu exista rezultate inca." << endl;
        return;
    }
    int loc = 1;
    for (const Rezultat &r : clasament) {
        cout << loc << ". " << r.nume << " - " << r.scor << " puncte" << endl;
        loc++;
    }
}

// ---------- jocul ----------
int alegeNivel() {
    cout << endl << "Alege nivelul:" << endl;
    for (int i = 0; i < 3; i++) {
        cout << i + 1 << ". " << NIVELE[i].nume << " (1-" << NIVELE[i].maxim
             << ", " << NIVELE[i].incercari << " incercari)" << endl;
    }
    return citesteInt("Nivel: ", 1, 3) - 1;
}

void joaca(vector<Rezultat> &clasament) {
    int nivel = alegeNivel();
    int maxim = NIVELE[nivel].maxim;
    int maxInc = NIVELE[nivel].incercari;
    int secret = genereaza(1, maxim);

    cout << "M-am gandit la un numar intre 1 si " << maxim
         << ". Ai " << maxInc << " incercari." << endl;

    for (int inc = 1; inc <= maxInc; inc++) {
        string mesaj = "Incercarea " + to_string(inc) + "/" + to_string(maxInc) + ": ";
        int g = citesteInt(mesaj, 1, maxim);

        if (g == secret) {
            int scor = calculeazaScor(nivel, inc);
            cout << "Bravo! Ai ghicit din " << inc << " incercari. Scor: " << scor << endl;
            string nume;
            cout << "Numele tau (fara spatii): ";
            cin >> nume;
            adauga(clasament, {nume, scor});
            salveaza(clasament);
            return;
        }
        if (g < secret) {
            cout << "Prea mic!" << endl;
        } else {
            cout << "Prea mare!" << endl;
        }
    }
    cout << "Ai pierdut! Numarul era " << secret << "." << endl;
}

int main() {
    srand(time(0));
    vector<Rezultat> clasament = incarca();

    int optiune;
    do {
        cout << endl;
        cout << "===== GHICI NUMARUL =====" << endl;
        cout << "1. Joaca" << endl;
        cout << "2. Clasament" << endl;
        cout << "0. Iesire" << endl;
        optiune = citesteInt("Alege: ", 0, 2);

        if (optiune == 1) {
            joaca(clasament);
        } else if (optiune == 2) {
            afiseazaClasament(clasament);
        }
    } while (optiune != 0);

    cout << "La revedere!" << endl;
    return 0;
}
```

**Exemplu de rulare (numărul secret diferă la fiecare rulare; ghicim „inteligent”, la mijlocul intervalului rămas):**
```

===== GHICI NUMARUL =====
1. Joaca
2. Clasament
0. Iesire
Alege: 1

Alege nivelul:
1. Usor (1-50, 8 incercari)
2. Mediu (1-100, 7 incercari)
3. Greu (1-500, 9 incercari)
Nivel: 2
M-am gandit la un numar intre 1 si 100. Ai 7 incercari.
Incercarea 1/7: 50
Prea mic!
Incercarea 2/7: 75
Prea mare!
Incercarea 3/7: 62
Prea mic!
Incercarea 4/7: 68
Prea mare!
Incercarea 5/7: 65
Prea mare!
Incercarea 6/7: 63
Prea mic!
Incercarea 7/7: 64
Bravo! Ai ghicit din 7 incercari. Scor: 20
Numele tau (fara spatii): Ana

===== GHICI NUMARUL =====
1. Joaca
2. Clasament
0. Iesire
Alege: 2

=== CLASAMENT (top 5) ===
1. Ana - 20 puncte

===== GHICI NUMARUL =====
1. Joaca
2. Clasament
0. Iesire
Alege: 1

Alege nivelul:
1. Usor (1-50, 8 incercari)
2. Mediu (1-100, 7 incercari)
3. Greu (1-500, 9 incercari)
Nivel: 3
M-am gandit la un numar intre 1 si 500. Ai 9 incercari.
Incercarea 1/9: 250
Prea mare!
Incercarea 2/9: 125
Prea mic!
Incercarea 3/9: 187
Prea mare!
Incercarea 4/9: 156
Prea mic!
Incercarea 5/9: 171
Bravo! Ai ghicit din 5 incercari. Scor: 150
Numele tau (fara spatii): Bogdan

===== GHICI NUMARUL =====
1. Joaca
2. Clasament
0. Iesire
Alege: 2

=== CLASAMENT (top 5) ===
1. Bogdan - 150 puncte
2. Ana - 20 puncte

===== GHICI NUMARUL =====
1. Joaca
2. Clasament
0. Iesire
Alege: 0
La revedere!
```

Cum a ghicit „jucătorul” din transcriere? De fiecare dată a ales **mijlocul** intervalului rămas posibil (de exemplu, după „Prea mic” pentru 50, a încercat 75). Strategia se numește **căutare binară** și ghicește oricare număr între 1 și 100 în cel mult 7 încercări, exact câte primești la nivelul „Mediu”. Nu întâmplător: jocul este croit astfel încât să se poată câștiga mereu, dacă joci bine.

---

## 2. „X și 0”

Tabla are 9 căsuțe. O păstrăm într-un `vector<char>` cu 9 elemente (pozițiile `0…8`), în care ` ` (spațiu) înseamnă „liber”, `X` și `O` sunt mutările. Jucătorul vede căsuțele numerotate de la `1` la `9`:

```
 1 | 2 | 3
---+---+---
 4 | 5 | 6
---+---+---
 7 | 8 | 9
```

Poziția din vector este întotdeauna **cu 1 mai mică** decât numărul văzut de jucător (căsuța `5` este `t[4]`).

### Exemplul 8 — Afișarea tablei

Căsuțele goale se afișează cu numărul lor, ca jucătorul să știe ce să tasteze:

```cpp
#include <iostream>
#include <vector>
using namespace std;

void afiseaza(const vector<char> &t) {
    cout << endl;
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            int i = r * 3 + c;
            char ch = t[i];
            if (ch == ' ') {
                ch = (char)('1' + i);
            }
            cout << " " << ch << " ";
            if (c < 2) {
                cout << "|";
            }
        }
        cout << endl;
        if (r < 2) {
            cout << "---+---+---" << endl;
        }
    }
    cout << endl;
}

int main() {
    vector<char> tabla(9, ' ');   // 9 casute libere
    afiseaza(tabla);

    tabla[4] = 'X';    // casuta 5
    tabla[0] = 'O';    // casuta 1
    tabla[8] = 'X';    // casuta 9
    afiseaza(tabla);
    return 0;
}
```

**Ieșire:**
```

 1 | 2 | 3 
---+---+---
 4 | 5 | 6 
---+---+---
 7 | 8 | 9 


 O | 2 | 3 
---+---+---
 4 | X | 6 
---+---+---
 7 | 8 | X 

```

Indicele căsuței din rândul `r` și coloana `c` este `r * 3 + c`. Verifică: rândul 1, coloana 1 (mijlocul) este `1 * 3 + 1 = 4`, adică `t[4]`.

### Exemplul 9 — Cine a câștigat?

Există **opt** combinații câștigătoare: trei rânduri, trei coloane și două diagonale. Le păstrăm într-un tablou cu 8 rânduri și 3 coloane (un tablou bidimensional), iar funcția verifică dacă un jucător ocupă toate cele 3 poziții ale vreunei combinații. Testăm funcția pe tablouri scrise ca text (`.` înseamnă liber), cu o mică funcție ajutătoare:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int COMBINATII[8][3] = {
    {0, 1, 2}, {3, 4, 5}, {6, 7, 8},   // randuri
    {0, 3, 6}, {1, 4, 7}, {2, 5, 8},   // coloane
    {0, 4, 8}, {2, 4, 6}               // diagonale
};

bool castiga(const vector<char> &t, char j) {
    for (int k = 0; k < 8; k++) {
        if (t[COMBINATII[k][0]] == j && t[COMBINATII[k][1]] == j && t[COMBINATII[k][2]] == j) {
            return true;
        }
    }
    return false;
}

vector<char> deLaText(const string &s) {
    vector<char> t(9, ' ');
    for (int i = 0; i < 9; i++) {
        if (s[i] != '.') {
            t[i] = s[i];
        }
    }
    return t;
}

void testeaza(const string &tabla) {
    vector<char> t = deLaText(tabla);
    cout << tabla << ": X castiga? " << castiga(t, 'X')
         << ", O castiga? " << castiga(t, 'O') << endl;
}

int main() {
    testeaza("XXX......");   // rand sus
    testeaza("O..O..O..");   // coloana stanga
    testeaza("X...X...X");   // diagonala principala
    testeaza("..O.O.O..");   // diagonala secundara
    testeaza("XX.OO....");   // nimeni inca
    testeaza("XOXOXOOXO");   // nimeni
    return 0;
}
```

**Ieșire:**
```
XXX......: X castiga? 1, O castiga? 0
O..O..O..: X castiga? 0, O castiga? 1
X...X...X: X castiga? 1, O castiga? 0
..O.O.O..: X castiga? 0, O castiga? 1
XX.OO....: X castiga? 0, O castiga? 0
XOXOXOOXO: X castiga? 0, O castiga? 0
```

Acesta este modul în care testezi un joc: nu joci de sute de ori ca să descoperi o greșeală, ci verifici funcția pe cazuri pregătite. `COMBINATII[k][1]` înseamnă „al doilea număr din combinația `k`”. Primul indice alege rândul din tablou, al doilea alege elementul din rând.

### Exemplul 10 — Citirea unei mutări valide

O mutare este validă dacă numărul este între 1 și 9 **și** căsuța este liberă. Repetăm întrebarea până primim una:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <limits>
using namespace std;

int citesteInt(const string &mesaj, int minim, int maxim) {
    while (true) {
        int x = 0;
        cout << mesaj;
        cin >> x;
        bool ok = !cin.fail();
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        if (ok && x >= minim && x <= maxim) {
            return x;
        }
        cout << "  Valoare invalida (" << minim << " - " << maxim << ")." << endl;
    }
}

int citesteMutare(const vector<char> &t, char jucator) {
    while (true) {
        string mesaj = string("Mutarea lui ") + jucator + " (1-9): ";
        int m = citesteInt(mesaj, 1, 9);
        if (t[m - 1] != ' ') {
            cout << "  Casuta " << m << " este ocupata." << endl;
        } else {
            return m - 1;
        }
    }
}

int main() {
    vector<char> t(9, ' ');
    t[0] = 'X';     // casuta 1
    t[4] = 'O';     // casuta 5

    int poz = citesteMutare(t, 'X');
    cout << "X a ales casuta " << poz + 1 << " (pozitia " << poz << " din vector)." << endl;
    return 0;
}
```

**Rulare** (tastezi `1`, `5`, `0`, `abc`, `9`):
```
Mutarea lui X (1-9): 1
  Casuta 1 este ocupata.
Mutarea lui X (1-9): 5
  Casuta 5 este ocupata.
Mutarea lui X (1-9): 0
  Valoare invalida (1 - 9).
Mutarea lui X (1-9): abc
  Valoare invalida (1 - 9).
Mutarea lui X (1-9): 9
X a ales casuta 9 (pozitia 8 din vector).
```

Două verificări diferite, în două locuri diferite: `citesteInt` se ocupă de „număr între 1 și 9”, iar `citesteMutare` de „căsuța e liberă”. Fiecare funcție are o singură răspundere.

### Exemplul 11 — Remiza și starea jocului

Tabla este **plină** dacă nicio căsuță nu mai e liberă. Dacă este plină și nimeni nu a câștigat, jocul se termină la egalitate. O funcție `stare` rezumă situația:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int COMBINATII[8][3] = {
    {0, 1, 2}, {3, 4, 5}, {6, 7, 8},
    {0, 3, 6}, {1, 4, 7}, {2, 5, 8},
    {0, 4, 8}, {2, 4, 6}
};

bool castiga(const vector<char> &t, char j) {
    for (int k = 0; k < 8; k++) {
        if (t[COMBINATII[k][0]] == j && t[COMBINATII[k][1]] == j && t[COMBINATII[k][2]] == j) {
            return true;
        }
    }
    return false;
}

bool plina(const vector<char> &t) {
    for (char c : t) {
        if (c == ' ') {
            return false;
        }
    }
    return true;
}

string stare(const vector<char> &t) {
    if (castiga(t, 'X')) {
        return "Castiga X";
    }
    if (castiga(t, 'O')) {
        return "Castiga O";
    }
    if (plina(t)) {
        return "Remiza";
    }
    return "Jocul continua";
}

vector<char> deLaText(const string &s) {
    vector<char> t(9, ' ');
    for (int i = 0; i < 9; i++) {
        if (s[i] != '.') {
            t[i] = s[i];
        }
    }
    return t;
}

int main() {
    string teste[5] = {"XOXXOOOXX", "XXXOO....", "OXXXOOXOX", ".........", "XOXOXOOXO"};
    for (int i = 0; i < 5; i++) {
        cout << teste[i] << " -> " << stare(deLaText(teste[i])) << endl;
    }
    return 0;
}
```

**Ieșire:**
```
XOXXOOOXX -> Remiza
XXXOO.... -> Castiga X
OXXXOOXOX -> Remiza
......... -> Jocul continua
XOXOXOOXO -> Remiza
```

Verifici mai întâi dacă a câștigat cineva și abia apoi dacă e plină: o tablă poate fi plină **și** să aibă un câștigător (ultima mutare completează o linie). Dacă ai verifica remiza prima, ai declara egalitate acolo unde de fapt a câștigat cineva.

### Exemplul 12 — Jocul pentru doi jucători

Piesele se leagă într-o funcție `joc`: se afișează tabla, jucătorul curent mută, se verifică finalul, se schimbă jucătorul.

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <limits>
using namespace std;

const int COMBINATII[8][3] = {
    {0, 1, 2}, {3, 4, 5}, {6, 7, 8},
    {0, 3, 6}, {1, 4, 7}, {2, 5, 8},
    {0, 4, 8}, {2, 4, 6}
};

int citesteInt(const string &mesaj, int minim, int maxim) {
    while (true) {
        int x = 0;
        cout << mesaj;
        cin >> x;
        bool ok = !cin.fail();
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        if (ok && x >= minim && x <= maxim) {
            return x;
        }
        cout << "  Valoare invalida (" << minim << " - " << maxim << ")." << endl;
    }
}

void afiseaza(const vector<char> &t) {
    cout << endl;
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            int i = r * 3 + c;
            char ch = t[i];
            if (ch == ' ') {
                ch = (char)('1' + i);
            }
            cout << " " << ch << " ";
            if (c < 2) {
                cout << "|";
            }
        }
        cout << endl;
        if (r < 2) {
            cout << "---+---+---" << endl;
        }
    }
    cout << endl;
}

bool castiga(const vector<char> &t, char j) {
    for (int k = 0; k < 8; k++) {
        if (t[COMBINATII[k][0]] == j && t[COMBINATII[k][1]] == j && t[COMBINATII[k][2]] == j) {
            return true;
        }
    }
    return false;
}

bool plina(const vector<char> &t) {
    for (char c : t) {
        if (c == ' ') {
            return false;
        }
    }
    return true;
}

int citesteMutare(const vector<char> &t, char jucator) {
    while (true) {
        string mesaj = string("Mutarea lui ") + jucator + " (1-9): ";
        int m = citesteInt(mesaj, 1, 9);
        if (t[m - 1] != ' ') {
            cout << "  Casuta " << m << " este ocupata." << endl;
        } else {
            return m - 1;
        }
    }
}

// intoarce 'X', 'O' sau 'E' (egalitate)
char joc() {
    vector<char> t(9, ' ');
    char jucator = 'X';

    while (true) {
        afiseaza(t);
        int poz = citesteMutare(t, jucator);
        t[poz] = jucator;

        if (castiga(t, jucator)) {
            afiseaza(t);
            cout << "A castigat " << jucator << "!" << endl;
            return jucator;
        }
        if (plina(t)) {
            afiseaza(t);
            cout << "Remiza!" << endl;
            return 'E';
        }

        if (jucator == 'X') {
            jucator = 'O';
        } else {
            jucator = 'X';
        }
    }
}

int main() {
    joc();
    return 0;
}
```

**Rulare** (tastezi `1`, `4`, `2`, `5`, `5`, `3`):
```

 1 | 2 | 3 
---+---+---
 4 | 5 | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui X (1-9): 1

 X | 2 | 3 
---+---+---
 4 | 5 | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui O (1-9): 4

 X | 2 | 3 
---+---+---
 O | 5 | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui X (1-9): 2

 X | X | 3 
---+---+---
 O | 5 | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui O (1-9): 5

 X | X | 3 
---+---+---
 O | O | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui X (1-9): 5
  Casuta 5 este ocupata.
Mutarea lui X (1-9): 3

 X | X | X 
---+---+---
 O | O | 6 
---+---+---
 7 | 8 | 9 

A castigat X!
```

Urmărește partida din transcriere: `X` pune în 1, `O` în 4, `X` în 2, `O` în 5, apoi `X` încearcă din nou căsuța 5 (ocupată, programul refuză și întreabă iar) și alege 3, completând rândul de sus. Funcția întoarce `'X'`, `'O'` sau `'E'`, iar cel care a chemat-o poate folosi rezultatul pentru un scor.

> **Notă:** exemplul de mai jos este mai greu. Îți trebuie doar dacă alegi „X și 0” **împotriva calculatorului**; „Ghici numărul” și „X și 0” în doi jucători se fac fără el. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face.

### Exemplul 13 — Calculatorul ca adversar *(Provocare, opțional)*

Un adversar bun nu are nevoie de inteligență artificială: câteva reguli simple, în ordinea importanței, joacă surprinzător de bine:

1. dacă pot câștiga cu o mutare, o fac;
2. dacă adversarul poate câștiga la mutarea următoare, îl blochez;
3. dacă centrul e liber, îl iau;
4. altfel iau primul colț liber, apoi orice căsuță liberă.

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int COMBINATII[8][3] = {
    {0, 1, 2}, {3, 4, 5}, {6, 7, 8},
    {0, 3, 6}, {1, 4, 7}, {2, 5, 8},
    {0, 4, 8}, {2, 4, 6}
};

bool castiga(const vector<char> &t, char j) {
    for (int k = 0; k < 8; k++) {
        if (t[COMBINATII[k][0]] == j && t[COMBINATII[k][1]] == j && t[COMBINATII[k][2]] == j) {
            return true;
        }
    }
    return false;
}

// intoarce pozitia unde ar castiga 'j' cu o mutare, sau -1
int mutareCastigatoare(vector<char> t, char j) {
    for (int i = 0; i < 9; i++) {
        if (t[i] == ' ') {
            t[i] = j;
            bool castigat = castiga(t, j);
            t[i] = ' ';
            if (castigat) {
                return i;
            }
        }
    }
    return -1;
}

int mutareCalculator(const vector<char> &t, char eu, char adversar) {
    int p = mutareCastigatoare(t, eu);          // 1. castig
    if (p != -1) {
        return p;
    }
    p = mutareCastigatoare(t, adversar);        // 2. blochez
    if (p != -1) {
        return p;
    }
    const int PREFERINTE[9] = {4, 0, 2, 6, 8, 1, 3, 5, 7};   // 3-4. centru, colturi, restul
    for (int k = 0; k < 9; k++) {
        if (t[PREFERINTE[k]] == ' ') {
            return PREFERINTE[k];
        }
    }
    return -1;
}

vector<char> deLaText(const string &s) {
    vector<char> t(9, ' ');
    for (int i = 0; i < 9; i++) {
        if (s[i] != '.') {
            t[i] = s[i];
        }
    }
    return t;
}

void test(const string &tabla, const string &asteptat) {
    int p = mutareCalculator(deLaText(tabla), 'O', 'X');
    cout << tabla << " -> O alege " << p + 1 << " (" << asteptat << ")" << endl;
}

int main() {
    test("OO.XX....", "castiga");
    test("XX.O.....", "blocheaza");
    test("X........", "ia centrul");
    test("....X....", "ia un colt");
    test("XOXOXOOX.", "blocheaza, ultima casuta libera");
    return 0;
}
```

**Ieșire:**
```
OO.XX.... -> O alege 3 (castiga)
XX.O..... -> O alege 3 (blocheaza)
X........ -> O alege 5 (ia centrul)
....X.... -> O alege 1 (ia un colt)
XOXOXOOX. -> O alege 9 (blocheaza, ultima casuta libera)
```

Observă cum testăm: pregătim tablouri, spunem ce **ar trebui** să facă calculatorul și comparăm cu rezultatul. Ordinea regulilor contează: „câștig” este înaintea lui „blochez”, altfel calculatorul ar bloca când ar putea câștiga direct. În primul test, `O` are două în rând (căsuțele 1 și 2) și poate câștiga cu căsuța 3. În ultimul test, singura căsuță liberă (9) este și locul unde ar câștiga `X`, deci calculatorul o ocupă pentru a bloca.

### Exemplul 14 — „X și 0” complet

Adăugăm meniul (doi jucători sau contra calculatorului) și un **scor general** care se păstrează între partide. Numai funcția `joc` se schimbă: primește un parametru care spune dacă `O` este calculatorul.

```cpp
/*
   Program: X si 0
   Scop:    joc pentru doi jucatori sau contra calculatorului, cu scor
*/
#include <iostream>
#include <string>
#include <vector>
#include <limits>
using namespace std;

const int COMBINATII[8][3] = {
    {0, 1, 2}, {3, 4, 5}, {6, 7, 8},
    {0, 3, 6}, {1, 4, 7}, {2, 5, 8},
    {0, 4, 8}, {2, 4, 6}
};

struct Scor {
    int x = 0;
    int o = 0;
    int remize = 0;
};

// ---------- citire ----------
int citesteInt(const string &mesaj, int minim, int maxim) {
    while (true) {
        int x = 0;
        cout << mesaj;
        cin >> x;
        bool ok = !cin.fail();
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        if (ok && x >= minim && x <= maxim) {
            return x;
        }
        cout << "  Valoare invalida (" << minim << " - " << maxim << ")." << endl;
    }
}

// ---------- tabla ----------
void afiseaza(const vector<char> &t) {
    cout << endl;
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            int i = r * 3 + c;
            char ch = t[i];
            if (ch == ' ') {
                ch = (char)('1' + i);
            }
            cout << " " << ch << " ";
            if (c < 2) {
                cout << "|";
            }
        }
        cout << endl;
        if (r < 2) {
            cout << "---+---+---" << endl;
        }
    }
    cout << endl;
}

bool castiga(const vector<char> &t, char j) {
    for (int k = 0; k < 8; k++) {
        if (t[COMBINATII[k][0]] == j && t[COMBINATII[k][1]] == j && t[COMBINATII[k][2]] == j) {
            return true;
        }
    }
    return false;
}

bool plina(const vector<char> &t) {
    for (char c : t) {
        if (c == ' ') {
            return false;
        }
    }
    return true;
}

// ---------- mutari ----------
int citesteMutare(const vector<char> &t, char jucator) {
    while (true) {
        string mesaj = string("Mutarea lui ") + jucator + " (1-9): ";
        int m = citesteInt(mesaj, 1, 9);
        if (t[m - 1] != ' ') {
            cout << "  Casuta " << m << " este ocupata." << endl;
        } else {
            return m - 1;
        }
    }
}

int mutareCastigatoare(vector<char> t, char j) {
    for (int i = 0; i < 9; i++) {
        if (t[i] == ' ') {
            t[i] = j;
            bool castigat = castiga(t, j);
            t[i] = ' ';
            if (castigat) {
                return i;
            }
        }
    }
    return -1;
}

int mutareCalculator(const vector<char> &t, char eu, char adversar) {
    int p = mutareCastigatoare(t, eu);
    if (p != -1) {
        return p;
    }
    p = mutareCastigatoare(t, adversar);
    if (p != -1) {
        return p;
    }
    const int PREFERINTE[9] = {4, 0, 2, 6, 8, 1, 3, 5, 7};
    for (int k = 0; k < 9; k++) {
        if (t[PREFERINTE[k]] == ' ') {
            return PREFERINTE[k];
        }
    }
    return -1;
}

// ---------- jocul ----------
char joc(bool contraCalculator) {
    vector<char> t(9, ' ');
    char jucator = 'X';

    while (true) {
        afiseaza(t);
        int poz;
        if (contraCalculator && jucator == 'O') {
            poz = mutareCalculator(t, 'O', 'X');
            cout << "Calculatorul (O) alege casuta " << poz + 1 << "." << endl;
        } else {
            poz = citesteMutare(t, jucator);
        }
        t[poz] = jucator;

        if (castiga(t, jucator)) {
            afiseaza(t);
            cout << "A castigat " << jucator << "!" << endl;
            return jucator;
        }
        if (plina(t)) {
            afiseaza(t);
            cout << "Remiza!" << endl;
            return 'E';
        }

        if (jucator == 'X') {
            jucator = 'O';
        } else {
            jucator = 'X';
        }
    }
}

void inregistreaza(Scor &s, char rezultat) {
    if (rezultat == 'X') {
        s.x++;
    } else if (rezultat == 'O') {
        s.o++;
    } else {
        s.remize++;
    }
}

void afiseazaScor(const Scor &s) {
    cout << endl << "=== SCOR ===" << endl;
    cout << "X: " << s.x << "   O: " << s.o << "   Remize: " << s.remize << endl;
}

int main() {
    Scor scor;
    int optiune;
    do {
        cout << endl;
        cout << "===== X SI 0 =====" << endl;
        cout << "1. Doi jucatori" << endl;
        cout << "2. Contra calculatorului (tu esti X)" << endl;
        cout << "3. Arata scorul" << endl;
        cout << "0. Iesire" << endl;
        optiune = citesteInt("Alege: ", 0, 3);

        if (optiune == 1) {
            inregistreaza(scor, joc(false));
        } else if (optiune == 2) {
            inregistreaza(scor, joc(true));
        } else if (optiune == 3) {
            afiseazaScor(scor);
        }
    } while (optiune != 0);

    afiseazaScor(scor);
    cout << "Multumesc ca ai jucat!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1`, `1`, `4`, `2`, `5`, `3`, `2`, `1`, `2`, `9`, `7`, `3`, `0`):
```

===== X SI 0 =====
1. Doi jucatori
2. Contra calculatorului (tu esti X)
3. Arata scorul
0. Iesire
Alege: 1

 1 | 2 | 3 
---+---+---
 4 | 5 | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui X (1-9): 1

 X | 2 | 3 
---+---+---
 4 | 5 | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui O (1-9): 4

 X | 2 | 3 
---+---+---
 O | 5 | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui X (1-9): 2

 X | X | 3 
---+---+---
 O | 5 | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui O (1-9): 5

 X | X | 3 
---+---+---
 O | O | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui X (1-9): 3

 X | X | X 
---+---+---
 O | O | 6 
---+---+---
 7 | 8 | 9 

A castigat X!

===== X SI 0 =====
1. Doi jucatori
2. Contra calculatorului (tu esti X)
3. Arata scorul
0. Iesire
Alege: 2

 1 | 2 | 3 
---+---+---
 4 | 5 | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui X (1-9): 1

 X | 2 | 3 
---+---+---
 4 | 5 | 6 
---+---+---
 7 | 8 | 9 

Calculatorul (O) alege casuta 5.

 X | 2 | 3 
---+---+---
 4 | O | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui X (1-9): 2

 X | X | 3 
---+---+---
 4 | O | 6 
---+---+---
 7 | 8 | 9 

Calculatorul (O) alege casuta 3.

 X | X | O 
---+---+---
 4 | O | 6 
---+---+---
 7 | 8 | 9 

Mutarea lui X (1-9): 9

 X | X | O 
---+---+---
 4 | O | 6 
---+---+---
 7 | 8 | X 

Calculatorul (O) alege casuta 7.

 X | X | O 
---+---+---
 4 | O | 6 
---+---+---
 O | 8 | X 

A castigat O!

===== X SI 0 =====
1. Doi jucatori
2. Contra calculatorului (tu esti X)
3. Arata scorul
0. Iesire
Alege: 7
  Valoare invalida (0 - 3).
Alege: 3

=== SCOR ===
X: 1   O: 1   Remize: 0

===== X SI 0 =====
1. Doi jucatori
2. Contra calculatorului (tu esti X)
3. Arata scorul
0. Iesire
Alege: 0

=== SCOR ===
X: 1   O: 1   Remize: 0
Multumesc ca ai jucat!
```

Prima partidă (doi jucători) este câștigată de `X` pe rândul de sus. În a doua partidă, jucătorul `X` joacă împotriva calculatorului: calculatorul **blochează** când trebuie și **câștigă** când poate. Scorul se acumulează între partide, pentru că `Scor` trăiește în `main`, în afara funcției `joc`.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Alege și termină un joc (obligatoriu)
Scrie complet „Ghici numărul” (Exemplul 7) **sau** „X și 0” (Exemplul 14). Nu copia: scrie-l pe bucăți, testând fiecare funcție înainte de următoarea. Apoi adaugă cel puțin o funcție nouă, ideea ta.

**Pe niveluri (alege-l pe al tău):**
- **De bază:** „Ghici numărul” din Exemplele 1–5 (limită de încercări, scor, niveluri), fără clasament în fișier.
- **Complet:** Exemplul 7 sau Exemplul 14, întreg.
- **Provocare:** ambele jocuri, cu meniu și scor general.

Oricare dintre niveluri, dacă programul merge fără greșeli și l-ai scris tu, este un succes.

### Exercițiul B — Ghici cuvântul (Spânzurătoarea) *(Provocare, opțional)*
Programul alege un cuvânt dintr-un `vector<string>` (sau dintr-un fișier). Jucătorul ghicește litere; cele corecte apar în cuvânt (`_ a _ _ a`), iar cele greșite se numără. Pierde la 6 greșeli.

### Exercițiul C — Piatră, foarfecă, hârtie
Citește alegerea jucătorului (`1`, `2`, `3`), generează alegerea calculatorului cu `rand()` și hotărăște câștigătorul. Ține scorul pe mai multe runde, până când cineva ajunge la 3 puncte.

### Exercițiul D — Ghici numărul, rolurile inversate *(Provocare, opțional)*
Tu te gândești la un număr, iar **calculatorul** îl ghicește folosind strategia mijlocului. Tu răspunzi cu `m` (mai mic), `M` (mai mare) sau `g` (ghicit).

### Exercițiul E — Zarurile
Doi jucători aruncă fiecare câte două zaruri, de 5 ori. Se adună punctele; jucătorul cu suma cea mai mare câștigă. Dacă un jucător dă dublă (două zaruri la fel), mai aruncă o dată.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Jocul este împărțit în funcții cu un singur rol  
- [ ] Orice intrare greșită (litere, numere în afara intervalului) este tratată  
- [ ] Ai testat separat funcțiile importante (scor, câștigător, mutare calculator)  
- [ ] Ai un meniu și un scor sau un clasament  
- [ ] Fișierul se numește `Prenume_Nume_M4L6.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] La „X și 0”, lasă utilizatorul să aleagă dacă vrea X sau O  
- [ ] Salvează scorul general din „X și 0” într-un fișier, ca să se păstreze între rulări  
- [ ] La „Ghici numărul”, adaugă un indiciu după a treia încercare (par / impar, sau „ești la mai puțin de 10 distanță”)  
- [ ] Scrie un calculator care joacă perfect „X și 0” (nu pierde niciodată) și verifică-l jucând împotriva lui  
- [ ] Fă „Joc 4 în linie” cu o tablă de 6×7  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Numărul secret este mereu același | `srand` lipsește sau e apelat într-o buclă | `srand(time(0));` o singură dată, la începutul lui `main` |
| Numărul secret iese din interval (ex. 0 sau 101) | Formula greșită | `minim + rand() % (maxim - minim + 1)` |
| Jocul ia mutarea `9` ca poziția `9` din vector | Ai uitat să scazi 1 | Poziția este `m - 1` |
| Tabla arată mutări „fantomă” | Ai folosit `' '` în loc de `'.'` (sau invers) la testare | Folosește consecvent aceeași convenție |
| Se declară remiză, deși cineva a câștigat | Ai verificat tabla plină înaintea câștigătorului | Verifică mai întâi câștigătorul |
| Calculatorul nu blochează niciodată | Ordinea regulilor sau parametrii `eu`/`adversar` inversați | Câștig → blocare → centru → colț |
| Programul se blochează după o literă tastată | Citire fără protecție | `citesteInt`, ca în lecția 5 |
| Clasamentul se pierde la fiecare rulare | `salveaza` nu este apelată sau `incarca` lipsește la pornire | `incarca` la început, `salveaza` după fiecare modificare |
| Scorul general se resetează după fiecare partidă | `Scor` e declarat în `joc` | Declară-l în `main` și trimite-l prin `&` |

---

## Recapitulare pe scurt

- Planifici un joc prin patru întrebări: **date, reguli, ce se întâmplă la fiecare tur, cum se termină**.
- Un număr fix la început face testarea posibilă; abia la urmă îl înlocuiești cu `rand()`.
- Funcții cu parametri (`joaca(secret, maxIncercari)`) se testează cu valori alese de tine.
- Datele de configurare (niveluri) merg într-un tablou de structuri constant.
- Clasament: adaugi, sortezi, tai la `TOP` cu `resize`, salvezi.
- Tabla de `X și 0`: `vector<char>` cu 9 elemente, indice `r * 3 + c`, opt combinații câștigătoare.
- Verifici câștigătorul **înainte** de remiză.
- Un adversar simplu: câștigă dacă poate, blochează dacă trebuie, apoi centru, colțuri.
- Scorul general trăiește în `main` și este trimis prin referință.

---

## Temă
1. Termină jocul ales (A) și jucându-l, găsește cel puțin o greșeală; corecteaz-o și notează într-un comentariu ce ai descoperit.  
2. Scrie și celălalt joc din lecție, dacă nu l-ai terminat azi.  
3. Alege unul dintre exercițiile B–E și realizează-l.  
4. Gândește-te la proiectul de la lecția următoare, **Magazin / inventar**: ce produse va avea, ce informații despre fiecare, ce acțiuni vrei în meniu. Scrie o listă de 5–8 acțiuni.  
5. **Bonus:** adaugă un sistem de „realizări” (de exemplu „ai câștigat 3 partide la rând”) salvat în fișier.  
6. Salvează tot ca `Tema_M4L6_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 7
**Proiect B — Magazin / inventar.** Construim o aplicație cu produse (nume, preț, stoc) în care poți adăuga, căuta, vinde, șterge și salva. Este aplicația CRUD completă: cea mai întâlnită structură în programele „de afaceri” și pe care o vei regăsi, sub alte nume, în inventarul din jocul tău RPG.
