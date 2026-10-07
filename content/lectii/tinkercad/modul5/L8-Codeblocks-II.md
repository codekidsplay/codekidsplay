# Lecția 8 — Codeblocks II
**Modulul 5 · Avansat și proiectare tehnică**  
**Code Maker Club · Design Pro**  
**Public:** recomandat **10+** · lecție **opțională** pentru cei sub 12 ani *(au varianta fără cod)*

> Azi construiești un **turn parametric**: schimbi un număr (`etaje`) și obții un turn mai mic sau mai mare — aceeași idee, mai multe obiecte.  
> Proiect: **„Turnul parametric”** · `Prenume_Nume_T5_L08`

---

## Obiectiv
La finalul orei ai **două turnuri** din aceeași idee, unul cu 5 etaje și unul cu 8.  
**Minim (cu Codeblocks):** buclă care pune pe verticală **etaje** de **20·20·6**, fiecare **mai îngust cu 2 mm** decât cel dinainte · rulat cu `etaje = 5` și cu `etaje = 8` *(două capturi sau două proiecte salvate)*.  
**Minim (fără Codeblocks):** același turn făcut manual în **2 înălțimi** (5 și 8 etaje).  
**Complet:** Minim + al doilea parametru **lățime de bază** `L` *(20 sau 30)* și o explicație de 3 propoziții: ce a schimbat fiecare parametru.

## De ce contează
Un **șablon** nu face un obiect, ci o **familie** de obiecte. În M4 ai făcut un șablon de casă; acum îl faci din cod, cu un singur număr de schimbat.  
Așa se fac produsele care vin în mai multe mărimi: vase, suporturi, turnuri.

**Pregătire (profesor):** rulează înainte programul pe contul clasei, ca să știi cum arată blocurile de formă, mutare, repetare, variabile și **Group**. Verifică dacă blocul de mutare mișcă *toate* formele de deasupra lui: de aceea fiecare etaj (cub + mutare) e pus într-un **Group** propriu, ca mutarea să nu miște și etajele de dinainte. Verifică și dacă cubul din cod apare centrat pe plan și cu fața de jos la înălțimea 0.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Recap L7 · ce e un parametru? Desen pe foaie al turnului |
| 15–55 | Pas cu pas: etajele · variabile · rularea cu 5 etaje |
| 55–100 | Minim → Complet (a doua variantă, al doilea parametru) |
| 100–120 | Compararea celor două turnuri, recap, salvare |

**Unelte azi:** **Codeblocks** · **Run** · variabile · bucle · **View Cube** · **Align** (**L**) · **Box** *(varianta manuală)*

---

## Planul turnului *(pe foaie, înainte de cod)*

| Etaj | Lățime | Înălțime etaj | Începe la înălțimea |
|------|--------|----------------|---------------------|
| 1 | 20 | 6 | 0 |
| 2 | 18 | 6 | 6 |
| 3 | 16 | 6 | 12 |
| 4 | 14 | 6 | 18 |
| 5 | 12 | 6 | 24 |

Regula: la fiecare etaj, **lățimea scade cu 2** și **înălțimea de start crește cu 6**.  
La 8 etaje: ultimul are lățimea 20 − 14 = **6** și începe la **42**.

---

## Pas cu pas *(cu Codeblocks)*

### 1) Proiect nou
1. Design nou · **Codeblocks** · `Prenume_Nume_T5_L08`

### 2) Variabilele
1. **etaje** = 5  
2. **lat** = 20 *(lățimea etajului curent)*  
3. **z** = 0 *(înălțimea la care începe etajul curent)*

### 3) Bucla
1. „Repetă de **etaje** ori”  
2. În buclă, în ordine:  
   - un bloc **Group** care conține: **box** cu mărimile **lat · lat · 6**, apoi o mutare pe înălțime cu **z** *(centrat pe mijlocul planului)*  
   - **lat** devine **lat − 2** *(în afara Group-ului)*  
   - **z** devine **z + 6** *(în afara Group-ului)*  
3. **Run**: apare turnul cu 5 etaje, treptat mai îngust

### 4) A doua rulare
1. Schimbi **etaje** în **8** → **Run**  
2. Salvezi sau faci o captură a fiecărei variante: `Turn_5` și `Turn_8`  
3. Compari: care e mai înalt? Cu cât? *(3 etaje × 6 mm = 18 mm)*

