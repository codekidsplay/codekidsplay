# Lecția 1 — Subdivision: fructe rotunde
**Modulul 3 · Modificatori și materiale**  
**Code Maker Club · Modifier Maker**

> Începem Modulul 3 cu cel mai magic modificator: **Subdivision Surface**. Cu el, un cub cu colțuri devine o formă rotundă și netedă, ideală pentru fructe, personaje și jucării.  
> Proiect: **„Coșul cu fructe”** · `Prenume_Nume_B3_L01.blend`

---

## Obiectiv
La finalul orei ai 3 fructe rotunde, modelate dintr-o „cușcă” simplă de fețe.  
**Minim:** un măr dintr-un cub cu Subdivision.  
**Complet:** Minim + o **pară** și o **prună**, cu codițe și frunze, și materiale colorate.

## De ce contează
Personajele din filmele de animație sunt modelate **grosier**, iar Subdivision le rotunjește. Modelezi cu **puține** puncte și obții forme moi.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap Modul 2 |
| 10–35 | Subdivision Surface |
| 35–70 | Mărul |
| 70–105 | Pară și prună |
| 105–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Ce face Subdivision
**Subdivision Surface** împarte fiecare față în mai multe, apoi le „topește” într-o suprafață fină. Cubul devine aproape o **sferă**.

| Cum îl adaugi | Rezultat |
|---------------|----------|
| **Ctrl + 1 / 2 / 3** (în Object Mode) | nivel 1 / 2 / 3 |
| **Modifiers → Add Modifier → Generate → Subdivision Surface** | cu opțiuni |

Setările importante:

| Setare | Ce e |
|--------|------|
| **Levels Viewport** | nivel pe ecran (2 e bun) |
| **Render** | nivel la randare (poate fi mai mare, ex. 3) |

### 2) Din cub, o sferă
Apasă **Ctrl + 2** pe cubul de start. Apoi **Tab** și mută un colț: forma se schimbă **fin**, ca plastilina.

> **Regula de aur:** cu cât mai **puține** vârfuri ai, cu atât forma e mai **moale**. Adaugă vârfuri doar unde ai nevoie de mai mult detaliu.

### 3) Mărul
1. Cub, **Ctrl + 2** (Subdivision).  
2. **Tab**, modul **Face** (**3**). **Alt + Z**.  
3. Selectează fața de **sus**. **G Z −0.3 Enter**: se formează adâncitura unde stă codița.  
4. Selectează fața de **jos**, **S 0.6 Enter**: mărul se strânge puțin jos.  
5. Selectează toate (**A**) și **S Z 0.9** (puțin turtit).  
6. **Tab**, **Shade Smooth**.

**Codița:** un **Cylinder** subțire (Radius 0.04, Depth 0.5), puțin curbat (în Edit Mode, mută vârful de sus lateral). Maro.  
**Frunza:** un **Plane**, rotit și îngustat, cu Subdivision. Verde.

### 4) Pară și prună
**Para:**  
1. Cub + **Ctrl + 2**.  
2. În Edit Mode, selectează **fețele de sus** și **S 0.5** (partea de sus mai îngustă).  
3. **Proportional Editing (O)** + **G Z 0.6**: gâtul se lungește.  
4. Galben-verzuie.

**Pruna:**  
1. Cub + **Ctrl + 2**, **S Y 0.9**.  
2. O linie care o împarte în două: o **adâncitură pe lung** (Alt + click pe un inel lateral, **S 0.9**).  
3. Mov închis, **Roughness 0.3**.

### 5) Margini ascuțite pe loc (opțional)
Uneori vrei ca o margine să rămână ascuțită, ca la o cutie cu colțuri.

- Selectează muchia în Edit Mode, **Shift + E**, trage mouse-ul spre **1**: ai marcat o **muchie ascuțită** (crease). Subdivision nu o mai rotunjește.

### 6) Complet — coșul
- Pune cele 3 fructe într-un **coș** simplu (cilindru fără capac, făcut în lecția următoare) sau pe un **plan**.  
- Materiale diferite.  
- **Randare** cu o singură lumină Area, deasupra.

### Dacă ai terminat devreme
- [ ] O **banană** (curbă din cilindru + Subdivision)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Fructul e prea mic / dispare** — subdivision micșorează forma; scalează înapoi.  
2. **Forma are cute urâte** — ai prea multe vârfuri apropiate; șterge-le.  
3. **Nu vezi diferența** — modificatorul e oprit (ochiul din listă).  
4. **Randarea e lentă** — nivelul Render e prea mare (4–5).  
5. **Colțuri nedorite** — adaugă un loop cut aproape de margine, ca să o ții „întărită”.

---

## De făcut azi — „Coșul cu fructe”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Un măr din cub + Subdivision |
| **Complet** | Minim + pară + prună + codițe + frunze + materiale |

### Pasul 1 — Minim
- [ ] Cub cu **Ctrl + 2**  
- [ ] Adâncitura de sus  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] 3 fructe diferite  
- [ ] Codițe și frunze  
- [ ] Culori și randare  
- [ ] Numele `B3_L01` e corect

---

## Bonus
- [ ] O **căpșună** cu puncte (seminte) pe suprafață

## Recapitulare rapidă
1. **Ctrl + 1/2/3** = Subdivision  
2. Puține vârfuri = formă mai moale  
3. **Shift + E** = muchie ascuțită  
4. Render level poate fi mai mare decât Viewport

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Ce face Subdivision` → `Din cub, o sferă` → `Mărul` → `Pară și prună` → `Margini ascuțite pe loc (opțional)` → `Complet — coșul`

## Mai departe *(opțional)*
Uită-te la fructe adevărate: cât de simetrice sunt? Ce forme „grosiere” ai folosi pentru a le imita?

## Quiz scurt
- Ce face Subdivision Surface?  
- De ce modelăm cu puține vârfuri?  
- Cum faci o muchie ascuțită?

## Temă
Alege 3 jucării rotunde și spune de la ce formă (cub, cilindru) ai pleca.
