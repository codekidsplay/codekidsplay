# Lecția 10 — Telecomanda magică
**Modulul 3 · Afișaj și mișcare**  
**Code Maker Club · Display Maker**

> Proiectul modulului: controlezi LED-uri de la distanță cu o **telecomandă cu infraroșu**, ca la televizor.  
> Proiect: **„Telecomanda mea”** · `Prenume_Nume_A3_L10`

---

## Obiectiv
La finalul orei comanzi lumini cu o telecomandă IR.  
**Minim:** trei butoane ale telecomenzii aprind / sting trei LED-uri.  
**Complet:** Minim + buton **Power** care stinge totul + **volum +/−** care schimbă luminozitatea unui al patrulea LED.

## De ce contează
Telecomenzile TV, aerul condiționat și boxele folosesc **infraroșu**: un LED trimite impulsuri de lumină invizibilă, iar un receptor le transformă în **coduri**. Azi citești și folosești aceste coduri.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap modul · parcurgem proiectele |
| 10–25 | Cum trimite și primește IR |
| 25–55 | Aflăm codurile butoanelor |
| 55–105 | Comenzi pentru LED-uri + luminozitate |
| 105–120 | Verificare finală Modul 3, galerie |

**Componente azi:** Arduino Uno · Breadboard · **IR Sensor** (receptor) · **IR Remote** · 4 × LED · 4 × Resistor 220 Ω · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A3_L10`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **Receptor IR · OUT / semnal** | pin **11** |
| **Receptor IR · VCC** | **5V** |
| **Receptor IR · GND** | **GND** |
| **LED 1** | pin **4** → 220 Ω → anod · catod → GND |
| **LED 2** | pin **5** → 220 Ω → anod · catod → GND |
| **LED 3** | pin **6** → 220 Ω → anod · catod → GND |
| **LED 4 (luminozitate)** | pin **9** → 220 Ω → anod · catod → GND |

Telecomanda din Tinkercad nu se conectează la nimic: o selectezi, ținând-o „spre” receptor, și apeși butoanele cu mouse-ul.

### 3) Cum merge
- Fiecare buton trimite un **cod numeric** unic (în hexazecimal, de ex. `FF30CF`).  
- Receptorul primește codul, iar biblioteca `IRremote` îl **decodează**.  
- Tu compari codul primit cu codurile pe care le cunoști și decizi ce faci.

### 4) Pasul 1 — Aflăm codurile
Orice telecomandă are alte coduri, deci mai întâi le **citim**:

```cpp
#include <IRremote.h>

const int PIN_IR = 11;

IRrecv receptor(PIN_IR);
decode_results rezultat;

void setup() {
  Serial.begin(9600);
  receptor.enableIRIn();
}

void loop() {
  if (receptor.decode(&rezultat)) {
    Serial.println(rezultat.value, HEX);
    receptor.resume();
  }
}
```

- `receptor.decode(&rezultat)` e adevărat când a sosit un cod.  
- `rezultat.value` e codul; `HEX` îl afișează în hexazecimal.  
- `receptor.resume()` pregătește receptorul pentru **următorul** cod. Fără el, nu mai primești nimic.

Apasă butoanele telecomenzii și notează codurile în tabel:

| Buton | Cod (hex) |
|-------|-----------|
| 1 | ____ |
| 2 | ____ |
| 3 | ____ |
| Power | ____ |
| Volum + | ____ |
| Volum − | ____ |

> Dacă apare `FFFFFFFF`, e semnalul de **repetare** (buton ținut apăsat), nu un buton nou.

### 5) Minim — trei LED-uri
Pune codurile **tale** în locul celor din exemplu:

```cpp
#include <IRremote.h>

const int PIN_IR = 11;

const unsigned long BTN_1 = 0xFF30CF;
const unsigned long BTN_2 = 0xFF18E7;
const unsigned long BTN_3 = 0xFF7A85;

const int LED1 = 4;
const int LED2 = 5;
const int LED3 = 6;

IRrecv receptor(PIN_IR);
decode_results rezultat;

void setup() {
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  receptor.enableIRIn();
}

void comuta(int pin) {
  digitalWrite(pin, !digitalRead(pin));
}

void loop() {
  if (receptor.decode(&rezultat)) {
    unsigned long cod = rezultat.value;

    if (cod == BTN_1) comuta(LED1);
    if (cod == BTN_2) comuta(LED2);
    if (cod == BTN_3) comuta(LED3);

    receptor.resume();
  }
}
```

`comuta(pin)` **inversează** starea LED-ului: dacă era aprins se stinge și invers.

### 6) Complet — Power și luminozitate

```cpp
#include <IRremote.h>

