# Lecția 8 — Mesaje între personaje
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi un personaj **anunță**, altul **reacționează** — fără să se atingă neapărat.  
> Proiect: **„Alarma”** · fișier: `Prenume_Nume_L8` (ex. `Ana_Pop_L8`)

---

## Obiectiv
La finalul orei folosești <span style="color:#E6A800;font-weight:700">trimite mesajul …</span> și <span style="color:#E6A800;font-weight:700">când primesc mesajul …</span> (*broadcast*) ca două personaje să coopereze (alarmă / liniște).  
**Minimum:** testul **buton → erou** (mecanismul de bază funcțional).  
**Ținta orei (Complet):** scenariul **Senzor → Sirenă → Liniște**, fără spam de alarmă.

## De ce contează
Ca în clasă: cineva strigă „Pauză!”, toți reacționează.  
În Scratch: mesaj = semnal. (EN: *broadcast*)

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap stop (L7) + de ce „strigăm” între sprite-uri |
| 10–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Alarma” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Perechea de blocuri
Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:
1. <span style="color:#E6A800;font-weight:700">trimite</span> `alarma`  
2. <span style="color:#E6A800;font-weight:700">când primesc</span> `alarma` → faci ceva  

Creezi mesajul din meniul dropdown → **mesaj nou…**

*Important:* de fiecare dată când cineva **trimite** mesajul, Scratch **pornește din nou** scriptul `când primesc` pe cei care ascultă — chiar dacă unul rulează deja.  
Dacă trimiți `alarma` de 10 ori rapid, Sirena poate avea **mai multe** instanțe odată (sunet / costum / `spune` se calcă). De aceea prevenim spam-ul la pasul 3.

**Încearcă tu — perechea (1–2 min)**  
- [ ] Ai creat un mesaj cu nume clar (ex. `salut` sau `alarma`)  
- [ ] Vezi ambele blocuri: `trimite` și `când primesc`  

### 2) Test minim (buton → erou) *(nucleul Minim)*
1. Personaj **Buton**:  
   <span style="color:#E6A800;font-weight:700">când se dă clic pe acest personaj</span> →  
   <span style="color:#E6A800;font-weight:700">trimite</span> `salut`  
2. Personaj **Erou**:  
   <span style="color:#E6A800;font-weight:700">când primesc</span> `salut` →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Hei!` pentru `2` secunde  
3. Click pe buton — eroul reacționează **fără** să îl atingi

**Încearcă tu — testul minim (2–3 min)**  
- [ ] Un personaj **trimite**, altul **primește**  
- [ ] Click pe buton → eroul spune `Hei!` (fără atingere)  
- [ ] Numele mesajului e **identic** la trimite și la primesc  
- [ ] Salvat: `Prenume_Nume_L8`  

### 3) Alarma completă — fără spam *(Complet)*
**Roluri:** Senzor · Sirenă · Buton **Liniște**

**A) Variabilă „am trimis deja”** (recomandat — ca L6/L7: nu lăsăm forever-ul să spam-uiască):  
1. Creezi variabila `alarma_activa` (**pentru toți**), pe scenă opțional  
2. La steag (pe Senzor sau pe Scenă): <span style="color:#FF8C1A;font-weight:700">setează alarma_activa la</span> `0`  
3. Pe **Senzor**, în `forever`:  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge</span> (culoare / personaj periculos)  
   **atunci:**  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#59C059;font-weight:700">alarma_activa = 0</span>  
   **atunci:**  
   <span style="color:#FF8C1A;font-weight:700">setează alarma_activa la</span> `1` →  
   <span style="color:#E6A800;font-weight:700">trimite</span> `alarma`  
4. Pe **Buton Liniște**: click →  
   <span style="color:#E6A800;font-weight:700">trimite</span> `liniste` →  
   <span style="color:#FF8C1A;font-weight:700">setează alarma_activa la</span> `0`  
5. **De ce:** dacă Senzorul stă tot pe pericol după Liniște, **nu** retrimite până când `alarma_activa` e din nou 0 **și** (dacă vrei) ieși din zonă și reintri — altfel, fără variabilă, Liniște → sirena se stinge → **imediat** Senzorul retrimite `alarma` și se reaprinde.

*Variantă mai scurtă (dacă rămâi în urmă pe variabile):*  
`forever` → `dacă atinge pericol` → `trimite alarma` → <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1`  
*(înceționează spam-ul, dar **nu** rezolvă singur „Liniște apoi reaprinde” — mai bine variabila.)*

**B) Sirena**  
1. `când primesc` `alarma` → sunet + `spune` `Atenție!` + costum „alertă”  
2. `când primesc` `liniste` → `oprește toate sunetele` + costum normal  

