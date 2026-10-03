# LECȚIA 5 — Tipuri de date: `double`, `char`, `bool`, `string`
**Modulul 1 · Bazele C++ · 2 ore**  
**Code Kids Play · Junior Coder**

> Azi afli că nu tot ce păstrezi în memorie este un număr întreg: există numere cu zecimale, litere, valori de adevăr și texte întregi.  
> Proiect: **„Cartea mea de identitate”** · fișier: `Prenume_Nume_L5.cpp` (ex. `Ana_Pop_L5.cpp`)

---

## Obiectiv
La finalul orei alegi tipul potrivit pentru fiecare informație, folosești `double`, `char`, `bool` și `string`, citești și afișezi valori de fiecare tip și eviți capcana împărțirii între numere întregi.  
**Minim:** un program care folosește cel puțin 4 tipuri diferite.  
**Ținta orei (Complet):** + citire de `double` și `string`, calcul cu zecimale și un `char` tratat ca număr (cod ASCII).

## De ce contează
Până acum, toate variabilele au fost `int`. Dar un preț poate fi `7,99` lei, o înălțime poate fi `1,52` m, un nume este text, iar răspunsul la întrebarea „ai terminat tema?” este doar „da” sau „nu”. Alegerea tipului potrivit face programul corect și ușor de înțeles.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | De ce nu ajunge `int`? Panorama tipurilor |
| 15–45 | `double`: numere cu zecimale (**Exemplele 1–6**) |
| 45–65 | `char` și codul ASCII (**Exemplele 7–9**) |
| 65–80 | `bool` (**Exemplul 10**) |
| 80–100 | `string` (**Exemplele 11–12**) |
| 100–118 | Proiecte mici (**Exemplele 13–16**) |
| 118–120 | Recap și temă |

---

## 1. Panorama tipurilor

| Tip | Ce păstrează | Exemple de valori | Se scrie în cod |
|-----|--------------|-------------------|-----------------|
| `int` | număr întreg | `-5`, `0`, `1250` | `int scor = 10;` |
| `double` | număr cu zecimale | `3.14`, `-0.5`, `7.0` | `double pret = 7.99;` |
| `char` | **un singur** caracter | `'A'`, `'7'`, `'?'` | `char litera = 'A';` |
| `bool` | adevărat sau fals | `true`, `false` | `bool terminat = true;` |
| `string` | text de oricâte caractere | `"Ana"`, `"Salut!"` | `string nume = "Ana";` |

Observă cum se scriu valorile:
- la `double`, **separatorul zecimal este punctul**, nu virgula: `3.14`, nu `3,14`;
- la `char`, caracterul stă între **apostrofuri** `' '`;
- la `string`, textul stă între **ghilimele** `" "`;
- `true` și `false` se scriu cu litere mici, fără ghilimele.

Pentru `string` avem nevoie de un `#include <string>` la început. La unele compilatoare merge și fără, dar îl scriem mereu ca să fim siguri.

---

## 2. `double`: numere cu zecimale

### Exemplul 1 — Declarare și afișare

```cpp
#include <iostream>
using namespace std;

int main() {
    double pret = 7.99;
    double inaltime = 1.52;
    double temperatura = -3.5;
    double rotund = 10.0;

    cout << "Pret: " << pret << " lei" << endl;
    cout << "Inaltime: " << inaltime << " m" << endl;
    cout << "Temperatura: " << temperatura << " grade" << endl;
    cout << "Numar rotund: " << rotund << endl;
    return 0;
}
```

**Ieșire:**
```
Pret: 7.99 lei
Inaltime: 1.52 m
Temperatura: -3.5 grade
Numar rotund: 10
```

Observă că `10.0` se afișează `10`. `cout` nu scrie zecimalele inutile.

### Exemplul 2 — Calcule cu `double`: reducere

