# Lecția 7 — Proiect mare: cum îl organizezi
**Modulul 5 · Reguli de joc · Block 3 · Fir L7→L10**  
**Code Maker Club · Maestru de jocuri**

> Azi începe **proiectul mare** (platformer / aventură scurtă): schiță + schelet Minim.  
> Fișier: `Prenume_Nume_M5_Proiect` (același până la L10)  
> **Regula minutului 50:** până atunci — **fără** decoruri complexe / costume noi; doar organizarea.

---

## Obiectiv
**Minim:** foaie cu design (erou · greu · win) · pe scenă: control + **gravitație/săritură** (din L1) · ≥1 nivel / traseu jucabil început · reset la steag.  
**Complet:** Minim + schiță inventar/monede pe scenă **sau** derulare început **sau** meniu Start schițat.

## De ce contează
L1–L6 = piese. L7 = **alegi** ce piese intră în produsul pe care îl prezinți la L10.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ce e proiectul mare + regula min 50 |
| 15–35 | Schiță pe foaie (obligatoriu) |
| 35–50 | **Doar** schelet Minim — zero decor complicat |
| 50–100 | Complet: a doua regulă + puțină finisare vizuală |
| 100–120 | Demo + 3 note pentru L8 |

---

## Pas cu pas

### 1) Foaia de design *(20 minute, obligatoriu înainte de Scratch)*
Completezi pe o foaie, cu creionul:
1. **Titlul** jocului  
2. **Eroul**: cine e, ce poate face *(merge, sare)*  
3. **Câștigi dacă…** *(ajungi la steag / strângi 5 monede)*  
4. **Pierzi dacă…** *(pierzi toate viețile / cazi)*  
5. **Hartă**: un desen cu start, 3 platforme și obiectivul  
6. **Ce iei din L1–L6** — alege **2 sau 3**, nu toate: gravitație *(obligatoriu)*, plus, de exemplu, inamic *(L3)* sau monede/magazin *(L6)*

**Verifici:** poți arăta cuiva foaia și el înțelege cum se câștigă.

### 2) Scheletul *(Minim · până la minutul 50)*
1. Deschizi `Prenume_Nume_M5_L1` → **Fișier → Salvează o copie** → `Prenume_Nume_M5_Proiect`  
   *(Ai deja eroul, gravitația, săritura și platformele din L1.)*  
2. Adaptezi **harta** după foaia ta: mută platformele în sprite-ul `Teren`, ca să semene cu desenul  
3. Adaugi sprite-ul `Țel` *(un steag)* la capătul hărții  
4. La `Țel`: `repetă la nesfârșit` → `dacă <atinge Erou?>` **atunci** `spune Ai ajuns!` timp de `2` secunde  
5. Pe steag, Erou: `du-te la x: -200 y: -100` · `setează viteza_y la 0`

**Verifici:** poți sări de pe podea pe platforme și ajungi la `Țel`, iar steagul readuce eroul la start.

> **Regula minutului 50:** până atunci, **fără** costume noi, fără fundaluri frumoase. Doar fizica și harta.

### 3) După minutul 50 *(Complet, alege una)*
- [ ] **Monede:** sprite `Monedă`, pe steag la locul ei; `așteaptă până când <atinge Erou?>` → `schimbă monede cu 1` → `ascunde`; variabila `monede` pusă pe 0 la steag  
- [ ] **Început de derulare:** variabila `camera_x` din L2, cu `Teren` mutat după `camera_x` *(un exemplu mai mare, cere timp)*  
- [ ] **Buton Start:** un sprite `Start` care, la click, ascunde butonul *(meniul complet vine la L9)*

### 4) Note pentru L8 *(5 minute)*
Pe foaie, 3 lucruri pe care le adaugi: de exemplu **un inamic**, **monede din clone**, **o a doua platformă mobilă**.


---

## Greșeli frecvente
1. **Decor înainte de fizică** — încalci regula minutului 50.  
2. **Proiect nou la fiecare oră** — L7–L10 se fac în același fișier.  
3. **Fără foaie** — la L8 nu știi ce adaugi.  
4. **Toate regulile din L1–L6** — alege 2 sau 3, bine făcute.  
5. **Fără condiție de câștig** — L9 nu are ce închide.  
6. **Platformele sunt prea sus** — săritura urcă cam 78 de pași; pune-le la maximum 60 de pași una deasupra celeilalte.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_Proiect`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Foaie · săritură/gravitație · traseu · reset · (fără decor greu înainte de 50) |
| **Complet** | Minim + monede/derulare/start schiță |

---

## Bonus
- [ ] 3 sisteme din L1–L6 deja pe scenă  
- [ ] Trailer text 2s la start  

## Recapitulare rapidă
1. Foaie → schelet → apoi frumos  
2. Același fișier până la L10  
3. L8 = inamici & clone  

## Schema pe scurt

**Ordine**  
foaie → fizică erou → platforme → (după 50) monede/derulare/meniu  

**Quiz scurt:**  
- Ce e regula minutului 50?  
- Ce 2 reguli de joc ai ales?  
- Care e condiția de win pe foaie?

## Temă
Salvează. Urmează L8 pe **același** proiect.
