# Lecția 7 — Timer sau vieți
**Modulul 3 · Game Logic**  
**Code Maker Club · Roblox Studio**

> Un joc devine **mai tensionat** când are o limită: **timpul** se scurge sau **viețile** se termină. Azi alegi **una** și o construiești în Obby-ul tău; cei rapizi le fac pe amândouă.  
> Place: `Prenume_Nume_M3` (ex. `Ana_Pop_M3`)

---

## Obiectiv
La finalul orei Obby-ul tău are o **regulă de risc** care funcționează: ori pierzi viețile și „începi din nou", ori se termină timpul rundei și toți încep de la capăt.  
**Minimum:** **una** din căi — **A (Vieți)** *sau* **B (Timer)** — funcțională, cu rezultat vizibil pentru jucător · **0 erori** în Output.  
**Ținta orei (Complet):** **ambele** căi (A + B) funcționează împreună + mesaj la „game over" sau „timp expirat".

## De ce contează
Fără limită, un Obby se poate încerca la nesfârșit. O limită creează **miză**: te gândești înainte să sari.  
Aici folosești tot ce ai învățat: `leaderstats` (L1), GUI (L2), `Died` (L6), `while`/`for` (M2 L8).

**Azi nu salvăm între sesiuni** (M4). Regulile se aplică doar cât joci.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + alegi calea: **A (Vieți)** sau **B (Timer)** |
| 10–50 | Pas cu pas: calea aleasă (**Încearcă tu**) |
| 50–105 | Proiect: **Minim** (o cale) apoi **Complet** (a doua) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `IntValue` în `ReplicatedStorage` · `Humanoid.Died` · `while true` + `task.wait` · `for` invers · `LoadCharacter` · `-=`.

---

## Pas cu pas

### 1) Ce alegem?
| | **Cale A — Vieți** | **Cale B — Timer** |
|--|--------------------|--------------------|
| **Idee** | ai 3 vieți; la 0 începi de la zero | o rundă de 90 secunde; la 0 runda se reia |
| **Pentru cine e** | fiecare jucător separat | toți jucătorii, deodată |
| **Unde se vede** | în lista de jucători (`Vieti`) | pe ecran (`Txt_Timp`) |
| **Dificultate** | mai ușor | puțin mai lung |

**Încearcă tu — alegi (2 min)**  
- [ ] Ai ales **A** sau **B** pentru Minim  
- [ ] Spui în **o propoziție** ce se va întâmpla în jocul tău

### 2) Calea A — Vieți
**a) Statistica.** În `Srv_Leaderstats` adaugi:

```lua
    adaugaStat(leaderstats, "Vieti", 3)
```

**b) Scriptul.** `Srv_Vieti` în ServerScriptService:

```lua
local Players = game:GetService("Players")

local VIETI_START = 3

local function gameOver(player, stats)
    print("Game over pentru " .. player.Name)
    stats.Vieti.Value = VIETI_START
    stats.Etapa.Value = 0
    stats.Monede.Value = 0
end

local function pregateste(player)
    player.CharacterAdded:Connect(function(personaj)
        local humanoid = personaj:WaitForChild("Humanoid")

        humanoid.Died:Connect(function()
            local stats = player:FindFirstChild("leaderstats")
            local vieti = stats and stats:FindFirstChild("Vieti")
            if not vieti then
                return
            end

            vieti.Value -= 1

            if vieti.Value <= ____ then            -- când se termină viețile?
                gameOver(player, stats)
            end
        end)
    end)
end

Players.PlayerAdded:Connect(pregateste)

for _, player in Players:GetPlayers() do
    pregateste(player)
end
```

*Indiciu pentru `____`:* când viețile ajung la zero (sau mai puțin).

