# Lecția 4 — Piese care se îmbină
**Modulul 5 · Avansat și proiectare tehnică**  
**Code Maker Club · Design Pro**  
**Public:** recomandat **10+**

> Azi faci o **îmbinare cu cheie** (ca la agățătoarele de perete): un bolț cu cap trece printr-o gaură mare și apoi **alunecă** într-o fantă îngustă, unde se **blochează**.  
> Proiect: **„Îmbinarea mea”** · `Prenume_Nume_T5_L04`

---

## Obiectiv
La finalul orei ai **două piese** care se îmbină: placa **A** cu o „gaură-cheie” și placa **B** cu un bolț cu cap. Le poți trece una peste alta, apoi le blochezi culisând.  
**Minim:** placa A **40·30·5** cu gaură **Ø10** + fantă **14·5,4** · placa B **30·20·3** cu bolț (axul **Ø5·6** și capul **Ø9·2**) · piesele **separate** · verificate din **Front** *(capul încape prin gaură, dar nu prin fantă)*.  
**Complet:** Minim + **al doilea bolț și a doua gaură-cheie** (la 22 mm de primele) + piesele așezate împreună (A pe B), cu A împinsă **7 mm** în poziția blocată.

## De ce contează
Cele mai multe obiecte din jur se țin cu **îmbinări**: șuruburi, clești, cleme. Azi înveți ideea din spatele lor: **o parte lată trece printr-un loc larg, apoi stă într-unul îngust**.  
Mărimile sunt gândite cu **joc** (L3): capul Ø9 trece prin gaura Ø10; axul Ø5 stă în fanta de 5,4.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Cum funcționează agățătoarea de perete? Schița pe foaie |
| 15–55 | Pas cu pas: placa A cu gaură-cheie · placa B cu bolț |
| 55–100 | Minim → Complet (al doilea bolț, asamblare) |
| 100–120 | Verificare din Front, recap, salvare |

**Unelte azi:** **Box** · **Cylinder** · **Hole** · mărimi cu numere *(zecimale cu punct: 5.4)* · mutare cu **săgețile** · **Align** (**L**) · **Ctrl+D** · **Ctrl+G** · **Ctrl+Shift+G** · **Ruler** · **View Cube** (Front, Top)

---

## Schița *(pe foaie, 5 minute)*
Desenezi placa A de sus: un cerc mare și, lipită de el, o fantă îngustă spre dreapta. Scrii: **Ø10**, **fantă 14 × 5,4**, **axul Ø5**, **capul Ø9**.  
Întrebare: de ce capul (9) trebuie să fie mai mic decât gaura (10), dar mai mare decât fanta (5,4)?

---

## Pas cu pas

### 1) Proiect nou
1. `Prenume_Nume_T5_L04` · Snap Grid **0.5 mm** *(pentru mutări de milimetri întregi poți trece pe 1.0)*

### 2) Placa A — gaura-cheie
1. **Box** → **40 · 30 · 5** *(placa A)*  
2. **Cylinder** → **10 · 10 · 7** → **Hole**  
3. **L** cu placa: mijloc pe față–spate și marginea din stânga; apoi o muți **5 mm spre dreapta** *(centrul la 5 + 5 = **10 mm** de margine)*  
4. O cobori **1 mm** cu conul negru  
5. **Box** → **14 · 5,4 · 7** → **Hole** *(fanta)*  
6. **L** cu placa: mijloc pe față–spate și marginea din stânga; o muți **10 mm spre dreapta** *(fanta începe exact din centrul găurii)*; o cobori **1 mm**  
7. Din **Top**: fanta pornește din mijlocul cercului și merge spre dreapta, 14 mm  
8. Selectezi placa și **ambele** Hole-uri → **Ctrl+G**

### 3) Placa B — bolțul
1. **Box** → **30 · 20 · 3** *(placa B)* · o muți în afara plăcii A  
2. **Cylinder** → **5 · 5 · 6** *(axul)* → **L** cu placa B: mijloc pe față–spate și marginea din stânga; îl muți **7,5 mm spre dreapta** *(centrul la 10 mm de margine)*; îl ridici la **3 mm** *(stă pe placă)*  
3. **Cylinder** → **9 · 9 · 2** *(capul)* → **L** cu axul: mijloc pe ambele axe; capul ridicat la **9 mm** *(în vârful axului: 3 + 6)*  
4. Selectezi placa B, axul și capul → **Ctrl+G**  
5. Din **Front**: placă, ax subțire, cap lat

### 4) Verificarea *(din Front, pe foaie)*
| Piesă | Mărime | Trebuie |
|-------|--------|---------|
| Gaura | 10 | mai mare decât capul *(joc 0,5 pe parte)* |
| Capul | 9 | mai mare decât fanta |
| Fanta | 5,4 | mai mare decât axul *(joc 0,2 pe parte)* |
| Axul | 5 | — |

