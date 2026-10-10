# Lecția 1 — `leaderstats`: scorul fiecărui jucător
**Modulul 3 · Game Logic**  
**Code Maker Club · Roblox Studio**

> Azi Obby-ul tău primește un **scor**: fiecare jucător are propriile **Monede**, afișate automat în lista de jucători din dreapta-sus. Moneda din M2 devine o monedă „adevărată".  
> Place: `Prenume_Nume_M3` — **copie** a Place-ului din M2 (ex. `Ana_Pop_M3`)  
> *Plasă de siguranță: dacă Obby-ul tău din M2 nu mai e jucabil, profesorul îți dă un **Place de bază** (cu aceleași nume ca în lecțiile de mai jos) și continui din el.*

---

## Obiectiv
La finalul orei fiecare jucător are un scor al lui (`Monede`), care crește când ia o monedă din Obby.  
**Minimum:** Place `Prenume_Nume_M3` salvat + `Srv_Leaderstats` care creează statistica `Monede` + cel puțin **o monedă** care dă **+1** + vezi scorul în lista de jucători · **0 erori** în Output.  
**Ținta orei (Complet):** Minim + **toate** monedele într-un `Folder` `Monede`, gestionate de **un singur script** `Srv_Monede` + moneda **reapare** după 5 secunde.

## De ce contează
În M2 moneda doar dispărea. Dar un joc „ține minte" ce ai făcut. În Scratch aveai o variabilă `scor`. În Roblox, scorul fiecărui jucător se pune într-un loc special, numit **`leaderstats`**, iar Roblox îl afișează singur.

**Azi nu facem încă ecran propriu (GUI), RemoteEvent sau salvare.** Doar scorul, pe server.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Obiectiv + copia `_M3` + numele obligatorii ale lumii |
| 15–50 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 50–105 | Proiectul „Monede cu scor" (vezi **Minim vs Complet**) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `Players` · `PlayerAdded` · `Instance.new` · `IntValue` · `.Value` · `+=` · funcții cu parametri · `for` pe o listă.

---

## Pas cu pas

### 1) Copia `_M3` și numele din lume
1. Deschizi `Prenume_Nume_M2`  
2. **File → Save to Roblox As…** (sau **Save As…**) → **`Prenume_Nume_M3`**  
3. De acum lucrezi **doar** în `_M3`; `_M2` rămâne ca rezervă

În M3 scripturile caută obiecte **după nume**. Ca să mergă toate lecțiile, lumea ta trebuie să aibă (cu **exact** aceste nume, fără diacritice):

| Obiect | Ce e | Când îl folosim |
|--------|------|-----------------|
| `Spawn` | punctul de start (SpawnLocation) | de la început |
| `Finish` | platforma de final | L8 |
| `Checkpoints` (Folder) cu `Checkpoint1`, `Checkpoint2`… | checkpoint-urile | L5 |
| `Monede` (Folder) cu monedele | monedele | azi (L1) |
| `Zona_Cadere` | un Part mare sub traseu | L6 |

Azi ne trebuie doar `Monede`. Pe celelalte le pregătim când vine rândul lor.

**Încearcă tu — pregătirea (4–5 min)**  
- [ ] Place-ul se numește `Prenume_Nume_M3`  
- [ ] Obby-ul se vede în Viewport și poți face un Play scurt  
- [ ] Ai o listă pe foaie cu numele obiectelor tale (Spawn, Finish, monede)

### 2) Ce e `leaderstats`?
Când un jucător intră în joc, serverul îi creează un **folder** special numit **`leaderstats`** (exact așa, cu litere mici). Tot ce pui în el (numere sau texte) apare **singur**, în lista de jucători din dreapta-sus.

```
Player (jucătorul)
└── leaderstats  (Folder)
    └── Monede   (IntValue = 0)
```

- **Folder** = un „dosar" care ține alte obiecte  
- **IntValue** = o „cutie" pentru un **număr întreg**, cu un câmp `Value`  
- Se face pe **server** (Script), pentru că scorul e o **regulă de joc** (ca în M2 L2)

### 3) `Players` și `PlayerAdded`
`Players` e **serviciul** care știe cine e în joc. Are un eveniment: **`PlayerAdded`** = „a intrat un jucător nou". Îl legi la o funcție (ca `Touched` în M2):

```lua
local Players = game:GetService("Players")

local function cuJucatorNou(player)
    print("A intrat: " .. player.Name)
end

Players.PlayerAdded:Connect(cuJucatorNou)
```

