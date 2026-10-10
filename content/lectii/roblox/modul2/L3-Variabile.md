# Lecția 3 — Variabile
**Modulul 2 · Script Starter**  
**Code Maker Club · Roblox Studio**

> Azi înveți **variabilele**: „cutiile cu etichetă” în care codul tău ține numere, texte și răspunsuri de tip da/nu. La final, **un Part din Obby** își schimbă singur culoarea, mărimea și materialul — dintr-un script.  
> Place: `Prenume_Nume_M2` (ex. `Ana_Pop_M2`)

---

## Obiectiv
La finalul orei creezi variabile, le afișezi în Output, le schimbi, și le folosești ca să **controlezi un Part**.  
**Minimum:** în `Srv_Variabile` ai **3 variabile** (un **număr**, un **text**, un **da/nu**) afișate în Output + un script într-un Part care îi schimbă **culoarea** folosind o variabilă · **0 erori** în Output.  
**Ținta orei (Complet):** Minim + schimbi **Size** și **Material** din cod + folosești **calcul** (`*`, `+`) și **lipirea textelor** (`..`).

## De ce contează
Fără variabile, ai scrie același număr sau același text în zece locuri. Dacă vrei să-l schimbi, îl cauți peste tot.  
Cu o variabilă îl schimbi **într-un singur loc**. La M3 scorul tău va fi tot o variabilă.

**Azi nu avem încă `if`, funcții sau evenimente.** Doar variabile și proprietăți de Part.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + analogia „cutia cu etichetă” |
| 10–45 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 45–100 | Proiectul „Platforma magică” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi folosim:** `local` · tipuri (număr, text, da/nu) · `print` · `script.Parent` · proprietăți de Part (`Color`, `Size`, `Material`, `Transparency`).

---

## Pas cu pas

### 1) Variabila = cutie cu etichetă
O **variabilă** are:
- un **nume** (eticheta)  
- o **valoare** (ce e în cutie)

```lua
local scor = 10
local nume = "Ana"
local suntGata = true

print(scor)
print(nume)
print(suntGata)
```

- `local` = „fac o cutie nouă, doar pentru scriptul ăsta”  
- `scor` = numele cutiei  
- `=` = „pune în cutie” (nu înseamnă „egal” ca la matematică!)  
- `10` = valoarea

Citești în Output: `10`, `Ana`, `true`.

**Încearcă tu — prima variabilă (3–4 min)**  
- [ ] `Srv_Variabile` în ServerScriptService  
- [ ] Cele 3 variabile de mai sus (cu numele tău la `nume`)  
- [ ] Play → cele 3 valori apar în Output  

### 2) Cele 3 tipuri de azi
| Tip | Exemplu | Ce e |
|-----|---------|------|
| **număr** (number) | `10`, `3.5`, `-2` | cu el calculezi |
| **text** (string) | `"Ana"`, `"Salut!"` | **mereu** între ghilimele |
| **da/nu** (boolean) | `true`, `false` | doar cele două, fără ghilimele |

*(Mai există `nil` = „nimic, nu e nicio valoare”. Îl întâlnești când scrii greșit un nume.)*

Întrebi ce tip are o valoare cu `typeof`:

```lua
print(typeof(10))      -- number
print(typeof("10"))    -- string  (cu ghilimele e TEXT, nu număr!)
print(typeof(true))    -- boolean
```

**Încearcă tu — tipuri (3 min)**  
- [ ] Rulezi codul cu `typeof` și vezi `number`, `string`, `boolean`  
- [ ] Spui de ce `"10"` e text, deși arată ca un număr  

### 3) Reguli pentru nume
1. Fără spații: `scorTotal`, **nu** `scor total`  
2. Nu începe cu cifră: `moneda1` e ok, `1moneda` nu  
3. Fără diacritice (ă, î, ș, ț): `suntGata`, nu `suntGăta`  
4. **Litere mari ≠ mici:** `scor` și `Scor` sunt **două** cutii diferite  
5. Nume care **spun ce e**: `viteza`, `numeJucator` — nu `x`, `a2`

