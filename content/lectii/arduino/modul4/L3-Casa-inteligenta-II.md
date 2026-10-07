# Lecția 3 — Casă inteligentă II: securitate și acces
**Modulul 4 · Proiecte complete**  
**Code Maker Club · Arduino Creator**

> Azi adaugi casei **securitate**: o alarmă cu PIR și o ușă cu servo. Continui circuitul din lecția anterioară.  
> Proiect: **„Casa mea II”** · `Prenume_Nume_A4_L03`

---

## Obiectiv
La finalul orei casa ta are **lumini, climat și securitate** într-un singur program.  
**Minim:** alarmă PIR armabilă cu buton și sirenă.  
**Complet:** Minim + **ușă cu servo** care se deschide la buton + **LED de alarmă** + **mesaj pe LCD** („ARMAT”, „INTRUS!”).

## De ce contează
Aici înveți să **extinzi un proiect existent** fără să-l strici: copiezi circuitul, adaugi funcții noi și le chemi din `loop()`.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2 · tabelul de pini |
| 10–30 | Copiem circuitul și adăugăm piesele |
| 30–70 | Funcțiile de securitate |
| 70–105 | Integrare + LCD |
| 105–120 | Test, recap, galerie |

**Componente noi azi:** PIR Sensor · Pushbutton · Micro Servo · Piezo · LED roșu · Resistor 220 Ω

---

## Pas cu pas

### 1) Circuit nou, din copia lecției II
Deschide `Prenume_Nume_A4_L02`, apoi **Duplică** și redenumește `Prenume_Nume_A4_L03`. Astfel păstrezi partea I intactă.

### 2) Piese noi

| Piesă | Se conectează |
|-------|---------------|
| **PIR** | semnal **A2** · 5V · GND |
| **Buton armare** | pin **A3** și **GND** |
| **Buton ușă** | pin **9** și **GND** |
| **Servo ușă** | roșu 5V · negru GND · semnal **10** |
| **Piezo** | pin **13** și **GND** |
| **LED alarmă (roșu)** | pin **A4** → 220 Ω → anod · catod → GND |

Pinii sunt cei din tabelul din L2. **Nu mai atingi** pinii deja folosiți.

### 3) Ce adăugăm la program

| Funcție nouă | Ce face |
|--------------|---------|
| `alarma()` | citește butonul de armare, PIR, pornește sirena |
| `usa()` | la buton deschide ușa 3 secunde, apoi o închide (cu `millis()`) |
| `pagini()` | schimbă pagina de pe LCD |
| `mesajAlarma()` | afișează pe LCD „ARMAT” sau „INTRUS!” (rândul 2) |

### 4) Codul complet (I + II)

```cpp
#include <LiquidCrystal.h>
#include <Servo.h>

const int LUMINA = A0;
const int TEMP = A1;
const int PIR = A2;
const int BUTON_ARMARE = A3;
const int LED_ALARMA = A4;
const int LED_LAMPA = 7;
const int MOTOR = 6;
const int BUTON_PAGINA = 8;
const int BUZZER = 13;
const int PIN_USA = 10;
const int BUTON_USA = 9;

const int PRAG_APRINDE = 250;
const int PRAG_STINGE = 350;
const float T_MIN = 24.0;
const float T_MAX = 34.0;

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
Servo usaServo;

bool lampaAprinsa = false;
bool armat = false;
bool intrus = false;
bool usaDeschisa = false;
int pagina = 0;
bool pagAnterior = false;
bool armAnterior = false;
unsigned long ultimaAfisare = 0;
unsigned long deschisaLa = 0;

float temperatura() {
  float volti = analogRead(TEMP) * 5.0 / 1023.0;
  return (volti - 0.5) * 100.0;
}

void lampa() {
  int lumina = analogRead(LUMINA);
  if (!lampaAprinsa && lumina < PRAG_APRINDE) lampaAprinsa = true;
  if (lampaAprinsa && lumina > PRAG_STINGE) lampaAprinsa = false;
  digitalWrite(LED_LAMPA, lampaAprinsa);
}

void ventilator() {
  float t = temperatura();
  int viteza = map((int)t, (int)T_MIN, (int)T_MAX, 0, 255);
  analogWrite(MOTOR, constrain(viteza, 0, 255));
}

void alarma() {
  bool apasat = (digitalRead(BUTON_ARMARE) == LOW);
  if (apasat && !armAnterior) {
    armat = !armat;
    intrus = false;
    noTone(BUZZER);
  }
  armAnterior = apasat;

  if (armat && digitalRead(PIR) == HIGH) {
    intrus = true;
  }

  digitalWrite(LED_ALARMA, armat);

  if (intrus) {
    tone(BUZZER, 900 + (millis() / 5) % 600);
  }
}

void pagini() {
  bool apasat = (digitalRead(BUTON_PAGINA) == LOW);
  if (apasat && !pagAnterior) {
    pagina = (pagina + 1) % 2;
    lcd.clear();
  }
  pagAnterior = apasat;
}

void usa() {
  if (!usaDeschisa && digitalRead(BUTON_USA) == LOW) {
    usaDeschisa = true;
    deschisaLa = millis();
    usaServo.write(90);
  }
  if (usaDeschisa && millis() - deschisaLa >= 3000) {
    usaDeschisa = false;
    usaServo.write(0);
  }
}

void afiseaza() {
  if (millis() - ultimaAfisare < 400) return;
  ultimaAfisare = millis();

  lcd.setCursor(0, 0);
  if (pagina == 0) {
    lcd.print("Temp: ");
    lcd.print(temperatura(), 1);
    lcd.print(" C   ");
  } else {
    lcd.print("Lampa: ");
    lcd.print(lampaAprinsa ? "ON " : "OFF");
    lcd.print("       ");
  }

  lcd.setCursor(0, 1);
  if (intrus) {
    lcd.print("!!! INTRUS !!!  ");
  } else if (armat) {
    lcd.print("Alarma: ARMAT   ");
  } else {
    lcd.print("Alarma: oprita  ");
  }
}

void setup() {
  pinMode(LED_LAMPA, OUTPUT);
  pinMode(MOTOR, OUTPUT);
  pinMode(LED_ALARMA, OUTPUT);
  pinMode(PIR, INPUT);
  pinMode(BUTON_ARMARE, INPUT_PULLUP);
  pinMode(BUTON_PAGINA, INPUT_PULLUP);
  pinMode(BUTON_USA, INPUT_PULLUP);
  usaServo.attach(PIN_USA);
  usaServo.write(0);
  lcd.begin(16, 2);
  lcd.print("Casa inteligenta");
  delay(1000);
  lcd.clear();
}

void loop() {
  pagini();
  usa();
  lampa();
  ventilator();
  alarma();
  afiseaza();
  delay(30);
}
```

