# Lecția 8 — Recordul păstrat
**Modulul 2 · Proiecte Python**  
**Code Maker Club · micro:bit Python Pro**

> Variabilele **uită** totul când oprești placa. Azi înveți să scrii într-un **fișier** pe placă, ca recordul tău să **rămână** și după ce o oprești și o pornești din nou. Faci un joc de **scuturat**: câte scuturări reușești în 10 secunde?  
> Proiect: **„Recordul păstrat”** · `Prenume_Nume_MP2_L08`

---

## Obiectiv
La finalul orei știi să **scrii** și să **citești** un fișier cu `open`, să tratezi lipsa fișierului cu `try / except` și să păstrezi un **record**.  
**Minim:** jocul de scuturat (10 secunde) care **salvează** recordul în fișier și îl arată la **B**.  
**Complet:** Minim + **numărătoare inversă** `3, 2, 1` + **A+B** șterge recordul (ținut apăsat).

## De ce contează
Aplicațiile adevărate **își amintesc**: scorul cel mai bun, setările, ultimul nivel. Ele salvează în **fișiere**. Azi faci același lucru, în mic.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7: `try / except` |
| 10–40 | Fișiere: `open`, `write`, `read`, lipsa fișierului |
| 40–70 | Jocul de scuturat și recordul — **Minim** |
| 70–105 | Numărătoare și resetare — **Complet** |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `open(nume, "w")` · `open(nume)` · `f.write()` · `f.read()` · `with` · `try / except OSError` · `running_time()`

> **Atenție:** fișierele sunt păstrate în memoria plăcii. **Nu scrie în fișier la fiecare tură** de buclă (memoria se uzează). Scriem **doar când se schimbă recordul**.  
> Dacă încarci din nou programul pe placă, **fișierele pot fi șterse**. Recordul se păstrează cât timp o oprești și o pornești, **fără** să o reprogramezi.

---

## Pas cu pas

### 1) Un fișier = un caiet
- `open("nume.txt", "w")` — deschide caietul pentru **scris** (șterge ce era înainte).  
- `open("nume.txt")` — deschide pentru **citit**.  
- `with … as f:` — deschide fișierul și îl **închide singur** la final.

### Exemplul 1 — Scriem un fișier
```python
from microbit import *

with open("salut.txt", "w") as f:
    f.write("Salut, lume!")

display.show(Image.YES)
```
Placa are acum un fișier `salut.txt`. Poți să-l vezi în editor, la fila **Files**, cu placa conectată.

### Exemplul 2 — Citim un fișier
```python
from microbit import *

with open("salut.txt", "w") as f:
    f.write("Salut, lume!")

with open("salut.txt") as f:
    text = f.read()

display.scroll(text)
```
`f.read()` dă **tot textul** din fișier.

### Exemplul 3 — Fișierul nu există
Dacă încerci să citești un fișier care **nu există**, apare eroarea `OSError`. O prindem:
```python
from microbit import *

try:
    with open("nu_exista.txt") as f:
        text = f.read()
    display.scroll(text)
except OSError:
    display.scroll("Nu am gasit fisierul")
```
Programul **nu se oprește**, ci ne spune frumos că fișierul lipsește.

### Exemplul 4 — Salvăm un număr
Fișierele păstrează **text**. Numărul îl transformăm cu `str()` la scriere și cu `int()` la citire:
```python
from microbit import *

with open("numar.txt", "w") as f:
    f.write(str(42))

with open("numar.txt") as f:
    n = int(f.read())

display.scroll(str(n + 1))
```
Se afișează `43`.

### Exemplul 5 — Funcții pentru record
Punem citirea și scrierea în **funcții**, ca să le folosim ușor:
```python
from microbit import *

FISIER = "record.txt"

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

salveaza_record(7)
display.scroll(str(citeste_record()))
```
Se afișează `7`. Dacă fișierul lipsește sau are conținut ciudat, recordul e `0`.

