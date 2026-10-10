# Lecția 2 — Client vs Server
**Modulul 2 · Script Starter**  
**Code Maker Club · Roblox Studio**

> Azi înțelegi **cea mai importantă idee** din Roblox: jocul rulează în **două locuri** deodată — **serverul** și **calculatorul jucătorului** (clientul).  
> Place: `Prenume_Nume_M2` (ex. `Ana_Pop_M2`)  
> *Facem un experiment cu două panouri colorate: unul schimbat de server, unul schimbat de client. Vezi pe viu cine „vede” ce.*

---

## Obiectiv
La finalul orei poți **explica în două propoziții** diferența dintre Script și LocalScript și ai demonstrat-o într-un experiment.  
**Minimum:** `Srv_Panou` colorează `Panou_Server` albastru · `Cli_Panou` colorează `Panou_Client` roșu · ambele scripturi rulează fără eroare în Output.  
**Ținta orei (Complet):** Minim + treci în Play pe vederea **Server** și vezi că panoul „roșu” e **gri/original** acolo + descoperi că un LocalScript pus în Workspace **nu rulează**.

## De ce contează
Când joci un joc online, nu toți jucătorii văd „același calculator”. Roblox ține **o lume adevărată** pe **server**, iar fiecare jucător are pe ecran **o copie** a ei.

- Ce schimbă **serverul** → **toți** văd schimbarea.  
- Ce schimbă **un client** → vede **doar** acel jucător (serverul nu știe).

Dacă nu înțelegi asta, vei scrie coduri care „merg la mine, dar nu și la colegi”. Aproape toate bug-urile de începător în Roblox vin de aici.

**Azi fără concepte noi de cod:** doar `print` și o linie care colorează un Part. Accentul e pe **unde** rulează codul.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–15 | Ideea: server vs client (analogie + tabel) |
| 15–45 | Pas cu pas: experimentul (**Încearcă tu**) |
| 45–100 | Proiectul „Două panouri” (vezi **Minim vs Complet**) |
| 100–120 | Recap, bonus, salvare |

**Azi folosim:** Script · LocalScript · Output · Test (vederea Server/Client).  
*(Variabilele vin la L3. Azi scriem cod scurt, aproape „rețetă”; îl înțelegem pe bucăți în lecțiile următoare.)*

---

## Pas cu pas

### 1) Analogia: jocul de masă
Imaginează-ți un joc de masă online:

- **Serverul** = **arbitrul**. Ține **tabla adevărată** și decide ce e valid.  
- **Clientul** = **tableta ta**. Îți arată tabla, trimite mutarea ta, poate adăuga efecte doar pentru tine (o animație, un sunet).

| | **Server** (Script) | **Client** (LocalScript) |
|--|---------------------|---------------------------|
| **Rulează pe** | serverul Roblox | calculatorul jucătorului |
| **Cine vede schimbarea** | **toți** jucătorii | **doar** jucătorul respectiv |
| **Bun pentru** | reguli, scor, monede, uși, salvare | cameră, efecte, butoane de ecran, ce vede doar el |
| **Prefix la noi** | `Srv_` | `Cli_` |
| **Unde stă** | ServerScriptService / Workspace | StarterPlayerScripts, StarterGui etc. |

**Regula de mână:** dacă schimbarea trebuie să conteze pentru **joc** (o monedă dispare pentru toți), o face **serverul**.

**Încearcă tu — cu vocea (2–3 min)**  
- [ ] Spui în cuvintele tale: „Serverul e …, clientul e …”  
- [ ] Dai un exemplu: ce ar trebui să facă serverul într-un Obby? (monedă, ușă, scor)  

### 2) Pregătim două panouri
În Obby-ul tău (`Prenume_Nume_M2`):

1. Home → **Part** → un cub mic lângă Spawn  
2. Nume: **`Panou_Server`** · **Anchor** activ · culoare gri  
3. Încă un Part, lângă primul: **`Panou_Client`** · **Anchor** · tot **gri**  
4. Le pui ca să le vezi imediat când porniți Play (nu în spatele unui zid)

