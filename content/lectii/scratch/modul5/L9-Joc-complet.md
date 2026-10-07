# Lecția 9 — Proiect mare: joc complet
**Modulul 5 · Reguli de joc · Block 3 · Fir L7→L10**  
**Code Maker Club · Maestru de jocuri**

> Azi închizi produsul: **meniu Start** · reset · **Win / Sfârșitul jocului** · (opțional) nivel 2.  
> Același fișier: `Prenume_Nume_M5_Proiect`

---

## Obiectiv
**Minim:** meniu Start · jocul rulează după Start · final clar (victorie **și** game over sau măcar unul + mesaj) · restart / steag curăță tot · coleg termină fluxul **fără** ajutor.  
**Complet:** Minim + ambele finaluri · **sau** nivel 2 / tranziție · **sau** shop/inventar legat de win.

## De ce contează
Fără start/final, la L10 prezinți o schiță.  
Același tipar ca M3 L8–L9 și M6 L9.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Recap `start_joc` / `revino_meniu` |
| 12–30 | Condiții win/lose pe foaie |
| 30–100 | Meniu + finaluri + reset |
| 100–120 | Test coleg 5 min |

---

## Pas cu pas

Lucrezi în `Prenume_Nume_M5_Proiect`. Ideea: jocul **nu mai pornește la steag**, ci când apeși **Start**.

### 1) Mesajele *(5 minute, pe foaie)*
Trei mesaje, trimise cu `trimite … către toți`:  
- `start_joc` — pornește jocul  
- `win` / `lose` — jocul s-a terminat  
- `revino_meniu` — înapoi la început

**Încearcă tu — pe foaie (5 min):** desenează fluxul: *steag → meniu → apeși Start → joci → win sau lose → meniu*.

### 2) Meniul *(Minim, partea 1 · 20 minute)*
1. Un sprite nou `Meniu`, cu textul **START** *(și, dacă vrei, controalele: „Săgeți = mers · Spațiu = sari”)*  
2. Pe steag: `arată` · `du-te la x: 0 y: 0` · `treci în față` *(ca să acopere restul)*  
3. `la click pe acest sprite`: `trimite start_joc` și `ascunde`  
4. La **toate celelalte** sprite-uri: pe steag doar `ascunde`; scripturile de joc *(gravitație, patrulă, monede)* le muți sub `când primesc start_joc`, cu `arată` la început  
5. La **fiecare** sprite, primul bloc de sub `când primesc start_joc` e `oprește [celelalte scripturi din acest sprite]` *(ca să nu pornească jocul de două ori)*

**Verifici:** apeși steagul — vezi doar meniul. Apeși Start — jocul apare și merge ca înainte.

### 3) Resetul total *(Minim, partea 2 · 10 minute)*
Sub `când primesc start_joc` la **Erou**, înainte de joc: `setează viață la 3` · `setează scor la 0` · `setează monede la 0` · `setează viteza_y la 0` · `șterge tot din inventar` *(dacă ai listă)* · `du-te la start`.

**Verifici:** apeși Start, joci puțin, ajungi la meniu și apeși Start din nou: totul începe curat.

### 4) Victoria și înfrângerea *(Minim, partea 3 · 20 minute)*
1. **Victoria:** la `Țel`, sub `când primesc start_joc`, `repetă la nesfârșit` → `dacă <atinge Erou?>` **atunci** `trimite win` și `oprește acest script`  
2. **Înfrângerea:** la Erou, când `viață = 0` *(în `repetă la nesfârșit`)* → `trimite lose` și `oprește acest script`  
3. Un sprite `Final` cu două costume: **Ai câștigat!** și **Sfârșitul jocului**:  
   - `când primesc win`: `treci la costumul Ai câștigat!` · `arată` · `așteaptă 3 secunde` · `ascunde` · `trimite revino_meniu`  
   - `când primesc lose`: la fel, cu al doilea costum  
4. Meniul: `când primesc revino_meniu` → `arată`  
5. Toate celelalte sprite-uri: `când primesc revino_meniu` → `oprește celelalte scripturi din acest sprite` și `ascunde`; clonele: `șterge această clonă`

**Verifici:** poți câștiga *(ajungi la Țel)* și poți pierde *(te lasă fără viață)*. După fiecare, vezi mesajul 3 secunde și revii la meniu.

### 5) Test cu un coleg *(10 minute)*
Colegul joacă **fără ajutor**. Dacă se blochează, notezi unde: asta repari.

### 6) Complet *(alege cel puțin una)*
- [ ] Ambele finaluri complete, cu mesaje clare  
- [ ] **Nivel 2:** la `win`, `trimite nivel_2`; `Teren` și `Țel` trec la alt costum  
- [ ] Un obiect *(cheia din L4, un upgrade din L6)* **necesar** pentru a câștiga: `Țel` verifică `inventar conține [Cheie]?`


---

## Greșeli frecvente
1. **Câștigi imediat** — `Țel` e deja atins la start. Mută-l mai departe sau așteaptă `start_joc`.  
2. **Meniul rămâne peste joc** — lipsește `ascunde` după click, sau `treci în față` la alt sprite.  
3. **Restartul pornește jocul de două ori** — lipsește `oprește celelalte scripturi din acest sprite`.  
4. **Rămân clone sau viață veche** — resetul nu acoperă tot.  
5. **Nu poți câștiga niciodată** — verifică unde a ajuns `Țel` când se ascunde.  
6. **Controalele nu sunt scrise** — colegul nu știe ce să apese.  
7. **Proiect nou** — rămâi în același fișier.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_Proiect`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Meniu · Start · ≥1 final · reset · test coleg |
| **Complet** | Minim + ambele finaluri **sau** nivel 2 **sau** shop/inventar în win |

---

## Bonus
- [ ] `revino_meniu` din pause  
- [ ] 3 note finisări A–F pe foaie → L10

## Recapitulare rapidă
1. Start → joc → final  
2. Reset = tot  
3. L10 = finisări + prezentare + insignă  

## Schema pe scurt

**Flux**  
meniu → `start_joc` → joacă → win/lose → (meniu)  

**Quiz scurt:**  
- Ce resetează Start?  
- Cum câștigi?  
- Ce finisări vrei mâine?

## Temă
20 s vorbite pentru L10. Urmează finisări + **Maestru de jocuri**.