### Exemplul 6 — Câte porniri?
Un mic truc: placa numără **de câte ori a pornit** (tot cu fișier):
```python
from microbit import *

def citeste():
    try:
        with open("porniri.txt") as f:
            return int(f.read())
    except OSError:
        return 0
    except ValueError:
        return 0

porniri = citeste() + 1

with open("porniri.txt", "w") as f:
    f.write(str(porniri))

display.scroll("Pornire " + str(porniri))
```
Apasă butonul **RESET** (în spate): numărul crește. **Nu reîncărca** programul, altfel pornești de la început.

### Exemplul 7 — O rundă de joc
Numărăm scuturările în **10 secunde**. Folosim `running_time()` ca să măsurăm timpul fără să oprim programul:
```python
from microbit import *

DURATA = 10000        # milisecunde

def runda():
    scuturari = 0
    start = running_time()
    while running_time() - start < DURATA:
        if accelerometer.was_gesture("shake"):
            scuturari += 1
            display.show(str(scuturari % 10))
        sleep(20)
    return scuturari

display.show(Image.ARROW_S)
sleep(1000)
scor = runda()
display.scroll(str(scor))
```
Pe ecran se arată **ultima cifră** a scorului (de exemplu `3` pentru 13); la final se derulează scorul întreg.

### Exemplul 8 — Numărătoarea inversă
```python
from microbit import *

def numaratoare():
    for i in range(3, 0, -1):
        display.show(str(i))
        sleep(800)
    display.show(Image.HAPPY)
    sleep(300)

numaratoare()
```

### Exemplul 9 — Jocul Minim
```python
from microbit import *

FISIER = "record.txt"
DURATA = 10000

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

def runda():
    scuturari = 0
    start = running_time()
    while running_time() - start < DURATA:
        if accelerometer.was_gesture("shake"):
            scuturari += 1
            display.show(str(scuturari % 10))
        sleep(20)
    return scuturari

record = citeste_record()
display.show(Image.HAPPY)

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        scor = runda()
        if scor > record:
            record = scor
            salveaza_record(record)
            display.show(Image.HEART)
            sleep(1000)
        display.scroll(str(scor))
        display.show(Image.HAPPY)
    elif b:
        display.scroll("Record " + str(record))
        display.show(Image.HAPPY)
    sleep(100)
```
- **A** pornește o rundă de 10 secunde.  
- Dacă scorul **bate recordul**, îl salvăm în fișier (și apare o inimă).  
- **B** arată recordul.  
- La pornire, recordul se **citește din fișier**.

### Exemplul 10 — Jocul Complet
```python
from microbit import *

FISIER = "record.txt"
DURATA = 10000

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

def numaratoare():
    for i in range(3, 0, -1):
        display.show(str(i))
        sleep(800)
    display.show(Image.ARROW_N)
    sleep(200)

def runda():
    scuturari = 0
    start = running_time()
    while running_time() - start < DURATA:
        if accelerometer.was_gesture("shake"):
            scuturari += 1
            display.show(str(scuturari % 10))
        sleep(20)
    return scuturari

record = citeste_record()
display.show(Image.HAPPY)

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a and b:
        record = 0
        salveaza_record(0)
        display.show(Image.NO)
        sleep(1000)
        display.show(Image.HAPPY)
    elif a:
        numaratoare()
        scor = runda()
        display.scroll(str(scor))
        if scor > record:
            record = scor
            salveaza_record(record)
            display.show(Image.HEART)
            sleep(1200)
            display.scroll("Record!")
        display.show(Image.HAPPY)
    elif b:
        display.scroll("Record " + str(record))
        display.show(Image.HAPPY)
    sleep(100)
```
- **A+B** pune recordul pe `0` și îl salvează (resetare).  
- Verificăm `a and b` **primul**, ca să nu fie „mâncat” de `a` sau `b`.

---

## Greșeli frecvente
1. **„Recordul dispare”** — ai reîncărcat programul pe placă. Pornește placa fără reîncărcare.  
2. **„OSError la citire”** — fișierul nu există încă. Folosește `try / except OSError`.  
3. **„TypeError la `write`”** — `f.write` vrea **text**: `f.write(str(n))`.  
4. **„ValueError la `int`”** — fișierul e gol sau conține text. Prinde `ValueError`.  
5. **„Scrii la fiecare tură”** — salvează doar când recordul se schimbă.  
6. **„Nu mă văd pe ecran”** — `display.show(scor)` nu merge pentru număr; folosește `str(scor)`.

