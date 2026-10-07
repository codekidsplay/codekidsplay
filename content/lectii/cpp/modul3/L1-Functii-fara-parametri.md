# LECȚIA 1 — Funcții fără parametri
**Modulul 3 · Funcții, string, algoritmi · 2 ore**  
**Code Maker Club · Problem Solver**

> Azi înveți să-ți împarți programul în **bucăți mici, cu nume**, numite funcții. În loc să scrii același cod de zece ori, îl scrii o singură dată și îl **chemi** de câte ori ai nevoie.  
> Proiect: **„Cartea de vizită”** · fișier: `Prenume_Nume_M3L1.cpp` (ex. `Ana_Pop_M3L1.cpp`)

---

## Obiectiv
La finalul orei știi ce este o funcție, o scrii cu `void`, o chemi (o „apelezi”) din `main`, folosești prototipuri, înțelegi variabilele locale și construiești un program din mai multe funcții mici.  
**Minim:** două funcții proprii, apelate din `main`.  
**Ținta orei (Complet):** + o funcție care apelează altă funcție și un program organizat pe funcții (meniu, titlu, conținut).

## De ce contează
Programele mari nu se scriu dintr-o bucată. Se descompun în părți: „desenează meniul”, „citește nota”, „calculează media”. Fiecare parte este o funcție. Așa codul este mai scurt, mai ușor de citit, de testat și de reparat: dacă ai o greșeală, o repari într-un singur loc.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare Modulul 2 și problema codului repetat (**Exemplul 1**) |
| 10–35 | Prima funcție: definire și apel (**Exemplele 2–4**) |
| 35–55 | Prototipuri și ordinea în fișier (**Exemplele 5–6**) |
| 55–80 | Funcții cu bucle, funcții care apelează funcții (**Exemplele 7–9**) |
| 80–100 | Variabile locale, constante globale, `return;` (**Exemplele 10–13**) |
| 100–118 | Proiecte (**Exemplele 14–16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Problema: același cod, scris de mai multe ori

### Exemplul 1 — Cod repetat **[Esențial]**

Vrei să desenezi o casetă în jurul a trei mesaje.

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "+----------+" << endl;
    cout << "| Salut!   |" << endl;
    cout << "+----------+" << endl;

    cout << "+----------+" << endl;
    cout << "| Bine ai  |" << endl;
    cout << "+----------+" << endl;

    cout << "+----------+" << endl;
    cout << "| venit!   |" << endl;
    cout << "+----------+" << endl;
    return 0;
}
```

**Ieșire:**
```
+----------+
| Salut!   |
+----------+
+----------+
| Bine ai  |
+----------+
+----------+
| venit!   |
+----------+
```

Linia `+----------+` apare de șase ori. Dacă vrei să o faci mai lungă, trebuie să o schimbi în șase locuri și să nu greșești niciunul. Funcțiile rezolvă exact această problemă.

---

## 2. Prima funcție

O funcție este o **grupare de instrucțiuni, cu un nume**. O scrii o dată, apoi o chemi ori de câte ori vrei, ca pe o rețetă: „fă prăjitura” nu repetă toți pașii în text, ci doar spune numele.

```
void numeFunctie() {
    // instructiunile functiei
}
```

- `void` înseamnă „nu returnează nimic” (în lecția 3 vom vedea funcții care returnează valori);
- `numeFunctie` este numele pe care îl alegi tu;
- `()` sunt parantezele; acum sunt goale, pentru că funcția nu primește nimic (în lecția 2 vom pune parametri);
- între `{ }` sunt instrucțiunile funcției.

Pentru a o folosi, scrii numele ei urmat de paranteze și `;` : `numeFunctie();`. Aceasta se numește **apel**.

> Ai folosit deja o funcție de la început: `main()`. Programul începe întotdeauna din `main`.

### Exemplul 2 — Prima funcție: `saluta()` **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void saluta() {
    cout << "Salut! Bine ai venit la Code Maker Club!" << endl;
}

int main() {
    saluta();
    return 0;
}
```

**Ieșire:**
```
Salut! Bine ai venit la Code Maker Club!
```

Ordinea de execuție: programul pornește din `main`, ajunge la `saluta();`, **sare** în funcție, execută instrucțiunile ei, apoi se **întoarce** în `main`, la linia următoare.

### Exemplul 3 — O funcție, apelată de mai multe ori **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void linie() {
    cout << "+----------+" << endl;
}

