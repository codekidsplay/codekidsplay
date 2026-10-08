# Lecția 6 — Jurnalul de măsurători
**Modulul 2 · Proiecte Maker (blocuri + radio)**  
**Code Maker Club · micro:bit Maker**

> Azi placa devine un **mic om de știință**: măsoară temperatura și lumina, ține minte **recordurile** și își notează măsurătorile într-un **jurnal**.  
> Proiect: **„Jurnalul de măsurători”** · `Prenume_Nume_MB2_L06`

---

## Obiectiv
La finalul orei faci un aparat care **ține minte** cea mai mare și cea mai mică temperatură și (la Complet) o **listă** de măsurători cu media lor.  
**Minim:** A schimbă între trei moduri: temperatura, lumina și recordurile (maxim și minim). A+B șterge recordurile.  
**Complet:** Minim + B salvează măsurători într-o **listă**, iar al patrulea mod arată **media**.

## De ce contează
Oamenii de știință notează ce măsoară: temperatura de afară, cât a crescut o plantă. Notițele se numesc **date**. Un program care păstrează date poate să-ți spună „cel mai cald a fost la prânz” sau „în medie, în clasă sunt 22 de grade”.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5: stări, `while` |
| 10–30 | Măsurăm pe hârtie: un tabel în 3 locuri din clasă |
| 30–60 | Modurile T, L și recordul (**Minim**) |
| 60–100 | Lista cu măsurători și media (**Complet**) |
| 100–112 | Experiment: unde e cel mai cald loc din clasă? |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** `temperature (°C)` · `light level` · `max of … and …` · `min of … and …` · variabile · **Arrays** (liste) · `for element value of …` · `round` · `if`

---

## Pas cu pas

### 1) Tabelul de pe hârtie
Înainte de calculator, facem un tabel. Măsori (cu termometrul clasei sau cu placa) în **3 locuri**: lângă fereastră, pe bancă, lângă ușă.

| Loc | Temperatura | Cât de luminos e (mic / mediu / mare) |
|-----|-------------|----------------------------------------|
| Fereastră | ____ | ____ |
| Bancă | ____ | ____ |
| Ușă | ____ | ____ |

Programul pe care îl facem azi va face **singur** acest lucru.

### 2) Ideea recordului
Un **record** e cea mai mare (sau mică) valoare văzută până acum. Funcționează așa:
- Începi cu temperatura de acum, de exemplu `22`.  
- La fiecare măsurătoare compari: dacă e mai mare, **o ții minte**.

Blocul care face asta e din **Math**: **max of 0 and 0** și **min of 0 and 0**. (Un singur bloc cu un dropdown pentru `max` / `min`.)

```text
set maxim to max of maxim and temperature
set minim to min of minim and temperature
```
- Prima linie: noul `maxim` e cel mai mare dintre `maxim` vechi și temperatura de acum.  
- A doua: noul `minim` e cel mai mic dintre cele două.

### 3) Pornirea — Minim
Proiect nou: `Prenume_Nume_MB2_L06`. Variabile: `mod`, `maxim`, `minim`.

```text
on start
    set mod to 1
    set maxim to temperature
    set minim to temperature
```

### 4) Butoanele — Minim

```text
on button A pressed
    change mod by 1
    if mod > 3 then
        set mod to 1

on button A+B pressed
    set maxim to temperature
    set minim to temperature
```
A schimbă modul, iar A+B **șterge recordurile** (le pune pe temperatura de acum).

### 5) `forever` desenează — Minim
Regula din L1 e încă valabilă: **desenează doar `forever`**.

```text
forever
    set maxim to max of maxim and temperature
    set minim to min of minim and temperature
    clear screen
    if mod = 1 then
        show string "T"
        show number temperature
    else if mod = 2 then
        show string "L"
        show number light level
    else
        show string "+"
        show number maxim
        show string "-"
        show number minim
    pause (ms) 200
```
- Literele `T` și `L` te anunță ce citești: **T** = temperatura, **L** = lumina.  
- La modul 3 vezi: `+` urmat de temperatura maximă, apoi `-` urmat de cea minimă.

**Ce vezi pe ecran la modul 3** (dacă maxim e 25 și minim 21): `+` → `25` → `-` → `21`.

**Test:** ține placa în mână ca să se încălzească sau apropie-o de fereastră. Cu A mergi la modul 3 și vezi cum recordurile s-au schimbat.

### 6) Complet — jurnalul cu listă
O **listă** (în MakeCode, **Array**) e o înșiruire de valori, ca un tabel cu o singură coloană. Ține mai multe numere într-o singură variabilă.

**Pregătire:**
1. Creezi variabilele `jurnal` (lista), `suma` și `salveaza`.  
2. În `on start`, adaugi: `set jurnal to [array of]` fără elemente (apeși **−** pe bloc până nu mai are niciunul). Blocurile pentru liste sunt în **Advanced → Arrays**. Numele pot arăta puțin diferit în editor, dar ideea e aceeași: *„adaugă la sfârșit”*, *„lungimea listei”*, *„pentru fiecare element”*.

