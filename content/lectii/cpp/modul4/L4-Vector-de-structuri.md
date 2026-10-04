# LECȚIA 4 — `vector` de structuri: catalogul
**Modulul 4 · Proiecte și autonomie · 2 ore**  
**Code Kids Play · CodeKids Graduate**

> Azi combinăm cele două lecții anterioare: un `vector` în care fiecare element este o **structură**. Primești o listă de obiecte care crește singură, în care poți adăuga, căuta, modifica, șterge și sorta. Este tiparul pe care se construiesc aproape toate aplicațiile cu liste: agende, cataloage, magazine, inventare.  
> Proiect: **„Catalogul clasei”** · fișier: `Prenume_Nume_M4L4.cpp` (ex. `Ana_Pop_M4L4.cpp`)

---

## Obiectiv
La finalul orei declari un `vector` de structuri, adaugi și parcurgi elemente, citești o listă din fișier, cauți după un câmp, modifici și ștergi un element, sortezi după un câmp ales de tine, filtrezi, salvezi lista și construiești un catalog cu meniu.  
**Minim:** adaugi elevi într-un `vector<Elev>`, îi afișezi și cauți un elev după nume.  
**Ținta orei (Complet):** + ștergere, modificare, sortare și proiectul „Catalogul clasei” cu salvare în fișier.

## De ce contează
Aproape orice aplicație are o **colecție de lucruri**: contacte, melodii, produse, monștri într-un joc. Tiparul din această lecție (adaugă, caută, modifică, șterge, sortează, salvează) se numește pe scurt **CRUD** (de la *Create, Read, Update, Delete*) și îl vei folosi în toate cele trei proiecte din lecțiile următoare.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `struct`, `vector` |
| 10–30 | `vector<Elev>`, adăugare, parcurgere (**Exemplele 1–3**) |
| 30–50 | Citire din fișier, căutare (**Exemplele 4–6**) |
| 50–75 | Modificare, ștergere, filtrare (**Exemplele 7–10**) |
| 75–95 | Sortare după un câmp (**Exemplele 11–13**) |
| 95–118 | Salvare, proiect (**Exemplele 14–16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Un `vector` de structuri

Tipul dintre `< >` poate fi orice tip, deci și o structură creată de tine. Pornim de la structura cunoscută:

```
struct Elev {
    string nume;
    int varsta;
    double nota;
};

vector<Elev> clasa;   // o lista de elevi, la inceput goala
```

### Exemplul 1 — Adăugăm elevi și îi afișăm **[Esențial]**

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int main() {
    vector<Elev> clasa;

    Elev a = {"Ana", 12, 9.5};
    clasa.push_back(a);                 // adaugam o variabila existenta
    clasa.push_back({"Bogdan", 13, 7}); // adaugam direct, cu acolade
    clasa.push_back({"Carmen", 12, 10});

    cout << "In clasa sunt " << clasa.size() << " elevi:" << endl;
    int n = clasa.size();
    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". " << clasa[i].nume << ", " << clasa[i].varsta
             << " ani, nota " << clasa[i].nota << endl;
    }
    return 0;
}
```

**Ieșire:**
```
In clasa sunt 3 elevi:
1. Ana, 12 ani, nota 9.5
2. Bogdan, 13 ani, nota 7
3. Carmen, 12 ani, nota 10
```

Aceleași reguli ca la `vector<int>`: `push_back` adaugă la sfârșit, `size()` dă numărul de elevi, `clasa[i]` este elevul de pe poziția `i`, iar `clasa[i].nume` este numele lui.

### Exemplul 2 — Parcurgere „pe elemente”

Cu `for (… : clasa)` nu mai numeri pozițiile. Dacă vrei **doar să citești**, scrie `const Elev &e`: `&` ca să nu copiezi fiecare elev, `const` ca să nu-l modifici din greșeală. Dacă vrei **să modifici**, scrie `Elev &e`.

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int main() {
    vector<Elev> clasa = {
        {"Ana", 12, 9.5},
        {"Bogdan", 13, 7.0},
        {"Carmen", 12, 10.0}
    };

    // doar citim
    double suma = 0;
    for (const Elev &e : clasa) {
        suma += e.nota;
    }
    cout << "Media: " << suma / clasa.size() << endl;

    // modificam: toti elevii cresc cu un an
    for (Elev &e : clasa) {
        e.varsta++;
    }

    for (const Elev &e : clasa) {
        cout << e.nume << " are acum " << e.varsta << " ani" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Media: 8.83333
Ana are acum 13 ani
Bogdan are acum 14 ani
Carmen are acum 13 ani
```

### Exemplul 3 — Citim elevii de la tastatură **[Esențial]**

