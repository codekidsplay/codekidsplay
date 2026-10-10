# Lecția 4 — Magazinul din joc (și serverul care verifică plata)
**Modulul 4 · Game Creator**  
**Code Maker Club · Roblox Studio**

> Azi deschizi un **magazin** în Obby-ul tău: cu monedele adunate **cumperi o putere** (alergi mai repede). Și reiei regula de aur din M3: **serverul verifică plata**, nu crede clientul.  
> Place: `Prenume_Nume_M4` (ex. `Ana_Pop_M4`)  
> *Roblox are și magazine „cu bani reali" (Robux). Azi lucrăm **doar cu monedele din joc**, care sunt ale noastre.*

---

## Obiectiv
La finalul orei jucătorul poate cumpăra o putere cu monede, iar **serverul** hotărăște dacă cumpărarea e validă.  
**Minimum:** `Mod_Magazin` (cu **un** articol, `Viteza`, la **10** monede) + `Srv_Magazin` + un buton în ecran care trimite doar **numele** articolului · serverul verifică **articolul, banii și dacă îl ai deja** · efectul (alergi mai repede) rămâne și după respawn · **0 erori**.  
**Ținta orei (Complet):** Minim + al **doilea** articol (`Salt`) + **pauză** între cereri + **mesaje** clare pentru jucător + puterile **se salvează** (DataStore).

## De ce contează
Dacă **clientul** ar putea spune „am plătit 10 monede, dă-mi viteza", oricine ar spune „am plătit 0". Dacă ar putea spune **prețul**, ar spune „costă 0".

Regula din M3 L4: **clientul cere, serverul hotărăște.** La un magazin asta înseamnă:  
- **prețul** îl știe **doar serverul**  
- **banii** îi verifică **serverul**  
- **achiziția** o face **serverul**

**Azi nu folosim Robux și nu atingem plăți reale.** Doar monede din joc.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Obiectiv + regulile unui magazin sigur |
| 15–55 | Pas cu pas: modulul + serverul (**Încearcă tu**) |
| 55–105 | Proiectul „Magazinul meu" (vezi **Minim vs Complet**) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `ModuleScript` (L1) · tabele în tabele · funcții care întorc **două** valori · `RemoteEvent` · `Attribute` · `WalkSpeed` · `Humanoid`.

---

## Pas cu pas

### 1) Regulile unui magazin sigur
| # | Regulă | Cine o respectă |
|---|--------|-----------------|
| 1 | Clientul trimite **doar numele** articolului | `Cli_Magazin` |
| 2 | **Prețul** vine dintr-o tabelă **de pe server** | `Mod_Magazin` |
| 3 | Serverul verifică: ce primește e **text**? articolul **există**? | `Mod_Magazin` |
| 4 | Serverul verifică: ai **destule monede**? | `Mod_Magazin` |
| 5 | Serverul verifică: **nu-l ai deja**? | `Mod_Magazin` |
| 6 | **Serverul** scade monedele și dă puterea | `Mod_Magazin` |
| 7 | Serverul **răspunde** cu un mesaj | `Srv_Magazin` |

**Încearcă tu — cu vocea (2–3 min)**  
- [ ] Spui ce s-ar întâmpla dacă **prețul** ar fi trimis de client  
- [ ] Spui ce verificări face serverul înainte de a vinde

### 2) Un dicționar în dicționar
Fiecare articol are mai multe informații (preț, nume). Le punem într-o tabelă **în** tabelă:

```lua
local ARTICOLE = {
    Viteza = {pret = 10, nume = "Viteză"},
    Salt = {pret = 15, nume = "Salt înalt"},
}

print(ARTICOLE.Viteza.pret)        -- 10
print(ARTICOLE["Salt"].nume)       -- Salt înalt
print(ARTICOLE["Zbor"])            -- nil (nu există)
```

**Încearcă tu — tabele (3 min)**  
- [ ] Într-un `Srv_Test` (temporar) afișezi un preț și un nume; verifici un articol care **nu** există (`nil`)  
- [ ] Ștergi `Srv_Test`

### 3) Funcții care întorc **două** valori
O funcție poate întoarce **mai multe** lucruri (ai văzut asta la `pcall`):

