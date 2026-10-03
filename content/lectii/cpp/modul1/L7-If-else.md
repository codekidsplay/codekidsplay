# LECȚIA 7 — `if-else` și `else if`
**Modulul 1 · Bazele C++ · 2 ore**  
**Code Kids Play · Junior Coder**

> Azi înveți să alegi **exact un drum** din două sau mai multe: dacă ceva e adevărat faci un lucru, altfel faci altul.  
> Proiect: **„Calificativul tău”** · fișier: `Prenume_Nume_L7.cpp` (ex. `Ana_Pop_L7.cpp`)

---

## Obiectiv
La finalul orei scrii programe cu `if … else`, înlănțui mai multe cazuri cu `else if`, înțelegi de ce **ordinea** condițiilor contează și folosești `if`-uri imbricate (unul în altul) pentru decizii în mai mulți pași.  
**Minim:** un program cu `if … else` testat pe ambele ramuri.  
**Ținta orei (Complet):** + un lanț `else if` cu cel puțin 3 cazuri și un caz final `else`.

## De ce contează
În L6, fiecare `if` era independent: uneori apăreau două mesaje, alteori niciunul. De cele mai multe ori vrem altceva: **exact un răspuns** pentru fiecare situație. Un joc care îți spune „Ai câștigat” sau „Ai pierdut”, un meniu care alege o singură opțiune, o notă care primește un singur calificativ: toate folosesc `else`.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L6: ce nu ne place la `if`-urile separate |
| 10–35 | `if … else` (**Exemplele 1–4**) |
| 35–65 | `else if`: lanț de cazuri (**Exemplele 5–8**) |
| 65–80 | Ordinea condițiilor (**Exemplul 9**) |
| 80–95 | `if` în `if` (**Exemplele 10–11**) |
| 95–115 | Proiecte (**Exemplele 12–15**) |
| 115–120 | Recap și temă |

---

## 1. `if … else`

```
if (conditie) {
    // se executa daca conditia este ADEVARATA
} else {
    // se executa in orice alt caz, adica daca este FALSA
}
```

Exact **una** dintre cele două ramuri se execută, niciodată amândouă și niciodată niciuna. `else` nu are condiție: înseamnă „în caz contrar”.

### Exemplul 1 — Admis sau respins

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota;

    cout << "Introdu nota: ";
    cin >> nota;

    if (nota >= 5) {
        cout << "Admis!" << endl;
    } else {
        cout << "Respins." << endl;
    }

    cout << "Sfarsit program." << endl;
    return 0;
}
```

**Rulare 1** (tastezi `8`):
```
Introdu nota: 8
Admis!
Sfarsit program.
```

**Rulare 2** (tastezi `3`):
```
Introdu nota: 3
Respins.
Sfarsit program.
```

Comparat cu L6: nu mai trebuie să scrii a doua condiție (`nota < 5`). `else` o acoperă singur.

### Exemplul 2 — Par sau impar

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Introdu un numar: ";
    cin >> n;

    if (n % 2 == 0) {
        cout << n << " este par." << endl;
    } else {
        cout << n << " este impar." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `17`):
```
Introdu un numar: 17
17 este impar.
```

### Exemplul 3 — Maximul dintre două numere

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;

    cout << "Introdu doua numere: ";
    cin >> a >> b;

    int maxim;
    if (a > b) {
        maxim = a;
    } else {
        maxim = b;
    }

    cout << "Maximul este " << maxim << endl;
    return 0;
}
```

**Rulare** (tastezi `14 9`):
```
Introdu doua numere: 14 9
Maximul este 14
```

Un `if … else` poate completa o variabilă cu valori diferite. Dacă numerele sunt egale, merge `else` și `maxim` primește `b`, care este tot egal cu `a`, deci rezultatul rămâne corect.

### Exemplul 4 — Parola cu mesaj pentru ambele cazuri

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string parola;

    cout << "Parola: ";
    cin >> parola;

    if (parola == "codekids") {
        cout << "Acces permis. Bine ai venit!" << endl;
    } else {
        cout << "Parola gresita. Incearca din nou." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `abc`):
