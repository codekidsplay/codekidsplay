# Lecția 7 — Depanare: cum vânezi un bug
**Modulul 4 · Game Creator**  
**Code Maker Club · Roblox Studio**

> Un **bug** e o greșeală dintr-un program. Toți programatorii fac bug-uri — meseria lor e să le **găsească și să le repare**. Azi înveți o **metodă** (nu doar „încerc ceva și vedem") și o folosești pe lista de la playtest.  
> Place: `Prenume_Nume_M4` (ex. `Ana_Pop_M4`)

---

## Obiectiv
La finalul orei folosești o **metodă în 5 pași** ca să găsești și să repari bug-uri, și ai rezolvat **primele probleme** din lista ta de la L6.  
**Minimum:** rezolvi corect **3 bug-uri** (din exercițiul de mai jos **și/sau** din lista ta), fiecare cu metoda în 5 pași + **retest** + Output curat.  
**Ținta orei (Complet):** Minim + rezolvi **toate cele 6** bug-uri din „Vânătoarea de bug-uri" + repari **primele 3** din lista ta de la L6 + faci un **test complet al jocului** (de la Spawn la Finish și înapoi) + actualizezi lista (Rezolvat / Amânat).

## De ce contează
Un programator începător, când ceva nu merge, schimbă 10 lucruri și speră. Un programator bun **citește mesajul**, **ghicește unde**, schimbă **un singur lucru** și verifică. E mai rapid și te învață mai mult.

**Un bug nu e un eșec.** E o informație despre ce nu ai gândit încă.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + metoda în 5 pași |
| 10–35 | Cum citim un mesaj de eroare (**Încearcă tu**) |
| 35–75 | **Vânătoarea de bug-uri** (6 exerciții) |
| 75–110 | Repari bug-urile **tale** din lista L6 |
| 110–120 | Test complet, recap, salvare |

**Azi folosim:** **Output** · `print` / `warn` · **breakpoint** (profesorul arată) · lista ta de la L6.

---

## Pas cu pas

### 1) Metoda în 5 pași
| # | Pas | Întrebare |
|---|-----|-----------|
| 1 | **Reproduc** | Pot face bug-ul să apară **de fiecare dată**? Cum? |
| 2 | **Citesc** | Ce spune **Output**-ul? În ce script, la ce linie? |
| 3 | **Izolez** | Unde **exact** se strică? (adaug `print`-uri) |
| 4 | **Repar** | Schimb **un singur lucru** și mă gândesc **de ce** e greșit |
| 5 | **Retestez** | A dispărut bug-ul? Am stricat altceva? |

**Regula de aur:** schimbă **un lucru odată**. Dacă schimbi cinci și merge, nu știi care a ajutat; dacă nu merge, nu știi care a stricat.

### 2) Cum citim un mesaj de eroare
Un mesaj arată cam așa:

```
ServerScriptService.Srv_Inamic:18: attempt to index nil with 'Health'
```

| Parte | Înseamnă |
|-------|----------|
| `ServerScriptService.Srv_Inamic` | **scriptul** cu problema |
| `:18` | **linia** 18 |
| `attempt to index nil with 'Health'` | încerci să iei `.Health` dintr-un lucru care e **`nil`** (nu există) |

**Click** pe mesaj și Studio te duce la linia respectivă.

**Mesaje frecvente (le-ai întâlnit deja):**

| Mesaj | Ce înseamnă de obicei | Ce verifici |
|-------|----------------------|-------------|
| `attempt to index nil with 'X'` | obiectul dinainte e `nil` | numele scris corect? există **deja**? |
| `X is not a valid member of Y` | `Y` nu are nimic numit `X` | numele din Explorer vs din cod |
| `Infinite yield possible on …` *(galben)* | `WaitForChild` așteaptă ceva care nu apare | numele/locul obiectului |
| `attempt to call a nil value` | chemi o funcție care nu există (încă) | ortografia; ordinea (definiție înainte de apel) |
| `attempt to perform arithmetic on nil` | calculezi cu ceva care e `nil` | variabila e setată? |
| `Expected 'end'` / `Expected 'then'` | sintaxă: ai uitat ceva | `end`, `then`, `do`, paranteze |
| `Script timeout: exhausted allowed execution time` | `while` fără `task.wait` | pauza din buclă |
| mesaje despre `API Services` / DataStore | setarea Studio sau rețea | Game Settings → Security |

**Încearcă tu — citirea (4–5 min)**  
- [ ] Alegi 3 mesaje din tabel și explici **fiecare cu vorbele tale**  
- [ ] Provoci o eroare `is not a valid member` (scrii greșit un nume) și o repari

### 3) Instrumentele
| Instrument | Pentru ce |
|------------|-----------|
| **Output** | mesaje, erori, avertismente |
| **`print("aici 1")`** | „am ajuns la linia asta?" · „ce valoare are variabila?" |
| **`warn("text")`** | ca `print`, dar **galben** — se vede mai bine |
| **Breakpoint** | oprește scriptul la o linie și îți arată valorile *(click lângă numărul liniei; profesorul arată)* |
| **Script Analysis** | semnalează în editor greșeli de scriere (subliniere) |

**Tehnica `print`:** pui `print("1")`, `print("2")`, `print("3")` între pași. Cel mai mare număr care apare te arată **până unde** a ajuns codul.

### 4) Vânătoarea de bug-uri
Pentru fiecare cod: (a) ce **ar trebui** să facă, (b) **unde** e bug-ul, (c) cum îl repari. Poți **copia codul într-un `Srv_Test`** (temporar) și să-l rulezi. Ai grijă să nu lași scripturile de test în joc.

**Bug 1**
```lua
local scor = 5
if scor > 3
    print("Bravo")
end
```

**Bug 2**
```lua
local finish = workspace:WaitForChild("Finnish")
print("Am găsit Finish-ul: " .. finish.Name)
```

**Bug 3**
```lua
local vieti = 3
if vieti = 0 then
    print("Game over")
end
```

**Bug 4**
```lua
while true do
    print("Verific...")
end
```

**Bug 5**
```lua
local Players = game:GetService("Players")
local finish = workspace:WaitForChild("Finish")

finish.Touched:Connect(function(hit)
    local player = Players:GetPlayerFromCharacter(hit.Parent)
    if player then
        player.leaderstats.Victorii.Value += 1
    end
end)
```
*(Indiciu: ce se întâmplă când stai pe `Finish`? De câte ori primești victoria?)*

**Bug 6** — un `LocalScript` (în StarterPlayerScripts):
```lua
local player = game:GetService("Players").LocalPlayer
local monede = player:WaitForChild("leaderstats"):WaitForChild("Monede")
monede.Value += 100
```
*(Indiciu: crește scorul „pe bune"? Ce vede serverul?)*

**Încearcă tu — vânătoarea (30–35 min)**  
- [ ] Ai rezolvat **cel puțin 3** din 6 (Minim)  
- [ ] Ai rezolvat **toate 6** (Complet)  
- [ ] Pentru fiecare: ai spus **ce mesaj** ai primit și **ce ai schimbat**

### 5) Bug-urile tale — din lista L6
Deschide lista ta de la L6, **primele 3** (Blocant → Important). Pentru **fiecare**, folosește cei 5 pași și completează:

| # | Bug | Ce am observat | Unde (script/linie) | Ce am schimbat | Retest |
|---|-----|----------------|---------------------|----------------|--------|
| 1 | | | | | ☐ |
| 2 | | | | | ☐ |
| 3 | | | | | ☐ |

**Încearcă tu — repari (30–35 min)**  
- [ ] Cel puțin **3** bug-uri rezolvate (din exercițiu **sau** din lista ta)  
- [ ] Fiecare: **retestat**  
- [ ] Output curat

### 6) Testul complet („smoke test") *(Complet)*
După ce repari, **retestezi tot jocul**, pas cu pas, ca să te asiguri că **nu ai stricat altceva**:

- [ ] Pornește de la Spawn, fără erori  
- [ ] Monedele dau puncte și reapar  
- [ ] Checkpoint-urile salvează etapa  
- [ ] Căderea te trimite la checkpoint  
- [ ] Inamicul lovește corect  
- [ ] Magazinul vinde o singură dată  
- [ ] Finish dă recompensa o singură dată  
- [ ] Ieși și intri: scorul e salvat  
- [ ] Output curat de la un capăt la altul

### 7) Actualizezi lista *(Complet)*
Pentru fiecare problemă din lista L6 pui o **stare**:

| Stare | Înseamnă |
|-------|----------|
| **Rezolvat** | reparat și retestat |
| **Amânat** | știu de el, nu îl repar acum (și știu de ce) |
| **Nu e bug** | e un lucru intenționat; schimb explicația din joc |

*E în regulă să amâni lucruri mici. Nu e în regulă să **amâni** un bug blocant.*

---

## Greșeli frecvente
1. **Schimbi mai multe lucruri deodată** — nu știi ce a reparat/stricat.  
2. **Nu citești Output-ul** — mesajul îți spune deja scriptul și linia.  
3. **Ștergi codul „care nu merge"** — mai întâi înțelegi de ce nu merge.  
4. **Ghicești fără să verifici** — pui `print` și vezi.  
5. **Nu retestezi tot** — repari un lucru și strici altul.  
6. **Lași `print`-urile de test** în joc — le ștergi la final.  
7. **Lași scripturile de test** (`Srv_Test`) în joc — le ștergi.  
8. **Ceri ajutor fără să încerci pașii** — profesorul întreabă mai întâi: „Ce a spus Output-ul?"  
9. **Te superi** — e normal să fie greu; metoda te ajută.  
10. **Repari simptomul, nu cauza** — de ex. pui `if x then` ca să ascunzi eroarea, deși x nu ar trebui să lipsească niciodată.

---

## De făcut azi — „Vânătorul de bug-uri"
Salvat: `Prenume_Nume_M4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | **3** bug-uri rezolvate cu cei 5 pași + retest + **Output curat** |
| **Complet (ținta orei)** | Minim + **toate 6** bug-urile din vânătoare + primele **3** din lista L6 + test complet + lista actualizată |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Metoda
- [ ] Cei 5 pași știuți  
- [ ] 3 mesaje explicate

### Pasul 2 — Reparații *(Minim)*
- [ ] 3 bug-uri rezolvate  
- [ ] Retest · Output curat · salvat  

**→ Minim când:** poți explica unui coleg **cum ai găsit** un bug.

### Pasul 3 — Totul *(Complet)*
- [ ] 6/6 din vânătoare  
- [ ] 3 din lista ta  
- [ ] Test complet + lista actualizată  
- [ ] Salvat  

**Gata Complet când:** jocul se joacă de la început la sfârșit **fără nicio linie roșie** în Output.

---

## Bonus (dacă ai terminat Complet)
- [ ] Creezi **un bug** într-o copie a jocului și îl dai unui coleg să-l găsească  
- [ ] Scrii un **raport de bug** (Ce am făcut / Ce s-a întâmplat / Ce mă așteptam / Cât de grav)  
- [ ] Folosești un **breakpoint** (cu profesorul) și citești valorile variabilelor  
- [ ] Faci o **listă a celor mai frecvente 5 bug-uri** ale tale, cu cum le recunoști

## Recapitulare rapidă
1. **Metoda:** Reproduc → Citesc → Izolez → Repar (**un lucru odată**) → Retestez  
2. Mesajul de eroare spune **scriptul**, **linia**, **problema**  
3. **`print`** îți arată până unde a ajuns codul  
4. După reparație retestezi **tot jocul**  
5. Bug-urile blocante se repară **primele**

**Quiz scurt (cu profesorul):**  
- Care sunt cei 5 pași ai metodei?  
- Ce înseamnă `attempt to index nil with 'X'`?  
- De ce schimbi **un singur lucru** odată?

## Exemplu / referință (opțional, la final)
*(Încearcă **întâi** singur toate cele 6. Abia apoi compară.)*

| Bug | Problema | Reparația |
|-----|----------|-----------|
| 1 | lipsește `then` | `if scor > 3 then` |
| 2 | `Finnish` ≠ `Finish` (nume greșit → *Infinite yield*) | `WaitForChild("Finish")` |
| 3 | `=` în loc de `==` în condiție | `if vieti == 0 then` |
| 4 | `while true` fără pauză → *Script timeout* | adaugi `task.wait(1)` în buclă |
| 5 | `Touched` se repetă → recompensă multiplă | frână (un `Attribute` ca `Terminat`, ca la M3 L8) |
| 6 | un `LocalScript` schimbă scorul **doar la client**; serverul nu vede schimbarea | scorul se schimbă **doar** dintr-un `Script` (serverul decide) |

## Temă
Opțional: ține un **jurnal de bug-uri** o săptămână: scrie fiecare eroare pe care o vezi (la Roblox sau în altă parte) și cum a fost rezolvată.  
La **L8** pregătim jocul pentru **publicare**.
