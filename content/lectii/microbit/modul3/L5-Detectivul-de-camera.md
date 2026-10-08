# Lecția 5 — Detectivul de cameră
**Modulul 1 · Python pe micro:bit**  
**Code Maker Club · micro:bit Coder**

> Placa ta are **senzori**: simte temperatura, lumina și mișcarea. Azi o transformi în **detectiv de cameră** care măsoară, observă și întocmește un raport.  
> Proiect: **„Detectivul de cameră”** · `Prenume_Nume_MP1_L05`

---

## Obiectiv
La finalul orei citești senzorii plăcii în Python și iei decizii pe baza lor.  
**Minim:** **A** derulează temperatura, **B** derulează lumina, iar **scuturarea** derulează un raport cu amândouă.  
**Complet:** Minim + când e prea cald sau prea întuneric, placa **dă alertă** singură, cu praguri puse în constante.

## De ce contează
Telefonul tău își face ecranul mai luminos la soare, lanterna se pornește dintr-o mișcare, termostatul pornește căldura la frig. Toate **citesc senzori** și **decid**. Azi înveți chiar tu cum se face.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4: variabile, `str()`, limite |
| 10–30 | Temperatura și lumina |
| 30–55 | Accelerometrul și gesturile |
| 55–75 | Alerte cu praguri |
| 75–105 | Detectivul de cameră (**Minim** și **Complet**) |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `temperature()` · `display.read_light_level()` · `accelerometer.get_x()` · `accelerometer.current_gesture()` · `accelerometer.was_gesture(...)` · `str()` · praguri · (V2: `microphone.sound_level()`)

---

## Pas cu pas

### 1) Ce poate simți placa?
| Senzor | Cum îl întrebi | Ce primești |
|--------|----------------|-------------|
| Temperatură | `temperature()` | număr întreg, în grade Celsius |
| Lumină | `display.read_light_level()` | număr de la `0` la `255` |
| Mișcare (3 direcții) | `accelerometer.get_x()` / `get_y()` / `get_z()` | număr între aproximativ `-2000` și `2000` |
| Gest | `accelerometer.current_gesture()` | un text, de exemplu `"shake"` |
| Sunet (**doar V2**) | `microphone.sound_level()` | număr de la `0` la `255` |

> `temperature()` măsoară temperatura **din interiorul plăcii**, care se încălzește puțin singură. Poate arăta cu **1–3 grade mai mult** decât un termometru.

### Exemplul 1 — Temperatura
```python
from microbit import *

display.scroll(str(temperature()))
```
**Ce vezi pe placă:** un număr ca `23`.

### Exemplul 2 — Cald sau rece?
```python
from microbit import *

t = temperature()
if t >= 26:
    display.show(Image.SAD)        # prea cald
elif t <= 18:
    display.show(Image.SURPRISED)  # frig
else:
    display.show(Image.HAPPY)      # bine
```

### Exemplul 3 — Lumina
Placa măsoară lumina cu **LED-urile** ecranului. Acoperă placa cu palma și vezi cum scade valoarea.
```python
from microbit import *

while True:
    display.scroll(str(display.read_light_level()))
    sleep(500)
```

### Exemplul 4 — Felinarul
```python
from microbit import *

PLIN = Image("99999:99999:99999:99999:99999")

while True:
    if display.read_light_level() < 40:
        display.show(PLIN)       # intuneric: aprinde totul
    else:
        display.clear()          # lumina: stinge
    sleep(200)
```
Valoarea `40` e **pragul**. Alege altul dacă sala ta e mai luminoasă sau mai întunecată.

### Exemplul 5 — Accelerometrul: bula de nivel
`accelerometer.get_x()` spune cât de **înclinată** e placa spre stânga (valori negative) sau spre dreapta (valori pozitive). Plată pe masă: aproape `0`.
```python
from microbit import *

while True:
    ax = accelerometer.get_x()
    x = (ax + 1024) // 410          # transforma -1024..1024 in 0..5
    x = min(4, max(0, x))           # il tinem intre 0 si 4
    display.clear()
    display.set_pixel(x, 2, 9)
    sleep(50)
```
**Ce vezi pe placă:** un punct în rândul din mijloc, care se mișcă spre stânga sau dreapta când înclini placa, ca bula unui nivel de constructor.