int main() {
    linie();
    cout << "| Salut!   |" << endl;
    linie();
    cout << "| Bine ai  |" << endl;
    linie();
    cout << "| venit!   |" << endl;
    linie();
    return 0;
}
```

**Ieșire:**
```
+----------+
| Salut!   |
+----------+
| Bine ai  |
+----------+
| venit!   |
+----------+
```

Acum linia apare într-un singur loc din cod. Vrei una mai lungă? Modifici o singură linie, în funcție, și toate apelurile se schimbă.

### Exemplul 4 — Mai multe funcții, în ordinea apelării **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void unu() {
    cout << "Pasul 1: pornesc" << endl;
}

void doi() {
    cout << "Pasul 2: lucrez" << endl;
}

void trei() {
    cout << "Pasul 3: termin" << endl;
}

int main() {
    cout << "Start" << endl;
    unu();
    doi();
    trei();
    doi();
    cout << "Stop" << endl;
    return 0;
}
```

**Ieșire:**
```
Start
Pasul 1: pornesc
Pasul 2: lucrez
Pasul 3: termin
Pasul 2: lucrez
Stop
```

Funcțiile se execută în ordinea în care sunt **apelate**, nu în ordinea în care sunt scrise. Aici `doi()` este apelată de două ori.

**Încearcă tu (8 min)**  
- [ ] Scrii o funcție `salutDimineata()` care afișează un mesaj  
- [ ] O apelezi din `main` de 3 ori  
- [ ] Schimbi mesajul într-un singur loc și vezi că se modifică la toate apelurile  

---

## 3. Ordinea în fișier și prototipurile

C++ citește fișierul de sus în jos. O funcție trebuie **cunoscută** înainte să fie apelată. Dacă ai scris funcția **după** `main`, compilatorul nu știe încă de ea și dă eroare:

```cpp
#include <iostream>
using namespace std;

int main() {
    saluta();          // eroare: 'saluta' was not declared in this scope
    return 0;
}

void saluta() {
    cout << "Salut!" << endl;
}
```

Ai două soluții: să pui funcțiile **înainte** de `main` (cum am făcut până acum) sau să folosești un **prototip**.

Un prototip este o „anunțare” a funcției, la începutul fișierului: spune compilatorului „va exista o funcție cu acest nume”. Seamănă cu prima linie a funcției, urmată de `;`.

### Exemplul 5 — Funcția după `main`, cu prototip **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void saluta();

int main() {
    cout << "Incep programul." << endl;
    saluta();
    cout << "Programul se termina." << endl;
    return 0;
}

void saluta() {
    cout << "Salut din functie!" << endl;
}
```

**Ieșire:**
```
Incep programul.
Salut din functie!
Programul se termina.
```

Prototipul `void saluta();` este promisiunea, iar definiția de după `main` este „livrarea”. Mulți programatori preferă acest stil: `main` apare sus, ca un cuprins, iar detaliile sunt mai jos.

### Exemplul 6 — Mai multe prototipuri, `main` ca „cuprins”

```cpp
#include <iostream>
using namespace std;

void titlu();
void continut();
void incheiere();

int main() {
    titlu();
    continut();
    incheiere();
    return 0;
}

void titlu() {
    cout << "=== RAPORT ===" << endl;
}

void continut() {
    cout << "Totul functioneaza corect." << endl;
}

void incheiere() {
    cout << "=== SFARSIT ===" << endl;
}
```

**Ieșire:**
```
=== RAPORT ===
Totul functioneaza corect.
=== SFARSIT ===
```

Citind doar `main`, înțelegi imediat ce face programul: titlu, conținut, final. Nu trebuie să citești toate detaliile. Aceasta este marea putere a funcțiilor: **abstractizarea**.

---

## 4. Funcții cu bucle, funcții care apelează funcții

### Exemplul 7 — Funcție cu buclă în interior **[Esențial]**

```cpp
#include <iostream>
using namespace std;

void numaratoareInversa() {
    for (int i = 5; i >= 1; i--) {
        cout << i << "... ";
    }
    cout << "Start!" << endl;
}

int main() {
    cout << "Pregatiti-va!" << endl;
    numaratoareInversa();
    return 0;
}
```

**Ieșire:**
```
Pregatiti-va!
5... 4... 3... 2... 1... Start!
```

O funcție poate conține orice știi deja: bucle, `if`, `switch`, citire și afișare.

### Exemplul 8 — Funcție care deseneaza un triunghi

```cpp
#include <iostream>
using namespace std;

void triunghi() {
    for (int i = 1; i <= 4; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "* ";
        }
        cout << endl;
    }
}

