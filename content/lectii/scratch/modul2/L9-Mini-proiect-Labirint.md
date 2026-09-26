# Lecția 9 — Mini-proiect: Labirint
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi pui împreună logica din M2: un **labirint** pe care îl controlezi, cu pereți, ieșire și restart curat.  
> Proiect: **„Labirintul meu”** · fișier: `Prenume_Nume_L9` (ex. `Ana_Pop_L9`)

---

## Obiectiv
La finalul orei ai un labirint jucabil: taste + detectare pereți + ieșire cu mesaj / stop + steag = restart — fără să explici cu vocea regulile.  
**Minimum:** scheletul rulează — control + **1** perete + **1** ieșire cu mesaj (+ `stop all`).  
**Ținta orei (Complet):** Minim + labirint plin + **extra** (sunet / scor / vieți) din Pasul 3.

## De ce contează
L1–L8 = piese. L9 = **jocul tău**. La L10 îl lustruiești și îl prezinți (ca M1 L9–L10).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + checklist + **Minim vs Complet** |
| 10–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–50 | Proiect: **Minim** (schelet jucabil) |
| 50–100 | Proiect: **Complet** (labirint + extra, arăți unui coleg) |
| 100–120 | Recap, bonus, salvare / pregătire L10 |

*(Profesor: la ~50 min, cine n-ajunge la ieșire pe steag = ajutat pe schelet, nu pe decor.)*

---

## Pas cu pas

### 1) Reguli (pe tablă)
1. Eroul se mișcă cu **tastele** (`forever` + `tasta e apăsată?`) — ca L4  
2. Dacă atinge **peretele** (culoare) → înapoi la **start** — ca L3  
3. Dacă atinge **ieșirea** → `Ai scăpat!` + sunet + <span style="color:#FFAB19;font-weight:700">stop all</span> — ca L7  
4. Steag verde = **restart curat**

**Încearcă tu — știu regulile (1–2 min)**  
- [ ] Poți spune: control · perete · ieșire · steag = restart  
- [ ] Știi: **Minim** = scheletul care **rulează**, nu labirintul perfect  

### 2) Ordinea bună de lucru + reset complet
1. **Fundal** labirint (desen clar; pereții = o culoare)  
2. **Erou** mic, vizibil; punct de start pe culoare **sigură**  
3. Steag → **reset complet** (ca L1–L8):  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> start →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span> →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span> →  
   (dacă ai) <span style="color:#FF8C1A;font-weight:700">setează scor / vieti</span>  
4. `forever` + 4 direcții (mișcare **întâi**, verificări **după** — ca L4)  
5. `dacă atinge culoarea` (perete) → `du-te la` start  
6. Ieșire = personaj sau **culoare diferită** de perete → victorie  
7. Opțional Complet: `scor` / `vieti` / mesaj `trimite` la victorie (L5–L8)

**Încearcă tu — control (2–3 min)**  
- [ ] Steag → reset (loc + efecte + sunete)  
- [ ] Te miști pe scenă cu tastele (măcar 2 axe; ideal 4)  

### 3) Schelet minim — perete + ieșire
1. Un perete detectat (pipetă pe pixelul de perete)  
2. O ieșire cu mesaj  
3. La ieșire:  
   <span style="color:#9966FF;font-weight:700">spune</span> `Ai scăpat!` pentru `1` secundă →  
   <span style="color:#CF63CF;font-weight:700">pornește sunetul</span> `…` →  
   <span style="color:#FFAB19;font-weight:700">stop all</span>  
4. Rulează o dată cap-coadă  

*Victorie — ca L7:* azi ieșirea se atinge **o dată** și jocul se termină → **`stop all` e soluția implicită** (simplă, fără spam).  
Variabila / flag (ca `alarma_activa` la L8) = doar dacă la Bonus ai **2 ieșiri** sau logică mai fină — **nu** e nevoie azi pe Minim.

**Încearcă tu — scheletul rulează curat (3–5 min)**  
*(Checkpoint Minim — „am scris” ≠ „am verificat că merge”.)*

