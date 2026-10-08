# Lecția 10 — Expoziția Python Pro + badge
**Modulul 2 · Proiecte Python**  
**Code Maker Club · micro:bit Python Pro**

> Azi e **ziua expoziției finale**! Îți prezinți proiectul, explici o **parte din cod**, primești păreri și primești insigna **micro:bit Python Pro**.  
> Proiect: **„Standul meu Python Pro”** · `Prenume_Nume_MP2_L10`

---

## Obiectiv
La finalul orei îți prezinți proiectul clar, explici **trei rânduri de cod** și completezi **Verificarea Modulului 2**.  
**Minim:** proiectul rulează pe placă, iar fișa lui e completă.  
**Complet:** Minim + **prezentare de 2 minute** + o **îmbunătățire** făcută după părerile colegilor.

## De ce contează
Un proiect devine real abia când îl arăți altora. Cei mai buni programatori **explică** ce au făcut, **ascultă** păreri și **îmbunătățesc**. Azi exersezi toate trei.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap Modul 2: ce am construit? |
| 10–40 | Pregătim standul: test final, cod curat, fișă |
| 40–50 | Repetăm prezentarea în perechi |
| 50–90 | **Expoziția**: prezentări + vizitarea standurilor |
| 90–100 | Îmbunătățim după păreri |
| 100–120 | **Verificarea Modulului 2** + autoevaluare + badge |

**Unelte azi:** proiectul tău din Modul 2 (de preferat **L9: Cutia Exploratorului**) · cartonașe de păreri · afiș mic

---

## Pas cu pas

### 1) Alegem proiectul de expus
Alege **un** proiect: **Cutia Exploratorului** (L9), **Labirintul înclinat** (L6), **Pianul de buzunar** (L4), **Mesaje cu cod** (L7), **Recordul păstrat** (L8), **Busola** (L5), **Ploaia de pixeli** (L3) sau **Panoul de misiuni** (L1). Verifică că rulează pe placă (și, dacă folosește radio, pe **două** plăci).

### 2) Testul final (10 minute)
- [ ] Programul e încărcat pe placă  
- [ ] Ai testat fiecare buton, senzor și meniu  
- [ ] Ai testat cazurile ciudate (ce se întâmplă dacă apeși de 10 ori, sau dacă fișierul lipsește?)  
- [ ] Radio: ambele plăci sunt în **același grup**, iar grupul **nu** e folosit de alte perechi  
- [ ] Ai o copie a programului și un plan B (cablu, altă placă)

### 3) Codul curat
Ca să poți explica ușor, codul trebuie să fie **frumos**:
- **comentarii** la părțile importante;  
- **nume clare** (`record`, `jurnal`, nu `x`, `y2`);  
- **funcții** mici, cu un singur rol;  
- **constante** cu litere mari (`PRAG`, `DURATA`).

