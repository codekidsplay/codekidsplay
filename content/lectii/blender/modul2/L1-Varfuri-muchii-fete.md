# Lecția 1 — Vârfuri, muchii, fețe
**Modulul 2 · Modelare în Edit Mode**  
**Code Maker Club · Mesh Modeler**

> Până acum ai mutat **obiecte întregi**. Azi intri **înăuntrul** lor și mișci chiar „oasele” unui model: vârfurile, muchiile și fețele.  
> Proiect: **„Cubul care se transformă”** · `Prenume_Nume_B2_L01.blend`

---

## Obiectiv
La finalul orei transformi un cub în **piramidă**, **rampă** și **diamant** doar mișcând părți din el.  
**Minim:** treci în Edit Mode, selectezi vârfuri, muchii și fețe și le muți.  
**Complet:** Minim + faci **piramida** (cu **Merge**), **rampa** și **diamantul**, fiecare pe un cub separat.

## De ce contează
Orice model 3D e o „plasă” (**mesh**) făcută din puncte, linii și suprafețe. Dacă înțelegi cele trei piese, poți modela orice formă.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap Modul 1 |
| 10–35 | Object Mode vs Edit Mode |
| 35–65 | Cele 3 moduri de selectare |
| 65–105 | Piramidă, rampă, diamant |
| 105–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Două moduri de lucru

| Mod | Ce muți | Tasta |
|-----|---------|-------|
| **Object Mode** | obiectul întreg | implicit |
| **Edit Mode** | piese din interiorul obiectului | **Tab** |

Selectează cubul și apasă **Tab**: apare o rețea portocalie. Apasă **Tab** din nou ca să ieși. În partea de sus-stânga a viewport-ului vezi numele modului.

### 2) Cele 3 piese ale unei plase

| Piesă | Ce e | Tasta pentru selectare |
|-------|------|------------------------|
| **Vertex** (vârf) | un punct | **1** |
| **Edge** (muchie) | o linie între 2 vârfuri | **2** |
| **Face** (față) | suprafața dintre mai multe muchii | **3** |

(Cifrele de sus ale tastaturii, în Edit Mode, nu cele de la numpad.)

Cubul are **8 vârfuri**, **12 muchii** și **6 fețe**. Numără-le!

### 3) Selectăm și mutăm
- **Click** pe o piesă → o selectează.  
- **Shift + click** → adaugă la selecție.  
- **G** → mută (cu **X / Y / Z** pentru axă).  
- **A** → selectează tot; **Alt + A** → deselectează tot.

> **Verifică:** apasă **Alt + Z** (X-ray) ca să vezi și piesele din spate.

### 4) Piramida
1. Pe un cub nou, **Tab** → modul **Face** (**3**).  
2. Click pe **fața de sus**.  
3. **S 0 Enter**: cele 4 vârfuri ajung în același loc. Pare piramidă!  
4. Dar sunt **4 vârfuri suprapuse**. Le unim: **M → At Center** (Merge).  
5. Ieși din Edit Mode cu **Tab**.

### 5) Rampa
1. Cub nou, **Tab**, modul **Edge** (**2**).  
2. Selectează **muchia de sus** din partea din față (cu **Alt + Z**, ca să o vezi mai ușor).  
3. **G Z −2 Enter**: muchia coboară și cubul devine o **pană/rampă**.

### 6) Diamantul
1. Cub nou, **Tab**, modul **Face**.  
2. Selectează fața de sus → **S 0.4 Enter**.  
3. Selectează fața de jos → **S 0.4 Enter**.  
4. Selectează vârfurile / fețele laterale și trage-le **în afară** cu **G** + axă. Încearcă și **Shade Smooth** (L5 din Modulul 1).

### Dacă ai terminat devreme
- [ ] Fă un **cort** (prismă): mută doar **muchia de sus** în sus și în lateral  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Mut obiectul, nu piesa** — ești în Object Mode; apasă **Tab**.  
2. **Selectez doar partea din față** — pornește X-ray (**Alt + Z**).  
3. **Cifrele schimbă vederea** — folosești cifrele numpad; în Edit Mode alege cifrele de sus.  
4. **Merge nu a mers** — ai uitat să selectezi toate vârfurile suprapuse.  
5. **Ai pierdut forma** — **Ctrl + Z**.

---

## De făcut azi — „Cubul care se transformă”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Edit Mode, selectez vârfuri, muchii, fețe, le mut |
| **Complet** | Minim + piramidă (cu Merge) + rampă + diamant |

### Pasul 1 — Minim
- [ ] Știu să intru și să ies din Edit Mode  
- [ ] Am mutat un vârf, o muchie, o față  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Piramidă cu **M → At Center**  
- [ ] Rampă  
- [ ] Diamant  
- [ ] Numele `B2_L01` e corect

---

## Bonus
- [ ] Fă un **zmeu** din plane și vârfuri

## Recapitulare rapidă
1. **Tab** = Object ↔ Edit  
2. **1 / 2 / 3** = vârf / muchie / față  
3. **Alt + Z** = X-ray  
4. **M → At Center** unește vârfuri

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Două moduri de lucru` → `Cele 3 piese ale unei plase` → `Selectăm și mutăm` → `Piramida` → `Rampa` → `Diamantul`

## Mai departe *(opțional)*
Ia un cub de jucărie și imaginează-ți ce ar fi dacă ai trage de un colț: ce formă ar apărea?

## Quiz scurt
- Câte vârfuri, muchii și fețe are un cub?  
- Cum treci în Edit Mode?  
- Ce face **M → At Center**?

## Temă
Desenează 3 forme noi care s-ar putea face dintr-un cub și scrie ce piese ai muta.
