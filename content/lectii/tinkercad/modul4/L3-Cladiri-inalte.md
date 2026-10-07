# Lecția 3 — Clădiri înalte
**Modulul 4 · Orașul nostru**  
**Code Maker Club · City Builder**  
**Vârstă:** ~8–10 ani

> Azi exersezi **repetarea**: un bloc cu zeci de ferestre, făcute dintr-un singur rând copiat în sus.  
> Proiect: pe placa ta · `Prenume_Nume_T4_L03`

---

## Obiectiv
La finalul orei ai un **bloc înalt** (9 etaje) pe zona de centru, cu **rânduri de ferestre** egale.  
**Minim:** bloc **30 × 20 × 54** (15 m × 10 m × 27 m) + ușă **8·4·8** + **un rând de 4 ferestre** **4·4·3** la 8 mm una de alta, copiat în sus de încă 2 ori (**3 rânduri**, câte 6 mm între ele) · ridicat la **4 mm** pe placă.  
**Complet:** Minim + **8 rânduri** de ferestre + **terasă** cu parapet + **antenă** + al doilea bloc, **mai scund** (alt număr de etaje).

## De ce contează
O clădire înaltă are zeci de ferestre identice. Nu le faci una câte una: faci **un rând**, îl copiezi în sus cu **Ctrl+D** și aceeași mutare.  
**Un etaj = 6 mm** (3 m în realitate). Un bloc de 9 etaje are 54 mm.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2 · câți mm are un etaj? (3 m × 2) |
| 10–45 | Pas cu pas: blocul · ușa · rândul de ferestre · copiat în sus |
| 45–100 | Minim → Complet (8 rânduri, terasă, antenă, al doilea bloc) → Bonus |
| 100–120 | Recap, quiz, salvare |

**Unelte azi:** **Box** · **Cylinder** · **Hole** · **Align** (**L**, inclusiv marginile) · **Snap Grid 2 mm** · **Ctrl+D** (aceeași mutare) · **conul negru** · **Ctrl+G** / **Ctrl+Shift+G** · **View Cube** · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. Copia proiectului `Prenume_Nume_T4_L02` (**Duplicate**), redenumită `Prenume_Nume_T4_L03` *(sau placa refăcută rapid)*  
2. Snap Grid: **1.0 mm**

### 2) Blocul și ușa
1. **Box** → **30 · 20 · 54** *(în afara plăcii, deocamdată)*  
2. **Box** → **8 · 4 · 8** → **Hole** *(ușa)*  
3. Selectezi ușa și blocul → **L** → mijloc pe stânga–dreapta, punctul de **jos** și punctul din **față** al blocului  
4. O muți **2 mm spre față** — taie 2 mm în perete

### 3) Rândul de ferestre
1. **Box** → **4 · 4 · 3** → **Hole** *(o fereastră)*  
2. **L** cu blocul → mijloc pe stânga–dreapta și punctul din **față**; o muți **2 mm spre față** (jumătate afară)  
3. Snap Grid: **2.0 mm** → o muți **12 mm** spre stânga (6 sărituri)  
4. Snap Grid: **1.0 mm** → o ridici cu conul negru la **8 mm**  
5. Snap Grid: **2.0 mm** → **Ctrl+D** → muți copia **8 mm** spre dreapta → **Ctrl+D** → **Ctrl+D** — 4 ferestre egale, la 8 mm una de alta  
6. Selectezi cele 4 ferestre → **Ctrl+G** *(un singur „rând”, un Group de Hole-uri)*

### 4) Rândurile în sus
1. Rândul → **Ctrl+D** → muți copia **6 mm** în sus (un etaj)  
2. **Ctrl+D** → repetă aceeași mutare → al treilea rând  
3. Ai 3 rânduri, câte 6 mm între ele *(Minim)*

### 5) Group
1. Selectezi blocul, ușa și toate rândurile (Shift+click) → **Ctrl+G**  
2. Din **Front**: ușă jos, 3 rânduri de ferestre egale

### 6) Blocul pe placă
1. Ridici blocul la **4 mm** și îl muți pe zona **centru**  
2. **Color**: blocul o culoare, ferestrele rămân găuri

