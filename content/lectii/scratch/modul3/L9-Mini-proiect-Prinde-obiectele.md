# Lecția 9 — Mini-proiect: Prinde obiectele
**Modulul 3 · Jocuri**  
**Code Kids Play · Game Builder**

> Azi pui împreună tot ce ai învățat în M3: un joc **întreg**, cu meniu, obiecte care cad, scor și un final clar.  
> **Deschide** proiectul din L8 *(sau cel mai recent care merge)* → **Fișier → Salvează ca** → `Prenume_Nume_M3_L9`  
> Proiect: **„Prinde obiectele”**

---

## Obiectiv
La finalul orei ai un joc jucabil de la Start la final: meniu + erou + obiecte care cad (clone) + scor + vieți **sau** timer + mesaj de final.  
**Minim:** scheletul rulează — erou **stânga/dreapta** *(sau 4 dir.)* + **un** generator de clone + scor la prindere + reset.  
**Ținta orei (Complet):** Minim + **meniu Start** + **vieți** *(recomandat)* **sau** timer + final clar + un coleg joacă fără explicații.

## De ce contează
L1–L8 = piese. L9 = **jocul tău**, pus cap la cap. La L10 îl îmbunătățești și îl prezinți.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + **regula de aur** + Minim vs Complet |
| 10–30 | Pas cu pas: mini-verificări (**Încearcă tu**) |
| 30–50 | **Doar scheletul Minim** — **fără** costume / fundaluri noi |
| 50–100 | Complet: meniu + vieți (sau timer) + final · apoi decor |
| 100–120 | Recap, bonus, salvare / pregătire L10 |

**Regulă de timp (min 50):** până la minutul **50**, **nimeni** nu lucrează la decoruri, fundaluri complexe sau costume noi.  
Până atunci = **doar arhitectura** (control + clone + scor).  
După ce scorul crește la prindere și clonele cad corect → poți deschide editorul grafic.

**De reținut — regula de aur la jocul de prins obiecte:**  
- **Erou** = **doar** mișcarea.  
- **Monedă / Fruct** = **doar** generatorul de clone + căderea (`schimbă y cu -4`).  
**Nu** copia tastele pe obiectul care cade!  

**Cel care prinde = de obicei stânga / dreapta** (`schimbă x`). E suficient și mai ușor de controlat.  
Dacă adaugi și **sus / jos**: nu urca eroul aproape de `y = 160` (acolo apar monedele) — altfel le prinzi **imediat**, cum se nasc.

---

## Pas cu pas

### 1) Reguli
1. Eroul: **stânga / dreapta** *(recomandat)* sau 4 direcții — ca L1  
2. Obiectele cad ca **clone** — ca L7 (`y < -160`)  
3. Prins → `schimbă scor cu 1` + `șterge` — ca L7  
4. Ratat → **vieți −1** *(recomandat)* **sau** timer — ca L4 **sau** L5 — **una**, nu ambele  
5. Meniu Start — ca L8  

**Încearcă tu — știu regulile (1–2 min)**  
- [ ] Știi cine are tastele și cine are căderea  
- [ ] Știi: Minim = scheletul care **rulează**, nu jocul cu meniu + decor  

### 2) Scheletul — control + generator
1. **Erou**: control **stânga / dreapta** în `forever` *(sus/jos opțional — nu urca la `y ≈ 160`; nimic de cădere pe Erou)*  
2. **Personaj cădere**, original `ascunde` la steag  
3. Pe cădere: `forever` → `așteaptă` → `creează clonă de mine`  
4. Steag / `start_joc`: reset `scor` (+ `vieti` dacă ai), poziție erou, efecte, sunete  

**Încearcă tu — control + generator (2–3 min)**  
- [ ] Eroul se mișcă stânga / dreapta *(sau 4 direcții, fără să urce în zona de apar)*  
- [ ] Clonele apar și cad — **fără** taste pe Monedă  

### 3) Prindere + scor *(Minim)*
Pe clonă, în `repetă până y < -160`:  
`schimbă y cu -4` →  
`dacă atinge [Erou]?` → `schimbă scor cu 1` → `șterge această clonă`  
După buclă: `șterge această clonă` *(a ajuns jos)*

**Încearcă tu — scheletul rulează (3–5 min)**  
- [ ] Prins → scor +1 o dată  
- [ ] Ratezi → clona dispare jos  
- [ ] Salvat: `Prenume_Nume_M3_L9`  

**→ Minim când:** steag → miști → prinzi → scorul crește, fără morman de clone.

### 4) Complet — vieți *(recomandat)* sau timer
*(30–50 = Minim. După 50: alegi finalul. **Viețile** sunt mai ușor de înțeles la jocul de prins obiecte: vezi moneda care scapă pe jos.)*

**Opțiunea A — Vieți** *(recomandat pentru nivel mediu)*  
Pe clonă, **după** bucla de cădere *(doar dacă n-a fost ștearsă la prindere)*:  
`schimbă vieti cu -1` → `șterge această clonă`  

Schema pe clonă:  
`când pornesc ca și clonă` → `arată` → `du-te la` (x aleator, y `160`) →  
`repetă până y < -160`: `schimbă y -4` → `dacă atinge Erou?` → +1 scor + **șterge** →  
*(jos, neratată în buclă = a scăpat)* `schimbă vieti cu -1` → `șterge`  

