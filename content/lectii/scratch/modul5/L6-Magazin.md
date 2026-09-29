# Lecția 6 — Magazin cu monede
**Modulul 5 · Mecanici de joc · Block 2**  
**Code Kids Play · Maestru de jocuri**

> Azi: **monede** + magazin — cumperi upgrade doar dacă `monede ≥ preț`.  
> Fișier **nou**: `Prenume_Nume_M5_L6` · proiect: **„Magazinul jocului”**  
> **Pod M6:** aceeași logică la **crafting** (ai destule? → scade → dă item).

---

## Obiectiv
**Minimum:** câștigi monede în joc · meniu/buton magazin · ≥**1** upgrade cumpărabil (`dacă monede ≥ 10` → −10 + efect) · mesaj dacă nu ai destule · upgrade-ul **se simte** (viteză / costum / viață).  
**Complet:** Minim + ≥**2** upgrade-uri **sau** item în listă după cumpărare **sau** prețuri diferite.

## De ce contează
Shop = condiție + consum + recompensă — creierul craft-ului din M6 L7.  
Antrenează și UI-ul de meniu pentru L9.

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

### 1) Economie pe foaie
1. Cum câștigi monede (atinge monedă / inamic / obiectiv)  
2. Un upgrade Minim: ex. „Viteză +” = 10 monede  
3. Efectul după cumpărare

**Încearcă tu (5 min)**  
- [ ] Preț + efect scrise  

### 2) Monede pe Scenă
1. Proiect nou → `Prenume_Nume_M5_L6`  
2. `monede` pe Scenă · steag = 0 (sau kit mic)  
3. Colectare: `schimbă monede cu +1` (sau +5)

**Încearcă tu (15 min)**  
- [ ] Poți aduna ≥ prețul unui upgrade  

### 3) Magazin *(Minim)*
1. Buton „Magazin” / sprite shop  
2. La click pe upgrade:  
   `dacă monede ≥ 10` → `schimbă monede cu -10` → aplică upgrade (ex. `setează viteza la …` / `adaugă` în listă / `schimbă vieti`)  
   altfel → `spune` „Nu ai destule monede!”  
3. Nu poți cumpăra de 100 ori același lucru fără sens — flag `are_viteza` **sau** permite stack (spune pe foaie)

**Încearcă tu (30 min)**  
- [ ] Cu 5 monede: eșuează  
- [ ] Cu 10+: reușește · efect vizibil în joc  

### 4) Complet
Alege **cel puțin una**:  
- [ ] Al 2-lea upgrade (preț diferit)  
- [ ] După cumpărare: `adaugă [Viteză] la inventar` (leagă L4)  
- [ ] Magazin se deschide/închide (mesaj `deschide_shop`)  

---

## Greșeli frecvente
1. **Scazi monedele fără `dacă ≥`** — monede negative.  
2. **Cumpără dar zero efect** — Minim cere efect simțit.  
3. **Shop doar pe foaie** — trebuie buton pe scenă.  
4. **Preț 0** — nu e magazin.  
5. **Uiți reset** — steagul resetează monede + upgrade-uri.

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
