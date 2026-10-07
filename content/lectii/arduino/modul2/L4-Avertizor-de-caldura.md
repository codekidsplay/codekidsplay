# Lecția 4 — Avertizor de căldură
**Modulul 2 · Senzori**  
**Code Kids Play · Sensor Scout**

> Azi legi temperatura de **lumini și sunet**: verde = OK, galben = cald, roșu = pericol (și buzzer).  
> Proiect: **„Avertizor de căldură”** · `Prenume_Nume_A2_L04`

---

## Obiectiv
La finalul orei ai un avertizor cu 3 trepte, comandat de TMP36.  
**Minim:** 3 LED-uri (verde, galben, roșu) care se aprind după temperatură.  
**Complet:** Minim + **buzzer** care sună intermitent la roșu și **temperatura afișată** în Serial Monitor.

## De ce contează
Alarmele din frigidere, sere și cuptoare funcționează la fel: **trepte de temperatură** și o reacție pentru fiecare.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 · formula °C |
| 10–35 | Circuitul cu 3 LED-uri |
| 35–70 | `if / else if / else` cu 3 trepte |
| 70–100 | Buzzer intermitent |
| 100–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · TMP36 · 3 × LED (verde, galben, roșu) · 3 × Resistor 220 Ω · **Piezo** · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A2_L04`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **TMP36** | 5V · semnal la **A0** · GND |
| **LED verde** | pin **4** → 220 Ω → anod · catod → GND |
| **LED galben** | pin **5** → 220 Ω → anod · catod → GND |
| **LED roșu** | pin **6** → 220 Ω → anod · catod → GND |
| **Piezo** | un picior la pin **8**, celălalt la **GND** |

### 3) Minim — trei trepte

```cpp
const int SENZOR = A0;
const int VERDE = 4;
const int GALBEN = 5;
const int ROSU = 6;

void setup() {
  pinMode(VERDE, OUTPUT);
  pinMode(GALBEN, OUTPUT);
  pinMode(ROSU, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  float volti = analogRead(SENZOR) * 5.0 / 1023.0;
  float grade = (volti - 0.5) * 100.0;

  digitalWrite(VERDE, LOW);
  digitalWrite(GALBEN, LOW);
  digitalWrite(ROSU, LOW);

  if (grade < 30) {
    digitalWrite(VERDE, HIGH);
  } else if (grade < 45) {
    digitalWrite(GALBEN, HIGH);
  } else {
    digitalWrite(ROSU, HIGH);
  }

  Serial.println(grade, 1);
  delay(300);
}
```

- La început **stingem toate** LED-urile, apoi aprindem **doar unul**. E o tehnică simplă și sigură.  
- Ordinea `if / else if / else` contează: se oprește la prima condiție adevărată.  
- Pragurile `30` și `45` sunt ale tale, le poți schimba.

### 4) Complet — buzzer intermitent
La roșu, buzzerul face „bip bip”. Folosim `tone` și `noTone`:

```cpp
const int SENZOR = A0;
const int VERDE = 4;
const int GALBEN = 5;
const int ROSU = 6;
const int BUZZER = 8;

void setup() {
  pinMode(VERDE, OUTPUT);
  pinMode(GALBEN, OUTPUT);
  pinMode(ROSU, OUTPUT);
  Serial.begin(9600);
}

void alarma() {
  tone(BUZZER, 1000);
  delay(150);
  noTone(BUZZER);
  delay(150);
}

void loop() {
  float volti = analogRead(SENZOR) * 5.0 / 1023.0;
  float grade = (volti - 0.5) * 100.0;

  digitalWrite(VERDE, LOW);
  digitalWrite(GALBEN, LOW);
  digitalWrite(ROSU, LOW);

  if (grade < 30) {
    digitalWrite(VERDE, HIGH);
    delay(300);
  } else if (grade < 45) {
    digitalWrite(GALBEN, HIGH);
    delay(300);
  } else {
    digitalWrite(ROSU, HIGH);
    alarma();
  }

  Serial.print("Temperatura: ");
  Serial.println(grade, 1);
}
```

În Tinkercad, mută glisorul TMP36 peste 45 °C: LED-ul roșu se aprinde și buzzerul sună în „bip-uri”.

### 5) Test pe trepte

| Temperatură | Ce vezi |
|-------------|---------|
| sub 30 °C | verde |
| 30–44 °C | galben |
| 45 °C sau mai mult | roșu + bip |

---

## Greșeli frecvente
1. **Două LED-uri aprinse** — ai uitat să le stingi la începutul `loop`.  
2. **Mereu roșu** — pragul e prea mic sau formula °C e greșită.  
3. **Fără sunet** — piezo nu e pe pin 8 sau n-ai `tone`.  
4. **LED nu se aprinde** — lipsește rezistorul sau catodul nu e la GND.  
5. **Treptele nu merg** — condițiile sunt în ordine inversă (`else if` după `else`).

---

## De făcut azi — „Avertizor de căldură”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 3 LED-uri pe trepte |
| **Complet** | Minim + buzzer la roșu + afișare în Serial Monitor |

### Pasul 1 — Minim
- [ ] 3 LED-uri, fiecare cu rezistor  
- [ ] Treptele funcționează  

### Pasul 2 — Complet
- [ ] Funcția `alarma()`  
- [ ] Serial Monitor arată temperatura  
- [ ] Numele `A2_L04` e corect

---

## Bonus
- [ ] LED-ul galben **clipește** în loc să stea aprins  
- [ ] Adaugă o a patra treaptă: „îngheț” (sub 5 °C), cu LED albastru

## Recapitulare rapidă
1. `if / else if / else` alege **o singură** ramură  
2. Stingem toate, apoi aprindem unul  
3. Funcția `alarma()` face codul mai curat  
4. `tone` / `noTone` pentru sunet

## Pe placa reală *(opțional)*
Ca să testezi roșul, ține senzorul TMP36 între degete (se încălzește la ~30 °C) sau schimbă pragurile.

## Quiz scurt
- De ce stingem toate LED-urile la începutul buclei?  
- Ce se întâmplă dacă pragul roșu e mai mic decât cel galben?  
- Ce face `noTone`?

## Temă
Alege temperaturile potrivite pentru un **frigider** (verde / galben / roșu) și scrie-le într-un tabel.
