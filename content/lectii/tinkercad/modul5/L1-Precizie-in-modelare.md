# Lecția 1 — Precizie în modelare
**Modulul 5 · Avansat și proiectare tehnică**  
**Code Maker Club · Design Pro**  
**Public:** recomandat **10+**

> Azi lucrezi ca un inginer: fiecare piesă are **cote** (mărimi) pe care le poți spune cu voce tare, fără „aproximativ”.  
> Proiect: **„Piesa cu cote”** · `Prenume_Nume_T5_L01`

---

## Obiectiv
La finalul orei ai o **plăcuță cu 2 găuri**, făcută cu numere, și o **fișă de cote** pe foaie.  
**Minim:** placă **60 × 30 × 5** · 2 găuri **Ø6** cu centrele la **10 mm** de capete (distanța dintre ele: **40 mm**) · verificat cu **Ruler** *(marginile găurilor la 7–13 și 47–53)* · fișa de cote completată.  
**Complet:** Minim + o **fantă** **20·6·7** exact la mijloc + verificarea tuturor cotelor cu Ruler.

## De ce contează
Un obiect care se va imprima trebuie să fie **exact**. O gaură făcută „din ochi” poate ieși cu 1 mm mai încolo — și piesa nu se mai potrivește cu alta.  
Astăzi înveți trei obiceiuri: **tastezi** mărimile, folosești **Snap Grid** fin și **verifici** cu Ruler.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ce înseamnă „cotă”? Unde e Ruler? Citim un desen tehnic simplu |
| 15–50 | Pas cu pas: placa · găurile · verificarea cu Ruler |
| 50–100 | Minim → Complet (fanta) → fișa de cote |
| 100–120 | Verificare în perechi, recap, salvare |

**Unelte azi:** **Box** · **Cylinder** · **Hole** · mărimi cu numere (mânerul alb din colț) · mutare exactă cu **săgețile de la tastatură** · **Snap Grid 0.5 / 1** · **Align** (**L**, inclusiv marginile) · **Ruler** · **Ctrl+D** · **Ctrl+G**

---

## Pas cu pas

### 1) Proiect nou
1. **Create new design** · nume `Prenume_Nume_T5_L01`  
2. Snap Grid (jos, dreapta): **1.0 mm** *(pentru mărimi cu zecimale îl pui pe 0.5)*

> **Două trucuri pentru toată ora:**  
> • **Mutare exactă:** selectezi piesa și apeși **săgețile** de la tastatură. O apăsare = un pas de Snap Grid *(la 1.0 mm: 7 apăsări = 7 mm; poți ține tasta apăsată)*. Lucrează din vederea normală sau din **Top**.  
> • **Zecimale:** în Tinkercad scrii **6.2** cu **punct** (nu cu virgulă). În lecție le scriem cu virgulă, ca în română.

### 2) Placa
1. **Box** → mânerul alb din colț → tastezi **60 · 30 · 5**  
2. Placa stă pe plan; o poți lăsa unde e — **Ruler** se pune mai târziu pe colțul ei

### 3) Prima gaură
1. **Cylinder** → **6 · 6 · 7** → **Hole**  
2. Selectezi gaura și placa → **L** → mijloc pe **față–spate** *(centrată pe lățime)*  
3. Selectezi gaura și placa → **L** → marginea din **stânga** *(gaura începe de la marginea plăcii)*  
4. O muți **7 mm spre dreapta** *(gaura are Ø6; marginea ei din stânga la 7 mm înseamnă centrul la 7 + 3 = **10 mm**)*  
5. O cobori **1 mm** cu conul negru *(gaura merge de la −1 la 6 mm: trece prin toată placa de 5 mm, cu 1 mm în plus pe fiecare parte)*

### 4) A doua gaură
1. **Ctrl+D** → muți copia **40 mm spre dreapta** *(40 de apăsări · centrul ajunge la 50 mm: tot la 10 mm de celălalt capăt)*  
2. Selectezi placa și ambele găuri → **Ctrl+G**

### 5) Verificare cu Ruler
1. Apeși **Ruler** *(colțul din dreapta-sus)* și îl pui pe colțul din stânga-față al plăcii  
2. Selectezi o gaură: Ruler arată distanțele până la **marginile** ei  
3. Gaura 1: marginile la **7** și **13** *(centrul = la mijloc = 10)* · gaura 2: **47** și **53** *(centrul 50)*

