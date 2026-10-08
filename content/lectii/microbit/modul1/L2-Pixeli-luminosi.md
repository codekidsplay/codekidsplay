# Lecția 2 — Pixeli luminoși
**Modulul 1 · Primii pași cu micro:bit (blocuri)**  
**Code Maker Club · micro:bit Starter**

> Azi desenezi cu cele **25 de LED-uri** ale plăcii și faci desenele să se miște ca într-un desen animat.  
> Proiect: **„Floarea care se deschide”** · `Prenume_Nume_MB1_L02`

---

## Obiectiv
La finalul orei desenezi imagini proprii pe LED-uri și le pui una după alta ca să faci o **animație**.  
**Minim:** o floare care se deschide în **3 cadre** și se repetă.  
**Complet:** Minim + floarea se și **închide** la loc și apare un titlu scris cu `show string`.

## De ce contează
Ecranul plăcii e un tablou cu 25 de pătrățele. Fiecare LED e un **pixel**. Toate ecranele din lume, de la telefon la televizor, desenează la fel, doar că au milioane de pixeli. Azi înveți să „pictezi” cu lumină.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1: `on start`, `show icon`, Download |
| 10–30 | Blocul `show leds`: desenăm LED cu LED |
| 30–45 | `show string`, `show number`, `clear screen` |
| 45–60 | `pause (ms)`: cât stă un desen pe ecran |
| 60–95 | Construim floarea în 3 cadre (**Minim**) |
| 95–112 | **Complet:** floarea se închide + titlu |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** `show leds` · `show number` · `show string` · `clear screen` · `pause (ms)` · `forever`

---

## Pas cu pas

### 1) Proiect nou
1. **New Project** → numele `Prenume_Nume_MB1_L02` → **Create**.  
2. Lași blocurile **on start** și **forever** unde sunt.

### 2) Harta LED-urilor
Ecranul are **5 rânduri** și **5 coloane**. Un LED are o adresă: **(coloană, rând)**, iar numărătoarea începe de la **0**.

```text
        col 0  col 1  col 2  col 3  col 4
rând 0    .      .      .      .      .
rând 1    .      .      .      .      .
rând 2    .      .      #      .      .      <- LED-ul din mijloc = (2, 2)
rând 3    .      .      .      .      .
rând 4    .      .      .      .      .
```
Colțul din stânga sus e **(0, 0)**, iar colțul din dreapta jos e **(4, 4)**. Vom folosi adresele la L6.

### 3) Blocul `show leds`
1. **Basic** → tragi **show leds** în **forever**.  
2. Blocul are o grilă de 5×5 pătrățele. **Apeși pe un pătrățel** și LED-ul se aprinde (devine roșu). Apeși din nou și se stinge.  
3. Aprinde doar LED-ul din mijloc.

**Ce vezi pe ecran:**
```text
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
```

### 4) Pauza dă timp ochilor
Fără pauză, desenele se schimbă prea repede și nu le vezi. Folosim **pause (ms)**, unde **ms** înseamnă milisecunde: **1000 ms = 1 secundă**, **500 ms = jumătate de secundă**.

Regula: **după fiecare desen, o pauză**.

### 5) Floarea în 3 cadre — Minim
Un **cadru** e un desen. Animația apare când arăți cadrele unul după altul. Pune în **forever**, în ordine:

```text
forever
    show leds   (cadrul 1 - mugurul)
    pause (ms) 500
    show leds   (cadrul 2 - floarea se deschide)
    pause (ms) 500
    show leds   (cadrul 3 - floarea deschisă)
    pause (ms) 1000
    clear screen
    pause (ms) 500
```

Cele trei cadre (desenează-le apăsând pătrățelele):

**Cadrul 1 — mugurul**
```text
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
```
**Cadrul 2 — se deschide**
```text
. . . . .
. . # . .
. # # # .
. . # . .
. . . . .
```
**Cadrul 3 — floarea**
```text
. # # # .
# # # # #
# # # # #
# # # # #
. # # # .
```

`forever` repetă totul la nesfârșit, deci floarea se deschide mereu. Vezi animația în simulator, apoi apeși **Download** și o vezi pe placă.

