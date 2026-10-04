# LECȚIA 3 — Structuri (`struct`): date grupate
**Modulul 4 · Proiecte și autonomie · 2 ore**  
**Code Kids Play · CodeKids Graduate**

> Un elev nu este doar un nume, sau doar o notă. Este un nume, **și** o vârstă, **și** o notă. Un obiect dintr-un joc are viață, putere și poziție. Până acum țineai astfel de date în variabile separate. Azi învățăm să le grupăm într-o singură „cutie” cu `struct`, ca să le putem trata ca pe un tot.  
> Proiect: **„Fișa elevului”** · fișier: `Prenume_Nume_M4L3.cpp` (ex. `Ana_Pop_M4L3.cpp`)

---

## Obiectiv
La finalul orei definești o structură cu mai multe câmpuri, creezi variabile de acest tip, accesezi câmpurile cu `.`, trimiți structuri în funcții (prin valoare, prin referință și cu `const &`), întorci o structură dintr-o funcție, folosești structuri în alte structuri și le salvezi într-un fișier.  
**Minim:** o structură cu 3 câmpuri, citită de la tastatură și afișată cu o funcție.  
**Ținta orei (Complet):** + funcții care modifică structura, un tablou de structuri și proiectul „Fișa elevului”.

## De ce contează
Programele reale lucrează cu **lucruri**, nu cu numere izolate: un produs (nume, preț, stoc), un personaj (nume, viață, atac), o carte (titlu, autor, an). Cu `struct` îți modelezi propriile tipuri de date. Este baza programării orientate pe obiecte și pasul care face trecerea de la exerciții la aplicații. În lecția următoare vei pune structuri într-un `vector` și vei obține un catalog întreg, iar în Modulul 5 vei construi jucătorul și monștrii din RPG.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `vector`, funcții cu `&` |
| 10–35 | Prima structură, câmpuri, inițializare (**Exemplele 1–3**) |
| 35–55 | Citire și afișare, funcții cu structuri (**Exemplele 4–7**) |
| 55–80 | Structuri în structuri, tablou de structuri (**Exemplele 8–10**) |
| 80–100 | Alte structuri, salvare în fișier (**Exemplele 11–14**) |
| 100–118 | Proiect (**Exemplele 15–16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Prima structură

Să presupunem că vrei să ții minte datele unui elev. Fără `struct` ai scrie:

```
string nume1 = "Ana";   int varsta1 = 12;   double nota1 = 9.5;
string nume2 = "Dan";   int varsta2 = 13;   double nota2 = 8.0;
```

Cu 30 de elevi ar fi 90 de variabile, imposibil de trimis ușor într-o funcție. Soluția: definim **un tip nou**, `Elev`, care conține toate datele unui elev.

```
struct Elev {
    string nume;
    int varsta;
    double nota;
};
```

Atenție la `;` de după acolada de închidere: la `struct` el este **obligatoriu**. Fără el, primești erori ciudate la linia următoare.

`Elev` este acum un tip, ca `int` sau `string`. Variabilele din interior (`nume`, `varsta`, `nota`) se numesc **câmpuri** (sau *membri*). Structura se definește **înainte de `main`** (și înaintea funcțiilor care o folosesc).

### Exemplul 1 — Definim și folosim un `Elev` **[Esențial]**

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int main() {
    Elev e;
    e.nume = "Ana";
    e.varsta = 12;
    e.nota = 9.5;

    cout << "Nume: " << e.nume << endl;
    cout << "Varsta: " << e.varsta << " ani" << endl;
    cout << "Nota: " << e.nota << endl;
    return 0;
}
```

**Ieșire:**
```
Nume: Ana
Varsta: 12 ani
Nota: 9.5
```

`Elev e;` creează o variabilă `e` de tipul `Elev`, cu propriile ei câmpuri. Câmpurile se accesează cu un **punct**: `e.nume`, `e.varsta`, `e.nota`. Punctul se citește „al lui”: `e.nota` este „nota lui `e`”.

### Exemplul 2 — Inițializare cu acolade și copiere **[Esențial]**

Poți da toate valorile deodată, în ordinea câmpurilor. O structură poate fi și copiată dintr-o singură mișcare:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int main() {
    Elev a = {"Ana", 12, 9.5};
    Elev b = {"Bogdan", 13, 8.0};

    Elev c = a;        // copiem toate campurile lui a in c
    c.nume = "Carmen"; // schimbam doar copia

    cout << a.nume << ", " << a.varsta << " ani, nota " << a.nota << endl;
    cout << b.nume << ", " << b.varsta << " ani, nota " << b.nota << endl;
    cout << c.nume << ", " << c.varsta << " ani, nota " << c.nota << endl;
    return 0;
}
```

**Ieșire:**
```
Ana, 12 ani, nota 9.5
Bogdan, 13 ani, nota 8
Carmen, 12 ani, nota 9.5
```

După `Elev c = a;`, `c` este o **copie independentă** a lui `a`: schimbarea lui `c.nume` nu influențează `a`. Ordinea valorilor din acolade trebuie să fie ordinea câmpurilor din definiție (`nume`, `varsta`, `nota`).

### Exemplul 3 — Valori implicite

Poți da valori de pornire chiar în definiția structurii. Se folosesc pentru câmpurile pe care nu le specifici:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Jucator {
    string nume = "Necunoscut";
    int viata = 100;
    int scor = 0;
};

int main() {
    Jucator j1;                      // foloseste valorile implicite
    Jucator j2;
    j2.nume = "Erou";
    j2.scor = 250;

    cout << j1.nume << ": viata " << j1.viata << ", scor " << j1.scor << endl;
    cout << j2.nume << ": viata " << j2.viata << ", scor " << j2.scor << endl;
    return 0;
}
```

**Ieșire:**
```
Necunoscut: viata 100, scor 0
Erou: viata 100, scor 250
```

Fără valori implicite, câmpurile numerice ale unei variabile locale ar conține „gunoi” (valori întâmplătoare), exact ca la variabilele obișnuite. Cu `= 100` știi mereu de la ce valoare pornești. Obișnuiește-te să le pui.

---

## 2. Citire, afișare, funcții

### Exemplul 4 — Citim o structură de la tastatură **[Esențial]**

Câmp cu câmp, ca niște variabile obișnuite:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int main() {
    Elev e;
    cout << "Nume (un cuvant): ";
    cin >> e.nume;
    cout << "Varsta: ";
    cin >> e.varsta;
    cout << "Nota: ";
    cin >> e.nota;

    cout << endl << "Fisa: " << e.nume << ", " << e.varsta << " ani, nota " << e.nota << endl;
    if (e.nota >= 5) {
        cout << e.nume << " a promovat." << endl;
    } else {
        cout << e.nume << " are corigenta." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `Ana 12 9.5`):
```
Nume (un cuvant): Ana
Varsta: 12
Nota: 9.5

Fisa: Ana, 12 ani, nota 9.5
Ana a promovat.
```

### Exemplul 5 — Funcție care primește o structură **[Esențial]**

Ca la orice alt tip, trimiți structura într-o funcție. Dacă funcția doar o citește, folosești `const Elev &` (fără copiere și fără risc să strici datele):

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

void afiseaza(const Elev &e) {
    cout << e.nume << " (" << e.varsta << " ani), nota " << e.nota << endl;
}

bool promovat(const Elev &e) {
    return e.nota >= 5;
}

int main() {
    Elev a = {"Ana", 12, 9.5};
    Elev b = {"Bogdan", 13, 4.5};

    afiseaza(a);
    afiseaza(b);

    if (promovat(b)) {
        cout << b.nume << " a promovat." << endl;
    } else {
        cout << b.nume << " nu a promovat." << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Ana (12 ani), nota 9.5
Bogdan (13 ani), nota 4.5
Bogdan nu a promovat.
```

### Exemplul 6 — Funcție care modifică o structură **[Esențial]**

Dacă vrei ca funcția să schimbe structura primită, folosești `&` simplu (fără `const`). Fără `&`, funcția lucrează cu o copie și schimbările se pierd.

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

void afiseaza(const Elev &e) {
    cout << e.nume << ": nota " << e.nota << ", " << e.varsta << " ani" << endl;
}

void maresteNota(Elev &e, double bonus) {
    e.nota += bonus;
    if (e.nota > 10) {
        e.nota = 10;
    }
}

void imbatraneste(Elev e) {   // fara & : lucreaza pe o COPIE
    e.varsta++;
}

int main() {
    Elev a = {"Ana", 12, 9.0};
    afiseaza(a);

    maresteNota(a, 0.5);
    cout << "Dupa bonus 0.5:  ";
    afiseaza(a);

    maresteNota(a, 2);
    cout << "Dupa bonus 2:    ";
    afiseaza(a);

    imbatraneste(a);
    cout << "Dupa imbatraneste (fara &): ";
    afiseaza(a);
    return 0;
}
```

**Ieșire:**
```
Ana: nota 9, 12 ani
Dupa bonus 0.5:  Ana: nota 9.5, 12 ani
Dupa bonus 2:    Ana: nota 10, 12 ani
Dupa imbatraneste (fara &): Ana: nota 10, 12 ani
```

`maresteNota` are `Elev &e`, deci schimbă chiar elevul din `main`. `imbatraneste` primește o copie și crește vârsta copiei, care dispare la sfârșitul funcției: `a.varsta` rămâne `12`.

### Exemplul 7 — Funcție care întoarce o structură

O funcție poate construi o structură și o poate întoarce. Este felul clasic de a scrie o funcție „citește un elev”:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

Elev citesteElev() {
    Elev e;
    cout << "Nume: ";
    cin >> e.nume;
    cout << "Varsta: ";
    cin >> e.varsta;
    cout << "Nota: ";
    cin >> e.nota;
    return e;
}

void afiseaza(const Elev &e) {
    cout << e.nume << ", " << e.varsta << " ani, nota " << e.nota << endl;
}

int main() {
    cout << "Primul elev:" << endl;
    Elev x = citesteElev();
    cout << "Al doilea elev:" << endl;
    Elev y = citesteElev();

    cout << endl << "Elevi cititi:" << endl;
    afiseaza(x);
    afiseaza(y);

    if (x.nota > y.nota) {
        cout << x.nume << " are nota mai mare." << endl;
    } else if (y.nota > x.nota) {
        cout << y.nume << " are nota mai mare." << endl;
    } else {
        cout << "Notele sunt egale." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `Ana 12 9.5`, `Dan 13 8`):
```
Primul elev:
Nume: Ana
Varsta: 12
Nota: 9.5
Al doilea elev:
Nume: Dan
Varsta: 13
Nota: 8

Elevi cititi:
Ana, 12 ani, nota 9.5
Dan, 13 ani, nota 8
Ana are nota mai mare.
```

---

## 3. Structuri în structuri, tablouri de structuri

### Exemplul 8 — O structură în altă structură

Un câmp poate avea, la rândul lui, tipul unei alte structuri. Un jucător are o poziție pe hartă, iar poziția are `x` și `y`:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Punct {
    int x;
    int y;
};

struct Jucator {
    string nume;
    int viata;
    Punct poz;
};

void muta(Jucator &j, int dx, int dy) {
    j.poz.x += dx;
    j.poz.y += dy;
}

void afiseaza(const Jucator &j) {
    cout << j.nume << " (viata " << j.viata << ") este la (" << j.poz.x << ", " << j.poz.y << ")" << endl;
}

int main() {
    Jucator j = {"Erou", 100, {2, 3}};
    afiseaza(j);

    muta(j, 1, 0);
    muta(j, 0, -2);
    afiseaza(j);
    return 0;
}
```

**Ieșire:**
```
Erou (viata 100) este la (2, 3)
Erou (viata 100) este la (3, 1)
```

Ca să ajungi la coordonata `x` a poziției jucătorului scrii `j.poz.x`: „`x` din poziția lui `j`”. Pentru a-l inițializa ai folosit acolade în acolade: `{"Erou", 100, {2, 3}}`.

### Exemplul 9 — Un tablou de structuri **[Esențial]**

Poți face un tablou obișnuit în care fiecare element este o structură. Parcurgerea seamănă cu tot ce știi despre vectori:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

int main() {
    Elev clasa[4] = {
        {"Ana", 12, 9.5},
        {"Bogdan", 13, 7.0},
        {"Carmen", 12, 10.0},
        {"Dan", 13, 8.5}
    };

    double suma = 0;
    int indiceMax = 0;
    for (int i = 0; i < 4; i++) {
        cout << i + 1 << ". " << clasa[i].nume << " - " << clasa[i].nota << endl;
        suma += clasa[i].nota;
        if (clasa[i].nota > clasa[indiceMax].nota) {
            indiceMax = i;
        }
    }

    cout << "Media clasei: " << suma / 4 << endl;
    cout << "Cel mai bun: " << clasa[indiceMax].nume << endl;
    return 0;
}
```

**Ieșire:**
```
1. Ana - 9.5
2. Bogdan - 7
3. Carmen - 10
4. Dan - 8.5
Media clasei: 8.75
Cel mai bun: Carmen
```

`clasa[i].nume` se citește „numele elevului de pe poziția `i`”. Ordinea contează: întâi alegi elementul (`clasa[i]`), apoi câmpul (`.nume`). În lecția următoare înlocuim tabloul cu un `vector`, ca să nu mai fixăm dimensiunea.

### Exemplul 10 — Structurile nu se compară cu `==`

Dacă scrii `a == b` pentru două structuri, compilatorul dă eroare. Compari tu câmp cu câmp, cel mai bine într-o funcție:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Punct {
    int x;
    int y;
};

bool egale(const Punct &a, const Punct &b) {
    return a.x == b.x && a.y == b.y;
}

int main() {
    Punct p = {3, 4};
    Punct q = {3, 4};
    Punct r = {3, 5};

    cout << "p si q egale? " << egale(p, q) << endl;
    cout << "p si r egale? " << egale(p, r) << endl;
    return 0;
}
```

**Ieșire:**
```
p si q egale? 1
p si r egale? 0
```

---

## 4. Alte structuri și salvarea în fișier

### Exemplul 11 — Produs de magazin

```cpp
#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

struct Produs {
    string nume;
    double pret;
    int stoc;
};

double valoareStoc(const Produs &p) {
    return p.pret * p.stoc;
}

void afiseaza(const Produs &p) {
    cout << left << setw(10) << p.nume << right << setw(8) << p.pret << " lei  x " << p.stoc << endl;
}

int main() {
    Produs lista[3] = {
        {"Caiet", 4.5, 20},
        {"Pix", 2.0, 50},
        {"Rucsac", 120.0, 5}
    };

    cout << fixed << setprecision(2);
    double total = 0;
    for (int i = 0; i < 3; i++) {
        afiseaza(lista[i]);
        total += valoareStoc(lista[i]);
    }
    cout << "Valoarea totala a stocului: " << total << " lei" << endl;
    return 0;
}
```

**Ieșire:**
```
Caiet         4.50 lei  x 20
Pix           2.00 lei  x 50
Rucsac      120.00 lei  x 5
Valoarea totala a stocului: 790.00 lei
```

`setw(10)` rezervă 10 caractere pentru următoarea valoare, iar `left` și `right` aliniază textul la stânga sau la dreapta. Sunt din `<iomanip>` și fac tabelele frumoase.

### Exemplul 12 — Data calendaristică

```cpp
#include <iostream>
using namespace std;

struct Data {
    int zi;
    int luna;
    int an;
};

bool bisect(int an) {
    return (an % 4 == 0 && an % 100 != 0) || an % 400 == 0;
}

int zileInLuna(int luna, int an) {
    if (luna == 2) {
        if (bisect(an)) {
            return 29;
        }
        return 28;
    }
    if (luna == 4 || luna == 6 || luna == 9 || luna == 11) {
        return 30;
    }
    return 31;
}

bool valida(const Data &d) {
    if (d.luna < 1 || d.luna > 12) {
        return false;
    }
    return d.zi >= 1 && d.zi <= zileInLuna(d.luna, d.an);
}

void afiseaza(const Data &d) {
    cout << d.zi << "." << d.luna << "." << d.an;
}

int main() {
    Data lista[4] = {{29, 2, 2024}, {29, 2, 2025}, {31, 4, 2026}, {1, 12, 2026}};

    for (int i = 0; i < 4; i++) {
        afiseaza(lista[i]);
        if (valida(lista[i])) {
            cout << " - data valida" << endl;
        } else {
            cout << " - data INVALIDA" << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
29.2.2024 - data valida
29.2.2025 - data INVALIDA
31.4.2026 - data INVALIDA
1.12.2026 - data valida
```

### Exemplul 13 — Funcții în interiorul structurii

O structură poate conține și **funcții**, care lucrează cu câmpurile ei. Se numesc funcții membre (sau *metode*). Nu mai primesc structura ca parametru, pentru că „o au deja”:

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

struct Cerc {
    double raza;

    double arie() const {
        return 3.14159 * raza * raza;
    }

    double circumferinta() const {
        return 2 * 3.14159 * raza;
    }
};

int main() {
    Cerc c = {3};
    cout << fixed << setprecision(2);
    cout << "Raza: " << c.raza << endl;
    cout << "Aria: " << c.arie() << endl;
    cout << "Circumferinta: " << c.circumferinta() << endl;
    return 0;
}
```

**Ieșire:**
```
Raza: 3.00
Aria: 28.27
Circumferinta: 18.85
```

Se apelează cu punct, ca un câmp, dar cu paranteze: `c.arie()`. Cuvântul `const` după paranteze spune că funcția **doar citește** câmpurile și nu le modifică. Nu ești obligat să folosești funcții membre în Modulul 4 (cele cu parametri funcționează la fel de bine), dar le vei vedea în multe programe și în Modulul 5.

### Exemplul 14 — Scriem o structură în fișier și o citim înapoi **[Esențial]**

Scriem câmpurile pe o linie, separate prin spații (fiecare structură pe o linie), exact ca în lecția 1:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

struct Elev {
    string nume;
    int varsta;
    double nota;
};

void scrie(ofstream &fout, const Elev &e) {
    fout << e.nume << " " << e.varsta << " " << e.nota << endl;
}

int main() {
    Elev a = {"Ana", 12, 9.5};
    Elev b = {"Bogdan", 13, 7.25};

    ofstream fout("fisa.txt");
    scrie(fout, a);
    scrie(fout, b);
    fout.close();
    cout << "Am scris 2 elevi in fisa.txt" << endl;

    ifstream fin("fisa.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide fisa.txt" << endl;
        return 1;
    }
    Elev e;
    while (fin >> e.nume >> e.varsta >> e.nota) {
        cout << "Citit: " << e.nume << ", " << e.varsta << " ani, nota " << e.nota << endl;
    }
    fin.close();
    return 0;
}
```

**Ieșire:**
```
Am scris 2 elevi in fisa.txt
Citit: Ana, 12 ani, nota 9.5
Citit: Bogdan, 13 ani, nota 7.25
```

Observă că un fișier (`ofstream &fout`) poate fi trimis și el într-o funcție, tot prin referință. Funcția `scrie` poate scrie deopotrivă într-un fișier sau, dacă i-ai trimite `cout`, pe ecran, pentru că ambele sunt fluxuri.

---

## 5. Mini-proiect

### Exemplul 15 — Formatul fișierului

Pentru „Fișa elevului” folosim fișierul `fisa_clasa.txt`, cu câte un elev pe linie: nume, vârstă, notă. Programul citește elevii, le adaugă un bonus și apoi salvează clasa actualizată. Mai întâi pregătim fișierul de intrare:

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ofstream fout("fisa_clasa.txt");
    fout << "Ana 12 9.5" << endl;
    fout << "Bogdan 13 7.25" << endl;
    fout << "Carmen 12 10" << endl;
    fout << "Dan 13 5.5" << endl;
    fout.close();
    cout << "Am creat fisa_clasa.txt" << endl;
    return 0;
}
```

**Ieșire:**
```
Am creat fisa_clasa.txt
```

### Exemplul 16 — „Fișa elevului” **[Esențial]**

```cpp
/*
   Program: Fisa elevului
   Scop:    structura Elev, citire din fisier, bonus, statistici, salvare
*/
#include <iostream>
#include <fstream>
#include <string>
#include <iomanip>
using namespace std;

