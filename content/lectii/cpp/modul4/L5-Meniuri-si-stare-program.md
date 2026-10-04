# LECȚIA 5 — Meniuri și starea programului: scheletul unei aplicații
**Modulul 4 · Proiecte și autonomie · 2 ore**  
**Code Kids Play · CodeKids Graduate**

> Până acum, meniurile tale funcționau doar dacă utilizatorul tasta ce trebuie. Dar un utilizator real scrie litere în loc de numere, apasă Enter fără să scrie nimic, alege opțiuni care nu există. Azi construim partea „solidă” a unei aplicații: **citire sigură** a datelor, **meniuri** curate, **starea programului** ținută într-un singur loc și un **schelet** pe care îl poți refolosi în toate proiectele.  
> Proiect: **„Lista de sarcini”** · fișier: `Prenume_Nume_M4L5.cpp` (ex. `Ana_Pop_M4L5.cpp`)

---

## Obiectiv
La finalul orei detectezi și repari o citire eșuată (`cin.fail`, `cin.clear`, `cin.ignore`), scrii funcții de citire sigură pentru numere și texte, construiești un meniu cu `switch` și cu `enum`, ții starea aplicației într-o structură, întrebi utilizatorul „Ești sigur?” înainte de acțiuni periculoase și salvezi datele la ieșire doar dacă s-au schimbat.  
**Minim:** o funcție `citesteInt` care nu se strică la litere și un meniu care o folosește.  
**Ținta orei (Complet):** + structura de stare, `enum` pentru opțiuni, confirmarea la ieșire și proiectul „Lista de sarcini”.

## De ce contează
O aplicație care se blochează sau intră în buclă infinită când tastezi o literă nu este o aplicație, este o demonstrație fragilă. Diferența dintre un program de școală și unul pe care îl poate folosi altcineva este exact asta: **rezistă la greșelile utilizatorului**. Iar scheletul de azi (meniu, stare, salvare) este baza proiectelor din lecțiile 6–8 și a jocului RPG din Modulul 5.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `vector` de structuri, CRUD |
| 10–35 | Ce se întâmplă când citirea eșuează, citire sigură (**Exemplele 1–3**) |
| 35–60 | Meniuri: `switch`, funcția `meniu`, `enum` (**Exemplele 4–7**) |
| 60–80 | Comenzi text, submeniuri (**Exemplele 8–9**, opționale) |
| 80–100 | Starea programului, confirmări, fișiere (**Exemplele 10–14**; Exemplele 11 și 12 sunt opționale) |
| 100–118 | Schelet și proiect (**Exemplele 15–16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **7 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Când citirea eșuează

Ce se întâmplă dacă programul cere un număr, iar utilizatorul scrie `abc`?

### Exemplul 1 — `cin.fail()` **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 7;
    cout << "Scrie un numar: ";
    cin >> x;

    if (cin.fail()) {
        cout << "Citirea a esuat! x = " << x << endl;
    } else {
        cout << "Ai scris " << x << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `abc`):
```
Scrie un numar: abc
Citirea a esuat! x = 0
```

Când `cin` nu poate citi tipul cerut, intră într-o **stare de eroare**: `cin.fail()` devine adevărat, variabila primește valoarea `0`, iar textul `abc` **rămâne neconsumat** în buffer. Cât timp `cin` este în stare de eroare, toate citirile următoare sunt ignorate. Într-un meniu din `do-while`, asta înseamnă o **buclă infinită**: programul tot încearcă să citească, `abc` tot nu se citește.

Repararea se face în doi pași:

| Pas | Instrucțiune | Ce face |
|-----|--------------|---------|
| 1 | `cin.clear();` | scoate `cin` din starea de eroare |
| 2 | `cin.ignore(numeric_limits<streamsize>::max(), '\n');` | aruncă tot ce a rămas pe linia curentă, până la Enter |

Pentru al doilea pas ai nevoie de `#include <limits>`. Formula arată lungă, dar o scrii o singură dată, într-o funcție, și nu mai te gândești la ea.

### Exemplul 2 — `citesteInt`: număr dintr-un interval **[Esențial]**

Funcția repetă întrebarea până primește un număr valid, din intervalul cerut:

```cpp
#include <iostream>
#include <string>
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
        cout << "  Valoare invalida. Scrie un numar intre " << minim << " si " << maxim << "." << endl;
    }
}

int main() {
    int varsta = citesteInt("Varsta (1-120): ", 1, 120);
    cout << "Ai " << varsta << " ani." << endl;
    return 0;
}
```

**Rulare** (tastezi `abc`, `-5`, `150`, `12`):
```
Varsta (1-120): abc
  Valoare invalida. Scrie un numar intre 1 si 120.
Varsta (1-120): -5
  Valoare invalida. Scrie un numar intre 1 si 120.
Varsta (1-120): 150
  Valoare invalida. Scrie un numar intre 1 si 120.
Varsta (1-120): 12
Ai 12 ani.
```

Funcția face tot ce trebuie: reține dacă citirea a reușit (`ok`), curăță `cin` indiferent de rezultat, și abia apoi verifică intervalul. Dacă ceva nu e în regulă, afișează un mesaj și întreabă din nou. Din `main` o folosești ca pe orice funcție, fără să te mai gândești la erori.

### Exemplul 3 — `citesteDouble` și `citesteText`

Pentru numere cu zecimale funcția arată la fel. Pentru **texte cu spații** folosim `getline`. Expresia `getline(cin >> ws, s)` sare mai întâi peste spațiile și Enter-urile rămase (`ws` înseamnă *whitespace*), apoi citește linia:

```cpp
#include <iostream>
#include <string>
#include <limits>
using namespace std;

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

int main() {
    string nume = citesteText("Numele complet: ");
    double inaltime = citesteDouble("Inaltimea in metri (0.5 - 2.5): ", 0.5, 2.5);
    cout << nume << " are " << inaltime << " m." << endl;
    return 0;
}
```

**Rulare** (tastezi `Ana Maria`, `abc`, `9`, `1.45`):
```
Numele complet: Ana Maria
Inaltimea in metri (0.5 - 2.5): abc
  Valoare invalida (0.5 - 2.5).
Inaltimea in metri (0.5 - 2.5): 9
  Valoare invalida (0.5 - 2.5).
Inaltimea in metri (0.5 - 2.5): 1.45
Ana Maria are 1.45 m.
```

---

## 2. Meniuri

### Exemplul 4 — Calculator cu `switch` **[Esențial]**

`switch` este potrivit pentru meniuri: alegi o valoare și execuți ramura ei. Fiecare ramură se termină cu `break;`, iar `default` prinde orice altceva:

```cpp
#include <iostream>
#include <string>
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

int main() {
    int optiune;
    do {
        cout << endl;
        cout << "--- CALCULATOR ---" << endl;
        cout << "1. Aduna" << endl;
        cout << "2. Scade" << endl;
        cout << "3. Inmulteste" << endl;
        cout << "4. Imparte" << endl;
        cout << "0. Iesire" << endl;
        optiune = citesteInt("Alege: ", 0, 4);

        if (optiune == 0) {
            break;
        }

        int a = citesteInt("Primul numar: ", -1000, 1000);
        int b = citesteInt("Al doilea numar: ", -1000, 1000);

        switch (optiune) {
            case 1:
                cout << a << " + " << b << " = " << a + b << endl;
                break;
            case 2:
                cout << a << " - " << b << " = " << a - b << endl;
                break;
            case 3:
                cout << a << " * " << b << " = " << a * b << endl;
                break;
            case 4:
                if (b == 0) {
                    cout << "Nu se poate imparti la 0." << endl;
                } else {
                    cout << a << " / " << b << " = " << (double)a / b << endl;
                }
                break;
            default:
                cout << "Optiune necunoscuta." << endl;
        }
    } while (optiune != 0);

    cout << "La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1`, `2`, `3`, `4`, `7`, `2`, `4`, `5`, `0`, `9`, `0`):
