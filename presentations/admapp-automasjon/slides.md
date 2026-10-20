---
theme: default
title: AdmApp Automasjon – hvem, hva og hvorfor
info: |
  ## AdmApp Automasjon
  Hvem er vi, hva er automasjon slik vi jobber med det i AdmApp, og hvorfor vi
  satser på det.

  Laget med Slidev. Fargepalett og stil er hentet fra Sykehuspartners
  Marp-tema (`.vscode/sykehuspartner-marp-theme.css`).
  Kildebildene var ikke tilgjengelige, så illustrasjonene bruker Carbon-ikoner
  og en innebygd pipeline.
colorSchema: dark
transition: slide-left
fonts:
  sans: 'Segoe UI'
  mono: 'Fira Code'
  local: 'Segoe UI'
---

---
layout: cover
class: text-center
---

# AdmApp Automasjon

## Hvem – hva – hvorfor automasjon?

<div class="absolute right-16 bottom-16 opacity-80 flex items-center gap-3">
  <carbon-automatic class="text-5xl sp-icon" />
  <span class="text-lg">Ansible</span>
</div>

<div class="pt-10 text-sm opacity-60">
Automasjonsforum · Sykehuspartner
</div>

<!--
Velkommen! Denne presentasjonen svarer på tre spørsmål: hvem er AdmApp
Automasjon, hva mener vi faktisk med "automasjon" i vår hverdag, og hvorfor vi
bruker så mye tid og energi på det.
-->

---

# Agenda

<div class="grid grid-cols-3 gap-6 mt-12">

<div v-click class="sp-card">
<carbon-group class="sp-icon text-3xl mb-3" />

### Hvem?

AdmApp Automasjon som team og fagmiljø

</div>

<div v-click class="sp-card">
<carbon-workflow-automation class="sp-icon text-3xl mb-3" />

### Hva?

Automasjon slik vi faktisk jobber med det

</div>

<div v-click class="sp-card">
<carbon-target class="sp-icon text-3xl mb-3" />

### Hvorfor?

Gevinstene som gjør innsatsen verdt det

</div>

</div>

<!--
Tre enkle spørsmål holder resten av praten sammen. Vi starter med hvem vi er.
-->

---
layout: section
---

# Hvem er AdmApp Automasjon?

---
layout: two-cols-header
---

# Hvem er vi?

::left::

<v-clicks>

- **Team** dedikert til automatisering av drift
- **Fokus** på effektivisering og standardisering
- **Samarbeidspartner** for driftsteam og utvikling

</v-clicks>

::right::

<div class="flex flex-col gap-4">
<v-clicks>

<div class="sp-card">
<carbon-collaborate class="sp-icon text-2xl" /> <strong>Automasjonsforum</strong>
<p class="text-sm opacity-80 mt-2">
Ukentlige møter der vi deler erfaringer og bygger kompetanse på tvers av
fagmiljøer
</p>
</div>

<div class="sp-card">
<carbon-partnership class="sp-icon text-2xl" /> <strong>Enablement, ikke utførelse</strong>
<p class="text-sm opacity-80 mt-2">
Vi anbefaler metodikk og verktøy – fagområdene eier sin egen automasjon
</p>
</div>

</v-clicks>
</div>

---
layout: two-cols-header
---

# Det vi har bygget

::left::

### Standarder og dokumentasjon

<v-clicks>

- Retningslinjer for versjonskontroll og Git-arbeid
- Malverk for dokumentasjon og Merge Requests
- Kodestandarder og beste praksis

</v-clicks>

::right::

### Samarbeid på tvers

<v-clicks>

- Partnerskap med Basistjenester / Privat Sky
- Felles standarder for kode og dokumentasjon
- Kursmiljø med isolerte sandkasser for trygg læring

</v-clicks>

---
layout: section
---

# Hva er automasjon?

<p class="mt-4 text-lg opacity-70">– slik vi jobber med det i AdmApp</p>

---

# Hva er automasjon – kort fortalt

<div class="grid grid-cols-2 gap-10 mt-8">

<div v-click class="sp-card">
<carbon-devices class="sp-icon text-3xl mb-3" />

### ClickOps

Manuelle, individuelle handlinger i et grensesnitt. Gjøres likt (eller
ulikt) hver gang, av den som er på vakt.

</div>

<div v-click class="sp-card">
<carbon-workflow-automation class="sp-icon text-3xl mb-3" />

### Automasjon

Kodifiserte, gjentakbare prosesser – infrastruktur og konfigurasjon beskrevet
som kode (IaC/CaC), kjørt av systemet, ikke av hukommelsen

</div>

</div>

<div v-click class="mt-8 text-center opacity-80">
<carbon-arrow-right class="sp-icon inline-block mr-2" />
Samme resultat, hver gang – uavhengig av hvem som trykker på knappen
</div>

---
layout: two-cols-header
layoutClass: sp-tools
---

# Automasjon hos oss i praksis

::left::

<div class="sp-card-stack">

