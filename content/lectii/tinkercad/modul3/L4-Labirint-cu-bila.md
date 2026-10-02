# Lecția 4 — Labirint cu bilă
**Modulul 3 · Creativ și mecanic**  
**Code Kids Play · Motion Maker**  
**Vârstă:** ~8–10 ani

> Azi planifici un traseu pe o placă și te asiguri că **bila încape peste tot**.  
> Proiect: **„Labirintul meu”** · `Prenume_Nume_T3_L04`

---

## Obiectiv
La finalul orei ai un **labirint** pe o placă de **100 × 100 mm**, cu pereți, **start**, **final** și o **bilă** (sferă Ø10) care încape pe tot traseul.  
**Minim:** placă cu cadru (pereți **3 mm**, înălțime **10 mm**) · **3 pereți interiori** **75 × 3 × 10**, puși alternativ, la câte 25 mm unul de altul · culoare de **22 mm** · start și final marcate · bila pe start.  
**Complet:** Minim + **2 pinteni** (pereți scurți care ies din perete, bila îi ocolește) + traseul verificat de la start la final cu bila + culori.

## De ce contează
Un traseu trebuie **planificat**: lățimea culoarului se alege după bilă. Culoarul de 22 mm e de peste două ori mai lat decât bila (10 mm).  
Planul pe hârtie te scutește să muți pereții de zece ori.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Recap L3 · schiță pe foaie: placa 100×100, pereții, start, final, săgeți pe drum |
| 15–50 | Pas cu pas: cadrul · primul perete · copiile · start și final |
| 50–100 | Minim → Complet (pinteni, test cu bila, culori) → Bonus |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Box** · **Sphere** · **Hole** · **Align** (**L**, inclusiv marginile) · **Snap Grid 1 / 5 mm** · **Ctrl+D** · tasta **D** · **conul negru** · **Ctrl+G** / **Ctrl+Shift+G** · **View Cube** (Top) · **Ruler** · **Color**

---

## Pas cu pas

### 1) Proiect nou și schița
1. **Create new design** · nume `Prenume_Nume_T3_L04`  
2. Pe foaie desenezi pătratul de 100 × 100, **3 pereți** orizontali și săgeți: drumul merge **în zigzag** de jos în sus  
3. Snap Grid: **1.0 mm**

### 2) Placa și cadrul
1. **Box** → **100 · 100 · 4** *(placa)*  
2. **Box** → **100 · 100 · 10** *(cadrul, încă plin)*  
3. **Box** → **94 · 94 · 14** → **Hole**  
4. Selectezi Hole-ul și cadrul → **L** → mijloc pe cele **trei** direcții → **Ctrl+G** — un inel cu pereți de 3 mm  
5. Selectezi placa și inelul → **L** → mijloc pe cele două direcții de pe plan  
6. Apeși **D** pe inel (stă pe plan), apoi îl ridici cu **conul negru** cu **4 mm** — stă **pe** placă, nu în ea  
7. **Ctrl+G** — placă cu cadru (pereții se văd 10 mm deasupra podelei)

### 3) Primul perete interior
1. **Box** → **75 · 3 · 10** *(Snap Grid rămâne 1.0)*  
2. Selectezi peretele și placa → **L** → punctul din **stânga** (marginea stângă) și punctul de la **marginea din față**  
3. Îl ridici cu **conul negru** cu **4 mm** — stă pe placă  
4. Snap Grid: **5.0 mm** → muți peretele **25 mm** spre spate (5 sărituri) — culoarul de jos are 22 mm

### 4) Al doilea și al treilea perete
1. Selectezi primul perete → **Ctrl+D** → muți copia încă **25 mm** spre spate  
2. **L** cu placa → punctul din **dreapta** (marginea dreaptă) — peretele se lipește de dreapta, golul rămâne în stânga  
3. Primul perete → **Ctrl+D** → muți copia **50 mm** spre spate → al treilea perete, lipit de stânga  
4. Din **Top**: pereții alternează — gol la dreapta, gol la stânga, gol la dreapta

### 5) Start și final
1. Snap Grid: **1.0 mm** → **Box** → **12 · 12 · 1** *(marcaj de start)*  
2. Selectezi marcajul și placa → **L** → punctul din **stânga** și punctul din **față** *(marginile)*; apoi îl muți **5 mm** spre dreapta și **5 mm** spre spate  
3. Îl ridici cu conul negru la **4 mm** (suprafața plăcii — stă pe ea)  
4. **Ctrl+D** → marcajul de final: la fel, dar în colțul din **stânga-spate** (margini: stânga și spate; 5 mm spre dreapta și 5 mm spre față)  
5. **Color**: start verde, final roșu

