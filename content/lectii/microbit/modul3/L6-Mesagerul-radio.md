# Lecția 6 — Mesagerul radio
**Modulul 1 · Python pe micro:bit**  
**Code Maker Club · micro:bit Coder**

> Azi plăcile **își scriu mesaje** prin radio, în Python. Facem un **mesager**: apeși un buton la tine și la colegul apare un semn.  
> Proiect: **„Mesagerul”** · `Prenume_Nume_MP1_L06`

---

## Obiectiv
La finalul orei folosești modulul `radio`: pornești radioul, alegi un grup, trimiți și primești mesaje.  
**Minim:** **A** trimite `"1"` (față veselă), **B** trimite `"2"` (față tristă); placa colegului arată imaginea potrivită.  
**Complet:** Minim + **A+B** trimite numele tău, iar orice alt mesaj text se derulează pe ecran.

## De ce contează
Radioul permite plăcilor să lucreze **în echipă**: o telecomandă și un robot, o stație meteo și un afișaj. Azi faci primul pas: plăcile își trimit mesaje scrise.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5: senzori, praguri |
| 10–25 | Joc cu bilețele: grup, trimițător, primitor |
| 25–50 | `import radio`, `radio.on()`, `radio.send()` |
| 50–70 | `radio.receive()` și bucla de ascultare |
| 70–100 | Mesagerul (**Minim** și **Complet**) |
| 100–112 | Puterea semnalului: `radio.receive_full()` |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** `import radio` · `radio.on()` · `radio.config(group=…)` · `radio.send(...)` · `radio.receive()` · `radio.receive_full()` · `if mesaj:` · lucrăm în **perechi**

---

## Pas cu pas

### 1) Jocul cu bilețelele
Clasa se împarte în grupuri (1, 2, 3 …). Un copil scrie un bilet și îl dă mai departe, dar **doar colegii din grupul lui** îl citesc. La radio, fiecare pereche are **un număr de grup**; placa ascultă doar mesajele din grupul ei.

### 2) Ce trebuie să știi
- `import radio` aduce unealta radio (nu vine odată cu `microbit`).  
- `radio.on()` **pornește** radioul. Fără el, apare o eroare.  
- `radio.config(group=7)` alege grupul (un număr de la `0` la `255`). **Amândouă plăcile**, același grup.  
- `radio.send("text")` trimite un mesaj. Mesajul trebuie să fie **text** (între ghilimele) și scurt, de cel mult **32 de caractere**.  
- `radio.receive()` ia un mesaj primit. Dacă nu a venit nimic, răspunde `None`.

### Exemplul 1 — Trimitem
```python
from microbit import *
import radio

radio.on()
radio.config(group=7)

while True:
    if button_a.was_pressed():
        radio.send("salut")
        display.show(Image.YES)
        sleep(300)
        display.clear()
    sleep(50)
```
De fiecare dată când apeși A, mesajul pleacă; bifa apare pentru o clipă.

### Exemplul 2 — Primim
```python
from microbit import *
import radio

radio.on()
radio.config(group=7)

while True:
    mesaj = radio.receive()
    if mesaj:
        display.scroll(mesaj)
    sleep(50)
```
- `mesaj` e `None` când nu a sosit nimic. În `if mesaj:`, `None` înseamnă „fals”, deci nu se întâmplă nimic.  
- Când vine un mesaj, `if mesaj:` devine adevărat și îl derulăm.

**Ce vezi pe placă:** la apăsarea lui A pe placa colegului, tu vezi derulând `salut`.

### Exemplul 3 — Același program pe ambele plăci
Fiecare placă poate trimite **și** primi.
```python
from microbit import *
import radio

radio.on()
radio.config(group=7)

while True:
    if button_a.was_pressed():
        radio.send("salut")
    mesaj = radio.receive()
    if mesaj:
        display.scroll(mesaj)
    sleep(50)
```
Descarci **același** program pe ambele plăci. Apeși A pe una și pe cealaltă derulează `salut`.

### Exemplul 4 — Coduri în loc de cuvinte
Trimitem coduri scurte, apoi **traducem** codul în imagini.
```python
from microbit import *
import radio

radio.on()
radio.config(group=7)

while True:
    if button_a.was_pressed():
        radio.send("1")
    if button_b.was_pressed():
        radio.send("2")

    mesaj = radio.receive()
    if mesaj == "1":
        display.show(Image.HAPPY)
    elif mesaj == "2":
        display.show(Image.SAD)
    sleep(50)
```
Codurile sunt scrise între **ghilimele** (`"1"`), chiar dacă sunt cifre, pentru că `radio.send` trimite doar text.

