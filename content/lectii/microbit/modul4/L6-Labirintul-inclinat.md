# Lecția 6 — Labirintul înclinat
**Modulul 2 · Proiecte Python**  
**Code Maker Club · micro:bit Python Pro**

> Placa devine un **labirint**: înclini placa, iar o bilă luminoasă se rostogolește printre pereți până la ieșire. Hărțile sunt scrise ca **text**, iar tu înveți cum un program citește o hartă.  
> Proiect: **„Labirintul înclinat”** · `Prenume_Nume_MP2_L06`

---

## Obiectiv
La finalul orei știi să ții o **hartă** ca listă de șiruri, să citești **înclinarea** plăcii, să verifici **pereții** și să treci prin **niveluri**.  
**Minim:** un labirint cu un nivel: bila se mișcă prin înclinare, nu trece prin pereți și când ajunge la ieșire apare o bifă.  
**Complet:** Minim + **3 niveluri** + **numărul de pași** afișat la final + **A** = reia nivelul.

## De ce contează
Jocurile și aplicațiile păstrează **hărțile** (de joc, de oraș) ca date. Dacă harta e doar text, o poți schimba ușor, fără să rescrii programul. Azi vezi cum **datele** și **codul** lucrează împreună.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5: gradele busolei |
| 10–35 | Harta ca text; înclinarea plăcii |
| 35–70 | Bila care se mișcă și pereții — **Minim** |
| 70–105 | Niveluri, pași, reluare — **Complet** |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** liste de șiruri · `harta[y][x]` · `accelerometer.get_x()` / `get_y()` · funcții care returnează două valori · `display.set_pixel()`

---

## Pas cu pas

### 1) Harta ca text
Ecranul are 5×5 puncte, deci harta are **5 rânduri** a câte **5 caractere**:

| Caracter | Înseamnă |
|----------|----------|
| `#` | perete |
| `.` | loc liber |
| `S` | start |
| `E` | ieșire |

```text
S . . . .
# # # # .
. . . . .
. # # # #
E . . . .
```
Citim un caracter cu `harta[y][x]`: **întâi rândul** (`y`), **apoi coloana** (`x`).

### Exemplul 1 — O hartă în Python
```python
from microbit import *

harta = [
    "S....",
    "####.",
    ".....",
    ".####",
    "E....",
]

display.scroll(harta[0][0])      # S
display.scroll(harta[4][0])      # E
display.scroll(harta[1][0])      # #
```
Se afișează `S`, `E`, `#`.

### Exemplul 2 — Desenăm harta
Parcurgem toate rândurile și coloanele:
```python
from microbit import *

harta = [
    "S....",
    "####.",
    ".....",
    ".####",
    "E....",
]

def deseneaza(h):
    for y in range(5):
        for x in range(5):
            c = h[y][x]
            if c == "#":
                display.set_pixel(x, y, 4)
            elif c == "E":
                display.set_pixel(x, y, 7)
            else:
                display.set_pixel(x, y, 0)

deseneaza(harta)
sleep(3000)
```
**Ce vezi pe placă:** pereții (slab luminoși) și ieșirea (mai puternică).

### Exemplul 3 — Înclinarea plăcii
Placa are un accelerometru: `get_x()` crește când o **înclini spre dreapta**, `get_y()` când o înclini **spre tine**.
```python
from microbit import *

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()
    display.scroll(str(x) + " " + str(y))
    sleep(200)
```
Înclină placa în toate direcțiile și observă cum se schimbă numerele (aproape `0` când e dreaptă; peste `±300` când e înclinată bine).

### Exemplul 4 — O funcție care dă două valori
Din înclinare vrem o **direcție**: `dx` (stânga/dreapta) și `dy` (sus/jos). O funcție poate **returna două valori** deodată:
```python
from microbit import *

PRAG = 300

def inclinare():
    ax = accelerometer.get_x()
    ay = accelerometer.get_y()
    if ax > PRAG:
        return 1, 0
    if ax < -PRAG:
        return -1, 0
    if ay > PRAG:
        return 0, 1
    if ay < -PRAG:
        return 0, -1
    return 0, 0

for i in range(30):
    dx, dy = inclinare()
    display.scroll(str(dx) + str(dy), delay=60)
    sleep(100)
```
`dx, dy = inclinare()` **despachetează** cele două valori. În direcția `y`: valoarea `1` înseamnă „în jos pe ecran”.

