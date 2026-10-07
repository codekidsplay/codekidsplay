# Lecția 5 — Cutie cu balama
**Modulul 5 · Avansat și proiectare tehnică**  
**Code Maker Club · Design Pro**  
**Public:** recomandat **10+**

> Azi faci o **cutie cu capac și balama** care s-ar putea imprima dintr-o singură bucată (**print-in-place**): capacul se învârte pe un știft, fără să fie lipit de el.  
> Proiect: **„Cutia cu balama”** · `Prenume_Nume_T5_L05`

---

## Obiectiv
La finalul orei ai o **cutie** și un **capac** legate de o **balama cu joc**: știftul trece prin capac fără să-l atingă.  
**Minim:** cutie **50·40·20** cu pereți **2,4 mm** · capac **50·39,5·3** · balama pe latura din spate: 2 articulații fixe **Ø8·13** pe cutie, o articulație **Ø8·23** pe capac cu gaură **Ø5**, știft **Ø4·50** · între ele **0,5 mm** joc *(pe lături, în spate și deasupra cutiei)* · cele două părți (cutie și capac) rămân **grupuri separate**.  
**Complet:** Minim + o **adâncitură pentru deget** în capac (Hole **Ø12**) + nume pe capac.

## De ce contează
Imprimantele pot face **piese care se mișcă**, deja montate, dacă între ele lași **joc** (L3). Balamaua e cel mai bun exemplu: știftul trece prin articulația capacului cu **0,5 mm** de aer pe fiecare parte.

**Lecția cere atenție la numere.** Lucrează încet: fiecare piesă are un loc exact. Dacă te încurci, folosește **Ruler** și compară cu tabelul.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Schița balamalei: ce e fix, ce se mișcă · numerele din tabel |
| 15–45 | Cutia · capacul |
| 45–100 | Balamaua: articulații · știft · punți · verificare |
| 100–120 | Complet (adâncitura), recap, salvare |

**Unelte azi:** **Box** · **Cylinder** · **Hole** · **Text** · mărimi cu numere *(zecimale cu punct: 45.2)* · mutare cu **săgețile** și cu conul negru · **rotire (săgeți curbe, 90° = 4 pași)** · **Snap Grid 0.5 / 5** · **Align** (**L**) · **Ctrl+D** · **Ctrl+G** · **View Cube** (Top, Front, Right) · **Ruler**

---

## Schița balamalei *(pe foaie)*
Desenezi cutia **din lateral**: în spate, la înălțimea capacului, un cerc mare (articulația Ø8) și în el unul mic (știftul Ø4). Marchezi: **știftul ține de cutie**, **articulația din mijloc ține de capac**.

| Piesă | Mărime | Loc *(de la colțul din față-stânga-jos al cutiei)* |
|-------|--------|----------------------------------------------------|
| Cutie | 50·40·20 | 0 |
| Capac | 50·39,5·3 | z = 20,5 *(0,5 mm de aer peste cutie)* |
| Axa balamalei | — | 44 mm în spate, la înălțimea 21,5 |
| Articulație capac | Ø8·23 | x de la 13,5 până la 36,5 |
| Articulații cutie | Ø8·13 | x de la 0 la 13 și de la 37 la 50 |
| Știft | Ø4·50 | x de la 0 la 50 |
| Gaura din capac | Ø5·25 | x de la 12,5 la 37,5 |

---

## Pas cu pas

### 1) Proiect nou
1. `Prenume_Nume_T5_L05` · Snap Grid **0.5 mm**

### 2) Cutia
1. **Box** → **50 · 40 · 20**  
2. **Box** → **45,2 · 35,2 · 19** → **Hole** *(50 − 2·2,4 = 45,2; 40 − 2·2,4 = 35,2)*  
3. **L** cu cutia → mijloc pe stânga–dreapta și pe față–spate; gaura ridicată la **2 mm** *(fund de 2 mm; sus iese peste cutie)*  
4. **Ctrl+G** → „cutia”

