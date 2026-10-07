# LECȚIA 5 — Coliziuni: strângem monede
**Modulul 4 · Jocuri cu Pygame · 2 ore**  
**Code Maker Club · Game Creator**

> Cum știe un joc că ai prins o monedă, ai lovit un perete sau te-a atins un inamic? Prin **coliziuni**: calculatorul verifică dacă două obiecte **se suprapun**. Azi învățăm să le detectăm și construim un joc în care strângi monede printr-un mic labirint.  
> Proiect: **„Strânge monedele”** · fișier: `Prenume_Nume_P4_L5.py`

---

## Obiectiv
La finalul orei verifici dacă două dreptunghiuri se ating (`colliderect`), dacă un punct este într-un dreptunghi (`collidepoint`), cauți într-o listă (`collidelist`), blochezi personajul la pereți, verifici coliziunea dintre două cercuri, strângi obiecte dintr-o listă și construiești un joc cu monede și timp.  
**Minim:** un personaj care ia o monedă și scorul crește.  
**Ținta orei (Complet):** + pereți, mai multe monede și jocul cu timp din mini-proiect.

## De ce contează
Fără coliziuni, un joc nu are reguli: personajul ar trece prin pereți, ar ignora monedele și inamicii. Coliziunea este momentul în care „se întâmplă ceva”: un punct, o viață pierdută, un nivel terminat.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L4 |
| 10–30 | `colliderect` și `collidepoint` (**Exemplele 1–2**) |
| 30–55 | Prima monedă, mai multe monede (**Exemplele 3–5**) |
| 55–75 | Pereți (**Exemplul 6**) |
| 75–95 | Cercuri, liste, imunitate (**Exemplele 7–9**) |
| 95–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L4

- Tastatura: `KEYDOWN` pentru o singură dată, `get_pressed()` pentru mers continuu.
- `Rect`: `left`, `right`, `top`, `bottom`, `center`; `clamp_ip(zona)` ține un obiect în ecran.
- Gloanțele sunt `Rect`-uri într-o listă; cele ieșite din ecran se șterg.

**Încearcă tu (3 min)**  
- [ ] Creează un `Rect(10, 10, 50, 50)` și afișează `right` și `bottom`  

---

## 2. Coliziuni cu `Rect`

### Exemplul 1 — Se ating sau nu?

```python
import pygame

a = pygame.Rect(0, 0, 100, 100)
b = pygame.Rect(50, 50, 100, 100)
c = pygame.Rect(100, 0, 50, 50)
d = pygame.Rect(99, 0, 50, 50)

print("a si b se ating:", a.colliderect(b))
print("a si c se ating:", a.colliderect(c))
print("a si d se ating:", a.colliderect(d))
print("Punctul (50, 50) este in a:", a.collidepoint(50, 50))
print("Punctul (100, 100) este in a:", a.collidepoint(100, 100))
print("Punctul (200, 10) este in a:", a.collidepoint(200, 10))
```

**Ieșire:**
```text
a si b se ating: True
a si c se ating: False
a si d se ating: True
Punctul (50, 50) este in a: True
Punctul (100, 100) este in a: False
Punctul (200, 10) este in a: False
```

- `a.colliderect(b)` este `True` dacă dreptunghiurile **se suprapun** (măcar puțin);
- `a` și `c` doar **își ating marginea** (`a` se termină la `x = 100`, iar `c` începe la `x = 100`): nu se suprapun, deci rezultatul este `False`;
- `a` și `d` se suprapun cu un pixel (`99` este înăuntrul lui `a`): `True`;
- `a.collidepoint(x, y)` verifică dacă un **punct** este înăuntrul dreptunghiului. Marginea din dreapta și cea de jos **nu** fac parte din el.

### Exemplul 2 — Punem mouse-ul la treabă

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 300))
pygame.display.set_caption("Click pe buton")
font = pygame.font.Font(None, 36)

