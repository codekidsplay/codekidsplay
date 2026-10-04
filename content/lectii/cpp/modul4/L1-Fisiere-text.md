# LECȚIA 1 — Fișiere text: citire și scriere
**Modulul 4 · Proiecte și autonomie · 2 ore**  
**Code Kids Play · CodeKids Graduate**

> Până acum, tot ce făcea programul tău dispărea în clipa în care îl închideai. Azi învățăm să **salvăm date într-un fișier** și să le **citim înapoi** data viitoare. Așa funcționează jocurile care își țin scorul, aplicațiile care își țin lista de contacte și, în general, orice program care „își amintește” ceva.  
> Proiect: **„Raportul de note”** · fișier: `Prenume_Nume_M4L1.cpp` (ex. `Ana_Pop_M4L1.cpp`)

---

## Obiectiv
La finalul orei scrii date într-un fișier text cu `ofstream`, citești date dintr-un fișier cu `ifstream` (cuvinte, numere și linii întregi), verifici dacă fișierul s-a deschis, adaugi text la sfârșitul unui fișier și construiești un program care citește notele dintr-un fișier și scrie un raport în alt fișier.  
**Minim:** scrii un fișier cu `ofstream` și îl citești cu `ifstream`, cu verificarea deschiderii.  
**Ținta orei (Complet):** + proiectul „Raportul de note”, cu două fișiere (unul de intrare, unul de ieșire).

## De ce contează
Un program care nu poate salva nimic este ca un caiet cu pagini care se șterg singure. Cu fișiere, scorul din joc rămâne, catalogul rămâne, setările rămân. În Modulul 4 construim proiecte întregi, iar aproape toate au nevoie de salvarea datelor. Mai e un avantaj: poți pregăti datele într-un editor de text și le dai programului, fără să le tastezi de fiecare dată.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `string`, `getline`, bucle |
| 10–30 | Scrierea într-un fișier cu `ofstream` (**Exemplele 1 și 4**) |
| 30–55 | Citirea cu `ifstream`, verificarea deschiderii (**Exemplele 2, 3 și 5**) |
| 55–80 | Citirea numerelor, `while (fin >> x)` (**Exemplele 6–9**) |
| 80–95 | Adăugare la sfârșit, perechi nume–notă (**Exemplele 10–12**) |
| 95–115 | Alte tipare, proiect (**Exemplele 13–16**) |
| 115–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Scrierea într-un fișier

Un **fișier text** este o înșiruire de caractere, salvată pe disc, pe care o poți deschide și cu Notepad. Pentru a lucra cu fișiere ai nevoie de biblioteca `<fstream>` (de la *file stream*, adică „flux de fișier”).

Ai folosit deja două fluxuri: `cout` (scrie pe ecran) și `cin` (citește de la tastatură). Fișierele funcționează la fel, doar că tu le dai nume:

| Flux | Rol | Se folosește ca |
|------|-----|-----------------|
| `ofstream` (*output file stream*) | scrie într-un fișier | `fout << …` ca la `cout` |
| `ifstream` (*input file stream*) | citește dintr-un fișier | `fin >> …` ca la `cin` |

Numele `fout` și `fin` le alegi tu (le poți numi `scriere`, `citire` sau cum vrei). Noi le vom folosi pe acestea, ca să ne amintim imediat ce face fiecare.

**Unde apare fișierul?** Dacă scrii doar un nume (`"salut.txt"`), fișierul se creează în **folderul de lucru al programului**. De obicei acesta este folderul din care rulezi programul (uneori e lângă fișierul `.cpp`, alteori lângă executabil). Dacă nu găsești fișierul creat, caută-l după nume în folderul proiectului.

