# Lecția 7 — Biblioteca de desene
**Modulul 1 · Python pe micro:bit**  
**Code Maker Club · micro:bit Coder**

> Azi înveți să-ți faci **propriile comenzi**: grupezi blocuri de cod sub un nume și le chemi de câte ori vrei. Se numesc **funcții**.  
> Proiect: **„Biblioteca de desene”** · `Prenume_Nume_MP1_L07`

---

## Obiectiv
La finalul orei creezi funcții cu `def`, le dai **parametri** și folosești `return`.  
**Minim:** un program cu **2 funcții cu parametri** (de exemplu `clipeste` și `bate_inima`), chemate de la butoane.  
**Complet:** Minim + o **numărătoare inversă**, o **bară de nivel** și o funcție care **întoarce** o valoare (`limiteaza`).

## De ce contează
Dacă ai de scris de zece ori același lucru, nu-l copiezi de zece ori. Îl scrii **o singură dată**, îi pui un nume și îl chemi. Programele mari, de la jocuri la aplicații, sunt făcute din funcții mici, ca o casă din cărămizi.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6: radio, grup, mesaje |
| 10–25 | De ce funcții? Jocul „Comenzi noi” |
| 25–55 | `def`, apelul, parametrii |
| 55–75 | `return`: funcții care răspund |
| 75–105 | Biblioteca de desene (**Minim** și **Complet**) |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `def nume():` · parametri · valori implicite · `return` · apelul funcțiilor · `for … in range(…)`

---

## Pas cu pas

### 1) Jocul „Comenzi noi”
Spui unui coleg „fă un salt”. Nu-i explici mereu cum. Ați **convenit** odată ce înseamnă „salt”. Funcția face la fel: îi dai un nume o dată, o chemi mereu.

### Exemplul 1 — Prima funcție
```python
from microbit import *

def bate_inima():
    display.show(Image.HEART)
    sleep(300)
    display.show(Image.HEART_SMALL)
    sleep(300)

bate_inima()
bate_inima()
bate_inima()
```
- `def` înseamnă „definesc o funcție”.  
- După nume: **paranteze** `()` și **două puncte** `:`.  
- Corpul funcției are **4 spații** în față.  
- **Definiția** doar pregătește funcția. Ea rulează abia când o **chemi**: `bate_inima()`.

**Ce vezi pe placă:** inima bate de trei ori.

### Exemplul 2 — Parametri
Un **parametru** e o valoare pe care o dai funcției la apel.
```python
from microbit import *

def arata(imagine, pauza):
    display.show(imagine)
    sleep(pauza)

arata(Image.HAPPY, 500)
arata(Image.SAD, 1000)
```
`imagine` și `pauza` sunt **parametrii**. La apel le dăm valori: `Image.HAPPY` și `500`.

### Exemplul 3 — Parametrul care numără
```python
from microbit import *

def bate_inima(batai):
    for i in range(batai):
        display.show(Image.HEART)
        sleep(200)
        display.show(Image.HEART_SMALL)
        sleep(200)

bate_inima(2)
sleep(1000)
bate_inima(5)
```
Aceeași funcție face 2 bătăi, apoi 5.

### Exemplul 4 — Valori implicite
Dacă nu dai un parametru, poate avea o valoare **de rezervă**.
```python
from microbit import *

def clipeste(imagine, de_cate_ori=3, pauza=300):
    for i in range(de_cate_ori):
        display.show(imagine)
        sleep(pauza)
        display.clear()
        sleep(pauza)

clipeste(Image.HEART)            # 3 ori, 300 ms
clipeste(Image.DUCK, 2)          # 2 ori
clipeste(Image.HOUSE, 1, 800)    # 1 data, 800 ms
```

### Exemplul 5 — `return`
O funcție poate **întoarce** un rezultat, ca un răspuns.
```python
from microbit import *

def dublu(x):
    return x * 2

rezultat = dublu(21)
display.scroll(str(rezultat))
```
**Ce vezi pe placă:** `42`.

