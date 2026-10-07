# Lecția 7 — Ghiveciul care cere apă
**Modulul 2 · Senzori**  
**Code Maker Club · Sensor Scout**

> Azi faci o plantă „vorbitoare”: un senzor de **umiditate a solului** îți spune când are nevoie de apă.  
> Proiect: **„Planta mea”** · `Prenume_Nume_A2_L07`

---

## Obiectiv
La finalul orei ai un ghiveci care **anunță când e uscat**.  
**Minim:** senzor de umiditate + LED roșu care se aprinde când solul e uscat.  
**Complet:** Minim + **procent de umiditate** (0–100 %) în Serial Monitor + 3 LED-uri (uscat / ok / ud) + buzzer care ți-o reamintește.

## De ce contează
Sistemele de irigații inteligente economisesc apă și salvează plante. Ele pornesc de la ce faci azi: **citesc, compară și anunță**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L6 · stare |
| 10–30 | Circuitul cu senzorul de sol |
| 30–60 | Calibrare: uscat vs ud |
| 60–100 | Procente cu `map` + 3 LED-uri |
| 100–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **Soil Moisture Sensor** · 3 × LED (roșu, verde, albastru) · 3 × Resistor 220 Ω · Piezo · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A2_L07`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **Senzor sol · semnal** | **A0** |
| **Senzor sol · alimentare** | **5V** |
| **Senzor sol · GND** | **GND** |
| **LED roșu** (uscat) | pin **4** → 220 Ω → anod · catod → GND |
| **LED verde** (ok) | pin **5** → 220 Ω → anod · catod → GND |
| **LED albastru** (prea ud) | pin **6** → 220 Ω → anod · catod → GND |
| **Piezo** | pin **8** și **GND** |

În Tinkercad, dai click pe senzor și muți glisorul de umiditate.

### 3) Calibrare
Fiecare senzor dă alte valori, așa că începem cu **măsurarea**:

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(analogRead(A0));
  delay(300);
}
```

Completează:

| Situație | Valoare |
|----------|---------|
| Sol complet uscat (glisor la minim) | ____ |
| Sol ud (glisor la maxim) | ____ |

În simulator, valoarea **crește** cu umiditatea. Dacă la senzorul real e invers, schimbi ordinea în `map`.

### 4) Minim — „mi-e sete”

```cpp
const int SENZOR = A0;
const int LED_ROSU = 4;
const int PRAG_USCAT = 300;

void setup() {
  pinMode(LED_ROSU, OUTPUT);
}

void loop() {
  int umiditate = analogRead(SENZOR);

  if (umiditate < PRAG_USCAT) {
    digitalWrite(LED_ROSU, HIGH);
  } else {
    digitalWrite(LED_ROSU, LOW);
  }
  delay(200);
}
```

Pune la `PRAG_USCAT` o valoare luată din calibrare.

### 5) Complet — procente și 3 LED-uri

```cpp
const int SENZOR = A0;
const int LED_ROSU = 4;
const int LED_VERDE = 5;
const int LED_ALBASTRU = 6;
const int BUZZER = 8;

const int VAL_USCAT = 0;
const int VAL_UD = 700;

void setup() {
  pinMode(LED_ROSU, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_ALBASTRU, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int brut = analogRead(SENZOR);
  int procent = map(brut, VAL_USCAT, VAL_UD, 0, 100);
  procent = constrain(procent, 0, 100);

  digitalWrite(LED_ROSU, LOW);
  digitalWrite(LED_VERDE, LOW);
  digitalWrite(LED_ALBASTRU, LOW);

  if (procent < 30) {
    digitalWrite(LED_ROSU, HIGH);
    tone(BUZZER, 500, 100);
  } else if (procent < 70) {
    digitalWrite(LED_VERDE, HIGH);
  } else {
    digitalWrite(LED_ALBASTRU, HIGH);
  }

  Serial.print("Umiditate: ");
  Serial.print(procent);
  Serial.println(" %");
  delay(1000);
}
```

| Umiditate | Lumina | Ce înseamnă |
|-----------|--------|-------------|
| sub 30 % | roșu + bip | Dă-mi apă! |
| 30–69 % | verde | Sunt bine |
| 70 % sau mai mult | albastru | Prea multă apă |

`VAL_UD = 700` e doar un exemplu: pune valoarea măsurată de tine la calibrare.

### 6) De ce `map` + `constrain`
- `map` transformă valorile senzorului într-o scală **0–100**.  
- `constrain` o ține în limite, chiar dacă senzorul dă o valoare mai mare.

---

## Greșeli frecvente
1. **Mereu 0 %** — senzorul nu e alimentat sau semnalul nu e la A0.  
2. **Procente negative** — ai uitat `constrain` sau calibrarea e greșită.  
3. **Prea sensibil** — mărește zona „ok”.  
4. **Buzzerul sună continuu** — folosește `tone` cu **durată** (al treilea argument).  
5. **Merge invers** (cu senzorul real) — inversează valorile în `map`.

---

## De făcut azi — „Planta mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Un LED roșu când solul e uscat |
| **Complet** | Minim + procente + 3 LED-uri + bip |

### Pasul 1 — Minim
- [ ] Calibrare notată în tabel  
- [ ] LED roșu funcționează  

### Pasul 2 — Complet
- [ ] `map` + `constrain` pentru procente  
- [ ] 3 trepte cu LED-uri  
- [ ] Numele `A2_L07` e corect

---

## Bonus
- [ ] Reamintește-ți **o dată la 10 secunde**, nu continuu (idee: folosește `millis()`)  
- [ ] Afișează „Mulțumesc!” când umiditatea crește rapid

## Recapitulare rapidă
1. Senzorul de sol dă o valoare analogică  
2. Calibrăm înainte de a alege praguri  
3. `map` + `constrain` = procente sigure  
4. Mai multe trepte = mai multă informație

## Pe placa reală *(opțional)*
Senzorii de sol ieftini (rezistivi) se corodează în timp. Alimentează-i doar când citești, nu permanent.

## Quiz scurt
- De ce calibrăm senzorul?  
- Ce face `constrain(procent, 0, 100)`?  
- Ce LED se aprinde la 85 % umiditate?

## Temă
Fă o listă cu 3 plante și de câtă apă are nevoie fiecare (multă / medie / puțină). Ce praguri ai alege?
