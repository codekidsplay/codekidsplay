# Lecția 7 — Zaruri personalizate
**Modulul 3 · Creativ și mecanic**  
**Code Maker Club · Motion Maker**  
**Vârstă:** ~8–10 ani

> Azi faci un **zar** pe care punctele sunt la locul lor și **fețele opuse dau mereu 7**.  
> Proiect: **„Zarul meu”** · `Prenume_Nume_T3_L07`

---

## Obiectiv
La finalul orei ai un **zar** cub **40 × 40 × 40** cu puncte pe toate cele **6 fețe**.  
**Minim:** punctele sunt găuri rotunde **Ø6**, adânci de **2 mm** · **1** opus lui **6**, **2** opus lui **5**, **3** opus lui **4** · toate punctele aranjate simetric, la **10 mm** unul de altul.  
**Complet:** Minim + un **al doilea zar** în altă culoare + verificarea că fiecare pereche de fețe dă **7**.

## De ce contează
Într-un zar, **fețele opuse dau 7**: 1+6, 2+5, 3+4. Așa nu poate fi „încărcat”.  
Ca să pui punctele exact, faci câte o **pereche de fețe** odată, într-un singur Group de Hole-uri, și o rotești la locul ei.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6 · privim un zar real: ce număr e opus lui 1? |
| 10–30 | Pas cu pas: cubul · un punct · perechea 1–6 |
| 30–100 | Perechile 2–5 și 3–4 · Minim → Complet → Bonus |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Box** · **Cylinder** · **Hole** · **Align** (**L**) · **Snap Grid 1 / 5 mm** · **Ctrl+D** · **rotire 90°** · **conul negru** · **Ctrl+G** · **View Cube**

---

## Pas cu pas

### 1) Proiect nou și cubul
1. **Create new design** · nume `Prenume_Nume_T3_L07`  
2. Snap Grid: **1.0 mm** *(pentru adâncimi)*  
3. **Box** → **40 · 40 · 40**

### 2) Un punct
1. **Cylinder** → **6 · 6 · 4** → **Hole**  
2. Îl pui deasupra cubului: **L** cu cubul → mijloc pe cele două direcții de pe plan și punctul de **sus**  
3. Îl ridici cu conul negru cu **2 mm** — taie 2 mm adâncime în fața de sus și iese afară  
4. Snap Grid: **5.0 mm** *(pentru mutări de 10 mm; rămâne așa până la sfârșit)*

### Unde pui punctele *(față de centrul feței, în mm: dreapta/stânga, spate/față)*

| Număr | Puncte |
|-------|--------|
| 1 | (0, 0) |
| 2 | (−10, −10) · (10, 10) |
| 3 | (−10, −10) · (0, 0) · (10, 10) |
| 4 | (−10, −10) · (−10, 10) · (10, −10) · (10, 10) |
| 5 | cele 4 colțuri de la „4” + (0, 0) |
| 6 | (−10, −10) · (−10, 0) · (−10, 10) · (10, −10) · (10, 0) · (10, 10) |

*(Orice punct nou: **Ctrl+D** pe un punct, apoi îl muți cu Snap Grid 5.0 mm — 2 sărituri = 10 mm.)*

### 3) Perechea 1–6 (sus 1, jos 6)
1. Punctul din pasul 2 = fața **1** (în centru)  
2. Pentru fața **6** (jos): **Ctrl+D** → copia o cobori cu conul negru cu **40 mm** (8 sărituri) — ajunge la **−2 mm**, taie 2 mm în fața de jos  
3. Îl muți **10 mm** spre stânga și **10 mm** spre față (2 sărituri fiecare) — primul punct din colț  
4. **Ctrl+D** → muți **10 mm** spre spate → al doilea punct  
5. **Ctrl+D** → încă **10 mm** spre spate → al treilea punct  
6. Selectezi cele trei puncte → **Ctrl+D** → muți copiile **20 mm** spre dreapta → 6 puncte jos  
7. Selectezi **cele 7 puncte** (1 sus + 6 jos) → **Ctrl+G** — o „pereche” de găuri într-un singur Group  
8. Din **Front**: un punct sus, șase jos  
9. Muți perechea **60 mm deoparte** pe plan, ca să nu te încurce — o aduci la loc la pasul 6

