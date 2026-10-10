# Lecția 6 — Cădere și respawn
**Modulul 3 · Game Logic**  
**Code Maker Club · Roblox Studio**

> Într-un Obby, **a cădea face parte din joc**. Azi construiești o **zonă de cădere** sub traseu, numeri **căderile** fiecărui jucător și faci reapariția rapidă și prietenoasă.  
> Place: `Prenume_Nume_M3` (ex. `Ana_Pop_M3`)

---

## Obiectiv
La finalul orei, când un jucător cade de pe traseu, e „prins" de `Zona_Cadere`, numărat în statistica `Caderi`, și reapare la ultimul checkpoint (cel din L5).  
**Minimum:** `Zona_Cadere` + `Srv_Zona` (cădere = reset) + statistica `Caderi` crește la fiecare reset (`Srv_Respawn`) · **0 erori**.  
**Ținta orei (Complet):** Minim + **mesaj pe ecran** („Ai căzut! Reapari la Checkpoint N") + timp de respawn scurt + pierzi **1 monedă** la cădere (fără să cobori sub 0).

## De ce contează
Un Obby bun are **consecințe mici și clare**: cazi, reapari aproape, încerci din nou. Dacă respawn-ul durează prea mult sau te trimite la start, jucătorul pleacă.  
Azi pui la punct „bucla de încercare": **cazi → vezi ce s-a întâmplat → reapari → încerci iar**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + ce se întâmplă când cazi (acum) |
| 10–45 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 45–105 | Proiectul „Zona de cădere" (vezi **Minim vs Complet**) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `Touched` · `Humanoid.Health` · `Humanoid.Died` · `CharacterAdded` · `math.max` · proprietăți ale serviciului `Players`.

---

## Pas cu pas

### 1) Ce se întâmplă acum când cazi?
Test: Play → sari de pe traseu și cazi în gol.

- Roblox te resetează **abia** când ajungi extrem de jos (în jur de **-500** unități). Până atunci cazi mult și te plictisești.  
- Apoi reapari (la ultimul checkpoint, datorită scriptului din L5).

Vrem ca reapariția să fie **repede**, când ai căzut **sub traseu**.

**Încearcă tu — vezi problema (2–3 min)**  
- [ ] Cazi de pe traseu și observi cât durează până reapari  
- [ ] Spui cu vocea ce ai vrea să fie diferit

### 2) `Zona_Cadere` — plasa de sub traseu
1. Un Part **lat și subțire**, **sub** tot traseul (mai jos decât cea mai joasă platformă): **`Zona_Cadere`**  
2. **Anchor** · **CanCollide** = **dezactivat** (jucătorul trebuie să **cadă prin ea**, nu să stea pe ea) · **Transparency** = 0.8 sau 1 (aproape invizibilă)  
3. Destul de mare ca să acopere toată zona de joc, dar **sub** orice Part de pe traseu

**Încearcă tu — zona (4–5 min)**  
- [ ] `Zona_Cadere` sub Obby, ancorată, fără coliziune  
- [ ] Acoperă traseul în întregime (de sus, o vezi sub toate platformele)

### 3) Cădere = reset
În **ServerScriptService** creează `Srv_Zona`:

```lua
local zona = workspace:WaitForChild("Zona_Cadere")

local function cuAtins(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid and humanoid.Health > 0 then
        humanoid.Health = 0
    end
end

zona.Touched:Connect(cuAtins)
```

- `humanoid.Health > 0` = „doar dacă e încă în viață" (nu repetăm reset-ul de zeci de ori)  
- `humanoid.Health = 0` = reset (aceeași idee ca la `Lava` în M2)

Play → sari de pe traseu → după o clipă ești resetat → reapari la **ultimul checkpoint** (L5).

**Încearcă tu — prinde-mă (5–6 min)**  
- [ ] Cazi → ești resetat repede  
- [ ] Reapari la checkpoint-ul potrivit  
- [ ] Output curat

### 4) Statistica `Caderi`
1. În `Srv_Leaderstats` adaugi o linie (ca la `Etapa`):

```lua
    adaugaStat(leaderstats, "Caderi", 0)
```

2. `Srv_Respawn` (script nou în ServerScriptService):

```lua
local Players = game:GetService("Players")

local function pregateste(player)
    player.CharacterAdded:Connect(function(personaj)
        local humanoid = personaj:WaitForChild("Humanoid")

        humanoid.Died:Connect(function()
            local stats = player:FindFirstChild("leaderstats")
            local caderi = stats and stats:FindFirstChild("Caderi")
            if caderi then
                caderi.Value += 1
            end
        end)
    end)
end

Players.PlayerAdded:Connect(pregateste)

for _, player in Players:GetPlayers() do
    pregateste(player)
end
```

Ce e nou:  
- **`Humanoid.Died`** = eveniment: „personajul a murit" (viața a ajuns la 0)  
- Îl legăm **la fiecare personaj nou** (`CharacterAdded`), pentru că după reset apare **alt** personaj  
- Nu contează **cum** ai murit (cădere, lavă): contorizăm **orice** reset

*(Numele `Caderi` e ușor „larg": numără toate resetările. Ok pentru Obby.)*

**Încearcă tu — numărătoarea (6–8 min)**  
- [ ] La fiecare cădere/lavă, `Caderi` crește cu 1  
- [ ] `Esc → Reset Character` crește și el  
- [ ] Output fără roșu

### 5) Respawn rapid *(Complet)*
Roblox așteaptă implicit câteva secunde până reapari. O poți scurta din setări:

1. În Explorer, selectează serviciul **Players**  
2. În **Properties** caută **`RespawnTime`** (timpul de respawn) și pune **1** sau **2** secunde  

*(Dacă nu găsești proprietatea în versiunea ta de Studio, întreabă profesorul — o arată pe proiector.)*

Opțional, în **`Spawn`** (SpawnLocation): proprietatea **`Duration`** = 0 scoate „bula" de protecție de la start.

**Încearcă tu — respawn scurt (3–4 min)**  
- [ ] Reapari în 1–2 secunde  
- [ ] Obby-ul tău e încă **corect** (nu a dispărut nimic)

### 6) Mesaj și mică „pedeapsă" *(Complet)*
În `Srv_Respawn`, în funcția `humanoid.Died:Connect(function() … end)`, **adaugi** după `caderi.Value += 1` (dacă ai `Ev_Mesaj` din L3):

```lua
            local etapa = stats and stats:FindFirstChild("Etapa")
            local monede = stats and stats:FindFirstChild("Monede")

            if monede then
                monede.Value = math.max(0, monede.Value - 1)   -- nu coborî sub 0
            end

            if etapa then
                Ev_Mesaj:FireClient(player, "Ai căzut! Reapari la checkpoint-ul " .. etapa.Value)
            end
```

…și **sus** în script:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Ev_Mesaj = ReplicatedStorage:WaitForChild("Ev_Mesaj")
```

- `math.max(0, x)` = „cel mai mare dintre 0 și x" → monedele **nu** devin negative  
- La **etapa 0**, mesajul zice „checkpoint-ul 0" — la bonus îl faci mai frumos (vezi mai jos)

**Încearcă tu — consecințe (6–8 min)**  
- [ ] La cădere pierzi 1 monedă (dacă ai) și nu cobori sub 0  
- [ ] Apare mesajul pe ecran  
- [ ] Output curat

---

## Greșeli frecvente
1. **`Zona_Cadere` cu CanCollide activ** — jucătorul stă pe ea și nu cade; dezactivează coliziunea.  
2. **Zona e mai sus decât o platformă** — te resetează chiar când mergi pe traseu; ea trebuie **mai jos** decât orice Part pe care calci.  
3. **Zona e prea mică** — cazi pe lângă ea; mărește-o.  
4. **Reset-ul se repetă** — lipsește `humanoid.Health > 0`.  
5. **`Caderi` nu crește** — `Died` e legat o singură dată, nu la fiecare `CharacterAdded`.  
6. **Două scripturi fac respawn** — doar `Srv_Checkpoint` mută jucătorul; `Srv_Respawn` doar numără.  
7. **Monedele devin negative** — fără `math.max(0, …)`.  
8. **`Ev_Mesaj` nu există** — eroare *„Infinite yield possible"*: creează-l (L3 §6).  
9. **Obby-ul devine nerezolvabil** — verifică că poți ajunge la Finish cu respawn-ul activ.

---

## De făcut azi — „Zona de cădere"
Salvat: `Prenume_Nume_M3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `Zona_Cadere` + `Srv_Zona` (cădere = reset) + `Caderi` numără resetările · **0 erori** |
| **Complet (ținta orei)** | Minim + respawn 1–2 s + mesaj pe ecran + pierzi 1 monedă (≥ 0) |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Zona
- [ ] Sub traseu, fără coliziune  

### Pasul 2 — Reset + număr *(Minim)*
- [ ] `Srv_Zona`  
- [ ] `Caderi` în `leaderstats` + `Srv_Respawn`  
- [ ] Play · cazi · reapari la checkpoint · salvat  

**→ Minim când:** cazi de două ori și `Caderi` arată **2**.

### Pasul 3 — Consecințe *(Complet)*
- [ ] `RespawnTime` scurt  
- [ ] Mesaj + monedă pierdută  
- [ ] Salvat  

**Gata Complet când:** un coleg cade, vede mesajul, reapare repede la locul potrivit și își dă seama **ce a pățit**.

---

## Bonus (dacă ai terminat Complet)
- [ ] Mesajul diferit pentru **etapa 0**: „Ai căzut! Reapari la start" *(un `if etapa.Value == 0`)*  
- [ ] A doua zonă de cădere în alt loc (ex. sub o secțiune în aer)  
- [ ] Zonă de **lavă** colorată (Part roșu, cu script ca la M2 L6) în plus față de `Zona_Cadere`  
- [ ] O platformă „de relaxare" cu un `TextLabel` în lume care spune „Respiră. Ai trecut de partea grea."

## Recapitulare rapidă
1. **Zona de cădere** = Part mare sub traseu, `CanCollide` oprit, la atingere `Health = 0`  
2. **`Humanoid.Died`** se leagă la **fiecare** personaj nou (`CharacterAdded`)  
3. `Caderi` numără resetările  
4. `Srv_Checkpoint` te duce la checkpoint · `Srv_Respawn` doar numără și anunță  
5. `math.max(0, …)` protejează de numere negative  

**Quiz scurt (cu profesorul):**  
- De ce `Zona_Cadere` nu trebuie să aibă coliziune?  
- De ce legăm `Died` din nou, la fiecare personaj?  
- Ce face `math.max(0, monede.Value - 1)`?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector `Srv_Respawn` cu mesajul.)*

## Temă
Opțional: joacă un Obby din Roblox acasă și notează **3 lucruri** despre cum reapari (rapid? lent? unde?). Ce ai schimba la al tău?  
La **L7** adăugăm presiune în joc: un **timer** sau **vieți**.
