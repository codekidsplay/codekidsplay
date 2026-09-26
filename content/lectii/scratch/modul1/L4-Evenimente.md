# Lecția 4 — Butonul magic (evenimente)
**Modulul 1 · Primii pași**  
**Code Kids Play · Scratch Starter**

> Azi înveți că blocurile pornesc când se întâmplă ceva — steag, click sau tastă.  
> Proiect: **„Butonul magic”** · fișier: `Prenume_Nume_L4` (ex. `Ana_Pop_L4`)

---

## Obiectiv
La finalul orei pornești acțiuni pe **evenimente diferite** din <span style="color:#E6A800;font-weight:700">Evenimente</span>.  
**Minimum:** steag (= reset) + **un** eveniment nou (click pe personaj).  
**Ținta orei (Complet):** + tastă (spațiu) + **buton** separat pe scenă.

## De ce contează
În jocuri, nu totul pornește odată: uneori apeși Start, alteori un buton sau o tastă.  
În Scratch, asta e capitolul <span style="color:#E6A800;font-weight:700">Evenimente</span> (EN: *Events*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–5 | Obiectiv + ce e un eveniment |
| 5–30 | Pas cu pas: **3** checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Butonul magic” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Steagul verde = start și reset
1. Selectezi **personajul** (eroul)
2. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
3. Sub el:  
   <span style="color:#4C97FF;font-weight:700">du-te la x:</span> `0` <span style="color:#4C97FF;font-weight:700">y:</span> `0` →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span> →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Gata de start!` pentru `1` secundă  
   *(„Anulează efectele” = șterge culoarea / fantoma etc. — ca steagul să **curețe** totul)*
4. Apeși steagul — eroul se așază și salută

*(Steagul nu e doar „play”: azi îl folosești ca să **resetezi**.)*

**Încearcă tu — steag / reset (2 min)**  
- [ ] Script pe steag cu `du-te la` + `spune`  
- [ ] Ai și `anulează efectele grafice` pe steag  
- [ ] Steag de două ori → același loc de start  

### 2) Click pe personaj
1. Tot pe **același personaj**, un **script nou** (nu sub steag):  
   <span style="color:#E6A800;font-weight:700">când se dă clic pe acest personaj</span>  
   *(tot **Evenimente** — altă opțiune față de steag)*
2. Sub el:  
   <span style="color:#9966FF;font-weight:700">spune</span> `M-ai apăsat!` pentru `1` secundă →  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `30` pași
3. **Nu** apeși steagul — dai **click pe personaj** pe scenă
4. Vezi: același personaj, **două porniri** (steag ≠ click)

**Încearcă tu — click (2 min)**  
- [ ] Script separat pe click  
- [ ] Click pe personaj → mesaj + mișcare  
- [ ] Steag → reset (înapoi la start)  

### 3) Tasta spațiu
1. Tot pe personaj, încă un script:  
   <span style="color:#E6A800;font-weight:700">când tasta</span> `spațiu` <span style="color:#E6A800;font-weight:700">este apăsată</span>
2. Sub el:  
   <span style="color:#9966FF;font-weight:700">schimbă efectul culoare cu</span> `25`  
   *(în <span style="color:#9966FF;font-weight:700">Aspect</span> — sau `următorul costum`, din L2)*
3. Apeși **spațiu** — alt eveniment, altă reacție

*Atenție:* fiecare spațiu adaugă **încă** +25 la culoare (se **cumulează**). De aceea pe **steag** ai `anulează efectele grafice` — altfel, după multe apăsări, personajul arată „straniu” și nu mai știi de ce.

**Încearcă tu — tastă (2 min)**  
- [ ] Script pe spațiu  
- [ ] Spațiu de 2–3 ori → culoarea se schimbă tot mai mult  
- [ ] Steag → efectele dispar (reset)  
- [ ] Salvat: `Prenume_Nume_L4`  

### 4) Buton + erou (două personaje) — pentru Complet
1. Adaugi un **al doilea personaj** = butonul  
2. Pe **buton**:  
   <span style="color:#E6A800;font-weight:700">când se dă clic pe acest personaj</span> →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Go!` pentru `1` secundă  
   *(opțional: <span style="color:#CF63CF;font-weight:700">sunet</span>)*
3. Pe **erou** păstrezi: steag = reset · click și/sau spațiu = reacție  
4. Așază butonul **lângă** erou, nu peste el  
5. Test: steag → reset; click pe **buton** → „Go!”; click pe **erou** / spațiu → eroul reacționează  

---

## Greșeli frecvente
1. **„Nu merge click-ul”** — apeși steagul, dar scriptul e pe click. Click **pe personaj**, pe scenă.  
2. **Script pe personajul greșit** — verifică cine e selectat în listă.  
3. **Click-ul lovește alt personaj** — butonul e peste erou; mută-le despărțit.  
4. **La steag rămâne haos** — lipsește `du-te la` pe erou.  
5. **Tasta „nu face nimic”** — click întâi pe scenă, apoi spațiu; verifică că e chiar `spațiu`.  
6. **Culoarea nu mai „revine”** — fiecare spațiu adaugă +25; pe steag trebuie <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>.  
7. **Nume fișier** — `Prenume_Nume_L4`, nu doar `Ana_L4`.

---

## De făcut azi — „Butonul magic”
Salvat: `Prenume_Nume_L4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | **Pasul 1 + Pasul 2** — erou cu steag (reset) + **un** eveniment nou (click pe erou) |
| **Complet (ținta orei)** | Minim + **Pasul 3** — tasta spațiu + personaj **buton** + test clar steag / buton / erou |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Personajul (eroul)
- [ ] Un **erou** pe scenă  
- [ ] La steag: `du-te la` start + `anulează efectele grafice` + mesaj scurt  

### Pasul 2 — Un eveniment nou *(parte din Minim)*
*(Ca la „Încearcă tu — click”.)*

- [ ] Click pe **erou** → ceva vizibil (`spune` + `mergi` sau similar)  
- [ ] Steag ≠ click (testezi separat)  
- [ ] Salvat: `Prenume_Nume_L4`  

**→ Minim când:** steagul resetează; click pe erou face altceva.

### Pasul 3 — Tastă + buton *(Complet)*
*(Ca la „Încearcă tu — tastă” + pasul 4.)*

- [ ] Tasta **spațiu** → schimbă aspect (culoare sau costum)  
- [ ] Al 2-lea personaj = **buton**; click pe buton → „Go!” (sau sunet)  
- [ ] Un coleg știe **ce face steagul** și **ce face butonul**, fără explicație  
- [ ] Salvat din nou  

**Gata Complet când:** steag = reset; buton = „magie”; eroul are încă un eveniment (click sau spațiu).

---

## Bonus (dacă ai terminat Complet)
- [ ] La tasta **săgeată dreapta**: eroul <span style="color:#4C97FF;font-weight:700">mergi</span> `10`  
- [ ] Butonul își schimbă **costumul** când e apăsat (`următorul costum` pe click)  
- [ ] La spațiu: `spune` un mesaj secret + `așteaptă` `1`  

*(Nu folosim azi **mesaje** / *broadcast* — `trimite` / `când primesc`. Vin în **Modulul 2**. Azi rămânem la steag, click și tastă.)*

## Recapitulare rapidă
1. **Eveniment** = ce pornește scriptul (steag, click, tastă)  
2. Un personaj poate avea **mai multe** scripturi  
3. Steagul = start + **reset** (loc + efecte)  
4. Nume: **`Prenume_Nume_L4`**  

**Quiz scurt (cu profesorul):**  
- Steagul și click-ul fac același lucru?  
- De ce anulăm efectele la steag?  
- Unde găsești blocurile de evenimente?

## Temă
Opțional: dacă ai doar Minim, adaugi acasă butonul sau spațiul — același `Prenume_Nume_L4`.
