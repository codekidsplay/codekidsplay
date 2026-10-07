# Lecția 7 — Ventilatorul meu
**Modulul 3 · Afișaj și mișcare**  
**Code Maker Club · Display Maker**

> Azi comanzi un **motor de curent continuu** (DC) cu ajutorul unui **tranzistor** și faci un ventilator cu viteză reglabilă și pornire automată la căldură.  
> Proiect: **„Ventilatorul meu”** · `Prenume_Nume_A3_L07`

---

## Obiectiv
La finalul orei ai un ventilator controlat de Arduino.  
**Minim:** motor pornit/oprit cu un buton, prin tranzistor.  
**Complet:** Minim + **viteză reglată cu potențiometrul** (PWM) + **mod automat** pe baza temperaturii (TMP36).

## De ce contează
Un pin Arduino poate da doar ~**20 mA**. Un motor cere mult mai mult. De aceea folosim un **tranzistor** — un „întrerupător electronic” comandat de un curent mic, care controlează un curent mare.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6 · limite de curent |
| 10–40 | Circuitul cu tranzistor, diodă, motor |
| 40–65 | Pornit / oprit |
| 65–105 | PWM + mod automat |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **DC Motor** · **Transistor NPN (ex. PN2222)** · **Diodă (1N4007)** · Resistor 1 kΩ · Potentiometer · Pushbutton · TMP36 · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A3_L07`

### 2) Cum funcționează tranzistorul
Un tranzistor NPN are 3 picioare: **Bază (B)**, **Colector (C)**, **Emitor (E)**. Un curent mic în bază lasă un curent mare să curgă de la colector la emitor.

| Picior | Se conectează |
|--------|---------------|
| **B (bază)** | pin **9** printr-un **rezistor de 1 kΩ** |
| **C (colector)** | **un fir al motorului** |
| **E (emitor)** | **GND** |

| Piesă | Se conectează |
|-------|---------------|
| **Motor, celălalt fir** | **5V** |
| **Diodă** | în paralel cu motorul, cu **banda** (catodul) spre 5V |
| **Potențiometru** | laterale 5V și GND, mijloc **A0** |
| **Buton** | pin **2** și **GND** |
| **TMP36** | 5V · semnal **A1** · GND |

**Schema pe scurt:** `5V → motor → colector (C), emitor (E) → GND`, iar baza primește semnalul din pin 9.

> **De ce dioda?** Când motorul se oprește, produce un „șoc” de tensiune care poate strica tranzistorul sau placa. Dioda îl ocolește. O pui mereu la motoare și relee.

Pe Tinkercad, treci cursorul peste picioarele tranzistorului ca să vezi B/C/E.

### 3) Minim — pornit / oprit

```cpp
const int MOTOR = 9;
const int BUTON = 2;

bool pornit = false;
bool butonAnterior = false;

void setup() {
  pinMode(MOTOR, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
}

void loop() {
  bool apasat = (digitalRead(BUTON) == LOW);

  if (apasat && !butonAnterior) {
    pornit = !pornit;
  }
  butonAnterior = apasat;

  digitalWrite(MOTOR, pornit);
  delay(30);
}
```

Fiecare apăsare **schimbă starea** (pornit ↔ oprit), tot cu tehnica „frontului” din lecțiile trecute.

### 4) Viteză cu PWM
Pin 9 poate face **PWM**. Un motor primește mai mult sau mai puțin curent în medie:

```cpp
const int MOTOR = 9;
const int POT = A0;

void setup() {
  pinMode(MOTOR, OUTPUT);
}

void loop() {
  int viteza = map(analogRead(POT), 0, 1023, 0, 255);
  analogWrite(MOTOR, viteza);
  delay(20);
}
```

Un motor mic poate să **nu pornească** la valori foarte mici (sub ~60): are nevoie de un „impuls” ca să învingă frecarea.

### 5) Complet — manual + automat

```cpp
const int MOTOR = 9;
const int BUTON = 2;
const int POT = A0;
const int TEMP = A1;

bool automat = false;
bool butonAnterior = false;

float temperatura() {
  float volti = analogRead(TEMP) * 5.0 / 1023.0;
  return (volti - 0.5) * 100.0;
}

void setup() {
  pinMode(MOTOR, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  bool apasat = (digitalRead(BUTON) == LOW);
  if (apasat && !butonAnterior) {
    automat = !automat;
  }
  butonAnterior = apasat;

  int viteza;

  if (automat) {
    float t = temperatura();
    viteza = map((int)t, 20, 40, 0, 255);
    viteza = constrain(viteza, 0, 255);
  } else {
    viteza = map(analogRead(POT), 0, 1023, 0, 255);
  }

  analogWrite(MOTOR, viteza);

  Serial.print(automat ? "AUTOMAT" : "MANUAL");
  Serial.print("  viteza: ");
  Serial.println(viteza);
  delay(100);
}
```

| Mod | Cine decide viteza |
|-----|--------------------|
| **Manual** | potențiometrul |
| **Automat** | temperatura: 20 °C = oprit, 40 °C = viteză maximă |

`(int)t` transformă `float` în întreg (taie zecimalele), ca `map` să primească numere întregi.

---

## Greșeli frecvente
1. **Motorul nu pornește** — emitorul nu e la GND sau baza nu primește semnal.  
2. **Tranzistorul se „arde”** (în simulator) — motorul e conectat direct la pin, nu prin tranzistor; sau lipsește rezistorul de bază.  
3. **Motorul merge mereu** — colectorul și emitorul sunt inversate.  
4. **Fără diodă** — merge în simulator, dar în realitate poate strica placa.  
5. **Viteză mică nu pornește** — are nevoie de un minim; folosește `map(..., 60, 255)` pentru o pornire sigură.

---

## De făcut azi — „Ventilatorul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Buton → motor pornit / oprit |
| **Complet** | Minim + viteză cu potențiometru + mod automat |

### Pasul 1 — Minim
- [ ] Tranzistor, rezistor 1 kΩ, diodă  
- [ ] Butonul pornește motorul  

### Pasul 2 — Complet
- [ ] Viteză cu PWM  
- [ ] Mod automat (TMP36)  
- [ ] Numele `A3_L07` e corect

---

## Bonus
- [ ] Un LED care arată modul (aprins = automat)  
- [ ] „Pornire moale”: viteza crește treptat în 2 secunde

## Recapitulare rapidă
1. Pinul Arduino **nu** alimentează motorul direct  
2. Tranzistor = întrerupător electronic  
3. Dioda protejează la oprire  
4. PWM schimbă viteza

## Pe placa reală *(opțional)*
Motorul real are nevoie de **alimentare separată** (baterii) dacă e mai mare decât un motoraș de jucărie, cu GND comun. Pentru motoare mari se folosește un modul driver (L298N, L9110).

## Quiz scurt
- De ce nu legăm motorul direct la pin?  
- La ce folosește dioda?  
- Ce face `analogWrite(MOTOR, 128)`?

## Temă
Gândește-te la 3 dispozitive cu motor DC din casă (ventilator, jucărie, aspirator) și notează cum se controlează viteza fiecăruia.
