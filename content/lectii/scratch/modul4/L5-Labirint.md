# Lecția 5 — Labirint pe 2 nivele
**Modulul 4 · Antrenament (fișier separat)**  
**Code Kids Play · Scratch Creator**

> Azi construiești un **labirint cu Level 1 + Level 2**, presiune (vieți **sau** timer), restart curat.  
> Fișier **nou** (poate inspira L1, dar **nu** e același proiect).  
> Proiect: **„Labirint pe nivele”** · fișier: `Prenume_Nume_M4_L5`

---

## Obiectiv
La finalul orei cineva trece **ambele nivele** fără ajutor.  
**Minim:** control erou · L1 + L2 **diferite** · trecere automată la obiectiv · ziduri care opresc / trimit înapoi · **vieți SAU timer** pe scenă · victorie pe L2 · steag = L1 + reset.  
**Ținta orei (Complet):** Minim + **Level 3** **sau** (vieți **și** timer) **sau** cheie/ușă **sau** cursă 2 jucători.

## De ce contează
Labirintul pe nivele = tot ce ai din M2–M3: atingere, mesaje, presiune de timp/vieți.  
Dacă tipul tău la L1 e labirint/joc, azi exersezi trecerea de nivel pe care o termini la L6.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Labirint pe nivele + demo L1→L2 |
| 10–15 | Schiță **rapidă** (5 min max) |
| 15–100 | Construiești pe Scratch (vezi **Minim vs Complet**) |
| 100–120 | Test L1→L2 (coleg / părinte / autotest) + note pentru L6 |

**Foaie = 5 min (sau direct Scratch).** Schița: L1 simplu · L2 în „S” · vieți sau timer.

**Capitole:**  
<span style="color:#4C97FF;font-weight:700">Mișcare</span> · <span style="color:#5CB1D6;font-weight:700">Detectare</span> · <span style="color:#FFAB19;font-weight:700">Control</span> · <span style="color:#E6A800;font-weight:700">Evenimente</span> · <span style="color:#FF8C1A;font-weight:700">Variabile</span> · <span style="color:#9966FF;font-weight:700">Aspect</span>

---

## Pas cu pas

### 1) Schiță ultra-rapidă *(5 min max — foaie sau direct Scratch)*
Nu desenezi labirint artistic. Doar **3 puncte**:

1. **L1 — cale simplă:** Start stânga-jos → Finish dreapta-sus  
2. **L2 — cale cu obstacole:** Start stânga-sus → ziduri în „S” → Finish dreapta-jos  
3. **Presiune:** vieți **sau** timer  

**Încearcă tu (5 min)**  
- [ ] Știi L1 vs L2 (de ce e mai greu L2)  
- [ ] Ai ales vieți sau timer  
- [ ] Treci la Scratch  

### 2) Erou + ziduri + Level 1
1. Proiect nou → `Prenume_Nume_M4_L5`  
2. Erou: 4 direcții cu `schimbă x/y` (săgeți **sau** WASD)  
3. Ziduri: **o culoare** pe fundal (sau sprite)  

**De reținut — atingere clasică (Minim):**  
`dacă` <span style="color:#5CB1D6;font-weight:700">atinge culoarea</span> `[zid]?` → <span style="color:#4C97FF;font-weight:700">du-te la</span> x: … y: … *(poziția de start)*  

*(Nu „înapoi un pas” la Minim — e mai predispus la greșeli. Start curat = mai sigur.)*

4. Obiectiv L1 (sprite sau culoare finish)  
5. La steag: poziție start · fundal L1 · reset variabile · oprește sunete

**Încearcă tu — L1 jucabil (20 min)**  
- [ ] Atingi zidul → te întorci la start  
- [ ] Ajungi la finish L1  

### 3) Level 2 + trecere *(Minim)*
1. La finish L1: `trimite Nivelul_2` (sau echivalent)  
2. L2 ca pe schiță: start sus-stânga · ziduri în „S” · finish jos-dreapta — **vizibil mai greu** decât L1  
3. Finish L2 → mesaj victorie (`spune` / fundal „Ai câștigat!”)  
4. Steag = mereu Level 1 + reset + aceeași regulă de zid

**Încearcă tu — L1→L2 (20 min)**  
- [ ] Trecerea e **automată** la obiectiv  
- [ ] L2 se simte mai greu (nu doar alt titlu)  

