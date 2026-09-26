# Lecția 1 — Dacă… atunci
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi personajul **decide** singur: dacă se întâmplă ceva, atunci face ceva.  
> Proiect: **„Atenție la margine”** · fișier: `Prenume_Nume_L1` (ex. `Ana_Pop_L1`)

---

## Obiectiv
La finalul orei poți folosi <span style="color:#FFAB19;font-weight:700">dacă … atunci</span> (capitolul <span style="color:#FFAB19;font-weight:700">Control</span>) ca personajul să reacționeze când **atinge marginea**.  
**Minimum:** **un** `dacă … atunci` funcțional (reacție la margine + reset la steag).  
**Ținta orei (Complet):** Minim + **control cu tasta** (al 2-lea `dacă`) + sunet la margine.

## De ce contează
În viață: **dacă** plouă, **atunci** iei umbrela.  
În jocuri: **dacă** atingi peretele, **atunci** te întorci. Fără „dacă”, personajul face mereu același lucru, oricând.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–8 | Recap M1 + ce e o **condiție** (1 exemplu pe tablă) |
| 8–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Atenție la margine” (vezi **Minim vs Complet**) |
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
*(Exercițiu scurt — înțelegi hexagonul. În proiectul final, tasta e **opțională** = Complet.)*

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

### 3) Condiție pe margine *(nucleul Minim)*
*(Aceeași idee ca la tastă: tot `forever` + `dacă`, dar hexagonul e altul.)*

1. Poți **înlocui** testul cu tasta **sau** adăuga un `dacă` nou — azi, pentru Minim, contează **doar** marginea  
2. În `forever`: un `dacă` cu hexagon  
   <span style="color:#5CB1D6;font-weight:700">atinge marginea?</span>
3. Înăuntru:  
   <span style="color:#4C97FF;font-weight:700">întoarce-te la dreapta cu</span> `180` grade →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2` *(evită spam-ul de întoarceri)*  
   *(Sunetul = la Complet.)*
4. **Ca să ajungă la margine — alege UNA din cele două metode, nu ambele:**  
   - **A — Mișcare automată** (mai simplu): **în** `forever`, **în afara** lui `dacă`, un  
     <span style="color:#4C97FF;font-weight:700">mergi</span> `5` — personajul „patrulează” singur; tu doar observi reacția la margine  
   - **B — Control cu tasta** (mai interactiv): `dacă` tasta e apăsată → `mergi` (ca la pasul 2) — **fără** `mergi` constant în forever  
   *(Dacă le combini pe amândouă: se mișcă mereu **și** accelerează când ții tasta — de obicei nedorit.)*

**Încearcă tu — margine (2–3 min)**  
- [ ] Ai ales **doar** metoda A **sau** doar metoda B  
- [ ] Lovești marginea → se întoarce  
- [ ] Nu se învârte de 100 de ori pe secundă  

### 4) Reset la steag
1. **Chiar sub** steag, **înainte** de `forever`:  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> mijloc (ex. `0`, `0`) →  
   <span style="color:#4C97FF;font-weight:700">orientează-te în direcția</span> `90` →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>
2. Fără reset, la al doilea steag e haos *(aceeași regulă ca în M1)*

**Încearcă tu — reset (1–2 min)**  
- [ ] Steag de două ori: personajul reîncepe din același loc  
- [ ] Salvat: `Prenume_Nume_L1`  

*(Azi **nu** folosim `scor > 10` — Operatori la L6.)*

---

## Greșeli frecvente
1. **Nu reacționează** — `dacă` e **sub** `forever`, nu **în**; sau lipsește `forever` (rulează o dată și gata).  
2. **Hexagonul e în afară** — condiția trebuie **în** spațiul hexagonal al lui `dacă`.  
3. **Se întoarce de 100 de ori** — lipsește <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2` după întoarcere.  
4. **Fără sunet** — sunetul nu e în tab Sunete, sau volum (la Complet).  
5. **Tastă + `mergi` constant** — ai amestecat metoda A și B; lasă **una** singură.  
6. **Nume fișier** — `Prenume_Nume_L1`, nu doar `Ana_L1`.

