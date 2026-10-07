# LECȚIA 7 — Mouse: click și desenezi
**Modulul 3 · Desenăm cu Turtle · 2 ore**  
**Code Maker Club · Turtle Artist**

> Ai învățat să asculți tastatura. Acum ascultăm **mouse-ul**: la fiecare click, programul află **unde** ai dat click și poate desena acolo, schimba o culoare sau număra puncte. La final construiești un mic program de desen, ca **Paint**.  
> Proiect: **„Paint-ul meu”** · fișier: `Prenume_Nume_P3_L7.py`

---

## Obiectiv
La finalul orei legi un click de o funcție cu `onscreenclick`, folosești coordonatele `x` și `y` ale click-ului, desenezi puncte colorate, tragi țestoasa cu mouse-ul (`ondrag`), verifici dacă ai dat click într-o zonă și construiești o paletă de culori.  
**Minim:** la click, țestoasa merge la punctul în care ai dat click.  
**Ținta orei (Complet):** + puncte colorate, o zonă de click și Paint-ul din mini-proiect.

## De ce contează
Click-ul este „mâna” utilizatorului în aproape orice aplicație: butoane, meniuri, jocuri. Ca să știi dacă jucătorul a lovit un inamic sau un buton, trebuie să știi **unde** a dat click. Azi exersăm exact asta.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L6 |
| 10–30 | Primul click (**Exemplele 1–2**) |
| 30–50 | Click aleatoriu, coordonate (**Exemplele 3–4**) |
| 50–65 | Tragem cu mouse-ul, click pe țestoasă (**Exemplele 5–6**) |
| 65–90 | Zone de click: paleta și discul (**Exemplele 7–8**) |
| 90–100 | Unim punctele (**Exemplul 9**) |
| 100–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L6

- Legăm tasta de o funcție **fără paranteze**: `screen.onkeypress(sus, "Up")`.
- `screen.listen()` pornește ascultarea tastaturii.
- Dicționarul `setari` păstrează valori pe care le schimbăm din funcții.

**Încearcă tu (3 min)**  
- [ ] Scrie o funcție `rosu()` care face țestoasa roșie și leagă-o de tasta `"r"`  

---

## 2. Primul click

Funcția legată de un click primește **două numere**: `x` și `y`, adică poziția exactă a mouse-ului în fereastră.

### Exemplul 1 — Țestoasa merge la click

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.shape("turtle")

screen.onscreenclick(t.goto)

turtle.done()
```

**Ce vezi pe ecran:** de fiecare dată când dai click în fereastră, țestoasa **aleargă** în punctul respectiv, desenând o linie dreaptă.

Este un exemplu foarte scurt: `t.goto` este chiar funcția care primește `x` și `y`. Nu punem paranteze după `goto`, ca la tastatură: îi dăm programului **numele** funcției.

### Exemplul 2 — Un punct colorat la click

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.hideturtle()
t.speed(0)
t.penup()

def pune_punct(x, y):
    t.goto(x, y)
    t.dot(25, "red")

screen.onscreenclick(pune_punct)

turtle.done()
```

**Ce vezi pe ecran:** fereastră goală. La fiecare click apare un **punct roșu** cu diametrul 25, exact unde ai dat click. Țestoasa este ascunsă și are creionul ridicat, deci nu se văd linii.

Funcția `pune_punct(x, y)` **trebuie** să aibă exact doi parametri, `x` și `y`, chiar dacă nu îi folosești pe amândoi.

---

## 3. Alegem la întâmplare, citim coordonatele

### Exemplul 3 — Confetti

```python
import random
import turtle

screen = turtle.Screen()
screen.bgcolor("black")

t = turtle.Turtle()
t.hideturtle()
t.speed(0)
t.penup()

culori = ["red", "orange", "yellow", "lime", "cyan", "magenta", "white"]

def confetti(x, y):
    t.goto(x, y)
    t.dot(random.randint(10, 40), random.choice(culori))

screen.onscreenclick(confetti)

turtle.done()
```

**Ce vezi pe ecran:** pe fundal negru, fiecare click aduce un **punct colorat**, de o culoare și o mărime **alese la întâmplare** (de la 10 la 40).

### Exemplul 4 — Coordonatele click-ului

```python
import turtle

screen = turtle.Screen()

def arata(x, y):
    print("Click la:", round(x), round(y))

arata(120.4, -80.7)

screen.onscreenclick(arata)

turtle.done()
```

**Ieșire:**
```text
Click la: 120 -81
```

La început apelăm noi funcția, ca test: `arata(120.4, -80.7)` afișează `Click la: 120 -81`. Apoi, **la fiecare click** pe fereastră, Thonny afișează coordonatele locului. Centrul ferestrei este `(0, 0)`. În stânga și jos numerele sunt negative.

