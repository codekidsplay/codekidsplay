# Lecția 4 — if / then / else
**Modulul 2 · Script Starter**  
**Code Maker Club · Roblox Studio**

> Azi înveți cum **alege** codul: „**dacă** e așa, fă asta; **altfel**, fă cealaltă”. La final, ai un **semafor** care își schimbă culoarea după o variabilă și o **poartă** care e închisă sau deschisă.  
> Place: `Prenume_Nume_M2` (ex. `Ana_Pop_M2`)

---

## Obiectiv
La finalul orei scrii `if … then … elseif … else … end`, compari valori, și folosești un da/nu (`true` / `false`) ca să schimbi ce face un Part.  
**Minimum:** un **semafor** (Part) cu **3 stări** (`verde`, `galben`, `rosu`), colorat de un `if / elseif / else` după variabila `stare` · **0 erori** în Output.  
**Ținta orei (Complet):** Minim + o **poartă** (Part) care, după variabila `deschisa`, e solidă sau „fantomă” (poți trece prin ea) + un exemplu cu `and` / `or` / `not`.

## De ce contează
Un joc nu face mereu același lucru: dacă ai 3 monede, ușa se deschide; dacă ai doar 2, rămâne închisă.  
`if` e mintea jocului. Toate mecanismele din Obby (poartă, monedă, checkpoint) au înăuntru un `if`.

**Azi nu avem funcții și evenimente.** Scriptul rulează o dată, de sus în jos, când apeși Play.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + ideea de „alegere” |
| 10–40 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 40–100 | Proiectul „Semafor + Poartă” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi folosim:** `if` · `then` · `elseif` · `else` · `end` · comparații (`==`, `~=`, `<`, `>`, `<=`, `>=`) · `and` · `or` · `not`.

---

## Pas cu pas

### 1) Prima alegere
```lua
local scor = 7

if scor >= 5 then
    print("Bravo!")
else
    print("Mai încearcă!")
end
```

Se citește ca o propoziție:  
**dacă** `scor` e mai mare sau egal cu 5 **atunci** afișează „Bravo!”, **altfel** afișează „Mai încearcă!”.

- Un `if` se **încheie** cu `end`  
- După `if …` vine `then` (nu uita)  
- Codul dintre `then` și `else` rulează doar când condiția e adevărată  
- Rândurile sunt **trase la dreapta** (indentare) ca să vezi ușor ce ține de ce — cu **Tab**

**Încearcă tu — prima alegere (3–4 min)**  
- [ ] `Srv_If` în ServerScriptService  
- [ ] Codul de mai sus; Play → „Bravo!”  
- [ ] Schimbi `scor` la `3` → Play → „Mai încearcă!”  

### 2) Comparații
| Semn | Înseamnă | Exemplu | Rezultat |
|------|----------|---------|----------|
| `==` | **egal** cu | `5 == 5` | `true` |
| `~=` | **diferit** de | `5 ~= 3` | `true` |
| `<` | mai mic | `2 < 5` | `true` |
| `>` | mai mare | `2 > 5` | `false` |
| `<=` | mai mic sau egal | `5 <= 5` | `true` |
| `>=` | mai mare sau egal | `4 >= 5` | `false` |

Atenție: **Un singur `=`** pune în cutie (`scor = 5`). **Două `==`** compară (`scor == 5`).

Poți afișa direct rezultatul unei comparații:

```lua
print(5 > 3)       -- true
print("a" == "b")  -- false
```

**Încearcă tu — comparații (3 min)**  
- [ ] Scrii 3 `print` cu comparații diferite  
- [ ] Prezici rezultatul **înainte** de Play · verifici  

### 3) Mai multe variante: `elseif`
Când ai **mai mult de două** posibilități:

```lua
local stare = "galben"

if stare == "verde" then
    print("Treci!")
elseif stare == "galben" then
    print("Atenție!")
else
    print("Stai!")
end
```

- Roblox verifică **de sus în jos** și se oprește la **prima** condiție adevărată  
- `else` = „orice altceva” (e opțional)  
- Scris **`elseif`** — un cuvânt, fără spațiu

**Încearcă tu — trei variante (3–4 min)**  
- [ ] Rulezi cu `stare` = `"verde"`, `"galben"`, apoi `"rosu"`  
- [ ] Vezi cele **3 mesaje** diferite  

### 4) Semaforul — un `if` care colorează
1. În Obby, lângă Spawn (în afara traseului — e decor), pui un Part **`Semafor`**: Anchor, gri  
2. Explorer: **+** pe `Semafor` → **Script** → `Srv_Semafor`  
3. Scrie:

```lua
local semafor = script.Parent
local stare = "verde"

if stare == "verde" then
    semafor.Color = Color3.fromRGB(0, 200, 0)
elseif stare == "galben" then
    semafor.Color = Color3.fromRGB(255, 220, 0)
else
    semafor.Color = Color3.fromRGB(220, 0, 0)
end

print("Stare semafor: " .. stare)
```

4. Play → verde. Stop. Schimbi `stare` în `"galben"` → Play → galben. Apoi `"rosu"` → roșu

*Text între ghilimele și **exact** ca în `if`: `"verde"` ≠ `"Verde"`. Literele mari contează.*

**Încearcă tu — semaforul (5–6 min)**  
- [ ] `Semafor` ancorat, cu `Srv_Semafor` **în** el  
- [ ] Trei rulări, trei culori  
- [ ] Output spune starea, fără roșu  

### 5) Poarta — da/nu schimbă ce poți face *(Complet)*
Un boolean (`true` / `false`) merge **direct** în `if`:

