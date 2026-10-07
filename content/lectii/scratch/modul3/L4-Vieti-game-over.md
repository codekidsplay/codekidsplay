# Lecția 4 — Vieți și Game Over: „3 vieți”
**Modulul 3 · Jocuri**  
**Code Maker Club · Game Builder**

> Azi jocul tău are **3 vieți**: la fiecare pericol pierzi una, iar la 0 apare „Game Over”.  
> **Deschide** proiectul din L3 → **Fișier → Salvează ca** → `Prenume_Nume_M3_L4` (ex. `Ana_Pop_M3_L4`)  
> Proiect: **„3 vieți”**

---

## Obiectiv
La finalul orei poți crea variabila <span style="color:#FF8C1A;font-weight:700">vieti</span> care scade la atingere cu pericolul și oprește jocul la 0, cu **repoziționare la start** ca să nu pierzi toate viețile deodată.  
**Minim:** `vieti` pornește de la 3, scade −1 la atingere, „Game Over” la 0.  
**Ținta orei (Complet):** Minim + după lovitură: `du-te la` start (imunitate clară) + scorul din L3 combinat cu viețile.

## De ce contează
Viețile dau o **a doua șansă**: greșești o dată, nu se termină totul imediat. E diferența dintre un joc frustrant (mori din prima) și unul corect (poți învăța din greșeli, dar tot ai o limită).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 + **`schimbă … cu 1` vs `cu -1`** |
| 10–30 | Variabilă `vieti` + atingere −1 — mini-verificări (**Încearcă tu**) |
| 30–100 | Proiectul „3 vieți” (vezi **Minim vs Complet**) |
| 100–120 | Test: pierzi o rundă corect, salvare |

**De reținut — semnul minus!**  
- <span style="color:#FF8C1A;font-weight:700">schimbă</span> `vieti` <span style="color:#FF8C1A;font-weight:700">cu</span> `1` = **adaugă** o viață (+1)  
- <span style="color:#FF8C1A;font-weight:700">schimbă</span> `vieti` <span style="color:#FF8C1A;font-weight:700">cu</span> `-1` = **scade** o viață (−1)  
În Scratch **nu există** un bloc „scade vieți”. Scăderea = **adaugi un număr negativ**. Dacă uiți minusul, devii nemuritor!

**Capitole azi (aceleași ca L3, folosite diferit):**  
<span style="color:#FF8C1A;font-weight:700">Variabile</span> (`vieti`) · <span style="color:#59C059;font-weight:700">Operatori</span> (`=`) · <span style="color:#FFAB19;font-weight:700">Control</span> (`dacă`, `forever`, `oprește`) — plus din L1–L3: <span style="color:#5CB1D6;font-weight:700">Detectare</span>, <span style="color:#9966FF;font-weight:700">Aspect</span>, <span style="color:#CF63CF;font-weight:700">Sunet</span>.

---

## Pas cu pas

### 1) Creezi variabila `vieti`
1. Din <span style="color:#FF8C1A;font-weight:700">Variabile</span>: **Creează o variabilă** → `vieti` → **Pentru toate personajele**
2. Pe **Scenă** (sau **Erou**), la steag, **înaintea** buclei `forever`:  
   <span style="color:#FF8C1A;font-weight:700">setează</span> `vieti` <span style="color:#FF8C1A;font-weight:700">la</span> `3`  
   *(ca la L3: resetul stă pe „arbitri” — Scenă / Erou)*

**Încearcă tu — variabila (2 min)**  
- [ ] Vezi `vieti = 3` pe scenă  
- [ ] Steag din nou → rămâne 3 (reset funcționează)  
- [ ] Știi: **`cu -1`** scade · **`cu 1`** adaugă

### 2) Atingere cu pericolul → −1 viață *(nucleul Minim)*
*(Reconectezi atingerea cu obstacolul din L2, pe **Erou**.)*