```cpp
#include <iostream>
using namespace std;

int main() {
    double pret;

    cout << "Pretul initial (lei): ";
    cin >> pret;

    double reducere = pret * 0.2;
    double dePlata = pret - reducere;

    cout << "Reducere 20%: " << reducere << " lei" << endl;
    cout << "De plata: " << dePlata << " lei" << endl;
    return 0;
}
```

**Rulare** (tastezi `80`):
```
Pretul initial (lei): 80
Reducere 20%: 16 lei
De plata: 64 lei
```

Poți citi un `double` cu `cin` exact ca pe un `int`. Dacă tastezi `79.99`, programul îl înțelege. Folosește punctul, nu virgula.

### Exemplul 3 — Împărțirea cu `int` și cu `double`

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "7 / 2     = " << 7 / 2 << endl;
    cout << "7.0 / 2   = " << 7.0 / 2 << endl;
    cout << "7 / 2.0   = " << 7 / 2.0 << endl;
    cout << "1.0 / 3   = " << 1.0 / 3 << endl;
    cout << "10.0 / 4  = " << 10.0 / 4 << endl;
    return 0;
}
```

**Ieșire:**
```
7 / 2     = 3
7.0 / 2   = 3.5
7 / 2.0   = 3.5
1.0 / 3   = 0.333333
10.0 / 4  = 2.5
```

Regula: dacă **măcar unul** dintre numere este `double`, împărțirea păstrează zecimalele. Dacă ambele sunt `int`, rezultatul este întreg. Observă și că `cout` afișează implicit aproximativ **6 cifre** semnificative (`0.333333`).

### Exemplul 4 — Capcana: unde faci conversia

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 7, b = 2;

    double gresit = a / b;
    double corect = (double)a / b;
    double si_asa = a / 2.0;

    cout << "a / b             -> " << gresit << endl;
    cout << "(double)a / b     -> " << corect << endl;
    cout << "a / 2.0           -> " << si_asa << endl;
    return 0;
}
```

**Ieșire:**
```
a / b             -> 3
(double)a / b     -> 3.5
a / 2.0           -> 3.5
```

Prima variantă este o greșeală frecventă: variabila e `double`, dar împărțirea `a / b` se face **între doi `int`**, deci dă `3`, și abia apoi rezultatul este pus în `double`. Soluția: transformă unul dintre numere în `double` **înainte** de împărțire, cu `(double)a`. Se numește *conversie de tip* (în engleză, *cast*).

### Exemplul 5 — Media a 3 note, corect

```cpp
#include <iostream>
using namespace std;

int main() {
    int n1, n2, n3;
    cout << "Introdu 3 note: ";
    cin >> n1 >> n2 >> n3;

    double media = (n1 + n2 + n3) / 3.0;

    cout << "Media = " << media << endl;
    return 0;
}
```

**Rulare** (tastezi `7 8 8`):
```
Introdu 3 note: 7 8 8
Media = 7.66667
```

Aceasta este problema din L4 rezolvată corect. Împărțind la `3.0` (nu la `3`), zecimalele se păstrează.

### Exemplul 6 — Aria cercului

```cpp
#include <iostream>
using namespace std;

int main() {
    const double PI = 3.14159;
    double raza;

    cout << "Raza cercului: ";
    cin >> raza;

    double lungime = 2 * PI * raza;
    double arie = PI * raza * raza;

    cout << "Lungimea cercului: " << lungime << endl;
    cout << "Aria cercului: " << arie << endl;
    return 0;
}
```

**Rulare** (tastezi `5`):
```
Raza cercului: 5
Lungimea cercului: 31.4159
Aria cercului: 78.5397
```

Aici ai folosit `const` (din L3) pentru o valoare care nu se schimbă. Rezultatele sunt rotunjite la 6 cifre semnificative.

