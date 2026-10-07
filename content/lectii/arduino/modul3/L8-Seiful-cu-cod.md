# Lecția 8 — Seiful cu cod
**Modulul 3 · Afișaj și mișcare**  
**Code Maker Club · Display Maker**

> Azi construiești un **seif**: tastezi codul pe o **tastatură 4×4**, iar LCD-ul, servo-ul și LED-urile îți spun dacă s-a deschis.  
> Proiect: **„Seiful meu”** · `Prenume_Nume_A3_L08`

---

## Obiectiv
La finalul orei ai un seif care se deschide doar cu codul corect.  
**Minim:** introduci 4 cifre; dacă sunt corecte, LED verde, altfel LED roșu.  
**Complet:** Minim + **LCD** cu stelute (`****`) + **servo** care deschide „ușa” + **3 încercări**, apoi blocare + tasta `*` șterge, `#` confirmă.

## De ce contează
Parolele, PIN-urile și lacătele electronice funcționează așa: **compari ce a tastat cineva cu ce știi tu** și decizi. Azi pui laolaltă tot ce ai învățat: LCD, servo, LED-uri, funcții și stări.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7 · parole, de ce contează |
| 10–35 | Conexiuni (tastatură + LCD) |
| 35–65 | Citirea tastelor, comparare cod |
| 65–105 | LCD, servo, încercări |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **Keypad 4 x 4** · LCD 16 x 2 · Micro Servo · LED verde · LED roșu · 2 × Resistor 220 Ω · Piezo · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A3_L08`

### 2) Conexiuni
Sunt multe, deci mergi pe rând.

**LCD** (ca în L1):

| Pin LCD | Arduino |
|---------|---------|
| RS · E | **12** · **11** |
| D4 · D5 · D6 · D7 | **5** · **4** · **3** · **2** |
| VSS · RW · V0 · K | GND |
| VDD · A (cu 220 Ω) | 5V |

**Tastatură** (8 pini: 4 rânduri R1–R4 și 4 coloane C1–C4; în Tinkercad sunt etichetați):

| Pin tastatură | Arduino |
|---------------|---------|
| R1 · R2 · R3 · R4 | **6** · **7** · **8** · **9** |
| C1 · C2 · C3 · C4 | **A0** · **A1** · **A2** · **A3** |

**Restul:**

| Piesă | Se conectează |
|-------|---------------|
| **Servo** | roșu 5V · negru GND · semnal pin **10** |
| **LED verde** | pin **A4** → 220 Ω → anod · catod → GND |
| **LED roșu** | pin **A5** → 220 Ω → anod · catod → GND |
| **Piezo** | pin **13** și **GND** |

Pinii analogici A0–A5 pot fi folosiți și ca pini **digitali** obișnuiți.

### 3) Tastatura
Tastatura e o grilă. Biblioteca `Keypad` află ce tastă e apăsată verificând rândurile și coloanele:

```cpp
#include <Keypad.h>

const byte RANDURI = 4;
const byte COLOANE = 4;

char taste[RANDURI][COLOANE] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte pinRanduri[RANDURI] = {6, 7, 8, 9};
byte pinColoane[COLOANE] = {A0, A1, A2, A3};

Keypad tastatura = Keypad(makeKeymap(taste), pinRanduri, pinColoane, RANDURI, COLOANE);

void setup() {
  Serial.begin(9600);
}

void loop() {
  char tasta = tastatura.getKey();
  if (tasta) {
    Serial.println(tasta);
  }
}
```

- `getKey()` returnează tasta apăsată, sau `0` dacă nu e niciuna.  
- `if (tasta)` e adevărat doar când a fost apăsată o tastă.

### 4) Minim — cod de 4 cifre

```cpp
#include <Keypad.h>

const byte RANDURI = 4;
const byte COLOANE = 4;

char taste[RANDURI][COLOANE] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte pinRanduri[RANDURI] = {6, 7, 8, 9};
byte pinColoane[COLOANE] = {A0, A1, A2, A3};

Keypad tastatura = Keypad(makeKeymap(taste), pinRanduri, pinColoane, RANDURI, COLOANE);

const String COD = "1234";
const int VERDE = A4;
const int ROSU = A5;

String introdus = "";

void setup() {
  pinMode(VERDE, OUTPUT);
  pinMode(ROSU, OUTPUT);
}

void loop() {
  char tasta = tastatura.getKey();

  if (tasta) {
    introdus += tasta;

    if (introdus.length() == 4) {
      if (introdus == COD) {
        digitalWrite(VERDE, HIGH);
        delay(2000);
        digitalWrite(VERDE, LOW);
      } else {
        digitalWrite(ROSU, HIGH);
        delay(1000);
        digitalWrite(ROSU, LOW);
      }
      introdus = "";
    }
  }
}
```

- Un `String` păstrează ce a tastat utilizatorul; `introdus += tasta` **adaugă** o literă.  
- `introdus.length()` spune câte caractere sunt.  
- Comparăm cu `==`. După 4 cifre golim `introdus` (`= ""`).

### 5) Complet — seiful cu LCD, servo și încercări

```cpp
#include <Keypad.h>
#include <LiquidCrystal.h>
#include <Servo.h>

