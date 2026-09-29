# Lecția 8 — Misiune / obiectiv de victorie
**Modulul 6 · Lume de cuburi · Block 3 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui același proiect.  
> Azi: **condiție clară de victorie** — jocul are scop, nu doar sandbox.

---

## Obiectiv
**Minimum:** misiune scrisă pe scenă · condiție verificabilă · ecran / mesaj **Ai câștigat!** · poți pierde în continuare (HP) · colegul înțelege scopul fără tine.  
**Complet:** Minim + misiune care cere **craft** **sau** **2 zone** **sau** învinge creatura cu item craftat.

## De ce contează
Sandbox fără obiectiv = „mă plimb”.  
Misiunea transformă lumea într-un **joc** pe care îl prezinți la L10.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Exemple misiune pe tablă |
| 15–30 | Alegi **o** misiune pe foaie (nu 5) |
| 30–100 | Implementezi + testezi |
| 100–120 | Coleg încearcă să câștige |

**Exemple misiune (alege una):**  
- Construiește casă: ≥10 piatră puse + 1 ușă craftată  
- Învinge creatura cu sabie craftată  
- Adună 15 lemn **și** vizitează ambele zone  
- Craftă târnăcop și sparge 5 piatră „grea”

---

## Pas cu pas

### 1) Misiunea pe foaie + pe scenă
1. O frază: „Câștigi dacă …”  
2. Sprite / text pe scenă cu misiunea  
3. Variabile de progres dacă e nevoie (`blocuri_casa`, `creatua_invinsa`)

**Încearcă tu (8 min)**  
- [ ] Misiunea e pe ecran, nu doar în cap  

### 2) Condiție de victorie *(Minim)*
În `forever` pe Scenă (sau la eveniment):  
`dacă` condiție → mesaj Ai câștigat → `oprește alte scripturi` / flag `castigat`

**Încearcă tu (30 min)**  
- [ ] Poți atinge victoria pe bune  
- [ ] Nu câștigi accidental la steag  

### 3) Complet
Misiunea folosește **cel puțin una** din: craft · 2 zone · creatură învinsă cu item.

**Încearcă tu (20 min)**  
- [ ] Complet legat de mecanicile L5–L7  

---

## Greșeli frecvente
1. **Misiune vagă** („explorează”) — trebuie număr / obiect clar.  
2. **Victorie la start** — condiția e deja adevărată.  
3. **Doar pe foaie** — trebuie pe scenă.  
4. **După win jocul rulează haotic** — oprește scripturi / ecran final.  
5. **Prea multe misiuni** — azi **una**.

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
`dacă` (ex. `usa = 1` și `piatra_pusa ≥ 10`) → „Ai câștigat!” → oprește  

**Quiz scurt:**  
- Care e misiunea ta într-o frază?  
- Cum verifică jocul?  
- Ce lipsește pentru un jucător nou? (hint: L9 meniu)

## Temă
3 note pentru meniu/instrucțiuni. Urmează L9.
