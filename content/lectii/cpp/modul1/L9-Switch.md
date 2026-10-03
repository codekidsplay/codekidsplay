# LECȚIA 9 — `switch`
**Modulul 1 · Bazele C++ · 2 ore**  
**Code Kids Play · Junior Coder**

> Azi înveți instrucțiunea potrivită pentru **meniuri**: alegi o opțiune numerotată, iar programul execută exact acțiunea ei.  
> Proiect: **„Meniul cafenelei”** · fișier: `Prenume_Nume_L9.cpp` (ex. `Ana_Pop_L9.cpp`)

---

## Obiectiv
La finalul orei scrii un `switch` cu `case`, `break` și `default`, știi ce se întâmplă când uiți `break`, grupezi mai multe cazuri pe aceeași acțiune și alegi între `switch` și `if … else if` după situație.  
**Minim:** un meniu cu minimum 3 opțiuni și `default`.  
**Ținta orei (Complet):** + un meniu care calculează ceva (preț sau operație) și testarea unei opțiuni invalide.

## De ce contează
Aproape orice aplicație are un meniu: „1. Joc nou, 2. Continuă, 3. Setări, 4. Ieșire”. Cu `else if` se poate, dar codul devine lung și greu de urmărit. `switch` este creat tocmai pentru situația în care o valoare poate fi **1, 2, 3 sau altceva**, și pentru fiecare avem o acțiune.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Recapitulare L8 și problema meniurilor lungi cu `else if` |
| 15–40 | `switch`, `case`, `break`, `default` (**Exemplele 1–3**) |
| 40–65 | Greșeala fără `break` și grupări de cazuri (**Exemplele 4–6**) |
| 65–85 | `switch` cu `char` și mici probleme (**Exemplele 7–10**) |
| 85–100 | Limite: când nu folosim `switch` (**Exemplele 11–12**) |
| 100–118 | Proiecte (**Exemplele 13–16**) |
| 118–120 | Recap și temă |

---

## 1. Structura `switch`

```
switch (expresie) {
    case valoare1:
        // se executa daca expresie == valoare1
        break;
    case valoare2:
        // se executa daca expresie == valoare2
        break;
    default:
        // se executa daca nu s-a potrivit niciun case
}
```

Cum funcționează:
1. Programul calculează valoarea dintre paranteze (**expresia**).
2. Caută `case`-ul cu aceeași valoare și sare direct acolo.
3. Execută instrucțiunile de acolo **până întâlnește `break`** (sau până se termină `switch`-ul).
4. Dacă nu găsește nicio valoare potrivită, execută `default` (dacă există).

Reguli de reținut:
- `case` are după el o **valoare fixă** (`1`, `'a'`), nu o condiție. Nu scrii `case x > 5`.
- După valoare vine **două puncte `:`**, nu punct și virgulă.
- Expresia trebuie să fie de tip întreg sau `char`. **Nu merge cu `string` sau `double`.**
- `default` este opțional, dar recomandat: prinde valorile neașteptate.

### Exemplul 1 — Meniul restaurantului

```cpp
#include <iostream>
using namespace std;

int main() {
    int optiune;

    cout << "===== MENIU =====" << endl;
    cout << "1. Pizza" << endl;
    cout << "2. Paste" << endl;
    cout << "3. Supa" << endl;
    cout << "Alege: ";
    cin >> optiune;

    switch (optiune) {
        case 1:
            cout << "Ai ales pizza. Pofta buna!" << endl;
            break;
        case 2:
            cout << "Ai ales paste. Pofta buna!" << endl;
            break;
        case 3:
            cout << "Ai ales supa. Pofta buna!" << endl;
            break;
        default:
            cout << "Optiune invalida." << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `2`):
```
===== MENIU =====
1. Pizza
2. Paste
3. Supa
Alege: 2
Ai ales paste. Pofta buna!
```

**Rulare 2** (tastezi `7`):
```
===== MENIU =====
1. Pizza
2. Paste
3. Supa
Alege: 7
Optiune invalida.
```

### Exemplul 2 — Zilele săptămânii

```cpp
#include <iostream>
using namespace std;