1. Pune un Part lat, ca o poartă, pe traseu (sau lângă Spawn): **`Poarta`**: Anchor, albastru-închis  
2. **+** → Script → `Srv_Poarta`:

```lua
local poarta = script.Parent
local deschisa = false

if deschisa then
    poarta.CanCollide = false     -- poți trece prin ea
    poarta.Transparency = 0.7     -- se vede aproape transparentă
    print("Poarta e deschisă")
else
    poarta.CanCollide = true      -- solidă
    poarta.Transparency = 0
    print("Poarta e închisă")
end
```

3. Play cu `deschisa = false`: te lovești de poartă  
4. Stop → `deschisa = true` → Play: treci prin ea

*Nu scrii `if deschisa == true`: `deschisa` e deja `true` sau `false`. `if deschisa then` e mai scurt și mai curat.*

**Încearcă tu — poarta (4–5 min)**  
- [ ] Cu `false`, nu poți trece  
- [ ] Cu `true`, treci  
- [ ] Output: mesajul corect în ambele cazuri  

### 6) `and`, `or`, `not` *(Complet)*
Poți combina condiții:

| Cuvânt | Sens | Exemplu |
|--------|------|---------|
| `and` | **și** (amândouă adevărate) | `monede >= 3 and areCheie` |
| `or` | **sau** (cel puțin una) | `esteProfesor or esteElev` |
| `not` | **opusul** | `not esteNoapte` |

```lua
local monede = 3
local areCheie = true

if monede >= 3 and areCheie then
    print("Poți intra pe poartă!")
else
    print("Mai ai de adunat…")
end
```

Încearcă: `areCheie = false` → ce se întâmplă? Apoi `monede = 2`?

**Încearcă tu — și / sau (3–4 min)**  
- [ ] Un `if` cu `and` și **trei** rulări (ambele adevărate / una falsă / ambele false)  
- [ ] Spui rezultatul **înainte** să dai Play  

---

## Greșeli frecvente
1. **`=` în loc de `==`** — `if stare = "verde" then` → eroare roșie. În condiție compari cu `==`.  
2. **Uiți `then`** — `if scor > 5` fără `then` → eroare.  
3. **Uiți `end`** — fiecare `if` are **un** `end`. Eroare tipică: *„Expected 'end' (to close 'if' at line …)”*.  
4. **`else if` în loc de `elseif`** — merge, dar cere **încă un `end`**; la noi: `elseif`.  
5. **Text cu altă literă mare** — `"Verde"` ≠ `"verde"`; nu se potrivește, intră pe `else`.  
6. **Condiția nu intră niciodată** — verifică cu `print` ce valoare are variabila.  
7. **Poarta e „deschisă” dar nu poți trece** — verifică `CanCollide = false`; și că nu mai ai un alt Part în fața ei.

---

## De făcut azi — „Semafor + Poartă”
Salvat: `Prenume_Nume_M2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `Semafor` cu `if / elseif / else`, **3 stări**, culoare pe fiecare + **0 erori** |
| **Complet (ținta orei)** | Minim + `Poarta` care se comportă diferit pentru `true` / `false` + un `if` cu `and` sau `or` |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Încălzire
- [ ] `Srv_If` cu `scor` → Bravo / Mai încearcă  
- [ ] Ai testat ambele variante  

### Pasul 2 — Semaforul *(Minim)*
- [ ] `Semafor` + `Srv_Semafor` (în Part)  
- [ ] Testat cu `"verde"`, `"galben"`, `"rosu"`  
- [ ] Salvat cu `stare = "verde"`  

**→ Minim când:** poți schimba **o singură linie** (`stare`) și toată culoarea se schimbă.

### Pasul 3 — Poarta + și / sau *(Complet)*
- [ ] `Poarta` + `Srv_Poarta`  
- [ ] Testat cu `true` și `false`  
- [ ] Un `if … and …` (sau `or`) cu **3 teste**  
- [ ] Salvat  

**Gata Complet când:** un coleg schimbă `deschisa` și vede poarta comportându-se diferit.

---

## Bonus (dacă ai terminat Complet)
- [ ] Un al patrulea caz în semafor (`"albastru"` → albastru)  
- [ ] Un `if` cu `not` (ex. `if not deschisa then print("E închisă") end`)  
- [ ] Semafor + poartă împreună: **dacă** stare e `"verde"` poarta se deschide, altfel se închide *(un singur script, două Part-uri: `workspace.Poarta`)*  
- [ ] Schimbi **Transparency** a poartei în trepte după `monede` (0 → 0.3 → 0.7) cu `elseif`

## Recapitulare rapidă
1. `if condiție then … elseif … else … end` — codul **alege**  
2. Compari cu `==` (egal), `~=` (diferit), `<`, `>`, `<=`, `>=`  
3. `=` pune în cutie · `==` compară  
4. `and` = și · `or` = sau · `not` = opusul  
5. Un boolean merge direct: `if deschisa then`  

**Quiz scurt (cu profesorul):**  
- Care e diferența între `=` și `==`?  
- Ce afișează codul cu `scor = 3`, dacă `if scor >= 5`?  
- Câte `end` ai nevoie pentru un `if` cu `elseif` și `else`?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector `Srv_Semafor` cu cele 3 culori.)*

## Temă
Opțional: scrie un `if` care, după variabila `temperatura` (număr), afișează: „Frig”, „Ok” sau „Cald”. Testează cu **3** valori.  
La **L5** învățăm **funcții** — „rețete” pe care le dai pe nume, ca să nu rescrii același cod.
