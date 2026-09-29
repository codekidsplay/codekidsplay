# Lecția 6 — Creatură / pericol + HP
**Modulul 6 · Lume de cuburi · Block 2 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui același proiect.  
> Azi: **creatură / pericol** (clone sau mob) + **HP** pe erou — trebuie să supraviețuiești.

---

## Obiectiv
**Minimum:** variabilă `vieti` (sau `hp`) pe Scenă · ≥1 creatură / pericol care lovește · feedback la lovitură · la 0 → Sfârșitul jocului · poți evita / fugi.  
**Complet:** Minim + spawn pe timp / „noapte” **sau** creatură care se apropie de erou **sau** creatură doar într-o zonă (peșteră).

## De ce contează
Fără pericol, lumea e sandbox fără tensiune.  
HP + mob pregătesc misiunea „învinge / supraviețuiește” (L8) și craftul de armă (L7).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Pericol = lavă statică **sau** mob care vine |
| 12–25 | HP pe foaie + unde spawn |
| 25–100 | Construiești (Minim → Complet) |
| 100–120 | Test: colegul pierde o viață pe bune |

---

## Pas cu pas

### 1) HP pe Scenă
1. `vieti` pe Scenă (ex. start 3)  
2. Steag: `setează vieti la 3`  
3. `dacă vieti = 0` → mesaj Sfârșitul jocului · `oprește toate` / înapoi meniu (meniul e L9)

**Încearcă tu (8 min)**  
- [ ] HP vizibil · reset la steag  

### 2) Pericol *(Minim — alege tipul)*
**A — Lavă / spike static:** atingere → `schimbă vieti cu -1` + knockback / `du-te la` safe + `așteaptă` scurt (invulnerabilitate 1s)  
**B — Mob / clonă:** se mișcă; la atingere același −1 HP  

**Încearcă tu (30 min)**  
- [ ] Pierzi HP o dată, nu de 20 ori pe secundă (cooldown!)  
- [ ] La 0 → final clar  

### 3) Complet
Alege **cel puțin una**:  
- [ ] Spawn la interval (`așteaptă` + `creează clonă`)  
- [ ] Mob: `îndreaptă-te spre Erou` / pași spre erou  
- [ ] Doar în zona 2 (peșteră / noapte)  

---

## Greșeli frecvente
1. **−1 HP în forever fără pauză** — mori instant. Pune `așteaptă` după lovitură.  
2. **HP pe Erou, invizibil** — pe Scenă.  
3. **Creatură fără reset** — steagul trebuie să curețe clonele.  
4. **Prea multe clone** — limitează spawn-ul.  
5. **Nu poți evita** — Minim cere să poți fugi / ocoli.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | HP · pericol care lovește · cooldown · game over · evitabil |
| **Complet** | Minim + spawn timp **sau** chase **sau** doar pe o zonă |

---

## Bonus
- [ ] Sabie temporară (schiță) care oprește mob-ul 1 lovitură  
- [ ] Noapte: fundal întunecat + spawn mai des  

## Recapitulare rapidă
1. HP + cooldown  
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
Cooldownă creatură doar în peșteră. Urmează L7 = **crafting**.
