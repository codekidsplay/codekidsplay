# Lecția 1 — Gravitație și săritură
**Modulul 5 · Mecanici de joc · Block 1**  
**Code Kids Play · Maestru de jocuri**

> Azi: modelul clasic cu **`viteza_y`** — cazi, sari, aterizezi pe platforme **fără** săritură infinită și **fără** să treci prin podea.  
> Fișier **nou**: `Prenume_Nume_M5_L1` · proiect: **„Sărituri pe platforme”**

---

## Obiectiv
**Minimum:** erou stânga/dreapta · `viteza_y` + gravitație · sare pe **spațiu** doar pe sol · aterizează pe ≥**2** platforme · reset la steag.  
**Ținta orei (Complet):** Minim + ≥**3** platforme pe traseu **sau** anti-dublu-jump clar **sau** perete care te oprește pe x.

## De ce contează
Fără `viteza_y`, săritura e „teleport sus” sau rămâi în aer.  
Același tip de gândire (variabilă de viteză + sol) te ajută la jocuri grele și la proiectul mare L7.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Demo: săritură bună vs infinită / prin podea |
| 15–30 | Rețeta `viteza_y` pe tablă |
| 30–100 | Construiești (Minim → Complet) |
| 100–120 | Test coleg + salvare |

**Capitole:**  
<span style="color:#4C97FF;font-weight:700">Mișcare</span> · <span style="color:#FF8C1A;font-weight:700">Variabile</span> · <span style="color:#FFAB19;font-weight:700">Control</span> · <span style="color:#5CB1D6;font-weight:700">Detectare</span>

---

## Pas cu pas

### 1) Rețeta pe tablă *(obligatoriu înainte de Scratch)*
În `forever` pe **Erou** (idee):
1. <span style="color:#4C97FF;font-weight:700">schimbă y cu</span> `viteza_y`  
2. <span style="color:#FF8C1A;font-weight:700">schimbă viteza_y cu</span> `-1` *(gravitație — poți −0.5 dacă e prea rapid)*  
3. `dacă` atinge **Podea** / platformă (culoare sau sprite):  
   - `setează viteza_y la 0`  
   - ajustează y **deasupra** platformei (nu înăuntru)  
4. `dacă` tasta spațiu **și** ești pe sol → `setează viteza_y la 12` (sau 10–15)  
5. Stânga/dreapta: `schimbă x cu ±…` în aceleași `forever` / `dacă`

**Pe sol =** atingi podeaua **sau** un flag `pe_sol = 1` setat la aterizare, 0 în aer.

**Încearcă tu — pe foaie (5 min)**  
- [ ] Ai scris cei 4 pași (y · gravitație · sol · săritură)  

### 2) Scena
1. Proiect nou → `Prenume_Nume_M5_L1`  
2. Fundal + **Podea** (sprite sau culoare detectabilă) + ≥2 platforme  
3. Variabilă `viteza_y` (poate fi pe Erou; nu e obligatoriu pe Scenă)  
4. Steag: `du-te la` start · `setează viteza_y la 0` · oprește sunete  

**Încearcă tu — scenă (8 min)**  
- [ ] Platformele nu se suprapun haotic  
- [ ] Steag → start curat  

### 3) Gravitație + săritură *(Minim)*
1. Montezi rețeta din pasul 1  
2. **Nu** lași spațiu să seteze `viteza_y` dacă **nu** ești pe sol  
3. Test: cazi de pe platformă → aterizezi; apeși spațiu în aer → **nu** mai sari  

**Încearcă tu — fizică (25–30 min)**  
- [ ] Fără săritură infinită  
- [ ] Nu treci prin podea (sau corectezi y la atingere)  
- [ ] ≥2 platforme folosite pe traseu  

### 4) Complet
Alege **cel puțin una**:  
- [ ] ≥3 platforme pe un traseu scurt  
- [ ] Flag `pe_sol` explicit (mai curat decât doar „atinge”)  
- [ ] Perete / margine pe x  

---

## Greșeli frecvente
1. **Spațiu setează viteza mereu** → săritură infinită. Verifică solul.  
2. **Doar `schimbă y cu 10` la spațiu** → fără gravitație, plutești.  
3. **Atingi podeaua dar nu resetezi y** → treci prin podea / tremuri.  
4. **Gravitație −5** → prea violent; începe cu −1.  
5. **Condițiile `dacă` în afara `forever`** → se verifică o dată.

---

## De făcut azi — „Sărituri pe platforme”
Salvat: `Prenume_Nume_M5_L1`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | `viteza_y` · gravitație · săritură doar pe sol · ≥2 platforme · reset |
| **Complet** | Minim + 3 platforme **sau** `pe_sol` **sau** pereți pe x |

---

## Bonus
- [ ] Coyote time scurt (0.1 s după ce ai părăsit platforma)  
- [ ] Sunet la săritură / aterizare  

## Recapitulare rapidă
1. `viteza_y` = motorul săriturii  
2. Pe sol: viteza 0 + aliniere  
3. Spațiu **doar** pe sol  

## Schema pe scurt *(pe tablă / pe foaie)*

**Forever Erou**  
`schimbă y cu viteza_y` → `schimbă viteza_y cu -1`  
`dacă` atinge podea → `viteza_y = 0` + corectează y  
`dacă` spațiu și pe sol → `viteza_y = 12`  
`dacă` săgeți → `schimbă x`  

**Quiz scurt:**  
- Ce oprește săritura infinită?  
- De ce schimbi y **cu** viteza, nu cu un număr fix la spațiu?  
- Ce continui la L2?

## Temă
A 3-a platformă. Urmează L2 = **scroll**.
