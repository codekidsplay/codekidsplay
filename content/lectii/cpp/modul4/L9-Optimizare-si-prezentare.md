# LECȚIA 9 — Optimizare, cod curat și pregătirea prezentării
**Modulul 4 · Proiecte și autonomie · 2 ore**  
**Code Kids Play · CodeKids Graduate**

> Ai trei proiecte care merg. Azi le facem **mai bune**, fără să le schimbăm funcționalitatea: curățăm codul (nume clare, funcții scurte, fără repetiții), învățăm ce înseamnă un program „rapid” și cum îl măsori, scriem teste care îți spun când ai stricat ceva și pregătim o **demonstrație de 3 minute** pentru lecția finală. Un program bun nu doar funcționează, ci poate fi citit, testat și arătat altora.  
> Proiect: **„Curățenie și demo”** · fișier: `Prenume_Nume_M4L9.cpp` (ex. `Ana_Pop_M4L9.cpp`)

---

## Obiectiv
La finalul orei refactorizezi un program (aceeași funcționalitate, cod mai clar), înlocuiești numerele „magice” cu constante, elimini repetițiile, scrii teste automate pentru funcțiile tale, compari doi algoritmi numărând operațiile și măsurând timpul, scrii comentarii utile și pregătești o demonstrație.  
**Minim:** un program refactorizat în funcții cu nume clare, plus un set de teste.  
**Ținta orei (Complet):** + proiectul tău preferat curățat, cu antet și comentarii, un mod de demonstrație și un script de prezentare de 3 minute.

## De ce contează
Programatorii profesioniști petrec mult mai mult timp **citind** cod decât scriind. Cu cât codul tău e mai clar, cu atât îl corectezi mai repede, îl extinzi mai ușor și îl poți explica altora. Iar în proiectul RPG din Modulul 5, cu sute de linii de cod, diferența dintre „cod curat” și „cod încâlcit” decide dacă mai poți lucra la el în a treia săptămână.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Ce înseamnă cod bun |
| 10–45 | Refactorizare: nume, constante, funcții, repetiții (**Exemplele 1–7**) |
| 45–70 | Optimizare: ce e rapid și cum măsori (**Exemplele 8–11**; Exemplele 10 și 11 sunt opționale) |
| 70–90 | Teste automate, testarea citirii (**Exemplele 12 și 13**) |
| 90–105 | Comentarii, mod demo (**Exemplele 14 și 15**) |
| 105–118 | Proiect: refactorizare completă (**Exemplul 16**) și pregătirea prezentării |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 0. Ce înseamnă „cod bun”

| Principiu | Ce înseamnă | Exemplu |
|-----------|-------------|---------|
| **Nume clare** | Numele spune ce reprezintă | `media`, nu `m`; `numarElevi`, nu `n2` |
| **O funcție, un rol** | O funcție face un singur lucru și are un nume-verb | `calculeazaMedia`, `afiseazaMeniu` |
| **Fără repetiții** | Dacă ai copiat același cod de două ori, fă din el o funcție | un singur `afiseaza`, apelat din mai multe locuri |
| **Fără numere magice** | Valorile cu sens primesc nume (`const`) | `PRAG_PROMOVARE`, nu `5` |
| **Comentarii care explică DE CE** | Codul arată ce face, comentariul arată de ce | `// verificam pana la radacina` |
| **Teste** | Verifici automat că funcțiile dau rezultatul corect | `verifica("media", media(...) == 7)` |

Regula de aur: **mai întâi corect, apoi clar, abia apoi rapid.** Un program rapid, dar greșit, nu ajută pe nimeni. Și nu schimbi niciodată mai multe lucruri deodată: după fiecare modificare compilezi și verifici că rezultatul este același.

---

## 1. Refactorizare

**Refactorizarea** înseamnă să rescrii codul ca să fie mai clar, **fără să schimbi ce face**.

### Exemplul 1 — Programul „încâlcit” (punctul de plecare) **[Esențial]**

Iată un program care calculează câteva statistici. Funcționează, dar este greu de citit: nume de o literă, repetiții, totul în `main`:

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[8] = {9, 4, 7, 10, 5, 8, 3, 10};
    int s = 0;
    for (int i = 0; i < 8; i++) {
        s = s + a[i];
    }
    double m = s / 8.0;
    cout << "Media: " << m << endl;

    int mx = a[0];
    for (int i = 0; i < 8; i++) {
        if (a[i] > mx) {
            mx = a[i];
        }
    }
    cout << "Maxim: " << mx << endl;

    int mn = a[0];
    for (int i = 0; i < 8; i++) {
        if (a[i] < mn) {
            mn = a[i];
        }
    }
    cout << "Minim: " << mn << endl;

    int c = 0;
    for (int i = 0; i < 8; i++) {
        if (a[i] >= 5) {
            c = c + 1;
        }
    }
    cout << "Promovati: " << c << endl;

    int d = 0;
    for (int i = 0; i < 8; i++) {
        if (a[i] == 10) {
            d = d + 1;
        }
    }
    cout << "De zece: " << d << endl;
    cout << "Corigenti: " << 8 - c << endl;
    return 0;
}
```

**Ieșire:**
```
Media: 7
Maxim: 10
Minim: 3
Promovati: 6
De zece: 2
Corigenti: 2
```

Ce nu e bine? `a`, `s`, `m`, `mx`, `mn`, `c`, `d` nu spun nimic; `8` apare peste tot (dacă schimbi numărul de note, trebuie să-l corectezi în 7 locuri); fiecare calcul e un bloc separat în `main`. Vom rezolva pe rând. Ieșirea de mai sus este **referința**: după curățare, programul trebuie să afișeze exact aceleași lucruri.

### Exemplul 2 — Nume care spun ceva **[Esențial]**

Un nume bun se citește ca o propoziție. Compară:

| Înainte | După | De ce |
|---------|------|-------|
| `int a[8]` | `int note[8]` | tabloul conține note |
| `int s` | `int suma` | acumulează o sumă |
| `double m` | `double media` | este media |
| `int mx`, `int mn` | `int maxim`, `int minim` | nu abrevia fără motiv |
| `int c` | `int promovati` | numără promovații |
| `bool f` | `bool esteGasit` | o variabilă `bool` se citește ca o întrebare |
| `void fct1()` | `void afiseazaMeniu()` | o funcție are nume-verb |

Alege **un singur stil** și respectă-l. În acest curs folosim `camelCase` (`numarElevi`) pentru variabile și funcții și `MAJUSCULE_CU_LINIE` pentru constante.

```cpp
#include <iostream>
using namespace std;

