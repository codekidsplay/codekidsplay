# LECȚIA 4 — Tastatura: controlăm personajul
**Modulul 4 · Jocuri cu Pygame · 2 ore**  
**Code Maker Club · Game Creator**

> Până acum obiectele se mișcau singure. Azi **tu** conduci personajul: cu săgețile sau cu W, A, S, D. Învățăm două feluri de a citi tastatura, cum ținem personajul în ecran, cum sare și cum **trage**. La final conduci o navă spațială.  
> Proiect: **„Nava mea”** · fișier: `Prenume_Nume_P4_L4.py`

---

## Obiectiv
La finalul orei citești tastatura cu evenimente (`KEYDOWN`) și cu `pygame.key.get_pressed()`, miști un personaj în patru direcții, îl ții în fereastră, îl faci să sară și să tragă, folosești o pauză între focuri (cooldown) și construiești o navă spațială controlată de tine.  
**Minim:** un personaj care se mișcă cu săgețile și rămâne în fereastră.  
**Ținta orei (Complet):** + sărituri sau tragere și nava din mini-proiect.

## De ce contează
Controlul este ceea ce transformă o animație într-un **joc**. O tastă apăsată trebuie să se simtă **imediat** și să fie ușor de folosit. Azi înveți exact cum se face asta.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L3 |
| 10–35 | Doi mari prieteni: `KEYDOWN` și `get_pressed` (**Exemplele 1–3**) |
| 35–55 | Marginile, turbo, direcția (**Exemplele 4–6**) |
| 55–75 | Săritura (**Exemplul 7**) |
| 75–100 | Tragerea și pauza între focuri (**Exemplele 8–9**) |
| 100–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L3

- Bucla jocului: evenimente → actualizare → desenare.
- Poziția se schimbă cu `x += viteza`; ricoșeul schimbă semnul vitezei.
- `Rect` are `left`, `right`, `top`, `bottom`, `center`.

**Încearcă tu (3 min)**  
- [ ] Scrie o buclă care mută un pătrat cu 2 pixeli spre dreapta la fiecare cadru  

---

## 2. Cele două moduri de a citi tastatura

| Metoda | Când se folosește | Exemplu |
|--------|-------------------|---------|
| **Eveniment** `KEYDOWN` | Se întâmplă **o singură dată**, în momentul apăsării | un salt, un foc, pauză, ieșire |
| **Starea tastelor** `get_pressed()` | Răspunde **cât timp ții** tasta apăsată | mers, zbor, rotire |

### Exemplul 1 — Un pas la fiecare apăsare

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Un pas la o apasare")
ceas = pygame.time.Clock()

x = 280
y = 180
pas = 40

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_LEFT:
                x -= pas
            if eveniment.key == pygame.K_RIGHT:
                x += pas
            if eveniment.key == pygame.K_UP:
                y -= pas
            if eveniment.key == pygame.K_DOWN:
                y += pas

    ecran.fill((30, 30, 60))
    pygame.draw.rect(ecran, (0, 220, 120), (x, y, 40, 40))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** un **pătrat verde** în centru. De fiecare dată când **apeși** o săgeată, pătratul face **un salt de 40 de pixeli** în acea direcție. Dacă ții tasta apăsată, nu se întâmplă nimic în plus: evenimentul `KEYDOWN` apare **o singură dată**.

Merge pentru jocuri „pe pătrățele” (șah, labirint pe grilă), dar nu pentru mișcare lină.

### Exemplul 2 — Mers continuu

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Mers continuu")
ceas = pygame.time.Clock()

x = 280
y = 180
viteza = 5

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        x -= viteza
    if taste[pygame.K_RIGHT]:
        x += viteza
    if taste[pygame.K_UP]:
        y -= viteza
    if taste[pygame.K_DOWN]:
        y += viteza

    ecran.fill((30, 30, 60))
    pygame.draw.rect(ecran, (0, 220, 120), (x, y, 40, 40))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** pătratul verde se mișcă **lin**, cât timp ții o săgeată. Poți ține **două săgeți deodată**, de exemplu sus și dreapta, și pătratul merge pe **diagonală**.

`pygame.key.get_pressed()` ne dă „o listă” cu **starea tuturor tastelor** în acest moment. `taste[pygame.K_LEFT]` este `True` dacă săgeata stânga este apăsată **chiar acum**. Folosim `if` separate (nu `elif`), ca să se poată combina direcțiile.

### Exemplul 3 — Săgeți și WASD

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Sageti sau WASD")
ceas = pygame.time.Clock()

