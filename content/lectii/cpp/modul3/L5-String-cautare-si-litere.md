# LECȚIA 5 — String: căutare și litere
**Modulul 3 · Funcții, string, algoritmi · 2 ore**  
**Code Kids Play · Problem Solver**

> Azi „deschizi” un text și te uiți în el literă cu literă: numeri vocale, transformi literele mici în mari, cauți un cuvânt, înlocuiești caractere și afli ce literă apare cel mai des. Așa lucrează un editor de text când apeși Ctrl+F.  
> Proiect: **„Statistica textului”** · fișier: `Prenume_Nume_M3L5.cpp` (ex. `Ana_Pop_M3L5.cpp`)

---

## Obiectiv
La finalul orei știi că fiecare caracter are un cod numeric, verifici tipul unui caracter (`isalpha`, `isdigit`, …), schimbi literele mici în mari (`toupper`), numeri vocale și consoane, cauți bucăți de text cu `find`, construiești texte noi și numeri frecvența literelor cu un vector.  
**Minim:** un program care numără vocalele dintr-un text.  
**Ținta orei (Complet):** + transformarea în litere mari, căutarea unui cuvânt cu `find` și un raport de statistici.

## De ce contează
Aproape orice program care citește text trebuie să-l „înțeleagă”: o parolă trebuie să conțină cifre, un chat filtrează cuvinte urâte, un traducător caută cuvinte, un joc de tip „spânzurătoarea” verifică litere. Toate pornesc de la tehnicile din această lecție.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `string`, `length()`, `s[i]` |
| 10–30 | Codul unui caracter, `isalpha`/`isdigit` (**Exemplele 1–3**) |
| 30–50 | Litere mari și mici (**Exemplele 4–5**) |
| 50–70 | Numărări în text (**Exemplele 6–8**) |
| 70–90 | Căutare cu `find`, înlocuire (**Exemplele 9–11**) |
| 90–118 | Frecvența literelor, anagrame (**Exemplele 12–15**, nivel mai ridicat) și proiectul (**Exemplul 16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **7 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Caracterele sunt numere

Calculatorul nu înțelege litere; înțelege numere. Fiecare caracter are un **cod** (codul ASCII). Câteva repere:

| Caractere | Coduri |
|-----------|--------|
| `'0'` … `'9'` | 48 … 57 |
| `'A'` … `'Z'` | 65 … 90 |
| `'a'` … `'z'` | 97 … 122 |

Observă: literele sunt în ordine alfabetică, iar cifrele la fel. Diferența dintre o literă mică și majuscula ei este întotdeauna **32** (`'a'` = 97, `'A'` = 65).

### Exemplul 1 — Codul unui caracter **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    char litera = 'A';

    cout << "Caracterul " << litera << " are codul " << (int)litera << endl;
    cout << "Caracterul a are codul " << (int)'a' << endl;
    cout << "Caracterul 0 are codul " << (int)'0' << endl;

    cout << "Dupa A urmeaza " << (char)(litera + 1) << endl;
    cout << "Dupa A, la 4 pasi: " << (char)(litera + 4) << endl;
    return 0;
}
```

**Ieșire:**
```
Caracterul A are codul 65
Caracterul a are codul 97
Caracterul 0 are codul 48
Dupa A urmeaza B
Dupa A, la 4 pasi: E
```

Cu `(int)` vezi codul numeric, iar cu `(char)` transformi un cod înapoi în caracter. Poți aduna numere la un caracter: `'A' + 1` este codul lui `'B'`.

### Exemplul 2 — Ce fel de caracter este? **[Esențial]**

Biblioteca `<cctype>` are funcții care răspund la întrebări despre un caracter (toate returnează „adevărat” sau „fals”):

| Funcție | Răspunde la întrebarea |
|---------|------------------------|
| `isalpha(c)` | este o literă? |
| `isdigit(c)` | este o cifră? |
| `isspace(c)` | este un spațiu? |
| `isupper(c)` | este literă mare? |
| `islower(c)` | este literă mică? |

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string text = "Cod 2026!";

    int n = text.length();

    for (int i = 0; i < n; i++) {
        char c = text[i];
        cout << "'" << c << "' -> ";
        if (isalpha(c)) {
            cout << "litera";
        } else if (isdigit(c)) {
            cout << "cifra";
        } else if (isspace(c)) {
            cout << "spatiu";
        } else {
            cout << "alt simbol";
        }
        cout << endl;
    }
    return 0;
}
```

