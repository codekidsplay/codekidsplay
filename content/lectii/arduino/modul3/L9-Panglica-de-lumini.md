# Lecția 9 — Panglica de lumini
**Modulul 3 · Afișaj și mișcare**  
**Code Maker Club · Display Maker**

> Azi lucrezi cu **LED-uri NeoPixel**: LED-uri RGB pe care le comanzi **individual** cu un singur fir.  
> Proiect: **„Panglica magică”** · `Prenume_Nume_A3_L09`

---

## Obiectiv
La finalul orei ai o panglică de lumini cu efecte.  
**Minim:** aprinzi pixelii într-o culoare și faci o „rază” care aleargă.  
**Complet:** Minim + **curcubeu** + **buton** care schimbă efectul + **potențiometru** pentru luminozitate.

## De ce contează
Luminile de Crăciun inteligente, pantofii care se aprind și ecranele LED mari folosesc LED-uri adresabile. Poți face **orice culoare, pe orice LED**, cu un singur pin Arduino.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8 · LED RGB (M1 L6) |
| 10–25 | Conexiuni NeoPixel |
| 25–60 | Culori și raza |
| 60–105 | Curcubeu, buton, luminozitate |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **NeoPixel Ring (12 × RGB LED)** · Potentiometer · Pushbutton · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A3_L09`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **NeoPixel · alimentare (+)** | **5V** |
| **NeoPixel · GND** | **GND** |
| **NeoPixel · DIN / semnal** | pin **6** |
| **Potențiometru** | laterale 5V și GND, mijloc **A0** |
| **Buton** | pin **2** și **GND** |

> Pe un inel/panglică reală, pune și un **rezistor de ~300–500 Ω** pe firul de semnal și un condensator mare pe alimentare. Pentru câteva LED-uri în simulator nu e nevoie.

### 3) Primele culori

```cpp
#include <Adafruit_NeoPixel.h>

const int PIN = 6;
const int NR = 12;

Adafruit_NeoPixel banda(NR, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  banda.begin();
  banda.setBrightness(50);

  banda.setPixelColor(0, banda.Color(255, 0, 0));
  banda.setPixelColor(1, banda.Color(0, 255, 0));
  banda.setPixelColor(2, banda.Color(0, 0, 255));
  banda.show();
}

void loop() {
}
```

- `Adafruit_NeoPixel banda(NR, PIN, ...)` creează obiectul: câți pixeli și pe ce pin.  
- `banda.Color(r, g, b)` — culoare, cu valori **0–255** pentru roșu, verde, albastru.  
- `setPixelColor(index, culoare)` pune culoarea pe pixelul cu numărul `index` (**începe de la 0**).  
- `show()` trimite efectiv culorile la LED-uri. **Fără `show()` nu se vede nimic!**  
- `setBrightness(50)` limitează luminozitatea (0–255).

### 4) Minim — raza care aleargă

```cpp
#include <Adafruit_NeoPixel.h>

const int PIN = 6;
const int NR = 12;

Adafruit_NeoPixel banda(NR, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  banda.begin();
  banda.setBrightness(50);
}

void loop() {
  for (int i = 0; i < NR; i++) {
    banda.clear();
    banda.setPixelColor(i, banda.Color(0, 150, 255));
    banda.show();
    delay(80);
  }
}
```

`banda.clear()` stinge toți pixelii, apoi aprindem doar unul, tot mai departe. Rezultatul e o „rază” care se învârte.

### 5) Curcubeul
Culorile din curcubeu se obțin cu o funcție „roata culorilor”: primește un număr 0–255 și returnează o culoare, parcurgând spectrul.

```cpp
#include <Adafruit_NeoPixel.h>

const int PIN = 6;
const int NR = 12;

Adafruit_NeoPixel banda(NR, PIN, NEO_GRB + NEO_KHZ800);

uint32_t roata(byte pozitie) {
  pozitie = 255 - pozitie;
  if (pozitie < 85) {
    return banda.Color(255 - pozitie * 3, 0, pozitie * 3);
  }
  if (pozitie < 170) {
    pozitie -= 85;
    return banda.Color(0, pozitie * 3, 255 - pozitie * 3);
  }
  pozitie -= 170;
  return banda.Color(pozitie * 3, 255 - pozitie * 3, 0);
}

void setup() {
  banda.begin();
  banda.setBrightness(50);
}