buton = pygame.Rect(200, 100, 200, 80)
apasari = 0

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.MOUSEBUTTONDOWN:
            if buton.collidepoint(eveniment.pos):
                apasari += 1

    pozitie_mouse = pygame.mouse.get_pos()
    if buton.collidepoint(pozitie_mouse):
        culoare = (255, 200, 0)
    else:
        culoare = (0, 150, 255)

    ecran.fill((240, 240, 240))
    pygame.draw.rect(ecran, culoare, buton, border_radius=15)
    text = font.render("Apasari: " + str(apasari), True, (255, 255, 255))
    ecran.blit(text, (buton.x + 30, buton.y + 28))
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal gri deschis, un **buton albastru rotunjit** cu textul **„Apasari: 0”**. Când treci cu mouse-ul **peste** el, devine **galben**. De fiecare dată când dai **click pe el**, numărul crește. Un click în afara butonului nu face nimic.

`eveniment.pos` este poziția click-ului, iar `pygame.mouse.get_pos()` este poziția mouse-ului **acum**. Ambele pot fi date lui `collidepoint`. Așa se fac **toate butoanele** din jocuri!

---

## 3. Monede

### Exemplul 3 — Atingem un obstacol

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
ceas = pygame.time.Clock()
zona = ecran.get_rect()

jucator = pygame.Rect(50, 170, 40, 40)
obstacol = pygame.Rect(300, 150, 100, 100)

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        jucator.x -= 5
    if taste[pygame.K_RIGHT]:
        jucator.x += 5
    if taste[pygame.K_UP]:
        jucator.y -= 5
    if taste[pygame.K_DOWN]:
        jucator.y += 5
    jucator.clamp_ip(zona)

    if jucator.colliderect(obstacol):
        culoare_obstacol = (255, 50, 50)
    else:
        culoare_obstacol = (80, 80, 80)

    ecran.fill((230, 230, 255))
    pygame.draw.rect(ecran, culoare_obstacol, obstacol)
    pygame.draw.rect(ecran, (0, 150, 80), jucator)
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** un **pătrat verde** (tu) și un **obstacol gri**. Cât timp nu vă atingeți, obstacolul rămâne gri. Când pătratul verde **îl atinge**, obstacolul devine **roșu**. Când te îndepărtezi, redevine gri.

### Exemplul 4 — Prima monedă

```python
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
ceas = pygame.time.Clock()
zona = ecran.get_rect()
font = pygame.font.Font(None, 36)

jucator = pygame.Rect(280, 180, 40, 40)
moneda = pygame.Rect(random.randint(20, LATIME - 40), random.randint(20, INALTIME - 40), 24, 24)
scor = 0

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        jucator.x -= 5
    if taste[pygame.K_RIGHT]:
        jucator.x += 5
    if taste[pygame.K_UP]:
        jucator.y -= 5
    if taste[pygame.K_DOWN]:
        jucator.y += 5
    jucator.clamp_ip(zona)

    if jucator.colliderect(moneda):
        scor += 1
        moneda.x = random.randint(20, LATIME - 40)
        moneda.y = random.randint(20, INALTIME - 40)

    ecran.fill((30, 30, 60))
    pygame.draw.ellipse(ecran, (255, 215, 0), moneda)
    pygame.draw.rect(ecran, (0, 200, 120), jucator)
    text = font.render("Scor: " + str(scor), True, (255, 255, 255))
    ecran.blit(text, (10, 10))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal albastru închis, un **pătrat verde** (tu) și o **monedă aurie** într-un loc la întâmplare. Cu săgețile te duci la monedă: când o atingi, **scorul crește** cu 1, iar moneda **apare în alt loc**. Scorul este scris sus, în stânga.

### Exemplul 5 — Mai multe monede

```python
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
ceas = pygame.time.Clock()
zona = ecran.get_rect()
font = pygame.font.Font(None, 36)

jucator = pygame.Rect(280, 180, 40, 40)

monede = []
for i in range(10):
    monede.append(pygame.Rect(random.randint(20, LATIME - 40), random.randint(60, INALTIME - 40), 24, 24))

scor = 0
print("Monede la inceput:", len(monede))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        jucator.x -= 5
    if taste[pygame.K_RIGHT]:
        jucator.x += 5
    if taste[pygame.K_UP]:
        jucator.y -= 5
    if taste[pygame.K_DOWN]:
        jucator.y += 5
    jucator.clamp_ip(zona)

    ramase = []
    for moneda in monede:
        if jucator.colliderect(moneda):
            scor += 1
        else:
            ramase.append(moneda)
    monede = ramase

    ecran.fill((30, 30, 60))
    for moneda in monede:
        pygame.draw.ellipse(ecran, (255, 215, 0), moneda)
    pygame.draw.rect(ecran, (0, 200, 120), jucator)

    if len(monede) == 0:
        mesaj = "Ai strans toate monedele!"
    else:
        mesaj = "Scor: " + str(scor) + "   Au ramas: " + str(len(monede))
    text = font.render(mesaj, True, (255, 255, 255))
    ecran.blit(text, (10, 10))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire (la tine va fi altfel, pozițiile sunt la întâmplare, dar numărul rămâne 10):**