jucator = pygame.Rect(280, 180, 40, 40)
viteza = 5

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT] or taste[pygame.K_a]:
        jucator.x -= viteza
    if taste[pygame.K_RIGHT] or taste[pygame.K_d]:
        jucator.x += viteza
    if taste[pygame.K_UP] or taste[pygame.K_w]:
        jucator.y -= viteza
    if taste[pygame.K_DOWN] or taste[pygame.K_s]:
        jucator.y += viteza

    ecran.fill((30, 30, 60))
    pygame.draw.rect(ecran, (255, 160, 0), jucator)
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** un **pătrat portocaliu** pe care îl poți controla **fie cu săgețile, fie cu W, A, S, D** (W = sus, A = stânga, S = jos, D = dreapta).

Cu `or`, aceeași acțiune se declanșează de la oricare dintre două taste. De acum personajul este un `Rect` (`jucator`), care ne va fi util la coliziuni.

---

## 3. Margini, viteză, direcție

### Exemplul 4 — Rămânem în fereastră

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
ceas = pygame.time.Clock()
zona = ecran.get_rect()

jucator = pygame.Rect(280, 180, 40, 40)
viteza = 6

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT] or taste[pygame.K_a]:
        jucator.x -= viteza
    if taste[pygame.K_RIGHT] or taste[pygame.K_d]:
        jucator.x += viteza
    if taste[pygame.K_UP] or taste[pygame.K_w]:
        jucator.y -= viteza
    if taste[pygame.K_DOWN] or taste[pygame.K_s]:
        jucator.y += viteza

    jucator.clamp_ip(zona)

    ecran.fill((30, 30, 60))
    pygame.draw.rect(ecran, (255, 160, 0), jucator)
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** pătratul portocaliu **nu mai poate ieși** din fereastră: la margine, pur și simplu se oprește.

Rândul magic este `jucator.clamp_ip(zona)`. „Clamp” înseamnă „a fixa înăuntru”: dacă `jucator` iese din dreptunghiul `zona`, este împins înapoi. `ecran.get_rect()` ne dă dreptunghiul întregului ecran. Te poți gândi la `clamp_ip` ca la un **gard invizibil**.

### Exemplul 5 — Turbo cu Shift

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
ceas = pygame.time.Clock()
zona = ecran.get_rect()

jucator = pygame.Rect(280, 180, 40, 40)

def calculeaza_viteza(shift_apasat):
    if shift_apasat:
        return 10
    return 4

