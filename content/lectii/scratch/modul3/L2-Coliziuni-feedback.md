# Lecția 2 — Coliziuni și feedback: „Yaay!” sau „Au!”
**Modulul 3 · Jocuri**  
**Code Kids Play · Game Builder**

> Azi jocul tău **reacționează** când eroul atinge ceva: țintă → bravo, obstacol → „Au!”.  
> **Deschide** proiectul din L1 (`Prenume_Nume_M3_L1`) → **Fișier → Salvează ca** → `Prenume_Nume_M3_L2` (ex. `Ana_Pop_M3_L2`)  
> Proiect: **„Țintă sau pericol”** *(ținta ta poate fi stea, ușă, comoară — numele personajului rămâne **Țintă**)*

---

## Obiectiv
La finalul orei poți folosi <span style="color:#5CB1D6;font-weight:700">atinge…?</span> (capitolul <span style="color:#5CB1D6;font-weight:700">Detectare</span>) ca jocul să răspundă diferit când eroul atinge **Ținta** sau **Obstacolul**.  
**Minimum:** **ambele** coliziuni: Țintă → „Yaay!” (+ sunet + dispare) **și** obstacol → „Au!” (+ sunet).  
**Ținta orei (Complet):** Minim + după „Au!” eroul **revine la start** (fără sunet repetat când stai lipit).

## De ce contează
Fără feedback, un joc pare „mort” — apeși, se mișcă, dar nu simți nimic. **Sunetul + mesajul** la coliziune sunt ce fac un joc să pară viu: exact ca în orice joc video, când lovești ceva primești imediat un semnal.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap foaia L1: citește **„Ce se întâmplă la atingere?”** — azi programăm exact asta |
| 10–30 | Ce e o coliziune? Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Țintă sau pericol” (vezi **Minim vs Complet**) |
| 100–120 | Test, prezentare scurtă, salvare |

**Capitole azi (3 de folosit):**  
<span style="color:#5CB1D6;font-weight:700">Detectare</span> (`atinge [personaj]?`) · <span style="color:#CF63CF;font-weight:700">Sunet</span> (`pornește sunetul`) · <span style="color:#9966FF;font-weight:700">Aspect</span> (`ascunde` / `arată`) — plus din M1–M2: <span style="color:#E6A800;font-weight:700">Evenimente</span>, <span style="color:#4C97FF;font-weight:700">Mișcare</span>, <span style="color:#FFAB19;font-weight:700">Control</span>.  
*(Variabile / scor — **nu** azi; vin la **L3**.)*

---

## Pas cu pas

### 1) Unde e „atinge…?” + forma blocului
1. Selectezi personajul **Țintă** *(numele din L1 — ex. costum de stea, ușă etc.)*
2. Din <span style="color:#5CB1D6;font-weight:700">Detectare</span>:  
   <span style="color:#5CB1D6;font-weight:700">atinge</span> `[Erou]` <span style="color:#5CB1D6;font-weight:700">?</span>  
   *(hexagon gata de folosit — răspunde da/nu, exact ca „atinge marginea?” din M2)*
3. Îl pui în hexagonul unei <span style="color:#FFAB19;font-weight:700">condiții `dacă … atunci`</span>

**Încearcă tu — forma (2 min)**  
- [ ] Ai găsit `atinge…?` în Detectare  
- [ ] Ai ales din dropdown personajul **Erou**

### 2) Coliziune cu Ținta *(nucleul Minim — tot pe Țintă)*
*(Un personaj **nu** poate ascunde alt personaj. De aceea **toată** reacția „Yaay!” stă pe **Țintă**, într-un singur script — fără probleme de sincronizare.)*

1. Selectezi **Țintă**. Tab **Sunete** → adaugi din bibliotecă un sunet scurt (ex. `Pop`)  
   *(fără sunet în tab, blocul din Sunet n-are ce reda — ca în M1 L6)*
2. Tab **Cod**. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
3. Sub steag, din <span style="color:#9966FF;font-weight:700">Aspect</span>:  
   <span style="color:#9966FF;font-weight:700">arată</span>  
   *(la a doua rulare, Ținta trebuie să reapară)*
4. Din <span style="color:#FFAB19;font-weight:700">Control</span>: <span style="color:#FFAB19;font-weight:700">forever</span>
5. **În interiorul** buclei `forever`, o <span style="color:#FFAB19;font-weight:700">condiție `dacă … atunci`</span> cu hexagon:  
   <span style="color:#5CB1D6;font-weight:700">atinge</span> `Erou` <span style="color:#5CB1D6;font-weight:700">?</span>
