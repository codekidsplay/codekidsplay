# Lecția 10 — Insigna inteligentă + badge
**Modulul 1 · Primii pași cu micro:bit (blocuri)**  
**Code Maker Club · micro:bit Starter**

> Azi pui laolaltă tot ce ai învățat în Modulul 1, o prezinți colegilor și primești insigna **micro:bit Starter**.  
> Proiect: **„Insigna inteligentă”** · `Prenume_Nume_MB1_L10`

---

## Obiectiv
La finalul orei ai o insignă micro:bit care îți spune numele, arată temperatura, alege răspunsuri la întâmplare și numără câte ori ai apăsat un buton.  
**Minim:** numele la pornire + A (`Happy`) + B (temperatura) + scuturare (Da / Nu).  
**Complet:** Minim + **A+B** arată lumina + un contor `apasari` care la a 10-a apăsare arată o inimă.

## De ce contează
Un proiect adevărat nu are un singur truc. Folosește **mai multe lucruri deodată**: butoane, variabile, decizii și senzori. Azi vezi că le știi pe toate și că le poți combina.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Recap Modul 1: ce știm să facem? |
| 10–25 | Planul insignei pe foaie (ce face fiecare buton) |
| 25–65 | Construim insigna (**Minim**) |
| 65–85 | Lucruri în plus: lumina și contorul (**Complet**) |
| 85–105 | Prezentare: fiecare își arată insigna (1 minut) |
| 105–120 | **Verificarea Modulului 1** + autoevaluare + badge |

**Unelte azi:** tot ce am învățat în L1–L9.

---

## Pas cu pas

### 1) Planul pe foaie
Completează un tabel: ce face insigna ta la fiecare gest?

| Gest | Ce face placa |
|------|----------------|
| Pornire | derulează numele |
| **A** | față veselă (+ numără apăsările) |
| **B** | arată temperatura |
| **A+B** | arată lumina din cameră |
| **Scuturare** | răspunde `Yes` sau `No` la întâmplare |

### 2) Insigna — Minim
Creezi proiectul `Prenume_Nume_MB1_L10` și variabila `raspuns`.

```text
on start
    show string "Ana"

on button A pressed
    show icon [Happy]

on button B pressed
    show number temperature

on shake
    set raspuns to pick random 0 to 1
    if raspuns = 0 then
        show icon [Yes]
    else
        show icon [No]
```

În loc de `Ana` scrii **prenumele tău**, fără diacritice.

**Ce vezi pe ecran:** mai întâi trece numele. Apoi: A → față veselă · B → temperatura (de exemplu `23`) · scuturare → bifă sau X.

### 3) Complet — lumina și contorul
Creezi variabila `apasari` (câte ori ai apăsat A).

```text
on start
    set apasari to 0
    show string "Ana"

on button A pressed
    change apasari by 1
    show icon [Happy]
    if apasari = 10 then
        show icon [Heart]
        set apasari to 0

on button B pressed
    show number temperature

on button A+B pressed
    show number light level

on shake
    set raspuns to pick random 0 to 1
    if raspuns = 0 then
        show icon [Yes]
    else
        show icon [No]
```

- La a 10-a apăsare de A, fața veselă e înlocuită imediat de **inimă**, apoi contorul pornește iar de la `0`.  
- **A+B** derulează valoarea luminii (de la 0 la 255).  
- Dacă apeși două butoane în același timp cu scuturarea, blocurile pot rula **unul peste altul**. Testează pe rând.

### 4) Testul insignei
Dă insigna unui coleg și lasă-l să-i testeze toate gesturile. El notează:
- [ ] Numele se vede clar  
- [ ] A, B, A+B și scuturarea merg  
- [ ] Fiecare gest schimbă poza de pe ecran  
- [ ] Contorul arată inima la a 10-a apăsare (Complet)

### 5) Prezentarea (1 minut)
Spune în ordinea asta:
1. **Cum se numește proiectul** și ce face.  
2. **Arată** fiecare gest pe placă.  
3. Spune **un lucru care ți s-a părut greu** și cum l-ai rezolvat.  
4. Spune **ce ai vrea să adaugi** (o idee).

---

## Verificarea Modulului 1
Răspunde pe foaie, fără să te uiți în lecții. Răspunsurile sunt la final.

