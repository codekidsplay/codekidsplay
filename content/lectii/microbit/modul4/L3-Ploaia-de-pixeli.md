# Lecția 3 — Ploaia de pixeli
**Modulul 2 · Proiecte Python**  
**Code Maker Club · micro:bit Python Pro**

> Azi stăpânești **buclele**: `for`, `for` în `for`, `while` și `break`. La final, pe placă plouă cu pixeli, iar tu controlezi viteza și furtuna.  
> Proiect: **„Ploaia de pixeli”** · `Prenume_Nume_MP2_L03`

---

## Obiectiv
La finalul orei știi să folosești `range(start, stop, pas)`, buclele **una într-alta**, `while` cu condiție și `break`.  
**Minim:** ploaie care cade singură, cu picături la întâmplare în cele 5 coloane.  
**Complet:** Minim + **A** = mai repede, **B** = mai lent, **scuturare** = furtună + coadă la fiecare picătură.

## De ce contează
Calculatoarele sunt bune la **repetat**. O singură buclă poate desena ecranul, număra, căuta sau juca o animație. Cu bucle bune, programul rămâne **scurt și clar**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2: liste și `for` |
| 10–40 | `range`, bucle în bucle, `while`, `break` |
| 40–70 | Ploaia — **Minim** |
| 70–105 | Viteză, furtună, coadă — **Complet** |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `range(a, b, pas)` · `for` în `for` · `while` · `break` · liste · `random.randint()` · `display.set_pixel()`

---

## Pas cu pas

### 1) Ce poate `range`
| Scriem | Valorile lui `i` |
|--------|------------------|
| `range(4)` | `0, 1, 2, 3` |
| `range(2, 5)` | `2, 3, 4` |
| `range(0, 10, 3)` | `0, 3, 6, 9` |
| `range(5, 0, -1)` | `5, 4, 3, 2, 1` |

Valoarea de **stop** nu e inclusă.

### Exemplul 1 — Numărătoare inversă
```python
from microbit import *

for i in range(5, 0, -1):
    display.show(str(i))
    sleep(600)

display.show(Image.HAPPY)
```
**Ce vezi pe placă:** `5, 4, 3, 2, 1`, apoi o față veselă.

### Exemplul 2 — Din 2 în 2
```python
from microbit import *

for x in range(0, 5, 2):
    display.set_pixel(x, 2, 9)
    sleep(400)
```
Se aprind LED-urile de pe coloanele `0`, `2` și `4`.

### Exemplul 3 — Buclă într-o buclă
O buclă `for` **în interiorul** alteia: pentru fiecare rând, parcurgem toate coloanele.
```python
from microbit import *

for y in range(5):
    for x in range(5):
        display.set_pixel(x, y, 9)
        sleep(60)
```
**Ce vezi pe placă:** ecranul se umple, rând cu rând, de sus în jos. Bucla de dentro face 5 pași pentru **fiecare** pas al celei de afară: în total 25.

### Exemplul 4 — Curățăm și umplem
```python
from microbit import *

for y in range(5):
    for x in range(5):
        display.set_pixel(x, y, 9)
        sleep(40)

sleep(500)

for y in range(4, -1, -1):
    for x in range(5):
        display.set_pixel(x, y, 0)
    sleep(200)
```
Prima parte umple ecranul, a doua îl **golește de jos în sus** (`range(4, -1, -1)`).

### Exemplul 5 — Bucla `while` cu condiție
`for` repetă de un număr **știut** de ori. `while` repetă **până când** condiția devine falsă:
```python
from microbit import *

nivel = 0

while nivel < 5:
    nivel += 1
    display.show(str(nivel))
    sleep(500)

display.show(Image.YES)
```
Se numără `1 … 5`, apoi apare bifa.

### Exemplul 6 — Așteptăm lumina
```python
from microbit import *

display.show(Image.ASLEEP)

while display.read_light_level() < 100:
    sleep(100)

display.show(Image.HAPPY)
```
Acoperă placa: apare somnul. Când e lumină (peste `100`), placa se trezește. Dacă în sala ta lumina nu trece niciodată de `100`, scade pragul.

