# LECȚIA 9 — Funcții II
**Modulul 2 · Repetăm, colecționăm, organizăm · 2 ore**  
**Code Maker Club · Python Builder**

> Funcțiile devin cu adevărat puternice când primesc **liste**, returnează **mai multe valori**, se apelează **între ele** și îți ajută să-ți organizezi tot programul. Azi construiești un program din piese mici.  
> Proiect: **„Calculatorul cu funcții”** · fișier: `Prenume_Nume_P2_L9.py`

---

## Obiectiv
La finalul orei dai liste ca parametri, returnezi mai multe valori, apelezi funcții din alte funcții, folosești argumente cu nume și documentezi o funcție, validezi datele introduse și organizezi un program cu o funcție `main()`.  
**Minim:** o funcție care primește o listă și una care returnează două valori.  
**Ținta orei (Complet):** + o funcție de citire cu validare și un calculator organizat în funcții.

## De ce contează
Programele mari nu sunt scrise într-un singur bloc lung, ci din **piese mici**, fiecare cu un rol. Așa le poți testa pe rând, le poți reutiliza și le înțelegi mai ușor. Aceasta este arta de a „organiza” codul.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare L8 |
| 10–30 | Liste ca parametri (**Exemplul 1**) |
| 30–50 | Mai multe valori returnate (**Exemplul 2**) |
| 50–70 | Funcții care apelează funcții, argumente cu nume (**Exemplele 3–4**) |
| 70–90 | Documentare, funcții cu `random`, validare (**Exemplele 5–7**) |
| 90–100 | O funcție care se cheamă pe ea însăși (**Exemplul 8**) |
| 100–118 | `main()` și mini-proiect (**Exemplele 9–10**) |
| 118–120 | Recap și temă |

---

## 1. Recapitulare rapidă din L8

- `def` definește, `nume()` apelează.
- `return` dă un rezultat înapoi; `print` doar arată.
- Parametrii pot avea valori implicite.

**Încearcă tu (3 min)**  
- [ ] Scrie o funcție `triplu(x)` care returnează `x * 3`  

---

## 2. Liste în funcții

### Exemplul 1 — O funcție primește o listă

```python
def suma_lista(numere):
    total = 0
    for x in numere:
        total += x
    return total

def media(numere):
    return suma_lista(numere) / len(numere)

note = [9, 10, 8, 7]
print(suma_lista(note))
print(media(note))
print(media([5, 5]))
```

**Ieșire:**
```text
34
8.5
5.0
```

O funcție poate primi **o listă întreagă** ca parametru. Observă și că funcția `media` o **apelează** pe `suma_lista`: așa se construiesc funcții din funcții.

---

## 3. Mai multe valori

### Exemplul 2 — `return` cu două valori

```python
def min_max(lista):
    return min(lista), max(lista)

mic, mare = min_max([4, 9, 1, 7])
print("Cel mai mic:", mic)
print("Cel mai mare:", mare)

rezultat = min_max([3, 8])
print(rezultat)
```

**Ieșire:**
```text
Cel mai mic: 1
Cel mai mare: 9
(3, 8)
```

Cu `return a, b` funcția dă **două valori deodată**. Le primești în două variabile: `mic, mare = ...`. Dacă le pui într-o singură variabilă, obții o pereche între paranteze rotunde `(3, 8)`.

---

## 4. Funcții între ele, argumente cu nume

### Exemplul 3 — Funcții care apelează funcții

```python
def patrat(x):
    return x * x

def suma_patrate(a, b):
    return patrat(a) + patrat(b)

def ipotenuza(a, b):
    return suma_patrate(a, b) ** 0.5

print(patrat(5))
print(suma_patrate(3, 4))
print(ipotenuza(3, 4))
```

**Ieșire:**
```text
25
25
5.0
```

Teorema lui Pitagora, în trei pași mici: fiecare funcție face un singur lucru bine. `** 0.5` este rădăcina pătrată.

### Exemplul 4 — Argumente cu nume

```python
def prezinta(nume, varsta, hobby="jocuri"):
    print(f"{nume}, {varsta} ani, hobby: {hobby}")

prezinta("Ana", 10)
prezinta("Radu", 11, "fotbal")
prezinta(varsta=9, nume="Sofia")
prezinta("Dan", hobby="desen", varsta=12)
```

**Ieșire:**
```text
Ana, 10 ani, hobby: jocuri
Radu, 11 ani, hobby: fotbal
Sofia, 9 ani, hobby: jocuri
Dan, 12 ani, hobby: desen
```

Când apelezi o funcție, poți scrie `parametru=valoare`. Atunci **ordinea nu mai contează**, iar codul se citește mai ușor.

---

## 5. Documentare, noroc și validare

### Exemplul 5 — Descrierea unei funcții (docstring)

```python
def aria_cerc(raza):
    """Calculeaza aria unui cerc cu raza data."""
    return 3.14 * raza * raza

print(aria_cerc(2))
print(aria_cerc.__doc__)
```

