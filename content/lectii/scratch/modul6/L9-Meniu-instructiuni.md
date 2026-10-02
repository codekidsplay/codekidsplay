# Lecția 9 — Meniu Start + instrucțiuni
**Modulul 6 · Lume de cuburi · Block 3 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui **același** fișier (nu proiect nou).  
> Azi: ecran **Start**, reset curat, ghid de taste — ca un joc gata de prezentat.

---

## Obiectiv
**Minim:** meniu Start (buton) · `start_joc` pornește lumea · restart / steag readuce meniul sau resetează tot · pe scenă: **Cum minezi / pui / craftezi** · coleg începe **singur** din meniu.  
**Complet:** Minim + `revino_meniu` · instrucțiuni pe ecran separat **sau** pauză I · controale multi-linie clare (clic / E / 1-2-3).

## De ce contează
Fără meniu, jocul „începe în mijloc”.  
Instrucțiunile înlocuiesc gura ta la L10.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Recap M3 L8: `start_joc` / `revino_meniu` |
| 12–30 | Text controale pe foaie |
| 30–100 | Meniu + reset + instrucțiuni pe scenă |
| 100–120 | Test coleg 5 min, zero ajutor |

**Controale de scris pe scenă (Minim):**  
- Săgeți = mișcare pe grilă  
- Clic stânga = sparge (aproape de tine)  
- E = pune bloc  
- (dacă ai) 1/2/3 = tip · Craft = buton  

---

## Pas cu pas

### 1) Planul *(5 minute, pe foaie)*
Trei mesaje, trimise cu `trimite … către toți`:  
- `start_joc` — pornește lumea  
- `win` / `lose` — jocul s-a terminat  
- `revino_meniu` — înapoi la meniu

**Încearcă tu — pe foaie (5 min):** desenează fluxul: *steag → meniu → Start → joc → win / lose → meniu*.

### 2) Meniul *(Minim, partea 1 · 25 minute)*
1. Un sprite nou `Meniu`, cu textul **START** pe un buton mare și titlul jocului  
2. Pe steag: `arată` · `du-te la x: 0 y: 0` · `treci în față`  
3. `la click pe acest personaj`: `trimite start_joc` și `ascunde`  
4. **Generatorul de blocuri** *(L1, la `Bloc`)* nu mai pornește la steag, ci sub `când primesc start_joc`  
5. Pe steag, la `Bloc`, `Erou`, `Creatură`, `Craft`, `Final`: doar `ascunde`  
6. Sub `când primesc start_joc`, la fiecare dintre ele: `arată` *(unde e cazul)* și scripturile de joc *(patrulare, click, mers)*  
7. Primul bloc sub fiecare `când primesc start_joc`: `oprește [celelalte scripturi din acest sprite]`

**Verifici:** apeși steagul — se vede doar meniul. Apeși Start — apare lumea cu eroul și blocurile.

### 3) Resetul complet *(Minim, partea 2 · 15 minute)*
Sub `când primesc start_joc` la Erou, înainte de joc: `setează lemn la 0` · `piatra` · `pamant` · `tarnacop` · `sabie` *(dacă ai făcut-o la L7)* · `puse` · `setează vieti la 3` · `setează raza la 80` · `setează tip_activ la 1` · `du-te la x: 0 y: -160`.

**Verifici:** joci, ajungi la meniu, apeși Start din nou — totul e curat: numerele la 0, lumea refăcută.

### 4) Instrucțiunile *(Minim, partea 3 · 15 minute)*
Pe `Meniu`, un al doilea costum sau text, maxim **5–6 rânduri**:
- Săgeți = mers  
- Click = sparge  
- E = pune  
- 1 / 2 / 3 = tipul  
- Click pe Craft = fă un târnăcop

**Verifici:** un coleg care n-a mai văzut jocul găsește singur cum se minează.

### 5) Întoarcerea la meniu *(Minim · 10 minute)*
1. Când `win` sau `lose`, după 3 secunde: `trimite revino_meniu`  
2. Meniul: `când primesc revino_meniu` → `arată` și `treci în față`  
3. Celelalte sprite-uri: `când primesc revino_meniu` → `oprește celelalte scripturi din acest sprite` și `ascunde`; clonele de bloc: `șterge această clonă`

### 6) Complet *(alege cel puțin una)*
- [ ] **Buton/tastă înapoi:** `când se apasă tasta m` → `trimite revino_meniu`  
- [ ] **Ecran „Cum se joacă”** separat: un buton pe meniu care arată instrucțiunile  
- [ ] **Tasta I** arată/ascunde ajutorul în timpul jocului *(variabila `ajutor` 0/1)*


---

## Greșeli frecvente
1. **Lumea apare înainte de Start** — generatorul sau mersul sunt încă la `steag`, nu la `start_joc`.  
2. **Start de două ori dublează blocurile** — lipsește `oprește celelalte scripturi din acest sprite` sau clonele vechi nu se șterg la `revino_meniu`.  
3. **Meniul rămâne peste joc** — lipsește `ascunde` după click.  
4. **Resetul e parțial** — rămân lemn, vieti, puse sau tarnacop din jocul anterior.  
5. **Nimeni nu știe controalele** — scrie-le pe meniu.  
6. **Steagul duce direct în joc** — la steag trebuie doar meniul.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Meniu Start · reset · controale pe scenă · test coleg |
| **Complet** | Minim + revino meniu **sau** ecran ajutor **sau** tasta I |

---

## Bonus
- [ ] Trailer 3–5 s înainte de Start  
- [ ] Numele jocului pe meniu  

## Recapitulare rapidă
1. Meniu → Start → reset  
2. Controale pe ecran  
3. L10 = finisări + prezentare + insignă

## Schema pe scurt

**Meniu**  
steag → meniu · click Start → `trimite start_joc` → reset + joacă  

**Quiz scurt:**  
- Ce resetează Start?  
- Unde sunt controalele scrise?  
- Ce finisări vrei la L10?

## Temă
20 s vorbite: titlu · misiune · de ce ești mândru. Urmează L10.
