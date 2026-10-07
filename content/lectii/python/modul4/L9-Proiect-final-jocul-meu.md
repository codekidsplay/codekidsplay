# LECȚIA 9 — Proiect final: jocul meu
**Modulul 4 · Jocuri cu Pygame · 2 ore**  
**Code Maker Club · Game Creator**

> A venit momentul! Folosim tot ce am învățat în patru module și construim **un joc complet, al nostru**. Azi învățăm ultimele piese de care are nevoie un joc „adevărat”: **gloanțe**, **meteoriți**, **explozii**, **butoane de meniu**, **niveluri de dificultate** și **scut cu timp limitat**. Le punem apoi laolaltă într-un joc: „Apărătorii galaxiei”. După aceea, **îți faci jocul tău**, pe care îl vei prezenta în ultima lecție.  
> Proiect: **„Jocul meu”** · fișier: `Prenume_Nume_P4_L9.py`

---

## Obiectiv
La finalul orei ai înțeles cum se construiește un joc din piese (clase și funcții), ai scris un joc cu gloanțe, obstacole, explozii, meniu, niveluri și record, și ai început **propriul tău joc**.  
**Minim:** un joc cu meniu, scor, vieți și ecran de final.  
**Ținta orei (Complet):** + clase, niveluri, record salvat în fișier și un element nou, inventat de tine.

## De ce contează
Aici se vede cât de departe ai ajuns: un joc cu meniu, grafică, scor, vieți, niveluri și record, scris **de tine**, în Python, de la zero.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L8 și planul jocului |
| 10–45 | Piesele noi: schelet, stele, gloanțe, meteoriți (**Exemplele 1–4**) |
| 45–70 | Lovituri, explozii, butoane, dificultate, scut (**Exemplele 5–9**) |
| 70–80 | „Apărătorii galaxiei” (**Exemplul 10**): rulăm și înțelegem |
| 80–115 | **Jocul meu**: construim |
| 115–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L8

- Fișiere: `with open(nume, "w"/"a"/"r") as f:`.
- `try / except FileNotFoundError` și `ValueError`.
- Topul și recordul se păstrează într-un fișier.

**Încearcă tu (3 min)**  
- [ ] Scrie o funcție `citeste_numar(fisier)` care întoarce numărul din fișier sau 0 dacă fișierul lipsește  

### Cum plănuim un joc (5 minute pe hârtie!)
Înainte de cod, răspunde pe foaie:
1. **Despre ce este jocul?** (o propoziție)
2. **Cine ești tu** și **ce încerci să faci?**
3. **Ce te încurcă?** (inamici, obstacole, timp)
4. **Cum câștigi puncte?** și **cum pierzi?**
5. **Ce se schimbă la nivelurile următoare?**

---

## 2. Piesele jocului

### Exemplul 1 — Scheletul unui joc

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Schelet de joc")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 40)

joc = {"stare": "meniu", "scor": 0}

