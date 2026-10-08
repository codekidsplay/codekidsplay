# Lecția 4 — Pianul de buzunar
**Modulul 2 · Proiecte Python**  
**Code Maker Club · micro:bit Python Pro**

> Azi dai **voce** plăcii tale! Cânți note, melodii mici și faci un **pian de buzunar** care își amintește ce ai cântat.  
> Proiect: **„Pianul de buzunar”** · `Prenume_Nume_MP2_L04`

---

## Obiectiv
La finalul orei știi să folosești modulul `music`: note, pauze, `music.pitch`, melodii din liste.  
**Minim:** pian cu 8 note (do–do): **A** urcă o notă, **B** coboară o notă, iar placa cântă nota.  
**Complet:** Minim + **înregistrare** (ține minte ultimele 16 note) și redare la **A+B**.

> **Sunetul:** placa **micro:bit V2** are difuzor. Pe **V1** conectează un **buzzer pasiv** (sau căști) între **pin 0** și **GND**, cu cleme crocodil. Cod: același!

## De ce contează
Muzica e și matematică: fiecare notă are o **frecvență** (câte vibrații pe secundă). O melodie e o **listă** de note — exact ce ai învățat în L2.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3: bucle și liste |
| 10–35 | `music.play`, note, durate, `music.pitch` |
| 35–65 | Pianul — **Minim** |
| 65–105 | Înregistrarea și redarea — **Complet** |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `import music` · `music.play()` · `music.pitch()` · liste de note · `music.set_tempo()` · `music.stop()`

> **Ai grijă la urechi:** ține volumul rezonabil, nu pune placa lângă ureche și fă pauze.

---

## Pas cu pas

### 1) Notele în Python
O notă se scrie ca **text**: `"c4:4"`.

| Parte | Înseamnă |
|-------|----------|
| `c` | numele notei (`c d e f g a b`) |
| `4` | octava (cu cât mai mare, cu atât mai ascuțit) |
| `:4` | durata, în „bătăi” mici (4 = o bătaie obișnuită) |
| `r` | pauză (de exemplu `"r:4"`) |

Cu `#` (diez) devine mai ascuțită: `"f#4:4"`. Cu `b` (bemol), mai gravă: `"bb4:4"`.

### Exemplul 1 — Prima notă
```python
from microbit import *
import music

display.show(Image.MUSIC_CROTCHET)
music.play("c4:4")
display.clear()
```
Auzi un **do**.

### Exemplul 2 — O gamă
Mai multe note, într-o **listă**:
```python
from microbit import *
import music

gama = ["c4:4", "d4:4", "e4:4", "f4:4", "g4:4", "a4:4", "b4:4", "c5:4"]
music.play(gama)
```
Placa cântă do–re–mi–fa–sol–la–si–do.

### Exemplul 3 — Durate diferite
```python
from microbit import *
import music

music.play(["c4:2", "c4:2", "g4:2", "g4:2", "a4:2", "a4:2", "g4:4"])
```
Notele cu `:2` sunt scurte, cea cu `:4` e mai lungă. Cunoști melodia?

### Exemplul 4 — Pauze și tempo
```python
from microbit import *
import music

music.set_tempo(bpm=160)               # mai repede
music.play(["e4:2", "r:2", "e4:2", "r:2", "g4:4"])
music.set_tempo(bpm=120)               # inapoi la normal
```
`r:2` e o **pauză** scurtă. `bpm` = bătăi pe minut.

### Exemplul 5 — Melodii gata făcute
Modulul `music` are melodii în el:
```python
from microbit import *
import music

music.play(music.BA_DING)
sleep(500)
music.play(music.POWER_UP)
```
Încearcă și `music.JUMP_UP`, `music.POWER_DOWN`, `music.WAWAWAWAA`.

