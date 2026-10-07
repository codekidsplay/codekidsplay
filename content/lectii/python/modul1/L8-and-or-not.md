# LECȚIA 8 — `and`, `or`, `not`
**Modulul 1 · Primii pași în Python · 2 ore**  
**Code Maker Club · Python Starter**

> Uneori o singură condiție nu ajunge: „ai bilet **și** ai peste 10 ani”, „e sâmbătă **sau** duminică”, „**nu** plouă”. Azi înveți cuvintele cu care legi condițiile între ele.  
> Proiect: **„Poarta parcului de distracții”** · fișier: `Prenume_Nume_P1_L8.py`

---

## Obiectiv
La finalul orei folosești `and`, `or` și `not`, înțelegi tabelele de adevăr, scrii condiții pentru intervale și respecți ordinea în care Python le evaluează.  
**Minim:** un program cu o condiție cu `and` și una cu `or`.  
**Ținta orei (Complet):** + `not`, un interval (`1 <= x <= 10`) și un program final cu mai multe reguli.

## De ce contează
Jocurile și aplicațiile iau decizii cu mai multe condiții deodată: „dacă jucătorul are cheia **și** ușa e aproape”, „dacă are 0 vieți **sau** timpul a expirat”. Fără `and` și `or`, ar trebui să scrii zeci de `if`-uri imbricate.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L7 |
| 10–35 | `and` și `or` (**Exemplele 1–2**) |
| 35–50 | `not` și tabelele de adevăr (**Exemplele 3–4**) |
| 50–75 | Intervale, reduceri, litere (**Exemplele 5–7**) |
| 75–95 | Validarea unei parole și ordinea de evaluare (**Exemplele 8–9**) |
| 95–115 | Mini-proiect (**Exemplul 10**) |
| 115–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L7

- `if` execută un bloc doar dacă o condiție e adevărată.
- `else` și `elif` adaugă alte variante.
- Comparațiile `==`, `!=`, `<`, `>`, `<=`, `>=` dau `True` sau `False`.

**Încearcă tu (3 min)**  
- [ ] Scrie un `if` care afișează „major” dacă `varsta >= 18`  

---

## 2. `and` și `or`

| Cuvânt | Se citește | Rezultatul e `True` când… |
|--------|-----------|---------------------------|
| `and` | **și** | **amândouă** condițiile sunt adevărate |
| `or` | **sau** | **cel puțin una** dintre condiții e adevărată |
| `not` | **nu** | condiția este **falsă** (inversează) |

### Exemplul 1 — `and`: și una, și alta

```python
varsta = 12
are_bilet = True
if varsta >= 10 and are_bilet:
    print("Poti intra!")
else:
    print("Nu poti intra.")
```

**Ieșire:**
```text
Poti intra!
```

Ca să intri, trebuie ca **ambele** să fie adevărate. Dacă `are_bilet` era `False`, mesajul era „Nu poti intra.”, chiar dacă vârsta era bună.

### Exemplul 2 — `or`: sau una, sau alta

```python
zi = "sambata"
if zi == "sambata" or zi == "duminica":
    print("Este weekend!")
else:
    print("Este zi de scoala.")
```

**Ieșire:**
```text
Este weekend!
```

Atenție la scriere: de fiecare dată scrii **ambele comparații complete**. Varianta `zi == "sambata" or "duminica"` este greșită, deși sună bine în română!

---

## 3. `not` și tabelele de adevăr

### Exemplul 3 — `not`: invers

```python
ploua = False
if not ploua:
    print("Putem iesi la joaca!")
else:
    print("Stam in casa.")
```

**Ieșire:**
```text
Putem iesi la joaca!
```

`not ploua` este adevărat când `ploua` este `False`.

### Exemplul 4 — Tabelele de adevăr

```python
print(True and True)
print(True and False)
print(False and False)
print(True or False)
print(False or False)
print(not True)
print(not False)
```

**Ieșire:**
```text
True
False
False
True
False
False
True
```

Rezumat:

| A | B | `A and B` | `A or B` |
|---|---|-----------|----------|
| `True` | `True` | `True` | `True` |
| `True` | `False` | `False` | `True` |
| `False` | `True` | `False` | `True` |
| `False` | `False` | `False` | `False` |

Poți ține minte simplu: `and` este „strict” (cere ambele), `or` este „blând” (îi ajunge una).

---

## 4. Situații din viața reală

### Exemplul 5 — Interval: nota trebuie să fie între 1 și 10

```python
nota = int(input("Scrie o nota: "))
if nota >= 1 and nota <= 10:
    print("Nota valida")
else:
    print("Nota invalida")

if 1 <= nota <= 10:
    print("Si asa merge, mai scurt!")
```

**Ieșire:**
```text
Scrie o nota: 7
Nota valida
Si asa merge, mai scurt!
```

Python permite o scriere scurtă pentru intervale: `1 <= nota <= 10`, exact ca la matematică.

### Exemplul 6 — Reducere la bilet

```python
varsta = int(input("Varsta: "))
if varsta < 12 or varsta >= 65:
    print("Ai reducere!")
else:
    print("Pret intreg.")
```

**Ieșire:**
```text
Varsta: 70
Ai reducere!
```

Reducerea e pentru cei **mici** (sub 12) **sau** pentru cei **în vârstă** (65 sau mai mult). Pentru oricine altcineva, prețul este întreg.

### Exemplul 7 — Vocală sau consoană?

```python
litera = input("Scrie o litera: ").lower()
if litera in "aeiou":
    print("Este vocala")
elif litera in "bcdfghjklmnpqrstvwxyz":
    print("Este consoana")
else:
    print("Nu este o litera din alfabet")
```

**Ieșire:**
```text
Scrie o litera: E
Este vocala
```

`litera in "aeiou"` verifică dacă litera se află în text (ai văzut `in` în lecția 6). Observă și `.lower()` lipit direct de `input(...)`: transformăm răspunsul în litere mici imediat.

---

## 5. Parole și ordinea de evaluare

### Exemplul 8 — Validăm o parolă

```python
parola = input("Alege o parola: ")
if len(parola) >= 6 and parola != "123456" and not parola.isdigit():
    print("Parola e buna!")
else:
    print("Parola e prea slaba.")
```

**Ieșire:**
```text
Alege o parola: secret12
Parola e buna!
```

Aici am legat **trei condiții** cu `and`. Metoda `parola.isdigit()` este `True` dacă parola conține **doar cifre**; cu `not` cerem să **nu** fie doar cifre.

### Exemplul 9 — Ordinea de evaluare

```python
print(True or False and False)
print((True or False) and False)
print(not True or True)
print(not (True or True))
```

**Ieșire:**
```text
True
False
True
False
```

Ordinea este:
1. **`not`** (cel mai puternic),
2. **`and`**,
3. **`or`** (cel mai slab).

Ca la matematică, `and` „se leagă” mai tare decât `or`, ca înmulțirea față de adunare. **Parantezele** schimbă ordinea și fac codul ușor de înțeles: folosește-le oricând nu ești sigur.

---

## 6. Mini-proiect

### Exemplul 10 — Poarta parcului de distracții

```python
print("=== Poarta parcului ===")
varsta = int(input("Cati ani ai? "))
inaltime = int(input("Cat de inalt esti (in cm)? "))
adult = input("Esti insotit de un adult? (da/nu) ").lower()

print("-" * 25)
if varsta >= 8 and inaltime >= 120:
    print("Montagne rusesti: DA")
else:
    print("Montagne rusesti: NU")

if inaltime >= 100 or adult == "da":
    print("Carusel: DA")
else:
    print("Carusel: NU")

if not (varsta < 5) and (adult == "da" or varsta >= 10):
    print("Casa groazei: DA")
else:
    print("Casa groazei: NU")
```

