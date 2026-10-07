# Lecția 6 — Set de piese de șah
**Modulul 3 · Creativ și mecanic**  
**Code Maker Club · Motion Maker**  
**Vârstă:** ~8–10 ani

> Azi faci un **set**: piese diferite, dar care par să fie din aceeași familie — au aceeași bază.  
> Proiect: **„Șahul meu”** · `Prenume_Nume_T3_L06`  
> *Nu facem tot setul complet de șah: 2–3 piese sunt suficiente.*

---

## Obiectiv
La finalul orei ai **cel puțin 2 piese de șah** pe baze identice, care se recunosc.  
**Minim:** bază **Ø30 × 4** (aceeași la toate) · **pion**: gât **Ø14 × 18** + cap sferă **Ø16** · **turn**: corp **Ø18 × 34** + coroană **Ø24 × 8** cu creneluri tăiate în cruce · piesele stau în rând, la **40 mm** una de alta.  
**Complet:** Minim + **nebun** (con **Ø18 × 32** + cap sferic cu crestătură) + o copie a pionului în altă culoare (alb și negru).

## De ce contează
Un **set** are reguli comune: aceeași bază, aceleași proporții. Așa vezi imediat că piesele sunt din aceeași familie.  
Copiezi baza o dată, apoi construiești fiecare piesă pe ea.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 · privim piese de șah: ce au în comun? |
| 10–30 | Pas cu pas: baza și copierea ei |
| 30–100 | Pion · turn · (Complet) nebun și culori → Bonus |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Cylinder** · **Sphere** · **Cone** · **Box** · **Hole** · **Align** (**L**) · mărimi cu numere · **Ctrl+D** (repetă și rotirea) · **conul negru** · **Ctrl+G** · **Color**

---

## Pas cu pas

### 1) Proiect nou și baza
1. **Create new design** · nume `Prenume_Nume_T3_L06`  
2. Snap Grid: **1.0 mm**  
3. **Cylinder** → **30 · 30 · 4** *(baza)*  
4. **Ctrl+D** de două ori, mutând copiile pe rând, la **40 mm** una de alta (Snap Grid **5.0 mm**, 8 sărituri) — 3 baze identice  
*Atenție la **Align**: mută **ambele** piese spre mijlocul lor. Ca baza să rămână pe loc, trage forma nouă **peste** baza ei înainte de **L**.*

### 2) Pionul
1. Snap Grid înapoi pe **1.0 mm** (pentru înălțimi)  
2. **Cylinder** → **14 · 14 · 18** *(gâtul)* → **L** cu prima bază → mijloc pe cele două direcții de pe plan  
3. **Sphere** → **16 · 16 · 16** *(capul)* → **L** cu prima bază (nu cu gâtul) → mijloc pe cele două direcții de pe plan  
4. Ridici sfera cu conul negru la **14 mm** — capul se așază pe vârful gâtului  
5. Din **Front**: baza, gâtul, capul — o siluetă clară de pion  
6. Selectezi baza, gâtul și capul (Shift+click) → **Ctrl+G**

### 3) Turnul
1. **Cylinder** → **18 · 18 · 34** *(corpul)* → **L** cu a doua bază → mijloc pe cele două direcții de pe plan  
2. **Cylinder** → **24 · 24 · 8** *(coroana)* → **L** cu a doua bază → mijloc pe cele două direcții → ridici la **30 mm**  
3. **Box** → **6 · 28 · 8** → **Hole** *(un crenel)* → **L** cu a doua bază: mijloc pe cele două direcții; apoi **L** cu coroana: punctul de **sus**  
4. Îl ridici cu conul negru cu **2 mm** — taie 6 mm adâncime în coroană  
5. **Ctrl+D** → rotești copia **90°** (4 pași de 22,5°) → crenelurile în cruce  
6. Selectezi baza, corpul, coroana și cele două Hole-uri (Shift+click) → **Ctrl+G**  
7. Din **Top**: coroana are 4 creneluri; din **Front**: turnul e mai înalt decât pionul

