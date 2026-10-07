# LECȚIA 8 — Funcții I
**Modulul 2 · Repetăm, colecționăm, organizăm · 2 ore**  
**Code Maker Club · Python Builder**

> Ai folosit deja funcții făcute de alții: `print`, `len`, `input`. Azi îți faci **propriile funcții**: bucăți de program cu nume, pe care le chemi de câte ori vrei.  
> Proiect: **„Cutia cu unelte”** · fișier: `Prenume_Nume_P2_L8.py`

---

## Obiectiv
La finalul orei definești funcții cu `def`, le apelezi, le dai **parametri**, folosești `return` pentru a primi un rezultat, înțelegi diferența dintre `print` și `return` și lucrezi cu valori implicite.  
**Minim:** două funcții, una fără parametri și una cu un parametru.  
**Ținta orei (Complet):** + o funcție care returnează un rezultat, una cu valoare implicită și o „cutie cu unelte” de 4 funcții.

## De ce contează
Imaginează-ți că ai scris o dată cum se desenează un chenar frumos. Fără funcții, ai copia codul de fiecare dată. Cu o funcție, îi spui doar numele. Programele mari se fac din sute de funcții mici.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L7 |
| 10–30 | `def` și apelul (**Exemplul 1**) |
| 30–55 | Parametri (**Exemplele 2–3**) |
| 55–80 | `return` (**Exemplele 4–6**) |
| 80–95 | Valori implicite, variabile locale (**Exemplele 7–8**) |
| 95–105 | O funcție utilă (**Exemplul 9**) |
| 105–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L7

- Dicționar: `{"cheie": valoare}`, `.get()`, `.items()`.
- Meniurile se fac cu `while` și `if / elif`.

**Încearcă tu (3 min)**  
- [ ] Creează un dicționar cu 3 produse și prețurile lor și afișează unul  

---

## 2. Prima funcție

O **funcție** este un grup de instrucțiuni cu un **nume**. O **definești** o singură dată cu `def`, apoi o **apelezi** (o chemi) de câte ori vrei.

### Exemplul 1 — Funcție fără parametri

```python
def salut():
    print("Salut!")
    print("Bine ai venit la Code Maker Club!")

salut()
print("---")
salut()
```

**Ieșire:**
```text
Salut!
Bine ai venit la Code Maker Club!
---
Salut!
Bine ai venit la Code Maker Club!
```

Cum citești:
- `def salut():` definește funcția `salut`. Ca la `if` și `for`, linia se termină cu `:`, iar corpul funcției este **indentat**.
- La **definire**, funcția doar „învață” ce are de făcut; nu rulează.
- `salut()` o **apelează**: abia atunci se execută corpul. Parantezele sunt obligatorii.
- Funcția trebuie definită **înainte** de a fi apelată.

---

## 3. Parametri

### Exemplul 2 — Un parametru

```python
def salut(nume):
    print("Salut,", nume + "!")

salut("Ana")
salut("Mihai")
```

**Ieșire:**
```text
Salut, Ana!
Salut, Mihai!
```

`nume` este un **parametru**: un loc gol pe care îl completezi la apel. `salut("Ana")` pune `"Ana"` în `nume`. Ca un șablon care primește valori diferite.

### Exemplul 3 — Mai mulți parametri

```python
def prezentare(nume, varsta, oras):
    print(f"{nume} are {varsta} ani si locuieste in {oras}.")

prezentare("Ana", 10, "Focsani")
prezentare("Radu", 11, "Bucuresti")
```

**Ieșire:**
```text
Ana are 10 ani si locuieste in Focsani.
Radu are 11 ani si locuieste in Bucuresti.
```

Valorile se potrivesc cu parametrii **în ordine**: prima valoare merge în primul parametru, a doua în al doilea etc.

---

## 4. `return`: funcția dă un rezultat

### Exemplul 4 — `return`

