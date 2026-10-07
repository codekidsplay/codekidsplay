# Lecția 7 — Stația meteo a școlii
**Modulul 4 · Proiecte complete**  
**Code Kids Play · Arduino Creator**

> Azi construiești o **stație meteo** completă, care **înregistrează** valorile și le arată pe LCD ca pe un tablou de bord.  
> Proiect: **„Meteo de școală”** · `Prenume_Nume_A4_L07`

---

## Obiectiv
La finalul orei stația ta măsoară, înregistrează și afișează date.  
**Minim:** temperatură, lumină și umiditate (sol) pe LCD, pe pagini.  
**Complet:** Minim + **istoric** (ultimele 10 măsurători) + **minim / maxim / medie** + **grafic cu bare** pe LCD + **LED de alertă**.

## De ce contează
Datele valoroase sunt cele **adunate în timp**. Un datalogger înregistrează valorile ca să vezi tendințele: se încălzește? se întunecă? Îl folosesc meteorologii, fermierii și cercetătorii.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6 · senzorii folosiți |
| 10–25 | Conexiuni |
| 25–55 | Pagini cu valori |
| 55–105 | Istoric, statistici, grafic |
| 105–120 | Test, recap, galerie |

**Componente azi:** Arduino Uno · Breadboard · TMP36 · Photoresistor · Resistor 10 kΩ · Soil Moisture Sensor · LCD 16 x 2 · Pushbutton · LED · Resistor 220 Ω · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A4_L07`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **LCD** | RS 12, E 11, D4 5, D5 4, D6 3, D7 2 |
| **TMP36** | 5V · semnal **A1** · GND |
| **Fotorezistor** | 5V → fotorezistor → **A0** → 10 kΩ → GND |
| **Senzor sol** | semnal **A2** · 5V · GND |
| **Buton pagină** | pin **8** și **GND** |
| **LED alertă** | pin **7** → 220 Ω → anod · catod → GND |

### 3) Minim — 3 pagini

```cpp
#include <LiquidCrystal.h>

const int BUTON = 8;
const int NR_PAGINI = 3;

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

int pagina = 0;
bool butonAnterior = false;
unsigned long ultima = 0;

float temperatura() {
  float volti = analogRead(A1) * 5.0 / 1023.0;
  return (volti - 0.5) * 100.0;
}

int lumina() {
  return map(analogRead(A0), 0, 1023, 0, 100);
}

int umiditate() {
  return constrain(map(analogRead(A2), 0, 700, 0, 100), 0, 100);
}

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  lcd.begin(16, 2);
}

void loop() {
  bool apasat = (digitalRead(BUTON) == LOW);
  if (apasat && !butonAnterior) {
    pagina = (pagina + 1) % NR_PAGINI;
    lcd.clear();
  }
  butonAnterior = apasat;

  if (millis() - ultima >= 500) {
    ultima = millis();
    lcd.setCursor(0, 0);

    if (pagina == 0) {
      lcd.print("Temperatura");
      lcd.setCursor(0, 1);
      lcd.print(temperatura(), 1);
      lcd.print(" C    ");
    } else if (pagina == 1) {
      lcd.print("Lumina");
      lcd.setCursor(0, 1);
      lcd.print(lumina());
      lcd.print(" %    ");
    } else {
      lcd.print("Umiditate sol");
      lcd.setCursor(0, 1);
      lcd.print(umiditate());
      lcd.print(" %    ");
    }
  }
  delay(20);
}
```

Calibrarea umidității (`700`) se ia din măsurătorile tale (Modulul 2 L7).

### 4) Istoric — tablou circular
Vrem să ținem **ultimele 10** temperaturi. Când s-au umplut, următoarea o înlocuiește pe cea mai veche (**buffer circular**):

```cpp
const int N = 10;
float istoric[N];
int index = 0;
int numar = 0;