```text
Monede la inceput: 10
```

**Ce vezi pe ecran:** **zece monede aurii** împrăștiate pe ecran. Atingi o monedă și ea **dispare**, iar scorul crește. Sus scrie scorul și câte monede au mai rămas. Când le-ai strâns pe toate, apare **„Ai strans toate monedele!”**.

Folosim lista **ramase**, ca în lecția trecută: păstrăm doar monedele care **nu au fost luate**. Dacă o monedă este atinsă, nu o mai punem în noua listă.

---

## 4. Pereți

### Exemplul 6 — Nu trecem prin pereți

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
ceas = pygame.time.Clock()

pereti = [
    pygame.Rect(150, 0, 30, 250),
    pygame.Rect(300, 150, 30, 250),
    pygame.Rect(450, 0, 30, 250),
]

jucator = pygame.Rect(50, 340, 36, 36)
viteza = 4

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    dx = 0
    dy = 0
    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        dx -= viteza
    if taste[pygame.K_RIGHT]:
        dx += viteza
    if taste[pygame.K_UP]:
        dy -= viteza
    if taste[pygame.K_DOWN]:
        dy += viteza

    jucator.x += dx
    if jucator.collidelist(pereti) != -1:
        jucator.x -= dx

    jucator.y += dy
    if jucator.collidelist(pereti) != -1:
        jucator.y -= dy

    jucator.clamp_ip(ecran.get_rect())

    ecran.fill((235, 235, 235))
    for perete in pereti:
        pygame.draw.rect(ecran, (70, 70, 70), perete)
    pygame.draw.rect(ecran, (0, 160, 90), jucator)
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal gri deschis, **trei pereți închiși la culoare**: unul care pornește de sus, unul de jos, iar al treilea iar de sus, ca într-un zigzag. Un **pătrat verde** (jos, în stânga) pe care îl conduci cu săgețile. Nu poate trece **prin** pereți: trebuie să ocolești ca să ajungi în dreapta.

Cum merge:
1. **mutăm** jucătorul pe orizontală;
2. dacă acum **atinge** un perete (`collidelist(pereti) != -1`), **anulăm** mutarea;
3. același lucru pe verticală.

Mutăm și verificăm **separat** pe `x` și pe `y`: așa poți **aluneca** pe lângă perete (dacă te lovești doar pe orizontală, poți merge în continuare pe verticală).

`jucator.collidelist(lista)` caută în lista de `Rect`-uri un obiect care se atinge de `jucator` și returnează **numărul lui** din listă, sau **-1** dacă nu atinge nimic.

---

## 5. Cercuri, liste, imunitate

### Exemplul 7 — Coliziune între cercuri

```python
import math

def cercuri_se_ating(x1, y1, r1, x2, y2, r2):
    distanta = math.hypot(x1 - x2, y1 - y2)
    return distanta < r1 + r2

print(cercuri_se_ating(0, 0, 10, 15, 0, 10))
print(cercuri_se_ating(0, 0, 10, 30, 0, 10))
print(cercuri_se_ating(0, 0, 10, 12, 16, 10))
print(cercuri_se_ating(100, 100, 30, 100, 100, 5))
```

**Ieșire:**
```text
True
False
False
True
```

Pentru obiecte rotunde, dreptunghiurile nu sunt tocmai potrivite (colțurile lor „ating” înainte ca cercurile să se atingă). Două cercuri se ating dacă **distanța dintre centre** este mai mică decât **suma razelor**. `math.hypot(a, b)` calculează `radical din (a² + b²)`, adică distanța. Rezultatele: în primul caz distanța este 15 și razele însumează 20: **se ating**. În al doilea, 30 față de 20: nu. În al treilea, distanța este exact 20: nu se **suprapun** (doar se ating în marginea lor). În al patrulea, cercul mic este în interiorul celui mare: se ating.

### Exemplul 8 — Căutăm în listă

