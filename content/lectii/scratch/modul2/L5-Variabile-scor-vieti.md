# Lecția 5 — Variabile: scor și vieți
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi ții un **număr pe ecran** (scor, vieți) și îl schimbi când se întâmplă ceva.  
> Proiect: **„Prinde 5 stele”** · fișier: `Prenume_Nume_L5` (ex. `Ana_Pop_L5`)

---

## Obiectiv
La finalul orei poți crea variabile în <span style="color:#FF8C1A;font-weight:700">Variabile</span>, le arăți pe scenă, le **resetezi la steag**, și crești scorul când atingi o stea.  
**Minimum:** `scor` funcțional (**+1** la atingere, **0** la steag), pe cel puțin **1** stea.  
**Ținta orei (Complet):** Minim + **5** stele + victorie când <span style="color:#59C059;font-weight:700">scor = 5</span>.

## De ce contează
Fără scor, jocul nu „ține minte” câte stele ai prins.  
**Variabilă** = o cutie cu nume (ex. `scor`) — în engleză: *variable*.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap control + „ce e o cutie cu număr?” |
| 10–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Prinde 5 stele” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Creează scorul
1. Categoria <span style="color:#FF8C1A;font-weight:700">Variabile</span> → **Creează o variabilă**  
2. Nume: `scor` (sau `Scor`) — **pentru toți** (ca stelele să poată modifica același scor)  
3. Bifează ca să fie **arătat pe scenă**  
4. Blocuri:  
   - <span style="color:#FF8C1A;font-weight:700">setează scor la</span> `0`  
   - <span style="color:#FF8C1A;font-weight:700">modifică scorul cu</span> `1`

**Încearcă tu — variabila (1–2 min)**  
- [ ] `scor` e creată și **vizibilă** pe scenă  
- [ ] Vezi blocurile `setează` și `modifică`  

### 2) Reset la steag (complet)
1. **Chiar sub** steag, pe **erou**:  
   <span style="color:#FF8C1A;font-weight:700">setează scor la</span> `0` →  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> start →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span> →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>  
2. (Dacă ai `vieti` la Bonus) tot aici: <span style="color:#FF8C1A;font-weight:700">setează vieti la</span> `3`  
3. Fără `setează scor la 0`, la al doilea joc scorul rămâne 5

**Încearcă tu — reset (1–2 min)**  
- [ ] La steag: `scor` = 0 pe ecran  
- [ ] Loc start + efecte anulate + sunete oprite  

### 3) +1 la stea *(pattern unic — pe stea)*
*(Fără mesaje / broadcast — alea sunt L8. Scorul e „pentru toți”, deci **steaua** îl poate modifica.)*

1. Erou: control cu taste în `forever` (ca L4) — **doar** mișcare (+ opțional obstacole)  
2. Stele = alte personaje (ex. `Stea1`, `Stea2`…)  
3. Pe **fiecare stea**, același tipar:  
   - La steag: <span style="color:#9966FF;font-weight:700">arată</span> → <span style="color:#4C97FF;font-weight:700">du-te la</span> poziția ei  
   - Apoi:  
     <span style="color:#FFAB19;font-weight:700">forever</span> →  
     <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge</span> `Erou`  
     **atunci:**  
     <span style="color:#FF8C1A;font-weight:700">modifică scorul cu</span> `1` →  
     <span style="color:#9966FF;font-weight:700">ascunde</span> →  
     <span style="color:#FFAB19;font-weight:700">stop this script</span>  
     *(oprește forever-ul stelei, ca să nu mai adauge +1 cât timp eroul stă pe loc)*  
4. Copiezi scriptul pe celelalte stele (poziții diferite)

**Încearcă tu — +1 pe o stea (3–5 min)**  
- [ ] Pe **Stea1**: `arată` la steag + `forever` → `dacă atinge Erou` → `+1` + `ascunde` + `stop this script`  
- [ ] Atingi steaua → scorul pe ecran crește cu 1, steaua dispare  
- [ ] Steag din nou → steaua reapare, scorul e 0  
- [ ] Salvat: `Prenume_Nume_L5`  

### 4) Victorie — preview `=` din Operatori
*(**Excepție / preview:** azi folosim **doar** semnul <span style="color:#59C059;font-weight:700">=</span> din <span style="color:#59C059;font-weight:700">Operatori</span>, ca să știm când s-a terminat jocul. Restul (`<`, `>`, `+`, `−`) rămân pentru **L6** — ca `forever` în Bonus M1 înainte de L7.)*

