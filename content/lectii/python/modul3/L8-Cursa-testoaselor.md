# LECȚIA 8 — Cursa țestoaselor
**Modulul 3 · Desenăm cu Turtle · 2 ore**  
**Code Maker Club · Turtle Artist**

> Până acum aveai o singură țestoasă. Azi sunt **cinci**, și aleargă una contra alteia! Care ajunge prima? Nu se știe: fiecare pas este ales la întâmplare. Poți și să pariezi pe câștigătoare.  
> Proiect: **„Cursa țestoaselor”** · fișier: `Prenume_Nume_P3_L8.py`

---

## Obiectiv
La finalul orei creezi mai multe țestoase, le ții într-o listă, le muți cu pași aleatori, oprești cursa când una trece de linia de sosire, afli câștigătoarea, faci un clasament și construiești o cursă cu pariu.  
**Minim:** două țestoase care aleargă până la linia de sosire și un câștigător afișat.  
**Ținta orei (Complet):** + cinci țestoase, clasament și pariu.

## De ce contează
Aproape orice joc are **mai multe personaje** care se mișcă în același timp: inamici, mașini, jucători. Ca să le gestionezi, le pui într-o **listă** și le muți cu o buclă. Așa vei face și în Pygame.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L7 |
| 10–30 | Două țestoase și linia de sosire (**Exemplele 1–3**) |
| 30–50 | Cursa cu două țestoase (**Exemplul 4**) |
| 50–70 | Lista de țestoase (**Exemplele 5–6**) |
| 70–90 | Funcții: câștigătorul și clasamentul (**Exemplele 7–8**) |
| 90–100 | Pariul (**Exemplul 9**) |
| 100–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L7

- Funcția legată de click primește `x` și `y`.
- Un dicționar sau o listă păstrează date între apeluri.
- `random.randint(a, b)` alege un număr întreg între `a` și `b`.

**Încearcă tu (3 min)**  
- [ ] Alege un număr aleator între 1 și 8 și afișează-l  

---

## 2. Țestoase la start

### Exemplul 1 — Două țestoase

```python
import turtle

a = turtle.Turtle()
a.shape("turtle")
a.color("red")
a.penup()
a.goto(-200, 40)

b = turtle.Turtle()
b.shape("turtle")
b.color("blue")
b.penup()
b.goto(-200, -40)

turtle.done()
```

**Ce vezi pe ecran:** **două țestoase**, una roșie și una albastră, în partea stângă a ferestrei, una deasupra celeilalte. Fiecare țestoasă are propriul nume (`a`, `b`) și propriile comenzi, independente una de alta.

### Exemplul 2 — Linia de sosire

```python
import turtle

START = -200
FINAL = 200

linie = turtle.Turtle()
linie.hideturtle()
linie.speed(0)
linie.pensize(3)

linie.penup()
linie.goto(START - 20, 100)
linie.pendown()
linie.goto(START - 20, -100)

linie.penup()
linie.goto(FINAL, 100)
linie.pendown()
linie.color("red")
linie.goto(FINAL, -100)

turtle.done()
```

**Ce vezi pe ecran:** **două linii verticale** lungi de 200: una **neagră** la start (la stânga) și una **roșie** la sosire (la dreapta). `START` și `FINAL` sunt **constante**: nume scrise cu litere mari pentru valori care nu se schimbă. Dacă vrei o pistă mai lungă, le schimbi într-un singur loc.

### Exemplul 3 — O țestoasă aleargă

```python
import random
import turtle

START = -200
FINAL = 200

t = turtle.Turtle()
t.shape("turtle")
t.color("green")
t.penup()
t.goto(START, 0)

for pas in range(30):
    t.forward(random.randint(1, 15))

print("A mers spre dreapta:", t.xcor() > START)

turtle.done()
```

**Ieșire:**
```text
A mers spre dreapta: True
```

