# LECȚIA 4 — `cin` și operații aritmetice
**Modulul 1 · Bazele C++ · 2 ore**  
**Code Maker Club · Junior Coder**

> Azi programul tău **ascultă**: citește numere de la tastatură, calculează cu ele (inclusiv împărțire și rest) și afișează rezultatul.  
> Proiect: **„Calculatorul meu”** · fișier: `Prenume_Nume_L4.cpp` (ex. `Ana_Pop_L4.cpp`)

---

## Obiectiv
La finalul orei citești valori cu `cin`, folosești toți cei cinci operatori aritmetici (`+ - * / %`), știi ce se întâmplă când împarți două numere întregi și rezolvi probleme mici: cifrele unui număr, conversii de timp, medii și rest.  
**Minim:** un program care citește două numere și afișează suma și produsul.  
**Ținta orei (Complet):** + cât și rest, mesaje clare pentru utilizator și test cu cel puțin două seturi de numere.

## De ce contează
Până acum, valorile erau scrise în cod, iar la fiecare schimbare trebuia să recompilezi programul. De azi, programul primește datele **de la utilizator** și poate rezolva aceeași problemă pentru orice numere. Așa funcționează și problemele de pe platformele de olimpiadă: programul citește datele și calculează răspunsul.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Recapitulare L3 și ce înseamnă „intrare” de la tastatură |
| 15–40 | `cin` pentru una, două sau mai multe valori (**Exemplele 1–4**) |
| 40–65 | Împărțirea între numere întregi și restul (`/` și `%`) (**Exemplele 5–7**) |
| 65–95 | Probleme: cifre, ore și minute, medii, bani (**Exemplele 8–14**) |
| 95–115 | Proiect: calculatorul complet (**Exemplele 15–16**) |
| 115–120 | Recap și temă |

---

## 1. `cin`: citim de la tastatură

În L1 am spus că datele circulă ca un flux. Pentru afișare folosim `cout <<` (spre ecran). Pentru citire folosim **`cin >>`** (de la tastatură spre variabilă).

```
cin >> nume_variabila;
```

Săgețile arată direcția datelor: la `cout` merg **spre** ecran (`<<`), la `cin` vin **dinspre** tastatură (`>>`).

### Exemplul 1 — Citesc un număr

```cpp
#include <iostream>
using namespace std;

int main() {
    int varsta;

    cout << "Introdu varsta: ";
    cin >> varsta;

    cout << "Ai " << varsta << " ani." << endl;
    cout << "Anul viitor vei avea " << varsta + 1 << " ani." << endl;
    return 0;
}
```

**Rulare** (ce tastezi tu este după `:`, urmat de Enter):
```
Introdu varsta: 12
Ai 12 ani.
Anul viitor vei avea 13 ani.
```

Ce se întâmplă pas cu pas:
1. `cout << "Introdu varsta: ";` afișează mesajul (se numește *prompt*) și lasă cursorul pe același rând.
2. `cin >> varsta;` face programul să **aștepte**. Tu tastezi numărul și apeși Enter.
3. Valoarea ajunge în variabila `varsta` și poți calcula cu ea.

**Regulă bună:** înainte de fiecare `cin`, afișează un mesaj care spune ce trebuie introdus. Altfel, utilizatorul vede un ecran gol și nu știe ce se așteaptă de la el.

### Exemplul 2 — Două numere, citite pe rând

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;

    cout << "Introdu primul numar: ";
    cin >> a;
    cout << "Introdu al doilea numar: ";
    cin >> b;

    cout << "Suma = " << a + b << endl;
    return 0;
}
```

**Rulare:**
```
Introdu primul numar: 5
Introdu al doilea numar: 3
Suma = 8
```

### Exemplul 3 — Mai multe numere cu un singur `cin`

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b, c;

    cout << "Introdu 3 numere, separate prin spatiu: ";
    cin >> a >> b >> c;

    cout << "Suma = " << a + b + c << endl;
    cout << "Produsul = " << a * b * c << endl;
    return 0;
}
```

**Rulare:**
```
Introdu 3 numere, separate prin spatiu: 4 9 6
Suma = 19
Produsul = 216
```