const int PIN_IR = 11;

const unsigned long BTN_1 = 0xFF30CF;
const unsigned long BTN_2 = 0xFF18E7;
const unsigned long BTN_3 = 0xFF7A85;
const unsigned long BTN_POWER = 0xFFA25D;
const unsigned long BTN_VOL_PLUS = 0xFFA857;
const unsigned long BTN_VOL_MINUS = 0xFFE01F;

const int LED1 = 4;
const int LED2 = 5;
const int LED3 = 6;
const int LED_LUMINA = 9;

IRrecv receptor(PIN_IR);
decode_results rezultat;

int luminozitate = 128;

void comuta(int pin) {
  digitalWrite(pin, !digitalRead(pin));
}

void setup() {
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  pinMode(LED_LUMINA, OUTPUT);
  receptor.enableIRIn();
  Serial.begin(9600);
}

void loop() {
  if (receptor.decode(&rezultat)) {
    unsigned long cod = rezultat.value;

    if (cod == BTN_1) comuta(LED1);
    else if (cod == BTN_2) comuta(LED2);
    else if (cod == BTN_3) comuta(LED3);
    else if (cod == BTN_POWER) {
      digitalWrite(LED1, LOW);
      digitalWrite(LED2, LOW);
      digitalWrite(LED3, LOW);
      luminozitate = 0;
    }
    else if (cod == BTN_VOL_PLUS) {
      luminozitate = constrain(luminozitate + 25, 0, 255);
    }
    else if (cod == BTN_VOL_MINUS) {
      luminozitate = constrain(luminozitate - 25, 0, 255);
    }

    analogWrite(LED_LUMINA, luminozitate);
    Serial.println(luminozitate);

    receptor.resume();
  }
}
```

| Buton | Efect |
|-------|-------|
| 1, 2, 3 | comută LED 1, 2, 3 |
| Power | stinge totul |
| Vol + | LED 4 mai luminos (+25) |
| Vol − | LED 4 mai slab (−25) |

---

## Greșeli frecvente
1. **Nu primești nimic** — lipsește `receptor.enableIRIn()` sau pinul nu e 11.  
2. **Primești un singur buton** — ai uitat `receptor.resume()`.  
3. **Butoanele nu fac nimic** — codurile din program nu sunt cele ale telecomenzii tale; citește-le cu pasul 1.  
4. **LED-ul clipește la ținut apăsat** — vezi `FFFFFFFF` (repetare); ignoră-l.  
5. **Eroare `IRremote.h`** — în Tinkercad biblioteca e inclusă; pe Arduino real trebuie instalată (și versiunile noi au alte comenzi).

---

## De făcut azi — „Telecomanda mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 3 butoane comută 3 LED-uri |
| **Complet** | Minim + Power + Vol +/− |

### Pasul 1 — Minim
- [ ] Codurile butoanelor citite și notate  
- [ ] LED-urile se comută  

### Pasul 2 — Complet
- [ ] Power stinge tot  
- [ ] Luminozitate cu Vol +/−  
- [ ] Numele `A3_L10` e corect

### Verificare finală Modul 3
- [ ] Afișez text pe un LCD  
- [ ] Mișc un servo la un unghi dorit  
- [ ] Controlez un motor cu tranzistor  
- [ ] Citesc o tastatură sau o telecomandă

---

## Bonus
- [ ] Butonul „Mute” face LED-urile să clipească 3 ori  
- [ ] Afișează pe LCD ce buton ai apăsat

## Recapitulare rapidă
1. Fiecare buton IR = un **cod**  
2. Citește mai întâi codurile, apoi folosește-le  
3. `resume()` după fiecare cod  
4. `comuta()` inversează un LED

## Pe placa reală *(opțional)*
Receptorul fizic (VS1838B) are 3 pini: OUT, GND, VCC. Biblioteca `IRremote` din versiunea 3 în sus folosește alte nume (`IrReceiver.decode()`), dar ideea e aceeași.

## Quiz scurt
- De ce citim mai întâi codurile?  
- Ce face `resume()`?  
- Cum ai adăuga un al cincilea buton?

## Temă
Desenează o telecomandă pentru **robotul tău** (4 butoane) și scrie ce face fiecare.
