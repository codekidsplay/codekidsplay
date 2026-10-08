# Lecția 1 — Panoul de misiuni
**Modulul 2 · Proiecte Python**  
**Code Maker Club · micro:bit Python Pro**

> Începem Modulul 2 cu o provocare: **un program mai mare**, care are un **meniu** și mai multe **misiuni**. Alegi cu **A** misiunea, o pornești cu **B**.  
> Proiect: **„Panoul de misiuni”** · `Prenume_Nume_MP2_L01`

---

## Obiectiv
La finalul orei știi să **organizezi** un program în părți (constante, funcții, buclă principală) și să faci un **meniu**.  
**Minim:** panou cu **3 misiuni** (lumină, temperatură, inimă); **A** alege, **B** pornește.  
**Complet:** Minim + o **a 4-a misiune** (nivela) + **contor** de misiuni făcute, afișat la **A+B**.

## De ce contează
Programele mici încap pe un ecran. Cele mari au nevoie de **ordine**. Dacă fiecare misiune e o funcție, poți adăuga una nouă fără să strici restul. Așa lucrează programatorii adevărați.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ce am învățat în Modulul 1? Misiunea Modulului 2 |
| 15–30 | Cum organizăm un program mare; operatorul `%` |
| 30–65 | Misiunile ca funcții; meniul — **Minim** |
| 65–100 | Misiunea 4 și contorul — **Complet** |
| 100–120 | Recapitulare, quiz, temă |

**Unelte azi:** constante · funcții · `global` · `%` (restul împărțirii) · `for` · `display.show(str(n))`

---

## Pas cu pas

### 1) Un program cu ordine
Folosim mereu aceeași ordine, de sus în jos:
```text
1. from microbit import *     (importuri)
2. CONSTANTE = ...            (valori care nu se schimbă)
3. variabile = ...            (starea programului)
4. def functii():             (uneltele)
5. pornire (afisari de inceput)
6. while True:                (bucla principala)
```
Cine citește programul știe unde să caute fiecare lucru.

### Exemplul 1 — Constante
O **constantă** e o valoare care nu se schimbă. O scriem cu **litere mari**:
```python
from microbit import *

NR_MISIUNI = 3
PRAG_INTUNERIC = 20

display.scroll(str(NR_MISIUNI))
```
Dacă mai târziu vrei 4 misiuni, schimbi **un singur loc**.

### Exemplul 2 — Operatorul `%`
`a % b` dă **restul** împărțirii lui `a` la `b`.
```python
from microbit import *

display.scroll(str(7 % 3))    # 7 = 2*3 + 1  ->  1
display.scroll(str(6 % 3))    # 6 = 2*3 + 0  ->  0
```
**Ce vezi pe placă:** `1`, apoi `0`.

### Exemplul 3 — Meniul care se învârte
Dacă ai **3** misiuni numerotate `0, 1, 2`, după `2` vrei să revii la `0`. Cu `%` merge ușor:
```python
from microbit import *

NR_MISIUNI = 3
mod = 0

while True:
    display.show(str(mod + 1))
    if button_a.was_pressed():
        mod = (mod + 1) % NR_MISIUNI
    sleep(100)
```
Apeși **A**: `1 → 2 → 3 → 1 → 2 …`. Pe ecran numerele sunt `1, 2, 3` (am adăugat `+ 1` doar la afișare).

### Exemplul 4 — Misiunea „Lumină”
O funcție care arată un **grafic de lumină**: cu cât e mai multă lumină, cu atât mai multe rânduri aprinse.
```python
from microbit import *

def misiune_lumina():
    for i in range(30):
        nivel = display.read_light_level() // 51     # 0 ... 5
        img = Image(5, 5)
        for y in range(nivel):
            for x in range(5):
                img.set_pixel(x, 4 - y, 9)
        display.show(img)
        sleep(100)

misiune_lumina()
display.clear()
```
Durează 3 secunde (30 × 100 ms). `//` e împărțirea fără zecimale.

### Exemplul 5 — Misiunea „Temperatură”
```python
from microbit import *

def misiune_temperatura():
    display.scroll(str(temperature()) + "C")

misiune_temperatura()
```

### Exemplul 6 — Misiunea „Inimă”
```python
from microbit import *

def misiune_inima():
    for i in range(3):
        display.show(Image.HEART)
        sleep(400)
        display.show(Image.HEART_SMALL)
        sleep(400)

misiune_inima()
display.clear()
```

