# Lecția 4 — Cutia cu număr
**Modulul 1 · Primii pași cu micro:bit (blocuri)**  
**Code Maker Club · micro:bit Starter**

> Azi înveți cum **ține minte** placa un număr. Folosim o **variabilă**, adică o cutie cu etichetă.  
> Proiect: **„Contorul magic”** · `Prenume_Nume_MB1_L04`

---

## Obiectiv
La finalul orei știi să creezi o variabilă, să îi schimbi valoarea și să o arăți pe LED-uri.  
**Minim:** un contor: **A** adaugă 1, **B** scade 1, **A+B** îl face din nou 0.  
**Complet:** Minim + o **tabelă de scor** cu două echipe (roșu și verde).

## De ce contează
Un joc trebuie să țină minte scorul. Un termometru ține minte temperatura. Un contor ține minte câte persoane au intrat. Programul păstrează aceste numere într-o **variabilă**. Fără variabile, placa ar uita totul imediat.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3: evenimente, `on button … pressed` |
| 10–25 | Jocul cu cutia și hârtia: ce este o variabilă? |
| 25–45 | Creăm variabila `score` în MakeCode |
| 45–75 | Contorul magic: A, B, A+B (**Minim**) |
| 75–105 | Tabela de scor cu două echipe (**Complet**) |
| 105–120 | Recapitulare, quiz, temă |

**Unelte azi:** categoria **Variables** · `set … to` · `change … by` · `show number`

---

## Pas cu pas

### 1) Cutia cu etichetă
Pe masă pui o cutie. Pe ea lipești eticheta **scor**. În cutie ai un bilet cu numărul **0**.
- Cineva spune „scor plus unu”: scoți biletul, scrii **1** și îl pui la loc.  
- Cineva întreabă „cât e scorul?”: te uiți în cutie și citești.

O **variabilă** funcționează la fel: are un **nume** (eticheta) și o **valoare** (biletul). Valoarea se poate schimba, de aceea se numește „variabilă”.

### 2) Creăm variabila
1. Proiect nou: `Prenume_Nume_MB1_L04`.  
2. Categoria **Variables** → butonul **Make a Variable…**.  
3. Scrii numele: `score` → **Ok**.  
4. Apar blocuri noi: **set score to 0**, **change score by 1** și blocul rotund **score**.

**Reguli pentru nume:** fără spații, fără diacritice, cu un înțeles clar (`score`, `echipa`, nu `x1`).

### 3) Pornirea contorului
Când pornește placa, scorul trebuie să fie **0**.

```text
on start
    set score to 0
    show number score
```
Blocul rotund **score** îl tragi din **Variables** și îl pui în gaura lui **show number**, în locul lui `0`.

### 4) Contorul — Minim

```text
on button A pressed
    change score by 1
    show number score

on button B pressed
    change score by -1
    show number score

on button A+B pressed
    set score to 0
    show number score
```

- **change score by 1** înseamnă „scorul nou = scorul vechi + 1”.  
- **change score by -1** scade 1. Pentru minus, scrii `-1`.  
- **set score to 0** pune direct `0` în cutie.

**Ce vezi pe ecran:** apeși A de trei ori și vezi pe rând `1`, `2`, `3`. Apeși B și vezi `2`. Apeși A+B și vezi `0`.

> Numerele cu **o cifră** apar fixe. Numerele cu **două cifre** (de la 10) se derulează. Dacă scorul coboară sub zero, apare semnul `-` înaintea cifrei.

### 5) Complet — tabela de scor
Facem o tabelă pentru un joc între două echipe: **roșu** și **verde**.

1. Creezi două variabile: `rosu` și `verde`.  
2. Programul se schimbă așa:

```text
on start
    set rosu to 0
    set verde to 0

on button A pressed
    change rosu by 1
    show number rosu

on button B pressed
    change verde by 1
    show number verde

on button A+B pressed
    show string "R"
    show number rosu
    show string "V"
    show number verde
```