### Exemplul 5 — Bila se mișcă
Un singur pixel, `x` și `y` ținând poziția bilei:
```python
from microbit import *

PRAG = 300
x = 0
y = 0

def inclinare():
    ax = accelerometer.get_x()
    ay = accelerometer.get_y()
    if ax > PRAG:
        return 1, 0
    if ax < -PRAG:
        return -1, 0
    if ay > PRAG:
        return 0, 1
    if ay < -PRAG:
        return 0, -1
    return 0, 0

for i in range(60):
    dx, dy = inclinare()
    x = max(0, min(4, x + dx))
    y = max(0, min(4, y + dy))
    display.clear()
    display.set_pixel(x, y, 9)
    sleep(250)
```
`max(0, min(4, …))` păstrează bila **în ecran** (de la 0 la 4).

### Exemplul 6 — Pereții
Înainte să mutăm bila, **verificăm** locul nou: dacă e perete, nu ne mișcăm.
```python
from microbit import *

harta = [
    "S....",
    "####.",
    ".....",
    ".####",
    "E....",
]

x = 0
y = 0

nx = x
ny = y + 1                   # vrem sa coboram
if harta[ny][nx] == "#":
    display.show(Image.NO)    # e perete: ramanem pe loc
else:
    y = ny
    display.show(Image.YES)
sleep(1500)
```
Sub `S` e un `#`, deci apare `NO`.

### Exemplul 7 — Găsim startul
Nu vrem să scriem de mână unde e `S` în fiecare hartă. Funcția îl caută:
```python
from microbit import *

def gaseste_start(h):
    for y in range(5):
        for x in range(5):
            if h[y][x] == "S":
                return x, y
    return 0, 0

harta = [
    "..S..",
    ".###.",
    ".....",
    ".###.",
    "E....",
]

sx, sy = gaseste_start(harta)
display.scroll(str(sx) + "," + str(sy))
```
Se afișează `2,0`.

### Exemplul 8 — Labirintul Minim
```python
from microbit import *

PRAG = 300

harta = [
    "S....",
    "####.",
    ".....",
    ".####",
    "E....",
]

def inclinare():
    ax = accelerometer.get_x()
    ay = accelerometer.get_y()
    if ax > PRAG:
        return 1, 0
    if ax < -PRAG:
        return -1, 0
    if ay > PRAG:
        return 0, 1
    if ay < -PRAG:
        return 0, -1
    return 0, 0

def deseneaza(h, bx, by, vizibil):
    for y in range(5):
        for x in range(5):
            c = h[y][x]
            if c == "#":
                display.set_pixel(x, y, 4)
            elif c == "E":
                display.set_pixel(x, y, 7)
            else:
                display.set_pixel(x, y, 0)
    if vizibil:
        display.set_pixel(bx, by, 9)

x = 0
y = 0
tura = 0

while True:
    dx, dy = inclinare()
    nx = x + dx
    ny = y + dy
    if 0 <= nx <= 4 and 0 <= ny <= 4 and harta[ny][nx] != "#":
        x = nx
        y = ny

    if harta[y][x] == "E":
        display.show(Image.YES)
        sleep(1500)
        x = 0
        y = 0

    tura += 1
    deseneaza(harta, x, y, tura % 2 == 0)
    sleep(150)
```
- Bila **clipește** (`tura % 2 == 0`), ca să o deosebești de ieșire.  
- Se mută doar dacă locul nou e **în ecran** și **nu e perete**.  
- Când ajunge pe `E`, apare bifa și bila revine la start.

