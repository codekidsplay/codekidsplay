# Lecția 9 — Cutia Exploratorului
**Modulul 2 · Proiecte Python**  
**Code Maker Club · micro:bit Python Pro**

> Este **proiectul final** al cursului! Construiești **Cutia Exploratorului**: un meniu cu unelte pentru o expediție — **busolă**, **termometru cu record păstrat**, **semnal de ajutor prin radio** și **jurnal de măsurători**. Folosești tot ce ai învățat: funcții, liste, busolă, fișiere, radio.  
> Proiect: **„Cutia Exploratorului”** · `Prenume_Nume_MP2_L09`

---

## Obiectiv
La finalul orei ai un program **mare**, împărțit în **funcții**, cu **meniu**, care folosește senzori, fișier și radio.  
**Minim:** meniu cu **3 unelte**: **B**usolă, **T**ermometru (cu record păstrat în fișier) și **S**emnal de ajutor (radio).  
**Complet:** Minim + a 4-a unealtă, **J**urnalul (ultimele 5 temperaturi) + **ecran de pornire**.

## De ce contează
Un program mare nu se scrie dintr-o dată. Se construiește **bucată cu bucată**: fiecare unealtă e o funcție pe care o **testezi singură**, apoi o pui în meniu. Așa lucrează și echipele de programatori.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1–L8: ce unelte avem? |
| 10–25 | Planul: meniu + unelte |
| 25–70 | Construim și testăm uneltele una câte una — **Minim** |
| 70–105 | Jurnalul și ecranul de pornire — **Complet** |
| 105–120 | Test cu perechea, recapitulare, quiz, temă |

**Unelte azi:** funcții · liste · `%` · busolă · fișiere · radio · `try / except` · `break`

> **În perechi:** pentru unealta **S** (semnal) aveți nevoie de **două plăci**, în același grup (aici `9`). Alegeți un **grup diferit** de al celorlalte perechi.

---

## Pas cu pas

### 1) Planul Cutiei
| Literă | Unealta | Ce face | Cum ieși |
|--------|---------|---------|----------|
| **B** | Busolă | Săgeată spre Nord | **A** |
| **T** | Termometru | **B** arată temperatura; salvează recordul | **A** |
| **S** | Semnal | **B** trimite „ajutor”; primește alarmă | **A** |
| **J** | Jurnal | **B** notează temperatura; scuturare = citește | **A** |

**Meniul:** **A** = următoarea unealtă, **B** = pornește unealta.  
Fiecare unealtă este o **funcție**, cu propria ei buclă. Când apeși **A**, funcția se termină și te întorci în meniu.

> **Regula de aur:** testează **fiecare** funcție singură, înainte s-o pui în program.

### Exemplul 1 — Unealta Busolă
Reluăm funcția `ac` din L5 și o punem într-o unealtă:
```python
from microbit import *

def ac(h):
    s = ((h + 22) // 45) % 8
    return Image.ALL_ARROWS[(8 - s) % 8]

def modul_busola():
    compass.calibrate()
    while not button_a.was_pressed():
        display.show(ac(compass.heading()))
        sleep(200)

modul_busola()
display.show(Image.YES)
```
Placa se calibrează (joc de înclinare), apoi o săgeată arată spre Nord. **A** oprește unealta și apare o bifă.

### Exemplul 2 — Recordul în fișier
Funcțiile din L8, pentru **temperatura maximă**:
```python
from microbit import *

FISIER = "maxtemp.txt"

def citeste_record():
    try:
        with open(FISIER) as f:
            return int(f.read())
    except OSError:
        return 0
    except ValueError:
        return 0

def salveaza_record(n):
    with open(FISIER, "w") as f:
        f.write(str(n))

salveaza_record(25)
vechi = citeste_record()
display.scroll(str(vechi))
```
Se afișează `25`.

### Exemplul 3 — Unealta Termometru
**B** măsoară; dacă temperatura bate recordul, se salvează și apare o inimă:
```python
from microbit import *

FISIER = "maxtemp.txt"

def citeste_record():
    try:
        with open(FISIER) as f:
            return int(f.read())
    except OSError:
        return 0
    except ValueError:
        return 0

def salveaza_record(n):
    with open(FISIER, "w") as f:
        f.write(str(n))

def modul_termometru():
    record = citeste_record()
    while True:
        a = button_a.was_pressed()
        b = button_b.was_pressed()
        if a:
            break
        if b:
            t = temperature()
            display.scroll(str(t))
            if t > record:
                record = t
                salveaza_record(record)
                display.show(Image.HEART)
                sleep(1000)
        display.show("T")
        sleep(100)

modul_termometru()
display.show(Image.YES)
```
Observă `break`: când apeși **A**, bucla se oprește și funcția se termină.

