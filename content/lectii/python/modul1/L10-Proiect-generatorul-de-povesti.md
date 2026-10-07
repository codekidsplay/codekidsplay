# LECȚIA 10 — Proiect: generatorul de povești
**Modulul 1 · Primii pași în Python · 2 ore**  
**Code Maker Club · Python Starter**

> Aceasta este lecția de final a modulului. Folosești tot ce ai învățat: `print`, variabile, `input`, operatori, f-string, `if` și `random`, ca să construiești un **generator de povești** care scrie o poveste diferită de fiecare dată.  
> Proiect: **„Povestea mea”** · fișier: `Prenume_Nume_P1_L10.py`

---

## Obiectiv
La finalul orei ai un program complet, de 40–60 de linii, care citește date de la utilizator, alege la întâmplare părți din poveste, ia decizii cu `if` și afișează totul frumos. Apoi îți verifici cunoștințele din tot modulul.  
**Minim:** un program care citește 3 lucruri (nume, animal, loc) și afișează o poveste cu f-string.  
**Ținta orei (Complet):** + începuturi și sfârșituri alese cu `random.choice`, un zar care schimbă finalul și un chenar frumos.

## De ce contează
Proiectele sunt locul în care se vede dacă ai înțeles. Aici îmbini 9 lecții într-un singur program. Programatorii adevărați învață la fel: construind lucruri mici, dar complete.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare modul și planul poveștii |
| 10–30 | Citim datele: `input` și f-string (**Exemplul 1**) |
| 30–55 | Alegem părți la întâmplare (**Exemplele 2–3**) |
| 55–75 | Final diferit cu zarul și `if` (**Exemplul 4**) |
| 75–95 | Povestea completă (**Exemplul 5**) |
| 95–115 | Verificarea modulului 1 |
| 115–120 | Recap și temă |

---

## 1. Planul poveștii

O poveste are trei părți: **început**, **întâmplare**, **sfârșit**. Programul tău:
1. întreabă **eroul**, un **animal**, un **loc** și un **obiect**;
2. alege la întâmplare un **început**, o **întâmplare** și o **încheiere**;
3. aruncă un **zar** care decide dacă sfârșitul e fericit;
4. afișează povestea într-un chenar.

### Exemplul 1 — Citim datele

```python
erou = input("Numele eroului: ")
animal = input("Un animal: ")
loc = input("Un loc: ")
obiect = input("Un obiect: ")

print(f"Eroul: {erou}, animalul: {animal}, locul: {loc}, obiectul: {obiect}")
```

**Ieșire:**
```text
Numele eroului: Ana
Un animal: dragon
Un loc: padure
Un obiect: cheie
Eroul: Ana, animalul: dragon, locul: padure, obiectul: cheie
```

---

## 2. Părți alese la întâmplare

### Exemplul 2 — Începuturi

```python
import random

inceputuri = [
    "Intr-o dimineata insorita",
    "Intr-o noapte cu luna plina",
    "Pe vremea cand copacii vorbeau",
]
inceput = random.choice(inceputuri)
print(inceput)
```

**Ieșire (la tine poate fi altul):**
```text
Pe vremea cand copacii vorbeau
```

### Exemplul 3 — Întâmplări cu f-string

```python
import random

erou = input("Numele eroului: ")
animal = input("Un animal: ")
loc = input("Un loc: ")
obiect = input("Un obiect: ")

intamplari = [
    f"{erou} a gasit {obiect} in {loc}.",
    f"{erou} s-a intalnit cu un {animal} prietenos.",
    f"Un {animal} a furat {obiect} lui {erou}.",
]
print(random.choice(intamplari))
```

**Ieșire (exemplu):**
```text
Numele eroului: Ana
Un animal: dragon
Un loc: padure
Un obiect: cheie
Un dragon a furat cheie lui Ana.
```

Poți pune f-string-uri chiar **în interiorul listei**: Python le completează imediat, folosind variabilele de până atunci.

---

## 3. Zarul decide finalul

### Exemplul 4 — Final fericit sau nu?

