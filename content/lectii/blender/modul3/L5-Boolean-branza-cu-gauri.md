# Lecția 5 — Boolean: brânza cu găuri
**Modulul 3 · Modificatori și materiale**  
**Code Maker Club · Modifier Maker**

> Cu modificatorul **Boolean** poți **tăia** un obiect cu altul, ca și cum ai folosi un tăietor de biscuiți. Azi faci o **bucată de brânză** cu găuri și o **casă** cu ușă și fereastră tăiate.  
> Proiect: **„Brânza și casa”** · `Prenume_Nume_B3_L05.blend`

---

## Obiectiv
La finalul orei tai forme din obiecte folosind Boolean.  
**Minim:** brânză cu 3 găuri făcute cu sfere.  
**Complet:** Minim + **mai multe găuri dintr-o colecție** + o **casă** cu ușă și fereastră tăiate din pereți.

## De ce contează
Când vrei o gaură „perfectă” (fereastră, șurub, țeavă) într-un obiect, Boolean e cea mai rapidă metodă. E și foarte amuzant!

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4 |
| 10–35 | Boolean pas cu pas |
| 35–70 | Brânza |
| 70–105 | Casa |
| 105–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Cum merge Boolean
- Ai **un obiect de tăiat** (brânza) și **un obiect-tăietor** (sfera).  
- Modificatorul se pune **pe obiectul de tăiat** și i se spune cine e tăietorul.

| Operație | Ce face |
|----------|---------|
| **Difference** | scade tăietorul din obiect (face gaura) |
| **Union** | unește cele două |
| **Intersect** | păstrează doar ce se suprapune |

### 2) Brânza
1. Un **Cylinder** ca o roată de brânză: **Vertices 32**, **Radius 1**, **Depth 0.8**, **Z = 0.4**.  
2. **Shift + A → Mesh → UV Sphere**, **Radius 0.25**, pune-o pe marginea de sus a brânzei, cu jumătate din sferă înăuntru.  
3. Selectează **brânza** → **Add Modifier → Generate → Boolean**.  
4. **Operation: Difference**. **Object**: alege sfera.  
5. Apare o gaură! Mută sfera cu **G** și vezi cum gaura se mută.

### 3) Ascundem tăietorul
Sfera tăietor stă acolo și te încurcă. Îi poți schimba felul de afișare:

- Selectează sfera, **Properties → Object → Viewport Display → Display As: Wire** (sau **Bounds**). Se vede doar contururile.  
- Sau ascunde-o cu **H** (și o readuci cu **Alt + H**).

### 4) Mai multe găuri dintr-o dată
Ar fi obositor să pui 10 modificatoare. Folosește o **colecție**:

1. Fă 8 sfere de mărimi diferite pe brânză.  
2. Selectează-le pe toate (**Shift + click**), apasă **M → New Collection** și numește colecția `Gauri`.  
3. Pe brânză, **Boolean → Operand Type: Collection → Collection: Gauri**.  
4. Toate găurile apar deodată. Mută o sferă și gaura se mișcă.

### 5) Complet — „materialul brânzei”
- Brânza: galben pal, **Roughness 0.5**.  
- Poți face un șoricel (sfere + conuri) lângă ea.

### 6) Casa cu ușă și fereastră
1. **Cube** mare pentru perete (Dimensions X 4, Y 0.3, Z 3).  
2. **Cube** pentru ușă (Dimensions X 0.9, Y 0.6, Z 2), poziționat în perete, la **Z = 1**.  
3. **Cube** pentru fereastră (Dimensions X 1, Y 0.6, Z 1), la **X = 1.2**, **Z = 1.6**.  
4. Pune-le într-o colecție `Taieturi` (M → New Collection).  
5. Pe perete: **Boolean → Difference → Collection: Taieturi**.  
6. Ascunde tăietorii (**Display As: Wire** sau **H**). Peretele are ușă și fereastră!

### 7) Aplicăm modificatorul
Când ești mulțumit, **Apply** (Ctrl + A pe modificator) ca peretele să devină un obiect normal. Atenție: nu mai poți muta găurile.

### Dacă ai terminat devreme
- [ ] O **cheie** care se potrivește într-o broască (Difference între cheie și o placă)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Nu apare gaura** — tăietorul nu e în obiect, sau Operation e Union.  
2. **Rezultate ciudate** — feței se suprapun exact; mută puțin tăietorul.  
3. **Tăietorul nu dispare** — e încă vizibil; Display As Wire sau H.  
4. **Găurile nu se văd în randare** — modificatorul e oprit la **Render** (iconița cameră).  
5. **Obiectul devine greu** — prea multe găuri; aplică modificatorul și curăță.

---

## De făcut azi — „Brânza și casa”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Brânză cu 3 găuri |
| **Complet** | Minim + găuri din colecție + perete cu ușă și fereastră |

### Pasul 1 — Minim
- [ ] Boolean cu Difference  
- [ ] 3 găuri  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Colecție de tăietori  
- [ ] Perete cu ușă și fereastră  
- [ ] Tăietorii ascunși  
- [ ] Numele `B3_L05` e corect

---

## Bonus
- [ ] Un **dovleac de Halloween** cu fața tăiată

## Recapitulare rapidă
1. **Boolean** = tăiere cu un alt obiect  
2. **Difference · Union · Intersect**  
3. Colecție pentru mai mulți tăietori  
4. **Display As: Wire** ascunde tăietorul

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Cum merge Boolean` → `Brânza` → `Ascundem tăietorul` → `Mai multe găuri dintr-o dată` → `Complet — „materialul brânzei”` → `Casa cu ușă și fereastră` → `Aplicăm modificatorul`

## Mai departe *(opțional)*
Uită-te la un perete cu uși și ferestre: ai putea să le modelezi toate cu Boolean?

## Quiz scurt
- Ce face Difference?  
- Cum ascunzi tăietorul?  
- La ce folosește colecția?

## Temă
Desenează o formă cu 3 găuri și spune ce obiecte ai folosi ca tăietori.
