# LECȚIA 10 — Showcase final
**Modulul 4 · Proiecte și autonomie · 2 ore**  
**Code Kids Play · CodeKids Graduate**

> Ai ajuns la ultima lecție din Modulul 4. Azi facem trei lucruri: **recapitulăm** tot ce ai învățat (un test scurt și 14 exemple-fișă, câte unul pentru fiecare temă), **îți finalizezi proiectul final** și **îl prezinți** colegilor. La final primești diploma **CodeKids Graduate**.  
> Proiect: **„Proiectul final”** · fișier: `Prenume_Nume_M4L10.cpp` (ex. `Ana_Pop_M4L10.cpp`)

---

## Obiectiv
La finalul orei ai un proiect complet, curat și testat, pe care îl poți prezenta în 3 minute, și știi să explici cum funcționează.  
**Minim:** proiectul tău din lecțiile 6–8, curățat (Lecția 9), care rulează fără greșeli și are meniu, fișier și date demo.  
**Ținta orei (Complet):** + prezentarea de 3 minute, o autoevaluare după grilă și un plan scris pentru „ce aș adăuga în continuare”.

## De ce contează
Un proiect terminat și prezentat valorează mai mult decât zece începute. Când explici codul cu voce tare, descoperi ce ai înțeles cu adevărat. În Modulul 5 vei construi un joc RPG pe parcursul a zece lecții, iar tot ce ai folosit aici (fișiere, vectori, structuri, meniuri, cod curat) îți va fi necesar în fiecare lecție.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Test scurt de recapitulare (10 întrebări) |
| 15–40 | Fișe de recapitulare: fișiere, `vector`, `struct` (**Exemplele 1–7**) |
| 40–55 | Fișe de recapitulare: algoritmi și teste (**Exemplele 8–11**) |
| 55–65 | Un proiect mic, complet: „Jurnal de note” (**Exemplele 12–14**) |
| 65–95 | Lucru pe proiectul final: ultimele corecturi, teste, date demo |
| 95–115 | Showcase: fiecare prezintă 3 minute |
| 115–120 | Feedback, diplomă, ce urmează |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **7 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Test de recapitulare

Răspunde în caiet, fără să te uiți în lecții. Apoi deschide răspunsurile și verifică.

1. Ce face `ofstream fout("a.txt", ios::app);`?
2. Ce afișează secvența următoare?
   ```
   vector<int> v = {3, 1, 2};
   v.push_back(5);
   cout << v.size() << v[1];
   ```
3. De ce scriem `const vector<int> &v` în parametrul unei funcții care doar afișează vectorul?
4. Ce afișează secvența următoare?
   ```
   struct Punct { int x = 1; int y = 2; };
   Punct p;
   p.y = 7;
   cout << p.x + p.y;
   ```
5. Utilizatorul scrie `abc` când programul așteaptă un număr și citește cu `cin >> x`. Ce două apeluri aduc `cin` din nou în stare bună?
6. Cum sortezi un `vector<Elev>` descrescător după notă?
7. Ce este greșit în `while (!fin.eof()) { fin >> x; suma += x; }`?
8. Câte comparații face, cel mult, căutarea binară într-un vector sortat cu 1000 de elemente?
9. Ce înseamnă „DRY” și de ce este util?
10. Ce conține `v` după `v.erase(v.begin() + 1);`, dacă la început `v = {10, 20, 30}`?

<details>
<summary>Răspunsuri</summary>

