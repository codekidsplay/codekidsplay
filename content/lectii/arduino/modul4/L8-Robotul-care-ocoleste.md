# Lecția 8 — Robotul care ocolește
**Modulul 4 · Proiecte complete**  
**Code Maker Club · Arduino Creator**

> Azi construiești „creierul” unui **robot** cu două motoare și un senzor de distanță, care merge singur și **ocolește obstacolele**.  
> Proiect: **„Robotul meu”** · `Prenume_Nume_A4_L08`

---

## Obiectiv
La finalul orei robotul tău merge înainte și se întoarce când vede un obstacol.  
**Minim:** două motoare + senzor de distanță: dacă obstacolul e aproape, se întoarce într-o parte.  
**Complet:** Minim + **servo care „se uită”** în stânga și în dreapta și robotul alege **partea cu mai mult loc** + buton de pornire + LED de stare.

## De ce contează
Robotul autonom pune cap la cap tot ce știi: senzori, decizii, motoare, funcții. Aspiratoarele-robot și mașinile autonome fac exact asta: **simt, decid, acționează**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7 · ce face un robot |
| 10–40 | Circuitul: 2 motoare + senzor |
| 40–70 | Mersul și întoarcerea |
| 70–105 | Servo care alege direcția |
| 105–120 | Test, recap, galerie |

**Componente azi:** Arduino Uno · Breadboard · 2 × DC Motor · 2 × NPN transistor · 2 × Diodă · 2 × Resistor 1 kΩ · HC-SR04 · Micro Servo · Pushbutton · LED · Resistor 220 Ω · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A4_L08`

### 2) Cum merge un robot cu 2 roți
Fiecare roată are propriul motor. Fără mers înapoi, **virezi** oprind **o singură roată**:

| Motor stânga | Motor dreapta | Robotul… |
|--------------|---------------|----------|
| pornit | pornit | merge înainte |
| oprit | pornit | virează **la stânga** (se învârte în jurul roții stângi) |
| pornit | oprit | virează **la dreapta** |
| oprit | oprit | stă |

### 3) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **Motor stânga** | un fir 5V · celălalt la colectorul tranzistorului 1 · emitor GND · bază la pin **5** prin 1 kΩ · dioda în paralel cu motorul (banda spre 5V) |
| **Motor dreapta** | la fel, cu tranzistorul 2, baza la pin **6** prin 1 kΩ |
| **HC-SR04** | VCC 5V · GND · TRIG **7** · ECHO **8** |
| **Servo** | roșu 5V · negru GND · semnal **9** |
| **Buton start** | pin **2** și **GND** |
| **LED stare** | pin **13** → 220 Ω → anod · catod → GND |

În Tinkercad, lipește **senzorul pe servo**, dar dacă ai încurcătură, începe cu senzorul fix și adaugă servo-ul la pasul 6.

### 4) Funcții de bază

```cpp
const int MOTOR_ST = 5;
const int MOTOR_DR = 6;

void inainte(int viteza) {
  analogWrite(MOTOR_ST, viteza);
  analogWrite(MOTOR_DR, viteza);
}

void stanga(int viteza) {
  analogWrite(MOTOR_ST, 0);
  analogWrite(MOTOR_DR, viteza);
}

void dreapta(int viteza) {
  analogWrite(MOTOR_ST, viteza);
  analogWrite(MOTOR_DR, 0);
}

void opreste() {
  analogWrite(MOTOR_ST, 0);
  analogWrite(MOTOR_DR, 0);
}
```

Cu aceste funcții, restul programului arată ca niște **comenzi simple**: `inainte(200); delay(1000); stanga(200);`.

### 5) Minim — ocolește la 20 cm

```cpp
const int MOTOR_ST = 5;
const int MOTOR_DR = 6;
const int TRIG = 7;
const int ECHO = 8;
const int VITEZA = 200;

float masoara() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long timp = pulseIn(ECHO, HIGH, 30000);
  if (timp == 0) return 400;
  return timp * 0.034 / 2.0;
}

void inainte(int viteza) {
  analogWrite(MOTOR_ST, viteza);
  analogWrite(MOTOR_DR, viteza);
}

void dreapta(int viteza) {
  analogWrite(MOTOR_ST, viteza);
  analogWrite(MOTOR_DR, 0);
}

void setup() {
  pinMode(MOTOR_ST, OUTPUT);
  pinMode(MOTOR_DR, OUTPUT);
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
}

void loop() {
  if (masoara() < 20) {
    dreapta(VITEZA);
    delay(400);
  } else {
    inainte(VITEZA);
  }
  delay(50);
}
```

`if (timp == 0) return 400;` — dacă nu vine ecou, considerăm calea **liberă** (400 cm), nu un obstacol. Fără această regulă, robotul ar crede că e un obstacol chiar și pe drum liber (ai văzut asta la parcarea din Modulul 2).

### 6) Complet — se uită și alege

```cpp
#include <Servo.h>

