# Lecția 7 — Crafting simplu (2→1)
**Modulul 6 · Lume de cuburi · Block 3 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui același proiect.  
> Azi: **rețetă 2→1** — consumi resurse, primești un item craftat (târnăcop / ușă / sabie…).

---

## Obiectiv
**Minimum:** meniu/buton craft · ≥**1** rețetă clară (ex. lemn ≥2 → −2 lemn · +1 `usa` sau `tarnacop`) · UI arată itemul craftat · nu craftezi dacă lipsesc resurse.  
**Complet:** Minim + **2** rețete **sau** item craftat folosit în joc (spargi mai tare / ușă pe casă / lovitură mob).

## De ce contează
Crafting-ul e „magia” lumii de cuburi: transformi farm-ul în putere.  
Leagă inventarul (L4) de misiune (L8).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Rețetă pe tablă: 2 lemn → 1 ușă |
| 12–25 | Pe foaie: 1–2 rețete + ce face itemul |
| 25–100 | Buton craft + logică + (Complet) folosire |
| 100–120 | Test coleg: craft fără ajutor |

---

## Pas cu pas

### 1) Rețeta pe foaie
Exemplu Minim:  
`dacă lemn ≥ 2` → `schimbă lemn cu -2` → `schimbă usa cu 1` (sau listă / flag `are_usa`)

**Încearcă tu (5 min)**  
- [ ] Rețeta scrisă cu numere  

### 2) Buton craft *(Minim)*
1. Sprite „Craft” / masă de lucru  
2. La click: verifică resurse → consumă → dă item  
3. Altfel: „Îți trebuie 2 lemn!”  
4. Variabilă / icon pe scenă pentru itemul craftat  

**Încearcă tu (25 min)**  
- [ ] Cu 1 lemn: nu merge  
- [ ] Cu 2+: merge o dată, inventarul scade  

### 3) Complet — itemul contează în joc
Alege **cel puțin una**:  
- [ ] A 2-a rețetă (ex. 3 piatră → sabie)  
- [ ] Ușa se **pune** pe casă  
- [ ] Sabie / târnăcop: spargi fără rază mai mare **sau** mobul moare din 1–2 lovituri  

---

## Greșeli frecvente
1. **Craft infinit** — nu scazi resursele.  
2. **Item invizibil** — trebuie pe UI.  
3. **Rețetă doar pe foaie** — Minim = buton pe scenă.  
4. **Craft care nu schimbă jocul** — Complet cere folosire.  
5. **Uiți reset** — steagul resetează și itemele craftate (sau le documentezi).

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 1 rețetă 2→1 · buton · UI · blocat fără resurse |
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
click Craft → `dacă lemn ≥ 2` → lemn −2 · usa +1 · altfel mesaj  

**Quiz scurt:**  
- Ce se întâmplă la 1 lemn?  
- Unde vezi itemul craftat?  
- Ce misiune ai putea pune la L8?

## Temă
Leagă itemul de o acțiune scurtă. Urmează L8 = **misiune**.
