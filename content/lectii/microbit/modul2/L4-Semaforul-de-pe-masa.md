# Lecția 4 — Semaforul de pe masă
**Modulul 2 · Proiecte Maker (blocuri + radio)**  
**Code Maker Club · micro:bit Maker**

> Până acum luminile erau pe placă. Azi legi **LED-uri din afara plăcii**, la **pini**, și faci un **semafor** adevărat.  
> Proiect: **„Semaforul de pe masă”** · `Prenume_Nume_MB2_L04`

---

## Obiectiv
La finalul orei știi ce sunt **pinii**, legi un LED extern în siguranță și îl comanzi din program.  
**Minim:** un LED extern pe **P0**: **A** îl aprinde, **B** îl stinge.  
**Complet:** Minim + semafor cu **3 LED-uri** (roșu, galben, verde) care se schimbă singur, folosind o **funcție**.

## De ce contează
Semafoarele, becurile inteligente și jucăriile cu lumini au toate ceva în comun: un calculator mic **aprinde și stinge** LED-uri prin fire. Pinii sunt „mâinile” plăcii: prin ei micro:bit poate comanda lucruri din lumea reală, nu doar ecranul lui.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3: roluri, praguri, semnal |
| 10–30 | Pinii plăcii și regulile de siguranță |
| 30–55 | Legăm un LED cu rezistență (cu profesorul) |
| 55–70 | Programul cu A și B (**Minim**) |
| 70–105 | Semaforul cu 3 LED-uri și funcția `stinge` (**Complet**) |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** `digital write pin P0 to 1` · `analog write pin` · `forever` · funcții · `pause (ms)` · LED-uri · rezistențe · cabluri cu clești (crocodil)

---

## Pas cu pas

### 1) Pinii plăcii
Jos, pe placă, vezi **inele mari** de metal: **0, 1, 2, 3V** și **GND**.
- **P0, P1, P2** sunt pini pe care programul **poate comanda**: îi face „pornit” (`1`) sau „oprit” (`0`).  
- **GND** (se citește „ground”) = **pământ**, firul de întoarcere.  
- **3V** dă un curent mic de 3 volți. **Azi nu îl folosim.**

### 2) Reguli de siguranță
1. Schimbi firele **numai cu placa scoasă din USB**.  
2. **Niciodată** nu legi **3V** direct la **GND**.  
3. LED-ul **nu se leagă fără rezistență** (330 Ω sau 220 Ω), altfel poate arde.  
4. Mâinile uscate, masa fără apă.  
5. Dacă ceva miroase a ars sau se încălzește: **scoți imediat cablul USB** și anunți profesorul.

### 3) LED-ul și rezistența
Un LED are **două picioare diferite**:
- **piciorul lung (+)** se leagă spre pin (spre **P0**);  
- **piciorul scurt (−)** se leagă spre **GND**.

Rezistența protejează LED-ul. Se pune **în drum**, între pin și LED, într-o parte sau alta (nu contează în ce parte).

**Schema unui singur LED:**
```text
P0  ──[ rezistență 330 Ω ]──( + LED − )──  GND
```
Cu cabluri cu clești: clește de la **P0** la rezistență, rezistența la piciorul **lung** al LED-ului, iar piciorul **scurt** la **GND**.

> Ceilalți pini (P1, P2) se leagă la fel, fiecare cu **rezistența lui**. Toate LED-urile au același **GND**.

Nu ai kit cu fire? Fă **varianta pe ecran** de la pasul 8. E aceeași logică.

### 4) Primul program — Minim
Proiect nou: `Prenume_Nume_MB2_L04`. Categoria **Advanced** → **Pins**.

```text
on button A pressed
    digital write pin P0 to 1

on button B pressed
    digital write pin P0 to 0
```
- `1` = pin pornit (LED aprins)  
- `0` = pin oprit (LED stins)

Descarci pe placă. **A** aprinde LED-ul extern, **B** îl stinge. În simulator nu vezi LED-ul extern, deci testează pe placa adevărată.

Pentru confirmare pe ecran:

```text
on button A pressed
    digital write pin P0 to 1
    show icon [Yes]

on button B pressed
    digital write pin P0 to 0
    clear screen
```

### 5) Semaforul — ce culori și ce pini?
Legăm trei LED-uri:

| Pin | Culoare |
|-----|---------|
| `P0` | roșu |
| `P1` | galben |
| `P2` | verde |

**Ordinea unui semafor:** roșu → verde → galben → roșu …

