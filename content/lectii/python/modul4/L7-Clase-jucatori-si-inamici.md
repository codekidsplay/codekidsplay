# LECȚIA 7 — Clase: jucători și inamici
**Modulul 4 · Jocuri cu Pygame · 2 ore**  
**Code Maker Club · Game Creator**

> Până acum, fiecare lucru din joc era o grămadă de variabile: `jucator_x`, `jucator_y`, `jucator_viteza`... Dacă vrei 10 inamici, ai nevoie de 30 de variabile! Azi învățăm o idee foarte puternică: **clasa**. Este o **rețetă** după care poți face oricâte obiecte vrei: un jucător, o sută de inamici, o mie de monede. La final construim „Arena monedelor”.  
> Proiect: **„Arena monedelor”** · fișier: `Prenume_Nume_P4_L7.py`

---

## Obiectiv
La finalul orei scrii clase cu `__init__`, atribute și metode, creezi mai multe obiecte din aceeași clasă, ții obiecte în liste, folosești `__str__` și o clasă „copil” (moștenire) și construiești un joc cu clase.  
**Minim:** o clasă și două obiecte create din ea.  
**Ținta orei (Complet):** + clase pentru jucător, inamic și monedă, folosite într-un joc.

## De ce contează
Aproape toate jocurile reale sunt scrise cu clase: fiecare personaj, glonț sau obiect este un **obiect** care își **știe singur** poziția, viteza și cum se desenează. Codul devine mai scurt, mai ordonat și ușor de extins.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L6 |
| 10–35 | Prima clasă: atribute și metode (**Exemplele 1–2**) |
| 35–60 | Clase în Pygame, liste de obiecte (**Exemplele 3–5**) |
| 60–80 | `__str__`, clase copil (**Exemplele 6–8**) |
| 80–90 | Moștenire în joc (**Exemplul 9**) |
| 90–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L6

- Funcția `scrie` are parametri cu valori implicite.
- Starea jocului ne spune ce se întâmplă acum.
- Un dicționar poate păstra mai multe informații despre același lucru.

**Încearcă tu (3 min)**  
- [ ] Creează un dicționar `caine` cu cheile `nume` și `varsta`, apoi afișează-le  

---

## 2. Prima clasă

### Exemplul 1 — Clasa `Caine`

```python
class Caine:
    def __init__(self, nume, varsta):
        self.nume = nume
        self.varsta = varsta

    def latra(self):
        print(self.nume + " spune: Ham!")

    def descrie(self):
        print(self.nume, "are", self.varsta, "ani")

rex = Caine("Rex", 3)
bela = Caine("Bela", 5)

rex.latra()
bela.descrie()
print(rex.nume)
rex.varsta += 1
rex.descrie()
```

**Ieșire:**
```text
Rex spune: Ham!
Bela are 5 ani
Rex
Rex are 4 ani
```

Să înțelegem piesele:
- `class Caine:` definește **rețeta** (clasa). Numele clasei începe, de obicei, cu **literă mare**;
- `__init__` este metoda care rulează **automat** când creezi un obiect. Numele are **două liniuțe jos** (`_`) înainte și după;
- `self` înseamnă „**obiectul acesta**”. `self.nume = nume` salvează numele în obiect;
- `latra` și `descrie` sunt **metode**: funcții care aparțin clasei;
- `rex = Caine("Rex", 3)` creează un **obiect** (o „instanță”). `rex` și `bela` sunt două obiecte diferite, făcute după aceeași rețetă, fiecare cu datele lui.

### Exemplul 2 — Metode care schimbă obiectul

```python
class Jucator:
    def __init__(self, nume):
        self.nume = nume
        self.vieti = 3
        self.scor = 0

    def ia_moneda(self, valoare=1):
        self.scor += valoare

    def pierde_viata(self):
        if self.vieti > 0:
            self.vieti -= 1

    def este_viu(self):
        return self.vieti > 0

    def afiseaza(self):
        print(f"{self.nume}: scor {self.scor}, vieti {self.vieti}")

ana = Jucator("Ana")
ana.ia_moneda()
ana.ia_moneda(5)
ana.afiseaza()

for i in range(3):
    ana.pierde_viata()
ana.afiseaza()
print(ana.este_viu())

ana.pierde_viata()
ana.afiseaza()
```

