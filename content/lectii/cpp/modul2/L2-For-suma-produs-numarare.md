# LECȚIA 2 — `for`: sumă, produs, numărare
**Modulul 2 · Bucle și vectori · 2 ore**  
**Code Kids Play · Loop Master**

> Azi bucla `for` începe să **țină minte**: aduni numere, le înmulțești, le numeri și afli cel mai mic și cel mai mare.  
> Proiect: **„Statistici de clasă”** · fișier: `Prenume_Nume_M2L2.cpp` (ex. `Ana_Pop_M2L2.cpp`)

---

## Obiectiv
La finalul orei folosești o variabilă **acumulator** pentru sume și produse, un **contor** pentru numărări și o variabilă pentru **minim** și **maxim**. Citești `n` numere într-o buclă, calculezi media lor și știi când ai nevoie de `long long`.  
**Minim:** un program care citește `n` numere și afișează suma lor.  
**Ținta orei (Complet):** + media, câte numere sunt pare și cel mai mare număr citit.

## De ce contează
Aproape fiecare problemă de informatică începe cu „citește mai multe numere și calculează ceva”: media notelor, cel mai bun scor, câți elevi au promovat. Tehnicile de azi (acumulator, contor, minim și maxim) apar în aproape toate problemele din restul cursului.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: bucla `for` și cele trei părți ale ei |
| 10–35 | Acumulatorul: sume (**Exemplele 1–3**) |
| 35–50 | Produsul și limita lui `int` (**Exemplele 4–5**) |
| 50–70 | Citim `n` numere într-o buclă (**Exemplele 6–8**) |
| 70–90 | Contorul: numărări cu condiții (**Exemplele 9–10**) |
| 90–105 | Minim și maxim (**Exemplele 11–12**) |
| 105–118 | Proiecte (**Exemplele 13–16**) |
| 118–120 | Recap și temă |

---

## 1. Acumulatorul: tehnica sumei

Ideea: ai o variabilă `suma`, care pornește de la `0`. La fiecare iterație **adaugi** în ea o valoare nouă. La final, `suma` conține totalul.

```
int suma = 0;                 // pornim de la zero
for (...) {
    suma += valoare;          // adaugam la fiecare iteratie
}
```

Ca la o pușculiță: începi goală și bagi bani, iar la sfârșit numeri tot ce s-a strâns.

### Exemplul 1 — Suma numerelor de la 1 la n

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "n = ";
    cin >> n;

    int suma = 0;
    for (int i = 1; i <= n; i++) {
        suma += i;
    }

    cout << "1 + 2 + ... + " << n << " = " << suma << endl;
    return 0;
}
```

**Rulare** (tastezi `10`):
```
n = 10
1 + 2 + ... + 10 = 55
```

Pașii pentru `n = 4` (urmărește-i pe foaie):

| `i` | `suma` înainte | `suma` după |
|-----|----------------|-------------|
| 1 | 0 | 1 |
| 2 | 1 | 3 |
| 3 | 3 | 6 |
| 4 | 6 | 10 |

**Foarte important:** `int suma = 0;` se scrie **înaintea** buclei. Dacă l-ai pune în interior, variabila s-ar reseta la `0` la fiecare iterație și ai pierde totalul.

### Exemplul 2 — Suma doar a numerelor pare

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "n = ";
    cin >> n;

    int suma = 0;
    for (int i = 2; i <= n; i += 2) {
        suma += i;
    }

    cout << "Suma numerelor pare pana la " << n << " este " << suma << endl;
    return 0;
}
```

**Rulare** (tastezi `10`):
```
n = 10
Suma numerelor pare pana la 10 este 30
```

Verificare: 2 + 4 + 6 + 8 + 10 = 30. Pasul `i += 2` sare peste numerele impare.

