# Lecția 7 — Codeblocks I
**Modulul 5 · Avansat și proiectare tehnică**  
**Code Maker Club · Design Pro**  
**Public:** recomandat **10+** · lecție **opțională** pentru cei sub 12 ani *(au varianta fără cod)*

> Azi construiești forme cu **blocuri de cod** în loc de mouse: o **buclă** repetă o comandă, iar un număr schimbat schimbă tot obiectul.  
> Proiect: **„Șirul de cuburi”** · `Prenume_Nume_T5_L07`

---

## Obiectiv
La finalul orei ai un **șir de 5 cuburi** egale, la distanțe egale.  
**Minim (cu Codeblocks):** un program cu o **buclă** care se repetă de **5 ori**: face un cub **10·10·10** și îl mută **15 mm** spre dreapta · apeși **Run** și apare șirul.  
**Minim (fără Codeblocks):** același șir făcut cu **Ctrl+D** și mutarea de 15 mm + 2 propoziții pe foaie despre ce ar face o buclă.  
**Complet:** Minim + două **variabile** (`n` = câte cuburi, `pas` = cât de departe) + o **scară**: fiecare cub cu **5 mm mai înalt** decât cel dinainte.

## De ce contează
Calculatorul e bun la lucruri care se repetă. Dacă îi spui „fă un cub, mută-te, repetă de 5 ori”, el face lucrul **perfect**, de oricâte ori.  
Dacă schimbi un număr, schimbi tot obiectul: așa gândesc inginerii care fac piese **parametrice**.

**Pregătire (profesor):** deschide înainte **Codeblocks** în contul clasei și notează cum se numesc blocurile (pentru forme, mutare, repetare, variabile). Numele din lecție sunt descrieri — pe ecran pot arăta puțin diferit. **Verifică în 2 minute cum lucrează blocul de mutare**: pune două cuburi cu o mutare între ele și vezi dacă mutarea mișcă *toate formele de deasupra ei* sau doar ultima. Lecția presupune că mută tot ce e deasupra lui în aceeași stivă (de aceea, într-o buclă, cuburile vechi se mută și ele la fiecare repetare, iar distanța dintre cuburi rămâne 15).

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ce e un program? Exemplu pe foaie: „Repetă de 5 ori: fă un cub, mută-te 15 la dreapta” |
| 15–50 | Pas cu pas: un cub din cod · bucla |
| 50–100 | Minim → Complet (variabile, scara) |
| 100–120 | Verificare, recap, salvare |

**Unelte azi:** **Codeblocks** *(blocuri pentru formă, mutare, repetare, variabile)* · **Run** *(rulează programul)* · **View Cube** · **Ctrl+D** *(varianta fără cod)*

---

## Pas cu pas *(cu Codeblocks)*

### 1) Proiect nou
1. Creezi un design nou · alegi **Codeblocks** *(în meniul de creare, sau din lista de unelte, în funcție de cont)*  
2. Nume: `Prenume_Nume_T5_L07`

### 2) Un cub din cod
1. Din blocurile de **forme** tragi blocul care **creează un cub (box)**  
2. Îi pui mărimile **10 · 10 · 10**  
3. Apeși **Run** → apare un cub pe plan  
4. Ștergi sau resetezi și treci mai departe

### 3) Bucla
1. Din blocurile de **repetare** tragi **„repetă de … ori”** și pui **5**  
2. În ea pui blocul care creează cubul *(10·10·10)*  
3. **Sub** acesta, în aceeași buclă, pui blocul care **mută** pe axa X cu **15**  
4. Apeși **Run**  
5. Rezultat: 5 cuburi, la 15 mm unul de altul, cu 5 mm între ele

> **Ordinea contează:** *„creează cubul, apoi mută-te”*. Încearcă și invers și compară cele două rezultate pe ecran *(șirul își schimbă poziția față de început)*.

