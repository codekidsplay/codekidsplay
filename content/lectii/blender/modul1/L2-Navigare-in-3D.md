# Lecția 2 — Navigare în 3D
**Modulul 1 · Primii pași în Blender**  
**Code Maker Club · Blender Starter**

> Azi înveți să te **plimbi** prin lumea 3D: să te rotești în jurul unui obiect, să te apropii și să te îndepărtezi, să vezi din față, de sus și din lateral.  
> Proiect: **„Turul obiectului”** · `Prenume_Nume_B1_L02.blend`

---

## Obiectiv
La finalul orei te miști în 3D fără să te pierzi și găsești oricând obiectul.  
**Minim:** rotești, aproprii și deplasezi vederea cu mouse-ul.  
**Complet:** Minim + vezi scena din **față, dreapta, sus**, treci între **perspectivă** și **ortografic** și găsești orice obiect cu **Home** și **Numpad .**.

## De ce contează
Un obiect 3D are **lățime, înălțime și adâncime**. Ca să-l modelezi bine, îl privești din mai multe părți, ca atunci când te uiți la o jucărie.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1 |
| 10–45 | Rotire, deplasare, zoom |
| 45–75 | Vederi standard (față, dreapta, sus) |
| 75–105 | Perspectivă / ortografic, joc „găsește obiectul” |
| 105–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · fișierul din L1 sau unul nou · mouse cu rotiță (sau emulare)

---

## Pas cu pas

### 1) Deschide scena
**File → New → General.** Ai din nou cubul, lumina și camera.

### 2) Cele 3 mișcări de bază (mouse peste viewport)

| Ce vrei | Cu mouse-ul | Fără rotiță (emulare) |
|---------|-------------|------------------------|
| **Rotești** vederea | ține apăsat **rotița** și mișcă | **Alt + click stânga** și mișcă |
| **Deplasezi** vederea | **Shift + rotiță** și mișcă | **Shift + Alt + click stânga** |
| **Zoom** | **învârți rotița** | **Ctrl + Alt + click stânga**, sau rotița de pe touchpad |

Încearcă fiecare 1 minut. La început pare ciudat, dar în 10 minute e firesc!

### 3) „Giroscopul” din colțul dreapta sus
În colțul viewport-ului e o **sferă cu axe colorate**:

| Culoare | Axa |
|---------|-----|
| **Roșu** | X (stânga ↔ dreapta) |
| **Verde** | Y (față ↔ spate) |
| **Albastru** | Z (sus ↔ jos) |

- **Click** pe o axă → te uiți **de-a lungul** ei.  
- **Trage** cu mouse-ul pe sferă → rotești vederea.  
- Mici butoane lângă ea: **mâna** (deplasare) și **lupa** (zoom). Le tragi cu mouse-ul.

### 4) Vederi standard
Cu **Numpad** (sau emulat, cu tastele de sus):

| Tasta | Vederea |
|-------|---------|
| **1** | din **față** |
| **3** | din **dreapta** |
| **7** | de **sus** |
| **Ctrl + 1 / 3 / 7** | din **spate / stânga / jos** |
| **0** | prin **camera** |
| **5** | schimbă **perspectivă ↔ ortografic** |

- **Perspectivă:** ca ochiul tău, lucrurile îndepărtate par mici.  
- **Ortografic:** toate liniile paralele rămân paralele, perfect pentru a modela precis.

### 5) Nu te pierde!

| Tasta | Ce face |
|-------|---------|
| **Home** | arată **toată scena** |
| **Numpad .** (punct) | **apropie** obiectul selectat |
| **Shift + C** | resetează vederea și cursorul 3D |

### 6) Complet — jocul „Găsește obiectul”
1. Adaugă 3 obiecte (**Shift + A → Mesh**: Cone, Torus, Monkey) și mută-le departe de centru cu **G**.  
2. Apasă **Home**: le vezi pe toate.  
3. Click pe fiecare în **Outliner**, apoi **Numpad .**: vederea sare la el.  
4. Fă un scurt „tur”: față (1), dreapta (3), sus (7) și cameră (0).

### Dacă ai terminat devreme
- [ ] Fă un **screenshot** din fiecare vedere și lipește-le într-un document  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Totul pare strâmb** — ești în perspectivă; apasă **5** pentru ortografic.  
2. **Nu vezi nimic** — ești prea aproape sau prea departe; **Home**.  
3. **Numpad nu merge** — activează **Emulate Numpad** în Preferences.  
4. **Vederea se învârte în loc** — ai ținut Alt apăsat.  
5. **Confuzie între vedere și obiect** — la navigare **nu muți obiectul**, doar „camera ta”.

---

## De făcut azi — „Turul obiectului”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Rotire, deplasare, zoom |
| **Complet** | Minim + 4 vederi + ortografic + Home și Numpad . |

### Pasul 1 — Minim
- [ ] Rotesc vederea  
- [ ] Mă apropii și mă îndepărtez  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Văd scena din față, dreapta, sus  
- [ ] Trec între perspectivă și ortografic  
- [ ] Găsesc fiecare obiect cu Numpad .  
- [ ] Numele `B1_L02` e corect

---

## Bonus
- [ ] Încearcă **Shift + F** (mod „zbor”, ieși cu click) pentru a te plimba prin scenă

## Recapitulare rapidă
1. Rotire · deplasare · zoom  
2. **1 / 3 / 7** = față / dreapta / sus  
3. **5** = perspectivă ↔ ortografic  
4. **Home** te readuce la scenă

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Deschide scena` → `Cele 3 mișcări de bază (mouse peste viewport)` → `„Giroscopul” din colțul dreapta sus` → `Vederi standard` → `Nu te pierde!` → `Complet — jocul „Găsește obiectul”`

## Mai departe *(opțional)*
Joacă un joc de aventură 3D și observă cum se mișcă camera. Acolo, camera e „ochiul” tău, ca la navigarea din Blender.

## Quiz scurt
- Ce culoare are axa Z?  
- Ce face **Home**?  
- Când e util modul ortografic?

## Temă
Alege un obiect din casă (cană, jucărie) și spune ce ai vedea din **față, dreapta, sus**.