```python
import random

zar = random.randint(1, 6)
print("Zarul a aratat:", zar)

if zar >= 5:
    final = "Au trait fericiti pana la adanci batranete."
elif zar >= 3:
    final = "Totul s-a rezolvat, dar cu putin efort."
else:
    final = "Aventura abia incepe... continuarea urmeaza!"
print(final)
```

**Ieșire (exemplu):**
```text
Zarul a aratat: 4
Totul s-a rezolvat, dar cu putin efort.
```

---

## 4. Povestea completă

### Exemplul 5 — Generatorul

```python
import random

print("=== GENERATOR DE POVESTI ===")
erou = input("Numele eroului: ")
animal = input("Un animal: ")
loc = input("Un loc: ")
obiect = input("Un obiect: ")

inceputuri = [
    "Intr-o dimineata insorita",
    "Intr-o noapte cu luna plina",
    "Pe vremea cand copacii vorbeau",
]
intamplari = [
    f"{erou} a gasit {obiect} in {loc}.",
    f"{erou} s-a intalnit cu un {animal} prietenos.",
    f"Un {animal} a furat {obiect} lui {erou}.",
]

zar = random.randint(1, 6)
if zar >= 5:
    final = "Au trait fericiti pana la adanci batranete."
elif zar >= 3:
    final = "Totul s-a rezolvat, dar cu putin efort."
else:
    final = "Aventura abia incepe... continuarea urmeaza!"

print()
print("*" * 40)
print(f"  POVESTEA LUI {erou.upper()}")
print("*" * 40)
print(random.choice(inceputuri) + ", in " + loc + ",")
print(random.choice(intamplari))
print(final)
print("*" * 40)
```

**Ieșire (exemplu):**
```text
=== GENERATOR DE POVESTI ===
Numele eroului: Ana
Un animal: dragon
Un loc: padure
Un obiect: cheie

****************************************
  POVESTEA LUI ANA
****************************************
Intr-o noapte cu luna plina, in padure,
Ana s-a intalnit cu un dragon prietenos.
Totul s-a rezolvat, dar cu putin efort.
****************************************
```

Observă `print()` fără nimic în paranteze: afișează un **rând gol**.

---

## 5. Verificarea modulului 1

Rezolvă pe foaie, fără să te uiți în lecții. Răspunsurile sunt la final.

| # | Întrebare |
|---|-----------|
| 1 | Ce afișează `print("2" + "3")`? |
| 2 | Ce tip are `3.5`? |
| 3 | Ce afișează `print(int("5") + 3)`? |
| 4 | Cât este `17 % 5`? Dar `17 // 5`? |
| 5 | Ce afișează `"Python"[0]`? |
| 6 | Ce face `text.upper()`? |
| 7 | Ce afișează `print(3 > 5 or 2 < 4)`? |
| 8 | Ce valori poate da `random.randint(1, 6)`? |
| 9 | Ce tip de date dă mereu `input()`? |
| 10 | Ce afișează `print(not True and False)`? |

**Răspunsuri:** 1) `23` · 2) `float` · 3) `8` · 4) `2` și `3` · 5) `P` · 6) transformă toate literele în litere mari · 7) `True` · 8) orice număr întreg de la 1 la 6, inclusiv · 9) text (`str`) · 10) `False`.

**Autoevaluare** — bifează cât ești de sigur:

