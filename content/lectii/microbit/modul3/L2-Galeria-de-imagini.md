# Lecția 2 — Galeria de imagini
**Modulul 1 · Python pe micro:bit**  
**Code Maker Club · micro:bit Coder**

> Azi desenezi pe LED-uri cu **text**: folosești imaginile gata făcute, îți inventezi propriile imagini și faci animații cu `for`.  
> Proiect: **„Galeria de imagini”** · `Prenume_Nume_MP1_L02`

---

## Obiectiv
La finalul orei creezi imagini cu `Image("…")`, setezi pixeli cu `display.set_pixel` și arăți mai multe imagini una după alta.  
**Minim:** o galerie cu **3 imagini desenate de tine**, care se schimbă la nesfârșit.  
**Complet:** Minim + o **a patra imagine** și o animație cu **luminozitate** (o inimă care se aprinde treptat).

## De ce contează
Fiecare ecran din lume e făcut din pixeli: cei de pe telefon, de pe televizor, din jocuri. Azi desenezi cu cei 25 de pixeli ai plăcii și înveți un secret: **un desen e doar un șir de cifre**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1: `display`, `sleep`, `while True` |
| 10–25 | Imaginile gata făcute: `Image.HEART`, `Image.DUCK` … |
| 25–55 | Imaginile noastre: `Image("…")` (cifre de 0 la 9) |
| 55–75 | Un pixel: `display.set_pixel` și bucla `for` |
| 75–105 | Galeria (**Minim**) și luminozitatea (**Complet**) |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `Image.NUME` · `Image("…")` · `display.show(lista)` · `display.set_pixel` · `display.clear()` · `for … in range(…)`

---

## Pas cu pas

### 1) Imagini gata făcute
Python știe multe imagini: `Image.HEART`, `Image.HAPPY`, `Image.SAD`, `Image.DUCK`, `Image.HOUSE`, `Image.GHOST`, `Image.ARROW_N` (săgeată în sus) … Le scrii mereu cu **litere mari**.

### Exemplul 1 — O imagine gata făcută
```python
from microbit import *

display.show(Image.DUCK)
```

### Exemplul 2 — Mai multe imagini într-o listă
O **listă** se scrie între paranteze drepte `[ ]`, cu virgulă între elemente.
```python
from microbit import *

display.show([Image.HEART, Image.HAPPY, Image.DUCK], delay=700)
```
`delay=700` înseamnă că fiecare imagine stă **700 ms**. Afișează cele trei imagini pe rând, o singură dată.

### 2) Propriile imagini: șirul de cifre
O imagine are **5 rânduri**, iar fiecare rând are **5 cifre**. Rândurile se despart cu `:`. Fiecare cifră e luminozitatea unui LED:

| Cifra | Înseamnă |
|-------|----------|
| `0` | stins |
| `1` … `8` | tot mai luminos |
| `9` | cel mai luminos |

### Exemplul 3 — Un pom
```python
from microbit import *

pom = Image("00900:"
            "09990:"
            "99999:"
            "00900:"
            "00900")
display.show(pom)
```
Fiecare rând al imaginii e scris pe un rând al programului, ca să vezi desenul. Ghilimelele și `:` trebuie să fie **la locul lor**.

**Ce vezi pe placă:**
```text
. . # . .
. # # # .
# # # # #
. . # . .
. . # . .
```

### Exemplul 4 — Galeria cu trei imagini
```python
from microbit import *

pom = Image("00900:09990:99999:00900:00900")
casa = Image("00900:09990:99999:99099:99099")
soare = Image("90909:09990:99999:09990:90909")

while True:
    display.show(pom)
    sleep(1000)
    display.show(casa)
    sleep(1000)
    display.show(soare)
    sleep(1000)
```
Numele `pom`, `casa` și `soare` sunt **variabile**: păstrează imaginile ca să le folosim apoi. (Nu folosim `ă`, `î` în numele variabilelor.)

### 3) Luminozitate diferită
```python
from microbit import *

gradient = Image("00369:"
                 "00369:"
                 "00369:"
                 "00369:"
                 "00369")
display.show(gradient)
```
Coloanele se luminează tot mai tare spre dreapta.

### 4) Un pixel: `set_pixel(x, y, luminozitate)`
- `x` = coloana, **de la 0 la 4**, de la stânga la dreapta.  
- `y` = rândul, **de la 0 la 4**, de sus în jos.  
- luminozitatea e **de la 0 la 9**.

### Exemplul 5 — Un punct în centru
```python
from microbit import *

display.set_pixel(2, 2, 9)
```

**Ce vezi pe placă:**
```text
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
```

### Exemplul 6 — Bucla `for`
`for i in range(5):` repetă de **5 ori**, iar `i` ia valorile `0, 1, 2, 3, 4`.
```python
from microbit import *

for i in range(5):
    display.set_pixel(i, i, 9)
    sleep(300)
```
Se aprinde diagonala, un LED pe rând.

**Ce vezi pe placă la final:**
```text
# . . . .
. # . . .
. . # . .
. . . # .
. . . . #
```

### Exemplul 7 — Coborâșul soarelui
`display.clear()` stinge toate LED-urile.
```python
from microbit import *

for y in range(5):
    display.clear()
    display.set_pixel(2, y, 9)
    sleep(400)
```
Un punct coboară pe coloana din mijloc: rândul 0, apoi 1, 2, 3, 4.

### Exemplul 8 — Înmulțim luminozitatea
```python
from microbit import *

display.show(Image.HEART * 0.3)
sleep(1000)
display.show(Image.HEART)
```
`Image.HEART * 0.3` face inima mai **slabă**. Poți înmulți orice imagine.

