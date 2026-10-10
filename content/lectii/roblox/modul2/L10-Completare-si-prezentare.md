# Lecția 10 — Completare + prezentare (Script Starter)
**Modulul 2 · Script Starter**  
**Code Maker Club · Roblox Studio**

> Azi **termini** mecanismele din L9, le **arăți** clasei și primești insigna **Script Starter**.  
> Place: `Prenume_Nume_M2` *(opțional: copie `Prenume_Nume_M2_L10`, ca să nu strici versiunea veche)*  
> Exemple: `Ana_Pop_M2` · `Ana_Pop_M2_L10`

---

## Obiectiv
La finalul orei ai îmbunătățit Obby-ul cu **scripturi**, l-ai prezentat și ai închis Modulul 2.  
**Minimum:** **1** îmbunătățire din A–F, **testată** + Output curat + Place salvat + prezentare → **e suficient pentru insignă**.  
**Ținta orei (Complet):** **2** îmbunătățiri din A–F + prezentare + salvare.

## De ce contează
Un script care „merge o dată” nu e încă un script bun. Un script bun merge **de fiecare dată**, nu dă erori și îl poți **explica**.  
Insigna **Script Starter** = știi să scrii primele scripturi în Luau, să alegi **Script** pentru logica jocului și să citești Output-ul. În **Modulul 3** adăugăm scor, ecran (GUI) și comunicarea între client și server.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + **Minim vs Complet** + reguli prezentare |
| 10–25 | Lista A–F + checklist „rulează curat” (**Încearcă tu**) |
| 25–65 | **Completare** pe Obby (lucru individual) |
| 65–85 | Prezentări (~1–2 min × max. **10** elevi) |
| 85–120 | Quiz recap + **insignă** + ce urmează în M3 |

La min **65** încep prezentările **oricum**. Cu **1** îmbunătățire ești ok pentru insignă.

---

## Pas cu pas

### 1) Idei de upgrade (alege din A–F)
Nu refaci de la zero. Deschizi Obby-ul din L9 și **adaugi**.

| Literă | Upgrade | Ce folosește |
|--------|---------|--------------|
| A | **Moneda reapare** după 5 secunde (în loc să dispară) | `Touched`, `task.wait`, variabilă |
| B | **3 monede** pe traseu (copii ale scriptului sau un Folder cu un singur script) | `Touched`, copiere script / `for` |
| C | **Ușă cu 2 butoane** — unul înainte și unul după ea (să nu rămâi blocat) | `ClickDetector`, funcții |
| D | **Lavă** pe traseu (cu drum de ocolire) + nume în Output | `Touched`, `Humanoid` |
| E | **Platformă ascunsă** care apare / dispare la click | `not`, `ClickDetector` |
| F | **Semnal** sau **semafor de start** care pâlpâie / numără | `while`, `for`, `task.wait` |

*(**Minim** = **1** literă testată în Play. **Complet** = **2**. Nu începe a doua până prima nu e curată în Output.)*

**Încearcă tu — alegi (3 min)**  
- [ ] Scrii pe foaie **literele** alese  
- [ ] Spui care e **mai ușoară** și care e **mai grea**

### 2) Checklist „rulează curat” — la fiecare upgrade
- [ ] **Output curat** la Play (fără linii roșii)  
- [ ] Prefix corect: `Srv_` pentru Script, `Cli_` pentru LocalScript  
- [ ] Numele din cod = numele din Explorer  
- [ ] Funcționează de **două ori la rând**  
- [ ] Obby-ul rămâne **terminabil** de la Spawn la Finish

### 3) Rețete scurte pentru upgrade-uri

**A — Moneda reapare** (în loc de `moneda:Destroy()`):

```lua
if humanoid and not luata then
    luata = true
    print("Monedă luată!")
    moneda.Transparency = 1
    task.wait(5)
    moneda.Transparency = 0
    luata = false
end
```

*Indiciu:* cât timp e invizibilă, `luata` e `true`, deci nu o mai poți lua.

**C — A doua ușă / al doilea buton:** copiezi `Buton_Usa`, îl pui **după** ușă, îi lași **același** `Srv_Usa` (scriptul face referire la `workspace.Usa`, deci deschide aceeași ușă).

**D — Lava:** același cod ca la L6; atenție la **drum de ocolire**.

**E — Platforma ascunsă:** `vizibila = not vizibila` — codul din L7.

**F — Semnal / semafor:** `while true do … task.wait(…) end` (L8) · `for i = 3, 1, -1 do … end`.

**Încearcă tu — rețeta (3–4 min)**  
- [ ] Ai găsit codul tău din lecția potrivită (L6 / L7 / L8 / L9)  
- [ ] Ai adaptat numele (`Moneda1`, `Usa` etc.)

