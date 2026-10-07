# Lecția 9 — Detalii urbane
**Modulul 4 · Orașul nostru**  
**Code Maker Club · City Builder**  
**Vârstă:** ~8–10 ani

> Azi aduci orașul la viață cu **felinare**, **semafoare** și **indicatoare** — piese mici, multe, făcute cu **Ctrl+D**.  
> Proiect: pe placa ta · `Prenume_Nume_T4_L09`

---

## Obiectiv
La finalul orei ai **detalii urbane** pe lângă străzile tale: felinare la distanțe egale, un semafor și un indicator.  
**Minim:** **felinar** (stâlp **0,8·0,8·8** + cap **3·1,2·1**) · **4 felinare** (unul făcut + 3 copii) la **20 mm** unul de altul · **1 semafor** (stâlp **Ø0,8·9**, cutie **2·2·5**, 3 sfere **Ø1,5**) · **1 indicator** (stâlp **Ø0,6·7** + placă **3·0,3·3**).  
**Complet:** Minim + **8 felinare** (pe ambele părți ale străzii) + **4 semafoare** (câte unul la fiecare colț al intersecției) + **3 indicatoare**.

## De ce contează
Detaliile mici dau viață unui oraș. Dar nu le faci pe rând, una câte una: faci **o piesă bună**, o grupezi și o **copiezi** cu aceeași mutare. Așa lucrează și arhitecții.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8 · ce lipsește de pe străzi? |
| 10–40 | Pas cu pas: felinarul · copiat în șir |
| 40–100 | Semaforul · indicatorul · Minim → Complet → Bonus |
| 100–120 | Recap, quiz, salvare |

**Unelte azi:** **Box** · **Cylinder** · **Sphere** · **Align** (**L**) · **Ctrl+D** · **Ctrl+G** · **Snap Grid 0.5 / 2** · **conul negru** · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. Copia proiectului `Prenume_Nume_T4_L08` (**Duplicate**), redenumită `Prenume_Nume_T4_L09`  
2. Snap Grid: **0.5 mm**  
3. Toate piesele stau pe zone, **la 1 mm de marginea dinspre stradă**, la **4 mm** *(nu pe trotuar, nu pe asfalt)*

### 2) Felinarul
1. **Box** **0,8 · 0,8 · 8** *(stâlpul)* → gri, ridicat la **4 mm**  
2. **Box** **3 · 1,2 · 1** *(capul)* → galben, ridicat la **12 mm** *(deasupra stâlpului)*  
3. **L**: stâlp și cap — mijloc pe stânga–dreapta și mijloc pe față–spate *(capul stă centrat deasupra stâlpului, ca un T; arată la fel din orice parte)*  
4. **Ctrl+G** → „felinarul”

### 3) Felinarele în șir
1. Felinarul → pe zona din spate, la 1 mm de marginea dinspre strada orizontală și la 3 mm de colțul stâng al zonei  
2. Snap Grid: **2.0 mm** → **Ctrl+D** → muți copia **20 mm** spre dreapta  
3. **Ctrl+D** de încă 2 ori → **4 felinare** egal distanțate *(Minim)*

### 4) Semaforul
1. **Cylinder** **0,8 · 0,8 · 9** *(stâlpul)* → gri, la **4 mm**  
2. **Box** **2 · 2 · 5** *(cutia)* → negru, la **8 mm**; **L**: mijloc pe ambele axe cu stâlpul  
3. **Sphere** **1,5 · 1,5 · 1,5** → **roșu**, la **11 mm**, mijloc pe stânga–dreapta cu cutia; **L** pe marginea din **față** a cutiei și apoi o muți **0,5 mm spre față**  
4. **Ctrl+D** pe sferă → muți copia **1,5 mm în jos** → **galben** → **Ctrl+D** → **1,5 mm în jos** → **verde** *(cele 3 lumini, de sus în jos: roșu, galben, verde)*  
5. Selectezi stâlpul, cutia și cele 3 sfere → **Ctrl+G**

