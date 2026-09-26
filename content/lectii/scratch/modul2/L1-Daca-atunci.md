# Lecția 1 — Dacă… atunci
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi personajul **decide** singur: dacă se întâmplă ceva, atunci face ceva.  
> Proiect: **„Atenție la margine”** · fișier: `Prenume_L1` (ex. `Ana_L1`)

---

## Obiectiv
La finalul orei poți folosi <span style="color:#FFAB19;font-weight:700">dacă … atunci</span> (capitolul <span style="color:#FFAB19;font-weight:700">Control</span>) ca personajul să reacționeze când **atinge marginea** — cu întoarcere + sunet.

## De ce contează
În viață: **dacă** plouă, **atunci** iei umbrela.  
În jocuri: **dacă** atingi peretele, **atunci** te întorci. Fără „dacă”, personajul face mereu același lucru, oricând.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap M1 + obiectiv (ce e o **condiție**) |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Atenție la margine” |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Unde e „dacă”
1. Selectezi **personajul**
2. Din <span style="color:#FFAB19;font-weight:700">Control</span>:  
   <span style="color:#FFAB19;font-weight:700">dacă … atunci</span>  
   *(blocul e ca un „C” cu un **hexagon** gol sus — acolo intră întrebarea da/nu)*
3. Hexagonul vine din <span style="color:#5CB1D6;font-weight:700">Detectare</span> sau din evenimente (tastă) — azi: **atinge marginea**

### 2) Prima condiție: tasta (test rapid)
1. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
2. Din <span style="color:#FFAB19;font-weight:700">Control</span>: <span style="color:#FFAB19;font-weight:700">forever</span>  
   *(îl știi din Bonus M1 — azi ține jocul „aprins”; îl aprofundăm la L7)*
3. **În** `forever`, pui <span style="color:#FFAB19;font-weight:700">dacă … atunci</span>
4. În hexagon, din <span style="color:#5CB1D6;font-weight:700">Detectare</span>:  
   <span style="color:#5CB1D6;font-weight:700">tasta</span> `săgeată dreapta` <span style="color:#5CB1D6;font-weight:700">e apăsată?</span>
5. Înăuntrul lui `dacă`: <span style="color:#4C97FF;font-weight:700">mergi</span> `10` pași
6. Apeși steagul — ții dreapta → merge; lași tasta → stă

### 3) Conditie pe margine
1. Tot în `forever`, **încă un** `dacă` (sau același stil, pe rând):  
   hexagon: <span style="color:#5CB1D6;font-weight:700">atinge marginea?</span>
2. Înăuntru:  
   <span style="color:#4C97FF;font-weight:700">întoarce-te la dreapta cu</span> `180` grade →  
   <span style="color:#CF63CF;font-weight:700">pornește sunetul</span> `…`
3. Ca să meargă spre margine: tot în `forever` (în afara lui `dacă`, sau într-un `dacă` care e mereu adevărat pe scurt):  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `5` pași  
   *(sau: doar tastele din pasul 2 — tu alegi)*

### 4) Reset la steag
1. **Chiar sub** steag, **înainte** de `forever`:  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> mijloc (ex. `0`, `0`) →  
   <span style="color:#4C97FF;font-weight:700">orientează-te în direcția</span> `90` →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>
2. Fără reset, la al doilea steag e haos

*(Azi **nu** folosim `scor > 10` sau alte calcule verzi — alea sunt la L6.)*

---

## Încearcă tu — verifică înainte să continui

- [ ] Ai un <span style="color:#FFAB19;font-weight:700">dacă … atunci</span> cu hexagon **în** el (nu lângă)  
- [ ] Hexagonul e din <span style="color:#5CB1D6;font-weight:700">Detectare</span> (tastă sau margine)  
- [ ] Ai <span style="color:#FFAB19;font-weight:700">forever</span> ca să verifice mereu condiția  
- [ ] La steag: reset loc / direcție  

---

## Greșeli frecvente
1. **Nu reacționează** — `dacă` e **sub** `forever`, nu **în**; sau lipsește `forever` (rulează o dată și gata).  
2. **Hexagonul e în afară** — condiția trebuie **în** spațiul hexagonal al lui `dacă`.  
3. **Se întoarce de 100 de ori** — atinge marginea și rulează de multe ori pe secundă; adaugă <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2` înăuntrul lui `dacă`, după întoarcere.  
4. **Fără sunet** — sunetul nu e în tab Sunete, sau volum.

---

## De făcut azi — „Atenție la margine”
Salvat: `Prenume_L1`

### Pasul 1 — Start curat
- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span>: loc de start + direcție + sunete oprite  
- [ ] Un <span style="color:#FFAB19;font-weight:700">forever</span> pe personaj  

### Pasul 2 — Mișcare + dacă
- [ ] Personajul se mișcă (taste **sau** `mergi` mic în forever)  
- [ ] **Dacă** <span style="color:#5CB1D6;font-weight:700">atinge marginea?</span> **atunci** se întoarce (~180°)  
- [ ] La atingerea marginii: un <span style="color:#CF63CF;font-weight:700">sunet</span> scurt  

### Pasul 3 — Gata de arătat
- [ ] Rulează ≥10 sec fără să „explodeze” (întoarceri spam)  
- [ ] Un coleg vede: merge → lovește marginea → se întoarce  

**Gata când:** apeși steagul și personajul se „descurcă” singur la margine.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] **2** `dacă` în același `forever` (ex. margine **și** tasta spațiu → `spune` `Stop!`)  
- [ ] La margine: schimbă și <span style="color:#9966FF;font-weight:700">efectul culoare</span> o clipă, apoi <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>  
- [ ] Al 2-lea personaj: dacă **tu** atingi **acel** personaj → `spune` `Au!` *(preview L3)*  

## Recapitulare rapidă
1. <span style="color:#FFAB19;font-weight:700">dacă</span> = întrebare da/nu + acțiune  
2. Conditia (hexagon) stă **în** `dacă`; `forever` o verifică mereu  
3. La steag: **reset**  

**Quiz scurt (cu profesorul):**  
- Ce e o condiție?  
- De ce avem nevoie de `forever` lângă `dacă tasta e apăsată`?

## Temă
Opțional: dacă apeși **spațiu** → <span style="color:#9966FF;font-weight:700">spune</span> `Stop o secundă` + <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1` — același fișier `Prenume_L1`.
