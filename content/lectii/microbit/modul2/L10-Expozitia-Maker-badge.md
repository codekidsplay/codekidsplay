# Lecția 10 — Expoziția Maker + badge
**Modulul 2 · Proiecte Maker (blocuri + radio)**  
**Code Maker Club · micro:bit Maker**

> Azi e **ziua expoziției**! Îți pregătești standul, îți prezinți proiectul, primești păreri de la colegi și primești insigna **micro:bit Maker**.  
> Proiect: **„Standul meu Maker”** · `Prenume_Nume_MB2_L10`

---

## Obiectiv
La finalul orei îți prezinți proiectul clar și frumos, dai și primești păreri și completezi **Verificarea Modulului 2**.  
**Minim:** proiectul rulează pe plăci reale, iar fișa lui e completă.  
**Complet:** Minim + **prezentare de 2 minute** + o **îmbunătățire** făcută după părerile colegilor.

## De ce contează
Un proiect devine un **lucru real** abia când îl arăți altora. Cei mai buni makeri nu doar construiesc: **explică** ce au făcut, **ascultă** păreri și **îmbunătățesc**. Azi exersezi toate trei.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap Modul 2: ce am construit? |
| 10–40 | Pregătim standul: test final, fișă, afiș |
| 40–50 | Repetăm prezentarea în perechi |
| 50–90 | **Expoziția**: prezentări + vizitarea standurilor |
| 90–100 | Îmbunătățim după păreri |
| 100–120 | **Verificarea Modulului 2** + autoevaluare + badge |

**Unelte azi:** proiectul tău din Modul 2 (de preferat **L9**) · cartonașe de păreri · afiș mic

---

## Pas cu pas

### 1) Alegem proiectul de expus
Alege **unul** dintre proiectele Modulului 2 (de obicei **L9: Cheia și seiful radio**, dar poți alege și **Vânătoarea cald–rece**, **Stația meteo**, **Paznicul** sau **Semaforul**). Verifică că rulează pe plăci reale.

### 2) Testul final (10 minute)
- [ ] Programele sunt descărcate pe plăcile corecte  
- [ ] Bateriile sau cablurile funcționează  
- [ ] Ambele plăci sunt în **același grup**  
- [ ] Ai testat proiectul de 3 ori la rând  
- [ ] Ai un plan B dacă o placă nu pornește (programul salvat, cablu de rezervă)

### 3) Standul și afișul
Pe o foaie A4 scrii:
- **Titlul** proiectului  
- **Ce face?** (într-o propoziție)  
- **Cum se folosește?** (2–3 pași)  
- **Ce am folosit?** (radio, pini, variabile, bucle …)  
- **Cine l-a făcut** (prenumele tău)

### 4) Prezentarea de 2 minute
Folosește ordinea:
1. **Salut:** „Mă numesc … și vă prezint …”  
2. **Ce face:** arată proiectul în funcțiune.  
3. **Cum funcționează:** o idee-cheie (de exemplu „seiful compară codul primit cu cel secret”).  
4. **Ce a fost greu:** o greutate și cum ai rezolvat-o.  
5. **Ce ai adăuga:** o idee pentru versiunea 2.  
6. **Întrebări:** „Aveți întrebări?”

**Exersează în perechi:** unul prezintă, celălalt cronometrează și spune **un lucru bun** și **o sugestie**.

### 5) Expoziția
- Jumătate din clasă **prezintă**, jumătate **vizitează**; apoi schimbați rolurile.  
- Vizitatorii **încearcă** proiectul, pun o întrebare și lasă un cartonaș cu:

| Rubrica | Ce scrii |
|---------|----------|
| Un lucru bun | Ce mi-a plăcut |
| Încă un lucru bun | Alt lucru care mi-a plăcut |
| O idee | Ce ar putea fi îmbunătățit |

### 6) Îmbunătățirea
Citește cartonașele. Alege **o idee** și fă-o în 10 minute (de exemplu un mesaj mai clar sau un desen nou pe ecran). Notează pe fișă ce ai schimbat.

---

## Verificarea Modulului 2
Răspunde pe foaie, fără să te uiți în lecții. Răspunsurile sunt la final.

1. Ce trebuie să aibă la fel două plăci ca să comunice prin radio?  
2. Ce face blocul `radio send number 5`?  
3. De ce folosim **praguri** când măsurăm puterea semnalului?  
4. Care picior al LED-ului se leagă spre pin și de ce avem nevoie de rezistență?  
5. Ce diferență e între `repeat 10 times` și `while alarma = 1`?  
6. Ce face funcția `stinge` din semafor și de ce e utilă?  
7. Cum găsești recordul de temperatură maximă?  
8. Ce este o **listă** (array)? Dă un exemplu.  
9. De ce trimitem **nume + valoare** în stația meteo?  
10. Care sunt cei 5 pași ai metodei doctorului de cod?

