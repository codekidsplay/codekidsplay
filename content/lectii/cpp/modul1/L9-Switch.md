# LECȚIA 9 — `switch`
**Modulul 1 · Bazele C++ · Cam 2 ore**  
**Code Kids Play · Junior Coder**

> La final: meniu cu `switch` (zile / restaurant / opțiuni).

### Schelet
```cpp
int opt;
cin >> opt;
switch (opt) {
    case 1: cout << "Pizza\n"; break;
    case 2: cout << "Paste\n"; break;
    default: cout << "Optiune invalida\n";
}
```

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–20 | Când folosim `switch` vs `if` |
| 20–45 | `case`, `break`, `default` |
| 45–70 | Greșeala fără `break` (fall-through) |
| 70–105 | Proiect: meniu (1–4) pe consolă |
| 105–120 | Temă |

---

## Ideea principală
`switch` e bun când ai **opțiuni clare** (1, 2, 3…).
Fără `break` → cade în case-ul următor.

## Proiect / exerciții de finalizat AZI
- [ ] Meniu cu ≥3 `case` + `default`
- [ ] `break` pe fiecare case
- [ ] Citești opțiunea cu `cin`
- [ ] Testezi o opțiune invalidă (default)
- [ ] `Nume_L9.cpp`

**Gata când:** meniul răspunde corect la 3 opțiuni + una greșită.

## Bonus / Provocare (dacă ai terminat)
- [ ] Zilele săptămânii (1–7)
- [ ] Meniu calculator: +-*/ pe 2 numere
- [ ] Demonstrați fall-through (comentat) pe foaie

## Temă
Adaugă un case nou (opțiunea 5).
