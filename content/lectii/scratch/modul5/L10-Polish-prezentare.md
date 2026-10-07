# Lecția 10 — Finisări, prezentare + insignă Maestru de jocuri
**Modulul 5 · Reguli de joc · Block 3 · Fir L7→L10**  
**Code Maker Club · Maestru de jocuri**

> Ultima oră pe `Prenume_Nume_M5_Proiect`: finisări **A–F**, **minutul 55 Stop cod**, prezentare **1–2 min**, insignă **Maestru de jocuri**.

---

## Obiectiv
**Minim:** ≥**3** din A–F · steag ×2 curat · prezentare 1–2 min (5 pași) · salvat · insignă.  
**Complet:** Minim + ≥5 din A–F **sau** upgrade „sigur” (sunete/instrucțiuni) **și** unul „avansat” (scorul cel mai mare / shop bonus) **sau** părere aplicată 5 min.

## De ce contează
Maestru de jocuri = reguli de joc grele **și** joc prezentabil — pod spre Cube Crafter (M6).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | A–F + reguli prezentare |
| 10–55 | Finisări + vânătoare de greșeli · **Stop cod ~55** |
| 55–70 | Full screen / ultimele teste |
| 70–110 | Prezentări 1–2 min |
| 110–120 | **Insignă Maestru de jocuri** |

---

## Pas cu pas

### 1) Finisări A–F *(Minim: cel puțin 3 · 40 minute)*
**Sigur (începi de aici):**
- [ ] **A — Nume pe meniu:** în sprite-ul `Meniu`, textul cu titlul jocului *(în editorul de costume, unealta T)*  
- [ ] **B — Sunete:** `pornește sunetul [Pop]` când iei o monedă; alt sunet la săritură; un sunet scurt la lovitură. Pe `win`, `lose` și `revino_meniu` pui `oprește toate sunetele`  
- [ ] **C — Controale:** pe meniu, text: „Săgeți = mers · Spațiu = sari”

**Avansat:**
- [ ] **D — Date lizibile:** bifezi variabilele `viață`, `scor`, `monede` în paleta Variabile; pe scenă le tragi în colț, ordonate  
- [ ] **E — Record:** variabila `record`. La `win`: `dacă <scor > record>` **atunci** `setează record la scor`; o arăți pe meniu  
- [ ] **F — Finaluri curate:** după `win` și `lose`, nimic nu rămâne „mort” pe scenă; steagul și Start pornesc curat de fiecare dată

**Stop cod la minutul 55.** După aceea repari doar greșeli mici, nu mai adaugi.

### 2) Căutarea greșelilor *(10 minute)*
Joci și încerci să-l strici, bifând fiecare test:
- [ ] Apeși spațiu în aer: nu sari a doua oară  
- [ ] Apeși steagul de 2 ori la rând: nu apar monede în plus  
- [ ] Pierzi o dată și câștigi o dată: ambele funcționează  
- [ ] După `win`, apeși Start: jocul începe de la zero  
- [ ] Nu poți câștiga la start

**Verifici:** cel puțin **o** greșeală găsită și reparată, **sau** un coleg a jucat și a scris „ok”.

### 3) Prezentarea *(1–2 minute)*
Cinci propoziții, scrise pe foaie înainte:
1. „Jocul meu se numește …”  
2. „În el tu …” *(sari, eviți, cumperi…)*  
3. „Partea grea a fost … și am rezolvat-o cu …” *(`viteza_y`, listă, shop…)*  
4. „Sunt mândru de …”  
5. **Demo 30–40 de secunde:** Start → joci → final

Regulile sălii: aplauze la final · fiecare spune **un compliment** și **o idee**.

### 4) Insigna
- [ ] Ai parcurs modulul 5 *(sau ai recuperat lecțiile lipsă)*  
- [ ] Ai prezentat  
- [ ] Primești **Maestru de jocuri**

### 5) Complet
- [ ] Cel puțin 5 din A–F **sau** unul „sigur” și unul „avansat” **sau** ai aplicat o părere primită


---

## Greșeli frecvente
1. **O funcție mare după minutul 55** — oprește-te; adaugă doar în proiectul următor.  
2. **Prezentare fără demo** — arată jocul, nu doar spune.  
3. **Sunetele nu se opresc** — lipsește `oprește toate sunetele` la final.  
4. **Variabile risipite pe scenă** — bifează doar `viață`, `scor`, `monede`.  
5. **Steagul nu mai merge** — repară înainte de prezentare.  
6. **Confuzie cu Cube Crafter** — aceea e Modulul 6.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_Proiect`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | ≥3 A–F · prezentare · insignă |
| **Complet** | Minim + ≥5 A–F **sau** sigur+avansat **sau** părere aplicată |

---

## Bonus
- [ ] Link în studio  
- [ ] Trailer 5 s  

## Recapitulare rapidă
1. Fizică · derulare · inamici · liste · My Blocks · shop · proiect mare  
2. Finisări + arăți  
3. Insignă **Maestru de jocuri** → urmează M6 Cubes  

## Schema pe scurt

**A–F**  
nume · sunet · controale · afișaj · scorul cel mai mare/shop · finaluri curate  

**Prezentare**  
titlu → faci → greu → mândru → demo  

**Quiz scurt:**  
- Ce 3 finisări ai?  
- Ce regulă ai explicat?  
- Ce modul urmează?

## Temă
— M5 închis. Pregătește-te de **Lume de cuburi** (grilă, sparge, craft).
