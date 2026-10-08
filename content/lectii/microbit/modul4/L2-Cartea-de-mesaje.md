# Lecția 2 — Cartea de mesaje
**Modulul 2 · Proiecte Python**  
**Code Maker Club · micro:bit Python Pro**

> Azi înveți **listele**: un „sertar cu multe locuri” în care ții mai multe lucruri deodată. Faci o **carte de mesaje** pe placă, în care dai pagina înainte și înapoi.  
> Proiect: **„Cartea de mesaje”** · `Prenume_Nume_MP2_L02`

---

## Obiectiv
La finalul orei știi să creezi o **listă**, să citești elemente după **index**, să afli lungimea cu `len()`, să adaugi cu `append()` și să parcurgi lista cu `for`.  
**Minim:** carte cu 5 mesaje; **A** = pagina următoare, **B** = pagina anterioară.  
**Complet:** Minim + **scuturare** = mesaj la întâmplare + **A+B** adaugă temperatura în carte.

## De ce contează
Până acum ai ținut **o valoare** într-o variabilă. O listă ține **mai multe**: nume, scoruri, mesaje, măsurători. Aproape orice aplicație folosește liste: jocuri, muzică, mesaje.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1: meniul cu `%` |
| 10–35 | Liste: index, `len`, `append`, `for` |
| 35–70 | Cartea cu A și B — **Minim** |
| 70–105 | Scuturare și temperatura în carte — **Complet** |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `[ ]` · index · `len()` · `append()` · `pop()` · `for x in lista:` · `random.choice()` · `%`

---

## Pas cu pas

### 1) Lista — un șir de lucruri
O listă se scrie între **paranteze drepte**, cu elementele separate prin virgulă. Fiecare element are un **număr de loc**, numit **index**. **Numărătoarea începe de la 0!**

| Index | 0 | 1 | 2 |
|-------|---|---|---|
| Element | `"Ana"` | `"Dan"` | `"Mia"` |

### Exemplul 1 — Prima listă
```python
from microbit import *

prieteni = ["Ana", "Dan", "Mia"]

display.scroll(prieteni[0])
display.scroll(prieteni[2])
```
**Ce vezi pe placă:** `Ana`, apoi `Mia`.

### Exemplul 2 — Lungimea și ultimul element
```python
from microbit import *

prieteni = ["Ana", "Dan", "Mia"]

display.scroll(str(len(prieteni)))     # 3
display.scroll(prieteni[-1])           # ultimul: Mia
```
`len(lista)` dă **numărul de elemente**. Indexul `-1` e **ultimul** element.

> Cu 3 elemente, indexurile sunt `0, 1, 2`. Dacă scrii `prieteni[3]`, apare eroarea `IndexError` („nu există locul 3”).

### Exemplul 3 — Parcurgem lista cu `for`
```python
from microbit import *

culori = ["rosu", "galben", "verde"]

for c in culori:
    display.scroll(c)
```
La fiecare tură, `c` ia pe rând câte un element.

### Exemplul 4 — Schimbăm o listă
```python
from microbit import *

lista = ["unu", "doi"]
lista.append("trei")          # adauga la sfarsit
lista[0] = "UNU"              # schimba elementul de pe locul 0

for x in lista:
    display.scroll(x)
```
Se afișează `UNU`, `doi`, `trei`.

### Exemplul 5 — Scoatem elemente
```python
from microbit import *

lista = ["a", "b", "c", "d"]
lista.pop(0)                  # scoate primul element ("a")
ultimul = lista.pop()         # scoate ultimul ("d") si il da inapoi

display.scroll(str(len(lista)))   # raman 2
display.scroll(ultimul)           # d
```

### Exemplul 6 — Este în listă?
```python
from microbit import *

animale = ["pisica", "caine", "iepure"]

if "caine" in animale:
    display.show(Image.YES)
else:
    display.show(Image.NO)
```