### Exemplul 6 — Funcția care limitează
```python
from microbit import *

def limiteaza(valoare, mic, mare):
    if valoare < mic:
        return mic
    if valoare > mare:
        return mare
    return valoare

display.scroll(str(limiteaza(7, 0, 4)))
display.scroll(str(limiteaza(-3, 0, 4)))
display.scroll(str(limiteaza(2, 0, 4)))
```
**Ce vezi pe placă:** `4`, apoi `0`, apoi `2`.

### Exemplul 7 — O funcție care cheamă alta
```python
from microbit import *

def pauza_scurta():
    sleep(200)

def blit(imagine):
    display.show(imagine)
    pauza_scurta()
    display.clear()
    pauza_scurta()

blit(Image.TARGET)
blit(Image.TARGET)
```
Funcțiile se pot chema una pe alta.

### Exemplul 8 — Variabile din interiorul funcției
Variabilele create **în interior** nu se văd **în afară**.
```python
from microbit import *

def calculeaza():
    mic = 5          # exista doar in functie
    return mic * 2

x = calculeaza()
display.scroll(str(x))
```
`mic` nu există după ce funcția s-a terminat; de aceea o **returnăm** (`return`) ca să primim valoarea în `x`.

### Exemplul 9 — Bara de nivel
```python
from microbit import *

def limiteaza(valoare, mic, mare):
    return min(mare, max(mic, valoare))

def bara(nivel):
    nivel = limiteaza(nivel, 0, 5)
    display.clear()
    for x in range(nivel):
        for y in range(5):
            display.set_pixel(x, y, 9)

bara(2)
sleep(1000)
bara(5)
sleep(1000)
bara(9)        # il taie la 5
```
Funcția `bara` aprinde `nivel` coloane întregi.

### Exemplul 10 — Biblioteca de desene
```python
from microbit import *

def limiteaza(valoare, mic, mare):
    return min(mare, max(mic, valoare))

def bate_inima(batai):
    for i in range(batai):
        display.show(Image.HEART)
        sleep(200)
        display.show(Image.HEART_SMALL)
        sleep(200)

def numara_invers(de_la):
    for n in range(de_la, 0, -1):
        display.show(str(n))
        sleep(1000)
    display.show(Image.YES)
    sleep(500)

def bara(nivel):
    nivel = limiteaza(nivel, 0, 5)
    display.clear()
    for x in range(nivel):
        for y in range(5):
            display.set_pixel(x, y, 9)

display.show(Image.SQUARE_SMALL)

while True:
    a = button_a.was_pressed()
    b = button_b.was_pressed()

    if a and b:
        bara(display.read_light_level() // 51)
        sleep(1500)
    elif a:
        bate_inima(3)
    elif b:
        numara_invers(3)

    display.show(Image.SQUARE_SMALL)
    sleep(100)
```
- **A** → inima bate de 3 ori.  
- **B** → numărătoare inversă `3, 2, 1` și bifă.  
- **A+B** → bara arată cât de multă lumină e (de la 0 la 5 coloane).  
- `range(de_la, 0, -1)` numără **în jos**: `3, 2, 1`.  
- Toate funcțiile sunt **definite înainte** de bucla principală.

---

## Greșeli frecvente
1. **„Nu se întâmplă nimic”** — ai definit funcția, dar nu ai chemat-o: `bate_inima()`.  
2. **„NameError: bate_inima”** — ai chemat funcția **înainte** s-o definești.  
3. **„TypeError: takes 1 positional argument…”** — ai dat alt număr de parametri decât cerea funcția.  
4. **„Funcția nu întoarce nimic”** — ai pus `print` sau `display.scroll` în loc de `return`, sau ai uitat `return`.  
5. **„NameError pe o variabilă din funcție”** — ai încercat să o folosești în afara funcției.  
6. **„SyntaxError / IndentationError”** — lipsesc `:` după `def …()` sau spațiile de la corp.

---

## De făcut azi — „Biblioteca de desene”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 2 funcții cu parametri (`clipeste`, `bate_inima`), chemate de la A și B |
| **Complet** | Minim + `numara_invers` + `bara` + `limiteaza` (cu `return`), toate folosite |

