# LECȚIA 8 — Operatori logici: `&&`, `||`, `!`
**Modulul 1 · Bazele C++ · 2 ore**  
**Code Maker Club · Junior Coder**

> Azi înveți să combini mai multe condiții într-una singură: „și”, „sau”, „nu”. Așa verifici intervale, reguli de acces și parole.  
> Proiect: **„Poarta jocului”** · fișier: `Prenume_Nume_L8.cpp` (ex. `Ana_Pop_L8.cpp`)

---

## Obiectiv
La finalul orei folosești `&&` (și), `||` (sau) și `!` (nu), verifici dacă o valoare se află într-un interval, scrii condiții cu paranteze și citești o condiție în română înainte să o scrii în cod.  
**Minim:** un program cu o condiție `&&` și una cu `||` (sau `!`), testat pe 3 cazuri.  
**Ținta orei (Complet):** + o condiție compusă cu paranteze și tabelul de adevăr al unui operator desenat pe foaie.

## De ce contează
Regulile din viața reală rareori au o singură condiție. „Poți urca în roller coaster dacă ai cel puțin 120 cm **și** ai cel puțin 8 ani.” „Școala e închisă sâmbăta **sau** duminica.” „Parola e corectă **și** utilizatorul există.” Operatorii logici sunt cleiul care leagă condițiile simple în reguli complete.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Recapitulare L7 și de ce avem nevoie de condiții combinate |
| 15–40 | `&&`, `||`, `!` și tabelele de adevăr (**Exemplele 1–4**) |
| 40–65 | Intervale și valori în afara intervalului (**Exemplele 5–8**) |
| 65–80 | Paranteze și ordinea operatorilor (**Exemplul 9**) |
| 80–115 | Probleme și proiecte (**Exemplele 10–16**) |
| 115–120 | Recap și temă |

---

## 1. Cei trei operatori

| Operator | Se citește | Rezultatul este adevărat când… |
|----------|------------|--------------------------------|
| `A && B` | A **și** B | **amândouă** sunt adevărate |
| `A \|\| B` | A **sau** B | **cel puțin una** este adevărată |
| `!A` | **nu** A | A este falsă (inversează) |

`||` se scrie cu două bare verticale. Locul barei verticale pe tastatură diferă de la un calculator la altul, așa că **găsește-o înainte să începi** și cere ajutor dacă nu o vezi.

### Tabelele de adevăr

**`&&` (și)** — adevărat doar dacă ambele sunt adevărate:

| A | B | `A && B` |
|---|---|----------|
| fals | fals | fals |
| fals | adevărat | fals |
| adevărat | fals | fals |
| adevărat | adevărat | **adevărat** |

**`||` (sau)** — fals doar dacă ambele sunt false:

| A | B | `A \|\| B` |
|---|---|-----------|
| fals | fals | **fals** |
| fals | adevărat | adevărat |
| adevărat | fals | adevărat |
| adevărat | adevărat | adevărat |

**`!` (nu)** inversează: `!adevărat` este fals, `!fals` este adevărat.

### Exemplul 1 — Tabelele, calculate de program

```cpp
#include <iostream>
using namespace std;

int main() {
    bool t = true;
    bool f = false;

    cout << "SI (&&)" << endl;
    cout << "f && f = " << (f && f) << endl;
    cout << "f && t = " << (f && t) << endl;
    cout << "t && f = " << (t && f) << endl;
    cout << "t && t = " << (t && t) << endl;

    cout << endl << "SAU (||)" << endl;
    cout << "f || f = " << (f || f) << endl;
    cout << "f || t = " << (f || t) << endl;
    cout << "t || f = " << (t || f) << endl;
    cout << "t || t = " << (t || t) << endl;

    cout << endl << "NU (!)" << endl;
    cout << "!t = " << (!t) << endl;
    cout << "!f = " << (!f) << endl;
    return 0;
}
```

**Ieșire:**
```
SI (&&)
f && f = 0
f && t = 0
t && f = 0
t && t = 1

SAU (||)
f || f = 0
f || t = 1
t || f = 1
t || t = 1

NU (!)
!t = 0
!f = 1
```

*(Rezultatul `1` înseamnă adevărat, `0` înseamnă fals, ca în lecțiile anterioare.)*

---

## 2. Operatorii în acțiune

### Exemplul 2 — `&&`: ambele condiții trebuie îndeplinite

