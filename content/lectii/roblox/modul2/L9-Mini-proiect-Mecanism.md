# Lecția 9 — Mini-proiect: un mecanism pe Obby (monedă sau ușă)
**Modulul 2 · Script Starter**  
**Code Maker Club · Roblox Studio**

> Azi pui împreună tot Modulul 2: construiești **un mecanism care funcționează** în Obby-ul tău — o **monedă** pe care o iei sau o **ușă** pe care o deschizi cu un buton.  
> Place: `Prenume_Nume_M2` (ex. `Ana_Pop_M2`)

---

## Obiectiv
La finalul orei un coleg poate **juca** mecanismul tău fără să-i explici cu vocea ce trebuie să facă.  
**Minimum:** **un** mecanism funcțional (**monedă** *sau* **ușă**) + scripturi cu prefix corect (`Srv_` / `Cli_`) + **0 erori** în Output + Obby-ul rămâne **terminabil**.  
**Ținta orei (Complet):** Minim + **al doilea** mecanism (cel pe care nu l-ai ales) + un coleg joacă și îți dă **un feedback** + repari.

## De ce contează
L1–L8 = piesele: Output, client/server, variabile, `if`, funcții, `Touched`, click, bucle. L9 = **le folosești pe toate** într-un lucru care se vede în joc.  
La L10 lustruiești, prezinți și primești insigna **Script Starter**.

**Azi nu avem scor pe ecran, RemoteEvent sau salvare.** Doar mecanisme. Scorul vizibil vine în **Modulul 3**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + alegi calea: **A (monedă)** sau **B (ușă)** |
| 10–25 | Pas cu pas: planul + checklist (**Încearcă tu**) |
| 25–65 | Proiect: **Minim** (un mecanism care merge) |
| 65–105 | Proiect: **Complet** (al doilea + coleg) |
| 105–120 | Recap, bonus, salvare / pregătire L10 |

---

## Pas cu pas

### 1) Checklist — ce trebuie să știu
| # | Ce | De unde |
|---|----|---------|
| 1 | Place `Prenume_Nume_M2` · Obby-ul se joacă Start→Finish | M1 + L1 |
| 2 | Script (server) vs LocalScript — **mecanismele sunt pe server** | L2 |
| 3 | Variabile (`luata`, `liber`, culori…) | L3 |
| 4 | `if … then … end` | L4 |
| 5 | Funcții (`deschide()`, `inchide()`) | L5 |
| 6 | `Touched` + `Humanoid` | L6 |
| 7 | `ClickDetector` + `MouseClick` | L7 |
| 8 | `task.wait` (și bucle, dacă vrei) | L8 |

**Cale A — Moneda** folosește: L3, L4, L6.  
**Cale B — Ușa** folosește: L3, L4, L5, L7, L8 (`task.wait`).

**Încearcă tu — alegi (2 min)**  
- [ ] Ai ales **A** sau **B** pentru Minim  
- [ ] Spui în **o propoziție** ce va face mecanismul tău  

### 2) Ordinea bună de lucru
1. **Salvezi** o dată „de siguranță”  
2. **Construiești** piesa în lume (Part-uri, Anchor, nume clare)  
3. **Scrii** scriptul **puțin câte puțin** — Play după fiecare pas  
4. **Citești Output-ul** înainte să te întrebi „de ce nu merge?”  
5. Abia apoi **lustruiești** (culori, material, sunet — opțional)

*Regula modulului:* mai întâi **„rulează fără eroare”**, apoi **„face ce vreau”**.

### 3) Calea A — Moneda
**Construcția:**
1. Un Part nou: **`Moneda1`** — Shape **Cylinder** (Properties), rotit ca să stea „în picioare” (Rotate 90° pe Z), mic și plat  
2. Culoare galbenă, **Material** Neon sau Metal, **Anchored** activ, **CanCollide** dezactivat (treci **prin** ea)  
3. Plasată pe traseu, vizibilă, la o distanță rezonabilă de o platformă  

**Scriptul** — completează spațiile `____` și pune-l **în** `Moneda1`, ca `Srv_Moneda`:

```lua
local moneda = script.Parent
local luata = false

local function cuAtins(hit)
    local humanoid = ____                  -- caută "Humanoid" în hit.Parent
    if humanoid and not luata then
        luata = true
        print("Monedă luată!")
        moneda:Destroy()                   -- moneda dispare din lume
    end
end

moneda.____:Connect(cuAtins)               -- evenimentul de atingere
```

*Indiciu 1:* la L6 ai folosit `hit.Parent:FindFirstChild(…)`.  
*Indiciu 2:* evenimentul se numește la fel ca în L6.

**Încearcă tu — moneda (10–15 min)**  
- [ ] `Moneda1` ancorată, **fără** coliziune  
- [ ] `Srv_Moneda` în Part · fără roșu în Output la Play  
- [ ] Ai trecut prin monedă → mesaj în Output + moneda **dispare**  
- [ ] Obby-ul rămâne terminabil  

### 4) Calea B — Ușa
**Construcția:**
1. **`Usa`** — un Part lat și înalt (ca un perete), **Anchored**, culoare clară (maro / gri)  
2. **`Buton_Usa`** — un Part mic, roșu, **Anchored**, lângă ușă, în **partea accesibilă** (înainte de ea)  
3. În `Buton_Usa`: **+** → **ClickDetector** și **+** → **Script** → `Srv_Usa`

**Scriptul** — completează:

```lua
local buton = script.Parent
local detector = buton.ClickDetector
local usa = workspace.Usa
local liber = true

local function deschide()
    usa.Transparency = 0.7
    usa.CanCollide = false
end

local function inchide()
    usa.Transparency = 0
    usa.CanCollide = ____                  -- ușa trebuie să fie din nou solidă
end

local function cuClick(jucator)
    if liber then
        liber = false
        print(jucator.Name .. " deschide ușa")
        deschide()
        task.wait(____)                    -- câte secunde rămâne deschisă (ex. 4)
        inchide()
        liber = true
    end
end

detector.____:Connect(cuClick)             -- evenimentul de click
```

*Indiciu 1:* o ușă închisă are `CanCollide = true`.  
*Indiciu 2:* evenimentul de click e cel din L7.

**Încearcă tu — ușa (10–15 min)**  
- [ ] `Usa` nu te lasă să treci la început  
- [ ] Click pe `Buton_Usa` → ușa devine „fantomă”, treci  
- [ ] După câteva secunde se închide  
- [ ] Output fără roșu · Obby-ul rămâne terminabil  

### 5) Checkpoint-ul special: „rulează curat”
Înainte să ceri colegului să încerce, treci prin lista asta:

- [ ] **Output curat** la Play (nicio linie roșie)  
- [ ] Scripturile au prefix: `Srv_…` (Script) / `Cli_…` (LocalScript)  
- [ ] Numele din cod = numele din Explorer (`Usa`, `Buton_Usa`, `Moneda1`)  
- [ ] Mecanismul merge **de două ori la rând** (nu doar o dată)  
- [ ] Un coleg poate termina Obby-ul

**Încearcă tu — verificarea (3–4 min)**  
- [ ] Ai bifat toate cele 5 puncte  

### 6) Complet — al doilea mecanism + coleg
1. Faci **celălalt** mecanism din (A) / (B) — nu e nevoie să fie la fel de elaborat  
2. Un **coleg** joacă Obby-ul de la Spawn la Finish și folosește ambele mecanisme  
3. Tu observi **fără să vorbești**: se încurcă undeva?  
4. Notezi **un** feedback și repari cel puțin un lucru  
5. Play final · Output curat · salvat

**Încearcă tu — Complet (10–15 min)**  
- [ ] Ambele mecanisme merg  
- [ ] Colegul a terminat Obby-ul (sau a fost aproape, cu 1 feedback clar)  
- [ ] Ai reparat ce ai putut · salvat  

---

