# LECȚIA 8 — Proiect C: quiz educațional
**Modulul 4 · Proiecte și autonomie · 2 ore**  
**Code Maker Club · CodeKids Graduate**

> Azi construim un **quiz**: întrebări cu patru variante, scor, explicații, rezultate salvate într-un fișier și chiar o opțiune prin care oricine poate adăuga întrebări noi, fără să atingă codul. La final vei avea un quiz despre C++, cu întrebări scrise de tine, pe care îl poți da prietenilor.  
> Proiect: **„Quiz C++”** · fișier: `Prenume_Nume_M4L8.cpp` (ex. `Ana_Pop_M4L8.cpp`)

---

## Obiectiv
La finalul orei reprezinți o întrebare cu o structură, citești întrebări dintr-un fișier cu un format stabilit de tine, amesteci întrebările și variantele de răspuns fără să pierzi răspunsul corect, citești răspunsuri sigur (A–D), calculezi scorul, afișezi explicații și salvezi rezultatele într-un fișier.  
**Minim:** un quiz cu întrebări într-un `vector`, scor și mesaj final.  
**Ținta orei (Complet):** + întrebări în fișier, amestecare, explicații, rezultate salvate și adăugare de întrebări noi din meniu.

## De ce contează
Un quiz arată cum o aplicație poate fi **separată de datele ei**: codul rămâne același, iar întrebările stau într-un fișier pe care îl poți schimba oricând. Aceeași idee stă în spatele jocurilor (nivelurile sunt în fișiere), al site-urilor (conținutul stă într-o bază de date) și al aplicațiilor de învățat. Mai e un motiv: azi vei folosi pentru prima dată o structură **cu un tablou în interior** și vei verifica un algoritm de amestecare, nu doar îl vei folosi.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: structuri, fișiere, `rand()` |
| 10–35 | Întrebarea ca structură, răspuns sigur, scor (**Exemplele 1–3**) |
| 35–60 | Întrebări în fișier, validare (**Exemplele 4 și 5**) |
| 60–85 | Amestecare, selecție (**Exemplele 6–8**), scor cu serii (**Exemplul 9**, opțional) |
| 85–100 | Explicații, rezultate, statistici (**Exemplele 10–13**; Exemplul 13 este opțional) |
| 100–118 | Adăugare de întrebări, proiect complet (**Exemplele 14–15**) |
| 118–120 | Predare și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Întrebarea ca structură

O întrebare are un text, patru variante de răspuns (A–D) și indicele variantei corecte. Variantele le păstrăm într-un **tablou cu 4 elemente** chiar în interiorul structurii:

```
struct Intrebare {
    string text;
    string variante[4];
    int corect;           // 0 = A, 1 = B, 2 = C, 3 = D
};
```

### Exemplul 1 — O întrebare, afișată și verificată **[Esențial]**

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

struct Intrebare {
    string text;
    string variante[4];
    int corect;
};

void arata(const Intrebare &q) {
    cout << q.text << endl;
    for (int i = 0; i < 4; i++) {
        cout << "  " << (char)('A' + i) << ") " << q.variante[i] << endl;
    }
}

int main() {
    Intrebare q = {"Ce simbol incheie o instructiune in C++?", {":", ".", ";", ","}, 2};

    arata(q);
    cout << "Raspunsul tau (A-D): ";
    char r;
    cin >> r;
    r = (char)toupper(r);

    if (r - 'A' == q.corect) {
        cout << "Corect!" << endl;
    } else {
        cout << "Gresit. Raspunsul corect este "
             << (char)('A' + q.corect) << ") " << q.variante[q.corect] << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `c`):
```
Ce simbol incheie o instructiune in C++?
  A) :
  B) .
  C) ;
  D) ,
Raspunsul tau (A-D): c
Corect!
```

Două trucuri cu literele: `'A' + i` este codul literei `A` plus `i`, deci pentru `i = 2` obținem `C`. Invers, `r - 'A'` transformă litera `C` în numărul `2`, adică chiar indicele variantei. Cu ele treci ușor între „litera văzută de jucător” și „indicele din tablou”.

### Exemplul 2 — Mai multe întrebări și scorul **[Esențial]**

Punem întrebările într-un `vector`, le punem pe rând și numărăm răspunsurile corecte:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cctype>
using namespace std;

struct Intrebare {
    string text;
    string variante[4];
    int corect;
};

void arata(const Intrebare &q, int nr, int total) {
    cout << endl << "Intrebarea " << nr << "/" << total << ": " << q.text << endl;
    for (int i = 0; i < 4; i++) {
        cout << "  " << (char)('A' + i) << ") " << q.variante[i] << endl;
    }
}

int main() {
    vector<Intrebare> intrebari = {
        {"Ce simbol incheie o instructiune in C++?", {":", ".", ";", ","}, 2},
        {"Ce afiseaza cout << 7 / 2; ?", {"3.5", "3", "4", "3.0"}, 1},
        {"Care este primul indice al unui vector?", {"0", "1", "-1", "depinde"}, 0}
    };

    int scor = 0;
    int total = intrebari.size();
    for (int i = 0; i < total; i++) {
        arata(intrebari[i], i + 1, total);
        cout << "Raspunsul tau (A-D): ";
        char r;
        cin >> r;
        r = (char)toupper(r);
        if (r - 'A' == intrebari[i].corect) {
            cout << "Corect!" << endl;
            scor++;
        } else {
            cout << "Gresit." << endl;
        }
    }

    cout << endl << "Scor final: " << scor << " din " << total << endl;
    return 0;
}
```

**Rulare** (tastezi `C`, `B`, `d`):
```

Intrebarea 1/3: Ce simbol incheie o instructiune in C++?
  A) :
  B) .
  C) ;
  D) ,
Raspunsul tau (A-D): C
Corect!

Intrebarea 2/3: Ce afiseaza cout << 7 / 2; ?
  A) 3.5
  B) 3
  C) 4
  D) 3.0
Raspunsul tau (A-D): B
Corect!

Intrebarea 3/3: Care este primul indice al unui vector?
  A) 0
  B) 1
  C) -1
  D) depinde
Raspunsul tau (A-D): d
Gresit.

