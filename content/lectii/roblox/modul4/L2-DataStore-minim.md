# Lecția 2 — DataStore: jocul își amintește
**Modulul 4 · Game Creator**  
**Code Maker Club · Roblox Studio**

> Până acum, când ieșeai din joc, **totul se pierdea**. Azi înveți **DataStore**: „caietul" din care jocul tău citește și în care scrie, ca **monedele tale să rămână** și data viitoare.  
> Place: `Prenume_Nume_M4` (ex. `Ana_Pop_M4`)

---

## Obiectiv
La finalul orei jocul tău **salvează** numărul de monede când ieși și îl **încarcă** când intri din nou.  
**Minimum:** `Mod_Salvare` + `Srv_Salvare` care salvează și încarcă **o valoare** (`Monede`), folosind `pcall` · la al doilea Play, monedele sunt **la fel** ca la ieșire · **0 erori** în Output.  
**Ținta orei (Complet):** Minim + salvezi **două** valori (`Monede` și `Victorii`) într-o **tabelă** + **autosalvare** la fiecare 60 de secunde.

## De ce contează
Un joc în care **nu rămâne nimic** nu te face să revii. Salvarea e ceea ce transformă un Obby într-un joc la care te întorci: „mâine termin ce n-am terminat azi".

**Azi salvăm doar numere simple.** Nu salvăm obiecte, nu salvăm date personale.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Obiectiv + ce e un DataStore + setările Studio |
| 15–55 | Pas cu pas: `pcall` + modulul de salvare (**Încearcă tu**) |
| 55–105 | Proiectul „Monede care rămân" (vezi **Minim vs Complet**) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `DataStoreService` · `GetAsync` / `SetAsync` · `pcall` · `UserId` · `PlayerRemoving` · `BindToClose` · `task.spawn`.

---

## Pas cu pas

### 1) Ce e un DataStore?
Un **DataStore** e un „caiet" în **cloud**, ținut de Roblox pentru **jocul tău**.

- Fiecare jucător are o **filă** în caiet, cu un nume unic: o **cheie** (`key`)  
- **Serverul** poate **citi** și **scrie** în el (clientul **nu**, niciodată)  
- Datele **rămân** după ce ieși din joc

Cheia o facem din **`UserId`** — un număr unic al fiecărui cont Roblox. **Nu** folosim numele jucătorului (pentru că un nume se poate schimba).

```
Caiet "Obby_Monede_v1"
 ├── Jucator_123456  →  12
 └── Jucator_789012  →  40
```

### 2) Pregătim Studio
Pentru ca DataStore să meargă **în Studio**, trebuie două lucruri:

1. Place-ul e **salvat pe Roblox** (File → **Save to Roblox**; tu l-ai salvat deja de la M1)  
2. Setarea de securitate: **Home → Game Settings → Security →** bifezi **Enable Studio Access to API Services** → **Save**

