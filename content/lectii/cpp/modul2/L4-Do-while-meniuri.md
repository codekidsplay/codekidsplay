# LECȚIA 4 — `do-while` și alegerea buclei
**Modulul 2 · Bucle și vectori · 2 ore**  
**Code Maker Club · Loop Master**

> Azi înveți bucla care **rulează cel puțin o dată**, perfectă pentru meniuri care se repetă și pentru validarea datelor, și înveți să alegi cea mai potrivită buclă pentru fiecare problemă.  
> Proiect: **„Bancomat”** · fișier: `Prenume_Nume_M2L4.cpp` (ex. `Ana_Pop_M2L4.cpp`)

---

## Obiectiv
La finalul orei scrii bucle `do-while`, știi în ce se deosebește de `while`, construiești meniuri care se repetă până alegi ieșirea, validezi datele fără să repeți codul de citire și alegi între `for`, `while` și `do-while` după tipul problemei.  
**Minim:** un meniu cu minimum 3 opțiuni, care se repetă până alegi `0`.  
**Ținta orei (Complet):** + o validare cu `do-while` și întrebarea „Mai vrei o dată? (d/n)”.

## De ce contează
La `while`, condiția se verifică **înaintea** corpului, deci uneori corpul nu rulează deloc. Dar într-un meniu trebuie să afișezi opțiunile **cel puțin o dată**, înainte de orice verificare. Același lucru la validare: citești întâi valoarea și abia apoi vezi dacă e bună. Pentru asta există `do-while`.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare: `for` și `while` |
| 10–30 | Structura `do-while` și diferența față de `while` (**Exemplele 1–3**) |
| 30–55 | Validarea datelor (**Exemplele 4–5**) |
| 55–80 | Meniuri care se repetă (**Exemplele 6–8**) |
| 80–95 | Cifrele unui număr, inclusiv `0` (**Exemplele 9–11**) |
| 95–105 | Alegerea buclei potrivite (**Exemplul 12**) |
| 105–118 | Proiecte (**Exemplele 13–16**) |
| 118–120 | Recap și temă |

> **Pentru ritm lent sau începători:** în clasă faceți mai întâi cele **8 exemple marcate [Esențial]** (inclusiv proiectul sau exemplul final, acolo unde e cazul). Ele acoperă tot ce trebuie să rămână după lecție. Restul exemplelor sunt pentru cine merge repede sau pentru acasă.

---

## 1. Structura `do-while`

```
do {
    // instructiuni (se executa cel putin o data)
} while (conditie);
```

Observă două lucruri:
- **mai întâi** se execută corpul, **apoi** se verifică condiția;
- după `while (conditie)` se pune **`;`** (la `while` obișnuit nu se pune!).

Dacă condiția este adevărată, bucla se repetă; dacă este falsă, se termină.

### Exemplul 1 — Corpul rulează cel puțin o dată **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 10;

    do {
        cout << "Corpul a rulat, i = " << i << endl;
        i++;
    } while (i < 5);

    cout << "Gata." << endl;
    return 0;
}
```

**Ieșire:**
```
Corpul a rulat, i = 10
Gata.
```

Condiția `i < 5` este falsă încă de la început (`10 < 5`), dar corpul a rulat **o dată** oricum, pentru că verificarea vine după.

### Exemplul 2 — `while` și `do-while`, față în față **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;

    cout << "while:" << endl;
    while (a < 5) {
        cout << "  a = " << a << endl;
        a++;
    }

    int b = 10;
    cout << "do-while:" << endl;
    do {
        cout << "  b = " << b << endl;
        b++;
    } while (b < 5);

    return 0;
}
```

**Ieșire:**
```
while:
do-while:
  b = 10
```

Aceeași condiție, aceeași valoare inițială, rezultate diferite: `while` nu a afișat nimic, `do-while` a afișat o dată.

### Exemplul 3 — Numărăm de la 1 la 5