print("Fara Shift:", calculeaza_viteza(False))
print("Cu Shift:", calculeaza_viteza(True))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    viteza = calculeaza_viteza(taste[pygame.K_LSHIFT])
    if taste[pygame.K_LEFT]:
        jucator.x -= viteza
    if taste[pygame.K_RIGHT]:
        jucator.x += viteza
    if taste[pygame.K_UP]:
        jucator.y -= viteza
    if taste[pygame.K_DOWN]:
        jucator.y += viteza
    jucator.clamp_ip(zona)

    if viteza > 4:
        culoare = (255, 60, 60)
    else:
        culoare = (255, 160, 0)

    ecran.fill((30, 30, 60))
    pygame.draw.rect(ecran, culoare, jucator)
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
Fara Shift: 4
Cu Shift: 10
```

**Ce vezi pe ecran:** pătratul se mișcă cu săgețile. Cât timp ții apăsată tasta **Shift** din stânga, merge **mai repede** (10 în loc de 4 pixeli) și devine **roșu**.

Funcția `calculeaza_viteza(shift_apasat)` alege viteza, iar noi o testăm la început, cu `print`.

### Exemplul 6 — Personajul se întoarce

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 300))
ceas = pygame.time.Clock()
zona = ecran.get_rect()

spre_dreapta = pygame.Surface((60, 60), pygame.SRCALPHA)
pygame.draw.circle(spre_dreapta, (255, 200, 0), (30, 30), 28)
pygame.draw.circle(spre_dreapta, (255, 255, 255), (42, 22), 9)
pygame.draw.circle(spre_dreapta, (0, 0, 0), (45, 22), 4)
pygame.draw.polygon(spre_dreapta, (255, 120, 0), [(52, 32), (60, 36), (52, 40)])

spre_stanga = pygame.transform.flip(spre_dreapta, True, False)

pozitie = spre_dreapta.get_rect()
pozitie.center = (300, 150)
directie = "dreapta"

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        pozitie.x -= 5
        directie = "stanga"
    if taste[pygame.K_RIGHT]:
        pozitie.x += 5
        directie = "dreapta"
    pozitie.clamp_ip(zona)

    if directie == "dreapta":
        imagine = spre_dreapta
    else:
        imagine = spre_stanga

    ecran.fill((170, 220, 255))
    ecran.blit(imagine, pozitie)
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** un **personaj rotund galben**, cu un ochi alb și un cioc portocaliu, pe fundal albastru deschis. Când mergi spre **dreapta**, ciocul arată spre dreapta. Când mergi spre **stânga**, personajul se **oglindește** și ciocul arată spre stânga.

Creăm **două imagini** (originalul și varianta oglindită, cu `transform.flip`) și, la fiecare cadru, o alegem pe cea potrivită cu variabila `directie`.

---

## 4. Săritura

### Exemplul 7 — Sărim pe loc

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
ceas = pygame.time.Clock()

PODEA = 340
x = 100
y = PODEA - 50
viteza_y = 0.0
pe_pamant = True

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_SPACE and pe_pamant:
                viteza_y = -15
                pe_pamant = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        x -= 5
    if taste[pygame.K_RIGHT]:
        x += 5

    viteza_y += 0.8
    y += viteza_y
    if y >= PODEA - 50:
        y = PODEA - 50
        viteza_y = 0
        pe_pamant = True

    ecran.fill((170, 220, 255))
    pygame.draw.rect(ecran, (60, 160, 60), (0, PODEA, LATIME, INALTIME - PODEA))
    pygame.draw.rect(ecran, (220, 40, 40), (x, int(y), 50, 50))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** pe cer albastru, jos, o **fâșie de iarbă**. Un **pătrat roșu** stă pe iarbă. Cu **săgețile** stânga și dreapta se mișcă, iar cu **spațiu** **sare**: urcă repede, încetinește, ajunge sus, apoi cade înapoi.

Ingredientele sunt cele din lecția trecută (gravitația), plus două idei noi:
- săritura se declanșează cu **`KEYDOWN`** (o singură dată), nu cu `get_pressed`, altfel pătratul ar zbura cât ții tasta;
- variabila `pe_pamant` **interzice săritura în aer**: se poate sări doar când ești pe iarbă (`pe_pamant` este `True`).

---

## 5. Tragerea

### Exemplul 8 — Gloanțe

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 450
ecran = pygame.display.set_mode((LATIME, INALTIME))
ceas = pygame.time.Clock()
zona = ecran.get_rect()

nava = pygame.Rect(280, 380, 50, 40)
gloante = []

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_SPACE:
                glont = pygame.Rect(0, 0, 6, 16)
                glont.midbottom = nava.midtop
                gloante.append(glont)

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        nava.x -= 6
    if taste[pygame.K_RIGHT]:
        nava.x += 6
    nava.clamp_ip(zona)

    ramase = []
    for glont in gloante:
        glont.y -= 9
        if glont.bottom > 0:
            ramase.append(glont)
    gloante = ramase

    ecran.fill((10, 10, 40))
    pygame.draw.rect(ecran, (0, 200, 255), nava)
    for glont in gloante:
        pygame.draw.rect(ecran, (255, 255, 0), glont)
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal spațial, jos, o **navă albastră** (dreptunghi). O conduci stânga-dreapta. La **spațiu** pornește din vârful ei un **glont galben** care zboară în sus și dispare când iese din ecran.

Cum merge:
- fiecare glonț este un `Rect`, pus într-o **listă** (`gloante`);
- `glont.midbottom = nava.midtop` așază **mijlocul de jos** al glonțului în **mijlocul de sus** al navei;
- la fiecare cadru mutăm toate gloanțele în sus; dacă un glonț a ieșit complet (`bottom` este sub 0), **nu-l mai păstrăm**: construim o listă nouă, `ramase`, cu gloanțele care încă se văd.

**De ce ștergem gloanțele care ies?** Altfel lista ar crește la nesfârșit și jocul ar încetini.

### Exemplul 9 — Pauză între focuri (cooldown)

```python
import pygame

def poate_trage(acum, ultima_tragere, pauza):
    return acum - ultima_tragere >= pauza

print(poate_trage(1000, 0, 300))
print(poate_trage(1100, 1000, 300))
print(poate_trage(1300, 1000, 300))

pygame.init()
LATIME = 600
INALTIME = 450
ecran = pygame.display.set_mode((LATIME, INALTIME))
ceas = pygame.time.Clock()
zona = ecran.get_rect()

