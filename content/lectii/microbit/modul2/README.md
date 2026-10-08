# Modul 2 — Proiecte Maker (blocuri + radio)

**Badge:** micro:bit Maker  
**Vârstă:** 8+ ani · **Editor:** [makecode.microbit.org](https://makecode.microbit.org) (blocuri)  
**Prerequisit:** Modulul 1 (butoane, variabile, `if`, bucle, senzori)  
**Focus:** radio între plăci, pini și LED-uri externe, proiecte mai mari, depanare

| # | Lecție | Obiectiv | Pași principali (nucleu) |
|---|--------|----------|---------------------------|
| 1 | Panoul de comandă | Recap + meniu cu moduri | Variabila `mod`; `if / else if`; lumină, temperatură, nume; fișa proiectului |
| 2 | Poșta radio | Primele mesaje între plăci | `radio set group`; `radio send number`; `on radio received`; coduri |
| 3 | Vânătoarea de comori: cald-rece | Joc cu două plăci | Roluri (ascunzător / căutător); puterea semnalului; praguri |
| 4 | Semaforul de pe masă | LED extern pe pini | `digital write pin`; rezistență; semafor cu 3 LED-uri |
| 5 | Paznicul rucsacului | Alarmă cu stări | `while`; `on shake`; armat / dezarmat; alarmă |
| 6 | Jurnalul de măsurători | Meniu + record | `mod`; temperatură maximă; `if … > …` |
| 7 | Stația meteo la distanță | Sistem dublu | `radio send value`; emițător + receptor; alertă |
| 8 | Doctorul de cod | Depanare și curățenie | 4 programe stricate; funcții; nume clare; listă de verificare |
| 9 | Cheia și seiful radio | Proiect final Maker | Cod prin radio; răspuns înapoi; încercări greșite |
| 10 | Expoziția Maker + badge | Prezentare + verificare | Demo; Verificarea Modulului 2; badge **micro:bit Maker** |

**Salvare sugerată:** `Prenume_Nume_MB2_L01` … `MB2_L10`

**Material:** câte o placă micro:bit pe copil (pentru radio: **perechi** de plăci, pe cât posibil 2 plăci pentru fiecare pereche), cabluri USB de date. Pentru L4: LED-uri, rezistențe de 220 Ω, cabluri cu clești (crocodil) și, dacă e cazul, o plăcuță breadboard.

**Regulă de atelier pentru radio:** fiecare pereche folosește **grupul ei** (număr între 0 și 255), ca mesajele să nu se amestece între echipe.