### Exemplul 9 — Mai multe niveluri
O listă de hărți. Funcția `incarca(n)` dă harta, plus **startul**:
```python
from microbit import *

NIVELE = [
    [
        "S....",
        "####.",
        ".....",
        ".####",
        "E....",
    ],
    [
        "S#..E",
        ".#.#.",
        "...#.",
        "##.#.",
        ".....",
    ],
    [
        "S.#..",
        "#.#.#",
        "....#",
        ".##..",
        "..##E",
    ],
]

def gaseste_start(h):
    for y in range(5):
        for x in range(5):
            if h[y][x] == "S":
                return x, y
    return 0, 0

def incarca(n):
    h = NIVELE[n]
    sx, sy = gaseste_start(h)
    return h, sx, sy

harta, x, y = incarca(1)
display.scroll(harta[0] + " " + str(x) + str(y))
```
Se afișează `S#..E 00`. Cu trei valori returnate, le despachetezi în trei variabile.

### Exemplul 10 — Labirintul Complet
```python
from microbit import *

PRAG = 300

NIVELE = [
    [
        "S....",
        "####.",
        ".....",
        ".####",
        "E....",
    ],
    [
        "S#..E",
        ".#.#.",
        "...#.",
        "##.#.",
        ".....",
    ],
    [
        "S.#..",
        "#.#.#",
        "....#",
        ".##..",
        "..##E",
    ],
]

def gaseste_start(h):
    for y in range(5):
        for x in range(5):
            if h[y][x] == "S":
                return x, y
    return 0, 0

def incarca(n):
    h = NIVELE[n]
    sx, sy = gaseste_start(h)
    return h, sx, sy

def inclinare():
    ax = accelerometer.get_x()
    ay = accelerometer.get_y()
    if ax > PRAG:
        return 1, 0
    if ax < -PRAG:
        return -1, 0
    if ay > PRAG:
        return 0, 1
    if ay < -PRAG:
        return 0, -1
    return 0, 0

def deseneaza(h, bx, by, vizibil):
    for y in range(5):
        for x in range(5):
            c = h[y][x]
            if c == "#":
                display.set_pixel(x, y, 4)
            elif c == "E":
                display.set_pixel(x, y, 7)
            else:
                display.set_pixel(x, y, 0)
    if vizibil:
        display.set_pixel(bx, by, 9)

nivel = 0
pasi = 0
tura = 0
harta, x, y = incarca(nivel)

while True:
    if button_a.was_pressed():
        harta, x, y = incarca(nivel)         # reia nivelul

    dx, dy = inclinare()
    nx = x + dx
    ny = y + dy
    if 0 <= nx <= 4 and 0 <= ny <= 4 and harta[ny][nx] != "#":
        if dx != 0 or dy != 0:
            pasi += 1
        x = nx
        y = ny

    if harta[y][x] == "E":
        display.show(Image.YES)
        sleep(1200)
        nivel += 1
        if nivel >= len(NIVELE):
            display.show(Image.HEART)
            sleep(1200)
            display.scroll("Pasi: " + str(pasi))
            nivel = 0
            pasi = 0
        harta, x, y = incarca(nivel)

    tura += 1
    deseneaza(harta, x, y, tura % 2 == 0)
    sleep(150)
```
- `incarca(nivel)` pune harta nouă și bila la start.  
- `pasi` numără **doar** mutările reale.  
- **A** reia nivelul curent (dacă te blochezi).  
- După ultimul nivel apare inima, apoi numărul de pași, iar jocul reîncepe.

---

## Greșeli frecvente
1. **„Bila trece prin pereți”** — nu ai verificat `harta[ny][nx] != "#"` înainte de mutare.  
2. **„IndexError”** — `nx` sau `ny` ies din `0 … 4`. Verifică întâi `0 <= nx <= 4`, apoi harta (ordinea contează!).  
3. **„Harta e răsturnată”** — ai scris `harta[x][y]`; trebuie `harta[y][x]` (rând, apoi coloană).  
4. **„Bila fuge prea repede”** — mărește `sleep(150)` sau pragul.  
5. **„Nu se mișcă”** — placa e prea dreaptă; înclin-o mai mult sau scade `PRAG`.  
6. **„Nu pot ieși din nivel”** — harta nu are drum spre `E`. Verifică harta pe hârtie.

---

