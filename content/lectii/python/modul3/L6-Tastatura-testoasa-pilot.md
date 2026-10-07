# LECȚIA 6 — Tastatura: țestoasa pilot
**Modulul 3 · Desenăm cu Turtle · 2 ore**  
**Code Maker Club · Turtle Artist**

> Până acum țestoasa făcea exact ce scria în program, de la început până la sfârșit. Azi ea **ascultă de tine**: apeși o săgeată și ea merge, apeși o literă și își schimbă culoarea. Așa începe orice joc: programul așteaptă ce faci tu.  
> Proiect: **„Tabla de desen”** · fișier: `Prenume_Nume_P3_L6.py`

---

## Obiectiv
La finalul orei legi o tastă de o funcție cu `onkey` / `onkeypress`, miști țestoasa cu săgețile, schimbi culoarea și grosimea cu litere, cobori și ridici creionul din tastatură, faci țestoasa să meargă singură cu un cronometru (`ontimer`) și construiești o tablă de desen.  
**Minim:** țestoasa se mișcă cu cele 4 săgeți.  
**Ținta orei (Complet):** + culori, grosime, șters și tabla de desen completă.

## De ce contează
Jocurile și aplicațiile **reacționează la ce faci tu**: apeși, miști mouse-ul, dai click. Acest mod de lucru se numește **programare cu evenimente**: programul spune „când apeși tasta X, execută funcția Y”. Vei folosi aceeași idee în Pygame.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L5 |
| 10–35 | Prima tastă și cele 4 săgeți (**Exemplele 1–2**) |
| 35–60 | Culori, creion, grosime (**Exemplele 3–5**) |
| 60–75 | Ștergere și viteză (**Exemplele 6–7**) |
| 75–95 | Mișcare automată și pereți (**Exemplele 8–9**) |
| 95–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L5

- Funcția se definește cu `def` și se apelează cu `nume()`.
- Dicționarul păstrează valori sub un nume: `setari["pas"]`.
- `t.xcor()`, `t.ycor()` dau poziția țestoasei.

**Încearcă tu (3 min)**  
- [ ] Scrie o funcție `salut()` care afișează „Salut!”  

---

## 2. Prima tastă

Ca să reacționăm la o tastă, facem **trei lucruri**:
1. scriem o **funcție** care spune ce se întâmplă (fără parametri);
2. îi spunem ecranului să **asculte** tastatura: `screen.listen()`;
3. **legăm** tasta de funcție: `screen.onkeypress(functia, "Up")`.

### Exemplul 1 — O tastă

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.shape("turtle")

def inainte():
    t.forward(20)

screen.listen()
screen.onkeypress(inainte, "Up")

turtle.done()
```

**Ce vezi pe ecran:** o fereastră cu țestoasa. Dacă apeși săgeata **sus**, țestoasa face **un pas** de 20 spre dreapta. Ține tasta apăsată și va merge mai departe.

> **Foarte important:** după `inainte` NU punem paranteze! Scriem `onkeypress(inainte, "Up")`, nu `inainte()`. Dăm programului **numele** funcției, ca ea să fie apelată mai târziu, când apeși tasta. Dacă scrii `inainte()`, funcția se execută imediat, o singură dată.
>
> Dacă nu se întâmplă nimic, **dă click o dată pe fereastra de desen**, ca să primească tastatura.

### Exemplul 2 — Cele patru săgeți

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.shape("turtle")
t.pensize(3)

def sus():
    t.forward(20)

def jos():
    t.backward(20)

def stanga():
    t.left(30)

def dreapta():
    t.right(30)

screen.listen()
screen.onkeypress(sus, "Up")
screen.onkeypress(jos, "Down")
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")

turtle.done()
```

**Ce vezi pe ecran:** țestoasa se mișcă cu săgețile și **desenează** pe unde trece:
- **sus** merge înainte, **jos** merge înapoi (în direcția în care privește);
- **stânga** și **dreapta** o rotesc cu 30° (ca o mașină care virează).

Numele tastelor sunt scrise exact așa: `"Up"`, `"Down"`, `"Left"`, `"Right"`, `"space"` (bara de spațiu), iar literele cu litere mici: `"a"`, `"r"`. Atenție la **majuscule**: `"up"` nu funcționează!

---

## 3. Culori, creion, grosime

### Exemplul 3 — Culori din taste

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.shape("turtle")
t.pensize(4)

def sus():
    t.forward(20)

def stanga():
    t.left(30)

def dreapta():
    t.right(30)

def rosu():
    t.color("red")

def verde():
    t.color("green")

def albastru():
    t.color("blue")

