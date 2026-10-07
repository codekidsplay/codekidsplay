# Lecția 10 — Racheta low-poly II
**Modulul 2 · Modelare în Edit Mode**  
**Code Maker Club · Mesh Modeler**

> Terminăm racheta: o **coloram** cu mai multe materiale pe același obiect, îi adăugăm **flacăra**, o înclinăm ca să pară că **zboară** și o randăm pe un cer cu stele. Acesta e finalul Modulului 2!  
> Proiect: **„Racheta mea”** · `Prenume_Nume_B2_L10.blend` + `.png`

---

## Obiectiv
La finalul orei ai o rachetă colorată, cu flacără, în zbor.  
**Minim:** corp și aripioare în 2 culori diferite.  
**Complet:** Minim + **5 materiale** (corp, vârf, aripioare, hublou, duză), **flacără luminoasă**, **fum**, **cer cu stele** și o **randare** frumoasă.

## De ce contează
Un model devine „viu” când are părți din materiale diferite. Înveți să dai **mai multe materiale pe același obiect**, ceva ce se folosește la orice model profesionist.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L9 |
| 10–45 | Materiale multiple |
| 45–70 | Flacără și fum |
| 70–90 | Poziția de zbor |
| 90–110 | Cer, lumini, randare |
| 110–120 | Verificare Modul 2, galerie |

**Ce ai nevoie:** Blender 4.2 · fișierul din L9

---

## Pas cu pas

### 1) Paleta rachetei
Alege **3–4 culori** care se potrivesc:

| Piesă | Culoare |
|-------|---------|
| Corp | alb |
| Vârf și aripioare | roșu |
| Hublou | albastru deschis |
| Duză | gri închis |
| Dungă pe corp | albastru închis |

### 2) Materiale multiple pe un obiect
1. Selectează racheta. **Properties → Material → New**. Numește-l `Corp`, culoare **albă**.  
2. Apasă **+** ca să adaugi un slot nou. **New**, numește-l `Rosu` (roșu).  
3. Repetă pentru `Geam` (albastru deschis, **Roughness 0.05**), `Duza` (gri închis, **Metallic 1**, Roughness 0.4) și `Dunga` (albastru închis).  
4. **Tab** (Edit Mode), modul **Face** (**3**).  
5. Selectează fețele vârfului (Shift + click) → slotul `Rosu` → **Assign**.  
6. La fel: aripioarele → `Rosu`; hublou → `Geam`; fețele din interiorul duzei și din jur → `Duza`.  
7. **Dungă:** selectează o bandă de fețe în jurul corpului (**Alt + click** pe o muchie orizontală, apoi trece pe fețe) și atribuie `Dunga`.

> Ai atribuit greșit? Selectează fețele din nou și dă **Assign** pe slotul corect.

### 3) Flacăra
1. **Tab** (ieși din Edit Mode).  
2. **Shift + A → Mesh → Cone**: **Vertices 8, Radius 0.4, Depth 1.5**.  
3. **R X 180**, ca vârful să arate **în jos**. Pune-l sub duză, la **Z ≈ −0.2**.  
4. Material `Flacara`: **Emission** portocaliu, **Strength 5**.  
5. Un al doilea con mai mic, galben, **Radius 0.2, Depth 1.0**, în interiorul primului: flacăra are un **miez** mai fierbinte.  
6. **Ctrl + J** pe cele două conuri (să fie un singur obiect), apoi **F2** → „Flacara”.

### 4) Fumul
1. **Shift + A → Mesh → Ico Sphere** (Subdivisions 1), **Radius 0.3**, **Shade Smooth**, material alb sau gri deschis.  
2. Pune **5–6 sfere** sub flacără, în linie, cu **mărimi diferite** (**S**): cele mai apropiate de rachetă sunt mici, cele mai îndepărtate — mari.  
3. Mută-le puțin stânga-dreapta ca să nu fie în linie dreaptă.

