# LECȚIA 9 — Debugging și stil de cod
**Modulul 3 · Funcții, string, algoritmi · 2 ore**  
**Code Maker Club · Problem Solver**

> Orice programator greșește, zilnic. Diferența dintre un începător și un profesionist este că profesionistul **știe cum să găsească și să repare greșelile**. Azi înveți să citești mesajele compilatorului, să urmărești un program pas cu pas și să scrii cod curat, ca să faci mai puține greșeli.  
> Proiect: **„Repară 5 programe”** · fișier: `Prenume_Nume_M3L9.cpp` (ex. `Ana_Pop_M3L9.cpp`)

---

## Obiectiv
La finalul orei deosebești tipurile de erori (de sintaxă, de logică, de execuție), citești un mesaj de eroare, folosești afișări de control și tabelul de urmărire, verifici funcții cu `assert`, scrii cod citibil (nume clare, indentare, constante, funcții mici) și repari cinci programe cu greșeli.  
**Minim:** repari trei dintre cele cinci programe din proiect.  
**Ținta orei (Complet):** repari toate cele cinci programe, explici fiecare greșeală și rescrii un program „urât” într-unul curat.

## De ce contează
Programatorii petrec mult mai mult timp citind și reparând cod decât scriind cod nou. Un program cu greșeli nu e o rușine: e normal. Dar un program greu de citit este greu de reparat, nu doar de către alții, ci și de către tine, peste o lună. Ordinea și metoda economisesc ore întregi.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: funcții, string, `rand` |
| 10–25 | Cele trei tipuri de erori; erori de sintaxă (**Exemplul 1**) |
| 25–65 | Greșeli de logică clasice (**Exemplele 2–9**) |
| 65–85 | Tehnici de depanare: afișări, tabel de urmărire, `assert` (**Exemplele 10–12**) |
| 85–100 | Stil de cod: nume, indentare, constante, funcții (**Exemplele 13–15**) |
| 100–118 | Proiect: repară 5 programe (**Exemplul 16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Tipuri de erori

| Tip | Când apare | Cum o recunoști |
|-----|-----------|------------------|
| **Eroare de sintaxă** | La compilare | Compilatorul refuză să construiască programul și îți arată un mesaj cu linia |
| **Eroare de logică** | La rulare | Programul merge, dar **rezultatul este greșit** |
| **Eroare de execuție** | În timpul rulării | Programul se oprește brusc sau se blochează (de exemplu împărțire la zero, ieșire din vector) |

Cel mai greu de găsit sunt erorile de logică, pentru că nimeni nu îți spune unde sunt. Pentru ele ai nevoie de metodă.

### Exemplul 1 — Erori de sintaxă tipice **[Esențial]**

Fiecare linie de mai jos conține o greșeală de sintaxă:

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 5                       // 1: lipseste ;
    cout << "x = " << x << endl;
    cout << "Salut << endl;         // 2: lipsesc ghilimelele de inchidere
    int y = 3;
    if (x > y {                     // 3: lipseste )
        cout << "x e mai mare" << endl;
    }
    cot << "Gata" << endl;          // 4: cot in loc de cout
    return 0;
}
```

Cum citești mesajele compilatorului:
- Mesajul indică **un nume de fișier și un număr de linie** (de exemplu `main.cpp:5`). Pornește de la **prima** eroare din listă.
- Greșeala poate fi **pe linia dinaintea** celei indicate (un `;` uitat se observă abia pe linia următoare).
- O singură greșeală poate produce multe mesaje; repari prima, recompilezi, și multe dispar.
- Fraze folosite des: `expected ';' before …` (lipsește un `;`), `'cot' was not declared in this scope` (nume scris greșit sau variabilă nedeclarată), `expected ')' before '{' token` (paranteză lipsă).

**Regula de aur:** repară câte **o** eroare, recompilează, apoi treci la următoarea.

---

## 2. Greșeli de logică clasice

Programele următoare **compilează** și **rulează**, dar fac altceva decât vrei. Pentru fiecare: ghicește greșeala înainte să citești explicația.

### Exemplul 2 — „Cu unu mai puțin”: suma de la 1 la `n` **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 5;
    int suma = 0;

    for (int i = 1; i < n; i++) {
        suma += i;
    }

    cout << "Suma de la 1 la " << n << " = " << suma << endl;
    return 0;
}
```

**Ieșire:**
```
Suma de la 1 la 5 = 10
```

Ar trebui să fie `15`. **Greșeala:** `i < n` oprește bucla înainte de `n`. **Reparație:** `i <= n`. Aceasta este eroarea „*off-by-one*” (cu unu mai puțin sau mai mult), probabil cea mai frecventă din programare. Verifică mereu **limitele** buclelor: primul și ultimul element.

### Exemplul 3 — `=` în loc de `==` **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota = 4;

    if (nota = 10) {
        cout << "Felicitari, ai nota 10!" << endl;
    } else {
        cout << "Mai incearca." << endl;
    }

    cout << "Nota ta este " << nota << endl;
    return 0;
}
```

**Ieșire:**
```
Felicitari, ai nota 10!
Nota ta este 10
```

Compilatorul te avertizează aici (`suggest parentheses around assignment used as truth value`). **Greșeala:** `nota = 10` **atribuie** valoarea `10` (și o și modifică!), în loc să **compare**. Condiția este adevărată pentru că `10` nu este zero. **Reparație:** `if (nota == 10)`. Citește mereu avertismentele: sunt prietenii tăi.

### Exemplul 4 — Împărțire între numere întregi **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int puncte = 17;
    int total = 20;

    double procent = puncte / total * 100;
    cout << "Procent: " << procent << "%" << endl;
    return 0;
}
```

