# Lecția 2 — Scroll / hărți extinse
**Modulul 5 · Mecanici de joc · Block 1**  
**Code Kids Play · Maestru de jocuri**

> Azi: lume **mai lată decât ecranul**. Folosim **`camera_x`** (sau `scroll_x`): lumea se mișcă **opus** eroului — iluzia de cameră.  
> Fișier **nou**: `Prenume_Nume_M5_L2` · proiect: **„Exploratorul pe hartă”**

---

## Obiectiv
**Minimum:** hartă pe **axa X** mai lungă decât scena · eroul se simte că „merge prin lume” · există obiectiv / capăt pe hartă · reset curat.  
**Complet:** Minim + 2 zone vizuale pe același scroll **sau** limite stânga/dreapta **sau** un obstacol pe traseu.

## De ce contează
Dacă muți doar eroul pe o scenă mică, nu ai „lume”.  
Scroll-ul e baza platformer-ului mare (L7–L8) și se leagă de ideea de zone din M6.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Demo: erou fix pe x vs lume care alunecă |
| 15–30 | `camera_x` pe tablă |
| 30–100 | Construiești Minim → Complet |
| 100–120 | Coleg explorează până la obiectiv |

**Idee pe tablă:**  
când eroul „ar vrea” să meargă dreapta → **scazi** `camera_x` / muți fundalul+platformele la **stânga** (opus).  
Eroul poate rămâne aproape de mijlocul ecranului.

---

## Pas cu pas

### 1) Design pe foaie
1. Lungime hartă (ex. 2–3 ecrane)  
2. Start + obiectiv (steag / ușă)  
3. Ce se mișcă cu scroll-ul (fundal, platforme, inamici statici)

**Încearcă tu (8 min)**  
- [ ] Schiță stânga→dreapta  

### 2) Variabila de cameră
1. Proiect nou → `Prenume_Nume_M5_L2`  
2. `camera_x` pe Scenă (sau Erou)  
3. Steag: `setează camera_x la 0` · poziții start  

**Încearcă tu (8 min)**  
- [ ] Variabila există · reset ok  

### 3) Scroll pe X *(Minim)*
Variante acceptate (alege **una**, ține-o):
- **A:** eroul stă ~mijloc; tastele schimbă `camera_x`; platformele/fundalul = `du-te la` în funcție de `camera_x`  
- **B:** grup de sprite-uri „Lume” se `schimbă x` opus când apeși dreapta/stânga  

Obiectivul trebuie **atins** pe hartă (nu e decor).

**Încearcă tu (30–35 min)**  
- [ ] Mergi „departe” față de start  
- [ ] Ajungi la obiectiv  
- [ ] Steag → înapoi la începutul hărții  

### 4) Complet
Alege **cel puțin una**:  
- [ ] 2 zone pe același drum (culori/fundal diferit)  
- [ ] Nu poți ieși din limitele hărții  
- [ ] Obstacol / groapă pe traseu  

---

## Greșeli frecvente
1. **Muți eroul și lumea în aceeași direcție** — iluzia se strică.  
2. **Scroll pe X și Y odată** — prea greu azi; Minim = **doar X**.  
3. **Prea multe clone la L2** — lag; ține sprite-uri puține.  
4. **Fără obiectiv** — e doar peisaj.  
5. **Reset care uită camera** — `camera_x = 0` la steag.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_L2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Scroll X · obiectiv pe hartă · reset camera |
| **Complet** | Minim + 2 zone **sau** limite **sau** obstacol |

---

## Bonus
- [ ] Parallax ușor (fundal se mișcă mai încet)  
- [ ] Indicator „progres pe hartă”

## Recapitulare rapidă
1. Lumea se mișcă **opus**  
2. Minim = doar axa X  
3. Obiectiv real pe hartă  

## Schema pe scurt

**Idee**  
dreapta apăsat → `camera_x` se schimbă → platformele `x = start_x - camera_x`  

**Quiz scurt:**  
- De ce opus, nu la fel?  
- De ce doar X azi?  
- Ce aduci din L1 în proiectul mare?

## Temă
Un obstacol pe traseu. Urmează L3 = **inamici pe patrulare**.