```

--- CALCULATOR ---
1. Aduna
2. Scade
3. Inmulteste
4. Imparte
0. Iesire
Alege: 1
Primul numar: 2
Al doilea numar: 3
2 + 3 = 5

--- CALCULATOR ---
1. Aduna
2. Scade
3. Inmulteste
4. Imparte
0. Iesire
Alege: 4
Primul numar: 7
Al doilea numar: 2
7 / 2 = 3.5

--- CALCULATOR ---
1. Aduna
2. Scade
3. Inmulteste
4. Imparte
0. Iesire
Alege: 4
Primul numar: 5
Al doilea numar: 0
Nu se poate imparti la 0.

--- CALCULATOR ---
1. Aduna
2. Scade
3. Inmulteste
4. Imparte
0. Iesire
Alege: 9
  Valoare invalida (0 - 4).
Alege: 0
La revedere!
```

Acum `citesteInt` limitează opțiunea la `0..4`, deci `default` nu se mai ajunge niciodată (am încercat `9`, iar funcția a refuzat-o înainte). Îl păstrăm totuși: este o plasă de siguranță dacă mai târziu adaugi opțiuni în meniu și uiți un `case`. Observă și `break;` din `if (optiune == 0)`: el iese imediat din bucla `do-while`, fără să mai ceară numerele.

### Exemplul 5 — Meniul într-o funcție, starea în `main` **[Esențial]**

Când programul crește, `main` trebuie să rămână scurt. Mutăm afișarea meniului într-o funcție care întoarce opțiunea aleasă, iar fiecare acțiune devine o funcție separată. **Starea** (aici, valoarea contorului) trăiește în `main` și este trimisă prin referință funcțiilor care o modifică.

```cpp
#include <iostream>
#include <string>
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

int meniu(int contor) {
    cout << endl;
    cout << "=== NUMARATOR (valoare: " << contor << ") ===" << endl;
    cout << "1. Plus 1" << endl;
    cout << "2. Minus 1" << endl;
    cout << "3. Reseteaza" << endl;
    cout << "0. Iesire" << endl;
    return citesteInt("Alege: ", 0, 3);
}

void plus1(int &contor) {
    contor++;
}

void minus1(int &contor) {
    if (contor == 0) {
        cout << "Contorul nu poate fi negativ." << endl;
    } else {
        contor--;
    }
}

void reseteaza(int &contor) {
    contor = 0;
}

int main() {
    int contor = 0;
    bool ruleaza = true;

    while (ruleaza) {
        int optiune = meniu(contor);
        if (optiune == 1) {
            plus1(contor);
        } else if (optiune == 2) {
            minus1(contor);
        } else if (optiune == 3) {
            reseteaza(contor);
        } else {
            ruleaza = false;
        }
    }

    cout << "Valoare finala: " << contor << endl;
    return 0;
}
```

**Rulare** (tastezi `2`, `1`, `1`, `1`, `2`, `3`, `0`):
```

=== NUMARATOR (valoare: 0) ===
1. Plus 1
2. Minus 1
3. Reseteaza
0. Iesire
Alege: 2
Contorul nu poate fi negativ.

=== NUMARATOR (valoare: 0) ===
1. Plus 1
2. Minus 1
3. Reseteaza
0. Iesire
Alege: 1

=== NUMARATOR (valoare: 1) ===
1. Plus 1
2. Minus 1
3. Reseteaza
0. Iesire
Alege: 1

=== NUMARATOR (valoare: 2) ===
1. Plus 1
2. Minus 1
3. Reseteaza
0. Iesire
Alege: 1

=== NUMARATOR (valoare: 3) ===
1. Plus 1
2. Minus 1
3. Reseteaza
0. Iesire
Alege: 2

=== NUMARATOR (valoare: 2) ===
1. Plus 1
2. Minus 1
3. Reseteaza
0. Iesire
Alege: 3

=== NUMARATOR (valoare: 0) ===
1. Plus 1
2. Minus 1
3. Reseteaza
0. Iesire
Alege: 0
Valoare finala: 0
```

Variabila `ruleaza` este un **steag** (*flag*): cât timp este `true`, aplicația merge. Opțiunea „Iesire” doar o face `false`. Așa se scrie bucla principală a oricărei aplicații cu meniu, și așa vei scrie și bucla principală a jocului din Modulul 5. Începi cu 2 (minus pe 0, mesaj de eroare), apoi 1, 1, 1 (contorul urcă la 3), 2 (coboară la 2), 3 (reset).

### Exemplul 6 — Confirmarea: „Ești sigur?” **[Esențial]**

