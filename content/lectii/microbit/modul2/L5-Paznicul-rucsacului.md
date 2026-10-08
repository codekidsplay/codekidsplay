# Lecția 5 — Paznicul rucsacului
**Modulul 2 · Proiecte Maker (blocuri + radio)**  
**Code Maker Club · micro:bit Maker**

> Azi placa devine **paznic**: o pui în rucsac, o „armezi”, iar dacă cineva mișcă rucsacul, ea **dă alarma** până o oprești tu.  
> Proiect: **„Paznicul rucsacului”** · `Prenume_Nume_MB2_L05`

---

## Obiectiv
La finalul orei construiești un program cu **stări** (dezarmat, armat, alarmă) și folosești bucla `while`.  
**Minim:** A armează paznicul după o numărătoare 3–2–1; dacă scuturi placa, pâlpâie alarma de 10 ori.  
**Complet:** Minim + alarma durează **până o oprești** cu **A+B**, iar A nu mai poate arma în timpul alarmei.

## De ce contează
Alarma de la mașină, de la bancă și de pe bicicletă funcționează la fel: un senzor **observă**, iar programul **hotărăște** când să sune. Paznicul tău are trei stări și trece de la una la alta. Așa gândesc inginerii orice aparat de siguranță.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4: pini, funcții |
| 10–25 | Joc „Statuile”: stări în viața reală |
| 25–40 | Planul pe foaie: schema stărilor |
| 40–70 | Paznicul simplu (**Minim**) |
| 70–100 | `while` și oprirea alarmei (**Complet**) |
| 100–112 | Testăm: ce se poate strica? |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** variabilele `armat` și `alarma` · `on shake` · `while … do` · `repeat … times` · `if … then` · `show leds` · `plot x y` · `clear screen`

---

## Pas cu pas

### 1) Jocul „Statuile”
Clasa mișcă. La „stop!” toți devin statui. Dacă se mișcă cineva, **e prins**. Au existat trei stări: **mișcare liberă**, **statuie** și **prins**. Paznicul are la fel trei stări.

### 2) Schema stărilor

| Stare | Ce se vede | Cum intră în ea |
|-------|-----------|-----------------|
| **Dezarmat** | `Asleep` (doarme) | la pornire sau după A+B |
| **Armat** | un singur LED în mijloc | după A și numărătoarea 3–2–1 |
| **Alarmă** | ecranul pâlpâie | scuturi placa cât timp e armat |

Variabilele:
- `armat` = `1` când paznicul e atent, `0` altfel;  
- `alarma` = `1` când sună alarma, `0` altfel.

### 3) Pornirea
Proiect nou: `Prenume_Nume_MB2_L05`.

```text
on start
    set armat to 0
    set alarma to 0
    show icon [Asleep]
```

### 4) Armarea cu numărătoare — Minim
Ai nevoie de timp să pui placa în rucsac. Facem numărătoarea 3–2–1.

```text
on button A pressed
    show number 3
    pause (ms) 1000
    show number 2
    pause (ms) 1000
    show number 1
    pause (ms) 1000
    clear screen
    plot x 2 y 2
    set armat to 1
```
**Ce vezi pe ecran la „armat”:**
```text
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
```
Un singur LED în mijloc: ochiul paznicului.

### 5) Alarma scurtă — Minim

```text
on shake
    if armat = 1 then
        set armat to 0
        repeat 10 times
            show leds   (toate cele 25 aprinse)
            pause (ms) 200
            clear screen
            pause (ms) 200
        show icon [Asleep]
```
- Primul lucru: `set armat to 0`. Astfel, o a doua scuturare **nu** pornește încă o alarmă peste prima.  
- `repeat 10 times` = ecranul pâlpâie de 10 ori.  
- Apoi paznicul „adoarme” din nou.

**Test:** apasă A, așteaptă 3–2–1, apoi scutură placa. Ea pâlpâie de 10 ori.

### 6) Complet — alarma până o oprești
Vrem ca alarma să sune **până apeși A+B**. Folosim `while`, o buclă care repetă **atâta timp cât** o condiție e adevărată.

| Bucla | Repetă… |
|-------|---------|
| `forever` | pe veci |
| `repeat 10 times` | de 10 ori |
| `while alarma = 1` | cât timp `alarma` e `1` |

