# LECȚIA 5 — Calcule și operatori
**Modulul 1 · Primii pași în Python · 2 ore**  
**Code Maker Club · Python Starter**

> Python este un calculator uriaș. Azi înveți **toți operatorii**: cei de la matematică și doi „secreți”, **câtul** și **restul** împărțirii, plus ordinea în care se fac calculele.  
> Proiect: **„Calculatorul de buzunar”** · fișier: `Prenume_Nume_P1_L5.py`

---

## Obiectiv
La finalul orei folosești `+ - * /`, ridicarea la putere `**`, câtul `//` și restul `%`, respecți ordinea operațiilor, folosești parantezele și prescurtările `+=`, `-=`, `*=`.  
**Minim:** un program care citește două numere și afișează rezultatele a 4 operații.  
**Ținta orei (Complet):** + câtul, restul și puterea, plus o aplicație practică (de exemplu, conversia secundelor în minute și secunde).

## De ce contează
Jocurile calculează tot timpul: viteze, distanțe, scoruri, câte vieți au mai rămas. Restul împărțirii (`%`) se folosește peste tot: ca să afli dacă un număr e par, ca să rotești un personaj sau ca să faci un ceas.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L4 |
| 10–30 | Operatorii de bază și puterea (**Exemplul 1**) |
| 30–60 | Câtul `//` și restul `%` (**Exemplele 2–3**, **5**) |
| 60–80 | Ordinea operațiilor (**Exemplul 4**) |
| 80–95 | Numerele cu virgulă și prescurtările (**Exemplele 6–7**) |
| 95–112 | Aplicații (**Exemplele 8–9**) |
| 112–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L4

- `input()` dă mereu text; pentru numere folosim `int()` sau `float()`.
- `+` aduna numere și lipește texte.

**Încearcă tu (3 min)**  
- [ ] Scrie un program care citește un număr și afișează dublul lui  

---

## 2. Operatorii

| Operator | Ce face | Exemplu | Rezultat |
|----------|---------|---------|----------|
| `+` | adunare | `7 + 2` | `9` |
| `-` | scădere | `7 - 2` | `5` |
| `*` | înmulțire | `7 * 2` | `14` |
| `/` | împărțire (dă `float`) | `7 / 2` | `3.5` |
| `//` | **câtul** împărțirii (partea întreagă) | `7 // 2` | `3` |
| `%` | **restul** împărțirii | `7 % 2` | `1` |
| `**` | **ridicare la putere** | `7 ** 2` | `49` |

### Exemplul 1 — Operatorii de bază

```python
print(7 + 2)
print(7 - 2)
print(7 * 2)
print(7 / 2)
print(2 ** 3)
print(10 ** 2)
```

**Ieșire:**
```text
9
5
14
3.5
8
100
```

`2 ** 3` înseamnă `2 · 2 · 2 = 8`. Nu confunda `**` cu `^`: în Python, `^` face altceva!

---

## 3. Câtul și restul

Ți-aduci aminte de împărțirea cu rest de la școală? `17 : 5 = 3`, rest `2`, pentru că `5 · 3 = 15`, iar `17 − 15 = 2`.

### Exemplul 2 — `//` și `%`

```python
print(17 // 5)
print(17 % 5)
print(20 // 4)
print(20 % 4)
```

**Ieșire:**
```text
3
2
5
0
```

- `17 // 5` este **câtul**: de câte ori „intră” 5 în 17 întreg → `3`.
- `17 % 5` este **restul**: ce rămâne → `2`.
- Dacă împărțirea e exactă, restul este `0`.

### Exemplul 3 — Par sau impar?

```python
print(10 % 2)
print(7 % 2)
print(100 % 2)
print(33 % 2)
```

**Ieșire:**
```text
0
1
0
1
```

Dacă `număr % 2` dă `0`, numărul este **par**. Dacă dă `1`, este **impar**. Trucul acesta îl vei folosi des cu `if`.

---

## 4. Ordinea operațiilor

### Exemplul 4 — Ca la matematică

