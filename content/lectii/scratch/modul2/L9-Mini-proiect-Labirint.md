# Lecția 9 — Mini-proiect: Labirint
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi pui împreună logica din M2: un **labirint** pe care îl controlezi, cu pereți, ieșire și restart curat.  
> Proiect: **„Labirintul meu”** · fișier: `Prenume_L9` (ex. `Ana_L9`)

---

## Obiectiv
La finalul orei ai un labirint jucabil: taste + detectare pereți + ieșire cu mesaj / stop + steag = restart — fără să explici cu vocea regulile.

## De ce contează
L1–L8 = piese. L9 = **jocul tău**. La L10 îl lustruiești și îl prezinți (ca M1 L9–L10).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + reguli pe tablă (checklist scurt) |
| 10–20 | Pas cu pas: ordinea de lucru + **Încearcă tu** (schelet) |
| 20–50 | Pasul 1–2: lumea + control + pereți — **schelet jucabil** |
| 50–100 | Pasul 3: ieșire, polish, scor/vieți opțional |
| 100–120 | Recap, bonus, salvare / pregătire L10 |

*(Profesor: la ~50 min, cine n-ajunge la ieșire pe steag = ajutat pe schelet, nu pe decor.)*

---

## Pas cu pas

### 1) Reguli (pe tablă)
1. Eroul se mișcă cu **tastele** (`forever` + `tasta e apăsată?`)  
2. Dacă atinge **peretele** (culoare) → înapoi la **start** (sau un pas înapoi)  
3. Dacă atinge **ieșirea** → `Ai scăpat!` + sunet + `stop all` (sau mesaj clar)  
4. Steag verde = **restart curat** (poziție, scor/vieți dacă există, sunete oprite)

### 2) Ordinea bună de lucru
1. **Fundal** labirint (desen clar; pereții = o culoare)  
2. **Erou** mic, vizibil; punct de start pe culoare **sigură**  
3. Steag → reset → `forever` + 4 direcții  
4. `dacă atinge culoarea` (perete) → `du-te la` start  
5. Ieșire = personaj sau culoare diferită → victorie  
6. Opțional: `scor` / `vieti` / mesaj `trimite` la victorie (L5–L8)

### 3) Schelet minim
1. Steag + start  
2. Forever + dreapta/stânga (măcar 2 axe)  
3. Un perete detectat  
4. O ieșire cu mesaj  
5. Rulează o dată cap-coadă  

---

## Încearcă tu — verifică înainte să continui

- [ ] Te miști pe scenă cu tastele  
- [ ] Peretele te trimite la start  
- [ ] Ieșirea dă mesaj de succes  
- [ ] Fișier: `Prenume_L9`  

---

## Greșeli frecvente
1. **Pipeta greșită** — peretele nu se detectează; re-pipetează pe pixelul de perete.  
2. **Start pe perete** — te teleportezi și „mor” instant; mută startul.  
3. **Viteză prea mare** — treci prin pereți; coboară la 3–4.  
4. **Victorie fără stop** — mesajul spam; `stop all` sau `așteaptă` + flag.

**Ajutor profesor:** nu desena labirintul în locul elevului — ajută la culoare și viteză.

---

## De făcut azi — „Labirintul meu”
Salvat: `Prenume_L9`

### Pasul 1 — Lumea
- [ ] Fundal labirint clar  
- [ ] Erou + start sigur  
- [ ] Steag = restart curat  

### Pasul 2 — Logică
- [ ] Control pe 4 direcții  
- [ ] Detectare **perete**  
- [ ] Detectare **ieșire** + victorie  

### Pasul 3 — Extra (ideal 1)
- [ ] Sunet la victorie **sau** `vieti` **sau** o monedă (`scor +1`)  
- [ ] Un coleg poate termina labirintul  

**Gata când:** steag → joci → ieșire → e clar că ai câștigat.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] **2 ieșiri** (una e capcană)  
- [ ] Timer sau vieți pe scenă  
- [ ] Nivel 2: alt fundal după prima ieșire (mesaj `nivel2`)  
- [ ] Obstacol care se mișcă stânga–dreapta (`forever` + `glisează`)  

## Recapitulare rapidă
1. Control + detectare + stop/restart  
2. Culoarea peretelui trebuie pipetată bine  
3. L10 = completare + prezentare  

**Quiz scurt (cu profesorul):**  
- Ce pui în `forever` pentru control?  
- Cum știi că ai atins ieșirea?

## Temă
Opțional: un obstacol + sunet la victorie — același `Prenume_L9`.  
La **L10** continui: **completare** + prezentare + insignă.