```lua
local function imparte(a, b)
    if b == 0 then
        return false, "Nu pot împărți la zero"
    end
    return true, a / b
end

local ok, rezultat = imparte(10, 2)    -- true, 5
local ok2, mesaj = imparte(1, 0)       -- false, "Nu pot împărți la zero"
```

La magazin, `cumpara` va întoarce: `true/false` (a reușit?) **și** un **mesaj** pentru jucător.

### 4) Modulul `Mod_Magazin`
**ServerScriptService** → **+** → **ModuleScript** → **`Mod_Magazin`**:

```lua
local ServerScriptService = game:GetService("ServerScriptService")
local Statistici = require(ServerScriptService:WaitForChild("Mod_Statistici"))

local Magazin = {}

-- Prețurile stau DOAR aici, pe server
local ARTICOLE = {
    Viteza = {pret = 10, nume = "Viteză"},
}

-- Aplică puterile cumpărate pe personajul jucătorului
function Magazin.aplica(player, personaj)
    personaj = personaj or player.Character
    local humanoid = personaj and personaj:WaitForChild("Humanoid", 5)
    if not humanoid then
        return
    end

    if player:GetAttribute("Are_Viteza") then
        humanoid.WalkSpeed = 24              -- normal e 16
    end
end

function Magazin.cumpara(player, articol)
    if typeof(articol) ~= "string" then
        return false, "Cerere invalidă"
    end

    local info = ARTICOLE[articol]
    if not info then
        return false, "Articol necunoscut"
    end

    if player:GetAttribute("Are_" .. articol) then
        return false, "Ai deja: " .. info.nume
    end

    if Statistici.ia(player, "Monede") < info.pret then
        return false, "Îți trebuie " .. info.pret .. " monede"
    end

    Statistici.adauga(player, "Monede", -info.pret)       -- serverul scade banii
    player:SetAttribute("Are_" .. articol, true)           -- și îți dă articolul
    Magazin.aplica(player)
    return true, "Ai cumpărat: " .. info.nume
end

return Magazin
```

Cum se citește:  
- Prețul vine din **`ARTICOLE`**, o tabelă pe server — clientul nu poate să-l schimbe  
- `typeof(articol) ~= "string"` și `if not info` = **refuzăm** orice cerere ciudată (ca la M3 L4)  
- `"Are_" .. articol` = un „post-it" pe jucător: `Are_Viteza`  
- `Statistici.adauga(player, "Monede", -info.pret)` = adunare cu un număr **negativ** = scădere  
- `personaj = personaj or player.Character` = „dacă nu mi-ai dat personajul, îl iau eu"  
- `WaitForChild("Humanoid", 5)` = așteaptă până la 5 secunde

**Încearcă tu — modulul (8–10 min)**  
- [ ] `Mod_Magazin` fără roșu în editor  
- [ ] Poți arăta cu degetul unde se verifică **articolul**, **banii** și **dublura**

### 5) Telefonul și serverul
1. În **ReplicatedStorage**: **+** → **RemoteEvent** → **`Ev_Cumpara`**  
2. **ServerScriptService** → script `Srv_Magazin`:

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")

local Magazin = require(ServerScriptService:WaitForChild("Mod_Magazin"))
local Ev_Cumpara = ReplicatedStorage:WaitForChild("Ev_Cumpara")
local Ev_Mesaj = ReplicatedStorage:WaitForChild("Ev_Mesaj")

Ev_Cumpara.OnServerEvent:Connect(function(player, articol)
    local ok, mesaj = Magazin.cumpara(player, articol)
    Ev_Mesaj:FireClient(player, mesaj)
end)

-- puterile cumpărate revin și după respawn
local function pregateste(player)
    player.CharacterAdded:Connect(function(personaj)
        Magazin.aplica(player, personaj)
    end)
end

Players.PlayerAdded:Connect(pregateste)

for _, player in Players:GetPlayers() do
    pregateste(player)