**Încearcă tu (10 min)**  
- [ ] Citești două numere cu zecimale și afișezi suma și media lor  
- [ ] Calculezi prețul pentru 3 kg de mere, dacă un kilogram costă 4.5 lei  
- [ ] Compari `10 / 4` cu `10 / 4.0` și explici pe foaie diferența  

---

## 3. `char`: un singur caracter

Un `char` ține **exact un caracter**: o literă, o cifră, un semn. Se scrie între **apostrofuri**.

### Exemplul 7 — Declarare, afișare și citire

```cpp
#include <iostream>
using namespace std;

int main() {
    char nota = 'A';
    char semn = '?';
    char initiala;

    cout << "Nota mea: " << nota << semn << endl;

    cout << "Prima litera din numele tau: ";
    cin >> initiala;

    cout << "Initiala ta este " << initiala << endl;
    return 0;
}
```

**Rulare** (tastezi `M`):
```
Nota mea: A?
Prima litera din numele tau: M
Initiala ta este M
```

`'A'` este un caracter, `"A"` este un text de lungime 1. În C++ sunt lucruri diferite, deci nu le amesteca. `cin >> initiala;` citește un singur caracter (primul pe care îl tastezi).

### Codul ASCII

Calculatorul nu înțelege litere, ci doar numere. De aceea fiecare caracter are un **cod numeric**, după un tabel numit **ASCII**. Câteva valori de reținut:

| Caractere | Coduri |
|-----------|--------|
| `'0'` … `'9'` | `48` … `57` |
| `'A'` … `'Z'` | `65` … `90` |
| `'a'` … `'z'` | `97` … `122` |
| spațiu `' '` | `32` |

Un `char` este de fapt un număr mic, iar `cout` decide să îl afișeze ca literă. Dacă vrei să vezi codul, îl privești ca `int`.

### Exemplul 8 — Din caracter în cod și invers

```cpp
#include <iostream>
using namespace std;

int main() {
    char c = 'A';
    cout << "Caracterul " << c << " are codul " << (int)c << endl;

    int cod = 98;
    cout << "Codul " << cod << " este caracterul " << (char)cod << endl;

    char cifra = '7';
    cout << "Caracterul cifra '7' are codul " << (int)cifra << endl;
    cout << "Cifra ca numar: " << cifra - '0' << endl;
    return 0;
}
```

**Ieșire:**
```
Caracterul A are codul 65
Codul 98 este caracterul b
Caracterul cifra '7' are codul 55
Cifra ca numar: 7
```

`(int)c` înseamnă „privește caracterul ca număr”, iar `(char)cod` „privește numărul ca literă”. Calculul `cifra - '0'` transformă caracterul `'7'` (cod 55) în numărul 7 (55 - 48).

### Exemplul 9 — Calcule cu litere

```cpp
#include <iostream>
using namespace std;

int main() {
    char litera = 'C';
    char urmatoarea = litera + 1;
    char precedenta = litera - 1;

    cout << "Litera: " << litera << endl;
    cout << "Urmatoarea: " << urmatoarea << endl;
    cout << "Precedenta: " << precedenta << endl;

    char mica = 'g';
    char mare = mica - 32;
    cout << "Majuscula lui " << mica << " este " << mare << endl;

    cout << "Distanta dintre 'a' si 'A' este " << 'a' - 'A' << endl;
    return 0;
}
```

**Ieșire:**
```
Litera: C
Urmatoarea: D
Precedenta: B
Majuscula lui g este G
Distanta dintre 'a' si 'A' este 32
```

Literile sunt în ordine alfabetică în tabel, deci `'C' + 1` este `'D'`. Iar fiecare literă mică are codul cu **32 mai mare** decât majuscula ei, de aceea `mica - 32` o transformă în majusculă.

---

## 4. `bool`: adevărat sau fals

Un `bool` poate avea **doar două valori**: `true` (adevărat) sau `false` (fals). Calculatorul le păstrează ca `1` și `0`, iar `cout` le afișează ca atare.

