# Lecția 7 — Crafting simplu (2→1)
**Modulul 6 · Lume de cuburi · Block 3 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui același proiect.  
> Azi: **rețetă 2→1** — consumi resurse, primești un item craftat (târnăcop / ușă / sabie…).

---

## Obiectiv
**Minim:** meniu/buton craft · ≥**1** rețetă clară (ex. lemn ≥2 → −2 lemn · +1 `tarnacop`) · afișajul arată itemul craftat · nu craftezi dacă lipsesc resurse.  
**Complet:** Minim + **2** rețete **sau** item craftat folosit în joc (spargi mai tare / ușă pe casă / lovitură mob).

## De ce contează
Crafting-ul e „magia” lumii de cuburi: transformi farm-ul în putere.  
Leagă inventarul (L4) de misiune (L8).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Rețetă pe foaie: 2 lemn → 1 ușă |
| 12–25 | Pe foaie: 1–2 rețete + ce face itemul |
| 25–100 | Buton craft + logică + (Complet) folosire |
| 100–120 | Test coleg: craft fără ajutor |

---

## Pas cu pas

### 1) Rețeta *(5 minute, pe foaie)*
Un craft are aceiași trei pași ca magazinul din M5: **verifici** dacă ai destul, **scazi**, **dai** itemul.

**Rețeta 1:** 2 lemn → 1 târnăcop. În Scratch: `dacă lemn ≥ 2` *(adică `lemn > 1`)* → `schimbă lemn cu -2` → `schimbă tarnacop cu 1`.

**Încearcă tu — pe foaie (3 min):** ai 5 lemn. Cât rămâne după un craft? *(3)* Câte târnăcoape? *(1)*

### 2) Butonul de craft *(Minim · 25 minute)*
1. Variabila `tarnacop` *(pentru toate sprite-urile, bifată)*; pe steag: `setează tarnacop la 0`  
2. Sprite `Craft` *(un buton cu text „Craft: 2 lemn → târnăcop”)*, într-un colț liber, de exemplu `x: 200 y: -160`  
3. Scriptul lui: `când se dă click pe acest personaj`:  
   - `dacă <lemn > 1>` **atunci** → `schimbă lemn cu -2` → `schimbă tarnacop cu 1` → `spune Ai făcut un târnăcop!` timp de `1` secundă  
   - `altfel` → `spune Îți trebuie 2 lemn!` timp de `2` secunde

**Verifici (de fiecare dată):**  
- Cu 1 lemn: click pe `Craft` → „Îți trebuie 2 lemn!”, lemnul rămâne 1.  
- Cu 2 sau mai mult: click → lemn scade cu 2 și `tarnacop` crește cu 1.

### 3) Complet — itemul contează *(alege cel puțin una)*
- [ ] **Târnăcopul sparge mai departe:** la steag, `setează raza la 80`. În scriptul de craft, după ce dai târnăcopul: `setează raza la 128`. *(Spargerea din L2 folosește `raza`.)*  
- [ ] **A doua rețetă:** al doilea buton `Craft sabie` — 3 piatră → 1 sabie: `dacă piatra > 2` → `schimbă piatra cu -3` → `schimbă sabie cu 1`  
- [ ] **Sabia elimină creatura:** la Erou, în scriptul de lovitură: `dacă <sabie > 0>` **atunci** `trimite creatura_lovita`, **altfel** pierzi viață. La `Creatură`: `când primesc creatura_lovita` → `ascunde` și `oprește celelalte scripturi din acest sprite`


---

## Greșeli frecvente
1. **Craftezi fără lemn suficient** — lipsește `dacă lemn > 1`.  
2. **Lemnul scade, dar nu apare itemul** — lipsește `schimbă tarnacop cu 1`, sau variabila nu e bifată.  
3. **Craftezi la nesfârșit** — click o dată = o rețetă; un buton nu e într-un `repetă`.  
4. **Itemul nu schimbă nimic** — la „Complet”, `raza` se schimbă; altfel e doar un număr.  
5. **Raza rămâne mare la steag** — pe steag, `setează raza la 80`.  
6. **Butonul e acoperit de blocuri** — pune-l într-un colț liber.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 1 rețetă 2→1 · buton · afișaj · blocat fără resurse |
| **Complet** | Minim + 2 rețete **sau** item folosit în lume |

---

## Bonus
- [ ] 3 rețete  
- [ ] Craft doar lângă „masă” (rază)

## Recapitulare rapidă
1. 2→1 = consum + produs  
2. Buton + mesaj la eșec  
3. L8 = misiune care cere craft

## Schema pe scurt

**Craft**  
click Craft → `dacă lemn ≥ 2` → lemn −2 · tarnacop +1 · altfel mesaj  

**Quiz scurt:**  
- Ce se întâmplă la 1 lemn?  
- Unde vezi itemul craftat?  
- Ce misiune ai putea pune la L8?

## Temă
Leagă itemul de o acțiune scurtă. Urmează L8 = **misiune**.