nava = pygame.Rect(280, 380, 50, 40)
gloante = []
ultima_tragere = 0
PAUZA = 250

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT]:
        nava.x -= 6
    if taste[pygame.K_RIGHT]:
        nava.x += 6
    nava.clamp_ip(zona)

    acum = pygame.time.get_ticks()
    if taste[pygame.K_SPACE] and poate_trage(acum, ultima_tragere, PAUZA):
        glont = pygame.Rect(0, 0, 6, 16)
        glont.midbottom = nava.midtop
        gloante.append(glont)
        ultima_tragere = acum

    ramase = []
    for glont in gloante:
        glont.y -= 9
        if glont.bottom > 0:
            ramase.append(glont)
    gloante = ramase

    ecran.fill((10, 10, 40))
    pygame.draw.rect(ecran, (0, 200, 255), nava)
    for glont in gloante:
        pygame.draw.rect(ecran, (255, 255, 0), glont)
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

**Ce vezi pe ecran:** aceeași navă, dar acum, dacă **ții apăsat spațiul**, ea trage **un glonț la fiecare 250 de milisecunde** (4 pe secundă), nu zeci deodată.

`pygame.time.get_ticks()` dă **milisecundele trecute de la pornirea jocului**. Reținem momentul ultimului foc (`ultima_tragere`) și permitem un foc nou doar dacă a trecut cel puțin `PAUZA`. Funcția `poate_trage` este testată cu trei exemple: la 1000 ms după un foc de la 0, putem trage; la 100 ms după ultimul foc, nu; la 300 ms, din nou da. (`print`-urile arată `True`, `False`, `True`.)

---

## 6. Mini-proiect

### Exemplul 10 — Nava mea

```python
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 500
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Nava mea")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 30)
zona = ecran.get_rect()

# imaginea navei
nava_img = pygame.Surface((50, 60), pygame.SRCALPHA)
pygame.draw.polygon(nava_img, (0, 200, 255), [(25, 0), (50, 50), (25, 40), (0, 50)])
pygame.draw.circle(nava_img, (255, 255, 255), (25, 25), 6)
pygame.draw.polygon(nava_img, (255, 120, 0), [(18, 42), (25, 60), (32, 42)])

nava = nava_img.get_rect()
nava.midbottom = (LATIME // 2, INALTIME - 20)

stele = []
for i in range(60):
    stele.append([random.randint(0, LATIME), random.randint(0, INALTIME), random.randint(1, 3)])

gloante = []
ultima_tragere = 0
PAUZA = 200
focuri = 0

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN and eveniment.key == pygame.K_ESCAPE:
            ruleaza = False

    taste = pygame.key.get_pressed()
    if taste[pygame.K_LEFT] or taste[pygame.K_a]:
        nava.x -= 7
    if taste[pygame.K_RIGHT] or taste[pygame.K_d]:
        nava.x += 7
    if taste[pygame.K_UP] or taste[pygame.K_w]:
        nava.y -= 5
    if taste[pygame.K_DOWN] or taste[pygame.K_s]:
        nava.y += 5
    nava.clamp_ip(zona)

    acum = pygame.time.get_ticks()
    if taste[pygame.K_SPACE] and acum - ultima_tragere >= PAUZA:
        glont = pygame.Rect(0, 0, 6, 18)
        glont.midbottom = nava.midtop
        gloante.append(glont)
        ultima_tragere = acum
        focuri += 1

    ramase = []
    for glont in gloante:
        glont.y -= 12
        if glont.bottom > 0:
            ramase.append(glont)
    gloante = ramase

    for stea in stele:
        stea[1] += stea[2]
        if stea[1] > INALTIME:
            stea[1] = 0
            stea[0] = random.randint(0, LATIME)

    ecran.fill((5, 5, 25))
    for stea in stele:
        gri = 100 + stea[2] * 50
        pygame.draw.circle(ecran, (gri, gri, gri), (stea[0], stea[1]), stea[2])
    for glont in gloante:
        pygame.draw.rect(ecran, (255, 255, 0), glont)
    ecran.blit(nava_img, nava)
    text = font.render("Focuri: " + str(focuri) + "   Gloante pe ecran: " + str(len(gloante)), True, (255, 255, 255))
    ecran.blit(text, (10, 10))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** un **cer cu 60 de stele** care **cad încet** (stelele mari cad mai repede, ca un efect de adâncime) și o **navă albastră** cu un geam alb și o flacără portocalie, jos, în centru. Conduci nava cu **săgețile** sau cu **W, A, S, D**; ea nu iese din ecran. Cu **spațiu** tragi gloanțe galbene (maximum 5 pe secundă). Sus, în stânga, un text arată **câte focuri ai tras** și câte gloanțe sunt acum pe ecran. **Escape** închide jocul.

Ce este nou aici: stelele sunt liste mici `[x, y, viteză]`; cele care ies jos **reapar sus**, în alt loc. Nava este o **imagine** (desenată cu `polygon` și `circle`) și o poziție (`Rect`) creată cu `get_rect()`.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Nava mea” (obligatoriu)
Pornește de la Exemplul 10 și fă nava **a ta**:
1. **desenează-ți propria navă** (alte culori, altă formă) pe o `Surface`;
2. adaugă o tastă **Shift** pentru **turbo** (viteză mai mare);
3. adaugă **trei tipuri de gloanțe** (tastele 1, 2, 3): subțire și rapid, gros și lent, dublu (două gloanțe alăturate);
4. afișează pe ecran **numărul total de focuri**;
5. păstrează stelele care cad și limitarea la marginea ecranului.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
import pygame

nava = pygame.Rect(100, 300, 50, 40)
glont = pygame.Rect(0, 0, 6, 16)
glont.midbottom = nava.midtop
print(glont.bottom)
print(glont.centerx)
glont.y -= 9
print(glont.bottom)
```