int main() {
    cout << "Triunghi:" << endl;
    triunghi();
    cout << endl << "Din nou:" << endl;
    triunghi();
    return 0;
}
```

**Ieșire:**
```
Triunghi:
* 
* * 
* * * 
* * * * 

Din nou:
* 
* * 
* * * 
* * * * 
```

### Exemplul 9 — O funcție care apelează alte funcții

```cpp
#include <iostream>
using namespace std;

void linie() {
    cout << "====================" << endl;
}

void titlu() {
    linie();
    cout << "   CODE MAKER CLUB" << endl;
    linie();
}

int main() {
    titlu();
    cout << "Bine ai venit!" << endl;
    linie();
    return 0;
}
```

**Ieșire:**
```
====================
   CODE MAKER CLUB
====================
Bine ai venit!
====================
```

`titlu()` apelează `linie()` de două ori, iar `main` apelează `titlu()` și `linie()`. Funcțiile se pot combina ca niște cuburi. Atenție la ordine: `linie()` este scrisă **înaintea** lui `titlu()`, pentru că `titlu()` o folosește.

**Încearcă tu (10 min)**  
- [ ] Scrii o funcție care desenează un pătrat din `#`  
- [ ] Scrii o funcție `titlu()` care folosește o funcție `linie()`  
- [ ] Apelezi aceeași funcție de două ori din `main`  

---

## 5. Variabile locale, constante globale, `return;`

### Exemplul 10 — Variabile locale

O variabilă declarată **într-o funcție** există doar în acea funcție. Se numește variabilă **locală**. Alte funcții nu o văd.

```cpp
#include <iostream>
using namespace std;

void unu() {
    int x = 10;
    cout << "In unu(): x = " << x << endl;
}

void doi() {
    int x = 99;
    cout << "In doi(): x = " << x << endl;
}

int main() {
    int x = 5;
    unu();
    doi();
    cout << "In main(): x = " << x << endl;
    return 0;
}
```

**Ieșire:**
```
In unu(): x = 10
In doi(): x = 99
In main(): x = 5
```

Există trei variabile diferite, toate numite `x`, câte una în fiecare funcție. Nu se încurcă între ele. Dacă `main` nu și-ar fi declarat propriul `x` și ai încerca să folosești variabila `x` din `unu()`, ai primi o eroare: `'x' was not declared in this scope`.

### Exemplul 11 — Constantă globală

O variabilă (sau constantă) declarată **în afara** funcțiilor este **globală** și poate fi folosită oriunde. Pentru constante este o practică bună.

```cpp
#include <iostream>
using namespace std;

const int LATIME = 12;

void linie() {
    for (int i = 0; i < LATIME; i++) {
        cout << "-";
    }
    cout << endl;
}

int main() {
    linie();
    cout << "Latimea este " << LATIME << endl;
    linie();
    return 0;
}
```

**Ieșire:**
```
------------
Latimea este 12
------------
```

Modifici `LATIME` o singură dată și se schimbă peste tot. Reține: constantele globale sunt OK; variabilele globale obișnuite (care se modifică) fac programul greu de înțeles, așa că le evităm.

### Exemplul 12 — Funcție care citește și afișează **[Esențial]**

```cpp
#include <iostream>
#include <string>
using namespace std;

void intrebaNumele() {
    string nume;
    cout << "Cum te cheama? ";
    cin >> nume;
    cout << "Placut sa te cunosc, " << nume << "!" << endl;
}

int main() {
    intrebaNumele();
    intrebaNumele();
    return 0;
}
```

**Rulare** (tastezi `Ana`, apoi `Dan`):
```
Cum te cheama? Ana
Placut sa te cunosc, Ana!
Cum te cheama? Dan
Placut sa te cunosc, Dan!
```

Variabila `nume` este locală: la fiecare apel ia o altă valoare și dispare la sfârșitul funcției. Observă că funcția nu poate „da” numele înapoi în `main`; despre asta vorbim în lecția 3.

### Exemplul 13 — `return;` oprește funcția mai devreme

```cpp
#include <iostream>
using namespace std;

void verificaVarsta() {
    int varsta;
    cout << "Varsta ta: ";
    cin >> varsta;

    if (varsta < 12) {
        cout << "Cursul este pentru 12+ ani." << endl;
        return;
    }

    cout << "Esti la varsta potrivita. Bun venit!" << endl;
}

int main() {
    verificaVarsta();
    cout << "Gata." << endl;
    return 0;
}
```

**Rulare** (tastezi `9`):
```
Varsta ta: 9
Cursul este pentru 12+ ani.
Gata.
```

**Rulare** (tastezi `15`):
```
Varsta ta: 15
Esti la varsta potrivita. Bun venit!
Gata.
```

