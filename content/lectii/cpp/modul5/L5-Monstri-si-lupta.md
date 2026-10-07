# LECȚIA 5 — Monștri și luptă
**Modulul 5 · Proiect RPG în consolă · 2 ore**  
**Code Maker Club · RPG Creator**

> În pivnița castelului locuiește un **goblin**. Azi îl aducem în joc și ne luptăm cu el, **pe ture**: întâi lovești tu, apoi lovește el. Cât de tare lovește fiecare depinde de un **zar** virtual, adică de numere aleatoare cu `rand()`. Eroul poate ataca, bea o poțiune sau fugi. Dacă înfrânge monstrul, primește monede și puncte.  
> Proiect: **„Joc_L45.cpp”** · pivnița devine un loc periculos.

---

## Obiectiv
La finalul orei folosești `rand()` pentru a simula un zar, descrii un monstru cu o `struct`, scrii o luptă pe ture într-o funcție și o legi de joc: când eroul intră în pivniță, lupta începe automat.  
**Minim:** o luptă simplă pe ture între erou și monstru, până când unul dintre ei rămâne fără viață.  
**Ținta orei (Complet):** meniul de luptă (atac, poțiune, fugă), bonusul sabiei, recompensa și monstrul care apare o singură dată.

## De ce contează
Aproape fiecare joc folosește numere aleatoare: zaruri, comori, direcția în care merge un inamic. Un program care face mereu același lucru devine plictisitor, iar un pic de **noroc** îl face să se simtă ca un joc adevărat. Mai ai ceva de învățat: o luptă este o buclă care se oprește pe baza **a două condiții** (cineva rămâne fără viață), exact genul de logică pe care o folosesc și jocurile profesioniste.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: bucle, funcții, `struct` |
| 10–30 | Zarul: `rand()` și `srand()` (**Exemplele 1 și 2**) |
| 30–50 | Monstrul ca structură (**Exemplul 3**) |
| 50–80 | O lovitură, o rundă, lupta întreagă (**Exemplele 4–6**) |
| 80–100 | Meniul de luptă și recompensa (**Exemplele 7–8**) |
| 100–118 | Jocul lecției, **Joc_L45.cpp** (**Exemplul 12**; Exemplele 9–11 sunt opționale) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Zarul

### Exemplul 1 — Un zar cu `rand()` **[Esențial]**

Funcția `rand()` dă un număr întreg „la întâmplare”, foarte mare. Dacă îl împărțim la `n` și luăm **restul** (`rand() % n`), obținem un număr de la `0` la `n - 1`. Pentru un zar obișnuit (1…6) calculăm `rand() % 6 + 1`. Punem formula într-o funcție care merge pentru orice interval:

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int zar(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
}

int main() {
    srand((unsigned)time(0));

    bool toateBune = true;
    cout << "Zece aruncari de zar:";
    for (int i = 0; i < 10; i++) {
        int z = zar(1, 6);
        cout << " " << z;
        if (z < 1 || z > 6) {
            toateBune = false;
        }
    }
    cout << "\nToate intre 1 si 6: " << (toateBune ? "da" : "nu") << "\n";
    return 0;
}
```

**Exemplu de ieșire** (la tine numerele aleatoare vor fi altele):
```
Zece aruncari de zar: 6 1 5 2 3 5 5 1 5 4
Toate intre 1 si 6: da
```

Numerele de pe prima linie sunt aleatoare: la tine vor fi altele. Ultima linie, în schimb, este **mereu** `da`, pentru că funcția `zar` nu iese niciodată din interval. Pentru `rand()` ai nevoie de `<cstdlib>`, iar pentru `time` de `<ctime>`.

### Exemplul 2 — `srand`: de unde pornește zarul **[Esențial]**

`rand()` nu este chiar întâmplător: calculează numerele după o formulă care pornește de la o valoare numită **sămânță**. Cu aceeași sămânță, obții mereu aceleași numere. Funcția `srand(sămânță)` alege punctul de pornire. De obicei punem ora curentă, `time(0)`, ca să fie altceva la fiecare rulare:

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int zar(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
}

void aruncaSase() {
    for (int i = 0; i < 6; i++) {
        cout << zar(1, 6) << " ";
    }
    cout << "\n";
}

int main() {
    srand(5);
    cout << "Samanta 5:    ";
    aruncaSase();

    srand(5);
    cout << "Samanta 5 din nou: ";
    aruncaSase();

    srand((unsigned)time(0));
    cout << "Samanta = ora: ";
    aruncaSase();
    return 0;
}
```

