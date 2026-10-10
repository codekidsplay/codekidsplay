# Lecția 1 — Script, LocalScript și primul `print`
**Modulul 2 · Script Starter**  
**Code Maker Club · Roblox Studio**

> Azi scrii **primul tău cod** în Roblox Studio. Înveți ce e un **Script**, unde apare ce „spune” el (fereastra **Output**) și cum citești o **eroare** fără să te sperii.  
> Place: `Prenume_Nume_M2` — **copie** a Obby-ului din M1 (ex. `Ana_Pop_M2`)  
> *Limbajul în care scriem se numește **Luau**. Seamănă cu Python: se citește aproape ca engleza.*

---

## Obiectiv
La finalul orei ai creat un **Script** care „vorbește” în **Output**, știi că există și **LocalScript**, și ai citit și reparat o **eroare**.  
**Minimum:** Place-ul `Prenume_Nume_M2` salvat + un Script numit `Srv_Salut` cu **cel puțin 2 linii `print`** + le vezi în **Output** după **Play**.  
**Ținta orei (Complet):** Minim + un **comentariu** în cod + o **eroare provocată** (o scrii greșit, o citești în Output, o repari) + un `Cli_Salut` (LocalScript) care printează și el.  
**Regula de aur a modulului:** întâi verificăm că scriptul **rulează fără eroare** în Output; abia apoi ne întrebăm dacă face ce vrem.

## De ce contează
Până acum ai **construit** lumea Obby. Cu un Script îi poți spune lumii **ce să facă**: să dispară o monedă, să se deschidă o ușă.  
Output-ul e „ochiul” tău: acolo vezi ce spune codul și unde a greșit. Un programator care citește Output-ul repară de zece ori mai repede.

**Azi nu mutăm nimic din Obby prin cod.** Azi doar „vorbim”; în lecțiile următoare vom și „face”: schimbăm culori, dăm viață Obby-ului.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + copia Place-ului `_M2` + ce e un script |
| 10–40 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 40–100 | Proiectul „Primul meu script” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi folosim:** Explorer · Output · Script · LocalScript (doar îl cunoaștem) · `print`.  
*(Variabile, if, funcții, evenimente — vin în lecțiile următoare.)*

---

## Pas cu pas

### 1) Copia de lucru `_M2`
Obby-ul din M1 e valoros. Nu-l stricăm: lucrăm pe o **copie**.

1. Deschizi `Prenume_Nume_M1` (Obby-ul tău)  
2. **File → Save to Roblox As…** (sau **Save As…**, după setup-ul clasei)  
3. Nume nou: **`Prenume_Nume_M2`** (ex. `Ana_Pop_M2`)  
4. De acum lucrezi **doar** în `_M2`; `_M1` rămâne ca rezervă

*(Dacă ți-ai pierdut Place-ul din M1, profesorul îți dă un **Place de rezervă** cu un Obby gata făcut.)*

**Încearcă tu — copia (2–3 min)**  
- [ ] Place-ul se numește `Prenume_Nume_M2`  
- [ ] Obby-ul din M1 se vede în Viewport (Spawn, traseu, Finish)  

### 2) Ce e un Script?
Un **Script** e o foaie cu **instrucțiuni** pe care Roblox le citește **de sus în jos**, câte una pe rând. Calculatorul nu ghicește: face exact ce scrii.

| Tip | Cine îl rulează | Pe scurt |
|-----|-----------------|----------|
| **Script** | **serverul** Roblox (computerul „arbitru” al jocului) | merge pentru toți jucătorii |
| **LocalScript** | **calculatorul jucătorului** (clientul) | merge doar pentru acel jucător |

**Azi:** facem un **Script** (server). **LocalScript** îl cunoaștem și îl punem în locul lui corect; diferența o aprofundăm la **L2**.

**Prefix de nume (convenția clasei):**  
- `Srv_…` = Script (**S**e**rv**er)  
- `Cli_…` = LocalScript (**Cli**ent)  
Exemplu: `Srv_Salut`, `Cli_Salut`.

