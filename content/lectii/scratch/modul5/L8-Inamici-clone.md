# Lecția 8 — Proiect mare: inamici, clone, atingeri
**Modulul 5 · Reguli de joc · Block 3 · Fir L7→L10**  
**Code Maker Club · Maestru de jocuri**

> Continui `Prenume_Nume_M5_Proiect`.  
> Azi: **dificultate** — inamici / clone / colectabile pe traseul tău (platforme ± derulare).

---

## Obiectiv
**Minim:** ≥1 tip de pericol (inamic pe patrulare **sau** clone periculoase) + ≥1 tip de colectabil · reacție la lovitură (HP sau restart) · pauză între lovituri · reset curăță clonele.  
**Complet:** Minim + 2 tipuri de inamici/colectabile **sau** generare dinamică pe hartă **sau** HP pe Scenă + Sfârșitul jocului.

## De ce contează
**Pe scurt:** o *clonă* = o copie temporară a unui personaj. Poți face multe inamici sau monede dintr-un singur personaj.  
Fără pericol/colectabile, L7 e doar un trampoline.  
Pregătește Win/Lose pentru L9.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Recap L3 + clone (M3) pe foaie |
| 12–25 | Ce adaugi azi (din cele 3 note L7) |
| 25–100 | Implementezi + testezi |
| 100–120 | Coleg moare o dată și prinde o monedă |

---

## Pas cu pas

Lucrezi în `Prenume_Nume_M5_Proiect`, **aceeași copie** de la L7.

### 1) Alegi setul *(5 minute, pe foaie)*
Din cele 3 note de la L7 alegi pentru Minim: **un pericol** *(inamic care patrulează)* și **un colectabil** *(monede din clone)*.

### 2) Inamicul pe traseu *(Minim, partea 1 · 20 minute)*
1. Variabila `viață` *(pentru toate sprite-urile)*; pe steag, la Erou: `setează viață la 3`  
2. Sprite `Inamic`, cu `dir` **numai pentru acest sprite**. Aceeași patrulare ca în L3, dar pe o platformă: `du-te la x: 0 y: (înălțimea platformei)`, apoi `repetă la nesfârșit` → `schimbă x cu (dir * 2)` și întoarcere la limitele platformei  
3. La **Erou**, în `repetă la nesfârșit`: `dacă <atinge Inamic?>` **atunci** → `schimbă viață cu -1` → `du-te la start` → `spune Au!` timp de `1` secundă

**Verifici:** inamicul patrulează doar pe platforma lui. Te atinge și pierzi **o** viață, nu toate deodată.

### 3) Colectabilul din clone *(Minim, partea 2 · 20 minute)*
Sprite `Monedă`, variabilele `scor` și `k` *(pentru toate sprite-urile)*:
1. Pe steag: `ascunde` · `setează scor la 0` · `setează k la 0`  
2. `repetă 5`: `schimbă k cu 1` → `du-te la x: (-200 + (k * 80)) y: (înălțimea unei monede)` → `creează o clonă a mea`  
3. `când încep ca o clonă`: `arată` și `repetă la nesfârșit`:  
   - `dacă <atinge Erou?>` **atunci** `schimbă scor cu 1` și `șterge această clonă`

**Verifici:** pe traseu apar 5 monede; când le atingi, `scor` crește cu 1 și moneda dispare **o singură dată**.

### 4) Resetul *(Minim · 5 minute)*
Pe steag, apasă din nou — monedele reapar și `viață` și `scor` sunt iar la început. *(Clonele sunt șterse automat când apeși steagul sau oprirea.)*

**Dacă ai derulare:** inamicul și monedele trebuie să se miște cu lumea, nu să rămână „lipite” de ecran.

### 5) Complet *(alege cel puțin una)*
- [ ] **Generator:** în `Monedă`, după primele 5: `repetă la nesfârșit` → `așteaptă 3 secunde` → `creează o clonă a mea` *(la poziție aleatorie pe x)*  
- [ ] **Viață pe Scenă:** `viață` afișată mare; la `viață = 0` → `spune Sfârșit` și `oprește tot`  
- [ ] **Al doilea tip:** un inamic diferit *(viteză mai mare)* sau o monedă care valorează 5


---

## Greșeli frecvente
1. **Moare imediat** — lipsește `spune … 1 secundă` sau `du-te la start` după lovitură.  
2. **Monedele apar peste tot, sau nu apar** — verifică `x: (-200 + (k * 80))` și `k` setat pe 0 la steag.  
3. **Clonele rămân la restart** — `oprește tot` șterge clonele; steagul le recreează curat.  
4. **O monedă adaugă scor de mai multe ori** — lipsește `șterge această clonă`.  
5. **Inamicul iese de pe platformă** — limitele din patrulare nu se potrivesc cu platforma.  
6. **Proiect nou** — folosești același fișier din L7.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_Proiect`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Pericol + colectabil + reacție + reset clone |
| **Complet** | Minim + generator **sau** HP final **sau** tip 2 |

---

## Bonus
- [ ] Sari pe cap = inamic dispare  
- [ ] Colectabil rar pentru shop  

## Recapitulare rapidă
1. Pericol + recompensă  
2. Clone curate la reset  
3. L9 = meniu + win/lose  

## Schema pe scurt

**Clonă colectabil**  
creează → mișcă → atinge erou → +scor · șterge  

**Inamic**  
patrulează → atinge → HP−1 → așteaptă  

**Quiz scurt:**  
- Ce resetează steagul azi?  
- Unde e pericolul pe hartă?  
- Ce ecran lipsește (L9)?

## Temă
HP pe Scenă dacă lipsește. Urmează L9 = **joc complet**.
