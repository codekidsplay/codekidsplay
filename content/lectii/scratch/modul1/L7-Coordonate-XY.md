# Lecția 7 — Comoara (coordonate X și Y)
**Modulul 1 · Primii pași**  
**Code Kids Play · Scratch Starter**

> Azi scena e o **hartă**: înveți unde e personajul cu **X** și **Y**, apoi îl duci la comoară.  
> Proiect: **„Comoara”** · fișier: `Prenume_Nume_L7` (ex. `Ana_Pop_L7`)

---

## Obiectiv
La finalul orei citești **x** și **y** pe scenă și duci personajul într-un loc anume cu <span style="color:#4C97FF;font-weight:700">du-te la</span> / <span style="color:#4C97FF;font-weight:700">glisează</span>.  
**Minimum:** start + traseu cu ≥2 opriri (numere în blocuri) + `spune` la capăt.  
**Ținta orei (Complet):** + **comoară vizibilă** (al 2-lea personaj pe x/y) + sunet + reset curat.

## De ce contează
Ca pe o hartă sau în jocuri: știi unde e eroul (stânga/dreapta, sus/jos) ca să ajungă la țintă.  
În Scratch, poziția = **coordonate** (EN: *x position* / *y position*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–5 | Obiectiv + harta scenei (X / Y / mijloc) |
| 5–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Comoara” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Citești coordonatele (fără blocuri încă)
1. Selectezi **personajul** și îl **tragi** pe scenă cu mouse-ul
2. Sus / în panou vezi numerele **x** și **y** schimbându-se
3. Ține minte:
   - **X** = stânga (−) sau dreapta (+)
   - **Y** = jos (−) sau sus (+)
   - **Mijlocul** ≈ **x: 0 , y: 0** (cruce imaginată pe scenă)
4. Du personajul în **mijloc**, apoi într-un **colț** — spune cu vocea ce x/y vezi

**Încearcă tu — citire (2–3 min)**  
- [ ] Spui corect: X = stânga/dreapta, Y = jos/sus  
- [ ] Ai pus personajul la ~`(0, 0)` și ai citit numerele  
- [ ] Ai pus personajul într-un colț și ai citit x/y  

### 2) Metoda: trage → citește → scrie
1. Tragi personajul **unde vrei un punct** (start sau comoară)
2. **Citești** x și y
3. **Scrii** aceleași numere în bloc (`du-te la` / `glisează`)
4. Nu ghici — tot proiectul merge pe metoda asta

**Încearcă tu — metodă (1 min)**  
- [ ] Ai notat pe foaie (sau în cap) **o** pereche (x, y) citită de pe scenă  

### 3) Du-te la un punct
1. Steag verde → din <span style="color:#4C97FF;font-weight:700">Mișcare</span>:  
   <span style="color:#4C97FF;font-weight:700">du-te la x:</span> `0` <span style="color:#4C97FF;font-weight:700">y:</span> `0`
2. Apeși steagul — personajul **sare** în mijloc
3. Schimbă numerele cu metoda de mai sus — rulează din nou

*(`du-te la` = teleport: imediat, **fără** să se rotească singur.)*

**Încearcă tu — du-te la (2 min)**  
- [ ] Steag → sare la punctul din bloc  
- [ ] Ai schimbat o dată x/y și ai verificat  

### 4) Glisează la un punct
1. Sub steag (după un reset):  
   <span style="color:#4C97FF;font-weight:700">glisează</span> în `1` secundă la `x:` `150` `y:` `100`
2. Personajul **alunecă** — vezi drumul
3. Compară: `du-te la` = salt · `glisează` = mișcare lină

**Încearcă tu — glisează (2 min)**  
- [ ] Ai o `glisează` cu x/y citite de pe scenă  
- [ ] Vezi diferența față de `du-te la`  

### 5) Reset + traseu (2–3 puncte)
1. Chiar sub steag: `du-te la` **start** (x/y citite)
2. Apoi: `glisează` la un punct pe drum → `așteaptă` `0.5` → `glisează` la **comoară** →  
   `spune` `Am găsit-o!` pentru `2` secunde
3. Fără reset la steag, la a doua rulare pleacă de unde a rămas

**Încearcă tu — traseu scurt (2 min)**  
- [ ] Steag de două ori → începe din același start  
- [ ] Salvat: `Prenume_Nume_L7`  

---

## Greșeli frecvente
1. **A ajuns „în altă parte”** — X confuzat cu Y (sau +/−). Mută → citește din nou → corectează.  
2. **A dispărut** — x/y prea mari; rămâi cam **−240…240** pe X, **−180…180** pe Y.  
3. **La steag nu reîncepe** — lipsește `du-te la` start la început.  
4. **„Nu știu ce numere”** — trage → citește → scrie (nu ghici).  
5. **Colegul „nu vede comoara”** — la Complet, comoara e un **personaj vizibil**; la Minim, succesul e mesajul `Am găsit-o!` la capăt.  
6. **Nume fișier** — `Prenume_Nume_L7`, nu doar `Ana_L7`.

---

## De făcut azi — „Comoara”
Salvat: `Prenume_Nume_L7`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | **Pasul 1 + Pasul 2** — start cu `du-te la` + ≥2 opriri pe traseu + `spune` la capăt |
| **Complet (ținta orei)** | Minim + **Pasul 3** — **comoară vizibilă** (al 2-lea personaj pe x/y) + sunet + reset clar |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Harta ta
- [ ] Loc de **start** cu x/y citite (la steag: `du-te la`)  
- [ ] Știi pe scurt X / Y / mijloc `(0, 0)`  

### Pasul 2 — Drumul *(parte din Minim)*
*(Ca la „Încearcă tu — traseu scurt”.)*

- [ ] ≥ **2** opriri cu `glisează` și/sau `du-te la` (x/y **în blocuri**, citite de pe scenă)  
- [ ] Între opriri: `așteaptă` dacă e prea rapid  
- [ ] La capăt: <span style="color:#9966FF;font-weight:700">spune</span> `Am găsit-o!`  
- [ ] Steag din nou → reîncepe de la start  
- [ ] Salvat: `Prenume_Nume_L7`  

**→ Minim când:** un coleg vede drumul și mesajul de la capăt (nu trebuie să „ghicească” comoara pe scenă).

### Pasul 3 — Comoara pe scenă *(Complet)*
- [ ] Al **2-lea personaj** = comoara (stea, cufăr…), așezat pe x/y-ul țintei (metoda: trage → citește)  
- [ ] Eroul ajunge **lângă** comoară (ultimele x/y din traseu ≈ poziția comorii)  
- [ ] Un <span style="color:#CF63CF;font-weight:700">sunet</span> când „găsește”  
- [ ] Un coleg **vede** comoara pe scenă și urmărește drumul până la ea  
- [ ] Salvat din nou  

**Gata Complet când:** comoara e vizibilă; drumul până la ea e clar fără să spui numerele.

---

## Bonus (dacă ai terminat Complet)
- [ ] Vizitează **4 colțuri** pe rând (x/y clare pe fiecare)  
- [ ] La click pe erou: <span style="color:#4C97FF;font-weight:700">du-te la indicatorul mouse-ului</span> (tot în Mișcare)  
- [ ] O a treia oprire pe traseu (start → A → B → comoară)  

## Recapitulare rapidă
1. **X** stânga/dreapta · **Y** jos/sus · mijloc ≈ `(0, 0)`  
2. Metoda: trage → citește → scrie  
3. `du-te la` = salt · `glisează` = alunecă  
4. Minim = traseu + mesaj · Complet = + comoară **vizibilă**  
5. Nume: **`Prenume_Nume_L7`**  

**Quiz scurt (cu profesorul):**  
- Ce înseamnă x negativ?  
- De ce `du-te la` la începutul scriptului?  
- Cum „vezi” comoara la Complet?

## Temă
Opțional: dacă ai doar Minim, adaugi acasă personajul-comoară — același `Prenume_Nume_L7`.
