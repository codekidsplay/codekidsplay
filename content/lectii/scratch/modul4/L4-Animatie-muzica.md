# Lecția 4 — Clip pe acte (+ Muzică / Stilou)
**Modulul 4 · Antrenament (fișier separat)**  
**Code Kids Play · Scratch Creator**

> Azi faci un **clip pe 2 acte** (~30–60 s): sincron sunet + mișcare + **input** care contează.  
> **Completare (după nucleu):** extensii **Muzică** și/sau **Stilou** — singurele extensii din tot curriculumul CKP Scratch.  
> Fișier **nou**: `Prenume_Nume_M4_L4` · proiect: **„Clip pe acte”**

---

## Obiectiv
La finalul orei stai pe scaun: clipul **rulează**, durează 30–60 s, iar inputul e clar fără explicații.  
**Minimum (nucleu):** ≥2 personaje animate · **2 acte** · sunet din tab **Sunete** · **1 input** obligatoriu · stop / mesaj final · steag = Act 1 · sincron **fără** blocaj.  
**Ținta orei (Complet):** Minim + **extensia Muzică SAU Stilou** folosită pe bune **sau** al 2-lea input care schimbă finalul.

## De ce contează
Un clip Creator nu e doar „personaje care se mișcă”: are **acte** (ca nivelele de scenă) și un moment în care **tu** schimbi ceva.  
Extensiile **nu** înlocuiesc logica — îmbogățesc sunetul (Muzică) sau lasă urmă (Stilou).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Clip vs clip cu acte + demo input + **regula anti-block** |
| 10–15 | Timeline **3 pași** (5 min max — foaie sau direct Scratch) |
| 15–90 | **Nucleu** (fără extensii încă) |
| 90–110 | **Completare** Muzică / Stilou (cine a terminat nucleul) |
| 110–120 | Rulează pe scaun + temă |

**Foaie = 5 min (sau sari direct în Scratch dacă știi deja cele 3 pași).**

**Capitole:**  
<span style="color:#E6A800;font-weight:700">Evenimente</span> · <span style="color:#FFAB19;font-weight:700">Control</span> (`așteaptă`, `forever`) · <span style="color:#9966FF;font-weight:700">Aspect</span> · <span style="color:#CF63CF;font-weight:700">Sunet</span> · <span style="color:#4C97FF;font-weight:700">Mișcare</span>

**Extensii azi (doar după nucleu):** Muzică · Stilou  
**Nu folosim:** Detectare video, Face Sensing, Text în vorbire, Traducere.

---

## Pas cu pas

### 1) Timeline în 3 pași *(5 min max)*
Nu scenarii lungi. Doar:

1. **Act 1** — ce se mișcă / ce sunet (~15–30 s)  
2. **Input** — spațiu sau click → ce se schimbă  
3. **Act 2 + final** — fundal / mesaj „Act 2” · stop clar  

Durata totală țintă: **30–60 s**.

**Încearcă tu (5 min)**  
- [ ] Știi Act 1 / input / Act 2  
- [ ] Treci la Scratch  

### 2) Nucleu — personaje + acte
1. Proiect nou → `Prenume_Nume_M4_L4`  
2. ≥**2 personaje** cu mișcare / schimbare costum  
3. Act 1 → Act 2: `treci la fundalul` **sau** `trimite Act_2`  
4. La steag: Act 1 · poziții · `oprește toate sunetele` · `șterge tot` dacă ai Stilou mai târziu  

**Încearcă tu — acte (12 min)**  
- [ ] Se vede clar trecerea Act 1 → Act 2  
- [ ] Steag → mereu Act 1  

### 3) Sincron *(regula de aur — anti-block)*
**Interzis la Minim:** <span style="color:#9966FF;font-weight:700">spune</span> … **timp de** X **în interiorul** buclei `forever` de mișcare — blochează tot clipul.

**Folosește în schimb (alege stilul):**  
- <span style="color:#FFAB19;font-weight:700">așteaptă</span> `X` pe un lanț de scripturi (timeline), **sau**  
- <span style="color:#E6A800;font-weight:700">trimite</span> `replica_2` / `Act_2` → pe alt personaj: <span style="color:#E6A800;font-weight:700">când primesc</span> → următorul moment  
- Mișcarea poate rula **paralel** (alt script); dialogul / pauza nu blochează `forever`-ul de mișcare