```python
from microbit import *

PRAG_CALD = 26      # grade Celsius

def e_cald():
    return temperature() > PRAG_CALD      # True sau False

while True:
    if e_cald():
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
- **Ce am folosit?** (liste, funcții, fișiere, radio, busolă …)  
- **Cine l-a făcut** (prenumele tău)

### 5) Prezentarea de 2 minute
1. **Salut:** „Mă numesc … și vă prezint …”  
2. **Ce face:** arată proiectul în funcțiune.  
3. **Cum funcționează:** alege **3 rânduri de cod** și explică-le.  
4. **Ce a fost greu:** o greutate și cum ai rezolvat-o.  
5. **Ce ai adăuga:** o idee pentru versiunea 2.  
6. **Întrebări:** „Aveți întrebări?”

**Exersează în perechi:** unul prezintă, celălalt cronometrează și spune **un lucru bun** și **o sugestie**.

### 6) Expoziția
- Jumătate din clasă **prezintă**, jumătate **vizitează**; apoi schimbați rolurile.  
- Vizitatorii **încearcă** proiectul, citesc o parte din cod și lasă un cartonaș:

| Rubrica | Ce scrii |
|---------|----------|
| Un lucru bun | Ce mi-a plăcut |
| O parte din cod pe care am înțeles-o | Care și de ce |
| O idee | Ce ar putea fi îmbunătățit |

### 7) Îmbunătățirea
Citește cartonașele. Alege **o idee** și fă-o în 10 minute (de exemplu un comentariu mai clar, un nume mai bun, o funcție în plus). Notează pe fișă ce ai schimbat.

---

## Verificarea Modulului 2
Răspunde pe foaie, fără să te uiți în lecții. Răspunsurile sunt la final.

1. Ce dă `10 % 4`? La ce îți folosește `%` într-un meniu?  
2. Ce valori are `range(2, 10, 3)`?  
3. Ce dă `len(["a", "b", "c"])` și care e indexul ultimului element?  
4. Ce înseamnă nota `"c4:4"`?  
5. De ce trebuie calibrată busola?  
6. Cum citești al treilea caracter din rândul al doilea al unei hărți `harta`?  
7. Ce face `"E:3".split(":")`?  
8. La ce folosește `try / except`?  
9. Cum scrii într-un fișier numărul `7`?  
10. Ce face `break` într-o buclă?

**Autoevaluare** (bifează sincer):

| Știu să… | Da | Aproape | Încă nu |
|----------|----|---------|---------|
| organizez un program în funcții și meniu | ☐ | ☐ | ☐ |
| folosesc liste | ☐ | ☐ | ☐ |
| folosesc bucle `for` și `while` | ☐ | ☐ | ☐ |
| cânt note și melodii | ☐ | ☐ | ☐ |
| folosesc busola | ☐ | ☐ | ☐ |
| citesc înclinarea și o hartă ca text | ☐ | ☐ | ☐ |
| trimit și primesc mesaje cu cod prin radio | ☐ | ☐ | ☐ |
| salvez și citesc din fișier | ☐ | ☐ | ☐ |
| îmi prezint proiectul | ☐ | ☐ | ☐ |

**Răspunsuri pentru profesor:**
1. `2`. Ține indexul meniului în cerc (`(mod + 1) % NR`). 2. `2, 5, 8`. 3. `3`; ultimul index este `2` (sau `-1`). 4. Nota **do**, octava 4, durata 4. 5. Ca să „învețe” câmpul magnetic din locul în care ești și să arate corect. 6. `harta[1][2]` (rândul 1, coloana 2; se numără de la 0). 7. Taie textul la `:` și dă lista `["E", "3"]`. 8. Prinde o eroare (de exemplu `OSError` sau `ValueError`) ca programul să continue. 9. `with open("nume.txt", "w") as f:` și `f.write(str(7))`. 10. Iese imediat din buclă.

---

## Greșeli frecvente
1. **„Proiectul nu pornește la expoziție”** — reîncarcă-l înainte, ai copie și plan B.  
2. **„Radio nu merge în sală”** — prea multe perechi în același grup; alege altul.  
3. **„Recordul s-a șters”** — ai reîncărcat programul; folosește RESET.  
4. **„Prezint prea repede”** — respiră și spune câte o idee pe rând.  
5. **„Nu știu să explic codul”** — alege 3 rânduri și explică-le pe rând.  
6. **„Nu știu răspunsul la o întrebare”** — „Nu știu încă, dar aș încerca…” e un răspuns bun.

---

## De făcut azi — „Standul meu Python Pro”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Proiect funcțional pe placă · fișă completă · cod cu comentarii |
| **Complet** | Minim + prezentare de 2 minute + o îmbunătățire după păreri + Verificarea Modulului 2 |

### Pasul 1 — Minim
- [ ] Testul final de 10 minute făcut  
- [ ] Comentarii și nume clare în cod  
- [ ] Fișa completată  
- [ ] Proiectul rulează la stand  

**→ Minim când:** un vizitator folosește proiectul tău fără ajutor.

### Pasul 2 — Complet
- [ ] Prezentarea de 2 minute ținută  
- [ ] Ai primit cel puțin 3 cartonașe de păreri  
- [ ] O îmbunătățire făcută și notată  
- [ ] Verificarea Modulului 2 completată  
- [ ] Numele fișierului e `MP2_L10`  

**Badge:** Completezi **Complet + Verificarea** și primești insigna **micro:bit Python Pro**.

---

## Bonus (după Complet)
- [ ] Citește codul unui coleg și găsește **o idee** pentru el  
- [ ] Combină **două proiecte** (de exemplu pianul + labirintul)  
- [ ] Desenează **harta funcțiilor**: care funcție apelează pe care  
- [ ] Gândește-te ce ai vrea să construiești **după** acest curs (sunet? roboți? senzori externi?)

## Recapitulare rapidă
1. Modulul 2: meniuri, liste, bucle, sunet, busolă, hărți, radio cu cod, fișiere.  
2. Un program mare = funcții mici, testate pe rând.  
3. Un protocol bun: `tip:valoare`.  
4. Datele importante se salvează în fișier.  
5. Prezentare: ce face, cum merge, ce a fost greu, ce adaug.

## Schema pe scurt *(pe foaie)*

stand → test → cod curat → fișă → prezentare → păreri → îmbunătățire → badge **Python Pro**

**Quiz scurt:**  
- Ce pui pe fișa proiectului?  
- Câte rânduri de cod explici la prezentare?  
- Ce faci cu o părere primită?  
- Unde se păstrează recordul?

## Temă
Scrie trei rânduri: ce ai învățat în cele **două module Python**, ce ți-a plăcut cel mai mult și ce ai vrea să construiești mai departe.
