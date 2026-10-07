# LECȚIA 3 — Spirale și modele cu bucle
**Modulul 3 · Desenăm cu Turtle · 2 ore**  
**Code Maker Club · Turtle Artist**

> Cele mai frumoase desene Turtle sunt făcute din **repetiții**: o formă mică, repetată de zeci de ori, cu o mică schimbare de fiecare dată. Azi desenăm spirale, rozete, soare și galaxii cu doar câteva rânduri de cod.  
> Proiect: **„Galaxia mea”** · fișier: `Prenume_Nume_P3_L3.py`

---

## Obiectiv
La finalul orei folosești variabila `i` din bucla `for` ca să schimbi lungimea, culoarea și grosimea liniei, desenezi spirale și rozete, folosești o buclă în altă buclă și construiești un desen cu mai multe brațe colorate.  
**Minim:** o spirală pătrată și o rozetă din cercuri.  
**Ținta orei (Complet):** + o spirală colorată, o grilă de puncte și galaxia din mini-proiect.

## De ce contează
În jocuri și în grafică, un model frumos se repetă de multe ori. Dacă înțelegi cum o variabilă dintr-o buclă „creează” modele, poți desena aproape orice: de la o tapetă la un fulg de zăpadă.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L2 |
| 10–35 | Spirale (**Exemplele 1–2**) |
| 35–55 | Spirala colorată cu `%` (**Exemplul 3**) |
| 55–80 | Cercuri imbricate și rozete (**Exemplele 4–6**) |
| 80–95 | Buclă în buclă (**Exemplul 7**) |
| 95–105 | Soarele și spirala groasă (**Exemplele 8–9**) |
| 105–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L2

- `color`, `pensize`, `begin_fill` / `end_fill`, `circle`, `dot`.
- Poligon cu `n` laturi: rotire de `360 / n`.
- `for i in range(n)`: variabila `i` ia valorile `0, 1, 2, ..., n-1`.
- `%` dă restul împărțirii: `7 % 3` este `1`.

**Încearcă tu (3 min)**  
- [ ] Desenează un hexagon verde  

---

## 2. Spirale

Ideea este simplă: la fiecare pas, țestoasa merge **mai mult** decât înainte și se rotește. Variabila `i` crește, așa că și drumul crește.

### Exemplul 1 — Spirala pătrată

```python
import turtle

t = turtle.Turtle()
t.speed(0)
for i in range(40):
    t.forward(i * 5)
    t.left(90)

turtle.done()
```

**Ce vezi pe ecran:** o **spirală pătrată** care pornește din centru și se desface spre exterior. Liniile devin tot mai lungi: prima este 0, a doua 5, a treia 10 și așa mai departe, până la 195.

### Exemplul 2 — Alt unghi, altă spirală

```python
import turtle

t = turtle.Turtle()
t.speed(0)
for i in range(60):
    t.forward(i * 4)
    t.left(120)

turtle.done()
```

**Ce vezi pe ecran:** o **spirală triunghiulară** (colțurile sunt de 60°). Observă ce se întâmplă când schimbi unghiul: `90` dă pătrate, `120` dă triunghiuri. Încearcă și `72`, `144`, sau un număr „aproape” de 90, ca `91`: spirala începe să se **răsucească**.

---

## 3. Spirala colorată

### Exemplul 3 — Culoarea se schimbă

```python
import turtle

culori = ["red", "orange", "yellow", "green", "blue", "purple"]

screen = turtle.Screen()
screen.bgcolor("black")

t = turtle.Turtle()
t.speed(0)
t.pensize(2)
for i in range(90):
    t.color(culori[i % 6])
    t.forward(i * 2)
    t.left(61)

turtle.done()
```

**Ce vezi pe ecran:** pe fundal negru, o **spirală răsucită**, ale cărei linii se schimbă ciclic: roșu, portocaliu, galben, verde, albastru, mov, apoi din nou roșu.

Cum merge: `i % 6` este restul împărțirii la 6, deci ia pe rând valorile `0, 1, 2, 3, 4, 5, 0, 1, ...`. Așa alegem din listă culoarea numărul `0`, `1`, ..., `5`, apoi o luăm de la capăt. Poți folosi `%` ori de câte ori vrei să parcurgi o listă în cerc.

---

## 4. Cercuri și rozete

### Exemplul 4 — Cercuri imbricate

```python
import turtle

t = turtle.Turtle()
t.speed(0)
t.pensize(2)
for i in range(1, 7):
    t.circle(i * 15)

turtle.done()
```

**Ce vezi pe ecran:** **6 cercuri**, unul în interiorul celuilalt, care se ating toate în punctul de plecare (jos). Razele sunt 15, 30, 45, 60, 75 și 90.