**Ieșire:**
```text
Ana: scor 6, vieti 3
Ana: scor 6, vieti 0
False
Ana: scor 6, vieti 0
```

Valorile de pornire ale jucătorului (3 vieți, scor 0) sunt puse **în `__init__`**, nu cerute la creare. Metodele `ia_moneda` și `pierde_viata` **schimbă** obiectul. `este_viu` **întoarce** `True` sau `False`. Observă: la ultima apelare, viețile rămân 0, nu devin −1, pentru că metoda verifică întâi `if self.vieti > 0`.

---

## 3. Clase în Pygame

### Exemplul 3 — Jucătorul ca obiect

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Jucator")
ceas = pygame.time.Clock()

class Jucator:
    def __init__(self, x, y, culoare):
        self.rect = pygame.Rect(x, y, 40, 40)
        self.viteza = 5
        self.culoare = culoare

    def muta(self, taste):
        if taste[pygame.K_LEFT]:
            self.rect.x -= self.viteza
        if taste[pygame.K_RIGHT]:
            self.rect.x += self.viteza
        if taste[pygame.K_UP]:
            self.rect.y -= self.viteza
        if taste[pygame.K_DOWN]:
            self.rect.y += self.viteza
        self.rect.clamp_ip(ecran.get_rect())

    def deseneaza(self):
        pygame.draw.rect(ecran, self.culoare, self.rect, border_radius=6)

jucator = Jucator(280, 180, (0, 200, 120))
print(jucator.rect, jucator.viteza)

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    jucator.muta(pygame.key.get_pressed())

    ecran.fill((30, 30, 60))
    jucator.deseneaza()
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
<rect(280, 180, 40, 40)> 5
```

**Ce vezi pe ecran:** un **pătrat verde** pe fundal albastru închis, în mijloc. Cu **săgețile** îl miști, iar el **nu iese din ecran**.

Toată „viața” jucătorului stă acum în clasă: **poziția**, **viteza**, **culoarea**, cum se **mișcă** și cum se **desenează**. Bucla jocului este foarte scurtă: `jucator.muta(...)` și `jucator.deseneaza()`.

### Exemplul 4 — Liste de monede

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Monede")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 36)

class Moneda:
    def __init__(self, x, y):
        self.rect = pygame.Rect(x - 12, y - 12, 24, 24)

    def deseneaza(self):
        pygame.draw.circle(ecran, (255, 200, 0), self.rect.center, 12)
        pygame.draw.circle(ecran, (200, 140, 0), self.rect.center, 12, 2)

pozitii = [(80, 80), (200, 150), (320, 90), (450, 200), (520, 70), (120, 300), (300, 320), (500, 330)]
monede = []
for poz in pozitii:
    monede.append(Moneda(poz[0], poz[1]))
print("Monede:", len(monede))

jucator = pygame.Rect(280, 180, 36, 36)
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
    jucator.clamp_ip(ecran.get_rect())

    ramase = []
    for m in monede:
        if jucator.colliderect(m.rect):
            scor += 1
        else:
            ramase.append(m)
    monede = ramase

    ecran.fill((20, 60, 40))
    for m in monede:
        m.deseneaza()
    pygame.draw.rect(ecran, (60, 160, 255), jucator, border_radius=6)
    text = font.render("Scor: " + str(scor) + "/8", True, (255, 255, 255))
    ecran.blit(text, (10, 10))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
Monede: 8
```

**Ce vezi pe ecran:** fundal verde închis, **opt monede aurii** și un **pătrat albastru** pe care îl miști cu săgețile. Când atingi o monedă, ea dispare, iar scorul crește (**„Scor: 3/8”**).

Opt monede, o singură clasă: creăm obiectele într-o **buclă** și le punem într-o **listă**. Pentru fiecare, același cod: `m.rect`, `m.deseneaza()`. Dacă mâine vrei 80 de monede, schimbi doar lista cu pozițiile!

### Exemplul 5 — Inamici care sar de pereți

