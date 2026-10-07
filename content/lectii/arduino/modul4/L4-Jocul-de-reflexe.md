# Lecția 4 — Jocul de reflexe
**Modulul 4 · Proiecte complete**  
**Code Kids Play · Arduino Creator**

> Azi construiești un **joc**: un LED se aprinde la un moment imprevizibil, iar tu trebuie să apeși cât mai repede. Arduino îți măsoară reflexele în **milisecunde**.  
> Proiect: **„Reflexe de campion”** · `Prenume_Nume_A4_L04`

---

## Obiectiv
La finalul orei ai un joc cu scor, record și 5 runde.  
**Minim:** LED care se aprinde după o pauză aleatorie; măsori timpul de reacție și îl afișezi pe LCD.  
**Complet:** Minim + **detecție „start greșit”** (apeși prea devreme) + **5 runde** cu medie + **record** + sunete.

## De ce contează
Jocurile electronice sunt făcute din aceleași ingrediente: **timp**, **aleatoriu**, **reguli** și **scor**. Azi le folosești pe toate.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 · starea unui sistem |
| 10–25 | Conexiuni |
| 25–60 | Runda simplă |
| 60–105 | Reguli, 5 runde, record |
| 105–120 | Joc, recap, galerie |

**Componente azi:** Arduino Uno · Breadboard · LCD 16 x 2 · LED verde · Resistor 220 Ω · Pushbutton · Piezo · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A4_L04`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **LCD** | RS 12, E 11, D4 5, D5 4, D6 3, D7 2; VSS/RW/V0/K la GND; VDD și A (cu 220 Ω) la 5V |
| **LED verde** | pin **7** → 220 Ω → anod · catod → GND |
| **Buton** | pin **8** și **GND** |
| **Piezo** | pin **13** și **GND** |

### 3) Reguli
1. Pe ecran: „Pregateste-te...”.  
2. După o pauză **aleatorie** (1–4 secunde), LED-ul se aprinde.  
3. Apeși cât mai repede. Arduino afișează timpul de reacție.  
4. Dacă apeși **înainte** să se aprindă LED-ul: „Start gresit!”.

### 4) Minim — o singură rundă

```cpp
#include <LiquidCrystal.h>

const int LED = 7;
const int BUTON = 8;

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
  randomSeed(analogRead(A0));
  lcd.begin(16, 2);
}

void loop() {
  lcd.clear();
  lcd.print("Pregateste-te...");
  delay(random(1000, 4000));

  digitalWrite(LED, HIGH);
  unsigned long start = millis();

  while (digitalRead(BUTON) == HIGH) {
  }

  unsigned long timp = millis() - start;
  digitalWrite(LED, LOW);

  lcd.clear();
  lcd.print("Timp reactie:");
  lcd.setCursor(0, 1);
  lcd.print(timp);
  lcd.print(" ms");

  delay(3000);
}
```

- `randomSeed(analogRead(A0))` — pentru ca „aleatoriul” să nu fie la fel la fiecare pornire (A0 e liber, deci „zgomotos”).  
- `random(1000, 4000)` — număr între 1000 și 3999.  
- `while (digitalRead(BUTON) == HIGH) { }` — așteaptă **cât timp** butonul nu e apăsat.  
- `millis() - start` — timpul scurs de când s-a aprins LED-ul.

### 5) Complet — 5 runde, start greșit, record
Folosim funcții și variabile globale:

```cpp
#include <LiquidCrystal.h>

const int LED = 7;
const int BUTON = 8;
const int BUZZER = 13;
const int RUNDE = 5;

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

long record = 9999;

void mesaj(String sus, String jos) {
  lcd.clear();
  lcd.print(sus);
  lcd.setCursor(0, 1);
  lcd.print(jos);
}

void asteaptaEliberare() {
  while (digitalRead(BUTON) == LOW) {
  }
  delay(50);
}