**Ieșire:**
```text
12.56
Calculeaza aria unui cerc cu raza data.
```

Primul text scris **între ghilimele triple**, imediat sub `def`, se numește **docstring**: descrie ce face funcția. Îl citește oricine folosește funcția (și tu, peste o lună!).

### Exemplul 6 — O funcție cu noroc

```python
import random

def arunca_zar():
    return random.randint(1, 6)

def arunca_zaruri(cate):
    return [arunca_zar() for _ in range(cate)]

zaruri = arunca_zaruri(3)
print(len(zaruri))
print(all(1 <= z <= 6 for z in zaruri))
```

**Ieșire:**
```text
3
True
```

Zarurile diferă la fiecare rulare, așa că nu le afișăm. Verificăm doar că sunt 3 și că toate sunt între 1 și 6. Linia `[arunca_zar() for _ in range(cate)]` construiește o listă în care `arunca_zar()` se repetă de `cate` ori (`_` este un nume pentru o variabilă de care nu avem nevoie). Poți să o înlocuiești și cu un `for` obișnuit cu `append`.

### Exemplul 7 — Citire cu validare

```python
def citeste_numar(mesaj):
    while True:
        text = input(mesaj)
        if text.isdigit():
            return int(text)
        print("Te rog scrie un numar intreg, pozitiv!")

varsta = citeste_numar("Cati ani ai? ")
print("Ai", varsta, "ani")
```

**Ieșire:**
```text
Cati ani ai? abc
Te rog scrie un numar intreg, pozitiv!
Cati ani ai? -5
Te rog scrie un numar intreg, pozitiv!
Cati ani ai? 12
Ai 12 ani
```

Funcția **nu se oprește** până nu primește un număr valid: `return` iese din funcție și din buclă deodată. Acum, de câte ori ai nevoie de un număr, apelezi `citeste_numar(...)` și gata, fără să repeți codul.

---

## 6. O funcție care se cheamă pe ea însăși

### Exemplul 8 — Recursivitate (pentru curioși)

```python
def numaratoare(n):
    if n == 0:
        print("Start!")
    else:
        print(n)
        numaratoare(n - 1)

def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

numaratoare(3)
print(factorial(5))
```

**Ieșire:**
```text
3
2
1
Start!
120
```

O funcție se poate **chema pe ea însăși**; aceasta se numește **recursivitate**. Trebuie un **caz de oprire** (`n == 0` sau `n <= 1`), altfel funcția s-ar chema la nesfârșit. `factorial(5)` este `5 · 4 · 3 · 2 · 1 = 120`. Nu trebuie să stăpânești asta acum; e doar un gust din ce urmează.

---

## 7. Programul organizat

### Exemplul 9 — Funcția `main()`

```python
def titlu(text):
    print("=" * 20)
    print(text)
    print("=" * 20)

def salut(nume):
    return f"Salut, {nume}!"

def main():
    titlu("PROGRAMUL MEU")
    print(salut("Ana"))
    print(salut("Mihai"))
    print("Gata!")

main()
```

**Ieșire:**
```text
====================
PROGRAMUL MEU
====================
Salut, Ana!
Salut, Mihai!
Gata!
```

Programele organizate au **funcții mici** deasupra și o funcție **`main()`** care le folosește, apelată **o singură dată**, la sfârșit. Așa vezi imediat „povestea” programului.

---

## 8. Mini-proiect

### Exemplul 10 — Calculatorul cu funcții

```python
def aduna(a, b):
    return a + b

def scade(a, b):
    return a - b

def inmulteste(a, b):
    return a * b

def imparte(a, b):
    if b == 0:
        return None
    return a / b

def afiseaza_meniu():
    print("\n1. Aduna  2. Scade  3. Inmulteste  4. Imparte  0. Iesire")

def citeste_doua_numere():
    a = int(input("Primul numar: "))
    b = int(input("Al doilea numar: "))
    return a, b

def main():
    print("=== CALCULATOR ===")
    optiune = -1
    while optiune != 0:
        afiseaza_meniu()
        optiune = int(input("Alege: "))
        if optiune == 0:
            break
        a, b = citeste_doua_numere()
        if optiune == 1:
            print("Rezultat:", aduna(a, b))
        elif optiune == 2:
            print("Rezultat:", scade(a, b))
        elif optiune == 3:
            print("Rezultat:", inmulteste(a, b))
        elif optiune == 4:
            rezultat = imparte(a, b)
            if rezultat is None:
                print("Nu se poate imparti la 0!")
            else:
                print("Rezultat:", rezultat)
    print("Pa!")

main()
```