**Ieșire:**
```text
=== Poarta parcului ===
Cati ani ai? 9
Cat de inalt esti (in cm)? 130
Esti insotit de un adult? (da/nu) da
-------------------------
Montagne rusesti: DA
Carusel: DA
Casa groazei: DA
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Poarta parcului de distracții” (obligatoriu)
Scrie un program care:
1. întreabă vârsta, înălțimea și dacă are un adult alături;
2. pentru **3 atracții** (propune tu regulile), afișează „DA” sau „NU”;
3. folosește cel puțin o dată `and`, `or` și `not`.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
a = 5
b = 10
print(a > 3 and b > 3)
print(a > 7 or b > 7)
print(not (a > 3))
print(a < 10 and b < 10 or a == 5)
print(1 < a < 6)
```

### Exercițiul C — Sâmbătă sau duminică?
Citește o zi a săptămânii și afișează „weekend” dacă e sâmbătă sau duminică (cu `or`), altfel „zi de școală”. Folosește `.lower()`.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
varsta = int(input("Varsta: "))
if varsta >= 10 and <= 18:
    print("Adolescent")
zi = input("Zi: ")
if zi == "sambata" or "duminica":
    print("Weekend")
if not varsta > 5 and
    print("Mic")
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Când este `A and B` adevărat?  
2. Când este `A or B` adevărat?  
3. De ce `zi == "sambata" or "duminica"` este o scriere greșită?

**Gata când:**
- [ ] Programul folosește `and`, `or` și `not`  
- [ ] Are cel puțin 3 atracții cu reguli diferite  
- [ ] Testat cu cel puțin 3 seturi de date  
- [ ] Ai explicat pe foaie când e adevărat `and` și când `or`  
- [ ] Fișierul se numește `Prenume_Nume_P1_L8.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Verifică dacă un număr este divizibil și cu 3, și cu 5 (restul `%` la fiecare este 0)  
- [ ] Scrie un program „Semafor deștept”: se traversează dacă lumina este verde **și** nu vine nicio mașină  
- [ ] Verifică dacă o literă e vocală mare sau mică, fără `.lower()`, cu `or`  
- [ ] Fă o verificare de parolă cu cel puțin 4 reguli (lungime, nu doar cifre, nu e „parola” etc.)  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `if x == 1 or 2:` se comportă ciudat | `2` singur e mereu „adevărat” | `if x == 1 or x == 2:` |
| `SyntaxError` la `if x > 5 and < 10` | A doua comparație nu are variabila | `if x > 5 and x < 10:` sau `5 < x < 10` |
| `and` și `or` amestecate dau rezultate neașteptate | Ordinea: `and` înaintea lui `or` | Folosește paranteze |
| `not x == 5` | Se citește `not (x == 5)`, dar e confuz | Scrie `x != 5` |
| `if (a > 3) and (b > 3)` merge, dar e încărcat | Paranteze inutile | Poți să le scoți |
| `AND` / `Or` cu majuscule | Cuvintele cheie se scriu cu litere mici | `and`, `or`, `not` |

---

## Recapitulare pe scurt

- `A and B` este adevărat când **amândouă** sunt adevărate.
- `A or B` este adevărat când **cel puțin una** este adevărată.
- `not A` inversează valoarea.
- Ordinea: `not`, apoi `and`, apoi `or`; parantezele o schimbă.
- Intervalele se scriu scurt: `1 <= x <= 10`.
- Scrii fiecare comparație complet: `x == 1 or x == 2`.
- `.isdigit()` verifică dacă un text conține doar cifre.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie un program care citește un număr și afișează „Număr de două cifre” dacă este între 10 și 99.  
3. Scrie un program **„Controlul accesului”**: parola corectă **și** vârsta peste 12, **sau** parola specială „invitat”.  
4. **Bonus:** program care verifică dacă un an este bisect (divizibil cu 4 **și** nu cu 100, **sau** divizibil cu 400).  
5. Salvează totul ca `Tema_P1_L8_Prenume_Nume.py`.

---

## Ce urmează — Lecția 9
Aducem **norocul** în programe: zaruri, monede și numere aleatoare cu modulul `random`.