def mesaj(text, y, culoare=(255, 255, 255)):
    imagine = font.render(text, True, culoare)
    ecran.blit(imagine, (LATIME // 2 - imagine.get_width() // 2, y))

def deseneaza_meniu():
    ecran.fill((20, 20, 70))
    mesaj("MENIU", 140, (255, 220, 0))
    mesaj("SPATIU = joaca", 200)

def deseneaza_joc():
    ecran.fill((20, 90, 40))
    mesaj("Joc! Scor: " + str(joc["scor"]), 140)
    mesaj("Sus = +1 punct, E = final", 200)

def deseneaza_final():
    ecran.fill((90, 20, 20))
    mesaj("FINAL", 140, (255, 120, 120))
    mesaj("SPATIU = meniu", 200)

ecrane = {"meniu": deseneaza_meniu, "joc": deseneaza_joc, "final": deseneaza_final}

def tasta_apasata(tasta):
    if joc["stare"] == "meniu" and tasta == pygame.K_SPACE:
        joc["stare"] = "joc"
        joc["scor"] = 0
    elif joc["stare"] == "joc":
        if tasta == pygame.K_UP:
            joc["scor"] += 1
        elif tasta == pygame.K_e:
            joc["stare"] = "final"
    elif joc["stare"] == "final" and tasta == pygame.K_SPACE:
        joc["stare"] = "meniu"

print("Starile:", list(ecrane.keys()))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            tasta_apasata(eveniment.key)

    ecrane[joc["stare"]]()
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
Starile: ['meniu', 'joc', 'final']
```

**Ce vezi pe ecran:** trei ecrane care se schimbă din taste: un **meniu** albastru („SPATIU = joaca”), un **ecran de joc** verde (săgeata sus adaugă puncte, tasta **E** termină) și un **ecran de final** roșu (SPATIU te duce înapoi în meniu).

Iată **scheletul** oricărui joc. Ce e nou: într-un dicționar `ecrane` avem **funcții** (fără paranteze!), iar `ecrane[joc["stare"]]()` o alege și o apelează pe cea potrivită stării. Tot ce se schimbă (starea, scorul) stă în dicționarul `joc`, așa că nu avem nevoie de `global`.

### Exemplul 2 — Cer cu stele care se mișcă

```python
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 500
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Stele")
ceas = pygame.time.Clock()

stele = []
for i in range(60):
    stele.append([random.randint(0, LATIME), random.randint(0, INALTIME), random.randint(1, 3)])
print("Stele:", len(stele))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    for s in stele:
        s[1] += s[2]
        if s[1] > INALTIME:
            s[1] = 0
            s[0] = random.randint(0, LATIME)

    ecran.fill((5, 5, 25))
    for s in stele:
        stralucire = 80 + 50 * s[2]
        pygame.draw.rect(ecran, (stralucire, stralucire, stralucire), (s[0], s[1], s[2], s[2]))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
Stele: 60
```

**Ce vezi pe ecran:** un cer **foarte închis** cu **60 de stele** albe care **curg în jos**. Stelele rapide sunt **mai mari și mai luminoase**, cele lente sunt mici și mai întunecate, ca și cum ai zbura printre ele.

Fiecare stea este o **listă mică** `[x, y, viteză]`. Când iese jos, se întoarce sus, într-un loc nou. Cu viteza și luminozitatea legate între ele, apare iluzia de **adâncime**.

### Exemplul 3 — Gloanțe și ritmul de tragere

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 500
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Gloante")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 30)

class Glont:
    def __init__(self, x, y):
        self.rect = pygame.Rect(0, 0, 6, 16)
        self.rect.midbottom = (x, y)
        self.viteza = 10

    def muta(self):
        self.rect.y -= self.viteza

    def a_iesit(self):
        return self.rect.bottom < 0

    def deseneaza(self):
        pygame.draw.rect(ecran, (255, 240, 100), self.rect, border_radius=3)

test = Glont(100, 50)
test.muta()
print(test.rect.y, test.a_iesit())
for i in range(6):
    test.muta()
print(test.rect.y, test.a_iesit())

nava = pygame.Rect(0, 0, 50, 40)
nava.midbottom = (LATIME // 2, INALTIME - 20)
gloante = []
ultimul_foc = 0
RITM = 250

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        nava.x -= 7
    if taste[pygame.K_RIGHT]:
        nava.x += 7
    nava.clamp_ip(ecran.get_rect())

    acum = pygame.time.get_ticks()
    if taste[pygame.K_SPACE] and acum - ultimul_foc > RITM:
        gloante.append(Glont(nava.centerx, nava.top))
        ultimul_foc = acum

    for g in gloante:
        g.muta()
    gloante = [g for g in gloante if not g.a_iesit()]

    ecran.fill((10, 10, 40))
    for g in gloante:
        g.deseneaza()
    pygame.draw.polygon(ecran, (0, 200, 255), [(nava.centerx, nava.top), (nava.left, nava.bottom), (nava.right, nava.bottom)])
    ecran.blit(font.render("Gloante pe ecran: " + str(len(gloante)), True, (255, 255, 255)), (10, 10))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
24 False
-36 True
```

**Ce vezi pe ecran:** jos, o **navă triunghiulară albastră**, pe care o miști cu **stânga/dreapta**. Cu **SPAȚIU** tragi **gloanțe galbene** care zboară în sus și dispar când ies din ecran. Sus scrie câte gloanțe sunt pe ecran.

**Ritmul de tragere:** `pygame.time.get_ticks()` dă timpul în **milisecunde**. Tragem doar dacă au trecut **mai mult de 250 ms** de la ultimul foc. Fără asta, ai trage 60 de gloanțe pe secundă! Cele două `print`-uri de la început sunt teste: după o mutare gloanțul e la `y = 24` (încă pe ecran), iar după șapte mutări e la `-36`: a ieșit complet.

### Exemplul 4 — Meteoriți

```python
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 500
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Meteoriti")
ceas = pygame.time.Clock()

class Meteorit:
    def __init__(self, x, y, raza, viteza):
        self.raza = raza
        self.viteza = viteza
        self.rect = pygame.Rect(0, 0, 2 * raza, 2 * raza)
        self.rect.center = (x, y)

    def muta(self):
        self.rect.y += self.viteza

    def a_iesit(self):
        return self.rect.top > INALTIME

    def deseneaza(self):
        pygame.draw.circle(ecran, (130, 125, 120), self.rect.center, self.raza)
        pygame.draw.circle(ecran, (95, 90, 85), (self.rect.centerx - self.raza // 3, self.rect.centery - self.raza // 4), self.raza // 4)
        pygame.draw.circle(ecran, (95, 90, 85), (self.rect.centerx + self.raza // 3, self.rect.centery + self.raza // 3), self.raza // 5)

test = Meteorit(100, -30, 20, 3)
print(test.rect.width, test.rect.center)
test.muta()
print(test.rect.center)

meteoriti = []
cadru = 0

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    cadru += 1
    if cadru % 30 == 0:
        r = random.randint(15, 35)
        meteoriti.append(Meteorit(random.randint(r, LATIME - r), -r, r, random.randint(2, 5)))

    for m in meteoriti:
        m.muta()
    meteoriti = [m for m in meteoriti if not m.a_iesit()]

    ecran.fill((10, 10, 40))
    for m in meteoriti:
        m.deseneaza()
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
40 (100, -30)
(100, -27)
```

**Ce vezi pe ecran:** pe fundal închis, **meteoriți gri** de mărimi diferite, cu două **cratere** mai întunecate, care cad de sus, cu viteze diferite. Cei care ajung jos dispar.

Meteoritul are **rază** și **viteză** proprii (alese la întâmplare). Pătratul `rect` (de latură `2 * raza`) este folosit pentru coliziuni, iar cercul este doar pentru desen. Un meteorit nou apare din **30 în 30 de cadre** (de două ori pe secundă): condiția **`cadru % 30 == 0`** este adevărată atunci când numărul cadrului se împarte exact la 30.

---

## 3. Lovituri, explozii, butoane, dificultate, scut

### Exemplul 5 — Glonț lovește meteorit

```python
import pygame

class Glont:
    def __init__(self, x, y):
        self.rect = pygame.Rect(0, 0, 6, 16)
        self.rect.midbottom = (x, y)

class Meteorit:
    def __init__(self, x, y, raza):
        self.raza = raza
        self.rect = pygame.Rect(0, 0, 2 * raza, 2 * raza)
        self.rect.center = (x, y)

def gestioneaza_lovituri(gloante, meteoriti):
    lovituri = 0
    for g in gloante[:]:
        for m in meteoriti[:]:
            if g.rect.colliderect(m.rect):
                gloante.remove(g)
                meteoriti.remove(m)
                lovituri += 1
                break
    return lovituri

gloante = [Glont(100, 100), Glont(400, 100)]
meteoriti = [Meteorit(100, 100, 20), Meteorit(250, 100, 20)]

print("Lovituri:", gestioneaza_lovituri(gloante, meteoriti))
print("Gloante ramase:", len(gloante))
print("Meteoriti ramasi:", len(meteoriti))
```

**Ieșire:**
```text
Lovituri: 1
Gloante ramase: 1
Meteoriti ramasi: 1
```

Aici este **inima** jocului: pentru fiecare glonț verificăm dacă lovește vreun meteorit. Detalii importante:
- parcurgem **copii** ale listelor (`gloante[:]`), pentru că scoatem elemente din ele **în timpul** buclei; dacă am scoate din lista pe care o parcurgem, Python ar **sări** peste elemente;
- `break` oprește căutarea după prima lovitură, pentru că un glonț **nu poate lovi doi** meteoriți deodată (și nu ar trebui să-l scoatem de două ori din listă);
- funcția întoarce **câte lovituri** au fost, ca să adăugăm punctele.

### Exemplul 6 — Explozii cu particule

```python
import math
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Explozii")
ceas = pygame.time.Clock()

class Particula:
    def __init__(self, x, y, dx, dy, viata, culoare=(255, 180, 0)):
        self.x = x
        self.y = y
        self.dx = dx
        self.dy = dy
        self.viata = viata
        self.culoare = culoare

    def muta(self):
        self.x += self.dx
        self.y += self.dy
        self.viata -= 1

    def deseneaza(self):
        raza = max(1, self.viata // 8)
        pygame.draw.circle(ecran, self.culoare, (int(self.x), int(self.y)), raza)

def explozie(particule, x, y, culoare, cate=20):
    for i in range(cate):
        unghi = random.uniform(0, 2 * math.pi)
        viteza = random.uniform(1, 5)
        particule.append(Particula(x, y, math.cos(unghi) * viteza, math.sin(unghi) * viteza, random.randint(20, 40), culoare))

test = Particula(100, 100, 2, -3, 30)
test.muta()
print(test.x, test.y, test.viata)

particule = []

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.MOUSEBUTTONDOWN:
            explozie(particule, eveniment.pos[0], eveniment.pos[1], random.choice([(255, 180, 0), (255, 80, 80), (120, 220, 255)]))

    for p in particule:
        p.muta()
    particule = [p for p in particule if p.viata > 0]

    ecran.fill((15, 15, 35))
    for p in particule:
        p.deseneaza()
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
102 97 29
```

**Ce vezi pe ecran:** la fiecare **click**, în locul respectiv „explodează” un nor de **20 de puncte colorate** (galbene, roșii sau albastre), care **zboară în toate direcțiile**, se **micșorează** și **dispar**.

Fiecare particulă are o **direcție** (`dx`, `dy`) și o **viață**. Direcțiile sunt calculate cu **`cos`** și **`sin`**, dintr-un unghi ales la întâmplare (`random.uniform(a, b)` alege un număr **cu zecimale** între a și b): așa punctele pornesc în toate direcțiile, ca un cerc. Pe măsură ce viața scade, raza particulei devine mai mică. La fel se fac artificiile!

### Exemplul 7 — Butoane

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Butoane")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 36)

class Buton:
    def __init__(self, text, x, y, latime, inaltime):
        self.text = text
        self.rect = pygame.Rect(x, y, latime, inaltime)

    def este_apasat(self, pozitie):
        return self.rect.collidepoint(pozitie)

    def deseneaza(self):
        if self.rect.collidepoint(pygame.mouse.get_pos()):
            culoare = (70, 140, 255)
        else:
            culoare = (40, 90, 200)
        pygame.draw.rect(ecran, culoare, self.rect, border_radius=12)
        pygame.draw.rect(ecran, (255, 255, 255), self.rect, 2, border_radius=12)
        imagine = font.render(self.text, True, (255, 255, 255))
        ecran.blit(imagine, imagine.get_rect(center=self.rect.center))

test = Buton("Joaca", 200, 150, 200, 50)
print(test.este_apasat((250, 170)), test.este_apasat((10, 10)))

butoane = [Buton("Joaca", 200, 110, 200, 50), Buton("Reguli", 200, 180, 200, 50), Buton("Iesire", 200, 250, 200, 50)]
ultimul = "nimic"

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.MOUSEBUTTONDOWN:
            for b in butoane:
                if b.este_apasat(eveniment.pos):
                    ultimul = b.text

    ecran.fill((20, 20, 60))
    for b in butoane:
        b.deseneaza()
    ecran.blit(font.render("Ultimul apasat: " + ultimul, True, (255, 220, 0)), (170, 330))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
True False
```

**Ce vezi pe ecran:** trei **butoane albastre** (Joaca, Reguli, Iesire) cu contur alb. Când treci cu mouse-ul peste unul, devine **mai deschis**. Când dai click, jos scrie **„Ultimul apasat: …”** cu numele butonului.

Clasa `Buton` știe să se **deseneze** (cu text centrat: `imagine.get_rect(center=...)` creează un dreptunghi cu mijlocul în locul dorit) și să spună dacă **a fost apăsat**. O poți folosi pentru orice meniu.

### Exemplul 8 — Niveluri de dificultate

```python
def dificultate(nivel):
    return {
        "viteza_min": 2 + nivel,
        "viteza_max": 4 + nivel,
        "pauza": max(15, 60 - nivel * 8),
    }

for nivel in range(1, 7):
    d = dificultate(nivel)
    print("Nivel", nivel, ": viteza", d["viteza_min"], "-", d["viteza_max"], ", un meteorit la", d["pauza"], "cadre")
```

**Ieșire:**
```text
Nivel 1 : viteza 3 - 5 , un meteorit la 52 cadre
Nivel 2 : viteza 4 - 6 , un meteorit la 44 cadre
Nivel 3 : viteza 5 - 7 , un meteorit la 36 cadre
Nivel 4 : viteza 6 - 8 , un meteorit la 28 cadre
Nivel 5 : viteza 7 - 9 , un meteorit la 20 cadre
Nivel 6 : viteza 8 - 10 , un meteorit la 15 cadre
```

O singură funcție decide cât de greu este jocul: cu cât nivelul e mai mare, meteoriții sunt mai **rapizi** și apar mai **des**. `max(15, ...)` pune o **limită**: pauza nu scade niciodată sub 15 cadre (altfel, la niveluri mari, jocul ar deveni imposibil). Poți schimba **numerele** și jocul devine mai ușor sau mai greu, fără să atingi restul codului.

### Exemplul 9 — Scut cu timp limitat

```python
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 500
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Scut")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 30)

def scut_activ(pana, acum):
    return pana > acum

print(scut_activ(5000, 3000), scut_activ(5000, 5000), scut_activ(0, 100))

nava = pygame.Rect(0, 0, 50, 40)
nava.midbottom = (LATIME // 2, INALTIME - 20)
orb = None
scut_pana = 0
DURATA_SCUT = 4000

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        nava.x -= 7
    if taste[pygame.K_RIGHT]:
        nava.x += 7
    nava.clamp_ip(ecran.get_rect())

    acum = pygame.time.get_ticks()
    if orb is None and random.randint(1, 200) == 1:
        orb = pygame.Rect(random.randint(20, LATIME - 44), -24, 24, 24)
    if orb is not None:
        orb.y += 3
        if orb.colliderect(nava):
            scut_pana = acum + DURATA_SCUT
            orb = None
        elif orb.top > INALTIME:
            orb = None

    ecran.fill((10, 10, 40))
    if orb is not None:
        pygame.draw.circle(ecran, (80, 200, 255), orb.center, 12)
        pygame.draw.circle(ecran, (255, 255, 255), orb.center, 12, 2)
    pygame.draw.polygon(ecran, (0, 200, 255), [(nava.centerx, nava.top), (nava.left, nava.bottom), (nava.right, nava.bottom)])
    if scut_activ(scut_pana, acum):
        pygame.draw.circle(ecran, (120, 220, 255), nava.center, 42, 3)
        ramas = (scut_pana - acum) / DURATA_SCUT
        pygame.draw.rect(ecran, (80, 200, 255), (10, 10, int(150 * ramas), 14))
        ecran.blit(font.render("SCUT", True, (255, 255, 255)), (170, 8))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
True False False
```

**Ce vezi pe ecran:** din când în când cade de sus o **bilă albastră** (power-up). Dacă o prinzi cu nava, în jurul navei apare un **cerc albastru** (scutul) și, sus-stânga, o **bară** care se **golește în 4 secunde**, cu textul „SCUT”. Când bara s-a golit, scutul dispare.

Scutul funcționează cu **timpul**: la prindere reținem **până când** este activ (`scut_pana = acum + 4000`), apoi la fiecare cadru verificăm `scut_activ(scut_pana, acum)`. Variabila `orb` este `None` (adică „nimic”) cât timp nu există nicio bilă; verificăm cu `is None` / `is not None`.

---

## 4. Jocul întreg

### Exemplul 10 — „Apărătorii galaxiei”

```python
import math
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 650
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Aparatorii galaxiei")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 32)
font_mare = pygame.font.Font(None, 70)

FISIER_RECORD = "record_galaxie.txt"
DURATA_SCUT = 5000

def citeste_record():
    try:
        with open(FISIER_RECORD, "r") as f:
            return int(f.read().strip())
    except (FileNotFoundError, ValueError):
        return 0

def salveaza_record(valoare):
    with open(FISIER_RECORD, "w") as f:
        f.write(str(valoare))

def scrie(text, x, y, culoare=(255, 255, 255), fnt=None, centrat=False):
    if fnt is None:
        fnt = font
    imagine = fnt.render(text, True, culoare)
    if centrat:
        x = x - imagine.get_width() // 2
    ecran.blit(imagine, (x, y))

def dificultate(nivel):
    return {
        "viteza_min": 2 + nivel,
        "viteza_max": 4 + nivel,
        "pauza": max(15, 60 - nivel * 8),
    }

def scut_activ(pana, acum):
    return pana > acum

def inima(x, y, culoare):
    pygame.draw.circle(ecran, culoare, (x - 6, y), 7)
    pygame.draw.circle(ecran, culoare, (x + 6, y), 7)
    pygame.draw.polygon(ecran, culoare, [(x - 13, y + 2), (x + 13, y + 2), (x, y + 18)])

class Nava:
    def __init__(self):
        self.rect = pygame.Rect(0, 0, 50, 40)
        self.viteza = 7
        self.reseteaza()

    def reseteaza(self):
        self.rect.midbottom = (LATIME // 2, INALTIME - 25)

    def muta(self, taste):
        if taste[pygame.K_LEFT] or taste[pygame.K_a]:
            self.rect.x -= self.viteza
        if taste[pygame.K_RIGHT] or taste[pygame.K_d]:
            self.rect.x += self.viteza
        self.rect.clamp_ip(ecran.get_rect())

    def deseneaza(self):
        r = self.rect
        pygame.draw.polygon(ecran, (255, 160, 0), [(r.centerx - 8, r.bottom), (r.centerx + 8, r.bottom), (r.centerx, r.bottom + 14)])
        pygame.draw.polygon(ecran, (0, 200, 255), [(r.centerx, r.top), (r.left, r.bottom), (r.right, r.bottom)])

class Glont:
    def __init__(self, x, y):
        self.rect = pygame.Rect(0, 0, 6, 16)
        self.rect.midbottom = (x, y)
        self.viteza = 10

    def muta(self):
        self.rect.y -= self.viteza

    def a_iesit(self):
        return self.rect.bottom < 0

    def deseneaza(self):
        pygame.draw.rect(ecran, (255, 240, 100), self.rect, border_radius=3)

class Meteorit:
    def __init__(self, x, y, raza, viteza):
        self.raza = raza
        self.viteza = viteza
        self.rect = pygame.Rect(0, 0, 2 * raza, 2 * raza)
        self.rect.center = (x, y)

    def muta(self):
        self.rect.y += self.viteza

    def a_iesit(self):
        return self.rect.top > INALTIME

    def deseneaza(self):
        pygame.draw.circle(ecran, (130, 125, 120), self.rect.center, self.raza)
        pygame.draw.circle(ecran, (95, 90, 85), (self.rect.centerx - self.raza // 3, self.rect.centery - self.raza // 4), self.raza // 4)
        pygame.draw.circle(ecran, (95, 90, 85), (self.rect.centerx + self.raza // 3, self.rect.centery + self.raza // 3), self.raza // 5)

class Particula:
    def __init__(self, x, y, dx, dy, viata, culoare):
        self.x = x
        self.y = y
        self.dx = dx
        self.dy = dy
        self.viata = viata
        self.culoare = culoare

    def muta(self):
        self.x += self.dx
        self.y += self.dy
        self.viata -= 1

    def deseneaza(self):
        pygame.draw.circle(ecran, self.culoare, (int(self.x), int(self.y)), max(1, self.viata // 8))

class Buton:
    def __init__(self, text, x, y, latime, inaltime):
        self.text = text
        self.rect = pygame.Rect(x, y, latime, inaltime)

    def este_apasat(self, pozitie):
        return self.rect.collidepoint(pozitie)

    def deseneaza(self):
        if self.rect.collidepoint(pygame.mouse.get_pos()):
            culoare = (70, 140, 255)
        else:
            culoare = (40, 90, 200)
        pygame.draw.rect(ecran, culoare, self.rect, border_radius=12)
        pygame.draw.rect(ecran, (255, 255, 255), self.rect, 2, border_radius=12)
        imagine = font.render(self.text, True, (255, 255, 255))
        ecran.blit(imagine, imagine.get_rect(center=self.rect.center))

nava = Nava()
gloante = []
meteoriti = []
particule = []
stele = []
for i in range(60):
    stele.append([random.randint(0, LATIME), random.randint(0, INALTIME), random.randint(1, 3)])

butoane_meniu = [Buton("Joaca", 200, 330, 200, 55), Buton("Iesire", 200, 410, 200, 55)]
butoane_final = [Buton("Din nou", 200, 400, 200, 55), Buton("Meniu", 200, 480, 200, 55)]

joc = {"stare": "meniu", "scor": 0, "vieti": 3, "nivel": 1, "record": citeste_record(),
       "scut_pana": 0, "ultimul_foc": 0, "orb": None}

def joc_nou():
    joc["stare"] = "joc"
    joc["scor"] = 0
    joc["vieti"] = 3
    joc["nivel"] = 1
    joc["scut_pana"] = 0
    joc["ultimul_foc"] = 0
    joc["orb"] = None
    gloante.clear()
    meteoriti.clear()
    particule.clear()
    nava.reseteaza()

def explozie(x, y, culoare, cate=14):
    for i in range(cate):
        unghi = random.uniform(0, 2 * math.pi)
        viteza = random.uniform(1, 5)
        particule.append(Particula(x, y, math.cos(unghi) * viteza, math.sin(unghi) * viteza, random.randint(20, 40), culoare))

cadru = 0
ruleaza = True
while ruleaza:
    acum = pygame.time.get_ticks()

    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_ESCAPE:
                ruleaza = False
            if eveniment.key == pygame.K_p:
                if joc["stare"] == "joc":
                    joc["stare"] = "pauza"
                elif joc["stare"] == "pauza":
                    joc["stare"] = "joc"
        if eveniment.type == pygame.MOUSEBUTTONDOWN:
            if joc["stare"] == "meniu":
                if butoane_meniu[0].este_apasat(eveniment.pos):
                    joc_nou()
                elif butoane_meniu[1].este_apasat(eveniment.pos):
                    ruleaza = False
            elif joc["stare"] == "final":
                if butoane_final[0].este_apasat(eveniment.pos):
                    joc_nou()
                elif butoane_final[1].este_apasat(eveniment.pos):
                    joc["stare"] = "meniu"

    if joc["stare"] != "pauza":
        for s in stele:
            s[1] += s[2]
            if s[1] > INALTIME:
                s[1] = 0
                s[0] = random.randint(0, LATIME)
        for p in particule:
            p.muta()
        particule[:] = [p for p in particule if p.viata > 0]

    if joc["stare"] == "joc":
        cadru += 1
        dif = dificultate(joc["nivel"])
        nava.muta(pygame.key.get_pressed())

        if pygame.key.get_pressed()[pygame.K_SPACE] and acum - joc["ultimul_foc"] > 220:
            gloante.append(Glont(nava.rect.centerx, nava.rect.top))
            joc["ultimul_foc"] = acum

        if cadru % dif["pauza"] == 0:
            r = random.randint(15, 35)
            meteoriti.append(Meteorit(random.randint(r, LATIME - r), -r, r, random.randint(dif["viteza_min"], dif["viteza_max"])))

        for g in gloante:
            g.muta()
        for m in meteoriti:
            m.muta()
        gloante[:] = [g for g in gloante if not g.a_iesit()]
        meteoriti[:] = [m for m in meteoriti if not m.a_iesit()]

        for g in gloante[:]:
            for m in meteoriti[:]:
                if g.rect.colliderect(m.rect):
                    gloante.remove(g)
                    meteoriti.remove(m)
                    joc["scor"] += 1
                    joc["nivel"] = joc["scor"] // 10 + 1
                    explozie(m.rect.centerx, m.rect.centery, (255, 160, 0))
                    break

        for m in meteoriti[:]:
            if m.rect.colliderect(nava.rect):
                meteoriti.remove(m)
                explozie(m.rect.centerx, m.rect.centery, (255, 160, 0))
                if not scut_activ(joc["scut_pana"], acum):
                    joc["vieti"] -= 1
                    explozie(nava.rect.centerx, nava.rect.centery, (255, 60, 60), 24)

        if joc["orb"] is None and random.randint(1, 600) == 1:
            joc["orb"] = pygame.Rect(random.randint(20, LATIME - 44), -24, 24, 24)
        if joc["orb"] is not None:
            joc["orb"].y += 3
            if joc["orb"].colliderect(nava.rect):
                joc["scut_pana"] = acum + DURATA_SCUT
                joc["orb"] = None
            elif joc["orb"].top > INALTIME:
                joc["orb"] = None

        if joc["vieti"] <= 0:
            joc["stare"] = "final"
            if joc["scor"] > joc["record"]:
                joc["record"] = joc["scor"]
                salveaza_record(joc["record"])

    ecran.fill((5, 5, 25))
    for s in stele:
        stralucire = 80 + 50 * s[2]
        pygame.draw.rect(ecran, (stralucire, stralucire, stralucire), (s[0], s[1], s[2], s[2]))

    if joc["stare"] == "meniu":
        scrie("APARATORII", LATIME // 2, 130, (255, 220, 0), font_mare, True)
        scrie("GALAXIEI", LATIME // 2, 195, (255, 220, 0), font_mare, True)
        scrie("Stanga/Dreapta = mergi, SPATIU = tragi", LATIME // 2, 270, (200, 200, 200), None, True)
        for b in butoane_meniu:
            b.deseneaza()
        scrie("Record: " + str(joc["record"]), LATIME // 2, 500, (120, 255, 120), None, True)
    else:
        for m in meteoriti:
            m.deseneaza()
        for g in gloante:
            g.deseneaza()
        if joc["orb"] is not None:
            pygame.draw.circle(ecran, (80, 200, 255), joc["orb"].center, 12)
            pygame.draw.circle(ecran, (255, 255, 255), joc["orb"].center, 12, 2)
        for p in particule:
            p.deseneaza()
        if joc["stare"] != "final":
            nava.deseneaza()
            if scut_activ(joc["scut_pana"], acum):
                pygame.draw.circle(ecran, (120, 220, 255), nava.rect.center, 42, 3)

        scrie("Scor: " + str(joc["scor"]), 10, 10)
        scrie("Nivel: " + str(joc["nivel"]), 10, 40)
        scrie("Record: " + str(joc["record"]), 10, 70, (255, 220, 0))
        for i in range(3):
            if i < joc["vieti"]:
                inima(LATIME - 30 - i * 35, 22, (230, 30, 60))
            else:
                inima(LATIME - 30 - i * 35, 22, (80, 80, 90))
        if scut_activ(joc["scut_pana"], acum):
            ramas = (joc["scut_pana"] - acum) / DURATA_SCUT
            pygame.draw.rect(ecran, (80, 200, 255), (10, INALTIME - 24, int(150 * ramas), 14))
            scrie("SCUT", 170, INALTIME - 28)

        if joc["stare"] == "pauza":
            scrie("PAUZA", LATIME // 2, 280, (255, 255, 255), font_mare, True)
        if joc["stare"] == "final":
            scrie("GAME OVER", LATIME // 2, 200, (255, 90, 90), font_mare, True)
            scrie("Scor final: " + str(joc["scor"]), LATIME // 2, 290, (255, 255, 255), None, True)
            scrie("Record: " + str(joc["record"]), LATIME // 2, 330, (255, 220, 0), None, True)
            for b in butoane_final:
                b.deseneaza()

    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** un joc **complet**.
- **Meniu:** titlul „APARATORII GALAXIEI” (galben), două butoane (**Joaca**, **Iesire**) și **recordul** citit din fișier. Cerul cu stele curge în fundal.
- **Joc:** jos, **nava ta**; cu **stânga/dreapta** (sau A/D) o miști, iar cu **SPAȚIU** tragi gloanțe. Din cer cad **meteoriți**. Un glonț care lovește un meteorit îl **distruge într-o explozie** și îți dă **1 punct**. Dacă un meteorit atinge nava, pierzi o **viață** (din trei, afișate ca inimioare, sus-dreapta). La fiecare **10 puncte** crește **nivelul**, iar meteoriții sunt mai rapizi și mai deși. Din când în când cade o **bilă albastră**: dacă o prinzi, primești un **scut** de 5 secunde (cerc albastru în jurul navei și o bară jos-stânga), în care meteoriții nu te rănesc. Tasta **P** pune jocul pe **pauză**.
- **Final:** apare **„GAME OVER”**, scorul și recordul, cu butoanele **Din nou** și **Meniu**. Dacă ai bătut recordul, el este **salvat în fișierul** `record_galaxie.txt`, deci rămâne și după ce închizi jocul.

Privește cum este organizat: **clase** pentru lucrurile din joc (`Nava`, `Glont`, `Meteorit`, `Particula`, `Buton`), **funcții** pentru acțiuni (`joc_nou`, `explozie`, `dificultate`, `scut_activ`), un **dicționar `joc`** cu tot ce se schimbă și o **buclă** care le coordonează. Același tipar îl vei folosi la jocul tău!

---

## 5. Jocul meu

### Cum lucrăm în a doua parte a orei
1. **Alege un tip de joc** (vezi lista de idei de mai jos) sau inventează unul.  
2. **Începe de la scheletul** din Exemplul 1 sau de la „Apărătorii galaxiei” și schimbă-l.  
3. Adaugă piesele **pe rând**, iar după **fiecare** piesă rulează jocul. Nu scrie 100 de rânduri și abia apoi să testezi!  
4. Dacă ceva nu merge, citește **ultima linie** a erorii și caută numărul liniei.  
5. Salvează des (**Ctrl + S**).

### Idei de jocuri
- **Platformă:** o clasă `Platforma` și gravitație (L3), sărituri.  
- **Labirint:** pereți, monede, inamici care patrulează (L5).  
- **Evită obstacolele:** un personaj care sare peste cutii (endless runner).  
- **Pescar:** prinzi pești (puncte) și ocolești deșeurile.  
- **Șerpișor:** o listă de pătrățele care crește când mănâncă.  
- **Memorie / perechi:** cărți care se întorc la click.  
- **Tunar:** tragi în ținte care se mișcă (ca în Exemplul 10).

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Jocul meu (obligatoriu)
Fă un joc **al tău**, cu **toate** acestea:
1. un **meniu** de început (cu butoane sau tastă);
2. **cel puțin două clase** (de exemplu `Jucator` și `Inamic`);
3. **scor** și **vieți** (sau timp) afișate pe ecran;
4. **cel puțin 3 niveluri** sau o dificultate care crește;
5. **GAME OVER** cu posibilitatea de a juca din nou;
6. **record** salvat într-un fișier, citit cu `try / except`;
7. **un element inventat de tine** (power-up, inamic special, efect, sunet, personaj nou).

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
def dificultate(nivel):
    return max(10, 50 - nivel * 10)

for nivel in range(1, 6):
    print(nivel, dificultate(nivel))

lista = [1, 2, 3, 4, 5, 6]
for x in lista[:]:
    if x % 2 == 0:
        lista.remove(x)
print(lista)
```

### Exercițiul C — Un element nou
Alege **una** dintre variante și adaugă-o în „Apărătorii galaxiei”: un tip de **inamic care coboară în zigzag**; un **power-up** care trage trei gloanțe deodată; un **boss** la nivelul 5; o **viață bonus** care cade din cer.

### Exercițiul D — Găsește greșelile
Programul are 3 greșeli. Rescrie-l corect:

```text
class Glont:
    def __init__(self, x, y):
        self.rect = pygame.Rect(0, 0, 6, 16)
        self.rect.midbottom = (x, y)
    def muta(self):
        rect.y -= 10
gloante = [Glont(10, 10), Glont(20, 10)]
for g in gloante:
    g.muta()
    if g.a_iesit():
        gloante.remove(g)
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Care sunt **părțile** jocului tău (clase, funcții, stări)?  
2. De ce parcurgem o **copie** a listei (`lista[:]`) când scoatem elemente din ea?  
3. Ce ai învățat în acest modul și ce ți-a plăcut cel mai mult?

**Gata când:**
- [ ] Jocul are meniu, scor, vieți, niveluri și GAME OVER  
- [ ] Are cel puțin două clase  
- [ ] Recordul este salvat în fișier, cu `try / except`  
- [ ] Are un element inventat de tine  
- [ ] Ai explicat pe foaie cum este organizat jocul  
- [ ] Fișierul se numește `Prenume_Nume_P4_L9.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă **sunete** cu `pygame.mixer` (un sunet la tragere și unul la explozie)  
- [ ] Folosește **imagini** (L2) pentru navă și meteoriți  
- [ ] Scutul continuă să scadă și în pauză. **Repară asta!**  
- [ ] Adaugă un **ecran de reguli** și un **top 5** (L8)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `NameError: name 'rect' is not defined` | Ai scris `rect` în loc de `self.rect` într-o metodă | `self.rect.y -= 10` |
| `AttributeError: 'Glont' object has no attribute 'a_iesit'` | Metoda nu există în clasă | Scrie `def a_iesit(self):` |
| `ValueError: list.remove(x): x not in list` | Ai scos același obiect de două ori | `break` după prima lovitură |
| Unele obiecte „sar” peste verificare | Ai scos din lista pe care o parcurgi | Parcurge o copie: `for g in lista[:]:` |
| `AttributeError: 'NoneType' object has no attribute 'y'` | `orb` este `None` și îl folosești | `if orb is not None:` |
| Jocul pare „înghețat” | Ai uitat `pygame.display.flip()` sau `ceas.tick(60)` | Verifică sfârșitul buclei |
| Se trag zeci de gloanțe pe secundă | Nu ai ritm de tragere | Verifică `acum - ultimul_foc > 220` |
| Recordul nu se păstrează | Ai uitat să-l salvezi la final | `salveaza_record(...)` când îl depășești |

---

## Recapitulare pe scurt

- Un joc mare se construiește din **piese mici**: clase, funcții, un dicționar de stare.
- Stările (`meniu`, `joc`, `pauza`, `final`) organizează ecranele.
- Scoatem elemente din liste **parcurgând o copie** (`lista[:]`).
- Ritmul de tragere și scutul folosesc `pygame.time.get_ticks()`.
- Dificultatea crește cu nivelul, controlată dintr-o singură funcție.
- Recordul se salvează într-un fișier și se citește cu `try / except`.

---

## Temă
1. Termină **jocul tău** acasă: bifează toate punctele din „Gata când”.  
2. Joacă-l cu **trei persoane** și notează ce li s-a părut greu sau neclar. Îmbunătățește jocul după părerile lor.  
3. Pregătește **prezentarea de 2 minute**: numele jocului, ideea, controlul, ce ai inventat tu.  
4. **Bonus:** fă o copie a jocului cu un **alt aspect** (alte culori, alte personaje).  
5. Salvează totul ca `Tema_P4_L9_Prenume_Nume.py`.

---

## Ce urmează — Lecția 10
**Expoziția + verificare finală**: prezentăm jocurile, jucăm jocurile colegilor și facem **testul final** al modulului și al cursului.
