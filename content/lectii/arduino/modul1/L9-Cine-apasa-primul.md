# Lecția 9 — Cine apasă primul?
**Modulul 1 · Primele circuite**  
**Code Kids Play · Circuit Starter**

> Azi faci un **joc de reflexe pentru doi jucători**: un semnal verde apare după o pauză **aleatorie**, iar cine apasă primul câștigă.  
> Proiect: **„Duelul de reflexe”** · `Prenume_Nume_A1_L09`

---

## Obiectiv
La finalul orei ai un joc cu 2 butoane și 3 LED-uri care decide câștigătorul.  
**Minim:** semnal de start după o pauză aleatorie · cine apasă primul aprinde LED-ul lui.  
**Complet:** Minim + **start greșit** (cine apasă înainte de semnal pierde) · scor în **Serial Monitor**.

## De ce contează
Jocurile au **reguli**, iar regulile se scriu cu `if`, `else if` și **bucle**. Aici folosești și **numere aleatorii** (`random`), ca jocul să nu fie la fel de fiecare dată.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8 · regulile jocului |
| 10–35 | Circuitul: 2 butoane + 3 LED-uri |
| 35–65 | `random` + așteptarea semnalului |
| 65–100 | Câștigător + start greșit |
| 100–120 | Recap, quiz, turneu în clasă |

**Componente azi:** Arduino Uno · Breadboard · 3 × LED (2 pentru jucători, 1 verde pentru start) · 3 × Resistor 220 Ω · 2 × Pushbutton · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A1_L09`

### 2) Conexiuni

| Piesă | Pin | Observații |
|-------|-----|------------|
| Buton **Jucător 1** | **2** | picior diagonal la GND |
| Buton **Jucător 2** | **3** | idem |
| LED **Jucător 1** | **8** | rezistor 220 Ω, catod la GND |
| LED **Jucător 2** | **9** | idem |
| LED **START** (verde) | **10** | idem |

### 3) Numere aleatorii
`random(min, max)` dă un număr întâmplător între `min` (inclus) și `max` (exclus). Ca să nu fie mereu aceeași secvență, pornești generatorul din „zgomotul” unui pin liber:

```cpp
randomSeed(analogRead(A0));   // se scrie în setup()
```

`A0` lăsat neconectat citește valori întâmplătoare.

### 4) Minim — cine apasă primul după semnal

```cpp
const int BUTON1 = 2;
const int BUTON2 = 3;
const int LED1 = 8;
const int LED2 = 9;
const int START = 10;

void setup() {
  pinMode(BUTON1, INPUT_PULLUP);
  pinMode(BUTON2, INPUT_PULLUP);
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(START, OUTPUT);
  randomSeed(analogRead(A0));
}

void loop() {
  digitalWrite(LED1, LOW);
  digitalWrite(LED2, LOW);
  digitalWrite(START, LOW);

  delay(random(2000, 6000));      // pauză aleatorie
  digitalWrite(START, HIGH);      // SEMNAL!

  while (true) {
    if (digitalRead(BUTON1) == LOW) {
      digitalWrite(LED1, HIGH);
      break;
    }
    if (digitalRead(BUTON2) == LOW) {
      digitalWrite(LED2, HIGH);
      break;
    }
  }

  delay(3000);                    // arăți câștigătorul, apoi o nouă rundă
}
```

**Ce e nou**

- `while (true)` = repetă **fără sfârșit**, până apare un `break`.  
- `break` = „ieși din buclă acum”.  
- Primul buton găsit apăsat câștigă, pentru că bucla se oprește imediat.

### 5) Complet — start greșit
Cine apasă **înainte** de semnal pierde, deci câștigă celălalt. Facem o funcție care așteaptă o perioadă și verifică dacă cineva „fură startul”:

```cpp
const int BUTON1 = 2;
const int BUTON2 = 3;
const int LED1 = 8;
const int LED2 = 9;
const int START = 10;

