# Lecția 9 — Mini-proiect: Obby cu scor
**Modulul 3 · Game Logic**  
**Code Maker Club · Roblox Studio**

> Azi pui împreună tot Modulul 3: un **Obby jucabil**, cu **scor vizibil**, **checkpoint-uri adevărate** și o **regulă de risc** — gata să fie jucat de un coleg care nu știe nimic despre el.  
> Place: `Prenume_Nume_M3` (ex. `Ana_Pop_M3`)  
> *Plasă de siguranță: dacă Obby-ul tău nu mai e jucabil, profesorul îți dă Place-ul de bază și completezi lecția pe el.*

---

## Obiectiv
La finalul orei ai un Obby pe care un coleg îl poate **juca de la Spawn la Finish**, fără explicații cu vocea, cu scorul și etapa vizibile.  
**Minimum:** Obby **parcurgibil** + **scor vizibil** (leaderstats **și/sau** panou pe ecran) + **cel puțin 1 checkpoint cu script** (L5) · **0 erori** în Output.  
**Ținta orei (Complet):** Minim + **RemoteEvent** folosit corect (L3–L4) + **timer sau vieți** (L7) + panou cu **instrucțiuni** + un coleg joacă și îți dă feedback.

## De ce contează
L1–L8 = piesele. L9 = **jocul tău**. La L10 îl lustruiești, îl prezinți și primești insigna **Game Logic**.

**Azi nu avem salvare între sesiuni, NPC sau magazin.** Acestea vin în **Modulul 4**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + checklist + **Minim vs Complet** |
| 10–25 | Pas cu pas: fișa jocului + audit (**Încearcă tu**) |
| 25–65 | Proiect: **Minim** (Obby jucabil cu scor + checkpoint) |
| 65–105 | Proiect: **Complet** (RemoteEvent + risc + coleg) |
| 105–120 | Recap, bonus, salvare / pregătire L10 |

---

## Pas cu pas

### 1) Checklist — ce trebuie să existe
| # | Element | Ce îl face | Lecția |
|---|---------|-----------|--------|
| 1 | Place `Prenume_Nume_M3` | copie din M2 | L1 |
| 2 | Scor în listă (`leaderstats`) | `Srv_Leaderstats` | L1 |
| 3 | Monede care dau puncte | `Srv_Monede` + folder `Monede` | L1 |
| 4 | Panou de scor pe ecran | `Cli_Scor` | L2 |
| 5 | RemoteEvent corect | `Ev_Bonus` + `Srv_Bonus` (serverul decide) | L3–L4 |
| 6 | Checkpoint cu script | `Srv_Checkpoint` + `Etapa` | L5 |
| 7 | Cădere + respawn | `Zona_Cadere`, `Srv_Zona`, `Srv_Respawn` | L6 |
| 8 | Timer **sau** vieți | `Srv_Timp` / `Srv_Vieti` | L7 |
| 9 | Finish cu recompensă | `Srv_Finish` | L8 |

**Minim** = rândurile **1–4 + 6** merg + Obby-ul se termină.  
**Complet** = **toate** cele 9 + panou instrucțiuni + coleg.

**Încearcă tu — știu ce am (3–4 min)**  
- [ ] Bifezi pe foaie ce ai deja din L1–L8  
- [ ] Știi ce mai lipsește pentru Minim

### 2) Fișa jocului (3 rânduri)
Scrie pe o foaie (sau pe un `TextLabel` din lume, lângă Spawn):

