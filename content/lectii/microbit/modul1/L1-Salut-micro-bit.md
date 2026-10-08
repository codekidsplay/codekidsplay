# Lecția 1 — Salut, micro:bit!
**Modulul 1 · Primii pași cu micro:bit (blocuri)**  
**Code Maker Club · micro:bit Starter**

> Azi faci cunoștință cu placa micro:bit, deschizi editorul MakeCode și îți trimiți **primul program** pe placă.  
> Proiect: **„Inima mea”** · `Prenume_Nume_MB1_L01`

---

## Obiectiv
La finalul orei știi ce are placa micro:bit, ai făcut un program cu blocuri și îl vezi rulând pe placa adevărată.  
**Minim:** o inimă care se vede pe LED-uri, mai întâi în simulator, apoi pe placă.  
**Complet:** Minim + numele tău care se derulează pe LED-uri înainte de inimă.

## De ce contează
micro:bit este un calculator mic cât o carte de joc. Programele tale nu rămân doar pe ecran, ci fac **lucruri adevărate**: aprind lumini, simt mișcarea și apasă butoane. Azi înveți drumul de bază: **faci un program → îl trimiți pe placă → îl vezi rulând**. Îl vom folosi la fiecare lecție.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–20 | Cunoaștem placa: LED-uri, butoane, pini, port USB |
| 20–40 | Deschidem MakeCode, proiect nou, privim simulatorul |
| 40–70 | Primul program: inima pe LED-uri (**Minim**) |
| 70–95 | Trimitem programul pe placa adevărată |
| 95–112 | **Complet:** numele tău + inimă |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** placa micro:bit · cablu micro-USB (cu date) · browser Chrome sau Edge · [makecode.microbit.org](https://makecode.microbit.org)

---

## Pas cu pas

### 1) Cunoaștem placa
Ține placa cu **LED-urile spre tine**.
- **Ecranul de LED-uri:** 25 de luminițe roșii, așezate 5 pe 5. Din ele facem desene și litere.
- **Butoanele A și B:** A e în **stânga**, B e în **dreapta**.
- **Pinii:** 5 inele mari de metal jos (**0, 1, 2, 3V, GND**). Mai târziu vom lega cabluri la ei.
- **Portul micro-USB:** sus. Prin el placa primește curent și programe.
- **Butonul mic de pe spate:** este **Reset**. Îl apeși ca placa să pornească programul de la început.
- **Senzori:** placa simte **mișcarea** (accelerometru) și **temperatura**. Cu LED-urile poate simți și **lumina**.

**Placa V2** (cea cu margine aurie în jurul logoului) mai are și **difuzor**, **microfon** și un **logo care se atinge** ca un buton. Placa V1 nu le are. Programele de azi merg pe ambele.

> **Grijă:** nu pui placa pe o masă udă și nu atingi pinii cu mâinile ude.

### 2) Deschidem editorul
1. Intri pe **makecode.microbit.org**.  
2. Apeși **New Project** (Proiect nou).  
3. Scrii numele: `Prenume_Nume_MB1_L01` și apeși **Create**.  
4. Pe ecran vezi trei zone:  
   - **stânga:** simulatorul, o placă micro:bit desenată;  
   - **mijloc:** lista cu blocuri (Basic, Input, Music, LED …);  
   - **dreapta:** zona unde construiești programul.  
5. În zona de lucru sunt deja două blocuri: **on start** și **forever**.

**Limba blocurilor:** în lecții folosim numele **în engleză**, așa cum le vezi în editor. Dacă editorul tău e în română, apeși rotița ⚙ (sus-dreapta) → **Language** → **English**. Mai jos ai ce înseamnă fiecare:

| Bloc | Ce înseamnă |
|------|-------------|
| `on start` | „la pornire”: ce e înăuntru rulează **o singură dată** |
| `forever` | „pentru totdeauna”: ce e înăuntru se repetă încontinuu |
| `show icon` | arată o poză mică |
| `show string` | arată un text care se derulează |
| `show number` | arată un număr |
| `pause (ms)` | așteaptă (1000 ms = 1 secundă) |

### 3) Primul program — Minim
1. Apeși categoria **Basic**.  
2. Tragi blocul **show icon** și îl pui **înăuntrul** lui **on start**. Blocurile se potrivesc ca piesele de Lego. Dacă ai făcut bine, el se „lipește”.  
3. Apeși pe inima din bloc și alegi **Heart** (inimă) din lista de poze.  
4. Privește simulatorul: **inima apare pe LED-uri!**

Programul tău arată așa:

```text
on start
    show icon [Heart]
```

**Ce vezi pe ecran (simulator și placă):**
```text
. # . # .
# # # # #
# # # # #
. # # # .
. . # . .
```
(`#` = LED aprins, `.` = LED stins)

> Un bloc care **nu e lipit** de `on start` sau `forever` rămâne gri și **nu rulează**.

### 4) Trimitem programul pe placă
Conectezi placa la calculator cu cablul micro-USB. Placa apare ca o unitate numită **MICROBIT**. Ai două metode:

**Metoda 1 — Conectare directă (Chrome / Edge)**
1. Jos, lângă **Download**, apeși cele trei puncte **⋯** → **Connect device**.  
2. Urmezi pașii de pe ecran și alegi placa din listă.  
3. De acum, când apeși **Download**, programul merge direct pe placă.

**Metoda 2 — Copiere de fișier (merge oricând)**
1. Apeși **Download**. Se salvează un fișier cu terminația **.hex**.  
2. Tragi fișierul pe unitatea **MICROBIT** (ca pe un stick USB).  
3. Pe spatele plăcii **clipește o luminiță galbenă**. Când se oprește, programul e pe placă și pornește singur.

Dacă placa nu se vede ca unitate, verifică dacă cablul e **de date**, nu doar de încărcat.

### 5) Complet — numele tău, apoi inima
1. Din **Basic** tragi **show string** și îl pui **deasupra** lui **show icon**, tot în **on start**.  
2. În bloc ștergi cuvântul `Hello!` și scrii prenumele tău. **Fără diacritice!** LED-urile nu știu `ă, â, î, ș, ț`. Scrie `Ana`, nu `Ană`.  
3. Verifici în simulator: mai întâi numele trece literă cu literă, apoi apare inima.

```text
on start
    show string "Ana"
    show icon [Heart]
```

**Ce vezi pe ecran:** literele A, n, a trec una după alta, apoi inima rămâne aprinsă.

4. Descarci din nou și verifici pe placă. Apeși **Reset** ca să vezi programul de la început.

---

## Greșeli frecvente
1. **„Nu se întâmplă nimic în simulator”** — blocul e lăsat singur în zona de lucru, nu e lipit de `on start`. Trage-l până se potrivește.  
2. **„Textul meu are semne ciudate”** — ai scris diacritice. Folosește litere fără semne: `a` în loc de `ă`.  
3. **„Nu văd unitatea MICROBIT”** — cablul e doar de încărcat sau placa nu e bine băgată. Încearcă alt cablu.  
4. **„Am apăsat Download, dar placa nu s-a schimbat”** — ai uitat să tragi fișierul **.hex** pe unitatea MICROBIT, sau galbena nu a terminat de clipit.  
5. **„Inima apare și dispare repede”** — ai pus blocul în `forever` fără pauză. Azi îl punem în `on start`.  
6. **„Am șters un bloc din greșeală”** — apasă **Ctrl+Z** (Mac: **Cmd+Z**) sau butonul săgeată înapoi din editor.

---

## De făcut azi — „Inima mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Inimă pe LED-uri, în simulator **și** pe placa adevărată |
| **Complet** | Minim + numele tău derulat înainte de inimă |

### Pasul 1 — Minim
- [ ] Proiect nou cu numele `Prenume_Nume_MB1_L01`  
- [ ] `show icon [Heart]` în `on start`  
- [ ] Inima se vede în simulator  
- [ ] Programul e trimis pe placă (**Download** sau **Connect device**)  

**→ Minim când:** un coleg vede inima pe placa ta.

### Pasul 2 — Complet
- [ ] `show string` cu prenumele tău (fără diacritice)  
- [ ] Numele apare **înainte** de inimă  
- [ ] Ai apăsat **Reset** și programul pornește de la început  

---

## Bonus (după Complet)
- [ ] Schimbă inima cu altă poză din listă (**Happy**, **Duck**, **House**)  
- [ ] Pune două poze una după alta, cu `pause (ms) 1000` între ele  
- [ ] Scrie un mesaj mai lung, de exemplu `Salut din Focsani`  
- [ ] Desenează pe foaie placa și colorează LED-urile pentru inima ta

## Recapitulare rapidă
1. micro:bit are **25 de LED-uri**, **2 butoane (A, B)**, **pini** și **senzori**.  
2. Programul se face din **blocuri** în MakeCode.  
3. `on start` rulează **o singură dată**, la pornire.  
4. **Download** trimite programul pe placă: direct sau prin fișier **.hex**.  
5. **Reset** pornește programul de la început.

## Schema pe scurt *(pe foaie)*

Proiect nou → `on start` → `show icon` / `show string` → simulator → **Download** → placa

**Quiz scurt:**  
- Câte LED-uri are ecranul plăcii?  
- Care buton e în stânga, A sau B?  
- Ce face blocul `on start`?  
- Cum ajunge programul din editor pe placă?  
- De ce scriem numele fără diacritice?

## Temă
Opțional: acasă, deschide din nou proiectul (apare în **My Projects**) și schimbă poza. Adu mâine placa și cablul.
