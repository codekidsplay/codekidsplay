# Lecția 7 — Forever și stop
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi ții jocul **aprins** cu `forever` și îl **oprești** când trebuie (victorie / buton).  
> Proiect: **„Bucla de joc curată”** · fișier: `Prenume_L7` (ex. `Ana_L7`)

---

## Obiectiv
La finalul orei știi diferența <span style="color:#FFAB19;font-weight:700">repetă N</span> vs <span style="color:#FFAB19;font-weight:700">forever</span>, folosești <span style="color:#FFAB19;font-weight:700">stop all</span> / <span style="color:#FFAB19;font-weight:700">stop this script</span>, și un joc mic se oprește la victorie, apoi repornește curat la steag.

## De ce contează
`repetă 10` se termină singur (M1). Jocurile rămân aprinse până câștigi — asta e `forever` + `stop`.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap operatori + „când se oprește jocul?” |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Mini-proiect buclă curată |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Repetă vs forever
| Bloc | Se oprește? |
|------|-------------|
| <span style="color:#FFAB19;font-weight:700">repetă</span> `10` | da, după 10 ori |
| <span style="color:#FFAB19;font-weight:700">forever</span> | nu, până la **stop** sau steag nou |

### 2) Stop
Din <span style="color:#FFAB19;font-weight:700">Control</span>:
- <span style="color:#FFAB19;font-weight:700">stop all</span> — oprește **tot** pe scenă  
- <span style="color:#FFAB19;font-weight:700">stop this script</span> — oprește doar scriptul curent  

### 3) Un forever principal
1. Steag → reset scor / poziții  
2. **Un** `forever` pentru control (taste)  
3. Nu lipi 5 `forever` care se calcă fără motiv  
4. Victorie: `dacă scor = 5` → `spune` `Gata!` → `stop all`

### 4) Buton stop pe scenă
1. Personaj „STOP”  
2. `când se face clic pe acest personaj` → `stop all`  
3. Steagul = singurul „play” curat

---

## Încearcă tu — verifică înainte să continui

- [ ] Ai un joc care rulează în `forever`  
- [ ] La victorie **sau** click pe STOP → se oprește  
- [ ] Steag nou → scor 0 + poziții ok  
- [ ] Știi să explici `repetă` vs `forever`  

---

## Greșeli frecvente
1. **După stop, steagul nu mai face nimic** — ai lăsat scripturi pe „când primesc” blocate; verifică resetul.  
2. **5 forever** — mișcarea e dublă / haotică; păstrează unul pentru control.  
3. **`stop this script` pe steag** — oprește doar acel script; controlul poate rula mai departe — pentru victorie e mai clar `stop all`.  
4. **Victorie spam** — `dacă scor = 5` în forever fără stop: mesajul se tot repetă; pune `stop all` imediat.

---

## De făcut azi — „Bucla de joc curată”
Salvat: `Prenume_L7`

### Pasul 1 — Jocul
- [ ] Control taste + scor (poți refolosi ideea din L5)  
- [ ] Un `forever` principal  

### Pasul 2 — Oprire
- [ ] Victorie (`scor = țintă`) → mesaj + `stop all`  
- [ ] Buton pe scenă → `stop all`  

### Pasul 3 — Restart
- [ ] Steag: scor 0, poziții, personaje vizibile  
- [ ] Demonstrezi: joacă → câștigă → steag → joacă din nou  

**Gata când:** start / stop / restart sunt clare fără explicații.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] La victorie: `stop this script` pe control, nu `stop all` (alte scripturi pot rula fanfară)  
- [ ] Timer: variabilă `timp` care crește în forever până la stop  
- [ ] Pauză: variabilă `pauza` — dacă e 1, nu te miști  

## Recapitulare rapidă
1. `forever` = aprins · `stop` = stins  
2. Steag = reset + play  
3. Un forever de control e destul  

**Quiz scurt (cu profesorul):**  
- Când folosești `repetă` și când `forever`?  
- Ce face `stop all`?

## Temă
Opțional: buton „Reîncepe” (click → scor 0 + du la start) **fără** `stop all` — `Prenume_L7`.
