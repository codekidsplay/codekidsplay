# LECȚIA 1 — Introducere în C++
**Modulul 1 · Bazele C++ · Durată: ~2 ore**

> Obiectiv: să înțelegem ce este C++, să deschidem Code::Blocks și să scriem primul program care afișează text pe ecran.

---

## Planul orei (120 minute)

| Minute | Activitate |
|--------|------------|
| 0–10 | Ce este C++? De ce îl învățăm? |
| 10–25 | Instalăm / deschidem IDE-ul (Code::Blocks) |
| 25–45 | Primul program — explicație linie cu linie |
| 45–60 | Mai multe mesaje, `\n` și `endl` |
| 60–75 | Caractere speciale: `\t`, `\\`, `\"` |
| 75–100 | Exerciții practice (scriem împreună) |
| 100–115 | Mini-challenge + verificare |
| 115–120 | Rezumat + temă pentru acasă |

---

## 1. Ce este C++? (10 min)

**C++** este un limbaj de programare multiplatform, folosit pentru aplicații rapide și puternice.

A fost creat de **Bjarne Stroustrup**, ca o extensie a limbajului **C**.

C++ oferă programatorilor un control bun asupra resurselor sistemului și a memoriei.

Limbajul a fost actualizat în versiuni majore: **C++11, C++14, C++17, C++20**.

### De ce învățăm C++?

- Este unul dintre cele mai populare limbaje din lume.
- Se folosește în sisteme de operare, jocuri, aplicații și dispozitive.
- Este **orientat pe obiecte** — ajută la organizarea și reutilizarea codului.
- Este **portabil** — același program poate rula pe mai multe platforme.
- Este **distractiv** și apropiat de C, C# și Java — treci ușor de la unul la altul.

> Pe scurt: C++ ne învață să gândim ca un programator și să construim programe reale.

---

## 2. Instalăm IDE-ul (15 min)

Un **IDE** (*Integrated Development Environment*) este programul în care scriem, compilăm și testăm codul.

IDE-uri populare gratuite:
- **Code::Blocks** (recomandat pentru această lecție)
- Visual Studio
- Eclipse

Descarcă Code::Blocks de pe: [http://www.codeblocks.org/](http://www.codeblocks.org/)

### Pași pentru primul fișier

1. Deschide **Code::Blocks**
2. Mergi la **File → New → Empty File**
3. Scrie programul
4. Salvează ca: **`Lectia1.cpp`** (File → Save File As)

---

## 3. Primul program C++ (20 min)

### Exemplul 1 — „Buna, îmi place C++!”

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Buna, imi place C++!";
    return 0;
}
```

#### Explicație linie cu linie

| Linie | Cod | Ce face |
|-------|-----|---------|
| 1 | `#include <iostream>` | Adaugă biblioteca pentru intrare/ieșire (`cout`, `cin`) |
| 2 | `using namespace std;` | Ne lasă să scriem `cout` în loc de `std::cout` |
| 3 | *(linie goală)* | C++ ignoră spațiile goale — le folosim ca să citim mai ușor |
| 4 | `int main() {` | Punctul de start al programului. Tot ce e între `{ }` rulează |
| 5 | `cout << "...";` | Afișează text pe ecran (`cout` se citește „see-out”) |
| 6 | `return 0;` | Încheie programul cu succes |
| 7 | `}` | Închide funcția `main` |

> **Regulă de aur:** aproape orice program C++ începe cu `#include <iostream>` și are un `int main()`.

---

### Exemplul 2 — Fără `using namespace std`

Unele programe scriu `std::` în fața obiectelor:

```cpp
#include <iostream>

int main() {
    std::cout << "Buna, imi place C++!";
    return 0;
}
```

Ambele variante sunt corecte. În lecțiile noastre vom folosi de obicei `using namespace std;`.

---

## 4. Mai multe mesaje pe ecran (15 min)

### Exemplul 3 — Două mesaje (fără linie nouă)

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Buna, imi place C++!";
    cout << "Programarea este cool!";
    return 0;
}
```

**Ieșire:**
```
Buna, imi place C++!Programarea este cool!
```

Observă: mesajele apar **lipite**, pentru că `cout` nu trece automat pe rândul următor.

---

### Exemplul 4 — Linie nouă cu `\n`

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Buna, imi place C++!\n";
    cout << "Programarea este cool!";
    return 0;
}
```

**Ieșire:**
```
Buna, imi place C++!
Programarea este cool!
```

> `\n` = *new line* (linie nouă). Două `\n\n` creează o linie goală.

---

### Exemplul 5 — Linie nouă cu `endl`

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    cout << "I am learning C++";
    return 0;
}
```

**Ieșire:**
```
Hello World!
I am learning C++
```

`endl` trece pe rândul următor (similar cu `\n`).

---

### Exemplul 6 — Card de prezentare

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "===== DESPRE MINE =====" << endl;
    cout << "Nume: Alex" << endl;
    cout << "Varsta: 10" << endl;
    cout << "Hobby: jocuri" << endl;
    cout << "=======================" << endl;
    return 0;
}
```

