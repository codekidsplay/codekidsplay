# Lecția 4 — Liste și inventar
**Modulul 5 · Reguli de joc · Block 2**  
**Code Maker Club · Maestru de jocuri**

> Azi: prima **listă** Scratch pe bune — `adaugă`, `șterge`, `conține?` — inventar vizibil.  
> Fișier **nou**: `Prenume_Nume_M5_L4` · proiect: **„Inventarul meu”**  
> **Pod M6:** aici înveți **operatorii pe listă**; în Cubes (M6 L4) dai **cantități** (lemn=5, piatră=3).

---

## Obiectiv
**Minim:** listă `inventar` · colectezi ≥**3** iteme (`adaugă`) · afișaj/listă vizibilă · `conține [item]?` decide ceva pe scenă · poți `șterge` / consuma ≥1 item · reset listă la steag.  
**Complet:** Minim + 2 tipuri de iteme **sau** nu adaugi duplicat dacă `conține?` **sau** sloturi pe ecran (sprite-uri) pe lângă listă.

## De ce contează
**Pe scurt:** *inventar* = lista lucrurilor pe care le ai la tine (chei, monede, unelte). În Scratch o ții într-o **listă**.  
Fără liste, inventarul din M6 e doar variabile separate.  
`conține?` = baza pentru chei, power-up-uri, shop (L6) și craft (M6).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Listă = rând de cutii; operatori pe foaie |
| 15–30 | Design: ce iteme colectezi |
| 30–100 | Colectare + conține? + șterge |
| 100–120 | Test coleg: „ai cheia?” fără să îi spui tu |

**Operatori Minim (pe foaie):**  
- `adaugă [Cheie] la [inventar]`  
- `șterge (1) din [inventar]` / șterge tot  
- `[inventar] conține [Cheie]?`

---

## Pas cu pas

### 1) Ideea *(5 minute, pe foaie)*
O listă e un **rând de cutii cu nume**: `Cheie`, `Monedă`… Tu faci trei lucruri cu ea:
- **adaugi** în ea *(`adaugă … la inventar`)*  
- **întrebi** dacă ceva e înăuntru *(`inventar conține …?`)*  
- **scoți** ceva din ea *(`șterge … din inventar`)*

**Încearcă tu — pe foaie (5 min):** desenează lista `inventar` după ce iei Cheie, apoi Monedă, apoi folosești Cheia.

### 2) Lista *(10 minute)*
1. Proiect nou → `Prenume_Nume_M5_L4`  
2. În paleta **Variabile** → **Creează o listă** → `inventar` *(pentru toate sprite-urile)* · căsuța bifată, ca s-o vezi pe scenă  
3. Eroul `Erou`, la `x: -200 y: 0`; pe steag: `șterge tot din inventar` și `du-te la x: -200 y: 0`  
4. Mersul în toate direcțiile, în `repetă la nesfârșit`: `schimbă x cu 4` / `-4` și `schimbă y cu 4` / `-4`, cu săgețile

**Verifici:** la steag lista e goală, iar eroul se mișcă peste tot.

### 3) Colectarea *(Minim, partea 1 · 20 minute)*
Trei sprite-uri-obiecte: `Cheie`, `Monedă`, `Floare`. Pentru fiecare, același script:
- pe steag: `arată` și `du-te la` un loc diferit  
- `așteaptă până când <atinge Erou?>`  
- `adaugă [Cheie] la inventar` *(numele lui)*  
- `ascunde`

**Verifici:** atingi pe rând obiectele — fiecare apare **o singură dată** în listă și dispare de pe scenă. *(Un sprite ascuns nu mai poate fi atins, deci nu se adaugă de 100 de ori.)*

### 4) Ușa, `conține?` și consumul *(Minim, partea 2 · 20 minute)*
Sprite `Ușă`, în `repetă la nesfârșit`:
- `dacă <atinge Erou?>` **atunci**:  
  - `dacă <inventar conține [Cheie]?>` **atunci**:  
    1. `șterge (poziția lui [Cheie] în inventar) din inventar` *(consumi cheia)*  
    2. `spune Deschis!` timp de `2` secunde și `ascunde`  
  - `altfel`: `spune Îți trebuie Cheia!` timp de `1` secundă

**Verifici (de fiecare dată):**  
- Ajungi la ușă **fără** cheie → mesajul „Îți trebuie Cheia!”.  
- Iei cheia, ajungi la ușă → se deschide, iar în listă **nu mai e** Cheia *(Monedă și Floare rămân)*.

### 5) Complet *(alege cel puțin una)*
- [ ] **Doi, cu reacții diferite:** `Monedă` + `Cheie` — Moneda dă `schimbă puncte cu 1`, Cheia deschide ușa  
- [ ] **Fără duplicat:** în scriptul obiectului, înainte de `adaugă`: `dacă <nu <inventar conține [Floare]?>>`  
- [ ] **Iconuri:** sprite mic pentru fiecare obiect, în colț: `dacă <inventar conține [Cheie]?>` → `arată`, `altfel` `ascunde`


---

## Greșeli frecvente
1. **Doar variabile `are_cheie = 1`** — Minim cere **listă**, cu `adaugă` și `conține?`.  
2. **Lista nu se vede** — căsuța din paleta Variabile trebuie bifată.  
3. **Adaugă „Cheie” de sute de ori** — lipsește `ascunde` după `adaugă`, sau scriptul e într-un `repetă la nesfârșit`.  
4. **Ușa se deschide fără cheie** — `dacă … conține` verifică alt nume *(Cheie ≠ cheie, diferență de majuscule)*.  
5. **Cheia nu dispare din listă** — lipsește `șterge (poziția lui … ) din inventar`.  
6. **Confuzie cu M6** — azi iteme pe **nume**; în M6, cantități pe tip.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_L4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | adaugă · conține? · șterge/consum · afișaj · reset · test coleg |
| **Complet** | Minim + 2 tipuri **sau** anti-duplicat **sau** iconuri |

---

## Bonus
- [ ] Inventar max 5 sloturi  
- [ ] Notă pe foaie: „În M6: lemn/piatră ca numere”

## Recapitulare rapidă
1. Listă = inventar pe nume  
2. `conține?` deschide uși / puteri  
3. Pod direct spre M6  

## Schema pe scurt

**Colectează**  
atinge item → `adaugă [Cheie] la inventar` → ascunde item  

**Folosește**  
`dacă inventar conține [Cheie]?` → deschide · `șterge` din listă  

**Quiz scurt:**  
- Ce face `conține?`?  
- De ce nu doar o variabilă?  
- Ce e diferit în inventarul din M6?

## Temă
Al 2-lea tip de item. Urmează L5 = **blocuri proprii**.
