# Lecția 1 — De la blocuri la Python
**Modulul 1 · Python pe micro:bit**  
**Code Maker Club · micro:bit Coder**

> Până acum ai construit programe din blocuri. Azi le **scrii cu litere**, în limbajul **Python**, pe aceeași placă micro:bit.  
> Proiect: **„Salutul meu în cod”** · `Prenume_Nume_MP1_L01`

---

## Obiectiv
La finalul orei scrii și rulezi primele programe Python pe placă și știi ce înseamnă `import`, `display`, `sleep` și `while True`.  
**Minim:** un program care derulează numele tău, apoi arată o inimă.  
**Complet:** Minim + inima **bate** în buclă, iar programul are **comentarii**.

## De ce contează
Blocurile sunt ca piesele de Lego: ușor de pus laolaltă. Python e ca limba pe care o vorbesc programatorii adevărați: o scrii cu tastatura și poți face lucruri mult mai mari. Același limbaj e folosit pentru site-uri, jocuri, roboți și inteligență artificială. Azi faci primul pas.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Blocuri versus text: aceeași placă, alt limbaj |
| 15–30 | Editorul Python și trimiterea unui program pe placă |
| 30–60 | Primele instrucțiuni: `display.scroll`, `display.show`, `sleep` |
| 60–85 | Bucla `while True` și indentarea |
| 85–105 | Erori: cum le citim și cum le reparăm |
| 105–120 | Proiectul, recapitulare, quiz, temă |

