# Lecția 9 — Proiect mare: joc complet
**Modulul 5 · Mecanici de joc · Block 3 · Fir L7→L10**  
**Code Kids Play · Maestru de jocuri**

> Azi închizi produsul: **meniu Start** · reset · **Win / Sfârșitul jocului** · (opțional) nivel 2.  
> Același fișier: `Prenume_Nume_M5_Proiect`

---

## Obiectiv
**Minimum:** meniu Start · jocul rulează după Start · final clar (victorie **și** game over sau măcar unul + mesaj) · restart / steag curăță tot · coleg termină fluxul **fără** ajutor.  
**Complet:** Minim + ambele finaluri · **sau** nivel 2 / tranziție · **sau** shop/inventar legat de win.

## De ce contează
Fără start/final, la L10 prezinți o schiță.  
Același tipar ca M3 L8–L9 și M6 L9.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–12 | Recap `start_joc` / `revino_meniu` |
| 12–30 | Condiții win/lose pe foaie |
| 30–100 | Meniu + finaluri + reset |
| 100–120 | Test coleg 5 min |

---

## Pas cu pas

### 1) Meniu Start *(Minim)*
1. Ecran meniu + buton Start → `trimite start_joc`  
2. La steag: meniu vizibil · jocul „oprit”  
3. `când primesc start_joc`: reset variabile · poziții · arată eroul · pornește logica  

**Încearcă tu (20 min)**  
- [ ] Steag → meniu · Start → joacă  

### 2) Finaluri *(Minim)*
1. **Win:** obiectiv atins (steag pe hartă / scor țintă / item) → mesaj Ai câștigat → oprește controale  
2. **Lose:** HP=0 (sau căzut în gol) → Sfârșitul jocului  
3. Minim: măcar **un** final pe bune + celălalt schițat; ideal ambele  

**Încearcă tu (25 min)**  
- [ ] Poți câștiga **sau** pierde intenționat  

### 3) Reset total
Monede · HP · scor · listă · camera_x · clone · upgrade-uri shop · nivel  

**Încearcă tu (10 min)**  
- [ ] Start de 2 ori = curat  

### 4) Complet
Alege **cel puțin una**:  
- [ ] Win **și** Lose complete  
- [ ] `trimite Nivelul_2` / al doilea traseu  
- [ ] Shop sau inventar necesar pentru win  

---

## Greșeli frecvente
1. **Win la steag** — condiție deja adevărată.  
2. **Meniu peste joc** — butoane rămân active.  
3. **Reset parțial** — clone/HP rămân.  
4. **Doar tu știi controalele** — scrie pe meniu (sau L10).  
5. **Proiect nou** — nu.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_Proiect`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Meniu · Start · ≥1 final · reset · test coleg |
| **Complet** | Minim + ambele finaluri **sau** nivel 2 **sau** shop/inventar în win |

---

## Bonus
- [ ] `revino_meniu` din pause  
- [ ] 3 note polish A–F pe foaie → L10 |

## Recapitulare rapidă
1. Start → joc → final  
2. Reset = tot  
3. L10 = polish + prezentare + insignă  

## Schema pe scurt

**Flux**  
meniu → `start_joc` → joacă → win/lose → (meniu)  

**Quiz scurt:**  
- Ce resetează Start?  
- Cum câștigi?  
- Ce polish vrei mâine?

## Temă
20 s vorbite pentru L10. Urmează polish + **Maestru de jocuri**.