## De făcut azi — „Labirintul înclinat”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 1 nivel · bila se mișcă · pereții o opresc · bifă la ieșire |
| **Complet** | Minim + 3 niveluri + pași + A reia nivelul |

### Exercițiul A — „Labirintul” (obligatoriu)
Scrie labirintul. Schimbă **harta** (cu `#`, `.`, `S`, `E`). Atenție: trebuie să existe un **drum** de la `S` la `E`!

### Exercițiul B — Citește harta
Pentru harta din Exemplul 1 (`"S...."`, `"####."`, `"....."`, `".####"`, `"E...."`): ce dă `harta[2][4]`? Dar `harta[3][0]`? Dar `harta[4][0]`?

### Exercițiul C — Un nivel nou
Desenează pe hârtie un labirint 5×5 și scrie-l ca listă de 5 șiruri. Adaugă-l în `NIVELE`. Arată-l unui coleg: poate găsi un drum de la `S` la `E`?

### Exercițiul D — Găsește greșelile
```text
harta = ["S....", "####.", ".....", ".####", "E...."]
x = 0
y = 0

while True:
    if accelerometer.get_x > 300:
        x = x + 1
    if harta[x][y] == "#":
        x = x - 1
    display.set_pixel(x, y, 9)
```

### Exercițiul E — Explică
1. De ce scriem `harta[y][x]` și nu `harta[x][y]`?  
2. Ce face `dx, dy = inclinare()`?  
3. De ce verificăm `0 <= nx <= 4` **înainte** de `harta[ny][nx]`?

**Gata când:**
- [ ] Bila se mișcă pe înclinare  
- [ ] Pereții o opresc  
- [ ] Ieșirea e recunoscută  
- [ ] Ai testat cu un coleg  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg rezolvă labirintul fără ajutor.

---

## Bonus (după Complet)
- [ ] Adaugă **chei** (`K`): bila trebuie să le ia înainte să poată ieși  
- [ ] Adaugă **capcane** (`X`) care te întorc la start  
- [ ] Un **cronometru** cu `running_time()` afișat la final  
- [ ] **A+B** sare peste nivel (doar pentru profesor!)

## Recapitulare rapidă
1. Harta e o listă de 5 șiruri; `harta[y][x]` = rând, apoi coloană.  
2. `accelerometer.get_x()` / `get_y()` → înclinarea.  
3. O funcție poate **returna două sau trei valori**.  
4. Mutăm doar dacă locul nou e în ecran și nu e perete.  
5. Datele (hărțile) sunt separate de cod.

## Schema pe scurt *(pe foaie)*

`harta[y][x]` · înclinare → `dx, dy` · loc nou? ecran + perete · `E` → nivel următor

**Quiz scurt:**  
- Ce înseamnă `#` pe hartă?  
- Ce primești din `inclinare()`?  
- Ce se întâmplă dacă locul nou e `#`?  
- Cum treci la nivelul următor?

## Temă
Desenează **2 hărți noi** pe hârtie, 5×5. La una, ascunde un drum lung. Schimbă hârtia cu un coleg.

---

## Răspunsuri pentru profesor

**Exercițiul B:** `harta[2][4] = "."`, `harta[3][0] = "."`, `harta[4][0] = "E"`.

**Exercițiul C:** Orice hartă cu exact un `S` și un `E` și un drum liber între ele. Verificați pe hârtie, sau cu degetul, înainte de a o introduce.

**Exercițiul D:** 1) lipsește `from microbit import *`. 2) `accelerometer.get_x` nu are paranteze: `accelerometer.get_x()`. 3) `harta[x][y]` trebuie `harta[y][x]`. 4) nu se verifică marginile ecranului (`x` poate depăși `4`). 5) mutarea trebuie verificată **înainte** (pe locul nou), nu după. 6) în buclă lipsește `sleep` (și nu se șterge ecranul).

**Exercițiul E:** 1) Pentru că harta e o listă de **rânduri**: întâi alegem rândul (`y`), apoi coloana din rând (`x`). 2) Primește cele două valori returnate și le pune în `dx` și `dy`. 3) Altfel am cere un loc care nu există și ar apărea `IndexError`.