const byte RANDURI = 4;
const byte COLOANE = 4;

char taste[RANDURI][COLOANE] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte pinRanduri[RANDURI] = {6, 7, 8, 9};
byte pinColoane[COLOANE] = {A0, A1, A2, A3};

Keypad tastatura = Keypad(makeKeymap(taste), pinRanduri, pinColoane, RANDURI, COLOANE);
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
Servo broasca;

const String COD = "1234";
const int VERDE = A4;
const int ROSU = A5;
const int BUZZER = 13;
const int MAX_INCERCARI = 3;

String introdus = "";
int incercari = 0;

void mesaj(String sus, String jos) {
  lcd.clear();
  lcd.print(sus);
  lcd.setCursor(0, 1);
  lcd.print(jos);
}

void ecranIntrare() {
  lcd.clear();
  lcd.print("Introdu codul:");
  lcd.setCursor(0, 1);
  for (unsigned int i = 0; i < introdus.length(); i++) {
    lcd.print('*');
  }
}

void deschide() {
  mesaj("Cod corect!", "Seif deschis");
  digitalWrite(VERDE, HIGH);
  tone(BUZZER, 1500, 200);
  broasca.write(90);
  delay(3000);
  broasca.write(0);
  digitalWrite(VERDE, LOW);
  incercari = 0;
}

void gresit() {
  incercari++;
  digitalWrite(ROSU, HIGH);
  tone(BUZZER, 300, 600);

  if (incercari >= MAX_INCERCARI) {
    mesaj("BLOCAT!", "Asteapta 10 sec");
    delay(10000);
    incercari = 0;
  } else {
    mesaj("Cod gresit!", "Mai ai: " + String(MAX_INCERCARI - incercari));
    delay(1500);
  }
  digitalWrite(ROSU, LOW);
}

void setup() {
  pinMode(VERDE, OUTPUT);
  pinMode(ROSU, OUTPUT);
  lcd.begin(16, 2);
  broasca.attach(10);
  broasca.write(0);
  ecranIntrare();
}

void loop() {
  char tasta = tastatura.getKey();

  if (tasta) {
    if (tasta == '*') {
      introdus = "";
    } else if (tasta == '#') {
      if (introdus == COD) {
        deschide();
      } else {
        gresit();
      }
      introdus = "";
    } else if (introdus.length() < 8) {
      introdus += tasta;
    }
    ecranIntrare();
  }
}
```

| Tastă | Ce face |
|-------|---------|
| `0`–`9` | adaugă o cifră (apare `*` pe LCD) |
| `*` | șterge tot ce ai scris |
| `#` | confirmă codul |

**Idei noi**

- `mesaj(sus, jos)` e o funcție ajutătoare: afișează două rânduri.  
- `"Mai ai: " + String(...)` lipește un text cu un număr.  
- Ecranul arată **stelute**, nu cifrele, ca să nu fie văzut codul.  
- După 3 greșeli, seiful se **blochează** 10 secunde.

---

## Greșeli frecvente
1. **Taste greșite** — rândurile și coloanele sunt inversate la pini.  
2. **Nu citește nimic** — firele tastaturii nu sunt la pinii din `pinRanduri` / `pinColoane`.  
3. **Comparația eșuează** — codul din `COD` are alt format (`"1234"` e text, cu ghilimele).  
4. **LCD blocat** — pinii LCD se suprapun cu cei ai tastaturii.  
5. **Servo tremură** — lipsește GND comun.

---

## De făcut azi — „Seiful meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Cod de 4 cifre, LED verde / roșu |
| **Complet** | Minim + LCD cu stelute + servo + 3 încercări + `*` și `#` |

### Pasul 1 — Minim
- [ ] Tastatura citește tastele  
- [ ] Comparare cu codul tău  

### Pasul 2 — Complet
- [ ] LCD cu `*`  
- [ ] Servo deschide ușa  
- [ ] Blocare după 3 greșeli  
- [ ] Numele `A3_L08` e corect

---

## Bonus
- [ ] **Schimbarea codului:** cu tasta `A` introduci codul vechi, apoi cel nou  
- [ ] O parolă de **6 cifre**

## Recapitulare rapidă
1. `Keypad` + `getKey()` citește tastatura  
2. `String` păstrează ce a tastat utilizatorul  
3. Funcțiile `deschide()` / `gresit()` fac codul clar  
4. Un contor de încercări limitează ghicitul

## Pe placa reală *(opțional)*
Un seif real nu ține codul în text simplu în program și folosește un încuietor puternic. Aici învățăm principiul: **comparăm și decidem**.

## Quiz scurt
- Ce returnează `getKey()` dacă nu apeși nimic?  
- De ce afișăm `*` și nu cifrele?  
- Ce se întâmplă după 3 încercări greșite?

## Temă
Gândește-te la 3 locuri unde se folosește un cod PIN și ce ar trebui să se întâmple la 3 greșeli.