**Încearcă tu — panourile (3–4 min)**  
- [ ] Două Parts: `Panou_Server` și `Panou_Client`  
- [ ] Amândouă **ancorate**, **gri**, lângă Spawn  
- [ ] Numele exact (literele mari/mici contează)

### 3) `Srv_Panou` — Script (server)
1. **ServerScriptService** → **+** → **Script** → redenumește `Srv_Panou`  
2. Șterge ce e în el și scrie:

```lua
-- Serverul colorează panoul lui în albastru
workspace.Panou_Server.Color = Color3.fromRGB(0, 120, 255)
print("Srv_Panou: am colorat Panou_Server")
```

Cum se citește prima linie utilă:  
- `workspace` = lumea ta (Workspace din Explorer)  
- `.Panou_Server` = obiectul cu numele ăsta din lume  
- `.Color` = proprietatea culoare (o vezi și în Properties)  
- `= Color3.fromRGB(0, 120, 255)` = îi dăm o culoare nouă, din trei numere: roșu, verde, albastru (0–255)

*De ce `Color3.fromRGB`? E felul Roblox de a „amesteca” culoarea din trei numere. Pentru azi o copiezi; la L3 o punem într-o variabilă.*

**Încearcă tu — Script server (3–4 min)**  
- [ ] `Srv_Panou` creat · codul scris fără roșu în editor  
- [ ] Play → `Panou_Server` devine **albastru**  
- [ ] În Output apare mesajul scriptului  

### 4) `Cli_Panou` — LocalScript (client)
1. **StarterPlayer → StarterPlayerScripts** → **+** → **LocalScript** → redenumește `Cli_Panou`  
2. Scrie:

```lua
-- Clientul colorează panoul lui în roșu (doar pentru mine)
local panou = workspace:WaitForChild("Panou_Client")
panou.Color = Color3.fromRGB(255, 0, 0)
print("Cli_Panou: am colorat Panou_Client (doar pe ecranul meu)")
```

*Nou:* `WaitForChild("…")` = „așteaptă până apare obiectul cu numele ăsta în lume”. În LocalScript e mai sigur, pentru că lumea încă se încarcă pe calculatorul tău când pornește scriptul.  
`local panou = …` = pui panoul într-o „cutie” numită `panou`, ca să nu repeți lungul `workspace:WaitForChild(…)`. (Cutiile se numesc **variabile**; le facem pe larg la **L3**.)

**Încearcă tu — LocalScript client (3–4 min)**  
- [ ] `Cli_Panou` în **StarterPlayerScripts**  
- [ ] Play → `Panou_Client` devine **roșu**, `Panou_Server` e **albastru**  
- [ ] Output: ai ambele mesaje (`Srv_Panou` și `Cli_Panou`)  

### 5) Ce vede serverul, de fapt? *(Complet)*
Cât timp rulează Play:

1. Tab **Test** → butonul **Current: Client** (arată de unde „privești” lumea)  
2. Click → treci pe **Server**  
3. Uită-te la cele două panouri:  
   - `Panou_Server` — **albastru** (serverul l-a schimbat; „adevărat” pentru toți)  
   - `Panou_Client` — **gri** (serverul **nu știe** că tu l-ai făcut roșu)  
4. Revii pe **Client**: `Panou_Client` e iar roșu

> **Concluzie:** ce face clientul **rămâne la client**. De aceea monedele, ușile, scorul le facem pe **server**.

*(Dacă butonul „Current” nu apare în versiunea ta de Studio, profesorul arată experimentul cu **Test → Clients and Servers** — cu **2 jucători**, în care al doilea **nu** vede panoul roșu al primului.)*

**Încearcă tu — vederea Server (3–4 min)**  
- [ ] Ai văzut `Panou_Client` **gri** pe vederea Server  
- [ ] Poți explica în **2 propoziții** de ce  

### 6) LocalScript în locul greșit *(Complet)*
LocalScript are o listă scurtă de locuri unde **rulează** (printre ele: **StarterPlayerScripts**, **StarterGui**, **StarterCharacterScripts**). Într-un Part din Workspace **nu** rulează.

