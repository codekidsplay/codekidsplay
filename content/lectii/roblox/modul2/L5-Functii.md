# Lecția 5 — Funcții simple
**Modulul 2 · Script Starter**  
**Code Maker Club · Roblox Studio**

> Azi înveți **funcțiile**: „rețete” cu nume, pe care le scrii o dată și le **chemi** de câte ori vrei. La final, o **lampă** din Obby se aprinde și se stinge „la comandă”.  
> Place: `Prenume_Nume_M2` (ex. `Ana_Pop_M2`)  
> *Funcțiile sunt pregătirea pentru **L6**: evenimentul `Touched` (când atingi un Part) folosește chiar o funcție.*

---

## Obiectiv
La finalul orei scrii o funcție, o **chemi** (o apelezi), îi dai **parametri**, și ai folosit `task.wait` ca să faci pauze.  
**Minimum:** în `Srv_Lampa` ai **2 funcții** (`aprinde` și `stinge`) care schimbă lampa + le chemi într-o ordine (stinge → pauză → aprinde) · **0 erori** în Output.  
**Ținta orei (Complet):** Minim + o funcție **cu parametru** (`seteazaCuloarea(culoare)`) + o funcție care **întoarce** un rezultat (`return`).

## De ce contează
Fără funcții, repeți același cod de zece ori. Cu o funcție îl scrii o dată și îi dai un nume: `aprinde()`.  
Bonus: dacă greșești ceva, repari **într-un singur loc**.

**Azi nu avem evenimente, bucle sau click.** Tu chemi funcțiile, rând pe rând, din script.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + analogia „rețetă” |
| 10–45 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 45–100 | Proiectul „Lampa” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi folosim:** `local function` · apel `nume()` · parametri · `return` · `task.wait`.

---

## Pas cu pas

### 1) O funcție = o rețetă cu nume
La o rețetă de clătite:
- **scrii** o dată pașii („amestecă, încinge, toarnă”)  
- **spui** „fă clătite” când le vrei → rețeta se execută  

În cod:

```lua
local function saluta()
    print("Salut din funcție!")
end

saluta()
saluta()
```

- `local function saluta()` = „**definesc** o rețetă numită `saluta`”  
- Dedesubt, **corpul** funcției (pașii)  
- `end` = rețeta s-a terminat  
- `saluta()` = „**chem** funcția” — acum rulează. Paranteze obligatorii!

Output: mesajul apare **de două ori** (am chemat de două ori).

Atenție: Doar **definiția** nu rulează nimic. Dacă nu scrii `saluta()`, nu se întâmplă nimic.

**Încearcă tu — prima funcție (3–4 min)**  
- [ ] `Srv_Functii` în ServerScriptService  
- [ ] Funcția `saluta` + 2 apeluri  
- [ ] Play → mesajul apare de 2 ori  
- [ ] Ștergi un `saluta()` și vezi că apare o singură dată  

### 2) Ordinea contează: definește înainte să chemi
Roblox citește de sus în jos. Funcția trebuie să existe **înainte** să o chemi:

```lua
saluta()                     -- EROARE: funcția încă nu există

local function saluta()
    print("Salut!")
end
```

Eroare tipică: *„attempt to call a nil value”*. Soluția: **muți apelul sub definiție**.

**Încearcă tu — ordinea (2–3 min)**  
- [ ] Provoci eroarea (apel înaintea definiției) și o citești  
- [ ] Repari: definiția sus, apelul jos  

### 3) Pauza: `task.wait`
`task.wait(2)` = „stai 2 secunde, apoi continuă”. Fără pauză, totul se întâmplă într-o clipă și nu vezi nimic.

```lua
print("Unu")
task.wait(2)
print("Doi, după 2 secunde")
```

*(Folosim `task.wait`, nu `wait` — e varianta modernă.)*

**Încearcă tu — pauza (2 min)**  
- [ ] Vezi cele două mesaje cu 2 secunde între ele  

### 4) Lampa: funcții pe un Part
1. Pune un Part pe lângă traseu: **`Lampa`**, Anchor, gri  
2. **+** pe `Lampa` → **Script** → `Srv_Lampa`  
3. Scrie:

```lua
local lampa = script.Parent

local function aprinde()
    lampa.Color = Color3.fromRGB(255, 230, 80)
    lampa.Material = Enum.Material.Neon
    print("Lampa e aprinsă")
end

local function stinge()
    lampa.Color = Color3.fromRGB(90, 90, 90)
    lampa.Material = Enum.Material.SmoothPlastic
    print("Lampa e stinsă")
end

stinge()
task.wait(2)
aprinde()
task.wait(2)
stinge()
```

4. Play → lampa e stinsă, după 2 secunde se aprinde, după încă 2 se stinge

*Observă:* ai definit **două funcții** și le chemi în ordinea care vrei.

**Încearcă tu — lampa (5–6 min)**  
- [ ] Funcțiile `aprinde` și `stinge` în script  
- [ ] Succesiunea: stinsă → aprinsă → stinsă (la 2 secunde)  
- [ ] Output: 3 mesaje, fără roșu  

### 5) Parametri — funcția primește „ingrediente” *(Complet)*
Un **parametru** = o valoare pe care o dai funcției când o chemi:

```lua
local function seteazaCuloarea(culoare)
    lampa.Color = culoare
end

seteazaCuloarea(Color3.fromRGB(255, 0, 0))   -- roșu
task.wait(1)
seteazaCuloarea(Color3.fromRGB(0, 120, 255)) -- albastru
```

- `(culoare)` = numele ingredientului în funcție  
- La apel, dai valoarea: `seteazaCuloarea(…)`  
- Poți avea mai mulți: `local function lumineaza(culoare, secunde)`

```lua
local function lumineaza(culoare, secunde)
    lampa.Color = culoare
    task.wait(secunde)
    lampa.Color = Color3.fromRGB(90, 90, 90)
end

lumineaza(Color3.fromRGB(255, 0, 0), 1)
lumineaza(Color3.fromRGB(0, 120, 255), 2)
```

**Încearcă tu — parametri (5 min)**  
- [ ] `seteazaCuloarea(culoare)` chemată cu **2 culori diferite**  
- [ ] Opțional: `lumineaza(culoare, secunde)` cu pauze diferite  

### 6) `return` — funcția dă un răspuns *(Complet)*
O funcție poate **întoarce** o valoare, pe care o prinzi într-o variabilă:

```lua
local function dublu(numar)
    return numar * 2
end

local rezultat = dublu(21)
print(rezultat)          -- 42
print(dublu(5) + 1)      -- 11
```

După `return`, funcția **se oprește** (nu mai rulează nimic sub el, în funcția respectivă).

**Încearcă tu — return (3–4 min)**  
- [ ] Funcția `dublu` (sau `adauga`, `ariaPlatformei`) cu `return`  
- [ ] Rezultatul apare în Output  

---

## Greșeli frecvente
1. **Defini funcția, dar nu o chemi** — fără `nume()` nu se întâmplă nimic.  
2. **Uiți parantezele** — `aprinde` (fără `()`) nu cheamă funcția.  
3. **Apel înainte de definiție** — *„attempt to call a nil value”*; mută apelul **după** definiție.  
4. **Uiți `end`** — funcția rămâne deschisă; eroare *„Expected 'end'…”*.  
5. **Nume diferit la apel** — `Aprinde()` ≠ `aprinde()`.  
6. **`task.wait` lipsește** — totul se întâmplă instant; nu vezi lampa aprinsă.  
7. **Parametru lipsă** — `seteazaCuloarea()` fără valoare → `culoare` e `nil` → eroare la `lampa.Color = nil`.

---

## De făcut azi — „Lampa”
Salvat: `Prenume_Nume_M2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `Srv_Lampa` cu `aprinde()` + `stinge()` · apelate în ordine, cu `task.wait` între ele · **0 erori** |
| **Complet (ținta orei)** | Minim + o funcție cu **parametru** (`seteazaCuloarea`) + o funcție cu **`return`** |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Prima funcție
- [ ] `saluta()` chemată de 2 ori  
- [ ] Ai citit eroarea „apel înainte de definiție” (opțional)  

### Pasul 2 — Lampa *(Minim)*
- [ ] `Lampa` + `Srv_Lampa` (în Part)  
- [ ] `aprinde` + `stinge` + apeluri cu `task.wait`  
- [ ] Play · se vede lampa schimbându-se · salvat  

**→ Minim când:** un coleg vede lampa aprinzându-se și stingându-se.

### Pasul 3 — Parametru și return *(Complet)*
- [ ] `seteazaCuloarea(culoare)` cu **2 culori**  
- [ ] O funcție cu `return` și rezultatul în Output  
- [ ] Salvat  

**Gata Complet când:** poți explica diferența dintre „definesc” și „chem” o funcție.

---

## Bonus (dacă ai terminat Complet)
- [ ] O secvență „disco”: 4–5 culori una după alta cu `seteazaCuloarea` + `task.wait(0.5)`  
- [ ] Funcție `semnalizeaza(deCateOri)` — o scrii pentru 3 clipiri și chemi `aprinde()` / `stinge()` de 3 ori, unul după altul *(**L8** îți arată o variantă mult mai scurtă)*  
- [ ] Observi cât cod repeți și gândești: „oare nu există ceva mai scurt?” (spoiler: **bucla**)

## Recapitulare rapidă
1. **Definești** funcția: `local function nume() … end`  
2. **Chemi** funcția: `nume()`  
3. Definiția vine **înainte** de apel  
4. **Parametru** = ingredient · **return** = rezultat  
5. `task.wait(s)` = pauză de `s` secunde  

**Quiz scurt (cu profesorul):**  
- Ce diferență e între a **defini** o funcție și a o **chema**?  
- La ce folosesc parantezele de la `aprinde()`?  
- De ce nu se vede lampa aprinsă dacă lipsește `task.wait`?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector `Srv_Lampa` cu cele două funcții.)*

## Temă
Opțional: scrie o funcție `prezinta(nume, varsta)` care afișează „Mă cheamă … și am … ani” și o chemi pentru **doi prieteni**.  
La **L6** funcția își găsește rostul în Obby: **Touched** = ce se întâmplă când **atingi** un Part.
