# Lecția 6 — Operatori
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi **compari** și **calculezi** numere: mai mare, egal, plus, minus — în `dacă`.  
> Proiect: **„Ținta de scor”** · fișier: `Prenume_L6` (ex. `Ana_L6`)

---

## Obiectiv
La finalul orei folosești blocurile din <span style="color:#59C059;font-weight:700">Operatori</span> (`+`, `−`, `<`, `=`, `>`) împreună cu `scor` / `vieti` ca să afișezi mesaje diferite sub / peste o **țintă**.

## De ce contează
„Ai 5 stele?” e o **comparație**. „Scor + 2” e un **calcul**.  
Fără operatori, variabilele doar stau pe ecran — nu decid.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap variabile + de ce ne trebuie verdele |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Ținta de scor” |
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
| <span style="color:#59C059;font-weight:700">a = b</span> | e egal? |
| <span style="color:#59C059;font-weight:700">a > b</span> | e mai mare? |

Comparațiile (`< = >`) sunt **hexagoane** → intră în `dacă`.  
`+` / `−` sunt **rotunjite** → intră în `setează` / `modifică` / `spune`.

### 2) Pui operatorul în „dacă”
1. Ai deja `scor` (din L5 sau creezi din nou)  
2. <span style="color:#FFAB19;font-weight:700">dacă</span> → hexagon: trage <span style="color:#59C059;font-weight:700">( ) = ( )</span>  
3. În stânga: ovalul <span style="color:#FF8C1A;font-weight:700">scor</span> · în dreapta: `5`  
4. Atunci: sunet de victorie / `spune` `Ținta!`

### 3) Calcule
1. La click pe un bonus:  
   <span style="color:#FF8C1A;font-weight:700">setează scor la</span> <span style="color:#59C059;font-weight:700">(scor) + (2)</span>  
   *(sau `modifică cu 2` — același efect; azi exersăm și `+`)*  
2. Mesaj: `spune` <span style="color:#59C059;font-weight:700">alătură</span> `Ai ` și `scor` — opțional dacă găsiți blocul; altfel `spune` text fix e ok

### 4) Sub țintă / peste țintă
Alegi ținta `8` (sau `10`):

1. Dacă `scor > 7` (adică ≥ 8) → `Bravo!`  
2. Dacă `scor < 8` → `Mai încearcă`  
3. Nu pune ambele fără grijă în același frame — folosește `dacă/altfel`:  
   - hexagon: `scor > 7`  
   - atunci: victorie  
   - altfel: „Mai încearcă” *(doar când verifici la final / la click pe „Verifică”)*

*Pattern curat:* buton personaj „Verifică” → click → `dacă/altfel` pe scor vs țintă.

---

## Încearcă tu — verifică înainte să continui

- [ ] Ai un `dacă` cu `scor = …` sau `scor > …`  
- [ ] Ai folosit o dată `+` sau `−` cu scorul  
- [ ] Mesajele „sub țintă” și „țintă atinsă” sunt **diferite**  
- [ ] La steag: scor 0  

---

## Greșeli frecvente
1. **Ai pus `5 = scor` greșit în afara hexagonului** — tot lanțul verde stă **în** `dacă`.  
2. **`modifică cu (scor + 1)` dublu** — fie `modifică cu 1`, fie `setează la scor+1`, nu ambele.  
3. **Mereu „Mai încearcă”** — verifici în `forever` în fiecare clipă; mai bine la **click pe Verifică** sau doar la `scor = țintă` pentru victorie.  
4. **Ținta 8 cu `scor > 8`** — atunci 8 nu câștigă; folosește `scor > 7` sau `scor = 8`.

---

## De făcut azi — „Ținta de scor”
Salvat: `Prenume_L6`

### Pasul 1 — Joc mic
- [ ] Scor pe scenă + steag resetează  
- [ ] Mod de a crește scorul (stele / click / atingere)  
- [ ] Țintă aleasă (ex. **8**) — scrisă pe o foaie sau pe un personaj `Ținta: 8`  

### Pasul 2 — Operatori
- [ ] Cel puțin o comparație: `=` sau `>` sau `<`  
- [ ] Cel puțin un calcul: `+` sau `−`  
- [ ] Mesaj diferit sub țintă vs la țintă  

### Pasul 3 — Gata
- [ ] Demonstrezi pierdere (sub țintă) și victorie  
- [ ] Un coleg schimbă ținta la 10 și încă funcționează  

**Gata când:** scorul **decide** mesajul, nu tu cu vocea.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] Victorie doar dacă `scor > 7` **și** `vieti > 0` (blocul <span style="color:#59C059;font-weight:700">… și …</span>)  
- [ ] Dacă `x > 100` → bonus +2 la scor  
- [ ] La final: afișezi `scor` „dublat” cu `scor * 2` (dacă găsiți `×`)  

## Recapitulare rapidă
1. Comparațiile = hexagoane pentru `dacă`  
2. `+` / `−` = calcule în `setează`  
3. Ținta trebuie să se potrivească cu `=` / `>`  

**Quiz scurt (cu profesorul):**  
- Ce tip de bloc intră în hexagonul lui `dacă`?  
- De ce `scor > 7` pentru ținta 8?

## Temă
Opțional: schimbă ținta la 10 — același fișier `Prenume_L6`.
