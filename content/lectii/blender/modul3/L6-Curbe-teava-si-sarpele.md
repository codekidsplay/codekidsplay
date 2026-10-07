# Lecția 6 — Curbe: țeava și șarpele
**Modulul 3 · Modificatori și materiale**  
**Code Maker Club · Modifier Maker**

> Unele lucruri nu se fac din cuburi: cabluri, țevi, șerpi, tobogane. Pentru ele folosim **curbe**, linii flexibile pe care le „îngroșăm”. Azi faci o **țeavă** și un **șarpe**.  
> Proiect: **„Țeava și șarpele”** · `Prenume_Nume_B3_L06.blend`

---

## Obiectiv
La finalul orei ai o țeavă cu coturi și un șarpe cu cap și limbă.  
**Minim:** o curbă îngroșată într-o țeavă.  
**Complet:** Minim + un **șarpe** cu corp subțiat spre coadă (taper), **cap** și **ochi** + materiale.

## De ce contează
Cablurile, toboganele, roller coaster-ele și părul se modelează cu curbe. Sunt ușor de **îndoit** și de modificat chiar și după ce au fost făcute.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 |
| 10–40 | Curba Bezier și mânerele ei |
| 40–70 | Îngroșăm: țeava |
| 70–105 | Șarpele |
| 105–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start

---

## Pas cu pas

### 1) Curba Bezier
**Shift + A → Curve → Bezier.** Apare o linie cu două puncte și mânere.

| Piesă | Ce face |
|-------|---------|
| **Punct de control** | un punct pe curbă |
| **Mâner** | cum se curbează |

În **Edit Mode** (**Tab**):

| Acțiune | Cum |
|---------|-----|
| Muți un punct | **G** |
| Curbezi | mută **mânerul** (punctul de la capătul liniei) |
| Adaugi un punct la capăt | selectează capătul, **E**, mută mouse-ul, click |
| Închizi curba | **Alt + C** (cycle) |

Pentru o curbă în spațiu (nu doar plată), mută punctele și pe **Z**.

### 2) Îngroșăm curba
**Properties → tab-ul curbei verzi (Data) → Geometry → Bevel:**

| Setare | Ce face |
|--------|---------|
| **Depth** | grosimea („raza” țevii) |
| **Resolution** | cât de rotundă e secțiunea |
| **Fill Caps** | închide capetele |

Pune **Depth = 0.15**, **Resolution = 6**, bifează **Fill Caps**. Țeava e gata!

### 3) Țeava cu coturi
1. Curba Bezier: ține-o în **Edit Mode** și adaugă 4–5 puncte cu **E**.  
2. Pentru **coturi bruște**, selectează un punct și apasă **V → Vector**: mânerele devin „drepte” și curba face un colț.  
3. Material **metalic** (Metallic 1, Roughness 0.4).  
4. Adaugă la capete **inele** (Torus aplatizate) ca flanșe.

### 4) Șarpele
1. O nouă curbă Bezier, cu **6–8 puncte** care formează un „S” (poate și pe podea).  
2. **Geometry → Bevel → Depth 0.25**, **Resolution 8**, **Fill Caps**.  
3. **Taper** (subțiere): adaugă o a doua curbă, de formă „triunghi” (un Bezier plat, cu un capăt la 0 și altul la 1) și, în **Geometry → Taper Object**, alege-o. Corpul șarpelui se subțiază spre coadă.  
   *(Dacă ți se pare greu, sari peste Taper și scalează mai târziu puncte din curbă cu **Alt + S**, care schimbă grosimea locală.)*
4. **Capul:** **UV Sphere**, scalată **S X 1.2**, **S Y 1.6**, **S Z 0.9**, la un capăt.  
5. **Ochii:** două sfere mici, albe cu pupile negre.  
6. **Limba:** un **Plane** subțire, roșu, despicat cu un **Loop Cut** și mutat într-un „V”.

### 5) Transformăm curba în obiect (opțional)
Când vrei să o editezi ca pe orice mesh: **Object → Convert → Mesh**. După asta nu o mai poți modifica ca pe o curbă.

### 6) Complet — materiale
- Șarpele: verde cu **Noise** (L8), sau verde cu galben pe spate.  
- Țeava: gri metalic.  
- O podea simplă, cu lumină care scoate în evidență forma.

### Dacă ai terminat devreme
- [ ] Un **tobogan** în spirală  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Curba e plată** — toate punctele sunt pe același plan; mută pe **Z**.  
2. **Țeava nu are grosime** — Depth e 0.  
3. **Capetele sunt goale** — bifează **Fill Caps**.  
4. **Curba e colțuroasă** — mânerele sunt de tip Vector; **V → Aligned**.  
5. **Taper nu merge** — obiectul taper nu e o curbă.

---

## De făcut azi — „Țeava și șarpele”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Curbă îngroșată într-o țeavă |
| **Complet** | Minim + șarpe cu cap, ochi, limbă + materiale |

### Pasul 1 — Minim
- [ ] Curbă Bezier cu 5 puncte  
- [ ] Bevel Depth și Fill Caps  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Șarpe cu subțiere  
- [ ] Cap, ochi, limbă  
- [ ] Materiale  
- [ ] Numele `B3_L06` e corect

---

## Bonus
- [ ] Un **cablu** care leagă două obiecte

## Recapitulare rapidă
1. **Bezier** = curbă flexibilă  
2. **Geometry → Bevel → Depth** = grosime  
3. **Fill Caps** închide capetele  
4. **Convert → Mesh** o transformă în mesh

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Curba Bezier` → `Îngroșăm curba` → `Țeava cu coturi` → `Șarpele` → `Transformăm curba în obiect (opțional)` → `Complet — materiale`

## Mai departe *(opțional)*
Uită-te la un cablu de la încărcător. Cum se curbează? Ce forme ia?

## Quiz scurt
- Cu ce unealtă faci un cablu?  
- Ce face Depth?  
- Cum închizi capetele?

## Temă
Desenează un parc de distracții cu 3 obiecte făcute din curbe (roller coaster, tobogan).
