# LECȚIA 10 — Proiect: Ghicește numărul
**Modulul 2 · Repetăm, colecționăm, organizăm · 2 ore**  
**Code Maker Club · Python Builder**

> Azi folosești tot ce ai învățat în Modulul 2: bucle, liste, funcții și decizii. Construiești un joc complet, în care calculatorul se gândește la un număr, iar tu îl ghicești cu ajutorul indiciilor.  
> Proiect: **„Ghicește numărul”** · fișier: `Prenume_Nume_P2_L10.py`

---

## Obiectiv
La finalul orei ai un joc complet, organizat în funcții: număr secret, încercări limitate, indicii „prea mic / prea mare”, validarea răspunsurilor, mai multe runde și statistici.  
**Minim:** jocul funcționează o rundă, cu indicii.  
**Ținta orei (Complet):** + încercări limitate, validare, runde repetate și scor final.

## De ce contează
Aproape orice joc are aceleași piese: o **regulă secretă**, **răspunsul jucătorului**, **feedback** și **scor**. Dacă înțelegi jocul „Ghicește numărul”, poți construi multe alte jocuri.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recapitulare Modul 2 |
| 10–25 | Jocul cel mai simplu (**Exemplul 1**) |
| 25–45 | Încercări limitate (**Exemplele 2–3**) |
| 45–65 | Validarea citirii (**Exemplul 4**) |
| 65–85 | Funcții și runde (**Exemplele 5–7**) |
| 85–100 | Statistici și variante (**Exemplele 8–9**) |
| 100–115 | Jocul final (**Exemplul 10**) și proiectul tău |
| 115–120 | Verificare Modul 2 și autoevaluare |

---

## 1. Recapitulare rapidă din Modulul 2

- `for` și `while` repetă; `break` iese din buclă.
- Listele colectează valori (`append`, `len`, `min`, `sum`).
- Funcțiile organizează programul; `return` dă rezultatul.
- `random.randint(a, b)` alege un număr la întâmplare.

**Încearcă tu (3 min)**  
- [ ] Scrie o buclă `while` care cere un număr până când scrii `0`  

---

## 2. Construim jocul pas cu pas

> Jocul folosește `random`, deci numărul secret diferă de fiecare dată. Ca să poți urmări ce se întâmplă, la unele exemple îți arătăm **un joc exemplu** în care secretul a fost 18.

### Exemplul 1 — Cel mai simplu joc

```python
secret = 18
ghici = 0
while ghici != secret:
    ghici = int(input("Ghiceste numarul: "))
    if ghici < secret:
        print("Prea mic!")
    elif ghici > secret:
        print("Prea mare!")
print("Bravo!")
```

**Ieșire:**
```text
Ghiceste numarul: 50
Prea mare!
Ghiceste numarul: 30
Prea mare!
Ghiceste numarul: 20
Prea mare!
Ghiceste numarul: 18
Bravo!
```

Aici secretul este scris direct în cod (`18`), ca să testăm ușor. Bucla se repetă **până când** ghicești. Încă nu avem `random`, nici încercări limitate.

### Exemplul 2 — Cu număr aleator

```python
import random

secret = random.randint(1, 100)
print("Secretul este intre 1 si 100:", 1 <= secret <= 100)
```

**Ieșire:**
```text
Secretul este intre 1 si 100: True
```

Linia `random.randint(1, 100)` alege un număr întreg între 1 și 100, **inclusiv ambele capete**. Secretul nu îl afișăm (ar strica jocul!); afișăm doar `True`, ca să vedem că e în interval. După ce jocul merge, vei înlocui în Exemplul 1 `secret = 18` cu această linie.

### Exemplul 3 — Încercări limitate

```python
secret = 18
incercari = 5
castigat = False

for nr in range(1, incercari + 1):
    ghici = int(input(f"Incercarea {nr}: "))
    if ghici == secret:
        castigat = True
        break
    elif ghici < secret:
        print("Prea mic!")
    else:
        print("Prea mare!")

if castigat:
    print("Bravo!")
else:
    print("Ai pierdut! Numarul era", secret)
```

