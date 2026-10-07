# LECȚIA 5 — Stele și mandale
**Modulul 3 · Desenăm cu Turtle · 2 ore**  
**Code Maker Club · Turtle Artist**

> Stelele par greu de desenat, dar pentru o țestoasă sunt ușoare: o linie dreaptă și o rotire, repetate de câteva ori. Azi desenăm stele cu orice număr de colțuri, un cer înstelat și **mandale**: desene rotunde, simetrice, făcute din forme care se repetă în cerc.  
> Proiect: **„Mandala mea”** · fișier: `Prenume_Nume_P3_L5.py`

---

## Obiectiv
La finalul orei desenezi o stea cu 5 colțuri, o generalizezi pentru orice număr impar de colțuri, pui desenul într-o funcție, aranjezi forme în cerc în jurul unui centru și construiești o mandala cu mai multe inele.  
**Minim:** steaua cu 5 colțuri și o funcție `stea(...)`.  
**Ținta orei (Complet):** + un cer înstelat și mandala cu cel puțin 3 inele.

## De ce contează
Simetria este peste tot: în flori, în fulgi de zăpadă, în desenele de pe covoare. Un model simetric se obține repetând aceeași formă și rotind țestoasa cu **360 ÷ numărul de repetări**. Ideea o vei folosi și la jocuri, ca să așezi lucruri în cerc.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L4 |
| 10–35 | Steaua cu 5 colțuri (**Exemplele 1–3**) |
| 35–55 | Stele cu alt număr de colțuri (**Exemplul 4**) |
| 55–75 | Cerul înstelat (**Exemplul 5**) |
| 75–100 | Mandale (**Exemplele 6–8**) |
| 100–115 | Mini-proiect (**Exemplele 9–10**) |
| 115–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L4

- O funcție de desen primește poziție, mărime și culoare.
- Poligon cu `n` laturi: rotire de `360 / n`.
- `begin_fill()` ... `end_fill()` umple forma.

**Încearcă tu (3 min)**  
- [ ] Scrie o funcție `triunghi(l)` care desenează un triunghi cu latura `l`  

---

## 2. Steaua cu 5 colțuri

### Exemplul 1 — Prima stea

```python
import turtle

t = turtle.Turtle()
t.color("gold")
t.pensize(3)
for i in range(5):
    t.forward(150)
    t.right(144)

turtle.done()
```

**Ce vezi pe ecran:** o **stea cu 5 colțuri**, desenată dintr-o singură linie continuă, cu latura de 150.

Surpriza este unghiul: **144°**, nu 72°! Țestoasa se rotește mult, așa că linia sare peste un colț și „taie” steaua în loc să facă un pentagon.

### Exemplul 2 — De ce 144?

```python
import turtle

t = turtle.Turtle()
t.hideturtle()
for i in range(5):
    t.forward(100)
    t.right(144)

print("Rotire totala:", 5 * 144)
print("Ture complete:", 5 * 144 / 360)
print("Inapoi la start:", round(t.xcor()) + 0, round(t.ycor()) + 0, round(t.heading()))

turtle.done()
```

**Ieșire:**
```text
Rotire totala: 720
Ture complete: 2.0
Inapoi la start: 0 0 0
```

Țestoasa se rotește în total **720°**, adică **2 ture complete**. Pentru ca desenul să se închidă, rotirea totală trebuie să fie un număr întreg de ture. De aceea, după 5 laturi, ea revine în punctul de plecare, privind în aceeași direcție.

### Exemplul 3 — Steaua umplută

```python
import turtle

screen = turtle.Screen()
screen.bgcolor("midnightblue")

t = turtle.Turtle()
t.color("white", "yellow")
t.pensize(3)
t.begin_fill()
for i in range(5):
    t.forward(160)
    t.right(144)
t.end_fill()
t.hideturtle()

turtle.done()
```

**Ce vezi pe ecran:** pe fundal albastru foarte închis, o **stea galbenă**, cu contur alb.

---

## 3. Orice număr de colțuri

Pentru un număr **impar** de colțuri `n`, unghiul care închide steaua este:

`unghi = 180 - 180 / n`