end
```

*Ai nevoie de `Ev_Mesaj` și `Txt_Mesaj` / `Cli_Mesaj` (M3 L3 §6). Dacă nu le ai, le faci acum — 5 minute.*

### 6) Magazinul pe ecran
1. În `GUI_Joc`: **+** → **Frame** → **`Magazin`** (un panou, pe marginea ecranului)  
2. În `Magazin`: **+** → **TextButton** → numește-l **`Viteza`** (**exact** ca articolul!) · `Text` = `Viteză — 10 monede`  
3. Pe `Magazin`: **+** → **LocalScript** → **`Cli_Magazin`**:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local panou = script.Parent
local Ev_Cumpara = ReplicatedStorage:WaitForChild("Ev_Cumpara")

for _, buton in panou:GetChildren() do
    if buton:IsA("TextButton") then
        buton.Activated:Connect(function()
            Ev_Cumpara:FireServer(buton.Name)        -- numele articolului, NU prețul
        end)
    end
end
```

- `buton:IsA("TextButton")` = „e un buton?"  
- `buton.Name` = `"Viteza"` → asta trimitem; **niciun preț, nicio sumă**

**Încearcă tu — cumperi (10–12 min)**  
1. Colectezi **10 monede** (sau, pentru test, pune temporar `Value = 50` în `Srv_Leaderstats`)  
2. Apeși `Viteză` → mesaj „Ai cumpărat: Viteză" · monedele scad cu 10 · alergi mai repede  
3. Apeși din nou → „Ai deja: Viteză"  
4. Te resetezi (Esc → Reset) → **tot** alergi mai repede  

- [ ] Cumpărarea merge  
- [ ] A doua oară e refuzată  
- [ ] Puterea rămâne după respawn  
- [ ] Output curat

### 7) Testul de „păcălire" (doar la tine, în joc propriu)
Verifici că serverul **nu crede** clientul. În `Cli_Magazin`, temporar, adaugi la final:

```lua
Ev_Cumpara:FireServer("Gratis")      -- articol care nu există
Ev_Cumpara:FireServer(12345)         -- nu e text
```

Play → serverul **refuză** ambele (mesaje „Articol necunoscut" / „Cerere invalidă"), fără erori roșii. **Șterge** cele două linii după test.

**Încearcă tu — serverul nu crede oarbă (3–4 min)**  
- [ ] Cererile ciudate sunt refuzate  
- [ ] Ai șters liniile de test

### 8) Articol nou, pauză, salvare *(Complet)*
**a) Al doilea articol.** În `ARTICOLE` adaugi:

```lua
    Salt = {pret = 15, nume = "Salt înalt"},
```

În `Magazin.aplica`, după `Are_Viteza`:

```lua
    if player:GetAttribute("Are_Salt") then
        humanoid.UseJumpPower = false
        humanoid.JumpHeight = 10             -- normal e ~7
    end
```

Și în `Magazin`, un al doilea buton `Salt` (**exact** `Salt`).

**b) Pauză între cereri.** În `Srv_Magazin`, înlocuiește funcția de `OnServerEvent`:

```lua
Ev_Cumpara.OnServerEvent:Connect(function(player, articol)
    local acum = os.clock()
    local ultima = player:GetAttribute("UltimaCumparare") or 0
    if acum - ultima < 0.5 then
        return                                -- prea repede → ignor
    end
    player:SetAttribute("UltimaCumparare", acum)

    local ok, mesaj = Magazin.cumpara(player, articol)
    Ev_Mesaj:FireClient(player, mesaj)
end)
```

**c) Puterile se salvează.** Altfel jucătorul își pierde puterea la următoarea intrare, dar nu și banii cheltuiți (nedrept!). În `Mod_Salvare`:

- în `salveaza`, în tabela `date` adaugi:

```lua
        Viteza = player:GetAttribute("Are_Viteza") == true,
        Salt = player:GetAttribute("Are_Salt") == true,
```

- în `incarca`, după `Victorii`:

```lua
        player:SetAttribute("Are_Viteza", date.Viteza == true)
        player:SetAttribute("Are_Salt", date.Salt == true)
```

- schimbi caietul în `GetDataStore("Obby_Monede_v4")` (format nou → caiet nou)

