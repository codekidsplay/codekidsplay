# Lecția 3 — Plimbarea mea (mișcare pe scenă)
**Modulul 1 · Primii pași**  
**Code Kids Play · Scratch Starter**

> Azi faci personajul să **meargă**, să **se întoarcă** și (la Complet) să **gliseze** pe scenă.  
> Proiect: **„Plimbarea mea”** · fișier: `Prenume_Nume_L3` (ex. `Ana_Pop_L3`)

---

## Obiectiv
La finalul orei muți personajul cu blocuri din <span style="color:#4C97FF;font-weight:700">Mișcare</span> pe un traseu clar, cu **reset la steag**.  
**Minimum:** `mergi` + `întoarce` + `așteaptă` (traseu vizibil).  
**Ținta orei (Complet):** + `glisează` + final `spune` / sunet (≥15 secunde).

## De ce contează
În jocuri, personajul nu stă pe loc: merge, se întoarce, alunecă spre o țintă.  
În Scratch, asta e capitolul <span style="color:#4C97FF;font-weight:700">Mișcare</span> (EN: *Motion*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–5 | Obiectiv + unde e capitolul Mișcare |
| 5–30 | Pas cu pas: **3** checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Plimbarea mea” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Mergi + întoarce + așteaptă (obligatoriu)
1. Selectezi **personajul** (nu Scena)
2. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
3. Din <span style="color:#4C97FF;font-weight:700">Mișcare</span>, chiar sub steag:  
   <span style="color:#4C97FF;font-weight:700">orientează-te în direcția</span> `90` *(spre dreapta)*
4. Apoi, pe rând:  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `50` pași →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` *(din <span style="color:#FFAB19;font-weight:700">Control</span> — **obligatoriu**, nu opțional)* →  
   <span style="color:#4C97FF;font-weight:700">întoarce-te la dreapta cu</span> `90` grade →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` →  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `50` pași →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` →  
   <span style="color:#4C97FF;font-weight:700">întoarce-te la dreapta cu</span> `90` grade →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` →  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `50` pași
5. Apeși steagul — traseu în **U**, pe care îl **vezi** (nu un flash)

Fără `așteaptă`, cele 3 `mergi` durează sub o secundă — nu poți urmări traseul.

**Încearcă tu — traseu U (3–4 min)**  
- [ ] Script pe **personaj**  
- [ ] ≥ **3** `mergi` + ≥ **2** `întoarce`  
- [ ] `așteaptă` `0.5` **între** mișcări  
- [ ] Se vede clar forma traseului  

### 2) Glisează (mișcare lină)
1. Tot pe personaj, **după** traseul U (sau sub el):  
   <span style="color:#4C97FF;font-weight:700">glisează</span> în `1` secundă la `x:` `100` `y:` `0`
2. Personajul **alunecă** spre punct — nu sare brusc
3. Compară: `mergi` = pași rapizi · `glisează` = timp + loc

*(Numerele `x` / `y` = unde pe scenă. Azi le schimbi din bloc; la L7 le înveți pe îndelete.)*

**Încearcă tu — glisează (2 min)**  
- [ ] Ai cel puțin **1** `glisează` de ~1 secundă  
- [ ] Vezi diferența față de `mergi`  

### 3) Reset: du-te la start
1. **Chiar sub** steag, **înainte** de traseu:  
   <span style="color:#4C97FF;font-weight:700">du-te la x:</span> `-150` <span style="color:#4C97FF;font-weight:700">y:</span> `0`  
   *(sau tragi personajul în colțul stâng și citești x/y din panoul de jos)*
2. Apoi: orientare `90` → traseu (`mergi` / `întoarce` / `așteaptă` / `glisează`)
3. Fără reset, la al doilea steag pleacă de unde a rămas — și iese din scenă

**Încearcă tu — reset (1–2 min)**  
- [ ] Steag de **două** ori: începe din **același** loc  
- [ ] Salvat: `Prenume_Nume_L3`  

### 4) Final clar
1. La capătul traseului:  
   <span style="color:#9966FF;font-weight:700">spune</span> `Am ajuns!` pentru `2` secunde
2. Opțional: un <span style="color:#CF63CF;font-weight:700">sunet</span> scurt

---

## Greșeli frecvente
1. **Nu se mișcă** — blocurile sunt pe **Scenă**; Scena nu „merge”. Selectează personajul.  
2. **Dispare de pe scenă** — prea mulți pași fără `du-te la` la steag.  
3. **Se învârte haotic** — lipsește `orientează-te în direcția` `90` la start.  
4. **Capul în jos** — stil rotație „toate direcțiile”; în Mișcare, schimbă pe **stânga-dreapta**.  
5. **Traseul e un flash (&lt;15 sec)** — ai uitat `așteaptă` între `mergi` / `întoarce`.  
6. **Nume fișier** — `Prenume_Nume_L3`, nu doar `Ana_L3`.

---

## De făcut azi — „Plimbarea mea”
Salvat: `Prenume_Nume_L3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | **Pasul 1 + Pasul 2** — start cu `du-te la` + traseu cu `mergi` + `întoarce` + `așteaptă` |
| **Complet (ținta orei)** | Minim + **Pasul 3** — `glisează` + final `spune` (≥15 secunde vizibile) |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Startul
- [ ] Personaj pe scenă  
- [ ] La steag: <span style="color:#4C97FF;font-weight:700">du-te la</span> un loc de start clar + `orientează-te` `90`  

### Pasul 2 — Traseu simplu *(parte din Minim)*
*(Ca la „Încearcă tu — traseu U”.)*

- [ ] ≥ **3** <span style="color:#4C97FF;font-weight:700">mergi</span>  
- [ ] ≥ **2** <span style="color:#4C97FF;font-weight:700">întoarce</span>  
- [ ] <span style="color:#FFAB19;font-weight:700">așteaptă</span> **între** mișcări (obligatoriu)  
- [ ] Salvat: `Prenume_Nume_L3`  

**→ Minim când:** un coleg vede un traseu cu întoarceri, nu un flash.

### Pasul 3 — Glisează + final *(Complet)*
*(Ca la „Încearcă tu — glisează” + final.)*

- [ ] ≥ **1** <span style="color:#4C97FF;font-weight:700">glisează</span> (~1 secundă)  
- [ ] La capăt: <span style="color:#9966FF;font-weight:700">spune</span> `Am ajuns!` (sau mesaj scurt)  
- [ ] Tot traseul se vede ≥ **15 secunde** (cu `așteaptă` + `glisează` + `spune`)  
- [ ] Steag din nou → **reîncepe** din același loc  
- [ ] Salvat din nou  

**Gata Complet când:** un coleg urmărește de unde a plecat și unde a ajuns, fără explicație.

---

## Bonus (dacă ai terminat Complet)
- [ ] Un **tur** pe scenă: stânga → sus → dreapta → jos (înapoi la start)  
- [ ] Al 2-lea personaj cu **același** traseu:  
  tragi scriptul (stiva de blocuri) **peste iconița** celuilalt personaj, în lista de jos din dreapta — Scratch îl **copiază**.  
  *(Nu rescrii tot de mână.)*  
- [ ] La click pe personaj (`când se face clic pe acest personaj` — tot **Evenimente**, ca steagul): un salt mic (`mergi` înainte / înapoi) și revine  

## Recapitulare rapidă
1. `mergi` = pași · `întoarce` = direcție · `glisează` = alunecă în timp  
2. `așteaptă` = vezi traseul (fără el = flash)  
3. Blocurile pe **personaj**; la steag: `du-te la`  
4. Nume: **`Prenume_Nume_L3`**  

**Quiz scurt (cu profesorul):**  
- Unde lipești blocurile de mișcare?  
- De ce `du-te la` la început?  
- De ce e obligatoriu `așteaptă`?

## Temă
Opțional: dacă ai doar Minim, adaugi acasă `glisează` + `Am ajuns!` — același `Prenume_Nume_L3`.
