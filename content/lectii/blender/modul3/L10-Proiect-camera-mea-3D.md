# Lecția 10 — Proiect: camera mea 3D
**Modulul 3 · Modificatori și materiale**  
**Code Maker Club · Modifier Maker**

> Proiectul modulului: construiești **camera ta de vis** în 3D, cu pat, birou, raft, fereastră și lumini. Folosești modificatori, materiale și lumini, tot ce ai învățat în acest modul.  
> Proiect: **„Camera mea 3D”** · `Prenume_Nume_B3_L10.blend` + `.png`

---

## Obiectiv
La finalul orei ai o cameră mobilată, colorată și luminată, randată într-o imagine.  
**Minim:** podea, 2 pereți, pat, birou, o lumină, camera.  
**Complet:** Minim + **fereastră tăiată** (Boolean) + **raft** (Array) + **pernă** (Subdivision) + **materiale cu texturi** + 3 lumini.

## De ce contează
Modelele de interior se folosesc în arhitectură, jocuri și filme. Aici îți aplici toate modificatoarele într-o scenă coerentă.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap modul · planul camerei |
| 10–35 | Pereți, podea, fereastră |
| 35–80 | Mobilier |
| 80–105 | Materiale și lumini |
| 105–120 | Randare, verificare modul, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Planul
Desenează pe hârtie camera văzută de sus: unde sunt patul, biroul, fereastra, ușa, raftul. Dimensiuni sugerate:

| Element | Dimensiuni (X × Y × Z) |
|---------|------------------------|
| Camera | 5 × 4 × 2.7 |
| Pat | 1 × 2 × 0.5 |
| Birou | 1.2 × 0.6 × 0.75 |
| Raft | 1 × 0.25 × 1.5 |

### 2) Pereții și podeaua
- **Plane** pentru podea (Dimensions X 5, Y 4).  
- 2 sau 3 **Cube**-uri subțiri (Y 0.1) pentru pereți, **Z = 1.35**.  
- **Fereastra:** un cub tăietor + **Boolean → Difference** (L5).

### 3) Patul (modificatori)
- **Cadru:** cub cu **Bevel**.  
- **Saltea:** cub mai mic, **Bevel + Subdivision** (nivel 2).  
- **Pernă:** cub, **Ctrl + 2** (Subdivision), puțin turtit; **Shade Smooth**.  
- **Pătură:** plan cu **Subdivision**, ușor ondulat cu **Proportional Editing**.

### 4) Biroul și scaunul
- **Blat:** cub, **Bevel**.  
- **Picioare:** 4 cilindri subțiri (un picior + **Array** sau **Mirror**).  
- **Scaun:** un cub (șezut) + 4 picioare + spătar, cu **Bevel**.

### 5) Raftul (Array)
- Un **plan** vertical, **Solidify** (grosime 0.03).  
- O **placă** orizontală: **Array → Count 4 → Constant Offset Z 0.4** (4 rafturi).  
- Pe raft: câteva cărți (cuburi colorate cu **Array**), o plantă (sferă + cilindru).

### 6) Materiale
| Element | Material |
|---------|----------|
| Pereți | alb-cald, Roughness 0.9 |
| Podea | **lemn** (Wave Texture + Color Ramp) sau Checker |
| Pat | textil albastru (Roughness 1) |
| Birou, raft | lemn deschis |
| Fereastră | geam (Transmission) |
| Lampă | **Emission** |

### 7) Lumini
- **Sun** prin fereastră (lumina de zi), culoare caldă, Strength 3.  
- **Area** albastră deasupra, mică, ca umplere.  
- **Point** (lampa de birou), galbenă, Power 200 W.

### 8) Camera și randarea
- Camera într-un colț, lentilă **24–28 mm** (camere interioare, cadrul larg).  
- Verifică **regula treimilor**.  
- **EEVEE**, 1920 × 1080, F12, `Prenume_Nume_B3_L10.png`.

### 9) Verificare finală Modul 3

| Pot să… | Încă nu | Cu ajutor | Singur |
|---------|---------|-----------|--------|
| folosesc **Subdivision**, **Solidify**, **Array**, **Bevel** | ☐ | ☐ | ☐ |
| tai cu **Boolean** | ☐ | ☐ | ☐ |
| fac țevi și cabluri din curbe | ☐ | ☐ | ☐ |
| creez materiale cu **Principled BSDF** | ☐ | ☐ | ☐ |
| fac o textură simplă cu noduri | ☐ | ☐ | ☐ |
| luminez o scenă cu 3 lumini | ☐ | ☐ | ☐ |

### Dacă ai terminat devreme
- [ ] Un **covor** rotund, cu o textură  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Mobila plutește** — verifică din lateral (**3**) și coboară-o la **Z = 0**.  
2. **Dimensiuni nerealiste** — compară cu planul de sus (patul de 2 m, nu 5).  
3. **Camera e prea întunecată** — adaugă lumină prin fereastră.  
4. **Prea multe detalii, prea puțin timp** — termină întâi piesele mari.  
5. **Modificatoare uitate** — verifică ochiul din listă la **Render**.

---

## De făcut azi — „Camera mea 3D”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Cameră + pat + birou + lumină + randare |
| **Complet** | Minim + fereastră + raft + pernă + materiale + 3 lumini |

### Pasul 1 — Minim
- [ ] Podea, 2 pereți  
- [ ] Pat și birou  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Boolean, Array, Subdivision folosite  
- [ ] Materiale cu texturi  
- [ ] Randare finală  
- [ ] Verificarea finală completată  
- [ ] Numele `B3_L10` e corect

---

## Bonus
- [ ] Un **poster** pe perete (plan cu culori)

## Recapitulare rapidă — tot Modulul 3
1. Subdivision · Solidify · Array · Bevel · Boolean  
2. Curbe pentru cabluri și țevi  
3. Materiale și texturi cu noduri  
4. Lumini de studio

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Planul` → `Pereții și podeaua` → `Patul (modificatori)` → `Biroul și scaunul` → `Raftul (Array)` → `Materiale` → `Lumini` → `Camera și randarea` → `Verificare finală Modul 3`

## Mai departe *(opțional)*
Compară camera ta 3D cu cea reală. Ce ai schimba în camera reală după ce ai văzut-o în 3D?

## Quiz scurt
- Ce modificator folosești pentru fereastră?  
- Cum faci 4 rafturi identice?  
- Ce lumină pui prin fereastră?

## Temă
Desenează o altă cameră (bucătărie, atelier) și listează 5 obiecte și modificatorii pe care i-ai folosi.
