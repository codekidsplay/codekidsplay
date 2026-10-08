# Lecția 2 — Poșta radio
**Modulul 2 · Proiecte Maker (blocuri + radio)**  
**Code Maker Club · micro:bit Maker**

> Azi plăcile **vorbesc între ele** fără cablu! Faci o **poștă radio**: apeși un buton pe placa ta și pe placa colegului apare un mesaj.  
> Proiect: **„Poșta radio”** · `Prenume_Nume_MB2_L02`

---

## Obiectiv
La finalul orei trimiți și primești mesaje între două plăci și știi ce este un **grup radio**.  
**Minim:** **A** trimite codul `1` (față veselă), **B** trimite codul `2` (față tristă), iar placa colegului arată poza potrivită.  
**Complet:** Minim + **A+B** trimite un **text** (`Salut!`) și la pornire placa îți arată **grupul** ales.

## De ce contează
Walkie-talkie-urile, telecomenzile jucăriilor și cheia mașinii vorbesc prin radio. Fiecare placă micro:bit are în ea un mic **emițător** și un **receptor** radio. Din această lecție, proiectele tale pot lucra **în echipă**, pe mai multe plăci.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1: `mod`, panou de comandă |
| 10–30 | Jocul „Mesageri”: grupuri, coduri și un mesaj pe hârtie |
| 30–50 | Blocurile radio: grup, trimite, primește |
| 50–85 | Poșta cu 2 coduri (**Minim**) |
| 85–108 | Text, grupul afișat și test cu alte perechi (**Complet**) |
| 108–120 | Recapitulare, quiz, temă |

**Unelte azi:** `radio set group` · `radio send number` · `radio send string` · `on radio received` · `if … else if` · `show icon` · `show string`  
**Lucrăm în perechi:** fiecare pereche are **2 plăci** și **un număr de grup** propriu.

---

## Pas cu pas

### 1) Jocul „Mesageri”
Clasa se împarte în **grupuri** (1, 2, 3 …). Fiecare grup are o culoare. Un copil trimite un mesaj de hârtie, **dar doar colegii din grupul lui îl primesc**, restul îl ignoră. La radio, la fel: placa primește doar mesajele din **grupul** ei.

**Dicționarul de coduri:** cu un număr putem spune lucruri.

| Cod | Înseamnă | Poza |
|-----|----------|------|
| `1` | Sunt bine! | `Happy` |
| `2` | Sunt trist | `Sad` |
| `3` | Te iubesc | `Heart` |

### 2) Blocurile radio
În categoria **Radio** găsești:
- **radio set group 1**: alege grupul (un număr de la `0` la `255`). **Ambele plăci trebuie să aibă același grup.**  
- **radio send number 0**: trimite un număr.  
- **radio send string "hello"**: trimite un text.  
- **on radio received (receivedNumber)**: pornește când sosește un număr. Numărul primit se află în `receivedNumber`.

> Dacă vezi mai multe feluri de „on radio received” (număr, text, nume + valoare), apasă pe săgeata mică de lângă `receivedNumber` ca să alegi tipul, sau caută blocul potrivit în sertarul **Radio**.

### 3) Proiectul — același program pe ambele plăci
Programul e **același** pentru amândouă plăcile: fiecare poate trimite **și** primi. Proiect nou: `Prenume_Nume_MB2_L02`. Alegeți împreună un număr de grup (de exemplu, perechea 4 → grupul `4`).

```text
on start
    radio set group 4
```

### 4) Trimitem — Minim

```text
on button A pressed
    radio send number 1
    show icon [Yes]
    pause (ms) 300
    clear screen

on button B pressed
    radio send number 2
    show icon [Yes]
    pause (ms) 300
    clear screen
```
Bifa `Yes` îți spune că mesajul **a plecat**.

### 5) Primim — Minim

```text
on radio received (receivedNumber)
    if receivedNumber = 1 then
        show icon [Happy]
    else if receivedNumber = 2 then
        show icon [Sad]
```
Descarci **același** program pe **ambele plăci** și le pui la câțiva metri una de alta. Apasă A pe prima placă: pe a doua apare `Happy`.

**Ce vezi pe ecran pe placa care primește codul 1:**
```text
. . . . .
. # . # .
. . . . .
# . . . #
. # # # .
```

