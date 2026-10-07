# Lecția 3 — Extrude: turnul de castel
**Modulul 2 · Modelare în Edit Mode**  
**Code Maker Club · Mesh Modeler**

> **Extrude** (tasta **E**) e cea mai folosită unealtă din modelare: „trage” o piesă din model ca pe plastilină. Cu ea construiești turnuri, brațe, copaci.  
> Proiect: **„Turnul de castel”** · `Prenume_Nume_B2_L03.blend`

---

## Obiectiv
La finalul orei ai un turn de castel cu bază, trunchi, balcon și creneluri.  
**Minim:** extrudezi o față de 3 ori ca să faci un turn.  
**Complet:** Minim + **balcon** mai lat și **creneluri** făcute din fețe alternate.

## De ce contează
Fără Extrude ai nevoie de zeci de obiecte. Cu Extrude, dintr-o singură formă faci turnuri, copaci, mâini și tuburi.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2 |
| 10–40 | Extrude pe față, muchie, vârf |
| 40–80 | Turnul |
| 80–110 | Balcon și creneluri |
| 110–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Ce face E
Tasta **E** în Edit Mode **dublează piesa selectată și o mută**, lăsând „pereți” între vechea și noua poziție.

| Ai selectat | E face |
|-------------|--------|
| o **față** | trage un „bloc” din ea |
| o **muchie** | trage un perete subțire |
| un **vârf** | trage o linie (muchie) |

După **E**, mișcă mouse-ul sau scrie o distanță (**E Z 2 Enter**) și **Enter**. Dacă apeși **Esc** sau click dreapta, piesa nouă rămâne în același loc (nu o muți), dar **rămâne extrudată**; atenție la asta!

### 2) Turnul în 3 pași
1. Adaugă un **Cylinder** cu **Vertices = 8**, **Radius = 1.5**, **Depth = 2**. Pune-l pe podea (**G Z 1**).  
2. **Tab** → modul **Face** (**3**) → click pe **fața de sus** a cilindrului.  
3. **E Z 3 Enter** → turnul crește. Faci încă un nivel mai sus.

Observă: dacă nu scrii numărul, ai nevoie să **confirmi cu click**.

### 3) Balconul
Un turn de castel are balcon mai lat sub creneluri.

1. Cu fața de sus selectată, apasă **E Z 0.3 Enter** (un strat subțire).  
2. Apoi **S 1.3 Enter** (mărești fața).  
3. **E Z 0.3 Enter** (zidul balconului).

### 4) Rama dinăuntru (Inset, în avans)
Ca să faci balconul **gol** pe dinăuntru:

1. Cu fața de sus selectată, apasă **I** (Inset) și trage puțin spre interior.  
2. **E Z −0.4 Enter** (extrudezi **în jos**): apare o „gaură”.

### 5) Crenelurile
Crenelurile sunt zidurile joase de sus, din loc în loc.

1. Cu fața din mijloc selectată și **Inset** făcut, selectează **fețele de pe margine** (inelul exterior de fețe, cele 8).  
2. Cu **Shift + click** alege **una da, una nu**.  
3. **E Z 0.5 Enter** → crenelurile alternante.

### 6) Complet — turnul final
Ar trebui să ai, de jos în sus:

| Partea | Cum |
|--------|-----|
| **Baza** | cilindrul de pornire |
| **Trunchiul** | extrude de 3 ori |
| **Balconul** | extrude + scale mai lat |
| **Golul** | inset + extrude în jos |
| **Crenelurile** | fețe alternate, extrude |
| **Acoperiș opțional** | un con deasupra |

### Dacă ai terminat devreme
- [ ] O **ușă** extrudată **în interior** pe peretele turnului  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Extrude, dar nu se mișcă** — ai apăsat Esc după E; piesa e dublată; **Ctrl + Z** și reia.  
2. **Turnul are „coaste” duble** — ai dat E de două ori fără să muți.  
3. **Fața de sus lipsește** — ai șters-o cu **X** în loc să o extrudezi.  
4. **Crenelurile sunt prea mici** — mărește distanța (E Z 0.7).  
5. **Piesele nu sunt egale** — verifică din față (**1**) și de sus (**7**).

---

## De făcut azi — „Turnul de castel”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Turn cu 3 extrude |
| **Complet** | Minim + balcon + gol + creneluri alternate |

### Pasul 1 — Minim
- [ ] Cilindru cu 8 laturi  
- [ ] Extrude de 3 ori  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Balcon mai lat (S)  
- [ ] Gol cu Inset + Extrude în jos  
- [ ] Creneluri  
- [ ] Numele `B2_L03` e corect

---

## Bonus
- [ ] Un **steag** (plan subțire) pe vârf

## Recapitulare rapidă
1. **E** trage piesa din model  
2. **E Z 3 Enter** = extrude cu distanță  
3. **E** + **S** = scară mai lată sau mai îngustă  
4. **I** = inset, **E negativ** = gol

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Ce face E` → `Turnul în 3 pași` → `Balconul` → `Rama dinăuntru (Inset, în avans)` → `Crenelurile` → `Complet — turnul final`

## Mai departe *(opțional)*
Caută poze cu un castel real. Cum sunt turnurile? Ce forme au în vârf?

## Quiz scurt
- Ce face tasta **E**?  
- Cum faci un balcon mai lat?  
- Cum faci creneluri?

## Temă
Desenează un turn cu 3 forme diferite (rotund, pătrat, hexagonal) și scrie câte laturi ar avea.
