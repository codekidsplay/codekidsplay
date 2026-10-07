# Lecția 3 — Scor pe scenă: „Prinde 5 stele”
**Modulul 3 · Jocuri**  
**Code Maker Club · Game Builder**

> Azi jocul tău **ține minte** câte stele ai prins, cu o variabilă `scor` afișată pe ecran.  
> **Deschide** proiectul din L2 → **Fișier → Salvează ca** → `Prenume_Nume_M3_L3` (ex. `Ana_Pop_M3_L3`)  
> Proiect: **„Prinde 5 stele”**

---

## Obiectiv
La finalul orei poți crea o variabilă <span style="color:#FF8C1A;font-weight:700">scor</span> (capitolul <span style="color:#FF8C1A;font-weight:700">Variabile</span>) care crește la fiecare țintă prinsă și declanșează victoria la 5.  
**Minim:** variabila `scor` pe scenă, crește +1 pe atingere, resetată la steag.  
**Ținta orei (Complet):** Minim + verificare `scor = 5` cu <span style="color:#59C059;font-weight:700">Operatori</span> → mesaj de victorie + oprirea jocului.

## De ce contează
Scorul e ce face un joc **măsurabil**: fără el, „ai jucat bine” e doar o părere. Cu un număr pe ecran, tu **și** ceilalți vedeți exact cât de bine te-ai descurcat — și poți încerca să te bați pe tine însuți.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2 + **`setează` vs `schimbă`** (vezi mai jos) |
| 10–30 | Variabilă `scor` + +1 la atingere — mini-verificări (**Încearcă tu**) |
| 30–100 | Proiectul „Prinde 5 stele” (vezi **Minim vs Complet**) |
| 100–120 | Joacă o rundă, arată colegilor, salvare |

**De reținut — cele 2 blocuri pe care le confundă toți:**  
- <span style="color:#FF8C1A;font-weight:700">setează</span> `scor` <span style="color:#FF8C1A;font-weight:700">la</span> `1` = „pune scorul **exact** la 1” (nu adună)  
- <span style="color:#FF8C1A;font-weight:700">schimbă</span> `scor` <span style="color:#FF8C1A;font-weight:700">cu</span> `1` = „**adaugă** 1 la ce era” (0→1→2→3…)  
Azi la steag: **setează la 0**. La prindere: **schimbă cu 1**.

**Capitole azi (doar 2 noi / de folosit):**  
<span style="color:#FF8C1A;font-weight:700">Variabile</span> (creează variabilă, `schimbă` / `setează`) · <span style="color:#59C059;font-weight:700">Operatori</span> (`=`) — plus din M1–M2: <span style="color:#E6A800;font-weight:700">Evenimente</span>, <span style="color:#FFAB19;font-weight:700">Control</span>, <span style="color:#5CB1D6;font-weight:700">Detectare</span>, <span style="color:#9966FF;font-weight:700">Aspect</span>.  
*(Operatorii `<` `>` pe îndelete — la **L6**; azi doar `=`.)*

---

## Pas cu pas

### 1) Creezi variabila `scor`
1. Mergi la capitolul <span style="color:#FF8C1A;font-weight:700">Variabile</span>
2. Apeși **Creează o variabilă** → scrii `scor` → **Pentru toate personajele** → OK
3. Bifa lângă `scor` rămâne pusă → variabila apare **pe scenă**, sus în stânga

**Încearcă tu — variabila (2 min)**  
- [ ] Vezi `scor = 0` pe scenă  
- [ ] Poți muta căsuța cu scorul unde vrei pe scenă  
- [ ] Știi pe de rost: **setează** = fixează · **schimbă** = adaugă

### 2) Scor +1 la atingere *(nucleul Minim)*
*(Reconectezi atingerea de pe **Țintă** din L2 — acolo e `dacă atinge [Erou]?` — și adaugi scor.)*

