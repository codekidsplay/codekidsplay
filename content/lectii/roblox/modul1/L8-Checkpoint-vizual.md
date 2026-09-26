# Lecția 8 — Checkpoint vizual (fără script)
**Modulul 1 · Place Builder**  
**Code Kids Play · Roblox Studio**

> Azi marchezi pe traseu un **checkpoint vizual**: un punct intermediar clar (culoare + formă + nume).  
> Place: același `Prenume_Nume_M1`

---

## Obiectiv
La finalul orei ai cel puțin **un checkpoint** pe Obby pe care jucătorul îl recunoaște dintr-o privire.  
**Minimum:** **1** Part `Checkpoint1` (culoare distinctă, ancorat, pe traseu) · Play: treci pe el între Start și Finish.  
**Ținta orei (Complet):** Minim + **2** checkpoint-uri (`Checkpoint1`, `Checkpoint2`) pe secțiuni diferite + convenție vizuală scrisă (ex. „portocaliu = checkpoint”).

## De ce contează
Pe un Obby mai lung, jucătorul vrea să știe „am ajuns la jumătate”.  
Azi checkpoint = **semn pe hartă**. În **M2/M3** același loc poate primi script (salvează progresul). Nu amestecăm logica încă.

**Azi tot fără cod.** Nu există respawn la checkpoint — doar marcaj.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–8 | Obiectiv + checkpoint vizual vs „magic” |
| 8–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Marcaje pe Obby (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi pe ecran:** Part · Color · Material · Scale · Move · nume Explorer.

---

## Pas cu pas

### 1) Ce e „vizual” (și ce nu e încă)
| Azi (M1) | Mai târziu (M2/M3) |
|----------|-------------------|
| Part colorat / stâlp / inel pe traseu | Script: „dacă ating → salvez poziția” |
| Jucătorul **vede** punctul | Jocul **ține minte** punctul |
| Nume `Checkpoint1` | Același obiect, plus logică |

**Încearcă tu — diferență (1 min)**  
- [ ] Poți spune: „azi doar se vede, nu salvează singur”  

### 2) Construiești Checkpoint1
1. Pe mijlocul traseului (după ~jumătate din platforme), un Part nou  
2. Nume: `Checkpoint1`  
3. Color **unic** pe hartă (ex. portocaliu / magenta) — nu aceeași culoare ca Finish  
4. Scale: un **stâlp** sau o **placă** lată sub picioare — să fie imposibil de ratat din cameră  
5. Material opțional: Neon (accent)  
6. Anchor · Move: pe drum, nu în afara săriturii  

**Încearcă tu — un checkpoint (4–5 min)**  
- [ ] `Checkpoint1` în Explorer  
- [ ] Culoare clară · pe traseu  
- [ ] Play → calci / treci pe el · Stop  

### 3) Citește din Viewport
1. Cameră **de sus**: se vede Start → Checkpoint → Finish?  
2. Dacă nu: mărește checkpoint-ul sau schimbă culoarea  
3. Un coleg, fără indicii: „unde e jumătatea?”  

**Încearcă tu — citire (2–3 min)**  
- [ ] Din vedere de sus, checkpoint-ul e evident  
- [ ] Un coleg îl găsește  

### 4) Al doilea checkpoint *(Complet)*
1. `Checkpoint2` pe o a doua secțiune (ex. înainte de urcușul final)  
2. **Aceeași** culoare de familie ca `Checkpoint1` (sau același Material Neon) — ca să fie „familia checkpoint”  
3. Finish rămâne **altă** culoare  
4. Play: Start → CP1 → CP2 → Finish  

**Încearcă tu — două CP (4–5 min)**  
- [ ] `Checkpoint1` + `Checkpoint2`  
- [ ] Convenție: „portocaliu = checkpoint” (sau culoarea ta)  
- [ ] Play întreg · salvat  

---

## Greșeli frecvente
1. **Checkpoint = Finish** (aceeași culoare) — jucătorul se încurcă; diferențiază.  
2. **Checkpoint în aer / de neatins** — pe platformă, pe traseu.  
3. **Prea mic** — nu se vede; Scale în sus.  
4. **Am pus script Touched** — șterge; azi nu.  
5. **Checkpoint înainte de Spawn** — ordinea e Start → … → Finish.  

---

## De făcut azi — „Semne pe traseu”
Salvat: `Prenume_Nume_M1`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | **1** `Checkpoint1` vizibil pe traseu · Play trece pe el |
| **Complet (ținta orei)** | Minim + **2** checkpoint-uri + convenție de culoare clară |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Un checkpoint *(Minim)*
- [ ] `Checkpoint1` colorat, ancorat, pe drum  
- [ ] Play · Stop · salvat  

**→ Minim când:** există un „semn de jumătate” pe Obby.

### Pasul 2 — Două + regulă *(Complet)*
- [ ] `Checkpoint2`  
- [ ] Aceeași familie vizuală  
- [ ] Play Start→CP1→CP2→Finish · salvat  

**Gata Complet când:** traseul se „citește” în etape, fără script.

---

## Bonus (dacă ai terminat Complet)
- [ ] Un Part text / panou lângă CP cu numele `CP_Text` (doar Part, fără UI script)  
- [ ] Checkpoint pe o **platformă mai lată** („zonă de odihnă”)  
- [ ] Marchezi pe foaie: la M3, aici voi pune script de salvare  

## Recapitulare rapidă
1. Checkpoint M1 = **marcaj**, nu salvare automată  
2. Culoare + mărime + nume  
3. Pe traseu, între Start și Finish  
4. Complet = 2 etape vizibile  
5. Place: `Prenume_Nume_M1`  

**Quiz scurt (cu profesorul):**  
- Ce face azi checkpoint-ul?  
- Ce va putea face mai târziu cu script?  
- Cum deosebești Finish de Checkpoint?

## Temă
Opțional: muți `Checkpoint1` dacă nu e la jumătate vizuală.  
La **L9** — mini-proiect: Lumea Obby (pui totul împreună).
