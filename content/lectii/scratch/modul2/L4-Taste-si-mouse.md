# Lecția 4 — Taste și mouse
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi **tu** controlezi eroul: săgeți / WASD și mouse.  
> Proiect: **„Pilot în labirint”** · fișier: `Prenume_L4` (ex. `Ana_L4`)

---

## Obiectiv
La finalul orei miști fluid personajul cu <span style="color:#5CB1D6;font-weight:700">tasta … e apăsată?</span> în <span style="color:#FFAB19;font-weight:700">forever</span>, plus un control cu **mouse**, și ajungi la o ieșire pe scenă.

## De ce contează
Labirinturile și jocurile se joacă cu **tastele**. Pattern-ul din Scratch e mereu același: steag → forever → dacă tasta → mișcă.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap atingere + obiectiv control |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Pilot în labirint” |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Pattern-ul de aur (copiază mental)
```
când se face clic pe steagul verde
  du-te la start
  forever
    dacă tasta dreapta e apăsată atunci
      schimbă x cu 5
    dacă tasta stânga e apăsată atunci
      schimbă x cu -5
    … (sus / jos pe y)
```

### 2) Taste — pas cu pas
1. Steag + <span style="color:#4C97FF;font-weight:700">du-te la</span> start  
2. <span style="color:#FFAB19;font-weight:700">forever</span>  
3. Patru <span style="color:#FFAB19;font-weight:700">dacă</span> (sau câte încape clar):  
   - dreapta → <span style="color:#4C97FF;font-weight:700">schimbă x cu</span> `5`  
   - stânga → <span style="color:#4C97FF;font-weight:700">schimbă x cu</span> `-5`  
   - sus → <span style="color:#4C97FF;font-weight:700">schimbă y cu</span> `5`  
   - jos → <span style="color:#4C97FF;font-weight:700">schimbă y cu</span> `-5`  
4. Hexagon: <span style="color:#5CB1D6;font-weight:700">tasta</span> `…` <span style="color:#5CB1D6;font-weight:700">e apăsată?</span>

*Viteză:* 3 = lent, 5 = normal, 8 = rapid. Alege una și ține-o.

### 3) Mouse
1. Hexagon util: <span style="color:#5CB1D6;font-weight:700">mouse-ul e apăsat?</span>  
2. Mișcare: <span style="color:#4C97FF;font-weight:700">dulează la indicatorul mouse-ului</span>  
   *(în Scratch: **du-te la indicatorul mouse-ului** — sau `îndreaptă-te spre…` + `mergi`)*  
3. Test scurt **într-un `dacă`**: dacă mouse apăsat → du-te la pointer  
4. Nu e obligatoriu în labirintul final — e bine să știi că există

### 4) Labirintul de azi
1. Pereți = **culori** pe fundal **sau** personaje-obstacol  
2. Ieșire = personaj „ieșire” / culoare verde  
3. În forever, după control:  
   - dacă atinge **perete** (culoare) → înapoi la start (ca L3)  
   - dacă atinge **ieșirea** → <span style="color:#9966FF;font-weight:700">spune</span> `Ai ajuns!` + sunet  
     *(fără `scor > …` — scorul e L5/L6)*

---

## Încearcă tu — verifică înainte să continui

- [ ] Cele 4 direcții merg în `forever`  
- [ ] La steag: reset la start  
- [ ] Ai încercat o dată controlul cu **mouse** (chiar 10 sec)  
- [ ] Viteza e confortabilă (nu zboară din scenă)

---

## Greșeli frecvente
1. **Se mișcă o singură dată** — lipsește `forever`; sau `dacă` e pe „când se apasă tasta” (eveniment) amestecat greșit cu „tasta e apăsată” (detectare). Azi vrem **Detectare** în forever.  
2. **Se mișcă singur** — ai lăsat un `mergi` în forever **în afara** lui `dacă`.  
3. **X/Y invers** — stânga/dreapta = **x**; sus/jos = **y**.  
4. **Ciocnire ciudată** — personajul e mare; micșorează-l sau îngroașă pereții.

---

## De făcut azi — „Pilot în labirint”
Salvat: `Prenume_L4`

### Pasul 1 — Control
- [ ] Steag + start curat  
- [ ] Forever + **4 taste** (săgeți sau WASD)  
- [ ] Viteza aleasă (ex. 5)  

### Pasul 2 — Obstacole + ieșire
- [ ] Cel puțin **2** obstacole (culoare sau personaje)  
- [ ] O **ieșire** clară  
- [ ] Atingere perete → reset start  
- [ ] Atingere ieșire → mesaj de succes  

### Pasul 3 — Gata
- [ ] Un coleg poate ajunge la ieșire în <1 min  
- [ ] Opțional demonstrat: 5 sec urmărire mouse  

**Gata când:** controlezi fluent și ieșirea „se simte” ca un finish.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] **WASD + săgeți** pe același erou (ambele seturi)  
- [ ] Urmărește mouse-ul **doar** când click e apăsat  
- [ ] Tasta **Shift** (sau spațiu): viteză mai mare cât e apăsată  

## Recapitulare rapidă
1. Control fluid = `forever` + `tasta e apăsată?`  
2. x = stânga/dreapta · y = sus/jos  
3. Mouse = opțional; labirintul cere taste  

**Quiz scurt (cu profesorul):**  
- De ce `forever` + „tasta e apăsată”, nu doar „când se apasă tasta”?  
- Ce schimbă `schimbă x cu -5`?

## Temă
Opțional: încearcă vitezele 3, 5, 8 — notează într-o propoziție care ți se potrivește — `Prenume_L4`.
