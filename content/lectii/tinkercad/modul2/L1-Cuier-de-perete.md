# Lecția 1 — Cuier de perete
**Modulul 2 · Obiecte utile**  
**Code Maker Club · Object Maker**  
**Vârstă:** ~8–10 ani

> Azi treci de la „forme frumoase” la un obiect **util**: un cuier cu **dimensiuni alese de tine**.  
> Proiect: **„Cuierul meu”** · `Prenume_Nume_T2_L01`

---

## Obiectiv
La finalul orei ai un **cuier**: placă de **120 × 30 × 5 mm**, **3 cârlige** la distanțe egale și **2 găuri** pentru șuruburi (Hole).  
**Minim:** placă + 3 cârlige la distanțe egale + 2 găuri care trec prin placă + **Ctrl+G**.  
**Complet:** Minim + bilă (cap rotund) pe fiecare cârlig + distanța măsurată cu **Ruler** + culoare.

## De ce contează
Un obiect real are **mărimi exacte**: dacă cârligele sunt prea aproape, nu încape a doua haină.  
Azi înveți să **scrii mărimile cu numere**, nu doar să măsori cu ochiul. Același truc îl folosești în tot Modulul 2.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design. Cuierul se printează bine: placa stă plată pe masă.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap M1 · ne uităm la un cuier real: ce părți are? |
| 10–40 | Pas cu pas: mărimi cu numere · placa · cârlig · copii egale · găuri |
| 40–100 | Minim → Complet (bile, Ruler, culoare) → Bonus dacă apuci |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Box** · **Cylinder** · **Sphere** · **Hole** / **Solid** · **Snap Grid** (jos-dreapta) · mărimi cu numere · **Ctrl+D** (Mac: **Cmd+D**) · **Ctrl+G** (Mac: **Cmd+G**) · **Ctrl+A** · **Align** (**L**) · săgețile de la tastatură · tasta **D** · **Ctrl+Shift+G** · **Ruler**

---

## Pas cu pas

### 1) Proiect nou și plasa
1. **Create new design**  
2. Nume: `Prenume_Nume_T2_L01`  
3. Jos-dreapta, la **Snap Grid**, alege **5.0 mm** — piesele sar din 5 în 5 mm și e mai ușor să cadă exact unde vrei
4. Piesa selectată se mută și cu **săgețile de la tastatură** (privești din **Top**): o apăsare = un pas de grilă = **5 mm**

### 2) Mărimi cu numere (truc nou)
1. Trage un **Box** pe plan  
2. Click pe el → apar **pătrățele albe** în colțuri  
3. Apasă pe pătrățelul alb de la un colț: apar **numere** (lungime, lățime, înălțime)  
4. Apasă pe un număr și **scrie** valoarea: **120** · **30** · **5**  
5. Asta e **placa**: lungă, îngustă și subțire, culcată pe plan

### 3) Primul cârlig
1. Trage un **Cylinder** și scrie mărimile: **10 · 10 · 25** (stă „în picioare”)  
2. Selectezi cilindrul și placa → **L** (Align): click pe punctul din **stânga** (stânga–dreapta) și pe punctul de **mijloc** (față–spate). *Nu* alege nimic pe direcția sus–jos  
3. Cilindrul are acum marginea lipită de capătul plăcii. Apasă **săgeata dreapta** de **5 ori** (5 × 5 = 25 mm): centrul cârligului e la **30 mm** de capăt  
4. Cilindrul stă pe plan și **se înfige în placă** — așa se lipește bine; deasupra plăcii rămân ~20 mm de cârlig

### 4) Copii egale
1. Cârligul selectat → **Ctrl+D** (Mac: **Cmd+D**) → copia apare **peste** original  
2. Mută copia **30 mm** spre dreapta (6 sărituri de câte 5 mm)  
3. **Ctrl+D** din nou — repetă **aceeași mutare** automat  
4. Rezultat: 3 cârlige la 30, 60, 90 mm — la fel de departe unul de altul și de capete

### 5) Găurile pentru șuruburi
1. Trage un **Cylinder** → scrie **6 · 6 · 15**  
2. În panoul **Shape**, alege **Hole** (cu dungi)  
3. Selectezi gaura și placa → **L** → punctul din **stânga** și **mijloc** pe față–spate. Apoi **săgeata dreapta** o dată (5 mm): gaura e la **5 mm** de capăt, **departe de cârlige**  
4. Coboar-o puțin sub plan cu **conul negru** (trage-o în jos ~2 mm, sub linia plasei), ca să treacă **prin toată placa**  
5. **Ctrl+D** → copia + placa → **L** → punctul din **dreapta** (placa nu se mișcă), apoi **săgeata stânga** o dată: a doua gaură e tot la 5 mm de margine