---

## 5. Intrare și ieșire (pe scurt)

În C++, datele circulă ca un **flux** (*stream*):

- **Ieșire (output):** din program spre ecran → `cout <<`
- **Intrare (input):** de la tastatură spre program → `cin >>`

> În **Lecția 1** exersăm doar **ieșirea** (`cout`).  
> **`cin`** îl învățăm în lecțiile următoare.

---

## 6. Caractere speciale — escape (15 min)

| Simbol | Ce face |
|--------|---------|
| `\n` | Linie nouă |
| `\t` | Tab (spațiu orizontal) |
| `\\` | Afișează caracterul `\` |
| `\"` | Afișează ghilimele `"` |

### Exemplul 7 — Tab (`\t`)

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Nume\tClasa\tNota\n";
    cout << "Ana\t5A\t10\n";
    cout << "Ion\t5B\t9\n";
    return 0;
}
```

---

### Exemplul 8 — Cale de fișier (`\\`)

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Calea fisierului: C:\\CodeKids\\Lectia1.cpp";
    return 0;
}
```

---

### Exemplul 9 — Ghilimele în text (`\"`)

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Profesorul a zis: \"Bravo!\"";
    return 0;
}
```

**Ieșire:**
```
Profesorul a zis: "Bravo!"
```

---

### Exemplul 10 — Toate escape-urile împreună

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Folder: C:\\Jocuri\\C++\n";
    cout << "Mesaj:\t\"Salut, CodeKids!\"\n";
    cout << "Gata!\n";
    return 0;
}
```

---

### Exemplul 11 — Desen ASCII (pisicuță)

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "  /\\_/\\" << endl;
    cout << " ( o.o )" << endl;
    cout << "  > ^ <" << endl;
    return 0;
}
```

---

### Exemplul 12 — Brad de Crăciun din caractere

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "   *\n";
    cout << "  ***\n";
    cout << " *****\n";
    cout << "*******\n";
    cout << "   |\n";
    return 0;
}
```

---

## 7. Biblioteci utile (de reținut)

| Header | Rol |
|--------|-----|
| `<iostream>` | `cout`, `cin`, `cerr` — intrare/ieșire |
| `<iomanip>` | Formatare (ex. `setw`) — mai târziu |
| `<fstream>` | Lucru cu fișiere — mai târziu |

În Lecția 1 folosim doar **`<iostream>`**.

---

## 8. Exerciții în clasă (25 min)

### Exercițiul A — „Despre mine” (obligatoriu)
Afișează pe linii separate:
1. Numele tău  
2. Clasa  
3. Școala  
4. Un hobby  

### Exercițiul B — Meniu cu tab-uri
Afișează un meniu de tipul:

```
1. Start
2. Ajutor
3. Iesire
```

Folosește `\t` sau spații ca să arate frumos.

### Exercițiul C — Mesaj cu ghilimele
Afișează:
```
El a spus: "C++ este cool!"
```

### Exercițiul D — Desen
Desenează un **pătrat** sau un **brad** din caractere `*`, `#` sau `|`.

### Exercițiul E — Mini-challenge
Afișează cuvântul **CODEKIDS** pe verticală (câte o literă pe linie):

```
C
O
D
E
K
I
D
S
```

---

## 9. Greșeli frecvente (verificare rapidă)

| Greșeală | Corect |
|----------|--------|
| Lipsă `;` la finalul liniei | `cout << "Salut";` |
| Ghilimele greșite (`“ ”`) | Folosește `"` normale |
| Ai uitat `#include <iostream>` | Adaugă-l la început |
| Ai uitat `}` | Închide `main` |
| Ai scris `Cout` sau `COUT` | Trebuie `cout` (litere mici) |

---

## 10. Rezumatul lecției

Astăzi am învățat:

1. Ce este **C++** și de ce e util  
2. Cum deschidem un proiect în **Code::Blocks**  
3. Structura minimă a unui program (`#include`, `main`, `return 0`)  
4. Cum afișăm text cu **`cout <<`**  
5. Cum trecem pe linie nouă cu **`\n`** și **`endl`**  
6. Caractere speciale: **`\t`**, **`\\`**, **`\"`**

**Nu am făcut încă** (le facem în lecțiile următoare):
- comentarii
- variabile
- `cin`
- tipuri de date
- probleme pbinfo

---

## 11. Temă pentru acasă

1. Refă **Exemplele 1–12** pe calculator.  
2. Scrie un program **„Despre mine”** cu cel puțin **5 linii**.  
3. **Bonus:** un desen ASCII la alegere (robot, casă, inimă, steag).  
4. Salvează fișierul ca **`Tema_L1_NumePrenume.cpp`**.

---

## 12. Ce urmează? — Lecția 2

În **L2** învățăm:
- comentarii `//` și `/* */`
- de ce e importantă structura programului
- cum facem codul mai clar și mai ușor de citit

---

**Sfârșitul Lecției 1!**  
Sper că ți-a plăcut. Refă exemplele acasă și ne vedem la L2! :)

*Multumesc!*