În funcțiile `void`, `return;` (fără valoare) oprește funcția pe loc și te întoarce în locul de unde a fost chemată. Instrucțiunile de după nu se mai execută.

---

## 6. Proiecte

### Exemplul 14 — Meniu cu funcții

```cpp
#include <iostream>
using namespace std;

void afiseazaMeniu() {
    cout << endl << "===== MENIU =====" << endl;
    cout << "1. Salut" << endl;
    cout << "2. Regulile jocului" << endl;
    cout << "0. Iesire" << endl;
    cout << "Alege: ";
}

void salut() {
    cout << "Salut, jucatorule!" << endl;
}

void reguli() {
    cout << "Regula 1: citeste cu atentie." << endl;
    cout << "Regula 2: testeaza programul." << endl;
}

int main() {
    int optiune;

    do {
        afiseazaMeniu();
        cin >> optiune;

        switch (optiune) {
            case 1:
                salut();
                break;
            case 2:
                reguli();
                break;
            case 0:
                cout << "La revedere!" << endl;
                break;
            default:
                cout << "Optiune invalida." << endl;
        }
    } while (optiune != 0);

    return 0;
}
```

**Rulare** (tastezi `1`, `2`, `9`, `0`):
```

===== MENIU =====
1. Salut
2. Regulile jocului
0. Iesire
Alege: 1
Salut, jucatorule!

===== MENIU =====
1. Salut
2. Regulile jocului
0. Iesire
Alege: 2
Regula 1: citeste cu atentie.
Regula 2: testeaza programul.

===== MENIU =====
1. Salut
2. Regulile jocului
0. Iesire
Alege: 9
Optiune invalida.

===== MENIU =====
1. Salut
2. Regulile jocului
0. Iesire
Alege: 0
La revedere!
```

Compară acest program cu meniurile din Modulul 2: acolo tot codul era în `main`. Acum `main` este scurt și clar, iar fiecare opțiune are propria funcție.

### Exemplul 15 — Robotul din bucăți

```cpp
#include <iostream>
using namespace std;

void cap() {
    cout << "   _____   " << endl;
    cout << "  | o o |  " << endl;
    cout << "  |  -  |  " << endl;
    cout << "  |_____|  " << endl;
}

void corp() {
    cout << "  /|     |\\ " << endl;
    cout << " / |  #  | \\" << endl;
    cout << "   |_____|  " << endl;
}

void picioare() {
    cout << "    |   |   " << endl;
    cout << "   _|   |_  " << endl;
}

void robot() {
    cap();
    corp();
    picioare();
}

int main() {
    cout << "Robotul meu:" << endl;
    robot();
    return 0;
}
```

**Ieșire:**
```
Robotul meu:
   _____   
  | o o |  
  |  -  |  
  |_____|  
  /|     |\ 
 / |  #  | \
   |_____|  
    |   |   
   _|   |_  
```

Funcția `robot()` este făcută din trei funcții mai mici. Ca la LEGO: bucăți simple, combinate în construcții mai mari. Dacă vrei un alt cap, modifici doar `cap()`. Observă `\\` din cod: în text, caracterul `\` se scrie dublu (Modulul 1, lecția 1).

### Exemplul 16 — „Cartea de vizită” (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Cartea de vizita
   Scop:    program organizat pe functii mici
*/
#include <iostream>
using namespace std;

const int LATIME = 30;

void linie(char c) {
    for (int i = 0; i < LATIME; i++) {
        cout << c;
    }
    cout << endl;
}

void antet() {
    linie('=');
    cout << "      CARTE DE VIZITA" << endl;
    linie('=');
}

void date() {
    cout << " Nume:    Ana Popescu" << endl;
    cout << " Clasa:   a VII-a" << endl;
    cout << " Hobby:   programare" << endl;
}

void contact() {
    cout << " Email:   ana@exemplu.ro" << endl;
    cout << " Telefon: 0700 000 000" << endl;
}

int main() {
    antet();
    date();
    linie('-');
    contact();
    linie('=');
    return 0;
}
```

**Ieșire:**
```
==============================
      CARTE DE VIZITA
==============================
 Nume:    Ana Popescu
 Clasa:   a VII-a
 Hobby:   programare
------------------------------
 Email:   ana@exemplu.ro
 Telefon: 0700 000 000
==============================
```

Ai o primă privire asupra unui lucru nou: `linie(char c)` primește o literă între paranteze. Se numește **parametru** și este subiectul lecției următoare. Deocamdată observă cât de curat arată `main`: citești programul ca pe o listă de pași.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Cartea de vizită” (obligatoriu)
Scrie programul din Exemplul 16, dar cu **datele tale**. Adaugă o a treia secțiune (de exemplu `jocuriPreferate()`).