### Exemplul 6 — Gesturi
Python recunoaște gesturi cu nume: `"shake"` (scuturat), `"up"`, `"down"`, `"left"`, `"right"`, `"face up"`, `"face down"`, `"freefall"`, `"3g"`, `"6g"`, `"8g"`.
```python
from microbit import *

while True:
    g = accelerometer.current_gesture()
    if g == "shake":
        display.show(Image.SURPRISED)
    elif g == "face down":
        display.show(Image.ASLEEP)
    else:
        display.show(Image.HAPPY)
    sleep(100)
```

### Exemplul 7 — `was_gesture`
Ca la butoane: `was_gesture` ține minte o scuturare **scurtă**.
```python
from microbit import *

scuturari = 0
while True:
    if accelerometer.was_gesture("shake"):
        scuturari += 1
        display.scroll(str(scuturari))
    sleep(100)
```

### Exemplul 8 — Sunetul (doar V2)
```python
from microbit import *

while True:
    nivel = microphone.sound_level()
    display.show(Image.SQUARE if nivel > 100 else Image.SQUARE_SMALL)
    sleep(100)
```
Dacă ai placa V1, sari peste acest exemplu: ea **nu are microfon**.

### Exemplul 9 — Raport cu text
```python
from microbit import *

t = temperature()
luminos = display.read_light_level()
display.scroll("T" + str(t) + " L" + str(luminos))
```
**Ce vezi pe placă:** un text ca `T23 L140`.

### Exemplul 10 — Detectivul de cameră
```python
from microbit import *

PRAG_CALD = 26          # peste asta e prea cald
PRAG_INTUNERIC = 30     # sub asta e prea intunecat

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()
    t = temperature()
    luminos = display.read_light_level()

    if a:
        display.scroll("T" + str(t))
    elif b:
        display.scroll("L" + str(luminos))
    elif accelerometer.was_gesture("shake"):
        display.scroll("T" + str(t) + " L" + str(luminos))
    elif t >= PRAG_CALD:
        display.show(Image.SAD)          # alerta: prea cald
    elif luminos < PRAG_INTUNERIC:
        display.show(Image.ASLEEP)       # alerta: prea intuneric
    else:
        display.show(Image.HAPPY)        # totul e bine
    sleep(100)
```
- **A** → temperatura. **B** → lumina. **Scuturare** → raportul.  
- Dacă nu apeși nimic, placa **veghează**: `SAD` pentru prea cald, `ASLEEP` pentru prea întuneric, `HAPPY` dacă e bine.  
- Alertele sunt la final, deci **comenzile tale au prioritate**.

---

## Greșeli frecvente
1. **„Apare funcția, nu valoarea”** — ai scris `temperature` fără `()`.  
2. **„NameError la `display.read_light_level`”** — l-ai scris fără `display.` în față.  
3. **„Gestul nu e recunoscut”** — ai uitat ghilimelele: `was_gesture("shake")`, nu `was_gesture(shake)`.  
4. **„TypeError la `scroll`”** — ai lipit text cu număr fără `str()`.  
5. **„Temperatura arată prea mult”** — placa se încălzește; compară cu un termometru.  
6. **„Microfonul nu merge”** — ai placa V1, care nu are microfon.

---

## De făcut azi — „Detectivul de cameră”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | A = temperatura · B = lumina · scuturare = raport `T… L…` |
| **Complet** | Minim + alertele automate (`SAD` / `ASLEEP` / `HAPPY`) cu constante pentru praguri |

### Exercițiul A — „Detectivul” (obligatoriu)
Scrie programul din Exemplul 10. Pentru Minim poți omite alertele. **Măsoară** apoi în clasă și ajustează pragurile.

