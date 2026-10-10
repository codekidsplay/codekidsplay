# Lecția 6 — Evenimentul `Touched`
**Modulul 2 · Script Starter**  
**Code Maker Club · Roblox Studio**

> Azi Obby-ul tău prinde **reacții**: când **calci** pe un Part, se întâmplă ceva. Înveți **evenimentele** — „când se întâmplă X, rulează funcția mea”.  
> Place: `Prenume_Nume_M2` (ex. `Ana_Pop_M2`)  
> *Folosim funcțiile din **L5**: un eveniment e, de fapt, o funcție pe care Roblox o cheamă în locul tău.*

---

## Obiectiv
La finalul orei conectezi o funcție la `Touched`, recunoști când ai atins-o **tu** (un jucător), și eviți ca efectul să se repete haotic.  
**Minimum:** `Platforma_Vie` își schimbă culoarea când un jucător calcă pe ea, apoi revine la normal · **0 erori** în Output.  
**Ținta orei (Complet):** Minim + o `Lava` (Part) care **resetează** jucătorul · un mesaj cu **numele jucătorului** în Output.

## De ce contează
Până acum scripturile rulau o singură dată, la Play. Dar într-un joc lucrurile se întâmplă **când jucătorul face ceva**.  
`Touched` e cel mai folosit eveniment într-un Obby: monede, lavă, checkpoint-uri, butoane de podea.

**Azi nu folosim încă click-uri sau bucle.** Doar `Touched`.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + ideea de „eveniment” |
| 10–45 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 45–100 | Proiectul „Platforma vie” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi folosim:** `Touched` · `:Connect(…)` · parametrul `hit` · `FindFirstChild("Humanoid")` · o variabilă „frână” · `task.wait`.

---

## Pas cu pas

### 1) Eveniment = „când se întâmplă …”
Un **eveniment** e un semnal. Tu spui: **„când se întâmplă semnalul, cheamă funcția mea”.**

```lua
local platforma = script.Parent

local function cuAtins(hit)
    print("Ceva m-a atins!")
end

platforma.Touched:Connect(cuAtins)
```

- `platforma.Touched` = semnalul „cineva m-a atins”  
- `:Connect(cuAtins)` = „leagă” semnalul de funcția `cuAtins`  
- `hit` = **Part-ul care a atins** (Roblox îl trimite singur în funcție)

Nu chemi tu `cuAtins()`. O cheamă **Roblox**, de fiecare dată când se întâmplă atingerea.

**Încearcă tu — primul eveniment (4–5 min)**  
- [ ] Un Part `Platforma_Vie` în Obby, **Anchor**, **ușor de atins** (pe traseu sau lângă Spawn)  
- [ ] `Srv_Platforma` în el, cu codul de mai sus  
- [ ] Play → calci pe ea → apare mesajul în Output  

### 2) Cine m-a atins? — `hit`
Schimbă mesajul:

```lua
local function cuAtins(hit)
    print("M-a atins: " .. hit.Name)
end
```

Calci pe platformă: în Output apar **multe** mesaje, cu nume de **părți ale avatarului** (picioare, trunchi…).  
*De ce?* Avatarul tău e făcut din **mai multe Parts**, iar fiecare poate atinge platforma.

Un Part din afara avatarului o poate atinge și el (o piatră care cade, de exemplu). Ca să reacționăm doar la **jucători**, trebuie să verificăm.

**Încearcă tu — vezi `hit` (3 min)**  
- [ ] Mesaje cu `hit.Name`  
- [ ] Spui de ce apar **mai multe** mesaje pentru o singură „călcare”  

### 3) E un jucător? — `Humanoid`
Orice personaj (jucător, NPC) are în el un obiect numit **Humanoid**. Dacă îl găsești în „părintele” part-ului care a atins → e un personaj.

```lua
local function cuAtins(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        print("Un personaj m-a atins!")
    end
end
```

- `hit.Parent` = „familia” din care face parte (corpul întreg)  
- `:FindFirstChild("Humanoid")` = „caută înăuntru un obiect cu numele ăsta; dacă nu e, întoarce **nil**”  
- `if humanoid then` = dacă am găsit ceva (nil înseamnă „nimic” și contează ca **fals**)

**Încearcă tu — filtrul (3–4 min)**  
- [ ] Mesajul apare doar când calci **tu**  
- [ ] Nu mai apare cu piese care nu sunt personaje  

### 4) Frâna — să nu repeți efectul de 10 ori
Un singur pas produce **mai multe** `Touched`-uri rapide. Dacă vrei „un efect pe atingere”, pui o **variabilă frână** (da/nu):

```lua
local platforma = script.Parent
local culoareNormala = platforma.Color
local culoareAtinsa = Color3.fromRGB(255, 140, 0)   -- portocaliu
local liber = true

local function cuAtins(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid and liber then
        liber = false
        platforma.Color = culoareAtinsa
        print("Cineva a călcat pe mine!")
        task.wait(2)
        platforma.Color = culoareNormala
        liber = true
    end
end

platforma.Touched:Connect(cuAtins)
```

Cum merge:  
1. Calci → `liber` e `true` → intri în `if`  
2. Imediat pui `liber = false` → atingerile următoare **nu** mai intră  
3. Platforma devine portocalie 2 secunde  
4. Revine la culoarea ei și `liber = true` — gata pentru următoarea atingere

*(Tehnica asta se numește „debounce” — o să o recunoști în multe jocuri.)*

**Încearcă tu — Platforma vie (6–8 min)**  
- [ ] Cod complet în `Srv_Platforma`  
- [ ] Play → calci → portocaliu 2 secunde → revine  
- [ ] Output: un singur mesaj pe călcare  
- [ ] Output fără roșu  

