# Lecția 3 — Inamic simplu (NPC)
**Modulul 4 · Game Creator**  
**Code Maker Club · Roblox Studio**

> Un Obby devine mai viu când are **ceva care se mișcă**. Azi faci un **inamic** care patrulează pe traseu și te **rănește** la atingere — iar cei rapizi construiesc unul care **te urmărește**.  
> Place: `Prenume_Nume_M4` (ex. `Ana_Pop_M4`)

---

## Obiectiv
La finalul orei ai în Obby un inamic care se mișcă singur și îți ia viață când îl atingi, cu reguli **corecte** (o pauză între lovituri, Obby-ul rămâne terminabil).  
**Minimum:** un Part `Inamic` care **patrulează** între două puncte (animație cu `TweenService`) + un `Srv_Inamic` care îi dă jucătorului **34 de viață** (cu `TakeDamage`) la atingere, cu **pauză** între lovituri · **0 erori**.  
**Ținta orei (Complet):** Minim + un **al doilea inamic** (un personaj `Inamic_Urmaritor`, cu `Humanoid`) care **urmărește** cel mai apropiat jucător, din apropiere.

## De ce contează
Inamicul adaugă **risc** și **ritm**: trebuie să cronometrezi săritura. Dar un inamic prost făcut e **nedrept**: te lovește fără să poți face nimic, sau te blochează pe loc.  
Azi înveți să faci un NPC **corect** (jucătorul poate câștiga) și să-l **controlezi pe server**.

**Un NPC** („Non-Player Character") = un personaj sau obiect controlat **de joc**, nu de un jucător.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + ce înseamnă un inamic „corect" |
| 10–50 | Pas cu pas: patrulare + lovitură (**Încearcă tu**) |
| 50–105 | Proiectul „Inamicul din Obby" (vezi **Minim vs Complet**) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `TweenService` · `TweenInfo` · `TakeDamage` · `Humanoid:MoveTo` · `Rig Builder` · `SetNetworkOwner` · distanță (`Magnitude`).

---

## Pas cu pas

### 1) Un inamic „corect"
Gândește-te la regulile de joc:

| Regulă | De ce |
|--------|-------|
| **Mișcare previzibilă** | jucătorul învață tiparul și îl poate evita |
| **Lovitură mică** (nu „game over" instant) | greșeala costă, dar nu te elimină |
| **Pauză între lovituri** | să nu pierzi toată viața într-o clipă |
| **Obby-ul rămâne terminabil** | există o fereastră de timp ca să treci |
| **Aspect prietenos** | joc pentru copii: culoare vie, formă simpatică |

**Încearcă tu — cu vocea (2–3 min)**  
- [ ] Spui de ce un inamic care te omoară instant, fără semn, e „nedrept"  
- [ ] Alegi unde îl pui în Obby (pe un loc lat, unde poți sări peste el)

### 2) Construim inamicul
1. Un Part **`Inamic`**: formă de bilă sau cub, **culoare vie** (ex. magenta), **Material** Neon  
2. **Anchor** activ (îl mișcăm noi prin cod)  
3. Pune-l pe o **platformă lată**, ca să ai loc să-l ocolești sau să sari peste el  
4. Locul **de plecare** e pe platformă; scriptul îl va muta **20 de unități** într-o parte, apoi înapoi

**Încearcă tu — corpul inamicului (3–4 min)**  
- [ ] `Inamic` (Part), ancorat, colorat  
- [ ] Platforma de sub el e lată și sigură

### 3) Patrulare cu `TweenService`
Un **Tween** e o **animație automată**: îi spui de unde pleci, unde ajungi și în cât timp, iar Roblox se ocupă de restul.

În **ServerScriptService** creează `Srv_Inamic`:

```lua
local TweenService = game:GetService("TweenService")

local inamic = workspace:WaitForChild("Inamic")

local start = inamic.Position
local capat = start + Vector3.new(20, 0, 0)       -- 20 de unități pe axa X

local info = TweenInfo.new(
    3,                              -- durata unui drum (secunde)
    Enum.EasingStyle.Linear,        -- viteză constantă
    Enum.EasingDirection.InOut,
    -1,                             -- repetă la nesfârșit
    true                            -- merge și înapoi
)

local tween = TweenService:Create(inamic, info, {Position = capat})
tween:Play()
```

Cum se citește:  
- `TweenService:Create(obiect, info, {Proprietate = valoare})` = „animă **Position** a lui `inamic` până la `capat`"  
- `TweenInfo.new(durata, stil, direcție, repetări, înapoi)` = „cum se petrece"  
- `-1` la repetări = **la infinit**; `true` = „la sfârșit, întoarce-te"  
- `{Position = capat}` e un **dicționar** (de la L1)

Play → inamicul merge dus-întors, fără să mai scrii o buclă.

*Dacă merge pe o direcție greșită, schimbă `Vector3.new(20, 0, 0)` în `Vector3.new(0, 0, 20)` sau altă direcție.*

**Încearcă tu — patrulare (6–8 min)**  
- [ ] Inamicul se mișcă dus-întors fără să iasă de pe platformă  
- [ ] Schimbi `3` (secunde) și vezi viteza schimbându-se  
- [ ] Output curat

### 4) Lovitura — dar corectă
În **același** `Srv_Inamic`, **adaugă** sub `tween:Play()`:

```lua
local Players = game:GetService("Players")

local PAGUBA = 34            -- din 100 de viață
local PAUZA = 1.5            -- secunde între lovituri
local liber = true

local function cuAtins(hit)
    if not liber then
        return
    end

    local player = Players:GetPlayerFromCharacter(hit.Parent)
    if not player then
        return
    end

    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
    if humanoid and humanoid.Health > 0 then
        liber = false
        humanoid:TakeDamage(PAGUBA)
        print(player.Name .. " a fost lovit")
        task.wait(PAUZA)
        liber = true
    end
end

inamic.Touched:Connect(cuAtins)
```

- **`humanoid:TakeDamage(34)`** = ia 34 din viață (diferit de `Health = 0`, care omoară instant)  
- La **3 lovituri** (3 × 34 > 100) jucătorul **se resetează**; Roblox îi **reface** treptat viața când nu e lovit  
- `liber` = „frâna" ca la M2 L6 (o singură lovitură în `PAUZA` secunde)  
- Dacă ai `Srv_Vieti` (M3 L7), când viața ajunge la 0 se declanșează `Died`, deci pierzi și o **viață** din joc

**Încearcă tu — lovitura (6–8 min)**  
- [ ] Atingi inamicul → pierzi o parte din viață (bara de viață din Roblox scade)  
- [ ] Nu pierzi toată viața dintr-odată  
- [ ] La a treia lovitură te resetezi și reapari la checkpoint  
- [ ] Output curat

### 5) Inamicul urmăritor *(Complet)*
Acum un NPC cu **`Humanoid`**, care **merge** către jucător.

**a) Construcția.** În Studio: tab **Avatar** → **Rig Builder** → **Block Rig** (R15). Apare un personaj. Redenumește-l **`Inamic_Urmaritor`**, pune-l pe o platformă lată și dă-i culori vii (în **Properties** ale pieselor). El **nu** trebuie ancorat.

**b) Scriptul.** În **ServerScriptService**, `Srv_Urmaritor`:

```lua
local Players = game:GetService("Players")

local npc = workspace:WaitForChild("Inamic_Urmaritor")
local humanoid = npc:WaitForChild("Humanoid")
local radacina = npc:WaitForChild("HumanoidRootPart")

radacina:SetNetworkOwner(nil)       -- serverul controlează NPC-ul (nu un jucător)
humanoid.WalkSpeed = 10             -- mai lent decât jucătorul (16)

local DISTANTA_MAX = 40
local PAGUBA = 25
local PAUZA = 1.5
local liber = true

local function celMaiAproape()
    local cea = nil
    local distCea = DISTANTA_MAX

    for _, player in Players:GetPlayers() do
        local personaj = player.Character
        local r = personaj and personaj:FindFirstChild("HumanoidRootPart")
        if r then
            local d = (r.Position - radacina.Position).Magnitude
            if d < distCea then
                cea = r
                distCea = d
            end
        end
    end

    return cea
end

radacina.Touched:Connect(function(hit)
    if not liber then
        return
    end
    if hit:IsDescendantOf(npc) then
        return                              -- ignorăm propriul corp
    end

    local player = Players:GetPlayerFromCharacter(hit.Parent)
    local h = hit.Parent:FindFirstChildOfClass("Humanoid")
    if player and h and h.Health > 0 then
        liber = false
        h:TakeDamage(PAGUBA)
        task.wait(PAUZA)
        liber = true
    end
end)

while true do
    local tinta = celMaiAproape()
    if tinta then
        humanoid:MoveTo(tinta.Position)
    end
    task.wait(0.5)
end
```

Cum merge:  
- **`SetNetworkOwner(nil)`** = serverul „stăpânește" mișcarea NPC-ului; altfel ar putea fi controlat de calculatorul unui jucător apropiat și s-ar mișca sacadat  
- `celMaiAproape()` caută jucătorul **în raza de 40 de unități** (distanța se măsoară ca la M3 L4)  
- **`humanoid:MoveTo(punct)`** = „mergi spre punctul acela"; îl repetăm la fiecare jumătate de secundă, ca să urmărească jucătorul  
- `hit:IsDescendantOf(npc)` = „e o parte a NPC-ului însuși?" (altfel s-ar răni singur)  
- `while true` are `task.wait(0.5)` înăuntru (regula de aur)