```
Parola: abc
Parola gresita. Incearca din nou.
```

**Încearcă tu (8 min)**  
- [ ] Citești un număr și afișezi „pozitiv” sau „nu este pozitiv”  
- [ ] Citești vârsta și afișezi „major” sau „minor”  
- [ ] Rescrii Exemplul 9 din L6 (parola) folosind `else` în loc de două condiții  

---

## 2. `else if`: mai multe drumuri

Când ai **mai mult de două** cazuri, înlănțuiești condițiile cu `else if`:

```
if (conditia1) {
    // cazul 1
} else if (conditia2) {
    // cazul 2
} else if (conditia3) {
    // cazul 3
} else {
    // toate celelalte cazuri
}
```

Programul verifică condițiile **de sus în jos** și execută blocul **primei condiții adevărate**. După ce a găsit una, **sare peste restul lanțului**. Blocul `else` de la final este opțional și acoperă „orice altceva”.

### Exemplul 5 — Calificativul unei note

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota;

    cout << "Nota (1-10): ";
    cin >> nota;

    if (nota >= 9) {
        cout << "Calificativ: Foarte bine" << endl;
    } else if (nota >= 7) {
        cout << "Calificativ: Bine" << endl;
    } else if (nota >= 5) {
        cout << "Calificativ: Suficient" << endl;
    } else {
        cout << "Calificativ: Insuficient" << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `8`):
```
Nota (1-10): 8
Calificativ: Bine
```

Ce se întâmplă pentru nota `8`: `8 >= 9` este fals, deci trece mai departe. `8 >= 7` este adevărat, deci afișează „Bine” și sare peste restul. De aceea nu mai este nevoie să scrii `nota < 9` în a doua condiție: se știe deja că nota nu e ≥ 9.

### Exemplul 6 — Semnul unui număr

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Introdu un numar: ";
    cin >> n;

    if (n > 0) {
        cout << "Pozitiv" << endl;
    } else if (n < 0) {
        cout << "Negativ" << endl;
    } else {
        cout << "Zero" << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `0`):
```
Introdu un numar: 0
Zero
```

Aceasta este problema din L6 (Exemplul 3), dar acum este mai scurtă și, mai ales, mai sigură: exact un mesaj, indiferent de număr.

### Exemplul 7 — Prețul biletului pe categorii de vârstă

```cpp
#include <iostream>
using namespace std;

int main() {
    int varsta;
    int pret;

    cout << "Varsta: ";
    cin >> varsta;

    if (varsta < 6) {
        pret = 0;
    } else if (varsta < 18) {
        pret = 10;
    } else if (varsta < 65) {
        pret = 20;
    } else {
        pret = 12;
    }

    cout << "Pretul biletului: " << pret << " lei" << endl;
    return 0;
}
```

**Rulare** (tastezi `15`):
```
Varsta: 15
Pretul biletului: 10 lei
```

| Vârsta | Preț |
|--------|------|
| sub 6 ani | 0 lei |
| 6–17 ani | 10 lei |
| 18–64 ani | 20 lei |
| 65+ ani | 12 lei |

Fiecare condiție se bazează pe faptul că cele de mai sus au fost deja respinse: dacă ajunge la `varsta < 18`, înseamnă că `varsta >= 6`.

### Exemplul 8 — Semafor cu `char`