```python
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Inamici")
ceas = pygame.time.Clock()

class Inamic:
    def __init__(self, x, y, dx, dy):
        self.rect = pygame.Rect(x, y, 40, 40)
        self.dx = dx
        self.dy = dy

    def muta(self):
        self.rect.x += self.dx
        self.rect.y += self.dy
        if self.rect.left < 0:
            self.rect.left = 0
            self.dx = abs(self.dx)
        if self.rect.right > LATIME:
            self.rect.right = LATIME
            self.dx = -abs(self.dx)
        if self.rect.top < 0:
            self.rect.top = 0
            self.dy = abs(self.dy)
        if self.rect.bottom > INALTIME:
            self.rect.bottom = INALTIME
            self.dy = -abs(self.dy)

    def deseneaza(self):
        pygame.draw.rect(ecran, (220, 50, 50), self.rect, border_radius=10)
        pygame.draw.circle(ecran, (255, 255, 255), (self.rect.x + 12, self.rect.y + 15), 6)
        pygame.draw.circle(ecran, (255, 255, 255), (self.rect.x + 28, self.rect.y + 15), 6)

test = Inamic(570, 100, 5, 0)
test.muta()
print("x =", test.rect.x, ", dx =", test.dx)

inamici = []
for i in range(5):
    inamici.append(Inamic(random.randint(0, 500), random.randint(0, 300),
                          random.choice([-4, -3, 3, 4]), random.choice([-4, -3, 3, 4])))
print("Inamici:", len(inamici))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    for i in inamici:
        i.muta()

    ecran.fill((30, 30, 60))
    for i in inamici:
        i.deseneaza()
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
x = 560 , dx = -5
Inamici: 5
```

**Ce vezi pe ecran:** **cinci inamici roșii** cu câte doi ochi albi, care se plimbă prin ecran și **se întorc** când ating marginile. Fiecare merge în alt loc, cu altă viteză.

Primele două `print`-uri sunt teste: inamicul de la marginea dreaptă este **împins înapoi** exact în ecran (`x = 560`, pentru că lățimea lui este 40) și își schimbă direcția (`dx` devine −5). Fără linia `self.rect.right = LATIME`, un inamic poate „rămâne lipit” de margine!

---

## 4. Mai multe despre clase

### Exemplul 6 — Picăturile de ploaie

```python
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Ploaie")
ceas = pygame.time.Clock()

class Picatura:
    def __init__(self, x, y, viteza):
        self.rect = pygame.Rect(x, y, 4, 14)
        self.viteza = viteza

    def cade(self):
        self.rect.y += self.viteza

    def a_iesit(self):
        return self.rect.top >= INALTIME

    def deseneaza(self):
        pygame.draw.rect(ecran, (120, 180, 255), self.rect)

test = Picatura(10, 390, 5)
test.cade()
print(test.rect.y, test.a_iesit())
test.cade()
print(test.rect.y, test.a_iesit())

picaturi = []
ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    for i in range(3):
        picaturi.append(Picatura(random.randint(0, LATIME), -14, random.randint(5, 10)))

    for p in picaturi:
        p.cade()
    picaturi = [p for p in picaturi if not p.a_iesit()]

    ecran.fill((40, 40, 70))
    for p in picaturi:
        p.deseneaza()
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
395 False
400 True
```

**Ce vezi pe ecran:** pe fundal gri-albăstrui, **sute de picături albastre** care cad cu viteze diferite, ca într-o ploaie. Când ajung jos, dispar, deci programul nu se încetinește.

Linia `picaturi = [p for p in picaturi if not p.a_iesit()]` este o formă **scurtă** a buclei cu lista `ramase`: „păstrează în listă doar picăturile care nu au ieșit”. Poți folosi oricare dintre cele două variante.

### Exemplul 7 — Afișarea unui obiect cu `__str__`

```python
class Inamic:
    numar = 0

    def __init__(self, nume, vieti):
        self.nume = nume
        self.vieti = vieti
        Inamic.numar += 1

    def __str__(self):
        return f"{self.nume} ({self.vieti} vieti)"

a = Inamic("Zombi", 3)
b = Inamic("Dragon", 10)
print(a)
print(b)
print("Inamici creati:", Inamic.numar)

lista = [a, b]
for i in lista:
    print("-", i)
```