Înainte de o acțiune care nu se poate anula (ștergere, resetare, ieșire fără salvare), întreabă utilizatorul. Funcția `confirma` acceptă `da`, `nu`, `d` sau `n`, cu litere mari sau mici, și repetă întrebarea la orice altceva:

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool confirma(const string &intrebare) {
    while (true) {
        string r;
        cout << intrebare << " (da/nu): ";
        cin >> r;
        int n = r.length();
        for (int i = 0; i < n; i++) {
            r[i] = tolower(r[i]);
        }
        if (r == "da" || r == "d") {
            return true;
        }
        if (r == "nu" || r == "n") {
            return false;
        }
        cout << "  Raspunde cu da sau nu." << endl;
    }
}

int main() {
    int scor = 120;
    cout << "Scorul tau: " << scor << endl;

    if (confirma("Vrei sa resetezi scorul?")) {
        scor = 0;
        cout << "Scor resetat." << endl;
    } else {
        cout << "Scorul a ramas " << scor << "." << endl;
    }

    if (confirma("Esti sigur ca vrei sa iesi?")) {
        cout << "La revedere!" << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `poate`, `NU`, `Da`):
```
Scorul tau: 120
Vrei sa resetezi scorul? (da/nu): poate
  Raspunde cu da sau nu.
Vrei sa resetezi scorul? (da/nu): NU
Scorul a ramas 120.
Esti sigur ca vrei sa iesi? (da/nu): Da
La revedere!
```

### Exemplul 7 — `enum`: opțiuni cu nume **[Esențial]**

În cod, `if (optiune == 3)` nu spune ce înseamnă `3`. Cu un **`enum`** dai nume valorilor. Fiecare nume primește automat un număr, începând de la `0`:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <limits>
using namespace std;

enum Optiune { IESIRE, ADAUGA, LISTA, STERGE };

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

void afiseaza(const vector<string> &lista) {
    if (lista.empty()) {
        cout << "Lista este goala." << endl;
        return;
    }
    int n = lista.size();
    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". " << lista[i] << endl;
    }
}

int main() {
    vector<string> cumparaturi;
    Optiune o;

    do {
        cout << endl << "1. Adauga  2. Lista  3. Sterge  0. Iesire" << endl;
        o = (Optiune)citesteInt("Alege: ", 0, 3);

        switch (o) {
            case ADAUGA: {
                string produs;
                cout << "Produs: ";
                cin >> produs;
                cumparaturi.push_back(produs);
                break;
            }
            case LISTA:
                afiseaza(cumparaturi);
                break;
            case STERGE:
                if (cumparaturi.empty()) {
                    cout << "Nu ai ce sterge." << endl;
                } else {
                    afiseaza(cumparaturi);
                    int nr = citesteInt("Numarul produsului de sters: ", 1, cumparaturi.size());
                    cumparaturi.erase(cumparaturi.begin() + (nr - 1));
                }
                break;
            case IESIRE:
                break;
        }
    } while (o != IESIRE);

    cout << "Ai ramas cu " << cumparaturi.size() << " produse." << endl;
    return 0;
}
```

**Rulare** (tastezi `1`, `lapte`, `1`, `paine`, `1`, `mere`, `3`, `7`, `2`, `2`, `0`):
```

1. Adauga  2. Lista  3. Sterge  0. Iesire
Alege: 1
Produs: lapte

1. Adauga  2. Lista  3. Sterge  0. Iesire
Alege: 1
Produs: paine

1. Adauga  2. Lista  3. Sterge  0. Iesire
Alege: 1
Produs: mere

1. Adauga  2. Lista  3. Sterge  0. Iesire
Alege: 3
1. lapte
2. paine
3. mere
Numarul produsului de sters: 7
  Valoare invalida (1 - 3).
Numarul produsului de sters: 2

1. Adauga  2. Lista  3. Sterge  0. Iesire
Alege: 2
1. lapte
2. mere

1. Adauga  2. Lista  3. Sterge  0. Iesire
Alege: 0
Ai ramas cu 2 produse.
```

Acum `case ADAUGA:` se citește singur. Dacă într-un `switch` pe un `enum` uiți să tratezi o valoare, compilatorul te avertizează, încă un avantaj. Observă acoladele `{ … }` din `case ADAUGA`: când declari o variabilă (`string produs`) într-un `case`, ai nevoie de ele.

---

## 3. Comenzi text și submeniuri

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

### Exemplul 8 — Comenzi text în loc de numere *(Provocare, opțional)*

Aplicațiile din consolă (și jocurile cu aventură) folosesc de multe ori **cuvinte** în loc de cifre. Compari textul citit cu comenzile cunoscute:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> note;
    string comanda;

    cout << "Comenzi: adauga <cuvant>, lista, numar, iesire" << endl;
    while (true) {
        cout << "> ";
        cin >> comanda;

        if (comanda == "adauga") {
            string cuvant;
            cin >> cuvant;
            note.push_back(cuvant);
            cout << "Adaugat: " << cuvant << endl;
        } else if (comanda == "lista") {
            for (const string &c : note) {
                cout << " - " << c << endl;
            }
        } else if (comanda == "numar") {
            cout << "Ai " << note.size() << " cuvinte." << endl;
        } else if (comanda == "iesire") {
            break;
        } else {
            cout << "Comanda necunoscuta: " << comanda << endl;
        }
    }
    cout << "Pe curand!" << endl;
    return 0;
}
```

**Rulare** (tastezi `adauga mere`, `adauga pere`, `salut`, `lista`, `numar`, `iesire`):
```
Comenzi: adauga <cuvant>, lista, numar, iesire
> adauga mere
Adaugat: mere
> adauga pere
Adaugat: pere
> salut
Comanda necunoscuta: salut
> lista
 - mere
 - pere
> numar
Ai 2 cuvinte.
> iesire
Pe curand!
```

Aici `cin >> comanda` citește un cuvânt, iar pentru `adauga` mai citim încă unul. O comandă necunoscută nu strică nimic, doar afișează un mesaj. Este un mod mult mai natural de a lucra, iar tiparul `comanda == "…"` îl vei reîntâlni în jocul RPG („atac”, „fugi”, „inventar”).

### Exemplul 9 — Submeniuri *(Provocare, opțional)*

Un meniu poate deschide alt meniu. Fiecare meniu este o funcție care are propria buclă și se termină când alegi „Înapoi”. Aici, un submeniu de setări modifică starea jocului:

```cpp
#include <iostream>
#include <string>
#include <limits>
using namespace std;

struct Setari {
    string nume = "Jucator";
    int dificultate = 1;
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

string numeDificultate(int d) {
    if (d == 1) {
        return "usor";
    }
    if (d == 2) {
        return "mediu";
    }
    return "greu";
}

void meniuSetari(Setari &s) {
    int opt;
    do {
        cout << endl << "--- SETARI ---" << endl;
        cout << "1. Dificultate (acum: " << numeDificultate(s.dificultate) << ")" << endl;
        cout << "2. Nume (acum: " << s.nume << ")" << endl;
        cout << "0. Inapoi" << endl;
        opt = citesteInt("Alege: ", 0, 2);

        if (opt == 1) {
            s.dificultate = citesteInt("Dificultate (1 usor, 2 mediu, 3 greu): ", 1, 3);
        } else if (opt == 2) {
            cout << "Nume nou: ";
            cin >> s.nume;
        }
    } while (opt != 0);
}

int main() {
    Setari setari;
    int opt;
    do {
        cout << endl << "=== MENIU PRINCIPAL ===" << endl;
        cout << "1. Joaca" << endl;
        cout << "2. Setari" << endl;
        cout << "0. Iesire" << endl;
        opt = citesteInt("Alege: ", 0, 2);

        if (opt == 1) {
            cout << setari.nume << " joaca pe dificultatea " << numeDificultate(setari.dificultate) << "." << endl;
        } else if (opt == 2) {
            meniuSetari(setari);
        }
    } while (opt != 0);

    cout << "La revedere, " << setari.nume << "!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1`, `2`, `1`, `3`, `2`, `Alex`, `0`, `1`, `0`):
```

=== MENIU PRINCIPAL ===
1. Joaca
2. Setari
0. Iesire
Alege: 1
Jucator joaca pe dificultatea usor.

=== MENIU PRINCIPAL ===
1. Joaca
2. Setari
0. Iesire
Alege: 2

--- SETARI ---
1. Dificultate (acum: usor)
2. Nume (acum: Jucator)
0. Inapoi
Alege: 1
Dificultate (1 usor, 2 mediu, 3 greu): 3

--- SETARI ---
1. Dificultate (acum: greu)
2. Nume (acum: Jucator)
0. Inapoi
Alege: 2
Nume nou: Alex

--- SETARI ---
1. Dificultate (acum: greu)
2. Nume (acum: Alex)
0. Inapoi
Alege: 0

=== MENIU PRINCIPAL ===
1. Joaca
2. Setari
0. Iesire
Alege: 1
Alex joaca pe dificultatea greu.

=== MENIU PRINCIPAL ===
1. Joaca
2. Setari
0. Iesire
Alege: 0
La revedere, Alex!
```

Observă că `setari` este creată o singură dată, în `main`, și trimisă prin referință submeniului. Datele se păstrează când te întorci din submeniu.

---

## 4. Starea programului

**Starea** unui program este tot ce „știe” el în acest moment: lista de elemente, scorul, setările, dacă există modificări nesalvate. Un obicei foarte bun: **strângi starea într-o structură** și o trimiți funcțiilor, în loc să ai multe variabile răspândite.

### Exemplul 10 — O stare mai complexă: portofelul

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <limits>
using namespace std;

