# Lecția 6 — Playtest cu colegii
**Modulul 4 · Game Creator**  
**Code Maker Club · Roblox Studio**

> Tu ști exact cum se joacă Obby-ul tău — și tocmai de aceea **nu mai vezi ce e greșit în el**. Azi lași **un coleg** să-l joace, tu **taci și te uiți**, apoi faci o **listă de probleme** pe care o repari la L7.  
> Place: `Prenume_Nume_M4` (ex. `Ana_Pop_M4`)

---

## Obiectiv
La finalul orei ai făcut **cel puțin un playtest** cu un coleg care nu a mai văzut jocul și ai o **listă de observații** clară, ordonată după cât de grave sunt.  
**Minimum:** **1 playtest** (un coleg joacă, tu observi) + **cel puțin 3 observații** notate + răspunsurile colegului la **5 întrebări**.  
**Ținta orei (Complet):** Minim + **2 playtesturi** cu colegi diferiți + **lista ordonată** (Blocant / Important / Mic) + cel puțin **o eroare din Output** notată (script + linie) + alegi **primele 3 lucruri** de reparat.

## De ce contează
Toți creatorii de jocuri fac playtest, de la copii la studiouri mari. Motivul e simplu: **creatorul știe prea multe**. Tu știi că trebuie să cauți butonul, că ușa se deschide la click, că trebuie să sari pe a patra platformă. Un jucător nou **nu știe nimic** din toate astea.

Playtestul nu e „un examen pentru tine". E **cel mai ieftin mod** de a afla ce trebuie să repari.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + reguli de playtest + roluri |
| 10–30 | Pregătirea jocului pentru test (**checklist**) |
| 30–60 | **Runda 1:** un coleg joacă jocul tău · tu observi |
| 60–90 | **Runda 2:** alt coleg (Complet) · schimbi rolurile |
| 90–115 | Lista de probleme: ordonare + primele 3 |
| 115–120 | Recap + salvare |

**Azi folosim:** Studio **Play** · fereastra **Output** · foaia de observații.

---

## Pas cu pas

