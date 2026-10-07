# Lecția 5 — Cronometru de joc
**Modulul 4 · Proiecte complete**  
**Code Kids Play · Arduino Creator**

> Azi construiești un **cronometru** cu LCD, pornire, oprire, tur și un mod „numărătoare inversă” pentru jocuri de societate. Totul cu `millis()`.  
> Proiect: **„Cronometrul meu”** · `Prenume_Nume_A4_L05`

---

## Obiectiv
La finalul orei ai un cronometru precis, controlat cu două butoane.  
**Minim:** start / stop și afișare `minute:secunde` pe LCD.  
**Complet:** Minim + **reset** + **tur** (lap) + **mod numărătoare inversă** de 30 de secunde cu buzzer.

## De ce contează
`delay()` **oprește** programul. Cu `millis()` placa poate număra timpul **și** citi butoane **și** actualiza ecranul în același timp. E cea mai importantă tehnică din proiectele mari.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4 · `millis()` |
| 10–25 | Conexiuni |
| 25–65 | Cronometru simplu |
| 65–105 | Tur, reset, numărătoare inversă |
| 105–120 | Test, recap, galerie |

**Componente azi:** Arduino Uno · Breadboard · LCD 16 x 2 · 2 × Pushbutton · Piezo · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A4_L05`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **LCD** | RS 12, E 11, D4 5, D5 4, D6 3, D7 2 (restul ca în L4) |
| **Buton A (Start/Stop)** | pin **7** și **GND** |
| **Buton B (Tur/Reset)** | pin **8** și **GND** |
| **Piezo** | pin **13** și **GND** |

### 3) Ideea
Un cronometru nu „numără”, ci **își amintește** momentul de start și calculează diferența:

```
timp scurs = millis() - momentStart
```

Când îl oprești, salvezi timpul. Când îl repornești, **ajustezi** momentul de start, ca să continue de unde a rămas.

### 4) Funcția de afișare
Transformă milisecunde în `MM:SS.d` (minute, secunde, zecimi):

```cpp
void afiseazaTimp(unsigned long ms) {
  unsigned long totalSecunde = ms / 1000;
  unsigned int minute = totalSecunde / 60;
  unsigned int secunde = totalSecunde % 60;
  unsigned int zecimi = (ms % 1000) / 100;

  if (minute < 10) lcd.print('0');
  lcd.print(minute);
  lcd.print(':');
  if (secunde < 10) lcd.print('0');
  lcd.print(secunde);
  lcd.print('.');
  lcd.print(zecimi);
}
```

- `/` e împărțirea întreagă, `%` e restul.  
- Pentru `75 300 ms`: `totalSecunde = 75`, `minute = 1`, `secunde = 15`, `zecimi = 3` → `01:15.3`.  
- Cifra `0` din față o punem manual dacă numărul e sub 10.

### 5) Minim — start / stop

```cpp
#include <LiquidCrystal.h>

const int BTN_A = 7;
const int BTN_B = 8;

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

bool ruleaza = false;
unsigned long start = 0;
unsigned long acumulat = 0;
bool aAnterior = false;

void afiseazaTimp(unsigned long ms) {
  unsigned long totalSecunde = ms / 1000;
  unsigned int minute = totalSecunde / 60;
  unsigned int secunde = totalSecunde % 60;
  unsigned int zecimi = (ms % 1000) / 100;

  if (minute < 10) lcd.print('0');
  lcd.print(minute);
  lcd.print(':');
  if (secunde < 10) lcd.print('0');
  lcd.print(secunde);
  lcd.print('.');
  lcd.print(zecimi);
}

void setup() {
  pinMode(BTN_A, INPUT_PULLUP);
  pinMode(BTN_B, INPUT_PULLUP);
  lcd.begin(16, 2);
  lcd.print("Cronometru");
}

void loop() {
  bool a = (digitalRead(BTN_A) == LOW);

  if (a && !aAnterior) {
    if (ruleaza) {
      acumulat += millis() - start;
      ruleaza = false;
    } else {
      start = millis();
      ruleaza = true;
    }
  }
  aAnterior = a;

  unsigned long timp = acumulat;
  if (ruleaza) timp += millis() - start;

  lcd.setCursor(0, 1);
  afiseazaTimp(timp);
  delay(50);
}
```

**Cum merge**

- `acumulat` = timpul deja „strâns” în rulările anterioare.  
- La **stop**: adăugăm la `acumulat` cât a rulat.  
- La **start**: notăm `start = millis()`.  
- Timpul afișat = `acumulat` (+ cât rulează acum, dacă e pornit).

### 6) Complet — tur, reset, numărătoare inversă

Butonul **B**: dacă rulează → **tur** (salvează timpul pe rândul de sus); dacă e oprit → **reset**. Ținut apăsat peste 1,5 secunde, schimbă **modul** (cronometru ↔ numărătoare inversă de 30 s).

```cpp
#include <LiquidCrystal.h>