**Exemplu de ieșire** (la tine numerele aleatoare vor fi altele):
```
Samanta 5:    6 6 5 3 1 4 
Samanta 5 din nou: 6 6 5 3 1 4 
Samanta = ora: 6 1 5 2 3 5 
```

Primele două linii sunt **identice** (aceeași sămânță), a treia diferă la fiecare rulare. Apelăm `srand(...)` **o singură dată**, la începutul programului, nu la fiecare aruncare.

---

## 2. Monstrul

### Exemplul 3 — `struct Monstru` **[Esențial]**

Un monstru are nume, viață, atac și o recompensă. Ca la erou, punem totul într-o structură. Pentru bara de viață, ținem și viața maximă:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Monstru {
    string nume;
    int viata;
    int viataMax;
    int atac;
    int recompensa;
};

void afiseazaMonstru(const Monstru &m) {
    cout << m.nume << ": viata " << m.viata << "/" << m.viataMax
         << ", atac " << m.atac << ", recompensa " << m.recompensa << " monede\n";
}

int main() {
    Monstru goblin = {"Goblin", 14, 14, 4, 15};
    Monstru sobolan = {"Sobolan urias", 8, 8, 2, 5};

    afiseazaMonstru(goblin);
    afiseazaMonstru(sobolan);

    goblin.viata -= 6;
    cout << "Dupa o lovitura: ";
    afiseazaMonstru(goblin);
    return 0;
}
```

**Ieșire:**
```
Goblin: viata 14/14, atac 4, recompensa 15 monede
Sobolan urias: viata 8/8, atac 2, recompensa 5 monede
Dupa o lovitura: Goblin: viata 8/14, atac 4, recompensa 15 monede
```

Ordinea valorilor din acolade este ordinea câmpurilor din structură.

---

## 3. Lupta pe ture

### Exemplul 4 — O lovitură **[Esențial]**

O lovitură are o valoare fixă (atacul) plus un pic de noroc, adică un zar între `0` și `2`. Eroul are atacul de bază `5`, deci loviturile lui sunt între `5` și `7`:

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int zar(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
}

int main() {
    srand((unsigned)time(0));
    int atacEroului = 5;

    cout << "Cinci lovituri ale eroului:";
    for (int i = 0; i < 5; i++) {
        int lovitura = atacEroului + zar(0, 2);
        cout << " " << lovitura;
    }
    cout << "\n";
    return 0;
}
```

**Exemplu de ieșire** (la tine numerele aleatoare vor fi altele):
```
Cinci lovituri ale eroului: 5 6 7 7 5
```

Toate numerele sunt între 5 și 7, dar nu poți ști dinainte care va fi următorul.

### Exemplul 5 — O rundă: lovește eroul, apoi monstrul **[Esențial]**

O **rundă** are doi pași: eroul lovește monstrul, apoi monstrul îl lovește pe erou. Scădem viața cu funcții, ca să nu coboare sub zero:

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

int zar(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
}

int main() {
    srand((unsigned)time(0));
    int viataEroului = 30;
    int atacEroului = 5;
    string numeMonstru = "Goblin";
    int viataMonstrului = 14;
    int atacMonstrului = 4;

    int lovitura = atacEroului + zar(0, 2);
    viataMonstrului -= lovitura;
    cout << "Il lovesti pe " << numeMonstru << " cu " << lovitura << " puncte. Ii mai raman " << viataMonstrului << ".\n";

    int dauna = atacMonstrului + zar(0, 2);
    viataEroului -= dauna;
    cout << numeMonstru << " te loveste cu " << dauna << " puncte. Iti mai raman " << viataEroului << ".\n";
    return 0;
}
```

**Exemplu de ieșire** (la tine numerele aleatoare vor fi altele):
```
Il lovesti pe Goblin cu 6 puncte. Ii mai raman 8.
Goblin te loveste cu 6 puncte. Iti mai raman 24.
```

### Exemplul 6 — Lupta întreagă, până se termină **[Esențial]**

Repetăm runda cât timp **ambii** luptători sunt în viață. Bucla se oprește când viața eroului sau a monstrului ajunge la `0`:

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int zar(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
}

int main() {
    srand((unsigned)time(0));
    int viataEroului = 30;
    int viataMonstrului = 14;
    int runda = 0;

    while (viataEroului > 0 && viataMonstrului > 0) {
        runda++;
        viataMonstrului -= 5 + zar(0, 2);
        cout << "Runda " << runda << ": monstrul are " << (viataMonstrului > 0 ? viataMonstrului : 0);

        if (viataMonstrului > 0) {
            viataEroului -= 4 + zar(0, 2);
        }
        cout << ", eroul are " << (viataEroului > 0 ? viataEroului : 0) << "\n";
    }

    if (viataEroului > 0) {
        cout << "Ai castigat dupa " << runda << " runde!\n";
    } else {
        cout << "Ai pierdut...\n";
    }
    return 0;
}
```