### Exemplul 10 — Valori de adevăr

```cpp
#include <iostream>
using namespace std;

int main() {
    bool esteElev = true;
    bool amTerminatTema = false;

    cout << "Sunt elev? " << esteElev << endl;
    cout << "Am terminat tema? " << amTerminatTema << endl;

    int varsta = 12;
    bool major = varsta >= 18;
    bool maiMareDeZece = varsta > 10;

    cout << "Sunt major? " << major << endl;
    cout << "Am peste 10 ani? " << maiMareDeZece << endl;

    cout << boolalpha;
    cout << "Cu cuvinte: " << esteElev << " si " << amTerminatTema << endl;
    return 0;
}
```

**Ieșire:**
```
Sunt elev? 1
Am terminat tema? 0
Sunt major? 0
Am peste 10 ani? 1
Cu cuvinte: true si false
```

O comparație ca `varsta >= 18` are ca rezultat un `bool`. Vom folosi asta intens în lecția următoare, la `if`. Instrucțiunea `cout << boolalpha;` face ca, de acum încolo, `bool`-urile să fie afișate ca `true` și `false`.

---

## 5. `string`: text

Un `string` ține un text întreg, cu orice număr de caractere. Se scrie între **ghilimele** și are nevoie de `#include <string>`.

### Exemplul 11 — Concatenare și lungime

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string prenume = "Ana";
    string nume = "Popescu";

    string complet = prenume + " " + nume;

    cout << "Nume complet: " << complet << endl;
    cout << "Lungime: " << complet.length() << " caractere" << endl;
    cout << "Prima litera: " << complet[0] << endl;
    cout << "A doua litera: " << complet[1] << endl;

    string salut = "Buna, ";
    salut = salut + prenume + "!";
    cout << salut << endl;
    return 0;
}
```

**Ieșire:**
```
Nume complet: Ana Popescu
Lungime: 11 caractere
Prima litera: A
A doua litera: n
Buna, Ana!
```

Ce ai nevoie să știi:
- cu `+` lipești două texte (se numește **concatenare**);
- `text.length()` îți spune câte caractere are (spațiul contează);
- `text[0]` este prima literă, `text[1]` a doua. **Numărătoarea începe de la 0.**

### Exemplul 12 — Citirea unui nume

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string prenume, nume;

    cout << "Prenumele tau: ";
    cin >> prenume;
    cout << "Numele tau: ";
    cin >> nume;

    cout << "Bun venit, " << prenume << " " << nume << "!" << endl;
    cout << "Initiale: " << prenume[0] << "." << nume[0] << "." << endl;
    cout << "Numele tau are " << nume.length() << " litere." << endl;
    return 0;
}
```

**Rulare** (tastezi `Ioana`, apoi `Marin`):
```
Prenumele tau: Ioana
Numele tau: Marin
Bun venit, Ioana Marin!
Initiale: I.M.
Numele tau are 5 litere.
```

> **Atenție:** `cin >> text;` citește **un singur cuvânt**: se oprește la primul spațiu. De aceea am citit prenumele și numele în două variabile. Pentru fraze întregi, cu spații, există altă metodă (`getline`), pe care o vei învăța mai târziu.

**Încearcă tu (10 min)**  
- [ ] Citești numele și prenumele și afișezi „Nume, Prenume” în ordine inversată  
- [ ] Afișezi prima și ultima literă a unui nume citit (ajută: `nume[nume.length() - 1]`)  
- [ ] Verifici ce se întâmplă dacă tastezi un nume cu spațiu, de exemplu `Ana Maria`  

---

## 6. Proiecte mici

### Exemplul 13 — Convertor Celsius → Fahrenheit

```cpp
#include <iostream>
using namespace std;

int main() {
    double celsius;

    cout << "Temperatura in grade Celsius: ";
    cin >> celsius;

    double fahrenheit = celsius * 9.0 / 5.0 + 32;

    cout << celsius << " C = " << fahrenheit << " F" << endl;
    return 0;
}
```

