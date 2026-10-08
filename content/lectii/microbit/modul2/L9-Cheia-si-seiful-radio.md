# Lecția 9 — Cheia și seiful radio
**Modulul 2 · Proiecte Maker (blocuri + radio)**  
**Code Maker Club · micro:bit Maker**

> Proiectul final al Modulului 2! Facem un **seif** care se deschide doar dacă primește prin radio **codul corect** de la o **cheie**. Seiful îi și răspunde cheii: „deschis”, „refuzat” sau „blocat”.  
> Proiect: **„Cheia și seiful radio”** · `Prenume_Nume_MB2_L09_cheie` și `…_seif`

---

## Obiectiv
La finalul orei ai un sistem complet cu două plăci care **vorbesc în ambele sensuri** și care se apără de ghicitul codului.  
**Minim:** cheia trimite un cod de două cifre; seiful arată `Yes` dacă e corect și `No` dacă nu.  
**Complet:** Minim + seiful **răspunde** cheii, iar după **3 încercări greșite** se blochează pentru câteva secunde.

## De ce contează
Cheia mașinii ta nu doar „deschide”: ea trimite un cod, iar mașina **verifică** și răspunde. Dacă cineva ar încerca toate codurile la nesfârșit, sistemul s-ar bloca. Azi construiești aceeași idee, într-o formă simplă.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8: metoda doctorului |
| 10–25 | Fișa proiectului: schema, mesajele, stările |
| 25–60 | Cheia și seiful **Minim** (două plăci) |
| 60–100 | Răspunsul și blocarea (**Complet**) |
| 100–112 | Test: „spargătorul de coduri” cu un coleg |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** `radio set group` · `radio send number` · `on radio received` · `if / else if` · variabile · `forever` · `pause (ms)` · `show icon` · `show number` · `show string`

---

## Pas cu pas

### 1) Fișa proiectului
Înainte de blocuri, completează pe foaie:

| Rubrica | Răspuns |
|---------|---------|
| Nume | Cheia și seiful radio |
| Ce face? | cheia trimite un cod; seiful deschide dacă e corect |
| Plăci | placa 1 = **cheie**, placa 2 = **seif** |
| Mesaje pe radio | cheie → seif: **codul** (număr 0–99) · seif → cheie: **1** deschis, **2** refuzat, **3** blocat |
| Stări seif | **închis** · **deschis** · **blocat** |
| Cum testez? | cod corect, cod greșit, 3 coduri greșite |

> **Varianta liberă:** dacă ai o idee proprie (de exemplu o alarmă radio), o poți face în locul acestui proiect. Scrie fișa și arată-o profesorului **înainte** să începi.

### 2) Codul de două cifre
Folosim două variabile: `zeci` și `unitati`. Codul trimis e `zeci × 10 + unitati`. De exemplu `zeci = 4` și `unitati = 7` dau codul **47**.

### 3) Programul cheii — Minim
Proiect: `Prenume_Nume_MB2_L09_cheie`. Variabile: `zeci`, `unitati`.

```text
on start
    radio set group 11
    set zeci to 0
    set unitati to 0

on button A pressed
    change unitati by 1
    if unitati > 9 then
        set unitati to 0

on button B pressed
    change zeci by 1
    if zeci > 9 then
        set zeci to 0

on button A+B pressed
    radio send number (zeci × 10 + unitati)

forever
    show number zeci
    pause (ms) 600
    clear screen
    pause (ms) 200
    show number unitati
    pause (ms) 600
    clear screen
    pause (ms) 400
```
- **A** crește cifra de la **unități**, **B** crește cifra de la **zeci**.  
- Ecranul arată pe rând cifra zecilor și cifra unităților.  
- **A+B** trimite codul.

**Ce vezi pe ecran:** `4` … pauză … `7` … pauză și tot așa, la nesfârșit.

### 4) Programul seifului — Minim
Proiect: `Prenume_Nume_MB2_L09_seif`. Variabilă: `secret`.

```text
on start
    radio set group 11
    set secret to 47
    show icon [Square]

on radio received (receivedNumber)
    if receivedNumber = secret then
        show icon [Yes]
        pause (ms) 2000
    else
        show icon [No]
        pause (ms) 1000
    show icon [Square]
```
- `Square` înseamnă **seif închis**.  
- Cod corect → bifă 2 secunde; cod greșit → X o secundă.

**Test:** setează pe cheie `4` și `7`, apoi apasă A+B. Pe seif apare bifa.

### 5) Complet — răspunsul și blocarea
Acum seiful răspunde cheii și se blochează după 3 greșeli.

**Mesajele:** seif → cheie: `1` deschis, `2` refuzat, `3` blocat.

**Seiful:** variabile `secret`, `greseli`, `stare` (`0` închis · `1` deschis · `2` blocat · `3` refuzat).

