# LECȚIA 10 — Proiect: galeria mea de artă
**Modulul 3 · Desenăm cu Turtle · 2 ore**  
**Code Maker Club · Turtle Artist**

> Ai învățat să desenezi forme, culori, spirale, mandale, să folosești funcții, tastatura și mouse-ul. Azi le strângem pe toate într-o **galerie de artă**: apeși o tastă și apare o altă operă. Fiecare operă este o funcție, iar galeria este semnată de tine.  
> Proiect: **„Galeria mea de artă”** · fișier: `Prenume_Nume_P3_L10.py`

---

## Obiectiv
La finalul orei ai o galerie interactivă cu cel puțin 5 opere, un meniu pe ecran, taste pentru fiecare operă, ștergerea ecranului și semnătura ta pe fiecare desen.  
**Minim:** 3 opere care se schimbă cu tastele 1, 2, 3.  
**Ținta orei (Complet):** + 5 opere, meniu, semnătură și o operă proprie.

## De ce contează
Un proiect mare nu este „o singură bucată de cod”, ci **piese mici care se potrivesc**: funcții pentru desen, un dicționar care le leagă de taste, un meniu. Așa arată programele adevărate, iar tu poți adăuga oricând o piesă nouă.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare Modulul 3 |
| 10–30 | O operă = o funcție (**Exemplele 1–2**) |
| 30–55 | Opere cu parametri: spirală, mandală, cer (**Exemplele 3–5**) |
| 55–75 | Meniu și semnătură (**Exemplele 6–7**) |
| 75–95 | Funcții în dicționar și catalogul (**Exemplele 8–9**) |
| 95–115 | Galeria completă (**Exemplul 10**) și opera ta |
| 115–120 | Verificare Modul 3 și autoevaluare |

---

## 1. Recapitulare rapidă din Modulul 3

- Țestoasa: `forward`, `left`, `penup`, `goto`, `color`, `begin_fill`.
- Funcții de desen cu poziție, mărime și culoare.
- Tastatura: `screen.listen()` și `screen.onkey(functia, "tasta")`.
- Dicționarul: `{"cheie": valoare}`.

**Încearcă tu (3 min)**  
- [ ] Scrie o funcție `patrat(l)` și apeleaz-o pentru `l = 40`  

---

## 2. O operă este o funcție

### Exemplul 1 — O operă mică

```python
import turtle

screen = turtle.Screen()
screen.setup(600, 500)
screen.bgcolor("skyblue")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def mergi(x, y):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()

def dreptunghi(x, y, l, h, culoare):
    mergi(x, y)
    t.color(culoare)
    t.begin_fill()
    for i in range(2):
        t.forward(l)
        t.left(90)
        t.forward(h)
        t.left(90)
    t.end_fill()

def cerc(x, y, r, culoare):
    mergi(x, y - r)
    t.color(culoare)
    t.begin_fill()
    t.circle(r)
    t.end_fill()

def peisaj():
    dreptunghi(-300, -250, 600, 120, "forestgreen")
    cerc(200, 150, 40, "gold")
    dreptunghi(-150, -130, 100, 80, "khaki")
    dreptunghi(-120, -130, 30, 40, "saddlebrown")

peisaj()

turtle.done()
```

**Ce vezi pe ecran:** pe cer albastru, o fâșie de **iarbă**, un **soare auriu** în dreapta și o **căsuță** simplă (corp nisipiu și ușă maro) pe iarbă.

Observă `mergi(x, y)`: o mică funcție de ajutor care face de fiecare dată aceleași trei lucruri (ridică creionul, merge, coboară creionul). Celelalte funcții o folosesc. Programele bune au astfel de **piese de ajutor**.

### Exemplul 2 — Două opere, două taste