**Ieșire:**
```
'C' -> litera
'o' -> litera
'd' -> litera
' ' -> spatiu
'2' -> cifra
'0' -> cifra
'2' -> cifra
'6' -> cifra
'!' -> alt simbol
```

### Exemplul 3 — Mari și mici

```cpp
#include <iostream>
#include <cctype>
using namespace std;

int main() {
    char a = 'g';
    char b = 'M';

    cout << a << ": mare? " << (bool)isupper(a) << ", mica? " << (bool)islower(a) << endl;
    cout << b << ": mare? " << (bool)isupper(b) << ", mica? " << (bool)islower(b) << endl;

    cout << "toupper('g') = " << (char)toupper(a) << endl;
    cout << "tolower('M') = " << (char)tolower(b) << endl;
    cout << "toupper('7') = " << (char)toupper('7') << " (cifrele nu se schimba)" << endl;
    return 0;
}
```

**Ieșire:**
```
g: mare? 0, mica? 1
M: mare? 1, mica? 0
toupper('g') = G
tolower('M') = m
toupper('7') = 7 (cifrele nu se schimba)
```

`toupper(c)` returnează versiunea cu literă mare a lui `c`, iar `tolower(c)` pe cea cu literă mică. Dacă `c` nu este literă (de exemplu o cifră), rămâne neschimbat. Aceste funcții returnează un cod numeric, de aceea le scriem cu `(char)` în față, ca să se afișeze ca litere.

**Încearcă tu (8 min)**  
- [ ] Afișezi codul literei `'z'` și al cifrei `'5'`  
- [ ] Verifici cu `isdigit` dacă un caracter citit este cifră  
- [ ] Afișezi litera aflată cu 3 poziții după `'k'` în alfabet  

---

## 2. Litere mari și mici în texte întregi

### Exemplul 4 — Tot textul cu litere mari **[Esențial]**

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

string laMari(string s) {
    string rezultat = s;
    int n = s.length();
    for (int i = 0; i < n; i++) {
        rezultat[i] = toupper(s[i]);
    }
    return rezultat;
}

string laMici(string s) {
    string rezultat = s;
    int n = s.length();
    for (int i = 0; i < n; i++) {
        rezultat[i] = tolower(s[i]);
    }
    return rezultat;
}

int main() {
    string text = "Salut Code Kids 2026";

    cout << "Original: " << text << endl;
    cout << "MARI:     " << laMari(text) << endl;
    cout << "mici:     " << laMici(text) << endl;
    return 0;
}
```

**Ieșire:**
```
Original: Salut Code Kids 2026
MARI:     SALUT CODE KIDS 2026
mici:     salut code kids 2026
```

Funcțiile primesc textul și returnează o **copie** transformată. Textul original rămâne neschimbat.

### Exemplul 5 — Prima literă a fiecărui cuvânt cu majusculă

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

string titlu(string s) {
    string rezultat = s;
    int n = s.length();
    for (int i = 0; i < n; i++) {
        if (i == 0 || s[i - 1] == ' ') {
            rezultat[i] = toupper(s[i]);
        } else {
            rezultat[i] = tolower(s[i]);
        }
    }
    return rezultat;
}

int main() {
    cout << titlu("ana ARE mere") << endl;
    cout << titlu("cursul de PROGRAMARE c++") << endl;
    return 0;
}
```

**Ieșire:**
```
Ana Are Mere
Cursul De Programare C++
```

