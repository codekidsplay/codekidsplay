# Lecția 7 — Stația meteo la distanță
**Modulul 2 · Proiecte Maker (blocuri + radio)**  
**Code Maker Club · micro:bit Maker**

> Azi construiești un **sistem din două plăci**: **stația** stă afară (sau la fereastră) și măsoară, iar **receptorul** stă lângă tine și îți arată ce a aflat stația.  
> Proiect: **„Stația meteo la distanță”** · `Prenume_Nume_MB2_L07_statie` și `…_receptor`

---

## Obiectiv
La finalul orei trimiți **măsurători cu nume** (de exemplu „temp” și „lum”) prin radio și le primești pe cealaltă placă.  
**Minim:** stația trimite temperatura și lumina; receptorul arată **T** (A) sau **L** (B).  
**Complet:** Minim + **alertă** când temperatura trece de un prag și mesajul „fără semnal” dacă stația tace prea mult.

## De ce contează
Stațiile meteo adevărate stau pe un deal, iar prognoza ta o primești pe telefon. Între ele sunt **trimiteri de date**. Azi faci exact asta, în clasa ta: o placă măsoară, alta afișează. Se numește un **sistem cu emițător și receptor**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6: măsurători, liste |
| 10–25 | Scrisoare cu etichetă: de ce trimitem **nume + valoare** |
| 25–55 | Programul stației (**Minim**, placa 1) |
| 55–90 | Programul receptorului (**Minim**, placa 2) |
| 90–112 | Alerta și „fără semnal” (**Complet**) |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** `radio send value … = …` · `on radio received (name, value)` · `radio set group` · `running time (ms)` · `if / else if` · variabile · `forever`

---

## Pas cu pas

### 1) Scrisoarea cu etichetă
Dacă îți dau un singur număr, `23`, nu știi dacă e temperatura, lumina sau câți pași am făcut. Dacă îți dau **„temp = 23”**, înțelegi imediat. Radio poate trimite exact așa: un **nume** și o **valoare**.

### 2) Lucrăm în perechi, cu **două programe**
- **Placa 1 = stația** → proiect: `Prenume_Nume_MB2_L07_statie`  
- **Placa 2 = receptorul** → proiect: `Prenume_Nume_MB2_L07_receptor`

Amândouă folosesc **același grup** (numărul perechii, de exemplu `9`).

### 3) Programul stației — Minim
Stația măsoară și trimite la fiecare 2 secunde.

```text
on start
    radio set group 9

forever
    radio send value "temp" = temperature
    radio send value "lum" = light level
    pause (ms) 2000
```
- Blocul se numește **radio send value** și are două locuri: **numele** (text, între ghilimele) și **valoarea**.  
- Numele sunt scurte și fără diacritice: `temp` și `lum`.

### 4) Programul receptorului — Minim
Receptorul primește mesajele, își notează valorile în variabile și le arată la cerere.

Variabile: `temp`, `lum`, `ecran`.

```text
on start
    radio set group 9
    set temp to 0
    set lum to 0
    set ecran to 0

on radio received (name, value)
    if name = "temp" then
        set temp to value
    else if name = "lum" then
        set lum to value

on button A pressed
    set ecran to 1

on button B pressed
    set ecran to 2

forever
    if ecran = 1 then
        show string "T"
        show number temp
    else if ecran = 2 then
        show string "L"
        show number lum
    pause (ms) 100
```

> **Despre blocul de primire:** în **Radio**, `on radio received` are variantă cu **nume și valoare**. Dacă nu o vezi, apasă pe săgeata de lângă `receivedNumber` sau caută în sertar blocul „on radio received name value”. Pentru a compara numele cu un text (`"temp"`), folosește blocul de comparație din **Text**, dacă cel din **Logic** nu primește textul.

**Ce vezi pe ecran la receptor după A:** `T` și apoi temperatura trimisă de stație (de exemplu `22`). După B: `L` și lumina (de exemplu `140`).

**Test:** pune stația lângă fereastră sau în mână ca să se încălzească. Peste câteva secunde vezi temperatura crescând pe receptor.

### 5) Complet — alerta de căldură
Adăugăm trei variabile: `prag` (de exemplu `28`), `alerta` (`0` sau `1`) și `ultimul` (momentul ultimului mesaj primit).

În `on start` adaugi: `set prag to 28`, `set alerta to 0`, `set ultimul to 0`.

În blocul de primire, la `temp`, verificăm pragul:

```text
on radio received (name, value)
    set ultimul to running time (ms)
    if name = "temp" then
        set temp to value
        if temp > prag then
            set alerta to 1
        else
            set alerta to 0
    else if name = "lum" then
        set lum to value
```