struct Portofel {
    int sold = 0;
    vector<string> istoric;
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

void depune(Portofel &p) {
    int suma = citesteInt("Suma de depus (1-1000): ", 1, 1000);
    p.sold += suma;
    p.istoric.push_back("Depunere " + to_string(suma));
}

void retrage(Portofel &p) {
    int suma = citesteInt("Suma de retras (1-1000): ", 1, 1000);
    if (suma > p.sold) {
        cout << "Fonduri insuficiente (sold " << p.sold << ")." << endl;
        p.istoric.push_back("Retragere refuzata " + to_string(suma));
        return;
    }
    p.sold -= suma;
    p.istoric.push_back("Retragere " + to_string(suma));
}

void arataIstoric(const Portofel &p) {
    if (p.istoric.empty()) {
        cout << "Nicio operatiune." << endl;
        return;
    }
    int n = p.istoric.size();
    for (int i = 0; i < n; i++) {
        cout << i + 1 << ". " << p.istoric[i] << endl;
    }
}

int main() {
    Portofel p;
    int opt;
    do {
        cout << endl << "PORTOFEL - sold " << p.sold << " lei" << endl;
        cout << "1. Depune  2. Retrage  3. Istoric  0. Iesire" << endl;
        opt = citesteInt("Alege: ", 0, 3);

        if (opt == 1) {
            depune(p);
        } else if (opt == 2) {
            retrage(p);
        } else if (opt == 3) {
            arataIstoric(p);
        }
    } while (opt != 0);

    cout << "Sold final: " << p.sold << " lei" << endl;
    return 0;
}
```

**Rulare** (tastezi `1`, `100`, `2`, `30`, `2`, `500`, `3`, `0`):
```

PORTOFEL - sold 0 lei
1. Depune  2. Retrage  3. Istoric  0. Iesire
Alege: 1
Suma de depus (1-1000): 100

PORTOFEL - sold 100 lei
1. Depune  2. Retrage  3. Istoric  0. Iesire
Alege: 2
Suma de retras (1-1000): 30

PORTOFEL - sold 70 lei
1. Depune  2. Retrage  3. Istoric  0. Iesire
Alege: 2
Suma de retras (1-1000): 500
Fonduri insuficiente (sold 70).

PORTOFEL - sold 70 lei
1. Depune  2. Retrage  3. Istoric  0. Iesire
Alege: 3
1. Depunere 100
2. Retragere 30
3. Retragere refuzata 500

PORTOFEL - sold 70 lei
1. Depune  2. Retrage  3. Istoric  0. Iesire
Alege: 0
Sold final: 70 lei
```

Fiecare funcție primește `Portofel &p` și lucrează cu **toată starea** printr-un singur parametru. Dacă mai târziu adaugi un câmp (de exemplu `moneda`), nu trebuie să schimbi semnăturile funcțiilor. Asta este avantajul principal al unei structuri de stare.

### Exemplul 11 — Jurnal de activitate (`ios::app`) *(Provocare, opțional)*

Aplicațiile serioase își notează într-un fișier ce se întâmplă (un *log*). Folosim modul `ios::app` din lecția 1, ca să nu ștergem ce era scris înainte:

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <cstdio>
using namespace std;

const string LOG = "jurnal_app.txt";

void scrieLog(const string &mesaj) {
    ofstream fout(LOG, ios::app);
    fout << mesaj << endl;
}

int main() {
    remove(LOG.c_str());   // pornim cu un jurnal gol

    scrieLog("Aplicatia a pornit");
    scrieLog("Utilizatorul a adaugat un produs");
    scrieLog("Utilizatorul a sters un produs");
    scrieLog("Aplicatia s-a oprit");

    cout << "Continutul jurnalului:" << endl;
    ifstream fin(LOG);
    string linie;
    int nr = 0;
    while (getline(fin, linie)) {
        nr++;
        cout << nr << ". " << linie << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Continutul jurnalului:
1. Aplicatia a pornit
2. Utilizatorul a adaugat un produs
3. Utilizatorul a sters un produs
4. Aplicatia s-a oprit
```

`remove` (din `<cstdio>`) șterge un fișier; l-am folosit doar ca exemplul să pornească mereu de la zero. Observă că `scrieLog` deschide și închide fișierul la fiecare apel (închiderea se face singură la sfârșitul funcției). Pentru un jurnal e cel mai sigur: nimic nu se pierde dacă programul se oprește brusc.

### Exemplul 12 — Setări salvate și încărcate *(Provocare, opțional)*

Setările trebuie să rămână între rulări. Tiparul este cel din lecțiile trecute: `incarca` la pornire, `salveaza` la ieșire, iar dacă fișierul lipsește, folosești valorile implicite:

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <cstdio>
using namespace std;

struct Setari {
    string nume = "Jucator";
    int volum = 50;
    bool sunet = true;
};

const string FISIER = "setari.txt";

Setari incarca() {
    Setari s;   // valorile implicite
    ifstream fin(FISIER);
    if (fin.is_open()) {
        fin >> s.nume >> s.volum >> s.sunet;
    }
    return s;
}

void salveaza(const Setari &s) {
    ofstream fout(FISIER);
    fout << s.nume << " " << s.volum << " " << s.sunet << endl;
}

void afiseaza(const Setari &s) {
    cout << "Nume: " << s.nume << ", volum: " << s.volum << ", sunet: ";
    if (s.sunet) {
        cout << "pornit" << endl;
    } else {
        cout << "oprit" << endl;
    }
}

int main() {
    remove(FISIER.c_str());   // simulam prima rulare

    Setari s = incarca();
    cout << "Prima rulare (fisier lipsa):" << endl;
    afiseaza(s);

    s.nume = "Alex";
    s.volum = 80;
    s.sunet = false;
    salveaza(s);
    cout << "Am modificat si salvat setarile." << endl;

    Setari t = incarca();
    cout << "A doua rulare (incarcat din fisier):" << endl;
    afiseaza(t);
    return 0;
}
```

**Ieșire:**
```
Prima rulare (fisier lipsa):
Nume: Jucator, volum: 50, sunet: pornit
Am modificat si salvat setarile.
A doua rulare (incarcat din fisier):
Nume: Alex, volum: 80, sunet: oprit
```

Un `bool` se scrie în fișier ca `1` (adevărat) sau `0` (fals) și se citește la fel.

### Exemplul 13 — Steagul „modificat”: salvăm doar dacă e nevoie

Dacă utilizatorul n-a schimbat nimic, nu are sens să-l întrebi dacă vrea să salveze. Păstrăm în stare un steag `modificat`, care devine `true` la orice schimbare și `false` după salvare:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cctype>
using namespace std;

struct Stare {
    vector<string> elemente;
    bool modificat = false;
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

void adauga(Stare &s, const string &x) {
    s.elemente.push_back(x);
    s.modificat = true;
}

void salveaza(Stare &s) {
    // aici ar urma scrierea in fisier
    cout << "(Salvez " << s.elemente.size() << " elemente)" << endl;
    s.modificat = false;
}

void iesire(Stare &s) {
    if (s.modificat) {
        if (confirma("Ai modificari nesalvate. Le salvezi?")) {
            salveaza(s);
        }
    } else {
        cout << "Nu ai modificari nesalvate." << endl;
    }
}

int main() {
    Stare s;
    iesire(s);            // nimic modificat

    adauga(s, "unu");
    adauga(s, "doi");
    iesire(s);            // are modificari: intreaba

    iesire(s);            // dupa salvare: nu mai intreaba
    return 0;
}
```

**Rulare** (tastezi `da`):
```
Nu ai modificari nesalvate.
Ai modificari nesalvate. Le salvezi? (da/nu): da
(Salvez 2 elemente)
Nu ai modificari nesalvate.
```

### Exemplul 14 — Meniu frumos: antet, linii și pauză

Un meniu aranjat se citește mai ușor. Ținem formatarea în funcții mici, pe care le folosim peste tot. Pentru „Apasă Enter” citim o linie întreagă (merge corect pentru că `citesteInt` curăță mereu restul liniei, deci în buffer nu rămâne un Enter vechi):

```cpp
#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

void linie(int n) {
    cout << string(n, '=') << endl;
}

void antet(const string &titlu) {
    linie(30);
    int spatii = (30 - (int)titlu.length()) / 2;
    cout << string(spatii, ' ') << titlu << endl;
    linie(30);
}

void pauza() {
    cout << "Apasa Enter pentru a continua...";
    string s;
    getline(cin, s);
}

int main() {
    antet("MAGAZIN");
    cout << left << setw(12) << "Caiet" << right << setw(6) << "4.50" << " lei" << endl;
    cout << left << setw(12) << "Pix" << right << setw(6) << "2.00" << " lei" << endl;
    cout << left << setw(12) << "Rucsac" << right << setw(6) << "120.00" << " lei" << endl;
    linie(30);
    pauza();
    cout << "Gata." << endl;
    return 0;
}
```

**Rulare** (apeși doar Enter la pauză):
```
==============================
           MAGAZIN
==============================
Caiet         4.50 lei
Pix           2.00 lei
Rucsac      120.00 lei
==============================
Apasa Enter pentru a continua...
Gata.
```

`string(n, '=')` creează un text cu `n` caractere `=` (de exemplu `string(5, '*')` este `*****`). Nu există o instrucțiune universală pentru „șterge ecranul” (comenzile diferă între Windows și restul sistemelor), deci în proiecte rămânem la linii separatoare și la afișare curată.

---

## 5. Schelet și proiect

### Exemplul 15 — Scheletul de aplicație

Iată un șablon pe care îl copiezi la începutul oricărui proiect. Toate piesele sunt aici; completezi acțiunile cu logica proiectului tău (în comentarii `TODO` e locul unde adaugi cod).

```cpp
/*
   Program: Schelet de aplicatie
   Scop:    sablon cu citire sigura, meniu, stare si salvare
*/
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <limits>
using namespace std;

// ---------- 1. STAREA ----------
struct Stare {
    vector<string> date;    // TODO: schimba cu datele proiectului tau
    bool modificat = false;
};

const string FISIER = "date_app.txt";

// ---------- 2. CITIRE SIGURA ----------
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

// ---------- 3. FISIERE ----------
void incarca(Stare &s) {
    ifstream fin(FISIER);
    if (!fin.is_open()) {
        return;
    }
    string linie;
    while (getline(fin, linie)) {
        s.date.push_back(linie);   // TODO: citeste datele tale
    }
}

void salveaza(Stare &s) {
    ofstream fout(FISIER);
    for (const string &x : s.date) {
        fout << x << endl;         // TODO: scrie datele tale
    }
    s.modificat = false;
}

// ---------- 4. ACTIUNI ----------
void actiune1(Stare &s) {
    cout << "TODO: actiunea 1 (aici ai " << s.date.size() << " elemente)" << endl;
}

void actiune2(Stare &s) {
    cout << "TODO: actiunea 2 (aici ai " << s.date.size() << " elemente)" << endl;
}

// ---------- 5. MENIU ----------
int meniu() {
    cout << endl;
    cout << "===== APLICATIA MEA =====" << endl;
    cout << "1. Actiunea 1" << endl;
    cout << "2. Actiunea 2" << endl;
    cout << "3. Salveaza" << endl;
    cout << "0. Iesire" << endl;
    return citesteInt("Alege: ", 0, 3);
}

// ---------- 6. PROGRAMUL ----------
int main() {
    Stare s;
    incarca(s);

    bool ruleaza = true;
    while (ruleaza) {
        int opt = meniu();
        if (opt == 1) {
            actiune1(s);
        } else if (opt == 2) {
            actiune2(s);
        } else if (opt == 3) {
            salveaza(s);
            cout << "Salvat." << endl;
        } else {
            ruleaza = false;
        }
    }

    if (s.modificat) {
        salveaza(s);
    }
    cout << "La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1`, `x`, `2`, `3`, `0`):