1. Pe **Erou**, în bucla `forever` (cea cu tastele), condiția `dacă atinge [Obstacol]?`
2. În interiorul condiției, **în ordine** *(reacție imediată pe ecran)*:  
   <span style="color:#FF8C1A;font-weight:700">schimbă</span> `vieti` <span style="color:#FF8C1A;font-weight:700">cu</span> `-1` →  
   <span style="color:#CF63CF;font-weight:700">pornește sunetul</span> `Bonk` →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Au!` timp de `0.5` secunde  
   *(`schimbă` **primul** = vezi imediat `vieti` pe scenă. `pornește` = sunet care nu oprește restul. Nu pune `redă … până la final` înainte — altfel viața scade cu întârziere.)*

**Încearcă tu — pierzi o viață (3–4 min)**  
- [ ] Atingi obstacolul → `vieti` scade **imediat** cu 1  
- [ ] Fără repoziționare încă, poate scădea de mai multe ori dacă stai lipit — normal, o reparăm la pasul 3

### 3) Imunitate: înapoi la start *(ca L2)*
*(`întoarce-te 180` **nu** te scoate din obstacol — mai ales cu stil stânga-dreapta / fără rotație, sau dacă obstacolul e mare. După `așteaptă 1` tot lipit = pierzi din nou. Fixul sigur: **`du-te la` start**, ca la L2.)*

1. **Imediat după** `spune Au!`, pe Erou:  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> `x:` … `y:` …  
   *(aceleași numere ca la resetul de la steag din L1)*
2. Opțional: <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` după `du-te la` — doar dacă mai atingi obstacolul o clipă

**Încearcă tu — o singură scădere (2–3 min)**  
- [ ] Atingi obstacolul o dată → `vieti` scade cu exact 1, eroul e la start  
- [ ] Nu poți pierde 2–3 vieți dintr-o atingere lungă

### 4) Game Over la `vieti = 0` *(pe Scenă / Erou)*
*(Ca la victoria din L3: verificările globale stau pe **Scenă** sau **Erou** — „arbitrii”. **Nu** pe Obstacol.)*

1. Click pe **Erou** *(Scena nu are blocul `spune`; „Game Over” trebuie spus de Erou)*
2. Steag → (dacă nu ai deja) `setează vieti la 3` → o buclă `forever` **separată** (doar pentru Game Over), cu condiție `dacă`:  
   `vieti` <span style="color:#59C059;font-weight:700">=</span> `0`
3. În interiorul condiției:  
   <span style="color:#9966FF;font-weight:700">spune</span> `Game Over` timp de `2` secunde →  
   <span style="color:#FFAB19;font-weight:700">oprește</span> `toate`


**Încearcă tu — Game Over (3 min)**  
- [ ] Lovești obstacolul de 3 ori (cu `du-te la` start) → „Game Over” + jocul se oprește  
- [ ] Scriptul `vieti = 0` e pe **Erou** (nu pe Obstacol)  
- [ ] Salvat: `Prenume_Nume_M3_L4`

---

## Greșeli frecvente
1. **`schimbă vieti cu 1` în loc de `-1`** — viețile **cresc**; minusul contează.
2. **`schimbă vieti cu -1` fără `du-te la` start** — rămâi lipit → pierzi toate viețile într-o secundă.
3. **Ai folosit `întoarce-te 180` ca imunitate** — nu te mută din obstacol; folosește **`du-te la`** poziția de start.
4. **Viața scade târziu** — ai pus `redă … până la final` / `spune` **înainte** de `schimbă vieti cu -1`. Ordinea: **întâi** `schimbă`, apoi sunet / spune.
5. **`vieti = 0` pe Obstacol / Țintă** — pune-l pe **Scenă** sau **Erou**.
6. **Uiți `setează vieti la 3` la steag** — a doua rundă pornește greșit.
7. **`oprește toate` lipsă la Game Over** — jocul continuă „mort”.
8. **`schimbă vieti cu -2` (sau alt număr)** — poți sări peste 0 și „Game Over” nu se mai declanșează. Pe fiecare lovitură: **doar `-1`**.
9. **Nume fișier** — `Prenume_Nume_M3_L4`, nu doar `Ana_M3_L4`.

