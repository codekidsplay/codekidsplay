# Lecția 1 — Hello, Arduino!
**Modulul 1 · Primele circuite**  
**Code Maker Club · Circuit Starter**

> Azi pornești simulatorul **Tinkercad Circuits**, cunoști placa **Arduino Uno** și faci primul LED să **clipească**.  
> Proiect: **„LED-ul care clipește”** · `Prenume_Nume_A1_L01` (ex. `Ana_Pop_A1_L01`)

---

## Obiectiv
La finalul orei ai un circuit cu **LED + rezistor** conectat la Arduino și un program care îl face să clipească.  
**Minim:** LED-ul de pe placă (pin 13) clipește · circuitul rulează în simulator · proiectul are numele corect.  
**Complet:** Minim + LED extern pe pin 8 cu rezistor de 220 Ω · viteză schimbată · semnalul **SOS**.

## De ce contează
Arduino e un **mini-calculator** care primește comenzi de la tine și le transformă în **lumină, sunet, mișcare**. Orice proiect din curs pornește de la ce înveți azi: un pin, un LED și două comenzi.

**Notă:** lucrăm în **simulator** — nu strici nimic dacă greșești. Cine are placă reală găsește la final secțiunea **„Pe placa reală”**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Ce e Arduino · tur: placa, pinii, breadboard |
| 10–25 | Cont Tinkercad · **Create new Circuit** · punem Arduino Uno |
| 25–50 | Exemplul 1: Blink cu LED-ul de pe placă |
| 50–95 | Exemplele 2–4: LED extern, viteză, SOS |
| 95–120 | Recap, quiz, verifici numele, arăți circuitul |

**Componente azi:** Arduino Uno R3 · Breadboard Small · LED · Resistor (220 Ω) · 2 fire

---

## Pas cu pas