```

===== APLICATIA MEA =====
1. Actiunea 1
2. Actiunea 2
3. Salveaza
0. Iesire
Alege: 1
TODO: actiunea 1 (aici ai 0 elemente)

===== APLICATIA MEA =====
1. Actiunea 1
2. Actiunea 2
3. Salveaza
0. Iesire
Alege: x
  Valoare invalida (0 - 3).
Alege: 2
TODO: actiunea 2 (aici ai 0 elemente)

===== APLICATIA MEA =====
1. Actiunea 1
2. Actiunea 2
3. Salveaza
0. Iesire
Alege: 3
Salvat.

===== APLICATIA MEA =====
1. Actiunea 1
2. Actiunea 2
3. Salveaza
0. Iesire
Alege: 0
La revedere!
```

Chiar dacă acțiunile încă nu fac nimic, scheletul **rulează**, rezistă la litere (`x` a fost respins) și iese curat. Așa construiești proiecte mari: pornești de la un schelet care merge și adaugi acțiunile pe rând, testând după fiecare.

### Exemplul 16 — „Lista de sarcini” (mini-proiect) **[Esențial]**

Folosim scheletul pentru o aplicație de tip *to-do*: sarcini cu text (cu spații) și stare (făcută / nefăcută), meniu cu `enum`, confirmare la ieșire și salvare doar dacă e nevoie.

