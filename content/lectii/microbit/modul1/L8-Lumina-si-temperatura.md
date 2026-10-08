# Lecția 8 — Lumină și temperatură
**Modulul 1 · Primii pași cu micro:bit (blocuri)**  
**Code Maker Club · micro:bit Starter**

> Azi placa devine un **detectiv**: simte cât de multă lumină e în cameră și ce temperatură e. Din asta facem un felinar care se aprinde singur.  
> Proiect: **„Felinarul inteligent”** · `Prenume_Nume_MB1_L08`

---

## Obiectiv
La finalul orei citești **senzorul de lumină** și **senzorul de temperatură** și iei decizii pe baza lor.  
**Minim:** când se face întuneric, placa aprinde toate LED-urile ca un felinar; când e lumină, le stinge.  
**Complet:** Minim + la apăsarea lui **A**, placa îți spune temperatura, fără să se încurce cu felinarul.

## De ce contează
Felinarele din parc se aprind singure seara. Aerul condiționat pornește când e prea cald. Telefonul își face ecranul mai luminos la soare. Toate aceste aparate **măsoară** lumina sau temperatura și **decid** ce să facă. Azi faci și tu un astfel de aparat.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7: gesturi, `pick random` |
| 10–30 | Cum „vede” lumina placa? Măsurăm cu bara de LED-uri |
| 30–45 | Temperatura: ce arată și cât de exact |
| 45–80 | Felinarul inteligent (**Minim**) |
| 80–105 | Temperatura la cerere, fără încurcături (**Complet**) |
| 105–112 | Depanare în pereche |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** `light level` · `temperature (°C)` · `plot bar graph of … up to …` · `if … else` · `show leds` · `clear screen` · variabile

---

## Pas cu pas

### 1) Cum „vede” lumina placa?
Placa **nu are un ochi special**. Ea folosește chiar **LED-urile** de pe ecran și le face să măsoare lumina. Rezultatul e un număr între **0** (întuneric total) și **255** (lumină foarte puternică).

**Explorare — o bară de lumină:**
```text
forever
    plot bar graph of light level up to 255
    pause (ms) 100
```
- `light level` e în **Input**. `plot bar graph of … up to …` e în **LED**.  
- Acoperă placa cu **palma**: bara scade.  
- Luminează-o cu **lanterna telefonului**: bara crește.

**Ce vezi pe ecran:** o bară de LED-uri aprinse. Cu cât e mai multă lumină, cu atât se aprind mai multe LED-uri.

Notează pe foaie trei valori măsurate cu `show number light level`: **în clasă**, **cu palma peste placă** și **cu lanterna**. Valorile diferă de la o sală la alta, deci pragul din program trebuie ales de tine.

### 2) Temperatura
Placa măsoară temperatura cu un senzor din interior, iar blocul `temperature (°C)` îți dă un număr în **grade Celsius**.

```text
on button A pressed
    show number temperature
```
- Valoarea e **aproximativă**: placa se încălzește puțin singură, deci poate arăta cu un grad sau două mai mult decât termometrul din cameră.  
- În simulator ai un cursor pentru temperatură, ca să încerci valori diferite.

### 3) Felinarul — Minim
Creezi un proiect nou: `Prenume_Nume_MB1_L08`.

```text
forever
    if light level < 50 then
        show leds   (toate cele 25 de LED-uri aprinse)
    else
        clear screen
    pause (ms) 100
```

**Cum desenezi „toate aprinse”:** în `show leds` apeși pe fiecare pătrățel până se face roșu peste tot.

**Ce vezi pe ecran la întuneric:**
```text
# # # # #
# # # # #
# # # # #
# # # # #
# # # # #
```
La lumină ecranul e **stins**.

- **50** e **pragul**. Sub 50 e „întuneric”, de la 50 în sus e „lumină”.  
- `pause (ms) 100` îl lasă pe senzor să respire și pe ecran să nu clipească.  
- Testează: acoperă placa cu palma. Se aprinde felinarul? Dacă nu, mărește pragul (de exemplu `80`).

### 4) Complet — temperatura fără încurcături
Dacă apeși A, placa vrea să deruleze temperatura, dar `forever` desenează în același timp (aprinde sau stinge LED-urile) și strică numărul. Rezolvăm cu o **variabilă-semnal** numită `ocupat`.

