# Lecția 9 — Tinkercad Circuits
**Modulul 5 · Avansat și proiectare tehnică**  
**Code Kids Play · Design Pro**  
**Public:** recomandat **10+** · lecție **opțională** pentru cei sub 12 ani *(au varianta cu carcasă)*

> Azi aprinzi un **LED într-un circuit simulat** și îi faci o **carcasă 3D** cu loc pentru LED și pentru baterie.  
> Proiect: **„Lanterna mea”** · `Prenume_Nume_T5_L09`

---

## Obiectiv
La finalul orei ai **un LED aprins în simulare** și/sau **o carcasă** cu loc pentru el.  
**Minim (cu Circuits):** circuit cu **baterie 9 V + rezistor 470 Ω + LED** · apeși **Start Simulation** și LED-ul se aprinde.  
**Minim (fără Circuits):** carcasa 3D de mai jos *(cutie + capac cu gaură pentru LED + loc pentru baterie)* și schema circuitului **desenată pe foaie**.  
**Complet:** Minim cu Circuits + **Arduino** care face LED-ul să **clipească** + carcasa 3D.

## De ce contează
Obiectele din jur nu sunt doar formă: o lanternă are și **circuit**. Un designer bun gândește amândouă.  
**Totul azi e simulat** — nu atingi baterii sau fire adevărate. În simulator, o greșeală nu strică nimic.

**Siguranță:** în clasă nu conectăm baterii reale. Lucrăm doar în simulator și pe computer.

**Pregătire (profesor):** deschide **Circuits** în contul clasei și verifică că elevii au acces. Fă tu circuitul înainte, ca să recunoști piesele.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Cum merge un LED? Anod (+) și catod (−) · de ce rezistor? |
| 15–50 | Circuits: baterie + rezistor + LED · Start Simulation |
| 50–90 | Complet: Arduino și blink · SAU carcasa 3D |
| 90–120 | Carcasa 3D (dacă nu s-a făcut), recap, salvare |

**Unelte azi:** **Tinkercad Circuits** *(baterie, rezistor, LED, Arduino Uno)* · **Start Simulation** · **Box** · **Cylinder** · **Hole** · **Align** (**L**) · mutare cu **săgețile** · **Ctrl+D** · **Ctrl+G** · **Ctrl+Shift+G**

---

## Pas cu pas *(Circuits)*

### 1) Circuit nou
1. În Tinkercad alegi **Circuits** → **Create new Circuit**  
2. Nume: `Prenume_Nume_T5_L09`

### 2) Piesele
1. Din lista de componente tragi: o **baterie 9 V**, un **rezistor**, un **LED**  
2. Rezistorul: click pe el → în căsuța care apare scrii **Resistance = 470 Ω**  
3. LED-ul: are un picior **lung (anod, +)** și unul **scurt (catod, −)**

### 3) Firele
1. Click pe piciorul **+** al bateriei → tragi un fir până la un capăt al rezistorului  
2. Celălalt capăt al rezistorului → fir la **anodul (+)** LED-ului  
3. **Catodul (−)** LED-ului → fir la piciorul **−** al bateriei  
4. Verifici: **+ bateria → rezistor → LED → − bateria** *(un cerc complet)*

### 4) Simularea
1. **Start Simulation**  
2. LED-ul se aprinde · dacă nu, vezi „Greșeli frecvente”  
3. **Stop Simulation** înainte să muți piesele

### 5) Rezistorul — de ce?
LED-ul lasă să treacă prea mult curent și s-ar arde. Rezistorul **îl limitează**.  
Încearcă (doar în simulator) să schimbi rezistorul în **1 kΩ**: LED-ul luminează mai slab. Cu cât rezistorul e mai mare, cu atât trece mai puțin curent. **Revino la 470 Ω.**

### 6) Complet — Arduino și blink
1. Circuit nou *(sau în același)*: tragi o placă **Arduino Uno**  
2. LED + rezistor **220 Ω**: **pin 13** al Arduino → rezistor → anodul LED · catodul LED → **GND**  
3. **Code → Blocks** *(sau Text)*: programul „repetă pentru totdeauna: pin 13 **HIGH**, așteaptă **1 secundă**, pin 13 **LOW**, așteaptă **1 secundă**”  
4. **Start Simulation** → LED-ul clipește la fiecare secundă

---

## Carcasa 3D *(Minim fără Circuits · Complet cu Circuits)*

Un LED standard are diametrul de **5 mm**. Gaura se face cu joc: **Ø5,4**.

