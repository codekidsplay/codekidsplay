# Lecția 2 — Casa modulară
**Modulul 4 · Orașul nostru**  
**Code Maker Club · City Builder**  
**Vârstă:** ~8–10 ani

> Azi faci o **casă după șablon** — corp cu ușă și ferestre — și îi pui **3 acoperișuri diferite**.  
> Proiect: pe placa din L1 · `Prenume_Nume_T4_L02`

---

## Obiectiv
La finalul orei ai **cel puțin o casă** pe zona de locuințe, la scară (1 m = 2 mm), cu ușă și ferestre tăiate (Hole).  
**Minim:** corp **24 × 20 × 12** (12 m × 10 m × 6 m) + ușă **4·4·8** + 2 ferestre **4·4·4** + acoperiș · casa stă pe zona de locuințe, ridicată la **4 mm**.  
**Complet:** Minim + **3 case din același corp**, cu **3 acoperișuri** diferite (într-o apă, piramidal, plat) + 4 ferestre pe casă (2 sus, 2 jos).

## De ce contează
Un **șablon** e un corp făcut o dată, apoi copiat. Orașele reale sunt pline de case din același model, cu mici diferențe.  
Ușile și ferestrele de pe model sunt **de 2 ori mai mari decât în realitate** (la scara 1:500 ar fi minuscule) — altfel nu s-ar vedea.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1 · verificăm scara: o casă de 12 m = 24 mm |
| 10–45 | Pas cu pas: corp · ușă și ferestre (Hole) · primul acoperiș |
| 45–100 | Minim → Complet (3 case, 3 acoperișuri, 4 ferestre) → Bonus |
| 100–120 | Recap, quiz, salvare |

**Unelte azi:** **Box** · **Wedge** · **Pyramid** · **Hole** · **Align** (**L**, inclusiv marginile) · mărimi cu numere · **Ctrl+D** (aceeași mutare) · **conul negru** · **Ctrl+G** · **Ctrl+Shift+G** · **View Cube** (Front, Right) · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. Deschizi proiectul `Prenume_Nume_T4_L01` și faci o copie (**Duplicate** din lista de proiecte), pe care o redenumești `Prenume_Nume_T4_L02`  
   *(Dacă nu ai placa, o refaci rapid: 150·150·3 + 4 zone, ca la L1.)*  
2. Snap Grid: **1.0 mm**

### 2) Corpul casei
1. **Box** → **24 · 20 · 12** *(în afara plăcii, deocamdată, pe plan)*  
2. Ținem minte: 24 mm = 12 m, 20 mm = 10 m, 12 mm = 6 m (2 etaje)

### 3) Ușa
1. **Box** → **4 · 4 · 8** → **Hole**  
2. Selectezi ușa și corpul → **L** → mijloc pe stânga–dreapta și punctul de **jos**  
3. Selectezi ușa și corpul → **L** → punctul din **față** al corpului (ușa e acum cu fața lipită de perete)  
4. O muți **2 mm spre față** — jumătate din Hole iese afară, jumătate taie peretele (adâncime 2 mm)

### 4) Ferestrele de sus
1. **Box** → **4 · 4 · 4** → **Hole**  
2. La fel ca ușa: **L** cu corpul → mijloc pe stânga–dreapta; lipit de perete în față, mutat 2 mm spre față  
3. O muți **6 mm** spre stânga și o ridici cu conul negru la **6 mm** — fereastra de sus-stânga  
4. **Ctrl+D** → muți copia **12 mm** spre dreapta — fereastra de sus-dreapta

### 5) Group
1. Selectezi corpul, ușa și cele 2 ferestre (Shift+click) → **Ctrl+G**  
   *(Dacă faci și Complet: înainte să adaugi acoperișul, apeși **Ctrl+D** de două ori pe corpul grupat și lași cele 2 copii deoparte, în afara plăcii. Vor fi casele 2 și 3.)*  
2. Din **Front**: ușa jos la mijloc, ferestrele sus  
3. Din **Right**: golurile taie doar 2 mm în perete

### 6) Primul acoperiș — într-o apă
1. **Wedge** → **24 · 20 · 8**  
2. Îl rotești până când, din **Right**, se vede un **triunghi cu partea înaltă spre spate**  
3. **L** cu casa → mijloc pe cele două direcții de pe plan → ridici la **12 mm**  
4. Selectezi casa și acoperișul → **Ctrl+G**