1. Deschide fișierul `a.txt` pentru scriere **la sfârșit**: ce era în fișier rămâne, iar textul nou se adaugă după el (fără `ios::app`, fișierul ar fi golit).
2. `41`: vectorul are 4 elemente (`3, 1, 2, 5`), iar `v[1]` este `1`. Cele două valori se scriu lipite.
3. `&` evită copierea întregului vector (mai rapid), iar `const` garantează că funcția nu îl modifică. Compilatorul te oprește dacă încerci.
4. `8`: `p.x` a rămas `1` (valoarea implicită), iar `p.y` a devenit `7`.
5. `cin.clear();` (șterge starea de eroare) și `cin.ignore(numeric_limits<streamsize>::max(), '\n');` (aruncă restul liniei).
6. Scrii o funcție `bool maiMare(const Elev &a, const Elev &b) { return a.nota > b.nota; }` și apelezi `sort(v.begin(), v.end(), maiMare);`.
7. `eof()` devine adevărat abia **după** o încercare de citire eșuată, deci ultima valoare este adunată de două ori (iar dacă citirea eșuează, se adună o valoare veche). Corect: `while (fin >> x) { suma += x; }`.
8. Cel mult **10** (pentru că 2 înmulțit cu el însuși de 10 ori dă 1024, mai mult de 1000).
9. *Don't Repeat Yourself*, „nu te repeta”: fiecare informație sau bucată de cod apare într-un singur loc. Când vrei să schimbi ceva, îl schimbi o singură dată.
10. `{10, 30}`: elementul de pe poziția 1 (valoarea `20`) a fost șters.

</details>

Numără răspunsurile corecte. **9–10:** excelent. **7–8:** bine, mai citește lecția la care ai greșit. **sub 7:** reia lecțiile respective înainte de a continua cu Modulul 5.

---

## 2. Fișe de recapitulare

Fiecare exemplu de mai jos este mic și rulează singur. Compilează-l, rulează-l și, mai ales, **schimbă-l**: modifică o valoare, adaugă o linie, strică-l intenționat și citește eroarea.

### Exemplul 1 — Fișiere: scriem și citim (Lecția 1) **[Esențial]**

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ofstream fout("numere.txt");
    for (int i = 1; i <= 5; i++) {
        fout << i * i << "\n";
    }
    fout.close();

    ifstream fin("numere.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide fisierul.\n";
        return 1;
    }
    int x;
    int suma = 0;
    while (fin >> x) {
        suma += x;
    }
    cout << "Suma patratelor: " << suma << "\n";
    return 0;
}
```

**Ieșire:**
```
Suma patratelor: 55
```

Reține: verifici mereu `is_open()` și citești cu `while (fin >> x)`, nu cu `eof()`.

### Exemplul 2 — `vector` cu funcții `const &` (Lecția 2) **[Esențial]**

```cpp
#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>
using namespace std;

double media(const vector<int> &v) {
    if (v.empty()) {
        return 0;
    }
    int suma = 0;
    for (int x : v) {
        suma += x;
    }
    return (double)suma / v.size();
}

void afiseaza(const vector<int> &v) {
    for (int x : v) {
        cout << x << " ";
    }
    cout << "\n";
}

int main() {
    vector<int> note = {9, 7, 10, 4, 8};
    note.push_back(6);
    afiseaza(note);
    sort(note.begin(), note.end());
    afiseaza(note);
    cout << fixed << setprecision(2);
    cout << "Media: " << media(note) << "\n";
    cout << "Minim: " << *min_element(note.begin(), note.end()) << "\n";
    cout << "Maxim: " << *max_element(note.begin(), note.end()) << "\n";
    return 0;
}
```

**Ieșire:**
```
9 7 10 4 8 6 
4 6 7 8 9 10 
Media: 7.33
Minim: 4
Maxim: 10
```

### Exemplul 3 — `struct` și sortare cu comparator (Lecțiile 3 și 4) **[Esențial]**

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Elev {
    string nume;
    double nota = 0;
};

bool maiBun(const Elev &a, const Elev &b) {
    if (a.nota != b.nota) {
        return a.nota > b.nota;      // mai intai nota mai mare
    }
    return a.nume < b.nume;          // la egalitate, ordine alfabetica
}

int main() {
    vector<Elev> clasa = {
        {"Dan", 8.5}, {"Ana", 9.5}, {"Carmen", 8.5}, {"Bogdan", 6}
    };
    sort(clasa.begin(), clasa.end(), maiBun);
    for (size_t i = 0; i < clasa.size(); i++) {
        cout << i + 1 << ". " << clasa[i].nume << " - " << clasa[i].nota << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
1. Ana - 9.5
2. Carmen - 8.5
3. Dan - 8.5
4. Bogdan - 6
```

