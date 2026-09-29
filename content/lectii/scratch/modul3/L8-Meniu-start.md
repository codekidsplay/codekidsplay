# Lecția 8 — Meniu Start
**Modulul 3 · Jocuri**  
**Code Kids Play · Game Builder**

> Azi jocul tău are un **meniu**: nu începe la întâmplare, ci abia după ce apeși butonul Start.  
> **Deschide** proiectul din L7 → **Fișier → Salvează ca** → `Prenume_Nume_M3_L8` (ex. `Ana_Pop_M3_L8`)  
> Proiect: **„Apasă Start”**

---

## Obiectiv
La finalul orei folosești <span style="color:#E6A800;font-weight:700">trimite</span> / <span style="color:#E6A800;font-weight:700">când primesc</span> (Evenimente, *broadcast* — din M2 L8) ca jocul să **aștepte** clic pe Start.  
**Minimum:** meniu (titlu + buton) + Start pornește jocul, butonul se ascunde.  
**Ținta orei (Complet):** Minim + la final **revii** la meniu (`revino_meniu`) cu **toate** scripturile de joc oprite + reset la Start (nu doar la steag).

## De ce contează
Un joc fără meniu „fuge” din prima secundă.  
Steagul verde = pregătești scena. Butonul **Start** = jucătorul decide când începe.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | De ce meniu? + **`oprește alte scripturi din personaj`** |
| 10–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–95 | Proiectul „Apasă Start” (vezi **Minim vs Complet**) |
| 95–110 | Test: meniu → Start → joc → meniu → Start din nou |
| 110–120 | Recap, bonus, salvare |

**De reținut — Complet:**  
`stop this script` / `oprește acest script` oprește **doar** bucla aia. Mișcarea, viețile, generatorul de clone pot rula **în fundal** după ce ai revenit la meniu.  
Curat: <span style="color:#FFAB19;font-weight:700">oprește</span> → <span style="color:#FFAB19;font-weight:700">alte scripturi din personaj</span>  
*(pe **Erou**, pe **Monedă**, pe orice personaj cu `forever` de joc)*

**Capitole azi:**  
<span style="color:#E6A800;font-weight:700">Evenimente</span> (`trimite` / `când primesc`) · <span style="color:#FFAB19;font-weight:700">Control</span> (`oprește` → alte scripturi din personaj) · Aspect (`arată` / `ascunde`) · Variabile.

---

## Pas cu pas

### 1) Cele două momente
1. **Steag verde** = meniu: arată Titlu + Start, **ascunde** eroul / monedele / obstacolele  
2. **Click Start** = jocul: ascunde meniul, arată eroul, **resetează scor/vieți/nivel**, pornește totul  
3. Legătura: mesajul `start_joc`

**Încearcă tu — cele 2 momente (1 min)**  
- [ ] Poți spune: steag = meniu; click Start = jocul pornește  

### 2) Meniul — titlu + buton
1. Personaj „Titlu” + personaj „Buton Start”  
2. La steag, pe **fiecare** personaj de joc (Erou, Monedă, Obstacol…):  
   <span style="color:#9966FF;font-weight:700">ascunde</span>  
3. La steag, pe Titlu și Buton Start:  
   <span style="color:#9966FF;font-weight:700">arată</span>

**Încearcă tu — meniul se vede (2 min)**  
- [ ] Steag → **doar** titlu + Start  
- [ ] Personajele de joc sunt ascunse  

### 3) Butonul trimite `start_joc` *(nucleul Minim)*
1. Creezi mesajul `start_joc`  
2. Pe **Buton Start**:  
   <span style="color:#E6A800;font-weight:700">când se dă clic pe acest personaj</span> →  
   <span style="color:#E6A800;font-weight:700">trimite</span> `start_joc` →  
   <span style="color:#9966FF;font-weight:700">ascunde</span>
3. Pe **Titlu**:  
   <span style="color:#E6A800;font-weight:700">când primesc</span> `start_joc` →  
   <span style="color:#9966FF;font-weight:700">ascunde</span>
4. Pe **Erou** (și pe **Monedă**, dacă ai clone din L7):  
   <span style="color:#E6A800;font-weight:700">când primesc</span> `start_joc` →  
   <span style="color:#FF8C1A;font-weight:700">setează</span> `scor` <span style="color:#FF8C1A;font-weight:700">la</span> `0`  
   *(+ `vieti` la 3, `nivel` la 1, `timp` la 20 — ce ai din L3–L6)* →  
   <span style="color:#9966FF;font-weight:700">arată</span> → pornește jocul (`forever` / generator)

**De ce reset la Start, nu doar la steag?**  
Dacă termini runda, revii la meniu și apeși Start **fără** steag, scorul trebuie din nou 0. Reset **doar** la steag = a doua rundă pornește cu scorul vechi.

**Încearcă tu — click Start (3–4 min)**  
- [ ] Steag → doar meniul, nimic nu se mișcă  
- [ ] Click Start → meniul dispare, eroul apare, **scor = 0**  
- [ ] Numele mesajului e **identic**  
- [ ] Salvat: `Prenume_Nume_M3_L8`

### 4) Revii la meniu *(Complet)*
1. La victorie / Game Over (în loc de `oprește toate` imediat, sau după mesaj):  
   <span style="color:#E6A800;font-weight:700">trimite</span> `revino_meniu`
2. Pe **Titlu** și **Buton Start**:  
   <span style="color:#E6A800;font-weight:700">când primesc</span> `revino_meniu` →  
   <span style="color:#9966FF;font-weight:700">arată</span>