screen.listen()
screen.onkeypress(sus, "Up")
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")
screen.onkeypress(rosu, "r")
screen.onkeypress(verde, "g")
screen.onkeypress(albastru, "b")

turtle.done()
```

**Ce vezi pe ecran:** conduci țestoasa cu săgețile. Când apeși **r**, linia (și țestoasa) devine roșie, la **g** verde, la **b** albastră.

### Exemplul 4 — Creionul sus sau jos

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.shape("turtle")

def sus():
    t.forward(20)

def stanga():
    t.left(30)

def dreapta():
    t.right(30)

def comuta_creion():
    if t.isdown():
        t.penup()
    else:
        t.pendown()

screen.listen()
screen.onkeypress(sus, "Up")
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")
screen.onkey(comuta_creion, "space")

turtle.done()
```

**Ce vezi pe ecran:** conduci țestoasa, iar la fiecare apăsare pe **bara de spațiu** creionul se **ridică** sau se **coboară**: țestoasa desenează, apoi „sare” fără urmă, apoi desenează iar.

`t.isdown()` răspunde `True` dacă creionul este jos. Așa putem alege între cele două cazuri cu `if`.

Aici am folosit `onkey` (reacționează când **lași** tasta), pentru că vrem **o singură comutare** per apăsare. `onkeypress` reacționează în momentul apăsării și se repetă dacă ții tasta apăsată: bun pentru mișcare.

### Exemplul 5 — Grosimea liniei

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.shape("turtle")

setari = {"grosime": 2}

def sus():
    t.forward(20)

def groasa():
    setari["grosime"] += 2
    t.pensize(setari["grosime"])
    print("Grosime:", setari["grosime"])

def subtire():
    if setari["grosime"] > 2:
        setari["grosime"] -= 2
    t.pensize(setari["grosime"])
    print("Grosime:", setari["grosime"])

groasa()
groasa()
subtire()

screen.listen()
screen.onkeypress(sus, "Up")
screen.onkey(groasa, "plus")
screen.onkey(subtire, "minus")

turtle.done()
```

**Ieșire:**
```text
Grosime: 4
Grosime: 6
Grosime: 4
```

**Ce vezi pe ecran:** țestoasa merge înainte cu săgeata sus. Tasta **+** (`"plus"`) face linia mai groasă, tasta **−** (`"minus"`) o face mai subțire, dar nu mai mult decât grosimea 2. Cele trei apeluri de la început (`groasa`, `groasa`, `subtire`) arată de câte ori se schimbă grosimea: de la 2 la 4, apoi la 6 și înapoi la 4.

Valoarea grosimii o păstrăm într-un **dicționar** (`setari`), ca să o putem schimba din mai multe funcții.

---

## 4. Ștergere și viteză

### Exemplul 6 — Ștergem și ne întoarcem acasă

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.shape("turtle")

def sus():
    t.forward(20)

def stanga():
    t.left(30)

def dreapta():
    t.right(30)

def sterge():
    t.clear()

def acasa():
    t.penup()
    t.home()
    t.pendown()

screen.listen()
screen.onkeypress(sus, "Up")
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")
screen.onkey(sterge, "c")
screen.onkey(acasa, "h")

turtle.done()
```

**Ce vezi pe ecran:** conduci țestoasa și desenezi. La tasta **c** („clear”) desenul **dispare**, dar țestoasa rămâne pe loc. La tasta **h** („home”) ea se întoarce în **centrul** ferestrei, fără să deseneze și privind spre dreapta.

### Exemplul 7 — Pas mai mare, pas mai mic

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()
t.shape("turtle")

setari = {"pas": 10}

def sus():
    t.forward(setari["pas"])

def stanga():
    t.left(30)

def dreapta():
    t.right(30)

def mai_repede():
    setari["pas"] += 5
    print("Pas:", setari["pas"])

def mai_incet():
    if setari["pas"] > 5:
        setari["pas"] -= 5
    print("Pas:", setari["pas"])

mai_repede()
mai_repede()
mai_incet()
mai_incet()
mai_incet()
mai_incet()

screen.listen()
screen.onkeypress(sus, "Up")
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")
screen.onkey(mai_repede, "f")
screen.onkey(mai_incet, "l")

turtle.done()
```

**Ieșire:**
```text
Pas: 15
Pas: 20
Pas: 15
Pas: 10
Pas: 5
Pas: 5
```

**Ce vezi pe ecran:** săgeata sus face un pas egal cu `setari["pas"]`. Cu **f** pasul crește cu 5, cu **l** scade cu 5, dar niciodată sub 5. Cele șase apeluri de la început arată cum se schimbă pasul (începe de la 10).

---

## 5. Mișcare automată și pereți

### Exemplul 8 — Țestoasa merge singură

```python
import turtle

