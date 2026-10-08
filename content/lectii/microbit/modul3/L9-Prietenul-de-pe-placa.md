# Lecția 9 — Prietenul de pe placă
**Modulul 1 · Python pe micro:bit**  
**Code Maker Club · micro:bit Coder**

> Azi creezi **Pixi**, un animal de companie care trăiește pe placa ta! Îi e foame, se joacă, doarme când se face întuneric și își arată starea pe ecran. Este **proiectul final** al modulului.  
> Proiect: **„Prietenul de pe placă”** · `Prenume_Nume_MP1_L09`

---

## Obiectiv
La finalul orei ai un program Python cu **stări**, **senzori**, **butoane**, **timp** și **funcții**.  
**Minim:** Pixi are `foame` și `fericire`; **A** îl hrănește, **B** se joacă cu el, iar fața lui arată cum se simte.  
**Complet:** Minim + **timp** (îi vine foame singur) + **doarme** pe întuneric + **ecran de stare** la A+B.

## De ce contează
Aproape orice joc sau aplicație ține minte **stări** (cât de flămând, cât de vesel) și le schimbă după ce face omul. Azi pui împreună tot ce ai învățat în modul: variabile, decizii, senzori, funcții.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8: `global`, funcții |
| 10–25 | Planul lui Pixi: stări și reguli |
| 25–60 | Pixi **Minim**: foame, fericire, A și B |
| 60–95 | Timp, somn și ecranul de stare — **Complet** |
| 95–110 | Test cu un coleg, îmbunătățiri |
| 110–120 | Recapitulare, quiz, temă |

**Unelte azi:** variabile · funcții · `global` · `running_time()` · `display.read_light_level()` · `accelerometer.was_gesture()` · `if / elif / else`

---

## Pas cu pas

### 1) Planul lui Pixi
Pixi are **două stări**, fiecare între `0` și `5`:

| Variabilă | 0 înseamnă | 5 înseamnă |
|-----------|-----------|-----------|
| `foame` | sătul | foarte flămând |
| `fericire` | trist | foarte vesel |

Regulile:
- **A** = hrănești → `foame` scade cu 2.  
- **B** = te joci → `fericire` crește cu 1, dar `foame` crește cu 1. Dacă Pixi e prea flămând (`foame >= 4`), nu vrea să se joace.  
- Din când în când îi vine foame singur.  
- Pe **întuneric** doarme.  
- **Scuturat** se sperie.  
- **A+B** arată starea.

### Exemplul 1 — Funcția `limiteaza`
O valoare nu trebuie să iasă din `0 … 5`. Reluăm funcția din L7:
```python
def limiteaza(x, mic, mare):
    return max(mic, min(mare, x))

print(limiteaza(7, 0, 5))
print(limiteaza(-2, 0, 5))
print(limiteaza(3, 0, 5))
```
`print` scrie în **consola serială** din editor (nu pe LED-uri). Se afișează `5`, `0` și `3`.

### Exemplul 2 — Fața lui Pixi
O funcție care **alege fața** după stări. Valorile le punem la început, ca să testăm:
```python
from microbit import *

foame = 1
fericire = 5

def fata():
    if foame >= 4 or fericire <= 1:
        return Image.SAD
    elif foame >= 3 or fericire <= 2:
        return Image.MEH
    elif fericire >= 4:
        return Image.HAPPY
    else:
        return Image.SMILE

display.show(fata())
sleep(1500)

foame = 4
display.show(fata())
sleep(1500)
```
**Ce vezi pe placă:** întâi o față veselă, apoi, cu `foame = 4`, una tristă.

> Funcția **returnează** o imagine (`return`), iar `display.show(...)` o afișează.

### Exemplul 3 — A hrănește
```python
from microbit import *

foame = 4

def limiteaza(x, mic, mare):
    return max(mic, min(mare, x))

while True:
    if button_a.was_pressed():
        foame = limiteaza(foame - 2, 0, 5)
        display.show(Image.PACMAN)
        sleep(800)
        display.scroll(str(foame))
    sleep(100)
```
Prima apăsare: `4 − 2 = 2`. A doua: `0`. A treia: tot `0`, nu `−2`, datorită lui `limiteaza`.

