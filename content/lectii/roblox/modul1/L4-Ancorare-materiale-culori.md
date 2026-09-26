# Lecția 4 — Ancorare, materiale, culori
**Modulul 1 · Place Builder**  
**Code Kids Play · Roblox Studio**

> Azi Parts-urile tale **stau pe loc** la Play și arată diferit: **material** + **culoare**.  
> Place: același `Prenume_Nume_M1`

---

## Obiectiv
La finalul orei folosești **Anchored** (buton + Properties), **Material** și **Color** / **BrickColor** ca să diferențiezi zonele pe Obby.  
**Minimum:** toate Parts-urile importante sunt **ancorate** · ≥**2** Parts cu **culoare** diferită.  
**Ținta orei (Complet):** Minim + ≥**2** **materiale** diferite (ex. Plastic / Grass / Wood / Metal) + o convenție vizuală scurtă (ex. verde = sigur, roșu = „atenție” — doar decor, fără script).

## De ce contează
Fără Anchor, construcția se prăbușește.  
Fără culoare/material, Obby-ul e o mare de gri — greu de citit start, trepte, finish (L6).

**Azi tot fără cod.** „Roșu = pericol” e doar **semn vizual** pentru jucător; logica vine în M2.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–8 | Obiectiv + de ce cad Parts |
| 8–35 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 35–100 | Look pe Place (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi pe ecran:** Anchor · Properties → Anchored · Material · Color.  
*(Transparency / CanCollide pe îndelete = Bonus.)*

---

## Pas cu pas

### 1) Anchor — două locuri, același efect
1. Selectezi un Part  
2. **Varianta A:** Home → **Edit** → **Anchor** (buton)  
3. **Varianta B:** Properties → **Anchored** = bifă (true)  

Verificare: **Play** — Part-ul **nu** cade · **Stop**.

*Obicei:* după fiecare Part nou → imediat Anchor (sau selectezi mai multe + Anchor).

**Încearcă tu — Anchor (2–3 min)**  
- [ ] Ai verificat în Properties că **Anchored** e pe Parts-urile tale  
- [ ] Play → nimic important nu cade  
- [ ] Dacă ceva cade: Stop → Anchor → Play din nou  

### 2) Color — se vede de departe
1. Selectezi un Part  
2. Home → **Color** (sau Properties → **BrickColor** / **Color**)  
3. Alegi o culoare clară (nu gri pe gri)  
4. Idei de start (poți schimba mai târziu):  
   - Spawn / start → **verde** sau albastru deschis  
   - Trepte → **gri** / maro  
   - Un Part „special” → **galben**  

**Încearcă tu — culori (3 min)**  
- [ ] ≥2 Parts au culori **diferite**  
- [ ] Se văd clar în Viewport fără să te apropii lipit de ele  

### 3) Material — „din ce e făcut”
1. Selectezi un Part  
2. Home → **Material** (sau Properties → **Material**)  
3. Încerci 2–3 din listă, ex.:  
   - **Plastic** — default, curat  
   - **Grass** / **Ground** — „iarba” / pământ  
   - **Wood** — lemn  
   - **Metal** / **Concrete** — industrial  

Materialul schimbă **aspectul** (reflexii, textură). Poți combina cu Color.

**Încearcă tu — materiale (3–4 min)**  
- [ ] Ai schimbat Material pe ≥1 Part  
- [ ] (Complet) Ai **≥2** materiale diferite pe Place  
- [ ] Salvat  

### 4) Convenție vizuală scurtă *(Complet)*
Alegi o regulă și o aplici pe 3–4 Parts:

| Culoare / material | Semnificație (doar vizual azi) |
|--------------------|--------------------------------|
| Verde | zonă **sigură** / start |
| Galben | **atenție** / punct important |
| Roșu | „nu e ideal să stai” (decor — **nu** te omoară încă) |

Scrie regula pe o foaie sau într-un Part redenumit `NotaVizuala` (opțional).

**Încearcă tu — convenție (2–3 min)**  
- [ ] Poți spune cu vocea regula ta (ex. „verde = start”)  
- [ ] Cel puțin 3 Parts respectă regula  
- [ ] Play → arată unui coleg · Stop  

---

## Greșeli frecvente
1. **Am colorat, dar la Play tot cade** — culoarea ≠ Anchor.  
2. **Am selectat Baseplate din greșeală** — o faci toată verde/grasă; Undo dacă e nevoie.  
3. **Culori prea apropiate** — nu se citesc; alege contrast.  
4. **Material „Neon” peste tot** — doare ochii; 1–2 accente ajung.  
5. **Am crezut că roșu omoară** — azi **nu**; kill = script (M2+).  

---

## De făcut azi — „Look pe Place”
Salvat: `Prenume_Nume_M1`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Parts importante **ancorate** + ≥**2** culori diferite |
| **Complet (ținta orei)** | Minim + ≥**2** materiale + **convenție vizuală** (3+ Parts) |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Stabil
- [ ] Play: construcția stă pe loc  
- [ ] Anchored verificat pe trepte / platforme

### Pasul 2 — Culori *(Minim)*
- [ ] ≥2 culori clare  
- [ ] Salvat  

**→ Minim când:** Place-ul nu mai e „tot gri” și nu se prăbușește.

### Pasul 3 — Material + regulă *(Complet)*
- [ ] ≥2 materiale  
- [ ] Regulă vizuală aplicată  
- [ ] Play · Stop · salvat  

**Gata Complet când:** un coleg înțelege din culori unde e „start” / „cale” fără să îi explici mult.

---

## Bonus (dacă ai terminat Complet)
- [ ] Properties → **Transparency** (0.3–0.5) pe un Part „fantomă”  
- [ ] **CanCollide** = false pe un Part decorativ (treci prin el) — apoi true înapoi dacă te-ai încurcat  
- [ ] Un Part **Neon** doar ca accent pe finish-ul viitor  

## Recapitulare rapidă
1. **Anchored** = stă · verifici cu Play  
2. **Color** = se citește de departe  
3. **Material** = textură / look  
4. Convenție vizuală = ajutor pentru Obby, nu încă logică  
5. Place: `Prenume_Nume_M1`  

**Quiz scurt (cu profesorul):**  
- Unde bifezi Anchored, pe lângă butonul Anchor?  
- De ce folosim culori pe Obby?  
- Materialul schimbă fizica sau aspectul? *(aspectul)*

## Temă
Opțional: aplici convenția pe încă **1** Part.  
La **L5** — cameră + Playtest mai atent.
