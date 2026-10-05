# LECȚIA 8 — Salvare și încărcare (fișiere)
**Modulul 5 · Proiect RPG în consolă · 2 ore**  
**Code Kids Play · RPG Creator**

> Eroul tău a luptat, a strâns obiecte și a adunat monede, dar când închizi programul, totul dispare. Azi învățăm să scriem datele jocului într-un **fișier** și să le citim înapoi. Așa apare în meniu opțiunea **„Continuă jocul”**, la fel ca în jocurile adevărate.  
> Proiect: **„Joc_L48.cpp”** · comanda `salveaza` și opțiunea „Continuă jocul”.

---

## Obiectiv
La finalul orei jocul poate fi salvat cu comanda `salveaza` și continuat mai târziu din meniu, cu eroul, rucsacul și obiectele din camere exact ca înainte.  
**Minim:** salvezi și încarci numele, viața și monedele eroului.  
**Ținta orei (Complet):** salvezi tot (erou, rucsac, obiecte din camere, misiuni) și tratezi cazul când fișierul lipsește sau este stricat.

## De ce contează
Programele reale își țin datele în fișiere: setări, scoruri, documente, fotografii. Azi folosești aceleași unelte ca ele: `ofstream` pentru scris și `ifstream` pentru citit. Vei învăța și o regulă de aur: **citești în exact aceeași ordine în care ai scris**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `struct`, `vector`, `string` |
| 10–35 | Scrierea și citirea unui fișier (**Exemplele 1–3**) |
| 35–65 | Salvarea și încărcarea eroului și a rucsacului (**Exemplele 4–6**) |
| 65–85 | Capcana `>>` + `getline` și fișierele stricate (**Exemplele 7 și 8**) |
| 85–105 | Jocul lecției, **Joc_L48.cpp** (**Exemplul 12**) |
| 105–118 | Idei în plus (**Exemplele 9–11**, opționale) și testare |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Fișiere text

Pentru fișiere avem nevoie de `#include <fstream>`. Folosim două tipuri:

| Tip | Face | Se folosește ca |
|-----|------|-----------------|
| `ofstream` | **scrie** într-un fișier | `cout` |
| `ifstream` | **citește** dintr-un fișier | `cin` |

### Exemplul 1 — Scriem un fișier **[Esențial]**

`ofstream fout("date.txt");` creează (sau șterge și rescrie) fișierul `date.txt`, iar apoi scriem în el cu `<<`, exact ca la `cout`:

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ofstream fout("date.txt");
    fout << "Ana\n";
    fout << 30 << " " << 12 << "\n";
    fout.close();
    cout << "Fisierul date.txt a fost scris.\n";
    return 0;
}
```

**Ieșire:**
```
Fisierul date.txt a fost scris.
```

Programul nu afișează conținutul fișierului. Deschide `date.txt` cu un editor de text ca să vezi ce s-a scris: pe prima linie `Ana`, pe a doua `30 12`.

### Exemplul 2 — Scriem și citim înapoi **[Esențial]**

Citim cu `ifstream`. Un nume se citește cu `getline`, iar numerele cu `>>`, exact ca la `cin`:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    ofstream fout("date.txt");
    fout << "Ana\n";
    fout << 30 << " " << 12 << "\n";
    fout.close();

    ifstream fin("date.txt");
    string nume;
    int viata, monede;
    getline(fin, nume);
    fin >> viata >> monede;

    cout << "Nume: " << nume << "\n";
    cout << "Viata: " << viata << "\n";
    cout << "Monede: " << monede << "\n";
    return 0;
}
```

**Ieșire:**
```
Nume: Ana
Viata: 30
Monede: 12
```

### Exemplul 3 — Fișierul nu există **[Esențial]**

Dacă încerci să citești un fișier care nu există (de exemplu, jucătorul nu a salvat niciodată), programul nu trebuie să se strice. Verificăm cu `is_open()`:

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ifstream fin("nu_exista.txt");
    if (!fin.is_open()) {
        cout << "Nu am gasit nicio salvare.\n";
        return 0;
    }
    cout << "Salvare gasita!\n";
    return 0;
}
```

**Ieșire:**
```
Nu am gasit nicio salvare.
```

---

## 2. Salvăm eroul

### Exemplul 4 — `salveaza` pentru un erou mic **[Esențial]**

Punem salvarea într-o funcție care primește eroul și **întoarce `bool`**: `true` dacă a reușit, `false` dacă fișierul nu s-a putut crea:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

struct Jucator {
    string nume;
    int viata = 30;
    int monede = 10;
};

bool salveaza(const Jucator &j) {
    ofstream fout("erou.txt");
    if (!fout.is_open()) {
        return false;
    }
    fout << j.nume << "\n";
    fout << j.viata << " " << j.monede << "\n";
    return true;
}

int main() {
    Jucator ana;
    ana.nume = "Ana";
    ana.viata = 22;
    ana.monede = 45;

    if (salveaza(ana)) {
        cout << "Joc salvat.\n";
    } else {
        cout << "Nu am putut salva jocul.\n";
    }
    return 0;
}
```

