# Lecția 3 — Butoanele A și B
**Modulul 1 · Primii pași cu micro:bit (blocuri)**  
**Code Maker Club · micro:bit Starter**

> Până acum programul tău rula singur. Azi placa **ascultă de tine**: apeși un buton și se întâmplă ceva.  
> Proiect: **„Comutatorul de emoții”** · `Prenume_Nume_MB1_L03`

---

## Obiectiv
La finalul orei știi ce este un **eveniment** și faci placa să reacționeze când apeși **A**, **B** sau **A și B** împreună.  
**Minim:** A arată o față veselă, B arată o față tristă.  
**Complet:** Minim + A și B împreună arată o inimă, iar la pornire placa „doarme”.

## De ce contează
Telecomanda, tastatura și mouse-ul funcționează la fel: tu **faci ceva**, iar aparatul **răspunde**. În programare, „ceva ce se întâmplă” se numește **eveniment**. Blocurile de eveniment așteaptă liniștite, apoi pornesc exact când ai nevoie de ele.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2: cadre, pauze, `forever` |
| 10–25 | Ce este un eveniment? Joc „Simulează placa” fără calculator |
| 25–50 | `on button A pressed` și `on button B pressed` (**Minim**) |
| 50–70 | Trimitem pe placă și testăm |
| 70–95 | `on button A+B pressed` și starea de pornire (**Complet**) |
| 95–112 | Experimente: ce se întâmplă dacă apeși repede? |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** `on button A pressed` · `on button B pressed` · `on button A+B pressed` · `show icon` · `clear screen` · `pause (ms)`

---

## Pas cu pas

### 1) Jocul „Eu sunt placa”
Fără calculator. Profesorul spune „A!”, „B!” sau „A și B!”. Tu faci cu mâinile semnul cerut:
- **A** → ridici mâna **stângă**  
- **B** → ridici mâna **dreaptă**  
- **A+B** → ridici **ambele** mâini  

Tu ai fost „placa” care așteaptă un eveniment și apoi răspunde. Exact asta vom programa.

### 2) Proiect nou
**New Project** → `Prenume_Nume_MB1_L03` → **Create**.

### 3) Blocul de eveniment
1. Categoria **Input** (săgeata de la mijloc).  
2. Tragi **on button A pressed** în zona de lucru. Nu-l pui în `on start` sau `forever`, pentru că e **un bloc de sine stătător**, care începe singur programul lui când apeși A.  
3. Din **Basic** tragi **show icon** **înăuntrul** lui și alegi **Happy**.

```text
on button A pressed
    show icon [Happy]
```

În simulator apeși butonul **A** desenat pe placă și apare fața veselă.

### 4) Al doilea buton — Minim
1. Tragi din **Input** încă un bloc **on button …**.  
2. Pe el apeși pe litera **A** și schimbi în **B**.  
3. Înăuntru pui **show icon [Sad]**.

```text
on button A pressed
    show icon [Happy]

on button B pressed
    show icon [Sad]
```

**Ce vezi pe ecran:**
```text
Apeși A:                 Apeși B:
. . . . .                . . . . .
. # . # .                . # . # .
. . . . .                . . . . .
# . . . #                . # # # .
. # # # .                # . . . #
```

Trimite pe placă și apasă butoanele adevărate.

### 5) Complet — două butoane deodată
1. Mai tragi un bloc **on button … pressed** și alegi **A+B** din listă.  
2. Înăuntru: **show icon [Heart]**.  
3. Placa începe cu **un desen de „somn”**. Pune în **on start**: **show icon [Asleep]**.

```text
on start
    show icon [Asleep]

on button A pressed
    show icon [Happy]

on button B pressed
    show icon [Sad]

on button A+B pressed
    show icon [Heart]
```

> **Cum apeși A+B:** apasă ambele butoane **exact în același timp**. Dacă apeși A puțin mai devreme, placa crede că ai apăsat doar A.

