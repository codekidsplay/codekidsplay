# LECȚIA 8 — Fișiere și try/except: salvăm recordul
**Modulul 4 · Jocuri cu Pygame · 2 ore**  
**Code Maker Club · Game Creator**

> Ai doborât recordul, închizi jocul... și a doua zi recordul a dispărut! De ce? Pentru că variabilele trăiesc doar **cât rulează programul**. Ca să păstrăm lucrurile, le scriem într-un **fișier**. Dar ce faci dacă fișierul **nu există** sau conține prostii? Programul nu trebuie să se strice, iar pentru asta există **`try / except`**. La final construim „Click rapid”, un joc cu top 5 salvat în fișier.  
> Proiect: **„Click rapid”** · fișier: `Prenume_Nume_P4_L8.py`

---

## Obiectiv
La finalul orei scrii și citești fișiere text cu `with open`, adaugi linii la un fișier existent, tratezi erorile cu `try / except`, salvezi date cu `json`, păstrezi un record și un top și construiești un joc care își amintește scorurile.  
**Minim:** salvezi și citești un record dintr-un fișier.  
**Ținta orei (Complet):** + tratarea erorilor, top 5 și jocul „Click rapid”.

## De ce contează
Aproape orice joc își salvează ceva: recordul, nivelul atins, setările. Iar orice program care citește fișiere trebuie să se descurce și atunci când ceva nu merge, fără să se „blocheze” cu un mesaj roșu.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L7 |
| 10–35 | Scriem și citim fișiere (**Exemplele 1–2**) |
| 35–60 | `try / except` (**Exemplele 3–5**) |
| 60–85 | Record, top, `json` (**Exemplele 6–9**) |
| 85–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

> **Important:** salvează **mai întâi** programul (în Thonny: *File → Save*), într-un folder al tău. Fișierele create de program apar **în același folder** cu programul.

---

## 1. Recapitulare rapidă din L7

- O clasă este o rețetă, un obiect este lucrul făcut după ea.
- `__init__`, `self`, metode și atribute.
- Obiectele se păstrează în liste.

**Încearcă tu (3 min)**  
- [ ] Scrie o clasă `Mingea` cu `__init__(self, raza)` și o metodă `diametru()`  

---

## 2. Fișiere

### Exemplul 1 — Scriem și citim

```python
with open("mesaj.txt", "w") as f:
    f.write("Salut, Python!\n")
    f.write("Ma numesc Ana.\n")

with open("mesaj.txt", "r") as f:
    continut = f.read()

print(continut, end="")
print("Lungime:", len(continut))
```

**Ieșire:**
```text
Salut, Python!
Ma numesc Ana.
Lungime: 30
```

- `open("mesaj.txt", "w")` deschide fișierul pentru **scris** (`w` = write). Dacă fișierul există, **conținutul vechi se șterge**!
- `"r"` (read) deschide pentru **citit**;
- `with ... as f:` deschide fișierul și îl **închide singur** când ieșim din bloc. Folosește-l mereu;
- `f.write(text)` scrie **doar texte**. `\n` înseamnă „rând nou”; fără el, totul ajunge pe aceeași linie;
- `f.read()` citește **tot** fișierul ca un singur text. `end=""` oprește `print` să mai adauge un rând nou.

### Exemplul 2 — Adăugăm și citim linie cu linie

```python
with open("scoruri.txt", "w") as f:
    f.write("10\n25\n7\n")

with open("scoruri.txt", "a") as f:
    f.write("40\n")

scoruri = []
with open("scoruri.txt", "r") as f:
    for linie in f:
        text = linie.strip()
        if text != "":
            scoruri.append(int(text))

print("Scoruri:", scoruri)
print("Suma:", sum(scoruri))
print("Cel mai mare:", max(scoruri))
```

**Ieșire:**
```text
Scoruri: [10, 25, 7, 40]
Suma: 82
Cel mai mare: 40
```

- `"a"` (append) **adaugă la sfârșit**, fără să șteargă ce era;
- `for linie in f:` parcurge fișierul **o linie pe rând**;
- `linie.strip()` scoate rândul nou (`\n`) și spațiile de la capete;
- Tot ce citim din fișier este **text**, așa că `int(text)` îl transformă în număr.

---

## 3. try / except

### Exemplul 3 — Fișier care nu există

