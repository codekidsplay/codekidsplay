# Lecția 2 — Lumea mea (2 scene și costume)
**Modulul 1 · Primii pași**  
**Code Kids Play · Scratch Starter**

> Azi îți faci **lumea**: 2 locuri (fundaluri) și un personaj care își schimbă look-ul.  
> Proiect: **„Lumea mea”** · fișier: `Prenume_Nume_L2` (ex. `Ana_Pop_L2`)

---

## Obiectiv
La finalul orei poți să schimbi **fundalul** și **costumul** personajului cu blocuri — nu doar din meniu — și să ții **scena 1 + scena 2** pe același ritm.

## De ce contează
Ca într-un joc sau o poveste pe telefon: schimbi **locul** (oraș → pădure) și **cum arată** eroul.  
În Scratch, **fundal** = locul pe scenă; **costum** = felul în care arată personajul (EN: *backdrop* / *costume*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + unde găsești Fundaluri și Costume |
| 10–30 | Pas cu pas + **Încearcă tu** |
| 30–100 | Proiectul „Lumea mea” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Două fundaluri
1. Jos, lângă scenă, apeși pe **Fundaluri** (iconița de peisaj)
2. Alegi **Fundal** din bibliotecă — primul loc
3. Adaugi încă un fundal (al doilea loc)
4. Redenumești-le clar, ex. `Casa` și `Parc` (click pe nume)

### 2) Schimbi scena cu un bloc (pe **Scenă**)
1. Selectezi **Scena** (nu personajul)
2. Din <span style="color:#E6A800;font-weight:700">Evenimente</span>:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span>
3. Din <span style="color:#9966FF;font-weight:700">Aspect</span>:  
   <span style="color:#9966FF;font-weight:700">comută fundalul la</span> `Casa` *(mereu start pe scena 1)*
4. Apeși steagul — trebuie să începi pe scena 1

### 3) Costume pe personaj
1. Selectezi **personajul**
2. Tab **Costume** → adaugi din bibliotecă până ai **cel puțin 3**
3. Script pe personaj:  
   <span style="color:#3F8F2A;font-weight:700">când se face clic pe steagul verde</span> →  
   <span style="color:#FFAB19;font-weight:700">repetă</span> `10` →  
   înăuntru: <span style="color:#9966FF;font-weight:700">următorul costum</span> →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2`  
4. Personajul „se animă” pe loc (~2 secunde: 10 × 0,2)

### 4) Trecere la scena 2 + sincron cu personajul
**Pe Scenă** (același script de la pasul 2), adaugi **sub** start:

1. <span style="color:#FFAB19;font-weight:700">așteaptă</span> `3` secunde  
2. <span style="color:#9966FF;font-weight:700">comută fundalul la</span> `Parc`

**Pe personaj** — ca dialogul să se potrivească cu scena:

| Când (timp) | Pe personaj (exemplu) |
|-------------|------------------------|
| Primele ~3 sec (încă pe `Casa`) | `spune` ceva despre **scena 1** → `așteaptă` până se apropie de 3 sec |
| După ce Scena a comutat | `spune` ceva despre **scena 2** |

*Regulă simplă:* timpul total de `așteaptă` + `spune` pe personaj **înainte** de replica de pe scena 2 ≈ **aceleași 3 secunde** pe care le așteaptă Scena.  
Nu există un „cablu” între cele două scripturi — **tu** potrivești numerele. Dacă schimbi `3` pe Scenă, schimbă și pe personaj.

*(Mesajele / broadcast le învățăm în Modulul 2 — azi sincronizăm cu `așteaptă`.)*

---

## Încearcă tu
- [ ] Ai **2 fundaluri** cu nume clare  
- [ ] La steag începi **mereu** pe scena 1 (bloc pe **Scenă**)  
- [ ] Personaj: `repetă 10` + `următorul costum` + `așteaptă 0.2`  
- [ ] După ~3 sec, fundalul trece la scena 2  

---

## Greșeli frecvente
1. **Fundalul nu se schimbă** — ai lipit pe **personaj** în loc de **Scenă**, sau în bloc e alt nume decât `Parc` / `Casa`.  
2. **Costumele nu se văd** — rulezi pe un personaj, te uiți la altul.  
3. **La steag rămâi pe scena 2** — lipsește la start `comută fundalul la` scena 1.  
4. **Dialogul „vorbește pe scena greșită”** — Scena așteaptă 3 sec, dar pe personaj ai `așteaptă` 1 sec (sau 5). **Potrivește timpii:** replica pentru scena 2 începe **după** aceleași ~3 secunde. Testează de 2–3 ori și ajustează numerele.  
5. **Nume fișier** — folosește `Prenume_Nume_L2`, nu doar `Ana_L2` (coliziune în clasă).

---

## De făcut azi — „Lumea mea”
Salvat: `Prenume_Nume_L2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | **Pasul 1 + Pasul 2** — 2 fundaluri, start pe scena 1, ≥3 costume + animație scurtă `repetă 10` |
| **Complet (ținta orei)** | Minim + **Pasul 3** — trecere la scena 2 + câte un `spune` pe fiecare scenă, sincronizat |

Dacă rămâi în urmă: salvează la **Minim**. Nu e eșec.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Locurile
- [ ] **2 fundaluri** cu nume (`Casa` / `Parc` sau altele)  
- [ ] La steag (pe **Scenă**): începi pe scena 1  

### Pasul 2 — Personajul *(parte din Minim)*
- [ ] ≥ **3 costume**  
- [ ] Animație: <span style="color:#FFAB19;font-weight:700">repetă</span> `10` → `următorul costum` → `așteaptă` `0.2`  
- [ ] Salvat: `Prenume_Nume_L2`  

**→ Minim când:** steagul arată scena 1 + personajul își schimbă costumele.

### Pasul 3 — Povestea pe 2 locuri *(Complet)*
- [ ] Pe **Scenă**: după `așteaptă` **`3`** (sau numărul tău), `comută fundalul la` scena 2  
- [ ] Pe **personaj**: **1** `spune` pentru scena 1 + **1** `spune` pentru scena 2  
- [ ] Timpii pe personaj **potriviți** cu `așteaptă` de pe Scenă (vezi pasul 4 + greșeala 4)  
- [ ] Rulează ≥ **25 de secunde** fără ajutor  
- [ ] Salvat din nou  

**Gata Complet când:** un coleg vede clar **2 locuri**, fără explicație cu vocea.

---

## Bonus (dacă ai terminat Complet)
- [ ] **3 scene** (al 3-lea fundal + încă un `așteaptă` + `comută`)  
- [ ] Personaj-buton „Continuă”:  
  din <span style="color:#E6A800;font-weight:700">Evenimente</span> →  
  <span style="color:#E6A800;font-weight:700">când se face clic pe acest personaj</span> →  
  <span style="color:#9966FF;font-weight:700">comută fundalul la</span> scena 2  
  *(Același capitol **Evenimente** ca steagul — doar **altă** opțiune: click pe personaj, nu pe steag. Nu e lecție nouă; e pentru cine a terminat Complet.)*  
- [ ] Al 2-lea personaj pe scenă de la început, cu un `spune` doar pe scena 2 (același truc cu `așteaptă` — **fără** `ascunde`/`arată` azi; le învățăm mai târziu)

## Recapitulare rapidă
1. **Fundal** = locul · **Costum** = look-ul  
2. Schimbarea scenei azi = blocuri pe **Scenă**  
3. Scena și personajul = **2 scripturi** — sincronizezi cu aceleași secunde în `așteaptă`  
4. Nume: **`Prenume_Nume_L2`**  

**Quiz scurt (cu profesorul):**  
- Unde adaugi un fundal nou?  
- Ce bloc schimbă scena?  
- De ce trebuie potrivite secundele pe Scenă și pe personaj?

## Temă
Opțional: dacă ai doar Minim, adaugi acasă Pasul 3 — același `Prenume_Nume_L2`.
