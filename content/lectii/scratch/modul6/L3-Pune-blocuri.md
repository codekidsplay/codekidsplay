# Lecția 3 — Pune blocuri (construcție)
**Modulul 6 · Lume de cuburi · Block 1 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui același proiect.  
> Azi: dacă ai resursă **> 0**, **pui** un bloc pe grilă (snap 32) lângă erou.

---

## Obiectiv
**Minimum:** tasta **E** (sau `C`) pune bloc · doar cu resursă ≥1 · **snap** pe 32 · **rază** ca la minat · consumă 1 din inventar · poți construi un **adăpost** mic (≥4 blocuri puse).  
**Complet:** Minim + nu pui peste erou / peste alt bloc **sau** selectare tip 1/2 **sau** indicator „activ: lemn”.

## De ce contează
Sparge fără pune = doar „farm”.  
Snap-ul face lumea să arate a cuburi, nu a haos.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Snap pe tablă: formula 32 |
| 15–30 | Controale: stânga=sparge · E=pune |
| 30–100 | Construiești (Minim → Complet) |
| 100–120 | Adăpost demo + salvare |

**Pe tablă — snap (rețetă, nu „matematică grea”):**  
`x_grilă = rotunjește(poziție_mouse_x / 32) × 32`  
`y_grilă = rotunjește(poziție_mouse_y / 32) × 32`  
*(Sau: poziție față de erou, tot multiplu de 32.)*

---

## Pas cu pas

### 1) Controale fixe
| Acțiune | Control Minim |
|---------|----------------|
| Sparge | clic stânga |
| Pune | tasta **E** (sau `C`) |
| (Bonus) | clic dreapta = pune |

**Încearcă tu (2 min)**  
- [ ] Scris pe foaie / pe scenă în instrucțiuni scurte  

### 2) Logică pune *(Minim)*
1. Când E e apăsată (sau eveniment echivalent):  
2. Calculezi celula țintă (snap 32)  
3. `dacă` distanța până la Erou < 100  
4. `dacă lemn > 0` (sau tipul activ) → creezi bloc / clonă la `x_grilă, y_grilă` → `schimbă lemn cu -1`  
5. Altfel: `spune` „Nu ai destule!” 1s  

**Încearcă tu — pune (30 min)**  
- [ ] Cu 0 resurse: **nu** apare bloc  
- [ ] Cu resurse: apare **aliniat** pe grilă  
- [ ] Rază respectată  

### 3) Adăpost
Construiești vizibil ≥**4** blocuri puse de tine (nu doar cele din L1).

**Încearcă tu — adăpost (15 min)**  
- [ ] Se vede un „zid” / căsuță mică  

### 4) Complet
Alege **cel puțin una**:  
- [ ] Nu pui pe celula eroului / pe bloc existent  
- [ ] Taste **1/2** selectează tipul de pus  
- [ ] Indicator pe scenă: tipul activ  

---

## Greșeli frecvente
1. **Fără snap** — blocuri pe jumătăți de celulă.  
2. **Pui fără să scazi inventarul** — resurse infinite.  
3. **Același click pentru sparge și pune** — se calcă.  
4. **Fără rază** — construiești peste tot ecranul.  
5. **Clic dreapta ca Minim** — pe unele PC-uri nu merge; E e Minim.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | E=pune · snap · rază · consum · adăpost ≥4 |
| **Complet** | Minim + anti-overlap **sau** selectare tip **sau** indicator |

---

## Bonus
- [ ] Clic dreapta = pune (pe lângă E)  
- [ ] Ștergi un bloc pus greșit (re-sparge)

## Recapitulare rapidă
1. Snap 32 = cuburi drepte  
2. E = pune · clic = sparge  
3. Resursă 0 = nu construiești

## Schema pe scurt

**Pune**  
tasta E → snap x/y → `dacă distanță < 100` → `dacă lemn > 0` → clonă la grilă → `lemn −1`  

**Quiz scurt:**  
- Ce face `rotunjește(…/32)×32`?  
- De ce E, nu același click?  
- Ce urmează la L4?

## Temă
Selectare tip 1/2 dacă lipsește. Urmează L4 = **inventar**.
