# LECȚIA 10 — Recapitulare Modul 3 și proiectul „Seiful secret”
**Modulul 3 · Funcții, string, algoritmi · 2 ore**  
**Code Maker Club · Problem Solver**

> Azi încheiem Modulul 3. Recapitulăm funcțiile, textele, algoritmii pe numere și numerele aleatoare, apoi le folosim la un proiect: un **generator de parole**, un **verificator de parole** și un **cifru** pentru mesaje secrete, toate într-un singur program cu meniu.  
> Proiect: **„Seiful secret”** · fișier: `Prenume_Nume_M3L10.cpp` (ex. `Ana_Pop_M3L10.cpp`)

---

## Obiectiv
La finalul orei îți amintești și combini tot ce ai învățat în modul, scrii un cifru (Cezar), generezi parole aleatoare cu cerințe, evaluezi tăria unei parole și predai un program organizat pe funcții.  
**Minim:** generatorul de parole și cifrul Cezar, fiecare ca funcție, apelate din `main`.  
**Ținta orei (Complet):** + verificatorul de parole și un meniu complet, cu teste `assert` pentru cifru.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–25 | Recapitulare cu exemple scurte (**Exemplele 1–7**) |
| 25–45 | Cifrul lui Cezar (**Exemplele 8–10**) |
| 45–65 | Parole aleatoare și tăria lor (**Exemplele 11–13**) |
| 65–75 | Test scurt cu răspunsuri |
| 75–115 | Proiectul „Seiful secret” (**Exemplele 14–15**) |
| 115–120 | Predare, recap, ce urmează în Modulul 4 |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Recapitulare rapidă

### Ce ai învățat în Modulul 3

| Lecția | Tema | Ideea-cheie |
|--------|------|-------------|
| 1 | Funcții fără parametri | `void nume() { … }`, apel, prototip, variabile locale |
| 2 | Funcții cu parametri | Parametrii sunt copii; `int v[]` pentru vectori; `&` pentru referințe |
| 3 | Funcții cu `return` | Tipul funcției, `return valoare;`, funcții `bool` (`este…`) |
| 4 | String – bazele | `length()`, `s[i]`, `+`, `getline`, `substr`, palindrom |
| 5 | String – căutare și litere | `<cctype>`, `find`, frecvența literelor, anagrame |
| 6 | Algoritmi pe cifre | `% 10` și `/ 10`: sumă, oglindit, binar |
| 7 | Divizibilitate și numere prime | `d * d <= n`, cmmdc, factorizare, ciurul |
| 8 | Numere aleatoare | `srand(time(0))`, `a + rand() % (b - a + 1)` |
| 9 | Debugging și stil | tipuri de erori, `assert`, nume clare, funcții mici |

### Exemplul 1 — Funcție cu parametri **[Esențial]**

```cpp
#include <iostream>
#include <string>
using namespace std;

void chenar(string text, char c) {
    int n = text.length();
    for (int i = 0; i < n + 4; i++) {
        cout << c;
    }
    cout << endl << c << " " << text << " " << c << endl;
    for (int i = 0; i < n + 4; i++) {
        cout << c;
    }
    cout << endl;
}

int main() {
    chenar("Code Maker Club", '*');
    chenar("Modul 3", '#');
    return 0;
}
```

**Ieșire:**
```
******************
* Code Maker Club *
******************
###########
# Modul 3 #
###########
```

### Exemplul 2 — Funcție cu `return` pe un vector

```cpp
#include <iostream>
using namespace std;

double media(int v[], int n) {
    int suma = 0;
    for (int i = 0; i < n; i++) {
        suma += v[i];
    }
    return (double)suma / n;
}

int main() {
    int nota[5] = {9, 7, 10, 8, 6};
    cout << "Media: " << media(nota, 5) << endl;
    return 0;
}
```

**Ieșire:**
```
Media: 8
```

### Exemplul 3 — Funcție `bool`: număr prim **[Esențial]**

```cpp
#include <iostream>
using namespace std;

bool estePrim(int n) {
    if (n < 2) {
        return false;
    }
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    cout << "Primele numere prime: ";
    int gasite = 0;
    for (int n = 2; gasite < 10; n++) {
        if (estePrim(n)) {
            cout << n << " ";
            gasite++;
        }
    }
    cout << endl;
    return 0;
}
```

