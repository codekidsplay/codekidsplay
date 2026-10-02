# Lecția 4 — Clădiri publice
**Modulul 4 · Orașul nostru**  
**Code Kids Play · City Builder**  
**Vârstă:** ~8–10 ani

> Azi construiești **școala orașului**: clădire mai lată, cu trepte, ușă, ferestre și steag.  
> Proiect: pe placa ta · `Prenume_Nume_T4_L04`

---

## Obiectiv
La finalul orei ai **o școală** pe zona de clădiri publice, recunoscută după trepte, ușă și steag.  
**Minim:** corp **40 × 20 × 16** (20 m × 10 m × 8 m) + ușă **6·4·10** + 2 ferestre **6·4·5** + **2 trepte** + **steag** (stâlp + pânză) · ridicată la **4 mm** pe zona de clădiri publice.  
**Complet:** Minim + **acoperiș cu margine** + **4 coloane** la intrare + **a doua clădire** (spital: corp **30·18·24** cu **cruce** roșie din 2 Box-uri).

## De ce contează
Casa are ușă și ferestre mici. O clădire publică se **recunoaște**: trepte mari, o intrare clară, un semn (steag, cruce, coloane).  
Fără semn, un cub gri poate fi orice.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 · ce clădiri publice are orașul tău? |
| 10–45 | Pas cu pas: corp · ușă și ferestre · trepte · steag |
| 45–100 | Minim → Complet (acoperiș, coloane, spital) → Bonus |
| 100–120 | Tur „ghici ce e”, recap, salvare |

**Unelte azi:** **Box** · **Cylinder** · **Hole** · **Align** (**L**, inclusiv marginile) · **Ctrl+D** · **conul negru** · **Ctrl+G** · **View Cube** · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. Copia proiectului `Prenume_Nume_T4_L03` (**Duplicate**), redenumită `Prenume_Nume_T4_L04` *(sau placa refăcută rapid)*  
2. Snap Grid: **1.0 mm**

### 2) Corpul, ușa, ferestrele
1. **Box** → **40 · 20 · 16** *(în afara plăcii, deocamdată)*  
2. **Box** → **6 · 4 · 10** → **Hole** *(ușa)*: **L** cu corpul → mijloc stânga–dreapta, punctul de **jos**, punctul din **față**; apoi **2 mm spre față**  
3. **Box** → **6 · 4 · 5** → **Hole** *(fereastra)*: **L** cu corpul → punctul din **față**; **2 mm spre față**; **15 mm spre stânga** de mijloc; ridicată la **6 mm**  
4. **Ctrl+D** → copia **30 mm spre dreapta** — fereastra din dreapta  
5. Selectezi corpul, ușa și ferestrele → **Ctrl+G**

> **Ordinea contează:** dăm **Ctrl+G** acum, **înainte** de trepte și coloane, ca Hole-urile să taie doar corpul.

### 3) Treptele
1. **Box** **14 · 6 · 1** *(treapta de jos)*: **L** cu corpul → mijloc stânga–dreapta, punctul de **jos**, punctul din **față** → o muți **6 mm spre față** *(se lipește de perete)*  
2. **Box** **14 · 3 · 2** *(treapta de sus)*: aceleași aliniări → o muți **3 mm spre față**  
3. Din **Right**: două trepte, ca o scară mică spre ușă

### 4) Steagul
1. **Cylinder** **1 · 1 · 14** *(stâlpul)*, ridicat la **16 mm** (pe acoperiș), într-un colț al clădirii  
2. **Box** **6 · 0,5 · 4** *(pânza)*, lipită de stâlp, sus, ridicată la **26 mm** *(vârful stâlpului: 30 − 4)*  
3. Culori: pânza roșie sau albastră

### 5) Pe placă
1. Selectezi tot (corpul grupat, treptele, stâlpul și pânza) cu Shift+click  
2. Ridici la **4 mm** și muți pe zona de **clădiri publice** *(dreapta-față)*  
3. **Color**: pereți o culoare deschisă, treptele gri  
4. Dacă faci **doar Minim**: cu tot ce ai selectat → **Ctrl+G**. Dacă mergi la **Complet**, **nu grupa încă** (ai nevoie să te aliniezi la corp) — grupezi la sfârșitul pasului 6

