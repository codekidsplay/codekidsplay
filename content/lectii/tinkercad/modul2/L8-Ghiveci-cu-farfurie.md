# Lecția 8 — Ghiveci cu farfurie
**Modulul 2 · Obiecte utile**  
**Code Maker Club · Object Maker**  
**Vârstă:** ~8–10 ani

> Azi faci **două piese care lucrează împreună**: ghiveciul și farfuria care prinde apa.  
> Proiect: **„Ghiveciul meu”** · `Prenume_Nume_T2_L08`

---

## Obiectiv
La finalul orei ai un **ghiveci** cu gaură de scurgere și o **farfurie** în care ghiveciul **încape**. Sunt două piese separate.  
**Minim:** ghiveci **Ø60 × 50** gol (pereți 3 mm, fund 3 mm) cu **gaură de scurgere Ø8** în fund + farfurie **Ø78 × 12** goală (pereți 3 mm, fund 3 mm) · ghiveciul stă în farfurie.  
**Complet:** Minim + **guler** (inel decorativ) la marginea ghiveciului + **Ruler** (spațiu între ghiveci și farfurie) + culori diferite.

## De ce contează
Un obiect real are **părți care depind una de alta**: farfuria trebuie să fie **mai largă** decât ghiveciul, ca să-l primească și să prindă apa.  
Gaura de scurgere lasă apa să iasă din ghiveci în farfurie.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7 · ne uităm la un ghiveci real: unde ajunge apa? |
| 10–45 | Pas cu pas: ghiveciul · scurgerea · farfuria · potrivirea |
| 45–100 | Minim → Complet (guler, Ruler, culori) → Bonus |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Cylinder** · **Hole** · **Align** (**L**) · mărimi cu numere · **conul negru** · **Ctrl+A** · **Ctrl+G** · **Ctrl+Shift+G** · **View Cube** · **Ruler** · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. **Create new design** · nume `Prenume_Nume_T2_L08`  
2. Snap Grid: **1.0 mm**

### 2) Ghiveciul — exterior și gol
1. **Cylinder** → **60 · 60 · 50**  
2. Alt **Cylinder** → **54 · 54 · 50** → **Hole**  
3. Selectezi Hole-ul și ghiveciul → **L** → **mijloc** pe ambele direcții de pe plan. Apoi ridici Hole-ul cu **3 mm**, folosind **conul negru** (fund de 3 mm; Hole-ul iese deasupra)  
4. **Ctrl+A** → **Ctrl+G**

### 3) Gaura de scurgere
1. **Cylinder** → **8 · 8 · 10** → **Hole**  
2. Selectezi gaura și ghiveciul → **L** → mijloc pe ambele direcții de pe plan  
3. Cobori gaura cu **1 mm** sub plan, folosind **conul negru**: ea stă în centrul fundului și îl taie complet (3 mm)  
4. **Ctrl+A** → **Ctrl+G**

### 4) Farfuria
1. **Cylinder** → **78 · 78 · 12** (lângă ghiveci, nu peste el)  
2. Alt **Cylinder** → **72 · 72 · 12** → **Hole**  
3. Selectezi Hole-ul și farfuria → **L** → **mijloc** pe ambele direcții de pe plan. Apoi ridici Hole-ul cu **3 mm**, folosind **conul negru** (fund de 3 mm)  
4. Selectezi Hole-ul și farfuria → **Ctrl+G** — farfurie cu pereți de 3 mm

### 5) Potrivirea
1. Muți farfuria lângă ghiveci  
2. De ce farfuria are 78 și nu 60? Golul farfuriei (72) trebuie să fie **mai larg** decât ghiveciul (60)  
3. Pune ghiveciul **în** farfurie, pe fundul ei: îl tragi întâi **complet în interiorul** farfuriei, apoi selectezi ghiveciul și farfuria → **L** pe ambele direcții de pe plan (farfuria rămâne pe loc, ghiveciul se centrează; nu alege nimic pe sus–jos) și îl ridici cu 3 mm, folosind **conul negru**  
4. View Cube → **Front**: ghiveciul stă pe fundul farfuriei, între pereți