- `game:GetService("Players")` = cere serviciul cu numele ăsta  
- `player` = jucătorul care a intrat (Roblox îl trimite singur)

**Încearcă tu — PlayerAdded (3–4 min)**  
- [ ] `Srv_Leaderstats` în **ServerScriptService**  
- [ ] Codul de mai sus · Play → apare mesajul cu numele tău?  

*(Dacă **nu** apare: în Studio, tu intri în joc **înainte** ca scriptul să se conecteze. Rezolvăm la pasul 5.)*

### 4) Creăm scorul
Înlocuiește tot din `Srv_Leaderstats` cu:

```lua
local Players = game:GetService("Players")

-- Face o statistică (număr) și o pune în folder
local function adaugaStat(folder, nume, valoareStart)
    local stat = Instance.new("IntValue")
    stat.Name = nume
    stat.Value = valoareStart
    stat.Parent = folder
end

local function creeazaStatistici(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"          -- exact așa!

    adaugaStat(leaderstats, "Monede", 0)

    leaderstats.Parent = player               -- ultima linie: abia acum apare
end

Players.PlayerAdded:Connect(creeazaStatistici)
```

Cum se citește:  
- `adaugaStat(…)` e o **funcție cu parametri** (M2 L5): îi spui în ce folder, cum se numește și cu ce valoare pornește  
- `Instance.new("IntValue")` = fac un obiect nou (ca la scara din M2 L8)  
- `.Parent = …` pus **ultimul** = „abia acum îl pun în lume, când e gata"  
- Mai târziu adăugăm statistici noi cu **o singură linie**: `adaugaStat(leaderstats, "Etapa", 0)`

### 5) Plasa de siguranță: jucătorii care sunt deja în joc
În Studio, la Play, jucătorul tău poate intra **înainte** ca scriptul să fie gata, și atunci `PlayerAdded` nu mai „prinde" evenimentul. Adăugi **la final** în script:

```lua
for _, player in Players:GetPlayers() do
    creeazaStatistici(player)
end
```

- `Players:GetPlayers()` = lista jucătorilor care **sunt deja** în joc  
- `for _, player in … do` = trece prin fiecare (ca la `Monede` în M2 L9, Bonus)

Play: sus-dreapta apare lista cu **numele tău** și **Monede = 0**.

**Încearcă tu — scorul apare (5–6 min)**  
- [ ] Sus-dreapta: numele tău + `Monede 0`  
- [ ] Output curat · Stop · salvat  

### 6) Moneda dă +1
Mergi la **o monedă** din Obby (cu `Srv_Moneda` din M2). Înlocuiește scriptul cu:

```lua
local Players = game:GetService("Players")
local moneda = script.Parent
local luata = false

local function cuAtins(hit)
    if luata then
        return                                  -- ieși din funcție
    end

    local player = Players:GetPlayerFromCharacter(hit.Parent)
    if not player then
        return                                  -- nu e jucător → ieși
    end

    luata = true
    player.leaderstats.Monede.Value += 1        -- scorul crește cu 1
    moneda:Destroy()
end

moneda.Touched:Connect(cuAtins)
```

Ce e nou:  
- **`return`** singur (fără valoare) = „ieși acum din funcție" → codul rămâne fără `if`-uri imbricate  
- **`+= 1`** = prescurtare pentru `x = x + 1`  
- `player.leaderstats.Monede.Value` = drumul: jucător → folder → statistică → valoare

Play → iei moneda → în lista din dreapta-sus: **Monede 1**.

**Încearcă tu — +1 (6–8 min)**  
- [ ] O monedă dă **+1**  
- [ ] Scorul se vede în lista de jucători  
- [ ] Output fără roșu

### 7) Toate monedele, un singur script *(Complet)*
Nu copia scriptul pe fiecare monedă.

1. Explorer: **+** pe **Workspace** → **Folder** → numește-l **`Monede`**  
2. Tragi **toate** monedele în `Monede`  
3. **Ștergi** scripturile vechi `Srv_Moneda` din monede (altfel fiecare monedă ar da punctele de **două ori**)  
4. În **ServerScriptService** creezi `Srv_Monede` și completezi `____`:

```lua
local Players = game:GetService("Players")
local folder = workspace:WaitForChild("Monede")

local function leagaMoneda(moneda)
    local luata = false

    moneda.Touched:Connect(function(hit)
        if luata then
            return
        end

        local player = Players:GetPlayerFromCharacter(hit.Parent)
        if not player then
            return
        end

        luata = true
        player.leaderstats.Monede.Value += ____        -- cât dă o monedă?
        moneda.Transparency = 1
        task.wait(____)                                  -- după câte secunde reapare?
        moneda.Transparency = 0
        luata = false
    end)
end

for _, moneda in folder:GetChildren() do
    leagaMoneda(moneda)
end
```