3. Pe **Erou**:  
   <span style="color:#E6A800;font-weight:700">când primesc</span> `revino_meniu` →  
   <span style="color:#9966FF;font-weight:700">ascunde</span> →  
   <span style="color:#FFAB19;font-weight:700">oprește</span> `alte scripturi din personaj`  
   *(oprește mișcarea, coliziunile, verificările — tot ce rulează pe Erou)*
4. Pe **Monedă** *(obligatoriu dacă ai L7)*:  
   <span style="color:#E6A800;font-weight:700">când primesc</span> `revino_meniu` →  
   <span style="color:#9966FF;font-weight:700">ascunde</span> →  
   <span style="color:#FFAB19;font-weight:700">oprește</span> `alte scripturi din personaj`  
   *(oprește generatorul `forever` — altfel monedele tot cad în meniu!)*  
   Steagul șterge clonele; la `revino_meniu` fără steag, oprești generarea ca să nu mai apară altele.
5. Același tipar pe **Obstacol** / alte personaje cu `forever` de joc

**Încearcă tu — revii la meniu (3 min)**  
- [ ] La final → meniul reapare  
- [ ] În meniu: eroul **nu** se mai mișcă, monedele **nu** mai cad  
- [ ] Click Start din nou → rundă nouă cu scor 0 (**fără** steag)  

### 5) Reset și la steag
1. Steag: meniu vizibil, joc ascuns, variabile la valori de start *(ca siguranță)*  
2. **Sursa principală** de reset pentru o rundă nouă = **`când primesc start_joc`** (pasul 3)

**Încearcă tu — reset (1–2 min)**  
- [ ] Steag → meniu curat  
- [ ] Start → joc → meniu → Start → scor din nou 0  

---

## Greșeli frecvente
1. **Jocul pornește fără Start** — `forever` pe erou e la steag, nu în `când primesc start_joc`.  
2. **Nume de mesaj diferit** — trebuie exact același din listă.  
3. **Butonul rămâne pe scenă** — uiți `ascunde` după click.  
4. **Revino la meniu, dar jocul rulează în fundal** — ai folosit doar `oprește acest script`; trebuie **`oprește alte scripturi din personaj`** pe Erou **și** pe Monedă.  
5. **Monedele cad în meniu** — Moneda n-are `revino_meniu` → `oprește alte scripturi din personaj`.  
6. **Al 2-lea Start păstrează scorul vechi** — resetul e doar la steag; mută `setează scor/vieti/…` în **`când primesc start_joc`**.  
7. **Nume fișier** — `Prenume_Nume_M3_L8`, nu doar `Ana_M3_L8`.

---

## De făcut azi — „Apasă Start”
Salvat: `Prenume_Nume_M3_L8`  
*(Pornire: proiectul L7 → **Salvează ca** L8.)*

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Meniu + Start → `start_joc` + jocul pornește + **reset variabile la Start** + butonul se ascunde |
| **Complet (ținta orei)** | Minim + `revino_meniu` + pe Erou **și** Monedă: `ascunde` + **`oprește alte scripturi din personaj`** + Start din nou fără steag |

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Meniul
- [ ] Titlu + Buton Start  
- [ ] Steag: meniu vizibil, joc ascuns  

### Pasul 2 — Start pornește jocul *(Minim)*
- [ ] Buton: click → `trimite start_joc` → `ascunde`  
- [ ] Titlu: `când primesc start_joc` → `ascunde`  
- [ ] Erou (+ Monedă): `când primesc start_joc` → **setează scor/vieti/…** → `arată` + pornește jocul  
- [ ] Salvat: `Prenume_Nume_M3_L8`

**→ Minim când:** steag → meniu; Start → joc curat cu scor 0.

### Pasul 3 — Revino la meniu *(Complet)*
- [ ] La final: `trimite revino_meniu`  
- [ ] Meniu: `când primesc revino_meniu` → `arată`  
- [ ] Erou + Monedă: `ascunde` + **`oprește alte scripturi din personaj`**  
- [ ] Coleg: Start → joacă → meniu → Start din nou, **fără** steag  
- [ ] Salvat din nou  

**Gata Complet când:** poți relua de mai multe ori doar cu Start; în meniu nici erou, nici monede nu mai rulează.

---

## Bonus (dacă ai terminat Complet)
- [ ] Buton „Cum se joacă” → `trimite info` → text cu regulile 2 s  
- [ ] Costum desenat pentru Start  
- [ ] Titlu cu culoare / stil ales de tine  

## Recapitulare rapidă
1. Steag = meniu · Start = joc + **reset variabile**  
2. `trimite` / `când primesc` = același nume  
3. La meniu: **`oprește alte scripturi din personaj`** pe Erou **și** Monedă (nu doar `acest script`)  
4. Nume: **`Prenume_Nume_M3_L8`**

## Schema pe scurt *(pe foaie)*

**Pe Buton Start**  
click → `trimite start_joc` → `ascunde`  
când primesc `revino_meniu` → `arată`

**Pe Titlu**  
când primesc `start_joc` → `ascunde`  
când primesc `revino_meniu` → `arată`

**Pe Erou**  
când primesc `start_joc` → `setează scor/vieti/…` → `arată` → pornește `forever`  
când primesc `revino_meniu` → `ascunde` → `oprește alte scripturi din personaj`

**Pe Monedă**  
când primesc `start_joc` → `forever`: generator  
când primesc `revino_meniu` → `ascunde` → `oprește alte scripturi din personaj`

**Quiz scurt (cu profesorul):**  
- De ce resetăm scorul la `start_joc`, nu doar la steag?  
- Ce diferență e între `oprește acest script` și `oprește alte scripturi din personaj`?  
- De ce Moneda trebuie să asculte `revino_meniu`?

## Temă
Opțional: costum mai frumos pentru butonul Start — același `Prenume_Nume_M3_L8`.