```python
try:
    with open("fisier_care_nu_exista.txt", "r") as f:
        print(f.read())
except FileNotFoundError:
    print("Nu am gasit fisierul!")

print("Programul merge mai departe.")
```

**Ieșire:**
```text
Nu am gasit fisierul!
Programul merge mai departe.
```

Fără `try`, programul ar „muri” cu o eroare roșie. Cu `try / except`, Python **încearcă** ce e în `try`; dacă apare eroarea numită în `except`, rulează codul de acolo, iar programul **continuă**. Ca să nu ascunzi greșeli, **scrie tipul erorii** (`FileNotFoundError`), nu un `except` gol.

### Exemplul 4 — Text în loc de număr

```python
cuvinte = ["12", "abc", "7", "", "3.5"]
total = 0

for c in cuvinte:
    try:
        numar = int(c)
        total += numar
        print(repr(c), "-> numar:", numar)
    except ValueError:
        print(repr(c), "-> nu e numar intreg, il sar")

print("Total:", total)
```

**Ieșire:**
```text
'12' -> numar: 12
'abc' -> nu e numar intreg, il sar
'7' -> numar: 7
'' -> nu e numar intreg, il sar
'3.5' -> nu e numar intreg, il sar
Total: 19
```

`int("abc")`, `int("")` și chiar `int("3.5")` dau **`ValueError`**. `repr(c)` afișează textul **între ghilimele**, ca să vezi clar cum arată (inclusiv textul gol `''`). În buclă, o valoare greșită nu oprește programul, doar este sărită.

### Exemplul 5 — Citirea sigură a recordului

```python
def citeste_record(fisier):
    try:
        with open(fisier, "r") as f:
            return int(f.read().strip())
    except FileNotFoundError:
        return 0
    except ValueError:
        return 0

with open("record_bun.txt", "w") as f:
    f.write("35")
with open("record_stricat.txt", "w") as f:
    f.write("abc")

print(citeste_record("record_bun.txt"))
print(citeste_record("record_stricat.txt"))
print(citeste_record("record_inexistent.txt"))
```

**Ieșire:**
```text
35
0
0
```

Funcția întoarce **0** în loc să se strice, în două situații: fișierul lipsește (`FileNotFoundError`) sau conține altceva decât un număr (`ValueError`). Prima rulare a jocului, când nu există încă niciun record, merge perfect. Observă că putem pune **mai multe** `except` la rând, câte unul pentru fiecare tip de eroare.

---

## 4. Record, top, json

### Exemplul 6 — Păstrăm recordul

```python
import os

FISIER = "record_test.txt"
if os.path.exists(FISIER):
    os.remove(FISIER)

def citeste_record():
    try:
        with open(FISIER, "r") as f:
            return int(f.read().strip())
    except (FileNotFoundError, ValueError):
        return 0

def salveaza_daca_e_record(scor):
    record = citeste_record()
    if scor > record:
        with open(FISIER, "w") as f:
            f.write(str(scor))
        print("Record nou:", scor)
        return True
    print("Scor", scor, "- recordul ramane", record)
    return False

salveaza_daca_e_record(10)
salveaza_daca_e_record(5)
salveaza_daca_e_record(12)
print("Din fisier:", citeste_record())
```

**Ieșire:**
```text
Record nou: 10
Scor 5 - recordul ramane 10
Record nou: 12
Din fisier: 12
```

- `except (FileNotFoundError, ValueError):` prinde **oricare** dintre cele două erori;
- `os.path.exists(nume)` verifică dacă un fișier există, iar `os.remove(nume)` îl șterge (aici îl ștergem la început, ca să pornim mereu de la zero);
- `str(scor)`: în fișier putem scrie doar **text**, așa că numărul trebuie transformat.

### Exemplul 7 — Topul scorurilor

```python
FISIER = "top_test.txt"

def salveaza_top(top):
    with open(FISIER, "w") as f:
        for scor, nume in top:
            f.write(nume + "," + str(scor) + "\n")

def citeste_top():
    top = []
    try:
        with open(FISIER, "r") as f:
            for linie in f:
                parti = linie.strip().split(",")
                try:
                    top.append((int(parti[1]), parti[0]))
                except (ValueError, IndexError):
                    print("Linie stricata, o sar:", repr(linie.strip()))
    except FileNotFoundError:
        pass
    top.sort(reverse=True)
    return top

salveaza_top([(12, "Ana"), (30, "Mihai"), (21, "Ioana"), (5, "Radu")])
with open(FISIER, "a") as f:
    f.write("linie fara scor\n")
    f.write("Dan,zece\n")

top = citeste_top()
loc = 1
for scor, nume in top[:3]:
    print(str(loc) + ".", nume, "-", scor, "puncte")
    loc += 1
```

