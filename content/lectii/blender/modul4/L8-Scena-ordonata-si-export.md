# Lecția 8 — Scenă ordonată și export
**Modulul 4 · Proiecte 3D complete**  
**Code Maker Club · Blender Creator**

> Un fișier Blender ordonat se deschide ușor și se poate **partaja**. Azi înveți să-ți organizezi scena (nume, colecții), să-ți **cureți** fișierul și să-ți **exporți** modelele.  
> Proiect: **„Scena curată”** · `Prenume_Nume_B4_L08.blend` + `.glb` + `.png`

---

## Obiectiv
La finalul orei scena ta e ordonată și exportată în două formate.  
**Minim:** toate obiectele cu nume clare și colecții.  
**Complet:** Minim + **Apply Scale**, **Purge**, export **.glb** și **randare .png**.

## De ce contează
După câteva ore de lucru, scena are „Cube.034” și „Sphere.012”. Cine deschide fișierul (sau tu peste o lună) nu se mai descurcă. Ordinea e ca o cameră aranjată.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7 |
| 10–40 | Nume și colecții |
| 40–65 | Curățenie tehnică |
| 65–95 | Export |
| 95–120 | Recap, galerie |

**Ce ai nevoie:** Blender 4.2 · insula din L7 sau personajul din L4

---

## Pas cu pas

### 1) Nume clare
Deschide **Outliner**, **dublu-click** (sau **F2** în viewport) și redenumește:

| Rău | Bine |
|-----|------|
| Cube.034 | Casa_Pereti |
| Cone.012 | Copac_01 |
| Sphere.003 | Nor_02 |

> Folosește **fără spații sau diacritice** (Casa_Pereti, nu „Casa pereți”): evită probleme la export.

### 2) Colecții
**Colecțiile** sunt „dosare” în Outliner.

1. Selectează copacii în viewport.  
2. **M → + New Collection** → „Copaci”.  
3. La fel: „Casa”, „Teren”, „Nori”, „Lumini”, „Camera”.  
4. În Outliner, **ochiul** ascunde / arată o colecție, **camera** (Disable in Renders) o scoate din randare.

### 3) Legare și grupare
- Piesele unui obiect complex (casa) sunt fie **unite** (**Ctrl + J**), fie **legate** cu **Ctrl + P**.  
- Fiecare obiect principal are **origin la baza lui**.

### 4) Apply Scale
Dacă ai scalat obiecte cu **S**, ele rețin „scara” (3D scale ≠ 1). Asta poate strica modificatorii și exportul.

1. Selectează toate obiectele (**A**).  
2. **Ctrl + A → Scale** (Apply).  
3. Verifică în **N → Item → Scale = 1.000**.

### 5) Curățenia fișierului
1. **File → Clean Up → Purge Unused Data** (Recursive).  
2. Șterge materialele neutilizate din Material Properties.  
3. Verifică în Outliner → **Blender File** dacă mai ai obiecte inutile.

### 6) Export pentru alte programe
Format **glTF** (.glb): „JPEG-ul 3D”, citit de browsere, jocuri, aplicații.

1. Selectează obiectele de exportat.  
2. **File → Export → glTF 2.0 (.glb/.gltf)**.  
3. **Format: glTF Binary (.glb)**, bifează **Include → Selected Objects**.  
4. Alege nume și **Export**.  
5. Vizualizează-l online cu un **glTF viewer** din browser, sau cu aplicația „3D Viewer” din Windows.

### 7) Imagine pentru portofoliu
1. **F12**, **Image → Save As**, format **PNG**.  
2. Rezoluția **1920 × 1080**, apoi o variantă **pătrată** 1080 × 1080 pentru social media.

### 8) Fișierul final
- **File → Save As**, nume clar cu versiune: `Insula_v3.blend`.  
- **File → External Data → Pack Resources** dacă ai texturi externe.  
- Pune **toate fișierele** (blend, glb, png) într-un singur folder: `Prenume_Nume_Proiect`.

### Dacă ai terminat devreme
- [ ] Un fișier `README.txt` cu titlul proiectului și ce ai folosit  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Export gol** — nu ai selectat nimic și ai bifat „Selected Objects”.  
2. **Export cu obiecte deformate** — nu ai făcut Apply Scale.  
3. **Fișier uriaș** — Subdivision prea mare; scade nivelul înainte de export.  
4. **Texturi lipsă** — fișierele externe nu sunt împachetate.  
5. **Nume cu diacritice** — pot face probleme.

---

## De făcut azi — „Scena curată”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Nume clare + colecții |
| **Complet** | Minim + Apply Scale + Purge + .glb + .png |

### Pasul 1 — Minim
- [ ] Obiectele redenumite  
- [ ] Colecții  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Apply Scale  
- [ ] Purge Unused Data  
- [ ] Export .glb  
- [ ] Randare .png  
- [ ] Numele `B4_L08` e corect

---

## Bonus
- [ ] Verifică .glb-ul într-un viewer și fă un screenshot

## Recapitulare rapidă
1. Nume clare, fără spații  
2. Colecții  
3. **Ctrl + A → Scale**  
4. **Purge**  
5. **glTF** = format universal

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Nume clare` → `Colecții` → `Legare și grupare` → `Apply Scale` → `Curățenia fișierului` → `Export pentru alte programe` → `Imagine pentru portofoliu` → `Fișierul final`

## Mai departe *(opțional)*
Caută „Sketchfab”: o platformă unde artiștii își arată modelele 3D (cu acordul unui adult).

## Quiz scurt
- De ce redenumim obiectele?  
- Ce face Apply Scale?  
- Ce e un fișier .glb?

## Temă
Alege 3 obiecte din casă și dă-le nume bune, scrise pe hârtie.