**Ieșire:**
```
Procent: 0%
```

Ar trebui `85%`. **Greșeala:** `17 / 20` între doi întregi dă `0`, iar `0 * 100` este `0`. **Reparație:** `double procent = (double)puncte / total * 100;` sau `puncte * 100.0 / total`.

### Exemplul 5 — Variabila care nu este repusă la zero

```cpp
#include <iostream>
using namespace std;

int main() {
    int suma = 0;
    for (int elev = 1; elev <= 3; elev++) {
        for (int zi = 1; zi <= 2; zi++) {
            suma += elev;
        }
        cout << "Elevul " << elev << ": total " << suma << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Elevul 1: total 2
Elevul 2: total 6
Elevul 3: total 12
```

Fiecare elev ar trebui să aibă totalul lui (2, 4, 6), dar totalurile se adună între ele. **Greșeala:** `suma` este declarată **în afara** buclei pentru elevi, deci nu se repune pe `0` pentru elevul următor. **Reparație:** mută `int suma = 0;` în interiorul buclei `for (int elev …)`. Regula: un acumulator se inițializează **imediat înainte** de bucla care îl folosește.

### Exemplul 6 — `;` greșit după `for` sau `if` **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 3;

    if (n > 10);
    {
        cout << "n este mare" << endl;
    }

    for (int i = 0; i < 3; i++);
    {
        cout << "Salut!" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
n este mare
Salut!
```

Te-ai aștepta ca primul `if` să nu afișeze nimic (`n` nu este mai mare ca 10), iar `for`-ul să afișeze „Salut!” de trei ori. În realitate, ambele mesaje apar o singură dată. **Greșeala:** `;` după `)` face ca `if`-ul și `for`-ul să aibă un **corp vid**; blocul `{ … }` de după se execută o singură dată, de sine stătător. **Reparație:** șterge `;` de după paranteză. Compilatorul avertizează (`suggest braces around empty body`).

### Exemplul 7 — Ordinea operațiilor

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 8;
    int b = 4;

    double medie = a + b / 2;
    cout << "Media lui " << a << " si " << b << " = " << medie << endl;
    return 0;
}
```