**Ieșire:**
```text
Linie stricata, o sar: 'linie fara scor'
Linie stricata, o sar: 'Dan,zece'
1. Mihai - 30 puncte
2. Ioana - 21 puncte
3. Ana - 12 puncte
```

Fiecare linie din fișier arată așa: `Ana,12`. `split(",")` o desparte în **listă** (`["Ana", "12"]`). Păstrăm datele ca perechi `(scor, nume)`, pentru că `top.sort(reverse=True)` sortează întâi după **scor**, de la cel mai mare. Liniile stricate („linie fără scor” → `IndexError`, „Dan,zece” → `ValueError`) sunt **sărite**, iar topul rămâne corect. `top[:3]` păstrează doar primele **trei** elemente.

### Exemplul 8 — `else` și `finally`

```python
def medie_din_fisier(nume):
    try:
        with open(nume, "r") as f:
            note = []
            for linie in f:
                text = linie.strip()
                try:
                    note.append(int(text))
                except ValueError:
                    print("  sar linia:", repr(text))
            medie = sum(note) / len(note)
    except FileNotFoundError:
        print("  fisierul nu exista")
    except ZeroDivisionError:
        print("  nu am gasit nicio nota")
    else:
        print(f"  media este {medie:.1f}")
    finally:
        print("  (am terminat cu", nume + ")")

with open("note.txt", "w") as f:
    f.write("9\n8\nfoarte bine\n10\n")
with open("gol.txt", "w") as f:
    f.write("")

medie_din_fisier("note.txt")
medie_din_fisier("gol.txt")
medie_din_fisier("lipsa.txt")
```

**Ieșire:**
```text
  sar linia: 'foarte bine'
  media este 9.0
  (am terminat cu note.txt)
  nu am gasit nicio nota
  (am terminat cu gol.txt)
  fisierul nu exista
  (am terminat cu lipsa.txt)
```

- `else` rulează **doar dacă nu a apărut nicio eroare**;
- `finally` rulează **întotdeauna** (cu sau fără eroare). Bun pentru „curățenie” sau mesaje de final;
- `ZeroDivisionError` apare la `sum(note) / len(note)` când lista este goală (împărțire la 0);
- Observă că `try` poate fi **în interiorul altui `try`**: cel interior tratează linia greșită, cel exterior tratează fișierul.

### Exemplul 9 — Salvăm un dicționar cu `json`

```python
import json

def salveaza(fisier, date):
    with open(fisier, "w") as f:
        json.dump(date, f)

def incarca(fisier, implicit):
    try:
        with open(fisier, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return implicit

jucator = {"nume": "Ana", "nivel": 3, "inventar": ["sabie", "scut"]}
salveaza("jucator.json", jucator)

with open("jucator.json", "r") as f:
    print(f.read())

citit = incarca("jucator.json", {})
citit["nivel"] += 1
citit["inventar"].append("potiune")
print(citit)

print(incarca("nu_exista.json", {"nivel": 1}))

with open("stricat.json", "w") as f:
    f.write("{asta nu e json")
print(incarca("stricat.json", {"nivel": 1}))
```

**Ieșire:**
```text
{"nume": "Ana", "nivel": 3, "inventar": ["sabie", "scut"]}
{'nume': 'Ana', 'nivel': 4, 'inventar': ['sabie', 'scut', 'potiune']}
{'nivel': 1}
{'nivel': 1}
```

Cu modulul **`json`** poți salva dintr-o dată un dicționar sau o listă întreagă (cu numere, texte, liste în ele), fără să împarți tu textul pe linii. `json.dump(date, f)` scrie, iar `json.load(f)` citește și îți dă înapoi **dicționarul**. Dacă fișierul lipsește sau e stricat, funcția `incarca` întoarce valoarea **implicită**, așa că jocul pornește cu setări de bază.

---

## 5. Mini-proiect

### Exemplul 10 — „Click rapid”