### Exemplul 4 — Unealta Semnal
Folosim `parseaza` din L7. **B** trimite mesajul `S:1`; când o placă primește `S:1`, pornește o **alarmă** (față mirată care clipește):
```python
from microbit import *
import radio

radio.config(group=9)
radio.on()

def parseaza(m):
    parti = m.split(":")
    if len(parti) != 2:
        return None, None
    try:
        return parti[0], int(parti[1])
    except ValueError:
        return None, None

def alarma():
    for i in range(6):
        display.show(Image.SURPRISED)
        sleep(200)
        display.clear()
        sleep(200)

def modul_semnal():
    while True:
        a = button_a.was_pressed()
        b = button_b.was_pressed()
        if a:
            break
        if b:
            radio.send("S:1")
            display.show(Image.ARROW_E)
            sleep(400)
        mesaj = radio.receive()
        if mesaj is not None:
            tip, val = parseaza(mesaj)
            if tip == "S" and val == 1:
                alarma()
        display.show("S")
        sleep(100)

modul_semnal()
```

### Exemplul 5 — Scheletul meniului
Înainte să punem uneltele, testăm **meniul** singur. B doar afișează numărul modului:
```python
from microbit import *

NUME = ["B", "T", "S"]
mod = 0

display.show(NUME[mod])

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        mod = (mod + 1) % len(NUME)
    elif b:
        display.scroll("Mod " + str(mod))

    display.show(NUME[mod])
    sleep(100)
```
Apăsând **A** treci prin `B`, `T`, `S` și revii la `B`.

### Exemplul 6 — Cutia Minim
Punem totul împreună. Funcția `porneste(m)` alege unealta după numărul modului:
```python
from microbit import *
import radio

def ac(h):
    s = ((h + 22) // 45) % 8
    return Image.ALL_ARROWS[(8 - s) % 8]

FISIER = "maxtemp.txt"

def citeste_record():
    try:
        with open(FISIER) as f:
            return int(f.read())
    except OSError:
        return 0
    except ValueError:
        return 0

def salveaza_record(n):
    with open(FISIER, "w") as f:
        f.write(str(n))

def parseaza(m):
    parti = m.split(":")
    if len(parti) != 2:
        return None, None
    try:
        return parti[0], int(parti[1])
    except ValueError:
        return None, None

def modul_busola():
    compass.calibrate()
    while not button_a.was_pressed():
        display.show(ac(compass.heading()))
        sleep(200)

def modul_termometru():
    record = citeste_record()
    while True:
        a = button_a.was_pressed()
        b = button_b.was_pressed()
        if a:
            break
        if b:
            t = temperature()
            display.scroll(str(t))
            if t > record:
                record = t
                salveaza_record(record)
                display.show(Image.HEART)
                sleep(1000)
        display.show("T")
        sleep(100)

def alarma():
    for i in range(6):
        display.show(Image.SURPRISED)
        sleep(200)
        display.clear()
        sleep(200)

def modul_semnal():
    while True:
        a = button_a.was_pressed()
        b = button_b.was_pressed()
        if a:
            break
        if b:
            radio.send("S:1")
            display.show(Image.ARROW_E)
            sleep(400)
        mesaj = radio.receive()
        if mesaj is not None:
            tip, val = parseaza(mesaj)
            if tip == "S" and val == 1:
                alarma()
        display.show("S")
        sleep(100)

def porneste(m):
    if m == 0:
        modul_busola()
    elif m == 1:
        modul_termometru()
    elif m == 2:
        modul_semnal()

NUME = ["B", "T", "S"]
mod = 0

radio.config(group=9)
radio.on()

display.show(NUME[mod])

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        mod = (mod + 1) % len(NUME)
    elif b:
        porneste(mod)

    display.show(NUME[mod])
    sleep(100)
```
- Programul are **trei unelte** și un meniu.  
- Recordul se **păstrează** după RESET.  
- Radio-ul se pornește **o singură dată**, la început.

### Exemplul 7 — Unealta Jurnal (pentru Complet)
```text
Idee: B pune temperatura in lista `jurnal`; pastram doar ultimele 5.
Scuturarea citeste lista, element cu element.
```
Programul:
```python
from microbit import *

jurnal = []

def modul_jurnal():
    while True:
        a = button_a.was_pressed()
        b = button_b.was_pressed()
        if a:
            break
        if b:
            jurnal.append(temperature())
            if len(jurnal) > 5:
                jurnal.pop(0)
            display.show(Image.YES)
            sleep(500)
        if accelerometer.was_gesture("shake"):
            for t in jurnal:
                display.scroll(str(t))
        display.show("J")
        sleep(100)

modul_jurnal()
```
`jurnal` este o listă; o modificăm cu `append` și `pop`, deci **nu** avem nevoie de `global`.

