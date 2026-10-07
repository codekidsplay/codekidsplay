# Lecția 4 — Bevel: cufărul cu comori
**Modulul 3 · Modificatori și materiale**  
**Code Maker Club · Modifier Maker**

> În realitate, nicio muchie nu e perfect ascuțită: lumina o „prinde” și o face să strălucească. Cu modificatorul **Bevel** rotunjești automat toate muchiile. Azi faci un **cufăr cu comori**.  
> Proiect: **„Cufărul meu”** · `Prenume_Nume_B3_L04.blend`

---

## Obiectiv
La finalul orei ai un cufăr cu capac rotunjit, benzi metalice, lacăt și monede de aur.  
**Minim:** cufăr din 2 piese (corp și capac) cu Bevel.  
**Complet:** Minim + **benzi**, **lacăt**, **monede** (cu Array) și materiale lemn + aur.

## De ce contează
Muchiile rotunjite fac obiectele să pară **reale** și prind lumina frumos. Bevel face acest lucru pe tot obiectul dintr-o singură setare.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 |
| 10–30 | Modificatorul Bevel |
| 30–75 | Corpul și capacul |
| 75–105 | Benzi, lacăt, monede |
| 105–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Modificatorul Bevel
**Add Modifier → Generate → Bevel.**

| Setare | Ce face |
|--------|---------|
| **Width** | cât de mare e rotunjirea |
| **Segments** | cât de neted (1 = teșit, 3 = rotund) |
| **Limit Method: Angle** | rotunjește doar muchiile „ascuțite” (cele peste 30°) |

Pentru majoritatea obiectelor: **Width 0.03**, **Segments 3**, **Limit Method: Angle**. Apoi **Shade Smooth**.

### 2) Corpul cufărului
1. Cubul: **Dimensions X 2, Y 1.2, Z 1**, **Z = 0.5**.  
2. **Bevel** cu setările de mai sus. **Shade Smooth**.

### 3) Capacul rotunjit
1. **Cylinder**: **Vertices = 32**, **Radius = 0.6**, **Depth = 2**.  
2. **R Y 90** (axa pe lungime). **Tab**, **Alt + Z**, selectează **jumătatea de jos** (vârfurile sub centru), **X → Vertices**. Rămâne o **jumătate de cilindru**.  
3. Pune-o deasupra corpului: **Z = 1** (și verifică din lateral).  
4. Adaugă **Solidify** (lecția 2), **Thickness 0.04**, ca să aibă grosime. Apoi **Bevel**. Capetele rămân deschise, dar Solidify le dă grosime.

### 4) Benzile metalice
- **Cube** subțire: **Dimensions X 0.12, Y 1.3, Z 1.02**, la **X = −0.6**. Duplică la **X = 0.6**.  
- Pe capac: două benzi curbe — jumătăți de **Torus** cu raza capacului (sau cilindri subțiri turtiți).  
- **Bevel** pe benzi.

### 5) Lacătul
- Un **Cube** mic (0.25 × 0.1 × 0.3) pe față, la mijloc, **Bevel**.  
- Gaura cheii: un **Cylinder** subțire + un **Cube**, ambele întunecate.

### 6) Monedele de aur
1. **Cylinder**: **Vertices = 24**, **Radius = 0.15**, **Depth = 0.03**.  
2. **Bevel**, material **aur**: galben, **Metallic 1**, **Roughness 0.25**.  
3. **Array**: **Count = 8**, **Constant Offset Z = 0.035** (stivă de monede).  
4. Fă 3 stive cu **Shift + D**, în locuri diferite, cu rotații diferite.  
5. Câteva monede **aruncate** pe lângă cufăr (rotite la unghiuri diferite).

### 7) Complet — materiale
| Piesă | Material |
|-------|----------|
| Corp, capac | **Lemn**: maro închis, Roughness 0.7 |
| Benzi, lacăt | **Metal**: gri-închis, Metallic 1, Roughness 0.4 |
| Monede | **Aur** |

### Dacă ai terminat devreme
- [ ] Capacul **întredeschis** (rotit cu **R X** în jurul balamalei)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Bevel-ul face „felii” ciudate** — scara nu e aplicată; **Ctrl + A → Scale**.  
2. **Rotunjiri inegale** — obiectele au scări diferite.  
3. **Nu se văd muchiile** — Width prea mic.  
4. **Capacul nu se potrivește** — verifică din lateral (**3**).  
5. **Randarea e lentă** — prea multe monede cu segmente; folosește 16 laturi.

---

## De făcut azi — „Cufărul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Corp + capac cu Bevel |
| **Complet** | Minim + benzi + lacăt + monede + materiale |

### Pasul 1 — Minim
- [ ] Corp și capac  
- [ ] Bevel pe ambele  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Benzi și lacăt  
- [ ] Monede cu Array  
- [ ] Lemn și aur  
- [ ] Numele `B3_L04` e corect

---

## Bonus
- [ ] O **hartă a comorii** (plan cu textură de hârtie, în L8)

## Recapitulare rapidă
1. **Bevel** = muchii rotunjite  
2. **Width + Segments + Angle**  
3. **Ctrl + A → Scale** înainte de Bevel  
4. **Metallic 1** pentru metal

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Modificatorul Bevel` → `Corpul cufărului` → `Capacul rotunjit` → `Benzile metalice` → `Lacătul` → `Monedele de aur` → `Complet — materiale`

## Mai departe *(opțional)*
Uită-te de aproape la o carte sau un telefon: marginile sunt rotunjite? Cât de mult?

## Quiz scurt
- De ce rotunjim muchiile?  
- Ce face Limit Method: Angle?  
- Ce valoare are Metallic la aur?

## Temă
Alege un obiect cu muchii ascuțite și unul cu muchii rotunjite și spune care pare mai realist și de ce.
