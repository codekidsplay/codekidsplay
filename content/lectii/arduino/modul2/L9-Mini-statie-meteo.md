# Lecția 9 — Mini stație meteo
**Modulul 2 · Senzori**  
**Code Maker Club · Sensor Scout**

> Azi combini **doi senzori** (temperatură și lumină) într-o mică stație meteo cu raport în Serial Monitor.  
> Proiect: **„Stația mea meteo”** · `Prenume_Nume_A2_L09`

---

## Obiectiv
La finalul orei ai o stație care măsoară temperatura și lumina și scrie un **raport** la fiecare 2 secunde.  
**Minim:** temperatură (°C) + lumină (%) afișate în Serial Monitor.  
**Complet:** Minim + **min/max** de la pornire + **mesaje** („zi/noapte”, „frig/plăcut/cald”) + un **LED** care clipește la fiecare raport.

## De ce contează
Stațiile meteo adună mai multe date și le **interpretează**. Azi faci acest pas: de la numere la **informații**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L8 · senzori învățați |
| 10–30 | Circuitul cu doi senzori |
| 30–65 | Funcții pentru fiecare senzor |
| 65–105 | Min/max și mesaje |
| 105–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · TMP36 · Photoresistor · Resistor 10 kΩ · LED · Resistor 220 Ω · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A2_L09`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **TMP36** | 5V · semnal la **A1** · GND |
| **Fotorezistor** | 5V → fotorezistor → **A0** → rezistor 10 kΩ → GND |
| **LED** | pin **13** → 220 Ω → anod · catod → GND |

### 3) Minim — două funcții, un raport

```cpp
const int SENZOR_LUMINA = A0;
const int SENZOR_TEMP = A1;

float temperatura() {
  float volti = analogRead(SENZOR_TEMP) * 5.0 / 1023.0;
  return (volti - 0.5) * 100.0;
}

int lumina() {
  return map(analogRead(SENZOR_LUMINA), 0, 1023, 0, 100);
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.print("Temperatura: ");
  Serial.print(temperatura(), 1);
  Serial.print(" C   Lumina: ");
  Serial.print(lumina());
  Serial.println(" %");
  delay(2000);
}
```

Fiecare senzor are **propria funcție**. `loop()` devine scurt și ușor de citit.

### 4) Complet — min / max și mesaje

```cpp
const int SENZOR_LUMINA = A0;
const int SENZOR_TEMP = A1;
const int LED = 13;

float tMin = 100;
float tMax = -100;

float temperatura() {
  float volti = analogRead(SENZOR_TEMP) * 5.0 / 1023.0;
  return (volti - 0.5) * 100.0;
}

int lumina() {
  return map(analogRead(SENZOR_LUMINA), 0, 1023, 0, 100);
}

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(LED, HIGH);

  float t = temperatura();
  int l = lumina();

  if (t < tMin) tMin = t;
  if (t > tMax) tMax = t;

  Serial.println("--- RAPORT ---");
  Serial.print("Temperatura: ");
  Serial.print(t, 1);
  Serial.println(" C");
  Serial.print("Lumina: ");
  Serial.print(l);
  Serial.println(" %");

  Serial.print("Min / Max: ");
  Serial.print(tMin, 1);
  Serial.print(" / ");
  Serial.println(tMax, 1);

  if (l < 30) {
    Serial.println("Ce e afara: noapte");
  } else {
    Serial.println("Ce e afara: zi");
  }

  if (t < 15) {
    Serial.println("Simt: frig");
  } else if (t < 26) {
    Serial.println("Simt: placut");
  } else {
    Serial.println("Simt: cald");
  }

  digitalWrite(LED, LOW);
  delay(2000);
}
```

**Ce e nou**

- `if (t < tMin) tMin = t;` — fără acolade, merge pentru **o singură** instrucțiune.  
- `tMin` pornește de la 100 și `tMax` de la −100, ca prima citire să le înlocuiască sigur.  
- Variabilele **globale** (în afara funcțiilor) își păstrează valoarea între buclele `loop()`.

### 5) Interpretarea datelor

| Temperatură | Mesaj |
|-------------|-------|
| sub 15 °C | frig |
| 15–25 °C | plăcut |
| 26 °C sau mai mult | cald |

| Lumină | Mesaj |
|--------|-------|
| sub 30 % | noapte |
| 30 % sau mai mult | zi |

Poți schimba pragurile după ce simți tu că e „frig” sau „cald”.

---

## Greșeli frecvente
1. **Valori amestecate** — senzorii sunt pe pinul greșit (A0 vs A1).  
2. **Min/Max greșite** — le-ai declarat în `loop`, nu global; se resetează la fiecare rundă.  
3. **Raport prea des** — lipsește `delay(2000)`.  
4. **Lumină negativă** — folosește `constrain` dacă ai calibrare proprie.  
5. **Apar semne ciudate în loc de `°`** — ecranul și Serial Monitor nu afișează mereu simbolul grad; scrie simplu „C”.

---

## De făcut azi — „Stația mea meteo”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Temperatură + lumină la 2 secunde |
| **Complet** | Minim + min/max + mesaje + LED de raport |

### Pasul 1 — Minim
- [ ] Funcțiile `temperatura()` și `lumina()`  
- [ ] Raport în Serial Monitor  

### Pasul 2 — Complet
- [ ] Min și max globale  
- [ ] Mesaje zi/noapte și frig/cald  
- [ ] Numele `A2_L09` e corect

---

## Bonus
- [ ] Adaugă un buton care **resetează** min/max  
- [ ] Calculează **media** temperaturilor din ultimele 5 rapoarte

## Recapitulare rapidă
1. Funcții separate pentru fiecare senzor  
2. Variabilele **globale** rețin valori între ture  
3. Min/max se actualizează cu `if`  
4. Datele devin utile când le **interpretezi**

## Pe placa reală *(opțional)*
Pentru exterior folosești o cutie ventilată, ferită de soare direct (care încălzește senzorul), cum fac stațiile meteo adevărate.

## Quiz scurt
- De ce `tMin` începe de la 100?  
- Ce e o variabilă globală?  
- Cum ai afișa „ploaie” dacă ai avea un senzor de apă?

## Temă
Alege 3 informații pe care le-ai pune într-o stație meteo reală (ex. vânt, ploaie) și ce senzor ți-ar trebui.
