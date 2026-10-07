# LECȚIA 4 — String: bazele
**Modulul 3 · Funcții, string, algoritmi · 2 ore**  
**Code Maker Club · Problem Solver**

> Până acum ai lucrat mai ales cu numere. Azi intri în lumea **textului**: un `string` este un șir de litere pe care îl poți măsura, îl poți parcurge literă cu literă, îl poți lipi cu altul și îl poți răsturna.  
> Proiect: **„Analizorul de nume”** · fișier: `Prenume_Nume_M3L4.cpp` (ex. `Ana_Pop_M3L4.cpp`)

---

## Obiectiv
La finalul orei declari și afișezi string-uri, afli lungimea cu `length()`, accesezi litere cu `s[i]`, lipești texte cu `+`, citești o propoziție întreagă cu `getline`, extragi bucăți cu `substr`, inversezi un text și verifici dacă este palindrom.  
**Minim:** un program care citește un cuvânt și îi afișează lungimea, prima și ultima literă.  
**Ținta orei (Complet):** + afișarea cuvântului invers și verificarea palindromului, într-o funcție.

## De ce contează
Aproape tot ce vezi într-o aplicație este text: nume, parole, mesaje, adrese, titluri. Un jucător își scrie numele, un chat trimite mesaje, o parolă trebuie verificată. Pentru toate acestea ai nevoie de `string`.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: funcții cu `return` |
| 10–35 | Lungime și acces la litere (**Exemplele 1–4**) |
| 35–55 | Lipirea și modificarea textelor (**Exemplele 5–7**) |
| 55–75 | Citirea cu `getline`, comparații (**Exemplele 8–10**) |
| 75–95 | `substr`, inversare, palindrom (**Exemplele 11–13**) |
| 95–118 | Proiecte (**Exemplele 14–16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Lungime și acces la litere

Un `string` este un șir de caractere. Pentru a-l folosi ai nevoie de `#include <string>`. Fiecare literă are o **poziție**, numerotată ca la vectori: **de la 0**.

```
text:      C   o   d   e
poziție:   0   1   2   3
```

- `s.length()` (sau `s.size()`) = numărul de caractere;
- `s[0]` = prima literă; `s[s.length() - 1]` = ultima literă.

### Exemplul 1 — Declarare și afișare **[Esențial]**

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string salut = "Salut";
    string nume = "Ana";
    string gol = "";

    cout << salut << ", " << nume << "!" << endl;
    cout << "Textul gol are lungimea " << gol.length() << endl;
    return 0;
}
```

**Ieșire:**
```
Salut, Ana!
Textul gol are lungimea 0
```

Un string se pune între ghilimele duble: `"…"`. Un string poate fi și **gol** (`""`), adică fără niciun caracter.

### Exemplul 2 — Lungimea unui text **[Esențial]**

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string cuvant = "programare";

    cout << "Cuvantul: " << cuvant << endl;
    cout << "Lungime: " << cuvant.length() << endl;
    cout << "Lungime (size): " << cuvant.size() << endl;
    cout << "Textul 'Salut lume' are " << string("Salut lume").length() << " caractere" << endl;
    return 0;
}
```

**Ieșire:**
```
Cuvantul: programare
Lungime: 10
Lungime (size): 10
Textul 'Salut lume' are 10 caractere
```

`length()` și `size()` fac același lucru. Spațiul este și el un caracter: „Salut lume” are 10 caractere, nu 9.

### Exemplul 3 — Prima și ultima literă

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string cuvant = "Calculator";

    cout << "Prima litera: " << cuvant[0] << endl;
    cout << "A doua litera: " << cuvant[1] << endl;
    cout << "Ultima litera: " << cuvant[cuvant.length() - 1] << endl;
    return 0;
}
```

**Ieșire:**
```
Prima litera: C
A doua litera: a
Ultima litera: r
```

Ultima poziție este `length() - 1`, la fel ca la vectori: „Calculator” are 10 litere, deci pozițiile sunt de la 0 la 9. Rezultatul lui `cuvant[i]` este un `char`.

### Exemplul 4 — Parcurgem textul literă cu literă **[Esențial]**

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string cuvant = "robot";

    int n = cuvant.length();

    for (int i = 0; i < n; i++) {
        cout << i << ": " << cuvant[i] << endl;
    }
    return 0;
}
```

