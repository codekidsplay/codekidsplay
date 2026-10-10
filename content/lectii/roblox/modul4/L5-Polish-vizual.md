# Lecția 5 — Polish: lumini, sunete și interfață
**Modulul 4 · Game Creator**  
**Code Maker Club · Roblox Studio**

> Un joc care **merge** e bun. Un joc care **merge și arată bine** e memorabil. Azi îți dai Obby-ului **atmosferă**: lumină, sunet și o interfață îngrijită — fără să strici ce merge.  
> Place: `Prenume_Nume_M4` (ex. `Ana_Pop_M4`)

---

## Obiectiv
La finalul orei Obby-ul tău are o **temă** clară, o **atmosferă** (lumină + efecte), **cel puțin un sunet** și o **interfață** care arată coerent.  
**Minimum:** **atmosferă** (Lighting: `ClockTime` + cel puțin **un efect**) + **un sunet** (muzică de fundal sau sunet la monedă) + **un element de interfață** îngrijit (culori, colțuri rotunjite) · Obby-ul merge ca înainte · **0 erori**.  
**Ținta orei (Complet):** Minim + **lumini** pe checkpoint-uri + sunet de monedă **pornit din script** + mesaje cu **apariție lină** (Tween) + un **control de confort** (volum rezonabil, fără lumini care clipesc rapid).

## De ce contează
Aspectul face jucătorul să **înțeleagă** jocul fără cuvinte: lumina arată unde e drumul, sunetul confirmă o monedă, o interfață clară îl ajută să nu se piardă.

**Regula de aur: „mai puțin e mai mult".** Un Obby cu 3–4 alegeri bune arată mai bine decât unul cu 30 de efecte.

---

## Planul orei (120 minute)

| Minute | Ce facem |
|--------|----------|
| 0–10 | Obiectiv + tema și paleta de culori |
| 10–50 | Pas cu pas: lumină + sunet (**Încearcă tu**) |
| 50–105 | Interfață + proiectul „Obby cu atmosferă" (vezi **Minim vs Complet**) |
| 105–120 | Recap, bonus, salvare |

**Azi folosim:** `Lighting` · `Atmosphere` · `BloomEffect` · `ColorCorrectionEffect` · `PointLight` · `Sound` · `UICorner` / `UIStroke` · `TweenService`.

---

## Pas cu pas

### 1) Tema și paleta
Alege **o temă** pentru Obby (ex. pădure, spațiu, gheață, lavă, oraș de noapte) și **3 culori** principale (plus alb/negru). Notează-le pe foaie:

| Rol | Exemplu (spațiu) |
|-----|------------------|
| Culoare 1 (platforme) | albastru închis |
| Culoare 2 (accent: checkpoint, monede) | portocaliu / galben |
| Culoare 3 (pericol: lavă, inamici) | magenta |

Aceleași culori le folosești și la **interfață**: panourile și butoanele ar trebui să „vorbească aceeași limbă" cu lumea.

**Încearcă tu — tema (3 min)**  
- [ ] Ai tema și cele 3 culori pe foaie  
- [ ] Un coleg ghicește tema din culori

### 2) Lumina: serviciul `Lighting`
În **Explorer**, deschide **Lighting**. În **Properties** găsești:

| Proprietate | Ce face | Încearcă |
|-------------|---------|----------|
| `ClockTime` | ora din zi (0–24) | `18` = seară, `0` = noapte, `14` = zi |
| `Brightness` | cât de puternică e lumina | 1–3 |
| `Ambient` / `OutdoorAmbient` | culoarea „umbrelor" | o culoare închisă, spre tema ta |

Apoi **efecte**: mouse peste **Lighting** → **+** și alegi:

| Efect | Ce face | Pe scurt |
|-------|---------|----------|
| `Atmosphere` | ceață / aer colorat | `Density` ~0.3, `Color` spre tema ta |
| `BloomEffect` | strălucire în jurul luminilor și Neon | `Intensity` ~0.5 |
| `ColorCorrectionEffect` | „filtru foto" | `Saturation`, `TintColor` |
| `Sky` | cerul (imagini) | alegi un cer din Studio |

*Reguli:* efect **moderat** (nu 100%), și mereu **testezi în Play** — în editare arată altfel.

**Încearcă tu — atmosfera (8–10 min)**  
- [ ] `ClockTime` schimbat spre tema ta  
- [ ] **Cel puțin un efect** adăugat (Atmosphere sau Bloom)  
- [ ] Play: se vede drumul? Poți citi platformele?

### 3) Lumini punctuale
O **`PointLight`** pune o lumină care iradiază dintr-un Part.

1. Mouse peste `Checkpoint1` → **+** → **PointLight**  
2. Properties: `Brightness` = 2 · `Range` = 14 · `Color` = culoarea de accent  
3. Un Part cu Material `Neon` + `PointLight` = „lampă"

*Câteva lumini bine plasate sunt suficiente. Zeci de lumini încetinesc jocul pe telefoane.*