**Autoevaluare** (bifează sincer):

| Știu să… | Da | Aproape | Încă nu |
|----------|----|---------|---------|
| trimit și primesc mesaje radio | ☐ | ☐ | ☐ |
| măsor cât de departe e o altă placă | ☐ | ☐ | ☐ |
| comand un LED extern prin pini | ☐ | ☐ | ☐ |
| fac un program cu stări (armat / alarmă) | ☐ | ☐ | ☐ |
| folosesc liste și medii | ☐ | ☐ | ☐ |
| fac un sistem cu emițător și receptor | ☐ | ☐ | ☐ |
| caut și repar greșeli în programe | ☐ | ☐ | ☐ |
| îmi prezint proiectul | ☐ | ☐ | ☐ |

**Răspunsuri pentru profesor:**
1. Același **grup**. 2. Trimite numărul `5` către plăcile din grup. 3. Semnalul oscilează; un interval e mai sigur decât o valoare exactă. 4. Piciorul **lung (+)** spre pin; rezistența protejează LED-ul de curent prea mare. 5. `repeat` merge de un număr fix de ori; `while` merge cât timp condiția e adevărată. 6. Stinge toate LED-urile; evită repetarea acelorași trei blocuri. 7. Cu `max of maxim and temperature`, la fiecare măsurătoare. 8. O înșiruire de valori într-o variabilă, de exemplu temperaturile salvate. 9. Ca receptorul să știe ce reprezintă valoarea (temperatură sau lumină). 10. Ce trebuie / ce face / unde se rupe / o schimbare / raport.

---

## Greșeli frecvente
1. **„Proiectul nu pornește la expoziție”** — verifică încărcarea plăcilor înainte, ai plan B.  
2. **„Radio nu merge în sală”** — prea multe perechi în același grup. Fiecare pereche își verifică **numărul de grup**.  
3. **„Prezint prea repede”** — respiră și spune câte o idee pe rând.  
4. **„Nu știu ce să răspund la întrebări”** — „Nu știu încă, dar aș încerca…” e un răspuns bun.  
5. **„Am uitat să salvez îmbunătățirea”** — salvează versiunea nouă.  
6. **„Am ascuns greșelile”** — arată și ce a fost greu. E parte din poveste.

---

## De făcut azi — „Standul meu Maker”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Proiect funcțional pe plăci reale · afiș/fișă completă |
| **Complet** | Minim + prezentare de 2 minute + o îmbunătățire după păreri + Verificarea Modulului 2 |

### Pasul 1 — Minim
- [ ] Testul final de 10 minute făcut  
- [ ] Afișul completat  
- [ ] Proiectul rulează la stand  

**→ Minim când:** un vizitator folosește proiectul tău fără ajutor.

### Pasul 2 — Complet
- [ ] Prezentarea de 2 minute ținută  
- [ ] Ai primit cel puțin 3 cartonașe de păreri  
- [ ] O îmbunătățire făcută și notată  
- [ ] Verificarea Modulului 2 completată  
- [ ] Numele fișierului e `MB2_L10`  

**Badge:** Completezi **Complet + Verificarea** și primești insigna **micro:bit Maker**.

---

## Bonus (după Complet)
- [ ] Ajută un coleg să-și repare proiectul  
- [ ] Filmează (cu acordul profesorului) un clip de 20 de secunde cu proiectul  
- [ ] Gândește o „versiune 2” și scrie 3 schimbări  
- [ ] Desenează pe foaie un **ambalaj** pentru produsul tău

## Recapitulare rapidă
1. Ai învățat **radio**, **pini**, **liste**, **stări**, **depanare**.  
2. Un proiect bun are **plan**, **test**, **prezentare**.  
3. Părerile colegilor ajută proiectul să crească.  
4. Salvează versiunea finală cu un nume clar.  
5. Ai muncit ca un adevărat **maker**.

## Schema pe scurt *(pe foaie)*

Plan → Construit → Testat → Prezentat → Păreri → Îmbunătățit

**Quiz scurt:**  
- Care a fost cea mai grea parte a proiectului tău?  
- Ce ai schimbat după păreri?  
- Ce ai vrea să adaugi într-o versiune 2?  
- Care a fost cel mai interesant proiect de la colegi?

## Ce urmează
Ai terminat cursul **micro:bit** cu blocuri! Pentru cei de **10+ ani** urmează cursul **micro:bit Python**: aceeași placă, dar cu **cod scris**, nu cu blocuri. Un mic exemplu:

```python
from microbit import *

display.show(Image.HEART)
```
Programul arată o inimă, exact ca blocul `show icon [Heart]`. În Python vei învăța să faci aceleași lucruri (și mai multe!) scriind rândurile tu însuți.

## Temă
Scrie o scrisoare de 5 rânduri către „tu din viitor”: ce ai construit cu micro:bit, ce a fost greu și ce ai vrea să construiești mai departe.