Cum merge:  
- `vieti.Value -= 1` = scade 1 (opusul lui `+= 1`)  
- Când viețile s-au terminat → **`gameOver`**: viețile revin la 3, **`Etapa` la 0** (deci vei reapărea la **start**, nu la checkpoint), monedele la 0  
- Respawn-ul îl face tot `Srv_Checkpoint` (L5): citește `Etapa` **după** ce ai murit, deci vede 0

**Încearcă tu — viețile (8–10 min)**  
- [ ] `Vieti 3` în listă  
- [ ] Cazi → `Vieti 2` → `1`  
- [ ] A treia cădere → `Vieti 3` iar, `Etapa 0`, `Monede 0`, reapari la Spawn  
- [ ] Output curat

### 3) Calea B — Timer
**a) Valoarea de timp.** În **ReplicatedStorage**: **+** → **IntValue** → numele **`Timp`** · `Value` = `90`.

**b) Ecranul.** În `GUI_Joc`: un **TextLabel** `Txt_Timp`, sus-mijloc, `TextScaled` bifat. În el, un LocalScript `Cli_Timp`:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local eticheta = script.Parent
local timp = ReplicatedStorage:WaitForChild("Timp")

local function actualizeaza()
    eticheta.Text = "Timp: " .. timp.Value
end

actualizeaza()
timp.Changed:Connect(actualizeaza)
```

**c) Serverul.** `Srv_Timp` în ServerScriptService:

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local timp = ReplicatedStorage:WaitForChild("Timp")
local DURATA = 90

local function rundaNoua()
    for _, player in Players:GetPlayers() do
        local stats = player:FindFirstChild("leaderstats")
        if stats then
            stats.Etapa.Value = 0
            stats.Monede.Value = 0
        end
        player:LoadCharacter()
    end
end

while true do
    for secunde = DURATA, 0, -1 do
        timp.Value = secunde
        task.wait(1)
    end

    print("Timp expirat! Runda nouă.")
    rundaNoua()
end
```

Cum merge:  
- Serverul **numără** (`for` invers, ca la M2 L8) și pune numărul în `Timp.Value`; clientul îl **citește** și îl afișează  
- Când ajunge la 0 → `rundaNoua()`: etapă și monede la 0, fiecare jucător **reapare** (`LoadCharacter()`)  
- `while true` **repetă** runda; are `task.wait` în bucla de dedesubt (regula de aur!)

*Pentru test poți pune `DURATA = 20`, ca să vezi finalul mai repede. Înapoi la 90 când ești gata.*

**Încearcă tu — timerul (8–10 min)**  
- [ ] Pe ecran: `Timp: 90`, `89`, `88`…  
- [ ] La 0: mesaj în Output, reapari la Spawn, scorul e 0  
- [ ] Runda se reia  
- [ ] Output curat

### 4) Mesaj la finalul rundei / game over *(Complet)*
Dacă ai `Ev_Mesaj`, **serverul** anunță jucătorul:

- În `gameOver`: `Ev_Mesaj:FireClient(player, "Game over! Începi din nou.")`  
- În `rundaNoua`, în `for`: `Ev_Mesaj:FireClient(player, "Timp expirat! Runda nouă.")`  

Pune sus în fiecare script:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Ev_Mesaj = ReplicatedStorage:WaitForChild("Ev_Mesaj")
```

*(`Srv_Timp` are deja `local ReplicatedStorage` — nu-l scrie a doua oară în același script; adaugi doar linia cu `Ev_Mesaj`.)*

### 5) Ambele căi împreună *(Complet)*
Când le ai pe amândouă:

- La **timp expirat**, reseteză și viețile: în `rundaNoua`, adaugă:

```lua
            local vieti = stats:FindFirstChild("Vieti")
            if vieti then
                vieti.Value = 3
            end
