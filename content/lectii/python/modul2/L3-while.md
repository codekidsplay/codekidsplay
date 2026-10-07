# LECȚIA 3 — `while`
**Modulul 2 · Repetăm, colecționăm, organizăm · 2 ore**  
**Code Maker Club · Python Builder**

> Cu `for` știi de la început de câte ori repeți. Dar uneori nu știi: repeți **cât timp** ceva este adevărat. Azi înveți bucla `while`.  
> Proiect: **„Pușculița”** · fișier: `Prenume_Nume_P2_L3.py`

---

## Obiectiv
La finalul orei folosești `while` cu o condiție, ai grijă ca bucla să se **oprească**, citești date până când utilizatorul scrie ce trebuie și alegi între `for` și `while`.  
**Minim:** o buclă `while` care numără de la 1 la 5.  
**Ținta orei (Complet):** + un program care cere parola până o știi, o simulare cu `while` și un meniu care se repetă.

## De ce contează
Un joc rulează „cât timp jucătorul mai are vieți”. O aplicație cere parola „cât timp nu este corectă”. Nu știi dinainte câte încercări vor fi, de aceea ai nevoie de `while`.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L2 |
| 10–35 | Prima buclă `while` (**Exemplele 1–2**) |
| 35–55 | Condiții care se schimbă și simulări (**Exemplele 3, 5**) |
| 55–75 | Cerem date până sunt corecte (**Exemplul 4**) |
| 75–95 | Bucla infinită, `while True`, meniu (**Exemplele 6–7, 9**) |
| 95–105 | `for` sau `while`? (**Exemplul 8**) |
| 105–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L2

- `for` repetă de un număr **cunoscut** de ori.
- Bucle imbricate: una în alta.
- `range(a, b, pas)` dă numere de la `a` până la `b`.

**Încearcă tu (3 min)**  
- [ ] Afișează cu un `for` numerele de la 1 la 5  

---

## 2. Bucla `while`

`while` înseamnă „**cât timp**”. Python verifică o condiție; dacă este adevărată, execută blocul, apoi verifică din nou. Se oprește când condiția devine falsă.

### Exemplul 1 — Numărăm cu `while`

```python
contor = 1
while contor <= 5:
    print("Numarul", contor)
    contor = contor + 1
print("Gata!")
```

**Ieșire:**
```text
Numarul 1
Numarul 2
Numarul 3
Numarul 4
Numarul 5
Gata!
```

Pașii:
1. `contor` pornește de la 1.
2. Python verifică `contor <= 5`. Este adevărat, deci intră în buclă.
3. Afișează și **crește** `contor` cu 1.
4. Revine sus și verifică din nou. Când `contor` devine 6, condiția e falsă, deci bucla se oprește.

**Regula de aur:** în interiorul buclei trebuie să **schimbi ceva** care face condiția să devină falsă la un moment dat. Altfel, bucla nu se oprește niciodată!

### Exemplul 2 — Numărătoare inversă

```python
secunde = 5
while secunde > 0:
    print(secunde)
    secunde -= 1
print("Decolare!")
```

**Ieșire:**
```text
5
4
3
2
1
Decolare!
```

---

## 3. Condiții care se schimbă

### Exemplul 3 — Adunăm până depășim 50

```python
total = 0
n = 1
while total < 50:
    total += n
    n += 1
print("Total:", total)
print("Am adunat", n - 1, "numere")
```

**Ieșire:**
```text
Total: 55
Am adunat 10 numere
```

Cu `for` nu am fi știut câte numere trebuie adunate. Aici bucla se oprește singură când suma ajunge la cel puțin 50.

---

## 4. Cerem date până sunt corecte

### Exemplul 4 — Parola

```python
parola = ""
while parola != "python":
    parola = input("Parola: ")
    if parola != "python":
        print("Gresit, mai incearca!")
print("Bine ai venit!")
```

**Ieșire:**
```text
Parola: gresit
Gresit, mai incearca!
Parola: inca
Gresit, mai incearca!
Parola: python
Bine ai venit!
```