*(Fără ea, în Output apare o eroare despre „API Services". Dacă meniul arată diferit în versiunea ta, profesorul ți-l arată.)*

**Încearcă tu — setarea (3 min)**  
- [ ] Place salvat pe Roblox  
- [ ] **Enable Studio Access to API Services** e bifat

### 3) `pcall` — „încearcă, dar nu te prăbuși"
Operațiile cu cloud-ul pot **eșua** (internet, probleme la Roblox). Dacă dau eroare **neprinsă**, tot scriptul se oprește. Soluția: **`pcall`** („protected call").

```lua
local ok, rezultat = pcall(function()
    return 10 / 2
end)

print(ok)         -- true
print(rezultat)   -- 5
```

Dacă înăuntru apare o eroare:

```lua
local ok, rezultat = pcall(function()
    error("ceva a mers prost")
end)

print(ok)         -- false
print(rezultat)   -- mesajul erorii
```

- `ok` = `true` dacă a mers, `false` dacă a dat eroare  
- `rezultat` = ce a **întors** funcția, sau **mesajul erorii**

*La salvare vom verifica **mereu** `ok`.*

**Încearcă tu — pcall (3–4 min)**  
- [ ] Rulezi ambele variante într-un `Srv_Test` (temporar) și vezi `true` / `false`  
- [ ] Ștergi `Srv_Test`

### 4) Modulul `Mod_Salvare`
**ServerScriptService** → **+** → **ModuleScript** → **`Mod_Salvare`**:

```lua
local DataStoreService = game:GetService("DataStoreService")
local ServerScriptService = game:GetService("ServerScriptService")

local Statistici = require(ServerScriptService:WaitForChild("Mod_Statistici"))

local magazin = DataStoreService:GetDataStore("Obby_Monede_v1")

local Salvare = {}

local function cheiePentru(player)
    return "Jucator_" .. player.UserId
end

function Salvare.incarca(player)
    local ok, rezultat = pcall(function()
        return magazin:GetAsync(cheiePentru(player))
    end)

    if ok then
        Statistici.seteaza(player, "Monede", rezultat or 0)
        player:SetAttribute("DateIncarcate", true)
        print("Încărcat pentru " .. player.Name .. ": " .. (rezultat or 0) .. " monede")
    else
        warn("Nu am putut citi datele pentru " .. player.Name .. ": " .. tostring(rezultat))
    end
end

function Salvare.salveaza(player)
    if not player:GetAttribute("DateIncarcate") then
        return                                   -- protecție: nu scriem peste date necitite
    end

    local valoare = Statistici.ia(player, "Monede")

    local ok, eroare = pcall(function()
        magazin:SetAsync(cheiePentru(player), valoare)
    end)

    if ok then
        print("Salvat pentru " .. player.Name .. ": " .. valoare .. " monede")
    else
        warn("Nu am putut salva pentru " .. player.Name .. ": " .. tostring(eroare))
    end
end

return Salvare
```

Cum se citește:  
- `GetDataStore("Obby_Monede_v1")` = „deschide caietul cu numele ăsta" (dacă nu există, se creează)  
- `GetAsync(cheie)` = citește fila (întoarce **`nil`** dacă jucătorul e nou) → de aceea `rezultat or 0`  
- `SetAsync(cheie, valoare)` = scrie în filă  
- Folosim `Statistici.ia` / `Statistici.seteaza` din **L1** (iată de ce ne-a folosit modulul)  
- **Protecția `DateIncarcate`:** dacă citirea a **eșuat**, nu salvăm deloc — altfel am scrie **0** peste monedele bune ale jucătorului!

**Încearcă tu — modulul de salvare (8–10 min)**  
- [ ] `Mod_Salvare` fără roșu în editor  
- [ ] Ai înțeles de ce `salveaza` nu face nimic dacă `DateIncarcate` lipsește (explici în 1–2 propoziții)

### 5) `Srv_Salvare` — când citim și când scriem
În **ServerScriptService**, script nou `Srv_Salvare`:

```lua
local Players = game:GetService("Players")
local ServerScriptService = game:GetService("ServerScriptService")

local Salvare = require(ServerScriptService:WaitForChild("Mod_Salvare"))

local function laIntrare(player)
    player:WaitForChild("leaderstats")      -- așteptăm să existe scorul
    Salvare.incarca(player)
end

Players.PlayerAdded:Connect(laIntrare)

for _, player in Players:GetPlayers() do
    task.spawn(laIntrare, player)           -- pentru cei deja intrați
end

Players.PlayerRemoving:Connect(Salvare.salveaza)

game:BindToClose(function()
    for _, player in Players:GetPlayers() do
        Salvare.salveaza(player)
    end
end)
```

Ce e nou:  
- **`PlayerRemoving`** = „un jucător pleacă" → salvăm  
- **`game:BindToClose(...)`** = „serverul se închide" → salvăm **toți** jucătorii rămași (în Studio, când apeși **Stop**)  
- **`task.spawn(functie, argument)`** = pornește funcția **separat**, ca bucla să nu aștepte la `WaitForChild` după fiecare jucător

**Încearcă tu — salvezi și încarci (10–12 min)**  
1. Play → iei **3 monede** → în Output apare `Încărcat pentru …: 0 monede`  
2. **Stop** → în Output vezi `Salvat pentru …: 3 monede`  
3. **Play** din nou → `Încărcat pentru …: 3 monede` și în listă `Monede 3`  

- [ ] Monedele rămân între două rulări  
- [ ] Output fără roșu (mesajele `Încărcat` / `Salvat` sunt normale)

*Dacă vezi `warn` roșu/galben despre „API Services" sau „not enabled": revino la pasul 2.*

### 6) Date de test și „versiuni" *(important)*
Când testezi, ai de multe ori nevoie să **începi de la zero**. Nu șterge date: **schimbă numele caietului** în `Mod_Salvare`:

```lua
local magazin = DataStoreService:GetDataStore("Obby_Monede_v2")   -- caiet nou, gol
```

Înainte să publici jocul, alege un nume **final** și **nu-l mai schimba** (altfel jucătorii își pierd progresul).

**Încearcă tu — caiet nou (2 min)**  
- [ ] Schimbi `v1` în `v2`, rulezi și vezi că începi de la 0 monede

### 7) Două valori într-o tabelă + autosalvare *(Complet)*
**a) Tabela.** Salvăm `Monede` **și** `Victorii` împreună. În `Mod_Salvare`, înlocuiește funcțiile:

```lua
function Salvare.incarca(player)
    local ok, rezultat = pcall(function()
        return magazin:GetAsync(cheiePentru(player))
    end)

    if ok then
        local date = rezultat or {}
        Statistici.seteaza(player, "Monede", date.Monede or 0)
        Statistici.seteaza(player, "Victorii", date.Victorii or 0)
        player:SetAttribute("DateIncarcate", true)
        print("Încărcat pentru " .. player.Name)
    else
        warn("Nu am putut citi datele pentru " .. player.Name .. ": " .. tostring(rezultat))
    end
end

function Salvare.salveaza(player)
    if not player:GetAttribute("DateIncarcate") then
        return
    end

    local date = {
        Monede = Statistici.ia(player, "Monede"),
        Victorii = Statistici.ia(player, "Victorii"),
    }

    local ok, eroare = pcall(function()
        magazin:SetAsync(cheiePentru(player), date)
    end)

    if ok then
        print("Salvat pentru " .. player.Name)
    else
        warn("Nu am putut salva pentru " .. player.Name .. ": " .. tostring(eroare))
    end
end
```

*Folosește un caiet **nou** (`v3`) când schimbi formatul datelor, ca să nu amesteci un număr vechi cu o tabelă nouă.*

**b) Autosalvare.** În `Srv_Salvare`, la final:

