# Lecția 3 — Quiz pe runde
**Modulul 4 · Antrenament (fișier separat)**  
**Code Kids Play · Scratch Creator**

> Azi construiești un **quiz pe runde**: scor pe scenă, feedback, trecere R1→R2, final clar.  
> **Nu** deschizi L1 — fișier **nou**.  
> Proiect: **„Quiz pe runde”** · fișier: `Prenume_Nume_M4_L3`

---

## Obiectiv
La finalul orei cineva termină **ambele runde** fără ajutor și vede scorul final.  
**Minimum:** ≥**6** întrebări · **2 runde** vizibile · `scor` pe scenă · feedback corect **și** greșit · nu poți sări întrebarea · mesaj final „X din N” · steag = restart R1.  
**Ținta orei (Complet):** Minim + **Runda 3** **sau** vieți (3 greșeli = Sfârșitul jocului) **sau** timer pe o întrebare.

## De ce contează
Quiz-ul e „nivele de întrebări”: treci Runda 1 → Runda 2 mai grea.  
Aceleași idei ca M3 L6 (trecere de nivel) + L3 (scor pe scenă).  
Dacă tipul tău la L1 e quiz, azi e antrenamentul pentru L6.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Quiz pe runde = nivele de întrebări |
| 10–15 | Schiță **rapidă** pe foaie (5 min max) |
| 15–100 | Construiești pe Scratch (vezi **Minim vs Complet**) |
| 100–120 | Test (coleg / părinte / autotest) + note pentru L6 |

**Foaie = 5 min.** Pe foaie: lista Q1–Q6 + răspuns corect (1/2/3) + R1/R2. Textul lung al întrebării îl pui **în Scratch**.

**Capitole:**  
<span style="color:#FF8C1A;font-weight:700">Variabile</span> · <span style="color:#E6A800;font-weight:700">Evenimente</span> · <span style="color:#FFAB19;font-weight:700">Control</span> · <span style="color:#5CB1D6;font-weight:700">Detectare</span> · <span style="color:#9966FF;font-weight:700">Aspect</span>

---

## Pas cu pas

### 1) Schiță rapidă *(5 min max — apoi Scratch)*
Pe foaie, **câteva rânduri** (nu eseu):
1. **6 linii:** `Q1 … → corect: 2` · `Q2 … → corect: 1` … (subiect scurt e suficient)  
2. Marchează **R1** (ușor, ex. Q1–Q3) și **R2** (greu, Q4–Q6)  
3. Opțional: prag trecere R2 (ex. scor ≥2)

**Încearcă tu — foaia (5 min)**  
- [ ] 6 răspunsuri corecte notate · R1/R2 clare  
- [ ] Treci la Scratch  

### 2) Scor + runde pe scenă
1. Proiect nou → `Prenume_Nume_M4_L3`  
2. Variabilă <span style="color:#FF8C1A;font-weight:700">scor</span> pe **Scenă**, bifată vizibilă  
3. La steag: `setează scor la 0` · fundal / text „Runda 1” · oprește sunete  
4. Semnal clar „Runda 1” / „Runda 2” (fundal, `spune`, sau sprite titlu)

**Încearcă tu — scor (8 min)**  
- [ ] Scorul se vede pe scenă  
- [ ] Steag → scor 0 + Runda 1  

### 3) O întrebare = un flux
Pentru **fiecare** întrebare:  
1. Afișezi textul (personaj `spune` / sprite cu costum / fundal cu text)  
2. Răspuns: taste **1/2/3** **sau** 3 butoane  
3. `dacă` răspuns corect → `schimbă scorul cu 1` + feedback (sunet / „Corect!”)  
4. Altfel → feedback greșit (**obligatoriu** — nu doar tăcere)  
5. Abia apoi `trimite` următoarea întrebare  

**Nu poți sări** — fără răspuns, nu treci.

**Încearcă tu — 3 întrebări R1 (20 min)**  
- [ ] Corect și greșit dau feedback diferit  
- [ ] Scorul crește doar la corect  

### 4) Runda 2 + final *(Minim)*
1. După R1: `trimite Runda_2` (sau schimbă fundalul) + întrebări mai grele  
2. La final: `spune` / mesaj pe scenă: **„X din N”** (folosește valoarea `scor`)  
3. Steag = mereu de la Runda 1

**Încearcă tu — flux complet (20–25 min)**  
- [ ] ≥6 întrebări în total pe cele 2 runde  
- [ ] Cineva termină ambele runde (coleg / părinte / autotest)  

### 5) Complet
Alege **cel puțin una**:  
- [ ] **Runda 3** (expert) sau ≥8 întrebări  
- [ ] Variabilă `vieti` — 3 greșeli → `Sfârșitul jocului`  
- [ ] Timer pe **o** întrebare (ex. 10 s → greșit automat)  

---

## Greșeli frecvente
1. **Prea mult pe foaie** — 5 min listă, textul întrebărilor e în Scratch.  
2. **Scor pe personaj, nu pe Scenă** — pune `scor` pe Scenă.  
3. **Fără feedback la greșit** — jucătorul nu știe dacă a greșit.  
4. **Poți sări întrebarea** — blochează trecerea până există răspuns.  
5. **Runda 2 = aceleași întrebări** — trebuie **mai grele** sau diferite.  
6. **Final fără număr** — Minim cere „X din N”, nu doar „Bravo”.  
7. **Reset incomplet** — steagul readuce R1 + scor 0.

---

## De făcut azi — „Quiz pe runde”
Salvat: `Prenume_Nume_M4_L3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 6 întrebări · 2 runde · scor · feedback C/G · fără sărituri · final X din N · restart |
| **Complet** | Minim + R3 **sau** vieți **sau** timer pe o întrebare |

### Pasul 1 — Schiță (5 min)
- [ ] 6 răspunsuri + R1/R2  

### Pasul 2 — Minim
- [ ] Checklist Minim · test jucat  

### Pasul 3 — Complet
- [ ] Una din variantele Complet  

---

## Bonus (dacă ai terminat Complet)
- [ ] Mod 2 jucători pe rând (`scor_J1` / `scor_J2`)  
- [ ] Timer pe **toate** întrebările din R2  
- [ ] Notă: ce transferi în proiectul L1  

## Recapitulare rapidă
1. Schiță scurtă → **Scratch**  
2. Rundă = nivel de întrebări  
3. Scor pe Scenă + feedback C/G  
4. Fișier: **`Prenume_Nume_M4_L3`**

## Schema pe scurt *(pe foaie)*

**Start**  
steag → `setează scor la 0` → Runda 1  

**Întrebare**  
afișează Q → așteaptă răspuns → `dacă` corect → +1 + „Corect” · altfel „Greșit” → `trimite` Q următoare  

**Trecere**  
R1 gata → `trimite Runda_2` → întrebări grele → final „scor din N”  

**Quiz scurt:**  
- Unde stă variabila `scor`?  
- Ce înseamnă „nu poți sări întrebarea”?  
- Cum seamănă R1→R2 cu nivelele din M3?

## Temă
Schimbă o întrebare grea dacă e prea ușoară. Urmează L4 = **clip pe acte**.