```cpp
#include <iostream>
using namespace std;

int main() {
    int inaltime, varsta;

    cout << "Inaltimea ta (cm): ";
    cin >> inaltime;
    cout << "Varsta ta: ";
    cin >> varsta;

    if (inaltime >= 120 && varsta >= 8) {
        cout << "Poti urca in roller coaster!" << endl;
    } else {
        cout << "Din pacate, nu indeplinesti conditiile." << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `130` și `9`):
```
Inaltimea ta (cm): 130
Varsta ta: 9
Poti urca in roller coaster!
```

**Rulare 2** (tastezi `130` și `7`):
```
Inaltimea ta (cm): 130
Varsta ta: 7
Din pacate, nu indeplinesti conditiile.
```

Condiția în cuvinte: „înălțimea este cel puțin 120 **și** vârsta este cel puțin 8”. Dacă măcar una este falsă, tot ce este între paranteze devine fals.

### Exemplul 3 — `||`: este suficient să fie adevărată una

```cpp
#include <iostream>
using namespace std;

int main() {
    int zi;

    cout << "Ziua saptamanii (1 = luni ... 7 = duminica): ";
    cin >> zi;

    if (zi == 6 || zi == 7) {
        cout << "Weekend! Nu ai scoala." << endl;
    } else {
        cout << "Zi de scoala." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `7`):
```
Ziua saptamanii (1 = luni ... 7 = duminica): 7
Weekend! Nu ai scoala.
```

**Atenție la o greșeală foarte frecventă:** nu se scrie `zi == 6 || 7`. Fiecare parte a lui `||` trebuie să fie o **condiție completă**: `zi == 6 || zi == 7`.

### Exemplul 4 — `!`: răstoarnă o condiție

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Introdu un numar: ";
    cin >> n;

    if (!(n > 10)) {
        cout << n << " NU este mai mare ca 10." << endl;
    } else {
        cout << n << " este mai mare ca 10." << endl;
    }

    bool esteImpar = !(n % 2 == 0);
    cout << "Impar? " << esteImpar << endl;
    return 0;
}
```

**Rulare** (tastezi `7`):
```
Introdu un numar: 7
7 NU este mai mare ca 10.
Impar? 1
```

Atenție la paranteze: `!(n > 10)` neagă toată comparația. Dacă ai scrie `!n > 10`, ai nega mai întâi pe `n`, ceea ce nu are sens aici. De obicei e mai simplu să scrii direct `n <= 10`, dar `!` este util pe valori `bool` (`if (!major)`).

**Încearcă tu (10 min)**  
- [ ] Desenezi pe foaie tabelul de adevăr pentru `&&` și `||`, fără să te uiți în lecție  
- [ ] Verifici dacă un număr citit este cuprins între 20 și 50  
- [ ] Verifici dacă o literă citită este `'a'` sau `'A'`  

---

## 3. Intervale

Pentru a verifica dacă `x` se află între două valori, nu poți scrie `1 <= x <= 10` (în C++ nu funcționează așa). Se scriu **două comparații legate cu `&&`**:

```
x >= 1 && x <= 10        // x este in intervalul [1, 10]
```

Iar pentru valori **în afara** intervalului se folosește `||`:

```
x < 1 || x > 10          // x este in afara intervalului
```

### Exemplul 5 — Număr în intervalul 1–100

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Introdu un numar: ";
    cin >> n;

    if (n >= 1 && n <= 100) {
        cout << n << " se afla in intervalul [1, 100]." << endl;
    } else {
        cout << n << " este in afara intervalului." << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `100`):
```
Introdu un numar: 100
100 se afla in intervalul [1, 100].
```

**Rulare 2** (tastezi `0`):
```
Introdu un numar: 0
0 este in afara intervalului.
```

Testează mereu **valorile de la graniță** (`1`, `100`, `0`, `101`). Acolo se ascund cele mai multe greșeli de tip `<` în loc de `<=`.

### Exemplul 6 — Valori în afara intervalului

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota;

    cout << "Nota (1-10): ";
    cin >> nota;

    if (nota < 1 || nota > 10) {
        cout << "Nota invalida!" << endl;
    } else {
        cout << "Nota valida: " << nota << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `12`):
```
Nota (1-10): 12
Nota invalida!
```

Compară cu Exemplul 11 din L7: același rezultat, dar într-un singur pas.

### Exemplul 7 — Ce fel de caracter este?

```cpp
#include <iostream>
using namespace std;

