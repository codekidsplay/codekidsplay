# Lecția 4 — Serverul decide (securitate de bază)
**Modulul 3 · Game Logic**  
**Code Maker Club · Roblox Studio**

> Azi descoperi o regulă de aur pentru jocuri online: **clientul poate minți, serverul verifică**. Repari butonul de bonus din L3, ca să nu poată fi „păcălit" sau apăsat la nesfârșit.  
> Place: `Prenume_Nume_M3` (ex. `Ana_Pop_M3`)  
> *Lecția se reia la **M4 L4** (magazin): „serverul verifică plata".*

---

## Obiectiv
La finalul orei `Srv_Bonus` **nu mai are încredere oarbă** în client: ține o **pauză** între bonusuri, decide **singur** suma și verifică dacă jucătorul chiar poate cere bonusul.  
**Minimum:** `Srv_Bonus` cu **pauză de 30 de secunde** (cooldown) între două bonusuri + suma stabilită **de server** · **0 erori**.  
**Ținta orei (Complet):** Minim + verificarea **tipului** primit de la client (`"mic"` / `"mare"`) + verificarea că jucătorul e **aproape** de `Zona_Bonus` + un mesaj de refuz.

## De ce contează
Butonul din L3 are o problemă mare: oricine poate apăsa de 1000 de ori, și primește 5000 de monede. Și dacă am fi lăsat clientul să **trimită suma**, ar fi putut spune „vreau 999999".

Într-un joc online, **ce se întâmplă pe calculatorul jucătorului nu poate fi garantat**: unii oameni modifică jocul de pe calculatorul lor ca să trișeze. Asta strică distracția celorlalți.  
Meseria programatorului e să construiască jocul așa încât **trișatul să nu meargă**, nu să „spere" că nimeni nu încearcă.

**Azi învățăm să ne apărăm jocul, nu să atacăm altele.** Nu căutăm și nu folosim programe de trișat. Regula e simplă: **serverul decide**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Obiectiv + problema din L3 (discuție) |
| 15–55 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 55–105 | Proiectul „Bonus sigur" (vezi **Minim vs Complet**) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `os.time()` · `GetAttribute` / `SetAttribute` · `return` timpuriu · `typeof` · `Magnitude` · `if … and …`.

---

## Pas cu pas

### 1) Ce poate merge prost?
Scriptul din L3:

```lua
local function cuCerere(player)
    player.leaderstats.Monede.Value += 5
end
```

Probleme:

| # | Ce se întâmplă | De ce e rău |
|---|----------------|-------------|
| 1 | apeși de 100 de ori pe secundă | monede **fără limită** |
| 2 | clientul ar putea cere bonusul **de oriunde** | nu contează dacă joci sau nu |
| 3 | dacă am lăsa clientul să trimită **suma** | oricine poate cere orice sumă |

Varianta **periculoasă** (nu o scriem niciodată!):

```lua
-- GREȘIT: clientul hotărăște cât primește
local function cuCerere(player, suma)
    player.leaderstats.Monede.Value += suma
end
```

Aici, orice cod care sună serverul poate trimite `suma = 1000000`.

**Încearcă tu — găsește greșeala (3–4 min)**  
- [ ] Explici cu vocea de ce varianta cu `suma` e periculoasă  
- [ ] Spui ce ar trebui să facă serverul în loc

### 2) Regulile serverului
1. **Clientul cere, serverul hotărăște.** Clientul trimite doar „vreau bonus"; **suma** o știe serverul.  
2. **Verifică tot ce primești.** Un text? Un număr? Ceva neașteptat? Ignoră.  
3. **Limitează cât de des.** O pauză (cooldown) oprește spam-ul.  
4. **Verifică situația.** E jucătorul aproape? E viu? Are dreptul?  
5. **Nu te baza pe „am făcut asta" de la client.** Doar pe ce **vede serverul însuși**.

**Frază de ținut minte:** *„Clientul poate minți. Serverul verifică."*

### 3) Pauza între bonusuri (cooldown)
Un jucător poate cere bonus doar la **30 de secunde**. Trebuie să ținem minte **când** a cerut ultima oară. Pentru asta folosim un **„post-it" pe jucător**: un **Attribute**.

```lua
player:SetAttribute("UltimulBonus", 12345)         -- scrii post-it-ul
local valoare = player:GetAttribute("UltimulBonus") -- îl citești (nil dacă nu există)
```

Și `os.time()` = **ora curentă în secunde** (un număr care crește).

