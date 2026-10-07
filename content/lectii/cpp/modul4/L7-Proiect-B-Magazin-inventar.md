# LECȚIA 7 — Proiect B: magazin / inventar
**Modulul 4 · Proiecte și autonomie · 2 ore**  
**Code Maker Club · CodeKids Graduate**

> Azi construim aplicația pe care o folosește aproape orice firmă, într-o variantă mică: un **inventar de magazin**. Ține produse (nume, preț, stoc), le adaugă, le caută, le modifică, le vinde cu un bon, le șterge, calculează rapoarte și salvează totul într-un fișier. Sunt toate piesele unui „CRUD” complet, la care adăugăm câteva idei noi: **identificatori unici**, **nume cu spații** în fișier și **căutare după o parte din nume**.  
> Proiect: **„Magazinul meu”** · fișier: `Prenume_Nume_M4L7.cpp` (ex. `Ana_Pop_M4L7.cpp`)

---

## Obiectiv
La finalul orei folosești un `id` unic pentru fiecare produs, salvezi și încarci nume cu spații, cauți după o parte din nume (fără să conteze literele mari și mici), validezi datele unui produs, modifici prețul și stocul, vinzi mai multe produse pe un bon, calculezi rapoarte și ții evidența modificărilor nesalvate.  
**Minim:** adaugi, afișezi și cauți produse și salvezi inventarul în fișier.  
**Ținta orei (Complet):** + vânzare cu bon, ștergere, rapoarte, sortare și proiectul „Magazinul meu” cu meniu complet.

## De ce contează
„Inventarul” este una dintre cele mai frecvente aplicații din lumea reală: un magazin, o bibliotecă, un depozit, o școală (cataloage, cărți, echipamente), un joc (obiectele din rucsac). Dacă știi să construiești una, știi să construiești multe. Mai mult, azi exersezi să **proiectezi** o aplicație mai mare, adică să alegi ce date ții minte și ce operații ai nevoie.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: CRUD, `vector` de structuri, fișiere |
| 10–35 | Produsul, afișare ca tabel, fișier cu nume cu spații, `id` (**Exemplele 1–3**) |
| 35–60 | Căutare, validare, modificare (**Exemplele 4–6**) |
| 60–85 | Vânzare, bon, alerte, rapoarte (**Exemplele 7–10**) |
| 85–100 | Sortări, ștergere (**Exemplele 11–12**), istoric și backup (**Exemplele 13–14**, opționale) |
| 100–118 | Proiectul complet (**Exemplul 15**) |
| 118–120 | Predare și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **7 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Produsul și fișierul

Fiecare produs are patru informații:

```
struct Produs {
    int id = 0;        // numar unic: nu se repeta niciodata
    string nume;       // poate contine spatii (de ex. "Caiet dictando")
    double pret = 0;   // in lei
    int stoc = 0;      // cate bucati sunt in magazin
};
```

De ce `id`? Pentru că numele pot fi asemănătoare sau se pot schimba, iar poziția din vector se modifică la fiecare ștergere. Un `id` unic identifică un produs în mod sigur: „produsul 3” rămâne „produsul 3” oricâte alte produse apar sau dispar.

### Exemplul 1 — Afișarea ca tabel **[Esențial]**

Un inventar se citește mult mai ușor într-un tabel aliniat. Folosim `setw`, `left` și `right` din `<iomanip>`:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <iomanip>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

void afiseazaTabel(const vector<Produs> &lista) {
    if (lista.empty()) {
        cout << "Inventarul este gol." << endl;
        return;
    }
    cout << fixed << setprecision(2);
    cout << left << setw(5) << "ID" << setw(20) << "Produs"
         << right << setw(10) << "Pret" << setw(7) << "Stoc" << endl;
    cout << string(42, '-') << endl;
    for (const Produs &p : lista) {
        cout << left << setw(5) << p.id << setw(20) << p.nume
             << right << setw(10) << p.pret << setw(7) << p.stoc << endl;
    }
}

int main() {
    vector<Produs> lista = {
        {1, "Caiet dictando", 4.5, 20},
        {2, "Pix albastru", 2.0, 50},
        {3, "Rucsac scolar", 120.0, 5},
        {4, "Creioane colorate", 15.75, 0}
    };
    afiseazaTabel(lista);
    return 0;
}
```

**Ieșire:**
```
ID   Produs                    Pret   Stoc
------------------------------------------
1    Caiet dictando            4.50     20
2    Pix albastru              2.00     50
3    Rucsac scolar           120.00      5
4    Creioane colorate        15.75      0
```

`setw(20)` rezervă 20 de caractere pentru numele produsului; `left` aliniază la stânga, `right` la dreapta (numerele arată mai bine aliniate la dreapta). `string(42, '-')` desenează linia de separare.

### Exemplul 2 — Fișier cu nume care conțin spații **[Esențial]**

Până acum scriam câmpurile pe aceeași linie, separate prin spațiu. Dar dacă numele conține spații (`Caiet dictando`), `fin >> nume` ar citi doar `Caiet`. Soluția: pentru fiecare produs scriem **două linii**, numele pe prima și restul datelor pe a doua.

```
Caiet dictando
1 4.5 20
Pix albastru
2 2 50
```

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

void salveaza(const vector<Produs> &lista, const string &fisier) {
    ofstream fout(fisier);
    for (const Produs &p : lista) {
        fout << p.nume << endl;
        fout << p.id << " " << p.pret << " " << p.stoc << endl;
    }
}

vector<Produs> incarca(const string &fisier) {
    vector<Produs> lista;
    ifstream fin(fisier);
    Produs p;
    while (getline(fin >> ws, p.nume)) {
        fin >> p.id >> p.pret >> p.stoc;
        lista.push_back(p);
    }
    return lista;
}

int main() {
    vector<Produs> lista = {
        {1, "Caiet dictando", 4.5, 20},
        {2, "Pix albastru", 2.0, 50},
        {3, "Rucsac scolar", 120.0, 5}
    };
    salveaza(lista, "inventar_test.txt");

    ifstream f("inventar_test.txt");
    string linie;
    cout << "Continutul fisierului:" << endl;
    while (getline(f, linie)) {
        cout << "  | " << linie << endl;
    }
    f.close();

    vector<Produs> citit = incarca("inventar_test.txt");
    cout << "Am incarcat " << citit.size() << " produse:" << endl;
    for (const Produs &p : citit) {
        cout << "  #" << p.id << " " << p.nume << " - " << p.pret << " lei, " << p.stoc << " buc" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Continutul fisierului:
  | Caiet dictando
  | 1 4.5 20
  | Pix albastru
  | 2 2 50
  | Rucsac scolar
  | 3 120 5
Am incarcat 3 produse:
  #1 Caiet dictando - 4.5 lei, 20 buc
  #2 Pix albastru - 2 lei, 50 buc
  #3 Rucsac scolar - 120 lei, 5 buc
```