```text
on start
    set mod to 1
    set maxim to temperature
    set minim to temperature
    set salveaza to 0
    set jurnal to [array of]   (listă goală)
```

**B ridică un steag.** Desenează doar `forever`, deci B doar anunță:

```text
on button B pressed
    set salveaza to 1
```

**Cu patru moduri:** A nu mai trece de `4`:

```text
on button A pressed
    change mod by 1
    if mod > 4 then
        set mod to 1
```

**`forever` face totul:**

```text
forever
    set maxim to max of maxim and temperature
    set minim to min of minim and temperature
    clear screen
    if salveaza = 1 then
        add value temperature to end of jurnal
        set salveaza to 0
        show icon [Yes]
        pause (ms) 400
    else if mod = 1 then
        show string "T"
        show number temperature
    else if mod = 2 then
        show string "L"
        show number light level
    else if mod = 3 then
        show string "+"
        show number maxim
        show string "-"
        show number minim
    else
        if length of jurnal > 0 then
            set suma to 0
            for element value of jurnal
                change suma by value
            show string "M"
            show number round (suma / length of jurnal)
        else
            show icon [No]
    pause (ms) 200
```
- **B** salvează temperatura de acum în `jurnal` și arată bifa `Yes`.  
- **Modul 4** calculează **media**: însumează toate valorile (`suma`) și împarte la câte sunt (`length of jurnal`). `round` rotunjește.  
- Dacă lista e goală, arată `No` (nu împărțim la zero).

**Exemplu:** salvezi `21`, `23`, `22`. Suma e `66`, sunt 3 valori, media e `66 / 3 = 22`.

### 7) Experimentul „Cel mai cald loc”
În grup, mergeți cu plăcile în 4 locuri din clasă. La fiecare loc apăsați B. După patru locuri mergeți la modul 4 și comparați **media** cu cea a altui grup. Care e mai mare? De ce?

---

## Greșeli frecvente
1. **„Recordurile nu se schimbă”** — blocurile `max of` / `min of` lipsesc din `forever`.  
2. **„Ecranul se amestecă”** — B desenează direct (`show icon`) în loc să ridice steagul. Lasă desenul în `forever`.  
3. **„La modul 4 apare mereu `No`”** — nu ai apăsat B niciodată (lista e goală).  
4. **„Media e greșită”** — ai uitat `set suma to 0` înainte de `for element`.  
5. **„Modul 5 nu există”** — în A ai lăsat `if mod > 3`. Pentru 4 moduri trebuie `> 4`.  
6. **„Temperatura sare”** — placa se încălzește și singură; e normal să vezi 1–2 grade diferență.

---

## De făcut azi — „Jurnalul de măsurători”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Moduri **T**, **L**, **recorduri** · A+B șterge recordurile |
| **Complet** | Minim + B salvează în listă · modul 4 arată **media** |

### Pasul 1 — Minim
- [ ] Variabilele `mod`, `maxim`, `minim`  
- [ ] `max of` și `min of` în `forever`  
- [ ] Trei moduri cu A  
- [ ] A+B resetează recordurile  

**→ Minim când:** încălzești placa în mână și recordul de maxim crește.

### Pasul 2 — Complet
- [ ] Lista `jurnal` creată (goală)  
- [ ] B ridică steagul `salveaza`; `forever` adaugă în listă  
- [ ] Modul 4 calculează media corect (testată cu 3 valori)  
- [ ] Lista goală arată `No`  
- [ ] Numele fișierului e `MB2_L06`  

---

## Bonus (după Complet)
- [ ] Adaugă modul 5: **câte măsurători** ai salvat (`show number length of jurnal`)  
- [ ] Salvează **lumina** într-o a doua listă și calculează media luminii  
- [ ] Fă un **alarm de căldură**: dacă temperatura trece de `28`, arată `Sad`  
- [ ] Desenează pe foaie un grafic cu cele 4 valori salvate

## Recapitulare rapidă
1. **Date** = valori măsurate și păstrate.  
2. **Record** = cea mai mare sau mică valoare, găsită cu `max of` / `min of`.  
3. O **listă** (array) ține mai multe valori într-o variabilă.  
4. **Media** = suma împărțită la câte sunt.  
5. Un buton poate doar **ridica un steag**, iar `forever` face munca.

## Schema pe scurt *(pe foaie)*

Măsoară → `max of` / `min of` → recorduri · B → listă `jurnal` → `for element` → `suma` → media

**Quiz scurt:**  
- Ce face `max of maxim and temperature`?  
- Ce este o listă?  
- Cum calculezi media a 3 numere?  
- De ce nu împărțim când lista e goală?

## Temă
Alege **un lucru** de măsurat acasă (temperatura din camera ta dimineața și seara). Notează valorile într-un tabel și calculează media pe foaie. Mâine o compari cu rezultatul placei.