---

## De făcut azi — „3 vieți”
Salvat: `Prenume_Nume_M3_L4`  
*(Pornire: proiectul L3 → **Salvează ca** L4.)*

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `vieti = 3` la steag (Scenă/Erou), la atingere: `schimbă cu -1` + sunet + „Au!”, pe Scenă/Erou: `vieti = 0` → „Game Over” + `oprește toate` |
| **Complet (ținta orei)** | Minim + după „Au!”: **`du-te la` start** (o viață pe lovitură) + opțional `scor` din L3 pe scenă |

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Variabila + reset *(bază)*
- [ ] Variabila `vieti`, vizibilă pe scenă  
- [ ] Pe **Scenă** sau **Erou**: `setează vieti la 3` la steag  

### Pasul 2 — Atingere + Game Over *(Minim)*
- [ ] Pe **Erou**: `dacă atinge [Obstacol]?` → **`schimbă vieti cu -1`** → `pornește Bonk` → „Au!”  
- [ ] Pe **Erou**: `forever` → `dacă vieti = 0` → „Game Over” + `oprește toate`  
- [ ] Salvat: `Prenume_Nume_M3_L4`

**→ Minim când:** steag → lovești de 3 ori → „Game Over” clar *(fără Complet, poate scădea rapid dacă stai lipit)*.

### Pasul 3 — Imunitate + scor *(Complet)*
- [ ] După „Au!”: `du-te la` poziția de start (ca L2)  
- [ ] Testezi: rămâi lipit 3 secunde → pierzi **o singură** viață, nu trei  
- [ ] Opțional: ținte din L3 care dau +1 la `scor`  
- [ ] Salvat din nou

**Gata Complet când:** pierzi clar (Game Over corect) și repornești curat cu steagul verde.

---

## Bonus (dacă ai terminat Complet)
- [ ] **Licărire la lovitură:** după `schimbă vieti cu -1`, <span style="color:#9966FF;font-weight:700">setează efectul fantomă la</span> `50` → `du-te la` start → `așteaptă` `1` → <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>  
- [ ] La `vieti = 1`: <span style="color:#9966FF;font-weight:700">efect culoare</span> de avertizare  
- [ ] O inimă pe scenă: `schimbă vieti cu 1` **o singură dată** la atingere  
- [ ] Un buton „Încearcă din nou” care resetează fără steag

## Recapitulare rapidă
1. Scădere = <span style="color:#FF8C1A;font-weight:700">schimbă vieti cu -1</span> (minusul contează!)  
2. Ordine la lovitură: **`schimbă` → `pornește` → `spune` → `du-te la` start**  
3. Game Over = pe **Scenă** / **Erou**: `vieti = 0` → `oprește toate`  
4. Nume: **`Prenume_Nume_M3_L4`**

## Schema pe scurt *(pe foaie)*

**Pe Erou** *(arbitrul)*  
la steag → `setează vieti la 3` → `forever`:  
· `dacă vieti = 0` → `spune Game Over` 2 s → `oprește toate`

**Pe Erou** *(în `forever` cu tastele)*  
· `dacă atinge [Obstacol]?` → `schimbă vieti cu -1` → `pornește Bonk` → `spune Au!` 0,5 s → *(Complet)* `du-te la` start

**Quiz scurt (cu profesorul):**  
- Cum scazi o viață în Scratch, dacă nu există „scade”?  
- De ce `du-te la` start e mai sigur decât `întoarce-te 180`?  
- De ce `vieti = 0` e pe Scenă/Erou, nu pe Obstacol?  
- Ce se întâmplă dacă pui `schimbă` **după** `spune … timp de`?

## Temă
Opțional: încearcă cu 5 vieți în loc de 3. Care variantă e mai distractivă? Același fișier `Prenume_Nume_M3_L4`.
