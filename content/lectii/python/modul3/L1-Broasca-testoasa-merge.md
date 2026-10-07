# LECȚIA 1 — Broasca țestoasă merge
**Modulul 3 · Desenăm cu Turtle · 2 ore**  
**Code Maker Club · Turtle Artist**

> Până acum programele tale scriau text. Azi ele **desenează**! În Python există o „broască țestoasă” care merge pe ecran și lasă o urmă în spatele ei. Tu îi dai comenzi, iar ea desenează.  
> Proiect: **„Scara țestoasei”** · fișier: `Prenume_Nume_P3_L1.py`

---

## Obiectiv
La finalul orei pornești o fereastră Turtle, miști țestoasa cu `forward`, `backward`, `left`, `right`, desenezi un pătrat cu `for`, ridici și cobori creionul și muți țestoasa cu `goto`.  
**Minim:** o fereastră cu o linie și un pătrat desenat.  
**Ținta orei (Complet):** + țestoasa schimbă locul fără să deseneze și desenezi „scara” din mini-proiect.

## De ce contează
Desenul este cea mai bună metodă să **vezi** ce face un program. Dacă ceva nu merge, vezi imediat unde a greșit țestoasa. Și, în plus, e distractiv: desenele de azi sunt baza pentru jocuri.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare Modulul 2 |
| 10–30 | Prima fereastră și prima linie (**Exemplele 1–2**) |
| 30–55 | Unghiuri și pătratul (**Exemplele 3–5**) |
| 55–75 | Viteză, formă, creion (**Exemplele 6–7**) |
| 75–90 | Unde este țestoasa? Text pe ecran (**Exemplele 8–9**) |
| 90–115 | Mini-proiect (**Exemplul 10**) |
| 115–120 | Recap și temă |

---

## 1. Recapitulare rapidă din Modulul 2

- Bucla `for i in range(n)` repetă de `n` ori.
- O funcție se definește cu `def` și se apelează cu `nume()`.
- Indentarea (4 spații) arată ce face parte din buclă.

**Încearcă tu (3 min)**  
- [ ] Scrie o buclă care afișează „Salut!” de 3 ori  

---

## 2. Prima fereastră

Pentru desen folosim un **modul** al lui Python, numit `turtle`. Un modul este o cutie cu unelte pregătite.

> **Atenție:** nu salva niciodată fișierul cu numele `turtle.py`! Python ar încerca să se importe pe el însuși și ar da eroare. Folosește numele din lecție, de exemplu `Ion_Popescu_P3_L1.py`.

### Exemplul 1 — Fereastra și o linie

```python
import turtle

t = turtle.Turtle()
t.forward(100)

turtle.done()
```

**Ce vezi pe ecran:**
- se deschide o fereastră cu fundal alb;
- o săgeată (țestoasa) pornește din centru și se mută **spre dreapta**;
- în urma ei rămâne o linie neagră lungă de 100 de pași.

Rând cu rând:
- `import turtle` aduce uneltele de desen;
- `t = turtle.Turtle()` creează o țestoasă și o numește `t`;
- `t.forward(100)` o face să meargă 100 de pași înainte;
- `turtle.done()` ține fereastra deschisă. Fără ea, fereastra s-ar închide imediat.

### Exemplul 2 — Înainte, înapoi, stânga, dreapta

```python
import turtle

t = turtle.Turtle()
t.forward(100)
t.left(90)
t.forward(100)
t.backward(50)

turtle.done()
```

**Ce vezi pe ecran:**
- o linie spre dreapta, lungă de 100;
- țestoasa se întoarce spre **în sus** și desenează o linie de 100 în sus;
- apoi merge **înapoi** 50 de pași, deci o parte din linia verticală se desenează de două ori (nu se observă diferența).

Comenzile sunt:

| Comandă | Ce face |
|---------|---------|
| `forward(n)` | merge `n` pași înainte |
| `backward(n)` | merge `n` pași înapoi |
| `left(g)` | se rotește la stânga cu `g` grade |
| `right(g)` | se rotește la dreapta cu `g` grade |

---

## 3. Unghiuri și pătratul

Un cerc complet are **360 de grade**. Un colț „drept” (ca la un caiet) are **90 de grade**.

### Exemplul 3 — `left` și `right`

```python
import turtle

t = turtle.Turtle()
t.forward(80)
t.left(90)
t.forward(80)
t.right(90)
t.forward(80)

turtle.done()
```