int scor1 = 0;
int scor2 = 0;

void arataCastigator(int jucator) {
  if (jucator == 1) {
    digitalWrite(LED1, HIGH);
    scor1++;
  } else {
    digitalWrite(LED2, HIGH);
    scor2++;
  }
  Serial.print("Scor  J1: ");
  Serial.print(scor1);
  Serial.print("  J2: ");
  Serial.println(scor2);
  delay(3000);
}

void setup() {
  pinMode(BUTON1, INPUT_PULLUP);
  pinMode(BUTON2, INPUT_PULLUP);
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(START, OUTPUT);
  Serial.begin(9600);
  randomSeed(analogRead(A0));
}

void loop() {
  digitalWrite(LED1, LOW);
  digitalWrite(LED2, LOW);
  digitalWrite(START, LOW);

  // pauză aleatorie, dar cu ochii pe butoane
  unsigned long pauza = random(2000, 6000);
  unsigned long inceput = millis();
  while (millis() - inceput < pauza) {
    if (digitalRead(BUTON1) == LOW) {
      Serial.println("Start gresit J1!");
      arataCastigator(2);
      return;
    }
    if (digitalRead(BUTON2) == LOW) {
      Serial.println("Start gresit J2!");
      arataCastigator(1);
      return;
    }
  }

  digitalWrite(START, HIGH);      // SEMNAL!

  while (true) {
    if (digitalRead(BUTON1) == LOW) {
      arataCastigator(1);
      return;
    }
    if (digitalRead(BUTON2) == LOW) {
      arataCastigator(2);
      return;
    }
  }
}
```

`millis()` = câte milisecunde au trecut de la pornirea plăcii. Cu el **măsori timpul fără să oprești programul** (cum ar face `delay`), deci poți urmări butoanele în timpul așteptării.

---

## Greșeli frecvente
1. **Același „aleatoriu” de fiecare dată** — ai uitat `randomSeed`.  
2. **Jocul nu se termină** — lipsește `break` sau `return`.  
3. **Semnalul apare imediat** — `random(2000, 6000)` trebuie în `delay` sau în comparație.  
4. **Ambii jucători câștigă** — după câștigător trebuie să ieși din buclă.  
5. **Scorul rămâne 0** — `scor1++` nu e apelat (verifică `arataCastigator`).

---

## De făcut azi — „Duelul de reflexe”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Pauză aleatorie → semnal → primul care apasă câștigă |
| **Complet** | Minim + start greșit + scor în Serial Monitor |

### Pasul 1 — Minim
- [ ] 2 butoane + 2 LED-uri jucători + LED START  
- [ ] `random` pentru pauză  
- [ ] `while (true)` + `break`  

### Pasul 2 — Complet
- [ ] Verificare start greșit cu `millis()`  
- [ ] Scoruri în Serial Monitor  
- [ ] Numele `A1_L09` e corect

---

## Bonus
- [ ] Măsoară **timpul de reacție** în milisecunde și afișează-l  
- [ ] Un buzzer care sună la semnal

## Recapitulare rapidă
1. `random(a, b)` = număr aleatoriu între a și b-1  
2. `randomSeed(analogRead(A0))` pornește „zarul”  
3. `while` repetă cât timp o condiție e adevărată · `break` iese din buclă  
4. `millis()` măsoară timpul fără să blocheze programul

## Pe placa reală *(opțional)*
Fizic, cei doi jucători apasă butoanele în același timp; folosește cât mai puține fire lungi ca să nu apară zgomot pe pini.

## Quiz scurt
- Ce face `break`?  
- De ce folosim `millis()` în loc de `delay()` la start greșit?  
- Ce se întâmplă dacă nu pui `randomSeed`?

## Temă
Scrie regulile unui joc cu 3 jucători (ce LED-uri și butoane ai nevoie) și desenează schema pe foaie.