const int BTN_A = 7;
const int BTN_B = 8;
const int BUZZER = 13;
const unsigned long DURATA_INVERSA = 30000;

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

bool ruleaza = false;
bool modInvers = false;
bool sunat = false;
unsigned long start = 0;
unsigned long acumulat = 0;
unsigned long tur = 0;
unsigned long bApasatDe = 0;
bool aAnterior = false;
bool bAnterior = false;

void afiseazaTimp(unsigned long ms) {
  unsigned long totalSecunde = ms / 1000;
  unsigned int minute = totalSecunde / 60;
  unsigned int secunde = totalSecunde % 60;
  unsigned int zecimi = (ms % 1000) / 100;

  if (minute < 10) lcd.print('0');
  lcd.print(minute);
  lcd.print(':');
  if (secunde < 10) lcd.print('0');
  lcd.print(secunde);
  lcd.print('.');
  lcd.print(zecimi);
}

unsigned long timpScurs() {
  unsigned long timp = acumulat;
  if (ruleaza) timp += millis() - start;
  return timp;
}

void reset() {
  ruleaza = false;
  acumulat = 0;
  tur = 0;
  sunat = false;
  lcd.clear();
}

void setup() {
  pinMode(BTN_A, INPUT_PULLUP);
  pinMode(BTN_B, INPUT_PULLUP);
  lcd.begin(16, 2);
  reset();
}

void loop() {
  bool a = (digitalRead(BTN_A) == LOW);
  bool b = (digitalRead(BTN_B) == LOW);

  if (a && !aAnterior) {
    if (ruleaza) {
      acumulat += millis() - start;
      ruleaza = false;
    } else {
      start = millis();
      ruleaza = true;
    }
  }

  if (b && !bAnterior) {
    bApasatDe = millis();
  }
  if (!b && bAnterior) {
    if (millis() - bApasatDe >= 1500) {
      modInvers = !modInvers;
      reset();
    } else if (ruleaza) {
      tur = timpScurs();
    } else {
      reset();
    }
  }
  aAnterior = a;
  bAnterior = b;

  unsigned long timp = timpScurs();

  lcd.setCursor(0, 0);
  lcd.print(modInvers ? "INVERS " : "CHRONO ");
  if (tur > 0) {
    lcd.print("T:");
    afiseazaTimp(tur);
  } else {
    lcd.print("         ");
  }

  lcd.setCursor(0, 1);
  if (modInvers) {
    unsigned long ramas = (timp >= DURATA_INVERSA) ? 0 : DURATA_INVERSA - timp;
    afiseazaTimp(ramas);
    lcd.print("        ");

    if (ramas == 0 && ruleaza && !sunat) {
      sunat = true;
      tone(BUZZER, 1500, 1000);
    }
  } else {
    afiseazaTimp(timp);
    lcd.print("        ");
  }
  delay(50);
}
```

| Acțiune | Efect |
|---------|-------|
| A | pornește / oprește |
| B (scurt, cât rulează) | **tur** — notează timpul |
| B (scurt, oprit) | **reset** |
| B (lung, 1,5 s) | schimbă modul |
| Numărătoare inversă | sună la 00:00.0 |

---

## Greșeli frecvente
1. **Timpul „sare”** — folosești `int` în loc de `unsigned long` pentru `millis()`.  
2. **Pornește de la 0 de fiecare dată** — nu adaugi la `acumulat` la stop.  
3. **Ecranul clipește** — `lcd.clear()` la fiecare rundă; clear doar la reset.  
4. **Cifre rămase** — nu ai spații după timp.  
5. **Butonul acționează de mai multe ori** — lipsește detecția frontului.

---

## De făcut azi — „Cronometrul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Start / stop + `MM:SS.d` |
| **Complet** | Minim + tur + reset + numărătoare inversă + buzzer |

### Pasul 1 — Minim
- [ ] `acumulat` + `start` funcționează  
- [ ] Format cu zero în față  

### Pasul 2 — Complet
- [ ] Tur și reset  
- [ ] Mod invers cu sunet  
- [ ] Numele `A4_L05` e corect

---

## Bonus
- [ ] Mai multe ture (ține ultimele 3 într-un tablou)  
- [ ] Numărătoarea inversă durează cât alegi tu, cu un potențiometru (10–120 s)

## Recapitulare rapidă
1. `millis()` = ceasul intern; nu blochează  
2. `timp = acumulat + (millis() − start)` când rulează  
3. `unsigned long` pentru timp  
4. Fără `delay` lung, totul rămâne receptiv

## Pe placa reală *(opțional)*
Pentru timp foarte precis (secunde pe zi) se folosește un modul **RTC** (ceas de timp real, ex. DS3231). Placa Arduino își pierde puțin precizie în timp.

## Quiz scurt
- De ce `unsigned long` pentru `millis()`?  
- Ce reține variabila `acumulat`?  
- Ce afișează formula pentru 125 000 ms?

## Temă
Alege un joc de societate și gândește-te la ce fel de cronometru ar avea nevoie (de ex. șah, Activity).