### 6) Complet — fanta
1. **Box** → **20 · 6 · 7** → **Hole**  
2. **L** cu placa → mijloc pe ambele axe  
3. O cobori **1 mm** · **Ctrl+G** cu placa  
4. Cu Ruler: fanta începe la **20 mm** de capătul din stânga și se termină la **40 mm** *(20 + 20)*
5. Verifici că nu atinge găurile *(găurile se termină la 13 și încep la 47)*

### 7) Fișa de cote *(pe foaie)*

| Element | Mărime | Unde e |
|---------|--------|--------|
| Placă | 60 · 30 · 5 | — |
| Gaura 1 | Ø6 | centrul la 10 de margine |
| Gaura 2 | Ø6 | centrul la 50 de margine |
| Distanța între găuri | 40 | de la centru la centru |
| Fantă *(Complet)* | 20 · 6 | începe la 20 |

---

## Greșeli frecvente
1. **Tragi din colț fără să tastezi** — mărimile ies „aproape”. Tastează numerele.  
2. **Confunzi diametrul cu raza** — Ø6 înseamnă lățimea întreagă, raza e 3.  
3. **Gaura nu taie** — nu e Hole sau nu ai dat **Ctrl+G**.  
4. **Gaura nu e coborâtă 1 mm** — fața ei de jos stă exact pe fața plăcii și poate rămâne o peliculă subțire.  
5. **Distanța e măsurată de la margine la margine, nu de la centru la centru** — la găuri măsurăm de la centru.  
6. **Snap Grid prea mare** — la 5 mm nu poți face 7 mm. Pune 0.5 sau 1.  
7. **Ruler rămas pe plan** — îl muți când ai terminat.

---

## De făcut azi — „Piesa cu cote”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Placă 60·30·5 · 2 găuri Ø6 cu centrele la 10 și 50 · verificat cu Ruler · fișa de cote |
| **Complet** | + fantă 20·6·7 la mijloc, verificată cu Ruler |

### Pasul 1 — Minim
- [ ] Placă **60·30·5** (tastată)  
- [ ] Prima gaură la 10 mm de capăt  
- [ ] A doua gaură cu **Ctrl+D**, la 40 mm distanță  
- [ ] **Ctrl+G** · Ruler confirmă marginile găurilor (7–13 și 47–53), deci centrele 10 și 50  
- [ ] Fișa de cote completată  

### Pasul 2 — Complet
- [ ] Fantă centrată  
- [ ] Ruler: fanta de la 20 la 40 mm  
- [ ] **Color** · numele `T5_L01` e corect  

---

## Bonus (extra — după Complet)
- [ ] Două găuri **Ø4** în plus, la mijloc (x = 30), cu centrele la **6 mm** de marginea din față și de cea din spate — calculează întâi pe foaie  
- [ ] Un text cu numele tău pe placă *(Hole înalt 2 mm, ridicat la 4 mm: adâncime 1 mm)*  
- [ ] Fă o a doua placă **70·30·5** cu aceleași găuri la 10 mm de capete — unde ajunge a doua gaură?

## Recapitulare rapidă
1. Tastezi mărimile — nu tragi „din ochi”  
2. Gaura: Ø = lățimea întreagă; poziția o măsori până la **centru**  
3. Hole + **Ctrl+G** = decupaj  
4. **Ruler** verifică ce ai desenat *(arată marginile; centrul e la mijloc)*

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Box 60·30·5 → Cylinder Hole Ø6·7 → L (mijloc, stânga) → +7 mm → −1 mm jos → Ctrl+D +40 → Group → Ruler (margini 7–13, 47–53)  
**Complet:** fantă 20·6·7 la mijloc

**Quiz scurt:**  
- La ce distanță de capăt e centrul unei găuri Ø6 a cărei margine e la 7 mm? *(10)*  
- De ce măsurăm găurile de la centru?  
- Ce faci dacă piesa nu se potrivește: tragi sau tastezi?

## Temă
Opțional: măsoară cu o riglă o piesă de acasă (un capac, un cartonaș) și scrie fișa ei de cote pe foaie.