**Exemplu concret — trecerea L1 → L2** *(variabila `nivel` evită trecerea repetată)*  
1. Variabilă `nivel` (pentru toți). La steag: <span style="color:#FF8C1A;font-weight:700">setează</span> `nivel` la `1`  
2. Pe **Finish**: steag → <span style="color:#4C97FF;font-weight:700">du-te la</span> (finishul L1) → <span style="color:#FFAB19;font-weight:700">forever</span> → <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge</span> `Erou` **atunci:**  
   <span style="color:#FFAB19;font-weight:700">dacă</span> `nivel = 1` → `setează nivel la 2` → <span style="color:#E6A800;font-weight:700">trimite</span> `Nivelul_2` → <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` *(timp ca eroul să ajungă la noul start)*  
   **altfel:** <span style="color:#9966FF;font-weight:700">spune</span> `Ai câștigat!` timp de `2` secunde → <span style="color:#FFAB19;font-weight:700">oprește</span> `toate`  
3. Pe **Finish**: <span style="color:#E6A800;font-weight:700">când primesc</span> `Nivelul_2` → <span style="color:#4C97FF;font-weight:700">du-te la</span> (finishul L2)  
4. Pe **Scenă**: <span style="color:#E6A800;font-weight:700">când primesc</span> `Nivelul_2` → <span style="color:#9966FF;font-weight:700">comută fundalul la</span> `Nivel2`  
5. Pe **Erou**: <span style="color:#E6A800;font-weight:700">când primesc</span> `Nivelul_2` → <span style="color:#4C97FF;font-weight:700">du-te la</span> (startul L2)  

Zidurile sunt desenate pe fiecare fundal, în aceeași culoare pipetată. **Verifici:** atingi Finish pe L1 → fundalul L2 și eroul la noul start; atingi Finish pe L2 → „Ai câștigat!”.  

### 4) Presiune: vieți sau timer *(Minim)*
**Varianta A — Vieți**  
- Variabilă `vieti` pe Scenă  
- Perete greșit / groapă → `schimbă vieti cu -1`  
- `vieti = 0` → `Sfârșitul jocului` + oprește controlul  

**Varianta B — Timer**  
- Variabilă `timp` pe **Scenă** (ca M3 L5)  
- Scade în `forever` cu `așteaptă 1`  
- `timp = 0` → Sfârșitul jocului  
- La Nivelul 2: poți reseta / da timp extra  

**Încearcă tu — presiune (15 min)**  
- [ ] Vieți **sau** timer se văd pe scenă  
- [ ] Pierzi clar când ajungi la 0  

### 5) Complet
Alege **cel puțin una**:  
- [ ] **Level 3** jucabil  
- [ ] **Vieți și timer** împreună  
- [ ] **Cheie / ușă:** variabilă `are_cheie` deblochează finish-ul  
- [ ] **Cursă cu 2 jucători:** J1 săgeți · J2 WASD · cine ajunge primul  

---

## Greșeli frecvente
1. **Prea mult pe foaie** — 3 puncte (L1 / L2 / presiune), zidurile în Scratch.  
2. **L2 = L1 cu alt fundal gol** — folosește calea în „S”, nu doar alt titlu.  
3. **Trecere manuală** — Minim cere trecere **automată** la obiectiv.  
4. **Ziduri „fantomă”** — culoarea din `atinge culoarea` trebuie să fie **exact** culoarea zidului.  
5. **Timer pe Erou, nu pe Scenă** — pune `timp` pe Scenă.  
6. **Fără reset la steag** — vieți/timp + poziție rămân de la runda trecută.  
7. **Control pe un singur ax** — Minim cere 4 direcții.

---

## De făcut azi — „Labirint pe nivele”
Salvat: `Prenume_Nume_M4_L5`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Control · L1+L2 diferite · trecere auto · ziduri · vieți **sau** timer · victorie L2 · restart |
| **Complet** | Minim + L3 **sau** vieți+timer **sau** cheie/ușă **sau** cursă 2 jucători |

### Pasul 1 — Schiță (5 min)
- [ ] L1 simplu · L2 în „S” · vieți sau timer  

### Pasul 2 — Minim
- [ ] Zid → `du-te la` start · L1→L2 auto · presiune · test  

### Pasul 3 — Complet
- [ ] Una din variantele Complet  

---

## Bonus (dacă ai terminat Complet)
- [ ] Sunet la trecerea de nivel + la victorie  
- [ ] Labirint care se schimbă după timp (mesaj + ziduri noi)  
- [ ] Notă: ce muți în proiectul L1  

## Recapitulare rapidă
1. Schiță 3 puncte → **Scratch**  
2. Zid = `atinge culoarea` → `du-te la` start  
3. L2 mai greu („S”) · presiune vieți/timer  
4. Fișier: **`Prenume_Nume_M4_L5`**

## Schema pe scurt *(pe foaie)*

**Erou**  
steag → `du-te la` start → `forever` → `dacă` săgeți → `schimbă x/y`  
`dacă atinge culoarea [zid]?` → `du-te la` start  

**Trecere**  
atinge finish L1 → `trimite Nivelul_2` → fundal L2 (cale „S”) + start nou  

**Timer (pe Scenă)**  
steag → `setează timp la …` → `forever` → `așteaptă 1` → `schimbă timp cu -1` → `dacă timp = 0` → Sfârșitul jocului  

**Quiz scurt:**  
- Care e rețeta la zid?  
- Cum e L2 diferit de L1?  
- Ce ai lua în baza jocului L1?

## Temă
Sunet la trecerea de nivel. Urmează L6 = **proiectul tău** (deschizi `…_M4_L1` / salvezi ca L6).