Înlocuiește tot din `Srv_Bonus` cu:

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Ev_Bonus = ReplicatedStorage:WaitForChild("Ev_Bonus")

local PAUZA = 30      -- secunde între două bonusuri
local SUMA = 5        -- suma o hotărăște SERVERUL

local function cuCerere(player)
    local acum = os.time()
    local ultima = player:GetAttribute("UltimulBonus") or 0

    if acum - ultima < PAUZA then
        print(player.Name .. " a cerut prea devreme")
        return
    end

    player:SetAttribute("UltimulBonus", acum)
    player.leaderstats.Monede.Value += SUMA
    print(player.Name .. " a primit " .. SUMA .. " monede")
end

Ev_Bonus.OnServerEvent:Connect(cuCerere)
```

Cum merge:  
- `or 0` = „dacă nu există post-it (nil), consideră 0" (la prima cerere trece imediat)  
- `acum - ultima < PAUZA` = „a trecut mai puțin de 30 de secunde?"  
- **`return`** = ieși din funcție, **fără** să dai bonusul  
- `PAUZA` și `SUMA` scrise cu **litere mari** = valori fixe („constante"), ușor de schimbat sus

**Încearcă tu — pauza (6–8 min)**  
- [ ] Prima apăsare → +5  
- [ ] A doua apăsare imediat → **nimic** (mesaj în Output)  
- [ ] După 30 de secunde → iar merge  
- [ ] Output curat

### 4) Suma nu vine de la client
În codul de mai sus, `FireServer()` din `Cli_Bonus` **nu trimite nicio sumă**. Tot ce face serverul e să zică: „+`SUMA`", stabilită **în script-ul lui**.

Chiar dacă cineva ar chema `Ev_Bonus:FireServer(999999)`, funcția `cuCerere(player)` **ignoră** orice alt argument. Asta e protecția.

**Încearcă tu — suma sigură (2–3 min)**  
- [ ] În `Cli_Bonus` încerci (doar la tine) `Ev_Bonus:FireServer(1000)`  
- [ ] Verifici că scorul crește doar cu **SUMA** (5), nu cu 1000

### 5) Verificăm ce primim *(Complet)*
Acum clientul trimite un **tip**: `"mic"` sau `"mare"`. Serverul **traduce** tipul în sumă, iar orice altceva îl refuză.

1. În `Cli_Bonus`: `Ev_Bonus:FireServer("mic")`  
2. În `Srv_Bonus` schimbi funcția:

```lua
local function cuCerere(player, tip)
    if typeof(tip) ~= "string" then
        return                                 -- nu e text → ignor
    end

    local suma = 0
    if tip == "mic" then
        suma = 5
    elseif tip == "mare" then
        suma = 10
    else
        return                                 -- tip necunoscut → ignor
    end

    -- … pauza de mai sus, apoi:
    player.leaderstats.Monede.Value += suma
end
```

- `typeof(tip) ~= "string"` = „tipul **nu** e text" (ai învățat `typeof` la M2 L3)  
- Suma e **`suma`**, hotărâtă de server din `tip`; clientul nu poate cere altceva  
- Orice nu e `"mic"` sau `"mare"` primește `return` — adică **ignorat**

*Pune și blocul cu pauza (pasul 3) înăuntru, **înainte** de `player.leaderstats…`.*

**Încearcă tu — tipul verificat (6–8 min)**  
- [ ] `"mic"` → +5 · `"mare"` → +10  
- [ ] `FireServer("hacker")` sau `FireServer(7)` → **nimic**, fără erori roșii  
- [ ] Pauza merge în continuare

### 6) „Ești aproape?" *(Complet)*
Verificăm că jucătorul e lângă **`Zona_Bonus`**.

1. Un Part vizibil, **`Zona_Bonus`**, mai larg (ca o platformă), **Anchor**  
2. În `Srv_Bonus`, **sus** (după `Ev_Bonus`):

```lua
local zona = workspace:WaitForChild("Zona_Bonus")
local DISTANTA_MAX = 20

local function esteAproape(player)
    local personaj = player.Character
    local radacina = personaj and personaj:FindFirstChild("HumanoidRootPart")
    if not radacina then
        return false
    end
    return (radacina.Position - zona.Position).Magnitude <= DISTANTA_MAX
end
```

3. La începutul `cuCerere` (înainte de pauză):

```lua
    if not esteAproape(player) then
        print(player.Name .. " e prea departe de Zona_Bonus")
        return
    end