### 6) Complet — acoperiș, coloane, spital
1. **Acoperiș:** **Box** **42 · 26 · 1,5**, **L** cu corpul (mijloc pe ambele axe), ridicat la **20 mm** *(16 mm cât e corpul + 4 mm de la placă; iese 1 mm pe laterale și 3 mm în față și în spate)*  
2. **Coloane:** **Cylinder** **3 · 3 · 16**: **L** cu corpul → mijloc stânga–dreapta, punctul din față și punctul de jos (cel de la 4 mm); o muți **3 mm spre față** și **13 mm spre stânga** de mijloc *(rămâne în afara treptelor)*  
   **Ctrl+D** → **4 mm spre dreapta** (a doua coloană) → selectezi ambele → **Ctrl+D** → **22 mm spre dreapta** — **4 coloane** simetrice *(la −13, −9, +9, +13 mm de mijloc)*  
   *(Mutări mari: Snap Grid 2.0 mm.)*  
3. **Spital:** **Box** **30 · 18 · 24** + **Hole** ușă **6·4·8** *(ca la școală: aliniată pe față, mutată 2 mm spre față, **Ctrl+G**)*, pe aceeași zonă, în spatele școlii *(școala + trepte are 26 mm adâncime, spitalul 18 → încap în 67)*, la **4 mm**  
4. **Crucea:** două Box-uri roșii **8·1·2** și **2·1·8** → le grupezi (**Ctrl+G**) → **L** cu spitalul: mijloc stânga–dreapta, **mijloc sus–jos** *(înălțime)* și punctul din **față**; apoi o muți **1 mm spre față** *(se lipește de fațadă)*
5. **Grupezi** (**Ctrl+G**) școala cu tot ce ține de ea: corp, trepte, steag, acoperiș, coloane. Spitalul rămâne separat

---

## Greșeli frecvente
1. **Ușa nu se vede** — ai dat Ctrl+G după ce ai adăugat treptele, iar Hole-ul a tăiat și treptele.  
2. **Treptele sunt în perete** — nu le-ai mutat spre față cu 6 mm / 3 mm.  
3. **Steagul stă în aer** — stâlpul nu e ridicat la 16 mm.  
4. **Coloanele nu sunt simetrice** — mută prima coloană, apoi doar Ctrl+D.  
5. **Prea mare pentru zonă** — școala de 40 mm lățime și spitalul se așază unul în spatele celuilalt (nu unul lângă altul: 40 + 30 > 67).  
6. **Identică cu casa** — fără trepte și semn nu se recunoaște.  
7. **Scara greșită** — 20 m = 40 mm.

---

## De făcut azi — „Școala mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Corp 40·20·16 · ușă · 2 ferestre · 2 trepte · steag · pe zona de clădiri publice |
| **Complet** | + acoperiș · 4 coloane · spital cu cruce |

### Pasul 1 — Minim
- [ ] Corp **40·20·16**, ușă **6·4·10**, 2 ferestre  
- [ ] **Ctrl+G** pe corp și găuri  
- [ ] 2 trepte  
- [ ] Steag  
- [ ] Ridicată la 4 mm, pe zona albastră  

### Pasul 2 — Complet
- [ ] Acoperiș cu margine  
- [ ] 4 coloane  
- [ ] Spital cu cruce  
- [ ] **Color** · numele `T4_L04` e corect  

---

## Bonus (extra — după Complet)
- [ ] **Text** `SCOALA` pe fațadă, așezat în picioare *(dacă literele stau culcate, rotește-le cu săgeata de rotire)*  
- [ ] Curte cu gard în jurul școlii  
- [ ] Parcare cu 4 locuri (Box-uri subțiri)

## Recapitulare rapidă
1. Public = **trepte + intrare + semn**  
2. **Ctrl+G** pe corp și găuri **înainte** de trepte  
3. Coloanele: prima la loc, restul cu **Ctrl+D**

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Box 40·20·16 − ușă 6·4·10 − 2 ferestre 6·4·5 → Group → trepte 14·6·1 și 14·3·2 → steag (Cylinder 1·1·14 + Box 6·0,5·4) → +4 mm pe zona albastră  
**Complet:** acoperiș 42·26·1,5 · 4 coloane 3·3·16 · spital 30·18·24 cu cruce

**Quiz scurt:**  
- Cum recunoști o școală față de o casă?  
- De ce dăm Ctrl+G înainte de trepte?  
- Câți metri are școala ta în lățime? *(20)*

## Temă
Opțional: desenezi pe foaie ce clădire publică ar mai trebui în cartier (bibliotecă? poliție?) și ce semn pui pe ea.
