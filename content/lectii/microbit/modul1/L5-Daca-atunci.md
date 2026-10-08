# Lecția 5 — Dacă… atunci
**Modulul 1 · Primii pași cu micro:bit (blocuri)**  
**Code Maker Club · micro:bit Starter**

> Azi înveți placa să **ia decizii**: dacă se întâmplă ceva, face un lucru; altfel face altceva.  
> Proiect: **„Cursa până la 10”** · `Prenume_Nume_MB1_L05`

---

## Obiectiv
La finalul orei folosești blocurile `if … then` și `if … then … else` și compari numere.  
**Minim:** apeși **A** și scorul crește; când ajunge la **10**, placa te felicită și scorul pornește de la 0.  
**Complet:** Minim + **B** scade scorul, dar **niciodată sub 0**.

## De ce contează
Tu iei decizii tot timpul: „Dacă plouă, iau umbrela. Altfel, iau ochelarii de soare.” Un program face la fel. Fără decizii, un joc nu poate spune „ai câștigat”, iar o alarmă nu știe când să sune.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4: variabile, `set`, `change` |
| 10–30 | Jocul „Dacă… atunci” cu cartonașe, fără calculator |
| 30–50 | Blocul `if … then` și comparațiile (`=`, `<`, `>`) |
| 50–75 | Cursa până la 10 (**Minim**) |
| 75–100 | B scade, dar nu sub 0 (**Complet**) |
| 100–112 | Greșeli de gândire: găsește bug-ul |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** categoria **Logic** · `if … then` · `if … then … else` · comparația `0 = 0` · `show icon` · `show string`

---

## Pas cu pas

### 1) Jocul cu cartonașe
Pe un cartonaș scrie **„Dacă mă ating de cap, tu sari”**. Un coleg citește. Dacă te-ai atins de cap, el sare. Altfel, stă pe loc. Fiecare decizie are:
- o **condiție** (ceva care poate fi **adevărat** sau **fals**);  
- o **acțiune** (ce faci dacă e adevărat);  
- uneori și o alta (**altfel**).

### 2) Condiția și comparațiile
O condiție pune o întrebare la care răspunsul e **da (true)** sau **nu (false)**.

| Scris în MakeCode | Se citește | Exemplu cu `score = 7` |
|-------------------|-----------|-------------------------|
| `score = 10` | scorul este egal cu 10 | **false** |
| `score < 10` | scorul este mai mic decât 10 | **true** |
| `score > 0` | scorul este mai mare decât 0 | **true** |
| `score ≥ 7` | mai mare **sau egal** cu 7 | **true** |

Blocul de comparație e în **Logic** și arată ca o pastilă cu două găuri și un semn la mijloc. Pe semn apeși și alegi `=`, `<`, `>`, `≤`, `≥` sau `≠`.

### 3) Proiect nou și pornirea
**New Project** → `Prenume_Nume_MB1_L05`. Creezi variabila `score` (ca în L4).

```text
on start
    set score to 0
    show number score
```

### 4) Cursa până la 10 — Minim
La fiecare apăsare de **A** creștem scorul. **Apoi** întrebăm: „Am ajuns la 10?”

```text
on button A pressed
    change score by 1
    if score = 10 then
        show icon [Yes]
        show string "Bravo"
        set score to 0
        show number score
    else
        show number score
```

Cum construiești `if … else`:
1. Din **Logic** tragi **if … then** în blocul `on button A pressed`, **sub** `change score by 1`.  
2. Apeși pe semnul **+** de pe bloc ca să adaugi **else**.  
3. În condiție pui comparația din Logic: în stânga blocul rotund `score`, semnul `=`, în dreapta numărul `10`.  
4. Pe ramura de sus (`then`) pui ce se întâmplă când ai ajuns la 10; pe ramura de jos (`else`) pui `show number score`.

**Ce se întâmplă:** la fiecare A vezi scorul (`1`, `2`, … `9`). La al zecelea A apare bifa **Yes**, apoi textul `Bravo`, apoi scorul revine la `0`.

**Ce vezi pe ecran la al 10-lea A:**
```text
. . . . .
. . . . #
. . . # .
# . # . .
. # . . .
```
(urmată de textul `Bravo` și apoi cifra `0`)