**Ieșire:**
```text
Zombi (3 vieti)
Dragon (10 vieti)
Inamici creati: 2
- Zombi (3 vieti)
- Dragon (10 vieti)
```

- Metoda **`__str__`** spune cum arată obiectul când îl afișezi cu `print`. Fără ea, ai vedea ceva neinteligibil, de genul `<__main__.Inamic object at 0x...>`;
- `numar = 0`, scris **direct în clasă** (nu în `__init__`), este un **atribut al clasei**: este **comun** tuturor obiectelor. Aici numără câți inamici au fost creați. Îl citim cu `Inamic.numar`.

### Exemplul 8 — Clase „copil” (moștenire)

```python
class Personaj:
    def __init__(self, nume, vieti):
        self.nume = nume
        self.vieti = vieti

    def se_prezinta(self):
        print("Sunt", self.nume, "si am", self.vieti, "vieti")

    def primeste_lovitura(self, forta):
        self.vieti -= forta
        if self.vieti < 0:
            self.vieti = 0

class Vrajitor(Personaj):
    def __init__(self, nume):
        super().__init__(nume, 8)
        self.mana = 3

    def arunca_vraja(self):
        if self.mana > 0:
            self.mana -= 1
            print(self.nume, "arunca o vraja! Mana ramasa:", self.mana)
        else:
            print(self.nume, "nu mai are mana!")

class Razboinic(Personaj):
    def __init__(self, nume):
        super().__init__(nume, 15)

    def se_prezinta(self):
        super().se_prezinta()
        print("Sunt un razboinic puternic!")

merlin = Vrajitor("Merlin")
conan = Razboinic("Conan")

merlin.se_prezinta()
conan.se_prezinta()

merlin.primeste_lovitura(3)
merlin.se_prezinta()
conan.primeste_lovitura(100)
print("Conan are", conan.vieti, "vieti")

for i in range(4):
    merlin.arunca_vraja()
```

**Ieșire:**
```text
Sunt Merlin si am 8 vieti
Sunt Conan si am 15 vieti
Sunt un razboinic puternic!
Sunt Merlin si am 5 vieti
Conan are 0 vieti
Merlin arunca o vraja! Mana ramasa: 2
Merlin arunca o vraja! Mana ramasa: 1
Merlin arunca o vraja! Mana ramasa: 0
Merlin nu mai are mana!
```

`class Vrajitor(Personaj)` înseamnă: „Vrăjitorul este un **Personaj**”, adică **moștenește** tot ce are Personajul (`nume`, `vieti`, `primeste_lovitura`) și poate adăuga lucruri noi (`mana`, `arunca_vraja`).
- `super().__init__(nume, 8)` apelează `__init__` din clasa **părinte**, ca să nu rescriem codul;
- Clasa `Razboinic` **înlocuiește** metoda `se_prezinta` (se numește **suprascriere**), dar folosește și varianta părintelui prin `super()`.

### Exemplul 9 — Moștenire în joc

```python
import random
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Mostenire")
ceas = pygame.time.Clock()

class Obiect:
    def __init__(self, x, y, latime, inaltime, culoare):
        self.rect = pygame.Rect(x, y, latime, inaltime)
        self.culoare = culoare

    def deseneaza(self):
        pygame.draw.rect(ecran, self.culoare, self.rect, border_radius=8)

class Inamic(Obiect):
    def __init__(self, x, y, dx, dy):
        super().__init__(x, y, 36, 36, (220, 50, 50))
        self.dx = dx
        self.dy = dy

    def muta(self):
        self.rect.x += self.dx
        self.rect.y += self.dy
        if self.rect.left < 0 or self.rect.right > LATIME:
            self.dx = -self.dx
        if self.rect.top < 0 or self.rect.bottom > INALTIME:
            self.dy = -self.dy

class Bonus(Obiect):
    def __init__(self, x, y):
        super().__init__(x, y, 24, 24, (255, 215, 0))
        self.timp = 0

    def pulseaza(self):
        self.timp += 1
        if self.timp % 30 < 15:
            self.culoare = (255, 215, 0)
        else:
            self.culoare = (255, 255, 160)

inamic = Inamic(100, 100, 3, 2)
bonus = Bonus(300, 200)
print(isinstance(inamic, Inamic), isinstance(inamic, Obiect), isinstance(bonus, Inamic))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    inamic.muta()
    bonus.pulseaza()

    ecran.fill((30, 30, 60))
    inamic.deseneaza()
    bonus.deseneaza()
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
True True False
```

