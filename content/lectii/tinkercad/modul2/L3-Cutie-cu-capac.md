# Lecția 3 — Cutie cu capac
**Modulul 2 · Obiecte utile**  
**Code Maker Club · Object Maker**  
**Vârstă:** ~8–10 ani

> Azi faci **două piese** care trebuie să se potrivească: o cutie și capacul ei.  
> Proiect: **„Cutia mea”** · `Prenume_Nume_T2_L03`

---

## Obiectiv
La finalul orei ai o **cutie goală** (cu fund) și un **capac** cu margine care intră în cutie. Sunt **două piese separate**.  
**Minim:** cutie **60 × 40 × 30** goală (pereți 3 mm, fund 3 mm) + capac **60 × 40 × 4** cu margine **53 × 33 × 3** · capacul stă lângă cutie, pe plan.  
**Complet:** Minim + capacul întors și așezat pe cutie (marginea intră înăuntru) + culori diferite + **Ruler** (joc 0,5 mm).

## De ce contează
Piesele care se potrivesc au nevoie de **joc**: un spațiu mic, ca să intre ușor.  
Dacă marginea capacului e **exact** cât gaura, la printare nu intră. Azi lași **0,5 mm pe fiecare parte**.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2 · deschidem o cutie reală: unde e „jocul” între capac și cutie? |
| 10–45 | Pas cu pas: cutia goală · capacul cu margine |
| 45–100 | Minim → Complet (capac pe cutie, Ruler, culori) → Bonus |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Box** · **Hole** · **Align** (**L**) · mărimi cu numere · **Ctrl+G** · **Ctrl+Shift+G** · **Ctrl+A** · **conul negru** · **rotire** · **View Cube** · **Ruler** · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. **Create new design** · nume `Prenume_Nume_T2_L03`  
2. Snap Grid: **1.0 mm**

### 2) Cutia — exteriorul
1. **Box** → **60 · 40 · 30**  
2. Rămâne **Solid**

### 3) Cutia — golul
1. Alt **Box** → **54 · 34 · 30** → panoul **Shape** → **Hole**  
2. Selectezi Hole-ul și cutia → **L** → **mijloc** pe cele două direcții de pe plan (stânga–dreapta și față–spate)  
3. Ridici Hole-ul cu **3 mm**, folosind **conul negru** (scrii 3): golul începe la 3 mm de jos (fundul) și iese 3 mm deasupra, deci cutia e **deschisă sus**  
4. **Ctrl+A** → **Ctrl+G** — cutie goală, cu pereți de 3 mm

### 4) Capacul — placa
1. Alt **Box** → **60 · 40 · 4**  
2. Îl muți lângă cutie, pe plan

### 5) Capacul — marginea care intră
1. Alt **Box** → **53 · 33 · 3**  
2. De ce 53 și 33? Golul cutiei e 54 × 34 → rămâne **0,5 mm joc** pe fiecare parte  
3. Îl ridici cu 4 mm (cât placa), folosind **conul negru** — stă **pe** placă  
4. Selectezi marginea și placa → **L** → mijloc pe ambele direcții  
5. Dai **Group** doar la cele două (capacul = 1 piesă); cutia rămâne separată

### 6) Complet — capacul pe cutie
1. Selectezi capacul → rotești **180°** cu o săgeată curbă **de pe lateral** (8 pași de 22,5°, sau scrii **180**) ca marginea să arate **în jos**  
2. Selectezi capacul și cutia → **L** → mijloc pe cele două direcții de pe plan. Apoi ridici capacul cu **conul negru** la **27 mm**: placa lui stă pe pereți (la 30 mm), iar marginea de 3 mm intră în gol  
3. View Cube → **Front**: capacul stă pe pereți, nu e „înfipt” în ei  
4. **Ruler**: pe o piesă selectată citești mărimea ei. Din **Top**, măsori marginea capacului (**53**) și golul cutiei (**54**) — diferența e 1 mm (0,5 pe parte). *(Golul se măsoară doar dacă Hole-ul e separat: **Ctrl+Shift+G** pe cutie, măsori, apoi **Ctrl+A** pe Hole+cutie → **Ctrl+G** la loc)*  
5. **Color**: cutia o culoare, capacul alta

---

## Greșeli frecvente
1. **Cutia e plină** — Hole-ul nu a fost grupat, sau e și el Solid. Pune **Hole**, apoi **Ctrl+G**.  
2. **Cutia nu are fund** — Hole-ul e la fel de înalt ca ea. Hole-ul trebuie ridicat **3 mm**, nu lăsat pe plan.  
3. **Capacul nu intră** — marginea e prea mare. Verifică **53 · 33**, nu 54 · 34.  
4. **Capacul e prea lejer în gol** — dacă pui 50 · 30, joacă prea mult. 53 · 33 e potrivit.  
5. **Am grupat și cutia, și capacul** — Ungroup (**Ctrl+Shift+G**). Trebuie să fie **2** piese.  
6. **Marginea capacului plutește** — n-ai ridicat-o cu 4 mm; verifică din **Front**.

---

## De făcut azi — „Cutia mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Cutie 60·40·30 goală, fund 3 mm + capac cu margine 53·33·3 · 2 piese separate |
| **Complet** | Minim + capacul pe cutie (marginea înăuntru) + Ruler (joc 0,5 mm) + culori diferite |

### Pasul 1 — Minim
- [ ] Cutie **60 · 40 · 30** + Hole **54 · 34 · 30** ridicat 3 mm  
- [ ] **Ctrl+G** → cutie goală cu fund (verifici din lateral și de sus)  
- [ ] Capac **60 · 40 · 4** + margine **53 · 33 · 3** pe el → Group  
- [ ] Cutia și capacul sunt **2** piese separate  

### Pasul 2 — Complet
- [ ] Capacul întors **180°** și așezat pe cutie  
- [ ] **Ruler**: 54 și 53  
- [ ] Culori diferite · numele `T2_L03` e corect  

---

## Bonus (extra — după Complet)
- [ ] Text cu numele tău pe capac (Text, 1 mm înălțime)  
- [ ] Un mâner mic pe capac: un Cylinder **10 · 10 · 5** pe fața plăcii fără margine  
- [ ] Împarte cutia în **2 compartimente** cu un perete Box **3 · 36 · 25** înăuntru (îl pui **după** Group, la mijloc cu **L**, și faci din nou **Ctrl+G** — altfel Hole-ul îl taie)

## Recapitulare rapidă
1. Cutie goală = Box Solid + Box **Hole** mai mic + **Ctrl+G**  
2. Hole **ridicat 3 mm** = cutie cu fund  
3. Marginea capacului = golul − **1 mm** (0,5 mm pe parte)  
4. Cutia și capacul rămân **2 piese**

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Cutie:** Box 60·40·30 + Hole 54·34·30 (ridicat 3 mm) → Group  
**Capac:** Box 60·40·4 + margine 53·33·3 → Group  
**Complet:** capac întors 180° pe cutie · Ruler · Color

**Quiz scurt:**  
- De ce marginea capacului nu poate fi exact cât golul?  
- Câți mm are fundul cutiei?  
- Câte piese separate trebuie să rămână la final?

## Temă
Opțional: o cutie pătrată **40 × 40 × 20** cu capac — aplici aceeași regulă (gol − 1 mm).
