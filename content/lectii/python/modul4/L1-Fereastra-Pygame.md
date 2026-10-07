# LECȚIA 1 — Fereastra Pygame
**Modulul 4 · Jocuri cu Pygame · 2 ore**  
**Code Maker Club · Game Creator**

> Până acum ai desenat cu țestoasa. Acum trecem la **jocuri adevărate**! Folosim **Pygame**, o bibliotecă făcută special pentru jocuri: ferestre, culori, imagini, tastatură, mouse. Azi pornim prima fereastră și învățăm „inima” oricărui joc: **bucla jocului**.  
> Proiect: **„Ecranul meu de start”** · fișier: `Prenume_Nume_P4_L1.py`

---

## Obiectiv
La finalul orei ai Pygame instalat, deschizi o fereastră, o ții deschisă cu bucla jocului, o închizi corect (cu butonul X sau cu tasta Escape), schimbi culoarea fundalului, citești mărimea ferestrei și scrii text pe ecran.  
**Minim:** o fereastră care se deschide, are o culoare și se închide corect.  
**Ținta orei (Complet):** + fundal care se schimbă la tastă sau la click și ecranul de start cu text.

## De ce contează
Orice joc, de la cele mai simple la cele mai mari, are aceeași structură: o **buclă** care se repetă de zeci de ori pe secundă și, la fiecare repetare, **citește ce faci tu**, **schimbă lumea jocului** și **desenează totul din nou**. Azi construim exact scheletul acesta, iar în următoarele lecții îl umplem cu personaje.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Instalăm Pygame (**Exemplul 1**) |
| 15–40 | Prima fereastră și bucla jocului (**Exemplul 2**) |
| 40–60 | Culori RGB (**Exemplul 3**) |
| 60–75 | Evenimente: Escape și click (**Exemplele 4, 7, 8**) |
| 75–90 | Mărimea ferestrei și cadrele pe secundă (**Exemplele 5–6**) |
| 90–100 | Un cadru și text (**Exemplul 9**) |
| 100–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din Modulul 3

- Funcții cu `def`, bucle `while` și `for`, dicționare.
- Evenimente: „când apeși o tastă, execută o funcție”.
- Coordonatele ecranului și culori.

**Încearcă tu (3 min)**  
- [ ] Scrie un `while` care repetă până când scrii „stop” de la tastatură  

---

## 2. Instalăm Pygame

**Pygame** nu vine odată cu Python: trebuie să-l instalăm o singură dată. În Thonny:
1. alege din meniu **Tools → Manage packages...**;
2. scrie `pygame` în căsuța de căutare și apasă **Search on PyPI**;
3. dă click pe `pygame`, apoi pe **Install**;
4. așteaptă câteva secunde până se termină.

(Dacă nu merge, cere ajutorul profesorului sau al unui adult.)

### Exemplul 1 — Funcționează?

```python
import pygame

pygame.init()
print("Pygame 2 sau mai nou:", pygame.version.vernum[0] >= 2)
pygame.quit()
```

**Ieșire:**
```text
Pygame 2 sau mai nou: True
```

`import pygame` aduce biblioteca. `pygame.init()` o pornește, iar `pygame.quit()` o oprește. Dacă vezi `True`, totul este în regulă. (Pygame poate afișa și un rând cu versiunea și un salut; este normal.)

---

## 3. Prima fereastră

### Exemplul 2 — Fereastra și bucla jocului

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Prima mea fereastra")

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((30, 30, 60))
    pygame.display.flip()

pygame.quit()
print("Fereastra s-a inchis.")
```

**Ieșire:**
```text
Fereastra s-a inchis.
```

**Ce vezi pe ecran:** o fereastră de **600 × 400** cu titlul „Prima mea fereastra” și fundal albastru închis. Rămâne deschisă până apeși butonul **X** (închidere). Apoi, în Thonny, apare mesajul „Fereastra s-a inchis.”

Rând cu rând:
- `set_mode((600, 400))` creează fereastra (lățime, înălțime) și ne dă `ecran`, adică suprafața pe care desenăm;
- `while ruleaza:` este **bucla jocului**: se repetă cât timp `ruleaza` este `True`;
- `for eveniment in pygame.event.get()` ia toate lucrurile care s-au întâmplat (taste, mouse, închidere);
- dacă evenimentul este `pygame.QUIT` (ai apăsat X), punem `ruleaza = False`, iar bucla se oprește;
- `ecran.fill(culoare)` **umple tot ecranul** cu o culoare;
- `pygame.display.flip()` **arată** pe monitor ce am desenat.

---

## 4. Culori

### Exemplul 3 — Culorile RGB

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))

ROSU = (255, 0, 0)
VERDE = (0, 255, 0)
ALBASTRU = (0, 0, 255)
ALB = (255, 255, 255)
NEGRU = (0, 0, 0)
PORTOCALIU = (255, 140, 0)

print("Rosu are", ROSU[0], "rosu,", ROSU[1], "verde,", ROSU[2], "albastru")
print("Alb:", ALB, "Negru:", NEGRU)

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill(PORTOCALIU)
    pygame.display.flip()

pygame.quit()
```

