# Lecția 6 — Oracolul cu zar
**Modulul 4 · Proiecte complete**  
**Code Maker Club · Arduino Creator**

> Azi construiești un **zar electronic** cu 7 LED-uri și un **oracol** care îți dă „răspunsuri” pe LCD.  
> Proiect: **„Oracolul”** · `Prenume_Nume_A4_L06`

---

## Obiectiv
La finalul orei ai un zar care „se rostogolește” și un oracol care răspunde la întrebări.  
**Minim:** buton care aruncă zarul; 7 LED-uri arată fața (1–6).  
**Complet:** Minim + **animație** de rostogolire + **sunet** + **LCD** cu numărul și un răspuns al oracolului după zar.

## De ce contează
Zarurile electronice sunt jocuri de **probabilitate**. Înveți și o tehnică foarte folosită: **tablouri de modele** (`array`), unde fiecare față a zarului e un rând dintr-un tabel.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 · `random` |
| 10–35 | Montăm cele 7 LED-uri ca pe un zar |
| 35–70 | Fețele zarului |
| 70–105 | Animație + oracol |
| 105–120 | Test, recap, galerie |

**Componente azi:** Arduino Uno · Breadboard · 7 × LED · 7 × Resistor 220 Ω · LCD 16 x 2 · Pushbutton · Piezo · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A4_L06`

### 2) Dispunerea LED-urilor
Pune cele 7 LED-uri ca pe un zar real:

```
 L0     L1
 L2  L3 L4
 L5     L6
```

Fiecare LED are propriul rezistor de 220 Ω și catodul la GND.

| LED | Poziție | Pin |
|-----|---------|-----|
| L0 | sus-stânga | **6** |
| L1 | sus-dreapta | **7** |
| L2 | mijloc-stânga | **8** |
| L3 | centru | **9** |
| L4 | mijloc-dreapta | **10** |
| L5 | jos-stânga | **A0** |
| L6 | jos-dreapta | **A1** |

| Piesă | Se conectează |
|-------|---------------|
| **Buton** | pin **A2** și **GND** |
| **Piezo** | pin **13** și **GND** |
| **LCD** | RS 12, E 11, D4 5, D5 4, D6 3, D7 2 |

### 3) Tabelul fețelor
Fiecare față = care LED-uri se aprind (`1` = aprins):

| Față | L0 | L1 | L2 | L3 | L4 | L5 | L6 |
|------|----|----|----|----|----|----|----|
| 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
| 2 | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| 3 | 1 | 0 | 0 | 1 | 0 | 0 | 1 |
| 4 | 1 | 1 | 0 | 0 | 0 | 1 | 1 |
| 5 | 1 | 1 | 0 | 1 | 0 | 1 | 1 |
| 6 | 1 | 1 | 1 | 0 | 1 | 1 | 1 |

### 4) Minim — zar simplu

```cpp
const int LEDURI[7] = {6, 7, 8, 9, 10, A0, A1};
const int BUTON = A2;

const byte FETE[7][7] = {
  {0, 0, 0, 0, 0, 0, 0},
  {0, 0, 0, 1, 0, 0, 0},
  {1, 0, 0, 0, 0, 0, 1},
  {1, 0, 0, 1, 0, 0, 1},
  {1, 1, 0, 0, 0, 1, 1},
  {1, 1, 0, 1, 0, 1, 1},
  {1, 1, 1, 0, 1, 1, 1}
};

void arataFata(int fata) {
  for (int i = 0; i < 7; i++) {
    digitalWrite(LEDURI[i], FETE[fata][i]);
  }
}

void setup() {
  for (int i = 0; i < 7; i++) {
    pinMode(LEDURI[i], OUTPUT);
  }
  pinMode(BUTON, INPUT_PULLUP);
  randomSeed(analogRead(A3));
  arataFata(1);
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    int zar = random(1, 7);
    arataFata(zar);
    delay(300);
  }
}
```

- `FETE[7][7]` — rândul `0` e „toate stinse”; rândurile 1–6 sunt fețele. Astfel `FETE[zar]` merge **direct**, fără `zar - 1`.  
- `random(1, 7)` dă un număr de la 1 la 6 (7 nu e inclus).  
- Aceeași idee ca la 7 segmente, dar cu o grilă de 7 LED-uri.

### 5) Complet — animație, sunet și oracol

```cpp
#include <LiquidCrystal.h>