### Exemplul 1 — Primul fișier scris de program **[Esențial]**

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ofstream fout("salut.txt");
    fout << "Salut, fisier!" << endl;
    fout << "Anul 2026" << endl;
    fout.close();

    cout << "Am scris fisierul salut.txt" << endl;
    return 0;
}
```

**Ieșire:**
```
Am scris fisierul salut.txt
```

După rulare, în folderul programului există fișierul `salut.txt`. Dacă îl deschizi cu Notepad, vezi:

```
Salut, fisier!
Anul 2026
```

Ce s-a întâmplat, pe rând:
- `ofstream fout("salut.txt");` **creează** fișierul `salut.txt` (iar dacă exista deja, **îl golește**) și îl deschide pentru scris;
- `fout << …` scrie în fișier, exact ca `cout`, dar nu apare nimic pe ecran;
- `fout.close();` închide fișierul. Este bine să-l închizi, ca să fii sigur că tot ce ai scris a ajuns pe disc.

> **Atenție:** `ofstream fout("salut.txt");` șterge conținutul vechi al fișierului. Dacă ai notat acolo ceva important, a dispărut. Mai jos vedem cum adaugi text fără să ștergi.

---

## 2. Citirea dintr-un fișier

### Exemplul 2 — Citim primele două linii **[Esențial]**

Folosim fișierul creat în Exemplul 1. Pentru linii întregi (cu spații) folosim `getline`, la fel ca la tastatură:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    ifstream fin("salut.txt");
    string linie;

    getline(fin, linie);
    cout << "Prima linie:   " << linie << endl;

    getline(fin, linie);
    cout << "A doua linie:  " << linie << endl;

    fin.close();
    return 0;
}
```

**Ieșire:**
```
Prima linie:   Salut, fisier!
A doua linie:  Anul 2026
```

Observă diferența față de tastatură: la `cin` scriai `getline(cin, linie)`, iar acum scrii `getline(fin, linie)`. Primul argument este **de unde citim**.

Fișierul are un fel de „cursor” care avansează pe măsură ce citești: primul `getline` ia prima linie, al doilea ia următoarea linie.

### Exemplul 3 — Ce facem dacă fișierul nu există? **[Esențial]**

Dacă încerci să deschizi un fișier care nu există (sau ai greșit numele), programul **nu se oprește singur**: pur și simplu nu citește nimic. De aceea verificăm întotdeauna dacă fișierul s-a deschis:

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ifstream fin("nu_exista.txt");

    if (!fin.is_open()) {
        cout << "Nu pot deschide fisierul nu_exista.txt" << endl;
        return 1;
    }

    cout << "Fisierul s-a deschis cu succes." << endl;
    fin.close();
    return 0;
}
```

**Ieșire:**
```
Nu pot deschide fisierul nu_exista.txt
```

- `fin.is_open()` este `true` dacă fișierul s-a deschis și `false` dacă nu.
- `!fin.is_open()` înseamnă „fișierul **nu** este deschis”.
- `return 1;` din `main` încheie programul și anunță sistemul că a apărut o problemă (`0` înseamnă că totul a mers bine).

De acum încolo, **după fiecare `ifstream` verificăm deschiderea**. Un program care presupune în tăcere că fișierul există va afișa rezultate ciudate, fără niciun mesaj de eroare.

### Exemplul 4 — Scriem mai multe linii cu o buclă **[Esențial]**

Fișierele se completează foarte bine cu bucle. Scriem tabla înmulțirii cu 7:

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ofstream fout("tabla7.txt");

    for (int i = 1; i <= 10; i++) {
        fout << "7 x " << i << " = " << 7 * i << endl;
    }

    fout.close();
    cout << "Tabla inmultirii cu 7 a fost salvata." << endl;
    return 0;
}
```

**Ieșire:**
```
Tabla inmultirii cu 7 a fost salvata.
```

### Exemplul 5 — Citim un fișier linie cu linie **[Esențial]**

