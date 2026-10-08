# Lecția 5 — Busola digitală
**Modulul 2 · Proiecte Python**  
**Code Maker Club · micro:bit Python Pro**

> Placa ta are în ea o **busolă**: un mic senzor care simte câmpul magnetic al Pământului. Azi o înveți să-ți spună **încotro ești întors**, și faci o busolă cu **ac** care arată mereu spre nord.  
> Proiect: **„Busola digitală”** · `Prenume_Nume_MP2_L05`

---

## Obiectiv
La finalul orei știi să **calibrezi** busola, să citești `compass.heading()`, să transformi **gradele** în direcții și să alegi imaginea potrivită dintr-o listă.  
**Minim:** busolă cu 4 direcții (**N, E, S, V**), care se actualizează singură.  
**Complet:** Minim + **calibrare** la **A**, **acul** care arată spre nord (săgeți) și **gradele** la **B**.

## De ce contează
Busola ajută drumeții, pilotul și barca de pe mare. În programare, lecția de azi arată cum transformăm un **număr** (0–359) într-o **informație** pe care o înțelege oricine: litera sau săgeata potrivită.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4: liste și funcții |
| 10–30 | Cum merge busola: grade și direcții |
| 30–65 | Busola cu litere — **Minim** |
| 65–105 | Calibrare, săgeți, grade — **Complet** |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `compass.calibrate()` · `compass.heading()` · `//` și `%` · liste · `Image.ALL_ARROWS`

> **Atenție:** busola e **sensibilă la magneți**. Ține placa departe de telefoane, boxe, difuzoare, cleme magnetice și metale mari. Nu folosi busola chiar lângă laptop.

---

## Pas cu pas

### 1) Gradele busolei
Busola dă un număr între **0 și 359** (grade):

| Grade | Direcție |
|-------|----------|
| `0` | Nord (N) |
| `90` | Est (E) |
| `180` | Sud (S) |
| `270` | Vest (V) |

Numărul crește când te învârți **în sensul acelor de ceasornic**. 360° = cerc complet, adică din nou Nord.

### 2) Calibrarea
La început placa trebuie să învețe „unde e câmpul magnetic”. De aceea ține minte:
- `compass.calibrate()` pornește un **mini-joc**: pe ecran se derulează un mesaj, apoi **înclini placa** în toate direcțiile ca să **umpli ecranul** cu puncte (ca într-un labirint cu o bilă).  
- Faci calibrarea **după ce pornești placa** și când te muți în **alt loc**.

### Exemplul 1 — Calibrăm
```python
from microbit import *

compass.calibrate()
display.show(Image.YES)
```
Inclină placa până se umple ecranul; la final apare o **bifă**.

### Exemplul 2 — Citim gradele
```python
from microbit import *

compass.calibrate()

while True:
    h = compass.heading()
    display.scroll(str(h))
    sleep(300)
```
Întoarce-te încet în cerc: numărul crește de la `0` la `359`.

### Exemplul 3 — Împărțim cercul în 4
Dorim direcția: N, E, S sau V. Fiecare ocupă **90°**, dar „Nord” e în jurul lui `0`, adică de la `315` la `45`. Adunăm `45`, împărțim la `90` și luăm restul la `4`:

| `h` | `h + 45` | `// 90` | `% 4` | Direcție |
|-----|----------|---------|-------|----------|
| 10 | 55 | 0 | 0 | N |
| 100 | 145 | 1 | 1 | E |
| 190 | 235 | 2 | 2 | S |
| 280 | 325 | 3 | 3 | V |
| 350 | 395 | 4 | 0 | N |

```python
from microbit import *

def directie4(h):
    litere = ["N", "E", "S", "V"]
    return litere[((h + 45) // 90) % 4]

display.scroll(directie4(10))
display.scroll(directie4(100))
display.scroll(directie4(350))
```
**Ce vezi pe placă:** `N`, `E`, `N`.