```python
import turtle

screen = turtle.Screen()
screen.setup(600, 500)

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def curata():
    t.clear()
    t.penup()
    t.home()
    t.pensize(1)
    screen.bgcolor("white")

def opera_patrate():
    curata()
    t.color("darkgreen")
    t.pendown()
    for i in range(36):
        for j in range(4):
            t.forward(100)
            t.left(90)
        t.right(10)

def opera_spirala():
    curata()
    screen.bgcolor("black")
    t.color("orange")
    t.pendown()
    for i in range(70):
        t.forward(i * 3)
        t.left(91)

screen.listen()
screen.onkey(opera_patrate, "1")
screen.onkey(opera_spirala, "2")

turtle.done()
```

**Ce vezi pe ecran:** o fereastră albă. La tasta **1** se desenează o **floare din pătrate** verzi pe fundal alb. La tasta **2**, ecranul se curăță, devine **negru** și apare o **spirală portocalie**.

Regula galeriei: **fiecare operă începe cu `curata()`**. Funcția `curata()` șterge desenul vechi, mută țestoasa în centru și pune fundalul alb.

---

## 3. Opere cu parametri

### Exemplul 3 — Spirala cu parametri

```python
import turtle

screen = turtle.Screen()
screen.setup(800, 400)

t = turtle.Turtle()
t.hideturtle()
t.speed(0)
t.pensize(2)

def spirala(x, y, culori, pasi, unghi):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()
    for i in range(pasi):
        t.color(culori[i % len(culori)])
        t.forward(i * 2)
        t.left(unghi)

spirala(-250, 0, ["red", "orange"], 40, 90)
spirala(0, 0, ["blue", "cyan", "navy"], 40, 120)
spirala(250, 0, ["green", "lime", "gold", "orange"], 40, 72)

turtle.done()
```

**Ce vezi pe ecran:** **trei spirale** una lângă alta: una **pătrată** roșie-portocalie (unghi 90°), una **triunghiulară** în nuanțe de albastru (120°) și una cu **cinci laturi** în verde și auriu (72°).

Funcția primește **centrul** (`x`, `y`), lista de **culori**, numărul de **pași** și **unghiul**. Cu `i % len(culori)` parcurgem lista în cerc, oricât de lungă ar fi.

### Exemplul 4 — Mandala cu parametri

```python
import turtle

screen = turtle.Screen()
screen.bgcolor("black")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)
t.pensize(2)

def mandala(cercuri, raza, culori):
    for i in range(cercuri):
        t.color(culori[i % len(culori)])
        t.circle(raza)
        t.right(360 / cercuri)

mandala(36, 100, ["cyan", "magenta", "yellow"])
mandala(12, 40, ["white"])

turtle.done()
```

**Ce vezi pe ecran:** pe fundal negru, o **rozetă mare** din 36 de cercuri colorate (azuriu, magenta, galben, pe rând), iar în interiorul ei o **rozetă mică**, albă, din 12 cercuri.

### Exemplul 5 — Cer înstelat cu lună

```python
import random
import turtle

screen = turtle.Screen()
screen.setup(700, 500)
screen.bgcolor("midnightblue")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def cerc(x, y, r, culoare):
    t.penup()
    t.goto(x, y - r)
    t.setheading(0)
    t.pendown()
    t.color(culoare)
    t.begin_fill()
    t.circle(r)
    t.end_fill()

def cer(stele):
    for i in range(stele):
        t.penup()
        t.goto(random.randint(-330, 330), random.randint(-230, 230))
        t.dot(random.randint(3, 9), random.choice(["white", "yellow", "lightblue"]))
    cerc(-230, 130, 50, "lightyellow")
    cerc(-205, 140, 45, "midnightblue")

cer(60)

turtle.done()
```

**Ce vezi pe ecran:** pe cerul albastru închis, **60 de stele** de mărimi și culori diferite, împrăștiate la întâmplare (altfel la fiecare rulare), și o **semilună** în stânga sus.

Semiluna se obține din **două cercuri**: unul galben deschis și, peste el, unul cu **culoarea fundalului**, mutat puțin spre dreapta. Partea din primul cerc rămasă vizibilă arată ca o semilună.

---

## 4. Meniu și semnătură

### Exemplul 6 — Meniul pe ecran