Verificăm: pentru `n = 5` este `180 - 36 = 144`. Se potrivește!

### Exemplul 4 — Stele cu 5, 7 și 9 colțuri

```python
import turtle

def unghi_stea(n):
    return 180 - 180 / n

for colturi in [5, 7, 9]:
    print(colturi, "colturi: unghi", round(unghi_stea(colturi), 2))

t = turtle.Turtle()
t.speed(0)
t.pensize(2)
culori = ["red", "green", "blue"]
pozitii = [-250, -50, 150]
numere = [5, 7, 9]

for i in range(3):
    t.penup()
    t.goto(pozitii[i], 0)
    t.pendown()
    t.color(culori[i])
    for j in range(numere[i]):
        t.forward(80)
        t.right(unghi_stea(numere[i]))

turtle.done()
```

**Ieșire:**
```text
5 colturi: unghi 144.0
7 colturi: unghi 154.29
9 colturi: unghi 160.0
```

**Ce vezi pe ecran:** **trei stele** în linie, una lângă alta: roșie (5 colțuri), verde (7 colțuri) și albastră (9 colțuri). Cu cât are mai multe colțuri, cu atât steaua seamănă mai mult cu un cerc.

Funcția `unghi_stea(n)` **returnează** unghiul (nu desenează nimic). Folosim formula de două ori: o dată la afișare și o dată la desen.

---

## 4. Cerul înstelat

### Exemplul 5 — Stele la întâmplare

```python
import random
import turtle

screen = turtle.Screen()
screen.setup(700, 500)
screen.bgcolor("black")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def stea(x, y, marime, culoare):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    for i in range(5):
        t.forward(marime)
        t.right(144)
    t.end_fill()

culori = ["white", "yellow", "lightblue", "pink"]

for i in range(30):
    x = random.randint(-330, 300)
    y = random.randint(-230, 200)
    marime = random.randint(8, 30)
    stea(x, y, marime, random.choice(culori))

t.penup()
t.goto(0, -50)
t.dot(90, "lightyellow")

turtle.done()
```

**Ce vezi pe ecran:** pe fundal negru, **30 de stele** colorate, de mărimi diferite, **împrăștiate la întâmplare** (la fiecare rulare altfel), iar în mijloc o **lună** galben deschis.

- `random.randint(a, b)` alege coordonatele `x`, `y` și mărimea;
- `random.choice(culori)` alege o culoare din listă (o veche cunoștință din Modulul 1);
- funcția `stea(x, y, marime, culoare)` desenează o stea umplută oriunde.

Luna este desenată la final, deci acoperă stelele aflate în spatele ei.

---

## 5. Mandale

O **mandală** este un desen rotund, simetric. Rețeta este mereu aceeași: desenezi o formă, o rotești cu `360 / n` grade și o repeți de `n` ori.

### Exemplul 6 — Stele în cerc

```python
import turtle

culori = ["red", "orange", "gold", "green", "dodgerblue", "purple"]

screen = turtle.Screen()
screen.bgcolor("black")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)
t.pensize(2)

for i in range(12):
    t.color(culori[i % 6])
    for j in range(5):
        t.forward(90)
        t.right(144)
    t.right(30)

turtle.done()
```

**Ce vezi pe ecran:** pe fundal negru, **12 stele** colorate, care se învârt în jurul aceluiași punct (centrul ferestrei) și formează o **floare de stele**. Rotirea dintre stele este `360 / 12 = 30` de grade.

### Exemplul 7 — Inel de stele cu funcție

```python
import turtle

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def stea(marime, culoare):
    t.color(culoare)
    t.begin_fill()
    for i in range(5):
        t.forward(marime)
        t.right(144)
    t.end_fill()

def inel(numar, marime, distanta, culoare):
    for i in range(numar):
        t.penup()
        t.forward(distanta)
        t.pendown()
        stea(marime, culoare)
        t.penup()
        t.backward(distanta)
        t.right(360 / numar)

inel(8, 40, 100, "tomato")

turtle.done()
```

**Ce vezi pe ecran:** **8 stele roșii**, așezate **în cerc** în jurul centrului ferestrei, la distanța 100 de el.

