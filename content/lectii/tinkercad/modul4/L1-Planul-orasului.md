# Lecția 1 — Planul orașului
**Modulul 4 · Orașul nostru**  
**Code Maker Club · City Builder**  
**Vârstă:** ~8–10 ani

> Azi stabilim **scara** și **placa** pe care construiești tot modulul: un cartier mic al orașului nostru.  
> Proiect: **„Cartierul meu”** · `Prenume_Nume_T4_L01` (poți adăuga zona: `_Nord`, `_Est`, `_Sud`, `_Vest`)

---

## Obiectiv
La finalul orei ai o **placă de 150 × 150 mm** cu **4 zone** colorate și **scara** scrisă pe ea: **1 m real = 2 mm în model**.  
**Minim:** placă **150·150·3** · scara scrisă cu Text (`1 m = 2 mm`) · **4 zone** de **67·67·1** (în colțuri, cu un gol de 16 mm între ele): locuințe, parc, centru, clădiri publice, fiecare de altă culoare.  
**Complet:** Minim + **legenda** (4 pătrățele colorate + nume) + **numele cartierului** + o **săgeată N** pentru nord.

## De ce contează
Toți elevii folosesc **aceeași placă și aceeași scară**, ca plăcile să se potrivească la sfârșit într-un oraș mare.  
Scara te ajută să știi cât de mare e o casă, o stradă sau o mașină față de realitate.

**Scara:** 1 m real = **2 mm** în model. O casă de 10 m lungime are 20 mm. O stradă de 8 m lățime are 16 mm.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ce e o scară? Calculăm: o casă de 10 m, o mașină de 4 m, o stradă de 8 m → câți mm? |
| 15–45 | Pas cu pas: placa · zonele în colțuri · culori |
| 45–100 | Minim → Complet (text, legendă, săgeată N) → Bonus |
| 100–120 | Tur rapid al planurilor, recap, salvare |

**Unelte azi:** **Box** · **Text** · **Align** (**L**, inclusiv marginile) · mărimi cu numere · **Ctrl+D** · **conul negru** · **Color** · **View Cube**

---

## Pas cu pas

### 1) Proiect nou și calculul scării
1. **Create new design** · nume `Prenume_Nume_T4_L01`  
2. Pe foaie, completezi: **1 m = 2 mm** → o casă de 10 m = **__ mm** · o mașină de 4 m = **__ mm** · o stradă de 8 m = **__ mm** *(20 · 8 · 16)*  
3. Snap Grid: **1.0 mm**

### 2) Placa
1. **Box** → **150 · 150 · 3** *(un pătrat de 75 m × 75 m în realitate)*  
2. Culoare neutră (gri deschis)

### 3) Cele 4 zone
1. **Box** → **67 · 67 · 1** → **L** cu placa → punctul din **stânga** și punctul din **spate** *(colțul din stânga-spate)*  
2. Îl ridici cu conul negru la **3 mm** — stă pe placă  
3. **Ctrl+D** → copia → **L** cu placa → punctul din **dreapta** și punctul din **spate**  
4. **Ctrl+D** → alta → **L** → **stânga** și **față**  
5. **Ctrl+D** → ultima → **L** → **dreapta** și **față**  
6. Între zone rămâne un gol de **16 mm** — acolo vor veni străzile  
7. **Color** pe zone: **stânga-spate** = locuințe (galben), **dreapta-spate** = parc (verde), **stânga-față** = centru (portocaliu), **dreapta-față** = clădiri publice (albastru)

### 4) Scara pe placă
1. **Text** (din Basic Shapes) → scrii `1 m = 2 mm`; înălțime (Height) **1 mm**; îl tragi de pătratele albe până are cam **30 mm** lungime  
2. Îl pui **pe zona de locuințe**, lângă marginea plăcii, ridicat la **4 mm** *(NU în golurile dintre zone: în L5 acolo vin străzile și ți-ar acoperi textul)*  
3. Verifici din **Top** că se citește

### 5) Complet — legenda, numele, săgeata
1. **Legenda:** 4 pătrățele **5 · 5 · 1** în culorile zonelor, într-un rând pe **zona de parc**, lângă marginea din spate a plăcii, ridicate la **4 mm**, cu câte un **Text** mic lângă fiecare *(„Locuințe”, „Parc”…; poți scrie doar „Loc.”, „Parc”, „Centru”, „Publ.”)*  
2. **Numele cartierului:** **Text** ex. `Cartierul Nord`, pe **zona de centru**, lângă marginea plăcii, ridicat la **4 mm**  
3. **Săgeata N:** un **Wedge** sau un **Cone** mic (6 mm) + litera `N`, pe **zona de locuințe**, lângă marginea din spate, la **4 mm**

*(Tot ce scrii rămâne la marginea zonelor, ca să fie loc pentru clădiri. În golurile dintre zone vin străzile.)*

---

## Greșeli frecvente
1. **Scara schimbată** — toate piesele din modul trebuie să respecte 1 m = 2 mm. Calculează înainte să tragi.  
2. **Zonele se ating** — nu ai lăsat golul de 16 mm. Fiecare zonă se lipește de **colț**, cu **L**.  
3. **Zonele sunt în aer** — ai uitat să le ridici la 3 mm.  
4. **Textul nu se vede** — e prea mic sau pe aceeași culoare cu placa. Mărește-l, schimbă culoarea.  
5. **Placa nu e 150** — verifică numerele; plăcile trebuie să fie **identice** pentru toți.  
6. **Textul e îngropat în placă sau în zonă** — ridică-l la 4 mm, pe zonă.

---

## De făcut azi — „Cartierul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Placă 150·150·3 · scara scrisă · 4 zone 67·67·1 în colțuri, culori diferite |
| **Complet** | + legenda + numele cartierului + săgeata N |

### Pasul 1 — Minim
- [ ] Calculul scării completat pe foaie  
- [ ] Placă **150·150·3**  
- [ ] 4 zone **67·67·1**, câte una în fiecare colț, ridicate la 3 mm  
- [ ] Culori diferite, golul de 16 mm între zone  
- [ ] Text cu scara pe placă  

### Pasul 2 — Complet
- [ ] Legendă cu 4 culori + nume  
- [ ] Numele cartierului  
- [ ] Săgeată **N**  
- [ ] Numele `T4_L01` e corect  

---

## Bonus (extra — după Complet)
- [ ] Grila: linii subțiri (Box 150·0,3·0,3) din 25 în 25 mm, ridicate la 4 mm, ca pe o hartă  
- [ ] O poartă a orașului la marginea plăcii  
- [ ] Calculează: cât de lungă e placa în realitate? *(150 mm = 75 m)*

## Recapitulare rapidă
1. Scara orașului: **1 m = 2 mm**  
2. Placa: **150 × 150 × 3**, la fel pentru toți  
3. Zonele în colțuri, **16 mm** între ele  
4. Din L5, în gol vin străzile

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** placă 150·150·3 → 4 zone 67·67·1 (colțuri, +3 mm) → culori → Text „1 m = 2 mm”  
**Complet:** + legendă · nume · săgeată N

**Quiz scurt:**  
- Câți mm are o casă de 12 m?  
- De ce toate plăcile au aceleași mărimi?  
- Cât e golul dintre zone? Ce vine acolo?

## Temă
Opțional: măsori pe hartă (sau cu pașii) o stradă din orașul tău și calculezi în mm cât ar fi pe placă. Scrie răspunsul pe foaie.
