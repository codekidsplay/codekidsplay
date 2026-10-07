# Lecția 9 — O atracție: carusel (sau roată)
**Modulul 3 · Creativ și mecanic**  
**Code Maker Club · Motion Maker**  
**Vârstă:** ~8–10 ani

> Azi construiești **un singur** mecanism de atracție: un **carusel** care se poate roti pe stâlpul lui.  
> Proiect: **„Caruselul meu”** · `Prenume_Nume_T3_L09`  
> *Parcul întreg și orașul vin în Modulul 4, nu azi.*

---

## Obiectiv
La finalul orei ai un carusel din **două piese**: **baza cu stâlp central** și **rotorul** (platformă, 8 stâlpi cu scaun, acoperiș) pus pe stâlp.  
**Minim:** bază **Ø100 × 4** + stâlp **Ø12 × 60** + capac **Ø18 × 3** · rotor: platformă **Ø80 × 4**, 8 stâlpi **Ø4 × 36** la raza **30**, fiecare cu **scaun 10 × 10 × 3**, acoperiș **con Ø90 × 14**, gaură centrală **Ø13** · rotorul stă pe stâlp la **8 mm** de bază, nelipit.  
**Complet:** Minim + un **steag** pe vârf + culori + **Ruler** (gaura 13, stâlpul 12).

## De ce contează
Același principiu ca la morișcă: **piesa care se rotește** (rotorul) are o gaură **mai mare** decât stâlpul pe care stă.  
Repetarea stâlpilor în cerc o faci cu **Ctrl+D + rotire**, ca la morișcă și la roata dințată.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8 · ce se rotește la un carusel și ce stă pe loc? |
| 10–35 | Pas cu pas: baza și stâlpul |
| 35–95 | Rotorul: platformă · stâlpi cu scaun în cerc · acoperiș · gaură → Minim → Complet → Bonus |
| 95–120 | Recap, quiz, galerie |

**Unelte azi:** **Cylinder** · **Box** · **Cone** · **Hole** · **Align** (**L**) · **Snap Grid 1 / 5 mm** · **Ctrl+D** (repetă și rotirea) · **conul negru** · **Ctrl+G** · **View Cube** · **Ruler**

---

## Pas cu pas

### 1) Proiect nou, baza și stâlpul
1. **Create new design** · nume `Prenume_Nume_T3_L09`  
2. Snap Grid: **1.0 mm**  
3. **Cylinder** → **100 · 100 · 4** *(baza)*  
4. **Cylinder** → **12 · 12 · 60** *(stâlpul)* → **L** cu baza → mijloc pe cele două direcții de pe plan  
5. **Cylinder** → **18 · 18 · 3** *(capacul)* → îl tragi peste stâlp; selectezi **capacul, stâlpul și baza** → **L** → mijloc pe cele două direcții de pe plan; apoi **capacul și stâlpul** → **L** → punctul de **sus**  
   *(capacul e mai lat decât stâlpul — de aceea îl aliniem odată cu baza, ca stâlpul să rămână în centru)*  
6. Selectezi baza, stâlpul și capacul → **Ctrl+G** — baza cu stâlp  
7. Muți grupul **150 mm** deoparte (rotorul se face separat, lângă el)

### 2) Platforma
1. **Cylinder** → **80 · 80 · 4** *(platforma rotorului)*  
2. Snap Grid rămâne **1.0 mm** (pentru înălțimi)

### 3) Un stâlp cu scaun
1. **Cylinder** → **4 · 4 · 36** *(stâlpul)* și **Box** → **10 · 10 · 3** *(scaunul)* — le tragi peste platformă  
2. Selectezi **platforma, stâlpul și scaunul** → **L** → mijloc pe cele două direcții de pe plan — toate trei sunt în centru  
3. Ridici scaunul la **10 mm** (conul negru)  
4. Selectezi stâlpul și scaunul → **Ctrl+G** — un „stâlp cu scaun”  
5. Snap Grid: **5.0 mm** → muți stâlpul cu scaun **30 mm** spre dreapta (6 sărituri) — la raza 30

### 4) Al doilea stâlp, de partea opusă
1. **Ctrl+D** pe stâlpul cu scaun → muți copia **60 mm** spre stânga (12 sărituri)  
2. Selectezi cei **doi** stâlpi cu scaun → **Ctrl+G** — o „bară”, centrată pe platformă

### 5) Cei 8 stâlpi
1. Selectezi bara → **Ctrl+D** → rotești copia **45°** (2 pași de câte 22,5°)  
2. **Ctrl+D** → repetă rotirea; **Ctrl+D** încă o dată  
3. Din **Top**: 4 bare = **8 stâlpi** egal depărtați, în cerc  
4. Fiecare scaun e la fel de sus; platforma e centrată

### 6) Acoperișul
1. **Cone** → **90 · 90 · 14** → îl tragi peste platformă  
2. Selectezi **conul, platforma și cele 4 bare** → **L** → mijloc pe cele două direcții de pe plan *(toate împreună, ca să rămână centrate)*  
3. Selectezi doar conul → ridici cu conul negru la **35 mm** (7 sărituri) — stă pe vârful stâlpilor  
4. Din **Front**: stâlpii ating acoperișul