<div v-click class="sp-card">
<carbon-automatic class="sp-icon text-2xl mr-2" /> <strong>Ansible + AWX</strong>
<p class="text-sm opacity-80 mt-1">Automatisering av konfigurasjon, patching og orkestrering</p>
</div>

<div v-click class="sp-card">
<carbon-code class="sp-icon text-2xl mr-2" /> <strong>GitLab CI/CD</strong>
<p class="text-sm opacity-80 mt-1">Versjonskontroll, Merge Requests og automatisert bygg/test/utrulling</p>
</div>

</div>

::right::

<div class="sp-card-stack">

<div v-click class="sp-card">
<carbon-software-resource-cluster class="sp-icon text-2xl mr-2" /> <strong>ProGet</strong>
<p class="text-sm opacity-80 mt-1">Pakkehåndtering og sikker distribusjon</p>
</div>

<div v-click class="sp-card">
<carbon-code class="sp-icon text-2xl mr-2" /> <strong>Visual Studio Code</strong>
<p class="text-sm opacity-80 mt-1">Felles editor med omfattende extension-økosystem</p>
</div>

</div>

---

# Fra push til produksjon

<div class="pipeline-flow mt-12">
  <div class="sp-card pipeline-step">
    <carbon-code class="sp-icon text-3xl mb-2" />
    <strong>Git push</strong>
    <span>Endring sendt inn</span>
  </div>
  <carbon-arrow-right class="sp-icon pipeline-arrow" />
  <div class="sp-card pipeline-step">
    <carbon-workflow-automation class="sp-icon text-3xl mb-2" />
    <strong>GitLab CI/CD</strong>
    <span>Bygg og test</span>
  </div>
  <carbon-arrow-right class="sp-icon pipeline-arrow" />
  <div class="sp-card pipeline-step">
    <carbon-automatic class="sp-icon text-3xl mb-2" />
    <strong>AWX</strong>
    <span>Automatisert utrulling</span>
  </div>
  <carbon-arrow-right class="sp-icon pipeline-arrow" />
  <div class="sp-card pipeline-step">
    <carbon-cloud class="sp-icon text-3xl mb-2" />
    <strong>Produksjon</strong>
    <span>Lik prosess hver gang</span>
  </div>
</div>

<p v-click class="text-center mt-10 opacity-80">
Feiler pipelinen, leser du loggen, fikser og pusher på nytt – automasjonen
sikrer at prosessen er lik hver gang
</p>

---
layout: two-cols-header
---

# Automasjonsnivå i dag

::left::

### Noen av tjenestene

<v-clicks>

- Public 360
- NHAREG
- TDoc
- PocG
- EK, m.fl.

</v-clicks>

::right::

### Hva automatiseres

<v-clicks>

- <carbon-renew class="sp-icon" /> Patching og rutinevedlikehold
- <carbon-settings class="sp-icon" /> Standardisert konfigurasjon
- <carbon-certificate class="sp-icon" /> Automatisk fornyelse av
  serversertifikater via AWX

</v-clicks>

---
layout: section
---

# Hvorfor automasjon?

---
layout: quote
---

> Fra ClickOps til DevSecOps – gjennom standardisert automasjon som gir
> forutsigbar kvalitet, lavere risiko og felles kompetanse.

<p class="mt-6 text-sm opacity-70">— Formålet med satsingen på automasjon</p>

---
layout: two-cols-header
---

# Gevinster

::left::

### Operasjonelt

<v-clicks>

- <carbon-checkmark-filled class="sp-icon" /> Hands-off patching – mindre rom
  for menneskelige feil
- <carbon-time class="sp-icon" /> Tidsbesparelse på repetitive oppgaver
- <carbon-growth class="sp-icon" /> Mer tid til proaktiv drift

</v-clicks>

::right::

### Kvalitet og kompetanse

<v-clicks>

- <carbon-settings class="sp-icon" /> Konsistent konfigurasjon på tvers av
  miljøer
- <carbon-document-security class="sp-icon" /> Sporbarhet – alle endringer er
  versjonskontrollert
- <carbon-idea class="sp-icon" /> Kunnskapsdeling gjennom kode

</v-clicks>

---
layout: fact
---

# 50 %

tidsbesparelse på vedlikehold (brownfield)

---
layout: center
class: text-center
---

# Til diskusjon

<div class="text-left inline-block mt-10">
<v-clicks>

- Hvilke oppgaver bruker du mest tid på i dag?
- Hva hindrer deg i å starte med automatisering?
- Hva trenger du for å komme i gang?

</v-clicks>
</div>

---
layout: cover
class: text-center
---

# Takk for oppmerksomheten

## Spørsmål?

<div class="absolute right-16 bottom-16 opacity-80 flex items-center gap-3">
  <carbon-automatic class="text-5xl sp-icon" />
  <span class="text-lg">Ansible</span>
</div>

<div class="pt-10 text-sm opacity-70">

[admapp-documentation](https://gitlab.sikt.sykehuspartner.no/admapp-automasjon/admapp-documentation)
·
[admapp-templates](https://gitlab.sikt.sykehuspartner.no/admapp-automasjon/admapp-templates)

</div>
