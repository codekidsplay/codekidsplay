# Lecția 4 — Butonul magic (evenimente)
**Modulul 1 · Primii pași**  
**Code Kids Play · Scratch Starter**

> Azi înveți că blocurile pornesc când se întâmplă ceva — steag, click sau tastă.  
> Proiect: **„Butonul magic”** · fișier: `Prenume_L4` (ex. `Ana_L4`)

---

## Obiectiv
La finalul orei poți să pornești acțiuni pe **evenimente diferite**: <span style="color:#3F8F2A;font-weight:700">steag verde</span>, click pe personaj, și o tastă.

## De ce contează
În jocuri, nu totul pornește odată: uneori apeși Start, alteori apeși un buton sau o tastă.  
În Scratch, asta e capitolul <span style="color:#E6A800;font-weight:700">Evenimente</span> (în engleză: *Events*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + ce e un eveniment |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Butonul magic” |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Steagul verde = start (și reset)
1. Selectezi **personajul** (eroul)
2. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
3. Sub el:  
   <span style="color:#4C97FF;font-weight:700">du-te la x:</span> `0` <span style="color:#4C97FF;font-weight:700">y:</span> `0` →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Gata de start!` pentru `1` secundă
4. Apeși <span style="color:#3F8F2A;font-weight:700">steagul verde</span> — eroul se așază și salută

*(Steagul nu e doar „play”: azi îl folosești ca să **resetezi** scena.)*

### 2) Click pe personaj
1. Tot pe **același personaj**, un **script nou** (nu lipi sub steag — script separat):  
   <span style="color:#E6A800;font-weight:700">când se dă clic pe acest personaj</span>
2. Sub el:  
   <span style="color:#9966FF;font-weight:700">spune</span> `M-ai apăsat!` pentru `1` secundă →  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `30` pași
3. **Nu** apeși steagul — dai **click pe personaj** pe scenă
4. Vezi: același personaj, **două porniri diferite** (steag ≠ click)

### 3) Tasta (spațiu)
1. Tot pe personaj, încă un script:  
   <span style="color:#E6A800;font-weight:700">când tasta</span> `spațiu` <span style="color:#E6A800;font-weight:700">este apăsată</span>
2. Sub el:  
   <span style="color:#9966FF;font-weight:700">schimbă efectul culoare cu</span> `25`  
   *(sau <span style="color:#9966FF;font-weight:700">următorul costum</span>, dacă ai costume)*
3. Apeși **spațiu** pe tastatură — alt eveniment, altă reacție

*(Blocul e tot în <span style="color:#E6A800;font-weight:700">Evenimente</span>, lângă steag și click.)*

### 4) Buton + erou (două personaje)
1. Adaugi un **al doilea personaj** = butonul (stea, buton, minge…)
2. Selectezi **butonul** (nu eroul) și lipești:  
   <span style="color:#E6A800;font-weight:700">când se dă clic pe acest personaj</span> →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Go!` pentru `1` secundă  
   *(opțional: un <span style="color:#CF63CF;font-weight:700">sunet</span> scurt)*
3. Pe **erou** păstrezi scripturile din pașii 1–3 (steag = reset, click sau spațiu = reacție)
4. Test: <span style="color:#3F8F2A;font-weight:700">steag</span> → totul la loc; click pe **buton** → „Go!”; click pe **erou** / spațiu → eroul face ceva

*(Vrei ca butonul să pornească eroul fără click pe erou? Asta e cu **mesaje** — vezi Bonus. Azi e suficient click pe fiecare.)*

---

## Încearcă tu
- [ ] Ai un script pe <span style="color:#3F8F2A;font-weight:700">steag verde</span> (reset / start)  
- [ ] Ai un script pe <span style="color:#E6A800;font-weight:700">click pe acest personaj</span>  
- [ ] Ai un script pe tasta <span style="color:#E6A800;font-weight:700">spațiu</span>  
- [ ] Testezi **fără să amesteci**: steag separat, click separat, spațiu separat

---

## Greșeli frecvente
1. **„Nu merge click-ul”** — apeși steagul, dar scriptul e pe click. Click **pe personaj**, pe scenă (nu pe blocuri).  
2. **Scriptul pe personajul greșit** — ai lipit pe buton, dar dai click pe erou (sau invers). Uită-te cine e selectat în listă.  
3. **La steag rămâne haos** — lipsește resetul: pe erou, la steag, pune <span style="color:#4C97FF;font-weight:700">du-te la</span> locul de start.  
4. **Tasta „nu face nimic”** — click întâi pe scenă (ca Scratch să „asculte” tastatura), apoi spațiu; verifică în bloc că e chiar `spațiu`.

---

## De făcut azi — „Butonul magic”
Salvat: `Prenume_L4`

### Pasul 1 — Personajele
- [ ] Un **erou** + un **buton** (al doilea personaj)  
- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span>: eroul (și butonul, dacă vrei) revin la locul de start  

### Pasul 2 — Trei porniri
- [ ] <span style="color:#3F8F2A;font-weight:700">Steag verde</span> → mesaj de start / reset clar  
- [ ] Click pe **buton** → ceva vizibil (spune / sunet / efect)  
- [ ] Click pe **erou** **sau** tasta spațiu → eroul se mișcă / schimbă aspect  

### Pasul 3 — Se înțelege fără voce
- [ ] Un coleg știe **ce face steagul** și **ce face butonul**, fără să îi explici  
- [ ] Proiectul e **salvat**: `Prenume_L4`

**Gata când:** steagul resetează; click-ul pe buton „pornește magia”; eroul reacționează la un al doilea eveniment.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] Pe buton: <span style="color:#E6A800;font-weight:700">trimite mesajul</span> `start`; pe erou: <span style="color:#E6A800;font-weight:700">când primesc mesajul</span> `start` → glisează / spune  
- [ ] La tasta **săgeată dreapta**: eroul <span style="color:#4C97FF;font-weight:700">mergi</span> `10`  
- [ ] Butonul își schimbă costumul când e apăsat  

## Recapitulare rapidă
1. **Eveniment** = ce pornește scriptul (steag, click, tastă…)  
2. Un personaj poate avea **mai multe** scripturi, fiecare cu alt eveniment  
3. Steagul verde = start + **reset** la locul bun  

**Quiz scurt (cu profesorul):**  
- Steagul și click-ul fac același lucru?  
- Unde găsești blocurile de evenimente?

## Temă
Opțional: la click pe buton, adaugă un <span style="color:#CF63CF;font-weight:700">sunet</span> sau un efect de culoare — același fișier `Prenume_L4`.