**Exemplu de ieșire** (la tine numerele aleatoare vor fi altele):
```
Runda 1: monstrul are 8, eroul are 24
Runda 2: monstrul are 3, eroul are 19
Runda 3: monstrul are 0, eroul are 19
Ai castigat dupa 3 runde!
```

Dacă monstrul rămâne fără viață, el **nu mai lovește** (de aceea `if (viataMonstrului > 0)`). Altfel ar lovi și după ce a murit.

### Exemplul 7 — Meniul de luptă: ataci, bei, fugi **[Esențial]**

Jucătorul alege ce face la fiecare tură. `continue` sare peste restul rundei: dacă n-ai poțiune, nu ți se consumă tura. Viața monstrului și a eroului se afișează cu o bară, ca în lecția 2:

```cpp
#include <iostream>
#include <string>
#include <limits>
#include <cstdlib>
#include <ctime>
using namespace std;

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

int zar(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
}

string bara(int valoare, int maxim) {
    if (valoare < 0) {
        valoare = 0;
    }
    int plin = valoare * 10 / maxim;
    return "[" + string(plin, '#') + string(10 - plin, '.') + "]";
}

int main() {
    srand((unsigned)time(0));
    int viata = 30;
    int viataMax = 30;
    int potiuni = 1;
    int viataMonstru = 14;

    while (viataMonstru > 0 && viata > 0) {
        cout << "\nTu " << bara(viata, viataMax) << " " << viata;
        cout << "  |  Goblin " << bara(viataMonstru, 14) << " " << viataMonstru << "\n";
        int alegere = citesteInt("1 Ataca   2 Potiune   3 Fugi: ", 1, 3);

        if (alegere == 1) {
            int lovitura = 5 + zar(0, 2);
            viataMonstru -= lovitura;
            cout << "Il lovesti cu " << lovitura << " puncte!\n";
        } else if (alegere == 2) {
            if (potiuni == 0) {
                cout << "Nu ai nicio potiune!\n";
                continue;
            }
            potiuni--;
            viata += 15;
            if (viata > viataMax) {
                viata = viataMax;
            }
            cout << "Bei o potiune. Viata: " << viata << "\n";
        } else {
            cout << "Fugi!\n";
            break;
        }

        if (viataMonstru > 0) {
            int dauna = 4 + zar(0, 2);
            viata -= dauna;
            cout << "Goblinul te loveste cu " << dauna << " puncte!\n";
        }
    }

    if (viataMonstru <= 0) {
        cout << "\nAi invins goblinul!\n";
    }
    return 0;
}
```

**Exemplu de rulare** (tastezi `2`, `2`, `1`, `1`, `1`, `1`; la tine zarurile dau alte rezultate):
```

Tu [##########] 30  |  Goblin [##########] 14
1 Ataca   2 Potiune   3 Fugi: 2
Bei o potiune. Viata: 30
Goblinul te loveste cu 6 puncte!

Tu [########..] 24  |  Goblin [##########] 14
1 Ataca   2 Potiune   3 Fugi: 2
Nu ai nicio potiune!

Tu [########..] 24  |  Goblin [##########] 14
1 Ataca   2 Potiune   3 Fugi: 1
Il lovesti cu 5 puncte!
Goblinul te loveste cu 5 puncte!

Tu [######....] 19  |  Goblin [######....] 9
1 Ataca   2 Potiune   3 Fugi: 1
Il lovesti cu 7 puncte!
Goblinul te loveste cu 4 puncte!

Tu [#####.....] 15  |  Goblin [#.........] 2
1 Ataca   2 Potiune   3 Fugi: 1
Il lovesti cu 5 puncte!

Ai invins goblinul!
```

