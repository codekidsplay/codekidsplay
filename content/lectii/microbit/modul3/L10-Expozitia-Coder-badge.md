# Lecția 10 — Expoziția Coder + badge
**Modulul 1 · Python pe micro:bit**  
**Code Maker Club · micro:bit Coder**

> Azi e **ziua expoziției**! Îți prezinți programul Python, explici cum funcționează, primești păreri de la colegi și primești insigna **micro:bit Coder**.  
> Proiect: **„Standul meu Coder”** · `Prenume_Nume_MP1_L10`

---

## Obiectiv
La finalul orei îți prezinți programul clar, citești codul unui coleg și completezi **Verificarea Modulului 1**.  
**Minim:** proiectul rulează pe placă, iar fișa lui e completă.  
**Complet:** Minim + **prezentare de 2 minute** + o **îmbunătățire** făcută după părerile colegilor.

## De ce contează
Programatorii nu doar scriu cod: îl **explică**, îl **citesc** pe al altora și îl **îmbunătățesc**. Azi faci toate trei.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap Modul 1: ce știm acum? |
| 10–35 | Pregătim standul: test final, comentarii în cod, fișă |
| 35–45 | Repetăm prezentarea în perechi |
| 45–85 | **Expoziția**: prezentări + citit cod |
| 85–95 | Îmbunătățim după păreri |
| 95–120 | **Verificarea Modulului 1** + autoevaluare + badge |

**Unelte azi:** proiectul tău din Modul 1 (de preferat **L9: Pixi**) · cartonașe de păreri · afiș mic

---

## Pas cu pas

### 1) Alegem proiectul de expus
Alege **un** program: **Pixi** (L9), **Seiful** (L8), **Mesagerul radio** (L6), **Detectivul de cameră** (L5), **Cufărul cu monede** (L4) sau **Biblioteca de desene** (L7). Verifică că rulează pe placă.

### 2) Testul final (10 minute)
- [ ] Programul e descărcat pe placă  
- [ ] Ai testat fiecare buton / senzor folosit  
- [ ] Ai testat cazurile ciudate (ce se întâmplă dacă apeși de 10 ori?)  
- [ ] Numele variabilelor sunt clare  
- [ ] Ai salvat programul și o copie de rezervă  

### 3) Codul lizibil
Un cod frumos se citește ușor. Adaugă:
- **comentarii** (`# ...`) la părțile importante;  
- **nume clare** (`foame`, nu `x`);  
- **rânduri goale** între părți;  
- **constante** scrise cu litere mari (`INTERVAL`).

```python
from microbit import *

PRAG_CALD = 26      # grade Celsius

while True:
    if temperature() > PRAG_CALD:      # daca e cald, afisam o fata mirata
        display.show(Image.SURPRISED)
    else:
        display.show(Image.HAPPY)
    sleep(500)
```

### 4) Fișa proiectului
Pe o foaie A4 scrii:
- **Titlul** proiectului  
- **Ce face?** (într-o propoziție)  
- **Cum se folosește?** (2–3 pași)  
- **Ce am folosit?** (variabile, `if`, funcții, senzori …)  
- **Cine l-a făcut** (prenumele tău)

### 5) Prezentarea de 2 minute
1. **Salut:** „Mă numesc … și vă prezint …”  
2. **Ce face:** arată programul în funcțiune.  
3. **Cum funcționează:** o idee-cheie (de exemplu „variabila `pas` ține minte în ce punct al codului suntem”).  
4. **Ce a fost greu:** o greutate și cum ai rezolvat-o.  
5. **Ce ai adăuga:** o idee pentru versiunea 2.  
6. **Întrebări:** „Aveți întrebări?”

**Exersează în perechi:** unul prezintă, celălalt cronometrează și spune **un lucru bun** și **o sugestie**.

### 6) Expoziția și „Citește codul”
- Jumătate din clasă **prezintă**, jumătate **vizitează**; apoi schimbați rolurile.  
- Vizitatorii **încearcă** proiectul și **citesc** codul. Ei lasă un cartonaș:

| Rubrica | Ce scrii |
|---------|----------|
| Un lucru bun | Ce mi-a plăcut |
| O parte din cod pe care am înțeles-o | Care și de ce |
| O idee | Ce ar putea fi îmbunătățit |

### 7) Îmbunătățirea
Citește cartonașele. Alege **o idee** și fă-o în 10 minute (de exemplu un comentariu mai clar, un nume mai bun sau o față nouă). Notează pe fișă ce ai schimbat.

---

## Verificarea Modulului 1
Răspunde pe foaie, fără să te uiți în lecții. Răspunsurile sunt la final.

1. Ce face linia `from microbit import *`?  
2. Care e diferența între `button_a.is_pressed()` și `button_a.was_pressed()`?  
3. Ce valoare are `score` după `score = 5` și `score += 2`?  
4. De ce scriem `display.scroll(str(score))`?  
5. Ce diferență e între `=` și `==`?  
6. Ce trebuie să fie la fel la două plăci ca să comunice prin radio?  
7. Ce face `return` într-o funcție?  
8. Când ai nevoie de `global`?  
9. Ce face `range(3)` într-un `for`?  
10. De ce citim butoanele **o singură dată** la începutul fiecărei ture?

