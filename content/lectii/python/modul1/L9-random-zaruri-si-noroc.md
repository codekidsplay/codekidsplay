# LECȚIA 9 — `random`: zaruri și noroc
**Modulul 1 · Primii pași în Python · 2 ore**  
**Code Maker Club · Python Starter**

> Jocurile nu ar fi distractive dacă ar fi mereu la fel. Azi aduci **norocul** în programe: arunci zaruri, alegi la întâmplare și faci jocuri în care nimeni nu știe ce urmează.  
> Proiect: **„Oracolul”** · fișier: `Prenume_Nume_P1_L9.py`

---

## Obiectiv
La finalul orei folosești `import`, `random.randint()`, `random.choice()` și `random.random()`, pui valori într-o **listă simplă** și combini norocul cu `if`.  
**Minim:** un program care aruncă un zar și afișează rezultatul cu un mesaj.  
**Ținta orei (Complet):** + două zaruri, o monedă, alegerea unui element dintr-o listă și un joc de ghicit.

## De ce contează
Aproape orice joc folosește numere aleatoare: zarurile din jocurile de societate, locul în care apare o monedă, ce inamic vine acum. Aceeași tehnică stă și în spatele mesajelor „surpriză” din aplicații.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L8 |
| 10–35 | Ce este un modul · `import random` · zarul (**Exemplele 1–2**) |
| 35–55 | Alte tipuri de numere aleatoare (**Exemplul 3**) |
| 55–80 | Liste simple și `random.choice` (**Exemplele 4–5**) |
| 80–100 | Noroc + `if` (**Exemplele 6–8**) |
| 100–115 | Mini-proiect (**Exemplele 9–10**) |
| 115–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L8

- `and`, `or`, `not` leagă condițiile.
- `if`, `elif`, `else` aleg ce se execută.
- `int(input(...))` citește un număr.

**Încearcă tu (3 min)**  
- [ ] Scrie un `if` cu `and` care verifică dacă un număr e între 10 și 20  

---

## 2. Modulul `random`

Python vine cu multe **module**: colecții de comenzi gata făcute pe un anumit subiect. Ca să le folosești, scrii la **începutul** programului:

```text
import random
```

Apoi apelezi comenzile cu numele modulului: `random.randint(...)`.

### Exemplul 1 — Aruncăm un zar

```python
import random

zar = random.randint(1, 6)
print("Ai aruncat:", zar)
```

**Ieșire (la tine va fi alta, pentru că e la întâmplare):**
```text
Ai aruncat: 4
```

`random.randint(a, b)` alege un număr **întreg la întâmplare** între `a` și `b`, **inclusiv ambele capete**. Rulează programul de mai multe ori: de fiecare dată iese altceva.

### Exemplul 2 — Două zaruri

```python
import random

zar1 = random.randint(1, 6)
zar2 = random.randint(1, 6)
print(f"Zarurile: {zar1} si {zar2}")
print(f"Suma: {zar1 + zar2}")
if zar1 == zar2:
    print("Dubla! Mai arunci o data!")
```

**Ieșire (exemplu):**
```text
Zarurile: 3 si 3
Suma: 6
Dubla! Mai arunci o data!
```

Cele două zaruri sunt **independente**: fiecare apel la `randint` dă un număr nou.

### Exemplul 3 — Numere cu zecimale

```python
import random

a = random.random()
b = random.uniform(10, 20)
print(a)
print(b)
print(round(b, 1))
```

**Ieșire (exemplu):**
```text
0.7371528614
12.846331225
12.8
```

| Comandă | Ce face |
|---------|---------|
| `random.random()` | număr cu zecimale între `0` și `1` |
| `random.uniform(a, b)` | număr cu zecimale între `a` și `b` |

(Numerele de la tine vor arăta altfel și vor avea mai multe zecimale.)

---

## 3. Liste simple și `random.choice`

O **listă** ține mai multe lucruri în aceeași cutie. Le pui între **paranteze pătrate** `[ ]`, separate prin virgulă. Ca la text, primul element are indexul `0`. Despre liste vom învăța mult mai multe în Modulul 2; azi ne trebuie doar atât.

### Exemplul 4 — Alegem la întâmplare

```python
import random

culori = ["rosu", "verde", "albastru", "galben"]
print(culori[0])
print(len(culori))
print(random.choice(culori))
```

