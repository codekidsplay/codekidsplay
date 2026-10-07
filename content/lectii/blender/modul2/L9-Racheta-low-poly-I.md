# Lecția 9 — Racheta low-poly I
**Modulul 2 · Modelare în Edit Mode**  
**Code Maker Club · Mesh Modeler**

> Începem proiectul modulului: o **rachetă** low-poly. Azi modelezi **forma ei**: corpul, vârful ascuțit, aripioarele și duza motorului.  
> Proiect: **„Racheta mea”** (partea I) · `Prenume_Nume_B2_L09.blend`

---

## Obiectiv
La finalul orei ai o rachetă cu proporții bune, gata de colorat.  
**Minim:** corp cilindric cu vârf conic.  
**Complet:** Minim + **4 aripioare**, **duză de motor** și un **hublou** adâncit în corp.

## De ce contează
Racheta pare complicată, dar e făcută din **forme simple**: un cilindru, un con și câteva fețe trase în afară. Aici folosești împreună Loop Cut, Extrude, Inset și Scale.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8 · schița rachetei |
| 10–35 | Corpul |
| 35–60 | Vârful |
| 60–90 | Aripioarele |
| 90–110 | Duza și hublou |
| 110–120 | Recap, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Proporțiile
Racheta are **corp lung** și **vârf ascuțit**:

| Parte | Valoare |
|-------|---------|
| Corp (înălțime) | 3 |
| Raza corpului | 0.6 |
| Vârf | cam 1.5 înălțime |
| Aripioare | ies ~0.8 în afară |

### 2) Corpul
1. Șterge cubul (**X**).  
2. **Shift + A → Mesh → Cylinder**. În panoul din stânga jos (**Adjust Last Operation**) pune **Vertices 12, Radius 0.6, Depth 3**.  
3. În **N → Item**, **Location Z = 1.5**: baza rachetei e acum la **Z = 0**.  
4. **Shade Flat** (look low-poly).

### 3) Tăieturile pentru detalii
1. **Tab**, **Alt + Z**.  
2. **Ctrl + R** (cu mouse-ul pe o față laterală) și pune **2 inele orizontale** cu rotița, apoi **Enter** și **click dreapta** ca să rămână la locul lor. Pune-le aproximativ la **Z 0.8** și **Z 2.2**.  
3. Ai acum 3 benzi: **jos** (aripioare), **mijloc** (hublou), **sus** (vârf).

### 4) Vârful
1. Treci pe modul **Face** (**3**) și selectează fața de **sus**.  
2. **E Z 0.8 Enter**, apoi **S 0.6 Enter**.  
3. **E Z 0.8 Enter**, apoi **S 0.15 Enter**.  
4. Vârful e acum un con, dar încă are o fețișoară sus. Ca să se închidă: **M → At Center**.

### 5) Cele 4 aripioare
Cilindrul are 12 fețe laterale. Alegem **4** dintre ele, la distanță egală.

1. Treci în vederea de sus (**Numpad 7**), **Alt + Z** pornit.  
2. În banda de **jos**, selectează o față laterală, apoi **a treia față** de la ea, apoi încă una, încă una (Shift + click): ai ales **4 fețe**, la 90° una de alta.  
3. **Alt + E → Extrude Individual Faces**, apoi **0.8 Enter**. Fiecare iese separat, în afară.  
4. **Pentru formă înclinată:** cu cele 4 fețe de capăt selectate, **G Z −0.5** și **S Z 0.5**: aripioarele se înclină și se micșorează spre exterior.

> Ai greșit fețele? **Ctrl + Z** și alege din nou, numărând: față aleasă, 2 sărite, față aleasă.

### 6) Duza motorului
1. Selectează fața de **jos**.  
2. **I 0.3 Enter** (inset), apoi **E Z −0.4 Enter**.  
3. **S 1.3 Enter**: duza se lărgește.  
4. **I 0.25 Enter**, apoi **E Z 0.3 Enter**: gaura din duză intră în interior.

### 7) Hublou (Complet)
1. În banda din **mijloc**, selectează o față laterală, în partea din față (spre −Y).  
2. **I 0.12 Enter**, apoi **E −0.05 Enter**: hublou adâncit.  
3. Încă o inset mai mică (**I 0.1**) pentru un cerc în cerc, dacă vrei.

### 8) Verificarea formei
Ieși din Edit Mode (**Tab**). Privește racheta din **față (1)**, **dreapta (3)** și **sus (7)**.

| Verifică | Da / Nu |
|----------|---------|
| Vârful e ascuțit și centrat? | |
| Aripioarele sunt la 90° unele de altele? | |
| Duza se vede dedesubt? | |
| Hublou pe corp? | |

### Dacă ai terminat devreme
- [ ] O rachetă **groasă** (de jucărie) și una **subțire** (de film)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Aripioarele sunt strâmbe** — ai ales fețe care nu sunt la distanță egală.  
2. **Aripioarele ies foarte groase** — au fost extrudate ca grup, nu individual (folosește **Alt + E**).  
3. **Vârful rămâne turtit** — nu ai făcut **M → At Center**.  
4. **Racheta intră în pământ** — origin-ul e la centru; ridică-o (Z).  
5. **Hublou prea mare** — scade inset-ul.

---

## De făcut azi — „Racheta mea” (partea I)

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Corp + vârf conic |
| **Complet** | Minim + 4 aripioare + duză + hublou + verificare din 3 vederi |

### Pasul 1 — Minim
- [ ] Cilindru cu 12 laturi  
- [ ] Vârf conic  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] 4 aripioare egale  
- [ ] Duză  
- [ ] Hublou  
- [ ] Numele `B2_L09` e corect

---

## Bonus
- [ ] **Două trepte**: un al doilea cilindru mai lat, la bază

## Recapitulare rapidă
1. Corp = cilindru (12 laturi)  
2. **E + S** = vârf conic  
3. **Alt + E** = fețe extrudate individual  
4. **I + E** = duză și hublou

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Proporțiile` → `Corpul` → `Tăieturile pentru detalii` → `Vârful` → `Cele 4 aripioare` → `Duza motorului` → `Hublou (Complet)` → `Verificarea formei`

## Mai departe *(opțional)*
Caută poze cu rachete reale. Câte aripioare au? Ce formă are vârful?

## Quiz scurt
- Ce face **Alt + E**?  
- Cum închizi vârful conului?  
- De ce folosim 12 laturi și nu 32?

## Temă
Desenează o rachetă din lateral și marchează unde ai pune cele 2 Loop Cut-uri.
