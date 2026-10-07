# Lecția 7 — Soneria de la ușă
**Modulul 1 · Primele circuite**  
**Code Kids Play · Circuit Starter**

> Azi faci Arduino să **sune**: conectezi un **buzzer (piezo)** și programezi o **sonerie** cu butonul de la ușă.  
> Proiect: **„Soneria mea”** · `Prenume_Nume_A1_L07`

---

## Obiectiv
La finalul orei ai o sonerie care scoate un sunet când apeși un buton.  
**Minim:** buzzer pe pin 8 · buton pe pin 2 · `tone` când apeși, `noTone` când nu.  
**Complet:** Minim + sunet în **două note** („ding-dong”) · un LED care se aprinde cât sună.

## De ce contează
Sunetul e cel mai bun mod prin care un aparat **atrage atenția**: alarme, jocuri, aparate de bucătărie. Cu `tone` poți face note muzicale.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6 · ce e sunetul (vibrație) |
| 10–30 | Circuitul cu buzzer + buton |
| 30–60 | `tone` și `noTone` |
| 60–100 | Ding-dong + LED |
| 100–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **Piezo** (buzzer) · Pushbutton · (Complet) LED + Resistor 220 Ω · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A1_L07`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **Piezo** | un picior → pin **8** · celălalt → **GND** |
| **Buton** | un picior → pin **2** · piciorul diagonal → **GND** |
| **LED** (Complet) | rezistor 220 Ω → pin **7** · catod → **GND** |

În Tinkercad piesa se numește **Piezo**; funcționează ca un mic difuzor.

### 3) Ce face `tone`
`tone(pin, frecventa, durata)` trimite un sunet:

| Parametru | Înțeles |
|-----------|---------|
| `pin` | unde e buzzerul |
| `frecventa` | cât de **ascuțit** e sunetul, în Hz (mai mare = mai ascuțit) |
| `durata` | cât timp sună, în ms (opțional) |

Câteva note: **Do** = 262 Hz · **Mi** = 330 Hz · **Sol** = 392 Hz · **La** = 440 Hz.

### 4) Minim — soneria

```cpp
const int BUTON = 2;
const int BUZZER = 8;

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(BUZZER, OUTPUT);
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    tone(BUZZER, 440);
  } else {
    noTone(BUZZER);
  }
}
```

Cât ții apăsat, sună nota **La**. Când dai drumul, `noTone` oprește sunetul.

### 5) Ding-dong
O sonerie adevărată sună două note una după alta:

```cpp
const int BUTON = 2;
const int BUZZER = 8;
const int LED = 7;

void dingDong() {
  digitalWrite(LED, HIGH);
  tone(BUZZER, 659);   // Mi
  delay(400);
  tone(BUZZER, 523);   // Do
  delay(600);
  noTone(BUZZER);
  digitalWrite(LED, LOW);
}

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(BUZZER, OUTPUT);
  pinMode(LED, OUTPUT);
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    dingDong();
    delay(300);
  }
}
```

LED-ul se aprinde **cât sună** soneria, ca „lumină de ușă”.

### 6) Alarmă cu sirenă
Frecvența crește și scade, ca la mașina de poliție:

```cpp
const int BUZZER = 8;

void setup() {
  pinMode(BUZZER, OUTPUT);
}

void loop() {
  for (int f = 400; f <= 900; f += 10) {
    tone(BUZZER, f);
    delay(10);
  }
  for (int f = 900; f >= 400; f -= 10) {
    tone(BUZZER, f);
    delay(10);
  }
}
```

---

## Greșeli frecvente
1. **Nu sună nimic** — buzzerul nu e la pin 8 și GND, sau n-ai pornit simularea.  
2. **Sună tot timpul** — ai uitat `noTone` pe ramura `else`.  
3. **Sunet urât / scârțâit** — frecvențe prea mari sau schimbări prea rapide.  
4. **Se aude în buclă** — fără `delay(300)` după `dingDong()`, soneria repornește dacă ții apăsat.  
5. **Același pin pentru `tone` și pentru PWM** — `tone` ocupă un timer; evită `analogWrite` pe pinii 3 și 11 în același timp.

---

## De făcut azi — „Soneria mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Buton → buzzer sună; fără apăsare, tace |
| **Complet** | Minim + ding-dong cu 2 note + LED + sirenă (bonus) |

### Pasul 1 — Minim
- [ ] Buzzer pe pin 8, buton pe pin 2  
- [ ] `tone` și `noTone`  

### Pasul 2 — Complet
- [ ] Funcția `dingDong()` cu 2 note  
- [ ] LED aprins cât sună  
- [ ] Numele `A1_L07` e corect

---

## Bonus
- [ ] Alege **alte două note** și fă soneria ta personală  
- [ ] Sirenă la apăsarea butonului în loc de ding-dong

## Recapitulare rapidă
1. `tone(pin, frecventa)` pornește sunetul · `noTone(pin)` îl oprește  
2. Frecvență mai mare = sunet mai ascuțit  
3. Mai multe `tone` una după alta fac o melodie

## Pe placa reală *(opțional)*
Buzzerul **pasiv** (fără generator propriu) se comportă ca în simulator. Cel **activ** sună singur la 5V, fără `tone`. Verifică ce model ai.

## Quiz scurt
- Ce face `noTone`?  
- Care sunet e mai ascuțit: 262 Hz sau 659 Hz?  
- De ce punem `delay(300)` după soneria completă?

## Temă
Compune soneria familiei tale: alege 3 note și scrie-le (frecvențele) într-un caiet.