`getline(fin >> ws, p.nume)` sare peste Enter-ul rămas de la citirea anterioară și citește numele întreg. Dacă nu mai există nimic de citit, `getline` eșuează și bucla se oprește singură.

### Exemplul 3 — `id` unic **[Esențial]**

Pentru un produs nou, `id`-ul este **cel mai mare id existent plus 1**. Nu folosim `size() + 1`, pentru că, după ce ștergi un produs din mijloc, ai putea ajunge să dai același id de două ori:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

int urmatorId(const vector<Produs> &lista) {
    int maxim = 0;
    for (const Produs &p : lista) {
        if (p.id > maxim) {
            maxim = p.id;
        }
    }
    return maxim + 1;
}

int main() {
    vector<Produs> lista;
    cout << "Inventar gol -> primul id: " << urmatorId(lista) << endl;

    lista.push_back({1, "A", 1, 1});
    lista.push_back({2, "B", 1, 1});
    lista.push_back({3, "C", 1, 1});
    cout << "Dupa 3 produse -> urmatorul id: " << urmatorId(lista) << endl;

    lista.erase(lista.begin() + 1);   // stergem produsul cu id 2
    cout << "Dupa stergerea lui 2 -> urmatorul id: " << urmatorId(lista) << endl;
    cout << "(size() + 1 ar fi dat " << lista.size() + 1 << ", adica un id deja folosit)" << endl;
    return 0;
}
```

**Ieșire:**
```
Inventar gol -> primul id: 1
Dupa 3 produse -> urmatorul id: 4
Dupa stergerea lui 2 -> urmatorul id: 4
(size() + 1 ar fi dat 3, adica un id deja folosit)
```

---

## 2. Căutare, validare, modificare

### Exemplul 4 — Căutare după `id` și după o parte din nume **[Esențial]**

Pentru căutarea după nume vrem ca `pix`, `PIX` și `Pix` să găsească același produs. Transformăm ambele texte în litere mici și folosim `find` (din lecția M3L5), care întoarce `string::npos` dacă nu găsește nimic:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cctype>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

string minuscule(string s) {
    int n = s.length();
    for (int i = 0; i < n; i++) {
        s[i] = tolower(s[i]);
    }
    return s;
}

int cautaId(const vector<Produs> &lista, int id) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].id == id) {
            return i;
        }
    }
    return -1;
}

vector<int> cautaNume(const vector<Produs> &lista, const string &text) {
    vector<int> pozitii;
    string cautat = minuscule(text);
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        size_t gasit = minuscule(lista[i].nume).find(cautat);
        if (gasit != string::npos) {
            pozitii.push_back(i);
        }
    }
    return pozitii;
}

int main() {
    vector<Produs> lista = {
        {1, "Caiet dictando", 4.5, 20},
        {2, "Pix albastru", 2.0, 50},
        {3, "Pix negru", 2.0, 30},
        {4, "Rucsac scolar", 120.0, 5}
    };

    int poz = cautaId(lista, 4);
    cout << "Id 4 -> " << lista[poz].nume << endl;
    cout << "Id 9 -> pozitia " << cautaId(lista, 9) << " (inexistent)" << endl;

    string texte[3] = {"pix", "CAIET", "xyz"};
    for (int k = 0; k < 3; k++) {
        vector<int> gasite = cautaNume(lista, texte[k]);
        cout << "Cautare \"" << texte[k] << "\": " << gasite.size() << " rezultate";
        for (int p : gasite) {
            cout << " [" << lista[p].nume << "]";
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Id 4 -> Rucsac scolar
Id 9 -> pozitia -1 (inexistent)
Cautare "pix": 2 rezultate [Pix albastru] [Pix negru]
Cautare "CAIET": 1 rezultate [Caiet dictando]
Cautare "xyz": 0 rezultate
```

Observă: `cautaNume` întoarce **un vector de poziții**, pentru că o căutare după o parte din nume poate găsi mai multe produse (aici „pix” găsește două), una sau niciunul.

### Exemplul 5 — Validarea unui produs

Înainte să adaugi un produs, verifici dacă datele au sens. O funcție de validare întoarce un **mesaj de eroare**, sau un text gol dacă totul e în regulă:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cctype>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

string minuscule(string s) {
    int n = s.length();
    for (int i = 0; i < n; i++) {
        s[i] = tolower(s[i]);
    }
    return s;
}

string valideaza(const Produs &p, const vector<Produs> &lista) {
    if (p.nume.empty()) {
        return "Numele nu poate fi gol.";
    }
    if (p.pret <= 0) {
        return "Pretul trebuie sa fie pozitiv.";
    }
    if (p.stoc < 0) {
        return "Stocul nu poate fi negativ.";
    }
    for (const Produs &q : lista) {
        if (minuscule(q.nume) == minuscule(p.nume)) {
            return "Exista deja un produs cu acest nume.";
        }
    }
    return "";
}