Coordonatele click-ului au zecimale (de exemplu `120.4`), de aceea le rotunjim cu `round`.

---

## 4. Tragem și atingem

### Exemplul 5 — Desen liber

```python
import turtle

screen = turtle.Screen()
screen.bgcolor("lightyellow")

t = turtle.Turtle()
t.shape("circle")
t.shapesize(0.6)
t.color("navy")
t.pensize(4)
t.speed(0)

t.ondrag(t.goto)

turtle.done()
```

**Ce vezi pe ecran:** pe fundal galben deschis apare un **cerculeț albastru** (țestoasa). Dacă îl **prinzi cu mouse-ul** (ții apăsat) și îl tragi, el te urmează și desenează o **linie albastră** după mișcarea mouse-ului, ca un creion.

- `ondrag` înseamnă „când tragi țestoasa”;
- `shapesize(0.6)` face forma mai mică (0,6 din mărimea normală).

### Exemplul 6 — Click pe țestoasă

```python
import random
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.shape("turtle")
t.shapesize(4)

culori = ["red", "green", "blue", "orange", "purple", "pink"]

def schimba(x, y):
    t.color(random.choice(culori))

t.onclick(schimba)

turtle.done()
```

**Ce vezi pe ecran:** o **țestoasă mare** (de 4 ori mai mare ca normal), în centrul ferestrei. Dacă dai click **pe ea**, își schimbă culoarea la întâmplare. Click-urile în afara ei nu fac nimic.

Aici legăm click-ul de **țestoasă** (`t.onclick`), nu de întreaga fereastră (`screen.onscreenclick`).

---

## 5. Zone de click

Cum aflăm dacă ai dat click într-un anumit loc? Comparăm `x` și `y` cu limitele zonei.

### Exemplul 7 — Paleta de culori

```python
import turtle

screen = turtle.Screen()
screen.setup(600, 500)

culori = ["red", "green", "blue", "gold"]
stare = {"culoare": "red"}

paleta = turtle.Turtle()
paleta.hideturtle()
paleta.speed(0)

for i in range(4):
    paleta.penup()
    paleta.goto(-180 + i * 90, 190)
    paleta.setheading(0)
    paleta.pendown()
    paleta.color("black", culori[i])
    paleta.begin_fill()
    for j in range(4):
        paleta.forward(60)
        paleta.left(90)
    paleta.end_fill()

pensula = turtle.Turtle()
pensula.hideturtle()
pensula.penup()
pensula.speed(0)

def click(x, y):
    if y > 190 and y < 250:
        numar = int((x + 180) // 90)
        if 0 <= numar < 4 and (x + 180) - numar * 90 <= 60:
            stare["culoare"] = culori[numar]
    elif y < 180:
        pensula.goto(x, y)
        pensula.dot(20, stare["culoare"])

screen.onscreenclick(click)

turtle.done()
```

**Ce vezi pe ecran:** sus, o **paletă** cu 4 pătrate: roșu, verde, albastru și auriu. Dacă dai click pe un pătrat, **alegi culoarea**. Dacă dai click mai jos, în restul ferestrei, apare un **punct de culoarea aleasă**. La început culoarea este roșu.

Cum aflăm pe ce pătrat ai dat click: pătratele încep la `x = -180, -90, 0, 90` și au lățimea 60. `(x + 180) // 90` dă numărul pătratului (0, 1, 2, 3), iar `(x + 180) - numar * 90 <= 60` verifică să nu fi dat click în **spațiul dintre** pătrate.

### Exemplul 8 — Contor de click-uri

```python
import turtle

screen = turtle.Screen()
screen.bgcolor("black")

scor = {"click": 0}

disc = turtle.Turtle()
disc.hideturtle()
disc.penup()
disc.goto(0, -100)
disc.pendown()
disc.color("crimson")
disc.begin_fill()
disc.circle(100)
disc.end_fill()

text = turtle.Turtle()
text.hideturtle()
text.penup()
text.color("white")

def scrie():
    text.clear()
    text.goto(0, -25)
    text.write(scor["click"], align="center", font=("Arial", 48, "bold"))

def click(x, y):
    distanta = (x ** 2 + y ** 2) ** 0.5
    if distanta < 100:
        scor["click"] += 1
        scrie()

click(0, 0)
click(50, 50)
click(300, 300)
print("Scor dupa test:", scor["click"])

screen.onscreenclick(click)

turtle.done()
```

**Ieșire:**
```text
Scor dupa test: 2
```