1. Hexagon: <span style="color:#59C059;font-weight:700">(scor) = (5)</span>  
2. Pe **erou**, în forever (după taste):  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#59C059;font-weight:700">scor = 5</span>  
   **atunci:** <span style="color:#9966FF;font-weight:700">spune</span> `Ai câștigat!` pentru `2` secunde →  
   <span style="color:#CF63CF;font-weight:700">pornește sunetul</span> `…` →  
   <span style="color:#FFAB19;font-weight:700">stop all</span> *(opțional; aprofundăm la L7)*  

**Încearcă tu — victorie (2–3 min)**  
- [ ] Ai hexagonul `scor = 5` (doar `=`, nu `<` / `>`)  
- [ ] Cu 5 stele prinse → mesaj `Ai câștigat!`  
- [ ] Salvat din nou  

### 5) Vieți (Bonus — nu e în Minim/Complet)
1. Variabilă `vieti`, start la 3  
2. Dacă atinge lavă / obstacol → `modifică vieti cu -1`  
3. Dacă `vieti = 0` → `Sfârșitul jocului` (*Game Over* — tot cu preview `=`)

---

## Greșeli frecvente
1. **Nu apare pe scenă** — nu e bifată variabila în listă.  
2. **Scorul nu crește** — `modifică` e pe personajul greșit; verifică că e pe **stea** și că steaua „atinge Erou”.  
3. **Crește de 100 de ori** — lipsește `ascunde` + `stop this script` după prindere.  
4. **La steag rămâne 5** — ai uitat `setează scor la 0`.  
5. **Stelele nu reapar** — pe fiecare stea, la steag: `arată` (+ poziție).  
6. **Nume fișier** — `Prenume_Nume_L5`, nu doar `Ana_L5`.

---

## De făcut azi — „Prinde 5 stele”
Salvat: `Prenume_Nume_L5`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Variabilă `scor` vizibilă + reset la steag (scor 0 + reset complet) + **≥1** stea care dă **+1** și se ascunde |
| **Complet (ținta orei)** | Minim + **5** stele + victorie când `scor = 5` |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Setup
- [ ] Variabilă `scor` pe scenă (**pentru toți**)  
- [ ] Steag: scor 0 + erou la start + efecte + sunete  
- [ ] Control cu taste (L4)  

### Pasul 2 — Scor pe stea *(Minim)*
*(Ca la „Încearcă tu — +1 pe o stea”.)*

- [ ] Cel puțin **1** stea cu tiparul: `+1` + `ascunde` + `stop this script`  
- [ ] La steag: steaua **reapare** (`arată`)  
- [ ] Salvat: `Prenume_Nume_L5`  

**→ Minim când:** prinzi o stea, scorul pe ecran trece la 1, steagul resetează tot.

### Pasul 3 — 5 stele + victorie *(Complet)*
*(Ca la „Încearcă tu — victorie”.)*

- [ ] **5** stele pe scenă (același script pe fiecare)  
- [ ] Dacă `scor = 5` → `Ai câștigat!` (+ sunet / `stop all` opțional)  
- [ ] Un coleg înțelege scopul din scorul de pe ecran  
- [ ] Salvat din nou  

**Gata Complet când:** prinzi 5 stele, scorul arată 5, apare mesajul.

---

## Bonus (dacă ai terminat Complet)
- [ ] Variabilă `vieti` (3) — obstacol scade viața; `vieti = 0` → Game Over  
- [ ] La scor 5: sunet de victorie + fundal nou  
- [ ] „Nivel”: la 5 → `setează scor la 0` + `spune` `Nivel trecut!` *(simulare)*  

## Recapitulare rapidă
1. Variabilă = cutie cu nume + număr  
2. Steag = **resetează** (scor + loc + efecte + sunete)  
3. +1 pe **stea** (nu pe erou) + `ascunde` + `stop this script`  
4. `scor = 5` = **preview** operatori; restul la L6  
5. Nume: **`Prenume_Nume_L5`**  

**Quiz scurt (cu profesorul):**  
- Ce face `modifică scorul cu 1`?  
- De ce setăm scorul la 0 pe steag?  
- De ce `stop this script` pe stea după prindere?

## Temă
Opțional: la scor 3 → `spune` `Mai ai puțin!` — `Prenume_Nume_L5`.  
*(Tot cu preview `=` sau, dacă n-ai ajuns la victorie, doar un `dacă scor = 3` pe erou.)*