```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 1;

    do {
        cout << i << " ";
        i++;
    } while (i <= 5);

    cout << endl;
    return 0;
}
```

**Ieșire:**
```
1 2 3 4 5 
```

Pentru numărări obișnuite `for` este mai clar. Folosești `do-while` când **ai nevoie de o execuție garantată**.

**Încearcă tu (8 min)**  
- [ ] Scrii o buclă `do-while` care afișează numerele de la 10 la 1  
- [ ] Verifici ce se întâmplă dacă condiția e falsă de la început  
- [ ] Ștergi `;` de după `while (…)` și citești eroarea  

---

## 2. Validarea datelor

Cu `while` trebuia să citești **înainte** de buclă și apoi **din nou** în buclă (Lecția 3, Exemplul 5). Cu `do-while`, citirea apare o singură dată.

### Exemplul 4 — Nota între 1 și 10, fără cod repetat **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int nota;

    do {
        cout << "Introdu o nota (1-10): ";
        cin >> nota;
        if (nota < 1 || nota > 10) {
            cout << "Nota invalida!" << endl;
        }
    } while (nota < 1 || nota > 10);

    cout << "Nota " << nota << " a fost acceptata." << endl;
    return 0;
}
```

**Rulare** (tastezi `11`, `0`, `7`):
```
Introdu o nota (1-10): 11
Nota invalida!
Introdu o nota (1-10): 0
Nota invalida!
Introdu o nota (1-10): 7
Nota 7 a fost acceptata.
```

Mesajul „Introdu o nota” apare o singură dată în cod, în interiorul buclei. Ai evitat repetarea liniilor de citire.

### Exemplul 5 — PIN cu limită de încercări **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    const int PIN_CORECT = 4271;
    int pin;
    int incercari = 0;

    do {
        cout << "Introdu PIN-ul: ";
        cin >> pin;
        incercari++;

        if (pin != PIN_CORECT) {
            cout << "PIN gresit. Incercari ramase: " << 3 - incercari << endl;
        }
    } while (pin != PIN_CORECT && incercari < 3);

    if (pin == PIN_CORECT) {
        cout << "Acces permis." << endl;
    } else {
        cout << "Cardul a fost blocat." << endl;
    }
    return 0;
}
```

**Rulare 1** (tastezi `1111`, apoi `4271`):
```
Introdu PIN-ul: 1111
PIN gresit. Incercari ramase: 2
Introdu PIN-ul: 4271
Acces permis.
```

**Rulare 2** (tastezi `1111`, `2222`, `3333`):
```
Introdu PIN-ul: 1111
PIN gresit. Incercari ramase: 2
Introdu PIN-ul: 2222
PIN gresit. Incercari ramase: 1
Introdu PIN-ul: 3333
PIN gresit. Incercari ramase: 0
Cardul a fost blocat.
```

Bucla se repetă cât timp PIN-ul este greșit **și** nu s-au consumat cele 3 încercări. Pe urmă, un `if` după buclă decide ce s-a întâmplat: a ieșit pentru că a nimerit PIN-ul sau pentru că a rămas fără încercări.

**Încearcă tu (10 min)**  
- [ ] Ceri o parolă numerică și repeți până este corectă  
- [ ] Ceri un număr pozitiv și repeți până îl primești  
- [ ] Adaugi o limită de 5 încercări  

---

## 3. Meniuri care se repetă

Un meniu trebuie afișat cel puțin o dată, deci `do-while` este alegerea naturală.