**Rulare** (tastezi `36.6`):
```
Temperatura in grade Celsius: 36.6
36.6 C = 97.88 F
```

Atenție la `9.0 / 5.0`: dacă ai scrie `9 / 5`, ar da `1` (împărțire între `int`) și formula ar fi greșită.

### Exemplul 14 — Cardul de prezentare cu tipuri mixte

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string nume = "Alex Ionescu";
    int varsta = 12;
    double inaltime = 1.55;
    char initiala = 'A';
    bool elev = true;

    cout << "===== CARD DE PREZENTARE =====" << endl;
    cout << "Nume:\t\t" << nume << endl;
    cout << "Varsta:\t\t" << varsta << " ani" << endl;
    cout << "Inaltime:\t" << inaltime << " m" << endl;
    cout << "Initiala:\t" << initiala << endl;
    cout << "Elev:\t\t" << elev << " (1 = da, 0 = nu)" << endl;
    cout << "==============================" << endl;
    return 0;
}
```

Fiecare informație are tipul potrivit: text pentru nume, `int` pentru vârstă, `double` pentru înălțime, `char` pentru inițială, `bool` pentru da/nu.

### Exemplul 15 — Afișare cu 2 zecimale: bon cu TVA

Pentru prețuri vrem mereu două zecimale. Avem nevoie de biblioteca `<iomanip>` și de două instrucțiuni de formatare.

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const double TVA = 0.19;
    double pret;

    cout << "Pret fara TVA (lei): ";
    cin >> pret;

    double valoareTva = pret * TVA;
    double total = pret + valoareTva;

    cout << fixed << setprecision(2);
    cout << "Pret:  " << pret << " lei" << endl;
    cout << "TVA:   " << valoareTva << " lei" << endl;
    cout << "Total: " << total << " lei" << endl;
    return 0;
}
```

**Rulare** (tastezi `49.9`):
```
Pret fara TVA (lei): 49.9
Pret:  49.90 lei
TVA:   9.48 lei
Total: 59.38 lei
```

`fixed` cere afișarea cu număr fix de zecimale, iar `setprecision(2)` stabilește că vrem 2. De aici înainte, toate numerele cu zecimale din program se afișează așa.

### Exemplul 16 — Convertor lei → euro, cu semnătură

```cpp
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    string nume;
    double lei, curs;

    cout << "Cum te cheama? ";
    cin >> nume;
    cout << "Suma in lei: ";
    cin >> lei;
    cout << "Cursul (cati lei costa 1 euro): ";
    cin >> curs;

    double euro = lei / curs;

    cout << fixed << setprecision(2);
    cout << endl;
    cout << nume << ", " << lei << " lei inseamna " << euro << " euro." << endl;
    cout << "Cu inca 10 lei ai avea " << (lei + 10) / curs << " euro." << endl;
    return 0;
}
```

