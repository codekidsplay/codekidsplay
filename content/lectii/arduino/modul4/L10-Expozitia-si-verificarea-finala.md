# Lecția 10 — Expoziția + verificare finală
**Modulul 4 · Proiecte complete**  
**Code Kids Play · Arduino Creator**

> Ultima oră din cursul de Arduino! Îți **prezinți proiectul**, vezi proiectele colegilor și faci **verificarea finală** a tot ce ai învățat.  
> Proiect: **„Expoziția Arduino”** · `Prenume_Nume_A4_L10`

---

## Obiectiv
La finalul orei ai prezentat proiectul, ai primit feedback și ai terminat verificarea finală.  
**Minim:** prezentare de 2 minute cu demonstrație + verificare finală completată.  
**Complet:** Minim + **feedback dat** altor 2 colegi + **plan** pentru ce faci mai departe.

## De ce contează
Să explici ce ai construit e la fel de important ca să construiești. Dacă poți explica, **înțelegi** cu adevărat. Iar feedback-ul te ajută să crești.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ultimele retușuri la proiect |
| 15–70 | Prezentări (2–3 minute fiecare) |
| 70–90 | Feedback între colegi |
| 90–110 | Verificarea finală |
| 110–120 | Diplome, următorii pași |

---

## Pas cu pas

### 1) Cum prezinți în 2 minute

| Secundă | Ce spui |
|---------|---------|
| 0–15 | **Cum se numește** proiectul și **ce problemă** rezolvă |
| 15–45 | **Ce piese** are (intrări și ieșiri) și **de ce** le-ai ales |
| 45–90 | **Demonstrația**: arăți cum merge, în direct |
| 90–110 | Cea mai grea **problemă** întâlnită și cum ai rezolvat-o |
| 110–120 | Ce ai **îmbunătăți** dacă ai mai avea timp |

**Sfaturi**

- Exersează o dată înainte, cu un cronometru.  
- Pregătește **demonstrația**: știi ce butoane apeși și în ce ordine.  
- Dacă ceva nu merge, spune calm ce ar fi trebuit să se întâmple și ce crezi că e problema. Asta arată că **înțelegi**.

### 2) Foaia de feedback
Pentru **2 proiecte** ale colegilor, completează:

| Întrebare | Răspuns |
|-----------|---------|
| Numele proiectului | |
| Ce mi-a plăcut cel mai mult | |
| Ce idee mi-a dat mie | |
| O sugestie prietenoasă | |

**Regulă:** feedback **politicos**, **concret** și **util**. Nu „e urât”, ci „aș încerca un LED de altă culoare ca să se vadă mai bine”.

### 3) Verificarea finală
Răspunde în caiet sau în aplicație. Fiecare întrebare are **un singur răspuns corect**.

**Partea A — Circuite**

1. De ce folosim un rezistor de 220 Ω la un LED?  
   a) să lumineze mai tare  b) ca să nu se ardă  c) să economisească baterie
2. Cum conectăm un buton cu `INPUT_PULLUP`?  
   a) la 5V  b) la GND  c) la A0
3. De ce un motor nu se leagă direct la un pin?  
   a) pinul dă prea puțin curent  b) pinul e prea scump  c) motorul e prea ușor

**Partea B — Cod**

4. Ce face `analogRead(A0)`?  
   a) trimite curent  b) citește o valoare 0–1023  c) pornește un LED
5. Ce valori poate avea `random(1, 7)`?  
   a) 1–7  b) 1–6  c) 0–6
6. Pentru ce folosim `millis()`?  
   a) ca să măsurăm timp fără să blocăm programul  b) ca să oprim placa  c) ca să schimbăm un pin
7. Ce face `map(500, 0, 1000, 0, 100)`?  
   a) 5  b) 50  c) 500

**Partea C — Senzori și afișaje**

8. Ce măsoară HC-SR04?  
   a) lumina  b) distanța  c) temperatura
9. Câte rânduri are LCD-ul 16×2?  
   a) 1  b) 2  c) 16