### 5) Complet — al doilea parametru
1. Variabilă nouă **L** = 20 la început *(lățimea de bază)*  
2. **lat** pornește de la **L**  
3. Rulezi cu **L = 30** și **etaje = 8**: atenție, 8 etaje cu pasul de 2 ajung la lățime 16 — turnul e mai gros  
4. Pe foaie, 3 propoziții:  
   - „Dacă schimb **etaje**, se schimbă …”  
   - „Dacă schimb **L**, se schimbă …”  
   - „Un parametru bun este … deoarece …”

---

## Varianta fără Codeblocks *(Minim)*

1. **Box** **20 · 20 · 6** → baza  
2. **Box** **18 · 18 · 6** → **L**: mijloc pe stânga–dreapta și pe față–spate cu baza; ridicat la **6 mm**  
3. **Box** **16 · 16 · 6** → centrat · ridicat la **12 mm**  
4. **Box** **14 · 14 · 6** → centrat · ridicat la **18 mm**  
5. **Box** **12 · 12 · 6** → centrat · ridicat la **24 mm** · **Ctrl+G** → **Turn_5**  
6. A doua variantă: **Ctrl+D** pe turn, muți copia **30 mm** într-o parte; apoi adaugi etajele 6, 7 și 8 *(10·10·6 la 30, 8·8·6 la 36, 6·6·6 la 42; fiecare cu **L** mijloc pe ambele axe față de turn)* → **Ctrl+G** → **Turn_8**  
7. Pe foaie: ce parametru ai schimbat, de fapt? *(numărul de etaje)*

---

## Greșeli frecvente
1. **Etajele sunt unul lângă altul, nu unul peste altul** — **z** nu crește cu 6.  
2. **Etajele au aceeași mărime** — **lat** nu scade cu 2.  
3. **Turnul ajunge la 0** — prea multe etaje; la lățimea 20 și pas 2 nu merge de la 11 etaje în sus (al 10-lea are 2 mm, prea subțire pentru print); alege cel mult 9.  
4. **Nu se schimbă** — bucla folosește numărul 5, nu variabila **etaje**.  
5. **Turnul nu e centrat** — etajele sunt așezate din colț; centrează-le.  
6. **Ai uitat să salvezi varianta cu 5 etaje** înainte să schimbi în 8 — rularea nouă o înlocuiește.  
7. **Nu poți compara** — salvează fiecare variantă cu un nume diferit.

---

## De făcut azi — „Turnul parametric”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim cu cod** | Buclă cu etaje 20 → 12 · 2 rulări: 5 și 8 etaje |
| **Minim fără cod** | Turn_5 și Turn_8 făcute manual |
| **Complet** | + al doilea parametru L + 3 propoziții |

### Pasul 1 — Minim
- [ ] Planul turnului pe foaie  
- [ ] Turn cu 5 etaje  
- [ ] Turn cu 8 etaje  
- [ ] Salvat `T5_L08`  

### Pasul 2 — Complet
- [ ] Parametrul **L**  
- [ ] Rulare cu L = 30  
- [ ] 3 propoziții  
- [ ] **Color**

---

## Bonus (extra — după Complet)
- [ ] Turnul din **cilindri** în loc de cuburi  
- [ ] Un acoperiș con deasupra: **Cone** pe ultimul etaj  
- [ ] Un vas: același program, dar etajele devin tot mai late spre mijloc

## Recapitulare rapidă
1. **Parametru** = număr care schimbă obiectul  
2. Bucla pune etajele, variabilele le schimbă mărimea  
3. Două rulări = **două variante** din aceeași idee  
4. Fără cod, aceeași idee se face cu Box-uri

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** etaje = 5; lat = 20; z = 0 → repetă etaje ori: box lat·lat·6 la z → lat = lat − 2 → z = z + 6 → Run  
**Complet:** parametrul L · rulare L = 30

**Quiz scurt:**  
- Cât de înalt e un turn cu 8 etaje? *(48)*  
- Ce se schimbă când modifici **etaje**?  
- De ce un parametru e mai bun decât să refaci turnul?

## Temă
Opțional: alege un obiect de acasă (un pahar, o scară) și scrie ce parametri ar avea dacă l-ai face din cod.
