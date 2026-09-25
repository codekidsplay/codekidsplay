# LECȚIA 4 — Taste și mouse
**Modulul 2 · Logică · Cam 2 ore**  
**Code Kids Play**

> La final știi: tu controlezi personajul cu tastele și cu mouse-ul.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap atingere |
| 10–35 | Taste: săgeți / WASD |
| 35–60 | Mouse: pointer și click |
| 60–90 | Miscare fluidă cu forever + dacă tasta e apăsată |
| 90–110 | Mini-proiect: „Pilotai labirintul” |
| 110–120 | Temă |

---

## Ideea principală
- **tasta … e apăsată?** → da/nu  
- **mouse-ul e apăsat?**  
- **du-te la pointerul mouse-ului** (urmărește cursorul)

Pattern bun:
```
când se apasă steagul verde
forever
  dacă tasta dreapta e apăsată atunci
    schimbă x cu 5
```

## Exerciții
1. Săgeți: stânga/dreapta/sus/jos  
2. Spațiu → salt scurt (schimbă y, așteaptă, revino)  
3. Personajul urmărește mouse-ul 3 secunde, apoi se oprește  

## Mini-proiect
Controlezi eroul cu tastele.  
Pe scenă: 2–3 obstacole (personaje sau culori).  
Scop: ajungi la o „ieșire” (alt personaj / culoare).

## Bonus / Provocare (dacă ai terminat)
- [ ] Controale **săgeți + WASD** pe 2 personaje (mini 2 jucători)  
- [ ] Urmărește mouse-ul **doar** când ții apăsat click  
- [ ] Viteză variabilă: Shift = mai rapid (dacă tasta e apăsată)

## Temă
Schimbă viteza (3, 5, 8). Ce e mai ușor de controlat?
