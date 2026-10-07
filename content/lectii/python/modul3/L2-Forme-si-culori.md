# LECȚIA 2 — Forme și culori
**Modulul 3 · Desenăm cu Turtle · 2 ore**  
**Code Maker Club · Turtle Artist**

> O țestoasă care desenează doar linii negre pe fundal alb e cam tristă. Azi o punem să folosească **culori**, să **umple** formele, să deseneze **cercuri** și orice formă cu oricâte laturi. La final desenezi un om de zăpadă.  
> Proiect: **„Omul de zăpadă”** · fișier: `Prenume_Nume_P3_L2.py`

---

## Obiectiv
La finalul orei schimbi culoarea și grosimea liniei, schimbi fundalul, desenezi triunghiuri, poligoane și cercuri, umpli forme cu culoare și folosești culori scrise ca nume sau ca cod.  
**Minim:** un triunghi și un cerc colorate.  
**Ținta orei (Complet):** + o formă umplută, un poligon cu număr de laturi la alegere și omul de zăpadă.

## De ce contează
Culorile fac desenul viu. În jocuri și aplicații, culorile arată ce este important: roșu pentru pericol, verde pentru „merge”. Aceleași comenzi le vei folosi și în Pygame.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L1 |
| 10–30 | Culoare, grosime, fundal (**Exemplele 1–2**) |
| 30–55 | Triunghi și umplere (**Exemplele 3–4**) |
| 55–80 | Cercuri și poligoane (**Exemplele 5–6**) |
| 80–95 | Culori din listă și coduri (**Exemplele 7–8**) |
| 95–105 | Semaforul (**Exemplul 9**) |
| 105–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L1

- `import turtle`, `t = turtle.Turtle()`, `turtle.done()` la final.
- `forward`, `left`, `right`, `penup`, `pendown`, `goto`.
- Pătratul: `for i in range(4)` cu `forward` și `left(90)`.

**Încearcă tu (3 min)**  
- [ ] Desenează un pătrat cu latura 80  

---

## 2. Culoare și fundal

### Exemplul 1 — Culoare și grosime

```python
import turtle

t = turtle.Turtle()
t.color("red")
t.pensize(5)
t.forward(100)

t.color("blue")
t.pensize(1)
t.left(90)
t.forward(100)

turtle.done()
```

**Ce vezi pe ecran:** o linie **roșie și groasă** spre dreapta, apoi o linie **albastră și subțire** în sus.

- `color("red")` schimbă culoarea (și a liniei, și a umplerii);
- `pensize(n)` schimbă grosimea liniei.

Poți folosi nume în engleză: `"red"`, `"blue"`, `"green"`, `"orange"`, `"purple"`, `"pink"`, `"yellow"`, `"black"`, `"white"`, `"gray"`, `"brown"`, `"gold"`, `"skyblue"`, `"lightblue"`.

### Exemplul 2 — Fundalul și titlul ferestrei

```python
import turtle

screen = turtle.Screen()
screen.bgcolor("black")
screen.title("Desenul meu")

t = turtle.Turtle()
t.color("yellow")
t.pensize(4)
for i in range(4):
    t.forward(100)
    t.left(90)

turtle.done()
```

**Ce vezi pe ecran:** o fereastră cu fundal **negru**, titlul „Desenul meu”, iar în ea un pătrat **galben**.

`turtle.Screen()` este **ecranul** (fereastra). Țestoasa este cea care desenează, ecranul este foaia. Cu `bgcolor` schimbi culoarea foii.

---

## 3. Triunghi și umplere

### Exemplul 3 — Triunghiul

```python
import turtle

t = turtle.Turtle()
t.color("green")
for i in range(3):
    t.forward(120)
    t.left(120)

turtle.done()
```

**Ce vezi pe ecran:** un **triunghi verde** cu laturile egale.

De ce 120? Când desenezi o formă închisă, țestoasa face în total **un tur complet (360°)**. Pentru 3 colțuri: 360 ÷ 3 = **120**. Pentru pătrat: 360 ÷ 4 = 90.

### Exemplul 4 — Umplem o formă

```python
import turtle

t = turtle.Turtle()
t.color("darkblue", "gold")
t.pensize(3)
t.begin_fill()
for i in range(4):
    t.forward(100)
    t.left(90)
t.end_fill()

turtle.done()
```

**Ce vezi pe ecran:** un pătrat cu **conturul albastru închis** și **interiorul galben (auriu)**.