```cpp
/*
   Program: Lista de sarcini
   Scop:    aplicatie cu meniu, stare, citire sigura si salvare
*/
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <limits>
#include <cctype>
using namespace std;

// ---------- structuri ----------
struct Sarcina {
    string text;
    bool gata = false;
};

struct Stare {
    vector<Sarcina> sarcini;
    bool modificat = false;
};

enum Optiune { IESIRE, ADAUGA, LISTA, TERMINA, STERGE, CURATA, SALVEAZA };

const string FISIER = "sarcini.txt";

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

// ---------- fisiere ----------
void incarca(Stare &s) {
    ifstream fin(FISIER);
    if (!fin.is_open()) {
        return;
    }
    int g;
    while (fin >> g) {
        Sarcina t;
        t.gata = (g == 1);
        getline(fin >> ws, t.text);
        s.sarcini.push_back(t);
    }
}

void salveaza(Stare &s) {
    ofstream fout(FISIER);
    for (const Sarcina &t : s.sarcini) {
        int g = 0;
        if (t.gata) {
            g = 1;
        }
        fout << g << " " << t.text << endl;
    }
    s.modificat = false;
}

// ---------- actiuni ----------
void adauga(Stare &s) {
    Sarcina t;
    t.text = citesteText("Sarcina noua: ");
    s.sarcini.push_back(t);
    s.modificat = true;
    cout << "Sarcina adaugata." << endl;
}

void listeaza(const Stare &s) {
    if (s.sarcini.empty()) {
        cout << "Nu ai nicio sarcina." << endl;
        return;
    }
    int n = s.sarcini.size();
    int facute = 0;
    for (int i = 0; i < n; i++) {
        if (s.sarcini[i].gata) {
            cout << i + 1 << ". [x] " << s.sarcini[i].text << endl;
            facute++;
        } else {
            cout << i + 1 << ". [ ] " << s.sarcini[i].text << endl;
        }
    }
    cout << "Terminate: " << facute << " din " << n << endl;
}

void termina(Stare &s) {
    if (s.sarcini.empty()) {
        cout << "Nu ai nicio sarcina." << endl;
        return;
    }
    listeaza(s);
    int nr = citesteInt("Numarul sarcinii terminate: ", 1, s.sarcini.size());
    s.sarcini[nr - 1].gata = true;
    s.modificat = true;
    cout << "Bravo! Sarcina a fost marcata ca terminata." << endl;
}

void sterge(Stare &s) {
    if (s.sarcini.empty()) {
        cout << "Nu ai nicio sarcina." << endl;
        return;
    }
    listeaza(s);
    int nr = citesteInt("Numarul sarcinii de sters: ", 1, s.sarcini.size());
    if (confirma("Stergi sarcina \"" + s.sarcini[nr - 1].text + "\"?")) {
        s.sarcini.erase(s.sarcini.begin() + (nr - 1));
        s.modificat = true;
        cout << "Sarcina a fost stearsa." << endl;
    } else {
        cout << "Nu am sters nimic." << endl;
    }
}

void curataTerminate(Stare &s) {
    int i = 0;
    int sterse = 0;
    while (i < (int)s.sarcini.size()) {
        if (s.sarcini[i].gata) {
            s.sarcini.erase(s.sarcini.begin() + i);
            sterse++;
        } else {
            i++;
        }
    }
    if (sterse > 0) {
        s.modificat = true;
    }
    cout << "Am sters " << sterse << " sarcini terminate." << endl;
}

// ---------- meniu ----------
Optiune meniu() {
    cout << endl;
    cout << "===== LISTA DE SARCINI =====" << endl;
    cout << "1. Adauga o sarcina" << endl;
    cout << "2. Arata sarcinile" << endl;
    cout << "3. Marcheaza ca terminata" << endl;
    cout << "4. Sterge o sarcina" << endl;
    cout << "5. Sterge toate cele terminate" << endl;
    cout << "6. Salveaza" << endl;
    cout << "0. Iesire" << endl;
    return (Optiune)citesteInt("Alege: ", 0, 6);
}

// ---------- program ----------
int main() {
    Stare s;
    incarca(s);
    cout << "Am incarcat " << s.sarcini.size() << " sarcini din " << FISIER << endl;

    bool ruleaza = true;
    while (ruleaza) {
        Optiune o = meniu();
        switch (o) {
            case ADAUGA:
                adauga(s);
                break;
            case LISTA:
                listeaza(s);
                break;
            case TERMINA:
                termina(s);
                break;
            case STERGE:
                sterge(s);
                break;
            case CURATA:
                curataTerminate(s);
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

**Rulare** (tastezi `1`, `Fac tema la mate`, `1`, `Scriu un program`, `1`, `Pregatesc ghiozdanul`, `3`, `7`, `2`, `3`, `1`, `2`, `4`, `3`, `da`, `5`, `2`, `0`, `da`):
```
Am incarcat 0 sarcini din sarcini.txt

===== LISTA DE SARCINI =====
1. Adauga o sarcina
2. Arata sarcinile
3. Marcheaza ca terminata
4. Sterge o sarcina
5. Sterge toate cele terminate
6. Salveaza
0. Iesire
Alege: 1
Sarcina noua: Fac tema la mate
Sarcina adaugata.

===== LISTA DE SARCINI =====
1. Adauga o sarcina
2. Arata sarcinile
3. Marcheaza ca terminata
4. Sterge o sarcina
5. Sterge toate cele terminate
6. Salveaza
0. Iesire
Alege: 1
Sarcina noua: Scriu un program
Sarcina adaugata.

===== LISTA DE SARCINI =====
1. Adauga o sarcina
2. Arata sarcinile
3. Marcheaza ca terminata
4. Sterge o sarcina
5. Sterge toate cele terminate
6. Salveaza
0. Iesire
Alege: 1
Sarcina noua: Pregatesc ghiozdanul
Sarcina adaugata.

===== LISTA DE SARCINI =====
1. Adauga o sarcina
2. Arata sarcinile
3. Marcheaza ca terminata
4. Sterge o sarcina
5. Sterge toate cele terminate
6. Salveaza
0. Iesire
Alege: 3
1. [ ] Fac tema la mate
2. [ ] Scriu un program
3. [ ] Pregatesc ghiozdanul
Terminate: 0 din 3
Numarul sarcinii terminate: 7
  Valoare invalida (1 - 3).
Numarul sarcinii terminate: 2
Bravo! Sarcina a fost marcata ca terminata.

===== LISTA DE SARCINI =====
1. Adauga o sarcina
2. Arata sarcinile
3. Marcheaza ca terminata
4. Sterge o sarcina
5. Sterge toate cele terminate
6. Salveaza
0. Iesire
Alege: 3
1. [ ] Fac tema la mate
2. [x] Scriu un program
3. [ ] Pregatesc ghiozdanul
Terminate: 1 din 3
Numarul sarcinii terminate: 1
Bravo! Sarcina a fost marcata ca terminata.

===== LISTA DE SARCINI =====
1. Adauga o sarcina
2. Arata sarcinile
3. Marcheaza ca terminata
4. Sterge o sarcina
5. Sterge toate cele terminate
6. Salveaza
0. Iesire
Alege: 2
1. [x] Fac tema la mate
2. [x] Scriu un program
3. [ ] Pregatesc ghiozdanul
Terminate: 2 din 3

===== LISTA DE SARCINI =====
1. Adauga o sarcina
2. Arata sarcinile
3. Marcheaza ca terminata
4. Sterge o sarcina
5. Sterge toate cele terminate
6. Salveaza
0. Iesire
Alege: 4
1. [x] Fac tema la mate
2. [x] Scriu un program
3. [ ] Pregatesc ghiozdanul
Terminate: 2 din 3
Numarul sarcinii de sters: 3
Stergi sarcina "Pregatesc ghiozdanul"? (da/nu): da
Sarcina a fost stearsa.

===== LISTA DE SARCINI =====
1. Adauga o sarcina
2. Arata sarcinile
3. Marcheaza ca terminata
4. Sterge o sarcina
5. Sterge toate cele terminate
6. Salveaza
0. Iesire
Alege: 5
Am sters 2 sarcini terminate.

===== LISTA DE SARCINI =====
1. Adauga o sarcina
2. Arata sarcinile
3. Marcheaza ca terminata
4. Sterge o sarcina
5. Sterge toate cele terminate
6. Salveaza
0. Iesire
Alege: 2
Nu ai nicio sarcina.

