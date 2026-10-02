# Lecția 5 — Străzi și intersecții
**Modulul 4 · Orașul nostru**  
**Code Kids Play · City Builder**  
**Vârstă:** ~8–10 ani

> Azi legi cartierul cu **străzi**: o intersecție cu treceri de pietoni, trotuare și un sens giratoriu.  
> Proiect: pe placa ta · `Prenume_Nume_T4_L05`

---

## Obiectiv
La finalul orei ai pe placă **două străzi care se întretaie** în golul dintre zone, cu **treceri de pietoni**.  
**Minim:** 2 străzi de asfalt **150·12·1** (una pe orizontală, una pe verticală), centrate pe placă · **2 treceri de pietoni** (6 dungi **6·1·0,4** fiecare) pe strada orizontală, câte una de o parte și de alta a intersecției.  
**Complet:** Minim + **treceri și pe strada verticală** + **8 trotuare** **67·2·2** + **sens giratoriu** (cerc **Ø20** cu insulă verde **Ø8**).

## De ce contează
Străzile sunt locul pe care circulă oamenii și mașinile. Golul de **16 mm** din L1 = **8 m** real: 6 m de asfalt (două benzi) și câte 1 m de trotuar pe fiecare parte.  
Trecerile de pietoni se fac din **dungi egale** — iar Ctrl+D le repetă perfect.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4 · unde sunt străzile pe placa ta? |
| 10–45 | Pas cu pas: asfalt · dungi · prima trecere |
| 45–100 | Minim → Complet (trotuare, sens giratoriu) → Bonus |
| 100–120 | Recap, quiz, salvare |

**Unelte azi:** **Box** · **Cylinder** · **Align** (**L**) · **Snap Grid 1.0 / 5.0** · **Ctrl+D** · **Ctrl+G** · **conul negru** · **rotire (săgeata curbă, 90° = 4 pași de 22,5°)** · **View Cube** (Top) · **Color**

---

## Pas cu pas

### 1) Proiect nou
1. Copia proiectului `Prenume_Nume_T4_L04` (**Duplicate**), redenumită `Prenume_Nume_T4_L05` *(sau placa refăcută rapid)*  
2. Snap Grid: **1.0 mm** *(la mutările mari de 15 sau 30 mm treci pe **5.0 mm**, ca să nu apeși de 30 de ori)*  
3. **View Cube → Top**: vezi golul în formă de cruce dintre cele 4 zone

### 2) Asfaltul
1. **Box** → **150 · 12 · 1** *(strada orizontală)*  
2. Selectezi strada și **placa** → **L** → mijloc pe stânga–dreapta și pe față–spate *(centrată)*  
3. O ridici la **3 mm** *(pe suprafața plăcii)*  
4. **Box** → **12 · 150 · 1** *(strada verticală)* → la fel: centrată pe placă, ridicată la 3 mm  
5. Din **Top**: o cruce de asfalt prin golul dintre zone  
6. **Color**: gri închis

### 3) Prima trecere de pietoni
1. **Box** → **6 · 1 · 0,4** *(o dungă)* → **Color** alb  
2. **L** cu strada orizontală → mijloc pe stânga–dreapta **și** mijloc pe față–spate; apoi (Snap Grid 5.0) o muți **15 mm spre dreapta** de centrul străzii *(dunga ocupă între 12 și 18 mm de centru, lângă intersecție)*  
3. O ridici la **4 mm** *(deasupra asfaltului)*  
4. Snap Grid 1.0 → o muți **5 mm spre față** → prima dungă *(dunga e lungă pe direcția străzii, ca la zebră)*  
5. **Ctrl+D** → muți copia **2 mm spre spate** → **Ctrl+D** de încă 4 ori → **6 dungi** egale, între cele două trotuare  
6. Selectezi cele 6 dungi → **Ctrl+G** → „trecerea”

### 4) A doua trecere
1. Trecerea → **Ctrl+D** → (Snap Grid 5.0) muți copia **30 mm spre stânga** *(ajunge simetric, de cealaltă parte a intersecției)*  
2. Verifici din **Top**: câte o trecere de fiecare parte a intersecției

### 5) Complet — trecerile pe strada verticală
1. Selectezi ambele treceri → **Ctrl+D** → rotești copiile cu **4 pași** (90°, săgeata curbă; se rotesc în jurul centrului lor, adică al intersecției) → ajung pe strada verticală, simetric  
2. Din **Top**: 4 treceri, câte una pe fiecare braț al intersecției