int main() {
    // aceeasi logica, doar nume mai bune
    int note[4] = {9, 4, 7, 10};
    int suma = 0;
    int minim = note[0];
    int maxim = note[0];

    for (int i = 0; i < 4; i++) {
        suma += note[i];
        if (note[i] < minim) {
            minim = note[i];
        }
        if (note[i] > maxim) {
            maxim = note[i];
        }
    }

    double media = suma / 4.0;
    cout << "Media: " << media << ", minim: " << minim << ", maxim: " << maxim << endl;
    return 0;
}
```

**Ieșire:**
```
Media: 7.5, minim: 4, maxim: 10
```

### Exemplul 3 — Constante în loc de numere magice **[Esențial]**

Un număr scris direct în cod, fără explicație, se numește **număr magic**. Dă-i un nume cu `const`:

```cpp
#include <iostream>
using namespace std;

// ----- varianta cu numere magice -----
double pretFinalMagic(double pret, int cantitate) {
    double total = pret * cantitate;
    if (total > 100) {
        total = total - total * 10 / 100;
    }
    return total + total * 19 / 100;
}

// ----- varianta cu constante -----
const double PRAG_REDUCERE = 100;     // peste aceasta suma se aplica reducerea
const int PROCENT_REDUCERE = 10;
const int PROCENT_TVA = 19;

double pretFinal(double pret, int cantitate) {
    double total = pret * cantitate;
    if (total > PRAG_REDUCERE) {
        total -= total * PROCENT_REDUCERE / 100;
    }
    return total + total * PROCENT_TVA / 100;
}

int main() {
    cout << "3 x 20 lei:  magic " << pretFinalMagic(20, 3) << ", constante " << pretFinal(20, 3) << endl;
    cout << "10 x 20 lei: magic " << pretFinalMagic(20, 10) << ", constante " << pretFinal(20, 10) << endl;
    return 0;
}
```

**Ieșire:**
```
3 x 20 lei:  magic 71.4, constante 71.4
10 x 20 lei: magic 214.2, constante 214.2
```

Ambele variante dau același rezultat, dar a doua se citește fără ghicit: `PROCENT_TVA` îți spune ce este `19`. Dacă TVA-ul se schimbă, modifici **o singură linie**, nu cauți numărul `19` prin tot programul.

### Exemplul 4 — Funcții mici (programul din Exemplul 1, curățat) **[Esențial]**

Fiecare calcul din `main` devine o funcție cu nume clar. Folosim `vector`, deci nu mai există numărul `8` în cod:

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int PRAG_PROMOVARE = 5;
const int NOTA_MAXIMA = 10;

int suma(const vector<int> &note) {
    int total = 0;
    for (int nota : note) {
        total += nota;
    }
    return total;
}

double media(const vector<int> &note) {
    return (double)suma(note) / note.size();
}

int maxim(const vector<int> &note) {
    int rezultat = note[0];
    for (int nota : note) {
        if (nota > rezultat) {
            rezultat = nota;
        }
    }
    return rezultat;
}

int minim(const vector<int> &note) {
    int rezultat = note[0];
    for (int nota : note) {
        if (nota < rezultat) {
            rezultat = nota;
        }
    }
    return rezultat;
}

int numaraNoteEgale(const vector<int> &note, int valoare) {
    int nr = 0;
    for (int nota : note) {
        if (nota == valoare) {
            nr++;
        }
    }
    return nr;
}

int numaraPromovati(const vector<int> &note) {
    int nr = 0;
    for (int nota : note) {
        if (nota >= PRAG_PROMOVARE) {
            nr++;
        }
    }
    return nr;
}

int main() {
    vector<int> note = {9, 4, 7, 10, 5, 8, 3, 10};
    int promovati = numaraPromovati(note);

    cout << "Media: " << media(note) << endl;
    cout << "Maxim: " << maxim(note) << endl;
    cout << "Minim: " << minim(note) << endl;
    cout << "Promovati: " << promovati << endl;
    cout << "De zece: " << numaraNoteEgale(note, NOTA_MAXIMA) << endl;
    cout << "Corigenti: " << note.size() - promovati << endl;
    return 0;
}
```

**Ieșire:**
```
Media: 7
Maxim: 10
Minim: 3
Promovati: 6
De zece: 2
Corigenti: 2
```

Compară cu ieșirea din Exemplul 1: este **identică**, cu un `main` foarte scurt. Dacă adaugi o notă în vector, toate statisticile se actualizează fără să atingi altceva. Fiecare funcție se poate testa separat, iar `numaraNoteEgale` o poți refolosi și pentru alte valori (de exemplu câți elevi au nota 7).

### Exemplul 5 — Elimină repetițiile **[Esențial]**

Când vezi aceeași secvență de două ori, e semn că lipsește o funcție sau o buclă. Aici, două variante pentru același meniu:

```cpp
#include <iostream>
#include <string>
using namespace std;

// varianta cu repetitii
void meniuRepetat() {
    cout << "1. Adauga" << endl;
    cout << "2. Sterge" << endl;
    cout << "3. Cauta" << endl;
    cout << "4. Salveaza" << endl;
    cout << "0. Iesire" << endl;
}

// varianta curata: optiunile sunt date, afisarea e o singura bucla
const int NR_OPTIUNI = 5;
const string OPTIUNI[NR_OPTIUNI] = {"Iesire", "Adauga", "Sterge", "Cauta", "Salveaza"};

void meniuCurat() {
    for (int i = 1; i < NR_OPTIUNI; i++) {
        cout << i << ". " << OPTIUNI[i] << endl;
    }
    cout << 0 << ". " << OPTIUNI[0] << endl;
}

int main() {
    cout << "--- repetat ---" << endl;
    meniuRepetat();
    cout << "--- curat ---" << endl;
    meniuCurat();
    return 0;
}
```