**Ieșire:**
```
Media lui 8 si 4 = 10
```

Ar trebui `6`. **Greșeala:** împărțirea se face înaintea adunării: `a + (b / 2)` = `8 + 2`. **Reparație:** paranteze: `(a + b) / 2.0`. Când nu ești sigur de ordinea operațiilor, **pune paranteze**.

### Exemplul 8 — Bucla care nu se termină (cu o plasă de siguranță)

```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 1;
    int siguranta = 0;

    while (i <= 5) {
        cout << "i = " << i << endl;
        siguranta++;
        if (siguranta > 8) {
            cout << "STOP: bucla pare infinita!" << endl;
            break;
        }
    }
    return 0;
}
```

**Ieșire:**
```
i = 1
i = 1
i = 1
i = 1
i = 1
i = 1
i = 1
i = 1
i = 1
STOP: bucla pare infinita!
```

**Greșeala:** în buclă nu se modifică niciodată `i`, deci condiția `i <= 5` rămâne adevărată la nesfârșit. **Reparație:** adaugă `i++;` în buclă. Variabila `siguranta` este o plasă de protecție folosită doar la depanare: oprește programul dacă bucla trece de un număr rezonabil de repetări. Dacă ai o buclă infinită în programul tău, oprește-l cu **Ctrl + C** în terminal.

### Exemplul 9 — Variabila „umbrită”

```cpp
#include <iostream>
using namespace std;

int main() {
    int scor = 0;

    for (int i = 1; i <= 3; i++) {
        int scor = i * 10;
        cout << "Runda " << i << ", scor local: " << scor << endl;
    }

    cout << "Scor final: " << scor << endl;
    return 0;
}
```

**Ieșire:**
```
Runda 1, scor local: 10
Runda 2, scor local: 20
Runda 3, scor local: 30
Scor final: 0
```

Ar trebui ca scorul final să fie `30`. **Greșeala:** `int scor = i * 10;` în interiorul buclei **creează o variabilă nouă**, cu același nume, care „umbrește” variabila din afara buclei. Cea din `main` nu a fost modificată. **Reparație:** scrie `scor = i * 10;` (fără `int`). Atenția la cuvântul `int`: când vrei să modifici o variabilă existentă, nu o mai declara!

**Încearcă tu (10 min)**  
- [ ] Compilezi Exemplul 1 și citești fiecare mesaj de eroare  
- [ ] Repari Exemplele 2, 4 și 7 și verifici rezultatele  
- [ ] Scrii un program cu o buclă „off-by-one” și îl repari  

---

## 3. Tehnici de depanare

### Exemplul 10 — Afișări de control (*print debugging*) **[Esențial]**

Dacă nu știi unde e greșeala, afișează valorile variabilelor în punctele importante, ca să vezi ce se întâmplă de fapt.

```cpp
#include <iostream>
using namespace std;

int maximVector(int v[], int n) {
    int maxim = 0;
    for (int i = 0; i < n; i++) {
        cout << "  [debug] i=" << i << " v[i]=" << v[i] << " maxim=" << maxim << endl;
        if (v[i] > maxim) {
            maxim = v[i];
        }
    }
    return maxim;
}

int main() {
    int temperaturi[4] = {-5, -2, -9, -3};

    int rezultat = maximVector(temperaturi, 4);
    cout << "Maximul: " << rezultat << endl;
    return 0;
}
```

**Ieșire:**
```
  [debug] i=0 v[i]=-5 maxim=0
  [debug] i=1 v[i]=-2 maxim=0
  [debug] i=2 v[i]=-9 maxim=0
  [debug] i=3 v[i]=-3 maxim=0
Maximul: 0
```

