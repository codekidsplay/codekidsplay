# Lecția 8 — Doctorul de cod
**Modulul 2 · Proiecte Maker (blocuri + radio)**  
**Code Maker Club · micro:bit Maker**

> Orice programator greșește, dar un **programator bun** știe să **caute greșeala** și s-o repare. Azi ești **doctor de cod**: primești programe bolnave, găsești ce nu e în regulă și le vindeci.  
> Proiect: **„Cabinetul doctorului de cod”** · `Prenume_Nume_MB2_L08`

---

## Obiectiv
La finalul orei folosești o **metodă** ca să găsești greșelile din program și știi să faci un cod mai curat și mai scurt.  
**Minim:** repari **3 din 5** programe bolnave și scrii raportul pentru fiecare.  
**Complet:** repari **toate 5**, **curăți** un program (bucla `repeat` sau funcție) și faci un raport complet.

## De ce contează
Programatorii își petrec **mai mult timp căutând greșeli** decât scriind cod nou. Se numește **depanare** (în engleză, „debugging”: bug = gândac, pentru că primul „bug” a fost un gândac găsit într-un calculator). Cine știe să depaneze poate repara orice, inclusiv programele altora.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7: emițător și receptor |
| 10–25 | Metoda doctorului în 5 pași |
| 25–90 | Cabinetul: cele 5 programe bolnave |
| 90–105 | Curățenie: cod mai scurt și mai clar |
| 105–120 | Rapoartele, recapitulare, quiz, temă |

**Unelte azi:** tot ce ai învățat · `show number` pentru a „vedea” o variabilă · fișa cu **raportul de bug**

---

## Pas cu pas

### 1) Metoda doctorului în 5 pași
1. **Ce trebuie să facă?** (ce spune fișa)  
2. **Ce face de fapt?** Rulează și notează.  
3. **Unde se rupe?** Ce bloc e primul care nu face ce trebuie?  
4. **Schimbă o singură piesă** și testează iar.  
5. **Scrie raportul:** ce era greșit și cum ai reparat.

> **Truc:** dacă nu știi ce valoare are o variabilă, pune **temporar** `show number variabila`. Vezi imediat ce ține minte.

Dacă simulatorul are un buton de mers **încet** (slow-mo), îl poți folosi ca să urmărești blocurile pe rând.

### 2) Programul bolnav 1 — „Contorul care nu crește”
**Fișa:** A adaugă 1 la scor și arată scorul.

```text
on start
    set score to 0

on button A pressed
    set score to 1
    show number score
```
**Simptom:** scorul rămâne mereu `1`.  
**Diagnostic:** `set` pune valoarea `1` de fiecare dată.  
**Rețetă:** `change score by 1`.

### 3) Programul bolnav 2 — „Inima care stă pe loc”
**Fișa:** inima bate (mare, mică, mare, mică).

```text
forever
    show icon [Heart]
    show icon [Small Heart]
```
**Simptom:** pe ecran se vede ceva neclar, fără mișcare.  
**Diagnostic:** pozele se schimbă mai repede decât poate vedea ochiul.  
**Rețetă:** `pause (ms) 300` după fiecare `show icon`.

### 4) Programul bolnav 3 — „Seiful care zice mereu Da”
**Fișa:** B e corect doar dacă `pas = 1`; altfel arată `No`.

```text
on button B pressed
    if pas = 1 then
        set pas to 2
    show icon [Yes]
```
**Simptom:** apare `Yes` la **orice** apăsare de B.  
**Diagnostic:** `show icon [Yes]` e **în afara** lui `if`, deci se execută mereu.  
**Rețetă:** mută `Yes` **în interiorul** lui `if` și adaugă un `else` cu `No`:

```text
on button B pressed
    if pas = 1 then
        set pas to 2
        show icon [Yes]
    else
        show icon [No]
```

### 5) Programul bolnav 4 — „Radioul mut”
**Fișa:** placa 1 trimite `1` când apeși A, placa 2 arată `Happy`.

Placa 1:
```text
on start
    radio set group 3

on button A pressed
    radio send number 1
```
Placa 2:
```text
on start
    radio set group 4

on radio received (receivedNumber)
    show icon [Happy]
```
**Simptom:** pe placa 2 nu apare nimic.  
**Diagnostic:** grupuri **diferite** (`3` și `4`).  
**Rețetă:** același grup pe ambele plăci.

