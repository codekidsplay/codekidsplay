# Lecția 3 — RemoteEvent: clientul vorbește cu serverul
**Modulul 3 · Game Logic**  
**Code Maker Club · Roblox Studio**

> Azi înveți cum „vorbesc" între ele cele două lumi din Roblox: **clientul** (ecranul tău) și **serverul** (arbitrul). Faci un **buton pe ecran** care trimite o cerere la server — și serverul răspunde.  
> Place: `Prenume_Nume_M3` (ex. `Ana_Pop_M3`)  
> *Ai învățat la M2 L2 că un LocalScript nu poate schimba lumea pentru toți. Azi vezi **cum îi ceri serverului** s-o schimbe.*

---

## Obiectiv
La finalul orei creezi un **RemoteEvent**, trimiți un mesaj **client → server** (`FireServer`) și un mesaj **server → client** (`FireClient`).  
**Minimum:** `Ev_Bonus` (RemoteEvent) + `Btn_Bonus` (buton) cu `Cli_Bonus` + `Srv_Bonus` care, la apăsare, afișează numele jucătorului în Output și îi dă **+5 monede** · **0 erori**.  
**Ținta orei (Complet):** Minim + un al doilea RemoteEvent, `Ev_Mesaj`, prin care **serverul** trimite jucătorului un mesaj pe ecran („Ai primit +5 monede!").

## De ce contează
Un joc are mereu două părți:
- **ecranul** jucătorului (butoane, meniuri) = **client**  
- **regulile** jocului (scor, monede) = **server**

Când apeși un buton, clientul **nu are voie** să schimbe scorul. Trebuie să **ceară** serverului. Podul dintre ei se numește **RemoteEvent**.

**Atenție:** azi facem varianta **simplă**. La **L4** vedem de ce e **prea ușor de păcălit** și o reparăm.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Obiectiv + analogia „telefonul" |
| 15–50 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 50–105 | Proiectul „Butonul de bonus" (vezi **Minim vs Complet**) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `ReplicatedStorage` · `RemoteEvent` · `FireServer` · `OnServerEvent` · `FireClient` · `OnClientEvent` · `TextButton` · `Activated`.

---

## Pas cu pas

### 1) Analogia: telefonul
Imaginează-ți că **serverul** e un arbitru într-o cameră închisă, iar **clientul** ești tu, afară. Nu poți intra. Singura cale: un **telefon**.

| Direcție | Cine sună | Cine primește | Cod |
|----------|-----------|---------------|-----|
| **client → server** | LocalScript | Script | `FireServer(…)` → `OnServerEvent` |
| **server → client** | Script | LocalScript | `FireClient(player, …)` → `OnClientEvent` |
| **server → toți** | Script | toți jucătorii | `FireAllClients(…)` → `OnClientEvent` |

**RemoteEvent** = „telefonul". Stă în **`ReplicatedStorage`**, un loc pe care **și clientul, și serverul** îl văd.

**Convenție la noi:** RemoteEvent-urile încep cu **`Ev_`** (de la „eveniment"): `Ev_Bonus`, `Ev_Mesaj`.

**Încearcă tu — cu vocea (2 min)**  
- [ ] Spui: „Pentru a cere ceva serverului, clientul folosește …"  
- [ ] Dai un exemplu de lucru care trebuie cerut serverului (ex. „ia bonus")

### 2) Pregătim telefonul
1. În **Explorer**: mouse peste **ReplicatedStorage** → **+** → **RemoteEvent** → redenumește **`Ev_Bonus`**

Atât. Un RemoteEvent nu are cod în el; el doar **duce** mesaje.

### 3) Butonul pe ecran
1. În `GUI_Joc` (de la L2): **+** → **TextButton** → redenumește **`Btn_Bonus`**  
2. Properties: `Text` = `Cere bonus (+5)` · `Position` jos-mijloc (ex. `{0.4, 0}, {0.88, 0}`) · `Size` = `{0.2, 0}, {0.08, 0}` · `TextScaled` bifat  
3. Pe `Btn_Bonus`: **+** → **LocalScript** → **`Cli_Bonus`**:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local buton = script.Parent
local Ev_Bonus = ReplicatedStorage:WaitForChild("Ev_Bonus")

local function cuApasare()
    Ev_Bonus:FireServer()
end

buton.Activated:Connect(cuApasare)
```

- `Activated` = „a fost apăsat butonul" (merge cu mouse, atingere pe telefon, controler)  
- `Ev_Bonus:FireServer()` = „sun serverul"

**Încearcă tu — butonul (5–6 min)**  
- [ ] `Btn_Bonus` apare pe ecran la Play  
- [ ] `Cli_Bonus` fără roșu în Output  

### 4) Serverul răspunde
În **ServerScriptService** creezi `Srv_Bonus`:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Ev_Bonus = ReplicatedStorage:WaitForChild("Ev_Bonus")

local function cuCerere(player)
    print(player.Name .. " cere bonus")
    player.leaderstats.Monede.Value += 5
end

Ev_Bonus.OnServerEvent:Connect(cuCerere)
```

Cum merge:  
- `OnServerEvent` = „cineva m-a sunat" (de la un client)  
- **Primul parametru** (`player`) îl pune **Roblox** singur: e jucătorul care a sunat. **Nu** îl trimiți tu, nu poate fi falsificat  
- Dacă clientul trimite și alte lucruri (`FireServer("text", 5)`), ele vin **după** `player`

Play → apeși butonul → în Output apare mesajul → în panoul de scor: **+5**.

**Încearcă tu — apelul (6–8 min)**  
- [ ] Butonul → mesaj în Output (`Nume cere bonus`)  
- [ ] Scorul crește cu 5 și se vede și pe panou  
- [ ] Output fără roșu

### 5) Cine e client, cine e server în Output?
În Play, Output-ul arată mesajele ambelor părți. Poți **filtra** (dacă ai în fereastră un selector de tip **Client / Server**): `print`-ul din `Srv_Bonus` apare la **Server**, nu la **Client**.

**Încearcă tu — cine a vorbit (2–3 min)**  
- [ ] Adaugi un `print("Buton apăsat")` în `Cli_Bonus` și găsești cele două mesaje în Output  
- [ ] Spui care vine de la client și care de la server

### 6) Serverul vorbește clientului *(Complet)*
1. În **ReplicatedStorage** adaugi al doilea RemoteEvent: **`Ev_Mesaj`**  
2. În `GUI_Joc` adaugi un **TextLabel** `Txt_Mesaj`: sus-mijloc, `Text` gol, `Visible` = **fals** (bifa scoasă), `TextScaled` bifat  
3. Pe `Txt_Mesaj` pui LocalScript `Cli_Mesaj`:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local eticheta = script.Parent
local Ev_Mesaj = ReplicatedStorage:WaitForChild("Ev_Mesaj")

local function arataMesaj(text)
    eticheta.Text = text
    eticheta.Visible = true
    task.wait(3)
    eticheta.Visible = false
end

Ev_Mesaj.OnClientEvent:Connect(arataMesaj)
```

4. În `Srv_Bonus`, completează `____`:

```lua
local Ev_Mesaj = ReplicatedStorage:WaitForChild("Ev_Mesaj")

local function cuCerere(player)
    player.leaderstats.Monede.Value += 5
    Ev_Mesaj:____(player, "Ai primit +5 monede!")      -- trimite DOAR acestui jucător
end
```

*Indiciu:* de la server la **un** jucător = `FireClient`.  
*Notă:* la `OnClientEvent` **nu** primești `player`; primești direct ce a trimis serverul (`"Ai primit +5 monede!"`).

**Încearcă tu — răspunsul serverului (8–10 min)**  
- [ ] Apeși butonul → apare mesajul pe ecran 3 secunde și dispare  
- [ ] Scorul a crescut  
- [ ] Output curat

---

## Greșeli frecvente
1. **RemoteEvent în ServerScriptService** — clientul nu-l vede; trebuie în **ReplicatedStorage**.  
2. **Nume diferite** — `Ev_Bonus` în Explorer vs `Ev_bonus` în cod.  
3. **`FireServer` într-un Script** — `FireServer` e doar pentru **LocalScript**; Script-ul folosește `FireClient`.  
4. **`OnServerEvent` într-un LocalScript** — invers; clientul ascultă cu `OnClientEvent`.  
5. **`FireClient` fără jucător** — `FireClient(player, …)` cere **primul argument = jucătorul**.  
6. **Butonul nu face nimic** — LocalScript în loc greșit (trebuie **în** `Btn_Bonus`, care e în `GUI_Joc`, în `StarterGui`).  
7. **Aștept răspuns de la `FireServer`** — nu returnează nimic; răspunsul vine doar prin alt eveniment (`Ev_Mesaj`).  
8. **Mesajul apare de două ori** — ai conectat evenimentul în **două** scripturi.

---

## De făcut azi — „Butonul de bonus"
Salvat: `Prenume_Nume_M3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `Ev_Bonus` + `Btn_Bonus` + `Cli_Bonus` + `Srv_Bonus` · apăsare → numele în Output + **+5** monede · **0 erori** |
| **Complet (ținta orei)** | Minim + `Ev_Mesaj` + `Txt_Mesaj` + `Cli_Mesaj` · serverul trimite un mesaj pe ecran |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Telefonul și butonul
- [ ] `Ev_Bonus` în ReplicatedStorage  
- [ ] `Btn_Bonus` cu `Cli_Bonus`  

### Pasul 2 — Serverul *(Minim)*
- [ ] `Srv_Bonus` cu `OnServerEvent`  
- [ ] Apeși → Output + scor  
- [ ] Play · salvat  

**→ Minim când:** apeși butonul și scorul crește, fără roșu în Output.

### Pasul 3 — Mesaj de la server *(Complet)*
- [ ] `Ev_Mesaj` + `Txt_Mesaj` + `Cli_Mesaj`  
- [ ] `FireClient` în `Srv_Bonus`  
- [ ] Salvat  

**Gata Complet când:** poți explica **cine trimite** și **cine primește** la fiecare dintre cele două RemoteEvent-uri.

---

## Bonus (dacă ai terminat Complet)
- [ ] Trimite din `Cli_Bonus` un **text** (`Ev_Bonus:FireServer("mic")`) și afișează-l în Output din `Srv_Bonus` (`function(player, tip)`)  
- [ ] Un **al doilea buton** `Btn_Mare` care trimite `"mare"` și serverul dă +10 în loc de +5 *(un `if tip == "mare"`)*  
- [ ] `Ev_Mesaj:FireAllClients("Cineva a luat bonusul!")` — **toți** jucătorii văd mesajul  
- [ ] Gândește-te: ce s-ar întâmpla dacă cineva ar apăsa butonul de **1000** de ori? *(chiar despre asta e L4)*

## Recapitulare rapidă
1. **RemoteEvent** = telefon între client și server · stă în **ReplicatedStorage**  
2. **Client → server:** `FireServer(…)` → pe server `OnServerEvent:Connect(function(player, …))`  
3. **Server → client:** `FireClient(player, …)` → pe client `OnClientEvent:Connect(function(…))`  
4. `player` la `OnServerEvent` îl pune **Roblox** (de încredere); restul vine de la client  
5. Convenție: `Ev_…` pentru RemoteEvent-uri  

**Quiz scurt (cu profesorul):**  
- Unde trebuie să stea un RemoteEvent ca ambele părți să-l vadă?  
- Ce face `FireServer` și cine îl poate chema?  
- De ce funcția de pe server primește `player` ca prim parametru?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția și completează-ți singur spațiile. Doar apoi compară.)*  
Spațiul din `Srv_Bonus`: `Ev_Mesaj:FireClient(player, "Ai primit +5 monede!")`.

## Temă
Opțional: pe o foaie desenează **săgeți** între „Buton (client)", „RemoteEvent" și „Server", cu textul fiecărui mesaj.  
La **L4** aflăm de ce butonul de azi e **prea ușor de păcălit** — și cum îl facem **sigur**.