### 3) Deschidem Output
1. Tab **View** → **Output**  
2. Apare o fereastră (de obicei jos). Aici „vorbește” codul.  
3. Textul **negru / alb** = mesaje normale · **galben** = avertisment · **roșu** = **eroare**

**Încearcă tu — Output (1–2 min)**  
- [ ] Output e deschis și îl vezi pe ecran  

### 4) Primul Script
1. În **Explorer**, treci mouse-ul peste **ServerScriptService**  
2. Apare un **+** mic. Click pe el → **Script**  
3. Dublu-click pe Script ca să-l deschizi (se deschide editorul de cod)  
4. Click-dreapta pe Script → **Rename** (sau selectezi și apeși **F2**) → `Srv_Salut`  
5. Scrie în editor (poate exista deja o linie cu `print("Hello world!")` — o poți șterge sau păstra):

```lua
print("Salut din Obby!")
print("Sunt prima mea linie de cod.")
```

6. Apeși **Play** (săgeata albastră)  
7. Te uiți în **Output**: apar cele două mesaje  
8. **Stop** (pătratul roșu)

*Atenție:* scriptul **rulează la Play**. În modul de editare, scriptul „doarme”.

Cum se citește linia:  
- `print` = „afișează”  
- `( … )` = paranteze: ce afișăm stă înăuntru  
- `"…"` = ghilimele: **textul** de afișat

**Încearcă tu — primele mesaje (4–5 min)**  
- [ ] Script numit `Srv_Salut` în **ServerScriptService**  
- [ ] Play → în Output vezi **ambele** mesaje  
- [ ] Stop → ești în editare  

### 5) Cum aleg unde pun Script-ul?
Un Script obișnuit rulează dacă stă în:

| Loc | La ce folosește |
|-----|-----------------|
| **ServerScriptService** | cod „general” al jocului (casa lui firească) |
| **Workspace** / **înăuntrul unui Part** | cod care ține de **acel obiect** (vom face asta din L3) |

Azi stăm în **ServerScriptService**.

### 6) Comentarii
Un **comentariu** începe cu `--`. Roblox îl **ignoră**; e o notiță pentru tine și pentru colegi.

```lua
-- Acesta e un comentariu: Roblox nu îl citește
print("Salut din Obby!") -- și aici pot lăsa o notiță
```

**Încearcă tu — comentariu (2 min)**  
- [ ] Ai un comentariu cu `--`  
- [ ] Play: mesajele sunt la fel (comentariul nu apare în Output)  

### 7) Prima eroare — nu e un pericol
Erorile **te ajută**. Roblox îți spune **ce** a mers prost și **la ce linie**.

1. În script, scrie **greșit** o linie: `prnt("Salut")` (fără `i`)  
2. Play. Output-ul arată **roșu**, de felul: *„attempt to call a nil value”* sau *„Unknown global”*, plus numele scriptului și **numărul liniei**  
3. Click pe mesajul roșu: Studio te duce la linia cu problema  
4. Repari: `print("Salut")`  
5. Play: acum e ok

**Cum citim o eroare (3 întrebări):**  
1. **În ce script** e? (numele apare în mesaj)  
2. **La ce linie**? (numărul de după nume)  
3. **Ce spune** mesajul? (de obicei: ai scris ceva greșit sau ai uitat ceva)

> Mesajele sunt în engleză, dar ai nevoie doar de numele scriptului și numărul liniei.

**Încearcă tu — eroare citită (4–5 min)**  
- [ ] Ai provocat o eroare (roșu în Output)  
- [ ] Ai găsit linia  
- [ ] Ai reparat-o · Play fără roșu  

### 8) LocalScript — îl punem la locul lui *(Complet)*
LocalScript **nu** merge oriunde. Locul lui obișnuit pentru jucător: **StarterPlayer → StarterPlayerScripts**.

1. În **Explorer**, deschide **StarterPlayer** (săgeata de lângă el)  
2. Mouse peste **StarterPlayerScripts** → **+** → **LocalScript**  
3. Redenumește: `Cli_Salut`  
4. Scrie:

```lua
print("Salut de la jucător (client)!")
```

