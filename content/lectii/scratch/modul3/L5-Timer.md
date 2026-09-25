# LECȚIA 5 — Proiect: „Ai 20 de secunde”
**Modulul 3 · Jocuri · Cam 2 ore**  
**Code Kids Play**

> La finalul orei ai un joc cu **timer**: în 20 de secunde trebuie să prinzi 5 stele (sau obiectivul tău).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Timp rămas = countdown |
| 10–30 | Variabila `timp` |
| 30–95 | Proiect complet |
| 95–110 | Echilibrează: prea greu / ușor |
| 110–120 | Temă |

---

## Ideea principală
`timp = 20` → în fiecare secundă −1.  
Dacă timp = 0 și n-ai terminat → pierzi.  
Dacă ai ajuns la scorul țintă înainte → câștigi.

## Proiect de finalizat AZI — „Contra cronometrul”
1. `timp` pe scenă  
2. Forever: așteaptă 1s → timp −1  
3. Scor: prinzi stele (+1)  
4. Dacă scor = 5 → „Ai câștigat!” + stop  
5. Dacă timp = 0 → „Timpul a expirat!” + stop  
6. Steag verde: timp 20, scor 0, stele la loc  

**Gata când:** poți câștiga și poți pierde pe timp.

## Bonus / Provocare (dacă ai terminat)
- [ ] Timer vizibil care **scade** (countdown)  
- [ ] Ultimele 5 secunde: sunet de panică / clipire  
- [ ] Bonus timp: prinde un obiect → +3 secunde

## Temă
Încearcă 15 sau 30 de secunde.
