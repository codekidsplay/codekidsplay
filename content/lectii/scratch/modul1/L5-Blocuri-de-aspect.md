# Lecția 5 — Interviul (blocuri de aspect)
**Modulul 1 · Primii pași**  
**Code Kids Play · Scratch Starter**

> Azi controlezi **cum arată** și **ce transmite** personajul: spune, gândește, mărime, culoare.  
> Proiect: **„Interviul”** · fișier: `Prenume_Nume_L5` (ex. `Ana_Pop_L5`)

---

## Obiectiv
La finalul orei folosești blocuri din <span style="color:#9966FF;font-weight:700">Aspect</span>.  
**Minimum:** dialog pe 2 personaje cu `spune` / `gândește` + `așteaptă`.  
**Ținta orei (Complet):** + mărime, culoare și **reset curat** la steag (`setează mărimea la 100` + anulează efectele).

## De ce contează
În jocuri și povești, personajul nu doar merge: vorbește, se sperie (se mărește), se „înroșește”, are un gând.  
În Scratch, asta e capitolul <span style="color:#9966FF;font-weight:700">Aspect</span> (EN: *Looks*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–5 | Obiectiv + unde e Aspect |
| 5–30 | Pas cu pas: **3–4** checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Interviul” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Spune și gândește
1. Selectezi **personajul** (intervievatul)
2. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
3. Din <span style="color:#9966FF;font-weight:700">Aspect</span>:  
   <span style="color:#9966FF;font-weight:700">spune</span> `Salut!` pentru `2` secunde →  
   <span style="color:#9966FF;font-weight:700">gândește</span> `Hmm… ce să zic?` pentru `2` secunde →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Sunt gata!` pentru `2` secunde
4. Apeși steagul — bulă de vorbă, apoi de gând

*(`spune` = ce aude lumea · `gândește` = gândul lui — ambele în Aspect.)*

**Încearcă tu — dialog (2–3 min)**  
- [ ] Ai `spune` + `gândește` + încă un `spune`  
- [ ] Replicile vin pe rând (timpii din bloc sau `așteaptă` între ele)  

### 2) Mărime: modifică vs setează
1. Tot pe personaj, după dialog:  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1` →  
   <span style="color:#9966FF;font-weight:700">modifică mărimea cu</span> `20` →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1` →  
   <span style="color:#9966FF;font-weight:700">modifică mărimea cu</span> `-20`
2. Personajul crește, apoi revine

| Bloc | Ce face |
|------|---------|
| <span style="color:#9966FF;font-weight:700">modifică mărimea cu</span> `20` | **adaugă** / scade față de acum (cumulativ) |
| <span style="color:#9966FF;font-weight:700">setează mărimea la</span> `100` | pune **exact** 100%, indiferent cât era înainte |

*De-asta la **reset** (steag) folosim **`setează`**, nu `modifică`: nu contează cât a crescut în interviu — mereu ajunge înapoi la 100.*

**Încearcă tu — mărime (2 min)**  
- [ ] Ai folosit `modifică` (+20 / −20) în timpul clipului  
- [ ] Știi unde e `setează mărimea la` `100` (îl pui la steag la pasul 4)  

### 3) Efect de culoare
1. Tot în Aspect:  
   <span style="color:#9966FF;font-weight:700">schimbă efectul culoare cu</span> `25` →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` →  
   încă de 1–2 ori `+25`
2. Nuanța se schimbă pe rând (ca un flash)

**Încearcă tu — culoare (1–2 min)**  
- [ ] ≥ **2** schimbări de efect culoare  
- [ ] Vezi flash-ul pe steag  

### 4) Reset curat la steag
1. **Chiar sub** steag, **înainte** de dialog:  
   <span style="color:#9966FF;font-weight:700">setează mărimea la</span> `100` →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>
2. Fără asta, la al doilea steag rămâne **uriaș** sau **colorat straniu**
3. (Opțional azi) `ascunde` / `arată` — tot în Aspect; nu e obligatoriu

**Încearcă tu — reset (1–2 min)**  
- [ ] Steag de două ori: mărime și culoare revin la normal  
- [ ] Salvat: `Prenume_Nume_L5`  

---

## Greșeli frecvente
1. **Vorbesc amândoi odată** — lipsește `așteaptă` între replici.  
2. **Rămâne uriaș / violet** — lipsește pe steag: `setează mărimea la 100` + `anulează efectele grafice`.  
3. **Ai pus `modifică cu -20` la steag „ca să resetezi”** — dacă ai crescut de 3 ori (+60), −20 nu ajunge la 100. Folosește **`setează … la 100`**.  
4. **Script pe personajul greșit** — verifică lista (reporter vs intervievat).  
5. **Nu se vede gândul** — ai folosit `spune` în loc de `gândește`.  
6. **Nume fișier** — `Prenume_Nume_L5`, nu doar `Ana_L5`.

---

## De făcut azi — „Interviul”
Salvat: `Prenume_Nume_L5`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | **Pasul 1 + Pasul 2** — 2 roluri + dialog (`spune` / `gândește` + `așteaptă`) |
| **Complet (ținta orei)** | Minim + **Pasul 3** — mărime, ≥2 culori, reset complet pe steag |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Cele două roluri
- [ ] **Reporter** + **intervievat**, așezați **lângă** unul pe altul  
- [ ] Pe amândoi, la steag: măcar pregătit locul pentru reset (la Complet: mărime 100 + efecte anulate)

### Pasul 2 — Dialogul *(parte din Minim)*
*(Ca la „Încearcă tu — dialog”, pe **ambele** personaje.)*

- [ ] ≥ **4** <span style="color:#9966FF;font-weight:700">spune</span> în total, **împărțite** pe cele 2 personaje (nu toate pe unul)  
- [ ] ≥ **1** <span style="color:#9966FF;font-weight:700">gândește</span>  
- [ ] Între replici: <span style="color:#FFAB19;font-weight:700">așteaptă</span> — pe rând  
- [ ] Salvat: `Prenume_Nume_L5`  

**→ Minim când:** un coleg înțelege că e un interviu (întrebare → răspuns).

### Pasul 3 — Mărime, culoare, reset *(Complet)*
*(Ca la „Încearcă tu — mărime / culoare / reset”.)*

- [ ] ≥ o schimbare de **mărime** în timpul interviului (`modifică`)  
- [ ] ≥ **2** schimbări de **efect culoare**  
- [ ] La steag, pe **amândoi**: `setează mărimea la 100` + `anulează efectele grafice`  
- [ ] Steag din nou → totul **curat**  
- [ ] Salvat din nou  

**Gata Complet când:** interviul se vede clar și reîncepe curat la fiecare steag.

---

## Bonus (dacă ai terminat Complet)
- [ ] O a treia replică + schimb de <span style="color:#9966FF;font-weight:700">costum</span> la final  
- [ ] Efect **fantomă** sau **vârtej** o dată, apoi `anulează efectele grafice`  
- [ ] Reporterul: `ascunde` la steag, apoi `arată` înainte să vorbească  
- [ ] **Pulsează** (al 2-lea script pe steag):  
  <span style="color:#FFAB19;font-weight:700">forever</span> → `modifică mărimea cu` `10` → `așteaptă` `0.3` → `modifică cu` `-10` → `așteaptă` `0.3`  
  *(Pe steag tot `setează mărimea la 100` — altfel crește la nesfârșit.)*  

## Recapitulare rapidă
1. Aspect = `spune`, `gândește`, mărime, culoare, costum  
2. În clip: `modifică` · la steag: **`setează` la 100** + anulează efectele  
3. Dialog = pe rând + `așteaptă`  
4. Nume: **`Prenume_Nume_L5`**  

**Quiz scurt (cu profesorul):**  
- Diferența `spune` / `gândește`?  
- De ce la reset folosim `setează mărimea la 100`, nu `modifică`?

## Temă
Opțional: dacă ai doar Minim, adaugi acasă mărime + culoare + reset — același `Prenume_Nume_L5`.
