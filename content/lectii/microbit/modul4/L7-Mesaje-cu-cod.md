# Lecția 7 — Mesaje cu cod
**Modulul 2 · Proiecte Python**  
**Code Maker Club · micro:bit Python Pro**

> Două plăci vorbesc prin radio — dar ca să se **înțeleagă**, trebuie să aibă o **limbă comună**. Azi inventezi un **protocol**: mesaje scurte, cu un **cod** în față, ca `E:2` („emoji numărul 2”) sau `OK:2` („am primit”).  
> Proiect: **„Mesaje cu cod”** · `Prenume_Nume_MP2_L07` · **lucrăm în perechi**

---

## Obiectiv
La finalul orei știi să construiești mesaje de forma **`tip:valoare`**, să le **desfaci** cu `split`, să **verifici** că sunt corecte (`try / except`) și să trimiți **confirmări**.  
**Minim:** două plăci trimit **emoji-uri** prin cod (`E:0 … E:4`) și le afișează.  
**Complet:** Minim + **confirmare** (`OK`) + **temperatura** trimisă la **A+B**.

## De ce contează
Radio-ul trimite doar **text**. Ca două aparate să se înțeleagă, trebuie să fie de acord: „ce înseamnă fiecare mesaj?”. Un acord de felul acesta se numește **protocol**. Internetul, telefoanele și jocurile online folosesc protocoale.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6; radio din Modulul 1 |
| 10–35 | Mesaje `tip:valoare`, `split`, `int`, `try / except` |
| 35–70 | Emoji prin cod — **Minim** |
| 70–105 | Confirmare `OK` și temperatura — **Complet** |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `import radio` · `radio.config(group=…)` · `radio.send()` / `radio.receive()` · `split` · `int()` · `try / except` · `is not None`

> **Perechi:** fiecare pereche alege **același număr de grup**, **diferit** de al celorlalte perechi (de la `1` la `255`).

---

## Pas cu pas

### 1) Protocolul nostru
Fiecare mesaj arată așa: `tip:valoare`

| Mesaj | Înseamnă |
|-------|----------|
| `E:2` | „Arată emoji-ul cu numărul 2” |
| `OK:2` | „Am primit emoji-ul 2” |
| `T:23` | „Temperatura mea este 23” |

### Exemplul 1 — Construim un mesaj
```python
from microbit import *

tip = "E"
valoare = 2
mesaj = tip + ":" + str(valoare)

display.scroll(mesaj)
```
**Ce vezi pe placă:** `E:2`. Numărul trebuie transformat în text cu `str()`.

### Exemplul 2 — Desfacem un mesaj cu `split`
`split(":")` taie textul la fiecare `:` și dă o **listă**:
```python
from microbit import *

mesaj = "T:23"
parti = mesaj.split(":")

display.scroll(parti[0])        # T
display.scroll(parti[1])        # 23
display.scroll(str(len(parti))) # 2
```

### Exemplul 3 — Din text în număr
`parti[1]` e text. Pentru calcule, îl facem număr cu `int()`:
```python
from microbit import *

parti = "T:23".split(":")
temperatura = int(parti[1])

display.scroll(str(temperatura + 1))     # 24
```

### Exemplul 4 — Mesaje stricate: `try / except`
Dacă ajunge un mesaj ca `E:abc`, `int("abc")` dă o eroare și programul se oprește. Cu `try / except` **prindem** eroarea:
```python
from microbit import *

def citeste_numar(text):
    try:
        return int(text)
    except ValueError:
        return None

display.scroll(str(citeste_numar("17")))     # 17
display.scroll(str(citeste_numar("abc")))    # None
```
`None` înseamnă „nimic, nu e valoare”. Sub `try:` punem ce **poate** da eroare, iar sub `except ValueError:` ce facem **dacă** apare.

### Exemplul 5 — Funcția `parseaza`
O funcție care desface orice mesaj și returnează `(tip, valoare)`, sau `(None, None)` dacă mesajul e stricat:
```python
from microbit import *

def parseaza(m):
    parti = m.split(":")
    if len(parti) != 2:
        return None, None
    try:
        return parti[0], int(parti[1])
    except ValueError:
        return None, None

for m in ["E:2", "OK:2", "salut", "E:abc", "T:23"]:
    tip, val = parseaza(m)
    display.scroll(str(tip) + "/" + str(val), delay=60)
    sleep(300)
```
Se afișează pe rând: `E/2`, `OK/2`, `None/None`, `None/None`, `T/23`.

### Exemplul 6 — Emițătorul
**A** alege emoji-ul, **B** îl trimite:
```python
from microbit import *
import radio

radio.config(group=7)
radio.on()

EMOJI = [Image.HAPPY, Image.SAD, Image.HEART, Image.SURPRISED, Image.ANGRY]
alege = 0

display.show(EMOJI[alege])

while True:
    if button_a.was_pressed():
        alege = (alege + 1) % len(EMOJI)
        display.show(EMOJI[alege])
    if button_b.was_pressed():
        radio.send("E:" + str(alege))
        display.show(Image.ARROW_E)
        sleep(300)
        display.show(EMOJI[alege])
    sleep(100)
```