### 7) Casa pe placă
1. Casa → ridici la **4 mm** (suprafața zonei) și o muți pe zona de locuințe  
2. Culori: pereți o culoare, acoperiș alta

### 8) Complet — 3 case, 3 acoperișuri
1. Ai acum casa 1 (cu acoperiș într-o apă, **Wedge**) și **2 corpuri grupate fără acoperiș** (copiile lăsate deoparte la pasul 5)  
2. Ferestre jos *(pe corpul casei 2, **înainte** de acoperiș)*: corpul grupat → **Ctrl+Shift+G** (desfaci), selectezi cele două ferestre de sus → **Ctrl+D** → muți copiile **4 mm** în jos (rămân la 2 mm de pământ, lângă ușă) → selectezi corpul, ușa și toate cele 4 ferestre → **Ctrl+G** — 4 ferestre  
3. Acoperiș casa 2: **Pyramid** **24 · 20 · 9**, **L** cu corpul (mijloc pe cele două direcții), ridicat la 12 mm  
4. Acoperiș casa 3: **Box** **26 · 22 · 1,5** (iese 1 mm în afară), **L** cu corpul (mijloc pe cele două direcții), ridicat la 12 mm  
5. Pe casele 2 și 3, selectezi corpul și acoperișul → **Ctrl+G**  
6. Casele 2 și 3 ridicate la 4 mm și așezate pe zona de locuințe, cu spațiu între ele  

---

## Greșeli frecvente
1. **Ușa nu taie** — nu e Hole sau nu ai dat **Ctrl+G**.  
2. **Ușa taie prin toată casa** — Hole-ul intră prea mult în perete (trebuie să taie doar 2 mm, nu 4).  
3. **Ferestrele sunt la înălțimi diferite** — fiecare a fost ridicată separat. Ridică-o pe prima, apoi **Ctrl+D**.  
4. **Acoperișul e întors** — din **Right** partea înaltă trebuie să fie spre spate.  
5. **Acoperișul plutește** — nu e ridicat la 12 mm.  
6. **Casa e prea mare pentru zonă** — trei case de 24 mm încap greu; așază-le în două rânduri.  
7. **Scara greșită** — casă de 12 m = 24 mm, nu 12.

---

## De făcut azi — „Casa mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | O casă 24·20·12 cu ușă 4·4·8 și 2 ferestre 4·4·4 + acoperiș · pe zona de locuințe, la 4 mm |
| **Complet** | + 3 case cu 3 acoperișuri diferite + 4 ferestre pe o casă |

### Pasul 1 — Minim
- [ ] Corp **24·20·12**  
- [ ] Ușă **4·4·8** (Hole), mijloc, la 2 mm adâncime  
- [ ] 2 ferestre **4·4·4**, ridicate la 6 mm, cu centrele la 12 mm una de alta  
- [ ] **Ctrl+G** pe corp, ușă și ferestre  
- [ ] Acoperiș (Wedge) · casa pe zona de locuințe  

### Pasul 2 — Complet
- [ ] 3 case din același corp  
- [ ] 3 acoperișuri: într-o apă, piramidal, plat  
- [ ] 4 ferestre pe o casă  
- [ ] **Color** · numele `T4_L02` e corect  

---

## Bonus (extra — după Complet)
- [ ] Un horn: **Box** **3·3·6** pe acoperiș  
- [ ] Un balcon: **Box** subțire sub o fereastră de sus  
- [ ] Un garaj lipit de casă: **Box** **12·16·8** cu o ușă mare

## Recapitulare rapidă
1. Scara: **1 m = 2 mm**; ușile și ferestrele sunt de 2× mai mari ca în realitate  
2. Șablon = un corp făcut o dată, copiat  
3. Ușa și ferestrele: **Hole** de 4 mm grosime, mutat 2 mm în perete (taie doar 2 mm), **Ctrl+G**  
4. Acoperișul: ridicat la **12 mm**, aliniat pe centru

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Box 24·20·12 − ușă 4·4·8 − 2 ferestre 4·4·4 (+6, 12 mm) → Group → Wedge 24·20·8 (+12) → casa +4 mm pe zonă  
**Complet:** 3 case · acoperișuri: Wedge / Pyramid / Box · 4 ferestre

**Quiz scurt:**  
- Câți mm are o casă de 14 m? *(28)*  
- De ce ușile sunt mai mari decât în realitate?  
- Ce schimbi la copia casei ca să arate altfel?

## Temă
Opțional: desenezi pe foaie casa visurilor, cu mărimi în metri și apoi în mm (× 2).
