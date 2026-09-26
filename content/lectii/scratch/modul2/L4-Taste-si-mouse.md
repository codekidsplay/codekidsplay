# Lecția 4 — Taste și mouse
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi **tu** controlezi eroul: săgeți / WASD și mouse.  
> Proiect: **„Pilot în labirint”** · fișier: `Prenume_Nume_L4` (ex. `Ana_Pop_L4`)

---

## Obiectiv
La finalul orei miști fluid personajul cu <span style="color:#5CB1D6;font-weight:700">tasta … e apăsată?</span> în <span style="color:#FFAB19;font-weight:700">forever</span>.  
**Minimum:** **4 taste** + reset complet + **un** obstacol (perete) funcțional.  
**Ținta orei (Complet):** Minim + **ieșire** cu mesaj + **≥2** obstacole + (opțional) demonstrație **mouse**.

## De ce contează
Labirinturile și jocurile se joacă cu **tastele**. Pattern-ul din Scratch e mereu același: steag → forever → dacă tasta → mișcă.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap atingere + obiectiv control |
| 10–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Pilot în labirint” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Pattern-ul de aur (copiază mental)
```
când se face clic pe steagul verde
  du-te la start
  anulează efectele grafice
  oprește toate sunetele
  forever
    dacă tasta dreapta e apăsată atunci
      schimbă x cu 5
    dacă tasta stânga e apăsată atunci
      schimbă x cu -5
    … (sus / jos pe y)
    — apoi verificările (perete / ieșire) —
```

**Ordinea în `forever`:** întâi **mișcarea** (tastele), **apoi** `dacă` pe perete / ieșire.  
Astfel personajul se mișcă, **apoi** Scratch verifică dacă a intrat în perete — ca la L3 (lavă după control).

### 2) Taste — pas cu pas *(nucleul Minim)*
1. Steag + reset **complet** (ca L1–L3):  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> start →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span> →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>
2. <span style="color:#FFAB19;font-weight:700">forever</span>
3. Patru <span style="color:#FFAB19;font-weight:700">dacă</span> (separate — **nu** `dacă … altfel`):  
   - dreapta → <span style="color:#4C97FF;font-weight:700">schimbă x cu</span> `5`  
   - stânga → <span style="color:#4C97FF;font-weight:700">schimbă x cu</span> `-5`  
   - sus → <span style="color:#4C97FF;font-weight:700">schimbă y cu</span> `5`  
   - jos → <span style="color:#4C97FF;font-weight:700">schimbă y cu</span> `-5`  
4. Hexagon: <span style="color:#5CB1D6;font-weight:700">tasta</span> `…` <span style="color:#5CB1D6;font-weight:700">e apăsată?</span>

*Viteză:* 3 = lent, 5 = normal, 8 = rapid. Alege una și ține-o.

*Bine de știut:* dacă ții **două** săgeți deodată (ex. dreapta + sus), personajul merge **pieziș** — e **normal**, nu o greșeală. Cele 4 `dacă` pot fi adevărate în același timp.

**Încearcă tu — taste (3–4 min)**  
- [ ] Cele **4** direcții merg în `forever`  
- [ ] La steag: reset (loc + efecte + sunete)  
- [ ] Viteza e confortabilă (nu zboară din scenă)  
- [ ] Ai încercat două taste odată → merge pieziș (intenționat)  

### 3) Mouse *(demo — Complet opțional)*
1. Hexagon util: <span style="color:#5CB1D6;font-weight:700">mouse-ul e apăsat?</span>  
2. Mișcare: <span style="color:#4C97FF;font-weight:700">glisează la</span> / <span style="color:#4C97FF;font-weight:700">du-te la indicatorul mouse-ului</span>  
   *(în Scratch: **du-te la indicatorul mouse-ului** — sau `îndreaptă-te spre indicatorul mouse-ului` + `mergi`)*  
3. Test scurt **într-un `dacă`**: dacă mouse apăsat → du-te la pointer  
4. **Nu** e obligatoriu în labirintul Minim — e bine să știi că există; la Complet poți demonstra ~5–10 sec

**Încearcă tu — mouse (1–2 min)**  
- [ ] Ai găsit `du-te la indicatorul mouse-ului` (sau `glisează la…`)  
- [ ] Ții click → eroul urmărește pointerul ~10 sec  
- [ ] Știi: labirintul final se joacă cu **tastele**; mouse = demo  