### Exemplul 6 — Frecvența cu `pitch`
`music.pitch(frecventa, durata_ms)` cântă o frecvență exactă, în hertzi:
```python
from microbit import *
import music

music.pitch(262, 300)      # do
music.pitch(330, 300)      # mi
music.pitch(392, 300)      # sol
```
Cu cât numărul e mai mare, cu atât sunetul e mai ascuțit. Frecvența trebuie să fie **număr întreg**.

### Exemplul 7 — Sirena
Frecvențe care cresc și scad, cu o buclă:
```python
from microbit import *
import music

for f in range(400, 800, 40):
    music.pitch(f, 60)
for f in range(800, 400, -40):
    music.pitch(f, 60)
```

### Exemplul 8 — Instrumentul cu lumina
Cu cât e mai multă lumină, cu atât sunetul e mai ascuțit (ca un **theremin**):
```python
from microbit import *
import music

for i in range(40):
    lumina = display.read_light_level()
    music.pitch(200 + lumina * 3, 100)
```
Mișcă mâna deasupra plăcii și ascultă. Pe ecran nu e nevoie să apară nimic.

### Exemplul 9 — Pianul Minim
Ținem minte **ce notă** am ales cu variabila `i` (indexul în gamă):
```python
from microbit import *
import music

gama = ["c4:4", "d4:4", "e4:4", "f4:4", "g4:4", "a4:4", "b4:4", "c5:4"]
i = 0

display.show(str(i + 1))

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        i = min(len(gama) - 1, i + 1)
        display.show(str(i + 1))
        music.play(gama[i])
    elif b:
        i = max(0, i - 1)
        display.show(str(i + 1))
        music.play(gama[i])
    sleep(100)
```
**A** urcă, **B** coboară. `min` și `max` opresc indexul la capete (între `0` și `7`).

### Exemplul 10 — Pianul Complet
Fiecare notă cântată se **adaugă** într-o listă `inregistrat`. Păstrăm doar ultimele 16:
```python
from microbit import *
import music

gama = ["c4:4", "d4:4", "e4:4", "f4:4", "g4:4", "a4:4", "b4:4", "c5:4"]
MAXIM = 16
i = 0
inregistrat = []

def canta(n):
    global i
    i = n
    display.show(str(i + 1))
    music.play(gama[i])
    inregistrat.append(gama[i])
    if len(inregistrat) > MAXIM:
        inregistrat.pop(0)

display.show(str(i + 1))

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a and b:
        display.show(Image.MUSIC_QUAVER)
        music.play(inregistrat)
        display.show(str(i + 1))
    elif a:
        canta(min(len(gama) - 1, i + 1))
    elif b:
        canta(max(0, i - 1))
    sleep(100)
```
- `canta(n)` face **trei lucruri**: afișează, cântă și înregistrează.  
- `inregistrat` e o listă; `music.play(inregistrat)` o redă toată.  
- Modificăm cu `inregistrat.append(…)` o listă existentă, deci **nu** avem nevoie de `global` pentru ea, dar `i` este o variabilă care se **re-atribuie**, deci o declarăm `global`.

---

## Greșeli frecvente
1. **„Nu se aude nimic”** — pe V1 verifică dacă buzzerul e conectat între **pin 0** și **GND**; pe V2 verifică dacă programul a ajuns pe placă și dacă nu cumva cântă o pauză (`r`).  
2. **„ValueError: invalid note”** — o notă e scrisă greșit, de exemplu `"h4:4"` (nu există nota `h`) sau `"c44"` (lipsesc `:`).  
3. **„TypeError la `pitch`”** — frecvența trebuie să fie **număr întreg**; folosește `int(…)` sau `//`.  
4. **„Pianul nu înregistrează”** — ai uitat `inregistrat.append(…)` în `canta`.  
5. **„Melodia se aude întreruptă”** — `music.play` așteaptă să termine nota; nu pune `sleep` între note când nu e nevoie.  
6. **„Nu pot opri sunetul”** — folosește `music.stop()`.

---