**Ce vezi pe ecran:** o țestoasă verde care face **30 de pași** de mărimi diferite (de la 1 la 15) și se oprește. De fiecare dată ajunge în alt loc, pentru că pașii sunt aleatori. Rândul `print` este un test: țestoasa a făcut doar pași înainte, deci răspunsul este mereu `True`.

---

## 3. Cursa cu două țestoase

### Exemplul 4 — Cine ajunge prima?

```python
import random
import turtle

START = -200
FINAL = 200

a = turtle.Turtle()
a.shape("turtle")
a.color("red")
a.penup()
a.goto(START, 40)

b = turtle.Turtle()
b.shape("turtle")
b.color("blue")
b.penup()
b.goto(START, -40)

while a.xcor() < FINAL and b.xcor() < FINAL:
    a.forward(random.randint(1, 8))
    b.forward(random.randint(1, 8))

if a.xcor() >= FINAL:
    print("A castigat testoasa ROSIE!")
else:
    print("A castigat testoasa ALBASTRA!")

turtle.done()
```

**Ieșire (la tine poate fi alta, pentru că pașii sunt aleatori):**
```text
A castigat testoasa ALBASTRA!
```

**Ce vezi pe ecran:** cele două țestoase pornesc de la start și **aleargă spre dreapta**, cu pași diferiți, până când **una** trece de `FINAL`. Atunci bucla `while` se oprește, iar în fereastra de text apare câștigătoarea.

Bucla `while` merge **cât timp amândouă** sunt încă înainte de linia de sosire. (Dacă amândouă trec linia în același pas, câștigă roșia, pentru că o verificăm prima.)

---

## 4. Mai multe țestoase: lista

### Exemplul 5 — Cinci țestoase într-o listă

```python
import turtle

culori = ["red", "blue", "green", "orange", "purple"]
testoase = []

for i in range(5):
    x = turtle.Turtle()
    x.shape("turtle")
    x.color(culori[i])
    x.penup()
    x.goto(-200, 100 - i * 50)
    testoase.append(x)

print("Numar de testoase:", len(testoase))

turtle.done()
```

**Ieșire:**
```text
Numar de testoase: 5
```

**Ce vezi pe ecran:** **cinci țestoase** (roșie, albastră, verde, portocalie, mov), una sub alta, la același start. Pe verticală sunt la distanța de 50: `y = 100, 50, 0, -50, -100`.

Nu mai dăm fiecărei țestoase un nume separat. Le **adăugăm într-o listă** (`testoase.append(x)`) și ne referim la ele prin poziția din listă: `testoase[0]`, `testoase[1]` și așa mai departe.

### Exemplul 6 — Cursa celor cinci

```python
import random
import turtle

culori = ["red", "blue", "green", "orange", "purple"]
nume = ["rosu", "albastru", "verde", "portocaliu", "mov"]
FINAL = 200
testoase = []

for i in range(5):
    x = turtle.Turtle()
    x.shape("turtle")
    x.color(culori[i])
    x.penup()
    x.goto(-200, 100 - i * 50)
    x.speed(0)
    testoase.append(x)

castigator = -1
while castigator == -1:
    for i in range(5):
        testoase[i].forward(random.randint(1, 8))
        if testoase[i].xcor() >= FINAL and castigator == -1:
            castigator = i

print("A castigat:", nume[castigator])

turtle.done()
```

**Ieșire (la tine poate fi alta):**
```text
A castigat: verde
```

**Ce vezi pe ecran:** cele cinci țestoase aleargă și cursa se oprește când prima trece de linia `x = 200`.

Variabila `castigator` pornește de la `-1` (nimeni). Când o țestoasă trece linia, în `castigator` se păstrează **numărul ei din listă** (0, 1, 2, 3 sau 4), iar `nume[castigator]` ne dă culoarea.

---

## 5. Funcții: câștigătorul și clasamentul

