# Roblox Modul 3 — Game Logic (Obby cu scor)

**Code Kids Play** · Roblox Studio · Badge: **Game Logic**  
**Public:** **12+ ani** · jocul propriu-zis pe **același Obby**  
**Place:** `Prenume_Nume_M3` (copie din M2)  
**Plasă de siguranță:** dacă Obby-ul din M1/M2 nu mai e jucabil — pornești de la **Place-ul de bază al profesorului** (aceleași obiective L1–L10 pe acel fișier).

| # | Fișier | Titlu |
|---|--------|--------|
| 1 | L1-Leaderstats.md | leaderstats (scor pe jucător) |
| 2 | L2-GUI-scor.md | GUI: scor pe ecran |
| 3 | L3-RemoteEvent.md | RemoteEvent (client → server) |
| 4 | L4-Server-nu-are-incredere.md | Minim securitate: serverul decide |
| 5 | L5-Checkpoint-cu-script.md | Checkpoint care salvează progresul în rundă |
| 6 | L6-Respawn.md | Cădere / respawn |
| 7 | L7-Timer-sau-vieti.md | Timer **sau** vieți |
| 8 | L8-Polish-loop.md | Bucla de joc curată |
| 9 | L9-Mini-proiect-Obby-scor.md | Mini-proiect: Obby + scor |
| 10 | L10-Completare-si-prezentare.md | Completare + prezentare + insignă |

---

## Ce acoperă Modulul 3

| Concept | Unde | Notă |
|---------|------|------|
| leaderstats | L1 | Echivalent „variabilă pentru toți” / scor Scratch |
| ScreenGui / TextLabel | L2 | GUI = pe ecran, nu în Workspace |
| RemoteEvent | L3 | Echivalent mesaje Scratch, cu miză client/server |
| Server autoritar (Minim) | L4 | **Se reia** la M4 L4 (shop) — „serverul verifică plata” |
| Checkpoint funcțional | L5 | Față de checkpointul **vizual** din M1 |
| Respawn | L6 | |
| Timer sau vieți | L7 | Alege **una** pe Minim |
| Capstone Obby jucabil cu scor | L9–L10 | Tot **același** Obby, nu un joc nou |

**Nu în M3:** DataStore (între sesiuni), ModuleScript, NPC, inventar.

## Minim vs Complet (modul)

| | M3 |
|--|-----|
| **Minim** | Obby parcurgibil + scor vizibil (leaderstats și/sau GUI) + 1 checkpoint cu script |
| **Complet** | + RemoteEvent Minim + timer **sau** vieți + prezentare |

Modul 2: `../modul2/` · Modul 4: `../modul4/` · Curriculum: `../README.md`