```python
def dublu(x):
    return x * 2

rezultat = dublu(5)
print(rezultat)
print(dublu(10) + 1)
print(dublu(dublu(3)))
```

**Ieșire:**
```text
10
21
12
```

`return` **trimite o valoare înapoi** celui care a chemat funcția și **oprește** funcția. Rezultatul îl poți pune într-o variabilă, aduna, sau chiar folosi ca intrare pentru altă funcție.

### Exemplul 5 — `print` sau `return`?

```python
def dublu_print(x):
    print(x * 2)

def dublu_return(x):
    return x * 2

a = dublu_print(5)
b = dublu_return(5)
print("a =", a)
print("b =", b)
```

**Ieșire:**
```text
10
a = None
b = 10
```

- `print` doar **arată** ceva pe ecran; funcția nu dă nimic înapoi (`None`).
- `return` **dă înapoi** o valoare, cu care poți calcula mai departe.

Regula: dacă vrei să **folosești** rezultatul în alt calcul, folosește `return`. `print` e doar pentru a afișa.

### Exemplul 6 — Funcție cu decizie

```python
def este_par(n):
    return n % 2 == 0

def calificativ(nota):
    if nota >= 9:
        return "Foarte bine"
    elif nota >= 5:
        return "Bine"
    return "Insuficient"

print(este_par(8))
print(este_par(7))
print(calificativ(10))
print(calificativ(6))
print(calificativ(3))
```

**Ieșire:**
```text
True
False
Foarte bine
Bine
Insuficient
```

O funcție poate returna `True` / `False`, text, numere, liste, orice. Când `return` este executat, funcția se **termină**: de aceea ultimul `return "Insuficient"` nu are nevoie de `else`.

---

## 5. Valori implicite, variabile locale

### Exemplul 7 — Valoare implicită

```python
def salut(nume="prietene", semn="!"):
    print("Salut, " + nume + semn)

salut()
salut("Ana")
salut("Ana", "?")
salut(semn=".")
```

**Ieșire:**
```text
Salut, prietene!
Salut, Ana!
Salut, Ana?
Salut, prietene.
```

Un parametru poate avea o valoare **implicită**, folosită dacă nu o dai tu. Poți numi parametrul la apel (`semn="."`), ca să sari peste cei dinainte.

### Exemplul 8 — Variabile locale

```python
def calcul():
    rezultat = 100
    print("In functie:", rezultat)

calcul()
```

**Ieșire:**
```text
In functie: 100
```

Variabila `rezultat` există **doar în interiorul funcției**: este **locală**. După ce funcția se termină, ea dispare. Dacă ai încerca `print(rezultat)` în afara funcției, Python ar da `NameError`.

---

## 6. O funcție utilă

### Exemplul 9 — Chenar pentru orice text

```python
def chenar(text, simbol="*"):
    linie = simbol * (len(text) + 4)
    print(linie)
    print(simbol, text, simbol)
    print(linie)

chenar("Salut")
chenar("Python este super", "#")
```

**Ieșire:**
```text
*********
* Salut *
*********
#####################
# Python este super #
#####################
```

Scrisă o singură dată, funcția poate desena chenare pentru orice text.

---

## 7. Mini-proiect

### Exemplul 10 — Cutia cu unelte

```python
def patrat(x):
    return x * x

def aria_dreptunghi(lungime, latime):
    return lungime * latime

def cel_mai_mare(a, b, c):
    if a >= b and a >= c:
        return a
    elif b >= c:
        return b
    return c

def titlu(text):
    print("=" * (len(text) + 4))
    print(f"  {text.upper()}")
    print("=" * (len(text) + 4))

titlu("Cutia cu unelte")
print("Patratul lui 7:", patrat(7))
print("Aria 5 x 3:", aria_dreptunghi(5, 3))
print("Cel mai mare din 4, 9, 6:", cel_mai_mare(4, 9, 6))
print("Suma patratelor 3 si 4:", patrat(3) + patrat(4))
```