### 6) Programul bolnav 5 — „Alarma de neoprit”
**Fișa:** alarma pâlpâie cât timp `alarma = 1` și se oprește cu A+B.

```text
on shake
    set alarma to 1
    while alarma = 1
        show leds   (toate aprinse)
        pause (ms) 200
        clear screen
        pause (ms) 200

on button A pressed
    set alarma to 0
```
**Simptom:** alarma nu se oprește când apeși A+B.  
**Diagnostic:** oprirea e pusă pe **A**, nu pe **A+B**.  
**Rețetă:** `on button A+B pressed` cu `set alarma to 0`.

### 7) Curățenia codului
Un cod bun e **scurt**, **clar** și are **nume bune**.

**Înainte (lung):**
```text
forever
    show icon [Heart]
    pause (ms) 300
    show icon [Heart]
    pause (ms) 300
    show icon [Heart]
    pause (ms) 300
    show icon [Heart]
    pause (ms) 300
```
**După (scurt):**
```text
forever
    repeat 4 times
        show icon [Heart]
        pause (ms) 300
```
> Dacă aceleași blocuri apar în două sau trei locuri, fă o **funcție** (ca `stinge` din L4).

**Nume bune de variabile:** `score` e mai bun decât `x`, iar `alarma` e mai bun decât `a`.

**Comentarii:** în MakeCode poți apăsa **clic dreapta pe un bloc → Add Comment** și scrii o notiță pentru tine („aici verific codul”).

### 8) Raportul de bug
Pentru fiecare program completezi un tabel:

| Program | Simptom | Cauza | Cum am reparat |
|---------|---------|-------|----------------|
| 1 | scorul rămâne 1 | `set` în loc de `change` | |
| … | | | |

---

## Greșeli frecvente (ale doctorilor)
1. **„Am schimbat mai multe lucruri deodată”** — nu mai știi ce a reparat. Schimbă **una pe rând**.  
2. **„Nu am testat după reparație”** — rulează mereu din nou.  
3. **„Am dat vina pe placă”** — de obicei greșeala e în program.  
4. **„Am șters tot și am luat-o de la capăt”** — de multe ori e nevoie de o mică schimbare.  
5. **„Am uitat să notez”** — scrie raportul imediat, cât ții minte.  
6. **„Programul reparat nu e salvat”** — salvează cu numele `MB2_L08`.

---

## De făcut azi — „Cabinetul doctorului de cod”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | **3** programe bolnave reparate · 3 rânduri de raport |
| **Complet** | Toate **5** reparate · un cod **curățat** (repeat sau funcție) · raport complet |

### Pasul 1 — Minim
- [ ] Ai refăcut programul bolnav în MakeCode  
- [ ] Ai găsit simptomul în simulator  
- [ ] Ai reparat și retestat  
- [ ] Raportul are 3 rânduri completate  

**→ Minim când:** un coleg testează programele tale și ele merg.

### Pasul 2 — Complet
- [ ] Toate cele 5 programe reparate  
- [ ] Un program scurtat cu `repeat` sau funcție  
- [ ] Un comentariu adăugat într-un program  
- [ ] Numele fișierului e `MB2_L08`  

---

## Bonus (după Complet)
- [ ] Creează **un program bolnav** cu **o greșeală ascunsă** pentru un coleg, cu fișă și simptom  
- [ ] Găsește greșeala din programul unui coleg în maximum 5 minute  
- [ ] Alege un program mai vechi (L5, L6) și scurtează-l  
- [ ] Scrie 3 reguli de aur pentru un doctor de cod

## Recapitulare rapidă
1. **Depanare** = a găsi și a repara o greșeală.  
2. Metoda: ce trebuie / ce face / unde se rupe / o schimbare / raport.  
3. `show number variabila` îți arată ce ține minte placa.  
4. Cod bun: **scurt**, **clar**, cu **nume bune**.  
5. Greșelile sunt normale; important e să știi cum le cauți.

## Schema pe scurt *(pe foaie)*

Simptom → ipoteză → o schimbare → test → raport

**Quiz scurt:**  
- Care e diferența dintre `set` și `change` când scorul nu crește?  
- Cum afli ce valoare are o variabilă?  
- De ce schimbăm un singur lucru pe rând?  
- Cum scurtezi patru blocuri identice?

## Temă
Caută **o greșeală** în orice program făcut de tine în ultimele lecții și scrie un raport de bug pentru ea.