În rulare, prima alegere (`2`) bea poțiunea, a doua (`2`) nu mai găsește nicio poțiune (tura nu se consumă), apoi urmează atacuri (`1`).

### Exemplul 8 — Recompensa

Când monstrul cade, eroul primește monede și puncte. Valorile vin din câmpul `recompensa` al monstrului:

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Monstru {
    string nume;
    int viata;
    int viataMax;
    int atac;
    int recompensa;
};

int main() {
    int monede = 10;
    int scor = 0;
    Monstru m = {"Goblin", 0, 14, 4, 15};     // viata 0: tocmai a fost invins

    if (m.viata <= 0) {
        cout << "Ai invins " << m.nume << "! Primesti " << m.recompensa << " monede.\n";
        monede += m.recompensa;
        scor += 20;
    }
    cout << "Monede: " << monede << ", scor: " << scor << "\n";
    return 0;
}
```

**Ieșire:**
```
Ai invins Goblin! Primesti 15 monede.
Monede: 25, scor: 20
```

---

## 4. Alte idei

### Exemplul 9 — Monstrul apare o singură dată *(Provocare, opțional)*

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

Dacă eroul intră din nou în pivniță după ce a învins goblinul, lupta nu trebuie să înceapă iar. Ținem minte asta într-o variabilă `bool`:

```cpp
#include <iostream>
using namespace std;

int main() {
    bool monstruInvins = false;
    int vizite[] = {1, 2, 3};

    for (int v : vizite) {
        cout << "Intri in pivnita (vizita " << v << "): ";
        if (!monstruInvins) {
            cout << "Goblinul te ataca! Il invingi.\n";
            monstruInvins = true;
        } else {
            cout << "Pivnita este linistita.\n";
        }
    }
    return 0;
}
```

**Ieșire:**
```
Intri in pivnita (vizita 1): Goblinul te ataca! Il invingi.
Intri in pivnita (vizita 2): Pivnita este linistita.
Intri in pivnita (vizita 3): Pivnita este linistita.
```

### Exemplul 10 — Cât de echilibrată este lupta? *(Provocare, opțional)*

Un programator își testează jocul. Pentru fiecare monstru simulăm 1000 de lupte (fără poțiuni și fără sabie) și numărăm câte le câștigă eroul:

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

int zar(int minim, int maxim) {
    return minim + rand() % (maxim - minim + 1);
}

bool eroulCastiga(int viataMonstrului, int atacMonstrului) {
    int viataEroului = 30;
    while (viataEroului > 0 && viataMonstrului > 0) {
        viataMonstrului -= 5 + zar(0, 2);
        if (viataMonstrului > 0) {
            viataEroului -= atacMonstrului + zar(0, 2);
        }
    }
    return viataEroului > 0;
}

void testeaza(const string &nume, int viata, int atac) {
    int castigate = 0;
    for (int i = 0; i < 1000; i++) {
        if (eroulCastiga(viata, atac)) {
            castigate++;
        }
    }
    cout << nume << " (viata " << viata << ", atac " << atac << "): eroul castiga "
         << castigate << " din 1000\n";
}

int main() {
    srand((unsigned)time(0));
    testeaza("Goblin", 14, 4);
    testeaza("Schelet", 30, 5);
    testeaza("Golem", 40, 6);
    return 0;
}
```

**Exemplu de ieșire** (la tine numerele aleatoare vor fi altele):
```
Goblin (viata 14, atac 4): eroul castiga 1000 din 1000
Schelet (viata 30, atac 5): eroul castiga 744 din 1000
Golem (viata 40, atac 6): eroul castiga 0 din 1000
```

Goblinul este ușor (eroul câștigă aproape mereu), scheletul este o luptă adevărată, iar golemul este prea puternic pentru un erou fără sabie și fără poțiuni. Dacă o luptă e mereu câștigată sau mereu pierdută, ajustezi viața și atacul monstrului.

### Exemplul 11 — Un monstru ales la întâmplare *(Provocare, opțional)*

Mai multe feluri de monștri stau într-un `vector`, iar jocul alege unul cu `rand()`:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

struct Monstru {
    string nume;
    int viata;
    int atac;
};