**Ieșire:**
```
Primele numere prime: 2 3 5 7 11 13 17 19 23 29 
```

### Exemplul 4 — String: numărăm vocalele **[Esențial]**

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int numaraVocale(string s) {
    int contor = 0;
    int n = s.length();
    for (int i = 0; i < n; i++) {
        char c = tolower(s[i]);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            contor++;
        }
    }
    return contor;
}

int main() {
    cout << numaraVocale("Programare in C++") << endl;
    cout << numaraVocale("Rhythm") << endl;
    return 0;
}
```

**Ieșire:**
```
5
0
```

### Exemplul 5 — Cifre: suma și oglinditul **[Esențial]**

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

long long oglindit(long long n) {
    long long r = 0;
    while (n > 0) {
        r = r * 10 + n % 10;
        n /= 10;
    }
    return r;
}

int main() {
    cout << "Suma cifrelor lui 90817: " << sumaCifrelor(90817) << endl;
    cout << "Oglinditul lui 90817: " << oglindit(90817) << endl;
    return 0;
}
```

**Ieșire:**
```
Suma cifrelor lui 90817: 25
Oglinditul lui 90817: 71809
```

### Exemplul 6 — Numere aleatoare: două zaruri **[Esențial]**

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int intre(int a, int b) {
    return a + rand() % (b - a + 1);
}

int main() {
    srand(time(0));

    for (int i = 0; i < 5; i++) {
        int z1 = intre(1, 6);
        int z2 = intre(1, 6);
        cout << z1 << " + " << z2 << " = " << z1 + z2 << endl;
    }
    return 0;
}
```

**Exemplu de ieșire (valorile diferă la fiecare rulare):**
```
4 + 3 = 7
4 + 3 = 7
3 + 4 = 7
6 + 1 = 7
2 + 2 = 4
```

### Exemplul 7 — Vectori și funcții: sortăm și afișăm

```cpp
#include <iostream>
using namespace std;

void schimba(int &a, int &b) {
    int aux = a;
    a = b;
    b = aux;
}

void sorteaza(int v[], int n) {
    for (int pas = 0; pas < n - 1; pas++) {
        for (int i = 0; i < n - 1 - pas; i++) {
            if (v[i] > v[i + 1]) {
                schimba(v[i], v[i + 1]);
            }
        }
    }
}

void afiseaza(int v[], int n) {
    for (int i = 0; i < n; i++) {
        cout << v[i] << " ";
    }
    cout << endl;
}

int main() {
    int v[6] = {29, 4, 17, 8, 42, 1};

    afiseaza(v, 6);
    sorteaza(v, 6);
    afiseaza(v, 6);
    return 0;
}
```

**Ieșire:**
```
29 4 17 8 42 1 
1 4 8 17 29 42 
```

---

## 2. Cifrul lui Cezar

Cifrul lui **Cezar** este unul dintre cele mai vechi cifruri: fiecare literă dintr-un mesaj este înlocuită cu litera aflată la un număr fix de poziții **mai încolo** în alfabet. Numărul fix se numește **cheie**. Cu cheia `3`: `A → D`, `B → E`, `C → F`, …, `X → A`, `Y → B`, `Z → C` (alfabetul se continuă „în cerc”).

```
Alfabet:   A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Deplasat:  D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
```

Mesajul `ALA BALA` devine `DOD EDOD`. Cifrul nu este sigur după standardele de azi (se sparge ușor), dar este o introducere excelentă în criptografie.

Pentru a calcula noua literă, avem nevoie de o formulă care „se rotește” după `Z`:

```
nouaLitera = 'A' + (litera - 'A' + cheie) % 26
```

- `litera - 'A'` = poziția în alfabet (0 pentru `A`, 25 pentru `Z`);
- adunăm cheia;
- `% 26` o aduce înapoi în intervalul 0–25;
- adunăm `'A'` ca să obținem din nou un caracter.

### Exemplul 8 — O singură literă **[Esențial]**

```cpp
#include <iostream>
using namespace std;

