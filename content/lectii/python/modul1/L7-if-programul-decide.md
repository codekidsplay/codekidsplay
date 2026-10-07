# LECȚIA 7 — `if`: programul decide
**Modulul 1 · Primii pași în Python · 2 ore**  
**Code Maker Club · Python Starter**

> Până acum programele tale făceau mereu același lucru. Azi înveți **instrucțiunea `if`**: programul se uită la o situație și **alege** ce să facă.  
> Proiect: **„Chestionarul”** · fișier: `Prenume_Nume_P1_L7.py`

---

## Obiectiv
La finalul orei scrii condiții cu `==`, `!=`, `<`, `>`, `<=`, `>=`, folosești `if`, `else` și `elif`, înțelegi rolul **indentării** și compari texte.  
**Minim:** un program cu `if` și `else` care răspunde diferit după vârstă sau după un număr.  
**Ținta orei (Complet):** + un lanț cu `elif` și un chestionar cu scor.

## De ce contează
Fiecare joc ia decizii: „dacă jucătorul atinge monstrul, pierde o viață”. Fiecare aplicație la fel: „dacă parola e corectă, intri”. Fără `if`, un program nu poate alege.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L6 |
| 10–30 | Comparații și `if` (**Exemplele 1–2**) |
| 30–50 | `else` (**Exemplul 3**) |
| 50–75 | `elif` (**Exemplele 4–5**) |
| 75–95 | Text în condiții, `if` în `if` (**Exemplele 6–8**) |
| 95–105 | Litere mari și mici la răspunsuri (**Exemplul 9**) |
| 105–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L6

- Textul se pune între ghilimele; `f"..."` pune variabile în text.
- `text.lower()` transformă în litere mici.
- `==` **compară**, iar `=` **pune în cutie**.

**Încearcă tu (3 min)**  
- [ ] Afișează `True` sau `False` pentru `5 > 3` și `2 == 3`  

---

## 2. Comparații

| Semn | Înseamnă | Exemplu | Rezultat |
|------|----------|---------|----------|
| `==` | egal | `5 == 5` | `True` |
| `!=` | diferit | `5 != 3` | `True` |
| `<` | mai mic | `3 < 5` | `True` |
| `>` | mai mare | `3 > 5` | `False` |
| `<=` | mai mic sau egal | `5 <= 5` | `True` |
| `>=` | mai mare sau egal | `4 >= 5` | `False` |

Rezultatul unei comparații este `True` sau `False`.

---

## 3. Instrucțiunea `if`

### Exemplul 1 — Prima decizie

```python
varsta = 12
if varsta >= 10:
    print("Poti intra in club!")
print("Program terminat.")
```

**Ieșire:**
```text
Poti intra in club!
Program terminat.
```

Citește așa: „**dacă** `varsta` este cel puțin 10, **atunci** afișează mesajul”.

Reguli importante:
1. După condiție vine **două puncte** `:`.
2. Liniile care aparțin lui `if` se scriu **mai la dreapta**, cu **4 spații** (sau apeși **Tab**). Aceasta se numește **indentare**.
3. Linia `print("Program terminat.")` nu e indentată, deci **nu** aparține lui `if`: se execută mereu.

### Exemplul 2 — Mai multe linii în `if`

```python
scor = 120
if scor > 100:
    print("Felicitari!")
    print("Ai depasit 100 de puncte.")
    print("Esti campion!")
print("Gata.")
```

**Ieșire:**
```text
Felicitari!
Ai depasit 100 de puncte.
Esti campion!
Gata.
```

Toate liniile indentate la fel formează un **bloc**: se execută împreună, dacă condiția e adevărată. Dacă `scor` era `50`, ar fi apărut doar `Gata.`.

---

## 4. `else`: altfel

### Exemplul 3 — Una sau alta

```python
numar = int(input("Scrie un numar: "))
if numar % 2 == 0:
    print("Numarul este par")
else:
    print("Numarul este impar")
```

**Ieșire:**
```text
Scrie un numar: 8
Numarul este par
```