### Exemplul 7 — Receptorul
```python
from microbit import *
import radio

radio.config(group=7)
radio.on()

EMOJI = [Image.HAPPY, Image.SAD, Image.HEART, Image.SURPRISED, Image.ANGRY]

while True:
    mesaj = radio.receive()
    if mesaj is not None:
        parti = mesaj.split(":")
        if len(parti) == 2 and parti[0] == "E":
            try:
                n = int(parti[1])
                if 0 <= n < len(EMOJI):
                    display.show(EMOJI[n])
                    sleep(1500)
                    display.clear()
            except ValueError:
                pass
    sleep(100)
```
Verificăm **tot**: există două părți, tipul e `E`, valoarea e număr și este între `0` și `4`. Orice mesaj în plus (de la altă pereche, sau stricat) este **ignorat**.

> `radio.receive()` dă `None` când nu a venit nimic. Verificăm cu `is not None`.

### Exemplul 8 — Același program pe ambele plăci
Mai simplu pentru noi: **un singur program**, încărcat pe ambele plăci. Fiecare poate și trimite, și primi.
```python
from microbit import *
import radio

radio.config(group=7)
radio.on()

EMOJI = [Image.HAPPY, Image.SAD, Image.HEART, Image.SURPRISED, Image.ANGRY]
alege = 0

def parseaza(m):
    parti = m.split(":")
    if len(parti) != 2:
        return None, None
    try:
        return parti[0], int(parti[1])
    except ValueError:
        return None, None

display.show(EMOJI[alege])

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        alege = (alege + 1) % len(EMOJI)
        display.show(EMOJI[alege])
    elif b:
        radio.send("E:" + str(alege))
        display.show(Image.ARROW_E)
        sleep(300)
        display.show(EMOJI[alege])

    mesaj = radio.receive()
    if mesaj is not None:
        tip, val = parseaza(mesaj)
        if tip == "E" and val is not None and 0 <= val < len(EMOJI):
            display.show(EMOJI[val])
            sleep(1500)
            display.show(EMOJI[alege])
    sleep(100)
```
Aceasta este varianta **Minim**: ai nevoie de două plăci, în același grup.

### Exemplul 9 — Confirmarea `OK`
Receptorul răspunde cu `OK:<număr>`, iar emițătorul arată o **bifă**. Atenție: răspunsul `OK` **nu** primește la rândul lui răspuns, altfel plăcile s-ar tot răspunde la nesfârșit!
```python
from microbit import *
import radio

radio.config(group=7)
radio.on()

def parseaza(m):
    parti = m.split(":")
    if len(parti) != 2:
        return None, None
    try:
        return parti[0], int(parti[1])
    except ValueError:
        return None, None

# receptorul: primeste E, raspunde OK
mesaj = radio.receive()
if mesaj is not None:
    tip, val = parseaza(mesaj)
    if tip == "E" and val is not None:
        radio.send("OK:" + str(val))
    elif tip == "OK":
        display.show(Image.YES)
```
Programul de mai sus arată doar **ideea**: `E` → răspunde `OK`; `OK` → arată bifa, **fără** alt răspuns.

### Exemplul 10 — Mesaje cu cod, Complet
```python
from microbit import *
import radio

radio.config(group=7)
radio.on()

EMOJI = [Image.HAPPY, Image.SAD, Image.HEART, Image.SURPRISED, Image.ANGRY]
alege = 0

def parseaza(m):
    parti = m.split(":")
    if len(parti) != 2:
        return None, None
    try:
        return parti[0], int(parti[1])
    except ValueError:
        return None, None

display.show(EMOJI[alege])

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a and b:
        radio.send("T:" + str(temperature()))
        display.show(Image.ARROW_E)
        sleep(300)
        display.show(EMOJI[alege])
    elif a:
        alege = (alege + 1) % len(EMOJI)
        display.show(EMOJI[alege])
    elif b:
        radio.send("E:" + str(alege))
        display.show(Image.ARROW_E)
        sleep(300)
        display.show(EMOJI[alege])

    mesaj = radio.receive()
    if mesaj is not None:
        tip, val = parseaza(mesaj)
        if tip == "E" and val is not None and 0 <= val < len(EMOJI):
            display.show(EMOJI[val])
            sleep(1500)
            radio.send("OK:" + str(val))
            display.show(EMOJI[alege])
        elif tip == "OK":
            display.show(Image.YES)
            sleep(800)
            display.show(EMOJI[alege])
        elif tip == "T" and val is not None:
            display.scroll("T=" + str(val))
            display.show(EMOJI[alege])
    sleep(100)
```
- **A** alege, **B** trimite emoji-ul, **A+B** trimite temperatura.  
- Receptorul afișează emoji-ul și **trimite `OK`**.  
- Emițătorul primește `OK` și arată **bifa**.  
- Mesajele stricate sunt **ignorate**.

---

