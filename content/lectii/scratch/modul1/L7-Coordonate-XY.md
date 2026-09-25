# Lecția 7 — Comoara (coordonate X și Y)
**Modulul 1 · Primii pași**  
**Code Kids Play · Scratch Starter**

> Azi scena e o **hartă**: înveți unde e personajul cu **X** și **Y**, apoi îl duci la comoară.  
> Proiect: **„Comoara”** · fișier: `Prenume_L7` (ex. `Ana_L7`)

---

## Obiectiv
La finalul orei poți citi **x** și **y** pe scenă și poți duce personajul într-un loc anume cu <span style="color:#4C97FF;font-weight:700">du-te la</span> sau <span style="color:#4C97FF;font-weight:700">glisează</span>.

## De ce contează
Ca pe o hartă sau în jocuri: știi unde e eroul (stânga/dreapta, sus/jos) ca să ajungă la țintă.  
În Scratch, poziția = **coordonate** (în engleză: *x position* / *y position*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + harta scenei (X / Y / mijloc) |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Comoara” |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Harta scenei
1. Selectezi **personajul** și îl **tragi** pe scenă cu mouse-ul
2. Sus, pe personaj (sau în blocurile de <span style="color:#4C97FF;font-weight:700">Mișcare</span>), vezi numerele **x** și **y** schimbându-se
3. Ține minte:
   - **X** = stânga (−) sau dreapta (+)
   - **Y** = jos (−) sau sus (+)
   - **Mijlocul** ≈ **x: 0 , y: 0** — imaginează o cruce pe scenă (o linie pe orizontală + una pe verticală); unde se întâlnesc e mijlocul
4. Exercițiu rapid: du personajul în **mijloc**, apoi într-un **colț** — spune cu vocea ce x/y vezi

### 2) Cum alegi numerele (metoda de azi)
1. Tragi personajul **unde vrei comoara** (sau startul)
2. **Citești** x și y pe ecran
3. **Scrii** aceleași numere în bloc (`du-te la` / `glisează`)
4. Nu ghici — tot proiectul „Comoara” merge pe metoda asta

### 3) Du-te la un punct
1. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
2. Din <span style="color:#4C97FF;font-weight:700">Mișcare</span> (tot acolo unde e `mergi`):  
   <span style="color:#4C97FF;font-weight:700">du-te la x:</span> `0` <span style="color:#4C97FF;font-weight:700">y:</span> `0`
3. Apeși <span style="color:#3F8F2A;font-weight:700">steagul verde</span> — personajul **sare** în mijloc
4. Schimbă numerele (cu metoda din pasul 2), ex. `x: 150` `y: -100` — rulează din nou

*(`du-te la` = teleport: ajunge **imediat**, fără să vezi drumul. Observă: personajul **nu se întoarce cu fața** — doar sare; direcția rămâne ca la L3, pe care o schimbi doar cu `întoarce` / `orientează-te`.)*

### 4) Glisează la un punct
1. Tot pe personaj, sub steag (după un reset la mijloc):  
   <span style="color:#4C97FF;font-weight:700">glisează</span> în `1` secundă la `x:` `150` `y:` `100`
2. Personajul **alunecă** spre punct — vezi drumul (tot **fără** să se rotească singur)
3. Compară: `du-te la` = salt; `glisează` = mișcare lină spre aceleași tipuri de x/y

### 5) Reset + traseu cu 2–3 puncte
1. Cu metoda din pasul 2, alegi startul și comoara (citești x/y)
2. Chiar sub steag:  
   <span style="color:#4C97FF;font-weight:700">du-te la x:</span> `…` <span style="color:#4C97FF;font-weight:700">y:</span> `…` *(loc de start / „acasă”)*
3. Apoi pe rând:  
   <span style="color:#4C97FF;font-weight:700">glisează</span> … la un punct →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` *(în <span style="color:#FFAB19;font-weight:700">Control</span>)* →  
   <span style="color:#4C97FF;font-weight:700">glisează</span> … la comoară →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Am găsit-o!` pentru `2` secunde
4. Fără reset la steag, la a doua rulare pleacă de unde a rămas

*(În <span style="color:#4C97FF;font-weight:700">Mișcare</span> mai există și <span style="color:#4C97FF;font-weight:700">du-te la indicatorul mouse-ului</span> — personajul sare unde e mouse-ul. Nu e obligatoriu azi; e la Bonus.)*

---

## Încearcă tu — verifică înainte să continui
*(Checkpoint pe **un** personaj.)*

- [ ] Știi pe scurt: X = stânga/dreapta, Y = jos/sus, mijloc ≈ (0, 0)  
- [ ] Ai folosit metoda: trage → citește x/y → scrie în bloc  
- [ ] Ai un <span style="color:#4C97FF;font-weight:700">du-te la</span> + o <span style="color:#4C97FF;font-weight:700">glisează</span>  
- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span> începi mereu din același loc

---

## Greșeli frecvente
1. **A ajuns „în altă parte”** — ai confuzat X cu Y (sau semnul +/−). Mută cu mouse-ul, citește din nou numerele, corectează blocul.  
2. **A dispărut de pe scenă** — x/y prea mari (ex. 500). Rămâi cam între **−240…240** pe X și **−180…180** pe Y.  
3. **La steag nu reîncepe** — lipsește <span style="color:#4C97FF;font-weight:700">du-te la</span> la începutul scriptului.  
4. **„Nu știu ce numere să pun”** — revino la pasul 2: trage → citește → scrie (nu ghici).

---

## De făcut azi — „Comoara”
Salvat: `Prenume_L7`

### Pasul 1 — Harta ta
- [ ] Ai un loc de **start** cu x/y citite de pe scenă (la steag: `du-te la`)  
- [ ] Ai un loc de **comoară** (alt x/y) — îl știi / l-ai notat  

### Pasul 2 — Drumul
- [ ] Cel puțin **2** opriri pe traseu cu <span style="color:#4C97FF;font-weight:700">glisează</span> sau <span style="color:#4C97FF;font-weight:700">du-te la</span> (cu x/y vizibile în blocuri)  
- [ ] Între opriri: <span style="color:#FFAB19;font-weight:700">așteaptă</span> dacă e prea rapid  

### Pasul 3 — Comoara
- [ ] La capăt: <span style="color:#9966FF;font-weight:700">spune</span> `Am găsit-o!` (sau mesaj similar)  
- [ ] Opțional: un <span style="color:#CF63CF;font-weight:700">sunet</span> când „găsește”  
- [ ] La din nou steag, **reîncepe** de la start  

**Gata când:** un coleg urmărește drumul până la comoară fără să îi spui numerele cu vocea.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] Vizitează **4 colțuri** pe rând (x/y clare pe fiecare)  
- [ ] La click pe personaj: <span style="color:#4C97FF;font-weight:700">du-te la indicatorul mouse-ului</span> *(amintit la Pas cu pas — tot în Mișcare)*  
- [ ] Al 2-lea personaj = comoara (stă pe x/y fix); eroul ajunge lângă el  

## Recapitulare rapidă
1. **X** stânga/dreapta, **Y** jos/sus; mijloc = crucea imaginată pe scenă ≈ (0, 0)  
2. `du-te la` = salt (fără rotire); `glisează` = alunecă; direcția feței e separat (L3)  
3. Metoda: trage → citește x/y → scrie în bloc; la steag resetezi poziția

**Quiz scurt (cu profesorul):**  
- Ce înseamnă x negativ?  
- De ce `du-te la` la începutul scriptului?

## Temă
Opțional: pe o foaie (sau în proiect) notează **3 perechi** (x, y) din traseul tău — același fișier `Prenume_L7`.
