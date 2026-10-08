# Lecția 3 — Semnalizatorul
**Modulul 1 · Python pe micro:bit**  
**Code Maker Club · micro:bit Coder**

> Azi placa **ascultă de butoane** în Python. Facem un **semnalizator de bicicletă**: stânga, dreapta și avarii.  
> Proiect: **„Semnalizatorul”** · `Prenume_Nume_MP1_L03`

---

## Obiectiv
La finalul orei citești butoanele cu `is_pressed()` și `was_pressed()` și iei decizii cu `if`, `elif` și `else`.  
**Minim:** cât ții apăsat **A** pâlpâie o săgeată spre stânga, cât ții **B** spre dreapta, cu **A+B** pâlpâie avariile.  
**Complet:** Minim + semnalizatorul **rămâne pornit** după o apăsare scurtă și se oprește cu A+B.

## De ce contează
Biciclete, mașini și trotinete au semnalizatoare. Ele citesc un comutator și **decid** ce să arate. Programul tău face la fel: **citește** o intrare (butonul), **decide** cu `if` și **arată** rezultatul. Aceste trei lucruri apar în aproape orice program.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2: imagini, liste, `for` |
| 10–30 | Valori `True` / `False` și blocul `if` |
| 30–55 | `if`, `elif`, `else` cu butoanele (**Minim**) |
| 55–75 | `is_pressed()` și `was_pressed()` — care e diferența? |
| 75–105 | Semnalizatorul care rămâne pornit (**Complet**) |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `button_a.is_pressed()` · `button_b.is_pressed()` · `was_pressed()` · `if / elif / else` · `and` · `==` · variabile cu text

---

## Pas cu pas

### 1) `True` și `False`
Un buton poate fi **apăsat** sau **neapăsat**. În Python se spune `True` (adevărat) sau `False` (fals). `button_a.is_pressed()` răspunde cu una dintre ele. Atenție la **parantezele** de la final: ele „întreabă” butonul.

### 2) Condiția `if`
```text
if conditie:
    ce se întâmplă dacă e adevărată
```
După condiție pui **două puncte** `:`, iar ce se întâmplă începe cu **4 spații**.

### Exemplul 1 — `if` simplu
```python
from microbit import *

while True:
    if button_a.is_pressed():
        display.show(Image.ARROW_W)
    sleep(100)
```
Cât ții apăsat A, apare săgeata spre vest (stânga). Atenție: după ce lași butonul, săgeata **rămâne** pe ecran, pentru că nu am dat comanda de a o șterge.

### Exemplul 2 — `if` și `else`
```python
from microbit import *

while True:
    if button_a.is_pressed():
        display.show(Image.ARROW_W)
    else:
        display.clear()
    sleep(100)
```
Acum, când lași butonul, ecranul se curăță.

### Exemplul 3 — `if`, `elif`, `else`
`elif` înseamnă „altfel dacă”.
```python
from microbit import *

while True:
    if button_a.is_pressed():
        display.show(Image.ARROW_W)
    elif button_b.is_pressed():
        display.show(Image.ARROW_E)
    else:
        display.clear()
    sleep(100)
```
- A → săgeată stânga (`ARROW_W`)  
- B → săgeată dreapta (`ARROW_E`)  
- niciun buton → ecran curat

### Exemplul 4 — Două butoane deodată
Cu `and` verificăm că **amândouă** condițiile sunt adevărate.
```python
from microbit import *

while True:
    if button_a.is_pressed() and button_b.is_pressed():
        display.show(Image.DIAMOND)
    elif button_a.is_pressed():
        display.show(Image.ARROW_W)
    elif button_b.is_pressed():
        display.show(Image.ARROW_E)
    else:
        display.clear()
    sleep(100)
```
> **Ordinea contează.** Python verifică de sus în jos și se oprește la **prima** condiție adevărată. Dacă am pune întâi `if button_a.is_pressed():`, pe A+B s-ar vedea mereu doar săgeata spre stânga. De aceea verificăm **A+B primul**.

### Exemplul 5 — Pâlpâirea
Un semnalizator **pâlpâie**: aprins, stins, aprins, stins.
```python
from microbit import *

while True:
    if button_a.is_pressed():
        display.show(Image.ARROW_W)
        sleep(300)
        display.clear()
        sleep(300)
    else:
        sleep(50)
```
`else: sleep(50)` e o pauză mică ca bucla să nu alerge prea repede.

