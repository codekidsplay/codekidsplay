# Lecția 1 — Gravitație și săritură
**Modulul 5 · Reguli de joc · Block 1**  
**Code Kids Play · Maestru de jocuri**

> Azi: modelul clasic cu **`viteza_y`** — cazi, sari, aterizezi pe platforme **fără** săritură infinită și **fără** să treci prin podea.  
> Fișier **nou**: `Prenume_Nume_M5_L1` · proiect: **„Sărituri pe platforme”**

---

## Obiectiv
**Minim:** erou stânga/dreapta · `viteza_y` + gravitație · sare pe **spațiu** doar pe sol · aterizează pe ≥**2** platforme · reset la steag.  
**Ținta orei (Complet):** Minim + ≥**3** platforme pe traseu **sau** perete care te oprește pe x **sau** o monedă pe ultima platformă.

## De ce contează
Fără `viteza_y`, săritura e „teleport sus” sau rămâi în aer.  
Același tip de gândire (variabilă de viteză + sol) te ajută la jocuri grele și la proiectul mare L7.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Demo: săritură bună vs infinită / prin podea |
| 15–30 | Rețeta `viteza_y` pe foaie |
| 30–100 | Construiești (Minim → Complet) |
| 100–120 | Test coleg + salvare |

**Capitole:**  
<span style="color:#4C97FF;font-weight:700">Mișcare</span> · <span style="color:#FF8C1A;font-weight:700">Variabile</span> · <span style="color:#FFAB19;font-weight:700">Control</span> · <span style="color:#5CB1D6;font-weight:700">Detectare</span>

---

## Pas cu pas

### 1) Ideea pe foaie *(5 minute, înainte de Scratch)*
Eroul are un număr secret, `viteza_y`: cât de repede urcă (pozitiv) sau coboară (negativ) la fiecare repetare.  
- Când stă pe loc, `viteza_y` = 0.  
- Când sare, primește o împingere în sus: `viteza_y` = 12.  
- La fiecare pas, **gravitația scade 1** din ea: 12, 11, 10 … 0 *(vârful săriturii)* … −1, −2 … și eroul cade.  
Săritura e deci o **frână care devine cădere**, nu o teleportare.

**Încearcă tu — pe foaie (5 min):** scrie primele 6 valori ale lui `viteza_y` după ce eroul apasă spațiu: *12, 11, 10, 9, 8, 7*.

### 2) Scena *(10 minute)*
1. Proiect nou → `Prenume_Nume_M5_L1`  
2. Un sprite **Teren**, desenat dintr-un singur costum: o **podea** jos și **2–3 platforme** deasupra. Platformele sunt la cel mult **60 de pași** una deasupra celeilalte *(săritura urcă ~78 de pași; cu 60 ai loc să nu te lovești)*  
3. Eroul *(Erou)* sus, deasupra podelei  
4. Variabile *(pentru toate sprite-urile)*: `viteza_y` și `pe_sol`  
5. Pe **steag**, la Erou: `du-te la x: -200 y: -100` · `setează viteza_y la 0` · `setează pe_sol la 0`  

**Verifici:** dacă muți manual eroul pe ecran, el nu intră în Teren la start.

### 3) Gravitația *(Minim, partea 1 · 10 minute)*
Sub `la apăsarea steagului` ai deja pasul 2.4. Adaugi un `repetă la nesfârșit` și, înăuntru, **în ordinea asta**:
1. <span style="color:#FF8C1A;font-weight:700">schimbă viteza_y cu</span> `-1`  
2. <span style="color:#4C97FF;font-weight:700">schimbă y cu</span> `viteza_y` *(pui variabila `viteza_y` în loc de număr)*  

**Verifici:** apeși steagul — eroul **cade** și trece prin podea, ieșind din ecran. Așa trebuie! Podeaua nu l-a oprit încă.

