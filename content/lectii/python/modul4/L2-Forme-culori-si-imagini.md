# LECȚIA 2 — Forme, culori și imagini
**Modulul 4 · Jocuri cu Pygame · 2 ore**  
**Code Maker Club · Game Creator**

> Un joc fără personaje nu e joc! Azi învățăm să **desenăm** în Pygame: dreptunghiuri, cercuri, linii, poligoane. Apoi creăm propriile **imagini** (un personaj, o casă), le salvăm pe calculator și le lipim pe ecran de câte ori vrem.  
> Proiect: **„Orășelul meu”** · fișier: `Prenume_Nume_P4_L2.py`

---

## Obiectiv
La finalul orei desenezi cu `pygame.draw` (dreptunghi, cerc, linie, poligon, elipsă), folosești obiecte `Rect`, creezi imagini proprii (`Surface`), le salvezi și le încarci din fișier, le lipești de mai multe ori pe ecran, le mărești, le rotești și le oglindești.  
**Minim:** un desen din cel puțin 4 forme diferite.  
**Ținta orei (Complet):** + o imagine creată de tine, salvată și încărcată + orășelul din mini-proiect.

## De ce contează
Fiecare personaj, copac, monedă sau inamic dintr-un joc este o **imagine** sau o **formă**. Dacă știi să le creezi și să le așezi pe ecran, poți construi orice lume.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L1 |
| 10–35 | Dreptunghi, cerc, linie, poligon (**Exemplele 1–3**) |
| 35–50 | Un peisaj din forme (**Exemplul 4**) |
| 50–65 | Obiectul `Rect` (**Exemplul 5**) |
| 65–90 | Imagini proprii: `Surface`, salvare, încărcare (**Exemplele 6–8**) |
| 90–100 | Mărire, rotire, oglindire (**Exemplul 9**) |
| 100–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L1

- Scheletul jocului: `init`, `set_mode`, bucla `while`, `event.get()`, `fill`, `flip`, `quit`.
- Culoarea este `(R, G, B)`.
- `(0, 0)` este în **stânga-sus**, iar `y` crește **în jos**.

**Încearcă tu (3 min)**  
- [ ] Scrie culoarea galbenă `(R, G, B)`, adică roșu + verde la maxim, albastru zero  

> În toate exemplele de azi folosim același **schelet de joc** din Lecția 1. Partea nouă este desenul dintre `fill` și `flip`. Toate programele sunt **complete**: le poți scrie și rula.

---

## 2. Forme

### Exemplul 1 — Dreptunghiuri

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Dreptunghiuri")

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((255, 255, 255))
    pygame.draw.rect(ecran, (255, 0, 0), (50, 50, 200, 100))
    pygame.draw.rect(ecran, (0, 0, 255), (300, 50, 200, 100), 6)
    pygame.draw.rect(ecran, (0, 160, 0), (50, 200, 200, 100), border_radius=25)
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal alb, trei dreptunghiuri: unul **roșu plin** (stânga-sus), unul **albastru, doar contur** gros de 6 (dreapta-sus) și unul **verde cu colțuri rotunjite** (stânga-jos).

`pygame.draw.rect(ecran, culoare, (x, y, lățime, înălțime), grosime)`:
- `(x, y)` este colțul din **stânga-sus**;
- fără grosime (sau 0), dreptunghiul este **plin**; cu grosime, este doar **conturul**;
- `border_radius=25` rotunjește colțurile.

### Exemplul 2 — Cercuri și elipse

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Cercuri")

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((20, 20, 50))
    pygame.draw.circle(ecran, (255, 220, 0), (150, 150), 80)
    pygame.draw.circle(ecran, (255, 255, 255), (350, 150), 60, 5)
    pygame.draw.ellipse(ecran, (0, 200, 200), (450, 100, 120, 60))
    pygame.draw.circle(ecran, (255, 80, 80), (300, 320), 40)
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal albastru închis: un **cerc galben plin** (stânga-sus), un **cerc alb, doar contur** (centru-sus), o **elipsă turcoaz** (dreapta-sus) și un **cerc roșu mic** jos, la mijloc.