1. **Numele** jocului tău (ex. „Obby-ul Lunii")  
2. **Scopul:** ce trebuie să facă jucătorul? (ex. „Ajunge la Finish și adună monede")  
3. **Regula de risc:** ce se întâmplă dacă cazi? (checkpoint? vieți? timp?)

*Dacă o propoziție e greu de scris, jocul nu e încă clar.*

**Încearcă tu — fișa (3–4 min)**  
- [ ] Ai cele 3 rânduri  
- [ ] Le citești unui coleg: înțelege jocul?

### 3) Ordinea bună de lucru
1. **Salvezi** o copie de siguranță (`Prenume_Nume_M3_bak`)  
2. **Play** — joci tot Obby-ul o dată și notezi **ce nu merge**  
3. Repari întâi **erorile roșii** din Output  
4. Apoi lucrurile care **blochează** (Finish inaccesibil, respawn greșit)  
5. Abia apoi decor, mesaje, instrucțiuni

*Regula modulului (ca la M2): **mai întâi „rulează curat", apoi „face ce vreau".***

### 4) Minim — „se joacă"
- [ ] Spawn · traseu · Finish: **terminabil**  
- [ ] `leaderstats` arată **Monede** (și `Etapa`)  
- [ ] Cel puțin o monedă dă puncte  
- [ ] **Cel puțin un checkpoint** salvează etapa și te mută la reapariție  
- [ ] **Output curat** la Play  

**Încearcă tu — Minim (10–15 min)**  
- [ ] Un tur complet Start→Finish **reușit**  
- [ ] Cazi o dată și reapari la checkpoint  
- [ ] Salvat

### 5) Complet — adânc
1. **RemoteEvent** corect: `Ev_Bonus` + `Srv_Bonus` cu pauză și sumă hotărâtă de server (L4)  
2. **Risc:** viețile **sau** timerul funcționează (L7)  
3. **Panou instrucțiuni:** în `GUI_Joc`, un `TextLabel` **`Txt_Instructiuni`** cu 2–3 rânduri („Adună monede. Atinge checkpoint-urile. Ajungi la Finish!"), `TextScaled` activ, sus-mijloc. În el un LocalScript `Cli_Instructiuni`:

```lua
local eticheta = script.Parent

task.wait(10)
eticheta.Visible = false
```

*(Panoul apare la început și dispare după 10 secunde.)*

4. **Coleg:** joacă tot Obby-ul, **fără să-i explici**; tu observi unde se oprește  
5. Notezi **1 feedback**, repari **cel puțin un lucru**, retestezi

**Încearcă tu — Complet (15–20 min)**  
- [ ] Toate cele 9 rânduri din checklist funcționează  
- [ ] Panou de instrucțiuni  
- [ ] Colegul a terminat (sau a fost aproape, cu 1 feedback clar)  
- [ ] Salvat

---

## Greșeli frecvente
1. **Decor înainte de reguli** — frumos, dar scorul nu merge; Minim întâi.  
2. **Scripturi duplicate** — monede cu **două** scripturi (scor dublu).  
3. **Nume diferite** (`Finish`, `Checkpoint1`, `Monede`, `Zona_Cadere`) — scripturile nu le găsesc; verifică Explorer + Output (*„Infinite yield"*).  
4. **Etapa se resetează prost** — doar `gameOver`, `rundaNoua` și `Srv_Finish` o pun pe 0.  
5. **Un script încearcă să schimbe scorul din client** — scorul se schimbă **doar** din `Script`.  
6. **Obby imposibil** — risc prea mare; coleg + feedback.  
7. **Testat doar cu un jucător** — verifică și cu doi (L8).  
8. **Timer prea scurt / vieți prea puține** — jucătorul nu apucă să înțeleagă jocul.  
9. **Panou de instrucțiuni care nu dispare** — LocalScript în loc greșit (trebuie **în** `Txt_Instructiuni`).

---

## De făcut azi — „Obby cu scor"
Salvat: `Prenume_Nume_M3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | Obby **parcurgibil** + scor vizibil + **≥1 checkpoint cu script** + **0 erori** |
| **Complet (ținta orei)** | Minim + RemoteEvent corect + timer **sau** vieți + panou de instrucțiuni + un coleg joacă și dă **1 feedback** |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Audit
- [ ] Checklist-ul din secțiunea 1  
- [ ] Fișa jocului  

### Pasul 2 — Schelet *(Minim)*
- [ ] Un tur Start→Finish  
- [ ] Scor + checkpoint  
- [ ] Output curat · salvat  

**→ Minim când:** Obby-ul se termină și scorul se vede.

### Pasul 3 — Adânc *(Complet)*
- [ ] RemoteEvent + risc + instrucțiuni  
- [ ] Coleg + feedback + reparație  
- [ ] Salvat din nou  

**Gata Complet când:** un coleg înțelege jocul **fără** ghid vocal și îl poate termina.

---

## Bonus (dacă ai terminat Complet)
- [ ] O monedă specială (`MonedaMare`) care dă **+5**  
- [ ] Un al doilea `Zona_Bonus` în alt loc  
- [ ] O **platformă de odihnă** cu checkpoint, în fața celei mai grele secțiuni  
- [ ] Notezi pe foaie 3 idei pentru **M4** (ex. „aș vrea să-mi rămână scorul după ce ies din joc")

## Recapitulare rapidă
1. Minim = **se joacă** (traseu + scor + checkpoint)  
2. Complet = + RemoteEvent corect + risc + instrucțiuni + ochi de coleg  
3. **Serverul decide** (monede, bonus, checkpoint, finish)  
4. Clientul **arată** (GUI) și **cere** (RemoteEvent)  
5. L10 = lustruire + prezentare + insigna **Game Logic**

**Quiz scurt (cu profesorul):**  
- Care sunt elementele minime ale unui Obby cu scor?  
- De ce recompensa de la `Finish` se dă din `Script`, nu din `LocalScript`?  
- Ce faci prima dată când vezi o linie roșie în Output?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția și checklist-ul. Dacă ai nevoie de un model, profesorul arată pe proiector structura din Explorer a unui Obby cu scor.)*

## Temă
Opțional: o reparație după feedback-ul colegului.  
La **L10** — completare + prezentare + insigna **Game Logic**.
