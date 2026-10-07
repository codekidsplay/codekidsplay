# Lecția 1 — Roți dințate simple
**Modulul 3 · Creativ și mecanic**  
**Code Maker Club · Motion Maker**  
**Vârstă:** ~8–10 ani

> Azi faci **două roți cu dinți** care se „mușcă” una în alta, pe axe, la distanța potrivită.  
> Proiect: **„Angrenajul meu”** · `Prenume_Nume_T3_L01`  
> *Roțile reale au dinți curbați — pe ei îi facem în Modulul 5. Azi dinții sunt simpli, dar ideea e aceeași.*

---

## Obiectiv
La finalul orei ai o **placă** cu două **pivoturi** (axe) și **două roți dințate** puse pe ele, cu dinții care intră unii între alții.  
**Minim:** roată cu **8 dinți** (disc Ø40 + dinți de 8 mm) cu gaură Ø8 în mijloc · placă **120 × 64 × 4** cu 2 pivoturi Ø6 la **50 mm** unul de altul · a doua roată **rotită cu 22,5°** · roțile stau pe pivoturi, **separate** de placă.  
**Complet:** Minim + a treia roată, în șir + culori diferite + știi în ce sens se învârte fiecare.

## De ce contează
Roțile dințate **transmit mișcarea**: dacă învârți una, se învârte și vecina — dar **în sens invers**.  
Ca să se potrivească, dinții unei roți trebuie să intre în **golurile** celeilalte. De aceea a doua roată se rotește **o jumătate de pas**.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap M2 · privim roți dințate (poză sau desen) |
| 10–45 | Pas cu pas: o roată · copierea și rotirea ei · pivoturile · placa |
| 45–100 | Minim → Complet (a treia roată, culori) → Bonus |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Cylinder** · **Box** · **Hole** · **Align** (**L**) · mărimi cu numere · **Ctrl+D** (repetă și rotirea) · **rotire** (săgeata curbă, 22,5° pe pas) · **conul negru** · tasta **D** · **Ctrl+G** / **Ctrl+Shift+G** · **View Cube**

---

## Pas cu pas

### 1) Proiect nou
1. **Create new design** · nume `Prenume_Nume_T3_L01`  
2. Snap Grid: **1.0 mm**  
*Atenție la **Align**: mută **ambele** piese spre mijlocul lor. Ca piesa veche să rămână pe loc, trage forma nouă **peste** ea înainte de **L**.*

### 2) Discul și dinții
1. **Cylinder** → **40 · 40 · 6** *(discul roții)*  
2. **Box** → **56 · 6 · 6** *(o „bară” de dinți: capetele ies afară și devin dinți)*  
3. Selectezi bara și discul → **L** → mijloc pe cele **două** direcții de pe plan și punctul de **jos**  
4. Bara trece prin centru și iese **8 mm** în fiecare parte → doi dinți

### 3) Toți cei 8 dinți
1. Selectezi **bara** → **Ctrl+D**  
2. Rotești copia **45°** (2 pași de câte 22,5° pe săgeata curbă)  
3. **Ctrl+D** din nou — repetă aceeași rotire → a treia bară  
4. **Ctrl+D** încă o dată → a patra bară  
5. Rezultat: 4 bare la 0°, 45°, 90°, 135° → **8 dinți** egal depărtați

### 4) Gaura din mijloc și Group
1. **Cylinder** → **8 · 8 · 10** → **Hole**  
2. **Ctrl+A** (discul, cele 4 bare și gaura) → **L** → mijloc pe cele **trei** direcții  
3. **Ctrl+G** — prima roată → apeși **D** (stă pe plan)  
4. View Cube → **Top**: 8 dinți, gaura în centru

### 5) A doua roată
1. Selectezi roata → **Ctrl+D**  
2. Rotești copia **22,5°** (un singur pas) — acum are **gol** acolo unde prima are **dinte**  
3. Snap Grid: **5.0 mm**  
4. O muți **50 mm** spre dreapta (10 sărituri de câte 5 mm)  
5. Din **Top**: dinții primei roți intră în golurile celei de-a doua și invers

### 6) Pivoturile
1. Snap Grid: **1.0 mm**  
2. **Cylinder** → **6 · 6 · 16** → îl tragi **peste** prima roată și îl așezi cu **L** pe centrul ei (mijloc pe cele două direcții de pe plan)  
3. **Ctrl+D**, copia o tragi peste a doua roată și o aliniezi la fel cu **L**  
4. Pivotul e mai subțire (6) decât gaura (8): roata se poate învârti pe el — **joc de 1 mm pe parte**

### 7) Placa
1. **Box** → **120 · 64 · 4**  
2. Selectezi **cele două roți** și **cele două pivoturi** → **Ctrl+G** *(temporar, doar ca să centrezi)*  
3. Selectezi placa și acest grup → **L** → mijloc pe cele două direcții de pe plan  
4. Selectezi grupul → **Ctrl+Shift+G** — piesele sunt din nou separate, dar rămân centrate pe placă  
5. Selectezi **cele două pivoturi** și **placa** → **Ctrl+G** — placa are pivoturi