### 6) Complet — guler, Ruler, culori
1. Gulerul e un **inel** făcut separat: **Cylinder** **66 · 66 · 6** + **Cylinder Hole** **54 · 54 · 10**, centrate pe cele **trei** direcții (**L**) → **Ctrl+G** → **D**  
2. Selectezi inelul și ghiveciul → **L** → mijloc pe ambele direcții și punctul de **sus**: inelul stă la marginea de sus, în jurul golului  
3. **Ctrl+G** — ghiveciul are guler, golul rămâne deschis  
4. **Ruler**: măsori ghiveciul (60) și gaura farfuriei (72) → spațiu de 6 mm pe fiecare parte *(Hole-ul farfuriei se măsoară doar separat: **Ctrl+Shift+G** pe farfurie, măsori, apoi **Ctrl+A** pe Hole+farfurie → **Ctrl+G**)*  
5. **Color**: ghiveciul o culoare, farfuria alta

---

## Greșeli frecvente
1. **Ghiveciul nu are fund** — Hole-ul nu e ridicat cu **3 mm** și taie și fundul.  
2. **Scurgerea nu taie** — nu ai dat **Ctrl+G** după ce ai pus gaura de 8 mm.  
3. **Ghiveciul nu încape în farfurie** — gaura farfuriei e mai mică decât 60. Verifică **72**.  
4. **Gulerul a acoperit golul** — gulerul trebuie făcut ca **inel** (cu propriul Hole de 54 mm), nu ca disc plin.  
5. **Am grupat ghiveciul și farfuria** — Ungroup. Trebuie să fie **două** piese.  
6. **Ghiveciul plutește în farfurie** — din **Front** vezi gol; coboară-l pe fund (3 mm).

---

## De făcut azi — „Ghiveciul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Ghiveci Ø60×50 gol + scurgere Ø8 + farfurie Ø78×12 goală · ghiveciul stă în farfurie · 2 piese |
| **Complet** | Minim + guler Ø66×6 + Ruler + 2 culori |

### Pasul 1 — Minim
- [ ] Ghiveci **60 · 60 · 50** + Hole **54 · 54 · 50** (ridicat 3 mm) → **Ctrl+G**  
- [ ] Scurgere **8 · 8 · 10** (coborâtă 1 mm), în centrul fundului → **Ctrl+G**  
- [ ] Farfurie **78 · 78 · 12** + Hole **72 · 72 · 12** (ridicat 3 mm) → **Ctrl+G**  
- [ ] Ghiveciul în farfurie, pe fund (din **Front**)  
- [ ] Sunt **două** piese separate  

### Pasul 2 — Complet
- [ ] Guler-inel **66 · 66 · 6** (Hole 54) la marginea ghiveciului, golul rămas deschis  
- [ ] **Ruler**: 6 mm între ghiveci și peretele farfuriei  
- [ ] Culori diferite · numele `T2_L08` e corect  

---

## Bonus (extra — după Complet)
- [ ] 3 piciorușe mici **Ø8 × 4** sub ghiveci, ca apa să curgă  
- [ ] Un model pe guler (ferestre mici Hole, ca la L7)  
- [ ] Un ghiveci pătrat din **Box** cu aceeași farfurie

## Recapitulare rapidă
1. Ghiveci = Cylinder − Hole (ridicat 3 mm) → fund  
2. Gaura de scurgere = **Hole** mică în centrul fundului  
3. Farfuria: golul mai **mare** decât ghiveciul  
4. Două piese care lucrează împreună = **nu** le grupezi

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Ghiveci:** Cylinder 60·60·50 − Hole 54·54·50 (+3 mm) + Hole 8·8·10 (scurgere) → Group  
**Farfurie:** Cylinder 78·78·12 − Hole 72·72·12 (+3 mm) → Group  
**Complet:** + guler 66·66·6 · Ruler · 2 culori

**Quiz scurt:**  
- De ce farfuria trebuie să fie mai largă?  
- Ce ar păți planta fără gaura de scurgere?  
- De ce nu grupăm ghiveciul cu farfuria?

## Temă
Opțional: un ghiveci **mai mare** (Ø80) — calculezi tu farfuria (gaura cu cel puțin 6 mm mai mare, pereții de 3 mm).
