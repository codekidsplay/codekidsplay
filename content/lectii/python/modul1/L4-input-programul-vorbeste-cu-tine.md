# LECȚIA 4 — `input`: programul vorbește cu tine
**Modulul 1 · Primii pași în Python · 2 ore**  
**Code Maker Club · Python Starter**

> Până acum programele tale doar **vorbeau**. Azi le înveți să și **asculte**: programul te întreabă ceva, tu răspunzi, iar el folosește răspunsul tău.  
> Proiect: **„Interviul”** · fișier: `Prenume_Nume_P1_L4.py`

---

## Obiectiv
La finalul orei folosești `input()` ca să citești text de la tastatură, transformi răspunsul în număr cu `int()` și `float()` și construiești programe care vorbesc cu utilizatorul.  
**Minim:** un program care întreabă numele și vârsta și le folosește într-un mesaj.  
**Ținta orei (Complet):** + un calcul cu numerele introduse și un mesaj final personalizat.

## De ce contează
Aproape toate aplicațiile cer ceva de la utilizator: o parolă, un nume, o alegere. Cu `input()` programele tale devin **interactive**, adică se comportă diferit de fiecare dată, în funcție de ce scrie omul.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L3 |
| 10–35 | `input()` pentru text (**Exemplele 1–2**) |
| 35–65 | Numere de la tastatură: `int()` și `float()` (**Exemplele 3–5**) |
| 65–90 | Mai multe întrebări, calcule (**Exemplele 6–7**) |
| 90–105 | Erori la `input` (**Exemplul 8**) și calcule utile (**Exemplul 9**) |
| 105–118 | Mini-proiect (**Exemplul 10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L3

- Tipuri: `int` (întreg), `float` (cu virgulă), `str` (text), `bool`.
- `int("5")` transformă textul `"5"` în numărul `5`.
- Nu poți lipi text cu număr fără `str(...)`.

**Încearcă tu (3 min)**  
- [ ] Scrie cum transformi textul `"12"` în număr și cum aduni 3 la el  

---

## 2. Cum funcționează `input()`

`input("mesaj")` face trei lucruri:
1. **afișează** mesajul (întrebarea);
2. **așteaptă** ca tu să scrii ceva și să apeși **Enter**;
3. **dă înapoi** ce ai scris, ca **text**.

De obicei, rezultatul se pune într-o variabilă.

> **În Thonny:** când programul așteaptă un răspuns, **dă click în zona Shell** (jos), scrie răspunsul și apasă **Enter**. Dacă nu dai click acolo, nu se întâmplă nimic!

În exemplele de mai jos, ce **scrii tu** apare după întrebare, pe același rând.

### Exemplul 1 — Prima întrebare

```python
nume = input("Cum te cheama? ")
print("Salut,", nume)
```

**Ieșire:**
```text
Cum te cheama? Ana
Salut, Ana
```

Observă spațiul de la finalul întrebării (`"Cum te cheama? "`): el face ca răspunsul să nu se lipească de semnul întrebării.

### Exemplul 2 — `input` dă mereu text

```python
varsta = input("Cati ani ai? ")
print(varsta)
print(type(varsta))
```

**Ieșire:**
```text
Cati ani ai? 10
10
<class 'str'>
```

Chiar dacă ai scris un număr, `input()` îl dă ca **text** (`str`). Dacă vrei să calculezi cu el, trebuie să-l transformi.

---

## 3. Numere de la tastatură

### Exemplul 3 — `int(input(...))`

```python
varsta = int(input("Cati ani ai? "))
print("Anul viitor vei avea", varsta + 1, "ani")
```

**Ieșire:**
```text
Cati ani ai? 10
Anul viitor vei avea 11 ani
```

`int(input(...))` citește textul și îl transformă într-un număr întreg. Acum putem calcula cu el: `varsta + 1`.

### Exemplul 4 — `float(input(...))` pentru numere cu virgulă

```python
pret = float(input("Cat costa o inghetata? "))
print("Doua inghetate costa", pret * 2)
```

**Ieșire:**
```text
Cat costa o inghetata? 4.5
Doua inghetate costa 9.0
```

Pentru numere cu zecimale folosim `float`, iar utilizatorul scrie punctul zecimal: `4.5`.

### Exemplul 5 — Suma a două numere

```python
a = int(input("Primul numar: "))
b = int(input("Al doilea numar: "))
print("Suma este", a + b)
```

**Ieșire:**
```text
Primul numar: 12
Al doilea numar: 30
Suma este 42
```

---

## 4. Mai multe întrebări

### Exemplul 6 — Un mic dialog

```python
nume = input("Cum te cheama? ")
culoare = input("Care e culoarea ta preferata? ")
print("Salut, " + nume + "! " + culoare + " este o culoare frumoasa.")
```

**Ieșire:**
```text
Cum te cheama? Maria
Care e culoarea ta preferata? albastru
Salut, Maria! albastru este o culoare frumoasa.
```

### Exemplul 7 — Aria unui cerc

```python
raza = float(input("Raza cercului: "))
aria = 3.14 * raza * raza
print("Aria este", aria)
```

**Ieșire:**
```text
Raza cercului: 2
Aria este 12.56
```

Aici am folosit `3.14` pentru π. Chiar dacă utilizatorul a scris `2`, `float` îl transformă în `2.0` și calculul merge.

---

## 5. Erori și calcule utile

### Exemplul 8 — Ce se întâmplă dacă scrii litere unde cerem număr?

```text
varsta = int(input("Cati ani ai? "))
```

Dacă utilizatorul scrie `zece` în loc de `10`, Python oprește programul cu `ValueError: invalid literal for int()`. Programul **nu** se strică din cauza ta: cere pur și simplu un număr, iar tu ai scris litere. Mai târziu, în modulul 4, vei învăța să prinzi astfel de erori cu `try/except`. Până atunci, **scrie doar numere** când programul cere numere.

### Exemplul 9 — Din ore în minute

```python
ore = int(input("Cate ore a durat filmul? "))
minute = ore * 60
print(ore, "ore =", minute, "minute")
```

**Ieșire:**
```text
Cate ore a durat filmul? 3
3 ore = 180 minute
```

---

## 6. Mini-proiect

### Exemplul 10 — Interviul

```python
print("=== Interviu ===")
nume = input("Cum te cheama? ")
varsta = int(input("Cati ani ai? "))
joc = input("Care e jocul tau preferat? ")

print("-" * 20)
print("Raport:")
print("Nume:", nume)
print("Litere in nume:", len(nume))
print("Varsta:", varsta)
print("Peste 5 ani vei avea", varsta + 5, "ani")
print("Jocul preferat:", joc)
print("Multumesc, " + nume + "!")
```

**Ieșire:**
```text
=== Interviu ===
Cum te cheama? Alex
Cati ani ai? 11
Care e jocul tau preferat? Minecraft
--------------------
Raport:
Nume: Alex
Litere in nume: 4
Varsta: 11
Peste 5 ani vei avea 16 ani
Jocul preferat: Minecraft
Multumesc, Alex!
```

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Interviul” (obligatoriu)
Scrie un program care:
1. întreabă **numele**, **vârsta** și **un lucru preferat** (joc, mâncare, animal);
2. afișează un raport cu un chenar;
3. calculează și afișează **câți ani vei avea peste 5 ani** și **câte litere** are numele tău.

### Exercițiul B — Calculatorul de buzunar
Citește **două numere** de la tastatură și afișează suma, diferența și produsul lor, fiecare pe câte un rând, cu mesaj clar.

### Exercițiul C — Calculatorul de bani
Întreabă cât costă un joc și câte jocuri vrea să cumpere utilizatorul. Afișează cât are de plătit (folosește `float` pentru preț).

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
nume = input(Cum te cheama? )
varsta = input("Cati ani ai? ")
print("Anul viitor ai " + varsta + 1 + " ani")
pret = float(input("Pret: "))
print("Dublul este" pret * 2)
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce tip de date dă mereu `input()`?  
2. De ce scriem `int(input(...))` când vrem un număr?  
3. De ce punem un spațiu la finalul întrebării din `input`?

**Gata când:**
- [ ] Programul rulează și pune cel puțin 3 întrebări  
- [ ] Folosește `int()` pentru vârstă  
- [ ] Afișează un raport clar, cu chenar  
- [ ] Face cel puțin un calcul cu un număr introdus  
- [ ] Ai explicat pe foaie ce tip dă `input()`  
- [ ] Fișierul se numește `Prenume_Nume_P1_L4.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Citește două numere și afișează **media** lor  
- [ ] Citește o temperatură în Celsius și afișează-o în Fahrenheit (`c * 9 / 5 + 32`)  
- [ ] Citește un număr și afișează dublul, triplul și pătratul lui  
- [ ] Citește un nume și afișează-l de 3 ori, pe același rând, cu `-` între ele  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| Programul „stă” și nu face nimic | Așteaptă răspunsul, dar nu ai dat click în Shell | Click în Shell, scrie și apasă Enter |
| `TypeError: can only concatenate str (not "int") to str` | Ai lipit un `input` (text) cu un număr | `int(varsta) + 1` sau `str(...)` |
| `20` + `5` dă `205` | Ai lipit două texte, nu ai transformat în număr | `int(a) + int(b)` |
| `ValueError: invalid literal for int()` | Ai scris litere sau zecimale la `int(input())` | Scrie doar numere întregi; pentru zecimale folosește `float` |
| `NameError: name 'Cum' is not defined` | Ai uitat ghilimelele din `input(...)` | `input("Cum te cheama? ")` |
| Răspunsul se lipește de întrebare | Lipsește spațiul de la finalul întrebării | `"Cum te cheama? "` |

---

## Recapitulare pe scurt

- `input("întrebare")` afișează întrebarea, așteaptă răspunsul și îl dă ca **text**.
- Răspunsul se pune de obicei într-o variabilă.
- Pentru numere folosim `int(input(...))` (întregi) sau `float(input(...))` (cu zecimale).
- În Thonny, răspunsul se scrie în **Shell**, urmat de **Enter**.
- Dacă scrii litere unde se cere număr, apare `ValueError`.
- Spațiul de la finalul întrebării face programul mai ușor de folosit.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie un program **„Magazin”**: citește prețul unui produs și numărul de bucăți și afișează totalul.  
3. Scrie un program care citește **numele tău și al unui prieten** și afișează un mesaj de felicitare pentru amândoi.  
4. **Bonus:** convertește din km în metri și din metri în centimetri, citind un număr de la tastatură.  
5. Salvează totul ca `Tema_P1_L4_Prenume_Nume.py`.

---

## Ce urmează — Lecția 5
Învățăm **operatorii**: rest la împărțire, ridicare la putere și ordinea în care Python face calculele.
