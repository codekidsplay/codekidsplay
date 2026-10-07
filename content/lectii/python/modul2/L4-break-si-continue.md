# LECȚIA 4 — `break` și `continue`
**Modulul 2 · Repetăm, colecționăm, organizăm · 2 ore**  
**Code Maker Club · Python Builder**

> Uneori vrei să **oprești** o buclă înainte de final (ai găsit ce căutai), sau să **sari** peste un pas (nu te interesează). Azi înveți `break` și `continue`.  
> Proiect: **„Păzitorul tezaurului”** · fișier: `Prenume_Nume_P2_L4.py`

---

## Obiectiv
La finalul orei folosești `break` ca să ieși dintr-o buclă, `continue` ca să sari peste un pas, cauți un lucru într-un șir de numere și verifici dacă un număr este prim.  
**Minim:** un `for` cu `break` și unul cu `continue`.  
**Ținta orei (Complet):** + verificarea unui număr prim, o cerere de date cu validare și un program cu număr limitat de încercări.

## De ce contează
Când cauți o piesă într-o cutie cu 1000 de piese, te oprești când o găsești. La fel, un program nu trebuie să mai verifice restul numerelor după ce a găsit răspunsul. `break` și `continue` fac programele mai rapide și mai ușor de scris.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L3 |
| 10–30 | `break` (**Exemplele 1–2**) |
| 30–50 | `continue` (**Exemplul 3**) |
| 50–75 | `while True` cu `break` (**Exemplul 4**) |
| 75–95 | Numere prime și încercări limitate (**Exemplele 5–6**) |
| 95–105 | Validare, buclă în buclă (**Exemplele 7–9**) |
| 105–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L3

- `while condiție:` repetă cât timp condiția e adevărată.
- `while True:` repetă la nesfârșit, până o oprim.
- `for` parcurge un `range`, un text sau o listă.

**Încearcă tu (3 min)**  
- [ ] Scrie un `while` care numără de la 10 la 1  

---

## 2. `break`: ieșim din buclă

### Exemplul 1 — Ne oprim la 5

```python
for n in range(1, 10):
    if n == 5:
        break
    print(n)
print("Am iesit din bucla")
```

**Ieșire:**
```text
1
2
3
4
Am iesit din bucla
```

Când `n` ajunge la 5, `break` oprește **imediat** bucla. Valoarea 5 nu mai este afișată, iar programul continuă cu prima linie de după buclă.

### Exemplul 2 — Căutăm primul multiplu de 7

```python
for n in range(50, 100):
    if n % 7 == 0:
        print("Primul multiplu de 7 dupa 50 este", n)
        break
```

**Ieșire:**
```text
Primul multiplu de 7 dupa 50 este 56
```

Fără `break`, bucla ar continua până la 99 și ar afișa **toți** multiplii. Cu `break`, ne oprim la primul.

---

## 3. `continue`: sărim peste un pas

### Exemplul 3 — Sărim peste numerele pare

```python
for n in range(1, 8):
    if n % 2 == 0:
        continue
    print(n)
```

**Ieșire:**
```text
1
3
5
7
```

`continue` spune: „oprește pasul **acesta** și treci la următorul”. Când `n` este par, `print(n)` este sărit.

| Instrucțiune | Ce face |
|--------------|---------|
| `break` | iese **complet** din buclă |
| `continue` | sare la **următorul pas** al buclei |

---

## 4. `while True` cu `break`

### Exemplul 4 — Adunăm până scrii 0

```python
suma = 0
while True:
    numar = int(input("Numar (0 pentru a termina): "))
    if numar == 0:
        break
    suma += numar
print("Suma este", suma)
```

**Ieșire:**
```text
Numar (0 pentru a termina): 5
Numar (0 pentru a termina): 10
Numar (0 pentru a termina): 0
Suma este 15
```

Schema `while True` + `break` este foarte folosită: bucla rulează „la nesfârșit”, iar noi ieșim când avem motiv.

---

