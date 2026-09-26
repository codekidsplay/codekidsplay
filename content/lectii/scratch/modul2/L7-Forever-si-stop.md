# Lecția 7 — Forever și stop
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi ții jocul **aprins** cu `forever` și îl **oprești** când trebuie (victorie / buton).  
> Proiect: **„Bucla de joc curată”** · fișier: `Prenume_Nume_L7` (ex. `Ana_Pop_L7`)

---

## Obiectiv
La finalul orei știi diferența <span style="color:#FFAB19;font-weight:700">repetă N</span> vs <span style="color:#FFAB19;font-weight:700">forever</span>, folosești <span style="color:#FFAB19;font-weight:700">stop all</span> / <span style="color:#FFAB19;font-weight:700">stop this script</span>, și un joc mic se oprește la victorie, apoi repornește curat la steag.  
**Minimum:** un `forever` principal + victorie cu `stop all` + reset la steag.  
**Ținta orei (Complet):** Minim + buton **STOP** separat + demonstrație: joacă → câștigă → steag → joacă din nou.

## De ce contează
`repetă 10` se termină singur (M1). Jocurile rămân aprinse până câștigi — asta e `forever` + `stop`.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap operatori (L6) + „când se oprește jocul?” |
| 10–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Mini-proiect buclă curată (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Repetă vs forever
| Bloc | Se oprește? |
|------|-------------|
| <span style="color:#FFAB19;font-weight:700">repetă</span> `10` | da, după 10 ori |
| <span style="color:#FFAB19;font-weight:700">forever</span> | nu, până la **stop** sau steag nou |

**Încearcă tu — repetă vs forever (1–2 min)**  
- [ ] Poți spune cu vocea: când `repetă`, când `forever`  
- [ ] Știi: jocul de azi rămâne aprins → `forever`  

### 2) Stop — două variante
Din <span style="color:#FFAB19;font-weight:700">Control</span>:
- <span style="color:#FFAB19;font-weight:700">stop all</span> — oprește **tot** pe scenă  
- <span style="color:#FFAB19;font-weight:700">stop this script</span> — oprește doar scriptul curent  

**Încearcă tu — stop (1–2 min)**  
- [ ] Ai găsit ambele blocuri în Control  
- [ ] Știi: pentru victorie clară azi → `stop all`  

### 3) Un forever principal + victorie *(nucleul Minim)*
1. Steag → reset **complet**:  
   <span style="color:#FF8C1A;font-weight:700">setează scor la</span> `0` →  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> start →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span> →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>  
   (+ pe stele: `arată`, ca la L5)
2. **Un** `forever` pentru control (taste) — nu lipi 5 `forever` care se calcă  
3. Tot în acel forever (după taste):  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#59C059;font-weight:700">scor = 5</span>  
   **atunci:** <span style="color:#9966FF;font-weight:700">spune</span> `Gata!` pentru `1` secundă →  
   <span style="color:#FFAB19;font-weight:700">stop all</span>

*Legătură cu L6:* acolo verificam **doar la click pe Verifică**, ca să nu vezi „Mai încearcă” în buclă.  
Aici verificăm **continuu** în `forever`, dar fiindcă **`stop all` oprește totul imediat**, nu apare spam.  
**Regula de bază:** verificare continuă e ok **doar** când urmează un `stop` (sau ascunzi / oprești scriptul). Fără stop → la L6: click Verifică.

**Încearcă tu — victorie cu oprire (3–4 min)**  
- [ ] Un `forever` principal (control + verificare victorie)  
- [ ] La `scor = 5` → mesaj + `stop all` (jocul se oprește)  
- [ ] **Nu** rămâne mesajul care se tot repetă  
- [ ] Salvat: `Prenume_Nume_L7`  

### 4) Buton STOP + restart *(Complet)*
1. Personaj „STOP” pe scenă  
2. <span style="color:#E6A800;font-weight:700">când se dă clic pe acest personaj</span> →  
   <span style="color:#FFAB19;font-weight:700">stop all</span>  
3. Steagul = singurul „play” curat  
4. Test: joacă → câștigă (sau STOP) → steag → joacă din nou (scor 0, poziții ok)

**Încearcă tu — STOP + restart (2–3 min)**  
- [ ] Click pe STOP → totul se oprește  
- [ ] Steag nou → scor 0 + poziții + stele vizibile  
- [ ] Demonstrezi: joacă → câștigă → steag → joacă din nou  

---

## Greșeli frecvente
1. **După stop, steagul nu mai face nimic** — ai uitat resetul (scor / `arată` pe stele); verifică ce e sub steag.  
2. **5 forever** — mișcarea e dublă / haotică; păstrează unul pentru control.  
3. **`stop this script` pe steag** — oprește doar acel script; controlul poate rula mai departe — pentru victorie e mai clar `stop all`.  
4. **Victorie spam** — `dacă scor = 5` în forever **fără** `stop`: mesajul se tot repetă; pune `stop all` imediat.  
5. **„Dar la L6 ziceai să nu verific în forever…”** — vezi nota din pasul 3: fără stop = Verifică; cu `stop all` = ok.  
6. **Nume fișier** — `Prenume_Nume_L7`, nu doar `Ana_L7`.

---

## De făcut azi — „Bucla de joc curată”
Salvat: `Prenume_Nume_L7`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `forever` principal + victorie (`scor = țintă`) cu `stop all` + reset complet la steag |
| **Complet (ținta orei)** | Minim + buton **STOP** separat + demonstrație: joacă → câștigă → steag → joacă din nou |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Jocul *(parte din Minim)*
- [ ] Control taste + scor (poți refolosi ideea din L5)  
- [ ] Un `forever` principal  
- [ ] Steag: scor 0 + loc + efecte + sunete (+ stele `arată`)  

### Pasul 2 — Victorie cu oprire *(Minim)*
*(Ca la „Încearcă tu — victorie cu oprire”.)*

- [ ] Victorie (`scor = țintă`) → mesaj + `stop all`  
- [ ] Salvat: `Prenume_Nume_L7`  

**→ Minim când:** joci, câștigi, totul se oprește curat.

### Pasul 3 — STOP + restart *(Complet)*
*(Ca la „Încearcă tu — STOP + restart”.)*

- [ ] Buton pe scenă → `stop all`  
- [ ] Demonstrezi: joacă → câștigă → steag → joacă din nou  
- [ ] Salvat din nou  

**Gata Complet când:** start / stop / restart sunt clare fără explicații.

---

## Bonus (dacă ai terminat Complet)
- [ ] La victorie: `stop this script` pe control, **nu** `stop all` — ca alte scripturi să poată rula **muzica / animația de fanfară** după câștig  
- [ ] Timer: variabilă `timp` care crește în forever până la stop  
- [ ] Pauză: variabilă `pauza` — dacă e 1, nu te miști  

## Recapitulare rapidă
1. `forever` = aprins · `stop` = stins  
2. Steag = reset + play  
3. Un forever de control e destul  
4. Verificare în forever **doar** cu `stop` imediat (altfel = tiparul Verifică din L6)  
5. Nume: **`Prenume_Nume_L7`**  

**Quiz scurt (cu profesorul):**  
- Când folosești `repetă` și când `forever`?  
- Ce face `stop all`?  
- De ce e ok `scor = 5` în forever aici, dar nu „Mai încearcă” în forever la L6?

## Temă
Opțional: buton „Reîncepe” (click → scor 0 + du la start) **fără** `stop all` — `Prenume_Nume_L7`.