## Greșeli frecvente
1. **„Nu primesc nimic”** — plăcile sunt în **grupuri diferite** sau lipsește `radio.on()`.  
2. **„Primesc mesajele altora”** — prea multe perechi în același grup. Alegeți grupuri **diferite**.  
3. **„TypeError la `send`”** — `radio.send` vrea **text**: `"E:" + str(alege)`.  
4. **„ValueError: invalid literal”** — ai făcut `int()` fără `try / except` pe un mesaj stricat.  
5. **„Plăcile își răspund la nesfârșit”** — și răspunsul `OK` primește răspuns. Răspunde doar la `E`.  
6. **„Programul se oprește”** — `None` nu poate fi împărțit sau afișat direct; folosește `is not None` sau `str()`.

---

## De făcut azi — „Mesaje cu cod”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Emoji trimis prin `E:n` și afișat pe cealaltă placă |
| **Complet** | Minim + `OK` de confirmare + `T:` cu temperatura la A+B |

### Exercițiul A — „Mesaje cu cod” (obligatoriu)
Încarcă același program pe ambele plăci. Testează: A alege, B trimite. Adaugă **un emoji al tău** (de exemplu `Image.SKULL`).

### Exercițiul B — Ce dă?
Fără să rulezi: `"L:140".split(":")`, apoi `len(...)`. Ce dă `parseaza("E:3")`? Dar `parseaza("E:3:4")`? Dar `parseaza("salut")`?

### Exercițiul C — Mesajul `L`
Adaugă un tip nou: `L:<nivel>` (lumina). Cu **B+A** (sau altă combinație) trimiți `display.read_light_level()`, iar receptorul afișează un **grafic** cu rânduri (ca în L1).

### Exercițiul D — Găsește greșelile
```text
import radio

radio.on()

while True:
    m = radio.receive()
    parti = m.split(":")
    if parti[0] == "E":
        display.show(EMOJI[parti[1]])
    radio.send("OK:" + parti[1])
```

### Exercițiul E — Explică
1. Ce este un protocol?  
2. De ce verificăm `len(parti) == 2`?  
3. De ce răspunsul `OK` nu primește și el răspuns?

**Gata când:**
- [ ] Emoji-ul ajunge pe cealaltă placă  
- [ ] Mesajele stricate nu opresc programul  
- [ ] Apare bifa la emițător  
- [ ] Ai testat cu o altă pereche (în alt grup, fără bruiaj)  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** altă pereche încearcă fără să știe codul și mesajele ajung.

---

## Bonus (după Complet)
- [ ] Adaugă un **cod secret**: mesajele încep cu o parolă (`PAROLA:E:2`)  
- [ ] Trimite un **text scurt** (de exemplu `C:Salut`) cu `split(":", 1)`  
- [ ] Un **semnal de ajutor**: la scuturare trimite `S:1`; receptorul face o alarmă  
- [ ] Număr **câte mesaje** ai primit

## Recapitulare rapidă
1. Un **protocol** = acord despre ce înseamnă mesajele.  
2. Mesaj = `tip:valoare`.  
3. `split(":")` desface textul; `int()` face numărul.  
4. `try / except` prinde erorile și programul continuă.  
5. `radio.receive()` poate da `None`.  
6. Confirmarea `OK` arată că mesajul a ajuns.

## Schema pe scurt *(pe foaie)*

`tip:valoare` · `split` · `int` + `try/except` · `receive() is not None` · `OK` fără răspuns

**Quiz scurt:**  
- Ce dă `"E:3".split(":")`?  
- Ce se întâmplă la `int("abc")`?  
- Ce face `is not None`?  
- Ce înseamnă `OK:2`?

## Temă
Inventează **un protocol** cu 3 tipuri de mesaje pentru o altă idee (de exemplu o alarmă de clasă sau un joc cu răspunsuri). Scrie un tabel: mesaj → ce înseamnă.

---

## Răspunsuri pentru profesor

**Exercițiul B:** `"L:140".split(":")` dă `["L", "140"]`, iar `len(...)` este `2`. `parseaza("E:3")` dă `("E", 3)`. `parseaza("E:3:4")` dă `(None, None)` (3 părți). `parseaza("salut")` dă `(None, None)` (o singură parte).

**Exercițiul C:** exemplu pentru emițător: `radio.send("L:" + str(display.read_light_level()))`. La receptor, pe `tip == "L"`: nivelul `val // 51` rânduri aprinse (cu o buclă ca în L1).

**Exercițiul D:** 1) lipsesc `from microbit import *` și `radio.config(group=…)`. 2) `m` poate fi `None` (nu a venit nimic): lipsește `if m is not None:`. 3) lipsește `sleep` în buclă. 4) `EMOJI` nu e definit. 5) `EMOJI[parti[1]]` — `parti[1]` e text; trebuie `int(...)`. 6) mesajul poate fi stricat: `len(parti)` nu e verificat și `int` nu e în `try / except`. 7) răspunsul `OK` se trimite chiar și când nu a venit `E`.

**Exercițiul E:** 1) Un acord despre cum arată mesajele și ce înseamnă. 2) Dacă mesajul nu are exact două părți, `parti[1]` ar da eroare sau am citi ceva greșit. 3) Altfel plăcile și-ar răspunde la nesfârșit, una alteia.