int main() {
    int zi;

    cout << "Numarul zilei (1-7): ";
    cin >> zi;

    switch (zi) {
        case 1: cout << "Luni" << endl; break;
        case 2: cout << "Marti" << endl; break;
        case 3: cout << "Miercuri" << endl; break;
        case 4: cout << "Joi" << endl; break;
        case 5: cout << "Vineri" << endl; break;
        case 6: cout << "Sambata" << endl; break;
        case 7: cout << "Duminica" << endl; break;
        default: cout << "Zi inexistenta." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `4`):
```
Numarul zilei (1-7): 4
Joi
```

Când `case`-ul are o singură instrucțiune, o poți scrie pe același rând, ca aici. Compară cu varianta cu 7 `else if`-uri: `switch` e mai scurt și mai clar.

### Exemplul 3 — Mai multe instrucțiuni într-un `case`

```cpp
#include <iostream>
using namespace std;

int main() {
    int dificultate;

    cout << "Dificultate (1 = usor, 2 = mediu, 3 = greu): ";
    cin >> dificultate;

    int vieti = 0;
    int inamici = 0;

    switch (dificultate) {
        case 1:
            vieti = 5;
            inamici = 10;
            cout << "Mod usor activat." << endl;
            break;
        case 2:
            vieti = 3;
            inamici = 25;
            cout << "Mod mediu activat." << endl;
            break;
        case 3:
            vieti = 1;
            inamici = 50;
            cout << "Mod greu activat." << endl;
            break;
        default:
            cout << "Dificultate necunoscuta. Folosim modul usor." << endl;
            vieti = 5;
            inamici = 10;
    }

    cout << "Vieti: " << vieti << ", inamici: " << inamici << endl;
    return 0;
}
```

**Rulare** (tastezi `3`):
```
Dificultate (1 = usor, 2 = mediu, 3 = greu): 3
Mod greu activat.
Vieti: 1, inamici: 50
```

Într-un `case` poți pune oricâte instrucțiuni; ele nu au nevoie de acolade. Se opresc la `break`.

**Încearcă tu (10 min)**  
- [ ] Faci un meniu cu 3 opțiuni (de exemplu 1 = Joc nou, 2 = Continuă, 3 = Ieșire)  
- [ ] Testezi o opțiune invalidă  
- [ ] Adaugi un `case 4` nou  

---

## 2. `break`, fall-through și grupări

### Exemplul 4 — Ce se întâmplă fără `break`

```cpp
#include <iostream>
using namespace std;

int main() {
    int optiune = 2;

    cout << "Fara break:" << endl;
    switch (optiune) {
        case 1:
            cout << "Unu" << endl;
        case 2:
            cout << "Doi" << endl;
        case 3:
            cout << "Trei" << endl;
        default:
            cout << "Altceva" << endl;
    }

    cout << endl << "Cu break:" << endl;
    switch (optiune) {
        case 1:
            cout << "Unu" << endl;
            break;
        case 2:
            cout << "Doi" << endl;
            break;
        case 3:
            cout << "Trei" << endl;
            break;
        default:
            cout << "Altceva" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Fara break:
Doi
Trei
Altceva

Cu break:
Doi
```

Fără `break`, programul intră în `case 2` și **continuă** în `case 3` și în `default`, ca o cascadă. Fenomenul se numește *fall-through* („cădere”). Este cea mai frecventă greșeală la `switch`. Regula: **pune `break` la finalul fiecărui `case`**, cu excepția cazurilor în care vrei intenționat cascada.

### Exemplul 5 — Cascada folosită intenționat: grupăm cazuri

```cpp
#include <iostream>
using namespace std;

int main() {
    int zi;

    cout << "Ziua (1-7): ";
    cin >> zi;

    switch (zi) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            cout << "Zi de scoala." << endl;
            break;
        case 6:
        case 7:
            cout << "Weekend!" << endl;
            break;
        default:
            cout << "Zi inexistenta." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `6`):
```
Ziua (1-7): 6
Weekend!
```

Mai multe `case`-uri puse unul sub altul, **fără instrucțiuni între ele**, se comportă ca un „sau”: `case 1`, `case 2`, … `case 5` duc toate la același mesaj. Este varianta compactă a unei condiții de tipul `zi == 1 || zi == 2 || …`.

### Exemplul 6 — Câte zile are luna?

```cpp
#include <iostream>
using namespace std;

int main() {
    int luna;

    cout << "Luna (1-12): ";
    cin >> luna;

    switch (luna) {
        case 4:
        case 6:
        case 9:
        case 11:
            cout << "Luna are 30 de zile." << endl;
            break;
        case 2:
            cout << "Luna are 28 sau 29 de zile." << endl;
            break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            cout << "Luna are 31 de zile." << endl;
            break;
        default:
            cout << "Luna inexistenta." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `9`):
```
Luna (1-12): 9
Luna are 30 de zile.
```

Cazurile pot fi scrise în orice ordine; important este ca fiecare valoare să apară o singură dată.

---

## 3. `switch` cu `char` și mici probleme

### Exemplul 7 — Opțiuni cu litere

```cpp
#include <iostream>
using namespace std;

int main() {
    char comanda;

    cout << "Comanda (s = start, p = pauza, x = iesire): ";
    cin >> comanda;

    switch (comanda) {
        case 's':
            cout << "Jocul porneste." << endl;
            break;
        case 'p':
            cout << "Joc in pauza." << endl;
            break;
        case 'x':
            cout << "La revedere!" << endl;
            break;
        default:
            cout << "Comanda necunoscuta." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `p`):
```
Comanda (s = start, p = pauza, x = iesire): p
Joc in pauza.
```

Pentru `char`, valoarea din `case` se scrie între **apostrofuri**: `case 's':`.

### Exemplul 8 — Majuscule și minuscule împreună

```cpp
#include <iostream>
using namespace std;

int main() {
    char litera;

    cout << "Introdu o litera: ";
    cin >> litera;

    switch (litera) {
        case 'a':
        case 'A':
        case 'e':
        case 'E':
        case 'i':
        case 'I':
        case 'o':
        case 'O':
        case 'u':
        case 'U':
            cout << litera << " este vocala." << endl;
            break;
        default:
            cout << litera << " nu este vocala." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `E`):
```
Introdu o litera: E
E este vocala.
```

Grupările de cazuri rezolvă elegant problema majusculelor: ambele variante duc la același răspuns.

### Exemplul 9 — Calculator cu operator citit ca `char`

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    char op;

    cout << "Introdu: numar operator numar (ex: 12 + 5): ";
    cin >> a >> op >> b;

    switch (op) {
        case '+':
            cout << a << " + " << b << " = " << a + b << endl;
            break;
        case '-':
            cout << a << " - " << b << " = " << a - b << endl;
            break;
        case '*':
            cout << a << " * " << b << " = " << a * b << endl;
            break;
        case '/':
            if (b == 0) {
                cout << "Nu se poate imparti la zero." << endl;
            } else {
                cout << a << " / " << b << " = " << a / b << endl;
            }
            break;
        default:
            cout << "Operator necunoscut." << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `12 * 5`):
```
Introdu: numar operator numar (ex: 12 + 5): 12 * 5
12 * 5 = 60
```

**Rulare 2** (tastezi `7 / 0`):
```
Introdu: numar operator numar (ex: 12 + 5): 7 / 0
Nu se poate imparti la zero.
```

În interiorul unui `case` poți folosi și `if`. Aici, `case '/'` verifică întâi dacă împărțitorul este zero. Observă că un singur `cin` citește cele trei valori una după alta, cu spații între ele.

### Exemplul 10 — Același program cu `if` și cu `switch`

```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 3;

    // Varianta cu else if
    if (n == 1) {
        cout << "if: unu" << endl;
    } else if (n == 2) {
        cout << "if: doi" << endl;
    } else if (n == 3) {
        cout << "if: trei" << endl;
    } else {
        cout << "if: altceva" << endl;
    }

    // Varianta cu switch
    switch (n) {
        case 1: cout << "switch: unu" << endl; break;
        case 2: cout << "switch: doi" << endl; break;
        case 3: cout << "switch: trei" << endl; break;
        default: cout << "switch: altceva" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
if: trei
switch: trei
```

Rezultatul e același. Când ai **o singură valoare cu mai multe variante fixe** (meniu, zile, litere), `switch` este mai clar. Când ai **intervale sau condiții combinate**, rămâi la `if`.

---

## 4. Limitele lui `switch`

`switch` compară doar **egalitatea** cu valori fixe. Nu merge pentru:
- intervale (`nota >= 5`);
- condiții combinate (`a > 3 && b < 4`);
- `string` sau `double` în paranteze.

### Exemplul 11 — Un truc pentru intervale: împărțirea

```cpp
#include <iostream>
using namespace std;

int main() {
    int punctaj;

    cout << "Punctaj (0-100): ";
    cin >> punctaj;

    switch (punctaj / 10) {
        case 10:
        case 9:
            cout << "Calificativ A" << endl;
            break;
        case 8:
            cout << "Calificativ B" << endl;
            break;
        case 7:
            cout << "Calificativ C" << endl;
            break;
        case 6:
        case 5:
            cout << "Calificativ D" << endl;
            break;
        default:
            cout << "Calificativ F" << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `87`):
```
Punctaj (0-100): 87
Calificativ B
```

**Rulare 2** (tastezi `100`):
```
Punctaj (0-100): 100
Calificativ A
```

Împărțirea la 10 (L4) transformă un interval într-o singură valoare: `80…89` devin `8`. Deci `punctaj / 10` ia valoarea `8` pentru orice punctaj din intervalul 80–89. Este un truc de reținut, dar nu abuza de el: pentru intervale neregulate, un lanț `else if` rămâne soluția clară.

### Exemplul 12 — Zarul

```cpp
#include <iostream>
using namespace std;

int main() {
    int zar;

    cout << "Ce ai dat cu zarul (1-6)? ";
    cin >> zar;

    switch (zar) {
        case 6:
            cout << "Sase! Ai castigat o tura bonus!" << endl;
            break;
        case 1:
            cout << "Unu... pierzi tura." << endl;
            break;
        case 2:
        case 3:
        case 4:
        case 5:
            cout << "Muti " << zar << " casute." << endl;
            break;
        default:
            cout << "Zarul nu are aceasta fata." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `4`):
```
Ce ai dat cu zarul (1-6)? 4
Muti 4 casute.
```

---

## 5. Proiecte mici

### Exemplul 13 — Cafeneaua: meniu cu preț

```cpp
#include <iostream>
using namespace std;

int main() {
    int produs, cantitate;
    int pret = 0;

    cout << "===== CAFENEAUA CODE KIDS =====" << endl;
    cout << "1. Ceai ............. 8 lei" << endl;
    cout << "2. Limonada ......... 12 lei" << endl;
    cout << "3. Briosa ........... 10 lei" << endl;
    cout << "4. Tort (felie) ..... 18 lei" << endl;
    cout << "Alege produsul: ";
    cin >> produs;

    switch (produs) {
        case 1: pret = 8; break;
        case 2: pret = 12; break;
        case 3: pret = 10; break;
        case 4: pret = 18; break;
        default:
            cout << "Produs inexistent." << endl;
            return 0;
    }

    cout << "Cantitate: ";
    cin >> cantitate;

    cout << "Total: " << pret * cantitate << " lei" << endl;
    return 0;
}
```

**Rulare** (tastezi `2` și `3`):
```
===== CAFENEAUA CODE KIDS =====
1. Ceai ............. 8 lei
2. Limonada ......... 12 lei
3. Briosa ........... 10 lei
4. Tort (felie) ..... 18 lei
Alege produsul: 2
Cantitate: 3
Total: 36 lei
```

Observă două idei noi:
- `switch` poate **seta o variabilă** (`pret`), iar restul programului o folosește;
- pe ramura `default` folosim `return 0;`, care **încheie programul** pe loc. Nu mai are sens să cerem cantitatea pentru un produs care nu există.

### Exemplul 14 — Aventura ta (alege-ți drumul)

```cpp
#include <iostream>
using namespace std;

int main() {
    int drum;

    cout << "Esti in fata unei paduri intunecate." << endl;
    cout << "1. Intri pe poteca" << endl;
    cout << "2. Ocolesti padurea" << endl;
    cout << "3. Te intorci acasa" << endl;
    cout << "Ce alegi? ";
    cin >> drum;

    switch (drum) {
        case 1:
            cout << "Gasesti o pestera plina de comori!" << endl;
            break;
        case 2:
            cout << "Ajungi la un lac. Un pescar te invita la masa." << endl;
            break;
        case 3:
            cout << "Acasa e bine, dar aventura s-a terminat." << endl;
            break;
        default:
            cout << "Stai si te gandesti... si se face seara." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `1`):
```
Esti in fata unei paduri intunecate.
1. Intri pe poteca
2. Ocolesti padurea
3. Te intorci acasa
Ce alegi? 1
Gasesti o pestera plina de comori!
```

### Exemplul 15 — Meniul jocului cu două niveluri

```cpp
#include <iostream>
using namespace std;

int main() {
    int principal;

    cout << "===== MENIU PRINCIPAL =====" << endl;
    cout << "1. Joc nou" << endl;
    cout << "2. Setari" << endl;
    cout << "3. Iesire" << endl;
    cout << "Alege: ";
    cin >> principal;

    switch (principal) {
        case 1:
            cout << "Se incarca nivelul 1..." << endl;
            break;
        case 2: {
            int setare;
            cout << "--- SETARI ---" << endl;
            cout << "1. Sunet" << endl;
            cout << "2. Grafica" << endl;
            cout << "Alege: ";
            cin >> setare;

            switch (setare) {
                case 1:
                    cout << "Sunetul a fost schimbat." << endl;
                    break;
                case 2:
                    cout << "Grafica a fost schimbata." << endl;
                    break;
                default:
                    cout << "Setare inexistenta." << endl;
            }
            break;
        }
        case 3:
            cout << "La revedere!" << endl;
            break;
        default:
            cout << "Optiune invalida." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `2`, apoi `1`):
```
===== MENIU PRINCIPAL =====
1. Joc nou
2. Setari
3. Iesire
Alege: 2
--- SETARI ---
1. Sunet
2. Grafica
Alege: 1
Sunetul a fost schimbat.
```

Un `switch` poate conține alt `switch`. Când declari o variabilă nouă într-un `case` (aici `int setare;`), pune `case`-ul între **acolade** `{ }`, ca în exemplu. Fără ele, compilatorul dă eroare.

### Exemplul 16 — Convertor de unități cu meniu

```cpp
/*
   Program: Convertor de unitati
   Meniu:   1 = km -> m, 2 = ore -> minute, 3 = kg -> g
*/
#include <iostream>
using namespace std;

int main() {
    int optiune;
    double valoare;

    cout << "===== CONVERTOR =====" << endl;
    cout << "1. Kilometri in metri" << endl;
    cout << "2. Ore in minute" << endl;
    cout << "3. Kilograme in grame" << endl;
    cout << "Alege: ";
    cin >> optiune;

    cout << "Valoarea: ";
    cin >> valoare;

    switch (optiune) {
        case 1:
            cout << valoare << " km = " << valoare * 1000 << " m" << endl;
            break;
        case 2:
            cout << valoare << " ore = " << valoare * 60 << " minute" << endl;
            break;
        case 3:
            cout << valoare << " kg = " << valoare * 1000 << " g" << endl;
            break;
        default:
            cout << "Optiune invalida." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `2` și `1.5`):
```
===== CONVERTOR =====
1. Kilometri in metri
2. Ore in minute
3. Kilograme in grame
Alege: 2
Valoarea: 1.5
1.5 ore = 90 minute
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Meniul cafenelei” (obligatoriu)
Scrie un meniu cu minimum 3 opțiuni, în `switch`. Fiecare opțiune afișează un mesaj sau un preț. Adaugă `default` pentru opțiunile invalide și `break` la fiecare `case`.

### Exercițiul B — Zilele săptămânii
Citește un număr de la 1 la 7 și afișează numele zilei. Pentru orice altceva, afișează un mesaj de eroare.

### Exercițiul C — Calculator cu meniu
Afișează un meniu: 1 = adunare, 2 = scădere, 3 = înmulțire, 4 = împărțire. Citește opțiunea și două numere, apoi afișează rezultatul. La împărțire, verifică dacă împărțitorul este 0.

### Exercițiul D — Anotimpul
Citește numărul unei luni și afișează anotimpul, grupând lunile cu mai multe `case`-uri puse unul sub altul.

### Exercițiul E — Greșeala cu `break`
Ia un program al tău și scoate intenționat un `break`. Rulează-l și explică pe foaie ce se afișează în plus și de ce.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Meniul are minimum 3 `case` + `default`  
- [ ] Fiecare `case` se termină cu `break`  
- [ ] Citești opțiunea cu `cin`  
- [ ] Ai testat o opțiune invalidă  
- [ ] Fișierul se numește `Prenume_Nume_L9.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Zilele săptămânii cu grupare: zile de lucru și weekend  
- [ ] Meniu calculator cu operatorul citit ca `char` (`+`, `-`, `*`, `/`)  
- [ ] Un meniu cu două niveluri, ca în Exemplul 15  
- [ ] Adaugă o opțiune în plus la meniul de acasă (opțiunea 5) și testeaz-o  
- [ ] Pe foaie, demonstrează fall-through cu un exemplu și desenează săgeți  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Se afișează mai multe mesaje | Ai uitat `break` | Pune `break;` la finalul fiecărui `case` |
| `jump to case label` sau altă eroare la o variabilă | Ai declarat o variabilă într-un `case` fără acolade | Pune `case X: { … }` |
| `case 1;` | Punct și virgulă în loc de două puncte | `case 1:` |
| `case x > 5:` | `case` nu primește condiții | Folosește `if`, sau o valoare fixă |
| `switch (nume)` cu `string` | `switch` nu merge cu texte | Folosește `if` / `else if` |
| `case 1` și `case 1` | Aceeași valoare apare de două ori | Fiecare valoare doar o dată |
| Pentru un `char`, `case a:` | Lipsesc apostrofurile | `case 'a':` |
| Meniul nu răspunde la opțiuni greșite | Lipsește `default` | Adaugă `default:` |
| Codul de după `switch` rulează, deși opțiunea e greșită | Programul nu s-a oprit pe `default` | Folosește `return 0;` în `default` dacă vrei să se oprească |

---

## Recapitulare pe scurt

- `switch (expresie)` compară expresia cu valorile fixe din `case`-uri și sare la cea potrivită.
- Fiecare `case` se termină cu `break`, altfel programul „cade” în următorul (fall-through).
- `default` prinde toate valorile necunoscute.
- Cazuri puse unul sub altul, fără instrucțiuni între ele, formează un grup (ca un „sau”).
- `switch` merge cu `int` și `char`, nu cu `string` sau `double`, și compară doar egalitatea.
- Pentru intervale și condiții combinate folosești `if … else if`.
- O variabilă nouă într-un `case` cere acolade în jurul `case`-ului.

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău și testează fiecare opțiune, inclusiv una invalidă.  
2. Scrie un program „Meniu de pizza” cu 4 tipuri de pizza și prețuri; citește tipul și numărul de porții și afișează totalul.  
3. Scrie un program care citește o cifră (0–9) și o afișează cu litere („trei”, „cinci”, …).  
4. Scrie un program care citește o notă între 1 și 10 și afișează calificativul folosind un `switch` cu grupări de cazuri.  
5. **Bonus:** un joc „Piatră, foarfecă, hârtie” în care jucătorul alege `1`, `2` sau `3`, iar răspunsul programului se alege tot cu `switch` (poți folosi o valoare fixă, în loc de număr aleator).  
6. Salvează tot ca `Tema_L9_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 10
Recapitulăm tot Modulul 1 și construim **mini-proiectul final**: un quiz sau un calculator cu meniu. La final primești insigna **Junior Coder**!