### Exemplul 7 — Meniul în cerc, din nou
Reluăm `%` din L1. Cu liste, lungimea vine singură din `len()`:
```python
from microbit import *

mesaje = ["Salut!", "Bravo", "Curaj!"]
i = 0

display.scroll(mesaje[i])

while True:
    if button_a.was_pressed():
        i = (i + 1) % len(mesaje)
        display.scroll(mesaje[i])
    sleep(100)
```
Dacă adaugi un mesaj în listă, **nu mai schimbi nimic altceva**.

### Exemplul 8 — Înapoi: `%` și numerele negative
În Python, `(-1) % 5` este `4`, deci putem merge înapoi în cerc:
```python
from microbit import *

mesaje = ["Salut!", "Bravo", "Curaj!"]
i = 0

while True:
    if button_a.was_pressed():
        i = (i + 1) % len(mesaje)
        display.scroll(mesaje[i])
    if button_b.was_pressed():
        i = (i - 1) % len(mesaje)
        display.scroll(mesaje[i])
    sleep(100)
```
De la mesajul `0`, apăsând **B** ajungi la ultimul (`2`).

### Exemplul 9 — Cartea Minim
```python
from microbit import *

mesaje = ["Salut!", "Esti geniu", "Bravo", "Zambeste", "Curaj!"]
i = 0

display.scroll(mesaje[i])

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a:
        i = (i + 1) % len(mesaje)
        display.scroll(mesaje[i])
    elif b:
        i = (i - 1) % len(mesaje)
        display.scroll(mesaje[i])
    sleep(100)
```
Fără diacritice în mesaje, ca placa să le poată afișa.

### Exemplul 10 — Cartea Complet
```python
from microbit import *
import random

MAXIM = 10
mesaje = ["Salut!", "Esti geniu", "Bravo", "Zambeste", "Curaj!"]
i = 0

display.scroll(mesaje[i])

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()
    scuturat = accelerometer.was_gesture("shake")

    if a and b:
        mesaje.append("T=" + str(temperature()) + "C")
        if len(mesaje) > MAXIM:
            mesaje.pop(0)
        i = len(mesaje) - 1
        display.scroll(mesaje[i])
    elif a:
        i = (i + 1) % len(mesaje)
        display.scroll(mesaje[i])
    elif b:
        i = (i - 1) % len(mesaje)
        display.scroll(mesaje[i])
    elif scuturat:
        i = random.randint(0, len(mesaje) - 1)
        display.scroll(mesaje[i])
    sleep(100)
```
- **A+B** adaugă temperatura **la sfârșit**; dacă lista are mai mult de `MAXIM` elemente, scoate cel mai vechi (`pop(0)`).  
- Scuturarea alege un index la întâmplare, de la `0` până la `len(mesaje) - 1`.  
- Placa are **memorie mică**, de aceea limităm lista.

---

## Greșeli frecvente
1. **„IndexError: list index out of range”** — ai cerut un loc care nu există. Ultimul index e `len(lista) - 1`.  
2. **„Prima poziție e 1”** — în Python prima poziție e `0`.  
3. **„Cartea sare la întâmplare”** — ai citit butoanele de două ori. Citește-le o dată pe tură.  
4. **„Nu pot afișa lista”** — `display.scroll(lista)` nu merge; afișează **un element** sau folosește `for`.  
5. **„Temperatura nu apare”** — `display.scroll` vrea text: `"T=" + str(temperature())`.  
6. **„Programul se oprește cu MemoryError”** — lista a crescut prea mult; limitează cu `pop(0)`.

---

## De făcut azi — „Cartea de mesaje”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 5 mesaje · A înainte · B înapoi · se întoarce în cerc |
| **Complet** | Minim + scuturare = mesaj la întâmplare + A+B adaugă temperatura (maxim 10 mesaje) |