### Exemplul 4 — Citire sigură (Lecția 5) **[Esențial]**

```cpp
#include <iostream>
#include <limits>
using namespace std;

int citesteInt(int minim, int maxim) {
    int x;
    while (true) {
        cout << "Nota (" << minim << "-" << maxim << "): ";
        if (cin >> x) {
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            if (x >= minim && x <= maxim) {
                return x;
            }
            cout << "In afara intervalului.\n";
        } else {
            if (cin.eof()) {
                return minim;
            }
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Nu este un numar.\n";
        }
    }
}

int main() {
    int nota = citesteInt(1, 10);
    cout << "Ai introdus nota " << nota << "\n";
    return 0;
}
```

**Rulare** (tastezi `abc`, `0`, `11`, `7`):
```
Nota (1-10): abc
Nu este un numar.
Nota (1-10): 0
In afara intervalului.
Nota (1-10): 11
In afara intervalului.
Nota (1-10): 7
Ai introdus nota 7
```

### Exemplul 5 — Meniu cu `enum` și `switch` (Lecția 5) **[Esențial]**

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

enum Optiune { IESIRE = 0, ADAUGA = 1, AFISEAZA = 2 };

int main() {
    vector<string> cos;
    int optiune;
    do {
        cout << "\n1. Adauga  2. Afiseaza  0. Iesire\n";
        cout << "Alege: ";
        cin >> optiune;
        switch (optiune) {
            case ADAUGA: {
                string produs;
                cout << "Produs: ";
                cin >> produs;
                cos.push_back(produs);
                break;
            }
            case AFISEAZA:
                if (cos.empty()) {
                    cout << "Cosul este gol.\n";
                }
                for (size_t i = 0; i < cos.size(); i++) {
                    cout << i + 1 << ". " << cos[i] << "\n";
                }
                break;
            case IESIRE:
                cout << "La revedere!\n";
                break;
            default:
                cout << "Optiune necunoscuta.\n";
        }
    } while (optiune != IESIRE);
    return 0;
}
```

**Rulare** (tastezi `2`, `1`, `Paine`, `1`, `Lapte`, `2`, `7`, `0`):
```

1. Adauga  2. Afiseaza  0. Iesire
Alege: 2
Cosul este gol.

1. Adauga  2. Afiseaza  0. Iesire
Alege: 1
Produs: Paine

1. Adauga  2. Afiseaza  0. Iesire
Alege: 1
Produs: Lapte

1. Adauga  2. Afiseaza  0. Iesire
Alege: 2
1. Paine
2. Lapte

1. Adauga  2. Afiseaza  0. Iesire
Alege: 7
Optiune necunoscuta.

1. Adauga  2. Afiseaza  0. Iesire
Alege: 0
La revedere!
```

### Exemplul 6 — Citirea unei linii „nume;nota” (Lecția 1)

Cu `istringstream` poți desface o linie în bucăți, iar cu `getline(…, ';')` citești până la separator:

```cpp
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> linii = {"Ana;9", "Bogdan;6", "Dan;abc", "Carmen;10", "fara separator"};
    int suma = 0;
    int bune = 0;
    for (const string &linie : linii) {
        istringstream in(linie);
        string nume;
        int nota;
        if (getline(in, nume, ';') && (in >> nota)) {
            cout << nume << " -> " << nota << "\n";
            suma += nota;
            bune++;
        } else {
            cout << "Linie invalida: " << linie << "\n";
        }
    }
    cout << "Linii bune: " << bune << ", suma notelor: " << suma << "\n";
    return 0;
}
```

**Ieșire:**
```
Ana -> 9
Bogdan -> 6
Linie invalida: Dan;abc
Carmen -> 10
Linie invalida: fara separator
Linii bune: 3, suma notelor: 25
```

### Exemplul 7 — Ștergere și inserare în `vector` (Lecția 2)

```cpp
#include <iostream>
#include <vector>
using namespace std;

void afiseaza(const vector<int> &v) {
    for (int x : v) {
        cout << x << " ";
    }
    cout << "\n";
}