Cum citim un fișier despre care nu știm câte linii are? Folosim `getline` chiar în condiția buclei `while`. Bucla se oprește singură când nu mai există linii:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    ifstream fin("tabla7.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide tabla7.txt" << endl;
        return 1;
    }

    string linie;
    int nr = 0;
    while (getline(fin, linie)) {
        nr++;
        cout << nr << ": " << linie << endl;
    }

    fin.close();
    cout << "Total linii: " << nr << endl;
    return 0;
}
```

**Ieșire:**
```
1: 7 x 1 = 7
2: 7 x 2 = 14
3: 7 x 3 = 21
4: 7 x 4 = 28
5: 7 x 5 = 35
6: 7 x 6 = 42
7: 7 x 7 = 49
8: 7 x 8 = 56
9: 7 x 9 = 63
10: 7 x 10 = 70
Total linii: 10
```

`getline(fin, linie)` are o proprietate utilă: dacă a reușit să citească o linie, e considerat „adevărat”, iar când ajunge la sfârșitul fișierului e considerat „fals”. De aceea `while (getline(fin, linie))` citește tot fișierul, pe rând, și apoi se oprește.

> **Nu scrie** `while (!fin.eof())`. Pare logic („cât timp nu s-a terminat fișierul”), dar `eof` devine adevărat abia **după** ce o citire a eșuat, deci ultima iterație lucrează cu date vechi sau goale. Forma corectă este `while (getline(fin, linie))` sau `while (fin >> x)`.

---

## 3. Citirea numerelor

Pentru numere nu avem nevoie de `getline`. Operatorul `>>` funcționează ca la tastatură: sare peste spații și peste liniile noi și citește câte o valoare.

### Exemplul 6 — Pregătim un fișier cu note

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int note[6] = {9, 10, 8, 7, 10, 6};

    ofstream fout("note.txt");
    for (int i = 0; i < 6; i++) {
        fout << note[i] << endl;
    }
    fout.close();

    cout << "Am salvat 6 note in note.txt" << endl;
    return 0;
}
```

**Ieșire:**
```
Am salvat 6 note in note.txt
```

Fișierul `note.txt` conține câte o notă pe linie: `9`, `10`, `8`, `7`, `10`, `6`.

### Exemplul 7 — Suma și media notelor din fișier **[Esențial]**

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ifstream fin("note.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide note.txt" << endl;
        return 1;
    }

    int nota;
    int suma = 0;
    int nr = 0;

    while (fin >> nota) {
        suma += nota;
        nr++;
    }
    fin.close();

    cout << "Note citite: " << nr << endl;
    cout << "Suma: " << suma << endl;
    if (nr > 0) {
        cout << "Media: " << (double)suma / nr << endl;
    } else {
        cout << "Fisierul este gol." << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Note citite: 6
Suma: 50
Media: 8.33333
```

`while (fin >> nota)` citește o valoare în `nota` și rămâne în buclă cât timp citirea a reușit. Când nu mai sunt numere, condiția devine falsă și bucla se oprește. Verificarea `nr > 0` te ferește de o împărțire la zero dacă fișierul este gol.

### Exemplul 8 — Minimul, maximul și notele de 10

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ifstream fin("note.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide note.txt" << endl;
        return 1;
    }

    int nota;
    int minim = 10;
    int maxim = 1;
    int zeci = 0;

    while (fin >> nota) {
        if (nota < minim) {
            minim = nota;
        }
        if (nota > maxim) {
            maxim = nota;
        }
        if (nota == 10) {
            zeci++;
        }
    }
    fin.close();

    cout << "Cea mai mica nota: " << minim << endl;
    cout << "Cea mai mare nota: " << maxim << endl;
    cout << "Note de 10: " << zeci << endl;
    return 0;
}
```

**Ieșire:**
```
Cea mai mica nota: 6
Cea mai mare nota: 10
Note de 10: 2
```

Ai recunoscut tiparele din Modulul 2 (minim, maxim, numărare). Singura diferență este sursa datelor: acum vin din fișier, nu de la tastatură.

### Exemplul 9 — Citim dintr-un fișier și scriem în altul

Un program poate avea **mai multe fișiere deschise în același timp**, unul de intrare și altul de ieșire. Aici copiem doar notele mari (cel puțin 9) într-un fișier nou:

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ifstream fin("note.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide note.txt" << endl;
        return 1;
    }
    ofstream fout("note_mari.txt");

    int nota;
    int copiate = 0;
    while (fin >> nota) {
        if (nota >= 9) {
            fout << nota << endl;
            copiate++;
        }
    }

    fin.close();
    fout.close();

    cout << "Am copiat " << copiate << " note in note_mari.txt" << endl;
    return 0;
}
```

**Ieșire:**
```
Am copiat 3 note in note_mari.txt
```

---

## 4. Adăugarea la sfârșitul fișierului

Am văzut că `ofstream fout("fisier.txt");` șterge ce era înainte. Dacă vrei să **adaugi** la sfârșit (de exemplu într-un jurnal), deschizi fișierul în modul `ios::app` (de la *append*, „a adăuga”).

### Exemplul 10 — Suprascriere sau adăugare **[Esențial]**

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // 1. Scriem prima linie
    ofstream f1("jurnal.txt");
    f1 << "Linia A" << endl;
    f1.close();

    // 2. Deschidem din nou, fara ios::app: se sterge tot
    ofstream f2("jurnal.txt");
    f2 << "Linia B" << endl;
    f2.close();

    // 3. Deschidem cu ios::app: se adauga la sfarsit
    ofstream f3("jurnal.txt", ios::app);
    f3 << "Linia C" << endl;
    f3.close();

    // Citim ce a ramas
    ifstream fin("jurnal.txt");
    string linie;
    while (getline(fin, linie)) {
        cout << linie << endl;
    }
    fin.close();
    return 0;
}
```