**Ce vezi pe ecran:** pe fundal negru, un **disc mare roșu** (raza 100), iar în mijloc un număr alb. La fiecare click **în interiorul** discului numărul crește cu 1. Click-urile din afara lui nu contează.

Formula `(x ** 2 + y ** 2) ** 0.5` este **distanța de la centru** până la punctul `(x, y)` (Pitagora!). Dacă este mai mică decât raza (100), click-ul este în disc. Cele trei apeluri de test: `(0, 0)` și `(50, 50)` sunt în disc (distanța 0 și aproximativ 70,7), iar `(300, 300)` este departe. De aceea scorul este 2.

---

## 6. Unim punctele

### Exemplul 9 — Poligonul din click-uri

```python
import turtle

screen = turtle.Screen()

t = turtle.Turtle()
t.color("darkgreen")
t.pensize(3)
t.speed(0)

puncte = []

def click(x, y):
    if len(puncte) == 0:
        t.penup()
    t.goto(x, y)
    t.pendown()
    t.dot(10, "red")
    puncte.append((x, y))

def inchide():
    if len(puncte) > 2:
        t.goto(puncte[0])

click(-100, -50)
click(100, -50)
click(0, 100)
inchide()
print("Puncte:", len(puncte))

screen.onscreenclick(click)
screen.listen()
screen.onkey(inchide, "space")

turtle.done()
```

**Ieșire:**
```text
Puncte: 3
```

**Ce vezi pe ecran:** programul desenează singur, ca test, un **triunghi** cu vârfurile în `(-100, -50)`, `(100, -50)` și `(0, 100)`, fiecare marcat cu un **punct roșu**. Apoi poți da click și pentru alte puncte: fiecare se **leagă cu o linie** de cel precedent. Apeși **bara de spațiu** și ultima linie se închide la primul punct.

Lista `puncte` memorează toate punctele (ca perechi `(x, y)`). Primul click ridică creionul, ca să nu apară o linie din centru.

---

## 7. Mini-proiect

### Exemplul 10 — Paint-ul meu

```python
import turtle

screen = turtle.Screen()
screen.setup(700, 600)
screen.title("Paint-ul meu")

culori = ["black", "red", "orange", "gold", "green", "dodgerblue", "purple"]
stare = {"culoare": "black", "marime": 12}

paleta = turtle.Turtle()
paleta.hideturtle()
paleta.speed(0)

def patrat_culoare(x, y, culoare):
    paleta.penup()
    paleta.goto(x, y)
    paleta.setheading(0)
    paleta.pendown()
    paleta.color("black", culoare)
    paleta.begin_fill()
    for i in range(4):
        paleta.forward(40)
        paleta.left(90)
    paleta.end_fill()

def deseneaza_paleta():
    for i in range(len(culori)):
        patrat_culoare(-190 + i * 55, 250, culori[i])

pensula = turtle.Turtle()
pensula.hideturtle()
pensula.speed(0)
pensula.penup()

def click(x, y):
    if 250 <= y <= 290:
        numar = int((x + 190) // 55)
        if 0 <= numar < len(culori) and (x + 190) - numar * 55 <= 40:
            stare["culoare"] = culori[numar]
    elif y < 240:
        pensula.goto(x, y)
        pensula.dot(stare["marime"], stare["culoare"])

def mai_mare():
    stare["marime"] += 4
    print("Marime:", stare["marime"])

def mai_mic():
    if stare["marime"] > 4:
        stare["marime"] -= 4
    print("Marime:", stare["marime"])

def sterge():
    pensula.clear()

deseneaza_paleta()
print("PAINT-UL MEU")
print("Click pe patrat: alegi culoarea")
print("Click in rest: pui un punct")
print("Sus / Jos: marimea punctului")
print("c: stergi desenul")

screen.listen()
screen.onscreenclick(click)
screen.onkey(mai_mare, "Up")
screen.onkey(mai_mic, "Down")
screen.onkey(sterge, "c")

turtle.done()
```

**Ieșire:**
```text
PAINT-UL MEU
Click pe patrat: alegi culoarea
Click in rest: pui un punct
Sus / Jos: marimea punctului
c: stergi desenul
```

**Ce vezi pe ecran:** sus, o **paletă cu 7 culori** (negru, roșu, portocaliu, auriu, verde, albastru, mov). Click pe un pătrat alege culoarea, click în restul ferestrei pune un punct de **mărimea 12**. Cu săgețile **sus** și **jos** schimbi mărimea punctului, iar cu **c** ștergi desenul fără să dispară paleta.