```cpp
#include <iostream>
using namespace std;

int main() {
    char culoare;

    cout << "Culoarea semaforului (r/g/v): ";
    cin >> culoare;

    if (culoare == 'r') {
        cout << "ROSU: opreste-te!" << endl;
    } else if (culoare == 'g') {
        cout << "GALBEN: pregateste-te." << endl;
    } else if (culoare == 'v') {
        cout << "VERDE: poti trece." << endl;
    } else {
        cout << "Culoare necunoscuta." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `x`):
```
Culoarea semaforului (r/g/v): x
Culoare necunoscuta.
```

Cazul final `else` este locul ideal pentru **valori neașteptate**, de exemplu o literă pe care programul nu o cunoaște.

**Încearcă tu (10 min)**  
- [ ] Rescrii calificativele pentru note cu alte praguri (de exemplu, 10 = Excelent)  
- [ ] Faci un program care citește un număr de la 1 la 3 și afișează „unu”, „doi” sau „trei”, iar pentru alt număr „necunoscut”  
- [ ] Trasezi pe foaie, pas cu pas, ce se întâmplă în Exemplul 5 pentru nota `4`  

---

## 3. Ordinea contează

### Exemplul 9 — Același lanț, ordine greșită

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota = 9;

    // VARIANTA GRESITA: conditia cea mai larga este prima
    if (nota >= 5) {
        cout << "Gresit: Suficient" << endl;
    } else if (nota >= 7) {
        cout << "Gresit: Bine" << endl;
    } else if (nota >= 9) {
        cout << "Gresit: Foarte bine" << endl;
    }

    // VARIANTA CORECTA: de la cel mai restrictiv la cel mai larg
    if (nota >= 9) {
        cout << "Corect: Foarte bine" << endl;
    } else if (nota >= 7) {
        cout << "Corect: Bine" << endl;
    } else if (nota >= 5) {
        cout << "Corect: Suficient" << endl;
    }
    return 0;
}
```

**Ieșire:**
```
Gresit: Suficient
Corect: Foarte bine
```

În varianta greșită, nota `9` verifică mai întâi `9 >= 5`. Condiția este adevărată, deci programul afișează „Suficient” și **nu mai ajunge** la celelalte. Regula: în lanțul `else if`, pune **întâi cazurile cele mai restrictive** (cele mai greu de îndeplinit).

---

## 4. `if` în `if` (decizii imbricate)

Într-un bloc de `if` poți pune alt `if`. Se numește **imbricare**. Folosești asta când a doua întrebare are sens doar dacă prima a avut un anumit răspuns.

### Exemplul 10 — Login în doi pași

```cpp
#include <iostream>
using namespace std;

int main() {
    int utilizator, pin;

    cout << "Cod utilizator: ";
    cin >> utilizator;

    if (utilizator == 1234) {
        cout << "Utilizator gasit. PIN: ";
        cin >> pin;

        if (pin == 42) {
            cout << "Bine ai venit, jucatorule!" << endl;
        } else {
            cout << "PIN gresit." << endl;
        }
    } else {
        cout << "Utilizator necunoscut." << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `1234`, apoi `42`):
```
Cod utilizator: 1234
Utilizator gasit. PIN: 42
Bine ai venit, jucatorule!
```

**Rulare 2** (tastezi `1234`, apoi `7`):
```
Cod utilizator: 1234
Utilizator gasit. PIN: 7
PIN gresit.
```

**Rulare 3** (tastezi `999`):
```
Cod utilizator: 999
Utilizator necunoscut.
```

PIN-ul este cerut doar dacă utilizatorul a fost găsit. Observă cum indentarea arată imediat ce aparține cui: tot ce este mai spre dreapta este „în interiorul” unui `if`.

### Exemplul 11 — Verific datele, apoi decid

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota;

    cout << "Nota (1-10): ";
    cin >> nota;

    if (nota < 1) {
        cout << "Eroare: nota prea mica." << endl;
    } else if (nota > 10) {
        cout << "Eroare: nota prea mare." << endl;
    } else {
        // aici stim sigur ca nota este intre 1 si 10
        if (nota >= 5) {
            cout << "Promovat." << endl;
        } else {
            cout << "Corigent." << endl;
        }
    }
    return 0;
}
```

**Rulare 1** (tastezi `11`):
```
Nota (1-10): 11
Eroare: nota prea mare.
```

**Rulare 2** (tastezi `6`):
```
Nota (1-10): 6
Promovat.
```

În L6 am avut nevoie de `&&` pentru asta. Acum o rezolvi cu un lanț care **mai întâi elimină valorile invalide**, apoi decide pe cele valide. Programele reale fac exact așa.

