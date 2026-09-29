# Lecția 1 — Design de joc: erou, obstacol, țintă
**Modulul 3 · Jocuri**  
**Code Kids Play · Game Builder**

> Azi **proiectezi** un joc pe hârtie, apoi îl construiești pe scenă: erou care se mișcă, un obstacol și o țintă.  
> **Proiect nou** (nu continui labirintul din Modul 2).  
> Proiect: **„Jocul meu pe hârtie și pe scenă”** · fișier: `Prenume_Nume_M3_L1` (ex. `Ana_Pop_M3_L1`)

---

## Obiectiv
La finalul orei ai o foaie cu regulile jocului tău **și** o scenă Scratch cu **erou + obstacol + țintă**, unde eroul se mișcă cu tastele.  
**Minimum:** foaia de design + 3 personaje redenumite pe scenă + eroul se mișcă pe **toate 4 direcțiile** (săgeți, cu `schimbă x/y`).  
**Ținta orei (Complet):** Minim + **titlu** la start (`spune` 2s) + **obstacol care patrulează** (cu reset la steag).

## De ce contează
Orice joc — de la Mario la jocurile de telefon — are aceleași 3 lucruri: **cineva pe care îl controlezi** (erou), **ceva de evitat** (obstacol) și **ceva de câștigat** (țintă). Dacă le desenezi întâi pe hârtie, știi exact ce să construiești în Scratch — nu mai ghicești pe parcurs.  
**Azi** construim **scena** (cine e pe ecran + mișcarea eroului). **Regulile** (ce se întâmplă la atingere, scor, vieți) le programăm în **L2–L4**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Ce e un joc? Exemple cunoscute (erou/obstacol/țintă) |
| 10–35 | Pe hârtie: desen + reguli scurte *(~5–8 min scrisul; restul desenul)* |
| 35–100 | În Scratch: scenă + 3 personaje redenumite + mișcare (vezi **Minim vs Complet**) |
| 100–120 | Rulează, arată colegilor, salvezi |

**Capitole azi:**  
**Nou (blocul pe care îl înveți azi):** <span style="color:#4C97FF;font-weight:700">Mișcare</span> — `schimbă x cu` / `schimbă y cu`  
**Recap (le știi din M1–M2):** <span style="color:#E6A800;font-weight:700">Evenimente</span> (steag) · <span style="color:#FFAB19;font-weight:700">Control</span> (`forever`, `dacă`) · <span style="color:#5CB1D6;font-weight:700">Detectare</span> (tasta e apăsată?) · la Complet și <span style="color:#9966FF;font-weight:700">Aspect</span> (`spune`)  
*(Variabile / scor / coliziuni pe personaj — **nu** azi; vin la **L2–L3**.)*

---

## Pas cu pas

### 1) Design pe hârtie *(nucleul lecției)*
1. Iei o foaie și scrii titlul jocului tău sus
2. Desenezi 3 lucruri și le numești:
   - **Eroul** — pe cine controlezi (ex. pisică, robot, navă)
   - **Obstacolul** — ce trebuie evitat (ex. spin, foc, gaură)
   - **Ținta** — ce trebuie atins ca să câștigi (ex. stea, ușă, steag)
3. Sub desen, scrii:
   - „**Câștigi dacă…**”
   - „**Pierzi dacă…**” *(opțional azi; util pentru L4)*
   - „**Ce se întâmplă la atingere?**” — 2 rânduri scurte: când atingi **ținta** / când atingi **obstacolul**  
     *(ex. țintă → „Yaay!”; obstacol → „Au!” — le programezi la **L2**)*

**Încearcă tu — foaia (scris ~5–8 min; desenul e în restul slotului 10–35)**  
- [ ] Ai un titlu de joc  
- [ ] Ai desenat erou, obstacol, țintă (cu nume lângă fiecare)  
- [ ] Ai scris „Câștigi dacă…” + „Ce se întâmplă la atingere?” (țintă / obstacol)

### 2) Scena: fundal + 3 personaje **redenumite**
1. Alegi un **fundal** din bibliotecă (sau desenezi unul simplu)
2. Adaugi **3 personaje**: eroul tău, obstacolul, ținta — poți alege orice din bibliotecă
3. **Redenumește personajul** (nu costumul): click pe personaj → în panoul **Personaj** / Sprite **de sub scenă**, câmpul cu **numele personajului** → `Erou`, `Obstacol`, `Țintă`  
   *(**Nu** tab-ul **Costume** — acolo redenumești doar costumul; în `atinge [ ]?` la L2 tot apare „Cat”.)*
4. Le tragi pe scenă în poziții logice: eroul jos, ținta departe, obstacolul între ei

**Încearcă tu — scena (5 min)**  
- [ ] Fundal ales  
- [ ] 3 personaje pe scenă, fiecare vizibil, nu suprapuse total  
- [ ] Redenumite în panoul **Personaj** de sub scenă: **Erou**, **Obstacol**, **Țintă**