**Ieșire:**
```text
Rosu are 255 rosu, 0 verde, 0 albastru
Alb: (255, 255, 255) Negru: (0, 0, 0)
```

**Ce vezi pe ecran:** o fereastră **portocalie**.

O culoare se scrie ca **trei numere** de la 0 la 255: cât **roșu**, cât **verde**, cât **albastru** conține (**RGB**). `(255, 0, 0)` este roșu pur, `(255, 255, 255)` este alb (totul la maxim), iar `(0, 0, 0)` este negru (nimic). Amestecând, obții orice culoare: `(255, 140, 0)` este portocaliu. Numele scrise cu litere mari (`ROSU`, `ALB`) sunt **constante**: valori care nu se schimbă.

---

## 5. Evenimente

### Exemplul 4 — Închidem cu Escape

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Apasa Escape ca sa inchizi")

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_ESCAPE:
                ruleaza = False

    ecran.fill((20, 60, 20))
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** o fereastră **verde închis**. Se închide și când apeși **X**, și când apeși tasta **Escape**.

`pygame.KEYDOWN` înseamnă „s-a apăsat o tastă”. Care tastă? Aflăm din `eveniment.key`: `pygame.K_ESCAPE`, `pygame.K_SPACE`, `pygame.K_LEFT`, `pygame.K_a`... Toate numele tastelor încep cu `K_`.

---

## 6. Mărime și viteză

### Exemplul 5 — Cât de mare este fereastra?

```python
import pygame

pygame.init()
LATIME = 800
INALTIME = 500
ecran = pygame.display.set_mode((LATIME, INALTIME))

print("Latime:", ecran.get_width())
print("Inaltime:", ecran.get_height())
print("Marime:", ecran.get_size())
print("Centrul ferestrei:", LATIME // 2, INALTIME // 2)

pygame.quit()
```

**Ieșire:**
```text
Latime: 800
Inaltime: 500
Marime: (800, 500)
Centrul ferestrei: 400 250
```

Punem lățimea și înălțimea în **constante** (`LATIME`, `INALTIME`), ca să le schimbăm într-un singur loc. Observă coordonatele în Pygame: **originea `(0, 0)` este în colțul din STÂNGA-SUS**. `x` crește spre **dreapta**, iar `y` crește în **jos** (invers față de Turtle!). Centrul ferestrei este la `(400, 250)`.

### Exemplul 6 — Cadre pe secundă

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
ceas = pygame.time.Clock()

cadre = 0
ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    cadre += 1
    pygame.display.set_caption("Cadre desenate: " + str(cadre))
    ecran.fill((40, 0, 60))
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** o fereastră **mov închis**, iar în titlul ei un **număr care crește foarte repede**: câte cadre s-au desenat.

`ceas.tick(60)` cere ca bucla să ruleze **cel mult 60 de ori pe secundă** (60 FPS, „frames per second”). Fără el, calculatorul ar repeta bucla de mii de ori pe secundă, degeaba. În 1 secundă, numărul din titlu crește cu aproximativ 60.

---

## 7. Interacțiuni simple

### Exemplul 7 — Culoarea se schimbă la tastă

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))

culori = [(200, 30, 30), (30, 160, 30), (30, 30, 200), (230, 200, 20)]
indice = 0

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_SPACE:
                indice = (indice + 1) % len(culori)

    ecran.fill(culori[indice])
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** fundalul începe **roșu**. De fiecare dată când apeși **bara de spațiu**, devine pe rând **verde**, **albastru**, **galben**, apoi din nou **roșu**.