6. În interiorul condiției, **în ordine** *(reacție instantanee)*:  
   <span style="color:#CF63CF;font-weight:700">pornește sunetul</span> `Pop` →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Yaay!` timp de `1` secundă →  
   <span style="color:#9966FF;font-weight:700">ascunde</span>  
   *(`pornește` = sunetul începe și scriptul **merge mai departe** imediat — ca în M1 L6. Dacă pui `redă … până la final` **înainte** de `spune`, „Yaay!” apare abia după ce se termină sunetul.)*

**Schema pe Țintă:**  
`steag` → `arată` → `forever` → `dacă atinge [Erou]?` → `pornește Pop` → `spune Yaay!` → `ascunde`

**Încearcă tu — țintă (4–5 min)**  
- [ ] Atingi Ținta cu Eroul → auzi sunetul **și** vezi „Yaay!”  
- [ ] Ținta dispare după atingere  
- [ ] Steag din nou → Ținta **reapare** (`arată`)

### 3) Coliziune cu obstacolul *(tot Minim — pe Erou)*
*(Rămâne pe **Erou**, ca la Complet să poți trimite eroul înapoi la start. Hexagonul e altul; **nu** ascunzi obstacolul.)*

1. Selectezi **Erou**. Tab **Sunete** → adaugi un sunet scurt (ex. `Bonk` din Efecte — sau `Oops` / `Lose`)
2. În bucla `forever` a eroului (cea cu cele 4 direcții din L1), adaugi o **a doua** condiție `dacă`, cu hexagon:  
   <span style="color:#5CB1D6;font-weight:700">atinge</span> `Obstacol` <span style="color:#5CB1D6;font-weight:700">?</span>  
   *(numele din L1: **Obstacol**)*
3. În interiorul condiției, **în ordine**:  
   <span style="color:#CF63CF;font-weight:700">pornește sunetul</span> `Bonk` →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Au!` timp de `0.5` secunde  
   *(tot în **același** `forever` cu tastele: cât rulează `spune … timp de`, săgețile nu se verifică — eroul „îngheață” scurt, fără alte blocuri)*
4. **Problemă (o repari la Complet):** cât timp eroul stă lipit, condiția e adevărată mereu → sunetul **se repetă la nesfârșit** cât stai lipit

**Încearcă tu — obstacol (3 min)**  
- [ ] Atingi obstacolul → auzi „Au!”  
- [ ] Ai reacție pe **Țintă** (`atinge Erou?`) **și** pe **Erou** (`atinge Obstacol?`)  
- [ ] Observi (dacă rămâi lipit): sunetul se repetă — asta e pentru Complet

### 4) Fără spam: înapoi la start *(Complet)*
*(`întoarce-te 180` **nu** mută eroul — cu `schimbă x/y` din L1 rămâi lipit. `așteaptă` pe Erou îl blochează și nu poate fugi. Fixul simplu: **du-te la** poziția de start, ca în L1.)*

1. **Imediat după** `spune Au!`, pe Erou:  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> `x:` … `y:` …  
   *(aceleași numere ca la resetul de la steag din L1)*