```python
print(2 + 3 * 4)
print((2 + 3) * 4)
print(2 ** 3 * 2)
print(10 - 4 - 3)
print(20 / 5 * 2)
```

**Ieșire:**
```text
14
20
16
3
8.0
```

Python respectă ordinea de la matematică:
1. **paranteze** `( )`
2. **putere** `**`
3. **înmulțire, împărțire** `* / // %` (de la stânga la dreapta)
4. **adunare, scădere** `+ -` (de la stânga la dreapta)

Când ai nevoie de altă ordine, pune **paranteze**. Ele nu strică niciodată: pune-le și atunci când nu ești sigur.

---

## 5. Împărțim lucruri, rest

### Exemplul 5 — Bomboane pentru prieteni

```python
bomboane = 17
copii = 5
fiecare = bomboane // copii
ramase = bomboane % copii
print("Fiecare copil primeste", fiecare, "bomboane")
print("Raman", ramase, "bomboane")
```

**Ieșire:**
```text
Fiecare copil primeste 3 bomboane
Raman 2 bomboane
```

Aceasta este problema clasică: **împărțirea cu rest**. `//` spune câte primește fiecare, iar `%` spune câte rămân.

---

## 6. Numerele cu virgulă și prescurtările

### Exemplul 6 — Un mic secret al calculatoarelor

```python
print(0.1 + 0.2)
print(round(0.1 + 0.2, 2))
print(10 / 3)
print(round(10 / 3, 2))
```

**Ieșire:**
```text
0.30000000000000004
0.3
3.3333333333333335
3.33
```

Calculatoarele păstrează numerele cu virgulă în binar și uneori apar mici **diferențe** la final. Nu e o greșeală a ta! Folosește `round(număr, zecimale)` când vrei un rezultat frumos.

### Exemplul 7 — Prescurtări

```python
x = 10
x += 5
print(x)
x -= 3
print(x)
x *= 2
print(x)
x //= 5
print(x)
x %= 3
print(x)
x **= 2
print(x)
```

**Ieșire:**
```text
15
12
24
4
1
1
```

| Prescurtare | Înseamnă |
|-------------|----------|
| `x += 5` | `x = x + 5` |
| `x -= 3` | `x = x - 3` |
| `x *= 2` | `x = x * 2` |
| `x //= 5` | `x = x // 5` |
| `x %= 3` | `x = x % 3` |
| `x **= 2` | `x = x ** 2` |

---

## 7. Aplicații

### Exemplul 8 — Media a trei note

```python
a = int(input("Nota 1: "))
b = int(input("Nota 2: "))
c = int(input("Nota 3: "))
media = (a + b + c) / 3
print("Media este", round(media, 1))
```

**Ieșire:**
```text
Nota 1: 9
Nota 2: 10
Nota 3: 8
Media este 9.0
```

Parantezele sunt importante: fără ele, `a + b + c / 3` ar împărți doar pe `c` la 3.

### Exemplul 9 — Secunde în minute și secunde

```python
total = int(input("Cate secunde? "))
minute = total // 60
secunde = total % 60
print(total, "secunde =", minute, "minute si", secunde, "secunde")
```

**Ieșire:**
```text
Cate secunde? 135
135 secunde = 2 minute si 15 secunde
```

Același truc cu `//` și `%` îl folosești pentru ceasuri, cronometre și pentru jocuri cu timp.

---

## 8. Mini-proiect

### Exemplul 10 — Calculatorul de buzunar

```python
print("=== Calculator ===")
a = int(input("Primul numar: "))
b = int(input("Al doilea numar: "))
print("-" * 20)
print(a, "+", b, "=", a + b)
print(a, "-", b, "=", a - b)
print(a, "*", b, "=", a * b)
print(a, "/", b, "=", a / b)
print(a, "//", b, "=", a // b)
print(a, "%", b, "=", a % b)
print(a, "**", b, "=", a ** b)
```

