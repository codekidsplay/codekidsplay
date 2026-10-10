# Lecția 5 — Checkpoint care chiar „ține minte"
**Modulul 3 · Game Logic**  
**Code Maker Club · Roblox Studio**

> În M1 checkpoint-ul tău era doar **vizual** (un Part portocaliu). Azi devine **adevărat**: calci pe el și, dacă pici, **reapari acolo**, nu la început.  
> Place: `Prenume_Nume_M3` (ex. `Ana_Pop_M3`)

---

## Obiectiv
La finalul orei Obby-ul tău **ține minte** ultimul checkpoint atins de fiecare jucător și te duce acolo când reapari.  
**Minimum:** folderul `Checkpoints` cu `Checkpoint1` (+ `Checkpoint2` dacă ai) + statistica `Etapa` în `leaderstats` + `Srv_Checkpoint` care **salvează etapa** și te **mută** la checkpoint la respawn · **0 erori**.  
**Ținta orei (Complet):** Minim + **3 checkpoint-uri** + checkpoint-ul nu se poate „da înapoi" (ultimul atins rămâne cel mai înalt) + mesaj pe ecran la fiecare checkpoint nou.

## De ce contează
Un Obby fără checkpoint-uri e frustrant: pici lângă final și o iei de la capăt.  
Checkpoint-ul bun e și un exercițiu de **logică de joc**: ține minte un număr pentru **fiecare jucător** și îl folosește mai târziu.

**Azi nu salvăm între sesiuni** (nu rămâne după ce închizi jocul). Asta vine la **M4** (DataStore). Azi progresul ține doar **cât joci**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + planul: ce trebuie să țină minte jocul |
| 10–45 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 45–105 | Proiectul „Checkpoint adevărat" (vezi **Minim vs Complet**) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `Folder` · `leaderstats` (`Etapa`) · `for` cu `FindFirstChild("Checkpoint" .. numar)` · `CharacterAdded` · `PivotTo`.

---

## Pas cu pas

### 1) Planul
Ce trebuie să facă jocul:

1. **Fiecare** jucător are un număr: `Etapa` (0 = încă nu a atins niciun checkpoint)  
2. Când **atingi** `Checkpoint2`, `Etapa` devine 2 (dar **doar** dacă 2 > etapa de acum)  
3. Când **reapari** (după cădere), serverul te mută la checkpoint-ul cu numărul `Etapa`

*Exact ca la scor: numărul trăiește pe **server**, în `leaderstats`.*

**Încearcă tu — cu vocea (2 min)**  
- [ ] Spui în ordine cei 3 pași  
- [ ] Spui de ce `Etapa` nu e într-un LocalScript

### 2) Pregătim lumea
1. În Workspace: **+** → **Folder** → **`Checkpoints`**  
2. Tragi înăuntru checkpoint-urile tale din M1 și le numești exact: **`Checkpoint1`**, **`Checkpoint2`**, **`Checkpoint3`** (ordinea de pe traseu)  
3. Fiecare e **Anchor** și **CanCollide** activ (poți călca pe el)

*Nu ai trei? Pune `Checkpoint1` + `Checkpoint2` pentru Minim; pentru Complet mai adaugi unul.*

### 3) Adăugăm `Etapa` în scor
În `Srv_Leaderstats` (L1), sub linia cu `Monede`, adaugi **o linie**:

```lua
    adaugaStat(leaderstats, "Monede", 0)
    adaugaStat(leaderstats, "Etapa", 0)       -- linia nouă
```

Play: în lista din dreapta-sus apar acum **Monede** și **Etapa**.

**Încearcă tu — statistica (3 min)**  
- [ ] `Etapa 0` apare în listă  
- [ ] Output curat

### 4) `Srv_Checkpoint` — partea 1: atingerea
În **ServerScriptService** creează `Srv_Checkpoint` și scrie:

```lua
local Players = game:GetService("Players")
local folder = workspace:WaitForChild("Checkpoints")

-- Pentru fiecare checkpoint (1, 2, 3, ...) legăm Touched
for numar = 1, 20 do
    local cp = folder:FindFirstChild("Checkpoint" .. numar)

    if cp then
        cp.Touched:Connect(function(hit)
            local player = Players:GetPlayerFromCharacter(hit.Parent)
            if not player then
                return
            end

            local stats = player:FindFirstChild("leaderstats")
            local etapa = stats and stats:FindFirstChild("Etapa")

            if etapa and numar > etapa.Value then
                etapa.Value = numar
                print(player.Name .. " a atins checkpoint-ul " .. numar)
            end
        end)
    end
end
```

Cum merge:  
- `"Checkpoint" .. numar` = lipește textul cu numărul: `"Checkpoint1"`, `"Checkpoint2"`…  
- `FindFirstChild(…)` caută în folder; dacă nu există (de ex. n-ai `Checkpoint7`), dă `nil` și **sărim** (`if cp then`)  
- `numar > etapa.Value` = „salvează doar dacă e **mai departe** decât ce am deja" (nu te întorci la 1 dacă atingi iar `Checkpoint1`)  
- Fiecare funcție „își amintește" **`numar`-ul ei** (primul checkpoint știe 1, al doilea 2…)

**Încearcă tu — etapa crește (6–8 min)**  
- [ ] Calci `Checkpoint1` → `Etapa 1` în listă  
- [ ] Calci `Checkpoint2` → `Etapa 2`  
- [ ] Te întorci pe `Checkpoint1` → rămâne **2**  
- [ ] Output curat

### 5) Partea 2: respawn la checkpoint
**Adaugă** în același script, **sub** bucla `for`:

```lua
local function laRespawn(player, personaj)
    local stats = player:WaitForChild("leaderstats")
    local etapa = stats:WaitForChild("Etapa")

    if etapa.Value == 0 then
        return                                    -- niciun checkpoint → rămâi la Spawn
    end

    local cp = folder:FindFirstChild("Checkpoint" .. ____)   -- ce număr cauți?
    if not cp then
        return
    end

    personaj:WaitForChild("HumanoidRootPart")
    personaj:PivotTo(cp.CFrame + Vector3.new(0, 5, 0))
end

local function pregateste(player)
    player.CharacterAdded:Connect(function(personaj)
        laRespawn(player, personaj)
    end)
end

Players.PlayerAdded:Connect(pregateste)

for _, player in Players:GetPlayers() do
    pregateste(player)
end
```

*Indiciu pentru `____`:* numărul etapei de acum (`etapa.Value`).

Ce e nou:  
- **`CharacterAdded`** = „personajul jucătorului a apărut în lume" (la start și la **fiecare** respawn)  
- **`PivotTo(…)`** = mută tot personajul într-un loc nou  
- **`cp.CFrame + Vector3.new(0, 5, 0)`** = locul checkpoint-ului, **5 unități mai sus**, ca să nu apari „înfipt" în el

**Testul:** Play → calci `Checkpoint2` → apeși **Esc** → **Reset Character** (sau **R**) → reapari pe `Checkpoint2`.

**Încearcă tu — respawn la checkpoint (8–10 min)**  
- [ ] Reapari pe ultimul checkpoint atins  
- [ ] Dacă nu ai atins niciunul, reapari la **Spawn**  
- [ ] Output fără roșu

### 6) Mesaj la fiecare checkpoint *(Complet)*
Dacă ai `Ev_Mesaj` și `Txt_Mesaj` (L3 Complet), serverul poate scrie un mesaj pe ecran. În `Srv_Checkpoint`, sus:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Ev_Mesaj = ReplicatedStorage:WaitForChild("Ev_Mesaj")
```

…și în blocul `if etapa and numar > etapa.Value then`, după `print`:

```lua
                Ev_Mesaj:FireClient(player, "Checkpoint " .. numar .. "!")