```python
import turtle

screen = turtle.Screen()
screen.setup(800, 600)

meniu = turtle.Turtle()
meniu.hideturtle()
meniu.penup()

def scrie_meniu():
    meniu.goto(-380, 265)
    meniu.write("1 Peisaj   2 Mandala   3 Spirala   4 Cer   5 Floare   C Sterge", font=("Arial", 12, "bold"))

scrie_meniu()

turtle.done()
```

**Ce vezi pe ecran:** sus, în stânga, o linie de text îngroșat cu **opțiunile galeriei**: „1 Peisaj   2 Mandala   3 Spirala   4 Cer   5 Floare   C Sterge”.

Meniul este scris de **o țestoasă separată** (`meniu`). Așa, când ștergem desenul cu `t.clear()`, meniul **rămâne** pe ecran: un truc pe care îl știi de la Paint.

### Exemplul 7 — Numele artistului

```python
import turtle

screen = turtle.Screen()
screen.setup(800, 600)

t = turtle.Turtle()
t.hideturtle()
t.penup()

autor = {"nume": "Artistul"}

nume = screen.textinput("Artist", "Cum te cheama?")
if nume is not None and nume.strip() != "":
    autor["nume"] = nume.strip()

def semneaza(titlu):
    t.color("gray")
    t.goto(-380, -285)
    t.write(titlu + " - de " + autor["nume"], font=("Arial", 11, "italic"))

semneaza("Primul meu desen")
print("Galerie semnata de:", autor["nume"])

turtle.done()
```

**Ce vezi pe ecran:** apare o căsuță „Cum te cheama?”. Scrii numele, apeși OK, iar jos, în stânga, apare cu litere gri înclinate: **„Primul meu desen - de <numele tău>”**.

Dacă lași căsuța goală sau apeși Cancel, numele rămâne **„Artistul”**. Condiția `nume is not None and nume.strip() != ""` verifică ambele cazuri: răspunsul există și nu este gol.

---

## 5. Funcții în dicționar

### Exemplul 8 — Tastele și operele într-un dicționar

```python
import turtle

screen = turtle.Screen()
screen.setup(500, 400)

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

def curata():
    t.clear()
    t.penup()
    t.home()

def triunghi():
    curata()
    t.color("red")
    t.pendown()
    for i in range(3):
        t.forward(120)
        t.left(120)

def patrat():
    curata()
    t.color("blue")
    t.pendown()
    for i in range(4):
        t.forward(120)
        t.left(90)

def hexagon():
    curata()
    t.color("green")
    t.pendown()
    for i in range(6):
        t.forward(80)
        t.left(60)

opere = {"1": triunghi, "2": patrat, "3": hexagon}

screen.listen()
for tasta in opere:
    screen.onkey(opere[tasta], tasta)

turtle.done()
```

**Ce vezi pe ecran:** apeși **1** și apare un **triunghi roșu**, **2** un **pătrat albastru**, **3** un **hexagon verde**. De fiecare dată desenul vechi dispare.

Surpriza: în dicționar, **valorile sunt funcții** (fără paranteze). `opere[tasta]` este funcția, iar bucla `for` leagă fiecare tastă de funcția ei. Dacă vrei o operă nouă, adaugi **o funcție** și **un rând** în dicționar, fără să atingi restul programului.

### Exemplul 9 — Catalogul galeriei

```python
opere = {"1": "Peisaj", "2": "Mandala", "3": "Spirala", "4": "Cer", "5": "Floare"}

print("CATALOG")
for tasta in opere:
    print("Tasta", tasta, "->", opere[tasta])

print("Numar de opere:", len(opere))
print("Exista opera 6?", "6" in opere)
```

**Ieșire:**
```text
CATALOG
Tasta 1 -> Peisaj
Tasta 2 -> Mandala
Tasta 3 -> Spirala
Tasta 4 -> Cer
Tasta 5 -> Floare
Numar de opere: 5
Exista opera 6? False
```

Un dicționar poate să ne dea și un **catalog**: parcurgem cheile și afișăm numele operei. `len(opere)` numără operele, iar `"6" in opere` verifică dacă există cheia `"6"`.