int main() {
    vector<int> note = {9, 4, 7, 3, 10, 5, 2};
    afiseaza(note);

    size_t i = 0;
    while (i < note.size()) {
        if (note[i] < 5) {
            note.erase(note.begin() + i);   // nu avansam: urmatorul element a venit pe pozitia i
        } else {
            i++;
        }
    }
    afiseaza(note);

    note.insert(note.begin(), 10);          // la inceput
    afiseaza(note);
    return 0;
}
```

**Ieșire:**
```
9 4 7 3 10 5 2 
9 7 10 5 
10 9 7 10 5 
```

Când ștergi dintr-un vector în timp ce îl parcurgi, **nu** mărești indicele după o ștergere: elementul următor a „sărit” pe poziția curentă.

### Exemplul 8 — Amestecare (Fisher–Yates), cu verificare (Lecția 8)

Rezultatul amestecării diferă de la un calculator la altul, deci nu afișăm ordinea, ci **verificăm proprietățile**: nu s-a pierdut și nu s-a dublat nimic.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <random>
using namespace std;

int main() {
    mt19937 gen(42);
    vector<int> v;
    for (int i = 1; i <= 20; i++) {
        v.push_back(i);
    }
    vector<int> original = v;

    for (int i = (int)v.size() - 1; i > 0; i--) {
        uniform_int_distribution<int> alege(0, i);
        int j = alege(gen);
        swap(v[i], v[j]);
    }

    vector<int> sortat = v;
    sort(sortat.begin(), sortat.end());

    cout << "Aceleasi elemente (permutare): " << (sortat == original ? "da" : "nu") << "\n";
    cout << "Numar de elemente: " << v.size() << "\n";
    return 0;
}
```

**Ieșire:**
```
Aceleasi elemente (permutare): da
Numar de elemente: 20
```

### Exemplul 9 — Căutare binară, cu numărarea comparațiilor (Lecția 9)

```cpp
#include <iostream>
#include <vector>
using namespace std;

int cautaBinar(const vector<int> &v, int tinta, int &comparatii) {
    int stanga = 0;
    int dreapta = (int)v.size() - 1;
    comparatii = 0;
    while (stanga <= dreapta) {
        int mijloc = (stanga + dreapta) / 2;
        comparatii++;
        if (v[mijloc] == tinta) {
            return mijloc;
        }
        if (v[mijloc] < tinta) {
            stanga = mijloc + 1;
        } else {
            dreapta = mijloc - 1;
        }
    }
    return -1;
}

int main() {
    vector<int> v;
    for (int i = 0; i < 1000; i++) {
        v.push_back(i * 3);               // 0, 3, 6, ..., 2997
    }
    int tinte[] = {0, 1500, 2997, 1501};
    for (int tinta : tinte) {
        int c;
        int poz = cautaBinar(v, tinta, c);
        cout << "Caut " << tinta << ": pozitie " << poz << ", " << c << " comparatii\n";
    }
    return 0;
}
```

**Ieșire:**
```
Caut 0: pozitie 0, 9 comparatii
Caut 1500: pozitie 500, 9 comparatii
Caut 2997: pozitie 999, 10 comparatii
Caut 1501: pozitie -1, 10 comparatii
```

Chiar și în cel mai rău caz, numărul de comparații rămâne la cel mult 10, ca la întrebarea 8 din test.

### Exemplul 10 — Mini-teste automate (Lecția 9)

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