### 7) Gaura centrală și Group
1. **Cylinder** → **13 · 13 · 70** → **Hole**  
2. Îl tragi peste platformă → **L** cu platforma → mijloc **doar** pe cele două direcții de pe plan *(gaura de 70 mm pornește de la plan și trece prin platformă și acoperiș — nu o aliniezi pe înălțime)*  
3. Selectezi platforma, cele 4 bare, acoperișul și gaura (Shift+click) → **Ctrl+G** — rotorul  
4. Gaura Ø13 e mai mare decât stâlpul Ø12: **0,5 mm joc pe parte**

### 8) Rotorul pe stâlp
1. Selectezi rotorul și baza cu stâlp → **L** → mijloc pe cele două direcții de pe plan  
2. Apeși **D**, apoi Snap Grid: **1.0 mm** → ridici rotorul cu conul negru la **8 mm**  
3. **Front**: stâlpul trece prin rotor, rotorul stă între bază și capac, **nelipit**

### 9) Complet — steag, culori, Ruler
1. **Cylinder** **2 · 2 · 15** → îl tragi peste baza cu stâlp → **L** cu baza cu stâlp: mijloc pe cele două direcții → îl ridici la **58 mm** (se înfige 2 mm în capac)  
   **Box** **10 · 1,5 · 6** → **L** cu cilindrul steagului: mijloc pe adâncime, punctul de **sus** și marginea din **stânga** — panoul pleacă spre dreapta de la vârf  
   Selectezi cilindrul, panoul și baza cu stâlp → **Ctrl+G** *(rotorul rămâne separat)*  
2. **Ruler**: gaura 13 mm față de stâlp 12 mm  
3. **Color**: acoperiș, scaune, platformă în culori diferite

---

## Greșeli frecvente
1. **Stâlpii nu sunt în cerc** — bara nu e centrată pe platformă. Aliniază stâlpul cu platforma înainte de a-l muta.  
2. **Rotorul s-a lipit de stâlp** — Group cu baza. Rotorul rămâne separat.  
3. **Scaunele sunt la înălțimi diferite** — fiecare scaun a fost ridicat separat. Ridică-l **o dată** (10 mm), înainte de Ctrl+D.  
4. **Acoperișul nu atinge stâlpii** — ridică-l la 35 mm.  
5. **Gaura nu trece prin acoperiș** — nu e destul de înaltă (70 mm) sau ai ridicat-o de la plan.  
6. **Rotorul atinge baza** — ridică-l la 8 mm.  
7. **Am dat Ctrl+A** — a prins și baza. Selectează cu Shift+click.

---

## De făcut azi — „Caruselul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Bază Ø100×4 + stâlp Ø12×60 + capac · rotor cu platformă Ø80, 8 stâlpi cu scaun la raza 30, acoperiș con, gaură Ø13 · rotor separat, la 8 mm |
| **Complet** | + steag + Ruler (13 și 12) + culori |

### Pasul 1 — Minim
- [ ] Baza cu stâlp și capac (Group)  
- [ ] Platformă **80·80·4** · stâlp cu scaun (scaun la 10 mm) la 30 mm de centru  
- [ ] 8 stâlpi (Ctrl+D + rotire 45°)  
- [ ] Acoperiș con **90·90·14** la 35 mm  
- [ ] Gaură **13·13·70** · rotorul grupat  
- [ ] Rotorul pe stâlp, separat, la 8 mm  

### Pasul 2 — Complet
- [ ] Steag pe vârf  
- [ ] **Ruler**: 13 și 12  
- [ ] **Color** · numele `T3_L09` e corect  

---

## Bonus (extra — după Complet)
- [ ] **Roata mare (panoramică)**: un inel mare (Cylinder cu Hole) pe ax orizontal, cu 8 cabine mici (cuburi) la margine, copiate cu Ctrl+D + rotire  
- [ ] Un al doilea inel de stâlpi, mai aproape de centru (raza 15)  
- [ ] Lumini: sfere mici pe marginea acoperișului

## Recapitulare rapidă
1. Rotorul e piesa mobilă, stâlpul stă pe loc  
2. Stâlpii în cerc: o „bară” cu doi stâlpi + **Ctrl+D** + 45°  
3. Gaura rotorului **mai mare** decât stâlpul = joc  
4. Capacul împiedică rotorul să iasă

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** baza 100·100·4 + stâlp 12·12·60 + capac → Group · platformă 80·80·4 · stâlp 4·4·36 (30 mm) + scaun → ±30 mm → rotit 45° ×3 → con 90·90·14 (+35) − gaură 13·13·70 → Group → rotor (+8)  
**Complet:** steag · Ruler · culori

**Quiz scurt:**  
- Care piesă se rotește și care stă pe loc?  
- Câți stâlpi dau 4 bare rotite din 45° în 45°?  
- Ce împiedică rotorul să iasă de pe stâlp?

## Temă
Opțional: desenezi pe foaie un carusel cu **12** stâlpi. Cât ar fi pasul de rotire? *(360 ÷ 12)*