### Exemplul 7 — Panoul Minim
Punem totul împreună. Funcția `porneste(m)` alege misiunea după număr:
```python
from microbit import *

NR_MISIUNI = 3
mod = 0

def misiune_lumina():
    for i in range(30):
        nivel = display.read_light_level() // 51
        img = Image(5, 5)
        for y in range(nivel):
            for x in range(5):
                img.set_pixel(x, 4 - y, 9)
        display.show(img)
        sleep(100)

def misiune_temperatura():
    display.scroll(str(temperature()) + "C")

def misiune_inima():
    for i in range(3):
        display.show(Image.HEART)
        sleep(400)
        display.show(Image.HEART_SMALL)
        sleep(400)

def porneste(m):
    if m == 0:
        misiune_lumina()
    elif m == 1:
        misiune_temperatura()
    elif m == 2:
        misiune_inima()

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        mod = (mod + 1) % NR_MISIUNI
    elif b:
        porneste(mod)

    display.show(str(mod + 1))
    sleep(100)
```
**A** schimbă misiunea (1, 2, 3), **B** o pornește, iar după ea panoul arată din nou numărul.

### Exemplul 8 — Misiunea „Nivela”
A 4-a misiune: placa e **dreaptă** dacă nu e înclinată nici pe x, nici pe y.
```python
from microbit import *

def misiune_nivela():
    for i in range(30):
        x = accelerometer.get_x()
        y = accelerometer.get_y()
        if abs(x) < 150 and abs(y) < 150:
            display.show(Image.HAPPY)
        else:
            display.show(Image.SAD)
        sleep(100)

misiune_nivela()
display.clear()
```
`abs()` scoate semnul minus: `abs(-100)` este `100`.

### Exemplul 9 — Contorul de misiuni
Vrem să numărăm câte misiuni ai făcut. Funcția schimbă o variabilă de afară, deci are nevoie de `global`:
```python
from microbit import *

facute = 0

def misiune_inima():
    for i in range(3):
        display.show(Image.HEART)
        sleep(300)
        display.show(Image.HEART_SMALL)
        sleep(300)

def ruleaza(f):
    global facute
    f()
    facute += 1

ruleaza(misiune_inima)
ruleaza(misiune_inima)
display.scroll(str(facute))
```
**Ce vezi pe placă:** două serii de bătăi de inimă, apoi `2`.

> Observă `ruleaza(misiune_inima)` — **fără paranteze** după `misiune_inima`. Dăm funcția ca pe o „unealtă” și `ruleaza` o apelează cu `f()`. Pentru moment, e suficient să știi că merge.

### Exemplul 10 — Panoul Complet
```python
from microbit import *

NR_MISIUNI = 4
mod = 0
facute = 0

def misiune_lumina():
    for i in range(30):
        nivel = display.read_light_level() // 51
        img = Image(5, 5)
        for y in range(nivel):
            for x in range(5):
                img.set_pixel(x, 4 - y, 9)
        display.show(img)
        sleep(100)

def misiune_temperatura():
    display.scroll(str(temperature()) + "C")

def misiune_inima():
    for i in range(3):
        display.show(Image.HEART)
        sleep(400)
        display.show(Image.HEART_SMALL)
        sleep(400)

def misiune_nivela():
    for i in range(30):
        x = accelerometer.get_x()
        y = accelerometer.get_y()
        if abs(x) < 150 and abs(y) < 150:
            display.show(Image.HAPPY)
        else:
            display.show(Image.SAD)
        sleep(100)

def porneste(m):
    global facute
    if m == 0:
        misiune_lumina()
    elif m == 1:
        misiune_temperatura()
    elif m == 2:
        misiune_inima()
    elif m == 3:
        misiune_nivela()
    facute += 1

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a and b:
        display.scroll(str(facute))
    elif a:
        mod = (mod + 1) % NR_MISIUNI
    elif b:
        porneste(mod)

    display.show(str(mod + 1))
    sleep(100)
```
- **A** = următoarea misiune, **B** = pornește, **A+B** = câte misiuni ai făcut.  
- Cazul `a and b` e **primul**, ca să nu fie „mâncat” de `a` sau `b`.

---

