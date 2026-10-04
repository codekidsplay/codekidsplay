# LECȚIA 2 — `vector` din STL: lista care crește singură
**Modulul 4 · Proiecte și autonomie · 2 ore**  
**Code Kids Play · CodeKids Graduate**

> În Modulul 2 ai lucrat cu vectori de felul `int v[10]`: trebuie să alegi dinainte dimensiunea, iar dacă primești mai multe date, nu mai ai loc. Azi cunoști varianta modernă din biblioteca standard C++ (STL): `vector`. Este o listă care **crește singură** când adaugi elemente, își cunoaște lungimea și se poate da ușor funcțiilor.  
> Proiect: **„Lista de note”** · fișier: `Prenume_Nume_M4L2.cpp` (ex. `Ana_Pop_M4L2.cpp`)

---

## Obiectiv
La finalul orei declari un `vector`, adaugi și ștergi elemente (`push_back`, `pop_back`, `erase`, `insert`), îl parcurgi cu `for` obișnuit și cu `for` pe elemente, folosești `size()`, `empty()`, `front()`, `back()`, citești un număr necunoscut de valori, trimiți vectorul în funcții și îl salvezi în fișier.  
**Minim:** `push_back`, `size()` și parcurgerea unui `vector` cu `for`.  
**Ținta orei (Complet):** + funcții care primesc `vector` prin referință și proiectul „Lista de note”, cu meniu și salvare în fișier.

## De ce contează
Aproape niciodată nu știi dinainte câte date vei avea: câți elevi sunt în clasă, câte obiecte are jucătorul în rucsac, câte rânduri are un fișier. Cu `vector` nu mai ghicești dimensiunea. Este cea mai folosită structură de date din C++ și apare în aproape orice proiect real. Iar în Modulul 5 (jocul RPG) va ține inventarul eroului.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: vectori `int v[10]`, fișiere |
| 10–35 | Primul `vector`, `push_back`, `size`, parcurgere (**Exemplele 1–3**) |
| 35–55 | Număr necunoscut de valori, citire din fișier (**Exemplele 4–6**) |
| 55–75 | `pop_back`, `erase`, `insert`, `clear` (**Exemplele 7–9**) |
| 75–95 | Vectori de `string` și `double`, sortare (**Exemplele 10–11**) |
| 95–115 | Vectorul în funcții, proiect (**Exemplele 12–16**) |
| 115–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Primul `vector`

Pentru a folosi `vector` adaugi biblioteca `<vector>`. Când îl declari, spui în paranteze unghiulare **ce fel de valori** va ține:

```
vector<int> v;       // un vector de numere intregi, la inceput gol
vector<string> nume; // un vector de texte
vector<double> p;    // un vector de numere cu zecimale
```

### Exemplul 1 — `push_back` și `size` **[Esențial]**

`push_back(x)` adaugă valoarea `x` **la sfârșitul** vectorului, iar `size()` întoarce câte elemente are acum.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    cout << "La inceput: " << v.size() << " elemente" << endl;

    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    cout << "Dupa 3 adaugari: " << v.size() << " elemente" << endl;

    cout << "Primul element: " << v[0] << endl;
    cout << "Al treilea element: " << v[2] << endl;

    int n = v.size();
    for (int i = 0; i < n; i++) {
        cout << "v[" << i << "] = " << v[i] << endl;
    }
    return 0;
}
```

**Ieșire:**
```
La inceput: 0 elemente
Dupa 3 adaugari: 3 elemente
Primul element: 10
Al treilea element: 30
v[0] = 10
v[1] = 20
v[2] = 30
```

Elementele se numerotează de la `0`, exact ca la vectorii obișnuiți, și le accesezi cu `v[i]`. Diferența mare: **nu ai spus nicăieri câte elemente va avea**. Vectorul s-a mărit singur la fiecare `push_back`.

> **Observă:** am scris `int n = v.size();` și am folosit `n` în buclă. `size()` întoarce un număr fără semn (tip special, `size_t`), iar dacă l-ai compara direct cu un `int i`, compilatorul ar da un avertisment. Cu `int n = v.size();` evităm problema.

### Exemplul 2 — Valori inițiale

Poți da valorile direct la declarare, sau poți crea un vector cu `n` copii ale aceleiași valori:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> note = {9, 7, 10, 8};
    vector<int> zerouri(5, 0);   // 5 elemente, toate 0
    vector<double> preturi = {2.5, 10, 7.25};

    cout << "note:";
    for (int i = 0; i < (int)note.size(); i++) {
        cout << " " << note[i];
    }
    cout << endl;

    cout << "zerouri:";
    for (int i = 0; i < (int)zerouri.size(); i++) {
        cout << " " << zerouri[i];
    }
    cout << endl;

    cout << "preturi:";
    for (int i = 0; i < (int)preturi.size(); i++) {
        cout << " " << preturi[i];
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
note: 9 7 10 8
zerouri: 0 0 0 0 0
preturi: 2.5 10 7.25
```