### 6) Text și numere
- **show string** arată un text care **se derulează** de la dreapta la stânga. Fără diacritice.  
- **show number** arată un număr. Un număr cu **o singură cifră** (ca `3`) apare fix. Un număr mai lung (ca `42`) se derulează.  
- **clear screen** stinge toate LED-urile.

### 7) Floarea se închide + titlu — Complet
Adaugă în `forever`, **după** cadrul 3, încă două cadre: mai întâi cadrul 2 din nou (floarea se închide pe jumătate), apoi cadrul 1 (mugurul). La final scrie titlul.

```text
forever
    show leds   (cadrul 1 - mugurul)
    pause (ms) 500
    show leds   (cadrul 2 - se deschide)
    pause (ms) 500
    show leds   (cadrul 3 - floarea)
    pause (ms) 1000
    show leds   (cadrul 2 - se închide)
    pause (ms) 500
    show leds   (cadrul 1 - mugurul)
    pause (ms) 500
    show string "Floare"
```

Poți copia un bloc `show leds` cu **clic dreapta → Duplicate**, ca să nu desenezi de la capăt.

**Atenție:** `forever` pornește **imediat**, în același timp cu `on start`. Dacă și `on start`, și `forever` desenează pe LED-uri, ele se încurcă. De aceea azi punem desenele doar în `forever`.

---

## Greșeli frecvente
1. **„Văd doar ultimul cadru”** — ai uitat `pause`. Pune o pauză după fiecare `show leds`.  
2. **„Floarea clipește prea repede”** — pauză prea mică. Încearcă `500` sau `1000`.  
3. **„Desenul nu seamănă cu al meu”** — verifică rândurile de sus în jos și coloanele de la stânga la dreapta.  
4. **„Desenele se amestecă”** — și `on start`, și `forever` desenează în același timp. Pune desenele într-un singur loc.  
5. **„Textul are litere ciudate”** — ai pus diacritice. Scrie `a`, nu `ă`.  
6. **„Un LED a rămas aprins din cadrul vechi”** — fiecare `show leds` înlocuiește complet desenul, deci verifică ce ai bifat în grila nouă.

---

## De făcut azi — „Floarea care se deschide”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Floare în 3 cadre, cu pauze, în `forever`, funcționează pe placă |
| **Complet** | Minim + floarea se închide (5 cadre) + titlul `Floare` |

### Pasul 1 — Minim
- [ ] 3 cadre diferite cu `show leds`  
- [ ] `pause (ms)` după fiecare cadru  
- [ ] Totul în `forever`  
- [ ] Animația rulează pe placă  

**→ Minim când:** un coleg spune „se vede cum se deschide floarea”.

### Pasul 2 — Complet
- [ ] Cadrele 2 și 1 repetate la final (floarea se închide)  
- [ ] `show string "Floare"` la sfârșit  
- [ ] Nicio încurcătură între cadre (toate în `forever`)  
- [ ] Numele fișierului e `MB1_L02`  

---

## Bonus (după Complet)
- [ ] Desenează o floare cu **4 petale** diferite  
- [ ] Fă altă animație: o **inimă care crește** sau o **rachetă** care urcă  
- [ ] Încearcă timpi diferiți (`200`, `800`) și vezi cum se schimbă „viteza”  
- [ ] Pune un `show number` cu numărul de petale înainte de titlu

## Recapitulare rapidă
1. Ecranul are **25 de LED-uri**, în 5 rânduri și 5 coloane.  
2. `show leds` = desenezi tu LED cu LED.  
3. Animația = **mai multe cadre** + **pauze**.  
4. `pause (ms) 1000` = o secundă.  
5. `on start` = o dată · `forever` = mereu, imediat ce începe programul.

## Schema pe scurt *(pe foaie)*

`forever` (cadru 1 → pauză → cadru 2 → pauză → cadru 3 → pauză → cadru 2 → pauză → cadru 1 → pauză → titlu)

**Quiz scurt:**  
- Câte secunde sunt `2000 ms`?  
- Ce se întâmplă dacă ai un `forever` și un `on start` care desenează amândouă?  
- Care e adresa LED-ului din colțul din stânga sus?  
- De ce avem nevoie de pauze într-o animație?

## Temă
Desenează pe foaie o animație cu **4 cadre** (de exemplu un fluture sau un ceas care bate), apoi fă-o în MakeCode.
