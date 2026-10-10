# Lecția 1 — ModuleScript: o trusă de scule pentru cod
**Modulul 4 · Game Creator**  
**Code Maker Club · Roblox Studio**

> Azi înveți să-ți **organizezi codul**: scrii o funcție **o singură dată**, într-un **ModuleScript**, și o folosești din oricâte scripturi vrei. La final, Obby-ul tău are o „trusă de scule" pentru scor, pe care o vei folosi și la salvare, și la magazin.  
> Place: `Prenume_Nume_M4` — **copie** a Place-ului din M3 (ex. `Ana_Pop_M4`)  
> *Plasă de siguranță: dacă Obby-ul tău din M3 nu mai e jucabil, profesorul îți dă un **Place de bază** (Obby + scor), cu aceleași nume ca în M3, și continui din el.*

---

## Obiectiv
La finalul orei ai un `ModuleScript` numit `Mod_Statistici`, cu funcții pentru scor, pe care le **chemi** din alte scripturi cu `require`.  
**Minimum:** Place `Prenume_Nume_M4` salvat + `Mod_Statistici` cu funcția `adauga` + **un** script (`Srv_Monede`) care o folosește în locul liniei vechi · Obby-ul merge ca înainte · **0 erori** în Output.  
**Ținta orei (Complet):** Minim + funcțiile `ia` și `seteaza` + modulul folosit în **cel puțin 3** scripturi (`Srv_Monede`, `Srv_Bonus`, `Srv_Finish`) + o **tabelă** cu valorile monedelor.

## De ce contează
În M3 ai scris de mai multe ori aceleași lucruri: `player.leaderstats.Monede.Value += …` în trei-patru scripturi. Dacă vrei să schimbi ceva (de exemplu să nu dea eroare când scorul lipsește), trebuie să cauți peste tot.

Programatorii buni fac așa: scriu **o dată**, într-un loc, și **refolosesc**. Locul acesta e **ModuleScript**-ul.

**Azi nu salvăm încă între sesiuni.** Salvarea (DataStore) vine la **L2**, și o vom pune tot într-un modul.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Obiectiv + copia `_M4` + numele din lume |
| 15–50 | Pas cu pas: tabele + primul modul (**Încearcă tu**) |
| 50–105 | Proiectul „Trusa de scor" (vezi **Minim vs Complet**) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `ModuleScript` · `require` · **tabele** (liste și „dicționare") · funcții într-o tabelă · `return`.

---

## Pas cu pas

### 1) Copia `_M4` și lista de nume
1. Deschizi `Prenume_Nume_M3`  
2. **File → Save to Roblox As…** (sau **Save As…**) → **`Prenume_Nume_M4`**  
3. De acum lucrezi **doar** în `_M4`; `_M3` rămâne ca rezervă

Verifică lista cu ce există din M3 (nume exacte):

| Unde | Ce |
|------|-----|
| **ServerScriptService** | `Srv_Leaderstats`, `Srv_Monede`, `Srv_Bonus`, `Srv_Checkpoint`, `Srv_Zona`, `Srv_Respawn`, `Srv_Vieti` **sau** `Srv_Timp`, `Srv_Finish` |
| **ReplicatedStorage** | `Ev_Bonus`, `Ev_Mesaj` (și `Timp`, dacă ai timer) |
| **StarterGui → GUI_Joc** | panourile și butoanele tale (`Txt_Monede`, `Btn_Bonus`, …) |
| **Workspace** | `Spawn`, `Finish`, folderele `Monede` și `Checkpoints`, `Zona_Cadere`, `Zona_Bonus` |

**Încearcă tu — pregătirea (5 min)**  
- [ ] Place-ul se numește `Prenume_Nume_M4`  
- [ ] Un Play scurt: scorul, checkpoint-urile, Finish-ul merg ca în M3  
- [ ] Output curat înainte să schimbăm ceva

### 2) Problema: același cod, în mai multe locuri
Cauți în scripturile tale linia:

```lua
player.leaderstats.Monede.Value += 1
```

Probleme:
- apare în **mai multe** scripturi (monede, bonus, finish)  
- dacă `leaderstats` lipsește o clipă, scriptul dă **eroare roșie**  
- dacă vrei să schimbi numele `Monede`, îl cauți peste tot

Vrem **o singură funcție**, scrisă bine, pe care o chemăm de oriunde.

### 3) Tabele — un lucru nou și foarte util
O **tabelă** e o „cutie cu mai multe lucruri înăuntru". Are două forme:

**a) Listă** — lucrurile au un număr de ordine, de la 1:

```lua
local culori = {"rosu", "galben", "verde"}

print(culori[1])        -- rosu
print(culori[3])        -- verde
print(#culori)          -- 3 (câte sunt)

for _, culoare in culori do
    print(culoare)
end
```