### Exercițiul B — Funcții de desen
Scrie trei funcții: `patrat()`, `triunghi()` și `dreptunghi()`, care desenează figuri din `*`. Apelează-le din `main` în ordinea dorită.

### Exercițiul C — Regulile jocului
Scrie un program cu un meniu (cu `do-while`) în care fiecare opțiune apelează o funcție: `reguli()`, `scor()`, `credite()`.

### Exercițiul D — Prototipuri
Rescrie programul de la exercițiul B astfel încât toate funcțiile să fie scrise **după** `main`, cu prototipuri sus.

### Exercițiul E — Căutarea greșelii
Ia Exemplul 10 și încearcă să afișezi în `main` valoarea lui `x` din `unu()`. Citește mesajul de eroare și explică-l în două propoziții.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Ai minimum 3 funcții proprii  
- [ ] Cel puțin una apelează altă funcție  
- [ ] `main` este scurt și ușor de citit  
- [ ] Ai folosit minimum un prototip sau ai respectat ordinea funcțiilor  
- [ ] Fișierul se numește `Prenume_Nume_M3L1.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Desenează o casă din mai multe funcții: `acoperis()`, `pereti()`, `usa()`  
- [ ] Scrie o funcție care afișează un banner cu numele tău, încadrat de linii  
- [ ] Scrie o funcție `pauza()` care așteaptă ca utilizatorul să tasteze un număr înainte de a continua  
- [ ] Creează un „tur al programului”: o funcție care apelează alte cinci funcții, fiecare cu un mesaj  
- [ ] Scrie o funcție care desenează tabla de șah 8 × 8 (Modulul 2, lecția 5)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `'saluta' was not declared in this scope` | Funcția este scrisă după `main`, fără prototip | Mut-o înainte de `main` sau adaugă `void saluta();` sus |
| Nu se întâmplă nimic când rulezi | Ai scris funcția, dar nu ai apelat-o | Adaugă `saluta();` în `main` |
| Eroare la `{` după numele funcției (de ex. `expected unqualified-id`) | Ai pus `;` după `void f()` la definiție | La definiție nu pui `;` înainte de `{`; la prototip da |
| `'x' was not declared in this scope` | Folosești o variabilă locală din altă funcție | Declar-o în funcția unde o folosești |
| Funcția se apelează, dar nu face nimic | Ai scris `saluta;` fără paranteze | `saluta();` |
| Eroare la `void` | Ai scris `void saluta() { … }` în interiorul lui `main` | Funcțiile se scriu **în afara** altor funcții |
| `redefinition of 'saluta'` | Ai două funcții cu același nume și aceeași formă | Fiecare funcție are un nume unic |
| Modifici o variabilă în funcție și nu se schimbă în `main` | Variabila din funcție este locală | Vezi lecția 3 (`return`) și lecția 2 |

---

## Recapitulare pe scurt

- O **funcție** este un grup de instrucțiuni cu un nume: `void nume() { … }`.
- O **apelezi** scriind numele cu paranteze: `nume();`.
- `void` = nu returnează nimic. `return;` oprește funcția mai devreme.
- Funcția trebuie cunoscută **înainte** de apel: pui funcțiile deasupra lui `main` sau folosești **prototipuri** (`void nume();`).
- Variabilele declarate într-o funcție sunt **locale**: există doar acolo.
- Constantele globale (`const int …`) sunt permise și utile.
- O funcție poate apela alte funcții.
- `main` devine un „cuprins” citibil al programului.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie un program „Salutul zilei” cu trei funcții: `dimineata()`, `pranz()` și `seara()`, fiecare cu un mesaj diferit. În `main` apelează-le pe rând.  
3. Scrie un program cu o funcție `chenar()` care afișează un dreptunghi gol (conturul) din `*`, de 5 × 10, și o funcție `umplut()` care îl desenează plin. Apelează-le pe amândouă.  
4. Rescrie un program mic din Modulul 2 (de exemplu, Desenatorul de figuri) astfel încât fiecare figură să fie desenată de o funcție.  
5. **Bonus:** scrie un program cu un meniu din 4 opțiuni, în care fiecare opțiune apelează o funcție diferită.  
6. Salvează tot ca `Tema_M3L1_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 2
Învățăm să **trimitem informații** funcțiilor: parametri. Astfel, aceeași funcție poate desena linii de lungimi diferite sau poate aduna orice două numere.
