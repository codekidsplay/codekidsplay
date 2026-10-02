# Lecția 8 — Fortăreața cu pod mobil
**Modulul 3 · Creativ și mecanic**  
**Code Kids Play · Motion Maker**  
**Vârstă:** ~8–10 ani

> Azi construiești o fortăreață și un **pod** care stă pe o **balama**: o piesă mică ce se poate roti pe un ax.  
> Proiect: **„Fortăreața mea”** · `Prenume_Nume_T3_L08`

---

## Obiectiv
La finalul orei ai o **fortăreață** (zid cu poartă și 2 turnuri, pe o placă) și un **pod** separat, prins pe un **ax** în dreptul porții, cu joc.  
**Minim:** placă **120 × 70 × 4** · zid **80 × 8 × 30** cu poartă **20 × 12 × 22** · 2 turnuri **Ø20 × 40** · ax **Ø4 × 24** · pod **18 × 24 × 2** cu butuc de balama **Ø10** și gaură **Ø5** · podul stă în dreptul porții, **separat** de fortăreață.  
**Complet:** Minim + **3 creneluri** tăiate în zid + Ruler (gaura 5, axul 4) + culori.

## De ce contează
O **balama** e o piesă care se rotește pe un **ax**. E același principiu ca la roțile mașinuței: gaura e mai mare decât axul.  
Axul e prins în zid; podul e separat și se poate roti pe el.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design. În Tinkercad podul rămâne într-o singură poziție; verifici că **are loc** să se rotească.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7 · cum se leagă un pod de o poartă? (schiță: ax, butuc, pod) |
| 10–45 | Pas cu pas: placa · zidul cu poartă · turnurile |
| 45–100 | Axul și podul · Minim → Complet → Bonus |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Box** · **Cylinder** · **Hole** · **Align** (**L**, inclusiv marginile) · mărimi cu numere · **rotire 90°** · tasta **D** · **conul negru** · **Ctrl+D** · **Ctrl+G** / **Ctrl+Shift+G** · **View Cube** (Right) · **Ruler** · **Color**

---

## Pas cu pas

### 1) Proiect nou și placa
1. **Create new design** · nume `Prenume_Nume_T3_L08`  
2. Snap Grid: **1.0 mm**  
3. **Box** → **120 · 70 · 4** *(placa)*

### 2) Zidul cu poartă
1. **Box** → **80 · 8 · 30** *(zidul)*  
2. **Box** → **20 · 12 · 22** → **Hole** *(poarta)*  
3. Selectezi poarta și zidul → **L** → mijloc pe cele două direcții de pe plan și punctul de **jos**  
4. **Ctrl+G** — zid cu deschidere (poarta e mai groasă decât zidul, deci taie complet)

### 3) Turnurile
1. **Cylinder** → **20 · 20 · 40**  
2. Selectezi turnul și zidul → **L** → marginea din **stânga** și mijloc pe adâncime  
3. **Ctrl+D** → copia; selectezi copia și zidul → **L** → marginea din **dreapta**  
4. Selectezi zidul și cele două turnuri → **Ctrl+G** — fortul

### 4) Fortul pe placă
1. Selectezi fortul și placa → **L** → mijloc pe cele două direcții de pe plan  
2. **Ctrl+G** — fortăreață cu podea (placa se vede prin poartă)

### 5) Axul, butucul și podul (le facem lângă fort, apoi le mutăm)
*Atenție la **Align**: mută **ambele** piese spre mijlocul lor. De aceea facem balamaua întâi separat, o grupăm temporar și abia apoi o aducem la poartă.*  
1. **Cylinder** → **4 · 4 · 24** *(axul)* → îl rotești **90°** (4 pași de 22,5°) până când, din **View Cube → Right**, se vede ca un **cerc**  
2. **Cylinder** → **10 · 10 · 18** *(butucul)*, rotit **90°** la fel  
3. **Cylinder** → **5 · 5 · 22** → **Hole**, rotit la fel  
4. Tragi butucul și gaura **peste** ax; selectezi **butucul, gaura și axul** → **L** → mijloc pe cele **trei** direcții — toate trei au același centru  
5. Selectezi **doar butucul și gaura** → **Ctrl+G** — butuc cu gaură; axul rămâne separat și trece prin gaură, cu **0,5 mm** joc pe parte *(gaura 5, axul 4)*

### 6) Podul
1. Selectezi **butucul și axul** → **Ctrl+G** *(temporar)* → **D** (stau pe plan)  
2. **Box** → **18 · 24 · 2** *(podul)* → îl tragi **în fața** butucului  
3. Selectezi podul și grupul temporar → **L** → mijloc pe direcția stânga–dreapta, punctul de **jos** și punctul din **spate** — podul pornește de la butuc și iese **în față**  
4. Selectezi grupul temporar → **Ctrl+Shift+G** (butucul și axul sunt din nou separate)  
5. Selectezi **podul și butucul** → **Ctrl+G** — podul cu balama *(axul nu e în el)*  
6. Podul (2 mm) stă mai jos decât gaura (care începe la 2,5 mm de jos), deci nu atinge axul

