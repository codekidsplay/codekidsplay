# Lecția 2 — Selectare isteață
**Modulul 2 · Modelare în Edit Mode**  
**Code Maker Club · Mesh Modeler**

> Cine selectează repede, modelează repede. Azi înveți **cinci metode de selectare** care îți economisesc zeci de click-uri.  
> Proiect: **„Peisajul din grilă”** · `Prenume_Nume_B2_L02.blend`

---

## Obiectiv
La finalul orei selectezi rapid grupuri de piese și faci un **peisaj** dintr-o grilă.  
**Minim:** folosești selecția cu **Box**, **Shift + click** și **Alt + A**.  
**Complet:** Minim + **Alt + click** (buclă de muchii), **L** (piese legate), **Ctrl + I** (inversare) și un peisaj cu dealuri și o vale.

## De ce contează
Un model are sute de piese. Dacă le selectezi pe rând, pierzi mult timp. Metodele isteațe fac exact asta într-o singură mișcare.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1 |
| 10–45 | Box select, Shift, A / Alt + A |
| 45–75 | Buclă de muchii, selectare legată, inversare |
| 75–110 | Peisajul din grilă |
| 110–120 | Recap, quiz, galerie |

**Ce ai nevoie:** Blender 4.2 · scena de start (șterge cubul)

---

## Pas cu pas

### 1) Grila de lucru
**Shift + A → Mesh → Grid.** În panoul din stânga-jos pune **X Subdivisions = 10**, **Y Subdivisions = 10**, **Size = 10**. Apasă **Tab** (Edit Mode), apoi **7** (vedere de sus).

### 2) Metodele de selectare

| Metodă | Cum | Când o folosești |
|--------|-----|------------------|
| **Box select** | **tragi** un dreptunghi cu mouse-ul (sau **B**) | grupuri de piese |
| **Shift + click** | adaugă / scoate o piesă | ajustări |
| **A / Alt + A** | selectează / deselectează tot | start și final |
| **Alt + click pe o muchie** | selectează o **buclă** întreagă | rânduri, inele |
| **L** (cursorul peste piesă) | selectează tot ce e **legat** | piese separate |
| **Ctrl + I** | **inversează** selecția | „tot, în afară de…” |

### 3) Atenție la X-ray
Box select selectează doar ce **se vede**. Ca să prinzi și piesele din spate, apasă **Alt + Z**.

### 4) Dacă nu merge selecția
Bara de unelte din stânga (tasta **T**) are un instrument **Select Box**; asigură-te că e activ. Poți trece la **Tweak** sau **Lasso** (selectare liberă, cu desenat) din același loc.

### 5) Peisajul din grilă
1. Mod **Vertex** (**1**). **Alt + A** (nimic selectat).  
2. Selectează cu **Box** un grup de vârfuri în mijloc. **G Z 2 Enter** → un **deal**.  
3. Selectează altă zonă mai mică. **G Z 4 Enter** → un **munte**.  
4. Selectează o zonă în colț. **G Z −1 Enter** → o **vale**.  
5. Alege o muchie interioară și **Alt + click**: selectezi tot rândul. **G Z 1 Enter** → un „zid” prin peisaj.  
6. **Ctrl + I** inversează selecția. **G Z −0.3 Enter** coboară tot restul puțin.

Ieși cu **Tab** și apasă **Shade Smooth** (click dreapta).

> Dealurile au colțuri ascuțite pentru că mutăm puține vârfuri. În lecția 6 vei învăța o metodă care le face rotunde.

### 6) Complet — mai mult peisaj
- Fă **trei dealuri** de înălțimi diferite.  
- Fă o **vale** care trece de-a lungul grilei (selectează un rând cu Alt + click și coboară-l).  
- Adaugă un **lac**: Plane albastră (Z = 0.2) în vale.

### Dacă ai terminat devreme
- [ ] Un **drum** (șir de fețe coborâte puțin) care șerpuiește prin peisaj  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Nu merge Box select** — nu e activ instrumentul; apasă **T** sau **B**.  
2. **Selecția a prins doar piese din față** — pornește **Alt + Z**.  
3. **Alt + click nu face bucla** — dă click pe **muchie**, nu pe vârf, în modul Edge sau Vertex.  
4. **Selectez prea mult** — **Alt + A** și reia.  
5. **Peisajul e plat** — mutarea e mică; scrie numere mai mari.

---

## De făcut azi — „Peisajul din grilă”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Grilă + dealuri făcute cu Box select |
| **Complet** | Minim + bucla de muchii + L + Ctrl + I + vale + lac |

### Pasul 1 — Minim
- [ ] Am o grilă 10 × 10  
- [ ] 2 dealuri  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] Am folosit Alt + click și Ctrl + I  
- [ ] Vale și lac  
- [ ] Numele `B2_L02` e corect

---

## Bonus
- [ ] Colorează: deal verde, munte gri, apă albastră (L7, Modulul 1)

## Recapitulare rapidă
1. **Box** pentru grupuri · **Shift** pentru ajustări  
2. **Alt + click** = buclă · **L** = legat · **Ctrl + I** = invers  
3. **Alt + Z** vede și prin obiect  
4. **A / Alt + A** = tot / nimic

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Grila de lucru` → `Metodele de selectare` → `Atenție la X-ray` → `Dacă nu merge selecția` → `Peisajul din grilă` → `Complet — mai mult peisaj`

## Mai departe *(opțional)*
Privește un peisaj real (pe fereastră sau în poză). Care sunt „dealurile”? Ce ai selecta pentru a le face?

## Quiz scurt
- Ce face **Alt + click** pe o muchie?  
- Cum inversezi selecția?  
- De ce ai nevoie uneori de X-ray?

## Temă
Desenează un peisaj cu 3 dealuri și notează ce metodă de selectare ai folosi pentru fiecare.