**b) „Dicționar"** — lucrurile au un **nume**:

```lua
local valori = {Mica = 1, Mare = 5}

print(valori.Mare)          -- 5
print(valori["Mica"])       -- 1
valori.Uriasa = 20          -- adaugi o intrare nouă
```

- `{ … }` = tabela  
- `valori.Mare` = „ce e scris la **Mare**"  
- `for _, x in lista do` — îl cunoști de la M3 (`Players:GetPlayers()` e o listă!)

**Încearcă tu — tabele (4–5 min)**  
- [ ] `Srv_Test` (temporar) în ServerScriptService cu o listă și un dicționar  
- [ ] Afișezi un element din fiecare + `#lista`  
- [ ] Ștergi `Srv_Test` după ce ai terminat

### 4) Primul ModuleScript
Un **ModuleScript** e un script **care nu rulează singur**. El conține **unelte** (funcții) și le **dă** altor scripturi. Mereu se termină cu **`return`**.

1. **ServerScriptService** → **+** → **ModuleScript** → redenumește **`Mod_Statistici`**  
2. Șterge ce e în el și scrie:

```lua
local Statistici = {}

-- funcție "privată": o folosește doar modulul
local function gasesteStat(player, numeStat)
    local stats = player:FindFirstChild("leaderstats")
    if not stats then
        return nil
    end
    return stats:FindFirstChild(numeStat)
end

-- funcție "publică": o pot chema și alte scripturi
function Statistici.adauga(player, numeStat, cantitate)
    local stat = gasesteStat(player, numeStat)
    if stat then
        stat.Value += cantitate
    end
end

return Statistici
```

Cum se citește:  
- `local Statistici = {}` = o tabelă goală; în ea punem funcțiile pe care vrem să le „dăm"  
- `function Statistici.adauga(…)` = o funcție care stă **în** tabelă (se cheamă `Statistici.adauga(…)`)  
- `local function gasesteStat` = o funcție **doar a modulului** (ceilalți nu o văd)  
- `return Statistici` = „asta e trusa mea; poți s-o iei"

**Convenție:** modulele încep cu **`Mod_`**.

**Unde pun modulul?**

| Loc | Cine îl vede | Pentru ce |
|-----|--------------|-----------|
| **ServerScriptService** (sau ServerStorage) | **doar serverul** | cod despre scor, recompense, salvare |
| **ReplicatedStorage** | **și clientul** | cod pe care îl folosește și interfața |

Modulul nostru e despre **scor**, deci stă pe **server**.

**Încearcă tu — modulul există (3–4 min)**  
- [ ] `Mod_Statistici` în ServerScriptService, cu `adauga` și `return`  
- [ ] Nu apare roșu în editor

### 5) Folosim modulul cu `require`
**`require(modul)`** = „adu-mi trusa". Îl chemi **o singură dată** în fiecare script, sus.

În `Srv_Monede`, sus, adaugi:

```lua
local ServerScriptService = game:GetService("ServerScriptService")
local Statistici = require(ServerScriptService:WaitForChild("Mod_Statistici"))
```

…și **înlocuiești** linia:

```lua
        player.leaderstats.Monede.Value += 1
```

cu:

```lua
        Statistici.adauga(player, "Monede", 1)
```

Play → iei o monedă → scorul crește ca înainte. Dar acum, dacă lipsește `leaderstats`, scriptul **nu mai dă eroare**.

*Detaliu: un ModuleScript rulează **o singură dată** (prima dată când cineva îl cere). Toate scripturile primesc **aceeași** tabelă.*

**Încearcă tu — require (6–8 min)**  
- [ ] `Srv_Monede` folosește `Statistici.adauga`  
- [ ] Monedele dau scor ca înainte  
- [ ] Output curat

### 6) Mai multe unelte *(Complet)*
Adaugă în `Mod_Statistici`, **înainte** de `return`:

```lua
function Statistici.ia(player, numeStat)
    local stat = gasesteStat(player, numeStat)
    if stat then
        return stat.Value
    end
    return 0
end

function Statistici.seteaza(player, numeStat, valoare)
    local stat = gasesteStat(player, numeStat)
    if stat then
        stat.Value = valoare
    end
end
```

Folosește-le:
- `Srv_Bonus`: `Statistici.adauga(player, "Monede", SUMA)` în loc de `player.leaderstats…`  
- `Srv_Finish`: `Statistici.adauga(player, "Victorii", 1)` și `Statistici.adauga(player, "Monede", BONUS_MONEDE)` (după ce pui `require` sus în fiecare script)  
- `Statistici.ia(player, "Monede")` îți dă numărul de monede (de exemplu pentru un `if`)

