# LECȚIA 3 — Bucla `while`
**Modulul 2 · Bucle și vectori · 2 ore**  
**Code Kids Play · Loop Master**

> Azi înveți să repeți o acțiune **cât timp** o condiție este adevărată, chiar dacă nu știi dinainte de câte ori: citești numere până se introduce 0, ghicești un număr, prelucrezi cifrele unui număr.  
> Proiect: **„Calculator care nu se oprește singur”** · fișier: `Prenume_Nume_M2L3.cpp` (ex. `Ana_Pop_M2L3.cpp`)

---

## Obiectiv
La finalul orei scrii bucle `while`, alegi între `for` și `while`, citești date până la o valoare de oprire, validezi datele introduse, prelucrezi cifrele unui număr (cu `% 10` și `/ 10`) și folosești `break` și `continue`.  
**Minim:** un program care citește numere până se introduce `0` și afișează suma lor.  
**Ținta orei (Complet):** + validarea unei note, suma cifrelor unui număr și o buclă oprită cu `break`.

## De ce contează
`for` este perfect când știi de câte ori repeți. Dar de multe ori nu știi: „repetă până când utilizatorul scrie `stop`”, „continuă până ghicești”, „cât timp mai ai viață”. Acolo intră în scenă `while`. Jocurile, meniurile și validările de date se bazează pe el.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: sumă, produs, contor cu `for` |
| 10–30 | Structura `while` și legătura cu `for` (**Exemplele 1–2**) |
| 30–55 | Citire până la valoarea de oprire și validare (**Exemplele 3–5**) |
| 55–80 | Cifrele unui număr (**Exemplele 6–8**) |
| 80–100 | `break` și `continue` (**Exemplele 9–11**) |
| 100–118 | Probleme și proiecte (**Exemplele 12–16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Structura lui `while`

```
while (conditie) {
    // instructiuni repetate cat timp conditia este adevarata
}
```

Cum funcționează:
1. Se verifică **condiția**.
2. Dacă este adevărată, se execută corpul, apoi se **revine la pasul 1**.
3. Dacă este falsă, bucla se termină.

Spre deosebire de `for`, aici **tu** ai grijă ca ceva din corp să schimbe condiția. Altfel bucla nu se mai oprește niciodată.

### Exemplul 1 — `while` care numără **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 1;
    while (i <= 5) {
        cout << i << " ";
        i++;
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
1 2 3 4 5 
```

Cele trei părți ale lui `for` sunt aici împrăștiate: **start** (`int i = 1;`) înainte de buclă, **condiția** în paranteză și **pasul** (`i++;`) în interior. Comparat cu `for`, este mai lung, dar `while` poate face lucruri pe care `for` nu le face comod, cum vezi mai jos.

### Exemplul 2 — Cât timp mai ai viață

```cpp
#include <iostream>
using namespace std;

int main() {
    int viata = 100;
    int runda = 1;

    while (viata > 0) {
        cout << "Runda " << runda << ": viata = " << viata << endl;
        viata -= 30;
        runda++;
    }

    cout << "Joc terminat dupa " << runda - 1 << " runde." << endl;
    return 0;
}
```

**Ieșire:**
```
Runda 1: viata = 100
Runda 2: viata = 70
Runda 3: viata = 40
Runda 4: viata = 10
Joc terminat dupa 4 runde.
```

Nu am scris nicăieri „repetă de 4 ori”. Bucla se oprește singură când `viata` ajunge la 0 sau mai puțin. Aici `while` este natural, `for` ar fi fost nepotrivit.

**Încearcă tu (8 min)**  
- [ ] Numeri de la 10 la 1 cu un `while`  
- [ ] Scazi din `100` câte `15` cât timp rezultatul este pozitiv și afișezi fiecare valoare  
- [ ] Încerci o buclă fără pasul `i++` și o oprești cu **Ctrl + C** (în terminal) sau cu butonul de oprire al mediului  

---

## 2. Citire până la o valoare de oprire și validare

### Exemplul 3 — Citim numere până la 0 **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x, suma = 0;

    cout << "Introdu numere (0 pentru a termina):" << endl;
    cin >> x;

    while (x != 0) {
        suma += x;
        cin >> x;
    }

    cout << "Suma = " << suma << endl;
    return 0;
}
```

**Rulare** (tastezi `5`, `8`, `-2`, `0`):
```
Introdu numere (0 pentru a termina):
5
8
-2
0
Suma = 11
```

Tiparul este foarte des folosit:
1. citești **primul** număr înainte de buclă;
2. cât timp numărul nu este valoarea de oprire, îl prelucrezi;
3. la **sfârșitul** corpului citești următorul număr.

Numărul `0` este doar semnalul de oprire: nu intră în sumă.

### Exemplul 4 — Câte numere și ce medie? **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int x;
    int cate = 0;
    int suma = 0;

    cout << "Note (0 pentru a termina): ";
    cin >> x;

    while (x != 0) {
        cate++;
        suma += x;
        cin >> x;
    }

    if (cate == 0) {
        cout << "Nu ai introdus nicio nota." << endl;
    } else {
        cout << "Ai introdus " << cate << " note." << endl;
        cout << "Media = " << (double)suma / cate << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `8`, `9`, `10`, `0`):
```
Note (0 pentru a termina): 8 9 10 0
Ai introdus 3 note.
Media = 9
```

**Rulare 2** (tastezi `0`):
```
Note (0 pentru a termina): 0
Nu ai introdus nicio nota.
```

La `for` știai de la început câte numere sunt. Aici le numeri tu, cu `cate++`. Verificăm și cazul `cate == 0`, ca să nu împărțim la zero.

### Exemplul 5 — Validarea datelor: repetă până e corect **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota;

    cout << "Introdu o nota (1-10): ";
    cin >> nota;

    while (nota < 1 || nota > 10) {
        cout << "Nota invalida! Incearca din nou (1-10): ";
        cin >> nota;
    }

    cout << "Nota " << nota << " a fost acceptata." << endl;
    return 0;
}
```

**Rulare** (tastezi `15`, `0`, `8`):
```
Introdu o nota (1-10): 15
Nota invalida! Incearca din nou (1-10): 0
Nota invalida! Incearca din nou (1-10): 8
Nota 8 a fost acceptata.
```

Bucla se repetă **cât timp** valoarea este greșită. Condiția este exact opusul a ce vrei să obții: vrei `1…10`, deci repeți cât timp `nota < 1 || nota > 10`. Programele serioase folosesc asta ca să nu primească date greșite.

**Încearcă tu (10 min)**  
- [ ] Citești numere până la `-1` și afișezi câte au fost  
- [ ] Citești numere până la `0` și afișezi cel mai mare dintre ele  
- [ ] Ceri o vârstă între 1 și 120 și insiști până primești una validă  

---

## 3. Cifrele unui număr

Cu `% 10` și `/ 10` (Modulul 1, lecția 4) poți „mânca” un număr cifră cu cifră:
- `n % 10` este **ultima cifră**;
- `n / 10` este numărul **fără ultima cifră**.

Repeți cât timp mai există cifre, adică cât timp `n > 0`.

### Exemplul 6 — Suma cifrelor **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Numarul: ";
    cin >> n;

    int suma = 0;
    while (n > 0) {
        suma += n % 10;
        n /= 10;
    }

    cout << "Suma cifrelor: " << suma << endl;
    return 0;
}
```

**Rulare** (tastezi `4827`):
```
Numarul: 4827
Suma cifrelor: 21
```

Pașii pentru `4827`:

| `n` | ultima cifră | `suma` | `n` după `n /= 10` |
|-----|--------------|--------|--------------------|
| 4827 | 7 | 7 | 482 |
| 482 | 2 | 9 | 48 |
| 48 | 8 | 17 | 4 |
| 4 | 4 | 21 | 0 |

Când `n` devine `0`, condiția `n > 0` este falsă și bucla se oprește.

### Exemplul 7 — Câte cifre are un număr?

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Numarul: ";
    cin >> n;

    int copie = n;
    int cifre = 0;

    while (copie > 0) {
        cifre++;
        copie /= 10;
    }

    cout << n << " are " << cifre << " cifre." << endl;
    return 0;
}
```

**Rulare** (tastezi `90210`):
```
Numarul: 90210
90210 are 5 cifre.
```

Lucrăm pe o **copie**, pentru că bucla „distruge” numărul. Dacă mai ai nevoie de `n` după buclă, nu-l modifica direct. Atenție: pentru `n = 0` programul afișează `0 cifre`, deși `0` se scrie cu o cifră. Este un caz special, pe care îl tratezi cu un `if`, dacă problema îl cere.

### Exemplul 8 — Oglinditul unui număr

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Numarul: ";
    cin >> n;

    int copie = n;
    long long oglindit = 0;

    while (copie > 0) {
        int cifra = copie % 10;
        oglindit = oglindit * 10 + cifra;
        copie /= 10;
    }

    cout << "Oglinditul lui " << n << " este " << oglindit << endl;
    return 0;
}
```