```

*Nu ai `Ev_Mesaj`? Mergi la L3 §6 și îl creezi acum — durează 5 minute.*

**Încearcă tu — mesaj (5–6 min)**  
- [ ] La `Checkpoint1` apare „Checkpoint 1!" pe ecran 3 secunde  
- [ ] Nu apare din nou dacă te reîntorci pe el

---

## Greșeli frecvente
1. **Nume greșite** — `Checkpoint 1`, `checkpoint1`, `CheckPoint1`: exact **`Checkpoint1`**.  
2. **Checkpoint-urile nu sunt în folderul `Checkpoints`** — scriptul nu le vede.  
3. **Reapari mereu la Spawn** — `Etapa` rămâne 0: verifică Output-ul și că ai atins checkpoint-ul (mesajul `print`).  
4. **`____` necompletat** — eroare; scrie `etapa.Value`.  
5. **Reapari înfipt în checkpoint** — adaugi `Vector3.new(0, 5, 0)`.  
6. **Mai multe scripturi pun jucătorul în locuri diferite** — un singur script se ocupă de respawn (`Srv_Checkpoint`).  
7. **Etapa scade** — lipsește condiția `numar > etapa.Value`.  
8. **Alte Part-uri ating checkpoint-ul** (o piatră, o monedă) — nu contează: scriptul filtrează cu `GetPlayerFromCharacter` și ia în seamă doar jucătorii.  
9. **Doar 3 checkpoint-uri, dar bucla caută 20** — e ok: lipsurile sunt sărite (`if cp then`).

---

## De făcut azi — „Checkpoint adevărat"
Salvat: `Prenume_Nume_M3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `Checkpoints` (≥1) + `Etapa` în `leaderstats` + `Srv_Checkpoint` care **salvează etapa** și te **duce acolo** la respawn · **0 erori** |
| **Complet (ținta orei)** | Minim + **3** checkpoint-uri + nu coboară etapa + mesaj pe ecran |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Lumea și `Etapa`
- [ ] Folderul `Checkpoints` + nume exacte  
- [ ] `Etapa` în listă  

### Pasul 2 — Salvăm și mutăm *(Minim)*
- [ ] Partea 1 (atingere) + partea 2 (respawn)  
- [ ] Reset Character → reapari pe checkpoint  
- [ ] Salvat  

**→ Minim când:** un coleg atinge un checkpoint, dă Reset și reapare acolo.

### Pasul 3 — Trei și mesaj *(Complet)*
- [ ] `Checkpoint1`, `2`, `3`  
- [ ] Nu poți „coborî" etapa  
- [ ] Mesaj pe ecran  
- [ ] Salvat  

**Gata Complet când:** poți parcurge Obby-ul, să cazi între checkpoint-uri și să reapari mereu **la locul potrivit**.

---

## Bonus (dacă ai terminat Complet)
- [ ] Sub checkpoint, un **TextLabel în lume** (BillboardGui) cu numărul — *doar decor, fără cod*  
- [ ] La atingere, checkpoint-ul își schimbă **Material** în Neon pentru 1 secundă (vede toată lumea; e doar efect) — cu `task.wait(1)` și o frână, ca la M2 L6  
- [ ] Un **al patrulea** checkpoint — adaugi un singur Part nou, **fără** să schimbi scriptul  
- [ ] Testezi în **Test → Clients and Servers** cu 2 jucători: fiecare are **etapa lui**?

## Recapitulare rapidă
1. Checkpoint funcțional = **număr (`Etapa`) pe fiecare jucător**, ținut pe **server**  
2. `for numar = 1, 20` + `"Checkpoint" .. numar` = un singur script pentru toate  
3. `numar > etapa.Value` = nu te întorci înapoi  
4. **`CharacterAdded`** = momentul respawn-ului · **`PivotTo`** = muți personajul  
5. Progresul ține doar **cât joci** (salvarea între sesiuni = M4)  

**Quiz scurt (cu profesorul):**  
- De ce `Etapa` e în `leaderstats` pe server?  
- La ce folosește `numar > etapa.Value`?  
- Când se declanșează `CharacterAdded`?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția și completează-ți singur spațiul. Doar apoi compară.)*  
Spațiul din `laRespawn`: `local cp = folder:FindFirstChild("Checkpoint" .. etapa.Value)`.

## Temă
Opțional: schițează pe foaie Obby-ul tău cu **checkpoint-urile numerotate** și marchează unde ar fi cea mai grea zonă.  
La **L6** facem **căderea** și respawn-ul mai frumos: o zonă care te „ia" când pici.