**Încearcă tu — Complet (12–15 min)**  
- [ ] `Salt` se cumpără și merge  
- [ ] Apăsat repede de 10 ori → o singură achiziție, fără erori  
- [ ] Ieși și intri: monedele **și** puterile sunt acolo  
- [ ] Output curat

---

## Greșeli frecvente
1. **Prețul trimis de client** — interzis: clientul trimite doar **numele**.  
2. **Numele butonului ≠ numele articolului** (`Viteza` vs `Viteză`) — serverul răspunde „Articol necunoscut".  
3. **Scazi banii pe client** — nu contează; scăderea o face **serverul**.  
4. **Lipsește verificarea „ai deja"** — cumperi aceeași putere de 10 ori.  
5. **`//` în loc de `--`** pentru comentarii — eroare; în Luau comentariul e `--`.  
6. **Puterea dispare la respawn** — lipsește `CharacterAdded` + `Magazin.aplica`.  
7. **`WalkSpeed` setat doar o dată pe client** — se vede doar la tine; serverul îl setează.  
8. **Nu verifici tipul** — `FireServer(12345)` dă o eroare ciudată; folosește `typeof`.  
9. **Salvezi banii, dar nu puterea** — jucătorul pierde (vezi §8c).  
10. **Folosești valori de test (`Value = 50`) și uiți să le scoți** — le ștergi înainte de publicare.

---

## De făcut azi — „Magazinul meu"
Salvat: `Prenume_Nume_M4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `Mod_Magazin` + `Srv_Magazin` + buton `Viteza` · serverul verifică articolul, banii și dublura · puterea rămâne după respawn · **0 erori** |
| **Complet (ținta orei)** | Minim + articolul `Salt` + pauză între cereri + mesaje + puterile se **salvează** |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Regulile
- [ ] Regulile 1–7 explicate  
- [ ] Tabelele încercate  

### Pasul 2 — Magazinul *(Minim)*
- [ ] `Mod_Magazin` + `Ev_Cumpara` + `Srv_Magazin`  
- [ ] Buton `Viteza` + `Cli_Magazin`  
- [ ] Testul de păcălire trecut  
- [ ] Salvat  

**→ Minim când:** un coleg cumpără puterea, banii scad, și **nu poate** cumpăra a doua oară.

### Pasul 3 — Complet
- [ ] `Salt`, pauză, mesaje  
- [ ] Salvare puteri  
- [ ] Salvat  

**Gata Complet când:** poți să explici **de ce** prețul stă pe server, nu pe client.

---

## Bonus (dacă ai terminat Complet)
- [ ] Un al treilea articol (ex. `Scut`: +1 viață dacă ai `Vieti`)  
- [ ] **Inventar:** un `Folder` `Inventar` pe jucător cu câte un `BoolValue` pe articol, în loc de `Attribute`  
- [ ] Butonul **arată** „Cumpărat ✓" și se dezactivează după achiziție (server → client prin `Ev_Mesaj` sau `Attribute`)  
- [ ] Panou de magazin care **se deschide / se închide** dintr-un buton `Btn_Magazin` (`Visible = not Visible`)  
- [ ] Notezi 3 lucruri pe care un magazin **nu** trebuie să le facă (ex. să ia bani fără acord)

## Recapitulare rapidă
1. Clientul trimite **doar numele**; **prețul** e pe server  
2. Serverul verifică **tipul**, **articolul**, **banii**, **dublura**  
3. **Serverul** scade banii și dă articolul  
4. O funcție poate întoarce **două** valori: `return ok, mesaj`  
5. Puterea se **reaplică** la `CharacterAdded` și se **salvează**

**Quiz scurt (cu profesorul):**  
- De ce prețul nu vine de la client?  
- Ce se întâmplă dacă cineva trimite `FireServer(12345)`?  
- De ce salvăm și puterile, nu doar monedele?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector fluxul: buton → `Ev_Cumpara` → `Mod_Magazin` verifică → mesaj.)*

## Temă
Opțional: scrie pe o foaie **un magazin pentru un alt joc** (ex. o cofetărie) și **cinci verificări** pe care le-ar face casierul.  
La **L5** facem Obby-ul **mai frumos**: lumini, sunete și interfață îngrijită.
