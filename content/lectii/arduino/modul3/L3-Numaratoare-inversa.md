# Lecția 3 — Numărătoare inversă (7 segmente)
**Modulul 3 · Afișaj și mișcare**  
**Code Kids Play · Display Maker**

> Azi lucrezi cu **afișajul cu 7 segmente** și faci o numărătoare inversă de la 9 la 0, ca la lansarea unei rachete.  
> Proiect: **„Lansarea rachetei”** · `Prenume_Nume_A3_L03`

---

## Obiectiv
La finalul orei ai o numărătoare inversă care se termină cu un **bip lung**.  
**Minim:** afișezi pe rând cifrele 9, 8, 7 … 0.  
**Complet:** Minim + **buton de start** + buzzer la final + LED care se aprinde la „Decolare!”.

## De ce contează
Cifrele de pe ceasuri, cuptoare și aparate digitale sunt făcute din segmente. Un afișaj cu 7 segmente e **7 LED-uri** puse în forma lui 8; tu decizi care se aprind.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2 · pagini |
| 10–35 | Conexiunile (7 segmente + 7 rezistori) |
| 35–70 | Tabel de cifre cu `array` 2D |
| 70–105 | Numărătoare, buton, bip |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **7 Segment Display** (catod comun) · 7 × Resistor 220 Ω · Pushbutton · Piezo · LED · Resistor 220 Ω · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A3_L03`

### 2) Segmentele
Segmentele sunt numite **a, b, c, d, e, f, g**:

```
 _a_
f|   |b
 |_g_|
e|   |c
 |_d_|
```

### 3) Conexiuni
Afișajul cu **catod comun** are un pin comun (GND), iar fiecare segment are propriul pin. Pune **un rezistor de 220 Ω pe fiecare segment**.

| Segment | Pin Arduino (prin 220 Ω) |
|---------|--------------------------|
| a | **2** |
| b | **3** |
| c | **4** |
| d | **5** |
| e | **6** |
| f | **7** |
| g | **8** |
| COM (catod comun) | **GND** |

| Piesă | Se conectează |
|-------|---------------|
| **Buton** | pin **10** și **GND** |
| **Piezo** | pin **11** și **GND** |
| **LED** | pin **12** → 220 Ω → anod · catod → GND |

> Pe afișajul din Tinkercad, treci cursorul peste pini ca să vezi literele a–g. Dacă ai un afișaj cu **anod comun**, îl legi la 5V și logica se inversează.

### 4) Tabelul cifrelor
Fiecare cifră înseamnă o combinație de segmente. `1` = aprins, `0` = stins. Ordinea: **a b c d e f g**.

| Cifra | a | b | c | d | e | f | g |
|-------|---|---|---|---|---|---|---|
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 2 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |
| 3 | 1 | 1 | 1 | 1 | 0 | 0 | 1 |
| 4 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |
| 5 | 1 | 0 | 1 | 1 | 0 | 1 | 1 |
| 6 | 1 | 0 | 1 | 1 | 1 | 1 | 1 |
| 7 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| 8 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |

### 5) Minim — cifrele pe rând

```cpp
const int SEGMENTE[7] = {2, 3, 4, 5, 6, 7, 8};

const byte CIFRE[10][7] = {
  {1, 1, 1, 1, 1, 1, 0},
  {0, 1, 1, 0, 0, 0, 0},
  {1, 1, 0, 1, 1, 0, 1},
  {1, 1, 1, 1, 0, 0, 1},
  {0, 1, 1, 0, 0, 1, 1},
  {1, 0, 1, 1, 0, 1, 1},
  {1, 0, 1, 1, 1, 1, 1},
  {1, 1, 1, 0, 0, 0, 0},
  {1, 1, 1, 1, 1, 1, 1},
  {1, 1, 1, 1, 0, 1, 1}
};

void afiseaza(int cifra) {
  for (int i = 0; i < 7; i++) {
    digitalWrite(SEGMENTE[i], CIFRE[cifra][i]);
  }
}

void setup() {
  for (int i = 0; i < 7; i++) {
    pinMode(SEGMENTE[i], OUTPUT);
  }
}