`else` este „în caz contrar”. Se execută **doar** când condiția de la `if` este falsă. Și `else` are `:` și un bloc indentat. Încearcă programul cu `7`!

---

## 5. `elif`: mai multe variante

### Exemplul 4 — Calificativul

```python
nota = int(input("Ce nota ai luat? "))
if nota >= 9:
    print("Foarte bine!")
elif nota >= 7:
    print("Bine")
elif nota >= 5:
    print("Suficient")
else:
    print("Mai trebuie sa inveti")
```

**Ieșire:**
```text
Ce nota ai luat? 8
Bine
```

`elif` vine de la „else if” (altfel, dacă…). Python verifică condițiile **de sus în jos** și o execută pe **prima** care e adevărată; restul le sare. De aceea ordinea contează: începem cu cea mai mare notă.

### Exemplul 5 — Ce se întâmplă dacă schimbi ordinea?

```python
nota = 10
if nota >= 5:
    print("Suficient")
elif nota >= 9:
    print("Foarte bine!")
```

**Ieșire:**
```text
Suficient
```

Pentru nota `10`, prima condiție (`nota >= 5`) e adevărată, deci Python nu se mai uită la a doua. De aceea am început cu `>= 9` în exemplul anterior!

---

## 6. Texte în condiții

### Exemplul 6 — Parola

```python
parola = input("Parola: ")
if parola == "python":
    print("Bine ai venit!")
else:
    print("Parola gresita.")
```

**Ieșire:**
```text
Parola: python
Bine ai venit!
```

Textele se compară cu `==`. Atenție: `"Python"` și `"python"` sunt **diferite**!

### Exemplul 7 — Temperatura

```python
temperatura = int(input("Cate grade sunt afara? "))
if temperatura < 0:
    print("Ingheat! Pune caciula.")
elif temperatura < 15:
    print("Racoare, ia o geaca.")
elif temperatura < 25:
    print("Vreme buna.")
else:
    print("Cald! Bea apa.")
```

**Ieșire:**
```text
Cate grade sunt afara? 28
Cald! Bea apa.
```

### Exemplul 8 — `if` în `if`

```python
numar = int(input("Scrie un numar: "))
if numar > 0:
    print("Numar pozitiv")
    if numar % 2 == 0:
        print("... si este par")
    else:
        print("... si este impar")
else:
    print("Numarul nu este pozitiv")
```

**Ieșire:**
```text
Scrie un numar: 12
Numar pozitiv
... si este par
```

Poți pune un `if` **în interiorul** altui `if`. Fiecare nivel se **indentează încă o dată** (încă 4 spații).

---

## 7. Litere mari sau mici?

### Exemplul 9 — Răspuns „da” în orice fel

```python
raspuns = input("Vrei sa continui? (da/nu) ")
if raspuns.lower() == "da":
    print("Continuam!")
else:
    print("Ne oprim.")
```

**Ieșire:**
```text
Vrei sa continui? (da/nu) DA
Continuam!
```

Utilizatorul poate scrie `da`, `Da`, `DA` sau `dA`. Cu `.lower()` transformăm răspunsul în litere mici înainte de comparație, ca să funcționeze pentru toate.

---

## 8. Mini-proiect

### Exemplul 10 — Chestionarul

```python
print("=== Chestionar ===")
scor = 0

r1 = input("1. Care e capitala Romaniei? ")
if r1.lower() == "bucuresti":
    print("Corect!")
    scor += 1
else:
    print("Gresit. Raspunsul era Bucuresti.")

r2 = int(input("2. Cat face 7 * 8? "))
if r2 == 56:
    print("Corect!")
    scor += 1
else:
    print("Gresit. Raspunsul era 56.")

r3 = input("3. De ce culoare e cerul senin? ")
if r3.lower() == "albastru":
    print("Corect!")
    scor += 1
else:
    print("Gresit. Raspunsul era albastru.")

print("-" * 20)
print(f"Scor: {scor} din 3")
if scor == 3:
    print("Excelent!")
elif scor >= 2:
    print("Bravo!")
else:
    print("Mai incearca!")
```