### Exemplul 4 — B se joacă
Aici e o **regulă**: Pixi refuză dacă e foarte flămând.
```python
from microbit import *

foame = 1
fericire = 3

def limiteaza(x, mic, mare):
    return max(mic, min(mare, x))

while True:
    if button_b.was_pressed():
        if foame >= 4:
            display.show(Image.NO)
            sleep(800)
        else:
            fericire = limiteaza(fericire + 1, 0, 5)
            foame = limiteaza(foame + 1, 0, 5)
            display.show(Image.DUCK)
            sleep(800)
        display.scroll(str(fericire) + " " + str(foame))
    sleep(100)
```
La final se afișează `fericire` și `foame` (de exemplu `4 2`), ca să vezi cum se schimbă.

### Exemplul 5 — Timpul trece
Ca să-i vină foame singur, ne uităm la ceas. `running_time()` dă **milisecundele** de când a pornit placa.
```python
from microbit import *

foame = 0
ultima = running_time()
INTERVAL = 4000

while True:
    acum = running_time()
    if acum - ultima >= INTERVAL:
        ultima = acum
        foame = min(5, foame + 1)
        display.scroll(str(foame))
    sleep(100)
```
La fiecare **4 secunde** `foame` crește cu 1, până la 5.

> De ce nu folosim `sleep(4000)`? Pentru că atunci placa **nu ar mai vedea butoanele** 4 secunde. Cu `running_time()` programul rămâne atent tot timpul.

### Exemplul 6 — Pixi doarme
```python
from microbit import *

PRAG_INTUNERIC = 20

def doarme():
    return display.read_light_level() < PRAG_INTUNERIC

while True:
    if doarme():
        display.show(Image.ASLEEP)
    else:
        display.show(Image.HAPPY)
    sleep(200)
```
Acoperă placa cu mâna: Pixi adoarme. Dacă lumina ambientală e mică, schimbă pragul.

### Exemplul 7 — Ecranul de stare
Un mic grafic: **prima coloană** arată `foame`, **ultima** arată `fericire`.
```python
from microbit import *

foame = 3
fericire = 4

def ecran_stare():
    img = Image(5, 5)
    for y in range(foame):
        img.set_pixel(0, 4 - y, 9)
    for y in range(fericire):
        img.set_pixel(4, 4 - y, 9)
    return img

display.show(ecran_stare())
sleep(2000)
```
**Ce vezi pe placă:** o coloană cu 3 LED-uri în stânga și una cu 4 în dreapta.

### Exemplul 8 — Pixi Minim
```python
from microbit import *

foame = 2
fericire = 3

def limiteaza(x, mic, mare):
    return max(mic, min(mare, x))

def fata():
    if foame >= 4 or fericire <= 1:
        return Image.SAD
    elif foame >= 3 or fericire <= 2:
        return Image.MEH
    elif fericire >= 4:
        return Image.HAPPY
    else:
        return Image.SMILE

display.show(fata())

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        foame = limiteaza(foame - 2, 0, 5)
        display.show(Image.PACMAN)
        sleep(800)
    elif b:
        if foame >= 4:
            display.show(Image.NO)
            sleep(800)
        else:
            fericire = limiteaza(fericire + 1, 0, 5)
            foame = limiteaza(foame + 1, 0, 5)
            display.show(Image.DUCK)
            sleep(800)

    display.show(fata())
    sleep(100)
```
Observă că **funcțiile doar citesc** `foame` și `fericire`. De aceea nu au nevoie de `global`.