**Încearcă tu — alarma completă (4–5 min)**  
- [ ] Pericol → o **singură** alarmă (nu 30/sec)  
- [ ] Liniște → sunet/costum normal; **nu** se reaprinde imediat dacă încă ești pe pericol  
- [ ] Click din nou pe pericol (după ce `alarma_activa` e 0) → poate alarma din nou  
- [ ] Știi: fiecare `trimite` poate porni un script `când primesc` **nou**  

### 4) Steagul (reset)
1. Steag pe toți:  
   poziții / costume normale →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span> →  
   <span style="color:#9966FF;font-weight:700">anulează efectele grafice</span> →  
   <span style="color:#FF8C1A;font-weight:700">setează alarma_activa la</span> `0`  
2. **Nu** trimite `alarma` pe steag din greșeală

**Încearcă tu — reset (1–2 min)**  
- [ ] Steag → totul curat (fără sirenă, `alarma_activa` = 0)  
- [ ] Salvat din nou  

---

## Greșeli frecvente
1. **Nume diferite** — `Alarma` vs `alarma` / `alarmă` — trebuie același mesaj din listă.  
2. **Script pe personajul greșit** — `când primesc` e pe sirenă, `trimite` pe senzor.  
3. **Spam alarma** — atingerea e continuă; folosește tiparul `alarma_activa` (pasul 3), nu doar „așteaptă undeva”.  
4. **Liniște → se reaprinde** — ai resetat sunetul, dar Senzorul e tot pe pericol și trimite din nou; setează `alarma_activa` la 0 **doar** la Liniște/steag, și trimite **doar** când e 0.  
5. **Sirenă dublă / haotică** — ai trimis `alarma` de multe ori; fiecare `când primesc` pornește o instanță nouă.  
6. **Ai folosit doar `spune` pe același personaj** — azi vrem **două** personaje legate prin mesaj.  
7. **Nume fișier** — `Prenume_Nume_L8`, nu doar `Ana_L8`.

---

## De făcut azi — „Alarma”
Salvat: `Prenume_Nume_L8`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Testul **buton → erou** (`trimite` / `când primesc`) funcțional |
| **Complet (ținta orei)** | Minim + **Senzor → Sirenă → Liniște** + anti-spam (`alarma_activa`) + reset la steag |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Roluri
- [ ] (Minim) Buton + Erou  
- [ ] (Complet) Senzor + Sirenă + Buton „Liniște”  

### Pasul 2 — Mesajul de bază *(Minim)*
*(Ca la „Încearcă tu — testul minim”.)*

- [ ] Click buton → eroul reacționează fără atingere  
- [ ] Salvat: `Prenume_Nume_L8`  

**→ Minim când:** lanțul trimite/primește e clar pe 2 personaje.

### Pasul 3 — Alarma + Liniște *(Complet)*
*(Ca la „Încearcă tu — alarma completă”.)*

- [ ] Atingere pericol → trimite `alarma` (**o dată**, cu `alarma_activa`)  
- [ ] Sirena primește → sunet + mesaj / costum  
- [ ] Liniște → oprește alarma + `alarma_activa = 0`  
- [ ] Steag = totul curat  
- [ ] Un coleg vede: pericol → alarmă → liniște  
- [ ] Salvat din nou  

**Gata Complet când:** semnalul e clar între personaje, fără spam și fără reaprindere imediată.

---

## Bonus (dacă ai terminat Complet)
- [ ] Lanț **3** mesaje (A → B → C)  
- [ ] Mesaj `scena2` → schimbă fundalul  
- [ ] Buton „Start joc” trimite mesaj; steagul **doar** resetează  
- [ ] Variantă: după `trimite alarma`, pe Senzor `stop this script` — repornești cu steagul (mai rigid decât `alarma_activa`)  

## Recapitulare rapidă
1. Trimite / când primesc = același nume  
2. Fiecare `trimite` poate porni un script `când primesc` **nou**  
3. Anti-spam: `alarma_activa` (trimite doar dacă e 0)  
4. Liniște resetează flag-ul — altfel alarma se reaprinde pe pericol  
5. Nume: **`Prenume_Nume_L8`**  

**Quiz scurt (cu profesorul):**  
- Ce e un mesaj (*broadcast*)?  
- De ce nu e suficient un singur personaj azi?  
- De ce, după Liniște, fără `alarma_activa`, sirena se poate reaprinde?

## Temă
Opțional: al 3-lea personaj care reacționează la `alarma` — `Prenume_Nume_L8`.