## Greșeli frecvente
1. **„Meniul trece de 3”** — ai uitat `% NR_MISIUNI`.  
2. **„Misiunea pornește de două ori”** — citești `button_b.was_pressed()` de mai multe ori. Citește **o dată** la începutul turei.  
3. **„Contorul rămâne 0”** — lipsește `global facute`.  
4. **„Nu afișează numărul”** — `display.show(mod)` nu merge; folosește `str(mod + 1)`.  
5. **„Misiunea nu pornește”** — verifică numerele din `porneste` (se începe de la `0`).  
6. **„Lumina nu arată nimic”** — în sală e prea întuneric? Pune placa lângă o lampă.

---

## De făcut azi — „Panoul de misiuni”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 3 misiuni · A alege · B pornește · meniul revine |
| **Complet** | Minim + misiunea Nivela + contor la A+B |

### Exercițiul A — „Panoul” (obligatoriu)
Scrie panoul pe placă. Poți schimba **ce arată** fiecare misiune (alte imagini, alt text).

### Exercițiul B — Ce dă?
Fără să rulezi: `10 % 4`, `9 % 3`, `5 % 7`, `abs(-3)`, `17 // 5`.

### Exercițiul C — Misiune nouă
Adaugă misiunea **„Salut”**: `display.scroll("Salut!")` urmat de `Image.HAPPY`. Ce schimbi în `NR_MISIUNI` și în `porneste`?

### Exercițiul D — Găsește greșelile
```text
NR_MISIUNI = 3
mod = 0
facute = 0

def porneste(m):
    facute += 1
    if m = 0:
        display.show(Image.HEART)

while True:
    if button_a.was_pressed():
        mod = (mod + 1) % NR_MISIUNI
    display.show(mod)
```

### Exercițiul E — Explică
1. De ce scriem constantele cu litere mari?  
2. Ce face `% NR_MISIUNI` în meniu?  
3. De ce `porneste` are `global facute`?

**Gata când:**
- [ ] Meniul trece prin toate misiunile și revine la prima  
- [ ] B pornește misiunea aleasă  
- [ ] Programul are funcții, nu un bloc lung  
- [ ] Ai testat cu un coleg  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg alege și pornește o misiune fără ajutor.

---

## Bonus (după Complet)
- [ ] Afișează **numele** misiunii (text scurt) când ții apăsat pe **A**  
- [ ] Adaugă o misiune cu **busola** sau cu **radio** (le vei învăța în lecțiile următoare)  
- [ ] La 5 misiuni făcute, arată `Image.HEART` și scrie „Pro!”

## Recapitulare rapidă
1. Un program mare are **ordine**: importuri, constante, variabile, funcții, buclă.  
2. **Constantele** se scriu cu litere mari.  
3. `a % b` = restul împărțirii; ține meniul în cerc.  
4. Fiecare misiune e o **funcție**.  
5. O funcție care schimbă o variabilă de afară are **`global`**.

## Schema pe scurt *(pe foaie)*

constante · funcții-misiuni · `mod` ține alegerea · `% NR` face cercul · A alege, B pornește

**Quiz scurt:**  
- Ce rest dă `11 % 4`?  
- Ce se întâmplă cu `mod` după a treia apăsare pe A (la 3 misiuni)?  
- De ce `a and b` e primul?  
- Cum adaugi o misiune nouă?

## Temă
Gândește-te la **alte 3 misiuni** pentru panou și scrie pe foaie ce ar face fiecare și ce ar folosi (buton, senzor, radio).

---

## Răspunsuri pentru profesor

**Exercițiul B:** `10 % 4 = 2`, `9 % 3 = 0`, `5 % 7 = 5`, `abs(-3) = 3`, `17 // 5 = 3`.

**Exercițiul C:** `NR_MISIUNI` devine `4` (sau `5` dacă există deja Nivela), iar în `porneste` se adaugă un `elif m == …:` cu funcția `misiune_salut()`:
```python
def misiune_salut():
    display.scroll("Salut!")
    display.show(Image.HAPPY)
    sleep(800)
```

**Exercițiul D:** 1) în `porneste` lipsește `global facute`. 2) `if m = 0` trebuie `if m == 0:`. 3) `display.show(mod)` trebuie `display.show(str(mod + 1))`. 4) în `while True` nu există `sleep`, iar `porneste` nu este apelat (lipsește verificarea lui B). 5) lipsește `from microbit import *` la început.

**Exercițiul E:** 1) Ca să se vadă că nu se schimbă și să fie ușor de găsit. 2) Întoarce `mod` la 0 după ultima misiune. 3) Ca să poată **schimba** variabila `facute` din afara funcției.