**Idei importante**

- `loop()` apelează toate funcțiile, **fără `delay` lung**, deci toate sistemele „merg în paralel”.  
- `intrus` ține minte că s-a declanșat alarma, chiar dacă omul pleacă; se oprește doar la **dezarmare**.  
- Sirena schimbă tonul după `millis()`: `900 + (millis() / 5) % 600` urcă între 900 și 1500 Hz.

- Ușa folosește aceeași idee ca bariera din Modulul 3: o stare (`usaDeschisa`) și `millis()` pentru cele 3 secunde, fără `delay`.

### 5) Test integrat

| Scenariu | Ce vezi |
|----------|---------|
| Noapte + cald | lampa ON și ventilator pornit |
| Armezi, miști obiectul | sirenă + „!!! INTRUS !!!” |
| Dezarmezi | liniște, LED alarmă stins |
| Buton pagină | LCD arată altă informație pe rândul 1 |
| Buton ușă | servo la 90°, după 3 s revine |

---

## Greșeli frecvente
1. **Merge partea I, dar nu partea II** — ai redenumit circuitul fără să-l duplici.  
2. **Conflict de pini** — două piese pe același pin (verifică tabelul).  
3. **Sirena se aude mereu** — `intrus` nu se resetează la dezarmare.  
4. **Alarmă fără armare** — lipsește `armat &&` în condiție.  
5. **Programul se „blochează”** — un `delay` lung într-o funcție.

---

## De făcut azi — „Casa mea II”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Alarmă PIR cu armare și sirenă |
| **Complet** | Minim + ușa servo + LED alarmă + mesaje pe LCD |

### Pasul 1 — Minim
- [ ] PIR, buton armare, sirenă  

### Pasul 2 — Complet
- [ ] Mesaje „ARMAT” / „INTRUS”  
- [ ] Ușa se deschide 3 secunde cu `millis()` (buton pe pin 9)  
- [ ] Numele `A4_L03` e corect

---

## Bonus
- [ ] Un cod secret (tastatura din M3 L8) care dezarmează alarma  
- [ ] Lampa se aprinde **și** la mișcare, nu doar la întuneric

## Recapitulare rapidă
1. Extinde un proiect existent în pași mici  
2. Funcții separate = cod ușor de schimbat  
3. Starea sistemului = variabile globale  
4. Testează fiecare scenariu

## Pe placa reală *(opțional)*
Pentru o casă reală, alarma ar trimite și o notificare (SMS, Wi-Fi). Pe Arduino Uno nu avem Wi-Fi; se folosesc plăci ca ESP32.

## Quiz scurt
- De ce nu folosim `delay` lung în funcții?  
- Ce reține variabila `intrus`?  
- Ce se întâmplă dacă armezi când PIR e deja `HIGH`?

## Temă
Fă o listă cu 5 lucruri pe care le-ai mai adăuga casei tale (ex. senzor de fum).