### Exemplul 7 — `break`
`break` **iese** din buclă imediat:
```python
from microbit import *

for i in range(100):
    display.show(str(i % 10))
    sleep(200)
    if button_a.was_pressed():
        break

display.show(Image.YES)
```
Numără până la 99, dar apăsând **A** oprești numărătoarea.

### Exemplul 8 — Picăturile ca listă
Fiecare **coloană** are o picătură. Lista ține **înălțimea** ei: `-1` înseamnă „nu e picătură”.
```python
from microbit import *

ploaie = [-1, 2, -1, 0, 4]

display.clear()
for x in range(5):
    if ploaie[x] >= 0:
        display.set_pixel(x, ploaie[x], 9)

sleep(2000)
```
Pe ecran apar 3 picături: în coloanele 1, 3 și 4.

### Exemplul 9 — Ploaia Minim
Picăturile **cad** (y crește), iar în coloanele goale pot apărea altele noi:
```python
from microbit import *
import random

ploaie = [-1, -1, -1, -1, -1]

while True:
    for x in range(5):
        if ploaie[x] >= 0:
            ploaie[x] += 1
            if ploaie[x] > 4:
                ploaie[x] = -1
        elif random.randint(1, 4) == 1:
            ploaie[x] = 0

    display.clear()
    for x in range(5):
        if ploaie[x] >= 0:
            display.set_pixel(x, ploaie[x], 9)
    sleep(200)
```
- Întâi **mutăm** picăturile.  
- Apoi **desenăm** toată imaginea nouă.  
- `random.randint(1, 4) == 1` se întâmplă în ~1 din 4 ture.

### Exemplul 10 — Ploaia Complet
```python
from microbit import *
import random

ploaie = [-1, -1, -1, -1, -1]
pauza = 200          # milisecunde intre doua pasi

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        pauza = max(50, pauza - 50)        # mai repede
    if b:
        pauza = min(500, pauza + 50)       # mai lent

    if accelerometer.was_gesture("shake"):
        for x in range(5):                 # furtuna: o picatura in fiecare coloana
            ploaie[x] = 0

    for x in range(5):
        if ploaie[x] >= 0:
            ploaie[x] += 1
            if ploaie[x] > 4:
                ploaie[x] = -1
        elif random.randint(1, 4) == 1:
            ploaie[x] = 0

    display.clear()
    for x in range(5):
        if ploaie[x] >= 0:
            display.set_pixel(x, ploaie[x], 9)
            if ploaie[x] >= 1:
                display.set_pixel(x, ploaie[x] - 1, 4)      # coada, mai slaba
    sleep(pauza)
```
- **A** scade `pauza` (mai repede), dar nu sub `50`.  
- **B** o crește (mai lent), dar nu peste `500`.  
- `max` și `min` ține viteza între limite.  
- La **scuturare**, toate coloanele primesc o picătură.

---

## Greșeli frecvente
1. **„Ecranul pâlpâie”** — ai pus `display.clear()` și desenarea în ture diferite sau fără `sleep`. Pe tură: *mută, șterge, desenează, așteaptă*.  
2. **„Picăturile nu cad”** — nu ai mărit `ploaie[x]`.  
3. **„IndexError”** — `set_pixel(x, y, …)` merge doar pentru `x` și `y` între `0` și `4`.  
4. **„Bucla nu se termină”** — în `while`, condiția nu se schimbă niciodată.  
5. **„`range(5)` ajunge la 5”** — nu: ajunge la `4`.  
6. **„A nu face nimic”** — apasă scurt; programul verifică butoanele o dată pe tură, deci cu o pauză mare răspunde mai greu.

---

## De făcut azi — „Ploaia de pixeli”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Ploaie care cade singură în 5 coloane |
| **Complet** | Minim + A mai repede + B mai lent + furtună la scuturare + coadă |