### Exemplul 6 — Meniu simplu, repetat până la `0` **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    int optiune;

    do {
        cout << endl << "===== MENIU =====" << endl;
        cout << "1. Salut" << endl;
        cout << "2. Gluma" << endl;
        cout << "3. Sfat" << endl;
        cout << "0. Iesire" << endl;
        cout << "Alege: ";
        cin >> optiune;

        switch (optiune) {
            case 1:
                cout << "Salut, programatorule!" << endl;
                break;
            case 2:
                cout << "De ce nu iese calculatorul din casa? Ii e frica de bug-uri." << endl;
                break;
            case 3:
                cout << "Testeaza programul cu valori diferite." << endl;
                break;
            case 0:
                cout << "La revedere!" << endl;
                break;
            default:
                cout << "Optiune invalida." << endl;
        }
    } while (optiune != 0);

    return 0;
}
```

**Rulare** (tastezi `1`, `7`, `0`):
```

===== MENIU =====
1. Salut
2. Gluma
3. Sfat
0. Iesire
Alege: 1
Salut, programatorule!

===== MENIU =====
1. Salut
2. Gluma
3. Sfat
0. Iesire
Alege: 7
Optiune invalida.

===== MENIU =====
1. Salut
2. Gluma
3. Sfat
0. Iesire
Alege: 0
La revedere!
```

Tiparul „meniu cu `do-while` + `switch`” este baza oricărei aplicații cu meniu. Cât timp opțiunea nu este `0`, meniul revine pe ecran.

### Exemplul 7 — „Mai vrei o dată?” **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    char raspuns;

    do {
        int n;
        cout << "Introdu un numar: ";
        cin >> n;
        cout << "Patratul lui " << n << " este " << n * n << endl;

        cout << "Mai vrei un calcul? (d/n): ";
        cin >> raspuns;
    } while (raspuns == 'd' || raspuns == 'D');

    cout << "Pe curand!" << endl;
    return 0;
}
```

**Rulare** (tastezi `4`, `d`, `9`, `n`):
```
Introdu un numar: 4
Patratul lui 4 este 16
Mai vrei un calcul? (d/n): d
Introdu un numar: 9
Patratul lui 9 este 81
Mai vrei un calcul? (d/n): n
Pe curand!
```

Tiparul este foarte folosit în programele care repetă o acțiune la cererea utilizatorului. Condiția acceptă și `d`, și `D`.

### Exemplul 8 — Adaug produse în coș **[Esențial]**

```cpp
#include <iostream>
using namespace std;

int main() {
    double total = 0;
    int produse = 0;
    char alt;

    do {
        double pret;
        cout << "Pretul produsului (lei): ";
        cin >> pret;

        total += pret;
        produse++;

        cout << "Mai adaugi un produs? (d/n): ";
        cin >> alt;
    } while (alt == 'd');

    cout << "Ai " << produse << " produse. Total: " << total << " lei." << endl;
    return 0;
}
```

**Rulare** (tastezi `12.5`, `d`, `8`, `d`, `20`, `n`):
```
Pretul produsului (lei): 12.5
Mai adaugi un produs? (d/n): d
Pretul produsului (lei): 8
Mai adaugi un produs? (d/n): d
Pretul produsului (lei): 20
Mai adaugi un produs? (d/n): n
Ai 3 produse. Total: 40.5 lei.
```

Nu știi câte produse va cumpăra clientul. Și trebuie să existe cel puțin un produs, deci `do-while` se potrivește.

**Încearcă tu (10 min)**  
- [ ] Faci un meniu cu 3 opțiuni, repetat până alegi `0`  
- [ ] Adaugi „Mai vrei o dată?” la un program al tău din Modulul 1  
- [ ] Calculezi un total din prețuri introduse până când răspunzi `n`  

---

## 4. Cifrele unui număr, inclusiv `0`

În lecția anterioară, pentru `n = 0`, `while (n > 0)` nu rula deloc, iar `0` ieșea „cu zero cifre”. Cu `do-while` corpul rulează cel puțin o dată, deci problema dispare.