### Exemplul 6 — `is_pressed()` și `was_pressed()`

| Întrebarea | Ce răspunde |
|------------|-------------|
| `is_pressed()` | „Este apăsat **chiar acum**?” |
| `was_pressed()` | „A fost apăsat **de când te-am întrebat ultima dată**?” |

`was_pressed()` ține minte și o atingere **scurtă**, făcută în timp ce programul dormea cu `sleep`. După ce îl citești, memoria se **șterge**.
```python
from microbit import *

while True:
    if button_a.was_pressed():
        display.show(Image.HAPPY)
        sleep(500)
    else:
        display.clear()
        sleep(100)
```

### Exemplul 7 — Numărăm apăsările
```python
from microbit import *

while True:
    sleep(2000)
    display.scroll(str(button_a.get_presses()))
```
`get_presses()` spune **de câte ori** a fost apăsat A în ultimele 2 secunde (cât a dormit programul).

### Exemplul 8 — O variabilă cu text
O variabilă poate ține și text. Pentru a compara folosim `==` (două semne egal).
```python
from microbit import *

directie = "nimic"

while True:
    if button_a.was_pressed():
        directie = "stanga"
    elif button_b.was_pressed():
        directie = "dreapta"

    if directie == "stanga":
        display.show(Image.ARROW_W)
    elif directie == "dreapta":
        display.show(Image.ARROW_E)
    else:
        display.clear()
    sleep(100)
```
`=` **pune** o valoare, iar `==` **întreabă** dacă două valori sunt egale.

### Exemplul 9 — Semnalizatorul care rămâne pornit (Complet)
```python
from microbit import *

directie = "nimic"

while True:
    if button_a.is_pressed() and button_b.is_pressed():
        directie = "nimic"
        button_a.was_pressed()     # golim memoria butonului A
        button_b.was_pressed()     # golim memoria butonului B
    elif button_a.was_pressed():
        directie = "stanga"
    elif button_b.was_pressed():
        directie = "dreapta"

    if directie == "stanga":
        display.show(Image.ARROW_W)
        sleep(300)
        display.clear()
        sleep(300)
    elif directie == "dreapta":
        display.show(Image.ARROW_E)
        sleep(300)
        display.clear()
        sleep(300)
    else:
        sleep(50)
```
- Apeși **A** scurt: semnalizatorul stânga pornește și **rămâne** pornit.  
- **B** pornește dreapta.  
- **A+B** îl oprește.  
- Liniile `button_a.was_pressed()` fără nimic în jurul lor doar **golesc** memoria; fără ele, după A+B placa ar „crede” că A a fost apăsat.

### Exemplul 10 — Avariile (Minim, varianta pâlpâitoare)
```python
from microbit import *

while True:
    if button_a.is_pressed() and button_b.is_pressed():
        display.show(Image.SQUARE)
        sleep(300)
        display.clear()
        sleep(300)
    elif button_a.is_pressed():
        display.show(Image.ARROW_W)
        sleep(300)
        display.clear()
        sleep(300)
    elif button_b.is_pressed():
        display.show(Image.ARROW_E)
        sleep(300)
        display.clear()
        sleep(300)
    else:
        display.clear()
        sleep(50)
```
Pâlpâie doar cât ții butonul apăsat. Pentru apăsări scurte folosești varianta din Exemplul 9.

---

## Greșeli frecvente
1. **„Semnalizatorul e mereu pornit”** — ai scris `button_a.is_pressed` fără `()`. Fără paranteze, Python nu întreabă butonul.  
2. **„SyntaxError la `if`”** — lipsesc `:` sau ai folosit `=` în loc de `==`.  
3. **„Pe A+B apare doar stânga”** — condiția cu `and` trebuie pusă **prima**.  
4. **„Placa nu simte apăsările scurte”** — ai folosit `is_pressed()` și programul dormea. Folosește `was_pressed()`.  
5. **„După A+B pornește singur stânga”** — ai uitat să golești memoria butoanelor.  
6. **„IndentationError”** — rândurile din `if` și din `while` nu au spațiile potrivite.

---

## De făcut azi — „Semnalizatorul”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | `is_pressed()` · A = stânga · B = dreapta · A+B = avarii · pâlpâie |
| **Complet** | Minim + semnalizatorul rămâne pornit după o apăsare scurtă (`was_pressed()`) și se oprește cu A+B |

