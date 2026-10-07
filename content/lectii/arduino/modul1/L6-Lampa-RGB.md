# Lecția 6 — Lampa RGB a camerei
**Modulul 1 · Primele circuite**  
**Code Maker Club · Circuit Starter**

> Azi amesteci **lumină roșie, verde și albastră** ca să obții orice culoare cu un **LED RGB**.  
> Proiect: **„Lampa mea colorată”** · `Prenume_Nume_A1_L06`

---

## Obiectiv
La finalul orei ai un LED RGB care poate afișa **culori diferite**, comandate din cod.  
**Minim:** LED RGB conectat pe 3 pini PWM · funcția `culoare(r, g, b)` · 6 culori afișate pe rând.  
**Complet:** Minim + **mixer de culori** cu 3 potențiometre (câte unul pentru fiecare culoare de bază).

## De ce contează
Ecranul telefonului, televizorul și luminile de petrecere folosesc **același truc**: trei lumini mici (roșu, verde, albastru) care, amestecate, dau **orice culoare**. Azi îl faci tu.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L5 · cum se amestecă culorile cu lumină |
| 10–30 | Circuitul cu LED RGB |
| 30–60 | Funcția `culoare` + 6 culori |
| 60–100 | Mixer cu 3 potențiometre |
| 100–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · **RGB LED** · 3 × Resistor 220 Ω · (Complet) 3 × Potentiometer · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A1_L06`

### 2) LED-ul RGB
Un LED RGB are **4 picioare**: câte unul pentru **roșu**, **verde**, **albastru** și unul **comun**. În Tinkercad, trece cursorul peste fiecare picior ca să vezi numele. Folosim varianta cu **catod comun** (piciorul comun merge la GND).

| Picior LED | Se conectează la |
|------------|-------------------|
| **Roșu (R)** | rezistor 220 Ω → pin **9** |
| **Verde (G)** | rezistor 220 Ω → pin **10** |
| **Albastru (B)** | rezistor 220 Ω → pin **6** |
| **Comun (catod, −)** | **GND** |

Toți cei trei pini (9, 10, 6) au `~`, deci merg cu PWM. Evităm pinii 3 și 11, fiindcă `tone` (lecția 7) îi încurcă.

### 3) Funcția `culoare`
Pui toată logica într-un singur loc:

```cpp
const int R = 9;
const int G = 10;
const int B = 6;

void culoare(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}

void setup() {
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
}

void loop() {
  culoare(255, 0, 0);     // roșu
  delay(1000);
  culoare(0, 255, 0);     // verde
  delay(1000);
  culoare(0, 0, 255);     // albastru
  delay(1000);
  culoare(255, 255, 0);   // galben
  delay(1000);
  culoare(255, 0, 255);   // mov
  delay(1000);
  culoare(255, 255, 255); // alb
  delay(1000);
}
```

### 4) Amestecul culorilor (cu lumină)

| Amestec | Rezultat |
|---------|----------|
| Roșu + Verde | **Galben** |
| Roșu + Albastru | **Mov** (magenta) |
| Verde + Albastru | **Turcoaz** (cyan) |
| Toate trei | **Alb** |
| Niciuna | **Negru** (stins) |

Atenție: cu **lumină**, amestecul e diferit de cel cu vopsele.

### 5) Valori intermediare
Valorile pot fi orice între 0 și 255. Încearcă:

```cpp
culoare(255, 128, 0);   // portocaliu
culoare(255, 105, 180); // roz
culoare(64, 224, 208);  // turcoaz deschis
```

### 6) Complet — mixer cu 3 potențiometre
Fiecare potențiometru comandă o culoare:

| Potențiometru | Pin | Culoare |
|---------------|-----|---------|
| 1 | **A0** | Roșu |
| 2 | **A1** | Verde |
| 3 | **A2** | Albastru |

Fiecare potențiometru: un capăt la 5V, celălalt la GND, mijlocul la pinul indicat.

```cpp
const int R = 9;
const int G = 10;
const int B = 6;

void culoare(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}

void setup() {
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
}

void loop() {
  int r = map(analogRead(A0), 0, 1023, 0, 255);
  int g = map(analogRead(A1), 0, 1023, 0, 255);
  int b = map(analogRead(A2), 0, 1023, 0, 255);
  culoare(r, g, b);
}
```

Rotește pe rând: vezi cum apar **portocaliul**, **roz-ul**, **turcoazul**.

---

## Greșeli frecvente
1. **O culoare lipsește** — un picior nu e conectat la pin sau n-are rezistor.  
2. **Culorile par amestecate greșit** — ai încurcat picioarele (verifică numele în Tinkercad).  
3. **Nu se aprinde nimic** — piciorul comun nu e la GND.  
4. **LED-ul RGB „anod comun”** — dacă ai un model cu anod comun, comun merge la 5V și valorile se inversează (`255 - r`).  
5. **Rezistor lipsă** — fiecare culoare are propriul rezistor.

---

## De făcut azi — „Lampa mea colorată”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | LED RGB · funcția `culoare` · 6 culori pe rând |
| **Complet** | Minim + mixer cu 3 potențiometre |

### Pasul 1 — Minim
- [ ] LED RGB cu 3 rezistoare pe pinii 9, 10, 6  
- [ ] Funcția `culoare(r, g, b)`  
- [ ] 6 culori în `loop()`  

### Pasul 2 — Complet
- [ ] 3 potențiometre pe A0, A1, A2  
- [ ] Culoarea se schimbă în timp real  
- [ ] Numele `A1_L06` e corect

---

## Bonus
- [ ] Găsește culoarea ta preferată și scrie valorile `(r, g, b)` într-un comentariu  
- [ ] **Curcubeu**: trece prin roșu, portocaliu, galben, verde, albastru, mov, fiecare 500 ms

## Recapitulare rapidă
1. RGB = Roșu + Verde + Albastru  
2. Fiecare culoare se comandă cu `analogWrite` (0–255)  
3. Funcția `culoare(r, g, b)` păstrează codul curat  
4. Valorile intermediare dau culori noi

## Pe placa reală *(opțional)*
Verifică dacă LED-ul tău RGB e cu **catod comun** sau **anod comun**; la anod comun, comunul merge la 5V și valorile se inversează.

## Quiz scurt
- Ce culoare obții din roșu + verde?  
- De ce folosim pinii 9, 10 și 6?  
- Ce valori are `culoare` pentru alb?

## Temă
Scrie în caiet 5 culori noi, cu valorile `(r, g, b)` pe care le-ai încercat și numele lor.
