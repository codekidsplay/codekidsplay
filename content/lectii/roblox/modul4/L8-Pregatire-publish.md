# Lecția 8 — Pregătirea pentru publicare
**Modulul 4 · Game Creator**  
**Code Maker Club · Roblox Studio**

> Un joc nu e gata când „merge la mine". E gata când **altcineva** îl poate deschide, înțelege și juca în siguranță. Azi pregătim jocul pentru publicare: nume, descriere, setări, siguranță și o listă de verificare.  
> Place: `Prenume_Nume_M4` (ex. `Ana_Pop_M4`)

---

## Obiectiv
La finalul orei jocul tău are **informațiile și setările pregătite** pentru publicare și treci printr-o **listă de verificare** înainte de lansare.  
**Minimum:** completezi **numele**, **descrierea** (fără date personale), **setările de bază**, **restaurezi numele final al DataStore-ului** și bifezi lista de verificare.  
**Ținta orei (Complet):** Minim + pregătești **iconița/miniatura** (idee sau schiță), parcurgi **setările de siguranță**, **salvezi** versiunea și (dacă regulile cursului permit) o **publici privat** și o testezi.

## De ce contează
- **Prima impresie:** numele și descrierea decid dacă cineva dă click.  
- **Siguranță:** ce scrii public poate fi văzut de oricine. Nu pui date personale.  
- **Date:** dacă uiți numele de test al DataStore-ului din L6, jucătorii reali pierd progresul.

> **Important:** *dacă* și *unde* publici depinde de **regulile cursului, ale școlii și ale părinților**. Fără acordul lor, **nu publici**. Profesorul spune ce variantă folosim.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + reguli de siguranță |
| 10–30 | Nume și descriere (**Încearcă tu**) |
| 30–55 | Setările jocului (Game Settings) |
| 55–75 | Restaurăm datele, curățăm jocul |
| 75–95 | Iconiță/miniatură + lista de verificare |
| 95–115 | Publicare privată + test *(dacă e permis)* |
| 115–120 | Recap, salvare |

**Azi folosim:** **Game Settings** · **File → Save/Publish** *(prin meniu; profesorul arată)* · `Srv_Salvare` · lista de verificare.

---

## Pas cu pas

### 1) Regulile de siguranță
| Regulă | De ce |
|--------|-------|
| Nume real, adresă, școală, telefon, link social **nu** apar în joc | sunt date personale |
| Fără cuvinte urâte, jigniri, glume pe seama cuiva | regulile Roblox și respectul |
| Fără muzică/imagini luate de oriunde | drepturi de autor; folosim doar ce ai voie |
| Nu pui scripturi/modele de la necunoscuți | pot ascunde cod rău |
| Publici **doar** cu acordul părinților și al profesorului | siguranța ta |

### 2) Numele și descrierea
**Numele jocului** (scurt, clar, memorabil):
- Bun: `Sky Obby: Fuga din Turn`  
- Slab: `Joc 1`, `ana pop obby test`

**Descrierea** — 3–5 propoziții:
1. Ce faci în joc  
2. Cum se câștigă  
3. Ce îl face special  
4. (opțional) Controale

Exemplu:
```
Sari peste platforme, adună monede și ajunge la Finish fără să cazi!
Atenție la inamicul care patrulează. Cu monedele cumperi viteză și salt.
Progresul se salvează automat.
Controale: WASD pentru mișcare, Space pentru salt.
```

**Încearcă tu — descrierea (8–10 min)**  
- [ ] Ai un nume de **max. 3–5 cuvinte**  
- [ ] Descriere de 3–5 propoziții  
- [ ] **Fără** date personale  
- [ ] Un coleg o citește și spune ce a înțeles

### 3) Setările jocului (Game Settings)
Deschizi **Game Settings** *(din meniul Home sau File; profesorul arată, meniurile se pot schimba)*. Fii atent la secțiunile:

| Secțiune | Ce setezi |
|----------|-----------|
| **Basic Info** | nume, descriere, gen, dispozitive (PC/telefon/…) |
| **Permissions** | cine poate juca (**Privat** la început) |
| **Avatar** | tipul de avatar (lasă implicit dacă nu ai motiv) |
| **Security** | **Enable Studio Access to API Services** (pentru DataStore în Studio) |

**Reguli:**
- Începe **Privat**. Treci la **Public** doar la L10, **dacă** ai acord.  
- Bifează doar dispozitivele pe care le-ai **testat**. (Un joc cu butoane mici poate fi greu pe telefon.)  
- Alege genul care **descrie** jocul (ex. obby / aventură).

**Încearcă tu — setări (10 min)**  
- [ ] Nume + descriere introduse  
- [ ] Permisiuni: **Privat**  
- [ ] Dispozitive: doar ce ai testat  
- [ ] Ai notat unde se activează **API Services**

### 4) Restaurăm numele final al DataStore-ului
La **L6** ai schimbat temporar numele caietului (ex. `Obby_Monede_test1`) ca să nu ștergi datele reale. **Acum** pregătim varianta finală:

- [ ] Deschizi `Mod_Salvare`  
- [ ] Pui numele **final**, cel hotărât (ex. `Obby_Monede` sau cu versiune)  
- [ ] Verifici că **toate** scripturile folosesc `Mod_Salvare` (nu un alt nume)  
- [ ] Rulezi un test: intri, aduni monede, ieși, intri — valoarea e păstrată

> **Regula:** înainte de lansare, **un singur** nume final de caiet. La o schimbare mare de structură (alte câmpuri) folosești un nume nou (versiune), ca să nu amesteci datele vechi cu cele noi.

### 5) Curățenia jocului
| Verifici | Acțiune |
|----------|---------|
| Scripturi de test (`Srv_Test`, etc.) | **șterge** |
| `print`-uri de depanare | **șterge** (sau lasă doar `warn` utile) |
| Valori de test (monede 9999, viteze) | **readu** la valori normale |
| Obiecte ascunse/rătăcite în Workspace | **șterge** |
| Nume clare în Explorer | **redenumește** |
| Modele din Toolbox | **verifici** că nu conțin scripturi; mai bine le elimini |
| Sunete/imagini | doar **permise** |

**Încearcă tu — curățenie (15 min)**  
- [ ] Niciun script de test rămas  
- [ ] Valori la normal  
- [ ] Output curat la un joc complet

### 6) Iconița și miniatura
- **Iconița** = poza pătrată a jocului. **Miniatura** = imagini în pagina jocului.  
- Ia o **captură de ecran** din joc (Studio → Play) cu un moment frumos: platforme, inamic, monede.  
- Fără date personale vizibile (nume real, chat etc.).  
- Se încarcă din pagina jocului din **Creator Hub** *(profesorul arată; cere un cont autorizat)*.

**Încearcă tu — imaginea (8 min)**  
- [ ] 1–2 capturi frumoase  
- [ ] Fără date personale în imagine

### 7) Verificarea conținutului
La publicare, Roblox poate cere un **chestionar de conținut** (vârsta potrivită, tipul de conținut). Răspunzi **sincer**. Jocul nostru e un obby pentru toate vârstele (fără violență reală, fără limbaj urât).  
*Detaliile chestionarului le urmărește profesorul în Creator Hub.*

### 8) Save vs Publish
| Acțiune | Ce face |
|---------|---------|
| **Save** | salvează fișierul (local/cloud) |
| **Publish to Roblox** | trimite versiunea pe serverele Roblox |

După modificări, **ambele** sunt necesare dacă vrei ca jucătorii să vadă schimbarea.

### 9) Publicare privată + test *(Complet, dacă e permis)*
1. **Save** (`Prenume_Nume_M4`)  
2. **Publish** cu permisiunea **Privat**  
3. Deschide jocul din **Roblox Player** / pagina jocului (nu din Studio)  
4. Joacă-l de la început  
5. Notează diferențele față de Studio

**De ce testăm în Player:** în Studio e „aproape" la fel, dar în joc real pot apărea diferențe (ping, mai mulți jucători, datele salvate).