**Ieșire:**
```
--- repetat ---
1. Adauga
2. Sterge
3. Cauta
4. Salveaza
0. Iesire
--- curat ---
1. Adauga
2. Sterge
3. Cauta
4. Salveaza
0. Iesire
```

Variantele afișează același lucru. Cu a doua, ca să adaugi o opțiune scrii o singură valoare nouă în tablou și mărești `NR_OPTIUNI`. Principiul se numește **DRY** (*Don't Repeat Yourself*, „nu te repeta”): informația apare într-un singur loc.

### Exemplul 6 — Mai puține niveluri de `if`: ieșirea timpurie

Când ai multe verificări una în alta, codul se „împinge” spre dreapta și devine greu de urmărit. Soluția: verifici **cazurile greșite întâi** și ieși imediat (`return`). Funcțiile de mai jos fac același lucru, iar programul le compară pe toate intrările:

```cpp
#include <iostream>
using namespace std;

// varianta cu if-uri imbricate
bool poateIntra1(int varsta, bool areBilet, bool esteInterzis) {
    if (areBilet) {
        if (!esteInterzis) {
            if (varsta >= 12) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// varianta cu iesiri timpurii
bool poateIntra2(int varsta, bool areBilet, bool esteInterzis) {
    if (!areBilet) {
        return false;
    }
    if (esteInterzis) {
        return false;
    }
    return varsta >= 12;
}

int main() {
    int diferente = 0;
    int teste = 0;
    for (int varsta = 5; varsta <= 15; varsta++) {
        for (int bilet = 0; bilet <= 1; bilet++) {
            for (int interzis = 0; interzis <= 1; interzis++) {
                bool a = poateIntra1(varsta, bilet == 1, interzis == 1);
                bool b = poateIntra2(varsta, bilet == 1, interzis == 1);
                teste++;
                if (a != b) {
                    diferente++;
                }
            }
        }
    }
    cout << "Am comparat cele doua functii pe " << teste << " cazuri." << endl;
    cout << "Diferente gasite: " << diferente << endl;
    return 0;
}
```

**Ieșire:**
```
Am comparat cele doua functii pe 44 cazuri.
Diferente gasite: 0
```

Aceasta este și metoda de siguranță la refactorizare: dacă ai două versiuni, le rulezi pe multe date și verifici că rezultatele sunt aceleași. `0` diferențe înseamnă că rescrierea e sigură.

### Exemplul 7 — Expresii booleene simple

Un `if` care întoarce `true` sau `false` poate fi înlocuit direct cu condiția:

```cpp
#include <iostream>
using namespace std;

// varianta lunga
bool esteMajor1(int varsta) {
    if (varsta >= 18) {
        return true;
    } else {
        return false;
    }
}

// varianta scurta
bool esteMajor2(int varsta) {
    return varsta >= 18;
}

bool estePar1(int n) {
    if (n % 2 == 0) {
        return true;
    }
    return false;
}

bool estePar2(int n) {
    return n % 2 == 0;
}

int main() {
    int diferente = 0;
    for (int x = 0; x <= 120; x++) {
        if (esteMajor1(x) != esteMajor2(x)) {
            diferente++;
        }
        if (estePar1(x) != estePar2(x)) {
            diferente++;
        }
    }
    cout << "Diferente intre versiunea lunga si cea scurta: " << diferente << endl;

    bool gasit = true;
    if (gasit == true) {            // se poate scrie doar: if (gasit)
        cout << "Gasit (scris cu == true)" << endl;
    }
    if (gasit) {                    // la fel de corect, si mai clar
        cout << "Gasit (scris simplu)" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Diferente intre versiunea lunga si cea scurta: 0
Gasit (scris cu == true)
Gasit (scris simplu)
```

---

## 2. Optimizare: ce înseamnă „rapid”?

**Optimizarea** înseamnă ca un program să facă aceeași treabă cu mai puțini pași sau mai puțină memorie. Dar atenție: nu optimizezi „din reflex”. Ordinea corectă:

1. face programul corect;
2. **măsoară** ce este lent;
3. abia apoi îmbunătățește partea lentă, și măsoară din nou.

Ce câștigi aproape mereu: un **algoritm mai bun**. Diferența dintre doi algoritmi crește rapid cu mărimea datelor, spre deosebire de „trucurile mici”, care câștigă puțin.

### Exemplul 8 — Măsurăm timpul cu `<chrono>`

Biblioteca `<chrono>` oferă un cronometru. Comparăm două funcții care numără numerele prime până la 200000: una verifică toți divizorii posibili până la `n`, cealaltă doar până la rădăcină:

```cpp
#include <iostream>
#include <chrono>
using namespace std;
using namespace std::chrono;

bool estePrimLent(int n) {
    if (n < 2) {
        return false;
    }
    for (int d = 2; d < n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

bool estePrimRapid(int n) {
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

int main() {
    const int LIMITA = 200000;

    auto start1 = steady_clock::now();
    int nr1 = 0;
    for (int i = 0; i <= LIMITA; i++) {
        if (estePrimLent(i)) {
            nr1++;
        }
    }
    auto stop1 = steady_clock::now();

    auto start2 = steady_clock::now();
    int nr2 = 0;
    for (int i = 0; i <= LIMITA; i++) {
        if (estePrimRapid(i)) {
            nr2++;
        }
    }
    auto stop2 = steady_clock::now();

    long long ms1 = duration_cast<milliseconds>(stop1 - start1).count();
    long long ms2 = duration_cast<milliseconds>(stop2 - start2).count();

    cout << "Numere prime pana la " << LIMITA << ": " << nr1 << " (lent) si " << nr2 << " (rapid)" << endl;
    cout << "Timp varianta lenta:  " << ms1 << " ms" << endl;
    cout << "Timp varianta rapida: " << ms2 << " ms" << endl;
    return 0;
}
```

**Exemplu de ieșire** (timpii diferă de la un calculator la altul):
```
Numere prime pana la 200000: 17984 (lent) si 17984 (rapid)
Timp varianta lenta:  919 ms
Timp varianta rapida: 6 ms
```

Cele două rezultate (numărul de numere prime) sunt **mereu egale** (17984), ceea ce confirmă că ambele variante sunt corecte. Timpii depind de calculatorul tău: la tine vei vedea alte valori, dar varianta rapidă va fi de zeci sau chiar de sute de ori mai rapidă. Cronometrul are trei părți: `steady_clock::now()` (momentul de acum), diferența dintre două momente și `duration_cast<milliseconds>(…).count()` (câte milisecunde au trecut).

> Timpul variază de la o rulare la alta, deci compari **ordinul de mărime**, nu valoarea exactă. Pentru o comparație deterministă, în exemplele următoare **numărăm operațiile**.

### Exemplul 9 — Căutare liniară sau binară

Într-un vector **sortat** poți căuta mult mai repede: te uiți la mijloc, apoi renunți la jumătatea care nu poate conține valoarea (strategia din „Ghici numărul”). Numărăm comparațiile:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int cautareLiniara(const vector<int> &v, int x, int &comparatii) {
    comparatii = 0;
    int n = v.size();
    for (int i = 0; i < n; i++) {
        comparatii++;
        if (v[i] == x) {
            return i;
        }
    }
    return -1;
}

int cautareBinara(const vector<int> &v, int x, int &comparatii) {
    comparatii = 0;
    int stanga = 0;
    int dreapta = (int)v.size() - 1;
    while (stanga <= dreapta) {
        int mijloc = (stanga + dreapta) / 2;
        comparatii++;
        if (v[mijloc] == x) {
            return mijloc;
        }
        if (v[mijloc] < x) {
            stanga = mijloc + 1;
        } else {
            dreapta = mijloc - 1;
        }
    }
    return -1;
}

int main() {
    vector<int> v;
    for (int i = 0; i < 1000000; i += 2) {   // numere pare, sortate: 0, 2, 4, ...
        v.push_back(i);
    }
    cout << "Vector sortat cu " << v.size() << " elemente." << endl;

    int cautate[3] = {0, 777778, 999999};
    for (int k = 0; k < 3; k++) {
        int c1;
        int c2;
        int p1 = cautareLiniara(v, cautate[k], c1);
        int p2 = cautareBinara(v, cautate[k], c2);
        cout << "Caut " << cautate[k] << ": pozitie " << p1 << " (liniar, " << c1
             << " comparatii) / pozitie " << p2 << " (binar, " << c2 << " comparatii)" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Vector sortat cu 500000 elemente.
Caut 0: pozitie 0 (liniar, 1 comparatii) / pozitie 0 (binar, 18 comparatii)
Caut 777778: pozitie 388889 (liniar, 388890 comparatii) / pozitie 388889 (binar, 19 comparatii)
Caut 999999: pozitie -1 (liniar, 500000 comparatii) / pozitie -1 (binar, 19 comparatii)
```

Cu 500000 de elemente, căutarea liniară face până la **500000** de comparații, iar cea binară cel mult **19** (pentru că 2 înmulțit cu el însuși de 19 ori, adică 524288, este puțin peste 500000). Un număr inexistent (`999999`, care e impar) este cel mai defavorabil caz pentru amândouă. Condiția: vectorul trebuie să fie **sortat**.

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

### Exemplul 10 — Nu repeta calcule costisitoare *(Provocare, opțional)*

Dacă ai nevoie de „este prim?” pentru multe numere, e nevoie să calculezi aceeași informație iar și iar. Un **ciur** (lecția M3L7) calculează odată pentru toate numerele. Numărăm operațiile elementare (verificări de divizibilitate sau marcări):

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long operatiiTestRepetat(int limita) {
    long long operatii = 0;
    int nr = 0;
    for (int n = 2; n <= limita; n++) {
        bool prim = true;
        for (int d = 2; d * d <= n; d++) {
            operatii++;
            if (n % d == 0) {
                prim = false;
                break;
            }
        }
        if (prim) {
            nr++;
        }
    }
    cout << "  numere prime gasite: " << nr << endl;
    return operatii;
}

long long operatiiCiur(int limita) {
    long long operatii = 0;
    vector<bool> prim(limita + 1, true);
    for (int i = 2; i * i <= limita; i++) {
        if (prim[i]) {
            for (int j = i * i; j <= limita; j += i) {
                prim[j] = false;
                operatii++;
            }
        }
    }
    int nr = 0;
    for (int i = 2; i <= limita; i++) {
        if (prim[i]) {
            nr++;
        }
    }
    cout << "  numere prime gasite: " << nr << endl;
    return operatii;
}

int main() {
    const int LIMITA = 100000;
    cout << "Test repetat pentru fiecare numar:" << endl;
    long long a = operatiiTestRepetat(LIMITA);
    cout << "  operatii: " << a << endl;

    cout << "Ciurul lui Eratostene:" << endl;
    long long b = operatiiCiur(LIMITA);
    cout << "  operatii: " << b << endl;
    return 0;
}
```

**Ieșire:**
```
Test repetat pentru fiecare numar:
  numere prime gasite: 9592
  operatii: 2745694
Ciurul lui Eratostene:
  numere prime gasite: 9592
  operatii: 193078
```

Aceleași 9592 de numere prime, găsite cu de aproximativ 14 ori mai puține operații. Ideea generală: dacă vei avea nevoie de un rezultat de mai multe ori, **calculează-l o singură dată** și păstrează-l (într-un vector, într-o variabilă).

### Exemplul 11 — Frecvențe: două bucle imbricate contra unui vector de numărare *(Provocare, opțional)*

Problemă: într-un șir de numere între 0 și 99, care valoare apare cel mai des? Prima idee: pentru fiecare element, numeri de câte ori apare (două bucle imbricate, adică n × n operații). Mai bine: un vector `frecventa[100]`, un singur parcurs:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // un sir "pseudo-aleator", dar mereu acelasi
    vector<int> v;
    int x = 7;
    for (int i = 0; i < 5000; i++) {
        x = (x * 31 + 17) % 100;
        v.push_back(x);
    }
    for (int i = 0; i < 30; i++) {   // o valoare apare mai des decat celelalte
        v.push_back(34);
    }
    int n = v.size();

    // varianta 1: doua bucle imbricate
    long long operatii1 = 0;
    int valoare1 = v[0];
    int aparitii1 = 0;
    for (int i = 0; i < n; i++) {
        int cate = 0;
        for (int j = 0; j < n; j++) {
            operatii1++;
            if (v[j] == v[i]) {
                cate++;
            }
        }
        if (cate > aparitii1) {
            aparitii1 = cate;
            valoare1 = v[i];
        }
    }

    // varianta 2: vector de frecvente
    long long operatii2 = 0;
    int frecventa[100] = {0};
    for (int i = 0; i < n; i++) {
        frecventa[v[i]]++;
        operatii2++;
    }
    int valoare2 = 0;
    for (int val = 1; val < 100; val++) {
        operatii2++;
        if (frecventa[val] > frecventa[valoare2]) {
            valoare2 = val;
        }
    }

    cout << "Varianta 1: valoarea " << valoare1 << " apare de " << aparitii1
         << " ori (" << operatii1 << " operatii)" << endl;
    cout << "Varianta 2: valoarea " << valoare2 << " apare de " << frecventa[valoare2]
         << " ori (" << operatii2 << " operatii)" << endl;
    return 0;
}
```

**Ieșire:**
```
Varianta 1: valoarea 34 apare de 130 ori (25300900 operatii)
Varianta 2: valoarea 34 apare de 130 ori (5129 operatii)
```

Aceeași valoare, același număr de apariții, dar a doua variantă face de **mii de ori** mai puțini pași (și diferența crește repede dacă șirul se lungește: la 50000 de elemente prima variantă ar face 2,5 miliarde de operații). Când valorile sunt într-un interval mic și cunoscut, un „vector de numărare” (*counting array*) bate aproape orice altă variantă.

---

## 3. Teste automate

### Exemplul 12 — Un mic cadru de teste **[Esențial]**

În Modulul 3 ai folosit `assert`. Aici facem ceva mai prietenos: o funcție `verifica` care **numără** testele trecute și picate și spune numele testului care a picat. Testăm și o funcție cu o greșeală ascunsă, ca să vezi cum o prinde:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int trecute = 0;
int picate = 0;

void verifica(const string &nume, bool conditie) {
    if (conditie) {
        trecute++;
    } else {
        picate++;
        cout << "PICAT: " << nume << endl;
    }
}

// functie corecta
int procent(int scor, int total) {
    if (total == 0) {
        return 0;
    }
    return scor * 100 / total;
}

// functie cu o greseala: imparte intregi inainte sa inmulteasca cu 100
double mediaGresita(const vector<int> &v) {
    int suma = 0;
    for (int x : v) {
        suma += x;
    }
    return suma / v.size();      // GRESEALA: impartire intreaga
}

double mediaCorecta(const vector<int> &v) {
    int suma = 0;
    for (int x : v) {
        suma += x;
    }
    return (double)suma / v.size();
}

int main() {
    verifica("procent(5, 10) == 50", procent(5, 10) == 50);
    verifica("procent(0, 10) == 0", procent(0, 10) == 0);
    verifica("procent(10, 10) == 100", procent(10, 10) == 100);
    verifica("procent(3, 0) == 0 (fara impartire la zero)", procent(3, 0) == 0);

    verifica("mediaCorecta({1, 2}) == 1.5", mediaCorecta({1, 2}) == 1.5);
    verifica("mediaGresita({1, 2}) == 1.5", mediaGresita({1, 2}) == 1.5);
    verifica("mediaGresita({2, 4}) == 3", mediaGresita({2, 4}) == 3);

    cout << "Teste trecute: " << trecute << ", picate: " << picate << endl;
    return 0;
}
```

**Ieșire:**
```
PICAT: mediaGresita({1, 2}) == 1.5
Teste trecute: 6, picate: 1
```

Testul pentru `mediaGresita({1, 2})` a picat, pentru că funcția întoarce `1` în loc de `1.5`; ea a trecut, în schimb, la `{2, 4}`, pentru că rezultatul exact este un număr întreg. De aceea alegi teste variate, în special **cazuri limită**: vector cu un singur element, valori egale, valori zero, valori negative, rezultate cu zecimale. Un test care trece nu dovedește că funcția e corectă, dar unul care pică te scutește de un bug.

### Exemplul 13 — Testăm citirea fără tastatură: `istringstream`

Cum testezi o funcție care citește de la tastatură fără să tastezi? Scrii funcția să primească **un flux** (`istream &`), iar în teste îi dai un text pregătit, prin `istringstream` (din `<sstream>`). În program îi dai `cin`:

```cpp
#include <iostream>
#include <sstream>
#include <string>
using namespace std;

// citeste o nota (1-10) din fluxul dat; intoarce false daca nu e valida
bool citesteNota(istream &in, int &nota) {
    int x;
    if (!(in >> x)) {
        return false;
    }
    if (x < 1 || x > 10) {
        return false;
    }
    nota = x;
    return true;
}

void incearca(const string &text) {
    istringstream flux(text);
    int nota = 0;
    cout << "Intrare \"" << text << "\" -> ";
    if (citesteNota(flux, nota)) {
        cout << "nota " << nota << endl;
    } else {
        cout << "respinsa" << endl;
    }
}

int main() {
    incearca("7");
    incearca("10");
    incearca("0");
    incearca("11");
    incearca("abc");
    incearca("");
    incearca("  8  ");

    // in program real, aceeasi functie cu tastatura:
    int nota = 0;
    cout << "Scrie o nota: ";
    if (citesteNota(cin, nota)) {
        cout << "Ai scris nota " << nota << endl;
    } else {
        cout << "Nota invalida." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `9`):
```
Intrare "7" -> nota 7
Intrare "10" -> nota 10
Intrare "0" -> respinsa
Intrare "11" -> respinsa
Intrare "abc" -> respinsa
Intrare "" -> respinsa
Intrare "  8  " -> nota 8
Scrie o nota: 9
Ai scris nota 9
```

`istringstream` transformă un text într-un „flux de intrare”, ca și cum acel text ar fi fost tastat. Poți testa orice funcție de citire cu zeci de intrări greșite, în câteva secunde, fără să tastezi. Aceeași funcție merge cu `cin`, cu un fișier (`ifstream`) sau cu un text, pentru că toate sunt `istream`.

---

## 4. Comentarii și documentație

### Exemplul 14 — Comentarii care ajută **[Esențial]**

Un comentariu bun răspunde la **„de ce?”**, nu repetă ce se vede deja în cod. Comparație:

| Comentariu slab | Comentariu bun |
|-----------------|----------------|
| `i++; // il maresc pe i cu 1` | `// sarim peste primul element: este antetul` |
| `if (n < 2) return false; // daca n e mai mic ca 2` | `// 0 si 1 nu sunt numere prime, prin definitie` |
| `d * d <= n // d la patrat mai mic ca n` | `// un divizor mai mare decat radacina ar avea un corespondent mai mic` |

În plus, la începutul fiecărui fișier scrie un **antet** (cine, ce, când) și, deasupra funcțiilor mai complicate, o descriere pe scurt a ce primesc și ce întorc:

```cpp
/*
   Program: Utilitar pentru numere
   Autor:   Ana Pop
   Scop:    exemple de functii cu comentarii utile
   Versiune: 1.0
*/
#include <iostream>
using namespace std;

/*
   estePrim
   Primeste: un numar intreg n
   Intoarce: true daca n este prim, false altfel
*/
bool estePrim(int n) {
    // 0 si 1 nu sunt numere prime, prin definitie
    if (n < 2) {
        return false;
    }
    // un divizor mai mare decat radacina patrata ar avea un
    // corespondent mai mic, deci ajunge sa cautam pana la radacina
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

/*
   cmmdc
   Primeste: doua numere pozitive a si b
   Intoarce: cel mai mare divizor comun (algoritmul lui Euclid)
*/
int cmmdc(int a, int b) {
    while (b != 0) {
        int rest = a % b;
        a = b;
        b = rest;
    }
    return a;
}

int main() {
    cout << "estePrim(97) = " << estePrim(97) << endl;
    cout << "estePrim(91) = " << estePrim(91) << endl;
    cout << "cmmdc(84, 36) = " << cmmdc(84, 36) << endl;
    return 0;
}
```

**Ieșire:**
```
estePrim(97) = 1
estePrim(91) = 0
cmmdc(84, 36) = 12
```

Un alt tip util de comentariu este `// TODO:` (de făcut) sau `// ATENTIE:` (ceva de care trebuie să ții cont). Dar nu lăsa cod comentat „pentru mai târziu”: șterge-l; dacă ai nevoie de el, îl vei regăsi în istoricul versiunilor (Git).

### Exemplul 15 — Mod demo: date de exemplu la cerere

În fața unei audiențe nu ai timp să tastezi 20 de produse. Soluția folosită de programatori: o opțiune în program care încarcă **date de demonstrație** instant:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <limits>
using namespace std;

struct Stare {
    vector<string> produse;
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

void incarcaDateDemo(Stare &s) {
    const string DEMO[5] = {"Caiet dictando", "Pix albastru", "Rucsac scolar", "Creioane colorate", "Radiera"};
    s.produse.clear();
    for (const string &p : DEMO) {
        s.produse.push_back(p);
    }
    cout << "Am incarcat " << s.produse.size() << " produse demo." << endl;
}

void afiseaza(const Stare &s) {
    if (s.produse.empty()) {
        cout << "Lista este goala." << endl;
        return;
    }
    int n = s.produse.size();
    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". " << s.produse[i] << endl;
    }
}

int main() {
    Stare s;
    int optiune;
    do {
        cout << endl << "1. Afiseaza  2. Adauga  3. Date demo  0. Iesire" << endl;
        optiune = citesteInt("Alege: ", 0, 3);
        if (optiune == 1) {
            afiseaza(s);
        } else if (optiune == 2) {
            string nume;
            cout << "Produs: ";
            getline(cin >> ws, nume);
            s.produse.push_back(nume);
        } else if (optiune == 3) {
            incarcaDateDemo(s);
        }
    } while (optiune != 0);
    return 0;
}
```

**Rulare** (tastezi `1`, `3`, `1`, `2`, `Ceai verde`, `1`, `0`):
```

1. Afiseaza  2. Adauga  3. Date demo  0. Iesire
Alege: 1
Lista este goala.

1. Afiseaza  2. Adauga  3. Date demo  0. Iesire
Alege: 3
Am incarcat 5 produse demo.

1. Afiseaza  2. Adauga  3. Date demo  0. Iesire
Alege: 1
1. Caiet dictando
2. Pix albastru
3. Rucsac scolar
4. Creioane colorate
5. Radiera

1. Afiseaza  2. Adauga  3. Date demo  0. Iesire
Alege: 2
Produs: Ceai verde

1. Afiseaza  2. Adauga  3. Date demo  0. Iesire
Alege: 1
1. Caiet dictando
2. Pix albastru
3. Rucsac scolar
4. Creioane colorate
5. Radiera
6. Ceai verde

1. Afiseaza  2. Adauga  3. Date demo  0. Iesire
Alege: 0
```

Opțiunea 3 ar putea fi ascunsă (de exemplu, accesibilă doar cu un număr special), dar în proiectele tale e în regulă să fie vizibilă. Pregătește-o **înainte** de prezentare.

---

## 5. Proiect: refactorizare completă

### Exemplul 16 — Din „încâlcit” în „curat” **[Esențial]**

Programul de mai jos ține un catalog mic, cu vectori paraleli, variabile globale, nume scurte și cod repetat. Funcționează:

```cpp
#include <iostream>
#include <string>
using namespace std;

string n1[20];
int n2[20];
int k = 0;

int main() {
    n1[k] = "Ana"; n2[k] = 9; k++;
    n1[k] = "Bogdan"; n2[k] = 4; k++;
    n1[k] = "Carmen"; n2[k] = 10; k++;
    n1[k] = "Dan"; n2[k] = 7; k++;
    n1[k] = "Elena"; n2[k] = 5; k++;

    cout << "Catalog" << endl;
    for (int i = 0; i < k; i++) {
        cout << i + 1 << ". " << n1[i] << " " << n2[i];
        if (n2[i] >= 5) {
            cout << " promovat";
        } else {
            cout << " corigent";
        }
        cout << endl;
    }
    int s = 0;
    for (int i = 0; i < k; i++) {
        s += n2[i];
    }
    cout << "Media: " << (double)s / k << endl;
    int b = 0;
    for (int i = 1; i < k; i++) {
        if (n2[i] > n2[b]) {
            b = i;
        }
    }
    cout << "Cel mai bun: " << n1[b] << endl;

    for (int i = 0; i < k; i++) {
        if (n1[i] == "Bogdan") {
            for (int j = i; j < k - 1; j++) {
                n1[j] = n1[j + 1];
                n2[j] = n2[j + 1];
            }
            k--;
            break;
        }
    }

    cout << "Catalog" << endl;
    for (int i = 0; i < k; i++) {
        cout << i + 1 << ". " << n1[i] << " " << n2[i];
        if (n2[i] >= 5) {
            cout << " promovat";
        } else {
            cout << " corigent";
        }
        cout << endl;
    }
    s = 0;
    for (int i = 0; i < k; i++) {
        s += n2[i];
    }
    cout << "Media: " << (double)s / k << endl;
    b = 0;
    for (int i = 1; i < k; i++) {
        if (n2[i] > n2[b]) {
            b = i;
        }
    }
    cout << "Cel mai bun: " << n1[b] << endl;
    return 0;
}
```

**Ieșire:**
```
Catalog
1. Ana 9 promovat
2. Bogdan 4 corigent
3. Carmen 10 promovat
4. Dan 7 promovat
5. Elena 5 promovat
Media: 7
Cel mai bun: Carmen
Catalog
1. Ana 9 promovat
2. Carmen 10 promovat
3. Dan 7 promovat
4. Elena 5 promovat
Media: 7.75
Cel mai bun: Carmen
```

Observă ce nu e bine: vectori paraleli (`n1`, `n2`) care trebuie ținuți sincronizați, variabile globale, nume fără sens, **blocul de afișare scris de două ori** (este chiar codul copiat), media și maximul recalculate prin copiere. Acum varianta curată. Aceeași ieșire, dar cu o structură, un `vector`, funcții cu nume clare și o constantă pentru prag:

```cpp
/*
   Program: Catalog (varianta curatata)
   Scop:    acelasi comportament ca varianta initiala, cod mai clar
*/
#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int PRAG_PROMOVARE = 5;

struct Elev {
    string nume;
    int nota;
};

bool estePromovat(const Elev &e) {
    return e.nota >= PRAG_PROMOVARE;
}

void afiseazaCatalog(const vector<Elev> &catalog) {
    cout << "Catalog" << endl;
    int n = catalog.size();
    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". " << catalog[i].nume << " " << catalog[i].nota;
        if (estePromovat(catalog[i])) {
            cout << " promovat";
        } else {
            cout << " corigent";
        }
        cout << endl;
    }
}

double media(const vector<Elev> &catalog) {
    int suma = 0;
    for (const Elev &e : catalog) {
        suma += e.nota;
    }
    return (double)suma / catalog.size();
}

int indiceCelMaiBun(const vector<Elev> &catalog) {
    int best = 0;
    int n = catalog.size();
    for (int i = 1; i < n; i++) {
        if (catalog[i].nota > catalog[best].nota) {
            best = i;
        }
    }
    return best;
}

void stergeDupaNume(vector<Elev> &catalog, const string &nume) {
    int n = catalog.size();
    for (int i = 0; i < n; i++) {
        if (catalog[i].nume == nume) {
            catalog.erase(catalog.begin() + i);
            return;
        }
    }
}

void afiseazaRaport(const vector<Elev> &catalog) {
    afiseazaCatalog(catalog);
    cout << "Media: " << media(catalog) << endl;
    cout << "Cel mai bun: " << catalog[indiceCelMaiBun(catalog)].nume << endl;
}

int main() {
    vector<Elev> catalog = {
        {"Ana", 9}, {"Bogdan", 4}, {"Carmen", 10}, {"Dan", 7}, {"Elena", 5}
    };

    afiseazaRaport(catalog);
    stergeDupaNume(catalog, "Bogdan");
    afiseazaRaport(catalog);
    return 0;
}
```

**Ieșire:**
```
Catalog
1. Ana 9 promovat
2. Bogdan 4 corigent
3. Carmen 10 promovat
4. Dan 7 promovat
5. Elena 5 promovat
Media: 7
Cel mai bun: Carmen
Catalog
1. Ana 9 promovat
2. Carmen 10 promovat
3. Dan 7 promovat
4. Elena 5 promovat
Media: 7.75
Cel mai bun: Carmen
```

Compară cele două ieșiri: sunt **identice, caracter cu caracter**. Din blocurile repetate din `main` am ajuns la un `main` de câteva linii. Blocul de afișare există acum o singură dată (`afiseazaRaport`), iar ca să schimbi regula de promovare modifici o constantă. Dacă vrei un al treilea raport, scrii o singură linie.

---

## 6. Pregătirea prezentării

În ultima lecție vei prezenta proiectul tău, 3–4 minute. O demonstrație bună are 5 părți:

| Parte | Durată | Ce spui / ce arăți |
|-------|--------|--------------------|
| 1. **Problema** | 20 s | „Am făcut un … pentru că …” (o propoziție) |
| 2. **Demonstrația** | 90 s | Rulezi programul și arăți 3–4 funcții importante, cu date pregătite |
| 3. **Din cod** | 40 s | Arăți **o** funcție sau o idee de care ești mândru și o explici |
| 4. **Ce a fost greu** | 30 s | O greșeală pe care ai descoperit-o și cum ai rezolvat-o |
| 5. **Ce urmează** | 20 s | Ce ai adăuga dacă ai mai avea o săptămână |

**Lista de verificare înainte de prezentare:**
- [ ] Programul compilează și rulează pe calculatorul de pe care prezinți  
- [ ] Ai testat demonstrația de la cap la coadă, cronometrat, de cel puțin 2 ori  
- [ ] Ai date pregătite (opțiune de „date demo” sau un fișier de pornire)  
- [ ] Ai decis **ce nu arăți** (partea cu erori sau cu probleme încă nerezolvate)  
- [ ] Ai un „plan B”: capturi de ecran sau o a doua copie a programului, dacă ceva nu merge  
- [ ] Poți explica în 30 de secunde ce face fiecare funcție importantă  

Sfaturi: vorbește despre ce **face** programul pentru utilizator, nu doar despre cod. Dacă ceva se strică în timpul demonstrației, nu te panica: spune ce ai de gând să arăți și continuă cu următorul pas. Toți programatorii au demonstrații care se strică, iar felul în care reacționezi arată mai mult decât faptul că ceva a mers sau nu.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Curăță proiectul tău (obligatoriu)
Alege unul dintre proiectele tale (Catalog, Magazin, Quiz, joc) și parcurge **lista de curățenie**: nume clare, fără numere magice, fără cod repetat, funcții scurte (sub ~25 de linii), `const &` unde e cazul, antet și comentarii „de ce”. Compilează după fiecare schimbare și verifică că programul se comportă la fel.

### Exercițiul B — Teste
Scrie cu `verifica` (Exemplul 12) cel puțin **10 teste** pentru funcțiile proiectului tău (inclusiv cazuri limită). Dacă ai o funcție de citire, testează-o cu `istringstream`.

### Exercițiul C — Mod demo
Adaugă proiectului o opțiune care încarcă date de demonstrație (Exemplul 15), cu cel puțin 5 elemente.

### Exercițiul D — Măsoară
Alege o operație din proiectul tău (sortare, căutare), generează 100000 de elemente și măsoară timpul cu `<chrono>`. Compară cu o variantă mai bună (de exemplu `sort` din bibliotecă față de sortarea ta).

### Exercițiul E — Scriptul prezentării
Scrie pe hârtie (sau într-un comentariu la sfârșitul fișierului) scriptul de 3 minute, în cele 5 părți. Repetă-o cu un coleg.

**Gata când:**
- [ ] Programul se comportă exact ca înainte de curățare  
- [ ] Nicio funcție nu depășește aproximativ 25–30 de linii  
- [ ] Ai cel puțin 10 teste care trec  
- [ ] Ai antet și comentarii utile  
- [ ] Ai o opțiune de date demo și un script de prezentare  
- [ ] Fișierul se numește `Prenume_Nume_M4L9.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Împarte proiectul în mai multe fișiere: `utile.h` (funcțiile de citire sigură) și `main.cpp`. Caută pe internet „C++ header file” și `#include "utile.h"`  
- [ ] Adaugă o opțiune de „mod depanare” care afișează în plus pașii interni ai programului  
- [ ] Măsoară cât durează încărcarea unui fișier cu 100000 de linii și cum se schimbă timpul dacă folosești `reserve` pe vector  
- [ ] Scrie un program care compară două fișiere de ieșire și spune dacă sunt identice (util pentru verificarea refactorizărilor)  
- [ ] Citește despre `git` și creează un depozit pentru proiectul tău  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Programul „curățat” se comportă altfel | Ai schimbat mai multe lucruri deodată | Un pas mic, compilezi, compari ieșirea; abia apoi următorul |
| Funcție de 80 de linii, imposibil de testat | Face prea multe lucruri | Împarte-o: fiecare funcție, un singur rol |
| Comentariile spun ce se vede deja în cod | `i++; // il maresc pe i` | Comentează **de ce**, nu **ce** |
| Optimizezi înainte să măsori | Presupui că știi ce e lent | Măsoară întâi, optimizează apoi, măsoară din nou |
| Testele trec, dar programul are bug | Testele verifică doar cazuri ușoare | Adaugă cazuri limită: gol, un element, zero, negativ |
| Cod comentat rămas peste tot | „Poate îmi trebuie” | Șterge-l; îl găsești în istoricul versiunilor |
| Variabile globale modificate din mai multe locuri | Orice funcție le poate schimba | Pune datele într-o structură și trimite-o prin `&` |
| Timpul măsurat variază mult | Calculatorul face și alte lucruri | Rulează de mai multe ori, compară ordinul de mărime |
| La prezentare nu merge nimic | Nu ai testat pe calculatorul de prezentare | Testează în avans, cu plan B |

---

## Recapitulare pe scurt

- **Refactorizare** = cod mai clar, același comportament. Pași mici; compari mereu ieșirea.
- Nume clare, funcții scurte cu un singur rol, `const` în loc de numere magice, **DRY** (nu te repeta).
- Ieșiri timpurii (`return` pe cazurile greșite) reduc `if`-urile imbricate; `return conditie;` în loc de `if … true … else false`.
- **Corect, apoi clar, apoi rapid.** Măsoară înainte să optimizezi.
- Câștigul mare vine din **algoritm**: căutare binară în loc de liniară, ciur în loc de test repetat, vector de frecvențe în loc de bucle imbricate.
- `<chrono>`: `steady_clock::now()` și `duration_cast<milliseconds>(…)`.
- Teste: `verifica(nume, conditie)` cu cazuri limită; `istringstream` pentru testarea citirii.
- Comentarii: antet de fișier, descriere pentru funcții, „de ce” în loc de „ce”.
- Prezentarea: problemă, demo, o idee din cod, ce a fost greu, ce urmează. Date demo și plan B.

---

## Temă
1. Termină exercițiile A–C pentru proiectul tău preferat din Modulul 4.  
2. Pregătește demonstrația de 3 minute și repetă-o cu cronometrul. Notează cât a durat.  
3. Cere unui coleg (sau unui părinte) să-ți folosească programul **fără explicații** și notează ce a încurcat-o/încurcat. Remediază cel puțin două lucruri.  
4. Pregătește un fișier `README.txt` pentru proiect: ce face, cum se compilează și se rulează, ce meniu are.  
5. **Bonus:** adaugă la `README.txt` trei idei de îmbunătățire pe care le-ai face în viitor.  
6. Salvează tot ca `Tema_M4L9_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 10
**Showcase final.** Recapitulăm tot Modulul 4 cu un test scurt și apoi **prezentăm proiectele**. Ai libertatea să alegi proiectul final: unul dintre cele trei din modul (extins) sau o idee a ta. Primești și diploma „CodeKids Graduate”.
