# Lecția 5 — Timer: „Ai 20 de secunde”
**Modulul 3 · Jocuri**  
**Code Kids Play · Game Builder**

> Azi jocul tău are un **cronometru**: trebuie să prinzi 5 stele înainte să treacă 20 de secunde.  
> **Deschide** proiectul din L4 → **Fișier → Salvează ca** → `Prenume_Nume_M3_L5` (ex. `Ana_Pop_M3_L5`)  
> Proiect: **„Ai 20 de secunde”**

---

## Obiectiv
La finalul orei poți crea variabila <span style="color:#FF8C1A;font-weight:700">timp</span> care scade automat, cu <span style="color:#FFAB19;font-weight:700">Control</span> (bucla `forever` + `așteaptă`), și declanșează pierderea la 0.  
**Minimum:** `timp` pornește de la 20, scade −1 în fiecare secundă, „Timpul a expirat!” la 0.  
**Ținta orei (Complet):** Minim + victorie dacă `scor = 5` **înainte** să se termine timpul (cele două condiții „concurează”).

## De ce contează
Timpul limitat schimbă complet cum se joacă un joc: fără el poți lua oricât să câștigi; cu el, trebuie să te grăbești și să iei decizii rapide. E ingredientul care transformă „Prinde 5 stele” într-o adevărată **cursă contra cronometru**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap: `setează` vs `schimbă` · **2 scripturi** (Scenă = cronometru, Erou = mesaj) |
| 10–30 | Variabilă `timp` + countdown pe **Scenă** — checkpoint-uri (**Încearcă tu**) |
| 30–100 | Expirare pe **Erou** + victorie `scor = 5` (vezi **Minim vs Complet**) |
| 100–120 | Echilibrezi jocul (15 / 20 / 30 s), salvare |

**De reținut — cele 2 bucle:**  
1. **Scenă = cronometrul** (numără secundele; **nu** pune aici `spune` — Scena **nu are** bulă de text)  
   `steag` → `setează timp la 20` → `forever` → **`așteaptă 1`** → **`schimbă timp cu -1`**  
2. **Erou = arbitrul mesajului**  
   `forever` → `dacă timp = 0` → `spune Timpul a expirat!` → `oprește toate`

**De ce întâi `așteaptă`, apoi `schimbă`?**  
La steag vezi `20` o secundă, apoi `19`, `18`… Dacă pui **`schimbă` înaintea** lui `așteaptă`, sare **instant** de la 20 la 19 — pare greșit.

**Capitole azi:**  
<span style="color:#FF8C1A;font-weight:700">Variabile</span> (`timp`) · <span style="color:#FFAB19;font-weight:700">Control</span> (`forever`, `așteaptă`, `dacă`, `oprește`) · <span style="color:#59C059;font-weight:700">Operatori</span> (`=`) — plus din L3: <span style="color:#FF8C1A;font-weight:700">scor</span>.

---

## Pas cu pas

### 1) Creezi variabila `timp`
1. Din <span style="color:#FF8C1A;font-weight:700">Variabile</span>: **Creează o variabilă** → `timp` → **Pentru toate personajele**
2. Click pe **Scenă** (tab-ul decor / backdrop) — aici stă cronometrul

**Încearcă tu — variabila (2 min)**  
- [ ] Vezi `timp` pe scenă  
- [ ] Ai **Scena** selectată (nu Eroul) pentru scriptul de countdown

### 2) Countdown pe Scenă *(nucleul Minim)*
1. Pe **Scenă**, din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
2. <span style="color:#FF8C1A;font-weight:700">setează</span> `timp` <span style="color:#FF8C1A;font-weight:700">la</span> `20`
3. Din <span style="color:#FFAB19;font-weight:700">Control</span>: <span style="color:#FFAB19;font-weight:700">forever</span>
4. **În interiorul** buclei, **în ordine**:  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1` secundă →  
   <span style="color:#FF8C1A;font-weight:700">schimbă</span> `timp` <span style="color:#FF8C1A;font-weight:700">cu</span> `-1`  
   *(doar `cu -1` — ca să nimerească fix pe 0; vezi greșeli)*

**Încearcă tu — countdown (4–5 min)**  
- [ ] Steag → vezi `20` ~1 s, apoi 19, 18, 17… o dată pe secundă  
- [ ] Nu sare instant 20→19 (ai `așteaptă` **înainte** de `schimbă`)

### 3) Timpul expiră → pe Erou *(nucleul Minim)*
*(Scena **nu** are `spune … timp de …`. Mesajul stă pe **Erou** — ca arbitrii din L3–L4.)*

1. Selectezi **Erou**
2. O buclă `forever` **separată** (doar pentru expirare), cu condiție `dacă`:  
   `timp` <span style="color:#59C059;font-weight:700">=</span> `0`
3. În interior:  
   <span style="color:#9966FF;font-weight:700">spune</span> `Timpul a expirat!` timp de `2` secunde →  
   <span style="color:#FFAB19;font-weight:700">oprește</span> `toate`

*(Alternativă pe Scenă, fără `spune`: `pornește sunetul` / `redă … până la final` + `așteaptă` `0.5` → `oprește toate` — azi preferăm mesajul pe Erou.)*

**Încearcă tu — pierzi pe timp (3 min)**  
- [ ] Aștepți fără să prinzi stele → la 0: „Timpul a expirat!” pe Erou  
- [ ] Jocul se oprește (nu continuă la −1, −2…)

### 4) Victoria „concurează” cu timpul *(Complet)*
*(Scorul din L3: acum ai **două** finale care se întrec.)*

1. Pe **Erou** (sau pe **Scenă**, dacă victoria e deja acolo din L3):  
   `forever` separat → `dacă scor = 5` →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Ai câștigat!` timp de `2` secunde →  
   <span style="color:#FFAB19;font-weight:700">oprește</span> `toate`  
   *(`spune` pe Scenă **nu** merge — victoria cu text tot pe Erou)*
