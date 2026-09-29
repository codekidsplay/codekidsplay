# Scratch Modul 6 — Lume de cuburi

**Code Kids Play** · **8–10 ani** · Badge / **insignă:** **Cube Crafter**  
**Stil:** schelet M1–M5 (Obiectiv, Minim/Complet, Pas cu pas, Schema pe scurt) · **ștachetă avansată** pe tot modulul.  
**Premisă:** **un singur joc** pe 10 ședințe · `Prenume_Nume_M6_LumeCuburi`  
**Nu** e Minecraft oficial — inspirat din idee (grilă / sparge / pune / inventar / craft).  
**Culori blocuri:** [`_culori-scratch.md`](../_culori-scratch.md)

| # | Fișier | Titlu / focus |
|---|--------|----------------|
| 1 | [L1-Grila-erou.md](./L1-Grila-erou.md) | Punte M5 + mișcare pe grilă |
| 2 | [L2-Sparge-blocuri.md](./L2-Sparge-blocuri.md) | Sparge blocuri (minat) |
| 3 | [L3-Pune-blocuri.md](./L3-Pune-blocuri.md) | Pune blocuri (construcție) |
| 4 | [L4-Inventar.md](./L4-Inventar.md) | Inventar (resurse pe scenă) |
| 5 | [L5-Doua-zone.md](./L5-Doua-zone.md) | Două zone / biomi |
| 6 | [L6-Creatura-pericol.md](./L6-Creatura-pericol.md) | Creatură / pericol + HP |
| 7 | [L7-Crafting.md](./L7-Crafting.md) | Crafting simplu (2→1) |
| 8 | [L8-Misiune.md](./L8-Misiune.md) | Misiune / obiectiv de victorie |
| 9 | [L9-Meniu-instructiuni.md](./L9-Meniu-instructiuni.md) | Meniu Start + instrucțiuni |
| 10 | [L10-Showcase-badge.md](./L10-Showcase-badge.md) | Polish + prezentare + insignă |

**Flux:** același fișier L1→L10.  
**Prerequisit:** Modul 3–5 (ideal **M5 Mecanici de joc** — grilă / liste / clone).

---

## Ce acoperă Modulul 6 (harta)

| Idee | Unde |
|------|------|
| Recap M5 + pași pe grilă (ex. 32 px) | L1 |
| Sparge + rază de minat + resursă | L2 |
| Pune pe grilă (snap) + consum resursă | L3 |
| Inventar vizibil (2–3 tipuri) | L4 |
| 2 zone / biomi, resurse diferite | L5 |
| Creatură / spawn + HP erou | L6 |
| Crafting 2→1 | L7 |
| Condiție clară de victorie | L8 |
| Meniu Start + ghid controale | L9 |
| Polish A–F + prezentare + **Cube Crafter** | L10 |

### 3 reguli tehnice (pe tot modulul)

1. **Snap la grilă (32):**  
   `x_grilă = rotunjește(poziție_mouse_x / 32) × 32` (la fel pe y) — blocurile se așază drept.  
2. **Rază de minat:** minezi / construiești doar dacă `distanța până la Erou < 100` (sau similar).  
3. **Controale separate:** **clic stânga** = sparge · **tasta E** (sau `C`) = pune. *(Clic dreapta = Complet/Bonus — nestabil pe unele PC-uri.)*

**Nu facem:** 3D, multiplayer online, lume infinită, craft cu 10 rețete.

### Minim pe blocuri (ștachetă)

| Bloc | Minim |
|------|--------|
| L1–L3 | Grilă + sparge + pune **rulează** (cu rază) |
| L4–L6 | Inventar UI + 2 zone + creatură/HP pe **același** joc |
| L7–L9 | Craft + misiune + meniu; coleg joacă fără ajutor |
| L10 | Polish + prezentare 1–2 min + insignă |

Module: `../modul1/` · `../modul2/` · `../modul3/` · `../modul4/` · `../modul5/` (Mecanici de joc)
