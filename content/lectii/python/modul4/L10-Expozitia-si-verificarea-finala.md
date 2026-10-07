# LECȚIA 10 — Expoziția + verificare finală
**Modulul 4 · Jocuri cu Pygame · 2 ore**  
**Code Maker Club · Game Creator**

> Ultima lecție din cursul de Python! Azi dăm jocului tău **ultimele retușuri** (ecran de reguli, credite, tranziții, captură de ecran), apoi organizăm **Expoziția de jocuri**: prezinți ce ai făcut și joci jocurile colegilor. La final facem **testul final** și recapitulăm drumul parcurs: de la primul `print` până la un joc complet.  
> Proiect: **„Expoziția”** · fișier: `Prenume_Nume_P4_L10.py`

---

## Obiectiv
La finalul orei ai un joc **finisat** (cu ecran de reguli, credite și tranziții), l-ai prezentat colegilor, ai primit și ai dat păreri, ai rezolvat testul final al modulului și al cursului.  
**Minim:** jocul tău funcționează și îl prezinți în 2 minute.  
**Ținta orei (Complet):** + ecran de reguli, credite, captură de ecran, setări salvate, prezentare și feedback pentru colegi.

## De ce contează
Un joc bun este **terminat și arătat altora**. Când îl prezinți, înveți să explici ce ai făcut, să asculți păreri și să îți îmbunătățești munca. Exact așa lucrează și programatorii adevărați.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare și pregătirea expoziției |
| 10–40 | Retușuri: reguli, fade, captură, FPS, credite, setări (**Exemplele 1–9**) |
| 40–55 | Cadrul expoziției, aplicat jocului tău (**Exemplul 10**) |
| 55–95 | **Expoziția**: prezentări și joc între colegi, cu fișe de feedback |
| 95–115 | **Verificare finală** (Modulul 4 și cursul) |
| 115–120 | Recapitulare, diplome și mulțumiri |

---

## 1. Recapitulare rapidă din L9

- Un joc se construiește din piese: clase, funcții, un dicționar de stare.
- Parcurgem o **copie** a listei când scoatem elemente din ea.
- Recordul se salvează într-un fișier, cu `try / except`.

**Încearcă tu (3 min)**  
- [ ] Scrie, pe foaie, în trei propoziții, **despre ce este jocul tău**  

---

## 2. Retușurile care fac diferența

### Exemplul 1 — Ecran de reguli

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Reguli")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 34)
font_mare = pygame.font.Font(None, 64)

REGULI = [
    "Misca nava cu stanga si dreapta",
    "Apasa SPATIU ca sa tragi",
    "Evita meteoritii",
    "Prinde bilele albastre pentru scut",
]

