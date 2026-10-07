# Lecția 7 — Clone
**Modulul 3 · Jocuri**  
**Code Maker Club · Game Builder**

> Azi un singur personaj se **multiplică** singur: monedele cad din cer fără să le desenezi pe fiecare.  
> **Deschide** proiectul din L6 *(sau L5, dacă n-ai nivele)* → **Fișier → Salvează ca** → `Prenume_Nume_M3_L7` (ex. `Ana_Pop_M3_L7`)  
> Proiect: **„Ploaie de monede”**

---

## Obiectiv
La finalul orei folosești <span style="color:#FFAB19;font-weight:700">creează o clonă de mine</span> și <span style="color:#FFAB19;font-weight:700">când pornesc ca și clonă</span> (capitolul <span style="color:#FFAB19;font-weight:700">Control</span>) ca monedele să cadă singure.  
**Minim:** clonele apar, cad până jos (`y < -160`) și **se șterg** corect — fără să se adune pe ecran.  
**Ținta orei (Complet):** Minim + scor la prindere (`șterge` imediat) + viteză **jucabilă**.

## De ce contează
Un joc bun n-are nevoie de 20 de monede desenate manual pe scenă.  
Scratch poate face **copii** ale unui personaj, din mers — exact ca ploaia, gloanțele sau inamicii dintr-un joc adevărat.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Ce e o clonă? + **`y < -160`** (nu `atinge marginea`) |
| 10–35 | Pas cu pas: mini-verificări (**Încearcă tu**) |
| 35–100 | Proiectul „Ploaie de monede” (vezi **Minim vs Complet**) |
| 100–110 | Ajustezi viteza / cât de des apar monedele |
| 110–120 | Recap, bonus, salvare |

**De reținut:**  
Căderea **nu** se oprește cu `atinge marginea?` — la `y = 170` costumul poate atinge deja **marginea de sus** → bucla se termină **înainte** să cadă.  
Mai sigur: <span style="color:#FFAB19;font-weight:700">repetă până</span> <span style="color:#59C059;font-weight:700">(poziția y) &lt; (-160)</span> → apoi `șterge această clonă`.

**Capitole azi:**  
<span style="color:#FFAB19;font-weight:700">Control</span> (`creează clonă`, `când pornesc ca și clonă`, `șterge această clonă`, `repetă până`) · <span style="color:#59C059;font-weight:700">Operatori</span> (`număr aleator`, `<`) · plus Evenimente, Mișcare, Detectare, Variabile.

---

## Pas cu pas

### 1) Ce e o clonă?
O **clonă** e o copie temporară: aceleași costume + scriptul „când pornesc ca și clonă”, dar **poziție proprie**.  
Clona **nu** e personajul original. Se creează și se **șterg** la comandă; originalul rămâne.

**Încearcă tu — înțelegi clona (1 min)**  
- [ ] Poți spune: clonă = copie temporară, nu personaj nou desenat de tine  