```python
import random
import time
import pygame

FISIER = "top_click.txt"

def citeste_top():
    top = []
    try:
        with open(FISIER, "r") as f:
            for linie in f:
                parti = linie.strip().split(",")
                try:
                    top.append((int(parti[1]), parti[0]))
                except (ValueError, IndexError):
                    pass
    except FileNotFoundError:
        pass
    top.sort(reverse=True)
    return top[:5]

def salveaza_top(top):
    with open(FISIER, "w") as f:
        for scor, nume in top:
            f.write(nume + "," + str(scor) + "\n")

nume = input("Numele tau (fara diacritice): ").strip().replace(",", " ")
if nume == "":
    nume = "Anonim"

pygame.init()
LATIME = 600
INALTIME = 450
ecran = pygame.display.set_mode((LATIME, INALTIME))
pygame.display.set_caption("Click rapid")
ceas = pygame.time.Clock()
font = pygame.font.Font(None, 36)
font_mare = pygame.font.Font(None, 80)

DURATA = 15
tinta = pygame.Rect(0, 0, 60, 60)

def muta_tinta():
    tinta.x = random.randint(20, LATIME - 80)
    tinta.y = random.randint(70, INALTIME - 80)

def scrie(text, x, y, culoare=(255, 255, 255), fnt=None, centrat=False):
    if fnt is None:
        fnt = font
    imagine = fnt.render(text, True, culoare)
    if centrat:
        x = x - imagine.get_width() // 2
    ecran.blit(imagine, (x, y))

top = citeste_top()
stare = "joc"
scor = 0
start = time.time()
muta_tinta()

ruleaza = True
while ruleaza:
    for eveniment in pygame.event.get():
        if eveniment.type == pygame.QUIT:
            ruleaza = False
        if eveniment.type == pygame.MOUSEBUTTONDOWN and stare == "joc":
            if tinta.collidepoint(eveniment.pos):
                scor += 1
                muta_tinta()
        if eveniment.type == pygame.KEYDOWN and eveniment.key == pygame.K_r and stare == "final":
            stare = "joc"
            scor = 0
            start = time.time()
            muta_tinta()

    ramas = DURATA - (time.time() - start)
    if stare == "joc" and ramas <= 0:
        stare = "final"
        top.append((scor, nume))
        top.sort(reverse=True)
        top = top[:5]
        salveaza_top(top)

    ecran.fill((25, 30, 60))
    if stare == "joc":
        pygame.draw.circle(ecran, (255, 80, 80), tinta.center, 30)
        pygame.draw.circle(ecran, (255, 255, 255), tinta.center, 18)
        pygame.draw.circle(ecran, (255, 80, 80), tinta.center, 8)
        scrie("Scor: " + str(scor), 15, 15)
        scrie("Timp: " + str(int(ramas) + 1), LATIME - 130, 15)
        if len(top) > 0:
            scrie("Record: " + str(top[0][0]), LATIME // 2, 15, (255, 220, 0), None, True)
    else:
        scrie("TIMPUL A TRECUT!", LATIME // 2, 30, (255, 120, 120), font_mare, True)
        scrie("Scorul tau: " + str(scor), LATIME // 2, 110, (255, 255, 255), None, True)
        scrie("TOP 5", LATIME // 2, 160, (255, 220, 0), None, True)
        loc = 1
        for s, n in top:
            scrie(str(loc) + ". " + n + " - " + str(s), LATIME // 2, 160 + loc * 35, (220, 220, 220), None, True)
            loc += 1
        scrie("R = joc nou", LATIME // 2, INALTIME - 40, (120, 255, 120), None, True)

    pygame.display.flip()
    ceas.tick(60)

pygame.quit()
```

**Ce vezi pe ecran:** programul te întreabă întâi **numele** în consolă (în Thonny, în fereastra *Shell*). Apoi se deschide jocul: pe fundal albastru închis apare o **țintă** (cerc roșu cu alb și roșu în el). Ai **15 secunde** să dai click pe ea cât poți de repede. De fiecare dată când o nimerești, scorul crește, iar ținta **sare în alt loc**. Sus vezi **scorul**, **timpul rămas** și **recordul**. Când timpul se termină, apare **„TIMPUL A TRECUT!”**, scorul tău și **TOP 5**. Tasta **R** pornește o nouă rundă.