### 6) Complet — trotuarele
1. **Box** **67 · 2 · 2** *(un trotuar)* → ridicat la **3 mm** → **Color** gri deschis  
2. **L** cu **placa**: marginea din **stânga** *(începe de la marginea plăcii)*  
3. **L** cu strada orizontală: marginea din **spate** *(se suprapune cu marginea străzii)*; apoi o muți **2 mm spre spate** *(se lipește de asfalt, în golul dintre zone)*  
4. **Ctrl+D** → **L** cu **placa** → marginea din **dreapta** *(trotuarul de cealaltă parte a străzii verticale; nu se mută în față–spate)*  
5. Selectezi ambele → **Ctrl+D** → muți copiile **14 mm spre față** *(trotuarele de pe partea de jos a străzii)*  
6. Selectezi cele **4 trotuare** → **Ctrl+D** → rotești copiile **90°** → 4 trotuare pe strada verticală *(poziția trebuie să fie simetrică: dacă un trotuar iese din gol, verifică din Top)*

### 7) Complet — sensul giratoriu
1. **Cylinder** **20 · 20 · 1** *(cercul de asfalt)* → centrat pe placă → ridicat la **3 mm** → gri închis  
2. **Cylinder** **8 · 8 · 3,5** *(insula)* → centrat pe placă → ridicat la **3 mm** → verde  
3. Din **Top**: un inel de asfalt în jurul unei insule verzi

---

## Greșeli frecvente
1. **Asfaltul nu e centrat** — folosește **L** cu placa, mijloc pe ambele axe.  
2. **Dungile sunt la înălțimi diferite** — mută prima, apoi doar **Ctrl+D**.  
3. **Dungile nu sunt egale** — ai mutat cu ochiul; refă cu Ctrl+D și 2 mm.  
4. **Dunga e ascunsă sub asfalt** — nu e ridicată la 4 mm.  
5. **Trotuarul intră în zonă** — ai mutat 2 mm în direcția greșită.  
6. **Sensul giratoriu acoperă zonele** — Ø20 e destul; mai mare atinge colțurile.  
7. **Scara greșită** — strada de 6 m = 12 mm.

---

## De făcut azi — „Străzile mele”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 2 străzi 150·12·1 centrate · 2 treceri (6 dungi 6·1·0,4) pe strada orizontală |
| **Complet** | + treceri pe strada verticală + 8 trotuare + sens giratoriu |

### Pasul 1 — Minim
- [ ] 2 străzi de asfalt, centrate, la 3 mm  
- [ ] Prima trecere cu 6 dungi egale, la 4 mm  
- [ ] A doua trecere, simetrică  

### Pasul 2 — Complet
- [ ] 4 treceri  
- [ ] 8 trotuare 67·2·2  
- [ ] Sens giratoriu (cerc Ø20 + insulă Ø8)  
- [ ] **Color** · numele `T4_L05` e corect  

---

## Bonus (extra — după Complet)
- [ ] Linie întreruptă pe mijlocul străzii: **Box** **6·0,6·0,4** albe, repetate cu **Ctrl+D**  
- [ ] Un semn de **STOP** (Cylinder mic, roșu, pe un stâlp)  
- [ ] Un copac pe insula sensului giratoriu

## Recapitulare rapidă
1. Golul de **16 mm** = stradă de 12 mm + 2 trotuare de câte 2 mm  
2. Dungile: prima la loc, restul cu **Ctrl+D** (2 mm)  
3. Centrat = **L** cu placa, mijloc pe ambele axe

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** 2 Box-uri 150·12·1 și 12·150·1 centrate, +3 mm → dungă 6·1·0,4 (+4 mm) → Ctrl+D ×5 (2 mm) → Group → copie la −30 mm  
**Complet:** trecere rotită 90° · trotuare 67·2·2 · cerc Ø20 + insulă Ø8

**Quiz scurt:**  
- Cât e lățimea reală a unei străzi de 12 mm? *(6 m)*  
- De ce folosim Ctrl+D pentru dungi?  
- Ce se întâmplă dacă sensul giratoriu e prea mare?

## Temă
Opțional: pe foaie, desenezi harta cartierului tău și treci unde ai pune semaforul.
