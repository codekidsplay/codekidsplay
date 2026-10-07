# LECȚIA 6 — Text: f-string și metode
**Modulul 1 · Primii pași în Python · 2 ore**  
**Code Maker Club · Python Starter**

> Textul e peste tot: nume, mesaje, parole, scoruri. Azi înveți să construiești propoziții cu **f-string**, să schimbi literele mari și mici, să tai și să înlocuiești bucăți de text.  
> Proiect: **„Laboratorul de cuvinte”** · fișier: `Prenume_Nume_P1_L6.py`

---

## Obiectiv
La finalul orei folosești f-string pentru mesaje cu variabile, formatezi numere cu zecimale, folosești metodele `upper()`, `lower()`, `title()`, `replace()`, `strip()`, `count()`, `find()`, alegi litere cu `[ ]` și tai bucăți de text cu `[ : ]`.  
**Minim:** un program care citește un nume și îl afișează cu litere mari, cu prima literă și cu lungimea.  
**Ținta orei (Complet):** + textul inversat, un cuvânt înlocuit și un mesaj construit cu f-string.

## De ce contează
Jocurile afișează mesaje („Ai 3 vieți”), aplicațiile curăță textul scris de utilizatori, iar parolele se verifică litera cu litera. Cu f-string și metodele de text faci toate astea simplu.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L5 |
| 10–35 | f-string și formatarea numerelor (**Exemplele 1–3**) |
| 35–60 | Metode: `upper`, `lower`, `title`, `replace`, `strip` (**Exemplele 4–6**) |
| 60–90 | Litere și bucăți de text: `[ ]` și `[ : ]` (**Exemplele 7–8**) |
| 90–105 | `in`, `count`, `find` (**Exemplul 9**) |
| 105–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L5

- Operatorii: `+ - * / // % **`.
- Un text se lipește cu `+` și se repetă cu `*`.
- `len(text)` dă lungimea.

**Încearcă tu (3 min)**  
- [ ] Afișează lungimea cuvântului `"programare"` și repetă-l de 2 ori  

---

## 2. f-string: propoziții cu variabile

Până acum lipeam texte cu `+` sau puneam virgule în `print`. Există o metodă mai comodă: **f-string**. Scrii litera `f` **înaintea** ghilimelelor, iar variabilele le pui între **acolade** `{ }`.

### Exemplul 1 — Prima f-string

```python
nume = "Ana"
varsta = 10
print(f"Ma numesc {nume} si am {varsta} ani.")
```

**Ieșire:**
```text
Ma numesc Ana si am 10 ani.
```

Python înlocuiește `{nume}` cu valoarea variabilei. Nu mai ai nevoie de `str(...)` pentru numere, iar propoziția arată ca în realitate.

### Exemplul 2 — Calcule în acolade

```python
a = 6
b = 7
print(f"{a} x {b} = {a * b}")
print(f"Peste 5 ani voi avea {a + 5} ani")
```

**Ieșire:**
```text
6 x 7 = 42
Peste 5 ani voi avea 11 ani
```

Între acolade poți pune și un **calcul**, nu doar o variabilă.

### Exemplul 3 — Numere cu zecimale

```python
pret = 3.14159
print(f"Pretul este {pret}")
print(f"Pretul rotunjit este {pret:.2f}")
print(f"O treime: {10 / 3:.1f}")
```

**Ieșire:**
```text
Pretul este 3.14159
Pretul rotunjit este 3.14
O treime: 3.3
```

`:.2f` înseamnă „arată numărul cu **2 zecimale**”. `:.1f` arată o zecimală. Foarte util pentru prețuri.

---

## 3. Metode: comenzi ale textului

O **metodă** este o comandă care „aparține” unui text. O scrii cu **punct**: `text.metoda()`. Metodele **nu schimbă** textul original, ci dau un text nou.

### Exemplul 4 — Litere mari și mici

```python
text = "salut lume"
print(text.upper())
print(text.lower())
print(text.title())
print(text.capitalize())
print(text)
```

