# Lecția 1 — Pornești proiectul tău (baza jocului)
**Modulul 4 · Proiecte & autonomie**  
**Code Maker Club · Scratch Creator**

> Modulul 4 e **Creator**: proiecte pe care le arăți. Azi construiești **baza jocului** — baza pe care o termini la L6 și o îmbunătățești la L7.  
> Proiect: **„Baza jocului meu”** · fișier: `Prenume_Nume_M4_L1` (ex. `Ana_Pop_M4_L1`)  
> **Același fișier** la L6 și L7 (`Salvează ca` L6 / L10 când e nevoie de copie).

---

## Obiectiv
La finalul orei ai o bază **jucabilă**: restart curat, interacțiune reală, condiție `dacă`, și **începutul** direcției ideea specială (nivele **sau** joc cu 2 jucători (pe același calculator)) **vizibil pe scenă**.  
**Minim:** reset la steag · 2 sprite-uri care interacționează · ≥1 `dacă` · ideea specială A sau B pe scenă.  
**Ținta orei (Complet):** Minim + **una** din: meniu Start (ca M3 L8) **sau** trecere reală Nivel 1→2 **sau** scoruri separate J1/J2.

## De ce contează
În M3 ai făcut jocuri pe rețetă. În M4 **tu** alegi tipul și îl duci până la produs.  
Fără bază solidă azi, L6 e panică. Cu o bază azi, L6 = finisaj.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Modulul 4 + firul L1→L6→L7 |
| 10–15 | Schiță **rapidă** pe foaie (5 min max) |
| 15–100 | Construiești baza jocului pe Scratch (vezi **Minim vs Complet**) |
| 100–120 | **Demo 30 s** (coleg / părinte / autotest) + ce lipsește pentru L6 |

**Foaie = 5 min, nu oră de plan.** Pe foaie: titlu · tip · ideea specială A **sau** B · ce rulează azi. Restul = **Scratch**.

**De reținut (firul Creator):**  
- Fișier: `Prenume_Nume_M4_L1` → același la **L6** și **L7**  
- Antrenamente pe **alte** fișiere: L2–L5, L8  
- Ideea specială = **A nivele** *sau* **B 2 jucători** (una) · trebuie **pe scenă**  

**Capitole (recap M1–M3, folosite greu):**  
<span style="color:#E6A800;font-weight:700">Evenimente</span> · <span style="color:#FFAB19;font-weight:700">Control</span> · <span style="color:#5CB1D6;font-weight:700">Detectare</span> · <span style="color:#FF8C1A;font-weight:700">Variabile</span> · <span style="color:#9966FF;font-weight:700">Aspect</span> · <span style="color:#CF63CF;font-weight:700">Sunet</span>

---

## Pas cu pas

### 1) Schiță rapidă *(5 min max — apoi Scratch)*
Pe foaie, **câteva rânduri** (nu desen, nu poveste epică):
1. **Titlu** + **tip** (joc / labirint / quiz / poveste / animație-joc)  
2. **Mecanica** (1 frază): „Jucătorul face X ca să obțină Y”  
3. **Ideea specială — UNA:**  
   - **A — Nivele:** Nivel 1 + semnal spre Nivel 2  
   - **B — 2 jucători:** J1 săgeți + J2 WASD  
4. **Azi trebuie să meargă:** bază + primul pas special  

*(Cele 3 criterii „gata la L6” — opțional, 1 rând; nu blochează Scratch.)*

**Încearcă tu — foaia (5 min)**  
- [ ] Tip + ideea specială A **sau** B + ce rulează azi  
- [ ] Treci la Scratch  

### 2) Baza jocului pe Scratch *(nucleul Minim)*
1. Proiect **nou** → salvezi `Prenume_Nume_M4_L1`  
2. ≥**2 personaje** care **interacționează** (atingere / mesaj / scor) — nu doar „stau pe fundal”  
3. La steag — **reset complet** (Minim):  
   - `arată` / `ascunde` ce trebuie la start  
   - <span style="color:#4C97FF;font-weight:700">du-te la</span> poziția de start  
   - <span style="color:#FF8C1A;font-weight:700">setează</span> scor (și celelalte variabile) la 0 / start  
   - <span style="color:#9966FF;font-weight:700">treci la fundalul</span> start / Nivel 1  
   - <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>  
   - <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>  
4. Cel puțin **1** din: variabilă pe scenă **și** (recomandat) un `trimite` / `când primesc`  
5. Cel puțin **1** condiție `dacă` pe bune (atingere / tastă / scor)  
6. Poți explica baza jocului în **20 secunde**  

**Nu e suficient:** doar eroul se mișcă pe fundal.  
**E suficient:** logica de mai sus **rulează**.  
Steag de **2 ori** = aceeași stare — altfel resetul e incomplet.

**Încearcă tu — baza jocului (15–20 min)**  
- [ ] Steag de 2 ori → restart curat (toate punctele de reset)  
- [ ] 2 sprite-uri interacționează  
- [ ] Variabilă **sau** mesaj e vizibil / folosit  
- [ ] Ai cel puțin un `dacă`  

### 3) Primul pas special *(tot Minim — obligatoriu)*