De ce avem **două țestoase**? Paleta este desenată de `paleta`, iar punctele de `pensula`. Astfel, `pensula.clear()` șterge **doar** desenul, nu și paleta.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Paint-ul meu” (obligatoriu)
Pornește de la Exemplul 10 și fă-l **al tău**:
1. **9 culori** în paletă, alese de tine (verifică lățimea ferestrei!);
2. o **gumă de șters**: un pătrat alb în paletă, care „desenează” cu culoarea fundalului;
3. mărimea pensulei afișată **pe ecran** (nu doar în fereastra de text);
4. o tastă care **schimbă fundalul** (`screen.bgcolor(...)`);
5. un titlu și instrucțiuni.

### Exercițiul B — Ce se întâmplă?
Gândește-te, apoi verifică în Thonny. Ce se întâmplă dacă dai click la `(150, 20)`? Dar la `(10, 10)`?

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.hideturtle()
t.penup()

def click(x, y):
    if x > 100:
        t.goto(x, y)
        t.dot(30, "red")
    else:
        t.goto(x, y)
        t.dot(30, "blue")

screen.onscreenclick(click)

turtle.done()
```

### Exercițiul C — Dreptunghi cu două click-uri
Scrie un program în care **primul click** marchează un colț, iar **al doilea click** marchează colțul opus. După al doilea click, programul desenează dreptunghiul dintre cele două puncte. Indiciu: ține într-o listă primul punct.

### Exercițiul D — Găsește greșelile
Programul are 3 greșeli. Rescrie-l corect:

```text
import turtle
screen = turtle.Screen()
t = turtle.Turtle()
def pune(x)
    t.goto(x, y)
    t.dot(20, "red")
screen.onscreenclick(pune())
turtle.done()
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce reprezintă `x` și `y` în funcția legată de click?  
2. Cum verificăm dacă un click este într-un cerc?  
3. De ce folosim două țestoase în Paint?

**Gata când:**
- [ ] Paint-ul are 9 culori, gumă și titlu  
- [ ] Mărimea pensulei se vede pe ecran  
- [ ] Ai făcut dreptunghiul din două click-uri  
- [ ] Ai explicat pe foaie `x`, `y` și zona de click  
- [ ] Fișierul se numește `Prenume_Nume_P3_L7.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă un buton „Salvează” care afișează în Thonny numărul de puncte desenate  
- [ ] Desenează cu **linii** în loc de puncte: la fiecare click, o linie de la click-ul precedent  
- [ ] Fă un joc în care apare un cerc la întâmplare și trebuie să dai click pe el  
- [ ] Adaugă un buton „Anulează” care șterge ultimul punct (indiciu: o listă de puncte)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `TypeError: click() takes 0 positional arguments but 2 were given` | Funcția legată de click nu are `x` și `y` | `def click(x, y):` |
| `TypeError: ... missing 2 required positional arguments` | Ai scris `onscreenclick(click())` cu paranteze | `onscreenclick(click)` |
| Țestoasa desenează o linie din centru la primul click | Creionul este jos | `penup()` înainte de primul `goto` |
| Click-ul nu face nimic | Ai legat `t.onclick`, dar ai dat click lângă țestoasă | Dă click chiar pe țestoasă sau folosește `screen.onscreenclick` |
| Zonele de click nu se potrivesc cu desenul | Ai calculat greșit coordonatele | Folosește `print(x, y)` ca să vezi unde dai click |
| Paleta dispare când ștergi | Ai folosit aceeași țestoasă pentru paletă și desen | Folosește două țestoase |
| Punctele sunt prea sus sau prea jos | Axa `y` crește în sus, nu în jos | Sus = valori pozitive pentru `y` |

---

## Recapitulare pe scurt

- `screen.onscreenclick(functia)` apelează funcția la fiecare click, cu `x` și `y`.
- Funcția legată de click trebuie să aibă **doi parametri**.
- `t.onclick(...)` reacționează doar la click **pe țestoasă**; `t.ondrag(t.goto)` te lasă să o tragi.
- O zonă de click se verifică cu comparații: `if 250 <= y <= 290`.
- Distanța până la un punct: `(x ** 2 + y ** 2) ** 0.5`.
- Cu două țestoase poți șterge desenul fără să ștergi paleta.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Fă un program care desenează **un cerc la fiecare click**, cu raza aleasă la întâmplare.  
3. Fă un **buton** pătrat verde; când dai click pe el, fundalul se schimbă.  
4. **Bonus:** fă „Paint” să deseneze linii continue când tragi cu mouse-ul (`ondrag`).  
5. Salvează totul ca `Tema_P3_L7_Prenume_Nume.py`.

---

## Ce urmează — Lecția 8
**Cursa țestoaselor**: mai multe țestoase aleargă una contra alteia și câștigă una singură.