### 7) Complet — 8 rânduri, terasă, antenă
1. Desfaci Group-ul (**Ctrl+Shift+G**), selectezi ultimul rând și continui să-l copiezi în sus cu **Ctrl+D** și aceeași mutare de 6 mm, până ai **8 rânduri** (ultimul rând e la 50 mm de baza blocului); apoi selectezi blocul, ușa și toate rândurile → **Ctrl+G**  
2. **Terasa:** **Box** **30·20·2** și **Hole** **26·16·3** → **L**: mijloc pe ambele axe între ele și cu blocul → ambele ridicate la **58 mm** *(54 mm cât e blocul + 4 mm de la placă)* → selectezi **doar** Box-ul și Hole-ul → **Ctrl+G** *(un parapet de 2 mm)*  
3. **Antena:** **Cylinder** **1,5·1,5·12** pe mijlocul terasei, ridicat la **58 mm**  
4. **Al doilea bloc:** **Box** **30·20·30** (5 etaje) + ușă + 4 rânduri de ferestre, făcut după același tipar; îl pui lângă primul, tot pe zona centru

---

## Greșeli frecvente
1. **Ferestrele nu taie** — rândul nu e Hole sau lipsește **Ctrl+G**.  
2. **Rândurile nu sunt egale** — ai mutat „cu ochiul”. Șterge copiile și repetă **Ctrl+D** cu 6 mm.  
3. **Ferestrele din rând nu sunt egale** — ai mutat fiecare separat. Prima mutare de 8 mm, apoi doar **Ctrl+D**.  
4. **Fereastra e doar la suprafață** — nu a fost mutată 2 mm spre față; nu taie nimic.  
5. **Prea multe rânduri** — ultimul rând trebuie să rămână sub 54 mm de la baza blocului.  
6. **Parapetul acoperă toată terasa** — Hole-ul interior (26·16) lipsește sau n-a fost grupat doar cu Box-ul terasei.  
7. **Scara greșită** — un bloc de 27 m = 54 mm, nu 27.

---

## De făcut azi — „Blocul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Bloc 30·20·54 · ușă 8·4·8 · rând de 4 ferestre 4·4·3 (8 mm) copiat în sus la 6 mm → 3 rânduri · pe zona centru, la 4 mm |
| **Complet** | + 8 rânduri + terasă cu parapet + antenă + al doilea bloc (30·20·30) |

### Pasul 1 — Minim
- [ ] Bloc **30·20·54**, ușă **8·4·8**  
- [ ] Fereastră **4·4·3**, 4 ferestre egale, la 8 mm una de alta  
- [ ] 3 rânduri (Ctrl+D + 6 mm în sus)  
- [ ] **Ctrl+G** · bloc ridicat la 4 mm, pe zona centru  

### Pasul 2 — Complet
- [ ] 8 rânduri de ferestre  
- [ ] Terasă cu parapet + antenă  
- [ ] Al doilea bloc, mai scund  
- [ ] **Color** · numele `T4_L03` e corect  

---

## Bonus (extra — după Complet)
- [ ] Ferestre și pe **latura** blocului (un rând rotit 90°)  
- [ ] Un balcon pe fiecare etaj: Box subțire sub fereastră  
- [ ] Un turn de birouri rotund: Cylinder **24·24·60** cu ferestre în cerc (Ctrl+D + rotire)

## Recapitulare rapidă
1. Un etaj = **6 mm**  
2. Un rând = 4 ferestre copiate cu **Ctrl+D**  
3. Rândurile în sus: aceeași mutare de **6 mm**  
4. Cu **Ctrl+D** nu mai măsori de fiecare dată

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Box 30·20·54 − ușă 8·4·8 − fereastră 4·4·3 (−12, +8 mm) → Ctrl+D ×3 (8 mm) → Group → Ctrl+D ×2 (+6 mm) → Group → +4 mm pe zona centru  
**Complet:** 8 rânduri · terasă · antenă · al doilea bloc

**Quiz scurt:**  
- Câți mm are un bloc de 12 etaje? *(72)*  
- Cum faci 4 ferestre egale fără să măsori fiecare?  
- De ce copiem rândul, nu fereastra?

## Temă
Opțional: pe foaie, desenezi un bloc cu 10 etaje și 3 ferestre pe rând. Câte ferestre are în total? Câți mm are în înălțime?
