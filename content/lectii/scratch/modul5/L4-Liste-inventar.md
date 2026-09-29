# Lecția 4 — Liste și inventar
**Modulul 5 · Mecanici de joc · Block 2**  
**Code Kids Play · Maestru de jocuri**

> Azi: prima **listă** Scratch pe bune — `adaugă`, `șterge`, `conține?` — inventar vizibil.  
> Fișier **nou**: `Prenume_Nume_M5_L4` · proiect: **„Inventarul meu”**  
> **Pod M6:** aici înveți **operatorii pe listă**; în Cubes (M6 L4) dai **cantități** (lemn=5, piatră=3).

---

## Obiectiv
**Minimum:** listă `inventar` · colectezi ≥**3** iteme (`adaugă`) · UI/listă vizibilă · `conține [item]?` decide ceva pe scenă · poți `șterge` / consuma ≥1 item · reset listă la steag.  
**Complet:** Minim + 2 tipuri de iteme **sau** nu adaugi duplicat dacă `conține?` **sau** sloturi UI (sprite-uri) pe lângă listă.

## De ce contează
Fără liste, inventarul din M6 e doar variabile separate.  
`conține?` = baza pentru chei, power-up-uri, shop (L6) și craft (M6).

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Listă = rând de cutii; operatori pe tablă |
| 15–30 | Design: ce iteme colectezi |
| 30–100 | Colectare + conține? + șterge |
| 100–120 | Test coleg: „ai cheia?” fără să îi spui tu |

**Operatori Minim (pe tablă):**  
- `adaugă [Cheie] la [inventar]`  
- `șterge (1) din [inventar]` / șterge tot  
- `[inventar] conține [Cheie]?`

---

## Pas cu pas

### 1) Creezi lista
1. Proiect nou → `Prenume_Nume_M5_L4`  
2. Listă `inventar` bifată vizibilă (sau UI propriu + listă în spate)  
3. Steag: `șterge tot din inventar`  

**Încearcă tu (5 min)**  
- [ ] Lista e goală la steag  

### 2) Colectare *(Minim)*
1. ≥3 obiecte pe scenă (sau clone)  
2. La atingere / click: `adaugă [Nume] la inventar` + `ascunde` obiectul  
3. Nu adăuga de 100 ori pe secundă — o dată (șterge obiectul sau flag)

**Încearcă tu (20 min)**  
- [ ] 3 iteme apar în listă  

### 3) `conține?` + consum *(Minim)*
1. Ușă / buton: `dacă inventar conține [Cheie]?` → deschide / mesaj / treci  
2. Altfel: „Îți trebuie Cheia!”  
3. Consum: la folosire `șterge` itemul din listă (sau șterge prima apariție)

**Încearcă tu (20–25 min)**  
- [ ] Fără cheie = blocat  
- [ ] Cu cheie = trece · (opțional) cheia dispare din listă  

### 4) Complet
Alege **cel puțin una**:  
- [ ] 2 tipuri (Cheie + Monedă) cu reacții diferite  
- [ ] `dacă conține?` → nu mai `adaugă` duplicat  
- [ ] Iconuri pe scenă care se aprind când ai itemul  

---

## Greșeli frecvente
1. **Doar variabile `are_cheie=1`** — Minim cere **listă** și operatori.  
2. **Listă invizibilă + zero UI** — colegul nu vede inventarul.  
3. **Adaugă în forever** — listă cu 500 „Cheie”.  
4. **Conține? fără efect** — trebuie să schimbe ceva pe scenă.  
5. **Confuzie cu M6** — azi iteme pe **nume în listă**; mâine cantități pe tip.

---

## De făcut azi
Salvat: `Prenume_Nume_M5_L4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim** | adaugă · conține? · șterge/consum · UI · reset · test coleg |
| **Complet** | Minim + 2 tipuri **sau** anti-duplicat **sau** iconuri |

---

## Bonus
- [ ] Inventar max 5 sloturi  
- [ ] Notă pe foaie: „În M6: lemn/piatră ca numere”

## Recapitulare rapidă
1. Listă = inventar pe nume  
2. `conține?` deschide uși / puteri  
3. Pod direct spre M6  

## Schema pe scurt

**Colectează**  
atinge item → `adaugă [Cheie] la inventar` → ascunde item  

**Folosește**  
`dacă inventar conține [Cheie]?` → deschide · `șterge` din listă  

**Quiz scurt:**  
- Ce face `conține?`?  
- De ce nu doar o variabilă?  
- Ce e diferit în inventarul din M6?

## Temă
Al 2-lea tip de item. Urmează L5 = **blocuri proprii**.