### 4) Complet — nebunul
1. **Cone** → **18 · 18 · 32** → **L** cu a treia bază → mijloc pe cele două direcții de pe plan  
2. **Sphere** → **12 · 12 · 12** → **L** cu a treia bază (mijloc, două direcții), ridicat la **28 mm** *(capul)*  
3. **Box** → **2 · 20 · 8** → **Hole** *(crestătura)* → **L** cu a treia bază (mijloc, două direcții), ridicat la **34 mm**, rotit **45°**  
4. Selectezi baza, conul, capul și crestătura → **Ctrl+G**  
5. Din **Front**: nebunul e cel mai înalt (**40 mm**), turnul are 38 mm, pionul 30 mm

### 5) Complet — alb și negru
1. Snap Grid **5.0 mm** → pionul → **Ctrl+D** → muți copia la **120 mm** de prima bază (după nebun, 8 sărituri după a treia bază)  
2. **Color**: pionul original alb (sau deschis), copia neagră (sau închis)  
3. La fel poți colora turnul

---

## Greșeli frecvente
1. **Piesele nu au aceeași bază** — ai făcut baze de mărimi diferite. Copiază **aceeași** bază, nu face una nouă.  
2. **Capul plutește** — n-ai ridicat sfera la 14 mm; din **Front** trebuie să atingă gâtul.  
3. **Crenelurile nu taie** — Hole-urile n-au fost grupate cu turnul.  
4. **Crenelurile taie prea adânc** — Hole-ul e prea jos; ridică-l cu conul negru.  
5. **Am grupat toate piesele** — Ungroup: fiecare piesă se grupează **singură**, cu baza ei.  
6. **Nebunul e prea scund** — conul 32 mm + capul = 40 mm; verifică din Front că e cel mai înalt.  
7. **Piesele se ating** — păstrează 40 mm între baze (baza are Ø30).

---

## De făcut azi — „Șahul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Pion + turn pe baze Ø30×4 identice, la 40 mm · crenelurile tăiate în cruce |
| **Complet** | + nebun + pion în altă culoare |

### Pasul 1 — Minim
- [ ] 3 baze **30·30·4**, la 40 mm distanță  
- [ ] Pion: gât **14·14·18** + cap **16** · **Ctrl+G**  
- [ ] Turn: corp **18·18·34** + coroană **24·24·8** + 2 creneluri Hole · **Ctrl+G**  
- [ ] Din **Front**: siluete clare  

### Pasul 2 — Complet
- [ ] Nebun: con **18·18·32** + cap **12** + crestătură 45°  
- [ ] Pion copiat în altă culoare  
- [ ] **Color** · numele `T3_L06` e corect  

---

## Bonus (extra — după Complet)
- [ ] O **regină**: corp mai înalt + coroană cu 5 sfere mici (Ctrl+D)  
- [ ] Un **cal** simplu din cilindri și un Box înclinat  
- [ ] O tablă de șah mică: 4×4 pătrate (Ctrl+D + aceeași mutare)

## Recapitulare rapidă
1. Un set are **bază comună**  
2. Fiecare piesă se grupează **cu propria bază**  
3. Hole-urile se grupează **doar** cu piesa pe care o taie  
4. Din **Front** compari înălțimile

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** baza 30·30·4 (×3, 40 mm) → pion = gât 14·18 + cap Ø16 (+14) · turn = corp 18·34 + coroană 24·8 (+30) − 2 creneluri 6·28·8 (+2, 90°)  
**Complet:** + nebun (con 18·32 + cap Ø12 + crestătură 45°) · alb/negru

**Quiz scurt:**  
- De ce toate piesele au aceeași bază?  
- Cum faci crenelurile turnului?  
- Care piesă e cea mai înaltă? *(Minim: turnul, 38 mm; cu nebun: nebunul, 40 mm)*

## Temă
Opțional: desenezi pe foaie un **cal** cu mărimi (bază Ø30). Din ce forme simple îl poți face?