## 5. Numere prime și încercări limitate

Un număr este **prim** dacă se împarte exact doar la 1 și la el însuși (2, 3, 5, 7, 11, 13…).

### Exemplul 5 — Este prim?

```python
n = int(input("Scrie un numar: "))
prim = True
for d in range(2, n):
    if n % d == 0:
        prim = False
        break
if n < 2:
    prim = False
if prim:
    print(n, "este prim")
else:
    print(n, "nu este prim")
```

**Ieșire:**
```text
Scrie un numar: 17
17 este prim
```

Presupunem că numărul e prim (`prim = True`). Încercăm să-l împărțim la 2, 3, 4… Dacă găsim un divizor, nu e prim și **ne oprim** cu `break`. Variabila `prim` se numește **steag** (flag): ține minte ce am aflat.

### Exemplul 6 — Ghicești în 3 încercări

```python
secret = 7
for incercare in range(1, 4):
    ghici = int(input(f"Incercarea {incercare}/3: "))
    if ghici == secret:
        print("Bravo, ai ghicit!")
        break
    print("Nu e asta.")
else:
    print("Ai pierdut. Numarul era", secret)
```

**Ieșire:**
```text
Incercarea 1/3: 3
Nu e asta.
Incercarea 2/3: 9
Nu e asta.
Incercarea 3/3: 7
Bravo, ai ghicit!
```

Detaliu nou: un `else` scris la **nivelul lui `for`** se execută doar dacă bucla s-a terminat **fără `break`**. Dacă ghiceai, `break` sărea peste el. Dacă epuizai toate încercările, apărea mesajul „Ai pierdut”.

---

## 6. Validare și bucle în bucle

### Exemplul 7 — Nu accept un nume gol

```python
while True:
    nume = input("Cum te cheama? ")
    if nume == "":
        print("Trebuie sa scrii ceva!")
        continue
    break
print("Salut,", nume)
```

**Ieșire:**
```text
Cum te cheama? 
Trebuie sa scrii ceva!
Cum te cheama? Ana
Salut, Ana
```

Dacă numele e gol, afișăm un avertisment și `continue` ne duce înapoi la început, ca să întrebăm din nou. Când numele e valid, ajungem la `break`.

### Exemplul 8 — `break` în buclă imbricată

```python
for i in range(3):
    for j in range(3):
        if j == 2:
            break
        print(i, j)
```

**Ieșire:**
```text
0 0
0 1
1 0
1 1
2 0
2 1
```

`break` iese **doar din bucla în care se află** (cea interioară). Bucla de afară continuă normal.

### Exemplul 9 — Media notelor, cu validare

```python
total = 0
cate = 0
while True:
    nota = int(input("Nota (0 pentru a termina): "))
    if nota == 0:
        break
    if nota > 10:
        print("Nota nu poate fi peste 10!")
        continue
    total += nota
    cate += 1
if cate > 0:
    print("Media este", total / cate)
else:
    print("Nu ai introdus nicio nota.")
```

**Ieșire:**
```text
Nota (0 pentru a termina): 8
Nota (0 pentru a termina): 11
Nota nu poate fi peste 10!
Nota (0 pentru a termina): 9
Nota (0 pentru a termina): 0
Media este 8.5
```

Aici folosim ambele: `continue` sare peste notele greșite (nu le adună), iar `break` oprește bucla când scrii `0`.

---

## 7. Mini-proiect

### Exemplul 10 — Păzitorul tezaurului

```python
parola = "comoara"
incercari = 3
print("Un paznic iti blocheaza drumul spre tezaur.")
print(f"Ai {incercari} incercari sa ghicesti parola.")

deschis = False
for numar in range(1, incercari + 1):
    raspuns = input(f"Incercarea {numar}: ").lower()
    if raspuns == parola:
        deschis = True
        break
    print("Paznicul rade: 'Gresit!'")

print("-" * 25)
if deschis:
    print("Usa se deschide... Ai gasit tezaurul!")
else:
    print("Paznicul te alunga. Mai incearca maine!")
```

