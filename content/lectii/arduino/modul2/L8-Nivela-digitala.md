# Lecția 8 — Nivela digitală
**Modulul 2 · Senzori**  
**Code Maker Club · Sensor Scout**

> Azi folosești **senzori de înclinare** (tilt) ca să construiești o nivelă: LED-urile îți arată încotro e înclinat obiectul.  
> Proiect: **„Nivela mea”** · `Prenume_Nume_A2_L08`

---

## Obiectiv
La finalul orei ai o nivelă care arată dacă un obiect e drept sau înclinat.  
**Minim:** un senzor de înclinare + LED: LED-ul se aprinde când înclini.  
**Complet:** Minim + **doi senzori** (stânga / dreapta) + 3 LED-uri (stânga, **centru = drept**, dreapta) + **bip** când e perfect drept.

## De ce contează
Telefoanele, camerele foto și dronele știu cum sunt orientate. Un senzor de înclinare e cea mai simplă versiune a acestei idei: un **întrerupător** care se închide când îl înclini.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7 · digital vs analogic |
| 10–30 | Cum merge senzorul de înclinare |
| 30–60 | Un senzor + LED |
| 60–105 | Doi senzori + nivela |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · 2 × **Tilt Sensor** · 3 × LED · 3 × Resistor 220 Ω · Piezo · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A2_L08`

### 2) Cum merge
Senzorul de înclinare are o bilă metalică mică. Când îl înclini într-o direcție, bila **închide contactul** dintre doi pini, ca un buton. Îl tratăm exact ca pe un **buton** cu `INPUT_PULLUP`:

| Piesă | Se conectează |
|-------|---------------|
| **Tilt stânga** | un pin la **2**, celălalt la **GND** |
| **Tilt dreapta** | un pin la **3**, celălalt la **GND** |
| **LED stânga (galben)** | pin **5** → 220 Ω → anod · catod → GND |
| **LED centru (verde)** | pin **6** → 220 Ω → anod · catod → GND |
| **LED dreapta (galben)** | pin **7** → 220 Ω → anod · catod → GND |
| **Piezo** | pin **8** și **GND** |

În Tinkercad poți **roti** senzorul: dai click pe el și folosești butonul de rotire din bara de sus.

> Montezi cei doi senzori **în oglindă**: unul se închide când înclini spre stânga, celălalt spre dreapta.

### 3) Minim — un senzor, un LED

```cpp
const int TILT = 2;
const int LED = 6;

void setup() {
  pinMode(TILT, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
}

void loop() {
  bool inclinat = (digitalRead(TILT) == LOW);
  digitalWrite(LED, inclinat);
}
```

`digitalRead(TILT) == LOW` înseamnă „contact închis” (ca la butonul apăsat).

### 4) Complet — nivela

```cpp
const int TILT_ST = 2;
const int TILT_DR = 3;
const int LED_ST = 5;
const int LED_CENTRU = 6;
const int LED_DR = 7;
const int BUZZER = 8;

void setup() {
  pinMode(TILT_ST, INPUT_PULLUP);
  pinMode(TILT_DR, INPUT_PULLUP);
  pinMode(LED_ST, OUTPUT);
  pinMode(LED_CENTRU, OUTPUT);
  pinMode(LED_DR, OUTPUT);
}

void loop() {
  bool stanga = (digitalRead(TILT_ST) == LOW);
  bool dreapta = (digitalRead(TILT_DR) == LOW);
  bool drept = !stanga && !dreapta;

  digitalWrite(LED_ST, stanga);
  digitalWrite(LED_DR, dreapta);
  digitalWrite(LED_CENTRU, drept);

  if (drept) {
    tone(BUZZER, 1000, 50);
    delay(500);
  } else {
    noTone(BUZZER);
  }
  delay(20);
}
```

| Stânga | Dreapta | Rezultat |
|--------|---------|----------|
| închis | deschis | LED stânga |
| deschis | închis | LED dreapta |
| deschis | deschis | **drept** (centru + bip) |
| închis | închis | scuturat sau răsturnat (ambele LED-uri laterale) |

### 5) Nivela cu număr de înclinări
Bonus util: numără de câte ori ai scuturat senzorul (ca un **pedometru** simplu):

```cpp
const int TILT = 2;

int pasi = 0;
bool stareAnterioara = false;

void setup() {
  pinMode(TILT, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  bool stare = (digitalRead(TILT) == LOW);

  if (stare && !stareAnterioara) {
    pasi++;
    Serial.print("Pasi: ");
    Serial.println(pasi);
  }
  stareAnterioara = stare;
  delay(20);
}
```

Numărăm doar **schimbarea** din „deschis” în „închis” (`stare && !stareAnterioara`), nu cât timp rămâne închis. Același truc de „detectare front” e util la orice buton.

---

## Greșeli frecvente
1. **Merge invers** — contactul închis = `LOW`, nu `HIGH`.  
2. **Mereu aprins** — senzorul nu are un pin la GND.  
3. **Nu reacționează** — ai uitat `INPUT_PULLUP`.  
4. **Pasul se numără de zeci de ori** — numeri tot timpul cât e închis, nu doar schimbarea.  
5. **Ambele LED-uri laterale aprinse** — senzorii nu sunt montați în oglindă.

---

## De făcut azi — „Nivela mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Un senzor aprinde un LED |
| **Complet** | Doi senzori, 3 LED-uri și bip la „drept” |

### Pasul 1 — Minim
- [ ] Senzor cu `INPUT_PULLUP`  
- [ ] LED reacționează la înclinare  

### Pasul 2 — Complet
- [ ] 2 senzori în oglindă  
- [ ] Variabila `drept` = niciunul închis  
- [ ] Numele `A2_L08` e corect

---

## Bonus
- [ ] Adaugă **pedometrul** (secțiunea 5) și afișează pașii  
- [ ] Un LED care clipește rapid când scuturi mult

## Recapitulare rapidă
1. Senzorul de înclinare = un **întrerupător** cu bilă  
2. `INPUT_PULLUP` → închis = `LOW`  
3. `bool` ajută la citirea codului  
4. „Front” = momentul în care starea se **schimbă**

## Pe placa reală *(opțional)*
Senzorii cu bilă sunt ieftini, dar sensibili la vibrații. Accelerometrele (ADXL345, MPU6050) măsoară înclinarea cu precizie, sunt tema unui curs avansat.

## Quiz scurt
- De ce folosim `INPUT_PULLUP` și la senzorul de înclinare?  
- Ce înseamnă `!stanga && !dreapta`?  
- Cum numărăm doar „schimbările”?

## Temă
Gândește-te la 3 obiecte care ar putea avea senzor de înclinare (ex. lanternă, ceas, mașinuță).