**Ieșire:**
```
Joc salvat.
```

### Exemplul 5 — `incarca`: citim eroul înapoi **[Esențial]**

Funcția `incarca` face invers: deschide fișierul, citește **în aceeași ordine** și completează eroul primit prin referință. Programul de mai jos salvează, apoi încarcă într-un alt erou, ca să vedem că datele s-au păstrat:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

struct Jucator {
    string nume;
    int viata = 30;
    int monede = 10;
};

bool salveaza(const Jucator &j) {
    ofstream fout("erou.txt");
    if (!fout.is_open()) {
        return false;
    }
    fout << j.nume << "\n";
    fout << j.viata << " " << j.monede << "\n";
    return true;
}

bool incarca(Jucator &j) {
    ifstream fin("erou.txt");
    if (!fin.is_open()) {
        return false;
    }
    getline(fin, j.nume);
    fin >> j.viata >> j.monede;
    return true;
}

int main() {
    Jucator ana;
    ana.nume = "Ana";
    ana.viata = 22;
    ana.monede = 45;
    salveaza(ana);

    Jucator nou;
    cout << "Inainte: '" << nou.nume << "', viata " << nou.viata << ", monede " << nou.monede << "\n";
    if (incarca(nou)) {
        cout << "Dupa:    '" << nou.nume << "', viata " << nou.viata << ", monede " << nou.monede << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Inainte: '', viata 30, monede 10
Dupa:    'Ana', viata 22, monede 45
```

### Exemplul 6 — Salvăm și rucsacul (`vector`) **[Esențial]**

Un `vector` are lungime variabilă, deci scriem **întâi câte elemente are**, apoi elementele. La citire, citim întâi numărul și apoi repetăm de atâtea ori:

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> inventar = {"Sabie", "Potiune", "Cheie"};

    ofstream fout("rucsac.txt");
    fout << inventar.size() << "\n";
    for (const string &o : inventar) {
        fout << o << "\n";
    }
    fout.close();

    vector<string> citit;
    ifstream fin("rucsac.txt");
    size_t n;
    fin >> n;
    string linie;
    getline(fin, linie);
    for (size_t i = 0; i < n; i++) {
        getline(fin, linie);
        citit.push_back(linie);
    }

    cout << "Am citit " << citit.size() << " obiecte:\n";
    for (const string &o : citit) {
        cout << "  - " << o << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Am citit 3 obiecte:
  - Sabie
  - Potiune
  - Cheie
```

Observă linia `getline(fin, linie);` de după `fin >> n;`: ea explică următoarea capcană.

---

## 3. Capcane

### Exemplul 7 — Capcana `>>` urmat de `getline` **[Esențial]**

După ce citești un număr cu `>>`, **caracterul de linie nouă rămâne în fișier**. Dacă citești imediat cu `getline`, primești o linie **goală**. Compară:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    ofstream fout("test.txt");
    fout << 7 << "\n" << "Sabie" << "\n";
    fout.close();

    ifstream fin1("test.txt");
    int n;
    string text;
    fin1 >> n;
    getline(fin1, text);
    cout << "Gresit:  '" << text << "'\n";

    ifstream fin2("test.txt");
    fin2 >> n;
    getline(fin2, text);   // consuma linia noua ramasa
    getline(fin2, text);   // acum citim cu adevarat
    cout << "Corect:  '" << text << "'\n";
    return 0;
}
```

**Ieșire:**
```
Gresit:  ''
Corect:  'Sabie'
```

Regula: **după `>>`, dacă urmează `getline`, citește o dată în plus, ca să „arunci” linia nouă.**

### Exemplul 8 — Fișier stricat: nu strica jocul

Un fișier de salvare poate fi gol, șters pe jumătate sau modificat de cineva. Citim întâi într-un **erou de probă** și, abia dacă totul e în regulă, copiem peste eroul real:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

struct Jucator {
    string nume;
    int viata = 30;
    int monede = 10;
};

bool incarca(Jucator &j, const string &fisier) {
    ifstream fin(fisier);
    if (!fin.is_open()) {
        return false;
    }
    Jucator proba;
    getline(fin, proba.nume);
    fin >> proba.viata >> proba.monede;
    if (!fin || proba.viata <= 0 || proba.monede < 0) {
        return false;
    }
    j = proba;
    return true;
}

int main() {
    ofstream bun("bun.txt");
    bun << "Ana\n22 45\n";
    bun.close();

    ofstream stricat("stricat.txt");
    stricat << "Ana\nabc\n";
    stricat.close();

    Jucator j;
    j.nume = "Original";

    cout << "bun.txt:     " << (incarca(j, "bun.txt") ? "ok" : "esuat") << ", eroul este " << j.nume << "\n";
    j.nume = "Original";
    cout << "stricat.txt: " << (incarca(j, "stricat.txt") ? "ok" : "esuat") << ", eroul este " << j.nume << "\n";
    return 0;
}
```

**Ieșire:**
```
bun.txt:     ok, eroul este Ana
stricat.txt: esuat, eroul este Original
```

La `stricat.txt` încărcarea eșuează, iar eroul `Original` rămâne neatins. `!fin` este `true` când o citire a eșuat (aici, `abc` nu e număr).

---

## 4. Alte idei

### Exemplul 9 — Camere fără obiect: markerul „-” *(Provocare, opțional)*

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

Un `string` gol (camera fără obiect) s-ar scrie ca o linie goală, ceea ce încurcă citirea. Soluția din joc: scriem `-` pentru „nimic” și îl transformăm înapoi în string gol la citire:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    const int N = 3;
    string obiect[N] = {"Sabie", "", "Cheie"};

    ofstream fout("camere.txt");
    for (int i = 0; i < N; i++) {
        fout << (obiect[i].empty() ? "-" : obiect[i]) << "\n";
    }
    fout.close();

    string citit[N];
    ifstream fin("camere.txt");
    string linie;
    for (int i = 0; i < N; i++) {
        getline(fin, linie);
        citit[i] = (linie == "-") ? "" : linie;
    }

    for (int i = 0; i < N; i++) {
        cout << "Camera " << i << ": " << (citit[i].empty() ? "(nimic)" : citit[i]) << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Camera 0: Sabie
Camera 1: (nimic)
Camera 2: Cheie
```

### Exemplul 10 — Mai multe locuri de salvare *(Provocare, opțional)*

Numele fișierului poate fi construit: `"salvare" + to_string(slot) + ".txt"`. Așa jucătorul alege între `salvare1.txt`, `salvare2.txt` etc.:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

string numeFisier(int slot) {
    return "salvare" + to_string(slot) + ".txt";
}

int main() {
    for (int slot = 1; slot <= 3; slot++) {
        ofstream fout(numeFisier(slot));
        fout << "Erou" << slot << "\n";
        cout << "Am scris " << numeFisier(slot) << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
Am scris salvare1.txt
Am scris salvare2.txt
Am scris salvare3.txt
```

### Exemplul 11 — Adăugăm la sfârșit: jurnalul aventurii *(Provocare, opțional)*

Normal, `ofstream` șterge ce era în fișier. Cu `ios::app` (*append*), scrii **la sfârșit**, fără să pierzi ce era. Un jurnal de joc:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

void noteaza(const string &text) {
    ofstream fout("jurnal.txt", ios::app);
    fout << text << "\n";
}

int main() {
    ofstream sterge("jurnal.txt");
    sterge.close();

    noteaza("Ai intrat in castel.");
    noteaza("Ai luat Sabia.");
    noteaza("Ai invins goblinul.");

    ifstream fin("jurnal.txt");
    string linie;
    int nr = 0;
    while (getline(fin, linie)) {
        nr++;
        cout << nr << ". " << linie << "\n";
    }
    return 0;
}
```

**Ieșire:**
```
1. Ai intrat in castel.
2. Ai luat Sabia.
3. Ai invins goblinul.
```

---

## 5. Jocul lecției

### Exemplul 12 — **Joc_L48.cpp**: salvare și continuare **[Esențial]**

Pornim de la **Joc_L47.cpp**. Adăugăm `#include <fstream>`, constanta `FISIER_SALVARE`, funcțiile `salveaza` și `incarca` (cele din Exemplele 4–8, dar pentru tot jocul), comanda `salveaza`, funcția `continuaJoc` și opțiunea 4 în meniu.

Iată ce s-a **schimbat** față de lecția trecută (`+` = linii de adăugat, `-` = linii de șters, `...` = restul codului rămâne la fel):

```diff
...
 #include <cstdlib>
 #include <ctime>
+#include <fstream>
 using namespace std;
 
...
 const string PRODUS[NR_PRODUSE] = {"Potiune", "Elixir", "Scut", "Amuleta"};
 const int PRET[NR_PRODUSE] = {8, 15, 12, 20};
+const string FISIER_SALVARE = "salvare.txt";
 
 // ---------- structuri ----------
...
     cout << "  deschide               - deschizi cufarul (doar in Turn)\n";
     cout << "  misiuni                - vezi ce ai de facut\n";
+    cout << "  salveaza               - salvezi jocul\n";
     cout << "  ajutor                 - afisezi aceasta lista\n";
     cout << "  iesire                 - parasesti jocul\n";
...
 
 // ---------- salvare ----------
+bool salveaza(const Joc &g) {
+    ofstream fout(FISIER_SALVARE);
+    if (!fout.is_open()) {
+        return false;
+    }
+    const Jucator &j = g.j;
+    fout << j.nume << "\n";
+    fout << j.viata << " " << j.viataMax << " " << j.atac << " " << j.monede << " ";
+    fout << j.scor << " " << j.camera << "\n";
+    fout << g.monstruInvins << " " << g.cheiaGasita << " " << g.cufarDeschis << "\n";
+    fout << j.inventar.size() << "\n";
+    for (const string &o : j.inventar) {
+        fout << o << "\n";
+    }
+    for (int i = 0; i < NR_CAMERE; i++) {
+        fout << (g.obiect[i].empty() ? "-" : g.obiect[i]) << "\n";
+    }
+    return true;
+}
+
+bool incarca(Joc &g) {
+    ifstream fin(FISIER_SALVARE);
+    if (!fin.is_open()) {
+        return false;
+    }
+    Joc nou;
+    Jucator &j = nou.j;
+    getline(fin, j.nume);
+    fin >> j.viata >> j.viataMax >> j.atac >> j.monede >> j.scor >> j.camera;
+    fin >> nou.monstruInvins >> nou.cheiaGasita >> nou.cufarDeschis;
+    size_t n;
+    fin >> n;
+    string linie;
+    getline(fin, linie);
+    for (size_t i = 0; i < n; i++) {
+        getline(fin, linie);
+        j.inventar.push_back(linie);
+    }
+    for (int i = 0; i < NR_CAMERE; i++) {
+        getline(fin, linie);
+        nou.obiect[i] = (linie == "-") ? "" : linie;
+    }
+    if (!fin || j.camera < 0 || j.camera >= NR_CAMERE || j.viataMax <= 0) {
+        return false;
+    }
+    g = nou;
+    return true;
+}
 
 // ---------- teste ----------
...
         } else if (cmd == "misiuni") {
             afiseazaMisiuni(g);
+        } else if (cmd == "salveaza") {
+            if (salveaza(g)) {
+                cout << "Joc salvat.\n";
+            } else {
+                cout << "Nu am putut salva jocul.\n";
+            }
         } else if (cmd == "iesire") {
             g.gata = true;
...
     joaca(g);
 }
+void continuaJoc() {
+    Joc g;
+    if (!incarca(g)) {
+        cout << "\nNu exista nicio salvare valida. Porneste un joc nou.\n";
+        return;
+    }
+    cout << "\nJoc incarcat. Bine ai revenit, " << g.j.nume << "!\n";
+    joaca(g);
+}
 
 void afiseazaMeniu() {
...
     cout << "  2. Harta castelului\n";
     cout << "  3. Cum se joaca\n";
+    cout << "  4. Continua jocul\n";
     cout << "  0. Iesire\n";
 }
...
                 afiseazaAjutor();
                 break;
+            case 4:
+                continuaJoc();
+                break;
             case 0:
                 cout << "\nLa revedere!\n";
```

Reține două lucruri:
- `incarca` citește întâi într-un `Joc nou` și copiază în `g` doar dacă totul a mers (`g = nou;`), exact ca în Exemplul 8.
- Ordinea la citire este **identică** cu ordinea de la scriere: nume, statistici, steaguri, rucsac, camere.

Fișierul `salvare.txt` apare lângă programul tău. Dacă îl deschizi într-un editor, vei vedea ceva de genul: numele, o linie cu numere, o linie cu steaguri, numărul de obiecte din rucsac, obiectele și cele șase camere.

<details>
<summary>Fișierul complet <code>Joc_L48.cpp</code> (ca să compari cu al tău)</summary>

```cpp
/*
   Joc RPG in consola: CASTELUL UITAT
   Fisier: Joc_L48.cpp
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

**Exemplu de rulare** (tastezi `1`, `Ana`, `nord`, `vest`, `ia`, `salveaza`, `iesire`, `0`; la tine zarurile dau alte rezultate):
```

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  4. Continua jocul
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

> salveaza
Joc salvat.

> iesire

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  4. Continua jocul
  0. Iesire
Alege: 0

La revedere!
```

</details>

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Joc_L48.cpp (obligatoriu)
Scrie programul din Exemplul 12, pornind de la `Joc_L47.cpp`. Testează: pornește un joc nou, ia câteva obiecte, scrie `salveaza`, apoi `iesire`. Pornește programul din nou și alege **4. Continuă jocul**. Eroul trebuie să fie exact ca înainte.

### Exercițiul B — Verifică fișierul
Deschide `salvare.txt` cu un editor de text și verifică, linie cu linie, dacă ce vezi corespunde cu ce ai salvat (numele, viața, monedele, rucsacul).

### Exercițiul C — Fără salvare
Șterge `salvare.txt` și alege „Continuă jocul”. Programul trebuie să afișeze un mesaj prietenos, nu să se blocheze.

### Exercițiul D — Salvare automată *(Provocare, opțional)*
Salvează automat jocul după fiecare luptă câștigată, în afară de comanda `salveaza`.

### Exercițiul E — Mai multe sloturi *(Provocare, opțional)*
Folosește Exemplul 10: cere un număr de slot (1–3) la `salveaza` și la „Continuă jocul”.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] `salveaza` creează fișierul `salvare.txt`  
- [ ] „Continuă jocul” readuce eroul, rucsacul, camera și misiunile exact ca la salvare  
- [ ] Fără fișier de salvare, jocul afișează un mesaj și nu se strică  
- [ ] Ai salvat fișierul ca `Joc_L48.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] La încărcare, afișează numele eroului și camera în care se află  
- [ ] Adaugă comanda `sterge_salvarea` (caută `remove("salvare.txt")` din `<cstdio>`)  
- [ ] Salvează și cele mai bune scoruri într-un fișier separat  
- [ ] Scrie în fișier și data salvării (caută `time(0)`)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Numele eroului apare gol după încărcare | `>>` urmat de `getline` | Citește o linie în plus înainte de `getline` |
| Datele apar amestecate | Ordine diferită la citire | Citește exact în ordinea în care ai scris |
| Fișierul de salvare nu apare | Îl cauți în alt folder | Se creează în folderul de lucru al programului |
| Programul se blochează dacă nu există salvare | Nu verifici `is_open()` | `if (!fin.is_open()) return false;` |
| Obiectele din camere se pierd | Un șir gol scris ca linie goală | Scrie `-` pentru „nimic” |
| `ofstream` șterge salvarea veche | Așa funcționează implicit | Pentru adăugare folosește `ios::app` |
| Eroare: `incomplete type` la `ofstream` | Lipsește `#include <fstream>` | Adaugă `#include <fstream>` |

---

## Recapitulare pe scurt

- `#include <fstream>`; `ofstream` scrie, `ifstream` citește.
- Scrii cu `<<`, citești cu `>>` sau `getline`, ca la `cout` și `cin`.
- Verifică mereu `is_open()` înainte de citire.
- Pentru un `vector`, scrie întâi **numărul de elemente**.
- **Citește în aceeași ordine în care ai scris.**
- După `>>`, urmat de `getline`, consumă linia nouă rămasă.
- Citește întâi într-o copie și suprascrie datele reale doar dacă totul a mers bine.

---

## Temă
1. Termină Exercițiul A și testează salvarea de cel puțin trei ori, în momente diferite din joc.  
2. Deschide `salvare.txt` și încearcă să schimbi un număr (de exemplu monedele). Încarcă jocul. Ce observi? Ce s-ar întâmpla dacă cineva ar scrie litere în loc de numere?  
3. Salvează tot ca `Joc_L48.cpp`.

---

## Ce urmează — Lecția 9
**Curățare cod și depanare.** Jocul tău are acum sute de linii. Învățăm să-l facem **ușor de citit** (nume bune, comentarii, funcții mici), să găsim și să reparăm greșeli (*debugging*) și să adăugăm un meniu de teste interne.
