# Lecția 6 — Operatori
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi **compari** și **calculezi** numere: mai mare, egal, plus, minus — în `dacă`.  
> Proiect: **„Ținta de scor”** · fișier: `Prenume_Nume_L6` (ex. `Ana_Pop_L6`)

---

## Obiectiv
La finalul orei folosești blocurile din <span style="color:#59C059;font-weight:700">Operatori</span> (`+`, `−`, `<`, `=`, `>`) împreună cu `scor` ca să afișezi mesaje diferite față de o **țintă**.  
**Minimum:** o **comparație** (scor vs țintă) cu mesaje diferite + reset la steag — pe butonul **Verifică**.  
**Ținta orei (Complet):** Minim + un **calcul** (`+` sau `−`) + pattern-ul Verifică curat (demo pierdere **și** victorie).

## De ce contează
„Ai 5 stele?” e o **comparație**. „Scor + 2” e un **calcul**.  
Fără operatori, variabilele doar stau pe ecran — nu decid.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap variabile (L5) + de ce ne trebuie verdele |
| 10–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Ținta de scor” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Familia de operatori (azi)
Din <span style="color:#59C059;font-weight:700">Operatori</span>:

| Bloc | Rol |
|------|-----|
| <span style="color:#59C059;font-weight:700">a + b</span> | adună |
| <span style="color:#59C059;font-weight:700">a − b</span> | scade |
| <span style="color:#59C059;font-weight:700">a < b</span> | e mai mic? |
| <span style="color:#59C059;font-weight:700">a = b</span> | e egal? *(îl știi din preview L5)* |
| <span style="color:#59C059;font-weight:700">a > b</span> | e mai mare? |

Comparațiile (`< = >`) sunt **hexagoane** → intră în `dacă`.  
`+` / `−` sunt **rotunjite** → intră în `setează` / `modifică` / `spune`.

### 2) Setup: scor + reset + cum crești scorul
1. Variabilă `scor` pe scenă (**pentru toți**) — din L5 sau creezi din nou  
2. **Chiar sub** steag (pe erou):  
   <span style="color:#FF8C1A;font-weight:700">setează scor la</span> `0` →  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> start →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span> →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>
3. Mod de a crește scorul (ca L5: stele, sau click pe un „Bonus”)  
4. Ținta aleasă (ex. **8**) — pe o foaie sau pe un personaj `Ținta: 8`

**Încearcă tu — setup (2 min)**  
- [ ] `scor` e vizibil pe scenă  
- [ ] Steag → scor 0 + reset complet (loc / efecte / sunete)  
- [ ] Poți crește scorul măcar o dată  

### 3) Comparație — **doar** pe butonul „Verifică”
*(Nu verifica în `forever` în fiecare clipă — altfel, cât timp scorul e sub țintă, vezi mereu „Mai încearcă”. Azi: **un click = o verificare**.)*

1. Adaugi un personaj = buton **Verifică**  
2. Pe **Verifică**:  
   <span style="color:#E6A800;font-weight:700">când se dă clic pe acest personaj</span> →  
   <span style="color:#FFAB19;font-weight:700">dacă … atunci … altfel</span>  
   - hexagon: <span style="color:#59C059;font-weight:700">(scor) > (7)</span> *(ținta 8 = „mai mare decât 7”)*  
   - **atunci:** <span style="color:#9966FF;font-weight:700">spune</span> `Bravo! Ținta!` pentru `2` secunde → sunet  
   - **altfel:** <span style="color:#9966FF;font-weight:700">spune</span> `Mai încearcă` pentru `2` secunde  
3. Test: scor mic → click Verifică → „Mai încearcă”; scor ≥ 8 → „Bravo!”

*Alternativă egală:* hexagon `scor = 8` la atunci, și altfel = sub țintă — tot pe click Verifică.

**Încearcă tu — comparație / Verifică (3–4 min)**  
- [ ] Butonul Verifică are `dacă … altfel` cu `scor > 7` (sau `= 8`)  
- [ ] Demonstrezi **ambele** drumuri (sub țintă **și** la țintă)  
- [ ] **Nu** ai pus această verificare într-un `forever` pe erou  
- [ ] Salvat: `Prenume_Nume_L6`  

### 4) Calcule (`+` / `−`)
1. Pe un personaj „Bonus” (sau la o stea specială), la click / atingere:  
   <span style="color:#FF8C1A;font-weight:700">setează scor la</span> <span style="color:#59C059;font-weight:700">(scor) + (2)</span>  
   *(sau `modifică scorul cu 2` — același efect; azi exersăm și blocul `+`)*  