### 1) Cele trei roluri
| Rol | Ce face | Ce **nu** face |
|-----|---------|----------------|
| **Jucătorul** (colegul) | joacă și **gândește cu voce tare** („hmm, unde merg?") | nu cere ajutor imediat |
| **Observatorul** (tu, creatorul) | **notează** ce vede | **nu explică, nu ajută, nu se apără** |
| *(opțional)* **Scribul** (un al treilea coleg) | notează tot ce spune jucătorul | — |

**Regula de aur:** creatorul **tace** cel puțin **3 minute**. Dacă jucătorul e blocat mai mult de **60 de secunde**, notezi **unde** — și abia apoi îl poți ajuta cu **un singur indiciu**.

*Dacă te doare să tacă… ai găsit un lucru important: jocul tău nu se explică singur.*

### 2) Pregătim jocul pentru test
Înainte să-l dai unui coleg:

- [ ] **Salvat** (o copie `Prenume_Nume_M4_test`)  
- [ ] Valorile de test **scoase** (de exemplu `Value = 50`, `ClockTime` ciudat)  
- [ ] **Început de la zero:** schimbi **temporar** numele caietului din `Mod_Salvare` în `Obby_Monede_test1`, ca monedele tale să **nu** se încarce la colegul tău (la **L8** îl pui înapoi la numele final — notează-ți pe foaie!)  
- [ ] **Volum** potrivit  
- [ ] **Output** deschis, într-o parte a ecranului  
- [ ] Un **panou de instrucțiuni** simplu la început (M3 L9)  
- [ ] Jocul pornește de la **Spawn**, nu din mijloc

**Încearcă tu — pregătirea (10–12 min)**  
- [ ] Ai bifat toate 7 puncte  
- [ ] Un **Play** scurt: totul pornește curat

### 3) Testul celor 30 de secunde
La început, **înainte** să joace, arată colegului ecranul jocului **30 de secunde**, fără să vorbești, apoi întreabă-l:

1. „Ce crezi că trebuie să faci aici?"  
2. „Ce îți dă impresia că e important?"

Dacă nu ghicește scopul, **instrucțiunile și interfața** trebuie îmbunătățite.

### 4) Foaia de observații
Pe foaie (sau în caiet) faci un tabel:

| Ce a făcut / spus | Unde în joc | Cum s-a simțit (clar / confuz / frustrat / distrat) |
|--------------------|-------------|------------------------------------------------------|
| „Nu găsesc unde merg" | după Checkpoint 1 | confuz |
| A sărit în lavă de 3 ori | secțiunea cu lava | frustrat |
| A râs la inamic | inamicul | distrat (bine!) |

Notezi **fapte** (ce a făcut), nu **păreri** („cred că era plictisit").

### 5) Cele 5 întrebări de la final
După ce termină (sau renunță), pune-i colegului:

1. Ce ți-a plăcut cel mai mult?  
2. Unde ai fost cel mai confuz?  
3. Ce a fost prea greu? Prea ușor?  
4. Ai înțeles ce face fiecare lucru (monede, checkpoint, magazin)?  
5. Ce ai schimba, dacă ar fi jocul tău?

Răspunsurile le **notezi**, fără să te aperi. Spui doar: **„Mulțumesc."**

**Încearcă tu — Runda 1 (25–30 min)**  
- [ ] Colegul a jucat și tu ai **tăcut** cel puțin 3 minute  
- [ ] Ai **cel puțin 3** observații  
- [ ] Ai notat cele 5 răspunsuri

### 6) Cum dai feedback (când ești jucătorul)
Un feedback bun e **specific** și **blând**:

| În loc de… | Spune… |
|------------|--------|
| „E prost" | „Nu am înțeles unde trebuie să sar după al doilea checkpoint" |
| „E ușor" | „Am terminat din prima; aș pune încă un inamic pe ultima secțiune" |
| „Nu-mi place" | „Muzica e prea tare, mi-ar plăcea să o pot opri" |

Formula: **„Mi-a plăcut …, aș schimba …, pentru că …"**

### 7) Lista de probleme — ordonată
După ce ai observațiile, le sortezi în **trei coșuri**:

| Coș | Înseamnă | Exemple |
|-----|----------|---------|
| **Blocant** | nu se poate termina sau jocul se strică | Finish inaccesibil, eroare roșie care oprește un script, jucătorul rămâne blocat |
| **Important** | jocul e confuz sau nedrept | nu se înțelege ce face magazinul, inamicul lovește fără avertisment |
| **Mic** | detaliu | o culoare, un text, un sunet prea tare |

Apoi alegi **primele 3** de reparat la **L7**: **întâi** blocantele, apoi importantele.

### 8) Erorile din Output *(Complet)*
În timpul testului, **Output**-ul s-a umplut de ceva roșu? Pentru fiecare eroare notezi: **scriptul**, **linia** și **ce ai făcut când a apărut**. (Citirea o știi de la M2 L1.)

| Script | Linia | Mesaj pe scurt | Când a apărut |
|--------|-------|----------------|---------------|
| `Srv_Inamic` | 18 | „attempt to index nil…" | când a murit colegul |

**Încearcă tu — lista (15–20 min)**  
- [ ] Cel puțin 5 observații în coșuri  
- [ ] Primele 3 alese  
- [ ] (Complet) cel puțin o eroare cu script + linie

---

## Greșeli frecvente
1. **Explici în loc să observi** — „păi trebuie să sari acolo!"; taci.  
2. **Te aperi** — „dar nu așa era gândit!"; spune doar „mulțumesc".  
3. **Notezi păreri, nu fapte** — scrie ce a făcut jucătorul.  
4. **Testezi cu cineva care a văzut jocul** — nu mai poate fi „ochi nou".  
5. **Joci tu în locul lui** — el trebuie să conducă.  
6. **Testezi cu date vechi** — monedele tale se încarcă la coleg; schimbi caietul.  
7. **Nu deschizi Output** — pierzi erorile.  
8. **Te enervezi pe feedback** — e despre joc, nu despre tine.  
9. **Repari totul pe loc** — notezi acum, repari la **L7**, pe ordine.  
10. **Ignori ce spune „mic"** — dacă 3 colegi spun același lucru mic, devine important.

---

## De făcut azi — „Playtest"
Salvat: `Prenume_Nume_M4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | **1** playtest + **≥3** observații + răspunsurile la **5 întrebări** |
| **Complet (ținta orei)** | Minim + **2** playtesturi + lista în **trei coșuri** + **≥1** eroare din Output + **primele 3** de reparat |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Pregătire
- [ ] Checklist-ul din secțiunea 2  

### Pasul 2 — Runda 1 *(Minim)*
- [ ] Ai tăcut  
- [ ] Ai observații + răspunsuri  

**→ Minim când:** poți spune cel puțin **un lucru** pe care nu l-ai fi știut fără testul colegului.

### Pasul 3 — Runda 2 + lista *(Complet)*
- [ ] Alt coleg  
- [ ] Trei coșuri + primele 3  
- [ ] Eroare din Output  

**Gata Complet când:** ai o listă pe care **un coleg** o poate citi și înțelege ce ai de reparat.

---

## Bonus (dacă ai terminat Complet / după runde)
- [ ] **Testul „fără voce"**: un coleg îți joacă Obby-ul **fără să-i spui nimic**, nici la început  
- [ ] Un **sondaj de 3 întrebări** pe un `TextLabel` din lume (dacă ai ecran la Spawn)  
- [ ] **Joacă tu** jocul unui coleg și scrie **feedback după formula** „Mi-a plăcut…, aș schimba…"  
- [ ] Numără **câte încercări** i-au trebuit colegului până la Finish — e un indicator bun de dificultate

## Recapitulare rapidă
1. **Creatorul știe prea multe** → ai nevoie de ochi noi  
2. Roluri: **jucător** (gândește cu voce tare), **observator** (tace și notează)  
3. Notezi **fapte**, nu păreri  
4. Ordonezi: **Blocant → Important → Mic**  
5. Alegi **primele 3** pentru L7

**Quiz scurt (cu profesorul):**  
- De ce creatorul nu are voie să explice în timpul testului?  
- Care e diferența dintre o problemă **blocantă** și una **mică**?  
- De ce schimbăm numele caietului DataStore la test?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector o foaie de observații completată.)*

## Temă
Opțional: arată jocul unui **membru al familiei**, fără să-i explici. Notează unde se oprește.  
La **L7** reparăm: învățăm **cum se caută un bug** și rezolvăm primele 3 probleme de pe listă.