5. Play → în Output vezi **și** mesajele din `Srv_Salut`, **și** mesajul din `Cli_Salut`

*De ce două?* Unul vine de la **server**, altul de la **jucătorul tău**. Mâine (L2) aflăm de ce contează diferența.

**Încearcă tu — LocalScript (3–4 min)**  
- [ ] `Cli_Salut` în **StarterPlayerScripts**  
- [ ] În Output apar mesajele din ambele scripturi  

---

## Greșeli frecvente
1. **„Nu apare nimic în Output”** — Output-ul nu e deschis (View → Output) sau n-ai apăsat **Play**.  
2. **Ai scris `Print` cu P mare** — Luau deosebește literele mari de cele mici: scrie **`print`**.  
3. **Ai uitat o ghilimea sau o paranteză** — `print("Salut)` → roșu în Output; verifică că ai `"` la început **și** la sfârșit și `)` la capăt.  
4. **LocalScript pus în ServerScriptService** — nu rulează acolo; mută-l în **StarterPlayerScripts**.  
5. **Lucrezi din greșeală în `_M1`** — verifică numele Place-ului sus în fereastră: trebuie să fie `…_M2`.  
6. **Ai șters din greșeală scriptul** — **Ctrl+Z** (Mac: Cmd+Z) sau creezi altul.

---

## De făcut azi — „Primul meu script”
Salvat: `Prenume_Nume_M2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Place `_M2` + `Srv_Salut` cu **≥2** `print` + mesajele apar în Output la Play |
| **Complet (ținta orei)** | Minim + **comentariu** `--` + **eroare** provocată, citită și reparată + `Cli_Salut` care printează |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Place + Output
- [ ] Copie salvată `Prenume_Nume_M2`  
- [ ] Output deschis  

### Pasul 2 — Script *(Minim)*
- [ ] `Srv_Salut` în ServerScriptService  
- [ ] **≥2** linii `print` (una cu numele tău, ex. `print("Eu sunt Ana")`)  
- [ ] Play → mesajele în Output · Stop · salvat  

**→ Minim când:** un coleg vede în Output mesajele tale și **nu** vede roșu.

### Pasul 3 — Comentariu, eroare, LocalScript *(Complet)*
- [ ] Un comentariu cu `--`  
- [ ] Ai provocat o eroare, ai citit linia, ai reparat  
- [ ] `Cli_Salut` în StarterPlayerScripts, cu un `print`  
- [ ] Play: apar mesajele din **ambele** scripturi · salvat  

**Gata Complet când:** Output-ul arată mesajele ambelor scripturi, fără roșu.

---

## Bonus (dacă ai terminat Complet)
- [ ] Un al treilea `print` care afișează un **număr** (ex. `print(2026)`) — **fără** ghilimele; observi diferența față de text  
- [ ] `print(5 + 3)` — Roblox **calculează**: ce apare în Output?  
- [ ] Un `print` cu **mai multe lucruri**, separate prin virgulă: `print("Salut", "lume", 7)`  

## Recapitulare rapidă
1. **Script** = cod pe **server** · **LocalScript** = cod pe **jucător**  
2. Prefix: `Srv_` pentru Script, `Cli_` pentru LocalScript  
3. `print("text")` afișează în **Output** (View → Output)  
4. Comentariu = `--` (Roblox îl ignoră)  
5. Eroare = **roșu**; citești **script + linie + mesaj**; nu e o catastrofă  

**Quiz scurt (cu profesorul):**  
- Unde vezi ce spune codul tău?  
- Ce înseamnă prefixul `Srv_` și ce înseamnă `Cli_`?  
- Ce faci când vezi o linie roșie în Output?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai rămas blocat, profesorul poate arăta pe proiector un `Srv_Salut` de 3 linii.)*

## Temă
Opțional: acasă (dacă ai Studio) redeschizi `Prenume_Nume_M2` și scrii un script care afișează **numele a 3 prieteni** (3 linii `print`).  
La **L2** aflăm de ce Roblox are **două** feluri de scripturi: **client vs server**.
