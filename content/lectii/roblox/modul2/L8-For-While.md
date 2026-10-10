# Lecția 8 — Bucle: `for` și `while`
**Modulul 2 · Script Starter**  
**Code Maker Club · Roblox Studio**

> Azi înveți să-i ceri calculatorului să **repete** o treabă fără să o scrii de zece ori. La final, Obby-ul are un **semnal care pâlpâie** și o **numărătoare inversă** înainte de start.  
> Place: `Prenume_Nume_M2` (ex. `Ana_Pop_M2`)

---

## Obiectiv
La finalul orei scrii un `for` (de câte ori) și un `while` (cât timp), și știi **regula de aur** a buclelor: un `while` are **mereu** `task.wait` înăuntru.  
**Minimum:** un `Semnal` care **pâlpâie** între două culori cu un `while true do` și o **numărătoare** `3 · 2 · 1 · START!` în Output cu un `for` · **0 erori**.  
**Ținta orei (Complet):** Minim + numărătoarea schimbă **culorile unui semafor** (roșu → galben → verde) + o **scară** de 8 trepte construită dintr-un `for`.

## De ce contează
La L5 (bonus) ai simțit cât de plictisitor e să scrii același lucru de mai multe ori. Bucla e răspunsul:  
- `for` = repet de **un număr cunoscut** de ori  
- `while` = repet **cât timp** o condiție e adevărată

Cu bucle faci lumini care clipesc, numărători, scări, monede în șir.

**Azi nu folosim click sau Touched.** Doar bucle.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + „de câte ori” vs „cât timp” |
| 10–45 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 45–100 | Proiectul „Semnal + Numărătoare” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi folosim:** `for i = a, b do` · pas (`-1`) · `while … do` · `task.wait` · `Instance.new` *(doar în Complet)*.

---

## Pas cu pas

### 1) `for` — de câte ori
```lua
for i = 1, 5 do
    print("Numărul " .. i)
end
```

Output: `Numărul 1`, `Numărul 2`, … `Numărul 5`.

- `i` = un **contor** (o variabilă pe care bucla o schimbă singură)  
- `1, 5` = „de la 1 până la 5”  
- Tot ce e între `do` și `end` se repetă  

**Încearcă tu — primul `for` (3–4 min)**  
- [ ] `Srv_Bucle` în ServerScriptService  
- [ ] `for i = 1, 5` · Output cu 5 linii  
- [ ] Schimbi `5` în `3` și apoi în `10`  

### 2) `for` înapoi — numărătoare inversă
Un al treilea număr = **pasul**:

```lua
for i = 3, 1, -1 do
    print(i)
    task.wait(1)
end
print("START!")
```

- `3, 1, -1` = de la 3 la 1, **scăzând** cu 1 de fiecare dată  
- `task.wait(1)` = o secundă între numere (altfel apar toate deodată)  
- După buclă: `print("START!")` rulează o singură dată

Poți număra din 2 în 2: `for i = 0, 10, 2 do`.

**Încearcă tu — numărătoare (3–4 min)**  
- [ ] `3 … 2 … 1 … START!` cu câte o secundă între ele  

### 3) `while` — cât timp
```lua
local numar = 1

while numar <= 5 do
    print("Numărul " .. numar)
    numar = numar + 1
    task.wait(1)
end
```

- `while numar <= 5 do` = „**cât timp** `numar` e cel mult 5, repetă”  
- Înăuntru **schimbi** `numar`, altfel condiția rămâne adevărată **pentru totdeauna**  
- `task.wait` = pauză, ca să nu „înghețe” calculatorul

### 4) Regula de aur: `while` fără pauză = pericol
```lua
while true do
    print("Blocat!")      -- FĂRĂ task.wait → Studio poate îngheța
end
```

`while true do` = „**mereu**”. Fără `task.wait`, scriptul repetă **mai repede decât poate respira calculatorul**. Roblox oprește scriptul cu eroarea *„Script timeout: exhausted allowed execution time”* (sau Studio se blochează un pic).

