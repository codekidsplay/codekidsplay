# Lecția 6 — Nivele
**Modulul 3 · Jocuri**  
**Code Maker Club · Game Builder**

> Azi jocul tău are **2 nivele**: termini nivelul 1 → fundal nou, scor resetat, stelele **reapar**, nivelul 2 e mai greu.  
> **Deschide** proiectul din L5 → **Fișier → Salvează ca** → `Prenume_Nume_M3_L6` (ex. `Ana_Pop_M3_L6`)  
> Proiect: **„Nivelul 1 și 2”**

---

## Obiectiv
La finalul orei folosești o variabilă <span style="color:#FF8C1A;font-weight:700">nivel</span> ca jocul să **treacă singur** de la nivelul 1 la nivelul 2, cu fundal nou, ținte readuse pe scenă și dificultate mai mare.  
**Minim:** **o** trecere nivel 1 → nivel 2 (fundal + scor resetat + stele `arată` via mesaj) — fără repetări.  
**Ținta orei (Complet):** Minim + nivelul 2 vizibil **mai dificil** + `nivel` pe scenă + mesaj „Nivelul 2!” + final pe nivelul 2.

## De ce contează
Un joc care rămâne la fel de la primul la ultimul minut devine plictisitor.  
Nivelele dau un sentiment de progres: „am trecut de nivelul 1” e o mică victorie care te face să continui.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3–L5 + blocul **ȘI** + mesajul `Nivelul 2` |
| 10–30 | Variabila `nivel` + 2 fundaluri + trecerea cu `și` — mini-verificări |
| 30–100 | Stelele reapar + nivelul 2 mai greu + final (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**De reținut — două idei noi împreună:**  

1. **Blocul ȘI** din <span style="color:#59C059;font-weight:700">Operatori</span> — hexagonul `[ … ] și [ … ]`  
   *„Ca o ușă cu **două lacăte**: trebuie **și** scorul potrivit, **și** să fii pe nivelul 1 — altfel ușa nu se deschide.”*  

2. **Mesaj** (îl știi din M2 L8): la trecere, Eroul / Scena face  
   <span style="color:#E6A800;font-weight:700">trimite</span> `Nivelul 2`  
   Pe **fiecare Țintă**: <span style="color:#E6A800;font-weight:700">când primesc</span> `Nivelul 2` → <span style="color:#9966FF;font-weight:700">arată</span>  
   *(Fără asta: fundalul 2 apare, dar stelele rămân **ascunse** din L3 — nu mai ai ce prinde!)*

**Capitole azi:**  
<span style="color:#FF8C1A;font-weight:700">Variabile</span> (`nivel`) · <span style="color:#59C059;font-weight:700">Operatori</span> (`=` · **`și`**) · <span style="color:#E6A800;font-weight:700">Evenimente</span> (`trimite` / `când primesc`) · <span style="color:#9966FF;font-weight:700">Aspect</span> (`comută fundalul`, `arată`) — plus Control, Mișcare din L1–L5.

---

## Pas cu pas

### 1) Ce schimbă un nivel?
1. Un fundal nou („am trecut!”)  
2. Stelele **reapar** (altfel nivelul 2 e gol)  
3. Scorul se **resetează** la 0  
4. Ceva e **puțin mai greu** (viteză / obstacol / țintă de scor)

**Încearcă tu — ce schimbă (1 min)**  
- [ ] Poți spune cu voce: fundal + stele din nou + scor 0 + puțin mai greu  

### 2) Variabila `nivel` + 2 fundaluri
1. Din <span style="color:#FF8C1A;font-weight:700">Variabile</span>: creezi `nivel` (**Pentru toate personajele**), o arăți pe scenă  
2. Pe Scenă: adaugi **al 2-lea fundal** — diferit vizual clar  
3. Pe **Scenă** sau **Erou**, sub steag:  
   <span style="color:#FF8C1A;font-weight:700">setează</span> `nivel` <span style="color:#FF8C1A;font-weight:700">la</span> `1` →  
   <span style="color:#FF8C1A;font-weight:700">setează</span> `scor` <span style="color:#FF8C1A;font-weight:700">la</span> `0` →  
   <span style="color:#9966FF;font-weight:700">comută fundalul la</span> `fundal1`  
4. Pe **fiecare Țintă**, la steag: <span style="color:#9966FF;font-weight:700">arată</span> (ca în L2–L3)

**Încearcă tu — variabila + fundaluri (2–3 min)**  
- [ ] `nivel` vizibil, pornește la `1`  
- [ ] **2** fundaluri pe Scenă  
- [ ] Steag → fundal 1 + `nivel` = 1 + `scor` = 0 + stele vizibile  

### 3) Trecerea la nivelul 2 *(nucleul Minim)*
*Garda: verifici trecerea **doar** pe nivelul 1 — altfel „treci” la infinit.*

1. Pe **Erou**, în `forever`:  
   <span style="color:#FFAB19;font-weight:700">dacă</span>  
   <span style="color:#59C059;font-weight:700">(scor) = (3)</span>  
   <span style="color:#59C059;font-weight:700">și</span>  
   <span style="color:#59C059;font-weight:700">(nivel) = (1)</span>  
   <span style="color:#FFAB19;font-weight:700">atunci</span>  
2. În interior, **în ordine**:  
   <span style="color:#FF8C1A;font-weight:700">setează</span> `nivel` <span style="color:#FF8C1A;font-weight:700">la</span> `2` →  
   <span style="color:#FF8C1A;font-weight:700">setează</span> `scor` <span style="color:#FF8C1A;font-weight:700">la</span> `0` →  
   <span style="color:#FF8C1A;font-weight:700">setează</span> `timp` <span style="color:#FF8C1A;font-weight:700">la</span> `20` →  
   <span style="color:#9966FF;font-weight:700">comută fundalul la</span> `fundal2` →  
   <span style="color:#E6A800;font-weight:700">trimite</span> `Nivelul 2` →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Nivelul 2!` timp de `2` secunde  
   *(`spune` pe Erou, nu pe Scenă. **`setează timp la 20`** — dacă ții cronometrul din L5: altfel poți intra pe nivelul 2 cu 2 s pe ceas și pierzi imediat.)*
3. **De ce `nivel = 1` în ȘI:** după trecere, `nivel` e 2 → condiția e falsă → **fără repetări**.

**Încearcă tu — trecerea (3–4 min)**  
- [ ] Prinzi **3** obiecte pe nivelul 1 → fundal 2 + „Nivelul 2!” + scor 0  
- [ ] Fundalul **nu** se schimbă din nou dacă mai stai cu scorul mare  

### 4) Stelele reapar la Nivelul 2 *(tot Minim — obligatoriu)*
*(La L3 ai prins 3 din 5: 3 sunt `ascunde`, 2 mai sunt pe scenă. Fără `arată` pe **toate**, nivelul 2 e haotic sau gol.)*

1. Pe **fiecare Țintă** (toate copiile), script **nou**:  
   <span style="color:#E6A800;font-weight:700">când primesc</span> `Nivelul 2` →  
   <span style="color:#9966FF;font-weight:700">arată</span> →  
   *(opțional)* <span style="color:#4C97FF;font-weight:700">du-te la</span> `x:` … `y:` … *(poziții noi pe nivelul 2)*
2. Numele mesajului: **exact** `Nivelul 2` la `trimite` și la `când primesc`

**Încearcă tu — stele din nou (3 min)**  
- [ ] Trecerea la nivel 2 → **toate** țintele reapar (nu rămân doar 2 vechi)  
- [ ] Poți prinde din nou pentru scorul nivelului 2  
- [ ] Salvat: `Prenume_Nume_M3_L6`

### 5) Nivelul 2 — puțin mai greu + final *(Complet)*
Alege **una** (sau două) din opțiunile rapide:

| Opțiune | Ce faci |
|---------|---------|
| **1 — Viteză** | Obstacolul / eroul: pași mai mari (ex. `10` → `15`) doar pe nivelul 2 |
| **2 — Obstacol nou** | Al 2-lea obstacol: la steag `ascunde`; `când primesc Nivelul 2` → `arată` |
| **3 — Țintă de scor** | Nivel 1: trecere la `scor = 3`; nivel 2: final la `scor = 5` |

Final de joc (pe **Erou**):  
<span style="color:#FFAB19;font-weight:700">dacă</span>  
<span style="color:#59C059;font-weight:700">(scor) = (5)</span>  
<span style="color:#59C059;font-weight:700">și</span>  
<span style="color:#59C059;font-weight:700">(nivel) = (2)</span>  
<span style="color:#FFAB19;font-weight:700">atunci</span> →  
<span style="color:#9966FF;font-weight:700">spune</span> `Ai terminat jocul!` timp de `2` →  
<span style="color:#FFAB19;font-weight:700">oprește</span> `toate`

**Încearcă tu — nivel 2 + final (3–4 min)**  
- [ ] Nivelul 2 se simte **puțin** mai greu (ai ales o opțiune din tabel)  
- [ ] La ținta de scor din nivel 2 → mesaj final + stop (o singură dată)  

### 6) Reset complet la steag
1. La steag (**Scenă** / **Erou**): `nivel` = 1, `scor` = 0, fundal 1, poziție erou, <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>, <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>  
2. Pe fiecare Țintă: `arată` (+ poziții de start, dacă le-ai schimbat)  
3. Obstacolul „doar pe nivelul 2”: la steag → `ascunde`

**Încearcă tu — reset (1–2 min)**  
- [ ] Steag de două ori: mereu nivelul 1, stele vizibile, scor 0  

---

## Greșeli frecvente
1. **Fundalul 2, dar zero stele** — uiți `trimite Nivelul 2` / `când primesc` → `arată` pe **fiecare** Țintă.  
2. **Fundalul se schimbă la infinit** — lipsește garda `nivel = 1` din blocul **ȘI**.  
3. **Hexagonul ȘI e greșit asamblat** — ambele condiții (`scor = …` și `nivel = …`) stau **în** cele două sloturi ale blocului verde `și`.  
4. **Scorul nu se resetează** la trecere — treci imediat „gata” pe nivelul 2.  
5. **Timpul nu se resetează** (cronometru din L5) — intri pe nivelul 2 cu 1–2 s pe ceas și pierzi imediat; la trecere: **`setează timp la 20`**.  
6. **Doar 2 stele pe nivelul 2** — cele neprinse din nivelul 1; toate trebuie `arată` la mesaj.  
7. **Mesaj cu nume diferit** — `Nivelul 2` vs `nivel 2` vs `Nivel 2` — trebuie **identic**.  
8. **Nivelul 2 identic cu 1** — alege măcar o opțiune din tabelul Complet.  
9. **Nume fișier** — `Prenume_Nume_M3_L6`, nu doar `Ana_M3_L6`.

---

## De făcut azi — „Nivelul 1 și 2”
Salvat: `Prenume_Nume_M3_L6`  
*(Pornire: proiectul L5 → **Salvează ca** L6.)*

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `nivel` + 2 fundaluri + `dacă scor = 3 și nivel = 1` → nivel 2, scor 0, **timp 20** (din L5), fundal 2, **`trimite Nivelul 2`**, stelele `arată` — fără repetări |
| **Complet (ținta orei)** | Minim + nivelul 2 **mai greu** (o opțiune din tabel) + final `scor = 5 și nivel = 2` + mesaj „Nivelul 2!” |

Dacă rămâi în urmă: **termină întâi Minim, apoi salvează.**  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Setup
- [ ] 2 fundaluri · `nivel` (pentru toți) · `scor`  
- [ ] Steag: nivel 1, scor 0, fundal 1, stele `arată`  

### Pasul 2 — Trecere + stele *(Minim)*
- [ ] `dacă scor = 3 și nivel = 1` → setează nivel 2, scor 0, **timp 20** (dacă ai cronometru din L5), fundal 2, **`trimite Nivelul 2`**, `spune Nivelul 2!`  
- [ ] Pe **fiecare** Țintă: `când primesc Nivelul 2` → `arată`  
- [ ] Trecerea **o singură dată**  
- [ ] Salvat: `Prenume_Nume_M3_L6`

**→ Minim când:** prinzi 3 → fundal 2 + stele din nou pe scenă, fără tremur.

### Pasul 3 — Mai greu + final *(Complet)*
- [ ] O schimbare clară pe nivelul 2 (viteză / obstacol nou / țintă 5)  
- [ ] `dacă scor = 5 și nivel = 2` → „Ai terminat jocul!” + `oprește toate`  
- [ ] Un coleg joacă ambele nivele fără explicație  
- [ ] Salvat din nou  

**Gata Complet când:** steag → nivel 1 → nivel 2 (cu stele) → final, singur.

---

## Bonus (dacă ai terminat Complet)
- [ ] **Nivelul 3** (al 3-lea fundal + `trimite Nivelul 3` + garda `nivel = 2`)  
- [ ] La `când primesc Nivelul 2`: stelele `du-te la` poziții **noi**  
- [ ] Efect scurt de culoare pe erou la trecere, apoi <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span>

## Recapitulare rapidă
1. `nivel` + garda cu **ȘI** = trecere o singură dată  
2. La trecere: fundal + scor 0 + **timp 20** (dacă ai cronometru) + **`trimite Nivelul 2`** → stelele `arată`  
3. ȘI = două lacăte pe aceeași ușă  
4. Nivelul 2 = măcar o dificultate vizibilă  
5. Nume: **`Prenume_Nume_M3_L6`**

## Schema pe scurt *(pe foaie)*

**Pe Erou** *(sau Scenă)*  
la steag → `setează nivel la 1` · `scor la 0` · fundal 1 →  
`forever`:  
· `dacă scor = 3 și nivel = 1` → `setează nivel la 2` · `scor la 0` · `timp la 20` · fundal 2 · `trimite Nivelul 2` · `spune Nivelul 2!`  
· `dacă scor = 5 și nivel = 2` → `spune Ai terminat jocul!` → `oprește toate` *(Complet)*

**Pe fiecare Țintă**  
la steag → `arată`  
când primesc `Nivelul 2` → `arată` *(+ opțional `du-te la` poziții noi)*

**Quiz scurt (cu profesorul):**  
- De ce `nivel = 1` în condiția de trecere?  
- Ce se întâmplă dacă uiți `trimite Nivelul 2`?  
- Ce e blocul **ȘI**, pe scurt?  
- Cum faci nivelul 2 mai greu în 2 minute?

## Temă
Opțional: pe foaie, ce ai pune pe nivelul 3 (fundal + o dificultate)? Același proiect `Prenume_Nume_M3_L6`.