**Ieșire:**
```
0: r
1: o
2: b
3: o
4: t
```

Bucla standard pentru un text este exact cea de la vectori. Am salvat mai întâi lungimea într-o variabilă `int n`; așa bucla compară doi întregi de același fel.

**Încearcă tu (8 min)**  
- [ ] Declari un string cu numele tău și afișezi lungimea lui  
- [ ] Afișezi prima și ultima literă  
- [ ] Afișezi fiecare literă pe un rând, numerotată de la 1  

---

## 2. Lipirea și modificarea textelor

### Exemplul 5 — Concatenare cu `+` **[Esențial]**

**Concatenare** înseamnă „lipirea” textelor unul după altul.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string prenume = "Ana";
    string nume = "Popescu";

    string complet = prenume + " " + nume;
    cout << complet << endl;

    string mesaj = "Salut, " + complet + "!";
    cout << mesaj << endl;
    cout << "Lungime: " << mesaj.length() << endl;
    return 0;
}
```

**Ieșire:**
```
Ana Popescu
Salut, Ana Popescu!
Lungime: 19
```

Poți lipi string-uri cu `+`, inclusiv cu un text scris direct, ca `" "`. Nu poți lipi însă două texte scrise direct între ele: `"Salut" + "lume"` este o eroare; măcar unul dintre cele două trebuie să fie un `string`.

### Exemplul 6 — Adăugăm la un text existent cu `+=`

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "C";

    text += "+";
    text += "+";
    cout << text << endl;

    text += " este distractiv";
    cout << text << endl;

    string litere = "";
    for (char c = 'a'; c <= 'e'; c++) {
        litere += c;
    }
    cout << litere << endl;
    return 0;
}
```

**Ieșire:**
```
C++
C++ este distractiv
abcde
```

`+=` adaugă la sfârșit. Poți adăuga un text sau un singur caracter. Ultima parte construiește litera cu literă textul `abcde`; metoda aceasta este baza multor algoritmi pe text.

### Exemplul 7 — Schimbăm o literă

Spre deosebire de literele dintr-un text scris direct, într-un `string` poți modifica o literă:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string cuvant = "casa";
    cout << "Inainte: " << cuvant << endl;

    cuvant[0] = 'm';
    cout << "Dupa: " << cuvant << endl;

    cuvant[cuvant.length() - 1] = 'e';
    cout << "Si dupa: " << cuvant << endl;
    return 0;
}
```

**Ieșire:**
```
Inainte: casa
Dupa: masa
Si dupa: mase
```

Aici ai transformat `casa` în `masa`, apoi în `mase`. Observă că pentru o literă folosești **ghilimele simple** (`'m'`), pentru un text întreg ghilimele duble (`"masa"`), ca în Modulul 1.

---

## 3. Citirea cu `getline` și compararea textelor

### Exemplul 8 — `cin >>` citește doar un cuvânt

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text;
    cout << "Scrie o propozitie: ";
    cin >> text;
    cout << "Am citit: " << text << endl;
    return 0;
}
```

**Rulare** (tastezi `Imi place C++`):
```
Scrie o propozitie: Imi place C++
Am citit: Imi
```

`cin >>` se oprește la primul spațiu. Din „Imi place C++” a citit doar „Imi”. Pentru o propoziție întreagă folosim `getline`.

### Exemplul 9 — `getline` citește o linie întreagă **[Esențial]**

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text;
    cout << "Scrie o propozitie: ";
    getline(cin, text);

    cout << "Am citit: " << text << endl;
    cout << "Are " << text.length() << " caractere." << endl;
    return 0;
}
```

**Rulare** (tastezi `Imi place C++`):
```
Scrie o propozitie: Imi place C++
Am citit: Imi place C++
Are 13 caractere.
```

`getline(cin, text)` citește tot ce scrii până apeși Enter, inclusiv spațiile.

**Capcană!** Dacă ai citit înainte un număr cu `cin >>`, în memorie mai rămâne caracterul Enter. Atunci `getline` îl găsește imediat și citește un text gol. Soluția: `cin.ignore();` înainte de `getline`.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int varsta;
    string nume;

    cout << "Varsta: ";
    cin >> varsta;

    cin.ignore();

    cout << "Numele complet: ";
    getline(cin, nume);

    cout << nume << " are " << varsta << " ani." << endl;
    return 0;
}
```

