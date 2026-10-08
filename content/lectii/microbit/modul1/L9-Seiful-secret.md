# Lecția 9 — Seiful secret
**Modulul 1 · Primii pași cu micro:bit (blocuri)**  
**Code Maker Club · micro:bit Starter**

> Azi pui laolaltă ce ai învățat: **butoane, variabile, decizii** și faci un **seif** care se deschide doar cu codul corect.  
> Proiect: **„Seiful secret”** · `Prenume_Nume_MB1_L09`

---

## Obiectiv
La finalul orei construiești un proiect complet, cu o variabilă care ține minte **în ce pas** al codului ești.  
**Minim:** codul secret **A – B – A** deschide seiful (apare bifa), iar orice greșeală îl închide din nou.  
**Complet:** Minim + după **3 greșeli** apare o alarmă, iar blocurile de greșeală sunt adunate într-o **funcție**.

## De ce contează
Cardul de acces, lacătul cu cod și telefonul cu parolă funcționează la fel: aparatul **ține minte** ce ai făcut până acum și verifică dacă urmează pasul corect. Variabila care ține minte pasul se numește adesea **stare**. Așa se fac aproape toate jocurile și aparatele.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8: senzori, praguri, variabilă-semnal |
| 10–30 | Planul pe foaie: pașii codului și tabelul stărilor |
| 30–70 | Programul seifului (**Minim**) |
| 70–90 | Testăm toate încercările (corecte și greșite) |
| 90–112 | Alarma și funcția `greseala` (**Complet**) |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** variabila `pas` · `on button A / B pressed` · `if … else if … else` · `show icon` · `pause (ms)` · **Functions** (în **Advanced**)

---

## Pas cu pas

### 1) Planul pe foaie
Codul secret e **A, B, A**. Seiful trebuie să țină minte câți pași corecți ai făcut. Folosim variabila `pas`:

| `pas` | Înseamnă |
|-------|----------|
| `0` | nimic corect încă (seif închis) |
| `1` | ai apăsat corect primul **A** |
| `2` | ai apăsat corect și **B** |

Dacă `pas` e `2` și apeși **A**, seiful se deschide.

**Tabelul încercărilor (completează pe foaie):**

| Ai apăsat | `pas` înainte | Ce se întâmplă |
|-----------|---------------|----------------|
| A | 0 | corect → `pas` devine 1 |
| B | 1 | corect → `pas` devine 2 |
| A | 2 | corect → **seif deschis** |
| B | 0 | greșit → seif închis, `No` |
| A | 1 | greșit → seif închis, `No` |
| B | 2 | greșit → seif închis, `No` |

### 2) Proiect nou și pornirea
`Prenume_Nume_MB1_L09` · variabila `pas`.

```text
on start
    set pas to 0
    show icon [Square]
```
Pătratul `Square` înseamnă „seif închis”.

**Ce vezi pe ecran:**
```text
# # # # #
# . . . #
# . . . #
# . . . #
# # # # #
```

### 3) Butonul A — Minim

```text
on button A pressed
    if pas = 0 then
        set pas to 1
    else if pas = 2 then
        show icon [Yes]
        pause (ms) 2000
        set pas to 0
        show icon [Square]
    else
        show icon [No]
        pause (ms) 700
        set pas to 0
        show icon [Square]
```

- Dacă `pas = 0`, primul A e corect.  
- Dacă `pas = 2`, ai făcut A–B și acum A deschide seiful: bifa stă **2 secunde**, apoi seiful se închide.  
- În orice alt caz (de exemplu `pas = 1`: A a doua oară) e greșeală.

### 4) Butonul B — Minim

```text
on button B pressed
    if pas = 1 then
        set pas to 2
    else
        show icon [No]
        pause (ms) 700
        set pas to 0
        show icon [Square]
```
B e corect **doar** dacă ai apăsat înainte exact un A.

### 5) Testăm
Fă fiecare încercare din tabel pe simulator și pe placă. Pune o bifă în tabel după ce rezultatul e cel dorit.

> **Fără grabă:** nu apăsa butoane cât timp se vede `Yes` sau `No`. Așteaptă să revină pătratul.

### 6) Complet — alarma și funcția
Vrem ca după **3 greșeli la rând** placa să arate `ALARMA`.