**Unelte azi:** [python.microbit.org](https://python.microbit.org) · placa micro:bit · cablu USB de date

---

## Pas cu pas

### 1) Blocuri și Python — aceleași idei
Fiecare bloc din MakeCode are un „frate” în Python:

| Blocuri (MakeCode) | Python (MicroPython) |
|--------------------|----------------------|
| `on start` | rândurile de la început, o singură dată |
| `forever` | `while True:` |
| `show icon [Heart]` | `display.show(Image.HEART)` |
| `show string "Salut"` | `display.scroll("Salut")` |
| `pause (ms) 1000` | `sleep(1000)` |
| `clear screen` | `display.clear()` |

### 2) Editorul
1. Deschide [python.microbit.org](https://python.microbit.org).  
2. Creezi un proiect nou și îl denumești `Prenume_Nume_MP1_L01`.  
3. Editorul are deja câteva rânduri. Le poți șterge: vom scrie noi totul.  
4. Cu placa legată prin USB apeși **Send to micro:bit** (conectezi o dată placa, când te întreabă). Dacă nu merge, apeși **Save** pentru a salva fișierul **.hex** și îl tragi pe unitatea **MICROBIT**, ca în Modulul 1 de la cursul cu blocuri.

> **Atenție:** MakeCode poate scrie și el Python, dar cu alte nume (`basic.show_icon`). În acest curs folosim **MicroPython** din [python.microbit.org](https://python.microbit.org). Nu amesteca cele două.

### 3) Exemplul 1 — Primul program
```python
from microbit import *

display.scroll("Salut!")
```
- `from microbit import *` înseamnă „adu toate uneltele plăcii”. Îl scrii **primul** în orice program.  
- `display.scroll("Salut!")` derulează textul pe LED-uri. Textul stă între **ghilimele**.

**Ce vezi pe placă:** literele S, a, l, u, t, ! trec de la dreapta la stânga, o singură dată.

### 4) Exemplul 2 — O imagine
```python
from microbit import *

display.show(Image.HEART)
```
`Image.HEART` e imaginea cu inimă. Numele imaginilor se scriu cu **litere mari**.

**Ce vezi pe placă:**
```text
. # . # .
# # # # #
# # # # #
. # # # .
. . # . .
```

### 5) Exemplul 3 — Pauza
```python
from microbit import *

display.show(Image.HAPPY)
sleep(1000)
display.show(Image.SAD)
```
`sleep(1000)` așteaptă **1000 de milisecunde** = 1 secundă. Mai întâi apare fața veselă, după o secundă cea tristă (rămâne pe ecran).

### 6) Exemplul 4 — Bucla `while True:`
```python
from microbit import *

while True:
    display.show(Image.HEART)
    sleep(300)
    display.show(Image.HEART_SMALL)
    sleep(300)
```
- `while True:` înseamnă „cât timp e adevărat” și deci **mereu**: bucla nu se oprește.  
- **Rândurile din buclă** încep cu **4 spații** (indentare). Așa știe Python ce e „înăuntru”.  
- După `while True` pui **două puncte `:`**.

**Ce vezi pe placă:** inima mare și inima mică se schimbă la nesfârșit, ca o inimă care bate.

### 7) Exemplul 5 — Comentarii
Un comentariu începe cu `#`. Python **îl ignoră**: e doar o notiță pentru oameni.

```python
# Programul meu: inima care bate
from microbit import *

while True:
    display.show(Image.HEART)   # inima mare
    sleep(300)                  # așteaptă 0,3 secunde
    display.show(Image.HEART_SMALL)   # inima mică
    sleep(300)
```

### 8) Exemplul 6 — Numere
```python
from microbit import *

display.scroll(str(2 + 3))
```
Placa știe să calculeze. `2 + 3` face `5`. Pentru a-l arăta pe LED-uri, îl transformăm în text cu `str()`.

**Ce vezi pe placă:** cifra `5`.

### 9) Exemplul 7 — Mai multe imagini una după alta
```python
from microbit import *

display.show(Image.ASLEEP)
sleep(800)
display.show(Image.SURPRISED)
sleep(800)
display.show(Image.HAPPY)
```
Mai întâi doarme, apoi se miră, apoi se bucură. Fiecare linie se execută **de sus în jos**.

### 10) Exemplul 8 — Erorile sunt normale
Dacă greșești o literă, placa **nu se supără**, ci îți spune ce e greșit: afișează o față tristă și **derulează un mesaj** cu numărul liniei.

| Greșeala | Ce zice Python (tipul erorii) |
|----------|-------------------------------|
| `display.scrol("A")` (litera lipsă) | `AttributeError` — nu există `scrol` |
| `display.scroll("A"` (lipsește `)`) | `SyntaxError` — scriere greșită |
| `Display.scroll("A")` (D mare) | `NameError` — nu știe `Display` |
| rânduri fără 4 spații în buclă | `IndentationError` |

Python face deosebire între **litere mari** și **mici**: `display` nu este `Display`.

---

## Greșeli frecvente
1. **„Nu găsește `display`”** — ai uitat `from microbit import *` sau ai scris `Display`.  
2. **„Textul nu derulează”** — ai pus textul fără ghilimele.  
3. **„Eroare la `while True`”** — ai uitat **două puncte** la final.  
4. **„IndentationError”** — rândurile din buclă nu au același număr de spații.  
5. **„Inima nu se vede bătând”** — lipsește `sleep(...)` între cele două imagini.  
6. **„Textul are semne ciudate”** — ai folosit diacritice (`ă`, `ș`); LED-urile nu le știu.

---

## De făcut azi — „Salutul meu în cod”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | `display.scroll` cu **numele tău** (fără diacritice), apoi `display.show(Image.HEART)` |
| **Complet** | Minim + inima **bate** într-un `while True:` + cel puțin **două comentarii** |

### Exercițiul A — „Salutul meu” (obligatoriu)
Scrie programul care:
1. derulează numele tău (de exemplu `"Ana"`);  
2. arată o inimă;  
3. (Complet) apoi inima bate la nesfârșit, cu comentarii.

Soluție posibilă (Complet):
```python
# Salutul meu in cod
from microbit import *

display.scroll("Ana")      # numele meu

while True:
    display.show(Image.HEART)
    sleep(400)
    display.show(Image.HEART_SMALL)    # inima bate
    sleep(400)
```

### Exercițiul B — Ce se întâmplă?
Citește programul și spune ce vezi pe placă, **fără să-l rulezi**. Apoi verifică.
```python
from microbit import *

display.show(Image.HAPPY)
sleep(500)
display.scroll("OK")
display.show(Image.SAD)
```

### Exercițiul C — Din blocuri în Python
Traduce programul din blocuri în Python:
```text
on start
    show string "Hello"
    pause (ms) 500
    show icon [Heart]
```

### Exercițiul D — Găsește greșelile
Programul de mai jos are **4 greșeli**. Rescrie-l corect.
```text
from microbit import *

while True
display.show(Image.Heart)
    sleep(300)
    Display.scroll("Hi")
```

### Exercițiul E — Explică
Răspunde pe foaie:
1. Ce face `from microbit import *`?  
2. Ce înseamnă `sleep(2000)`?  
3. De ce rândurile din `while True:` au spații în față?

**Gata când:**
- [ ] Programul rulează pe **placa adevărată**  
- [ ] Numele tău derulează clar  
- [ ] Ai folosit `display.show` și `sleep`  
- [ ] Ai cel puțin 2 comentarii  
- [ ] Ai notat răspunsurile la B–E  

**→ Minim când:** un coleg vede numele tău și apoi inima.

---

## Bonus (după Complet)
- [ ] Fă un program care arată **trei fețe** diferite, cu pauze  
- [ ] Derulează o propoziție de 5 cuvinte, fără diacritice  
- [ ] Caută în lista imaginilor `Image.DUCK` și `Image.HOUSE` și arată-le pe rând  
- [ ] Scrie același program în **blocuri** și în **Python** și compară-le

## Recapitulare rapidă
1. Python e text: **o instrucțiune pe rând**, de sus în jos.  
2. `from microbit import *` îl scrii mereu **primul**.  
3. `display.scroll("...")` derulează text; `display.show(Image.NUME)` arată o imagine.  
4. `sleep(1000)` = o secundă.  
5. `while True:` repetă mereu; rândurile din ea au **4 spații**.  
6. Litere mari ≠ litere mici.

## Schema pe scurt *(pe foaie)*

`from microbit import *` → `display.scroll(...)` / `display.show(...)` → `sleep(...)` → `while True:` (repetă)

**Quiz scurt:**  
- Ce înseamnă `1000` în `sleep(1000)`?  
- Cum scrii în Python blocul `forever`?  
- De ce nu scriem `Display.scroll`?  
- Ce arată placa dacă ai o eroare?

## Temă
Scrie acasă, pe foaie, un program Python care arată pe placă **pe rând, la un interval de o secundă**, trei imagini la alegere. Mâine îl introduci în editor și îl rulezi.

---

## Răspunsuri pentru profesor

**Exercițiul B:** apare fața veselă o jumătate de secundă, apoi derulează `OK`, apoi rămâne fața tristă.

**Exercițiul C:**
```python
from microbit import *

display.scroll("Hello")
sleep(500)
display.show(Image.HEART)
```
(Un program în blocuri cu `show string` face același lucru, deoarece `show string` derulează textul.)

**Exercițiul D:**
```python
from microbit import *

while True:
    display.show(Image.HEART)
    sleep(300)
    display.scroll("Hi")
```
Greșelile: lipsea `:` după `while True`; lipseau spațiile de la `display.show`; `Image.Heart` trebuie `Image.HEART`; `Display` trebuie `display`.

**Exercițiul E:** 1) aduce în program uneltele plăcii (display, butoane, senzori). 2) Așteaptă 2 secunde. 3) Spațiile arată ce rânduri aparțin buclei.