**Autoevaluare** (bifează sincer):

| Știu să… | Da | Aproape | Încă nu |
|----------|----|---------|---------|
| scriu și trimit un program pe placă | ☐ | ☐ | ☐ |
| desenez imagini și pixeli | ☐ | ☐ | ☐ |
| folosesc butoane și `if / elif / else` | ☐ | ☐ | ☐ |
| folosesc variabile și comparații | ☐ | ☐ | ☐ |
| citesc senzori (temperatură, lumină, mișcare) | ☐ | ☐ | ☐ |
| trimit și primesc mesaje prin radio | ☐ | ☐ | ☐ |
| scriu funcții cu parametri | ☐ | ☐ | ☐ |
| traduc un program din blocuri în Python | ☐ | ☐ | ☐ |
| îmi prezint proiectul | ☐ | ☐ | ☐ |

**Răspunsuri pentru profesor:**
1. Aduce în program toate funcțiile plăcii (`display`, `button_a`, `sleep` …). 2. `is_pressed()` e adevărat **cât timp** ții apăsat; `was_pressed()` e adevărat dacă butonul **a fost apăsat** de la ultima verificare. 3. `7`. 4. `scroll` vrea **text**, iar `str()` transformă numărul în text. 5. `=` pune o valoare într-o variabilă; `==` **compară** două valori. 6. Același **grup** (`radio.config(group=…)`) și `radio.on()`. 7. Trimite o valoare înapoi celui care a apelat funcția. 8. Când o funcție **schimbă** o variabilă creată în afara ei. 9. Repetă de 3 ori, cu `i` luând valorile `0, 1, 2`. 10. Pentru că `was_pressed()` „uită” apăsarea după ce e citită; dacă o citim de două ori, a doua oară răspunsul poate fi greșit.

---

## Greșeli frecvente
1. **„Programul nu pornește la expoziție”** — reîncarcă-l pe placă înainte și ai o copie.  
2. **„Prezint prea repede”** — respiră și spune câte o idee pe rând.  
3. **„Nu știu să explic codul”** — alege **3 rânduri** importante și explică-le.  
4. **„Nu știu răspunsul la o întrebare”** — „Nu știu încă, dar aș încerca…” e un răspuns bun.  
5. **„Am uitat să salvez îmbunătățirea”** — salvează versiunea nouă cu același nume.  
6. **„Am ascuns greșelile”** — arată și ce a fost greu. E parte din poveste.

---

## De făcut azi — „Standul meu Coder”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Program funcțional pe placă · fișă completă · cod cu comentarii |
| **Complet** | Minim + prezentare de 2 minute + o îmbunătățire după păreri + Verificarea Modulului 1 |

### Pasul 1 — Minim
- [ ] Testul final de 10 minute făcut  
- [ ] Comentarii și nume clare în cod  
- [ ] Fișa completată  
- [ ] Programul rulează la stand  

**→ Minim când:** un vizitator folosește programul tău fără ajutor.

### Pasul 2 — Complet
- [ ] Prezentarea de 2 minute ținută  
- [ ] Ai primit cel puțin 3 cartonașe de păreri  
- [ ] O îmbunătățire făcută și notată  
- [ ] Verificarea Modulului 1 completată  
- [ ] Numele fișierului e `MP1_L10`  

**Badge:** Completezi **Complet + Verificarea** și primești insigna **micro:bit Coder**.

---

## Bonus (după Complet)
- [ ] Citește codul unui coleg și găsește **o idee** pentru el  
- [ ] Rescrie un program din Modulul 1 mai scurt, cu o funcție  
- [ ] Desenează o **hartă** a programului: ce apelează ce  
- [ ] Gândește-te la un proiect pentru **Modulul 2** (Proiecte Python)

## Recapitulare rapidă
1. Python pe micro:bit: `from microbit import *`.  
2. Imagini, butoane, variabile, senzori, radio, funcții.  
3. Codul bun e **clar**: comentarii, nume bune, rânduri goale.  
4. Prezentarea are ordine: ce face, cum merge, ce a fost greu, ce adaug.  
5. Citim și îmbunătățim codul altora.

## Schema pe scurt *(pe foaie)*

stand → test → comentarii → fișă → prezentare → păreri → îmbunătățire → badge

**Quiz scurt:**  
- Ce pui pe fișa proiectului?  
- De ce comentezi codul?  
- Ce faci cu o părere primită?  
- Care e prima regulă la prezentare?

## Temă
Alege **un proiect** din Modulul 1 și scrie 3 rânduri: ce a mers bine, ce a fost greu, ce ai face altfel. Gândește-te ce ai vrea să construiești în **Modulul 2**.