Funcția `inel` merge cu `distanta` pași de la centru, desenează o stea, se întoarce în centru și se rotește cu `360 / numar`. Observă că funcția `stea` aici **nu primește poziția**: desenează chiar acolo unde se află țestoasa.

### Exemplul 8 — Spirala de stele

```python
import turtle

culori = ["red", "gold", "lime", "cyan", "magenta"]

screen = turtle.Screen()
screen.bgcolor("black")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)
t.pensize(2)

for i in range(100):
    t.color(culori[i % 5])
    t.forward(i * 2)
    t.right(144)

turtle.done()
```

**Ce vezi pe ecran:** o **spirală cu cinci brațe** în culorile roșu, auriu, verde deschis, azuriu și magenta. Este spirala din Lecția 3, dar cu unghiul `144°` de la stele: aceeași idee, alt rezultat.

---

## 6. Mandala completă

### Exemplul 9 — Inele diferite

```python
import turtle

screen = turtle.Screen()
screen.bgcolor("black")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)
t.pensize(2)

def stea(marime, culoare):
    t.color(culoare)
    t.begin_fill()
    for i in range(5):
        t.forward(marime)
        t.right(144)
    t.end_fill()

def inel(numar, marime, distanta, culoare):
    for i in range(numar):
        t.penup()
        t.forward(distanta)
        t.pendown()
        stea(marime, culoare)
        t.penup()
        t.backward(distanta)
        t.right(360 / numar)

inel(16, 25, 170, "gold")
inel(12, 35, 110, "orangered")
inel(6, 30, 50, "white")

turtle.done()
```

**Ce vezi pe ecran:** pe fundal negru, **trei inele de stele** unul în interiorul celuilalt: **16 stele aurii** la distanța 170, **12 stele roșii-portocalii** la 110 și **6 stele albe** la 50. Seamănă cu o rozetă de vitraliu.

Cheia este că după fiecare inel țestoasa a făcut exact un tur complet (`numar × 360 / numar = 360`), deci privește din nou spre dreapta și revine în centru. Putem lega oricâte inele!

### Exemplul 10 — Mandala mea

```python
import turtle

screen = turtle.Screen()
screen.setup(700, 600)
screen.bgcolor("midnightblue")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)
t.pensize(2)

def stea(marime, culoare):
    t.color(culoare)
    t.begin_fill()
    for i in range(5):
        t.forward(marime)
        t.right(144)
    t.end_fill()

def inel(numar, marime, distanta, culoare):
    for i in range(numar):
        t.penup()
        t.forward(distanta)
        t.pendown()
        stea(marime, culoare)
        t.penup()
        t.backward(distanta)
        t.right(360 / numar)

def mandala(straturi):
    for nr, marime, distanta, culoare in straturi:
        inel(nr, marime, distanta, culoare)
    t.dot(40, "white")

straturi = [
    (24, 22, 230, "deepskyblue"),
    (18, 28, 175, "gold"),
    (12, 32, 120, "hotpink"),
    (8, 28, 70, "lime"),
]

mandala(straturi)
t.goto(0, 268)
t.color("white")
t.write("Mandala mea", align="center", font=("Arial", 18, "bold"))

turtle.done()
```

**Ce vezi pe ecran:** pe fundal albastru închis, o **mandală cu 4 inele**: 24 de stele albastru-deschis în exterior, apoi 18 aurii, 12 roz și 8 verzi în centru. În mijloc este un **punct alb**, iar sus, deasupra mandalei, apare scris cu litere îngroșate textul **„Mandala mea”**.

Programul este ușor de schimbat: lista `straturi` conține, pentru fiecare inel, **numărul de stele, mărimea, distanța și culoarea**. Adaugi un strat nou, adăugând doar un rând în listă.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Mandala mea” (obligatoriu)
Pornește de la Exemplul 10 și creează **mandala ta**:
1. cel puțin **5 inele**, cu numere de stele și culori alese de tine;
2. folosește și **altă formă** pentru un inel (un cerc cu `dot` sau un pătrat) în afară de stele;
3. alege un fundal potrivit și scrie un **titlu** pe ecran;
4. păstrează funcția `mandala(straturi)`: schimbi doar lista.

