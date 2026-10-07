# Lecția 8 — Pian cu 4 clape
**Modulul 1 · Primele circuite**  
**Code Kids Play · Circuit Starter**

> Azi faci un **pian mic**: 4 butoane, fiecare cu altă notă, și înveți **tablouri** (`array`) ca să cânți melodii.  
> Proiect: **„Pianul meu”** · `Prenume_Nume_A1_L08`

---

## Obiectiv
La finalul orei ai un pian cu 4 clape care cântă **Do, Re, Mi, Fa**.  
**Minim:** 4 butoane + 1 buzzer · fiecare buton cântă nota lui cât îl ții apăsat.  
**Complet:** Minim + un al cincilea buton care **cântă singur** o melodie dintr-un tablou de note.

## De ce contează
Un tablou (`array`) e o **listă cu nume**: în loc de 4 variabile separate ai una singură cu 4 valori. Ajută la tot: note, culori, pini, scoruri.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap L7 · notele muzicale |
| 10–35 | Circuitul cu 4 butoane + buzzer |
| 35–65 | Cod simplu, apoi cu tablou și `for` |
| 65–100 | Butonul de melodie |
| 100–120 | Recap, quiz, concert |

**Componente azi:** Arduino Uno · Breadboard · **Piezo** · **5 × Pushbutton** · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A1_L08`

### 2) Conexiuni

| Piesă | Pin | Se conectează |
|-------|-----|---------------|
| Piezo | **8** | celălalt picior la GND |
| Buton **Do** | **2** | picior diagonal la GND |
| Buton **Re** | **3** | idem |
| Buton **Mi** | **4** | idem |
| Buton **Fa** | **5** | idem |
| Buton **Melodie** (Complet) | **6** | idem |

### 3) Frecvențele notelor

| Notă | Frecvență (Hz) |
|------|----------------|
| Do | 262 |
| Re | 294 |
| Mi | 330 |
| Fa | 349 |
| Sol | 392 |

### 4) Varianta lungă (cu `if`)

```cpp
const int BUZZER = 8;

void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(3, INPUT_PULLUP);
  pinMode(4, INPUT_PULLUP);
  pinMode(5, INPUT_PULLUP);
  pinMode(BUZZER, OUTPUT);
}

void loop() {
  if (digitalRead(2) == LOW) {
    tone(BUZZER, 262);
  } else if (digitalRead(3) == LOW) {
    tone(BUZZER, 294);
  } else if (digitalRead(4) == LOW) {
    tone(BUZZER, 330);
  } else if (digitalRead(5) == LOW) {
    tone(BUZZER, 349);
  } else {
    noTone(BUZZER);
  }
}
```

Merge, dar a repetat patru ori aceeași idee. Se poate mai bine.

### 5) Varianta cu tablouri (Minim)

```cpp
const int BUZZER = 8;
const int NR = 4;

int butoane[NR] = {2, 3, 4, 5};
int note[NR]    = {262, 294, 330, 349};

void setup() {
  for (int i = 0; i < NR; i++) {
    pinMode(butoane[i], INPUT_PULLUP);
  }
  pinMode(BUZZER, OUTPUT);
}

void loop() {
  bool cant = false;
  for (int i = 0; i < NR; i++) {
    if (digitalRead(butoane[i]) == LOW) {
      tone(BUZZER, note[i]);
      cant = true;
    }
  }
  if (!cant) {
    noTone(BUZZER);
  }
}
```

**Cum citești tablourile**

- `int butoane[NR] = {2, 3, 4, 5};` = o listă cu **4** numere.  
- `butoane[0]` e **2**, `butoane[1]` e **3** etc. Numărătoarea **începe de la 0**.  
- `note[i]` e nota care se potrivește cu `butoane[i]`.

Dacă vrei un buton în plus, adaugi un număr în ambele liste și mărești `NR`.

### 6) Complet — melodie automată
Un al cincilea buton (pin 6) cântă „Ode bucuriei” (primele note), cu o listă de note și o listă de durate:

```cpp
const int BUZZER = 8;
const int NR = 4;
const int MELODIE = 6;

int butoane[NR] = {2, 3, 4, 5};
int note[NR]    = {262, 294, 330, 349};

int melodie[]  = {330, 330, 349, 392, 392, 349, 330, 294, 262, 262, 294, 330, 330, 294, 294};
int durate[]   = {400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 600, 200, 800};

void canta() {
  for (int i = 0; i < 15; i++) {
    tone(BUZZER, melodie[i], durate[i]);
    delay(durate[i] + 50);
  }
  noTone(BUZZER);
}

void setup() {
  for (int i = 0; i < NR; i++) {
    pinMode(butoane[i], INPUT_PULLUP);
  }
  pinMode(MELODIE, INPUT_PULLUP);
  pinMode(BUZZER, OUTPUT);
}

void loop() {
  if (digitalRead(MELODIE) == LOW) {
    canta();
    return;
  }
  bool cant = false;
  for (int i = 0; i < NR; i++) {
    if (digitalRead(butoane[i]) == LOW) {
      tone(BUZZER, note[i]);
      cant = true;
    }
  }
  if (!cant) {
    noTone(BUZZER);
  }
}
```

`tone(pin, frecventa, durata)` cântă nota **exact cât** îi spui. `delay(durate[i] + 50)` lasă o mică pauză între note.

---

## Greșeli frecvente
1. **O notă nu sună** — butonul respectiv nu e la pinul din listă sau nu e legat la GND.  
2. **Sună toate la fel** — ai pus aceeași frecvență în `note`.  
3. **Eroare „out of range”** — ai folosit `note[4]` într-o listă cu 4 elemente (indicii sunt 0–3).  
4. **Nota nu se oprește** — lipsește `noTone` când niciun buton nu e apăsat.  
5. **Listele au lungimi diferite** — `butoane` și `note` trebuie să aibă același număr de elemente.

---

## De făcut azi — „Pianul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | 4 clape cu 4 note · tablouri + `for` |
| **Complet** | Minim + buton de melodie care cântă singur |

### Pasul 1 — Minim
- [ ] 4 butoane pe pinii 2–5  
- [ ] Tablourile `butoane` și `note`  

### Pasul 2 — Complet
- [ ] Buton pe pinul 6 care cântă melodia  
- [ ] Numele `A1_L08` e corect

---

## Bonus
- [ ] Adaugă **a cincea clapă** (Sol, 392 Hz) pe pinul 7  
- [ ] Schimbă melodia: scrie în `melodie[]` „Mary had a little lamb” sau o melodie care îți place

## Recapitulare rapidă
1. Un tablou ține mai multe valori sub un nume  
2. Indicii încep de la **0**  
3. `for` + tablou = codul scurt pentru multe butoane  
4. `tone(pin, frecventa, durata)` cântă o notă de o durată

## Pe placa reală *(opțional)*
Pe breadboard, cele 4 butoane merg pe pinii 2–5 și au un picior comun la GND. Un singur buzzer pentru toate notele.

## Quiz scurt
- Ce element are `note[2]`?  
- De ce numărătoarea începe de la 0?  
- Ce schimbi ca să adaugi o clapă nouă?

## Temă
Alege o melodie scurtă (8 note) și scrie-o în tablou. Salvează versiunea ta ca `A1_L08b`.