**Rulare** (tastezi `13`, apoi `Ana Maria Pop`):
```
Varsta: 13
Numele complet: Ana Maria Pop
Ana Maria Pop are 13 ani.
```

Fără linia `cin.ignore();`, programul ar sări peste citirea numelui. Reține regula: **după `cin >>` și înainte de `getline` pui `cin.ignore();`**.

### Exemplul 10 — Compararea textelor **[Esențial]**

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string a = "mere";
    string b = "pere";
    string c = "mere";

    if (a == c) {
        cout << a << " este egal cu " << c << endl;
    }
    if (a != b) {
        cout << a << " este diferit de " << b << endl;
    }
    if (a < b) {
        cout << a << " apare inaintea lui " << b << " in ordine alfabetica" << endl;
    }
    if (string("Ana") == string("ana")) {
        cout << "egale" << endl;
    } else {
        cout << "Ana si ana sunt diferite (litere mari/mici)" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
mere este egal cu mere
mere este diferit de pere
mere apare inaintea lui pere in ordine alfabetica
Ana si ana sunt diferite (litere mari/mici)
```

Pentru texte funcționează `==`, `!=`, `<`, `>`. Ordinea este alfabetică, dar diferența dintre literele mari și mici contează: `"Ana"` și `"ana"` sunt texte diferite.

**Încearcă tu (10 min)**  
- [ ] Citești numele complet cu `getline` și îi afișezi lungimea  
- [ ] Citești o vârstă și apoi un nume, cu `cin.ignore()`  
- [ ] Compari două cuvinte citite și spui care vine primul alfabetic  

---

## 4. `substr`, inversare, palindrom

### Exemplul 11 — Extragem o bucată cu `substr`

`text.substr(poziție, lungime)` returnează o bucată din text, începând de la `poziție`, cu `lungime` caractere.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "programare";

    cout << text.substr(0, 3) << endl;
    cout << text.substr(3, 4) << endl;
    cout << text.substr(6) << endl;
    cout << text.substr(text.length() - 3, 3) << endl;
    return 0;
}
```

**Ieșire:**
```
pro
gram
mare
are
```

Dacă omiți lungimea (`text.substr(6)`), primești tot ce urmează de la poziția 6 până la sfârșit. Ultima linie extrage ultimele trei litere.

### Exemplul 12 — Inversăm un text

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "calculator";
    string invers = "";

    for (int i = text.length() - 1; i >= 0; i--) {
        invers += text[i];
    }

    cout << text << " -> " << invers << endl;
    return 0;
}
```

**Ieșire:**
```
calculator -> rotaluclac
```

Parcurgem textul de la sfârșit către început și adăugăm fiecare literă la rezultat. Ca la vectori, ultimul indice este `length() - 1`.

### Exemplul 13 — Palindrom (versiunea simplă) **[Esențial]**

Un **palindrom** este un text care se citește la fel în ambele sensuri: `ana`, `cojoc`, `aerisirea`. Comparăm textul cu inversul lui.

```cpp
#include <iostream>
#include <string>
using namespace std;

string inverseaza(string s) {
    string rezultat = "";
    for (int i = s.length() - 1; i >= 0; i--) {
        rezultat += s[i];
    }
    return rezultat;
}

bool estePalindrom(string s) {
    return s == inverseaza(s);
}

