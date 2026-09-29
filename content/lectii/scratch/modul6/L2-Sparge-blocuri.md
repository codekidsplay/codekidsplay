# Lecția 2 — Sparge blocuri (minat)
**Modulul 6 · Lume de cuburi · Block 1 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui `Prenume_Nume_M6_LumeCuburi`.  
> Azi: **spargi** blocuri aproape de erou → dispar / devin aer + **resursă** în variabilă.

---

## Obiectiv
**Minimum:** ≥**2** tipuri de bloc spargabile · clic stânga (sau tasta pe bloc) · **rază** (`distanța până la Erou < 100`) · +1 la resursa potrivită · ≥**5** spargeri pe sesiune.  
**Complet:** Minim + feedback sunet/costum la spargere **sau** clone care se `șterge` curat **sau** nu poți sparge aer/gol.

## De ce contează
Fără **rază**, jucătorul minează „la celălalt capăt al ecranului” — bug clasic.  
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

### 1) Regula pe tablă
1. **Clic stânga** pe bloc = încearcă să spargi  
2. Doar dacă `distanța până la [Erou] < 100` (ajustează 80–120)  
3. Succes → blocul dispare / costum „aer” + `schimbă lemn cu 1` (sau `piatra`)  
4. **Nu** pui bloc azi — asta e L3 (tasta E)

**Încearcă tu — regulă (3 min)**  
- [ ] Știi: fără rază = nu sparge  

### 2) Resurse pe Scenă
1. Variabile pe **Scenă:** măcar `lemn` și `piatra` (vizibile)  
2. La steag: `setează` la 0 (sau start) · poziție erou · oprește sunete  

**Încearcă tu — UI (8 min)**  
- [ ] Numerele se văd  
- [ ] Steag → 0  

### 3) Spargere cu rază *(Minim)*
**Varianta A — sprite-uri bloc:** pe fiecare tip / pe clonă:  
`când se dă click pe personajul acesta` →  
`dacă < distanța până la [Erou] < 100 >` → +1 resursă → `șterge` / `ascunde` / costum aer  

**Varianta B — clone dintr-un generator:** la spargere `șterge această clonă` + resursă.

**Încearcă tu — minat (30–35 min)**  
- [ ] De departe: **nu** sparge  
- [ ] De aproape: sparge + numărul crește  
- [ ] ≥2 tipuri de resursă  

### 4) Complet
Alege **cel puțin una**:  
- [ ] Sunet / particulă scurtă la spargere  
- [ ] Nu poți sparge de 2 ori același „gol”  
- [ ] Tipuri diferite dau resurse diferite pe bune  

---

## Greșeli frecvente
1. **Fără rază** — minat de la distanță.  
2. **Aceeași resursă pentru tot** — Minim cere tipuri diferite.  
3. **Spargi și pui pe același click** — azi doar sparge.  
4. **Variabile pe Erou, invizibile** — pe Scenă, bifate.  
5. **Clone rămase** — după spargere trebuie `șterge` / aer clar.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 2 tipuri · clic sparge · rază · +resursă · restart |
| **Complet** | Minim + feedback **sau** gol curat **sau** resurse distincte fine |

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
click pe bloc → `dacă distanța < 100` → `schimbă lemn/piatra cu 1` → șterge/aer  

**Steag**  
`setează lemn/piatra la 0` · erou la start  

**Quiz scurt:**  
- De ce există raza?  
- Ce se întâmplă departe de erou?  
- Ce face L3 diferit?

## Temă
Opțional: al 3-lea tip de bloc. Urmează L3 = **pune**.
