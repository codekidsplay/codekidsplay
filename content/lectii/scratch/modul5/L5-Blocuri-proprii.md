# Lecția 5 — Blocuri proprii (My Blocks)
**Modulul 5 · Mecanici de joc · Block 2**  
**Code Kids Play · Maestru de jocuri**

> Azi: îți faci **propriile blocuri** ca să nu copiezi același cod de 5 ori.  
> Fișier **nou**: `Prenume_Nume_M5_L5` · proiect: **„Cod curat pe blocuri”**  
> **Pod M6:** același obicei pentru snap grilă / „pune bloc” într-un My Block.

---

## Obiectiv
**Minimum:** ≥**1** bloc propriu (ex. `aplica gravitație` / `lovitură` / `reset erou`) folosit de ≥**2** ori în proiect · proiectul rulează la fel ca înainte (sau mai curat).  
**Complet:** Minim + **parametru** pe bloc **sau** bifa **rulează fără reîmprospătarea ecranului** pe un bloc de coliziune/mișcare fină.

## De ce contează
My Blocks = „funcții” pe înțelesul copiilor.  
**Fără reîmprospătare** = coliziuni mai strânse, mai puțin lag — esențial la platforme și la grila din M6.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Demo: același cod de 3 ori vs un My Block |
| 15–30 | Unde găsești „Blocurile mele” + parametru |
| 30–100 | Refaci un proiect mic (săritură sau patrulare) cu My Blocks |
| 100–120 | Compari: mai puține scripturi lungi |

**Notă profesor:** arată bifa *rulează fără reîmprospătarea ecranului* — Complet, nu Minim obligatoriu.

---

## Pas cu pas

### 1) Alege ce extragi
Exemple bune:
- `reset erou` (poziție + viteza_y + efecte)  
- `aplica gravitație` (bucata din L1)  
- `patrulează pas` (din L3)  
- `lovitură` (HP−1 + așteaptă)

**Încearcă tu — foaie (5 min)**  
- [ ] Ai numit blocul tău  

### 2) Creezi blocul *(Minim)*
1. Proiect nou **sau** copie scurtă din L1/L3 → `Prenume_Nume_M5_L5`  
2. **Blocurile mele** → creează bloc → definești corpul  
3. Înlocuiești **≥2** locuri cu apelul blocului  
4. Steag încă resetează corect  

**Încearcă tu (30 min)**  
- [ ] Blocul e apelat de 2+ ori  
- [ ] Jocul încă rulează  

### 3) Complet — parametru sau fără refresh
**A — Parametru:** ex. `sari cu (putere)` · înăuntru `setează viteza_y la putere`  
**B — Fără reîmprospătare:** pe un bloc folosit în coliziune / buclă strânsă — testezi că nu „trece prin platformă” la fel de des

**Încearcă tu (20 min)**  
- [ ] A sau B bifată pe scenă  

---

## Greșeli frecvente
1. **Bloc creat, niciodată apelat** — Minim = folosit de 2×.  
2. **Tot proiectul într-un singur My Block** — prea mare; extrage o bucată.  
3. **Fără refresh pe tot** — poate strica animațiile; folosește țintit.  
4. **Parametrii uitați** — la apel trebuie să pui valoarea.  
5. **Proiect gol „doar definire”** — trebuie ceva jucabil.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_L5`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 1 My Block · apelat ≥2× · proiect jucabil |
| **Complet** | Minim + parametru **sau** fără reîmprospătare |

---

## Bonus
- [ ] 2 My Blocks pe același proiect  
- [ ] Notă: „În M6 pun snap-ul într-un bloc”

## Recapitulare rapidă
1. My Block = bucată de cod cu nume  
2. Complet: parametru / fără refresh  
3. Obicei pentru M6  

## Schema pe scurt

**Definește**  
`definește reset erou` → du-te la start · viteza_y=0 · …  

**Apelează**  
la steag → `reset erou` · la moarte → `reset erou`  

**Quiz scurt:**  
- De ce My Blocks?  
- Ce e „fără reîmprospătare”?  
- Unde îl folosești în M6?

## Temă
Un parametru pe bloc. Urmează L6 = **magazin**.