bool estePrim(int n) {
    if (n < 2) {
        return false;
    }
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

int cmmdc(int a, int b) {
    while (b != 0) {
        int r = a % b;
        a = b;
        b = r;
    }
    return a;
}

int main() {
    verifica("estePrim(0)", !estePrim(0));
    verifica("estePrim(1)", !estePrim(1));
    verifica("estePrim(2)", estePrim(2));
    verifica("estePrim(97)", estePrim(97));
    verifica("estePrim(91)", !estePrim(91));
    verifica("cmmdc(84, 36)", cmmdc(84, 36) == 12);
    verifica("cmmdc(7, 0)", cmmdc(7, 0) == 7);
    verifica("cmmdc(17, 5)", cmmdc(17, 5) == 1);
    cout << "Teste: " << teste << ", picate: " << picate << "\n";
    return 0;
}
```

**Ieșire:**
```
Teste: 8, picate: 0
```

### Exemplul 11 — Structuri imbricate și funcții membre

O structură poate conține un `vector`, iar funcțiile membre `const` o pot citi fără să o modifice:

```cpp
#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
using namespace std;

struct Elev {
    string nume;
    vector<int> note;

    double media() const {
        if (note.empty()) {
            return 0;
        }
        int suma = 0;
        for (int n : note) {
            suma += n;
        }
        return (double)suma / note.size();
    }
};

int main() {
    vector<Elev> clasa = {
        {"Ana", {9, 10, 8}},
        {"Bogdan", {6, 7}},
        {"Carmen", {}}
    };
    cout << fixed << setprecision(2);
    size_t cel = 0;
    for (size_t i = 0; i < clasa.size(); i++) {
        cout << clasa[i].nume << ": " << clasa[i].note.size() << " note, media "
             << clasa[i].media() << "\n";
        if (clasa[i].media() > clasa[cel].media()) {
            cel = i;
        }
    }
    cout << "Cel mai bun: " << clasa[cel].nume << "\n";
    return 0;
}
```

**Ieșire:**
```
Ana: 3 note, media 9.00
Bogdan: 2 note, media 6.50
Carmen: 0 note, media 0.00
Cel mai bun: Ana
```

---

## 3. Un proiect mic, complet: „Jurnal de note”

Mai jos este un program întreg, de dimensiune mică, care folosește aproape tot ce ai învățat în modul: `struct`, `vector`, `enum`, meniu, citire sigură, fișier și funcții scurte. Citește-l cu atenție: așa ar trebui să arate și proiectul tău, dar la o scară mai mare.

### Exemplul 12 — Jurnalul, cu salvare în fișier **[Esențial]**

```cpp
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <limits>
#include <iomanip>
using namespace std;

struct Nota {
    string materie;
    int valoare = 0;
};

enum Optiune { IESIRE = 0, AFISARE = 1, ADAUGARE = 2, MEDIA = 3 };

const string FISIER = "jurnal.txt";

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
    return s;
}

void incarca(vector<Nota> &jurnal) {
    ifstream fin(FISIER);
    if (!fin.is_open()) {
        return;                       // prima rulare: nu exista fisier
    }
    string linie;
    while (getline(fin, linie)) {
        istringstream in(linie);
        Nota n;
        if (getline(in, n.materie, ';') && (in >> n.valoare)) {
            jurnal.push_back(n);
        }
    }
}

void salveaza(const vector<Nota> &jurnal) {
    ofstream fout(FISIER);
    for (const Nota &n : jurnal) {
        fout << n.materie << ";" << n.valoare << "\n";
    }
}

void afiseaza(const vector<Nota> &jurnal) {
    if (jurnal.empty()) {
        cout << "Jurnalul este gol.\n";
        return;
    }
    for (size_t i = 0; i < jurnal.size(); i++) {
        cout << i + 1 << ". " << jurnal[i].materie << " - " << jurnal[i].valoare << "\n";
    }
}

double media(const vector<Nota> &jurnal) {
    if (jurnal.empty()) {
        return 0;
    }
    int suma = 0;
    for (const Nota &n : jurnal) {
        suma += n.valoare;
    }
    return (double)suma / jurnal.size();
}

