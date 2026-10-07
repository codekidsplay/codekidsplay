# Lecția 8 — Texturi simple: pământ și iarbă
**Modulul 3 · Modificatori și materiale**  
**Code Maker Club · Modifier Maker**

> O culoare uniformă arată „plat”. O **textură** adaugă pete, linii, granulație și relief. Azi folosești **noduri** (nodes) ca să faci pământ și iarbă din formule matematice, fără nicio poză.  
> Proiect: **„Pământ și iarbă”** · `Prenume_Nume_B3_L08.blend`

---

## Obiectiv
La finalul orei peisajul tău din Modulul 2 are iarbă și pământ cu aspect natural.  
**Minim:** un material de iarbă cu **Noise Texture** și **Color Ramp**.  
**Complet:** Minim + material de **pământ** + **relief (Bump)** + **podea cu pătrățele** (Checker).

## De ce contează
Texturile fac lumea 3D credibilă. Blender poate genera pete, vene sau zgomot **singur**, cu **noduri** pe care le legi ca pe niște piese de LEGO.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7 |
| 10–35 | Editorul de noduri |
| 35–70 | Iarba |
| 70–100 | Pământul și relieful |
| 100–120 | Pătrățele, recap, quiz |

**Ce ai nevoie:** Blender 4.2 · peisajul din L2 / L6 (Modul 2) sau un plan mare

---

## Pas cu pas

### 1) Editorul de noduri
1. Sus, la tab-urile spațiilor de lucru, alege **Shading**.  
2. Jos apare **Shader Editor**: un ecran cu cutii legate prin fire.  
3. Navigarea e ca în viewport: **rotiță** = zoom, **Shift + rotiță** = deplasare.  
4. Selectează obiectul: vezi nodurile **Principled BSDF** → **Material Output**.

| Acțiune | Cum |
|---------|-----|
| Adaugi un nod | **Shift + A** |
| Legi noduri | tragi un fir între două „puncte” |
| Ștergi un fir | **Ctrl + click-drag** peste el |

### 2) Iarba: Noise + Color Ramp
1. **Shift + A → Texture → Noise Texture.**  
2. **Shift + A → Converter → Color Ramp.**  
3. Leagă: **Noise → Fac** în **Color Ramp → Fac**; **Color Ramp → Color** în **Principled BSDF → Base Color**.  
4. În **Color Ramp** alege 2 culori: un **verde închis** și un **verde deschis-gălbui** (click pe pătrățelele de culoare).  
5. În **Noise Texture**: **Scale = 15**, **Detail = 8**, **Roughness 0.6**.  
6. Iarba are acum pete naturale!

### 3) Pământul
Alt material (alt obiect, sau o bandă pe peisaj):

1. La fel: **Noise Texture → Color Ramp → Base Color**.  
2. Culori: **maro închis** și **maro deschis**.  
3. **Scale = 30**, **Detail = 12**.  
4. **Roughness** al materialului: **0.95**.

### 4) Relieful (Bump)
Culorile par plate, dar putem simula **denivelări** fără să adăugăm geometrie:

1. **Shift + A → Vector → Bump.**  
2. Leagă **Noise → Fac** (același nod Noise) în **Bump → Height**.  
3. Leagă **Bump → Normal** în **Principled BSDF → Normal**.  
4. **Strength = 0.3**: lumina creează umbre mici pe denivelări.

### 5) Podeaua cu pătrățele
1. **Shift + A → Texture → Checker Texture.**  
2. **Color1 / Color2:** alb și gri-albastru.  
3. **Scale = 10**.  
4. **Color → Base Color**.

### 6) Complet — scena finală
- Peisajul din L6 (Modulul 2): **iarbă** pe dealuri, **pământ** pe o potecă (alege fețele cu **Assign**, ca la rachetă).  
- Podea cu pătrățele pentru un „plan de testare”.  
- Randare cu **Sun** și cer albastru.

### 7) Dacă nu vezi texturile
Treci pe **Material Preview** sau **Rendered**. În **Solid** nu se văd.

### Dacă ai terminat devreme
- [ ] Un material de **lemn** (Wave Texture + Color Ramp)  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Totul e o singură culoare** — Color Ramp are culori prea apropiate.  
2. **Textura e prea mare / mică** — schimbă **Scale** la Noise.  
3. **Nu se vede relieful** — Strength prea mic sau lumina e de sus.  
4. **Nodul „nu se leagă”** — culorile punctelor trebuie să se potrivească (galben cu galben).  
5. **Ai pierdut nodurile** — apasă **Home** în Shader Editor.

---

## De făcut azi — „Pământ și iarbă”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Iarbă cu Noise și Color Ramp |
| **Complet** | Minim + pământ + Bump + Checker |

### Pasul 1 — Minim
- [ ] Shader Editor deschis  
- [ ] Iarba cu pete  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Pământ cu relief  
- [ ] Podea cu pătrățele  
- [ ] Numele `B3_L08` e corect

---

## Bonus
- [ ] **Piatră** (Voronoi Texture)

## Recapitulare rapidă
1. **Shader Editor** = noduri  
2. **Noise → Color Ramp → Base Color**  
3. **Bump** = relief fals  
4. **Checker** = pătrățele

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Editorul de noduri` → `Iarba: Noise + Color Ramp` → `Pământul` → `Relieful (Bump)` → `Podeaua cu pătrățele` → `Complet — scena finală` → `Dacă nu vezi texturile`

## Mai departe *(opțional)*
Privește iarba sau pământul de aproape. Câte culori vezi? Cum le-ai pune în Color Ramp?

## Quiz scurt
- Ce face Color Ramp?  
- Ce e Bump?  
- Unde vezi texturile: Solid sau Material Preview?

## Temă
Alege un material din natură (nisip, coajă de copac, frunză) și descrie ce noduri ai folosi.
