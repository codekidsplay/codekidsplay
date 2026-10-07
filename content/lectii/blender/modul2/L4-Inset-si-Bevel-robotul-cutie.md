# Lecția 4 — Inset și Bevel: robotul cutie
**Modulul 2 · Modelare în Edit Mode**  
**Code Maker Club · Mesh Modeler**

> Azi înveți două unelte care dau **detalii**: **Inset** (o față în interiorul altei fețe) și **Bevel** (rotunjirea muchiilor). Cu ele construiești un robot simpatic.  
> Proiect: **„Robotul cutie”** · `Prenume_Nume_B2_L04.blend`

---

## Obiectiv
La finalul orei ai un robot cu corp, cap, ochi, gură, brațe și butoane.  
**Minim:** corp și cap din cuburi, ochi cu Inset + Extrude, muchii rotunjite cu Bevel.  
**Complet:** Minim + gură, antenă, brațe extrudate și **butoane** pe piept.

## De ce contează
Detaliile mici fac diferența între „cutie” și „personaj”. Inset + Extrude pentru butoane, ferestre și ochi; Bevel pentru colțuri rotunjite, ca la jucăriile din plastic.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 |
| 10–35 | Inset |
| 35–60 | Bevel |
| 60–110 | Robotul |
| 110–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Inset (tasta I)
În Edit Mode, cu o **față** selectată:

| Acțiune | Rezultat |
|---------|----------|
| **I** apoi mișcă mouse-ul | o față mai mică, în interiorul celei vechi |
| scrie un număr + **Enter** | o distanță exactă (ex. **I 0.2 Enter**) |
| apasă **I** a doua oară în timp ce lucrezi | **Individual** (fiecare față separat, dacă ai mai multe) |

### 2) Inset + Extrude = detaliu
Rețeta de bază pentru ochi, butoane, ferestre:

1. Selectează fața.  
2. **I** (inset).  
3. **E** (extrude) spre interior sau exterior.

### 3) Bevel (Ctrl + B)
Rotunjește muchiile ca să nu fie „tăioase”.

| Pas | Cum |
|-----|-----|
| Selectezi **muchiile** | modul Edge (**2**) și **Shift + click**; sau **A** pe tot obiectul |
| **Ctrl + B** | începi bevel-ul |
| mișcă mouse-ul | cât de mare e rotunjirea |
| **rotița** | câte „segmente” (mai multe = mai neted) |
| **Enter** | confirmi |

Pentru vârfuri: **Ctrl + Shift + B**.

### 4) Robotul, pe rând
Începe cu scena de start, șterge cubul și pornește de la **Cube**.

**Corpul**  
1. Cub: **S X 1.2**, **S Z 1.5**, apoi **G Z 1.5** ca să stea pe podea.

**Capul**  
2. Un al doilea cub: **S 0.8**, **G Z 4**.  
3. Ochii: adaugă un **cub mic** (**S 0.15**) pe fața din față a capului, la stânga. În Edit Mode, selectează fața lui din față, apoi **I 0.3** și **E −0.1** (un ecran adâncit). Duplică ochiul cu **Shift + D** și mută-l simetric, de partea cealaltă.

**Gura și antena**  
4. Gura: un cub subțire, lat (**S X 0.5**, **S Z 0.08**), lipit pe față, sub ochi.  
5. Antena: pe fața de sus a capului, **I 0.3**, **E Z 0.8**, apoi **E Z 0.2** și **S 3** (un „bec” mai lat în vârf).

**Brațele**  
6. Selectează fața din lateral a corpului, **E X 1 Enter**, apoi **S 0.6 Enter**, **E X 1 Enter**. Fă la fel și de partea cealaltă.

**Butoanele**  
7. Pe piept: selectează o față (după un Loop Cut, vezi lecția următoare) sau folosește 3 cuburi mici. Pe fiecare: **I 0.2**, **E 0.1**.

### 5) Complet — finisaje
- **A** (selectează toate), **Ctrl + B**, scroll la **3 segmente**, mărime mică (~0.05).  
- **Object → Shade Smooth**.  
- Un material pentru corp (gri-albastru), unul pentru ochi (galben), unul pentru butoane (roșu).

### Dacă ai terminat devreme
- [ ] Fă un **robot-fată** cu zâmbet  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Bevel-ul face o formă ciudată** — ai selectat și piese din interior; verifică selecția.  
2. **Inset-ul iese din față** — mouse-ul a mers în direcția greșită; scrie numărul.  
3. **Brațele se intersectează cu corpul** — nu ai extrudat suficient.  
4. **Prea mulți vertici** — folosește 2–3 segmente de bevel, nu 10.  
5. **Părțile nu se potrivesc** — verifică din față și de lateral.

---

## De făcut azi — „Robotul cutie”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Corp, cap, ochi cu Inset + Extrude, bevel |
| **Complet** | Minim + gură, antenă, brațe, butoane, materiale |

### Pasul 1 — Minim
- [ ] Două cuburi (corp + cap)  
- [ ] Ochi cu **I + E**  
- [ ] **Ctrl + B** pe muchii  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Antenă și brațe  
- [ ] Trei butoane  
- [ ] Culori  
- [ ] Numele `B2_L04` e corect

---

## Bonus
- [ ] Doi roboți de mărimi diferite (mamă și fiu)

## Recapitulare rapidă
1. **I** = inset · **E** = extrude  
2. **I + E** = ochi, butoane, ferestre  
3. **Ctrl + B** = muchii rotunjite  
4. Rotița schimbă segmentele

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Inset (tasta I)` → `Inset + Extrude = detaliu` → `Bevel (Ctrl + B)` → `Robotul, pe rând` → `Complet — finisaje`

## Mai departe *(opțional)*
Uită-te la jucăriile tale: au muchii rotunjite? Observă cum arată colțurile reale.

## Quiz scurt
- Ce face **Inset**?  
- Cu ce scurtătură rotunjești muchiile?  
- Cum faci o gaură mică într-o suprafață?

## Temă
Desenează un robot și marchează unde ai folosi Inset, Extrude și Bevel.