int main() {
    vector<Nota> jurnal;
    incarca(jurnal);

    int optiune;
    do {
        cout << "\n1. Afisare  2. Adaugare  3. Media  0. Iesire\n";
        optiune = citesteInt("Alege: ", 0, 3);
        switch (optiune) {
            case AFISARE:
                afiseaza(jurnal);
                break;
            case ADAUGARE: {
                Nota n;
                n.materie = citesteText("Materia: ");
                n.valoare = citesteInt("Nota (1-10): ", 1, 10);
                jurnal.push_back(n);
                break;
            }
            case MEDIA:
                cout << fixed << setprecision(2) << "Media: " << media(jurnal) << "\n";
                break;
            default:
                break;
        }
    } while (optiune != IESIRE);

    salveaza(jurnal);
    cout << "Am salvat " << jurnal.size() << " note.\n";
    return 0;
}
```

**Rulare** (tastezi `1`, `2`, `Informatica`, `10`, `2`, `Matematica`, `8`, `1`, `3`, `0`):
```

1. Afisare  2. Adaugare  3. Media  0. Iesire
Alege: 1
Jurnalul este gol.

1. Afisare  2. Adaugare  3. Media  0. Iesire
Alege: 2
Materia: Informatica
Nota (1-10): 10

1. Afisare  2. Adaugare  3. Media  0. Iesire
Alege: 2
Materia: Matematica
Nota (1-10): 8

1. Afisare  2. Adaugare  3. Media  0. Iesire
Alege: 1
1. Informatica - 10
2. Matematica - 8

1. Afisare  2. Adaugare  3. Media  0. Iesire
Alege: 3
Media: 9.00

1. Afisare  2. Adaugare  3. Media  0. Iesire
Alege: 0
Am salvat 2 note.
```

Observă cum este organizat programul: fiecare funcție are un singur rol, `main` doar coordonează, iar datele stau într-un singur loc (vectorul `jurnal`). Programul încarcă fișierul la pornire și îl salvează la ieșire, deci notele „supraviețuiesc” între rulări.

### Exemplul 13 — Ce a rămas în fișier? **[Esențial]**

După rularea Exemplului 12, fișierul `jurnal.txt` există. Putem să-l citim cu un program separat:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    ifstream fin("jurnal.txt");
    if (!fin.is_open()) {
        cout << "Fisierul jurnal.txt nu exista inca. Ruleaza mai intai Exemplul 12.\n";
        return 1;
    }
    string linie;
    int nr = 0;
    while (getline(fin, linie)) {
        nr++;
        cout << nr << ": " << linie << "\n";
    }
    cout << "Total linii: " << nr << "\n";
    return 0;
}
```

**Ieșire:**
```
1: Informatica;10
2: Matematica;8
Total linii: 2
```

La următoarea rulare a jurnalului, aceste două note vor fi încărcate automat.

### Exemplul 14 — Statistici despre un fișier text

Un ultim exemplu de recapitulare: numărăm liniile, cuvintele și caracterele dintr-un fișier, ca la comanda `wc` din terminal.

```cpp
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    ofstream fout("text.txt");
    fout << "C++ este un limbaj puternic\n";
    fout << "\n";
    fout << "Programatorii scriu cod clar\n";
    fout.close();

    ifstream fin("text.txt");
    string linie;
    int linii = 0;
    int cuvinte = 0;
    int caractere = 0;
    int goale = 0;
    while (getline(fin, linie)) {
        linii++;
        caractere += (int)linie.size();
        if (linie.empty()) {
            goale++;
        }
        istringstream in(linie);
        string cuvant;
        while (in >> cuvant) {
            cuvinte++;
        }
    }
    cout << "Linii: " << linii << " (goale: " << goale << ")\n";
    cout << "Cuvinte: " << cuvinte << "\n";
    cout << "Caractere (fara Enter): " << caractere << "\n";
    return 0;
}
```

**Ieșire:**
```
Linii: 3 (goale: 1)
Cuvinte: 9
Caractere (fara Enter): 55
```

---

## 4. Proiectul final

### Ce poți alege
- **Varianta 1:** unul dintre proiectele din Modulul 4 (**joc**, **magazin/inventar** sau **quiz**), extins cu cel puțin **două** funcționalități noi.
- **Varianta 2:** o idee a ta, aprobată de profesor la începutul orei.

Idei dacă vrei ceva nou (fiecare se poate face cu ce ai învățat):