---

## 6. Galeria completă

### Exemplul 10 — „Galeria mea de artă”

```python
import random
import turtle

screen = turtle.Screen()
screen.setup(800, 600)
screen.title("Galeria mea de arta")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)

meniu = turtle.Turtle()
meniu.hideturtle()
meniu.penup()

autor = {"nume": "Artistul"}
culori = ["red", "orange", "yellow", "green", "cyan", "violet"]

def mergi(x, y):
    t.penup()
    t.goto(x, y)
    t.setheading(0)
    t.pendown()

def dreptunghi(x, y, l, h, culoare):
    mergi(x, y)
    t.color(culoare)
    t.begin_fill()
    for i in range(2):
        t.forward(l)
        t.left(90)
        t.forward(h)
        t.left(90)
    t.end_fill()

def triunghi(x, y, l, culoare):
    mergi(x, y)
    t.color(culoare)
    t.begin_fill()
    for i in range(3):
        t.forward(l)
        t.left(120)
    t.end_fill()

def cerc(x, y, r, culoare):
    mergi(x, y - r)
    t.color(culoare)
    t.begin_fill()
    t.circle(r)
    t.end_fill()

def curata():
    t.clear()
    t.penup()
    t.home()
    t.setheading(0)
    t.pensize(1)
    screen.bgcolor("white")

def semneaza(titlu):
    t.penup()
    t.color("gray")
    t.goto(-380, -285)
    t.write(titlu + " - de " + autor["nume"], font=("Arial", 11, "italic"))

def peisaj():
    curata()
    screen.bgcolor("skyblue")
    dreptunghi(-400, -300, 800, 170, "forestgreen")
    cerc(280, 190, 50, "gold")
    dreptunghi(-250, -130, 140, 140, "khaki")
    triunghi(-250, 10, 140, "firebrick")
    dreptunghi(-205, -130, 50, 70, "saddlebrown")
    dreptunghi(160, -130, 20, 60, "saddlebrown")
    cerc(170, -35, 45, "darkgreen")
    semneaza("Peisaj")

def mandala():
    curata()
    screen.bgcolor("black")
    t.pensize(2)
    t.pendown()
    for i in range(36):
        t.color(culori[i % 6])
        t.circle(110)
        t.right(10)
    semneaza("Mandala")

def spirala():
    curata()
    screen.bgcolor("black")
    t.pensize(2)
    t.pendown()
    for i in range(100):
        t.color(culori[i % 6])
        t.forward(i * 2)
        t.left(59)
    semneaza("Spirala")

def cer():
    curata()
    screen.bgcolor("midnightblue")
    for i in range(50):
        t.penup()
        t.goto(random.randint(-380, 380), random.randint(-230, 230))
        t.dot(random.randint(3, 9), random.choice(["white", "yellow", "lightblue"]))
    cerc(-250, 150, 50, "lightyellow")
    cerc(-225, 160, 45, "midnightblue")
    semneaza("Cer inselat")

def petala(raza, culoare):
    t.color("black", culoare)
    t.begin_fill()
    t.circle(raza, 60)
    t.left(120)
    t.circle(raza, 60)
    t.left(120)
    t.end_fill()

def floare():
    curata()
    screen.bgcolor("lightyellow")
    t.pensize(8)
    mergi(0, -260)
    t.color("forestgreen")
    t.setheading(90)
    t.forward(210)
    t.pensize(2)
    mergi(0, -50)
    for i in range(8):
        petala(90, "orange")
        t.right(45)
    cerc(0, -50, 25, "saddlebrown")
    semneaza("Floare")

def scrie_meniu():
    meniu.goto(-380, 265)
    meniu.write("1 Peisaj   2 Mandala   3 Spirala   4 Cer   5 Floare   C Sterge", font=("Arial", 12, "bold"))

def sterge():
    curata()

opere = {"1": peisaj, "2": mandala, "3": spirala, "4": cer, "5": floare, "c": sterge}

nume = screen.textinput("Artist", "Cum te cheama?")
if nume is not None and nume.strip() != "":
    autor["nume"] = nume.strip()

scrie_meniu()
screen.listen()
for tasta in opere:
    screen.onkey(opere[tasta], tasta)

print("GALERIA", autor["nume"].upper())
print("Opere:", len(opere) - 1)

turtle.done()
```