**Rulare** (tastezi `1245`):
```
Numarul: 1245
Oglinditul lui 1245 este 5421
```

Tehnica: pentru fiecare cifră luată de la coadă, „mutăm” ce avem deja în `oglindit` cu o poziție la stânga (`* 10`) și adăugăm cifra nouă. Pași: `0 → 5 → 54 → 542 → 5421`.

**Încearcă tu (10 min)**  
- [ ] Calculezi produsul cifrelor unui număr  
- [ ] Numeri câte cifre pare are un număr  
- [ ] Verifici dacă un număr este palindrom (egal cu oglinditul lui)  

---

## 4. `break` și `continue`

- `break;` **oprește imediat** bucla.
- `continue;` **sare** peste restul iterației curente și trece la următoarea.

### Exemplul 9 — Buclă „infinită” oprită cu `break` **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int suma = 0;

    while (true) {
        int x;
        cout << "Numar (0 pentru a iesi): ";
        cin >> x;

        if (x == 0) {
            break;
        }
        suma += x;
    }

    cout << "Suma = " << suma << endl;
    return 0;
}
```

**Rulare** (tastezi `4`, `6`, `0`):
```
Numar (0 pentru a iesi): 4
Numar (0 pentru a iesi): 6
Numar (0 pentru a iesi): 0
Suma = 10
```

`while (true)` este o condiție care nu devine niciodată falsă. Bucla se oprește doar prin `break`. Este un tipar foarte folosit la meniuri și jocuri: începi un ciclu, iar ieșirea se decide undeva în mijlocul lui.

### Exemplul 10 — `continue`: ignor numerele negative

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Cate numere? ";
    cin >> n;

    int suma = 0;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;

        if (x < 0) {
            continue;
        }
        suma += x;
    }

    cout << "Suma numerelor pozitive: " << suma << endl;
    return 0;
}
```