### Exemplul 9 — Pixi Complet
Adăugăm timpul, somnul, scuturarea și ecranul de stare:
```python
from microbit import *

foame = 2          # 0 = satul, 5 = foarte flamand
fericire = 3       # 0 = trist, 5 = foarte vesel
ultima = running_time()
INTERVAL = 4000
PRAG_INTUNERIC = 20

def limiteaza(x, mic, mare):
    return max(mic, min(mare, x))

def doarme():
    return display.read_light_level() < PRAG_INTUNERIC

def fata():
    if doarme():
        return Image.ASLEEP
    elif foame >= 4 or fericire <= 1:
        return Image.SAD
    elif foame >= 3 or fericire <= 2:
        return Image.MEH
    elif fericire >= 4:
        return Image.HAPPY
    else:
        return Image.SMILE

def ecran_stare():
    img = Image(5, 5)
    for y in range(foame):
        img.set_pixel(0, 4 - y, 9)
    for y in range(fericire):
        img.set_pixel(4, 4 - y, 9)
    return img

def trece_timpul():
    global foame, fericire, ultima
    acum = running_time()
    if acum - ultima >= INTERVAL:
        ultima = acum
        foame = limiteaza(foame + 1, 0, 5)
        if foame >= 4:
            fericire = limiteaza(fericire - 1, 0, 5)

display.show(fata())

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()
    scuturat = accelerometer.was_gesture("shake")

    if doarme():
        pass                          # cand doarme, nu se intampla nimic
    elif a and b:
        display.show(ecran_stare())
        sleep(2000)
    elif a:
        foame = limiteaza(foame - 2, 0, 5)
        display.show(Image.PACMAN)
        sleep(800)
    elif b:
        if foame >= 4:
            display.show(Image.NO)
            sleep(800)
        else:
            fericire = limiteaza(fericire + 1, 0, 5)
            foame = limiteaza(foame + 1, 0, 5)
            display.show(Image.DUCK)
            sleep(800)
    elif scuturat:
        fericire = limiteaza(fericire - 1, 0, 5)
        display.show(Image.SURPRISED)
        sleep(800)
    else:
        trece_timpul()

    display.show(fata())
    sleep(100)
```
Cum funcționează:
- `trece_timpul()` **schimbă** `foame`, `fericire` și `ultima`, așa că are `global` pentru toate trei.  
- Când `doarme()` e adevărat, `pass` înseamnă „nu fac nimic” (și timpul **nu** trece).  
- Ordinea contează: `a and b` e verificat **înaintea** lui `a` și `b` separat.

### Exemplul 10 — Idei pentru Pixi 2.0
```python
from microbit import *
import random

nume = ["Pixi", "Lumi", "Bobo", "Nori"]
display.scroll(random.choice(nume))
```
Fiecare prieten de pe placă poate primi **un nume la întâmplare**. Alte idei: un Pixi care **crește** (nivel), o **inimă** la 5 jocuri la rând, o altă imagine pentru **cald/rece** (`temperature()`).

---

## Greșeli frecvente
1. **„Pixi nu mai are foame”** — `trece_timpul()` nu e apelat, sau lipsește `global`.  
2. **„Foamea merge la −1 sau la 7”** — ai uitat `limiteaza`.  
3. **„Pixi nu răspunde la butoane”** — am citit `button_a.was_pressed()` de mai multe ori. Citește **o singură dată** la începutul turei.  
4. **„Crapă la `display.scroll(foame)`”** — `scroll` vrea text: `display.scroll(str(foame))`.  
5. **„Doarme și în lumină”** — pragul `PRAG_INTUNERIC` e prea mare pentru sala ta; încearcă `10` sau `5`.  
6. **„A+B hrănește”** — `elif a and b` trebuie să fie **înaintea** lui `elif a`.

---

## De făcut azi — „Prietenul de pe placă”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | `foame` + `fericire` · A hrănește · B joacă · fața se schimbă |
| **Complet** | Minim + timp · doarme pe întuneric · scuturat · ecran de stare |

### Exercițiul A — „Pixi” (obligatoriu)
Scrie programul lui Pixi pe placă. Dă-i un **nume** (scris pe foaie) și o **regulă a ta**, de exemplu: „Pixi se bucură mai mult dacă te joci cu el când e sătul.”