`cin >> a >> b >> c;` citește trei valori una după alta. Utilizatorul le poate scrie despărțite prin **spațiu** sau prin **Enter**, rezultatul este același.

> **Atenție:** dacă tastezi o literă în loc de număr (de exemplu `abc`), `cin` nu reușește să citească și programul se comportă ciudat. Deocamdată presupunem că utilizatorul introduce doar numere corecte.

### Exemplul 4 — Cele trei operații cunoscute, cu date citite

```cpp
#include <iostream>
using namespace std;

int main() {
    int x, y;

    cout << "x = ";
    cin >> x;
    cout << "y = ";
    cin >> y;

    cout << x << " + " << y << " = " << x + y << endl;
    cout << x << " - " << y << " = " << x - y << endl;
    cout << x << " * " << y << " = " << x * y << endl;
    return 0;
}
```

**Rulare:**
```
x = 12
y = 5
12 + 5 = 17
12 - 5 = 7
12 * 5 = 60
```

Programul rămâne același, iar tu îl poți testa cu orice numere: `-4` și `10`, `0` și `0` sau `100` și `3`.

**Încearcă tu (10 min)**  
- [ ] Scrii un program care citește anul nașterii și afișează vârsta ta în 2026  
- [ ] Citești 2 numere și afișezi suma, diferența și produsul  
- [ ] Rulezi programul cu 3 perechi diferite de numere, inclusiv unul negativ  

---

## 2. Împărțirea și restul

La numere întregi (`int`), împărțirea cu **`/`** dă **câtul**: partea întreagă a rezultatului, **fără zecimale**. Operatorul **`%`** (se citește „modulo”) dă **restul** împărțirii.

| Expresie | Rezultat | Explicație |
|----------|----------|------------|
| `17 / 5` | `3` | 5 încape de 3 ori în 17 |
| `17 % 5` | `2` | 17 = 5 · 3 + **2** |
| `20 / 4` | `5` | |
| `20 % 4` | `0` | se împarte exact |
| `3 / 4` | `0` | 4 nu încape niciodată în 3 |
| `3 % 4` | `3` | |

Legătura dintre ele: **deîmpărțit = împărțitor · cât + rest**.

### Exemplul 5 — Cât și rest

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;

    cout << "Deimpartit: ";
    cin >> a;
    cout << "Impartitor: ";
    cin >> b;

    cout << "Catul este " << a / b << endl;
    cout << "Restul este " << a % b << endl;
    cout << a << " = " << b << " * " << a / b << " + " << a % b << endl;
    return 0;
}
```

**Rulare:**
```
Deimpartit: 17
Impartitor: 5
Catul este 3
Restul este 2
17 = 5 * 3 + 2
```

> **Împărțirea la zero este interzisă.** Dacă introduci `0` ca împărțitor, programul se oprește cu o eroare. Mai târziu vom învăța cum să verificăm asta înainte de împărțire.

### Exemplul 6 — Capcana: nu apar zecimale

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "7 / 2 = " << 7 / 2 << endl;
    cout << "1 / 2 = " << 1 / 2 << endl;
    cout << "9 / 10 = " << 9 / 10 << endl;
    cout << "100 / 3 = " << 100 / 3 << endl;
    return 0;
}
```

**Ieșire:**
```
7 / 2 = 3
1 / 2 = 0
9 / 10 = 0
100 / 3 = 33
```

La matematică, `7 / 2` este `3,5`. În C++, între două numere `int`, rezultatul este doar `3`. Partea zecimală se **pierde**. Despre numerele cu zecimale învățăm în lecția 5.