Pe Erou: `dacă vieti = 0` → „Game Over” → `oprește toate` (sau `revino_meniu`, ca L8).

**Opțiunea B — Timer**  
Ca L5: countdown pe Scenă; la `timp = 0` mesaj pe Erou.  
*Nu combina azi Vieți + Timer — se pot ciocni la final (scor vs timp în aceeași clipă).*

**Plus meniu** (ca L8): Start → `start_joc` + reset variabile; `revino_meniu` + `oprește alte scripturi din personaj` pe Erou **și** Monedă.

**Încearcă tu — Complet (3–5 min)**  
- [ ] Meniu Start funcționează  
- [ ] Vieți **sau** timer, cu final clar  
- [ ] Un coleg joacă **fără** voce  
- [ ] *(Abia acum)* costume / fundal — dacă vrei  

---

## Greșeli frecvente
1. **Taste pe Monedă** — mișcarea e **doar** pe Erou; pe Monedă doar clone + cădere.  
1b. **Erou urcat la `y ≈ 160`** — prinzi monedele imediat ce apar; la jocul de prins obiecte, preferă **doar** stânga/dreapta.  
2. **Clonele nu se șterg** — `șterge` la prindere **și** jos (`y < -160`).  
3. **Scor multiplu** — lipsește `șterge` din `dacă atinge Erou?`.  
4. **Decor înainte de minutul 50** — mai întâi scheletul; apoi frumosul.  
5. **Vieți ȘI timer** — azi alege **un** final principal.  
6. **Jocul pornește fără Start** — `forever` de joc în `când primesc start_joc` (L8).  
7. **Viața nu scade la ratare** — `schimbă vieti cu -1` stă **după** buclă, nu înăuntru la fiecare pas.  
8. **Nume fișier** — `Prenume_Nume_M3_L9`, nu doar `Ana_M3_L9`.

**Ajutor profesor:** la ~50 min, cine n-are scorul la prindere = ajutat pe **schelet**, nu pe meniu/decor.

---

## De făcut azi — „Prinde obiectele”
Salvat: `Prenume_Nume_M3_L9`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Erou stânga/dreapta *(sau 4 dir.)* + generator + prindere → `scor +1` + `șterge` — **fără** focus pe decor |
| **Complet (ținta orei)** | Minim + meniu Start + **vieți** (recomandat) **sau** timer + final clar + coleg joacă fără explicație |

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus / decor.

### Pasul 1 — Lumea (simplu)
- [ ] Erou + personaj cădere + `scor`  
- [ ] Reset la steag / `start_joc`  

### Pasul 2 — Scheletul *(Minim — până la min 50)*
- [ ] Taste **doar** pe Erou  
- [ ] Clone: cad + prindere + ștergere  
- [ ] Salvat: `Prenume_Nume_M3_L9`

**→ Minim când:** prinzi obiecte, scorul crește, fără acumulare.

### Pasul 3 — Meniu + final *(Complet — după min 50)*
- [ ] Meniu Start (L8)  
- [ ] Vieți *(ratare = −1)* **sau** timer  
- [ ] Coleg termină jocul fără explicație  
- [ ] Salvat din nou  

**Gata Complet când:** meniu → Start → joci → final clar.

---

## Bonus (dacă ai terminat Complet)
- [ ] **2 nivele** (ca L6)  
- [ ] Power-up rar (încetinește căderea 5 s)  
- [ ] High score care nu se resetează la Start  

## Recapitulare rapidă
1. Erou = mișcare · Obiect = clone + cădere  
2. Minim întâi (până la min 50), decor după  
3. Joc de prins obiecte: **vieți** la ratare e cel mai clar; timer e alternativa  
4. L10 = finisări + prezentare + insignă  
5. Nume: **`Prenume_Nume_M3_L9`**

## Schema pe scurt *(pe foaie)*

**1. Pe Erou** *(mișcare + meniu — **recomandat: doar stânga/dreapta**)*  
când primesc `start_joc` → `arată` → `forever`:  
· `dacă` tasta dreapta → `schimbă x cu 8`  
· `dacă` tasta stânga → `schimbă x cu -8`  
*(sus/jos opțional; dacă le ai: nu urca lângă `y = 160` — apar monede)*  
*(la Start: și `setează scor la 0` / `vieti la 3`)*  

când primesc `revino_meniu` → `ascunde` → `oprește alte scripturi din personaj`

**2. Pe Monedă** *(generator + clonă)*  
la steag → `ascunde`  

când primesc `start_joc` → `forever`: `așteaptă 0.8` → `creează clonă de mine`  

când pornesc ca și clonă → `arată` → `du-te la` x aleator, y `160` →  
`repetă până` `poziția y < -160`:  
· `schimbă y cu -4`  
· `dacă atinge Erou?` → `schimbă scor cu 1` → `șterge această clonă`  
apoi *(jos, neratată)*: `schimbă vieti cu -1` → `șterge această clonă`  

când primesc `revino_meniu` → `ascunde` → `oprește alte scripturi din personaj`

**Quiz scurt (cu profesorul):**  
- Cine are tastele — Erou sau Monedă?  
- Unde pui `schimbă vieti cu -1` la o monedă ratată?  
- De ce nu facem costume înainte de minutul 50?

## Temă
Opțional: varianta pe care n-ai ales-o (vieți ↔ timer) — același `Prenume_Nume_M3_L9`.  
La **L10**: finisări + prezentare + insignă.