### 3) Capacul
1. **Box** → **50 · 39,5 · 3**  
2. **L** cu cutia: marginea din stânga și marginea din față  
3. Îl ridici la **20,5 mm** *(0,5 mm de aer peste cutie, ca să nu se lipească la printare)* — rămâne un singur obiect, deocamdată

### 4) Articulația capacului *(prima piesă a balamalei)*
1. **Cylinder** → **8 · 8 · 23**  
2. Îl rotești cu **4 pași** *(90°)* pe săgeata curbă care îl răstoarnă într-o parte, ca să stea **culcat**, cu lungimea pe stânga–dreapta — din **Top** trebuie să fie un dreptunghi lung de 23 × 8 *(dacă e lung pe față–spate, ai folosit cealaltă săgeată: anulezi cu Ctrl+Z)*  
3. Îl lași pe plan, lângă cutie · **L** cu cutia: marginea din stânga, din față și de jos → acum e în colțul cutiei  
4. Îl muți: **13,5 mm spre dreapta** · **40 mm spre spate** *(Snap 5: 8 apăsări de săgeată)* · **17,5 mm în sus** *(conul negru, Snap 0.5)*  
   *Verifici cu Ruler: marginea din spate a articulației e la 48 mm și cea de sus la 25,5 — deci centrul e la 44 mm în spate și 21,5 sus.*

### 5) Știftul
1. Articulația → **Ctrl+D** *(copia apare exact deasupra și e deja selectată)*  
2. Copiei îi tastezi mărimile: **50 · 4 · 4** *(lungime · lățime · înălțime)*  
3. **L** cu articulația Ø8 *(cea mare)*: mijloc pe față–spate și mijloc pe verticală *(articulația mare rămâne pe loc, știftul se centrează în ea)*  
4. **L** cu cutia: marginea din stânga → știftul începe de la 0 și se termină la 50

### 6) Articulațiile cutiei
1. Articulația capacului → **Ctrl+D** → mărimi **13 · 8 · 8**  
2. **L** cu cutia: doar marginea din stânga *(pe înălțime și pe față–spate rămâne pe loc)* → x de la 0 la 13  
3. **Ctrl+D** → o muți **37 mm spre dreapta** *(Snap 1)* → x de la 37 la 50

### 7) Punțile
1. **Box** **13 · 6 · 6** *(puntea articulației din stânga)* → **L** cu cutia: marginea din stânga și din față → o muți **39 mm spre spate** *(1 mm intră în peretele din spate, 5 mm ies în afară, spre articulație)* și o ridici la **14 mm** *(de la 14 la 20)*  
2. **Ctrl+D** → o muți **37 mm spre dreapta** *(puntea din dreapta)*  
3. **Box** **23 · 6 · 3** *(puntea capacului)* → **L** cu cutia: marginea din față → o muți **38 mm spre spate** *(ajunge până la 44, adică 1,5 mm peste capac și până la axa articulației)* și o ridici la **20,5 mm**; **L** cu articulația capacului: doar marginea din stânga *(x de la 13,5 la 36,5)*

### 8) Gaura din capac
1. Știftul → **Ctrl+D** → mărimi **25 · 5 · 5** → **Hole**  
2. **L** cu articulația capacului Ø8: mijloc pe toate cele trei axe *(gaura Ø5 în articulația Ø8)*

### 9) Grupurile *(foarte important)*
1. **Capacul:** selectezi capacul, articulația Ø8·23, puntea capacului și gaura Ø5 → **Ctrl+G**  
2. **Cutia:** selectezi cutia (grupul), cele 2 articulații Ø8·13, cele 2 punți și **știftul** → **Ctrl+G**  
3. Rămân **două obiecte**: cutia (cu știftul) și capacul. **Nu** le grupezi între ele!

### 10) Verificarea balamalei
1. **View Cube → Right**: vezi cercul mare (articulația capacului), în el gaura de Ø5 și, în gaură, știftul de Ø4 *(un inel de aer între ele)*  
2. **Top**: între articulația capacului și cele ale cutiei e un spațiu de **0,5 mm** de fiecare parte  
3. Între spatele capacului și articulațiile cutiei rămâne **0,5 mm** *(capacul are 39,5 mm, cutia 40)*  
4. Din **Front**: între cutie și capac e un strat de aer de **0,5 mm** *(capacul e la 20,5)*