**Ieșire (exemplu):**
```text
rosu
4
albastru
```

`random.choice(lista)` alege **un element** din listă, la întâmplare. Primele două linii arată că ai acces la elemente cu `[ ]`, ca la text, și că `len` merge și pe liste.

### Exemplul 5 — Moneda

```python
import random

fata = random.choice(["cap", "pajura"])
print("Moneda a picat pe:", fata)
if fata == "cap":
    print("Tu pornesti primul!")
else:
    print("Pornesc eu primul!")
```

**Ieșire (exemplu):**
```text
Moneda a picat pe: pajura
Pornesc eu primul!
```

Poți scrie lista direct în `choice(...)`, fără să-i dai un nume.

---

## 4. Norocul și deciziile

### Exemplul 6 — Zarul norocos

```python
import random

zar = random.randint(1, 6)
print("Ai dat:", zar)
if zar == 6:
    print("Super noroc! Primesti 100 de puncte.")
elif zar >= 4:
    print("Bine! Primesti 20 de puncte.")
else:
    print("Poate data viitoare.")
```

**Ieșire (exemplu):**
```text
Ai dat: 5
Bine! Primesti 20 de puncte.
```

### Exemplul 7 — Ghicește numărul (o încercare)

```python
import random

secret = random.randint(1, 5)
ghici = int(input("Ghiceste numarul (1-5): "))
if ghici == secret:
    print("Bravo, ai ghicit!")
else:
    print(f"Nu. Numarul era {secret}.")
```

**Ieșire (exemplu, dacă numărul secret a fost 2):**
```text
Ghiceste numarul (1-5): 3
Nu. Numarul era 2.
```

Calculatorul alege un număr **în secret**, tu încerci să-l ghicești. În lecțiile din Modulul 2 vom lăsa jucătorul să încerce de mai multe ori.

### Exemplul 8 — Cât de norocos ești azi?

```python
import random

noroc = random.randint(0, 100)
print(f"Norocul tau azi: {noroc}%")
if noroc > 80:
    print("Zi grozava! Joaca-te la loto :)")
elif noroc > 40:
    print("O zi obisnuita.")
else:
    print("Fii atent la pasi azi.")
```

**Ieșire (exemplu):**
```text
Norocul tau azi: 63%
O zi obisnuita.
```

---

## 5. Mini-proiecte

### Exemplul 9 — Piatră, foarfecă, hârtie (jumătate)

```python
import random

alegere_ta = input("piatra, foarfeca sau hartie? ").lower()
alegere_pc = random.choice(["piatra", "foarfeca", "hartie"])
print("Calculatorul a ales:", alegere_pc)

if alegere_ta == alegere_pc:
    print("Egalitate!")
elif (alegere_ta == "piatra" and alegere_pc == "foarfeca") or \
     (alegere_ta == "foarfeca" and alegere_pc == "hartie") or \
     (alegere_ta == "hartie" and alegere_pc == "piatra"):
    print("Ai castigat!")
else:
    print("Ai pierdut!")
```

**Ieșire (exemplu):**
```text
piatra, foarfeca sau hartie? piatra
Calculatorul a ales: foarfeca
Ai castigat!
```

Semnul `\` la finalul unui rând spune lui Python: „condiția continuă pe rândul următor”. Așa nu avem un rând prea lung.

### Exemplul 10 — Oracolul

```python
import random

