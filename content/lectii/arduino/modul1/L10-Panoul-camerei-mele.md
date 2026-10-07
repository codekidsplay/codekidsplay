# Lecția 10 — Panoul camerei mele
**Modulul 1 · Primele circuite**  
**Code Kids Play · Circuit Starter**

> Azi îți faci un **panou de control** pentru camera ta: lampă RGB cu **moduri**, reglaj cu potențiometru și **sunet** la schimbarea modului.  
> Proiect: **„Panoul meu”** · `Prenume_Nume_A1_L10`

---

## Obiectiv
La finalul modulului ai un proiect care **combină tot ce ai învățat**: LED RGB, buton, potențiometru, buzzer.  
**Minim:** buton care schimbă între **3 moduri** (stins · alb reglabil · culoare reglabilă).  
**Complet:** Minim + modul „**petrecere**” (culori aleatorii) + **bip** la fiecare schimbare de mod + prezentare de 2 minute.

## De ce contează
Un proiect adevărat nu e o singură piesă, ci **mai multe care lucrează împreună**. Azi pui la un loc tot Modulul 1 și îl prezinți.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Recap modul 1 · planul proiectului |
| 15–40 | Circuitul complet (RGB + buton + potențiometru + buzzer) |
| 40–75 | Modurile cu `switch` |
| 75–100 | Complet: petrecere + bip |
| 100–120 | Prezentare + quiz final al modulului |

**Componente azi:** Arduino Uno · Breadboard · **RGB LED** · 3 × Resistor 220 Ω · **Potentiometer** · **Pushbutton** · **Piezo** · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A1_L10`

### 2) Conexiuni

| Piesă | Pin | Observații |
|-------|-----|------------|
| LED RGB — **Roșu** | **9** | rezistor 220 Ω |
| LED RGB — **Verde** | **10** | rezistor 220 Ω |
| LED RGB — **Albastru** | **6** | rezistor 220 Ω |
| LED RGB — **Comun** | GND | catod comun |
| **Potențiometru** | **A0** | capete la 5V și GND |
| **Buton** | **2** | picior diagonal la GND |
| **Piezo** | **8** | celălalt picior la GND |

### 3) Schema modurilor

| Mod | Ce face lampa |
|-----|---------------|
| **0** | Stinsă |
| **1** | Albă, luminozitate cu potențiometrul |
| **2** | Culoare aleasă cu potențiometrul (de la roșu la albastru) |
| **3** (Complet) | Petrecere: culori aleatorii |

Fiecare apăsare pe buton trece la **modul următor**; după ultimul, revii la 0.

### 4) Minim — 3 moduri

```cpp
const int R = 9;
const int G = 10;
const int B = 6;
const int POT = A0;
const int BUTON = 2;

int mod = 0;

void culoare(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}

void setup() {
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    mod = (mod + 1) % 3;
    delay(300);
  }

  int p = analogRead(POT);

  switch (mod) {
    case 0:
      culoare(0, 0, 0);
      break;
    case 1: {
      int luminozitate = map(p, 0, 1023, 0, 255);
      culoare(luminozitate, luminozitate, luminozitate);
      break;
    }
    case 2: {
      int r = map(p, 0, 1023, 255, 0);
      int b = map(p, 0, 1023, 0, 255);
      culoare(r, 0, b);
      break;
    }
  }
}
```

**Ce e nou**

- `mod = (mod + 1) % 3;` — `%` e **restul împărțirii**. Din 0 → 1 → 2 → 0 → … mereu înapoi la 0.  
- `switch (mod) { case 0: ... }` alege **un singur bloc** în funcție de valoare. Mai curat decât mai multe `if`.  
- Fiecare `case` se termină cu `break`.

### 5) Complet — petrecere și bip

```cpp
const int R = 9;
const int G = 10;
const int B = 6;
const int POT = A0;
const int BUTON = 2;
const int BUZZER = 8;
const int NR_MODURI = 4;

int mod = 0;

void culoare(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}

void bip(int ori) {
  for (int i = 0; i < ori; i++) {
    tone(BUZZER, 880, 80);
    delay(150);
  }
}

void setup() {
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(BUZZER, OUTPUT);
  randomSeed(analogRead(A1));
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    mod = (mod + 1) % NR_MODURI;
    bip(mod + 1);          // 1 bip pentru modul 0, 2 pentru 1, etc.
    delay(200);
  }

  int p = analogRead(POT);

  switch (mod) {
    case 0:
      culoare(0, 0, 0);
      break;
    case 1: {
      int luminozitate = map(p, 0, 1023, 0, 255);
      culoare(luminozitate, luminozitate, luminozitate);
      break;
    }
    case 2: {
      int r = map(p, 0, 1023, 255, 0);
      int b = map(p, 0, 1023, 0, 255);
      culoare(r, 0, b);
      break;
    }
    case 3:
      culoare(random(256), random(256), random(256));
      delay(map(p, 0, 1023, 60, 600));   // viteza petrecerii
      break;
  }
}
```

La modul 3, potențiometrul reglează **cât de repede** se schimbă culorile.

### 6) Prezentare (2 minute)
Spune colegilor:
1. Ce face panoul tău (câte moduri are).  
2. Care piese ai folosit și de ce.  
3. Ce lecție din modul a fost cea mai grea și cum ai rezolvat-o.

---

## Greșeli frecvente
1. **Modul sare prea repede** — lipsește `delay` după apăsarea butonului.  
2. **Eroare în `switch`** — un `case` cu variabile noi are nevoie de acolade `{ }`.  
3. **Lampa e mereu aceeași** — ai uitat `break` între cazuri.  
4. **Culoarea la petrecere nu se schimbă** — lipsește `randomSeed` sau `delay` mare.  
5. **Pinul 11 cu `tone`** — am evitat 3 și 11 tocmai din acest motiv; nu muta albastrul pe 11.

---

## De făcut azi — „Panoul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 3 moduri cu `switch`, schimbate cu butonul |
| **Complet** | Minim + mod „petrecere” + bip + prezentare |

### Pasul 1 — Minim
- [ ] Circuit complet (RGB, potențiometru, buton)  
- [ ] Funcția `culoare`  
- [ ] `switch` cu 3 cazuri  

### Pasul 2 — Complet
- [ ] Al patrulea mod: petrecere  
- [ ] Buzzer cu bip diferit pentru fiecare mod  
- [ ] Prezentare de 2 minute  
- [ ] Numele `A1_L10` e corect

---

## Bonus
- [ ] Un al cincilea mod: **respirație** (alb care crește și scade)  
- [ ] Un al șaselea mod: **semafor** (roșu, galben, verde, pe rând)

## Verificare finală — Modulul 1
1. Ce face `pinMode(8, OUTPUT)`?  
2. Ce înseamnă `INPUT_PULLUP`?  
3. Care pini permit `analogWrite`?  
4. Ce face `map(x, 0, 1023, 0, 255)`?  
5. Ce e un tablou (`array`)?

## Recapitulare rapidă
1. Un proiect = mai multe piese care lucrează împreună  
2. `switch` alege între moduri  
3. `%` păstrează un număr în interval  
4. Funcțiile (`culoare`, `bip`) fac codul ușor de citit

## Pe placa reală *(opțional)*
Același cod. Poți monta totul pe o foaie de carton ca panou de control adevărat.

## Quiz final al modulului
Alege **un** circuit din Modulul 1 pe care l-ai făcut cu plăcere și explică-l unui coleg în 1 minut.

## Temă
Desenează panoul tău ideal pentru camera ta: ce moduri ar avea și ce piese ar folosi.