char cezarLitera(char c, int cheie) {
    if (c >= 'A' && c <= 'Z') {
        return 'A' + (c - 'A' + cheie) % 26;
    }
    if (c >= 'a' && c <= 'z') {
        return 'a' + (c - 'a' + cheie) % 26;
    }
    return c;
}

int main() {
    cout << cezarLitera('A', 3) << endl;
    cout << cezarLitera('z', 3) << endl;
    cout << cezarLitera('X', 5) << endl;
    cout << cezarLitera('!', 3) << endl;
    return 0;
}
```

**Ieșire:**
```
D
c
C
!
```

Literele mari rămân mari, literele mici rămân mici, iar celelalte caractere (spațiu, cifre, semne) rămân neschimbate. Observă că `'z'` cu cheia 3 devine `'c'`: alfabetul s-a rotit.

### Exemplul 9 — Criptăm un text întreg **[Esențial]**

```cpp
#include <iostream>
#include <string>
using namespace std;

char cezarLitera(char c, int cheie) {
    if (c >= 'A' && c <= 'Z') {
        return 'A' + (c - 'A' + cheie) % 26;
    }
    if (c >= 'a' && c <= 'z') {
        return 'a' + (c - 'a' + cheie) % 26;
    }
    return c;
}

string cripteaza(string text, int cheie) {
    string rezultat = text;
    int n = text.length();
    for (int i = 0; i < n; i++) {
        rezultat[i] = cezarLitera(text[i], cheie);
    }
    return rezultat;
}

int main() {
    string mesaj = "Intalnire la ora 5!";
    string secret = cripteaza(mesaj, 3);

    cout << "Mesaj:  " << mesaj << endl;
    cout << "Secret: " << secret << endl;
    return 0;
}
```

**Ieșire:**
```
Mesaj:  Intalnire la ora 5!
Secret: Lqwdoqluh od rud 5!
```

### Exemplul 10 — Decriptarea

Pentru a decripta, mergi în sens invers. Cu cheia `3` ai mers 3 poziții înainte, deci acum mergi 3 înapoi, adică `26 - 3 = 23` înainte. Rotirea completă este de 26 de poziții.

```cpp
#include <iostream>
#include <string>
using namespace std;

char cezarLitera(char c, int cheie) {
    if (c >= 'A' && c <= 'Z') {
        return 'A' + (c - 'A' + cheie) % 26;
    }
    if (c >= 'a' && c <= 'z') {
        return 'a' + (c - 'a' + cheie) % 26;
    }
    return c;
}

string cripteaza(string text, int cheie) {
    string rezultat = text;
    int n = text.length();
    for (int i = 0; i < n; i++) {
        rezultat[i] = cezarLitera(text[i], cheie);
    }
    return rezultat;
}

string decripteaza(string text, int cheie) {
    return cripteaza(text, 26 - cheie % 26);
}