### Exemplul 7 — Cine este mai departe?

```python
def cel_mai_departe(pozitii, nume):
    cel_mai_mare = max(pozitii)
    loc = pozitii.index(cel_mai_mare)
    return nume[loc]

pozitii = [120, 250, 180, 90, 240]
nume = ["rosu", "albastru", "verde", "portocaliu", "mov"]

print("In frunte:", cel_mai_departe(pozitii, nume))
print("Distanta maxima:", max(pozitii))
print("Ultimul loc:", nume[pozitii.index(min(pozitii))])
```

**Ieșire:**
```text
In frunte: albastru
Distanta maxima: 250
Ultimul loc: portocaliu
```

Funcția primește două liste: **pozițiile** țestoaselor și **numele** lor. `max(pozitii)` găsește valoarea cea mai mare, `pozitii.index(...)` spune la ce poziție din listă se află, iar `nume[loc]` ne dă numele acelei țestoase. Pozițiile și numele sunt în aceeași ordine.

### Exemplul 8 — Clasamentul

```python
def clasament(pozitii, nume):
    perechi = []
    for i in range(len(pozitii)):
        perechi.append([pozitii[i], nume[i]])
    perechi.sort(reverse=True)
    rezultat = []
    for pereche in perechi:
        rezultat.append(pereche[1])
    return rezultat

pozitii = [120, 250, 180, 90, 240]
nume = ["rosu", "albastru", "verde", "portocaliu", "mov"]

ordine = clasament(pozitii, nume)
for loc in range(len(ordine)):
    print(f"{loc + 1}. {ordine[loc]}")
```

**Ieșire:**
```text
1. albastru
2. mov
3. verde
4. rosu
5. portocaliu
```

Funcția pune fiecare **poziție** împreună cu **numele** (o listă mică `[poziție, nume]`), sortează lista descrescător (cel mai departe primul) și păstrează doar numele. Așa obținem clasamentul: albastru (250), mov (240), verde (180), roșu (120) și portocaliu (90).

---

## 6. Pariul

### Exemplul 9 — Alegem câștigătoarea

```python
import turtle

screen = turtle.Screen()
nume = ["rosu", "albastru", "verde", "portocaliu", "mov"]

pariu = screen.textinput("Pariu", "Pe ce culoare pariezi? (rosu, albastru, verde, portocaliu, mov)")
if pariu is None:
    pariu = ""
pariu = pariu.lower().strip()

if pariu in nume:
    print("Ai pariat pe:", pariu)
else:
    print("Nu cunosc aceasta culoare:", pariu)

castigator = "verde"
if pariu == castigator:
    print("Ai castigat pariul!")
else:
    print("Ai pierdut pariul.")

turtle.done()
```

**Ieșire (dacă ai scris `verde` în căsuță):**
```text
Ai pariat pe: verde
Ai castigat pariul!
```

**Ce vezi pe ecran:** se deschide o **căsuță mică de dialog** cu întrebarea „Pe ce culoare pariezi?”. Scrii o culoare, apeși OK, iar în fereastra de text apare rezultatul. Aici câștigătoarea este scrisă direct în program (`"verde"`) ca să testăm; în jocul final ea va fi aleasă de cursă.

- `screen.textinput(titlu, mesaj)` este ca `input()`, dar într-o fereastră;
- dacă apeși **Cancel**, răspunsul este `None` și îl transformăm în text gol;
- `lower()` face literele mici, iar `strip()` taie spațiile de la margini: `" Verde "` devine `"verde"`.

---

## 7. Mini-proiect

### Exemplul 10 — Cursa țestoaselor

