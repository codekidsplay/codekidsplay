# Lecția 5 — Omulețul de zăpadă
**Modulul 1 · Primii pași în Blender**  
**Code Maker Club · Blender Starter**

> Azi îți faci primul **personaj**: un omuleț de zăpadă, din sfere, cilindri și conuri, cu suprafață netedă și piese care se mișcă împreună.  
> Proiect: **„Omulețul meu”** · `Prenume_Nume_B1_L05.blend`

---

## Obiectiv
La finalul orei ai un omuleț complet, cu **corp, cap, nas, ochi, pălărie și nasturi**.  
**Minim:** 3 sfere suprapuse + nas + 2 ochi.  
**Complet:** Minim + **Shade Smooth** + pălărie + nasturi + **legat într-un grup** (parent), ca să-l muți ca pe un întreg.

## De ce contează
Personajele se construiesc din piese simple, așezate cu grijă. Aici înveți și 2 trucuri importante: **netezirea** suprafeței și **legarea** pieselor.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4 |
| 10–50 | Corp, cap, nas, ochi |
| 50–75 | Shade Smooth |
| 75–100 | Pălărie, nasturi, brațe |
| 100–120 | Legare, recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start (cubul de start îl ștergi)

---

## Pas cu pas

### 1) Pornim curat
**File → New → General**, apoi **X → Delete** pe cub.

### 2) Corpul din 3 sfere
Adaugă **Shift + A → Mesh → UV Sphere** de 3 ori și așază-le (valorile sunt sugestii):

| Piesă | Scale | Location Z |
|-------|-------|-----------|
| **Jos** | 1.2 | 1.2 |
| **Mijloc** | 0.9 | 3.0 |
| **Cap** | 0.6 | 4.4 |

Cum le scalezi: **S** → numărul → **Enter**. Locul: **N** → Location Z.

> Sferele trebuie să **se atingă ușor** și să se suprapună puțin. Verifică din față (**1**).

### 3) Nasul — morcovul
1. **Shift + A → Mesh → Cone.**  
2. În panoul din stânga-jos setează: **Radius 0.15**, **Depth 0.8**, **Rotation X = 90°**. Vârful conului arată acum spre față (spre −Y).  
3. Mută-l la **Location**: X = 0, **Y = −0.9**, **Z = 4.4**. Baza intră puțin în cap, iar vârful iese în față.  
4. Verifică din dreapta (**3**): nasul iese din „față”?

### 4) Ochii și nasturii
- **UV Sphere** mică: **S 0.08**. Locație ochi: **X = ±0.2**, **Y = −0.52**, **Z = 4.6**. Fă unul, duplică-l (**Shift + D**) și schimbă semnul lui X.  
- Nasturii: 3 sfere mici (**S 0.1**) pe mijloc: **X = 0**, **Y = −0.88**, **Z = 3.3, 3.0 și 2.7**.

### 5) Shade Smooth — suprafață netedă
Sferele arată „cu fațete”. Le netezești:

1. Selectează o sferă (sau toate, cu **A**).  
2. **Click dreapta → Shade Smooth** (sau din meniul **Object → Shade Smooth**).  
3. Compară: rotunjimile sunt acum fine.

### 6) Pălăria
- **Cylinder** (Radius 0.5, Depth 0.7) pentru corpul pălăriei, la **Z = 5.35**.  
- Un al doilea **Cylinder** plat (Radius 0.8, Depth 0.08) ca boruri, la **Z = 5.0**.

### 7) Brațele (crengi)
**Cylinder** subțire (Radius 0.05, Depth 1.5), rotit **R Y 60** și pus pe lateral. Duplic-o pentru celălalt braț.

### 8) Complet — legăm totul (parent)
Vrei să muți omulețul întreg dintr-o mișcare. Soluția: **părinte și copii**.

1. Selectează **toate piesele mici** (ochi, nas, pălărie…) cu **Shift + click**.  
2. La final, **Shift + click** pe **sfera de jos** (ea devine „activă”, deci părintele).  
3. Apasă **Ctrl + P → Object**.  
4. Acum, când muți sfera de jos cu **G**, toate piesele merg după ea!  
5. În **Outliner** vezi piesele „ascunse” sub părinte, ca într-o ierarhie.

### Dacă ai terminat devreme
- [ ] Un **fular** din Torus în jurul gâtului  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Omulețul „se desface” când îl muți** — nu ai făcut Ctrl + P.  
2. **Părintele nu e ultimul selectat** — selectează părintele la sfârșit.  
3. **Sferele sunt colțuroase** — lipsește Shade Smooth.  
4. **Nasul arată în sus sau înăuntru** — verifică **Rotation X = 90°** și privește din dreapta (**3**).  
5. **Ochii nu sunt simetrici** — folosește valori X egale cu semn opus (0.2 și −0.2).

---

## De făcut azi — „Omulețul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 3 sfere + nas + 2 ochi |
| **Complet** | Minim + Shade Smooth + pălărie + nasturi + legare |

### Pasul 1 — Minim
- [ ] Corp din 3 sfere  
- [ ] Nas și ochi  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Toate sferele netezite  
- [ ] Pălărie, nasturi, brațe  
- [ ] Piesele sunt legate cu Ctrl + P  
- [ ] Numele `B1_L05` e corect

---

## Bonus
- [ ] Un al doilea omuleț, mic, ca „fiu”

## Recapitulare rapidă
1. Personajele = **forme simple** puse cap la cap  
2. **Shade Smooth** netezește aspectul  
3. **Ctrl + P** leagă piese (părinte + copii)  
4. **Shift + D** duplică, apoi mută

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Pornim curat` → `Corpul din 3 sfere` → `Nasul — morcovul` → `Ochii și nasturii` → `Shade Smooth — suprafață netedă` → `Pălăria` → `Brațele (crengi)` → `Complet — legăm totul (parent)`

## Mai departe *(opțional)*
Caută poze cu oameni de zăpadă și observă proporțiile: care e cea mai mare sferă? Poți schimba stilul (mai gras, mai înalt).

## Quiz scurt
- Ce face **Shade Smooth**?  
- Ce piesă trebuie selectată **ultima** când faci Ctrl + P?  
- Cum faci un ochi simetric?

## Temă
Fă un desen cu un alt personaj (om de ciocolată, robot) și scrie din ce forme de bază l-ai construi.
