# Lecția 1 — Panoul de comandă
**Modulul 2 · Proiecte Maker (blocuri + radio)**  
**Code Maker Club · micro:bit Maker**

> Bine ai venit în Modulul 2! Azi reiei ce știi din Modulul 1 și faci un **panou de comandă**: placa are mai multe **moduri**, iar tu treci de la unul la altul cu butoanele.  
> Proiect: **„Panoul de comandă”** · `Prenume_Nume_MB2_L01`

---

## Obiectiv
La finalul orei folosești o variabilă `mod` ca să faci un program cu mai multe „fețe” și știi să scrii **fișa unui proiect**.  
**Minim:** butonul **A** schimbă între două moduri: **lumina** (o bară de LED-uri) și **temperatura** (un număr).  
**Complet:** Minim + al treilea mod (**numele tău**), butonul **B** te duce înapoi, iar **A+B** revine la primul mod.

## De ce contează
Telefonul tău are mai multe ecrane: apeși și treci de la ceas la alarmă. Un aparat bun face **mai multe lucruri**, iar tu alegi pe care. Variabila care alege modul e baza oricărui proiect mai mare. Tot Modulul 2 se sprijină pe ea.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Mini-test recap Modul 1 (în perechi) |
| 15–35 | Ce este un „mod”? Jocul „Lumina de semafor” fără calculator |
| 35–75 | Panoul cu 2 moduri (**Minim**) |
| 75–100 | Al treilea mod, B și A+B (**Complet**) |
| 100–112 | **Fișa proiectului**: planul, materialele, testul |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** variabila `mod` · `on button A / B / A+B pressed` · `if … else if … else` · `forever` · `plot bar graph of … up to …` · `show number` · `show string` · `clear screen`

---

## Pas cu pas

### 1) Mini-test recap (în perechi, 5 minute)
Fără să te uiți în Modulul 1, răspunde:
1. Ce face `on start`?  
2. Care e diferența între `set score to 5` și `change score by 5`?  
3. Ce valori poate avea `light level`?  
4. Ce face `else`?  
5. De câte ori repetă `for index from 0 to 4`?

Răspunsuri: o dată, la pornire · `set` pune valoarea, `change` adună · între 0 și 255 · rulează când condiția e falsă · de 5 ori.

### 2) Jocul „Moduri”
Fără calculator. Profesorul ridică un cartonaș: **verde** înseamnă „aplaudă”, **galben** înseamnă „bate din picior”, **roșu** înseamnă „stai pe loc”. Când se schimbă cartonașul, **se schimbă și ce faci**. Cartonașul e **modul**, adică „în ce stare sunt acum”.

### 3) Proiect nou și variabila
`Prenume_Nume_MB2_L01` → creezi variabila `mod`.

```text
on start
    set mod to 1
```

### 4) Panoul cu 2 moduri — Minim
`forever` desenează pe ecran în funcție de `mod`. Butonul A **schimbă** `mod`.

```text
on button A pressed
    change mod by 1
    if mod > 2 then
        set mod to 1

forever
    clear screen
    if mod = 1 then
        plot bar graph of light level up to 255
    else
        show number temperature
    pause (ms) 100
```

- `mod = 1` → bara de lumină. `mod = 2` → temperatura.  
- La A, `mod` crește cu 1. Dacă ajunge la `3` (nu avem al treilea mod), revine la `1`. Așa **se învârte** între moduri.  
- Doar **`forever` desenează**. Butonul doar schimbă `mod`. Așa ecranul nu se încurcă.

**Ce vezi pe ecran:** la `mod = 1` o bară de LED-uri care crește cu lumina; la `mod = 2` temperatura (de exemplu `23`), care se derulează.

> Temperatura cu două cifre derulează puțin. Dacă apeși A în timpul derulării, schimbarea se vede după ce se termină numărul.

### 5) Complet — trei moduri și mers înapoi

```text
on start
    set mod to 1

on button A pressed
    change mod by 1
    if mod > 3 then
        set mod to 1

on button B pressed
    change mod by -1
    if mod < 1 then
        set mod to 3

on button A+B pressed
    set mod to 1

forever
    clear screen
    if mod = 1 then
        plot bar graph of light level up to 255
    else if mod = 2 then
        show number temperature
    else
        show string "Ana"
    pause (ms) 100
```