**Rulare** (tastezi `5`, apoi `4 -3 8 -1 6`):
```
Cate numere? 5
4 -3 8 -1 6
Suma numerelor pozitive: 18
```

Când `x` este negativ, `continue` sare peste `suma += x;` și trece la numărul următor. `break` și `continue` funcționează la fel și în bucla `for`.

### Exemplul 11 — Primul număr care se împarte exact la 7

```cpp
#include <iostream>
using namespace std;

int main() {
    int start;
    cout << "Cauta de la: ";
    cin >> start;

    int n = start;
    while (true) {
        if (n % 7 == 0) {
            cout << "Primul multiplu de 7, de la " << start << ", este " << n << endl;
            break;
        }
        n++;
    }
    return 0;
}
```

**Rulare** (tastezi `50`):
```
Cauta de la: 50
Primul multiplu de 7, de la 50, este 56
```

Nu știi câte numere trebuie verificate, deci `while` este alegerea potrivită; `break` oprește căutarea când ai găsit răspunsul.

---

## 5. Probleme și proiecte

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

### Exemplul 12 — Cel mai mare divizor comun (algoritmul lui Euclid) *(Provocare, opțional)*

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "Doua numere: ";
    cin >> a >> b;

    int x = a, y = b;
    while (y != 0) {
        int rest = x % y;
        x = y;
        y = rest;
    }

    cout << "Cmmdc(" << a << ", " << b << ") = " << x << endl;
    return 0;
}
```

**Rulare** (tastezi `48` și `18`):
```
Doua numere: 48 18
Cmmdc(48, 18) = 6
```

Euclid, matematician grec, a descoperit acum peste 2000 de ani că `cmmdc(a, b)` este același cu `cmmdc(b, a % b)`. Repeți până când restul devine `0`. Pașii pentru `48` și `18`: `(48, 18) → (18, 12) → (12, 6) → (6, 0)`, deci răspunsul este `6`.

### Exemplul 13 — Un număr în binar *(Provocare, opțional)*

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cout << "Numarul (zecimal): ";
    cin >> n;

    if (n == 0) {
        cout << "In binar: 0" << endl;
        return 0;
    }

    string binar = "";
    int copie = n;
    while (copie > 0) {
        binar = (char)('0' + copie % 2) + binar;
        copie /= 2;
    }

    cout << n << " in binar este " << binar << endl;
    return 0;
}
```

