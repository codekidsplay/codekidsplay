# Lecția 1 — Punte M5 + mișcare pe grilă
**Modulul 6 · Lume de cuburi · Block 1 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Nu e Minecraft oficial — proiect **CKP**.  
> Azi: **punte din M5** + eroul se mișcă **pătrat cu pătrat** (ex. 32×32), nu fluid ca în platformer.  
> Fișier pe tot modulul: `Prenume_Nume_M6_LumeCuburi`

---

## Obiectiv
La finalul orei eroul e pe o lume-grilă, pașii sunt **egali**, restart curat.  
**Minimum:** recap M5 bifată · erou pe 4 direcții cu pași de **32** (sau 40, dar **fix**) · ≥**12** blocuri pe scenă · steag = start.  
**Ținta orei (Complet):** Minim + grilă vizibilă **sau** aliniere perfectă pe celule + vedere aleasă (sus/lateral) notată pe foaie.

## De ce contează
În M5 ai săritură fluidă. Aici lumea e din **celule** — ca să spargi și să pui blocuri dreapte la L2–L3.  
Fără grilă azi, mâine blocurile „plutesc” strâmb.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–20 | **Punte M5:** variabile, detectare, clone, liste (pe tablă) |
| 20–35 | Ce e „lume de cuburi” 2D + schiță vedere + pas 32 |
| 35–100 | Motor grilă pe Scratch (vezi **Minim vs Complet**) |
| 100–120 | Demo + ce urmează la L2 (sparge) |

**Capitole:**  
<span style="color:#4C97FF;font-weight:700">Mișcare</span> (`schimbă x/y cu 32`) · <span style="color:#E6A800;font-weight:700">Evenimente</span> · <span style="color:#FFAB19;font-weight:700">Control</span> · <span style="color:#5CB1D6;font-weight:700">Detectare</span>

---

## Pas cu pas

### 1) Punte — ce trebuie din M5 *(obligatoriu)*
Cu profesorul, pe foaie:
- [ ] Variabilă pe **Scenă**  
- [ ] `dacă` + detectare (atingere / tastă)  
- [ ] Știi ce e o **clonă** (sau „vin la L2”)  
- [ ] Listă / inventar — ideea (detaliu la L4)  
- [ ] Steag = restart curat  

Dacă ceva lipsește → 10–15 min recuperare **înainte** de grilă.

**Încearcă tu — punte (5 min)**  
- [ ] 5 bifă de mai sus  

### 2) Design pe foaie
1. **Vedere:** de sus **sau** din lateral — o ții **tot** modulul  
2. **Pas** = `32` px (recomandat) — același pe x și y  
3. 2 tipuri de bloc (ex. lemn / piatră) — măcar pe desen  

**Încearcă tu — foaia (8 min)**  
- [ ] Vedere + pas notate  
- [ ] Schiță 8–12 celule  

### 3) Erou pe grilă *(Minim)*
1. Proiect nou → `Prenume_Nume_M6_LumeCuburi`  
2. Erou: la steag `du-te la` start aliniat (ex. x și y multipli de 32)  
3. În `forever`, 4× `dacă` tastă:  
   - dreapta → <span style="color:#4C97FF;font-weight:700">schimbă x cu</span> `32`  
   - stânga → `-32` · sus `+32` · jos `-32`  
4. Opțional: `așteaptă 0.15` după pas (ca să nu „teleportezi” prea tare)  
5. ≥**12** blocuri pe scenă (sprite-uri sau desenate pe fundal)

**Nu:** `schimbă x cu 10` fluid — azi e **salt pe celulă**.

**Încearcă tu — grilă (25–30 min)**  
- [ ] Pașii sunt egali pe toate direcțiile  
- [ ] Steag de 2 ori → același start  

### 4) Complet
Alege **cel puțin una**:  
- [ ] Grilă **vizibilă** (linii pe fundal / costume)  
- [ ] Eroul **nu** iese din limtele lumii (margini)  
- [ ] Notă pe foaie: „la L2 folosesc clone pentru blocuri sparte”

---

## Greșeli frecvente
1. **Pași inegali** (10 pe x, 32 pe y) — snap-ul de la L3 se strică.  
2. **Mișcare fluidă** — treci prin „jumătate de bloc”; Minim = salt 32.  
3. **Fără recap M5** — la L2–L4 te blochezi pe clone/variabile.  
4. **Prea puține blocuri** — Minim ≥12 pe scenă.  
5. **Reset lipsă** — al 2-lea steag lasă eroul aiurea.

---

## De făcut azi — „Lumea pe grilă”
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Punte M5 · pași 32 pe 4 direcții · ≥12 blocuri · restart |
| **Complet** | Minim + grilă vizibilă **sau** margini **sau** notă clone L2 |

### Pasul 1 — Punte + foaie
- [ ] Recap · vedere · pas 32  

### Pasul 2 — Minim
- [ ] Erou pe grilă · demo coleg  

### Pasul 3 — Complet
- [ ] Una din variante  

---

## Bonus
- [ ] Grilă 12×10 celule  
- [ ] Camera urmează eroul (blocuri/fundal opus) — doar dacă Minim e solid  

## Recapitulare rapidă
1. Cuburi = **celule**, nu platformer fluid  
2. Pas fix (32) tot modulul  
3. Același fișier până la L10

## Schema pe scurt *(pe tablă / pe foaie)*

**Erou**  
steag → `du-te la` start (multiplu de 32) → `forever` → `dacă` săgeți → `schimbă x/y cu 32`  

**Punte M5**  
variabile · `dacă` · clone (idee) · restart  

**Quiz scurt:**  
- De ce 32, nu 10?  
- Ce e diferit față de săritura din M5?  
- Ce fișier continui la L2?

## Temă
Opțional: încă 4 blocuri pe hartă. Urmează L2 = **sparge**.