**Funcția** e un grup de blocuri cu nume. În loc să copiezi aceleași blocuri în A și în B, le pui o dată într-o funcție și o **chemi**.

1. Deschide **Advanced** → **Functions** → **Make a Function…**.  
2. Numele: `greseala` → **Done**.  
3. Variabila nouă: `greseli` (câte greșeli ai făcut).

```text
function greseala
    change greseli by 1
    show icon [No]
    pause (ms) 700
    set pas to 0
    if greseli = 3 then
        show string "ALARMA"
        set greseli to 0
    show icon [Square]
```

Apoi în A și B, în locul blocurilor de greșeală, pui **call greseala**:

```text
on start
    set pas to 0
    set greseli to 0
    show icon [Square]

on button A pressed
    if pas = 0 then
        set pas to 1
    else if pas = 2 then
        show icon [Yes]
        pause (ms) 2000
        set pas to 0
        set greseli to 0
        show icon [Square]
    else
        call greseala

on button B pressed
    if pas = 1 then
        set pas to 2
    else
        call greseala
```

- O deschidere reușită pune `greseli` înapoi la `0`.  
- Funcția `greseala` e scrisă **o dată**, iar o schimbi **într-un singur loc**.

---

## Greșeli frecvente
1. **„Seiful nu se deschide niciodată”** — ai uitat `set pas to 1` sau `set pas to 2`.  
2. **„Se deschide cu orice”** — ai pus doar `if pas = 2`, fără să verifici că ai ajuns acolo cu B.  
3. **„Rămân poze vechi pe ecran”** — după `Yes` sau `No` lipsește `show icon [Square]`.  
4. **„După greșeală, următoarea încercare nu merge”** — ai uitat `set pas to 0`.  
5. **„Nu găsesc funcția”** — e în **Advanced**, apoi **Functions**.  
6. **„Alarma sună prea devreme”** — `greseli` nu e pus pe `0` în `on start` sau după o reușită.

---

## De făcut azi — „Seiful secret”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | A–B–A deschide (`Yes`), orice altceva = `No` și reluare |
| **Complet** | Minim + 3 greșeli = `ALARMA` · funcția `greseala` |

### Pasul 1 — Minim
- [ ] Variabila `pas` și `on start` cu `Square`  
- [ ] `on button A pressed` cu `if / else if / else`  
- [ ] `on button B pressed` cu `if / else`  
- [ ] Tabelul de încercări testat  

**→ Minim când:** un coleg încearcă codul și seiful se deschide la A–B–A și rămâne închis la orice altceva.

### Pasul 2 — Complet
- [ ] Variabila `greseli`  
- [ ] Funcția `greseala` creată și chemată din A și din B  
- [ ] La 3 greșeli apare `ALARMA`  
- [ ] Numele fișierului e `MB1_L09`  

---

## Bonus (după Complet)
- [ ] Schimbă codul în **B – B – A** (ce trebuie schimbat?)  
- [ ] Fă un cod de **4 pași** (ai nevoie de `pas = 3`)  
- [ ] Adaugă **A+B** ca să schimbi codul seifului (idee pentru proiect mare)  
- [ ] Desenează pe foaie un alt aparat cu „stare”, de exemplu un lift sau un bancomat

## Recapitulare rapidă
1. O variabilă poate ține minte **pasul** în care te afli (starea).  
2. `if / else if / else` alege între trei sau mai multe variante.  
3. O **funcție** adună blocuri pe care le folosești în mai multe locuri.  
4. Testează **toate** încercările, nu doar pe cea corectă.  
5. Reia întotdeauna de la început după o greșeală: `set pas to 0`.

## Schema pe scurt *(pe foaie)*

`pas 0` —A→ `pas 1` —B→ `pas 2` —A→ **Yes** · orice altceva → `greseala` → `pas 0`

**Quiz scurt:**  
- Ce ține minte variabila `pas`?  
- Ce se întâmplă dacă apeși B când `pas = 0`?  
- De ce folosim funcția `greseala`?  
- Cum ai schimba codul în B–A–B?

## Temă
Gândește-te la un **cod** pentru seiful tău (4 pași cu A și B). Scrie-l pe foaie, apoi scrie tabelul stărilor pentru primii trei pași.