## Greșeli frecvente
1. **Numele din cod ≠ numele din Explorer** — `workspace.Usa` vs `Ușa`/`usa`: copiază exact; fără diacritice.  
2. **Moneda are coliziune** — te lovești de ea în loc să o iei; **CanCollide** dezactivat.  
3. **Moneda nu e ancorată** — cade sub lume.  
4. **Ușa nu se mai închide** — ai uitat `inchide()` sau `CanCollide = true`.  
5. **Butonul e în spatele ușii** — jucătorul nu-l poate apăsa; pune-l înainte de ușă.  
6. **Click din prea departe** — apropie butonul / crește `MaxActivationDistance`.  
7. **Script în locul greșit** — moneda: scriptul e **în** Part; ușa: scriptul e **în** `Buton_Usa` (lângă ClickDetector).  
8. **`LocalScript` pentru mecanism** — nu: regula e **Script (server)**, `Srv_…`.  
9. **Obby blocat de ușă** — verifică că ușa **se poate** deschide și traseul continuă.

---

## De făcut azi — „Mecanismul meu”
Salvat: `Prenume_Nume_M2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | **1** mecanism (moneda **sau** ușa) · prefix corect · **0 erori** · Obby terminabil |
| **Complet (ținta orei)** | Minim + **al doilea** mecanism + un coleg joacă + **1** reparație după feedback |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Plan
- [ ] Calea aleasă (A / B)  
- [ ] Checklist-ul din secțiunea 1  

### Pasul 2 — Mecanismul *(Minim)*
- [ ] Construcția  
- [ ] Scriptul completat  
- [ ] Output curat + Obby terminabil  
- [ ] Salvat  

**→ Minim când:** un coleg vede mecanismul funcționând.

### Pasul 3 — Complet
- [ ] Al doilea mecanism  
- [ ] Coleg + feedback + reparație  
- [ ] Salvat din nou  

**Gata Complet când:** un coleg trece tot Obby-ul folosind ambele mecanisme, fără ghid vocal.

---

## Bonus (dacă ai terminat Complet)
- [ ] **Moneda reapare** după 5 secunde: în loc de `Destroy()`, `moneda.Transparency = 1`, `task.wait(5)`, `moneda.Transparency = 0`, `luata = false`  
- [ ] **Mai multe monede, un singur script** — pui toate monedele într-un **Folder** numit `Monede` și un script cu un `for` care le leagă pe toate (pas nou — vezi **Exemplu**)  
- [ ] **Ușa cu 2 butoane** (unul înainte, unul după, ca să nu rămâi blocat)  
- [ ] La ușă, un `print` cu ce jucător a deschis

## Recapitulare rapidă
1. Mecanismele de joc sunt pe **server** (`Script`, `Srv_…`)  
2. **Monedă** = `Touched` + `Humanoid` + `Destroy()` (sau ascunzi)  
3. **Ușă** = `ClickDetector` + `CanCollide` + `task.wait` + frână `liber`  
4. **Output curat** înainte de „face ce vreau”  
5. Obby-ul trebuie să rămână **terminabil**  

**Quiz scurt (cu profesorul):**  
- De ce moneda are `CanCollide` dezactivat?  
- La ce folosește variabila `liber` la ușă?  
- De ce mecanismul e un Script (server), nu un LocalScript?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția și completează-ți singur spațiile. Doar apoi compară.)*

**Moneda — completat:**

```lua
local moneda = script.Parent
local luata = false

local function cuAtins(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid and not luata then
        luata = true
        print("Monedă luată!")
        moneda:Destroy()
    end
end

moneda.Touched:Connect(cuAtins)
```

**Ușa — completat** (părțile lipsă): `usa.CanCollide = true` · `task.wait(4)` · `detector.MouseClick:Connect(cuClick)`.

**Mai multe monede, un singur script** (Bonus) — script în Folder-ul `Monede`:

```lua
local folder = script.Parent
local total = 0

for _, moneda in folder:GetChildren() do
    local luata = false
    moneda.Touched:Connect(function(hit)
        local humanoid = hit.Parent:FindFirstChild("Humanoid")
        if humanoid and not luata then
            luata = true
            total = total + 1
            print("Monede: " .. total)
            moneda:Destroy()
        end
    end)
end
```

*(`GetChildren()` dă lista obiectelor din Folder; `for _, moneda in … do` trece prin fiecare. `_` e un nume „de aruncat”, pentru numărul de ordine pe care nu-l folosim.)*

## Temă
Opțional: schimbă **un detaliu** al mecanismului (culoarea monedei, cât timp stă ușa deschisă) și notează ce s-a schimbat în joc.  
La **L10** — completare + prezentare + insigna **Script Starter**.