- [ ] **1** perete te trimite la start  
- [ ] **1** ieșire → mesaj + `stop all` (fără spam)  
- [ ] Startul e pe zonă **sigură**  
- [ ] Salvat: `Prenume_Nume_L9`  

### 4) De la schelet la Complet
1. Completezi labirintul (mai mulți pereți / coridoare clare)  
2. Adaugi **cel puțin 1** extra: sunet la victorie (dacă n-ai) **sau** `vieti` **sau** o monedă (`scor +1`)  
3. Un coleg poate termina labirintul fără explicație  

**Încearcă tu — Complet (3–5 min)**  
- [ ] Labirintul e jucabil cap-coadă  
- [ ] Ai cel puțin 1 extra (sunet / scor / vieți)  
- [ ] Un coleg înțelege regulile **fără** voce  
- [ ] Salvat din nou  

---

## Greșeli frecvente
1. **Pipeta greșită** — peretele nu se detectează; re-pipetează pe pixelul de perete.  
2. **Start pe perete** — te teleportezi și „mor” instant; mută startul.  
3. **Viteză prea mare** — treci prin pereți; coboară la 3–4.  
4. **Victorie spam** — `dacă ieșire` în forever **fără** `stop all`; pune `stop all` imediat (ca L7).  
5. **Reset incomplet** — lipsește `anulează efectele` / `oprește toate sunetele`.  
6. **Nume fișier** — `Prenume_Nume_L9`, nu doar `Ana_L9`.

**Ajutor profesor:** nu desena labirintul în locul elevului — ajută la culoare și viteză.

---

## De făcut azi — „Labirintul meu”
Salvat: `Prenume_Nume_L9`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Reset complet + control + **1** perete + **1** ieșire cu mesaj + `stop all` — schelet care **rulează** |
| **Complet (ținta orei)** | Minim + labirint plin + **≥1** extra (sunet / scor / vieți) + un coleg poate termina |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Lumea
- [ ] Fundal labirint clar  
- [ ] Erou + start sigur  
- [ ] Steag = restart: loc + efecte + sunete (+ scor/vieți dacă există)  

### Pasul 2 — Scheletul *(Minim)*
*(Ca la „Încearcă tu — scheletul rulează curat”.)*

- [ ] Control pe 4 direcții (sau măcar 2 axe)  
- [ ] Detectare **perete** → start  
- [ ] Detectare **ieșire** → mesaj + `stop all`  
- [ ] Salvat: `Prenume_Nume_L9`  

**→ Minim când:** steag → joci → ieșire → e clar că ai câștigat (chiar cu labirint mic).

### Pasul 3 — Extra *(Complet)*
*(Ca la „Încearcă tu — Complet”.)*

- [ ] Sunet la victorie **sau** `vieti` **sau** o monedă (`scor +1`)  
- [ ] Un coleg poate termina labirintul  
- [ ] Salvat din nou  

**Gata Complet când:** steag → joci → ieșire → polish vizibil, fără explicații.

---

## Bonus (dacă ai terminat Complet)
- [ ] **2 ieșiri** (una e **capcană**): folosește **culori diferite** (sau 2 personaje), cu **2** `dacă` separate — **nu** același hexagon de culoare pentru ambele. Capcana → start / −1 viață; ieșirea bună → `stop all`.  
- [ ] Timer sau vieți pe scenă  
- [ ] Nivel 2: alt fundal după prima ieșire (mesaj `nivel2`)  
- [ ] Obstacol care se mișcă stânga–dreapta (`forever` + `glisează`)  

## Recapitulare rapidă
1. Control + detectare + `stop all` / restart  
2. Culoarea peretelui trebuie pipetată bine  
3. Victorie simplă = `stop all` (flag = Bonus / 2 ieșiri)  
4. L10 = completare + prezentare  
5. Nume: **`Prenume_Nume_L9`**  

**Quiz scurt (cu profesorul):**  
- Ce pui în `forever` pentru control?  
- Cum știi că ai atins ieșirea?  
- De ce `stop all` la ieșire, nu doar `spune`?

## Temă
Opțional: un obstacol + sunet la victorie — același `Prenume_Nume_L9`.  
La **L10** continui: **completare** + prezentare + insignă.
