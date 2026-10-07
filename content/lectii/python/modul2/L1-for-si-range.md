# LECȚIA 1 — `for` și `range`
**Modulul 2 · Repetăm, colecționăm, organizăm · 2 ore**  
**Code Maker Club · Python Builder**

> Calculatorul nu obosește niciodată. Dacă îi ceri să facă același lucru de 1000 de ori, îl face într-o clipă. Azi înveți **bucla `for`**: cum repeți instrucțiuni fără să le scrii de mai multe ori.  
> Proiect: **„Numărătoarea rachetei”** · fișier: `Prenume_Nume_P2_L1.py`

---

## Obiectiv
La finalul orei folosești `for` cu `range(...)` (cu unul, doi sau trei numere), parcurgi un text și o listă, calculezi sume cu o buclă și afișezi pe același rând cu `end`.  
**Minim:** o buclă `for` care afișează numerele de la 1 la 10.  
**Ținta orei (Complet):** + o numărătoare inversă, o sumă calculată cu buclă și un mic desen cu `*`.

## De ce contează
Un joc verifică în fiecare secundă dacă ai atins un inamic. O aplicație trimite același mesaj către toți prietenii tăi. Fără bucle, ai scrie aceleași linii de sute de ori. Cu `for`, o scrii o singură dată.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare Modulul 1 |
| 10–35 | Prima buclă `for` și `range(n)` (**Exemplele 1–2**) |
| 35–60 | `range` cu început, sfârșit și pas (**Exemplele 3–4**) |
| 60–85 | Sume, text, liste (**Exemplele 5–7**) |
| 85–105 | Bucla cu `input` și numărătoarea inversă (**Exemplele 8–9**) |
| 105–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din Modulul 1

- `print`, `input`, variabile și tipuri.
- `if / elif / else` și indentarea cu 4 spații.
- `random.randint` și liste simple, ca `["a", "b", "c"]`.

**Încearcă tu (3 min)**  
- [ ] Scrie un `if` care afișează „par” dacă un număr are restul 0 la împărțirea cu 2  

---

## 2. Bucla `for`

Dacă vrei să afișezi „Salut!” de 5 ori, ai putea scrie 5 linii `print`. Dar dacă ți-ar trebui 500? Folosim o **buclă**.

### Exemplul 1 — Repetăm de 5 ori

```python
for i in range(5):
    print("Salut!")
```

**Ieșire:**
```text
Salut!
Salut!
Salut!
Salut!
Salut!
```

Cum citești linia `for i in range(5):`:
- `for` începe bucla.
- `i` este o **variabilă a buclei**: la fiecare repetare primește o valoare nouă.
- `range(5)` spune de câte ori se repetă.
- `:` la final, apoi **blocul indentat** (cu 4 spații) conține ce se repetă.

### Exemplul 2 — Ce valori ia `i`?

```python
for i in range(5):
    print(i)
```

**Ieșire:**
```text
0
1
2
3
4
```

Atenție! `range(5)` dă numerele **0, 1, 2, 3, 4**: începe de la `0` și se oprește **înainte** de 5. Sunt tot 5 numere, deci bucla se repetă de 5 ori.

---

## 3. `range` cu mai multe numere

`range` poate primi **unu, două sau trei** numere:

| Scriere | Ce dă |
|---------|-------|
| `range(5)` | 0, 1, 2, 3, 4 |
| `range(1, 6)` | 1, 2, 3, 4, 5 (de la 1 **până la 6, fără 6**) |
| `range(0, 11, 2)` | 0, 2, 4, 6, 8, 10 (din **2 în 2**) |
| `range(5, 0, -1)` | 5, 4, 3, 2, 1 (**invers**) |

### Exemplul 3 — De la 1 la 5

```python
for n in range(1, 6):
    print("Numarul", n)
```

**Ieșire:**
```text
Numarul 1
Numarul 2
Numarul 3
Numarul 4
Numarul 5
```

### Exemplul 4 — Cu pas: din 2 în 2

```python
for n in range(0, 11, 2):
    print(n, end=" ")
print()
for n in range(10, 0, -3):
    print(n, end=" ")
print()
```

**Ieșire:**
```text
0 2 4 6 8 10 
10 7 4 1
```

- Al treilea număr din `range` este **pasul**.
- `end=" "` face ca `print` să pună un spațiu la sfârșit, în loc să treacă pe rând nou. Așa numerele apar toate pe **același rând**.
- `print()` fără nimic trece pe rândul următor.
- Un pas **negativ** numără invers.

---

## 4. Bucla în acțiune

### Exemplul 5 — Suma numerelor de la 1 la 10

```python
total = 0
for n in range(1, 11):
    total = total + n
print("Suma este", total)
```

**Ieșire:**
```text
Suma este 55
```

Ideea: pornim cu `total = 0` și **adunăm** fiecare număr. După buclă, `total` conține suma. Este una dintre cele mai folosite scheme din programare!

### Exemplul 6 — `for` pe un text

```python
for litera in "Ana":
    print(litera)
```

**Ieșire:**
```text
A
n
a
```

Bucla `for` poate trece prin **fiecare literă** a unui text: `litera` primește pe rând `A`, `n`, `a`.

### Exemplul 7 — `for` pe o listă

```python
fructe = ["mar", "para", "prune"]
for fruct in fructe:
    print(f"Imi plac {fruct}")
print("Gata!")
```