int main() {
    srand((unsigned)time(0));
    vector<Monstru> monstri = {
        {"Goblin", 14, 4},
        {"Sobolan urias", 8, 2},
        {"Schelet", 18, 5}
    };

    for (int i = 0; i < 3; i++) {
        int alegere = rand() % (int)monstri.size();
        cout << "Un " << monstri[alegere].nume << " iti iese in cale!\n";
    }
    return 0;
}
```

**Exemplu de ieșire** (la tine numerele aleatoare vor fi altele):
```
Un Schelet iti iese in cale!
Un Schelet iti iese in cale!
Un Schelet iti iese in cale!
```

---

## 5. Jocul lecției

### Exemplul 12 — **Joc_L45.cpp**: lupta cu goblinul **[Esențial]**

Pornim de la **Joc_L44.cpp**. Adăugăm: `#include <cstdlib>` și `<ctime>`, structura `Monstru`, funcțiile `zar`, `atacTotal` (atacul de bază plus bonusul sabiei) și `lupta`, câmpul `monstruInvins` în `Joc`, `srand` în `main` și apelul luptei în `dupaMutare`: când intri în pivniță și goblinul nu a fost învins, lupta începe. Dacă fugi, ajungi înapoi în bucătărie.

Iată ce s-a **schimbat** față de lecția trecută (`+` = linii de adăugat, `-` = linii de șters, `...` = restul codului rămâne la fel):

```diff
...
 #include <limits>
 #include <vector>
+#include <cstdlib>
+#include <ctime>
 using namespace std;
 
...
     bool gata = false;
     string obiect[NR_CAMERE];
+    bool monstruInvins = false;
+};
+struct Monstru {
+    string nume;
+    int viata;
+    int viataMax;
+    int atac;
+    int recompensa;
 };
 
...
 }
 
+int zar(int minim, int maxim) {
+    return minim + rand() % (maxim - minim + 1);
+}
+
 // ---------- jucatorul ----------
 string bara(int valoare, int maxim) {
...
     }
     return -1;
+}
+
+int atacTotal(const Jucator &j) {
+    int total = j.atac;
+    if (pozitie(j.inventar, "Sabie") >= 0) {
+        total += 3;
+    }
+    return total;
 }
 
...
 
 // ---------- lupta ----------
+void lupta(Joc &g) {
+    Monstru m = {"Goblin", 14, 14, 4, 15};
+    cout << "\n!!! Un " << m.nume << " iti iese in cale !!!\n";
+    while (m.viata > 0 && esteViu(g.j)) {
+        cout << "\n" << g.j.nume << " " << bara(g.j.viata, g.j.viataMax) << " " << g.j.viata;
+        cout << "   |   " << m.nume << " " << bara(m.viata, m.viataMax) << " " << m.viata << "\n";
+        int alegere = citesteInt("1 Ataca   2 Potiune   3 Fugi: ", 1, 3);
+        if (alegere == 1) {
+            int lovitura = atacTotal(g.j) + zar(0, 2);
+            m.viata -= lovitura;
+            cout << "Il lovesti pe " << m.nume << " cu " << lovitura << " puncte!\n";
+        } else if (alegere == 2) {
+            int p = pozitie(g.j.inventar, "Potiune");
+            if (p < 0) {
+                cout << "Nu ai nicio potiune!\n";
+                continue;
+            }
+            vindeca(g.j, 15);
+            g.j.inventar.erase(g.j.inventar.begin() + p);
+            cout << "Bei o potiune si te simti mai bine.\n";
+        } else {
+            cout << "Fugi inapoi in Bucatarie!\n";
+            g.j.camera = CAMERA_BUCATARIA;
+            return;
+        }
+        if (m.viata <= 0) {
+            break;
+        }
+        int dauna = m.atac + zar(0, 2);
+        if (dauna < 1) {
+            dauna = 1;
+        }
+        raneste(g.j, dauna);
+        cout << m.nume << " te loveste cu " << dauna << " puncte!\n";
+    }
+    if (esteViu(g.j)) {
+        cout << "\nAi invins " << m.nume << "! Primesti " << m.recompensa << " monede.\n";
+        g.j.monede += m.recompensa;
+        g.j.scor += 20;
+        g.monstruInvins = true;
+    }
+}
 
 // ---------- magazinul ----------
...
 void dupaMutare(Joc &g) {
     descrieCamera(g);
+    if (g.j.camera == CAMERA_PIVNITA && !g.monstruInvins) {
+        lupta(g);
+        if (esteViu(g.j) && g.j.camera != CAMERA_PIVNITA) {
+            descrieCamera(g);
+        }
+    }
 }
 
...
             cout << "Nu inteleg comanda. Scrie ajutor.\n";
         }
+        if (!esteViu(g.j)) {
+            cout << "\nAi pierdut. Jocul s-a terminat.\n";
+            g.gata = true;
+        }
     }
 }
...
 
 int main() {
+    srand((unsigned)time(0));
     int optiune;
     do {
```

