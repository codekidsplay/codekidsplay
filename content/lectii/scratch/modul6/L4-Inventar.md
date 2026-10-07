# Lecția 4 — Inventar (resurse pe scenă)
**Modulul 6 · Lume de cuburi · Block 2 · Fir L1→L10**  
**Code Maker Club · Cube Crafter**

> Continui același proiect.  
> Azi: inventarul e **clar pe ecran** — câte resurse ai, ce tip e activ.  
> *(În M5 ai învățat liste; aici inventarul e pe **resurse de lume**: lemn / piatră / pământ.)*

---

## Obiectiv
**Minim:** ≥**2** tipuri (ideal 3) vizibile pe Scenă · sparge crește · pune scade · **nu** pui la 0 · steag resetează · colegul citește inventarul **fără** explicații.  
**Complet:** Minim + selectare **1/2/3** + indicator „activ: …” **sau** cap max pe tip **sau** listă Scratch pe lângă variabile.

## De ce contează
Fără afișaj, nimeni nu știe ce poți construi.  
Inventarul leagă minat (L2), construcție (L3) și craft (L7).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Inventar = cutii cu numere (nu magie) |
| 12–30 | afișaj pe scenă + tip activ |
| 30–100 | Legi sparge/pune de inventar (Minim → Complet) |
| 100–120 | Test „străin” + salvare |

---

## Pas cu pas

### 1) Ideea *(5 minute, pe foaie)*
Inventarul e un tablou de bord: pentru fiecare tip de bloc, un **număr** pe scenă. Spargi → numărul crește. Pui → numărul scade. Dacă e 0, nu poți pune.

Azi adaugi un al treilea tip, **pământ**, și o variabilă `tip_activ` *(1 = lemn, 2 = piatră, 3 = pământ)* care spune ce pui când apeși E.

**Încearcă tu — pe foaie (5 min):** ai lemn 3, piatră 1. Pui 2 lemn și 1 piatră. Ce numere rămân? *(lemn 1, piatră 0)*

### 2) Al treilea tip *(Minim, partea 1 · 10 minute)*
1. La `Bloc`: al treilea costum, **verde-maro** *(pământ)*  
2. Variabilă `pamant` *(pentru toate sprite-urile)*, bifată pe scenă; pe steag: `setează pamant la 0`  
3. La generator *(L1)*: `treci la costumul (număr aleatoriu între 1 și 3)`  
4. La spargere *(L2)*: adaugi `dacă <costum [număr] = 3>` → `schimbă pamant cu 1`

**Verifici:** spargi mai multe blocuri și toate cele trei numere cresc, după culoare.

### 3) Tipul activ *(Minim, partea 2 · 15 minute)*
1. Variabila `tip_activ`; pe steag: `setează tip_activ la 1`  
2. Trei scripturi la Erou: `când se apasă tasta 1` → `setează tip_activ la 1`; la fel pentru **2** și **3**  
3. Faci scriptul de E *(L3)* să țină cont de tip. În loc de `dacă lemn > 0`:  
   - `dacă <<tip_activ = 1> și <lemn > 0>>` → `trimite pune` · `schimbă lemn cu -1`  
   - `dacă <<tip_activ = 2> și <piatra > 0>>` → `trimite pune` · `schimbă piatra cu -1`  
   - `dacă <<tip_activ = 3> și <pamant > 0>>` → `trimite pune` · `schimbă pamant cu -1`  
   - altfel `spune Nu ai destule!` timp de `1` secundă  
4. La `Bloc`, în `când primesc pune`: `treci la costumul tip_activ` *(în loc de `1`)* și ștergi `schimbă lemn cu -1` de acolo *(scăderea e acum la Erou)*

**Verifici:** spargi 3 blocuri, pui 2, rămâne 1 pe ecran. Schimbi tipul cu tastele 1/2/3 și pui blocuri de altă culoare. Cu 0 dintr-un tip, nu pui nimic.

### 4) Complet *(alege cel puțin una)*
- [ ] **Indicator:** un sprite mic `Activ` cu 3 costume ale tipurilor: `când primesc …` sau într-un `repetă la nesfârșit`: `treci la costumul tip_activ`  
- [ ] **Limită:** la spargere, `dacă <lemn < 20>` înainte de `schimbă lemn cu 1`  
- [ ] **Listă:** o listă `speciale` în care adaugi `Comoară` când spargi un bloc rar *(costum 4)*


---

## Greșeli frecvente
1. **Numerele nu se văd de la distanță** — pune-le mari, în colț, fără să acopere lumea.  
2. **Pui un tip, scade alt tip** — în scriptul E verifici și scazi pentru **același** `tip_activ`.  
3. **Lemnul scade de două ori** — ai lăsat și vechiul `schimbă lemn cu -1` din L3.  
4. **Resursa ajunge negativă** — lipsește `> 0` în condiție.  
5. **Spargi pământ și crește lemn** — ai greșit numărul costumului în `dacă costum = …`.  
6. **Steagul nu resetează** — pe steag toate variabilele pe 0, `tip_activ` pe 1.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | ≥2 tipuri vizibile · sparge+ · pune− · blocat la 0 · reset · test coleg |
| **Complet** | Minim + 1/2/3 **sau** cap **sau** listă suplimentară |

---

## Bonus
- [ ] Stack rar: bloc special → +3  
- [ ] Sunet diferit pe tip  

## Recapitulare rapidă
1. Inventar pe Scenă = obligatoriu  
2. 0 = nu construiești  
3. Tip activ pregătește craft-ul

## Schema pe scurt

**afișaj**  
Scenă: `lemn` · `piatra` · (`pamant`) · opțional `tip_activ`  

**Flux**  
sparge → +1 · pune → dacă >0 atunci −1  

**Quiz scurt:**  
- Unde stau variabilele?  
- Ce vezi tu vs ce vede colegul?  
- Ce adaugă tastele 1/2/3?

## Temă
Indicator „activ”. Urmează L5 = **două zone**.