### 5) Complet — asamblarea
1. Placa A → **ridicată la 3 mm** *(stă pe placa B)*  
2. **L** cu placa B: marginea din stânga și mijloc pe față–spate *(gaura din A e exact peste bolț: ambele la 10 mm de margine)*  
3. Din **Front**: axul trece prin A, capul e **deasupra** plăcii A, cu 1 mm de aer *(axul are 6 mm, A are 5: 6 − 5 = 1)*  
4. Placa A → o muți **7 mm spre stânga** *(bolțul ajunge în fanta îngustă)*  
5. Din **Top**: axul e acum în fantă, capul stă peste margini — **blocat**

### 6) Complet — al doilea bolț
Atenție: dacă mărești un Group, **întinzi și bolțul, și găurile**. De aceea desfaci întâi Group-ul.
1. Placa B: **Ctrl+Shift+G** *(desface)* → mărești **doar placa** la **45 · 20 · 3**, trăgând din **dreapta** *(marginea din stânga rămâne pe loc; verifică cu Ruler că bolțul e tot la 10 mm de margine)* → bolțul (ax + cap) → **Ctrl+D** → **22 mm spre dreapta** *(al doilea bolț la 32 mm; trebuie să rămână între găuri cel puțin 1,2 mm de perete)* → **Ctrl+G** pe tot  
2. Placa A: **Ctrl+Shift+G** → mărești **doar placa** la **55 · 30 · 5**, tot din dreapta → selectezi cele 2 Hole-uri (gaură + fantă) → **Ctrl+D** → **22 mm spre dreapta** *(a doua gaură la 32 mm; de la capătul primei fante, la 24 mm, până la a doua gaură, la 27 mm, rămân 3 mm de perete)* → **Ctrl+G** pe tot  
3. Refaci asamblarea de la pasul 5 *(A împinsă tot 7 mm: ambele bolțuri intră în fante)*

---

## Greșeli frecvente
1. **Capul nu trece prin gaură** — gaura trebuie să fie mai mare decât capul (10 > 9).  
2. **Capul trece prin fantă** — fanta e mai îngustă decât capul (5,4 < 9).  
3. **Axul nu intră în fantă** — fanta e mai îngustă decât axul. Fanta 5,4 > ax 5.  
4. **Fanta nu pornește din centrul găurii** — bolțul nu are unde să alunece.  
5. **Hole-urile nu sunt grupate cu placa A** — nu taie nimic.  
6. **Placa A și B sunt grupate între ele** — nu se mai mișcă separat. Trebuie să rămână două piese separate.  
7. **Capul e lipit de placa A** — axul trebuie să aibă 1 mm de aer sub cap.

---

## De făcut azi — „Îmbinarea mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Placa A (gaură Ø10 + fantă 14·5,4) · placa B (ax Ø5·6 + cap Ø9·2) · piese separate · verificat din Front |
| **Complet** | + al doilea bolț și a doua gaură-cheie + asamblare cu A împinsă 7 mm |

### Pasul 1 — Minim
- [ ] Placa A 40·30·5, gaură Ø10 la 10 mm de margine  
- [ ] Fantă 14·5,4 pornind din centrul găurii  
- [ ] **Ctrl+G** pe A  
- [ ] Placa B 30·20·3 cu axul Ø5·6 și capul Ø9·2 · **Ctrl+G**  
- [ ] Tabelul de verificare completat  

### Pasul 2 — Complet
- [ ] A pe B, 3 mm sus  
- [ ] A împinsă 7 mm  
- [ ] Al doilea bolț  
- [ ] **Color** · numele `T5_L04` e corect  

---

## Bonus (extra — după Complet)
- [ ] Un mic „opritor” la capătul fantei, ca bolțul să nu iasă  
- [ ] Capul bolțului cu un șanț pentru șurubelniță *(Hole mic)*  
- [ ] Pe foaie: unde ai folosi o astfel de îmbinare acasă?

## Recapitulare rapidă
1. Îmbinare = **o parte lată trece printr-un loc larg și stă într-unul îngust**  
2. Gaură **mai mare** decât cap, fantă **mai mare** decât ax, dar **mai mică** decât cap  
3. Piesele rămân **separate**  
4. Verificare din **Front**

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** A = Box 40·30·5 − Hole Ø10 (centru 10) − fantă 14·5,4 (din centru) · B = Box 30·20·3 + ax Ø5·6 (+3) + cap Ø9·2 (+9)  
**Complet:** A pe B (+3) → A împinsă 7 mm → al doilea bolț

**Quiz scurt:**  
- De ce capul de Ø9 nu iese prin fanta de 5,4?  
- Ce joc are axul în fantă? *(0,2 mm pe parte)*  
- De ce nu grupăm A cu B?

## Temă
Opțional: găsește acasă un obiect care se agață pe un perete cu o îmbinare asemănătoare și desenează-l cu cote.