Dacă litera este prima din text sau urmează după un spațiu, o facem mare; altfel o facem mică. Condiția `i == 0` este verificată **înaintea** lui `s[i - 1]`, ca să nu citim în afara textului.

---

## 3. Numărări în text

### Exemplul 6 — Vocale **[Esențial]**

Pentru a verifica dacă o literă este vocală, o facem întâi mică (`tolower`), apoi o comparăm cu `a`, `e`, `i`, `o`, `u`.

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool esteVocala(char c) {
    c = tolower(c);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main() {
    string text = "Programarea este distractiva";
    int vocale = 0;
    int n = text.length();

    for (int i = 0; i < n; i++) {
        if (esteVocala(text[i])) {
            vocale++;
        }
    }

    cout << "Text: " << text << endl;
    cout << "Vocale: " << vocale << endl;
    return 0;
}
```

**Ieșire:**
```
Text: Programarea este distractiva
Vocale: 11
```

Funcția `esteVocala` ascunde detaliile: în `main` citești clar „dacă este vocală, crește contorul”. Ea acceptă și litere mari, datorită lui `tolower`.

### Exemplul 7 — Vocale, consoane, cifre, spații

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool esteVocala(char c) {
    c = tolower(c);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main() {
    string text = "Salut, am 12 ani si invat C++!";
    int vocale = 0, consoane = 0, cifre = 0, spatii = 0, altele = 0;
    int n = text.length();

    for (int i = 0; i < n; i++) {
        char c = text[i];
        if (isalpha(c)) {
            if (esteVocala(c)) {
                vocale++;
            } else {
                consoane++;
            }
        } else if (isdigit(c)) {
            cifre++;
        } else if (isspace(c)) {
            spatii++;
        } else {
            altele++;
        }
    }

    cout << "Text: " << text << endl;
    cout << "Vocale:   " << vocale << endl;
    cout << "Consoane: " << consoane << endl;
    cout << "Cifre:    " << cifre << endl;
    cout << "Spatii:   " << spatii << endl;
    cout << "Altele:   " << altele << endl;
    return 0;
}
```

**Ieșire:**
```
Text: Salut, am 12 ani si invat C++!
Vocale:   8
Consoane: 10
Cifre:    2
Spatii:   6
Altele:   4
```

Un singur `for` împarte toate caracterele în categorii. Orice caracter ajunge exact într-o categorie, deci suma contoarelor este egală cu `text.length()` (30 în exemplul de față).

### Exemplul 8 — De câte ori apare o literă **[Esențial]**

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int aparitii(string s, char litera) {
    int contor = 0;
    int n = s.length();
    for (int i = 0; i < n; i++) {
        if (tolower(s[i]) == tolower(litera)) {
            contor++;
        }
    }
    return contor;
}

int main() {
    string text = "Ana are mere si pere";

    cout << "Litera a: " << aparitii(text, 'a') << endl;
    cout << "Litera e: " << aparitii(text, 'e') << endl;
    cout << "Litera E: " << aparitii(text, 'E') << endl;
    cout << "Litera z: " << aparitii(text, 'z') << endl;
    return 0;
}
```

**Ieșire:**
```
Litera a: 3
Litera e: 5
Litera E: 5
Litera z: 0
```

Comparăm literele după ce le-am făcut pe amândouă mici, deci `'A'` și `'a'` se numără împreună.

**Încearcă tu (10 min)**  
- [ ] Numeri cifrele dintr-un text citit  
- [ ] Numeri cuvintele „simple” cu o literă mare la început  
- [ ] Afișezi doar vocalele dintr-un text, una după alta  

---

## 4. Căutare cu `find` și înlocuire

### Exemplul 9 — Căutăm o bucată de text **[Esențial]**

`text.find("bucata")` returnează **poziția** unde începe prima apariție, sau valoarea specială `string::npos` dacă nu există.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "Eu invat programare in C++";

    size_t poz = text.find("programare");
    if (poz != string::npos) {
        cout << "\"programare\" incepe pe pozitia " << poz << endl;
    }

    if (text.find("Java") == string::npos) {
        cout << "\"Java\" nu apare in text." << endl;
    }

    cout << "Prima litera 'n' este pe pozitia " << text.find('n') << endl;
    return 0;
}
```

**Ieșire:**
```
"programare" incepe pe pozitia 9
"Java" nu apare in text.
Prima litera 'n' este pe pozitia 4
```

`string::npos` înseamnă „nu s-a găsit”. Este rolul lui `-1` de la vectori, dar sub forma unei constante speciale: o compari direct, `text.find("Java") == string::npos`. Poziția o păstrăm într-o variabilă de tip `size_t` (tipul pe care îl returnează `find`). Poți căuta și un singur caracter (`find('n')`).

### Exemplul 10 — Toate aparițiile unei bucăți de text

Căutăm repetat, începând de fiecare dată **după** apariția precedentă: `find(bucata, de_la)`.

```cpp
#include <iostream>
#include <string>
using namespace std;

int numaraBucati(string text, string bucata) {
    int contor = 0;
    size_t poz = text.find(bucata);

    while (poz != string::npos) {
        contor++;
        cout << "  gasit la pozitia " << poz << endl;
        poz = text.find(bucata, poz + 1);
    }
    return contor;
}

int main() {
    string text = "banana si bananier si banane";

    cout << "Cautam \"an\":" << endl;
    int total = numaraBucati(text, "an");
    cout << "Total: " << total << endl;
    return 0;
}
```

**Ieșire:**
```
Cautam "an":
  gasit la pozitia 1
  gasit la pozitia 3
  gasit la pozitia 11
  gasit la pozitia 13
  gasit la pozitia 23
  gasit la pozitia 25
Total: 6
```

Variabila `poz` este tot de tip `size_t`. Folosim `poz + 1` ca să căutăm de la caracterul următor.

### Exemplul 11 — Înlocuim caractere

```cpp
#include <iostream>
#include <string>
using namespace std;

string inlocuieste(string s, char vechi, char nou) {
    string rezultat = s;
    int n = s.length();
    for (int i = 0; i < n; i++) {
        if (rezultat[i] == vechi) {
            rezultat[i] = nou;
        }
    }
    return rezultat;
}

string faraSpatii(string s) {
    string rezultat = "";
    int n = s.length();
    for (int i = 0; i < n; i++) {
        if (s[i] != ' ') {
            rezultat += s[i];
        }
    }
    return rezultat;
}

int main() {
    string text = "ana are mere";

    cout << inlocuieste(text, ' ', '_') << endl;
    cout << inlocuieste(text, 'a', '*') << endl;
    cout << faraSpatii(text) << endl;
    return 0;
}
```

**Ieșire:**
```
ana_are_mere
*n* *re mere
anaaremere
```

`inlocuieste` păstrează lungimea textului (schimbă caractere pe loc), iar `faraSpatii` construiește un text nou, mai scurt, adăugând doar ce vrem să păstrăm.

---

## 5. Frecvența literelor, anagrame, proiect

> **Notă:** de aici înainte exemplele sunt mai grele. Ele sunt pentru cei care vor mai mult; dacă te simți nesigur, citește-le doar ca să vezi ce se poate face și treci direct la proiect. **Proiectul lecției se poate face fără ele.**

### Exemplul 12 — Un vector de contoare: frecvența literelor *(Provocare, opțional)*

Folosim un vector cu 26 de contoare, câte unul pentru fiecare literă. Poziția literei `c` este `c - 'a'` (`'a'` → 0, `'b'` → 1, …, `'z'` → 25).

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string text = "Programarea in C++ este distractiva";
    int frecv[26] = {0};
    int n = text.length();

    for (int i = 0; i < n; i++) {
        if (isalpha(text[i])) {
            char c = tolower(text[i]);
            frecv[c - 'a']++;
        }
    }

    for (int i = 0; i < 26; i++) {
        if (frecv[i] > 0) {
            cout << (char)('a' + i) << ": " << frecv[i] << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
a: 5
c: 2
d: 1
e: 3
g: 1
i: 3
m: 1
n: 1
o: 1
p: 1
r: 4
s: 2
t: 3
v: 1
```

Aceasta este aceeași idee ca la histograma din Modulul 2 (lecția 7): valoarea (litera) devine **indice** în vectorul de contoare. O singură parcurgere numără toate literele deodată.

### Exemplul 13 — Litera cea mai frecventă *(Provocare, opțional)*

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

char celMaiFrecvent(string text) {
    int frecv[26] = {0};
    int n = text.length();

    for (int i = 0; i < n; i++) {
        if (isalpha(text[i])) {
            frecv[tolower(text[i]) - 'a']++;
        }
    }

    int pozMax = 0;
    for (int i = 1; i < 26; i++) {
        if (frecv[i] > frecv[pozMax]) {
            pozMax = i;
        }
    }
    return (char)('a' + pozMax);
}

int main() {
    string a = "Ana are mere";
    string b = "Zzz zzz abc";
    string c = "Informatica este frumoasa";

    cout << a << " -> " << celMaiFrecvent(a) << endl;
    cout << b << " -> " << celMaiFrecvent(b) << endl;
    cout << c << " -> " << celMaiFrecvent(c) << endl;
    return 0;
}
```

**Ieșire:**
```
Ana are mere -> a
Zzz zzz abc -> z
Informatica este frumoasa -> a
```

Găsirea maximului din vectorul de frecvențe este șablonul cu poziția maximului din Modulul 2. Dacă două litere au aceeași frecvență, se alege cea mai apropiată de începutul alfabetului (pentru că folosim `>`, nu `>=`).

### Exemplul 14 — Anagrame *(Provocare, opțional)*

Două cuvinte sunt **anagrame** dacă folosesc exact aceleași litere, în altă ordine (`roma` și `amor`). Comparăm vectorii lor de frecvențe.

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool suntAnagrame(string a, string b) {
    int frecv[26] = {0};

    int na = a.length();
    for (int i = 0; i < na; i++) {
        if (isalpha(a[i])) {
            frecv[tolower(a[i]) - 'a']++;
        }
    }

    int nb = b.length();
    for (int i = 0; i < nb; i++) {
        if (isalpha(b[i])) {
            frecv[tolower(b[i]) - 'a']--;
        }
    }

    for (int i = 0; i < 26; i++) {
        if (frecv[i] != 0) {
            return false;
        }
    }
    return true;
}

int main() {
    cout << "roma / amor: " << suntAnagrame("roma", "amor") << endl;
    cout << "sare / rase: " << suntAnagrame("sare", "rase") << endl;
    cout << "casa / masa: " << suntAnagrame("casa", "masa") << endl;
    cout << "Listen / Silent: " << suntAnagrame("Listen", "Silent") << endl;
    return 0;
}
```

**Ieșire:**
```
roma / amor: 1
sare / rase: 1
casa / masa: 0
Listen / Silent: 1
```

Pentru primul cuvânt **adunăm** în contoare, pentru al doilea **scădem**. Dacă la final toți contorii sunt `0`, literele coincid exact. Rezultatul `1` înseamnă adevărat, `0` fals.

### Exemplul 15 — Palindrom „serios”: ignorăm spațiile și literele mari *(Provocare, opțional)*

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool estePalindrom(string s) {
    string curat = "";
    int n = s.length();
    for (int i = 0; i < n; i++) {
        if (isalpha(s[i])) {
            curat += tolower(s[i]);
        }
    }

    int m = curat.length();
    for (int i = 0; i < m / 2; i++) {
        if (curat[i] != curat[m - 1 - i]) {
            return false;
        }
    }
    return true;
}

int main() {
    string fraze[4] = {"Ele fac cafele", "Ana", "Programare", "Ai a ia"};

    for (int i = 0; i < 4; i++) {
        cout << "\"" << fraze[i] << "\": ";
        if (estePalindrom(fraze[i])) {
            cout << "palindrom" << endl;
        } else {
            cout << "nu e palindrom" << endl;
        }
    }
    return 0;
}
```

**Ieșire:**
```
"Ele fac cafele": palindrom
"Ana": palindrom
"Programare": nu e palindrom
"Ai a ia": palindrom
```

Întâi „curățăm” textul (păstrăm doar literele, mici), apoi comparăm prima literă cu ultima, a doua cu penultima etc., până la jumătate. Nu mai construim un text inversat.

### Exemplul 16 — „Statistica textului” (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Statistica textului
   Scop:    analizeaza o propozitie: litere, vocale, cuvinte,
            cea mai frecventa litera, text cu litere mari
*/
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool esteVocala(char c) {
    c = tolower(c);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
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

string laMari(string s) {
    string rezultat = s;
    int n = s.length();
    for (int i = 0; i < n; i++) {
        rezultat[i] = toupper(s[i]);
    }
    return rezultat;
}

int main() {
    string text;
    cout << "Scrie o propozitie: ";
    getline(cin, text);

    int n = text.length();
    int litere = 0, vocale = 0, cifre = 0;
    int frecv[26] = {0};

    for (int i = 0; i < n; i++) {
        char c = text[i];
        if (isalpha(c)) {
            litere++;
            if (esteVocala(c)) {
                vocale++;
            }
            frecv[tolower(c) - 'a']++;
        } else if (isdigit(c)) {
            cifre++;
        }
    }

    cout << endl << "===== STATISTICA =====" << endl;
    cout << "Caractere: " << n << endl;
    cout << "Cuvinte:   " << numaraCuvinte(text) << endl;
    cout << "Litere:    " << litere << " (vocale: " << vocale
         << ", consoane: " << litere - vocale << ")" << endl;
    cout << "Cifre:     " << cifre << endl;

    if (litere > 0) {
        int pozMax = 0;
        for (int i = 1; i < 26; i++) {
            if (frecv[i] > frecv[pozMax]) {
                pozMax = i;
            }
        }
        cout << "Litera cea mai frecventa: " << (char)('a' + pozMax)
             << " (de " << frecv[pozMax] << " ori)" << endl;
    }
    cout << "Cu litere mari: " << laMari(text) << endl;
    return 0;
}
```

**Rulare** (tastezi `Eu invat C++ de 3 luni!`):
```
Scrie o propozitie: Eu invat C++ de 3 luni!

===== STATISTICA =====
Caractere: 23
Cuvinte:   6
Litere:    14 (vocale: 7, consoane: 7)
Cifre:     1
Litera cea mai frecventa: e (de 2 ori)
Cu litere mari: EU INVAT C++ DE 3 LUNI!
```

Programul folosește: `getline`, funcții `bool` și `string`, `isalpha`/`isdigit`, vectorul de frecvențe și poziția maximului. Un text gol sau fără litere este tratat: raportul literei frecvente apare doar dacă `litere > 0`.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Statistica textului” (obligatoriu)
Scrie programul din Exemplul 16. Adaugă: numărul de litere mari din text și afișarea textului cu litere mici.

### Exercițiul B — Verificator de parolă
Citește o parolă și spune dacă este „puternică”: are minimum 8 caractere, cel puțin o literă mare, o literă mică și o cifră. Afișează ce lipsește.

### Exercițiul C — Fără vocale
Citește o propoziție și afișează-o fără vocale (construiești un text nou).

### Exercițiul D — Căutare de cuvânt
Citește un text și un cuvânt. Spune dacă cuvântul apare și pe ce poziție, apoi de câte ori apare.

### Exercițiul E — Litere mari și mici alternate
Citește un cuvânt și afișează-l alternând literele mari și mici: `programare` → `PrOgRaMaReA` (poziția 0 mare, 1 mică etc.).

**Gata când:**
- [ ] Programul compilează fără erori sau avertismente  
- [ ] Ai folosit `<cctype>` (`isalpha`, `tolower`/`toupper` etc.)  
- [ ] Ai o funcție care returnează `bool` și una care returnează `string`  
- [ ] Ai folosit cel puțin o dată `find` sau vectorul de frecvențe  
- [ ] Ai tratat cazul „text gol” sau „fără litere”  
- [ ] Fișierul se numește `Prenume_Nume_M3L5.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Scrie un „spânzurătoarea” simplificat: cuvânt secret în cod, jucătorul ghicește litere, se afișează `_ a _ a` și numărul de greșeli  
- [ ] Afișează un histogram al literelor din text, cu `*` (ca în Modulul 2)  
- [ ] Afișează cuvintele dintr-o propoziție câte unul pe rând (separate prin spații)  
- [ ] Verifică dacă un text conține doar litere  
- [ ] Afișează primul cuvânt și ultimul cuvânt dintr-o propoziție, cu `find` și `substr`  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Se afișează un număr în loc de literă după `toupper` | `toupper` returnează un cod numeric | `(char)toupper(c)` sau atribuie rezultatul unui `char`/unui element de string |
| `frecv[c - 'a']` dă rezultate ciudate | `c` este literă mare sau alt caracter | Folosește `tolower(c)` și verifică `isalpha(c)` |
| Vocalele mari (`A`, `E`) nu sunt numărate | Compari doar cu literele mici | `c = tolower(c);` înainte de comparare |
| `find` „nu găsește” deși textul există | Diferență între litere mari și mici | Transformă ambele texte la litere mici |
| Compari `find(...)` cu `-1` | `npos` nu este `-1` ca tip | Compară cu `string::npos` |
| Rezultatul lui `toupper` nu apare în text | Ai apelat `toupper(s[i]);` fără să salvezi | `s[i] = toupper(s[i]);` |
| Programul se oprește la nume cu spațiu | `cin >>` citește un singur cuvânt | `getline(cin, text);` |
| `s[i - 1]` la `i = 0` | Ai verificat prima dată `s[i - 1]` | Verifică întâi `i == 0` |

---

## Recapitulare pe scurt

- Fiecare caracter are un **cod** (ASCII): `'A'` = 65, `'a'` = 97, `'0'` = 48.
- `<cctype>`: `isalpha`, `isdigit`, `isspace`, `isupper`, `islower`, `toupper`, `tolower`.
- Transformarea unui text: parcurgi și construiești un text nou (sau modifici pe loc, `s[i] = toupper(s[i])`).
- **Numărare:** contor + condiție; funcția `esteVocala(c)` face codul clar.
- **`find`:** returnează poziția sau `string::npos` (negăsit); `find(bucata, de_la)` continuă căutarea.
- **Frecvență:** `int frecv[26] = {0}; frecv[c - 'a']++;`
- Anagrame: aceeași frecvență pentru fiecare literă.
- Palindrom „serios”: păstrezi doar literele (mici) și compari capetele spre mijloc.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie o funcție `int numaraVocale(string s)` și una `int numaraConsoane(string s)`, apoi un program care le folosește pentru 3 propoziții citite.  
3. Scrie un program care citește un cuvânt și îl afișează de forma `P-r-o-g-r-a-m-a-r-e` (litere separate prin liniuțe).  
4. Scrie o funcție `string curata(string s)` care păstrează doar literele și cifrele din text, apoi afișează lungimea înainte și după curățare.  
5. **Bonus:** citește două cuvinte și spune dacă sunt anagrame; apoi citește 5 cuvinte și afișează toate perechile de anagrame dintre ele.  
6. Salvează tot ca `Tema_M3L5_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 6
Revenim la numere, dar cu probleme noi: **extragem cifrele unui număr**, le adunăm, le numărăm, le inversăm și rezolvăm probleme tip olimpiadă.
