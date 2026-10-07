# Lecția 3 — Toleranțe pentru print
**Modulul 5 · Avansat și proiectare tehnică**  
**Code Maker Club · Design Pro**  
**Public:** recomandat **10+**

> Azi faci un **test de potrivire**: o placă cu știfturi și o placă cu găuri de mărimi puțin diferite, ca să afli ce **joc** trebuie între piese.  
> Proiect: **„Testul de potrivire”** · `Prenume_Nume_T5_L03`

---

## Obiectiv
La finalul orei ai **două plăci**: una cu știfturi **Ø6** și una cu găuri de **Ø6,2 / 6,4 / 6,6**, plus **regulile de print** scrise pe foaie.  
**Minim:** placa A **80·20·5** cu 3 știfturi **Ø6·8** la 15 mm una de alta · placa B **80·20·5** cu 3 găuri **Ø6,2 · Ø6,4 · Ø6,6** perfect în dreptul știfturilor · regulile de print copiate pe foaie.  
**Complet:** Minim + încă 2 perechi (**Ø6,0** și **Ø6,8**) + o **cutiuță** **30·20·15** cu pereți de **1,6 mm**.

## De ce contează
O imprimantă nu face piese perfecte: plasticul se lărgește puțin. Un știft de 6,0 într-o gaură de 6,0 **nu intră**. De aceea gaura se face puțin **mai mare**: asta e **jocul**.  
Cât de mare? Depinde de imprimantă. Tu faci acum testul; **după oră** (la printare) afli care gaură se potrivește cel mai bine.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Regulile de print (tabelul de mai jos) |
| 15–60 | Pas cu pas: placa A cu știfturi · ghidurile · placa B cu găuri |
| 60–100 | Minim → Complet (2 perechi în plus, cutiuța) |
| 100–120 | Verificare, recap, salvare |

**Unelte azi:** **Box** · **Cylinder** · **Hole** · mărimi cu numere *(zecimale cu punct: 6.2)* · mutare cu **săgețile** · **Snap Grid 0.5 / 1** · **Align** (**L**) · **Ctrl+D** · **Ctrl+G** · **Ctrl+Shift+G** · **Ruler** · **View Cube**

---

## Regulile de print *(le copiezi pe foaie)*

| Regula | Valoare | De ce |
|--------|---------|-------|
| **Perete** | cel puțin **1,2 mm** *(noi: 1,6)* | mai subțire se rupe sau nu se printează |
| **Joc la piese care se mișcă** | **0,4 – 0,5 mm** pe parte | altfel se lipesc |
| **Joc la piese care se bagă strâns** | **0,1 – 0,2 mm** pe parte | să intre cu puțină forță |
| **Unghi sub o piesă în aer** | cel mult **45°** | altfel se prăbușește plasticul |
| **Fața de jos** | **plată** | se lipește pe masa imprimantei |
| **Detaliu minim** | cel puțin **1 mm** | mai mic dispare |

*(Valorile de joc sunt orientative — testul de azi arată ce merge pe imprimanta clasei.)*

---

## Pas cu pas

### 1) Proiect nou
1. `Prenume_Nume_T5_L03` · Snap Grid **1.0 mm** *(mutările mari le faci cu săgețile, ca în L1; pentru mărimi ca 6,2 tastezi cifrele — Snap Grid nu contează)*

### 2) Placa A — știfturile
1. **Box** → **80 · 20 · 5** *(placa A)*  
2. **Cylinder** → **6 · 6 · 8** *(știftul)* → **L** cu placa: mijloc pe față–spate și marginea din stânga  
3. Îl muți **22 mm spre dreapta** *(centrul la 25 mm: 22 + 3 = 25)* și îl ridici la **5 mm** *(stă pe placă)*  
4. **Ctrl+D** → muți copia **15 mm spre dreapta** → **Ctrl+D** *(repetă aceeași mutare)* → al treilea știft: centre la **25, 40, 55**  
5. Selectezi placa și știfturile → **Ctrl+G**

### 3) Placa B și ghidurile
1. **Box** → **80 · 20 · 5** *(placa B)* → o muți **în fața plăcii A**, la 30 mm distanță *(cele două plăci aliniate pe stânga–dreapta, **L** → marginea din stânga)*  
2. **Box** → **8 · 8 · 1** *(ghidul)* → **L** cu placa B: mijloc pe față–spate și marginea din stânga  
3. Îl muți **21 mm spre dreapta** *(centrul la 25)* și îl ridici la **6 mm** *(în aer, ca să nu strice nimic)*  
4. **Ctrl+D** → copia **15 mm spre dreapta** → **Ctrl+D** → **3 ghiduri**, la **25, 40, 55**

### 4) Găurile
1. **Cylinder** → **6,2 · 6,2 · 7** → **Hole**  
2. Selectezi gaura și **primul ghid** → **L** → mijloc pe stânga–dreapta și mijloc pe față–spate *(ghidul e mai mare, deci rămâne pe loc; gaura se centrează pe el)*  
3. O cobori **1 mm** *(trece prin placă)*  
4. A doua gaură: **Cylinder** **6,4 · 6,4 · 7** → Hole → **L** cu al doilea ghid → coborâtă 1 mm  
5. A treia: **6,6 · 6,6 · 7** → Hole → **L** cu al treilea ghid → coborâtă 1 mm  
6. **Ștergi cele 3 ghiduri**  
7. Selectezi placa B și cele 3 găuri → **Ctrl+G**