1. Selectezi **Ținta** — scriptul din L2: `forever` + `dacă atinge [Erou]?`
2. **În interiorul** acelei condiții `dacă`, adaugi blocul:  
   <span style="color:#FF8C1A;font-weight:700">schimbă</span> `scor` <span style="color:#FF8C1A;font-weight:700">cu</span> `1`  
   *(nu `setează la 1` — altfel scorul rămâne mereu 1)*  
   Pune-l **imediat sub** `pornește sunetul`, **înainte** de `spune Yaay!`. Ordinea: sunet → `schimbă scor` → `spune` → `ascunde`. Așa scorul crește chiar la atingere, nu după o secundă.
3. Click pe **Scenă** (sau pe **Erou**) — la steag, **înaintea** buclei `forever`:  
   <span style="color:#FF8C1A;font-weight:700">setează</span> `scor` <span style="color:#FF8C1A;font-weight:700">la</span> `0`  
   *(resetul e pe Scenă/Erou — „arbitrii” care nu dispar)*

**Încearcă tu — scor crește (3–4 min)**  
- [ ] Atingi Ținta → `scor` crește cu 1 (nu sare la 1 și rămâne acolo)  
- [ ] Steag din nou → `scor` revine la 0

### 3) Mai multe ținte pe scenă
1. **Copiezi** personajul Țintă (clic dreapta → **duplică**) de **4** ori → în total **5** ținte  
2. **Important:** după fiecare duplicare, **trage** steaua nouă cu mouse-ul în **alt colț** al scenei  
   *(dacă rămân una peste alta, prinzi „una” vizual, dar scorul sare +2 / +3 / +5 dintr-o dată)*
3. Fiecare copie are **propriul** script (identic ca L2: `dacă atinge [Erou]?` → sunet + `schimbă scor cu 1` + `ascunde`)
4. La steag, fiecare țintă își face `arată` din nou

**Încearcă tu — 5 ținte (5 min)**  
- [ ] 5 ținte **vizibile și separate** pe scenă (nu una peste alta)  
- [ ] Prinzi câteva → scorul crește **cu 1** pe fiecare, nu sare

### 4) Victorie la scor = 5 *(nucleul Complet)*
*(Verificările „globale” — victorie, reset scor — stau pe **Scenă** sau pe **Erou**.  
Explicație pentru copii: *„Eroul și Scena sunt mereu acolo, nu dispar — ei pot fi arbitrii jocului!”*  
**Nu** pune victoria pe o Țintă: ea se ascunde.)*

1. Click pe **Erou** *(Scena nu are blocul `spune`, deci mesajul „Ai câștigat!” trebuie să fie pe Erou)*
2. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>: steag → din <span style="color:#FFAB19;font-weight:700">Control</span>: <span style="color:#FFAB19;font-weight:700">forever</span>
3. **În interiorul** buclei, o condiție `dacă` cu hexagon din <span style="color:#59C059;font-weight:700">Operatori</span>:  
   `scor` <span style="color:#59C059;font-weight:700">=</span> `5`  
   *(azi predăm `=` — clar și intuitiv)*
4. În interiorul condiției:  
   <span style="color:#9966FF;font-weight:700">spune</span> `Ai câștigat!` timp de `2` secunde →  
   <span style="color:#FFAB19;font-weight:700">oprește</span> `toate`


**Încearcă tu — victorie (3 min)**  
- [ ] Prinzi toate cele 5 ținte → apare „Ai câștigat!” și jocul se oprește  
- [ ] Scriptul de victorie e pe **Erou**, nu pe o Țintă (ea se ascunde)  
- [ ] Salvat: `Prenume_Nume_M3_L3`

---

## Greșeli frecvente
1. **`setează` în loc de `schimbă` la atingere** — scorul sare la 1 și rămâne 1; la prindere folosești **`schimbă … cu 1`**.
2. **`schimbă scor cu 1` e în afara condiției `dacă`** — atunci crește mereu, nu doar la atingere.
3. **Uiți `setează scor la 0` la steag** — scorul continuă de la runda trecută.
4. **Țintele una peste alta** — după **duplică**, trage fiecare stea în alt loc; altfel scorul sare dintr-o dată.
5. **`schimbă scor cu 2` (sau alt număr)** — cu victoria `scor = 5`, poți sări peste 5 și jocul **nu se mai oprește**. Pe fiecare țintă: **doar +1**.
6. **Victoria pe o Țintă** — pune-o pe **Scenă** (sau Erou), nu pe steaua care dispare.
7. **`oprește toate` lipsă** — jocul continuă și după victorie, confuz.
8. **Ai pus `=` din alt capitol** — trebuie **exact** din <span style="color:#59C059;font-weight:700">Operatori</span>, forma rotunjită.
9. **Nume fișier** — `Prenume_Nume_M3_L3`, nu doar `Ana_M3_L3`.

