# Lecția 2 — Solidify: coșul și fereastra
**Modulul 3 · Modificatori și materiale**  
**Code Maker Club · Modifier Maker**

> O suprafață în 3D e **infinit de subțire**, ca o foaie. Cu modificatorul **Solidify** îi dai grosime, ca să fie un obiect real. Azi faci un **coș** și o **fereastră**.  
> Proiect: **„Coș și fereastră”** · `Prenume_Nume_B3_L02.blend`

---

## Obiectiv
La finalul orei ai un coș cu pereți groși și o fereastră cu ramă.  
**Minim:** coș dintr-un cilindru fără capac, cu Solidify.  
**Complet:** Minim + **împletitură** cu Wireframe + o **fereastră** cu ramă și geam.

## De ce contează
Multe obiecte sunt „cochilii”: cănile, cutiile, ferestrele, hainele. Solidify le dă grosime fără să muți manual fiecare punct.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1 |
| 10–40 | Solidify pe un plan |
| 40–75 | Coșul |
| 75–110 | Fereastra |
| 110–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Solidify pe un plan
1. Șterge cubul. **Shift + A → Mesh → Plane.**  
2. **Modifiers → Add Modifier → Generate → Solidify.**  
3. **Thickness = 0.2**: planul devine o placă.  
4. Schimbă **Offset** (−1, 0, 1): grosimea crește în sus, în ambele sensuri sau în jos.

### 2) Coșul
1. **Cylinder**: **Vertices = 24**, **Radius = 1**, **Depth = 1.5**, **Z = 0.75**.  
2. **Tab** → modul **Face** → click pe **fața de sus** → **X → Faces** (o ștergi). Coșul e deschis deasupra.  
3. **Ctrl + R** cu rotița: **3 tăieturi** orizontale.  
4. Selectează inelul de **sus** cu **Alt + click** pe muchie și **S 1.2** (coșul se lărgește sus). Inelul de jos: **S 0.8**.  
5. **Tab**. Adaugă **Solidify**: **Thickness 0.08**, **Offset −1** (grosimea crește spre interior).  
6. **Shade Smooth**. Maro deschis.

> Dacă pereții par „inversați”, în Edit Mode apasă **Alt + N → Recalculate Outside**.

### 3) Împletitura (Wireframe)
Pe o **copie** a coșului (**Shift + D**, click dreapta):

1. Șterge **Solidify** de pe copie.  
2. **Add Modifier → Generate → Wireframe**.  
3. **Thickness 0.03**: apare o plasă din bare.  
4. Pune copia în același loc cu originalul și fă-o puțin mai mare (**S 1.01**). Ascunde-o pe cea veche pentru comparație.

Mai poți combina: **un coș cu Solidify** pentru corp și **unul cu Wireframe** pentru decor.

### 4) Fereastra
1. **Plane**, rotit **R X 90** (în picioare), **Dimensions X 2, Z 3**.  
2. **Tab**. **I 0.2 Enter** (rama). Apoi **X → Faces** pe fața din mijloc (rămâne doar rama).  
3. **Tab**. **Solidify**: **Thickness 0.15**.  
4. Geamul: alt **Plane**, la același loc, **Dimensions 1.6 × 2.6**, un material **transparent** (L7 din acest modul).  
5. **Bară de mijloc**: **Cube** subțire (X 0.06, Y 0.1, Z 2.6). Duplică-l pe orizontală.

### 5) Complet — fereastra cu 4 geamuri
- Bara verticală + cea orizontală formează o cruce.  
- Selectează rama și bara (**Shift + click**), **Ctrl + J** (se unesc într-un obiect).  
- Material alb pentru ramă, albastru foarte deschis pentru geam.

### Dacă ai terminat devreme
- [ ] Un **mâner** pentru coș din Torus tăiat  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Coșul nu are grosime** — lipsește Solidify sau Thickness e 0.  
2. **Grosimea iese în afară** — Offset greșit; încearcă −1 sau 1.  
3. **Fețe întunecate** — normalele sunt inversate; **Alt + N → Recalculate Outside**.  
4. **Wireframe prea subțire** — mărește Thickness.  
5. **Rama nu e simetrică** — verifică Inset-ul (I 0.2).

---

## De făcut azi — „Coș și fereastră”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Coș cu Solidify |
| **Complet** | Minim + Wireframe + fereastră cu ramă și geam |

### Pasul 1 — Minim
- [ ] Cilindru fără capac  
- [ ] Solidify cu grosime potrivită  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Coș cu împletitură  
- [ ] Fereastră cu ramă, geam, bară  
- [ ] Numele `B3_L02` e corect

---

## Bonus
- [ ] Un **perete** cu fereastra tăiată (pregătire pentru lecția cu Boolean)

## Recapitulare rapidă
1. **Solidify** = grosime  
2. **Thickness** și **Offset**  
3. **Wireframe** = plasă din bare  
4. **Alt + N** repară normalele

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Solidify pe un plan` → `Coșul` → `Împletitura (Wireframe)` → `Fereastra` → `Complet — fereastra cu 4 geamuri`

## Mai departe *(opțional)*
Alege obiecte „goale” din casă (pahar, cutie, cană) și spune ce grosime ar avea pereții lor.

## Quiz scurt
- Ce face Solidify?  
- Ce schimbă Offset?  
- Cum faci o plasă din bare?

## Temă
Desenează un obiect „cochilie” (casă de melc, pălărie) și scrie ce modificator ai folosi.