2. Opțional, mesaj cu scorul în text:  
   <span style="color:#9966FF;font-weight:700">spune</span> <span style="color:#59C059;font-weight:700">alătură</span> `Ai ` și ovalul <span style="color:#FF8C1A;font-weight:700">scor</span>  
   *(blocul `alătură` e tot în Operatori — combină text + număr într-un singur mesaj)*  
3. Poți avea și un „Penalty”: `setează scor la` `(scor) − (1)` (nu sub 0, dacă vrei)

**Încearcă tu — calcul (2–3 min)**  
- [ ] Ai folosit o dată `+` sau `−` cu scorul (nu doar `modifică cu 1` din L5)  
- [ ] După calcul, click pe Verifică → mesajul se potrivește cu noul scor  
- [ ] (Opțional) `alătură` arată scorul în mesaj  

---

## Greșeli frecvente
1. **Ai pus `5 = scor` greșit în afara hexagonului** — tot lanțul verde stă **în** `dacă`.  
2. **`modifică cu (scor + 1)` dublu** — fie `modifică cu 1`, fie `setează la scor+1`, nu ambele.  
3. **Mereu „Mai încearcă”** — ai pus `dacă/altfel` în `forever`; mută-l pe **click Verifică**.  
4. **Ținta 8 cu `scor > 8`** — atunci 8 nu câștigă; folosește `scor > 7` sau `scor = 8`.  
5. **Nume fișier** — `Prenume_Nume_L6`, nu doar `Ana_L6`.

---

## De făcut azi — „Ținta de scor”
Salvat: `Prenume_Nume_L6`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Scor + reset complet + **o comparație** pe butonul **Verifică** (`dacă/altfel`) cu mesaje diferite |
| **Complet (ținta orei)** | Minim + un **calcul** (`+` sau `−`) + demonstrezi pierdere **și** victorie pe Verifică |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Joc mic + reset
- [ ] Scor pe scenă  
- [ ] Steag: scor 0 + loc + efecte + sunete  
- [ ] Mod de a crește scorul (stele / click / atingere)  
- [ ] Țintă aleasă (ex. **8**) — pe foaie sau pe personaj  

### Pasul 2 — Comparație pe Verifică *(Minim)*
*(Ca la „Încearcă tu — comparație / Verifică”.)*

- [ ] Buton **Verifică** cu `dacă … altfel` pe `scor` vs țintă  
- [ ] Mesaj **diferit** sub țintă vs la / peste țintă  
- [ ] Salvat: `Prenume_Nume_L6`  

**→ Minim când:** un click pe Verifică arată mesajul potrivit scorului actual.

### Pasul 3 — Calcul + demo *(Complet)*
*(Ca la „Încearcă tu — calcul”.)*

- [ ] Cel puțin un calcul: `+` sau `−` (ex. bonus +2)  
- [ ] Demonstrezi **pierdere** (sub țintă) și **victorie**  
- [ ] Un coleg schimbă ținta la 10 și încă funcționează (ajustezi hexagonul)  
- [ ] Salvat din nou  

**Gata Complet când:** scorul **decide** mesajul la click Verifică, nu tu cu vocea.

---

## Bonus (dacă ai terminat Complet)
- [ ] Victorie doar dacă `scor > 7` **și** `vieti > 0` (blocul <span style="color:#59C059;font-weight:700">… și …</span>)  
- [ ] Dacă `x > 100` → bonus +2 la scor  
- [ ] Mesaj cu <span style="color:#59C059;font-weight:700">alătură</span> `Ai ` + `scor` (dacă n-ai făcut la pasul 4)  
- [ ] Afișezi `scor` „dublat” cu `scor × 2` (blocul `×` din Operatori)  

## Recapitulare rapidă
1. Comparațiile = hexagoane pentru `dacă`  
2. `+` / `−` = calcule în `setează`  
3. Verifici **la click pe Verifică**, nu în `forever`  
4. Ținta trebuie să se potrivească cu `=` / `>`  
5. Nume: **`Prenume_Nume_L6`**  

**Quiz scurt (cu profesorul):**  
- Ce tip de bloc intră în hexagonul lui `dacă`?  
- De ce `scor > 7` pentru ținta 8?  
- De ce nu punem „Mai încearcă” într-un `forever`?

## Temă
Opțional: schimbă ținta la 10 — același fișier `Prenume_Nume_L6`.