print("=== Oracolul ===")
intrebare = input("Pune o intrebare cu raspuns da/nu: ")
raspunsuri = [
    "Da, sigur!",
    "Cu siguranta nu.",
    "Poate...",
    "Intreaba mai tarziu.",
    "Stelele spun da.",
    "Nu conta pe asta.",
]
numar = random.randint(1, 6)
print("-" * 25)
print(f"Intrebarea ta: {intrebare}")
print("Raspunsul oracolului:", random.choice(raspunsuri))
print(f"Numarul tau norocos: {numar}")
```

**Ieșire (exemplu):**
```text
=== Oracolul ===
Pune o intrebare cu raspuns da/nu: Voi lua nota 10?
-------------------------
Intrebarea ta: Voi lua nota 10?
Raspunsul oracolului: Poate...
Numarul tau norocos: 4
```

Lista de răspunsuri a fost scrisă pe mai multe rânduri, ca să fie ușor de citit; Python o înțelege la fel.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Oracolul” (obligatoriu)
Scrie un program care:
1. întreabă ceva de la utilizator;
2. alege la întâmplare dintr-o **listă cu cel puțin 6 răspunsuri** (alege-le tu, amuzante);
3. afișează un **număr norocos** între 1 și 100;
4. folosește `random.choice`, `random.randint` și un `if` care comentează numărul (mare / mic).

### Exercițiul B — Ce se poate afișa?
Fără să rulezi, spune care dintre valori **pot** apărea și care **nu pot** apărea:
1. `random.randint(1, 6)` → 0, 3, 6, 7  
2. `random.choice(["a", "b"])` → "a", "c", "b"  
3. `random.randint(5, 5)` → 4, 5  

### Exercițiul C — Zarul cu fețe multiple
Citește câte fețe are zarul (de exemplu 20) și aruncă-l o dată. Afișează rezultatul.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
zar = random.randint(1, 6)
import random
print("Zar:" zar)
culori = ("rosu", "verde")
print(random.Choice(culori))
if zar = 6:
    print("Noroc")
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce scriem `import random` la început?  
2. Poate `random.randint(1, 6)` să dea 6? Dar 7?  
3. Ce face `random.choice(lista)`?

**Gata când:**
- [ ] Programul importă `random`  
- [ ] Alege dintr-o listă cu cel puțin 6 elemente  
- [ ] Afișează un număr norocos  
- [ ] Rulezi programul de cel puțin 5 ori și vezi rezultate diferite  
- [ ] Ai explicat pe foaie de ce scriem `import random`  
- [ ] Fișierul se numește `Prenume_Nume_P1_L9.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Un joc **Aruncă zarurile**: aruncă tu și calculatorul două zaruri, iar cine are suma mai mare câștigă  
- [ ] **Generator de nume de dragon**: alege la întâmplare un prenume și un nume dintr-o listă, apoi lipește-le  
- [ ] Un program care alege **cine strânge masa**: citește 3 nume și alege unul  
- [ ] **Roata norocului**: o listă cu premii, alege unul și afișează-l  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `NameError: name 'random' is not defined` | Ai uitat `import random` | Pune `import random` la început |
| `AttributeError: module 'random' has no attribute 'Choice'` | `choice` se scrie cu literă mică | `random.choice(...)` |
| Programul dă mereu același rezultat | Ai pus un număr fix, nu `random` | Folosește `random.randint(...)` |
| `random.randint(6)` dă eroare | Lipsește un capăt | `random.randint(1, 6)` |
| `IndexError: list index out of range` | Ai cerut un index prea mare | La o listă de 4 elemente, ultimul index e 3 |
| `TypeError` la `random.choice(5)` | `choice` cere o listă (sau text) | `random.choice([1, 2, 3])` |
| Ai numit fișierul `random.py` | Python nu mai găsește modulul adevărat | Redenumește fișierul în `Prenume_Nume_P1_L9.py` |

---

## Recapitulare pe scurt

- Un **modul** este o colecție de comenzi; îl aduci cu `import modul`.
- `random.randint(a, b)` dă un întreg între `a` și `b`, **inclusiv** capetele.
- `random.random()` și `random.uniform(a, b)` dau numere cu zecimale.
- O **listă** se scrie între `[ ]`; `random.choice(lista)` alege un element.
- Norocul se combină cu `if` pentru jocuri.
- `\` la capătul rândului continuă condiția pe rândul următor.
- Niciodată nu numi fișierul ca un modul (`random.py`).

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie un joc „Zarul de aur”: aruncă 3 zaruri și dă puncte după sumă (mare, medie, mică).  
3. Scrie un program care alege **un prieten** dintr-o listă de 5 nume și afișează „Azi ți-e ziua norocoasă, …”.  
4. **Bonus:** fă o „monedă încărcată”: 70% șanse pe cap, folosind `random.randint(1, 10)` (cap dacă numărul e între 1 și 7).  
5. Salvează totul ca `Tema_P1_L9_Prenume_Nume.py`.

---

## Ce urmează — Lecția 10
**Proiect de modul**: „Generatorul de povești”, în care folosești tot ce ai învățat: `input`, variabile, f-string, `if` și `random`.