### Exemplul 9 — Câte cifre are un număr (corect și pentru 0)

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Numarul: ";
    cin >> n;

    int copie = n;
    int cifre = 0;

    do {
        cifre++;
        copie /= 10;
    } while (copie > 0);

    cout << n << " are " << cifre << " cifre." << endl;
    return 0;
}
```

**Rulare 1** (tastezi `0`):
```
Numarul: 0
0 are 1 cifre.
```

**Rulare 2** (tastezi `5063`):
```
Numarul: 5063
5063 are 4 cifre.
```

### Exemplul 10 — Suma cifrelor și cifra maximă

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Numarul: ";
    cin >> n;

    int copie = n;
    int suma = 0;
    int maxim = 0;

    do {
        int cifra = copie % 10;
        suma += cifra;
        if (cifra > maxim) {
            maxim = cifra;
        }
        copie /= 10;
    } while (copie > 0);

    cout << "Suma cifrelor: " << suma << endl;
    cout << "Cifra maxima: " << maxim << endl;
    return 0;
}
```

**Rulare** (tastezi `48273`):
```
Numarul: 48273
Suma cifrelor: 24
Cifra maxima: 8
```

> **Notă:** exemplul de mai jos este mai greu și **nu este necesar pentru proiectul lecției**. Dacă te simți nesigur, citește-l doar ca să vezi ce se poate face, apoi treci mai departe.

### Exemplul 11 — Un număr în baza 2, inclusiv pentru 0 *(Provocare, opțional)*

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cout << "Numarul (zecimal): ";
    cin >> n;

    string binar = "";
    int copie = n;

    do {
        binar = (char)('0' + copie % 2) + binar;
        copie /= 2;
    } while (copie > 0);

    cout << n << " in binar este " << binar << endl;
    return 0;
}
```

**Rulare 1** (tastezi `0`):
```
Numarul (zecimal): 0
0 in binar este 0
```

**Rulare 2** (tastezi `10`):
```
Numarul (zecimal): 10
10 in binar este 1010
```

Compară cu varianta din lecția anterioară: acolo aveai un `if` special pentru `0`. Aici `do-while` rezolvă singur cazul.

---

## 5. Alegerea buclei potrivite

| Situație | Bucla potrivită |
|----------|-----------------|
| Știi **de câte ori** repeți (n numere, 10 note, tabla înmulțirii) | `for` |
| **Nu știi** de câte ori; poate nu rulează deloc (citire până la 0, cifrele unui număr) | `while` |
| Trebuie să ruleze **cel puțin o dată** (meniu, validare, „mai vrei o dată?”) | `do-while` |

Cele trei bucle pot rezolva aceleași probleme, dar una e mereu mai clară. Dacă eziți, întreabă-te: „Știu de câte ori? Trebuie să se execute măcar o dată?”.

### Exemplul 12 — Aceeași problemă în trei feluri *(Provocare, opțional)*

Afișăm numerele de la 1 la 5 cu fiecare buclă:

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "for:      ";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }

    cout << endl << "while:    ";
    int j = 1;
    while (j <= 5) {
        cout << j << " ";
        j++;
    }

    cout << endl << "do-while: ";
    int k = 1;
    do {
        cout << k << " ";
        k++;
    } while (k <= 5);

    cout << endl;
    return 0;
}
```

**Ieșire:**
```
for:      1 2 3 4 5 
while:    1 2 3 4 5 
do-while: 1 2 3 4 5 
```

Pentru o numărare, `for` este cea mai scurtă și cea mai clară. Celelalte două sunt potrivite când condiția de oprire nu este un contor.

---

## 6. Proiecte mici

### Exemplul 13 — Ghicește numărul, cu `do-while`

```cpp
#include <iostream>
using namespace std;

int main() {
    const int SECRET = 64;
    int incercare;
    int incercari = 0;

    cout << "Ghiceste numarul dintre 1 si 100." << endl;

    do {
        cout << "Incercarea ta: ";
        cin >> incercare;
        incercari++;

        if (incercare < SECRET) {
            cout << "Prea mic!" << endl;
        } else if (incercare > SECRET) {
            cout << "Prea mare!" << endl;
        }
    } while (incercare != SECRET);

    cout << "Bravo! Ai ghicit din " << incercari << " incercari." << endl;
    return 0;
}
```

