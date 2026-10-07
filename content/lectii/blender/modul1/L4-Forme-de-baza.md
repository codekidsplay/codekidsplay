# Lecția 4 — Forme de bază
**Modulul 1 · Primii pași în Blender**  
**Code Maker Club · Blender Starter**

> Azi descoperi „cărămizile” modelării 3D: **cub, sferă, cilindru, con, plan, tor**. Din ele poți face aproape orice.  
> Proiect: **„Racheta mea”** · `Prenume_Nume_B1_L04.blend`

---

## Obiectiv
La finalul orei adaugi și reglezi forme de bază și construiești o **rachetă** din ele.  
**Minim:** adaugi 4 forme diferite și le schimbi dimensiunea.  
**Complet:** Minim + reglezi forma din panoul **Add** (număr de laturi, rază) + racheta are corp, vârf, aripi și geam.

## De ce contează
Modelatorii profesioniști încep adesea cu forme simple, pe care le combină și le modifică. Un copac e un cilindru și o sferă; o casă e un cub și un con.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 |
| 10–40 | Meniul **Add** și formele de bază |
| 40–65 | Panoul de reglaj după adăugare |
| 65–110 | Construim racheta |
| 110–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Meniul Add
**Shift + A → Mesh** (mouse peste viewport):

| Formă | Ce e bună pentru |
|-------|------------------|
| **Plane** | podea, perete, foaie |
| **Cube** | căsuțe, cutii, trepte |
| **Circle** | contur, bază |
| **UV Sphere** | mingi, capete, planete |
| **Ico Sphere** | sferă „din triunghiuri”, bună pentru stânci |
| **Cylinder** | trunchiuri, turnuri, roți |
| **Cone** | vârfuri, pomi de brad, pălării |
| **Torus** | inele, covrigi, roți groase |
| **Monkey** | Suzanne |

### 2) Locul unde apar formele
Obiectele noi apar la **cursorul 3D** (cercul alb-roșu din mijloc, la început).

| Acțiune | Cum |
|---------|-----|
| Muți cursorul | **Shift + click dreapta** unde vrei |
| Îl readuci în centru | **Shift + C** |

### 3) Panoul „Adjust Last Operation”
Imediat după ce adaugi o formă, în **colțul stânga-jos** al viewport-ului apare un panou mic, pe care îl deschizi cu click:

| Setare | Ce schimbă |
|--------|------------|
| **Vertices** (la cilindru, con, cerc) | câte laturi are (3 = triunghi, 6 = hexagon, 32 = rotund) |
| **Radius** | cât e de lat |
| **Depth** | cât e de înalt |
| **Location / Rotation** | unde și cum apare |

> Atenție: panoul dispare când faci altă acțiune. Reglează **imediat** după ce adaugi forma.

### 4) Origine și nume
- Orice obiect are un **punct de origine** (punctul portocaliu mic). Rotația și scalarea se fac **în jurul lui**.  
- Redenumește fiecare obiect cu **F2**, ca să nu te încurci.

### 5) Complet — „Racheta mea”
Construiește pe rând (șterge mai întâi cubul de start, cu **X**):

| Piesă | Formă | Reglaje |
|-------|-------|---------|
| **Corp** | Cylinder | Radius 0.5 · Depth 3 · Vertices 32 |
| **Vârf** | Cone | Radius 0.5 · Depth 1 · așezat deasupra corpului |
| **Aripi** (3) | Cube | scalate subțire: **S Y 0.1**, **S X 0.6**, apoi puse jos, în jurul corpului |
| **Geam** | UV Sphere | scalat mic, lipit pe corp, la mijloc |
| **Flacără** | Cone | cu vârful în jos (**R X 180**), sub corp, la **Z = −0.5** |

**Pași recomandați**
1. Adaugă corpul. Mută-l în sus: **G Z 1.5 Enter** (ca baza să stea pe podea).  
2. Adaugă conul: vezi că apare la centru. Mută-l la **Z = 3.5**.  
3. Adaugă o aripă. Ridică-o la **Z = 0.4** și mută-o la **X = 0.7**. Pentru celelalte aripi, folosește **Shift + D** și rotește copiile **în jurul corpului**: cel mai simplu e să muți mai întâi cursorul 3D în centru (**Shift + C**), să alegi **Pivot: 3D Cursor** (butonul din bara de sus a viewport-ului) și apoi să apeși **R Z 120** și **R Z 240**.  
4. Geamul: o sferă mică la **Y = −0.45**, **Z = 2.3**.  
5. Fiecare piesă primește un nume (**F2**): `Corp`, `Varf`, `Aripa1`…

### 6) Verifică din toate părțile
Folosește vederile din L2: **1** (față), **3** (dreapta), **7** (sus). Sunt aripile la distanțe egale?

### Dacă ai terminat devreme
- [ ] Fă **două rachete** de mărimi diferite  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Forma apare în altă parte** — cursorul 3D nu e în centru; **Shift + C**.  
2. **N-ai putut regla forma** — panoul din stânga-jos a dispărut; șterge forma și adaug-o din nou.  
3. **Forma e „colțuroasă”** — Vertices e prea mic.  
4. **Obiectele se confundă** — nu le-ai redenumit.  
5. **Piesele intră unele în altele** — verifică vederea din față (**1**).

---

## De făcut azi — „Racheta mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 4 forme diferite, cu dimensiuni schimbate |
| **Complet** | Minim + rachetă completă, cu piese denumite |

### Pasul 1 — Minim
- [ ] Am adăugat cub, sferă, cilindru, con  
- [ ] Le-am scalat  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Corp, vârf, 3 aripi, geam, flacără  
- [ ] Vertices 32 la corp  
- [ ] Obiecte denumite  
- [ ] Numele `B1_L04` e corect

---

## Bonus
- [ ] Adaugă un **inel** (Torus) în jurul corpului

## Recapitulare rapidă
1. **Shift + A → Mesh** adaugă forme  
2. Panoul din stânga-jos reglează forma  
3. **Shift + C** readuce cursorul 3D  
4. Denumește obiectele cu **F2**

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Meniul Add` → `Locul unde apar formele` → `Panoul „Adjust Last Operation”` → `Origine și nume` → `Complet — „Racheta mea”` → `Verifică din toate părțile`

## Mai departe *(opțional)*
Alege o jucărie și încearcă să o descompui în forme de bază: câte cuburi, sfere, cilindri ai nevoie?

## Quiz scurt
- Ce formă folosești pentru un trunchi de copac?  
- Unde apar obiectele noi?  
- Cum faci un cilindru „rotund”?

## Temă
Desenează o jucărie și scrie lângă fiecare parte ce formă de bază ai folosi.
