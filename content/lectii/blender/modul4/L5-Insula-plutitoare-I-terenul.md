# Lecția 5 — Insula plutitoare I: terenul
**Modulul 4 · Proiecte 3D complete**  
**Code Maker Club · Blender Creator**

> Începem al doilea proiect: o **insulă plutitoare** ca din jocuri de aventură. Azi modelezi **terenul**: partea verde de sus și stânca de jos.  
> Proiect: **„Insula mea”** (partea I) · `Prenume_Nume_B4_L05.blend`

---

## Obiectiv
La finalul orei ai o insulă cu dealuri deasupra și stâncă ascuțită dedesubt.  
**Minim:** disc de pământ cu partea de jos în vârf de stâncă.  
**Complet:** Minim + **dealuri**, **marginea neregulată**, **materiale** (iarbă sus, piatră jos) și **stâncă cu fațete** (low-poly).

## De ce contează
Insulele plutitoare apar în jocuri și filme fantastice. Se modelează simplu: un disc de teren și un con întors dedesubt, apoi se **deformează** ca să pară natural.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap modul |
| 10–35 | Forma de bază |
| 35–70 | Stânca de jos |
| 70–100 | Dealuri și margine |
| 100–120 | Materiale, recap, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start (fără cub)

---

## Pas cu pas

### 1) Forma de bază
1. **Cylinder**: **Vertices = 24**, **Radius = 5**, **Depth = 1.2**, **Z = 0.6**.  
2. **Tab**. Selectează fața de **sus**: **Ctrl + R** cu 2 inele (pentru dealuri mai târziu).  
3. Selectează fața de **jos**: **S 0.2 Enter** (se strânge).  
4. **E Z −3 Enter**: stânca coboară.  
5. **S 0.2** din nou: vârful devine ascuțit.

### 2) Stânca de jos
1. Adaugă încă **2 inele** cu **Ctrl + R** pe porțiunea de jos.  
2. Selectează **inelele**, **S 0.8**, **S 1.2** alternativ, ca să apară **denivelări**.  
3. **O** (Proportional Editing, raza mare) și **G** pe vârfuri aleatorii: stânca devine **neregulată**.  
4. Pentru stil **low-poly**: **Shade Flat**.

### 3) Marginea neregulată
Un disc perfect rotund arată artificial.

1. Selectează inelul de **la margine** (Alt + click).  
2. Cu **O** pornit, selectează câte un vârf din inel și **G** în afară sau în interior, cu raza mică.  
3. Fă **marginea** să aibă 4–5 „golfuri” și „peninsule”.

### 4) Dealurile
1. Selectează **vârfurile din partea de sus** în 2–3 zone.  
2. **O**, **G Z 0.6**, cu **raza mare**. Un deal.  
3. Un deal mai mic, în altă parte: **G Z 0.3**. O vale: **G Z −0.2**.  
4. **Marginea** să fie mai joasă decât mijlocul (ca o insulă ușor bombată).

### 5) Straturile terenului
Un teren adevărat are **două straturi**: iarbă deasupra și pământ dedesubt.

1. **Properties → Material**: două sloturi: **Iarba** (verde) și **Piatra** (gri).  
2. În Edit Mode, **fețele de sus** (selectate cu **Box** și **Alt + Z**) primesc **Iarba**; **cele de jos**, **Piatra** (**Assign**).  
3. Fă ca iarba să **acopere marginea** puțin (un strat subțire verde).

### 6) Complet — finisări
- **Modificator Bevel** mic (Width 0.05) pentru lumina pe margini.  
- **Subdivision** nivel 1 doar dacă vrei o insulă mai rotundă (omite pentru low-poly).  
- Pune insula **la Z = 3** ca să „plutească”. O să adaugi nori mai târziu.

### Dacă ai terminat devreme
- [ ] O **a doua insulă mică**, la distanță  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Insula e prea simetrică** — adaugă variații la margine și pe stâncă.  
2. **Stânca e un con perfect** — mută vârfuri aleatoriu.  
3. **Fețele nu se colorează corect** — Assign pe fețele greșite.  
4. **Dealurile sunt ascuțite** — lipsește Proportional Editing.  
5. **Insula e prea mare / mică** — compară cu imaginea de referință.

---

## De făcut azi — „Insula mea” (I)

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Disc + stâncă în vârf |
| **Complet** | Minim + dealuri + margine neregulată + materiale + Flat |

### Pasul 1 — Minim
- [ ] Cilindru cu 24 laturi  
- [ ] Stâncă dedesubt  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Dealuri și margine  
- [ ] Iarbă și piatră  
- [ ] Numele `B4_L05` e corect

---

## Bonus
- [ ] **Rădăcini** care atârnă din stâncă (conuri subțiri)

## Recapitulare rapidă
1. Cilindru → disc + stâncă  
2. Proportional Editing = natural  
3. Două materiale pe un obiect  
4. Variații = realism

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Forma de bază` → `Stânca de jos` → `Marginea neregulată` → `Dealurile` → `Straturile terenului` → `Complet — finisări`

## Mai departe *(opțional)*
Caută „floating island concept art” pentru inspirație și desenează varianta ta.

## Quiz scurt
- De ce nu facem insula perfect rotundă?  
- Cum dai iarbă sus și piatră jos?  
- Ce face Shade Flat?

## Temă
Desenează insula ta cu 3 detalii (casă, copac, lac) și notează unde le-ai pune.