În joc, sabia îți dă un bonus de atac de `3`: lovitura ta este `5 + 3 + zar(0, 2)`, adică între 8 și 10. Fără sabie, lupta este mai grea.

<details>
<summary>Fișierul complet <code>Joc_L45.cpp</code> (ca să compari cu al tău)</summary>

```cpp
/*
   Joc RPG in consola: CASTELUL UITAT
   Fisier: Joc_L45.cpp
   Autor:  Prenume Nume
*/
#include <iostream>
#include <string>
#include <limits>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

// ---------- constante ----------
const string NUME_JOC = "CASTELUL UITAT";
const int NR_CAMERE = 6;
const int NORD = 0;
const int SUD = 1;
const int EST = 2;
const int VEST = 3;

const int CAMERA_POARTA = 0;
const int CAMERA_ARMURARIA = 2;
const int CAMERA_BUCATARIA = 3;
const int CAMERA_PIVNITA = 4;

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
    return total;
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
        int dauna = m.atac + zar(0, 2);
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

// ---------- misiuni si final ----------

// ---------- salvare ----------

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
        } else if (cmd == "iesire") {
            g.gata = true;
        } else {
            cout << "Nu inteleg comanda. Scrie ajutor.\n";
        }
        if (!esteViu(g.j)) {
            cout << "\nAi pierdut. Jocul s-a terminat.\n";
            g.gata = true;
        }
    }
}

// ---------- meniul principal ----------
void jocNou() {
    Joc g;
    g.j = creeazaJucator();
    initObiecte(g);
    joaca(g);
}

void afiseazaMeniu() {
    afiseazaTitlu();
    cout << "  1. Joc nou\n";
    cout << "  2. Harta castelului\n";
    cout << "  3. Cum se joaca\n";
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

**Exemplu de rulare** (tastezi `1`, `Ana`, `nord`, `vest`, `ia`, `est`, `est`, `ia`, `sud`, `1`, `1`, `ia`, `nord`, `stare`, `iesire`, `0`; la tine zarurile dau alte rezultate):
```

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
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

> est

== Sala Mare ==
O sala uriasa, cu un candelabru plin de panze de paianjen. Un negustor ciudat zambeste in colt.
Iesiri: nord sud est vest

> est

== Bucataria ==
Oale mari, cuptoare reci si miros de supa veche. O scara coboara spre pivnita.
Pe jos se afla: Potiune.
Iesiri: sud vest

> ia
Ai luat: Potiune.

> sud

== Pivnita ==
Un loc intunecat si umed, cu butoaie sparte. Se aude un mormait.
Pe jos se afla: Cheie.
Iesiri: nord

!!! Un Goblin iti iese in cale !!!