Bucla se repetă până când `parola` devine `"python"`. Observă că am dat variabilei o valoare de început (`""`), ca să existe la prima verificare a condiției.

### Exemplul 5 — Câte zile până la 1000?

```python
bani = 1
zile = 0
while bani < 1000:
    bani = bani * 2
    zile += 1
print(f"Dupa {zile} zile ai {bani} lei")
```

**Ieșire:**
```text
Dupa 10 zile ai 1024 lei
```

Povestea clasică: dacă îți dublezi banii în fiecare zi, în doar 10 zile treci de 1000. Cu `while`, calculatorul găsește răspunsul fără să știm dinainte numărul de zile.

---

## 5. Bucla infinită și `while True`

### Exemplul 6 — Atenție la buclele infinite

Acest program **nu se oprește niciodată** (nu-l rula, decât dacă vrei să încerci și apoi să-l oprești):

```text
n = 1
while n < 5:
    print("Se repeta la nesfarsit!")
```

Variabila `n` nu se schimbă în buclă, deci `n < 5` este mereu adevărat. Dacă ți se întâmplă, apasă butonul roșu **Stop** din Thonny (sau **Ctrl + C**).

### Exemplul 7 — `while True` cu `break`

Uneori scriem intenționat o buclă infinită și o oprim cu `break` (despre care vei învăța mai mult în lecția următoare):

```python
while True:
    cuvant = input("Scrie un cuvant (stop pentru a iesi): ")
    if cuvant == "stop":
        break
    print("Ai scris:", cuvant)
print("La revedere!")
```

**Ieșire:**
```text
Scrie un cuvant (stop pentru a iesi): mere
Ai scris: mere
Scrie un cuvant (stop pentru a iesi): pere
Ai scris: pere
Scrie un cuvant (stop pentru a iesi): stop
La revedere!
```

`while True` înseamnă „mereu”. `break` iese din buclă imediat.

---

## 6. `for` sau `while`?

### Exemplul 8 — Aceeași treabă, două feluri

```python
# Cu for
for i in range(1, 4):
    print("for:", i)

# Cu while
i = 1
while i < 4:
    print("while:", i)
    i += 1
```

**Ieșire:**
```text
for: 1
for: 2
for: 3
while: 1
while: 2
while: 3
```

| Folosește… | Când |
|-----------|------|
| `for` | știi **de câte ori** repeți, sau parcurgi o listă/un text |
| `while` | repeți **cât timp** o condiție e adevărată și nu știi de câte ori |

### Exemplul 9 — Meniu care se repetă

```python
optiune = -1
while optiune != 0:
    print("--- MENIU ---")
    print("1. Salut")
    print("2. Gluma")
    print("0. Iesire")
    optiune = int(input("Alege: "))
    if optiune == 1:
        print("Salut, prietene!")
    elif optiune == 2:
        print("De ce plange calculatorul? Pentru ca i s-a stricat Windows!")
print("Pa!")
```

**Ieșire:**
```text
--- MENIU ---
1. Salut
2. Gluma
0. Iesire
Alege: 1
Salut, prietene!
--- MENIU ---
1. Salut
2. Gluma
0. Iesire
Alege: 2
De ce plange calculatorul? Pentru ca i s-a stricat Windows!
--- MENIU ---
1. Salut
2. Gluma
0. Iesire
Alege: 0
Pa!
```

Aproape toate programele cu meniuri sunt făcute așa: bucla se repetă până alegi „Ieșire”.

---

## 7. Mini-proiect

### Exemplul 10 — Pușculița

```python
tinta = int(input("Cati lei vrei sa strangi? "))
strans = 0
depuneri = 0
while strans < tinta:
    suma = int(input(f"Ai strans {strans} lei. Cat pui acum? "))
    strans += suma
    depuneri += 1
print("-" * 25)
print(f"Bravo! Ai strans {strans} lei din {depuneri} depuneri.")
if strans > tinta:
    print(f"Ai depasit tinta cu {strans - tinta} lei.")
```