### 7) Balama pe poartă
1. Selectezi **axul** și **podul cu balama** → **Ctrl+G** *(temporar)*  
2. Selectezi grupul temporar și fortăreața → **L** → mijloc pe direcția stânga–dreapta și pe adâncime  
3. Snap Grid **1.0** → grupul temporar îl muți **7 mm** spre față *(podul iese în față, deci centrul grupului nu e pe ax — mutarea pune axul în mijlocul porții)*  
4. Îl ridici cu **conul negru** cu **4 mm** — podul stă pe podeaua porții, axul e la **9 mm** de plan  
5. **Ctrl+Shift+G** pe grupul temporar — ax și pod sunt din nou separate

### 8) Verificare
1. View Cube → **Right**: axul (cerc mic) în gaura butucului  
2. **Top**: axul trece prin poartă, cu **2 mm** în fiecare perete lateral al ei; podul stă în dreptul porții  
3. Selectezi **axul** și fortăreața → **Ctrl+G** *(axul se prinde de ea)*  
4. Click pe pod: se selectează singur — e **separat**

### 9) Complet — creneluri, Ruler, culori
1. **Box** → **6 · 12 · 8** → **Hole** → **L** cu fortăreața: mijloc pe cele două direcții (zidul e în mijlocul plăcii) → Snap Grid **5.0** → ridici cu conul negru la **25 mm**  
2. **Ctrl+D** → muți copia **10 mm** spre dreapta  
   Selectezi crenelul din centru → **Ctrl+D** → muți copia **10 mm** spre stânga  
3. Selectezi cele 3 creneluri și fortăreața → **Ctrl+G**  
4. **Ruler**: gaura butucului (5 mm) față de ax (4 mm)  
5. **Color**: zid, turnuri, pod în culori diferite

---

## Greșeli frecvente
1. **Podul e lipit de fortăreață** — ai dat Group cu el. Podul rămâne separat.  
2. **Axul nu se vede din Right ca un cerc** — mai rotește 90° pe cealaltă săgeată curbă.  
3. **Axul nu trece prin butuc** — gaura e prea mică (nu 5 mm) sau butucul nu e aliniat cu axul (la pasul 5.4 selectezi toate trei).  
4. **Axul plutește în poartă** — e mai scurt decât 24 mm și nu atinge pereții laterali. Păstrează 24.  
5. **Podul intră în podea** — ai uitat să ridici grupul temporar cu 4 mm (axul trebuie să fie la 9 mm de plan).  
6. **Crenelurile taie turnurile** — le-ai pus prea aproape de capete. Păstrează mijlocul zidului.  
7. **Poarta nu taie zidul** — lipsește **Ctrl+G** sau poarta nu e Hole.

---

## De făcut azi — „Fortăreața mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Placă · zid 80·8·30 cu poartă · 2 turnuri Ø20×40 · ax Ø4×24 · pod 18·24·2 cu butuc Ø10 / gaură Ø5 · podul separat |
| **Complet** | + 3 creneluri + Ruler (5 și 4) + culori |

### Pasul 1 — Minim
- [ ] Placă **120·70·4**  
- [ ] Zid **80·8·30** + poartă **20·12·22** (Hole) → **Ctrl+G**  
- [ ] 2 turnuri **Ø20×40** la capetele zidului  
- [ ] Fortul pe placă (**Ctrl+G**)  
- [ ] Ax **Ø4×24** rotit 90°, prin poartă, la 9 mm de plan (2 mm în fiecare perete)  
- [ ] Butuc Ø10 cu gaură Ø5 + pod 18·24·2, grupate între ele, **separate** de fort și de ax  

### Pasul 2 — Complet
- [ ] 3 creneluri în zid  
- [ ] **Ruler**: 5 mm și 4 mm  
- [ ] **Color** · numele `T3_L08` e corect  

---

## Bonus (extra — după Complet)
- [ ] **Podul ridicat**: o copie a podului, rotită 90°, pusă lângă poartă, ca să vezi cum arată „închis”  
- [ ] Un **șanț** în fața porții: un Hole lung tăiat în placă  
- [ ] Alt turn la spate, mai înalt

## Recapitulare rapidă
1. Balama = **ax + butuc cu gaură mai mare**  
2. Axul se prinde de fort, podul rămâne **liber**  
3. Gaura butucului = ax **+ 1 mm**  
4. Din **Right** vezi dacă axul e în gaură

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** placă 120·70·4 · zid 80·8·30 − poartă 20·12·22 · 2 turnuri Ø20×40 → Group · ax Ø4×24 (la 9 mm) · butuc Ø10 − gaură Ø5 · pod 18·24·2  
**Complet:** + 3 creneluri · Ruler · culori

**Quiz scurt:**  
- De ce gaura butucului e mai mare decât axul?  
- Care piese sunt grupate cu fortăreața și care rămân libere?  
- Din ce vedere verifici că axul e în gaura butucului?

## Temă
Opțional: desenezi pe foaie un alt pod: un **ascensor** de castel care urcă pe un ax vertical. De ce piese ai nevoie?
