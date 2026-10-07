# Lecția 8 — Stil low-poly
**Modulul 2 · Modelare în Edit Mode**  
**Code Maker Club · Mesh Modeler**

> **Low-poly** înseamnă modele cu puține fețe plate, ca niște bijuterii șlefuite. E un stil modern, folosit în jocuri și ilustrații. Azi faci **stânci și brazi** în acest stil.  
> Proiect: **„Pădurea low-poly”** · `Prenume_Nume_B2_L08.blend`

---

## Obiectiv
La finalul orei ai o mică pădure cu brazi și stânci, în stil low-poly.  
**Minim:** un brad și o stâncă cu fațete.  
**Complet:** Minim + **3 brazi diferiți**, **2 stânci** și **randare** cu umbre.

## De ce contează
Low-poly e **rapid de făcut** și arată bine chiar și fără detalii. Fiecare față are o culoare puțin diferită, ca la o piatră tăiată.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7 |
| 10–35 | Flat vs Smooth |
| 35–70 | Bradul |
| 70–100 | Stânca |
| 100–120 | Pădurea, recap, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Flat și Smooth

| Mod | Cum arată | Folosim la |
|-----|-----------|------------|
| **Shade Smooth** | suprafață fină, rotundă | personaje, cești, fructe |
| **Shade Flat** | fețele plate, vizibile | low-poly |

În Object Mode: **click dreapta → Shade Flat**. Pentru low-poly avem nevoie de **Flat**.

### 2) Bradul low-poly
1. **Cone**: **Vertices = 6**, **Radius = 1.2**, **Depth = 1.5**, **Z = 2**.  
2. **Shift + D**, mută copia în sus: **G Z 0.8**, apoi **S 0.8**.  
3. Încă o copie: **G Z 0.8**, **S 0.7**. Ai 3 niveluri.  
4. **Trunchi**: **Cylinder** (Vertices 6, Radius 0.2, Depth 1), la **Z = 0.5**.  
5. **Shade Flat** pe toate.  
6. Materiale: **verde** pe conuri, **maro** pe trunchi.

> Varierea mărimii și a rotației face brazii „vii”. Fă 3 brazi: unul înalt, unul mic, unul lat.

### 3) Stânca low-poly
1. **Shift + A → Mesh → Ico Sphere**: **Subdivisions = 1**, **Radius = 1**.  
2. **Tab**, modul **Vertex**. **A** (selectează tot).  
3. **S X 1.3**, **S Z 0.7** (mai lată decât înaltă).  
4. **Alt + A**, apoi alege vârfurile aleatoriu, pe rând, și mută-le puțin: **G** + mișcă mouse-ul într-o direcție nouă. Câteva „colțuri” fac stânca realistă.  
5. Cu **O** (Proportional Editing) pornit și raza mică, tragi câte o „umflătură”.  
6. **Shade Flat**, material gri-albăstrui, **Roughness 1**.

### 4) Pădurea
1. Un **plan** mare ca pământ, verde închis, **Z = 0**.  
2. **Shift + D** pe brazi, în locuri diferite; **R Z** cu valori diferite; **S** de la 0.6 la 1.3.  
3. 2 stânci mari, alta mai mică, lângă brazi.  
4. **Sun** cu **Strength 3**, culoare caldă, într-un unghi care dă umbre.

### 5) Complet — „decimare” (opțional)
Pentru a simplifica un model cu prea multe fețe:

1. Modificator **Decimate** (Generate → Decimate).  
2. **Ratio** 0.2–0.5.  
3. **Apply** (Ctrl + A pe modificator) când ești mulțumit.

### Dacă ai terminat devreme
- [ ] O **ciupercă** (cilindru + con aplatizat)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Suprafața e prea netedă** — Shade Smooth rămas; treci pe **Shade Flat**.  
2. **Brazii arată identic** — variază mărimea și rotația.  
3. **Stânca e un balon** — mută vârfurile mai mult, nu doar scalezi.  
4. **Umbrele lipsesc** — lumină Sun și vederea Rendered / randare.  
5. **Prea multe fețe** — folosește Cone cu 6–8 laturi, nu 32.

---

## De făcut azi — „Pădurea low-poly”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Un brad și o stâncă low-poly |
| **Complet** | Minim + 3 brazi, 2 stânci, randare cu umbre |

### Pasul 1 — Minim
- [ ] Brad din 3 conuri + trunchi  
- [ ] Stâncă din Ico Sphere  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Shade Flat peste tot  
- [ ] Pădure cu variații  
- [ ] Randare PNG  
- [ ] Numele `B2_L08` e corect

---

## Bonus
- [ ] Un **lac** de formă neregulată

## Recapitulare rapidă
1. **Low-poly** = puține fețe, plate  
2. **Shade Flat** pentru fațete  
3. Variază mărimea și rotația  
4. Ico Sphere (subdiv 1) = stâncă

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Flat și Smooth` → `Bradul low-poly` → `Stânca low-poly` → `Pădurea` → `Complet — „decimare” (opțional)`

## Mai departe *(opțional)*
Caută „low poly art” pe internet și observă cum arată scenele din jocuri.

## Quiz scurt
- Ce înseamnă low-poly?  
- Ce alegi: Smooth sau Flat?  
- Cum faci o stâncă din Ico Sphere?

## Temă
Alege un animal și gândește-te cum l-ai face din 20 de fețe.
