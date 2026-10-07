# Lecția 4 — Personajul III: culori și poziție
**Modulul 4 · Proiecte 3D complete**  
**Code Maker Club · Blender Creator**

> Blobi are formă, dar e încă gri! Azi îi dai **culori și materiale**, îl **legi** ca să-l poți muta ca pe un întreg și îl pui într-o **poziție** simpatică (pose) pentru poză.  
> Proiect: **„Blobi”** (final) · `Prenume_Nume_B4_L04.blend` + `.png`

---

## Obiectiv
La finalul orei Blobi e colorat, în poziție de salut și randat în studio.  
**Minim:** corp colorat, ochi, gură, coarne.  
**Complet:** Minim + **textură de piele** (Noise + Bump), **legare** (parent), **poziție** de salut și o **randare** cu 3 lumini.

## De ce contează
Un personaj ajunge la public prin **poza finală**. Culoarea, poziția și lumina fac diferența dintre „model” și „personaj”.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 |
| 10–40 | Materiale și piele |
| 40–65 | Legarea pieselor |
| 65–90 | Poziția |
| 90–120 | Studio, randare, galerie |

**Ce ai nevoie:** Blender 4.2 · fișierul din L3

---

## Pas cu pas

### 1) Palete de culori
Alege **3 culori** care se potrivesc:

| Rol | Exemplu |
|-----|---------|
| **Principală** (corp) | verde mentă |
| **Secundară** (burtă, mâini) | verde-gălbui, mai deschis |
| **Accent** (coarne, limbă) | galben / roșu |

> Culori **calde** (roșu, portocaliu) = energie, **reci** (albastru, verde) = calm.

### 2) Materialele
| Piesă | Material |
|-------|----------|
| Corp | verde mentă, Roughness 0.5 |
| Burtă | verde deschis (fețe separate cu **Assign**) |
| Ochi | alb lucios; pupile negre |
| Gură | roșu închis |
| Coarne | crem, Roughness 0.3 |
| Dinți | alb |

Pentru burtă pe același obiect: adaugă un **al doilea slot** de material și **Assign** pe fețe (ca la rachetă).

### 3) Piele cu textură
Pe materialul corpului, în **Shader Editor** (lecția 8, Modulul 3):

1. **Noise Texture**, **Scale 80**, **Detail 6**.  
2. Leagă **Fac** într-un nod **Bump** (**Strength 0.15**), apoi **Normal** în Principled BSDF.  
3. Pielea are acum micro-denivelări, ca o piele fină.

### 4) Legarea pieselor (parent)
Blobi are corp, ochi, coarne, gură. Ca să-l muți odată:

1. Selectează **toate piesele** în afară de corp.  
2. **La final**, selectează **corpul** (activ).  
3. **Ctrl + P → Object**.  
4. Mută corpul: toate piesele merg după el.

Verifică în **Outliner**: piesele sunt în ierarhie sub corp.

### 5) Poziția (pose)
Fără schelet (asta e pentru animație), poți pune personajul într-o poziție **mutând și rotind părțile**:

1. **Brațul:** intră în Edit Mode pe corp, cu **Alt + Z** pornit. Selectează inelul de la **umăr** (unde începe brațul) și apasă **Shift + S → Cursor to Selected**.  
2. Selectează cu **Box** (**B**) toate vârfurile brațului, fără cele ale corpului. În antetul viewport-ului schimbă **Pivot** pe **3D Cursor**.  
   Acum **R Y −60** rotește brațul în jurul umărului. Pentru Blobi: mâna sus, ca la salut. La final, pune **Pivot** înapoi pe **Median Point**.  
3. **Capul** ușor înclinat: **R Y 8**.  
4. Un picior ușor ridicat: **G Z 0.15** + **R X −10**.

> Încearcă 2–3 poziții diferite și păstrează-o pe cea mai simpatică.

### 6) Studioul și randarea
- Folosește studioul din L9 (Modulul 3): fundal curbat, **Key + Fill + Rim**.  
- Camera la **60–85 mm**, personajul în treimea stângă.  
- **EEVEE**, 1920 × 1080, **F12**, salvează `Prenume_Nume_B4_L04.png`.

### Dacă ai terminat devreme
- [ ] Un **prieten** pentru Blobi, de altă culoare  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Culori prea multe** — menține 3 principale.  
2. **Burta nu se colorează separat** — lipsește slotul / Assign.  
3. **Piesele nu se mută împreună** — nu ai făcut Ctrl + P.  
4. **Poziția arată rigid** — rotește ușor capul și corpul.  
5. **Pielea e prea zgrunțuroasă** — Strength prea mare la Bump.

---

## De făcut azi — „Blobi” (final)

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Personaj colorat |
| **Complet** | Minim + piele + parent + poziție + randare în studio |

### Pasul 1 — Minim
- [ ] Palet de 3 culori  
- [ ] Toate piesele au material  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Textură de piele  
- [ ] Ctrl + P  
- [ ] Poziție de salut  
- [ ] Randare PNG  
- [ ] Numele `B4_L04` e corect

---

## Bonus
- [ ] O **umbră** pe podea și un balon în mână

## Recapitulare rapidă
1. Paletă de 3 culori  
2. Mai multe materiale pe un obiect cu **Assign**  
3. **Ctrl + P** leagă piesele  
4. Poziția spune povestea

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Palete de culori` → `Materialele` → `Piele cu textură` → `Legarea pieselor (parent)` → `Poziția (pose)` → `Studioul și randarea`

## Mai departe *(opțional)*
Alege un personaj de desene animate și identifică cele 3 culori principale ale lui.

## Quiz scurt
- Ce face Ctrl + P?  
- Cum dai două culori pe același obiect?  
- Care sunt culorile calde?

## Temă
Alege o paletă de 3 culori pentru un alt personaj (un dragon, un robot) și spune ce emoție transmit.