**Ieșire (dacă ai scris numele `Ana` în căsuță):**
```text
GALERIA ANA
Opere: 5
```

**Ce vezi pe ecran:** o fereastră de 800 × 600, cu **meniul** sus. Apeși:
- **1** — peisaj: cer albastru, iarbă, **soare**, **casă** cu acoperiș și ușă și un **copac**;
- **2** — **mandală** din 36 de cercuri colorate pe fundal negru;
- **3** — **spirală** în șase culori pe fundal negru;
- **4** — **cer înstelat** cu 50 de stele aleatoare și o **semilună**;
- **5** — **floare** cu 8 petale portocalii, miez maro și tulpină verde, pe fundal galben deschis;
- **c** — **șterge** desenul.

Fiecare operă are jos, în stânga, **semnătura ta**. (În exemplu, numele este cel scris în căsuță; dacă nu scrii nimic, apare „Artistul”.)

Programul este făcut din **piese mici**: funcțiile ajutătoare (`mergi`, `dreptunghi`, `triunghi`, `cerc`, `curata`, `semneaza`), cele 5 opere, meniul și dicționarul `opere` care le leagă de taste. Ca să adaugi o operă nouă: scrii funcția, apoi adaugi un rând în dicționar și o mențiune în meniu.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Galeria mea de artă” (obligatoriu)
Pornește de la Exemplul 10 și fă-o **a ta**:
1. păstrează cele **5 opere** și adaugă **încă 3, create de tine** (de exemplu: un oraș noaptea, un pește în acvariu, o stea mare, un robot, un curcubeu);
2. fiecare operă este o **funcție**, are semnătură și este legată de o **tastă** în dicționarul `opere`;
3. actualizează **meniul** să arate toate operele;
4. alege **culori și titluri** proprii;
5. adaugă un **ecran de început** cu titlul galeriei și textul „Alege o tastă”.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
opere = {"1": "Peisaj", "2": "Mandala"}
print(len(opere))
print(opere["2"])
print("3" in opere)
opere["3"] = "Spirala"
print(len(opere))
```

### Exercițiul C — Opera cu mouse-ul
Adaugă o operă în care **fiecare click** desenează o **stea colorată** în locul în care ai dat click (folosește ideile din Lecțiile 5 și 7).

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
def peisaj()
    curata()
    dreptunghi(0, 0, 100, 50)

screen.onkey(peisaj(), "1")
screen.onkey(mandala, "2")
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce este mai bine ca fiecare operă să fie o funcție?  
2. De ce meniul este scris de o altă țestoasă?  
3. Cum adaugi o operă nouă în galerie?

**Gata când:**
- [ ] Galeria are cel puțin 8 opere (5 din model + 3 ale tale)  
- [ ] Fiecare operă este o funcție, are semnătură și tastă proprie  
- [ ] Meniul și ecranul de început sunt corecte  
- [ ] Ai explicat pe foaie cum adaugi o operă nouă  
- [ ] Fișierul se numește `Prenume_Nume_P3_L10.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă o operă **animată** (de exemplu o mașină care merge prin peisaj, cu `ontimer`)  
- [ ] Adaugă tasta **R** care alege o operă la întâmplare  
- [ ] Afișează pe ecran **numărul de opere văzute**  
- [ ] Fă un **joc de ghicit**: se desenează o operă, iar jucătorul trebuie să scrie titlul  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Nu se întâmplă nimic la apăsarea unei taste | Lipsește `screen.listen()` sau tasta nu e în dicționar | `screen.listen()` și verifică cheile din `opere` |
| Operele se desenează una peste alta | Lipsește `curata()` la începutul operei | Începe fiecare operă cu `curata()` |
| Meniul dispare când ștergi | Meniul este scris de aceeași țestoasă | Folosește o țestoasă separată pentru meniu |
| `NameError: name 'floare' is not defined` | Ai pus funcția în dicționar înainte să o definești | Definește funcțiile **înaintea** dicționarului |
| Tasta nu face nimic, iar opera se desenează imediat la pornire | Ai scris `"1": peisaj()` cu paranteze în dicționar: funcția s-a executat și în dicționar a rămas `None` | `"1": peisaj` fără paranteze |
| Fundalul rămâne negru la operele următoare | `curata()` nu resetează fundalul | `screen.bgcolor("white")` în `curata()` |
| Textul semnăturii nu se vede | Culoarea textului este aceeași cu fundalul | Alege o culoare vizibilă pe toate fundalurile |

