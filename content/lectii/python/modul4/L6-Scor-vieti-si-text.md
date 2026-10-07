# LECȚIA 6 — Scor, vieți și text
**Modulul 4 · Jocuri cu Pygame · 2 ore**  
**Code Maker Club · Game Creator**

> Un joc bun îți spune mereu **cum stai**: câte puncte ai, câte vieți îți mai rămân, la ce nivel ești și când ai pierdut. Azi învățăm tot ce ține de **informații pe ecran**: text, inimioare, bare, mesaje care apar și dispar, **meniuri** și **stări de joc**. La final construim „Ploaia de stele”.  
> Proiect: **„Ploaia de stele”** · fișier: `Prenume_Nume_P4_L6.py`

---

## Obiectiv
La finalul orei scrii text pe ecran cu o funcție proprie, afișezi scor, nivel și vieți (cu inimioare), folosești **stări de joc** (meniu, joc, pauză, final), calculezi nivelurile, afișezi mesaje temporare, desenezi o bară de progres și ții minte cel mai bun scor.  
**Minim:** scor și vieți afișate pe ecran.  
**Ținta orei (Complet):** + meniu, final, pauză, niveluri și jocul „Ploaia de stele”.

## De ce contează
Fără scor și vieți, un joc nu are miză. Fără meniu și ecran de final, nu are început și sfârșit. Aceste detalii fac diferența dintre „un desen care se mișcă” și **un joc adevărat**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L5 |
| 10–30 | Funcția `scrie` și scorul (**Exemplele 1–2**) |
| 30–45 | Vieți ca inimioare (**Exemplul 3**) |
| 45–70 | Stările jocului, nivelurile (**Exemplele 4–5**) |
| 70–90 | Pauză, mesaje, bare, record (**Exemplele 6–9**) |
| 90–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L5

- Coliziuni: `colliderect`, `collidepoint`, `collidelist`.
- Lista `ramase`: păstrăm doar obiectele care mai rămân în joc.
- Imunitatea după lovitură previne pierderea vieților dintr-o singură atingere.

**Încearcă tu (3 min)**  
- [ ] Scrie o funcție `dublu(x)` care returnează dublul lui `x`  

---

## 2. Text și scor

### Exemplul 1 — Funcția `scrie`

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 300))
pygame.display.set_caption("Text")
font = pygame.font.Font(None, 36)
font_mare = pygame.font.Font(None, 80)

def scrie(text, x, y, culoare=(255, 255, 255), fnt=None, centrat=False):
    if fnt is None:
        fnt = font
    imagine = fnt.render(text, True, culoare)
    if centrat:
        x = x - imagine.get_width() // 2
    ecran.blit(imagine, (x, y))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((20, 20, 50))
    scrie("Scor: 120", 20, 20)
    scrie("Nivel: 3", 20, 60, (255, 220, 0))
    scrie("GAME OVER", 300, 110, (255, 80, 80), font_mare, True)
    scrie("Apasa SPATIU", 300, 200, (200, 200, 200), None, True)
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal albastru închis: **„Scor: 120”** (alb) și **„Nivel: 3”** (galben) în stânga-sus; la mijloc, cu litere mari roșii, **„GAME OVER”**, iar dedesubt, gri, **„Apasa SPATIU”**.

Funcția `scrie` ascunde toți pașii (creează imaginea textului, o lipește) și are **valori implicite**: dacă nu spui culoarea, textul este alb; dacă nu spui fontul, se folosește fontul mic; `centrat=True` așază textul **cu mijlocul** în `x`. Din acest moment, orice text este o singură linie!

### Exemplul 2 — Scorul crește

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Click pe minge")
font = pygame.font.Font(None, 48)

CENTRU = (300, 220)
RAZA = 80
scor = 0

def in_cerc(punct, centru, raza):
    dx = punct[0] - centru[0]
    dy = punct[1] - centru[1]
    return (dx * dx + dy * dy) ** 0.5 <= raza

print(in_cerc((300, 220), CENTRU, RAZA))
print(in_cerc((350, 260), CENTRU, RAZA))
print(in_cerc((500, 50), CENTRU, RAZA))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.MOUSEBUTTONDOWN:
            if in_cerc(eveniment.pos, CENTRU, RAZA):
                scor += 1

    ecran.fill((255, 245, 220))
    pygame.draw.circle(ecran, (220, 40, 60), CENTRU, RAZA)
    text = font.render("Scor: " + str(scor), True, (60, 60, 60))
    ecran.blit(text, (20, 20))
    pygame.display.flip()

