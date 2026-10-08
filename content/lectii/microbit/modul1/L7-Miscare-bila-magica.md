# Lecția 7 — Mișcare: bila magică
**Modulul 1 · Primii pași cu micro:bit (blocuri)**  
**Code Maker Club · micro:bit Starter**

> Azi descoperi că placa **simte cum o miști**: o scuturi, o înclini, o ridici. Din ea facem o **bilă magică** care răspunde la întrebări.  
> Proiect: **„Bila magică Da / Nu”** · `Prenume_Nume_MB1_L07`

---

## Obiectiv
La finalul orei folosești **accelerometrul** (senzorul de mișcare) și numere **aleatorii** (alese la întâmplare).  
**Minim:** scuturi placa și ea răspunde **Da** sau **Nu**, la întâmplare.  
**Complet:** Minim + al treilea răspuns **„Poate”** și o înclinare spre stânga care pregătește o întrebare nouă.

## De ce contează
Telefonul tău își dă seama când îl răsucești și își întoarce ecranul. Jocurile de pe consolă simt când scuturi telecomanda. Toate folosesc un **accelerometru**. Iar când un joc „alege” ceva la întâmplare (un zar, o carte), folosește numere **aleatorii**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6: bucle, `repeat`, `for` |
| 10–30 | Explorăm accelerometrul: valori pe LED-uri |
| 30–45 | Gesturile: `on shake`, `on tilt left` … |
| 45–60 | Numere aleatorii: `pick random` |
| 60–90 | Bila magică Da / Nu (**Minim**) |
| 90–112 | Al treilea răspuns + înclinare (**Complet**) |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** `on shake` · `on tilt left` · `acceleration (mg) x` · `pick random 0 to 1` · `if … else if … else` · `set … to` · `show icon`

---

## Pas cu pas

### 1) Placa simte mișcarea
În micro:bit e un **accelerometru**. El măsoară cum se mișcă placa pe trei direcții: **x** (stânga-dreapta), **y** (față-spate) și **z** (sus-jos). Unitatea e **mg** („mili-g”).

**Explorare (5 minute):**
```text
forever
    show number acceleration (mg) x
    pause (ms) 500
```
- Blocul `acceleration (mg) x` e în **Input**.  
- Ține placa **dreaptă**: valoarea e aproape de `0`.  
- Înclin-o spre **dreapta**: numărul crește (până pe la `1000`).  
- Înclin-o spre **stânga**: numărul devine **negativ**.

În simulator, mută placa cu mouse-ul sau folosește cursorul pentru accelerație.

> După explorare **șterge** blocul de test sau mută-l în alt proiect, ca să nu încurce ecranul.

### 2) Gesturile
Nu trebuie să citești cifre. MakeCode are blocul **on shake**, în **Input**. Pe cuvântul `shake` apeși și vezi lista: **shake** (scuturat), **tilt left** (înclinat stânga), **tilt right**, **logo up**, **logo down**, **screen up**, **screen down**, **free fall** (cădere liberă) …

```text
on shake
    show icon [Surprised]
```
Scuturi placa, iar ea face o față mirată.

### 3) Numerele aleatorii
Un număr **aleatoriu** e ales la întâmplare, ca la zar. În **Math** găsești blocul **pick random 0 to 10**. Îl poți schimba, de exemplu **pick random 0 to 1**, care alege **0 sau 1**.

> `pick random 0 to 1` poate da doar **0** sau **1**. `pick random 0 to 2` poate da **0, 1 sau 2**.

### 4) Bila magică — Minim
Creezi variabila `raspuns`. La fiecare scuturare alegem 0 sau 1.

```text
on shake
    set raspuns to pick random 0 to 1
    if raspuns = 0 then
        show icon [Yes]
    else
        show icon [No]
```

- `0` înseamnă **Da** (bifă), `1` înseamnă **Nu** (X).  
- Pune o întrebare în gând, scutură placa, citește răspunsul!

**Ce vezi pe ecran:**
```text
Da:                      Nu:
. . . . .                # . . . #
. . . . #                . # . # .
. . . # .                . . # . .
# . # . .                . # . # .
. # . . .                # . . . #
```

