# Lecția 10 — Completare + prezentare (Game Logic)
**Modulul 3 · Game Logic**  
**Code Maker Club · Roblox Studio**

> Azi **termini** Obby-ul cu scor din L9, îl **arăți** clasei și primești insigna **Game Logic**.  
> Place: `Prenume_Nume_M3` *(opțional: copie `Prenume_Nume_M3_L10`, ca să nu strici versiunea veche)*  
> Exemple: `Ana_Pop_M3` · `Ana_Pop_M3_L10`

---

## Obiectiv
La finalul orei ai îmbunătățit Obby-ul, l-ai prezentat și ai închis Modulul 3.  
**Minimum:** **1** îmbunătățire din A–F, **testată** + Output curat + Place salvat + prezentare → **e suficient pentru insignă**.  
**Ținta orei (Complet):** **2** îmbunătățiri din A–F + prezentare + salvare.

## De ce contează
Un joc bun nu e „gata" când rulează; e gata când **un jucător nou îl înțelege și îl termină**.  
Insigna **Game Logic** = știi să faci scor, interfață, comunicare client–server, checkpoint-uri și reguli de risc, **cu serverul care decide**. În **Modulul 4** adaugi salvarea între sesiuni, personaje și publicarea jocului.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + **Minim vs Complet** + reguli prezentare |
| 10–25 | Lista A–F + checklist „curat" (**Încearcă tu**) |
| 25–65 | **Completare** pe Obby (lucru individual) |
| 65–85 | Prezentări (~1–2 min × max. **10** elevi) |
| 85–120 | Quiz recap + **insignă** + ce urmează în M4 |

La min **65** încep prezentările **oricum**. Cu **1** îmbunătățire ești ok pentru insignă.

---

## Pas cu pas

### 1) Idei de upgrade (alege din A–F)
Nu refaci de la zero. Deschizi Obby-ul din L9 și **adaugi**.

