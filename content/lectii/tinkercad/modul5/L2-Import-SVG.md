# Lecția 2 — Import SVG
**Modulul 5 · Avansat și proiectare tehnică**  
**Code Maker Club · Design Pro**  
**Public:** recomandat **10+**

> Azi transformi un **desen 2D** (fișier SVG) într-un obiect 3D: un **breloc cu simbolul tău**.  
> Proiect: **„Breloc cu simbol”** · `Prenume_Nume_T5_L02`

---

## Obiectiv
La finalul orei ai un **breloc**: o placă mică, cu un simbol 3D importat deasupra și o gaură pentru inel.  
**Minim:** simbol importat (SVG) cu **latura cea mai lungă de 20 mm** · grosime **2 mm** · pe placa-bază **50·30·3** · centrat.  
**Complet:** Minim + **gaură de breloc** **Ø4**, cu marginea la **5 mm** de capătul plăcii + **Text** cu numele tău gravat pe spatele plăcii.

## De ce contează
Multe obiecte reale (logo-uri, ștampile, brelocuri) pornesc de la un **desen plat**. Un fișier **SVG** nu e o poză cu pixeli, ci un desen din linii — de aceea Tinkercad îl poate umfla într-o formă 3D.

**Pregătire (profesor):** adu **2–3 SVG simple** (o stea, o inimă, o frunză, un fulger) pe un stick sau în folderul clasei. Alege forme **dintr-o singură bucată, fără detalii foarte mici**. Încearcă importul **înainte** de oră, pe același cont.  
**Dacă nu ai fișier:** în Tinkercad există forme gata făcute (stea, inimă) — le folosești ca **simbol de rezervă**; restul lecției e la fel.

**Notă:** imprimanta 3D **nu** e folosită la oră — doar design.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ce e un SVG? Alegem simbolul |
| 15–50 | Pas cu pas: import · scalare · bază |
| 50–100 | Minim → Complet (gaură, text) |
| 100–120 | Verificare, recap, salvare |

**Unelte azi:** **Import** · mărimi cu numere · **Shift** · săgețile de la tastatură *(mutare exactă, ca în L1)* · **Align** (**L**) · **Box** · **Cylinder** · **Hole** · **Text** · **M** *(Mirror)* · **Ctrl+G** · **View Cube**

---

## Pas cu pas

### 1) Proiect nou
1. `Prenume_Nume_T5_L02` · Snap Grid **1.0 mm**

### 2) Importul
1. Apeși **Import** *(sus, dreapta)* și alegi fișierul **SVG** primit  
2. În fereastra de import poți vedea mărimea și, uneori, o opțiune de scalare — lași valorile și apeși **Import**  
3. Simbolul apare pe plan, probabil prea mare sau prea mic  
4. **Dacă nu merge importul:** pune o **stea** sau o **inimă** din forme; continuăm la fel

### 3) Mărimea simbolului
1. Selectezi simbolul. Ții apăsat **Shift** și tragi de un mâner alb din colț, ca proporțiile să rămână; apoi corectezi cu numere până când **latura cea mai lungă** (lungimea sau lățimea) e **20 mm**. *Dacă simbolul iese întins sau turtit, ai uitat Shift: apasă Ctrl+Z și reia.*  
2. Apoi tastezi **grosimea (pe verticală)** la **2 mm** *(doar înălțimea; lungimea și lățimea nu le mai atingi)*  
3. Din **Front**: un simbol subțire; din **Top**: silueta lui

### 4) Placa-bază
1. **Box** → **50 · 30 · 3**  
2. Simbolul și placa stau amândouă pe plan. Selectezi simbolul și placa → **L** → mijloc pe stânga–dreapta și pe față–spate *(simbolul pe mijlocul plăcii)*  
3. Selectezi doar simbolul și îl ridici la **3 mm** cu conul negru *(stă pe placă)*  
4. **Color**: placa o culoare, simbolul alta