*Stilul clasei:* începi cu literă mică, iar când sunt două cuvinte, al doilea începe cu **mare** (`numeJucator`).

**Încearcă tu — nume bune (2 min)**  
- [ ] Redenumești o variabilă ca să spună mai clar ce e  
- [ ] Găsești care din astea e greșită: `scor total` · `moneda1` · `1moneda`

### 4) Schimbi valoarea
```lua
local scor = 10
print(scor)      -- 10
scor = 15        -- fără local: doar schimbi ce e în cutie
print(scor)      -- 15
scor = scor + 1  -- ia ce e în cutie (15), adaugă 1, pune înapoi (16)
print(scor)      -- 16
```

**Încearcă tu — schimbare (3 min)**  
- [ ] `local` apare **doar o dată**, la crearea cutiei  
- [ ] Output arată `10`, `15`, `16`  

### 5) Calcule și lipirea textelor
```lua
local latime = 6
print(latime * 2)         -- 12
print(latime + 4)         -- 10
print(latime / 2)         -- 3
print(latime - 1)         -- 5

local nume = "Ana"
print("Salut, " .. nume)           -- Salut, Ana
print("Scor: " .. 15)              -- Scor: 15
```

- `+ - * /` = adunare, scădere, înmulțire, împărțire  
- `..` (două puncte) = **lipește** texte (și numere) într-un singur mesaj

**Încearcă tu — calcul (3–4 min)**  
- [ ] Un calcul cu `*`  
- [ ] Un mesaj cu `..` care conține **numele tău**  

### 6) Scriptul stă într-un Part
Până acum scriptul era în ServerScriptService. Dacă îl pui **în** Part, are un prieten: `script.Parent` = „Part-ul în care stau”.

1. Pune un Part nou în Obby, lângă Spawn: **`Platforma_Magica`**, Anchor, gri  
2. Explorer: mouse peste `Platforma_Magica` → **+** → **Script** → `Srv_Platforma`  
3. Scrie:

```lua
local platforma = script.Parent
print("Mă ocup de: " .. platforma.Name)
```

Play: Output arată `Mă ocup de: Platforma_Magica`.

*Cum merge:* `script.Parent` e Part-ul. `platforma.Name` e **numele** lui (din Explorer). Variabila `platforma` e doar o etichetă scurtă pentru el.

**Încearcă tu — script în Part (3–4 min)**  
- [ ] `Srv_Platforma` e **copil** al `Platforma_Magica` în Explorer  
- [ ] Output: `Mă ocup de: Platforma_Magica`  

### 7) Variabilele controlează Part-ul
Acum folosești variabile ca să **schimbi proprietăți**:

```lua
local platforma = script.Parent

local culoare = Color3.fromRGB(255, 170, 0)   -- portocaliu
local transparenta = 0.2                       -- 0 = plin, 1 = invizibil

platforma.Color = culoare
platforma.Transparency = transparenta
print("Platforma e gata!")
```

Play → platforma devine portocalie și puțin transparentă.

*Schimbi o cifră în script, apeși Play și vezi altceva. Așa „joci” cu codul.*

**Încearcă tu — controlezi Part-ul (4–5 min)**  
- [ ] Culoarea se schimbă la Play (altă față decât în editare)  
- [ ] Ai schimbat **o valoare** (ex. `0.2` → `0.6`) și ai văzut diferența  

### 8) Mărime și material *(Complet)*
```lua
local latime = 8
local lungime = 8

platforma.Size = Vector3.new(latime, 1, lungime * 2)
platforma.Material = Enum.Material.Neon
```

- `Vector3.new(x, y, z)` = trei numere: **lățime, înălțime, lungime**  
- `Enum.Material.Neon` = un material din lista Roblox (la fel poți încerca `Wood`, `Ice`, `Brick`, `Grass`)

**Încearcă tu — mărime + material (4 min)**  
- [ ] Platforma are altă mărime, calculată din variabile (ex. `lungime * 2`)  
- [ ] Material schimbat din cod  

---