```python
import pygame

pereti = [
    pygame.Rect(0, 0, 50, 50),
    pygame.Rect(100, 0, 50, 50),
    pygame.Rect(200, 0, 50, 50),
    pygame.Rect(120, 20, 50, 50),
]

jucator = pygame.Rect(110, 10, 20, 20)

print("Primul atins:", jucator.collidelist(pereti))
print("Toti cei atinsi:", jucator.collidelistall(pereti))

jucator.x = 300
print("Dupa mutare:", jucator.collidelist(pereti))
print("Dupa mutare, toti:", jucator.collidelistall(pereti))
```

**Ieșire:**
```text
Primul atins: 1
Toti cei atinsi: [1, 3]
Dupa mutare: -1
Dupa mutare, toti: []
```

- `collidelist(lista)` dă **numărul primului** obiect atins (sau `-1`);
- `collidelistall(lista)` dă **lista numerelor tuturor** obiectelor atinse (sau o listă goală `[]`).

În primul caz `jucator` atinge obiectul 1 (de la 100) și obiectul 3 (de la 120). Când îl mutăm la `x = 300`, nu mai atinge nimic.

### Exemplul 9 — Imunitate după o lovitură

```python
import pygame

def poate_fi_lovit(acum, ultima_lovitura, imunitate):
    return acum - ultima_lovitura >= imunitate

print(poate_fi_lovit(5000, 0, 1500))
print(poate_fi_lovit(5500, 5000, 1500))
print(poate_fi_lovit(6500, 5000, 1500))

pygame.init()
ecran = pygame.display.set_mode((600, 400))
ceas = pygame.time.Clock()
zona = ecran.get_rect()
font = pygame.font.Font(None, 36)

jucator = pygame.Rect(280, 300, 40, 40)
inamic = pygame.Rect(0, 150, 50, 50)
viteza_inamic = 5
vieti = 3
ultima_lovitura = -10000
IMUNITATE = 1500

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        jucator.x -= 5
    if taste[pygame.K_RIGHT]:
        jucator.x += 5
    if taste[pygame.K_UP]:
        jucator.y -= 5
    if taste[pygame.K_DOWN]:
        jucator.y += 5
    jucator.clamp_ip(zona)

    inamic.x += viteza_inamic
    if inamic.left < 0 or inamic.right > 600:
        viteza_inamic = -viteza_inamic

    acum = pygame.time.get_ticks()
    if jucator.colliderect(inamic) and poate_fi_lovit(acum, ultima_lovitura, IMUNITATE) and vieti > 0:
        vieti -= 1
        ultima_lovitura = acum

    if poate_fi_lovit(acum, ultima_lovitura, IMUNITATE):
        culoare = (0, 200, 120)
    else:
        culoare = (255, 255, 255)

    ecran.fill((30, 30, 60))
    pygame.draw.rect(ecran, (220, 40, 40), inamic)
    pygame.draw.rect(ecran, culoare, jucator)
    text = font.render("Vieti: " + str(vieti), True, (255, 255, 255))
    ecran.blit(text, (10, 10))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
True
False
True
```

**Ce vezi pe ecran:** un **inamic roșu** care aleargă stânga-dreapta pe orizontală. Tu ești **pătratul verde** și ai **3 vieți**. Dacă inamicul te atinge, pierzi o viață și devii **alb** pentru **o secundă și jumătate**: în acest timp **nu mai poți fi lovit**. Apoi redevii verde.

De ce avem nevoie de **imunitate**? Fără ea, un contact de o secundă ar fi detectat în **60 de cadre** la rând, iar cele trei vieți ar dispărea instantaneu. Funcția `poate_fi_lovit` verifică dacă au trecut cel puțin 1500 ms de la ultima lovitură (ca la pauza între focuri).

---

## 6. Mini-proiect

### Exemplul 10 — „Strânge monedele”