*NPC-ul e mai lent decât jucătorul: **se poate fugi de el**. Asta e o regulă de corectitudine.*

**Încearcă tu — urmăritorul (10–12 min)**  
- [ ] Te apropii → te urmărește  
- [ ] Te îndepărtezi → se oprește  
- [ ] Atingerea îți ia viață cu pauză între lovituri  
- [ ] Poți fugi de el și poți termina Obby-ul  
- [ ] Output curat

---

## Greșeli frecvente
1. **`Inamic` neancorat** (varianta Tween) — cade sau se împinge; trebuie **Anchored**.  
2. **Numele nu se potrivesc** (`Inamic`, `Inamic_Urmaritor`) — *„Infinite yield"*.  
3. **Texte lipite cu `+`** (`player.Name + " …"`) — eroare; textele se lipesc cu **`..`**.  
4. **Fără pauză între lovituri** — pierzi toată viața într-o clipă.  
5. **NPC-ul se rănește singur** — lipsește `hit:IsDescendantOf(npc)`.  
6. **`SetNetworkOwner(nil)` lipsește** — urmăritorul se mișcă sacadat sau „zboară".  
7. **Urmăritorul e mai rapid decât jucătorul** — nedrept; `WalkSpeed` sub 16.  
8. **Inamicul pe singura cale îngustă** — nu ai cum să-l eviți; lărgește platforma.  
9. **Prea mulți inamici** — jocul devine lent și greu; 1–2 sunt suficienți.  
10. **Doi inamici pe același Part** — fiecare inamic are propriul Part și propriul script.

---

## De făcut azi — „Inamicul din Obby"
Salvat: `Prenume_Nume_M4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `Inamic` care **patrulează** (Tween) + **lovitură** cu `TakeDamage` și pauză + Obby terminabil · **0 erori** |
| **Complet (ținta orei)** | Minim + `Inamic_Urmaritor` (Rig + `MoveTo`) mai lent decât jucătorul |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Corp și platformă
- [ ] `Inamic`, ancorat, pe o platformă lată  

### Pasul 2 — Patrulare + lovitură *(Minim)*
- [ ] `Srv_Inamic` cu Tween + `Touched` + `TakeDamage`  
- [ ] Un coleg trece pe lângă el, fără să fie lovit **nedrept**  
- [ ] Salvat  

**→ Minim când:** poți trece de inamic **cronometrând** săritura.

### Pasul 3 — Urmăritorul *(Complet)*
- [ ] `Inamic_Urmaritor` + `Srv_Urmaritor`  
- [ ] Mai lent decât jucătorul  
- [ ] Obby-ul rămâne terminabil  
- [ ] Salvat  

**Gata Complet când:** un coleg nu ajunge la Finish fără să fie urmărit, **dar** poate scăpa de inamic.

---

## Bonus (dacă ai terminat Complet)
- [ ] Inamicul **își schimbă culoarea** când te lovește (apoi revine; ca la M2 L6)  
- [ ] Un **sunet** la lovitură (`Sound` în `Inamic`, `inamic.Sound:Play()`)  
- [ ] Inamic care patrulează pe **două axe** (alt `Tween` după primul: `tween.Completed:Wait()`)  
- [ ] Inamicul **moare** dacă sari pe el (verifici dacă `hit` e deasupra) — cercetează și întreabă  
- [ ] `PAUZA` **per jucător** (cu un `Attribute`, ca la M3 L8), ca un jucător să nu „acopere" lovitura altuia

## Recapitulare rapidă
1. **NPC** = personaj sau obiect controlat de joc, **pe server**  
2. **`TweenService`** animă o proprietate (de ex. `Position`) fără bucle  
3. **`TakeDamage`** rănește treptat; **pauză** (`liber`) între lovituri  
4. NPC cu `Humanoid`: **`MoveTo`** + **`SetNetworkOwner(nil)`**  
5. Un inamic **corect** e previzibil și poate fi evitat  

**Quiz scurt (cu profesorul):**  
- Ce face `TweenInfo.new(3, …, -1, true)`?  
- De ce folosim `TakeDamage`, nu `Health = 0`?  
- De ce NPC-ul urmăritor trebuie să fie mai lent decât jucătorul?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector un inamic care patrulează și bara de viață scăzând.)*

## Temă
Opțional: desenează pe o foaie **3 inamici** pentru Obby-ul tău: cum arată, cum se mișcă, ce fac când te ating.  
La **L4** deschidem un **magazin** în joc: cu monedele tale cumperi o putere, iar serverul **verifică plata**.
