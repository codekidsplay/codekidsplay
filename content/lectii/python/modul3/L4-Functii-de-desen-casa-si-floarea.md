# LECȚIA 4 — Funcții de desen: casa și floarea
**Modulul 3 · Desenăm cu Turtle · 2 ore**  
**Code Maker Club · Turtle Artist**

> Ai învățat funcțiile în Modulul 2. Acum le punem la treabă: o funcție `casa()` desenează o casă, o funcție `copac()` desenează un copac, iar tu le folosești de câte ori vrei, oriunde pe ecran, cu orice culoare. Așa se construiește un sat întreg.  
> Proiect: **„Satul meu”** · fișier: `Prenume_Nume_P3_L4.py`

---

## Obiectiv
La finalul orei scrii funcții de desen cu parametri (poziție, mărime, culoare), construiești forme mari din forme mici (casă = pătrat + triunghi), desenezi o floare din petale și compui un peisaj cu mai multe funcții.  
**Minim:** o funcție `patrat(latura)` și o funcție `casa(...)`.  
**Ținta orei (Complet):** + floarea, copacul și satul din mini-proiect.

## De ce contează
Un program mare nu se scrie dintr-o bucată. Se împarte în **piese mici** (funcții), iar piesele se combină. Într-un joc vei avea funcții pentru `deseneaza_jucator()`, `deseneaza_inamic()` și altele. Azi exersăm exact asta.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L3 și funcții |
| 10–30 | Funcție fără și cu parametri (**Exemplele 1–2**) |
| 30–55 | Dreptunghi, triunghi, cerc cu poziție și culoare (**Exemplele 3–4**) |
| 55–65 | `return` într-o funcție de desen (**Exemplul 5**) |
| 65–85 | Casa (**Exemplul 6**) |
| 85–100 | Floarea (**Exemplul 7**) |
| 100–118 | Copacul, rândul de case, satul (**Exemplele 8–10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L3 și Modulul 2

- O funcție se definește cu `def nume(parametri):` și se apelează cu `nume(valori)`.
- Corpul funcției este **indentat**.
- Bucla `for` repetă; `penup` / `goto` / `pendown` mută țestoasa.

**Încearcă tu (3 min)**  
- [ ] Scrie o funcție `salut(nume)` care afișează „Salut, ...!”  

---

## 2. Prima funcție de desen

### Exemplul 1 — Funcția `patrat()`

```python
import turtle

t = turtle.Turtle()

def patrat():
    for i in range(4):
        t.forward(60)
        t.left(90)

patrat()
t.forward(100)
patrat()

turtle.done()
```

**Ce vezi pe ecran:** **două pătrate** cu latura 60, la 100 de pași distanță unul de celălalt, unite printr-o linie în partea de jos.

Funcția se definește o dată și se apelează de două ori. Fiecare apel desenează un pătrat. Observă că funcția folosește țestoasa `t`, creată înainte de ea.

### Exemplul 2 — Funcție cu parametru

```python
import turtle

t = turtle.Turtle()

def patrat(latura):
    for i in range(4):
        t.forward(latura)
        t.left(90)

patrat(30)
patrat(60)
patrat(90)

turtle.done()
```

**Ce vezi pe ecran:** **trei pătrate** de mărimi diferite (30, 60, 90), toate pornind din același colț (centrul ferestrei), unul în interiorul celuilalt.

Parametrul `latura` ne lasă să alegem mărimea la fiecare apel.

---

## 3. Forme cu poziție și culoare

### Exemplul 3 — Dreptunghiul

```python
import turtle

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def dreptunghi(x, y, l, h, culoare):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    for i in range(2):
        t.forward(l)
        t.left(90)
        t.forward(h)
        t.left(90)
    t.end_fill()

dreptunghi(-150, -50, 100, 60, "red")
dreptunghi(-20, -50, 60, 100, "blue")
dreptunghi(70, -50, 80, 80, "green")

turtle.done()
```

**Ce vezi pe ecran:** **trei dreptunghiuri pline**, lipite pe aceeași linie de jos (`y = -50`): unul **roșu** lat, unul **albastru** înalt și unul **verde** pătrat.

Funcția primește: `x`, `y` (colțul din stânga-jos), `l` (lățimea), `h` (înălțimea) și `culoare`. Ea își mută singură țestoasa și o orientează spre dreapta (`setheading(0)`), deci o poți apela oricând.

### Exemplul 4 — Triunghi și cerc

```python
import turtle

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def triunghi(x, y, l, culoare):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    for i in range(3):
        t.forward(l)
        t.left(120)
    t.end_fill()

def cerc(x, y, r, culoare):
    t.penup()
    t.goto(x, y - r)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    t.circle(r)
    t.end_fill()

triunghi(-150, -40, 100, "orange")
cerc(50, 10, 50, "purple")

turtle.done()
```

**Ce vezi pe ecran:** un **triunghi portocaliu** (baza jos, la stânga) și un **cerc mov** cu centrul în `(50, 10)` și raza 50.

În funcția `cerc` punem țestoasa la `y - r`, adică **sub** centru, pentru că `circle` desenează în sus de la punctul de plecare. Așa, `x` și `y` sunt chiar **centrul** cercului, mult mai ușor de folosit.

---

## 4. O funcție care dă o valoare

### Exemplul 5 — Desenăm și calculăm

```python
import turtle

t = turtle.Turtle()
t.speed(0)

def patrat(latura):
    for i in range(4):
        t.forward(latura)
        t.left(90)
    return 4 * latura

perimetru = patrat(70)
print("Perimetrul este:", perimetru)
print("Aria este:", 70 * 70)

turtle.done()
```

**Ieșire:**
```text
Perimetrul este: 280
Aria este: 4900
```

**Ce vezi pe ecran:** un pătrat cu latura 70.

O funcție de desen poate și să **returneze** o valoare, aici perimetrul. Desenul apare pe ecran, iar numerele apar în fereastra de text din Thonny.

---

## 5. Casa

### Exemplul 6 — Funcția `casa()`

```python
import turtle

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def dreptunghi(x, y, l, h, culoare):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    for i in range(2):
        t.forward(l)
        t.left(90)
        t.forward(h)
        t.left(90)
    t.end_fill()

def triunghi(x, y, l, culoare):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    for i in range(3):
        t.forward(l)
        t.left(120)
    t.end_fill()

def casa(x, y, m, culoare):
    dreptunghi(x, y, m, m, culoare)
    triunghi(x, y + m, m, "firebrick")
    dreptunghi(x + m * 0.4, y, m * 0.2, m * 0.4, "saddlebrown")
    dreptunghi(x + m * 0.1, y + m * 0.55, m * 0.2, m * 0.2, "lightyellow")

casa(-150, -80, 120, "khaki")
casa(30, -80, 80, "lightblue")

turtle.done()
```

**Ce vezi pe ecran:** **două case** pe aceeași linie de jos: una mare, galben-nisipie, și una mai mică, albastră. Fiecare are **acoperiș roșu-cărămiziu**, **ușă maro** în partea de jos și **fereastră** galben deschis.

Funcția `casa` nu desenează nimic direct, ci **apelează alte funcții**:
- corpul casei: un pătrat `m × m`;
- acoperișul: un triunghi cu baza pe marginea de sus, la înălțimea `y + m`;
- ușa: lățime 20% și înălțime 40% din `m`, la mijloc (`x + m * 0.4`);
- fereastra: la 10% din stânga și la 55% din înălțime.

Pentru că folosim `m` peste tot, **toată casa se mărește sau se micșorează odată cu `m`**.

---

## 6. Floarea

### Exemplul 7 — Petala și floarea

```python
import turtle

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def petala(raza, culoare):
    t.color("black", culoare)
    t.begin_fill()
    t.circle(raza, 60)
    t.left(120)
    t.circle(raza, 60)
    t.left(120)
    t.end_fill()

petala(100, "pink")
print("Dupa o petala:", round(t.xcor(), 1) + 0, round(t.ycor(), 1) + 0, round(t.heading()))

turtle.done()
```

**Ieșire:**
```text
Dupa o petala: 0.0 0.0 0
```

**Ce vezi pe ecran:** o **petală roz** (formă de frunză cu două vârfuri), cu conturul negru.

Petala este făcută din **două arce de 60°** (`circle(raza, 60)` desenează doar o parte din cerc). Țestoasa se rotește cu 120° între arce. La final, ea se întoarce **exact în punctul de plecare** și privește în aceeași direcție, cum arată și rândul `print`: `0.0 0.0 0`. (Adunarea cu `+ 0` doar evită afișarea unui `-0.0`, rămas uneori din calcule.) Din acest motiv putem repeta petala.

Acum **floarea**, în care petala se repetă:

```python
import turtle

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def petala(raza, culoare):
    t.color("black", culoare)
    t.begin_fill()
    t.circle(raza, 60)
    t.left(120)
    t.circle(raza, 60)
    t.left(120)
    t.end_fill()

def floare(petale, raza, culoare):
    for i in range(petale):
        petala(raza, culoare)
        t.right(360 / petale)

floare(8, 80, "orange")

turtle.done()
```

**Ce vezi pe ecran:** o **floare cu 8 petale** portocalii, care pornesc toate din centrul ferestrei, rotite cu `360 / 8 = 45` de grade una față de alta.

Încearcă `floare(12, 80, "violet")` sau `floare(6, 100, "red")`: aceeași funcție, alte flori!

---

## 7. Copacul și rândul de case

### Exemplul 8 — Copacul și soarele

```python
import turtle

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def dreptunghi(x, y, l, h, culoare):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    for i in range(2):
        t.forward(l)
        t.left(90)
        t.forward(h)
        t.left(90)
    t.end_fill()

def cerc(x, y, r, culoare):
    t.penup()
    t.goto(x, y - r)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    t.circle(r)
    t.end_fill()

def copac(x, y):
    dreptunghi(x - 8, y, 16, 50, "saddlebrown")
    cerc(x, y + 75, 35, "darkgreen")

def soare(x, y):
    cerc(x, y, 40, "gold")

copac(-100, -100)
copac(0, -100)
copac(100, -100)
soare(150, 120)

turtle.done()
```

**Ce vezi pe ecran:** **trei copaci** identici (trunchi maro, coroană verde închis), la 100 de pași distanță unul de altul, și un **soare auriu** sus, în dreapta.

Copacul este desenat în jurul lui `x`: trunchiul începe la `x - 8` și are lățimea 16, deci este **centrat**. Coroana este un cerc cu centrul la `y + 75`, adică exact deasupra trunchiului (care are înălțimea 50, iar raza coroanei este 35, deci coroana începe la `y + 40` și se suprapune puțin peste trunchi).

### Exemplul 9 — Un rând de case, cu buclă

```python
import turtle

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def dreptunghi(x, y, l, h, culoare):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    for i in range(2):
        t.forward(l)
        t.left(90)
        t.forward(h)
        t.left(90)
    t.end_fill()

def triunghi(x, y, l, culoare):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    for i in range(3):
        t.forward(l)
        t.left(120)
    t.end_fill()

def casa(x, y, m, culoare):
    dreptunghi(x, y, m, m, culoare)
    triunghi(x, y + m, m, "firebrick")
    dreptunghi(x + m * 0.4, y, m * 0.2, m * 0.4, "saddlebrown")

culori = ["khaki", "lightblue", "pink", "lightgreen"]

for i in range(4):
    casa(-200 + i * 110, -80, 80, culori[i])

turtle.done()
```

**Ce vezi pe ecran:** un **rând de 4 case** de aceeași mărime (80), la 110 de pași distanță, în culori diferite: nisipiu, albastru, roz și verde deschis.

Bucla apelează funcția `casa` de 4 ori, iar `culori[i]` alege culoarea. O stradă întreagă a costat doar două rânduri!

---

## 8. Mini-proiect

### Exemplul 10 — Satul meu

```python
import turtle

screen = turtle.Screen()
screen.setup(700, 500)
screen.bgcolor("skyblue")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def dreptunghi(x, y, l, h, culoare):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    for i in range(2):
        t.forward(l)
        t.left(90)
        t.forward(h)
        t.left(90)
    t.end_fill()

def triunghi(x, y, l, culoare):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    for i in range(3):
        t.forward(l)
        t.left(120)
    t.end_fill()

def cerc(x, y, r, culoare):
    t.penup()
    t.goto(x, y - r)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    t.circle(r)
    t.end_fill()

def casa(x, y, m, culoare):
    dreptunghi(x, y, m, m, culoare)
    triunghi(x, y + m, m, "firebrick")
    dreptunghi(x + m * 0.4, y, m * 0.2, m * 0.4, "saddlebrown")
    dreptunghi(x + m * 0.1, y + m * 0.55, m * 0.2, m * 0.2, "lightyellow")

def copac(x, y):
    dreptunghi(x - 8, y, 16, 50, "saddlebrown")
    cerc(x, y + 75, 35, "darkgreen")

def soare(x, y):
    cerc(x, y, 40, "gold")

def nor(x, y):
    cerc(x, y, 25, "white")
    cerc(x + 30, y + 10, 30, "white")
    cerc(x + 60, y, 25, "white")

def peisaj():
    dreptunghi(-350, -250, 700, 120, "forestgreen")
    soare(260, 170)
    nor(-250, 160)
    nor(0, 190)
    casa(-250, -130, 120, "khaki")
    casa(-60, -130, 100, "lightblue")
    copac(150, -130)
    copac(230, -130)

peisaj()

turtle.done()
```

**Ce vezi pe ecran:** o **fereastră de 700 × 500**, cu cer albastru și o fâșie de **iarbă verde** jos. Pe iarbă: două case (una galbenă, mare, și una albastră, mai mică), doi copaci, iar pe cer: un soare auriu și doi nori albi.

Programul are 7 funcții mici și o funcție `peisaj()` care le aduce împreună. Dacă vrei un peisaj nou, **schimbi doar `peisaj()`**. Rândul `screen.setup(700, 500)` stabilește mărimea ferestrei (lățime 700, înălțime 500), deci coordonatele merg de la -350 la 350 pe `x` și de la -250 la 250 pe `y`.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Satul meu” (obligatoriu)
Pornește de la Exemplul 10 și fă-l **al tău**. Trebuie să ai:
1. cel puțin **3 case** de mărimi și culori diferite;
2. cel puțin **3 copaci**;
3. **soare** și **nori**;
4. **cel puțin două funcții noi**, scrise de tine (de exemplu `gard()`, `masina()`, `floare()`, `luna()`, `pasare()`);
5. toate apelurile grupate într-o funcție `peisaj()`.

### Exercițiul B — Ce desenează?
Gândește-te, apoi verifică în Thonny:

```python
import turtle

t = turtle.Turtle()

def forma(n):
    for i in range(n):
        t.forward(60)
        t.left(360 / n)

forma(3)
forma(4)
forma(6)

turtle.done()
```

### Exercițiul C — Steagul
Scrie funcția `steag(x, y, culoare1, culoare2, culoare3)` care desenează **trei dungi verticale** lipite, fiecare de câte 40 × 80, folosind funcția `dreptunghi`. Desenează steagul României: albastru, galben, roșu.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
import turtle
t = turtle.Turtle()
triunghi(100)
def patrat(latura)
    for i in range(4):
        t.forward(latura)
        t.left(90)
def triunghi(l):
    for i in range(3):
        t.forward(l)
        t.left(120)
patrat()
patrat(50, 60)
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce este mai bine să avem o funcție `casa` decât să copiem codul casei de 3 ori?  
2. De ce în funcția `cerc` mutăm țestoasa la `y - r`?  
3. De ce funcțiile noastre încep cu `setheading(0)`?

**Gata când:**
- [ ] Satul are cel puțin 3 case, 3 copaci, soare și nori  
- [ ] Ai scris cel puțin 2 funcții noi  
- [ ] Toate se apelează dintr-o funcție `peisaj()`  
- [ ] Ai desenat steagul României  
- [ ] Ai explicat pe foaie de ce folosim funcții  
- [ ] Fișierul se numește `Prenume_Nume_P3_L4.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Fă o funcție `strada(numar)` care desenează `numar` case una lângă alta, cu o buclă  
- [ ] Desenează o **grădină** cu 5 flori de culori diferite, la poziții diferite  
- [ ] Desenează o **mașină** (dreptunghi, geamuri, 2 roți)  
- [ ] Adaugă **noaptea**: o a doua funcție `peisaj_noapte()` cu fundal negru, lună și stele  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Nu se desenează nimic | Ai definit funcția, dar nu ai apelat-o | Adaugă `casa(...)` sau `peisaj()` |
| `NameError: name 'casa' is not defined` | Ai apelat funcția înainte să o definești | Definește funcțiile deasupra |
| `TypeError: casa() missing 1 required positional argument` | Ai dat prea puține valori | Dă toate argumentele: `casa(x, y, m, culoare)` |
| `NameError: name 't' is not defined` | Ai folosit `t` înainte de `t = turtle.Turtle()` | Creează țestoasa **înainte** de a apela funcțiile |
| Forma începe în alt loc și apar linii în plus | Lipsește `penup()` înainte de `goto` | `penup`, `goto`, `pendown` |
| Forma se desenează întoarsă | Țestoasa a rămas rotită de la desenul anterior | `setheading(0)` la începutul funcției |
| Forma are altă culoare decât te aștepți | Funcția nu își setează culoarea și folosește culoarea rămasă de la desenul anterior | Pune `t.color(...)` la începutul **fiecărei** funcții |

---

## Recapitulare pe scurt

- O funcție de desen primește **poziție**, **mărime** și **culoare** ca parametri.
- Fiecare funcție începe cu `penup`, `goto`, `setheading(0)`, `pendown`.
- Formele complexe se compun din cele simple: casa = dreptunghi + triunghi + ușă + fereastră.
- Dimensiunile se calculează din `m`, deci casa se poate mări sau micșora.
- `circle(raza, grade)` desenează doar un arc: din arce se fac petale.
- O funcție `peisaj()` aduce împreună toate piesele.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Adaugă în sat o **biserică** sau o **școală** (o funcție nouă).  
3. Desenează **o grădină** de flori cu 4 culori.  
4. **Bonus:** pune toate casele într-o buclă, cu mărimi care cresc (`m = 60 + i * 15`).  
5. Salvează totul ca `Tema_P3_L4_Prenume_Nume.py`.

---

## Ce urmează — Lecția 5
**Stele și mandale**: desene din linii drepte și arce, cu modele care se repetă de zeci de ori.
