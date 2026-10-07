# Lecția 3 — Termometrul camerei
**Modulul 2 · Senzori**  
**Code Maker Club · Sensor Scout**

> Azi citești **temperatura** cu senzorul **TMP36** și o transformi în **grade Celsius**.  
> Proiect: **„Termometrul meu”** · `Prenume_Nume_A2_L03`

---

## Obiectiv
La finalul orei ai un termometru care afișează temperatura în Serial Monitor.  
**Minim:** TMP36 pe A0 · conversie în °C · valoare afișată la fiecare secundă.  
**Complet:** Minim + **media a 10 citiri** (mai stabilă) · temperatura și în **Fahrenheit**.

## De ce contează
Temperatura e cea mai folosită măsurătoare: termostate, frigidere, sere, vreme. Azi vezi cum o **tensiune** devine **grade**, pas cu pas.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2 · ce măsoară un termometru |
| 10–30 | Circuitul cu TMP36 |
| 30–65 | Formula tensiune → °C |
| 65–100 | Media citirilor + Fahrenheit |
| 100–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **Temperature Sensor [TMP36]** · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A2_L03`

### 2) Conexiuni
TMP36 are **3 picioare**; în Tinkercad treci cursorul peste ele ca să vezi numele. Dacă ții senzorul cu partea **plată** spre tine, ordinea e: **5V · semnal · GND**.

| Picior | Se conectează |
|--------|---------------|
| **5V** (stânga) | **5V** Arduino |
| **Semnal / Vout** (mijloc) | **A0** |
| **GND** (dreapta) | **GND** |

Atenție: dacă pui senzorul invers (5V și GND schimbate), citirile ies aiurea. Verifică numele picioarelor înainte să pornești simularea.

### 3) Formula
TMP36 dă o tensiune care crește cu **10 mV pe grad**, cu o decalare de **0,5 V** (ca să poată arăta și grade negative):

| Pas | Formula | Exemplu (25 °C) |
|-----|---------|-----------------|
| 1. Citire | `valoare = analogRead(A0)` | ≈ 153 |
| 2. Volți | `volti = valoare * 5.0 / 1023.0` | ≈ 0,75 V |
| 3. Grade | `grade = (volti - 0.5) * 100` | ≈ 25 °C |

### 4) Minim

```cpp
const int SENZOR = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int valoare = analogRead(SENZOR);
  float volti = valoare * 5.0 / 1023.0;
  float grade = (volti - 0.5) * 100.0;

  Serial.print("Temperatura: ");
  Serial.print(grade, 1);
  Serial.println(" C");

  delay(1000);
}
```

În Tinkercad, dai click pe TMP36 și muți glisorul de temperatură: valoarea se schimbă.

### 5) Complet — media a 10 citiri
Citirile „tremură” puțin. Media lor e mai stabilă:

```cpp
const int SENZOR = A0;

float citesteTemperatura() {
  long suma = 0;
  for (int i = 0; i < 10; i++) {
    suma += analogRead(SENZOR);
    delay(10);
  }
  float medie = suma / 10.0;
  float volti = medie * 5.0 / 1023.0;
  return (volti - 0.5) * 100.0;
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  float c = citesteTemperatura();
  float f = c * 9.0 / 5.0 + 32.0;

  Serial.print(c, 1);
  Serial.print(" C  =  ");
  Serial.print(f, 1);
  Serial.println(" F");

  delay(1000);
}
```

**Ce e nou**

- `float citesteTemperatura()` e o funcție care **returnează** un rezultat (`return`).  
- `suma += analogRead(...)` înseamnă „adaugă la sumă”.  
- `long` e un întreg mai mare, ca să nu depășim limita la sumă.  
- Formula Fahrenheit: `F = C × 9/5 + 32`.

### 6) Cum verifici că merge
Într-un caiet, compară cu valori cunoscute:

| Situație | Temperatura așteptată |
|----------|----------------------|
| Cameră | ~ 20–25 °C |
| Apă cu gheață | ~ 0 °C |
| Corp uman | ~ 36–37 °C |

---

## Greșeli frecvente
1. **Temperatură ciudată** (ex. 150 °C) — picioarele TMP36 sunt inversate.  
2. **Mereu 0 sau mereu 5 V** — firul de semnal nu merge la A0.  
3. **Împărțire întreagă** — ai scris `5 / 1023` fără `.0` și rezultatul e 0.  
4. **Eroare la `return`** — funcția `float` trebuie să returneze un `float`.  
5. **Valori care sar mult** — folosește media citirilor.

---

## De făcut azi — „Termometrul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Temperatura în °C, la fiecare secundă |
| **Complet** | Minim + medie din 10 citiri + Fahrenheit |

### Pasul 1 — Minim
- [ ] TMP36 conectat corect  
- [ ] Formula tensiune → °C  

### Pasul 2 — Complet
- [ ] Funcția `citesteTemperatura()` cu media  
- [ ] Afișare °C și °F  
- [ ] Numele `A2_L03` e corect

---

## Bonus
- [ ] Afișează „Prea frig” sub 18 °C și „Prea cald” peste 28 °C  
- [ ] Reține **minima** și **maxima** de la pornire

## Recapitulare rapidă
1. TMP36: 10 mV pe grad, decalare 0,5 V  
2. `°C = (volți − 0,5) × 100`  
3. O funcție poate **returna** o valoare  
4. Media citirilor liniștește senzorul

## Pe placa reală *(opțional)*
TMP36 fizic: partea plată spre tine, de la stânga: 5V, semnal, GND. Atenție la polaritate, se încălzește dacă e invers.

## Quiz scurt
- Ce citește Arduino de la TMP36: temperatura sau o tensiune?  
- De ce facem media a 10 citiri?  
- Ce temperatură e 77 °F?  *(Indiciu: invers formulei.)*

## Temă
Măsoară temperatura din 3 locuri diferite din casă (simulat sau real) și notează-le într-un tabel.