int main() {
    char c;

    cout << "Introdu un caracter: ";
    cin >> c;

    if (c >= '0' && c <= '9') {
        cout << "Este o cifra." << endl;
    } else if (c >= 'a' && c <= 'z') {
        cout << "Este o litera mica." << endl;
    } else if (c >= 'A' && c <= 'Z') {
        cout << "Este o litera mare." << endl;
    } else {
        cout << "Este alt simbol." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `G`):
```
Introdu un caracter: G
Este o litera mare.
```

Literele sunt în ordine alfabetică în tabelul ASCII (L5), așa că poți verifica un interval de litere exact ca pe unul de numere.

### Exemplul 8 — Vocală?

```cpp
#include <iostream>
using namespace std;

int main() {
    char c;

    cout << "Introdu o litera mica: ";
    cin >> c;

    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
        cout << c << " este vocala." << endl;
    } else {
        cout << c << " este consoana." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `o`):
```
Introdu o litera mica: o
o este vocala.
```

Poți lega oricâte condiții cu `||`. Pentru fiecare vocală scrii o comparație completă: `c == 'a' || c == 'e' || …`.

---

## 4. Paranteze și ordinea operatorilor

Ca la matematică (`*` înainte de `+`), și aici există o ordine:
1. mai întâi `!`;
2. apoi `&&`;
3. apoi `||`.

### Exemplul 9 — Parantezele schimbă rezultatul

```cpp
#include <iostream>
using namespace std;

int main() {
    bool a = true;
    bool b = false;
    bool c = false;

    cout << "a || b && c     = " << (a || b && c) << endl;
    cout << "(a || b) && c   = " << ((a || b) && c) << endl;
    cout << "a || (b && c)   = " << (a || (b && c)) << endl;
    cout << "!a || b         = " << (!a || b) << endl;
    cout << "!(a || b)       = " << (!(a || b)) << endl;
    return 0;
}
```

**Ieșire:**
```
a || b && c     = 1
(a || b) && c   = 0
a || (b && c)   = 1
!a || b         = 0
!(a || b)       = 0
```

Prima expresie se evaluează ca `a || (b && c)`, pentru că `&&` are prioritate. Compilatorul poate chiar să te avertizeze la prima linie (un *warning* care îți cere să pui paranteze), iar programul se compilează și rulează oricum. Când amesteci `&&` și `||`, **pune întotdeauna paranteze**, chiar dacă nu sunt obligatorii. Cine citește codul (inclusiv tu, peste o lună) nu trebuie să ghicească ordinea.

---

## 5. Probleme și proiecte

### Exemplul 10 — Anul bisect

Un an este bisect dacă se împarte la 4, dar nu se împarte la 100, **sau** dacă se împarte la 400.

```cpp
#include <iostream>
using namespace std;

int main() {
    int an;

    cout << "Anul: ";
    cin >> an;

    if ((an % 4 == 0 && an % 100 != 0) || an % 400 == 0) {
        cout << an << " este an bisect." << endl;
    } else {
        cout << an << " nu este an bisect." << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `2028`):
```
Anul: 2028
2028 este an bisect.
```

**Rulare 2** (tastezi `1900`):
```
Anul: 1900
1900 nu este an bisect.
```

**Rulare 3** (tastezi `2000`):
```
Anul: 2000
2000 este an bisect.
```

Anul `1900` se împarte la 4 și la 100, dar nu la 400, deci nu este bisect. Anul `2000` se împarte la 400, deci este.

### Exemplul 11 — Login cu două condiții

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string utilizator, parola;

    cout << "Utilizator: ";
    cin >> utilizator;
    cout << "Parola: ";
    cin >> parola;

    if (utilizator == "admin" && parola == "cpp2026") {
        cout << "Autentificare reusita." << endl;
    } else {
        cout << "Utilizator sau parola gresite." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `admin` și `abc`):
```
Utilizator: admin
Parola: abc
Utilizator sau parola gresite.
```

Un detaliu bun de securitate: mesajul nu spune **care** dintre cele două este greșit. Astfel, cineva care încearcă să ghicească nu află nimic în plus.

### Exemplul 12 — Pot forma un triunghi?

Trei segmente formează un triunghi doar dacă suma oricăror două este mai mare decât al treilea.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b, c;

    cout << "Lungimile celor 3 segmente: ";
    cin >> a >> b >> c;

    if (a + b > c && a + c > b && b + c > a) {
        cout << "Formeaza un triunghi." << endl;
    } else {
        cout << "Nu formeaza un triunghi." << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `3 4 5`):
```
Lungimile celor 3 segmente: 3 4 5
Formeaza un triunghi.
```

**Rulare 2** (tastezi `1 2 5`):
```
Lungimile celor 3 segmente: 1 2 5
Nu formeaza un triunghi.
```

### Exemplul 13 — Piatră, foarfecă, hârtie

```cpp
#include <iostream>
using namespace std;

int main() {
    int j1, j2;

    cout << "1 = piatra, 2 = foarfeca, 3 = hartie" << endl;
    cout << "Jucatorul 1: ";
    cin >> j1;
    cout << "Jucatorul 2: ";
    cin >> j2;

    if (j1 == j2) {
        cout << "Egalitate!" << endl;
    } else if ((j1 == 1 && j2 == 2) || (j1 == 2 && j2 == 3) || (j1 == 3 && j2 == 1)) {
        cout << "Castiga jucatorul 1!" << endl;
    } else {
        cout << "Castiga jucatorul 2!" << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `3` și `1`):
```
1 = piatra, 2 = foarfeca, 3 = hartie
Jucatorul 1: 3
Jucatorul 2: 1
Castiga jucatorul 1!
```

Hârtia învinge piatra, deci jucătorul 1 câștigă. Cele trei cazuri în care câștigă jucătorul 1 sunt grupate cu `||`, fiecare în paranteze. Dacă nu e egalitate și nu câștigă jucătorul 1, atunci câștigă jucătorul 2.

### Exemplul 14 — Parcul de distracții (condiție cu paranteze și `bool`)

```cpp
#include <iostream>
using namespace std;

int main() {
    int inaltime, varsta, insotit;

    cout << "Inaltime (cm): ";
    cin >> inaltime;
    cout << "Varsta: ";
    cin >> varsta;
    cout << "Esti insotit de un adult? (1 = da, 0 = nu): ";
    cin >> insotit;

    bool conditiiIndeplinite = inaltime >= 120 && varsta >= 8;
    bool areAdult = insotit == 1;

    if (conditiiIndeplinite || (areAdult && inaltime >= 100)) {
        cout << "Poti intra la atractie." << endl;
    } else {
        cout << "Nu poti intra la atractie." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `110`, `6` și `1`):
```
Inaltime (cm): 110
Varsta: 6
Esti insotit de un adult? (1 = da, 0 = nu): 1
Poti intra la atractie.
```

Regula, în cuvinte: „intri dacă ai cel puțin 120 cm **și** 8 ani, **sau** dacă ești însoțit de un adult **și** ai cel puțin 100 cm”. Observă că am împărțit condiția în variabile `bool` cu nume clare. Așa, `if`-ul final se citește aproape ca o propoziție.

### Exemplul 15 — Poarta jocului (mini-proiect)

```cpp
/*
   Program: Poarta jocului
   Regula:  intri daca ai codul 4242 si varsta de cel putin 10 ani,
            SAU daca esti membru VIP (cod 7777), indiferent de varsta.
*/
#include <iostream>
using namespace std;

int main() {
    int cod, varsta;

    cout << "===== POARTA JOCULUI =====" << endl;
    cout << "Cod de acces: ";
    cin >> cod;
    cout << "Varsta: ";
    cin >> varsta;

    bool acces = (cod == 4242 && varsta >= 10) || cod == 7777;

    if (acces) {
        cout << "Poarta se deschide. Mult succes!" << endl;
    } else if (cod == 4242) {
        cout << "Codul e bun, dar esti prea mic (minim 10 ani)." << endl;
    } else {
        cout << "Cod gresit. Poarta ramane inchisa." << endl;
    }
    cout << "==========================" << endl;
    return 0;
}
```

**Rulare** (tastezi `4242` și `8`):
```
===== POARTA JOCULUI =====
Cod de acces: 4242
Varsta: 8
Codul e bun, dar esti prea mic (minim 10 ani).
==========================
```

### Exemplul 16 — Verificarea temperaturii corpului (condiții pe intervale)

```cpp
#include <iostream>
using namespace std;

int main() {
    double temp;

    cout << "Temperatura corpului (grade C): ";
    cin >> temp;

    if (temp < 34 || temp > 43) {
        cout << "Valoare imposibila. Verifica termometrul." << endl;
    } else if (temp >= 36 && temp <= 37.5) {
        cout << "Temperatura normala." << endl;
    } else if (temp > 37.5) {
        cout << "Febra. Anunta un adult." << endl;
    } else {
        cout << "Temperatura scazuta." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `38.2`):
```
Temperatura corpului (grade C): 38.2
Febra. Anunta un adult.
```

Primul `if` elimină valorile imposibile, apoi lanțul `else if` tratează cazurile rămase, de la cel mai specific la cel mai larg.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Poarta jocului” (obligatoriu)
Scrie un program cu o regulă de acces care folosește și `&&`, și `||`. Poți porni de la Exemplul 15 sau poți inventa propria regulă (club, cinema, joc). Scrie regula în cuvinte pe foaie.

### Exercițiul B — Intervalul 1–100
Citește un număr și afișează dacă se află între 1 și 100 (inclusiv). Testează cu `1`, `100`, `0`, `101`.

### Exercițiul C — Litera
Citește un caracter și spune dacă este literă (mare sau mică), cifră sau alt simbol.

### Exercițiul D — Numărul norocos
Citește un număr. Afișează „Super!” dacă numărul este par **și** mai mare decât 50, „Aproape” dacă este par **sau** mai mare decât 50 (dar nu ambele), altfel „Încearcă din nou”.

### Exercițiul E — Parola cu vârstă
Citește un cod secret (`int`) și o vârstă. Permite intrarea doar dacă ambele sunt corecte: codul este cel din program **și** vârsta este cel puțin 10.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Are minimum o condiție cu `&&`  
- [ ] Are minimum o condiție cu `||` sau `!`  
- [ ] Ai testat pe minimum 3 cazuri (adevărat, fals și unul mixt, la graniță)  
- [ ] Ai scris regula în cuvinte, pe foaie  
- [ ] Fișierul se numește `Prenume_Nume_L8.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Anul bisect, cu regula completă (Exemplul 10), citind mai mulți ani pe rând (copiind blocul de 3 ori)  
- [ ] Extinde Exemplul 13 (piatră, foarfecă, hârtie) cu un mesaj de eroare pentru valori diferite de 1, 2 sau 3  
- [ ] Un tabel de adevăr pe foaie pentru `A && !B`  
- [ ] Verifică dacă un număr de 3 cifre are toate cifrele identice (de exemplu `777`)  
- [ ] Verifică dacă trei numere citite sunt în ordine crescătoare  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `x == 1 \|\| 2` este mereu adevărat | `2` singur este considerat adevărat | `x == 1 \|\| x == 2` |
| `1 <= x <= 10` nu face ce vrei | Comparațiile nu se înlănțuie | `x >= 1 && x <= 10` |
| `x > 5 & x < 10` | Ai scris un singur `&` (operator pe biți) | `&&` cu două semne |
| `x == 1 \| x == 2` | Ai scris o singură bară | `\|\|` cu două bare |
| Condiția pare corectă, dar nu merge | `&&` și `||` amestecate fără paranteze | Pune paranteze |
| Intervalul exclude capătul | `<` în loc de `<=` | Testează valorile de la graniță |
| `if (!n > 10)` | `!` se aplică lui `n`, nu comparației | `if (!(n > 10))` sau `n <= 10` |
| Nu se potrivește cu regula din enunț | Ai confundat „și” cu „sau” | Citește condiția în română, cu voce tare |
| Regula pare greu de citit | Prea multe condiții într-un singur `if` | Împarte în variabile `bool` cu nume clare |

---

## Recapitulare pe scurt

- `A && B`: adevărat doar când **ambele** sunt adevărate.
- `A || B`: adevărat când **cel puțin una** este adevărată.
- `!A`: inversează valoarea de adevăr.
- Interval: `x >= 1 && x <= 10`. În afara intervalului: `x < 1 || x > 10`.
- Fiecare parte a lui `&&` sau `||` este o condiție completă.
- Ordinea: `!`, apoi `&&`, apoi `||`. Când amesteci operatorii, pune paranteze.
- Citește mereu regula în română înainte să o transformi în cod, și testează valorile de la graniță.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău și testează fiecare pe mai multe valori.  
2. Scrie un program care citește un an și afișează dacă este bisect, rezolvând cu ajutorul unei variabile `bool`.  
3. Scrie un program care citește trei numere și afișează dacă sunt **toate pozitive**, dacă **cel puțin unul** este negativ sau dacă **niciunul nu este 0**.  
4. Scrie un program „Alegerea echipei”: citește vârsta și nivelul (1–10). Echipa Mică este pentru vârsta sub 12 **și** nivel sub 5; Echipa Mare pentru restul.  
5. **Bonus:** pe foaie, scrie tabelul de adevăr pentru `!(A && B)` și pentru `!A || !B`. Ce observi?  
6. Salvează tot ca `Tema_L8_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 9
Învățăm `switch`: o alternativă la lanțurile lungi de `else if`, perfectă pentru **meniuri** cu opțiuni numerotate (1, 2, 3…).