Scor final: 2 din 3
```

### Exemplul 3 — Citirea sigură a răspunsului **[Esențial]**

Ce se întâmplă dacă jucătorul scrie `x`, `ab` sau `5`? Programul nu trebuie să considere asta un răspuns. Funcția `citesteRaspuns` repetă întrebarea până primește exact una dintre literele `A`, `B`, `C`, `D` (mari sau mici):

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

char citesteRaspuns() {
    while (true) {
        string s;
        cout << "Raspunsul tau (A-D): ";
        cin >> s;
        if (s.length() == 1) {
            char c = (char)toupper(s[0]);
            if (c >= 'A' && c <= 'D') {
                return c;
            }
        }
        cout << "  Scrie una dintre literele A, B, C sau D." << endl;
    }
}

int main() {
    char r = citesteRaspuns();
    cout << "Ai ales varianta " << r << " (indicele " << r - 'A' << ")." << endl;
    return 0;
}
```

**Rulare** (tastezi `x`, `ab`, `5`, `d`):
```
Raspunsul tau (A-D): x
  Scrie una dintre literele A, B, C sau D.
Raspunsul tau (A-D): ab
  Scrie una dintre literele A, B, C sau D.
Raspunsul tau (A-D): 5
  Scrie una dintre literele A, B, C sau D.
Raspunsul tau (A-D): d
Ai ales varianta D (indicele 3).
```

Citim un `string` și verificăm lungimea, în loc să citim un `char`: dacă ai citi un singur caracter, `ab` ar părea răspunsul `A`, iar restul (`b`) ar rămâne în buffer și ar strica întrebarea următoare.

---

## 2. Întrebările într-un fișier

Dacă întrebările sunt scrise în cod, pentru a adăuga una trebuie să recompilezi programul. Dacă sunt într-un **fișier**, le poate schimba oricine, într-un editor de text. Alegem un format simplu, cu **7 linii pentru fiecare întrebare**:

```
Ce simbol incheie o instructiune in C++?
:
.
;
,
3
Fiecare instructiune se termina cu punct si virgula.
```

Liniile sunt, în ordine: textul întrebării, cele patru variante, **numărul** variantei corecte (1–4) și o explicație. Textul și variantele pot conține spații.

### Exemplul 4 — Încărcarea întrebărilor din fișier **[Esențial]**

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

struct Intrebare {
    string text;
    string variante[4];
    int corect = 0;
    string explicatie;
};

vector<Intrebare> incarca(const string &fisier) {
    vector<Intrebare> lista;
    ifstream fin(fisier);
    Intrebare q;
    while (getline(fin >> ws, q.text)) {
        for (int i = 0; i < 4; i++) {
            getline(fin, q.variante[i]);
        }
        fin >> q.corect;
        q.corect--;                       // in fisier: 1-4, in program: 0-3
        getline(fin >> ws, q.explicatie);
        lista.push_back(q);
    }
    return lista;
}