```lua
task.spawn(function()
    while true do
        task.wait(60)
        for _, player in Players:GetPlayers() do
            Salvare.salveaza(player)
        end
    end
end)
```

*Salvăm la **60 de secunde**, nu la fiecare secundă: Roblox limitează câte cereri poți face pe minut.*

**Încearcă tu — Complet (10–12 min)**  
- [ ] Monedele **și** victoriile rămân între rulări  
- [ ] După un minut, în Output apare un `Salvat pentru …` automat  
- [ ] Output curat

---

## Greșeli frecvente
1. **API Services nu e activat** — erori în Output; bifează **Enable Studio Access to API Services**.  
2. **Place-ul nu e salvat pe Roblox** — salvezi cu **File → Save to Roblox**.  
3. **Fără `pcall`** — o eroare de rețea oprește tot scriptul.  
4. **Salvezi înainte să încarci** — jucătorul pierde progresul; de aceea există `DateIncarcate`.  
5. **Cheie făcută din nume** (`player.Name`) — folosește **`UserId`**.  
6. **Salvezi la fiecare secundă** — limite de cereri; la 60 de secunde, plus la ieșire.  
7. **Cod de salvare într-un LocalScript** — clientul **nu** are acces la DataStore; doar serverul.  
8. **Modifici formatul datelor în același caiet** — folosește un nume nou (`v2`, `v3`).  
9. **Salvezi date personale** (nume real, adresă) — **nu**: doar numere de joc.

---

## De făcut azi — „Monede care rămân"
Salvat: `Prenume_Nume_M4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `Mod_Salvare` + `Srv_Salvare` · `Monede` se salvează și se încarcă · `pcall` · **0 erori** |
| **Complet (ținta orei)** | Minim + `Monede` + `Victorii` într-o tabelă + autosalvare 60 s |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Pregătire
- [ ] API Services activat  
- [ ] `pcall` încercat  

### Pasul 2 — Salvare *(Minim)*
- [ ] `Mod_Salvare` + `Srv_Salvare`  
- [ ] Test: 3 monede → Stop → Play → 3 monede  
- [ ] Salvat  

**→ Minim când:** un coleg ia monede, oprește jocul, îl pornește iar și vede **aceleași** monede.

### Pasul 3 — Tabelă + autosalvare *(Complet)*
- [ ] Două valori salvate  
- [ ] Autosalvare  
- [ ] Salvat  

**Gata Complet când:** poți explica de ce nu salvăm înainte să încărcăm.

---

## Bonus (dacă ai terminat Complet)
- [ ] La intrare, un mesaj pe ecran: „Bine ai revenit! Ai N monede" (cu `Ev_Mesaj`)  
- [ ] Salvezi și `Caderi` (cele mai puține căderi într-o terminare)  
- [ ] Un caiet pentru **cel mai bun timp** (dacă ai timer)  
- [ ] Citești despre `UpdateAsync` (varianta „mai sigură" la scrieri simultane) și explici diferența față de `SetAsync`

## Recapitulare rapidă
1. **DataStore** = caiet în cloud; **doar serverul** îl poate folosi  
2. Cheia = `"Jucator_" .. player.UserId`  
3. **`pcall`** prinde erorile; verifici `ok` mereu  
4. Salvezi la **ieșire**, la **închiderea serverului** (`BindToClose`) și (Complet) la **60 s**  
5. **Nu** salva înainte să încarci cu succes  

**Quiz scurt (cu profesorul):**  
- De ce clientul nu poate folosi DataStore?  
- De ce folosim `UserId`, nu numele?  
- Ce se poate întâmpla fără protecția `DateIncarcate`?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector fluxul: Intri → încarci → joci → ieși → salvezi.)*

## Temă
Opțional: desenează pe o foaie **fluxul datelor**: jucătorul intră, serverul citește din DataStore, scorul crește, jucătorul iese, serverul scrie în DataStore.  
La **L3** adăugăm un **inamic** în Obby, care se mișcă și te rănește.