**Ieșire:**
```text
Incercarea 1: 50
Prea mare!
Incercarea 2: 60
Prea mare!
Incercarea 3: 70
Prea mare!
Incercarea 4: 80
Prea mare!
Incercarea 5: 90
Prea mare!
Ai pierdut! Numarul era 18
```

Acum folosim `for` cu `range`, pentru că **numărul de încercări este limitat**. Variabila `castigat` ne spune, după buclă, dacă am ieșit prin `break` (am ghicit) sau pentru că s-au terminat încercările.

### Exemplul 4 — Citire sigură

```python
def citeste_numar(mesaj, minim, maxim):
    while True:
        text = input(mesaj)
        if not text.isdigit():
            print("Scrie un numar intreg!")
            continue
        numar = int(text)
        if numar < minim or numar > maxim:
            print(f"Numarul trebuie sa fie intre {minim} si {maxim}.")
            continue
        return numar

print("Ai scris:", citeste_numar("Alege un numar (1-100): ", 1, 100))
```

**Ieșire:**
```text
Alege un numar (1-100): abc
Scrie un numar intreg!
Alege un numar (1-100): 0
Numarul trebuie sa fie intre 1 si 100.
Alege un numar (1-100): 500
Numarul trebuie sa fie intre 1 si 100.
Alege un numar (1-100): 42
Ai scris: 42
```

Dacă jucătorul scrie `abc` sau un număr în afara intervalului, jocul **nu se oprește cu eroare**: îl roagă din nou. Această funcție se poate reutiliza în orice program.

---

## 3. Funcții și runde

### Exemplul 5 — Funcția care joacă o rundă

```python
def joaca_runda(secret, incercari):
    for nr in range(1, incercari + 1):
        ghici = int(input(f"Incercarea {nr}: "))
        if ghici == secret:
            print("Bravo!")
            return nr
        elif ghici < secret:
            print("Prea mic!")
        else:
            print("Prea mare!")
    print("Ai pierdut. Numarul era", secret)
    return None

rezultat = joaca_runda(18, 7)
print("Rezultat:", rezultat)
```

**Ieșire:**
```text
Incercarea 1: 50
Prea mare!
Incercarea 2: 25
Prea mare!
Incercarea 3: 12
Prea mic!
Incercarea 4: 18
Bravo!
Rezultat: 4
```

Funcția returnează **numărul de încercări** dacă ai câștigat și `None` dacă ai pierdut. Programul care o folosește poate hotărî ce face cu această informație.

### Exemplul 6 — Mai multe runde

```python
rezultate = [4, 6]
while True:
    raspuns = input("Mai joci? (da/nu) ")
    if raspuns.lower() != "da":
        break
    print("Runda noua!")
print("Ai terminat. Rezultate:", rezultate)
```

**Ieșire:**
```text
Mai joci? (da/nu) da
Runda noua!
Mai joci? (da/nu) da
Runda noua!
Mai joci? (da/nu) nu
Ai terminat. Rezultate: [4, 6]
```

Bucla `while True` cu `break` este perfectă pentru „mai joci?”. Metoda `lower()` transformă răspunsul în litere mici, așa că `DA`, `Da` și `da` sunt toate bune.

### Exemplul 7 — Dificultate

```python
def alege_dificultate(litera):
    if litera == "u":
        return 50, 7
    elif litera == "m":
        return 100, 7
    else:
        return 1000, 10

for alegere in ["u", "m", "g"]:
    maxim, incercari = alege_dificultate(alegere)
    print(f"{alegere}: numere 1..{maxim}, {incercari} incercari")
```

**Ieșire:**
```text
u: numere 1..50, 7 incercari
m: numere 1..100, 7 incercari
g: numere 1..1000, 10 incercari
```