Din afișări vezi că `maxim` rămâne `0` tot timpul, pentru că toate temperaturile sunt negative. **Greșeala:** inițializarea `maxim = 0`. **Reparație:** `int maxim = v[0];`. După reparație ștergi liniile `[debug]`. Un truc: scrie afișările de control cu un prefix ușor de căutat (`[debug]`), ca să nu uiți vreuna în programul final.

### Exemplul 11 — Tabelul de urmărire (*trace table*)

Pentru un algoritm pe care nu îl înțelegi, completează pe hârtie un tabel cu valorile variabilelor după **fiecare pas**. Exemplu pentru suma cifrelor lui `472`:

| Pas | `n` | `n % 10` | `suma` după pas |
|-----|-----|----------|-----------------|
| start | 472 | – | 0 |
| 1 | 47 | 2 | 2 |
| 2 | 4 | 7 | 9 |
| 3 | 0 | 4 | 13 |

Programul care construiește automat același tabel:

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 472;
    int suma = 0;
    int pas = 0;

    cout << "pas | n   | cifra | suma" << endl;
    while (n > 0) {
        int cifra = n % 10;
        suma += cifra;
        n /= 10;
        pas++;
        cout << "  " << pas << " | " << n << "   | " << cifra << "     | " << suma << endl;
    }
    return 0;
}
```

**Ieșire:**
```
pas | n   | cifra | suma
  1 | 47   | 2     | 2
  2 | 4   | 7     | 9
  3 | 0   | 4     | 13
```

Dacă tabelul de pe hârtie diferă de cel din program, locul unde apare diferența este locul greșelii. Metoda funcționează și pe un examen, fără calculator.

### Exemplul 12 — `assert`: testele care verifică singure

`assert(condiție)` (din `<cassert>`) oprește programul cu un mesaj dacă `condiția` este falsă. Este un mod de a-i spune calculatorului: „sunt sigur că aici lucrurile stau așa”.

```cpp
#include <iostream>
#include <cassert>
using namespace std;

int maxim(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}

bool estePar(int n) {
    return n % 2 == 0;
}

int main() {
    assert(maxim(3, 7) == 7);
    assert(maxim(7, 3) == 7);
    assert(maxim(-5, -2) == -2);
    assert(maxim(4, 4) == 4);
    assert(estePar(0));
    assert(estePar(10));
    assert(!estePar(7));

    cout << "Toate testele au trecut!" << endl;
    return 0;
}
```

**Ieșire:**
```
Toate testele au trecut!
```

Dacă ai schimba de exemplu `maxim` astfel încât să returneze mereu `a`, programul s-ar opri la prima verificare picată, cu un mesaj de forma `Assertion failed: maxim(7, 3) == 7`. Verificările tale devin o plasă de siguranță: după fiecare modificare rulezi din nou programul și afli imediat dacă ai stricat ceva. Testează întotdeauna **cazurile limită**: zero, un singur element, valori egale, numere negative.

---

## 4. Stil de cod

Un program poate fi corect și totuși urât. Codul se citește de zece ori mai des decât se scrie.

### Exemplul 13 — Același program: urât și curat **[Esențial]**

**Varianta urâtă:**

```cpp
#include <iostream>
using namespace std;
int f(int x){int s=0;for(int i=1;i<=x;i++){if(x%i==0)s+=i;}return s;}
int main(){int a;cin>>a;cout<<f(a)<<endl;return 0;}
```

**Varianta curată:**

```cpp
#include <iostream>
using namespace std;

// Returneaza suma tuturor divizorilor lui n (inclusiv 1 si n)
int sumaDivizorilor(int n) {
    int suma = 0;

    for (int d = 1; d <= n; d++) {
        if (n % d == 0) {
            suma += d;
        }
    }
    return suma;
}

