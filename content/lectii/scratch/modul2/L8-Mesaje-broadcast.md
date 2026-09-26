# Lecția 8 — Mesaje între personaje
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi un personaj **anunță**, altul **reacționează** — fără să se atingă neapărat.  
> Proiect: **„Alarma”** · fișier: `Prenume_L8` (ex. `Ana_L8`)

---

## Obiectiv
La finalul orei folosești <span style="color:#E6A800;font-weight:700">trimite mesajul …</span> și <span style="color:#E6A800;font-weight:700">când primesc mesajul …</span> (*broadcast*) ca două personaje să coopereze (alarmă / liniște).

## De ce contează
Ca în clasă: cineva strigă „Pauză!”, toți reacționează.  
În Scratch: mesaj = semnal. (EN: *broadcast*)

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap stop + de ce „strigăm” între sprite-uri |
| 10–25 | Pas cu pas + **Încearcă tu** |
| 25–100 | Proiectul „Alarma” |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Perechea de blocuri
Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:
1. <span style="color:#E6A800;font-weight:700">trimite</span> `alarma`  
2. <span style="color:#E6A800;font-weight:700">când primesc</span> `alarma` → faci ceva  

Creezi mesajul din meniul dropdown → **mesaj nou…**

### 2) Test minim (buton → erou)
1. Personaj **Buton**: `când se face clic pe acest personaj` → `trimite` `salut`  
2. Personaj **Erou**: `când primesc` `salut` → `spune` `Hei!` pentru `2`  
3. Click pe buton — eroul reacționează **fără** să îl atingi

### 3) Alarma
1. **Senzor** (erou): în forever, dacă atinge culoare / personaj periculos → `trimite` `alarma`  
2. **Sirenă** (alt personaj): `când primesc` `alarma` → sunet + `spune` `Atenție!` + costum „alertă”  
3. **Buton Liniște**: click → `trimite` `liniste`  
4. Sirena: `când primesc` `liniste` → `oprește toate sunetele` + costum normal  

### 4) Steagul
1. Steag pe toți: reset poziții / costume / `oprește toate sunetele`  
2. Nu trimite `alarma` pe steag din greșeală

---

## Încearcă tu — verifică înainte să continui

- [ ] Ai creat un mesaj cu nume clar (`alarma`)  
- [ ] Un personaj **trimite**, altul **primește**  
- [ ] Click pe buton funcționează fără atingere  
- [ ] Numele mesajului e **identic** la trimite și la primesc  

---

## Greșeli frecvente
1. **Nume diferite** — `Alarma` vs `alarma` / `alarmă` — trebuie același mesaj din listă.  
2. **Script pe personajul greșit** — `când primesc` e pe sirenă, `trimite` pe senzor.  
3. **Spam alarma** — atingerea e continuă; `așteaptă` după `trimite`, sau trimite o singură dată.  
4. **Ai folosit doar `spune` pe același personaj** — azi vrem **două** personaje legate prin mesaj.

---

## De făcut azi — „Alarma”
Salvat: `Prenume_L8`

### Pasul 1 — Roluri
- [ ] Senzor (detectează)  
- [ ] Sirenă (reacționează)  
- [ ] Buton „Liniște” (opțional dar recomandat)  

### Pasul 2 — Mesaje
- [ ] Atingere pericol → trimite `alarma`  
- [ ] Sirena primește → sunet + mesaj  
- [ ] Liniște → oprește alarma / revine  

### Pasul 3 — Gata
- [ ] Un coleg vede lanțul: pericol → alarmă → liniște  
- [ ] Steag = totul curat  

**Gata când:** semnalul e clar între personaje, nu doar pe unul.

---

## Bonus (dacă ai terminat mai devreme)
- [ ] Lanț **3** mesaje (A → B → C)  
- [ ] Mesaj `scena2` → schimbă fundalul  
- [ ] Buton „Start joc” trimite mesaj; steagul **doar** resetează  

## Recapitulare rapidă
1. Trimite / când primesc = același nume  
2. Mesajul leagă personaje diferite  
3. Steag = reset, nu neapărat „start joc”  

**Quiz scurt (cu profesorul):**  
- Ce e un mesaj (*broadcast*)?  
- De ce nu e suficient un singur personaj azi?

## Temă
Opțional: al 3-lea personaj care reacționează la `alarma` — `Prenume_L8`.