int main() {
    string cuvinte[5] = {"ana", "cojoc", "calculator", "rotor", "oradea"};

    for (int i = 0; i < 5; i++) {
        if (estePalindrom(cuvinte[i])) {
            cout << cuvinte[i] << " este palindrom" << endl;
        } else {
            cout << cuvinte[i] << " nu este palindrom" << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
ana este palindrom
cojoc este palindrom
calculator nu este palindrom
rotor este palindrom
oradea nu este palindrom
```

Ai folosit tot ce știi: funcții cu `return`, `string`, bucle și vectori de texte. Funcția `inverseaza` este mică și poate fi refolosită în alte programe.

---

## 5. Proiecte

### Exemplul 14 — Construim texte: `string(n, c)`, `empty()`, `push_back`

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string stele(8, '*');
    cout << stele << endl;

    string cuvant = "";
    if (cuvant.empty()) {
        cout << "Cuvantul este gol." << endl;
    }

    cuvant.push_back('H');
    cuvant.push_back('i');
    cout << cuvant << " (lungime " << cuvant.length() << ")" << endl;

    if (!cuvant.empty()) {
        cout << "Acum are continut." << endl;
    }

    cuvant.clear();
    cout << "Dupa clear, lungime " << cuvant.length() << endl;
    return 0;
}
```

**Ieșire:**
```
********
Cuvantul este gol.
Hi (lungime 2)
Acum are continut.
Dupa clear, lungime 0
```

- `string stele(8, '*')` creează un text cu 8 steluțe;
- `empty()` spune dacă textul e gol;
- `push_back(c)` adaugă un caracter la sfârșit;
- `clear()` golește textul.

### Exemplul 15 — Inițialele numelui

Citim numele complet și afișăm prima literă din fiecare cuvânt, cu o parcurgere simplă: o literă este inițială dacă este prima din text sau urmează după un spațiu.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nume;
    cout << "Numele complet: ";
    getline(cin, nume);

    int n = nume.length();

    cout << "Initiale: ";
    for (int i = 0; i < n; i++) {
        if (nume[i] != ' ' && (i == 0 || nume[i - 1] == ' ')) {
            cout << nume[i] << ".";
        }
    }
    cout << endl;
    return 0;
}
```

**Rulare** (tastezi `Ana Maria Popescu`):
```
Numele complet: Ana Maria Popescu
Initiale: A.M.P.
```

Condiția are două părți legate prin `&&`: caracterul curent nu e spațiu și (e primul din text sau cel dinaintea lui e spațiu). Ordinea contează: `i == 0` este verificat înaintea lui `nume[i - 1]`, ca să nu citim `nume[-1]`.

### Exemplul 16 — „Analizorul de nume” (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Analizorul de nume
   Scop:    citeste un nume si afiseaza informatii despre el
*/
#include <iostream>
#include <string>
using namespace std;

string inverseaza(string s) {
    string rezultat = "";
    for (int i = s.length() - 1; i >= 0; i--) {
        rezultat += s[i];
    }
    return rezultat;
}

bool estePalindrom(string s) {
    return s == inverseaza(s);
}

int numaraCuvinte(string s) {
    int cuvinte = 0;
    int n = s.length();
    for (int i = 0; i < n; i++) {
        if (s[i] != ' ' && (i == 0 || s[i - 1] == ' ')) {
            cuvinte++;
        }
    }
    return cuvinte;
}

void linie() {
    cout << "------------------------------" << endl;
}

int main() {
    string nume;
    cout << "Introdu numele complet: ";
    getline(cin, nume);

    if (nume.empty()) {
        cout << "Nu ai scris nimic." << endl;
        return 0;
    }

    linie();
    cout << "Nume:            " << nume << endl;
    cout << "Lungime:         " << nume.length() << " caractere" << endl;
    cout << "Cuvinte:         " << numaraCuvinte(nume) << endl;
    cout << "Prima litera:    " << nume[0] << endl;
    cout << "Ultima litera:   " << nume[nume.length() - 1] << endl;
    cout << "Invers:          " << inverseaza(nume) << endl;

    if (estePalindrom(nume)) {
        cout << "Palindrom:       da" << endl;
    } else {
        cout << "Palindrom:       nu" << endl;
    }
    linie();
    return 0;
}
```

**Rulare** (tastezi `Ana Maria Pop`):
```
Introdu numele complet: Ana Maria Pop
------------------------------
Nume:            Ana Maria Pop
Lungime:         13 caractere
Cuvinte:         3
Prima litera:    A
Ultima litera:   p
Invers:          poP airaM anA
Palindrom:       nu
------------------------------
```

Ai pus cap la cap: `getline`, funcții cu `return`, `string`, bucle și o verificare pentru textul gol.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Analizorul de nume” (obligatoriu)
Scrie programul din Exemplul 16. Adaugă: afișarea inițialelor (ca la Exemplul 15) și a numelui scris cu câte o literă pe rând.

### Exercițiul B — Cuvânt invers
Citește un cuvânt și afișează-l invers. Apoi spune dacă este palindrom, folosind funcții.

### Exercițiul C — Lipire
Citește prenumele și numele pe rânduri diferite (cu `cin >>`) și afișează `Nume, Prenume` (de exemplu `Popescu, Ana`).

### Exercițiul D — Bucăți
Citește un cuvânt de cel puțin 6 litere și afișează: primele 3 litere, ultimele 3 litere și litera din mijloc.

### Exercițiul E — Piramida de litere
Citește un cuvânt și afișează o piramidă formată din prefixele lui: pentru `cod` → `c`, `co`, `cod`. Folosește `substr`.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Folosești `length()`, `s[i]` și `getline` corect  
- [ ] Ai pus `cin.ignore()` când ai amestecat `cin >>` cu `getline`  
- [ ] Ai o funcție care returnează un `string` sau un `bool`  
- [ ] Ai verificat cazul „text gol”  
- [ ] Fișierul se numește `Prenume_Nume_M3L4.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Afișează un text cu fiecare literă dublată: `casa` → `ccaassaa`  
- [ ] Afișează textul pe verticală, ca un „zid de litere”  
- [ ] Verifică dacă o propoziție este palindrom ignorând spațiile (de exemplu `"ele fac cafele"`)  
- [ ] Citește mai multe cuvinte și afișează-l pe cel mai lung  
- [ ] Afișează un text cu literele în ordine inversă, dar cu cuvintele în ordinea inițială  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `getline` „sare” peste citire | A rămas Enter în memorie după `cin >>` | `cin.ignore();` înainte de `getline` |
| Se citește doar primul cuvânt | Ai folosit `cin >>` | `getline(cin, text);` |
| Eroare la `"Salut" + "lume"` | Nu poți lipi două texte scrise direct | Folosește un `string`: `string a = "Salut"; a + "lume"` |
| Ultima literă nu apare / program ciudat | `s[s.length()]` este în afara textului | Ultima literă: `s[s.length() - 1]` |
| `terminate called … out_of_range` | `substr` cu poziția mai mare decât lungimea | Verifică poziția înainte |
| `'a'` și `"a"` se încurcă | Ghilimele simple = un caracter; duble = text | Folosește tipul potrivit |
| `Ana` ≠ `ana` | Literele mari și mici sunt caractere diferite | Compară texte scrise la fel |
| Avertisment `comparison of integers of different signs` | `i < s.length()` compară `int` cu un tip fără semn | Salvează lungimea într-un `int`: `int n = s.length();` |

---

## Recapitulare pe scurt

- `string` necesită `#include <string>`. Un text se scrie între ghilimele duble.
- `s.length()` / `s.size()` = numărul de caractere (spațiul contează).
- `s[i]` = litera de pe poziția `i`; pozițiile încep de la `0`, ultima este `length() - 1`.
- Concatenare: `a + b`, `a += b`; măcar unul dintre operanzi trebuie să fie `string`.
- `cin >> s` citește un cuvânt; `getline(cin, s)` citește o linie; după `cin >>` pui `cin.ignore();`.
- Comparații: `==`, `!=`, `<`, `>`; literele mari și mici sunt diferite.
- `s.substr(poz, lung)` extrage o bucată; `s.empty()`, `s.clear()`, `s.push_back(c)`.
- Palindrom: textul este egal cu inversul lui.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie un program care citește o propoziție și afișează: lungimea, numărul de cuvinte, prima și ultima literă și propoziția scrisă invers.  
3. Scrie o funcție `string repeta(string s, int ori)` care lipește textul `s` de `ori` ori, și un program care o testează.  
4. Scrie un program care citește 5 cuvinte într-un vector de `string` și afișează toate palindroamele din el.  
5. **Bonus:** scrie un program care citește un cuvânt și îl afișează „în scară”: `c`, `co`, `cod`, `code`, apoi înapoi `cod`, `co`, `c`.  
6. Salvează tot ca `Tema_M3L4_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 5
Mergem mai adânc în text: **cum numărăm vocale, cum transformăm literele mici în mari, cum căutăm o bucată de text** și cum construim un mic program de statistici pe litere.