### 5) Funcție fără nume (varianta pe care o vei vedea peste tot) *(Complet)*
În multe scripturi vei vedea funcția scrisă **direct** în `Connect`:

```lua
platforma.Touched:Connect(function(hit)
    print("M-a atins: " .. hit.Name)
end)
```

E **aceeași** funcție, doar că nu are nume. Cele două variante sunt egale; a ta cu nume e mai ușor de citit.

**Încearcă tu — varianta scurtă (2–3 min)**  
- [ ] Rescrii o parte din script în forma `Connect(function(hit) … end)`  
- [ ] Merge la fel (nu uita `end` + `)` la final)  

### 6) Lava — o atingere cu consecințe *(Complet)*
1. Un Part roșu **`Lava`** — între două platforme, ca o zonă de care trebuie să te ferești (**Anchor**; o poți face mai joasă)  
2. **+** → Script → `Srv_Lava`:

```lua
local lava = script.Parent

local function cuAtins(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.Health = 0
    end
end

lava.Touched:Connect(cuAtins)
```

3. Play: te atingi de lavă → avatarul „cade” și, după câteva secunde, **reapari la Spawn**

*`humanoid.Health = 0` pune viața la zero. E un mod simplu să faci „game over” într-un Obby (la M3 vom face respawn-ul mai frumos).*

**Numele jucătorului în Output:**

```lua
local Players = game:GetService("Players")

local function cuAtins(hit)
    local jucator = Players:GetPlayerFromCharacter(hit.Parent)
    if jucator then
        print(jucator.Name .. " a atins lava!")
    end
end
```

- `GetService("Players")` = serviciul care ține lista jucătorilor  
- `GetPlayerFromCharacter(…)` = „din corpul ăsta, spune-mi ce jucător e”

**Încearcă tu — lava (6–8 min)**  
- [ ] `Lava` roșie cu `Srv_Lava`  
- [ ] Play → atingi → reapari la Spawn  
- [ ] Output: `NumeleTău a atins lava!`  

---

## Greșeli frecvente
1. **Mesajul apare de zeci de ori** — lipsește „frâna” (`liber`) sau nu filtrezi cu `Humanoid`.  
2. **Part-ul nu e ancorat** — cade la Play și nu mai ai ce atinge; bifează **Anchored**.  
3. **Nu apare nimic la atingere** — scriptul nu e în Part / ai scris `Touch` în loc de `Touched` / lipsesc `:Connect`.  
4. **Două puncte vs punct** — `platforma.Touched:Connect(…)`: punct înainte de `Touched`, **două puncte** înainte de `Connect`.  
5. **Ai chemat funcția în loc să o legi** — `Connect(cuAtins())` e greșit; corect e `Connect(cuAtins)` (fără paranteze).  
6. **Uiți `end` sau `)`** — la forma cu funcție fără nume: `end)` la final.  
7. **Lava prea mare sau pe traseul obligatoriu** — jucătorul nu poate trece; lasă un drum.

---

## De făcut azi — „Platforma vie”
Salvat: `Prenume_Nume_M2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `Platforma_Vie` cu `Touched`, filtrează `Humanoid`, își schimbă culoarea și revine · **0 erori** |
| **Complet (ținta orei)** | Minim + `Lava` care resetează jucătorul + numele jucătorului în Output |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Eveniment simplu
- [ ] `Touched` + mesaj la atingere  
- [ ] `hit.Name` în Output  

### Pasul 2 — Platforma vie *(Minim)*
- [ ] `Humanoid` + `liber`  
- [ ] Culoare 2 secunde, apoi înapoi  
- [ ] Play · salvat  

**→ Minim când:** un coleg calcă pe platformă și vede culoarea schimbându-se **o singură dată**.

### Pasul 3 — Lava + nume *(Complet)*
- [ ] `Lava` + `Srv_Lava`  
- [ ] Mesaj cu `jucator.Name`  
- [ ] Obby-ul **rămâne terminabil** (lava nu blochează tot drumul)  
- [ ] Play · salvat  

**Gata Complet când:** poți **trece** Obby-ul (ocolind lava) și ai verificat că și lava funcționează.

---

## Bonus (dacă ai terminat Complet)
- [ ] O **platformă de „ceață”**: la atingere devine transparentă (`Transparency = 0.8`), apoi redevine solidă  
- [ ] O platformă care, la atingere, își schimbă **Material** în Neon pentru 1 secundă  
- [ ] Un al doilea Part cu **același script** copiat — verifici că și el merge (copiezi scriptul **în** noul Part)  
- [ ] Scrii un `print` cu `task.wait` care numără 1, 2, 3 după atingere

## Recapitulare rapidă
1. **Eveniment** = semnal; **funcția** legată de el rulează când apare semnalul  
2. `Part.Touched:Connect(functie)` — `hit` = ce a atins  
3. Un personaj are **Humanoid**; `FindFirstChild("Humanoid")` îl caută  
4. **Frână** (`liber`) = un singur efect pe atingere  
5. `humanoid.Health = 0` resetează personajul  

**Quiz scurt (cu profesorul):**  
- Cine cheamă funcția `cuAtins`: tu sau Roblox?  
- Ce e `hit` și de ce apar mai multe atingeri pentru un singur pas?  
- De ce avem nevoie de variabila `liber`?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector `Srv_Platforma` cu frâna `liber`.)*

## Temă
Opțional: o **platformă-far**: un Part care, la atingere, se face galben **3 secunde** și apoi revine (același tipar ca platforma vie, cu altă culoare și altă durată).  
La **L7** adăugăm **click**: un Part pe care **apeși cu mouse-ul**.