```python
import random
import time
import turtle

screen = turtle.Screen()
screen.setup(700, 500)
screen.tracer(0)

culori = ["red", "blue", "green", "orange", "purple"]
nume = ["rosu", "albastru", "verde", "portocaliu", "mov"]
START = -250
FINAL = 280

def deseneaza_pista():
    pista = turtle.Turtle()
    pista.hideturtle()
    pista.speed(0)
    pista.pensize(3)
    pista.penup()
    pista.goto(START - 15, 140)
    pista.pendown()
    pista.goto(START - 15, -140)
    pista.penup()
    pista.goto(FINAL, 140)
    pista.pendown()
    pista.color("red")
    pista.goto(FINAL, -140)
    pista.penup()
    pista.color("black")
    for i in range(5):
        pista.goto(-345, 95 - i * 50)
        pista.write(nume[i], font=("Arial", 10, "normal"))

def creeaza_testoase():
    lista = []
    for i in range(5):
        x = turtle.Turtle()
        x.shape("turtle")
        x.color(culori[i])
        x.penup()
        x.goto(START, 100 - i * 50)
        lista.append(x)
    return lista

def cursa(testoase):
    while True:
        for x in testoase:
            x.forward(random.randint(1, 8))
        screen.update()
        time.sleep(0.02)
        for i in range(len(testoase)):
            if testoase[i].xcor() >= FINAL:
                return i

def clasament(pozitii, nume):
    perechi = []
    for i in range(len(pozitii)):
        perechi.append([pozitii[i], nume[i]])
    perechi.sort(reverse=True)
    rezultat = []
    for pereche in perechi:
        rezultat.append(pereche[1])
    return rezultat

def main():
    pariu = screen.textinput("Pariu", "Pe ce culoare pariezi? (rosu, albastru, verde, portocaliu, mov)")
    if pariu is None:
        pariu = ""
    pariu = pariu.lower().strip()

    deseneaza_pista()
    testoase = creeaza_testoase()
    screen.update()

    castigator = cursa(testoase)
    print("A castigat:", nume[castigator])
    if pariu == nume[castigator]:
        print("Ai castigat pariul!")
    else:
        print("Ai pierdut pariul. Ai pariat pe:", pariu)

    pozitii = []
    for x in testoase:
        pozitii.append(x.xcor())
    print("CLASAMENT")
    ordine = clasament(pozitii, nume)
    for loc in range(len(ordine)):
        print(f"{loc + 1}. {ordine[loc]}")

main()

turtle.done()
```

**Ieșire (exemplu: jucătorul a pariat pe `albastru`; la tine va fi altfel):**
```text
A castigat: mov
Ai pierdut pariul. Ai pariat pe: albastru
CLASAMENT
1. mov
2. verde
3. rosu
4. portocaliu
5. albastru
```

**Ce vezi pe ecran:** o fereastră de 700 × 500. Întâi apare căsuța de pariu. Apoi se desenează pista (linie de start neagră, linie de sosire roșie, numele culorilor în stânga), iar cele cinci țestoase aleargă **simultan**, ușor, fără sacadări. Când prima trece linia, cursa se oprește.