Ana [##########] 30   |   Goblin [##########] 14
1 Ataca   2 Potiune   3 Fugi: 1
Il lovesti pe Goblin cu 8 puncte!
Goblin te loveste cu 4 puncte!

Ana [########..] 26   |   Goblin [####......] 6
1 Ataca   2 Potiune   3 Fugi: 1
Il lovesti pe Goblin cu 8 puncte!

Ai invins Goblin! Primesti 15 monede.

> ia
Ai luat: Cheie.

> nord

== Bucataria ==
Oale mari, cuptoare reci si miros de supa veche. O scara coboara spre pivnita.
Iesiri: sud vest

> stare
--- Ana ---
Viata:  [########..] 26/30
Atac:   5
Monede: 25
Scor:   35
Locatie: Bucataria

> iesire

=============================
   CASTELUL UITAT
=============================
  1. Joc nou
  2. Harta castelului
  3. Cum se joaca
  0. Iesire
Alege: 0

La revedere!
```

</details>

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Joc_L45.cpp (obligatoriu)
Scrie programul din Exemplul 12, pornind de la `Joc_L44.cpp`. Joacă-l de mai multe ori: o dată cu sabia, o dată fără, o dată încercând să fugi. Observă cum se schimbă lupta.

### Exercițiul B — Monstrul tău
Schimbă monstrul: dă-i alt nume, altă viață, alt atac și o recompensă (de exemplu „Pirat fantomă”, viață 20, atac 5). Echilibrează lupta, ca să poată fi câștigată, dar să nu fie prea ușoară.

### Exercițiul C — Mesaje de luptă
Adaugă mai multe mesaje pentru lovituri, alese după valoarea loviturii (de exemplu „Lovitură slabă”, „Lovitură puternică!” pentru valori mari).

### Exercițiul D — Lovitură critică *(Provocare, opțional)*
Cu o șansă de 1 din 6 (`zar(1, 6) == 6`), lovitura eroului este dublă. Afișează un mesaj special.

### Exercițiul E — Al doilea monstru *(Provocare, opțional)*
Pune un al doilea monstru într-o altă cameră (de exemplu, un schelet în turn). Atenție: pentru fiecare monstru ai nevoie de un `bool` care spune dacă a fost învins.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Lupta pe ture merge: ataci, bei o poțiune sau fugi  
- [ ] Viața nu coboară sub zero, iar un monstru învins nu mai lovește  
- [ ] Goblinul învins nu mai apare, iar recompensa se primește o singură dată  
- [ ] Dacă pierzi, jocul se oprește cu un mesaj  
- [ ] Ai salvat fișierul ca `Joc_L45.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă comanda `lupta` pentru monștrii care nu atacă imediat  
- [ ] Fă ca monstrul să aibă o „șansă să ocolească” lovitura (zarul `1` din `6`)  
- [ ] Adaugă un monstru-șef cu viață mare și un atac special la fiecare a treia rundă  
- [ ] Calculează statistici de joc: numărul de runde, viața pierdută, lovitura cea mai mare  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Zarul dă mereu aceleași numere la fiecare rulare | Lipsește `srand(time(0))` | Apelează `srand((unsigned)time(0));` o dată, în `main` |
| Zarul dă toate aceleași numere în aceeași rulare | Ai pus `srand(time(0))` la fiecare aruncare | `srand` o singură dată, la începutul programului |
| Zarul dă `7` sau `0` când ai vrut 1…6 | Formula este greșită | `minim + rand() % (maxim - minim + 1)` |
| Monstrul mort mai lovește | Nu ai verificat viața lui înainte de lovitura lui | `if (m.viata > 0) { … }` |
| Lupta nu se termină niciodată | Condiția buclei este greșită | `while (m.viata > 0 && esteViu(...))` |
| Viața devine negativă | Scazi direct din viață | Folosește `raneste`, care o oprește la `0` |
| `error: 'rand' was not declared` | Lipsește biblioteca | `#include <cstdlib>`; pentru `time`: `#include <ctime>` |

---

## Recapitulare pe scurt

- `rand() % n` dă un număr între `0` și `n - 1`; funcția `zar(minim, maxim)` îl pune în intervalul dorit.
- `srand((unsigned)time(0));` se apelează o singură dată, la începutul programului.
- `struct Monstru` ține numele, viața, atacul și recompensa monstrului.
- O luptă este o buclă care rulează cât timp ambii luptători sunt în viață.
- Meniul de luptă: `1` ataci, `2` bei o poțiune, `3` fugi; `continue` păstrează tura când n-ai poțiune.
- Sabia din rucsac adaugă `3` la atacul eroului (`atacTotal`).

---

## Temă
1. Termină Exercițiul A și joacă-l până reușești să câștigi și să pierzi măcar o dată.  
2. Notează într-un tabel cât de grea a fost lupta (ușoară, potrivită, grea) și ajustează valorile ca să fie potrivită.  
3. Desenează pe hârtie **magazinul**: ce produse vinde (cel puțin 4), cât costă fiecare și ce face.  
4. Salvează tot ca `Joc_L45.cpp`.

---

## Ce urmează — Lecția 6
**Magazin și monede.** În Sala Mare își are tejgheaua negustorul Pip. Eroul cheltuiește monedele câștigate în luptă: cumpără poțiuni, elixiruri, un scut și o amuletă, iar obiectele de care nu mai are nevoie le vinde la jumătate de preț.