### 3) Mișcarea eroului pe 4 direcții *(`schimbă x/y` = bloc nou)*
În M2 ai folosit adesea <span style="color:#4C97FF;font-weight:700">mergi</span> `10` pași. Azi **nu** îl folosim pentru control pe taste:

- **x** = stânga / dreapta (negativ = stânga, pozitiv = dreapta)  
- **y** = jos / sus (negativ = jos, pozitiv = sus)  
- <span style="color:#4C97FF;font-weight:700">mergi</span> merge doar **în direcția** în care e orientat personajul — deci **nu** poți face ușor 4 săgeți independente cu el. De aceea azi: <span style="color:#4C97FF;font-weight:700">schimbă x cu</span> / <span style="color:#4C97FF;font-weight:700">schimbă y cu</span>.

1. Selectezi **Erou**
2. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
3. Din <span style="color:#FFAB19;font-weight:700">Control</span>: <span style="color:#FFAB19;font-weight:700">forever</span> *(îl știi din M2)*
4. **În interiorul** buclei `forever`, **patru** <span style="color:#FFAB19;font-weight:700">dacă … atunci</span> (câte unul pe tastă), cu hexagon din <span style="color:#5CB1D6;font-weight:700">Detectare</span>:  
   - `săgeată dreapta` → <span style="color:#4C97FF;font-weight:700">schimbă x cu</span> `10`  
   - `săgeată stânga` → <span style="color:#4C97FF;font-weight:700">schimbă x cu</span> `-10`  
   - `săgeată sus` → <span style="color:#4C97FF;font-weight:700">schimbă y cu</span> `10`  
   - `săgeată jos` → <span style="color:#4C97FF;font-weight:700">schimbă y cu</span> `-10`  
5. Poți începe cu stânga/dreapta, apoi adaugi imediat sus/jos — **Minim = toate 4**.

**Încearcă tu — 4 direcții (8–10 min)**  
- [ ] Toate cele **4** condiții `dacă` sunt **în interiorul** aceleiași bucle `forever`  
- [ ] Apeși steagul → eroul merge corect pe **toate** săgețile

### 4) Reset la steag *(regulă fixă din M2)*
1. **Înaintea** buclei `forever`, chiar sub steag:  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> `x: 0, y: -100` (sau poziția ta de start)
2. Fără reset, la al doilea steag eroul rămâne unde a rămas ultima dată

**Încearcă tu — reset (2 min)**  
- [ ] Steag de două ori: eroul reîncepe din același loc  
- [ ] Salvat: `Prenume_Nume_M3_L1`

---