- `pygame.draw.circle(ecran, culoare, (centru_x, centru_y), raza, grosime)` — aici dăm **centrul**, nu colțul;
- `pygame.draw.ellipse(ecran, culoare, (x, y, lățime, înălțime))` — elipsa este desenată în interiorul unui dreptunghi dat.

### Exemplul 3 — Linii și poligoane

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Linii si poligoane")

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((255, 250, 220))
    pygame.draw.line(ecran, (0, 0, 0), (50, 50), (250, 150), 4)
    pygame.draw.line(ecran, (200, 0, 0), (50, 150), (250, 50), 8)
    triunghi = [(400, 50), (320, 180), (480, 180)]
    pygame.draw.polygon(ecran, (0, 150, 0), triunghi)
    pygame.draw.polygon(ecran, (0, 0, 0), triunghi, 3)
    stea = [(300, 230), (320, 280), (375, 285), (335, 320), (350, 375), (300, 345), (250, 375), (265, 320), (225, 285), (280, 280)]
    pygame.draw.polygon(ecran, (255, 200, 0), stea)
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal crem: două **linii** care formează un **X** (una neagră subțire, una roșie groasă), un **triunghi verde** cu contur negru și, jos, o **stea galbenă** cu 5 colțuri.

- `pygame.draw.line(ecran, culoare, început, sfârșit, grosime)` unește două puncte;
- `pygame.draw.polygon(ecran, culoare, lista_de_puncte)` desenează orice formă cu colțurile date; prima oară plin, a doua oară (cu grosime 3) doar conturul.

---

## 3. Un peisaj

### Exemplul 4 — Peisaj din forme

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((700, 450))
pygame.display.set_caption("Peisaj")

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((135, 206, 235))
    pygame.draw.circle(ecran, (255, 220, 0), (600, 80), 50)
    pygame.draw.rect(ecran, (60, 170, 60), (0, 330, 700, 120))

    pygame.draw.rect(ecran, (230, 200, 130), (100, 230, 140, 110))
    pygame.draw.polygon(ecran, (170, 40, 40), [(90, 230), (170, 160), (250, 230)])
    pygame.draw.rect(ecran, (110, 60, 20), (155, 280, 30, 60))
    pygame.draw.rect(ecran, (200, 240, 255), (115, 250, 30, 30))

    pygame.draw.rect(ecran, (110, 60, 20), (440, 260, 24, 80))
    pygame.draw.circle(ecran, (20, 110, 20), (452, 240), 45)
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** un **peisaj** pe cer albastru: **soare** galben în dreapta-sus, **iarbă** verde jos, o **casă** (pereți nisipii, acoperiș roșu, ușă maro, fereastră deschisă) și un **copac** (trunchi maro, coroană verde închis).

Ordinea contează: **ce desenezi mai târziu se vede peste ce ai desenat mai devreme**. De aceea mai întâi cerul și iarba, apoi casa, abia la sfârșit detaliile.

---

## 4. Obiectul `Rect`

### Exemplul 5 — Dreptunghiul ca obiect

```python
import pygame

r = pygame.Rect(100, 50, 200, 80)
print("stanga:", r.left, "dreapta:", r.right)
print("sus:", r.top, "jos:", r.bottom)
print("centru:", r.center)
print("marime:", r.size)

r.x += 10
print("dupa r.x += 10, dreapta este", r.right)

r.center = (400, 300)
print("dupa mutarea centrului, stanga-sus este", r.topleft)
```

**Ieșire:**
```text
stanga: 100 dreapta: 300
sus: 50 jos: 130
centru: (200, 90)
marime: (200, 80)
dupa r.x += 10, dreapta este 310
dupa mutarea centrului, stanga-sus este (300, 260)
```

Un `Rect` (de la „rectangle”) memorează un dreptunghi și știe să-și calculeze singur marginile: `left`, `right`, `top`, `bottom` și `center`. Poți și să-l **muți**: dacă schimbi `r.center`, tot dreptunghiul se mută. Vom folosi `Rect` pentru personaje și, în Lecția 5, pentru **coliziuni**.

Un `Rect` se poate da și la `pygame.draw.rect(ecran, culoare, r)`.

---

## 5. Imagini proprii

### Exemplul 6 — O imagine făcută de noi (`Surface`)

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 300))
pygame.display.set_caption("Surface")