### 8) Roțile stau pe pivoturi
1. Selectezi **cele două roți** (Shift+click)  
2. Le ridici cu **conul negru** cu **5 mm** — stau deasupra plăcii, nu lipite de ea  
3. View Cube → **Front**: între placă și roți e un gol mic; pivoturile trec prin roți

### 9) Complet — a treia roată
1. Snap Grid: **5.0 mm**  
2. A treia roată = **copia primei roți** (nu a celei rotite), mutată la **100 mm** de ea (20 sărituri) — are aceeași orientare ca prima și e **deja ridicată cu 5 mm**, ca prima  
3. **Cylinder** **6 · 6 · 16** nou → îl tragi peste a treia roată → **L** pe centrul ei (doar cele două direcții de pe plan)  
4. Din **Front**: toate cele trei roți sunt la aceeași înălțime  
5. Placa cu pivoturi → **Ctrl+Shift+G** (le separi), plăcii îi pui lungimea **170**  
6. Selectezi **cele trei roți** și **cele trei pivoturi** → **Ctrl+G** *(temporar)* → cu placa → **L** → mijloc pe direcția lungă → **Ctrl+Shift+G** pe grupul temporar  
7. Selectezi placa și **cele trei pivoturi** → **Ctrl+G**  
8. **Color**: câte o culoare pe roată

---

## Greșeli frecvente
1. **Dinții se ating cap la cap** — a doua roată nu e rotită cu 22,5°. Rotește-o.  
2. **Roțile se calcă una pe alta** — distanța dintre pivoturi e prea mică. Păstrează **50 mm**.  
3. **Roțile sunt prea departe** — se văd goluri mari între dinți. Mută a doua roată înapoi la 50 mm.  
4. **Dintele e doar pe o parte** — bara nu e centrată. Selectezi bara și discul, **L**, mijloc pe ambele direcții.  
5. **Roata e prinsă de placă** — n-ai ridicat-o cu 5 mm sau ai dat Group cu placa. Roțile rămân **separate**.  
6. **Gaura nu trece** — Hole-ul nu a fost grupat. **Ctrl+A** pe roată, apoi **Ctrl+G**.  
7. **Am grupat tot** — **Ctrl+Shift+G** și refaci doar ce trebuie: roțile separate, pivoturile cu placa.

---

## De făcut azi — „Angrenajul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 2 roți cu 8 dinți (a doua rotită 22,5°) + gaură Ø8 · placă 120·64·4 cu 2 pivoturi la 50 mm · roțile separate, ridicate 5 mm |
| **Complet** | Minim + a treia roată + culori + știi sensurile |

### Pasul 1 — Minim
- [ ] Roată: disc **40·40·6** + 4 bare **56·6·6** rotite din 45° în 45°  
- [ ] Gaură **8·8·10** în centru · **Ctrl+A** → **Ctrl+G**  
- [ ] A doua roată: copie rotită **22,5°**, la **50 mm**  
- [ ] Pivoturi **6·6·16** pe centrele roților  
- [ ] Placă **120·64·4**, pivoturile grupate cu ea, roțile ridicate cu 5 mm  

### Pasul 2 — Complet
- [ ] A treia roată la 100 mm de prima, placa **170** centrată pe cele trei roți  
- [ ] Culori diferite · numele `T3_L01` e corect  
- [ ] Spui: dacă prima se învârte **spre dreapta**, a doua se învârte **spre ____**, a treia spre **____**  

---

## Bonus (extra — după Complet)
- [ ] O roată **mai mică** (Ø30, 6 dinți) alături de una mare: care se învârte mai repede?  
- [ ] O **manivelă**: un Box lung, lipit de prima roată  
- [ ] Un capac mic (Ø12 × 2) pe fiecare pivot, ca roata să nu iasă

## Recapitulare rapidă
1. Roțile vecine se învârt în **sens invers**  
2. A doua roată se rotește cu **jumătate de pas** (22,5° la 8 dinți)  
3. Distanța dintre axe = **50 mm**  
4. Pivotul e mai subțire decât gaura = **joc**

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Cylinder 40·40·6 + 4 bare 56·6·6 (45°) − Hole 8 → Group → copie + 22,5° + 50 mm → pivoturi 6·6·16 → placă 120·64·4 → roți +5 mm  
**Complet:** + roata 3 la 100 mm · culori

**Quiz scurt:**  
- De ce a doua roată se rotește cu 22,5°?  
- Dacă prima roată se învârte spre dreapta, încotro se învârte a doua?  
- Cu cât e mai subțire pivotul decât gaura? De ce?

## Temă
Opțional: desenezi pe foaie un șir de **4** roți. Marchezi cu săgeți sensul fiecăreia (prima spre dreapta).