- `color("darkblue", "gold")` — **primul** nume este culoarea liniei, **al doilea** este culoarea de umplere;
- `begin_fill()` spune „de aici încep să umplu”;
- `end_fill()` spune „am terminat, umple acum forma desenată”.

---

## 4. Cercuri și poligoane

### Exemplul 5 — Cercul

```python
import turtle

t = turtle.Turtle()
t.color("red", "pink")
t.begin_fill()
t.circle(60)
t.end_fill()

t.penup()
t.goto(-150, 0)
t.pendown()
t.dot(40, "green")

turtle.done()
```

**Ce vezi pe ecran:**
- un cerc cu raza 60, contur roșu și interior roz; țestoasa pornește din centrul ferestrei, iar cercul apare **deasupra** acestui punct, spre stânga direcției de mers;
- un **punct verde** plin, cu diametrul 40, în stânga.

`circle(raza)` desenează un cerc, iar `dot(mărime, culoare)` desenează un punct plin.

### Exemplul 6 — Orice poligon

```python
import turtle

laturi = 6
unghi = 360 / laturi
print("Unghiul de rotire:", unghi)

t = turtle.Turtle()
t.color("purple")
for i in range(laturi):
    t.forward(70)
    t.left(unghi)

turtle.done()
```

**Ieșire:**
```text
Unghiul de rotire: 60.0
```

**Ce vezi pe ecran:** un **hexagon** (6 laturi) mov.

Pune în `laturi` orice număr: `3` triunghi, `4` pătrat, `5` pentagon, `8` octogon, `12` aproape un cerc. Programul își calculează singur unghiul: `360 / laturi`.

---

## 5. Culori mai multe

### Exemplul 7 — Culori dintr-o listă

```python
import turtle

culori = ["red", "orange", "yellow", "green", "blue"]

t = turtle.Turtle()
t.speed(0)
t.pensize(4)
t.penup()
t.goto(-200, 0)
for culoare in culori:
    t.color(culoare)
    t.pendown()
    t.forward(60)
    t.penup()
    t.forward(20)

turtle.done()
```

**Ce vezi pe ecran:** **5 linii colorate** (roșu, portocaliu, galben, verde, albastru), cu mici spații între ele. Folosim un `for` direct pe lista de culori, ca în Modulul 2.

### Exemplul 8 — Culori cu cod

```python
import turtle

t = turtle.Turtle()
t.pensize(8)

t.color("#ff8800")
t.forward(100)

turtle.colormode(255)
t.color(30, 144, 255)
t.left(90)
t.forward(100)

turtle.done()
```

**Ce vezi pe ecran:** o linie **portocalie** spre dreapta, apoi o linie **albastră** în sus.

Există două feluri de a scrie o culoare cu cod:
- **cod hexazecimal**: `"#ff8800"` (cele trei perechi sunt cantitatea de roșu, verde și albastru);
- **trei numere** de la 0 la 255 (roșu, verde, albastru), după ce scrii `turtle.colormode(255)`.

---

## 6. Semafor și om de zăpadă

### Exemplul 9 — Semaforul

```python
import turtle

screen = turtle.Screen()
screen.bgcolor("lightgray")

t = turtle.Turtle()
t.hideturtle()
t.penup()

t.goto(0, 80)
t.dot(60, "red")
t.goto(0, 0)
t.dot(60, "yellow")
t.goto(0, -80)
t.dot(60, "green")

turtle.done()
```

**Ce vezi pe ecran:** pe fundal gri deschis, **trei cercuri una sub alta**: sus roșu, la mijloc galben, jos verde.

Cu `penup()` și `goto` mutăm țestoasa, iar `dot` pune un cerc plin acolo.

### Exemplul 10 — Omul de zăpadă

```python
import turtle

screen = turtle.Screen()
screen.bgcolor("skyblue")

t = turtle.Turtle()
t.speed(0)
t.color("black", "white")

# corpul: trei cercuri unul peste altul
for raza, y in [(50, -150), (35, -50), (25, 20)]:
    t.penup()
    t.goto(0, y)
    t.pendown()
    t.begin_fill()
    t.circle(raza)
    t.end_fill()

# ochii si nasul
t.penup()
t.goto(-10, 55)
t.dot(8, "black")
t.goto(10, 55)
t.dot(8, "black")
t.goto(0, 42)
t.dot(10, "orange")
t.hideturtle()

turtle.done()
```

**Ce vezi pe ecran:** pe fundal albastru deschis, un **om de zăpadă alb**: trei cercuri mari, mai mici spre vârf. Capul are doi ochi negri și un nas portocaliu.