- A merge **înainte**: 1 → 2 → 3 → 1 …  
- B merge **înapoi**: 3 → 2 → 1 → 3 …  
- A+B sare direct la modul `1`.  
- În loc de `Ana` scrii **prenumele tău**, fără diacritice.

### 6) Fișa proiectului
Un maker adevărat își **planifică** proiectul. Completează pe foaie sau în caiet:

| Rubrica | Ce scrii |
|---------|----------|
| **Numele proiectului** | Panoul de comandă |
| **Ce face?** | trece între moduri cu butoanele |
| **Ce materiale folosesc?** | placa micro:bit, cablu USB |
| **Care sunt pașii?** | 1) variabila `mod`  2) A schimbă modul  3) `forever` desenează |
| **Cum testez?** | apăs A de patru ori și verific că modurile se învârt |
| **Ce a fost greu?** | (completezi la sfârșit) |

Aceeași fișă o vom folosi la toate proiectele din acest modul.

---

## Greșeli frecvente
1. **„Ecranul clipește urât”** — lipsește `pause (ms) 100` din `forever`.  
2. **„Modul 3 nu apare niciodată”** — în A ai lăsat `if mod > 2`. Pentru trei moduri trebuie `mod > 3`.  
3. **„Numele rămâne mereu pe ecran”** — mai întâi `clear screen`, apoi desenezi. Fără `clear screen` poți avea LED-uri vechi rămase.  
4. **„B ajunge la 0 sau la -1”** — ai uitat `if mod < 1 then set mod to 3`.  
5. **„Desenez și în buton, și în forever”** — ecranul se încurcă. Lasă desenul în `forever`.  
6. **„Nu se vede nimic la lumină”** — acoperă placa cu palma, apoi luminează-o cu lanterna; în simulator mută cursorul de lumină.

---

## De făcut azi — „Panoul de comandă”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | `mod` cu 2 valori · A schimbă · lumină (bară) și temperatură (număr) |
| **Complet** | Minim + mod 3 (numele) · B înapoi · A+B la modul 1 |

### Pasul 1 — Minim
- [ ] Variabila `mod` și `on start`  
- [ ] A schimbă `mod` și revine la `1`  
- [ ] `forever` cu `clear screen`, `if` și `pause`  
- [ ] Merge pe placa adevărată  

**→ Minim când:** un coleg apasă A și vede modurile schimbându-se.

### Pasul 2 — Complet
- [ ] Al treilea mod cu numele tău  
- [ ] B merge înapoi, fără valori greșite  
- [ ] A+B revine la modul `1`  
- [ ] Fișa proiectului completată  
- [ ] Numele fișierului e `MB2_L01`  

---

## Bonus (după Complet)
- [ ] Adaugă modul 4: `show icon [Heart]`  
- [ ] Arată pentru o secundă **numărul modului** când îl schimbi (atenție la ecran: pune `show number mod` în `forever`, nu în buton)  
- [ ] Fă ca modul 2 să arate `Happy` dacă temperatura e între `18` și `26` și `Sad` în rest (cu `and`)  
- [ ] Desenează un **panou de control** pentru un robot, cu 4 moduri

## Recapitulare rapidă
1. **Mod** = starea în care e aparatul.  
2. O variabilă (`mod`) alege ce face `forever`.  
3. Butoanele schimbă variabila, **nu desenează**.  
4. `clear screen` înainte de desen evită LED-urile rămase.  
5. Fișa proiectului: nume, ce face, materiale, pași, test.

## Schema pe scurt *(pe foaie)*

A / B / A+B → schimbă `mod` → `forever` → `if mod = …` → desenează lumină / temperatură / nume

**Quiz scurt:**  
- Ce înseamnă „mod” într-un program?  
- De ce desenăm doar în `forever`?  
- Ce face `if mod > 3 then set mod to 1`?  
- Ce intră în fișa unui proiect?

## Temă
Alege un aparat din casă (telefon, mașină de spălat, aer condiționat) și scrie pe foaie **ce moduri** are. Desenează ce s-ar vedea pe un mic ecran în fiecare mod.