### 2) Generatorul de clone — personajul „Monedă”
1. Personaj **Monedă**  
2. La steag: <span style="color:#9966FF;font-weight:700">ascunde</span> *(originalul nu cade)*  
3. Într-o buclă `forever` pe Monedă:  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.8`–`1` →  
   <span style="color:#FFAB19;font-weight:700">creează o clonă de</span> `mine`

**Încearcă tu — generatorul (2 min)**  
- [ ] Originalul e ascuns la steag  
- [ ] O clonă nouă la fiecare ~1 secundă  
- [ ] Încă nu vezi cădere — normal, lipsește scriptul de mai jos  

### 3) Ce face fiecare clonă *(nucleul Minim)*
1. Script **nou** pe Monedă:  
   <span style="color:#FFAB19;font-weight:700">când pornesc ca și clonă</span>
2. <span style="color:#9966FF;font-weight:700">arată</span> →  
   <span style="color:#4C97FF;font-weight:700">du-te la x:</span> <span style="color:#59C059;font-weight:700">număr aleator între (-200) și (200)</span>  
   <span style="color:#4C97FF;font-weight:700">y:</span> `160`  
   *(`160`, nu `170` — mai în interiorul ecranului)*
3. <span style="color:#FFAB19;font-weight:700">repetă până</span>  
   <span style="color:#59C059;font-weight:700">(poziția y) &lt; (-160)</span>  
   În interiorul buclei:  
   <span style="color:#4C97FF;font-weight:700">schimbă y cu</span> `-4`
4. **După** buclă (a ajuns jos):  
   <span style="color:#FFAB19;font-weight:700">șterge această clonă</span>

**Încearcă tu — clona cade (3–4 min)**  
- [ ] Fiecare clonă apare sus, pe un `x` aleator  
- [ ] Cade până jos, apoi **dispare** (nu se adună)  
- [ ] Nu dispare **imediat** la creare (ai `y < -160`, nu `atinge marginea`)  
- [ ] Salvat: `Prenume_Nume_M3_L7`

### 4) Prinderea — scor fără dubluri *(Complet)*
*Ordinea contează: `șterge` **în** `dacă atinge Erou?` oprește clona imediat → **un singur** +1, nu +2/+3.*

1. **În** bucla `repetă până y < -160`, **după** `schimbă y cu -4`, adaugi:  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge</span> `Erou` <span style="color:#5CB1D6;font-weight:700">?</span> <span style="color:#FFAB19;font-weight:700">atunci</span>  
   <span style="color:#FF8C1A;font-weight:700">schimbă</span> `scor` <span style="color:#FF8C1A;font-weight:700">cu</span> `1` →  
   <span style="color:#FFAB19;font-weight:700">șterge această clonă</span>
2. Schema pe clonă:  
   `când pornesc ca și clonă` → `arată` → `du-te la` (x aleator, y `160`) →  
   `repetă până y < -160`: `schimbă y -4` → `dacă atinge Erou?` → +1 + **șterge** →  
   *(după buclă)* `șterge această clonă` *(dacă a ajuns jos fără să fie prinsă)*

**Încearcă tu — prinderea (2–3 min)**  
- [ ] Atingi o monedă → scor **+1 o dată** → moneda dispare  
- [ ] Nu atingi → cade jos și se șterge  
- [ ] Nu vezi scorul sărind +2/+3 pe o singură monedă  

### 5) Reset la steag
1. Steag: `scor` = 0, originalul `ascunde`, poziția eroului  
2. Scratch **șterge automat** toate clonele la steag — nu le numeri tu

**Încearcă tu — reset (1–2 min)**  
- [ ] Steag de două ori: scor 0, fără monede vechi  
- [ ] Viteza (`-4`) e jucabilă  

---

## Greșeli frecvente
1. **`atinge marginea?` la cădere** — clona poate „muri” sus, înainte să cadă; folosește **`poziția y < -160`**.  
2. **Clonele nu se șterg** — lipsește `șterge această clonă` jos **și** la prindere. Scratch are maxim **~300 clone**; după ~30 s fără ștergere, **nu mai apar monede noi**.  
3. **Scor +2 / +3 pe o monedă** — `șterge` lipsește din `dacă atinge Erou?`; fără el, bucla mai rulează și mai adaugă puncte.  
4. **Originalul cade și el** — uiți `ascunde` pe Monedă la steag.  
5. **Toate pe aceeași linie** — `x` fără `număr aleator`.  
6. **Cade prea rapid** — încearcă `schimbă y cu -3` sau `-4`.  
7. **Generatorul e pe Erou** — `creează clonă de mine` stă pe **Monedă**.  
8. **Nume fișier** — `Prenume_Nume_M3_L7`, nu doar `Ana_M3_L7`.

---

## De făcut azi — „Ploaie de monede”
Salvat: `Prenume_Nume_M3_L7`  
*(Pornire: proiectul recent → **Salvează ca** L7.)*

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Generator + clone care cad cu `y < -160` + `șterge` jos — fără acumulare |
| **Complet (ținta orei)** | Minim + `dacă atinge Erou?` → +1 + **șterge** (în buclă) + viteză jucabilă |

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Personajele
- [ ] Erou pe **4 direcții**  
- [ ] Monedă **ascunsă** la steag  
- [ ] Variabila `scor` pe scenă  

### Pasul 2 — Clonele cad *(Minim)*
- [ ] `forever`: `așteaptă` + `creează clonă de mine`  
- [ ] `când pornesc ca și clonă`: `y = 160` → `repetă până y < -160` → `șterge`  
- [ ] Salvat: `Prenume_Nume_M3_L7`

**→ Minim când:** monedele cad și dispar jos, fără morman pe ecran.

### Pasul 3 — Scor + viteză *(Complet)*
- [ ] În buclă: `dacă atinge Erou?` → `schimbă scor cu 1` → `șterge această clonă`  
- [ ] Un coleg prinde cel puțin o monedă din prima  
- [ ] Salvat din nou  

**Gata Complet când:** controlezi eroul, prinzi monede, scorul crește curat, fără sacadări.

---

## Bonus (dacă ai terminat Complet)
- [ ] Al 2-lea tip: „Bombă” → `schimbă vieti cu -1` + `șterge`  
- [ ] Interval mai mic la `așteaptă` când `scor` crește  
- [ ] Sunet la prindere · mesaj la un scor țintă  

## Recapitulare rapidă
1. Clonă = copie **temporară**  
2. Cădere sigură: **`y < -160`**, nu `atinge marginea`  
3. La prindere: +1 și **`șterge` imediat** (anti scor multiplu)  
4. Fără `șterge` → după ~300 clone, ploaia se oprește  
5. Nume: **`Prenume_Nume_M3_L7`**

## Schema pe scurt *(pe foaie)*

**Pe Monedă — generator**  
la steag → `ascunde` → `forever`: `așteaptă 0.8` → `creează clonă de mine`

**Pe Monedă — fiecare clonă**  
când pornesc ca și clonă → `arată` → `du-te la` x aleator, y `160` →  
`repetă până` `poziția y < -160`:  
· `schimbă y cu -4`  
· `dacă atinge [Erou]?` → `schimbă scor cu 1` → `șterge această clonă`  
apoi: `șterge această clonă`

**Quiz scurt (cu profesorul):**  
- De ce nu folosim `atinge marginea?` la cădere?  
- De ce `șterge` stă **în** `dacă atinge Erou?`?  
- Ce se întâmplă dacă uiți să ștergi clonele?

## Temă
Opțional: interval `1.2` s între clone, dacă e prea haotic — același `Prenume_Nume_M3_L7`.
