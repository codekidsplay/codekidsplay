# Lecția 4 — Trecere de pietoni
**Modulul 1 · Primele circuite**  
**Code Kids Play · Circuit Starter**

> Azi construiești un **semafor** pentru mașini cu **buton de traversare** pentru pietoni.  
> Proiect: **„Trecerea mea”** · `Prenume_Nume_A1_L04`

---

## Obiectiv
La finalul orei ai un semafor cu 3 LED-uri pentru mașini, un LED verde pentru pietoni și un buton care **cere traversarea**.  
**Minim:** semafor cu 3 LED-uri care merge singur (verde → galben → roșu → verde).  
**Complet:** Minim + buton: când e apăsat, mașinile se opresc și **pietonul primește verde** câteva secunde, apoi totul revine.

## De ce contează
Semafoarele sunt un exemplu perfect de **stări**: ceva se află într-o stare (verde, galben, roșu) și trece în alta când se întâmplă ceva. Aceeași idee e în jocuri, în ascensoare, în orice aparat.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L3 · cum funcționează un semafor |
| 10–35 | Cele 3 LED-uri pentru mașini |
| 35–60 | Semafor automat, cu funcții |
| 60–95 | Buton pentru pietoni |
| 95–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · LED roșu, galben, verde (mașini) · LED verde sau alb (pietoni) · 4 × Resistor 220 Ω · Pushbutton · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A1_L04`

### 2) Conexiuni

| Piesă | Pin | Observații |
|-------|-----|------------|
| LED **roșu** (mașini) | **11** | rezistor 220 Ω, catod la GND |
| LED **galben** (mașini) | **10** | idem |
| LED **verde** (mașini) | **9** | idem |
| LED **pietoni** | **6** | idem |
| **Buton** | **2** | celălalt picior (diagonal) la GND |

Alegi culori **corecte** pentru LED-uri: în Tinkercad dai click pe LED și schimbi **Color**.

### 3) Semafor automat (Minim)

```cpp
const int ROSU = 11;
const int GALBEN = 10;
const int VERDE = 9;

void setup() {
  pinMode(ROSU, OUTPUT);
  pinMode(GALBEN, OUTPUT);
  pinMode(VERDE, OUTPUT);
}

void loop() {
  digitalWrite(VERDE, HIGH);
  delay(4000);
  digitalWrite(VERDE, LOW);

  digitalWrite(GALBEN, HIGH);
  delay(1500);
  digitalWrite(GALBEN, LOW);

  digitalWrite(ROSU, HIGH);
  delay(4000);
  digitalWrite(ROSU, LOW);
}
```

Observă că **o singură culoare** e aprinsă la un moment dat.

### 4) Cod mai curat: o funcție pentru fiecare stare
Ca să nu repetăm aceleași rânduri, scriem o funcție care **setează toate luminile** dintr-o dată:

```cpp
const int ROSU = 11;
const int GALBEN = 10;
const int VERDE = 9;

void lumini(bool r, bool g, bool v) {
  digitalWrite(ROSU, r);
  digitalWrite(GALBEN, g);
  digitalWrite(VERDE, v);
}

void setup() {
  pinMode(ROSU, OUTPUT);
  pinMode(GALBEN, OUTPUT);
  pinMode(VERDE, OUTPUT);
}

void loop() {
  lumini(false, false, true);   // verde
  delay(4000);
  lumini(false, true, false);   // galben
  delay(1500);
  lumini(true, false, false);   // roșu
  delay(4000);
}
```

`lumini(false, false, true)` se citește: „roșu **nu**, galben **nu**, verde **da**”.

### 5) Complet — butonul pietonului
Mașinile au verde. Dacă cineva apasă butonul, semaforul trece prin galben la roșu, pietonul primește verde, apoi totul revine.

```cpp
const int ROSU = 11;
const int GALBEN = 10;
const int VERDE = 9;
const int PIETON = 6;
const int BUTON = 2;

void lumini(bool r, bool g, bool v, bool p) {
  digitalWrite(ROSU, r);
  digitalWrite(GALBEN, g);
  digitalWrite(VERDE, v);
  digitalWrite(PIETON, p);
}

void traversare() {
  lumini(false, true, false, false);   // galben
  delay(1500);
  lumini(true, false, false, true);    // roșu + pieton verde
  delay(5000);
  for (int i = 0; i < 4; i++) {        // pietonul clipește: grăbește-te
    digitalWrite(PIETON, LOW);
    delay(250);
    digitalWrite(PIETON, HIGH);
    delay(250);
  }
  lumini(true, false, false, false);   // totul roșu
  delay(1000);
}

void setup() {
  pinMode(ROSU, OUTPUT);
  pinMode(GALBEN, OUTPUT);
  pinMode(VERDE, OUTPUT);
  pinMode(PIETON, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
}

void loop() {
  lumini(false, false, true, false);   // mașinile merg
  if (digitalRead(BUTON) == LOW) {
    traversare();
  }
}
```

Programul **verifică butonul tot timpul** în `loop()`. Când îl găsește apăsat, cheamă funcția `traversare()`, care rulează tot scenariul.

---

## Greșeli frecvente
1. **Două culori aprinse odată** — ai uitat să stingi culoarea anterioară.  
2. **Pietonul rămâne verde** — nu ai oprit LED-ul la sfârșitul `traversare()`.  
3. **Butonul nu reacționează** — pinul 2 nu are `INPUT_PULLUP` sau nu e legat la GND.  
4. **Ordinea parametrilor** — `lumini(r, g, v, p)`: dacă o încurci, culorile se amestecă.  
5. **LED-uri de aceeași culoare** — pune culori diferite în Tinkercad, altfel nu mai știi care e care.

---

## De făcut azi — „Trecerea mea”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Semafor automat cu 3 LED-uri: verde → galben → roșu |
| **Complet** | Minim + LED pietoni + buton + funcția `traversare()` |

### Pasul 1 — Minim
- [ ] 3 LED-uri corecte (roșu, galben, verde) cu rezistoare  
- [ ] Ciclul merge în buclă  

### Pasul 2 — Complet
- [ ] LED pietoni pe pin 6  
- [ ] Buton pe pin 2  
- [ ] După apăsare: galben → roșu + pieton verde → pietonul clipește → revine verde  
- [ ] Numele `A1_L04` e corect

---

## Bonus
- [ ] Adaugă un **buzzer** care sună cât pietonul are verde (îl vedem în lecția 7; dacă l-ai pus deja, folosește `tone`)  
- [ ] Fă o stare de **noapte**: galben care clipește când apeși un al doilea buton

## Recapitulare rapidă
1. Un semafor = **stări** care se succed  
2. Funcția `lumini(...)` pune ordine în cod  
3. Butonul se verifică în `loop()`; când e apăsat, rulează o funcție

## Pe placa reală *(opțional)*
Cu LED-uri și buton pe breadboard, codul rămâne la fel. Verifică din nou rezistoarele și că toate LED-urile sunt cu piciorul lung spre pin.

## Quiz scurt
- Ce parametri are funcția `lumini`?  
- De ce stingem culoarea veche înainte să o aprindem pe cea nouă?  
- Cum știe Arduino că pietonul vrea să traverseze?

## Temă
Desenează un semafor cu 5 stări (verde, galben, roșu, pieton verde, pieton roșu) și scrie ce LED-uri sunt aprinse în fiecare stare.
