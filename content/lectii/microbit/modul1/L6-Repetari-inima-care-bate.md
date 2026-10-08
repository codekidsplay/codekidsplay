# Lecția 6 — Repetări: inima care bate
**Modulul 1 · Primii pași cu micro:bit (blocuri)**  
**Code Maker Club · micro:bit Starter**

> Azi înveți placa să **repete** lucruri fără să scrii aceleași blocuri de zece ori. Folosim **bucle**.  
> Proiect: **„Inima care bate”** · `Prenume_Nume_MB1_L06`

---

## Obiectiv
La finalul orei folosești `forever`, `repeat … times` și `for index from … to …` și știi să faci un desen care **se mișcă în ritm**.  
**Minim:** o inimă care bate „bum-bum … pauză”, în buclă.  
**Complet:** Minim + butonul **A** o face mai rapidă, iar **B** mai lentă (fără să iasă din limite).

## De ce contează
Inima ta bate de mii de ori pe zi, fără să fie nevoie de zece mii de instrucțiuni. Programele repetă lucruri: o animație, o verificare de senzor, o alarmă. Cu o **buclă** scrii un lucru **o singură dată** și îl faci să se întâmple de câte ori vrei.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5: `if`, `else`, comparații |
| 10–25 | Joc de mișcare: „repetă de 3 ori…” |
| 25–50 | `forever` și `repeat … times` (**Minim**) |
| 50–70 | `for index from 0 to 4` și `plot` (valul de lumină) |
| 70–100 | Viteza inimii: variabila `ritm` (**Complet**) |
| 100–112 | Depanare în pereche |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** `forever` · `repeat … times` · `for index from 0 to 4` · `plot x y` · `clear screen` · `pause (ms)` · variabile · `if`

---

## Pas cu pas

### 1) Jocul „Repetă!”
Profesorul spune: „Bate din palme de 3 ori.” Tu nu ceri: „Bate din palme. Bate din palme. Bate din palme.” Spui doar **„de 3 ori”**. Asta e o buclă.

### 2) Trei feluri de bucle

| Bloc | Ce face | Când îl folosești |
|------|---------|-------------------|
| `forever` | repetă **pe veci** | animații, verificări continue |
| `repeat 4 times` | repetă **de 4 ori**, apoi trece mai departe | când știi de câte ori |
| `for index from 0 to 4` | repetă de **5 ori** și te lasă să folosești numărul `index` (0, 1, 2, 3, 4) | când ai nevoie de numărătoare |

> `repeat` și `for` sunt în categoria **Loops**. `forever` e în **Basic**. Atenție: `for index from 0 to 4` repetă de **cinci** ori, pentru că numără 0, 1, 2, 3 și 4.

### 3) Inima care bate — Minim
O inimă adevărată face „lub-dub” de două ori repede, apoi se odihnește puțin. Proiect nou: `Prenume_Nume_MB1_L06`.

```text
forever
    repeat 2 times
        show icon [Heart]
        pause (ms) 150
        show icon [Small Heart]
        pause (ms) 150
    pause (ms) 700
```

- `repeat 2 times` face „bum-bum” de două ori.  
- Ultima `pause (ms) 700` e **în afara** lui `repeat`, deci e odihna dintre două bătăi duble.  
- Fiindcă totul e în `forever`, inima bate mereu.

**Ce vezi pe ecran (cele două poze care se schimbă):**
```text
Heart:                   Small Heart:
. # . # .                . . . . .
# # # # #                . # . # .
# # # # #                . # # # .
. # # # .                . . # . .
. . # . .                . . . . .
```

### 4) Valul de lumină — `for index`
Aici folosim numărul `index`, ca să aprindem LED-urile unul după altul, pe rândul din mijloc.

1. Din **LED** tragi **plot x … y …**.  
2. În locul lui `x` pui blocul rotund **index** (îl iei din bucla `for`, tragi cu mouse-ul de pe cuvântul `index`).  
3. Lași `y` la `2` (rândul din mijloc).

```text
forever
    for index from 0 to 4
        plot x (index) y 2
        pause (ms) 200
    clear screen
```

**Ce vezi pe ecran:** un punct care se aprinde pe rând, de la stânga la dreapta, și rămâne aprins. După cele cinci LED-uri, tot rândul se stinge și valul pornește din nou.

```text
Pas 1:  # . . . .      Pas 3:  # # # . .      Pas 5:  # # # # #
        (rândul 2)             (rândul 2)             (rândul 2)
```
`plot x y` aprinde LED-ul de la adresa **(x, y)**. Colțul din stânga sus este **(0, 0)**.

### 5) Complet — controlăm viteza
Facem o variabilă `ritm` care ține **cât durează fiecare pauză** din bătaia inimii. Număr mic = inimă rapidă.

