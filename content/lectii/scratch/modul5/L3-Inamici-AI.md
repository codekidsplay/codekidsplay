# Lecția 3 — Inamici: patrulare și detecție
**Modulul 5 · Mecanici de joc · Block 1**  
**Code Kids Play · Maestru de jocuri**

> Azi: inamic care **patrulează** între două limite (sau se întoarce pe perete/culoare) + lovitură la atingere.  
> Fișier **nou**: `Prenume_Nume_M5_L3` · proiect: **„Evită patrula”**  
> *(„AI” = reguli simple, nu inteligență magică.)*

---

## Obiectiv
**Minimum:** ≥1 inamic pe patrulare între **X₁ și X₂** (sau întoarcere pe margine/culoare) · coliziune cu feedback (HP sau restart poziție) · poți evita · reset curat.  
**Complet:** Minim + 2 inamici **sau** „rază” (se întoarce / accelerează când eroul e aproape) **sau** platformă + patrulare (cu săritură din L1).

## De ce contează
Patrularea e baza mob-ilor din proiectul mare și din **M6 L6** (creatură peșteră).  
Detecția cu limite e mai stabilă decât „aleator peste tot”.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Demo: stânga↔dreapta între 2 x |
| 12–25 | Alege metoda: limite X **sau** perete/culoare |
| 25–100 | Construiești Minim → Complet |
| 100–120 | Coleg evită și e lovit o dată pe bune |

---

## Pas cu pas

### 1) Patrulare — rețetă
**Metoda A (recomandată):**  
variabilă `dir` = 1 sau −1 · `schimbă x cu dir * viteză` · `dacă x > X2 sau x < X1` → `dir = −dir` (sau `întoarce-te`)

**Metoda B:**  
`dacă pe margine` / atinge perete / culoare → întoarce.

**Încearcă tu — foaie (5 min)**  
- [ ] X1, X2 (sau culoare) notate  

### 2) Erou + pericol *(Minim)*
1. Proiect nou → `Prenume_Nume_M5_L3`  
2. Erou: măcar stânga/dreapta (săritură = bonus dacă apeși L1)  
3. Inamic pe patrulare continuă  
4. `dacă` erou atinge inamic → −1 viață **sau** `du-te la` start + sunet  
5. Cooldown scurt după lovitură (ca să nu mori în 0.1 s)

**Încearcă tu (30 min)**  
- [ ] Inamicul se întoarce la limite  
- [ ] Lovitura se simte o dată, nu spam  

### 3) Complet
Alege **cel puțin una**:  
- [ ] Al 2-lea inamic  
- [ ] `dacă distanța până la Erou < …` → schimbă comportamentul  
- [ ] O platformă + erou cu săritură (reciclezi L1)  

---

## Greșeli frecvente
1. **Inamic fără întoarcere** — iese din scenă.  
2. **−HP în forever fără `așteaptă`** — moarte instant.  
3. **Limite greșite** — se blochează într-un colț.  
4. **„AI” prea complicat** — azi doar patrulare.  
5. **Fără evitabil** — Minim cere să poți trece pe lângă.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_L3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Patrulare · coliziune cu feedback · evitabil · reset |
| **Complet** | Minim + 2 inamici **sau** rază **sau** + săritură |

---

## Bonus
- [ ] Inamic pe platformă suspendată  
- [ ] Scor când „sari pe cap” (opțional greu)

## Recapitulare rapidă
1. Limite X sau perete = patrulare  
2. Feedback + cooldown  
3. Pod spre M6 creatură  

## Schema pe scurt

**Inamic**  
`forever` → `schimbă x cu dir*…` → `dacă x>X2 sau x<X1` → `dir = −dir`  

**Lovitură**  
atinge Erou → HP−1 → `așteaptă 1`  

**Quiz scurt:**  
- Ce e X1/X2?  
- De ce cooldown?  
- Unde reapare ideea în M6?

## Temă
Al 2-lea inamic. Urmează L4 = **liste** (pod spre Cubes).