**Ieșire:**
```text
SALUT LUME
salut lume
Salut Lume
Salut lume
salut lume
```

| Metodă | Ce face |
|--------|---------|
| `.upper()` | toate literele **mari** |
| `.lower()` | toate literele **mici** |
| `.title()` | fiecare cuvânt începe cu literă mare |
| `.capitalize()` | doar prima literă este mare |

Ultima linie arată că `text` a rămas la fel.

### Exemplul 5 — Înlocuim cuvinte

```python
fraza = "Imi plac mere si mere coapte"
print(fraza.replace("mere", "pere"))
print(fraza.replace("mere", "pere", 1))
```

**Ieșire:**
```text
Imi plac pere si pere coapte
Imi plac pere si mere coapte
```

`replace(vechi, nou)` înlocuiește **toate** bucățile găsite. Al treilea număr (`1`) limitează la **câte** înlocuiri.

### Exemplul 6 — Curățăm spațiile

```python
text = "   salut   "
print(len(text))
print(text.strip())
print(len(text.strip()))
```

**Ieșire:**
```text
11
salut
5
```

`strip()` șterge spațiile de la **începutul** și de la **sfârșitul** textului. Util când utilizatorul scrie din greșeală spații în plus.

---

## 4. Literele dintr-un text

Fiecare literă dintr-un text are un **număr de ordine**, numit **index**. Indexul **începe de la 0**!

```text
 P   y   t   h   o   n
 0   1   2   3   4   5
-6  -5  -4  -3  -2  -1
```

### Exemplul 7 — O literă

```python
cuvant = "Python"
print(cuvant[0])
print(cuvant[2])
print(cuvant[-1])
print(cuvant[-2])
```

**Ieșire:**
```text
P
t
n
o
```

- `cuvant[0]` este **prima** literă.
- Indexul **negativ** numără de la sfârșit: `[-1]` este **ultima** literă.
- Dacă ceri un index prea mare (de exemplu `cuvant[10]`), Python dă `IndexError`.

### Exemplul 8 — O bucată de text (slicing)

```python
cuvant = "Python"
print(cuvant[0:3])
print(cuvant[2:])
print(cuvant[:2])
print(cuvant[::-1])
```

**Ieșire:**
```text
Pyt
thon
Py
nohtyP
```

`text[de_la:pana_la]` ia literele de la `de_la` **până la** `pana_la`, **fără** cea de la urmă.
- `[0:3]` ia literele 0, 1, 2 → `Pyt`.
- `[2:]` ia de la 2 până la capăt.
- `[:2]` ia de la început până la 2 (fără 2).
- `[::-1]` ia tot textul **invers**.

---

## 5. Căutăm în text

### Exemplul 9 — `in`, `count`, `find`

```python
text = "banana"
print("an" in text)
print("x" in text)
print(text.count("a"))
print(text.find("n"))
print(text.find("z"))
```

**Ieșire:**
```text
True
False
3
2
-1
```

| Cod | Ce face |
|-----|---------|
| `"an" in text` | `True` dacă bucata se află în text |
| `text.count("a")` | de câte ori apare `"a"` |
| `text.find("n")` | indexul primei apariții (sau `-1` dacă nu există) |

---

## 6. Mini-proiect

### Exemplul 10 — Laboratorul de cuvinte

```python
nume = input("Cum te cheama? ")

print("-" * 25)
print(f"Cu litere mari:  {nume.upper()}")
print(f"Cu litere mici:  {nume.lower()}")
print(f"Prima litera:    {nume[0]}")
print(f"Ultima litera:   {nume[-1]}")
print(f"Invers:          {nume[::-1]}")
print(f"Lungime:         {len(nume)}")
print(f"Litere 'a':      {nume.lower().count('a')}")
print("-" * 25)
```