void adauga(float valoare) {
  istoric[index] = valoare;
  index = (index + 1) % N;
  if (numar < N) numar++;
}
```

- `index = (index + 1) % N` — după poziția 9 revine la 0.  
- `numar` ține minte câte valori valide avem (important în primele 10 măsurători).

### 5) Statistici

```cpp
float minim() {
  float m = istoric[0];
  for (int i = 1; i < numar; i++) {
    if (istoric[i] < m) m = istoric[i];
  }
  return m;
}

float maxim() {
  float m = istoric[0];
  for (int i = 1; i < numar; i++) {
    if (istoric[i] > m) m = istoric[i];
  }
  return m;
}

float medie() {
  float suma = 0;
  for (int i = 0; i < numar; i++) {
    suma += istoric[i];
  }
  return suma / numar;
}
```

Aceste trei funcții **parcurg** tabloul cu `for` și calculează rezultatul.

### 6) Grafic cu bare pe LCD
LCD-ul poate afișa **bare** de înălțimi diferite dacă definim 8 caractere speciale (de la 1 la 8 linii pline). Pentru simplitate folosim doar 4 trepte:

```cpp
byte bara1[8] = {0, 0, 0, 0, 0, 0, 0, 31};
byte bara2[8] = {0, 0, 0, 0, 0, 0, 31, 31};
byte bara3[8] = {0, 0, 0, 0, 31, 31, 31, 31};
byte bara4[8] = {31, 31, 31, 31, 31, 31, 31, 31};
```

`31` = `B11111` (toate cele 5 puncte aprinse). Fiecare caracter e mai „înalt” decât precedentul.

### 7) Complet — codul întreg

```cpp
#include <LiquidCrystal.h>

const int BUTON = 8;
const int LED = 7;
const int NR_PAGINI = 4;
const int N = 10;
const float T_ALERTA = 30.0;

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

byte bara1[8] = {0, 0, 0, 0, 0, 0, 0, 31};
byte bara2[8] = {0, 0, 0, 0, 0, 0, 31, 31};
byte bara3[8] = {0, 0, 0, 0, 31, 31, 31, 31};
byte bara4[8] = {31, 31, 31, 31, 31, 31, 31, 31};

float istoric[N];
int index = 0;
int numar = 0;

int pagina = 0;
bool butonAnterior = false;
unsigned long ultimaAfisare = 0;
unsigned long ultimaMasurare = 0;

float temperatura() {
  float volti = analogRead(A1) * 5.0 / 1023.0;
  return (volti - 0.5) * 100.0;
}

int lumina() {
  return map(analogRead(A0), 0, 1023, 0, 100);
}

int umiditate() {
  return constrain(map(analogRead(A2), 0, 700, 0, 100), 0, 100);
}

void adauga(float valoare) {
  istoric[index] = valoare;
  index = (index + 1) % N;
  if (numar < N) numar++;
}

float minim() {
  float m = istoric[0];
  for (int i = 1; i < numar; i++) {
    if (istoric[i] < m) m = istoric[i];
  }
  return m;
}

float maxim() {
  float m = istoric[0];
  for (int i = 1; i < numar; i++) {
    if (istoric[i] > m) m = istoric[i];
  }
  return m;
}

float medie() {
  float suma = 0;
  for (int i = 0; i < numar; i++) {
    suma += istoric[i];
  }
  return suma / numar;
}

void deseneazaGrafic() {
  float mn = minim();
  float mx = maxim();
  if (mx - mn < 1.0) mx = mn + 1.0;

  lcd.setCursor(0, 1);
  for (int i = 0; i < N; i++) {
    if (i < numar) {
      int pozitie = (index - numar + i + N) % N;
      int nivel = map((int)(istoric[pozitie] * 10), (int)(mn * 10), (int)(mx * 10), 0, 3);
      lcd.write(byte(constrain(nivel, 0, 3)));
    } else {
      lcd.print(' ');
    }
  }
  lcd.print("      ");
}