===== LISTA DE SARCINI =====
1. Adauga o sarcina
2. Arata sarcinile
3. Marcheaza ca terminata
4. Sterge o sarcina
5. Sterge toate cele terminate
6. Salveaza
0. Iesire
Alege: 0
Ai modificari nesalvate. Le salvezi? (da/nu): da
Salvat.
La revedere!
```

Programul are aproximativ 220 de linii, dar este împărțit în secțiuni clare: structuri, citire sigură, fișiere, acțiuni, meniu și `main`. Dacă dai o comandă greșită sau scrii litere în loc de numere, nu se întâmplă nimic rău. Rulează-l de două ori: la a doua rulare, sarcinile salvate sunt încărcate automat.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Lista de sarcini” (obligatoriu)
Scrie programul din Exemplul 16. Apoi adaugă o opțiune „Arată doar sarcinile nefăcute” și una „Redenumește o sarcină” (citește noul text cu `citesteText`).

### Exercițiul B — Scheletul tău
Copiază scheletul din Exemplul 15 într-un fișier nou, `schelet.cpp`. Compilează-l și rulează-l. Salvează-l: îl vei folosi în lecțiile 6–8.

### Exercițiul C — Agenda de telefon cu citire sigură
Ia agenda din lecția 4 (exercițiul B) și înlocuiește toate citirile cu `citesteInt`, `citesteText` și `confirma`. Adaugă confirmarea la ștergere.

### Exercițiul D — Meniu cu comenzi text *(Provocare, opțional)*
Scrie un mic joc în care jucătorul scrie comenzi: `nord`, `sud`, `est`, `vest`, `unde`, `iesire`. Programul ține poziția `(x, y)` în stare și o modifică. Orice altă comandă afișează „Nu înțeleg”.

### Exercițiul E — Setări persistente *(Provocare, opțional)*
Adaugă la orice program al tău o structură `Setari` salvată în fișier, cu un submeniu care permite schimbarea lor.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Nicio literă tastată în loc de număr nu strică programul  
- [ ] Opțiunile meniului sunt un `enum` sau au comentarii clare  
- [ ] Starea aplicației este într-o structură, trimisă prin referință  
- [ ] Ștergerea cere confirmare, iar ieșirea cu modificări nesalvate întreabă dacă salvezi  
- [ ] Fișierul se numește `Prenume_Nume_M4L5.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă o prioritate (1–3) fiecărei sarcini și sortează lista după ea  
- [ ] Adaugă o căutare în sarcini (toate cele care conțin un cuvânt dat; ai nevoie de `find` din lecția M3L5)  
- [ ] Adaugă o opțiune „Anulează ultima acțiune” (ține minte ultima sarcină ștearsă)  
- [ ] Creează un meniu cu mai multe liste (de exemplu „Școală” și „Acasă”), fiecare salvată în alt fișier  
- [ ] Scrie un jurnal de activitate (ca în Exemplul 11) pentru toate acțiunile aplicației  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Meniul se repetă la nesfârșit când scrii o literă | `cin` a rămas în stare de eroare | `cin.clear();` și `cin.ignore(…, '\n');` |
| `error: 'numeric_limits' was not declared` | Lipsește biblioteca | `#include <limits>` |
| `getline` sare peste citire (citește un șir gol) | A rămas un Enter în buffer după `cin >>` | `getline(cin >> ws, s);` sau `cin.ignore()` înainte |
| Funcția de citire acceptă `12abc` ca `12` | Restul liniei rămâne în buffer | Curăță linia după fiecare citire, ca în `citesteInt` |
| `jump to case label crosses initialization` | Ai declarat o variabilă într-un `case` fără acolade | Pune `case X: { … break; }` |
| Se execută mai multe `case`-uri la rând | Lipsește `break;` | Încheie fiecare `case` cu `break;` |
| Ștergerea unui element din mijloc strică numerotarea | Utilizatorul vede numere de la 1, vectorul începe de la 0 | Ștergi pe poziția `nr - 1` |
| Starea nu se schimbă după ce apelezi o funcție | Parametru fără `&` | `void f(Stare &s)` |
| Programul întreabă „Salvezi?” chiar dacă nu ai schimbat nimic | Steagul `modificat` nu este actualizat corect | `modificat = true` la fiecare schimbare, `false` după salvare |

---

## Recapitulare pe scurt

- `cin.fail()` este adevărat când citirea a eșuat; reparare: `cin.clear();` + `cin.ignore(numeric_limits<streamsize>::max(), '\n');`.
- Funcții de citire sigură: `citesteInt(mesaj, min, max)`, `citesteDouble`, `citesteText` (cu `getline(cin >> ws, s)`) și `confirma` (da/nu).
- Meniu: o funcție `meniu()` care întoarce opțiunea; bucla `while (ruleaza)`; `switch` cu `break`; `enum` pentru nume clare.
- Comenzi text: compari un `string` cu `"adauga"`, `"lista"` etc.
- Submeniu: o funcție cu propria buclă, care se termină la „Înapoi”.
- **Stare:** toate datele aplicației într-o structură (`Stare`), trimisă prin `&`; steagul `modificat` spune dacă mai e ceva de salvat.
- Fișiere: `incarca` la pornire, `salveaza` la ieșire, jurnal cu `ios::app`.
- Scheletul de aplicație: stare, citire sigură, fișiere, acțiuni, meniu, `main`.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Termină exercițiile A–C.  
3. Scrie funcția `string citesteNumeValid(const string &mesaj)` care repetă întrebarea până când utilizatorul scrie un nume cu cel puțin 3 litere, formate doar din litere (folosește `isalpha`).  
4. Alege proiectul pe care vrei să-l faci în lecțiile următoare (joc, magazin sau quiz) și scrie, pe hârtie sau într-un comentariu, ce **date** va avea (starea) și ce **acțiuni** va avea (meniul).  
5. **Bonus:** adaugă la „Lista de sarcini” sarcini cu dată-limită (`struct Data` din lecția 3) și afișează-le sortate după aceasta.  
6. Salvează tot ca `Tema_M4L5_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 6
Începem proiectele. **Proiect A — Joc pe consolă:** construim „Ghici numărul” cu scor și clasament salvat în fișier, apoi un joc de X și 0 între doi jucători, folosind tot ce ai învățat: funcții, vectori, structuri, citire sigură și fișiere.
