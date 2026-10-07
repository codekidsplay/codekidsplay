# Lecția 2 — Panou de informații
**Modulul 3 · Afișaj și mișcare**  
**Code Maker Club · Display Maker**

> Azi transformi LCD-ul într-un **panou** care schimbă pagini la apăsarea unui buton: temperatura, lumina și un mesaj.  
> Proiect: **„Panoul meu”** · `Prenume_Nume_A3_L02`

---

## Obiectiv
La finalul orei ai un panou cu mai multe **pagini** pe LCD.  
**Minim:** TMP36 → temperatura pe LCD, actualizată la fiecare secundă.  
**Complet:** Minim + **3 pagini** (temperatură, lumină, mesaj) schimbate cu un **buton**, fără clipiri.

## De ce contează
Aproape orice aparat cu ecran are **meniuri sau pagini**. Azi înveți să ții evidența paginii curente și să desenezi doar ce trebuie.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1 · LCD |
| 10–25 | Conexiuni (LCD ca în L1 + senzori) |
| 25–55 | Temperatura pe LCD |
| 55–105 | 3 pagini cu buton |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · LCD 16 x 2 · TMP36 · Photoresistor · Resistor 10 kΩ · Pushbutton · Resistor 220 Ω · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A3_L02`

### 2) Conexiuni
LCD-ul rămâne conectat **exact ca în L1** (RS 12, E 11, D4 5, D5 4, D6 3, D7 2). Adaugi:

| Piesă | Se conectează |
|-------|---------------|
| **TMP36** | 5V · semnal **A1** · GND |
| **Fotorezistor** | 5V → fotorezistor → **A0** → 10 kΩ → GND |
| **Buton** | pin **7** și **GND** (diagonal) |

### 3) Minim — temperatura pe LCD

```cpp
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);
  lcd.print("Temperatura:");
}

void loop() {
  float volti = analogRead(A1) * 5.0 / 1023.0;
  float grade = (volti - 0.5) * 100.0;

  lcd.setCursor(0, 1);
  lcd.print(grade, 1);
  lcd.print(" C    ");
  delay(1000);
}
```

`lcd.print(grade, 1)` afișează cu o zecimală, ca la `Serial.print`.

### 4) Pagini cu buton
Ținem minte pagina curentă într-o variabilă. Butonul o crește (`0 → 1 → 2 → 0 ...`) cu operatorul **modulo** `%`.

```cpp
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int BUTON = 7;
const int NR_PAGINI = 3;

int pagina = 0;
bool butonAnterior = false;

float temperatura() {
  float volti = analogRead(A1) * 5.0 / 1023.0;
  return (volti - 0.5) * 100.0;
}

void deseneazaPagina() {
  lcd.clear();
  if (pagina == 0) {
    lcd.print("Temperatura:");
    lcd.setCursor(0, 1);
    lcd.print(temperatura(), 1);
    lcd.print(" C");
  } else if (pagina == 1) {
    lcd.print("Lumina:");
    lcd.setCursor(0, 1);
    lcd.print(map(analogRead(A0), 0, 1023, 0, 100));
    lcd.print(" %");
  } else {
    lcd.print("Salut, prieteni!");
    lcd.setCursor(0, 1);
    lcd.print("Arduino e super!");
  }
}

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  lcd.begin(16, 2);
  deseneazaPagina();
}

void loop() {
  bool apasat = (digitalRead(BUTON) == LOW);

  if (apasat && !butonAnterior) {
    pagina = (pagina + 1) % NR_PAGINI;
    deseneazaPagina();
  }
  butonAnterior = apasat;
  delay(30);
}
```

**Ce e nou**

- `%` (modulo) = **restul împărțirii**. `(2 + 1) % 3 = 0`, deci după ultima pagină revii la prima.  
- Schimbăm pagina doar pe **front** (când butonul tocmai a fost apăsat), ca în L8 din Modulul 2.  
- `deseneazaPagina()` e o funcție, deci desenul e într-un singur loc.

### 5) Complet — valori vii, fără clipiri
Cu codul de mai sus, temperatura se afișează o dată și rămâne neschimbată. Vrem să **o actualizăm**, dar **fără `lcd.clear()` la fiecare rundă** (care face ecranul să clipească). Redesenăm doar rândul 2:

```cpp
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int BUTON = 7;
const int NR_PAGINI = 3;

int pagina = 0;
bool butonAnterior = false;
unsigned long ultimaActualizare = 0;

float temperatura() {
  float volti = analogRead(A1) * 5.0 / 1023.0;
  return (volti - 0.5) * 100.0;
}

void titlu() {
  lcd.clear();
  if (pagina == 0) lcd.print("Temperatura:");
  else if (pagina == 1) lcd.print("Lumina:");
  else lcd.print("Salut, prieteni!");
}

void valoare() {
  lcd.setCursor(0, 1);
  if (pagina == 0) {
    lcd.print(temperatura(), 1);
    lcd.print(" C       ");
  } else if (pagina == 1) {
    lcd.print(map(analogRead(A0), 0, 1023, 0, 100));
    lcd.print(" %       ");
  } else {
    lcd.print("Arduino e super!");
  }
}

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  lcd.begin(16, 2);
  titlu();
  valoare();
}

void loop() {
  bool apasat = (digitalRead(BUTON) == LOW);

  if (apasat && !butonAnterior) {
    pagina = (pagina + 1) % NR_PAGINI;
    titlu();
    valoare();
  }
  butonAnterior = apasat;

  if (millis() - ultimaActualizare >= 500) {
    ultimaActualizare = millis();
    valoare();
  }
  delay(30);
}
```

- `titlu()` se apelează **doar la schimbarea paginii**.  
- `valoare()` se apelează la **fiecare 500 ms**.  
- Spațiile de la sfârșit șterg resturile.

---

## Greșeli frecvente
1. **Ecranul clipește** — `lcd.clear()` în `loop` la fiecare rundă.  
2. **Pagina sare peste mai multe** — numeri tot timpul cât e apăsat, nu doar frontul.  
3. **Rămân cifre vechi** — lipsesc spațiile.  
4. **Temperatura mereu la fel** — `valoare()` nu e apelată periodic.  
5. **Eroare la compilare** — ai omis `;` după `lcd.print(...)` sau acolade.

---

## De făcut azi — „Panoul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Temperatura pe LCD |
| **Complet** | 3 pagini cu buton, valori actualizate, fără clipiri |

### Pasul 1 — Minim
- [ ] Temperatura se actualizează  

### Pasul 2 — Complet
- [ ] 3 pagini cu modulo  
- [ ] Titlu separat de valoare  
- [ ] Numele `A3_L02` e corect

---

## Bonus
- [ ] A patra pagină: **minim/maxim** de temperatură  
- [ ] A doua apăsare **lungă** (peste 1 secundă) revine la prima pagină

## Recapitulare rapidă
1. Păstrăm **pagina curentă** într-o variabilă  
2. `%` face ciclul `0 → 1 → 2 → 0`  
3. `clear` doar la schimbarea paginii  
4. `millis()` pentru actualizări periodice

## Pe placa reală *(opțional)*
Un meniu pe LCD se face la fel, dar de obicei cu 2–3 butoane (sus, jos, OK).

## Quiz scurt
- Ce rezultat are `5 % 3`?  
- De ce nu punem `lcd.clear()` în `loop` la fiecare rundă?  
- Ce înseamnă „front” la un buton?

## Temă
Desenează pe hârtie 3 pagini ale panoului tău (ce text, ce valoare) pentru un produs real (ex. frigider).