```

- `personaj and personaj:FindFirstChild(…)` = „dacă există personaj, caută în el; altfel `nil`"  
- `HumanoidRootPart` = „centrul" corpului  
- `(A - B).Magnitude` = **distanța** dintre două puncte  
- Funcția întoarce `true` / `false` (return, ca la M2 L5)

**Încearcă tu — aproape / departe (6–8 min)**  
- [ ] Lângă `Zona_Bonus`: butonul merge  
- [ ] Departe: **nu** merge, mesaj în Output  
- [ ] Output fără roșu

---

## Greșeli frecvente
1. **Suma vine din client** — `function(player, suma)` urmat de `+= suma`. Suma o decide **serverul**.  
2. **Lipsește pauza** — apeși rapid și primești la nesfârșit.  
3. **`GetAttribute` returnează `nil`** — la prima cerere; de aceea `or 0`.  
4. **Pauza pusă pe client** (într-un `LocalScript`) — nu ajută: clientul poate ocoli. Pauza se pune **pe server**.  
5. **Verificarea de distanță pe client** — la fel, nu ajută; serverul verifică.  
6. **`player.Character` poate fi `nil`** (la respawn) — de aceea `personaj and …`.  
7. **Mesaj de refuz uitat** — fără `print`, nu știi **de ce** nu merge; adaugă mesaje.  
8. **Încredere în ce spune clientul despre joc** (ex. „am terminat Obby-ul") — Finish-ul, monedele și checkpoint-urile se verifică **pe server**, cu `Touched`.

---

## De făcut azi — „Bonus sigur"
Salvat: `Prenume_Nume_M3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `Srv_Bonus` cu **pauză 30 s** + **suma stabilită de server** + `return` la cerere prea devreme · **0 erori** |
| **Complet (ținta orei)** | Minim + verificare `typeof` + tip `"mic"`/`"mare"` + verificare **aproape de `Zona_Bonus`** |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Discuția
- [ ] Ai găsit cele 3 probleme din L3  
- [ ] Ai spus regula: „Clientul cere, serverul hotărăște"  

### Pasul 2 — Pauza + suma *(Minim)*
- [ ] `PAUZA` + `SUMA` + `os.time()` + `Attribute`  
- [ ] Testat: rapid → refuzat; după 30 s → ok  
- [ ] Salvat  

**→ Minim când:** poți apăsa butonul de 20 de ori într-un minut și primești bonusul **cel mult de 2 ori**.

### Pasul 3 — Verificări *(Complet)*
- [ ] `typeof` + tipuri `"mic"` / `"mare"`  
- [ ] `Zona_Bonus` + `esteAproape`  
- [ ] Mesaje clare în Output  
- [ ] Salvat  

**Gata Complet când:** orice cerere ciudată (tip greșit, prea departe, prea devreme) este **ignorată** fără erori.

---

## Bonus (dacă ai terminat Complet)
- [ ] Trimite jucătorului **mesajul de refuz** pe ecran (cu `Ev_Mesaj:FireClient`) în loc de `print`  
- [ ] Arată pe `Btn_Bonus` cât mai ai de așteptat (server → client, cu numărul de secunde)  
- [ ] A treia verificare: jucătorul trebuie să fie **în viață** (`humanoid.Health > 0`)  
- [ ] Scrie pe o foaie **3 lucruri dintr-un joc Roblox** pe care serverul trebuie să le verifice (ex. cumpărături, teleportări, damage)

## Recapitulare rapidă
1. **Clientul poate minți. Serverul verifică.**  
2. Clientul trimite **cereri**; **suma / rezultatul** îl hotărăște serverul  
3. **Pauză (cooldown)** cu `os.time()` + `Attribute`  
4. **Validezi** tipul și valorile: ce nu știi → `return`  
5. Verifici **situația** (distanță, viață) pe server  

**Quiz scurt (cu profesorul):**  
- De ce suma nu trebuie să vină de la client?  
- La ce ajută `return` într-un `if` de refuz?  
- Unde trebuie pusă verificarea: pe client sau pe server? De ce?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector un `Srv_Bonus` complet, cu cele patru verificări.)*

## Temă
Opțional: alege un lucru din jocul tău (poarta, un buton, bonusul) și scrie **2 reguli** pe care serverul trebuie să le verifice înainte să-l lase să funcționeze.  
La **L5** facem checkpoint-uri care **țin minte** unde ai ajuns în joc.
