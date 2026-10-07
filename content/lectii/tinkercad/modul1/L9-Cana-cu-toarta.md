# Lecția 9 — Cana cu toartă
**Modulul 1 · Bazele Tinkercad**  
**Code Maker Club · Shape Starter**  
**Vârstă:** ~8–10 ani

> Azi faci un obiect **gol pe dinăuntru**: cană cu perete, fund și toartă.  
> Proiect: **„Cana mea”** · `Prenume_Nume_T1_L09`

---

## Obiectiv
La finalul orei ai o **cană goală**, cu **fund** și pereți care nu sunt prea subțiri.  
**Minim:** corp (**Cylinder**) + gol (**Cylinder Hole** mai îngust, care începe mai sus de plan și iese deasupra cănii) + **Group** · cana are fund.  
**Complet:** Minim + **toartă** (**Torus**) + culori + model pe cană.

## De ce contează
Cavitățile sunt peste tot: căni, cutii, vaze. **Ordinea pieselor contează** — și grosimea peretelui și a fundului.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8 · cană reală: perete, fund, toartă |
| 10–30 | Demo: Hole **mai îngust, ridicat de la fund**, Torus rotit |
| 30–95 | Minim → Complet → Bonus |
| 95–120 | Recap, quiz, galerie |

**Unelte azi:** Cylinder · **Hole** · **Torus** · săgeata curbă · conul negru · **Ctrl+D** (Mac: **Cmd+D**) · **Ctrl+G** (**Cmd+G**) · **Ctrl+Shift+G** · **L** · Shift+click · **D** · View Cube **Top** / **Front** · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. **Create new design**  
2. Nume: `Prenume_Nume_T1_L09`  
3. Salvare automată — verifici numele

### 2) Corpul
1. Tragi un **Cylinder** și îl faci **40 × 40 × 45** (diametru 40, înălțime 45) — corpul cănii  
2. Pe plan (dacă plutește → **D**)

### 3) Golul (Hole)
1. Tragi al doilea **Cylinder**, **mai îngust** decât corpul: **32 × 32 × 42** (peretele va avea 4 mm)  
2. Îl pui pe **Hole** (panoul Shape, varianta cu dungi)  
3. Îl ridici cu **conul negru** la **5**: golul începe la 5 mm de plan (**fund de 5 mm**) și urcă până la 47 — adică **iese deasupra** cănii (45), altfel ar rămâne un capac  
4. Golul e deci puțin mai scund decât corpul, dar **nu coboară până la plan**  
5. Îl pui **în centru**: selectezi **corpul + golul** (Shift+click), apeși **L** și alegi **punctul din mijloc** pe ambele direcții din Top. Verifici din Top că peretele are aceeași grosime peste tot  
6. Verifici din **Front**: golul începe **deasupra** planului (5 mm) și iese deasupra marginii cănii

### 4) Toarta (Complet) — înainte de Group
1. Tragi un **Torus** (gogoașă din Basic Shapes) și îl scalezi cu **Shift** la ~**25 mm** diametru  
2. Îl **rotești la 90°** cu săgeata curbă, ca să stea **vertical** și, din **Front**, să vezi un **cerc** (inel) — dacă vezi doar o linie, rotești 90° pe cealaltă axă  
3. Îl lipești pe **o parte** a corpului (la dreapta, în Front): marginea lui interioară **intră ~3 mm în perete**; îl ridici la ~**10** (să fie pe la mijlocul cănii)  
4. Îl scalezi dacă iese prea mare sau strâmb (pătrățele albe + **Shift**)  
5. Verifici din **Top**: toarta intră doar în perete (peretele are 4 mm; **nu** intră mai mult de 3 mm, ca să nu ajungă în gol)

### 5) Group
1. Selectezi **corpul + golul Hole + toarta** (Shift+click)  
2. **Ctrl+G** (Mac: **Cmd+G**)  
3. Rotești vederea: cana e goală, are fund, toarta e afară  
4. Dacă toarta intră în cavitate (Hole-ul o taie), **Ctrl+Shift+G** (Ungroup), o muți spre exterior, **Ctrl+G** din nou

### 6) Complet
1. **Color**: selectezi grupul → o singură culoare pentru tot (pentru culori diferite la cană și toartă, le colorezi **înainte** de Group)  
2. **Model:** cercuri mici sau dungi subțiri lipite pe exterior (formă **Solid**, nu Hole)  
3. Nume corect

---

## Greșeli frecvente
1. **Cana nu are fund** — golul a coborât până la plan (trebuie să înceapă la 5); îl ridici cu conul negru.  
2. **Cana are capac (nu e deschisă sus)** — golul nu iese deasupra marginii (47 > 45); îl înalți.  
3. **Peretele e prea subțire** — micșorezi golul sau mărești corpul.  
4. **Toarta intră în gol** — Hole-ul o taie; o muți spre exterior înainte de Group.  
5. **Toarta e culcată** — săgeata curbă, 90°.  
6. **Golul nu e în centru** — Top, **L** sau muți.  
7. **Group doar corp + gol, iar toarta rămâne separată** — o poți alipi, dar Group pe toate odată e mai simplu la început.

---

## De făcut azi — „Cana mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Corp + gol Hole + **fund** + Group |
| **Complet** | Minim + toartă (Torus vertical) + culori + model |

### Pasul 1 — Minim
- [ ] Corp  
- [ ] Gol **Hole**, mai îngust, ridicat la 5 mm, iese deasupra cănii  
- [ ] Fund gros (verificat din Front)  
- [ ] Group făcut  

**→ Minim când:** cana e goală sus și închisă jos.

### Pasul 2 — Complet
- [ ] Toartă  
- [ ] Culori  
- [ ] Model pe cană · numele `T1_L09` e corect  

---

## Bonus (după Complet — și pentru cine termină devreme)
- [ ] Farfurioară  
- [ ] A doua cană, mai mică  
- [ ] Capac (piesă separată)

## Recapitulare rapidă
1. Cavitate = **Hole mai îngust**, care începe **mai sus de plan** (fund) și **iese deasupra** (deschis sus)  
2. Fundul și peretele nu trebuie să fie prea subțiri  
3. Toarta: **Torus** rotit **90°**, în perete, nu în gol

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Cylinder → Cylinder Hole mai îngust, ridicat la 5 mm și ieșit deasupra → fund → Group  
**Complet:** + Torus 90° în perete → Group → culori, model

**Quiz scurt:**  
- De ce golul **nu coboară până la plan**? Și de ce **iese deasupra** cănii?  
- Cum **rotești** toarta?  
- Ce se întâmplă dacă toarta ajunge în **gol**?

## Temă
Opțional: o vază cu gât îngust — același `T1_L09` sau proiect nou.
