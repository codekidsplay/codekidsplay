# Lecția 9 — Proiect final: Obby-ul tău, gata de joc
**Modulul 4 · Game Creator**  
**Code Maker Club · Roblox Studio**

> Azi **închei jocul**. Nu mai adaugi lucruri noi: finalizezi, verifici și pregătești prezentarea. Echipele de jocuri fac exact asta înainte de lansare — se numește **feature freeze** („înghețarea funcțiilor").  
> Place: `Prenume_Nume_M4`, apoi copia `Prenume_Nume_FINAL` (ex. `Ana_Pop_FINAL`)

---

## Obiectiv
La finalul orei ai o **versiune finală jucabilă** a Obby-ului tău, verificată cap-coadă, salvată ca `_FINAL`, cu **fișa proiectului** completată.  
**Minimum:** jocul se joacă de la Spawn la Finish **fără erori**, folosește **un ModuleScript sau DataStore**, ai copia `_FINAL` și fișa proiectului.  
**Ținta orei (Complet):** Minim + **DataStore** + **NPC sau magazin** cu verificare pe server + un coleg îl joacă **fără ajutorul tău** + fișa completă + pregătești prezentarea (L10).

## De ce contează
Cel mai mare pericol la final: „încă o idee!" și strici ce merge. Azi **nu adaugi**, ci **finisezi**. Un joc mai mic, dar care funcționează, bate un joc mare și stricat.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + *feature freeze* |
| 10–25 | Lista finală de verificare (**Încearcă tu**) |
| 25–65 | Reparații și finisări (fără funcții noi) |
| 65–85 | Test cu un coleg, fără ajutor |
| 85–105 | Fișa proiectului + copia `_FINAL` |
| 105–120 | Pregătirea prezentării, salvare |

**Azi folosim:** lista din L7 · lista din L8 · **Save As** · fișa proiectului.

---

## Pas cu pas

### 1) Feature freeze
Regula de azi: **nicio funcție nouă**. Poți doar:
- repara bug-uri,
- îmbunătăți ce există (culori, mesaje, viteză),
- șterge ce nu merge.

Dacă ai o idee nouă, o scrii la **„Pentru versiunea 2"**, nu o faci azi.

**Încearcă tu — îngheață (5 min)**  
- [ ] Scrii pe hârtie **3 idei** pentru v2  
- [ ] Nu le faci azi

### 2) Lista finală de verificare
Parcurge jocul **de la capăt**, ca un jucător nou:

| Parte | Verifici |
|-------|----------|
| **Început** | Ai instrucțiuni clare? Spawn corect? |
| **Platforme** | Se poate trece? Nu e imposibil? |
| **Monede** | Dau puncte, apar o singură dată |
| **Checkpoint-uri** | Salvează etapa, te readuc corect |
| **Cădere** | Te trimite înapoi, `Caderi` crește |
| **Inamic / magazin** | Funcționează, serverul verifică |
| **Finish** | Recompensă o singură dată, mesaj |
| **Salvare** | Ieși și intri: datele sunt acolo |
| **UI** | Textele se văd, nu se suprapun |
| **Sunet/lumini** | Volum ≤ 0.5, fără clipiri rapide |
| **Output** | Fără linii roșii |

**Încearcă tu — verificarea (15 min)**  
- [ ] Ai bifat fiecare rând  
- [ ] Ai notat ce nu merge

### 3) Reparații și finisări
Pentru fiecare problemă notată:
1. **Cât de grav?** (Blocant / Important / Mic, ca la L6)  
2. Aplici **metoda din L7** (Reproduc → Citesc → Izolez → Repar → Retestez)  
3. Bifezi

**Ordinea:** întâi Blocant, apoi Important. Micile — doar dacă ai timp.

### 4) Testul cu un coleg
Fără să-l ajuți:
1. Dai colegului jocul (în Studio, pe calculatorul tău sau în echipa de test).  
2. **Nu vorbești.** Te uiți și notezi.  
3. Dacă se blochează > 30 secunde: notezi unde.

**Întrebări la final:**
- Ai înțeles ce ai de făcut?  
- Unde ai greșit?  
- Ce ți-a plăcut?

**Încearcă tu — test (15–20 min)**  
- [ ] Un coleg a jucat **fără ajutor**  
- [ ] Ai notat unde s-a blocat  
- [ ] Ai reparat ce era blocant

### 5) Fișa proiectului
Completează:

| Câmp | Răspuns |
|------|---------|
| **Numele jocului** | |
| **Ce face jucătorul** | (1–2 propoziții) |
| **Cum se câștigă** | |
| **Ce scripturi am scris** | (listă: Srv_…, Mod_…, Cli_…) |
| **Ce face ModuleScript-ul meu** | |
| **Ce se salvează (DataStore)** | |
| **O regulă de securitate din joc** | (ex. serverul verifică banii) |
| **Un bug rezolvat** | (ce era, cum l-am găsit) |
| **Ce aș face în v2** | |

### 6) Copia `_FINAL`
1. Salvează `Prenume_Nume_M4`.  
2. **File → Save As** → `Prenume_Nume_FINAL`.  
3. Din acest moment, **doar** `_FINAL` e versiunea de prezentat.  
4. `_M4` rămâne ca arhivă.

> Dacă strici ceva după `_FINAL`, te întorci la ultima versiune bună (profesorul te ajută).

### 7) Pregătirea prezentării *(Complet)*
La L10 prezinți 3–5 minute:
1. **Demo:** joacă-ți jocul (1–2 min)  
2. **Un script:** arată **un** cod și explică-l în cuvinte simple  
3. **O regulă de securitate:** de ce serverul decide  
4. **DataStore:** ce salvezi și de ce `pcall`  
5. **Un bug rezolvat:** cum l-ai găsit

Pregătești pe hârtie câte **o propoziție** pentru fiecare.

---

## Greșeli frecvente
1. **„Încă o funcție!"** — strici ce merge. Respectă *feature freeze*.  
2. **Nu testezi după ultima modificare.**  
3. **Ajuți colegul la test** — nu mai afli unde se blochează.  
4. **Nu faci `_FINAL`** — pierzi versiunea bună.  
5. **Lași scripturi/valori de test** — verifică lista din L8.  
6. **Nu ai instrucțiuni în joc** — jucătorul nu știe ce are de făcut.  
7. **Platforme imposibile** — un joc frustrant nu e un joc bun.  
8. **Uiți Output-ul** — un joc „care merge" cu erori roșii nu e gata.  
9. **Prezentare nepregătită** — nu știi să explici propriul cod.  
10. **Compari cu alții** — contează ce ai învățat tu.

---

## De făcut azi — „Obby-ul final"
Salvat: `Prenume_Nume_M4` și `Prenume_Nume_FINAL`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | Joc jucabil **de la Spawn la Finish**, **ModuleScript sau DataStore**, Output curat, `_FINAL`, fișa proiectului |
| **Complet (ținta orei)** | Minim + **DataStore** + **NPC/magazin** cu verificare pe server + test colegial + prezentare pregătită |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Verificare
- [ ] Lista parcursă  
- [ ] Probleme notate

### Pasul 2 — Reparații *(Minim)*
- [ ] Blocantele rezolvate  
- [ ] Output curat · `_FINAL` · fișă

**→ Minim când:** poți juca de la capăt **fără să te oprești**.

### Pasul 3 — Test și prezentare *(Complet)*
- [ ] Un coleg a jucat fără ajutor  
- [ ] Cele 5 puncte de prezentare pregătite

**Gata Complet când:** colegul a ajuns la **Finish** fără ajutorul tău.

---

## Bonus (dacă ai terminat Complet)
- [ ] Creezi un **mesaj de întâmpinare** pentru jucători noi  
- [ ] Faci o **captură-copertă**  
- [ ] Scrii un **plan v2** cu 5 idei ordonate  
- [ ] Ajuți un coleg (acum chiar poți!) să-și repare un bug

## Recapitulare rapidă
1. **Feature freeze:** nu mai adaugi, finisezi  
2. Parcurgi **lista finală**, apoi repari **blocantele**  
3. Un coleg testează **fără ajutor**  
4. **`_FINAL`** = versiunea de prezentat  
5. Pregătești **5 puncte** pentru prezentare

**Quiz scurt (cu profesorul):**  
- Ce înseamnă *feature freeze*?  
- De ce nu ajuți colegul la test?  
- Ce punem în copia `_FINAL`?

## Exemplu / referință (opțional, la final)
*(Încearcă întâi singur.)*

Exemple de propoziții pentru prezentare:
- *„Serverul verifică dacă am destule monede, ca să nu poată păcăli nimeni magazinul."*
- *„`pcall` mă ajută să nu se strice jocul dacă salvarea eșuează."*
- *„ModuleScript-ul meu conține funcțiile de statistici, ca să nu repet codul."*
- *„Un bug pe care l-am rezolvat: Finish dădea victorie de mai multe ori; am pus o frână."*

## Temă
Opțional: antrenează-te să-ți prezinți jocul **în 3 minute**, în fața unui membru al familiei.  
La **L10** publicăm (dacă e permis), prezentăm și închidem cursul.