int main() {
    // pregatim un fisier cu doua intrebari
    ofstream fout("intrebari_test.txt");
    fout << "Ce simbol incheie o instructiune in C++?" << endl;
    fout << ":" << endl << "." << endl << ";" << endl << "," << endl;
    fout << 3 << endl;
    fout << "Fiecare instructiune se termina cu punct si virgula." << endl;
    fout << "Care biblioteca se foloseste pentru fisiere?" << endl;
    fout << "<iostream>" << endl << "<string>" << endl << "<fstream>" << endl << "<vector>" << endl;
    fout << 3 << endl;
    fout << "fstream vine de la file stream." << endl;
    fout.close();

    vector<Intrebare> intrebari = incarca("intrebari_test.txt");
    cout << "Am incarcat " << intrebari.size() << " intrebari." << endl;
    for (const Intrebare &q : intrebari) {
        cout << "- " << q.text << endl;
        cout << "  Raspuns corect: " << q.variante[q.corect] << endl;
        cout << "  Explicatie: " << q.explicatie << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Am incarcat 2 intrebari.
- Ce simbol incheie o instructiune in C++?
  Raspuns corect: ;
  Explicatie: Fiecare instructiune se termina cu punct si virgula.
- Care biblioteca se foloseste pentru fisiere?
  Raspuns corect: <fstream>
  Explicatie: fstream vine de la file stream.
```

Pentru text folosim `getline(fin >> ws, …)`, care sare peste liniile goale rămase. Pentru număr folosim `fin >> q.corect`, iar în fișier numărăm variantele de la 1 (mai firesc pentru cine scrie întrebările), așa că scădem 1 când încărcăm.

### Exemplul 5 — Validarea întrebărilor **[Esențial]**

Un fișier scris de mână poate conține greșeli: un număr de răspuns de 7, o variantă goală, două variante identice. Verificăm fiecare întrebare la încărcare:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Intrebare {
    string text;
    string variante[4];
    int corect = 0;
    string explicatie;
};

string valideaza(const Intrebare &q) {
    if (q.text.empty()) {
        return "textul este gol";
    }
    for (int i = 0; i < 4; i++) {
        if (q.variante[i].empty()) {
            return "varianta " + string(1, (char)('A' + i)) + " este goala";
        }
    }
    for (int i = 0; i < 4; i++) {
        for (int j = i + 1; j < 4; j++) {
            if (q.variante[i] == q.variante[j]) {
                return "variantele " + string(1, (char)('A' + i)) + " si " +
                       string(1, (char)('A' + j)) + " sunt identice";
            }
        }
    }
    if (q.corect < 0 || q.corect > 3) {
        return "raspunsul corect nu este intre 1 si 4";
    }
    return "";
}

int main() {
    Intrebare teste[4] = {
        {"Cat face 2 + 2?", {"3", "4", "5", "6"}, 1, "-"},
        {"Cat face 3 + 3?", {"5", "6", "", "8"}, 1, "-"},
        {"Cat face 1 + 1?", {"2", "3", "2", "4"}, 0, "-"},
        {"Cat face 5 + 5?", {"9", "10", "11", "12"}, 7, "-"}
    };

    for (int i = 0; i < 4; i++) {
        string eroare = valideaza(teste[i]);
        cout << teste[i].text << " -> ";
        if (eroare == "") {
            cout << "valida" << endl;
        } else {
            cout << "INVALIDA: " << eroare << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
Cat face 2 + 2? -> valida
Cat face 3 + 3? -> INVALIDA: varianta C este goala
Cat face 1 + 1? -> INVALIDA: variantele A si C sunt identice
Cat face 5 + 5? -> INVALIDA: raspunsul corect nu este intre 1 si 4
```

`string(1, (char)('A' + i))` creează un text de un singur caracter (litera variantei) ca să-l putem lipi cu `+` de alt text. Perechile `(i, j)` cu `j > i` compară fiecare variantă cu toate cele de după ea, exact o dată.

---

## 3. Amestecare și selecție

Dacă întrebările vin mereu în aceeași ordine, quiz-ul devine plictisitor. Și dacă răspunsul corect e mereu `C`, jucătorul află repede tiparul. Amestecăm și întrebările, și variantele.

**Algoritmul de amestecare (Fisher–Yates):** pornești de la ultimul element și îl schimbi cu unul ales la întâmplare dintre cele rămase (inclusiv el însuși), apoi treci la penultimul și tot așa.

```
pentru i de la n-1 in jos pana la 1:
    j = un numar aleator intre 0 si i
    schimba elementele de pe pozitiile i si j
```

### Exemplul 6 — Amestecarea întrebărilor (cu verificare)

Rezultatul unei amestecări e aleator, deci nu putem compara cu un răspuns fix. Dar putem verifica o **proprietate**: după amestecare, avem exact aceleași elemente (nimic pierdut, nimic duplicat):

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>
#include <ctime>
using namespace std;

void amesteca(vector<int> &v) {
    for (int i = (int)v.size() - 1; i >= 1; i--) {
        int j = rand() % (i + 1);
        swap(v[i], v[j]);
    }
}

int main() {
    srand(time(0));

    vector<int> v = {0, 1, 2, 3, 4, 5, 6, 7};
    amesteca(v);

    cout << "Dupa amestecare:";
    for (int x : v) {
        cout << " " << x;
    }
    cout << endl;

    vector<int> sortat = v;
    sort(sortat.begin(), sortat.end());
    bool pastrat = true;
    for (int i = 0; i < 8; i++) {
        if (sortat[i] != i) {
            pastrat = false;
        }
    }
    if (pastrat) {
        cout << "Verificare: toate cele 8 elemente sunt prezente, o singura data." << endl;
    } else {
        cout << "EROARE: amestecarea a pierdut sau a dublat elemente!" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Dupa amestecare: 4 1 6 2 0 3 5 7
Verificare: toate cele 8 elemente sunt prezente, o singura data.
```

Prima linie (ordinea) este diferită la fiecare rulare, a doua este mereu aceeași. În proiect nu amestecăm direct întrebările, ci un vector de **indici** `0, 1, 2, …`, apoi parcurgem întrebările în ordinea indicilor. Așa vectorul de întrebări rămâne neschimbat.

### Exemplul 7 — Amestecarea variantelor, cu răspunsul corect care „călătorește”

Când amesteci variantele, indicele corect se schimbă. Rețetă sigură: **ține minte textul** răspunsului corect, amestecă, apoi caută textul în noua ordine:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <cstdlib>
#include <ctime>
using namespace std;

struct Intrebare {
    string text;
    string variante[4];
    int corect = 0;
};

void amestecaVariante(Intrebare &q) {
    string raspunsCorect = q.variante[q.corect];

    for (int i = 3; i >= 1; i--) {
        int j = rand() % (i + 1);
        swap(q.variante[i], q.variante[j]);
    }

    for (int i = 0; i < 4; i++) {
        if (q.variante[i] == raspunsCorect) {
            q.corect = i;
        }
    }
}

int main() {
    srand(time(0));

    Intrebare original = {"Care este primul indice al unui vector?", {"0", "1", "-1", "depinde"}, 0};

    bool ok = true;
    int aparitii[4] = {0, 0, 0, 0};
    for (int incercare = 0; incercare < 400; incercare++) {
        Intrebare q = original;
        amestecaVariante(q);
        if (q.variante[q.corect] != "0") {
            ok = false;
        }
        aparitii[q.corect]++;
    }

    if (ok) {
        cout << "Dupa 400 de amestecari, raspunsul corect a fost mereu \"0\"." << endl;
    } else {
        cout << "EROARE: raspunsul corect s-a pierdut!" << endl;
    }

    bool peToatePozitiile = true;
    for (int i = 0; i < 4; i++) {
        if (aparitii[i] == 0) {
            peToatePozitiile = false;
        }
    }
    if (peToatePozitiile) {
        cout << "Raspunsul corect a ajuns pe toate cele 4 pozitii (A, B, C, D)." << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Dupa 400 de amestecari, raspunsul corect a fost mereu "0".
Raspunsul corect a ajuns pe toate cele 4 pozitii (A, B, C, D).
```

A doua linie apare aproape sigur: în 400 de încercări, probabilitatea ca răspunsul corect să nu ajungă niciodată pe una dintre cele patru poziții este practic zero. Programul demonstrează două lucruri: răspunsul corect nu se pierde (`ok`) și variantele chiar se mută (răspunsul corect ajunge pe toate pozițiile).

### Exemplul 8 — Selecția a `k` întrebări distincte

Dacă ai 50 de întrebări și vrei un quiz de 10, amesteci vectorul de indici și iei **primele 10**. Sunt garantat distincte, pentru că un indice apare o singură dată:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>
#include <ctime>
using namespace std;

vector<int> alege(int total, int k) {
    vector<int> indici;
    for (int i = 0; i < total; i++) {
        indici.push_back(i);
    }
    for (int i = total - 1; i >= 1; i--) {
        int j = rand() % (i + 1);
        swap(indici[i], indici[j]);
    }
    indici.resize(k);
    return indici;
}

int main() {
    srand(time(0));

    vector<int> ales = alege(50, 10);
    cout << "Am ales " << ales.size() << " intrebari din 50:";
    for (int x : ales) {
        cout << " " << x + 1;
    }
    cout << endl;

    vector<int> copie = ales;
    sort(copie.begin(), copie.end());
    bool distincte = true;
    for (int i = 1; i < (int)copie.size(); i++) {
        if (copie[i] == copie[i - 1]) {
            distincte = false;
        }
    }
    if (distincte) {
        cout << "Verificare: toate intrebarile alese sunt diferite." << endl;
    } else {
        cout << "EROARE: o intrebare apare de doua ori!" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Am ales 10 intrebari din 50: 40 8 32 46 30 39 31 3 34 15
Verificare: toate intrebarile alese sunt diferite.
```

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

### Exemplul 9 — Scor cu serie (bonus pentru răspunsuri la rând) *(Provocare, opțional)*

Un scor interesant răsplătește constanța. Reguli: fiecare răspuns corect valorează 10 puncte, plus 5 puncte bonus pentru fiecare răspuns corect **consecutiv** de dinainte (serie). Un răspuns greșit pune seria la zero. Funcția primește seria prin referință și o actualizează:

```cpp
#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

int puncte(bool corect, int &serie) {
    if (!corect) {
        serie = 0;
        return 0;
    }
    int p = 10 + 5 * serie;
    serie++;
    return p;
}

int main() {
    string raspunsuri = "CCGCCCGC";   // C = corect, G = gresit
    int serie = 0;
    int total = 0;

    cout << "Nr | Rasp. | Puncte | Total" << endl;
    int n = raspunsuri.length();
    for (int i = 0; i < n; i++) {
        bool corect = (raspunsuri[i] == 'C');
        int p = puncte(corect, serie);
        total += p;
        cout << setw(2) << i + 1 << " |   " << raspunsuri[i] << "   | " << setw(6) << p
             << " | " << setw(5) << total << endl;
    }
    cout << "Scor final: " << total << " puncte" << endl;
    return 0;
}
```

**Ieșire:**
```
Nr | Rasp. | Puncte | Total
 1 |   C   |     10 |    10
 2 |   C   |     15 |    25
 3 |   G   |      0 |    25
 4 |   C   |     10 |    35
 5 |   C   |     15 |    50
 6 |   C   |     20 |    70
 7 |   G   |      0 |    70
 8 |   C   |     10 |    80
Scor final: 80 puncte
```

Observă: după primul `G`, seria revine la 0 și bonusul crește din nou de la început. Cele trei răspunsuri corecte consecutive (4–6) dau `10 + 15 + 20 = 45` de puncte.

---

## 4. Explicații, rezultate, statistici

### Exemplul 10 — Feedback cu explicație **[Esențial]**

Un quiz bun **învață**: după fiecare răspuns arată de ce era corectă o variantă. Folosim câmpul `explicatie`:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Intrebare {
    string text;
    string variante[4];
    int corect = 0;
    string explicatie;
};

void feedback(const Intrebare &q, int ales) {
    if (ales == q.corect) {
        cout << "  Corect! " << q.explicatie << endl;
    } else {
        cout << "  Gresit. Raspunsul corect era " << (char)('A' + q.corect)
             << ") " << q.variante[q.corect] << "." << endl;
        cout << "  " << q.explicatie << endl;
    }
}

int main() {
    Intrebare q = {
        "Ce afiseaza cout << 7 / 2; ?",
        {"3.5", "3", "4", "3.0"},
        1,
        "Impartirea a doua numere intregi ramane intreaga: 7 / 2 = 3."
    };

    cout << q.text << endl;
    cout << "Daca raspunzi B:" << endl;
    feedback(q, 1);
    cout << "Daca raspunzi A:" << endl;
    feedback(q, 0);
    return 0;
}
```

**Ieșire:**
```
Ce afiseaza cout << 7 / 2; ?
Daca raspunzi B:
  Corect! Impartirea a doua numere intregi ramane intreaga: 7 / 2 = 3.
Daca raspunzi A:
  Gresit. Raspunsul corect era B) 3.
  Impartirea a doua numere intregi ramane intreaga: 7 / 2 = 3.
```

### Exemplul 11 — Calificativul **[Esențial]**

La final, jucătorul vrea un verdict. O funcție transformă procentul într-un calificativ. Verificăm funcția pe un tabel de valori:

```cpp
#include <iostream>
#include <string>
using namespace std;

string calificativ(int procent) {
    if (procent >= 90) {
        return "Excelent!";
    }
    if (procent >= 70) {
        return "Foarte bine!";
    }
    if (procent >= 50) {
        return "Bine, mai exerseaza putin.";
    }
    return "Hai sa mai invatam impreuna!";
}

int procent(int scor, int total) {
    if (total == 0) {
        return 0;
    }
    return scor * 100 / total;
}

int main() {
    int scoruri[6] = {10, 9, 7, 5, 3, 0};
    for (int i = 0; i < 6; i++) {
        int p = procent(scoruri[i], 10);
        cout << scoruri[i] << "/10 = " << p << "% -> " << calificativ(p) << endl;
    }
    cout << "0/0 = " << procent(0, 0) << "% (fara impartire la zero)" << endl;
    return 0;
}
```

**Ieșire:**
```
10/10 = 100% -> Excelent!
9/10 = 90% -> Excelent!
7/10 = 70% -> Foarte bine!
5/10 = 50% -> Bine, mai exerseaza putin.
3/10 = 30% -> Hai sa mai invatam impreuna!
0/10 = 0% -> Hai sa mai invatam impreuna!
0/0 = 0% (fara impartire la zero)
```

### Exemplul 12 — Rezultate salvate și statistici

Fiecare rezultat se adaugă într-un fișier (`ios::app`). Apoi citim tot istoricul și aflăm cel mai bun rezultat și media procentelor:

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <cstdio>
#include <iomanip>
using namespace std;

const string REZULTATE = "rezultate_test.txt";

void salveazaRezultat(const string &nume, int scor, int total) {
    ofstream fout(REZULTATE, ios::app);
    fout << nume << " " << scor << " " << total << endl;
}

int main() {
    remove(REZULTATE.c_str());

    salveazaRezultat("Ana", 8, 10);
    salveazaRezultat("Bogdan", 6, 10);
    salveazaRezultat("Carmen", 10, 10);
    salveazaRezultat("Dan", 4, 8);

    ifstream fin(REZULTATE);
    string nume;
    int scor;
    int total;
    int jocuri = 0;
    double sumaProcente = 0;
    string cel_mai_bun = "";
    double procentMax = -1;

    while (fin >> nume >> scor >> total) {
        double p = 100.0 * scor / total;
        jocuri++;
        sumaProcente += p;
        if (p > procentMax) {
            procentMax = p;
            cel_mai_bun = nume;
        }
    }

    cout << fixed << setprecision(1);
    cout << "Jocuri jucate: " << jocuri << endl;
    cout << "Media procentelor: " << sumaProcente / jocuri << "%" << endl;
    cout << "Cel mai bun: " << cel_mai_bun << " (" << procentMax << "%)" << endl;
    return 0;
}
```

**Ieșire:**
```
Jocuri jucate: 4
Media procentelor: 72.5%
Cel mai bun: Carmen (100.0%)
```

Am salvat și scorul, și totalul, pentru că procentul se calculează din amândouă: `4 din 8` este mai bun decât `6 din 10`.

### Exemplul 13 — Care întrebare este cea mai grea? *(Provocare, opțional)*

Dacă ai rezultatele mai multor jucători, poți calcula pentru fiecare întrebare câți au răspuns corect. Folosim un tablou bidimensional cu un rând pentru fiecare jucător și o coloană pentru fiecare întrebare (`1` = corect, `0` = greșit):

```cpp
#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    const int JUCATORI = 5;
    const int INTREBARI = 4;
    int rezultate[JUCATORI][INTREBARI] = {
        {1, 1, 0, 1},
        {1, 0, 0, 1},
        {1, 1, 0, 0},
        {1, 1, 1, 1},
        {0, 1, 0, 1}
    };

    int celMaiGreaua = 0;
    int minimCorecte = JUCATORI + 1;

    cout << fixed << setprecision(0);
    for (int q = 0; q < INTREBARI; q++) {
        int corecte = 0;
        for (int j = 0; j < JUCATORI; j++) {
            corecte += rezultate[j][q];
        }
        cout << "Intrebarea " << q + 1 << ": " << corecte << " din " << JUCATORI
             << " au raspuns corect (" << 100.0 * corecte / JUCATORI << "%)" << endl;
        if (corecte < minimCorecte) {
            minimCorecte = corecte;
            celMaiGreaua = q;
        }
    }
    cout << "Cea mai grea intrebare: nr. " << celMaiGreaua + 1 << endl;
    return 0;
}
```

**Ieșire:**
```
Intrebarea 1: 4 din 5 au raspuns corect (80%)
Intrebarea 2: 4 din 5 au raspuns corect (80%)
Intrebarea 3: 1 din 5 au raspuns corect (20%)
Intrebarea 4: 4 din 5 au raspuns corect (80%)
Cea mai grea intrebare: nr. 3
```

Un tablou `rezultate[JUCATORI][INTREBARI]` se parcurge cu două bucle: cea din afară alege coloana (întrebarea), cea dinăuntru trece prin toți jucătorii. Pe cele două dimensiuni ți le imaginezi ca un tabel: rânduri = jucători, coloane = întrebări.

---

## 5. Adăugarea de întrebări și proiectul

### Exemplul 14 — Programul îți permite să scrii întrebări noi

Cea mai frumoasă parte: utilizatorul scrie întrebări direct din program, iar ele se adaugă în fișier, în formatul pe 7 linii. Din acel moment, fac parte din quiz:

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <cctype>
using namespace std;

struct Intrebare {
    string text;
    string variante[4];
    int corect = 0;
    string explicatie;
};

string citesteText(const string &mesaj) {
    string s;
    cout << mesaj;
    getline(cin >> ws, s);
    return s;
}

Intrebare citesteIntrebare() {
    Intrebare q;
    q.text = citesteText("Textul intrebarii: ");
    for (int i = 0; i < 4; i++) {
        string mesaj = string("Varianta ") + (char)('A' + i) + ": ";
        q.variante[i] = citesteText(mesaj);
    }
    string r = citesteText("Care varianta e corecta (A-D)? ");
    q.corect = toupper(r[0]) - 'A';
    q.explicatie = citesteText("Explicatie: ");
    return q;
}

void adaugaInFisier(const Intrebare &q, const string &fisier) {
    ofstream fout(fisier, ios::app);
    fout << q.text << endl;
    for (int i = 0; i < 4; i++) {
        fout << q.variante[i] << endl;
    }
    fout << q.corect + 1 << endl;
    fout << q.explicatie << endl;
}

int main() {
    Intrebare q = citesteIntrebare();
    adaugaInFisier(q, "intrebari_noi.txt");
    cout << endl << "Am adaugat intrebarea. Continutul fisierului:" << endl;

    ifstream fin("intrebari_noi.txt");
    string linie;
    while (getline(fin, linie)) {
        cout << "  | " << linie << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `Care este rezultatul lui 2 + 2?`, `3`, `4`, `5`, `6`, `b`, `Suma lui 2 cu 2 este 4.`):
```
Textul intrebarii: Care este rezultatul lui 2 + 2?
Varianta A: 3
Varianta B: 4
Varianta C: 5
Varianta D: 6
Care varianta e corecta (A-D)? b
Explicatie: Suma lui 2 cu 2 este 4.

Am adaugat intrebarea. Continutul fisierului:
  | Care este rezultatul lui 2 + 2?
  | 3
  | 4
  | 5
  | 6
  | 2
  | Suma lui 2 cu 2 este 4.
```

Aici se vede avantajul formatului de fișier: codul `adaugaInFisier` este scurt, iar `incarca` din Exemplul 4 poate citi imediat ce s-a scris. Observă că `q.corect + 1` se scrie în fișier (numărarea de la 1), exact invers față de încărcare.

> Nu pune explicația goală: `incarca` citește fiecare întrebare pe 7 linii, iar o linie lipsă ar dezordona toate întrebările următoare. În proiect, dacă utilizatorul nu scrie nimic, folosim `-`.

### Exemplul 15 — „Quiz C++” (mini-proiect) **[Esențial]**

Aplicația completă: meniu, 10 întrebări implicite despre C++ (create automat în fișier, la prima rulare), număr de întrebări ales de jucător, amestecare opțională, explicații, recapitulare a greșelilor, rezultate salvate, clasament și adăugare de întrebări noi.

```cpp
/*
   Program: Quiz C++
   Scop:    quiz cu intrebari in fisier, scor, explicatii, rezultate salvate
*/
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <limits>
#include <cctype>
#include <cstdlib>
#include <ctime>
#include <iomanip>
using namespace std;

// ---------- structuri ----------
struct Intrebare {
    string text;
    string variante[4];
    int corect = 0;
    string explicatie;
};

struct Rezultat {
    string nume;
    int scor = 0;
    int total = 0;
};

const string FISIER_INTREBARI = "intrebari_cpp.txt";
const string FISIER_REZULTATE = "rezultate_quiz.txt";

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

char citesteRaspuns() {
    while (true) {
        string s;
        cout << "Raspunsul tau (A-D): ";
        cin >> s;
        if (s.length() == 1) {
            char c = (char)toupper(s[0]);
            if (c >= 'A' && c <= 'D') {
                return c;
            }
        }
        cout << "  Scrie una dintre literele A, B, C sau D." << endl;
    }
}

// ---------- intrebari ----------
vector<Intrebare> implicite() {
    return {
        {"Ce simbol incheie o instructiune in C++?", {":", ".", ";", ","}, 2,
         "Fiecare instructiune se termina cu punct si virgula."},
        {"Ce afiseaza cout << 7 / 2; ?", {"3.5", "3", "4", "3.0"}, 1,
         "Impartirea a doua numere intregi ramane intreaga: 7 / 2 = 3."},
        {"Ce operator da restul impartirii?", {"/", "%", "*", "#"}, 1,
         "Operatorul % (modulo) da restul: 7 % 2 = 1."},
        {"Ce tip de date folosesti pentru un numar cu zecimale?", {"int", "double", "char", "bool"}, 1,
         "double (sau float) retine numere cu zecimale."},
        {"Care bucla se executa cel putin o data?", {"for", "while", "do-while", "if"}, 2,
         "do-while verifica conditia dupa ce executa corpul."},
        {"Care este primul indice al unui vector?", {"0", "1", "-1", "depinde"}, 0,
         "Indicii incep de la 0: v[0] este primul element."},
        {"Ce face v.push_back(5); ?", {"sterge ultimul element", "adauga 5 la sfarsit", "sorteaza vectorul", "goleste vectorul"}, 1,
         "push_back adauga o valoare la sfarsitul vectorului."},
        {"Ce biblioteca folosesti pentru fisiere?", {"<iostream>", "<string>", "<fstream>", "<vector>"}, 2,
         "fstream vine de la file stream."},
        {"Cu ce cuvant cheie definesti o structura?", {"class", "struct", "enum", "void"}, 1,
         "struct grupeaza mai multe campuri intr-un tip nou."},
        {"Ce valoare intoarce main() daca programul s-a terminat corect?", {"1", "0", "-1", "nimic"}, 1,
         "Prin conventie, return 0; inseamna ca totul a mers bine."}
    };
}

void salveazaIntrebari(const vector<Intrebare> &lista) {
    ofstream fout(FISIER_INTREBARI);
    for (const Intrebare &q : lista) {
        fout << q.text << endl;
        for (int i = 0; i < 4; i++) {
            fout << q.variante[i] << endl;
        }
        fout << q.corect + 1 << endl;
        fout << q.explicatie << endl;
    }
}

vector<Intrebare> incarcaIntrebari() {
    vector<Intrebare> lista;
    ifstream fin(FISIER_INTREBARI);
    Intrebare q;
    while (getline(fin >> ws, q.text)) {
        for (int i = 0; i < 4; i++) {
            getline(fin, q.variante[i]);
        }
        fin >> q.corect;
        q.corect--;
        getline(fin >> ws, q.explicatie);
        if (q.corect >= 0 && q.corect <= 3) {
            lista.push_back(q);
        }
    }
    if (lista.empty()) {
        lista = implicite();
        salveazaIntrebari(lista);
    }
    return lista;
}

void adaugaIntrebare(vector<Intrebare> &lista) {
    Intrebare q;
    q.text = citesteText("Textul intrebarii: ");
    for (int i = 0; i < 4; i++) {
        string mesaj = string("Varianta ") + (char)('A' + i) + ": ";
        q.variante[i] = citesteText(mesaj);
    }
    for (int i = 0; i < 4; i++) {
        for (int j = i + 1; j < 4; j++) {
            if (q.variante[i] == q.variante[j]) {
                cout << "Doua variante sunt identice. Intrebarea nu a fost adaugata." << endl;
                return;
            }
        }
    }
    string r;
    while (true) {
        r = citesteText("Care varianta e corecta (A-D)? ");
        char c = (char)toupper(r[0]);
        if (r.length() == 1 && c >= 'A' && c <= 'D') {
            q.corect = c - 'A';
            break;
        }
        cout << "  Scrie una dintre literele A, B, C sau D." << endl;
    }
    q.explicatie = citesteText("Explicatie (sau - ): ");
    lista.push_back(q);
    salveazaIntrebari(lista);
    cout << "Intrebarea a fost adaugata. Acum sunt " << lista.size() << " intrebari." << endl;
}

// ---------- amestecare ----------
void amesteca(vector<int> &v) {
    for (int i = (int)v.size() - 1; i >= 1; i--) {
        int j = rand() % (i + 1);
        swap(v[i], v[j]);
    }
}

void amestecaVariante(Intrebare &q) {
    string raspunsCorect = q.variante[q.corect];
    for (int i = 3; i >= 1; i--) {
        int j = rand() % (i + 1);
        swap(q.variante[i], q.variante[j]);
    }
    for (int i = 0; i < 4; i++) {
        if (q.variante[i] == raspunsCorect) {
            q.corect = i;
        }
    }
}

// ---------- rezultate ----------
string calificativ(int procent) {
    if (procent >= 90) {
        return "Excelent!";
    }
    if (procent >= 70) {
        return "Foarte bine!";
    }
    if (procent >= 50) {
        return "Bine, mai exerseaza putin.";
    }
    return "Hai sa mai invatam impreuna!";
}

void salveazaRezultat(const Rezultat &r) {
    ofstream fout(FISIER_REZULTATE, ios::app);
    fout << r.nume << " " << r.scor << " " << r.total << endl;
}

int procentul(const Rezultat &r) {
    if (r.total == 0) {
        return 0;
    }
    return r.scor * 100 / r.total;
}

bool maiBun(const Rezultat &a, const Rezultat &b) {
    return procentul(a) > procentul(b);
}

void afiseazaClasament() {
    vector<Rezultat> lista;
    ifstream fin(FISIER_REZULTATE);
    Rezultat r;
    while (fin >> r.nume >> r.scor >> r.total) {
        lista.push_back(r);
    }
    cout << endl << "=== CLASAMENT (top 5) ===" << endl;
    if (lista.empty()) {
        cout << "Nu exista rezultate inca." << endl;
        return;
    }
    stable_sort(lista.begin(), lista.end(), maiBun);
    int n = lista.size();
    if (n > 5) {
        n = 5;
    }
    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". " << left << setw(10) << lista[i].nume << right
             << lista[i].scor << "/" << lista[i].total << "  (" << procentul(lista[i]) << "%)" << endl;
    }
}

// ---------- jocul ----------
void joaca(const vector<Intrebare> &toate) {
    int disponibile = toate.size();
    int k = citesteInt("Cate intrebari vrei (1-" + to_string(disponibile) + ")? ", 1, disponibile);
    bool amestecat = confirma("Amesteci intrebarile si variantele?");

    vector<int> ordine;
    for (int i = 0; i < disponibile; i++) {
        ordine.push_back(i);
    }
    if (amestecat) {
        amesteca(ordine);
    }
    ordine.resize(k);

    Rezultat rez;
    cout << "Numele tau (fara spatii): ";
    cin >> rez.nume;
    rez.total = k;

    vector<int> gresite;   // indicii (in 'ordine') ale intrebarilor la care ai gresit
    vector<Intrebare> puse;
    for (int pas = 0; pas < k; pas++) {
        Intrebare q = toate[ordine[pas]];
        if (amestecat) {
            amestecaVariante(q);
        }
        cout << endl << "Intrebarea " << pas + 1 << "/" << k << ": " << q.text << endl;
        for (int i = 0; i < 4; i++) {
            cout << "  " << (char)('A' + i) << ") " << q.variante[i] << endl;
        }
        char r = citesteRaspuns();
        if (r - 'A' == q.corect) {
            cout << "  Corect! " << q.explicatie << endl;
            rez.scor++;
        } else {
            cout << "  Gresit. Raspunsul corect: " << (char)('A' + q.corect) << ") "
                 << q.variante[q.corect] << endl;
            cout << "  " << q.explicatie << endl;
            gresite.push_back(pas);
        }
        puse.push_back(q);
    }

    int p = procentul(rez);
    cout << endl << "==== REZULTAT ====" << endl;
    cout << rez.nume << ", ai raspuns corect la " << rez.scor << " din " << rez.total
         << " (" << p << "%)." << endl;
    cout << calificativ(p) << endl;

    if (!gresite.empty()) {
        cout << endl << "De revizuit:" << endl;
        for (int pas : gresite) {
            cout << " - " << puse[pas].text << " -> " << puse[pas].variante[puse[pas].corect] << endl;
        }
    }
    salveazaRezultat(rez);
}

int main() {
    srand(time(0));
    vector<Intrebare> intrebari = incarcaIntrebari();

    int optiune;
    do {
        cout << endl;
        cout << "===== QUIZ C++ (" << intrebari.size() << " intrebari) =====" << endl;
        cout << "1. Joaca" << endl;
        cout << "2. Adauga o intrebare" << endl;
        cout << "3. Clasament" << endl;
        cout << "0. Iesire" << endl;
        optiune = citesteInt("Alege: ", 0, 3);

        if (optiune == 1) {
            joaca(intrebari);
        } else if (optiune == 2) {
            adaugaIntrebare(intrebari);
        } else if (optiune == 3) {
            afiseazaClasament();
        }
    } while (optiune != 0);

    cout << "Pe curand!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1`, `5`, `nu`, `Ana`, `C`, `B`, `A`, `b`, `x`, `C`, `3`, `2`, `Care este rezultatul lui 2 + 2?`, `3`, `4`, `5`, `6`, `B`, `Suma lui 2 cu 2 este 4.`, `1`, `1`, `nu`, `Bob`, `B`, `3`, `0`):
```

===== QUIZ C++ (10 intrebari) =====
1. Joaca
2. Adauga o intrebare
3. Clasament
0. Iesire
Alege: 1
Cate intrebari vrei (1-10)? 5
Amesteci intrebarile si variantele? (da/nu): nu
Numele tau (fara spatii): Ana

Intrebarea 1/5: Ce simbol incheie o instructiune in C++?
  A) :
  B) .
  C) ;
  D) ,
Raspunsul tau (A-D): C
  Corect! Fiecare instructiune se termina cu punct si virgula.

Intrebarea 2/5: Ce afiseaza cout << 7 / 2; ?
  A) 3.5
  B) 3
  C) 4
  D) 3.0
Raspunsul tau (A-D): B
  Corect! Impartirea a doua numere intregi ramane intreaga: 7 / 2 = 3.

Intrebarea 3/5: Ce operator da restul impartirii?
  A) /
  B) %
  C) *
  D) #
Raspunsul tau (A-D): A
  Gresit. Raspunsul corect: B) %
  Operatorul % (modulo) da restul: 7 % 2 = 1.

Intrebarea 4/5: Ce tip de date folosesti pentru un numar cu zecimale?
  A) int
  B) double
  C) char
  D) bool
Raspunsul tau (A-D): b
  Corect! double (sau float) retine numere cu zecimale.

Intrebarea 5/5: Care bucla se executa cel putin o data?
  A) for
  B) while
  C) do-while
  D) if
Raspunsul tau (A-D): x
  Scrie una dintre literele A, B, C sau D.
Raspunsul tau (A-D): C
  Corect! do-while verifica conditia dupa ce executa corpul.

==== REZULTAT ====
Ana, ai raspuns corect la 4 din 5 (80%).
Foarte bine!

De revizuit:
 - Ce operator da restul impartirii? -> %

===== QUIZ C++ (10 intrebari) =====
1. Joaca
2. Adauga o intrebare
3. Clasament
0. Iesire
Alege: 3

=== CLASAMENT (top 5) ===
1. Ana       4/5  (80%)

===== QUIZ C++ (10 intrebari) =====
1. Joaca
2. Adauga o intrebare
3. Clasament
0. Iesire
Alege: 2
Textul intrebarii: Care este rezultatul lui 2 + 2?
Varianta A: 3
Varianta B: 4
Varianta C: 5
Varianta D: 6
Care varianta e corecta (A-D)? B
Explicatie (sau - ): Suma lui 2 cu 2 este 4.
Intrebarea a fost adaugata. Acum sunt 11 intrebari.

===== QUIZ C++ (11 intrebari) =====
1. Joaca
2. Adauga o intrebare
3. Clasament
0. Iesire
Alege: 1
Cate intrebari vrei (1-11)? 1
Amesteci intrebarile si variantele? (da/nu): nu
Numele tau (fara spatii): Bob

Intrebarea 1/1: Ce simbol incheie o instructiune in C++?
  A) :
  B) .
  C) ;
  D) ,
Raspunsul tau (A-D): B
  Gresit. Raspunsul corect: C) ;
  Fiecare instructiune se termina cu punct si virgula.

==== REZULTAT ====
Bob, ai raspuns corect la 0 din 1 (0%).
Hai sa mai invatam impreuna!

De revizuit:
 - Ce simbol incheie o instructiune in C++? -> ;

===== QUIZ C++ (11 intrebari) =====
1. Joaca
2. Adauga o intrebare
3. Clasament
0. Iesire
Alege: 3

=== CLASAMENT (top 5) ===
1. Ana       4/5  (80%)
2. Bob       0/1  (0%)

===== QUIZ C++ (11 intrebari) =====
1. Joaca
2. Adauga o intrebare
3. Clasament
0. Iesire
Alege: 0
Pe curand!
```

Urmărește transcrierea:
- prima partidă are 5 întrebări, **fără amestecare** (ordinea e cea din fișier), ca rezultatul să se poată urmări; răspunsul `x` este respins și întrebat din nou;
- la a treia întrebare jucătorul greșește, iar programul arată răspunsul corect și explicația; la final, întrebarea apare în „De revizuit”;
- apoi adăugăm o întrebare nouă (din meniu); ea intră în fișier și în quiz imediat;
- ultima partidă are o singură întrebare, la care răspunsul este greșit;
- clasamentul sortează după **procent**, nu după scorul brut.

Dacă la „Amesteci întrebările?” răspunzi `da`, întrebările și variantele vin în altă ordine la fiecare joc.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Quiz C++” (obligatoriu)
Scrie aplicația din Exemplul 15. Apoi adaugă **cel puțin 10 întrebări noi** despre ce ai învățat în cursul de C++ (din meniu sau direct în fișier) și joacă-l cu un coleg.

**Pe niveluri (alege-l pe al tău):**
- **De bază:** un quiz cu întrebări într-un `vector`, scor și mesaj final (Exemplele 1–3).
- **Complet:** întrebările din fișier, rezultate salvate și explicații (Exemplele 4–5, 10–12), cu aplicația din Exemplul 15.
- **Provocare:** scor cu serie, întrebări pe teme, ștergerea unei întrebări.

### Exercițiul B — Quiz pe teme *(Provocare, opțional)*
Adaugă fiecărei întrebări o categorie („Bazele”, „Bucle”, „Funcții”, „Fișiere”). La început, jucătorul poate alege o categorie sau „toate”.

### Exercițiul C — Timp
Măsoară cât durează un joc cu `time(0)` (la început și la sfârșit) și afișează durata în secunde. Salvează și durata în fișierul de rezultate.

### Exercițiul D — Ștergerea unei întrebări *(Provocare, opțional)*
Adaugă în meniu „Șterge o întrebare”: afișează lista numerotată, cere numărul, confirmă și actualizează fișierul.

### Exercițiul E — Un alt quiz
Schimbă subiectul (de exemplu „Animale”, „Geografie”, „Matematică”) doar prin modificarea fișierului de întrebări. Ce parte din cod ai schimbat? (Ideal: niciuna.)

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Întrebările se încarcă dintr-un fișier, iar dacă fișierul lipsește se creează cel implicit  
- [ ] Răspunsurile invalide sunt respinse  
- [ ] Amestecarea păstrează răspunsul corect  
- [ ] Rezultatele se salvează și se vede un clasament  
- [ ] Fișierul se numește `Prenume_Nume_M4L8.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă nivele de dificultate (ușor, mediu, greu) și alege întrebări doar de nivelul dorit  
- [ ] Adaugă o variantă „50/50”: o dată pe joc, jucătorul poate elimina două variante greșite  
- [ ] Salvează și data jocului (folosește `time(0)`) și afișează „cel mai recent rezultat”  
- [ ] Permite întrebări cu răspuns scris (de exemplu „Câte litere are cuvântul `vector`?”), comparate fără diferență între litere mari și mici  
- [ ] Fă un mod „duel”: doi jucători răspund pe rând, iar câștigă cine are scorul mai mare  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Toate întrebările se încarcă „deplasate” | Format diferit în fișier față de cel așteptat (o linie lipsă) | Fiecare întrebare are exact 7 linii |
| Răspunsul corect este mereu cu o poziție în plus | În fișier numeri de la 1, în program de la 0 | Scazi 1 la încărcare, adaugi 1 la salvare |
| După amestecarea variantelor, răspunsul corect e greșit | Ai păstrat vechiul indice | Ține minte textul corect și caută-l după amestecare |
| Aceeași întrebare apare de două ori | Ai ales indici cu `rand()` direct, fără amestecare | Amestecă vectorul de indici și ia primii `k` |
| Răspunsul `ab` este acceptat sau strică întrebarea următoare | Ai citit un `char` în loc de un `string` | Citește un `string` și verifică lungimea |
| Primul răspuns este sărit după ce ai citit numărul de întrebări | A rămas un Enter în buffer | `citesteInt` curăță linia; folosește `getline(cin >> ws, …)` |
| Procentul iese `0` deși ai răspunsuri corecte | Împărțire între întregi: `scor / total * 100` | `scor * 100 / total` |
| Clasamentul se sortează după scor brut | Comparator pe `scor` în loc de procent | Compară procentele |
| Quiz-ul se oprește dacă fișierul e gol | Nu ai tratat lista goală | Dacă nu s-au încărcat întrebări, creează fișierul implicit |

---

## Recapitulare pe scurt

- Întrebarea: `struct` cu text, `string variante[4]`, indicele corect și o explicație.
- Litera `'A' + i` ↔ indicele `r - 'A'`.
- Răspunsul se citește ca `string` și se verifică lungimea și intervalul `A–D`.
- Fișierul de întrebări: 7 linii pe întrebare; la încărcare scazi 1 din numărul răspunsului corect, la salvare adaugi 1.
- **Amestecare (Fisher–Yates):** `for (i = n-1; i >= 1; i--) swap(v[i], v[rand() % (i+1)]);`. Amesteci un vector de **indici**, nu datele.
- După amestecarea variantelor, găsești din nou răspunsul corect după **text**.
- Procent: `scor * 100 / total`; calificativ prin `if` în cascadă.
- Rezultatele se adaugă cu `ios::app`; clasamentul se sortează după procent.
- Datele (întrebările) stau separat de cod: aplicația se schimbă fără recompilare.

---

## Temă
1. Refă **Exemplele 1–15** pe calculatorul tău.  
2. Termină exercițiile A și E. Un coleg trebuie să poată juca quiz-ul tău fără să-l ghidezi.  
3. Alege un subiect care îți place (jocuri, animale, fotbal, spațiu) și scrie 15 întrebări cu explicații.  
4. Scrie un program separat care **verifică** un fișier de întrebări: afișează câte întrebări sunt valide și, pentru cele invalide, motivul (folosește `valideaza` din Exemplul 5).  
5. **Bonus:** adaugă un clasament separat pentru fiecare jucător (cel mai bun rezultat al fiecărui nume).  
6. Salvează tot ca `Tema_M4L8_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 9
Avem trei proiecte funcționale. Acum le facem **mai bune**: curățăm codul (funcții scurte, nume clare, fără repetiții), adăugăm comentarii utile, testăm sistematic și învățăm cum prezinți un proiect în fața altora, într-o demonstrație de 3 minute.