### 4) Labirint: perete + ieșire
1. Pereți = **culori** pe fundal **sau** personaje-obstacol  
2. Ieșire = personaj „ieșire” / culoare verde clară  
3. În `forever`, **după** cele 4 taste:  
   - dacă atinge **perete** (culoare / personaj) → <span style="color:#4C97FF;font-weight:700">du-te la</span> start (ca L3)  
   - dacă atinge **ieșirea** → <span style="color:#9966FF;font-weight:700">spune</span> `Ai ajuns!` + <span style="color:#CF63CF;font-weight:700">sunet</span> →  
     <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` *(evită spam-ul)*  
     *(fără `scor > …` — scorul e L5/L6)*

**Minim:** ajunge să ai **1** perete care te trimite la start.  
**Complet:** **≥2** obstacole + ieșirea cu mesaj (+ demo mouse dacă vrei).

**Încearcă tu — labirint (3–5 min)**  
- [ ] Cel puțin **1** perete te resetează la start  
- [ ] (Complet) ≥2 obstacole + ieșire → `Ai ajuns!` + sunet  
- [ ] Ordinea: taste **sus** în forever, verificări **jos**  
- [ ] Salvat: `Prenume_Nume_L4`  

---

## Greșeli frecvente
1. **Se mișcă o singură dată** — lipsește `forever`; sau `dacă` e pe „când se apasă tasta” (eveniment) amestecat greșit cu „tasta e apăsată” (detectare). Azi vrem **Detectare** în forever.  
2. **Se mișcă singur** — ai lăsat un `mergi` în forever **în afara** lui `dacă`.  
3. **X/Y invers** — stânga/dreapta = **x**; sus/jos = **y**.  
4. **Ciocnire ciudată** — personajul e mare; micșorează-l sau îngroașă pereții.  
5. **„De ce merge pieziș?”** — două taste odată = diagonală; e intenționat.  
6. **Peretele nu „simte”** — verificarea e **înainte** de mișcare, sau lipsește din forever; pune-o **după** taste.  
7. **Nume fișier** — `Prenume_Nume_L4`, nu doar `Ana_L4`.

---

## De făcut azi — „Pilot în labirint”
Salvat: `Prenume_Nume_L4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Reset complet + **4 taste** în `forever` + **1** obstacol (perete → start) |
| **Complet (ținta orei)** | Minim + **ieșire** cu mesaj (+ sunet) + **≥2** obstacole + (opțional) demo **mouse** ~5–10 sec |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Control *(parte din Minim)*
*(Ca la „Încearcă tu — taste”.)*

- [ ] Steag + reset: loc start + `anulează efectele` + `oprește toate sunetele`  
- [ ] Forever + **4 taste** (săgeți sau WASD)  
- [ ] Viteza aleasă (ex. 5)  

### Pasul 2 — Obstacol *(Minim)*
- [ ] Cel puțin **1** obstacol (culoare sau personaj)  
- [ ] Atingere perete → reset start  
- [ ] Salvat: `Prenume_Nume_L4`  

**→ Minim când:** te miști pe 4 direcții și un perete te întoarce la start.

### Pasul 3 — Ieșire + obstacole *(Complet)*
*(Ca la „Încearcă tu — labirint”.)*

- [ ] Cel puțin **2** obstacole  
- [ ] O **ieșire** clară → mesaj de succes + sunet  
- [ ] Un coleg poate ajunge la ieșire în <1 min  
- [ ] Opțional: 5–10 sec urmărire mouse  
- [ ] Salvat din nou  

**Gata Complet când:** controlezi fluent și ieșirea „se simte” ca un finish.

---

## Bonus (dacă ai terminat Complet)
- [ ] **WASD + săgeți** pe același erou (ambele seturi)  
- [ ] Urmărește mouse-ul **doar** când click e apăsat  
- [ ] Tasta **Shift** (sau spațiu): viteză mai mare cât e apăsată  

## Recapitulare rapidă
1. Control fluid = `forever` + `tasta e apăsată?`  
2. x = stânga/dreapta · y = sus/jos · două taste = pieziș (ok)  
3. În forever: **mișcare**, apoi **perete / ieșire**  
4. Mouse = opțional; labirintul cere taste  
5. Nume: **`Prenume_Nume_L4`**  

**Quiz scurt (cu profesorul):**  
- De ce `forever` + „tasta e apăsată”, nu doar „când se apasă tasta”?  
- Ce schimbă `schimbă x cu -5`?  
- De ce verificăm peretele **după** mișcare?

## Temă
Opțional: încearcă vitezele 3, 5, 8 — notează într-o propoziție care ți se potrivește — `Prenume_Nume_L4`.