*Indiciu:* +1 punct, reapare după 5 secunde.

**Încearcă tu — toate monedele (8–10 min)**  
- [ ] `Monede` (Folder) cu toate monedele  
- [ ] Un singur script `Srv_Monede` (cele vechi șterse)  
- [ ] Ia monede → scor crește · după 5 secunde moneda reapare  
- [ ] Output curat

---

## Greșeli frecvente
1. **Numele folderului diferit de `leaderstats`** — nu apare nimic în listă. Scris exact, litere mici.  
2. **`leaderstats.Parent = player` pus prea devreme** — pune-l ultimul, după ce ai adăugat statisticile.  
3. **Script într-un Part, nu în ServerScriptService** — pentru `Srv_Leaderstats` e locul corect **ServerScriptService**.  
4. **LocalScript în loc de Script** — scorul se creează pe **server**; un LocalScript nu poate crea un scor „adevărat".  
5. **Scorul dă +2 în loc de +1** — ai rămas cu **două** scripturi pe aceeași monedă (cel vechi + cel nou).  
6. **„attempt to index nil with 'Monede'"** — jucătorul nu are încă `leaderstats` (ai uitat bucla `for` de siguranță sau numele `Monede` e scris diferit).  
7. **Monede care nu reapar** — ai uitat `Transparency = 0` sau `luata = false`.  
8. **`IntValue` cu text** — `IntValue` ține **numere**; pentru text există `StringValue`.

---

## De făcut azi — „Monede cu scor"
Salvat: `Prenume_Nume_M3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `Srv_Leaderstats` cu `Monede` + **cel puțin o monedă** care dă **+1** + scor vizibil în listă · **0 erori** |
| **Complet (ținta orei)** | Minim + folderul `Monede` + **un singur** `Srv_Monede` + moneda reapare după 5 secunde |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Pregătire
- [ ] Copie `_M3` salvată  
- [ ] Lista numelor obiectelor (Spawn, Finish, monede)

### Pasul 2 — Scorul *(Minim)*
- [ ] `Srv_Leaderstats` în ServerScriptService, cu bucla de siguranță  
- [ ] O monedă dă +1  
- [ ] Play · Stop · salvat  

**→ Minim când:** un coleg ia o monedă și vede **Monede 1** în dreapta-sus.

### Pasul 3 — Toate monedele *(Complet)*
- [ ] Folder `Monede` + `Srv_Monede`  
- [ ] Scripturile vechi șterse  
- [ ] Monedele reapar  
- [ ] Salvat  

**Gata Complet când:** poți lua 5 monede și scorul arată exact 5.

---

## Bonus (dacă ai terminat Complet)
- [ ] O monedă **specială** (galbenă mare) în `Monede`, care dă **+5** *(indiciu: un `if moneda.Name == "MonedaMare" then`)*  
- [ ] A doua statistică: `adaugaStat(leaderstats, "Nivel", 1)` — apare lângă `Monede`  
- [ ] Un `print` cu `player.Name .. " are " .. player.leaderstats.Monede.Value .. " monede"` la fiecare monedă  
- [ ] Testezi cu **2 jucători**: **Test → Clients and Servers** → fiecare are scorul lui?

## Recapitulare rapidă
1. **`leaderstats`** = folder pe `Player`; ce pui în el apare în listă  
2. Se creează pe **server**, la `PlayerAdded` (+ bucla pentru cei deja intrați)  
3. **`IntValue`** = număr; îl citești și îl schimbi cu `.Value`  
4. `+= 1` = adaugă 1 · `return` singur = ieși din funcție  
5. Un singur script pentru **toate** monedele (Folder + `for`)  

**Quiz scurt (cu profesorul):**  
- De ce `leaderstats` se face pe server, nu într-un LocalScript?  
- Ce face `Players.PlayerAdded`?  
- Ce se întâmplă dacă lași două scripturi pe aceeași monedă?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția și completează-ți singur spațiile. Doar apoi compară.)*  
Spațiile din `Srv_Monede`: `+= 1` și `task.wait(5)`.

## Temă
Opțional: schimbă numele statisticii din `Monede` în altceva (ex. `Stele`) — ce trebuie schimbat **în ambele** scripturi (`Srv_Leaderstats` și `Srv_Monede`)?  
La **L2** punem scorul și **pe ecran**, într-un panou al tău (GUI).