int main() {
    vector<Produs> lista = {{1, "Pix albastru", 2.0, 50}};

    Produs candidati[5] = {
        {0, "Caiet", 4.5, 10},
        {0, "", 3, 3},
        {0, "Radiera", -1, 5},
        {0, "Marker", 6, -2},
        {0, "PIX ALBASTRU", 2.5, 10}
    };

    for (int i = 0; i < 5; i++) {
        string eroare = valideaza(candidati[i], lista);
        if (eroare == "") {
            cout << "\"" << candidati[i].nume << "\": OK" << endl;
        } else {
            cout << "\"" << candidati[i].nume << "\": " << eroare << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
"Caiet": OK
"": Numele nu poate fi gol.
"Radiera": Pretul trebuie sa fie pozitiv.
"Marker": Stocul nu poate fi negativ.
"PIX ALBASTRU": Exista deja un produs cu acest nume.
```

Funcția de validare este separată de cea care citește datele. Poți s-o testezi cu orice valori, fără să tastezi nimic, exact ca la testele din lecția anterioară.

### Exemplul 6 — Modificarea prețului și a stocului **[Esențial]**

În practică modifici două lucruri: **prețul** (cu o valoare nouă) și **stocul** (când vine marfă, adaugi o cantitate). Fiecare este o funcție care întoarce `false` dacă nu poate face schimbarea:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

int cautaId(const vector<Produs> &lista, int id) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].id == id) {
            return i;
        }
    }
    return -1;
}

bool seteazaPret(vector<Produs> &lista, int id, double pretNou) {
    int poz = cautaId(lista, id);
    if (poz == -1 || pretNou <= 0) {
        return false;
    }
    lista[poz].pret = pretNou;
    return true;
}

bool aproviziona(vector<Produs> &lista, int id, int cantitate) {
    int poz = cautaId(lista, id);
    if (poz == -1 || cantitate <= 0) {
        return false;
    }
    lista[poz].stoc += cantitate;
    return true;
}

void raport(bool ok, const string &actiune) {
    if (ok) {
        cout << actiune << ": reusit" << endl;
    } else {
        cout << actiune << ": REFUZAT" << endl;
    }
}

int main() {
    vector<Produs> lista = {{1, "Caiet", 4.5, 20}, {2, "Pix", 2.0, 50}};

    raport(seteazaPret(lista, 1, 5.0), "Pret caiet -> 5.0");
    raport(seteazaPret(lista, 1, -3), "Pret caiet -> -3");
    raport(seteazaPret(lista, 9, 7), "Pret produs 9");
    raport(aproviziona(lista, 2, 25), "Aprovizionare pix +25");
    raport(aproviziona(lista, 2, 0), "Aprovizionare pix +0");

    cout << "Caiet: " << lista[0].pret << " lei, stoc " << lista[0].stoc << endl;
    cout << "Pix:   " << lista[1].pret << " lei, stoc " << lista[1].stoc << endl;
    return 0;
}
```

**Ieșire:**
```
Pret caiet -> 5.0: reusit
Pret caiet -> -3: REFUZAT
Pret produs 9: REFUZAT
Aprovizionare pix +25: reusit
Aprovizionare pix +0: REFUZAT
Caiet: 5 lei, stoc 20
Pix:   2 lei, stoc 75
```

---

## 3. Vânzare, alerte, rapoarte

### Exemplul 7 — Vânzarea unui produs **[Esențial]**

La vânzare verifici trei lucruri: produsul există, cantitatea e pozitivă și **există destul stoc**. Dacă totul e bine, scazi stocul și calculezi suma:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

int cautaId(const vector<Produs> &lista, int id) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].id == id) {
            return i;
        }
    }
    return -1;
}

// intoarce suma de plata sau -1 daca vanzarea nu se poate face
double vinde(vector<Produs> &lista, int id, int cantitate) {
    int poz = cautaId(lista, id);
    if (poz == -1) {
        cout << "  Produsul " << id << " nu exista." << endl;
        return -1;
    }
    if (cantitate <= 0) {
        cout << "  Cantitate invalida." << endl;
        return -1;
    }
    if (cantitate > lista[poz].stoc) {
        cout << "  Stoc insuficient pentru " << lista[poz].nume
             << " (avem " << lista[poz].stoc << ")." << endl;
        return -1;
    }
    lista[poz].stoc -= cantitate;
    return cantitate * lista[poz].pret;
}

int main() {
    vector<Produs> lista = {{1, "Caiet", 4.5, 20}, {2, "Pix", 2.0, 5}};

    int cereri[4][2] = {{1, 3}, {2, 10}, {7, 1}, {2, 5}};
    double incasat = 0;
    for (int i = 0; i < 4; i++) {
        cout << "Vand " << cereri[i][1] << " x produs " << cereri[i][0] << endl;
        double suma = vinde(lista, cereri[i][0], cereri[i][1]);
        if (suma >= 0) {
            cout << "  Suma: " << suma << " lei" << endl;
            incasat += suma;
        }
    }
    cout << "Total incasat: " << incasat << " lei" << endl;
    cout << "Stoc ramas: caiet " << lista[0].stoc << ", pix " << lista[1].stoc << endl;
    return 0;
}
```

**Ieșire:**
```
Vand 3 x produs 1
  Suma: 13.5 lei
Vand 10 x produs 2
  Stoc insuficient pentru Pix (avem 5).
Vand 1 x produs 7
  Produsul 7 nu exista.
Vand 5 x produs 2
  Suma: 10 lei
Total incasat: 23.5 lei
Stoc ramas: caiet 17, pix 0
```

Aici funcția întoarce `-1` ca semn al unei vânzări eșuate (o sumă reală nu poate fi negativă). Este aceeași idee ca la căutare, unde `-1` însemna „nu am găsit”.

### Exemplul 8 — Coșul și bonul

La un magazin real cumperi mai multe produse deodată, iar casierul îți dă un **bon**. Păstrăm cumpărăturile într-un coș (un `vector` de linii) și le finalizăm la urmă: afișăm bonul și abia atunci scădem stocul.

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <iomanip>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

struct Linie {
    int id;
    int cant;
};

int cautaId(const vector<Produs> &lista, int id) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].id == id) {
            return i;
        }
    }
    return -1;
}

// adauga in cos; intoarce un mesaj de eroare sau "" daca a mers
string adaugaInCos(const vector<Produs> &lista, vector<Linie> &cos, int id, int cant) {
    int poz = cautaId(lista, id);
    if (poz == -1) {
        return "Produsul nu exista.";
    }
    int deja = 0;
    for (const Linie &l : cos) {
        if (l.id == id) {
            deja += l.cant;
        }
    }
    if (deja + cant > lista[poz].stoc) {
        return "Stoc insuficient pentru " + lista[poz].nume + ".";
    }
    for (Linie &l : cos) {
        if (l.id == id) {
            l.cant += cant;
            return "";
        }
    }
    cos.push_back({id, cant});
    return "";
}

double finalizeaza(vector<Produs> &lista, vector<Linie> &cos) {
    cout << fixed << setprecision(2);
    cout << "------ BON ------" << endl;
    double total = 0;
    for (const Linie &l : cos) {
        Produs &p = lista[cautaId(lista, l.id)];
        double subtotal = p.pret * l.cant;
        cout << left << setw(16) << p.nume << right << setw(2) << l.cant << " x "
             << setw(6) << p.pret << " = " << setw(7) << subtotal << endl;
        p.stoc -= l.cant;
        total += subtotal;
    }
    cout << "-----------------" << endl;
    cout << left << setw(16) << "TOTAL" << right << setw(21) << total << " lei" << endl;
    cos.clear();
    return total;
}

int main() {
    vector<Produs> lista = {
        {1, "Caiet dictando", 4.5, 20},
        {2, "Pix albastru", 2.0, 5},
        {3, "Rucsac scolar", 120.0, 2}
    };
    vector<Linie> cos;

    int cereri[5][2] = {{1, 3}, {2, 2}, {2, 4}, {9, 1}, {1, 2}};
    for (int i = 0; i < 5; i++) {
        string eroare = adaugaInCos(lista, cos, cereri[i][0], cereri[i][1]);
        if (eroare != "") {
            cout << "Refuzat: " << eroare << endl;
        }
    }

    finalizeaza(lista, cos);
    cout << "Stoc dupa vanzare: caiet " << lista[0].stoc << ", pix " << lista[1].stoc << endl;
    return 0;
}
```

