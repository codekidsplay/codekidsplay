# Lecția 8 — Proiect mare: inamici, clone, coliziuni
**Modulul 5 · Mecanici de joc · Block 3 · Fir L7→L10**  
**Code Kids Play · Maestru de jocuri**

> Continui `Prenume_Nume_M5_Proiect`.  
> Azi: **dificultate** — inamici / clone / colectabile pe traseul tău (platforme ± scroll).

---

## Obiectiv
**Minimum:** ≥1 tip de pericol (inamic pe patrulare **sau** clone periculoase) + ≥1 tip de colectabil · feedback la lovitură (HP sau restart) · cooldown · reset curăță clonele.  
**Complet:** Minim + 2 tipuri de inamici/colectabile **sau** generare dinamică pe hartă **sau** HP pe Scenă + Sfârșitul jocului.

## De ce contează
Fără pericol/colectabile, L7 e doar un trampoline.  
Pregătește Win/Lose pentru L9.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Recap L3 + clone (M3) pe tablă |
| 12–25 | Ce adaugi azi (din cele 3 note L7) |
| 25–100 | Implementezi + testezi |
| 100–120 | Coleg moare o dată și prinde o monedă |

---

## Pas cu pas

### 1) Alege setul Minim
- Pericol: patrulare (L3) **sau** clone care cad/vin  
- Colectabil: monede / stele (clone sau sprite-uri)  
- Lovitură cu `așteaptă` după −HP  

**Încearcă tu (5 min)**  
- [ ] Ai bifat tipurile  

### 2) Pe proiect *(Minim)*
1. Inamic/clone pe traseul din L7  
2. Colectabil → +scor sau +monede  
3. Steag / start: `șterge` clonele vechi · reset HP/scor  

**Dacă ai scroll:** montează inamicii pe lume (se mișcă cu camera) — nu îi lăsa „fix pe ecran” greșit.

**Încearcă tu (35–40 min)**  
- [ ] Pericolul lovește cu cooldown  
- [ ] Colectabilul dispare o dată  

### 3) Complet
Alege **cel puțin una**:  
- [ ] Generator `forever` → `așteaptă` → `creează clonă`  
- [ ] HP pe Scenă + mesaj la 0  
- [ ] Al 2-lea tip de inamic sau colectabil  

---

## Greșeli frecvente
1. **Feature nouă uriașă** — azi nu schimbi tot jocul.  
2. **Clone fără ștergere** — lag + fantome.  
3. **HP spam** — uită cooldown.  
4. **Inamici doar pe ecranul de start** — pe tot traseul.  
5. **Proiect nou** — greșit.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_Proiect`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Pericol + colectabil + feedback + reset clone |
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