### Exemplul 4 — Busola Minim
```python
from microbit import *

def directie4(h):
    litere = ["N", "E", "S", "V"]
    return litere[((h + 45) // 90) % 4]

compass.calibrate()

while True:
    h = compass.heading()
    display.show(directie4(h))
    sleep(200)
```
Rotește-te: litera se schimbă între `N`, `E`, `S` și `V`.

### Exemplul 5 — 8 direcții
Pentru 8 sectoare (de câte 45°), adunăm `22`, împărțim la `45`:
```python
from microbit import *

def sector8(h):
    return ((h + 22) // 45) % 8

nume = ["N", "NE", "E", "SE", "S", "SV", "V", "NV"]

for h in [0, 50, 90, 140, 200, 275, 330]:
    display.scroll(nume[sector8(h)])
```
Se afișează `N`, `NE`, `E`, `SE`, `S`, `V`, `NV`.

### Exemplul 6 — Săgețile
`Image.ALL_ARROWS` e o **listă cu 8 săgeți**, în ordinea `N, NE, E, SE, S, SV, V, NV`. Deci avem același **index** ca la sectoare:
```python
from microbit import *

for i in range(8):
    display.show(Image.ALL_ARROWS[i])
    sleep(500)
```
Săgeata se rotește în sensul acelor de ceasornic.

### Exemplul 7 — Acul care arată spre Nord
Dacă ești întors spre **Est** (sector 2), Nordul e **la stânga ta**, deci acul trebuie să arate spre **Vest** (index 6). Formula: `(8 - sector) % 8`.
```python
from microbit import *

def ac(h):
    s = ((h + 22) // 45) % 8
    return Image.ALL_ARROWS[(8 - s) % 8]

display.show(ac(0))
sleep(1000)
display.show(ac(90))
sleep(1000)
display.show(ac(180))
```
**Ce vezi pe placă:** o săgeată în sus (`N`), apoi spre stânga (`V`), apoi în jos (`S`).

### Exemplul 8 — Busola cu ac
```python
from microbit import *

def ac(h):
    s = ((h + 22) // 45) % 8
    return Image.ALL_ARROWS[(8 - s) % 8]

compass.calibrate()

while True:
    display.show(ac(compass.heading()))
    sleep(200)
```
Oriunde te învârți, săgeata arată **spre Nord**.

### Exemplul 9 — Buton pentru grade
```python
from microbit import *

compass.calibrate()

while True:
    if button_b.was_pressed():
        display.scroll(str(compass.heading()))
    sleep(100)
```

### Exemplul 10 — Busola Complet
```python
from microbit import *

def ac(h):
    s = ((h + 22) // 45) % 8
    return Image.ALL_ARROWS[(8 - s) % 8]

compass.calibrate()
display.show(Image.YES)
sleep(800)

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        compass.calibrate()
        display.show(Image.YES)
        sleep(800)
    elif b:
        display.scroll(str(compass.heading()))

    display.show(ac(compass.heading()))
    sleep(200)
```
- **A** = recalibrează (de exemplu când te muți în altă sală).  
- **B** = afișează gradele.  
- Altfel, săgeata arată Nordul.

---

## Greșeli frecvente
1. **„Busola arată prostii”** — nu ai calibrat sau ești lângă un magnet (telefon, boxă). Mută-te și recalibrează.  
2. **„Săgeata arată invers”** — ai folosit direct sectorul, nu `(8 - s) % 8`.  
3. **„IndexError”** — indexul nu e între `0` și `7`; folosește `% 8`.  
4. **„`display.scroll(h)` dă eroare”** — gradele sunt număr: `str(h)`.  
5. **„Nu pot ieși din calibrare”** — umple tot ecranul înclinând placa, apoi se termină.  
6. **„Nordul nu e spre fereastră”** — corect: Nordul e **magnetic**, nu spre fereastră sau ușă. Verifică cu o busolă de turist.

---

## De făcut azi — „Busola digitală”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Calibrare · litere N, E, S, V care se schimbă |
| **Complet** | Minim + acul spre Nord + A recalibrează + B arată gradele |

### Exercițiul A — „Busola” (obligatoriu)
Scrie busola. Rotește-te și verifică litera cu o busolă adevărată (sau cu aplicația din telefon, ținută **departe** de placă).

