# Lecția 10 — Proiect: mini-diorama
**Modulul 1 · Primii pași în Blender**  
**Code Maker Club · Blender Starter**

> Proiectul modulului: construiești o **mini-diorama**, o scenă mică, de sine stătătoare, cu casă, pomi, personaj și lumină. Folosești tot ce ai învățat.  
> Proiect: **„Mini-diorama”** · `Prenume_Nume_B1_L10.blend` + `.png`

---

## Obiectiv
La finalul orei ai o scenă completă, colorată, luminată și randată.  
**Minim:** o bază, 3 obiecte colorate, o lumină, o cameră, o randare.  
**Complet:** Minim + **cel puțin 6 obiecte**, 5 materiale diferite, **2 lumini**, compoziție bună și piese **denumite și ordonate**.

## De ce contează
Un proiect complet leagă toate pașii: modelare, culoare, lumină, cameră, randare. Dioramele sunt folosite în jocuri, filme și arhitectură pentru a arăta o idee.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap modul · alegem tema |
| 10–35 | Planul și baza scenei |
| 35–80 | Modelăm obiectele |
| 80–105 | Materiale, lumini, cameră |
| 105–120 | Randare și galerie |

**Ce ai nevoie:** Blender 4.2 · piesele din L4–L7 (casă, omuleț, rachetă)

---

## Pas cu pas

### 1) Alege o temă
| Temă | Ce poți pune |
|------|--------------|
| **Iarna** | casă, omuleț, brazi, zăpadă |
| **Parcul** | bancă, copaci, felinar, fântână |
| **Spațiul** | rachetă, planete, stele, antenă |
| **Ferma** | hambar, gard, copac, vacă simplificată |

Desenează un plan scurt: **ce obiecte**, **unde stau**.

### 2) Baza
O diorama arată bine pe o **bază** care „ține” scena:

1. **Shift + A → Mesh → Cylinder** (Vertices 64, Radius 6, Depth 0.5), sau un **Cube** aplatizat.  
2. Pune-o la **Z = 0** ca vârful să fie sus.  
3. Pe baza aceasta pui totul.

### 3) Obiecte din lecțiile trecute
Poți **copia** obiecte din alte fișiere:

1. **File → Append**.  
2. Alege fișierul `.blend` → folderul **Object** → obiectul dorit.  
3. Click **Append**.  
Sau refă-le simplu, direct în scenă.

**Pomul (din forme simple)**

| Piesă | Formă | Idee |
|-------|-------|------|
| Trunchi | Cylinder (Radius 0.15, Depth 1) | maro |
| Coroană | Cone sau Ico Sphere | verde |
| Brad | 3 conuri suprapuse | verde închis |

### 4) Organizare
- **Redenumește** fiecare obiect (**F2**): `Casa`, `Pom1`, `Omulet`…  
- **Grupează** (Ctrl + P) piesele care merg împreună.  
- Păstrează **câte puțin spațiu între obiecte**, ca să nu fie aglomerat.

### 5) Culori, lumini, cameră
1. **Materiale:** minim 5 culori diferite (L7).  
2. **Sun** (caldă) + **Area** (rece, mică) ca lumină de umplere (L8).  
3. **Camera** din colț, 35–50 mm, regula treimilor.  
4. **Randare:** EEVEE, 1920 × 1080, 100%, **PNG** (L9).

### 6) Lista de verificare

| ✔ | Ce verific |
|---|-----------|
| ☐ | Fiecare obiect e pe bază, nimic nu „plutește” |
| ☐ | Obiectele au nume |
| ☐ | Cel puțin 5 culori |
| ☐ | Se văd umbre |
| ☐ | Subiectul principal e vizibil din cameră |
| ☐ | Imaginea PNG e salvată |

### 7) Verificare finală Modul 1

| Pot să… | Încă nu | Cu ajutor | Singur |
|---------|---------|-----------|--------|
| mă deplasez în 3D | ☐ | ☐ | ☐ |
| folosesc **G, R, S** și axe | ☐ | ☐ | ☐ |
| adaug și reglez forme de bază | ☐ | ☐ | ☐ |
| dau culori și materiale | ☐ | ☐ | ☐ |
| așez lumini și cameră | ☐ | ☐ | ☐ |
| randez și salvez o imagine | ☐ | ☐ | ☐ |

### Dacă ai terminat devreme
- [ ] Adaugă **fundal** (o curbă / un plan în spate)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Prea multe obiecte, prea puțin timp** — fă mai puține, dar bine finisate.  
2. **Obiecte care se ating și se intersectează** — verifică din față și de sus.  
3. **Toate obiectele au aceeași culoare** — creează materiale separate.  
4. **Lumina prea slabă** — mărește Strength / Power.  
5. **Ai uitat să salvezi** — **Ctrl + S**, des!

---

## De făcut azi — „Mini-diorama”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Bază + 3 obiecte colorate + lumină + cameră + randare |
| **Complet** | Minim + 6 obiecte + 5 materiale + 2 lumini + nume + compoziție |

### Pasul 1 — Minim
- [ ] Baza și 3 obiecte  
- [ ] Randare salvată  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] 6 obiecte, 5 materiale, 2 lumini  
- [ ] Piese denumite  
- [ ] Verificarea finală completată  
- [ ] Numele `B1_L10` e corect

---

## Bonus
- [ ] Fă **două randări** din unghiuri diferite

## Recapitulare rapidă — tot Modulul 1
1. Interfață, navigare, **G R S**  
2. Forme de bază, personaje, casă  
3. Materiale, lumini, cameră  
4. Randare și proiect complet

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Alege o temă` → `Baza` → `Obiecte din lecțiile trecute` → `Organizare` → `Culori, lumini, cameră` → `Lista de verificare` → `Verificare finală Modul 1`

## Mai departe *(opțional)*
Arată dioramele colegilor și spune pentru fiecare un lucru care îți place. În Modulul 2 intri în **Edit Mode** și poți modela forme mult mai libere.

## Quiz scurt
- Care sunt cele trei tipuri de transformări?  
- Ce motor de randare e mai rapid?  
- Cum faci un obiect să se miște împreună cu alte piese?

## Temă
Alege un obiect din scena ta și scrie ce ai schimba la el în Modulul 2.