pygame.quit()
```

**Ieșire:**
```text
True
True
False
```

**Ce vezi pe ecran:** pe fundal crem, un **cerc roșu** mare și, sus, **„Scor: 0”**. De fiecare dată când dai click **în cerc**, scorul crește cu 1. Click-urile în afara lui nu contează.

Funcția `in_cerc(punct, centru, raza)` returnează `True` dacă punctul este în cerc. Primele trei rânduri `print` sunt teste: centrul este în cerc, punctul `(350, 260)` este la distanța ~64 (în cerc), iar `(500, 50)` este departe.

---

## 3. Vieți

### Exemplul 3 — Inimioare

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 300))
pygame.display.set_caption("Vieti")

def inima(x, y, marime, culoare):
    r = marime // 4
    pygame.draw.circle(ecran, culoare, (x - r, y), r)
    pygame.draw.circle(ecran, culoare, (x + r, y), r)
    pygame.draw.polygon(ecran, culoare, [(x - 2 * r, y + r // 2), (x + 2 * r, y + r // 2), (x, y + 3 * r)])

def deseneaza_vieti(vieti, maxim):
    for i in range(maxim):
        if i < vieti:
            inima(40 + i * 50, 40, 40, (230, 30, 60))
        else:
            inima(40 + i * 50, 40, 40, (90, 90, 100))

vieti = 3
print("Vieti ramase:", vieti, "din 5")

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_DOWN and vieti > 0:
                vieti -= 1
            if eveniment.key == pygame.K_UP and vieti < 5:
                vieti += 1

    ecran.fill((30, 30, 60))
    deseneaza_vieti(vieti, 5)
    pygame.display.flip()

pygame.quit()
```

**Ieșire:**
```text
Vieti ramase: 3 din 5
```

**Ce vezi pe ecran:** sus, în stânga, **cinci inimioare**: trei sunt **roșii** (vieți), două sunt **gri** (vieți pierdute). Cu săgeata **jos** pierzi o viață (o inimă devine gri), cu săgeata **sus** primești una înapoi (maximum 5).

Inima este făcută din **două cercuri** și **un triunghi** (jos). Funcția `deseneaza_vieti(vieti, maxim)` desenează `maxim` inimioare, în care primele `vieti` sunt roșii.

---

## 4. Stări și niveluri

### Exemplul 4 — Meniu, joc, final

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Stari de joc")
font = pygame.font.Font(None, 40)
font_mare = pygame.font.Font(None, 80)

stare = "meniu"
scor = 0

def scrie(text, y, fnt, culoare=(255, 255, 255)):
    imagine = fnt.render(text, True, culoare)
    ecran.blit(imagine, (300 - imagine.get_width() // 2, y))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_SPACE:
                if stare == "meniu" or stare == "final":
                    stare = "joc"
                    scor = 0
            if eveniment.key == pygame.K_UP and stare == "joc":
                scor += 1
            if eveniment.key == pygame.K_x and stare == "joc":
                stare = "final"

    if stare == "meniu":
        ecran.fill((20, 20, 70))
        scrie("JOCUL MEU", 120, font_mare, (255, 220, 0))
        scrie("Apasa SPATIU ca sa incepi", 230, font)
    elif stare == "joc":
        ecran.fill((20, 90, 40))
        scrie("Joaca! Scor: " + str(scor), 150, font_mare)
        scrie("Sus = +1 punct, X = termina", 260, font)
    else:
        ecran.fill((90, 20, 20))
        scrie("GAME OVER", 110, font_mare, (255, 120, 120))
        scrie("Scor final: " + str(scor), 220, font)
        scrie("SPATIU = joc nou", 280, font)

    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** trei „ecrane”, pe rând:
- **meniu**: fundal albastru, titlul **„JOCUL MEU”** galben și „Apasa SPATIU ca sa incepi”;
- **joc**: fundal verde, scorul mare; săgeata **sus** adaugă puncte, tasta **X** termină jocul;
- **final**: fundal roșu închis, **„GAME OVER”**, scorul final și „SPATIU = joc nou”.

Variabila **`stare`** (un text: `"meniu"`, `"joc"` sau `"final"`) ne spune **ce se întâmplă acum**. Tastele fac **tranziții** între stări, iar `if / elif / else` desenează ecranul potrivit. Așa funcționează aproape orice joc.

### Exemplul 5 — Nivelurile

```python
def nivel_pentru_scor(scor):
    return scor // 5 + 1

def viteza_pentru_nivel(nivel):
    return 3 + nivel

for scor in [0, 4, 5, 9, 10, 23]:
    nivel = nivel_pentru_scor(scor)
    print("Scor", scor, "-> nivel", nivel, ", viteza", viteza_pentru_nivel(nivel))
```

**Ieșire:**
```text
Scor 0 -> nivel 1 , viteza 4
Scor 4 -> nivel 1 , viteza 4
Scor 5 -> nivel 2 , viteza 5
Scor 9 -> nivel 2 , viteza 5
Scor 10 -> nivel 3 , viteza 6
Scor 23 -> nivel 5 , viteza 8
```

La fiecare **5 puncte** începe un **nivel nou** (`scor // 5` este câtul împărțirii întregi: 0 pentru 0–4, 1 pentru 5–9, 2 pentru 10–14 etc.). Cu cât nivelul este mai mare, cu atât jocul este mai **rapid**. Așa jocul rămâne provocator.

---

## 5. Pauză, mesaje, bare, record

### Exemplul 6 — Pauză

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 300))
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 60)