| Literă | Upgrade | Ce folosește |
|--------|---------|--------------|
| A | **Monede cu valori diferite** (mică +1, mare +5) | `Srv_Monede`, `if moneda.Name == …` |
| B | **Bonus cu mesaj de pauză** („Mai așteaptă N secunde") | `Srv_Bonus`, `Ev_Mesaj` |
| C | **Zonă de odihnă** nouă + checkpoint nou (fără să schimbi scriptul) | `Srv_Checkpoint`, folder `Checkpoints` |
| D | **Bară de progres** pe ecran (cât din Obby ai parcurs) | GUI, `Etapa`, `Changed` |
| E | **Timer / vieți** cu mesaj și culoare de alertă | L7 + `if` |
| F | **Finish cu bonus mai mare** dacă ai multe monede | `Srv_Finish`, `if` |

*(**Minim** = **1** literă testată în Play. **Complet** = **2**. Nu începe a doua până prima nu e curată în Output.)*

**Încearcă tu — alegi (3 min)**  
- [ ] Scrii pe foaie literele alese  
- [ ] Spui care e **mai ușoară** și care e **mai grea**

### 2) Checklist „curat" — la fiecare upgrade
- [ ] **Output curat** la Play (fără roșu)  
- [ ] Prefix: `Srv_` pentru Script, `Cli_` pentru LocalScript  
- [ ] **Serverul decide:** orice scor/recompensă vine dintr-un `Script`  
- [ ] Nume din cod = nume din Explorer  
- [ ] Funcționează de **două ori la rând**, și cu **2 jucători** (Test → Clients and Servers)  
- [ ] Obby-ul rămâne **terminabil**

### 3) Rețete scurte

**A — Monede cu valori** (în `Srv_Monede`, în locul liniei cu `+= 1`):

```lua
        local valoare = 1
        if moneda.Name == "MonedaMare" then
            valoare = 5
        end
        player.leaderstats.Monede.Value += valoare
```

Redenumești moneda specială `MonedaMare` (în folderul `Monede`).

**B — Pauza afișată:** în `Srv_Bonus`, în ramura „prea devreme":

```lua
    if acum - ultima < PAUZA then
        local ramas = PAUZA - (acum - ultima)
        Ev_Mesaj:FireClient(player, "Mai așteaptă " .. ramas .. " secunde")
        return
    end
```

**C — Zonă de odihnă:** o platformă lată + `Checkpoint4` în folder. Scriptul îl ia **singur**, fiindcă bucla cercetează `Checkpoint1…20`.

**D — Bară de progres:** în `GUI_Joc`: un **Frame** `Fundal_Progres` (gri, sus-stânga) și, **în el**, un alt Frame `Bara_Progres` (colorat, `Size` = `{0, 0}, {1, 0}`). În `Bara_Progres`, un LocalScript `Cli_Progres`:

```lua
local Players = game:GetService("Players")

local bara = script.Parent
local TOTAL = 3                                       -- câte checkpoint-uri ai

local etapa = Players.LocalPlayer:WaitForChild("leaderstats"):WaitForChild("Etapa")

local function actualizeaza()
    bara.Size = UDim2.new(math.clamp(etapa.Value / TOTAL, 0, 1), 0, 1, 0)
end

actualizeaza()
etapa.Changed:Connect(actualizeaza)
```

*`math.clamp(x, 0, 1)` = „ține `x` între 0 și 1"; bara nu depășește fundalul.*

**E — Alertă:** în `Cli_Timp`, în `actualizeaza`:

```lua
    if timp.Value < 10 then
        eticheta.TextColor3 = Color3.fromRGB(255, 60, 60)
    else
        eticheta.TextColor3 = Color3.fromRGB(255, 255, 255)
    end
```

**F — Finish cu bonus:** în `Srv_Finish`, în locul liniei cu `BONUS_MONEDE`:

```lua
    local bonus = BONUS_MONEDE
    if stats.Monede.Value >= 10 then
        bonus = BONUS_MONEDE * 2
    end
    stats.Monede.Value += bonus
```

**Încearcă tu — rețeta (3–4 min)**  
- [ ] Ai găsit rețeta literei alese  
- [ ] Ai adaptat numele din Place-ul tău

### 4) Completare — lucru individual
1. Salvezi o copie de siguranță (`Prenume_Nume_M3_L10`)  
2. **Un upgrade** → Play → Output curat → Stop  
3. Abia apoi **al doilea** (pentru Complet)  
4. La fiecare pas: **Play · Stop · Salvat**

### 5) Prezentare (1–2 minute)
Spui, în ordine:
1. **Numele jocului** și **scopul** (fișa din L9)  
2. **Arăți în Play**: monede, checkpoint, cădere, finish  
3. **Un script** deschis: `Script` sau `LocalScript` și **de ce**  
4. **O regulă a serverului** (ex. pauza bonusului): „Clientul cere, serverul hotărăște"  
5. **O greșeală** pe care ai reparat-o  
6. Răspunzi la **o întrebare** de la clasă

**Încearcă tu — pregătire (3 min)**  
- [ ] Ai 5 propoziții notate  
- [ ] Obby-ul se joacă fără pauze

### 6) Insigna
1. **Minim** (1 upgrade + prezentare + Output curat + salvat) → **insignă Game Logic**  
2. Complet = 2 upgrade-uri: ținta orei, nu pragul pentru insignă

---

## Greșeli frecvente
1. **Refaci tot** — nu: **adaugi** pe L9.  
2. **Două upgrade-uri netestate** — la min 65 e stricat; **1 → testezi → 2**.  
3. **Prezentare doar din editare** — rulează Play.  
4. **Roșu în Output, dar „merge"** — repară înainte de prezentare.  
5. **Scor schimbat din LocalScript** — nu contează în joc; mută logica pe server.  
6. **Nume schimbate** (`Finish`, `Checkpoint1`…) — scripturile nu le mai găsesc.  
7. **„N-am 2, deci n-am reușit"** — **1** + prezentare = Minim = **insignă**.  
8. **Upgrade care strică Obby-ul** — testează cu un coleg.

---

## De făcut azi — Completare + prezentare + insignă
Salvat: `Prenume_Nume_M3` și/sau `Prenume_Nume_M3_L10`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit" + insignă)** | **1** din A–F + Output curat + **prezentare** + salvare |
| **Complet (ținta orei)** | Minim + a **2-a** din A–F |

Dacă rămâi în urmă: **prezinți cu o îmbunătățire — e suficient pentru insignă.**

### Pasul 1 — Completare
- [ ] Obby L9 deschis  
- [ ] Minim: 1 literă, testată  
- [ ] Complet: încă 1 literă  
- [ ] Salvat  

**→ Minim când:** 1 upgrade + Output curat + gata de prezentat.

### Pasul 2 — Prezentare
- [ ] Ai prezentat (joc + Play + script + regulă a serverului + greșeală reparată)  
- [ ] Ai dat / primit un compliment  

### Pasul 3 — Închidere modul
- [ ] Place salvat  
- [ ] Quiz (ideal 5; minim 3)  
- [ ] Insigna **Game Logic**  

**Gata Minim când:** 1 upgrade, prezentare, insignă.  
**Gata Complet când:** 2 upgrade-uri + prezentare + salvare.

---

## Bonus (dacă ai terminat Complet / după prezentare)
- [ ] A 3-a îmbunătățire  
- [ ] Schimb: un coleg joacă 2 minute și notează **1 bug**; îl repari  
- [ ] Un **ecran de titlu** (un `Frame` care acoperă ecranul 3 secunde cu numele jocului)  
- [ ] Pe foaie: **1 idee** pentru M4 — „ce aș vrea să-mi rămână după ce ies din joc?"

## Recapitulare rapidă
1. L10 = **completezi** L9, apoi **prezinți**  
2. **Minim** = 1 upgrade + Output curat + prezentare → **insignă**  
3. M3 = scor (`leaderstats`), GUI, RemoteEvent, **serverul decide**, checkpoint, respawn, risc  
4. Clientul **arată și cere**; serverul **verifică și hotărăște**  
5. M4 = ModuleScript, salvare (DataStore), personaje (NPC), magazin, **publicare**  

**Quiz scurt (cu profesorul):**  
1. Unde se creează `leaderstats` și de ce acolo?  
2. Ce face un `RemoteEvent` și unde stă?  
3. De ce suma bonusului nu o trimite clientul?  
4. Ce se întâmplă cu `Etapa` când atingi `Checkpoint2`, apoi `Checkpoint1`?  
5. Cum se numește Place-ul tău?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția și upgrade-urile tale. Dacă ai nevoie de un model, profesorul arată pe proiector un Obby cu 2 upgrade-uri și Output curat.)*

## Temă
Opțional: arată familiei Obby-ul (2 minute de Play) și explică **o regulă a serverului** cu cuvintele tale.  
În **Modulul 4** jocul tău își „amintește" scorul după ce ieși din el (**DataStore**), primește un **personaj** (NPC) și un **magazin**, iar la final îl **publici** — ca să-l joace și alții.