### Exemplul 7 — Ordinea operațiilor

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "2 + 3 * 4 = " << 2 + 3 * 4 << endl;
    cout << "(2 + 3) * 4 = " << (2 + 3) * 4 << endl;
    cout << "10 - 4 - 3 = " << 10 - 4 - 3 << endl;
    cout << "20 / 4 / 2 = " << 20 / 4 / 2 << endl;
    cout << "7 + 8 % 3 = " << 7 + 8 % 3 << endl;
    cout << "(7 + 8) % 3 = " << (7 + 8) % 3 << endl;
    return 0;
}
```

**Ieșire:**
```
2 + 3 * 4 = 14
(2 + 3) * 4 = 20
10 - 4 - 3 = 3
20 / 4 / 2 = 2
7 + 8 % 3 = 9
(7 + 8) % 3 = 0
```

Reguli de reținut:
1. Mai întâi paranteze `( )`.
2. Apoi `*`, `/` și `%` (de la stânga la dreapta).
3. Apoi `+` și `-` (de la stânga la dreapta).

Când nu ești sigur, pune paranteze. Ele nu strică niciodată.

**Încearcă tu (10 min)**  
- [ ] Citești două numere și afișezi cât și rest, în forma `a = b * cat + rest`  
- [ ] Verifici pe foaie că `29 / 6` și `29 % 6` sunt corecte  
- [ ] Prevezi ce afișează `5 + 6 * 2 - 8 / 4`, apoi verifici în program  

---

## 3. Probleme rezolvate cu `/` și `%`

Cu `/` și `%` se rezolvă multe probleme clasice. Încearcă să ghicești soluția înainte de a citi codul.

### Exemplul 8 — Ultima cifră și numărul fără ultima cifră

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Introdu un numar: ";
    cin >> n;

    cout << "Ultima cifra: " << n % 10 << endl;
    cout << "Fara ultima cifra: " << n / 10 << endl;
    return 0;
}
```

**Rulare:**
```
Introdu un numar: 4567
Ultima cifra: 7
Fara ultima cifra: 456
```

`n % 10` dă mereu **ultima cifră**, iar `n / 10` „taie” ultima cifră. Această pereche este baza multor probleme de olimpiadă.

### Exemplul 9 — Cifrele unui număr de 3 cifre

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Introdu un numar de 3 cifre: ";
    cin >> n;

    int unitati = n % 10;
    int zeci = n / 10 % 10;
    int sute = n / 100;

    cout << "Sute: " << sute << endl;
    cout << "Zeci: " << zeci << endl;
    cout << "Unitati: " << unitati << endl;
    cout << "Suma cifrelor: " << sute + zeci + unitati << endl;
    return 0;
}
```

**Rulare:**
```
Introdu un numar de 3 cifre: 824
Sute: 8
Zeci: 2
Unitati: 4
Suma cifrelor: 14
```

Cum funcționează `n / 10 % 10`: mai întâi `824 / 10 = 82`, apoi `82 % 10 = 2`. Cifra zecilor este ultima cifră a numărului fără ultima cifră.

### Exemplul 10 — Minute în ore și minute

```cpp
#include <iostream>
using namespace std;

int main() {
    int minute;
    cout << "Cate minute dureaza filmul? ";
    cin >> minute;

    int ore = minute / 60;
    int rest = minute % 60;

    cout << minute << " minute = " << ore << " ore si " << rest << " minute" << endl;
    return 0;
}
```

**Rulare:**
```
Cate minute dureaza filmul? 135
135 minute = 2 ore si 15 minute
```

### Exemplul 11 — Secunde în ore, minute, secunde

```cpp
#include <iostream>
using namespace std;

int main() {
    int total;
    cout << "Numar de secunde: ";
    cin >> total;

    int ore = total / 3600;
    int minute = total % 3600 / 60;
    int secunde = total % 60;

    cout << ore << " h  " << minute << " min  " << secunde << " s" << endl;
    return 0;
}
```

**Rulare:**
```
Numar de secunde: 7384
2 h  3 min  4 s
```

Verificare: 2 · 3600 + 3 · 60 + 4 = 7200 + 180 + 4 = 7384. Calculul `total % 3600 / 60` se face de la stânga la dreapta: mai întâi restul după ore, apoi împărțit la 60.

### Exemplul 12 — Ora de peste N ore

```cpp
#include <iostream>
using namespace std;

int main() {
    int ora, n;
    cout << "Ora acum (0-23): ";
    cin >> ora;
    cout << "Peste cate ore? ";
    cin >> n;

    int ora_noua = (ora + n) % 24;

    cout << "Peste " << n << " ore va fi ora " << ora_noua << endl;
    return 0;
}
```

**Rulare:**
```
Ora acum (0-23): 20
Peste cate ore? 9
Peste 9 ore va fi ora 5
```

Restul la 24 „învârte” ceasul: după ora 23 urmează ora 0. Același truc merge pentru zilele săptămânii (restul la 7) sau pentru culorile care se repetă (restul la numărul de culori).

### Exemplul 13 — Media a 3 note (cu o limitare)

```cpp
#include <iostream>
using namespace std;