`(int)note.size()` transformă lungimea în `int` chiar în condiție; este alternativa la `int n = …`. Poți alege oricare dintre cele două variante, cu condiția să nu compari direct un `int` cu `size()`.

### Exemplul 3 — Parcurgerea „pe elemente” **[Esențial]**

Dacă nu ai nevoie de poziția `i`, ci doar de valori, există o formă mai scurtă a lui `for`:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {4, 8, 15, 16, 23, 42};

    // 1. Citim fiecare element
    int suma = 0;
    for (int x : v) {
        suma += x;
    }
    cout << "Suma: " << suma << endl;

    // 2. Modificam elementele: scriem & dupa tip
    for (int &x : v) {
        x = x * 2;
    }

    cout << "Dupa dublare:";
    for (int x : v) {
        cout << " " << x;
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Suma: 108
Dupa dublare: 8 16 30 32 46 84
```

`for (int x : v)` se citește „pentru fiecare `x` din `v`”. La fiecare pas, `x` este o **copie** a elementului curent, deci dacă îl modifici, vectorul rămâne neschimbat. Dacă vrei să modifici chiar elementele vectorului, scrii `&` după tip: `for (int &x : v)`. Atunci `x` este chiar elementul, nu o copie (aceeași idee ca la funcțiile cu referințe din Modulul 3).

---

## 2. Un număr necunoscut de valori

### Exemplul 4 — Citim note până la `0` **[Esențial]**

Aici se vede avantajul vectorului: citim note până când utilizatorul scrie `0`, fără să știm dinainte câte vor fi.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> note;
    int nota;

    cout << "Scrie notele (0 = gata): ";
    cin >> nota;
    while (nota != 0) {
        note.push_back(nota);
        cin >> nota;
    }

    if (note.empty()) {
        cout << "Nu ai introdus nicio nota." << endl;
        return 0;
    }

    int suma = 0;
    for (int x : note) {
        suma += x;
    }
    cout << "Ai introdus " << note.size() << " note." << endl;
    cout << "Media: " << (double)suma / note.size() << endl;
    return 0;
}
```

**Rulare** (tastezi `9 10 8 7 0`):
```
Scrie notele (0 = gata): 9 10 8 7 0
Ai introdus 4 note.
Media: 8.5
```

`note.empty()` este `true` când vectorul nu are niciun element (este mai clar decât `note.size() == 0`). Îl verificăm înainte să împărțim la numărul de note.

### Exemplul 5 — Citim un fișier într-un vector **[Esențial]**

Creăm întâi un fișier cu note, apoi îl citim și păstrăm toate valorile în `vector`. Acum poți face ce nu se putea în lecția trecută: să compari fiecare notă cu media.

```cpp
#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

int main() {
    // pregatim fisierul
    ofstream fout("note.txt");
    fout << "9 10 8 7 10 6" << endl;
    fout.close();

    // il citim in vector
    ifstream fin("note.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide note.txt" << endl;
        return 1;
    }
    vector<int> note;
    int x;
    while (fin >> x) {
        note.push_back(x);
    }
    fin.close();

    int suma = 0;
    for (int nota : note) {
        suma += nota;
    }
    double media = (double)suma / note.size();
    cout << "Am citit " << note.size() << " note, media " << media << endl;

    int peste = 0;
    for (int nota : note) {
        if (nota > media) {
            peste++;
        }
    }
    cout << "Note peste medie: " << peste << endl;
    return 0;
}
```

**Ieșire:**
```
Am citit 6 note, media 8.33333
Note peste medie: 3
```

### Exemplul 6 — Accesul în afara vectorului

Cea mai periculoasă greșeală cu vectori: `v[10]` când vectorul are doar 3 elemente. C++ **nu te oprește**: citește o zonă de memorie care nu e a ta și programul poate afișa valori ciudate sau se poate bloca. Soluția este să verifici poziția înainte:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {5, 6, 7};
    int n = v.size();

    int pozitii[3] = {1, 5, -1};
    for (int k = 0; k < 3; k++) {
        int i = pozitii[k];
        if (i >= 0 && i < n) {
            cout << "v[" << i << "] = " << v[i] << endl;
        } else {
            cout << "Pozitia " << i << " nu exista (avem " << n << " elemente)" << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
v[1] = 6
Pozitia 5 nu exista (avem 3 elemente)
Pozitia -1 nu exista (avem 3 elemente)
```

Pozițiile valide sunt de la `0` până la `size() - 1`. Mai există și `v.at(i)`, care în loc să citească memoria străină **oprește programul cu o eroare clară**. Este mai sigură la început, dar verificarea manuală (`i >= 0 && i < n`) rămâne cea mai bună obișnuință.

---

## 3. Ștergere și inserare

| Instrucțiune | Ce face |
|--------------|---------|
| `v.pop_back();` | șterge **ultimul** element |
| `v.back()` | valoarea ultimului element |
| `v.front()` | valoarea primului element |
| `v.erase(v.begin() + i);` | șterge elementul de pe poziția `i` |
| `v.insert(v.begin() + i, x);` | inserează `x` pe poziția `i` |
| `v.clear();` | golește tot vectorul |
| `v.empty()` | `true` dacă nu are elemente |

`v.begin()` este „începutul” vectorului. `v.begin() + 2` înseamnă „la poziția 2”.

### Exemplul 7 — `pop_back`, `front`, `back`, `clear`

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    cout << "Primul: " << v.front() << ", ultimul: " << v.back() << endl;

    v.pop_back();
    v.pop_back();
    cout << "Dupa 2 pop_back: " << v.size() << " elemente, ultimul = " << v.back() << endl;

    v.clear();
    cout << "Dupa clear: " << v.size() << " elemente" << endl;
    if (v.empty()) {
        cout << "Vectorul este gol." << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Primul: 1, ultimul: 5
Dupa 2 pop_back: 3 elemente, ultimul = 3
Dupa clear: 0 elemente
Vectorul este gol.
```

Atenție: `front()`, `back()` și `pop_back()` pe un vector **gol** sunt greșeli grave. Verifică `empty()` înainte.

### Exemplul 8 — `erase` și `insert` **[Esențial]**

```cpp
#include <iostream>
#include <vector>
using namespace std;

void afiseaza(vector<int> &v) {
    for (int x : v) {
        cout << x << " ";
    }
    cout << endl;
}

int main() {
    vector<int> v = {10, 20, 30, 40, 50};
    afiseaza(v);

    v.erase(v.begin() + 1);      // stergem elementul de pe pozitia 1 (20)
    afiseaza(v);

    v.insert(v.begin() + 2, 99); // inseram 99 pe pozitia 2
    afiseaza(v);

    v.insert(v.begin(), 5);      // inseram 5 la inceput
    afiseaza(v);
    return 0;
}
```

**Ieșire:**
```
10 20 30 40 50 
10 30 40 50 
10 30 99 40 50 
5 10 30 99 40 50 
```

După `erase`, elementele din dreapta se mută cu o poziție spre stânga, iar după `insert` se mută spre dreapta. Vectorul rămâne mereu „compact”, fără goluri.

### Exemplul 9 — Eliminăm toate valorile de un anumit fel

Vrei să ștergi toate notele sub 5. Ai grijă la o capcană: dacă ștergi elementul de pe poziția `i`, următorul element ajunge **tot pe poziția `i`**, deci nu mai avansezi:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> note = {4, 9, 3, 10, 2, 8};

    int i = 0;
    while (i < (int)note.size()) {
        if (note[i] < 5) {
            note.erase(note.begin() + i);
        } else {
            i++;
        }
    }

    cout << "Note ramase:";
    for (int x : note) {
        cout << " " << x;
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Note ramase: 9 10 8
```

Dacă ai fi scris un `for` cu `i++` la fiecare pas, după fiecare ștergere ai fi sărit peste un element. Soluția cu `while` avansează **doar** când nu ștergi.

---

## 4. Alte tipuri de vectori

### Exemplul 10 — `vector<string>` și `vector<double>`

Tipul dintre `< >` poate fi aproape orice. Vector de nume și vector de prețuri:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> prieteni;
    prieteni.push_back("Ana");
    prieteni.push_back("Bogdan");
    prieteni.push_back("Carmen");

    int n = prieteni.size();
    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". " << prieteni[i] << " (" << prieteni[i].length() << " litere)" << endl;
    }

    vector<double> preturi = {12.5, 3.2, 8, 20.75};
    double total = 0;
    for (double p : preturi) {
        total += p;
    }
    cout << "Total: " << total << " lei" << endl;

    // cautam un nume
    string cautat = "Bogdan";
    bool gasit = false;
    for (int i = 0; i < n; i++) {
        if (prieteni[i] == cautat) {
            cout << cautat << " este pe pozitia " << i << endl;
            gasit = true;
        }
    }
    if (!gasit) {
        cout << cautat << " nu este in lista" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
1. Ana (3 litere)
2. Bogdan (6 litere)
3. Carmen (6 litere)
Total: 44.45 lei
Bogdan este pe pozitia 1
```

### Exemplul 11 — Sortare, inversare, minim și maxim **[Esențial]**

Biblioteca `<algorithm>` conține instrumente gata făcute care lucrează cu `begin()` și `end()` (sfârșitul vectorului):

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void afiseaza(vector<int> &v) {
    for (int x : v) {
        cout << x << " ";
    }
    cout << endl;
}

int main() {
    vector<int> v = {29, 4, 17, 8, 42, 1};
    cout << "Initial:       ";
    afiseaza(v);

    sort(v.begin(), v.end());
    cout << "Crescator:     ";
    afiseaza(v);

    reverse(v.begin(), v.end());
    cout << "Descrescator:  ";
    afiseaza(v);

    cout << "Minim: " << *min_element(v.begin(), v.end()) << endl;
    cout << "Maxim: " << *max_element(v.begin(), v.end()) << endl;
    cout << "De cate ori apare 8: " << count(v.begin(), v.end(), 8) << endl;
    return 0;
}
```

**Ieșire:**
```
Initial:       29 4 17 8 42 1 
Crescator:     1 4 8 17 29 42 
Descrescator:  42 29 17 8 4 1 
Minim: 1
Maxim: 42
De cate ori apare 8: 1
```

- `sort(v.begin(), v.end())` sortează crescător tot vectorul;
- `reverse(...)` îi inversează ordinea (iar după `sort` obții ordinea descrescătoare);
- `min_element` și `max_element` întorc o **poziție**; steluța `*` din față îți dă valoarea de acolo;
- `count(…, x)` numără de câte ori apare `x`.

La teme, când ți se cere să arăți că ai înțeles algoritmul, scrie-l singur cu bucle. În proiecte, folosește aceste instrumente: sunt corecte și rapide.

---

## 5. Vectorul în funcții

La vectorii obișnuiți, funcția primea `int v[]` și lungimea separat. Cu `vector`, lungimea vine odată cu el (`v.size()`), deci un singur parametru este de ajuns.

Pentru că un `vector` poate fi foarte mare, nu vrem ca funcția să-l **copieze**. Folosim o **referință** (`&`):

| Parametru | Ce înseamnă |
|-----------|-------------|
| `vector<int> v` | primești o **copie** (lent, iar modificările nu se văd afară) |
| `vector<int> &v` | primești **chiar vectorul** (funcția îl poate modifica) |
| `const vector<int> &v` | primești chiar vectorul, dar **nu ai voie să-l modifici** (pentru funcții care doar citesc) |

Regula practică: dacă funcția doar citește vectorul, scrie `const vector<int> &v`. Dacă trebuie să-l modifice, scrie `vector<int> &v`.

### Exemplul 12 — Funcții cu `vector` **[Esențial]**

```cpp
#include <iostream>
#include <vector>
using namespace std;

void afiseaza(const vector<int> &v) {
    for (int x : v) {
        cout << x << " ";
    }
    cout << endl;
}

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

void adaugaBonus(vector<int> &v, int bonus) {
    for (int &x : v) {
        x += bonus;
    }
}

int main() {
    vector<int> puncte = {50, 60, 70, 80};
    cout << "Initial: ";
    afiseaza(puncte);
    cout << "Media: " << media(puncte) << endl;

    adaugaBonus(puncte, 5);
    cout << "Dupa bonus: ";
    afiseaza(puncte);
    cout << "Media: " << media(puncte) << endl;
    return 0;
}
```

**Ieșire:**
```
Initial: 50 60 70 80 
Media: 65
Dupa bonus: 55 65 75 85 
Media: 70
```

`afiseaza` și `media` doar citesc, deci primesc `const vector<int> &`. `adaugaBonus` modifică elementele, deci primește `vector<int> &`. Dacă ai încerca să modifici vectorul într-o funcție `const`, compilatorul ți-ar da eroare, ceea ce te ajută să nu strici datele din greșeală.

### Exemplul 13 — O funcție care întoarce un vector

O funcție poate întoarce un `vector` întreg, ca rezultat:

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> divizori(int n) {
    vector<int> rez;
    for (int d = 1; d <= n; d++) {
        if (n % d == 0) {
            rez.push_back(d);
        }
    }
    return rez;
}

int main() {
    vector<int> d = divizori(36);
    cout << "36 are " << d.size() << " divizori:";
    for (int x : d) {
        cout << " " << x;
    }
    cout << endl;

    vector<int> d2 = divizori(13);
    cout << "13 are " << d2.size() << " divizori:";
    for (int x : d2) {
        cout << " " << x;
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
36 are 9 divizori: 1 2 3 4 6 9 12 18 36
13 are 2 divizori: 1 13
```

La funcțiile din Modulul 3 un rezultat putea fi doar o singură valoare (un `int`, un `bool`). Cu `vector` poți întoarce o **listă întreagă**. Vezi cât de comod este: nu trebuie să știi dinainte câți divizori vor fi.

### Exemplul 14 — Filtrare: construim un vector nou

Din numerele de la 1 la 20 păstrăm doar pe cele divizibile cu 3, într-un alt vector:

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> multipliDe(const vector<int> &sursa, int k) {
    vector<int> rez;
    for (int x : sursa) {
        if (x % k == 0) {
            rez.push_back(x);
        }
    }
    return rez;
}

int main() {
    vector<int> toate;
    for (int i = 1; i <= 20; i++) {
        toate.push_back(i);
    }

    vector<int> m3 = multipliDe(toate, 3);
    cout << "Multipli de 3 pana la 20:";
    for (int x : m3) {
        cout << " " << x;
    }
    cout << endl;
    cout << "Sunt " << m3.size() << " numere, iar vectorul initial are tot " << toate.size() << " elemente." << endl;
    return 0;
}
```

**Ieșire:**
```
Multipli de 3 pana la 20: 3 6 9 12 15 18
Sunt 6 numere, iar vectorul initial are tot 20 elemente.
```

---

## 6. Salvarea unui vector într-un fișier

### Exemplul 15 — Salvăm și încărcăm un vector

Combinăm lecția 1 cu lecția 2: scriem un vector într-un fișier, apoi îl citim într-un alt vector. Prima valoare din fișier este numărul de elemente, ca să știm ce urmează.

```cpp
#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

void salveaza(const vector<int> &v, const char *fisier) {
    ofstream fout(fisier);
    fout << v.size() << endl;
    for (int x : v) {
        fout << x << endl;
    }
    fout.close();
}

vector<int> incarca(const char *fisier) {
    vector<int> v;
    ifstream fin(fisier);
    if (!fin.is_open()) {
        return v;   // vector gol daca fisierul lipseste
    }
    int n;
    fin >> n;
    for (int i = 0; i < n; i++) {
        int x;
        fin >> x;
        v.push_back(x);
    }
    fin.close();
    return v;
}

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    salveaza(a, "vector.txt");
    cout << "Am salvat " << a.size() << " numere." << endl;

    vector<int> b = incarca("vector.txt");
    cout << "Am incarcat " << b.size() << " numere:";
    for (int x : b) {
        cout << " " << x;
    }
    cout << endl;

    vector<int> c = incarca("nu_exista.txt");
    cout << "Din fisierul inexistent: " << c.size() << " numere." << endl;
    return 0;
}
```

**Ieșire:**
```
Am salvat 8 numere.
Am incarcat 8 numere: 3 1 4 1 5 9 2 6
Din fisierul inexistent: 0 numere.
```

Funcția `incarca` întoarce un vector gol dacă fișierul lipsește, deci programul nu se strică la prima rulare, când nu există încă niciun fișier salvat. Acest tipar „salvează la ieșire, încarcă la pornire” îl vei folosi în aproape toate proiectele din Modulul 4.

---

## 7. Mini-proiect

### Exemplul 16 — „Lista de note” **[Esențial]**

O aplicație cu meniu care ține notele într-un `vector`, le salvează într-un fișier și le încarcă la pornire. Închizi programul, îl deschizi din nou, iar notele sunt tot acolo.

```cpp
/*
   Program: Lista de note
   Scop:    vector de note cu meniu, salvare si incarcare din fisier
*/
#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>
using namespace std;

const char *FISIER = "lista_note.txt";

vector<int> incarca() {
    vector<int> note;
    ifstream fin(FISIER);
    if (!fin.is_open()) {
        return note;
    }
    int x;
    while (fin >> x) {
        note.push_back(x);
    }
    fin.close();
    return note;
}

void salveaza(const vector<int> &note) {
    ofstream fout(FISIER);
    for (int x : note) {
        fout << x << endl;
    }
    fout.close();
}

void afiseaza(const vector<int> &note) {
    if (note.empty()) {
        cout << "Lista este goala." << endl;
        return;
    }
    cout << "Note:";
    for (int x : note) {
        cout << " " << x;
    }
    cout << endl;
}

void statistici(const vector<int> &note) {
    if (note.empty()) {
        cout << "Nu exista note." << endl;
        return;
    }
    int suma = 0;
    int minim = note[0];
    int maxim = note[0];
    for (int x : note) {
        suma += x;
        if (x < minim) {
            minim = x;
        }
        if (x > maxim) {
            maxim = x;
        }
    }
    cout << "Numar de note: " << note.size() << endl;
    cout << "Media: " << (double)suma / note.size() << endl;
    cout << "Minim: " << minim << ", maxim: " << maxim << endl;
}

void adauga(vector<int> &note) {
    int nota;
    cout << "Nota (1-10): ";
    cin >> nota;
    if (nota < 1 || nota > 10) {
        cout << "Nota invalida." << endl;
        return;
    }
    note.push_back(nota);
    cout << "Nota adaugata." << endl;
}

void stergeUltima(vector<int> &note) {
    if (note.empty()) {
        cout << "Nu ai ce sterge." << endl;
        return;
    }
    cout << "Am sters nota " << note.back() << endl;
    note.pop_back();
}

int main() {
    vector<int> note = incarca();
    cout << "Am incarcat " << note.size() << " note din fisier." << endl;

    int optiune;
    do {
        cout << endl;
        cout << "===== LISTA DE NOTE =====" << endl;
        cout << "1. Adauga o nota" << endl;
        cout << "2. Afiseaza notele" << endl;
        cout << "3. Statistici" << endl;
        cout << "4. Sterge ultima nota" << endl;
        cout << "5. Sorteaza crescator" << endl;
        cout << "6. Salveaza in fisier" << endl;
        cout << "0. Iesire" << endl;
        cout << "Alege: ";
        cin >> optiune;

        if (optiune == 1) {
            adauga(note);
        } else if (optiune == 2) {
            afiseaza(note);
        } else if (optiune == 3) {
            statistici(note);
        } else if (optiune == 4) {
            stergeUltima(note);
        } else if (optiune == 5) {
            sort(note.begin(), note.end());
            cout << "Notele au fost sortate." << endl;
        } else if (optiune == 6) {
            salveaza(note);
            cout << "Salvat in " << FISIER << endl;
        } else if (optiune != 0) {
            cout << "Optiune necunoscuta." << endl;
        }
    } while (optiune != 0);

    salveaza(note);
    cout << "La revedere! Notele au fost salvate." << endl;
    return 0;
}
```

**Rulare** (tastezi `1 9`, `1 7`, `1 10`, `1 15`, `5`, `2`, `3`, `4`, `2`, `0`):
```
Am incarcat 0 note din fisier.

===== LISTA DE NOTE =====
1. Adauga o nota
2. Afiseaza notele
3. Statistici
4. Sterge ultima nota
5. Sorteaza crescator
6. Salveaza in fisier
0. Iesire
Alege: 1
Nota (1-10): 9
Nota adaugata.

===== LISTA DE NOTE =====
1. Adauga o nota
2. Afiseaza notele
3. Statistici
4. Sterge ultima nota
5. Sorteaza crescator
6. Salveaza in fisier
0. Iesire
Alege: 1
Nota (1-10): 7
Nota adaugata.

===== LISTA DE NOTE =====
1. Adauga o nota
2. Afiseaza notele
3. Statistici
4. Sterge ultima nota
5. Sorteaza crescator
6. Salveaza in fisier
0. Iesire
Alege: 1
Nota (1-10): 10
Nota adaugata.

===== LISTA DE NOTE =====
1. Adauga o nota
2. Afiseaza notele
3. Statistici
4. Sterge ultima nota
5. Sorteaza crescator
6. Salveaza in fisier
0. Iesire
Alege: 1
Nota (1-10): 15
Nota invalida.

===== LISTA DE NOTE =====
1. Adauga o nota
2. Afiseaza notele
3. Statistici
4. Sterge ultima nota
5. Sorteaza crescator
6. Salveaza in fisier
0. Iesire
Alege: 5
Notele au fost sortate.

===== LISTA DE NOTE =====
1. Adauga o nota
2. Afiseaza notele
3. Statistici
4. Sterge ultima nota
5. Sorteaza crescator
6. Salveaza in fisier
0. Iesire
Alege: 2
Note: 7 9 10

===== LISTA DE NOTE =====
1. Adauga o nota
2. Afiseaza notele
3. Statistici
4. Sterge ultima nota
5. Sorteaza crescator
6. Salveaza in fisier
0. Iesire
Alege: 3
Numar de note: 3
Media: 8.66667
Minim: 7, maxim: 10

===== LISTA DE NOTE =====
1. Adauga o nota
2. Afiseaza notele
3. Statistici
4. Sterge ultima nota
5. Sorteaza crescator
6. Salveaza in fisier
0. Iesire
Alege: 4
Am sters nota 10

===== LISTA DE NOTE =====
1. Adauga o nota
2. Afiseaza notele
3. Statistici
4. Sterge ultima nota
5. Sorteaza crescator
6. Salveaza in fisier
0. Iesire
Alege: 2
Note: 7 9

===== LISTA DE NOTE =====
1. Adauga o nota
2. Afiseaza notele
3. Statistici
4. Sterge ultima nota
5. Sorteaza crescator
6. Salveaza in fisier
0. Iesire
Alege: 0
La revedere! Notele au fost salvate.
```

Rulează programul de două ori. La a doua rulare, mesajul de la început arată că notele din prima rulare au fost încărcate din `lista_note.txt`.

Observă cum este organizat programul: **fiecare funcție face un singur lucru** și are un nume care spune ce face. `main` arată doar meniul și apelează funcțiile. Așa ai programe ușor de citit și de corectat. Variabila `FISIER` este o **constantă globală** (scrisă cu litere mari): numele fișierului apare într-un singur loc și îl poți schimba ușor.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Lista de note” (obligatoriu)
Scrie programul din Exemplul 16. Adaugă încă două opțiuni: „Șterge o notă de pe o poziție dată” (cu `erase`; verifică dacă poziția există) și „Câte note sunt peste medie”.

### Exercițiul B — Numere pare și impare
Citește numere până la `0` într-un vector. Construiește doi vectori noi, unul cu numerele pare și unul cu cele impare, și afișează-i pe amândoi.

### Exercițiul C — Fără duplicate
Citește 10 numere. Construiește un vector care conține fiecare valoare o singură dată (verifică înainte de `push_back` dacă numărul se află deja în vector) și afișează-l.

### Exercițiul D — Lista de cumpărături
Folosește `vector<string>` pentru o listă de cumpărături, cu meniu: adaugă un produs, șterge un produs după nume, afișează lista, salvează în fișier (câte un produs pe linie, citit cu `getline`).

### Exercițiul E — Rotire
Scrie funcția `void rotesteStanga(vector<int> &v)` care mută primul element la sfârșit (`{1,2,3,4}` devine `{2,3,4,1}`). Apeleaz-o de mai multe ori.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Nu compari niciodată un `int` direct cu `size()` (folosești `int n = v.size();` sau `(int)v.size()`)  
- [ ] Funcțiile care doar citesc primesc `const vector<…> &`  
- [ ] Funcțiile care modifică primesc `vector<…> &`  
- [ ] Verifici `empty()` înainte de `back()`, `front()` și `pop_back()`  
- [ ] Fișierul se numește `Prenume_Nume_M4L2.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Afișează în „Lista de note” și mediana (valoarea din mijloc a vectorului sortat)  
- [ ] Afișează cea mai frecventă notă  
- [ ] Scrie funcția `vector<int> inverseaza(const vector<int> &v)` fără să folosești `reverse`  
- [ ] Combină doi vectori sortați într-unul singur, tot sortat (interclasare)  
- [ ] Scrie funcția `vector<int> primePanaLa(int n)` care întoarce toate numerele prime până la `n`  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `error: 'vector' was not declared` | Lipsește biblioteca sau `using namespace std;` | `#include <vector>` |
| `error: missing template arguments` | Ai scris `vector v;` | Spune tipul: `vector<int> v;` |
| Avertisment `comparison of integer expressions of different signedness` | `i < v.size()` cu `int i` | `int n = v.size();` și `i < n` |
| Valori ciudate sau program blocat | Acces în afara vectorului (`v[10]` la 3 elemente) | Pozițiile valide sunt `0 … size() - 1` |
| `v[0]` pe un vector gol | N-ai adăugat nimic sau ai uitat `push_back` | Verifică `empty()` |
| `erase` sare peste elemente | `for` cu `i++` după ștergere | Folosește `while` și avansează doar când nu ștergi |
| Funcția modifică vectorul, dar în `main` nu se vede | Parametru fără `&` (primește copie) | `vector<int> &v` |
| Eroare la modificarea unui `const vector<int> &` | Parametrul este doar pentru citire | Scoate `const` dacă funcția chiar trebuie să modifice |
| `v.erase(i)` nu merge | `erase` primește o poziție, nu un număr | `v.erase(v.begin() + i);` |
| Se citește o valoare în plus din fișier | `while (!fin.eof())` | `while (fin >> x)` |

---

## Recapitulare pe scurt

- `#include <vector>` și `vector<tip> nume;`
- `push_back(x)` adaugă la sfârșit, `pop_back()` șterge ultimul, `size()` dă lungimea, `empty()` verifică dacă e gol, `clear()` golește.
- `v[i]` accesează elementul de pe poziția `i` (de la `0` la `size() - 1`); `front()` și `back()` dau primul și ultimul element.
- `erase(v.begin() + i)` șterge, `insert(v.begin() + i, x)` inserează.
- Parcurgere: `for (int i = 0; i < n; i++)` sau `for (int x : v)`; cu `for (int &x : v)` poți modifica elementele.
- Funcții: `const vector<int> &v` pentru citire, `vector<int> &v` pentru modificare; o funcție poate și să întoarcă un `vector`.
- `<algorithm>`: `sort(v.begin(), v.end())`, `reverse`, `min_element`, `max_element`, `count`.
- Tiparul „încarcă la pornire, salvează la ieșire” face un program să-și amintească datele.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie un program care citește `n` numere într-un vector și afișează: suma, media, minimul, maximul și câte numere sunt mai mari decât media.  
3. Citește numere până la `0`, apoi afișează-le în ordine inversă și apoi sortate crescător.  
4. Scrie funcția `bool existaIn(const vector<int> &v, int x)` și folosește-o într-un program care citește numere și afișează doar valorile care apar o singură dată în lista citită.  
5. **Bonus:** extinde „Lista de note” astfel încât fiecare notă să aibă și o materie (două vectori paraleli: `vector<int> note` și `vector<string> materii`). Ce probleme apar când ștergi o notă? Gândește-te: în lecția următoare vei vedea o soluție mai bună.  
6. Salvează tot ca `Tema_M4L2_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 3
Ultimul punct din temă arată o problemă reală: dacă o notă are mai multe informații (valoare, materie, dată), nu vrei să ții mai mulți vectori paraleli. Învățăm **structurile** (`struct`): o „cutie” care grupează mai multe date despre același lucru, de exemplu un elev cu nume, vârstă și notă.