long runda() {
  mesaj("Pregateste-te...", "");
  unsigned long pauza = random(1000, 4000);
  unsigned long incepe = millis();

  while (millis() - incepe < pauza) {
    if (digitalRead(BUTON) == LOW) {
      tone(BUZZER, 200, 400);
      mesaj("Start gresit!", "Mai incearca");
      delay(1500);
      asteaptaEliberare();
      return -1;
    }
  }

  digitalWrite(LED, HIGH);
  tone(BUZZER, 1000, 80);
  unsigned long start = millis();

  while (digitalRead(BUTON) == HIGH) {
  }

  long timp = millis() - start;
  digitalWrite(LED, LOW);
  return timp;
}

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
  randomSeed(analogRead(A0));
  lcd.begin(16, 2);
}

void loop() {
  mesaj("Reflexe de", "campion!");
  delay(1500);
  mesaj("Apasa butonul", "pentru start");
  while (digitalRead(BUTON) == HIGH) {
  }
  asteaptaEliberare();

  long suma = 0;
  int valide = 0;

  while (valide < RUNDE) {
    long timp = runda();
    if (timp < 0) continue;

    valide++;
    suma += timp;

    mesaj("Runda " + String(valide) + "/" + String(RUNDE), String(timp) + " ms");
    delay(1500);
    asteaptaEliberare();
  }

  long medie = suma / RUNDE;

  if (medie < record) {
    record = medie;
    tone(BUZZER, 1500, 500);
    mesaj("NOU RECORD!", String(medie) + " ms");
  } else {
    mesaj("Medie: " + String(medie), "Record: " + String(record));
  }
  delay(5000);
}
```

**Idei noi**

- `long runda()` **returnează** timpul sau `-1` dacă a fost start greșit. `-1` e un semnal special.  
- `continue;` sare la următoarea rundă fără să o numere.  
- `"Runda " + String(valide)` — lipim text cu numere.  
- `record` rămâne în memorie cât timp e placa pornită.

### 6) Cum arată reflexele tale

| Timp mediu | Ce înseamnă |
|------------|-------------|
| sub 200 ms | super-rapid |
| 200–300 ms | foarte bun |
| 300–450 ms | normal |
| peste 450 ms | mai încearcă |

---

## Greșeli frecvente
1. **Timpul e mereu 0** — butonul era deja apăsat; `asteaptaEliberare()` rezolvă.  
2. **Pauza e mereu aceeași** — lipsește `randomSeed`.  
3. **Scorul nu se actualizează** — `record` e declarat în `loop`, nu global.  
4. **Ecranul clipește** — `mesaj()` apelat prea des.  
5. **Rundele nu se termină** — „start greșit” numără ca rundă; folosește `continue`.

---

## De făcut azi — „Reflexe de campion”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | O rundă cu timp afișat |
| **Complet** | Minim + start greșit + 5 runde + medie + record |

### Pasul 1 — Minim
- [ ] LED + buton + LCD  
- [ ] Timpul se afișează  

### Pasul 2 — Complet
- [ ] „Start greșit” funcționează  
- [ ] Medie din 5 runde  
- [ ] Record păstrat între partide  
- [ ] Numele `A4_L04` e corect

---

## Bonus
- [ ] Un al doilea LED (roșu) care **nu** trebuie apăsat  
- [ ] Dificultate: pauza se scurtează la fiecare rundă

## Recapitulare rapidă
1. `random` + `randomSeed` pentru imprevizibil  
2. `millis()` măsoară timpul de reacție  
3. O funcție poate returna `-1` ca semnal special  
4. Reguli + scor = joc

## Pe placa reală *(opțional)*
Butonul fizic poate avea „zgomot” (trepidații); `delay(50)` după apăsare ajută. Jocurile reale folosesc și o limită de timp.

## Quiz scurt
- De ce folosim `randomSeed(analogRead(A0))`?  
- Ce face `continue`?  
- Cum afli dacă cineva a apăsat prea devreme?

## Temă
Joacă-te cu 3 prieteni și notează media fiecăruia. Cine e cel mai rapid?