### Exercițiul C — Săritura dublă
Modifică Exemplul 7, astfel încât personajul să poată **sări de două ori** (a doua săritură în aer). Indiciu: un contor `sarituri_ramase`.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
import pygame
pygame.init()
ecran = pygame.display.set_mode((600, 400))
x = 100
ruleaza = True
while ruleaza:
    taste = pygame.key.get_pressed
    if taste[pygame.K_LEFT]
        x -= 5
    elif taste[pygame.k_right]:
        x += 5
    pygame.draw.rect(ecran, (255, 0, 0), (x, 100, 50, 50))
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Când folosim `KEYDOWN` și când `get_pressed()`?  
2. Ce face `clamp_ip`?  
3. De ce ștergem gloanțele care ies din ecran?

**Gata când:**
- [ ] Nava ta se mișcă în patru direcții și rămâne în ecran  
- [ ] Are turbo și trei tipuri de gloanțe  
- [ ] Gloanțele care ies din ecran sunt șterse  
- [ ] Ai explicat pe foaie `KEYDOWN` și `get_pressed`  
- [ ] Fișierul se numește `Prenume_Nume_P4_L4.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Fă nava să **se încline** (alte imagini) când merge spre stânga sau dreapta  
- [ ] Adaugă un **al doilea jucător** (cu alte taste) pe același ecran  
- [ ] Fă o **flacără** care apare doar când nava urcă  
- [ ] Adaugă o tastă de **pauză** (`P`) care oprește mișcarea  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `TypeError: 'builtin_function_or_method' object is not subscriptable` | Ai scris `get_pressed` fără paranteze | `pygame.key.get_pressed()` |
| `AttributeError: module 'pygame' has no attribute 'k_right'` | Numele tastei are litere mici | `pygame.K_RIGHT` (litere mari) |
| Personajul se mișcă o singură dată | Ai folosit `KEYDOWN` pentru mers | Folosește `get_pressed()` pentru mișcare continuă |
| Personajul sare de mai multe ori în aer | Lipsește verificarea `pe_pamant` | `if tasta and pe_pamant:` |
| Jocul încetinește după un timp | Gloanțele nu sunt șterse | Păstrează doar gloanțele care sunt încă pe ecran |
| Un glonț nu apare la nava mea | Poziția glonțului nu depinde de navă | `glont.midbottom = nava.midtop` |
| Taste nu merg deloc | Fereastra Pygame nu are focus | Dă click pe fereastră |

---

## Recapitulare pe scurt

- `KEYDOWN` = o singură dată la apăsare; `get_pressed()` = cât timp ții tasta.
- Mișcare lină: `if taste[pygame.K_LEFT]: x -= viteza` (cu `if`-uri separate pentru diagonale).
- `rect.clamp_ip(zona)` ține personajul în ecran.
- Săritura: o viteză în sus la `KEYDOWN`, gravitație la fiecare cadru și `pe_pamant`.
- Gloanțele sunt `Rect`-uri într-o listă; cele care ies din ecran se șterg.
- Pauza între focuri: `pygame.time.get_ticks()` și momentul ultimului foc.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Fă un joc în care **un pătrat roșu** (inamic) coboară de sus, iar tu **tragi în el**, fără să-l lovești încă (coliziunile vin la lecția următoare).  
3. Fă un **labirint pe pătrățele**, cu pereți desenați, în care mergi un pas la o apăsare.  
4. **Bonus:** fă un personaj care **aleargă și sare** peste un obstacol care vine din dreapta.  
5. Salvează totul ca `Tema_P4_L4_Prenume_Nume.py`.

---

## Ce urmează — Lecția 5
**Coliziuni: strângem monede**: aflăm când două obiecte se ating și facem un joc cu monede de strâns.