---

## De făcut azi — „Atenție la margine”
Salvat: `Prenume_Nume_L1`  
*(Pui împreună: steag + reset, `forever` + `dacă`, hexagon din Detectare.)*

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Reset + `forever` + **un** `dacă` pe **margine** (întoarcere + `așteaptă`) + **o** metodă de mișcare (A **sau** B) |
| **Complet (ținta orei)** | Minim + **al 2-lea** `dacă` pe **tastă** (control) + **sunet** la atingerea marginii |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

*(La Complet: dacă Minim a fost cu metoda A, adaugi tasta ca al 2-lea `dacă` — și **scoți** `mergi` constant, ca să nu se amestece. Dacă Minim a fost deja cu metoda B, adaugi doar sunetul la margine.)*

### Pasul 1 — Start curat
*(Ca la „Încearcă tu — reset”.)*

- [ ] La <span style="color:#3F8F2A;font-weight:700">steag verde</span>: loc de start + direcție + sunete oprite  
- [ ] Un <span style="color:#FFAB19;font-weight:700">forever</span> pe personaj  

### Pasul 2 — Dacă pe margine *(Minim)*
*(Ca la „Încearcă tu — margine”.)*

- [ ] **Dacă** <span style="color:#5CB1D6;font-weight:700">atinge marginea?</span> **atunci** se întoarce (~180°) + `așteaptă` `0.2`  
- [ ] Mișcare: **doar** metoda A (`mergi` `5` în forever) **sau** **doar** metoda B (`dacă` tasta → `mergi`) — **nu ambele**  
- [ ] Salvat: `Prenume_Nume_L1`  

**→ Minim când:** steag → ajunge la margine → se întoarce (fără spam).

### Pasul 3 — Tastă + sunet *(Complet)*
*(Ca la „Încearcă tu — tasta”, plus sunet.)*

- [ ] Al **2-lea** `dacă` în același `forever`: tasta → `mergi` (control)  
- [ ] La atingerea marginii: un <span style="color:#CF63CF;font-weight:700">sunet</span> scurt  
- [ ] Nu ai `mergi` constant **și** tasta în același timp  
- [ ] Rulează ≥10 sec fără să „explodeze”  
- [ ] Un coleg vede: merge → lovește marginea → se întoarce (+ sunet)  
- [ ] Salvat din nou  

**Gata Complet când:** apeși steagul și personajul se „descurcă” singur la margine, cu control clar.

---

## Bonus (dacă ai terminat Complet)
- [ ] La spațiu: `dacă` tasta spațiu → <span style="color:#9966FF;font-weight:700">spune</span> `Stop!` *(al 3-lea `dacă` în forever)*  
- [ ] La margine: <span style="color:#9966FF;font-weight:700">efect culoare</span> o clipă, apoi <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>  
- [ ] Al 2-lea personaj: dacă **tu** atingi **acel** personaj → `spune` `Au!` *(preview L3)*  

## Recapitulare rapidă
1. <span style="color:#FFAB19;font-weight:700">dacă</span> = întrebare da/nu + acțiune  
2. Hexagonul (<span style="color:#5CB1D6;font-weight:700">Detectare</span>) stă **în** `dacă`; `forever` o verifică mereu  
3. La steag: **reset**, apoi `forever`  
4. Mișcare: **A sau B**, nu ambele  
5. Nume: **`Prenume_Nume_L1`**  

**Quiz scurt (cu profesorul):**  
- Ce e o condiție?  
- De ce `forever` lângă `dacă`?  
- Unde stă hexagonul față de `dacă`?  
- De ce nu pui `mergi` constant **și** tasta odată?

## Temă
Opțional: dacă apeși **spațiu** → <span style="color:#9966FF;font-weight:700">spune</span> `Stop o secundă` + <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1` — același fișier `Prenume_Nume_L1`.  
*(Dacă ai făcut deja asta la Bonus, acasă încearcă **altă** tastă, ex. `săgeată sus`.)*
