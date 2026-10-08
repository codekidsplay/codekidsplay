# Lecția 3 — Vânătoarea de comori: cald–rece
**Modulul 2 · Proiecte Maker (blocuri + radio)**  
**Code Maker Club · micro:bit Maker**

> Azi faci un joc cu **două plăci**: una e **comoara**, ascunsă undeva în clasă, iar cealaltă e **detectorul** care îți spune dacă ești aproape (**cald**) sau departe (**rece**).  
> Proiect: **„Cald–rece”** · `Prenume_Nume_MB2_L03`

---

## Obiectiv
La finalul orei folosești **puterea semnalului radio** ca să afli cât de departe e o altă placă.  
**Minim:** comoara trimite semnale; detectorul arată `Heart` (foarte cald), `Happy` (cald) sau `Sad` (rece).  
**Complet:** Minim + detectorul arată `Asleep` când nu primește niciun semnal și ai **praguri reglate** după măsurători.

## De ce contează
Telefonul tău găsește căștile pierdute după **semnal**: cu cât ești mai aproape, cu atât semnalul e mai puternic. Radio nu transportă doar mesaje, ci ne spune și **cât de departe** e emițătorul. Azi folosim asta ca să găsim o comoară.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2: grup, `radio send`, `on radio received` |
| 10–25 | Jocul „Cald–rece” fără plăci: un coleg caută un obiect ascuns |
| 25–50 | Rolurile: comoară sau detector |
| 50–75 | Detectorul cu 3 niveluri (**Minim**) |
| 75–95 | Măsurăm semnalul și reglăm pragurile |
| 95–112 | Fără semnal: `Asleep` (**Complet**) |
| 112–120 | Recapitulare, quiz, temă |

**Unelte azi:** `radio set group` · `radio send number` · `on radio received` · `received packet [signal strength]` · `running time (ms)` · `if / else if / else` · variabile

---

## Pas cu pas

### 1) Jocul „Cald–rece”
Un coleg iese pe hol. Ascundeți un obiect. Când se întoarce, îl căutați cu ajutorul vostru: „**Rece**” dacă e departe, „**Cald**” dacă se apropie, „**Fierbinte**” dacă e foarte aproape. Detectorul tău va spune la fel, dar cu LED-uri.

### 2) Ce este puterea semnalului?
Când placa primește un mesaj, ea știe **cât de tare** l-a auzit. Numărul se numește **puterea semnalului** și e **negativ**:

| Valoare | Înseamnă |
|---------|----------|
| în jur de `-45`…`-55` | **foarte aproape** (semnal puternic) |
| în jur de `-65`…`-75` | la câțiva metri |
| `-85` sau mai jos | **departe** (semnal slab) |

Un număr **mai mare** (mai puțin negativ) înseamnă **mai aproape**: `-50` e mai aproape decât `-80`.

Blocul se găsește în **Radio** și se numește **received packet [signal strength]**. Dacă nu îl vezi în prima listă de blocuri, caută-l mai jos în categoria **Radio** (uneori sub „…more”).

### 3) Rolurile
Același program rulează pe ambele plăci. La pornire apeși un buton ca să alegi rolul:
- **A** = **comoara** (trimite semnale)  
- **B** = **detectorul** (le ascultă)

Variabilele: `rol` (`0` = nealeasă, `1` = comoară, `2` = detector) și `semnal`.

```text
on start
    radio set group 7
    set rol to 0

on button A pressed
    set rol to 1
    show icon [Diamond]

on button B pressed
    set rol to 2
    show icon [Target]
```
Fiecare pereche își alege **propriul grup** (în loc de `7`).

### 4) Comoara trimite — Minim
```text
forever
    if rol = 1 then
        radio send number 1
    pause (ms) 200
```
Comoara spune de 5 ori pe secundă: „Sunt aici!” Numărul `1` nu contează, important e că **trimite ceva**.

### 5) Detectorul ascultă — Minim
```text
on radio received (receivedNumber)
    if rol = 2 then
        set semnal to received packet [signal strength]
        if semnal > -60 then
            show icon [Heart]
        else if semnal > -75 then
            show icon [Happy]
        else
            show icon [Sad]
```
- `semnal > -60` → **foarte cald** (`Heart`)  
- între `-75` și `-60` → **cald** (`Happy`)  
- mai jos de `-75` → **rece** (`Sad`)

**Ce vezi pe ecran pe detector aproape de comoară:**
```text
. # . # .
# # # # #
# # # # #
. # # # .
. . # . .
```

### 6) Măsurăm și reglăm pragurile
Sălile sunt diferite, deci `-60` și `-75` pot să nu fie potrivite. Facem o **măsurătoare**:
1. Temporar, în loc de `show icon`, scrie `show number semnal` pe detector.  
2. Pune comoara pe masă. Citește valoarea la **0,5 m**, **2 m** și **5 m**.  
3. Notează-le într-un tabel:

| Distanța | Semnal măsurat |
|----------|----------------|
| 0,5 m | ______ |
| 2 m | ______ |
| 5 m | ______ |

4. Alege pragul „foarte cald” puțin sub valoarea de la 0,5 m și pragul „cald” puțin sub valoarea de la 2 m. Scrie-le în program în locul lui `-60` și `-75`.

> Semnalul **oscilează**: poți vedea `-58`, apoi `-63` pe aceeași distanță. De aceea folosim **praguri**, nu numere exacte.

### 7) Complet — fără semnal
Dacă detectorul e prea departe, nu mai primește nimic și rămâne ultima poză. Vrem `Asleep` atunci.

1. Creezi variabila `ultimul` (momentul ultimului mesaj primit).  
2. La fiecare mesaj primit, o actualizezi:

```text
on radio received (receivedNumber)
    if rol = 2 then
        set ultimul to running time (ms)
        set semnal to received packet [signal strength]
        if semnal > -60 then
            show icon [Heart]
        else if semnal > -75 then
            show icon [Happy]
        else
            show icon [Sad]
```
3. În `forever` verificăm cât timp a trecut:

```text
forever
    if rol = 1 then
        radio send number 1
    else if rol = 2 then
        if running time (ms) - ultimul > 1500 then
            show icon [Asleep]
    pause (ms) 200
```
`running time (ms)` e numărul de milisecunde de la pornirea plăcii (în **Input**). Dacă au trecut mai mult de `1500` ms (1,5 secunde) de la ultimul mesaj, detectorul „adoarme”.

### 8) Regulile jocului
- Comoara se ascunde **în clasă**, pe o înălțime sigură (pe un raft, într-o cutie), **nu** în buzunarul cuiva și **nu** lângă apă.  
- Cel care caută **nu se uită** unde se ascunde comoara.  
- Detectorul se ține în mână, cu LED-urile spre tine.  
- Nu alergăm. Căutăm **în siguranță**, pe rând.

---

## Greșeli frecvente
1. **„Nu primesc nimic”** — grupuri diferite sau niciuna dintre plăci nu a apăsat A pentru comoară.  
2. **„Totul e rece, chiar și aproape”** — pragurile sunt prea sus pentru sala ta. Măsoară din nou.  
3. **„Pe ambele plăci apare Diamond”** — ai apăsat A pe amândouă. Una trebuie să apese B.  
4. **„Poza nu se schimbă”** — comoara nu trimite (`rol` nu e `1`) sau detectorul nu are `rol = 2`.  
5. **„Valoarea sare mult”** — e normal. Radio oscilează, așa că folosim intervale.  
6. **„`Asleep` apare mereu”** — `ultimul` nu e actualizat în `on radio received`.

---

## De făcut azi — „Cald–rece”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Comoara trimite; detectorul arată `Heart` / `Happy` / `Sad` după semnal |
| **Complet** | Minim + praguri măsurate + `Asleep` fără semnal |

### Pasul 1 — Minim
- [ ] Rolurile alese cu A și B  
- [ ] Comoara trimite în `forever`  
- [ ] Detectorul compară `semnal` cu două praguri  
- [ ] Jocul merge cu o comoară ascunsă  

**→ Minim când:** un coleg găsește comoara urmând detectorul tău.

### Pasul 2 — Complet
- [ ] Tabelul cu 3 măsurători completat  
- [ ] Pragurile din program potrivite sălii  
- [ ] `ultimul` și `running time (ms)` pentru `Asleep`  
- [ ] Numele fișierului e `MB2_L03`  

---

## Bonus (după Complet)
- [ ] Adaugă un **al patrulea nivel** (`Surprised` pentru „aproape de tot”)  
- [ ] Arată semnalul ca **bară**: `plot bar graph of (semnal + 100) up to 60`  
- [ ] Fă ca doi detectori să caute aceeași comoară  
- [ ] Desenează pe foaie harta sălii cu locul unde a fost ascunsă comoara

## Recapitulare rapidă
1. Placa știe **cât de tare** a auzit un mesaj radio.  
2. Semnalul e un număr **negativ**: mai aproape de `0` = mai puternic.  
3. Folosim **praguri** pentru că semnalul oscilează.  
4. `running time (ms)` ne ajută să știm când a fost ultimul mesaj.  
5. Un proiect cu mai multe plăci are **roluri**.

## Schema pe scurt *(pe foaie)*

Comoara: `forever` trimite → aer → Detector: `on radio received` → `semnal` → `if` → `Heart` / `Happy` / `Sad`

**Quiz scurt:**  
- Care semnal e mai puternic: `-50` sau `-80`?  
- De ce folosim praguri și nu numere exacte?  
- Ce face detectorul când nu primește nimic?  
- De ce ne trebuie roluri?

## Temă
Inventează **o variantă** a jocului pentru recreație (de exemplu: comoara se mută, sau există două comori). Scrie regulile pe foaie.