| Pot să… | Încă nu | Cu ajutor | Singur |
|---------|---------|-----------|--------|
| afișez text și numere cu `print` | ☐ | ☐ | ☐ |
| folosesc variabile | ☐ | ☐ | ☐ |
| citesc date cu `input` și le transform cu `int()` | ☐ | ☐ | ☐ |
| fac calcule cu `+ - * / // % **` | ☐ | ☐ | ☐ |
| construiesc mesaje cu f-string | ☐ | ☐ | ☐ |
| iau decizii cu `if / elif / else` | ☐ | ☐ | ☐ |
| leg condiții cu `and`, `or`, `not` | ☐ | ☐ | ☐ |
| folosesc `random` | ☐ | ☐ | ☐ |

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Povestea mea” (obligatoriu)
Scrie propriul generator de povești care:
1. întreabă **cel puțin 4 lucruri** de la utilizator;
2. folosește **trei liste** cu cel puțin 3 variante fiecare (început, întâmplare, sfârșit);
3. folosește un **zar** și un `if / elif / else` pentru final;
4. afișează povestea într-un **chenar**, cu titlul cu litere mari.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
erou = "Mihai"
print(f"Povestea lui {erou.upper()}")
print(erou[0] + ".")
print(len(erou) * "*")
print(f"{erou} are {len(erou)} litere")
```

### Exercițiul C — O încheiere în plus
Adaugă la poveste **o a patra parte** („Mesajul poveștii”) aleasă la întâmplare dintr-o listă de 3 mesaje.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
import random
erou = input("Erou: )
inceputuri = ["Odata", "Candva" "Mai demult"]
print(random.choice(inceputuri))
print(f"Eroul se numeste {erou)
varsta = input("Varsta: ")
print(varsta + 1)
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce poveștile sunt diferite la fiecare rulare?  
2. Care e rolul `if` în program?  
3. Ce lecție din modul ți s-a părut cea mai grea și de ce?

**Gata când:**
- [ ] Programul rulează fără erori  
- [ ] Citește minimum 4 date  
- [ ] Folosește `random.choice`, `random.randint`, f-string și `if / elif / else`  
- [ ] Povestea e diferită la rulări diferite  
- [ ] Ai completat verificarea modulului  
- [ ] Fișierul se numește `Prenume_Nume_P1_L10.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă un **personaj secundar** (prieten sau dușman) citit de la tastatură  
- [ ] Fă povestea să aibă **două finaluri secrete**, alese la întâmplare  
- [ ] Afișează la sfârșit un **scor al aventurii** (zarul × 10)  
- [ ] Citește vârsta cititorului și schimbă tonul poveștii: pentru copii mici, mai blând; pentru mari, mai mult mister  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `NameError: name 'erou' is not defined` | Ai folosit variabila înainte să o citești | Citește `erou` mai sus |
| Povestea arată mereu la fel | Ai scris textul direct, fără `random.choice` | Pune variantele într-o listă |
| f-string-ul din listă nu se completează cu valorile corecte | Lista e scrisă **înainte** de `input` | Scrie lista **după** ce citești datele |
| `TypeError` la `varsta + 1` | `input` dă text | `int(varsta) + 1` |
| Lipsește virgula între elementele listei | Python lipește textele alăturate | Pune `,` după fiecare element |
| `final` nu e definit | Un caz din `if` nu atribuie `final` | Atribuie `final` în fiecare ramură |

---

## Recapitulare pe scurt — tot Modulul 1

- `print`, `input`, variabile, tipuri: `int`, `float`, `str`, `bool`.
- Operatori: `+ - * / // % **` și ordinea operațiilor.
- f-string și metode de text: `f"..."`, `.upper()`, `.lower()`, `[ ]`, `[ : ]`.
- Decizii: `if`, `elif`, `else`, cu `==`, `!=`, `<`, `>`, `<=`, `>=`.
- Condiții combinate: `and`, `or`, `not`.
- Noroc: `import random`, `randint`, `choice`, liste simple.

---

## Temă
1. Mai joacă-te cu generatorul: adaugă încă 3 începuturi, 3 întâmplări și 3 finaluri.  
2. Arată povestea unui prieten și întreabă-l ce ar adăuga.  
3. Scrie pe o foaie **cinci lucruri** pe care le poți face acum cu Python și nu le puteai face acum 10 lecții.  
4. **Bonus:** transformă povestea într-un joc cu două „drumuri” (alege `da` sau `nu`).  
5. Salvează totul ca `Tema_P1_L10_Prenume_Nume.py`.

---

## Ce urmează — Modulul 2
Învățăm să **repetăm** (cu `for` și `while`), să **colecționăm** (liste, dicționare) și să **organizăm** programele în funcții.