**Rulare** (tastezi `50`, `75`, `64`):
```
Ghiceste numarul dintre 1 si 100.
Incercarea ta: 50
Prea mic!
Incercarea ta: 75
Prea mare!
Incercarea ta: 64
Bravo! Ai ghicit din 3 incercari.
```

Comparat cu varianta din lecția anterioară, nu mai ai nevoie să scrii de două ori citirea. Programul e mai scurt, fără cod repetat.

### Exemplul 14 — Tabla înmulțirii, repetată la cerere

```cpp
#include <iostream>
using namespace std;

int main() {
    char alta;

    do {
        int n;
        cout << "Tabla inmultirii cu: ";
        cin >> n;

        for (int i = 1; i <= 10; i++) {
            cout << n << " x " << i << " = " << n * i << endl;
        }

        cout << "Alta tabla? (d/n): ";
        cin >> alta;
    } while (alta == 'd');

    cout << "Spor la invatat!" << endl;
    return 0;
}
```

**Rulare** (tastezi `2`, `d`, `5`, `n`):
```
Tabla inmultirii cu: 2
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
2 x 4 = 8
2 x 5 = 10
2 x 6 = 12
2 x 7 = 14
2 x 8 = 16
2 x 9 = 18
2 x 10 = 20
Alta tabla? (d/n): d
Tabla inmultirii cu: 5
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50
Alta tabla? (d/n): n
Spor la invatat!
```

O buclă `for` poate sta în interiorul unei bucle `do-while`. Despre bucle în bucle vorbim pe larg în lecția următoare.

### Exemplul 15 — Bancomat (mini-proiect) **[Esențial]**

```cpp
/*
   Program: Bancomat
   Scop:    meniu care se repeta: sold, depunere, retragere
*/
#include <iostream>
using namespace std;

int main() {
    int sold = 1000;
    int optiune;

    do {
        cout << endl << "===== BANCOMAT =====" << endl;
        cout << "1. Vezi soldul" << endl;
        cout << "2. Depune bani" << endl;
        cout << "3. Retrage bani" << endl;
        cout << "0. Iesire" << endl;
        cout << "Alege: ";
        cin >> optiune;

        switch (optiune) {
            case 1:
                cout << "Sold curent: " << sold << " lei" << endl;
                break;
            case 2: {
                int suma;
                do {
                    cout << "Suma de depus (peste 0): ";
                    cin >> suma;
                } while (suma <= 0);
                sold += suma;
                cout << "Ai depus " << suma << " lei. Sold nou: " << sold << " lei" << endl;
                break;
            }
            case 3: {
                int suma;
                cout << "Suma de retras: ";
                cin >> suma;
                if (suma <= 0) {
                    cout << "Suma trebuie sa fie pozitiva." << endl;
                } else if (suma > sold) {
                    cout << "Fonduri insuficiente." << endl;
                } else {
                    sold -= suma;
                    cout << "Ai retras " << suma << " lei. Sold nou: " << sold << " lei" << endl;
                }
                break;
            }
            case 0:
                cout << "Multumim ca ai folosit bancomatul!" << endl;
                break;
            default:
                cout << "Optiune invalida." << endl;
        }
    } while (optiune != 0);

    return 0;
}
```