O funcție care returnează **două valori** (de la Lecția 9) ne ajută să alegem nivelul: *ușor*, *mediu* sau *greu*. Pentru 1000 de numere, cu 10 încercări tot se poate: de fiecare dată înjumătățești intervalul.

---

## 4. Statistici și strategie

### Exemplul 8 — Statistici cu o listă

```python
scoruri = [4, 6, 5]
print("Runde castigate:", len(scoruri))
print("Cel mai bun scor:", min(scoruri), "incercari")
print(f"Media: {sum(scoruri) / len(scoruri):.1f} incercari")
```

**Ieșire:**
```text
Runde castigate: 3
Cel mai bun scor: 4 incercari
Media: 5.0 incercari
```

Lista `scoruri` memorează câte încercări ți-au trebuit în fiecare rundă câștigată. Cu `len`, `min` și `sum` scoți statisticile. La acest joc, **mai puține încercări înseamnă un scor mai bun**.

### Exemplul 9 — Strategia: tăiem intervalul în două

```python
secret = 73
jos = 1
sus = 100
nr = 0

while True:
    mijloc = (jos + sus) // 2
    nr += 1
    print(f"Incercarea {nr}: {mijloc}")
    if mijloc == secret:
        break
    elif mijloc < secret:
        jos = mijloc + 1
    else:
        sus = mijloc - 1

print("Gasit in", nr, "incercari")
```

**Ieșire:**
```text
Incercarea 1: 50
Incercarea 2: 75
Incercarea 3: 62
Incercarea 4: 68
Incercarea 5: 71
Incercarea 6: 73
Gasit in 6 incercari
```

Este **cea mai bună strategie**: încerci mereu numărul din **mijlocul** intervalului și eliminezi jumătate din posibilități. Pentru numere de la 1 la 100, ai nevoie de cel mult **7 încercări**. De aceea jocul nostru are 7 încercări: se poate câștiga mereu!

---

## 5. Jocul final

### Exemplul 10 — „Ghicește numărul”

```python
import random

def citeste_numar(mesaj, minim, maxim):
    while True:
        text = input(mesaj)
        if not text.isdigit():
            print("Scrie un numar intreg!")
            continue
        numar = int(text)
        if numar < minim or numar > maxim:
            print(f"Numarul trebuie sa fie intre {minim} si {maxim}.")
            continue
        return numar

def joaca_runda(maxim, incercari):
    secret = random.randint(1, maxim)
    print(f"M-am gandit la un numar intre 1 si {maxim}. Ai {incercari} incercari.")
    for nr in range(1, incercari + 1):
        ghici = citeste_numar(f"Incercarea {nr}: ", 1, maxim)
        if ghici == secret:
            print(f"Bravo! Ai ghicit din {nr} incercari!")
            return nr
        elif ghici < secret:
            print("Prea mic!")
        else:
            print("Prea mare!")
    print("Ai pierdut. Numarul era", secret)
    return None

def main():
    print("=== GHICESTE NUMARUL ===")
    scoruri = []
    while True:
        rezultat = joaca_runda(100, 7)
        if rezultat is not None:
            scoruri.append(rezultat)
        if input("Mai joci? (da/nu) ").lower() != "da":
            break
    print("-" * 25)
    if len(scoruri) == 0:
        print("Nu ai castigat nicio runda. Data viitoare!")
    else:
        print("Runde castigate:", len(scoruri))
        print("Cel mai bun scor:", min(scoruri), "incercari")
        print(f"Media: {sum(scoruri) / len(scoruri):.1f} incercari")

main()
```