### Exercițiul B — Ce urmează?
Pixi are `foame = 3` și `fericire = 3`. Apeși **B**. Care sunt valorile după aceea? Apoi apeși **B** încă o dată. Ce se întâmplă?

### Exercițiul C — O funcție nouă
Scrie funcția `mancare()` care hrănește pe Pixi: scade `foame` cu 2 (între `0` și `5`) și afișează `Image.PACMAN`. Nu uita `global`!

### Exercițiul D — Găsește greșelile
```text
foame = 2

def hraneste():
    foame -= 2

while True
    if button_a.was_pressed:
        hraneste()
    display.scroll(foame)
```

### Exercițiul E — Explică
1. De ce folosim `running_time()` în loc de `sleep(4000)`?  
2. De ce `fata()` nu are nevoie de `global`, dar `trece_timpul()` are?  
3. Ce face `pass`?

**Gata când:**
- [ ] Pixi apare pe ecran cu fața potrivită  
- [ ] A hrănește, B se joacă (și refuză când e flămând)  
- [ ] Valorile nu ies din `0 … 5`  
- [ ] Ai testat cu un coleg  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg apasă A și B și înțelege ce se întâmplă cu Pixi fără ajutorul tău.

---

## Bonus (după Complet)
- [ ] Pixi **crește**: după 5 jocuri primește „nivel” și o față nouă  
- [ ] Adaugă **temperatura**: dacă e peste 28 °C, Pixi spune „Cald!”  
- [ ] Un **sunet** (doar V2): `music.play(music.JUMP_UP)` după hrănire (`import music`)  
- [ ] Doi Pixi care se „vizitează” prin radio  

## Recapitulare rapidă
1. Un program cu stări ține minte lucrurile în **variabile**.  
2. `limiteaza` ține valorile între două limite.  
3. O funcție poate **returna** o imagine; o funcție care schimbă variabile de afară are nevoie de `global`.  
4. `running_time()` lasă programul atent, spre deosebire de un `sleep` lung.  
5. `pass` = „nu fac nimic”.  
6. Ordinea `if / elif` contează: cazul cel mai specific (`a and b`) merge primul.

## Schema pe scurt *(pe foaie)*

stări (`foame`, `fericire`) · butoane schimbă stările · `fata()` alege imaginea · `trece_timpul()` · `doarme()`

**Quiz scurt:**  
- Ce valori poate avea `foame`?  
- Ce se întâmplă dacă apeși B când `foame` e 4?  
- Ce arată ecranul de stare?  
- De ce `a and b` e înaintea lui `a`?

## Temă
Desenează pe foaie **fețele** lui Pixi (cel puțin 4) și scrie lângă fiecare **când** apare (de exemplu „foame ≥ 4”). Pregătește o **propoziție** despre proiectul tău pentru expoziția de data viitoare.

---

## Răspunsuri pentru profesor

**Exercițiul B:** după primul **B**: `fericire = 4`, `foame = 4`. La al doilea **B**, `foame >= 4`, deci Pixi **refuză** (se afișează `NO`) și valorile rămân `4` și `4`.

**Exercițiul C:**
```python
def mancare():
    global foame
    foame = limiteaza(foame - 2, 0, 5)
    display.show(Image.PACMAN)
    sleep(800)
```

**Exercițiul D:** 1) în `hraneste()` lipsește `global foame` (`UnboundLocalError`). 2) după `while True` lipsește `:`. 3) `button_a.was_pressed` nu are paranteze: `button_a.was_pressed()`. 4) `display.scroll(foame)` vrea text: `display.scroll(str(foame))`. (Și `foame` ar putea ajunge sub `0`: se poate folosi `limiteaza`.)

**Exercițiul E:** 1) Pentru că `sleep(4000)` oprește programul și nu mai vede butoanele. 2) `fata()` doar **citește** variabilele; `trece_timpul()` le **schimbă**. 3) Nu face nimic; ține locul unui rând obligatoriu.