### 5) Indicatorul
1. **Cylinder** **0,6 · 0,6 · 7** → gri, la **4 mm**  
2. **Box** **3 · 0,3 · 3** *(placa)* → roșu sau albastru, la **8 mm**; mijloc pe ambele axe cu stâlpul  
3. **Ctrl+G**

### 6) Complet — felinare pe ambele părți
1. Selectezi cele 4 felinare → **Ctrl+D** → muți copiile **18 mm spre față** *(16 mm cât e golul + 2 mm: ajung pe zona de cealaltă parte a străzii, tot la 1 mm de margine)* — Snap Grid 2.0, 9 sărituri  
2. Verifici din **Top**: 4 felinare pe fiecare parte a străzii

### 7) Complet — semafoare la colțuri
1. Semaforul → la colțul intersecției *(pe zona din dreapta-spate, adică parcul, în colțul dinspre intersecție, la 1 mm de ambele margini)*  
2. **Ctrl+D** → **18 mm** spre stânga *(colțul de peste strada verticală)* → selectezi ambele → **Ctrl+D** → **18 mm** spre față → **4 semafoare** *(Snap Grid 2.0)*

### 8) Complet — 3 indicatoare
1. Indicatorul → pe margini de străzi  
2. **Ctrl+D** de 2 ori → alte culori și locuri *(unul de **STOP**, unul de **parcare**, unul pentru **pietoni**)*

---

## Greșeli frecvente
1. **Felinarele nu sunt egal distanțate** — prima mutare de 20 mm, apoi doar **Ctrl+D**.  
2. **Capul plutește lângă stâlp** — nu ai folosit **L**.  
3. **Semaforul nu are lumini** — sferele sunt în cutie; mută-le 0,5 mm spre față.  
4. **Luminile în ordinea greșită** — roșu sus, galben la mijloc, verde jos.  
5. **Piesele sunt pe stradă** — așază-le pe marginea zonei.  
6. **Nu ai grupat** — la mutare rămân piese în urmă.  
7. **Prea mari** — un felinar de 8 mm = 4 m în realitate.

---

## De făcut azi — „Detaliile mele”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 4 felinare la 20 mm · 1 semafor cu 3 lumini · 1 indicator |
| **Complet** | + 8 felinare · 4 semafoare · 3 indicatoare |

### Pasul 1 — Minim
- [ ] Felinar (stâlp + cap, grupat)  
- [ ] 4 felinare la 20 mm  
- [ ] Semafor cu 3 lumini (roșu, galben, verde)  
- [ ] Indicator  

### Pasul 2 — Complet
- [ ] Felinare pe ambele părți  
- [ ] 4 semafoare la colțuri  
- [ ] 3 indicatoare  
- [ ] **Color** · numele `T4_L09` e corect  

---

## Bonus (extra — după Complet)
- [ ] Coș de gunoi: Cylinder mic pe trotuar  
- [ ] Hidrant: Cylinder roșu + capac  
- [ ] Panou publicitar: Box mare pe doi stâlpi

## Recapitulare rapidă
1. **Detaliu bun** = o piesă făcută o dată, copiată  
2. Distanțe egale = **Ctrl+D**  
3. Semafor: roșu, galben, verde, de sus în jos

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** felinar (stâlp 0,8·0,8·8 + cap 3·1,2·1 la 12 mm) → Ctrl+D ×3 (20 mm) · semafor (Ø0,8·9, cutie 2·2·5, 3 sfere Ø1,5) · indicator (Ø0,6·7 + placă 3·0,3·3)  
**Complet:** 8 felinare · 4 semafoare · 3 indicatoare

**Quiz scurt:**  
- Care e ordinea luminilor la semafor?  
- Cum faci 4 felinare egale?  
- De ce grupezi piesele?

## Temă
Opțional: observă pe drum spre casă ce detalii urbane vezi (felinare, indicatoare, coșuri). Desenează două dintre ele.