### 11) Complet — adâncitura și numele
1. **Cylinder** **12 · 12 · 5** → **Hole** · **L** cu capacul: mijloc pe stânga–dreapta și marginea din **față** · îl muți **6 mm spre față** *(centrul pe marginea capacului: taie o jumătate de cerc)* · ridicat la **19 mm** *(trece prin capac, care e între 20,5 și 23,5)* → **Ctrl+G** cu **capacul**  
2. **Text** cu numele tău *(lungime cel mult 30 mm)* → **Hole** · înălțime **2 mm** · **L** cu capacul: mijloc pe stânga–dreapta · îl muți la mijlocul capacului pe față–spate · ridicat la **22,5 mm** *(taie 1 mm din capac, care are 3)* → **Ctrl+G** cu capacul

---

## Greșeli frecvente
1. **Capacul și cutia s-au lipit** — le-ai grupat între ele. Desface și regrupează separat.  
2. **Știftul e lipit de capac** — gaura din capac nu e Hole sau nu e Ø5.  
3. **Articulațiile nu sunt culcate** — din Top se vede un cerc. Rotește 90°.  
4. **Articulațiile se ating** — golul între ele trebuie să fie 0,5 mm (13,5 față de 13).  
5. **Capacul atinge articulațiile cutiei** — capacul are 39,5 mm, nu 40.  
6. **Balamaua e jos** — axa trebuie la 21,5 mm în sus *(în capac)*.  
7. **Punțile nu ating cutia** — puntea trebuie să se lipească de peretele din spate.  
8. **Pereți subțiri** — 2,4 mm e bine; sub 1,2 mm nu se printează.

---

## De făcut azi — „Cutia cu balama”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Cutie 50·40·20 (pereți 2,4) · capac 50·39,5·3 · balama: 3 articulații + știft + punți · jocuri 0,5 · cutie și capac = grupuri separate |
| **Complet** | + adâncitură Ø12 + nume pe capac |

### Pasul 1 — Minim
- [ ] Cutie goală cu fund de 2 mm  
- [ ] Capac 50·39,5·3, la 20,5 mm  
- [ ] Articulația capacului Ø8·23 · știft Ø4·50 · 2 articulații Ø8·13  
- [ ] Punți · gaura Ø5 în articulația capacului  
- [ ] Două grupuri separate · verificat din **Right** și **Top**  

### Pasul 2 — Complet
- [ ] Adâncitura pentru deget  
- [ ] Numele pe capac  
- [ ] **Color** · numele `T5_L05` e corect  

---

## Bonus (extra — după Complet)
- [ ] O mică „limbă” care ține capacul închis: Box **8·2·4** pe fața din față *(pune-o astfel încât să nu atingă capacul: joc 0,5 mm)*  
- [ ] Un compartiment în cutie: perete **2·35·15**  
- [ ] Pe foaie: cum ai așeza cutia la printare? *(cu fundul în jos, balamaua culcată)*

## Recapitulare rapidă
1. Balama = știft + articulații cu **joc 0,5**  
2. Capacul și cutia = **două grupuri separate**  
3. Articulațiile sunt cilindri **culcați** (rotiți 90°)  
4. Verifici din **Right** și **Top**

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** cutie 50·40·20 − gol 45,2·35,2 · capac 50·39,5·3 (+20,5) · articulație capac Ø8·23 (x 13,5) + gaură Ø5·25 · știft Ø4·50 · articulații cutie Ø8·13 (x 0 și 37) · punți · 2 grupuri  
**Complet:** adâncitură Ø12 + nume

**Quiz scurt:**  
- De ce știftul e Ø4 și gaura Ø5?  
- De ce capacul are 39,5 și nu 40?  
- Ce se întâmplă dacă grupezi capacul cu cutia?

## Temă
Opțional: desenează pe foaie o balama pentru o ușă de dulap. Ce mărimi ai alege pentru știft și joc?
