# Lecția 8 — Bucla de joc curată
**Modulul 3 · Game Logic**  
**Code Maker Club · Roblox Studio**

> Un joc bun are o **buclă clară**: **pornești → joci → ajungi la final → primești o recompensă → o iei de la capăt**. Azi închizi bucla Obby-ului tău (Finish cu recompensă) și faci **curățenie** în scripturi.  
> Place: `Prenume_Nume_M3` (ex. `Ana_Pop_M3`)

---

## Obiectiv
La finalul orei jucătorul care atinge `Finish` primește o **recompensă**, vede un **mesaj** și **reia** Obby-ul, iar proiectul tău e **ordonat și fără erori**.  
**Minimum:** `Srv_Finish` care, la atingerea `Finish`, dă **+1 `Victorii`** și **+10 monede** (o singură dată pe terminare) + repornește jucătorul · **0 erori** în Output + fiecare script în locul și cu numele corect.  
**Ținta orei (Complet):** Minim + **mesaj** pe ecran pentru jucător + **anunț** pentru toți („X a terminat Obby-ul!") + test cu **2 jucători**.

## De ce contează
Până acum ai făcut piese: scor, checkpoint, cădere, limite. Azi le **legi** într-un joc care se poate juca **de mai multe ori**.  
Și faci un lucru pe care îl fac toți programatorii buni: **curățenia**. Un proiect ordonat se repară și se extinde ușor.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + desenăm **bucla de joc** pe foaie |
| 10–45 | Pas cu pas: `Finish` (**Încearcă tu**) |
| 45–80 | Curățenia + testarea (**checklist**) |
| 80–105 | Complet: mesaje + 2 jucători |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `Touched` · `Attribute` ca „frână" · `FireClient` / `FireAllClients` · `LoadCharacter` · `Test → Clients and Servers`.

---

## Pas cu pas

### 1) Bucla de joc
Desenează pe foaie, cu săgeți, ce face un jucător în Obby-ul tău:

```
Spawn → monede → checkpoint-uri → (cădere → reapare) → Finish → recompensă → Spawn
```

Pentru fiecare săgeată întreabă-te:  
- **Ce o declanșează?** (atingere, cădere, buton)  
- **Cine decide?** (serverul, de fiecare dată!)  
- **Ce vede jucătorul?** (scor, mesaj, panou)

**Încearcă tu — bucla (3–4 min)**  
- [ ] Ai desenat bucla cu cel puțin 5 pași  
- [ ] Ai găsit **un pas** care încă nu are efect în joc (probabil: Finish)

### 2) Statistica `Victorii`
În `Srv_Leaderstats` adaugi:

```lua
    adaugaStat(leaderstats, "Victorii", 0)
```

### 3) `Srv_Finish`
Platforma `Finish` din M1 trebuie să se numească exact **`Finish`** și să fie în Workspace. În **ServerScriptService** creează `Srv_Finish` și completează `____`:

```lua
local Players = game:GetService("Players")

local finish = workspace:WaitForChild("Finish")
local PAUZA_FINAL = 4          -- secunde până reapari la start
local BONUS_MONEDE = 10

local function cuAtins(hit)
    local player = Players:GetPlayerFromCharacter(hit.Parent)
    if not player then
        return
    end

    if player:GetAttribute("Terminat") then
        return                                  -- deja a terminat; nu primește de două ori
    end

    local stats = player:FindFirstChild("leaderstats")
    if not stats then
        return
    end

    player:SetAttribute("Terminat", true)       -- frâna: pornită

    stats.Victorii.Value += ____                -- câte victorii primești?
    stats.Monede.Value += BONUS_MONEDE
    print(player.Name .. " a terminat Obby-ul!")

    task.wait(PAUZA_FINAL)

    stats.Etapa.Value = 0                       -- reiei de la Spawn
    if player.Parent then
        player:LoadCharacter()
    end
    player:SetAttribute("Terminat", false)      -- frâna: oprită
end

finish.Touched:Connect(cuAtins)
```

*Indiciu:* terminat o dată = o victorie.

Cum merge:  
- **`Terminat`** e un „post-it" pe jucător (ca `UltimulBonus` la L4): cât timp e `true`, atingerile următoare sunt **ignorate**, ca să nu primești premiul de 20 de ori  
- `player:GetAttribute("Terminat")` e `nil` (fals) la prima terminare  
- Serverul **hotărăște** recompensa (nu clientul — regula din L4)  
- `if player.Parent then` = „doar dacă jucătorul nu a plecat între timp"

**Încearcă tu — Finish-ul merge (8–10 min)**  
- [ ] Atingi `Finish` → `Victorii 1` și `Monede +10`  
- [ ] Apar o singură dată, nu de mai multe ori  
- [ ] După 4 secunde reapari la Spawn  
- [ ] Output curat

### 4) Curățenia — checklist
Treci prin **fiecare** punct și bifează:

| # | Verificare | Cum |
|---|------------|-----|
| 1 | **Output curat** 2 minute de joc | Play, joci, nu apare roșu |
| 2 | **Fără `print`-uri în plus** | păstrezi 1–2 utile; ștergi cele de test |
| 3 | **Prefix corect** | `Srv_` pentru Script, `Cli_` pentru LocalScript |
| 4 | **Scripturile server** doar în `ServerScriptService` | `Srv_Leaderstats`, `Srv_Monede`, `Srv_Bonus`, `Srv_Checkpoint`, `Srv_Zona`, `Srv_Respawn`, `Srv_Vieti`/`Srv_Timp`, `Srv_Finish` |
| 5 | **LocalScript-urile** doar în GUI | `Cli_Scor`, `Cli_Bonus`, `Cli_Mesaj`, `Cli_Timp` |
| 6 | **Fără scripturi duplicate** | nu există 2 scripturi care fac același lucru (ex. o veche `Srv_Moneda`) |
| 7 | **Foldere** | `Monede`, `Checkpoints` |
| 8 | **Nume clare** | nimic numit `Part`, `Script`, `Script1` |
| 9 | **Obby terminabil** | de la Spawn la Finish, de un coleg |
| 10 | **Reapare corect** | după cădere, la ultimul checkpoint |

**Încearcă tu — curățenia (10–15 min)**  
- [ ] Ai bifat cel puțin **8** din 10  
- [ ] Ai reparat tot ce era **roșu**  
- [ ] Salvat

### 5) Mesajul de victorie *(Complet)*
Cu `Ev_Mesaj` (L3), serverul anunță **jucătorul** și **toată lumea**:

În `Srv_Finish`, sus:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Ev_Mesaj = ReplicatedStorage:WaitForChild("Ev_Mesaj")
```

…și după `print(player.Name .. " a terminat Obby-ul!")`:

```lua
    Ev_Mesaj:FireClient(player, "Bravo! Ai terminat Obby-ul! +10 monede")

    -- anunț pentru ceilalți jucători (nu și pentru cel care a terminat)
    for _, alt in Players:GetPlayers() do
        if alt ~= player then
            Ev_Mesaj:FireClient(alt, player.Name .. " a terminat Obby-ul!")
        end
    end
```

- `FireClient(player, …)` = **doar** către acel jucător  
- Bucla trece prin toți jucătorii; `alt ~= player` = „alt jucător decât cel care a terminat" (`~=` = diferit, de la M2 L4)  
- *(Există și `FireAllClients(…)`, dar ar trimite anunțul și câștigătorului, peste mesajul lui de victorie.)*

**Încearcă tu — mesajele (5–6 min)**  
- [ ] Jucătorul vede mesajul de victorie  
- [ ] Ceilalți (cu 2 jucători) văd anunțul

### 6) Testul cu doi jucători *(Complet)*
1. Tab **Test** → **Clients and Servers** → **Players**: **2** → **Start**  
2. Se deschid **un server** și **două ferestre de jucător**  
3. Fiecare își joacă Obby-ul: **scorul, etapa, viețile** sunt **separate**?  
4. Un jucător termină → celălalt vede anunțul? **Nu** primește recompensa lui?

**Încearcă tu — doi jucători (8–10 min)**  
- [ ] Fiecare are scorul lui  
- [ ] Un jucător termină; doar el primește bonusul  
- [ ] Output (server): fără roșu

---

## Greșeli frecvente
1. **`Finish` altfel numit** (`Final`, `finish`) — eroare *„Infinite yield possible"*; numele exact: `Finish`.  
2. **Recompensă de zeci de ori** — lipsește frâna `Terminat`.  
3. **Nu reapari după Finish** — ai uitat `LoadCharacter()` sau `Etapa = 0` (reapari la checkpoint-ul vechi).  
4. **`Victorii` lipsește** — eroare *„Victorii is not a valid member…"*; adaugă linia în `Srv_Leaderstats`.  
5. **`____` necompletat** — eroare; scrie `1`.  
6. **Scripturi vechi rămase** — `Srv_Moneda` pe monedele din M2: monedele dau scor dublu. Le ștergi.  
7. **Testezi doar cu un jucător** — unele greșeli apar abia cu doi.  
8. **Ștergi un script „fiindcă nu știi la ce e"** — întreabă; poate ține un mecanism (de ex. `Srv_Zona`).  
9. **Timer global + Finish** — dacă ai `Srv_Timp`, runda comună poate reseta jucătorul în timpul pauzei; e normal; discută cu profesorul.

---

## De făcut azi — „Obby cu final"
Salvat: `Prenume_Nume_M3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `Srv_Finish` (+1 victorie, +10 monede, o singură dată) + repornire + checklist ≥ 8/10 + **0 erori** |
| **Complet (ținta orei)** | Minim + mesaj de victorie + anunț pentru toți + test cu 2 jucători |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Bucla
- [ ] Desenul cu săgeți  
- [ ] `Victorii` în `leaderstats`  

### Pasul 2 — Finish + curățenie *(Minim)*
- [ ] `Srv_Finish`  
- [ ] Checklist  
- [ ] Play de la Spawn la Finish și înapoi · salvat  

**→ Minim când:** un coleg joacă tot Obby-ul și primește **o singură** recompensă.

### Pasul 3 — Mesaje + 2 jucători *(Complet)*
- [ ] Mesaj + anunț  
- [ ] Test cu 2 jucători  
- [ ] Salvat  

**Gata Complet când:** doi jucători joacă deodată și **fiecare** are scorul și recompensa lui.

---

## Bonus (dacă ai terminat Complet)
- [ ] `Finish` pe un **podium** cu un `TextLabel` în lume („FINISH")  
- [ ] Recompensă mai mare dacă termini **fără căderi** (verifici `Caderi.Value == 0`)  
- [ ] Un **sunet** (`Sound`) la Finish — pui un `Sound` în `Finish` și `finish.Sound:Play()`  
- [ ] Un **alt fel de final**: un al doilea `Finish2` (alt traseu) cu alt premiu

## Recapitulare rapidă
1. **Bucla de joc:** pornești → joci → final → recompensă → reiei  
2. **Frâna** (`Attribute`) oprește recompensa dublă  
3. **Serverul** dă recompensa; **clientul** doar o vede (L4)  
4. **Curățenie:** prefix, locuri corecte, fără duplicate, Output curat  
5. Testează cu **2 jucători**: `Test → Clients and Servers`

**Quiz scurt (cu profesorul):**  
- De ce există atributul `Terminat`?  
- Cine hotărăște recompensa: clientul sau serverul? De ce?  
- Ce spune un Output **curat**?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția și completează-ți singur spațiul. Doar apoi compară.)*  
Spațiul din `Srv_Finish`: `stats.Victorii.Value += 1`.

## Temă
Opțional: pune Obby-ul în mâinile unei **persoane din familie** (fără să explici) și notează unde se oprește.  
La **L9** punem tot într-un **mini-proiect**: Obby + scor, gata de arătat.