### Exemplul 3 — Suma cu condiție în interior

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "n = ";
    cin >> n;

    int suma = 0;
    for (int i = 1; i <= n; i++) {
        if (i % 3 == 0 || i % 5 == 0) {
            suma += i;
        }
    }

    cout << "Suma multiplilor lui 3 sau 5 pana la " << n << " este " << suma << endl;
    return 0;
}
```

**Rulare** (tastezi `20`):
```
n = 20
Suma multiplilor lui 3 sau 5 pana la 20 este 98
```

Verificare: 3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 + 20 = 98. Un `if` în interiorul buclei decide **ce** se adaugă. Fiecare număr se adaugă cel mult o dată, chiar dacă este multiplu și de 3, și de 5 (cum e 15), pentru că `||` produce o singură condiție.

**Încearcă tu (8 min)**  
- [ ] Calculezi suma numerelor de la 1 la 100 și o compari cu formula `n * (n + 1) / 2`  
- [ ] Calculezi suma numerelor impare până la `n`  
- [ ] Muți din greșeală `int suma = 0;` în interiorul buclei și observi rezultatul  

---

## 2. Produsul și limita lui `int`

Pentru **produs**, acumulatorul pornește de la `1`, nu de la `0`. (Dacă ai porni de la 0, orice înmulțire ar da 0.)

### Exemplul 4 — Factorialul

Factorialul unui număr `n`, scris `n!`, este produsul `1 · 2 · 3 · … · n`. De exemplu, `5! = 1 · 2 · 3 · 4 · 5 = 120`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "n = ";
    cin >> n;

    int produs = 1;
    for (int i = 1; i <= n; i++) {
        produs *= i;
    }

    cout << n << "! = " << produs << endl;
    return 0;
}
```

**Rulare** (tastezi `5`):
```
n = 5
5! = 120
```

Merge bine pentru numere mici, dar factorialul crește foarte repede: `10! = 3628800`, `12! = 479001600`.

### Exemplul 5 — Când `int` nu mai ajunge

Un `int` poate păstra numere până la aproximativ **2 miliarde** (mai exact `2147483647`). Dacă un rezultat depășește această valoare, programul nu dă eroare, dar **rezultatul este greșit**. Pentru numere mai mari folosim tipul **`long long`**, care ajunge până la aproximativ 9 trilioane (`9 · 10^18`).

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "n = ";
    cin >> n;

    long long produs = 1;
    for (int i = 1; i <= n; i++) {
        produs *= i;
    }

    cout << n << "! = " << produs << endl;
    return 0;
}
```

**Rulare 1** (tastezi `13`):
```
n = 13
13! = 6227020800
```

**Rulare 2** (tastezi `20`):
```
n = 20
20! = 2432902008176640000
```

`13! = 6227020800` este mai mare decât limita lui `int`, deci cu `int` ai fi primit un număr greșit. Cu `long long` rezultatul este corect. Dar chiar și `long long` se termină: la `21!` depășește limita și rezultatul devine greșit. **Regula:** când te aștepți la numere mari (sume de milioane, produse, factoriale), folosește `long long` pentru acumulator.

---

## 3. Citim `n` numere într-o buclă

Până acum, `i` era numărul adunat. Acum bucla are alt rol: de `n` ori, **citim un număr** de la tastatură și îl adăugăm. Contorul `i` doar numără repetările.

### Exemplul 6 — Suma a n numere citite

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
        cout << "Numarul " << i << ": ";
        cin >> x;
        suma += x;
    }

    cout << "Suma = " << suma << endl;
    return 0;
}
```

**Rulare** (tastezi `3`, apoi `10`, `-4` și `7`):
```
Cate numere? 3
Numarul 1: 10
Numarul 2: -4
Numarul 3: 7
Suma = 13
```

Variabila `x` este declarată în interiorul buclei și primește o valoare nouă la fiecare iterație. Mesajul „Numarul 1”, „Numarul 2” folosește contorul `i` ca să arate care număr se cere.