struct Elev {
    string nume;
    int varsta = 0;
    double nota = 0;
};

const int MAX = 30;

int citesteClasa(Elev clasa[]) {
    ifstream fin("fisa_clasa.txt");
    if (!fin.is_open()) {
        return 0;
    }
    int n = 0;
    while (n < MAX && fin >> clasa[n].nume >> clasa[n].varsta >> clasa[n].nota) {
        n++;
    }
    fin.close();
    return n;
}

void afiseaza(const Elev &e) {
    cout << left << setw(8) << e.nume << right << setw(3) << e.varsta << " ani   nota " << e.nota << endl;
}

void afiseazaClasa(const Elev clasa[], int n) {
    for (int i = 0; i < n; i++) {
        afiseaza(clasa[i]);
    }
}

void maresteNota(Elev &e, double bonus) {
    e.nota += bonus;
    if (e.nota > 10) {
        e.nota = 10;
    }
}

int indiceCelMaiBun(const Elev clasa[], int n) {
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (clasa[i].nota > clasa[best].nota) {
            best = i;
        }
    }
    return best;
}

double media(const Elev clasa[], int n) {
    double suma = 0;
    for (int i = 0; i < n; i++) {
        suma += clasa[i].nota;
    }
    return suma / n;
}

void salveaza(const Elev clasa[], int n) {
    ofstream fout("fisa_clasa.txt");
    for (int i = 0; i < n; i++) {
        fout << clasa[i].nume << " " << clasa[i].varsta << " " << clasa[i].nota << endl;
    }
    fout.close();
}