> **Ordinea contează.** Mai întâi `change score by 1`, **apoi** `if`. Dacă ai verifica înainte de a adăuga, ai vedea 10 abia la a 11-a apăsare.

### 5) Complet — B scade, dar nu sub 0
Dacă `score` e `0` și apeși B, ar ieși `-1`. Vrem să **nu** se întâmple.

```text
on button B pressed
    if score > 0 then
        change score by -1
    show number score
```

- Dacă `score > 0` (e adevărat), scădem 1.  
- Dacă e `0`, blocul din `if` nu rulează, deci scorul rămâne `0`.  
- `show number score` e **după** `if`, deci se arată scorul de fiecare dată.

Poți adăuga și **A+B** pentru resetare:

```text
on button A+B pressed
    set score to 0
    show number score
```

### 6) Găsește greșeala
Un coleg a scris programul de mai jos pentru „Cursa până la 10”, dar nu funcționează corect:

```text
on button A pressed
    if score = 10 then
        show icon [Yes]
    change score by 1
    show number score
```
1. De ce bifa apare abia la a 11-a apăsare, nu la a 10-a?  
2. De ce scorul trece de 10 fără să se oprească?  

Răspuns: verificarea e **înaintea** adunării, deci vede `10` abia când apeși a 11-a oară. Apoi scorul continuă la 11, 12 … pentru că nimeni nu îl pune la 0.

---

## Greșeli frecvente
1. **„Bifa nu apare niciodată”** — ai pus `=` cu un număr greșit sau verificarea înainte de `change`.  
2. **„Scorul trece de 10”** — ai uitat `set score to 0` în ramura `then`.  
3. **„Apare mereu Bravo”** — ai pus `show string "Bravo"` **în afara** blocului `if`.  
4. **„Nu pot scrie `score = 10`”** — comparația e în **Logic**, nu în **Math**.  
5. **„Un `=` nu merge ca la matematică”** — în MakeCode, `set score to 5` **pune** 5, iar comparația `score = 5` **întreabă** dacă e 5. Sunt blocuri diferite.  
6. **„Scorul de la B ajunge la -1”** — ai uitat condiția `score > 0`.

---

## De făcut azi — „Cursa până la 10”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | A crește scorul; la **10** apare **Yes** + `Bravo`, apoi scorul revine la **0** |
| **Complet** | Minim + B scade, dar **niciodată sub 0** + A+B resetează |

### Pasul 1 — Minim
- [ ] Variabila `score`  
- [ ] `change score by 1` **înainte** de `if`  
- [ ] `if score = 10 then … else …`  
- [ ] La 10: `Yes`, `Bravo`, `set score to 0`  

**→ Minim când:** un coleg apasă A de 10 ori și vede bifa.

### Pasul 2 — Complet
- [ ] `on button B pressed` cu `if score > 0`  
- [ ] La `0`, B nu mai scade  
- [ ] A+B pune scorul pe 0  
- [ ] Numele fișierului e `MB1_L05`  

---

## Bonus (după Complet)
- [ ] Schimbă ținta de la `10` la `5` și vezi cum devine mai repede  
- [ ] Adaugă un mesaj `Aproape!` când `score = 9`  
- [ ] Folosește `and` din **Logic**: `score > 3 and score < 7` arată `Happy`  
- [ ] Fă o variabilă `tinta` și compară `score = tinta`, ca să schimbi ținta într-un singur loc

## Recapitulare rapidă
1. **Condiție** = întrebare cu răspuns **adevărat** sau **fals**.  
2. `if … then` face ceva **doar dacă** e adevărat.  
3. `else` = „altfel”.  
4. `=` în comparație **întreabă**, `set … to` **pune** o valoare.  
5. Ordinea blocurilor schimbă rezultatul.

## Schema pe scurt *(pe foaie)*

A apăsat → `change score by 1` → `if score = 10` → da: Yes + Bravo + 0 · nu: arată scorul

**Quiz scurt:**  
- Cu `score = 7`, ce răspuns are `score > 7`?  
- Ce face `else`?  
- De ce `change score by 1` vine **înaintea** lui `if`?  
- Cum împiedici scorul să ajungă sub `0`?

## Temă
Scrie pe foaie **trei decizii** din viața ta, în forma „Dacă … atunci …, altfel …”. Alege una și imaginează cum ai face-o cu blocuri.