## De făcut azi — „Pianul de buzunar”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 8 note · A urcă · B coboară · se aude nota |
| **Complet** | Minim + înregistrare (max 16 note) + redare la A+B |

### Exercițiul A — „Pianul” (obligatoriu)
Scrie pianul. Schimbă **gama**: pune alte note, de exemplu `"c4:4", "e4:4", "g4:4", "c5:4"`.

### Exercițiul B — Ce se aude?
`music.play(["g4:2", "r:2", "g4:2"])` — în ce ordine auzi sunete și pauze? Câte note sunt în lista `["c4:4", "d4:4", "e4:4"]` și ce dă `len(...)`?

### Exercițiul C — Melodia ta
Scrie o melodie de **8 note** într-o listă și cântă-o cu `music.play`. Apoi cântă-o de **două ori** cu o buclă `for`.

### Exercițiul D — Găsește greșelile
```text
import music

gama = ["c4:4", "d4:4", "e4:4"]
i = 0

while True:
    if button_a.was_pressed():
        i = i + 1
        music.play(gama(i))
```

### Exercițiul E — Explică
1. Ce înseamnă `"c4:4"`?  
2. De ce `music.pitch(262.5, 200)` nu merge?  
3. De ce `canta` are `global i`, dar nu are `global inregistrat`?

**Gata când:**
- [ ] Se aude nota potrivită la A și B  
- [ ] Ecranul arată numărul notei  
- [ ] Pianul nu iese din gamă  
- [ ] Ai testat cu un coleg (cu volum mic!)  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg cântă o melodie scurtă fără ajutor.

---

## Bonus (după Complet)
- [ ] Pune o **gamă de 5 note** (pentatonică): `c4, d4, e4, g4, a4`  
- [ ] Adaugă **scuturarea**: cântă ultima notă mai ascuțită cu `music.pitch`  
- [ ] Trimite înregistrarea unui coleg prin **radio** (te ajută lecția 7)

## Recapitulare rapidă
1. `import music`; o notă e text: `"c4:4"`.  
2. O melodie e o **listă** de note.  
3. `r` = pauză; `:N` = durata.  
4. `music.pitch(Hz, ms)` cântă o frecvență exactă.  
5. `min` și `max` păstrează indexul între limite.  
6. Pe V1 ai nevoie de buzzer pe **pin 0**.

## Schema pe scurt *(pe foaie)*

notă `"c4:4"` · listă = melodie · `play(lista)` · `pitch(Hz, ms)` · `append` înregistrează

**Quiz scurt:**  
- Ce face `"r:4"`?  
- Cum cânți o melodie dintr-o listă?  
- Ce limite are `i` în pian?  
- Unde conectezi buzzerul pe V1?

## Temă
Scrie pe foaie o melodie de **8 note** (de exemplu o cântare simplă) ca listă Python și ce durată are fiecare notă.

---

## Răspunsuri pentru profesor

**Exercițiul B:** Se aude o notă `g4`, apoi o **pauză**, apoi încă o notă `g4`. Lista are **3** note, iar `len(...)` dă `3`.

**Exercițiul C:**
```python
from microbit import *
import music

melodie = ["c4:4", "e4:4", "g4:4", "e4:4", "c4:4", "e4:4", "g4:4", "c5:8"]

for tura in range(2):
    music.play(melodie)
    sleep(300)
```

**Exercițiul D:** 1) lipsește `from microbit import *`. 2) `gama(i)` trebuie `gama[i]` (paranteze drepte). 3) `i` poate depăși lista (`IndexError`): trebuie `min(len(gama) - 1, i + 1)`. 4) bucla nu are `sleep`.

**Exercițiul E:** 1) Nota **do** din octava 4, cu durata 4. 2) Frecvența trebuie să fie număr **întreg**, nu zecimal. 3) `i` primește o valoare nouă (`i = n`), deci e nevoie de `global`; la `inregistrat` doar **modificăm** lista cu `append`/`pop`, nu o înlocuim.
