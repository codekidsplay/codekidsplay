# Lecția 6 — Radar de mână
**Modulul 3 · Afișaj și mișcare**  
**Code Maker Club · Display Maker**

> Azi pui un senzor de distanță **pe un servo** și construiești un radar care „scanează” camera.  
> Proiect: **„Radarul meu”** · `Prenume_Nume_A3_L06`

---

## Obiectiv
La finalul orei ai un radar care se rotește și raportează obiectele din jur.  
**Minim:** servo care se rotește 0–180° și afișează distanța la fiecare unghi în Serial Monitor.  
**Complet:** Minim + **LED de alertă** + **buzzer** când găsește un obiect aproape + reține **unghiul obiectului cel mai apropiat**.

## De ce contează
Radarele, sonarele și LIDAR-ul mașinilor autonome fac același lucru: **rotesc un senzor** și construiesc o „hartă” a ce e în jur.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 · servo + distanță |
| 10–30 | Montaj: senzor + servo |
| 30–65 | Scanarea 0–180° |
| 65–105 | Alertă și cel mai apropiat obiect |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · Micro Servo · HC-SR04 · LED roșu · Resistor 220 Ω · Piezo · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A3_L06`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **Servo** | roșu 5V · negru GND · semnal pin **9** |
| **HC-SR04** | VCC 5V · GND · TRIG pin **7** · ECHO pin **6** |
| **LED roșu** | pin **4** → 220 Ω → anod · catod → GND |
| **Piezo** | pin **8** și **GND** |

În Tinkercad, **lipește** HC-SR04 pe brațul servo (trage-l peste el), ca să se rotească împreună.

### 3) Minim — scanare

```cpp
#include <Servo.h>

const int TRIG = 7;
const int ECHO = 6;

Servo radar;

float masoara() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long timp = pulseIn(ECHO, HIGH, 30000);
  return timp * 0.034 / 2.0;
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  radar.attach(9);
  Serial.begin(9600);
}

void loop() {
  for (int unghi = 0; unghi <= 180; unghi += 10) {
    radar.write(unghi);
    delay(300);
    Serial.print(unghi);
    Serial.print(",");
    Serial.println(masoara(), 0);
  }
  for (int unghi = 180; unghi >= 0; unghi -= 10) {
    radar.write(unghi);
    delay(300);
    Serial.print(unghi);
    Serial.print(",");
    Serial.println(masoara(), 0);
  }
}
```

- `unghi += 10` face pași de **10 grade**: 0, 10, 20 … 180.  
- `delay(300)` lasă servo-ul să ajungă înainte de măsurare.  
- Format „unghi,distanță” (cu virgulă): la fel ca în aplicațiile reale de radar.

### 4) Un singur sens, cu o funcție
Ca să nu duplicăm codul, facem o funcție care scanează între două unghiuri:

```cpp
void scaneaza(int de_la, int pana_la, int pas) {
  for (int unghi = de_la; unghi != pana_la + pas; unghi += pas) {
    radar.write(unghi);
    delay(300);
    // aici măsori și afișezi
  }
}
```

Apeli: `scaneaza(0, 180, 10);` (dus) și `scaneaza(180, 0, -10);` (întors). Pasul **negativ** inversează sensul.

### 5) Complet — alertă și cel mai apropiat obiect

```cpp
#include <Servo.h>

const int TRIG = 7;
const int ECHO = 6;
const int LED = 4;
const int BUZZER = 8;
const int PRAG = 30;

Servo radar;

float celMaiApropiat = 999;
int unghiApropiat = 0;

float masoara() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long timp = pulseIn(ECHO, HIGH, 30000);
  return timp * 0.034 / 2.0;
}

void scaneaza(int deLa, int panaLa, int pas) {
  for (int unghi = deLa; unghi != panaLa + pas; unghi += pas) {
    radar.write(unghi);
    delay(300);

    float cm = masoara();

    Serial.print(unghi);
    Serial.print(",");
    Serial.println(cm, 0);

    if (cm > 0 && cm < celMaiApropiat) {
      celMaiApropiat = cm;
      unghiApropiat = unghi;
    }

    if (cm > 0 && cm < PRAG) {
      digitalWrite(LED, HIGH);
      tone(BUZZER, 1000, 100);
    } else {
      digitalWrite(LED, LOW);
    }
  }
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT);
  radar.attach(9);
  Serial.begin(9600);
}

void loop() {
  celMaiApropiat = 999;

  scaneaza(0, 180, 10);

  Serial.print("Cel mai apropiat: ");
  Serial.print(celMaiApropiat, 0);
  Serial.print(" cm la ");
  Serial.print(unghiApropiat);
  Serial.println(" grade");

  scaneaza(180, 0, -10);
}
```

**Idei importante**

- **Variabile globale** `celMaiApropiat` și `unghiApropiat` rețin rezultatul scanării.  
- La început de scanare, `celMaiApropiat = 999` — o valoare uriașă, pe care orice măsurătoare o bate.  
- Condiția `unghi != panaLa + pas` oprește ciclul **după** ultimul unghi, în ambele sensuri.

### 6) Cum citești rezultatul
Dacă în Serial Monitor vezi `70,18`, înseamnă: **la 70°** e ceva la **18 cm**. Pune un obiect în fața radarului și învârte-l pentru a vedea cum se schimbă unghiul.

---

## Greșeli frecvente
1. **Distanțe aiurea** — măsori înainte ca servo-ul să ajungă; mărește `delay`.  
2. **Ciclu infinit** — condiția din `for` nu e atinsă (ex. `unghi != 180` când pasul sare peste).  
3. **Senzorul nu se rotește** — nu e lipit de servo în Tinkercad.  
4. **Zgomot** — alertele se declanșează mereu; mărește pragul sau fă media a 3 măsurători.  
5. **Servo tremură** — lipsește GND comun.

---

## De făcut azi — „Radarul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Scanare 0–180° cu distanța afișată |
| **Complet** | Minim + LED/buzzer + cel mai apropiat obiect |

### Pasul 1 — Minim
- [ ] Servo și senzor montate  
- [ ] Format „unghi,distanță”  

### Pasul 2 — Complet
- [ ] Funcția `scaneaza`  
- [ ] Alertă la sub 30 cm  
- [ ] Raport „Cel mai apropiat”  
- [ ] Numele `A3_L06` e corect

---

## Bonus
- [ ] Pas de **5°** pentru precizie mai mare  
- [ ] La final, servo-ul se oprește **în direcția** obiectului cel mai apropiat

## Recapitulare rapidă
1. Senzor + servo = radar  
2. O funcție cu **pas negativ** face scanarea în ambele sensuri  
3. Variabile globale rețin „cel mai bun” rezultat  
4. Așteptăm servo-ul înainte să măsurăm

## Pe placa reală *(opțional)*
Servo-urile mici vibrează și pot strica măsurătorile; fixează senzorul bine și lasă o pauză după fiecare mișcare.

## Quiz scurt
- De ce așteptăm 300 ms înainte să măsurăm?  
- La ce folosește `celMaiApropiat = 999`?  
- Ce face un pas de `-10`?

## Temă
Desenează pe hârtie o „hartă” de radar în formă de semicerc și marchează unde ar apărea 3 obiecte.