**Ieșire:**
```
Refuzat: Stoc insuficient pentru Pix albastru.
Refuzat: Produsul nu exista.
------ BON ------
Caiet dictando   5 x   4.50 =   22.50
Pix albastru     2 x   2.00 =    4.00
-----------------
TOTAL                           26.50 lei
Stoc dupa vanzare: caiet 15, pix 3
```

De ce nu scădem stocul imediat, la fiecare adăugare în coș? Pentru că clientul se poate răzgândi. Stocul se modifică abia la finalizare. În schimb, la fiecare adăugare verificăm că **totalul din coș** pentru acel produs nu depășește stocul (de aceea cele 4 pixuri cerute după cele 2 au fost refuzate: 2 + 4 > 5).

### Exemplul 9 — Alertă de stoc mic

Un magazin vrea să știe ce trebuie comandat. Alegem un prag și afișăm produsele sub el, iar cele epuizate separat:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

vector<Produs> stocMic(const vector<Produs> &lista, int prag) {
    vector<Produs> rez;
    for (const Produs &p : lista) {
        if (p.stoc <= prag) {
            rez.push_back(p);
        }
    }
    return rez;
}

int main() {
    vector<Produs> lista = {
        {1, "Caiet dictando", 4.5, 20},
        {2, "Pix albastru", 2.0, 3},
        {3, "Rucsac scolar", 120.0, 5},
        {4, "Creioane colorate", 15.75, 0},
        {5, "Radiera", 1.5, 40}
    };

    int prag = 5;
    vector<Produs> mic = stocMic(lista, prag);

    cout << "Produse cu stoc de cel mult " << prag << " bucati:" << endl;
    for (const Produs &p : mic) {
        if (p.stoc == 0) {
            cout << "  [EPUIZAT] " << p.nume << endl;
        } else {
            cout << "  [de comandat] " << p.nume << " (stoc " << p.stoc << ")" << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
Produse cu stoc de cel mult 5 bucati:
  [de comandat] Pix albastru (stoc 3)
  [de comandat] Rucsac scolar (stoc 5)
  [EPUIZAT] Creioane colorate
```

### Exemplul 10 — Rapoarte

Un raport rezumă tot inventarul: valoarea totală, produsul cel mai scump, cel mai ieftin, prețul mediu, câte produse sunt epuizate. Un singur parcurs al vectorului le calculează pe toate:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <iomanip>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

void raport(const vector<Produs> &lista) {
    if (lista.empty()) {
        cout << "Inventarul este gol." << endl;
        return;
    }
    double valoare = 0;
    double sumaPreturi = 0;
    int epuizate = 0;
    int bucati = 0;
    int scump = 0;
    int ieftin = 0;

    int n = lista.size();
    for (int i = 0; i < n; i++) {
        valoare += lista[i].pret * lista[i].stoc;
        sumaPreturi += lista[i].pret;
        bucati += lista[i].stoc;
        if (lista[i].stoc == 0) {
            epuizate++;
        }
        if (lista[i].pret > lista[scump].pret) {
            scump = i;
        }
        if (lista[i].pret < lista[ieftin].pret) {
            ieftin = i;
        }
    }

    cout << fixed << setprecision(2);
    cout << "Produse diferite: " << n << endl;
    cout << "Bucati in stoc: " << bucati << endl;
    cout << "Valoarea stocului: " << valoare << " lei" << endl;
    cout << "Pret mediu: " << sumaPreturi / n << " lei" << endl;
    cout << "Cel mai scump: " << lista[scump].nume << " (" << lista[scump].pret << " lei)" << endl;
    cout << "Cel mai ieftin: " << lista[ieftin].nume << " (" << lista[ieftin].pret << " lei)" << endl;
    cout << "Produse epuizate: " << epuizate << endl;
}

int main() {
    vector<Produs> lista = {
        {1, "Caiet dictando", 4.5, 20},
        {2, "Pix albastru", 2.0, 50},
        {3, "Rucsac scolar", 120.0, 5},
        {4, "Creioane colorate", 15.75, 0}
    };
    raport(lista);
    return 0;
}
```

**Ieșire:**
```
Produse diferite: 4
Bucati in stoc: 75
Valoarea stocului: 790.00 lei
Pret mediu: 35.56 lei
Cel mai scump: Rucsac scolar (120.00 lei)
Cel mai ieftin: Pix albastru (2.00 lei)
Produse epuizate: 1
```

---

## 4. Sortare, ștergere, istoric, copie de siguranță

### Exemplul 11 — Trei sortări

Reții comparatoarele din lecția 4: câte o funcție pentru fiecare criteriu. Aici: după nume (alfabetic), după preț (crescător) și după stoc (descrescător):

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

bool dupaNume(const Produs &a, const Produs &b) {
    return a.nume < b.nume;
}

bool dupaPret(const Produs &a, const Produs &b) {
    return a.pret < b.pret;
}

bool dupaStocDesc(const Produs &a, const Produs &b) {
    return a.stoc > b.stoc;
}

void afiseaza(const string &titlu, const vector<Produs> &lista) {
    cout << titlu << ":";
    for (const Produs &p : lista) {
        cout << " " << p.nume << "(" << p.pret << "/" << p.stoc << ")";
    }
    cout << endl;
}

int main() {
    vector<Produs> lista = {
        {1, "Pix", 2.0, 50},
        {2, "Caiet", 4.5, 20},
        {3, "Rucsac", 120.0, 5},
        {4, "Radiera", 1.5, 40}
    };

    sort(lista.begin(), lista.end(), dupaNume);
    afiseaza("Dupa nume", lista);

    sort(lista.begin(), lista.end(), dupaPret);
    afiseaza("Dupa pret (crescator)", lista);

    sort(lista.begin(), lista.end(), dupaStocDesc);
    afiseaza("Dupa stoc (descrescator)", lista);
    return 0;
}
```

**Ieșire:**
```
Dupa nume: Caiet(4.5/20) Pix(2/50) Radiera(1.5/40) Rucsac(120/5)
Dupa pret (crescator): Radiera(1.5/40) Pix(2/50) Caiet(4.5/20) Rucsac(120/5)
Dupa stoc (descrescator): Pix(2/50) Radiera(1.5/40) Caiet(4.5/20) Rucsac(120/5)
```

Fiecare produs păstrează același `id` oricum l-ai sorta. Dacă ai fi folosit poziția din vector în loc de `id`, sortarea ar fi încurcat totul.

### Exemplul 12 — Ștergere cu confirmare

Ștergerea nu se poate anula, deci întrebăm înainte. Folosim `confirma` din lecția 5:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cctype>
using namespace std;

struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

bool confirma(const string &intrebare) {
    while (true) {
        string r;
        cout << intrebare << " (da/nu): ";
        cin >> r;
        int n = r.length();
        for (int i = 0; i < n; i++) {
            r[i] = tolower(r[i]);
        }
        if (r == "da") {
            return true;
        }
        if (r == "nu") {
            return false;
        }
    }
}

bool stergeProdus(vector<Produs> &lista, int id) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].id == id) {
            if (confirma("Stergi \"" + lista[i].nume + "\"?")) {
                lista.erase(lista.begin() + i);
                return true;
            }
            return false;
        }
    }
    cout << "Produsul " << id << " nu exista." << endl;
    return false;
}

int main() {
    vector<Produs> lista = {{1, "Pix", 2, 50}, {2, "Caiet", 4.5, 20}, {3, "Rucsac", 120, 5}};

    cout << "Sterg produsul 2:" << endl;
    bool a = stergeProdus(lista, 2);
    cout << "Sters? " << a << endl;

    cout << "Sterg produsul 3:" << endl;
    bool b = stergeProdus(lista, 3);
    cout << "Sters? " << b << endl;

    cout << "Sterg produsul 8:" << endl;
    stergeProdus(lista, 8);

    cout << "Au ramas " << lista.size() << " produse." << endl;
    return 0;
}
```

**Rulare** (tastezi `da`, `nu`):
```
Sterg produsul 2:
Stergi "Caiet"? (da/nu): da
Sters? 1
Sterg produsul 3:
Stergi "Rucsac"? (da/nu): nu
Sters? 0
Sterg produsul 8:
Produsul 8 nu exista.
Au ramas 2 produse.
```

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

### Exemplul 13 — Istoricul vânzărilor *(Provocare, opțional)*

Fiecare vânzare se adaugă într-un fișier cu `ios::app`, câte o linie. La sfârșitul zilei citim fișierul și calculăm încasările:

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <cstdio>
#include <iomanip>
using namespace std;

const string ISTORIC = "vanzari.txt";

void noteazaVanzare(int id, int cantitate, double suma) {
    ofstream fout(ISTORIC, ios::app);
    fout << id << " " << cantitate << " " << suma << endl;
}

int main() {
    remove(ISTORIC.c_str());   // pornim cu o zi noua

    noteazaVanzare(1, 3, 13.5);
    noteazaVanzare(2, 10, 20);
    noteazaVanzare(3, 1, 120);
    noteazaVanzare(1, 2, 9);

    ifstream fin(ISTORIC);
    int id;
    int cant;
    double suma;
    int vanzari = 0;
    int bucati = 0;
    double incasari = 0;
    while (fin >> id >> cant >> suma) {
        vanzari++;
        bucati += cant;
        incasari += suma;
    }

    cout << fixed << setprecision(2);
    cout << "Vanzari azi: " << vanzari << endl;
    cout << "Bucati vandute: " << bucati << endl;
    cout << "Incasari: " << incasari << " lei" << endl;
    return 0;
}
```

**Ieșire:**
```
Vanzari azi: 4
Bucati vandute: 16
Incasari: 162.50 lei
```

### Exemplul 14 — Copie de siguranță *(Provocare, opțional)*

Înainte de operații riscante (de exemplu o ștergere în masă), un program serios face o copie a fișierului de date. Copierea unui fișier text este citire linie cu linie și scriere în altul:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

bool copiaza(const string &sursa, const string &destinatie) {
    ifstream fin(sursa);
    if (!fin.is_open()) {
        return false;
    }
    ofstream fout(destinatie);
    string linie;
    while (getline(fin, linie)) {
        fout << linie << endl;
    }
    return true;
}

int numaraLinii(const string &fisier) {
    ifstream fin(fisier);
    string linie;
    int nr = 0;
    while (getline(fin, linie)) {
        nr++;
    }
    return nr;
}

int main() {
    // pregatim un fisier sursa
    ofstream fout("inventar_demo.txt");
    fout << "Pix albastru" << endl << "1 2 50" << endl;
    fout << "Caiet" << endl << "2 4.5 20" << endl;
    fout.close();

    if (copiaza("inventar_demo.txt", "inventar_demo_backup.txt")) {
        cout << "Copie creata: " << numaraLinii("inventar_demo_backup.txt")
             << " linii (original: " << numaraLinii("inventar_demo.txt") << ")" << endl;
    }

    if (!copiaza("nu_exista.txt", "copie.txt")) {
        cout << "Nu pot copia un fisier inexistent." << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Copie creata: 4 linii (original: 4)
Nu pot copia un fisier inexistent.
```

---

## 5. Proiectul

### Exemplul 15 — „Magazinul meu” **[Esențial]**

Toate piesele într-o singură aplicație, cu meniu. Numele produselor pot avea spații, iar datele se încarcă la pornire și se salvează la ieșire, dacă s-a schimbat ceva.

```cpp
/*
   Program: Magazinul meu
   Scop:    inventar cu CRUD complet, vanzare cu bon, rapoarte si salvare
*/
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <iomanip>
#include <limits>
#include <cctype>
using namespace std;

// ---------- structuri ----------
struct Produs {
    int id = 0;
    string nume;
    double pret = 0;
    int stoc = 0;
};

struct Linie {
    int id;
    int cant;
};

struct Stare {
    vector<Produs> produse;
    bool modificat = false;
};

enum Optiune { IESIRE, AFISEAZA, ADAUGA, CAUTA, MODIFICA, VINDE, STERGE, RAPOARTE, SORTEAZA, SALVEAZA };

const string FISIER = "inventar.txt";
const int PRAG_STOC = 5;

// ---------- citire sigura ----------
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

double citesteDouble(const string &mesaj, double minim, double maxim) {
    while (true) {
        double x = 0;
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

string citesteText(const string &mesaj) {
    string s;
    cout << mesaj;
    getline(cin >> ws, s);
    return s;
}

bool confirma(const string &intrebare) {
    while (true) {
        string r;
        cout << intrebare << " (da/nu): ";
        cin >> r;
        int n = r.length();
        for (int i = 0; i < n; i++) {
            r[i] = tolower(r[i]);
        }
        if (r == "da") {
            return true;
        }
        if (r == "nu") {
            return false;
        }
    }
}

// ---------- utilitare ----------
string minuscule(string s) {
    int n = s.length();
    for (int i = 0; i < n; i++) {
        s[i] = tolower(s[i]);
    }
    return s;
}

int urmatorId(const vector<Produs> &lista) {
    int maxim = 0;
    for (const Produs &p : lista) {
        if (p.id > maxim) {
            maxim = p.id;
        }
    }
    return maxim + 1;
}

int cautaId(const vector<Produs> &lista, int id) {
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        if (lista[i].id == id) {
            return i;
        }
    }
    return -1;
}

bool numeExista(const vector<Produs> &lista, const string &nume) {
    for (const Produs &p : lista) {
        if (minuscule(p.nume) == minuscule(nume)) {
            return true;
        }
    }
    return false;
}

// ---------- fisiere ----------
void incarca(Stare &s) {
    ifstream fin(FISIER);
    if (!fin.is_open()) {
        return;
    }
    Produs p;
    while (getline(fin >> ws, p.nume)) {
        fin >> p.id >> p.pret >> p.stoc;
        s.produse.push_back(p);
    }
}

void salveaza(Stare &s) {
    ofstream fout(FISIER);
    for (const Produs &p : s.produse) {
        fout << p.nume << endl;
        fout << p.id << " " << p.pret << " " << p.stoc << endl;
    }
    s.modificat = false;
}

// ---------- afisare ----------
void afiseazaRand(const Produs &p) {
    cout << left << setw(5) << p.id << setw(20) << p.nume
         << right << setw(10) << p.pret << setw(7) << p.stoc << endl;
}

void afiseazaAntet() {
    cout << left << setw(5) << "ID" << setw(20) << "Produs"
         << right << setw(10) << "Pret" << setw(7) << "Stoc" << endl;
    cout << string(42, '-') << endl;
}

void afiseazaTot(const Stare &s) {
    if (s.produse.empty()) {
        cout << "Inventarul este gol." << endl;
        return;
    }
    cout << fixed << setprecision(2);
    afiseazaAntet();
    for (const Produs &p : s.produse) {
        afiseazaRand(p);
    }
}

// ---------- actiuni ----------
void adauga(Stare &s) {
    Produs p;
    p.nume = citesteText("Nume produs: ");
    if (numeExista(s.produse, p.nume)) {
        cout << "Exista deja un produs cu acest nume." << endl;
        return;
    }
    p.pret = citesteDouble("Pret (lei): ", 0.01, 100000);
    p.stoc = citesteInt("Stoc (bucati): ", 0, 100000);
    p.id = urmatorId(s.produse);
    s.produse.push_back(p);
    s.modificat = true;
    cout << "Produs adaugat cu id " << p.id << "." << endl;
}

void cauta(const Stare &s) {
    string text = minuscule(citesteText("Cauta (o parte din nume): "));
    bool gasit = false;
    cout << fixed << setprecision(2);
    for (const Produs &p : s.produse) {
        if (minuscule(p.nume).find(text) != string::npos) {
            if (!gasit) {
                afiseazaAntet();
            }
            afiseazaRand(p);
            gasit = true;
        }
    }
    if (!gasit) {
        cout << "Niciun produs nu contine \"" << text << "\"." << endl;
    }
}

void modifica(Stare &s) {
    int id = citesteInt("ID produs: ", 1, 100000);
    int poz = cautaId(s.produse, id);
    if (poz == -1) {
        cout << "Produsul " << id << " nu exista." << endl;
        return;
    }
    cout << "1. Pret nou   2. Aprovizionare (adauga la stoc)" << endl;
    int alegere = citesteInt("Alege: ", 1, 2);
    if (alegere == 1) {
        s.produse[poz].pret = citesteDouble("Pret nou (lei): ", 0.01, 100000);
        cout << "Pret modificat." << endl;
    } else {
        int cant = citesteInt("Cantitate primita: ", 1, 100000);
        s.produse[poz].stoc += cant;
        cout << "Stoc nou pentru " << s.produse[poz].nume << ": " << s.produse[poz].stoc << endl;
    }
    s.modificat = true;
}

void vinde(Stare &s) {
    vector<Linie> cos;
    while (true) {
        int id = citesteInt("ID produs (0 = gata): ", 0, 100000);
        if (id == 0) {
            break;
        }
        int poz = cautaId(s.produse, id);
        if (poz == -1) {
            cout << "  Produsul " << id << " nu exista." << endl;
            continue;
        }
        int cant = citesteInt("Cantitate: ", 1, 100000);
        int deja = 0;
        for (const Linie &l : cos) {
            if (l.id == id) {
                deja += l.cant;
            }
        }
        if (deja + cant > s.produse[poz].stoc) {
            cout << "  Stoc insuficient pentru " << s.produse[poz].nume
                 << " (disponibil: " << s.produse[poz].stoc - deja << ")." << endl;
            continue;
        }
        bool exista = false;
        for (Linie &l : cos) {
            if (l.id == id) {
                l.cant += cant;
                exista = true;
            }
        }
        if (!exista) {
            cos.push_back({id, cant});
        }
    }

    if (cos.empty()) {
        cout << "Nu s-a vandut nimic." << endl;
        return;
    }

    cout << fixed << setprecision(2);
    cout << endl << "------ BON ------" << endl;
    double total = 0;
    for (const Linie &l : cos) {
        Produs &p = s.produse[cautaId(s.produse, l.id)];
        double subtotal = p.pret * l.cant;
        cout << left << setw(16) << p.nume << right << setw(2) << l.cant << " x "
             << setw(6) << p.pret << " = " << setw(7) << subtotal << endl;
        p.stoc -= l.cant;
        total += subtotal;
    }
    cout << "-----------------" << endl;
    cout << left << setw(16) << "TOTAL" << right << setw(21) << total << " lei" << endl;
    s.modificat = true;
}

void sterge(Stare &s) {
    int id = citesteInt("ID produs de sters: ", 1, 100000);
    int poz = cautaId(s.produse, id);
    if (poz == -1) {
        cout << "Produsul " << id << " nu exista." << endl;
        return;
    }
    if (confirma("Stergi \"" + s.produse[poz].nume + "\"?")) {
        s.produse.erase(s.produse.begin() + poz);
        s.modificat = true;
        cout << "Produs sters." << endl;
    } else {
        cout << "Nu am sters nimic." << endl;
    }
}

void rapoarte(const Stare &s) {
    if (s.produse.empty()) {
        cout << "Inventarul este gol." << endl;
        return;
    }
    double valoare = 0;
    int bucati = 0;
    int n = s.produse.size();
    int scump = 0;
    for (int i = 0; i < n; i++) {
        valoare += s.produse[i].pret * s.produse[i].stoc;
        bucati += s.produse[i].stoc;
        if (s.produse[i].pret > s.produse[scump].pret) {
            scump = i;
        }
    }
    cout << fixed << setprecision(2);
    cout << "Produse diferite: " << n << endl;
    cout << "Bucati in stoc: " << bucati << endl;
    cout << "Valoarea stocului: " << valoare << " lei" << endl;
    cout << "Cel mai scump: " << s.produse[scump].nume << " (" << s.produse[scump].pret << " lei)" << endl;
    cout << "Stoc mic (cel mult " << PRAG_STOC << "):" << endl;
    bool exista = false;
    for (const Produs &p : s.produse) {
        if (p.stoc <= PRAG_STOC) {
            cout << "  " << p.nume << " - " << p.stoc << " buc" << endl;
            exista = true;
        }
    }
    if (!exista) {
        cout << "  (niciun produs)" << endl;
    }
}

bool dupaNume(const Produs &a, const Produs &b) {
    return a.nume < b.nume;
}

bool dupaPret(const Produs &a, const Produs &b) {
    return a.pret < b.pret;
}

bool dupaStoc(const Produs &a, const Produs &b) {
    return a.stoc > b.stoc;
}

void sorteaza(Stare &s) {
    cout << "1. Dupa nume   2. Dupa pret (crescator)   3. Dupa stoc (descrescator)" << endl;
    int alegere = citesteInt("Alege: ", 1, 3);
    if (alegere == 1) {
        sort(s.produse.begin(), s.produse.end(), dupaNume);
    } else if (alegere == 2) {
        sort(s.produse.begin(), s.produse.end(), dupaPret);
    } else {
        sort(s.produse.begin(), s.produse.end(), dupaStoc);
    }
    s.modificat = true;
    cout << "Inventarul a fost sortat." << endl;
}

// ---------- meniu ----------
Optiune meniu() {
    cout << endl;
    cout << "===== MAGAZINUL MEU =====" << endl;
    cout << "1. Afiseaza inventarul" << endl;
    cout << "2. Adauga un produs" << endl;
    cout << "3. Cauta dupa nume" << endl;
    cout << "4. Modifica pret / stoc" << endl;
    cout << "5. Vinde (cu bon)" << endl;
    cout << "6. Sterge un produs" << endl;
    cout << "7. Rapoarte" << endl;
    cout << "8. Sorteaza" << endl;
    cout << "9. Salveaza" << endl;
    cout << "0. Iesire" << endl;
    return (Optiune)citesteInt("Alege: ", 0, 9);
}

int main() {
    Stare s;
    incarca(s);
    cout << "Am incarcat " << s.produse.size() << " produse din " << FISIER << endl;

    bool ruleaza = true;
    while (ruleaza) {
        Optiune o = meniu();
        switch (o) {
            case AFISEAZA:
                afiseazaTot(s);
                break;
            case ADAUGA:
                adauga(s);
                break;
            case CAUTA:
                cauta(s);
                break;
            case MODIFICA:
                modifica(s);
                break;
            case VINDE:
                vinde(s);
                break;
            case STERGE:
                sterge(s);
                break;
            case RAPOARTE:
                rapoarte(s);
                break;
            case SORTEAZA:
                sorteaza(s);
                break;
            case SALVEAZA:
                salveaza(s);
                cout << "Salvat." << endl;
                break;
            case IESIRE:
                if (s.modificat) {
                    if (confirma("Ai modificari nesalvate. Le salvezi?")) {
                        salveaza(s);
                        cout << "Salvat." << endl;
                    }
                }
                ruleaza = false;
                break;
        }
    }

    cout << "La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `2`, `Caiet dictando`, `4.5`, `20`, `2`, `Pix albastru`, `2`, `50`, `2`, `Rucsac scolar`, `120`, `5`, `2`, `pix ALBASTRU`, `1`, `3`, `pix`, `4`, `3`, `2`, `10`, `5`, `1`, `3`, `2`, `60`, `2`, `4`, `9`, `0`, `7`, `8`, `2`, `1`, `6`, `2`, `da`, `0`, `da`):
```
Am incarcat 0 produse din inventar.txt

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 2
Nume produs: Caiet dictando
Pret (lei): 4.5
Stoc (bucati): 20
Produs adaugat cu id 1.

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 2
Nume produs: Pix albastru
Pret (lei): 2
Stoc (bucati): 50
Produs adaugat cu id 2.

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 2
Nume produs: Rucsac scolar
Pret (lei): 120
Stoc (bucati): 5
Produs adaugat cu id 3.

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 2
Nume produs: pix ALBASTRU
Exista deja un produs cu acest nume.

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 1
ID   Produs                    Pret   Stoc
------------------------------------------
1    Caiet dictando            4.50     20
2    Pix albastru              2.00     50
3    Rucsac scolar           120.00      5

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 3
Cauta (o parte din nume): pix
ID   Produs                    Pret   Stoc
------------------------------------------
2    Pix albastru              2.00     50

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 4
ID produs: 3
1. Pret nou   2. Aprovizionare (adauga la stoc)
Alege: 2
Cantitate primita: 10
Stoc nou pentru Rucsac scolar: 15

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 5
ID produs (0 = gata): 1
Cantitate: 3
ID produs (0 = gata): 2
Cantitate: 60
  Stoc insuficient pentru Pix albastru (disponibil: 50).
ID produs (0 = gata): 2
Cantitate: 4
ID produs (0 = gata): 9
  Produsul 9 nu exista.
ID produs (0 = gata): 0

------ BON ------
Caiet dictando   3 x   4.50 =   13.50
Pix albastru     4 x   2.00 =    8.00
-----------------
TOTAL                           21.50 lei

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 7
Produse diferite: 3
Bucati in stoc: 78
Valoarea stocului: 1968.50 lei
Cel mai scump: Rucsac scolar (120.00 lei)
Stoc mic (cel mult 5):
  (niciun produs)

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 8
1. Dupa nume   2. Dupa pret (crescator)   3. Dupa stoc (descrescator)
Alege: 2
Inventarul a fost sortat.

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 1
ID   Produs                    Pret   Stoc
------------------------------------------
2    Pix albastru              2.00     46
1    Caiet dictando            4.50     17
3    Rucsac scolar           120.00     15

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 6
ID produs de sters: 2
Stergi "Pix albastru"? (da/nu): da
Produs sters.

===== MAGAZINUL MEU =====
1. Afiseaza inventarul
2. Adauga un produs
3. Cauta dupa nume
4. Modifica pret / stoc
5. Vinde (cu bon)
6. Sterge un produs
7. Rapoarte
8. Sorteaza
9. Salveaza
0. Iesire
Alege: 0
Ai modificari nesalvate. Le salvezi? (da/nu): da
Salvat.
La revedere!
```

Ce urmărești în transcriere:
- a patra adăugare (`pix ALBASTRU`) este refuzată, pentru că există deja „Pix albastru”, deși literele mari și mici diferă;
- căutarea după `pix` găsește produsul chiar dacă l-ai scris cu litere mici;
- la modificare, produsul `3` primește 10 bucăți în plus;
- la vânzare, cererea de 60 de pixuri este refuzată (stocul e 50), apoi se vând 4; `ID 9` nu există, iar `0` încheie vânzarea și tipărește bonul;
- ștergerea produsului `2` cere confirmare, iar la ieșire aplicația observă că sunt modificări nesalvate și te întreabă dacă le salvezi.

Programul are aproximativ 450 de linii. Nu te speria de lungime: fiecare funcție este scurtă, are un singur rol și un nume care spune ce face. Aplicațiile mari se scriu așa, bucată cu bucată, testând după fiecare.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Magazinul meu” (obligatoriu)
Scrie aplicația din Exemplul 15, pe bucăți: întâi structurile și fișierele, apoi afișarea, apoi adăugarea, apoi restul. După fiecare bucată compilează și testează. Apoi adaugă o opțiune „Șterge toate produsele epuizate” (cu confirmare).

**Pe niveluri (alege-l pe al tău):**
- **De bază:** produs, afișare ca tabel, adăugare, căutare și salvare în fișier (Exemplele 1–4), plus o vânzare simplă (Exemplul 7).
- **Complet:** aplicația din Exemplul 15, cu meniu.
- **Provocare:** Exercițiile B–E (istoric, reducere, alt inventar, categorii).

Un magazin mic, dar care merge fără greșeli, valorează mai mult decât unul mare și neterminat.

### Exercițiul B — Istoric în aplicație *(Provocare, opțional)*
Adaugă în „Magazinul meu” fișierul de istoric din Exemplul 13: la fiecare bon, notează fiecare linie vândută. Adaugă o opțiune „Încasările zilei” care citește fișierul și afișează totalul.

### Exercițiul C — Reducere
Adaugă la opțiunea „Vinde” o reducere: dacă totalul bonului depășește 100 de lei, se aplică 10% reducere, iar bonul arată atât totalul inițial, cât și cel cu reducere.

### Exercițiul D — Alt inventar *(Provocare, opțional)*
Adaptează aplicația la altceva: biblioteca școlii (titlu, autor, exemplare disponibile, cu opțiunile „împrumută” și „returnează”), sau cantina (feluri de mâncare, porții rămase).

### Exercițiul E — Categorii *(Provocare, opțional)*
Adaugă produselor o categorie (de exemplu „papetărie”, „ghiozdane”). Adaugă un raport cu valoarea stocului pentru o categorie citită de la tastatură.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Produsele au `id` unic, iar numele pot avea spații  
- [ ] Toate datele citite sunt validate, iar litere în loc de numere nu strică programul  
- [ ] Ștergerea cere confirmare; ieșirea cu modificări nesalvate întreabă dacă salvezi  
- [ ] Vânzarea nu permite să vinzi mai mult decât ai în stoc  
- [ ] Fișierul se numește `Prenume_Nume_M4L7.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă un cod de bare (un număr de 6 cifre) și caută produsele și după el  
- [ ] Adaugă o opțiune de „Comandă furnizor”: pentru toate produsele sub pragul de stoc, calculează câte bucăți trebuie comandate ca să ajungi la 20  
- [ ] Salvează inventarul și într-un fișier de tip tabel, `inventar.csv` (câmpurile separate prin `;`), ca să-l poți deschide în Excel  
- [ ] Adaugă clienți (nume, puncte de fidelitate) și un bon cu reducere în funcție de puncte  
- [ ] Creează un meniu pentru „Angajat” și „Administrator”: doar administratorul poate șterge produse  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Numele cu spații se citesc doar până la primul spațiu | `cin >> nume` | `getline(cin >> ws, nume)` |
| Produsele se încarcă „deplasate” (nume în loc de preț) | Format diferit la salvare și la încărcare | Folosește aceleași două linii în ambele funcții |
| Două produse cu același `id` | `id = size() + 1` după o ștergere | `id = urmatorId(lista)` (maximul plus 1) |
| Căutarea nu găsește „pix” când numele e „Pix albastru” | Litere mari/mici diferite | Transformă ambele texte în litere mici |
| Stocul devine negativ | Nu ai verificat cantitatea la vânzare | Compară cantitatea cu stocul înainte |
| Bonul arată alt preț decât cel din inventar | Ai citit prețul din alt loc sau ai uitat să înmulțești cu cantitatea | `p.pret * l.cant` |
| După sortare, `id`-urile „se amestecă” | Ai folosit poziția din vector ca id | Identifică produsele după `id`, nu după poziție |
| Datele se pierd la închidere | Nu ai apelat `salveaza` | Salvează la ieșire dacă `modificat` este `true` |
| Valori `inf` sau `nan` | Împărțire la zero (de exemplu media pe un inventar gol) | Verifică `empty()` înainte |

---

## Recapitulare pe scurt

- Fiecare obiect are un **`id` unic**: `urmatorId` = maximul existent plus 1.
- Nume cu spații în fișier: numele pe o linie, restul datelor pe linia următoare; citire cu `getline(fin >> ws, nume)`.
- Căutare parțială, fără să conteze literele: `minuscule(a).find(minuscule(b)) != string::npos`.
- Funcțiile de validare întorc un mesaj de eroare (sau text gol) și se pot testa fără tastatură.
- Vânzarea: verifici existența, cantitatea și stocul; coșul se finalizează la urmă și apoi scazi stocul.
- Rapoartele se calculează dintr-un singur parcurs al vectorului.
- Tabele aliniate: `setw`, `left`, `right`, `fixed`, `setprecision`.
- Istoric cu `ios::app`; copie de siguranță prin citire și scriere linie cu linie.

---

## Temă
1. Refă **Exemplele 1–15** pe calculatorul tău.  
2. Termină exercițiile A, B și unul dintre C–E.  
3. Testează aplicația cu date greșite: litere în loc de numere, nume gol, prețuri negative, ID inexistent, ștergere cu „nu”. Notează într-un comentariu ce ai verificat.  
4. Adaugă un câmp nou produsului (de exemplu „furnizor”) și actualizează funcțiile de salvare și încărcare. Ce trebuie să schimbi în fișier?  
5. **Bonus:** scrie funcția `void importa(Stare &s, const string &fisier)` care adaugă produsele dintr-un alt fișier, fără să dubleze numele existente.  
6. Salvează tot ca `Tema_M4L7_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 8
**Proiect C — Quiz educațional.** Construim un quiz cu întrebări (text, variante, răspuns corect), scor, întrebări amestecate cu `rand()` și rezultate salvate într-un fișier. La final, un quiz despre C++, scris chiar de tine.
