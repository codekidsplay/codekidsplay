# LECȚIA 6 — Operatori relaționali + `if`
**Modulul 1 · Bazele C++ · Cam 2 ore**  
**Code Kids Play · Junior Coder**

> La final: programul ia o **decizie** cu `if` (ca „dacă” din Scratch).

### Exemplu
```cpp
int nota;
cin >> nota;
if (nota >= 5) {
    cout << "Admis!" << endl;
}
```

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Comparații: `< > <= >= == !=` |
| 15–35 | Structura `if` |
| 35–55 | `==` vs `=` (capcană!) |
| 55–105 | Proiect: „Ești admis?” / temperatură |
| 105–120 | Temă |

---

## Ideea principală
`if (conditie) { ... }` — rulează doar dacă e adevărat.
**Nu confunda** `=` (atribuie) cu `==` (compară).

## Proiect / exerciții de finalizat AZI
- [ ] Cel puțin un `if` cu condiție reală
- [ ] Mesaj diferit când condiția e adevărată
- [ ] Folosești `cin` + comparare
- [ ] Pe foaie: condiția în cuvinte
- [ ] `Nume_L6.cpp`

**Gata când:** testezi ambele cazuri (adevărat / fals).

## Bonus / Provocare (dacă ai terminat)
- [ ] 2 `if`-uri separate în același program
- [ ] Compari 2 numere citite
- [ ] Capcană: scrii greșit `=` în if și observi comportamentul

## Temă
Problema: dacă n e pozitiv → „pozitiv”.