**Încearcă tu — o lampă (4–5 min)**  
- [ ] Un `PointLight` pe un checkpoint  
- [ ] Se vede în Play, nu e orbitor

### 4) Sunetul
Un obiect **`Sound`** redă audio. Are:
- `SoundId` — adresa sunetului (un număr de la Roblox)  
- `Volume` — cât de tare (0–10; folosim **0.3–0.6**)  
- `Looped` — se repetă  
- `Playing` — pornit

**De unde luăm sunete?** Din **Toolbox / Creator Store**, tabul **Audio** — doar sunete **gratuite și publice**, alese **din lista pregătită de profesor** (sau verificate împreună).

**Atenție:** **nu** inserăm **Models** din Toolbox! Un Model poate avea **scripturi ascunse** făcute de altcineva. Pentru joc folosim doar **audio** (și imagini) alese cu profesorul.

**a) Muzică de fundal:**
1. **+** pe **Workspace** (sau **SoundService**) → **Sound** → `Muzica`  
2. `SoundId` = sunetul ales · `Volume` = `0.3` · `Looped` = bifat · `Playing` = bifat  

**b) Sunet la monedă:** îl facem la nivelul **Complet** (pasul 6), pornit din script. Pentru **Minim** îți ajunge muzica de fundal.

**Încearcă tu — muzică (5–6 min)**  
- [ ] Muzică de fundal pornește la Play  
- [ ] Volumul e **confortabil** (nu acoperă vocea colegilor din clasă)  
- [ ] Dacă lipsește sunetul: întrebi profesorul (unele sunete sunt blocate)

### 5) Interfața îngrijită
Panourile din `GUI_Joc` ar trebui să se potrivească:

| Pas | Cum |
|-----|-----|
| **Aceleași culori** | culorile de fundal și text din paleta ta |
| **Colțuri rotunjite** | **+** pe panou → **UICorner** |
| **Contur** | **+** → **UIStroke** (`Thickness` 2, culoare de accent) |
| **Spații** | **+** → **UIPadding** (`PaddingLeft`, `PaddingTop`…) |
| **Citibilitate** | text **mare**, **contrast** puternic (text deschis pe fundal închis) |
| **Aliniere** | panourile pe margini, nu în mijlocul ecranului |

*Un test simplu: privește ecranul 2 secunde. Cele mai importante lucruri (scor, viață, timp) trebuie să fie vizibile instant.*

**Încearcă tu — interfața (8–10 min)**  
- [ ] Cel puțin **un panou** îngrijit (culori din paletă + UICorner)  
- [ ] Textul se citește ușor (contrast)

### 6) Sunet la monedă, din script *(Complet)*
1. Pune un `Sound` (sunet scurt) **în fiecare monedă** (sau în prima, pe care o copiezi): `Volume` = 0.5, `Looped` **debifat**, `Playing` **debifat**  
2. În `Srv_Monede`, după `Statistici.adauga(…)`:

```lua
        local sunet = moneda:FindFirstChildOfClass("Sound")
        if sunet then
            sunet:Play()
        end
```

- `FindFirstChildOfClass("Sound")` = „caută în monedă orice obiect de tip `Sound`"  
- `if sunet then` = dacă există (monedele fără sunet nu dau eroare)

**Încearcă tu — sunet la monedă (5–6 min)**  
- [ ] Iei o monedă → se aude  
- [ ] Monedele fără sunet **nu** produc erori

### 7) Mesaje cu apariție lină *(Complet)*
Înlocuiește funcția `arataMesaj` din `Cli_Mesaj` (în `Txt_Mesaj`) cu varianta de mai jos. Restul scriptului (`eticheta`, `Ev_Mesaj`, `OnClientEvent:Connect(arataMesaj)`) rămâne la fel; adaugi sus `TweenService` și `versiune`:

```lua
local TweenService = game:GetService("TweenService")

local versiune = 0

local function arataMesaj(text)
    versiune += 1
    local mea = versiune

    eticheta.Text = text
    eticheta.TextTransparency = 1
    eticheta.Visible = true
    TweenService:Create(eticheta, TweenInfo.new(0.3), {TextTransparency = 0}):Play()

    task.wait(2.5)

    if versiune == mea then                -- nu a venit între timp alt mesaj
        local iesire = TweenService:Create(eticheta, TweenInfo.new(0.5), {TextTransparency = 1})
        iesire:Play()
        iesire.Completed:Wait()
        if versiune == mea then
            eticheta.Visible = false
        end
    end
end
```

Cum merge:  
- `TextTransparency` de la 1 (invizibil) la 0 (vizibil) = **apariție lină**  
- **`versiune`** = un contor: dacă vine un mesaj nou cât timp aștepți, mesajul vechi **nu** îl mai ascunde pe cel nou  
- `iesire.Completed:Wait()` = așteaptă până se termină animația

**Încearcă tu — mesaj lin (6–8 min)**  
- [ ] Mesajul apare și dispare lin  
- [ ] Două mesaje rapide la rând nu se „încurcă"

### 8) Controlul de confort *(Complet)*
Un joc bun e **plăcut**, nu obositor. Verifică:

| Verificare | Regulă |
|------------|--------|
| **Volum** | muzica `≤ 0.5`, sunetele scurte `≤ 0.7` |
| **Lumini care clipesc** | **nu** mai repede de **de 3 ori pe secundă**, pe suprafețe mari (unii oameni se simt rău de la lumini care clipesc rapid) |
| **Culori** | textul se citește și dacă unele culori sunt greu de deosebit (ex. verde/roșu) |
| **Lizibilitate** | traseul se vede și pe un ecran mic |

**Încearcă tu — confortul (3–4 min)**  
- [ ] Un coleg ascultă și spune dacă volumul e ok  
- [ ] Nicio lumină nu clipește rapid

---

## Greșeli frecvente
1. **Prea multe efecte** — Bloom, ceață și culori puternice **toate** deodată; reduci.  
2. **Prea întuneric** — nu se mai vede traseul; crește `Brightness` sau pune lămpi.  
3. **Sunet prea tare** — `Volume` ≤ 0.5.  
4. **Models din Toolbox** — pot avea **scripturi ascunse**; folosim doar audio/imagini alese cu profesorul.  
5. **Sunet care nu pornește** — `SoundId` blocat sau greșit; încearcă alt sunet.  
6. **Sunet în monedă cu `Playing` bifat** — se aude la start; trebuie **debifat** și pornit din script.  
7. **Zeci de `PointLight`** — încetinesc jocul; câteva sunt de ajuns.  
8. **Panouri care nu se potrivesc** — fiecare altă culoare, alt font; folosește paleta.  
9. **Strici ceva din cod în timp ce „înfrumusețezi"** — după fiecare schimbare: **Play, Output curat**.  
10. **Efecte care fac jocul greu pe telefon** — dacă ai colegi cu telefon, testează.

---

## De făcut azi — „Obby cu atmosferă"
Salvat: `Prenume_Nume_M4`

### Minim vs Complet

| | Ce trebuie |
|--|------------|
| **Minim („am reușit")** | Atmosferă (`ClockTime` + ≥1 efect) + **un sunet** + **un panou** îngrijit · Obby-ul merge · **0 erori** |
| **Complet (ținta orei)** | Minim + lumini pe checkpoint-uri + sunet la monedă din script + mesaje line + verificarea de confort |

Dacă rămâi în urmă: salvează la **Minim**.  
Cei rapizi: Complet, apoi Bonus.

### Pasul 1 — Temă
- [ ] Tema + 3 culori  

### Pasul 2 — Atmosferă + sunet + interfață *(Minim)*
- [ ] `Lighting` + efect  
- [ ] Muzică sau sunet  
- [ ] Un panou îngrijit  
- [ ] Play: se vede traseul · salvat  

**→ Minim când:** un coleg spune corect tema Obby-ului tău din ce **vede și aude**.

### Pasul 3 — Complet
- [ ] `PointLight` pe checkpoint-uri  
- [ ] Sunet la monedă (script)  
- [ ] Mesaje cu `Tween`  
- [ ] Test de confort · salvat  

**Gata Complet când:** Obby-ul arată și sună **coerent** și rămâne plăcut de jucat 5 minute.

---

## Bonus (dacă ai terminat Complet)
- [ ] **Cicluri de zi**: `ClockTime` crește încet în timpul jocului (un script pe server cu `while true do Lighting.ClockTime += 0.05 task.wait(0.2) end`) — cu grijă la viteză  
- [ ] **Particule**: un `ParticleEmitter` la `Finish` (confetti) — cu `Rate` mic  
- [ ] **Sunet diferit** la checkpoint și la Finish  
- [ ] **Buton de mute** pentru muzică, în interfață (`Muzica.Volume = 0` din LocalScript — doar pentru tine)  
- [ ] Un **ecran de titlu** cu numele jocului și tema

## Recapitulare rapidă
1. **Temă + paletă** = baza unui joc care arată bine  
2. **Lighting**: `ClockTime`, efecte (`Atmosphere`, `Bloom`, `ColorCorrection`)  
3. **PointLight** pentru lămpi; **puține**, bine plasate  
4. **Sound**: `SoundId`, `Volume` mic, `Looped`; **nu** inserăm Models din Toolbox  
5. Interfață: culori coerente, `UICorner`, contrast, `Tween` pentru apariție lină  

**Quiz scurt (cu profesorul):**  
- De ce nu inserăm „Models" din Toolbox?  
- Ce face `versiune` în scriptul cu mesaje line?  
- De ce lumina care clipește rapid nu e o idee bună?

## Exemplu / referință (opțional, la final)
*(Parcurge **întâi** lecția. Dacă ai nevoie de un model, profesorul arată pe proiector același Obby „înainte" și „după" polish.)*

## Temă
Opțional: privește **trei jocuri Roblox** și notează, pentru fiecare, **un lucru de aspect** care ți-a plăcut (lumină, sunet, interfață).  
La **L6** facem un **playtest cu colegii**: vedem cum se joacă Obby-ul tău fără tine lângă ei.