În `forever` punem **alerta pe primul loc**:

```text
forever
    if alerta = 1 then
        show icon [Sad]
        pause (ms) 300
        clear screen
        pause (ms) 300
    else if running time (ms) - ultimul > 6000 then
        show icon [Asleep]
    else if ecran = 1 then
        show string "T"
        show number temp
    else if ecran = 2 then
        show string "L"
        show number lum
    pause (ms) 100
```
- Dacă `temp` e peste prag, pâlpâie `Sad`.  
- Dacă nu am primit nimic de **6 secunde** (`6000` ms), receptorul arată `Asleep`: „stația nu mai vorbește”. Pentru asta ai nevoie de variabila `ultimul` (pusă pe `0` în `on start`).  
- Altfel, arată `T` sau `L`.  
- Pentru test, setează `prag` mai jos (de exemplu `24`) și încălzește stația în mână.

### 6) Cine e vinovat? (depanare logică)
Receptorul nu arată nimic. Care e **ordinea de verificat**?
1. Stația e pornită și trimite? (Pune un `show icon` după fiecare `radio send` doar pentru test.)  
2. **Același grup** pe amândouă?  
3. Numele sunt **identice** (`temp` și `temp`, nu `Temp`)?  
4. `ecran` e `1` sau `2`? (Ai apăsat A sau B?)  
5. Plăcile sunt la o distanță mică?

---

## Greșeli frecvente
1. **„Pe receptor rămâne 0”** — grupuri diferite sau numele nu se potrivesc.  
2. **„Alerta pâlpâie mereu”** — `prag` e prea mic.  
3. **„Receptorul arată Asleep chiar de la început”** — e normal: trec 6 secunde fără mesaj; la primul mesaj dispare.  
4. **„Nu pot compara textul”** — folosește blocul de comparație pentru text (din **Text**).  
5. **„Ecranul se încurcă”** — butoanele desenează direct. Lasă-le să schimbe doar `ecran`.  
6. **„Temperatura nu se schimbă”** — stația trimite o dată la 2 secunde; așteaptă.

---

## De făcut azi — „Stația meteo la distanță”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Stația trimite `temp` și `lum` · receptorul arată **T** (A) și **L** (B) |
| **Complet** | Minim + alertă la `temp > prag` + `Asleep` fără semnal 6 secunde |

### Pasul 1 — Minim
- [ ] Două proiecte, câte unul pentru fiecare placă  
- [ ] Același grup, aceleași nume (`temp`, `lum`)  
- [ ] Receptorul păstrează valorile în `temp` și `lum`  
- [ ] Merge pe cele două plăci reale  

**→ Minim când:** schimbi temperatura stației și vezi numărul schimbându-se pe receptor.

### Pasul 2 — Complet
- [ ] `prag` și `alerta` funcționează  
- [ ] `ultimul` + `running time (ms)` pentru `Asleep`  
- [ ] Alerta are prioritate în `forever`  
- [ ] Numele fișierelor sunt `MB2_L07_statie` și `MB2_L07_receptor`  

---

## Bonus (după Complet)
- [ ] Trimite și **a treia valoare**: câte secunde a funcționat stația (`running time (ms) / 1000`)  
- [ ] Pe stație, A+B oprește trimiterea (o variabilă `trimite`)  
- [ ] Fă alerta și pentru **lumină** (de exemplu, `lum < 20` = „e întuneric”)  
- [ ] Desenează cum ar arăta o rețea cu **mai multe stații** și un singur receptor

## Recapitulare rapidă
1. `radio send value "temp" = …` trimite **un nume** și **o valoare**.  
2. Receptorul verifică **numele** ca să știe ce a primit.  
3. Valorile primite se păstrează în **variabile**.  
4. `running time (ms)` ajută să observăm când stația nu mai trimite.  
5. Un sistem are mai multe plăci cu **roluri**: emițător și receptor.

## Schema pe scurt *(pe foaie)*

Stația: `forever` → măsoară → `radio send value` → aer → Receptor: `on radio received` → variabile → `forever` arată T / L / alertă

**Quiz scurt:**  
- De ce trimitem un nume împreună cu valoarea?  
- Ce se întâmplă dacă stația și receptorul au grupuri diferite?  
- Ce arată receptorul când stația nu mai trimite?  
- Unde păstrează receptorul ultima valoare?

## Temă
Alege **locul perfect** pentru o stație meteo la școală sau acasă (afară, la umbră, ferită de ploaie). Desenează locul și scrie de ce l-ai ales.