int main() {
    int numar;
    cin >> numar;
    cout << sumaDivizorilor(numar) << endl;
    return 0;
}
```

**Rulare** (tastezi `28`):
```
28
56
```

Ambele fac exact același lucru. Care vrei să o repari la 2 noaptea? Diferențele:
- **nume clare:** `sumaDivizorilor`, `suma`, `d` în loc de `f`, `s`, `x`;
- **indentare** (alinierea instrucțiunilor din interiorul `{ }`): câte 4 spații pentru fiecare nivel;
- **câte o instrucțiune pe linie**, cu spații în jurul operatorilor (`a = b + c`);
- **linii goale** care separă părți diferite;
- **comentariu** scurt pentru funcții (ce face, nu cum).

### Exemplul 14 — Constante în loc de „numere magice”

```cpp
#include <iostream>
using namespace std;

const int NOTA_MINIMA_TRECERE = 5;
const int NUMAR_ELEVI = 6;
const double TVA = 0.19;

int main() {
    int nota[NUMAR_ELEVI] = {4, 9, 5, 3, 10, 7};
    int promovati = 0;

    for (int i = 0; i < NUMAR_ELEVI; i++) {
        if (nota[i] >= NOTA_MINIMA_TRECERE) {
            promovati++;
        }
    }
    cout << "Promovati: " << promovati << " din " << NUMAR_ELEVI << endl;

    double pret = 200;
    cout << "Pret cu TVA: " << pret * (1 + TVA) << " lei" << endl;
    return 0;
}
```

**Ieșire:**
```
Promovati: 4 din 6
Pret cu TVA: 238 lei
```

Numerele care apar „de nicăieri” într-un cod (`5`, `6`, `0.19`) se numesc **numere magice**: nu se vede ce înseamnă și, dacă se schimbă, trebuie căutate prin tot programul. Dacă le dai un nume (`NOTA_MINIMA_TRECERE`), cititorul înțelege imediat, iar tu modifici valoarea într-un singur loc.

### Exemplul 15 — Un `main` lung împărțit în funcții

Un `main` de 80 de linii este greu de citit. Împarte-l în funcții cu nume clare. Compară:

```cpp
#include <iostream>
using namespace std;

const int N = 5;

void citesteNote(int v[], int n) {
    for (int i = 0; i < n; i++) {
        cout << "Nota " << i + 1 << ": ";
        cin >> v[i];
    }
}

double calculeazaMedia(int v[], int n) {
    int suma = 0;
    for (int i = 0; i < n; i++) {
        suma += v[i];
    }
    return (double)suma / n;
}

int numaraPesteMedie(int v[], int n, double medie) {
    int contor = 0;
    for (int i = 0; i < n; i++) {
        if (v[i] > medie) {
            contor++;
        }
    }
    return contor;
}

int main() {
    int note[N];

    citesteNote(note, N);

    double medie = calculeazaMedia(note, N);
    int peste = numaraPesteMedie(note, N, medie);

    cout << "Media: " << medie << endl;
    cout << "Note peste medie: " << peste << endl;
    return 0;
}
```

**Rulare** (tastezi `8 9 6 10 7`):
```
Nota 1: 8
Nota 2: 9
Nota 3: 6
Nota 4: 10
Nota 5: 7
Media: 8
Note peste medie: 2
```

Citind doar `main`, înțelegi programul în 10 secunde: citește notele, calculează media, numără notele de peste medie, afișează. Fiecare funcție face **un singur lucru** și poate fi testată separat (cu `assert`, ca în Exemplul 12).

---

## 5. Proiect: repară 5 programe

### Exemplul 16 — „Clinica de programe” **[Esențial]**

Fiecare dintre următoarele 5 programe compilează, dar are o greșeală de logică. Pentru fiecare: **(1)** rulează-l, **(2)** compară cu rezultatul așteptat, **(3)** caută cauza, **(4)** repară-l, **(5)** scrie în comentariu ce era greșit.

**Programul 1 — Media a trei numere.** Așteptat: `Media: 9`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 6, b = 9, c = 12;
    double media = a + b + c / 3;
    cout << "Media: " << media << endl;
    return 0;
}
```