### 5) Complet — „Poate” și o întrebare nouă
Adăugăm un al treilea răspuns și un semnal când placa e gata pentru următoarea întrebare.

```text
on start
    show string "?"

on shake
    set raspuns to pick random 0 to 2
    if raspuns = 0 then
        show icon [Yes]
    else if raspuns = 1 then
        show icon [No]
    else
        show icon [Confused]

on tilt left
    clear screen
    show string "?"
```

- Pentru `else if` apeși pe semnul **+** al blocului `if` și alegi `else if`.  
- Acum `pick random 0 to 2` poate da **0 (Da)**, **1 (Nu)** sau **2 (Poate)**. Pentru `2` intră ramura `else`.  
- Dacă înclini placa **spre stânga**, ea se curăță și arată `?`, gata de o nouă întrebare.

### 6) Cum verificăm că e cinstită?
Fă un **experiment** în grup: fiecare scutură de 20 de ori și notează câte `Da` și câte `Nu` au ieșit. Nu va fi exact 10 și 10, dar nici 20 și 0. Noroc! Dacă ai 20 de scuturări cu același răspuns, verifică programul.

---

## Greșeli frecvente
1. **„Nu răspunde când scutur”** — în simulator apasă **Shake**. Pe placă, scuturarea trebuie să fie energică, nu doar o mică mișcare.  
2. **„Mereu același răspuns”** — ai pus `pick random 0 to 0` sau ai uitat să schimbi intervalul.  
3. **„Apare doar Da”** — în `if` compari cu un număr care nu apare (de exemplu `raspuns = 5`).  
4. **„Poate nu apare niciodată”** — `pick random` e încă `0 to 1`; schimbă în `0 to 2`.  
5. **„Pe ecran rămâne răspunsul vechi”** — e normal. Înclin-o spre stânga ca să cureți.  
6. **„`on tilt left` nu merge în simulator”** — folosește controlul de înclinare din simulator sau testează pe placă.

---

## De făcut azi — „Bila magică Da / Nu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | `on shake`: Da (`Yes`) sau Nu (`No`) la întâmplare |
| **Complet** | Minim + al treilea răspuns **Poate** + `on tilt left` curăță ecranul |

### Pasul 1 — Minim
- [ ] Variabila `raspuns`  
- [ ] `on shake` cu `pick random 0 to 1`  
- [ ] `if … else` cu `Yes` și `No`  
- [ ] Merge pe placa adevărată  

**→ Minim când:** un coleg pune o întrebare, scuturi placa și primește un răspuns.

### Pasul 2 — Complet
- [ ] `pick random 0 to 2`  
- [ ] `else if` cu trei răspunsuri (`Yes`, `No`, `Confused`)  
- [ ] `on start` arată `?`  
- [ ] `on tilt left` pune placa pe „întrebare nouă”  
- [ ] Numele fișierului e `MB1_L07`  

---

## Bonus (după Complet)
- [ ] Fă un **al patrulea răspuns** (`Happy`) cu `pick random 0 to 3`  
- [ ] Arată înainte de răspuns o mică animație „gândesc…” (3 puncte, cu pauze)  
- [ ] Plăci V2: `on logo pressed` poate fi butonul de „întrebare nouă”  
- [ ] Numără câte răspunsuri `Da` primești: variabila `da` crește cu 1 când `raspuns = 0`

## Recapitulare rapidă
1. **Accelerometrul** simte mișcarea plăcii.  
2. `on shake` pornește când scuturi.  
3. `pick random 0 to 2` alege `0`, `1` sau `2` la întâmplare.  
4. `else if` adaugă o a treia (sau a patra) variantă.  
5. Un program poate răspunde **diferit** la aceeași acțiune.

## Schema pe scurt *(pe foaie)*

Scuturat → `pick random` → `raspuns` → `if` / `else if` / `else` → `Yes` / `No` / `Confused`

**Quiz scurt:**  
- Ce măsoară un accelerometru?  
- Ce numere poate da `pick random 0 to 2`?  
- Ce face blocul `else if`?  
- De ce bila magică nu dă mereu același răspuns?

## Temă
Gândește-te la **trei întrebări** pentru bila magică și la un **al patrulea răspuns** haios. Scrie-le pe foaie și mâine testează-le cu un coleg.