**Ce vezi pe ecran:** un **pătrat roșu** care se plimbă și ricoșează, și un **pătrat auriu** care stă pe loc și **pâlpâie** (alternează între galben și galben deschis, de două ori pe secundă).

Clasa de bază `Obiect` ține ce au toate obiectele în comun (poziția, culoarea, `deseneaza`). `Inamic` și `Bonus` o **moștenesc** și adaugă fiecare ce-i trebuie. `isinstance(obiect, Clasa)` verifică dacă un obiect este făcut dintr-o clasă (sau din „copilul” ei): primul `print` arată `True True False`.

---

## 5. Mini-proiect

### Exemplul 10 — „Arena monedelor”

```python
import math
import random
import pygame

pygame.init()
LATIME = 700
INALTIME = 500
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Arena monedelor")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 32)
font_mare = pygame.font.Font(None, 72)

class Jucator:
    def __init__(self):
        self.rect = pygame.Rect(0, 0, 36, 36)
        self.viteza = 6
        self.reseteaza()

    def reseteaza(self):
        self.rect.center = (LATIME // 2, INALTIME // 2)
        self.vieti = 3
        self.scor = 0
        self.imun_pana = 0

    def este_imun(self):
        return pygame.time.get_ticks() < self.imun_pana

    def loveste(self):
        if not self.este_imun():
            self.vieti -= 1
            self.imun_pana = pygame.time.get_ticks() + 1500

    def muta(self, taste):
        if taste[pygame.K_LEFT] or taste[pygame.K_a]:
            self.rect.x -= self.viteza
        if taste[pygame.K_RIGHT] or taste[pygame.K_d]:
            self.rect.x += self.viteza
        if taste[pygame.K_UP] or taste[pygame.K_w]:
            self.rect.y -= self.viteza
        if taste[pygame.K_DOWN] or taste[pygame.K_s]:
            self.rect.y += self.viteza
        self.rect.clamp_ip(ecran.get_rect())

    def deseneaza(self):
        if self.este_imun():
            culoare = (255, 255, 255)
        else:
            culoare = (60, 200, 90)
        pygame.draw.rect(ecran, culoare, self.rect, border_radius=8)

class Inamic:
    def __init__(self, x, y):
        self.rect = pygame.Rect(x, y, 34, 34)
        self.dx = random.choice([-4, -3, 3, 4])
        self.dy = random.choice([-4, -3, 3, 4])

    def muta(self):
        self.rect.x += self.dx
        self.rect.y += self.dy
        if self.rect.left < 0:
            self.rect.left = 0
            self.dx = abs(self.dx)
        if self.rect.right > LATIME:
            self.rect.right = LATIME
            self.dx = -abs(self.dx)
        if self.rect.top < 0:
            self.rect.top = 0
            self.dy = abs(self.dy)
        if self.rect.bottom > INALTIME:
            self.rect.bottom = INALTIME
            self.dy = -abs(self.dy)

    def deseneaza(self):
        pygame.draw.rect(ecran, (220, 50, 50), self.rect, border_radius=10)
        pygame.draw.circle(ecran, (255, 255, 255), (self.rect.x + 11, self.rect.y + 14), 5)
        pygame.draw.circle(ecran, (255, 255, 255), (self.rect.x + 23, self.rect.y + 14), 5)

class Moneda:
    def __init__(self):
        self.rect = pygame.Rect(0, 0, 22, 22)
        self.muta_aleator()

    def muta_aleator(self):
        self.rect.x = random.randint(20, LATIME - 42)
        self.rect.y = random.randint(60, INALTIME - 42)

    def deseneaza(self):
        pygame.draw.circle(ecran, (255, 200, 0), self.rect.center, 11)
        pygame.draw.circle(ecran, (200, 140, 0), self.rect.center, 11, 2)

jucator = Jucator()
moneda = Moneda()
inamici = []
record = 0
final = False

def inamic_nou():
    while True:
        i = Inamic(random.randint(0, LATIME - 34), random.randint(0, INALTIME - 34))
        distanta = math.hypot(i.rect.centerx - jucator.rect.centerx, i.rect.centery - jucator.rect.centery)
        if distanta > 150:
            return i

def joc_nou():
    global final
    jucator.reseteaza()
    moneda.muta_aleator()
    inamici.clear()
    inamici.append(inamic_nou())
    final = False

joc_nou()

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_ESCAPE:
                ruleaza = False
            if eveniment.key == pygame.K_r and final:
                joc_nou()

    if not final:
        jucator.muta(pygame.key.get_pressed())
        for i in inamici:
            i.muta()
            if i.rect.colliderect(jucator.rect):
                jucator.loveste()
        if jucator.rect.colliderect(moneda.rect):
            jucator.scor += 1
            moneda.muta_aleator()
            if jucator.scor % 5 == 0:
                inamici.append(inamic_nou())
        if jucator.vieti <= 0:
            final = True
            if jucator.scor > record:
                record = jucator.scor

    ecran.fill((25, 35, 60))
    moneda.deseneaza()
    for i in inamici:
        i.deseneaza()
    jucator.deseneaza()

    ecran.blit(font.render("Scor: " + str(jucator.scor), True, (255, 255, 255)), (10, 10))
    ecran.blit(font.render("Vieti: " + str(jucator.vieti), True, (255, 120, 120)), (10, 40))
    ecran.blit(font.render("Inamici: " + str(len(inamici)), True, (200, 200, 200)), (LATIME - 130, 10))
    ecran.blit(font.render("Record: " + str(record), True, (255, 220, 0)), (LATIME - 130, 40))

    if final:
        text = font_mare.render("GAME OVER", True, (255, 90, 90))
        ecran.blit(text, (LATIME // 2 - text.get_width() // 2, 190))
        text2 = font.render("Apasa R pentru joc nou", True, (255, 255, 255))
        ecran.blit(text2, (LATIME // 2 - text2.get_width() // 2, 270))

    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** jocul începe cu **un inamic roșu** (departe de tine), o **monedă aurie** și **pătratul tău verde** în mijloc. Cu **săgețile** sau **W A S D** strângi moneda; fiecare monedă prinsă îți dă **un punct** și moneda **reapare în alt loc**. La fiecare **5 puncte** apare **un inamic nou**. Dacă un inamic te atinge, pierzi o **viață** și devii **alb** pentru o secundă și jumătate (nu poți fi lovit). Cu 0 vieți apare **„GAME OVER”**; apeși **R** și jocul începe din nou, iar recordul se păstrează. Sus, în stânga, vezi **scorul** și **viețile**; sus, în dreapta, **inamicii** și **recordul**.

Codul principal este foarte scurt, pentru că **fiecare clasă își știe singură treaba**: `Jucator` se mișcă și primește lovituri, `Inamic` ricoșează, `Moneda` apare în alt loc. Funcția `inamic_nou` alege un loc **la peste 150 de pixeli** de jucător, ca să nu fii lovit imediat.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Arena monedelor” (obligatoriu)
Pornește de la Exemplul 10 și fă jocul **al tău**:
1. schimbă **tema** (alt jucător, alți inamici, altă monedă, alt fundal);
2. adaugă o clasă nouă, **`Bonus`**: un obiect care apare din când în când și, dacă îl prinzi, îți dă o **viață în plus** (maximum 5);
3. fă ca un tip de inamic (clasă copil) să fie **mai rapid**;
4. adaugă un **ecran de meniu** înainte de joc;
5. păstrează `Jucator`, `Inamic` și `Moneda` ca **clase**.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
class Cutie:
    def __init__(self, continut):
        self.continut = continut

    def deschide(self):
        return "In cutie: " + self.continut

a = Cutie("o carte")
b = Cutie("o minge")
b.continut = "un joc"
print(a.deschide())
print(b.deschide())
```

