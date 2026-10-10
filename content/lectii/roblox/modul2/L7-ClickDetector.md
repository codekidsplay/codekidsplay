# Lecția 7 — ClickDetector (click pe un Part)
**Modulul 2 · Script Starter**  
**Code Maker Club · Roblox Studio**

> Azi Obby-ul tău primește un **buton**: apeși pe un Part cu mouse-ul și apare o platformă. Înveți al doilea eveniment important din Roblox: **click**.  
> Place: `Prenume_Nume_M2` (ex. `Ana_Pop_M2`)

---

## Obiectiv
La finalul orei pui un **ClickDetector** pe un Part, îi conectezi o funcție, și folosești un da/nu (`true`/`false`) ca să „răsucești” starea unei platforme (apare / dispare).  
**Minimum:** un `Buton` care la **click** schimbă culoarea și afișează în Output **numele jucătorului** care a apăsat · **0 erori**.  
**Ținta orei (Complet):** Minim + `Platforma_Ascunsa` care la fiecare click **apare / dispare** (solidă ↔ fantomă) folosind `not`.

## De ce contează
`Touched` reacționează când **calci**. Dar multe lucruri se petrec când **alegi** tu: apeși pe un buton, pe o manetă, pe o ușă.  
ClickDetector e cea mai simplă cale de a face asta, fără butoane pe ecran.

**Azi nu folosim bucle și nici ecrane (GUI).** Click direct pe lume.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + diferența `Touched` / click |
| 10–40 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 40–100 | Proiectul „Butonul magic” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi folosim:** `ClickDetector` · `MouseClick` · parametrul `jucator` · `not` · funcții pentru ordine.

---

## Pas cu pas

### 1) Touched vs click
| | `Touched` | `MouseClick` |
|--|-----------|--------------|
| **Când** | un Part **atinge** Part-ul tău | jucătorul **dă click** pe Part |
| **Ce primești** | `hit` = Part-ul care a atins | `jucator` = **jucătorul** care a dat click |
| **Unde îl pui** | direct pe Part | pe un **ClickDetector** din Part |

Ambele sunt **evenimente**: legi o funcție cu `:Connect(…)`, ca în L6.

### 2) Adaugi ClickDetector
1. Pune în Obby un Part mic: **`Buton`** — lângă Spawn sau pe traseu, **Anchor**, roșu  
2. Explorer: mouse peste `Buton` → **+** → **ClickDetector**  
3. Tot pe `Buton`: **+** → **Script** → `Srv_Buton`  
4. În Explorer, sub `Buton`, ar trebui să ai **două** lucruri: `ClickDetector` și `Srv_Buton`

În **Properties** la `ClickDetector` vezi **MaxActivationDistance** = cât de aproape trebuie să fii ca să poți apăsa (în „studs”, unitățile Roblox; implicit **32**).

**Încearcă tu — pregătirea (3 min)**  
- [ ] `Buton` ancorat, cu `ClickDetector` și `Srv_Buton` în el  
- [ ] Ai găsit `MaxActivationDistance` în Properties  

### 3) Primul click
Scrie în `Srv_Buton`:

```lua
local buton = script.Parent
local detector = buton.ClickDetector

local function cuClick(jucator)
    print(jucator.Name .. " a apăsat butonul!")
end

detector.MouseClick:Connect(cuClick)
```

- `buton.ClickDetector` = obiectul `ClickDetector` din `Buton` (nume exact!)  
- `MouseClick` = semnalul „cineva a dat click pe mine”  
- `jucator` = jucătorul care a dat click (Roblox îl trimite singur)

Play → te apropii de buton → cursorul se schimbă când ești peste el → **click** → mesaj în Output.

*Pe telefon / tabletă merge cu atingere pe ecran.*

**Încearcă tu — primul click (4–5 min)**  
- [ ] Output: `NumeleTău a apăsat butonul!`  
- [ ] Dacă ești prea departe, nu merge → te apropii  

### 4) Butonul își schimbă culoarea
Adaugă în `cuClick` o linie:

```lua
local function cuClick(jucator)
    print(jucator.Name .. " a apăsat butonul!")
    buton.Color = Color3.fromRGB(0, 200, 0)
end
```

Acum, la click, butonul devine verde (și rămâne). Verifică în Play.

**Încearcă tu — culoare la click (2–3 min)**  
- [ ] Butonul devine verde la click  
- [ ] Output: fără roșu  

### 5) Comutator: apare / dispare *(Complet)*
Idee: apeși → platforma ascunsă **apare**; apeși din nou → **dispare**.

1. Pune o platformă: **`Platforma_Ascunsa`** (Anchor), ca **scurtătură opțională** peste un gol (nu pe singurul drum obligatoriu)  
2. În `Srv_Buton` înlocuiești tot cu:

```lua
local buton = script.Parent
local detector = buton.ClickDetector
local tinta = workspace.Platforma_Ascunsa

local vizibila = false

local function actualizeaza()
    if vizibila then
        tinta.Transparency = 0
        tinta.CanCollide = true
        buton.Color = Color3.fromRGB(0, 200, 0)
    else
        tinta.Transparency = 0.8
        tinta.CanCollide = false
        buton.Color = Color3.fromRGB(200, 0, 0)
    end
end

local function cuClick(jucator)
    vizibila = not vizibila
    actualizeaza()
    print(jucator.Name .. " a apăsat butonul. Vizibilă: " .. tostring(vizibila))
end

actualizeaza()
detector.MouseClick:Connect(cuClick)
```

