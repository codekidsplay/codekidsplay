# Lecția 1 — De la idee la schemă
**Modulul 4 · Proiecte complete**  
**Code Kids Play · Arduino Creator**

> Ultimul modul: nu mai copiezi proiecte, le **gândești** tu. Azi înveți cum arată un proiect bine pregătit, **înainte** să pui prima piesă.  
> Proiect: **„Planul meu de inventator”** · `Prenume_Nume_A4_L01`

---

## Obiectiv
La finalul orei ai **planul** unui proiect: idee, listă de piese, tabel de pini și un program de test.  
**Minim:** o idee clară în 2 propoziții + lista de componente + tabel de pini.  
**Complet:** Minim + **schema pe hârtie** + **program de test** care verifică, pe rând, fiecare piesă.

## De ce contează
Inginerii petrec mai mult timp **planificând** decât lipind fire. Un proiect cu plan se termină; unul fără plan se blochează la jumătate și nu mai știi ce fir merge unde.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ce am învățat · harta pieselor |
| 15–40 | Alegem ideea |
| 40–75 | Tabelul de pini și schema |
| 75–110 | Programul de test |
| 110–120 | Recap, galerie |

**Componente azi:** Arduino Uno · piese după ideea ta (le alegi în lecție)

---

## Pas cu pas

### 1) Ce piese știm deja

| Categorie | Piese |
|-----------|-------|
| **Intrări** | buton, potențiometru, fotorezistor, TMP36, HC-SR04, PIR, umiditate sol, tilt, tastatură, receptor IR |
| **Ieșiri** | LED, RGB, buzzer, LCD, 7 segmente, servo, motor DC, NeoPixel |

Orice proiect e o combinație: **intrare → decizie în program → ieșire**.

### 2) Alege ideea
Răspunde la 3 întrebări:

1. **Ce problemă rezolvă?** (ex. „uit să ud floarea”)  
2. **Ce simte?** (intrări)  
3. **Ce face?** (ieșiri)

Exemple de idei, ca inspirație:

| Idee | Intrări | Ieșiri |
|------|---------|--------|
| Sera automată | umiditate, TMP36, LDR | motor (ventilator), LED, LCD |
| Garajul inteligent | HC-SR04, buton | servo, LED-uri, buzzer |
| Lumina de noapte pe hol | LDR, PIR | NeoPixel, buzzer |
| Casa mea inteligentă | LDR, TMP36, PIR | LCD, servo, motor, LED-uri |
| Sertarul secret | tastatură | servo, LCD |

**Regulă:** proiectul tău trebuie să aibă cel puțin **2 intrări** și **2 ieșiri diferite**. Alege ceva ce poți termina în 4–5 ore în total.

### 3) Descrierea în 2 propoziții
Completează:

> **Proiectul meu se numește** ____________.  
> **Când** ____________ (intrare), **atunci** ____________ (ieșire).

Exemplu: „Sera mea. Când pământul e uscat, se aprinde un LED, iar când e cald pornește ventilatorul.”

### 4) Lista de componente
Scrie fiecare piesă și **de câte ori** o ai nevoie:

| Piesă | Cantitate | Rol |
|-------|-----------|-----|
| TMP36 | 1 | măsoară temperatura |
| Motor DC + tranzistor + diodă | 1 | ventilator |
| LED + 220 Ω | 2 | semnalizare |
| … | | |

### 5) Tabelul de pini
Cea mai importantă hârtie din proiect. Alocă **câte un pin** fiecărei piese:

| Piesă | Pin Arduino | Tip |
|-------|-------------|-----|
| TMP36 | A1 | intrare analogică |
| Umiditate sol | A0 | intrare analogică |
| LED verde | 7 | ieșire digitală |
| Motor (tranzistor) | 6 | ieșire PWM |
| Buton | 8 | intrare (`INPUT_PULLUP`) |

**Reguli de pini (de ținut minte)**

| Regulă | De ce |
|--------|-------|
| Pini **PWM**: 3, 5, 6, 9, 10, 11 | doar acolo merge `analogWrite` |
| Pinii **0** și **1** sunt pentru Serial | nu-i folosi |
| `Servo` blochează PWM pe **9** și **10** | pune LED-uri cu PWM pe alți pini |
| `tone()` blochează PWM pe **3** și **11** | |
| LCD-ul consumă **6 pini** (12, 11, 5, 4, 3, 2) | planifică restul |
| A0–A5 pot fi și pini digitali | util când rămâi fără pini |

### 6) Schema pe hârtie
Desenează o schemă simplă: Arduino la mijloc, piesele în jur, cu liniile firelor și etichetele pinilor. Nu trebuie să fie perfectă, dar trebuie să se **înțeleagă**.

### 7) Complet — programul de test
Înainte de program mare, verifici piesele **pe rând**. Un program de test îți spune imediat dacă o piesă sau un fir sunt greșite:

```cpp
const int LED = 7;
const int BUZZER = 13;
const int BUTON = 8;

void testLed() {
  Serial.println("Test LED...");
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED, HIGH);
    delay(200);
    digitalWrite(LED, LOW);
    delay(200);
  }
}

void testBuzzer() {
  Serial.println("Test buzzer...");
  tone(BUZZER, 1000, 300);
  delay(500);
}

void testSenzor() {
  Serial.print("Test senzor A0: ");
  Serial.println(analogRead(A0));
}

void testButon() {
  Serial.print("Test buton: ");
  Serial.println(digitalRead(BUTON) == LOW ? "APASAT" : "liber");
}

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("=== TEST PIESE ===");
  testLed();
  testBuzzer();
}

void loop() {
  testSenzor();
  testButon();
  delay(500);
}
```

Fiecare piesă are **propria funcție de test**. Adaugi altele (servo, LCD, motor) pe măsură ce le conectezi. Când un test nu merge, știi **exact** unde e problema.

---

## Greșeli frecvente
1. **Idee prea mare** — „o casă cu 15 funcții”. Începe mic și adaugă.  
2. **Conflicte de pini** — două piese pe același pin.  
3. **Fără plan** — începi să lipești fire fără tabel.  
4. **Test omis** — lipești 6 piese, nimic nu merge și nu știi de ce.  
5. **Prea multe piese** — Arduino Uno are doar 14 pini digitali și 6 analogici.

---

## De făcut azi — „Planul meu de inventator”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Idee în 2 propoziții + piese + tabel de pini |
| **Complet** | Minim + schema + program de test |

### Pasul 1 — Minim
- [ ] Ideea în 2 propoziții  
- [ ] Lista de componente  
- [ ] Tabelul de pini fără conflicte  

### Pasul 2 — Complet
- [ ] Schema desenată  
- [ ] Program de test care compilează și rulează  
- [ ] Numele `A4_L01` e corect

---

## Bonus
- [ ] Un al doilea plan, pentru o idee de rezervă  
- [ ] Estimează cât timp ți-ar lua fiecare parte (circuit, cod, test)

## Recapitulare rapidă
1. Proiect = intrări + decizie + ieșiri  
2. Tabelul de pini previne conflicte  
3. Testezi piesele **pe rând**  
4. Începe simplu, adaugă apoi

## Pe placa reală *(opțional)*
La proiectele reale se mai adaugă: sursa de alimentare, cutia (carcasa), lipiturile. Planifică-le din start.

## Quiz scurt
- Care sunt pinii PWM?  
- De ce folosim un program de test?  
- Ce piese ar trebui pentru „un ceas deșteptător”?

## Temă
Alege și **scrie** ideea proiectului tău final (L9) și arată-o unui părinte sau profesorului: se înțelege clar ce face?
