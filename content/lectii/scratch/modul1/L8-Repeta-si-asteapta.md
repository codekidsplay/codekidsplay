# Lecția 8 — Dansul meu (repetă și așteaptă)
**Modulul 1 · Primii pași**  
**Code Kids Play · Scratch Starter**

> Azi faci același lucru de mai multe ori **fără** să copiezi blocurile iar și iar — cu ritm.  
> Proiect: **„Dansul meu”** · fișier: `Prenume_L8` (ex. `Ana_L8`)

---

## Obiectiv
La finalul orei poți folosi <span style="color:#FFAB19;font-weight:700">repetă</span> + <span style="color:#FFAB19;font-weight:700">așteaptă</span> (capitolul <span style="color:#FFAB19;font-weight:700">Control</span>) ca să animezi și să muți personajul pe un ritm clar.

## De ce contează
În desene animate și jocuri, aceleași mișcări se tot repetă: pași, dans, clipire.  
În Scratch, asta e o **buclă** scurtă (în engleză: *loop* / *repeat*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + unde e Control (`repetă`, `așteaptă`) |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Dansul meu” |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Repetă = „fă de N ori”
1. Selectezi **personajul**
2. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
3. Din <span style="color:#FFAB19;font-weight:700">Control</span>:  
   <span style="color:#FFAB19;font-weight:700">repetă</span> `4`  
   *(blocul e ca un „C” — **înăuntru** pui ce vrei repetat)*
4. Înăuntru, din <span style="color:#4C97FF;font-weight:700">Mișcare</span>:  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `40` pași →  
   <span style="color:#4C97FF;font-weight:700">întoarce-te la dreapta cu</span> `90` grade
5. Apeși <span style="color:#3F8F2A;font-weight:700">steagul verde</span> — un **pătrat** (4 laturi), fără 4 copii ale acelorași blocuri

### 2) Așteaptă = ritmul
1. Tot în <span style="color:#FFAB19;font-weight:700">Control</span>, **înăuntrul** lui `repetă`, după `mergi` (sau după `întoarce`):  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.3` secunde
2. Rulează din nou — vezi fiecare latură, nu un flash
3. Schimbă `0.3` → `0.1` (rapid) și `0.8` (lent): **numărul din așteaptă = ritmul**

### 3) Animație cu costum
1. Personajul are **cel puțin 2 costume** (tab Costume — ca la L2)
2. Script (sau în altă buclă):  
   <span style="color:#FFAB19;font-weight:700">repetă</span> `8` →  
   înăuntru: <span style="color:#9966FF;font-weight:700">următorul costum</span> →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.15`
3. Pare că „merge” / dansează pe loc
4. Fără `așteaptă`, costumele trec prea repede și nu se văd

### 4) Reset la steag + final
1. **Chiar sub** steag, înainte de bucle:  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> locul de start *(trage → citește x/y → scrie, ca la L7)* →  
   <span style="color:#4C97FF;font-weight:700">orientează-te în direcția</span> `90` →  
   <span style="color:#9966FF;font-weight:700">comută la costumul</span> `…` (primul)  
   *(opțional: <span style="color:#9966FF;font-weight:700">setează mărimea la</span> `100`)*
2. Apoi: o buclă de dans / mișcare
3. După buclă (în **afara** lui `repetă`, lipită sub el):  
   <span style="color:#9966FF;font-weight:700">spune</span> `Gata!` pentru `2` secunde

*(Azi folosim `repetă` cu **număr**. Există și `forever` — îl lăsăm pentru mai târziu; azi vrem să se **oprească** și să salute.)*

---

## Încearcă tu — verifică înainte să continui
*(Checkpoint pe **un** personaj.)*

- [ ] Ai un <span style="color:#FFAB19;font-weight:700">repetă</span> cu ceva **înăuntru** (nu în afară)  
- [ ] Ai <span style="color:#FFAB19;font-weight:700">așteaptă</span> în buclă (se vede ritmul)  
- [ ] Ai încercat o buclă de **costum** sau de **pătrat**  
- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span>: reset loc / costum / direcție

---

## Greșeli frecvente
1. **Nu se repetă** — blocurile sunt **sub** `repetă`, nu **în** el. Trage-le înăuntrul „C”-ului.  
2. **Prea rapid / nu se vede** — lipsește <span style="color:#FFAB19;font-weight:700">așteaptă</span> în buclă, sau e `0` / prea mic.  
3. **La steag e haos** — fără reset: costumul / locul / direcția rămân de la runda trecută.  
4. **„Gata!” apare de 8 ori** — ai pus `spune` **în** `repetă`; mută-l **sub** buclă (după ce se termină).

---

## De făcut azi — „Dansul meu”
Salvat: `Prenume_L8`

### Pasul 1 — Start curat
- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span>: loc de start + costum de start (+ direcție, dacă te învârți)  

### Pasul 2 — Bucla principală
- [ ] Cel puțin **1** <span style="color:#FFAB19;font-weight:700">repetă</span> cu număr (ex. 4–10)  
- [ ] Înăuntru: mișcare **și/sau** <span style="color:#9966FF;font-weight:700">următorul costum</span>  
- [ ] Înăuntru: <span style="color:#FFAB19;font-weight:700">așteaptă</span> (ritm vizibil)  

### Pasul 3 — Final
- [ ] După buclă: <span style="color:#9966FF;font-weight:700">spune</span> `Gata!` (sau mesaj scurt) — **o singură dată**  
- [ ] Opțional: un <span style="color:#CF63CF;font-weight:700">sunet</span> la final  
- [ ] La din nou steag, **reîncepe** curat  

**Gata când:** un coleg vede un dans / o plimbare cu ritm, apoi un final clar — fără să îi explici.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] **Două** bucle: una rapidă (`așteaptă` mic), una lentă  
- [ ] Pătrat (`repetă 4` + mergi + întoarce) **apoi** dans de costume  
- [ ] Schimbă numărul din `repetă` (5, apoi 15) — ce observi?  

## Recapitulare rapidă
1. <span style="color:#FFAB19;font-weight:700">repetă N</span> = fă ce e **înăuntru** de N ori  
2. <span style="color:#FFAB19;font-weight:700">așteaptă</span> = ritmul (altfel e prea rapid)  
3. Finalul (`spune`) stă **sub** buclă; la steag resetezi  

**Quiz scurt (cu profesorul):**  
- Unde trebuie să fie blocurile ca să se repete?  
- De ce punem `așteaptă` în animație?

## Temă
Opțional: schimbă numărul din `repetă` (ex. 5, apoi 15) și notează într-o propoziție ce s-a schimbat — același fișier `Prenume_L8`.