Cum funcționează:
- fiecare cerc pornește de jos, din punctul `(0, y)`, și crește în sus; raza `50` pornește la `y = -150` și ajunge la `y = -50`, exact unde începe al doilea;
- bucla `for raza, y in [...]` primește pe rând perechile `(50, -150)`, `(35, -50)` și `(25, 20)`;
- ochii și nasul sunt trei puncte.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Omul de zăpadă” (obligatoriu)
Pornește de la Exemplul 10 și fă-l **al tău**:
1. schimbă culorile (fundal, corp, ochi);
2. adaugă **o pălărie** (un dreptunghi sau un pătrat umplut cu negru) pe cap;
3. adaugă **nasturi** (3 puncte pe corp);
4. adaugă un **soare** sau **nori** în colț;
5. scrie un titlu pe ecran, cu `write`.

### Exercițiul B — Ce desenează?
Gândește-te, apoi verifică în Thonny:

```python
import turtle

t = turtle.Turtle()
t.color("red", "yellow")
t.begin_fill()
for i in range(5):
    t.forward(80)
    t.left(72)
t.end_fill()

turtle.done()
```

### Exercițiul C — Poligoane colorate
Desenează, unul lângă altul, un **triunghi**, un **pătrat**, un **pentagon** și un **hexagon**, fiecare umplut cu altă culoare. Folosește pentru fiecare numărul de laturi și unghiul `360 / laturi`.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
import turtle
t = turtle.turtle()
t.color("red" "yellow")
t.begin_fill
for i in range(4):
t.forward(100)
    t.left(90)
t.end_fill()
turtle.done()
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce unghiul pentru triunghi este 120?  
2. La ce folosesc `begin_fill()` și `end_fill()`?  
3. Care este diferența dintre `Turtle()` și `Screen()`?

**Gata când:**
- [ ] Omul de zăpadă are pălărie, nasturi și un element de fundal  
- [ ] Ai folosit cel puțin 4 culori  
- [ ] Ai desenat cele 4 poligoane colorate  
- [ ] Ai explicat pe foaie unghiul de 120  
- [ ] Fișierul se numește `Prenume_Nume_P3_L2.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Desenează un **curcubeu** cu 7 arce, folosind o listă de culori și `circle` cu raze diferite  
- [ ] Desenează un **tren** din dreptunghiuri umplute și cercuri pentru roți  
- [ ] Desenează o **față zâmbitoare** (cerc galben, doi ochi, o gură)  
- [ ] Folosește `colormode(255)` și culori făcute de tine  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Forma nu se umple | Lipsește `end_fill()` | Închide cu `t.end_fill()` |
| Forma se umple ciudat | `begin_fill()` pus după desenarea formei | `begin_fill()` **înainte** de desen |
| `TurtleGraphicsError: bad color string: yelow` | Ai scris greșit numele culorii | `"yellow"`, nu `"yelow"` |
| `TurtleGraphicsError: bad color sequence` | Lipsește `colormode(255)` la culorile cu trei numere | `turtle.colormode(255)` înainte |
| Poligonul nu se închide | Unghiul nu este `360 / laturi` | Calculează unghiul corect |
| Cercurile se suprapun | Toate pornesc din același punct | Mută țestoasa cu `penup` + `goto` între ele |
| `AttributeError: 'Turtle' object has no attribute 'bgcolor'` | `bgcolor` aparține ecranului | `turtle.Screen().bgcolor(...)` |

---

## Recapitulare pe scurt

- `color("contur", "umplere")` setează culorile; `pensize(n)` grosimea.
- `begin_fill()` ... `end_fill()` umple forma desenată între ele.
- Un poligon cu `n` laturi se desenează cu rotiri de `360 / n` grade.
- `circle(raza)` desenează cerc; `dot(mărime, culoare)` desenează un punct.
- Culorile pot fi nume, cod `"#rrggbb"` sau trei numere după `colormode(255)`.
- Fundalul se schimbă cu `Screen().bgcolor(...)`.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Desenează un **steag** (trei dungi colorate).  
3. Desenează **o floare**: cerc galben în mijloc și 6 cercuri roz în jur (muți țestoasa cu `goto`).  
4. **Bonus:** desenează un **semafor** complet, cu o cutie neagră în spatele celor trei lumini.  
5. Salvează totul ca `Tema_P3_L2_Prenume_Nume.py`.

---

## Ce urmează — Lecția 3
**Spirale și modele cu bucle**: desene care cresc, se rotesc și își schimbă culorile singure.
