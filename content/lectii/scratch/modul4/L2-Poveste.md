# Lecția 2 — Poveste interactivă cu alegeri
**Modulul 4 · Antrenament (fișier separat)**  
**Code Kids Play · Scratch Creator**

> Azi antrenezi **povestea cu alegeri**: scene, dialog, `trimite` / `când primesc`, finaluri diferite.  
> **Nu** deschizi proiectul L1 — fișier **nou**.  
> Proiect: **„Povestea cu alegeri”** · fișier: `Prenume_Nume_M4_L2` (ex. `Ana_Pop_M4_L2`)

---

## Obiectiv
La finalul orei cineva poate juca **o cale întreagă** până la un final, fără să-i explici.  
**Minimum:** ≥3 fundaluri · ≥2 personaje · ≥6 replici · **2 alegeri** · **2 finaluri** · restart la steag · ≥1 sunet · replici cu **timp de** (nu text zburător).  
**Ținta orei (Complet):** Minim + **a 3-a alegere** **sau** final secret **sau** inventar (o alegere deblochează o replică mai târziu).

## De ce contează
În jocuri și filme interactive, **alegerea** schimbă ce urmează. În Scratch, alegerea = tastă / click → `trimite` → altă scenă.  
Dacă tipul tău la L1 e **poveste**, azi exersezi exact ce duci la L6. Dacă nu — tot înveți mesaje și flux pe ramuri.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Poveste liniară vs cu alegeri + demo scurt |
| 10–15 | Schiță **rapidă** pe foaie (arbore — 5 min max) |
| 15–100 | Construiești pe Scratch (vezi **Minim vs Complet**) |
| 100–120 | Cineva joacă o cale + note pentru L6 |

**Foaie = 5 min, nu oră de desen.** Pe foaie scrii doar: titlu · Alegerea 1 (A/B) · Alegerea 2 · 2 finaluri · numele mesajelor (`cale_A`…). Restul = **Scratch**.

**Capitole (recap, folosite greu):**  
<span style="color:#E6A800;font-weight:700">Evenimente</span> (`trimite` / `când primesc`) · <span style="color:#FFAB19;font-weight:700">Control</span> · <span style="color:#9966FF;font-weight:700">Aspect</span> · <span style="color:#CF63CF;font-weight:700">Sunet</span> · <span style="color:#5CB1D6;font-weight:700">Detectare</span> (tastă / click)

---

## Pas cu pas

### 1) Schiță rapidă *(5 min max — apoi Scratch)*
Pe foaie, **câteva rânduri** (nu desen artistic):

Start → Alegerea 1 (A / B) → pe fiecare cale Alegerea 2 → 2 finaluri diferite  

+ titlu · mesaje (`cale_A`, `cale_B`…) · unde e 1 sunet

**Încearcă tu — foaia (5 min)**  
- [ ] Știi cele 2 alegeri + 2 finaluri  
- [ ] Știi ce `trimite` are fiecare ramură  
- [ ] Treci la Scratch  

### 2) Scene + personaje
1. Proiect nou → `Prenume_Nume_M4_L2`  
2. ≥**3 fundaluri** redenumite logic (ex. `Padure`, `Castel`, `FinalBun`)  
3. ≥**2 personaje** pe scenă (narator + erou, sau 2 actori)  
4. La steag: fundal start · poziții · `oprește toate sunetele` · eventual `ascunde` butoanele de alegere până e momentul

**Încearcă tu — scena (8 min)**  
- [ ] 3 fundaluri există  
- [ ] Steag → ești mereu la începutul poveștii  

### 3) Dialog + mesaje *(anti-text zburător)*
1. Replici cu <span style="color:#9966FF;font-weight:700">spune</span> … **timp de** … (nu `spune` fără timp) — ≥**6** pe toată povestea  
2. Între scene: <span style="color:#E6A800;font-weight:700">trimite</span> `scena_2` / `cale_A`…  
3. Pe **Scenă** sau pe personaj: <span style="color:#E6A800;font-weight:700">când primesc</span> → `treci la fundalul` …

**Regula duratei (Minim — pe foaie lângă replici):**  
`timp = 2 secunde + 1 secundă pentru fiecare 4 cuvinte`  