screen = turtle.Screen()
screen.setup(600, 600)

t = turtle.Turtle()
t.shape("turtle")
t.color("darkgreen")
t.penup()

def stanga():
    t.left(20)

def dreapta():
    t.right(20)

def muta():
    t.forward(3)
    screen.ontimer(muta, 30)

screen.listen()
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")
muta()

turtle.done()
```

**Ce vezi pe ecran:** țestoasa **merge singură**, încet, spre dreapta. Cu săgețile **stânga** și **dreapta** o **virezi** ca la volan. Nu mai trebuie să apeși „înainte”.

Cum merge: funcția `muta()` face un pas mic, apoi spune ecranului: `ontimer(muta, 30)`, adică „apelează-mă din nou peste 30 de milisecunde”. Așa se repetă la nesfârșit (aproximativ 33 de pași pe secundă). Este bucla unui joc, făcută cu cronometru.

### Exemplul 9 — Pereți: țestoasa se întoarce

```python
import turtle

screen = turtle.Screen()
screen.setup(600, 600)
screen.title("Nu iesi din ecran!")

t = turtle.Turtle()
t.shape("turtle")
t.color("darkgreen")
t.penup()

def stanga():
    t.left(20)

def dreapta():
    t.right(20)

def muta():
    t.forward(4)
    if abs(t.xcor()) > 280 or abs(t.ycor()) > 280:
        t.right(180)
    screen.ontimer(muta, 30)

screen.listen()
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")
muta()

turtle.done()
```

**Ce vezi pe ecran:** ca la Exemplul 8, dar când țestoasa ajunge aproape de marginea ferestrei (la mai mult de 280 de pași de centru pe orizontală sau verticală) **se întoarce înapoi**, ca la un perete. Nu mai poate ieși din ecran!

`abs(...)` este valoarea fără semn: `abs(-300)` este `300`. Așa verificăm cu o singură condiție atât marginea din stânga, cât și pe cea din dreapta.

---

## 6. Mini-proiect

### Exemplul 10 — Tabla de desen

```python
import turtle

screen = turtle.Screen()
screen.setup(700, 600)
screen.title("Tabla de desen")
screen.bgcolor("white")

t = turtle.Turtle()
t.shape("turtle")
t.pensize(3)

setari = {"grosime": 3}

def sus():
    t.forward(15)

def jos():
    t.backward(15)

def stanga():
    t.left(20)

def dreapta():
    t.right(20)

def culoare(nume):
    t.color(nume)

def rosu():
    culoare("red")

def verde():
    culoare("green")

def albastru():
    culoare("blue")

def negru():
    culoare("black")

def groasa():
    setari["grosime"] += 2
    t.pensize(setari["grosime"])

def subtire():
    if setari["grosime"] > 2:
        setari["grosime"] -= 2
    t.pensize(setari["grosime"])

def comuta_creion():
    if t.isdown():
        t.penup()
    else:
        t.pendown()

def sterge():
    t.clear()

print("TABLA DE DESEN")
print("Sageti: misca testoasa")
print("r g b n: culori")
print("plus / minus: grosime")
print("spatiu: creion sus / jos")
print("c: sterge desenul")

screen.listen()
screen.onkeypress(sus, "Up")
screen.onkeypress(jos, "Down")
screen.onkeypress(stanga, "Left")
screen.onkeypress(dreapta, "Right")
screen.onkey(rosu, "r")
screen.onkey(verde, "g")
screen.onkey(albastru, "b")
screen.onkey(negru, "n")
screen.onkey(groasa, "plus")
screen.onkey(subtire, "minus")
screen.onkey(comuta_creion, "space")
screen.onkey(sterge, "c")

turtle.done()
```

**Ieșire:**
```text
TABLA DE DESEN
Sageti: misca testoasa
r g b n: culori
plus / minus: grosime
spatiu: creion sus / jos
c: sterge desenul
```

**Ce vezi pe ecran:** o fereastră albă de 700 × 600, cu țestoasa în centru. Cu **săgețile** o conduci, cu **r, g, b, n** schimbi culoarea (roșu, verde, albastru, negru), cu **+** și **−** schimbi grosimea, cu **spațiu** ridici sau cobori creionul, iar cu **c** ștergi desenul. În fereastra de text apar, o dată, instrucțiunile.

Observă funcția `culoare(nume)`: cele patru funcții de culoare o folosesc ca să nu repete codul. Funcțiile legate de taste nu au voie să aibă parametri, de aceea `rosu`, `verde` etc. apelează ele funcția `culoare`.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Tabla de desen” (obligatoriu)
Pornește de la Exemplul 10 și fă-o **a ta**. Adaugă:
1. încă **două culori** (de exemplu galben și mov) pe alte taste;
2. o tastă care **desenează un cerc** în locul în care se află țestoasa: `t.circle(30)`;
3. o tastă care **desenează un punct** colorat: `t.dot(20)`;
4. o tastă care **schimbă forma** țestoasei (`"turtle"`, `"arrow"`, `"circle"`);
5. instrucțiunile corecte la început, în fereastra de text.

### Exercițiul B — Ce se întâmplă?
Gândește-te, apoi verifică în Thonny. Ce face țestoasa dacă apeși de 3 ori **stânga**, apoi o dată **sus**?

```python
import turtle