### 4) Completare — lucru individual
1. Salvezi o copie „de siguranță” dacă vrei (`Prenume_Nume_M2_L10`)  
2. **Un upgrade** → Play → Output curat → Stop  
3. Abia apoi **al doilea** (pentru Complet)  
4. La fiecare pas: **Play · Stop · Salvat**

### 5) Prezentare (1–2 minute)
Spui, în ordine:
1. **Ce mecanisme** are Obby-ul tău (monedă, ușă, semnal…)  
2. **Arăți în Play** (nu doar în editare!)  
3. **Un script** deschis: ce tip e (`Script` / `LocalScript`) și **de ce** (server pentru reguli)  
4. **O greșeală** pe care ai reparat-o (eroare citită în Output)  
5. Răspunzi la **o întrebare** de la clasă

**Încearcă tu — pregătire (3 min)**  
- [ ] Ai 4 propoziții notate  
- [ ] Obby-ul se joacă fără pauze în prezentare

### 6) Insigna
1. **Minim** (1 upgrade + prezentare + Output curat + salvat) → **insignă Script Starter**  
2. **Complet** = 2 upgrade-uri: ținta orei, nu pragul pentru insignă

---

## Greșeli frecvente
1. **Refaci tot** — nu: **adaugi** pe L9.  
2. **Două upgrade-uri netestate** — la min 65 e stricat; **1 → testezi → 2**.  
3. **Prezentare doar din editare** — rulează Play ca să se vadă mecanismul.  
4. **Roșu în Output, dar „merge”** — repară înainte: o eroare rămâne eroare.  
5. **Script duplicat** (două scripturi care fac același lucru) — la verificare, ștergi cel în plus.  
6. **Lavă / ușă care blochează** — Obby-ul trebuie să poată fi terminat.  
7. **„N-am 2, deci n-am reușit”** — **1** + prezentare = Minim = **insignă**.

---

## De făcut azi — Completare + prezentare + insignă
Salvat: `Prenume_Nume_M2` și/sau `Prenume_Nume_M2_L10`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit” + insignă)** | **1** din A–F + Output curat + **prezentare** + salvare |
| **Complet (ținta orei)** | Minim + a **2-a** din A–F |

Dacă rămâi în urmă: **prezinți cu o îmbunătățire — e suficient pentru insignă.**

### Pasul 1 — Completare
- [ ] Obby L9 deschis  
- [ ] Minim: 1 literă, testată  
- [ ] Complet: încă 1 literă  
- [ ] Salvat  

**→ Minim când:** 1 upgrade + Output curat + gata de prezentat.

### Pasul 2 — Prezentare
- [ ] Ai prezentat (mecanisme + Play + script + greșeală reparată)  
- [ ] Ai dat / primit un compliment  

### Pasul 3 — Închidere modul
- [ ] Place salvat  
- [ ] Quiz (ideal 5; minim 3)  
- [ ] Insigna **Script Starter**  

**Gata Minim când:** 1 upgrade, prezentare, insignă.  
**Gata Complet când:** 2 upgrade-uri + prezentare + salvare.

---

## Bonus (dacă ai terminat Complet / după prezentare)
- [ ] A 3-a îmbunătățire  
- [ ] Schimb: un coleg joacă 2 minute și notează **1 bug**; îl repari  
- [ ] Pe foaie: **1 idee** pentru M3 (ex. „aș vrea să văd câte monede am pe ecran”) — M3 face exact asta  
- [ ] Mecanism cu **trei monede și o ușă** care se deschide când le-ai luat pe toate *(greu — se rezolvă mult mai ușor în M3)*

## Recapitulare rapidă
1. L10 = **completezi** L9, apoi **prezinți**  
2. **Minim** = 1 upgrade + Output curat + prezentare → **insignă**  
3. Reguli de joc → **Script (server)**, prefix `Srv_`  
4. **Output curat** = primul test al oricărui script  
5. M2 = primele scripturi · M3 = scor, ecran (GUI), RemoteEvent  
6. Place-ul tău: `Prenume_Nume_M2` (în M3 faci o copie `_M3`)

**Quiz scurt (cu profesorul):**  
1. Care e diferența dintre **Script** și **LocalScript**?  
2. Ce face `print` și unde vezi rezultatul?  
3. Ce face `if humanoid and not luata then`?  
4. De ce un `while true do` are nevoie de `task.wait`?  
5. Cum se numește Place-ul tău?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția și upgrade-urile tale. Dacă ai nevoie de un model, profesorul arată pe proiector un Obby cu 2 mecanisme și Output curat.)*

## Temă
Opțional: arată familiei Obby-ul (2 minute de Play) și explică **un** script cu cuvintele tale.  
În **Modulul 3** vezi scorul pe ecran, faci checkpoint-uri care „țin minte” unde ai fost și înveți cum vorbesc **clientul și serverul** între ele (RemoteEvent) — ușa spre un joc adevărat.