### Exemplul 8 — Ce schimbăm în meniu
Pentru a 4-a unealtă, schimbăm **doar două lucruri**:
```text
1. NUME = ["B", "T", "S", "J"]       (adaugam litera J)
2. in porneste(m):  elif m == 3:  modul_jurnal()
```
Meniul folosește `% len(NUME)`, deci **nu** mai modificăm nimic altceva. Asta e avantajul listei.

### Exemplul 9 — Ecranul de pornire
Un mic efect: ceasul se învârte și apare numele Cutiei:
```python
from microbit import *

def pornire():
    for img in Image.ALL_CLOCKS:
        display.show(img)
        sleep(80)
    display.scroll("Explorator")

pornire()
```
`Image.ALL_CLOCKS` e o listă cu 12 imagini de ceas.

### Exemplul 10 — Cutia Complet
```python
from microbit import *
import radio

def ac(h):
    s = ((h + 22) // 45) % 8
    return Image.ALL_ARROWS[(8 - s) % 8]

FISIER = "maxtemp.txt"

def citeste_record():
    try:
        with open(FISIER) as f:
            return int(f.read())
    except OSError:
        return 0
    except ValueError:
        return 0

def salveaza_record(n):
    with open(FISIER, "w") as f:
        f.write(str(n))

def parseaza(m):
    parti = m.split(":")
    if len(parti) != 2:
        return None, None
    try:
        return parti[0], int(parti[1])
    except ValueError:
        return None, None

def modul_busola():
    compass.calibrate()
    while not button_a.was_pressed():
        display.show(ac(compass.heading()))
        sleep(200)

def modul_termometru():
    record = citeste_record()
    while True:
        a = button_a.was_pressed()
        b = button_b.was_pressed()
        if a:
            break
        if b:
            t = temperature()
            display.scroll(str(t))
            if t > record:
                record = t
                salveaza_record(record)
                display.show(Image.HEART)
                sleep(1000)
        display.show("T")
        sleep(100)

def alarma():
    for i in range(6):
        display.show(Image.SURPRISED)
        sleep(200)
        display.clear()
        sleep(200)

def modul_semnal():
    while True:
        a = button_a.was_pressed()
        b = button_b.was_pressed()
        if a:
            break
        if b:
            radio.send("S:1")
            display.show(Image.ARROW_E)
            sleep(400)
        mesaj = radio.receive()
        if mesaj is not None:
            tip, val = parseaza(mesaj)
            if tip == "S" and val == 1:
                alarma()
        display.show("S")
        sleep(100)

jurnal = []

def modul_jurnal():
    while True:
        a = button_a.was_pressed()
        b = button_b.was_pressed()
        if a:
            break
        if b:
            jurnal.append(temperature())
            if len(jurnal) > 5:
                jurnal.pop(0)
            display.show(Image.YES)
            sleep(500)
        if accelerometer.was_gesture("shake"):
            for t in jurnal:
                display.scroll(str(t))
        display.show("J")
        sleep(100)

def porneste(m):
    if m == 0:
        modul_busola()
    elif m == 1:
        modul_termometru()
    elif m == 2:
        modul_semnal()
    elif m == 3:
        modul_jurnal()

def pornire():
    for img in Image.ALL_CLOCKS:
        display.show(img)
        sleep(80)
    display.scroll("Explorator")

NUME = ["B", "T", "S", "J"]
mod = 0

radio.config(group=9)
radio.on()

pornire()
display.show(NUME[mod])

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        mod = (mod + 1) % len(NUME)
    elif b:
        porneste(mod)

    display.show(NUME[mod])
    sleep(100)
```
- **A** = următoarea unealtă, **B** = pornește, iar în unealtă **A** = ieșire.  
- Toate cele **4 unelte** au aceeași formă: o buclă cu `break` pe **A**.  
- Programul are **mai multe funcții mici**, nu un bloc mare.

---

## Greșeli frecvente
1. **„Nu pot ieși din unealtă”** — unealta nu citește `button_a.was_pressed()` sau nu are `break`.  
2. **„Recordul dispare”** — ai reîncărcat programul pe placă. Folosește RESET.  
3. **„Radio nu merge”** — plăcile sunt în grupuri diferite, sau `radio.on()` lipsește.  
4. **„Alarma sună la toate perechile”** — grupuri la fel. Folosiți numere diferite.  
5. **„IndexError în meniu”** — modul nu e între `0` și `len(NUME) - 1`. Folosește `%`.  
6. **„Busola arată greșit”** — calibrează departe de magneți și laptopuri.

