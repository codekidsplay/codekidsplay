# Lecția 5 — Două zone (biomi)
**Modulul 6 · Lume de cuburi · Block 2 · Fir L1→L10**  
**Code Kids Play · Cube Crafter**

> Continui același proiect.  
> Azi: **2 zone** distincte (ex. Pădure → Deșert pe X, sau Suprafață → Peșteră pe Y) cu **resurse diferite**.

---

## Obiectiv
**Minim:** 2 zone jucabile · trecere clară · în fiecare zonă poți sparge/pune · măcar **1 resursă diferită** pe zonă · inventarul rămâne (nu se șterge la trecere).  
**Complet:** Minim + fundal/muzică diferită pe zonă **sau** creatură doar într-o zonă (schiță pentru L6) **sau** mesaj „Ai intrat în …”.

## De ce contează
O singură cutie verde e plictisitoare.  
2 biomi = explorare + motive să te miști pe hartă (pregătește misiunea L8).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Biomi: X (stânga/dreapta) sau Y (sus/jos / adâncime) |
| 12–28 | Schiță 2 zone + resurse pe foaie |
| 28–100 | Construiești trecerea + conținut |
| 100–120 | Coleg explorează ambele zone |

---

## Pas cu pas

### 1) Alegi trecerea *(5 minute, pe foaie)*
Azi folosim **varianta A**: lumea se împarte pe **x**. Stânga *(x < 0)* e **Pădurea**, dreapta *(x > 0)* e **Deșertul**. Fiecare zonă are alte resurse și alt fundal. Inventarul rămâne neschimbat.

| Zonă | Resurse | Fundal |
|------|---------|--------|
| Pădure *(stânga)* | lemn, pământ | verde |
| Deșert *(dreapta)* | piatră, pământ | galben |

**Încearcă tu — pe foaie (5 min):** ce resursă ai doar în Pădure? *(lemn)* Doar în Deșert? *(piatră)*

### 2) Generatorul pe zone *(Minim, partea 1 · 20 minute)*
La `Bloc`, în generator *(L1)*, înlocuiești `treci la costumul (număr aleatoriu …)` cu:
- `dacă <cx < 0>` **atunci** *(Pădure)*: `dacă <(număr aleatoriu între 1 și 2) = 1>` → `treci la costumul 1` *(lemn)*, `altfel` `treci la costumul 3` *(pământ)*  
- `altfel` *(Deșert)*: la fel, dar `treci la costumul 2` *(piatră)* sau `3` *(pământ)*

**Verifici:** pe ecran, stânga are blocuri maro și verzi *(lemn și pământ)*, dreapta gri și verzi *(piatră și pământ)*.

### 3) Fundalul și trecerea *(Minim, partea 2 · 15 minute)*
1. Două fundaluri: `Pădure` *(verde)* și `Deșert` *(galben)*  
2. La Scenă, `repetă la nesfârșit`: `dacă <(x poziția lui [Erou]) < 0>` → `treci la fundalul Pădure`, `altfel` `treci la fundalul Deșert`  
3. Inventarul nu se șterge la trecere — resetezi numerele **doar la steag**

**Verifici:** mergi de la stânga la dreapta pe un rând liber: fundalul se schimbă când treci de mijloc. Numerele din inventar rămân. Spargi tipuri diferite în cele două zone.

### 4) Complet *(alege cel puțin una)*
- [ ] **Mesaj la intrare:** variabila `zona` *(1 = Pădure, 2 = Deșert)*. În scriptul Scenei: dacă zona nouă ≠ `zona`, schimbi `zona` și Erou `spune Ai intrat în Deșert!` timp de `2` secunde *(prin `trimite zona_noua`)*  
- [ ] **Sunet diferit:** `pornește sunetul` pentru fiecare zonă, la intrare  
- [ ] **Pericol într-o zonă:** un sprite static `Cactus` în Deșert *(mobul vine la L6)*


---

## Greșeli frecvente
1. **Același tip de bloc peste tot** — generatorul nu face diferența între `cx < 0` și restul.  
2. **Inventarul se șterge la trecere** — `setează … la 0` e în scriptul zonei, nu doar pe steag.  
3. **Fundalul clipește** — la `x = 0` se aplică `altfel`, deci apare Deșertul; nu pune două `dacă` separate.  
4. **Fundalul nu se schimbă** — `repetă la nesfârșit` lipsește sau citește poziția altui sprite.  
5. **Mesajul se repetă la fiecare pas** — trimite-l doar când zona se **schimbă**, nu mereu.  
6. **O zonă n-are nimic de minat** — verifică că fiecare zonă are o resursă diferită.

---

## De făcut azi
Salvat: `Prenume_Nume_M6_LumeCuburi`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 2 zone · trecere · conținut diferit · inventar persistă · test coleg |
| **Complet** | Minim + reacție la intrare **sau** audio/vizual **sau** pericol schiță |

---

## Bonus
- [ ] A 3-a zonă mică  
- [ ] Resursă rară doar în peșteră  

## Recapitulare rapidă
1. 2 zone = 2 motive să explorezi  
2. Inventarul călătorește cu tine  
3. L6 aduce creatura

## Schema pe scurt

**Trecere X**  
`dacă x > 0` → fundal Deșert · altfel Pădure  


**Quiz scurt:**  
- Ce e diferit în zona 2?  
- Se pierde inventarul?  
- Cum te întorci?

## Temă
Mesaj la intrarea în zonă. Urmează L6 = **creatură / pericol**.
