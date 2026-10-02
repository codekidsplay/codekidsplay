# Lecția 6 — Magazin cu monede
**Modulul 5 · Reguli de joc · Block 2**  
**Code Kids Play · Maestru de jocuri**

> Azi: **monede** + magazin — cumperi upgrade doar dacă `monede ≥ preț`.  
> Fișier **nou**: `Prenume_Nume_M5_L6` · proiect: **„Magazinul jocului”**  
> **Pod M6:** aceeași logică la **crafting** (ai destule? → scade → dă item).

---

## Obiectiv
**Minim:** câștigi monede în joc · meniu/buton magazin · ≥**1** upgrade care se poate cumpăra (`dacă monede ≥ 10` → −10 + efect) · mesaj dacă nu ai destule · upgrade-ul **se simte** (viteză / costum / viață).  
**Complet:** Minim + ≥**2** upgrade-uri **sau** item în listă după cumpărare **sau** prețuri diferite.

## De ce contează
Shop = condiție + consum + recompensă — creierul craft-ului din M6 L7.  
Antrenează și ce se vede pe ecran de meniu pentru L9.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Demo: cumpără vs „nu ai destule” |
| 12–25 | Design: cum câștigi monede + ce vinzi |
| 25–100 | Joc scurt + magazin |
| 100–120 | Test coleg: cumpără o dată |

---

## Pas cu pas

### 1) Ideea *(5 minute, pe foaie)*
Un magazin are trei pași, mereu în aceeași ordine:
1. **Verifici** dacă ai destul: `monede ≥ preț`  
2. **Scazi** prețul  
3. **Dai** recompensa

Dacă n-ai destul, nu scazi nimic și spui „Nu ai destule monede!”.

**Încearcă tu — pe foaie (5 min):** upgrade-ul „Viteză +2” costă 10. Ai 7 monede — ce se întâmplă? *(mesaj de eroare, rămâi cu 7)* Ai 15 — câte rămân? *(5)*

### 2) Joc scurt cu monede *(Minim, partea 1 · 15 minute)*
1. Proiect nou → `Prenume_Nume_M5_L6`  
2. Variabile: `monede` și `viteza` *(pentru toate sprite-urile)*  
3. `Erou`: pe steag `du-te la x: 0 y: 0`, `setează viteza la 3`. În `repetă la nesfârșit`: săgețile schimbă `x` și `y` cu `viteza` *(și `-viteza`)*  
4. Sprite `Monedă`: pe steag `arată`; în `repetă la nesfârșit`:  
   - `așteaptă până când <atinge Erou?>`  
   - `schimbă monede cu 5`  
   - `ascunde` · `așteaptă 2 secunde`  
   - `du-te la x: (număr aleatoriu între -200 și 200) y: (număr aleatoriu între -100 și 100)` · `arată`  
5. Pe steag, la Scenă *sau* la Monedă: `setează monede la 0`

**Verifici:** aduni monede — la fiecare atingere `monede` crește cu 5, iar moneda reapare în alt loc.

### 3) Magazinul *(Minim, partea 2 · 20 minute)*
Sprite `Cumpără viteza` *(un buton, cu prețul scris pe el: 10)*, undeva în colț:
- `la click pe acest sprite`  
- `dacă <monede > 9>` **atunci** *(adică ≥ 10)*:  
  1. `schimbă monede cu -10`  
  2. `schimbă viteza cu 1`  
  3. `spune Cumpărat!` timp de `1` secundă  
- `altfel` `spune Nu ai destule monede!` timp de `2` secunde

**Verifici (de fiecare dată):**  
- Cu 5 monede: apeși butonul → „Nu ai destule”, monedele rămân 5.  
- Cu 10 sau mai multe: apeși → monedele scad cu 10, iar eroul merge **mai repede**. *(Acesta e „efectul”: îl simți.)*

### 4) Complet *(alege cel puțin una)*
- [ ] **Al doilea upgrade:** un buton `Cumpără viață` cu alt preț, 20: același tipar, efectul `schimbă viață cu 1` *(adaugi variabila `viață`)*  
- [ ] **În inventar:** după cumpărare, `adaugă [Viteză] la inventar` *(lista din L4)*  
- [ ] **Deschide/închide magazinul:** un sprite-buton `Magazin` care trimite `deschide_shop`; butoanele de cumpărat apar doar după ce primesc mesajul *(`când primesc deschide_shop` → `arată`)*


---

## Greșeli frecvente
1. **Monedele scad fără verificare** — lipsește `dacă monede > 9`; apar monede negative.  
2. **Cumperi, dar nu se simte nimic** — butonul scade monede dar nu schimbă `viteza`; sau mersul eroului folosește `4`, nu variabila.  
3. **`≥ 10` scris greșit** — în Scratch folosești `monede > 9` *(monedele sunt numere întregi)*.  
4. **Prețul 0** — nu e magazin.  
5. **Butonul nu răspunde** — script de tip `la click pe acest sprite`, nu `la apăsarea tastei`.  
6. **Uiți resetul** — steagul trebuie să pună `monede = 0` și `viteza = 3`.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_L6`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Monede · 1 upgrade cu `≥` · mesaj eșec · efect · reset |
| **Complet** | Minim + 2 upgrade-uri **sau** listă **sau** open/close shop |

---

## Bonus
- [ ] Reducere temporară de preț  
- [ ] Notă: „M6 craft = același dacă ≥”

## Recapitulare rapidă
1. `monede ≥ preț` → scade → dă  
2. Efect pe joc, nu doar −monede  
3. Aceeași logică la craft în M6  

## Schema pe scurt

**Cumpără**  
click upgrade → `dacă monede ≥ 10` → monede −10 · aplică · altfel mesaj  

**Quiz scurt:**  
- Ce verifici înainte să scazi?  
- Ce e la fel la crafting?  
- Ce începe la L7?

## Temă
Al 2-lea upgrade. Urmează L7 = **proiectul mare**.
