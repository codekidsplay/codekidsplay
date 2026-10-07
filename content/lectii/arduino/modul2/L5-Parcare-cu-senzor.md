# Lecția 5 — Parcare cu senzor
**Modulul 2 · Senzori**  
**Code Kids Play · Sensor Scout**

> Azi măsori **distanța** cu senzorul cu ultrasunete **HC-SR04**, exact ca la mașinile moderne: cu cât te apropii, cu atât bipurile sunt mai dese.  
> Proiect: **„Parcare inteligentă”** · `Prenume_Nume_A2_L05`

---

## Obiectiv
La finalul orei ai un senzor de parcare care bipăie tot mai repede pe măsură ce un obiect se apropie.  
**Minim:** distanța în centimetri, afișată în Serial Monitor.  
**Complet:** Minim + **buzzer** cu ritm după distanță + **3 LED-uri** (verde, galben, roșu).

## De ce contează
Senzorii de ultrasunete trimit un sunet, **așteaptă ecoul** și calculează distanța. Așa văd liliecii, delfinii și mașinile.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4 · trepte |
| 10–30 | Cum „vede” HC-SR04 |
| 30–65 | Citirea distanței |
| 65–105 | Buzzer + LED-uri după distanță |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **Ultrasonic Distance Sensor (HC-SR04)** · Piezo · 3 × LED · 3 × Resistor 220 Ω · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A2_L05`

### 2) Cum funcționează
1. Trimiți un impuls scurt pe **TRIG**.  
2. Senzorul emite un sunet pe care nu-l auzi.  
3. Sunetul se întoarce (**ECHO**).  
4. Măsori **cât timp** a durat și calculezi distanța.

Sunetul parcurge aproximativ **0,034 cm pe microsecundă**, iar drumul e dus-întors, deci: `distanta = timp × 0,034 / 2`.

### 3) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **HC-SR04 · VCC** | **5V** |
| **HC-SR04 · GND** | **GND** |
| **HC-SR04 · TRIG** | pin **7** |
| **HC-SR04 · ECHO** | pin **6** |
| **Piezo** | pin **8** și **GND** |
| **LED verde** | pin **10** → 220 Ω → anod · catod → GND |
| **LED galben** | pin **9** → 220 Ω → anod · catod → GND |
| **LED roșu** | pin **12** → 220 Ω → anod · catod → GND |

### 4) Minim — distanța

```cpp
const int TRIG = 7;
const int ECHO = 6;

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  long timp = pulseIn(ECHO, HIGH);
  float cm = timp * 0.034 / 2.0;

  Serial.print("Distanta: ");
  Serial.print(cm, 1);
  Serial.println(" cm");
  delay(200);
}
```

- `pulseIn(ECHO, HIGH)` măsoară **cât timp** (în microsecunde) pinul ține `HIGH`.  
- În Tinkercad, mută obiectul din fața senzorului ca să vezi distanța schimbându-se.

### 5) O funcție pentru distanță
Ca să nu repetăm codul, îl punem într-o funcție:

```cpp
const int TRIG = 7;
const int ECHO = 6;

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
  Serial.begin(9600);
}

void loop() {
  Serial.println(masoara(), 1);
  delay(200);
}
```

`30000` e **timpul maxim de așteptare** (30 ms). Fără el, dacă nu vine ecou, placa ar aștepta prea mult.

### 6) Complet — bipuri și lumini

```cpp
const int TRIG = 7;
const int ECHO = 6;
const int BUZZER = 8;
const int VERDE = 10;
const int GALBEN = 9;
const int ROSU = 12;

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
  pinMode(VERDE, OUTPUT);
  pinMode(GALBEN, OUTPUT);
  pinMode(ROSU, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  float cm = masoara();

  digitalWrite(VERDE, LOW);
  digitalWrite(GALBEN, LOW);
  digitalWrite(ROSU, LOW);

  if (cm > 100 || cm == 0) {
    digitalWrite(VERDE, HIGH);
    noTone(BUZZER);
    delay(200);
  } else if (cm > 40) {
    digitalWrite(GALBEN, HIGH);
    tone(BUZZER, 800, 80);
    delay(400);
  } else if (cm > 15) {
    digitalWrite(ROSU, HIGH);
    tone(BUZZER, 1000, 60);
    delay(150);
  } else {
    digitalWrite(ROSU, HIGH);
    tone(BUZZER, 1500);
    delay(100);
  }

  Serial.println(cm, 1);
}
```

| Distanță | Lumina | Sunet |
|----------|--------|-------|
| peste 100 cm | verde | liniște |
| 40–100 cm | galben | bip rar |
| 15–40 cm | roșu | bip des |
| sub 15 cm | roșu | sunet continuu |

`cm == 0` înseamnă că nu s-a primit ecou (nimic în fața senzorului).

---

## Greșeli frecvente
1. **Mereu 0 cm** — TRIG și ECHO sunt inversate sau lipsește alimentarea.  
2. **Valori uriașe** — formula e greșită (ai uitat `/ 2`).  
3. **Placa „îngheață”** — fără timeout la `pulseIn`.  
4. **Buzzer continuu** — ai uitat `noTone`.  
5. **LED-uri multiple** — uită să le stingi la început.

---

## De făcut azi — „Parcare inteligentă”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Distanța în cm în Serial Monitor |
| **Complet** | Minim + buzzer pe trepte + 3 LED-uri |

### Pasul 1 — Minim
- [ ] TRIG pe 7, ECHO pe 6  
- [ ] Formula `timp × 0,034 / 2`  

### Pasul 2 — Complet
- [ ] Funcția `masoara()`  
- [ ] 4 trepte de distanță  
- [ ] Numele `A2_L05` e corect

---

## Bonus
- [ ] Afișează un „bar” de `#` în Serial Monitor, mai lung cu cât e mai aproape  
- [ ] Fă parcarea „de bicicletă”: pragurile la jumătate

## Recapitulare rapidă
1. TRIG trimite, ECHO primește  
2. `distanta = timp × 0,034 / 2`  
3. `pulseIn` cu timeout  
4. Trepte de distanță → lumini și sunete

## Pe placa reală *(opțional)*
HC-SR04 fizic are 4 pini: VCC, TRIG, ECHO, GND. Măsoară între ~2 cm și ~400 cm. Suprafețele moi (haine) reflectă prost sunetul.

## Quiz scurt
- De ce împărțim la 2?  
- Ce face `pulseIn`?  
- Ce înseamnă un rezultat de 0 cm în codul de azi?

## Temă
Gândește-te la 3 locuri unde un senzor de distanță ar ajuta (ex. cutie de gunoi care se deschide) și desenează unul.