**Ieșire:**
```text
===================
  CUTIA CU UNELTE
===================
Patratul lui 7: 49
Aria 5 x 3: 15
Cel mai mare din 4, 9, 6: 9
Suma patratelor 3 si 4: 25
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Cutia cu unelte” (obligatoriu)
Scrie un program cu **cel puțin 5 funcții**:
1. una care afișează un **titlu** frumos (fără `return`);
2. una care **returnează** pătratul unui număr;
3. una care **returnează** aria unui dreptunghi;
4. una cu o **valoare implicită**;
5. una care returnează `True` / `False` (de exemplu, „este majoră?”).

Apelează-le pe toate cu cel puțin 2 valori diferite.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
def f(x, y=2):
    return x * y

print(f(3))
print(f(3, 4))
print(f(y=5, x=1))
print(f(f(2), f(1, 1)))
```

### Exercițiul C — Convertorul de temperatură
Scrie funcția `celsius_in_fahrenheit(c)` (formula: `c * 9 / 5 + 32`) și afișează temperaturile 0, 20 și 100.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
def dublu(x)
    return x * 2

salut()
def salut():
print("Salut")

rezultat = dublu()
print(Rezultat)
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Care e diferența dintre a **defini** și a **apela** o funcție?  
2. Ce deosebește `print` de `return`?  
3. Ce înseamnă „variabilă locală”?

**Gata când:**
- [ ] Programul are cel puțin 5 funcții  
- [ ] Cel puțin 3 folosesc `return`  
- [ ] Una are o valoare implicită  
- [ ] Toate sunt apelate cu valori diferite  
- [ ] Ai explicat pe foaie diferența dintre `print` și `return`  
- [ ] Fișierul se numește `Prenume_Nume_P2_L8.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] O funcție `este_prim(n)` care returnează `True` sau `False`  
- [ ] O funcție `media(a, b, c)` care returnează media a trei numere  
- [ ] O funcție care desenează un **triunghi** de `*` cu înălțimea dată  
- [ ] O funcție care întoarce un **text invers**  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `NameError: name 'salut' is not defined` | Ai apelat funcția înainte să o definești | Definește funcția mai sus |
| Nu se întâmplă nimic | Ai definit funcția, dar nu ai apelat-o | Adaugă `salut()` |
| `TypeError: dublu() missing 1 required positional argument` | Ai uitat un parametru la apel | `dublu(5)` |
| `TypeError: ... takes 1 positional argument but 2 were given` | Prea multe valori la apel | Potrivește numărul de parametri |
| Rezultatul e `None` | Funcția afișează, dar nu returnează | Folosește `return` |
| `NameError` pentru o variabilă din funcție | Variabilele locale nu se văd în afară | Returnează valoarea sau definește variabila în afară |
| `IndentationError` | Corpul funcției nu e indentat | 4 spații în fața fiecărei linii din funcție |

---

## Recapitulare pe scurt

- `def nume(parametri):` definește o funcție; `nume(valori)` o apelează.
- Funcția trebuie definită **înainte** să fie apelată.
- **Parametrii** primesc valori la apel, în ordine (sau după nume).
- `return` trimite o valoare înapoi și oprește funcția.
- `print` arată, `return` dă înapoi.
- Un parametru poate avea o **valoare implicită**: `def f(x, y=2)`.
- Variabilele create în funcție sunt **locale**.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie o funcție `cumpara(pret, bucati=1)` care returnează totalul și apeleaz-o în 3 feluri.  
3. Scrie funcții `adunare`, `scadere`, `inmultire`, `impartire` și apelează-le cu două numere citite de la tastatură.  
4. **Bonus:** funcție care primește o listă de note și returnează media.  
5. Salvează totul ca `Tema_P2_L8_Prenume_Nume.py`.

---

## Ce urmează — Lecția 9
Funcții mai puternice: care primesc **liste**, returnează **mai multe valori**, se apelează între ele și ne ajută să organizăm programe mari.
