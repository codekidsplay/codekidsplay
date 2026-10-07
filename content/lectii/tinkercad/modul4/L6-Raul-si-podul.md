# Lecția 6 — Râul și podul
**Modulul 4 · Orașul nostru**  
**Code Maker Club · City Builder**  
**Vârstă:** ~8–10 ani

> Azi tai un **râu** prin parc cu un **Hole** și îl treci cu un **pod**.  
> Proiect: pe placa ta · `Prenume_Nume_T4_L06`

---

## Obiectiv
La finalul orei ai un **râu cu apă albastră** care străbate zona de parc și un **pod** cu parapete peste el.  
**Minim:** râu tăiat în zona de parc cu un **Hole 67·12·2** *(zona rămâne în două bucăți)* · apă **67·12·0,5** albastră · pod: platformă **8·20·2** + **2 parapete** **1·20·1,5**.  
**Complet:** Minim + **4 stâlpi** **Ø1,5·4** pe capetele parapetelor + o **barcă** pe apă (corp, catarg, pânză).

## De ce contează
Un oraș are adesea un râu. Podul leagă cele două maluri. Aici folosești **Hole** pentru a **tăia** o formă și un truc: grupezi gaura **doar** cu zona de parc, nu cu toată placa.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 · unde trece râul pe placa ta? |
| 10–45 | Pas cu pas: tăiem râul · apa · podul |
| 45–100 | Minim → Complet (stâlpi, barcă) → Bonus |
| 100–120 | Recap, quiz, salvare |

**Unelte azi:** **Box** · **Cylinder** · **Hole** · **Align** (**L**) · **Snap Grid 0.5 / 1.0** · **Ctrl+D** · **Ctrl+G** · **View Cube** (Top, Front) · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. Copia proiectului `Prenume_Nume_T4_L05` (**Duplicate**), redenumită `Prenume_Nume_T4_L06` *(sau placa refăcută rapid)*  
2. Snap Grid: **1.0 mm**

### 2) Tăiem râul
1. **Box** → **67 · 12 · 2** → **Hole** *(2 mm, ca să taie sigur toată zona de 1 mm)*  
2. Selectezi gaura și **zona de parc** (verde) → **L** → mijloc pe stânga–dreapta și mijloc pe față–spate *(centrată)*  
3. O ridici la **3 mm** *(zona e între 3 și 4 mm, gaura între 3 și 5 mm → taie zona complet, dar nu atinge placa)*  
4. Selectezi **doar** gaura și zona de parc (Shift+click) → **Ctrl+G**  
5. Din **Top**: zona de parc e acum **tăiată în două** de un canal

> **Atenție:** nu selecta placa! Dacă o grupezi și pe ea, găurești tot cartierul.

### 3) Apa
1. Snap Grid: **0.5 mm**  
2. **Box** → **67 · 12 · 0,5** → **Color** albastru  
3. **L** cu zona de parc: mijloc pe ambele axe *(în canal)*  
4. O ridici la **3 mm** *(pe placă)*  
5. Din **Top**: râu albastru între două maluri verzi *(apa e puțin mai jos decât malurile)*

### 4) Podul
1. Snap Grid: **1.0 mm**  
2. **Box** → **8 · 20 · 2** *(platforma)*: lungimea de 20 mm trece **peste** râu și are câte 4 mm pe fiecare mal  
3. **L** cu zona de parc: mijloc pe față–spate; apoi o muți pe stânga–dreapta în **partea dreaptă** a zonei, cu marginea din dreapta a podului la **4 mm** de marginea zonei *(în stânga rămâne loc pentru copacii din L7)*  
4. O ridici la **4 mm** *(stă pe cele două maluri)*  
5. **Color**: gri sau maro