**Ce vezi pe ecran:** o formă de „scară” cu o treaptă: spre dreapta 80, în sus 80, din nou spre dreapta 80.

`left` o întoarce spre stânga, `right` spre dreapta. După fiecare rotire, `forward` merge în **noua** direcție.

### Exemplul 4 — Pătratul „cu mâna”

```python
import turtle

t = turtle.Turtle()
t.forward(100)
t.left(90)
t.forward(100)
t.left(90)
t.forward(100)
t.left(90)
t.forward(100)
t.left(90)

turtle.done()
```

**Ce vezi pe ecran:** un pătrat cu latura de 100. Țestoasa se întoarce la punctul de plecare și privește din nou spre dreapta.

### Exemplul 5 — Pătratul cu `for`

```python
import turtle

t = turtle.Turtle()
for i in range(4):
    t.forward(100)
    t.left(90)

turtle.done()
```

**Ce vezi pe ecran:** exact același pătrat ca la Exemplul 4, dar cu 3 linii în loc de 8. Ai învățat în Modulul 2 că `for` repetă instrucțiunile: acum le folosești la desen.

---

## 4. Viteză, formă și creion

### Exemplul 6 — Țestoasă adevărată și viteză

```python
import turtle

t = turtle.Turtle()
t.shape("turtle")
t.speed(1)
for i in range(4):
    t.forward(100)
    t.left(90)

turtle.done()
```

**Ce vezi pe ecran:** în loc de săgeată apare o **mică țestoasă**, iar pătratul se desenează **foarte încet**.

| Comandă | Ce face |
|---------|---------|
| `shape("turtle")` | schimbă forma: `"arrow"`, `"turtle"`, `"circle"`, `"square"`, `"triangle"` |
| `speed(n)` | viteza, de la `1` (lent) la `10` (rapid); `0` = cel mai rapid |

### Exemplul 7 — Ridicăm creionul

```python
import turtle

t = turtle.Turtle()
t.forward(100)
t.penup()
t.goto(-100, 50)
t.pendown()
t.forward(100)

turtle.done()
```

**Ce vezi pe ecran:** **două linii separate**. Prima merge de la centru spre dreapta. A doua este puțin mai sus și mai la stânga, de la `(-100, 50)` până în centrul de sus. Țestoasa a „sărit” fără să deseneze.

- `penup()` ridică creionul: de acum **nu mai desenează**;
- `goto(x, y)` mută țestoasa direct în punctul `(x, y)`;
- `pendown()` coboară creionul.

Fereastra are un sistem de coordonate: centrul este `(0, 0)`. `x` crește spre **dreapta**, `y` crește în **sus**. Deci `(-100, 50)` este la stânga și deasupra centrului.

---

## 5. Unde este țestoasa?

### Exemplul 8 — Poziția și direcția

```python
import turtle

t = turtle.Turtle()
print("Start:", t.xcor(), t.ycor(), t.heading())
t.forward(100)
t.left(90)
t.forward(50)
print("Acum:", round(t.xcor()), round(t.ycor()), round(t.heading()))

turtle.done()
```

**Ieșire:**
```text
Start: 0.0 0.0 0.0
Acum: 100 50 90
```

`xcor()` și `ycor()` dau poziția, iar `heading()` dă direcția în grade: `0` = spre dreapta, `90` = în sus, `180` = spre stânga, `270` = în jos. Folosim `round(...)` ca să scăpăm de zecimalele foarte mici care pot apărea la calcule.

### Exemplul 9 — Scriem pe ecran

```python
import turtle

t = turtle.Turtle()
t.penup()
t.goto(-100, 0)
t.write("Salut, Turtle!", font=("Arial", 24, "bold"))
t.hideturtle()

turtle.done()
```

**Ce vezi pe ecran:** textul **Salut, Turtle!** scris îngroșat, pornind din stânga ecranului. Țestoasa este ascunsă.

`write("text", font=(nume, mărime, stil))` scrie pe ecran. `hideturtle()` ascunde țestoasa (`showturtle()` o arată din nou).

---

## 6. Mini-proiect

### Exemplul 10 — Scara țestoasei

```python
import turtle

t = turtle.Turtle()
t.shape("turtle")
t.speed(3)

t.penup()
t.goto(-120, -100)
t.pendown()

for treapta in range(5):
    t.forward(40)
    t.left(90)
    t.forward(40)
    t.right(90)

turtle.done()
```