```text
on start
    radio set group 11
    set secret to 47
    set greseli to 0
    set stare to 0

on radio received (receivedNumber)
    if stare = 0 then
        if receivedNumber = secret then
            set stare to 1
            set greseli to 0
            radio send number 1
        else
            change greseli by 1
            if greseli >= 3 then
                set stare to 2
                radio send number 3
            else
                radio send number 2
                set stare to 3
    else if stare = 2 then
        radio send number 3

forever
    if stare = 1 then
        show icon [Yes]
        pause (ms) 2000
        set stare to 0
    else if stare = 2 then
        show string "BLOCAT"
        set greseli to 0
        set stare to 0
    else if stare = 3 then
        show icon [No]
        pause (ms) 700
        set stare to 0
    else
        show icon [Square]
    pause (ms) 100
```
- Cât timp seiful e închis (`stare = 0`), el verifică codul.  
- Dacă e corect: `stare = 1` (deschis) și răspunde `1`. `forever` arată bifa 2 secunde, apoi îl închide.  
- Dacă e greșit: numără greșelile și răspunde `2`; `forever` arată `No` o clipă (`stare = 3`). La a treia greșeală, `stare = 2` (blocat) și răspunde `3`.  
- Când e blocat, `forever` derulează `BLOCAT` și apoi resetează totul. În acest timp, mesajele primite primesc răspunsul `3`.

**Cheia primește răspunsul.** Adăugăm variabila `rezultat` (`0` nimic, `1` deschis, `2` refuzat, `3` blocat):

```text
on start
    radio set group 11
    set zeci to 0
    set unitati to 0
    set rezultat to 0

on radio received (receivedNumber)
    set rezultat to receivedNumber
```
(celelalte blocuri `on button …` rămân la fel.)

`forever` la cheie arată rezultatul înaintea cifrelor:

```text
forever
    if rezultat = 1 then
        show icon [Yes]
        pause (ms) 1500
        set rezultat to 0
    else if rezultat = 2 then
        show icon [No]
        pause (ms) 1000
        set rezultat to 0
    else if rezultat = 3 then
        show string "BLOCAT"
        set rezultat to 0
    else
        show number zeci
        pause (ms) 600
        clear screen
        pause (ms) 200
        show number unitati
        pause (ms) 600
        clear screen
        pause (ms) 400
```

### 6) „Spargătorul de coduri”
Doi colegi lucrează împreună: unul are seiful (și știe codul), celălalt are doar cheia. Cel cu cheia încearcă să ghicească codul. Câte încercări are? **3**. Apoi seiful se blochează.

Gândește-te: câte coduri posibile sunt (de la `00` la `99`)? Cât ar dura să le încerci pe toate **fără blocare**? De ce e importantă blocarea?

---

## Greșeli frecvente
1. **„Seiful nu primește nimic”** — grupuri diferite. Verifică numărul `11` (sau al perechii).  
2. **„Cheia trimite alt cod”** — `zeci × 10 + unitati` e scris greșit. Verifică parantezele din blocul de Math.  
3. **„Seiful se deschide cu orice cod”** — comparația e `receivedNumber = receivedNumber` în loc de `= secret`.  
4. **„Nu se blochează”** — `greseli` nu crește sau nu e comparat cu `3`.  
5. **„Ecranul seifului se încurcă”** — ai desenat în `on radio received`, în Complet. Desenul trebuie să rămână în `forever`.  
6. **„Cheia nu primește răspuns”** — seiful nu trimite (`radio send number 1/2/3` lipsește).

---

## De făcut azi — „Cheia și seiful radio”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Cheia trimite codul; seiful arată `Yes` sau `No` |
| **Complet** | Minim + răspuns către cheie + blocare după 3 greșeli |

### Pasul 1 — Minim
- [ ] Fișa proiectului completată  
- [ ] Cheia: A, B, A+B și cifrele pe ecran  
- [ ] Seiful: compară cu `secret` și arată `Yes` / `No`  
- [ ] Testat cu două plăci reale  

**→ Minim când:** un coleg introduce codul corect și seiful tău se deschide.

### Pasul 2 — Complet
- [ ] Seiful trimite `1`, `2` sau `3`  
- [ ] Cheia afișează răspunsul  
- [ ] `greseli`, `stare` și blocarea funcționează  
- [ ] Testul „spargătorul de coduri” făcut  
- [ ] Numele fișierelor sunt `MB2_L09_cheie` și `MB2_L09_seif`  

---

## Bonus (după Complet)
- [ ] Fă un cod de **trei cifre** (ai nevoie de o a treia variabilă)  
- [ ] Seiful **schimbă codul** când apeși A+B pe el  
- [ ] Adaugă un **LED extern** care se aprinde când seiful e deschis (ca în L4)  
- [ ] Gândește un alt sistem „cheie și broască”: ușa clasei, bicicleta

## Recapitulare rapidă
1. Un sistem are **roluri**: cheie și seif.  
2. Radio poate trimite **în ambele sensuri**.  
3. Seiful ține minte o **stare** (închis, deschis, blocat).  
4. Blocarea după greșeli apără de ghicit.  
5. Un proiect mare se planifică mai întâi **pe foaie**.

## Schema pe scurt *(pe foaie)*

Cheie: A, B → cod → A+B → radio → Seif: compară cu `secret` → 1 / 2 / 3 → radio → Cheie arată `Yes` / `No` / `BLOCAT`

**Quiz scurt:**  
- Cum calculează cheia codul trimis?  
- Ce se întâmplă după 3 coduri greșite?  
- De ce nu e bine ca un cod să aibă o singură cifră?  
- Ce mesaj trimite seiful când e deschis?

## Temă
Gândește-te la un sistem cu **cheie și broască** din viața reală. Desenează cum ar putea folosi radio și scrie ce **mesaje** ar trimite între ele.
