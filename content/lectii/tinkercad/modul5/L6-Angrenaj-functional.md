# Lecția 6 — Angrenaj funcțional
**Modulul 5 · Avansat și proiectare tehnică**  
**Code Kids Play · Design Pro**  
**Public:** recomandat **10+**

> Azi folosești **generatorul de roți dințate** din Tinkercad, așezi două roți pe axe la distanța potrivită și calculezi **raportul de transmisie**.  
> Proiect: **„Angrenajul meu”** · `Prenume_Nume_T5_L06`

---

## Obiectiv
La finalul orei ai **două roți dințate din generator** care se angrenează pe două axe și știi să spui **cine se învârte mai repede**.  
**Minim:** roată mică (**12 dinți**) și roată mare (**24 de dinți**) pe o placă · axe **Ø5** · distanța dintre centre găsită și verificată din **Top** · tabelul cu dinți și raport completat.  
**Complet:** Minim + **manivelă** pe roata mare + **raportul 1 : 2** explicat în trei propoziții.

## De ce contează
În M3 ai făcut o roată cu dinți „de mână”. Acum folosești o **unealtă** care calculează dinții singură — dar tu trebuie să știi **cât de departe** să pui roțile ca dinții să se prindă.  
Raportul de transmisie arată cât de repede se rotește fiecare roată: **roata mică cu 12 dinți face 2 ture** când cea mare (24) face una.

**Pregătire (profesor):** deschide înainte **Shape Generators** în contul clasei, găsește **Gear** (roata dințată) și notează numele câmpurilor pentru dinți, grosime și mărimea dintelui *(unele generatoare nu au „mărimea dintelui” ca număr separat; atunci verifică pe ecran că cele două roți au dinți la fel de mari)*. Dacă generatorul lipsește, elevii fac lecția cu roata din **M3 L1** (dinți din bare).  
**Important:** pentru amândouă roțile se folosește **aceeași mărime a dintelui**, ca să se potrivească.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ce e raportul de transmisie? Exemplu cu bicicleta |
| 15–50 | Pas cu pas: generatorul · axele · distanța |
| 50–100 | Minim → Complet (manivela) → raportul pe foaie |
| 100–120 | Verificare, recap, salvare |

**Unelte azi:** **Shape Generators (Gear)** · **Cylinder** · **Box** · **Hole** · **Ruler** · **Snap Grid 0.5** · mutare cu **săgețile** · rotire cu numere · **Align** (**L**) · **View Cube** (Top, Front) · **Ctrl+G**

---

## Pas cu pas

### 1) Proiect nou
1. `Prenume_Nume_T5_L06` · Snap Grid **0.5 mm**

### 2) Roata mică
1. Din lista de forme alegi **Shape Generators** și găsești **Gear**  
2. O tragi pe plan · în meniul ei pui **12 dinți** *(restul valorilor rămân cele de bază)*  
3. Cu **Ruler** măsori **diametrul exterior** al roții *(distanța dintre marginile ei, sau selectezi roata și citești lungimea din câmpul de mărime)* și îl notezi: **D1 = …**  
4. Dacă roata nu are gaură în mijloc: **Cylinder** **5,8 · 5,8** și înălțime **cât grosimea roții + 2 mm** → **Hole** → **L** mijloc pe ambele axe cu roata → îl cobori 1 mm → **Ctrl+G**

### 3) Roata mare
1. Tragi o a doua roată din generator, cu **24 de dinți**; restul valorilor (mărimea dintelui, grosimea) **la fel** ca la prima  
2. Măsori **D2 = …**  
3. Dacă nu are gaură: la fel, **Hole Ø5,8**

### 4) Distanța dintre axe
1. Distanța teoretică: **d ≈ (D1 + D2) ÷ 2** *(aproximativ; dinții intră unul în altul, deci poate fi puțin mai mică)*  
2. Pui roțile pe același rând *(L: mijloc pe față–spate)* și le muți până când centrele sunt la **d** *(distanța dintre centre = jumătate din D1 + jumătate din D2 + spațiul dintre ele; măsori cu Ruler de la marginea stângă a primei roți)*  
3. Din **Top**, mărit la maximum: dinții unei roți intră în golurile celeilalte, **fără** să se suprapună  
4. Dacă dinții se suprapun: depărtezi cu **0,5 mm**; dacă e gol mare între ei: apropii cu **0,5 mm**  
5. Notezi pe foaie **d final = …**

> **Dacă dinții se ciocnesc, dar distanța pare bună:** poate roata mică e doar rotită „nepotrivit”. Rotește-o cu **15°** *(jumătate din pasul unui dinte: 360 ÷ 12 ÷ 2; tastezi unghiul la săgeata curbă)* și privește din nou din **Top**: dinții ei trebuie să intre în golurile roții mari.