1. Câte LED-uri are ecranul micro:bit și cum sunt așezate?  
2. Care e diferența dintre `on start` și `forever`?  
3. Ce înseamnă `pause (ms) 500`?  
4. Cum faci placa să răspundă când apeși **A și B deodată**?  
5. Ce este o variabilă? Dă un exemplu.  
6. Care e diferența dintre `set score to 5` și `change score by 5`?  
7. Ce face `if … else`?  
8. De câte ori repetă `for index from 0 to 4`?  
9. Ce măsoară accelerometrul? Dă un gest pe care îl poate recunoaște.  
10. Cum ai folosi `light level` ca să faci un felinar?

**Autoevaluare** (bifează sincer):

| Știu să… | Da | Aproape | Încă nu |
|----------|----|---------|---------|
| trimit un program pe placă | ☐ | ☐ | ☐ |
| desenez și animez pe LED-uri | ☐ | ☐ | ☐ |
| folosesc butoanele A, B, A+B | ☐ | ☐ | ☐ |
| creez și schimb o variabilă | ☐ | ☐ | ☐ |
| folosesc `if` și `else` | ☐ | ☐ | ☐ |
| folosesc bucle | ☐ | ☐ | ☐ |
| citesc accelerometrul, lumina, temperatura | ☐ | ☐ | ☐ |

**Răspunsuri pentru profesor:**
1. 25, în 5 rânduri și 5 coloane. 2. `on start` rulează o dată, `forever` se repetă. 3. Așteaptă jumătate de secundă. 4. `on button A+B pressed`. 5. O cutie cu nume și valoare, de exemplu `score`. 6. `set` pune valoarea; `change` o adună la valoarea veche. 7. Face un lucru dacă e adevărat, altul dacă nu. 8. De 5 ori. 9. Mișcarea; de exemplu `shake`. 10. Dacă `light level` e sub un prag, aprinzi LED-urile.

---

## Greșeli frecvente
1. **„Insigna nu mai pornește”** — ai prea multe blocuri pe masă, neconectate. Verifică ce e gri.  
2. **„A+B nu merge”** — apasă ambele butoane simultan.  
3. **„Numele se vede ciudat”** — diacritice în text.  
4. **„Inima nu apare la 10”** — `change apasari by 1` e după `if`, nu înainte.  
5. **„Pe ecran rămâne o poză”** — după un gest poza rămâne până la următorul. E normal, nu e o greșeală.  
6. **„Programul nu e pe placă”** — ai uitat **Download** după ultima modificare.

---

## De făcut azi — „Insigna inteligentă”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | Nume la pornire · A = `Happy` · B = temperatura · scuturare = `Yes` / `No` |
| **Complet** | Minim + A+B = lumina + contor `apasari` cu inimă la 10 |

### Pasul 1 — Minim
- [ ] Prenumele tău derulează la pornire  
- [ ] A, B și scuturarea funcționează  
- [ ] Programul e pe placa adevărată  

**→ Minim când:** un coleg testează cele trei gesturi.

### Pasul 2 — Complet
- [ ] A+B arată lumina  
- [ ] Contorul `apasari` arată inima la a 10-a apăsare  
- [ ] Prezentarea de 1 minut a fost făcută  
- [ ] Verificarea Modulului 1 completată  
- [ ] Numele fișierului e `MB1_L10`  

**Badge:** completezi **Complet + Verificarea** și primești insigna **micro:bit Starter**.

---

## Bonus (după Complet)
- [ ] Adaugă o animație în `forever`, de exemplu un ceas simplu sau o floare  
- [ ] Scrie un nume mai lung și vezi cum derulează  
- [ ] Fă un **al doilea mod**: cu `on logo pressed` (V2) arată alte mesaje  
- [ ] Desenează pe foaie un **ambalaj** pentru insigna ta

## Recapitulare rapidă
1. Ai învățat **LED-uri, butoane, variabile, decizii, bucle** și **senzori**.  
2. Un proiect bun **combină** mai multe lucruri.  
3. Prezentarea spune: ce face, cum, ce a fost greu, ce urmează.  
4. Testează întotdeauna **pe placa adevărată**.  
5. Salvează proiectul cu un nume clar.

## Schema pe scurt *(pe foaie)*

Pornire (nume) · A (Happy + contor) · B (temperatură) · A+B (lumină) · scuturare (Da / Nu)

**Quiz scurt:**  
- Care gest din insignă folosește un senzor de mișcare?  
- Ce variabile ai folosit?  
- Unde ai folosit `if`?  
- Ce ai vrea să adaugi în versiunea 2?

## Ce urmează — Modulul 2
Placa **vorbește cu alte plăci** prin **radio**, ai mai multe plăci în joc și legi **LED-uri externe** la pini.

## Temă
Fă o poză programului tău (screenshot) și o poză a insignei pe placă. Adu-le mâine pentru **portofoliul** tău.
