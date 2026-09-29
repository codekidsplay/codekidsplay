# Lecția 1 — Pornești proiectul tău (motorul)
**Modulul 4 · Proiecte & autonomie**  
**Code Kids Play · Scratch Creator**

> Modulul 4 e **Creator**: proiecte pe care le arăți. Azi construiești **motorul** — baza pe care o termini la L6 și o lustruiești la L7.  
> Proiect: **„Motorul meu”** · fișier: `Prenume_Nume_M4_L1` (ex. `Ana_Pop_M4_L1`)  
> **Același fișier** la L6 și L7 (`Salvează ca` L6 / L10 când e nevoie de copie).

---

## Obiectiv
La finalul orei ai un motor **jucabil**: restart curat, interacțiune reală, condiție `dacă`, și **începutul** direcției wow (nivele **sau** multiplayer local) **vizibil pe scenă**.  
**Minimum:** reset la steag · 2 sprite-uri care interacționează · ≥1 `dacă` · wow A sau B pe scenă.  
**Ținta orei (Complet):** Minim + **una** din: meniu Start (ca M3 L8) **sau** trecere reală Nivel 1→2 **sau** scoruri separate J1/J2.

## De ce contează
În M3 ai făcut jocuri pe rețetă. În M4 **tu** alegi tipul și îl duci până la produs.  
Fără motor solid azi, L6 e panică. Cu motor azi, L6 = finisaj.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Modulul 4 + firul L1→L6→L7 |
| 10–15 | Schiță **rapidă** pe foaie (5 min max) |
| 15–100 | Construiești motorul pe Scratch (vezi **Minim vs Complet**) |
| 100–120 | **Demo 30 s** (coleg / părinte / autotest) + ce lipsește pentru L6 |

**Foaie = 5 min, nu oră de plan.** Pe foaie: titlu · tip · wow A **sau** B · ce rulează azi. Restul = **Scratch**.

**De reținut (firul Creator):**  
- Fișier: `Prenume_Nume_M4_L1` → același la **L6** și **L7**  
- Antrenamente pe **alte** fișiere: L2–L5, L8  
- Wow = **A nivele** *sau* **B multiplayer** (una) · trebuie **pe scenă**  

**Capitole (recap M1–M3, folosite greu):**  
<span style="color:#E6A800;font-weight:700">Evenimente</span> · <span style="color:#FFAB19;font-weight:700">Control</span> · <span style="color:#5CB1D6;font-weight:700">Detectare</span> · <span style="color:#FF8C1A;font-weight:700">Variabile</span> · <span style="color:#9966FF;font-weight:700">Aspect</span> · <span style="color:#CF63CF;font-weight:700">Sunet</span>

---

## Pas cu pas

### 1) Schiță rapidă *(5 min max — apoi Scratch)*
Pe foaie, **câteva rânduri** (nu desen, nu poveste epică):
1. **Titlu** + **tip** (joc / labirint / quiz / poveste / animație-joc)  
2. **Mecanica** (1 frază): „Jucătorul face X ca să obțină Y”  
3. **Wow — UNA:**  
   - **A — Nivele:** Nivel 1 + semnal spre Nivel 2  
   - **B — Multiplayer:** J1 săgeți + J2 WASD  
4. **Azi trebuie să meargă:** motor + primul pas wow  

*(Cele 3 criterii „gata la L6” — opțional, 1 rând; nu blochează Scratch.)*

**Încearcă tu — foaia (5 min)**  
- [ ] Tip + wow A **sau** B + ce rulează azi  
- [ ] Treci la Scratch  

### 2) Motorul pe Scratch *(nucleul Minim)*
1. Proiect **nou** → salvezi `Prenume_Nume_M4_L1`  
2. ≥**2 personaje** care **interacționează** (atingere / mesaj / scor) — nu doar „stau pe fundal”  
3. La steag — **reset universal** (Minim):  
   - `arată` / `ascunde` ce trebuie la start  
   - <span style="color:#4C97FF;font-weight:700">du-te la</span> poziția de start  
   - <span style="color:#FF8C1A;font-weight:700">setează</span> scor (și celelalte variabile) la 0 / start  
   - <span style="color:#9966FF;font-weight:700">treci la fundalul</span> start / Nivel 1  
   - <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>  
   - <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>  
4. Cel puțin **1** din: variabilă pe scenă **și** (recomandat) un `trimite` / `când primesc`  
5. Cel puțin **1** condiție `dacă` pe bune (coliziune / tastă / scor)  
6. Poți explica motorul în **20 secunde**  

**Nu e suficient:** doar eroul se mișcă pe fundal.  
**E suficient:** logica de mai sus **rulează**.  
Steag de **2 ori** = aceeași stare — altfel resetul e incomplet.

**Încearcă tu — motorul (15–20 min)**  
- [ ] Steag de 2 ori → restart curat (toate punctele de reset)  
- [ ] 2 sprite-uri interacționează  
- [ ] Variabilă **sau** mesaj e vizibil / folosit  
- [ ] Ai cel puțin un `dacă`  

