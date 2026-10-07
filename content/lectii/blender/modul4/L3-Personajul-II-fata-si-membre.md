# Lecția 3 — Personajul II: față și membre
**Modulul 4 · Proiecte 3D complete**  
**Code Maker Club · Blender Creator**

> Azi dai **viață** lui Blobi: ochi, gură, brațe și coarne. Fața face personajul simpatic!  
> Proiect: **„Blobi”** (partea II) · `Prenume_Nume_B4_L03.blend`

---

## Obiectiv
La finalul orei Blobi are față, brațe și coarne.  
**Minim:** doi ochi, o gură, două brațe.  
**Complet:** Minim + **pupile**, **dinți**, **coarne** și **degete** pe mâini, toate simetrice.

## De ce contează
Ochii și gura sunt primul lucru la care se uită oamenii. Mici schimbări (ochi mai mari, un zâmbet) schimbă complet personalitatea.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2 |
| 10–45 | Ochii și gura |
| 45–80 | Brațele |
| 80–105 | Coarne și detalii |
| 105–120 | Recap, galerie |

**Ce ai nevoie:** Blender 4.2 · fișierul din L2

---

## Pas cu pas

### 1) Ochii
Fă ochi **mari**, ca la personajele din desene animate:

1. **UV Sphere**, **Radius 0.28**, **Location X 0.3, Y −0.62, Z 2.3** (pe față, sus).  
2. **Shade Smooth**, material alb, Roughness 0.1.  
3. **Pupila:** altă sferă (Radius 0.12) la **Y −0.85**, material negru lucios.  
4. Mică **lumină din ochi** (un highlight): o sferă de 0.04 albă, în colțul pupilei.  
5. **Mirror pe ochi:** adaugă modificatorul **Mirror** pe sferă, cu **Mirror Object = corpul** (ca să fie simetric în jurul corpului). Sau duplică manual cu **X = −0.3**.

> Ochii mai apropiați = personaj mai prostuț; mai depărtați = mai fricos. Experimentează.

### 2) Gura
**Metoda simplă:** o **fâșie curbată**.

1. **Add → Mesh → Circle** (Vertices 32), **Fill Type: Nothing**.  
2. **R X 90**, **S 0.35**, la **Y −0.7, Z 1.9**.  
3. **Tab**, șterge vârfurile de sus (rămâne un „U” = zâmbet).  
4. **Add Modifier → Generate → Solidify**, **Thickness 0.05**; **Bevel** mic.  
5. Material roșu închis.

**Metoda 2 (Boolean):** o sferă mare, scoasă din corp cu un modificator **Boolean** (Operation: Difference), pentru o gură deschisă; **dinții** sunt conuri mici, albe.

### 3) Brațele
1. **Tab** pe corp, modul **Face**, selectează o față laterală, în dreapta.  
2. **I 0.2**, **E X 0.5**, **S 0.7**, **E X 0.5**, **S 0.8**.  
3. Brațul e gros la umăr, subțire la mână. Încurbează-l cu **G Z −0.2** pe fața de capăt.  
4. **Mâna:** o sferă mică lipită la capăt, cu **3 degete** (3 cilindri mici, scurți, înclinați).

> **Mirror** pe corp copiază brațul automat și pe stânga.

### 4) Coarnele
1. **Cone**: **Radius 0.2, Depth 0.7**, la **X 0.4, Z 3.1**, ușor înclinat (**R Y 15**).  
2. **Subdivision** + **Shade Smooth**.  
3. Material galben-pal (ca osul).  
4. Dublează pe stânga cu Mirror sau cu **Shift + D**.

### 5) Detalii „drăguțe” (Complet)
- **Sprâncene:** două cuburi subțiri cu Bevel, deasupra ochilor, înclinate: **R Y ±15°**.  
- **Pistrui:** sfere mici (Array pe 3).  
- **Limbă:** plan subțire, roșu, în gură.  
- **Nas:** două puncte mici.

### Dacă ai terminat devreme
- [ ] Un **al treilea ochi** sau o **antenă**  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Ochii intră în corp** — Y prea aproape; mută-i spre −Y.  
2. **Brațele se încrucișează cu corpul** — fața de pornire e prea jos.  
3. **Simetrie greșită** — verifică semnul lui X (+0.3 și −0.3).  
4. **Gura arată ca o linie** — Solidify prea mic.  
5. **Coarnele „plutesc”** — mută-le puțin în interior.

---

## De făcut azi — „Blobi” (II)

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Doi ochi, o gură, două brațe |
| **Complet** | Minim + pupile + dinți + coarne + degete + sprâncene |

### Pasul 1 — Minim
- [ ] Ochi pe față  
- [ ] Gură  
- [ ] Brațe  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Pupile și highlight  
- [ ] Coarne și degete  
- [ ] Detalii drăguțe  
- [ ] Numele `B4_L03` e corect

---

## Bonus
- [ ] Expresii diferite: fă 3 variante ale gurii (fericit, supărat, uimit)

## Recapitulare rapidă
1. Ochii mari = personaj simpatic  
2. Brațe = Extrude + Scale  
3. Mirror pentru simetrie  
4. Detaliile mici dau personalitate

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Ochii` → `Gura` → `Brațele` → `Coarnele` → `Detalii „drăguțe” (Complet)`

## Mai departe *(opțional)*
Uită-te la fețele personajelor din animații: ce forme au ochii? Cât de mari sunt?

## Quiz scurt
- Cum faci un highlight în ochi?  
- De ce folosim Mirror?  
- Ce schimbă distanța dintre ochi?

## Temă
Desenează 3 expresii pentru Blobi și alege una pentru modelul tău.