**Ieșire:**
```
Linia B
Linia C
```

„Linia A” a dispărut când am redeschis fișierul fără `ios::app`, dar „Linia B” a rămas, pentru că „Linia C” a fost **adăugată** după ea. Ține minte regula: **fără `ios::app` se șterge, cu `ios::app` se adaugă**.

---

## 5. Date structurate: nume și notă

Până acum fișierele aveau un singur fel de informație. Cel mai des însă ai nevoie de perechi, de exemplu *nume* și *notă*. Le scriem pe aceeași linie, separate prin spațiu.

### Exemplul 11 — Scriem un catalog

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ofstream fout("elevi.txt");

    fout << "Ana 9" << endl;
    fout << "Bogdan 7" << endl;
    fout << "Carmen 10" << endl;
    fout << "Dan 8" << endl;
    fout << "Elena 6" << endl;
    fout.close();

    cout << "Catalogul a fost salvat in elevi.txt" << endl;
    return 0;
}
```

**Ieșire:**
```
Catalogul a fost salvat in elevi.txt
```

### Exemplul 12 — Citim perechile și găsim elevul cel mai bun

Citim întâi un `string` (numele), apoi un `int` (nota), pe rând, într-o singură instrucțiune:

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    ifstream fin("elevi.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide elevi.txt" << endl;
        return 1;
    }

    string nume;
    int nota;
    string cel_mai_bun = "";
    int nota_maxima = 0;

    while (fin >> nume >> nota) {
        cout << nume << " are nota " << nota << endl;
        if (nota > nota_maxima) {
            nota_maxima = nota;
            cel_mai_bun = nume;
        }
    }
    fin.close();

    cout << "Cel mai bun: " << cel_mai_bun << " (" << nota_maxima << ")" << endl;
    return 0;
}
```

**Ieșire:**
```
Ana are nota 9
Bogdan are nota 7
Carmen are nota 10
Dan are nota 8
Elena are nota 6
Cel mai bun: Carmen (10)
```