### Exemplul 5 — Un mesaj necunoscut
Ce facem dacă vine altceva decât `"1"` sau `"2"`? Folosim `else`.
```python
from microbit import *
import radio

radio.on()
radio.config(group=7)

while True:
    mesaj = radio.receive()
    if mesaj == "1":
        display.show(Image.HAPPY)
    elif mesaj == "2":
        display.show(Image.SAD)
    elif mesaj:
        display.scroll(mesaj)
    sleep(50)
```
`elif mesaj:` înseamnă „a venit **ceva**, dar nu `1` sau `2`”.

### Exemplul 6 — Alegem grupul cu o variabilă
```python
from microbit import *
import radio

GRUP = 7
radio.on()
radio.config(group=GRUP)
display.scroll(str(GRUP))
```
Fiecare pereche își pune propriul număr, iar placa îl arată la pornire.

### Exemplul 7 — Mai mulți colegi, mai multe grupuri
Doi colegi din **grupuri diferite** nu se aud. Încearcă: ține o placă pe grupul `7` și alta pe `8`. Apeși A: nu se întâmplă nimic. Radio **nu e secret**: cine e în același grup și în apropiere poate citi mesajele, deci nu trimitem date personale.

### Exemplul 8 — Cât de aproape e prietenul?
`radio.receive_full()` dă mai multe informații: mesajul (în **bytes**), **puterea semnalului** și momentul. Semnalul e un număr negativ: cu cât e mai aproape de `0`, cu atât expeditorul e mai aproape.
```python
from microbit import *
import radio

radio.on()
radio.config(group=7)

while True:
    primit = radio.receive_full()
    if primit:
        mesaj, semnal, ora = primit
        nivel = (semnal + 100) // 12          # transforma in 0..4 (aprox.)
        nivel = min(4, max(0, nivel))
        display.clear()
        for x in range(nivel + 1):
            display.set_pixel(x, 2, 9)
    sleep(50)
```
Pe una dintre plăci trimiți mesaje la fiecare 200 ms. Pe cealaltă vezi **bara de semnal** crescând când te apropii.

### Exemplul 9 — Putere de transmisie
`radio.config(power=…)` alege cât de departe ajunge semnalul: de la `0` (foarte slab) la `7` (cel mai puternic, 6 e implicit).
```python
from microbit import *
import radio

radio.on()
radio.config(group=7, power=2)
radio.send("slab")
display.show(Image.YES)
```
La **putere mică** plăcile trebuie să fie mai aproape.

### Exemplul 10 — Mesagerul
```python
from microbit import *
import radio

GRUP = 7                  # pune numarul perechii tale
NUME = "Ana"              # pune prenumele tau, fara diacritice

radio.on()
radio.config(group=GRUP)
display.scroll("G" + str(GRUP))

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a and b:
        radio.send(NUME)
        display.show(Image.HEART)
        sleep(300)
    elif a:
        radio.send("1")
        display.show(Image.YES)
        sleep(300)
    elif b:
        radio.send("2")
        display.show(Image.YES)
        sleep(300)

    mesaj = radio.receive()
    if mesaj == "1":
        display.show(Image.HAPPY)
    elif mesaj == "2":
        display.show(Image.SAD)
    elif mesaj:
        display.scroll(mesaj)
    sleep(50)
```
- **A** = „sunt bine” (`1`), **B** = „sunt trist” (`2`), **A+B** = îți trimit numele.  
- Bifa și inima arată că **mesajul a plecat**.  
- Orice alt mesaj text se derulează.

---

## Greșeli frecvente
1. **„OSError la `radio.send`”** — ai uitat `radio.on()`.  
2. **„NameError: radio”** — ai uitat `import radio`.  
3. **„Nu primesc nimic”** — grupuri diferite pe cele două plăci.  
4. **„TypeError la `radio.send(1)`”** — trimite doar **text**: `radio.send("1")`.  
5. **„ValueError la `radio.config`”** — `group` trebuie să fie între `0` și `255`.  
6. **„Mesajele se pierd”** — placa nu citește destul de des (`display.scroll` durează). Păstrează `sleep(50)` și mesaje scurte.