### Exemplul 7 — Media celor `n` note

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Cate note ai? ";
    cin >> n;

    int suma = 0;
    for (int i = 1; i <= n; i++) {
        int nota;
        cout << "Nota " << i << ": ";
        cin >> nota;
        suma += nota;
    }

    double media = (double)suma / n;
    cout << "Suma = " << suma << endl;
    cout << "Media = " << media << endl;
    return 0;
}
```

**Rulare** (tastezi `4`, apoi `9`, `8`, `10` și `7`):
```
Cate note ai? 4
Nota 1: 9
Nota 2: 8
Nota 3: 10
Nota 4: 7
Suma = 34
Media = 8.5
```

Observă `(double)suma / n`: fără conversie, împărțirea dintre două `int` ar da `8` (Modulul 1, lecția 5). Atenție și la `n = 0`: ai împărți la zero. Mai târziu învățăm să verificăm asta.

### Exemplul 8 — Suma doar a numerelor pozitive

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Cate numere? ";
    cin >> n;

    int sumaPozitive = 0;
    int sumaNegative = 0;

    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        if (x > 0) {
            sumaPozitive += x;
        } else {
            sumaNegative += x;
        }
    }

    cout << "Suma numerelor pozitive: " << sumaPozitive << endl;
    cout << "Suma numerelor negative sau zero: " << sumaNegative << endl;
    return 0;
}
```

**Rulare** (tastezi `5`, apoi `4 -2 7 -6 3`):
```
Cate numere? 5
4 -2 7 -6 3
Suma numerelor pozitive: 14
Suma numerelor negative sau zero: -8
```

Poți avea **mai mulți acumulatori** în același program, iar un `if … else` decide în care dintre ei intră fiecare număr. Numerele pot fi scrise pe același rând, despărțite prin spațiu, pentru că `cin` le citește pe rând.

**Încearcă tu (10 min)**  
- [ ] Citești `n` numere și afișezi suma lor  
- [ ] Citești `n` note și afișezi media lor cu zecimale  
- [ ] Calculezi `20!` cu `long long`, apoi încerci aceeași operație cu `int` și observi ce apare (nu te baza pe valoare, e greșită)  

---

## 4. Contorul: numărări

Un **contor** este tot un acumulator, dar care crește cu **1** doar când o condiție este adevărată.

```
int contor = 0;
for (...) {
    if (conditie) {
        contor++;
    }
}
```

### Exemplul 9 — Câte numere pare și câte impare?

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Cate numere? ";
    cin >> n;

    int pare = 0;
    int impare = 0;

    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        if (x % 2 == 0) {
            pare++;
        } else {
            impare++;
        }
    }

    cout << "Pare: " << pare << endl;
    cout << "Impare: " << impare << endl;
    return 0;
}
```

**Rulare** (tastezi `6`, apoi `3 8 12 5 7 10`):
```
Cate numere? 6
3 8 12 5 7 10
Pare: 3
Impare: 3
```

### Exemplul 10 — Câte note sunt de promovare?

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Numarul de elevi: ";
    cin >> n;

    int promovati = 0;
    int zece = 0;

    for (int i = 1; i <= n; i++) {
        int nota;
        cout << "Nota elevului " << i << ": ";
        cin >> nota;

        if (nota >= 5) {
            promovati++;
        }
        if (nota == 10) {
            zece++;
        }
    }

    cout << "Au promovat " << promovati << " din " << n << " elevi." << endl;
    cout << "Note de 10: " << zece << endl;
    return 0;
}
```

**Rulare** (tastezi `4`, apoi `10`, `4`, `7` și `10`):
```
Numarul de elevi: 4
Nota elevului 1: 10
Nota elevului 2: 4
Nota elevului 3: 7
Nota elevului 4: 10
Au promovat 3 din 4 elevi.
Note de 10: 2
```

Un singur număr poate crește mai mulți contori: o notă de `10` crește și `promovati`, și `zece`.

---

## 5. Minim și maxim

Ca să afli cel mai mare număr dintr-un șir, ții minte „cel mai mare până acum” și îl înlocuiești când găsești unul mai mare. Primul număr citit este, la început, atât minim, cât și maxim.