Citim `n` elevi și îi punem pe rând în vector. Funcția `citesteElev` o cunoști din lecția trecută:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

Elev citesteElev() {
    Elev e;
    cout << "Nume varsta nota: ";
    cin >> e.nume >> e.varsta >> e.nota;
    return e;
}

int main() {
    int n;
    cout << "Cati elevi? ";
    cin >> n;

    vector<Elev> clasa;
    for (int i = 0; i < n; i++) {
        clasa.push_back(citesteElev());
    }

    cout << endl << "Ai introdus:" << endl;
    for (const Elev &e : clasa) {
        cout << " - " << e.nume << " (" << e.nota << ")" << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `3`, `Ana 12 9.5`, `Dan 13 8`, `Eva 12 10`):
```
Cati elevi? 3
Nume varsta nota: Ana 12 9.5
Nume varsta nota: Dan 13 8
Nume varsta nota: Eva 12 10

Ai introdus:
 - Ana (9.5)
 - Dan (8)
 - Eva (10)
```

`clasa.push_back(citesteElev());` citește un elev și îl adaugă imediat în vector, totul într-o singură linie.

---

## 2. Citire din fișier și căutare

### Exemplul 4 — Încărcăm catalogul dintr-un fișier **[Esențial]**

Pregătim un fișier cu 5 elevi (câte un elev pe linie: nume, vârstă, notă) și îl citim într-un vector, cu o funcție reutilizabilă:

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

vector<Elev> incarca(const string &fisier) {
    vector<Elev> lista;
    ifstream fin(fisier);
    if (!fin.is_open()) {
        return lista;
    }
    Elev e;
    while (fin >> e.nume >> e.varsta >> e.nota) {
        lista.push_back(e);
    }
    fin.close();
    return lista;
}

int main() {
    // pregatim fisierul
    ofstream fout("clasa.txt");
    fout << "Ana 12 9.5" << endl;
    fout << "Bogdan 13 7" << endl;
    fout << "Carmen 12 10" << endl;
    fout << "Dan 13 5.5" << endl;
    fout << "Elena 12 8.25" << endl;
    fout.close();

    vector<Elev> clasa = incarca("clasa.txt");
    cout << "Am incarcat " << clasa.size() << " elevi:" << endl;
    for (const Elev &e : clasa) {
        cout << " - " << e.nume << ", " << e.varsta << " ani, nota " << e.nota << endl;
    }

    vector<Elev> altul = incarca("nu_exista.txt");
    cout << "Din fisierul inexistent: " << altul.size() << " elevi" << endl;
    return 0;
}
```

**Ieșire:**
```
Am incarcat 5 elevi:
 - Ana, 12 ani, nota 9.5
 - Bogdan, 13 ani, nota 7
 - Carmen, 12 ani, nota 10
 - Dan, 13 ani, nota 5.5
 - Elena, 12 ani, nota 8.25
Din fisierul inexistent: 0 elevi
```

### Exemplul 5 — Căutare după nume **[Esențial]**

Funcția `cauta` întoarce **poziția** elevului în vector sau `-1` dacă nu l-a găsit. Valoarea `-1` este o convenție: nicio poziție reală nu poate fi negativă.

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int cauta(const vector<Elev> &lista, const string &nume) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].nume == nume) {
            return i;
        }
    }
    return -1;
}

int main() {
    vector<Elev> clasa = {
        {"Ana", 12, 9.5}, {"Bogdan", 13, 7}, {"Carmen", 12, 10}
    };

    string cautat[3] = {"Bogdan", "Zoe", "Ana"};
    for (int k = 0; k < 3; k++) {
        int poz = cauta(clasa, cautat[k]);
        if (poz == -1) {
            cout << cautat[k] << " nu se afla in clasa." << endl;
        } else {
            cout << cautat[k] << " este pe pozitia " << poz << ", nota " << clasa[poz].nota << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
Bogdan este pe pozitia 1, nota 7
Zoe nu se afla in clasa.
Ana este pe pozitia 0, nota 9.5
```

Întotdeauna verifici dacă `poz == -1` înainte să folosești `clasa[poz]`. Altfel accesezi `clasa[-1]`, o zonă de memorie care nu este a ta.

### Exemplul 6 — Cel mai bun și toți cei care îndeplinesc o condiție

Pentru „cel mai bun” păstrezi **poziția** maximului. Pentru „toți cei care…” parcurgi tot vectorul și afișezi fiecare potrivire:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int main() {
    vector<Elev> clasa = {
        {"Ana", 12, 9.5}, {"Bogdan", 13, 7}, {"Carmen", 12, 10},
        {"Dan", 13, 5.5}, {"Elena", 12, 8.25}
    };

    int best = 0;
    int n = clasa.size();
    for (int i = 1; i < n; i++) {
        if (clasa[i].nota > clasa[best].nota) {
            best = i;
        }
    }
    cout << "Cel mai bun: " << clasa[best].nume << " (" << clasa[best].nota << ")" << endl;

    cout << "Elevii de 12 ani:";
    for (const Elev &e : clasa) {
        if (e.varsta == 12) {
            cout << " " << e.nume;
        }
    }
    cout << endl;

    int fara = 0;
    for (const Elev &e : clasa) {
        if (e.nota < 5) {
            fara++;
        }
    }
    cout << "Elevi cu nota sub 5: " << fara << endl;
    return 0;
}
```

**Ieșire:**
```
Cel mai bun: Carmen (10)
Elevii de 12 ani: Ana Carmen Elena
Elevi cu nota sub 5: 0
```

---

## 3. Modificare, ștergere, filtrare

### Exemplul 7 — Modificăm un element găsit

Cauți elevul, apoi modifici câmpul. Pentru a nu scrie `clasa[poz]` de fiecare dată, poți crea o **referință** către el, un al doilea nume pentru același element:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int cauta(const vector<Elev> &lista, const string &nume) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].nume == nume) {
            return i;
        }
    }
    return -1;
}

bool schimbaNota(vector<Elev> &lista, const string &nume, double notaNoua) {
    int poz = cauta(lista, nume);
    if (poz == -1) {
        return false;
    }
    Elev &e = lista[poz];   // e este alt nume pentru lista[poz]
    cout << "Schimb nota lui " << e.nume << " din " << e.nota << " in " << notaNoua << endl;
    e.nota = notaNoua;
    return true;
}

int main() {
    vector<Elev> clasa = {{"Ana", 12, 9.5}, {"Dan", 13, 5.5}};

    schimbaNota(clasa, "Dan", 6.5);
    if (!schimbaNota(clasa, "Zoe", 10)) {
        cout << "Zoe nu exista, nu am schimbat nimic." << endl;
    }

    for (const Elev &e : clasa) {
        cout << e.nume << ": " << e.nota << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Schimb nota lui Dan din 5.5 in 6.5
Zoe nu exista, nu am schimbat nimic.
Ana: 9.5
Dan: 6.5
```

### Exemplul 8 — Ștergem un element **[Esențial]**

Ștergi cu `erase(v.begin() + poz)`, ca la `vector<int>`. Mai întâi găsești poziția și verifici că există:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int cauta(const vector<Elev> &lista, const string &nume) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].nume == nume) {
            return i;
        }
    }
    return -1;
}

