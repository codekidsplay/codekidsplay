# Lecția 2 — Dacă… altfel
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi ai **două drumuri**: una dacă e „da”, alta dacă e „nu”.  
> Proiect: **„Zi sau noapte”** · fișier: `Prenume_L2` (ex. `Ana_L2`)

---

## Obiectiv
La finalul orei poți folosi <span style="color:#FFAB19;font-weight:700">dacă … atunci … altfel</span> ca să alegi între **două** reacții (ex. fundal zi vs noapte), doar cu o tastă — **fără** calcule `>` / `<`.

## De ce contează
**Dacă** e soare → ieși afară. **Altfel** → stai înăuntru.  
În jocuri: două finaluri, două costume, două mesaje — același „dacă”, dar cu plan B.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap `dacă … atunci` |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Zi sau noapte” |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Blocul cu două guri
1. Din <span style="color:#FFAB19;font-weight:700">Control</span>:  
   <span style="color:#FFAB19;font-weight:700">dacă … atunci … altfel</span>  
2. **Sus** (atunci) = ce faci când răspunsul e **da**  
3. **Jos** (altfel) = ce faci când e **nu**

### 2) Test cu o tastă (la click pe steag — o singură dată)
1. <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
2. <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1` secundă *(timp să apeși tasta, dacă vrei)*  
   **sau** folosești un eveniment separat — azi e ok și așa:
3. Mai clar pentru clasă — **două scripturi**:

**Script A — alegi ziua**  
<span style="color:#E6A800;font-weight:700">când se apasă tasta</span> `z` →  
<span style="color:#9966FF;font-weight:700">comută fundalul la</span> `zi` →  
<span style="color:#9966FF;font-weight:700">spune</span> `Bună dimineața!` pentru `2` secunde

**Script B — „altfel” pe steag (noaptea ca drum implicit)**  
Azi vrem **un singur** `dacă/altfel`. Pattern recomandat:

1. Steag verde  
2. <span style="color:#9966FF;font-weight:700">spune</span> `Apasă Z pentru zi (3 sec)…` pentru `3` secunde  
3. <span style="color:#FFAB19;font-weight:700">dacă … atunci … altfel</span>  
   - hexagon: <span style="color:#5CB1D6;font-weight:700">tasta</span> `z` <span style="color:#5CB1D6;font-weight:700">e apăsată?</span>  
   - **atunci:** fundal zi + salut zi  
   - **altfel:** fundal noapte + `Noapte bună!`

4. Apeși steagul: **ții Z** în cele 3 secunde → zi; **nu ții** → noapte

### 3) Reset
1. Sub steag, înainte de dialog:  
   <span style="color:#9966FF;font-weight:700">comută fundalul la</span> (fundalul de start) →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span> (dacă le folosești)

*(**Nu** azi: `dacă x > 0`, `dacă mărime > 100` — alea cer <span style="color:#59C059;font-weight:700">Operatori</span>, la L6.)*

---

## Încearcă tu — verifică înainte să continui

- [ ] Ai blocul <span style="color:#FFAB19;font-weight:700">dacă … altfel</span> (nu doar `dacă`)  
- [ ] Hexagonul e o **tastă** (sau atingere) — fără operatori verzi  
- [ ] Drumurile **atunci** și **altfel** fac lucruri **diferite** (fundal / mesaj)  
- [ ] La steag poți obține **ambele** drumuri (cu / fără tastă)

---

## Greșeli frecvente
1. **Mereu același drum** — acum apeși Z prea târziu; ține Z **înainte** / în timpul ferestrei de 3 secunde.  
2. **Ai folosit două `dacă` separate** — azi vrem un singur `dacă/altfel` ca să se vadă „da vs nu”.  
3. **Fundalurile lipsesc** — tab Scenă: adaugă 2 fundaluri (zi / noapte) și alege numele exact în `comută fundalul`.  
4. **Operator verde în hexagon** — scoate-l; doar Detectare (tastă / atingere).

---

## De făcut azi — „Zi sau noapte”
Salvat: `Prenume_L2`

### Pasul 1 — Lumea
- [ ] **2 fundaluri**: zi + noapte (nume clare)  
- [ ] La steag: fundal de start curat  

### Pasul 2 — Alegerea
- [ ] Un <span style="color:#FFAB19;font-weight:700">dacă … altfel</span> cu tasta `z` (sau altă literă)  
- [ ] **Atunci:** fundal zi + mesaj / sunet de zi  
- [ ] **Altfel:** fundal noapte + mesaj / sunet de noapte  

### Pasul 3 — Gata de arătat
- [ ] Demonstrezi **ambele** drumuri (o dată cu tasta, o dată fără)  
- [ ] Un coleg înțelege regula fără să îi explici  

**Gata când:** același steag poate duce la zi **sau** noapte, după alegere.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] Pe fiecare drum: <span style="color:#CF63CF;font-weight:700">sunet</span> **diferit** + costum diferit pe personaj  
- [ ] Al 2-lea personaj: pe steag, alt `dacă/altfel` cu **altă** tastă (ex. `n` = noapte forțată)  
- [ ] După alegere: <span style="color:#FFAB19;font-weight:700">așteaptă</span> `2` + un al doilea mesaj pe drumul ales  

## Recapitulare rapidă
1. **Atunci** = da · **Altfel** = nu  
2. Un singur hexagon decide drumul  
3. Fără operatori numerici în M2 L2 — doar taste / atingere  

**Quiz scurt (cu profesorul):**  
- Ce se întâmplă dacă răspunsul e „nu”?  
- De ce nu folosim azi `x > 0`?

## Temă
Opțional: schimbă mesajele + un sunet pe fiecare drum — `Prenume_L2`.