**Rulare** (tastezi `Maria`, `250` și `4.97`):
```
Cum te cheama? Maria
Suma in lei: 250
Cursul (cati lei costa 1 euro): 4.97

Maria, 250.00 lei inseamna 50.30 euro.
Cu inca 10 lei ai avea 52.31 euro.
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Cartea mea de identitate” (obligatoriu)
Citește de la tastatură: prenumele (`string`), vârsta (`int`), înălțimea (`double`) și prima literă a școlii (`char`). Declară și un `bool` (de exemplu `esteElev`). Afișează totul într-un card, ca în Exemplul 14.

### Exercițiul B — Media notelor
Citește 4 note întregi și afișează media lor cu zecimale, corect (nu `int`).

### Exercițiul C — Cumpărături
Citește prețul pe kilogram (`double`) și numărul de kilograme (`double`) și afișează totalul cu 2 zecimale.

### Exercițiul D — Litere
Citește un caracter (literă mică) și afișează majuscula lui și litera următoare din alfabet.

### Exercițiul E — Mesaj personalizat
Citește un prenume și un an de naștere. Afișează: „Salut, NUME! Vei împlini ... ani în 2027.” (vârsta se calculează din an).

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Folosește minimum 4 tipuri diferite  
- [ ] Citește un `double` (preț, înălțime etc.)  
- [ ] Afișează un `string` (nume)  
- [ ] Afișează un `bool` (cu 0/1 sau `true`/`false`)  
- [ ] Fișierul se numește `Prenume_Nume_L5.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Citește 3 note și calculează media cu 2 zecimale  
- [ ] Afișează codul ASCII al unui caracter citit de la tastatură  
- [ ] Concatenează 2 `string`-uri și afișează lungimea rezultatului  
- [ ] Transformă un număr de grade Fahrenheit în Celsius (`(F - 32) * 5 / 9`)  
- [ ] Citește o cifră ca `char` (de exemplu `'7'`) și afișează dublul ei ca număr  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `3,14` nu merge | Separatorul zecimal este punctul | `3.14` |
| `double x = 7 / 2;` dă `3` | Împărțirea se face între `int` | `7 / 2.0` sau `(double)7 / 2` |
| `char c = "A";` | Ghilimele în loc de apostrofuri | `char c = 'A';` |
| `string s = 'Ana';` | Apostrofuri în loc de ghilimele | `string s = "Ana";` |
| `char c = 'Ana';` | `char` ține un singur caracter | Folosește `string` |
| `'string' was not declared` | Ai uitat `#include <string>` sau ai scris `String` | `string` cu literă mică |
| `cin >> nume;` citește doar primul cuvânt | `cin` se oprește la spațiu | Citește cuvintele în variabile separate |
| `bool b = adevarat;` | Valorile sunt în engleză, cu litere mici | `true` / `false` |
| `s[10]` pe un text mai scurt | Ai ieșit din text | Indicii merg de la `0` la `s.length() - 1` |
| Prea multe zecimale sau prea puține | Afișarea implicită are 6 cifre | `cout << fixed << setprecision(2);` cu `<iomanip>` |

---

## Recapitulare pe scurt

- `int` = întreg · `double` = zecimale (cu punct) · `char` = un caracter între `' '` · `bool` = `true`/`false` · `string` = text între `" "`.
- Împărțirea a două `int` dă tot `int`. Dacă vrei zecimale, măcar unul dintre numere trebuie să fie `double`.
- `(double)a` și `(int)c` schimbă tipul unei valori pentru un calcul.
- Fiecare caracter are un cod ASCII: `'A'` = 65, `'a'` = 97, `'0'` = 48.
- Cu `+` lipești `string`-uri, `.length()` dă lungimea, iar `s[0]` este prima literă.
- `cin >> text;` citește un singur cuvânt.
- `fixed` și `setprecision(2)` (din `<iomanip>`) afișează numerele cu 2 zecimale.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie un program care citește prețul unui produs (`double`), cantitatea (`int`) și afișează totalul cu 2 zecimale.  
3. Scrie un program care citește numele tău și afișează fiecare literă din el pe câte un rând, folosind `nume[0]`, `nume[1]`… (pentru un nume de 5 litere).  
4. Convertește o distanță din kilometri în mile (1 km = 0.621371 mile), citind kilometrii ca `double`.  
5. **Bonus:** scrie un program care citește o literă mare și afișează litera mică și codul ei ASCII.  
6. Pe foaie: ce tip alegi pentru vârstă, preț, inițială, „e elev?” și numele clasei? Explică alegerea.  
7. Salvează tot ca `Tema_L5_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 6
Învățăm să **luăm decizii**: operatorii de comparare (`<`, `>`, `==`…) și instrucțiunea `if`. Programele tale vor reacționa diferit în funcție de datele introduse.