`fin >> nume >> nota` citește un cuvânt în `nume` și apoi un număr în `nota`. Funcționează doar dacă **numele nu conține spații**. Pentru nume compuse (de exemplu „Ana Maria”) se folosește un alt format, cu fiecare dată pe linia ei, pe care îl vom întâlni mai târziu.

---

## 6. Alte tipare utile

### Exemplul 13 — Prima linie spune câte valori urmează

Un format foarte des întâlnit la probleme: prima valoare este `n`, iar apoi urmează `n` numere. Pregătim fișierul și îl citim imediat:

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ofstream fout("date.txt");
    fout << 5 << endl;
    fout << 12 << " " << 7 << " " << 30 << " " << 4 << " " << 19 << endl;
    fout.close();

    ifstream fin("date.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide date.txt" << endl;
        return 1;
    }

    int n;
    fin >> n;

    int suma = 0;
    for (int i = 0; i < n; i++) {
        int x;
        fin >> x;
        suma += x;
    }
    fin.close();

    cout << "Am citit " << n << " numere, suma lor este " << suma << endl;
    return 0;
}
```

**Ieșire:**
```
Am citit 5 numere, suma lor este 72
```

Ai deschis întâi fișierul pentru scris, l-ai închis (`fout.close()`), apoi l-ai deschis pentru citit. Ordinea contează: dacă nu închizi fișierul înainte să-l citești, e posibil ca datele să nu fi ajuns încă pe disc.

### Exemplul 14 — Citim de la tastatură și salvăm în fișier

Programul întreabă câte note vrei să introduci, le citește de la tastatură și le salvează:

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int n;
    cout << "Cate note introduci? ";
    cin >> n;

    ofstream fout("notele_mele.txt");
    for (int i = 1; i <= n; i++) {
        int nota;
        cout << "Nota " << i << ": ";
        cin >> nota;
        fout << nota << endl;
    }
    fout.close();

    cout << "Notele au fost salvate in notele_mele.txt" << endl;
    return 0;
}
```

**Rulare** (tastezi `3 8 10 9`):
```
Cate note introduci? 3
Nota 1: 8
Nota 2: 10
Nota 3: 9
Notele au fost salvate in notele_mele.txt
```

### Exemplul 15 — Citim caracter cu caracter

Uneori vrei să prelucrezi fiecare caracter, inclusiv spațiile și sfârșiturile de linie. Pentru asta există `fin.get(c)`. Copiem fișierul `salut.txt` în `mare.txt`, transformând literele în majuscule:

```cpp
#include <iostream>
#include <fstream>
#include <cctype>
using namespace std;

int main() {
    ifstream fin("salut.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide salut.txt" << endl;
        return 1;
    }
    ofstream fout("mare.txt");

    char c;
    int caractere = 0;
    while (fin.get(c)) {
        fout << (char)toupper(c);
        caractere++;
    }

    fin.close();
    fout.close();
    cout << "Am copiat " << caractere << " caractere in mare.txt" << endl;
    return 0;
}
```

**Ieșire:**
```
Am copiat 25 caractere in mare.txt
```

`fin.get(c)` citește **exact un caracter**, oricare ar fi el (inclusiv spațiu sau linie nouă). `toupper` vine din `<cctype>` și întoarce un `int`, de aceea îl transformăm înapoi în `char` înainte de a-l scrie.

Fișierul `mare.txt` arată acum așa:

```
SALUT, FISIER!
ANUL 2026
```

---

## 7. Mini-proiect

### Exemplul 16 — „Raportul de note” **[Esențial]**

Programul citește catalogul din `elevi.txt` (creat în Exemplul 11), calculează media clasei și scrie un **raport** în fișierul `raport.txt`. La final, afișează raportul pe ecran, citindu-l înapoi din fișier.

Pentru a număra elevii cu nota peste medie ai nevoie să parcurgi fișierul **de două ori**: întâi ca să afli media, apoi ca să compari fiecare notă cu ea. De aceea îl deschizi, îl închizi și îl deschizi din nou.