### 5) Poziția de zbor
1. Selectează **racheta**, **flacăra** și **fumul**.  
2. Fă-le un **grup**: la final selectează racheta (activă) și **Ctrl + P → Object**.  
3. Selectează doar racheta și **R Y 20**: se înclină ca în zbor.  
4. Ridic-o puțin de la „sol” (**G Z 2**).

### 6) Cerul cu stele
1. **Properties → World → Color**: albastru foarte închis (aproape negru).  
2. **Stele:** 20–30 de sfere foarte mici (**Radius 0.03**), cu material alb **Emission Strength 3**. Duplică-le (**Shift + D**) și împrăștie-le în spatele rachetei.  
3. Mai multe mici, câteva mai mari.

### 7) Lumini și cameră
1. **Sun** cu **Strength 3**, venind din lateral-sus; **Area** albastră mică, de umplere.  
2. Camera ușor **de jos în sus**, **Focal Length 35–50 mm**, racheta în treimea din stânga și drumul ei spre colțul din dreapta-sus.  
3. **EEVEE**, 1920 × 1080, **F12**, **Save As PNG**.

### 8) Verificare finală Modul 2

| Pot să… | Încă nu | Cu ajutor | Singur |
|---------|---------|-----------|--------|
| intru în Edit Mode și selectez vârfuri, muchii, fețe | ☐ | ☐ | ☐ |
| folosesc **E, I, Ctrl + B, Ctrl + R** | ☐ | ☐ | ☐ |
| folosesc Proportional Editing | ☐ | ☐ | ☐ |
| folosesc modificatorul Mirror | ☐ | ☐ | ☐ |
| dau mai multe materiale pe un obiect | ☐ | ☐ | ☐ |

### Dacă ai terminat devreme
- [ ] **Racheta se mișcă!** Mutarea rachetei se poate înregistra cu **keyframes**. Pune racheta jos, la **cadrul 1**, și apasă **I** → *Location*. Mută linia de timp la **cadrul 120** (în partea de jos, în Timeline), mută racheta sus (**G Z 15**) și apasă **I** din nou. Apasă **Space**: racheta zboară singură! Flacăra și fumul o urmează, fiindcă le-ai legat cu **Ctrl + P**.  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Toată racheta e roșie** — ai dat Assign fără să selectezi fețele.  
2. **Flacăra e mată** — lipsește **Emission** (sau Strength e prea mic).  
3. **Flacăra arată în sus** — conul nu e rotit cu **R X 180**.  
4. **Stelele nu se văd** — sunt prea mici sau fără Emission.  
5. **Racheta nu se mută cu flacăra** — nu ai făcut **Ctrl + P**.

---

## De făcut azi — „Racheta mea” (final)

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Corp și aripioare în 2 culori |
| **Complet** | Minim + 5 materiale + flacără + fum + stele + randare |

### Pasul 1 — Minim
- [ ] Corp alb  
- [ ] Aripioare roșii  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Hublou și duză cu materiale proprii  
- [ ] Flacără cu Emission  
- [ ] Fum și stele  
- [ ] Randare PNG  
- [ ] Verificarea finală completată  
- [ ] Numele `B2_L10` e corect

---

## Bonus
- [ ] O **planetă** în fundal (sferă mare cu material colorat)

## Recapitulare rapidă — tot Modulul 2
1. Edit Mode: vârfuri, muchii, fețe  
2. E · I · Ctrl + B · Ctrl + R  
3. Proportional Editing · Mirror  
4. Low-poly, materiale multiple

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Paleta rachetei` → `Materiale multiple pe un obiect` → `Flacăra` → `Fumul` → `Poziția de zbor` → `Cerul cu stele` → `Lumini și cameră` → `Verificare finală Modul 2`

## Mai departe *(opțional)*
Fă alte vehicule din spațiu: o capsulă, un satelit, un OZN. Cu ce ai învățat, sunt variante ale aceluiași model.

## Quiz scurt
- Cum dai două materiale pe același obiect?  
- Ce face **Assign**?  
- Cum faci ca flacăra să lumineze?

## Temă
Alege un vehicul (barcă, tren, avion) și scrie ce piese ai modela și ce unelte ai folosi.