x = 0
viteza = 4
pauza = False

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN and eveniment.key == pygame.K_p:
            pauza = not pauza

    if not pauza:
        x += viteza
        if x > 600:
            x = -50

    ecran.fill((30, 30, 60))
    pygame.draw.rect(ecran, (255, 200, 0), (x, 125, 50, 50))
    if pauza:
        text = font.render("PAUZA", True, (255, 255, 255))
        ecran.blit(text, (300 - text.get_width() // 2, 30))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** un **pătrat galben** care trece prin ecran. Apeși **P**: pătratul **îngheață**, iar sus apare **„PAUZA”**. Apeși din nou **P**: își continuă drumul.

`pauza = not pauza` **întoarce** valoarea: `True` devine `False`, `False` devine `True`. Pauza nu oprește bucla (ca să poți ieși din pauză), ci doar **sare peste actualizare**.

### Exemplul 7 — Mesaje care dispar

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 40)

mesaje = []

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.MOUSEBUTTONDOWN:
            mesaje.append({"text": "+1", "x": eveniment.pos[0], "y": eveniment.pos[1], "viata": 40})

    ramase = []
    for m in mesaje:
        m["y"] -= 1
        m["viata"] -= 1
        if m["viata"] > 0:
            ramase.append(m)
    mesaje = ramase

    ecran.fill((30, 60, 40))
    for m in mesaje:
        imagine = font.render(m["text"], True, (255, 255, 100))
        ecran.blit(imagine, (m["x"], m["y"]))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** fundal verde închis. De fiecare dată când dai click, în locul respectiv apare **„+1”** galben, care **urcă încet** și **dispare** după o secundă (40 de cadre).

Fiecare mesaj este un dicționar cu text, poziție și `viata` (câte cadre mai are de trăit). La fiecare cadru urcă un pixel și pierde o unitate din viață; când viața ajunge la 0, nu mai este păstrat în listă.

### Exemplul 8 — Bara și recordul

```python
def latime_umplere(valoare, maxim, latime):
    valoare = max(0, min(valoare, maxim))
    return latime * valoare // maxim

print(latime_umplere(50, 100, 200))
print(latime_umplere(0, 100, 200))
print(latime_umplere(150, 100, 200))
print(latime_umplere(-20, 100, 200))

def actualizeaza_record(scor, record):
    if scor > record:
        return scor
    return record

record = 0
for scor in [12, 8, 20, 15]:
    record = actualizeaza_record(scor, record)
    print("Scor", scor, "-> record", record)
```

**Ieșire:**
```text
100
0
200
0
Scor 12 -> record 12
Scor 8 -> record 12
Scor 20 -> record 20
Scor 15 -> record 20
```

- **Bara** are o lățime totală (de exemplu 200 de pixeli), iar partea colorată este **proporțională** cu valoarea. `max(0, min(valoare, maxim))` o **ține între 0 și maxim**, deci o valoare prea mare sau negativă nu strică bara;
- **Recordul** se actualizează doar când scorul îl depășește.

Iată și bara desenată:

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 200))
ceas = pygame.time.Clock()

def deseneaza_bara(x, y, latime, inaltime, valoare, maxim, culoare):
    pygame.draw.rect(ecran, (60, 60, 60), (x, y, latime, inaltime))
    umplere = latime * max(0, min(valoare, maxim)) // maxim
    pygame.draw.rect(ecran, culoare, (x, y, umplere, inaltime))
    pygame.draw.rect(ecran, (255, 255, 255), (x, y, latime, inaltime), 2)

