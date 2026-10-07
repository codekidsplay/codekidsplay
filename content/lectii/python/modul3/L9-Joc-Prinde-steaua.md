# LECȚIA 9 — Joc: Prinde steaua
**Modulul 3 · Desenăm cu Turtle · 2 ore**  
**Code Maker Club · Turtle Artist**

> Azi facem **primul nostru joc complet**! Conduci o țestoasă cu săgețile și prinzi cât mai multe stele, dar ai grijă la bomba roșie care ricoșează prin ecran. Ai **scor**, **timp**, **vieți**, **niveluri** și **record**.  
> Proiect: **„Prinde steaua”** · fișier: `Prenume_Nume_P3_L9.py`

---

## Obiectiv
La finalul orei construiești un joc cu Turtle: jucător controlat de tastatură, obiecte care apar la întâmplare, coliziuni (atingeri), scor, cronometru, vieți, un inamic care ricoșează, niveluri și restart.  
**Minim:** jucătorul prinde steaua și scorul crește.  
**Ținta orei (Complet):** + bomba, timpul, viețile și jocul complet cu restart.

## De ce contează
Orice joc are aceleași părți: **jucător**, **ținte**, **pericole**, **scor** și **sfârșit**. Dacă înțelegi cum se leagă între ele, poți face jocuri cu orice temă: spațiu, pădure, mașini. Aceleași idei le vei folosi și în Pygame.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L8 |
| 10–30 | Jucătorul și steaua (**Exemplele 1–2**) |
| 30–50 | Coliziunea și scorul (**Exemplele 3–4**) |
| 50–70 | Bomba care ricoșează (**Exemplul 5**) |
| 70–90 | Timp, vieți, niveluri, record (**Exemplele 6–9**) |
| 90–118 | Jocul complet (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L8

- Mai multe țestoase: fiecare are propriile comenzi.
- Tastele: `screen.listen()` și `screen.onkeypress(functia, "Up")`.
- `screen.tracer(0)` + `screen.update()` pentru mișcare fluidă; `screen.ontimer(functia, ms)` repetă o funcție.

**Încearcă tu (3 min)**  
- [ ] Scrie un `for` care afișează numerele de la 1 la 5  

---

## 2. Jucătorul și steaua

### Exemplul 1 — Jucătorul

```python
import turtle

screen = turtle.Screen()
screen.setup(600, 600)
screen.bgcolor("midnightblue")

jucator = turtle.Turtle()
jucator.shape("turtle")
jucator.color("lime")
jucator.penup()

def muta(directie):
    jucator.setheading(directie)
    jucator.forward(20)
    jucator.setx(max(-280, min(280, jucator.xcor())))
    jucator.sety(max(-280, min(280, jucator.ycor())))

def sus():
    muta(90)

def jos():
    muta(270)

def stanga():
    muta(180)

def dreapta():
    muta(0)

screen.listen()
screen.onkeypress(sus, "Up")
screen.onkeypress(jos, "Down")
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")

turtle.done()
```

**Ce vezi pe ecran:** pe fundal albastru închis, o țestoasă verde pe care o conduci cu **săgețile**. Ea nu lasă urmă (creionul e ridicat) și **nu poate ieși** din ecran.

Funcția `muta(directie)` rotește țestoasa spre `90` (sus), `270` (jos), `180` (stânga) sau `0` (dreapta) și o mută cu 20. Rândurile cu `max` și `min` o țin în interiorul ferestrei: `min(280, x)` nu lasă `x` să treacă de 280, iar `max(-280, ...)` nu-l lasă să coboare sub -280.

### Exemplul 2 — Steaua

```python
import math
import random
import turtle

screen = turtle.Screen()
screen.setup(600, 600)
screen.bgcolor("midnightblue")

# desenam o forma noua: steaua
puncte = []
for i in range(10):
    if i % 2 == 0:
        raza = 10
    else:
        raza = 4
    unghi = math.radians(90 + i * 36)
    puncte.append((raza * math.cos(unghi), raza * math.sin(unghi)))
screen.register_shape("stea", tuple(puncte))

stea = turtle.Turtle()
stea.shape("stea")
stea.shapesize(2)
stea.color("gold")
stea.penup()

def muta_stea():
    stea.goto(random.randint(-260, 260), random.randint(-260, 260))

muta_stea()

screen.listen()
screen.onkey(muta_stea, "space")

turtle.done()
```

**Ce vezi pe ecran:** pe fundal albastru închis, o **stea aurie** cu 5 colțuri, într-un loc la întâmplare. De fiecare dată când apeși **bara de spațiu**, steaua **sare** în alt loc.

Cum facem o formă nouă: `screen.register_shape("stea", puncte)` înregistrează o formă cu numele `"stea"`, făcută din 10 puncte (colțurile exterioare și interioare ale stelei, alternativ). Apoi o folosim ca orice formă: `stea.shape("stea")`. (`math.cos` și `math.sin` calculează poziția punctelor pe un cerc. Nu trebuie să le înțelegi acum, doar să copiezi forma.)

---

## 3. Coliziune și scor

### Exemplul 3 — Când se ating două lucruri?

```python
def distanta(x1, y1, x2, y2):
    return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5

def se_ating(x1, y1, x2, y2, raza):
    return distanta(x1, y1, x2, y2) < raza

print(distanta(0, 0, 30, 40))
print(se_ating(0, 0, 30, 40, 60))
print(se_ating(0, 0, 30, 40, 50))
print(se_ating(10, 10, 15, 14, 20))
```

**Ieșire:**
```text
50.0
True
False
True
```

Două obiecte **se ating** dacă distanța dintre ele este mai mică decât o limită (aici `raza`). Distanța se calculează cu teorema lui Pitagora: pentru `(0, 0)` și `(30, 40)` obținem `50` (triunghiul 3-4-5, înmulțit cu 10). Dacă limita este 60, se ating; dacă este exact 50, **nu** (pentru că `50 < 50` este fals).

În Turtle avem o scurtătură: `jucator.distance(stea)` dă direct distanța dintre două țestoase.

### Exemplul 4 — Scorul pe ecran

```python
import random
import turtle

screen = turtle.Screen()
screen.setup(600, 600)
screen.bgcolor("midnightblue")

scor = {"puncte": 0}

jucator = turtle.Turtle()
jucator.shape("turtle")
jucator.color("lime")
jucator.penup()

stea = turtle.Turtle()
stea.shape("circle")
stea.color("gold")
stea.penup()
stea.goto(100, 100)

panou = turtle.Turtle()
panou.hideturtle()
panou.penup()
panou.color("white")

def scrie_scor():
    panou.clear()
    panou.goto(-280, 260)
    panou.write("Scor: " + str(scor["puncte"]), font=("Arial", 16, "bold"))

def verifica():
    if jucator.distance(stea) < 25:
        scor["puncte"] += 1
        stea.goto(random.randint(-260, 260), random.randint(-260, 230))
        scrie_scor()

def sus():
    jucator.setheading(90)
    jucator.forward(20)
    verifica()

def jos():
    jucator.setheading(270)
    jucator.forward(20)
    verifica()

def stanga():
    jucator.setheading(180)
    jucator.forward(20)
    verifica()

def dreapta():
    jucator.setheading(0)
    jucator.forward(20)
    verifica()

scrie_scor()
screen.listen()
screen.onkeypress(sus, "Up")
screen.onkeypress(jos, "Down")
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")

turtle.done()
```

**Ce vezi pe ecran:** sus, în stânga, scrie **Scor: 0**. Conduci țestoasa până la **cercul auriu** (steaua provizorie). Când ajungi la mai puțin de 25 de pași de ea, scorul crește cu 1, iar cercul **sare în alt loc**.

După fiecare mișcare apelăm `verifica()`: ea compară distanța cu 25 și, dacă am „prins” ținta, mărește scorul și mută ținta. `panou.clear()` șterge scorul vechi înainte să scriem unul nou.

---

## 4. Pericole, timp, vieți

### Exemplul 5 — Bomba care ricoșează

```python
import turtle

def ricoseu_x(unghi):
    return (180 - unghi) % 360

def ricoseu_y(unghi):
    return (-unghi) % 360

print(ricoseu_x(30))
print(ricoseu_y(30))
print(ricoseu_x(0))
print(ricoseu_y(90))

screen = turtle.Screen()
screen.setup(600, 600)
screen.bgcolor("midnightblue")
screen.tracer(0)

bomba = turtle.Turtle()
bomba.shape("circle")
bomba.color("red")
bomba.penup()
bomba.setheading(40)

def bucla():
    bomba.forward(4)
    if abs(bomba.xcor()) > 280:
        bomba.setheading(ricoseu_x(bomba.heading()))
    if abs(bomba.ycor()) > 280:
        bomba.setheading(ricoseu_y(bomba.heading()))
    screen.update()
    screen.ontimer(bucla, 20)

bucla()

turtle.done()
```

**Ieșire:**
```text
150
330
180
270
```

**Ce vezi pe ecran:** o **bombă roșie** pornește din centru în sus și spre dreapta și **ricoșează** de marginile ferestrei, ca o minge.

Cum ricoșează: la un perete **vertical** (stânga sau dreapta), direcția `u` devine `180 - u`; la un perete **orizontal** (sus sau jos), devine `-u`. De exemplu, o bombă care merge spre `30°` și lovește un perete vertical pleacă spre `150°`. Programul afișează câteva teste (`150`, `330`, `180`, `270`). `% 360` ține unghiul între 0 și 359.

Funcția `bucla()` este **bucla jocului**: face un pas, verifică pereții, actualizează ecranul și se programează să ruleze din nou peste 20 de milisecunde (50 de cadre pe secundă).

### Exemplul 6 — Cronometrul

```python
import turtle

screen = turtle.Screen()
screen.setup(400, 300)
screen.bgcolor("black")

stare = {"timp": 10}

panou = turtle.Turtle()
panou.hideturtle()
panou.penup()
panou.color("white")

def scrie():
    panou.clear()
    panou.goto(0, -20)
    if stare["timp"] > 0:
        panou.write(stare["timp"], align="center", font=("Arial", 48, "bold"))
    else:
        panou.color("red")
        panou.write("TIMP!", align="center", font=("Arial", 48, "bold"))

def tick():
    stare["timp"] -= 1
    scrie()
    if stare["timp"] > 0:
        screen.ontimer(tick, 1000)

scrie()
screen.ontimer(tick, 1000)

turtle.done()
```

**Ce vezi pe ecran:** pe fundal negru apare **10**, apoi, la fiecare secundă, **9, 8, 7, ... 1**. La 0 apare cu roșu cuvântul **TIMP!** și numărătoarea se oprește.

`screen.ontimer(tick, 1000)` apelează funcția peste 1000 ms, adică **o secundă**. Funcția `tick` scade timpul și se programează din nou, **doar dacă** mai este timp. Altfel nu se mai programează și numărătoarea se oprește.

### Exemplul 7 — Viețile

```python
import turtle

screen = turtle.Screen()
screen.setup(400, 300)
screen.bgcolor("black")

stare = {"vieti": 3, "activ": True}

panou = turtle.Turtle()
panou.hideturtle()
panou.penup()
panou.color("white")

def scrie():
    panou.clear()
    panou.goto(0, 20)
    if stare["activ"]:
        panou.write("Vieti: " + "O " * stare["vieti"], align="center", font=("Arial", 24, "bold"))
    else:
        panou.color("red")
        panou.write("GAME OVER", align="center", font=("Arial", 36, "bold"))

def pierde_o_viata():
    if stare["activ"]:
        stare["vieti"] -= 1
        if stare["vieti"] <= 0:
            stare["activ"] = False
        scrie()

scrie()
screen.listen()
screen.onkey(pierde_o_viata, "x")

turtle.done()
```

**Ce vezi pe ecran:** scrie **Vieti: O O O** (trei „bile”, adică trei vieți). De fiecare dată când apeși **x** (ca și cum ai atinge bomba), se pierde o viață. După a treia apare cu roșu **GAME OVER**.

`"O " * 3` repetă textul de 3 ori: `"O O O "`. Variabila `activ` ne spune dacă jocul încă merge: după `GAME OVER`, tasta **x** nu mai face nimic.

---

## 5. Niveluri, record, restart

### Exemplul 8 — Nivelurile

```python
viteza = 3

for scor in range(1, 13):
    if scor % 5 == 0:
        viteza += 1
        print("Scor", scor, "-> nivel nou, viteza", viteza)

print("Viteza finala:", viteza)
```

**Ieșire:**
```text
Scor 5 -> nivel nou, viteza 4
Scor 10 -> nivel nou, viteza 5
Viteza finala: 5
```

La fiecare **5 puncte** (`scor % 5 == 0`, adică restul împărțirii la 5 este zero) bomba merge mai repede cu 1. Aici vedem de ce: scorurile 5 și 10 dau nivel nou, deci viteza crește de la 3 la 5. În joc, aceeași verificare se face de fiecare dată când prinzi o stea.

### Exemplul 9 — Recordul

```python
record = 0
runde = [4, 9, 7, 12, 3]

for scor in runde:
    print("Ai facut", scor, "puncte.")
    if scor > record:
        record = scor
        print("RECORD NOU:", record)

print("Cel mai bun scor:", record)
```

**Ieșire:**
```text
Ai facut 4 puncte.
RECORD NOU: 4
Ai facut 9 puncte.
RECORD NOU: 9
Ai facut 7 puncte.
Ai facut 12 puncte.
RECORD NOU: 12
Ai facut 3 puncte.
Cel mai bun scor: 12
```

Păstrăm într-o variabilă cel mai bun scor. După fiecare rundă, comparăm: dacă `scor > record`, avem **record nou** și îl memorăm. Variabila `record` **nu se resetează** când repornești jocul, dar scorul da.

---

## 6. Jocul complet

### Exemplul 10 — „Prinde steaua”

```python
import math
import random
import time
import turtle

screen = turtle.Screen()
screen.setup(600, 600)
screen.bgcolor("midnightblue")
screen.title("Prinde steaua")
screen.tracer(0)

# forma stelei
puncte = []
for i in range(10):
    if i % 2 == 0:
        raza = 10
    else:
        raza = 4
    unghi = math.radians(90 + i * 36)
    puncte.append((raza * math.cos(unghi), raza * math.sin(unghi)))
screen.register_shape("stea", tuple(puncte))

stare = {"scor": 0, "vieti": 3, "timp": 30, "viteza": 3, "record": 0, "activ": True, "start": time.time()}

jucator = turtle.Turtle()
jucator.shape("turtle")
jucator.color("lime")
jucator.penup()

stea = turtle.Turtle()
stea.shape("stea")
stea.shapesize(2)
stea.color("gold")
stea.penup()

bomba = turtle.Turtle()
bomba.shape("circle")
bomba.color("red")
bomba.penup()
bomba.goto(220, 220)
bomba.setheading(225)

panou = turtle.Turtle()
panou.hideturtle()
panou.penup()
panou.color("white")

def muta_stea():
    stea.goto(random.randint(-260, 260), random.randint(-260, 220))

def scrie_panou():
    panou.clear()
    panou.goto(-280, 262)
    text = f"Scor: {stare['scor']}   Vieti: {stare['vieti']}   Timp: {stare['timp']}   Record: {stare['record']}"
    panou.write(text, font=("Arial", 13, "bold"))

def sfarsit(mesaj):
    stare["activ"] = False
    if stare["scor"] > stare["record"]:
        stare["record"] = stare["scor"]
    scrie_panou()
    panou.goto(0, 0)
    panou.write(mesaj, align="center", font=("Arial", 28, "bold"))
    panou.goto(0, -40)
    panou.write("Apasa SPATIU pentru joc nou", align="center", font=("Arial", 16, "normal"))
    screen.update()

def muta(directie):
    if stare["activ"]:
        jucator.setheading(directie)
        jucator.forward(20)
        jucator.setx(max(-280, min(280, jucator.xcor())))
        jucator.sety(max(-280, min(280, jucator.ycor())))

def sus():
    muta(90)

def jos():
    muta(270)

def stanga():
    muta(180)

def dreapta():
    muta(0)

def bucla():
    if not stare["activ"]:
        return

    ramas = 30 - int(time.time() - stare["start"])
    if ramas != stare["timp"]:
        stare["timp"] = ramas
        scrie_panou()
        if ramas <= 0:
            sfarsit("TIMPUL A EXPIRAT")
            return

    bomba.forward(stare["viteza"])
    if abs(bomba.xcor()) > 280:
        bomba.setheading((180 - bomba.heading()) % 360)
    if abs(bomba.ycor()) > 280:
        bomba.setheading((-bomba.heading()) % 360)

    if jucator.distance(stea) < 25:
        stare["scor"] += 1
        if stare["scor"] % 5 == 0:
            stare["viteza"] += 1
        muta_stea()
        scrie_panou()

    if jucator.distance(bomba) < 22:
        stare["vieti"] -= 1
        bomba.goto(random.choice([-250, 250]), random.choice([-250, 250]))
        scrie_panou()
        if stare["vieti"] <= 0:
            sfarsit("GAME OVER")
            return

    screen.update()
    screen.ontimer(bucla, 20)

def joc_nou():
    if stare["activ"]:
        return
    stare["scor"] = 0
    stare["vieti"] = 3
    stare["timp"] = 30
    stare["viteza"] = 3
    stare["activ"] = True
    stare["start"] = time.time()
    jucator.goto(0, 0)
    bomba.goto(220, 220)
    bomba.setheading(225)
    muta_stea()
    scrie_panou()
    bucla()

muta_stea()
scrie_panou()
screen.listen()
screen.onkeypress(sus, "Up")
screen.onkeypress(jos, "Down")
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")
screen.onkey(joc_nou, "space")

bucla()

turtle.done()
```

**Ce vezi pe ecran:** pe fundal albastru închis, sus, un panou: **Scor, Vieți, Timp și Record**. Conduci **țestoasa verde** cu săgețile și prinzi **steaua aurie**. Fiecare stea înseamnă **+1 punct** și steaua sare în alt loc. La fiecare 5 puncte, **bomba roșie** care ricoșează prin ecran merge mai repede. Dacă te atinge, pierzi o viață, iar bomba reapare într-un colț. Jocul se termină la **0 vieți** sau când timpul (30 de secunde) **expiră**. Apare **GAME OVER** sau **TIMPUL A EXPIRAT**, iar cu **spațiu** începi un joc nou, păstrând recordul.

Cum sunt legate piesele:
- **`stare`** (un dicționar) păstrează tot ce se schimbă: scor, vieți, timp, viteză, record și dacă jocul merge (`activ`);
- **`bucla()`** rulează de aproape 50 de ori pe secundă: calculează timpul rămas, mută bomba, verifică stea și bombă, actualizează ecranul;
- **timpul** se măsoară cu ceasul calculatorului: `time.time()` dă secundele trecute de la o dată fixă, deci `time.time() - stare["start"]` este timpul scurs de la începutul jocului;
- **`sfarsit(mesaj)`** oprește jocul, actualizează recordul și afișează mesajul;
- **`joc_nou()`** resetează tot și repornește bucla. Funcționează doar dacă jocul s-a terminat.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Prinde steaua” (obligatoriu)
Pornește de la Exemplul 10 și fă jocul **al tău**. Adaugă:
1. **o a doua bombă**, care apare de la 10 puncte (indiciu: încă o țestoasă și încă un `if` în `bucla`);
2. **o stea bonus albastră**, care dă **+3 puncte** sau **+5 secunde** (apare rar);
3. **culori și teme** alese de tine (spațiu, ocean, desert), plus un titlu;
4. un **mesaj** când bați recordul;
5. păstrează `stare`, `bucla`, `sfarsit` și `joc_nou`.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
scor = 0
viteza = 3
for i in range(12):
    scor += 1
    if scor % 4 == 0:
        viteza += 2
print(scor, viteza)
```

### Exercițiul C — Stea bonus
Adaugă o **a doua stea**, de culoare albastră, care apare doar dacă `random.randint(1, 5) == 1` după ce prinzi o stea aurie. Pentru ea scorul crește cu 3.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
import turtle
screen = turtle.Screen()
jucator = turtle.Turtle()
def sus():
    jucator.forward(20)
screen.onkeypress(sus(), "Up")
if jucator.Distance(screen) < 20
    print("Prins!")
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce face `bucla()` și de ce se programează singură cu `ontimer`?  
2. Cum știm că două obiecte s-au atins?  
3. La ce folosește variabila `activ`?

**Gata când:**
- [ ] Jocul are scor, vieți, timp, bomba și record  
- [ ] Ai adăugat a doua bombă și steaua bonus  
- [ ] Jocul se poate reporni cu spațiu  
- [ ] Ai schimbat tema (culori, titlu)  
- [ ] Ai explicat pe foaie bucla jocului și coliziunea  
- [ ] Fișierul se numește `Prenume_Nume_P3_L9.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă **sunet**: la fiecare stea prinsă afișează „Bing!” în fereastra de text  
- [ ] Fă steaua să **dispară** după 3 secunde dacă nu o prinzi  
- [ ] Fă jocul **mai greu**: la 10 puncte timpul rămas scade cu 5 secunde  
- [ ] Adaugă **un meniu** de start, cu „Apasă SPAȚIU ca să începi”  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Nu merg tastele | Lipsește `screen.listen()` sau fereastra nu are focus | `screen.listen()` și click pe fereastră |
| Jocul pare „înghețat” | Ai pus `screen.tracer(0)` și ai uitat `screen.update()` | Apelează `screen.update()` în `bucla()` |
| Mai multe bucle rulează deodată după restart | Ai apelat `bucla()` de mai multe ori când jocul mergea | În `joc_nou()` verifică `if stare["activ"]: return` |
| `KeyError: 'viteza'` | Cheie scrisă greșit sau lipsă din dicționar | Verifică numele: `stare["viteza"]` |
| `AttributeError: 'Turtle' object has no attribute 'Distance'` | Ai scris metoda cu majusculă | `jucator.distance(stea)` |
| Scorul nu se actualizează pe ecran | Ai uitat `scrie_panou()` după schimbare | Apelează funcția de afișare după fiecare schimbare |
| Bomba iese din ecran | Ai uitat verificarea pereților | `if abs(bomba.xcor()) > 280:` |

---

## Recapitulare pe scurt

- Un joc are: **jucător**, **țintă**, **pericol**, **scor**, **timp/vieți**, **sfârșit**.
- Starea jocului se păstrează într-un **dicționar** (`stare`).
- **Bucla jocului**: o funcție care se programează singură cu `ontimer` și actualizează ecranul cu `update()`.
- **Coliziunea**: distanța dintre două obiecte este mai mică decât o limită.
- Ricoșeul: `180 - unghi` la pereți verticali, `-unghi` la pereți orizontali.
- `register_shape` creează forme noi, de exemplu o stea.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Schimbă tema jocului: **pește care mănâncă pește mic**, **rachetă care strânge stele** sau altă idee.  
3. Joacă jocul cu un prieten și notează cât a fost scorul maxim.  
4. **Bonus:** adaugă **trei niveluri** cu fundal diferit și viteze diferite.  
5. Salvează totul ca `Tema_P3_L9_Prenume_Nume.py`.

---

## Ce urmează — Lecția 10
**Proiect: galeria mea de artă**: strângem tot ce am învățat despre Turtle într-un proiect final, cu desene, culori, funcții și un meniu interactiv.
