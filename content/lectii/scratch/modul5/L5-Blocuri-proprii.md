# Lecția 5 — Blocuri proprii (My Blocks)
**Modulul 5 · Reguli de joc · Block 2**  
**Code Maker Club · Maestru de jocuri**

> Azi: îți faci **propriile blocuri** ca să nu copiezi același cod de 5 ori.  
> Fișier **nou**: `Prenume_Nume_M5_L5` · proiect: **„Cod curat pe blocuri”**  
> **Pod M6:** același obicei pentru snap grilă / „pune bloc” într-un My Block.

---

## Obiectiv
**Minim:** ≥**1** bloc propriu (ex. `aplica gravitație` / `lovitură` / `reset erou`) folosit de ≥**2** ori în proiect · proiectul rulează la fel ca înainte (sau mai curat).  
**Complet:** Minim + **valoare primită** pe bloc **sau** bifa **rulează fără reîmprospătarea ecranului** pe un bloc de atingere/mișcare fină.

## De ce contează
My Blocks = „funcții” pe înțelesul copiilor.  
**Fără reîmprospătare** = atingeri mai strânse, mai puține sacadări — important la platforme și la grila din M6.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Demo: același cod de 3 ori vs un My Block |
| 15–30 | Unde găsești „Blocurile mele” + valoare primită |
| 30–100 | Refaci un proiect mic (săritură sau patrulare) cu My Blocks |
| 100–120 | Compari: mai puține scripturi lungi |

---

## Pas cu pas

### 1) Ideea *(5 minute, pe foaie)*
Un **bloc propriu** e o bucată de cod cu **nume**. Îl scrii o dată și îl folosești de câte ori vrei. Dacă mai târziu vrei să schimbi ceva, schimbi **într-un singur loc**.

Azi pornești de la jocul din **L3** *(„Evită patrula”)*. În el, „du-te la start” apare de două ori, la steag și la lovitură. Vei face un bloc `reset erou` și îl vei folosi în ambele locuri.

**Încearcă tu — pe foaie (5 min):** scrie ce face `reset erou`: *du-te la x: -200 y: -100 · setează viață la 3*.

### 2) Copia jocului *(5 minute)*
1. Deschizi proiectul `Prenume_Nume_M5_L3`  
2. **Fișier → Salvează o copie** · numele `Prenume_Nume_M5_L5`

### 3) Creezi blocurile *(Minim, partea 1 · 10 minute)*
1. La **Erou** → paleta **Blocurile mele** *(roz, jos)* → **Fă un bloc** → numele `du-te la start` → **OK**  
   Sub `definește du-te la start` pui: `du-te la x: -200 y: -100`  
2. **Fă un bloc** nou: `reset erou`  
   Sub `definește reset erou` pui: blocul `du-te la start` *(îl găsești în paleta roz)* și `setează viață la 3`

**Verifici:** în paleta roz sunt două blocuri, iar „definește” are blocurile de mai sus sub el.

### 4) Folosești blocurile *(Minim, partea 2 · 10 minute)*
1. Pe steag, la Erou: ștergi `du-te la …` și `setează viață …` și pui un singur bloc: `reset erou`  
2. În lovitură: ștergi `du-te la x: -200 y: -100` și pui `du-te la start` *(doar poziția: viața rămâne cum e)*

Blocul `du-te la start` e acum folosit în **două** locuri *(direct în lovitură și prin `reset erou`)*.

**Verifici:** apeși steagul — jocul pornește ca înainte. Te lovește inamicul — pierzi o viață și te întorci la start. **Jocul merge la fel**, doar scriptul e mai scurt.

### 5) Complet *(alege una)*
**A — Valoare primită (parametru):**  
1. Faci un bloc nou `lovitură` și bifezi **Adaugă o intrare (număr)**, numită `cât`  
2. Sub definiție: `schimbă viață cu (0 - cât)` și `du-te la start`  
3. În joc: inamicul mic apelează `lovitură 1`, cel mare *(al doilea inamic, mai gros)* apelează `lovitură 2`

**B — „Fără reîmprospătarea ecranului”:** *(pe jocul din L1, copie)*  
1. Faci blocul `ieși din podea` cu `repetă până când <nu <atinge Teren?>>` → `schimbă y cu 1` înăuntru  
2. La „Fă un bloc” bifezi **Rulează fără reîmprospătarea ecranului**  
3. Folosești blocul în locul buclei din L1  
**Verifici:** eroul nu mai tremură vizibil când aterizează, pentru că bucla se termină înainte să se deseneze ecranul.


---

## Greșeli frecvente
1. **Blocul e făcut, dar nu e folosit** — Minim cere cel puțin 2 apeluri.  
2. **Jocul s-a stricat după mutare** — ai uitat să ștergi blocurile vechi de unde ai pus blocul nou.  
3. **Viața revine la 3 la fiecare lovitură** — ai pus `reset erou` în lovitură, în loc de `du-te la start`.  
4. **Tot jocul într-un singur bloc** — extrage doar o bucată mică.  
5. **Valoarea primită nu are valoare la apel** — la `lovitură` pui un număr.  
6. **„Fără reîmprospătare” pe o animație** — animația ar sări; îl folosești doar pe bucle strânse, ca `ieși din podea`.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_L5`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 1 My Block · apelat ≥2× · proiect jucabil |
| **Complet** | Minim + valoare primită **sau** fără reîmprospătare |

---

## Bonus
- [ ] 2 My Blocks pe același proiect  
- [ ] Notă: „În M6 pun snap-ul într-un bloc”

## Recapitulare rapidă
1. My Block = bucată de cod cu nume  
2. Complet: valoare primită / fără reîmprospătare  
3. Obicei pentru M6  

## Schema pe scurt

**Definește**  
`definește reset erou` → du-te la start · viteza_y=0 · …  

**Apelează**  
la steag → `reset erou` · la moarte → `reset erou`  

**Quiz scurt:**  
- De ce My Blocks?  
- Ce e „fără reîmprospătare”?  
- Unde îl folosești în M6?

## Temă
O valoare primită pe bloc. Urmează L6 = **magazin**.