**Ieșire:**
```
Media: 19
```

**Programul 2 — Numărăm numerele pare de la 1 la 9.** Așteptat: `Numere pare: 4`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int pare = 0;
    for (int i = 1; i <= 9; i++) {
        if (i % 2 == 1) {
            pare++;
        }
    }
    cout << "Numere pare: " << pare << endl;
    return 0;
}
```

**Ieșire:**
```
Numere pare: 5
```

**Programul 3 — Cea mai mică temperatură.** Așteptat: `Minim: 3`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int temp[5] = {8, 3, 12, 9, 5};
    int minim = 0;
    for (int i = 0; i < 5; i++) {
        if (temp[i] < minim) {
            minim = temp[i];
        }
    }
    cout << "Minim: " << minim << endl;
    return 0;
}
```

**Ieșire:**
```
Minim: 0
```

**Programul 4 — Factorialul lui 13.** Așteptat: `13! = 6227020800`.

```cpp
#include <iostream>
using namespace std;

int factorial(int n) {
    int rezultat = 1;
    for (int i = 2; i <= n; i++) {
        rezultat *= i;
    }
    return rezultat;
}

int main() {
    cout << "13! = " << factorial(13) << endl;
    return 0;
}
```

**Ieșire:**
```
13! = 1932053504
```

**Programul 5 — Este „ana” palindrom?** Așteptat: `ana este palindrom`.

```cpp
#include <iostream>
#include <string>
using namespace std;

bool estePalindrom(string s) {
    int n = s.length();
    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - i]) {
            return false;
        }
    }
    return true;
}

int main() {
    string cuvant = "ana";
    if (estePalindrom(cuvant)) {
        cout << cuvant << " este palindrom" << endl;
    } else {
        cout << cuvant << " nu este palindrom" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
ana nu este palindrom
```

Încearcă să le repari **înainte** să deschizi răspunsurile.

<details>
<summary><b>Răspunsuri</b></summary>

1. `a + b + c / 3` face mai întâi `c / 3`. Corect: `(a + b + c) / 3.0`.
2. Condiția `i % 2 == 1` numără numerele **impare** (1, 3, 5, 7, 9 → 5). Corect: `i % 2 == 0`.
3. `minim` pornește de la `0`, iar toate temperaturile sunt pozitive, deci niciuna nu este mai mică decât `0` și rezultatul rămâne `0`. Corect: `int minim = temp[0];`.
4. `13!` depășește limita unui `int` (aproximativ 2 miliarde). Corect: tipul `long long` pentru `rezultat` și pentru valoarea returnată.
5. `s[n - i]` pentru `i = 0` citește `s[n]`, adică în afara textului. Corect: `s[n - 1 - i]`.

</details>

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Repară 5 programe” (obligatoriu)
Reparează cele cinci programe din Exemplul 16. Pentru fiecare, scrie în comentariu: **ce era greșit** și **cum ai descoperit**.

### Exercițiul B — Un program „urât” devine curat
Ia un program din Modulul 2 sau 3 (de exemplu Catalogul de note) și rescrie-l: nume clare, indentare corectă, constante în loc de numere magice și funcții mici.

### Exercițiul C — Testele tale
Pentru trei funcții scrise de tine (de exemplu `estePrim`, `cmmdc`, `oglindit`), scrie 5 verificări `assert` fiecare, inclusiv pentru cazuri limită.

### Exercițiul D — Vânătoare de erori
Scrie un program cu **trei greșeli** puse intenționat (una de sintaxă, una de logică, una de execuție). Dă-l unui coleg și vezi în cât timp le găsește.

### Exercițiul E — Jurnalul de greșeli
Fă o listă cu cel puțin 8 greșeli pe care le-ai făcut în ultimele luni, fiecare cu: mesajul sau comportamentul, cauza și cum o eviți.