| Idee | Ce folosești |
|------|--------------|
| Agenda de contacte (căutare, ștergere, sortare) | `struct`, `vector`, fișier, `sort` |
| Jurnalul de cheltuieli, cu totaluri pe categorii | `struct`, `enum`, fișier |
| Spânzurătoarea (cuvinte dintr-un fișier) | `string`, fișier, amestecare |
| Biblioteca școlii (împrumuturi, returnări) | `struct` imbricate, `vector`, fișier |
| Planificatorul de sarcini cu priorități | `enum`, sortare cu comparator |
| Calculator de buget cu istoric | citire sigură, fișier, statistici |

### Cerințe obligatorii
1. Meniu clar, cu `enum` și `switch`, care nu se blochează la date greșite (citire sigură).
2. Cel puțin o `struct` și un `vector` de structuri.
3. Salvare și încărcare din fișier (datele rămân între rulări).
4. Funcții scurte, cu nume clare, fără numere magice și fără cod repetat.
5. Un mod **demo** (date de exemplu) și cel puțin **10 teste** automate pentru funcțiile importante.
6. Antet de fișier și comentarii care explică **de ce**.
7. Compilare fără avertismente cu `-Wall -Wextra`.

### Grila de evaluare

| Criteriu | Puncte | Ce urmărim |
|----------|--------|------------|
| Funcționează | 30 | Programul pornește, nu se blochează și nu dă rezultate greșite |
| Cod curat | 20 | Nume, funcții scurte, fără repetiții, fără numere magice |
| Fișiere și structuri | 15 | Salvare și încărcare corectă; `struct` și `vector` folosite bine |
| Robustețe | 15 | Date greșite, fișier lipsă sau gol, cazuri limită |
| Teste și demo | 10 | Cel puțin 10 teste; mod demo |
| Prezentare | 10 | Clară, în 3 minute, explică o idee din cod |
| **Total** | **100** | |

**Calificative:** 90–100 excelent, 75–89 foarte bine, 60–74 bine, sub 60 de refăcut cu ajutorul profesorului.

### Lista de verificare înainte de prezentare
- [ ] Am compilat de la zero și nu am avertismente  
- [ ] Am rulat programul cu date greșite (litere în loc de numere, valori negative, linie goală) și nu s-a stricat  
- [ ] Am șters fișierele de date și programul pornește corect (prima rulare)  
- [ ] Opțiunea demo încarcă cel puțin 5 elemente  
- [ ] Am repetat prezentarea cu cronometrul: sub 3 minute  
- [ ] Am un plan B (capturi de ecran sau fișierul de ieșire salvat) dacă ceva nu merge  

---

## 5. Showcase

### Cum decurge
1. Fiecare elev prezintă **3 minute**, apoi răspunde la o întrebare.
2. Folosește cele 5 părți din Lecția 9: **problema**, **demonstrația**, **o idee din cod**, **ce a fost greu**, **ce urmează**.
3. Colegii completează o fișă de feedback: o parte care le-a plăcut, o întrebare și o sugestie.

### Fișă de feedback (pentru colegi)

| Proiect: ______________ | Autor: ______________ |
|-------------------------|------------------------|
| Mi-a plăcut: | |
| O întrebare: | |
| O sugestie: | |

### Când asculți
- Fii atent la ce **funcționează** înainte de a căuta greșeli.
- Sugestiile încep cu „Poate ai putea…”, nu cu „Ai greșit…”.
- Dacă ai o întrebare despre cod, întreabă „de ce ai ales…?”, ca să înveți și tu o variantă nouă.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Proiectul final (obligatoriu)
Finalizează proiectul după cerințele și grila din secțiunea 4. Salvează-l ca `Prenume_Nume_M4L10.cpp`.

### Exercițiul B — Autoevaluare
Completează grila de mai sus cu punctajul pe care crezi că îl meriți, la fiecare criteriu, și scrie o propoziție care justifică fiecare punctaj. Compară apoi cu nota dată de profesor.

### Exercițiul C — Planul „ce urmează”
Scrie la sfârșitul fișierului, într-un comentariu, trei îmbunătățiri pe care le-ai face dacă ai mai avea o săptămână.