> **Regulă:** un `else` aparține mereu celui mai apropiat `if` din care nu a fost deja folosit. Dacă ai mai multe `if`-uri imbricate, **acoladele și indentarea** te ajută să vezi clar cine cu cine merge.

---

## 5. Proiecte mici

### Exemplul 12 — Ghici numărul

```cpp
#include <iostream>
using namespace std;

int main() {
    const int SECRET = 37;
    int incercare;

    cout << "Am ales un numar intre 1 si 100. Ghiceste-l: ";
    cin >> incercare;

    if (incercare == SECRET) {
        cout << "Bravo! Ai ghicit!" << endl;
    } else if (incercare < SECRET) {
        cout << "Prea mic. Incearca un numar mai mare." << endl;
    } else {
        cout << "Prea mare. Incearca un numar mai mic." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `50`):
```
Am ales un numar intre 1 si 100. Ghiceste-l: 50
Prea mare. Incearca un numar mai mic.
```

### Exemplul 13 — Maximul dintre trei numere

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b, c;

    cout << "Introdu 3 numere: ";
    cin >> a >> b >> c;

    int maxim = a;
    if (b > maxim) {
        maxim = b;
    }
    if (c > maxim) {
        maxim = c;
    }

    cout << "Maximul este " << maxim << endl;
    return 0;
}
```

**Rulare** (tastezi `8 21 14`):
```
Introdu 3 numere: 8 21 14
Maximul este 21
```

Tehnica este una de reținut: pornești cu `a` ca „cel mai mare până acum” și îl înlocuiești dacă găsești unul mai mare. Merge la fel și pentru 4, 10 sau 100 de numere. Inversând comparațiile (`<` în loc de `>`) obții minimul.

### Exemplul 14 — Reducerea de la magazin

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double total;
    double procent;

    cout << "Totalul cosului (lei): ";
    cin >> total;

    if (total >= 200) {
        procent = 15;
    } else if (total >= 100) {
        procent = 10;
    } else if (total >= 50) {
        procent = 5;
    } else {
        procent = 0;
    }

    double reducere = total * procent / 100;
    double dePlata = total - reducere;

    cout << fixed << setprecision(2);
    cout << "Reducere: " << procent << "% (" << reducere << " lei)" << endl;
    cout << "De plata: " << dePlata << " lei" << endl;
    return 0;
}
```

**Rulare** (tastezi `120`):
```
Totalul cosului (lei): 120
Reducere: 10.00% (12.00 lei)
De plata: 108.00 lei
```

Condițiile sunt ordonate de la cel mai mare prag la cel mai mic, exact cum am învățat la Exemplul 9.

### Exemplul 15 — Taxi: preț în funcție de distanță

```cpp
/*
   Program: Taxi
   Regula:  primii 2 km costa 10 lei (pret fix).
            fiecare km in plus costa 3.5 lei.
*/
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double km;
    double pret;

    cout << "Distanta (km): ";
    cin >> km;

    if (km <= 0) {
        cout << "Distanta trebuie sa fie pozitiva." << endl;
    } else {
        if (km <= 2) {
            pret = 10;
        } else {
            pret = 10 + (km - 2) * 3.5;
        }
        cout << fixed << setprecision(2);
        cout << "Pret cursa: " << pret << " lei" << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `1.5`):
```
Distanta (km): 1.5
Pret cursa: 10.00 lei
```

**Rulare 2** (tastezi `6`):
```
Distanta (km): 6
Pret cursa: 24.00 lei
```

Verificare: pentru 6 km plătești 10 + (6 − 2) · 3.5 = 10 + 14 = 24 lei.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Calificativul tău” (obligatoriu)
Citește o notă și afișează calificativul (Foarte bine / Bine / Suficient / Insuficient), cu un lanț `else if` și un `else` final. Alege tu pragurile.

### Exercițiul B — Maximul dintre trei numere
Citește 3 numere și afișează-l pe cel mai mare. Rezolvă-l cu tehnica din Exemplul 13. Apoi află și minimul.

### Exercițiul C — Anotimpul
Citește numărul unei luni (1–12). Afișează anotimpul. Pentru un număr în afara intervalului, afișează un mesaj de eroare.

