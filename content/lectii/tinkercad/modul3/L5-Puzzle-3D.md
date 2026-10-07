# Lecția 5 — Puzzle 3D
**Modulul 3 · Creativ și mecanic**  
**Code Maker Club · Motion Maker**  
**Vârstă:** ~8–10 ani

> Azi faci un cub tăiat în **două piese care se potrivesc**: una are un „dop”, cealaltă are un „locaș” pe măsură.  
> Proiect: **„Puzzle-ul meu”** · `Prenume_Nume_T3_L05`

---

## Obiectiv
La finalul orei ai un cub **40 × 40 × 40** din **2 piese separate**: **piesa de jos** cu un dop și **piesa de sus** cu un locaș în care intră dopul, cu joc.  
**Minim:** piesa A = cub **40·40·20** + dop **16·16·10** · piesa B = cub **40·40·20** − locaș **16,4·16,4** (joc 0,2 mm pe parte) · B stă pe A, dopul intră în locaș · piesele sunt **separate**.  
**Complet:** Minim + un al doilea dop mai mic, **8 · 8 · 10**, care face ca piesele să se potrivească **într-un singur fel** + culori diferite.

## De ce contează
O îmbinare reală are nevoie de **joc**: locașul puțin mai mare decât dopul. Dacă ar fi exact aceeași mărime, la printare piesele nu ar intra una în alta.  
Un dop **asimetric** (al doilea, mai mic) arată cum pui piesa: nu se poate întoarce greșit.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design. Jocul de 0,2 mm îl scrii cu numere (16,4), nu îl tragi cu mouse-ul.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4 · privim un puzzle cu piese care se îmbină: unde e „dopul”? |
| 10–45 | Pas cu pas: piesa A · piesa B stivuită · locașul · separarea |
| 45–100 | Minim → Complet (al doilea dop, culori) → Bonus |
| 100–120 | Recap, quiz, galerie |

**Unelte azi:** **Box** · **Hole** · **Align** (**L**) · mărimi cu numere (inclusiv zecimale) · **conul negru** · **Ctrl+G** / **Ctrl+Shift+G** · **View Cube** · **Ruler** · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. **Create new design** · nume `Prenume_Nume_T3_L05`  
2. Snap Grid: **1.0 mm**

### 2) Piesa A — cu dop
1. **Box** → **40 · 40 · 20**  
2. **Box** → **16 · 16 · 10** *(dopul)*  
3. Selectezi dopul și cubul → **L** → mijloc pe cele **două** direcții de pe plan  
4. Ridici dopul cu **conul negru** la **20 mm** — stă pe fața de sus a cubului  
5. Selectezi dopul și cubul → **Ctrl+G** — piesa A

### 3) Piesa B — stivuită pe A
1. **Box** → **40 · 40 · 20**  
2. Selectezi B și A → **L** → mijloc pe cele două direcții de pe plan  
3. Ridici B cu conul negru la **20 mm** — stă exact pe A, ca un cub întreg de 40

### 4) Locașul din B
1. **Box** → **16,4 · 16,4 · 12** → **Hole** *(scrii zecimala cu punct sau cu virgulă, cum cere Tinkercad)*  
2. Selectezi locașul și piesa A → **L** → mijloc pe cele **două** direcții de pe plan  
3. Ridici locașul cu conul negru la **19 mm** (Snap Grid 1.0) — taie B de la 20 mm în sus, **11 mm** adâncime, și iese **1 mm** sub B  
4. Din **Front**: locașul înconjoară dopul, cu loc pe lateral  
5. Selectezi **locașul și B** (nu și A!) → **Ctrl+G** — locaș cu 0,2 mm joc pe fiecare parte

### 5) Separarea
1. Selectezi B → o muți **60 mm** lateral (rămâne la aceeași înălțime, în aer — e ok) — sunt acum două piese  
2. **View Cube** → **Front**: dopul se vede la A, locașul la B  
3. Muți B **60 mm** înapoi, deasupra lui A (cum era): dopul intră în locaș