### Exemplul 9 — Inima care se aprinde treptat
```python
from microbit import *

for i in range(10):
    display.show(Image.HEART * (i / 9))
    sleep(200)
```
Pentru `i = 0` inima e stinsă, pentru `i = 9` e la fel de luminoasă ca originalul.

### Exemplul 10 — Galerie cu o listă proprie
```python
from microbit import *

cadre = [
    Image("00000:00000:00900:00000:00000"),
    Image("00000:09990:09090:09990:00000"),
    Image("99999:90009:90009:90009:99999"),
]

while True:
    display.show(cadre, delay=400)
```
Un punct, apoi un pătrat mic, apoi unul mare: o animație cu trei cadre.

---

## Greșeli frecvente
1. **„ValueError la `Image(…)`”** — ai pus o literă sau un semn în loc de cifră, sau un rând are altă lungime.  
2. **„Imaginea arată strâmb”** — un rând are mai mult sau mai puțin de 5 cifre.  
3. **„ValueError la `set_pixel`”** — `x` sau `y` e în afara intervalului `0–4`, sau luminozitatea e peste `9`.  
4. **„Nu văd diferența dintre 5 și 9”** — la unele plăci diferența e mică; încearcă `1` față de `9`.  
5. **„Imaginile se schimbă prea repede”** — mărește `delay` sau `sleep`.  
6. **„Programul se oprește după o rundă”** — pune imaginile în `while True:`.

---

## De făcut azi — „Galeria de imagini”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 3 imagini **desenate de tine** cu `Image("…")`, arătate pe rând, în buclă |
| **Complet** | Minim + a patra imagine + animația „inima care se aprinde” cu `for` |

### Exercițiul A — „Galeria” (obligatoriu)
1. Desenează pe foaie 3 grile 5×5 (un pom, o casă și o față, de exemplu).  
2. Transformă fiecare grilă într-un șir de cifre (`0` = stins, `9` = aprins).  
3. Scrie programul care le arată în buclă, cu `sleep(1000)` între ele.  
4. (Complet) Adaugă imaginea a patra și, după galerie, animația cu `for`.

### Exercițiul B — Ce desen e?
Desenează pe grilă imaginea de mai jos, apoi verifică în placă:
```python
from microbit import *

display.show(Image("90009:09090:00900:09090:90009"))
```

### Exercițiul C — Litera T
Scrie în Python o imagine cu litera **T** (rândul de sus plin, apoi o linie în mijloc în jos) și arată-o pe placă.

### Exercițiul D — Găsește greșelile
Fiecare linie are o greșeală. Spune care e și ce eroare ar da.
```text
display.show(Image("00A00:09990:99999:00900:00900"))
display.set_pixel(5, 0, 9)
display.set_pixel(0, 0, 10)
display.show(Image.heart)
```

### Exercițiul E — Explică
1. Ce înseamnă cifra `9` într-un șir de imagine?  
2. Care e adresa pixelului din colțul din dreapta jos?  
3. De câte ori se repetă `for i in range(5):`?

**Gata când:**
- [ ] Programul merge pe placă  
- [ ] Ai cel puțin 3 imagini proprii  
- [ ] Folosești `while True:` și `sleep`  
- [ ] Ai încercat `for` cu `set_pixel`  
- [ ] Ai răspunsurile la B–E  

---

## Bonus (după Complet)
- [ ] Fă o animație cu 5 cadre (o floare care se deschide, o rachetă care urcă)  
- [ ] Desenează cu `set_pixel` și `for` un **rând întreg** aprins: `for x in range(5): display.set_pixel(x, 2, 9)`  
- [ ] Fă un **fulger**: un cadru luminos 100 ms, apoi unul stins 900 ms  
- [ ] Scrie-ți inițialele ca imagini (A, M, …)

## Recapitulare rapidă
1. `Image.NUME` = imagini gata făcute (litere mari).  
2. `Image("…")` = imagine proprie: 5 rânduri × 5 cifre, despărțite prin `:`.  
3. Cifrele `0–9` = luminozitatea.  
4. `display.set_pixel(x, y, luminozitate)` aprinde un LED; `x` și `y` merg de la `0` la `4`.  
5. `for i in range(5):` repetă de 5 ori.  
6. Lista `[a, b, c]` poate fi arătată cu `display.show(lista)`.

## Schema pe scurt *(pe foaie)*

grilă 5×5 → șir de cifre → `Image("…")` → `display.show(...)` → buclă `while True:`

**Quiz scurt:**  
- Cum desparți rândurile într-un șir `Image`?  
- Ce valori poate avea `x`?  
- Ce face `display.clear()`?  
- Care e diferența dintre `Image.HEART` și `Image.HEART * 0.3`?

## Temă
Desenează pe foaie **o animație cu 4 cadre** (de exemplu un fluture) și scrie șirurile de cifre pentru fiecare cadru. Mâine o rulezi pe placă.

---

## Răspunsuri pentru profesor

**Exercițiul B:** litera **X**.
```text
# . . . #
. # . # .
. . # . .
. # . # .
# . . . #
```

**Exercițiul C:**
```python
from microbit import *

display.show(Image("99999:00900:00900:00900:00900"))
```

**Exercițiul D:** 1) litera `A` în loc de cifră → `ValueError`. 2) `x = 5` e în afara intervalului `0–4` → `ValueError`. 3) luminozitatea `10` e peste `9` → `ValueError`. 4) `Image.heart` trebuie `Image.HEART` → `AttributeError`.

**Exercițiul E:** 1) luminozitate maximă. 2) `(4, 4)`. 3) De 5 ori (`i` = 0, 1, 2, 3, 4).