void loop() {
  for (int c = 9; c >= 0; c--) {
    afiseaza(c);
    delay(1000);
  }
}
```

- `CIFRE[10][7]` e un **tablou cu două dimensiuni**: 10 rânduri (cifre), 7 coloane (segmente).  
- `afiseaza(c)` parcurge cele 7 segmente și le aprinde / stinge după tabel.  
- `for (int c = 9; c >= 0; c--)` numără **înapoi** (`c--` scade cu 1).

### 6) Complet — start, bip, decolare

```cpp
const int SEGMENTE[7] = {2, 3, 4, 5, 6, 7, 8};
const int BUTON = 10;
const int BUZZER = 11;
const int LED = 12;

const byte CIFRE[10][7] = {
  {1, 1, 1, 1, 1, 1, 0},
  {0, 1, 1, 0, 0, 0, 0},
  {1, 1, 0, 1, 1, 0, 1},
  {1, 1, 1, 1, 0, 0, 1},
  {0, 1, 1, 0, 0, 1, 1},
  {1, 0, 1, 1, 0, 1, 1},
  {1, 0, 1, 1, 1, 1, 1},
  {1, 1, 1, 0, 0, 0, 0},
  {1, 1, 1, 1, 1, 1, 1},
  {1, 1, 1, 1, 0, 1, 1}
};

void afiseaza(int cifra) {
  for (int i = 0; i < 7; i++) {
    digitalWrite(SEGMENTE[i], CIFRE[cifra][i]);
  }
}

void stinge() {
  for (int i = 0; i < 7; i++) {
    digitalWrite(SEGMENTE[i], LOW);
  }
}

void setup() {
  for (int i = 0; i < 7; i++) {
    pinMode(SEGMENTE[i], OUTPUT);
  }
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  afiseaza(9);
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    digitalWrite(LED, LOW);

    for (int c = 9; c >= 0; c--) {
      afiseaza(c);
      tone(BUZZER, 800, 100);
      delay(1000);
    }

    digitalWrite(LED, HIGH);
    tone(BUZZER, 1500, 1500);
    delay(2000);
    digitalWrite(LED, LOW);
    afiseaza(9);
  }
}
```

**Cum merge:** apeși butonul → numără 9…0 cu un bip scurt la fiecare cifră → la 0 sună lung și se aprinde LED-ul („Decolare!”) → totul revine la 9.

---

## Greșeli frecvente
1. **Cifre ciudate** — un segment e conectat la alt pin față de `SEGMENTE[]`.  
2. **Toate segmentele aprinse** — COM la 5V (anod comun) în loc de GND.  
3. **Segmente slabe** — lipsesc rezistorii sau valorile sunt prea mari.  
4. **Eroare la compilare** — lipsește `;` după acolada tabloului.  
5. **Pornește singură** — butonul n-are `INPUT_PULLUP`.

---

## De făcut azi — „Lansarea rachetei”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Numără 9 → 0 |
| **Complet** | Minim + buton + bip + LED la final |

### Pasul 1 — Minim
- [ ] 7 segmente conectate corect  
- [ ] Numărătoarea merge  

### Pasul 2 — Complet
- [ ] Butonul pornește numărătoarea  
- [ ] Bip la fiecare cifră și bip lung la final  
- [ ] Numele `A3_L03` e corect

---

## Bonus
- [ ] Numără de la **5** (modifică ciclul)  
- [ ] Dacă apeși butonul **în timpul** numărătorii, afișează litera **E** (de la „eroare”): segmentele a, d, e, f, g

## Recapitulare rapidă
1. 7 segmente = 7 LED-uri, câte un pin  
2. Tabelul cifrelor stă într-un **tablou 2D**  
3. `for` în jos cu `c--`  
4. O funcție `afiseaza()` ține codul curat

## Pe placa reală *(opțional)*
Afișajele reale pot avea **anod comun** (logică inversată) și 2–4 cifre. Cu mai multe cifre se folosește multiplexarea sau un circuit dedicat (TM1637).

## Quiz scurt
- Câte segmente are o cifră?  
- Ce face `c--`?  
- Care segmente sunt aprinse la cifra 7?

## Temă
Completează un tabel pentru literele **A, b, C, d, E, F** (cum le-ai afișa pe 7 segmente?).