1. Creezi variabila `ritm`.  
2. Programul devine:

```text
on start
    set ritm to 150

forever
    repeat 2 times
        show icon [Heart]
        pause (ms) ritm
        show icon [Small Heart]
        pause (ms) ritm
    pause (ms) 700

on button A pressed
    if ritm > 50 then
        change ritm by -50

on button B pressed
    if ritm < 400 then
        change ritm by 50
```

- **A** scade `ritm`, deci **inima bate mai repede**. Se oprește la `50`, ca să nu devină prea rapidă.  
- **B** crește `ritm`, deci **inima bate mai încet**. Se oprește la `400`.  
- Blocul rotund `ritm` îl pui în locul numărului din `pause (ms)`.

> **Nu pui desene** în `on start`: `forever` pornește imediat și ar încurca ecranul. În `on start` doar setăm variabila, ceea ce durează o clipă.

**Testează:** apasă A de trei ori. `ritm` trece din 150 în 100, 50, apoi nu mai scade. Inima e acum foarte rapidă. Apasă B de câteva ori și o încetinești.

### 6) Depanare în pereche
Colegul tău a greșit. Găsește bug-ul:

```text
forever
    repeat 2 times
        show icon [Heart]
        show icon [Small Heart]
    pause (ms) 700
```
**Ce vezi?** Inima pare fixă, iar pe ecran nu se vede schimbarea. **De ce?** Pozele se schimbă atât de repede încât ochiul nu le vede; lipsesc pauzele dintre ele. Soluție: `pause (ms) 150` după fiecare `show icon`.

---

## Greșeli frecvente
1. **„Inima nu se vede bătând”** — lipsesc pauzele dintre poze.  
2. **„Bate de 3 ori în loc de 2”** — ai numărat greșit în `repeat`, sau ai folosit `for index from 0 to 2` (care repetă de **3** ori).  
3. **„Odihna nu apare”** — `pause (ms) 700` e **în interiorul** lui `repeat`. Trage-o în afară.  
4. **„Valul nu se vede”** — `x` are un număr fix, nu blocul `index`.  
5. **„Ritmul ajunge la 0 și inima înnebunește”** — ai uitat condiția `if ritm > 50`.  
6. **„Apar două blocuri forever care se bat”** — două animații în două `forever` desenează în același timp. Pentru azi folosește **un singur** `forever` cu desene.

---

## De făcut azi — „Inima care bate”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | `forever` + `repeat 2 times` cu `Heart` și `Small Heart`, plus odihnă mai lungă |
| **Complet** | Minim + variabila `ritm` · A mai rapid · B mai lent · cu limite |

### Pasul 1 — Minim
- [ ] `forever` cu `repeat 2 times` înăuntru  
- [ ] Pauze între poze  
- [ ] Odihna e **în afara** lui `repeat`  
- [ ] Inima bate și pe placa adevărată  

**→ Minim când:** un coleg pune mâna pe piept și spune „bate ca o inimă”.

### Pasul 2 — Complet
- [ ] Variabila `ritm` setată în `on start`  
- [ ] `pause (ms) ritm` în interiorul buclei  
- [ ] A scade `ritm`, dar nu sub `50`  
- [ ] B crește `ritm`, dar nu peste `400`  
- [ ] Numele fișierului e `MB1_L06`  

---

## Bonus (după Complet)
- [ ] Fă **valul de lumină** din pasul 4 și pe rândul de jos (`y` = `4`)  
- [ ] Adaugă o a doua variabilă, `bataiDuble`, și arată câte bătăi ai făcut (cu `show number`) — doar la apăsarea lui A+B  
- [ ] Fă un **semafor pe LED-uri**: un rând verde (rândul 0), unul galben (rândul 2), unul roșu (rândul 4), cu `plot`  
- [ ] Folosește `repeat 3 times` pentru ca inima să facă trei bătăi, nu două

## Recapitulare rapidă
1. `forever` = repetă pe veci.  
2. `repeat 4 times` = repetă de 4 ori.  
3. `for index from 0 to 4` = repetă de **5** ori și îți dă numărul `index`.  
4. `plot x y` aprinde un LED, `clear screen` stinge toate LED-urile.  
5. O variabilă poate controla **viteza**.

## Schema pe scurt *(pe foaie)*

`forever` → `repeat 2 times` (Heart → pauză → Small Heart → pauză) → odihnă

**Quiz scurt:**  
- De câte ori repetă `for index from 0 to 4`?  
- Care e diferența dintre `forever` și `repeat 4 times`?  
- Ce face `plot x 3 y 2`?  
- De ce nu lăsăm `ritm` să ajungă la `0`?

## Temă
Desenează pe foaie un **ceas deșteptător** care sună în ritm: sunet scurt, pauză, sunet scurt. Scrie ce buclă ai folosi și ce pauze ai pune.