### 6) Group și verificare
1. **Ctrl+A** → **Ctrl+G** (Mac: **Cmd+G**)  
2. Dacă placa pare ridicată de pe plan, apasă **D**  
3. View Cube → **Top**: găurile se văd ca goluri?  
4. View Cube → **Front**: cârligele ies în sus, placa e plată

### 7) Complet — bile, Ruler, culoare
1. **Sphere** de **12 · 12 · 12** → selectezi sfera și un cârlig → **L** → **mijloc** pe ambele direcții de pe plan (nu și sus–jos). Apoi o ridici cu **conul negru** la **19 mm** — se înfige puțin în vârful cârligului  
2. **Ctrl+D** de două ori, mutând copiile **30 mm** → câte o bilă pe fiecare cârlig *(dacă ai ales Hole din greșeală, pune Solid)*  
3. **Ruler** (sus-dreapta) → pui rigla pe plan la marginea stângă a primului cârlig, apoi dai click pe al doilea cârlig: citești **30 mm** *(Ruler măsoară o piesă separată: dacă cârligele sunt în Group, fă întâi **Ctrl+Shift+G**, măsori, apoi **Ctrl+A** → **Ctrl+G** la loc)*  
4. Selectezi tot → **Color** în panoul **Shape** → culoarea ta

---

## Greșeli frecvente
1. **Distanțe inegale** — ai mutat copiile „cu ochiul”. Șterge-le și refă cu **Ctrl+D** + aceeași mutare.  
2. **Găurile nu se văd** — nu ai dat **Group**, sau cilindrii sunt încă Solid. Pune **Hole**, apoi **Ctrl+G**.  
3. **O gaură a tăiat un cârlig** — era prea aproape. Mută gaura mai spre capăt (nu lângă cârlig).  
4. **Gaura nu trece complet** — din **Front**, cilindrul Hole trebuie să iasă **sus și jos**; coboară-l cu conul negru.  
5. **Bilele plutesc** — din **Front** se vede un gol între bilă și cârlig; ridică sau coboară bila.  
6. **Placa e prea groasă sau prea subțire** — verifică numerele: **120 · 30 · 5**.  
7. **Am scris un număr greșit** — **Ctrl+Z** (Mac: **Cmd+Z**) sau apasă pe număr și îl rescrii.

---

## De făcut azi — „Cuierul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Placă **120 × 30 × 5** + 3 cârlige egale + 2 găuri care trec prin placă + Group |
| **Complet** | Minim + bile pe cârlige + **Ruler** 30 mm + **Color** |

### Pasul 1 — Minim
- [ ] Placă **120 · 30 · 5** (numerele scrise, nu cu ochiul)  
- [ ] 3 cârlige (**10 · 10 · 25**) la 30, 60, 90 mm  
- [ ] 2 cilindri **Hole** aproape de capete, departe de cârlige  
- [ ] **Ctrl+A** → **Ctrl+G** · găurile se văd din **Top** și din **spate**  

### Pasul 2 — Complet
- [ ] Bilă pe fiecare cârlig (din **Front** nu plutește)  
- [ ] **Ruler**: distanța dintre cârlige = 30 mm  
- [ ] **Color** · numele `T2_L01` e corect  

---

## Bonus (extra — după Complet)
- [ ] Lungește placa la **150 mm** și adaugă al **4-lea** cârlig, tot la 30 mm  
- [ ] Un cârlig mai înalt la mijloc, pentru haine lungi  
- [ ] Un al doilea rând de găuri, pentru alt fel de șuruburi

## Recapitulare rapidă
1. Mărimile se scriu cu **numere** în pătrățelul alb  
2. **Ctrl+D** + aceeași mutare = copii la distanțe egale  
3. **Hole** taie doar după **Ctrl+G** și doar dacă trece prin toată placa  
4. **Ruler** confirmă ce ai făcut

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Box 120·30·5 → Cylinder 10·10·25 → Ctrl+D ×2 (30 mm) → 2 Hole 6·6·15 → Group  
**Complet:** + Sphere pe vârfuri · Ruler 30 mm · Color

**Quiz scurt:**  
- Cum faci trei cârlige la distanțe **egale**?  
- De ce găurile stau **departe** de cârlige?  
- Cuierul are cârlige de 25 mm înălțime și placă de 5 mm — câți mm ies **deasupra** plăcii?

## Temă
Opțional: schimbă distanța dintre cârlige la **40 mm** pe o copie (`T2_L01_v2`) și compară cele două cuiere.