Ce este nou aici:
- `screen.tracer(0)` oprește desenarea automată: ecranul se reîmprospătează doar când spunem noi `screen.update()`. Astfel mișcarea celor cinci țestoase este **fluidă**;
- `time.sleep(0.02)` face o pauză de 0,02 secunde la fiecare „cadru”, ca să putem vedea cursa;
- funcția `cursa` **returnează** numărul câștigătorului, iar `main()` folosește rezultatul.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Cursa țestoaselor” (obligatoriu)
Pornește de la Exemplul 10 și fă-o **a ta**:
1. cel puțin **6 țestoase**, cu culori și nume alese de tine;
2. **pista** desenată frumos (benzi, o sosire în carouri sau alt model);
3. pariul și mesajul final în **fereastra de desen** (cu `write`), nu doar în fereastra de text;
4. **clasamentul** complet afișat;
5. păstrează funcțiile (`deseneaza_pista`, `creeaza_testoase`, `cursa`, `main`).

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
pozitii = [30, 90, 60]
nume = ["rosu", "verde", "albastru"]
print(max(pozitii))
print(pozitii.index(max(pozitii)))
print(nume[pozitii.index(max(pozitii))])
```

### Exercițiul C — Țestoasa norocoasă
Modifică cursa, astfel încât, **o dată din 10 pași**, o țestoasă aleasă la întâmplare să primească un **bonus** de 20 de pași. Indiciu: `if random.randint(1, 10) == 1:`.

### Exercițiul D — Găsește greșelile
Programul are 3 greșeli. Rescrie-l corect:

```text
import turtle
import random
a = turtle.Turtle()
a.penup()
a.goto(-200, 0)
while a.xcor < 200
    a.forward(random.randint(1, 8)
print("Gata")
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce punem țestoasele într-o listă?  
2. La ce folosesc `screen.tracer(0)` și `screen.update()`?  
3. Cum aflăm câștigătoarea după ce se oprește cursa?

**Gata când:**
- [ ] Cursa are cel puțin 6 țestoase și pistă desenată  
- [ ] Pariul și rezultatul apar și pe ecran, nu doar în text  
- [ ] Clasamentul complet este afișat  
- [ ] Ai explicat pe foaie lista de țestoase și `tracer`  
- [ ] Fișierul se numește `Prenume_Nume_P3_L8.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă **mai multe curse la rând** și un tabel de puncte: 3 puncte pentru primul loc, 2 pentru al doilea, 1 pentru al treilea  
- [ ] Fă țestoasele să **sară** din când în când (un pas mare)  
- [ ] Fă o **cursă cu obstacole**: dacă o țestoasă ajunge într-o zonă marcată, pierde viteză  
- [ ] Adaugă **bani virtuali**: pariezi o sumă, câștigi dublu dacă ghicești  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `TypeError: '<' not supported between instances of 'method' and 'int'` | Ai scris `a.xcor` fără paranteze | `a.xcor()` |
| Țestoasele desenează linii pe pistă | Creionul este jos | `x.penup()` înainte de `goto` |
| Cursa nu se termină | Condiția buclei `while` nu se schimbă niciodată | Verifică dacă țestoasele chiar avansează (`forward`) |
| Cursa pare să sară direct la sfârșit | Nu ai `tracer(0)` / `update()` sau ai uitat `sleep` | Folosește `screen.update()` și `time.sleep(0.02)` |
| `IndexError: list index out of range` | Ai ales un număr de țestoasă care nu există | Indicii merg de la `0` la `len(lista) - 1` |
| Câștigătorul este greșit | Pozițiile și numele nu sunt în aceeași ordine | Păstrează aceeași ordine în ambele liste |
| `AttributeError: 'NoneType' object has no attribute 'lower'` | Ai apăsat Cancel în căsuța de pariu | `if pariu is None: pariu = ""` |

---

## Recapitulare pe scurt

- Fiecare țestoasă este un obiect separat: `x = turtle.Turtle()`.
- Mai multe țestoase se păstrează într-o **listă** și se mută cu o buclă `for`.
- Cursa merge până când condiția de oprire devine adevărată (`while`).
- Constantele (`START`, `FINAL`) se scriu cu litere mari.
- `max`, `index`, `sort(reverse=True)` ne ajută să găsim câștigătorul și clasamentul.
- `tracer(0)` + `update()` dau o animație fluidă; `time.sleep` încetinește.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Fă o cursă între **mașini** (alt shape: `"square"`, alt aspect) în loc de țestoase.  
3. Adaugă un mesaj în fereastra de desen: „Câștigă: ...”.  
4. **Bonus:** fă o cursă **pe verticală**, de jos în sus.  
5. Salvează totul ca `Tema_P3_L8_Prenume_Nume.py`.

---

## Ce urmează — Lecția 9
**Joc: Prinde steaua**: ținem scorul, timpul și viețile într-un joc complet cu Turtle.