### Exercițiul B — Ce desenează?
Gândește-te, apoi verifică în Thonny:

```python
import turtle

t = turtle.Turtle()
for i in range(7):
    t.forward(100)
    t.right(720 / 7)

turtle.done()
```

### Exercițiul C — Steaua cu orice număr
Scrie o funcție `stea_n(colturi, latura)` care desenează o stea cu `colturi` colțuri (impar) folosind formula `180 - 180 / colturi`. Desenează stele cu 5, 7, 9 și 11 colțuri.

### Exercițiul D — Găsește greșelile
Programul are 5 greșeli. Rescrie-l corect:

```text
import turtle
t = turtle.Turtle()
def stea(marime)
    for i in range(5)
        t.forward(marime)
        t.right(144
stea(100)
stea()
turtle.done
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce unghiul stelei este 144° și nu 72°?  
2. De ce rotim cu `360 / numar` când așezăm forme în cerc?  
3. Cum adaugi un nou inel în mandala din Exemplul 10?

**Gata când:**
- [ ] Mandala are cel puțin 5 inele și un titlu  
- [ ] Ai folosit și o altă formă decât steaua  
- [ ] Ai scris funcția `stea_n` și ai desenat 4 stele diferite  
- [ ] Ai explicat pe foaie unghiul de 144°  
- [ ] Fișierul se numește `Prenume_Nume_P3_L5.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Fă mandala **să se coloreze cu o listă** de culori, folosind `i % len(culori)`  
- [ ] Desenează un **fulg de zăpadă** cu 6 brațe, fiecare cu două ramuri mici  
- [ ] Desenează **steagul** unei țări cu stele (de exemplu al Uniunii Europene: 12 stele galbene în cerc, pe fundal albastru)  
- [ ] Fă un **cer înstelat** cu 100 de stele și 3 mărimi de stele  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Steaua arată ca un pentagon | Ai folosit 72° în loc de 144° | `t.right(144)` |
| Steaua nu se închide | Unghi greșit sau număr de repetări greșit | Pentru `n` colțuri impare: `n` repetări și `180 - 180 / n` |
| Inelul nu se închide ca un cerc | Lipsește rotirea `360 / numar` | `t.right(360 / numar)` la fiecare pas |
| Stelele nu sunt umplute | Lipsește `end_fill()` | Închide cu `t.end_fill()` |
| Toate stelele sunt în același loc | Ai uitat `goto` sau `forward(distanta)` înainte de desen | Mută țestoasa înainte de fiecare stea |
| Liniile unesc stelele între ele | Creionul a rămas jos la mutare | `penup()` înainte să mergi, `pendown()` înainte să desenezi |
| `TypeError: cannot unpack non-iterable int object` | La `for nr, marime, ... in straturi` ai pus numere simple în loc de grupuri | Fiecare strat este un grup: `(24, 22, 230, "gold")` |

---

## Recapitulare pe scurt

- Steaua cu 5 colțuri: `forward(l)` și `right(144)`, repetate de 5 ori.
- Pentru `n` colțuri impare, unghiul este `180 - 180 / n`.
- Un desen se închide când rotirea totală este un număr întreg de ture.
- Forme în cerc: mergi `distanta`, desenezi, te întorci, rotești `360 / numar`.
- Mandala = mai multe inele, fiecare cu alt număr, altă mărime și altă culoare.
- O listă de grupuri `(nr, marime, distanta, culoare)` descrie întreaga mandală.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Desenează un **cer înstelat** cu o lună și 50 de stele.  
3. Fă o **mandală nouă** cu 6 inele, în culori diferite față de cele din clasă.  
4. **Bonus:** desenează **trei mandale mici** pe același ecran, la poziții diferite.  
5. Salvează totul ca `Tema_P3_L5_Prenume_Nume.py`.

---

## Ce urmează — Lecția 6
**Tastatura: țestoasa pilot**: de acum controlăm țestoasa cu săgețile și transformăm desenul într-un joc.