arata_reguli = False

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN and eveniment.key == pygame.K_r:
            arata_reguli = not arata_reguli

    ecran.fill((20, 20, 60))
    if arata_reguli:
        titlu = font_mare.render("REGULI", True, (255, 220, 0))
        ecran.blit(titlu, (LATIME // 2 - titlu.get_width() // 2, 30))
        y = 120
        numar = 1
        for linie in REGULI:
            ecran.blit(font.render(str(numar) + ". " + linie, True, (255, 255, 255)), (60, y))
            y += 45
            numar += 1
    else:
        ecran.blit(font.render("Apasa R pentru reguli", True, (200, 200, 200)), (180, 180))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal albastru închis, textul „Apasa R pentru reguli”. Când apeși **R**, apare titlul **„REGULI”** (galben) și, dedesubt, **patru reguli numerotate**. Apăsând din nou **R**, revii la prima imagine.

Regulile stau într-o **listă** de texte, iar o buclă le scrie pe rând, câte unul sub altul (`y += 45`). Când vrei să schimbi o regulă, modifici lista, nu desenul. Un jucător care nu știe regulile nu se va distra: **fiecare joc are nevoie de un ecran de reguli**.

### Exemplul 2 — Tranziție cu fade

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Fade")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 60)

def fade_out(viteza=15):
    copie = ecran.copy()
    negru = pygame.Surface((LATIME, INALTIME))
    negru.fill((0, 0, 0))
    for alfa in range(0, 256, viteza):
        negru.set_alpha(alfa)
        ecran.blit(copie, (0, 0))
        ecran.blit(negru, (0, 0))
        pygame.display.flip()
        ceas.tick(60)

print("Pasi de fade:", len(range(0, 256, 15)))

scene = [("SCENA ALBASTRA", (30, 60, 160)), ("SCENA VERDE", (30, 140, 70))]
curenta = 0

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN and eveniment.key == pygame.K_SPACE:
            fade_out()
            curenta = 1 - curenta

    nume, culoare = scene[curenta]
    ecran.fill(culoare)
    text = font.render(nume, True, (255, 255, 255))
    ecran.blit(text, (LATIME // 2 - text.get_width() // 2, 160))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
Pasi de fade: 18
```

**Ce vezi pe ecran:** o scenă **albastră** cu textul „SCENA ALBASTRA”. La **SPAȚIU**, ecranul se **întunecă încet** până la negru, apoi apare scena **verde**. Încă un SPAȚIU și te întorci la albastru.

Funcția `fade_out` copiază imaginea curentă, apoi pune peste ea un strat **negru tot mai opac**: `set_alpha(alfa)` merge de la 0 (transparent) la 255 (negru complet). `range(0, 256, 15)` face 18 pași, deci tranziția durează aproape o secundă. Expresia `1 - curenta` schimbă 0 în 1 și 1 în 0, un truc simplu pentru două variante.

### Exemplul 3 — Captură de ecran

```python
import time
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Captura")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 34)

def nume_captura(moment=None):
    if moment is None:
        moment = time.localtime()
    return "captura_" + time.strftime("%Y%m%d_%H%M%S", moment) + ".png"

print(nume_captura(time.gmtime(0)))

mesaj = ""
mesaj_pana = 0
x = 0

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN and eveniment.key == pygame.K_F12:
            fisier = nume_captura()
            pygame.image.save(ecran, fisier)
            mesaj = "Salvat: " + fisier
            mesaj_pana = pygame.time.get_ticks() + 2000

    x = (x + 4) % LATIME
    ecran.fill((20, 20, 60))
    pygame.draw.circle(ecran, (255, 200, 0), (x, 200), 30)
    if pygame.time.get_ticks() < mesaj_pana:
        ecran.blit(font.render(mesaj, True, (120, 255, 120)), (20, 20))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
captura_19700101_000000.png
```

**Ce vezi pe ecran:** o **minge galbenă** care traversează ecranul. Când apeși **F12**, imaginea curentă se **salvează** ca fișier `.png` în folderul programului, iar sus apare pentru 2 secunde mesajul verde **„Salvat: captura_…png”**.

Numele conține data și ora (`strftime` le scrie sub forma `AnLunaZi_OraMinutSecunda`), ca să nu suprascrii niciodată o captură veche. Testul de la început folosește momentul `gmtime(0)` (1 ianuarie 1970), ca să vedem cum arată un nume. Capturile de ecran sunt ideale pentru **prezentare** și pentru **portofoliul** tău.

### Exemplul 4 — Contor FPS (pentru depanare)

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("FPS")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 30)

x = 50
dx = 5
arata_fps = False

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN and eveniment.key == pygame.K_F3:
            arata_fps = not arata_fps

    x += dx
    if x < 20 or x > LATIME - 20:
        dx = -dx

    ecran.fill((25, 25, 55))
    pygame.draw.circle(ecran, (255, 120, 80), (x, 200), 20)
    if arata_fps:
        ecran.blit(font.render("FPS: " + str(int(ceas.get_fps())), True, (255, 255, 0)), (10, 10))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** o **minge portocalie** care merge stânga-dreapta. La **F3**, sus apare **„FPS: 60”** (în galben); la un nou F3, dispare. Dacă numărul scade mult sub 60, jocul tău este **prea încărcat** (prea multe obiecte desenate sau calcule greoaie).

`ceas.get_fps()` ne spune **câte cadre pe secundă** reușește jocul. Un contor ascuns, pornit cu o tastă, este o unealtă de programator: îl folosești tu, nu jucătorul.

### Exemplul 5 — Credite care urcă

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 400
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Credite")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 36)
font_mare = pygame.font.Font(None, 60)

CREDITE = ["JOCUL MEU", "", "Creat de", "Prenume Nume", "", "Facut cu Python si Pygame", "", "Multumesc ca ai jucat!"]
PAS = 45

y_start = INALTIME

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    y_start -= 1.5
    if y_start + PAS * len(CREDITE) < 0:
        y_start = INALTIME

    ecran.fill((10, 10, 30))
    y = y_start
    for linie in CREDITE:
        if linie == CREDITE[0]:
            fnt = font_mare
            culoare = (255, 220, 0)
        else:
            fnt = font
            culoare = (230, 230, 230)
        imagine = fnt.render(linie, True, culoare)
        ecran.blit(imagine, (LATIME // 2 - imagine.get_width() // 2, y))
        y += PAS
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal foarte închis, un text care **urcă încet**, ca la finalul unui film: titlul **„JOCUL MEU”** mare și galben, apoi **„Creat de”**, numele tău, „Facut cu Python si Pygame” și mesajul de mulțumire. Când ultimul rând iese pe sus, creditele **pornesc din nou** de jos.

Textul este o **listă**, iar `y_start` scade cu 1,5 pixeli la fiecare cadru. Când `y_start + 45 * len(CREDITE)` devine negativ, toate rândurile au trecut de marginea de sus și reluăm. Pune **numele tău** în credite: este jocul tău!

### Exemplul 6 — „Record nou!” care clipește

```python
import pygame

pygame.init()
LATIME = 600
INALTIME = 300
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Clipire")
ceas = pygame.time.Clock()
font_mare = pygame.font.Font(None, 80)
font = pygame.font.Font(None, 36)

def clipeste(ms, perioada=400):
    return (ms // perioada) % 2 == 0

print(clipeste(0), clipeste(399), clipeste(400), clipeste(799), clipeste(800))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((20, 20, 60))
    if clipeste(pygame.time.get_ticks()):
        text = font_mare.render("RECORD NOU!", True, (255, 220, 0))
        ecran.blit(text, (LATIME // 2 - text.get_width() // 2, 90))
    ecran.blit(font.render("Scor: 100", True, (255, 255, 255)), (250, 190))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ieșire:**
```text
True True False False True
```

**Ce vezi pe ecran:** pe fundal albastru închis, scrisul galben **„RECORD NOU!”** care **apare și dispare** de aproximativ două ori pe secundă, iar dedesubt, fix, „Scor: 100”.

Funcția `clipeste` împarte timpul la `perioada` (400 ms) și verifică dacă rezultatul este **par**: prima 400 ms `True`, următoarele 400 ms `False`, și tot așa. Folosește-o pentru orice element care trebuie să **atragă atenția**.

### Exemplul 7 — Setări salvate

```python
import json
import os

IMPLICIT = {"muzica": True, "culoare": "albastru", "dificultate": 2}
FISIER = "setari_test.json"

def incarca_setari(fisier):
    setari = dict(IMPLICIT)
    try:
        with open(fisier, "r") as f:
            setari.update(json.load(f))
    except (FileNotFoundError, json.JSONDecodeError):
        pass
    return setari

if os.path.exists(FISIER):
    os.remove(FISIER)

print("Fara fisier:", incarca_setari(FISIER))

with open(FISIER, "w") as f:
    json.dump({"culoare": "rosu"}, f)
print("Cu o setare:", incarca_setari(FISIER))

with open(FISIER, "w") as f:
    f.write("{asta nu e json")
print("Fisier stricat:", incarca_setari(FISIER))

print("Valorile implicite au ramas:", IMPLICIT)
```

**Ieșire:**
```text
Fara fisier: {'muzica': True, 'culoare': 'albastru', 'dificultate': 2}
Cu o setare: {'muzica': True, 'culoare': 'rosu', 'dificultate': 2}
Fisier stricat: {'muzica': True, 'culoare': 'albastru', 'dificultate': 2}
Valorile implicite au ramas: {'muzica': True, 'culoare': 'albastru', 'dificultate': 2}
```

Funcția pornește de la **valorile implicite**, apoi citește fișierul și **suprascrie** doar ce găsește acolo (`update`). Astfel, dacă fișierul lipsește, e stricat sau conține doar o parte din setări, jocul **merge oricum**. `dict(IMPLICIT)` face o **copie**: fără ea, am modifica chiar dicționarul original.

### Exemplul 8 — Fișa jocului

```python
fisa = {
    "titlu": "Aparatorii galaxiei",
    "autor": "Prenume Nume",
    "tip": "Shooter spatial",
    "controale": ["Stanga/Dreapta: misca nava", "Spatiu: trage", "P: pauza"],
    "ideea": "Aperi galaxia de meteoriti",
}

def afiseaza_fisa(f):
    print("=" * 32)
    print(f["titlu"].upper())
    print("de", f["autor"])
    print("-" * 32)
    print("Tip:", f["tip"])
    print("Ideea:", f["ideea"])
    print("Controale:")
    for c in f["controale"]:
        print("  *", c)
    print("=" * 32)

afiseaza_fisa(fisa)
```

**Ieșire:**
```text
================================
APARATORII GALAXIEI
de Prenume Nume
--------------------------------
Tip: Shooter spatial
Ideea: Aperi galaxia de meteoriti
Controale:
  * Stanga/Dreapta: misca nava
  * Spatiu: trage
  * P: pauza
================================
```

Înainte să-ți prezinți jocul, completează o **fișă**: titlu, autor, tip, idee, controale. Iată cum o poți face și în cod. Un dicționar păstrează informațiile, iar o funcție le afișează frumos. `"=" * 32` repetă semnul `=` de 32 de ori, pentru o linie despărțitoare. Aceleași informații le poți pune în **ecranul de reguli** și în **credite**.

### Exemplul 9 — Codul curat: constante cu nume

```python
def pozitie_noua_v1(x, directie):
    x = x + directie * 7
    if x < 0:
        x = 0
    if x > 550:
        x = 550
    return x

VITEZA_NAVA = 7
LATIME_ECRAN = 600
LATIME_NAVA = 50

def pozitie_noua_v2(x, directie):
    x = x + directie * VITEZA_NAVA
    return max(0, min(x, LATIME_ECRAN - LATIME_NAVA))

teste = [(10, -1), (10, 1), (545, 1), (0, -1), (300, 1)]
toate_egale = True
for x, d in teste:
    a = pozitie_noua_v1(x, d)
    b = pozitie_noua_v2(x, d)
    print("x =", x, ", directie =", d, "->", a, b)
    if a != b:
        toate_egale = False
print("Aceleasi rezultate:", toate_egale)
```

**Ieșire:**
```text
x = 10 , directie = -1 -> 3 3
x = 10 , directie = 1 -> 17 17
x = 545 , directie = 1 -> 550 550
x = 0 , directie = -1 -> 0 0
x = 300 , directie = 1 -> 307 307
Aceleasi rezultate: True
```

Cele două funcții fac **exact același lucru**, dar a doua este mai bună: numerele „magice” (`7`, `550`) au primit **nume** (`VITEZA_NAVA`, `LATIME_ECRAN - LATIME_NAVA`). Dacă vrei o navă mai rapidă sau un ecran mai lat, schimbi **un singur loc**, iar numele îți spun la ce folosește fiecare valoare. Înainte de expoziție, caută în jocul tău numere care se repetă și dă-le nume.

---

## 3. Cadrul expoziției

### Exemplul 10 — „Expoziția”

Acesta este **cadrul** în care pui jocul tău: meniu cu butoane (**Joaca, Reguli, Credite, Iesire**), tranziții cu fade, captură de ecran (**F12**), contor FPS (**F3**) și un **mini-joc** de probă, pe care îl înlocuiești cu jocul tău.

```python
import random
import time
import pygame

pygame.init()
LATIME = 700
INALTIME = 500
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Expozitia")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 34)
font_mare = pygame.font.Font(None, 72)

TITLU = "CLICK PE STELE"
AUTOR = "Prenume Nume"
DURATA_MINI_JOC = 15
REGULI = [
    "Click pe stea ca sa o prinzi",
    "Fiecare stea valoreaza 1 punct",
    "Ai 15 secunde",
    "ESC = inapoi la meniu",
]
CREDITE = [TITLU, "", "Creat de", AUTOR, "", "Facut cu Python si Pygame", "", "Multumesc ca ai jucat!"]
PAS_CREDITE = 45

def scrie(text, x, y, culoare=(255, 255, 255), fnt=None, centrat=False):
    if fnt is None:
        fnt = font
    imagine = fnt.render(text, True, culoare)
    if centrat:
        x = x - imagine.get_width() // 2
    ecran.blit(imagine, (x, y))

def nume_captura():
    return "captura_" + time.strftime("%Y%m%d_%H%M%S") + ".png"

def fade_out(viteza=20):
    copie = ecran.copy()
    negru = pygame.Surface((LATIME, INALTIME))
    negru.fill((0, 0, 0))
    for alfa in range(0, 256, viteza):
        negru.set_alpha(alfa)
        ecran.blit(copie, (0, 0))
        ecran.blit(negru, (0, 0))
        pygame.display.flip()
        ceas.tick(60)

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

butoane = [
    Buton("Joaca", 250, 190, 200, 50),
    Buton("Reguli", 250, 255, 200, 50),
    Buton("Credite", 250, 320, 200, 50),
    Buton("Iesire", 250, 385, 200, 50),
]

stea = pygame.Rect(0, 0, 44, 44)

joc = {
    "stare": "meniu",
    "scor": 0,
    "record": 0,
    "start": 0,
    "credite_y": INALTIME,
    "mesaj": "",
    "mesaj_pana": 0,
    "fps": False,
}

def muta_stea():
    stea.x = random.randint(20, LATIME - 64)
    stea.y = random.randint(80, INALTIME - 64)

def afiseaza_mesaj(text, durata=2000):
    joc["mesaj"] = text
    joc["mesaj_pana"] = pygame.time.get_ticks() + durata

def schimba_stare(noua):
    fade_out()
    joc["stare"] = noua
    if noua == "joc":
        joc["scor"] = 0
        joc["start"] = pygame.time.get_ticks()
        muta_stea()
    if noua == "credite":
        joc["credite_y"] = INALTIME

ruleaza = True
while ruleaza:
    acum = pygame.time.get_ticks()

    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_ESCAPE:
                if joc["stare"] == "meniu":
                    ruleaza = False
                else:
                    schimba_stare("meniu")
            if eveniment.key == pygame.K_F12:
                fisier = nume_captura()
                pygame.image.save(ecran, fisier)
                afiseaza_mesaj("Captura salvata: " + fisier)
            if eveniment.key == pygame.K_F3:
                joc["fps"] = not joc["fps"]
        if eveniment.type == pygame.MOUSEBUTTONDOWN:
            if joc["stare"] == "meniu":
                if butoane[0].este_apasat(eveniment.pos):
                    schimba_stare("joc")
                elif butoane[1].este_apasat(eveniment.pos):
                    schimba_stare("reguli")
                elif butoane[2].este_apasat(eveniment.pos):
                    schimba_stare("credite")
                elif butoane[3].este_apasat(eveniment.pos):
                    ruleaza = False
            elif joc["stare"] == "joc":
                if stea.collidepoint(eveniment.pos):
                    joc["scor"] += 1
                    muta_stea()

    if joc["stare"] == "joc":
        ramas = DURATA_MINI_JOC - (acum - joc["start"]) / 1000
        if ramas <= 0:
            if joc["scor"] > joc["record"]:
                joc["record"] = joc["scor"]
            schimba_stare("meniu")
            afiseaza_mesaj("Scor final: " + str(joc["scor"]) + ". Record: " + str(joc["record"]), 3000)
    if joc["stare"] == "credite":
        joc["credite_y"] -= 1.5
        if joc["credite_y"] + PAS_CREDITE * len(CREDITE) < 0:
            joc["credite_y"] = INALTIME

    ecran.fill((15, 20, 50))
    if joc["stare"] == "meniu":
        scrie(TITLU, LATIME // 2, 80, (255, 220, 0), font_mare, True)
        scrie("de " + AUTOR, LATIME // 2, 145, (200, 200, 200), None, True)
        for b in butoane:
            b.deseneaza()
    elif joc["stare"] == "reguli":
        scrie("REGULI", LATIME // 2, 50, (255, 220, 0), font_mare, True)
        y = 150
        numar = 1
        for linie in REGULI:
            scrie(str(numar) + ". " + linie, 120, y)
            y += 50
            numar += 1
        scrie("ESC = inapoi", LATIME // 2, INALTIME - 50, (150, 150, 150), None, True)
    elif joc["stare"] == "credite":
        y = joc["credite_y"]
        for i in range(len(CREDITE)):
            if i == 0:
                scrie(CREDITE[i], LATIME // 2, y, (255, 220, 0), font_mare, True)
            else:
                scrie(CREDITE[i], LATIME // 2, y, (230, 230, 230), None, True)
            y += PAS_CREDITE
    elif joc["stare"] == "joc":
        pygame.draw.circle(ecran, (255, 220, 0), stea.center, 22)
        pygame.draw.circle(ecran, (255, 255, 160), stea.center, 12)
        scrie("Scor: " + str(joc["scor"]), 15, 15)
        scrie("Timp: " + str(int(ramas) + 1), LATIME - 130, 15)

    if acum < joc["mesaj_pana"]:
        scrie(joc["mesaj"], LATIME // 2, INALTIME - 40, (120, 255, 120), None, True)
    if joc["fps"]:
        scrie("FPS: " + str(int(ceas.get_fps())), 10, INALTIME - 30, (255, 255, 0))

    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** **meniul** are titlul „CLICK PE STELE” (galben), numele autorului și **patru butoane**.
- **Joaca**: după o tranziție cu **fade**, apar stele pe care le prinzi cu **click** (scor sus-stânga, timp sus-dreapta, 15 secunde). La final ești adus în meniu, unde scrie scorul și recordul.
- **Reguli**: titlul „REGULI” și regulile numerotate; **ESC** te duce înapoi.
- **Credite**: textul urcă ca la sfârșitul unui film și se reia.
- **Iesire**: închide programul.
- **Oricând**: **F12** salvează o captură de ecran, iar **F3** arată sau ascunde FPS-ul.

**Înlocuiește mini-jocul cu jocul tău!** Starea `"joc"` este locul unde pui bucla jocului tău: ce desenează și ce actualizează jocul. Meniul, regulile, creditele, fade-ul și captura **rămân la fel**, schimbi doar titlul, autorul, regulile și creditele (listele de la început).

---

## 4. Expoziția de jocuri

### Cum prezentăm (2 minute pentru fiecare)
1. **Titlul și ideea** (o propoziție): „Jocul meu se numește... și în el...”  
2. **Cum se joacă** (controale, scop).  
3. **Demonstrație** pe viu (30–60 de secunde).  
4. **Ce ai inventat tu** (ce este diferit față de exemplele din lecții).  
5. **Ce a fost greu** și cum ai rezolvat.  

### Cum jucăm jocurile colegilor
- Joacă **cel puțin două** jocuri ale colegilor.  
- Completează pentru fiecare o **fișă de feedback** (mai jos).  
- Feedback-ul trebuie să fie **frumos și de ajutor**: spune ce ți-a plăcut și ce ar putea fi îmbunătățit.

### Fișa de feedback

| Joc: ______________ | Autor: ______________ |
|---------------------|-----------------------|
| Ce mi-a plăcut cel mai mult | |
| Ce aș schimba / ce a fost greu de înțeles | |
| O idee nouă pentru joc | |
| Notă de la 1 la 5 pentru: idee / grafică / cât de distractiv e | ☐ ☐ ☐ |

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Jocul meu, finisat (obligatoriu)
Pregătește jocul pentru expoziție:
1. jocul **pornește fără erori** și se poate **juca din nou** după GAME OVER;
2. are **ecran de reguli** și **credite** cu numele tău;
3. recordul este **salvat în fișier**;
4. ai o **captură de ecran** a jocului (F12);
5. ai pregătit **prezentarea de 2 minute**.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
def clipeste(ms, perioada=500):
    return (ms // perioada) % 2 == 0

print(clipeste(100), clipeste(500), clipeste(1100))
print(list(range(0, 100, 25)))
setari = {"muzica": True}
setari.update({"muzica": False, "volum": 5})
print(setari)
```

### Exercițiul C — Feedback pentru colegi
Joacă **două** jocuri ale colegilor și completează câte o **fișă de feedback**. Alege **un lucru** pe care vrei să-l încerci și tu la jocul tău.

### Exercițiul D — Găsește greșelile
Programul are 3 greșeli. Rescrie-l corect:

```text
import json
def incarca(fisier):
    try:
        with open(fisier, "r") as f
            return json.load(f)
    except FileNotFound:
        return {}
setari = incarca("setari.json")
print(setari["culoare"])
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce este cel mai bun lucru la jocul tău?  
2. Ce ai face diferit dacă ai începe din nou?  
3. Ce ai învățat în acest curs și ce vrei să înveți mai departe?

**Gata când:**
- [ ] Jocul funcționează și se poate juca din nou după final  
- [ ] Are ecran de reguli, credite și record salvat  
- [ ] Ai o captură de ecran și o fișă a jocului  
- [ ] Ai prezentat jocul și ai completat două fișe de feedback  
- [ ] Fișierul se numește `Prenume_Nume_P4_L10.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă **sunete** și **muzică** (`pygame.mixer`) și un buton care le oprește  
- [ ] Salvează **setările** jocului (muzică, culori) într-un fișier `json`  
- [ ] Fă un **al doilea nivel** cu alt fundal și alți inamici  
- [ ] Publică jocul: cere ajutorul profesorului pentru un fișier `.exe` sau pentru a-l pune pe GitHub  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Jocul se oprește la meniu | Starea nu se schimbă | Verifică `schimba_stare(...)` și condiția butonului |
| Fade-ul „îngheață” jocul | Fade-ul este o buclă proprie | Folosește-l doar la schimbarea stării |
| `pygame.error: Couldn't open captura.png` | Folderul nu poate fi scris | Salvează programul într-un folder al tău |
| `KeyError: 'culoare'` | Cheia lipsește din dicționar | `setari.get("culoare", "albastru")` sau valori implicite |
| `NameError: name 'FileNotFound' is not defined` | Numele erorii este greșit | `FileNotFoundError` |
| Recordul dispare la închidere | Nu este salvat în fișier | Scrie recordul cu `with open(...)` |
| Textul cu diacritice apare ca pătrățele | Fontul implicit nu le are | Scrie textele din joc **fără diacritice** |

---

## Recapitulare pe scurt

- Un joc finisat are **meniu, reguli, credite**, tranziții și record salvat.
- **Constantele cu nume** fac codul mai clar și mai ușor de schimbat.
- Capturile de ecran și fișa jocului te ajută la **prezentare**.
- Când arăți jocul altora, afli ce merge bine și ce poate fi îmbunătățit.

---

## Verificare Modul 4

Răspunde pe foaie (apoi verifică cu profesorul):

1. Ce face `pygame.display.flip()`?  
2. La ce folosește `ceas.tick(60)`?  
3. Care este diferența dintre evenimentul `KEYDOWN` și `pygame.key.get_pressed()`?  
4. Ce întoarce `a.colliderect(b)`?  
5. Ce face `rect.clamp_ip(ecran.get_rect())`?  
6. Ce înseamnă `self` într-o metodă a unei clase?  
7. Care este diferența dintre `open(f, "w")` și `open(f, "a")`?  
8. De ce parcurgem `lista[:]` când scoatem elemente din listă?  

**Răspunsuri:**
1. Afișează pe ecran tot ce am desenat în cadrul curent.  
2. Limitează jocul la 60 de cadre pe secundă, deci viteza este aceeași pe orice calculator.  
3. `KEYDOWN` se declanșează **o singură dată** la apăsare; `get_pressed()` arată dacă tasta este **ținută apăsată** în acest moment.  
4. `True` dacă dreptunghiurile se suprapun, altfel `False`.  
5. Ține dreptunghiul **în interiorul** ecranului (nu-l lasă să iasă).  
6. „Obiectul acesta”: prin `self` metoda își accesează atributele (`self.rect`, `self.viteza`).  
7. `"w"` șterge conținutul vechi și scrie de la zero; `"a"` **adaugă** la sfârșit.  
8. Dacă scoatem elemente din lista pe care o parcurgem, Python **sare peste** unele elemente; pe o copie, parcurgerea rămâne corectă.  

### Autoevaluare (bifează)

| Știu să… | Da | Aproape | Încă nu |
|----------|----|---------|---------|
| creez o fereastră și o buclă de joc | ☐ | ☐ | ☐ |
| desenez forme, culori și imagini | ☐ | ☐ | ☐ |
| mișc obiecte și controlez jucătorul | ☐ | ☐ | ☐ |
| detectez coliziuni | ☐ | ☐ | ☐ |
| afișez scor, vieți și stări de joc | ☐ | ☐ | ☐ |
| scriu clase și folosesc obiecte | ☐ | ☐ | ☐ |
| salvez recordul într-un fișier și tratez erorile | ☐ | ☐ | ☐ |
| construiesc și prezint un joc complet | ☐ | ☐ | ☐ |

---

## Verificare finală — Cursul de Python

Răspunde pe foaie (apoi verifică cu profesorul):

1. Ce afișează `print(7 // 2, 7 % 2, 7 / 2)`?  
2. Ce afișează `print("ab" * 3)`?  
3. Care este diferența dintre o **listă** și un **dicționar**?  
4. Ce valori parcurge `for i in range(2, 10, 3):`?  
5. Care este diferența dintre `print` și `return` într-o funcție?  
6. Cum scrii o funcție `dublu(x)` care întoarce dublul lui `x`?  
7. Ce unghi folosești pentru un triunghi echilateral în Turtle?  
8. Ce este o clasă și ce este un obiect?  
9. La ce folosește `try / except`?  
10. Ce pași repetă bucla unui joc Pygame în fiecare cadru?  

**Răspunsuri:**
1. `3 1 3.5`  
2. `ababab`  
3. Lista păstrează elemente **în ordine**, numerotate (`lista[0]`); dicționarul păstrează perechi **cheie → valoare** (`d["nume"]`).  
4. `2, 5, 8`  
5. `print` doar **afișează** un rezultat; `return` **trimite** rezultatul înapoi, ca să-l poți folosi mai departe.  
6. `def dublu(x):` și, pe rândul următor (indentat), `return x * 2`.  
7. `120` de grade (`360 / 3`).  
8. Clasa este **rețeta**, iar obiectul este lucrul făcut după ea (ex. clasa `Inamic` și zece inamici).  
9. Prinde erorile (de exemplu `FileNotFoundError` sau `ValueError`), ca programul să nu se oprească.  
10. Citește **evenimentele**, **actualizează** jocul, **desenează** totul, apoi afișează cu `flip()` și limitează viteza cu `tick(60)`.  

### Autoevaluarea cursului (bifează)

| Știu să… | Da | Aproape | Încă nu |
|----------|----|---------|---------|
| scriu programe cu variabile, `if`, `while` și `for` | ☐ | ☐ | ☐ |
| folosesc liste, dicționare și funcții | ☐ | ☐ | ☐ |
| desenez cu Turtle și fac jocuri simple | ☐ | ☐ | ☐ |
| fac un joc cu Pygame, cu clase și fișiere | ☐ | ☐ | ☐ |
| caut și repar erorile din cod | ☐ | ☐ | ☐ |
| prezint un proiect și dau feedback colegilor | ☐ | ☐ | ☐ |

---

## Temă
1. Mai joacă-ți jocul cu **3 persoane** și notează ce îmbunătățiri propun.  
2. Pune în joc **cel puțin două** îmbunătățiri propuse de colegi sau de familie.  
3. Pune pe un document **fișa jocului**, **o captură de ecran** și **codul** (acesta este începutul portofoliului tău!).  
4. **Bonus:** alege **următorul tău proiect** (un joc nou, o aplicație sau un desen animat) și fă un plan de o pagină.  
5. Salvează totul ca `Tema_P4_L10_Prenume_Nume.py`.

---

## Ce urmează — după curs

Felicitări! Ai parcurs **cele patru module** ale cursului de Python:

| Modulul | Ce ai învățat | Insigna |
|---------|---------------|---------|
| 1. Primii pași în Python | `print`, variabile, `if`, bucle | Python Starter |
| 2. Repetăm, colecționăm, organizăm | Liste, dicționare, funcții | Python Builder |
| 3. Desenăm cu Turtle | Forme, culori, taste, mouse, jocuri | Turtle Artist |
| 4. Jocuri cu Pygame | Ferestre, mișcare, coliziuni, clase, fișiere | Game Creator |

**Ce poți face mai departe:**
- continuă să-ți **îmbunătățești jocurile** și să inventezi altele noi;
- învață despre **sunete, imagini și animații** în Pygame (documentația este pe pygame.org);
- încearcă alte cursuri din **Code Maker Club**, de exemplu cel de **Blender** (grafică 3D);
- ține un **portofoliu** cu jocurile tale și arată-le prietenilor și familiei.

**Mulțumim că ai fost parte din Code Maker Club!** Cel mai important lucru pe care l-ai învățat nu este o instrucțiune, ci felul în care **gândești**: cum împarți o problemă mare în pași mici și cum nu te dai bătut când ceva nu merge. Programatorii adevărați repară erori în fiecare zi, iar tu ai exersat exact asta. Ne vedem la următorul proiect!