### Exercițiul A — „Biblioteca” (obligatoriu)
Scrie propria ta bibliotecă de funcții. Folosește Exemplul 10 ca ghid, dar adaugă **o funcție a ta** (de exemplu `fulger(de_cate_ori)`).

### Exercițiul B — Ce afișează?
```python
from microbit import *

def dublu(x):
    return x * 2

def aduna(a, b=1):
    return a + b

display.scroll(str(dublu(aduna(2, 3))))
display.scroll(str(aduna(7)))
```

### Exercițiul C — Funcția `punct(x, y)`
Scrie funcția `punct(x, y)` care aprinde LED-ul de la `(x, y)` la luminozitate `9`. Apoi, cu ea, aprinde cele patru colțuri ale ecranului.

### Exercițiul D — Găsește greșelile
```text
def arata(imagine)
display.show(imagine)

arata()
arata(Image.HAPPY, 500)
dublu(4)
display.scroll(str(rezultat))
```

### Exercițiul E — Explică
1. Ce face cuvântul `def`?  
2. Care e diferența dintre un parametru și o valoare de întoarcere?  
3. De ce definim funcțiile **înainte** să le chemăm?

**Gata când:**
- [ ] Ai cel puțin 2 funcții cu parametri  
- [ ] Le chemi de la butoane  
- [ ] (Complet) ai o funcție cu `return`  
- [ ] Programul merge pe placă  
- [ ] Ai răspunsurile la B–E  

**→ Minim când:** un coleg apasă A și B și vede funcțiile tale la lucru.

---

## Bonus (după Complet)
- [ ] Fă funcția `fulger(de_cate_ori)` (ecran plin 100 ms, stins 900 ms)  
- [ ] Fă funcția `scrie_nume(nume)` care derulează un nume cu `display.scroll`  
- [ ] Combină două funcții într-o a treia: `spectacol()`  
- [ ] Mută funcțiile într-un fișier separat (cere ajutor profesorului)

## Recapitulare rapidă
1. `def nume():` creează o funcție; o **chemi** cu `nume()`.  
2. **Parametrii** sunt valorile pe care le dai funcției.  
3. Valorile **implicite** (`pauza=300`) sunt de rezervă.  
4. `return` întoarce un rezultat.  
5. Definește funcțiile **înainte** să le chemi.  
6. Variabilele din funcție nu se văd în afară.

## Schema pe scurt *(pe foaie)*

`def` → nume + parametri → corp (cu 4 spații) → chem: `nume(valori)` → (opțional) `return`

**Quiz scurt:**  
- Ce se întâmplă dacă definești o funcție, dar nu o chemi?  
- Ce afișează `str(dublu(5))`, dacă `dublu` întoarce `x * 2`?  
- Ce valoare are `pauza` la `clipeste(Image.HEART)`?  
- De ce e util `return`?

## Temă
Scrie pe foaie **trei funcții** pe care le-ai vrea într-un joc (de exemplu `arata_viata`, `explozie`, `salveaza_scor`). La fiecare, scrie parametrii și ce ar face.

---

## Răspunsuri pentru profesor

**Exercițiul B:** `aduna(2, 3)` dă `5`; `dublu(5)` dă `10`. Se derulează `10`, apoi `aduna(7)` dă `7 + 1 = 8`. Se derulează `8`.

**Exercițiul C:**
```python
from microbit import *

def punct(x, y):
    display.set_pixel(x, y, 9)

punct(0, 0)
punct(4, 0)
punct(0, 4)
punct(4, 4)
```

**Exercițiul D:** lipsesc `:` după `def arata(imagine)`; corpul nu e indentat; `arata()` fără parametru → `TypeError`; `arata(Image.HAPPY, 500)` are un parametru în plus → `TypeError`; `dublu` nu e definită → `NameError`; `rezultat` nu există → `NameError`.

**Exercițiul E:** 1) Definește o funcție. 2) Parametrul **intră** în funcție, valoarea de întoarcere **iese**. 3) Python citește de sus în jos; o funcție trebuie să existe înainte de apel.
