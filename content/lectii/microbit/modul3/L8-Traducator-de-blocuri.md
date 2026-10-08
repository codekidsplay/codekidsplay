# Lecția 8 — Traducător de blocuri
**Modulul 1 · Python pe micro:bit**  
**Code Maker Club · micro:bit Coder**

> Azi ești **traducător**: iei programe făcute din blocuri și le scrii în Python. Descoperi că aceleași idei se spun în două limbi.  
> Proiect: **„Seiful secret în Python”** · `Prenume_Nume_MP1_L08`

---

## Obiectiv
La finalul orei știi să traduci evenimente, variabile, decizii și bucle din blocuri în Python și folosești `global` și `random`.  
**Minim:** seiful cu codul **A – B – A**: deschide cu bifă, iar orice greșeală îl închide din nou.  
**Complet:** Minim + **funcții**, numărarea **greșelilor** și o **alarmă** după 3 încercări greșite.

## De ce contează
Blocurile te ajută să înțelegi o idee. Python îți permite să o scrii **mai scurt, mai clar** și să construiești lucruri mai mari. Un programator bun poate trece ușor din unul în celălalt. Azi exersezi.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7: funcții, parametri |
| 10–30 | Dicționarul blocuri → Python |
| 30–60 | Traducem 3 programe mici |
| 60–80 | Seiful secret — **Minim** |
| 80–105 | Funcții, `global` și alarma — **Complet** |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `global` · `import random` · `random.randint()` · `if / elif / else` · `while True:` · funcții

---

## Pas cu pas

### 1) Dicționarul blocuri → Python

| În blocuri | În Python |
|------------|-----------|
| `on start` | rândurile de la început, o singură dată |
| `forever` | `while True:` |
| `on button A pressed` | `if button_a.was_pressed():` în buclă |
| `on button A+B pressed` | `if a and b:` (cu `a` și `b` citite la început) |
| `on shake` | `if accelerometer.was_gesture("shake"):` |
| `set score to 0` | `score = 0` |
| `change score by 1` | `score += 1` |
| `if … then … else` | `if … : … else: …` |
| `else if` | `elif` |
| `pick random 0 to 2` | `random.randint(0, 2)` |
| `show icon [Heart]` | `display.show(Image.HEART)` |
| `show number score` | `display.scroll(str(score))` |
| `pause (ms) 500` | `sleep(500)` |
| `repeat 4 times` | `for i in range(4):` |

> **Evenimentele** din blocuri (`on button A pressed`) nu au un „frate” direct în Python. Folosim **o buclă** care verifică la fiecare tură dacă s-a întâmplat ceva.

### Exemplul 1 — Contorul (din L4 cu blocuri)
Blocuri: A adaugă 1, B scade 1, A+B pune 0.
```python
from microbit import *

score = 0
display.scroll(str(score))

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()
    if a and b:
        score = 0
        display.scroll(str(score))
    elif a:
        score += 1
        display.scroll(str(score))
    elif b:
        score -= 1
        display.scroll(str(score))
    sleep(100)
```

### Exemplul 2 — Cursa până la 10 (din L5)
Blocuri: la 10 apare bifă și `Bravo`, scorul revine la 0.
```python
from microbit import *

score = 0
display.scroll(str(score))

while True:
    if button_a.was_pressed():
        score += 1
        if score == 10:
            display.show(Image.YES)
            sleep(1000)
            display.scroll("Bravo")
            score = 0
        display.scroll(str(score))
    sleep(100)
```

### Exemplul 3 — Bila magică (din L7)
Blocuri: la scuturare alege 0, 1 sau 2. Pentru Python avem nevoie de modulul `random`.
```python
from microbit import *
import random

display.show("?")

while True:
    if accelerometer.was_gesture("shake"):
        raspuns = random.randint(0, 2)
        if raspuns == 0:
            display.show(Image.YES)
        elif raspuns == 1:
            display.show(Image.NO)
        else:
            display.show(Image.CONFUSED)
    sleep(100)
```
`random.randint(0, 2)` poate da `0`, `1` **sau** `2` (ambele capete sunt incluse).

### Exemplul 4 — Felinarul (din L8)
```python
from microbit import *

while True:
    if display.read_light_level() < 40:
        display.show(Image("99999:99999:99999:99999:99999"))
    else:
        display.clear()
    sleep(200)
```

### 2) Seiful — planul
Codul secret e **A, B, A**. Variabila `pas` ține minte în ce pas ești:

| `pas` | Înseamnă |
|-------|----------|
| `0` | nimic corect încă |
| `1` | ai apăsat corect primul **A** |
| `2` | ai apăsat corect și **B** |

La `pas == 2`, un **A** deschide seiful.