**Regula:** un `while` care merge „mereu” are **întotdeauna** `task.wait(…)` înăuntru.

Dacă ai intrat în așa ceva: **Stop**, repari scriptul, Play din nou.

**Încearcă tu — regula (2 min)**  
- [ ] Spui cu vocea: „while true = mereu → trebuie task.wait”  
- [ ] **Nu** rulezi varianta periculoasă fără pauză  

### 5) Semnalul care pâlpâie
1. Pune un Part: **`Semnal`** (lângă Spawn sau pe marginea traseului): **Anchor**  
2. **+** → Script → `Srv_Semnal`:

```lua
local semnal = script.Parent

local culoareA = Color3.fromRGB(255, 80, 80)
local culoareB = Color3.fromRGB(80, 80, 255)

while true do
    semnal.Color = culoareA
    task.wait(0.5)
    semnal.Color = culoareB
    task.wait(0.5)
end
```

Play → semnalul pâlpâie între roșu și albastru, încontinuu.

*Un `while true` **nu se termină** — tot ce scrii **sub** el nu va rula niciodată. Așa că punem bucla infinită **ultima** în script.*

**Încearcă tu — semnalul (5–6 min)**  
- [ ] `Semnal` cu `Srv_Semnal`  
- [ ] Pâlpâie la Play  
- [ ] Output fără roșu  
- [ ] Schimbi `0.5` în `0.2` → pâlpâie mai repede  

### 6) Numărătoare cu semafor *(Complet)*
Refolosești `Semafor`-ul din L4. Dacă nu-l mai ai, creezi unul nou (**`Semafor`**, Anchor).

1. Ștergi din `Semafor` scriptul vechi `Srv_Semafor` (din L4), ca să nu se lupte două scripturi pentru aceeași culoare  
2. Scrii un nou script `Srv_Start` în `Semafor`:

```lua
local semafor = script.Parent

for i = 3, 1, -1 do
    if i == 3 then
        semafor.Color = Color3.fromRGB(220, 0, 0)       -- roșu
    elseif i == 2 then
        semafor.Color = Color3.fromRGB(255, 220, 0)     -- galben
    else
        semafor.Color = Color3.fromRGB(255, 140, 0)     -- portocaliu
    end
    print(i)
    task.wait(1)
end

semafor.Color = Color3.fromRGB(0, 200, 0)              -- verde
print("START!")
```

Totul din ce ai învățat se cuplează: `for` (L8) + `if` (L4) + culoare (L3).

**Încearcă tu — semafor de start (5–6 min)**  
- [ ] 3 culori pe 3 numere  
- [ ] Verde după buclă + mesaj „START!”  

### 7) Scara din cod *(Complet)*
Poți **crea** Part-uri din cod cu `Instance.new("Part")`.

1. Alege un loc **gol** din lume (departe de traseu) și pune un Part mic **`Start_Scara`** (Anchor)  
2. Script în el, `Srv_Scara`:

```lua
local start = script.Parent.Position

for i = 1, 8 do
    local treapta = Instance.new("Part")
    treapta.Name = "Treapta" .. i
    treapta.Size = Vector3.new(6, 1, 4)
    treapta.Position = start + Vector3.new(0, i * 1.5, i * 4)
    treapta.Anchored = true
    treapta.Parent = workspace
end
```

Cum merge:  
- `Instance.new("Part")` = un Part nou (pe care îl descrii înainte să-l pui în lume)  
- `start + Vector3.new(…)` = locul scării + un pas mai sus și mai departe la fiecare `i`  
- **`Anchored = true`** — fără asta treptele cad  
- `treapta.Parent = workspace` = abia acum **apare în lume** (de aceea e ultima linie)

Treptele **se creează la Play** (nu le vezi în editare). E normal: ele există doar cât rulează jocul.

