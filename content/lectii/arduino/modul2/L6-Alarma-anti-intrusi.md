# Lecția 6 — Alarma anti-intruși
**Modulul 2 · Senzori**  
**Code Maker Club · Sensor Scout**

> Azi construiești o **alarmă** cu senzor de mișcare **PIR**, un buton de armare și o sirenă.  
> Proiect: **„Santinela”** · `Prenume_Nume_A2_L06`

---

## Obiectiv
La finalul orei ai o alarmă care sună când detectează mișcare, dar **doar dacă e armată**.  
**Minim:** PIR + LED: LED-ul se aprinde când se mișcă ceva.  
**Complet:** Minim + **buton de armare/dezarmare** + **sirenă** + LED de stare (armat / dezarmat).

## De ce contează
Alarmele din case, magazine și lifturi folosesc senzori PIR. Aici înveți și un concept important: **starea** unui sistem (armat sau nu).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 · cum simțim ceva |
| 10–30 | Circuitul cu PIR |
| 30–60 | Detectarea mișcării |
| 60–105 | Armare cu buton + sirenă |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **PIR Sensor** · Pushbutton · 2 × LED (verde, roșu) · 2 × Resistor 220 Ω · Piezo · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A2_L06`

### 2) Cum merge PIR
PIR („Passive InfraRed”) simte **căldura** corpurilor care se mișcă. Are 3 pini; în Tinkercad le citești trecând cursorul peste ei.

| Pin PIR | Se conectează |
|---------|---------------|
| **Semnal (OUT)** | pin **2** |
| **Alimentare (5V)** | **5V** |
| **GND** | **GND** |

| Piesă | Se conectează |
|-------|---------------|
| **Buton** | pin **3** și **GND** (diagonal) |
| **LED verde** (dezarmat) | pin **5** → 220 Ω → anod · catod → GND |
| **LED roșu** (armat) | pin **6** → 220 Ω → anod · catod → GND |
| **Piezo** | pin **8** și **GND** |

### 3) Minim — mișcare = LED

```cpp
const int PIR = 2;
const int LED = 6;

void setup() {
  pinMode(PIR, INPUT);
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, digitalRead(PIR));
}
```

În Tinkercad, dai click pe PIR și apare un obiect pe care îl muți. Când se mișcă, `PIR` devine `HIGH`.

### 4) Complet — alarmă armabilă
Folosim o **variabilă de stare** `armat`. Butonul o schimbă (`!armat` inversează valoarea).

```cpp
const int PIR = 2;
const int BUTON = 3;
const int VERDE = 5;
const int ROSU = 6;
const int BUZZER = 8;

bool armat = false;

void setup() {
  pinMode(PIR, INPUT);
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(VERDE, OUTPUT);
  pinMode(ROSU, OUTPUT);
}

void sirena() {
  for (int f = 600; f <= 1200; f += 20) {
    tone(BUZZER, f);
    delay(5);
  }
  for (int f = 1200; f >= 600; f -= 20) {
    tone(BUZZER, f);
    delay(5);
  }
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    armat = !armat;
    noTone(BUZZER);
    delay(300);
  }

  digitalWrite(VERDE, !armat);
  digitalWrite(ROSU, armat);

  if (armat && digitalRead(PIR) == HIGH) {
    sirena();
  } else {
    noTone(BUZZER);
  }
}
```

**Cum citești codul**

- `armat = !armat;` — dacă era `false`, devine `true` și invers.  
- `delay(300)` după buton ca să nu schimbi starea de mai multe ori dintr-o apăsare.  
- `digitalWrite(VERDE, !armat)` — verde aprins când **nu** e armat.  
- Sirena e o funcție, care urcă și coboară frecvența.  
- `armat && digitalRead(PIR) == HIGH` — sună **doar** dacă ambele sunt adevărate.

### 5) Test

| Pas | Ce faci | Ce ar trebui să vezi |
|-----|---------|---------------------|
| 1 | Pornești simularea | LED verde, fără sunet |
| 2 | Muți obiectul | Nimic (dezarmat) |
| 3 | Apeși butonul | LED roșu |
| 4 | Muți obiectul | Sirena sună |
| 5 | Apeși butonul | Din nou verde, liniște |

---

## Greșeli frecvente
1. **PIR „sună” imediat la pornire** — la început senzorul real se calibrează ~30 s. Așteaptă.  
2. **Butonul schimbă starea de mai multe ori** — lipsește `delay` după apăsare.  
3. **Sună și dezarmat** — condiția nu conține `armat &&`.  
4. **Sirena nu se oprește** — lipsește `noTone`.  
5. **LED-urile inverse** — ai pus `armat` unde trebuia `!armat`.

---

## De făcut azi — „Santinela”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | PIR aprinde un LED |
| **Complet** | Minim + armare cu buton + sirenă + 2 LED-uri de stare |

### Pasul 1 — Minim
- [ ] PIR pe pin 2  
- [ ] LED reacționează la mișcare  

### Pasul 2 — Complet
- [ ] Variabila `armat` și butonul  
- [ ] Sirena din funcție  
- [ ] Numele `A2_L06` e corect

---

## Bonus
- [ ] **Întârziere de ieșire:** după armare, aștepți 5 secunde înainte să devină activă  
- [ ] Un contor care afișează în Serial Monitor câte alarme au fost

## Recapitulare rapidă
1. PIR dă `HIGH` când vede mișcare  
2. `bool armat` ține **starea** sistemului  
3. `!` inversează o valoare  
4. `&&` înseamnă „și”: ambele condiții trebuie să fie adevărate

## Pe placa reală *(opțional)*
PIR-ul fizic (HC-SR501) are 2 potențiometre mici: sensibilitate și durată. Alimentează-l la 5V.

## Quiz scurt
- Ce face `armat = !armat`?  
- De ce avem `delay(300)` după buton?  
- Ce ar face alarma dacă am scrie `||` în loc de `&&`?

## Temă
Desenează schema unei alarme pentru camera ta. Unde ai pune senzorul PIR și de ce?