### Exemplul 5 — Seiful Minim
```python
from microbit import *

pas = 0
display.show(Image.SQUARE)

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a and b:
        pas = 0
        display.show(Image.NO)
        sleep(700)
        display.show(Image.SQUARE)
    elif a:
        if pas == 0:
            pas = 1
        elif pas == 2:
            display.show(Image.YES)
            sleep(2000)
            pas = 0
            display.show(Image.SQUARE)
        else:
            pas = 0
            display.show(Image.NO)
            sleep(700)
            display.show(Image.SQUARE)
    elif b:
        if pas == 1:
            pas = 2
        else:
            pas = 0
            display.show(Image.NO)
            sleep(700)
            display.show(Image.SQUARE)
    sleep(100)
```
Se vede cum aceleași blocuri `Yes` / `No` se repetă. Cu o **funcție** scăpăm de repetări.

### Exemplul 6 — Probleme cu `global`
Încercăm să mutăm greșeala într-o funcție:
```text
pas = 0

def greseala():
    pas = 0               # greseala! creeaza o variabila NOUA, locala
    display.show(Image.NO)
```
Funcția creează **o altă** `pas`, locală, și `pas` din afară nu se schimbă. Ca să schimbi variabila de afară, spui `global`:

```python
from microbit import *

pas = 2

def greseala():
    global pas
    pas = 0
    display.show(Image.NO)
    sleep(700)

greseala()
display.scroll(str(pas))
```
**Ce vezi pe placă:** mai întâi `NO`, apoi `0`.

> `global pas` se pune **înainte** să schimbi `pas` în funcție. Dacă doar **citești** o variabilă de afară, nu ai nevoie de `global`.

### Exemplul 7 — Alegem un text la întâmplare
```python
from microbit import *
import random

raspunsuri = ["Da", "Nu", "Poate"]
display.scroll(random.choice(raspunsuri))
```
`random.choice(lista)` alege un element **la întâmplare** dintr-o listă.

### Exemplul 8 — Seiful Complet, pe bucăți
Pregătim două funcții mici:
```python
from microbit import *

pas = 0
greseli = 0

def seif_inchis():
    display.show(Image.SQUARE)

def alarma():
    for i in range(5):
        display.show(Image.SKULL)
        sleep(200)
        display.clear()
        sleep(200)

seif_inchis()
alarma()
seif_inchis()
```
`alarma()` pâlpâie craniul de 5 ori, apoi seiful revine.

### Exemplul 9 — Funcția `greseala`
```python
from microbit import *

pas = 1
greseli = 2

def seif_inchis():
    display.show(Image.SQUARE)

def alarma():
    for i in range(5):
        display.show(Image.SKULL)
        sleep(200)
        display.clear()
        sleep(200)

def greseala():
    global pas, greseli
    greseli += 1
    pas = 0
    display.show(Image.NO)
    sleep(700)
    if greseli >= 3:
        alarma()
        greseli = 0
    seif_inchis()

greseala()
```
La a treia greșeală (`greseli` ajunge la `3`) pornește alarma.

### Exemplul 10 — Seiful Complet
```python
from microbit import *

pas = 0          # in ce pas al codului A-B-A suntem
greseli = 0      # cate incercari gresite la rand

def seif_inchis():
    display.show(Image.SQUARE)

def alarma():
    for i in range(5):
        display.show(Image.SKULL)
        sleep(200)
        display.clear()
        sleep(200)

def greseala():
    global pas, greseli
    greseli += 1
    pas = 0
    display.show(Image.NO)
    sleep(700)
    if greseli >= 3:
        alarma()
        greseli = 0
    seif_inchis()

seif_inchis()

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a and b:
        greseala()
    elif a:
        if pas == 0:
            pas = 1
        elif pas == 2:
            display.show(Image.YES)
            sleep(2000)
            pas = 0
            greseli = 0
            seif_inchis()
        else:
            greseala()
    elif b:
        if pas == 1:
            pas = 2
        else:
            greseala()
    sleep(100)
```
- **A, B, A** deschide seiful: `YES` timp de 2 secunde.  
- Orice altă secvență (inclusiv **A+B**) e **greșeală**.  
- La **3 greșeli la rând** pornește alarma; o deschidere reușită pune `greseli` înapoi pe `0`.  
- Programul are **mai puține rânduri repetate** decât Exemplul 5.

---

## Greșeli frecvente
1. **„Variabila nu se schimbă”** — ai schimbat-o într-o funcție fără `global`.  
2. **„UnboundLocalError”** — ai folosit o variabilă în funcție înainte să-i dai o valoare, fără `global`.  
3. **„NameError: random”** — ai uitat `import random`.  
4. **„Seiful se deschide cu orice”** — lipsesc verificările `pas == 2` sau `pas == 1`.  
5. **„A+B face și A”** — verifică **a și b** primul.  
6. **„Alarma nu pornește”** — `greseli` nu crește (lipsește `global` sau `+= 1`).

