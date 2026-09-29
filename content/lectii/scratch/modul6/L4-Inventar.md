# Lecția 4 — Inventar (resurse pe scenă)
**Modulul 6 · Lume de cuburi · Block 2 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui același proiect.  
> Azi: inventarul e **clar pe ecran** — câte resurse ai, ce tip e activ.  
> *(În M5 ai învățat liste; aici inventarul e pe **resurse de lume**: lemn / piatră / pământ.)*

---

## Obiectiv
**Minimum:** ≥**2** tipuri (ideal 3) vizibile pe Scenă · sparge crește · pune scade · **nu** pui la 0 · steag resetează · colegul citește inventarul **fără** explicații.  
**Complet:** Minim + selectare **1/2/3** + indicator „activ: …” **sau** cap max pe tip **sau** listă Scratch pe lângă variabile.

## De ce contează
Fără UI, nimeni nu știe ce poți construi.  
Inventarul leagă minat (L2), construcție (L3) și craft (L7).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Inventar = cutii cu numere (nu magie) |
| 12–30 | UI pe scenă + tip activ |
| 30–100 | Legi sparge/pune de inventar (Minim → Complet) |
| 100–120 | Test „străin” + salvare |

---

## Pas cu pas

### 1) Sloturi pe Scenă
1. Variabile: `lemn`, `piatra`, `pamant` (sau 2 dacă e greu) — **pe Scenă**, mari, lizibile  
2. Opțional: sprite-uri „icon” lângă numere  
3. Steag: setează start (0 sau kit mic)  

**Încearcă tu — UI (10 min)**  
- [ ] Se citesc de la 2 m distanță de ecran  

### 2) Sparge / pune legate *(Minim)*
1. Sparge tip X → `schimbă X cu 1`  
2. Pune tip X → doar dacă `X > 0` → `schimbă X cu -1`  
3. Mesaj scurt dacă e 0  

**Încearcă tu (20 min)**  
- [ ] Flux: sparge 3 → pune 2 → rămâne 1 pe ecran  

### 3) Tip activ *(recomandat Minim+)*
Taste **1 / 2 / 3** → variabilă `tip_activ` = lemn / piatră / pământ  
Pui doar tipul activ.

**Încearcă tu (15 min)**  
- [ ] Schimbi tipul și pui altfel de bloc  

### 4) Complet
Alege **cel puțin una**:  
- [ ] Indicator text/costum „activ: piatră”  
- [ ] Cap (ex. max 20 / tip)  
- [ ] Listă Scratch care ține numele itemelor speciale  

---

## Greșeli frecvente
1. **Numere mici, în colț** — colegul nu le vede.  
2. **Pui la 0** — Minim interzice.  
3. **Reset care uită inventarul** — steagul trebuie să-l reseteze.  
4. **Re-lecție abstractă de liste** — azi e inventar de **lume**, nu exercițiu M5.  
5. **3 tipuri pe foaie, 1 pe scenă** — Minim ≥2 pe bune.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | ≥2 tipuri vizibile · sparge+ · pune− · blocat la 0 · reset · test coleg |
| **Complet** | Minim + 1/2/3 **sau** cap **sau** listă suplimentară |

---

## Bonus
- [ ] Stack rar: bloc special → +3  
- [ ] Sunet diferit pe tip  

## Recapitulare rapidă
1. Inventar pe Scenă = obligatoriu  
2. 0 = nu construiești  
3. Tip activ pregătește craft-ul

## Schema pe scurt

**UI**  
Scenă: `lemn` · `piatra` · (`pamant`) · optional `tip_activ`  

**Flux**  
sparge → +1 · pune → dacă >0 atunci −1  

**Quiz scurt:**  
- Unde stau variabilele?  
- Ce vezi tu vs ce vede colegul?  
- Ce adaugă tastele 1/2/3?

## Temă
Indicator „activ”. Urmează L5 = **două zone**.