**Ce vezi pe ecran:** o **scară cu 5 trepte**, care urcă spre dreapta. Fiecare treaptă înseamnă: 40 spre dreapta, 40 în sus, apoi țestoasa se îndreaptă din nou spre dreapta. Scara începe jos, în partea stângă a ferestrei.

Începem cu `penup()` și `goto`, ca desenul să nu pornească din centru. Treapta se repetă de 5 ori cu `for`.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Scara țestoasei” (obligatoriu)
Pornește de la Exemplul 10 și fă-ți propriul desen:
1. scara are **cel puțin 6 trepte**;
2. treptele au altă mărime decât în exemplu;
3. desenează **încă o formă** lângă scară (un pătrat, o linie) mutând țestoasa cu `penup`, `goto`, `pendown`;
4. scrie pe ecran numele tău cu `write`.

### Exercițiul B — Ce desenează?
Gândește-te, apoi verifică în Thonny:

```python
import turtle

t = turtle.Turtle()
t.forward(100)
t.left(90)
t.forward(100)
t.left(90)
t.forward(50)

turtle.done()
```

### Exercițiul C — Triunghiul
Desenează un **triunghi** cu laturile egale. Indiciu: pătratul are 4 laturi și se rotește cu 90°. Pentru triunghi, rotirea este `360 / 3`. Câte grade e asta?

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
import Turtle
t = turtle.Turtle()
t.forward(100
t.left(90)
t.Forward(50)
turtle.done
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. La ce folosește `turtle.done()`?  
2. Care este diferența dintre `left(90)` și `right(90)`?  
3. Ce face `penup()`?

**Gata când:**
- [ ] Scara are cel puțin 6 trepte  
- [ ] Ai desenat încă o formă, mutând țestoasa fără să deseneze  
- [ ] Ai scris numele pe ecran  
- [ ] Ai desenat triunghiul  
- [ ] Ai explicat pe foaie `done()`, `left` și `penup`  
- [ ] Fișierul se numește `Prenume_Nume_P3_L1.py` (nu `turtle.py`)  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Desenează un **dreptunghi** (laturi diferite, 150 și 80)  
- [ ] Desenează inițiala numelui tău din linii  
- [ ] Desenează o **casă** simplă: pătrat + triunghi deasupra  
- [ ] Desenează un pătrat cu `forward` și `right` în loc de `left`; ce diferență vezi?  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Fereastra se închide imediat | Lipsește `turtle.done()` la final | Adaugă `turtle.done()` pe ultimul rând |
| `AttributeError: partially initialized module 'turtle'` | Fișierul tău se numește `turtle.py` | Redenumește fișierul |
| `NameError: name 'turtle' is not defined` | Lipsește `import turtle` sau l-ai scris cu majusculă | `import turtle` (litere mici) |
| `AttributeError: 'Turtle' object has no attribute 'Forward'` | Ai scris comanda cu majusculă | `t.forward(...)` |
| Țestoasa desenează o linie nedorită spre un punct | Ai folosit `goto` cu creionul jos | `penup()` înainte de `goto` |
| Pătratul nu se închide | Unghiul nu este 90 sau nu s-a repetat de 4 ori | `for i in range(4)` și `left(90)` |
| Ai instrucțiuni după `turtle.done()` și nu se execută | `done()` așteaptă închiderea ferestrei | Pune `done()` ultima |

---

## Recapitulare pe scurt

- `import turtle` și `t = turtle.Turtle()` creează țestoasa.
- `forward`, `backward`, `left`, `right` o mișcă și o rotesc.
- `for` repetă desenul: pătratul are 4 laturi și rotiri de 90°.
- `penup()`, `goto(x, y)`, `pendown()` mută țestoasa fără să deseneze.
- `xcor()`, `ycor()`, `heading()` spun unde este și încotro privește.
- `write(...)` scrie text; `turtle.done()` ține fereastra deschisă.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Desenează o **scară care coboară** în loc să urce.  
3. Desenează **trei pătrate** puse unul lângă altul (mută țestoasa între ele).  
4. **Bonus:** desenează un pătrat în care fiecare latură are altă lungime, cu `for` și lista `[50, 80, 110, 140]`.  
5. Salvează totul ca `Tema_P3_L1_Prenume_Nume.py`.

---

## Ce urmează — Lecția 2
**Forme și culori**: triunghiuri, cercuri, culori și umplerea formelor.
