# Lecția 2 — Veioza automată
**Modulul 2 · Senzori**  
**Code Maker Club · Sensor Scout**

> Azi folosești un **fotorezistor** (senzor de lumină) ca să aprinzi singur un LED când se face întuneric.  
> Proiect: **„Veioza mea”** · `Prenume_Nume_A2_L02`

---

## Obiectiv
La finalul orei ai o lampă care **se aprinde în întuneric** și **se stinge la lumină**.  
**Minim:** fotorezistor pe A0 · LED pe pin 9 · se aprinde sub un **prag** ales de tine.  
**Complet:** Minim + **luminozitate proporțională** (cu cât e mai întuneric, cu atât lumina e mai puternică) și **histerezis** (fără clipiri la limită).

## De ce contează
Lămpile de stradă, luminile din telefon și farurile automate folosesc același lucru: un senzor de lumină și un **prag**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L1 · cum citim un senzor |
| 10–35 | Circuit: fotorezistor + rezistor (divizor de tensiune) |
| 35–60 | Calibrăm pragul cu Serial Monitor |
| 60–100 | Lampa proporțională + histerezis |
| 100–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **Photoresistor** · **Resistor 10 kΩ** · LED · Resistor 220 Ω · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A2_L02`

### 2) Divizorul de tensiune
Un fotorezistor își schimbă **rezistența** după lumină, dar Arduino citește **tensiune**. De aceea îl punem în serie cu un rezistor fix:

| De la | La |
|-------|----|
| **5V** | un picior al fotorezistorului |
| celălalt picior al fotorezistorului | **A0** **și** rezistorul de 10 kΩ |
| celălalt capăt al rezistorului de 10 kΩ | **GND** |

| Piesă | Se conectează |
|-------|---------------|
| **LED** | pin **9** → rezistor 220 Ω → anod · catod → GND |

La lumină multă, fotorezistorul are rezistență mică și **A0 citește valori mari**. La întuneric, A0 citește **valori mici**.

### 3) Calibrare — ce valori am?

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(analogRead(A0));
  delay(300);
}
```

În Tinkercad, dai click pe fotorezistor și muți glisorul de lumină. Notează:

| Situație | Valoare aproximativă |
|----------|----------------------|
| Lumină multă | ____ |
| Întuneric | ____ |
| **Pragul tău** (la mijloc) | ____ |

### 4) Minim — se aprinde sub prag

```cpp
const int SENZOR = A0;
const int LED = 9;
const int PRAG = 300;

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  int lumina = analogRead(SENZOR);

  if (lumina < PRAG) {
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
  delay(50);
}
```

Schimbă `PRAG` după valorile tale din tabel.

### 5) Complet — lumină proporțională
Cu cât e mai întuneric, cu atât LED-ul e mai puternic. Inversăm intervalul în `map`:

```cpp
const int SENZOR = A0;
const int LED = 9;

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lumina = analogRead(SENZOR);
  int luminozitate = map(lumina, 0, 1023, 255, 0);
  luminozitate = constrain(luminozitate, 0, 255);
  analogWrite(LED, luminozitate);

  Serial.print(lumina);
  Serial.print(" -> ");
  Serial.println(luminozitate);
  delay(100);
}
```

`constrain(x, 0, 255)` taie valorile care ies din interval.

### 6) Histerezis — fără clipiri la limită
Dacă lumina e **exact** la prag, valoarea sare puțin în sus și în jos și LED-ul **clipește**. Soluția: **două praguri**, unul pentru aprindere, altul pentru stingere.

```cpp
const int SENZOR = A0;
const int LED = 9;
const int PRAG_APRINDE = 250;
const int PRAG_STINGE = 350;

bool aprins = false;

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  int lumina = analogRead(SENZOR);

  if (!aprins && lumina < PRAG_APRINDE) {
    aprins = true;
  }
  if (aprins && lumina > PRAG_STINGE) {
    aprins = false;
  }

  digitalWrite(LED, aprins);
  delay(50);
}
```

Ca la termostat: se pornește la 250, dar se oprește abia la 350.

---

## Greșeli frecvente
1. **LED-ul nu reacționează** — fotorezistorul nu e legat și la A0 **și** la rezistorul de 10 kΩ.  
2. **Merge invers** — compari cu `>` în loc de `<`, sau ai inversat 5V cu GND.  
3. **Valori fixe** (mereu 0 sau 1023) — lipsește rezistorul de 10 kΩ.  
4. **LED-ul clipește la limită** — folosește histerezisul.  
5. **Prag prea mic / prea mare** — recitește valorile din Serial Monitor.

---

## De făcut azi — „Veioza mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Se aprinde la întuneric, se stinge la lumină (cu prag) |
| **Complet** | Minim + lumină proporțională + histerezis |

### Pasul 1 — Minim
- [ ] Divizor corect (5V – fotorezistor – A0 – 10 kΩ – GND)  
- [ ] Prag calibrat în Serial Monitor  

### Pasul 2 — Complet
- [ ] `map` + `constrain` pentru lumina proporțională  
- [ ] Histerezis cu două praguri  
- [ ] Numele `A2_L02` e corect

---

## Bonus
- [ ] Un al doilea LED care se aprinde **doar** la întuneric total  
- [ ] Buton care **dezactivează** veioza când vrei să dormi

## Recapitulare rapidă
1. Fotorezistor + rezistor fix = **divizor de tensiune**  
2. Praguri: `if (lumina < PRAG)`  
3. `map` + `constrain` pentru reglaj fin  
4. Histerezis = două praguri, fără clipiri

## Pe placa reală *(opțional)*
Fotorezistorul fizic (LDR) are 2 picioare, fără polaritate. Valorile depind de modelul lui; recalibrează-ți pragul.

## Quiz scurt
- De ce avem rezistor de 10 kΩ lângă fotorezistor?  
- Ce citește A0 la întuneric în schema ta?  
- Ce problemă rezolvă histerezisul?

## Temă
Fotografiază pragul tău (valorile din Serial Monitor la 3 niveluri de lumină) și scrie-le într-un tabel.