```python
import random
import time
import pygame

pygame.init()
LATIME = 700
INALTIME = 500
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Strange monedele")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 32)
font_mare = pygame.font.Font(None, 64)

pereti = [
    pygame.Rect(0, 50, LATIME, 10),
    pygame.Rect(150, 60, 20, 250),
    pygame.Rect(300, 190, 20, 260),
    pygame.Rect(450, 60, 20, 250),
    pygame.Rect(580, 190, 20, 260),
    pygame.Rect(0, INALTIME - 10, LATIME, 10),
]

jucator = pygame.Rect(40, 400, 30, 30)
monede = []
stare = {"scor": 0, "start": time.time(), "durata": 0.0, "castigat": False}

def pozitie_libera():
    while True:
        r = pygame.Rect(random.randint(20, LATIME - 40), random.randint(80, INALTIME - 50), 24, 24)
        if r.collidelist(pereti) == -1 and not r.colliderect(jucator):
            return r

def joc_nou():
    jucator.topleft = (40, 400)
    monede.clear()
    for i in range(12):
        monede.append(pozitie_libera())
    stare["scor"] = 0
    stare["start"] = time.time()
    stare["durata"] = 0.0
    stare["castigat"] = False

joc_nou()

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_ESCAPE:
                ruleaza = False
            if eveniment.key == pygame.K_r:
                joc_nou()

    if not stare["castigat"]:
        dx = 0
        dy = 0
        taste = pygame.key.get_pressed()
        if taste[pygame.K_LEFT] or taste[pygame.K_a]:
            dx -= 5
        if taste[pygame.K_RIGHT] or taste[pygame.K_d]:
            dx += 5
        if taste[pygame.K_UP] or taste[pygame.K_w]:
            dy -= 5
        if taste[pygame.K_DOWN] or taste[pygame.K_s]:
            dy += 5

        jucator.x += dx
        if jucator.collidelist(pereti) != -1:
            jucator.x -= dx
        jucator.y += dy
        if jucator.collidelist(pereti) != -1:
            jucator.y -= dy
        jucator.clamp_ip(ecran.get_rect())

        ramase = []
        for moneda in monede:
            if jucator.colliderect(moneda):
                stare["scor"] += 1
            else:
                ramase.append(moneda)
        monede[:] = ramase

        stare["durata"] = time.time() - stare["start"]
        if len(monede) == 0:
            stare["castigat"] = True

    ecran.fill((245, 240, 225))
    for perete in pereti:
        pygame.draw.rect(ecran, (80, 70, 60), perete)
    for moneda in monede:
        pygame.draw.ellipse(ecran, (255, 200, 0), moneda)
        pygame.draw.ellipse(ecran, (200, 150, 0), moneda, 3)
    pygame.draw.rect(ecran, (0, 140, 90), jucator)

    text = font.render("Monede: " + str(stare["scor"]) + " / 12     Timp: " + str(int(stare["durata"])) + " s", True, (30, 30, 30))
    ecran.blit(text, (10, 15))
    if stare["castigat"]:
        mesaj = font_mare.render("AI CASTIGAT!", True, (0, 120, 0))
        ecran.blit(mesaj, (LATIME // 2 - mesaj.get_width() // 2, 200))
        sub = font.render("Apasa R pentru joc nou", True, (30, 30, 30))
        ecran.blit(sub, (LATIME // 2 - sub.get_width() // 2, 270))

    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** o **hartă** cu fundal crem, margini închise (sus și jos) și **patru pereți** verticali, care formează un zigzag: doi pornesc de sus, doi de jos. Pătratul **verde** (tu) pornește jos, în stânga. În hartă sunt **12 monede aurii**, puse în locuri libere (niciodată în pereți). Conduci cu **săgețile** sau cu **W, A, S, D**, ocolești pereții și strângi monedele. Sus, scrie **câte monede ai** (din 12) și **timpul** în secunde. Când le-ai luat pe toate, timpul se oprește și apare **„AI CASTIGAT!”**. Cu **R** începi un joc nou, iar cu **Escape** ieși.

Ce este nou aici:
- `pozitie_libera()` caută un loc pentru o monedă cu `while True`, până găsește unul care **nu atinge nimic**; apoi îl returnează cu `return`;
- `joc_nou()` pune totul la loc de la capăt, iar `monede.clear()` și `monede[:] = ramase` schimbă **lista existentă** (nu creează alta);
- cheia `stare["castigat"]` oprește mișcarea după victorie.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Strânge monedele” (obligatoriu)
Pornește de la Exemplul 10 și fă jocul **al tău**:
1. **hărți noi**: desenează-ți propriul labirint (cel puțin 8 pereți);
2. **monede de două feluri**: aurii (+1) și albastre (+3), ultimele mai rare;
3. **un inamic** care patrulează (ca în Exemplul 9) și te face să pierzi timp sau vieți;
4. **cel mai bun timp** păstrat între runde (cât timp programul rămâne deschis);
5. păstrează funcțiile `pozitie_libera` și `joc_nou`.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
import pygame

a = pygame.Rect(0, 0, 40, 40)
b = pygame.Rect(40, 0, 40, 40)
c = pygame.Rect(39, 39, 10, 10)
print(a.colliderect(b))
print(a.colliderect(c))
print(a.collidelist([b, c]))
print(a.collidelistall([b, c]))
```