int main() {
    Elev clasa[MAX];
    int n = citesteClasa(clasa);
    if (n == 0) {
        cout << "Nu am gasit elevi in fisa_clasa.txt" << endl;
        return 1;
    }

    cout << fixed << setprecision(2);
    cout << "=== Clasa (" << n << " elevi) ===" << endl;
    afiseazaClasa(clasa, n);
    cout << "Media: " << media(clasa, n) << endl;

    int b = indiceCelMaiBun(clasa, n);
    cout << "Cel mai bun: " << clasa[b].nume << endl;

    cout << endl << "Dam bonus 0.5 elevilor cu nota sub 6..." << endl;
    for (int i = 0; i < n; i++) {
        if (clasa[i].nota < 6) {
            maresteNota(clasa[i], 0.5);
        }
    }
    afiseazaClasa(clasa, n);
    cout << "Media: " << media(clasa, n) << endl;

    salveaza(clasa, n);
    cout << "Clasa a fost salvata." << endl;
    return 0;
}
```

**Ieșire:**
```
=== Clasa (4 elevi) ===
Ana      12 ani   nota 9.50
Bogdan   13 ani   nota 7.25
Carmen   12 ani   nota 10.00
Dan      13 ani   nota 5.50
Media: 8.06
Cel mai bun: Carmen