### Exercițiul D — Zilele săptămânii
Citește un număr de la 1 la 7 și afișează ziua corespunzătoare (1 = luni). Pentru alt număr, afișează „zi inexistentă”.

### Exercițiul E — Ghici numărul (versiunea ta)
Alege un număr secret (în cod) și permite o singură încercare, cu mesajele „Prea mic”, „Prea mare” sau „Ai ghicit!”.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Are un lanț `if … else if … else` cu minimum 3 cazuri  
- [ ] Ai testat câte o valoare din fiecare caz, plus o valoare la limită (de exemplu exact `5` sau exact `9`)  
- [ ] Condițiile sunt în ordinea corectă (de la cel mai restrictiv)  
- [ ] Fișierul se numește `Prenume_Nume_L7.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Maximul dintre 4 numere, cu tehnica din Exemplul 13  
- [ ] Citește trei numere și afișează-le în ordine crescătoare (indiciu: afișează mai întâi minimul, apoi maximul, apoi cel rămas, calculat cu suma minus cele două)  
- [ ] Calificativ cu note de 1 la 10, cu cazul separat „Nota invalidă” pentru valori în afara intervalului  
- [ ] Tarif de parcare: prima oră 5 lei, următoarele ore câte 3 lei, iar peste 8 ore tarif fix de 25 de lei  
- [ ] Diagramă pe foaie cu săgeți și romburi pentru Exemplul 5  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `'else' without a previous 'if'` | `;` pus înainte de `else` sau acolade nepotrivite | `if (...) { ... } else { ... }` |
| `else` cu condiție: `else (x > 0)` | `else` nu are condiție | Folosește `else if (x > 0)` |
| Lanțul dă mereu primul răspuns | Cazurile sunt în ordine greșită | Pune cazul restrictiv primul |
| Se afișează două mesaje | Ai folosit `if` separate, nu `else if` | Leagă-le cu `else if` |
| Nu se afișează niciun mesaj | Lanțul nu are `else` și nicio condiție nu e adevărată | Adaugă `else` pentru restul cazurilor |
| Un `else` pare să nu aparțină nimănui | Acolade lipsă sau puse greșit | Verifică perechile `{` și `}` |
| `;` după `else` | Blocul `else` devine gol | Fără `;` după `else` |
| Rezultat greșit exact la o limită | `>` în loc de `>=` (sau invers) | Testează valorile de la graniță: 5, 9, 18 |

---

## Recapitulare pe scurt

- `if … else` alege **exact unul** din două drumuri.
- `else if` adaugă cazuri intermediare. Programul execută primul bloc ale cărui condiții sunt adevărate și sare peste restul.
- `else` de la final prinde tot ce nu a fost acoperit și e locul pentru valori neașteptate.
- Ordinea contează: pui întâi cazul cel mai restrictiv.
- Un `if` poate sta în interiorul altui `if` când a doua întrebare depinde de prima.
- Testezi mereu valorile de la graniță, nu doar cele „din mijloc”.

---

## Temă
1. Refă **Exemplele 1–15** pe calculatorul tău și testează fiecare ramură.  
2. Scrie un program care citește un număr de la 1 la 12 și afișează luna (ianuarie, februarie, …).  
3. Scrie un program care citește lungimea a trei bețe și afișează dacă pot forma un triunghi (suma oricăror două este mai mare decât a treia). Poți folosi trei `if`-uri imbricate sau un lanț.  
4. Scrie un program care calculează prețul unei excursii: 100 de lei pentru copii sub 10 ani, 150 de lei pentru 10–17 ani, 200 de lei pentru 18+; la final afișează prețul.  
5. **Bonus:** program care citește două numere și un caracter (`+`, `-`, `*`) și afișează rezultatul operației alese (cu un lanț `else if`).  
6. Salvează tot ca `Tema_L7_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 8
Învățăm **operatorii logici** `&&` (și), `||` (sau) și `!` (nu): cum combini mai multe condiții într-una singură, de exemplu „nota este între 1 și 10” sau „parola și vârsta sunt corecte”.