**Ieșire:**
```text
=== Calculator ===
Primul numar: 17
Al doilea numar: 5
--------------------
17 + 5 = 22
17 - 5 = 12
17 * 5 = 85
17 / 5 = 3.4
17 // 5 = 3
17 % 5 = 2
17 ** 5 = 1419857
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Calculatorul de buzunar” (obligatoriu)
Scrie un program care:
1. citește **două numere întregi**;
2. afișează cele **7 rezultate** (`+ - * / // % **`), fiecare pe un rând, cu mesaj clar;
3. are un titlu și un chenar.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
print(2 + 3 * 2)
print((2 + 3) * 2)
print(9 // 2 + 9 % 2)
print(2 ** 2 ** 2)
print(100 - 10 * 5 + 2)
```

### Exercițiul C — Ora și minutele
Citește un număr de **minute** (de exemplu `135`) și afișează câte **ore** și câte **minute** reprezintă (`2 ore și 15 minute`).

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
a = input("Primul numar: ")
b = input("Al doilea numar: ")
print("Suma:", a + b)
media = a + b / 2
print("Puterea:", a ^ b)
print("Restul:", a % 0)
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce face `//` și ce face `%`?  
2. Cum afli dacă un număr este par?  
3. De ce `2 + 3 * 4` dă `14`, iar `(2 + 3) * 4` dă `20`?

**Gata când:**
- [ ] Programul citește două numere  
- [ ] Afișează toate cele 7 operații  
- [ ] Rezultatele sunt corecte (verifică pe hârtie două dintre ele)  
- [ ] Ai explicat pe foaie ce fac `//` și `%`  
- [ ] Fișierul se numește `Prenume_Nume_P1_L5.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Citește un număr și afișează dacă e par (`restul` la 2) sau impar  
- [ ] Citește un număr de zile și afișează câte **săptămâni** și câte **zile** sunt  
- [ ] Calculează **aria** și **perimetrul** unui pătrat, citind latura  
- [ ] Citește o sumă de bani și împart-o la 4 prieteni: câți lei primește fiecare și câți rămân  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `7 / 2` dă `3.5`, nu `3` | `/` dă mereu număr cu virgulă | Folosește `//` pentru câtul întreg |
| `2 ^ 3` nu dă `8` | `^` nu e putere în Python | `2 ** 3` |
| `ZeroDivisionError: division by zero` | Ai împărțit la 0 | Nu poți împărți la 0: verifică numitorul |
| `a + b + c / 3` nu e media | Ordinea operațiilor: se împarte doar `c` | `(a + b + c) / 3` |
| `"3" + "4"` dă `34` | Textele se lipesc | `int("3") + int("4")` |
| `0.1 + 0.2` nu dă exact `0.3` | Calculatoarele fac mici erori la zecimale | `round(0.1 + 0.2, 2)` |
| `x =+ 5` în loc de `x += 5` | Semnele sunt în ordine greșită | `x += 5` |

---

## Recapitulare pe scurt

- Operatori: `+ - * /`, plus `//` (cât), `%` (rest) și `**` (putere).
- `/` dă mereu `float`; `//` dă câtul întreg; `%` dă restul.
- Un număr e **par** dacă `n % 2 == 0`.
- Ordinea: paranteze, putere, `* / // %`, apoi `+ -`.
- `+=`, `-=`, `*=` etc. sunt prescurtări pentru modificarea unei variabile.
- `round(număr, zecimale)` rotunjește și curăță micile erori.
- Nu poți împărți la `0`.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie un program care citește **prețul unui produs** și **banii** pe care îi ai și afișează câte bucăți poți cumpăra și câți bani îți rămân (`//` și `%`).  
3. Scrie un program care citește un **număr de secunde** și afișează câte **ore, minute și secunde** reprezintă.  
4. **Bonus:** calculează câte **zile și ore** au 100 de ore.  
5. Salvează totul ca `Tema_P1_L5_Prenume_Nume.py`.

---

## Ce urmează — Lecția 6
Învățăm să lucrăm mai bine cu **text**: f-string-uri (propoziții cu variabile), litere mari și mici, tăiat și înlocuit.