---

## De făcut azi — „Seiful secret în Python”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Cod A–B–A · `YES` la deschidere · `NO` la greșeală și reluare |
| **Complet** | Minim + funcții (`greseala`, `alarma`) · `global` · alarmă după 3 greșeli |

### Exercițiul A — „Seiful” (obligatoriu)
Scrie seiful tău. Alege un **cod diferit** de A–B–A (de exemplu B–A–B) și schimbă condițiile.

### Exercițiul B — Ce se întâmplă?
La programul din Exemplul 10, apeși în ordine: **A, A, B, A**. Care sunt valorile finale ale lui `pas` și `greseli`? (Pornești cu `pas = 0`, `greseli = 0`.)

### Exercițiul C — Traduce bila magică cu 4 răspunsuri
Blocuri: la scuturare, `pick random 0 to 3` alege `Yes`, `No`, `Confused` sau `Happy`. Scrie programul în Python.

### Exercițiul D — Găsește greșelile
```text
from microbit import *

scor = 0

def punct():
    scor += 1

if button_a.was_pressed()
    punct()
x = random.randint(0, 3)
```

### Exercițiul E — Explică
1. De ce Python nu are „blocuri de eveniment” ca MakeCode?  
2. La ce folosește `global`?  
3. Ce valori poate da `random.randint(1, 6)`?

**Gata când:**
- [ ] Seiful merge pe placă  
- [ ] Codul secret e al tău  
- [ ] Greșelile sunt numărate și pornește alarma  
- [ ] Ai folosit cel puțin o funcție cu `global`  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg încearcă codul și seiful se deschide doar la secvența corectă.

---

## Bonus (după Complet)
- [ ] Fă codul de **4 pași** (ai nevoie de `pas == 3`)  
- [ ] Alarma să dureze mai mult cu `for i in range(10)`  
- [ ] Adaugă `display.scroll("BRAVO")` după deschidere  
- [ ] Traduce în Python **Panoul de comandă** de la cursul cu blocuri (Modul 2, Lecția 1)

## Recapitulare rapidă
1. Blocurile și Python spun aceleași idei: variabile, decizii, bucle.  
2. Evenimentele din blocuri → verificări în `while True:`.  
3. `random.randint(a, b)` alege un număr între `a` și `b` (inclusiv).  
4. `global` e nevoie ca să **schimbi** o variabilă de afară în funcție.  
5. Funcțiile scurtează codul repetat.  
6. Citim `a` și `b` la începutul fiecărei ture.

## Schema pe scurt *(pe foaie)*

blocuri → dicționar → Python · `pas` ține minte starea · `greseala()` numără · `alarma()` după 3

**Quiz scurt:**  
- Cu ce înlocuim `forever`?  
- Ce face `random.choice(lista)`?  
- De ce ai nevoie de `global pas`?  
- Ce se întâmplă la a treia greșeală?

## Temă
Alege **un program** făcut la cursul cu blocuri (sau inventează unul) și scrie pe foaie traducerea lui în Python, rând cu rând.

---

## Răspunsuri pentru profesor

**Exercițiul B:** `A` → `pas` 1. A doua `A`: `pas` e 1, nu 0 și nu 2, deci `else` → greșeală (`greseli = 1`, `pas = 0`). `B`: `pas` e 0, nu 1 → greșeală (`greseli = 2`, `pas = 0`). `A`: `pas` 0 → `pas = 1`. **Final: `pas = 1`, `greseli = 2`.**

**Exercițiul C:**
```python
from microbit import *
import random

display.show("?")

while True:
    if accelerometer.was_gesture("shake"):
        raspuns = random.randint(0, 3)
        if raspuns == 0:
            display.show(Image.YES)
        elif raspuns == 1:
            display.show(Image.NO)
        elif raspuns == 2:
            display.show(Image.CONFUSED)
        else:
            display.show(Image.HAPPY)
    sleep(100)
```

**Exercițiul D:** 1) în `punct()` lipsește `global scor` (altfel apare `UnboundLocalError`). 2) lipsesc `:` după `if button_a.was_pressed()`. 3) `if`-ul nu e într-o buclă `while True:`, deci se verifică o singură dată. 4) `random` nu e importat (`NameError`).

**Exercițiul E:** 1) Python e un limbaj de text; verificăm noi evenimentele într-o buclă. 2) Ca să schimbi o variabilă de afară dintr-o funcție. 3) `1, 2, 3, 4, 5` sau `6`.