1. Inserezi un LocalScript **în** `Panou_Client` (în Explorer: **+** lângă Part → **LocalScript**)  
2. Scrie: `print("Mă auzi?")`  
3. Play → mesajul **nu apare** în Output  
4. **Mută** scriptul în **StarterPlayerScripts** → mesajul apare  
5. Pune-l la loc / șterge-l (nu rămâne script duplicat)

**Încearcă tu — loc greșit (3 min)**  
- [ ] Ai văzut că „Mă auzi?” **nu** apare când LocalScript e într-un Part  
- [ ] Ai curățat: un singur loc corect, fără scripturi în plus  

---

## Greșeli frecvente
1. **Numele panoului diferă** (`panou_server`, `Panou server`) — Luau caută **exact** numele; eroare în Output cu *„… is not a valid member of Workspace”*. Verifică în Explorer.  
2. **LocalScript în ServerScriptService** — nu rulează acolo.  
3. **Script (server) în StarterPlayerScripts** — nu e locul lui; mută-l în ServerScriptService.  
4. **Două scripturi care schimbă același Part** — al doilea „bate” primul; azi fiecare panou are un singur script.  
5. **„Merge la mine, nu la coleg”** — verifică: schimbarea e făcută de **Script** (server) sau de **LocalScript** (client)?  
6. **Panourile de test stau în mijlocul traseului** — pune-le lângă Spawn, nu pe drumul spre Finish; le mutăm sau le ștergem când spune profesorul.

---

## De făcut azi — „Două panouri”
Salvat: `Prenume_Nume_M2`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit”)** | `Panou_Server` albastru (din `Srv_Panou`) + `Panou_Client` roșu (din `Cli_Panou`) + **0 erori** în Output |
| **Complet (ținta orei)** | Minim + vederea **Server** (panoul roșu e gri acolo) + LocalScript-ul din Part **nu rulează** + explici în 2 propoziții |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Panourile
- [ ] `Panou_Server` + `Panou_Client` · ancorate · gri  

### Pasul 2 — Cele două scripturi *(Minim)*
- [ ] `Srv_Panou` (Script) în ServerScriptService  
- [ ] `Cli_Panou` (LocalScript) în StarterPlayerScripts  
- [ ] Play → albastru + roșu · Output fără roșu · Stop · salvat  

**→ Minim când:** vezi cele două culori și Output-ul e curat.

### Pasul 3 — Dovada *(Complet)*
- [ ] Test → **Current: Server** → `Panou_Client` e gri  
- [ ] LocalScript în Part: nu rulează · l-ai mutat / șters  
- [ ] Explici colegului: „Clientul schimbă doar la el; serverul schimbă pentru toți”  

**Gata Complet când:** un coleg te întreabă „de ce n-o vede și celălalt jucător?” și îi răspunzi corect.

---

## Bonus (dacă ai terminat Complet)
- [ ] Al treilea panou, `Panou_Test`, colorat **verde** de `Srv_Panou` — verifici că și în vederea Server e verde  
- [ ] În `Cli_Panou`, adaugi `print("Salut, ", game.Players.LocalPlayer.Name)` — apare **numele tău**. `LocalPlayer` există doar la client, fiindcă fiecare client e **un** jucător  
- [ ] Notezi pe o foaie 3 lucruri dintr-un joc Roblox care ar trebui să fie pe **server** (ex. scorul, monedele)  

## Recapitulare rapidă
1. **Server** = arbitrul · schimbările lui le văd **toți**  
2. **Client** = calculatorul tău · schimbările lui le vezi **doar tu**  
3. Reguli de joc (monede, uși, scor) → **Script (server)**  
4. Efecte pentru un singur jucător → **LocalScript (client)**  
5. LocalScript merge doar în locuri speciale (ex. **StarterPlayerScripts**), nu în orice Part  

**Quiz scurt (cu profesorul):**  
- Cine „vede” schimbarea făcută de un Script?  
- De ce apare `Panou_Client` gri pe vederea Server?  
- Un LocalScript pus într-un Part din Workspace rulează?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector cele două scripturi și vederea Current: Server.)*

## Temă
Opțional: gândește-te la jocul tău preferat din Roblox și scrie pe o foaie **2 lucruri** pe care le face serverul și **2** pe care le face clientul.  
La **L3** învățăm **variabile** — cutiile în care păstrăm numere și texte.