### 6) Funcția `stinge` — Complet
Înainte de fiecare culoare nouă trebuie să stingem toate LED-urile. În loc să scriem aceleași trei blocuri de multe ori, facem o **funcție**.

1. **Advanced** → **Functions** → **Make a Function…** → numele `stinge` → **Done**.  
2. În ea pui:

```text
function stinge
    digital write pin P0 to 0
    digital write pin P1 to 0
    digital write pin P2 to 0
```

### 7) Programul semaforului — Complet

```text
forever
    call stinge
    digital write pin P0 to 1
    pause (ms) 3000
    call stinge
    digital write pin P2 to 1
    pause (ms) 3000
    call stinge
    digital write pin P1 to 1
    pause (ms) 1000
```
- Roșu 3 secunde → verde 3 secunde → galben 1 secundă → roșu din nou …  
- `call stinge` apelează funcția de fiecare dată.

**Ce vezi:** LED-urile se aprind pe rând, ca la un semafor. Doar unul e aprins în același timp.

### 8) Varianta pe ecran (fără fire)
Rândurile ecranului sunt semaforul: **rândul de sus** = roșu, **mijloc** = galben, **jos** = verde.

```text
forever
    show leds   (doar rândul de sus aprins - roșu)
    pause (ms) 3000
    show leds   (doar rândul de jos aprins - verde)
    pause (ms) 3000
    show leds   (doar rândul din mijloc aprins - galben)
    pause (ms) 1000
```
**Ce vezi pe ecran la roșu:**
```text
# # # # #
. . . . .
. . . . .
. . . . .
. . . . .
```

---

## Greșeli frecvente
1. **„LED-ul nu se aprinde”** — e legat invers. Întoarce-l: piciorul lung spre pin.  
2. **„Nu se aprinde nimic”** — nu ai legat și **GND**. Circuitul trebuie să fie **închis**.  
3. **„Se aprinde slab”** — rezistență prea mare sau contact slab la cleștele-crocodil.  
4. **„Două culori sunt aprinse deodată”** — ai uitat `call stinge`.  
5. **„Funcția nu face nimic”** — ai făcut-o, dar nu ai pus `call stinge` în program.  
6. **„Placa se încălzește”** — scoate USB-ul și cere ajutorul profesorului.

---

## De făcut azi — „Semaforul de pe masă”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | LED pe **P0**: A aprinde, B stinge (pe placa adevărată) |
| **Complet** | Minim + 3 LED-uri · funcția `stinge` · ciclul roșu → verde → galben |

### Pasul 1 — Minim
- [ ] LED + rezistență legate corect (verificate de profesor)  
- [ ] `digital write pin P0 to 1` la A și `0` la B  
- [ ] LED-ul reacționează  

**→ Minim când:** apeși A și LED-ul extern se aprinde.

### Pasul 2 — Complet
- [ ] LED-uri pe `P0`, `P1`, `P2`  
- [ ] Funcția `stinge` creată și apelată  
- [ ] Ciclul complet merge, cu timpii 3 s, 3 s, 1 s  
- [ ] Numele fișierului e `MB2_L04`  

---

## Bonus (după Complet)
- [ ] Adaugă pe ecran o față `Happy` când LED-ul verde e aprins și `Sad` când e roșu  
- [ ] Controlează **luminozitatea** cu `analog write pin P0 to 100` (valori de la `0` la `1023`)  
- [ ] Fă un **semafor care clipește galben** noaptea (galben aprins 500 ms, stins 500 ms)  
- [ ] Desenează un semafor pentru **bicicliști** cu 4 faze

## Recapitulare rapidă
1. **Pini** = punctele prin care placa comandă lucruri din afară.  
2. `digital write pin P0 to 1` = pornit, `0` = oprit.  
3. LED-ul se leagă **cu rezistență**: lung spre pin, scurt spre GND.  
4. **Funcția** adună blocuri folosite de mai multe ori.  
5. Reguli de siguranță: fire schimbate fără USB, niciodată 3V la GND.

## Schema pe scurt *(pe foaie)*

P0 / P1 / P2 → rezistență → LED → GND · program: `call stinge` → aprinde o culoare → pauză → repetă

**Quiz scurt:**  
- Care picior al LED-ului se leagă spre pin?  
- De ce avem nevoie de rezistență?  
- Ce face `digital write pin P2 to 1`?  
- De ce folosim o funcție pentru `stinge`?

## Temă
Desenează schema unui **semafor pentru intrarea în parcare** (roșu / verde) și scrie ce blocuri ai folosi. Nu legăm nimic acasă fără un adult.
