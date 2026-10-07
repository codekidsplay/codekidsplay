# Lecția 5 — Loop Cut: cana de ceai
**Modulul 2 · Modelare în Edit Mode**  
**Code Maker Club · Mesh Modeler**

> **Loop Cut** adaugă un inel nou de muchii în jurul unui obiect. Cu el controlezi forma cu mult mai multă libertate. Azi faci o **cană de ceai** cu toartă.  
> Proiect: **„Cana mea”** · `Prenume_Nume_B2_L05.blend`

---

## Obiectiv
La finalul orei ai o cană cu interior gol, buza rotunjită și toartă.  
**Minim:** cilindru golit cu Inset + Extrude în jos.  
**Complet:** Minim + **Loop Cut** pentru a-i da forma, **Bevel** la buză și **toartă** dintr-un Torus.

## De ce contează
Un cilindru simplu are doar fețe sus și jos. Cu **Loop Cut** adaugi inele la mijloc și poți face cana mai lată la mijloc, vaza mai îngustă la gât, sticla…

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4 |
| 10–40 | Loop Cut |
| 40–75 | Cana: golul și forma |
| 75–105 | Toarta |
| 105–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Loop Cut (Ctrl + R)
În Edit Mode, mouse peste obiect:

| Pas | Cum |
|-----|-----|
| 1 | **Ctrl + R** — apare o linie **magenta** (previzualizare) |
| 2 | mută mouse-ul ca să alegi direcția (ea urmează muchiile) |
| 3 | **rotița** = câte tăieturi (3 tăieturi → 3 inele) |
| 4 | **click stânga** = confirmi poziția, apoi **click dreapta** ca să rămână **exact la mijloc** (altfel o poți glisa) |

### 2) Pregătim cana
1. Șterge cubul, adaugă un **Cylinder**: **Vertices = 32**, **Radius = 1**, **Depth = 2**, **Z = 1** (stă pe podea).  
2. **Tab**. **Ctrl + R** → 2 tăieturi orizontale.  
3. Ai acum 3 benzi de fețe.

### 3) Forma
Cana e puțin mai lată la mijloc:

1. Modul **Edge** (**2**). **Alt + click** pe inelul din mijloc (selectează tot inelul).  
2. **S 1.15 Enter** (mărești inelul).

### 4) Golul
1. Modul **Face** (**3**). Click pe fața **de sus** (cercul).  
2. **I 0.12 Enter** (grosimea peretelui).  
3. **E Z −1.7 Enter** — extrudezi în jos, adânc, aproape de fund (lași **0.3** gros).

Ar trebui să vezi un interior gol, ca la o cană adevărată.

### 5) Buza rotunjită
1. Selectează muchiile de la **marginea de sus** (interior + exterior), cu **Alt + click**.  
2. **Ctrl + B**, ~0.04, rotița pe 3 segmente.

### 6) Toarta din Torus
1. **Shift + A → Mesh → Torus.** În panoul din stânga-jos: **Major Radius 0.5**, **Minor Radius 0.09**.  
2. **R X 90** (în picioare), apoi **S X 0.7**.  
3. Mută-l lângă cană: **Location X = 1.15**, **Z = 1.2**.  
4. Verifică din față (**1**): jumătate din Torus intră în cană, iar cealaltă jumătate iese.

### 7) Complet — finisare
- **Shade Smooth** pe cană și pe toartă.  
- Material alb ceramic (Roughness 0.2) pentru cană; poți adăuga o culoare diferită pentru interior (material nou pentru fețele interioare, cu **Assign**, în lecția 10).  
- Mută cana într-un colț și adaugă un **Plane** drept „masă”.

### Dacă ai terminat devreme
- [ ] O **farfurioară** (cilindru aplatizat, cu un inset)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Loop Cut nu apare** — ești în Object Mode; **Tab**.  
2. **Tăietura e pe direcția greșită** — mută mouse-ul spre altă muchie înainte să dai click.  
3. **Fundul cănii e tăiat** — extrude mai puțin (E Z −1.5).  
4. **Toarta nu se prinde** — mut-o puțin mai aproape (X = 1.0).  
5. **Cana e „colțuroasă”** — lipsește Shade Smooth sau Bevel.

---

## De făcut azi — „Cana mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Cilindru golit cu Inset + Extrude |
| **Complet** | Minim + Loop Cut pentru formă + Bevel la buză + toartă |

### Pasul 1 — Minim
- [ ] Cilindru cu 32 laturi  
- [ ] Interior gol  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Loop Cut + scalare inel  
- [ ] Bevel la buză  
- [ ] Toartă  
- [ ] Numele `B2_L05` e corect

---

## Bonus
- [ ] O **vază** cu gât îngust (scalează inelul de sus mai mic)

## Recapitulare rapidă
1. **Ctrl + R** = inel nou de muchii  
2. **Alt + click** selectează un inel  
3. **I** + **E negativ** = gol  
4. **Torus** = toartă simplă

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Loop Cut (Ctrl + R)` → `Pregătim cana` → `Forma` → `Golul` → `Buza rotunjită` → `Toarta din Torus` → `Complet — finisare`

## Mai departe *(opțional)*
Alege 3 obiecte rotunde din bucătărie și spune câte inele (Loop Cut) ar trebui ca să le modelezi.

## Quiz scurt
- Ce scurtătură face Loop Cut?  
- Cum golești un obiect?  
- Ce piesă folosim pentru toartă?

## Temă
Desenează o vază interesantă și marchează la ce înălțimi ai pune inelele de Loop Cut.
