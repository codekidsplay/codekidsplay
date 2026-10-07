# Lecția 7 — Simetria: fluturele
**Modulul 2 · Modelare în Edit Mode**  
**Code Maker Club · Mesh Modeler**

> Multe lucruri sunt **simetrice**: fața, avionul, fluturele. Cu modificatorul **Mirror** modelezi doar jumătate, iar Blender face cealaltă jumătate singur!  
> Proiect: **„Fluturele”** · `Prenume_Nume_B2_L07.blend`

---

## Obiectiv
La finalul orei ai un fluture simetric, cu o aripă modelată o singură dată.  
**Minim:** corp și o pereche de aripi făcute cu **Mirror**.  
**Complet:** Minim + **aripă de sus și de jos** cu formă și **model** pe aripi, **antene** și **culori** pe fluturele întreg.

## De ce contează
Modelezi **de două ori mai repede** și ambele jumătăți sunt perfect identice. Folosesc mereu modelatorii pentru personaje, avioane și animale.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6 |
| 10–25 | Ce e un modificator și Mirror |
| 25–60 | Aripa |
| 60–85 | Corpul și antenele |
| 85–110 | Model și culori |
| 110–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Ce e un modificator?
Un **modificator** e o „regulă” pusă pe un obiect, care îi schimbă forma **fără să-l strice** (poți opri sau șterge regula oricând). Îl găsești în **Properties → tab-ul cheii franceze** (Modifiers).

### 2) Pregătim jumătatea de aripă
1. Șterge cubul (**X**). **Shift + A → Mesh → Plane**.  
2. **Numpad 7** (vedere de sus). **Tab** (Edit Mode), **A** (selectează tot).  
3. **G X 1 Enter**: planul se mută spre dreapta, iar marginea lui din stânga ajunge exact pe **X = 0**. Centrul obiectului (punctul portocaliu) rămâne la mijloc.  
4. Cu planul selectat: **click dreapta → Subdivide**, apoi în panoul **Adjust Last Operation** pune **Number of Cuts = 3**. Ai o grilă de 4 × 4 pătrate.

### 3) Adăugăm Mirror
1. **Tab** (Object Mode).  
2. **Properties → Modifiers → Add Modifier → Generate → Mirror**.  
3. Bifează **Clipping** (să rămână lipite la mijloc).  
4. Dacă oglinda apare pe o altă axă, setează **Axis** doar pe **X**.

Acum modelezi doar în dreapta, iar în stânga apare **oglindirea**.

### 4) Forma aripii
Revino în Edit Mode (**Tab**), modul **Vertex** (**1**), vedere de sus (**7**), **Alt + Z** pornit:

1. **Aripa de sus (mare):** selectează vârful din colțul de sus-dreapta și **G X 0.8 Y 0.6**.  
2. **Aripa de jos (mică):** colțul de jos-dreapta: **G X −0.2 Y −0.3** (spre interior).  
3. **Crestătura dintre aripi:** vârful din mijlocul marginii din dreapta: **G X −0.6**.  
4. Mai rotunjește colțurile cu **O** (Proportional Editing, rotița pentru rază) și **G** pe vârfurile de margine, ca să arate ca o aripă și nu ca un pătrat.  
5. Aripile pot fi puțin ridicate, ca în zbor: selectează vârfurile cele mai din exterior și **G Z 0.3**.

Privește și din față (**1**): aripile fac un „V” ușor.

### 5) Grosime
O aripă fără grosime dispare când o privești din lateral:

1. **A** (selectează tot), **E Z 0.03 Enter**.  
2. **Shade Smooth** (Object Mode).

### 6) Corpul
Corpul nu are nevoie de Mirror: e deja simetric.

1. **Shift + A → Mesh → UV Sphere**. În **N → Item → Dimensions** pune **X 0.3, Y 2, Z 0.3**.  
2. **Shade Smooth**. Corpul e acum ca un ou lung, în lungul axei Y.  
3. **Capul:** altă UV Sphere, **Dimensions 0.4 × 0.4 × 0.4**, la **Y = 1.1**.

### 7) Antenele
1. **Shift + A → Mesh → Cylinder**: **Vertices 8, Radius 0.015, Depth 0.8**.  
2. **R X 90**, ca să fie pe lungimea lui Y.  
3. **R Z −20**, **Location X 0.1, Y 1.5**.  
4. **Shift + D**, **Enter**, apoi în **N → Item** schimbă **Location X** în **−0.1** și **Rotation Z** în **20°**.

### 8) Complet — model și culori
**Modelul pe aripă** (în Edit Mode, pe aripă):
1. Modul **Face** (**3**). Selectează 3–4 fețe, la întâmplare.  
2. **I 0.06 Enter** (inset): apar „pete” pe aripă.  
3. Încă o dată **I 0.04**, pe alte fețe.

**Materiale:**
- Aripă: portocaliu (slotul 1).  
- Pete: negru sau galben: slot nou + **Assign** pe fețele cu inset (vei folosi același truc la rachetă, în lecția 10).  
- Corp și cap: maro închis, antene negre.  
- Randare: fundal deschis sau verde, lumină de sus.

### Dacă ai terminat devreme
- [ ] Un fluture **mare** (de junglă) și unul **mic** (de grădină)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Nu apare oglinda** — modificatorul nu e pe aripă sau Axis e greșit.  
2. **Rămâne o linie la mijloc** — nu ai bifat **Clipping**.  
3. **Aripa e într-o parte și oglinda într-alta** — marginea din stânga nu e la X = 0; refă pasul 2.3.  
4. **Aripile arată ca un pătrat** — mută mai multe vârfuri; folosește Proportional Editing.  
5. **Modificatorul „dispare”** — e doar ascuns; apasă pe ochiul din listă.

---

## De făcut azi — „Fluturele”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Aripă cu Mirror + corp |
| **Complet** | Minim + formă de aripă + petele + antene + culori |

### Pasul 1 — Minim
- [ ] Planul mutat la X = 0  
- [ ] Mirror cu Clipping  
- [ ] Corp  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Aripi de sus și de jos  
- [ ] Pete pe aripi  
- [ ] Antene  
- [ ] Culori pe fiecare piesă  
- [ ] Numele `B2_L07` e corect

---

## Bonus
- [ ] O **floare** pe care stă fluturele

## Recapitulare rapidă
1. **Modificator** = regulă reversibilă  
2. **Mirror** = simetrie automată  
3. **Clipping** lipește jumătățile  
4. Modelezi o parte, vezi ambele

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Ce e un modificator?` → `Pregătim jumătatea de aripă` → `Adăugăm Mirror` → `Forma aripii` → `Grosime` → `Corpul` → `Antenele` → `Complet — model și culori`

## Mai departe *(opțional)*
Caută poze cu fluturi sau avioane și observă simetria. Ce altceva ai modela cu Mirror?

## Quiz scurt
- Ce face modificatorul Mirror?  
- De ce bifăm Clipping?  
- Unde trebuie să fie marginea aripii față de axa X?

## Temă
Desenează o jumătate de față și o jumătate de fluture și spune ce ai oglindi.
