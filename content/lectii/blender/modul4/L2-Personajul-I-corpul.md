# Lecția 2 — Personajul I: corpul
**Modulul 4 · Proiecte 3D complete**  
**Code Maker Club · Blender Creator**

> Azi modelezi **corpul** monstrulețului: o formă rotundă, simetrică, cu picioare. Folosim tot ce știi: Subdivision, Mirror, Extrude, Proportional Editing.  
> Proiect: **„Blobi”** (partea I) · `Prenume_Nume_B4_L02.blend`

---

## Obiectiv
La finalul orei ai un corp rotund cu picioare și burtă, simetric.  
**Minim:** corp dintr-un cub cu Subdivision + picioare extrudate.  
**Complet:** Minim + **Mirror**, o **burtă** modelată cu Proportional Editing și **cap** integrat în corp.

## De ce contează
Un personaj bun are o **siluetă clară**. Dacă îl recunoști doar după umbra lui neagră, modelul e bun. Azi lucrezi la silueta lui Blobi.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1 · privim schița |
| 10–40 | Blocul de pornire și Mirror |
| 40–80 | Picioarele |
| 80–110 | Burta și silueta |
| 110–120 | Recap, galerie |

**Ce ai nevoie:** Blender 4.2 · fișierul din L1 (cu referințe)

---

## Pas cu pas

### 1) Pornim de la un cub
1. Șterge blocajul vechi sau ascunde-l (**H**).  
2. **Cube**, **Dimensions X 1.6, Y 1.2, Z 1.8**, **Z = 1.5** (stă cu picioarele sub el).  
3. **Alt + Z**, vederea din față (**1**) cu imaginea de referință vizibilă.

### 2) Jumătate de corp + Mirror
1. **Tab**, **Ctrl + R** vertical, la mijloc (click dreapta ca să rămână centrat).  
2. Selectează vârfurile din **stânga** și **X → Vertices**.  
3. **Tab**. **Add Modifier → Generate → Mirror**, **Clipping** bifat.  
4. Apoi **Subdivision Surface** (**Ctrl + 2**). Ordinea: **Mirror primul, Subdivision al doilea**.

Acum modelezi doar partea dreaptă și forma e rotundă.

### 3) Picioarele
1. **Tab**, modul **Face** (**3**), selectează fața de **jos**.  
2. **I 0.35** (inset), apoi **E Z −0.8** (primul segment), **S 0.7**, **E Z −0.3** (labă).  
3. Cu **Subdivision**, picioarele se rotunjesc singure.  
4. **Labele** ies puțin înainte: selectează fața de jos a piciorului și **G Y −0.3**.

> Dacă picioarele se unesc la mijloc, înseamnă că nu ai lăsat loc: mărește inset-ul (I 0.45).

### 4) Silueta: burta și capul
1. **O** (Proportional Editing). **Alt + Z**.  
2. Selectează vârfurile din față, de la mijloc, și **G Y −0.3** cu raza mare (rotița): ai o **burtă** bombată.  
3. Sus, selectează vârfurile din partea de sus și **G Z 0.2**: o creștere pentru **cap**.  
4. Încet, **S 0.9** pe zona gâtului, ca să se vadă capul față de corp.  
5. Verifică din lateral (**3**) cu imaginea de referință.

### 5) Verificarea siluetei
1. Pune materialul **negru** corpului (sau treci în **Solid → Flat → Single Color**).  
2. Dacă forma se recunoaște ca silueta lui Blobi, e bine.  
3. Compară cu schița din față și lateral, **Opacity 0.5**.

### 6) Complet — finisări de bază
- **Shade Smooth**.  
- **Ctrl + R** ca să adaugi detalii unde ai nevoie (la brațe, vezi lecția următoare).  
- Salvează o **copie**: `Prenume_Nume_B4_L02_v1.blend`.

### Dacă ai terminat devreme
- [ ] O **coadă** (extrudată din spate)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Mirror nu funcționează** — Clipping, sau vârfurile din centru au fost șterse.  
2. **Modificatorii în ordine greșită** — Subdivision înainte de Mirror dă o fisură la mijloc.  
3. **Corpul e „lipicios”** — prea puține vârfuri; adaugă un Loop Cut.  
4. **Picioarele sunt prea subțiri** — Inset prea mare.  
5. **Silueta nu seamănă cu schița** — compară din 2 vederi.

---

## De făcut azi — „Blobi” (I)

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Corp din cub + Subdivision + 2 picioare |
| **Complet** | Minim + Mirror + burtă + cap + siluetă verificată |

### Pasul 1 — Minim
- [ ] Corp rotund  
- [ ] Picioare  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Mirror + Subdivision în ordine corectă  
- [ ] Burtă și cap  
- [ ] Numele `B4_L02` e corect

---

## Bonus
- [ ] Un monstru „înalt și slab” și unul „scund și gras”

## Recapitulare rapidă
1. **Mirror → Subdivision** (în această ordine)  
2. Cub + Extrude = corp + picioare  
3. **Proportional Editing** = forme moi  
4. Silueta trebuie să fie clară

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Pornim de la un cub` → `Jumătate de corp + Mirror` → `Picioarele` → `Silueta: burta și capul` → `Verificarea siluetei` → `Complet — finisări de bază`

## Mai departe *(opțional)*
Fă o poză cu umbra unui obiect pe perete. Se recunoaște obiectul după umbră? La fel și un personaj.

## Quiz scurt
- Care e ordinea corectă: Mirror sau Subdivision?  
- Ce e o siluetă?  
- Cum faci picioarele?

## Temă
Desenează 3 siluete diferite de monstru și alege care ți se pare cea mai simpatică.