**Ieșire (exemplu, la tine va fi altfel, pentru că secretul este aleator):**
```text
=== GHICESTE NUMARUL ===
M-am gandit la un numar intre 1 si 100. Ai 7 incercari.
Incercarea 1: abc
Scrie un numar intreg!
Incercarea 1: 500
Numarul trebuie sa fie intre 1 si 100.
Incercarea 1: 50
Prea mare!
Incercarea 2: 25
Prea mare!
Incercarea 3: 12
Prea mic!
Incercarea 4: 18
Bravo! Ai ghicit din 4 incercari!
Mai joci? (da/nu) da
M-am gandit la un numar intre 1 si 100. Ai 7 incercari.
Incercarea 1: 50
Prea mic!
Incercarea 2: 75
Prea mare!
Incercarea 3: 62
Prea mic!
Incercarea 4: 68
Prea mic!
Incercarea 5: 71
Prea mic!
Incercarea 6: 73
Bravo! Ai ghicit din 6 incercari!
Mai joci? (da/nu) nu
-------------------------
Runde castigate: 2
Cel mai bun scor: 4 incercari
Media: 5.0 incercari
```

Programul are **trei funcții**: `citeste_numar` (citire sigură), `joaca_runda` (o rundă) și `main` (runde, scor, statistici). În exemplul de mai sus, jucătorul a scris la început `abc` și `500` (greșit, jocul l-a ajutat să corecteze), apoi a jucat două runde cu strategia „mijlocul intervalului”.

---

## Proiect / exerciții de finalizat AZI

### Exercițiul A — Jocul tău „Ghicește numărul” (obligatoriu)
Scrie jocul complet, cu cuvintele și ideile tale. Trebuie să aibă:
1. număr secret **aleator** (`random.randint`);
2. **încercări limitate** și indicii „prea mic / prea mare”;
3. **citire sigură** (nu se blochează la `abc`);
4. **mai multe runde** („Mai joci?”);
5. **statistici** la final (runde câștigate, cel mai bun scor);
6. cel puțin **trei funcții**.

### Exercițiul B — Ce afișează?
Gândește-te, apoi verifică în Thonny:

```python
scoruri = [5, 3, 7]
print(min(scoruri))
print(sum(scoruri) // len(scoruri))
print(len(scoruri) == 0)
```

### Exercițiul C — Meniu de dificultate
Adaugă la început un meniu: *ușor / mediu / greu* (folosește `alege_dificultate` din Exemplul 7) și joacă runda cu valorile alese.

### Exercițiul D — Găsește greșelile
Programul are 4 greșeli. Rescrie-l corect:

```text
import random
secret = random.randint(1, 100)
for nr in range(1, 8)
    ghici = input("Numar: ")
    if ghici = secret:
        print("Bravo!")
    elif ghici < secret
        print("Prea mic!")
```

### Exercițiul E — Explică cu cuvintele tale
Răspunde pe foaie:
1. Ce înseamnă „strategia mijlocului” și de ce merge mereu în 7 încercări?  
2. De ce validăm numerele citite?  
3. Cum ai împărțit jocul în funcții?

**Gata când:**
- [ ] Jocul are număr aleator, încercări limitate și indicii  
- [ ] Nu se blochează la text sau la numere în afara intervalului  
- [ ] Se pot juca mai multe runde, cu statistici  
- [ ] Are cel puțin 3 funcții  
- [ ] Ai explicat strategia mijlocului  
- [ ] Fișierul se numește `Prenume_Nume_P2_L10.py`  

---

## Bonus / Provocare (dacă ai terminat)
- [ ] Rolurile se inversează: **tu te gândești** la un număr, iar **calculatorul** încearcă să-l ghicească (strategia mijlocului, ca în Exemplul 9)  
- [ ] Salvează cel mai bun scor într-o listă și afișează-l la început  
- [ ] Adaugă un mod pentru **doi jucători** (unul scrie secretul, altul ghicește)  
- [ ] Dă un **titlu** în funcție de scor: sub 5 încercări „Geniu”, sub 8 „Bravo”  

---

## Greșeli frecvente

