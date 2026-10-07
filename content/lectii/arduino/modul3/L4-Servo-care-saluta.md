# Lecția 4 — Servo-ul care salută
**Modulul 3 · Afișaj și mișcare**  
**Code Kids Play · Display Maker**

> Azi dai **mișcare** proiectelor: un **servomotor** care poate merge exact la unghiul pe care îl alegi.  
> Proiect: **„Robotul care salută”** · `Prenume_Nume_A3_L04`

---

## Obiectiv
La finalul orei ai un braț de robot care face cu mâna.  
**Minim:** servo care merge la 0°, 90° și 180°.  
**Complet:** Minim + **mișcare fluidă** înainte și înapoi + **control cu potențiometrul** + **salut la apăsarea unui buton**.

## De ce contează
Brațele de roboți, flapsurile avioanelor și direcția mașinilor RC folosesc servomotoare. Un servo știe **unde e** și se oprește exact la unghiul cerut.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 · alte moduri de afișare |
| 10–30 | Cum funcționează un servo |
| 30–60 | Unghiuri fixe |
| 60–105 | Mișcare fluidă, potențiometru, salut |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **Micro Servo** · Potentiometer · Pushbutton · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A3_L04`

### 2) Conexiuni
Servo-ul are 3 fire:

| Fir | Culoare | Se conectează |
|-----|---------|---------------|
| Alimentare | roșu | **5V** |
| Masă | negru / maro | **GND** |
| Semnal | portocaliu / galben | pin **9** |

| Piesă | Se conectează |
|-------|---------------|
| **Potențiometru** | laterale la 5V și GND, mijloc la **A0** |
| **Buton** | pin **2** și **GND** |

### 3) Minim — unghiuri fixe

```cpp
#include <Servo.h>

Servo brat;

void setup() {
  brat.attach(9);
}

void loop() {
  brat.write(0);
  delay(1000);
  brat.write(90);
  delay(1000);
  brat.write(180);
  delay(1000);
}
```

- `#include <Servo.h>` aduce biblioteca pentru servo.  
- `Servo brat;` creează un obiect care reprezintă servo-ul.  
- `brat.attach(9)` îi spune pe ce pin e legat semnalul.  
- `brat.write(unghi)` îl duce la **0–180°**.

### 4) Mișcare fluidă
Dacă schimbi unghiul brusc, servo-ul sare. Dacă îl crești **grad cu grad**, se mișcă lin:

```cpp
#include <Servo.h>

Servo brat;

void setup() {
  brat.attach(9);
}

void loop() {
  for (int unghi = 0; unghi <= 180; unghi++) {
    brat.write(unghi);
    delay(10);
  }
  for (int unghi = 180; unghi >= 0; unghi--) {
    brat.write(unghi);
    delay(10);
  }
}
```

Mărește `delay` pentru o mișcare mai lentă, micșorează-l pentru una mai rapidă.

### 5) Servo controlat de potențiometru

```cpp
#include <Servo.h>

Servo brat;

void setup() {
  brat.attach(9);
}

void loop() {
  int citire = analogRead(A0);
  int unghi = map(citire, 0, 1023, 0, 180);
  brat.write(unghi);
  delay(15);
}
```

Rotești potențiometrul și servo-ul urmează. `map` convertește 0–1023 în 0–180.

### 6) Complet — saluta la buton
Apeși butonul și brațul face „cu mâna” de 3 ori, apoi revine:

```cpp
#include <Servo.h>

Servo brat;
const int BUTON = 2;

void salut() {
  for (int i = 0; i < 3; i++) {
    brat.write(60);
    delay(300);
    brat.write(120);
    delay(300);
  }
  brat.write(90);
}

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  brat.attach(9);
  brat.write(90);
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    salut();
  } else {
    int unghi = map(analogRead(A0), 0, 1023, 0, 180);
    brat.write(unghi);
  }
  delay(15);
}
```

- Când butonul e apăsat, rulează funcția `salut()`.  
- Altfel, potențiometrul controlează brațul.  
- Poți crea **gesturi** diferite: aplauze, „nu”, „da”.

---

## Greșeli frecvente
1. **Servo-ul tremură** — firul de semnal nu e pe pin 9 sau lipsește GND comun.  
2. **Nu se mișcă** — lipsește `brat.attach(9)`.  
3. **Mișcare sacadată** — unghiul sare prea mult; folosește `for` cu `delay` mic.  
4. **Erori la compilare** — `Servo` se scrie cu **S mare**, `servo` cu mic nu merge.  
5. **Unghi peste 180** — servo-ul standard merge doar 0–180.

---

## De făcut azi — „Robotul care salută”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Servo la 0°, 90°, 180° |
| **Complet** | Minim + mișcare fluidă + potențiometru + salut |

### Pasul 1 — Minim
- [ ] Servo conectat (roșu 5V, negru GND, semnal pin 9)  
- [ ] Merge la 3 unghiuri  

### Pasul 2 — Complet
- [ ] Mișcare fluidă cu `for`  
- [ ] Control cu potențiometru  
- [ ] Gest de salut la buton  
- [ ] Numele `A3_L04` e corect

---

## Bonus
- [ ] Un al doilea gest: „nu” (stânga-dreapta rapid)  
- [ ] Desenează pe hârtie o față de robot și fixează „brațul” pe servo în simulator

## Recapitulare rapidă
1. `#include <Servo.h>` + `Servo nume;` + `attach(pin)`  
2. `write(unghi)` pentru 0–180°  
3. `for` pentru mișcare lină  
4. `map` leagă potențiometrul de unghi

## Pe placa reală *(opțional)*
Un micro servo mic merge de la portul USB, dar mai multe servo-uri au nevoie de **alimentare separată** (4×AA). Leagă GND-ul bateriei la GND-ul Arduino.

## Quiz scurt
- Ce domeniu de unghiuri are un servo standard?  
- Ce face `attach(9)`?  
- De ce mișcăm servo-ul grad cu grad?

## Temă
Gândește-te la 3 gesturi pentru un robot (salut, „da”, „nu”) și notează unghiurile pentru fiecare.