energie = 100

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_DOWN]:
        energie -= 1
    if taste[pygame.K_UP]:
        energie += 1
    energie = max(0, min(energie, 100))

    if energie > 50:
        culoare = (0, 200, 80)
    elif energie > 25:
        culoare = (255, 200, 0)
    else:
        culoare = (230, 40, 40)

    ecran.fill((30, 30, 60))
    deseneaza_bara(100, 80, 400, 40, energie, 100, culoare)
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** o **bară lungă** cu contur alb, plină de **verde**. Cu săgeata **jos** energia scade, iar bara se golește. Sub 50 devine **galbenă**, sub 25 **roșie**. Cu săgeata **sus** crește din nou.

---

## 6. Mini-proiect

### Exemplul 9 — Orice obiect care cade

```python
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
ceas = pygame.time.Clock()

obiecte = []

def obiect_nou():
    return {
        "rect": pygame.Rect(random.randint(0, LATIME - 30), -30, 30, 30),
        "viteza": random.randint(3, 6),
        "tip": random.choice(["stea", "stea", "stea", "piatra"]),
    }

print("Un obiect nou are cheile:", sorted(obiect_nou().keys()))

contor = 0
ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    contor += 1
    if contor % 20 == 0:
        obiecte.append(obiect_nou())

    ramase = []
    for o in obiecte:
        o["rect"].y += o["viteza"]
        if o["rect"].top < INALTIME:
            ramase.append(o)
    obiecte = ramase

    ecran.fill((10, 10, 40))
    for o in obiecte:
        if o["tip"] == "stea":
            pygame.draw.ellipse(ecran, (255, 220, 0), o["rect"])
        else:
            pygame.draw.ellipse(ecran, (130, 130, 130), o["rect"])
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
Un obiect nou are cheile: ['rect', 'tip', 'viteza']
```

**Ce vezi pe ecran:** pe fundal foarte închis, **cercuri galbene** (stele) și, mai rar, **cercuri gri** (pietre) care **cad de sus** în ecran, din loc în loc, cu viteze diferite. Cele care ajung jos dispar.

Funcția `obiect_nou()` creează un dicționar: poziția (un `Rect`, deasupra ecranului), viteza și tipul (de trei ori mai multe stele decât pietre: `"stea"` apare de 3 ori în listă). `sorted(...keys())` afișează cheile dicționarului în ordine alfabetică. Acesta este „motorul” pentru jocul următor.

### Exemplul 10 — „Ploaia de stele”