Dacă recunoști `% len(culori)` din Modulul 3, ai dreptate: parcurge lista **în cerc**.

### Exemplul 8 — Culoarea se schimbă la click

```python
import random
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
culoare = (0, 0, 0)

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.MOUSEBUTTONDOWN:
            culoare = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))

    ecran.fill(culoare)
    pygame.display.flip()

pygame.quit()
```

**Ce vezi pe ecran:** fundal **negru**. La fiecare **click cu mouse-ul**, fundalul capătă o **culoare nouă, aleasă la întâmplare** (câte un număr de la 0 la 255 pentru roșu, verde și albastru).

`pygame.MOUSEBUTTONDOWN` apare când apeși un buton al mouse-ului. Poziția click-ului este în `eveniment.pos`, o pereche `(x, y)`.

---

## 8. Text pe ecran

### Exemplul 9 — Primul text

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((600, 400))
font = pygame.font.Font(None, 72)

text = font.render("Salut, Pygame!", True, (255, 255, 255))
print("Textul are marimea:", text.get_width() > 0, text.get_height() > 0)

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False

    ecran.fill((0, 80, 120))
    ecran.blit(text, (100, 160))
    pygame.display.flip()

pygame.quit()
```

**Ieșire:**
```text
Textul are marimea: True True
```

**Ce vezi pe ecran:** pe fundal albastru-verzui, textul alb **„Salut, Pygame!”**, cu litere mari, pornind din punctul `(100, 160)`.

Pașii pentru text sunt:
1. `pygame.font.Font(None, 72)` creează un **font** (litere) cu mărimea 72; `None` înseamnă fontul standard;
2. `font.render("text", True, culoare)` **transformă textul într-o imagine**; `True` înseamnă „fără zimți”, adică litere netede;
3. `ecran.blit(text, (x, y))` **lipește** imaginea pe ecran, cu colțul din stânga-sus la `(x, y)`.

Fontul standard nu are toate literele românești, deci în jocuri scriem fără diacritice.

---

## 9. Mini-proiect

### Exemplul 10 — Ecranul meu de start

```python
import pygame

pygame.init()
LATIME = 700
INALTIME = 450
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Jocul meu")
ceas = pygame.time.Clock()

font_titlu = pygame.font.Font(None, 90)
font_mic = pygame.font.Font(None, 36)

culori_fundal = [(20, 20, 60), (60, 20, 60), (20, 60, 60)]
indice = 0

def scrie_centrat(text, font, culoare, y):
    imagine = font.render(text, True, culoare)
    x = (LATIME - imagine.get_width()) // 2
    ecran.blit(imagine, (x, y))

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.KEYDOWN:
            if eveniment.key == pygame.K_ESCAPE:
                ruleaza = False
            if eveniment.key == pygame.K_SPACE:
                indice = (indice + 1) % len(culori_fundal)

    ecran.fill(culori_fundal[indice])
    pygame.draw.rect(ecran, (255, 255, 255), (10, 10, LATIME - 20, INALTIME - 20), 4)
    scrie_centrat("JOCUL MEU", font_titlu, (255, 220, 0), 120)
    scrie_centrat("Apasa SPATIU pentru alta culoare", font_mic, (255, 255, 255), 250)
    scrie_centrat("Escape = iesire", font_mic, (180, 180, 180), 300)
    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** o fereastră **700 × 450** cu fundal albastru închis, încadrată de o **ramă albă**. În mijloc, cu litere mari galbene, **„JOCUL MEU”**, iar dedesubt, două rânduri de text. La **SPAȚIU** fundalul își schimbă culoarea (albastru, mov, verde-albastrui), iar **Escape** închide jocul.

Ce este nou:
- `pygame.draw.rect(ecran, culoare, (x, y, lățime, înălțime), grosime)` desenează un dreptunghi; cu grosime 4 este doar **conturul**. Vom învăța mai multe în lecția următoare;
- funcția `scrie_centrat` calculează `x` ca textul să fie **la mijloc**: `(LATIME - lățimea textului) // 2`.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Ecranul meu de start” (obligatoriu)
Pornește de la Exemplul 10 și fă ecranul **al tău**:
1. alege un **titlu** pentru jocul tău (cum vrei să-l numești!);
2. alege **cel puțin 5 culori** de fundal;
3. adaugă la fiecare apăsare pe **săgeata dreapta** culoarea următoare și pe **săgeata stânga** culoarea anterioară;
4. afișează jos numărul culorii curente („Culoarea 2 din 5”);
5. închide jocul cu **Escape** și cu **X**.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
import pygame

