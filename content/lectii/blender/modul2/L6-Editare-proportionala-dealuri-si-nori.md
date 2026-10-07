# Lecția 6 — Editare proporțională: dealuri și nori
**Modulul 2 · Modelare în Edit Mode**  
**Code Maker Club · Mesh Modeler**

> Când muți un vârf, vecinii lui rămân pe loc și apare un „vârf ascuțit”. Cu **editarea proporțională** trage după el și zona din jur, ca atunci când tragi de o față de masă.  
> Proiect: **„Dealuri și nori”** · `Prenume_Nume_B2_L06.blend`

---

## Obiectiv
La finalul orei ai un peisaj cu dealuri rotunde și nori pufoși.  
**Minim:** activezi **Proportional Editing** și faci 3 dealuri rotunde pe o grilă.  
**Complet:** Minim + reglezi raza cu **rotița**, încerci **tipuri de atenuare** și modelezi **3 nori** din sfere deformate.

## De ce contează
Natura nu are colțuri: dealurile, norii, fețele sunt moi. Editarea proporțională e unealta principală pentru forme organice.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 |
| 10–40 | Proportional Editing (tasta O) |
| 40–75 | Dealuri rotunde |
| 75–105 | Nori |
| 105–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start (fără cub)

---

## Pas cu pas

### 1) Pregătirea
**Shift + A → Mesh → Grid**: **X și Y Subdivisions = 30**, **Size = 12**. **Tab**, modul **Vertex** (**1**), **7** (de sus).

> Grila trebuie să aibă **multe** vârfuri ca dealurile să iasă netede.

### 2) Pornim Proportional Editing
- Apasă **O** (litera) în Edit Mode. În bara de sus apare cercul cu puncte.  
- Selectează **un singur vârf** din mijloc.  
- **G Z 3**: nu mai spune Enter încă! Mișcă **rotița mouse-ului**: un cerc mare apare în jurul punctului, iar zona din cerc se ridică **odată cu el**. Rotița mărește sau micșorează cercul.  
- Confirmă cu **Enter**.

### 3) Tipuri de atenuare (Falloff)
În bara de sus, lângă cerc, ai o listă:

| Tip | Cum arată dealul |
|-----|------------------|
| **Smooth** | rotunjit, natural (cel mai bun) |
| **Sphere** | bombat |
| **Sharp** | ascuțit |
| **Linear** | con |
| **Random** | zgrunțuros |

Încearcă fiecare pe un deal diferit. Schimbarea se face și cu **Shift + O**.

### 4) Dealurile
1. Alege 3 vârfuri în locuri diferite.  
2. Pentru fiecare: **G Z** (cu cifre diferite, 2, 3, 1.5) și reglează raza cu rotița.  
3. Un **deal lat** (rază mare) și un **deal ascuțit** (rază mică).  
4. Pentru o **vale**: **G Z −2** pe un vârf.

Ieși cu **Tab**, **Shade Smooth**.

### 5) Norii
1. **Shift + A → Mesh → UV Sphere** (Segments 32, Rings 16). Mută-l sus: **Z = 6**.  
2. **S X 1.6**, **S Y 1.0**, **S Z 0.7** (un nor lat).  
3. **Tab**. **O** pornit. Alege câte un vârf și **G** + rotița: faci „bule” pe suprafață.  
4. Fă 3–4 bule mari pe partea de sus și 2 pe lateral.  
5. **Shade Smooth**. Material alb, Roughness 1.

Mărește cu **Shift + D** și așază 3 nori în locuri diferite, cu mărimi diferite.

### 6) Complet — scenă completă
- Peisajul: material verde (iarbă). Un deal în plan apropiat, două în fundal.  
- Norii: 3 bucăți, în locuri diferite.  
- Lumină **Sun** caldă + cameră de unde se văd dealurile (L8, Modulul 1).  
- Randează o imagine PNG.

### Dacă ai terminat devreme
- [ ] Un **lac** (plan albastru în vale)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Dealul e ascuțit** — nu ai pornit **O**.  
2. **Dealul e ciudat de mic** — raza e mică; mărește cu rotița **în timp ce** muți.  
3. **Rotița schimbă zoom-ul** — nu ai început încă mutarea (G).  
4. **Grila are prea puține vârfuri** — folosește 30 × 30.  
5. **Ai uitat să oprești O** — dacă apoi muți vârfuri izolate, pornește / oprește tasta **O** după nevoie.

---

## De făcut azi — „Dealuri și nori”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 3 dealuri rotunde pe grilă |
| **Complet** | Minim + atenuări diferite + 3 nori + randare |

### Pasul 1 — Minim
- [ ] Grilă 30 × 30  
- [ ] Proportional Editing pornit  
- [ ] 3 dealuri  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Valea și deal ascuțit  
- [ ] 3 nori diferiți  
- [ ] Randare PNG  
- [ ] Numele `B2_L06` e corect

---

## Bonus
- [ ] Un **soare** (sferă galbenă, Emission) deasupra dealurilor

## Recapitulare rapidă
1. **O** = Proportional Editing  
2. **Rotița** = raza zonei  
3. **Smooth** = formă naturală  
4. Forme organice = vârfuri multe

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Pregătirea` → `Pornim Proportional Editing` → `Tipuri de atenuare (Falloff)` → `Dealurile` → `Norii` → `Complet — scenă completă`

## Mai departe *(opțional)*
Privește norii pe cer: nu sunt niciodată la fel. Alege unul și încearcă să-i imiți forma.

## Quiz scurt
- Ce tastă pornește Proportional Editing?  
- Cu ce schimbi raza?  
- Ce tip de atenuare dă un deal natural?

## Temă
Desenează un peisaj cu 3 tipuri de dealuri (rotund, ascuțit, lat) și scrie ce atenuare ai alege.