### Exercițiul A — „Semnalizatorul” (obligatoriu)
Scrie programul din Exemplul 10 (Minim). Pentru **Complet**, scrie varianta din Exemplul 9.

### Exercițiul B — Ce se întâmplă?
Spune ce vezi pe placă dacă apeși **A scurt, o singură dată**, la programul din Exemplul 6:
```python
from microbit import *

while True:
    if button_a.was_pressed():
        display.show(Image.HAPPY)
        sleep(500)
    else:
        display.clear()
        sleep(100)
```

### Exercițiul C — O față pentru fiecare buton
Scrie un program: cât ții **A** apare `Image.HAPPY`, cât ții **B** apare `Image.SAD`, altfel apare `Image.ASLEEP`.

### Exercițiul D — Găsește greșelile
Programul are **4 greșeli**. Rescrie-l corect.
```text
from microbit import *

while True
    if button_a.is_pressed:
        display.show(Image.HAPPY)
    elif button_b.is_pressed() = True:
        display.show(Image.SAD)
    else
        display.clear()
```

### Exercițiul E — Explică
1. Care e diferența dintre `=` și `==`?  
2. De ce verificăm A+B înaintea lui A?  
3. Când folosești `was_pressed()` în loc de `is_pressed()`?

**Gata când:**
- [ ] Merge pe placa adevărată  
- [ ] A, B și A+B fac lucruri diferite  
- [ ] Săgețile **pâlpâie**  
- [ ] (Complet) rămâne pornit după o apăsare scurtă  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg ține A și vede săgeata pâlpâind spre stânga.

---

## Bonus (după Complet)
- [ ] Adaugă săgeți diferite: `Image.ARROW_N` pentru „înainte”  
- [ ] Fă ca avariile să arate două imagini alternativ, nu doar un pătrat  
- [ ] Numără de câte ori ai pornit semnalizatorul și arată numărul când apeși A+B  
- [ ] Scrie același program în blocuri și compară lungimea

## Recapitulare rapidă
1. `button_a.is_pressed()` = apăsat **acum**; `was_pressed()` = apăsat **de la ultima întrebare**.  
2. `if` / `elif` / `else` aleg ce se întâmplă; Python se oprește la **prima** condiție adevărată.  
3. `and` cere ca **amândouă** condițiile să fie adevărate.  
4. `=` pune o valoare; `==` o compară.  
5. Condiția cea mai **specifică** (A+B) se pune **prima**.

## Schema pe scurt *(pe foaie)*

`while True:` → citesc butoanele → `if A și B` → avarii · `elif A` → stânga · `elif B` → dreapta · `else` → curat

**Quiz scurt:**  
- Ce înseamnă `elif`?  
- De ce parantezele din `is_pressed()` sunt importante?  
- Care e diferența dintre `is_pressed()` și `was_pressed()`?  
- Ce face `and`?

## Temă
Gândește-te la **un alt aparat cu 3 butoane** (ascensor, telecomandă). Scrie pe foaie un program în Python, cu `if` / `elif`, care ar răspunde la fiecare buton.

---

## Răspunsuri pentru profesor

**Exercițiul B:** apare fața veselă o jumătate de secundă, apoi ecranul se curăță. `was_pressed()` a prins apăsarea scurtă. Dacă apeși A **de mai multe ori**, `was_pressed()` spune doar `True`, adică „a fost apăsat”, nu câte ori.

**Exercițiul C:**
```python
from microbit import *

while True:
    if button_a.is_pressed():
        display.show(Image.HAPPY)
    elif button_b.is_pressed():
        display.show(Image.SAD)
    else:
        display.show(Image.ASLEEP)
    sleep(100)
```

**Exercițiul D:**
```python
from microbit import *

while True:
    if button_a.is_pressed():
        display.show(Image.HAPPY)
    elif button_b.is_pressed():
        display.show(Image.SAD)
    else:
        display.clear()
    sleep(100)
```
Greșelile: lipsea `:` după `while True`; lipseau `()` la `button_a.is_pressed`; `= True` era greșit (trebuia `==` sau nimic); lipsea `:` după `else`.

**Exercițiul E:** 1) `=` pune o valoare, `==` compară. 2) Altfel placa s-ar opri la A. 3) Când vrei să prinzi și o apăsare scurtă, în timp ce programul face altceva.