### 1) Cutia
1. Design 3D nou: `Prenume_Nume_T5_L09_Carcasa` · Snap Grid **0.5 mm**  
2. **Box** → **60 · 36 · 20**  
3. **Box** → **56 · 32 · 16** → **Hole** · **L** cu cutia: mijloc pe stânga–dreapta și pe față–spate · ridicat la **5 mm** *(pereți de 2 mm, fund de 5 mm)*  
4. **Cylinder** → **20,4 · 20,4 · 4** → **Hole** *(locul pentru o baterie-nasture de Ø20 și 3 mm grosime; adâncitura din fund e de 3,4 mm)* · **L** mijloc pe ambele axe cu cutia · ridicat la **1,6 mm** *(fundul rămâne de 1,6 mm)*  
5. **Ctrl+G** cu cutia

### 2) Capacul
1. **Box** → **60 · 36 · 3** · **L** cu cutia: marginea din stânga și din față · ridicat la **20 mm**  
2. **Cylinder** → **5,4 · 5,4 · 5** → **Hole** · **L** cu capacul: mijloc pe ambele axe · ridicat la **19 mm** *(trece prin capac)*  
3. **Ctrl+G** cu capacul  
4. Rămân **două piese separate**: cutia și capacul  
5. Pentru print, capacul se pune **cu fața plată în jos**, lângă cutie: îl cobori pe plan și îl muți în lateral *(acum stă pe cutie doar ca să vezi cum se potrivește)*

### 3) Complet — două LED-uri
1. Capacul e un Group: **Ctrl+Shift+G** *(desface)*, apoi capacul și gaura LED sunt iar separate  
2. Gaura LED → **Ctrl+D** → **20 mm spre dreapta**; originalul îl muți **20 mm spre stânga** *(două LED-uri simetrice, la 10 și 50 mm de marginea capacului)*  
3. Fiecare gaură rămâne cu marginea la mai mult de 5 mm de marginea capacului *(aici: 7,3 mm)*  
4. Selectezi capacul și cele 2 găuri → **Ctrl+G**

### 4) Schema pe foaie
Desenezi circuitul: baterie, rezistor, LED, cu **+** și **−** marcate. Scrii: **470 Ω** *(sau 220 Ω la Arduino)*.

---

## Greșeli frecvente
1. **LED-ul nu se aprinde** — LED-ul e pus invers. Anodul (+, piciorul lung) merge spre rezistor și baterie +.  
2. **Circuit deschis** — un fir nu e conectat la capăt *(punctul trebuie să se facă verde)*.  
3. **Fără rezistor** — LED-ul se arde în simulare.  
4. **Rezistor prea mic** — sub 220 Ω e prea puțin; folosește 470 Ω *(baterie 9 V)* sau 220 Ω *(Arduino)*.  
5. **Pin greșit** — LED-ul e la pin 12, dar programul comandă pin 13.  
6. **Carcasa nu are gaură pentru LED** — Hole lipsește sau nu a fost grupat cu capacul.  
7. **Capacul e grupat cu cutia** — rămân două grupuri separate.  
8. **Gaura LED prea strânsă** — Ø5,0 nu va intra; Ø5,4 este mai bun.

---

## De făcut azi — „Lanterna mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim cu Circuits** | Baterie 9 V + rezistor 470 Ω + LED · LED aprins în simulare |
| **Minim fără Circuits** | Carcasă: cutie 60·36·20 + gol pentru baterie + capac cu gaură Ø5,4 · schema pe foaie |
| **Complet** | + Arduino cu blink + carcasa 3D |

### Pasul 1 — Minim
- [ ] Circuit cu LED aprins **sau** carcasa 3D  
- [ ] Schema pe foaie, cu **+** și **−**  

### Pasul 2 — Complet
- [ ] Arduino: LED clipește  
- [ ] Carcasă cu gaură Ø5,4 în capac  
- [ ] **Color** · numele `T5_L09` e corect  

---

## Bonus (extra — după Complet)
- [ ] Al doilea LED, în alt circuit paralel  
- [ ] Un **buton** pe capac: gaură Ø7 pentru un buton mic  
- [ ] Pe foaie: unde ai pune o lanternă ca asta în oraș?

## Recapitulare rapidă
1. LED = piciorul lung **+ (anod)**, scurt **− (catod)**  
2. LED-ul are mereu nevoie de **rezistor**  
3. Circuit = un cerc închis: **+ → rezistor → LED → −**  
4. Carcasa are gaură **mai mare** decât LED-ul

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** baterie + → rezistor 470 Ω → LED anod · LED catod → baterie −  
**Carcasă:** cutie 60·36·20, gol 56·32·16 (+5), loc baterie Ø20,4·4 (+1,6), capac 60·36·3 (+20), gaură LED Ø5,4  
**Complet:** Arduino pin 13 → 220 Ω → LED → GND · cod blink

**Quiz scurt:**  
- Care picior al LED-ului este plus?  
- De ce avem nevoie de rezistor?  
- De ce gaura pentru LED are Ø5,4 și nu Ø5?

## Temă
Opțional: desenează pe foaie o lanternă: cum ai pune bateria, LED-ul și un întrerupător în carcasă?