2. Două scripturi separate: `timp = 0` (pierzi) și `scor = 5` (câștigi) — **oricare** prima → `oprește toate`

**Încearcă tu — cine câștigă cursa (3–4 min)**  
- [ ] Prinzi 5 stele rapid → „Ai câștigat!”  
- [ ] Prinzi mai puțin de 5 → „Timpul a expirat!”  
- [ ] Salvat: `Prenume_Nume_M3_L5`

---

## Greșeli frecvente
1. **`schimbă timp cu -1` înaintea lui `așteaptă 1`** — sare instant 20→19; pune **întâi** pauza.
2. **`schimbă timp cu -1` fără `așteaptă`** — timpul cade la 0 într-o clipă.
3. **`spune` pe Scenă** — Scena **nu are** bulă; pune „Timpul a expirat!” / „Ai câștigat!” pe **Erou**.
4. **Uiți `setează timp la 20` la steag** — a doua rundă pornește de unde a rămas.
5. **Scazi altceva decât −1** (ex. `cu -3`) — poți sări peste 0 și `timp = 0` nu se mai declanșează. Azi countdown-ul e **doar −1**.
6. **`timp = 0` și `scor = 5` în aceeași buclă** — e mai curat **două** bucle `forever` separate pe Erou.
7. **`oprește toate` lipsă** la una din condiții — jocul continuă în fundal.
8. **Nume fișier** — `Prenume_Nume_M3_L5`, nu doar `Ana_M3_L5`.

---

## De făcut azi — „Ai 20 de secunde”
Salvat: `Prenume_Nume_M3_L5`  
*(Pornire: proiectul L4 → **Salvează ca** L5.)*

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Pe **Scenă**: `timp = 20` + `forever` (`așteaptă 1` → `schimbă cu -1`). Pe **Erou**: `timp = 0` → „Timpul a expirat!” + `oprește toate` |
| **Complet (ținta orei)** | Minim + 5 stele / `scor` din L3 + pe **Erou**: `scor = 5` → „Ai câștigat!” + `oprește toate` |

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Variabila pe Scenă *(bază)*
- [ ] Variabila `timp`, vizibilă pe scenă  
- [ ] Pe **Scenă**, la steag: `setează timp la 20`  

### Pasul 2 — Countdown + expirare *(Minim)*
- [ ] Pe **Scenă**: `forever` → `așteaptă 1` → `schimbă timp cu -1`  
- [ ] Pe **Erou**: `forever` → `dacă timp = 0` → `spune` → `oprește toate`  
- [ ] Salvat: `Prenume_Nume_M3_L5`

**→ Minim când:** steag → timpul scade o dată pe secundă → la 0 mesaj pe Erou + stop.

### Pasul 3 — Scor contra cronometru *(Complet)*
- [ ] Refolosești `scor` + 5 ținte din L3  
- [ ] Pe **Erou**: `dacă scor = 5` → „Ai câștigat!” + `oprește toate`  
- [ ] Un coleg: o dată câștigă (5 rapid), o dată pierde (prea încet)  
- [ ] Salvat din nou

**Gata Complet când:** poți câștiga **și** poți pierde pe timp, cu mesajele corecte.

---

## Bonus (dacă ai terminat Complet)
- [ ] Ultimele 5 secunde: <span style="color:#CF63CF;font-weight:700">sunet</span> de tensiune sau <span style="color:#9966FF;font-weight:700">efect culoare</span> pe Erou  
- [ ] Obiect bonus: `schimbă timp cu 3` — *atenție: poți sări peste 0; testează!*  
- [ ] Fundal diferit la victorie vs. expirare (`comută fundalul`)  
- [ ] Echilibru: încearcă **15** sau **30** de secunde — care e mai fun?

## Recapitulare rapidă
1. Countdown pe **Scenă**: `așteaptă 1` → `schimbă timp cu -1`  
2. Mesaj la 0 pe **Erou** (`spune` + `oprește toate`) — nu pe Scenă  
3. Două finale care concurează: `timp = 0` vs `scor = 5`  
4. Nume: **`Prenume_Nume_M3_L5`**

## Schema pe scurt *(pe foaie)*

**Pe Scenă** *(cronometrul)*  
la steag → `setează timp la 20` → `forever`:  
· `așteaptă 1` → `schimbă timp cu -1`

**Pe Erou** *(mesajele — Scena n-are `spune`)*  
`forever`: `dacă timp = 0` → `spune Timpul a expirat!` 2 s → `oprește toate`  
`forever`: `dacă scor = 5` → `spune Ai câștigat!` 2 s → `oprește toate` *(Complet)*

**Quiz scurt (cu profesorul):**  
- De ce `așteaptă 1` vine **înainte** de `schimbă timp cu -1`?  
- De ce nu pui `spune` pe Scenă?  
- Ce se întâmplă dacă scazi timpul cu −3 dintr-o dată?  
- Care script oprește jocul dacă prinzi 5 stele la secunda 19?

## Temă
Opțional: ajustează la 15 sau 30 de secunde. Care variantă e mai echilibrată? Același fișier `Prenume_Nume_M3_L5`.