- `ocupat = 0` înseamnă „felinarul poate lucra”.  
- `ocupat = 1` înseamnă „pe ecran e altceva, felinarul stă”.

```text
on start
    set ocupat to 0

forever
    if ocupat = 0 then
        if light level < 50 then
            show leds   (toate aprinse)
        else
            clear screen
    pause (ms) 100

on button A pressed
    set ocupat to 1
    show number temperature
    pause (ms) 500
    set ocupat to 0
```

- La apăsarea lui A, `ocupat` devine `1`: felinarul **tace**.  
- `show number temperature` derulează temperatura (de exemplu `23`).  
- După o jumătate de secundă, `ocupat` revine la `0` și felinarul își reia treaba.

**Ce vezi pe ecran la apăsarea lui A:** numărul derulează o dată, apoi ecranul se întoarce la felinar.

### 5) Depanare în pereche
Spune ce nu e bine aici:
```text
forever
    if light level > 50 then
        show leds   (toate aprinse)
    else
        clear screen
```
Răspuns: semnul e **greșit**. Cu `>` felinarul se aprinde la **lumină** și se stinge la **întuneric**, exact invers.

---

## Greșeli frecvente
1. **„Felinarul e invers”** — semnul `<` și `>` e schimbat. Întuneric = lumină **mică** = `light level < 50`.  
2. **„Nu se aprinde niciodată”** — pragul e prea mic pentru sala ta. Măsoară și alege altul.  
3. **„Temperatura arată foarte mult”** — e temperatura plăcii, cu un pic mai mare decât a camerei.  
4. **„Numărul de la A dispare”** — ai uitat variabila `ocupat`, iar felinarul îl șterge.  
5. **„Felinarul nu revine după A”** — ai uitat `set ocupat to 0` la sfârșit.  
6. **„Ecranul clipește”** — lipsește `pause (ms) 100` din `forever`.

---

## De făcut azi — „Felinarul inteligent”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Felinar: sub prag toate LED-urile aprinse, altfel stinse |
| **Complet** | Minim + **A** arată temperatura, cu variabila `ocupat` |

### Pasul 1 — Minim
- [ ] `forever` cu `if light level < …` și `else`  
- [ ] `show leds` cu toate cele 25 aprinse  
- [ ] `clear screen` la lumină  
- [ ] Pragul testat și potrivit sălii  

**→ Minim când:** acoperi placa cu palma și ea se luminează.

### Pasul 2 — Complet
- [ ] Variabila `ocupat` setată în `on start`  
- [ ] `if ocupat = 0` în `forever`  
- [ ] A: `ocupat = 1` → `show number temperature` → `ocupat = 0`  
- [ ] Numele fișierului e `MB1_L08`  

---

## Bonus (după Complet)
- [ ] Fă **două praguri**: sub `30` felinar complet, între `30` și `100` doar un rând aprins, peste `100` stins  
- [ ] Arată o față **Happy** dacă temperatura e între `18` și `26` și **Sad** în rest (cu `and`)  
- [ ] Măsoară temperatura în trei locuri din clasă și notează-le într-un tabel  
- [ ] Gândește un aparat din casă care ar folosi senzorul de lumină

## Recapitulare rapidă
1. `light level` dă un număr între **0** și **255**.  
2. Lumina e măsurată cu **LED-urile** de pe ecran.  
3. `temperature (°C)` dă temperatura **aproximativă**.  
4. Pragul îl alegi tu, după locul în care lucrezi.  
5. O variabilă-semnal (`ocupat`) previne încurcăturile de pe ecran.

## Schema pe scurt *(pe foaie)*

`forever` → citește `light level` → mai mic decât prag? → da: LED-uri aprinse · nu: stinge · A → `ocupat = 1` → temperatura → `ocupat = 0`

**Quiz scurt:**  
- Ce valori poate avea `light level`?  
- De ce temperatura plăcii poate fi mai mare decât a camerei?  
- Ce înseamnă `ocupat = 1` în programul nostru?  
- Cum ai schimba pragul felinarului?

## Temă
Observă acasă un aparat care „simte” ceva (felinar, senzor de ușă, frigider). Desenează-l și scrie **ce măsoară** și **ce decide**.