### 5) Complet — gaura de breloc
1. **Cylinder** → **4 · 4 · 7** → **Hole**  
2. **L** cu placa → mijloc pe față–spate și marginea din stânga; o muți **5 mm spre dreapta** *(marginea găurii la 5 mm, deci centrul la 5 + 2 = 7 mm: 2 mm e raza)*  
3. O cobori **1 mm** → **Ctrl+G** cu **placa** *(nu cu simbolul)*  
4. Simbolul (20 mm, la mijloc) ocupă de la 15 la 35 mm; gaura e la 5–9 mm, deci nu se ating. Dacă simbolul tău e mai lat, mută-l spre dreapta

### 6) Complet — numele pe spate
1. **Text** cu numele tău → mărimi: lungime cel mult **30 mm**, înălțimea literelor în jur de **8 mm**, grosime **2 mm** → **Hole**  
2. **M** *(Mirror)* → tragi săgeata de pe lateral, ca textul să se citească **pe dedesubt** *(oglindit văzut de sus)*  
3. **L** cu placa: mijloc pe stânga–dreapta și pe față–spate; îl cobori **1 mm** *(jumătate în placă, adâncime 1 mm)* → **Ctrl+G** cu **placa**  
4. Dacă nu reușești, lasă numele ca Text normal pe placă — tot e Complet  
5. La final: selectezi tot → **Ctrl+G**

---

## Greșeli frecvente
1. **Simbolul e uriaș** — verifică mărimea după import și tastează 20 mm.  
2. **Simbolul e deformat** — ai tras fără Shift.  
3. **Simbolul e plat** — grosimea e 0,1 mm. Tastează 2 mm.  
4. **Simbolul plutește sau e băgat în placă** — trebuie ridicat exact la 3 mm.  
5. **Detalii prea mici** — o frunză cu 50 de nervuri nu se printează. Alege forme simple.  
6. **Gaura taie simbolul** — mută simbolul sau gaura.  
7. **SVG-ul nu se importă** — fișierul poate fi prea complex; folosește rezerva (stea/inimă).

---

## De făcut azi — „Brelocul meu”

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | SVG (sau stea/inimă) 20 mm înălțime și 2 mm grosime pe placă 50·30·3, centrat |
| **Complet** | + gaură Ø4 (marginea la 5 mm) + nume pe spate |

### Pasul 1 — Minim
- [ ] Simbol importat (sau de rezervă)  
- [ ] 20 mm înălțime, 2 mm grosime  
- [ ] Placă 50·30·3  
- [ ] Simbol centrat și ridicat la 3 mm  

### Pasul 2 — Complet
- [ ] Gaură Ø4, marginea la 5 mm  
- [ ] Nume cu Text  
- [ ] **Color** · numele `T5_L02` e corect  

---

## Bonus (extra — după Complet)
- [ ] Un al doilea simbol mai mic, lângă primul  
- [ ] Margine ridicată în jurul plăcii: Box gol **50·30·2** cu Hole 46·26 înăuntru  
- [ ] Două brelocuri cu același simbol, în mărimi diferite

## Recapitulare rapidă
1. **SVG** = desen din linii, nu din pixeli  
2. După import verifici **mărimea** și **grosimea**  
3. **Shift** la scalare păstrează forma  
4. Centrat = **L**

## Schema pe scurt *(pe foaie — dacă o printezi separat)*

**Minim:** Import SVG → 20 mm înălțime (Shift) → 2 mm grosime → placă 50·30·3 → L (mijloc) → +3 mm  
**Complet:** Hole Ø4 (+5 mm) cu placa · Text

**Quiz scurt:**  
- Ce e un SVG?  
- De ce alegem forme simple?  
- Ce faci dacă simbolul e prea mare?

## Temă
Opțional: desenează pe foaie un simbol simplu (fără detalii mici) pe care l-ai vrea pe un breloc. Spune de ce e potrivit pentru 3D.
