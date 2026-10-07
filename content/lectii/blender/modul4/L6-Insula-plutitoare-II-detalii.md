# Lecția 6 — Insula plutitoare II: detalii
**Modulul 4 · Proiecte 3D complete**  
**Code Maker Club · Blender Creator**

> Insula ta e goală. Azi o aduci la viață: **copaci, stânci, o căsuță, un lac și nori**. Vei refolosi lucruri învățate și vei învăța să **duplici inteligent**.  
> Proiect: **„Insula mea”** (partea II) · `Prenume_Nume_B4_L06.blend`

---

## Obiectiv
La finalul orei insula are viață: vegetație, o casă, un lac și nori.  
**Minim:** 5 copaci și o casă.  
**Complet:** Minim + **lac**, **stânci**, **nori** și copaci **diferiți** (nu toți la fel).

## De ce contează
Detaliile fac o scenă credibilă. Trucul: câteva **forme simple**, repetate cu **variații** (mărime, rotație), arată bogat fără mult efort.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 |
| 10–40 | Copacul |
| 40–65 | Duplicare cu variații |
| 65–90 | Casa, lacul, stâncile |
| 90–110 | Norii |
| 110–120 | Recap, galerie |

**Ce ai nevoie:** Blender 4.2 · fișierul din L5

---

## Pas cu pas

### 1) Copacul low-poly
1. **Cylinder** pentru trunchi: **Vertices 6, Radius 0.15, Depth 1**, material maro. Pune-l la **Z = 0.5** deasupra terenului (Z-ul reliefului).  
2. **Cone** pentru coroană: **Vertices 6, Radius 0.7, Depth 1.2**, la **Z = 1.6**, material verde.  
3. Un al doilea con mai mic, **Radius 0.5**, la **Z = 2.1**. Brad din 2–3 etaje.  
4. Selectează toate piesele copacului și **Ctrl + J** (Join), apoi **F2** → „Copac”.  
5. **Origin** la baza copacului: **Shift + S → Cursor to Selected** pe vârfurile din bază (Edit Mode), apoi **Object → Set Origin → Origin to 3D Cursor**.

### 2) Duplicare cu variații
1. **Shift + D**, **Enter**, mută copacul pe insulă; fă **5–8** copaci.  
2. Pentru fiecare: **S** diferit (0.7 – 1.3) și **R Z** diferit (rotire aleatorie).  
3. **Variație de culoare:** un al doilea material verde (mai închis) la 2 copaci.  
4. **Alt + D** (linked duplicate) = copiile **împart aceeași formă**: dacă schimbi unul, se schimbă toate. Bun pentru economie, dar evită-l când vrei modificări diferite.

> Nu pune copacii în **linie**. Grupează-i în 2–3 **păduri mici** și lasă spații libere.

### 3) Casa
Refolosește casa din Modulul 1 (L6) sau construiește una mică:

1. **Cube** pentru pereți (Dimensions 1.6 × 1.4 × 1).  
2. **Cone** cu 4 laturi pentru acoperiș, rotit **R Z 45**.  
3. Ușă și fereastră: cuburi mici, culori diferite.  
4. **Ctrl + J**, **F2** → „Casa”, așezat pe un deal sau lângă lac.

Poți **importa** casa din alt fișier: **File → Append → fișier.blend → Object → Casa**.

### 4) Lacul
1. Selectează fețele dintr-o **vale** a terenului.  
2. **I 0.8** (inset), **E Z −0.15** (scoate o adâncitură).  
3. **Plane** albastru deschis, semi-transparent, la nivelul apei: **Principled BSDF → Alpha 0.7**, **Roughness 0.05**.  
4. Pentru EEVEE: **Material → Settings → Blend Mode: Alpha Blend** (în 4.2: **Render Method: Blended**).

### 5) Stâncile
1. **Ico Sphere**, **Subdivisions 1**, **S 0.4**.  
2. **Tab**, mută câteva vârfuri aleatoriu (**G**), **Shade Flat**, material gri.  
3. Duplică de 4–5 ori, mărimi și rotiri diferite, lângă lac și copaci.

### 6) Norii
1. **Ico Sphere** (Subdivisions 2) sau **UV Sphere**, **Shade Smooth**, material alb.  
2. Fă un nor din **3–4 sfere** de mărimi diferite, lipite. **Ctrl + J**.  
3. **Material alb** cu **Roughness 1**; Emission mic (0.3) ca să arate luminos.  
4. 3 nori la înălțimi și mărimi diferite, **în jurul** insulei, nu deasupra ei.

### 7) Privirea de ansamblu
**Numpad 0** (din cameră): ai o **poveste**? Un drum între casă și lac? Un copac „special”?

### Dacă ai terminat devreme
- [ ] Un **pod** peste lac  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Copacii plutesc sau intră în teren** — verifică Z-ul reliefului.  
2. **Toți la fel** — variază mărimea și rotirea.  
3. **Lacul acoperă casa** — verifică poziția.  
4. **Prea multe detalii** — scena devine încărcată.  
5. **Alt + D confundat cu Shift + D** — nu modifica o copie legată dacă vrei diferențe.

---

## De făcut azi — „Insula mea” (II)

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 5 copaci + casă |
| **Complet** | Minim + lac + stânci + nori + variații |

### Pasul 1 — Minim
- [ ] Copac low-poly  
- [ ] 5 copaci pe insulă  
- [ ] Casa  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Lac și stânci  
- [ ] 3 nori  
- [ ] Variații de mărime și culoare  
- [ ] Numele `B4_L06` e corect

---

## Bonus
- [ ] O **cascadă** care cade de pe marginea insulei

## Recapitulare rapidă
1. Forme simple, repetate cu variații  
2. **Shift + D** copie, **Alt + D** copie legată  
3. Origin la baza obiectelor  
4. Grupează copacii, nu-i alinia

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Copacul low-poly` → `Duplicare cu variații` → `Casa` → `Lacul` → `Stâncile` → `Norii` → `Privirea de ansamblu`

## Mai departe *(opțional)*
Uită-te la o pădure: copacii sunt la fel? Ce diferă?

## Quiz scurt
- Care e diferența dintre Shift + D și Alt + D?  
- De ce variem mărimea copacilor?  
- Cum faci un lac?

## Temă
Desenează o altă insulă cu o altă temă (deșert, zăpadă, junglă) și listează 5 obiecte pentru ea.
