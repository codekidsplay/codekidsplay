# Lecția 3 — Detectare: atingere
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi Scratch **simte** dacă atingi o culoare, un personaj sau marginea.  
> Proiect: **„Nu călca pe lavă”** · fișier: `Prenume_L3` (ex. `Ana_L3`)

---

## Obiectiv
La finalul orei poți folosi hexagoanele din <span style="color:#5CB1D6;font-weight:700">Detectare</span> în <span style="color:#FFAB19;font-weight:700">dacă … atunci</span>: **culoare**, **personaj**, **margine** — și un mic joc cu lavă.

## De ce contează
În jocuri: lava, monede, pereți. Personajul trebuie să „știe” ce a atins.  
Asta e categoria <span style="color:#5CB1D6;font-weight:700">Detectare</span> (în engleză: *Sensing*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap `dacă` + unde e Detectare |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Nu călca pe lavă” |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Cele 3 hexagoane utile
Din <span style="color:#5CB1D6;font-weight:700">Detectare</span> (le pui **în** `dacă`):

| Hexagon | Ce face |
|---------|---------|
| <span style="color:#5CB1D6;font-weight:700">atinge marginea?</span> | da, dacă e lipit de cadrul scenei |
| <span style="color:#5CB1D6;font-weight:700">atinge</span> `Personaj2` <span style="color:#5CB1D6;font-weight:700">?</span> | da, dacă se ating două personaje |
| <span style="color:#5CB1D6;font-weight:700">atinge culoarea</span> `…` <span style="color:#5CB1D6;font-weight:700">?</span> | da, dacă atinge pixelii acelei culori pe scenă |

*Sfat:* culoarea de lavă = **clară** (roșu / portocaliu), nu amestecată cu fundalul.

### 2) Cum alegi culoarea
1. În hexagonul `atinge culoarea`, apeși pătrățelul de culoare  
2. Cu pipeta, **click pe lava** de pe scenă (nu pe o culoare oarecare din paletă, dacă nu e aceeași)  
3. Testezi: miști personajul pe lavă — `dacă` trebuie să se aprindă

### 3) Pattern de joc (forever + dacă)
1. Steag → reset la start (`du-te la` punct sigur)  
2. <span style="color:#FFAB19;font-weight:700">forever</span>  
3. Înăuntru: control cu taste (ca L1) **sau** doar săgeți  
4. Tot în forever:  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge culoarea</span> (lavă)  
   **atunci:** <span style="color:#4C97FF;font-weight:700">du-te la</span> start →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Ai călcat!` pentru `1` secundă →  
   <span style="color:#CF63CF;font-weight:700">pornește sunetul</span> `…`  
   *(opțional: <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` ca să nu spam-uiască)*

### 4) Bonus pe scenă: monedă (personaj)
1. Al 2-lea personaj = monedă / stea  
2. Pe **erou**, în forever:  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge</span> `moneda`  
   **atunci:** <span style="color:#9966FF;font-weight:700">spune</span> `Yaay!` → pe **monedă**: o poți <span style="color:#9966FF;font-weight:700">ascunde</span> (script pe monedă sau mesaj — mesajele le aprofundăm la L8; azi e ok `ascunde` pe monedă cu `când e clic pe mine` de test, sau eroul „mănâncă” doar mesajul)

*Simplu azi:* la atingere, eroul spune `Yaay!` — moneda poate rămâne; la L5 legăm de scor.

---

## Încearcă tu — verifică înainte să continui

- [ ] Ai testat **marginea** într-un `dacă`  
- [ ] Ai testat **culoarea** cu pipeta pe scenă  
- [ ] Ai un `forever` care verifică mereu  
- [ ] La steag: te întorci la un punct **sigur** (nu pe lavă)

---

## Greșeli frecvente
1. **Nu detectează lava** — culoarea din hexagon ≠ pixelii de pe scenă; re-pipetează.  
2. **Detectează tot fundalul** — lava e prea mare / aceeași culoare ca iarba; desenează o bandă clară.  
3. **Spam „Ai călcat!”** — lipsește `așteaptă` după mesaj, sau te teleportezi tot pe lavă (start greșit).  
4. **Script pe personajul greșit** — `dacă atinge` e pe **erou**, nu pe lavă (lava e culoare pe scenă).

---

## De făcut azi — „Nu călca pe lavă”
Salvat: `Prenume_L3`

### Pasul 1 — Scena
- [ ] Fundal cu **zonă lavă** (culoare clară)  
- [ ] Punct de **start** pe zonă sigură  
- [ ] Erou controlat cu **taste** (săgeți) în `forever`  

### Pasul 2 — Detectare
- [ ] Dacă atinge **lava** → înapoi la start + mesaj + sunet  
- [ ] Dacă atinge **marginea** → întoarce **sau** mesaj (la alegere)  
- [ ] Opțional: un personaj „stea” → `Yaay!` la atingere  

### Pasul 3 — Gata
- [ ] Poți traversa zona sigură fără reset  
- [ ] Călcat pe lavă = clar pentru un coleg  

**Gata când:** joci 20 sec — lava „pedepsește”, startul e sigur.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] Zonă **bonus** (altă culoare): dacă o atingi → `Ok!` + sunet plăcut  
- [ ] Lavă + stea în **același** forever (două `dacă`)  
- [ ] După lavă: <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1` („imunitate” scurtă)  

## Recapitulare rapidă
1. <span style="color:#5CB1D6;font-weight:700">Detectare</span> = hexagoane da/nu pentru `dacă`  
2. Culoarea: **pipetă pe scenă**  
3. Startul nu e pe lavă  

**Quiz scurt (cu profesorul):**  
- Care e diferența între `atinge culoarea` și `atinge personajul`?  
- De ce re-pipetăm culoarea?

## Temă
Opțional: zonă sigură (altă culoare) → `spune` `Ok!` — `Prenume_L3`.