```cpp
/*
   Program: Raportul de note
   Scop:    citeste elevi.txt si scrie un raport in raport.txt
*/
#include <iostream>
#include <fstream>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    // PASUL 1: aflam suma si numarul de elevi
    ifstream fin("elevi.txt");
    if (!fin.is_open()) {
        cout << "Nu pot deschide elevi.txt" << endl;
        return 1;
    }

    string nume;
    int nota;
    int suma = 0;
    int nr = 0;
    while (fin >> nume >> nota) {
        suma += nota;
        nr++;
    }
    fin.close();

    if (nr == 0) {
        cout << "Nu exista elevi in fisier." << endl;
        return 1;
    }
    double media = (double)suma / nr;

    // PASUL 2: deschidem din nou fisierul si scriem raportul
    ifstream fin2("elevi.txt");
    ofstream raport("raport.txt");

    raport << "RAPORT CLASA" << endl;
    raport << "------------" << endl;

    int peste = 0;
    string cel_mai_bun = "";
    int maxim = 0;
    while (fin2 >> nume >> nota) {
        raport << nume << ": " << nota;
        if (nota > media) {
            raport << "  (peste medie)";
            peste++;
        }
        raport << endl;

        if (nota > maxim) {
            maxim = nota;
            cel_mai_bun = nume;
        }
    }
    fin2.close();

    raport << "------------" << endl;
    raport << "Elevi: " << nr << endl;
    raport << fixed << setprecision(2);
    raport << "Media clasei: " << media << endl;
    raport << "Peste medie: " << peste << endl;
    raport << "Cel mai bun: " << cel_mai_bun << " (" << maxim << ")" << endl;
    raport.close();

    // PASUL 3: afisam raportul pe ecran
    ifstream citire("raport.txt");
    string linie;
    while (getline(citire, linie)) {
        cout << linie << endl;
    }
    citire.close();
    return 0;
}
```

**Ieșire:**
```
RAPORT CLASA
------------
Ana: 9  (peste medie)
Bogdan: 7
Carmen: 10  (peste medie)
Dan: 8
Elena: 6
------------
Elevi: 5
Media clasei: 8.00
Peste medie: 2
Cel mai bun: Carmen (10)
```

Programul are trei pași clari, marcați prin comentarii. Când un program devine mai lung, această organizare te ajută să te orientezi. În lecțiile următoare vom împărți astfel de programe în **funcții**, ca să fie și mai ușor de citit.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Raportul de note” (obligatoriu)
Scrie programul din Exemplul 16. Apoi deschide `elevi.txt` într-un editor de text, adaugă încă doi elevi (câte o linie, `Nume nota`) și rulează din nou programul. Raportul trebuie să se schimbe **fără să modifici codul**.

### Exercițiul B — Statistici într-un fișier
Citește toate numerele din `note.txt` și scrie în `statistici.txt` cinci linii: numărul de note, suma, media, minimul și maximul.

### Exercițiul C — Jurnalul meu
Scrie un program care citește de la tastatură un cuvânt și îl adaugă (cu `ios::app`) pe o linie nouă în `jurnal2.txt`. Rulează programul de trei ori. La final, afișează tot conținutul fișierului.

### Exercițiul D — Pare și impare
Citește numerele din `date.txt` (formatul din Exemplul 13: întâi `n`, apoi `n` numere) și scrie numerele pare în `pare.txt` și pe cele impare în `impare.txt`.

