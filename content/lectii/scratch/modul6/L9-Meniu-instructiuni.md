# Lecția 9 — Meniu Start + instrucțiuni
**Modulul 6 · Lume de cuburi · Block 3 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui **același** fișier (nu proiect nou).  
> Azi: ecran **Start**, reset curat, ghid de taste — ca un joc gata de prezentat.

---

## Obiectiv
**Minimum:** meniu Start (buton) · `start_joc` pornește lumea · restart / steag readuce meniul sau resetează tot · pe scenă: **Cum minezi / pui / craftezi** · coleg începe **singur** din meniu.  
**Complet:** Minim + `revino_meniu` · instrucțiuni pe ecran separat **sau** pauză I · controale multi-linie clare (clic / E / 1-2-3).

## De ce contează
Fără meniu, jocul „începe în mijloc”.  
Instrucțiunile înlocuiesc gura ta la L10.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Recap M3 L8: `start_joc` / `revino_meniu` |
| 12–30 | Text controale pe foaie |
| 30–100 | Meniu + reset + instrucțiuni pe scenă |
| 100–120 | Test coleg 5 min, zero ajutor |

**Controale de scris pe scenă (Minim):**  
- Săgeți = mișcare pe grilă  
- Clic stânga = sparge (aproape de tine)  
- E = pune bloc  
- (dacă ai) 1/2/3 = tip · Craft = buton  

---

## Pas cu pas

### 1) Meniu Start *(Minim)*
1. Fundal / sprite meniu cu buton **Start**  
2. Click Start → `trimite start_joc`  
3. Pe Erou / Scenă / blocuri: `când primesc start_joc` → arată lumea, reset variabile, poziții  
4. La steag: arată meniul, `ascunde` eroul/lumea **sau** oprește controalele până la Start  

**Încearcă tu (25 min)**  
- [ ] Steag → meniu, nu direct în peșteră  
- [ ] Start → jocul rulează  

### 2) Reset complet
La Start (și la steag, după caz):  
inventar · HP · clone · craft flags · zonă · poziție erou · `oprește toate sunetele`

**Încearcă tu (15 min)**  
- [ ] Start de 2 ori = stare curată  

### 3) Instrucțiuni pe scenă *(Minim)*
Text scurt (spune / sprite / fundal cu scriere) — maxim 5–6 rânduri.

**Încearcă tu (15 min)**  
- [ ] Colegul găsește cum se minează fără să întrebe  

### 4) Complet
Alege **cel puțin una**:  
- [ ] Buton / tastă înapoi la meniu  
- [ ] Ecran „Cum se joacă” separat  
- [ ] Tasta I = arată/ascunde ajutor  

---

## Greșeli frecvente
1. **Proiect nou azi** — greșit; e polish pe LumeCuburi.  
2. **Start fără reset** — clone și HP vechi.  
3. **Instrucțiuni doar verbale** — Minim pe scenă.  
4. **Meniu peste joc** — butoanele rămân clickabile în lume.  
5. **Uiți raza în text** — scrie „aproape de tine”.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Meniu Start · reset · controale pe scenă · test coleg |
| **Complet** | Minim + revino meniu **sau** ecran ajutor **sau** tasta I |

---

## Bonus
- [ ] Trailer 3–5 s înainte de Start  
- [ ] Numele jocului pe meniu  

## Recapitulare rapidă
1. Meniu → Start → reset  
2. Controale pe ecran  
3. L10 = polish + prezentare + insignă

## Schema pe scurt

**Meniu**  
steag → meniu · click Start → `trimite start_joc` → reset + joacă  

**Quiz scurt:**  
- Ce resetează Start?  
- Unde sunt controalele scrise?  
- Ce polish vrei la L10?

## Temă
20 s vorbite: titlu · misiune · de ce ești mândru. Urmează L10.