**Gata când:**
- [ ] Toate cele 5 programe sunt reparate și dau rezultatul așteptat  
- [ ] Fiecare reparație are un comentariu care explică greșeala  
- [ ] Ai citit mesajele compilatorului, pornind de la prima eroare  
- [ ] Ai folosit cel puțin o dată afișări de control sau `assert`  
- [ ] Codul tău este indentat și are nume clare  
- [ ] Fișierul se numește `Prenume_Nume_M3L9.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Caută și repară greșelile din programul unui coleg (cu acordul lui), fără să te uiți întâi la soluție  
- [ ] Scrie un program care testează automat funcția `estePrim` pentru toate numerele de la 0 la 100 comparând-o cu varianta lentă (numărarea divizorilor)  
- [ ] Citește despre `gdb` sau despre depanatorul din Code::Blocks / Visual Studio Code: breakpoint, step over, watch  
- [ ] Adaugă la un program mic un mod `DEBUG` care afișează informații suplimentare când o constantă este `true`  
- [ ] Scrie un „ghid de stil” de o pagină pentru tine (reguli de nume, indentare, comentarii)  

---

## Greșeli frecvente (la depanare)

| Ce vezi | Cauza | Ce faci |
|---------|-------|---------|
| Zeci de erori deodată | O singură greșeală (ex. `;` lipsă) produce multe mesaje | Repară prima eroare, recompilează |
| Eroarea apare pe o linie „corectă” | Greșeala este pe linia dinainte | Verifică linia anterioară |
| Programul „nu face nimic” | Bucla este infinită sau ai uitat un apel de funcție | Afișări de control, Ctrl + C |
| Rezultate ciudate (valori uriașe) | Variabilă neinițializată sau depășire | Inițializează variabilele; folosește `long long` |
| „Merge la mine, la tine nu” | Date de test diferite | Testează cazurile limită, nu doar un exemplu |
| Repari ceva și apar alte greșeli | Nu ai teste | Scrie `assert`-uri înainte de modificări |
| Nu mai știi ce făcea codul | Nume scurte, fără comentarii | Rescrie cu nume clare |
| Pierzi timp căutând la întâmplare | Nu ai o metodă | Reproduci → izolezi → afișezi valori → repari |

---

## Recapitulare pe scurt

- Trei tipuri de erori: **sintaxă** (la compilare), **logică** (rezultat greșit), **execuție** (oprire/blocare).
- Mesajele compilatorului: începe cu **prima** eroare; uită-te și la linia **dinainte**; repară câte una.
- Greșeli clasice de logică: `<` în loc de `<=`, `=` în loc de `==`, împărțire între întregi, `;` după `for`/`if`, variabilă neresetată, ordinea operațiilor, buclă fără modificarea contorului, variabilă „umbrită”.
- **Depanare:** afișări de control, tabel de urmărire, `assert`, testarea cazurilor limită, reproducerea problemei pe un exemplu mic.
- **Stil:** nume clare, indentare, o instrucțiune pe linie, constante în loc de numere magice, funcții mici cu un singur scop, comentarii scurte.

---

## Temă
1. Refă **Exemplele 1–16** și repară toate programele cu greșeli.  
2. Scrie un „mini test” cu `assert` pentru cinci funcții din lecțiile anterioare.  
3. Ia un program de 40–60 de linii scris de tine în Modulul 2 și rescrie-l după regulile de stil din lecție; compară numărul de linii din `main` înainte și după.  
4. Pregătește pentru colegi un program cu două greșeli ascunse, pe care să le găsească.  
5. **Bonus:** descoperă ce face avertismentul `-Wall` la compilare (în terminal: `g++ -Wall -Wextra program.cpp`) și rezolvă toate avertismentele programului tău cel mai lung.  
6. Salvează tot ca `Tema_M3L9_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 10
Recapitulăm Modulul 3 (funcții, string, algoritmi, `rand`), facem un test și construim proiectul final: **Generatorul de parole** și un **cifru** pentru mesaje secrete.