Dam bonus 0.5 elevilor cu nota sub 6...
Ana      12 ani   nota 9.50
Bogdan   13 ani   nota 7.25
Carmen   12 ani   nota 10.00
Dan      13 ani   nota 6.00
Media: 8.19
Clasa a fost salvata.
```

În proiect ai folosit un tablou `Elev clasa[MAX]` cu dimensiune fixă (`MAX = 30`) și un contor `n`. Seamănă cu ce făceai la vectorii din Modulul 2. În lecția următoare îl înlocuim cu un `vector<Elev>`, iar codul devine mai simplu și fără limită de elevi.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Fișa elevului” (obligatoriu)
Scrie programele din Exemplele 15 și 16. Apoi adaugă o funcție `numarPromovati` (note ≥ 5) și afișează rezultatul.

### Exercițiul B — Cartea
Definește `struct Carte { string titlu; string autor; int an; int pagini; };`. Citește 3 cărți de la tastatură (titlul și autorul scrise fără spații) și afișează-le pe cea mai veche și pe cea cu cele mai multe pagini.

### Exercițiul C — Fracția
Definește `struct Fractie { int numarator; int numitor; };`. Scrie funcțiile `afiseaza`, `simplifica` (folosește `cmmdc`) și `aduna` (care întoarce o `Fractie`).

### Exercițiul D — Dreptunghiul
Definește `struct Dreptunghi { double latime; double inaltime; };` cu funcții membre `arie()` și `perimetru()`. Citește 3 dreptunghiuri și afișează-l pe cel cu aria cea mai mare.

### Exercițiul E — Personajul
Definește `struct Personaj { string nume; int viata = 100; int atac = 10; Punct poz; };` (definește înainte și `Punct`, ca în Exemplul 8). Scrie funcțiile `ranit(Personaj &p, int cat)` (viața nu scade sub 0) și `esteViu(const Personaj &p)`. Simulează trei lovituri.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Structura are `;` după acolada de închidere  
- [ ] Funcțiile care doar citesc primesc `const …&`  
- [ ] Funcțiile care modifică primesc `&`  
- [ ] Câmpurile numerice au valori implicite sau sunt inițializate  
- [ ] Fișierul se numește `Prenume_Nume_M4L3.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Sortează clasa din „Fișa elevului” descrescător după notă (cu sortarea ta, interschimbând structuri întregi)  
- [ ] Adaugă o structură `Adresa` (strada, număr, oraș) în interiorul lui `Elev`  
- [ ] Scrie funcția `Elev celMaiTanar(const Elev clasa[], int n)` care întoarce o structură  
- [ ] Definește `struct Timp { int ore; int minute; };` și funcția `Timp aduna(Timp a, Timp b)`  
- [ ] Citește fișierul și numește elevul „de onoare” (media cea mai mare)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Erori ciudate după definiția structurii | Lipsește `;` după `}` | `struct Elev { … };` |
| `'Elev' was not declared` | Structura e definită după funcția care o folosește | Definește structura la început, înainte de funcții și `main` |
| `Elev.nume = "Ana";` | Ai folosit numele tipului, nu al variabilei | `e.nume = "Ana";` |
| Funcția nu schimbă elevul din `main` | Lipsește `&` | `void f(Elev &e)` |
| Eroare de tipul „cannot assign … const” | Ai modificat un câmp într-o funcție `const Elev &` | Scoate `const` sau nu modifica |
| `a == b` dă eroare pentru structuri | Structurile nu se compară direct | Compară câmpurile (`a.x == b.x && …`) |
| Valori ciudate în câmpuri | Câmp neinițializat | Dă valori implicite în definiție |
| `clasa.nume[i]` | Ordine greșită | `clasa[i].nume` |

