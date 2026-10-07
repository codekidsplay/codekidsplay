# Lecția 3 — Array: gardul și scara
**Modulul 3 · Modificatori și materiale**  
**Code Maker Club · Modifier Maker**

> Un gard are 40 de scânduri la fel. Nu le faci pe toate: faci **una** și **Array** le repetă. Azi construiești un gard, o scară și o **roată cu spițe**.  
> Proiect: **„Gard, scară și roată”** · `Prenume_Nume_B3_L03.blend`

---

## Obiectiv
La finalul orei folosești Array pentru 3 construcții.  
**Minim:** un gard din 10 scânduri.  
**Complet:** Minim + o **scară** cu 8 trepte + o **roată cu 12 spițe**, făcută cu un obiect „Empty”.

## De ce contează
Repetiția e peste tot: ferestre, trepte, dinți de fierăstrău, spițe. Array economisește timp și te lasă să schimbi totul ulterior (de ex. de la 10 la 20 de scânduri) dintr-un singur număr.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2 |
| 10–40 | Gardul (offset relativ) |
| 40–70 | Scara (offset constant) |
| 70–105 | Roata (offset de obiect) |
| 105–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Gardul
1. Cubul: **Dimensions X 0.2, Y 0.05, Z 1.5**, **Z = 0.75**.  
2. **Add Modifier → Generate → Array.**  
3. **Count = 10**.  
4. **Relative Offset X = 1.5** (distanța între scânduri, în „lățimi de scândură”; 1 = lipite, 1.5 = cu spațiu).  
5. Adaugă **2 șipci orizontale**: un **Cube** lung (X 4, Y 0.05, Z 0.1) la **Z 0.4** și **Z 1.1**.

### 2) Offset relativ vs. constant

| Tip | Cum se măsoară | Bun pentru |
|-----|----------------|------------|
| **Relative Offset** | în **mărimi ale obiectului** | garduri, rafturi |
| **Constant Offset** | în **unități** fixe | trepte, distanțe exacte |
| **Object Offset** | în funcție de **alt obiect** | cercuri, spirale |

Poți combina mai multe, bifând-le.

### 3) Scara
1. Cub nou, **Dimensions X 2, Y 0.6, Z 0.2**.  
2. **Array → Count = 8**.  
3. Dezactivează **Relative Offset**, bifează **Constant Offset**: **X 0**, **Y 0.6**, **Z 0.2**.  
4. Cuburile urcă și înaintează treptat: o scară!  
5. Pune niște **balustrade** din cilindri subțiri (cu Array pe ei!).

### 4) Roata cu 12 spițe
Aici folosim un **Empty**, un obiect invizibil care servește drept „centru de rotație”.

1. **Cylinder**: Radius 0.05, Depth 1 — o **spiță**. Pune-o pe jos începând din centru: **Tab**, **A**, **G Z 0.5 Enter**, **Tab**. Punctul ei de origine rămâne în **(0, 0, 0)**.  
2. **Shift + A → Empty → Plain Axes.** Pune-l în **(0, 0, 0)**.  
3. Rotește Empty-ul: **R Z 30 Enter** (360 / 12 = 30°).  
4. Pe spiță: **Array → Count = 12**. Debifează **Relative Offset**, bifează **Object Offset** și alege **Empty-ul** din listă.  
5. Spițele se rotesc în cerc, ca la o roată! (Roata e „culcată”, ca un ceas văzut de sus; vezi-o din vederea **7**.)  
6. Adaugă un **Torus** mare pentru janta roții (Major Radius 1, Minor 0.08).

### 5) Aplicăm modificatorul
Când ești mulțumit și vrei să editezi fiecare piesă separat: în lista de modificatori, **butonul ▼ → Apply** (sau **Ctrl + A** cu mouse-ul peste modificator). Modificatorul dispare, iar piesele rămân.

### Dacă ai terminat devreme
- [ ] Un **gard în cerc** în jurul unei căsuțe  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Scândurile se suprapun** — Relative Offset prea mic (sub 1).  
2. **Scara e rampă** — Constant Offset greșit; verifică Y și Z.  
3. **Spițele nu formează cerc** — Empty-ul nu e în centrul spiței.  
4. **Origin-ul obiectului e greșit** — **Object → Set Origin → Origin to 3D Cursor**.  
5. **Modificatorul nu se mai poate edita** — l-ai aplicat; **Ctrl + Z**.

---

## De făcut azi — „Gard, scară și roată”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Gard cu 10 scânduri |
| **Complet** | Minim + scară + roată cu 12 spițe |

### Pasul 1 — Minim
- [ ] Scândura cu dimensiuni  
- [ ] Array, Count 10  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Scară cu Constant Offset  
- [ ] Roată cu Empty și Object Offset  
- [ ] Numele `B3_L03` e corect

---

## Bonus
- [ ] Un **foișor** cu coloane (Array pe cilindru)

## Recapitulare rapidă
1. **Array** repetă un obiect  
2. **Relative / Constant / Object Offset**  
3. **Empty** = centru invizibil  
4. **Apply** transformă în piese reale

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Gardul` → `Offset relativ vs. constant` → `Scara` → `Roata cu 12 spițe` → `Aplicăm modificatorul`

## Mai departe *(opțional)*
Caută 3 lucruri din oraș care se repetă (stâlpi, geamuri, trepte) și gândește-te cum le-ai face cu Array.

## Quiz scurt
- Ce face Array?  
- Ce tip de offset folosești pentru un cerc?  
- Cum aplici definitiv un modificator?

## Temă
Desenează o clădire cu 3 elemente care se repetă și scrie ce Count ar avea.
