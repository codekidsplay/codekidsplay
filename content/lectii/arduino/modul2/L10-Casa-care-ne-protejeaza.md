# Lecția 10 — Casa care ne protejează
**Modulul 2 · Senzori**  
**Code Kids Play · Sensor Scout**

> Proiectul modulului: combini **lumină, mișcare și temperatură** într-o casă care se apără singură.  
> Proiect: **„Casa protejată”** · `Prenume_Nume_A2_L10`

---

## Obiectiv
La finalul orei ai o casă cu **trei funcții** care lucrează împreună.  
**Minim:** 2 funcții: lampa automată (lumină) + alarma PIR cu buton de armare.  
**Complet:** Minim + **alertă de căldură** (LED roșu + bip) + un **raport** în Serial Monitor.

## De ce contează
Sistemele reale nu fac un singur lucru. Azi înveți să **împarți un proiect în funcții** și să le rulezi pe toate în același `loop()`.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap modul · senzorii învățați |
| 10–35 | Planul și schema (pe hârtie) |
| 35–85 | Programăm funcțiile pe rând |
| 85–110 | Testăm toate scenariile |
| 110–120 | Prezentare + recap |

**Componente azi:** Arduino Uno · Breadboard · Photoresistor · Resistor 10 kΩ · PIR · TMP36 · Pushbutton · 3 × LED · 3 × Resistor 220 Ω · Piezo · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A2_L10`

### 2) Planul: 3 sisteme într-o casă

| Sistem | Senzor | Reacție |
|--------|--------|---------|
| **Lampa** | fotorezistor (A0) | LED aprins la întuneric |
| **Alarma** | PIR (pin 2) + buton (pin 3) | sirenă, doar dacă e armată |
| **Termostat** | TMP36 (A1) | LED roșu + bip la temperatură mare |

### 3) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **Fotorezistor** | 5V → fotorezistor → **A0** → 10 kΩ → GND |
| **TMP36** | 5V · semnal **A1** · GND |
| **PIR** | semnal **2** · 5V · GND |
| **Buton** | pin **3** și **GND** (diagonal) |
| **LED lampă (galben)** | pin **9** → 220 Ω → anod · catod → GND |
| **LED alarmă (roșu)** | pin **10** → 220 Ω → anod · catod → GND |
| **LED căldură (portocaliu/roșu)** | pin **7** → 220 Ω → anod · catod → GND |
| **Piezo** | pin **8** și **GND** |

### 4) Structura codului
Fiecare sistem are **propria funcție**, iar `loop()` doar le apelează:

```cpp
void loop() {
  lampa();
  alarma();
  termostat();
  raport();
}
```

Așa poți testa, repara și îmbunătăți fiecare parte **separat**.

### 5) Codul complet

```cpp
const int LUMINA = A0;
const int TEMP = A1;
const int PIR = 2;
const int BUTON = 3;
const int BUZZER = 8;
const int LED_LAMPA = 9;
const int LED_ALARMA = 10;
const int LED_CALDURA = 7;

const int PRAG_NOAPTE = 300;
const float PRAG_CALD = 35.0;

bool armat = false;
unsigned long ultimulRaport = 0;

float temperatura() {
  float volti = analogRead(TEMP) * 5.0 / 1023.0;
  return (volti - 0.5) * 100.0;
}

void lampa() {
  digitalWrite(LED_LAMPA, analogRead(LUMINA) < PRAG_NOAPTE);
}

void alarma() {
  if (digitalRead(BUTON) == LOW) {
    armat = !armat;
    noTone(BUZZER);
    delay(300);
  }
  digitalWrite(LED_ALARMA, armat);

  if (armat && digitalRead(PIR) == HIGH) {
    tone(BUZZER, 1200, 100);
  }
}

void termostat() {
  if (temperatura() > PRAG_CALD) {
    digitalWrite(LED_CALDURA, HIGH);
    tone(BUZZER, 600, 100);
  } else {
    digitalWrite(LED_CALDURA, LOW);
  }
}

void raport() {
  if (millis() - ultimulRaport >= 2000) {
    ultimulRaport = millis();
    Serial.print("Lumina: ");
    Serial.print(analogRead(LUMINA));
    Serial.print("  Temp: ");
    Serial.print(temperatura(), 1);
    Serial.print(" C  Alarma: ");
    Serial.println(armat ? "ARMATA" : "oprita");
  }
}

void setup() {
  pinMode(PIR, INPUT);
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(LED_LAMPA, OUTPUT);
  pinMode(LED_ALARMA, OUTPUT);
  pinMode(LED_CALDURA, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  lampa();
  alarma();
  termostat();
  raport();
}
```

**Ce e nou**

- `millis()` = milisecundele de la pornire. `millis() - ultimulRaport >= 2000` face raportul **la 2 secunde, fără `delay`**, deci restul casei nu „îngheață”.  
- `armat ? "ARMATA" : "oprita"` alege între două texte.  
- `const float PRAG_CALD = 35.0;` — o valoare de configurare, ușor de schimbat.

### 6) Scenarii de test

| Scenariu | Ce faci | Rezultat |
|----------|---------|----------|
| Zi | lumină multă | lampa stinsă |
| Noapte | lumină mică | lampa aprinsă |
| Intrus | armezi, apoi miști obiectul | bip de alarmă |
| Incendiu | TMP36 peste 35 °C | LED roșu + bip |
| Dezarmare | apeși butonul | LED alarmă stins |

Bifează fiecare scenariu în caiet.

---

## Greșeli frecvente
1. **Un sistem blochează pe celelalte** — folosești `delay` lung. Folosește `millis()`.  
2. **Alarma sună și când nu e armată** — lipsește `armat &&`.  
3. **Bipurile se acoperă** — alarmă și căldură folosesc același buzzer; e normal, dar ai grijă la praguri.  
4. **Lampa clipește** — vezi histerezisul din L2.  
5. **Nu iese nimic în Serial Monitor** — lipsește `Serial.begin(9600)`.

---

## De făcut azi — „Casa protejată”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Lampa automată + alarma armabilă |
| **Complet** | Minim + alertă de căldură + raport la 2 secunde |

### Pasul 1 — Minim
- [ ] Lampa funcționează  
- [ ] Alarma funcționează cu buton  

### Pasul 2 — Complet
- [ ] Termostatul cu bip  
- [ ] Raportul cu `millis()`  
- [ ] Numele `A2_L10` e corect

### Verificare finală Modul 2
- [ ] Citesc un senzor analogic și afișez valoarea  
- [ ] Calibrez un senzor cu Serial Monitor  
- [ ] Folosesc praguri și, la nevoie, histerezis  
- [ ] Rulez mai multe funcții în același proiect

---

## Bonus
- [ ] Adaugă **întârziere de ieșire** la alarmă (5 secunde)  
- [ ] Un LED care arată „toate sistemele OK” când nu e nicio alertă

## Recapitulare rapidă
1. Împarte proiectul în **funcții**  
2. `loop()` doar le apelează  
3. `millis()` înlocuiește `delay` când ai mai multe sarcini  
4. Testează fiecare scenariu

## Pe placa reală *(opțional)*
Într-o casă adevărată ai folosi relee și senzori certificați, cu alimentare separată. Aici facem doar modelul.

## Quiz scurt
- De ce e util să ai o funcție pentru fiecare sistem?  
- Ce face `millis()`?  
- Ce se întâmplă dacă pui `delay(5000)` în `lampa()`?

## Temă
Alege o funcție nouă pentru casa ta (ex. detector de scurgeri) și scrie ce senzor și ce reacție ar avea.