**Ieșire:**
```text
=== Chestionar ===
1. Care e capitala Romaniei? Bucuresti
Corect!
2. Cat face 7 * 8? 56
Corect!
3. De ce culoare e cerul senin? albastru
Corect!
--------------------
Scor: 3 din 3
Excelent!
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Chestionarul” (obligatoriu)
Scrie un chestionar cu **cel puțin 4 întrebări** (cel puțin una cu număr și una cu text), care:
1. numără scorul;
2. spune „Corect!” sau „Greșit” după fiecare răspuns;
3. la final afișează scorul și un mesaj, diferit după scor (cu `if / elif / else`).

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
x = 15
if x > 10:
    print("A")
if x > 20:
    print("B")
else:
    print("C")
if x % 5 == 0:
    print("D")
elif x > 0:
    print("E")
```

### Exercițiul C — Biletul la cinema
Citește vârsta. Dacă are sub 6 ani, afișează „Gratuit”; între 6 și 17 (inclusiv), „Bilet de copil”; peste 17, „Bilet normal”.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
varsta = int(input("Varsta: "))
if varsta = 18:
print("Esti major")
else
    print("Esti minor")
if varsta > 12
    print("Adolescent")
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Care e diferența dintre `=` și `==`?  
2. De ce contează ordinea condițiilor într-un lanț `elif`?  
3. La ce folosește indentarea?

**Gata când:**
- [ ] Chestionarul are minimum 4 întrebări  
- [ ] Scorul se calculează corect  
- [ ] Folosește `if`, `elif` și `else`  
- [ ] Comparația de text folosește `.lower()`  
- [ ] Ai explicat pe foaie diferența dintre `=` și `==`  
- [ ] Fișierul se numește `Prenume_Nume_P1_L7.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Citește trei numere și afișează-l pe cel mai mare  
- [ ] Fă un program care citește o zi a săptămânii (1–7) și afișează numele zilei  
- [ ] Verifică dacă un an este bisect: divizibil cu 4 (ignoră excepțiile)  
- [ ] Adaugă la chestionar un nivel de dificultate: întrebări diferite pentru „ușor” și „greu”  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `SyntaxError: invalid syntax` la `if x = 5:` | Ai folosit `=` în loc de `==` | `if x == 5:` |
| `SyntaxError` după `if x > 5` | Ai uitat `:` | `if x > 5:` |
| `IndentationError: expected an indented block` | Nu ai indentat linia de sub `if` | Pune 4 spații la începutul liniei |
| `IndentationError: unindent does not match` | Indentare nepotrivită (spații diferite) | Folosește mereu 4 spații pe același nivel |
| `else` nu are `:` | Ai scris `else` fără două puncte | `else:` |
| Mereu se execută prima variantă | Condițiile sunt în ordine greșită | Pune întâi cea mai restrictivă |
| Parola „corectă” e respinsă | `"Python"` ≠ `"python"` | Folosește `.lower()` sau compară exact |

---

## Recapitulare pe scurt

- Comparațiile `==`, `!=`, `<`, `>`, `<=`, `>=` dau `True` sau `False`.
- `if condiție:` execută blocul indentat doar dacă e adevărată.
- `else:` se execută când condiția e falsă.
- `elif` adaugă variante noi; Python o alege pe **prima** adevărată.
- **Indentarea** (4 spații) arată ce linii aparțin blocului.
- `==` compară, `=` pune în cutie.
- Pentru texte, `.lower()` face comparația mai prietenoasă.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie un program care citește două numere și afișează care e mai mare, sau „sunt egale”.  
3. Scrie un program „Semafor”: citește culoarea (`rosu`, `galben`, `verde`) și afișează ce are de făcut pietonul.  
4. **Bonus:** program care citește un număr și afișează dacă e pozitiv, negativ sau zero, și dacă e par sau impar.  
5. Salvează totul ca `Tema_P1_L7_Prenume_Nume.py`.

---

## Ce urmează — Lecția 8
Învățăm `and`, `or`, `not`: cum punem **mai multe condiții** laolaltă.
