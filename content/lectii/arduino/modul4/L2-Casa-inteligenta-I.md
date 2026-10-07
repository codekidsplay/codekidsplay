# Lecția 2 — Casă inteligentă I: lumini și climat
**Modulul 4 · Proiecte complete**  
**Code Maker Club · Arduino Creator**

> Azi construiești prima parte a unei **case inteligente**: lumina se aprinde singură, ventilatorul pornește la căldură, iar LCD-ul arată starea casei.  
> Proiect: **„Casa mea I”** · `Prenume_Nume_A4_L02`

---

## Obiectiv
La finalul orei casa ta reglează **lumina** și **temperatura**.  
**Minim:** lampa automată (fotorezistor) + ventilator la temperatură mare.  
**Complet:** Minim + **LCD** cu 2 pagini (stare / valori) + **buton** pentru pagini și **mod manual** pentru ventilator.

## De ce contează
Un proiect mare se construiește **în etape**. Azi faci baza (lumini + climat); în lecția următoare adaugi securitatea, **în același circuit**. De aceea alegem pinii cu grijă.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1 · tabelul de pini |
| 10–40 | Circuitul pas cu pas |
| 40–70 | Lampa și ventilatorul |
| 70–105 | LCD și butoane |
| 105–120 | Test, recap, galerie |

**Componente azi:** Arduino Uno · Breadboard · Photoresistor · Resistor 10 kΩ · TMP36 · LED · Resistor 220 Ω · DC Motor · NPN transistor · Diodă · Resistor 1 kΩ · LCD 16 x 2 · Pushbutton · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A4_L02` — îl vei **dubla** (copia) în lecția următoare.

### 2) Tabelul de pini al casei (pentru lecțiile 2 și 3)

| Piesă | Pin | Lecția |
|-------|-----|--------|
| LCD (RS, E, D4–D7) | 12, 11, 5, 4, 3, 2 | I |
| Fotorezistor | A0 | I |
| TMP36 | A1 | I |
| LED lampă | 7 | I |
| Motor ventilator (tranzistor) | 6 | I |
| Buton pagini / mod | 8 | I |
| PIR | A2 | II |
| Buton armare | A3 | II |
| Buton ușă | 9 | II |
| Servo ușă | 10 | II |
| Buzzer | 13 | II |
| LED alarmă | A4 | II |

### 3) Conexiuni (partea I)

| Piesă | Se conectează |
|-------|---------------|
| **LCD** | ca în Modulul 3 L1 (RS 12, E 11, D4 5, D5 4, D6 3, D7 2; VSS/RW/V0/K la GND; VDD și A cu 220 Ω la 5V) |
| **Fotorezistor** | 5V → fotorezistor → **A0** → 10 kΩ → GND |
| **TMP36** | 5V · semnal **A1** · GND |
| **LED lampă** | pin **7** → 220 Ω → anod · catod → GND |
| **Motor** | un fir la 5V, celălalt la **colectorul** tranzistorului; **emitor** la GND; **bază** la pin **6** prin 1 kΩ; dioda în paralel cu motorul (banda spre 5V) |
| **Buton** | pin **8** și **GND** |

### 4) Cum împărțim programul
Fiecare parte e o funcție, iar `loop()` doar le cheamă. Așa lecția II doar **adaugă** funcții:

| Funcție | Ce face |
|---------|---------|
| `temperatura()` | citește TMP36 în °C |
| `lampa()` | LED după lumină (cu histerezis) |
| `ventilator()` | motor după temperatură sau manual |
| `schimbaModul()` | citește butonul |
| `afiseaza()` | scrie pe LCD |

### 5) Codul

```cpp
#include <LiquidCrystal.h>

const int LUMINA = A0;
const int TEMP = A1;
const int LED_LAMPA = 7;
const int MOTOR = 6;
const int BUTON = 8;

const int PRAG_APRINDE = 250;
const int PRAG_STINGE = 350;
const float T_MIN = 24.0;
const float T_MAX = 34.0;

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

bool lampaAprinsa = false;
bool ventilatorManual = false;
int viteza = 0;
int pagina = 0;
bool butonAnterior = false;
unsigned long ultimaAfisare = 0;
unsigned long apasatDe = 0;

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
  if (ventilatorManual) {
    viteza = 255;
  } else {
    float t = temperatura();
    viteza = map((int)t, (int)T_MIN, (int)T_MAX, 0, 255);
    viteza = constrain(viteza, 0, 255);
  }
  analogWrite(MOTOR, viteza);
}