### Exercițiul A — „Cartea” (obligatoriu)
Scrie cartea cu **5 mesaje ale tale** (fără diacritice). Fă-o să arate **frumos**: poți afișa o imagine înainte de fiecare mesaj.

### Exercițiul B — Ce dă?
Fie `l = ["a", "b", "c", "d"]`. Fără să rulezi: `l[1]`, `l[-1]`, `len(l)`, `l[0] + l[3]`, `"c" in l`. Ce se întâmplă cu `l[4]`?

### Exercițiul C — Funcție pentru pagina următoare
Scrie funcția `urmatorul(i, n)` care primește indexul `i` și numărul de mesaje `n` și **returnează** indexul următor (în cerc). Apoi folosește-o în carte.

### Exercițiul D — Găsește greșelile
```text
mesaje = ["Salut", "Bravo", "Curaj"]
i = 1

while True:
    if button_a.was_pressed():
        i = i + 1
        display.scroll(mesaje[i])
    if button_b.was_pressed():
        mesaje.append["Super"]
    display.scroll(mesaje)
```

### Exercițiul E — Explică
1. De ce prima poziție dintr-o listă este `0`?  
2. Ce face `% len(mesaje)`?  
3. Ce diferență e între `pop()` și `pop(0)`?

**Gata când:**
- [ ] Cartea merge înainte și înapoi, în cerc  
- [ ] Nu apare `IndexError`  
- [ ] Mesajele sunt scrise corect, fără diacritice  
- [ ] Ai testat cu un coleg  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg parcurge toată cartea fără ajutor.

---

## Bonus (după Complet)
- [ ] Creează **trei liste** (de exemplu `glume`, `ghicitori`, `sfaturi`) și schimbă lista cu o altă combinație de butoane  
- [ ] Afișează înainte de fiecare mesaj **numărul paginii** (de exemplu `2/5`)  
- [ ] Adaugă o pagină-surpriză: dacă `i == 0`, apare `Image.HEART`

## Recapitulare rapidă
1. O listă ține mai multe elemente: `[ ]`.  
2. Indexul începe de la **0**; ultimul e `len(lista) - 1` sau `-1`.  
3. `append` adaugă la sfârșit, `pop` scoate.  
4. `for x in lista:` parcurge toate elementele.  
5. `(i + 1) % len(lista)` ține indexul în cerc.

## Schema pe scurt *(pe foaie)*

listă `[ ]` · index de la 0 · `len` · `append` / `pop` · `for` · `% len(lista)`

**Quiz scurt:**  
- Ce index are al treilea element?  
- Ce dă `len(["x", "y"])`?  
- Cum treci de la ultimul mesaj la primul?  
- Ce face `append`?

## Temă
Fă pe foaie o listă cu **6 lucruri** din rucsacul tău. Scrie indexul fiecărui lucru și răspunde: ce dă `rucsac[-1]`?

---

## Răspunsuri pentru profesor

**Exercițiul B:** `l[1] = "b"`, `l[-1] = "d"`, `len(l) = 4`, `l[0] + l[3] = "ad"`, `"c" in l` este `True`. `l[4]` dă `IndexError` (indexurile sunt 0–3).

**Exercițiul C:**
```python
def urmatorul(i, n):
    return (i + 1) % n
```
În carte: `i = urmatorul(i, len(mesaje))`.

**Exercițiul D:** 1) `i = i + 1` poate ieși din listă (`IndexError`): trebuie `(i + 1) % len(mesaje)`. 2) `mesaje.append["Super"]` trebuie paranteze rotunde: `mesaje.append("Super")`. 3) `display.scroll(mesaje)` nu poate afișa o listă; afișezi un element. 4) lipsește `sleep` în buclă. 5) lipsește `from microbit import *`.

**Exercițiul E:** 1) Indexul arată **câte locuri sunt înainte** de element; primul are 0 înaintea lui. 2) Ține indexul între `0` și ultimul. 3) `pop()` scoate **ultimul**, `pop(0)` scoate **primul**.