### Exemplul 11 — Cel mai mare și cel mai mic număr

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Cate numere? ";
    cin >> n;

    int x;
    cin >> x;
    int maxim = x;
    int minim = x;

    for (int i = 2; i <= n; i++) {
        cin >> x;
        if (x > maxim) {
            maxim = x;
        }
        if (x < minim) {
            minim = x;
        }
    }

    cout << "Maximul: " << maxim << endl;
    cout << "Minimul: " << minim << endl;
    return 0;
}
```

**Rulare** (tastezi `5`, apoi `12 -3 8 25 7`):
```
Cate numere? 5
12 -3 8 25 7
Maximul: 25
Minimul: -3
```

Detalii care contează:
- citim **primul** număr înainte de buclă și îl punem în `maxim` și în `minim`;
- bucla pornește de la `i = 2`, pentru că primul număr a fost deja citit;
- **nu** pornim `maxim` de la `0`: dacă toate numerele sunt negative, rezultatul ar fi greșit.

### Exemplul 12 — Poziția maximului

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Cate numere? ";
    cin >> n;

    int x;
    cin >> x;
    int maxim = x;
    int pozitie = 1;

    for (int i = 2; i <= n; i++) {
        cin >> x;
        if (x > maxim) {
            maxim = x;
            pozitie = i;
        }
    }

    cout << "Cel mai mare numar este " << maxim << ", pe pozitia " << pozitie << endl;
    return 0;
}
```

**Rulare** (tastezi `6`, apoi `4 9 2 17 8 6`):
```
Cate numere? 6
4 9 2 17 8 6
Cel mai mare numar este 17, pe pozitia 4
```

Când găsești un maxim nou, notezi și **unde** l-ai găsit: aici contorul `i` este util și în afara numărării.

**Încearcă tu (10 min)**  
- [ ] Citești `n` numere și afli câte sunt mai mari decât 100  
- [ ] Citești `n` numere și afli cel mai mic dintre ele  
- [ ] Testezi programul de maxim cu numere toate negative (de exemplu `-5 -2 -9`)  

---

## 6. Proiecte mici

### Exemplul 13 — Suma pătratelor și verificarea cu formula

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "n = ";
    cin >> n;

    long long suma = 0;
    for (int i = 1; i <= n; i++) {
        suma += (long long)i * i;
    }

    long long formula = (long long)n * (n + 1) * (2 * n + 1) / 6;

    cout << "Suma patratelor (prin bucla): " << suma << endl;
    cout << "Suma patratelor (prin formula): " << formula << endl;
    return 0;
}
```

**Rulare** (tastezi `10`):
```
n = 10
Suma patratelor (prin bucla): 385
Suma patratelor (prin formula): 385
```

O problemă de matematică poate fi verificată în două moduri: cu o buclă și cu o formulă. Dacă rezultatele coincid, ești aproape sigur că programul e corect. Conversia `(long long)i * i` face ca înmulțirea să se desfășoare pe numere mari.

### Exemplul 14 — Puterea unui număr, fără formulă

```cpp
#include <iostream>
using namespace std;

int main() {
    int baza, exponent;

    cout << "Baza: ";
    cin >> baza;
    cout << "Exponentul: ";
    cin >> exponent;

    long long putere = 1;
    for (int i = 1; i <= exponent; i++) {
        putere *= baza;
    }

    cout << baza << " ^ " << exponent << " = " << putere << endl;
    return 0;
}
```

**Rulare** (tastezi `2` și `10`):
```
Baza: 2
Exponentul: 10
2 ^ 10 = 1024
```

A ridica la puterea `exponent` înseamnă a înmulți baza cu ea însăși de `exponent` ori. Pentru `exponent = 0` bucla nu rulează, iar rezultatul rămâne `1`, ceea ce este corect matematic.

### Exemplul 15 — Pușculița care se dublează

```cpp
#include <iostream>
using namespace std;