**Dacă ai ales A — Nivele:**  
- [ ] **Nivel 1** jucabil pe scenă  
- [ ] Semnal clar spre Nivel 2: buton / `trimite Nivelul 2` / obiectiv atins  
- [ ] Nivelul 2 are **măcar** fundal diferit **sau** un obstacol în plus (nu egal)  

**Dacă ai ales B — 2 jucători:**  
- [ ] J1: săgeți · J2: WASD (sau alt set clar)  
- [ ] Ambii pe scenă, se mișcă **simultan**  
- [ ] Măcar un scor / cursă / atingere care ține cont de **ambii**  

**Încearcă tu — ideea specială (restul timpului până la Complet/demo)**  
- [ ] Ideea specială se **vede** pe scenă, nu e doar pe foaie  
- [ ] Salvat: `Prenume_Nume_M4_L1`  

### 4) Complet — alege **UNA**
- [ ] **Meniu Start** (`start_joc` / `revino_meniu`, ca M3 L8)  
- [ ] Trecere **reală** Nivel 1 → 2 cu reset scor/timp (ca M3 L6)  
- [ ] Ambii jucători au **scor separat** sau un câștigător clar  

**Încearcă tu — Complet (dacă ai timp)**  
- [ ] Colegul înțelege baza jocului fără explicație lungă  
- [ ] Salvat din nou  

### 5) Demo (min 100–120)
- [ ] 30 de secunde: coleg / părinte / te uiți tu pe înregistrare sau rulezi de 2 ori  
- [ ] Pe foaie: 1–2 lucruri care lipsesc pentru L6  

---

## Greșeli frecvente
1. **Prea mult pe foaie** — 5 min schiță, restul pe Scratch.  
2. **Doar mișcare pe fundal** — lipsește interacțiunea (atingere / mesaj / scor).  
3. **Ideea specială pe foaie, zero pe scenă** — Minim cere ideea specială **vizibil**.  
4. **Reset incomplet** — uită fundal / sunete / efecte; folosește checklist-ul universal.  
5. **Nivele = două fundaluri goale** — Nivelul 2 trebuie să aibă **ceva** diferit.  
6. **2 jucători cu aceleași taste** — controalele trebuie **diferite**.  
7. **Complet = toate trei** — e **una** dintre variante.  
8. **Nume fișier** — `Prenume_Nume_M4_L1`, nu `Nume_M4_ProiectFinal` vag.

---

## De făcut azi — „Baza jocului meu”
Salvat: `Prenume_Nume_M4_L1`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Reset complet + interacțiune + `dacă` + **ideea specială A sau B pe scenă** |
| **Complet** | Minim + meniu Start **sau** trecere L1→L2 **sau** scor J1/J2 (**una**) |

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus.

### Minim pe tip *(ștachetă Creator)*

| Tip | Baza jocului AZI |
|-----|-------------|
| **Joc / labirint** | Control + atingere + obiectiv + ideea specială (nivele **sau** 2 jucători) |
| **Quiz** | `scor` + **≥3** întrebări cu reacție + schiță runde |
| **Poveste** | ≥2 scene + dialog + **1 alegere** pe 2 căi |
| **Animație-joc** | Sunet+mișcare + **1 acțiune a jucătorului** care schimbă ceva + schiță 2 acte |

### Pasul 1 — Schiță (5 min)
- [ ] Tip · ideea specială A/B · ce rulează azi  

### Pasul 2 — Baza + ideea specială *(Minim)*
- [ ] Reset complet · interacțiune · `dacă` · ideea specială pe scenă  
- [ ] Salvat: `Prenume_Nume_M4_L1`  

**→ Minim când:** steag ×2 curat → baza jocului rulează → ideea specială se vede.

### Pasul 3 — Complet + demo
- [ ] Una din cele 3 variante Complet (dacă poți)  
- [ ] Demo 30 s  

---

## Bonus (dacă ai terminat Complet)
- [ ] Ai început **și** nivele **și** schiță 2 jucători  
- [ ] Variabilă `nivel` sau `jucator1` / `jucator2` pe scenă  
- [ ] Clone sau timer deja în bază  

## Recapitulare rapidă
1. M4 Creator = proiectul **tău** (L1→L6→L7)  
2. Schiță scurtă → **Scratch** (bază + ideea specială pe scenă)  
3. Reset complet la steag  
4. Nume: **`Prenume_Nume_M4_L1`**

## Schema pe scurt *(pe foaie)*

**Steag — reset**  
arată/ascunde · `du-te la` · `setează` variabile · fundal start · `anulează efectele` · `oprește toate sunetele`  

**Ideea specială A — Nivele**  
Nivel 1 jucabil → `trimite Nivelul 2` → fundal/obstacol diferit  

**Ideea specială B — 2 jucători**  
J1 săgeți · J2 WASD · ambii pe scenă · scor sau cursă  

**Quiz scurt:**  
- Ce e „baza jocului” azi?  
- De ce ideea specială trebuie pe scenă?  
- Ce continui la L6 pe același fișier?

## Temă
Opțional 15 min pe bază. Urmează L2 = **poveste cu alegeri** (fișier **nou**).