## Greșeli frecvente
1. **Foaia nu are toate 3 elementele** — fără ele, nu știi ce personaje să pui în Scratch.
2. **Condițiile `dacă` nu sunt în bucla `forever`** — dacă sunt **înaintea** buclei, verifică o singură dată, la start; dacă sunt **desprinse**, nu rulează deloc. Toate cele **4** condiții `dacă` trebuie să fie **în interiorul** buclei `forever`.
3. **Ai redenumit costumul, nu personajul** — ai scris în tab-ul Costume. Folosește câmpul **Personaj** de sub scenă. Altfel la L2 tot vezi „Cat” în `atinge [ ]?`.
4. **Prea puține condiții `dacă`** — Minim cere **4** (stânga, dreapta, sus, jos), nu doar 2.
5. **Ai folosit `mergi` în loc de `schimbă x/y`** — `mergi` ține de direcția personajului; pe 4 săgeți te încurci.
6. **Fără reset** — eroul „rătăcește” de la o rulare la alta.
7. **Titlul blochează tastele 2s** — <span style="color:#9966FF;font-weight:700">spune</span> … **timp de** `2` **înaintea** buclei `forever` = 2s fără control; e normal. Problema reală: același `spune` … **timp de** `2` **în** `forever` blochează mișcarea mereu. *(Un `spune` fără timp, în `forever`, e inofensiv — nu spam-uiește.)*
8. **Personajele suprapuse perfect** — greu de văzut cine e cine; le tragi puțin distanță.
9. **Obstacolul tremură pe margine** — ai uitat <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2` după întoarcere (obligatoriu, ca în M2).

---

## De făcut azi — „Jocul meu pe hârtie și pe scenă”
Salvat: `Prenume_Nume_M3_L1`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Foaia de design (inclusiv „la atingere”) + fundal + 3 personaje **redenumite** (panoul Personaj) + eroul pe **4 direcții** cu `schimbă x/y` + reset la steag |
| **Complet (ținta orei)** | Minim + titlu la steag (`spune` 2s) + **obstacol care patrulează** (reset + stil rotație + `așteaptă` `0.2` la margine) |

*(Notă profesor: Complet e realist pentru cei rapizi în slotul Scratch; mulți rămân la Minim — e ok. L2 pornește de pe scena Minim.)*

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Foaia + scena *(bază)*
*(Ca la „Încearcă tu — foaia” și „scena”.)*

- [ ] Foaie cu titlu + erou/obstacol/țintă + „Câștigi dacă…” + „Ce se întâmplă la atingere?”  
- [ ] Fundal + 3 personaje redenumite în panoul **Personaj**: Erou, Obstacol, Țintă  

### Pasul 2 — 4 direcții + reset *(Minim)*
*(Ca la „Încearcă tu — 4 direcții” și „reset”.)*

- [ ] Reset (`du-te la`) **înaintea** buclei `forever`  
- [ ] **Patru** condiții `dacă` **în interiorul** buclei `forever`: stânga/dreapta (`schimbă x`) + sus/jos (`schimbă y`)  
- [ ] Salvat: `Prenume_Nume_M3_L1`

**→ Minim când:** steag → eroul merge pe **toate 4** săgețile și pornește mereu din același loc.

### Pasul 3 — Titlu + obstacol care patrulează *(Complet)*
*(Adaugi peste Pasul 2.)*

**Pe Erou — ordinea la steag (exact așa):**  
`steag` → <span style="color:#4C97FF;font-weight:700">du-te la</span> (reset) → <span style="color:#9966FF;font-weight:700">spune</span> `Numele jocului` timp de `2` → abia apoi bucla `forever` (cu cele 4 condiții `dacă`).  
*(Dacă pui `spune` înainte de reset, eroul apare o clipă în locul greșit.)*

- [ ] Pe **Erou**: steag → reset → `spune` 2s → bucla `forever` (4 direcții)  
- [ ] Pe **Obstacol**, la steag (**înainte** de bucla lui):  
  <span style="color:#4C97FF;font-weight:700">du-te la</span> poziția de start →  
  <span style="color:#4C97FF;font-weight:700">orientează-te în direcția</span> `90` →  
  setează **stil de rotație** → **stânga-dreapta**  
- [ ] Pe **Obstacol**: bucla `forever` → `mergi` `2` →  
  <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge</span> `[marginea]` <span style="color:#5CB1D6;font-weight:700">?</span>  
  *(în Detectare: din meniul derulant alegi **marginea**)* →  
  <span style="color:#4C97FF;font-weight:700">întoarce-te</span> `180` →  
  <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2` **(obligatoriu)**  
- [ ] Salvat din nou

**Gata Complet când:** 4 direcții + titlu + obstacolul patrulează fără să tremure pe margine și **nu** „derivă” între rulări.

---

## Bonus (dacă ai terminat Complet)
- [ ] **Ținta** pulsează: pe Țintă, o buclă `forever` cu  
  <span style="color:#9966FF;font-weight:700">schimbă efectul culoare cu</span> `25` →  
  <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2`  
  *(fără bucla `forever` + `așteaptă`, culoarea se schimbă o singură dată)*  
- [ ] La steag pe Țintă: <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span> (reset curat)

## Recapitulare rapidă
1. Orice joc are: **erou**, **obstacol**, **țintă** — azi scena; regulile la L2–L4  
2. **4 direcții** = bucla `forever` + 4× condiții `dacă` + **`schimbă x/y`** (nu `mergi`)  
3. Redenumește în panoul **Personaj** de sub scenă — te ajută la L2  
4. Reset la steag = poziția de start, **înaintea** buclei `forever`  
5. Nume fișier: **`Prenume_Nume_M3_L1`**

## Schema pe scurt *(pe foaie)*

**Pe Erou**  
la steag → `du-te la` start → *(Complet: `spune` titlu 2 s)* → `forever`:  
· `dacă` tasta stânga → `schimbă x cu -10`  
· `dacă` tasta dreapta → `schimbă x cu 10`  
· `dacă` tasta sus → `schimbă y cu 10`  
· `dacă` tasta jos → `schimbă y cu -10`

**Pe Obstacol** *(Complet — patrulează)*  
la steag → `du-te la` start → `forever`: `mergi 2` → `dacă atinge marginea?` → întoarcere + `așteaptă 0.2`

**Pe scenă:** 3 personaje redenumite: **Erou**, **Obstacol**, **Țintă**

**Quiz scurt (cu profesorul):**  
- Ce 3 lucruri are orice joc?  
- De ce `schimbă x/y`, nu `mergi`, pentru 4 săgeți?  
- Unde redenumești personajul (Personaj vs Costume)?  
- Ce se întâmplă dacă uiți reset-ul la steag?

## Temă
Opțional: pe foaie, completează **„Pierzi dacă…”** + **„Ce se întâmplă când pierzi?”** (1 propoziție fiecare) — pregătire pentru L2–L4.  
*(„Câștigi dacă…” e deja pe foaia din oră.)*  
*(Pe scenă rămâne proiectul `Prenume_Nume_M3_L1`.)*