### 4) Podeaua *(Minim, partea 2 · 15 minute)*
Sub cele două blocuri, în același `repetă la nesfârșit`, pui `dacă … atunci … altfel`:
- **dacă** <span style="color:#5CB1D6;font-weight:700">atinge Teren?</span> **atunci**:  
  1. `dacă viteza_y < 0` **atunci** `setează pe_sol la 1` *(cădeai, deci ai aterizat)*  
  2. `repetă până când <nu <atinge Teren?>>` → `schimbă y cu 1` *(îl ridici până iese din podea)*  
  3. `setează viteza_y la 0`  
- **altfel**: `setează pe_sol la 0` *(ești în aer)*

**Verifici:** apeși steagul — eroul cade, aterizează pe podea și rămâne pe ea, **fără să tremure**. În timp ce stă, `pe_sol` rămâne 1 *(bifează căsuța variabilei, ca s-o vezi pe scenă)*.

### 5) Săritura *(Minim, partea 3 · 10 minute)*
Sub `dacă … altfel`, tot în `repetă la nesfârșit`:
- `dacă <<tasta spațiu apăsată?> și <pe_sol = 1>>` **atunci** `setează viteza_y la 12`

**Verifici, de fiecare dată:**  
- Apeși spațiu pe sol → sari.  
- Apeși spațiu în aer → **nu** sari a doua oară.  
- Ții spațiul apăsat → sari din nou imediat ce aterizezi *(e normal)*.

### 6) Stânga și dreapta *(Minim, partea 4 · 10 minute)*
Tot în `repetă la nesfârșit`:
- `dacă <tasta săgeată dreapta apăsată?>` → `schimbă x cu 4`  
- `dacă <tasta săgeată stânga apăsată?>` → `schimbă x cu -4`

**Verifici:** poți merge pe podea și urca pe cel puțin **2 platforme**, săltând de pe podea. Steagul readuce eroul la start.

### 7) Complet *(alege cel puțin una)*
- [ ] **3 platforme** pe un traseu scurt  
- [ ] **Perete** pe x: o bară verticală în Teren. La mers, **înainte** să te miști: `dacă <atinge Teren?>` după mutare → mergi înapoi cu același pas *(`schimbă x cu -4`)*  
- [ ] O **monedă** sus, pe ultima platformă, care apare doar când o atingi *(`ascunde`)*

> **Atenție:** dacă sari de jos într-o platformă, eroul o traversează și ajunge deasupra ei, fiindcă „îl ridicăm” din platformă. E o platformă „one-way”, ca în multe jocuri. Dacă nu-ți place, pune platformele mai sus decât poate urca eroul.

---

## Greșeli frecvente
1. **Eroul trece prin podea** → lipsește `repetă până când … schimbă y cu 1`, sau `atinge Teren?` verifică alt sprite.  
2. **Eroul tremură pe podea** → ai pus `schimbă y` **înainte** de `schimbă viteza_y`. Ordinea corectă: gravitația, apoi y.  
3. **Săritură infinită** → spațiul setează `viteza_y` fără `pe_sol = 1`.  
4. **Nu sare deloc** → `pe_sol` nu devine 1: verifici `dacă viteza_y < 0`.  
5. **Zboară prea sus** → `viteza_y` 12 e prea mare pentru platformele tale: pune 10.  
6. **Cade prea violent** → gravitația −1 e deja bună; −5 e prea mult.  
7. **Blocurile sunt în afara `repetă la nesfârșit`** → se execută o singură dată.

---

## De făcut azi — „Sărituri pe platforme”
Salvat: `Prenume_Nume_M5_L1`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | `viteza_y` · gravitație · `pe_sol` · săritură doar pe sol · ≥2 platforme · reset |
| **Complet** | Minim + 3 platforme **sau** perete pe x **sau** monedă |

---

## Bonus
- [ ] Coyote time scurt (0.1 s după ce ai părăsit platforma)  
- [ ] Sunet la săritură / aterizare  

## Recapitulare rapidă
1. `viteza_y` = partea care face săritura  
2. Pe sol: viteza 0 + aliniere  
3. Spațiu **doar** pe sol  

## Schema pe scurt *(pe foaie)*

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
A 3-a platformă. Urmează L2 = **derulare**.