**Rulare** (tastezi `1`, `2`, `-5`, `300`, `3`, `2000`, `3`, `500`, `0`):
```

===== BANCOMAT =====
1. Vezi soldul
2. Depune bani
3. Retrage bani
0. Iesire
Alege: 1
Sold curent: 1000 lei

===== BANCOMAT =====
1. Vezi soldul
2. Depune bani
3. Retrage bani
0. Iesire
Alege: 2
Suma de depus (peste 0): -5
Suma de depus (peste 0): 300
Ai depus 300 lei. Sold nou: 1300 lei

===== BANCOMAT =====
1. Vezi soldul
2. Depune bani
3. Retrage bani
0. Iesire
Alege: 3
Suma de retras: 2000
Fonduri insuficiente.

===== BANCOMAT =====
1. Vezi soldul
2. Depune bani
3. Retrage bani
0. Iesire
Alege: 3
Suma de retras: 500
Ai retras 500 lei. Sold nou: 800 lei

===== BANCOMAT =====
1. Vezi soldul
2. Depune bani
3. Retrage bani
0. Iesire
Alege: 0
Multumim ca ai folosit bancomatul!
```

Observă:
- un `do-while` pentru meniul principal și altul **în interior** pentru validarea sumei depuse;
- cazurile care declară variabile (`int suma;`) sunt puse între acolade (Modulul 1, lecția 9);
- soldul rămâne păstrat între opțiuni, pentru că este declarat **în afara** buclei.

### Exemplul 16 — Joc: scapă din camera încuiată

```cpp
#include <iostream>
using namespace std;

int main() {
    const int COD = 731;
    int cod;
    int incercari = 0;
    const int MAXIM = 4;

    cout << "Esti intr-o camera incuiata. Ghiceste codul de 3 cifre!" << endl;
    cout << "Ai " << MAXIM << " incercari." << endl;

    do {
        cout << "Cod: ";
        cin >> cod;
        incercari++;

        if (cod == COD) {
            break;
        }

        int cifreCorecte = 0;
        if (cod / 100 == COD / 100) {
            cifreCorecte++;
        }
        if (cod / 10 % 10 == COD / 10 % 10) {
            cifreCorecte++;
        }
        if (cod % 10 == COD % 10) {
            cifreCorecte++;
        }
        cout << "Gresit. Cifre pe pozitia corecta: " << cifreCorecte << endl;
    } while (incercari < MAXIM);

    if (cod == COD) {
        cout << "Usa se deschide! Ai scapat din " << incercari << " incercari." << endl;
    } else {
        cout << "Ai ramas inchis. Codul era " << COD << "." << endl;
    }
    return 0;
}
```

**Rulare** (tastezi `123`, `740`, `731`):
```
Esti intr-o camera incuiata. Ghiceste codul de 3 cifre!
Ai 4 incercari.
Cod: 123
Gresit. Cifre pe pozitia corecta: 0
Cod: 740
Gresit. Cifre pe pozitia corecta: 1
Cod: 731
Usa se deschide! Ai scapat din 3 incercari.
```

Jocul folosește tot ce știi: `do-while` cu număr limitat de încercări, `break`, `/` și `%` pentru cifre, `const` și `if`. După fiecare încercare greșită, jucătorul primește un indiciu.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Bancomat” (obligatoriu)
Scrie un program cu un meniu care se repetă până alegi `0`. Include minimum 3 opțiuni (de exemplu sold, depunere, retragere) și validarea sumelor introduse.

### Exercițiul B — Validare cu `do-while`
Cere o vârstă între 5 și 18 ani și repetă cererea până primești o valoare bună. Folosește un singur `cin` în cod.

### Exercițiul C — Mai vrei o dată?
Scrie un program care citește două numere și afișează suma lor, apoi întreabă „Mai vrei un calcul? (d/n)”, și repetă cât timp răspunsul este `d`.

### Exercițiul D — Cifrele unui număr
Citește un număr natural (inclusiv `0`) și afișează câte cifre pare și câte cifre impare are, folosind `do-while`.

### Exercițiul E — Alege bucla
Pentru fiecare dintre problemele de mai jos, scrie pe foaie ce buclă ai folosi și de ce: (1) afișează tabla înmulțirii cu 4; (2) cere o parolă până e corectă; (3) citește numere până se introduce `-1`; (4) calculează suma cifrelor unui număr; (5) afișează meniul unui joc.