bool sterge(vector<Elev> &lista, const string &nume) {
    int poz = cauta(lista, nume);
    if (poz == -1) {
        return false;
    }
    lista.erase(lista.begin() + poz);
    return true;
}

void afiseaza(const vector<Elev> &lista) {
    for (const Elev &e : lista) {
        cout << e.nume << " ";
    }
    cout << "(" << lista.size() << " elevi)" << endl;
}

int main() {
    vector<Elev> clasa = {{"Ana", 12, 9.5}, {"Bogdan", 13, 7}, {"Carmen", 12, 10}};
    afiseaza(clasa);

    if (sterge(clasa, "Bogdan")) {
        cout << "Bogdan a fost sters." << endl;
    }
    if (!sterge(clasa, "Zoe")) {
        cout << "Zoe nu exista." << endl;
    }
    afiseaza(clasa);
    return 0;
}
```

**Ieșire:**
```
Ana Bogdan Carmen (3 elevi)
Bogdan a fost sters.
Zoe nu exista.
Ana Carmen (2 elevi)
```

### Exemplul 9 — Adăugare fără duplicate

Într-un catalog, doi elevi nu trebuie să aibă același nume. Înainte de `push_back`, verifici cu `cauta`:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int cauta(const vector<Elev> &lista, const string &nume) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].nume == nume) {
            return i;
        }
    }
    return -1;
}

bool adauga(vector<Elev> &lista, const Elev &nou) {
    if (cauta(lista, nou.nume) != -1) {
        return false;
    }
    lista.push_back(nou);
    return true;
}

int main() {
    vector<Elev> clasa;

    Elev candidati[4] = {
        {"Ana", 12, 9.5}, {"Dan", 13, 8}, {"Ana", 14, 6}, {"Eva", 12, 10}
    };

    for (int i = 0; i < 4; i++) {
        if (adauga(clasa, candidati[i])) {
            cout << "Adaugat: " << candidati[i].nume << endl;
        } else {
            cout << "Exista deja un elev cu numele " << candidati[i].nume << endl;
        }
    }
    cout << "Total elevi: " << clasa.size() << endl;
    return 0;
}
```