**Ieșire:**
```text
Cum te cheama? Maria
-------------------------
Cu litere mari:  MARIA
Cu litere mici:  maria
Prima litera:    M
Ultima litera:   a
Invers:          airaM
Lungime:         5
Litere 'a':      2
-------------------------
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Laboratorul de cuvinte” (obligatoriu)
Scrie un program care:
1. citește **un cuvânt** de la tastatură;
2. afișează cu **f-string**: cuvântul cu litere mari, cu litere mici, prima literă, ultima literă, **inversat** și lungimea lui;
3. afișează de câte ori apare litera `a` în cuvânt.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
cuvant = "programare"
print(cuvant[0])
print(cuvant[-1])
print(cuvant[3:6])
print(cuvant.upper())
print(cuvant.count("r"))
print(cuvant.replace("a", "o"))
```

### Exercițiul C — Mesajul secret
Citește o propoziție și afișează-o: (1) cu litere mari, (2) cu toate vocalele `a` înlocuite cu `*`, (3) de la coadă la cap.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
nume = "Ana"
print("Salut {nume}!")
print(nume.Upper())
print(nume[10])
print(nume[1:3.0])
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce face litera `f` înaintea ghilimelelor?  
2. De ce primul index este `0`?  
3. Ce face `text[::-1]`?

**Gata când:**
- [ ] Programul citește un cuvânt  
- [ ] Folosește f-string  
- [ ] Afișează cuvântul inversat și lungimea  
- [ ] Folosește cel puțin 3 metode (`upper`, `lower`, `count`…)  
- [ ] Ai explicat pe foaie ce face `[::-1]`  
- [ ] Fișierul se numește `Prenume_Nume_P1_L6.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Citește un nume și afișează doar **inițiala** (prima literă mare) urmată de punct  
- [ ] Verifică dacă un cuvânt este **palindrom** (se citește la fel în ambele sensuri), de exemplu `"ele"`, comparând cuvântul cu inversul lui  
- [ ] Citește un text și afișează-l cu `.title()` și fără spațiile din margini  
- [ ] Afișează un preț cu **două zecimale** și simbolul `lei` în f-string  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Afișează `{nume}` în loc de `Ana` | Ai uitat `f` înaintea ghilimelelor | `f"Salut {nume}!"` |
| `AttributeError: 'str' object has no attribute 'Upper'` | Numele metodei s-a scris cu literă mare | `.upper()` cu litere mici |
| `IndexError: string index out of range` | Ai cerut un index care nu există | Indexul maxim este `len(text) - 1` |
| `text.upper` nu schimbă nimic | Ai uitat parantezele | `text.upper()` |
| Textul original nu s-a schimbat | Metodele dau un text **nou** | `text = text.upper()` |
| `[1:3]` ia 3 litere | Se ia de la 1 până la 3, **fără** 3 | `[1:3]` ia indexurile 1 și 2 |
| Acolade cu ghilimele în interior dau eroare | Ai folosit același fel de ghilimele | Folosește ghilimele diferite: `f"{nume.count('a')}"` |

---

## Recapitulare pe scurt

- `f"... {variabila} ..."` construiește un text cu valori din variabile sau calcule.
- `{numar:.2f}` arată un număr cu 2 zecimale.
- Metode de text: `.upper()`, `.lower()`, `.title()`, `.capitalize()`, `.replace()`, `.strip()`, `.count()`, `.find()`.
- Metodele **nu** schimbă textul original, ci dau unul nou.
- `text[0]` este prima literă, `text[-1]` ultima. Indexul începe de la **0**.
- `text[a:b]` ia litere de la `a` până la `b` (fără `b`); `text[::-1]` inversează.
- `"bucata" in text` verifică dacă bucata se află în text.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie un program care citește **prenumele și numele** și afișează: inițialele, numele complet cu litere mari și numărul total de litere (fără spațiu).  
3. Scrie un program care citește o **propoziție** și afișează de câte ori apare litera `e` în ea.  
4. **Bonus:** fă un program care ghicește dacă un cuvânt citit e palindrom, comparându-l cu inversul lui.  
5. Salvează totul ca `Tema_P1_L6_Prenume_Nume.py`.

---

## Ce urmează — Lecția 7
Programul învață să **decidă**: cu `if` face un lucru dacă e adevărat ceva și alt lucru dacă nu.
