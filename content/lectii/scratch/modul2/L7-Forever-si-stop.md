# LECȚIA 7 — Forever și stop
**Modulul 2 · Logică · Cam 2 ore**  
**Code Kids Play**

> La final știi: cum ții un joc „aprins” cu forever și cum îl oprești când trebuie.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap |
| 10–35 | Repetă vs forever |
| 35–60 | Stop this script / stop all |
| 60–90 | Joc care rulează până la victorie |
| 90–110 | Mini-proiect: buclă de joc curată |
| 110–120 | Temă |

---

## Ideea principală
- **Repetă 10** = de 10 ori, apoi gata  
- **Forever** = tot timpul (până oprești)  
- **Stop** = oprește scriptul sau totul  

Sfat: la steagul verde, **un** forever principal pentru control.  
Nu pune 5 forever care se calcă fără motiv.

## Exerciții
1. Forever: dacă tasta e apăsată → mișcă  
2. Dacă scor = 5 → spune „Gata!” + **stop all**  
3. Click pe „buton stop” (personaj) → stop all  

## Mini-proiect
Joc mic (scor + control).  
Când câștigi: mesaj + stop.  
La steagul verde: totul repornește curat (scor 0, poziții ok).

## Bonus / Provocare (dacă ai terminat)
- [ ] Forever pentru mișcare + **stop this script** la victorie (nu stop all)  
- [ ] Timer pe scenă care crește în forever până la stop  
- [ ] Buton Pauză: o variabilă `pauza` blochează mișcarea

## Temă
Adaugă un buton „Reîncepe” (click → scor 0 + du personajul la start). Opțional, fără stop all.