Observă `range(1, 7)`: pornește de la `1`, ca să nu desenăm un cerc cu raza 0.

### Exemplul 5 — Rozeta din cercuri

```python
import turtle

screen = turtle.Screen()
screen.bgcolor("black")

t = turtle.Turtle()
t.color("cyan")
t.speed(0)
for i in range(36):
    t.circle(80)
    t.right(10)

turtle.done()
```

**Ce vezi pe ecran:** pe fundal negru, o **rozetă** albastru-deschis formată din **36 de cercuri** de rază 80. Toate trec prin centrul ferestrei, dar sunt rotite cu câte 10° unul față de altul (36 × 10° = 360°).

### Exemplul 6 — Pătrate rotite

```python
import turtle

t = turtle.Turtle()
t.speed(0)
t.color("darkgreen")
for i in range(36):
    for j in range(4):
        t.forward(100)
        t.left(90)
    t.right(10)

turtle.done()
```

**Ce vezi pe ecran:** o **floare geometrică** făcută din 36 de pătrate rotite cu câte 10° în jurul aceluiași colț.

Aici avem **o buclă în altă buclă**: bucla de afară (`i`) repetă de 36 de ori, iar bucla din interior (`j`) desenează un pătrat. Pentru fiecare valoare a lui `i`, bucla din interior face un pătrat întreg.

---

## 5. Buclă în buclă

### Exemplul 7 — Grila de puncte

```python
import turtle

t = turtle.Turtle()
t.hideturtle()
t.speed(0)
t.penup()

numar = 0
for rand in range(4):
    for coloana in range(5):
        if (rand + coloana) % 2 == 0:
            culoare = "red"
        else:
            culoare = "blue"
        t.goto(-100 + coloana * 50, 75 - rand * 50)
        t.dot(30, culoare)
        numar += 1

print("Puncte desenate:", numar)
turtle.done()
```

**Ieșire:**
```text
Puncte desenate: 20
```

**Ce vezi pe ecran:** o **grilă cu 4 rânduri și 5 coloane** de puncte, alternativ roșii și albastre (ca o tablă de șah).

- pentru fiecare rând (`rand`) parcurgem toate cele 5 coloane (`coloana`): 4 × 5 = **20** de puncte;
- poziția fiecărui punct se calculează din `rand` și `coloana`: `x = -100 + coloana * 50`, iar `y = 75 - rand * 50`;
- `(rand + coloana) % 2 == 0` alternează culorile.

---

## 6. Soarele și spirala groasă

### Exemplul 8 — Soarele cu raze

```python
import turtle

screen = turtle.Screen()
screen.bgcolor("skyblue")

t = turtle.Turtle()
t.speed(0)
t.pensize(3)
t.color("orange")
for i in range(36):
    t.forward(120)
    t.backward(120)
    t.left(10)

t.color("gold")
t.dot(100)
t.hideturtle()

turtle.done()
```

**Ce vezi pe ecran:** pe cer albastru, un **soare**: 36 de raze portocalii care pornesc din centru, iar peste ele un disc auriu (diametrul 100).

Fiecare rază înseamnă „înainte 120, înapoi 120, rotire 10°”. Discul auriu se desenează la urmă, ca să acopere începutul razelor.

### Exemplul 9 — Linie tot mai groasă

```python
import turtle

culori = ["red", "orange", "yellow", "green", "blue", "purple", "pink"]

screen = turtle.Screen()
screen.bgcolor("black")

t = turtle.Turtle()
t.speed(0)
for i in range(100):
    t.color(culori[i % 7])
    t.pensize(1 + i // 20)
    t.forward(i * 2)
    t.left(59)

turtle.done()
```

**Ce vezi pe ecran:** o **spirală în culorile curcubeului**, în care linia devine tot mai **groasă**. Grosimea este `1 + i // 20`: primele 20 de linii au grosimea 1, următoarele 20 au 2 și tot așa, până la 5.

(`//` este împărțirea întreagă: `45 // 20` este `2`.)

---

## 7. Mini-proiect

### Exemplul 10 — Galaxia

```python
import turtle

culori = ["red", "orange", "yellow", "green", "cyan", "violet"]

screen = turtle.Screen()
screen.bgcolor("black")

t = turtle.Turtle()
t.speed(0)
t.hideturtle()
t.pensize(2)

for brat in range(6):
    t.penup()
    t.home()
    t.setheading(brat * 60)
    t.pendown()
    t.color(culori[brat])
    for i in range(40):
        t.forward(2 + i * 0.3)
        t.left(4)

turtle.done()
```