### Exercițiul B — Ce arată placa?
Programul are valori puse de mână. Care imagine apare?
```python
from microbit import *

t = 27
luminos = 15
if t >= 26:
    display.show(Image.SAD)
elif luminos < 30:
    display.show(Image.ASLEEP)
else:
    display.show(Image.HAPPY)
```

### Exercițiul C — Lanterna cu două praguri
Scrie un program care: sub `20` de lumină arată ecranul **plin**, între `20` și `100` arată doar **un rând** (`Image("00000:00000:99999:00000:00000")`), peste `100` ecranul **stins**.

### Exercițiul D — Găsește greșelile
```text
t = temperature
if t > 25 display.show(Image.SAD)
display.scroll("Temp: " + t)
if accelerometer.was_gesture(shake):
```

### Exercițiul E — Explică
1. De ce arată placa uneori o temperatură prea mare?  
2. Ce valori poate avea `display.read_light_level()`?  
3. Cum alegi un prag bun pentru felinar?

**Gata când:**
- [ ] Merge pe placa adevărată  
- [ ] Ai testat temperatura și lumina (palma peste placă, lanternă)  
- [ ] Gesturile funcționează  
- [ ] Pragurile sunt în constante cu litere mari  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg scutură placa ta și primește raportul.

---

## Bonus (după Complet)
- [ ] Adaugă un **mod nocturn**: dacă e întuneric, arată doar un LED din colț  
- [ ] Notează temperatura în trei locuri și compară  
- [ ] (V2) Adaugă alerta „prea gălăgios”, cu `microphone.sound_level()`  
- [ ] Folosește `"face down"` ca să „oprești” detectivul

## Recapitulare rapidă
1. `temperature()` = grade Celsius (aproximativ).  
2. `display.read_light_level()` = lumină de la `0` la `255`.  
3. `accelerometer.get_x()` = înclinare stânga–dreapta.  
4. `current_gesture()` și `was_gesture("shake")` recunosc gesturi.  
5. **Praguri** ca constante: `PRAG_CALD`, `PRAG_INTUNERIC`.  
6. Condițiile cu prioritate mare se pun **primele**.

## Schema pe scurt *(pe foaie)*

senzor → număr → compar cu **prag** → `if` / `elif` → imagine sau mesaj

**Quiz scurt:**  
- Ce imagine apare dacă `t = 20` și `luminos = 10`, cu pragurile din Exemplul 10?  
- Ce face `was_gesture("shake")`?  
- De ce folosim constante pentru praguri?  
- Cum afli dacă ai placa V1 sau V2?

## Temă
Alege **un loc din casă** (dormitor, bucătărie, balcon) și, cu placa, măsoară acolo temperatura și lumina dimineața și seara. Notează într-un tabel și scrie ce observi.

---

## Răspunsuri pentru profesor

**Exercițiul B:** apare `SAD`, pentru că `t >= 26` este prima condiție adevărată; celelalte nu mai sunt verificate.

**Exercițiul C:**
```python
from microbit import *

PLIN = Image("99999:99999:99999:99999:99999")
RAND = Image("00000:00000:99999:00000:00000")

while True:
    luminos = display.read_light_level()
    if luminos < 20:
        display.show(PLIN)
    elif luminos <= 100:
        display.show(RAND)
    else:
        display.clear()
    sleep(200)
```

**Exercițiul D:** 1) `temperature` fără `()` → nu e un număr. 2) lipsesc `:` după condiție și rândul `display.show` trebuie pe linie nouă, indentat. 3) `"Temp: " + t` fără `str()` → `TypeError`. 4) `shake` fără ghilimele → `NameError`.

**Exercițiul E:** 1) Senzorul e în interiorul plăcii, care se încălzește. 2) De la `0` la `255`. 3) Măsori valori în lumină și în întuneric și alegi una între ele.

**Quiz:** cu `t = 20` și `luminos = 10`, `t >= 26` e fals, iar `luminos < 30` e adevărat, deci apare `ASLEEP`.
