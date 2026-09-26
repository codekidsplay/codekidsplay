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
| 0–8 | Recap M1 + ce e o **condiție** (1 exemplu pe tablă) |
| 8–30 | Pas cu pas **cu mini-exercițiu după fiecare idee** |
| 30–100 | Proiectul „Atenție la margine” |
| 100–120 | Recap, bonus, salvare |

**Capitole azi (doar 3 noi / de folosit):**  
<span style="color:#FFAB19;font-weight:700">Control</span> (`dacă`, `forever`) · <span style="color:#5CB1D6;font-weight:700">Detectare</span> (hexagonul) · plus din M1: <span style="color:#E6A800;font-weight:700">Evenimente</span>, <span style="color:#4C97FF;font-weight:700">Mișcare</span>, <span style="color:#CF63CF;font-weight:700">Sunet</span>.  
*(Operatori / Variabile — **nu** azi; vin la L5–L6.)*

---

## Pas cu pas

### 1) Unde e „dacă” + forma blocului
1. Selectezi **personajul**
2. Din <span style="color:#FFAB19;font-weight:700">Control</span>:  
   <span style="color:#FFAB19;font-weight:700">dacă … atunci</span>  
   *(„C” cu un **hexagon** gol sus = întrebarea da/nu)*
3. Hexagonul îl iei din <span style="color:#5CB1D6;font-weight:700">Detectare</span> — azi: tastă sau margine

**Încearcă tu — forma (1 min)**  
- [ ] Ai găsit `dacă … atunci` în Control  
- [ ] Vezi spațiul **hexagonal** gol (încă fără condiție)

### 2) Prima condiție: tasta (test rapid)
1. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>  
   *(același start ca în M1)*
2. Din <span style="color:#FFAB19;font-weight:700">Control</span>: <span style="color:#FFAB19;font-weight:700">forever</span>  
   *(îl știi din Bonus M1 — azi ține jocul „aprins”; aprofundare la L7)*
3. **În** `forever`, pui <span style="color:#FFAB19;font-weight:700">dacă … atunci</span>
4. În hexagon, din <span style="color:#5CB1D6;font-weight:700">Detectare</span>:  
   <span style="color:#5CB1D6;font-weight:700">tasta</span> `săgeată dreapta` <span style="color:#5CB1D6;font-weight:700">e apăsată?</span>
5. Înăuntrul lui `dacă`, din <span style="color:#4C97FF;font-weight:700">Mișcare</span>:  
   <span style="color:#4C97FF;font-weight:700">mergi</span> `10` pași
6. Apeși steagul — ții dreapta → merge; lași tasta → stă

**Încearcă tu — tasta (2 min)**  
- [ ] Hexagonul e **în** `dacă` (nu lângă)  
- [ ] `dacă` e **în** `forever`  
- [ ] Ții dreapta → merge; lași → stă  

### 3) Condiție pe margine
*(Aceeași idee ca la tastă: tot `forever` + `dacă`, dar hexagonul e altul.)*

1. Tot în `forever`, **încă un** `dacă`:  
   hexagon: <span style="color:#5CB1D6;font-weight:700">atinge marginea?</span>
2. Înăuntru:  
   <span style="color:#4C97FF;font-weight:700">întoarce-te la dreapta cu</span> `180` grade →  
   <span style="color:#CF63CF;font-weight:700">pornește sunetul</span> `…` →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2` *(evită spam-ul de întoarceri)*
3. Ca să ajungă la margine: păstrezi controlul cu tasta **sau** un `mergi` `5` mic în forever (în afara lui `dacă`)

**Încearcă tu — margine (2 min)**  
- [ ] Lovești marginea → se întoarce + sunet  
- [ ] Nu se învârte de 100 de ori pe secundă  

### 4) Reset la steag
1. **Chiar sub** steag, **înainte** de `forever`:  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> mijloc (ex. `0`, `0`) →  
   <span style="color:#4C97FF;font-weight:700">orientează-te în direcția</span> `90` →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>
2. Fără reset, la al doilea steag e haos *(aceeași regulă ca în M1)*

**Încearcă tu — reset (1 min)**  
- [ ] Steag de două ori: personajul reîncepe din același loc  

*(Azi **nu** folosim `scor > 10` — Operatori la L6.)*

---

## Greșeli frecvente
1. **Nu reacționează** — `dacă` e **sub** `forever`, nu **în**; sau lipsește `forever` (rulează o dată și gata).  
2. **Hexagonul e în afară** — condiția trebuie **în** spațiul hexagonal al lui `dacă`.  
3. **Se întoarce de 100 de ori** — lipsește <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2` după întoarcere.  
4. **Fără sunet** — sunetul nu e în tab Sunete, sau volum.

---

## De făcut azi — „Atenție la margine”
Salvat: `Prenume_L1`  
*(Pui împreună ce ai exersat: steag + reset, `forever` + `dacă`, hexagon din Detectare, sunet.)*

### Pasul 1 — Start curat
*(Ca la „Încearcă tu — reset”: steag, apoi forever.)*

- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span>: loc de start + direcție + sunete oprite  
- [ ] Un <span style="color:#FFAB19;font-weight:700">forever</span> pe personaj  

### Pasul 2 — Mișcare + dacă pe margine
*(Ca la „Încearcă tu — tasta” + „Încearcă tu — margine”: același `forever`, hexagon din <span style="color:#5CB1D6;font-weight:700">Detectare</span>.)*

- [ ] Personajul se mișcă (taste **sau** `mergi` mic în forever — ca la testul cu săgeata)  
- [ ] **Dacă** <span style="color:#5CB1D6;font-weight:700">atinge marginea?</span> **atunci** se întoarce (~180°) — același tip de `dacă` ca la tastă  
- [ ] La atingerea marginii: un <span style="color:#CF63CF;font-weight:700">sunet</span> scurt + `așteaptă` `0.2`  

### Pasul 3 — Gata de arătat
- [ ] Rulează ≥10 sec fără să „explodeze” (întoarceri spam)  
- [ ] Un coleg vede: merge → lovește marginea → se întoarce  
- [ ] Proiect **salvat** `Prenume_L1`  

**Gata când:** apeși steagul și personajul se „descurcă” singur la margine.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] **2** `dacă` în același `forever` (margine **și** tasta spațiu → `spune` `Stop!`) — tot din Control + Detectare  
- [ ] La margine: <span style="color:#9966FF;font-weight:700">efect culoare</span> o clipă, apoi <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>  
- [ ] Al 2-lea personaj: dacă **tu** atingi **acel** personaj → `spune` `Au!` *(preview L3)*  

## Recapitulare rapidă
1. <span style="color:#FFAB19;font-weight:700">dacă</span> = întrebare da/nu + acțiune  
2. Hexagonul (<span style="color:#5CB1D6;font-weight:700">Detectare</span>) stă **în** `dacă`; `forever` o verifică mereu  
3. La steag: **reset**, apoi `forever`  

**Quiz scurt (cu profesorul):**  
- Ce e o condiție?  
- De ce `forever` lângă `dacă tasta e apăsată`?  
- Unde stă hexagonul față de `dacă`?

## Temă
Opțional: dacă apeși **spațiu** → <span style="color:#9966FF;font-weight:700">spune</span> `Stop o secundă` + <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1` — același fișier `Prenume_L1`.