**Rulare** (tastezi `13`):
```
Numarul (zecimal): 13
13 in binar este 1101
```

Cum convertești în binar: împarți la 2 și notezi resturile, de la ultimul spre primul. Pentru `13`: resturile sunt `1, 0, 1, 1`, iar în ordine inversă dau `1101`. Linia `binar = (char)('0' + copie % 2) + binar;` adaugă cifra nouă **în fața** textului existent, deci ordinea se răstoarnă singură.

### Exemplul 14 — Conjectura 3n + 1 (Collatz) *(Provocare, opțional)*

```cpp
#include <iostream>
using namespace std;

int main() {
    long long n;
    cout << "Numar de pornire: ";
    cin >> n;

    int pasi = 0;
    while (n != 1) {
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        pasi++;
        cout << n << " ";
    }

    cout << endl << "Am ajuns la 1 in " << pasi << " pasi." << endl;
    return 0;
}
```

**Rulare** (tastezi `6`):
```
Numar de pornire: 6
3 10 5 16 8 4 2 1 
Am ajuns la 1 in 8 pasi.
```

Regula: dacă numărul e par, îl împarți la 2; dacă e impar, îl înmulțești cu 3 și adaugi 1. Se crede că, indiferent de numărul de pornire, ajungi mereu la 1, dar **nimeni nu a demonstrat asta** pentru toate numerele. Matematicienii încearcă de peste 80 de ani. Bucla `while` este potrivită, pentru că nu știi dinainte câți pași vor fi.

### Exemplul 15 — Ghicește numărul (cu mai multe încercări) **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    const int SECRET = 37;
    int incercare;
    int incercari = 0;

    cout << "Am ales un numar intre 1 si 100. Ghiceste-l!" << endl;

    cout << "Incercarea ta: ";
    cin >> incercare;
    incercari++;

    while (incercare != SECRET) {
        if (incercare < SECRET) {
            cout << "Prea mic!" << endl;
        } else {
            cout << "Prea mare!" << endl;
        }
        cout << "Incercarea ta: ";
        cin >> incercare;
        incercari++;
    }

    cout << "Bravo! Ai ghicit din " << incercari << " incercari." << endl;
    return 0;
}
```

**Rulare** (tastezi `50`, `25`, `37`):
```
Am ales un numar intre 1 si 100. Ghiceste-l!
Incercarea ta: 50
Prea mare!
Incercarea ta: 25
Prea mic!
Incercarea ta: 37
Bravo! Ai ghicit din 3 incercari.
```

Jocul din Modulul 1 permitea o singură încercare. Acum poți continua până ghicești, iar contorul `incercari` îți spune în câți pași ai reușit.

### Exemplul 16 — Calculatorul care nu se oprește singur (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Calculator continuu
   Scop:    face operatii pana cand utilizatorul alege 0 (iesire)
*/
#include <iostream>
using namespace std;

int main() {
    int optiune = -1;

    while (optiune != 0) {
        cout << endl << "===== CALCULATOR =====" << endl;
        cout << "1. Adunare" << endl;
        cout << "2. Scadere" << endl;
        cout << "3. Inmultire" << endl;
        cout << "0. Iesire" << endl;
        cout << "Alege: ";
        cin >> optiune;

        if (optiune == 0) {
            break;
        }

        if (optiune < 1 || optiune > 3) {
            cout << "Optiune invalida." << endl;
            continue;
        }

        int a, b;
        cout << "Primul numar: ";
        cin >> a;
        cout << "Al doilea numar: ";
        cin >> b;

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
        }
    }

    cout << "La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1`, `4`, `5`, apoi `9`, apoi `3`, `6`, `7`, apoi `0`):
```

===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
0. Iesire
Alege: 1
Primul numar: 4
Al doilea numar: 5
4 + 5 = 9

===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
0. Iesire
Alege: 9
Optiune invalida.

===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
0. Iesire
Alege: 3
Primul numar: 6
Al doilea numar: 7
6 * 7 = 42

===== CALCULATOR =====
1. Adunare
2. Scadere
3. Inmultire
0. Iesire
Alege: 0
La revedere!
```

Calculatorul din Modulul 1 se oprea după o operație. Acum, meniul revine în ecran până alegi `0`. Aici ai folosit toate piesele: `while`, `switch`, `break` (ieșirea din meniu) și `continue` (opțiune invalidă).

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Calculator care nu se oprește singur” (obligatoriu)
Scrie un calculator cu meniu care se repetă până alegi opțiunea `0`. Adaugă cel puțin 3 operații și un mesaj pentru opțiuni invalide, ca în Exemplul 16.

