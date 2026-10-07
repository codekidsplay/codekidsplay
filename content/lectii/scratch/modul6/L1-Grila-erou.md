# Lecția 1 — Punte M5 + mișcare pe grilă
**Modulul 6 · Lume de cuburi · Block 1 · Fir L1→L10**  
**Code Maker Club · Cube Crafter**

> Nu e Minecraft oficial — proiect **CKP**.  
> Azi: **punte din M5** + eroul se mișcă **pătrat cu pătrat** (ex. 32×32), nu fluid ca în platformer.  
> Fișier pe tot modulul: `Prenume_Nume_M6_LumeCuburi`

---

## Obiectiv
La finalul orei eroul e pe o lume-grilă, pașii sunt **egali**, restart curat.  
**Minim:** recap M5 bifată · erou pe 4 direcții cu pași de **32** (sau 40, dar **fix**) · ≥**12** blocuri pe scenă · steag = start.  
**Ținta orei (Complet):** Minim + grilă vizibilă **sau** aliniere perfectă pe celule + vedere aleasă (sus/lateral) notată pe foaie.

## De ce contează
**Pe scurt:** *grilă* = lumea e împărțită în pătrățele egale (celule), ca o foaie cu pătrățele. Eroul și blocurile stau fix în aceste pătrățele.  
În M5 ai săritură fluidă. Aici lumea e din **celule** — ca să spargi și să pui blocuri drepte la L2–L3.  
Fără grilă azi, mâine blocurile „plutesc” strâmb.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–20 | **Punte M5:** variabile, detectare, clone, liste (pe foaie) |
| 20–35 | Ce e „lume de cuburi” 2D + schiță vedere + pas 32 |
| 35–100 | Lume pe grilă pe Scratch (vezi **Minim vs Complet**) |
| 100–120 | Demo + ce urmează la L2 (sparge) |

**Capitole:**  
<span style="color:#4C97FF;font-weight:700">Mișcare</span> (`schimbă x/y cu 32`) · <span style="color:#E6A800;font-weight:700">Evenimente</span> · <span style="color:#FFAB19;font-weight:700">Control</span> · <span style="color:#5CB1D6;font-weight:700">Detectare</span>

---

## Pas cu pas

### 1) Punte — ce trebuie din M5 *(obligatoriu · 10 minute)*
Bifezi pe foaie ce știi deja:
- [ ] O variabilă pe **Scenă** *(vizibilă pe ecran)*  
- [ ] `dacă` + detectare *(atingere / tastă)*  
- [ ] Ce e o **clonă** *(o copie a unui sprite, creată de program)*  
- [ ] Ce e o **listă** *(rând de cutii cu nume — detaliu la L4)*  
- [ ] Steagul verde = pornire curată  

Dacă ceva lipsește, recuperezi 10–15 minute **înainte** de grilă.

### 2) Ideea *(5 minute, pe foaie)*
Lumea e o **grilă** de pătrate de **32 × 32** pași. Eroul nu merge fluid: la fiecare apăsare **sare o celulă**. De aceea toate pozițiile sunt multipli de 32: −224, −192, … 0, 32, … 224 pe orizontală, −160 … 160 pe verticală.

**Încearcă tu — pe foaie (5 min):** câte celule încap pe lățime? *(480 ÷ 32 = 15)* Pe înălțime? *(360 ÷ 32 = 11,25 → 11 rânduri întregi)*

### 3) Eroul pe grilă *(Minim, partea 1 · 15 minute)*
1. Proiect nou → `Prenume_Nume_M6_LumeCuburi`  
2. Eroul `Erou`: un pătrat de aproximativ **28 × 28** *(puțin mai mic decât celula)*  
3. Pe steag: `du-te la x: 0 y: -160` · `treci în față`  
4. Patru scripturi separate:  
   - `când se apasă tasta săgeată dreapta` → `dacă <x poziția < 224>` → `schimbă x cu 32`  
   - `când se apasă tasta săgeată stânga` → `dacă <x poziția > -224>` → `schimbă x cu -32`  
   - `când se apasă tasta săgeată sus` → `dacă <y poziția < 160>` → `schimbă y cu 32`  
   - `când se apasă tasta săgeată jos` → `dacă <y poziția > -160>` → `schimbă y cu -32`