**Ieșire:**
```text
Cati lei vrei sa strangi? 100
Ai strans 0 lei. Cat pui acum? 30
Ai strans 30 lei. Cat pui acum? 50
Ai strans 80 lei. Cat pui acum? 40
-------------------------
Bravo! Ai strans 120 lei din 3 depuneri.
Ai depasit tinta cu 20 lei.
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Pușculița” (obligatoriu)
Scrie un program care:
1. întreabă ce sumă vrei să strângi;
2. cere, într-o buclă `while`, câți lei pui de fiecare dată;
3. afișează de fiecare dată cât ai strâns până acum;
4. la final afișează numărul de depuneri și cu cât ai depășit ținta (dacă e cazul).

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
n = 10
while n > 0:
    n -= 3
    print(n)
print("Gata")
```

### Exercițiul C — Jocul „Cu cât ajunge?”
Pornește de la numărul 1 și **triplează-l** (`* 3`) cât timp este mai mic decât 500. Afișează de câte ori ai triplat și numărul final.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
contor = 0
while contor < 5
print(contor)
numar = input("Numar: ")
while numar < 10:
    print("Prea mic")
while True:
    print("Salut")
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Când se oprește o buclă `while`?  
2. Ce se întâmplă dacă uiți să schimbi variabila din condiție?  
3. Când alegi `while` în loc de `for`?

**Gata când:**
- [ ] Programul folosește `while`  
- [ ] Bucla se oprește corect  
- [ ] Afișează progresul la fiecare pas  
- [ ] Ai testat cu o țintă mare și cu una mică  
- [ ] Ai explicat pe foaie când se oprește un `while`  
- [ ] Fișierul se numește `Prenume_Nume_P2_L3.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Fă un program care calculează în câți ani îți dublezi banii cu o dobândă de 10% pe an  
- [ ] Cere numere până scrii `0` și afișează **suma** lor  
- [ ] Cere un număr și afișează cifrele lui în ordine inversă, folosind `% 10` și `// 10` într-un `while`  
- [ ] Fă un meniu cu 4 opțiuni care se repetă până la `0`  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Programul „stă” și nu se mai oprește | Bucla infinită: condiția nu devine niciodată falsă | Schimbă variabila în buclă; oprește cu **Stop** |
| `SyntaxError` după `while x < 5` | Ai uitat `:` | `while x < 5:` |
| `NameError` la condiția buclei | Variabila nu a fost creată înainte | Dă-i o valoare de început |
| Bucla nu rulează deloc | Condiția e falsă de la început | Verifică valoarea de început |
| `TypeError: '<' not supported between 'str' and 'int'` | `input` dă text | `int(input(...))` |
| Se repetă o dată în plus sau în minus | `<` și `<=` confundate | Verifică limita cu un exemplu mic |

---

## Recapitulare pe scurt

- `while condiție:` repetă blocul **cât timp** condiția este adevărată.
- În buclă trebuie să schimbi ceva ca bucla să se termine.
- O buclă care nu se oprește se numește **infinită**; o oprești cu **Stop** sau **Ctrl + C**.
- `while True` + `break` este o buclă care se oprește la comandă.
- `for` = știi de câte ori; `while` = repeți până se schimbă ceva.
- Meniurile și cererile de parolă folosesc `while`.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie un program care cere **numere** până când suma lor depășește 100 și apoi afișează câte numere au fost.  
3. Scrie un program care cere **parola** de cel mult 3 ori (cu `while` și un contor de încercări).  
4. **Bonus:** program care dublează o valoare până o depășește pe alta, citită de la tastatură.  
5. Salvează totul ca `Tema_P2_L3_Prenume_Nume.py`.

---

## Ce urmează — Lecția 4
Aflăm să **ieșim** din buclă la momentul potrivit cu `break` și să **sărim** peste un pas cu `continue`.