```python
import math
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 500
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Ploaia de stele")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 32)
font_mare = pygame.font.Font(None, 72)

def scrie(text, x, y, culoare=(255, 255, 255), fnt=None, centrat=False):
    if fnt is None:
        fnt = font
    imagine = fnt.render(text, True, culoare)
    if centrat:
        x = x - imagine.get_width() // 2
    ecran.blit(imagine, (x, y))

def deseneaza_stea(centru, raza, culoare):
    puncte = []
    for i in range(10):
        if i % 2 == 0:
            r = raza
        else:
            r = raza * 0.45
        unghi = math.radians(-90 + i * 36)
        puncte.append((centru[0] + r * math.cos(unghi), centru[1] + r * math.sin(unghi)))
    pygame.draw.polygon(ecran, culoare, puncte)

def inima(x, y, culoare):
    pygame.draw.circle(ecran, culoare, (x - 6, y), 7)
    pygame.draw.circle(ecran, culoare, (x + 6, y), 7)
    pygame.draw.polygon(ecran, culoare, [(x - 13, y + 2), (x + 13, y + 2), (x, y + 18)])

def nivel_pentru_scor(scor):
    return scor // 5 + 1

stare = {"joc": "meniu", "scor": 0, "vieti": 3, "nivel": 1, "record": 0}
cos = pygame.Rect(0, 0, 100, 20)
cos.midbottom = (LATIME // 2, INALTIME - 15)
obiecte = []

def obiect_nou():
    return {
        "rect": pygame.Rect(random.randint(0, LATIME - 30), -30, 30, 30),
        "viteza": random.randint(3, 5) + stare["nivel"] // 2,
        "tip": random.choice(["stea", "stea", "stea", "piatra"]),
    }

def joc_nou():
    stare["joc"] = "joc"
    stare["scor"] = 0
    stare["vieti"] = 3
    stare["nivel"] = 1
    obiecte.clear()
    cos.midbottom = (LATIME // 2, INALTIME - 15)

def pierde_viata():
    stare["vieti"] -= 1
    if stare["vieti"] <= 0:
        stare["joc"] = "final"
        if stare["scor"] > stare["record"]:
            stare["record"] = stare["scor"]

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_ESCAPE:
                ruleaza = False
            if eveniment.key == pygame.K_SPACE and stare["joc"] in ("meniu", "final"):
                joc_nou()
            if eveniment.key == pygame.K_p:
                if stare["joc"] == "joc":
                    stare["joc"] = "pauza"
                elif stare["joc"] == "pauza":
                    stare["joc"] = "joc"

    if stare["joc"] == "joc":
        taste = pygame.key.get_pressed()
        if taste[pygame.K_LEFT] or taste[pygame.K_a]:
            cos.x -= 8
        if taste[pygame.K_RIGHT] or taste[pygame.K_d]:
            cos.x += 8
        cos.clamp_ip(ecran.get_rect())

        if random.randint(1, 100) <= 3 + stare["nivel"]:
            obiecte.append(obiect_nou())

        ramase = []
        for o in obiecte:
            o["rect"].y += o["viteza"]
            if o["rect"].colliderect(cos):
                if o["tip"] == "stea":
                    stare["scor"] += 1
                    stare["nivel"] = nivel_pentru_scor(stare["scor"])
                else:
                    pierde_viata()
            elif o["rect"].top > INALTIME:
                if o["tip"] == "stea":
                    pierde_viata()
            else:
                ramase.append(o)
        obiecte[:] = ramase

    ecran.fill((10, 10, 45))
    if stare["joc"] == "meniu":
        scrie("PLOAIA DE STELE", LATIME // 2, 140, (255, 220, 0), font_mare, True)
        scrie("Prinde stelele, fereste-te de pietre", LATIME // 2, 240, (255, 255, 255), None, True)
        scrie("Stanga/Dreapta = mergi, P = pauza", LATIME // 2, 280, (180, 180, 180), None, True)
        scrie("Apasa SPATIU ca sa incepi", LATIME // 2, 340, (120, 255, 120), None, True)
    else:
        for o in obiecte:
            if o["tip"] == "stea":
                deseneaza_stea(o["rect"].center, 17, (255, 220, 0))
            else:
                pygame.draw.circle(ecran, (140, 140, 140), o["rect"].center, 15)
        pygame.draw.rect(ecran, (0, 180, 255), cos, border_radius=8)

        scrie("Scor: " + str(stare["scor"]), 10, 10)
        scrie("Nivel: " + str(stare["nivel"]), 10, 40)
        scrie("Record: " + str(stare["record"]), 10, 70)
        for i in range(3):
            if i < stare["vieti"]:
                inima(LATIME - 30 - i * 35, 22, (230, 30, 60))
            else:
                inima(LATIME - 30 - i * 35, 22, (80, 80, 90))

        if stare["joc"] == "pauza":
            scrie("PAUZA", LATIME // 2, 200, (255, 255, 255), font_mare, True)
        if stare["joc"] == "final":
            scrie("GAME OVER", LATIME // 2, 170, (255, 90, 90), font_mare, True)
            scrie("Scor final: " + str(stare["scor"]), LATIME // 2, 250, (255, 255, 255), None, True)
            scrie("SPATIU = joc nou", LATIME // 2, 290, (120, 255, 120), None, True)

    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** un joc complet, cu **patru stări**.
- **Meniu**: titlul **„PLOAIA DE STELE”** (galben) și instrucțiunile. **SPAȚIU** începe jocul.
- **Joc**: din cer cad **stele galbene** și **pietre gri**. Cu **stânga/dreapta** (sau A/D) miști **coșul albastru** de jos. Fiecare stea prinsă = **+1 punct**; o stea scăpată sau o piatră prinsă = **−1 viață**. Sus, în stânga, vezi **scorul, nivelul și recordul**; sus, în dreapta, **trei inimioare**. La fiecare 5 puncte crește **nivelul**, iar obiectele cad **mai repede și mai des**.
- **Pauză** (tasta **P**): jocul îngheață și apare „PAUZA”; **P** reia jocul.
- **Final**: când nu mai ai vieți, apare **„GAME OVER”**, scorul final, iar **SPATIU** pornește un joc nou. **Recordul** rămâne.

Așa se leagă lucrurile: **un dicționar `stare`** păstrează totul (scor, vieți, nivel, record și în ce ecran suntem), funcțiile mici (`scrie`, `deseneaza_stea`, `inima`, `joc_nou`, `pierde_viata`) fac fiecare câte un lucru, iar bucla jocului doar le **coordonează**.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Ploaia de stele” (obligatoriu)
Pornește de la Exemplul 10 și fă jocul **al tău**:
1. schimbă **tema** (alte obiecte care cad: mere și viermi, monede și bombe, pești și deșeuri);
2. adaugă un obiect **bonus** (o inimă): dacă îl prinzi, câștigi o viață (maximum 5);
3. adaugă **o bară de nivel** care arată cât mai lipsește până la nivelul următor;
4. adaugă **mesaje „+1”** care urcă din locul unde ai prins stea (Exemplul 7);
5. păstrează stările `meniu`, `joc`, `pauza`, `final` și recordul.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
def nivel(scor):
    return scor // 5 + 1

print(nivel(0), nivel(4), nivel(5), nivel(19), nivel(20))
print(not True, not False)
pauza = False
pauza = not pauza
print(pauza)
```