**Ieșire:**
```
Adaugat: Ana
Adaugat: Dan
Exista deja un elev cu numele Ana
Adaugat: Eva
Total elevi: 3
```

### Exemplul 10 — Filtrare într-un vector nou

Ca la `vector<int>`, poți construi un alt vector cu elevii care îndeplinesc o condiție. Aici: cei promovați (nota cel puțin 5) și corigenții:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

vector<Elev> promovati(const vector<Elev> &lista) {
    vector<Elev> rez;
    for (const Elev &e : lista) {
        if (e.nota >= 5) {
            rez.push_back(e);
        }
    }
    return rez;
}

vector<Elev> corigenti(const vector<Elev> &lista) {
    vector<Elev> rez;
    for (const Elev &e : lista) {
        if (e.nota < 5) {
            rez.push_back(e);
        }
    }
    return rez;
}

int main() {
    vector<Elev> clasa = {
        {"Ana", 12, 9.5}, {"Bogdan", 13, 4}, {"Carmen", 12, 10},
        {"Dan", 13, 3.5}, {"Elena", 12, 8.25}
    };

    vector<Elev> p = promovati(clasa);
    vector<Elev> c = corigenti(clasa);

    cout << "Promovati (" << p.size() << "):";
    for (const Elev &e : p) {
        cout << " " << e.nume;
    }
    cout << endl;

    cout << "Corigenti (" << c.size() << "):";
    for (const Elev &e : c) {
        cout << " " << e.nume;
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Promovati (3): Ana Carmen Elena
Corigenti (2): Bogdan Dan
```

---

## 4. Sortarea după un câmp

Funcția `sort` din `<algorithm>` știe să sorteze numere, dar nu știe singură cum să compare doi elevi. Îi dai tu **regula de comparare**, o funcție care primește doi elevi și răspunde la întrebarea: „Elevul `a` trebuie să stea **înaintea** elevului `b`?”

```
bool dupaNota(const Elev &a, const Elev &b) {
    return a.nota > b.nota;   // a vine inainte de b daca are nota mai mare
}

sort(clasa.begin(), clasa.end(), dupaNota);
```

### Exemplul 11 — Sortare descrescătoare după notă **[Esențial]**

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

bool dupaNota(const Elev &a, const Elev &b) {
    return a.nota > b.nota;
}

int main() {
    vector<Elev> clasa = {
        {"Ana", 12, 9.5}, {"Bogdan", 13, 7}, {"Carmen", 12, 10},
        {"Dan", 13, 5.5}, {"Elena", 12, 8.25}
    };

    sort(clasa.begin(), clasa.end(), dupaNota);

    cout << "Clasament:" << endl;
    int loc = 1;
    for (const Elev &e : clasa) {
        cout << loc << ". " << e.nume << " - " << e.nota << endl;
        loc++;
    }
    return 0;
}
```

**Ieșire:**
```
Clasament:
1. Carmen - 10
2. Ana - 9.5
3. Elena - 8.25
4. Bogdan - 7
5. Dan - 5.5
```

Dacă ai fi scris `a.nota < b.nota`, ordinea ar fi fost crescătoare. Același tipar merge pentru orice câmp și pentru orice direcție.

### Exemplul 12 — Sortare după nume și după vârstă

Textele se compară alfabetic cu `<`. Putem avea câte o funcție pentru fiecare criteriu:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

bool dupaNume(const Elev &a, const Elev &b) {
    return a.nume < b.nume;
}

bool dupaVarsta(const Elev &a, const Elev &b) {
    if (a.varsta != b.varsta) {
        return a.varsta < b.varsta;
    }
    return a.nume < b.nume;   // la aceeasi varsta: alfabetic
}

void afiseaza(const vector<Elev> &lista) {
    for (const Elev &e : lista) {
        cout << "  " << e.nume << " (" << e.varsta << " ani)" << endl;
    }
}

int main() {
    vector<Elev> clasa = {
        {"Dan", 13, 5.5}, {"Ana", 12, 9.5}, {"Carmen", 12, 10}, {"Bogdan", 13, 7}
    };

    sort(clasa.begin(), clasa.end(), dupaNume);
    cout << "Alfabetic:" << endl;
    afiseaza(clasa);

    sort(clasa.begin(), clasa.end(), dupaVarsta);
    cout << "Dupa varsta (apoi alfabetic):" << endl;
    afiseaza(clasa);
    return 0;
}
```

**Ieșire:**
```
Alfabetic:
  Ana (12 ani)
  Bogdan (13 ani)
  Carmen (12 ani)
  Dan (13 ani)
Dupa varsta (apoi alfabetic):
  Ana (12 ani)
  Carmen (12 ani)
  Bogdan (13 ani)
  Dan (13 ani)
```

Funcția `dupaVarsta` compară întâi vârsta; doar dacă vârstele sunt egale, decide numele. Așa obții o ordine clară, chiar și când mai mulți elevi au aceeași vârstă.

### Exemplul 13 — Top 3

Sortezi, apoi afișezi doar primii trei. Ai grijă să nu depășești lungimea vectorului dacă sunt mai puțini de trei elevi:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

bool dupaNota(const Elev &a, const Elev &b) {
    return a.nota > b.nota;
}

void top(vector<Elev> lista, int k) {   // primim o COPIE: nu stricam ordinea originala
    sort(lista.begin(), lista.end(), dupaNota);
    int n = lista.size();
    if (k > n) {
        k = n;
    }
    for (int i = 0; i < k; i++) {
        cout << i + 1 << ". " << lista[i].nume << " (" << lista[i].nota << ")" << endl;
    }
}

int main() {
    vector<Elev> clasa = {
        {"Ana", 12, 9.5}, {"Bogdan", 13, 7}, {"Carmen", 12, 10},
        {"Dan", 13, 5.5}, {"Elena", 12, 8.25}
    };

    cout << "Top 3:" << endl;
    top(clasa, 3);

    cout << "Top 10 (avem doar " << clasa.size() << " elevi):" << endl;
    top(clasa, 10);

    cout << "Ordinea originala ramane: " << clasa[0].nume << " este tot primul." << endl;
    return 0;
}
```

**Ieșire:**
```
Top 3:
1. Carmen (10)
2. Ana (9.5)
3. Elena (8.25)
Top 10 (avem doar 5 elevi):
1. Carmen (10)
2. Ana (9.5)
3. Elena (8.25)
4. Bogdan (7)
5. Dan (5.5)
Ordinea originala ramane: Ana este tot primul.
```

Aici parametrul este `vector<Elev> lista`, **fără `&`**, tocmai ca să primim o copie și să sortăm copia, nu catalogul original. Până acum îți spuneam să folosești `&`, dar nu este o regulă fără excepții: când vrei intenționat o copie, nu pui `&`.

---

## 5. Salvare și proiect

### Exemplul 14 — Salvăm lista într-un fișier **[Esențial]**

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

void salveaza(const vector<Elev> &lista, const string &fisier) {
    ofstream fout(fisier);
    for (const Elev &e : lista) {
        fout << e.nume << " " << e.varsta << " " << e.nota << endl;
    }
    fout.close();
}

vector<Elev> incarca(const string &fisier) {
    vector<Elev> lista;
    ifstream fin(fisier);
    Elev e;
    while (fin >> e.nume >> e.varsta >> e.nota) {
        lista.push_back(e);
    }
    return lista;
}

int main() {
    vector<Elev> clasa = {{"Ana", 12, 9.5}, {"Bogdan", 13, 7}, {"Carmen", 12, 10}};
    salveaza(clasa, "catalog_test.txt");
    cout << "Am salvat " << clasa.size() << " elevi." << endl;

    vector<Elev> copie = incarca("catalog_test.txt");
    cout << "Am incarcat " << copie.size() << " elevi:" << endl;
    for (const Elev &e : copie) {
        cout << " - " << e.nume << " " << e.varsta << " " << e.nota << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Am salvat 3 elevi.
Am incarcat 3 elevi:
 - Ana 12 9.5
 - Bogdan 13 7
 - Carmen 12 10
```

### Exemplul 15 — Statistici pe catalog

Câte funcții mici, fiecare cu un rol clar: media, numărul de promovați, elevul cel mai tânăr:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <iomanip>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

double media(const vector<Elev> &lista) {
    if (lista.empty()) {
        return 0;
    }
    double suma = 0;
    for (const Elev &e : lista) {
        suma += e.nota;
    }
    return suma / lista.size();
}

int numarPromovati(const vector<Elev> &lista) {
    int nr = 0;
    for (const Elev &e : lista) {
        if (e.nota >= 5) {
            nr++;
        }
    }
    return nr;
}

int celMaiTanar(const vector<Elev> &lista) {
    int poz = 0;
    int n = lista.size();
    for (int i = 1; i < n; i++) {
        if (lista[i].varsta < lista[poz].varsta) {
            poz = i;
        }
    }
    return poz;
}

int main() {
    vector<Elev> clasa = {
        {"Ana", 13, 9.5}, {"Bogdan", 12, 4}, {"Carmen", 14, 10}, {"Dan", 13, 3.5}
    };

    cout << fixed << setprecision(2);
    cout << "Media clasei: " << media(clasa) << endl;
    cout << "Promovati: " << numarPromovati(clasa) << " din " << clasa.size() << endl;
    int t = celMaiTanar(clasa);
    cout << "Cel mai tanar: " << clasa[t].nume << " (" << clasa[t].varsta << " ani)" << endl;
    return 0;
}
```

**Ieșire:**
```
Media clasei: 6.75
Promovati: 2 din 4
Cel mai tanar: Bogdan (12 ani)
```

### Exemplul 16 — „Catalogul clasei” (mini-proiect) **[Esențial]**

Aplicația completă: meniu, adăugare fără duplicate, afișare ca tabel, căutare, modificare, ștergere, sortare, statistici, încărcare la pornire și salvare la ieșire. Numele se scriu fără spații.

```cpp
/*
   Program: Catalogul clasei
   Scop:    vector de structuri cu meniu CRUD, sortare si salvare
*/
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

struct Elev {
    string nume;
    int varsta = 0;
    double nota = 0;
};

const string FISIER = "catalog.txt";

// ---------- fisiere ----------
vector<Elev> incarca() {
    vector<Elev> lista;
    ifstream fin(FISIER);
    if (!fin.is_open()) {
        return lista;
    }
    Elev e;
    while (fin >> e.nume >> e.varsta >> e.nota) {
        lista.push_back(e);
    }
    fin.close();
    return lista;
}

void salveaza(const vector<Elev> &lista) {
    ofstream fout(FISIER);
    for (const Elev &e : lista) {
        fout << e.nume << " " << e.varsta << " " << e.nota << endl;
    }
    fout.close();
}

// ---------- operatii ----------
int cauta(const vector<Elev> &lista, const string &nume) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].nume == nume) {
            return i;
        }
    }
    return -1;
}

bool dupaNota(const Elev &a, const Elev &b) {
    return a.nota > b.nota;
}

void afiseazaElev(const Elev &e) {
    cout << left << setw(10) << e.nume << right << setw(4) << e.varsta
         << " ani   nota " << e.nota << endl;
}

void afiseazaTot(const vector<Elev> &lista) {
    if (lista.empty()) {
        cout << "Catalogul este gol." << endl;
        return;
    }
    cout << fixed << setprecision(2);
    for (const Elev &e : lista) {
        afiseazaElev(e);
    }
}

void adauga(vector<Elev> &lista) {
    Elev e;
    cout << "Nume varsta nota: ";
    cin >> e.nume >> e.varsta >> e.nota;
    if (e.varsta < 5 || e.varsta > 20 || e.nota < 1 || e.nota > 10) {
        cout << "Date invalide, elevul nu a fost adaugat." << endl;
        return;
    }
    if (cauta(lista, e.nume) != -1) {
        cout << "Exista deja un elev cu acest nume." << endl;
        return;
    }
    lista.push_back(e);
    cout << "Elev adaugat." << endl;
}

void cautaSiAfiseaza(const vector<Elev> &lista) {
    string nume;
    cout << "Nume cautat: ";
    cin >> nume;
    int poz = cauta(lista, nume);
    if (poz == -1) {
        cout << "Nu am gasit elevul " << nume << "." << endl;
    } else {
        afiseazaElev(lista[poz]);
    }
}

void modificaNota(vector<Elev> &lista) {
    string nume;
    double nota;
    cout << "Nume si nota noua: ";
    cin >> nume >> nota;
    int poz = cauta(lista, nume);
    if (poz == -1) {
        cout << "Nu am gasit elevul " << nume << "." << endl;
    } else if (nota < 1 || nota > 10) {
        cout << "Nota invalida." << endl;
    } else {
        lista[poz].nota = nota;
        cout << "Nota a fost modificata." << endl;
    }
}

void sterge(vector<Elev> &lista) {
    string nume;
    cout << "Nume de sters: ";
    cin >> nume;
    int poz = cauta(lista, nume);
    if (poz == -1) {
        cout << "Nu am gasit elevul " << nume << "." << endl;
    } else {
        lista.erase(lista.begin() + poz);
        cout << "Elevul a fost sters." << endl;
    }
}

void statistici(const vector<Elev> &lista) {
    if (lista.empty()) {
        cout << "Nu exista elevi." << endl;
        return;
    }
    double suma = 0;
    int promovati = 0;
    int best = 0;
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        suma += lista[i].nota;
        if (lista[i].nota >= 5) {
            promovati++;
        }
        if (lista[i].nota > lista[best].nota) {
            best = i;
        }
    }
    cout << fixed << setprecision(2);
    cout << "Elevi: " << n << endl;
    cout << "Media: " << suma / n << endl;
    cout << "Promovati: " << promovati << endl;
    cout << "Cel mai bun: " << lista[best].nume << " (" << lista[best].nota << ")" << endl;
}

void afiseazaMeniu() {
    cout << endl;
    cout << "===== CATALOGUL CLASEI =====" << endl;
    cout << "1. Adauga elev" << endl;
    cout << "2. Afiseaza catalogul" << endl;
    cout << "3. Cauta un elev" << endl;
    cout << "4. Sterge un elev" << endl;
    cout << "5. Modifica o nota" << endl;
    cout << "6. Sorteaza dupa nota" << endl;
    cout << "7. Statistici" << endl;
    cout << "0. Iesire" << endl;
    cout << "Alege: ";
}

int main() {
    vector<Elev> catalog = incarca();
    cout << "Am incarcat " << catalog.size() << " elevi din " << FISIER << endl;

    int optiune;
    do {
        afiseazaMeniu();
        cin >> optiune;

        if (optiune == 1) {
            adauga(catalog);
        } else if (optiune == 2) {
            afiseazaTot(catalog);
        } else if (optiune == 3) {
            cautaSiAfiseaza(catalog);
        } else if (optiune == 4) {
            sterge(catalog);
        } else if (optiune == 5) {
            modificaNota(catalog);
        } else if (optiune == 6) {
            sort(catalog.begin(), catalog.end(), dupaNota);
            cout << "Catalogul a fost sortat dupa nota." << endl;
        } else if (optiune == 7) {
            statistici(catalog);
        } else if (optiune != 0) {
            cout << "Optiune necunoscuta." << endl;
        }
    } while (optiune != 0);

    salveaza(catalog);
    cout << "Catalogul a fost salvat. La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1 Ana 12 9.5`, `1 Bogdan 13 7`, `1 Carmen 12 10`, `1 Dan 13 5`, `1 Ana 14 6`, `3 Bogdan`, `5 Dan 6`, `6`, `2`, `4 Bogdan`, `7`, `0`):
```
Am incarcat 0 elevi din catalog.txt

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 1
Nume varsta nota: Ana 12 9.5
Elev adaugat.

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 1
Nume varsta nota: Bogdan 13 7
Elev adaugat.

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 1
Nume varsta nota: Carmen 12 10
Elev adaugat.

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 1
Nume varsta nota: Dan 13 5
Elev adaugat.

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 1
Nume varsta nota: Ana 14 6
Exista deja un elev cu acest nume.

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 3
Nume cautat: Bogdan
Bogdan      13 ani   nota 7

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 5
Nume si nota noua: Dan 6
Nota a fost modificata.

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 6
Catalogul a fost sortat dupa nota.

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 2
Carmen      12 ani   nota 10.00
Ana         12 ani   nota 9.50
Bogdan      13 ani   nota 7.00
Dan         13 ani   nota 6.00

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 4
Nume de sters: Bogdan
Elevul a fost sters.

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 7
Elevi: 3
Media: 8.50
Promovati: 3
Cel mai bun: Carmen (10.00)

===== CATALOGUL CLASEI =====
1. Adauga elev
2. Afiseaza catalogul
3. Cauta un elev
4. Sterge un elev
5. Modifica o nota
6. Sorteaza dupa nota
7. Statistici
0. Iesire
Alege: 0
Catalogul a fost salvat. La revedere!
```

În demonstrație, a doua adăugare a numelui „Ana” este respinsă (nume duplicat). Fiecare opțiune din meniu este o **funcție separată**, iar `main` doar alege între ele. Programul are aproximativ 200 de linii, dar rămâne ușor de urmărit, pentru că fiecare funcție are un singur rol și un nume clar. Rulează-l de două ori: la a doua rulare, catalogul se încarcă singur din `catalog.txt`.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Catalogul clasei” (obligatoriu)
Scrie programul din Exemplul 16. Adaugă două opțiuni: „Sortează alfabetic” (după nume) și „Afișează doar corigenții” (cu o funcție care întoarce un vector filtrat).

### Exercițiul B — Agenda de telefon
Definește `struct Contact { string nume; string telefon; };` și construiește o agendă cu meniu: adaugă, caută după nume, șterge, afișează tot, salvează în `agenda.txt`.

### Exercițiul C — Biblioteca
Definește `struct Carte { string titlu; string autor; int an; };` cu un `vector<Carte>`. Adaugă opțiuni: caută după autor (afișează toate cărțile lui), sortează după an, afișează cea mai veche carte.

### Exercițiul D — Clasamentul
Citește de la tastatură 6 jucători (nume și scor), sortează-i descrescător după scor și afișează clasamentul cu locurile 1, 2, 3… Dacă doi jucători au același scor, ordonează-i alfabetic.

### Exercițiul E — Cumpărături
Definește `struct Articol { string nume; double pret; int cantitate; };`. Citește o listă de articole până când se scrie numele `gata`, apoi afișează lista și totalul de plată.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Căutarea întoarce `-1` când nu găsește și acest caz este tratat peste tot  
- [ ] Funcțiile care citesc primesc `const vector<Elev> &`; cele care modifică, `vector<Elev> &`  
- [ ] Ștergerea verifică mai întâi dacă elementul există  
- [ ] Datele se salvează la ieșire și se încarcă la pornire  
- [ ] Fișierul se numește `Prenume_Nume_M4L4.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Permite nume cu spații (în fișier, scrie numele pe o linie și restul datelor pe linia următoare; citește numele cu `getline`)  
- [ ] Adaugă la `Elev` un vector de note (`vector<double> note`) și calculează media fiecărui elev  
- [ ] Adaugă o opțiune „Șterge toți elevii corigenți”  
- [ ] Adaugă o căutare parțială (toți elevii al căror nume începe cu o literă dată)  
- [ ] Afișează catalogul grupat pe vârste  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `clasa.nume` sau `clasa[nume]` | Ai uitat să alegi elementul | `clasa[i].nume` |
| `clasa[poz]` după o căutare eșuată | `poz == -1` | Verifică `poz != -1` înainte |
| Avertisment `comparison of integer expressions of different signedness` | `i < clasa.size()` | `int n = clasa.size();` |
| Catalogul nu se modifică dintr-o funcție | Parametru `vector<Elev> v` (copie) | `vector<Elev> &v` |
| `sort` dă erori lungi | Lipsește funcția de comparare sau parametrii ei nu sunt `const Elev &` | `bool dupaNota(const Elev &a, const Elev &b)` |
| Sortarea nu respectă ordinea dorită | Ai folosit `<` în loc de `>` (sau invers) | `>` pentru descrescător, `<` pentru crescător |
| Ștergerea sare peste elemente | Ștergi într-un `for` care crește `i` mereu | Folosește `while` și avansează doar când nu ștergi |
| Elevii cu aceeași valoare apar amestecați | Comparatorul nu are un al doilea criteriu | Dacă primele câmpuri sunt egale, compară și numele |
| La a doua rulare datele sunt pierdute | Nu ai apelat `salveaza` la ieșire | Salvează înainte de `return 0;` |
| Meniul se repetă la infinit după o literă introdusă | `cin >> optiune` a eșuat | Vezi lecția următoare: validarea intrării |

---

## Recapitulare pe scurt

- `vector<Elev> clasa;` este o listă de structuri; `clasa[i].camp` accesează un câmp.
- Adăugare: `clasa.push_back(elev)` sau `clasa.push_back({…})`.
- Parcurgere: `for (const Elev &e : clasa)` pentru citire, `for (Elev &e : clasa)` pentru modificare.
- Căutare: o funcție care întoarce poziția sau `-1`; verifici mereu `-1`.
- Ștergere: `clasa.erase(clasa.begin() + poz);`
- Sortare: `sort(clasa.begin(), clasa.end(), comparator);`, unde comparatorul este `bool f(const Elev &a, const Elev &b)`, adevărat dacă `a` trebuie să stea înaintea lui `b`.
- Tiparul **CRUD**: adaugă, citește (afișează/caută), modifică, șterge.
- Fișiere: `incarca()` la pornire, `salveaza()` la ieșire.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Termină exercițiile A–C.  
3. Scrie un program cu `struct Produs { string nume; double pret; int stoc; };`: citește produse dintr-un fișier, afișează-le sortate după preț (crescător) și apoi pe cele cu stocul 0.  
4. Scrie funcția `vector<Elev> topK(const vector<Elev> &lista, int k)` care întoarce primii `k` elevi după notă (atenție la cazul `k` mai mare decât numărul de elevi).  
5. **Bonus:** adaugă la „Catalogul clasei” o opțiune „Importă din alt fișier”, care adaugă elevii dintr-un fișier dat de utilizator, fără să creeze nume duplicate.  
6. Salvează tot ca `Tema_M4L4_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 5
Aplicațiile mari au un meniu mai atent construit: validează tot ce tastează utilizatorul (ce se întâmplă acum dacă scrie o literă unde ai cerut un număr?), își țin **starea** programului într-un singur loc și sunt împărțite în părți clare. Construim un **schelet de aplicație** pe care îl poți folosi în orice proiect.