int main() {
    int zile;

    cout << "Cate zile pui bani? ";
    cin >> zile;

    long long banZilnic = 1;
    long long total = 0;

    for (int zi = 1; zi <= zile; zi++) {
        total += banZilnic;
        cout << "Ziua " << zi << ": pui " << banZilnic << " lei, ai in total " << total << " lei" << endl;
        banZilnic *= 2;
    }
    return 0;
}
```

**Rulare** (tastezi `10`):
```
Cate zile pui bani? 10
Ziua 1: pui 1 lei, ai in total 1 lei
Ziua 2: pui 2 lei, ai in total 3 lei
Ziua 3: pui 4 lei, ai in total 7 lei
Ziua 4: pui 8 lei, ai in total 15 lei
Ziua 5: pui 16 lei, ai in total 31 lei
Ziua 6: pui 32 lei, ai in total 63 lei
Ziua 7: pui 64 lei, ai in total 127 lei
Ziua 8: pui 128 lei, ai in total 255 lei
Ziua 9: pui 256 lei, ai in total 511 lei
Ziua 10: pui 512 lei, ai in total 1023 lei
```

În prima zi pui 1 leu, a doua zi 2 lei, apoi 4, 8… După 10 zile ai peste o mie de lei. Încearcă `30` de zile, ca să vezi cât de repede cresc numerele care se dublează (și de ce are sens `long long`).

### Exemplul 16 — Statistici de clasă (mini-proiect)

```cpp
/*
   Program: Statistici de clasa
   Scop:    citeste notele a n elevi si afiseaza statistici
*/
#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "===== STATISTICI DE CLASA =====" << endl;
    cout << "Numarul de elevi: ";
    cin >> n;

    int suma = 0;
    int promovati = 0;
    int nota;

    cout << "Nota elevului 1: ";
    cin >> nota;
    int maxim = nota;
    int minim = nota;
    suma += nota;
    if (nota >= 5) {
        promovati++;
    }

    for (int i = 2; i <= n; i++) {
        cout << "Nota elevului " << i << ": ";
        cin >> nota;

        suma += nota;
        if (nota > maxim) {
            maxim = nota;
        }
        if (nota < minim) {
            minim = nota;
        }
        if (nota >= 5) {
            promovati++;
        }
    }

    double media = (double)suma / n;

    cout << endl << "----- REZULTATE -----" << endl;
    cout << "Media clasei: " << media << endl;
    cout << "Nota maxima: " << maxim << endl;
    cout << "Nota minima: " << minim << endl;
    cout << "Au promovat " << promovati << " din " << n << " elevi." << endl;
    return 0;
}
```

**Rulare** (tastezi `5`, apoi `8`, `4`, `10`, `6` și `7`):
```
===== STATISTICI DE CLASA =====
Numarul de elevi: 5
Nota elevului 1: 8
Nota elevului 2: 4
Nota elevului 3: 10
Nota elevului 4: 6
Nota elevului 5: 7