pereti = pygame.Surface((100, 80))
pereti.fill((230, 200, 130))
pygame.draw.rect(pereti, (110, 60, 20), (40, 30, 20, 50))
print("Imaginea are marimea", pereti.get_size())

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((200, 230, 255))
    ecran.blit(pereti, (50, 100))
    ecran.blit(pereti, (250, 100))
    ecran.blit(pereti, (450, 100))
    pygame.display.flip()

pygame.quit()
```

**Ieșire:**
```text
Imaginea are marimea (100, 80)
```

**Ce vezi pe ecran:** pe fundal albastru deschis, **trei „case”** (dreptunghiuri nisipii cu ușă maro), la distanțe egale. Imaginea a fost creată **o singură dată** și lipită de trei ori.

O `Surface` este o **imagine goală**, pe care poți desena la fel ca pe ecran (`fill`, `pygame.draw...`). `ecran.blit(imagine, (x, y))` o lipește pe ecran oriunde. Așa avem **un singur desen**, dar îl putem folosi de câte ori vrem.

### Exemplul 7 — Salvăm și încărcăm o imagine

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((400, 300))

jucator = pygame.Surface((60, 60), pygame.SRCALPHA)
pygame.draw.circle(jucator, (0, 150, 255), (30, 30), 28)
pygame.draw.circle(jucator, (255, 255, 255), (20, 24), 8)
pygame.draw.circle(jucator, (255, 255, 255), (40, 24), 8)
pygame.draw.circle(jucator, (0, 0, 0), (22, 26), 4)
pygame.draw.circle(jucator, (0, 0, 0), (42, 26), 4)
pygame.draw.rect(jucator, (0, 0, 0), (18, 40, 24, 4))

pygame.image.save(jucator, "jucator.png")
print("Imagine salvata: jucator.png")

incarcata = pygame.image.load("jucator.png").convert_alpha()
print("Imagine incarcata, marime:", incarcata.get_size())

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((255, 240, 200))
    ecran.blit(incarcata, (170, 120))
    pygame.display.flip()

pygame.quit()
```

**Ieșire:**
```text
Imagine salvata: jucator.png
Imagine incarcata, marime: (60, 60)
```

**Ce vezi pe ecran:** pe fundal galben deschis, un **personaj rotund albastru**, cu doi ochi albi și o gură neagră, exact în centrul ferestrei.

Programul face trei lucruri:
1. **desenează** personajul pe o `Surface` (cu `pygame.SRCALPHA`, ca să aibă **zone transparente**);
2. **îl salvează** în fișierul `jucator.png`, în același folder cu programul tău (salvează întâi programul, ca Thonny să știe folderul!);
3. **îl încarcă** din fișier cu `pygame.image.load(...)`.

Așa vei încărca și imaginile **descărcate** sau făcute în alt program: se pun în același folder cu jocul, iar numele fișierului se scrie între ghilimele. `convert_alpha()` pregătește imaginea ca să se deseneze rapid, păstrând transparența.

### Exemplul 8 — Transparența

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((500, 250))
pygame.display.set_caption("Transparenta")

fara = pygame.Surface((100, 100))
fara.fill((0, 0, 0))
pygame.draw.circle(fara, (255, 100, 0), (50, 50), 45)

cu = pygame.Surface((100, 100), pygame.SRCALPHA)
pygame.draw.circle(cu, (255, 100, 0), (50, 50), 45)

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((60, 160, 60))
    ecran.blit(fara, (100, 75))
    ecran.blit(cu, (300, 75))
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** pe fundal verde, **două cercuri portocalii**. Cel din **stânga** are în jur un **pătrat negru** (imaginea fără transparență). Cel din **dreapta** este **curat**: în jurul lui se vede iarba verde.

De aceea, pentru personajele din jocuri folosim `pygame.SRCALPHA`: partea pe care nu o desenăm rămâne **transparentă**.

---

## 6. Mărire, rotire, oglindire

### Exemplul 9 — Transformări

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 250))

sageata = pygame.Surface((60, 30), pygame.SRCALPHA)
pygame.draw.polygon(sageata, (220, 30, 30), [(0, 8), (35, 8), (35, 0), (60, 15), (35, 30), (35, 22), (0, 22)])

mare = pygame.transform.scale(sageata, (120, 60))
rotita = pygame.transform.rotate(sageata, 90)
oglinda = pygame.transform.flip(sageata, True, False)