const int MOTOR_ST = 5;
const int MOTOR_DR = 6;
const int TRIG = 7;
const int ECHO = 8;
const int PIN_SERVO = 9;
const int BUTON = 2;
const int LED = 13;
const int VITEZA = 200;
const int PRAG = 20;

Servo cap;
bool pornit = false;
bool butonAnterior = false;

float masoara() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long timp = pulseIn(ECHO, HIGH, 30000);
  if (timp == 0) return 400;
  return timp * 0.034 / 2.0;
}

float masoaraLa(int unghi) {
  cap.write(unghi);
  delay(500);
  float cm = masoara();
  return cm;
}

void inainte(int viteza) {
  analogWrite(MOTOR_ST, viteza);
  analogWrite(MOTOR_DR, viteza);
}

void stanga(int viteza) {
  analogWrite(MOTOR_ST, 0);
  analogWrite(MOTOR_DR, viteza);
}

void dreapta(int viteza) {
  analogWrite(MOTOR_ST, viteza);
  analogWrite(MOTOR_DR, 0);
}

void opreste() {
  analogWrite(MOTOR_ST, 0);
  analogWrite(MOTOR_DR, 0);
}

void ocoleste() {
  opreste();

  float distStanga = masoaraLa(150);
  float distDreapta = masoaraLa(30);
  cap.write(90);

  if (distStanga > distDreapta) {
    stanga(VITEZA);
  } else {
    dreapta(VITEZA);
  }
  delay(600);
  opreste();
}

void setup() {
  pinMode(MOTOR_ST, OUTPUT);
  pinMode(MOTOR_DR, OUTPUT);
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
  cap.attach(PIN_SERVO);
  cap.write(90);
  Serial.begin(9600);
}

void loop() {
  bool apasat = (digitalRead(BUTON) == LOW);
  if (apasat && !butonAnterior) {
    pornit = !pornit;
    if (!pornit) opreste();
  }
  butonAnterior = apasat;

  digitalWrite(LED, pornit);

  if (pornit) {
    float cm = masoara();
    Serial.println(cm, 0);

    if (cm < PRAG) {
      ocoleste();
    } else {
      inainte(VITEZA);
    }
  }
  delay(50);
}
```

**Cum gândește robotul**

1. Merge înainte cât timp calea e liberă.  
2. Vede un obstacol sub 20 cm → **se oprește**.  
3. Servo-ul se uită la **stânga** (150°) și la **dreapta** (30°) și măsoară.  
4. Alege partea cu **distanța mai mare** și virează 0,6 secunde.  
5. Servo revine în față și robotul pornește iar.

În funcții ca `ocoleste()`, `delay` e acceptabil: robotul **stă oricum**.

### 7) Teste

| Scenariu | Ce faci | Rezultat |
|----------|---------|----------|
| Cale liberă | nimic în față | ambele motoare merg |
| Obstacol în față | obiect la 10 cm | motoarele se opresc, servo se uită |
| Mai mult loc în stânga | obiect doar în dreapta | virează spre stânga |
| Buton | apasă | pornit / oprit, LED arată starea |

---

## Greșeli frecvente
1. **Robotul se învârte mereu** — pragul e prea mare sau senzorul „vede” mereu ceva.  
2. **Un motor nu merge** — tranzistorul sau dioda e greșit conectată.  
3. **Nu virează** — ambele motoare primesc același semnal.  
4. **Servo-ul tremură** — alimentare insuficientă; adaugă GND comun.  
5. **Citiri 0** — tratate ca obstacol; folosește `return 400` la lipsa ecoului.

---

## De făcut azi — „Robotul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Merge, vede obstacol, virează |
| **Complet** | Minim + servo care se uită + alege partea liberă + buton |

### Pasul 1 — Minim
- [ ] 2 motoare cu tranzistoare și diode  
- [ ] Ocolește la 20 cm  

### Pasul 2 — Complet
- [ ] Servo măsoară stânga și dreapta  
- [ ] Alege direcția cu mai mult loc  
- [ ] Buton pornit / oprit  
- [ ] Numele `A4_L08` e corect

---

## Bonus
- [ ] Dacă ambele părți sunt blocate (sub 15 cm), se învârte **mai mult** timp (întoarcere completă)  
- [ ] LED roșu care se aprinde când robotul „gândește” (în `ocoleste`)

## Recapitulare rapidă
1. Robot = **simte → decide → acționează**  
2. Virezi oprind o singură roată  
3. Funcții simple: `inainte`, `stanga`, `dreapta`, `opreste`  
4. Compară distanțele ca să alegi direcția

## Pe placa reală *(opțional)*
Un robot real are nevoie de **șasiu**, roți, baterii separate pentru motoare și un modul driver (L298N sau L9110) care permite și mersul înapoi. Alimentează motoarele separat de Arduino, cu GND comun.

## Quiz scurt
- Cum virează robotul cu 2 roți?  
- De ce `return 400` când nu vine ecou?  
- Ce face robotul dacă ambele părți au aceeași distanță?

## Temă
Desenează pe hârtie un labirint simplu și urmărește cum ar trece robotul tău, pas cu pas.
