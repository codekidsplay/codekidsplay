# Lecția 2 — GUI: scorul pe ecran
**Modulul 3 · Game Logic**  
**Code Maker Club · Roblox Studio**

> Azi faci **panoul tău** de scor, pe ecran: un text mare „Monede: 3" care se schimbă singur când iei o monedă. Înveți ce e un **GUI** și de ce stă într-un loc diferit de lumea 3D.  
> Place: `Prenume_Nume_M3` (ex. `Ana_Pop_M3`)

---

## Obiectiv
La finalul orei ai un **panou de scor** pe ecran, creat de tine, care afișează numărul de monede și **se actualizează singur**.  
**Minimum:** `GUI_Joc` (ScreenGui) cu un `Txt_Monede` (TextLabel) + `Cli_Scor` (LocalScript) care arată `Monede: …` și crește la fiecare monedă · **0 erori** în Output.  
**Ținta orei (Complet):** Minim + panoul arată **frumos** (culori, mărime, poziție) + textul își **schimbă culoarea** când ai cel puțin 5 monede.

## De ce contează
Lista din dreapta-sus există la orice joc Roblox. Dar jocurile bune au **interfața lor**: scor mare, titlu, butoane.  
Aceasta se numește **GUI** (Graphical User Interface = „interfață grafică") și stă **pe ecranul jucătorului**, nu în lumea 3D.

**Azi nu facem butoane care trimit date la server.** Doar citim scorul și îl arătăm. (Butoanele cu RemoteEvent vin la **L3**.)

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + ideea de GUI |
| 10–45 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 45–100 | Proiectul „Panoul meu de scor" (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi folosim:** `StarterGui` · `ScreenGui` · `TextLabel` · Properties (`Text`, `Position`, `Size`) · `LocalPlayer` · `WaitForChild` · `Changed`.

---

## Pas cu pas

### 1) GUI = pe ecran, nu în lume
| | Obiecte din **lume** (Part) | Obiecte de **ecran** (GUI) |
|--|------------------------------|-----------------------------|
| **Unde stau** | `Workspace` | `StarterGui` |
| **Cum se văd** | în 3D, din cameră | „lipite" pe ecran, peste lume |
| **Cine le vede** | toți jucătorii | **fiecare jucător** are copia lui |
| **Cod** | de obicei `Script` (server) | `LocalScript` (client) |

Ce pui în **StarterGui**, Roblox **copiază** în ecranul fiecărui jucător când intră. De aceea un GUI e treaba **clientului**.

### 2) Creezi panoul
1. În **Explorer**: mouse peste **StarterGui** → **+** → **ScreenGui** → redenumește **`GUI_Joc`**  
2. Mouse peste `GUI_Joc` → **+** → **TextLabel** → redenumește **`Txt_Monede`**  
3. Selectezi `Txt_Monede` și vezi în Viewport un dreptunghi alb cu text, desenat **pe ecran**  
4. În **Properties** schimbi:

| Proprietate | Valoare | Ce face |
|-------------|---------|---------|
| `Text` | `Monede: 0` | ce scrie pe panou |
| `Position` | `{0.02, 0}, {0.02, 0}` | colțul stânga-sus, puțin în interior |
| `Size` | `{0.2, 0}, {0.08, 0}` | 20% din lățimea ecranului, 8% din înălțime |
| `TextScaled` | bifat | textul se mărește să încapă în panou |
| `BackgroundColor3` | o culoare închisă | fundalul |
| `BackgroundTransparency` | `0.3` | puțin transparent |
| `TextColor3` | galben / alb | culoarea literelor |

*Despre `{0.2, 0}`: primul număr = **Scale** (procent din ecran, `0.2` = 20%), al doilea = **Offset** (pixeli). Cu Scale, panoul arată la fel pe laptop și pe telefon.*

**Încearcă tu — panoul (6–8 min)**  
- [ ] `GUI_Joc` în **StarterGui** cu `Txt_Monede` înăuntru  
- [ ] Panoul e în stânga-sus și arată bine  
- [ ] Play → îl vezi pe ecran (încă fără scor real)

### 3) `Cli_Scor` — LocalScript
1. Mouse peste `Txt_Monede` → **+** → **LocalScript** → redenumește **`Cli_Scor`**  
2. Scrie:

```lua
local Players = game:GetService("Players")

local eticheta = script.Parent
local player = Players.LocalPlayer

local monede = player:WaitForChild("leaderstats"):WaitForChild("Monede")

local function actualizeaza()
    eticheta.Text = "Monede: " .. monede.Value
end

actualizeaza()
monede.Changed:Connect(actualizeaza)
```

Cum se citește:  
- `script.Parent` = panoul în care stă scriptul (`Txt_Monede`)  
- **`Players.LocalPlayer`** = **jucătorul tău** (există doar în LocalScript; vezi M2 L2, Bonus)  
- `:WaitForChild("leaderstats")` = „așteaptă să apară" — scorul vine de la server și poate întârzia câteva clipe  
- `actualizeaza()` = pune în text valoarea curentă (lipită cu `..`)  
- `monede.Changed:Connect(actualizeaza)` = **când valoarea se schimbă**, cheamă funcția → panoul se actualizează singur

LocalScript-ul **stă în GUI**, pentru că GUI-ul e al clientului.

**Încearcă tu — panoul trăiește (6–8 min)**  
- [ ] Play → panoul arată `Monede: 0`  
- [ ] Iei o monedă → panoul arată `Monede: 1`  
- [ ] Output fără roșu

### 4) Cine schimbă scorul? *(important)*
Clientul **doar arată** scorul. Cine îl **schimbă** e **serverul** (`Srv_Monede`).

- Server (Script): „Ana a luat o monedă → Monede = 4"  
- Valoarea ajunge la client → `Changed` se declanșează → panoul se actualizează

*Dacă un LocalScript ar încerca să schimbe `Monede.Value`, schimbarea ar rămâne **doar la jucător** (nu o vede serverul, nu contează în joc). Exact ca la panourile din M2 L2.*

**Încearcă tu — de ce panoul nu schimbă scorul (2–3 min)**  
- [ ] Explici în 2 propoziții: de ce panoul **arată**, dar nu **hotărăște**

### 5) Un panou mai frumos *(Complet)*
1. **Culoare după scor:** în `Cli_Scor`, schimbi `actualizeaza`:

```lua
local function actualizeaza()
    eticheta.Text = "Monede: " .. monede.Value

    if monede.Value >= 5 then
        eticheta.TextColor3 = Color3.fromRGB(255, 215, 0)     -- auriu
    else
        eticheta.TextColor3 = Color3.fromRGB(255, 255, 255)   -- alb
    end
end
```

2. În Properties adaugi **rotunjire**: **+** pe `Txt_Monede` → **UICorner** (colțuri rotunjite)  
3. Încă un panou, `Txt_Titlu` (alt TextLabel în `GUI_Joc`), cu numele Obby-ului tău, sus-mijloc

**Încearcă tu — frumos (8–10 min)**  
- [ ] Textul se face **auriu** la 5+ monede  
- [ ] Panoul are colțuri rotunjite (UICorner)  
- [ ] Un titlu (`Txt_Titlu`)

---

## Greșeli frecvente
1. **LocalScript în ServerScriptService** — acolo nu rulează; ține-l **în GUI**.  
2. **Panoul nu se vede** — verifică că `GUI_Joc` e în **StarterGui** (nu în Workspace) și că `Txt_Monede` e **în** `GUI_Joc`.  
3. **Panoul e prea mic / pe margine** — `Size` și `Position` cu Scale (`0.2`, `0.08`), nu cu zero.  
4. **Scorul nu se schimbă** — `Srv_Monede` nu dă punctele (lecția L1) sau ai scris `leaderstats`/`Monede` diferit.  
5. **„Infinite yield possible on …"** (avertisment galben în Output) — `WaitForChild` așteaptă ceva ce nu există; verifică numele `leaderstats` și `Monede` în `Srv_Leaderstats`.  
6. **Text vechi care rămâne** — ai uitat `monede.Changed:Connect(actualizeaza)`.  
7. **Cod care schimbă scorul din LocalScript** — nu: scorul îl schimbă **serverul**.  
8. **Culoarea nu se schimbă la 5+ monede** — `actualizeaza()` trebuie chemată și o dată la început, și la fiecare `Changed`.

---

## De făcut azi — „Panoul meu de scor"
Salvat: `Prenume_Nume_M3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `GUI_Joc` + `Txt_Monede` + `Cli_Scor` · scorul se vede pe ecran și crește · **0 erori** |
| **Complet (ținta orei)** | Minim + panou frumos + culoare auriu la ≥5 monede + `Txt_Titlu` |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Panoul
- [ ] `GUI_Joc` în StarterGui · `Txt_Monede`  
- [ ] Poziție + mărime cu Scale  

### Pasul 2 — Scriptul *(Minim)*
- [ ] `Cli_Scor` (LocalScript) în `Txt_Monede`  
- [ ] Iei monede → textul se actualizează  
- [ ] Play · Output curat · salvat  

**→ Minim când:** un coleg ia o monedă și vede panoul tău schimbându-se.

### Pasul 3 — Frumos *(Complet)*
- [ ] Culoare după scor  
- [ ] UICorner + titlu  
- [ ] Salvat  

**Gata Complet când:** panoul arată **la fel de bine** în Play ca în editare, la orice mărime de fereastră.

---

## Bonus (dacă ai terminat Complet)
- [ ] O **bară de progres**: un `Frame` (`Bara`) cu `Size = UDim2.new(monede.Value / 10, 0, 1, 0)` — se umple la 10 monede *(indiciu: `math.min(monede.Value / 10, 1)` ca să nu depășească)*  
- [ ] Panou pentru o a doua statistică (`Nivel`, din L1 Bonus)  
- [ ] Un **text care apare doar** la 10 monede („Ești campion!") — `Visible = true/false`  
- [ ] Testezi în **Test → Clients and Servers** cu 2 jucători: fiecare vede **scorul lui**?

## Recapitulare rapidă
1. **GUI** = interfața de pe ecran; stă în **StarterGui**, în `ScreenGui`  
2. **LocalScript** în GUI citește valorile de la server  
3. **`Players.LocalPlayer`** = jucătorul tău  
4. **`.Changed:Connect(…)`** = când valoarea se schimbă, cheamă funcția  
5. **Serverul** schimbă scorul; **clientul** doar îl arată  

**Quiz scurt (cu profesorul):**  
- De ce GUI-ul stă în `StarterGui`, nu în `Workspace`?  
- Cine schimbă scorul: panoul sau `Srv_Monede`?  
- La ce folosește `monede.Changed`?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector un panou de scor și structura din Explorer.)*

## Temă
Opțional: fă un al doilea panou care arată **numele tău** (`Players.LocalPlayer.Name`) și un mesaj „Bun venit, …!".  
La **L3** adăugăm un **buton** pe ecran care trimite un mesaj la server: **RemoteEvent**.