---

## Recapitulare pe scurt

- `struct Nume { tip camp1; tip camp2; };` definește un tip nou (nu uita `;`).
- `Nume x;` creează o variabilă; `x.camp` accesează un câmp; `Nume x = {a, b};` inițializează.
- Valori implicite: `int viata = 100;` în definiție.
- O structură se copiază întreagă (`Elev b = a;`), dar nu se compară cu `==`.
- Funcții: `const Elev &e` pentru citire, `Elev &e` pentru modificare, `Elev f()` pentru a întoarce o structură.
- O structură poate conține alte structuri: `j.poz.x`.
- Un tablou de structuri: `clasa[i].nume`.
- Structurile se salvează în fișier câmp cu câmp, o structură pe linie.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Definește `struct Telefon { string marca; double pret; int memorie; };`, citește 3 telefoane și afișează-l pe cel mai ieftin și pe cel cu memoria cea mai mare.  
3. Scrie `struct Complex { double re; double im; };` cu funcțiile `aduna` și `inmulteste`, și testează-le.  
4. Creează un fișier cu cel puțin 5 produse (nume, preț, stoc), citește-le într-un tablou de structuri și afișează valoarea totală a stocului.  
5. **Bonus:** adaugă la „Fișa elevului” un meniu (afișare, bonus, salvare) folosind ce știi din lecția 2.  
6. Salvează tot ca `Tema_M4L3_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 4
Combinăm lecția 2 cu lecția 3: un **`vector` de structuri**. Poți adăuga elevi fără limită, căuta după nume, șterge și sorta, adică obții un catalog complet.
