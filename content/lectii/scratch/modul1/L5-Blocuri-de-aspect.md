# Lecția 5 — Interviul (blocuri de aspect)
**Modulul 1 · Primii pași**  
**Code Kids Play · Scratch Starter**

> Azi controlezi **cum arată** și **ce transmite** personajul: spune, gândește, mărime, culoare.  
> Proiect: **„Interviul”** · fișier: `Prenume_L5` (ex. `Ana_L5`)

---

## Obiectiv
La finalul orei poți folosi blocurile din <span style="color:#9966FF;font-weight:700">Aspect</span> ca personajele să vorbească, să gândească, să se mărească și să-și schimbe culoarea — și să pornească **curat** la steag.

## De ce contează
În jocuri și povești, personajul nu doar merge: vorbește, se sperie (se mărește), se „înroșește”, are un gând.  
În Scratch, asta e capitolul <span style="color:#9966FF;font-weight:700">Aspect</span> (în engleză: *Looks*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + unde e Aspect |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Interviul” |
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
4. Apeși <span style="color:#3F8F2A;font-weight:700">steagul verde</span> — vezi bulă de vorbă, apoi de gând

*(`spune` = ce aude lumea; `gândește` = gândul lui — tot în <span style="color:#9966FF;font-weight:700">Aspect</span>, unul sub altul.)*

### 2) Mărime
1. Tot pe personaj, în același script (sau după un <span style="color:#FFAB19;font-weight:700">așteaptă</span> din <span style="color:#FFAB19;font-weight:700">Control</span>):  
   <span style="color:#9966FF;font-weight:700">modifică mărimea cu</span> `20` →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1` secundă →  
   <span style="color:#9966FF;font-weight:700">modifică mărimea cu</span> `-20`
2. Personajul crește, apoi revine
3. Alternativă: <span style="color:#9966FF;font-weight:700">setează mărimea la</span> `100` % — fixează exact cât de mare e

### 3) Efect de culoare
1. Tot în <span style="color:#9966FF;font-weight:700">Aspect</span>, lângă `spune`:  
   <span style="color:#9966FF;font-weight:700">schimbă efectul culoare cu</span> `25` →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` →  
   <span style="color:#9966FF;font-weight:700">schimbă efectul culoare cu</span> `25` →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` →  
   <span style="color:#9966FF;font-weight:700">schimbă efectul culoare cu</span> `25`
2. Nuanța se schimbă pe rând (ca un „flash” de culoare)

### 4) Reset curat la steag
1. **Chiar sub** <span style="color:#3F8F2A;font-weight:700">steagul verde</span>, înainte de dialog, pune:  
   <span style="color:#9966FF;font-weight:700">setează mărimea la</span> `100` →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>
2. Fără asta, la al doilea steag personajul rămâne **uriaș** sau **colorat straniu**
3. (Opțional) <span style="color:#9966FF;font-weight:700">ascunde</span> / <span style="color:#9966FF;font-weight:700">arată</span> — tot în Aspect; azi nu e obligatoriu

---

## Încearcă tu — verifică înainte să continui
*(Checkpoint pe **un** personaj. Abia la proiect adaugi al doilea — reporterul.)*

- [ ] Ai <span style="color:#9966FF;font-weight:700">spune</span> + <span style="color:#9966FF;font-weight:700">gândește</span>  
- [ ] Ai schimbat **mărimea** (sus și înapoi)  
- [ ] Ai schimbat **culoarea** de cel puțin 2 ori  
- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span>: mărime 100 + <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>

---

## Greșeli frecvente
1. **Vorbesc amândoi odată** — lipsește <span style="color:#FFAB19;font-weight:700">așteaptă</span> (în <span style="color:#FFAB19;font-weight:700">Control</span>) între replici; sau ai pus toate `spune` pe același personaj fără timp.  
2. **Rămâne uriaș / violet** — ai uitat resetul la steag: <span style="color:#9966FF;font-weight:700">setează mărimea la</span> `100` + <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>.  
3. **Scriptul pe personajul greșit** — ai lipit pe reporter, dar te uiți la intervievat (sau invers). Click pe personajul bun în listă.  
4. **Nu se vede gândul** — ai folosit `spune` în loc de `gândește`; sunt două blocuri diferite, tot în Aspect.

---

## De făcut azi — „Interviul”
Salvat: `Prenume_L5`

### Pasul 1 — Cele două roluri
- [ ] **Reporter** + **intervievat** (2 personaje), așezați **lângă** unul pe altul (nu unul peste altul)  
- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span>: amândoi la mărime 100 + efecte anulate  

### Pasul 2 — Dialogul
- [ ] Cel puțin **4** replici cu <span style="color:#9966FF;font-weight:700">spune</span> (împreună pe ambele personaje)  
- [ ] Cel puțin **1** <span style="color:#9966FF;font-weight:700">gândește</span> (pe oricare)  
- [ ] Între replici: <span style="color:#FFAB19;font-weight:700">așteaptă</span> — pe rând, nu dintr-o dată  

### Pasul 3 — Aspect vizibil
- [ ] Cel puțin o schimbare de **mărime** în timpul interviului  
- [ ] Cel puțin **2** schimbări de **efect culoare**  
- [ ] La din nou steag, totul reîncepe **curat**  

**Gata când:** un coleg înțelege că e un interviu (întrebare → răspuns), fără să îi explici cu vocea.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] O a treia replică + un schimb de <span style="color:#9966FF;font-weight:700">costum</span> la final  
- [ ] Efect **fantomă** sau **vârtej** o dată, apoi <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>  
- [ ] Reporterul apare cu <span style="color:#9966FF;font-weight:700">arată</span> doar după steag (înainte e <span style="color:#9966FF;font-weight:700">ascunde</span>)  

## Recapitulare rapidă
1. <span style="color:#9966FF;font-weight:700">Aspect</span> = spune, gândește, mărime, culoare, costum  
2. La steag: **resetezi** mărimea și efectele  
3. Dialog = `spune` pe rând + <span style="color:#FFAB19;font-weight:700">așteaptă</span>  

**Quiz scurt (cu profesorul):**  
- Care e diferența dintre `spune` și `gândește`?  
- De ce anulezi efectele la steag?

## Temă
Opțional: încă o întrebare + un răspuns în același fișier `Prenume_L5`.