**Ieșire:**
```text
=== CALCULATOR ===

1. Aduna  2. Scade  3. Inmulteste  4. Imparte  0. Iesire
Alege: 1
Primul numar: 10
Al doilea numar: 5
Rezultat: 15

1. Aduna  2. Scade  3. Inmulteste  4. Imparte  0. Iesire
Alege: 4
Primul numar: 8
Al doilea numar: 0
Nu se poate imparti la 0!

1. Aduna  2. Scade  3. Inmulteste  4. Imparte  0. Iesire
Alege: 3
Primul numar: 6
Al doilea numar: 7
Rezultat: 42

1. Aduna  2. Scade  3. Inmulteste  4. Imparte  0. Iesire
Alege: 0
Pa!
```

Programul are **7 funcții mici**, fiecare cu un singur rol, și un `main()` care le leagă. Dacă vrei să adaugi ridicarea la putere, adaugi o funcție și un `elif`.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — „Calculatorul cu funcții” (obligatoriu)
Scrie propriul calculator organizat în funcții:
1. cel puțin **5 operații** (adunare, scădere, înmulțire, împărțire, plus încă una la alegere, de exemplu putere sau rest), fiecare într-o **funcție**;
2. o funcție care **citește** un număr, cu validare;
3. o funcție `main()` cu meniu care se repetă;
4. tratează **împărțirea la 0**.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
def f(lista):
    return lista[0] + lista[-1]

def g(a, b):
    return a * b, a + b

print(f([3, 8, 5]))
x, y = g(4, 5)
print(x, y)
print(f([g(1, 2)[0], 10]))
```

### Exercițiul C — Statistica notelor
Scrie funcția `statistica(note)` care returnează **media**, **cea mai mare** și **cea mai mică** notă, și afișează-le.

### Exercițiul D — Găsește greșelile
Programul are 5 greșeli. Rescrie-l corect și explică fiecare corecție:

```text
def min_max(lista):
    return min(lista) max(lista)

a, b, c = min_max([1, 2, 3])
def media(l)
    return sum(l) / len(l)
print(media(1, 2, 3))
main()
def main():
    print("Salut")
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. De ce împărțim un program în funcții mici?  
2. Ce face `return a, b`?  
3. La ce folosește `main()`?

**Gata când:**
- [ ] Calculatorul are cel puțin 5 operații în funcții  
- [ ] Citirea numerelor se face într-o funcție, cu validare  
- [ ] Există o funcție `main()` apelată o singură dată  
- [ ] Împărțirea la 0 e tratată  
- [ ] Ai explicat pe foaie de ce folosim funcții  
- [ ] Fișierul se numește `Prenume_Nume_P2_L9.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Adaugă la calculator **memoria**: ultimul rezultat să poată fi folosit ca prim număr  
- [ ] Scrie o funcție `este_palindrom(text)` care returnează `True` sau `False`  
- [ ] Fă funcția `cmmdc(a, b)` care găsește cel mai mare divizor comun  
- [ ] Scrie un joc de zaruri în care fiecare pas este o funcție  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `ValueError: too many values to unpack` | Numărul de variabile nu se potrivește cu valorile returnate | `a, b = f(...)` pentru 2 valori |
| `NameError: name 'main' is not defined` | Ai apelat `main()` înainte de definire | Apelează-l la sfârșitul fișierului |
| `TypeError: media() takes 1 positional argument but 3 were given` | Ai dat 3 numere în loc de o listă | `media([1, 2, 3])` |
| `RecursionError: maximum recursion depth exceeded` | Funcția recursivă nu are caz de oprire | Adaugă `if n == 0: return ...` |
| `return min(l) max(l)` dă eroare | Lipsește virgula | `return min(l), max(l)` |
| Funcția nu validează și se oprește la o greșeală | `int(input(...))` pe text | Folosește `isdigit()` ca în exemplu |
| Funcția modifică lista originală | Listele sunt partajate între funcții | Lucrează pe o copie: `lista.copy()` |

---

## Recapitulare pe scurt

- O funcție poate primi o **listă** ca parametru.
- `return a, b` dă două valori; le primești cu `x, y = f(...)`.
- Funcțiile se pot **apela între ele**; fiecare face **un singur lucru**.
- Argumentele pot fi date **cu nume**: `f(varsta=10, nume="Ana")`.
- Un **docstring** descrie ce face funcția.
- O validare repetată într-o funcție se scrie o singură dată și se reutilizează.
- Programul se organizează cu funcții mici și un `main()` apelat la sfârșit.

---

## Temă
1. Refă **Exemplele 1–10** în Thonny, scrise de mână.  
2. Scrie funcția `numara_vocale(text)` care returnează câte vocale are un text.  
3. Scrie o funcție `convertor(km)` care returnează distanța în metri, centimetri și milimetri (trei valori).  
4. **Bonus:** transformă programul „Agenda mea” din L7 într-unul cu funcții (`adauga`, `cauta`, `arata`, `main`).  
5. Salvează totul ca `Tema_P2_L9_Prenume_Nume.py`.

---

## Ce urmează — Lecția 10
**Proiectul modulului**: jocul „Ghicește numărul”, cu funcții, încercări limitate, indicii și scor.