### 5) Axele și placa
1. **Cylinder** **5 · 5 · H** *(axul; H = grosimea roții + 6 mm, ca să încapă și manivela)*, câte unul în centrul fiecărei roți *(L: mijloc pe ambele axe)* · ridicat la **4 mm** *(stă pe placă)*  
2. **Box** pentru placă: lungimea = **d + D1 ÷ 2 + D2 ÷ 2 + 10**, lățimea = **cea mai mare roată + 10**, grosimea = **4** · **L** cu cele două axe: mijloc pe față–spate și pe stânga–dreapta  
3. Axele + placa → **Ctrl+G** *(o singură piesă fixă)*  
4. Roțile: ridicate la **5 mm** *(1 mm de aer față de placă)*  
5. Roțile **nu** se grupează cu axele sau cu placa  
6. Din **Front**: roțile plutesc pe ax, nu ating placa

### 6) Tabelul pe foaie

| | Roata mică | Roata mare |
|--|-----------|-----------|
| Dinți | 12 | 24 |
| Diametru exterior | D1 = … | D2 = … |
| Distanța dintre axe | d = … | |

### 7) Complet — manivela și raportul
1. **Manivela:** **Box** **L_m · 6 · 4**, unde **L_m = 25** sau mai puțin, dar **mai mic decât d − 5** *(altfel lovește axul roții mici)* · **L** cu axul roții mari: mijloc pe față–spate și marginea din stânga sau din dreapta cu axul *(manivela pornește de la ax, de preferat în partea opusă roții mici)* · ridicată pe roata mare, la **5 mm + grosimea roții** · **Hole** **Cylinder 5,8** peste ax, prin manivelă · **Ctrl+G** manivelă + gaură + **roata mare**  
2. **Raportul:** 24 ÷ 12 = **2** → scrii în trei propoziții:  
   - Când roata mare face **1 tură**, roata mică face **… ture**.  
   - Roata mică se învârte **mai repede / mai încet** decât cea mare.  
   - Dacă vrei ca o roată să meargă mai încet și să aibă mai multă forță, o conectezi la o roată **mai mare / mai mică**.

---

## Greșeli frecvente
1. **Dinții nu se potrivesc** — cele două roți au dinți de mărimi diferite. Folosește aceeași mărime.  
2. **Roțile se suprapun** — le-ai pus prea aproape. Depărtează 0,5 mm.  
3. **Roțile sunt prea departe** — se învârt fără să se prindă.  
4. **Roțile sunt grupate cu placa** — nu se pot mișca. Rămân separate.  
5. **Ax prea gros** — gaura Ø5,8 e pentru ax Ø5 *(joc 0,4 pe parte)*.  
6. **Raport calculat invers** — roata cu mai puțini dinți se învârte **mai repede**.  
7. **Unitățile amestecate** — D și d în mm.

---

## De făcut azi — „Angrenajul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Roată 12 dinți + roată 24 dinți (aceeași mărime a dintelui) · axe Ø5 · distanța d verificată din Top · tabelul completat |
| **Complet** | + manivelă + raport 1 : 2 în trei propoziții |

### Pasul 1 — Minim
- [ ] Roata mică (12) și roata mare (24)  
- [ ] D1 și D2 măsurate  
- [ ] Distanța d, verificată din **Top**  
- [ ] Axe și placă · roțile separate de axe  
- [ ] Tabelul pe foaie  

### Pasul 2 — Complet
- [ ] Manivela  
- [ ] Raportul explicat  
- [ ] **Color** · numele `T5_L06` e corect  

---

## Bonus (extra — după Complet)
- [ ] O a treia roată de **18 dinți** — calculează raportul față de roata mare  
- [ ] Un angrenaj cu raportul **1 : 3** *(12 și 36 de dinți)*  
- [ ] Pe foaie: cum ai folosi un angrenaj la o bicicletă?

## Recapitulare rapidă
1. Raport = dinți roata conducătoare ÷ dinți roata condusă  
2. Mai puțini dinți = se învârte **mai repede**  
3. Aceeași mărime a dintelui la ambele roți  
4. Distanța dintre axe se verifică din **Top**

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Gear 12 dinți + Gear 24 dinți → D1, D2 → d ≈ (D1+D2)÷2 → verificat Top → axe Ø5 + placă  
**Complet:** manivelă · raport 24 ÷ 12 = 2

**Quiz scurt:**  
- Câte ture face roata mică (12) când cea mare (24) face 3? *(6)*  
- De ce roțile trebuie să aibă dinți de aceeași mărime?  
- Ce faci dacă dinții se suprapun?

## Temă
Opțional: numără dinții de la o bicicletă (față și spate) sau caută raportul într-o jucărie cu roți dințate.