---

## Recapitulare pe scurt

- O operă este o funcție; fiecare începe cu `curata()`.
- Funcțiile mici de ajutor (`mergi`, `dreptunghi`, `cerc`) fac codul scurt și clar.
- Funcțiile cu parametri produc multe variante dintr-un singur cod.
- Un dicționar poate lega **taste** de **funcții** (fără paranteze).
- O țestoasă separată păstrează meniul când ștergi desenul.
- Un proiect mare se construiește din piese mici, adăugate pe rând.

---

## Verificare Modul 3

Răspunde pe foaie (apoi verifică cu profesorul):

1. Ce face `turtle.done()` și ce se întâmplă dacă îl uiți?  
2. Care este unghiul de rotire pentru un hexagon?  
3. Care este diferența dintre `penup()` și `pendown()`?  
4. Cum faci o formă colorată cu umplere? Scrie instrucțiunile în ordine.  
5. De ce scriem `screen.onkey(sus, "Up")` fără paranteze după `sus`?  
6. Ce primește o funcție legată de un click?  
7. La ce folosește `screen.tracer(0)` împreună cu `screen.update()`?  
8. Cum verifici dacă două țestoase s-au atins?  

**Răspunsuri:**
1. Ține fereastra deschisă; fără el, fereastra se închide imediat.  
2. `360 / 6 = 60` de grade.  
3. `penup()` ridică creionul (nu desenează), `pendown()` îl coboară (desenează).  
4. `t.color("contur", "umplere")`, `t.begin_fill()`, desenezi forma, `t.end_fill()`.  
5. Pentru că dăm programului **numele** funcției, care va fi apelată mai târziu, la apăsarea tastei.  
6. Două numere: coordonatele `x` și `y` ale click-ului.  
7. Oprește desenarea automată și o actualizează doar când spunem noi, pentru o animație fluidă.  
8. Cu `a.distance(b) < limita`.  

### Autoevaluare (bifează)

| Știu să… | Da | Aproape | Încă nu |
|----------|----|---------|---------|
| desenez forme cu `forward`, `left`, `right` | ☐ | ☐ | ☐ |
| folosesc culori și umplere | ☐ | ☐ | ☐ |
| desenez spirale și mandale cu bucle | ☐ | ☐ | ☐ |
| scriu funcții de desen cu parametri | ☐ | ☐ | ☐ |
| controlez țestoasa cu tastatura și mouse-ul | ☐ | ☐ | ☐ |
| fac un joc cu scor, timp și vieți | ☐ | ☐ | ☐ |
| organizez un proiect din piese mici | ☐ | ☐ | ☐ |

---

## Temă
1. Termină galeria cu cele 8 opere și testează fiecare tastă.  
2. Fă o fotografie sau o captură de ecran a operei tale preferate.  
3. Arată galeria familiei și notează opera care a plăcut cel mai mult.  
4. **Bonus:** pregătește o scurtă prezentare a galeriei pentru colegi.  
5. Salvează totul ca `Tema_P3_L10_Prenume_Nume.py`.

---

## Ce urmează — Modulul 4
**Jocuri cu Pygame**: trecem de la țestoasă la jocuri adevărate, cu ferestre, imagini, mișcare, coliziuni și clase!
