# Lecția 9 — Studio foto: lumini și fundal
**Modulul 3 · Modificatori și materiale**  
**Code Maker Club · Modifier Maker**

> Fotografii de produs nu pun doar „o lumină”. Folosesc **trei lumini** și un **fundal curbat**, care face obiectul să iasă în evidență. Azi îți construiești propriul **studio foto** virtual.  
> Proiect: **„Studioul meu foto”** · `Prenume_Nume_B3_L09.blend` + `.png`

---

## Obiectiv
La finalul orei ai un studio cu 3 lumini și un fundal curbat, în care fotografiezi un obiect de-al tău.  
**Minim:** fundal curbat + o lumină principală + o cameră.  
**Complet:** Minim + **3 lumini** (principală, de umplere, de contur) + **culoare de fundal** + randare cu **umbre moi**.

## De ce contează
Aceeași cană poate arăta banală sau spectaculoasă în funcție de lumini. Studioul îți dă control complet.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8 |
| 10–40 | Fundalul curbat |
| 40–80 | Cele 3 lumini |
| 80–105 | Obiectul, camera, randarea |
| 105–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · un obiect din lecțiile anterioare (cană, cufăr, rachetă)

---

## Pas cu pas

### 1) Fundalul curbat („ciclorama”)
Un fundal fără colțuri, ca să nu vezi unde se termină podeaua și începe peretele.

1. **Plane**, **S 10**.  
2. **Tab**, vedere din dreapta (**3**), modul **Edge** (**2**). Selectează **muchia din spate**.  
3. **E Z 8 Enter** (extrudezi „peretele”).  
4. Selectează **muchia colțului**, dintre podea și perete, și apasă **Ctrl + B**; cu **rotița** pune **8 segmente**, iar din mouse alege o rază mare (~3). Colțul devine o curbă lină.  
5. **Tab**, **Shade Smooth**.

### 2) Obiectul de fotografiat
Pune cana, cufărul sau racheta în centrul curbei, deasupra podelei.

### 3) Cele 3 lumini
| Lumină | Rol | Poziție |
|--------|-----|---------|
| **Key** (principală) | luminează obiectul și dă umbrele | **Area**, mare, în față-stânga, puțin sus, **Power 600–1000 W** |
| **Fill** (de umplere) | luminează umbrele, mai slabă | **Area**, în față-dreapta, **Power 200–300 W** |
| **Rim** (de contur) | conturează marginile | **Area** sau **Spot**, în spate-sus, **Power 500 W** |

**Cum le orientezi:** cel mai ușor e cu o constrângere. Selectează lumina → **Properties → tab-ul Object Constraints → Add Object Constraint → Track To → Target: obiectul tău**. Lumina „se uită” singură la obiect, oriunde o muți. (Dacă ținta pare greșită: **To: −Z**, **Up: Y**.)

### 4) Moliciunea umbrelor
O lumină **Area mare** dă umbre **moi**; una mică dă umbre **dure**. Schimbă **Size** în **Properties → Light** și compară (de ex. 1 m și 4 m).

### 5) Fundalul colorat
- Culoare simplă pe fundal: **material cu Base Color** (albastru-pal, gri, roz).  
- Culoare a „cerului” din jur: **Properties → World → Color** (negru pentru atmosferă dramatică).

### 6) Camera
- Lentilă **70–85 mm** (portrete și produse arată bine cu o lentilă mai lungă).  
- Dacă vrei **fundal ușor încețoșat** (bokeh): **Camera → Depth of Field → Focus on Object**: alege obiectul; **F-Stop 2**.

### 7) Complet — randare și variante
- Randează **trei variante**: fundal alb, fundal colorat, fundal negru.  
- Salvează fiecare: `…_alb.png`, `…_color.png`, `…_negru.png`.

### Dacă ai terminat devreme
- [ ] Un **reflector** (o foaie albă) care „întoarce” lumina  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Imaginea e prea întunecată** — Power-ul luminilor e mic.  
2. **Umbre foarte dure** — lumina e prea mică; mărește Size.  
3. **Reflexii ciudate** — lumina e prea aproape de obiect.  
4. **Fundalul se vede ca o linie** — colțul nu e bevel-uit.  
5. **Obiectul pare că plutește** — umbra lipsește sau obiectul nu atinge podeaua.

---

## De făcut azi — „Studioul meu foto”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Fundal curbat + lumină principală + cameră |
| **Complet** | Minim + 3 lumini + fundal colorat + 3 randări |

### Pasul 1 — Minim
- [ ] Fundal curbat  
- [ ] Lumină principală  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Key, Fill, Rim  
- [ ] Trei variante de fundal  
- [ ] Numele `B3_L09` e corect

---

## Bonus
- [ ] Încearcă un **fundal cu gradient** (colorează World cu două culori, în Shader Editor)

## Recapitulare rapidă
1. Fundal curbat = fără colțuri vizibile  
2. **Key + Fill + Rim**  
3. Lumină mare = umbre moi  
4. Lentilă lungă = obiect „frumos”

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Fundalul curbat („ciclorama”)` → `Obiectul de fotografiat` → `Cele 3 lumini` → `Moliciunea umbrelor` → `Fundalul colorat` → `Camera` → `Complet — randare și variante`

## Mai departe *(opțional)*
Fotografiază un obiect de pe birou cu lanterna telefonului din mai multe părți și vezi cum se schimbă umbrele.

## Quiz scurt
- Care sunt cele 3 lumini ale studioului?  
- Ce face o lumină mare?  
- De ce curbăm fundalul?

## Temă
Alege 3 obiecte și spune ce culoare de fundal ar fi cea mai potrivită pentru fiecare.
