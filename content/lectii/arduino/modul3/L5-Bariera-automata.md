# Lecția 5 — Bariera automată
**Modulul 3 · Afișaj și mișcare**  
**Code Maker Club · Display Maker**

> Azi combini **senzorul de distanță** cu **servo-ul** și construiești o barieră de parcare care se ridică singură.  
> Proiect: **„Bariera mea”** · `Prenume_Nume_A3_L05`

---

## Obiectiv
La finalul orei ai o barieră care se **deschide** când se apropie o mașină și se **închide** după câteva secunde.  
**Minim:** servo ridicat la distanță mică, coborât altfel.  
**Complet:** Minim + **LED verde/roșu** + **întârziere de 3 secunde** înainte de închidere (fără `delay`) + mesaj în Serial Monitor.

## De ce contează
Barierele, ușile automate și porțile de garaj au aceeași logică: **detectez → deschid → aștept → închid**. Aceasta se numește **mașină de stări**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4 (servo) și Modulul 2 L5 (distanță) |
| 10–30 | Schema |
| 30–60 | Varianta simplă |
| 60–105 | Stări + timp cu `millis()` |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · Micro Servo · HC-SR04 · LED verde · LED roșu · 2 × Resistor 220 Ω · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A3_L05`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **Servo** | roșu 5V · negru GND · semnal pin **9** |
| **HC-SR04** | VCC 5V · GND · TRIG pin **7** · ECHO pin **6** |
| **LED verde** | pin **4** → 220 Ω → anod · catod → GND |
| **LED roșu** | pin **5** → 220 Ω → anod · catod → GND |

În Tinkercad, pune o **săgeată** (un obiect lung) pe brațul servo, ca să arate ca o barieră.

### 3) Minim — varianta simplă

```cpp
#include <Servo.h>

const int TRIG = 7;
const int ECHO = 6;

Servo bariera;

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
  bariera.attach(9);
  bariera.write(0);
}

void loop() {
  float cm = masoara();

  if (cm > 0 && cm < 20) {
    bariera.write(90);
  } else {
    bariera.write(0);
  }
  delay(100);
}
```

- `0°` = barieră **coborâtă**, `90°` = **ridicată**.  
- `cm > 0` filtrează „fără ecou” (0), când nu e nimic în față.  
- Problema: bariera se închide **imediat** ce mașina trece de senzor, deci poate lovi mașina!

### 4) Mașina de stări
Vrem ca bariera să rămână ridicată **încă 3 secunde** după ce mașina a plecat. Folosim **stări**:

| Stare | Ce face | Trece în… |
|-------|---------|-----------|
| **INCHISA** | bariera jos, LED roșu | **DESCHISA** când vede mașina |
| **DESCHISA** | bariera sus, LED verde | **ASTEAPTA** când nu mai vede mașina |
| **ASTEAPTA** | bariera sus, numără 3 s | **INCHISA** după 3 s (sau **DESCHISA** dacă apare o mașină) |

### 5) Complet — codul

```cpp
#include <Servo.h>

const int TRIG = 7;
const int ECHO = 6;
const int VERDE = 4;
const int ROSU = 5;

Servo bariera;

enum Stare { INCHISA, DESCHISA, ASTEAPTA };
Stare stare = INCHISA;
unsigned long momentPlecare = 0;

float masoara() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long timp = pulseIn(ECHO, HIGH, 30000);
  return timp * 0.034 / 2.0;
}

bool masinaLangaBariera() {
  float cm = masoara();
  return (cm > 0 && cm < 20);
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(VERDE, OUTPUT);
  pinMode(ROSU, OUTPUT);
  bariera.attach(9);
  bariera.write(0);
  Serial.begin(9600);
}

void loop() {
  bool masina = masinaLangaBariera();

  if (stare == INCHISA) {
    bariera.write(0);
    digitalWrite(ROSU, HIGH);
    digitalWrite(VERDE, LOW);
    if (masina) {
      stare = DESCHISA;
      Serial.println("Deschid");
    }
  } else if (stare == DESCHISA) {
    bariera.write(90);
    digitalWrite(ROSU, LOW);
    digitalWrite(VERDE, HIGH);
    if (!masina) {
      stare = ASTEAPTA;
      momentPlecare = millis();
      Serial.println("Astept");
    }
  } else {
    if (masina) {
      stare = DESCHISA;
    } else if (millis() - momentPlecare >= 3000) {
      stare = INCHISA;
      Serial.println("Inchid");
    }
  }
  delay(100);
}
```

**Ce e nou**

- `enum Stare { INCHISA, DESCHISA, ASTEAPTA };` creează propriul tău tip cu **trei valori posibile**.  
- Variabila `stare` ține minte **în ce situație** e bariera.  
- În starea `ASTEAPTA`, nu blocăm programul cu `delay(3000)`; verificăm timpul scurs cu `millis()`, deci dacă apare altă mașină, bariera reacționează imediat.

### 6) Test

| Scenariu | Ce faci | Rezultat |
|----------|---------|----------|
| 1 | Obiect la 10 cm | Bariera sus, LED verde |
| 2 | Muți obiectul departe | 3 secunde bariera rămâne sus |
| 3 | Aduci obiectul în timpul așteptării | Revine în „deschisă” |
| 4 | Aștepți 3 s fără obiect | Bariera jos, LED roșu |

---

## Greșeli frecvente
1. **Bariera tremură** — senzorul oscilează la limită; mărește pragul sau adaugă medie.  
2. **Nu se închide niciodată** — `cm == 0` e tratat ca „mașină”; folosește `cm > 0 &&`.  
3. **Stare blocată** — lipsește o tranziție în `if` sau `else if`.  
4. **Timp greșit** — compari `millis()` cu variabila greșită.  
5. **Servo nu ajunge la 90°** — pe servo-ul real poate fi nevoie de calibrare.

---

## De făcut azi — „Bariera mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Sus când e mașină, jos altfel |
| **Complet** | Minim + 3 stări + LED-uri + întârziere cu `millis()` |

### Pasul 1 — Minim
- [ ] Servo și senzor conectate  
- [ ] Bariera reacționează  

### Pasul 2 — Complet
- [ ] `enum Stare` cu 3 valori  
- [ ] 3 secunde de așteptare, fără `delay(3000)`  
- [ ] Numele `A3_L05` e corect

---

## Bonus
- [ ] Un buton „urgență” care deschide bariera oricând  
- [ ] Un contor de mașini trecute, afișat în Serial Monitor

## Recapitulare rapidă
1. Detectez → deschid → aștept → închid  
2. `enum` + variabilă de stare = **mașină de stări**  
3. `millis()` măsoară timpul fără să blocheze  
4. Testează toate tranzițiile

## Pe placa reală *(opțional)*
Barierele reale folosesc motoare puternice, senzori de siguranță (buclă de inducție, fotocelulă) și limitatoare. Modelul tău folosește doar un micro servo.

## Quiz scurt
- Ce stare urmează după `DESCHISA` când mașina pleacă?  
- De ce nu folosim `delay(3000)` în `ASTEAPTA`?  
- Ce înseamnă `cm > 0` în cod?

## Temă
Desenează diagrama stărilor pentru o **ușă automată de magazin** (stări și tranziții).