Cum se citește:  
- `vizibila = not vizibila` = **răsucește** valoarea: `false` devine `true`, `true` devine `false`  
- `actualizeaza()` = o funcție care pune platforma și butonul în starea potrivită  
- `tostring(vizibila)` = transformă `true`/`false` în text, ca să-l poți lipi cu `..`  
- `actualizeaza()` chemat o dată, **la început**, ca să pornești într-o stare corectă

*Funcția `actualizeaza` face ce învățasem la **L5**; `if` și `not`, la **L4**. Totul se leagă.*

**Încearcă tu — comutatorul (6–8 min)**  
- [ ] La Play: platforma e „fantomă”, butonul **roșu**  
- [ ] Click: platforma devine **solidă**, butonul **verde**  
- [ ] Click din nou: revine fantomă  
- [ ] Poți trece peste platformă cât e solidă  

### 6) Doar de aproape *(Complet)*
Poți schimba din cod distanța de la care merge click-ul:

```lua
detector.MaxActivationDistance = 10
```

E util pentru ca un buton din capătul lumii să nu poată fi apăsat de la distanță.

**Încearcă tu — distanța (2–3 min)**  
- [ ] Setezi `MaxActivationDistance = 10`  
- [ ] La 15 studs de buton, click-ul **nu** merge · la 5 merge  

---

## Greșeli frecvente
1. **Lipsește ClickDetector** — eroare: *„ClickDetector is not a valid member of Part”*; adaugă-l (**+** pe Part → ClickDetector).  
2. **ClickDetector pe alt Part decât scriptul** — scriptul și detectorul trebuie să fie **în același Part** (cum e scris acum).  
3. **Click din prea departe** — apropie-te sau crește `MaxActivationDistance`.  
4. **`Platforma_Ascunsa` scrisă altfel** — numele cu **exact** aceleași litere ca în Explorer.  
5. **Ai folosit `hit`** — la click parametrul e `jucator`, nu `hit`.  
6. **`.. vizibila`** (boolean cu `..`) — dă eroare; scrie `tostring(vizibila)`.  
7. **Platforma ascunsă pe singurul drum** — jucătorul care nu găsește butonul rămâne blocat; fă-o scurtătură.

---

## De făcut azi — „Butonul magic”
Salvat: `Prenume_Nume_M2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `Buton` cu `ClickDetector` și `Srv_Buton` · la click: mesaj cu numele jucătorului + culoare schimbată · **0 erori** |
| **Complet (ținta orei)** | Minim + `Platforma_Ascunsa` care apare / dispare la fiecare click (`not`) |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Pregătire
- [ ] `Buton` + `ClickDetector` + `Srv_Buton`  

### Pasul 2 — Click *(Minim)*
- [ ] `MouseClick:Connect(cuClick)`  
- [ ] Mesaj + culoare  
- [ ] Play · Stop · salvat  

**→ Minim când:** un coleg dă click pe buton și vede reacția.

### Pasul 3 — Comutatorul *(Complet)*
- [ ] `Platforma_Ascunsa`  
- [ ] `vizibila = not vizibila` + `actualizeaza()`  
- [ ] Traseul Obby **rămâne terminabil** și fără buton  
- [ ] Play · salvat  

**Gata Complet când:** apeși, platforma apare; apeși, dispare — și poți să și traversezi pe ea.

---

## Bonus (dacă ai terminat Complet)
- [ ] O **frână** (ca la L6): după click, butonul nu mai merge 2 secunde (`task.wait(2)` + variabilă `liber`)  
- [ ] **Al doilea buton** pentru altă platformă (copie script, alt nume în `workspace.…`)  
- [ ] Butonul scrie în Output **câte click-uri** a primit (variabilă `numarClick` crescută cu 1 la fiecare apăsare)  
- [ ] La click, platforma apare și **dispare singură** după 3 secunde (`task.wait(3)`)

## Recapitulare rapidă
1. **ClickDetector** pe Part + `MouseClick:Connect(funcție)`  
2. La click, funcția primește **jucătorul** (nu `hit`)  
3. `x = not x` răsucește un da/nu  
4. `tostring(…)` face din `true`/`false` un text de lipit cu `..`  
5. `MaxActivationDistance` = de la cât de departe merge click-ul  

**Quiz scurt (cu profesorul):**  
- Ce primește funcția la `MouseClick`?  
- Ce face `vizibila = not vizibila`?  
- De ce `Platforma_Ascunsa` nu e bine să fie pe singurul drum?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector butonul care comută platforma.)*

## Temă
Opțional: un **întrerupător de lumină** — un Part `Intrerupator` care, la click, aprinde / stinge `Lampa` din L5 (aceeași idee cu `not`).  
La **L8** învățăm **bucle** (`for`, `while`): codul care se **repetă** singur.