**Încearcă tu — scara (6–8 min)**  
- [ ] 8 trepte la Play, una peste alta ca o scară  
- [ ] Poți urca pe ele  
- [ ] Output fără roșu  

---

## Greșeli frecvente
1. **`while true` fără `task.wait`** — blocaj / *„Script timeout”*; mereu pauză înăuntru.  
2. **Cod sub un `while true`** — nu va rula niciodată; pune bucla infinită la sfârșit.  
3. **Uiți `do` sau `end`** — `for i = 1, 5 print(i)` → eroare.  
4. **`for i = 3, 1 do`** (fără `-1`) — bucla **nu** rulează niciodată (de la 3 la 1 „în sus” nu are sens). Trebuie `3, 1, -1`.  
5. **Nu schimbi variabila la `while numar <= 5`** — rămâne adevărat și bucla nu se termină; adaugi `numar = numar + 1`.  
6. **Treptele cad** — lipsește `Anchored = true`.  
7. **Treptele apar în mijlocul Obby-ului** — mută `Start_Scara` într-un loc liber.

---

## De făcut azi — „Semnal + Numărătoare”
Salvat: `Prenume_Nume_M2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `Semnal` care pâlpâie cu `while true` (cu `task.wait`) + numărătoare `3 · 2 · 1 · START!` cu `for` în Output · **0 erori** |
| **Complet (ținta orei)** | Minim + semafor de start pe culori + scara de 8 trepte din `for` |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — `for` și `while` în Output
- [ ] `for` 1–5 · numărătoare inversă  
- [ ] Un `while` cu variabilă care crește  

### Pasul 2 — Semnalul + numărătoarea *(Minim)*
- [ ] `Semnal` pâlpâie  
- [ ] Numărătoarea cu `task.wait(1)`  
- [ ] Play · Stop · salvat  

**→ Minim când:** poți schimba viteza pâlpâirii dintr-o singură cifră.

### Pasul 3 — Semafor + scară *(Complet)*
- [ ] `Srv_Start` cu `for` + `if`  
- [ ] `Srv_Scara` creează 8 trepte  
- [ ] Obby-ul rămâne terminabil (scara e în afară, nu pe traseu)  
- [ ] Salvat  

**Gata Complet când:** apăsând Play vezi semafor, semnal și scara, fără erori.

---

## Bonus (dacă ai terminat Complet)
- [ ] Scara cu **20 de trepte** care alternează **două culori** (indiciu: `i % 2 == 0` = „i e par”; `%` dă restul împărțirii)  
- [ ] Un `while` care se oprește singur când o variabilă ajunge la 10 (fără `while true`)  
- [ ] Un `for` care face **5 monede** galbene în linie (Part rotunjit, **Anchored**, **CanCollide = false**) — le vei folosi la L9  
- [ ] Un `while true` cu culori **aleatoare**: `Color3.fromRGB(math.random(0, 255), math.random(0, 255), math.random(0, 255))`

## Recapitulare rapidă
1. `for i = a, b do … end` — repetă de un număr de ori · pasul e al treilea număr (`-1` = înapoi)  
2. `while condiție do … end` — repetă cât timp e adevărată  
3. `while true do` = pentru totdeauna → **mereu** cu `task.wait`  
4. Ce e **sub** un `while true` nu rulează niciodată  
5. `Instance.new("Part")` creează un Part din cod (nu uita `Parent`)  

**Quiz scurt (cu profesorul):**  
- Care e diferența între `for` și `while`?  
- De ce un `while true` are nevoie de `task.wait`?  
- Ce face `for i = 3, 1, -1 do`?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector `Srv_Semnal` cu pâlpâirea.)*

## Temă
Opțional: un script care printează **tabla înmulțirii cu 7** (de la 1 la 10): `7 x 1 = 7`, `7 x 2 = 14`…  
La **L9** pui tot ce știi într-un **mecanism** al tău: o **monedă** sau o **ușă**.