### 6) Bila
1. **Sphere** **10 · 10 · 10**  
2. **L** cu marcajul de start (mijloc pe cele două direcții de pe plan)  
3. O ridici cu conul negru la **5 mm** — stă pe marcajul de start  
4. **Ctrl+A** pe tot ce e labirint, **fără bilă** (Shift+click pe bilă ca s-o scoți) → **Ctrl+G**

### 7) Complet — pinteni, test, culori
1. Doi pereți scurți **3 · 8 · 10** (ridicați 4 mm, ca peretele lung), lipiți de un perete lung și ieșiți în culoar = **pinteni**; între pinten și peretele din față rămân **14 mm** — bila trece (nu bloca drumul!)  
2. Trasezi cu degetul pe ecran drumul de la start la final: nu trebuie să treci prin perete  
3. **Ruler**: culoarul (22 mm) față de bilă (10 mm)  
4. **Color**: **Ctrl+Shift+G** pe labirint → colorezi placa cu cadru într-o culoare și pereții interiori în alta → îi regrupezi, **fără bilă**

---

## Greșeli frecvente
1. **Traseul e blocat** — doi pereți se ating sau un pinten e prea lung (între pinten și perete trebuie să rămână **cel puțin 12 mm**). Din **Top** verifici golurile.  
2. **Culoarul e prea îngust** — bila ar trebui să aibă cel puțin 2 mm pe fiecare parte. Păstrează 22 mm.  
3. **Peretele iese din cadru** — verifică lungimea **75** și că e lipit de marginea corectă.  
4. **Pereții nu alternează** — golurile sunt de aceeași parte. Lipește al doilea perete de **dreapta**.  
5. **Bila e în aer** — pune-o la 5 mm; din **Front** trebuie să stea pe marcajul de start.  
6. **Am grupat și bila** — bila trebuie să rămână separată: **Ctrl+Z** sau Ungroup.  
7. **Cadrul nu are fund** — ai uitat placa de 4 mm.

---

## De făcut azi — „Labirintul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Placă 100·100·4 cu cadru · 3 pereți 75·3·10 alternativ (la 25 mm) · start verde, final roșu · bila Ø10 pe start |
| **Complet** | + 2 pinteni + test cu bila de la start la final + Ruler + culori |

### Pasul 1 — Minim
- [ ] Placă și cadru (inel 3 mm, înălțime 10)  
- [ ] 3 pereți alternativ, câte 25 mm distanță  
- [ ] Din **Top**: drum în zigzag, fără blocaj  
- [ ] Start și final marcate · bila pe start, separată  

### Pasul 2 — Complet
- [ ] 2 pinteni care nu blochează drumul  
- [ ] Drumul de la start la final verificat cu degetul  
- [ ] **Ruler**: 22 mm și 10 mm · **Color** · `T3_L04` e corect  

---

## Bonus (extra — după Complet)
- [ ] Un al patrulea perete (un rând în plus) — placa rămâne 100, culoarul se strânge la ~16 mm  
- [ ] Două mânere mici pe laterale, ca să ții labirintul în mână  
- [ ] O gaură (Hole) în podea, o „capcană” — nu pe drumul bun

## Recapitulare rapidă
1. Culoarul se alege după **bilă** (aici 22 mm față de 10)  
2. Pereți alternanți, lipiți când de stânga, când de dreapta  
3. Din **Top** verifici că drumul nu e blocat  
4. Bila rămâne **piesă separată**

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** placă 100·100·4 + cadru → perete 75·3·10 (stânga) → copie +25 mm (dreapta) → copie +50 mm (stânga) → start, final → bilă Ø10  
**Complet:** + 2 pinteni · test cu bila · Ruler · culori

**Quiz scurt:**  
- Câți mm are culoarul și câți bila?  
- De ce pereții se lipesc alternativ de stânga și de dreapta?  
- Cum verifici din Top că traseul nu e blocat?

## Temă
Opțional: desenezi pe foaie un labirint cu **4** pereți și 2 fundături. Treci cu creionul de la start la final fără să ridici mâna.