| Exemplu | Cuvinte | `spune … timp de` |
|---------|---------|-------------------|
| „Salut!” | 1 | **2** s (minimul de bază) |
| „Salut! Unde mergem azi, în pădure sau la castel?” | ~9 | **2 + 2 = 4** s |

*Varianta rapidă dacă e greu de numărat:* replică scurtă ≈ **3 s** · frază lungă ≈ **5 s**.

**Încearcă tu — dialog (15 min)**  
- [ ] ≥6 replici pe calea pe care o testezi  
- [ ] Fiecare `spune` are **timp de** (nu zboară)  
- [ ] Trecerea de scenă e prin **mesaj**, nu „trage fundalul manual”  

### 4) Alegeri + finaluri *(nucleul Minim)*
1. **Alegerea 1:** 2 butoane (sprite) **sau** 2 taste (ex. `1` / `2`)  
2. Fiecare cale → mesaj diferit → scenă / dialog diferit  
3. **Alegerea 2** pe cel puțin o ramură (ca pe arbore)  
4. **2 finaluri** (fundal + text diferit)  
5. ≥**1 sunet** la un moment-cheie (`pornește sunetul` sau `redă … până la final`)

**Încearcă tu — alegeri (20–25 min)**  
- [ ] Joacă **ambele** finaluri o dată (nu doar unul)  
- [ ] Cineva joacă o cale fără ajutor (coleg / părinte / autotest)  

### 5) Complet
Alege **cel puțin una**:  
- [ ] **A 3-a alegere** pe o ramură (extinde arborele)  
- [ ] **Final secret** (combinație rară: ex. alegi A apoi B special)  
- [ ] **Inventar:** variabilă `are_cheie` = 1 → mai târziu deblochează o replică / o ușă  

---

## Greșeli frecvente
1. **Prea mult pe foaie** — 5 min schiță, restul pe Scratch.  
2. **Alegere fără mesaj** — schimbi fundalul „din ochi”; folosește `trimite` / `când primesc`.  
3. **Un singur final** — Minim cere **2** finaluri diferite.  
4. **Restart rupt** — al 2-lea steag începe din mijloc; resetezi fundal + poziții + variabile.  
5. **Butoanele rămân pe toate scenele** — `ascunde` / `arată` la mesajele potrivite.  
6. **Text zburător** — `spune` fără **timp de**; folosește regula 2 + 1/4 cuvinte (sau 3 s / 5 s).  
7. **Fișier greșit** — azi e `Prenume_Nume_M4_L2`, **nu** motorul L1.

---

## De făcut azi — „Povestea cu alegeri”
Salvat: `Prenume_Nume_M4_L2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 3 fundaluri · 2 personaje · 6 replici cu timp · 2 alegeri · 2 finaluri · sunet · restart |
| **Complet** | Minim + alegerea 3 **sau** final secret **sau** inventar cu variabilă |

### Pasul 1 — Schiță (5 min)
- [ ] 2 alegeri + 2 finaluri + mesaje  

### Pasul 2 — Minim pe Scratch
- [ ] Checklist Minim · o cale jucată  

### Pasul 3 — Complet
- [ ] Una din cele 3 variante Complet  

---

## Bonus (dacă ai terminat Complet)
- [ ] 3 finaluri + inventar pe același proiect  
- [ ] Sunet diferit pe fiecare final  
- [ ] Notă pe foaie: „ce iau în proiectul L1”

## Recapitulare rapidă
1. Schiță scurtă → **Scratch** (nu oră de desen)  
2. Alegere = input → `trimite` → altă cale  
3. `spune` cu **timp de** (anti-text zburător)  
4. Fișier: **`Prenume_Nume_M4_L2`**

## Schema pe scurt *(pe foaie)*

**Flux**  
Start → Alegerea 1 → `trimite cale_A` / `cale_B` → … → Final  

**Dialog**  
`spune [text] timp de [2 + cuvinte÷4]` (sau 3 s / 5 s)  

**Alegere**  
click / tasta 1 → `trimite cale_A`  
click / tasta 2 → `trimite cale_B`  

**Quiz scurt:**  
- Ce e o alegere în Scratch?  
- Cum eviți textul zburător?  
- Ce ai lua în proiectul L1 dacă tipul tău e poveste?

## Temă
Opțional: a 3-a alegere scurtă pe același fișier. Urmează L3 = **quiz pe runde** (fișier nou).