1. Tab **Sunete**: ≥1 sunet (`pornește sunetul` / `redă … până la final`)  
2. Calibrezi cu `așteaptă` **sau** mesaje între momente  
3. La final: stop clar (mesaj scurt **în afara** `forever`-ului de mișcare / `oprește`)

**Încearcă tu — sincron (15 min)**  
- [ ] Clipul ține **30–60 s** fără să se blocheze  
- [ ] Personajele încă se mișcă în timp ce „povestea” avansează (sau pauza e intenționată pe lanț)  
- [ ] Sunetul e pe bune pe scenă  

### 4) Input obligatoriu *(Minim)*
1. **Spațiu** sau **click pe personaj** — fără el, Act 2 **nu** începe **sau** scena se schimbă vizibil  
2. Preferat: input → `trimite Act_2` (clar, ca nivelele)  
3. Inputul e **în** flux (nu decorativ)

**Încearcă tu — input (10 min)**  
- [ ] Fără input, ceva **nu** se întâmplă  
- [ ] Cu input, schimbarea e clară  

### 5) Completare — extensii *(Complet sau Bonus)*

*(Buton **Alege o extensie** / pictograma din stânga jos.)*

**A) Muzică (*Music*)**  
- [ ] Extensia adăugată  
- [ ] Jingle scurt (note + instrument) pe Act 1 **sau** la trecerea în Act 2  
- [ ] Legat de steag / click / mesaj  

**B) Stilou (*Pen*)**  
- [ ] Extensia adăugată  
- [ ] `pen down` pe un personaj pe care se mișcă  
- [ ] Urmă vizibilă pe Act 1 sau 2  
- [ ] La steag / Act nou: `șterge tot`  

**Complet** = nucleu + (Muzică **sau** Stilou **sau** al 2-lea input care schimbă finalul).

---

## Greșeli frecvente
1. **`spune … timp de` în `forever` de mișcare** — totul îngheață; folosește `așteaptă` pe lanț sau `trimite` / `când primesc`.  
2. **Extensii înaintea nucleului** — întâi Sunet clasic; abia apoi Muzică/Stilou.  
3. **Input decorativ** — apeși spațiu și nu se schimbă nimic.  
4. **Acte = același fundal** — Act 2 trebuie **vizibil** diferit.  
5. **Stilou fără clear** — al 2-lea steag e plin de linii vechi.  
6. **Clip de 5 secunde** — Minim cere 30–60 s.  
7. **Prea mult pe foaie** — 5 min timeline, restul Scratch.

---

## De făcut azi — „Clip pe acte”
Salvat: `Prenume_Nume_M4_L4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 2 personaje · 2 acte · sunet · 1 input · 30–60 s · sync fără block · restart Act 1 |
| **Complet** | Minim + Muzică **sau** Stilou **sau** al 2-lea input pe final |

### Pasul 1 — Timeline (5 min)
- [ ] Act 1 / input / Act 2  

### Pasul 2 — Nucleu (Minim)
- [ ] Checklist Minim · rulează pe scaun  

### Pasul 3 — Completare (Complet)
- [ ] Muzică / Stilou / al 2-lea input  

---

## Bonus (dacă ai terminat Complet)
- [ ] Act 3 sau clip ≥60 s  
- [ ] Muzică **și** Stilou pe același clip  
- [ ] Costum pe ritmul notei (`așteaptă` fin)  

## Recapitulare rapidă
1. Timeline 3 pași → Scratch  
2. Sincron = `așteaptă` / mesaje — **nu** `spune timp de` în `forever` de mișcare  
3. Extensii = după nucleu  
4. Fișier: **`Prenume_Nume_M4_L4`**

## Schema pe scurt *(pe foaie)*

**Nucleu**  
steag → Act 1 (mișcare || sunet) → **input** → `trimite Act_2` → Act 2 → final  

**Anti-block**  
mișcare în `forever` · dialog/pauze pe **alt** script cu `așteaptă` sau `când primesc`  

**Input**  
spațiu / click → `trimite Act_2`  

**Stilou / Muzică** — doar după nucleu  

**Quiz scurt:**  
- Ce e un „act” aici?  
- De ce nu pui `spune timp de` în `forever`?  
- Când adaugi Muzică/Stilou?

## Temă
Opțional: al 2-lea input în Act 2 **sau** jingle / urmă. Urmează L5 = **labirint pe nivele**.