int main() {
    int n1, n2, n3;
    cout << "Introdu 3 note: ";
    cin >> n1 >> n2 >> n3;

    int suma = n1 + n2 + n3;
    int media = suma / 3;
    int rest = suma % 3;

    cout << "Suma = " << suma << endl;
    cout << "Media (intreaga) = " << media << endl;
    cout << "Restul impartirii la 3 = " << rest << endl;
    return 0;
}
```

**Rulare:**
```
Introdu 3 note: 7 8 8
Suma = 23
Media (intreaga) = 7
Restul impartirii la 3 = 2
```

Media reală este 7,66…, dar `int` păstrează doar partea întreagă. Limitarea dispare când învățăm `double`, în lecția 5.

### Exemplul 14 — Casierul: câte bancnote?

```cpp
#include <iostream>
using namespace std;

int main() {
    int suma;
    cout << "Suma de platit (lei): ";
    cin >> suma;

    int b50 = suma / 50;
    suma = suma % 50;

    int b10 = suma / 10;
    suma = suma % 10;

    int b5 = suma / 5;
    suma = suma % 5;

    cout << "Bancnote de 50: " << b50 << endl;
    cout << "Bancnote de 10: " << b10 << endl;
    cout << "Bancnote de 5: " << b5 << endl;
    cout << "Monede de 1: " << suma << endl;
    return 0;
}
```

**Rulare:**
```
Suma de platit (lei): 187
Bancnote de 50: 3
Bancnote de 10: 3
Bancnote de 5: 1
Monede de 1: 2
```

Verificare: 3 · 50 + 3 · 10 + 1 · 5 + 2 = 150 + 30 + 5 + 2 = 187. După fiecare pas, `suma` păstrează restul rămas de plătit, iar în final rămân monedele de câte 1 leu.

**Încearcă tu (15 min)**  
- [ ] Afișezi suma cifrelor unui număr de 3 cifre, citit de la tastatură  
- [ ] Transformi un număr de zile în săptămâni și zile rămase  
- [ ] Verifici dacă un număr e par, afișând `n % 2` (`0` înseamnă par, `1` înseamnă impar)  

---

## 4. Proiecte mici

### Exemplul 15 — Calculatorul complet

```cpp
/*
   Program: Calculator cu doua numere
   Scop:    citeste a si b si afiseaza toate operatiile
*/
#include <iostream>
using namespace std;

int main() {
    int a, b;

    cout << "===== CALCULATOR =====" << endl;
    cout << "Primul numar: ";
    cin >> a;
    cout << "Al doilea numar (nenul): ";
    cin >> b;

    cout << endl;
    cout << a << " + " << b << " = " << a + b << endl;
    cout << a << " - " << b << " = " << a - b << endl;
    cout << a << " * " << b << " = " << a * b << endl;
    cout << a << " / " << b << " = " << a / b << " (cat)" << endl;
    cout << a << " % " << b << " = " << a % b << " (rest)" << endl;
    cout << "======================" << endl;
    return 0;
}
```

**Rulare:**
```
===== CALCULATOR =====
Primul numar: 47
Al doilea numar (nenul): 6

47 + 6 = 53
47 - 6 = 41
47 * 6 = 282
47 / 6 = 7 (cat)
47 % 6 = 5 (rest)
======================
```

### Exemplul 16 — Interschimbare cu date citite

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;

    cout << "a = ";
    cin >> a;
    cout << "b = ";
    cin >> b;

    int ajutor = a;
    a = b;
    b = ajutor;

    cout << "Dupa interschimbare:" << endl;
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    return 0;
}
```