print("Original:", sageata.get_size())
print("Mare:", mare.get_size())
print("Rotita cu 90 de grade:", rotita.get_size())
print("Oglinda:", oglinda.get_size())

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((255, 255, 255))
    ecran.blit(sageata, (30, 100))
    ecran.blit(mare, (130, 80))
    ecran.blit(rotita, (300, 80))
    ecran.blit(oglinda, (420, 100))
    pygame.display.flip()

pygame.quit()
```

**Ieșire:**
```text
Original: (60, 30)
Mare: (120, 60)
Rotita cu 90 de grade: (30, 60)
Oglinda: (60, 30)
```

**Ce vezi pe ecran:** patru săgeți roșii: prima este cea **originală**, a doua are **dublă mărime**, a treia este **rotită** și arată în sus, iar a patra este **oglindită** și arată spre stânga.

- `transform.scale(imagine, (lățime, înălțime))` o face mai mare sau mai mică;
- `transform.rotate(imagine, grade)` o rotește (în sens invers acelor de ceasornic); pentru 90° lățimea și înălțimea **se schimbă între ele**;
- `transform.flip(imagine, orizontal, vertical)` o oglindește.

Aceste comenzi **returnează o imagine nouă**; originalul rămâne neschimbat.

---

## 7. Mini-proiect

### Exemplul 10 — Orășelul meu

```python
import pygame

pygame.init()
LATIME = 700
INALTIME = 450
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Orasul meu")
font = pygame.font.Font(None, 40)

def creeaza_casa(culoare):
    casa = pygame.Surface((120, 150), pygame.SRCALPHA)
    pygame.draw.rect(casa, culoare, (10, 60, 100, 90))
    pygame.draw.polygon(casa, (160, 40, 40), [(0, 60), (60, 5), (120, 60)])
    pygame.draw.rect(casa, (110, 60, 20), (48, 100, 24, 50))
    pygame.draw.rect(casa, (200, 240, 255), (18, 80, 24, 24))
    pygame.draw.rect(casa, (200, 240, 255), (78, 80, 24, 24))
    return casa

case = [
    creeaza_casa((230, 200, 130)),
    creeaza_casa((150, 200, 240)),
    creeaza_casa((240, 170, 190)),
    creeaza_casa((170, 230, 170)),
]

copac = pygame.Surface((60, 120), pygame.SRCALPHA)
pygame.draw.rect(copac, (110, 60, 20), (25, 70, 10, 50))
pygame.draw.circle(copac, (20, 120, 20), (30, 45), 30)

titlu = font.render("ORASUL MEU", True, (255, 255, 255))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((135, 206, 235))
    pygame.draw.circle(ecran, (255, 220, 0), (620, 70), 40)
    pygame.draw.ellipse(ecran, (255, 255, 255), (80, 50, 120, 40))
    pygame.draw.ellipse(ecran, (255, 255, 255), (300, 80, 140, 40))
    pygame.draw.rect(ecran, (70, 170, 70), (0, 330, LATIME, 120))
    pygame.draw.rect(ecran, (90, 90, 90), (0, 400, LATIME, 30))

    for i in range(4):
        ecran.blit(case[i], (20 + i * 165, 190))
    ecran.blit(copac, (630, 210))

    ecran.blit(titlu, (20, 15))
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** un **orășel** pe cer albastru, cu soare și doi nori albi. Pe iarbă stau **patru case** (nisipie, albastră, roz și verde), toate cu acoperiș roșu, ușă și două ferestre, iar în dreapta un **copac**. Jos, **un drum gri**. Sus, în stânga, cu litere albe, titlul **ORASUL MEU**.

Ideea cea mai importantă: funcția `creeaza_casa(culoare)` **construiește o imagine** și o **returnează**; o apelăm de patru ori cu culori diferite și punem rezultatele într-o **listă**. Apoi o buclă `for` le lipește pe ecran, la distanțe egale (`20 + i * 165`).

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Orășelul meu” (obligatoriu)
Pornește de la Exemplul 10 și fă orășelul **al tău**:
1. cel puțin **6 clădiri** (poți crea și altă clădire: bloc, școală, biserică, turn);
2. cel puțin **trei copaci**, creați **o singură dată** și lipiți de mai multe ori;
3. un **soare**, **nori** și un **drum**;
4. cel puțin **o imagine** salvată cu `pygame.image.save` și încărcată înapoi;
5. titlul orașului tău, scris pe ecran.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
import pygame