**Ieșire:**
```text
Un paznic iti blocheaza drumul spre tezaur.
Ai 3 incercari sa ghicesti parola.
Incercarea 1: aur
Paznicul rade: 'Gresit!'
Incercarea 2: diamant
Paznicul rade: 'Gresit!'
Incercarea 3: comoara
-------------------------
Usa se deschide... Ai gasit tezaurul!
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Păzitorul tezaurului” (obligatoriu)
Scrie un program care:
1. alege o **parolă secretă** în cod;
2. oferă jucătorului **3 încercări**, cu `for`;
3. oprește bucla cu `break` dacă a ghicit;
4. afișează un mesaj diferit la câștig și la pierdere.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
for i in range(1, 8):
    if i == 3:
        continue
    if i == 6:
        break
    print(i)
print("Gata")
```

### Exercițiul C — Primul număr divizibil cu 13
Caută cu un `for` și `break` primul număr mai mare decât 100 care se împarte exact la 13.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
for n in range(10):
    if n == 5
        break
    print(n)
continue
while True
    nume = input("Nume: ")
    if nume != "":
    break
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Care e diferența dintre `break` și `continue`?  
2. De ce are sens `while True` împreună cu `break`?  
3. Din câte bucle iese un `break` scris într-o buclă imbricată?

**Gata când:**
- [ ] Programul folosește `break` pentru a ieși când a ghicit  
- [ ] Are exact 3 încercări  
- [ ] Mesajele pentru câștig și pierdere sunt diferite  
- [ ] Ai testat ambele cazuri  
- [ ] Ai explicat pe foaie diferența dintre `break` și `continue`  
- [ ] Fișierul se numește `Prenume_Nume_P2_L4.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Afișează toate numerele **prime** de la 2 la 50  
- [ ] Cere un număr între 1 și 10 **până când** utilizatorul scrie unul corect  
- [ ] Afișează numerele de la 1 la 20, **sărind** multiplii lui 3  
- [ ] Face un joc de ghicit cu indicii „mai mare” / „mai mic” și număr limitat de încercări  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `SyntaxError: 'break' outside loop` | Ai pus `break` în afara unei bucle | Folosește-l doar într-un `for` sau `while` |
| Bucla nu se oprește | `break` e într-un `if` care nu e niciodată adevărat | Verifică condiția |
| `continue` într-un `while` face bucla infinită | Contorul se schimbă **după** `continue`, deci linia lui este sărită | Schimbă contorul **înainte** de `continue` |
| `break` iese din bucla greșită | E într-o buclă imbricată | `break` iese doar din bucla cea mai interioară |
| Număr prim greșit pentru 1 sau 0 | Nu ai tratat cazul `n < 2` | Adaugă verificarea `n < 2` |
| `else` apare mereu | `else` e legat de `if`, nu de `for` | Indentează-l la nivelul lui `for` |

---

## Recapitulare pe scurt

- `break` iese **complet** din cea mai apropiată buclă.
- `continue` sare la **pasul următor** al buclei.
- `while True` + `break` = buclă care se oprește la comandă.
- Un `else` după un `for` se execută doar dacă bucla s-a terminat fără `break`.
- Un **steag** (de exemplu `prim = True`) ține minte ce am aflat în buclă.
- Un număr e **prim** dacă are doar doi divizori: 1 și el însuși.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie un program care cere note (între 1 și 10) până scrii `0` și apoi afișează **media**. Sări peste notele invalide (mai mari de 10) cu `continue`.  
3. Scrie un joc de ghicit un număr secret între 1 și 20, cu **cel mult 5 încercări**.  
4. **Bonus:** afișează primele 10 numere prime.  
5. Salvează totul ca `Tema_P2_L4_Prenume_Nume.py`.

---

## Ce urmează — Lecția 5
Învățăm **listele**: cutii cu mai multe lucruri, în care adaugi, ștergi și cauți.