---

## De făcut azi — „Recordul păstrat”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Joc de 10 secunde · record salvat în fișier · B îl arată |
| **Complet** | Minim + numărătoare 3-2-1 + A+B resetează recordul |

### Exercițiul A — „Recordul” (obligatoriu)
Scrie jocul. Joacă o rundă, apoi **oprește și pornește** placa (RESET) și apasă **B**: recordul trebuie să apară.

### Exercițiul B — Ce se întâmplă?
Ce află programul dacă `record.txt` conține textul `abc`? Dar dacă fișierul **nu există**? Ce valoare întoarce `citeste_record()` în ambele cazuri?

### Exercițiul C — Joc cu alt scor
Schimbă jocul astfel încât să numere **apăsările pe A** în 10 secunde (în loc de scuturări). Care e noul record?

### Exercițiul D — Găsește greșelile
```text
def salveaza(n):
    with open("record.txt", "r") as f:
        f.write(n)

record = open("record.txt").read()
if record > 5:
    display.scroll(record)
```

### Exercițiul E — Explică
1. De ce transformăm numărul cu `str()` când scriem?  
2. De ce salvăm doar când recordul se schimbă?  
3. Ce face `with open(...) as f:`?

**Gata când:**
- [ ] Jocul numără scuturările în 10 secunde  
- [ ] Recordul se salvează și se citește la pornire  
- [ ] Lipsa fișierului nu oprește programul  
- [ ] Ai testat cu RESET  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** recordul apare corect după ce oprești și pornești placa.

---

## Bonus (după Complet)
- [ ] Ține **primele 3 recorduri** într-o listă și salvează-le (separate prin `,`)  
- [ ] Afișează diferența față de record (`scor - record`)  
- [ ] Adaugă un **sunet** (V2) la record nou  
- [ ] Salvează **numele** jucătorului (litere mari, fără diacritice)

## Recapitulare rapidă
1. Fișierele păstrează date și după oprirea plăcii.  
2. `open(nume, "w")` scrie, `open(nume)` citește.  
3. Fișierul păstrează **text**: `str()` și `int()`.  
4. Fișierul lipsă → `OSError` → `try / except`.  
5. Scriem doar când e nevoie.

## Schema pe scurt *(pe foaie)*

`with open(…, "w")` scrie · `open(…)` citește · `str` / `int` · `try / except OSError` · scrie doar la record nou

**Quiz scurt:**  
- Ce rămâne după RESET: variabilele sau fișierele?  
- Ce eroare apare când lipsește fișierul?  
- De ce nu scriem în fișier la fiecare tură?  
- Ce face `f.read()`?

## Temă
Gândește-te la **alte 3 lucruri** pe care un joc ar trebui să le **țină minte** după oprire (de exemplu nivelul, scorul, numele). Scrie cum le-ai pune într-un fișier.

---

## Răspunsuri pentru profesor

**Exercițiul B:** În ambele cazuri `citeste_record()` întoarce `0`. Dacă fișierul conține `abc`, `int("abc")` dă `ValueError` (prins); dacă fișierul lipsește, `open` dă `OSError` (prins).

**Exercițiul C:** în `runda()` înlocuiești condiția `accelerometer.was_gesture("shake")` cu `button_a.was_pressed()`. Atenție: `runda()` este apelată din `if a:`, deci apăsarea de pornire trebuie ignorată: se poate adăuga `button_a.was_pressed()` la început, pentru a „goli” memoria butonului.

**Exercițiul D:** 1) `"r"` e pentru citit; pentru scris trebuie `"w"`. 2) `f.write(n)` vrea text: `f.write(str(n))`. 3) `open("record.txt").read()` dă **text**, iar `record > 5` compară text cu număr (eroare): trebuie `int(...)`. 4) dacă fișierul lipsește apare `OSError` (lipsește `try / except`). 5) fișierul din a doua parte nu e închis cu `with`. 6) lipsește `from microbit import *`.

**Exercițiul E:** 1) Fișierul păstrează doar text. 2) Memoria plăcii se uzează la scriere repetată și scrierea e lentă. 3) Deschide fișierul și îl închide automat la final.