int main() {
    string secret = "Lqwdoqluh od rud 5!";

    cout << "Mesaj primit: " << secret << endl;
    cout << "Decriptat:    " << decripteaza(secret, 3) << endl;

    cout << "Incerc toate cheile:" << endl;
    string necunoscut = "Fdvd pduh";
    for (int cheie = 1; cheie <= 5; cheie++) {
        cout << "  cheia " << cheie << ": " << decripteaza(necunoscut, cheie) << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Mesaj primit: Lqwdoqluh od rud 5!
Decriptat:    Intalnire la ora 5!
Incerc toate cheile:
  cheia 1: Ecuc octg
  cheia 2: Dbtb nbsf
  cheia 3: Casa mare
  cheia 4: Bzrz lzqd
  cheia 5: Ayqy kypc
```

Un cifru Cezar poate fi spart ușor: există doar 25 de chei posibile, deci le încerci pe toate (aceasta se numește *atac prin forță brută*) și vezi care dă un text care are sens. Cifrurile moderne au chei de un număr astronomic de posibilități.

**Încearcă tu (8 min)**  
- [ ] Criptezi numele tău cu cheia 5 și îl decriptezi înapoi  
- [ ] Trimiți un mesaj criptat unui coleg și îl rogi să-l spargă  
- [ ] Verifici că `decripteaza(cripteaza(x, k), k)` îți dă mesajul inițial  

---

## 3. Parole aleatoare și tăria lor

### Exemplul 11 — Parolă din alfabet ales

Punem toate caracterele permise într-un `string` și alegem poziții aleatoare.

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

string parolaSimpla(int lungime) {
    string alfabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    string parola = "";

    for (int i = 0; i < lungime; i++) {
        int poz = rand() % alfabet.length();
        parola += alfabet[poz];
    }
    return parola;
}

int main() {
    srand(time(0));

    for (int i = 0; i < 4; i++) {
        cout << parolaSimpla(10) << endl;
    }
    return 0;
}
```

**Exemplu de ieșire (la fiecare rulare, alte parole):**
```
GWKx6cb607
wqKVDK51Uh
yr57FiqLOi
tt0OU94Zq0
```

### Exemplul 12 — Parolă cu cerințe: cel puțin o literă mare, una mică, o cifră și un simbol

O parolă care respectă regulile cu siguranță se obține în doi pași: punem **obligatoriu** câte un caracter din fiecare categorie, completăm restul la întâmplare, iar la final **amestecăm** textul, ca primele patru caractere să nu fie mereu în aceeași ordine.

```cpp
#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

char dinSet(string set) {
    return set[rand() % set.length()];
}

void amesteca(string &s) {
    for (int i = s.length() - 1; i > 0; i--) {
        int j = rand() % (i + 1);
        char aux = s[i];
        s[i] = s[j];
        s[j] = aux;
    }
}

string parolaPuternica(int lungime) {
    string mici = "abcdefghijklmnopqrstuvwxyz";
    string mari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    string cifre = "0123456789";
    string simboluri = "!@#$%&*?";
    string toate = mici + mari + cifre + simboluri;

    string parola = "";
    parola += dinSet(mici);
    parola += dinSet(mari);
    parola += dinSet(cifre);
    parola += dinSet(simboluri);

    while ((int)parola.length() < lungime) {
        parola += dinSet(toate);
    }

    amesteca(parola);
    return parola;
}

int main() {
    srand(time(0));

    for (int i = 0; i < 4; i++) {
        cout << parolaPuternica(12) << endl;
    }
    return 0;
}
```

**Exemplu de ieșire:**
```
mAy6pkm!?fu8
DO9d6J6*k6T!
en@AGKX4HEuB
?1$czHmRsoHw
```

Funcția `amesteca` primește textul **prin referință** (`string &s`), deci îl modifică pe loc (lecția 2). Funcția `dinSet` ascunde detaliul „alege un caracter dintr-un set”, ca în `parolaPuternica` să se citească clar ce se întâmplă.

### Exemplul 13 — Cât de puternică este o parolă?

Acordăm câte un punct pentru fiecare cerință îndeplinită: lungime de cel puțin 8, literă mică, literă mare, cifră, simbol.

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int puncteParola(string parola) {
    bool mica = false, mare = false, cifra = false, simbol = false;
    int n = parola.length();

    for (int i = 0; i < n; i++) {
        char c = parola[i];
        if (islower(c)) {
            mica = true;
        } else if (isupper(c)) {
            mare = true;
        } else if (isdigit(c)) {
            cifra = true;
        } else {
            simbol = true;
        }
    }

    int puncte = 0;
    if (n >= 8) puncte++;
    if (mica) puncte++;
    if (mare) puncte++;
    if (cifra) puncte++;
    if (simbol) puncte++;
    return puncte;
}

string verdict(int puncte) {
    if (puncte <= 2) return "slaba";
    if (puncte <= 4) return "medie";
    return "puternica";
}

int main() {
    string teste[5] = {"parola", "Parola123", "parola123", "Pa$$w0rd!", "x"};

    for (int i = 0; i < 5; i++) {
        int p = puncteParola(teste[i]);
        cout << teste[i] << " -> " << p << "/5 puncte, " << verdict(p) << endl;
    }
    return 0;
}
```

**Ieșire:**
```
parola -> 1/5 puncte, slaba
Parola123 -> 4/5 puncte, medie
parola123 -> 3/5 puncte, medie
Pa$$w0rd! -> 5/5 puncte, puternica
x -> 1/5 puncte, slaba
```

Fiecare caracter este încadrat într-o categorie (mică, mare, cifră, simbol), apoi numărăm câte categorii apar. Funcțiile mici fac lucrul acesta ușor de modificat: dacă vrei alte reguli, schimbi `puncteParola`.

---

## 4. Test scurt (10 minute, fără calculator)

**1.** Ce afișează?
```
void f(int x) { x = x + 1; }
int main() { int a = 5; f(a); cout << a; }
```

**2.** Cum modifici funcția de la întrebarea 1 ca `a` să devină 6?

**3.** Ce valori poate lua `rand() % 10 + 5`?

**4.** Ce returnează `numarCifre(0)`, dacă funcția folosește `do-while`? Dar dacă folosește `while (n > 0)`?

**5.** De ce verificăm numerele prime doar până la `d * d <= n`?

**6.** Cu cheia 3, în ce se transformă litera `Y` în cifrul lui Cezar?

**7.** Dacă `s = "casa"`, ce sunt `s.length()`, `s[0]` și `s[s.length() - 1]`?

**8.** De ce se apelează `srand(time(0))` doar o dată, la început?

<details>
<summary><b>Răspunsuri</b></summary>

1. `5` (funcția modifică o copie).
2. Cu o referință: `void f(int &x)`.
3. Valorile întregi de la `5` la `14`.
4. Cu `do-while` returnează `1`; cu `while (n > 0)` returnează `0`.
5. Divizorii vin în perechi, iar unul din ei este mereu mai mic sau egal cu `√n`.
6. În `B` (`Y → Z → A → B`).
7. `4`, `'c'`, `'a'`.
8. Dacă l-ai apela mereu, într-o secundă ai primi aceeași secvență de numere; sămânța se stabilește o singură dată, la pornirea programului.

</details>

---

## 5. Proiect final: „Seiful secret”

### Exemplul 14 — Testăm cifrul cu `assert`

Înainte de a construi programul complet, ne asigurăm că funcțiile de bază sunt corecte.

```cpp
#include <iostream>
#include <string>
#include <cassert>
using namespace std;

char cezarLitera(char c, int cheie) {
    if (c >= 'A' && c <= 'Z') {
        return 'A' + (c - 'A' + cheie) % 26;
    }
    if (c >= 'a' && c <= 'z') {
        return 'a' + (c - 'a' + cheie) % 26;
    }
    return c;
}

string cripteaza(string text, int cheie) {
    string rezultat = text;
    int n = text.length();
    for (int i = 0; i < n; i++) {
        rezultat[i] = cezarLitera(text[i], cheie);
    }
    return rezultat;
}

string decripteaza(string text, int cheie) {
    return cripteaza(text, 26 - cheie % 26);
}

int main() {
    assert(cezarLitera('A', 3) == 'D');
    assert(cezarLitera('Z', 1) == 'A');
    assert(cezarLitera('m', 0) == 'm');
    assert(cezarLitera('5', 7) == '5');
    assert(cripteaza("abc", 1) == "bcd");
    assert(cripteaza("xyz", 3) == "abc");
    assert(decripteaza(cripteaza("Salut, lume!", 7), 7) == "Salut, lume!");
    assert(decripteaza(cripteaza("Code Maker Club", 25), 25) == "Code Maker Club");

    cout << "Cifrul trece toate testele!" << endl;
    return 0;
}
```

**Ieșire:**
```
Cifrul trece toate testele!
```

Dacă un test pică, programul se oprește și îți arată linia. Abia după ce funcțiile trec testele le folosești în programul mare.

### Exemplul 15 — „Seiful secret” (proiectul modulului) **[Esențial]**

```cpp
/*
   Program: Seiful secret
   Scop:    generator si verificator de parole, cifrul lui Cezar
            si un joc de ghicit codul seifului
*/
#include <iostream>
#include <string>
#include <cctype>
#include <cstdlib>
#include <ctime>
using namespace std;

// ---------- Cifrul lui Cezar ----------

char cezarLitera(char c, int cheie) {
    if (c >= 'A' && c <= 'Z') {
        return 'A' + (c - 'A' + cheie) % 26;
    }
    if (c >= 'a' && c <= 'z') {
        return 'a' + (c - 'a' + cheie) % 26;
    }
    return c;
}

string cripteaza(string text, int cheie) {
    string rezultat = text;
    int n = text.length();
    for (int i = 0; i < n; i++) {
        rezultat[i] = cezarLitera(text[i], cheie);
    }
    return rezultat;
}

string decripteaza(string text, int cheie) {
    return cripteaza(text, 26 - cheie % 26);
}

// ---------- Parole ----------

char dinSet(string set) {
    return set[rand() % set.length()];
}

void amesteca(string &s) {
    for (int i = s.length() - 1; i > 0; i--) {
        int j = rand() % (i + 1);
        char aux = s[i];
        s[i] = s[j];
        s[j] = aux;
    }
}

string genereazaParola(int lungime) {
    string mici = "abcdefghijklmnopqrstuvwxyz";
    string mari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    string cifre = "0123456789";
    string simboluri = "!@#$%&*?";
    string toate = mici + mari + cifre + simboluri;

    string parola = "";
    parola += dinSet(mici);
    parola += dinSet(mari);
    parola += dinSet(cifre);
    parola += dinSet(simboluri);
    while ((int)parola.length() < lungime) {
        parola += dinSet(toate);
    }
    amesteca(parola);
    return parola;
}

int puncteParola(string parola) {
    bool mica = false, mare = false, cifra = false, simbol = false;
    int n = parola.length();
    for (int i = 0; i < n; i++) {
        char c = parola[i];
        if (islower(c)) {
            mica = true;
        } else if (isupper(c)) {
            mare = true;
        } else if (isdigit(c)) {
            cifra = true;
        } else {
            simbol = true;
        }
    }
    int puncte = 0;
    if (n >= 8) puncte++;
    if (mica) puncte++;
    if (mare) puncte++;
    if (cifra) puncte++;
    if (simbol) puncte++;
    return puncte;
}

string verdict(int puncte) {
    if (puncte <= 2) return "slaba";
    if (puncte <= 4) return "medie";
    return "puternica";
}

// ---------- Jocul seifului ----------

void joculSeifului() {
    int cod = 100 + rand() % 900;
    int incercare;
    int incercari = 0;
    const int MAXIM = 7;

    cout << "Seiful are un cod de 3 cifre. Ai " << MAXIM << " incercari." << endl;

    do {
        cout << "Cod: ";
        cin >> incercare;
        incercari++;

        if (incercare == cod) {
            cout << "Seiful s-a deschis din " << incercari << " incercari!" << endl;
            return;
        }
        if (incercare < cod) {
            cout << "Codul real este mai MARE." << endl;
        } else {
            cout << "Codul real este mai MIC." << endl;
        }
    } while (incercari < MAXIM);

    cout << "Seiful ramane inchis. Codul era " << cod << "." << endl;
}

// ---------- Meniu ----------

void meniu() {
    cout << endl << "===== SEIFUL SECRET =====" << endl;
    cout << "1. Genereaza o parola" << endl;
    cout << "2. Verifica o parola" << endl;
    cout << "3. Cripteaza un mesaj" << endl;
    cout << "4. Decripteaza un mesaj" << endl;
    cout << "5. Deschide seiful (joc)" << endl;
    cout << "0. Iesire" << endl;
    cout << "Alege: ";
}

int citesteCheie() {
    int cheie;
    do {
        cout << "Cheia (1-25): ";
        cin >> cheie;
    } while (cheie < 1 || cheie > 25);
    cin.ignore();
    return cheie;
}

int main() {
    srand(time(0));
    int optiune;

    do {
        meniu();
        cin >> optiune;

        if (optiune == 1) {
            int lungime;
            do {
                cout << "Lungimea (8-30): ";
                cin >> lungime;
            } while (lungime < 8 || lungime > 30);
            cout << "Parola generata: " << genereazaParola(lungime) << endl;
        } else if (optiune == 2) {
            string parola;
            cout << "Parola de verificat: ";
            cin >> parola;
            int p = puncteParola(parola);
            cout << "Rezultat: " << p << "/5 - parola " << verdict(p) << endl;
        } else if (optiune == 3 || optiune == 4) {
            int cheie = citesteCheie();
            string mesaj;
            cout << "Mesajul: ";
            getline(cin, mesaj);
            if (optiune == 3) {
                cout << "Criptat: " << cripteaza(mesaj, cheie) << endl;
            } else {
                cout << "Decriptat: " << decripteaza(mesaj, cheie) << endl;
            }
        } else if (optiune == 5) {
            joculSeifului();
        } else if (optiune != 0) {
            cout << "Optiune invalida." << endl;
        }
    } while (optiune != 0);

    cout << "Seiful s-a inchis. La revedere!" << endl;
    return 0;
}
```

**Rulare** (tastezi `1 12`, `2 Pa$$w0rd!`, `3 4 "Salut Ana"`, `4 4 "Wepyx Ere"`, `0`):
```

===== SEIFUL SECRET =====
1. Genereaza o parola
2. Verifica o parola
3. Cripteaza un mesaj
4. Decripteaza un mesaj
5. Deschide seiful (joc)
0. Iesire
Alege: 1
Lungimea (8-30): 12
Parola generata: 79t%hIvPH%@q

===== SEIFUL SECRET =====
1. Genereaza o parola
2. Verifica o parola
3. Cripteaza un mesaj
4. Decripteaza un mesaj
5. Deschide seiful (joc)
0. Iesire
Alege: 2
Parola de verificat: Pa$$w0rd!
Rezultat: 5/5 - parola puternica

===== SEIFUL SECRET =====
1. Genereaza o parola
2. Verifica o parola
3. Cripteaza un mesaj
4. Decripteaza un mesaj
5. Deschide seiful (joc)
0. Iesire
Alege: 3
Cheia (1-25): 4
Mesajul: Salut Ana
Criptat: Wepyx Ere

===== SEIFUL SECRET =====
1. Genereaza o parola
2. Verifica o parola
3. Cripteaza un mesaj
4. Decripteaza un mesaj
5. Deschide seiful (joc)
0. Iesire
Alege: 4
Cheia (1-25): 4
Mesajul: Wepyx Ere
Decriptat: Salut Ana

===== SEIFUL SECRET =====
1. Genereaza o parola
2. Verifica o parola
3. Cripteaza un mesaj
4. Decripteaza un mesaj
5. Deschide seiful (joc)
0. Iesire
Alege: 0
Seiful s-a inchis. La revedere!
```

În acest proiect ai folosit tot ce înveți în modul: funcții cu parametri, cu `return` și cu referințe; `string` și `<cctype>`; `rand` pentru parole și pentru joc; meniu cu `do-while`; validări; `cin.ignore()` înainte de `getline`; comentarii care împart codul în secțiuni.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Seiful secret” (obligatoriu)
Scrie programul din Exemplul 15. Nu copia: scrie și testează fiecare funcție separat (cu `assert` sau cu mici programe), apoi leagă-le în meniu.

### Exercițiul B — Extinde seiful (minim una)
- Adaugă opțiunea „6. Sparge un mesaj Cezar”, care afișează decriptarea cu toate cele 25 de chei.  
- Adaugă un al doilea cifru: **Atbash** (`A ↔ Z`, `B ↔ Y`, `C ↔ X`, …).  
- Adaugă la generatorul de parole opțiunea „fără caractere ambigue” (fără `0`, `O`, `l`, `1`, `I`).  
- Adaugă în jocul seifului un indiciu: dacă diferența față de codul real este mai mică de 20, afișezi „Foarte cald!”.

### Exercițiul C — Teste
Scrie un fișier de teste cu `assert` pentru: `cezarLitera`, `cripteaza`/`decripteaza`, `puncteParola` (de exemplu, `puncteParola("") == 0`), `verdict`.

### Exercițiul D — Cod curat
Verifică programul după regulile din lecția 9: nume clare, indentare corectă, constante în loc de numere magice (de exemplu `MAXIM`), funcții mici.

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Meniul se repetă până la `0` și are validări  
- [ ] Cifrul funcționează: `decripteaza(cripteaza(x, k), k) == x`  
- [ ] Parola generată respectă regulile (mică, mare, cifră, simbol)  
- [ ] `srand(time(0))` este apelat o singură dată, în `main`  
- [ ] Ai minimum 8 funcții și `main` este scurt  
- [ ] Fișierul se numește `Prenume_Nume_M3L10.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Cifrul **Vigenère**: cheia este un cuvânt (de exemplu `CODE`), iar fiecare literă din mesaj este deplasată cu poziția literei corespunzătoare din cheie  
- [ ] Un „manager de parole” care ține un vector cu 5 conturi (site, parolă) și permite căutarea unuia  
- [ ] Calculează câte parole posibile există pentru o lungime dată și un alfabet de `m` caractere (`m` la puterea `lungime`)  
- [ ] Un joc „spânzurătoarea” cu un cuvânt aleator dintr-un vector de 10 cuvinte  
- [ ] Un test de viteză: programul îți arată un cuvânt aleator și măsoară în cât timp îl tastezi (`time(0)` înainte și după)  

---

## Greșeli frecvente (la proiect)

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Cifrul strică literele mari | Ai folosit `'a'` pentru toate literele | Tratează separat `'A'..'Z'` și `'a'..'z'` |
| După `Z` apar caractere ciudate | Ai uitat `% 26` | `'A' + (c - 'A' + cheie) % 26` |
| Decriptarea nu dă mesajul inițial | Ai folosit aceeași cheie, nu `26 - cheie` | `cripteaza(text, 26 - cheie % 26)` |
| `getline` „sare” peste mesaj | Ai citit înainte un număr cu `cin >>` | `cin.ignore();` înainte de `getline` |
| Parolele sunt aceleași la fiecare rulare | Lipsește `srand(time(0))` | Apelează-l o dată în `main` |
| Parola generată nu are cifră | Caracterele sunt alese complet la întâmplare | Adaugă obligatoriu câte unul din fiecare categorie |
| Programul se blochează la litere în loc de numere | `cin >> optiune` primește text | Deocamdată introduci doar numere |
| `main` are 100 de linii | Toată logica este în `main` | Mută fiecare opțiune într-o funcție |

---

## Recapitulare pe scurt (Modulul 3)

- **Funcții:** `tip nume(parametri) { … return …; }`; `void` nu returnează nimic; parametrii sunt copii, `&` pentru referință, `int v[]` pentru vectori.
- **Funcții `bool`:** `este…` / `are…`, ușor de folosit în `if`.
- **String:** `length()`, `s[i]`, `+`, `getline`, `substr`, `find`; `<cctype>` pentru litere și cifre.
- **Algoritmi pe cifre:** `% 10` și `/ 10`; sumă, oglindit, binar.
- **Numere prime și divizibilitate:** `d * d <= n`, Euclid, ciurul.
- **Numere aleatoare:** `srand(time(0))` o dată; `a + rand() % (b - a + 1)`.
- **Debugging și stil:** afișări de control, `assert`, nume clare, funcții mici.
- **Cifrul lui Cezar:** `'A' + (c - 'A' + cheie) % 26`.

---

## Temă
1. Termină și testează **Seiful secret**, apoi încarcă fișierul.  
2. Alege și implementează **o** extindere din Exercițiul B.  
3. Scrie o listă cu cele mai utile 5 funcții pe care le-ai scris în Modulul 3 și, pentru fiecare, un exemplu de apel.  
4. **Bonus:** trimite unui coleg un mesaj criptat cu o cheie pe care să o ghicească (cu „atac prin forță brută”).  
5. Salvează tot ca `Tema_M3L10_Prenume_Nume.cpp`.

---

## Felicitări — ai primit insigna **Problem Solver**!

Ai terminat Modulul 3: știi să împarți un program în funcții, să lucrezi cu text și cu numere și să depanezi programe.

## Ce urmează — Modulul 4
**Proiecte și autonomie (CodeKids Graduate):** salvezi date în fișiere, folosești `vector` și `struct` și construiești aplicații complete, de la idee la prezentare.