const int LEDURI[7] = {6, 7, 8, 9, 10, A0, A1};
const int BUTON = A2;
const int BUZZER = 13;

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const byte FETE[7][7] = {
  {0, 0, 0, 0, 0, 0, 0},
  {0, 0, 0, 1, 0, 0, 0},
  {1, 0, 0, 0, 0, 0, 1},
  {1, 0, 0, 1, 0, 0, 1},
  {1, 1, 0, 0, 0, 1, 1},
  {1, 1, 0, 1, 0, 1, 1},
  {1, 1, 1, 0, 1, 1, 1}
};

const char* RASPUNSURI[6] = {
  "Nu acum",
  "Poate",
  "Sigur ca da!",
  "Intreaba iar",
  "Cu siguranta",
  "Sansa mare"
};

void arataFata(int fata) {
  for (int i = 0; i < 7; i++) {
    digitalWrite(LEDURI[i], FETE[fata][i]);
  }
}

void ruleaza() {
  int pauza = 40;
  for (int i = 0; i < 12; i++) {
    arataFata(random(1, 7));
    tone(BUZZER, 400 + i * 60, 30);
    delay(pauza);
    pauza += 12;
  }
}

void setup() {
  for (int i = 0; i < 7; i++) {
    pinMode(LEDURI[i], OUTPUT);
  }
  pinMode(BUTON, INPUT_PULLUP);
  randomSeed(analogRead(A3));
  lcd.begin(16, 2);
  lcd.print("Oracolul asculta");
  lcd.setCursor(0, 1);
  lcd.print("Apasa butonul!");
  arataFata(0);
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    ruleaza();

    int zar = random(1, 7);
    arataFata(zar);
    tone(BUZZER, 1200, 200);

    lcd.clear();
    lcd.print("Zar: ");
    lcd.print(zar);
    lcd.setCursor(0, 1);
    lcd.print(RASPUNSURI[zar - 1]);

    delay(500);
  }
}
```

**Idei noi**

- `ruleaza()` — animația: schimbă fața de 12 ori, tot mai **lent** (`pauza += 12`), cu sunet tot mai ascuțit. Așa pare că zarul „se oprește”.  
- `const char* RASPUNSURI[6]` — un tablou cu **texte**. `RASPUNSURI[zar - 1]` alege răspunsul (index 0–5).  
- Rezultatul final e ales **separat**, ca animația să nu influențeze zarul.

### 6) Fețe corecte? (un test)
La final adaugă în `setup()` un test: pentru fiecare față de la 1 la 6, o arăți 500 ms. Dacă nu seamănă cu un zar, ai o greșeală în tabel sau în fire.

---

## Greșeli frecvente
1. **Aceleași numere la fiecare pornire** — lipsește `randomSeed`.  
2. **Zar cu 7** — `random(1, 8)` în loc de `random(1, 7)`.  
3. **Fețe greșite** — LED-urile nu sunt la pinii din `LEDURI[]`.  
4. **Răspunsul nu se potrivește** — indexul `zar - 1` greșit.  
5. **Prea multe fire** — pune rezistoarele **pe rând**, cu bifă.

---

## De făcut azi — „Oracolul”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Buton → zar cu 7 LED-uri |
| **Complet** | Minim + animație + sunet + LCD cu răspuns |

### Pasul 1 — Minim
- [ ] 7 LED-uri ca un zar  
- [ ] Toate fețele corecte  

### Pasul 2 — Complet
- [ ] Animația încetinește  
- [ ] LCD cu zarul și răspunsul  
- [ ] Numele `A4_L06` e corect

---

## Bonus
- [ ] Un **al doilea zar** pe LCD (numerele a două zaruri și suma)  
- [ ] Contor: de câte ori a ieșit fiecare față, în 20 de aruncări

## Recapitulare rapidă
1. Tablou de **modele** pentru fețe  
2. `random(min, max)` — max e **exclus**  
3. Animație = pauze tot mai mari  
4. Tablou de texte pentru răspunsuri

## Pe placa reală *(opțional)*
Un zar „adevărat” ar putea fi pornit prin **scuturare**, cu un senzor de înclinare, ca în Modulul 2 L8.

## Quiz scurt
- Câte valori diferite poate da `random(1, 7)`?  
- De ce rândul 0 din `FETE` e gol?  
- Cum ai adăuga al 7-lea răspuns?

## Temă
Scrie 6 răspunsuri amuzante pentru oracolul tău (fiecare, maxim 16 caractere).