### 3) Primul pas wow *(tot Minim — obligatoriu)*

**Dacă ai ales A — Nivele:**  
- [ ] **Nivel 1** jucabil pe scenă  
- [ ] Semnal clar spre Nivel 2: buton / `trimite Nivelul 2` / obiectiv atins  
- [ ] Nivelul 2 are **măcar** fundal diferit **sau** un obstacol în plus (nu egol)  

**Dacă ai ales B — Multiplayer:**  
- [ ] J1: săgeți · J2: WASD (sau alt set clar)  
- [ ] Ambii pe scenă, se mișcă **simultan**  
- [ ] Măcar un scor / cursă / atingere care ține cont de **ambii**  

**Încearcă tu — wow (restul timpului până la Complet/demo)**  
- [ ] Wow-ul se **vede** pe scenă, nu e doar pe foaie  
- [ ] Salvat: `Prenume_Nume_M4_L1`  

### 4) Complet — alege **UNA**
- [ ] **Meniu Start** (`start_joc` / `revino_meniu`, ca M3 L8)  
- [ ] Trecere **reală** Nivel 1 → 2 cu reset scor/timp (ca M3 L6)  
- [ ] Ambii jucători au **scor separat** sau un câștigător clar  

**Încearcă tu — Complet (dacă ai timp)**  
- [ ] Colegul înțelege motorul fără explicație lungă  
- [ ] Salvat din nou  

### 5) Demo (min 100–120)
- [ ] 30 de secunde: coleg / părinte / te uiți tu pe înregistrare sau rulezi de 2 ori  
- [ ] Pe foaie: 1–2 lucruri care lipsesc pentru L6  

---

## Greșeli frecvente
1. **Prea mult pe foaie** — 5 min schiță, restul pe Scratch.  
2. **Doar mișcare pe fundal** — lipsește interacțiunea (coliziune / mesaj / scor).  
3. **Wow pe foaie, zero pe scenă** — Minim cere wow **vizibil**.  
4. **Reset incomplet** — uită fundal / sunete / efecte; folosește checklist-ul universal.  
5. **Nivele = două fundaluri goale** — Nivelul 2 trebuie să aibă **ceva** diferit.  
6. **Multiplayer cu aceleași taste** — controalele trebuie **diferite**.  
7. **Complet = toate trei** — e **una** dintre variante.  
8. **Nume fișier** — `Prenume_Nume_M4_L1`, nu `Nume_M4_ProiectFinal` vag.

---

## De făcut azi — „Motorul meu”
Salvat: `Prenume_Nume_M4_L1`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Reset universal + interacțiune + `dacă` + **wow A sau B pe scenă** |
| **Complet** | Minim + meniu Start **sau** trecere L1→L2 **sau** scor J1/J2 (**una**) |

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus.

### Minim pe tip *(ștachetă Creator)*

| Tip | Motorul AZI |
|-----|-------------|
| **Joc / labirint** | Control + coliziune + obiectiv + wow (nivele **sau** 2 jucători) |
| **Quiz** | `scor` + **≥3** întrebări cu feedback + schiță runde |
| **Poveste** | ≥2 scene + dialog + **1 alegere** pe 2 căi |
| **Animație-joc** | Sunet+mișcare + **1 input** care schimbă ceva + schiță 2 acte |

### Pasul 1 — Schiță (5 min)
- [ ] Tip · wow A/B · ce rulează azi  

### Pasul 2 — Motor + wow *(Minim)*
- [ ] Reset universal · interacțiune · `dacă` · wow pe scenă  
- [ ] Salvat: `Prenume_Nume_M4_L1`  

**→ Minim când:** steag ×2 curat → motorul rulează → wow-ul se vede.

### Pasul 3 — Complet + demo
- [ ] Una din cele 3 variante Complet (dacă poți)  
- [ ] Demo 30 s  

---

## Bonus (dacă ai terminat Complet)
- [ ] Ai început **și** nivele **și** schiță multiplayer  
- [ ] Variabilă `nivel` sau `jucator1` / `jucator2` pe scenă  
- [ ] Clone sau timer deja în motor  

## Recapitulare rapidă
1. M4 Creator = proiectul **tău** (L1→L6→L7)  
2. Schiță scurtă → **Scratch** (motor + wow pe scenă)  
3. Reset universal la steag  
4. Nume: **`Prenume_Nume_M4_L1`**

## Schema pe scurt *(pe foaie)*

**Steag — reset**  
arată/ascunde · `du-te la` · `setează` variabile · fundal start · `anulează efectele` · `oprește toate sunetele`  

**Wow A — Nivele**  
Nivel 1 jucabil → `trimite Nivelul 2` → fundal/obstacol diferit  

**Wow B — Multiplayer**  
J1 săgeți · J2 WASD · ambii pe scenă · scor sau cursă  

**Quiz scurt:**  
- Ce e „motorul” azi?  
- De ce wow-ul trebuie pe scenă?  
- Ce continui la L6 pe același fișier?

## Temă
Opțional 15 min pe motor. Urmează L2 = **poveste cu alegeri** (fișier **nou**).