---

## De făcut azi — „Prinde 5 stele”
Salvat: `Prenume_Nume_M3_L3`  
*(Pornire: proiectul L2 → **Salvează ca** L3.)*

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Variabila `scor` pe scenă, resetată la steag (`setează la 0`), crește +1 la fiecare atingere (măcar 3 ținte **separate**) |
| **Complet (ținta orei)** | Minim + **5** ținte + pe **Scenă/Erou**: `scor = 5` → „Ai câștigat!” + `oprește toate` |

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Variabila + reset *(bază)*
- [ ] Variabila `scor`, vizibilă pe scenă  
- [ ] Pe **Scenă** sau **Erou**: `setează scor la 0` la steag  

### Pasul 2 — Atingere + scor *(Minim)*
- [ ] Pe **Țintă**: `dacă atinge [Erou]?` → sunet + **`schimbă scor cu 1`** + `ascunde`  
- [ ] Măcar 3 ținte pe scenă, **trase în locuri diferite**, fiecare cu propriul script  
- [ ] Salvat: `Prenume_Nume_M3_L3`

**→ Minim când:** steag → prinzi ținte → scorul crește **cu 1** pe fiecare, fără să sară.

### Pasul 3 — 5 ținte + victorie *(Complet)*
- [ ] Ai exact **5** ținte pe scenă la steag, **separate**  
- [ ] Pe **Scenă** (sau Erou): `forever` → `dacă scor = 5` → „Ai câștigat!” + `oprește toate`  
- [ ] Un coleg joacă o rundă completă de la steag până la victorie  
- [ ] Salvat din nou

**Gata Complet când:** poți câștiga o rundă întreagă de la steagul verde, cu mesaj de victorie clar.

---

## Bonus (dacă ai terminat Complet)
- [ ] Țintă mai grea: **10** stele + mesaj special de campion *(și `scor = 10` pe Erou)*  
- [ ] Scorul final apare mare pe ecran la victorie (<span style="color:#9966FF;font-weight:700">spune</span> combinat cu `scor`, folosind blocul `unește` din Operatori)  
- [ ] Combo: 2 stele prinse la rând, rapid → +1 punct bonus

## Recapitulare rapidă
1. <span style="color:#FF8C1A;font-weight:700">Variabilă</span> = o cutiuță cu un număr care se ține minte  
2. **`schimbă` = adaugă** · **`setează` = fixează**  
3. `schimbă scor cu 1` merge **în** condiția `dacă`, pe Țintă  
4. Reset + victorie = pe **Scenă** sau **Erou** (arbitrii)  
5. `scor = 5` din <span style="color:#59C059;font-weight:700">Operatori</span> compară, nu schimbă  
6. Nume: **`Prenume_Nume_M3_L3`**

## Schema pe scurt *(pe foaie)*

**Pe Erou** *(arbitrul)*  
la steag → `setează scor la 0` → `forever`:  
· `dacă scor = 5` → `spune Ai câștigat!` 2 s → `oprește toate`

**Pe fiecare Țintă**  
la steag → `arată` → `forever`:  
· `dacă atinge [Erou]?` → `pornește Pop` → `schimbă scor cu 1` → `ascunde`

**Quiz scurt (cu profesorul):**  
- Diferența dintre `setează` și `schimbă`?  
- De ce ai nevoie de `setează scor la 0` la steag?  
- De ce victoria e pe Scenă/Erou, nu pe Țintă?  
- Ce se întâmplă dacă uiți să tragi stelele duplicate în locuri diferite?

## Temă
Opțional: schimbă ținta de victorie la 8 stele (`scor = 8`) — același fișier `Prenume_Nume_M3_L3`. E mai greu sau mai distractiv?
