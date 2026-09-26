# Lecția 6 — Start (Spawn) + Finish
**Modulul 1 · Place Builder**  
**Code Kids Play · Roblox Studio**

> Azi marchezi clar **unde începe** Obby-ul și **unde se termină** — ca un jucător nou să înțeleagă fără explicație.  
> Place: același `Prenume_Nume_M1`

---

## Obiectiv
La finalul orei ai un **Start** (Spawn) vizibil și un **Finish** clar (platformă / zonă colorată), pe același Place.  
**Minimum:** Spawn găsit / așezat corect · **1** zonă Finish vizibilă (culoare + nume) · Play: te naști la start.  
**Ținta orei (Complet):** Minim + calea scurtă leagă Start→Finish · Finish e **ridicat** sau separat vizual · Play: poți ajunge de la Spawn la Finish.

## De ce contează
Fără start clar, jucătorul se naște „oriunde”.  
Fără finish, Obby-ul nu are scop — e doar o plimbare. L7–L9 umplu mijlocul; azi fixăm **capetele**.

**Azi tot fără cod.** Finish **nu** dă încă scor / nu te teleportează — e **ținta vizuală**. (Logica = M2/M3.)

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–8 | Obiectiv + ce e Spawn |
| 8–35 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 35–100 | Start + Finish pe Place (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi pe ecran:** SpawnLocation · Parts Finish · Color / Material (L4) · Move · Playtest (L5).

---

## Pas cu pas

### 1) Spawn = locul de naștere
1. În **Explorer** → **Workspace**, caută **SpawnLocation** (discul / Part-ul cu simbolul de spawn)  
2. Dacă lipsește: Home → Insert / Model tools — sau **SpawnLocation** din obiecte (profesorul arată o dată pe proiector dacă meniul diferă)  
3. **Move:** pui Spawn-ul la începutul traseului tău  
4. **Anchor** pe Spawn (dacă e Part)  
5. Opțional: redenumești `StartObby` · Color verde (convenția L4)  

**Play:** te naști pe / lângă Spawn. Dacă nu — verifici că e **SpawnLocation** activ, nu un Part oarecare.

**Încearcă tu — Spawn (3–4 min)**  
- [ ] Găsești Spawn-ul în Explorer  
- [ ] E la **începutul** construcției tale  
- [ ] Play → te naști acolo · Stop  

### 2) Finish = ținta (doar vizual azi)
1. Un Part nou (Block lat) — nume: `Finish`  
2. Color **clar diferit** (ex. auriu / albastru aprins / verde lime)  
3. Material opțional: Neon sau Metal (accent)  
4. Scale: suficient de mare ca să calci pe el  
5. Anchor · Move: la **capătul** opus față de Spawn  

*Nu e nevoie de script „Touched → win”.* Azi Finish = „am ajuns aici”.

**Încearcă tu — Finish (3–4 min)**  
- [ ] Part `Finish` există, e colorat, e ancorat  
- [ ] Se vede de pe traseu (nu e ascuns)  
- [ ] Salvat  

### 3) Linie dreaptă Start → Finish *(Minim → Complet)*
1. Din cameră **de sus** (L5): Spawn stânga / jos, Finish dreapta / sus — cum vrei, dar **clar**  
2. Parts-urile din L3 (trepte / cale) le leagă pe cele două  
3. Dacă Finish e prea departe: fie apropie Finish, fie adaugi 1–2 platforme  
4. Playtest: Spawn → … → calci pe `Finish`  

**Încearcă tu — legătura (4–5 min)**  
- [ ] Din vedere de sus, Start și Finish se văd amândouă  
- [ ] Play: poți ajunge pe Finish (Complet)  
- [ ] Stop · salvat  

### 4) Checklist „se înțelege fără voce”
- [ ] Un coleg, fără să îi spui, găsește Start-ul  
- [ ] Găsește Finish-ul  
- [ ] Știe în ce direcție să meargă  

---

## Greșeli frecvente
1. **Am colorat un Part „Start” dar nu e SpawnLocation** — te naști tot pe Spawn-ul vechi; muți **SpawnLocation**.  
2. **Finish lipit de Spawn** — nu e Obby; mută Finish departe, pe traseu.  
3. **Finish sub Baseplate / în aer de neatins** — Position / Move.  
4. **Două SpawnLocation** — te naști random; lasă **unul** clar (sau dezactivezi extra, dacă știi cum).  
5. **Am așteptat mesaj „Ai câștigat!”** — azi nu există; doar ajungi pe Part.  

---

## De făcut azi — „Capetele Obby-ului”
Salvat: `Prenume_Nume_M1`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Spawn la început · Part `Finish` vizibil · Play: te naști la Start |
| **Complet (ținta orei)** | Minim + poți **ajunge** pe Finish pe jos/sărituri · colegul înțelege direcția |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Start
- [ ] Spawn așezat + test Play naștere  

### Pasul 2 — Finish *(Minim)*
- [ ] `Finish` colorat, ancorat, numit  
- [ ] Salvat  

**→ Minim când:** Start și Finish se citesc din Viewport.

### Pasul 3 — Traseu până la Finish *(Complet)*
- [ ] Play: Spawn → Finish  
- [ ] Feedback coleg (direcție clară)  
- [ ] Stop · salvat  

**Gata Complet când:** Obby-ul are început și sfârșit, chiar dacă mijlocul e încă scurt.

---

## Bonus (dacă ai terminat Complet)
- [ ] Un Part `Sageata` sau panouri colorate care „ară” spre Finish  
- [ ] Finish pe o **platformă mai înaltă** (mic podium)  
- [ ] Spawn cu **decal** / textură diferită (fără Toolbox greu — doar dacă e simplu)  

## Recapitulare rapidă
1. **SpawnLocation** = unde te naști  
2. **Finish** = țintă vizuală (încă fără script)  
3. Culoare + nume = se citește de departe  
4. Playtest: naștere la Start + drum până la Finish  
5. Place: `Prenume_Nume_M1`  

**Quiz scurt (cu profesorul):**  
- Ce obiect te face să te naști într-un loc?  
- De ce Finish e Part, nu neapărat Spawn?  
- Ce lipsește încă la Finish față de un joc „gata”? *(scor / mesaj / script)*

## Temă
Opțional: muți Finish un pic mai departe și adaugi **1** platformă.  
La **L7** — umpli mijlocul: traseu Obby cu mai multe platforme.