```text
on start
    set armat to 0
    set alarma to 0
    show icon [Asleep]

on button A pressed
    if alarma = 0 then
        show number 3
        pause (ms) 1000
        show number 2
        pause (ms) 1000
        show number 1
        pause (ms) 1000
        clear screen
        plot x 2 y 2
        set armat to 1

on shake
    if armat = 1 then
        set armat to 0
        set alarma to 1
        while alarma = 1
            show leds   (toate cele 25 aprinse)
            pause (ms) 200
            clear screen
            pause (ms) 200
        show icon [Asleep]

on button A+B pressed
    set alarma to 0
    set armat to 0
    show icon [Asleep]
```

- `while alarma = 1` pâlpâie până când `alarma` devine `0`.  
- **A+B** pune `alarma` pe `0`: bucla se oprește, iar placa se întoarce la `Asleep`.  
- `if alarma = 0` din A împiedică armarea în timpul alarmei.  
- A+B dezarmează și când paznicul e doar **armat** (fără alarmă).

> Nu apăsa butoanele în timpul numărătorii 3–2–1: placa e ocupată cu ea.

### 7) Ce se poate strica? (testăm împreună)
Încearcă fiecare situație și bifează ce se întâmplă:
- [ ] Scuturi placa **înainte** să o armezi → nu se întâmplă nimic  
- [ ] Armezi, nu o miști → rămâne ochiul în mijloc  
- [ ] Armezi, scuturi → pornește alarma  
- [ ] În alarmă, apeși A → nu se întâmplă nimic nou  
- [ ] În alarmă, apeși A+B → oprește  

---

## Greșeli frecvente
1. **„Alarma nu se oprește niciodată”** — A+B nu pune `alarma` pe `0`.  
2. **„Scuturarea nu face nimic”** — ai uitat să armezi (`armat = 1`) sau ai apăsat A prea devreme.  
3. **„Pâlpâie o singură dată”** — blocurile nu sunt toate **în interiorul** lui `while`.  
4. **„Alarma pornește de două ori”** — lipsește `set armat to 0` la începutul alarmei.  
5. **„Pe ecran rămâne ochiul după A+B”** — lipsește `show icon [Asleep]`.  
6. **„Ecranul rămâne aprins”** — după `show leds` trebuie `clear screen`.

---

## De făcut azi — „Paznicul rucsacului”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | A armează (3–2–1) · scuturare → 10 pâlpâiri · revine la `Asleep` |
| **Complet** | Minim + `while alarma = 1` · A+B oprește · A nu armează în alarmă |

### Pasul 1 — Minim
- [ ] Variabila `armat`  
- [ ] Numărătoarea 3–2–1 și LED-ul din mijloc  
- [ ] `on shake` cu `if armat = 1` și `repeat 10 times`  
- [ ] Testat cu placa în mână  

**→ Minim când:** un coleg ridică rucsacul tău și alarma pornește.

### Pasul 2 — Complet
- [ ] Variabila `alarma`  
- [ ] `while alarma = 1` în `on shake`  
- [ ] `on button A+B pressed` oprește  
- [ ] Toate cele 5 teste din pasul 7 bifate  
- [ ] Numele fișierului e `MB2_L05`  

---

## Bonus (după Complet)
- [ ] La alarmă, **blițul** extern: `digital write pin P0 to 1` cu un LED legat (ca în L4)  
- [ ] Fă un cod de **dezarmare**: A+B trebuie apăsat de **două ori**  
- [ ] Arată pe ecran o **față supărată** (`Angry`) în loc de ecran aprins  
- [ ] Trimite prin radio un mesaj la placa unui coleg când pornește alarma

## Recapitulare rapidă
1. Un aparat de siguranță are **stări**: dezarmat, armat, alarmă.  
2. Variabilele `armat` și `alarma` țin minte starea.  
3. `repeat 10 times` = de 10 ori. `while alarma = 1` = cât timp e adevărat.  
4. Setăm starea **imediat** ca să nu pornim alarma de două ori.  
5. Testăm și situațiile ciudate, nu doar pe cea ideală.

## Schema pe scurt *(pe foaie)*

Dezarmat —A→ (3-2-1) armat —scuturat→ alarmă —A+B→ dezarmat

**Quiz scurt:**  
- Ce stări are paznicul?  
- Care e diferența dintre `repeat` și `while`?  
- De ce punem `set armat to 0` la începutul alarmei?  
- Cum oprești alarma?

## Temă
Desenează schema stărilor pentru **un alt aparat** (de exemplu o ușă cu cod sau un cuptor). Scrie ce eveniment mută aparatul dintr-o stare în alta.
