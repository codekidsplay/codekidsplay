# Lecția 3 — Detectare: atingere
**Modulul 2 · Logică**  
**Code Kids Play · Logic Explorer**

> Azi Scratch **simte** dacă atingi o culoare, un personaj sau marginea.  
> Proiect: **„Nu călca pe lavă”** · fișier: `Prenume_Nume_L3` (ex. `Ana_Pop_L3`)

---

## Obiectiv
La finalul orei poți folosi hexagoanele din <span style="color:#5CB1D6;font-weight:700">Detectare</span> în <span style="color:#FFAB19;font-weight:700">dacă … atunci</span>.  
**Minimum:** **un** `dacă` pe **lavă** (culoare) + reset la start sigur.  
**Ținta orei (Complet):** Minim + `dacă` pe **margine** + **monedă/stea** (atingere personaj).

## De ce contează
În jocuri: lava, monede, pereți. Personajul trebuie să „știe” ce a atins.  
Asta e categoria <span style="color:#5CB1D6;font-weight:700">Detectare</span> (în engleză: *Sensing*).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap `dacă` + unde e Detectare |
| 10–30 | Pas cu pas: checkpoint-uri (**Încearcă tu**) |
| 30–100 | Proiectul „Nu călca pe lavă” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

---

## Pas cu pas

### 1) Cele 3 hexagoane utile
Din <span style="color:#5CB1D6;font-weight:700">Detectare</span> (le pui **în** `dacă`):

| Hexagon | Ce face | Unde azi |
|---------|---------|----------|
| <span style="color:#5CB1D6;font-weight:700">atinge culoarea</span> `…` <span style="color:#5CB1D6;font-weight:700">?</span> | da, dacă atinge pixelii acelei culori pe scenă | **Minim** (lavă) |
| <span style="color:#5CB1D6;font-weight:700">atinge marginea?</span> | da, dacă e lipit de cadrul scenei | **Complet** |
| <span style="color:#5CB1D6;font-weight:700">atinge</span> `Personaj2` <span style="color:#5CB1D6;font-weight:700">?</span> | da, dacă se ating două personaje | **Complet** (monedă) |

*Sfat:* culoarea de lavă = **clară** (roșu / portocaliu), nu amestecată cu fundalul.

**Încearcă tu — cele 3 hexagoane (1–2 min)**  
- [ ] Ai deschis <span style="color:#5CB1D6;font-weight:700">Detectare</span> și vezi cele 3 tipuri  
- [ ] Știi: Minim = doar **culoarea**; Complet = + margine + personaj  

### 2) Cum alegi culoarea (pipeta)
1. Desenezi pe fundal o **bandă de lavă** (culoare clară)  
2. În hexagonul `atinge culoarea`, apeși pătrățelul de culoare  
3. Cu **pipeta**, click **pe lava** de pe scenă (nu pe o culoare oarecare din paletă, dacă nu e aceeași)  
4. Testezi: miști personajul pe lavă — `dacă` trebuie să se aprindă

**Încearcă tu — pipeta (2 min)**  
- [ ] Ai o zonă lavă vizibilă pe scenă  
- [ ] Hexagonul are culoarea **pipetată de pe scenă**  
- [ ] Mută eroul pe lavă / pe iarba — vezi diferența (da vs nu)  

### 3) Pattern de joc: lavă *(nucleul Minim)*
1. Steag → reset:  
   <span style="color:#4C97FF;font-weight:700">du-te la</span> punct **sigur** (nu pe lavă) →  
   <span style="color:#4C97FF;font-weight:700">orientează-te</span> `90` →  
   <span style="color:#CF63CF;font-weight:700">oprește toate sunetele</span>
2. <span style="color:#FFAB19;font-weight:700">forever</span> pe **erou**
3. În forever — control cu taste (ca L1, metoda B):  
   `dacă` tasta săgeată … → `mergi` `10`  
   *(sau doar 1–2 săgeți, ca să se miște)*