### 6) Complet — al doilea dop și culori
1. Piesa A → **Ctrl+Shift+G** (desfaci cubul și dopul)  
2. **Box** → **8 · 8 · 10** *(dopul mic)* → tragi peste cubul A → **L** → mijloc pe cele două direcții de pe plan  
3. Îl muți **14 mm** spre dreapta (Snap Grid 1.0) și îl ridici la **20 mm**  
4. Selectezi cubul A și cele două dopuri → **Ctrl+G** — piesa A nouă  
5. Piesa B → **Ctrl+Shift+G**; locaș nou **8,4 · 8,4 · 12** (Hole) → **L** cu cubul B → mijloc pe cele două direcții de pe plan → îl muți **14 mm** spre dreapta (la fel ca dopul mic) → îl ridici la **19 mm**  
6. Selectezi B, locașul mare și locașul mic → **Ctrl+G**  
7. **Color**: A o culoare, B alta  
8. Rotești B cu **180°** (pe loc, săgeata de sus): dopul mic nu mai are locaș — piesele se potrivesc **într-un singur fel**

---

## Greșeli frecvente
1. **Piesa B s-a lipit de A** — ai selectat și A la Group. Locașul se grupează **doar** cu B.  
2. **Locașul nu taie** — nu e Hole, sau n-ai dat Group.  
3. **Dopul nu intră** — locașul e prea mic. Folosește **16,4**, nu 16.  
4. **Joc prea mare** — dacă faci 20, piesele se mișcă prea tare. 16,4 e potrivit.  
5. **Dopul e lipit de piesa B** — A și B trebuie să fie separate; B se mută singură.  
6. **Locașul e mai adânc decât B** — nu strica A; verifică din **Front** că locașul începe la 19 mm și are 11 mm adâncime în B.  
7. **La al doilea dop piesa nu se potrivește** — locașul mic nu e la **14 mm** de centru, ca dopul mic, sau nu e la **19 mm** înălțime.

---

## De făcut azi — „Puzzle-ul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | A: cub 40·40·20 + dop 16·16·10 · B: cub 40·40·20 − locaș 16,4·16,4 · B pe A, dopul intră · 2 piese separate |
| **Complet** | + dop mic 8·8·10 și locaș 8,4 · un singur fel de a potrivi + culori |

### Pasul 1 — Minim
- [ ] A: cub + dop, **Ctrl+G**  
- [ ] B: cub stivuit pe A  
- [ ] Locaș **16,4 · 16,4 · 12** (Hole) centrat pe A, ridicat la **19 mm** (taie B, iese 1 mm sub el)  
- [ ] Locașul grupat **doar** cu B  
- [ ] A și B pot fi mutate separat  

### Pasul 2 — Complet
- [ ] Dop mic **8·8·10**, locaș mic **8,4·8,4·12**  
- [ ] Piesele se potrivesc într-un singur fel  
- [ ] **Color** · numele `T3_L05` e corect  

---

## Bonus (extra — după Complet)
- [ ] Un puzzle din **3 straturi** (încă un cub 40·40·20 cu locaș și dop)  
- [ ] Un puzzle pe **orizontală**: dop pe lateral, nu deasupra  
- [ ] Text mic gravat pe o față (Hole, 1 mm adâncime)

## Recapitulare rapidă
1. Dop (în A) + locaș (în B) = îmbinare  
2. Locașul = dopul **+ 0,4 mm** (0,2 pe parte) = joc  
3. Locașul se grupează **numai** cu piesa lui  
4. Dop asimetric = un singur mod de potrivire

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** A = Box 40·40·20 + dop 16·16·10 (+20) → B = Box 40·40·20 pe A → Hole 16,4·16,4·12 (la 19 mm) → Group cu B  
**Complet:** + dop 8·8·10 / locaș 8,4 · culori

**Quiz scurt:**  
- Cât joc are locașul față de dop? Pe fiecare parte?  
- De ce locașul se grupează doar cu B?  
- La ce folosește al doilea dop, cel mic?

## Temă
Opțional: desenezi pe foaie o altă îmbinare: dopul **rotund** (Cylinder Ø16) și locașul rotund. Ce număr scrii pentru locaș?