---

## De făcut azi — „Cutia Exploratorului”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Meniu + Busolă + Termometru cu record + Semnal radio |
| **Complet** | Minim + Jurnal + ecran de pornire |

### Exercițiul A — „Cutia” (obligatoriu)
Construiește Cutia pas cu pas: întâi **fiecare unealtă singură**, apoi meniul. Bifează în caiet fiecare unealtă testată.

### Exercițiul B — Testează cu perechea
Trimite „ajutor” de pe placa ta și verifică dacă alarma pornește la colegul din pereche. Apoi schimbați rolurile.

### Exercițiul C — O unealtă nouă
Adaugă o a 5-a unealtă la alegere, de exemplu **L** (lumină): arată un grafic cu rânduri, ca în L1. Ce schimbi în `NUME` și în `porneste`?

### Exercițiul D — Găsește greșelile
```text
NUME = ["B", "T", "S"]
mod = 0

def modul_termometru():
    while True:
        if button_b.was_pressed():
            display.scroll(temperature())
        sleep(100)

while True:
    if button_a.was_pressed():
        mod = mod + 1
    if button_b.was_pressed():
        modul_termometru()
    display.show(NUME[mod])
```

### Exercițiul E — Explică
1. De ce testăm fiecare unealtă separat?  
2. Ce face `break` într-o unealtă?  
3. De ce `NUME` și `% len(NUME)` fac meniul ușor de extins?

**Gata când:**
- [ ] Meniul trece prin toate uneltele  
- [ ] Fiecare unealtă pornește și se oprește cu A  
- [ ] Recordul de temperatură se păstrează după RESET  
- [ ] Semnalul a fost testat cu o altă placă  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg folosește toate cele 3 unelte fără ajutor.

---

## Bonus (după Complet)
- [ ] Un **sunet** (V2) la alarmă: `import music` și `music.play(music.BA_DING)`  
- [ ] **Salvează jurnalul** în fișier (separat prin virgule)  
- [ ] Un mod **„Busolă + grade”**: B arată gradele  
- [ ] Un mod **„Joc”** din lecțiile anterioare (ploaia, labirintul)

## Recapitulare rapidă
1. Un program mare = **funcții mici**, fiecare testată.  
2. Un meniu = listă + `%` + `porneste(m)`.  
3. Unealta are propria buclă și iese cu `break`.  
4. Datele importante se **salvează** în fișier.  
5. Radio: protocol simplu `tip:valoare`.

## Schema pe scurt *(pe foaie)*

meniu (A alege, B pornește) → unelte-funcții (busolă · termometru + fișier · semnal radio · jurnal listă) → A = ieșire

**Quiz scurt:**  
- Câte unelte are Cutia Minim?  
- Cum se oprește o unealtă?  
- Unde se salvează recordul?  
- Ce face alarma?

## Temă
Desenează pe foaie **ecranul Cutiei tale** și scrie ce literă ai pus pentru fiecare unealtă. Pregătește **două propoziții** despre proiectul tău pentru expoziția de data viitoare.

---

## Răspunsuri pentru profesor

**Exercițiul B:** Dacă alarma nu pornește: grup diferit, `radio.on()` lipsă, sau unealta **S** nu e pornită pe placa receptor (ambele plăci trebuie să fie în modul `S`).

**Exercițiul C:**
```python
def modul_lumina():
    while not button_a.was_pressed():
        nivel = display.read_light_level() // 51
        img = Image(5, 5)
        for y in range(nivel):
            for x in range(5):
                img.set_pixel(x, 4 - y, 9)
        display.show(img)
        sleep(100)
```
`NUME` primește litera `"L"` la sfârșit, iar în `porneste` se adaugă `elif m == 4: modul_lumina()` (sau `3` dacă nu există Jurnalul).

**Exercițiul D:** 1) lipsește `from microbit import *`. 2) `display.scroll(temperature())` — trebuie `str(temperature())`. 3) `mod = mod + 1` poate ieși din listă; trebuie `(mod + 1) % len(NUME)`. 4) `modul_termometru` nu are cum să iasă din buclă (lipsește `A` și `break`). 5) în bucla mare lipsește `sleep`.

**Exercițiul E:** 1) Ca să găsești greșelile ușor, într-o singură bucată. 2) Oprește bucla și funcția se termină, deci revenim în meniu. 3) Adăugăm o literă în listă și un `elif`; restul se adaptează singur.