4. Tot în același forever:  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge culoarea</span> (lavă)  
   **atunci:** <span style="color:#4C97FF;font-weight:700">du-te la</span> start →  
   <span style="color:#9966FF;font-weight:700">spune</span> `Ai călcat!` pentru `1` secundă →  
   <span style="color:#CF63CF;font-weight:700">pornește sunetul</span> `…` →  
   <span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.5` *(evită spam-ul)*

**Încearcă tu — lavă + forever (3–5 min)**  
- [ ] Startul e pe zonă **sigură**  
- [ ] `dacă` lavă e **în** `forever` pe erou  
- [ ] Călci pe lavă → înapoi la start + mesaj  
- [ ] Traversarea zonei sigure **nu** resetează  
- [ ] Salvat: `Prenume_Nume_L3`  

### 4) Complet: margine + monedă
**Marginea** (tot pe **erou**, tot în `forever`):  
<span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge marginea?</span>  
**atunci:** <span style="color:#4C97FF;font-weight:700">întoarce-te la dreapta cu</span> `180` grade →  
<span style="color:#FFAB19;font-weight:700">așteaptă</span> `0.2`  
*(Ca la L1 — **nu** e opțional „sau mesaj”; azi: întoarcere.)*

**Moneda / steaua** — **fără** mesaje între personaje (L8). Fiecare are **propriul** script:

1. Adaugi un personaj = monedă (nume clar, ex. `Moneda`)  
2. Pe **erou**, în forever:  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge</span> `Moneda`  
   **atunci:** <span style="color:#9966FF;font-weight:700">spune</span> `Yaay!` pentru `1` secundă  
3. Pe **Moneda**, script separat:  
   steag → <span style="color:#9966FF;font-weight:700">arată</span> →  
   <span style="color:#FFAB19;font-weight:700">forever</span> →  
   <span style="color:#FFAB19;font-weight:700">dacă</span> <span style="color:#5CB1D6;font-weight:700">atinge</span> `Erou`  
   **atunci:** <span style="color:#9966FF;font-weight:700">ascunde</span>  
4. La steag pe monedă: mereu `arată` (altfel, după prima atingere, dispare pe totdeauna)

*(Fiecare personaj = propriul `dacă` + propriul `forever`. Nu e nevoie de broadcast.)*

**Încearcă tu — margine + monedă (3–5 min)**  
- [ ] Lovești marginea → te întorci (fără spam)  
- [ ] Atingi moneda → eroul spune `Yaay!` **și** moneda se **ascunde**  
- [ ] Steag din nou → moneda **apare** din nou  
- [ ] Salvat din nou  

---

## Greșeli frecvente
1. **Nu detectează lava** — culoarea din hexagon ≠ pixelii de pe scenă; re-pipetează.  
2. **Detectează tot fundalul** — lava e prea mare / aceeași culoare ca iarba; desenează o bandă clară.  
3. **Spam „Ai călcat!”** — lipsește `așteaptă` după mesaj, sau startul e tot pe lavă.  
4. **Script pe personajul greșit** — `dacă atinge culoarea` e pe **erou**; lava e pe **scenă**, nu un personaj.  
5. **Moneda nu dispare / nu revine** — `ascunde` pe monedă; la steag pe monedă: `arată`.  
6. **Nume fișier** — `Prenume_Nume_L3`, nu doar `Ana_L3`.

---

## De făcut azi — „Nu călca pe lavă”
Salvat: `Prenume_Nume_L3`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | Zonă lavă + control taste + **un** `dacă` pe **culoare** (reset + mesaj + sunet) + start sigur |
| **Complet (ținta orei)** | Minim + `dacă` pe **margine** (întoarcere) + **monedă** (erou: `Yaay!` · monedă: `ascunde` / la steag `arată`) |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Scena
- [ ] Fundal cu **zonă lavă** (culoare clară, pipetată)  
- [ ] Punct de **start** pe zonă sigură  
- [ ] Erou controlat cu **taste** (săgeți) în `forever`  

### Pasul 2 — Lavă *(Minim)*
*(Ca la „Încearcă tu — lavă + forever”.)*

- [ ] Dacă atinge **lava** → înapoi la start + mesaj + sunet + `așteaptă`  
- [ ] Poți traversa zona sigură fără reset  
- [ ] Salvat: `Prenume_Nume_L3`  

**→ Minim când:** joci ~15 sec — lava „pedepsește”, startul e sigur.

### Pasul 3 — Margine + monedă *(Complet)*
*(Ca la „Încearcă tu — margine + monedă”.)*

- [ ] Dacă atinge **marginea** → întoarcere 180° + `așteaptă` `0.2`  
- [ ] Personaj monedă/stea: pe erou `Yaay!`; pe monedă `ascunde`; la steag pe monedă `arată`  
- [ ] Un coleg vede clar: lavă vs monedă  
- [ ] Salvat din nou  

**Gata Complet când:** joci ~20 sec — lavă, margine și monedă funcționează.

---

## Bonus (dacă ai terminat Complet)
- [ ] Zonă **bonus** (altă culoare): dacă o atingi → `Ok!` + sunet plăcut  
- [ ] După lavă: <span style="color:#FFAB19;font-weight:700">așteaptă</span> `1` („imunitate” scurtă)  
- [ ] 2 monede (aceeași logică pe fiecare)  

## Recapitulare rapidă
1. <span style="color:#5CB1D6;font-weight:700">Detectare</span> = hexagoane da/nu pentru `dacă`  
2. Culoarea: **pipetă pe scenă**  
3. Startul nu e pe lavă  
4. Monedă = **script pe fiecare** personaj (`ascunde` / `arată`), fără mesaje L8  
5. Nume: **`Prenume_Nume_L3`**  

**Quiz scurt (cu profesorul):**  
- Care e diferența între `atinge culoarea` și `atinge personajul`?  
- De ce re-pipetăm culoarea?  
- Unde pui `ascunde` — pe erou sau pe monedă?

## Temă
Opțional: zonă sigură (altă culoare) → `spune` `Ok!` — `Prenume_Nume_L3`.  
*(Dacă ai făcut deja zona bonus în clasă, acasă schimbă **culoarea** sau mesajul.)*