void afiseaza() {
  lcd.setCursor(0, 0);
  if (pagina == 0) {
    lcd.print("Temp: ");
    lcd.print(temperatura(), 1);
    lcd.print(" C   ");
    lcd.setCursor(0, 1);
    lcd.print("Lumina: ");
    lcd.print(lumina());
    lcd.print(" %   ");
  } else if (pagina == 1) {
    lcd.print("Sol: ");
    lcd.print(umiditate());
    lcd.print(" %      ");
    lcd.setCursor(0, 1);
    lcd.print("                ");
  } else if (pagina == 2) {
    lcd.print("Min ");
    lcd.print(minim(), 1);
    lcd.print(" Max ");
    lcd.print(maxim(), 1);
    lcd.setCursor(0, 1);
    lcd.print("Medie: ");
    lcd.print(medie(), 1);
    lcd.print("    ");
  } else {
    lcd.print("Grafic temp.    ");
    deseneazaGrafic();
  }
}

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  lcd.begin(16, 2);
  lcd.createChar(0, bara1);
  lcd.createChar(1, bara2);
  lcd.createChar(2, bara3);
  lcd.createChar(3, bara4);
  adauga(temperatura());
}

void loop() {
  bool apasat = (digitalRead(BUTON) == LOW);
  if (apasat && !butonAnterior) {
    pagina = (pagina + 1) % NR_PAGINI;
    lcd.clear();
  }
  butonAnterior = apasat;

  if (millis() - ultimaMasurare >= 2000) {
    ultimaMasurare = millis();
    adauga(temperatura());
  }

  digitalWrite(LED, temperatura() > T_ALERTA);

  if (millis() - ultimaAfisare >= 500) {
    ultimaAfisare = millis();
    afiseaza();
  }
  delay(20);
}
```

| Pagina | Ce arată |
|--------|----------|
| 0 | temperatură + lumină |
| 1 | umiditate sol |
| 2 | min / max / medie |
| 3 | grafic cu bare |

Măsurătorile intră în istoric **la 2 secunde**, iar ecranul se actualizează **la 0,5 secunde**. LED-ul de alertă se aprinde peste 30 °C.

> Pentru test rapid în simulator, reduce intervalul de la `2000` la `500` și mută glisorul TMP36 între măsurători: graficul se schimbă.

---

## Greșeli frecvente
1. **Medie ciudată la început** — împarți la `N`, nu la `numar`.  
2. **Grafic gol** — nu ai apelat `createChar` în `setup`.  
3. **Index în afara tabloului** — `index` nu e limitat cu `%`.  
4. **Ecran clipește** — `clear` doar la schimbarea paginii.  
5. **Valori nerealiste** — lipsește calibrarea senzorilor.

---

## De făcut azi — „Meteo de școală”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 3 senzori, pagini pe LCD |
| **Complet** | Minim + istoric + min/max/medie + grafic + alertă |

### Pasul 1 — Minim
- [ ] 3 senzori calibrați  
- [ ] Pagini cu buton  

### Pasul 2 — Complet
- [ ] Buffer circular de 10  
- [ ] Statistici corecte  
- [ ] Grafic cu bare  
- [ ] Numele `A4_L07` e corect

---

## Bonus
- [ ] Istoric și pentru **lumină**  
- [ ] Un al doilea LED: „zi” / „noapte”

## Recapitulare rapidă
1. Datalogger = valori **în timp**  
2. Buffer circular cu `%`  
3. Funcții de statistică: `minim`, `maxim`, `medie`  
4. Caractere proprii pentru grafic

## Pe placa reală *(opțional)*
Un datalogger adevărat salvează pe **card SD** sau în memoria **EEPROM**, ca să nu piardă datele la oprire.

## Quiz scurt
- De ce împărțim la `numar`, nu la `N`?  
- Ce face `(index + 1) % N`?  
- La ce folosește un buffer circular?

## Temă
Alege un loc din școală sau din casă și scrie ce ai măsura acolo într-o săptămână și de ce.
