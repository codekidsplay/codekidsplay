# Lecția 2 — Sparge blocuri (minat)
**Modulul 6 · Lume de cuburi · Block 1 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui `Prenume_Nume_M6_LumeCuburi`.  
> Azi: **spargi** blocuri aproape de erou → dispar / devin aer + **resursă** în variabilă.

---

## Obiectiv
**Minim:** ≥**2** tipuri de bloc care se pot sparge · clic stânga (sau tasta pe bloc) · **rază** (`distanța până la Erou < raza`, adică 80) · +1 la resursa potrivită · ≥**5** spargeri pe sesiune.  
**Complet:** Minim + reacție sunet/costum la spargere **sau** clone care se `șterge` curat **sau** nu poți sparge aer/gol.

## De ce contează
Fără **rază**, jucătorul minează „la celălalt capăt al ecranului” — greșeală clasică.  
Spargerea hrănește inventarul (L4) și construcția (L3).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Demo: rază + sparge vs „click oriunde” |
| 12–25 | Pe foaie: ce tip → ce resursă (`lemn` / `piatra`) |
| 25–100 | Construiești (Minim → Complet) |
| 100–120 | Test coleg + salvare |

**Capitole:**  
<span style="color:#5CB1D6;font-weight:700">Detectare</span> (distanță, click) · <span style="color:#FF8C1A;font-weight:700">Variabile</span> · <span style="color:#FFAB19;font-weight:700">Control</span> · clone (dacă e cazul)

---

## Pas cu pas

Lucrezi în `Prenume_Nume_M6_LumeCuburi`, **aceeași copie** de la L1.

### 1) Regula *(5 minute, pe foaie)*
Un click pe un bloc îl sparge **doar dacă** eroul e destul de aproape. Altfel s-ar putea mina de la celălalt capăt al ecranului.  
Distanța dintre centrele a două celule vecine e 32; două celule mai departe, 64. Alegem **raza = 80**: eroul ajunge la blocurile de la cel mult 2 celule.

**Încearcă tu — pe foaie (3 min):** un bloc e la 3 celule de erou *(96)*. Se sparge? *(Nu: 96 > 80.)*

### 2) Variabilele *(10 minute)*
1. Variabile *(pentru toate sprite-urile, bifate pe scenă)*: `lemn`, `piatra`, `raza`  
2. Pe steag, la Scenă *sau* la Erou: `setează lemn la 0` · `setează piatra la 0` · `setează raza la 80`

**Verifici:** pe scenă se văd trei numere. Steagul le pune pe 0, 0 și 80.

### 3) Spargerea *(Minim · 25 minute)*
La `Bloc`, un script nou:
- `când se dă click pe acest personaj`  
- `dacă <(distanța până la [Erou]) < raza>` **atunci**:  
  1. `dacă <costum [număr] = 1>` → `schimbă lemn cu 1`  
  2. `dacă <costum [număr] = 2>` → `schimbă piatra cu 1`  
  3. `șterge această clonă`

*(Scriptul rulează pe fiecare clonă, nu pe original. Clona ștearsă nu mai e pe scenă, iar în locul ei rămâne un **gol**.)*

**Verifici (de fiecare dată):**  
- Un bloc **departe**: click, nu se întâmplă nimic.  
- Un bloc **aproape**: click, dispare și `lemn` sau `piatra` crește cu 1, după culoarea blocului.  
- Spargi cel puțin **5** blocuri într-o sesiune și ai ambele resurse.  
- Un click pe un gol nu face nimic *(nu e nimic de apăsat)*.

### 4) Complet *(alege cel puțin una)*
- [ ] **Sunet:** `pornește sunetul [Pop]` înainte de `șterge această clonă`  
- [ ] **Gol curat:** după ce spargi un rând din fața eroului, poți merge pe unde ai spart *(blocul nu mai există, deci `atinge Bloc?` e fals)*  
- [ ] **Bloc „greu”:** un al treilea costum *(negru)* care are nevoie de **2 click-uri**: la primul, doar `treci la costumul 2`; la al doilea se sparge


---

## Greșeli frecvente
1. **Se sparge de departe** — lipsește `distanța până la Erou < raza`, sau `raza` nu e setată *(arată 0 și nimic nu se sparge, sau o valoare mare)*.  
2. **Nu se sparge nimic** — `raza` e 0: setează-o pe 80 la steag.  
3. **Resursa nu crește** — verifică numărul costumului *(1 = lemn, 2 = piatră)* și variabila din `schimbă`.  
4. **Variabilele sunt pe Erou și nu se văd** — creează-le pentru toate sprite-urile și bifează-le.  
5. **Clone rămase** — `șterge această clonă` lipsește: blocul „dispare” dar tot se poate apăsa.  
6. **Click pe Erou, nu pe bloc** — eroul acoperă celula; sparge blocurile din jurul lui.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 2 tipuri · clic sparge · rază · +resursă · restart |
| **Complet** | Minim + reacție **sau** gol curat **sau** resurse distincte fine |

---

## Bonus
- [ ] Bloc „greu” (pierde 2s / 2 click-uri)  
- [ ] Cap: max 30 pe tip  

## Recapitulare rapidă
1. Rază = regulă de aur  
2. Clic stânga = sparge (E = mai târziu)  
3. Resurse pe Scenă

## Schema pe scurt

**Sparge**  
click pe bloc → `dacă distanța < raza` *(80)* → `schimbă lemn/piatra cu 1` → șterge/aer  

**Steag**  
`setează lemn/piatra la 0` · erou la start  

**Quiz scurt:**  
- De ce există raza?  
- Ce se întâmplă departe de erou?  
- Ce face L3 diferit?

## Temă
Opțional: al 3-lea tip de bloc. Urmează L3 = **pune**.