### Exercițiul C — Meniu cu butoane
Fă un **meniu** cu trei butoane („Joaca”, „Reguli”, „Iesire”), în care **mouse-ul** schimbă culoarea butoanelor (L5) și **click-ul** schimbă starea jocului.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
stare = "meniu"
scor = 0
def scrie(text, x, y):
    imagine = font.render(text, True)
    ecran.blit(imagine, x, y)
if stare = "meniu":
    scrie("Joc", 100, 100)
nivel = scor / 5 + 1
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce este starea jocului și cum o folosim?  
2. De ce un joc are nevoie de meniu și de ecran de final?  
3. Cum funcționează pauza?

**Gata când:**
- [ ] Jocul are meniu, joc, pauză și final  
- [ ] Are scor, nivel, vieți (cu inimioare) și record  
- [ ] Are un obiect bonus și mesaje „+1”  
- [ ] Ai explicat pe foaie stările jocului  
- [ ] Fișierul se numește `Prenume_Nume_P4_L6.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Salvează recordul într-un **fișier** (în lecția 8 învățăm cum, dar poți încerca înainte)  
- [ ] Adaugă **efecte de sunet** pentru stea și piatră (`pygame.mixer`)  
- [ ] Fă **trei niveluri** diferite, cu fundaluri și viteze diferite  
- [ ] Adaugă un **ecran de reguli** în meniu  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `TypeError: function takes at least 3 arguments (2 given)` | `render` fără culoare | `font.render(text, True, culoare)` |
| `TypeError: argument 1 must be pygame.surface.Surface, not str` | Ai lipit textul, nu imaginea | `ecran.blit(font.render(...), (x, y))` |
| `SyntaxError: invalid syntax` la `if stare = "meniu":` | Ai pus un singur `=` | `if stare == "meniu":` |
| Textul se vede doar o clipă | `blit` pus înainte de `fill` | Mai întâi `fill`, apoi `blit` |
| Nivelul are zecimale (`1.4`) | Ai folosit `/` | `//` pentru împărțire întreagă |
| Scorul nu se păstrează după „Joc nou” | Ai resetat și recordul | Resetează doar scorul, vieți, nivelul |
| După pauză, jocul „sare” înainte | Timpul continuă și în pauză | Oprește actualizările (și cronometrele) în pauză |

---

## Recapitulare pe scurt

- O funcție `scrie(...)` face textul ușor de folosit, cu valori implicite și centrare.
- Vieți: inimioare desenate din forme; **roșu** = viață, **gri** = pierdută.
- **Starea jocului** (`meniu`, `joc`, `pauza`, `final`) decide ce se actualizează și ce se desenează.
- Nivelul se calculează din scor: `scor // 5 + 1`.
- Pauza: `pauza = not pauza` și actualizările se sar peste.
- Un dicționar `stare` poate păstra totul, iar funcțiile mici fac codul clar.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Adaugă „Ploii de stele” un **ecran de reguli** și un buton de ieșire.  
3. Fă o **a doua variantă a jocului**, cu altă temă și alte culori.  
4. **Bonus:** fă un joc în care prinzi doar **obiecte de culoarea aleasă** la început.  
5. Salvează totul ca `Tema_P4_L6_Prenume_Nume.py`.

---

## Ce urmează — Lecția 7
**Clase: jucători și inamici**: învățăm să scriem „rețete” pentru obiecte și să creăm cu ele sute de inamici.