### 4) Complet — variabile
1. Creezi variabila **n** și o pui pe **5**  
2. Creezi variabila **pas** și o pui pe **15**  
3. În buclă, în loc de **5** pui **n**, iar la mutare pui **pas**  
4. Schimbi **n** în 8 → **Run**: apar 8 cuburi  
5. Schimbi **pas** în 20 → **Run**: sunt mai depărtate

### 5) Complet — scara
1. Creezi variabila **h** și o pui pe **10** înainte de buclă  
2. Cubul din buclă are înălțimea **h**  
3. La sfârșitul buclei: **h devine h + 5**  
4. **Run**: cuburile cresc ca niște trepte  
5. Pe foaie: cât e înălțimea ultimului cub cu n = 5? *(10, 15, 20, 25, **30**)*

---

## Varianta fără Codeblocks *(Minim pentru cine nu face cod)*

1. **Box** **10 · 10 · 10**  
2. Snap Grid **1.0 mm** · **Ctrl+D** → muți copia **15 mm spre dreapta** *(15 apăsări de săgeată la Snap 1.0)* → **Ctrl+D** de încă 3 ori *(fiecare Ctrl+D repetă aceeași mutare)* → **5 cuburi**  
3. Din **Top**: 5 cuburi egale, la 5 mm distanță  
4. Pe foaie, 2 propoziții: *„Dacă aș avea o buclă, aș scrie …”* și *„Cu o variabilă n aș putea …”*  
5. **Complet fără cod:** al doilea cub 15 mm înălțime *(tastezi înălțimea)*, al treilea 20 etc., apoi **L** → jos *(toate cuburile pe plan)*

---

## Greșeli frecvente
1. **Cuburile sunt unul peste altul** — lipsește blocul de mutare din buclă.  
2. **Un singur cub** — blocurile sunt în afara buclei, nu înăuntru.  
3. **Prea multe cuburi** — ai pus 50 în loc de 5. Resetează.  
4. **Nu se întâmplă nimic** — n-ai apăsat **Run**.  
5. **Cuburile se ating** — pasul e 10 sau mai mic. Pune 15.  
6. **Variabila n nu schimbă nimic** — bucla folosește tot numărul 5, nu variabila.  
7. **Scara nu crește** — lipsește blocul „h devine h + 5”.

---

## De făcut azi — „Șirul de cuburi”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim cu cod** | Buclă de 5 · cub 10·10·10 · mutare 15 · Run reușit |
| **Minim fără cod** | 5 cuburi cu Ctrl+D la 15 mm · 2 propoziții despre buclă |
| **Complet** | + variabile n și pas · scara cu h + 5 |

### Pasul 1 — Minim
- [ ] Program cu buclă **sau** 5 cuburi cu Ctrl+D  
- [ ] Cuburi egale, la 5 mm distanță  
- [ ] Salvat `T5_L07`  

### Pasul 2 — Complet
- [ ] Variabile **n** și **pas**  
- [ ] Scara 10 → 30  
- [ ] Două rulări cu valori diferite  
- [ ] **Color**

---

## Bonus (extra — după Complet)
- [ ] Șirul pe **verticală** *(mutare pe Z)* — un turn de 5 cuburi  
- [ ] Două bucle, una într-alta: un **zid** de 5 × 3 cuburi  
- [ ] Pe foaie: ce obiect din oraș poți construi cu o buclă? *(garduri, ferestre, scări)*

## Recapitulare rapidă
1. **Buclă** = repetă aceleași comenzi  
2. **Variabilă** = un număr cu nume, pe care îl poți schimba  
3. Ordinea contează: întâi creezi, apoi muți  
4. Fără cod: **Ctrl+D** face același lucru

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** repetă 5 ori: cub 10·10·10 → mută X +15 → Run  
**Complet:** n, pas, h: repetă n ori: cub înălțime h → mută +pas → h = h + 5

**Quiz scurt:**  
- Câte cuburi face o buclă care se repetă de 8 ori?  
- Ce se întâmplă dacă lipsește blocul de mutare?  
- La ce folosește o variabilă?

## Temă
Opțional: scrie pe foaie un program (în cuvinte) care desenează un gard cu 6 stâlpi.
