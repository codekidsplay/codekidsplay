# Lecția 8 — Misiune / obiectiv de victorie
**Modulul 6 · Lume de cuburi · Block 3 · Fir L1→L10**  
**Code Maker Club · Cube Crafter**

> Continui același proiect.  
> Azi: **condiție clară de victorie** — jocul are scop, nu doar sandbox.

---

## Obiectiv
**Minim:** misiune scrisă pe scenă · condiție verificabilă · ecran / mesaj **Ai câștigat!** · poți pierde în continuare (HP) · colegul înțelege scopul fără tine.  
**Complet:** Minim + misiune care cere **craft** **sau** **2 zone** **sau** învinge creatura cu item craftat.

## De ce contează
Sandbox fără obiectiv = „mă plimb”.  
Misiunea transformă lumea într-un **joc** pe care îl prezinți la L10.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Exemple misiune pe foaie |
| 15–30 | Alegi **o** misiune pe foaie (nu 5) |
| 30–100 | Implementezi + testezi |
| 100–120 | Coleg încearcă să câștige |

**Exemple misiune (alege una):**  
- Construiește o casă: ≥8 blocuri puse + 1 târnăcop craftat  
- Învinge creatura cu sabie craftată  
- Adună 15 lemn **și** vizitează ambele zone  
- Craftă târnăcop și sparge 5 piatră „grea”

---

## Pas cu pas

### 1) Misiunea *(5 minute, pe foaie și pe scenă)*
O frază care se poate verifica, de exemplu:  
**„Construiește un adăpost din 8 blocuri.”**  
sau, mai greu: **„Fă un târnăcop și construiește 8 blocuri.”**

1. Variabila `misiune` *(text)*, mare, bifată pe scenă; pe steag `setează misiune la Construiește 8 blocuri`  
2. Variabila `puse` *(câte blocuri ai pus)*; pe steag `setează puse la 0`  
3. În scriptul de pus *(L3)*, după ce apare blocul: `schimbă puse cu 1`

**Verifici:** misiunea se vede pe ecran, iar `puse` crește cu 1 la fiecare bloc pus.

### 2) Condiția de victorie *(Minim · 30 minute)*
La Scenă *(sau la Erou)*, `repetă la nesfârșit`:
- `dacă <puse > 7>` **atunci**:  
  1. `trimite win`  
  2. `oprește acest script`

Un sprite `Final`, ascuns la steag, cu costumul **Ai câștigat!**: `când primesc win` → `arată` · `treci în față` · `oprește tot` *(după o secundă)*.

**Verifici (de fiecare dată):**  
- La steag: `puse = 0` și nu apare „Ai câștigat!”.  
- Pui 7 blocuri: nimic încă.  
- Pui al 8-lea: apare „Ai câștigat!” și jocul se oprește.  
- Poți pierde în continuare *(HP din L6)*.

### 3) Complet *(alege cel puțin una)*
Condiția folosește regula altui pas:
- [ ] **Craft:** `dacă <<puse > 7> și <tarnacop > 0>>`  
- [ ] **Două zone:** variabila `pus_padure` / `pus_desert`; câștigi cu cel puțin 4 în fiecare  
- [ ] **Creatura:** câștigi dacă ai sabie și creatura e eliminată *(variabila `creatura_invinsa`, pentru toate: 0 la steag; la `Creatură`, în `când primesc creatura_lovita`, o setezi pe `1`; condiția: `sabie > 0` și `creatura_invinsa = 1`)*

### 4) Test cu un coleg *(5 minute)*
Colegul citește misiunea de pe ecran și o îndeplinește **fără ajutor**.


---

## Greșeli frecvente
1. **Câștigi la steag** — `puse` nu e pus pe 0 la start, sau condiția e deja adevărată.  
2. **`puse` nu crește** — `schimbă puse cu 1` e în afara scriptului de pus.  
3. **Mesajul apare în fiecare cadru** — lipsește `oprește acest script` după `trimite win`.  
4. **Misiunea e doar în cap** — trebuie scrisă pe ecran.  
5. **Nu poți pierde** — verifică că `vieti` din L6 funcționează tot.  
6. **Condiție imposibilă** — cere mai mult decât poate construi/minea un jucător într-o sesiune.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 1 misiune pe scenă · victorie clară · test coleg |
| **Complet** | Minim + craft/zone/creatură în condiție |

---

## Bonus
- [ ] Ending alternativ (victorie secretă)  
- [ ] Scor de timp până la victorie  

## Recapitulare rapidă
1. O misiune, clară, pe ecran  
2. Victorie = eveniment, nu „spune bravo” oricând  
3. L9 = meniu + instrucțiuni pe același joc

## Schema pe scurt

**Victorie**  
`dacă` (ex. `puse > 7` și `tarnacop > 0`) → „Ai câștigat!” → oprește  

**Quiz scurt:**  
- Care e misiunea ta într-o frază?  
- Cum verifică jocul?  
- Ce lipsește pentru un jucător nou? (indiciu: meniul de la L9)

## Temă
3 note pentru meniu/instrucțiuni. Urmează L9.