### Exercițiul C — Butonul de joc
Desenează trei **butoane** („Joacă”, „Reguli”, „Ieși”). Când treci cu mouse-ul peste ele, își schimbă culoarea, iar când dai click, se afișează în Thonny numele butonului.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
import pygame
jucator = pygame.Rect(10, 10, 30, 30)
moneda = pygame.Rect(20, 20, 20, 20)
if jucator.colliderect(moneda)
    scor += 1
if jucator.collidepoint(moneda):
    print("Atins")
pereti = [pygame.Rect(0, 0, 10, 10)]
if jucator.collidelist(pereti) == True:
    print("Perete")
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce înseamnă o coliziune și cum o verificăm cu `Rect`?  
2. De ce mutăm și verificăm separat pe `x` și pe `y` la pereți?  
3. La ce folosește imunitatea după o lovitură?

**Gata când:**
- [ ] Jocul are o hartă proprie cu cel puțin 8 pereți  
- [ ] Are monede de două feluri și un inamic care patrulează  
- [ ] Se păstrează cel mai bun timp  
- [ ] Ai explicat pe foaie coliziunile și imunitatea  
- [ ] Fișierul se numește `Prenume_Nume_P4_L5.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă **chei și uși**: ușa se deschide doar dacă ai luat cheia  
- [ ] Adaugă **capcane** (ghimpi) care te trimit înapoi la start  
- [ ] Fă monedele să **se rotească** (alternează două imagini)  
- [ ] Adaugă **teleportoare**: două cercuri care te mută dintr-un loc în altul  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `TypeError: Argument must be rect style object` | Ai dat lui `colliderect` ceva care nu este `Rect` | `jucator.colliderect(moneda)` cu două `Rect`-uri |
| Personajul trece prin perete | Nu ai verificat coliziunea sau ai făcut-o prea târziu | Mută, verifică, anulează mutarea |
| Personajul se blochează în perete | Ai mutat și pe x, și pe y, apoi ai anulat tot | Mută și verifică **separat** pe fiecare axă |
| Viețile se pierd toate deodată | Contactul este detectat în fiecare cadru | Imunitate după lovitură |
| Moneda apare într-un perete | Poziția este aleasă fără verificare | Alege o poziție nouă cât timp `collidelist(...) != -1` |
| `UnboundLocalError` sau `NameError: scor` | Ai folosit `scor` fără să-l creezi | `scor = 0` înainte de buclă |
| Lista de monede nu se schimbă în funcție | Ai scris `monede = ramase` într-o funcție | `monede[:] = ramase` |

---

## Recapitulare pe scurt

- `a.colliderect(b)` — două dreptunghiuri se suprapun; doar marginile atinse nu contează.
- `rect.collidepoint(x, y)` — un punct este înăuntru (butoane, click).
- `collidelist` / `collidelistall` — caută într-o listă de `Rect`-uri (-1 sau `[]` = nimic).
- Pereți: mută pe `x`, verifică, anulează; apoi la fel pe `y`.
- Cercuri: distanța dintre centre `< r1 + r2`.
- Imunitatea previne pierderea tuturor vieților de la o singură atingere.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Fă un **labirint** cu intrare, ieșire și chei, în care trebuie să ajungi la ieșire.  
3. Fă un joc în care **prinzi mere care cad** cu un coș (jucătorul merge doar stânga-dreapta).  
4. **Bonus:** adaugă o **a doua monedă specială**, care îți dă 5 secunde în plus.  
5. Salvează totul ca `Tema_P4_L5_Prenume_Nume.py`.

---

## Ce urmează — Lecția 6
**Scor, vieți și text**: transformăm jocul într-un joc complet cu meniu, scor, vieți, nivele și ecran de final.
