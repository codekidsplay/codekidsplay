# Lecția 2 — Dacă… altfel
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi ai **două drumuri**: una dacă e „da”, alta dacă e „nu”.  
> Proiect: **„Zi sau noapte”** · fișier: `Prenume_Nume_L2` (ex. `Ana_Pop_L2`)

---

## Obiectiv
La finalul orei poți folosi <span style="color:#FFAB19;font-weight:700">dacă … atunci … altfel</span> ca să alegi între **două** reacții (fundal zi vs noapte), doar cu o tastă — **fără** calcule `>` / `<`.  
**Minimum:** un `dacă … altfel` care schimbă **fundal + mesaj** (cu / fără tasta `z`).  
**Ținta orei (Complet):** Minim + **sunet pe fiecare drum** + **reset complet** la steag.

## De ce contează
**Dacă** e soare → ieși afară. **Altfel** → stai înăuntru.  
În jocuri: două finaluri, două costume, două mesaje — același „dacă”, dar cu plan B.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap `dacă … atunci` (L1) + ce e **altfel** |
| 10–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Zi sau noapte” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Blocul cu două guri
1. Din <span style="color:#FFAB19;font-weight:700">Control</span>:  
   <span style="color:#FFAB19;font-weight:700">dacă … atunci … altfel</span>  
2. **Sus** (atunci) = ce faci când răspunsul e **da**  
3. **Jos** (altfel) = ce faci când e **nu**  
4. Hexagonul = aceeași idee ca la L1 (Detectare)

**Încearcă tu — forma (1–2 min)**  
- [ ] Ai blocul `dacă … atunci … altfel` (nu doar `dacă`)  
- [ ] Vezi **două** guri: sus = atunci, jos = altfel  
- [ ] Hexagonul e gol (încă fără tastă)

### 2) Test cu tasta — în `forever` (ca la L1)
*(Nu mai folosim „fereastra de 3 secunde”: Scratch verifică tasta **o clipă** dacă rulează o singură dată — greu de nimerit. Azi: `forever` verifică **de mai multe ori pe secundă**.)*

1. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
2. Din <span style="color:#FFAB19;font-weight:700">Control</span>: <span style="color:#FFAB19;font-weight:700">forever</span>
3. **În** `forever`: <span style="color:#FFAB19;font-weight:700">dacă … atunci … altfel</span>  
   - hexagon, din <span style="color:#5CB1D6;font-weight:700">Detectare</span>:  
     <span style="color:#5CB1D6;font-weight:700">tasta</span> `z` <span style="color:#5CB1D6;font-weight:700">e apăsată?</span>  
   - **atunci:** <span style="color:#9966FF;font-weight:700">spune</span> `Zi!` *(fără „pentru … secunde” — ca să nu blocheze bucla)*  
   - **altfel:** <span style="color:#9966FF;font-weight:700">spune</span> `Noapte!`
4. Cum testezi:  
   - **Ține Z** apăsată **înainte** să apeși steagul, **sau** apas-o rapid după  
   - Scriptul verifică mereu: **ții Z** → „Zi!”; **lași** → „Noapte!”

**Încearcă tu — mecanismul cu tasta (2–3 min)**  
- [ ] `dacă … altfel` e **în** `forever` (nu o singură dată sub steag)  
- [ ] Hexagonul e tasta `z` (Detectare — **fără** operatori verzi)  
- [ ] Ții Z → mesaj de zi; lași → mesaj de noapte  
- [ ] Poți comuta de mai multe ori, fără să reapeși steagul  

### 3) Cele două fundaluri
1. Tab **Scenă** → adaugi **2 fundaluri** (ex. `zi`, `noapte`) — nume clare  
2. În **atunci**:  
   <span style="color:#9966FF;font-weight:700">comută fundalul la</span> `zi` → `spune` `Bună dimineața!`  
3. În **altfel**:  
   <span style="color:#9966FF;font-weight:700">comută fundalul la</span> `noapte` → `spune` `Noapte bună!`  
4. Alege numele **exact** din listă (ca la L2 din M1)

**Încearcă tu — fundaluri (2–3 min)**  
- [ ] Ai **2** fundaluri pe Scenă  
- [ ] Ții Z → fundal zi + mesaj; lași → fundal noapte + mesaj  
- [ ] Drumurile **atunci** și **altfel** arată **diferit**  

### 4) Reset la steag
1. **Chiar sub** steag, **înainte** de `forever`:  
   <span style="color:#9966FF;font-weight:700">comută fundalul la</span> (fundalul de start) →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span> (dacă le folosești) →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span> *(la Complet, când ai sunete)*