2. Opțional: <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2` după `du-te la` — doar dacă mai rămâi lipit o clipă; de obicei nu e nevoie  
   *(`oprește alte scripturi` / „îngheț” separat — **nu** azi: mișcarea e în același `forever`, deci `spune … timp de` o oprește deja.)*

**Încearcă tu — fără spam (2–3 min)**  
- [ ] Atingi obstacolul → un „Au!”, apoi eroul e înapoi la start  
- [ ] Nu mai auzi „Au!” la nesfârșit  
- [ ] Salvat: `Prenume_Nume_M3_L2`

---

## Greșeli frecvente
1. **Condițiile `dacă` în afara buclei `forever`** — se verifică o singură dată, la pornire, și gata.
2. **Ai ales personajul greșit în dropdown** — `atinge…?` verifică exact ce ai selectat acolo, nu „orice”.
3. **`ascunde` pe Erou** — un personaj **nu** poate ascunde altul. Tot scriptul „Yaay!” (sunet + spune + `ascunde`) stă pe **Țintă**, cu `atinge [Erou]?`.
4. **Nu se aude** — sunetul nu e în tab-ul **Sunete** al personajului care redă (Țintă pentru `Pop`, Erou pentru `Bonk`).
5. **Ținta nu reapare la steag** — uiți <span style="color:#9966FF;font-weight:700">arată</span> pe Țintă, **înaintea** buclei `forever`, la clic pe steag.
6. **„Au!” la nesfârșit** — lipsește `du-te la` start după „Au!” (nu te salvează doar `întoarce-te` sau `așteaptă`).
7. **Nume fișier** — `Prenume_Nume_M3_L2`, nu doar `Ana_M3_L2`.

---

## De făcut azi — „Țintă sau pericol”
Salvat: `Prenume_Nume_M3_L2`  
*(Pornire: proiectul L1 → **Salvează ca** L2.)*

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Erou cu 4 direcții + **ambele** coliziuni: Țintă → „Yaay!” (+ sunet + `ascunde` / `arată` la steag) **și** obstacol → „Au!” (+ sunet) |
| **Complet (ținta orei)** | Minim + după „Au!”: `du-te la` start — un singur „Au!”, fără spam |

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Scena din L1
- [ ] Ai deschis L1 și l-ai salvat ca `Prenume_Nume_M3_L2`  
- [ ] Eroul se mișcă pe **4 direcții**  
- [ ] Pe scenă: **Erou**, **Obstacol**, **Țintă** (redenumite în L1)

### Pasul 2 — Yaay + Au *(Minim)*
*(Ca la „Încearcă tu — țintă” și „obstacol”.)*

- [ ] Pe **Țintă**: sunet în tab Sunete + `steag` → `arată` → `forever` → `dacă atinge [Erou]?` → `pornește Pop` → „Yaay!” → `ascunde`  
- [ ] Pe **Erou**: sunet în tab Sunete + în `forever`: `dacă atinge [Obstacol]?` → `pornește Bonk` → „Au!”  
- [ ] Salvat: `Prenume_Nume_M3_L2`

**→ Minim când:** steag → Țintă = „Yaay!” **și** obstacol = „Au!” (ambele dintr-o rulare); Ținta reapare la steag.

### Pasul 3 — Fără spam *(Complet)*
*(Ca la „Încearcă tu — fără spam”.)*

- [ ] După „Au!”: `du-te la` poziția de start (aceeași ca la resetul L1)  
- [ ] Rulează ≥10 secunde fără „Au!” repetat la nesfârșit  
- [ ] Un coleg vede: un „Au!”, apoi eroul e la start  
- [ ] Salvat din nou

**Gata Complet când:** ambele coliziuni merg **curat**, fără spam.
---

## Bonus (dacă ai terminat Complet)
- [ ] La atingerea obstacolului: <span style="color:#9966FF;font-weight:700">efect culoare</span> o clipă, apoi <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>  
- [ ] Schimbă sunetele „Yaay!” / „Au!” cu altele din bibliotecă  
- [ ] Un al doilea obstacol care se mișcă (recap L1 Complet)

## Recapitulare rapidă
1. <span style="color:#5CB1D6;font-weight:700">atinge…?</span> = întrebare da/nu, cu personajul ales din dropdown  
2. Reacția țintei = **tot pe Țintă** (`atinge [Erou]?` + sunet + spune + `ascunde` / `arată`)  
3. Fără spam la obstacol = `du-te la` start după „Au!”  
4. Nume: **`Prenume_Nume_M3_L2`**

## Schema pe scurt *(pe foaie)*

**Pe Țintă**  
la steag → `arată` → `forever`:  
· `dacă atinge [Erou]?` → `pornește Pop` → `spune Yaay!` 1 s → `ascunde`

**Pe Erou** *(în același `forever` cu cele 4 taste)*  
· `dacă atinge [Obstacol]?` → `pornește Bonk` → `spune Au!` 0,5 s → *(Complet)* `du-te la` start

**Quiz scurt (cu profesorul):**  
- Ce alegi din dropdown la blocul `atinge…?`  
- De ce `ascunde` e pe **Țintă**, nu pe Erou?  
- De ce pui **două** condiții `dacă` pe personaje diferite (Țintă + Erou)?  
- Ce se întâmplă dacă după „Au!” nu pui `du-te la` start?

## Temă
Opțional, pe foaia din L1: **„Ce număr ar trebui să crească când atingi ținta?”** (1 propoziție) — pregătire pentru L3.  
*(Proiectul rămâne `Prenume_Nume_M3_L2`.)*