void schimbaModul() {
  bool apasat = (digitalRead(BUTON) == LOW);

  if (apasat && !butonAnterior) {
    apasatDe = millis();
  }
  if (!apasat && butonAnterior) {
    if (millis() - apasatDe >= 1000) {
      ventilatorManual = !ventilatorManual;
    } else {
      pagina = (pagina + 1) % 3;
    }
    lcd.clear();
  }
  butonAnterior = apasat;
}

void afiseaza() {
  if (millis() - ultimaAfisare < 400) return;
  ultimaAfisare = millis();

  lcd.setCursor(0, 0);
  if (pagina == 0) {
    lcd.print("Temp: ");
    lcd.print(temperatura(), 1);
    lcd.print(" C   ");
    lcd.setCursor(0, 1);
    lcd.print("Lumina: ");
    lcd.print(map(analogRead(LUMINA), 0, 1023, 0, 100));
    lcd.print(" %   ");
  } else if (pagina == 1) {
    lcd.print("Lampa: ");
    lcd.print(lampaAprinsa ? "ON " : "OFF");
    lcd.setCursor(0, 1);
    lcd.print("Vent: ");
    lcd.print(map(viteza, 0, 255, 0, 100));
    lcd.print(" %   ");
  } else {
    lcd.print("Ventilator MANUAL");
    lcd.setCursor(0, 1);
    lcd.print(ventilatorManual ? "pornit (tine 1s)" : "oprit  (tine 1s)");
  }
}

void setup() {
  pinMode(LED_LAMPA, OUTPUT);
  pinMode(MOTOR, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
  lcd.begin(16, 2);
  lcd.print("Casa inteligenta");
  delay(1000);
  lcd.clear();
}

void loop() {
  schimbaModul();
  lampa();
  ventilator();
  afiseaza();
  delay(30);
}
```

**Ce e nou față de lecțiile anterioare**

- `return;` într-o funcție `void` o **oprește** pe loc. Aici folosim `if (...) return;` ca să afișăm doar o dată la 400 ms.  
- `lampaAprinsa ? "ON " : "OFF"` alege între două texte.  
- Variabilele globale (`pagina`, `lampaAprinsa`, `viteza`) sunt **starea casei**.

**Cum folosești butonul:** o apăsare **scurtă** schimbă pagina; o apăsare **lungă** (peste 1 secundă) pornește / oprește ventilatorul manual. Cu `millis()` măsurăm cât timp a fost ținut apăsat.

### 6) Teste

| Scenariu | Ce faci | Rezultat |
|----------|---------|----------|
| Lumină mare | glisor LDR sus | lampă stinsă |
| Întuneric | glisor LDR jos | lampă aprinsă |
| Cald | TMP36 la 35 °C | motor la viteză maximă |
| Rece | TMP36 la 20 °C | motor oprit |
| Buton, apăsare scurtă | apasă | pagina se schimbă |
| Buton, apăsare lungă | ține 1 s | ventilator manual ON / OFF |

---

## Greșeli frecvente
1. **Lampa clipește** — lipsește histerezisul (două praguri).  
2. **Ventilator nu pornește** — verifică tranzistorul și dioda.  
3. **LCD cu cifre rămase** — spații la finalul textelor.  
4. **Ecran care clipește** — `lcd.clear()` prea des.  
5. **Mereu aceeași pagină** — butonul fără `INPUT_PULLUP`.

---

## De făcut azi — „Casa mea I”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Lampa automată + ventilator pe temperatură |
| **Complet** | Minim + LCD cu pagini + buton + mod manual |

### Pasul 1 — Minim
- [ ] Lampa se aprinde la întuneric  
- [ ] Ventilatorul pornește la căldură  

### Pasul 2 — Complet
- [ ] LCD cu 3 pagini  
- [ ] Apăsarea lungă comută modul manual  
- [ ] Numele `A4_L02` e corect

---

## Bonus
- [ ] Un LED care arată când ventilatorul e în mod manual  
- [ ] Mesaj „Prea cald!” pe LCD peste 35 °C

## Recapitulare rapidă
1. Proiect mare = **funcții mici**  
2. Tabel de pini comun pentru toate etapele  
3. Variabile globale = starea sistemului  
4. `return;` oprește o funcție

## Pe placa reală *(opțional)*
Ventilatorul real are nevoie de alimentare proprie. Folosește modul cu **releu** pentru dispozitive de la priză, doar cu un adult și componente certificate.

## Quiz scurt
- Ce face `if (...) return;`?  
- De ce avem două praguri la lampă?  
- Ce pagini are panoul tău?

## Temă
Gândește-te ce alt aparat din casă ai putea automatiza (ex. perdeaua) și ce senzor ar folosi.