---

## De făcut azi — „Mesagerul”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | A trimite `"1"`, B trimite `"2"`; celelalte plăci arată `HAPPY` / `SAD` |
| **Complet** | Minim + A+B trimite numele · orice alt text se derulează |

### Exercițiul A — „Mesagerul” (obligatoriu)
Scrie programul din Exemplul 10, cu grupul **perechii tale** și numele **tău**. Testează cu colegul, în ambele sensuri.

### Exercițiul B — Ce vede placa 2?
Placa 1 rulează acest program. Apeși A o dată, apoi B o dată. Ce **mesaje** primește placa 2 și în ce **ordine**?
```python
from microbit import *
import radio

radio.on()
radio.config(group=3)

while True:
    if button_a.was_pressed():
        radio.send("ploaie")
    if button_b.was_pressed():
        radio.send("soare")
    sleep(50)
```

### Exercițiul C — Inima la comandă
Scrie programul pentru **placa 2** din exercițiul B: când primește `"soare"` arată `Image.HAPPY`, iar când primește `"ploaie"` arată `Image.SAD`.

### Exercițiul D — Găsește greșelile
```text
from microbit import *

radio.config(group=300)
radio.send(5)
mesaj = radio.receive
if mesaj = "1":
    display.show(Image.HAPPY)
```

### Exercițiul E — Explică
1. De ce amândouă plăcile trebuie să aibă același grup?  
2. Ce valoare întoarce `radio.receive()` când nu a venit nimic?  
3. De ce nu trimitem informații personale prin radio?

**Gata când:**
- [ ] Mesajele ajung în ambele sensuri  
- [ ] A, B și A+B fac lucruri diferite  
- [ ] Grupul e al **perechii tale**  
- [ ] Programul merge pe plăci reale  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** apeși A și pe placa colegului apare `HAPPY`.

---

## Bonus (după Complet)
- [ ] Adaugă un al treilea cod, `"3"`, cu `Image.HEART`  
- [ ] Trimite un număr ca text (`"42"`) și transformă-l înapoi cu `int(mesaj)`  
- [ ] Fă un **detector de apropiere** cu `receive_full()` și o bară de LED-uri  
- [ ] Gândește un joc simplu pentru **trei** plăci în același grup

## Recapitulare rapidă
1. `import radio` și `radio.on()` — **pornești** radioul.  
2. `radio.config(group=…)` — **același grup** pe ambele plăci.  
3. `radio.send("text")` — doar **text**, cel mult 32 de caractere.  
4. `radio.receive()` — mesajul sau `None`.  
5. `if mesaj:` verifică dacă a venit ceva.  
6. Radio nu e secret și raza e mică.

## Schema pe scurt *(pe foaie)*

Placa 1: apăs A → `radio.send("1")` → aer → Placa 2: `radio.receive()` → `if mesaj == "1"` → `HAPPY`

**Quiz scurt:**  
- Ce face `radio.on()`?  
- Ce primești de la `radio.receive()` dacă nu a venit nimic?  
- Cum faci ca patru perechi să nu se încurce în aceeași sală?  
- Ce trimite `radio.send("2")`: un număr sau un text?

## Temă
Inventează **un cod** cu patru semne pentru o poveste (de exemplu `"1"` = „vine ploaia”). Scrie în Python programul care **traduce** codurile în imagini.

---

## Răspunsuri pentru profesor

**Exercițiul B:** primește mai întâi `"ploaie"`, apoi `"soare"`.

**Exercițiul C:**
```python
from microbit import *
import radio

radio.on()
radio.config(group=3)

while True:
    mesaj = radio.receive()
    if mesaj == "soare":
        display.show(Image.HAPPY)
    elif mesaj == "ploaie":
        display.show(Image.SAD)
    sleep(50)
```

**Exercițiul D:** lipsește `import radio`; lipsește `radio.on()`; `group=300` e în afara intervalului `0–255` (`ValueError`); `radio.send(5)` trebuie text: `radio.send("5")`; `radio.receive` fără `()`; `=` în loc de `==`.

**Exercițiul E:** 1) Placa ascultă doar mesajele din grupul ei. 2) `None`. 3) Radio nu e secret.