**Ieșire:**
```text
Imi plac mar
Imi plac para
Imi plac prune
Gata!
```

Aici `fruct` primește pe rând fiecare element din listă. Observă că linia `print("Gata!")` nu e indentată: se execută **o singură dată**, după buclă.

---

## 5. Buclă și `input`

### Exemplul 8 — Repetăm de câte ori vrea utilizatorul

```python
n = int(input("De cate ori sa repet? "))
for i in range(n):
    print(f"Repetarea {i + 1}")
```

**Ieșire:**
```text
De cate ori sa repet? 3
Repetarea 1
Repetarea 2
Repetarea 3
```

Variabila `i` începe de la `0`, deci afișăm `i + 1` ca să numărăm de la 1, ca oamenii.

### Exemplul 9 — Numărătoarea inversă

```python
for i in range(5, 0, -1):
    print(i)
print("START!")
```

**Ieșire:**
```text
5
4
3
2
1
START!
```

---

## 6. Mini-proiect

### Exemplul 10 — Numărătoarea rachetei

```python
print("=== Centrul de control ===")
secunde = int(input("De la cat numaram? "))

for i in range(secunde, 0, -1):
    print(f"T minus {i}...")
print("Decolare!")

print()
print("Racheta urca:")
for rand in range(1, 5):
    print(" " * (4 - rand) + "^" * (2 * rand - 1))
```

**Ieșire:**
```text
=== Centrul de control ===
De la cat numaram? 5
T minus 5...
T minus 4...
T minus 3...
T minus 2...
T minus 1...
Decolare!

Racheta urca:
   ^
  ^^^
 ^^^^^
^^^^^^^
```

În ultimul `for`, folosim un calcul cu `rand` ca să aliniem desenul: spațiile din stânga scad, iar semnele `^` cresc.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Numărătoarea rachetei” (obligatoriu)
Scrie un program care:
1. citește de la ce număr să numere (de exemplu 10);
2. afișează numărătoarea inversă cu un `for`;
3. la final afișează „Decolare!” și un desen cu `*` sau `^`, făcut cu o buclă.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
for i in range(3):
    print(i * 2)
for n in range(2, 8, 2):
    print(n)
total = 0
for k in range(1, 5):
    total += k
print(total)
```

### Exercițiul C — Tabla de adunare
Citește un număr și afișează de la 1 la 10 rezultatul adunării lui cu fiecare număr, în forma `5 + 1 = 6`.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
for i in range(5)
print(i)
for n in range(1, 6)
total = total + n
print("Suma:" total)
for x in range(10, 0)
    print(x)
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Câte numere dă `range(5)` și care sunt ele?  
2. Ce face al treilea număr din `range(1, 20, 3)`?  
3. De ce linia de după buclă nu se repetă?

**Gata când:**
- [ ] Programul folosește cel puțin 2 bucle `for`  
- [ ] Numărătoarea inversă funcționează  
- [ ] Desenul se face cu o buclă  
- [ ] Ai testat cu 3 valori diferite  
- [ ] Ai explicat pe foaie ce dă `range(5)`  
- [ ] Fișierul se numește `Prenume_Nume_P2_L1.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Calculează suma numerelor **pare** de la 1 la 100  
- [ ] Afișează un pom de Crăciun cu `*` din 6 rânduri  
- [ ] Calculează **factorialul** unui număr (5! = 1·2·3·4·5) cu o buclă  
- [ ] Afișează toate literele unui cuvânt, **una pe rând**, cu numărul lor de ordine  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `SyntaxError: expected ':'` | Ai uitat `:` după `for` | `for i in range(5):` |
| `IndentationError: expected an indented block` | Corpul buclei nu e indentat | Pune 4 spații în fața liniei |
| Bucla face cu **unul mai puțin** decât voiai | `range(5)` se oprește la 4 | `range(1, 6)` pentru 1..5 |
| `range(10, 0)` nu afișează nimic | Fără pas negativ, nu merge înapoi | `range(10, 0, -1)` |
| `TypeError: 'float' object cannot be interpreted as an integer` | `range` cere numere întregi | `range(int(x))` |
| Rezultatul nu se adună | Ai uitat `total = 0` înainte | Inițializează `total = 0` înainte de buclă |
| Totul se afișează pe un singur rând | Ai uitat `print()` după buclă | Adaugă `print()` la final |

---

## Recapitulare pe scurt

- `for variabila in range(...):` repetă blocul indentat.
- `range(n)` dă `0 ... n-1`; `range(a, b)` dă `a ... b-1`; `range(a, b, pas)` merge din `pas` în `pas`.
- Pasul negativ numără invers.
- `for` merge și pe **texte** și pe **liste**.
- Schema sumei: `total = 0`, apoi `total += n` în buclă.
- `print(x, end=" ")` afișează pe același rând.
- Linia neindentată de după buclă se execută o singură dată.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie un program care afișează **numerele de la 1 la 50** care sunt multipli de 3.  
3. Scrie un program care citește un număr `n` și afișează **suma** numerelor de la 1 la `n`.  
4. **Bonus:** desenează cu `*` un **romb** cu 7 rânduri.  
5. Salvează totul ca `Tema_P2_L1_Prenume_Nume.py`.

---

## Ce urmează — Lecția 2
Punem o buclă **în interiorul altei bucle** și desenăm tabla înmulțirii și multe modele.