### 4) Perechea 2–5
1. Un punct nou **6 · 6 · 4** (Hole), făcut ca în pasul 2 (sus, +2 mm — Snap Grid 1.0 la ridicare, apoi **5.0** la loc)  
2. Fața de sus = **2**: pui punctele din tabel (Ctrl+D + mutare)  
3. Fața de jos = **5**: aceleași puncte, copiate și coborâte cu **40 mm** (8 sărituri), la pozițiile din tabel  
4. Selectezi cele 7 puncte → **Ctrl+G** — perechea 2–5  
5. Rotești grupul **90°** (4 pași de câte 22,5°, săgeata curbă care îl culcă) — acum cele două fețe sunt **stânga** și **dreapta**  
6. Muți perechea **60 mm deoparte**, în altă direcție

### 5) Perechea 3–4
1. Sus = **3** și jos = **4**, după tabel, făcute ca la perechea 2–5  
2. Selectezi cele 7 puncte → **Ctrl+G**  
3. Rotești 90° pe **cealaltă** săgeată curbă — fețele sunt acum **față** și **spate**  
4. Muți perechea **60 mm deoparte**, în altă direcție

### 6) Zarul gata
1. Selectezi **cubul și toate cele 3 perechi** (4 obiecte) → **L** → mijloc pe cele **trei** direcții, **o singură dată** *(așa nu rămâne nicio pereche în urmă)*  
2. Selectezi **cubul** și cele **3 perechi** → **Ctrl+G**  
3. Rotești vederea: 1 opus 6, 2 opus 5, 3 opus 4  
4. Adunate două câte două: **7**

### 7) Complet — al doilea zar
1. Zarul → **Ctrl+D** → muți copia **60 mm** lateral  
2. **Color**: un zar o culoare, celălalt alta  
3. Spui pe rând: 1+6, 2+5, 3+4 → toate dau 7

---

## Greșeli frecvente
1. **Punctele nu se văd** — Hole-ul nu iese în afară sau n-ai dat Group.  
2. **Punctele sunt prea adânci** — Hole-ul e prea jos; 2 mm adâncime e bine.  
3. **Perechea nu a ajuns pe fețele laterale** — n-ai rotit grupul sau nu ai centrat toate piesele cu **L**.  
4. **Două fețe cu același număr** — ai rotit aceeași pereche de două ori. Verifică toate cele 6 fețe.  
5. **Punctele ies din față** — mai mult de 10 mm de centru. Păstrează 10 mm.  
6. **Am grupat punctele cu cubul prea devreme** — grupează întâi cele 7 puncte între ele, apoi cu cubul.  
7. **Suma nu dă 7** — ai pus 3 opus lui 5. Perechile sunt 1–6, 2–5, 3–4.

---

## De făcut azi — „Zarul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Cub 40 · 6 fețe cu puncte Ø6 adânci 2 mm · perechile 1–6, 2–5, 3–4 · puncte la 10 mm |
| **Complet** | + al doilea zar în altă culoare + verificat: toate perechile dau 7 |

### Pasul 1 — Minim
- [ ] Cub **40·40·40**  
- [ ] Perechea 1–6 (Group de Hole-uri)  
- [ ] Perechea 2–5, rotită pe fețele laterale  
- [ ] Perechea 3–4, rotită pe față și spate  
- [ ] **Ctrl+G** pe cub și cele 3 perechi · toate cele 6 fețe corecte  

### Pasul 2 — Complet
- [ ] Al doilea zar, mutat 60 mm  
- [ ] Culori diferite · numele `T3_L07` e corect  
- [ ] Verificat: 1+6, 2+5, 3+4 = 7  

---

## Bonus (extra — după Complet)
- [ ] Rotunjește colțurile cubului: click pe cub și caută în panoul **Shape** setarea **Radius** (dacă există)  
- [ ] Un zar cu **litere** în loc de puncte (Text Hole)  
- [ ] Un **zar cu 8 fețe** desenat pe foaie: ce perechi dau 9?

## Recapitulare rapidă
1. Fețe opuse = **7**  
2. O pereche = un Group de Hole-uri, rotit la locul lui  
3. Punctele: **Ø6**, adâncime **2 mm**, distanță **10 mm**  
4. **Ctrl+G** final, cu cubul

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** cub 40 → punct Hole 6·6·4 (+2) → pereche 1–6 (Group) · 2–5 (Group, 90°) · 3–4 (Group, 90° cealaltă) → Group cu cubul  
**Complet:** al doilea zar · culori · verificare 7

**Quiz scurt:**  
- Ce număr e opus lui 2?  
- De ce grupăm cele 7 puncte înainte să le rotim?  
- Câți mm adâncime au punctele?

## Temă
Opțional: pe foaie, desenezi „desfășurarea” zarului (o cruce din 6 pătrate) și treci punctele pe fiecare față, cu suma 7 pe opuse.
