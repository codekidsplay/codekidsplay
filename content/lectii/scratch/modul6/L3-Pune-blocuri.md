# Lecția 3 — Pune blocuri (construcție)
**Modulul 6 · Lume de cuburi · Block 1 · Fir L1→L10**  
**Code Maker Club · Cube Crafter**

> Continui același proiect.  
> Azi: dacă ai resursă **> 0**, **pui** un bloc pe grilă (snap 32) lângă erou.

---

## Obiectiv
**Minim:** tasta **E** (sau `C`) pune bloc · doar cu resursă ≥1 · **celulă din fața eroului** *(multiplu de 32)* · consumă 1 din inventar · poți construi un **adăpost** mic (≥4 blocuri puse).  
**Complet:** Minim + nu pui peste erou / peste alt bloc **sau** selectare tip 1/2 **sau** indicator „activ: lemn”.

## De ce contează
Sparge fără pune = doar „farm”.  
Snap-ul face lumea să arate a cuburi, nu a haos.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Snap pe foaie: formula 32 |
| 15–30 | Controale: stânga=sparge · E=pune |
| 30–100 | Construiești (Minim → Complet) |
| 100–120 | Adăpost demo + salvare |

**Pe foaie — celula din față (rețetă, nu „matematică grea”):**  
`tx = x poziția eroului + (dx × 32)`  
`ty = y poziția eroului + (dy × 32)`  
*(Eroul stă pe grilă din L1, deci și blocul pus stă pe grilă.)*

---

## Pas cu pas

### 1) Controalele *(5 minute, pe foaie)*
| Acțiune | Control |
|---------|---------|
| Merge | săgeți |
| Sparge | click stânga pe bloc |
| Pune | tasta **E** — blocul din **fața** eroului |

„Fața” eroului = ultima direcție în care a mers. Pentru asta ținem minte direcția în două variabile: `dx` și `dy`.

**Încearcă tu — pe foaie (5 min):** după ce apeși **stânga**, `dx` = ? și `dy` = ? *(-1 și 0)*

### 2) Direcția eroului *(Minim, partea 1 · 10 minute)*
1. Variabile *(pentru toate sprite-urile)*: `dx`, `dy`, `tx`, `ty`  
2. La fiecare din cele patru scripturi de mers *(L1)* adaugi, la început: `setează dx la …` și `setează dy la …`:  
   dreapta *(1, 0)* · stânga *(-1, 0)* · sus *(0, 1)* · jos *(0, -1)*  
3. Pe steag: `setează dx la 0` și `setează dy la 1`

**Verifici:** bifezi `dx` și `dy` și vezi cum se schimbă la fiecare săgeată.

### 3) Mesajul „pune” *(Minim, partea 2 · 15 minute)*
La **Erou**:
- `când se apasă tasta e`  
- `setează tx la (x poziția + (dx * 32))`  
- `setează ty la (y poziția + (dy * 32))`  
- `dacă <lemn > 0>` **atunci** `trimite pune`  
- `altfel` `spune Nu ai lemn!` timp de `1` secundă

### 4) Blocul apare *(Minim, partea 3 · 15 minute)*
La **Bloc**, un script nou, **doar pentru originalul** care nu e clonă:
1. O variabilă `este_clona`, **numai pentru acest sprite**, pusă pe `0` pe steag *(în scriptul din L1, înainte de generator)*  
2. În `când încep ca o clonă`: `setează este_clona la 1` *(primul bloc)*  
3. Scriptul nou: `când primesc pune` → `dacă <este_clona = 0>` **atunci**:  
   - `du-te la x: tx y: ty` · `treci la costumul 1` · `arată`  
   - `creează o clonă a mea` · `ascunde`  
   - `schimbă lemn cu -1`

**Verifici (de fiecare dată):**  
- Cu `lemn = 0`: apeși E → „Nu ai lemn!”, nu apare nimic.  
- Cu `lemn ≥ 1`: apeși E → apare un bloc exact în celula din fața eroului, **aliniat pe grilă**; `lemn` scade cu 1.  
- Poți sparge blocul pus și lemnul revine.

### 5) Adăpostul *(Minim · 15 minute)*
Spargi 4–6 blocuri, apoi pui cel puțin **4 blocuri** *(un zid sau un colț)* într-un loc curat.

**Verifici:** se vede un zid făcut de tine, iar `lemn` a scăzut cu 4.

### 6) Complet *(alege cel puțin una)*
- [ ] **Nu pui peste alt bloc sau peste erou:** la `Bloc`, după `arată`, `dacă <nu <<atinge Bloc?> sau <atinge Erou?>>>` → `creează o clonă a mea` și `schimbă lemn cu -1`; apoi `ascunde` *(un sprite ascuns nu detectează atingerea, de aceea îl arătăm o clipă)*  
- [ ] **Limite:** nu pui în afara lumii *(`dacă <(abs din tx) < 225>` și `ty` între -160 și 160)*  
- [ ] **Indicator:** un text `Fața: …` pe scenă


---

## Greșeli frecvente
1. **Se pun blocuri de zeci de ori** — lipsește `dacă <este_clona = 0>`; fiecare clonă răspunde la `pune`.  
2. **Blocul pus e strâmb** — `tx` / `ty` nu sunt multipli de 32; verifică eroul *(x, y multipli de 32 din L1)*.  
3. **Pune oriunde** — `tx` / `ty` se calculează din direcția `dx` / `dy`; dacă n-ai setat direcția, e mereu aceeași celulă.  
4. **Lemnul scade chiar dacă nu apare blocul** — la Complet, scazi doar când `dacă nu atinge` e adevărat.  
5. **Blocul apare peste erou** — la Complet nu verifici `atinge Erou?`.  
6. **Nu poți construi un adăpost** — ai prea puțin lemn: sparge mai multe blocuri.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | E=pune · celula din față · consum · adăpost ≥4 |
| **Complet** | Minim + anti-overlap **sau** selectare tip **sau** indicator |

---

## Bonus
- [ ] Clic dreapta = pune (pe lângă E)  
- [ ] Ștergi un bloc pus greșit (re-sparge)

## Recapitulare rapidă
1. Pași de 32 = cuburi drepte  
2. E = pune · clic = sparge  
3. Resursă 0 = nu construiești

## Schema pe scurt

**Pune**  
tasta E → `tx`, `ty` (față de erou) → `dacă lemn > 0` → clonă la `tx`, `ty` → `lemn −1`  

**Quiz scurt:**  
- Ce fac `dx` și `dy`?  
- De ce E, nu același click?  
- Ce urmează la L4?

## Temă
Selectare tip 1/2 dacă lipsește. Urmează L4 = **inventar**.
