# Lecția 5 — Variabile: scor și vieți
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi ții un **număr pe ecran** (scor, vieți) și îl schimbi când se întâmplă ceva.  
> Proiect: **„Prinde 5 stele”** · fișier: `Prenume_L5` (ex. `Ana_L5`)

---

## Obiectiv
La finalul orei poți crea variabile în <span style="color:#FF8C1A;font-weight:700">Variabile</span>, le arăți pe scenă, le **resetezi la steag**, și crești scorul când atingi o stea.

## De ce contează
Fără scor, jocul nu „ține minte” câte stele ai prins.  
**Variabilă** = o cutie cu nume (ex. `scor`) — în engleză: *variable*.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap control + „ce e o cutie cu număr?” |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Prinde 5 stele” |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Creează scorul
1. Categoria <span style="color:#FF8C1A;font-weight:700">Variabile</span> → **Creează o variabilă**  
2. Nume: `scor` (sau `Scor`) — pentru toți / pentru acest personaj: **pentru toți** e ok azi  
3. Bifează ca să fie **arătat pe scenă**  
4. Blocuri:  
   - <span style="color:#FF8C1A;font-weight:700">setează scor la</span> `0`  
   - <span style="color:#FF8C1A;font-weight:700">modifică scorul cu</span> `1`

### 2) Reset la steag
1. Chiar sub steag:  
   <span style="color:#FF8C1A;font-weight:700">setează scor la</span> `0` →  
   (dacă ai vieți) <span style="color:#FF8C1A;font-weight:700">setează vieti la</span> `3` →  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> start  
2. Fără asta, la al doilea joc scorul rămâne 5

### 3) +1 la stea
1. Erou: control cu taste în `forever` (L4)  
2. Stele = alte personaje  
3. Pe **erou**, în forever:  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge</span> `Stea1`  
   **atunci:** <span style="color:#FF8C1A;font-weight:700">modifică scorul cu</span> `1` →  
   pe stea: cel mai simplu azi — **ascunde steaua** din scriptul eroului nu merge direct pe alt personaj;  
   **Pattern clar pentru clasă:**  
   - pe **Stea**: `când se face clic pe steagul verde` → `arată` + du-te la poziție  
   - pe **Erou**, la atingere: `modifică scor cu 1` + **trimite mesajul** „prins1” *(mesajele = L8)*  
   - **Simpler fără mesaj:** la atingere, eroul spune `+1` și **tu** ascunzi steaua manual în test —  
   - **Recomandat M2 L5:** pe Stea, folosește  
     `forever` → `dacă atinge Erou atunci` → `modifică scor cu 1` + `ascunde` + `stop this script`  
     *(scorul e „pentru toți”, deci Steaua îl poate modifica)*

### 4) Victorie (preview operatori)
Când scorul ajunge la 5, vrei un mesaj. Ai nevoie de hexagonul verde  
<span style="color:#59C059;font-weight:700">(scor) = (5)</span> din <span style="color:#59C059;font-weight:700">Operatori</span>.

1. În forever pe erou (sau pe scenă):  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#59C059;font-weight:700">scor = 5</span>  
   **atunci:** <span style="color:#9966FF;font-weight:700">spune</span> `Ai câștigat!` →  
   <span style="color:#FFAB19;font-weight:700">stop all</span> *(opțional; aprofundăm la L7)*  

*Azi e suficient **un** `=` pentru victorie. La L6 exersăm `<` `>` `+` pe îndelete.*

### 5) Vieți (opțional în nucleu, bun în bonus)
1. Variabilă `vieti`, start la 3  
2. Dacă atinge lavă / obstacol → `modifică vieti cu -1`  
3. Dacă `vieti = 0` → `Sfârșitul jocului` (*Game Over* — spui o dată)

---

## Încearcă tu — verifică înainte să continui

- [ ] Variabila `scor` e creată și **vizibilă** pe scenă  
- [ ] La steag: `scor` = 0  
- [ ] Ai făcut scorul să crească cu **+1** măcar o dată  
- [ ] Ai văzut numărul schimbându-se pe scenă  

---

## Greșeli frecvente
1. **Nu apare pe scenă** — nu e bifată variabila în listă.  
2. **Scorul nu crește** — `modifică` e pe personajul greșit / `dacă atinge` nu se declanșează (nume greșit).  
3. **Crește de 100 de ori** — atingerea ține contactul; după prindere: `ascunde` steaua + `așteaptă` scurt.  
4. **La steag rămâne 5** — ai uitat `setează scor la 0`.

---

## De făcut azi — „Prinde 5 stele”
Salvat: `Prenume_L5`

### Pasul 1 — Setup
- [ ] Variabilă `scor` pe scenă  
- [ ] Steag: scor 0 + erou la start  
- [ ] Control cu taste  

### Pasul 2 — Stele
- [ ] Cel puțin **3** stele (ideal 5) pe scenă  
- [ ] La atingere: scor **+1** + steaua dispare (`ascunde`)  
- [ ] La steag: stelele **reapar** (`arată`)  

### Pasul 3 — Victorie
- [ ] Dacă `scor = 5` → mesaj `Ai câștigat!`  
- [ ] Un coleg înțelege scopul din scorul de pe ecran  

**Gata când:** prinzi 5 stele, scorul arată 5, apare mesajul.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] Variabilă `vieti` (3) — obstacol scade viața  
- [ ] La scor 5: sunet de victorie + fundal nou  
- [ ] „Nivel”: la 5 → `setează scor la 0` + `spune` `Nivel trecut!` *(simulare)*  

## Recapitulare rapidă
1. Variabilă = cutie cu nume + număr  
2. Steag = **resetează**  
3. `scor = 5` = primul operator (detaliem la L6)  

**Quiz scurt (cu profesorul):**  
- Ce face `modifică scorul cu 1`?  
- De ce setăm scorul la 0 pe steag?

## Temă
Opțional: la scor 3 → `spune` `Mai ai puțin!` — `Prenume_L5`.