### Exercițiul C — Clasa `Animal`
Scrie o clasă `Animal` cu `nume` și metoda `vorbeste()`. Fă clasele `Pisica` și `Caine` care moștenesc din `Animal` și **suprascriu** `vorbeste()` (de exemplu „Miau!” și „Ham!”). Creează câte un obiect din fiecare și pune-le într-o listă. Cu o buclă `for`, fă-le să vorbească.

### Exercițiul D — Găsește greșelile
Programul are 3 greșeli. Rescrie-l corect:

```text
class Caine:
    def __init__(nume, varsta):
        self.nume = nume
        self.varsta = varsta
    def latra():
        print("Ham!")
rex = Caine("Rex", 3)
rex.latra()
print(rex.Nume)
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce este o clasă și ce este un obiect? (folosește exemplul rețetei)  
2. Ce înseamnă `self`?  
3. Ce înseamnă că o clasă „moștenește” altă clasă?

**Gata când:**
- [ ] Jocul are clasele `Jucator`, `Inamic` și `Moneda`  
- [ ] Ai adăugat clasa `Bonus` și un inamic mai rapid  
- [ ] Ai un meniu înainte de joc  
- [ ] Ai explicat pe foaie ce sunt clasa și obiectul  
- [ ] Fișierul se numește `Prenume_Nume_P4_L7.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă o clasă `Glont`: jucătorul trage cu **SPAȚIU** în sus și distruge inamicii  
- [ ] Fă ca inamicii să **urmărească** jucătorul (își schimbă `dx` și `dy` după poziția lui)  
- [ ] Fă o clasă `Nivel` care păstrează numărul de inamici și viteza  
- [ ] Adaugă metoda `__str__` la `Jucator` și afișează-l în consolă  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `TypeError: __init__() takes 2 positional arguments but 3 were given` | Ai uitat `self` în `__init__` | `def __init__(self, nume, varsta):` |
| `TypeError: latra() takes 0 positional arguments but 1 was given` | Metoda nu are `self` | `def latra(self):` |
| `NameError: name 'nume' is not defined` | Ai scris `nume` în loc de `self.nume` într-o metodă | `print(self.nume)` |
| `AttributeError: 'Caine' object has no attribute 'Nume'` | Literă mare/mică diferită | `rex.nume` |
| `TypeError: __init__() missing 1 required positional argument: 'varsta'` | Ai creat obiectul fără toate valorile | `Caine("Rex", 3)` |
| Toți inamicii se mișcă la fel | Ai folosit aceeași valoare pentru toți | Dă fiecărui obiect valori diferite |
| Obiectul nu apare | Ai uitat să-l pui în listă sau să apelezi `deseneaza()` | `lista.append(obiect)` și `for o in lista: o.deseneaza()` |

---

## Recapitulare pe scurt

- **Clasa** este rețeta, **obiectul** este lucrul făcut după ea.
- `__init__` rulează la crearea obiectului, iar `self` este „obiectul acesta”.
- Metodele sunt funcții în clasă; atributele sunt datele obiectului.
- Obiectele se păstrează în **liste** și se parcurg cu `for`.
- `__str__` spune cum se afișează un obiect.
- O clasă „copil” **moștenește** de la o clasă „părinte” și folosește `super()`.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Adaugă în „Arena monedelor” un tip nou de inamic (de exemplu **vânătorul**, care urmărește jucătorul).  
3. Fă o clasă `Buton` pentru meniu (cu text, culoare și metoda `este_apasat(pozitie)`).  
4. **Bonus:** fă un joc cu **obiecte care cad** (clase `Stea` și `Piatra` care moștenesc din `Obiect`).  
5. Salvează totul ca `Tema_P4_L7_Prenume_Nume.py`.

---

## Ce urmează — Lecția 8
**Fișiere și try/except**: învățăm să **salvăm recordul într-un fișier**, ca să rămână și după ce închizi jocul.
