# Lecția 1 — Ecranul LCD
**Modulul 3 · Afișaj și mișcare**  
**Code Kids Play · Display Maker**

> Azi Arduino începe să **scrie** pe un ecran LCD 16×2, nu doar în Serial Monitor.  
> Proiect: **„Cartea mea de vizită”** · `Prenume_Nume_A3_L01`

---

## Obiectiv
La finalul orei ai un ecran care afișează mesaje pe două rânduri.  
**Minim:** „Salut!” pe primul rând și numele tău pe al doilea.  
**Complet:** Minim + un **contor** care crește în timp real + un **caracter propriu** (o inimioară).

## De ce contează
Ecranele sunt peste tot: cuptoare, aparate de cafea, mașini. Un LCD îți permite să construiești proiecte care **vorbesc** fără calculator.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap Modulul 2 · de ce un ecran |
| 10–40 | Conexiunile LCD (cele mai multe fire de până acum) |
| 40–70 | Primul text |
| 70–105 | Contor + caracter propriu |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **LCD 16 x 2** · Resistor 220 Ω · Potentiometer (opțional, contrast) · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A3_L01`

### 2) Conexiuni
LCD-ul are 16 pini. Conectezi **doar** cei din tabel. Pe Tinkercad, cursorul peste pin îi arată numele.

| Pin LCD | Se conectează |
|---------|---------------|
| **VSS** | GND |
| **VDD** | 5V |
| **V0** (contrast) | GND (sau mijlocul unui potențiometru, ca să reglezi contrastul) |
| **RS** | pin **12** |
| **RW** | GND |
| **E** | pin **11** |
| **D4** | pin **5** |
| **D5** | pin **4** |
| **D6** | pin **3** |
| **D7** | pin **2** |
| **A** (lumina de fundal +) | 5V printr-un rezistor de 220 Ω |
| **K** (lumina de fundal −) | GND |

D0–D3 rămân **neconectați**: folosim modul cu **4 fire de date** (D4–D7), ca să economisim pini.

> Sfat: fă conexiunile pe rând și bifează-le. Sunt multe și o greșeală e greu de găsit.

### 3) Minim — primul text

```cpp
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);
  lcd.print("Salut!");
  lcd.setCursor(0, 1);
  lcd.print("Eu sunt Ana");
}

void loop() {
}
```

- `#include <LiquidCrystal.h>` aduce biblioteca pentru LCD.  
- `LiquidCrystal lcd(RS, E, D4, D5, D6, D7)` — ordinea pinilor **contează**.  
- `lcd.begin(16, 2)` = 16 coloane, 2 rânduri.  
- `lcd.setCursor(coloana, rând)` — numărătoarea începe de la **0**: `(0, 1)` e începutul rândului 2.  
- Textul apare o dată, deci `loop()` rămâne gol.

Pune numele tău în loc de „Ana”. Maximum **16 caractere** pe rând.

### 4) Contor în timp real

```cpp
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

int secunde = 0;

void setup() {
  lcd.begin(16, 2);
  lcd.print("Timp scurs:");
}

void loop() {
  lcd.setCursor(0, 1);
  lcd.print(secunde);
  lcd.print(" secunde   ");
  secunde++;
  delay(1000);
}
```

Spațiile de la sfârșitul lui `" secunde   "` **șterg** resturile unui text mai lung de la rularea anterioară (de exemplu când treci de la `10` la `9`, ar rămâne un caracter în plus).

### 5) Complet — caracter propriu
Fiecare caracter e o grilă de **5×8 puncte**. Poți desena unul tu: o inimioară.

```cpp
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

byte inima[8] = {
  B00000,
  B01010,
  B11111,
  B11111,
  B01110,
  B00100,
  B00000,
  B00000
};

int secunde = 0;

void setup() {
  lcd.begin(16, 2);
  lcd.createChar(0, inima);
  lcd.print("Salut! ");
  lcd.write(byte(0));
}

void loop() {
  lcd.setCursor(0, 1);
  lcd.print(secunde);
  lcd.print(" secunde   ");
  secunde++;
  delay(1000);
}
```

- Fiecare linie `B01010` are 5 biți: `1` = punct aprins, `0` = stins.  
- `createChar(0, inima)` salvează desenul în locul **0** (poți avea până la 8).  
- `lcd.write(byte(0))` îl afișează.

Desenează pe o grilă din caiet și schimbă `inima` într-un **zâmbet**, o **stea** sau un **robot**.

### 6) Comenzi utile

| Comandă | Ce face |
|---------|---------|
| `lcd.clear()` | șterge tot ecranul |
| `lcd.setCursor(c, r)` | mută cursorul |
| `lcd.print(x)` | scrie text sau număr |
| `lcd.noDisplay()` / `lcd.display()` | ascunde / arată textul |
| `lcd.scrollDisplayLeft()` | mută textul spre stânga |

---

## Greșeli frecvente
1. **Ecran gol, dar pornit** — contrastul: V0 trebuie la GND (sau potențiometru).  
2. **Pătrate pline pe primul rând** — LCD-ul nu a fost inițializat sau ordinea pinilor din cod e greșită.  
3. **Caractere ciudate** — un fir de date (D4–D7) e la alt pin.  
4. **Text tăiat** — ai trecut de 16 caractere.  
5. **Rămân cifre vechi** — lipsesc spațiile de la sfârșit sau `lcd.clear()`.

---

## De făcut azi — „Cartea mea de vizită”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Două rânduri de text pe LCD |
| **Complet** | Minim + contor + caracter propriu |

### Pasul 1 — Minim
- [ ] LCD conectat conform tabelului  
- [ ] „Salut!” și numele tău  

### Pasul 2 — Complet
- [ ] Contorul merge fără cifre rămase  
- [ ] Un caracter desenat de tine  
- [ ] Numele `A3_L01` e corect

---

## Bonus
- [ ] Textul **defilează** de la dreapta la stânga cu `scrollDisplayLeft()`  
- [ ] Afișează valoarea unui potențiometru, pe LCD

## Recapitulare rapidă
1. `LiquidCrystal lcd(12, 11, 5, 4, 3, 2)` — ordine: RS, E, D4–D7  
2. `setCursor(coloană, rând)` începe de la 0  
3. `print` scrie, `clear` șterge  
4. `createChar` + `write` pentru desene proprii

## Pe placa reală *(opțional)*
Un LCD 16×2 fizic are aceiași 16 pini. Mulți au și un modul **I2C** care reduce firele la 4 (folosește biblioteca `LiquidCrystal_I2C`). Pentru simulator rămânem la varianta cu 6 fire.

## Quiz scurt
- Câte rânduri și coloane are LCD-ul?  
- Ce face `lcd.setCursor(0, 1)`?  
- De ce punem spații la sfârșitul textului?

## Temă
Desenează pe grilă 5×8 trei caractere noi (ex. soare, floare, săgeată) și notează codul `B…` pentru ele.