### Exercițiul B — Suma până la 0
Citește numere până se introduce `0` și afișează suma, câte numere au fost și cel mai mare dintre ele.

### Exercițiul C — Validare
Cere vârsta unui elev (între 5 și 18 ani) și repetă cererea cât timp valoarea nu este bună.

### Exercițiul D — Cifrele unui număr
Citește un număr și afișează: suma cifrelor, numărul de cifre și cifra cea mai mare.

### Exercițiul E — Palindrom
Citește un număr și afișează „Da” dacă este palindrom (de exemplu `1221` sau `4`), altfel „Nu”.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Folosește minimum o buclă `while`  
- [ ] Bucla se oprește corect (ai testat cazul de oprire)  
- [ ] Ai validat o valoare introdusă de utilizator **sau** ai folosit `break`  
- [ ] Ai testat cu minimum 2 seturi de date  
- [ ] Fișierul se numește `Prenume_Nume_M2L3.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Citește numere până la 0 și afișează câte sunt pare și câte impare  
- [ ] Scrie „Ghicește numărul” cu limită de 7 încercări; dacă nu ghicești în 7, jocul se încheie cu un mesaj  
- [ ] Calculează cmmdc a trei numere, folosind Euclid de două ori  
- [ ] Calculează cel mai mic multiplu comun (cmmmc) al a două numere folosind formula `a * b / cmmdc`  
- [ ] Afișează toți divizorii unui număr, folosind `for` sau `while`  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Programul „îngheață” și nu se oprește | Condiția nu devine niciodată falsă (ai uitat `i++` sau citirea următorului număr) | Verifică dacă ceva din corp schimbă condiția |
| `while (x = 0)` | `=` atribuie, nu compară | `while (x == 0)` sau `while (x != 0)` |
| `while (x != 0);` | `;` după paranteză: corpul nu mai face parte din buclă | Fără `;` după `)` |
| Bucla nu se execută deloc | Condiția este falsă de la început | Verifică valoarea inițială |
| Ultimul număr (0) intră în sumă | Ai adunat înainte să verifici | Tiparul: citești, verifici, prelucrezi, citești următorul |
| Numărul original se pierde | Ai împărțit chiar `n`, nu o copie | `int copie = n;` și lucrezi pe `copie` |
| Cifrele ies în ordine inversă | `n % 10` începe de la ultima cifră | E normal; pentru ordinea corectă folosești alte tehnici |
| Răspunsul pentru `n = 0` este greșit | Condiția `n > 0` nu intră în buclă | Tratează `0` cu un `if` separat |
| `break` nu iese din tot programul | `break` iese doar din bucla (sau `switch`-ul) curent | Folosește `return 0;` sau un `bool` de oprire |

---

## Recapitulare pe scurt

- `while (condiție) { … }` repetă cât timp condiția este adevărată; dacă e falsă de la început, nu rulează deloc.
- Tu trebuie să te asiguri că ceva din corp face condiția falsă la un moment dat.
- Tiparul „citește până la o valoare de oprire”: citești primul număr, `while (x != oprire) { prelucrezi; citești următorul; }`.
- Validare: repeți cererea cât timp valoarea este greșită.
- Cifrele unui număr: `n % 10` este ultima cifră, `n /= 10` o elimină, cât timp `n > 0`.
- `break;` oprește bucla, iar `continue;` sare la iterația următoare.
- `while (true)` plus `break` este un tipar des întâlnit.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie un program care citește numere până la `0` și afișează media lor (atenție la cazul în care nu s-a citit niciun număr).  
3. Scrie un program care citește un număr natural și afișează numărul de cifre `0` din el.  
4. Scrie un program care afișează toate puterile lui 2 mai mici decât un număr citit, folosind `while`.  
5. **Bonus:** program „Banca”: sold inițial 500 de lei; utilizatorul retrage sume cât timp soldul permite; dacă suma cerută e mai mare decât soldul, afișează „Fonduri insuficiente”, iar la introducerea lui `0` programul se oprește și afișează soldul rămas.  
6. Salvează tot ca `Tema_M2L3_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 4
Învățăm `do-while`: o buclă care rulează **cel puțin o dată** (ideală pentru meniuri și validări) și cum alegi între `for`, `while` și `do-while`.