```

- Testezi: pierzi viețile → game over; se termină timpul → rundă nouă; ambele merg fără să se încurce.

**Încearcă tu — împreună (8–10 min)**  
- [ ] Ambele căi merg  
- [ ] La timp expirat, `Vieti` revine la 3  
- [ ] Mesajele apar pe ecran

---

## Greșeli frecvente
1. **`____` necompletat** — eroare; scrie `0`.  
2. **`Vieti` lipsește din `leaderstats`** — eroare *„Vieti is not a valid member…"*; adaugă linia în `Srv_Leaderstats`.  
3. **Viețile nu scad** — `Died` e legat o singură dată; trebuie legat la **fiecare** `CharacterAdded`.  
4. **După game over reapari la checkpoint** — ai uitat `stats.Etapa.Value = 0`.  
5. **`Timp` e creat ca `NumberValue`/`StringValue`** — folosește **`IntValue`**, numele exact `Timp`.  
6. **Timerul nu se vede** — `Txt_Timp` e în `GUI_Joc`, `Cli_Timp` e **în** `Txt_Timp`.  
7. **`while true` fără `task.wait`** — blocaj. În `Srv_Timp` pauza e în bucla `for` (`task.wait(1)`).  
8. **Mesaje duble** — când ambele căi anunță același eveniment; un singur mesaj pe eveniment.  
9. **Timpul prea scurt** — Obby-ul nu se mai poate termina; testează cu un coleg.

---

## De făcut azi — „Cu risc"
Salvat: `Prenume_Nume_M3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | **Una** din căi (A sau B), funcțională + **0 erori** |
| **Complet (ținta orei)** | Ambele căi + mesaj la game over / timp expirat |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Alegere
- [ ] Calea aleasă (A / B)  

### Pasul 2 — Calea aleasă *(Minim)*
- [ ] A: `Vieti` + `Srv_Vieti` **sau** B: `Timp` + `Cli_Timp` + `Srv_Timp`  
- [ ] Testat de **două ori** (nu doar o dată)  
- [ ] Salvat  

**→ Minim când:** un coleg joacă și vede clar **ce îl limitează** (viețile sau timpul).

### Pasul 3 — A doua cale + mesaje *(Complet)*
- [ ] Cealaltă cale  
- [ ] Mesaje cu `Ev_Mesaj`  
- [ ] Salvat  

**Gata Complet când:** pierzi toate viețile → reiei; se termină timpul → reiei; nu apar erori.

---

## Bonus (dacă ai terminat Complet)
- [ ] `Txt_Timp` devine **roșu** când mai sunt sub 10 secunde (un `if timp.Value < 10 then`, în `Cli_Timp`)  
- [ ] La game over, jucătorul pierde doar **jumătate** din monede (`stats.Monede.Value = stats.Monede.Value // 2` — `//` = împărțire întreagă)  
- [ ] Un „bonus de timp": o monedă specială care dă **+10 secunde** (indiciu: `timp.Value += 10` pe server)  
- [ ] Testezi cu 2 jucători: fiecare își pierde viețile separat?

## Recapitulare rapidă
1. **Vieți** = `IntValue` în `leaderstats`, scade la `Died`, la 0 → game over  
2. **Timer** = `IntValue` în `ReplicatedStorage`, **serverul numără**, clientul **afișează**  
3. `for secunde = DURATA, 0, -1` + `task.wait(1)` = numărătoare inversă  
4. `player:LoadCharacter()` = repornești jucătorul  
5. Regulile de joc (viețile, timpul) se țin pe **server**

**Quiz scurt (cu profesorul):**  
- De ce timpul se numără pe server, nu pe client?  
- Ce face `vieti.Value -= 1`?  
- De ce `Died` se leagă din nou la fiecare `CharacterAdded`?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția și completează-ți singur spațiul. Doar apoi compară.)*  
Spațiul din `Srv_Vieti`: `if vieti.Value <= 0 then`.

## Temă
Opțional: decide valorile **perfecte** pentru Obby-ul tău: câte vieți și câte secunde? Testează cu un coleg și notează ce a fost prea ușor sau prea greu.  
La **L8** curățăm „bucla de joc": de la **start** până la **finish** și înapoi, fără ghinioane.