### Exercițiul E — Numărătorul de linii și caractere
Citește un fișier text oarecare (de exemplu `salut.txt`) și afișează câte linii și câte caractere are (folosește `get`). Dacă fișierul nu există, afișează un mesaj de eroare.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Fiecare `ifstream` este urmat de verificarea `is_open()`  
- [ ] Toate fișierele sunt închise cu `close()`  
- [ ] Raportul se schimbă singur când modifici `elevi.txt`  
- [ ] Ai testat și cazul în care fișierul de intrare lipsește  
- [ ] Fișierul se numește `Prenume_Nume_M4L1.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Afișează în raport și numărul de elevi cu note sub 7  
- [ ] Scrie notele sortate descrescător într-un alt fișier (ai nevoie de un vector; în lecția următoare vezi o variantă mai comodă)  
- [ ] Citește un fișier text și afișează cuvântul cel mai lung  
- [ ] Scrie un program care compară două fișiere linie cu linie și spune dacă sunt identice  
- [ ] Salvează într-un fișier tabla înmulțirii pentru toate numerele de la 1 la 10 (cu o buclă imbricată)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Programul nu afișează nimic din fișier | Fișierul nu există sau este în alt folder | Verifică cu `is_open()` și caută fișierul în folderul de lucru |
| `error: 'ifstream' was not declared` (sau mesaj asemănător) | Lipsește biblioteca | `#include <fstream>` |
| Conținutul vechi dispare | `ofstream` golește fișierul | Pentru adăugare: `ofstream fout("f.txt", ios::app);` |
| Ultima valoare se citește de două ori | Ai folosit `while (!fin.eof())` | `while (fin >> x)` sau `while (getline(fin, linie))` |
| Datele scrise nu apar în fișier | Ai uitat `close()` sau ai citit fișierul înainte să-l închizi | Închide fișierul de scriere înainte să-l deschizi pentru citit |
| Numele cu spații se citesc greșit | `fin >> nume` se oprește la primul spațiu | Folosește `getline` sau un format cu o dată pe linie |
| `fin >> n` nu citește nimic | Fișierul conține text, nu numere | Verifică conținutul fișierului |
| Același `ifstream` citit a doua oară nu mai dă nimic | Cursorul a ajuns la sfârșitul fișierului | Închide și redeschide fișierul (sau folosește alt `ifstream`) |
| Calea cu `\` nu merge (`"C:\note.txt"`) | `\n` și `\t` au sens special în text | Scrie `\\` (`"C:\\note.txt"`) sau folosește doar numele fișierului |

---

## Recapitulare pe scurt

- Biblioteca: `#include <fstream>`.
- **Scriere:** `ofstream fout("nume.txt");` apoi `fout << …;` și `fout.close();`. Șterge conținutul vechi.
- **Adăugare:** `ofstream fout("nume.txt", ios::app);`.
- **Citire:** `ifstream fin("nume.txt");`, apoi `fin >> x` (valori) sau `getline(fin, linie)` (linii) sau `fin.get(c)` (caractere).
- **Verificare:** `if (!fin.is_open()) { … return 1; }`.
- **Parcurgere completă:** `while (fin >> x)` sau `while (getline(fin, linie))`, **nu** `while (!fin.eof())`.
- Pentru a citi de două ori același fișier, îl închizi și îl redeschizi.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Creează în Notepad un fișier `numere.txt` cu 10 numere și scrie un program care afișează suma, media și cel mai mare număr.  
3. Scrie un program care salvează într-un fișier primele 30 de numere prime, câte unul pe linie, iar apoi le citește și afișează câte sunt.  
4. Scrie un „agendă simplă”: citești de la tastatură un nume și un număr de telefon (ca text, fără spații) și le adaugi într-un fișier `agenda.txt`. La final afișezi toată agenda.  
5. **Bonus:** pornind de la `elevi.txt`, scrie un program care afișează doar elevii cu nota mai mare decât o valoare citită de la tastatură.  
6. Salvează tot ca `Tema_M4L1_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 2
În lecția 1 am citit notele pe rând, fără să le păstrăm. Data viitoare învățăm `std::vector`, o listă care **crește singură**, fără să-i stabilim dinainte dimensiunea. Cu ea poți păstra toate notele din fișier și le poți sorta, căuta și afișa de câte ori vrei.
