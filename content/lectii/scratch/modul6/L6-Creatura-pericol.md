# Lecția 6 — Creatură / pericol + HP
**Modulul 6 · Lume de cuburi · Block 2 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui același proiect.  
> Azi: **creatură / pericol** (clone sau mob) + **HP** pe erou — trebuie să supraviețuiești.

---

## Obiectiv
**Minim:** variabilă `vieti` (sau `hp`) pe Scenă · ≥1 creatură / pericol care lovește · reacție la lovitură · la 0 → Sfârșitul jocului · poți evita / fugi.  
**Complet:** Minim + creaturi care apar pe timp / „noapte” **sau** creatură care se apropie de erou **sau** creatură doar într-o zonă (peșteră).

## De ce contează
Fără pericol, lumea e sandbox fără tensiune.  
HP + mob pregătesc misiunea „învinge / supraviețuiește” (L8) și craftul de armă (L7).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Pericol = lavă statică **sau** mob care vine |
| 12–25 | HP pe foaie + unde apar creaturile |
| 25–100 | Construiești (Minim → Complet) |
| 100–120 | Test: colegul pierde o viață pe bune |

---

## Pas cu pas

### 1) Viețile *(10 minute)*
1. Variabila `vieti` *(pentru toate sprite-urile, bifată pe scenă)*  
2. Pe steag, la Erou: `setează vieti la 3`  
3. Un script la Erou, `repetă la nesfârșit`: `dacă <vieti = 0>` **atunci** `spune Sfârșitul jocului!` și `oprește tot`  
   *(Meniul vine la L9; acum doar oprim jocul.)*

**Verifici:** pe scenă se vede `vieti = 3`; steagul îl pune la loc.

### 2) Creatura care patrulează *(Minim · 30 minute)*
Sprite nou `Creatură` *(un pătrat roșu de 28 × 28)*. Variabila `dir`, **numai pentru acest sprite**.
1. Pe steag: `du-te la x: -224 y: -128` · `setează dir la 1` · `arată`  
2. `repetă la nesfârșit`:  
   - `schimbă x cu (dir * 32)`  
   - `dacă <<x poziția > 223> sau <x poziția < -223>>` → `setează dir la (0 - dir)`  
   - `așteaptă 0.4 secunde`

Creatura merge pe **rândul liber de deasupra startului** *(y = -128)*: eroul trebuie s-o evite când urcă.

3. La Erou, în `repetă la nesfârșit`: `dacă <atinge Creatură?>` **atunci**:  
   - `schimbă vieti cu -1`  
   - `du-te la x: 0 y: -160`  
   - `spune Au!` timp de `1` secundă *(asta e și „pauză între lovituri”)*

**Verifici (de fiecare dată):**  
- Creatura merge dus-întors, în pași de 32, fără să iasă din ecran.  
- Te atinge și pierzi **o** viață, nu trei; te întorci la start.  
- Poți trece prin spatele ei, la timp.  
- La `vieti = 0` apare „Sfârșitul jocului!” și totul se oprește.

### 3) Complet *(alege cel puțin una)*
- [ ] **Apariții la interval:** în sprite-ul `Creatură`, alt script: `repetă la nesfârșit` → `așteaptă 8 secunde` → `creează o clonă a mea` *(clona patrulează la fel; scriptul de patrulare e sub `când încep ca o clonă` pentru ea)*  
- [ ] **Creatura se apropie:** în loc de `dir`, `dacă <(x poziția lui [Erou]) > x poziția>` → `schimbă x cu 32`, `altfel` `schimbă x cu -32`; la fel pe y, o dată pe 0,6 secunde  
- [ ] **Doar în Deșert:** creatura pornește când `x poziția lui Erou > 0`; până atunci rămâne ascunsă


---

## Greșeli frecvente
1. **Pierzi trei vieți deodată** — lipsește `spune … 1 secundă` sau `du-te la start` după lovitură.  
2. **Creatura iese din ecran** — lipsesc limitele de ±223 sau `dir` nu se schimbă.  
3. **Creatura nu se simte** — nu poți fi lovit pentru că ai pus-o într-un rând plin de blocuri; ține-o pe rândul liber *(y = -128)*.  
4. **Nu se oprește jocul** — `dacă vieti = 0` nu e într-un `repetă la nesfârșit`.  
5. **Jucătorul nu poate trece** — creatura umple tot rândul; las-o să patruleze, nu s-o blochezi.  
6. **`vieti` nu se resetează la steag** — `setează vieti la 3` lipsește.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | HP · pericol care lovește · pauză între lovituri · game over · evitabil |
| **Complet** | Minim + creaturi care apar în timp **sau** chase **sau** doar pe o zonă |

---

## Bonus
- [ ] Sabie temporară (schiță) care oprește mob-ul 1 lovitură  
- [ ] Noapte: fundal întunecat + apar mai des  

## Recapitulare rapidă
1. Viață + pauză între lovituri  
2. Pericol evitabil  
3. L7 = craft ca să fii mai puternic

## Schema pe scurt

**HP**  
steag → `vieti = 3` · lovitură → `vieti −1` + `așteaptă 1` · `vieti = 0` → Sfârșitul jocului  

**Mob (Complet)**  
`forever` → apropie-te de Erou · la atingere lovește  

**Quiz scurt:**  
- De ce `așteaptă` după lovitură?  
- Unde e `vieti`?  
- Ce craft te-ar ajuta la L7?

## Temă
Opțional: creatura apare doar în peșteră. Urmează L7 = **crafting**.