### 6) Complet — text și grup
1. **Grupul afișat:** creezi variabila `grupa`. La pornire o setezi și o arăți:

```text
on start
    set grupa to 4
    radio set group grupa
    show number grupa
```
2. **Mesaj text:** A+B trimite un text, iar placa îl arată dacă îl primește.

```text
on button A+B pressed
    radio send string "Salut!"
    show icon [Yes]
    pause (ms) 300
    clear screen

on radio received (receivedString)
    show string receivedString
```
Textul **nu** are diacritice și e scurt.

3. Poți păstra și blocul pentru numere. Radio trimite numerele și textele separat, deci cele două blocuri de primire funcționează independent.

### 7) Experiment: ce se aude în grupuri?
Două perechi vecine aleg **același grup** (de exemplu `4`). Apasă A pe o placă. Pe câte plăci apare mesajul? Pe **toate** din grupul 4. Apoi schimbați una dintre perechi pe grupul `5`. Ce se întâmplă?

> **Regulă de aur:** radio nu e **secret**. Oricine din grup (și din apropiere) poate citi mesajele. Nu trimitem nume, adrese sau telefoane.

---

## Greșeli frecvente
1. **„Nu primesc nimic”** — grupuri diferite pe cele două plăci. Verifică numărul.  
2. **„Primesc mesajele altor perechi”** — doi colegi au ales același grup. Fiecare pereche are numărul ei.  
3. **„Merge doar într-o direcție”** — programul a fost descărcat doar pe o placă.  
4. **„Placa e prea departe”** — raza radio e de câțiva metri, iar pereții o scad. Apropiați-vă.  
5. **„Apare Sad la 1 și Happy la 2”** — ai inversat codurile în `if`. Verifică dicționarul.  
6. **„Textul nu apare”** — ai folosit `receivedNumber` pentru un text. Textul se primește în `receivedString`.

---

## De făcut azi — „Poșta radio”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | A trimite `1`, B trimite `2`; cealaltă placă arată `Happy` sau `Sad` |
| **Complet** | Minim + A+B trimite `Salut!` + `grupa` arătat la pornire |

### Pasul 1 — Minim
- [ ] `radio set group` identic pe ambele plăci  
- [ ] A și B trimit coduri diferite  
- [ ] `on radio received` cu `if / else if`  
- [ ] Testat în perechi, cu plăci reale  

**→ Minim când:** apeși A și pe placa colegului apare `Happy`.

### Pasul 2 — Complet
- [ ] Variabila `grupa` setată și arătată la pornire  
- [ ] A+B trimite textul `Salut!`  
- [ ] Placa afișează textul primit  
- [ ] Ai schimbat grupul și ai văzut că mesajele nu mai ajung  
- [ ] Numele fișierului e `MB2_L02`  

---

## Bonus (după Complet)
- [ ] Adaugă codul `3` pentru `Heart`: placa îl trimite când o scuturi (`on shake`)  
- [ ] Fă un **cod secret al perechii**: A trimite `7` și placa răspunde cu un desen anume  
- [ ] Trimite un număr mai mare (ex. `42`) și arată-l cu `show number receivedNumber`  
- [ ] Gândește un joc cu **trei** plăci în același grup

## Recapitulare rapidă
1. Fiecare micro:bit are **radio** încorporat.  
2. Plăcile vorbesc doar în **același grup** (0–255).  
3. `radio send number` trimite, `on radio received` primește.  
4. Cu **coduri** (numere) putem spune multe lucruri.  
5. Radio nu e secret și raza e mică.

## Schema pe scurt *(pe foaie)*

Placa 1: apăs A → `radio send number 1` → aer → Placa 2: `on radio received` → `if 1` → `Happy`

**Quiz scurt:**  
- Ce trebuie să aibă la fel două plăci ca să comunice?  
- Cum ajunge numărul de pe o placă pe alta?  
- Ce se întâmplă dacă un coleg e pe alt grup?  
- De ce nu trimitem informații personale prin radio?

## Temă
Inventează un **dicționar cu 5 coduri** (numere și ce înseamnă) pentru o poveste: de exemplu `1` = „vine ploaia”, `2` = „suntem pe drum”. Scrie-l pe foaie.
