# Lecția 6 — Căsuța din cuburi
**Modulul 1 · Primii pași în Blender**  
**Code Maker Club · Blender Starter**

> Azi construiești o **căsuță** cu pereți, acoperiș, ușă și ferestre, folosind forme simple, duplicare și lipire pe grilă (**snap**).  
> Proiect: **„Căsuța mea”** · `Prenume_Nume_B1_L06.blend`

---

## Obiectiv
La finalul orei ai o căsuță cu proporții bune, cu piesele așezate exact.  
**Minim:** corp (cub), acoperiș (con cu 4 laturi), ușă și o fereastră.  
**Complet:** Minim + 2–4 ferestre identice (duplicate) + horn + **pământ** + folosești **snap**.

## De ce contează
Clădirile din jocuri și filme se fac exact așa: **forme simple**, așezate precis. Snap-ul te ajută să nu pierzi timp cu mutări „din ochi”.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 |
| 10–35 | Corpul și acoperișul |
| 35–70 | Ușa și ferestrele |
| 70–95 | Snap și duplicare |
| 95–120 | Horn, pământ, recap, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Corpul casei
Cubul de start e mare de **2×2×2**. Îl transformi într-o căsuță mai lată:

1. Selectează cubul.  
2. **S X 1.5 Enter** (mai lat), **S Y 1.2 Enter** (mai adânc).  
3. **G Z 1 Enter** — acum **sta pe podea** (Z = 1, jumătate din înălțime).  
4. În **N → Item → Dimensions** vezi dimensiunile (X = 3, Y = 2.4, Z = 2).

### 2) Acoperișul — un con cu 4 laturi
1. **Shift + A → Mesh → Cone.**  
2. În panoul din stânga-jos: **Vertices = 4**, **Radius = 2.2**, **Depth = 1.6**.  
3. Un con cu 4 laturi e o **piramidă**, dar e rotită cu 45°. Rotește-o: **R Z 45 Enter**, apoi îngustează-o în adâncime: **S Y 0.8 Enter**.  
4. Pune-o deasupra casei: **Location Z = 2 + 0.8 = 2.8**.  
5. Dacă acoperișul e prea mic sau mare, scalează-l din **S**.

> **Truc:** vezi dimensiunea acoperișului în **N → Dimensions** și fă-o puțin **mai mare** decât corpul, ca streașina să iasă în afară.

### 3) Ușa
1. **Shift + A → Mesh → Cube**. În **N → Item → Dimensions** scrie: X 0.8, Y 0.1, Z 1.6.  
2. Pune-o pe fața din față a casei: **Location X = 0, Y = −1.25, Z = 0.8** (peretele din față e la Y = −1.2).  
3. Vezi din față (**1**): ușa e centrată pe casă?

### 4) Ferestrele
- Un cub mic: Dimensions X 0.6, Y 0.1, Z 0.6, la **X = 0.9**, **Y = −1.25**, **Z = 1.3**.  
- **Shift + D → click dreapta** și apoi **G X −1.8 Enter**: a doua fereastră, simetrică.  
- Ținem ferestrele **puțin ieșite** din perete, ca să se vadă.

### 5) Snap — lipire exactă
Snap = „magnet” care te ajută să muți exact pe grilă sau pe alte obiecte.

| Ce faci | Cum |
|---------|-----|
| Pornești / oprești snap | **Shift + Tab** (sau butonul cu magnet din bara de sus) |
| Snap pe **grilă** | alege „Increment” în meniul magnetului |
| Snap pe **muchii / vârfuri** | alege „Vertex” și mută obiectul spre un vârf |

Încearcă: pornește snap-ul, apasă **G** pe fereastră și apropie-o de colțul unui perete.

### 6) Complet — horn și pământ
- **Horn:** un cub (Dimensions X 0.4, Y 0.4, Z 1.0) pe acoperiș, **X = 0.8**, **Z = 3**.  
- **Pământ:** **Shift + A → Mesh → Plane**, **S 8 Enter**. Se așază la **Z = 0**.  
- Verifică casa din toate vederile (**1, 3, 7**).

### Dacă ai terminat devreme
- [ ] Un **gard** din cuburi subțiri  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Casa „plutește”** — corpul nu e la **Z = jumătate din înălțime**.  
2. **Acoperișul e „în romb”** — lipsește rotația de 45°.  
3. **Ușa intră în perete** — Y trebuie să iasă puțin în afara peretelui.  
4. **Ferestrele nu sunt simetrice** — verifică valorile X (+0.9 și −0.9).  
5. **Snap-ul sare unde nu vrei** — oprește-l cu **Shift + Tab**.

---

## De făcut azi — „Căsuța mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Corp, acoperiș, ușă, o fereastră |
| **Complet** | Minim + ferestre duplicate + horn + pământ + snap |

### Pasul 1 — Minim
- [ ] Casa stă pe podea  
- [ ] Acoperișul e centrat  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] 2–4 ferestre simetrice  
- [ ] Horn pe acoperiș  
- [ ] Pământ  
- [ ] Numele `B1_L06` e corect

---

## Bonus
- [ ] O casă mai complexă: două etaje

## Recapitulare rapidă
1. Dimensions (N) arată mărimea reală  
2. Con cu 4 vertices + **R Z 45** = acoperiș  
3. **Shift + D** duplică, **G** mută  
4. **Snap** ajută la precizie

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Corpul casei` → `Acoperișul — un con cu 4 laturi` → `Ușa` → `Ferestrele` → `Snap — lipire exactă` → `Complet — horn și pământ`

## Mai departe *(opțional)*
Fotografiază o casă din cartierul tău și încearcă să o refaci simplu, cu aceleași proporții.

## Quiz scurt
- De ce rotim acoperișul cu 45°?  
- Cum faci o fereastră identică?  
- Ce face Snap?

## Temă
Desenează casa visurilor tale cu 3 piese noi (garaj, turn, verandă) și scrie ce forme de bază ai folosi.
