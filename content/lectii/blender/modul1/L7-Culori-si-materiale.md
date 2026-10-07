# Lecția 7 — Culori și materiale
**Modulul 1 · Primii pași în Blender**  
**Code Maker Club · Blender Starter**

> Azi dai **culoare** modelelor tale! Înveți ce e un material, cum alegi o culoare și cum faci ca un obiect să arate **lucios**, **mat** sau **metalic**.  
> Proiect: **„Casa colorată”** · `Prenume_Nume_B1_L07.blend`

---

## Obiectiv
La finalul orei casa ta e colorată și ai încercat 3 aspecte diferite: mat, lucios, metalic.  
**Minim:** colorezi 4 piese cu materiale diferite.  
**Complet:** Minim + reglezi **Roughness** și **Metallic** + **copiezi** un material pe alte obiecte.

## De ce contează
O scenă fără culoare arată ca un model de plastilină gri. **Materialele** spun cum arată suprafața: culoare, lucire, transparență.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6 · deschidem casa |
| 10–40 | Primul material, Base Color |
| 40–70 | Roughness și Metallic |
| 70–95 | Copierea materialelor |
| 95–120 | Casa colorată, recap, quiz |

**Ce ai nevoie:** Blender 4.2 · fișierul din L6 (sau al omulețului din L5)

---

## Pas cu pas

### 1) Vezi culorile în viewport
Colțul din dreapta sus al viewport-ului are 4 butoane („sfere”) pentru **modul de afișare**:

| Mod | Ce arată |
|-----|----------|
| **Wireframe** | doar liniile |
| **Solid** | gri, rapid (modul de lucru) |
| **Material Preview** | cu culori și lumini |
| **Rendered** | aproape ca la randarea finală |

Treci pe **Material Preview**, ca să vezi culorile.

### 2) Primul material
1. Selectează corpul casei.  
2. În **Properties** (dreapta-jos) alege tab-ul cu **sfera roșie** (Material).  
3. Apasă **New**.  
4. Vezi lista „Surface”. Click pe **Base Color** și alege o culoare (ex. galben).  
5. Dă un nume materialului (dublu click pe nume): `Perete`.

### 3) Cele trei butoane magice

| Setare | Ce schimbă | Valori |
|--------|------------|--------|
| **Base Color** | culoarea | orice |
| **Roughness** | cât de „lucios” e | 0 = oglindă, 1 = mat |
| **Metallic** | cât de metalic e | 0 = plastic/lemn, 1 = metal |

**Experiment:** pe o sferă:

| Aspect | Roughness | Metallic |
|--------|-----------|----------|
| Plastic mat | 0.8 | 0 |
| Plastic lucios | 0.2 | 0 |
| Metal lucios | 0.2 | 1 |
| Metal mat | 0.6 | 1 |

### 4) Culori pentru casă
Dă materiale diferite, câte unul pe piesă:

| Piesă | Material | Idee de culoare |
|-------|----------|-----------------|
| Corp | Perete | galben deschis, Roughness 0.8 |
| Acoperiș | Acoperis | roșu-cărămiziu, Roughness 0.6 |
| Ușă | Usa | maro, Roughness 0.7 |
| Ferestre | Geam | albastru deschis, Roughness 0.1 |
| Horn | Caramida | roșu închis |
| Pământ | Iarba | verde, Roughness 1 |

### 5) Copiem materiale
Dacă ai 3 ferestre și vrei **același** material pe toate:

1. Selectează **celelalte ferestre**.  
2. **La final** selectează fereastra care **are deja** materialul (ea e „activă”).  
3. **Ctrl + L → Link Materials.**  
Toate primesc materialul. Dacă modifici culoarea unui material, se schimbă **pe toate** obiectele care îl folosesc.

### 6) Complet — omulețul colorat
Deschide fișierul cu omulețul (L5) și dă-i culori:

| Piesă | Culoare |
|-------|---------|
| Sfere | alb, Roughness 0.6 |
| Nas | portocaliu |
| Ochi, nasturi | negru |
| Pălărie | negru sau albastru închis |

### Dacă ai terminat devreme
- [ ] O sferă cu aspect de **aur** (galben, Metallic 1, Roughness 0.25)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Nu vezi culoarea** — ești în modul **Solid**; treci pe **Material Preview**.  
2. **Toate obiectele au aceeași culoare** — folosesc **același material**.  
3. **Culoarea se schimbă pe alt obiect** — idem; apasă butonul cu cifra de lângă numele materialului ca să-l **faci unic**.  
4. **Metalul arată negru** — metalul „reflectă” mediul; într-o scenă goală pare închis. E normal; vezi L8–L9.  
5. **Materialul nu apare** — ai selectat altă piesă.

---

## De făcut azi — „Casa colorată”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 4 piese cu culori diferite |
| **Complet** | Minim + Roughness / Metallic + Link Materials + omuleț colorat |

### Pasul 1 — Minim
- [ ] Material Preview pornit  
- [ ] 4 materiale create  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Am ales Roughness diferit  
- [ ] Am folosit Ctrl + L  
- [ ] Am colorat și omulețul  
- [ ] Numele `B1_L07` e corect

---

## Bonus
- [ ] O culoare „secretă”: află ce face **Emission** (strălucire)

## Recapitulare rapidă
1. **Material** = cum arată suprafața  
2. **Base Color · Roughness · Metallic**  
3. **Ctrl + L → Link Materials** copiază materiale  
4. Material Preview arată culorile

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Vezi culorile în viewport` → `Primul material` → `Cele trei butoane magice` → `Culori pentru casă` → `Copiem materiale` → `Complet — omulețul colorat`

## Mai departe *(opțional)*
Priveste în jur: ce e lucios, ce e mat? Cum ai descrie un măr, o monedă și un pulover cu Roughness și Metallic?

## Quiz scurt
- Ce înseamnă Roughness 0?  
- Cum aplici același material pe mai multe obiecte?  
- În ce mod vezi culorile în viewport?

## Temă
Alege 3 obiecte din cameră și scrie ce valori de Roughness și Metallic ar avea.
