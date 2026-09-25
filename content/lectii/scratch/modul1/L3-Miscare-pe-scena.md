# Lecția 3 — Plimbarea mea (mișcare pe scenă)
**Modulul 1 · Primii pași**  
**Code Kids Play · Scratch Starter**

> Azi faci personajul să **meargă**, să **se întoarcă** și să **gliseze** pe scenă.  
> Proiect: **„Plimbarea mea”** · fișier: `Prenume_L3` (ex. `Ana_L3`)

---

## Obiectiv
La finalul orei poți să muți personajul pe scenă cu blocuri din <span style="color:#4C97FF;font-weight:700">Mișcare</span> — pe un traseu pe care îl vezi și îl înțelegi.

## De ce contează
În jocuri, personajul nu stă pe loc: merge, se întoarce, alunecă spre o țintă.  
În Scratch, asta e capitolul <span style="color:#4C97FF;font-weight:700">Mișcare</span> (în engleză: *Motion*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + unde e capitolul Mișcare |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Plimbarea mea” |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Mergi și întoarce
1. Selectezi **personajul** (nu Scena)
2. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
3. Din <span style="color:#4C97FF;font-weight:700">Mișcare</span>, opțional chiar sub steag:  
   <span style="color:#4C97FF;font-weight:700">orientează-te în direcția</span> `90` *(spre dreapta — e lângă `întoarce-te` în același capitol)*
4. Apoi lipești pe rând:  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `50` pași →  
   <span style="color:#4C97FF;font-weight:700">întoarce-te la dreapta cu</span> `90` grade →  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `50` pași →  
   <span style="color:#4C97FF;font-weight:700">întoarce-te la dreapta cu</span> `90` grade →  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `50` pași
5. Ca să vezi clar fiecare pas, între mișcări poți pune <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` secunde — îl găsești în <span style="color:#FFAB19;font-weight:700">Control</span>
6. Apeși <span style="color:#3F8F2A;font-weight:700">steagul verde</span> — vezi un traseu în U (2 întoarceri)

### 2) Glisează (mișcare lină)
1. Tot pe **personaj**, sub scriptul de mai sus (sau într-un script nou cu steag):  
   <span style="color:#4C97FF;font-weight:700">glisează</span> în `1` secundă la `x:` `100` `y:` `0`
2. Personajul **alunecă** spre punct — nu sare brusc
3. Compară cu <span style="color:#4C97FF;font-weight:700">mergi</span>: mergi = pași rapizi; glisează = timp + loc

*(Numerele `x` / `y` = unde pe scenă. Azi le schimbi din bloc; la L7 le înveți pe îndelete.)*

### 3) La start, te întorci la locul bun
1. La începutul scriptului (chiar sub steag), pune:  
   <span style="color:#4C97FF;font-weight:700">du-te la x:</span> `-150` <span style="color:#4C97FF;font-weight:700">y:</span> `0`  
   *(sau tragi personajul în colțul stâng și citești x/y din bloc)*
2. Apoi vine traseul (mergi / întoarce / glisează)
3. Fără acest reset, la al doilea steag personajul **pleacă de unde a rămas** — și iese din scenă

### 4) Final clar
1. La capătul traseului:  
   <span style="color:#9966FF;font-weight:700">spune</span> `Am ajuns!` pentru `2` secunde
2. Opțional: un <span style="color:#CF63CF;font-weight:700">sunet</span> scurt când ajunge

---

## Încearcă tu
- [ ] Ai un script pe **personaj** (nu pe Scenă)  
- [ ] Folosești cel puțin **2** <span style="color:#4C97FF;font-weight:700">întoarce</span> + câteva <span style="color:#4C97FF;font-weight:700">mergi</span>  
- [ ] Ai o <span style="color:#4C97FF;font-weight:700">glisează</span> de ~1 secundă  
- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span>, începe mereu din același loc (`du-te la`)

---

## Greșeli frecvente
1. **Nu se mișcă** — ai lipit blocurile pe **Scenă**; Scena nu „merge”. Selectează personajul, apoi lipește din nou.  
2. **Dispare de pe scenă** — prea mulți pași fără reset; la steag pune întâi <span style="color:#4C97FF;font-weight:700">du-te la</span> un loc vizibil.  
3. **Se învârte haotic** — la start pune <span style="color:#4C97FF;font-weight:700">orientează-te în direcția</span> `90` (tot în <span style="color:#4C97FF;font-weight:700">Mișcare</span>, lângă `întoarce-te`).  
4. **Personajul stă cu capul în jos** — stilul de rotație e pe „toate direcțiile”. În <span style="color:#4C97FF;font-weight:700">Mișcare</span>, sub listă, schimbă stilul pe **stânga-dreapta** (doar se oglindește, nu se răstoarnă).

---

## De făcut azi — „Plimbarea mea”
Salvat: `Prenume_L3`

### Pasul 1 — Startul
- [ ] Personaj ales (sau păstrat) pe scenă  
- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span>: <span style="color:#4C97FF;font-weight:700">du-te la</span> un colț / loc de start clar  

### Pasul 2 — Traseul
- [ ] Cel puțin **3** mișcări cu <span style="color:#4C97FF;font-weight:700">mergi</span>  
- [ ] Cel puțin **2** <span style="color:#4C97FF;font-weight:700">întoarce</span> (schimbi direcția)  
- [ ] Cel puțin **1** <span style="color:#4C97FF;font-weight:700">glisează</span> (mișcare lină)  

### Pasul 3 — Finalul
- [ ] La capăt: <span style="color:#9966FF;font-weight:700">spune</span> `Am ajuns!` (sau alt mesaj scurt)  
- [ ] Traseul se vede clar ≥ **15 secunde** — dacă e prea rapid, pune <span style="color:#FFAB19;font-weight:700">așteaptă</span> între pași (capitolul <span style="color:#FFAB19;font-weight:700">Control</span>)  
- [ ] La din nou steag, **reîncepe** din același loc  

**Gata când:** un coleg urmărește traseul fără să îi explici unde a plecat și unde a ajuns.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] Un **tur** pe scenă: stânga → sus → dreapta → jos (înapoi la start)  
- [ ] Al 2-lea personaj care face același traseu (copie scriptul)  
- [ ] La click pe personaj: un salt mic (mergi înainte / înapoi) și revine  

## Recapitulare rapidă
1. <span style="color:#4C97FF;font-weight:700">mergi</span> = pași; <span style="color:#4C97FF;font-weight:700">întoarce</span> = schimbă direcția; <span style="color:#4C97FF;font-weight:700">glisează</span> = alunecă în timp  
2. Blocurile de mișcare stau pe **personaj**, nu pe Scenă  
3. La <span style="color:#3F8F2A;font-weight:700">steag verde</span> resetezi locul cu <span style="color:#4C97FF;font-weight:700">du-te la</span>  

**Quiz scurt (cu profesorul):**  
- Unde lipești blocurile de mișcare?  
- De ce „du-te la” la începutul scriptului?

## Temă
Opțional: încă 2 mișcări pe același traseu — același fișier `Prenume_L3`. Nu prea repede: vrem să se vadă ce face.