**Gata când:**
- [ ] Programul compilează fără erori  
- [ ] Folosește minimum o buclă `do-while` (cu `;` după `while (…)`)  
- [ ] Meniul se repetă și se oprește corect cu `0`  
- [ ] Ai testat o opțiune invalidă  
- [ ] Ai explicat pe foaie diferența dintre `while` și `do-while`  
- [ ] Fișierul se numește `Prenume_Nume_M2L4.cpp`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă la bancomat o opțiune de „Transfer către alt cont” (doar mesaj și scăderea din sold)  
- [ ] Adaugă la bancomat un PIN de intrare cu 3 încercări (ca în Exemplul 5)  
- [ ] Scrie un joc „Piatră, foarfecă, hârtie” în care jucătorul joacă mai multe runde contra unei alegeri fixe a calculatorului, cu scor, până alege să iasă  
- [ ] Scrie un program care convertește mai multe numere din zecimal în binar, până când răspunzi `n` la „Mai vrei?”  
- [ ] Adaugă la Exemplul 16 un mesaj care spune dacă numărul introdus e prea mic sau prea mare față de cod  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Eroare de compilare de tip `expected ';'` la linia de după buclă | Ai uitat `;` după `while (…)` la `do-while` | `} while (conditie);` |
| `;` pus și după `while` la bucla `while` obișnuită | Confuzie între cele două | Doar `do-while` are `;` |
| Meniul nu se oprește niciodată | Condiția nu include opțiunea de ieșire | `while (optiune != 0);` |
| Variabila din condiție „nu există” | Ai declarat-o în interiorul buclei (`int optiune;` în corp) | Declar-o **înainte** de `do` |
| Soldul revine mereu la 1000 | `int sold = 1000;` este în interiorul buclei | Declară-l înainte de `do` |
| `jump to case label` | Variabilă declarată într-un `case` fără acolade | `case 2: { int suma; … break; }` |
| Mesajul de eroare apare chiar și la o valoare bună | `if` și `while` au condiții diferite | Folosește aceeași condiție în ambele |
| Rămâi blocat în validare | Ai introdus o literă în loc de număr | Deocamdată introduci doar numere |

---

## Recapitulare pe scurt

- `do { … } while (condiție);` execută corpul **o dată**, apoi verifică condiția. Nu uita `;` la final.
- `while` poate să nu ruleze deloc; `do-while` rulează cel puțin o dată.
- `do-while` este potrivit pentru: meniuri care se repetă, validarea datelor, „mai vrei o dată?”.
- Variabilele folosite în condiție se declară **înaintea** buclei.
- Alegerea buclei: `for` când știi de câte ori, `while` când nu știi și poate nu rulează deloc, `do-while` când trebuie să ruleze măcar o dată.
- Un meniu clasic: `do { afișează; citește opțiunea; switch(…) } while (optiune != 0);`

---

## Temă
1. Refă **Exemplele 1–16** pe calculatorul tău.  
2. Scrie un meniu pentru o librărie (1. Cărți, 2. Caiete, 3. Pixuri, 0. Ieșire) care afișează prețul produsului ales și se repetă până alegi `0`.  
3. Scrie un program care citește un număr natural și afișează cifrele lui, câte una pe linie, **de la ultima la prima**, folosind `do-while`.  
4. Scrie un program „Ghicește litera”: alegi o literă în cod; utilizatorul introduce litere până o ghicește; după fiecare încercare afișezi dacă litera căutată este „mai înainte” sau „mai încolo” în alfabet.  
5. **Bonus:** program care simulează un cronometru: citește un număr de secunde și afișează numărătoarea inversă; după ce se termină, întreabă dacă vrei să pornești din nou.  
6. Salvează tot ca `Tema_M2L4_Prenume_Nume.cpp`.

---

## Ce urmează — Lecția 5
Punem o buclă **în interiorul altei bucle** și desenăm triunghiuri, pătrate și tabele din caractere.