### Exercițiul B — Care direcție?
Folosind formula cu 4 direcții (`((h + 45) // 90) % 4`), ce direcție dă: `h = 80`, `h = 200`, `h = 300`, `h = 359`?

### Exercițiul C — Alarma de Nord
Scrie un program care afișează `Image.YES` atunci când placa e întoarsă spre **Nord**, cu o greșeală de cel mult 15°, adică `h <= 15` **sau** `h >= 345`. Altfel afișează `Image.NO`.

### Exercițiul D — Găsește greșelile
```text
def directie4(h):
    litere = ["N", "E", "S", "V"]
    return litere[(h + 45) / 90]

while True:
    h = compass.heading
    display.show(directie4(h)
    sleep(200)
```

### Exercițiul E — Explică
1. De ce adunăm `45` înainte să împărțim la `90`?  
2. Ce face `% 4` sau `% 8` la final?  
3. De ce acul arată spre Nord și nu spre direcția în care ești întors?

**Gata când:**
- [ ] Busola e calibrată și arată litera corectă  
- [ ] Ai verificat-o cu o busolă adevărată  
- [ ] Nu apare `IndexError`  
- [ ] Ai testat cu un coleg  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg se întoarce și spune corect direcția citită de placă.

---

## Bonus (după Complet)
- [ ] Fă un **joc de orientare**: placa alege o direcție (de exemplu Est) și tu trebuie să te întorci spre ea; dacă reușești, apare `Image.YES`  
- [ ] Folosește **8 direcții** cu litere (`NE`, `SV`, …)  
- [ ] Adaugă un **sunet** (V2) când ești întors spre Nord

## Recapitulare rapidă
1. `compass.heading()` dă gradele `0–359` (`0` = Nord).  
2. Înainte de utilizare: `compass.calibrate()`.  
3. Cu `+ jumătate`, `//` și `%` transformăm gradele într-un **sector**.  
4. `Image.ALL_ARROWS` e o listă cu 8 săgeți.  
5. Acul spre Nord: `(8 - sector) % 8`.  
6. Magneții strică busola.

## Schema pe scurt *(pe foaie)*

grade 0–359 · `+ 45` → `// 90` → `% 4` · `+ 22` → `// 45` → `% 8` · lista de săgeți · ac = `(8 - s) % 8`

**Quiz scurt:**  
- Ce grade are Estul?  
- Ce face `calibrate()`?  
- Câte săgeți are `Image.ALL_ARROWS`?  
- Ce strică busola?

## Temă
Desenează un cerc cu 8 direcții și scrie lângă fiecare **intervalul de grade** (de exemplu `N: 338–22`). Verifică acasă o direcție cu o busolă adevărată.

---

## Răspunsuri pentru profesor

**Exercițiul B:** `h = 80` → `(125 // 90) % 4 = 1` → **E**. `h = 200` → `(245 // 90) % 4 = 2` → **S**. `h = 300` → `(345 // 90) % 4 = 3` → **V**. `h = 359` → `(404 // 90) % 4 = 4 % 4 = 0` → **N**.

**Exercițiul C:**
```python
from microbit import *

compass.calibrate()

while True:
    h = compass.heading()
    if h <= 15 or h >= 345:
        display.show(Image.YES)
    else:
        display.show(Image.NO)
    sleep(200)
```

**Exercițiul D:** 1) `(h + 45) / 90` dă număr zecimal; trebuie `//` și `% 4`. 2) `compass.heading` nu are paranteze: `compass.heading()`. 3) la `display.show(directie4(h)` lipsește `)`. 4) lipsesc `from microbit import *` și calibrarea (`compass.calibrate()`).

**Exercițiul E:** 1) Ca sectorul Nord să fie centrat pe `0°` (de la `315°` la `45°`) și nu să înceapă în `0`. 2) Face ca indexul să rămână între `0` și `3` (sau `0` și `7`): după ultimul sector revenim la primul. 3) Pentru că un ac de busolă arată **locul fix** (Nord), iar noi ne rotim: săgeata trebuie să se rotească în sens opus.