- **A** = punct pentru roșu, **B** = punct pentru verde.  
- **A+B** arată scorul pe rând: `R`, scorul roșu, `V`, scorul verde.  
- Dacă apeși **Reset**, ambele scoruri se fac din nou **0** (pentru că `on start` rulează iar).

**Ce vezi pe ecran la A+B după 2 puncte roșu și 1 verde:** `R` → `2` → `V` → `1`.

### 6) Probe pentru mintea de programator
Fără să rulezi, spune ce număr apare:
1. `set score to 5` → `change score by 2` → `show number score` → ?  
2. `set score to 3` → `change score by -1` → `change score by -1` → ?  
3. `set score to 4` → `set score to 1` → ?

Răspunsuri: **7** · **1** · **1** (`set` înlocuiește complet valoarea veche).

---

## Greșeli frecvente
1. **„Scorul rămâne mereu la 1”** — ai folosit `set score to 1` în loc de `change score by 1`. `set` pune valoarea, `change` adaugă.  
2. **„Pe ecran se vede 0 și nu se schimbă”** — ai scris numărul `0` în `show number`, nu ai pus blocul rotund **score**.  
3. **„Nu pot crea variabila”** — numele are spațiu sau diacritice. Folosește `score` sau `rosu`.  
4. **„Scorul de la A și B se amestecă”** — ai folosit aceeași variabilă pentru ambele echipe. Fă două: `rosu` și `verde`.  
5. **„Scorul nu se resetează după Reset”** — ai uitat `set … to 0` în `on start`.  
6. **„Scorul `-1` arată ciudat”** — e normal: numărul negativ are semnul `-` în față. Mai târziu vom opri scăderea sub 0.

---

## De făcut azi — „Contorul magic”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Variabila `score`: A **+1**, B **−1**, A+B **0** |
| **Complet** | Minim + tabela de scor cu `rosu` și `verde` |

### Pasul 1 — Minim
- [ ] Variabila `score` creată  
- [ ] `on start`: `set score to 0`  
- [ ] A adaugă 1, B scade 1, A+B pune 0  
- [ ] Numărul se vede pe LED-uri după fiecare apăsare  

**→ Minim când:** un coleg apasă A de 3 ori și vede `3` pe placa ta.

### Pasul 2 — Complet
- [ ] Variabilele `rosu` și `verde`  
- [ ] A = punct roșu, B = punct verde  
- [ ] A+B arată `R`, scorul roșu, `V`, scorul verde  
- [ ] Numele fișierului e `MB1_L04`  

---

## Bonus (după Complet)
- [ ] La `on start` pune scorul la `10` și fă din B un **contor de numărătoare inversă**  
- [ ] Al treilea buton: V2 → `on logo pressed` adaugă **5** la scor  
- [ ] Fă un contor pentru câte persoane intră în clasă (apeși A la fiecare)  
- [ ] Scrie pe foaie un joc pentru acasă care ar avea nevoie de **două** variabile

## Recapitulare rapidă
1. **Variabilă** = cutie cu **nume** și **valoare**.  
2. `set score to 0` = pun direct valoarea.  
3. `change score by 1` = adaug (sau scad, cu `-1`).  
4. Blocul rotund `score` = „valoarea din cutie”.  
5. Nume bune: fără spații și fără diacritice.

## Schema pe scurt *(pe foaie)*

Make a Variable → `on start` set 0 → A: change +1 → B: change −1 → A+B: set 0 → `show number`

**Quiz scurt:**  
- Ce are o variabilă: un nume și ce altceva?  
- Care e diferența dintre `set` și `change`?  
- Ce face blocul rotund `score` din `show number`?  
- De ce `rosu` și `verde` trebuie să fie variabile separate?

## Temă
Gândește-te la un joc de societate. Scrie pe foaie **ce numere trebuie ținute minte** (scor, vieți, runde) și ce nume i-ai da fiecărei variabile.