r = pygame.Rect(10, 20, 100, 50)
print(r.right)
print(r.bottom)
print(r.center)
r.y = 100
print(r.bottom)
```

### Exercițiul C — Personajul tău
Desenează pe o `Surface` de 80 × 80 **un personaj propriu** (robot, pisică, extraterestru), cu cel puțin 6 forme. Salvează-l ca `personaj.png`, încarcă-l și lipește-l de **5 ori** pe ecran, o dată mărit, o dată rotit și o dată oglindit.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
import pygame
pygame.init()
ecran = pygame.display.set_mode((600, 400))
img = pygame.Surface(60, 60)
pygame.draw.circle(img, (255, 0, 0), 30, 30, 25)
ecran.blit(img)
pygame.display.flip()
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce ordinea în care desenăm contează?  
2. Ce este o `Surface` și cum o folosim?  
3. De ce folosim `pygame.SRCALPHA` pentru personaje?

**Gata când:**
- [ ] Orășelul are 6 clădiri, copaci, soare, nori și drum  
- [ ] Ai salvat și ai încărcat cel puțin o imagine  
- [ ] Personajul tău apare mărit, rotit și oglindit  
- [ ] Ai explicat pe foaie `Surface` și transparența  
- [ ] Fișierul se numește `Prenume_Nume_P4_L2.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Desenează **noaptea**: fundal închis, lună, stele și ferestre galbene luminate  
- [ ] Fă un **semafor** cu trei cercuri (roșu, galben, verde)  
- [ ] Adaugă **munți** (triunghiuri) în fundal  
- [ ] Creează o **hartă** cu `for` în `for`: o grilă de pătrate de culori diferite (iarbă, apă, nisip)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `TypeError: argument 1 must be pygame.surface.Surface, not ...` | Ai dat altceva decât o imagine lui `blit` sau `draw` | Primul parametru este `ecran` sau o `Surface` |
| `TypeError: function missing required argument 'dest' (pos 2)` | `ecran.blit(img)` fără poziție | `ecran.blit(img, (x, y))` |
| `FileNotFoundError: No file 'jucator.png' found in working directory` | Fișierul nu este în același folder cu programul | Salvează programul și pune imaginea lângă el |
| Imaginea are un pătrat negru în jurul ei | Lipsește `pygame.SRCALPHA` | `pygame.Surface((l, h), pygame.SRCALPHA)` |
| Cercul apare în alt loc decât te așteptai | La cerc se dă **centrul**, nu colțul | `circle(ecran, culoare, (centru_x, centru_y), raza)` |
| O formă dispare | A fost desenată înainte de alta mai mare | Desenează mai întâi fundalul, apoi detaliile |
| `ValueError: size needs to be (number width, number height)` | Ai scris `Surface(60, 60)` | `Surface((60, 60))` cu paranteze duble |

---

## Recapitulare pe scurt

- `pygame.draw.rect`, `circle`, `ellipse`, `line`, `polygon` desenează forme.
- Fără grosime, forma este **plină**; cu grosime, este doar **contur**.
- Ce se desenează mai târziu se vede **peste** ce s-a desenat mai devreme.
- `Rect` păstrează un dreptunghi și își calculează marginile și centrul.
- O `Surface` este o imagine pe care desenăm; o lipim cu `blit` de câte ori vrem.
- `pygame.image.save` / `pygame.image.load` salvează și încarcă imagini; `transform.scale`, `rotate`, `flip` le modifică.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Desenează **o hartă a unui joc** (iarbă, apă, drum) cu `for` în `for`.  
3. Creează **trei personaje diferite** și salvează-le ca imagini.  
4. **Bonus:** desenează un **robot** din forme, pe o `Surface`, și rotește-l în 4 poziții.  
5. Salvează totul ca `Tema_P4_L2_Prenume_Nume.py`.

---

## Ce urmează — Lecția 3
**Mișcare: bucla jocului**: personajul se mișcă singur, ricoșează și trăiește în bucla jocului.