2. Opțional, înainte de `forever`:  
   <span style="color:#9966FF;font-weight:700">spune</span> `Ține Z = zi · lasă = noapte` pentru `2` secunde  
   *(explicație o dată; apoi bucla preia controlul)*

**Încearcă tu — reset (1–2 min)**  
- [ ] Steag de două ori → fundalul de start e curat, apoi alegerea rulează din nou  
- [ ] Salvat: `Prenume_Nume_L2`  

*(**Nu** azi: `dacă x > 0`, `dacă mărime > 100`. <span style="color:#59C059;font-weight:700">Operatori</span>: la **L5** doar un preview `=` (victorie scor); `<` `>` `+` pe îndelete la **L6**.)*

---

## Greșeli frecvente
1. **Mereu același drum** — ai pus `dacă … altfel` **o singură dată** (fără `forever`); treci la tiparul din pasul 2.  
2. **Mesajele se calcă / se blochează** — ai folosit `spune … pentru … secunde` **în** `forever`; folosește `spune` **fără** durată.  
3. **Ai folosit două `dacă` separate** — azi vrem un singur `dacă/altfel` ca să se vadă „da vs nu”.  
4. **Fundalurile lipsesc** — tab Scenă: 2 fundaluri + numele exact în `comută fundalul`.  
5. **Operator verde în hexagon** — scoate-l; doar Detectare (tastă).  
6. **Sunet spam** (la Complet) — pune <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` după sunet pe fiecare drum.  
7. **Nume fișier** — `Prenume_Nume_L2`, nu doar `Ana_L2`.

---

## De făcut azi — „Zi sau noapte”
Salvat: `Prenume_Nume_L2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `forever` + **un** `dacă … altfel` pe tasta `z` → **fundal + mesaj** pe fiecare drum + reset fundal la steag |
| **Complet (ținta orei)** | Minim + **sunet pe fiecare drum** + **reset complet** (fundal + efecte + `oprește toate sunetele`) |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Lumea
- [ ] **2 fundaluri**: zi + noapte (nume clare)  
- [ ] La steag: fundal de start curat  

### Pasul 2 — Alegerea *(Minim)*
*(Ca la „Încearcă tu — mecanismul” + „fundaluri”.)*

- [ ] Un <span style="color:#FFAB19;font-weight:700">dacă … altfel</span> **în** `forever`, cu tasta `z`  
- [ ] **Atunci:** fundal zi + mesaj de zi  
- [ ] **Altfel:** fundal noapte + mesaj de noapte  
- [ ] Demonstrezi **ambele** drumuri (ții Z / lași)  
- [ ] Salvat: `Prenume_Nume_L2`  

**→ Minim când:** steag → ții Z = zi; lași = noapte (fără să reapeși steagul).

### Pasul 3 — Sunet + reset complet *(Complet)*
- [ ] Pe **fiecare** drum: un <span style="color:#CF63CF;font-weight:700">sunet</span> diferit (+ `așteaptă` `0.5` ca să nu spam-uiască)  
- [ ] La steag, înainte de `forever`: fundal start + `anulează efectele` + `oprește toate sunetele`  
- [ ] Un coleg înțelege regula fără să îi explici  
- [ ] Salvat din nou  

**Gata Complet când:** același steag duce la zi **sau** noapte după tastă, cu sunet pe ambele drumuri.

---

## Bonus (dacă ai terminat Complet)
- [ ] Pe fiecare drum: **costum** diferit pe personaj (nu doar fundal)  
- [ ] Al 2-lea personaj: pe steag, alt `dacă/altfel` cu **altă** tastă (ex. `n` = forțează noapte pe un mesaj)  
- [ ] La început (înainte de `forever`): `spune` scurt cu regula, apoi bucla  

## Recapitulare rapidă
1. **Atunci** = da · **Altfel** = nu  
2. Un singur hexagon decide drumul — verificat mereu în `forever`  
3. Ții tasta **înainte** / în timpul rulării — nu „o fereastră de 3 secunde”  
4. Fără operatori numerici în M2 L2 — doar taste / atingere  
5. Nume: **`Prenume_Nume_L2`**  

**Quiz scurt (cu profesorul):**  
- Ce se întâmplă dacă răspunsul e „nu”?  
- De ce punem `dacă … altfel` în `forever`, nu o singură dată?  
- De ce nu folosim azi `x > 0`?

## Temă
Opțional: schimbă mesajele + un sunet pe fiecare drum — `Prenume_Nume_L2`.  
*(Dacă ai făcut deja sunetele la Complet / Bonus, acasă schimbă **literele** sau **fundalurile**.)*
