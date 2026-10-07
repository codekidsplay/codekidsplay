# Lecția 1 — Ce simte placa?
**Modulul 2 · Senzori**  
**Code Kids Play · Sensor Scout**

> Azi înveți să **asculți** ce „simte” Arduino: citești valori cu `analogRead` și `digitalRead` și le afișezi în **Serial Monitor**.  
> Proiect: **„Jurnalul plăcii”** · `Prenume_Nume_A2_L01`

---

## Obiectiv
La finalul orei afișezi în Serial Monitor valorile unui potențiometru și ale unui buton, într-un format ușor de citit.  
**Minim:** valoarea potențiometrului (0–1023) și starea butonului afișate pe un rând, la fiecare 200 ms.  
**Complet:** Minim + tensiunea în **volți** (cu zecimale) și un mesaj text („mic / mediu / mare”).

## De ce contează
Un senzor nu face nimic singur: trimite **un număr**. Dacă știi să citești și să **vezi** numărul, poți face orice cu el. Serial Monitor e „fereastra” ta în mintea plăcii, pe care o vei folosi în tot modulul.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap Modul 1 · ce e un senzor |
| 10–30 | Circuitul cu potențiometru + buton |
| 30–60 | `Serial.print` / `Serial.println` |
| 60–95 | Volți cu zecimale (`float`) + mesaje |
| 95–120 | Recap, quiz, galerie |

**Componente azi:** Arduino Uno · Breadboard · Potentiometer · Pushbutton · fire

---

## Pas cu pas

### 1) Circuit nou
`Prenume_Nume_A2_L01`

### 2) Conexiuni

| Piesă | Se conectează |
|-------|---------------|
| **Potențiometru** | laterale la **5V** și **GND**, mijloc la **A0** |
| **Buton** | un picior la pin **2**, piciorul diagonal la **GND** |

### 3) Primul mesaj

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("Salut din Arduino!");
  delay(1000);
}
```

- `Serial.begin(9600)` deschide „linia telefonică” cu calculatorul, la viteza 9600.  
- `Serial.println` scrie textul și trece la rând nou. `Serial.print` scrie **fără** rând nou.

Pornești simularea și deschizi **Serial Monitor** (jos, sub cod).

### 4) Minim — potențiometru și buton

```cpp
const int POT = A0;
const int BUTON = 2;

void setup() {
  pinMode(BUTON, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  int valoare = analogRead(POT);
  int apasat = !digitalRead(BUTON);

  Serial.print("Potentiometru: ");
  Serial.print(valoare);
  Serial.print("  Buton: ");
  Serial.println(apasat);

  delay(200);
}
```

Rotește potențiometrul și apasă butonul: numerele se schimbă. Butonul apare ca **1** când e apăsat (`!` răstoarnă `LOW` în 1).

### 5) Volți și mesaje (Complet)
`analogRead` dă 0–1023, dar tensiunea e între **0 și 5 volți**. Ca să obții volții, înmulțești cu `5.0 / 1023.0`. Folosim `float` — număr **cu zecimale**:

```cpp
const int POT = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int valoare = analogRead(POT);
  float volti = valoare * 5.0 / 1023.0;

  Serial.print("Valoare: ");
  Serial.print(valoare);
  Serial.print("  Tensiune: ");
  Serial.print(volti, 2);
  Serial.print(" V  -> ");

  if (valoare < 341) {
    Serial.println("mic");
  } else if (valoare < 682) {
    Serial.println("mediu");
  } else {
    Serial.println("mare");
  }

  delay(300);
}
```

`Serial.print(volti, 2)` afișează cu **2 zecimale**. `1023 / 3 ≈ 341`, iar `2 × 1023 / 3 ≈ 682` — am împărțit scala în **trei zone egale**.

### 6) Tipuri de date

| Tip | Ce ține | Exemplu |
|-----|---------|---------|
| `int` | număr întreg | `valoare = 512` |
| `float` | număr cu zecimale | `volti = 2.50` |
| `bool` | adevărat / fals | `apasat = true` |

Un `int` împărțit la un `int` dă tot întreg; de aceea scriem `5.0` (cu zecimală) ca să obținem rezultat cu zecimale.

---

## Greșeli frecvente
1. **Serial Monitor e gol** — n-ai pus `Serial.begin(9600)` sau n-ai pornit simularea.  
2. **Caractere ciudate** — viteza din cod (`9600`) trebuie să fie aceeași ca în monitor.  
3. **Volți = 0 sau 4** — ai scris `5 / 1023` (împărțire întreagă = 0). Scrie `5.0 / 1023.0`.  
4. **Se derulează prea repede** — lipsește `delay`.  
5. **Butonul arată mereu 0** — ai uitat `INPUT_PULLUP`.

---

## De făcut azi — „Jurnalul plăcii”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Potențiometru + buton în Serial Monitor |
| **Complet** | Minim + volți cu 2 zecimale + mesaj mic / mediu / mare |

### Pasul 1 — Minim
- [ ] Potențiometru pe A0, buton pe pin 2  
- [ ] Linia „Potentiometru: … Buton: …”  

### Pasul 2 — Complet
- [ ] Volți afișați corect (între 0.00 și 5.00)  
- [ ] Mesajul se schimbă după zonă  
- [ ] Numele `A2_L01` e corect

---

## Bonus
- [ ] Afișează și **procentul** (0–100%) cu `map`  
- [ ] Înlocuiește mesajele cu **5 zone** în loc de 3

## Recapitulare rapidă
1. `Serial.begin(9600)` o dată, în `setup()`  
2. `Serial.print` / `println` afișează texte și numere  
3. `float` e pentru zecimale  
4. Senzorul trimite un **număr**; tu decizi ce înseamnă

## Pe placa reală *(opțional)*
Conectezi placa prin USB, deschizi **Serial Monitor** în Arduino IDE (`Ctrl+Shift+M`) la 9600 baud.

## Quiz scurt
- Ce face `Serial.println`?  
- De ce scriem `5.0` și nu `5`?  
- Ce valoare ar da `analogRead` dacă potențiometrul e la mijloc?

## Temă
Alege o valoare din casă pe care ai vrea s-o citești (temperatură, lumină, zgomot) și scrie ce senzor ți-ar trebui.