### Exercițiul A — „Ploaia” (obligatoriu)
Scrie ploaia. Schimbă **probabilitatea** picăturilor (`randint(1, 4)` → `randint(1, 2)`) și vezi diferența.

### Exercițiul B — Ce se întâmplă?
Fără să rulezi: ce valori ia `i` în `range(1, 10, 4)`? Câte ori se execută `set_pixel` în două bucle `for` imbricate, `range(3)` și `range(4)`?

### Exercițiul C — Rând cu rând
Scrie un program care aprinde **un singur rând** (de exemplu rândul 2), apoi îl stinge și aprinde rândul 3, până la rândul 4, cu o buclă `for`.

### Exercițiul D — Găsește greșelile
```text
ploaie = [-1, -1, -1, -1, -1]

while True
    for x in range(6):
        if ploaie[x] >= 0:
            ploaie[x] + 1
    display.clear()
    for x in range(5):
        display.set_pixel(x, ploaie[x], 9)
```

### Exercițiul E — Explică
1. Care e diferența dintre `for` și `while`?  
2. Ce face `break`?  
3. De ce `range(4, -1, -1)` începe de la 4 și se oprește la 0?

**Gata când:**
- [ ] Picăturile cad de sus în jos  
- [ ] Apar picături noi la întâmplare  
- [ ] Nu apare `IndexError`  
- [ ] Ai testat cu un coleg  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg spune „plouă!” fără să-i explici.

---

## Bonus (după Complet)
- [ ] Fă ploaia să fie **împinsă de vânt**: la înclinarea plăcii spre dreapta, picăturile se mută o coloană  
- [ ] Adaugă un **fulger** (tot ecranul pe `9`) la scuturare  
- [ ] Un **contor** de picături care au ajuns jos, afișat la A+B

## Recapitulare rapidă
1. `range(start, stop, pas)` — `stop` nu e inclus.  
2. O buclă în altă buclă repetă de **înmulțit** ori.  
3. `while` merge cât timp condiția e adevărată.  
4. `break` iese din buclă.  
5. Animație: **mută → șterge → desenează → așteaptă**.

## Schema pe scurt *(pe foaie)*

`for` = număr știut · `while` = până când · `break` = ieși · listă cu înălțimile · mută → șterge → desenează

**Quiz scurt:**  
- Ce valori are `range(0, 6, 2)`?  
- Câți pași face un `for` în `for` (3 × 5)?  
- Când folosești `while` în loc de `for`?  
- Ce limite are `set_pixel`?

## Temă
Desenează pe foaie un ecran de 5×5 și scrie numerele `0 … 4` pe margini. Alege **o figură** (X, săgeată) și scrie ce două bucle ar desena-o.

---

## Răspunsuri pentru profesor

**Exercițiul B:** `range(1, 10, 4)` dă `1, 5, 9`. Două bucle `range(3)` și `range(4)` repetă de `3 × 4 = 12` ori.

**Exercițiul C:**
```python
from microbit import *

for y in range(2, 5):
    display.clear()
    for x in range(5):
        display.set_pixel(x, y, 9)
    sleep(500)
```

**Exercițiul D:** 1) după `while True` lipsește `:`. 2) `range(6)` iese din listă (`IndexError`): trebuie `range(5)`. 3) `ploaie[x] + 1` nu schimbă nimic: trebuie `ploaie[x] += 1`. 4) `set_pixel(x, ploaie[x], 9)` cu `-1` dă eroare: se desenează doar dacă `ploaie[x] >= 0`. 5) lipsesc `sleep` și `from microbit import *`.

**Exercițiul E:** 1) `for` repetă de un număr știut de ori sau pentru elementele unei liste; `while` repetă cât timp o condiție e adevărată. 2) Iese imediat din buclă. 3) Vrem rândurile `4, 3, 2, 1, 0`; `stop = -1` nu e inclus, deci ultimul este `0`.