screen = turtle.Screen()
t = turtle.Turtle()

def stanga():
    t.left(30)

def sus():
    t.forward(50)

screen.listen()
screen.onkeypress(stanga, "Left")
screen.onkeypress(sus, "Up")

turtle.done()
```

### Exercițiul C — Tasta turbo
Adaugă o tastă `"t"` care face pasul `sus` de **trei ori mai mare**, pe care îl ții într-un dicționar `setari`. Încă o tastă `"n"` îl readuce la normal.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
import turtle
t = turtle.Turtle()
screen = turtle.Screen()
def sus()
    t.forward(20)
screen.onkey(sus(), "up")
turtle.done()
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce nu scriem paranteze după numele funcției în `onkeypress(sus, "Up")`?  
2. La ce folosește `screen.listen()`?  
3. Ce diferență este între `onkey` și `onkeypress`?

**Gata când:**
- [ ] Tabla de desen are săgeți, 6 culori și grosime  
- [ ] Creionul poate fi ridicat și coborât din tastatură  
- [ ] Ai adăugat tastele pentru cerc, punct și formă  
- [ ] Ai explicat pe foaie de ce nu punem paranteze  
- [ ] Fișierul se numește `Prenume_Nume_P3_L6.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Fă țestoasa să meargă **singură** (cu `ontimer`) pe tabla de desen  
- [ ] Adaugă o tastă care desenează o **stea** în locul țestoasei  
- [ ] Controlează țestoasa cu **W, A, S, D** în loc de săgeți  
- [ ] Fă un joc cu **două țestoase**, una cu săgeți și una cu W, A, S, D  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Nu se întâmplă nimic la apăsare | Lipsește `screen.listen()` sau fereastra nu are „focus” | Adaugă `screen.listen()` și dă click pe fereastră |
| Funcția se execută o singură dată, imediat | Ai scris `onkeypress(sus(), "Up")` cu paranteze | `onkeypress(sus, "Up")` |
| `TypeError: sus() takes 1 positional argument but 0 were given` | Funcția legată de tastă are parametri | Funcțiile legate de taste nu primesc parametri |
| Tasta nu merge | Ai scris `"up"` sau `"Space"` | `"Up"` și `"space"` |
| `NameError: name 'screen' is not defined` | Ai uitat `screen = turtle.Screen()` | Creează ecranul înaintea tastelor |
| Țestoasa face un singur pas, chiar dacă ții tasta apăsată | Ai folosit `onkey`, care reacționează doar la lăsarea tastei | Pentru mișcare continuă folosește `onkeypress` |
| Cronometrul nu repetă | Lipsește `screen.ontimer(...)` în interiorul funcției | `screen.ontimer(muta, 30)` la finalul funcției `muta` |

---

## Recapitulare pe scurt

- Programarea cu evenimente: „când se întâmplă X, execută funcția Y”.
- Pași: scrii funcția (fără parametri), `screen.listen()`, apoi `screen.onkeypress(functia, "Tasta")`.
- Numele funcției se dă **fără paranteze**.
- `onkeypress` reacționează la apăsare (și se repetă), `onkey` la lăsarea tastei.
- Nume de taste: `"Up"`, `"Down"`, `"Left"`, `"Right"`, `"space"`, `"r"`, `"plus"`, `"minus"`.
- `screen.ontimer(functia, ms)` apelează funcția după `ms` milisecunde: așa se face mișcarea automată.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Fă un **labirint simplu**: desenează 4 pereți și conduci țestoasa cu săgețile.  
3. Adaugă la Tabla de desen o tastă care desenează un **pătrat** în locul țestoasei.  
4. **Bonus:** adaugă o **a doua țestoasă** care merge singură (cu `ontimer`), într-un cerc.  
5. Salvează totul ca `Tema_P3_L6_Prenume_Nume.py`.

---

## Ce urmează — Lecția 7
**Mouse: click și desenezi**: ecranul reacționează la click și la mișcarea mouse-ului.
