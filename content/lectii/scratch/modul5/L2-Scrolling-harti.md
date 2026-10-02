# Lecția 2 — Derulare / hărți extinse
**Modulul 5 · Reguli de joc · Block 1**  
**Code Kids Play · Maestru de jocuri**

> Azi: lume **mai lată decât ecranul**. Folosim **`camera_x`** (sau `derulare_x`): lumea se mișcă **opus** eroului — iluzia de cameră.  
> Fișier **nou**: `Prenume_Nume_M5_L2` · proiect: **„Exploratorul pe hartă”**

---

## Obiectiv
**Minim:** hartă pe **axa X** mai lungă decât scena · eroul se simte că „merge prin lume” · există obiectiv / capăt pe hartă · reset curat.  
**Complet:** Minim + 2 zone vizuale pe aceeași derulare **sau** limite stânga/dreapta **sau** un obstacol pe traseu.

## De ce contează
**Pe scurt:** *derulare* (în engleză *scroll*) = lumea e mai mare decât scena și se mișcă în spatele eroului, ca să pară că el merge mai departe.  
Dacă muți doar eroul pe o scenă mică, nu ai „lume”.  
Derularea lumii e baza platformer-ului mare (L7–L8) și se leagă de ideea de zone din M6.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Demo: erou fix pe x vs lume care alunecă |
| 15–30 | Formula lumii pe foaie |
| 30–100 | Construiești Minim → Complet |
| 100–120 | Coleg explorează până la obiectiv |

---

## Pas cu pas

### 1) Ideea *(5 minute, pe foaie)*
Scena are 480 de pași lățime, dar harta ta e de **3 ori** mai lungă. Eroul **nu se mișcă** din mijloc: când apeși săgeata dreapta, se schimbă un număr, `camera_x` *(cât ai mers prin lume)*, iar **obiectele din lume** își recalculează locul:

**poziția pe ecran = locul din lume − camera_x**

Exemplu: un copac stă în lume la 400. Când `camera_x` = 0, copacul e la 400 *(în afara ecranului)*. Când `camera_x` = 300, copacul e la 100 *(pe ecran)*. Lumea pare că alunecă spre stânga.

**Încearcă tu — pe foaie (5 min):** unde apare pe ecran un copac din lume 800 când `camera_x` = 600? *(200)*

### 2) Scena *(10 minute)*
1. Proiect nou → `Prenume_Nume_M5_L2`  
2. Variabila `camera_x` *(pentru toate sprite-urile)*  
3. Eroul *(Erou)*, la `x: 0 y: -100`  
4. Trei sprite-uri pentru **lume**: `Copac`, `Piatră` și `Țel` *(un steag sau o ușă)*  
5. La **Erou**, pe steag: `du-te la x: 0 y: -100` și `setează camera_x la 0`

### 3) Mersul eroului *(Minim, partea 1 · 5 minute)*
La **Erou**, `repetă la nesfârșit`:
- `dacă <tasta săgeată dreapta apăsată?>` → `schimbă camera_x cu 4`  
- `dacă <tasta săgeată stânga apăsată?>` → `schimbă camera_x cu -4`

**Verifici:** eroul nu se mișcă deloc pe ecran, dar `camera_x` *(bifează căsuța)* crește când apeși dreapta și scade când apeși stânga.

### 4) Lumea care alunecă *(Minim, partea 2 · 15 minute)*
Mai întâi pentru **Copac**:
1. Creezi variabila `lume_x` **numai pentru acest sprite**  
2. Pe steag: `setează lume_x la 400` *(unde stă în lume)* și `ascunde`  
3. Apoi `repetă la nesfârșit`:  
   - `setează poz la (lume_x - camera_x)` *(variabila `poz`, tot numai pentru acest sprite)*  
   - `dacă <(abs din poz) < 250>` **atunci** `du-te la x: poz y: -100` și `arată`  
   - `altfel` `ascunde` *(în afara ecranului, Scratch nu-l lasă să plece de tot, îl lipește de margine)*

**Verifici:** apeși dreapta — copacul vine din dreapta spre tine și iese pe stânga. Apeși stânga — se întoarce.

**Copiezi scriptul** în `Piatră` și `Țel`: tragi scriptul peste sprite-ul din lista de sprite-uri. Apoi schimbi doar `lume_x`: **Piatră = 800**, **Țel = 1200**.

### 5) Obiectivul *(Minim, partea 3 · 5 minute)*
La **Țel**, în același `repetă la nesfârșit`: `dacă <atinge Erou?>` **atunci** `spune Ai ajuns!` *și* `oprește tot`.

**Verifici:** mergi, treci de copac și piatră, ajungi la Țel și jocul se oprește. Pe steag, totul revine la început *(camera_x = 0)*.

### 6) Complet *(alege cel puțin una)*
- [ ] **Limite:** la Erou, după mers: `dacă camera_x < 0` → `setează camera_x la 0`; `dacă camera_x > 1200` → `setează camera_x la 1200`  
- [ ] **Două zone:** la Fundal: `dacă camera_x > 600` **atunci** `treci la fundalul 2`, `altfel` `treci la fundalul 1`  
- [ ] **Obstacol:** sprite `Groapă` cu `lume_x` = 600; `dacă atinge Erou` → `setează camera_x la 0`


---

## Greșeli frecvente
1. **Copacul stă pe loc** — lipsește `poz` sau scriptul nu e în `repetă la nesfârșit`.  
2. **Copacul merge în același sens cu tine** — ai scris `lume_x + camera_x`. Corect: `lume_x - camera_x`.  
3. **Obiectele se lipesc de marginea ecranului** — lipsește `ascunde` pentru `abs(poz) ≥ 250`.  
4. **Variabila `lume_x` e comună** — a rămas „pentru toate sprite-urile” și toate obiectele au aceeași poziție. Trebuie **numai pentru acest sprite**.  
5. **Eroul se mișcă și el** — Erou schimbă doar `camera_x`, nu `x`.  
6. **Nu ajungi la Țel** — Țel are `lume_x` prea mare sau `camera_x` e limitat prea jos.  
7. **Reset care uită camera** — `camera_x = 0` pe steag.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_L2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Derulare X · obiectiv pe hartă · reset camera |
| **Complet** | Minim + 2 zone **sau** limite **sau** obstacol |

---

## Bonus
- [ ] Parallax ușor (fundal se mișcă mai încet)  
- [ ] Indicator „progres pe hartă”

## Recapitulare rapidă
1. Lumea se mișcă **opus**  
2. Minim = doar axa X  
3. Obiectiv real pe hartă  

## Schema pe scurt

**Idee**  
dreapta apăsat → `camera_x` se schimbă → platformele `x = start_x - camera_x`  

**Quiz scurt:**  
- De ce opus, nu la fel?  
- De ce doar X azi?  
- Ce aduci din L1 în proiectul mare?

## Temă
Un obstacol pe traseu. Urmează L3 = **inamici pe patrulare**.