## Greșeli frecvente
1. **`local` scris de fiecare dată** când schimbi valoarea — `local scor = 5` iar `local scor = 6` face cutii noi. Schimbarea corectă: `scor = 6`.  
2. **Ghilimele în jurul unui număr** — `"10"` e **text**, nu număr: `"10" == 10` dă `false`, iar la proprietăți (`Transparency = "0.5"`) apar erori. Numerele **nu** au ghilimele.  
3. **Nume scris diferit** — `scor` vs `Scor`: `print(Scor)` afișează **`nil`**, nu eroare; dacă îl folosești la calcul → eroare roșie *„attempt to perform arithmetic on a nil value”*.  
4. **Spații în nume** — `local scor total = 5` → eroare.  
5. **`=` confundat cu „egal”** — în cod `=` înseamnă „pune în cutie”.  
6. **Script în Part, dar Part-ul nu e ancorat** — platforma cade la Play; bifezi **Anchored**.  
7. **Color fără `Color3.fromRGB`** — `platforma.Color = "orange"` nu merge (e text, nu culoare).

---

## De făcut azi — „Platforma magică”
Salvat: `Prenume_Nume_M2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `Srv_Variabile` cu 3 variabile (număr, text, da/nu) afișate + `Srv_Platforma` care schimbă **Color** printr-o variabilă · **0 erori** |
| **Complet (ținta orei)** | Minim + **Size** și **Material** din cod + calcul cu `*` sau `+` + un mesaj cu `..` |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Variabile în Output
- [ ] `Srv_Variabile`: `local` cu număr, text, boolean · `print` la fiecare  
- [ ] Play · Output corect · Stop  

### Pasul 2 — Platforma *(Minim)*
- [ ] `Platforma_Magica` + `Srv_Platforma` (în Part)  
- [ ] Culoare dintr-o variabilă  
- [ ] Play: culoarea s-a schimbat · Output fără roșu · salvat  

**→ Minim când:** schimbi o cifră din script și vezi alt rezultat la Play.

### Pasul 3 — Mărime, material, calcul *(Complet)*
- [ ] `Size` cu `Vector3.new` și o variabilă  
- [ ] `Material` schimbat  
- [ ] Un calcul și un mesaj cu `..` (ex. `print("Lățime: " .. latime)`)  
- [ ] Play · salvat  

**Gata Complet când:** platforma arată **diferit** la Play față de editare și știi ce variabilă schimbă ce.

---

## Bonus (dacă ai terminat Complet)
- [ ] O variabilă `culoareAlternativa` și o a doua platformă care folosește aceeași culoare  
- [ ] Platforma devine „sticlă”: `Transparency = 0.7` + `Material = Enum.Material.Glass`  
- [ ] `platforma.CanCollide = false` — treci **prin** ea. Merge? Ce observi?  
- [ ] `print(typeof(platforma))` — ce tip e un Part? (indiciu: **Instance**)

## Recapitulare rapidă
1. **Variabilă** = cutie cu nume + valoare · se face cu **`local`**  
2. Tipuri: **număr**, **text** (ghilimele), **da/nu** (`true`/`false`)  
3. `=` pune în cutie · `..` lipește texte · `+ - * /` calculează  
4. `script.Parent` = Part-ul în care stă scriptul  
5. Cu variabile controlezi **proprietățile** unui Part  

**Quiz scurt (cu profesorul):**  
- Ce face `local scor = 10`?  
- Care e diferența între `10` și `"10"`?  
- Ce se întâmplă dacă scrii `Scor` în loc de `scor`?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector un `Srv_Platforma` cu 3 variabile.)*

## Temă
Opțional: acasă creezi un script care are variabile pentru **vârsta ta**, **numele tău** și dacă **îți place Roblox** (`true`/`false`) și le afișează într-un singur mesaj cu `..`. *(Atenție: un boolean nu se lipește direct cu `..`; scrie `tostring(valoare)` — exemplu: `"Îmi place Roblox: " .. tostring(placeRoblox)`.)*  
La **L4** învățăm **if / else** — codul care alege.