Topul rămâne în fișierul `top_click.txt` (în folderul programului): **închide jocul și deschide-l mâine**, iar scorurile vor fi tot acolo! Dacă fișierul lipsește sau e stricat, jocul pornește cu un top gol, fără erori.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Click rapid” (obligatoriu)
Pornește de la Exemplul 10 și fă jocul **al tău**:
1. schimbă **ținta** (o față zâmbitoare, o bulină, o pizza etc.) și **culorile**;
2. adaugă **viteză**: ținta devine mai mică la fiecare 5 puncte;
3. adaugă **o țintă „rea”** (albastră): dacă dai click pe ea, pierzi 2 puncte;
4. păstrează topul în fișier, cu `try / except` pentru fișier lipsă sau stricat;
5. afișează **„Record nou!”** când scorul este cel mai mare din top.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
with open("t.txt", "w") as f:
    f.write("1\n2\n3\n")

total = 0
with open("t.txt") as f:
    for linie in f:
        total += int(linie)
print(total)

try:
    print(int("zece"))
except ValueError:
    print("Nu e numar")
print("Gata")
```

### Exercițiul C — Jurnalul meu
Scrie un program care te întreabă (`input`) ce ai făcut azi și **adaugă** răspunsul într-un fișier `jurnal.txt` (cu `"a"`). La final, citește fișierul și afișează toate zilele salvate, numerotate.

### Exercițiul D — Găsește greșelile
Programul are 3 greșeli. Rescrie-l corect:

```text
with open("scor.txt", "r") as f
    continut = f.read
scor = int(continut)
print("Scor: " + scor)
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce dispar variabilele când închizi programul și cum rezolvăm asta?  
2. Care este diferența dintre `"w"` și `"a"`?  
3. La ce folosește `try / except`? Dă un exemplu.

**Gata când:**
- [ ] Jocul salvează topul în fișier și îl citește la pornire  
- [ ] Merge și când fișierul lipsește sau este stricat  
- [ ] Ai țintă „rea” și ținta devine mai mică  
- [ ] Ai explicat pe foaie `"w"`, `"a"` și `try / except`  
- [ ] Fișierul se numește `Prenume_Nume_P4_L8.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Salvează cu `json` **setările** jocului (culoarea țintei, durata rundei)  
- [ ] Adaugă un meniu de **setări** care schimbă durata (10, 15 sau 30 de secunde), salvată în fișier  
- [ ] Salvează și **data** scorului (`import time` și `time.strftime("%d.%m.%Y")`)  
- [ ] Fă o opțiune „Șterge topul” cu **confirmare**  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `FileNotFoundError: [Errno 2] No such file or directory: 'x.txt'` | Fișierul nu există (sau ești în alt folder) | `try / except FileNotFoundError` și salvează programul în folderul tău |
| `ValueError: invalid literal for int() with base 10: 'abc'` | Textul nu este un număr | `try / except ValueError` |
| `io.UnsupportedOperation: not writable` | Ai deschis cu `"r"` și ai scris | Deschide cu `"w"` sau `"a"` |
| `TypeError: write() argument must be str, not int` | Ai scris un număr în fișier | `f.write(str(scor))` |
| `ValueError: I/O operation on closed file.` | Ai folosit `f` după ce blocul `with` s-a terminat | Folosește `f` doar în blocul `with` |
| Tot ce era în fișier a dispărut | Ai deschis cu `"w"` în loc de `"a"` | `"a"` ca să **adaugi** |
| Numerele din fișier se lipesc (`1020`) | Ai uitat `\n` | `f.write(str(n) + "\n")` |

---

## Recapitulare pe scurt

- Variabilele dispar când programul se închide, fișierele **rămân**.
- `with open(nume, "w"/"a"/"r") as f:` scrie, adaugă sau citește și se închide singur.
- În fișiere scriem **text**; la citire transformăm cu `int(...)`.
- `try / except TipEroare:` prinde erorile și programul merge mai departe.
- `else` rulează dacă nu a fost eroare, `finally` rulează mereu.
- `json.dump` și `json.load` salvează dicționare și liste întregi.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny.  
2. Fă un joc la alegere (de exemplu „Strânge monedele” din Lecția 5) care **salvează recordul** într-un fișier.  
3. Adaugă în „Click rapid” **trei dificultăți** (ușor, mediu, greu), fiecare cu **topul ei** (un fișier pentru fiecare).  
4. **Bonus:** salvează cu `json` tot progresul unui joc (nivel, vieți, scor) și reia-l la următoarea pornire.  
5. Salvează totul ca `Tema_P4_L8_Prenume_Nume.py`.

---

## Ce urmează — Lecția 9
**Proiect final: jocul meu**: începem să construim un joc complet, cu toate lucrurile învățate în acest modul.
