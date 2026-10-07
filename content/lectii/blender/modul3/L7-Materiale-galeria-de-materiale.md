# Lecția 7 — Materiale: galeria de materiale
**Modulul 3 · Modificatori și materiale**  
**Code Maker Club · Modifier Maker**

> Același obiect poate părea din **plastic**, **sticlă**, **aur**, **cauciuc** sau **lumină**. Azi înveți câteva „rețete” de materiale și faci o galerie cu 6 sfere.  
> Proiect: **„Galeria de materiale”** · `Prenume_Nume_B3_L07.blend`

---

## Obiectiv
La finalul orei ai 6 sfere cu materiale diferite, pe care le poți reutiliza.  
**Minim:** 4 materiale: plastic, cauciuc, aur, sticlă.  
**Complet:** Minim + material **luminos**, material **ceramic** + toate **denumite** și randate într-o galerie.

## De ce contează
Materialul decide dacă un model pare real. O sferă simplă poate fi o minge, o perlă, un bec sau o planetă, doar schimbând câteva valori.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6 |
| 10–30 | Setările Principled BSDF |
| 30–90 | Cele 6 rețete |
| 90–110 | Galeria și randarea |
| 110–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Principled BSDF
Materialul standard din Blender se numește **Principled BSDF**. Setările lui principale:

| Setare | Ce schimbă |
|--------|------------|
| **Base Color** | culoarea |
| **Metallic** | 0 = nemetal, 1 = metal |
| **Roughness** | 0 = lucios, 1 = mat |
| **Transmission** (Weight) | cât de transparent e (sticlă) |
| **IOR** | cât „îndoaie” lumina (sticla ≈ 1.45) |
| **Emission** | face materialul să strălucească |

### 2) Scena galeriei
1. Un **Plane** mare ca podea (S 12), gri deschis.  
2. 6 **UV Sphere** (Radius 1), în șir, **X = −7.5, −4.5, −1.5, 1.5, 4.5, 7.5**; **Shade Smooth**.  
3. **Sun** + **Area**, cameră în față, **Rendered**.

### 3) Rețetele

| # | Material | Setări |
|---|----------|--------|
| 1 | **Plastic roșu** | Color roșu · Metallic 0 · Roughness 0.25 |
| 2 | **Cauciuc negru** | Color negru · Metallic 0 · Roughness 0.9 |
| 3 | **Aur** | Color (1, 0.77, 0.3) · Metallic 1 · Roughness 0.2 |
| 4 | **Sticlă** | Transmission 1 · Roughness 0 · IOR 1.45 |
| 5 | **Bec / neon** | Color alb · **Emission Strength 5** |
| 6 | **Ceramică albastră** | Color albastru · Metallic 0 · Roughness 0.1 |

**Sticla:** dacă arată opacă, în **Properties → Render** activează **Raytracing** (EEVEE) sau folosește **Cycles**.

### 4) Cum creezi fiecare
1. Selectezi sfera.  
2. **Properties → Material → New**.  
3. **Numele** materialului (dublu click): `Plastic`, `Cauciuc`, `Aur`, `Sticla`, `Neon`, `Ceramica`.  
4. Reglezi valorile din tabel.  
5. Verifici în **Rendered**.

> **Sfat:** denumirile bune te ajută să-ți găsești materialele mai târziu: **Browse Material** (lângă nume) îți arată lista lor.

### 5) Complet — galeria
- Fiecare sferă are un **mic suport** (cilindru) sub ea.  
- **Camera** priveste de la nivelul podelei, ușor în sus.  
- **Randare** 1920 × 1080: salvează `Prenume_Nume_B3_L07.png`.

### 6) Reutilizarea materialelor
Materialele sunt salvate în fișier. În alt proiect: **File → Append → fișierul → Material → alege**. Așa îți construiești o **bibliotecă** proprie.

### Dacă ai terminat devreme
- [ ] **Lemn lăcuit** (maro, Roughness 0.3) și **piatră** (gri, Roughness 1)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Sticla arată ca plastic** — lipsește Raytracing sau Transmission.  
2. **Metalul e negru** — lipsește ceva de reflectat; adaugă podea și lumini.  
3. **Neonul nu luminează** — Strength prea mic, sau randare în Solid.  
4. **Materialele se schimbă pe alte obiecte** — folosesc același material; fă-l unic (butonul cu cifra).  
5. **Culori șterse** — Roughness prea mare.

---

## De făcut azi — „Galeria de materiale”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 4 materiale: plastic, cauciuc, aur, sticlă |
| **Complet** | Minim + neon + ceramică + nume + randare |

### Pasul 1 — Minim
- [ ] 4 sfere cu materiale diferite  
- [ ] Rendered mod  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] 6 sfere denumite  
- [ ] Galerie cu suporturi  
- [ ] Randare PNG  
- [ ] Numele `B3_L07` e corect

---

## Bonus
- [ ] Un material **semitransparent** (Alpha 0.5)

## Recapitulare rapidă
1. **Principled BSDF**: culoare, metal, rugozitate  
2. **Sticlă** = Transmission + IOR  
3. **Emission** = lumină proprie  
4. **Append** reutilizează materiale

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Principled BSDF` → `Scena galeriei` → `Rețetele` → `Cum creezi fiecare` → `Complet — galeria` → `Reutilizarea materialelor`

## Mai departe *(opțional)*
Alege 5 obiecte din jur și scrie rețeta lor: ce Metallic, ce Roughness, ce culoare?

## Quiz scurt
- Ce valoare are Metallic la plastic?  
- Ce face Emission?  
- Ce setări îți trebuie pentru sticlă?

## Temă
Fă o „carte de rețete” cu 5 materiale: nume, culoare, Metallic, Roughness.