### 1) Cont + circuit nou
1. Deschizi [tinkercad.com](https://www.tinkercad.com) și te conectezi (cont de școală / profesor)  
2. Din meniul din stânga alegi **Circuits** → **Create new Circuit**  
3. Redenumești proiectul (click pe numele de sus): `Prenume_Nume_A1_L01`  
4. Tinkercad **salvează automat**

### 2) Cunoaște placa
Din panoul din dreapta, **Arduino Uno R3** e deja pe plan. Privește-o:

| Parte | Ce face |
|-------|---------|
| **Pini digitali 0–13** | Trimit sau primesc semnale (aprins / stins) |
| **Pini analogici A0–A5** | Citesc valori (le folosim în lecția 5) |
| **5V și GND** | Alimentare: **+** și **masă (−)** |
| **LED „L”** | LED mic pe placă, legat de **pinul 13** |

### 3) Primul program (fără fire!)
LED-ul „L” există deja pe placă, deci îl poți face să clipească fără nicio piesă.

1. Apeși **Code** (butonul de sus, dreapta)  
2. Alegi **Text** (nu Blocks) și confirmi  
3. Ștergi tot și scrii:

```cpp
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}
```

4. Apeși **Start Simulation** — LED-ul „L” clipește o dată pe secundă

**Ce înseamnă fiecare rând**

| Rând | Înțeles |
|------|---------|
| `void setup()` | Se execută **o singură dată**, la pornire |
| `pinMode(13, OUTPUT)` | Pinul 13 **trimite** semnal (ieșire) |
| `void loop()` | Se repetă **la nesfârșit** |
| `digitalWrite(13, HIGH)` | Pinul 13 = **aprins** (5 V) |
| `digitalWrite(13, LOW)` | Pinul 13 = **stins** (0 V) |
| `delay(1000)` | Așteaptă 1000 ms = **1 secundă** |

### 4) LED extern (pe breadboard)
1. Tragi pe plan un **LED** și un **Resistor** (implicit 220 Ω)  
2. Conectezi așa:

| De la | La |
|-------|----|
| Pin **8** al Arduino | un capăt al rezistorului |
| celălalt capăt al rezistorului | piciorul **lung** al LED-ului (anod, **+**) |
| piciorul **scurt** al LED-ului (catod, **−**) | **GND** al Arduino |

3. Schimbi `13` cu `8` în cod (în toate cele 3 locuri)  
4. Pornești simularea — LED-ul extern clipește

**De ce rezistor?** Fără el, prin LED trece prea mult curent. În Tinkercad LED-ul **arde** (se înnegrește) — e o greșeală bună de văzut o dată, fără pagube.

### 5) Cod cu nume (mai ușor de citit)
Ca să nu scrii `8` peste tot, îi dai un nume:

```cpp
const int LED = 8;

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, HIGH);
  delay(500);
  digitalWrite(LED, LOW);
  delay(500);
}
```

Acum schimbi pinul într-un singur loc.

### 6) Complet — semnalul SOS
SOS = **3 clipiri scurte, 3 lungi, 3 scurte**.

```cpp
const int LED = 8;

void scurt() {
  digitalWrite(LED, HIGH);
  delay(200);
  digitalWrite(LED, LOW);
  delay(200);
}

void lung() {
  digitalWrite(LED, HIGH);
  delay(600);
  digitalWrite(LED, LOW);
  delay(200);
}

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  scurt(); scurt(); scurt();
  lung();  lung();  lung();
  scurt(); scurt(); scurt();
  delay(2000);
}
```

`scurt()` și `lung()` sunt **funcții** — grupuri de comenzi cu nume. Le scrii o dată, le chemi de câte ori vrei.

---

## Greșeli frecvente
1. **LED-ul nu se aprinde** — l-ai pus invers (piciorul lung = **+**, spre rezistor / pin).  
2. **LED-ul arde** — ai uitat rezistorul.  
3. **Eroare la cod** — lipsește `;` la sfârșitul unui rând sau o acoladă `}`.  
4. **Nu se întâmplă nimic** — n-ai apăsat **Start Simulation**.  
5. **Ai schimbat pinul în cod, dar nu și pe fir** — pinul din cod și pinul de pe placă trebuie să fie **același**.  
6. **Majuscule** — `digitalwrite` nu merge; trebuie `digitalWrite`.

---

## De făcut azi — „LED-ul care clipește”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Blink pe pin 13 · simularea rulează · numele proiectului corect |
| **Complet** | Minim + LED extern pe pin 8 + rezistor + SOS |

### Pasul 1 — Minim
- [ ] Circuit nou, cu numele `Prenume_Nume_A1_L01`  
- [ ] Cod în modul **Text**  
- [ ] LED-ul „L” clipește la 1 secundă  

**→ Minim când:** vezi LED-ul clipind în simulator.

### Pasul 2 — Complet
- [ ] LED + rezistor pe pin 8, conectat corect  
- [ ] Ai schimbat viteza (ex. 100 ms, 2000 ms) și ai văzut diferența  
- [ ] SOS-ul merge

---

## Bonus (după Complet)
- [ ] Al doilea LED pe pin 9, care clipește **invers** față de primul  
- [ ] LED care clipește de 5 ori și apoi se oprește (ai nevoie de `for`, îl vedem mai târziu — încearcă doar copiind rândul de mai jos):

```cpp
for (int i = 0; i < 5; i++) {
  digitalWrite(8, HIGH); delay(300);
  digitalWrite(8, LOW);  delay(300);
}
```

## Recapitulare rapidă
1. `setup()` o dată · `loop()` la nesfârșit  
2. `pinMode` = ce face pinul · `digitalWrite` = aprins / stins  
3. `delay(1000)` = 1 secundă  
4. LED-ul are **mereu** rezistor

## Pe placa reală *(opțional)*
Pe placa fizică, același cod funcționează fără nicio schimbare. Conectezi Arduino la calculator cu cablul USB, alegi placa **Arduino Uno** și portul în Arduino IDE, apoi **Upload**.

## Quiz scurt
- Ce face `delay(500)`?  
- Care picior al LED-ului merge spre rezistor?  
- De ce nu punem LED-ul direct pe pin, fără rezistor?

## Temă
Fă LED-ul să clipească **ritmul numelui tău** (o clipire lungă pentru fiecare silabă). Salvează ca `Prenume_Nume_A1_L01b`.