10. Cum aflăm ce valoare dă un senzor?  
    a) cu Serial Monitor  b) cu un LED  c) nu se poate

**Răspunsuri** (verifică după ce termini): 1-b · 2-b · 3-a · 4-b · 5-b · 6-a · 7-b · 8-b · 9-b · 10-a

### 4) Autoevaluare — ce știu să fac acum

| Pot să… | Încă nu | Cu ajutor | Singur |
|---------|---------|-----------|--------|
| aprind un LED și îl controlez cu un buton | ☐ | ☐ | ☐ |
| citesc un potențiometru și un senzor analogic | ☐ | ☐ | ☐ |
| folosesc praguri și `if / else` | ☐ | ☐ | ☐ |
| afișez date în Serial Monitor | ☐ | ☐ | ☐ |
| afișez text pe un LCD | ☐ | ☐ | ☐ |
| comand un servo | ☐ | ☐ | ☐ |
| comand un motor cu tranzistor | ☐ | ☐ | ☐ |
| scriu funcții proprii | ☐ | ☐ | ☐ |
| folosesc `millis()` | ☐ | ☐ | ☐ |
| planific și construiesc un proiect | ☐ | ☐ | ☐ |

Pentru fiecare „Încă nu” sau „Cu ajutor”, alege **un lucru** pe care îl repeți acasă.

### 5) Ce urmează?

| Dacă ți-a plăcut… | Poți încerca… |
|--------------------|---------------|
| Robotul | un robot pe șasiu, cu driver de motoare |
| Casa inteligentă | module Wi-Fi (ESP32) și aplicații pe telefon |
| Senzorii | proiecte cu date: meteo, plante, sunet |
| Jocurile | un joc cu matrice LED sau cu ecran |
| Programarea | un curs de C++ sau Python |

Și bineînțeles, **placa reală**: tot ce ai făcut în simulator merge și pe un Arduino adevărat, cu mici adaptări.

---

## Greșeli frecvente
1. **Prezentare fără exersare** — repetă măcar o dată.  
2. **Demonstrație nepregătită** — verifică totul **înainte**.  
3. **Feedback vag** — fii concret.  
4. **Răspunsuri la întâmplare la verificare** — gândește-te, nu ghici.  
5. **Frică de greșeli** — greșelile sunt o parte din învățare.

---

## De făcut azi — „Expoziția Arduino”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Prezentare + verificare finală |
| **Complet** | Minim + feedback pentru 2 colegi + plan pentru ce faci mai departe |

### Pasul 1 — Minim
- [ ] Proiectul merge în demonstrație  
- [ ] Prezentarea durează ~2 minute  
- [ ] Verificarea finală completată  

### Pasul 2 — Complet
- [ ] 2 foi de feedback  
- [ ] Autoevaluarea completată  
- [ ] Numele `A4_L10` e corect

---

## Bonus
- [ ] Fă un **videoclip scurt** (30 s) cu proiectul tău în simulator  
- [ ] Ajută un coleg să rezolve o problemă din proiectul lui

## Recapitulare rapidă — tot cursul
1. **Modul 1:** circuite de bază, LED-uri, butoane, sunete  
2. **Modul 2:** senzori, praguri, Serial Monitor  
3. **Modul 3:** LCD, servo, motoare, tastatură, NeoPixel, IR  
4. **Modul 4:** proiecte complete, planificare, prezentare

## Pe placa reală *(opțional)*
Dacă ai un kit Arduino, reia proiectul tău pe placa reală. Atenție la alimentare și polaritate, iar un adult te ajută la lipituri.

## Quiz scurt
- Care a fost cea mai grea problemă din proiectul tău?  
- Ce senzor nou ai vrea să încerci?  
- Cum ai explica Arduino unui prieten, într-o frază?

## Temă
**Felicitări, ești Arduino Creator!** Scrie 3 idei de proiecte pe care vrei să le faci după curs și păstrează lista.
