# Lecția 9 — Proiect final: construcția
**Modulul 4 · Proiecte complete**  
**Code Maker Club · Arduino Creator**

> Azi îți construiești **proiectul final**, cel pe care l-ai planificat în Lecția 1. Nu mai e o lecție cu pași: ești **inventator**, iar eu sunt doar ghidul.  
> Proiect: **proiectul tău** · `Prenume_Nume_A4_L09`

---

## Obiectiv
La finalul orei proiectul tău **funcționează** (cel puțin varianta de bază) și are un program organizat.  
**Minim:** circuitul complet + programul care face funcția principală.  
**Complet:** Minim + **toate cerințele** de mai jos bifate + **plan de teste** completat.

## De ce contează
Proiectul final arată ce știi să faci **singur**. Nu trebuie să fie uriaș, ci **funcțional**, **organizat** și **explicat**.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recitim planul din L1 |
| 10–45 | Construim circuitul pe etape |
| 45–90 | Programul, pe funcții |
| 90–110 | Teste |
| 110–120 | Pregătim prezentarea de mâine |

**Componente azi:** cele din planul tău

---

## Pas cu pas

### 1) Cerințele proiectului

| # | Cerință | Bifat |
|---|---------|-------|
| 1 | Cel puțin **2 intrări** (senzori sau butoane) | ☐ |
| 2 | Cel puțin **2 ieșiri** diferite (LED, buzzer, LCD, motor, servo, etc.) | ☐ |
| 3 | Un **afișaj** sau un mesaj (LCD sau Serial Monitor) | ☐ |
| 4 | Cel puțin **3 funcții** proprii | ☐ |
| 5 | Cel puțin o **decizie** cu `if` (cu mai multe ramuri) | ☐ |
| 6 | **Fără `delay` lung** în bucla principală (folosește `millis()` unde ai nevoie) | ☐ |
| 7 | Un **tabel de pini** completat | ☐ |
| 8 | Codul are **comentarii** la părțile importante | ☐ |

### 2) Construim pe etape
Nu lipi tot dintr-o dată. Folosește metoda **„o piesă, un test”**:

1. Conectează **o piesă**.  
2. Fă un test mic (ca în L1).  
3. Dacă merge, treci la următoarea.  
4. Salvează o **copie** a circuitului după fiecare etapă (`..._v1`, `..._v2`).

### 3) Structura unui program bun
Folosește acest schelet. Compilează, deci ai de unde porni:

```cpp
// ===== 1. PINI =====
const int LED = 7;
const int BUTON = 8;
const int SENZOR = A0;
const int BUZZER = 13;

// ===== 2. SETARI (valori pe care le poți modifica) =====
const int PRAG = 500;

// ===== 3. STARE =====
enum Stare { LINISTIT, ALERTA };
Stare stare = LINISTIT;
bool butonAnterior = false;
unsigned long ultimaActualizare = 0;

// ===== 4. FUNCTII =====
int citesteSenzor() {
  return analogRead(SENZOR);
}

bool butonApasat() {
  bool apasat = (digitalRead(BUTON) == LOW);
  bool front = apasat && !butonAnterior;
  butonAnterior = apasat;
  return front;
}

void actualizeazaStarea() {
  if (citesteSenzor() > PRAG) {
    stare = ALERTA;
  } else {
    stare = LINISTIT;
  }
}

void reactioneaza() {
  if (stare == ALERTA) {
    digitalWrite(LED, HIGH);
    tone(BUZZER, 1000, 100);
  } else {
    digitalWrite(LED, LOW);
  }
}

void raporteaza() {
  if (millis() - ultimaActualizare >= 1000) {
    ultimaActualizare = millis();
    Serial.print("Senzor: ");
    Serial.print(citesteSenzor());
    Serial.print("  Stare: ");
    Serial.println(stare == ALERTA ? "ALERTA" : "linistit");
  }
}

// ===== 5. SETUP si LOOP =====
void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BUTON, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  if (butonApasat()) {
    Serial.println("Buton apasat!");
  }
  actualizeazaStarea();
  reactioneaza();
  raporteaza();
  delay(20);
}
```

| Secțiune | Ce conține |
|----------|------------|
| **1. Pini** | toate `const int` cu pini |
| **2. Setări** | praguri, durate, viteze |
| **3. Stare** | variabile globale, `enum` |
| **4. Funcții** | `citeste…`, `actualizeaza…`, `reactioneaza`, `raporteaza` |
| **5. Setup + loop** | foarte scurte, doar apelează funcții |

Cu această structură, când ceva nu merge, știi **în ce funcție** să cauți.

### 4) Planul de teste
Completează un tabel de teste pentru proiectul tău:

| # | Ce fac | Ce ar trebui să se întâmple | A mers? |
|---|--------|-----------------------------|---------|
| 1 | | | ☐ |
| 2 | | | ☐ |
| 3 | | | ☐ |
| 4 | | | ☐ |
| 5 | | | ☐ |

Un proiect bun are **cel puțin 5 teste**, inclusiv unul „cu probleme” (ex. senzor deconectat, valori extreme).

### 5) Dacă te blochezi
Mergi pe această listă:

1. **Ce ar trebui să facă** piesa? Ce face de fapt?  
2. Testează piesa **singură**, într-un program mic.  
3. Verifică **firele**, unul câte unul, cu schema.  
4. Afișează valorile în **Serial Monitor**.  
5. Caută eroarea **din prima linie** a mesajului de compilare.  
6. Explică problema cuiva (sau unui obiect): de multe ori găsești singur răspunsul.

---

## Greșeli frecvente
1. **Tot proiectul într-un singur pas** — greu de depanat.  
2. **Nume vagi** (`a`, `b`, `x`) — folosește `temperatura`, `lampaAprinsa`.  
3. **Praguri în mijlocul codului** — pune-le la „Setări”.  
4. **`delay` lung** — blochează restul proiectului.  
5. **Nicio copie de siguranță** — salvează `_v1`, `_v2`.

---

## De făcut azi — proiectul final

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Circuit + program cu funcția principală |
| **Complet** | Minim + toate cele 8 cerințe + 5 teste |

### Pasul 1 — Minim
- [ ] Circuitul e complet  
- [ ] Funcția principală merge  

### Pasul 2 — Complet
- [ ] 8 cerințe bifate  
- [ ] Tabel de teste completat  
- [ ] Numele `A4_L09` e corect

---

## Bonus
- [ ] O funcție „surpriză” (un efect, un sunet, o glumă pe LCD)  
- [ ] Scrie un **README** de 5 rânduri: ce face, cum se folosește

## Recapitulare rapidă
1. Planifică, apoi construiește  
2. O piesă, un test  
3. Program pe secțiuni: pini, setări, stare, funcții, setup + loop  
4. Testează inclusiv cazurile ciudate

## Pe placa reală *(opțional)*
Pentru un proiect fizic: pune circuitul într-o cutie, etichetează fiecare fir și fă o poză a schemei. Poți continua după curs!

## Quiz scurt
- De ce `setup()` și `loop()` trebuie să fie scurte?  
- Ce rol are tabelul de teste?  
- Ce faci prima dată când ceva nu merge?

## Temă
Pregătește o prezentare de **2 minute** pentru ora următoare (vezi pașii din L10).