**Gata când:**
- [ ] Proiectul respectă cele 7 cerințe obligatorii  
- [ ] Ai prezentat în maximum 3 minute  
- [ ] Ai completat autoevaluarea  
- [ ] Ai dat feedback la cel puțin două proiecte ale colegilor  
- [ ] Fișierul se numește `Prenume_Nume_M4L10.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă proiectului o opțiune de **export** al datelor într-un fișier text frumos formatat, pe care îl poți tipări  
- [ ] Adaugă o parolă simplă la pornire (citită dintr-un fișier de configurare)  
- [ ] Scrie un `README.txt` cu instrucțiuni de compilare și de utilizare  
- [ ] Citește despre `class` în C++ și încearcă să transformi o `struct` cu funcții membre într-o `class`  
- [ ] Gândește-te ce joc RPG ai vrea să construiești în Modulul 5 și desenează pe hârtie harta și personajele  

---

## Greșeli frecvente (recapitulare)

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Ultima valoare din fișier apare de două ori | `while (!fin.eof())` | `while (fin >> x)` sau `while (getline(fin, linie))` |
| Programul se blochează la introducerea unei litere | Nu ai tratat starea de eroare a `cin` | `cin.clear()` și `cin.ignore(…)` |
| `getline` sare peste o linie după `cin >> x` | A rămas Enter-ul în buffer | `cin.ignore(numeric_limits<streamsize>::max(), '\n');` |
| Datele dispar la următoarea rulare | Nu salvezi sau nu încarci | `incarca` la pornire, `salveaza` la ieșire |
| Elemente sărite la ștergerea din `vector` | Ai mărit indicele după `erase` | Mărești indicele doar dacă nu ai șters |
| Fișierul de date lipsește și programul se oprește | Nu verifici `is_open()` | Tratezi prima rulare ca fiind normală |
| Proiect care merge doar pe calculatorul tău | Căi de fișier scrise de mână | Folosește nume relative, ca `"date.txt"` |

---

## Recapitulare pe scurt — Modulul 4

- **Fișiere:** `ofstream`, `ifstream`, `is_open`, `ios::app`, `while (fin >> x)`, `getline`, `istringstream`.
- **`vector`:** `push_back`, `erase`, `insert`, `sort`, parametri `const vector<T> &`.
- **`struct`:** câmpuri cu valori implicite, structuri imbricate, funcții membre `const`, `vector` de structuri.
- **Meniuri:** `enum`, `switch`, buclă `do … while`, citire sigură.
- **Proiecte:** joc, magazin/inventar, quiz, cu salvare în fișier.
- **Cod bun:** nume clare, funcții scurte, fără repetiții, teste, comentarii „de ce”, măsurare înainte de optimizare.
- **Prezentare:** problemă, demonstrație, o idee din cod, ce a fost greu, ce urmează.

---

## Temă
1. Păstrează proiectul final și continuă să-l îmbunătățești în timpul liber: fiecare funcționalitate nouă te face mai bun.  
2. Rezolvă din nou, fără să te uiți, întrebările din test la care ai greșit.  
3. Alege-ți un nume și un decor pentru jocul din Modulul 5 și scrie o jumătate de pagină despre el: cine este eroul, ce monștri întâlnește, ce obiecte poate găsi.  
4. Salvează tot ca `Tema_M4L10_Prenume_Nume.cpp`.

---

## 🎓 Diploma CodeKids Graduate

Felicitări! Ai terminat **Modulul 4 — Proiecte și autonomie**. În douăzeci de ore ai învățat să lucrezi cu fișiere, vectori și structuri, să construiești meniuri, să scrii trei proiecte complete, să-ți curățești și să-ți testezi codul și să-ți prezinți munca. Ai primit titlul de **CodeKids Graduate**.

Ești pregătit pentru ultima aventură.

## Ce urmează — Modulul 5
**Proiect RPG în consolă (RPG Creator).** Vei construi, pas cu pas, un joc de rol: personaje, hartă, lupte, obiecte, salvarea jocului. La final ai un joc complet, creat de tine, pe care îl vei putea arăta oricui.