### 6) Experimente — ce se întâmplă?
Încearcă și notează pe foaie:
1. Apeși A de trei ori repede. Ce vezi?  
2. Apeși A, apoi imediat B. Care poză rămâne?  
3. Apeși **Reset** (butonul mic de pe spate). Ce apare?

Răspunsuri: ultima poză rămâne pe ecran, iar după Reset programul pornește de la început, deci apare **Asleep**.

### 7) Eveniment sau forever?
| | `forever` | `on button A pressed` |
|--|-----------|----------------------|
| Când rulează? | mereu, în buclă | doar când apeși A |
| Se potrivește pentru | animații, verificări continue | acțiuni cerute de tine |

---

## Greșeli frecvente
1. **„Nu se întâmplă nimic când apăs”** — blocul `show icon` nu e **în interiorul** blocului de eveniment. Trage-l până se lipește.  
2. **„A+B nu merge”** — apeși butoanele la momente diferite. Încearcă să le apeși simultan.  
3. **„Am două blocuri la fel pentru A”** — editorul te poate avertiza sau doar unul va face ce vrei. Pentru fiecare buton păstrează **un singur** bloc.  
4. **„Pe placă se vede Asleep și nu se mai schimbă”** — verifică dacă ai descărcat programul nou după modificare.  
5. **„Simulatorul merge, placa nu”** — nu ai trimis ultima versiune. Apasă din nou **Download**.  
6. **„Apeși butonul și poza dispare repede”** — nu pune `clear screen` după `show icon`, decât dacă vrei asta.

---

## De făcut azi — „Comutatorul de emoții”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | A = **Happy**, B = **Sad**, merge pe placă |
| **Complet** | Minim + **A+B = Heart** + la pornire apare **Asleep** |

### Pasul 1 — Minim
- [ ] Un bloc `on button A pressed` cu `show icon [Happy]`  
- [ ] Un bloc `on button B pressed` cu `show icon [Sad]`  
- [ ] Programul e descărcat pe placă  

**→ Minim când:** apeși A și B pe placa adevărată și se schimbă fețele.

### Pasul 2 — Complet
- [ ] `on button A+B pressed` cu `show icon [Heart]`  
- [ ] `on start` cu `show icon [Asleep]`  
- [ ] Testat cu **Reset**: placa „adoarme” din nou  
- [ ] Numele fișierului e `MB1_L03`  

---

## Bonus (după Complet)
- [ ] Fă un **semafor de dispoziție**: A = `Happy`, B = `Meh`, A+B = `Angry` (alege din listă)  
- [ ] La A arată fața veselă **1 secundă** (`pause (ms) 1000`), apoi `clear screen`  
- [ ] Plăci V2: adaugă **on logo pressed** cu o poză, pentru că logoul se atinge ca un buton  
- [ ] Scrie cu un coleg un „joc de emoții”: el spune o emoție, tu apeși butonul potrivit

## Recapitulare rapidă
1. **Eveniment** = ceva ce se întâmplă (apeși un buton).  
2. `on button A pressed` rulează **doar** când apeși A.  
3. A e în **stânga**, B e în **dreapta**, **A+B** = ambele **deodată**.  
4. Pentru fiecare buton ai nevoie de **un singur** bloc.  
5. **Reset** reia programul de la început.

## Schema pe scurt *(pe foaie)*

Eveniment (apăs A / B / A+B) → bloc de eveniment → `show icon` → poza apare

**Quiz scurt:**  
- Ce este un eveniment? Dă un exemplu din viața de zi cu zi.  
- Pe ce parte a plăcii se află butonul B?  
- Cum faci ca placa să răspundă când apeși A și B deodată?  
- Ce se întâmplă după Reset cu poza `Asleep`?

## Temă
Gândește-te la un aparat de acasă care are butoane (telecomandă, cuptor cu microunde). Desenează pe foaie 3 butoane și ce **ar trebui** să facă placa micro:bit la fiecare.