void loop() {
  for (int j = 0; j < 256; j++) {
    for (int i = 0; i < NR; i++) {
      banda.setPixelColor(i, roata((i * 256 / NR + j) & 255));
    }
    banda.show();
    delay(20);
  }
}
```

Fiecare pixel ia o culoare puțin diferită, iar `j` o „rotește” — curcubeul pare să se miște.

### 6) Complet — efecte, buton, luminozitate

```cpp
#include <Adafruit_NeoPixel.h>

const int PIN = 6;
const int NR = 12;
const int BUTON = 2;
const int POT = A0;

Adafruit_NeoPixel banda(NR, PIN, NEO_GRB + NEO_KHZ800);

int efect = 0;
const int NR_EFECTE = 3;
bool butonAnterior = false;
int pas = 0;

uint32_t roata(byte pozitie) {
  pozitie = 255 - pozitie;
  if (pozitie < 85) {
    return banda.Color(255 - pozitie * 3, 0, pozitie * 3);
  }
  if (pozitie < 170) {
    pozitie -= 85;
    return banda.Color(0, pozitie * 3, 255 - pozitie * 3);
  }
  pozitie -= 170;
  return banda.Color(pozitie * 3, 255 - pozitie * 3, 0);
}

void efectRaza() {
  banda.clear();
  banda.setPixelColor(pas % NR, banda.Color(0, 150, 255));
}

void efectCurcubeu() {
  for (int i = 0; i < NR; i++) {
    banda.setPixelColor(i, roata((i * 256 / NR + pas * 4) & 255));
  }
}

void efectRespiratie() {
  int v = abs((pas * 8) % 510 - 255);
  for (int i = 0; i < NR; i++) {
    banda.setPixelColor(i, banda.Color(v, 0, 255 - v));
  }
}

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  banda.begin();
}

void loop() {
  bool apasat = (digitalRead(BUTON) == LOW);
  if (apasat && !butonAnterior) {
    efect = (efect + 1) % NR_EFECTE;
  }
  butonAnterior = apasat;

  banda.setBrightness(map(analogRead(POT), 0, 1023, 5, 120));

  if (efect == 0) efectRaza();
  else if (efect == 1) efectCurcubeu();
  else efectRespiratie();

  banda.show();
  pas++;
  delay(40);
}
```

| Efect | Ce vezi |
|-------|---------|
| 0 · Rază | un pixel care aleargă |
| 1 · Curcubeu | culori care se rotesc |
| 2 · Respirație | toate LED-urile pulsează între roșu și albastru |

- `pas % NR` ține pixelul în interval 0–11.  
- `abs(...)` face valoarea să **urce și să coboare** (formă de „triunghi”).  
- Potențiometrul reglează luminozitatea în timp real.

---

## Greșeli frecvente
1. **Nu se aprinde nimic** — lipsește `banda.show()`.  
2. **Culori greșite** — ordinea e `NEO_GRB` în cod; unele benzi sunt `NEO_RGB`.  
3. **Doar primul pixel merge** — numărul de pixeli `NR` e prea mic.  
4. **Prea luminos** — folosește `setBrightness` (și consumă mai puțin curent).  
5. **Eroare la compilare** — lipsește `#include <Adafruit_NeoPixel.h>`.

---

## De făcut azi — „Panglica magică”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | O rază de culoare care aleargă |
| **Complet** | Minim + curcubeu + buton + luminozitate cu potențiometru |

### Pasul 1 — Minim
- [ ] NeoPixel conectat (5V, GND, pin 6)  
- [ ] Raza aleargă  

### Pasul 2 — Complet
- [ ] 3 efecte cu buton  
- [ ] Luminozitate din potențiometru  
- [ ] Numele `A3_L09` e corect

---

## Bonus
- [ ] Un efect nou: „stea căzătoare” cu coadă mai estompată  
- [ ] Culorile steagului României (albastru, galben, roșu), pe porțiuni din inel

## Recapitulare rapidă
1. `Adafruit_NeoPixel obiect(nr, pin, tip)`  
2. `setPixelColor` + `show()`  
3. `Color(r, g, b)` pentru culoare  
4. Un buton + `%` alege efectul

## Pe placa reală *(opțional)*
Fiecare NeoPixel poate consuma până la **60 mA** la alb maxim. Pentru mai mult de ~10 LED-uri, folosești alimentare externă de 5V și un rezistor de 330 Ω pe semnal.

## Quiz scurt
- De ce e nevoie de `show()`?  
- Ce valori are `Color(0, 255, 0)`?  
- Cum aflăm câți pixeli sunt pe inel?

## Temă
Alege 3 culori pentru o lumină de seară, una de petrecere și una de lectură. Care sunt valorile RGB?
