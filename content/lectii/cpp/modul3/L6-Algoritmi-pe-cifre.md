# LECȚIA 6 — Algoritmi pe cifre
**Modulul 3 · Funcții, string, algoritmi · 2 ore**  
**Code Maker Club · Problem Solver**

> Azi „desfaci” numerele cifră cu cifră: le aduni, le numeri, le răstorni, le verifici și le transformi în binar. Sunt probleme clasice de olimpiadă, iar soluțiile se bazează pe două operații pe care le cunoști deja: `%` și `/`.  
> Proiect: **„Laboratorul de cifre”** · fișier: `Prenume_Nume_M3L6.cpp` (ex. `Ana_Pop_M3L6.cpp`)

---

## Obiectiv
La finalul orei extragi cifrele unui număr, scrii funcții pentru suma cifrelor, numărul de cifre, oglindit și palindrom, cifra maximă, aparițiile unei cifre, construiești numere noi din cifre și transformi un număr în binar.  
**Minim:** funcțiile `sumaCifrelor`, `numarCifre` și `oglindit`.  
**Ținta orei (Complet):** + palindrom numeric, cifra maximă, conversia în binar și un meniu care le folosește.

## De ce contează
Multe probleme cer „ceva despre cifrele unui număr”: validarea unui cod (CNP, card bancar), jocuri cu numere, concursuri de informatică. Tehnica de azi te învață să gândești pas cu pas, iar rezultatele le scrii ca funcții, pe care le poți reutiliza oriunde.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `%`, `/`, `while` și funcții cu `return` |
| 10–30 | Ultima cifră, scoaterea ei, suma și numărul de cifre (**Exemplele 1–3**) |
| 30–55 | Oglindit, palindrom, cifra maximă (**Exemplele 4–6**) |
| 55–80 | Aparițiile unei cifre, produs, prima cifră (**Exemplele 7–9**) |
| 80–100 | Binar, construirea unui număr nou (**Exemplele 10–12**) |
| 100–118 | Numere speciale (**Exemplele 13–15**, nivel mai ridicat) și proiectul (**Exemplul 16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **7 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Ideea de bază: ultima cifră și „tăierea” ei

Două operații rezolvă aproape totul:

| Operație | Ce face | Exemplu pentru `n = 4827` |
|----------|---------|---------------------------|
| `n % 10` | dă **ultima cifră** | `4827 % 10 = 7` |
| `n / 10` | **taie** ultima cifră | `4827 / 10 = 482` |

Dacă le repeți într-o buclă `while (n > 0)`, treci prin toate cifrele, de la ultima către prima.

```
n = 4827   →  cifra 7,  n devine 482
n = 482    →  cifra 2,  n devine 48
n = 48     →  cifra 8,  n devine 4
n = 4      →  cifra 4,  n devine 0   → STOP
```

### Exemplul 1 — Cifrele, de la ultima la prima **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 4827;

    cout << "Cifrele lui " << n << " (de la coada): ";
    while (n > 0) {
        int cifra = n % 10;
        cout << cifra << " ";
        n = n / 10;
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Cifrele lui 4827 (de la coada): 7 2 8 4 
```

Observă că `n` se micșorează până ajunge la `0`; de aceea, dacă ai nevoie de numărul inițial mai târziu, îl salvezi într-o altă variabilă (`copie`) înainte de buclă.

### Exemplul 2 — Suma cifrelor **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int sumaCifrelor(long long n) {
    int suma = 0;
    while (n > 0) {
        suma += n % 10;
        n /= 10;
    }
    return suma;
}

int main() {
    cout << "Suma cifrelor lui 4827 = " << sumaCifrelor(4827) << endl;
    cout << "Suma cifrelor lui 100 = " << sumaCifrelor(100) << endl;
    cout << "Suma cifrelor lui 999999 = " << sumaCifrelor(999999) << endl;
    cout << "Suma cifrelor lui 0 = " << sumaCifrelor(0) << endl;
    return 0;
}
```

**Ieșire:**
```
Suma cifrelor lui 4827 = 21
Suma cifrelor lui 100 = 1
Suma cifrelor lui 999999 = 54
Suma cifrelor lui 0 = 0
```

Parametrul `n` este o **copie** (lecția 2), așa că bucla poate să-l strice liniștit: numărul din `main` rămâne neschimbat. De aceea nu mai avem nevoie de variabila `copie`.

### Exemplul 3 — Câte cifre are un număr **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int numarCifre(long long n) {
    int cifre = 0;
    do {
        cifre++;
        n /= 10;
    } while (n > 0);
    return cifre;
}

int main() {
    cout << "7 are " << numarCifre(7) << " cifra" << endl;
    cout << "4827 are " << numarCifre(4827) << " cifre" << endl;
    cout << "1000000 are " << numarCifre(1000000) << " cifre" << endl;
    cout << "0 are " << numarCifre(0) << " cifra" << endl;
    return 0;
}
```

**Ieșire:**
```
7 are 1 cifra
4827 are 4 cifre
1000000 are 7 cifre
0 are 1 cifra
```

Am folosit `do-while`, pentru ca numărul `0` să fie socotit corect ca având **o** cifră (Modulul 2, lecția 4). Cu `while (n > 0)`, rezultatul pentru `0` ar fi fost `0`.

**Încearcă tu (8 min)**  
- [ ] Scrii o funcție `ultimaCifra(int n)` și una `faraUltimaCifra(int n)`  
- [ ] Calculezi suma cifrelor lui 12345 pe hârtie, pas cu pas  
- [ ] Afli câte cifre are `2147483647`  

---

## 2. Oglindit, palindrom, cifra maximă

### Exemplul 4 — Numărul oglindit **[Esențial]**

La fiecare pas luăm ultima cifră a lui `n` și o **adăugăm la sfârșitul** rezultatului: `rezultat = rezultat * 10 + cifra`.

```
n = 4827, rezultat = 0
cifra 7:  rezultat = 0*10 + 7 = 7
cifra 2:  rezultat = 7*10 + 2 = 72
cifra 8:  rezultat = 72*10 + 8 = 728
cifra 4:  rezultat = 728*10 + 4 = 7284
```

```cpp
#include <iostream>
using namespace std;

long long oglindit(long long n) {
    long long rezultat = 0;
    while (n > 0) {
        rezultat = rezultat * 10 + n % 10;
        n /= 10;
    }
    return rezultat;
}

int main() {
    cout << "oglindit(4827) = " << oglindit(4827) << endl;
    cout << "oglindit(120) = " << oglindit(120) << endl;
    cout << "oglindit(9) = " << oglindit(9) << endl;
    return 0;
}
```

**Ieșire:**
```
oglindit(4827) = 7284
oglindit(120) = 21
oglindit(9) = 9
```

Pentru `120`, rezultatul este `21` (nu `021`): zerourile de la început dispar, fiindcă un număr nu poate începe cu zero.

### Exemplul 5 — Numere palindrom **[Esențial]**

Un număr este **palindrom** dacă este egal cu oglinditul lui (`121`, `4554`, `7`).

```cpp
#include <iostream>
using namespace std;

long long oglindit(long long n) {
    long long rezultat = 0;
    while (n > 0) {
        rezultat = rezultat * 10 + n % 10;
        n /= 10;
    }
    return rezultat;
}

bool estePalindrom(long long n) {
    return n == oglindit(n);
}

int main() {
    cout << "Palindroame intre 100 si 200: ";
    for (int i = 100; i <= 200; i++) {
        if (estePalindrom(i)) {
            cout << i << " ";
        }
    }
    cout << endl;

    cout << "12321: " << estePalindrom(12321) << endl;
    cout << "12345: " << estePalindrom(12345) << endl;
    return 0;
}
```

**Ieșire:**
```
Palindroame intre 100 si 200: 101 111 121 131 141 151 161 171 181 191 
12321: 1
12345: 0
```

Funcția `estePalindrom` este de o singură linie, pentru că `oglindit` face munca grea. Așa se construiesc programele: din funcții mici, bine testate.

### Exemplul 6 — Cifra maximă și cifra minimă

```cpp
#include <iostream>
using namespace std;

int cifraMaxima(long long n) {
    int maxim = 0;
    while (n > 0) {
        int cifra = n % 10;
        if (cifra > maxim) {
            maxim = cifra;
        }
        n /= 10;
    }
    return maxim;
}

int cifraMinima(long long n) {
    int minim = 9;
    while (n > 0) {
        int cifra = n % 10;
        if (cifra < minim) {
            minim = cifra;
        }
        n /= 10;
    }
    return minim;
}

int main() {
    long long numere[3] = {4827, 5555, 90817};

    for (int i = 0; i < 3; i++) {
        cout << numere[i] << ": maxima " << cifraMaxima(numere[i])
             << ", minima " << cifraMinima(numere[i]) << endl;
    }
    return 0;
}
```

**Ieșire:**
```
4827: maxima 8, minima 2
5555: maxima 5, minima 5
90817: maxima 9, minima 0
```

Pentru maxim pornim de la `0` (cea mai mică cifră posibilă), iar pentru minim de la `9` (cea mai mare). Cifrele sunt mereu între 0 și 9, deci aceste valori inițiale sunt sigure.

---

## 3. Aparițiile unei cifre, produs, prima cifră

### Exemplul 7 — De câte ori apare o cifră **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int aparitii(long long n, int cifra) {
    int contor = 0;
    while (n > 0) {
        if (n % 10 == cifra) {
            contor++;
        }
        n /= 10;
    }
    return contor;
}

int main() {
    cout << "Cifra 3 in 3133: " << aparitii(3133, 3) << endl;
    cout << "Cifra 1 in 3133: " << aparitii(3133, 1) << endl;
    cout << "Cifra 7 in 3133: " << aparitii(3133, 7) << endl;
    return 0;
}
```

**Ieșire:**
```
Cifra 3 in 3133: 3
Cifra 1 in 3133: 1
Cifra 7 in 3133: 0
```

Aceasta este numărarea clasică, cu o condiție în buclă. Atenție: dacă ai căuta cifra `0` într-un număr care este chiar `0`, funcția ar da `0` apariții (bucla nu rulează); un caz special pe care îl poți trata ca temă.

### Exemplul 8 — Pare, impare, produs

```cpp
#include <iostream>
using namespace std;

int main() {
    long long n = 2736451;
    long long copie = n;

    int sumaPare = 0;
    int sumaImpare = 0;
    long long produs = 1;

    while (copie > 0) {
        int cifra = copie % 10;
        if (cifra % 2 == 0) {
            sumaPare += cifra;
        } else {
            sumaImpare += cifra;
        }
        produs *= cifra;
        copie /= 10;
    }

    cout << "Numarul: " << n << endl;
    cout << "Suma cifrelor pare: " << sumaPare << endl;
    cout << "Suma cifrelor impare: " << sumaImpare << endl;
    cout << "Produsul cifrelor: " << produs << endl;
    return 0;
}
```

**Ieșire:**
```
Numarul: 2736451
Suma cifrelor pare: 12
Suma cifrelor impare: 16
Produsul cifrelor: 5040
```

Pentru produs pornim de la `1` (elementul neutru la înmulțire). Dacă una dintre cifre este `0`, tot produsul devine `0`.

### Exemplul 9 — Prima cifră

Tăiem cifre până când rămâne una singură: prima.

```cpp
#include <iostream>
using namespace std;

int primaCifra(long long n) {
    while (n >= 10) {
        n /= 10;
    }
    return n;
}

int main() {
    cout << "Prima cifra a lui 4827: " << primaCifra(4827) << endl;
    cout << "Prima cifra a lui 90000: " << primaCifra(90000) << endl;
    cout << "Prima cifra a lui 6: " << primaCifra(6) << endl;
    return 0;
}
```

**Ieșire:**
```
Prima cifra a lui 4827: 4
Prima cifra a lui 90000: 9
Prima cifra a lui 6: 6
```

Condiția este `n >= 10`, nu `n > 0`: ne oprim când mai rămâne o singură cifră, care este chiar prima.

**Încearcă tu (10 min)**  
- [ ] Scrii o funcție care returnează diferența dintre prima și ultima cifră  
- [ ] Numeri câte cifre impare are un număr  
- [ ] Verifici dacă toate cifrele unui număr sunt egale (`7777`)  

---

## 4. Binar și construirea unui număr nou

### Exemplul 10 — Din zecimal în binar și înapoi

```cpp
#include <iostream>
#include <string>
using namespace std;

string inBinar(int n) {
    if (n == 0) {
        return "0";
    }
    string rezultat = "";
    while (n > 0) {
        rezultat = (char)('0' + n % 2) + rezultat;
        n /= 2;
    }
    return rezultat;
}

int dinBinar(string s) {
    int valoare = 0;
    int lungime = s.length();
    for (int i = 0; i < lungime; i++) {
        valoare = valoare * 2 + (s[i] - '0');
    }
    return valoare;
}

int main() {
    cout << "10 in binar: " << inBinar(10) << endl;
    cout << "255 in binar: " << inBinar(255) << endl;
    cout << "1010 din binar: " << dinBinar("1010") << endl;
    cout << "11111111 din binar: " << dinBinar("11111111") << endl;
    return 0;
}
```

**Ieșire:**
```
10 in binar: 1010
255 in binar: 11111111
1010 din binar: 10
11111111 din binar: 255
```

Împărțirea repetată la 2 și restul (`n % 2`) dau cifrele binare, de la ultima către prima, așa că le lipim **în fața** rezultatului. Invers, la `dinBinar` parcurgem textul și facem `valoare * 2 + cifra`, aceeași tehnică ca la „oglindit”, doar că în baza 2. Expresia `s[i] - '0'` transformă caracterul `'1'` în numărul `1`.

### Exemplul 11 — Eliminăm toate aparițiile unei cifre

Construim un număr nou din cifrele rămase. Păstrăm ordinea folosind o putere a lui 10.

```cpp
#include <iostream>
using namespace std;

long long elimina(long long n, int cifra) {
    long long rezultat = 0;
    long long pozitie = 1;

    while (n > 0) {
        int c = n % 10;
        if (c != cifra) {
            rezultat += c * pozitie;
            pozitie *= 10;
        }
        n /= 10;
    }
    return rezultat;
}

int main() {
    cout << "elimina(1213141, 1) = " << elimina(1213141, 1) << endl;
    cout << "elimina(5050, 0) = " << elimina(5050, 0) << endl;
    cout << "elimina(777, 7) = " << elimina(777, 7) << endl;
    return 0;
}
```

**Ieșire:**
```
elimina(1213141, 1) = 234
elimina(5050, 0) = 55
elimina(777, 7) = 0
```

Variabila `pozitie` ia valorile 1, 10, 100, ... și ne spune unde trebuie pusă următoarea cifră păstrată. Dacă toate cifrele sunt eliminate, rezultatul este `0`.

### Exemplul 12 — Adăugăm o cifră la început sau la sfârșit

```cpp
#include <iostream>
using namespace std;

long long adaugaLaSfarsit(long long n, int cifra) {
    return n * 10 + cifra;
}

long long adaugaLaInceput(long long n, int cifra) {
    long long putere = 1;
    long long copie = n;
    while (copie > 0) {
        putere *= 10;
        copie /= 10;
    }
    return cifra * putere + n;
}

int main() {
    cout << adaugaLaSfarsit(482, 7) << endl;
    cout << adaugaLaInceput(482, 7) << endl;
    cout << adaugaLaSfarsit(5, 0) << endl;
    return 0;
}
```

**Ieșire:**
```
4827
7482
50
```

La sfârșit este ușor: înmulțești cu 10 și aduni cifra. La început, trebuie să afli cu ce putere a lui 10 o înmulțești: pentru un număr de 3 cifre, `1000`. Prima buclă calculează tocmai acea putere.

---

## 5. Numere speciale și proiect

> **Notă:** de aici înainte exemplele sunt mai grele. Ele sunt pentru cei care vor mai mult; dacă te simți nesigur, citește-le doar ca să vezi ce se poate face și treci direct la proiect. **Proiectul lecției se poate face fără ele.**

### Exemplul 13 — Numere Armstrong *(Provocare, opțional)*

Un număr de 3 cifre este **Armstrong** dacă suma cuburilor cifrelor lui este egală cu el însuși. De exemplu `153 = 1³ + 5³ + 3³ = 1 + 125 + 27`.

```cpp
#include <iostream>
using namespace std;

bool esteArmstrong(int n) {
    int suma = 0;
    int copie = n;
    while (copie > 0) {
        int c = copie % 10;
        suma += c * c * c;
        copie /= 10;
    }
    return suma == n;
}

int main() {
    cout << "Numere Armstrong de 3 cifre: ";
    for (int i = 100; i <= 999; i++) {
        if (esteArmstrong(i)) {
            cout << i << " ";
        }
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Numere Armstrong de 3 cifre: 153 370 371 407 
```

Există doar patru astfel de numere de trei cifre. Observă că am păstrat `copie`: avem nevoie de `n` la final, pentru comparație.

### Exemplul 14 — Rădăcina digitală *(Provocare, opțional)*

Aduni cifrele unui număr, apoi cifrele sumei, și tot așa, până rămâne o singură cifră. Exemplu: `9875 → 29 → 11 → 2`.

```cpp
#include <iostream>
using namespace std;

int sumaCifrelor(long long n) {
    int suma = 0;
    while (n > 0) {
        suma += n % 10;
        n /= 10;
    }
    return suma;
}

int radacinaDigitala(long long n) {
    while (n >= 10) {
        cout << n << " -> ";
        n = sumaCifrelor(n);
    }
    cout << n << endl;
    return n;
}

int main() {
    radacinaDigitala(9875);
    radacinaDigitala(12345);
    radacinaDigitala(7);
    return 0;
}
```

**Ieșire:**
```
9875 -> 29 -> 11 -> 2
12345 -> 15 -> 6
7
```

Funcția afișează pașii, ca să vezi cum se micșorează numărul. Folosește o funcție creată mai înainte (`sumaCifrelor`) în interiorul alteia: același principiu din lecția 3.

### Exemplul 15 — Numere cu cifre în ordine crescătoare *(Provocare, opțional)*

Un număr are cifrele **crescătoare** dacă fiecare cifră este mai mică sau egală cu cea de după ea (`1359`, `2244`). Mergem de la coadă: fiecare cifră trebuie să fie mai mare sau egală cu cea dinaintea ei (spre stânga).

```cpp
#include <iostream>
using namespace std;

bool cifreCrescatoare(long long n) {
    int anterioara = 9;
    while (n > 0) {
        int cifra = n % 10;
        if (cifra > anterioara) {
            return false;
        }
        anterioara = cifra;
        n /= 10;
    }
    return true;
}

int main() {
    long long numere[5] = {1359, 2244, 4321, 1213, 7};

    for (int i = 0; i < 5; i++) {
        cout << numere[i] << ": ";
        if (cifreCrescatoare(numere[i])) {
            cout << "cifre crescatoare" << endl;
        } else {
            cout << "nu" << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
1359: cifre crescatoare
2244: cifre crescatoare
4321: nu
1213: nu
7: cifre crescatoare
```

Pornim de la ultima cifră. Pe măsură ce mergem spre stânga, cifrele nu au voie să **crească** (altfel numărul, citit normal, n-ar mai fi crescător). Pentru `1213`, de la coadă vedem 3, 1, 2: după `1` apare `2`, care este mai mare, deci verificarea eșuează.

### Exemplul 16 — „Laboratorul de cifre” (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Laboratorul de cifre
   Scop:    meniu cu algoritmi pe cifrele unui numar
*/
#include <iostream>
#include <string>
using namespace std;

int numarCifre(long long n) {
    int cifre = 0;
    do {
        cifre++;
        n /= 10;
    } while (n > 0);
    return cifre;
}

int sumaCifrelor(long long n) {
    int suma = 0;
    while (n > 0) {
        suma += n % 10;
        n /= 10;
    }
    return suma;
}

long long oglindit(long long n) {
    long long rezultat = 0;
    while (n > 0) {
        rezultat = rezultat * 10 + n % 10;
        n /= 10;
    }
    return rezultat;
}

bool estePalindrom(long long n) {
    return n == oglindit(n);
}

int cifraMaxima(long long n) {
    int maxim = 0;
    while (n > 0) {
        if (n % 10 > maxim) {
            maxim = n % 10;
        }
        n /= 10;
    }
    return maxim;
}

string inBinar(long long n) {
    if (n == 0) {
        return "0";
    }
    string rezultat = "";
    while (n > 0) {
        rezultat = (char)('0' + n % 2) + rezultat;
        n /= 2;
    }
    return rezultat;
}

void raport(long long n) {
    cout << endl << "--- Raport pentru " << n << " ---" << endl;
    cout << "Numar de cifre:  " << numarCifre(n) << endl;
    cout << "Suma cifrelor:   " << sumaCifrelor(n) << endl;
    cout << "Cifra maxima:    " << cifraMaxima(n) << endl;
    cout << "Oglindit:        " << oglindit(n) << endl;
    if (estePalindrom(n)) {
        cout << "Palindrom:       da" << endl;
    } else {
        cout << "Palindrom:       nu" << endl;
    }
    cout << "In binar:        " << inBinar(n) << endl;
}

int main() {
    long long n;
    char alt;

    do {
        do {
            cout << "Introdu un numar natural: ";
            cin >> n;
        } while (n < 0);

        raport(n);

        cout << endl << "Alt numar? (d/n): ";
        cin >> alt;
    } while (alt == 'd' || alt == 'D');

    cout << "La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `12321`, `d`, `-5`, `250`, `n`):
```
Introdu un numar natural: 12321

--- Raport pentru 12321 ---
Numar de cifre:  5
Suma cifrelor:   9
Cifra maxima:    3
Oglindit:        12321
Palindrom:       da
In binar:        11000000100001

Alt numar? (d/n): d
Introdu un numar natural: -5
Introdu un numar natural: 250

--- Raport pentru 250 ---
Numar de cifre:  3
Suma cifrelor:   7
Cifra maxima:    5
Oglindit:        52
Palindrom:       nu
In binar:        11111010

Alt numar? (d/n): n
La revedere!
```

Programul reunește funcții mici, fiecare cu o singură sarcină, iar `raport` le apelează pe toate. Poți adăuga ușor o funcție nouă: o scrii și o apelezi într-o singură linie din `raport`. La numere mari (de ordinul zecilor de cifre), `long long` nu mai ajunge; aici lucrăm cu numere de până la 18 cifre.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Laboratorul de cifre” (obligatoriu)
Scrie programul din Exemplul 16 și adaugă încă două funcții la raport: `cifraMinima` și `aparitii` (cifra căutată se citește de la tastatură).

### Exercițiul B — Numere cu proprietăți
Scrie un program care afișează toate numerele de la 1 la 1000 care sunt simultan palindroame și au suma cifrelor pară.

### Exercițiul C — Cifra de control *(Provocare, opțional)*
Scrie funcția `cifraDeControl(long long n)` care aplică rădăcina digitală (fără afișare) și afișează cifra de control pentru 5 numere citite.

### Exercițiul D — Binar
Scrie un program care citește un număr și afișează câte cifre `1` are în scrierea binară. (Indiciu: parcurgi textul returnat de `inBinar`.)

### Exercițiul E — Elimină cifra
Citește un număr și o cifră. Afișează numărul după ce îi elimini toate aparițiile cifrei, apoi spune dacă rezultatul este palindrom.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Fiecare algoritm este o funcție separată cu `return`  
- [ ] Numărul inițial nu este stricat acolo unde mai ai nevoie de el  
- [ ] Ai testat numere cu o cifră, cu zerouri și numărul `0`  
- [ ] `main` doar citește și apelează funcții  
- [ ] Fișierul se numește `Prenume_Nume_M3L6.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Afișează toate numerele de 4 cifre cu suma cifrelor egală cu 10  
- [ ] Scrie funcția `cifreDistincte(n)` care numără câte cifre diferite are un număr  
- [ ] Verifică dacă un număr este „perfect” (suma divizorilor lui, fără el însuși, este egală cu el)  
- [ ] Scrie o funcție care sortează cifrele unui număr în ordine crescătoare (`4271` → `1247`)  
- [ ] Afișează cel mai mare și cel mai mic număr care se poate forma din cifrele lui `4271`  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Bucla nu rulează pentru `0` | `while (n > 0)` nu intră pentru 0 | `do-while`, sau tratezi `0` separat |
| Ai nevoie de `n` la final, dar e `0` | Bucla l-a modificat | Lucrează pe o `copie` (sau pe parametrul-copie al funcției) |
| Rezultat greșit la numere mari | `int` a depășit limita (~2 miliarde) | Folosește `long long` |
| `oglindit` pierde zerourile | Numerele nu păstrează zerouri la început | Normal: `120` oglindit este `21` |
| Produsul cifrelor este mereu `0` | Ai pornit cu `produs = 0` | `produs = 1` |
| Maximul este greșit | Ai pornit cu o valoare nepotrivită | Maxim: de la `0`; minim: de la `9` |
| Obții „restul” numărului în loc de ultima cifră | Ai încurcat operatorii `%` și `/` | `n % 10` = ultima cifră; `n / 10` = numărul fără ultima cifră |
| Binar scris în ordine inversă | Ai adăugat cifra la sfârșit | Lipește cifra **în fața** textului |

---

## Recapitulare pe scurt

- `n % 10` = ultima cifră; `n / 10` = numărul fără ultima cifră.
- Parcurgerea cifrelor: `while (n > 0) { cifra = n % 10; … n /= 10; }`
- **Suma:** `suma += cifra`. **Număr de cifre:** contor (cu `do-while`, ca `0` să aibă o cifră).
- **Oglindit:** `rezultat = rezultat * 10 + cifra`.
- **Palindrom numeric:** `n == oglindit(n)`.
- **Maxim/minim de cifre:** maxim de la `0`, minim de la `9`.
- **Prima cifră:** `while (n >= 10) n /= 10;`
- **Binar:** împărțiri repetate la 2; restul se lipește **în fața** rezultatului.
- Pentru a păstra ordinea la construirea unui număr nou: folosești `pozitie` (1, 10, 100…).

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie funcțiile `sumaCifrelorPare(n)` și `numarCifreImpare(n)` și testează-le pe 5 numere citite.  
3. Afișează toate numerele palindrom de 3 cifre cu suma cifrelor mai mare ca 10, și câte sunt.  
4. Scrie un program care citește un număr natural și afișează numărul de cifre `0` din scrierea lui binară.  
5. **Bonus:** scrie funcția `sortareCifre(n)` care returnează numărul format cu cifrele lui `n` așezate crescător.  
6. Salvează tot ca `Tema_M3L6_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 7
Studiem divizorii: **când se împarte exact un număr la altul**, cum recunoaștem numerele prime și cum calculăm cel mai mare divizor comun.
