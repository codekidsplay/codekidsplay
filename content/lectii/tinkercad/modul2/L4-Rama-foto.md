# Lecția 4 — Rama foto
**Modulul 2 · Obiecte utile**  
**Code Maker Club · Object Maker**  
**Vârstă:** ~8–10 ani

> Azi faci o ramă cu **fereastră exactă** și, dacă apuci, un loc unde se strecoară poza.  
> Proiect: **„Rama mea”** · `Prenume_Nume_T2_L04`

---

## Obiectiv
La finalul orei ai o **ramă** cu o fereastră tăiată prin ea, cu margini egale.  
**Minim:** placă **90 × 70 × 3** + fereastră Hole **60 × 40** · margini egale (15 mm) · **Ctrl+G** · golul se vede din ambele părți.  
**Complet:** Minim + un strat din spate cu **buzunar 70 × 50** pentru poză + culoare + **Ruler**.

## De ce contează
O fereastră „cu ochiul” iese strâmbă. Cu **Align** și numere, marginile ies **egale pe toate laturile**.  
Buzunarul din spate e o piesă făcută din **două straturi** — așa se construiesc multe obiecte reale.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 · o ramă reală: cum stă poza în ea? |
| 10–40 | Pas cu pas: placa · fereastra · Align pe 3 direcții |
| 40–100 | Minim → Complet (buzunar din spate, Ruler, culoare) → Bonus |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Box** · **Hole** · **Align** (**L**) pe 3 direcții · mărimi cu numere · **Ctrl+G** · **conul negru** · tasta **D** · **Ctrl+Shift+G** · **Ruler** · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. **Create new design** · nume `Prenume_Nume_T2_L04`  
2. Snap Grid: **1.0 mm**

### 2) Placa
1. **Box** → **90 · 70 · 3** (o placă subțire)  
2. Rămâne **Solid**

### 3) Fereastra
1. Alt **Box** → **60 · 40 · 7** → panoul Shape → **Hole**  
2. Selectezi Hole-ul și placa → **L**  
3. Click pe punctul de **mijloc** pe fiecare din cele **trei** direcții (stânga–dreapta, față–spate, sus–jos)  
4. Hole-ul e mai gros decât placa și centrat pe înălțime → iese **2 mm sus și 2 mm jos**. *(Align poate ridica placa 2 mm de pe plan — nu-i nimic.)*  
5. **Ctrl+A** → **Ctrl+G** — fereastra e tăiată  
6. Apasă **D** — rama coboară pe plan

### 4) Verificare
1. View Cube → **Top**: marginile sunt egale? (**15 mm** stânga–dreapta, **15 mm** sus–jos)  
2. **Ruler**: pui rigla în colțul plăcii și măsori până la fereastră: o margine lungă și una scurtă — amândouă 15 mm *(Hole-ul se măsoară doar separat: **Ctrl+Shift+G**, măsori, apoi **Ctrl+A** → **Ctrl+G** și **D**)*  
3. Rotești vederea: golul se vede și din spate?

### 5) Complet — stratul din spate
1. **Box** **90 · 70 · 3** (alt strat, la fel de mare) — îl pui **lângă** ramă, nu peste ea  
2. Hole **Box** **70 · 50 · 7**, aliniat pe mijloc pe cele **trei** direcții cu stratul  
3. **Ctrl+G** apoi **D** — un strat cu gol mai mare (70 × 50) decât fereastra (60 × 40)  
4. Ridici stratul cu 3 mm, folosind **conul negru**, deasupra plăcii din față *(grosimea plăcii)*  
5. Selectezi ambele straturi → **L** → mijloc pe cele două direcții de pe plan  
6. **Ctrl+A** → **Ctrl+G** — o ramă din două straturi

### 6) Cum se folosește
*(Rama stă pe plan cu **fața în jos**; stratul cu buzunar e deasupra, pe spate.)*  
1. Poza (70 × 50) intră în **buzunarul** din stratul de sus  
2. Fereastra din față (60 × 40) lasă să se vadă poza, dar nu o lasă să cadă  
3. **Color** — rama într-o culoare care se potrivește cu poza ta

---

## Greșeli frecvente
1. **Marginile nu sunt egale** — n-ai aliniat pe mijloc. Selectezi placa și Hole-ul și apeși **L**, mijloc pe ambele direcții.  
2. **Fereastra nu taie** — lipsește **Ctrl+G**, sau Box-ul e încă Solid.  
3. **Rămâne o foiță subțire în fereastră** — Hole-ul e la fel de gros ca placa. Fă-l **mai gros** (7 mm) și centrează-l și pe înălțime.  
4. **Straturile nu se prind** — al doilea strat nu e ridicat exact 3 mm; din **Front** nu trebuie să fie gol între ele.  
5. **Buzunarul e mai mic decât fereastra** — 70 × 50 trebuie să fie **mai mare** decât 60 × 40.  
6. **Am grupat prea devreme** — Ungroup (**Ctrl+Shift+G**), modifici, regrupezi.

---

## De făcut azi — „Rama mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Placă 90·70·3 + Hole 60·40 centrat pe 3 direcții · margini 15 mm · Group |
| **Complet** | Minim + strat din spate cu buzunar 70·50 + Ruler + Color |

### Pasul 1 — Minim
- [ ] Placă **90 · 70 · 3**  
- [ ] Hole **60 · 40 · 7**, aliniat pe mijloc pe **trei** direcții  
- [ ] **Ctrl+G** + **D** · golul se vede și din spate  
- [ ] Margini egale (15 mm), verificat din **Top**  

### Pasul 2 — Complet
- [ ] Strat din spate **90 · 70 · 3** cu gol **70 · 50**  
- [ ] Cele două straturi unite și aliniate  
- [ ] **Ruler**: marginea ferestrei = 15 mm · **Color** · `T2_L04` e corect  

---

## Bonus (extra — după Complet)
- [ ] O rază de colț: **Cylinder Hole** mic în colțurile ferestrei (4 găuri) — rama pare rotunjită  
- [ ] Două găuri de agățat sus (ca la cuier, L1)  
- [ ] Textul numelui pe margine (Text, 1 mm înălțime)

## Recapitulare rapidă
1. **Hole mai gros** decât placa, centrat pe înălțime = taie complet  
2. **L** pe 3 direcții = fereastra exact la mijloc  
3. Rama cu buzunar = **2 straturi**, golul din spate **mai mare**  
4. **Ruler** verifică marginile

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Box 90·70·3 + Hole 60·40·7 → **L** (3 direcții) → Group  
**Complet:** + strat 90·70·3 cu Hole 70·50 → **L** → Group · Ruler · Color

**Quiz scurt:**  
- De ce Hole-ul e mai gros decât placa?  
- Cât e marginea ramei din Minim?  
- De ce buzunarul (70 × 50) e mai mare decât fereastra (60 × 40)?

## Temă
Opțional: o ramă pentru o poză **verticală** (inversezi cele două numere) — același proiect, o copie nouă `T2_L04_v2`.
