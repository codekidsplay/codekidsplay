# Lecția 7 — Lumini și atmosferă
**Modulul 4 · Proiecte 3D complete**  
**Code Maker Club · Blender Creator**

> Aceeași insulă poate părea **veselă**, **misterioasă** sau **liniștită**, doar schimbând lumina și cerul. Azi creezi **atmosfera**: un cer de apus, un soare, adâncimea imaginii și o randare finală frumoasă.  
> Proiect: **„Insula la apus”** · `Prenume_Nume_B4_L07.blend` + `.png`

---

## Obiectiv
La finalul orei insula ta e randată la apus, cu cer, soare și adâncime.  
**Minim:** un cer colorat și un soare.  
**Complet:** Minim + **Sky Texture**, **Depth of Field**, **randare în Cycles** cu denoise și comparație cu ziua.

## De ce contează
Filmele aleg ora zilei pentru fiecare scenă. Lumina de apus (galbenă, joasă) dă căldură; cea de noapte (albastră) dă mister.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6 |
| 10–40 | Cerul și soarele |
| 40–65 | Culori de atmosferă |
| 65–85 | Adâncimea (Depth of Field) |
| 85–120 | Cycles, comparație, galerie |

**Ce ai nevoie:** Blender 4.2 · fișierul din L6

---

## Pas cu pas

### 1) Cerul realist
1. **Properties → World**.  
2. La **Surface → Color**, click pe cerc și alege **Sky Texture**.  
3. Setează **Sky Type: Nishita**.  
4. **Sun Elevation** (înălțimea soarelui): **3°**. Soarele e jos, ca la apus.  
5. **Sun Rotation**: rotește până lumina vine din partea dorită.  
6. Treci viewport-ul în **Material Preview** (sau **Rendered**) ca să vezi cerul.

> Elevation **60°** = amiază; **3–10°** = răsărit/apus; **negativ** = noapte.

### 2) Soarele din scenă
Cerul dă lumină ambientală, dar pentru **umbre clare** adaugă un **Sun**:

1. **Shift + A → Light → Sun**. **Strength 3**.  
2. **Color** portocaliu pal.  
3. Rotește-l cu **R** până umbrele cad frumos pe insulă. Cât de lungi sunt umbrele?  
4. Pune soarele în **aceeași direcție** cu cel din cer.

### 3) Culorile atmosferei
| Momentul | Lumină | Cer |
|----------|--------|-----|
| **Zi** | albă-galbenă | albastru |
| **Apus** | portocaliu | portocaliu-roz |
| **Noapte** | albastru | albastru închis, stele |
| **Fantastic** | mov / turcoaz | verde-albastru |

Experimentează 3 variante cu **Sun Elevation** și culoarea Sun.

### 4) Adâncimea imaginii (DoF)
Cu **Depth of Field**, ce e aproape sau departe de țintă devine **estompat**, ca într-o fotografie.

1. Selectează **camera → Properties → Object Data (iconița camerei)**.  
2. Bifează **Depth of Field**.  
3. **Focus on Object**: alege casa (sau personajul).  
4. **F-Stop 2.8** (mai mic = mai estompat).  
5. Vezi fundalul estompat în **Rendered**.

### 5) Camera artistică
- Pune camera **ușor de jos în sus** pentru un aer „epic”.  
- **Focal Length 35–50 mm** pentru peisaj.  
- Insula în **treimea** inferioară, cerul în rest.

### 6) Cycles pentru calitate finală
1. **Properties → Render → Render Engine: Cycles**.  
2. **Max Samples 128** (preview mai mic), bifează **Denoise**.  
3. **Device: GPU Compute** dacă ai placă video; altfel CPU.  
4. **F12**. E mai lent (câteva minute), dar lumina e mai realistă.  
5. Compară cu **EEVEE**.

> Dacă durează prea mult: scade **Resolution %** la 50%.

### 7) Salvează o variantă de zi
Fă o copie a fișierului, **Sun Elevation 50°**, culoare albă. Randează `zi.png` și `apus.png`. Care ți se pare mai frumoasă?

### Dacă ai terminat devreme
- [ ] Variantă de **noapte** cu lumină de lună  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Randarea e zgomotoasă** — Denoise oprit sau Samples prea mic.  
2. **Cerul nu se vede în randare** — **Film → Transparent** e bifat.  
3. **Umbrele sunt în altă direcție decât soarele din cer** — aliniază-le.  
4. **Randare foarte lentă** — scade Samples sau rezoluția.  
5. **Imaginea e întunecată** — mărește Strength-ul soarelui.

---

## De făcut azi — „Insula la apus”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Cer + soare |
| **Complet** | Minim + DoF + Cycles + comparație zi / apus |

### Pasul 1 — Minim
- [ ] Sky Texture  
- [ ] Sun cu umbre  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] DoF  
- [ ] Randare Cycles  
- [ ] Două variante  
- [ ] Numele `B4_L07` e corect

---

## Bonus
- [ ] Un **felinar** care luminează casa (Point Light galben)

## Recapitulare rapidă
1. **World → Sky Texture** = cer  
2. Sun Elevation = ora zilei  
3. DoF = adâncime  
4. Cycles = calitate, EEVEE = viteză

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Cerul realist` → `Soarele din scenă` → `Culorile atmosferei` → `Adâncimea imaginii (DoF)` → `Camera artistică` → `Cycles pentru calitate finală` → `Salvează o variantă de zi`

## Mai departe *(opțional)*
Fotografiază cerul la apus: ce culori vezi aproape de orizont și sus?

## Quiz scurt
- Ce schimbă Sun Elevation?  
- Ce face Depth of Field?  
- Când folosești Cycles și când EEVEE?

## Temă
Alege un film preferat și descrie în 2 propoziții cum folosește lumina pentru atmosferă.