pygame.init()
ecran = pygame.display.set_mode((400, 300))
print(ecran.get_width() // 2)
print(ecran.get_height() - 100)
print((255, 128, 0)[1])
pygame.quit()
```

### Exercițiul C — Culori făcute de tine
Alege 6 culori noi, scrie-le ca `(R, G, B)` și numește-le. Cum faci **un gri deschis**? Dar **un roz**? Indiciu: gri înseamnă că cele trei numere sunt egale.

### Exercițiul D — Găsește greșelile
Programul are 3 greșeli. Rescrie-l corect:

```text
import pygame
pygame.init()
ecran = pygame.display.set_mode(600, 400)
while ruleaza:
    for eveniment in pygame.event.get()
        if eveniment.type == pygame.QUIT:
            ruleaza = False
    ecran.fill((30, 30, 60))
    pygame.display.flip()
pygame.quit()
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce face bucla jocului și de ce se repetă?  
2. De ce se desenează totul din nou la fiecare cadru?  
3. Ce reprezintă numerele `(255, 140, 0)`?

**Gata când:**
- [ ] Ai Pygame instalat și fereastra se deschide  
- [ ] Ecranul de start are titlul și culorile tale  
- [ ] Săgețile stânga și dreapta schimbă culoarea  
- [ ] Jocul se închide cu X și cu Escape  
- [ ] Ai explicat pe foaie bucla jocului  
- [ ] Fișierul se numește `Prenume_Nume_P4_L1.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Fă fundalul să se schimbe **singur** la fiecare 2 secunde (indiciu: `pygame.time.get_ticks()`)  
- [ ] Afișează **coordonatele mouse-ului** în titlul ferestrei (`pygame.mouse.get_pos()`)  
- [ ] Desenează 3 dreptunghiuri colorate, unul sub altul, ca un steag  
- [ ] Fă fereastra **mai mare** și textul să rămână centrat  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `ModuleNotFoundError: No module named 'pygame'` | Pygame nu este instalat | Tools → Manage packages → pygame |
| Fereastra se deschide și se închide imediat | Lipsește bucla `while` | Pune codul într-un `while ruleaza:` |
| Fereastra „îngheață” și nu răspunde | Nu citești evenimentele | Apelează `pygame.event.get()` la fiecare cadru |
| Ecranul rămâne negru | Ai uitat `pygame.display.flip()` | `pygame.display.flip()` la sfârșitul cadrului |
| `TypeError: size must be two numbers` | `set_mode(600, 400)` fără paranteze duble | `set_mode((600, 400))` |
| Textul nu apare | Ai creat textul, dar nu l-ai lipit pe ecran | `ecran.blit(text, (x, y))` |
| Textul se vede doar un moment | `blit` este înainte de `fill`, deci este acoperit | Mai întâi `fill`, apoi `blit` |

---

## Recapitulare pe scurt

- Structura unui joc: `init` → bucla (`evenimente` → `actualizare` → `desenare` → `flip`) → `quit`.
- `pygame.display.set_mode((lățime, înălțime))` creează fereastra.
- `pygame.QUIT` apare când închizi fereastra; `KEYDOWN` la o tastă; `MOUSEBUTTONDOWN` la click.
- Culoarea este `(R, G, B)`, fiecare între 0 și 255.
- În Pygame, `(0, 0)` este în **stânga-sus**, iar `y` crește **în jos**.
- `font.render(...)` creează textul ca imagine, iar `ecran.blit(...)` îl lipește pe ecran.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Fă un **ecran de start** pentru jocul pe care îți dorești să-l faci în acest modul.  
3. Fă fereastra să afișeze în titlu **cât a trecut de la pornire** (în secunde).  
4. **Bonus:** fă o fereastră care devine **gri** la tasta `G`, **roșie** la `R` și **albastră** la `B`.  
5. Salvează totul ca `Tema_P4_L1_Prenume_Nume.py`.

---

## Ce urmează — Lecția 2
**Forme, culori și imagini**: desenăm dreptunghiuri, cercuri, linii și creăm imaginile pentru personajele noastre.