| Ce vezi | Cauza | Corect |
|---------|-------|--------|
| `TypeError: '<' not supported between instances of 'str' and 'int'` | Ai comparat textul din `input` cu un număr | `int(input(...))` sau `isdigit()` + `int(...)` |
| `ValueError: invalid literal for int()` | Ai scris litere unde se așteaptă un număr | Validează cu `isdigit()` |
| Jocul nu se termină | Lipsește `break` sau `return` | Ieși din buclă când ai ghicit |
| Mereu același secret | `random.randint` e în bucla de încercări | Alege secretul **o singură dată**, înaintea buclei |
| Secretul nu este niciodată 100 | Ai scris `randint(1, 99)` | `randint(1, 100)` include capetele |
| Împărțire la 0 la medie | Nicio rundă câștigată | Verifică `len(scoruri) == 0` înainte de medie |
| `NameError` la o funcție | Ai apelat-o înainte să o definești | Definește funcțiile deasupra, apelează `main()` la sfârșit |

---

## Recapitulare pe scurt

- Jocul are: **secret**, **încercări**, **indicii**, **scor**.
- `random.randint(a, b)` alege secretul; îl alegi **o singură dată** pe rundă.
- `for` + `range` = încercări limitate; `break`/`return` = ieșire când ai ghicit.
- Citirea se validează cu `isdigit()` într-o funcție reutilizabilă.
- Statisticile se calculează cu o listă și `len`, `min`, `sum`.
- Strategia mijlocului găsește orice număr între 1 și 100 în cel mult 7 încercări.

---

## Verificare Modul 2

Răspunde pe foaie (apoi verifică cu profesorul):

1. Ce afișează `for i in range(3): print(i)`?  
2. Ce face `break` și ce face `continue`?  
3. Cum adaugi un element într-o listă? Dar cum îl ștergi?  
4. Cum citești valoarea de la cheia `"Ana"` dintr-un dicționar?  
5. Care este diferența dintre `print` și `return` într-o funcție?  
6. Ce rezultat are `[1, 2, 3][-1]`?  
7. Când folosești `while` în loc de `for`?  
8. Ce înseamnă o valoare implicită la un parametru?  

**Răspunsuri:**
1. `0`, `1`, `2` (fiecare pe rând nou).  
2. `break` iese din buclă; `continue` sare la următoarea repetare.  
3. `lista.append(x)`; ștergi cu `lista.remove(x)` sau `lista.pop(i)`.  
4. `dictionar["Ana"]` (sau `dictionar.get("Ana")`).  
5. `print` doar arată; `return` dă valoarea înapoi programului.  
6. `3` (ultimul element).  
7. Când nu știi de câte ori se repetă (de exemplu „până ghicești”).  
8. O valoare folosită automat când nu o dai la apel: `def f(x, y=10)`.  

### Autoevaluare (bifează)

| Știu să… | Da | Aproape | Încă nu |
|----------|----|---------|---------|
| folosesc `for` cu `range` | ☐ | ☐ | ☐ |
| folosesc `while`, `break`, `continue` | ☐ | ☐ | ☐ |
| lucrez cu liste | ☐ | ☐ | ☐ |
| folosesc dicționare | ☐ | ☐ | ☐ |
| scriu funcții cu parametri și `return` | ☐ | ☐ | ☐ |
| organizez un program cu `main()` | ☐ | ☐ | ☐ |
| construiesc un joc complet | ☐ | ☐ | ☐ |

---

## Temă
1. Termină jocul și testează-l cu cel puțin 5 runde.  
2. Fă cel puțin **una** dintre provocările bonus.  
3. Arată jocul unui prieten sau unui adult din familie și notează ce ți-a spus.  
4. Salvează totul ca `Tema_P2_L10_Prenume_Nume.py`.

---

## Ce urmează — Modulul 3
**Desenăm cu Turtle**: o broască țestoasă care desenează după ce o programezi, cu forme, culori, spirale și jocuri!