**Verifici:** fiecare apăsare te mută exact o celulă. Nu poți ieși din ecran. Steagul te readuce la `0, -160`.

### 4) Blocurile lumii *(Minim, partea 2 · 25 minute)*
Un sprite nou `Bloc`, un pătrat de **32 × 32** cu **două costume**: 1 = maro *(lemn)* și 2 = gri *(piatră)*. Variabile *(pentru toate sprite-urile)*: `cx` și `cy`.

Pe steag, la `Bloc`:
1. `ascunde`  
2. `setează cx la -224`  
3. `repetă 15` *(coloanele)*:  
   - `setează cy la 160`  
   - `repetă 9` *(rândurile)*:  
     - `du-te la x: cx y: cy`  
     - `treci la costumul (număr aleatoriu între 1 și 2)`  
     - `creează o clonă a mea`  
     - `schimbă cy cu -32`  
   - `schimbă cx cu 32`  
4. `când încep ca o clonă` → `arată`

**Verifici:** pe ecran apare un câmp de 15 × 9 blocuri, în două culori. Jos rămân **două rânduri libere**, unde stă eroul. *(Sunt 135 de clone — e normal.)*

### 5) Blocurile nu se traversează *(Minim, partea 3 · 10 minute)*
În fiecare din cele patru scripturi de mers, **după** `schimbă x/y`, adaugi:  
`dacă <atinge Bloc?>` → mișcarea inversă *(`schimbă x cu -32` după dreapta, etc.)*

**Verifici:** poți merge pe rândurile libere, dar nu poți intra într-un bloc *(vei sparge blocuri la L2)*. Steagul de două ori dă aceeași lume și același start.

### 6) Complet *(alege cel puțin una)*
- [ ] **Grilă vizibilă:** costumele blocurilor au o margine neagră subțire  
- [ ] **Notă pe foaie:** „La L2 voi sparge blocurile cu click pe clone”  
- [ ] **Vedere aleasă** *(de sus)* scrisă pe foaie, pe care o păstrezi tot modulul


---

## Greșeli frecvente
1. **Pași inegali** *(10 pe x, 32 pe y)* — blocurile nu se mai aliniază la L3. Folosește mereu 32.  
2. **Eroul trece prin blocuri** — lipsește `dacă <atinge Bloc?>` sau mișcarea inversă.  
3. **Eroul e prea mare** *(32 × 32)* — atinge blocurile vecine și nu se mai poate mișca. Fă-l 28 × 28.  
4. **Blocurile sunt unul peste altul** — `schimbă cy cu -32` e în afara buclei interioare.  
5. **Clonele nu apar** — lipsește `când încep ca o clonă → arată`.  
6. **La steag apar blocuri în plus** — la fiecare steag se șterg clonele vechi automat; dacă nu, apasă oprire și steag.

---

## De făcut azi — „Lumea pe grilă”
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Punte M5 · pași 32 pe 4 direcții · ≥12 blocuri · restart |
| **Complet** | Minim + grilă vizibilă **sau** margini **sau** notă clone L2 |

### Pasul 1 — Punte + foaie
- [ ] Recap · vedere · pas 32  

### Pasul 2 — Minim
- [ ] Erou pe grilă · demo coleg  

### Pasul 3 — Complet
- [ ] Una din variante  

---

## Bonus
- [ ] Grilă 12×10 celule  
- [ ] Camera urmează eroul (blocuri/fundal opus) — doar dacă Minim e solid  

## Recapitulare rapidă
1. Cuburi = **celule**, nu platformer fluid  
2. Pas fix (32) tot modulul  
3. Același fișier până la L10

## Schema pe scurt *(pe foaie)*

**Erou**  
steag → `du-te la` start (multiplu de 32) → `forever` → `dacă` săgeți → `schimbă x/y cu 32`  

**Punte M5**  
variabile · `dacă` · clone (idee) · restart  

**Quiz scurt:**  
- De ce 32, nu 10?  
- Ce e diferit față de săritura din M5?  
- Ce fișier continui la L2?

## Temă
Opțional: încă 4 blocuri pe hartă. Urmează L2 = **sparge**.