**Rulare:**
```
a = 8
b = 15
Dupa interschimbare:
a = 15
b = 8
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Calculatorul meu” (obligatoriu)
Citește două numere întregi și afișează suma, diferența, produsul, câtul și restul, fiecare cu un mesaj clar.

### Exercițiul B — Perimetrul dreptunghiului
Citește lungimea și lățimea unui dreptunghi. Afișează perimetrul și aria.

### Exercițiul C — Zile în săptămâni
Citește un număr de zile și afișează câte săptămâni complete și câte zile rămân. (Exemplu: `23` zile înseamnă `3` săptămâni și `2` zile.)

### Exercițiul D — Ultima și penultima cifră
Citește un număr natural cu cel puțin 2 cifre și afișează ultima și penultima lui cifră.

### Exercițiul E — Bani de buzunar
Citești suma de bani pe care o ai și prețul unui covrig. Afișează câți covrigi poți cumpăra și câți lei îți rămân.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Citește minimum două numere cu `cin`  
- [ ] Afișează suma și produsul  
- [ ] Afișează câtul și restul  
- [ ] Fiecare `cin` are înainte un mesaj clar („Introdu a: ”)  
- [ ] Ai testat cu minimum 2 seturi de numere diferite  
- [ ] Fișierul se numește `Prenume_Nume_L4.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Media a 3 note (pe `int`) și observă ce se pierde după virgulă  
- [ ] Calculează ultima cifră a **produsului** a două numere citite, fără să înmulțești tot numărul (ajută: `(a % 10) * (b % 10) % 10`)  
- [ ] Citește un număr de 4 cifre și afișează-l cu cifrele **în ordine inversă** (de exemplu `1234` devine `4321`)  
- [ ] Citește vârsta în ani și afișează câte luni, câte zile și câte ore are (aproximativ, cu un an de 365 de zile)  
- [ ] Calculează ce zi a săptămânii va fi peste `n` zile, dacă azi este ziua cu numărul `z` (între 1 și 7)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Programul „stă” și nu face nimic | Așteaptă un număr la `cin` | Tastează numărul și apasă Enter |
| Nu știi ce să introduci | Lipsește mesajul înainte de `cin` | Afișează un mesaj cu `cout` |
| `cin << a;` sau `cout >> a;` | Săgețile sunt inversate | `cin >> a;` și `cout << a;` |
| Valori ciudate la afișare | Ai uitat să citești variabila | Adaugă `cin >> variabila;` |
| Ai scris `cin >> "a";` | Numele variabilei nu e între ghilimele | `cin >> a;` |
| Rezultatul `7 / 2` este `3` | Împărțirea între `int` taie zecimalele | Normal pentru `int`. Pentru zecimale, vezi L5 |
| Programul se oprește cu o eroare la `a / b` | `b` este `0` | Testează cu `b` nenul |
| `a % b` nu merge pentru zecimale | `%` funcționează doar cu numere întregi | Folosește `int` |
| Rezultat greșit la `a + b / 2` | Împărțirea se face înainte de adunare | Folosește paranteze: `(a + b) / 2` |
| Programul se strică după ce tastezi o literă | `cin` așteaptă un număr | Introdu doar numere întregi |

---

## Recapitulare pe scurt

- `cin >> x;` citește o valoare de la tastatură în variabila `x`.
- Înaintea fiecărui `cin` afișezi un mesaj, ca utilizatorul să știe ce introduce.
- `cin >> a >> b >> c;` citește mai multe valori deodată.
- La `int`: `/` dă câtul (fără zecimale), iar `%` dă restul.
- `n % 10` este ultima cifră, iar `n / 10` este numărul fără ultima cifră.
- Ordinea operațiilor: paranteze, apoi `* / %`, apoi `+ -`.
- Nu se împarte niciodată la zero.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău și testează fiecare cu cel puțin două seturi de date.  
2. Scrie un program care citește un număr de secunde și îl afișează în forma `minute:secunde` (de exemplu, `135` secunde devine `2 min 15 s`).  
3. Scrie un program care citește prețul unui bilet și numărul de persoane și afișează totalul și cât rămâne dintr-o bancnotă de 200 de lei.  
4. Scrie un program care citește un număr de 3 cifre și afișează suma și produsul cifrelor lui.  
5. **Bonus:** program care citește un număr de 2 cifre și îl afișează cu cifrele inversate (`47` devine `74`).  
6. Salvează tot ca `Tema_L4_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 5
Descoperim celelalte **tipuri de date**: `double` pentru numere cu zecimale, `char` pentru litere, `bool` pentru adevărat/fals și `string` pentru text. În sfârșit vom putea citi un nume și face o medie corectă.