### 7) Valorile monedelor într-o tabelă *(Complet)*
Dacă ai monede diferite (`Moneda`, `MonedaMare`), pune valorile într-un **dicționar**, în `Srv_Monede`, sus:

```lua
local VALORI = {
    Moneda = 1,
    MonedaMare = 5,
}
```

…iar în funcția de atingere:

```lua
        local valoare = VALORI[moneda.Name] or 1
        Statistici.adauga(player, "Monede", valoare)
```

- `VALORI[moneda.Name]` = „caută în dicționar valoarea monedei cu **numele** acesta"  
- `or 1` = dacă numele nu e în dicționar (nil), dă 1

**Încearcă tu — Complet (10–12 min)**  
- [ ] Modulul are `adauga`, `ia`, `seteaza`  
- [ ] Modulul e folosit în **3 scripturi**  
- [ ] Monedele dau valori din dicționar  
- [ ] Output curat

---

## Greșeli frecvente
1. **Uiți `return`** la sfârșitul modulului — eroare: *„Module code did not return exactly one value"*.  
2. **Modulul e un `Script`, nu `ModuleScript`** — nu poate fi cerut cu `require`.  
3. **Numele din `require` diferă de cel din Explorer** — *„Infinite yield possible"*; verifică `Mod_Statistici`.  
4. **Scrii `Statistici:adauga(...)` (două puncte)** — pentru aceste funcții se folosește **punct**: `Statistici.adauga(…)`.  
5. **`require` în interiorul unei funcții**, de zeci de ori — îl pui o dată, sus.  
6. **Modul pe client care folosește scor** — modulul de scor stă pe **server** (ServerScriptService).  
7. **Funcția chemată înainte să existe** în modul — definițiile sunt **înainte** de `return`.  
8. **Ștergi vechiul cod și nu mai merge nimic** — fă o copie de siguranță (`_bak`) înainte de refactorizare.

---

## De făcut azi — „Trusa de scor"
Salvat: `Prenume_Nume_M4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | `Mod_Statistici` cu `adauga` + **un** script care o folosește cu `require` · Obby-ul merge ca înainte · **0 erori** |
| **Complet (ținta orei)** | Minim + `ia` și `seteaza` + modulul în **≥3** scripturi + dicționar de valori |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Pregătire
- [ ] Copie `_M4` · Obby verificat  
- [ ] Tabele încercate în `Srv_Test`

### Pasul 2 — Modulul *(Minim)*
- [ ] `Mod_Statistici` + `adauga`  
- [ ] `Srv_Monede` cu `require`  
- [ ] Play · scor ok · salvat  

**→ Minim când:** monedele dau scor, iar linia veche din `Srv_Monede` a dispărut.

### Pasul 3 — Mai multe scripturi *(Complet)*
- [ ] `ia`, `seteaza`  
- [ ] `Srv_Bonus` și `Srv_Finish` folosesc modulul  
- [ ] Dicționarul `VALORI`  
- [ ] Salvat  

**Gata Complet când:** nu mai există nicio linie `player.leaderstats.Monede.Value +=` în scripturile tale (cu excepția modulului).

---

## Bonus (dacă ai terminat Complet)
- [ ] O funcție `Statistici.exista(player, numeStat)` care întoarce `true` / `false`  
- [ ] Un modul `Mod_Mesaje` cu o funcție `catre(player, text)` care apelează `Ev_Mesaj:FireClient(player, text)` — le folosești în loc să repeți `FireClient`  
- [ ] Afișezi în Output, cu `print`, **toate** monedele fiecărui jucător când cineva termină Obby-ul  
- [ ] Explici colegului, în 3 propoziții, ce e un modul

## Recapitulare rapidă
1. **ModuleScript** = trusă de funcții care nu rulează singură; se termină cu **`return`**  
2. `require(modul)` aduce trusa într-un script (o dată, sus)  
3. **Tabelă** = listă `{a, b, c}` sau dicționar `{Nume = valoare}`  
4. Modulele pe **server** în ServerScriptService; cele pentru ambele în ReplicatedStorage  
5. Scrii **o dată**, folosești **de mai multe ori**

**Quiz scurt (cu profesorul):**  
- La ce folosește `return` la sfârșitul unui ModuleScript?  
- Ce face `require`?  
- De ce `Mod_Statistici` stă în ServerScriptService, nu în ReplicatedStorage?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector `Mod_Statistici` și un script care îl cere.)*

## Temă
Opțional: găsește în scripturile tale **alt cod care se repetă** (de exemplu căutarea lui `Humanoid`) și gândește-te ce funcție ai putea pune într-un modul.  
La **L2** salvăm scorul **între sesiuni**: jocul tău își „amintește" monedele după ce ieși.
