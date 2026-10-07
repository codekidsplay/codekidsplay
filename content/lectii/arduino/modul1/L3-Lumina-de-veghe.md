# Lecția 3 — Lumina de veghe
**Modulul 1 · Primele circuite**  
**Code Kids Play · Circuit Starter**

> Azi citești un **buton** cu Arduino și iei **decizii** cu `if` / `else`.  
> Proiect: **„Lumina mea de veghe”** · `Prenume_Nume_A1_L03`

---

## Obiectiv
La finalul orei ai un LED care răspunde la **apăsarea unui buton**.  
**Minim:** buton pe pin 2 · LED pe pin 8 · LED-ul e aprins **cât ții apăsat**.  
**Complet:** Minim + LED care **rămâne aprins** după o apăsare și se stinge la următoarea (comutator) · mesaj în **Serial Monitor**.

## De ce contează
Până acum Arduino doar **trimitea** semnale. Acum **ascultă** și **hotărăște**. Orice aparat cu buton — lanternă, sonerie, joc — folosește ce înveți azi.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L2 · butoane din viața reală |
| 10–35 | Circuitul cu buton (`INPUT_PULLUP`) |
| 35–60 | `digitalRead` + `if` / `else` |
| 60–95 | Comutator + Serial Monitor |
| 95–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · LED · Resistor 220 Ω · **Pushbutton** · fire

---

## Pas cu pas

### 1) Circuit nou
**Create new Circuit** → `Prenume_Nume_A1_L03`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **LED** | anod (+) → rezistor 220 Ω → pin **8** · catod (−) → **GND** |
| **Buton** | un picior → pin **2** · piciorul **diagonal** opus → **GND** |

Butonul din Tinkercad are **4 picioare**. Cele din aceeași parte sunt legate între ele; de aceea alegem picioare **în diagonală**, ca să fim siguri că apăsarea face legătura.

### 3) Ce înseamnă `INPUT_PULLUP`
Un pin de intrare **lăsat liber** poate „citi” valori aleatorii. Cu `INPUT_PULLUP`, Arduino îl ține pe **HIGH** (liniște) și butonul îl trage la **GND**:

| Starea butonului | Ce citește Arduino |
|------------------|--------------------|
| Neapăsat | **HIGH** |
| **Apăsat** | **LOW** |

Parcă e invers, dar așa e mai simplu: **nu mai ai nevoie de rezistor** pentru buton.

### 4) Minim — LED aprins cât ții apăsat

```cpp
const int BUTON = 2;
const int LED = 8;

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
}
```

**Cum citești `if`:** „dacă butonul e apăsat (`LOW`), aprinde LED-ul, **altfel** stinge-l”. Atenție: `==` înseamnă **„e egal cu?”**, `=` înseamnă „pune valoarea”.

### 5) Varianta scurtă
Aceeași treabă, mai pe scurt:

```cpp
const int BUTON = 2;
const int LED = 8;

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
}

void loop() {
  int apasat = digitalRead(BUTON);
  digitalWrite(LED, !apasat);
}
```

`!` = „opusul”. Dacă butonul dă `LOW` (0), `!apasat` devine `1`, deci LED-ul se aprinde.

### 6) Serial Monitor — vezi ce „gândește” placa
```cpp
const int BUTON = 2;
const int LED = 8;

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    digitalWrite(LED, HIGH);
    Serial.println("Apasat");
  } else {
    digitalWrite(LED, LOW);
    Serial.println("Liber");
  }
  delay(100);
}
```

În Tinkercad: apeși **Serial Monitor** (jos, sub cod) după ce pornești simularea.

### 7) Complet — comutator (apeși o dată = aprins, încă o dată = stins)
Ai nevoie să **ții minte** starea LED-ului într-o **variabilă**:

```cpp
const int BUTON = 2;
const int LED = 8;

bool aprins = false;

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
}

void loop() {
  if (digitalRead(BUTON) == LOW) {
    aprins = !aprins;
    digitalWrite(LED, aprins);
    delay(250);
  }
}
```

- `bool` = variabilă cu două valori: `true` (adevărat) sau `false` (fals).  
- `aprins = !aprins;` o **răstoarnă** la fiecare apăsare.  
- `delay(250)` oprește Arduino puțin, ca o apăsare lungă să nu fie citită de zeci de ori.

---

## Greșeli frecvente
1. **LED-ul e aprins fără apăsare** — ai uitat `INPUT_PULLUP`.  
2. **Merge invers** (aprins când nu apeși) — ai comparat cu `HIGH` în loc de `LOW`.  
3. **Butonul nu face nimic** — picioarele nu sunt în diagonală sau lipsește firul spre GND.  
4. **Comutatorul „tremură”** — ai uitat `delay(250)`.  
5. **`if (x = LOW)`** — cu un singur `=` pui o valoare, nu compari.

---

## De făcut azi — „Lumina mea de veghe”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Buton + LED · LED-ul se aprinde doar cât ții apăsat |
| **Complet** | Minim + comutator cu `bool` + mesaje în Serial Monitor |

### Pasul 1 — Minim
- [ ] Circuit cu buton pe pin 2 și LED pe pin 8  
- [ ] Cod cu `INPUT_PULLUP` și `if` / `else`  

### Pasul 2 — Complet
- [ ] Comutator cu variabila `aprins`  
- [ ] Serial Monitor afișează „Aprins” / „Stins” la fiecare apăsare  
- [ ] Numele `A1_L03` e corect

---

## Bonus
- [ ] Un al doilea LED care e aprins **doar când primul e stins**  
- [ ] Un al doilea buton (pin 3) care **stinge** LED-ul

## Recapitulare rapidă
1. `INPUT_PULLUP` + buton la GND → **apăsat = LOW**  
2. `digitalRead(pin)` citește butonul  
3. `if / else` alege între două drumuri  
4. `bool` ține minte un adevărat / fals

## Pe placa reală *(opțional)*
Butonul fizic merge exact la fel: un picior la pin, celălalt la GND, `INPUT_PULLUP` în cod.

## Quiz scurt
- Ce citește Arduino când butonul **nu** e apăsat, cu `INPUT_PULLUP`?  
- Care e diferența dintre `=` și `==`?  
- De ce avem `delay(250)` la comutator?

## Temă
Gândește un alt aparat cu un singur buton (lanternă, sonerie…) și scrie în 3 rânduri cum ar funcționa.
