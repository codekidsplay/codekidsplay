# Lecția 5 — Lampa cu reglaj
**Modulul 1 · Primele circuite**  
**Code Kids Play · Circuit Starter**

> Azi citești un **potențiometru** (un buton rotativ) și reglezi **luminozitatea** unui LED cu **PWM**.  
> Proiect: **„Lampa mea”** · `Prenume_Nume_A1_L05`

---

## Obiectiv
La finalul orei ai o lampă a cărei lumină crește sau scade când rotești potențiometrul.  
**Minim:** potențiometru pe **A0** · LED pe **pin 9** · luminozitatea urmează potențiometrul (`analogRead` → `analogWrite`).  
**Complet:** Minim + valori afișate în **Serial Monitor** · LED care „**respiră**” singur (crește și scade lin).

## De ce contează
Până acum totul era **aprins / stins**. Lumea reală e plină de **valori între**: volum, lumină, viteză. Azi înveți cum citește Arduino o valoare între 0 și 1023 și cum o trimite înapoi ca „aproape aprins”.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L4 · becuri cu variator |
| 10–30 | Circuitul cu potențiometru |
| 30–55 | `analogRead` + Serial Monitor |
| 55–90 | `map` + `analogWrite` (PWM) |
| 90–120 | LED care respiră · recap, quiz |

**Componente azi:** Arduino Uno · Breadboard · LED · Resistor 220 Ω · **Potentiometer** · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A1_L05`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **LED** | anod (+) → rezistor 220 Ω → pin **9** (are `~`) · catod (−) → **GND** |
| **Potențiometru** | un picior lateral → **5V** · celălalt picior lateral → **GND** · piciorul **din mijloc** → **A0** |

**Atenție:** nu orice pin merge pentru PWM. Pe Arduino Uno au semnul **`~`**: 3, 5, 6, 9, 10, 11. De aceea folosim pinul 9.

### 3) Citim potențiometrul

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  int valoare = analogRead(A0);
  Serial.println(valoare);
  delay(200);
}
```

Pornești simularea, deschizi **Serial Monitor** și rotești potențiometrul: numerele merg între **0** și **1023**.

### 4) Din 0–1023 în 0–255
`analogWrite` primește valori între **0** (stins) și **255** (cât se poate de aprins). Trebuie să **convertim** intervalul. Pentru asta există `map`:

```cpp
const int POT = A0;
const int LED = 9;

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  int citit = analogRead(POT);
  int luminozitate = map(citit, 0, 1023, 0, 255);
  analogWrite(LED, luminozitate);
}
```

`map(citit, 0, 1023, 0, 255)` = „ia numărul `citit` din intervalul 0–1023 și pune-l în același loc din intervalul 0–255”.

### 5) Ce e PWM
PWM = Arduino **aprinde și stinge LED-ul foarte repede** (de 490 de ori pe secundă). Cu cât stă mai mult aprins, cu atât **pare mai luminos**. Nu e un curent „mai mic”; e o păcăleală pentru ochi.

### 6) Complet — afișare + respirație
**Valorile în Serial Monitor:**

```cpp
const int POT = A0;
const int LED = 9;

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int citit = analogRead(POT);
  int luminozitate = map(citit, 0, 1023, 0, 255);
  analogWrite(LED, luminozitate);

  Serial.print("Citit: ");
  Serial.print(citit);
  Serial.print("  Lumina: ");
  Serial.println(luminozitate);
  delay(100);
}
```

**LED care „respiră” (fără potențiometru):**

```cpp
const int LED = 9;

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  for (int i = 0; i <= 255; i++) {
    analogWrite(LED, i);
    delay(5);
  }
  for (int i = 255; i >= 0; i--) {
    analogWrite(LED, i);
    delay(5);
  }
}
```

Primul `for` **crește** lumina, al doilea o **scade**. Schimbă `delay(5)` ca să respire mai repede sau mai încet.

---

## Greșeli frecvente
1. **LED-ul e fie stins, fie aprins complet** — ai folosit un pin fără `~` sau `digitalWrite` în loc de `analogWrite`.  
2. **Potențiometrul nu face nimic** — piciorul din mijloc nu e la **A0**.  
3. **Lumina merge invers** — ai inversat 5V și GND pe potențiometru (sau schimbi `map(..., 255, 0)`).  
4. **Eroare la `A0`** — scrie `A0`, nu `0`.  
5. **Prea mult în Serial Monitor** — folosește `delay(100)` ca să poți citi.

---

## De făcut azi — „Lampa mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Potențiometru → luminozitatea LED-ului |
| **Complet** | Minim + Serial Monitor + LED care respiră |

### Pasul 1 — Minim
- [ ] LED pe pin 9, potențiometru pe A0  
- [ ] `map` + `analogWrite`  

### Pasul 2 — Complet
- [ ] Valorile apar în Serial Monitor  
- [ ] Exemplul cu respirație merge  
- [ ] Numele `A1_L05` e corect

---

## Bonus
- [ ] Un al doilea LED pe pin 10, care e **mai luminos când primul e mai slab** (invers)  
- [ ] Lampa **nu se stinge complet**: luminozitate minimă 20 (`map(citit, 0, 1023, 20, 255)`)

## Recapitulare rapidă
1. `analogRead(A0)` → 0–1023  
2. `map(x, 0, 1023, 0, 255)` convertește intervalul  
3. `analogWrite(pin, 0–255)` merge doar pe pini cu `~`  
4. Serial Monitor te ajută să **vezi** valorile

## Pe placa reală *(opțional)*
Potențiometrul fizic are 3 picioare, ca în simulator. Mijlocul merge la A0, laturile la 5V și GND.

## Quiz scurt
- Ce valori poate da `analogRead`?  
- De ce nu poți folosi pinul 7 pentru `analogWrite`?  
- Ce face funcția `map`?

## Temă
Gândește-te la un aparat din casă care are un buton rotativ (radio, aragaz, lampă) și scrie ce valoare reglează.