### 10) Lista de verificare înainte de lansare
- [ ] Nume + descriere gata, fără date personale  
- [ ] Setări: Privat, dispozitive testate  
- [ ] DataStore: nume final, test de salvare reușit  
- [ ] Scripturi/valori de test șterse  
- [ ] Output curat  
- [ ] Modele/sunete/imagini doar permise  
- [ ] Iconiță pregătită  
- [ ] Acordul părinților/profesorului pentru publicare *(dacă publici)*  
- [ ] Salvat `Prenume_Nume_M4`

---

## Greșeli frecvente
1. **Uiți numele de test al DataStore-ului** din L6 — datele reale nu se salvează în caietul bun.  
2. **Dai drumul Public** fără să testezi.  
3. **Pui date personale** în nume/descriere/iconiță.  
4. **Lași scripturi sau valori de test** (monede 9999, `Srv_Test`).  
5. **Descriere prea lungă sau prea scurtă** — 3–5 propoziții.  
6. **Bifezi dispozitive netestate** — pe telefon poate fi imposibil de jucat.  
7. **Folosești muzică/imagini fără drepturi.**  
8. **Confunzi Save cu Publish** — în joc nu apar modificările.  
9. **Nu activezi API Services** pentru testul în Studio — DataStore nu merge.  
10. **Răspunzi greșit la chestionarul de conținut** — fii sincer.

---

## De făcut azi — „Lansare pregătită"
Salvat: `Prenume_Nume_M4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | Nume + descriere (fără date personale) + setări de bază + **DataStore cu numele final** + lista de verificare bifată + salvat |
| **Complet (ținta orei)** | Minim + curățenie + iconiță/captură + (dacă e permis) **publicare privată** + test în Player |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Informații
- [ ] Nume + descriere  
- [ ] Verificat de un coleg

### Pasul 2 — Setări și date *(Minim)*
- [ ] Game Settings: Privat  
- [ ] DataStore final + test  
- [ ] Lista bifată · salvat

**→ Minim când:** jocul **se salvează și se reîncarcă corect** cu numele final.

### Pasul 3 — Lansare privată *(Complet)*
- [ ] Curățenie  
- [ ] Iconiță/captură  
- [ ] Publish privat + test în Player *(dacă e permis)*

**Gata Complet când:** jocul rulează și în **Roblox Player** (nu doar în Studio) fără erori.

---

## Bonus (dacă ai terminat Complet)
- [ ] Faci **două variante** de descriere și alegi cu un coleg care e mai clară  
- [ ] Creezi un **tutorial scurt** în joc (un mesaj la început)  
- [ ] Scrii o **listă de „noutăți"** pentru o versiune viitoare (v2)  
- [ ] Faci o captură ca „coperta" jocului și o explici

## Recapitulare rapidă
1. **Nume și descriere** clare, **fără date personale**  
2. Începi **Privat**, publici doar cu acord  
3. **Numele final al DataStore-ului** — verificat  
4. **Curățenie:** fără scripturi/valori de test  
5. **Save ≠ Publish**

**Quiz scurt (cu profesorul):**  
- De ce publici întâi **Privat**?  
- Ce se întâmplă dacă uiți numele de test al DataStore-ului?  
- Ce **nu** ai voie să scrii în descriere?

## Exemplu / referință (opțional, la final)
*(Încearcă întâi singur.)*

Verificarea numelui în `Mod_Salvare`:
```lua
-- LA ÎNCEPUTUL scriptului:
local DataStoreService = game:GetService("DataStoreService")
local NUME_CAIET = "Obby_Monede"   -- numele FINAL (nu "test1")
local caiet = DataStoreService:GetDataStore(NUME_CAIET)
```

Idei pentru nume:
- `Sky Obby: Fuga din Turn`
- `Monede și Lasere`
- `Obby-ul Dragonilor`

## Temă
Opțional: arată descrierea jocului unui adult din familie și întreabă ce a înțeles.  
La **L9** facem proiectul final: **înghețăm funcțiile** și verificăm totul.
