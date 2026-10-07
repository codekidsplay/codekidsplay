# Lecția 6 — Suport pentru periuțe
**Modulul 2 · Obiecte utile**  
**Code Maker Club · Object Maker**  
**Vârstă:** ~8–10 ani

> Azi faci un șablon de **găuri la distanțe egale**, în două direcții, ca într-un tabel.  
> Proiect: **„Suportul de periuțe”** · `Prenume_Nume_T2_L06`

---

## Obiectiv
La finalul orei ai un cilindru cu **4 găuri** pentru periuțe, așezate într-un pătrat, și **fund închis**.  
**Minim:** cilindru **Ø70 × 40** + **4 găuri Hole Ø16** (centrele la 15 mm de mijloc) · fund 5 mm · **Ctrl+G**.  
**Complet:** Minim + **bază lată** Ø80 × 4 pentru stabilitate + culoare + **Ruler**.

## De ce contează
Găurile așezate **în rânduri și coloane** se numesc o **matrice**. O faci o dată, apoi o copiezi.  
Cu **Ctrl+D** faci un rând, apoi copiezi tot rândul — fără să măsori de fiecare dată.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 · câte periuțe încap într-un suport real? |
| 10–40 | Pas cu pas: corpul · prima gaură · copiere în rând și în coloană |
| 40–100 | Minim → Complet (bază, Ruler, culoare) → Bonus |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Cylinder** · **Hole** · **Align** (**L**) · **Snap Grid 5 mm** · **Ctrl+D** · săgețile de la tastatură · selectare multiplă (Shift+click) · **conul negru** · **Ctrl+Shift+G** · **Ruler** · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. **Create new design** · nume `Prenume_Nume_T2_L06`  
2. Snap Grid: **1.0 mm** pentru început

### 2) Corpul
1. **Cylinder** → **70 · 70 · 40**  
2. Rămâne **Solid**

### 3) Prima gaură
1. **Cylinder** → **16 · 16 · 40** → **Hole**  
2. Selectezi gaura și corpul → **L** → **mijloc** pe ambele direcții de pe plan  
3. Ridici gaura cu **5 mm**, folosind **conul negru** (scrii 5): începe la 5 mm de jos și iese 5 mm deasupra → **fund închis de 5 mm**

### 4) Matricea 2 × 2
1. Snap Grid: **5.0 mm**  
2. Din **Top**, cu săgețile de la tastatură (o apăsare = 5 mm), muți gaura **15 mm** spre dreapta și **15 mm** spre față (3 apăsări pe fiecare direcție)  
3. **Ctrl+D** → muți copia **30 mm** spre stânga (6 apăsări) → 2 găuri într-un rând  
4. Shift+click pe **ambele** găuri → **Ctrl+D** → muți cele două copii **30 mm** spre spate (6 apăsări) → rândul 2  
5. Rezultat: 4 găuri în pătrat, centrele la 30 mm unele de altele

### 5) Group + verificare
1. **Ctrl+A** → **Ctrl+G**  
2. View Cube → **Top**: 4 găuri, pereți între ele vizibil egali?  
3. Perete minim între găuri: cât? (30 − 16 = **14 mm** pe axă, **mai mult** pe diagonală)

### 6) Complet — bază lată + Ruler
1. **Cylinder** **80 · 80 · 4** (lângă suport) → selectezi baza și suportul → **L** → mijloc pe ambele direcții de pe plan: baza stă pe plan, sub corp  
2. Din **Front**: baza e mai lată decât corpul → suportul nu se răstoarnă  
3. **Ruler**: pui rigla la marginea stângă a unei găuri, click pe gaura vecină din rând: **30 mm** între aceleași margini, adică între centre *(Hole-urile se măsoară doar separat: dacă sunt în Group, **Ctrl+Shift+G**, măsori, apoi **Ctrl+A** → **Ctrl+G** la loc)*  
4. Selectezi tot → **Ctrl+G** (suport și bază) · **Color**

---

## Greșeli frecvente
1. **Găurile nu sunt în pătrat** — ai mutat o copie mai mult. Verifică din **Top**: aceleași distanțe pe stânga/dreapta și față/spate.  
2. **Rândul 2 are o singură gaură** — ai copiat doar una. Shift+click pe ambele **înainte** de Ctrl+D pentru rândul 2.  
3. **Gaura iese prin fund** — Hole-ul e prea jos. Ridică-l cu conul negru la **5 mm** de plan.  
4. **Gaura prea aproape de margine** — peretele se rupe. Păstrează distanțele de 15 mm.  
5. **Snap Grid prea mic** — mutarea sare din 1 în 1 mm și obosește. Pune **5.0 mm**.  
6. **Baza nu e centrată** — apeși **L** pe amândouă și alegi mijloc pe ambele direcții.

---

## De făcut azi — „Suportul de periuțe”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Cilindru Ø70×40 + 4 găuri Ø16 (pătrat, 30 mm) + fund 5 mm · Group |
| **Complet** | Minim + bază Ø80×4 + Ruler (30 mm) + Color |

### Pasul 1 — Minim
- [ ] Corp **70 · 70 · 40**  
- [ ] Gaură **16 · 16 · 40** ridicată 5 mm  
- [ ] 4 găuri în pătrat (copiate cu **Ctrl+D**)  
- [ ] **Ctrl+A** → **Ctrl+G** · fundul e închis  

### Pasul 2 — Complet
- [ ] Bază **80 · 80 · 4**, centrată  
- [ ] **Ruler**: 30 mm între centre  
- [ ] **Color** · numele `T2_L06` e corect  

---

## Bonus (extra — după Complet)
- [ ] Găuri mici **Ø6** de scurgere prin fund (în centrul fiecărei găuri mari)  
- [ ] A cincea gaură mai mare (Ø26) pentru pasta de dinți — unde încape?  
- [ ] Text cu „PERIUȚE” pe baza lată (Text, 1 mm înălțime)

## Recapitulare rapidă
1. Matrice = găuri în rânduri și coloane  
2. Faci **un rând**, apoi **copiezi rândul**  
3. Gaura ridicată 5 mm = **fund închis**  
4. Baza lată = stabilitate

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Cylinder 70·70·40 − Hole 16·16·40 (ridicat 5 mm) → mută 15+15 mm → Ctrl+D (30 mm) → ambele → Ctrl+D (30 mm) → Group  
**Complet:** + bază 80·80·4 · Ruler · Color

**Quiz scurt:**  
- De ce gaura se ridică 5 mm de la plan și nu stă pe plan?  
- Cum faci al doilea rând de găuri fără să măsori din nou?  
- De ce baza e mai lată?

## Temă
Opțional: un suport cu **6 găuri** (2 rânduri × 3 coloane) pe un corp **Box** — calculezi lungimea corpului.
