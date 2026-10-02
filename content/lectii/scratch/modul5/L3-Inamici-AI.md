# Lecția 3 — Inamici: patrulare și detecție
**Modulul 5 · Reguli de joc · Block 1**  
**Code Kids Play · Maestru de jocuri**

> Azi: inamic care **patrulează** între două limite (sau se întoarce pe perete/culoare) + lovitură la atingere.  
> Fișier **nou**: `Prenume_Nume_M5_L3` · proiect: **„Evită patrula”**  
> *(„AI” = reguli simple, nu inteligență magică.)*

---

## Obiectiv
**Minim:** ≥1 inamic pe patrulare între **X₁ și X₂** (sau întoarcere pe margine/culoare) · atingere cu reacție (HP sau restart poziție) · poți evita · reset curat.  
**Complet:** Minim + 2 inamici **sau** „rază” (se întoarce / accelerează când eroul e aproape) **sau** platformă + patrulare (cu săritură din L1).

## De ce contează
Patrularea e baza mob-ilor din proiectul mare și din **M6 L6** (creatură peșteră).  
Detecția cu limite e mai stabilă decât „aleator peste tot”.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Demo: stânga↔dreapta între 2 x |
| 12–25 | Alege metoda: limite X **sau** perete/culoare |
| 25–100 | Construiești Minim → Complet |
| 100–120 | Coleg evită și e lovit o dată pe bune |

---

## Pas cu pas

### 1) Ideea *(5 minute, pe foaie)*
Inamicul are o variabilă `dir`: **1** înseamnă „merge spre dreapta”, **-1** „spre stânga”. La fiecare pas se mută cu `dir × 2`. Când ajunge la o limită, `dir` își schimbă semnul și inamicul se întoarce. Asta e „inteligența” lui: o regulă simplă.

**Încearcă tu — pe foaie (5 min):** alege limitele: **X1 = -100** și **X2 = 100**. Cât durează o plimbare dus-întors, dacă pasul e 2? *(100 de pași dus, 100 întors)*

### 2) Eroul *(Minim, partea 1 · 15 minute)*
1. Proiect nou → `Prenume_Nume_M5_L3`  
2. Variabila `viață` *(pentru toate sprite-urile)*  
3. Eroul `Erou`, pe steag: `du-te la x: -200 y: -100` și `setează viață la 3`  
4. În `repetă la nesfârșit`: mersul stânga/dreapta, cu `schimbă x cu 4` / `-4`  
5. Săritura simplă *(o rețetă fără fizică)*: `dacă <tasta spațiu apăsată?>` → `repetă 10` { `schimbă y cu 6` }, apoi `repetă 10` { `schimbă y cu -6` }

**Verifici:** eroul merge și sare cam 60 de pași înălțime, apoi revine exact unde era.

### 3) Inamicul care patrulează *(Minim, partea 2 · 15 minute)*
Sprite `Inamic`, variabila `dir` **numai pentru acest sprite**:
1. Pe steag: `du-te la x: 100 y: -100` · `setează dir la 1`  
2. `repetă la nesfârșit`:  
   - `schimbă x cu (dir * 2)`  
   - `dacă <x poziția > 100>` **atunci** `setează dir la -1`  
   - `dacă <x poziția < -100>` **atunci** `setează dir la 1`

**Verifici:** inamicul merge între **-100 și 100** și se întoarce de fiecare dată. Dacă iese de pe ecran, vezi „Greșeli frecvente”.

### 4) Lovitura *(Minim, partea 3 · 10 minute)*
La **Erou**, în același `repetă la nesfârșit`:
- `dacă <atinge Inamic?>` **atunci**:  
  1. `schimbă viață cu -1`  
  2. `du-te la x: -200 y: -100`  
  3. `spune Au!` timp de `1` secundă *(asta e și „pauză între lovituri”: eroul stă o secundă și nu mai e lovit imediat)*  
  4. `dacă viață = 0` → `spune Game over` și `oprește tot`

**Verifici:** te lovești o dată — pierzi **o** viață, nu trei deodată. Poți trece sărind peste inamic: apeși spațiu când e aproape și aterizezi de cealaltă parte.

### 5) Complet *(alege cel puțin una)*
- [ ] **Al doilea inamic:** duplici sprite-ul `Inamic` *(click dreapta)*, schimbi limitele și poziția de start  
- [ ] **Rază:** în scriptul inamicului: `dacă <(valoare absolută din (x poziția - x poziția lui Erou)) < 80>` → `schimbă x cu (dir * 3)` *(aleargă când ești aproape)*  
- [ ] **Platformă:** un sprite-platformă la y = -40, inamic pe ea *(y: -40 + înălțimea)*


---

## Greșeli frecvente
1. **Inamicul iese din scenă** — lipsesc ambele `dacă` de întoarcere, sau limitele sunt prea mari.  
2. **Moare din trei lovituri deodată** — lipsește `spune … 1 secundă` sau `du-te la start`.  
3. **Se blochează în limită** — a trecut de limită și `dir` se schimbă la fiecare pas. Folosește `>` / `<`, nu `=`.  
4. **`dir` e comună tuturor** — dacă ai doi inamici, fiecare trebuie să aibă `dir` **numai pentru acest sprite**.  
5. **Nu poți trece** — inamicul patrulează prea sus sau eroul sare prea puțin.  
6. **Săritura nu revine** — `repetă 10` cu `6` în sus și `repetă 10` cu `-6` în jos trebuie să fie egale.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_L3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Patrulare · atingere cu reacție · evitabil · reset |
| **Complet** | Minim + 2 inamici **sau** rază **sau** + săritură |

---

## Bonus
- [ ] Inamic pe platformă suspendată  
- [ ] Scor când „sari pe cap” (opțional greu)

## Recapitulare rapidă
1. Limite X sau perete = patrulare  
2. Reacție + pauză  
3. Pod spre M6 creatură  

## Schema pe scurt

**Inamic**  
`forever` → `schimbă x cu dir*…` → `dacă x>X2 sau x<X1` → `dir = −dir`  

**Lovitură**  
atinge Erou → HP−1 → `așteaptă 1`  

**Quiz scurt:**  
- Ce e X1/X2?  
- De ce pauză între lovituri?  
- Unde reapare ideea în M6?

## Temă
Al 2-lea inamic. Urmează L4 = **liste** (pod spre Cubes).