### 5) Verificare
1. Din **Top**: fiecare gaură e în dreptul unui știft *(prima placă și a doua au aceleași centre pe stânga–dreapta)*  
2. Selectezi fiecare gaură: câmpurile de mărime arată 6,2 · 6,4 · 6,6 *(cu **Ruler** verifici și distanțele: 15 mm între centre)*  
3. Pe foaie: notezi jocul pe parte *(6,2 − 6) ÷ 2 = 0,1 mm; 6,4 → 0,2 mm; 6,6 → 0,3 mm*

### 6) Complet — încă 2 perechi
1. Placa A e un Group: **Ctrl+Shift+G** *(desface)*. Știft nou la **10** *(Ctrl+D din știftul de la 25, 15 mm spre stânga)* și la **70** *(Ctrl+D din cel de la 55, 15 mm spre dreapta)* → apoi **Ctrl+G** pe placa A și toți cei 5 știfturi  
2. Ghiduri noi la 10 și 70 *(la fel, pe placa B)*  
3. Găuri **Ø6,0** la 10 și **Ø6,8** la 70, centrate cu **L** pe ghiduri, coborâte 1 mm, apoi ghidurile șterse → **Ctrl+G** cu placa B *(care e deja Group: merge)*

### 7) Complet — cutiuța
1. **Box** → **30 · 20 · 15**  
2. **Box** → **26,8 · 16,8 · 14** → **Hole** *(30 − 2·1,6 = 26,8; 20 − 2·1,6 = 16,8; înălțime: 15 − 1,6 = 13,4, plus 0,6 ca să iasă pe deasupra)*  
3. **L** cu cutia: mijloc pe stânga–dreapta și pe față–spate; gaura ridicată la **1,6 mm** *(fundul de 1,6 mm rămâne)*  
4. **Ctrl+G** · din **Top**: pereții de 1,6 mm

---

## Greșeli frecvente
1. **Joc zero** — știft 6,0 și gaură 6,0. Nu va intra.  
2. **Joc prea mare** — 7,5 la 6,0 face îmbinarea prea slabă, piesele se mișcă.  
3. **Găurile nu sunt în dreptul știfturilor** — ai uitat să le centrezi pe ghiduri.  
4. **Perete subțire** — sub 1,2 mm nu se printează.  
5. **Gaura nu taie placa** — nu e Hole sau nu e grupată cu placa B *(coboară-o 1 mm ca să iasă curat pe ambele fețe)*.  
6. **Ghidurile au rămas în model** — șterge-le.  
7. **Confunzi joc pe parte cu joc total** — diferența de diametru e de 2 ori jocul pe parte.

---

## De făcut azi — „Testul de potrivire”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Placa A (3 știfturi Ø6) · placa B (găuri Ø6,2/6,4/6,6) centrate · regulile pe foaie |
| **Complet** | + perechile Ø6,0 și Ø6,8 + cutiuța cu pereți 1,6 mm |

### Pasul 1 — Minim
- [ ] Placa A cu 3 știfturi la 25, 40, 55  
- [ ] 3 ghiduri la același loc pe placa B  
- [ ] 3 găuri centrate, apoi ghiduri șterse  
- [ ] **Ctrl+G** pe placa B  
- [ ] Regulile pe foaie  

### Pasul 2 — Complet
- [ ] Perechi la 10 și 70  
- [ ] Cutiuță cu pereți 1,6 mm  
- [ ] **Color** · numele `T5_L03` e corect  

---

## Bonus (extra — după Complet)
- [ ] Scrie sub fiecare gaură mărimea ei, cu **Text** mic *(Hole înalt 2 mm, ridicat la 4 mm: adâncime 1 mm)*  
- [ ] Un test pentru o piesă care **se mișcă**: ax Ø5 și gaură Ø5,8  
- [ ] Pe foaie: cum ai orienta cutiuța la printare, ca să nu ai nimic „în aer”?

## Recapitulare rapidă
1. Piesele se potrivesc doar cu **joc**  
2. Joc strâns ≈ 0,1–0,2 mm pe parte; piese mobile ≈ 0,4–0,5 mm  
3. Perete minim **1,2 mm**  
4. Ghidul te ajută să centrezi exact

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** placa A 80·20·5 + știfturi Ø6·8 (25, 40, 55) → placa B 80·20·5 + găuri Ø6,2 / 6,4 / 6,6 centrate pe ghiduri  
**Complet:** + Ø6,0 și Ø6,8 · cutiuță 30·20·15, pereți 1,6 *(gol 26,8·16,8·14, ridicat 1,6)*

**Quiz scurt:**  
- De ce un știft de 6,0 nu intră într-o gaură de 6,0?  
- Câți mm e jocul pe parte la gaura de 6,4? *(0,2)*  
- Care e peretele minim pe care îl folosim?

## Temă
Opțional: spune pe foaie ce joc ai alege pentru un capac care trebuie să **se deschidă ușor**, și ce joc pentru un știft care trebuie să **țină strâns**.