----- REZULTATE -----
Media clasei: 7
Nota maxima: 10
Nota minima: 4
Au promovat 4 din 5 elevi.
```

În acest program folosești **toate** tehnicile lecției: acumulator (`suma`), contor (`promovati`), minim și maxim și medie cu `double`.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Statistici de clasă” (obligatoriu)
Citește `n` note și afișează: suma, media (cu zecimale), nota maximă, nota minimă și câți elevi au promovat (notă ≥ 5).

### Exercițiul B — Suma numerelor de pe pozițiile impare
Citește `n` numere și afișează suma numerelor aflate pe pozițiile impare (prima, a treia, a cincea…). Ajutor: folosește `i % 2 == 1`.

### Exercițiul C — Câte numere sunt divizibile cu 3?
Citește `n` numere și afișează câte dintre ele sunt divizibile cu 3.

### Exercițiul D — Maximul și diferența până la minim
Citește `n` numere (cel puțin 2) și afișează maximul, minimul și diferența dintre ele.

### Exercițiul E — Factorial în siguranță
Citește `n` (între 1 și 20) și afișează `n!` folosind `long long`. Dacă `n` este în afara intervalului, afișează un mesaj de eroare.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Folosește un acumulator inițializat corect (`0` pentru sumă, `1` pentru produs)  
- [ ] Citește `n` numere într-o buclă  
- [ ] Folosește un contor cu `if`  
- [ ] Ai testat cu numere negative și cu `n = 1`  
- [ ] Fișierul se numește `Prenume_Nume_M2L2.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Afișează suma numerelor de la 1 la `n` cu bucla, apoi cu formula lui Gauss `n * (n + 1) / 2`, și compară-le  
- [ ] Citește `n` numere și afișează câte dintre ele sunt egale cu primul număr citit  
- [ ] Calculează combinări mici cu factoriale: `C(n, k) = n! / (k! * (n - k)!)` pentru `n = 6`, `k = 2`  
- [ ] Citește `n` numere și afișează cel mai mic număr **pozitiv** dintre ele (atenție la cazul în care nu există niciunul)  
- [ ] Simulează dobânda: pornești de la 1000 de lei și în fiecare an suma crește cu 5%; afișează suma după fiecare an, timp de 10 ani (folosește `double`)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Suma finală e foarte mare sau ciudată | Acumulatorul nu are valoare de pornire | `int suma = 0;` |
| Produsul rezultă `0` | Acumulatorul de produs a pornit de la `0` | `int produs = 1;` |
| Suma este doar ultimul număr | `int suma = 0;` este în interiorul buclei | Mută-l înainte de `for` |
| Maximul este greșit pentru numere negative | Ai pornit `maxim` de la `0` | Pornește-l de la primul număr citit |
| Media are doar partea întreagă | Împărțire între `int` | `(double)suma / n` |
| Rezultat negativ sau ciudat la factorial | Depășire de `int` | Folosește `long long` |
| Se citește un număr în plus sau în minus | Bucla are `i <= n` dar începe de la 0 | Verifică intervalul pe un exemplu mic |
| Contorul nu crește | `contor++` este în afara `if` | `if (conditie) { contor++; }` |
| Programul cere un număr în plus | Ai pus `cin >> x` și înainte de buclă, și în buclă, fără să ajustezi începutul | Dacă citești primul număr înainte, pornește bucla de la `i = 2` |

---

## Recapitulare pe scurt

- **Acumulator de sumă:** `int suma = 0;` înaintea buclei, apoi `suma += valoare;`.
- **Acumulator de produs:** `long long produs = 1;`, apoi `produs *= valoare;`.
- **Contor:** `int contor = 0;` și `contor++;` în interiorul unui `if`.
- **Minim și maxim:** pornești de la primul număr citit și înlocuiești când găsești unul mai mare, respectiv mai mic.
- **Citire în buclă:** `for (int i = 1; i <= n; i++) { cin >> x; … }`.
- **Media:** `(double)suma / n`.
- `int` ajunge la aproximativ 2 miliarde. Pentru numere mai mari, `long long`.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie un program care citește `n` și afișează suma numerelor de la 1 la `n` care sunt impare **și** divizibile cu 3.  
3. Scrie un program care citește `n` temperaturi și afișează câte sunt sub 0 grade, câte sunt între 0 și 20 și câte sunt peste 20.  
4. Scrie un program care citește `n` și calculează `1 · 3 · 5 · … ` (produsul numerelor impare până la `n`), folosind `long long`.  
5. **Bonus:** program care citește `n` numere și afișează „Da” dacă **toate** sunt pozitive și „Nu” altfel. (Idee: un contor pentru numerele nepozitive.)  
6. Salvează tot ca `Tema_M2L2_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 3
Învățăm bucla `while`: cum repeți o acțiune **fără să știi dinainte** de câte ori, de exemplu „citește numere până când se introduce 0”.
