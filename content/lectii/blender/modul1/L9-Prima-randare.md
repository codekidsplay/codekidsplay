# Lecția 9 — Prima randare
**Modulul 1 · Primii pași în Blender**  
**Code Maker Club · Blender Starter**

> Azi transformi scena 3D într-o **imagine** reală, pe care o poți trimite prietenilor. Procesul se numește **randare** (render).  
> Proiect: **„Poza finală”** · `Prenume_Nume_B1_L09.blend` + `Prenume_Nume_B1_L09.png`

---

## Obiectiv
La finalul orei ai o imagine salvată (PNG) cu scena ta.  
**Minim:** randezi cu **F12** și salvezi imaginea.  
**Complet:** Minim + reglezi **rezoluția**, compari motoarele **EEVEE** și **Cycles** și obții o imagine cu fundal transparent.

## De ce contează
Până acum ai lucrat în viewport. Randarea face **imaginea finală**: calculează lumina, umbrele și reflexiile cu mare atenție. E „fotografia” scenei tale.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8 |
| 10–35 | Prima randare cu EEVEE |
| 35–60 | Rezoluție și calitate |
| 60–95 | Cycles vs EEVEE |
| 95–120 | Fundal transparent, recap, galerie |

**Ce ai nevoie:** Blender 4.2 · scena din L8 (cu cameră și lumină)

---

## Pas cu pas

### 1) Prima randare
1. Verifică prin cameră: **Numpad 0**.  
2. Apasă **F12** (sau **Render → Render Image**).  
3. Se deschide o fereastră cu imaginea. Așteaptă să se termine.  
4. În fereastra de randare: **Image → Save As** (sau **Shift + Alt + S**), format **PNG**, numește fișierul `Prenume_Nume_B1_L09.png`.  
5. Închide fereastra cu **Esc** sau cu butonul ferestrei.

> Dacă ai pierdut fereastra, **F11** o aduce înapoi.

### 2) Setările de randare
**Properties → tab Render** (aparatul foto):

| Setare | Ce face |
|--------|---------|
| **Render Engine** | „motorul” care calculează imaginea |
| **Samples** | câte „încercări” face per pixel (mai multe = mai curat, dar mai lent) |

### 3) Cele două motoare

| Motor | Viteză | Aspect | Când îl folosim |
|-------|--------|--------|-----------------|
| **EEVEE** | rapid (secunde) | frumos, dar „aproximat” | proiectele noastre de zi cu zi |
| **Cycles** | lent (minute) | foarte realist | imagini finale speciale |

Pentru calculatoare mai slabe, rămâi pe **EEVEE**.

### 4) Rezoluția
**Properties → tab Output** (imprimanta):

| Setare | Valoare recomandată |
|--------|---------------------|
| **Resolution X × Y** | 1920 × 1080 |
| **Resolution %** | 50% pentru teste, 100% pentru final |
| **Frame Range** | nu ne interesează (e doar o imagine) |

> **Truc:** testează cu **50%**, ca să mergi rapid, iar pentru poza finală treci la **100%**.

### 5) Experiment: Cycles
1. Render → **Cycles**.  
2. **Render → Max Samples** pune **64**.  
3. Activează **Denoise** (mai jos, în același panou), ca imaginea să arate curat și cu puține „puncte”.  
4. F12. Compară cu EEVEE: umbrele și reflexiile sunt mai fine?  
5. Notează cât a durat. Dacă e prea lent, scade **Resolution %**.

### 6) Complet — fundal transparent
Vrei omulețul fără cer, ca să-l lipești pe altă imagine:

1. **Properties → Render → Film → Transparent** (bifează).  
2. **Output → Output → File Format: PNG**, **Color: RGBA**.  
3. F12 și salvează. În editorul de imagini vezi pătrățele gri-albe în loc de fundal.

### Dacă ai terminat devreme
- [ ] Schimbă culoarea **cerului** în **Properties → World → Color**  
- [ ] Sau Bonusul de mai jos  

---

## Greșeli frecvente
1. **Imaginea e neagră** — camera nu vede nimic sau lumina lipsește.  
2. **Randarea durează o veșnicie** — Cycles + Samples mari; treci pe EEVEE sau scade samples.  
3. **Fișierul n-a fost salvat** — randarea nu se salvează automat; **Image → Save As**.  
4. **Imaginea e mică** — rezoluția e prea mică sau 50%.  
5. **Fundalul nu e transparent** — lipsește Film → Transparent sau formatul PNG RGBA.

---

## De făcut azi — „Poza finală”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Randare cu F12 + imagine PNG salvată |
| **Complet** | Minim + rezoluție + comparație EEVEE/Cycles + fundal transparent |

### Pasul 1 — Minim
- [ ] F12 funcționează  
- [ ] PNG-ul e salvat  

**→ Minim când:** un coleg recunoaște ce ai făcut, fără explicații.  

### Pasul 2 — Complet
- [ ] 1920 × 1080  
- [ ] Am comparat EEVEE și Cycles  
- [ ] Am o variantă cu fundal transparent  
- [ ] Numele `B1_L09` e corect

---

## Bonus
- [ ] Fă trei randări cu lumini diferite și compară

## Recapitulare rapidă
1. **F12** randează · **Image → Save As** salvează  
2. **EEVEE** rapid · **Cycles** realist și lent  
3. Rezoluția: 1920 × 1080, 50% pentru teste  
4. **Film → Transparent** pentru fundal liber

## Schema pe scurt *(pe foaie — doar dacă o printezi separat)*

`Prima randare` → `Setările de randare` → `Cele două motoare` → `Rezoluția` → `Experiment: Cycles` → `Complet — fundal transparent`

## Mai departe *(opțional)*
Trimite poza unui prieten sau a părinților și întreabă-i ce le-a plăcut. Ce ai îmbunătăți?

## Quiz scurt
- Care motor e mai rapid?  
- Cum salvezi imaginea randată?  
- Ce face „Transparent”?

## Temă
Alege cea mai frumoasă randare a ta și scrie 2 propoziții despre ea: ce arată, ce ți-a plăcut.