### 5) Parapetele
1. **Box** → **1 · 20 · 1,5**  
2. **L** cu platforma: marginea din **stânga** *(la stânga și în față–spate: mijloc)*; ridicat la **6 mm** *(pe platformă)*  
3. **Ctrl+D** → muți copia **7 mm spre dreapta** → parapetul de la marginea din dreapta  
4. Selectezi platforma și parapetele → **Ctrl+G** → „podul”

### 6) Complet — stâlpi
1. **Cylinder** **1,5 · 1,5 · 4**, ridicat la **6 mm**  
2. **L** cu parapetul din stânga → mijloc pe stânga–dreapta; punctul din **spate** al parapetului *(stâlpul stă pe capătul din spate și iese 2,5 mm deasupra parapetului)*  
3. **Ctrl+D** → muți copia **7 mm spre dreapta** *(capătul din spate al celuilalt parapet)*  
4. Selectezi ambii stâlpi → **Ctrl+D** → selectezi și platforma → **L** → punctul din **față** *(copiile se aliniază cu capătul din față al podului)*  
5. Din **Top**: câte un stâlp la fiecare colț al podului

### 7) Complet — barca
1. Snap Grid: **0.5 mm**  
2. **Box** **8 · 3 · 1** *(corpul)* maro, pe apă, la **3,5 mm**, departe de pod  
3. **Cylinder** **0,6 · 0,6 · 6** *(catargul)*, pe mijlocul bărcii, ridicat la **4,5 mm**  
4. **Box** **3 · 0,3 · 4** *(pânza)* albă, lipită de catarg, la **6 mm**  
5. **Ctrl+G** pe barcă

---

## Greșeli frecvente
1. **Râul a găurit toată placa** — ai grupat și placa. Gaura se grupează **doar** cu zona de parc.  
2. **Zona rămâne întreagă** — gaura nu e Hole sau nu a fost grupată.  
3. **Apa e sub placă** — nu e ridicată la 3 mm.  
4. **Podul nu ajunge pe maluri** — are mai puțin de 20 mm lungime.  
5. **Podul plutește** — nu e ridicat la 4 mm.  
6. **Parapetele sunt la înălțimi diferite** — mută primul, apoi doar **Ctrl+D**.  
7. **Barca stă în pod** — mută-o pe apă, la alt loc.

---

## De făcut azi — „Râul și podul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Râu (Hole 67·12·2 grupat cu zona) + apă albastră + pod 8·20·2 cu 2 parapete |
| **Complet** | + 4 stâlpi + barcă pe apă |

### Pasul 1 — Minim
- [ ] Hole **67·12·2** centrat pe zona de parc, la 3 mm, grupat **doar** cu zona  
- [ ] Apă **67·12·0,5** albastră, la 3 mm  
- [ ] Pod **8·20·2** la 4 mm  
- [ ] 2 parapete **1·20·1,5** la 6 mm · **Ctrl+G**  

### Pasul 2 — Complet
- [ ] 4 stâlpi  
- [ ] Barcă cu catarg și pânză  
- [ ] **Color** · numele `T4_L06` e corect  

---

## Bonus (extra — după Complet)
- [ ] Un al doilea pod, pentru pietoni  
- [ ] Pește sau rațe (sfere mici) pe apă  
- [ ] Un mal cu stuf: conuri mici (Cone) verzi

## Recapitulare rapidă
1. Râul = **Hole** grupat **doar** cu zona de parc  
2. Apa e **mai jos** decât malurile  
3. Podul are **4 mm** pe fiecare mal

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Hole 67·12·2 (+3) + zona de parc → Group → apă 67·12·0,5 (+3) → pod 8·20·2 (+4) → 2 parapete 1·20·1,5 (+6, 7 mm) → Group  
**Complet:** 4 stâlpi · barcă

**Quiz scurt:**  
- Cu ce obiecte grupezi gaura râului?  
- Cât de lung este podul și de ce?  
- Cât de lat e râul în realitate? *(6 m)*

## Temă
Opțional: pe foaie, desenezi cum ar arăta orașul tău dacă râul ar trece prin centru. Unde ai pune podurile?