**Ce vezi pe ecran:** pe fundal negru, o **galaxie** cu **6 brațe curbate**, fiecare de altă culoare, care pornesc din centru și se curbează în același sens.

- `t.home()` duce țestoasa în centru (și o orientează spre dreapta);
- `t.setheading(brat * 60)` o rotește la 0°, 60°, 120°... deci brațele pleacă la distanțe egale;
- bucla `for i in range(40)` desenează un braț: pași tot mai lungi, cu o mică rotire de 4° la fiecare pas.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Galaxia mea” (obligatoriu)
Pornește de la Exemplul 10 și fă-o **a ta**:
1. schimbă numărul brațelor (8 brațe: unghi `360 / 8`; 5 brațe: `360 / 5`);
2. alege-ți propriile culori;
3. adaugă **stele**: 30 de puncte mici albe la poziții aleatoare (`import random` și `random.randint(-300, 300)` pentru `x` și `y`; mută țestoasa cu `penup` și `goto`);
4. adaugă un **disc luminos** în centru, cu `dot`.

### Exercițiul B — Ce desenează?
Gândește-te, apoi verifică în Thonny:

```python
import turtle

t = turtle.Turtle()
t.speed(0)
for i in range(8):
    t.forward(100)
    t.left(135)

turtle.done()
```

### Exercițiul C — Rozeta ta
Desenează o rozetă din **cercuri cu raza 60**, rotite cu **15°**. Câte cercuri îți trebuie ca să faci un tur complet?

### Exercițiul D — Găsește greșelile
Programul are 3 greșeli. Rescrie-l corect:

```text
import turtle
culori = ["red", "blue", "green"]
t = turtle.Turtle()
for i in range(30)
    t.color(culori[i % 4])
    t.forward(i * 5)
    t.left(90)
turtle.Done()
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce spirala se desface când folosim `forward(i * 5)`?  
2. Ce valori ia `i % 6` când `i` merge de la 0 la 12?  
3. Ce înseamnă o buclă în altă buclă?

**Gata când:**
- [ ] Galaxia are numărul brațelor și culorile alese de tine  
- [ ] Ai adăugat stele aleatoare și un disc în centru  
- [ ] Ai desenat și rozeta cu cercuri de rază 60  
- [ ] Ai explicat pe foaie `i % 6`  
- [ ] Fișierul se numește `Prenume_Nume_P3_L3.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Desenează un **fulg de zăpadă**: 6 brațe cu mici ramuri  
- [ ] Fă o grilă **10 × 10** de puncte cu culori alese din listă  
- [ ] Desenează o **spirală din cercuri** (`circle(i)`) care crește  
- [ ] Încearcă `left(89)`, `left(91)` și `left(145)` la spirala din Exemplul 3 și notează ce se schimbă  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `IndexError: list index out of range` | Ai folosit `i % 4` la o listă cu 3 culori | Folosește `i % len(culori)` |
| Spirala iese din fereastră | Pașii cresc prea mult | Micșorează înmulțirea sau numărul de repetări |
| Primul pas nu se vede | `i` pornește de la 0 și `forward(0)` nu desenează | Folosește `range(1, n)` |
| Toate cercurile se suprapun perfect | Raza nu depinde de `i` | `t.circle(i * 15)` |
| Brațele galaxiei pornesc din alt loc | Lipsește `home()` | `t.home()` după `penup()` |
| Desenul se face foarte încet | Viteza este mică | `t.speed(0)` |
| `TypeError: 'float' object cannot be interpreted as an integer` | Ai dat un număr cu zecimale lui `range` | `range(int(...))` |

---

## Recapitulare pe scurt

- Variabila `i` dintr-un `for` poate controla lungimea, culoarea, grosimea.
- Spirala = pași tot mai lungi + o rotire constantă.
- `i % n` parcurge o listă în cerc (restul împărțirii).
- Rozeta = aceeași formă repetată, rotită cu `360 / repetări` grade.
- O buclă în altă buclă repetă de „rânduri × coloane” ori.
- `home()` și `setheading(grade)` duc țestoasa în centru și o orientează.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Desenează o **tablă de șah 8 × 8** din puncte mari sau din pătrate.  
3. Desenează **trei spirale** cu unghiuri diferite (90, 120, 72) și notează cum arată.  
4. **Bonus:** desenează un **curcubeu spiralat** pe fundal negru.  
5. Salvează totul ca `Tema_P3_L3_Prenume_Nume.py`.

---

## Ce urmează — Lecția 4
**Funcții de desen**: învățăm să punem un desen într-o funcție și să-l reutilizăm pentru a face o casă și o floare.
