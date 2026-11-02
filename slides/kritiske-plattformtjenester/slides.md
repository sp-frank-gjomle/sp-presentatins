---
# Slide nr: 1
theme: "@sp-days-framework/slidev-theme-sykehuspartner"
title: Når grunnmuren svikter
info: |
  Hva skjer når Git eller pakkebrønnen går ned i et air-gapped miljø?
  En presentasjon for ledere om to tjenester alt annet står på.
colorSchema: dark
transition: fade
drawings:
  persist: false
layout: cover
---

# Når grunnmuren svikter
## Hva skjer når Git eller pakkebrønnen går ned?

<!--
Velkommen. De neste minuttene handler om to tjenester de fleste her aldri har sett, men som hele driften vår står på.

Målet er ikke å skremme, men å vise hvor sårbare vi er i dag, og hva som skal til for å gjøre oss robuste.
-->

---
# Slide nr: 2
layout: center
transition: fade-out
---

# Kl. 20:57

<div v-click class="text-2xl mt-8 opacity-80">Ingen alarm. Ingen røyk. Ingen brann.</div>

<div v-click class="text-3xl mt-6 font-bold" style="color: var(--sp-danger)">
  Bare to tjenester som ikke svarer.
</div>

<!--
Ta en pause etter tittelen. Et helt vanlig kveldsskift.

[click] Det er ingen dramatikk. Ingen ser noe brenne.

[click] Bare to interne tjenester som slutter å svare. La oss se hva som skjer.
-->

---
# Slide nr: 3
layout: default
clicks: 2
---

# Hva skjer når grunnmuren faller?

<StatusBoard :step="$clicks" />

<!--
Dette er et forenklet statuspanel. Alt er grønt kl. 20:57: et helt vanlig kveldsskift. Nederst ser dere applikasjonene våre.

[click] Git og pakkebrønnen slutter å svare. Det kan skyldes en disk, en oppgradering, et nettverksproblem eller et angrep.

[click] I løpet av minutter stopper alle verktøyene som avhenger av dem: GitOps, automasjon, bygg og utrulling, scriptene våre og sårbarhetspatchingen.

Legg merke til at applikasjonene ikke går ned. De kjører videre, men ingen kan lenger vedlikeholde dem.
-->

---
# Slide nr: 4
layout: statement
transition: slide-up
---

# Dette er <span style="color: var(--sp-danger)">ikke bare</span> utviklerverktøy

<h2 v-click>Det er grunnmuren under hele driften</h2>

<!--
Mange tenker på Git og pakkebrønnen som noe utviklerne bruker. Det er en misforståelse.

[click] I vårt miljø er de selve driftsplattformen. All endring i produksjon går gjennom dem.
-->

---
# Slide nr: 5
layout: default
---

# Agenda

<div class="agenda">
  <carbon-idea /> <h2>Hva er Git og pakkebrønnen?</h2>
</div>
<div class="agenda">
  <carbon-flow /> <h2>Hvorfor alt avhenger av dem</h2>
</div>
<div class="agenda">
  <carbon-user-avatar /> <h2>Tre scenarioer ved frafall av grunnmuren</h2>
</div>
<div class="agenda">
  <carbon-help-desk /> <h2>Når grunnmuren halter</h2>
</div>
<div class="agenda">
  <carbon-chart-line /> <h2>Hva det betyr for virksomheten</h2>
</div>
<div class="agenda">
  <carbon-task /> <h2>Hva vi anbefaler</h2>
</div>

<style>
.agenda {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
  font-size: 1.6rem;
  color: var(--sp-primary);
}
.agenda h2 {
  margin: 0;
  color: white;
}
</style>

<!--
Seks deler. [click] Først en forklaring uten teknologi. [click] Så hvordan alt henger sammen. [click] Deretter tre scenarioer ved frafall av grunnmuren, knyttet til MetaVision, DIPS og Public 360. [click] Så feilene som er vanskeligere enn at tjenestene er nede, og hvem man kontakter da. [click] Konsekvensene for virksomheten. [click] Og til slutt hva vi anbefaler.
-->

---
# Slide nr: 6
layout: section
transition: slide-up
---

# Del 1
## Hva er egentlig Git og pakkebrønnen?

---
# Slide nr: 7
layout: two-cols-header
---

# Hva er Git og pakkebrønnen?

::left::

<div v-click>

## <simple-icons-gitlab class="inline-block" /> Git

- Fasiten på hvordan alt *skal* være
- All konfigurasjon, alle scripts, all automasjon
- Full historikk: hvem endret hva, og når

<ImpactWarning>Uten Git har vi ikke koden som utfører automasjon</ImpactWarning>

</div>

::right::

<div v-click>

## <carbon-package class="inline-block" /> Pakkebrønnen

- Eneste godkjente kilde til programvare
- Kontrollert, skannet og godkjent
- Leverandørpakker og oppdateringer lagres her

<ImpactWarning>Uten pakkebrønnen kan vi ikke installere eller oppgradere programvare</ImpactWarning>

</div>

<!--
[click] Git er fasiten. Den sier hvordan alle systemer skal være satt opp, inneholder koden som utfører automasjonen vår, og viser hvem som har endret hva. Uten Git har vi ikke koden som utfører automasjon.

[click] Pakkebrønnen er den eneste godkjente kilden til programvare. Alt som kommer fra leverandørene lagres, kontrolleres og skannes her. Vi henter ikke noe direkte fra internett. Uten pakkebrønnen kan vi ikke installere eller oppgradere pakker.
-->

---
# Slide nr: 8
layout: default
clicks: 1
---

# Alt bygger oppå grunnmuren

<StackDiagram :step="$clicks" />

<!--
Slik henger det sammen. Nederst ligger grunnmuren: Git og pakkebrønnen. Over den ligger verktøyene vi bruker til å endre, patche og reparere. Øverst ligger applikasjonene, som DIPS, MetaVision og Public 360.

[click] Tar vi ut grunnmuren, stopper verktøyene. Applikasjonene kjører videre, men de kan ikke lenger vedlikeholdes. Det er dette som er poenget: det gjør ikke vondt med en gang, men det gjør vondt hver gang noe må endres.
-->

---
# Slide nr: 9
layout: two-cols-header
---

# Hvorfor air-gapped gjør det mer kritisk

::left::

<div v-click="1">

## <carbon-cloud class="inline-block" /> Åpent miljø

<ul class="strike-list" :class="{ struck: $clicks >= 3 }">
  <li>Henter pakker fra internett</li>
  <li>Skytjenester som reserve</li>
  <li>Mange alternative veier</li>
</ul>

</div>

::right::

<div v-click="2">

## <carbon-locked class="inline-block" /> Vårt miljø

- **All** programvare via egen pakkebrønn
- **All** konfigurasjon i egen Git
- <span class="font-bold" style="color: var(--sp-danger)">Ingen</span> reservevei utenfra

</div>

::bottom-center::

<div v-click="4" class="text-lg opacity-90 mt-4">
  Air-gap beskytter oss mot angrep utenfra, men gjør oss <b>helt</b> avhengige av de interne tjenestene.
</div>

<style>
.strike-list li {
  text-decoration: line-through;
  text-decoration-color: transparent;
  text-decoration-thickness: 2px;
}
.strike-list.struck li {
  text-decoration-color: var(--sp-danger);
  opacity: 0.6;
}
</style>

<!--
[click] I et vanlig miljø kan man hente pakker fra internett, bruke skytjenester som reserve, og det finnes mange veier rundt et problem.

[click] Hos oss går all programvare via vår egen pakkebrønn, og all konfigurasjon ligger i vår egen Git. Det finnes ingen reservevei utenfra.

[click] Nå streker vi over det som ikke gjelder for oss. Ingenting av dette finnes i vårt miljø.

[click] Air-gap er et bevisst og riktig sikkerhetsvalg. Men prisen er at disse to tjenestene blir single points of failure.
-->

---
# Slide nr: 10
layout: section
transition: slide-up
---

# Del 2
## Hvorfor alt avhenger av dem

---
# Slide nr: 11
layout: default
clicks: 3
---

# Ett feilpunkt – hele stacken rammes

<BlastRadius :step="$clicks" />

<!--
Til venstre grunnmuren, i midten verktøyene våre, til høyre applikasjonene. Linjene viser avhengighetene.

[click] Hvis bare Git går ned, stopper alle fem verktøyene, også Backport. Applikasjonene kjører, men får ikke normalt vedlikehold.

[click] Hvis bare pakkebrønnen går ned, stopper fire av fem. Bare de manuelle scriptene overlever, og de trenger ofte pakker de også.

[click] Hvis begge går ned, finnes det ingen vei rundt. Det er dette vi mener med single point of failure.
-->

---
# Slide nr: 12
layout: default
clicks: 3
---

# Hva skjer med applikasjonene?

<AppImpact :step="$clicks" />

<!--
Applikasjonene selv går ikke ned. Spørsmålet er hva som skjer med drift og vedlikehold. Her er vår vurdering per applikasjon.

[click] Git nede. DIPS kjører på Kubernetes med ArgoCD, og all drift følger en GitOps-arbeidsflyt. Uten Git stopper drift og vedlikehold. MetaVision kan i beste fall patches fra en lokal kopi av repoet, hvis teknikeren har en oppdatert en liggende. Public 360 kan vedlikeholdes med en fersk lokal kopi.

[click] Pakkebrønnen nede. For MetaVision er dette verre, fordi alle Choco-pakkene ligger sentralt i et pakkeformat. Det finnes ingen gode alternativer. Public 360 kan overstyres til å bruke lokale filer, og kjører de samme kommandoene som CI/CD.

[click] Begge nede. DIPS stopper helt opp, og manuelle omveier går mot GitOps og kan gjøre mer skade enn nytte. MetaVision stopper. Public 360 er den enkleste å lage manuelle rutiner rundt, men det er fortsatt krevende.

Poenget: helseforetakene merker ikke at applikasjonene går ned. Det er vedlikehold og drift som kan stoppe helt opp til tjenestene er tilbake.
-->

---
# Slide nr: 13
layout: default
clicks: 3
---

# Kjører videre, men uten vedlikehold

<SummaryFlow :step="$clicks" />

<!--
Oppsummert i ett bilde. Alt starter grønt: applikasjoner, verktøy og grunnmur.

[click] Når grunnmuren blir ustabil, stopper verktøyene. Applikasjonene kjører videre og er derfor gule, ikke røde.

[click] Drift og vedlikehold stopper opp. En tekniker som prøver å gjøre det manuelt, kommer ikke gjennom. Det er ikke bare et spørsmål om vilje: automasjonen er selve arbeidsmåten.

[click] Og i et air-gapped miljø finnes det ingen reservevei utenfra. Veggen mot internett er et bevisst sikkerhetsvalg, men betyr at vi ikke kan hente oss ut av problemet.
-->

---
# Slide nr: 14
layout: section
transition: slide-up
---

# Del 3
## Tre scenarioer ved frafall av grunnmuren

---
# Slide nr: 15
layout: section
transition: slide-up
---

# Scenario 1
## MetaVision: pakkebrønnen svarer ikke

---
# Slide nr: 16
layout: default
clicks: 3
timeline:
  - time: "08:00"
    title: Kritisk sårbarhet publiseres
    who: CERT
  - time: "09:12"
    title: Oppdaterte pakker legges i pakkebrønnen
    who: MetaVision
    severity: good
  - time: "10:32"
    title: Vedlikeholdsvindu godkjent
    who: MetaVision
    severity: good
line: green
---

# Scenario 1 · Om dagen

<DayTimeline :items="$frontmatter.timeline" :line="$frontmatter.line" :step="$clicks" />

<!--
Scenario 1 handler om MetaVision, som deployes med PowerShell DSC og Choco-pakker.

[click] 08:00: CERT varsler om en kritisk sårbarhet.
[click] 09:12: Oppdaterte pakker legges i pakkebrønnen.
[click] 10:32: Vedlikeholdsvinduet blir godkjent. Alt ser ut til å gå etter planen.
-->

---
# Slide nr: 17
layout: default
clicks: 6
timeline:
  - time: "20:57"
    title: Pakkebrønnen svarer ikke
    who: Pakkebrønn-teamet
    severity: bad
  - time: "21:05"
    title: Pakkebrønn-hendelse registrert
    who: Driftssenter
  - time: "21:18"
    title: Ingen i Pakkebrønn-teamet svarer telefon
    who: Driftssenter
    severity: bad
  - time: "22:00"
    title: Vedlikehold starter
    who: MetaVision
    severity: good
  - time: "22:12"
    title: Oppgradering feiler
    who: MetaVision
    severity: bad
  - time: "23:35"
    title: Vedlikehold utsatt
    who: MetaVision
    severity: bad
---

# Scenario 1 · Om kvelden

<DayTimeline :items="$frontmatter.timeline" :step="$clicks" />

<!--
[click] 20:57: pakkebrønnen slutter å svare.
[click] 21:05: hendelsen blir registrert av driftssenteret.
[click] 21:18: ingen i Pakkebrønn-teamet svarer på telefon.
[click] 22:00: vedlikeholdet starter likevel, fordi vinduet er godkjent.
[click] 22:12: oppgraderingen feiler. Koden ligger i Git, og teknikeren kan i beste fall klone en fersk kopi, men alle Choco-pakkene ligger kun i pakkebrønnen. Det finnes ingen gode alternativer.
[click] 23:35: vedlikeholdet utsettes. Vinduet er tapt, og sårbarheten fra morgenen er fortsatt ikke patchet. Nytt vindu må planlegges, varsles og godkjennes.
-->

---
# Slide nr: 18
layout: section
transition: slide-up
---

# Scenario 2
## DIPS: Git er nede

---
# Slide nr: 19
layout: default
clicks: 4
---

# DIPS: patchen som ikke kan rulles ut

<DipsFlow :step="$clicks" />

<!--
Scenario 2 handler om DIPS. DIPS kjører på Kubernetes og bruker ArgoCD som CD-verktøy.

[click] CERT har som rolle å varsle når det kommer inn kritiske sårbarheter. Nå er det en ny i DIPS-stacken.

[click] Patchen er klar, og skal rulles ut etter GitOps-prinsippet: først inn i Git, så henter ArgoCD den.

[click] Men Git er nede. ArgoCD ser ikke endringen, og patchen kommer aldri frem til DIPS. Selve applikasjonen går ikke ned, men den kan ikke oppdateres. Manuelle omveier går hardt mot GitOps og kan i verste fall påføre mer skade.

[click] Sikkerhetsvinduet står åpent. DIPS kjører videre på en sårbar versjon til Git er tilbake.
-->

---
# Slide nr: 20
layout: default
clicks: 2
transition: slide-left
---

# Sårbarhetsvinduet

<ExposureClock :step="$clicks" />

<!--
Øverst ser dere en vanlig dag: patchen bygges og rulles ut, og vinduet er lukket etter noen timer. Tallene er eksempler.

[click] Nederst: når Git eller pakkebrønnen er nede, vokser vinduet. Vi vet ikke når det lukkes.

[click] Hver time er en time der angripere kan utnytte en sårbarhet som er offentlig kjent.
-->

---
# Slide nr: 21
layout: section
transition: slide-up
---

# Scenario 3
## Public 360: begge tjenestene er nede

---
# Slide nr: 22
layout: default
clicks: 4
---

# Public 360: arbeid som ikke er i Git (1/2)

<P360Comic :part="1" :step="$clicks" />

<!--
Scenario 3 handler om Public 360, som deployes gjennom CI/CD og Ansible. Her er både Git og pakkebrønnen nede, og teknikerne må bruke manuelle rutiner.

[click] Det oppstår en feil i Public 360. Driftssenteret responderer og kontakter driftsansvarlig, Tekniker A.

[click] Tekniker A finner ut at Git og pakkebrønn er nede, men har en lokal kopi av koden.

[click] Tekniker A legger installasjonsfiler manuelt på målsystemet, og bruker lokal kopi og endringer til å få tjenesten opp igjen. Det er mulig å overstyre til lokale filer og kjøre kommandoene fra CI/CD manuelt. Public 360 er den enkleste av de tre å lage manuelle rutiner rundt.

[click] Poenget så langt: å jobbe uten Git og pakkebrønn krever mange manuelle tiltak. Og endringene Tekniker A har gjort ligger bare lokalt.
-->

---
# Slide nr: 23
layout: default
clicks: 4
---

# Public 360: arbeid som ikke er i Git (2/2)

<P360Comic :part="2" :step="$clicks" />

<!--
[click] Tekniker A får ikke lagt de endrede filene i Git, siden Git er nede.

[click] Flere uker senere ligger det fortsatt gammel kode i Git. Tekniker B trigger automasjon i CI/CD, som bygger på den gamle koden og knekker Public 360.

[click] Tekniker B vet ikke hva som er galt, får ikke tak i Tekniker A, og må avbryte vedlikeholdet.

[click] Poenget: manuelt arbeid som ikke er i Git, samsvarer ikke med virkeligheten, og problemet oppstår først senere.
-->

---
# Slide nr: 24
layout: quote
---

# "Vi visste hva vi skulle gjøre. Vi kunne bare ikke gjøre det."

## Typisk utsagn etter en slik hendelse

---
# Slide nr: 25
layout: section
transition: slide-up
---

# Del 4
## Når grunnmuren halter

---
# Slide nr: 26
layout: statement
---

# «Nede» er det <span style="color: var(--sp-warning)">enkle</span> tilfellet

<h2 v-click>Det vanskelige er når tjenestene svarer, men noe likevel ikke fungerer</h2>

<!--
Til nå har vi snakket om at Git og pakkebrønnen går helt ned. Det er alvorlig, men det er i det minste tydelig: alle ser at noe er galt.

[click] I praksis er mange feil mer kompliserte. Tjenestene svarer, men noe fungerer ikke.
-->

---
# Slide nr: 27
layout: default
clicks: 5
---

# Når tjenestene svarer, men ikke fungerer

<FailureGrid :step="$clicks" />

<!--
Her er noen eksempler på feil der Git og pakkebrønnen svarer, men noe likevel ikke fungerer.

[click] Deler av tjenesten svikter: CI/CD-runnerne er nede, har fulle disker eller lange køer, eller enkeltprosjekter har problemer.

[click] Noe er feil satt opp: en endring har ført til feilkonfigurasjon, som først oppdages når et annet team starter sitt vedlikehold. Eller rettighetene er feil.

[click] Noe har utløpt: sertifikater på tjenesten eller på støttekomponenter, tokens og deploy keys. Det skjer plutselig, og feilmeldingene er ofte kryptiske.

[click] Innholdet er feil: synk av leverandørpakker har stoppet, så pakkene blir utdaterte, eller skanneren blokkerer pakker på grunn av en falsk positiv eller endret policy.

[click] Felles for alle: de er vanskeligere å oppdage og vanskeligere å feilsøke enn at tjenesten er nede.
-->

---
# Slide nr: 28
layout: default
clicks: 3
---

# Hvordan få hjelp?

<SupportChain :step="$clicks" />

<!--
Konsumentene er teamene som drifter applikasjonene og bruker Git og pakkebrønnen i automasjonen sin. Når noe er rart, trenger de noen å spørre.

[click] Først prøver de å finne svaret selv. Det krever dokumentasjon og selvbetjening.

[click] Neste ledd er driftssenteret. De er døgnbemannet, men Git og pakkebrønnen er spesialfelt. Uten dokumentasjon og automasjon er det vanskelig å feilsøke.

[click] Til slutt trenger man noen med fagkompetanse som kan feilsøke og gjøre administrative overstyringer. Skalaen under viser overgangen fra selvhjelp til support: jo lenger ut i kjeden, jo færre kan hjelpe, og jo lenger tar det.
-->

---
# Slide nr: 29
layout: default
clicks: 4
---

# Hva som må på plass

<SupportPillars :step="$clicks" />

<!--
Tre ting må på plass for å håndtere slike feil.

[click] Konsumentene trenger god dokumentasjon og selvbetjening, slik at de kan løse enkle problemer selv. Det er her de fleste sakene bør løses.

[click] Driftssenteret trenger dokumentasjon og automasjon, slik at de kan fungere som en reell førstelinje.

[click] Og det må finnes fagpersonell som kan bidra med support og administrative overstyringer der det trengs, og som kan nås når feilen oppstår.

[click] Målet er at de fleste feil løses før noen må ringe en fagperson.
-->

---
# Slide nr: 31
layout: section
transition: slide-up
---

# Del 5
## Hva betyr dette for virksomheten?

---
# Slide nr: 32
layout: three-cols-header
---

# Konsekvenser

::left::

<div v-click>

<div class="col-head">
  <carbon-security class="col-icon" style="color: var(--sp-danger)" />
  <h2>Sikkerhet</h2>
</div>

- Sårbarheter kan stå åpne lenger
- Risiko for brudd på patchekrav
- Økt angrepsflate over tid

</div>

::middle::

<div v-click>

<div class="col-head">
  <carbon-dashboard class="col-icon" style="color: var(--sp-warning)" />
  <h2>Drift</h2>
</div>

- Utrulling og patching stopper
- Lengre gjenoppretting
- Økt risiko for manuelle feil

</div>

::right::

<div v-click>

<div class="col-head">
  <carbon-hospital class="col-icon" style="color: var(--sp-primary)" />
  <h2>Helseforetakene</h2>
</div>

- Lengre nedetider
- Feil kan bli stående lenger
- Endringer kommer senere

</div>

<style>
.col-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}
.col-head .col-icon {
  font-size: 3rem;
}
.col-head h2 {
  margin: 0;
}
</style>

<!--
Dette er vår vurdering av konsekvensene. Den bør kvalitetssikres sammen med dere.

[click] Sikkerhet: vi klarer ikke å lukke kjente hull, og kan bryte egne krav og krav fra myndighetene.

[click] Drift: konsumentene, altså teamene som drifter applikasjonene, står uten verktøyene de bruker for å rette feil, og kan bli tvunget over på manuelle løsninger.

[click] Helseforetakene: applikasjonene kjører videre, men når noe først går galt, blir nedetiden lengre. Feil og sårbarheter kan bli stående lenger, og rettinger og oppgraderinger kommer senere.
-->

---
# Slide nr: 33
layout: default
clicks: 4
---

# Nedetid får ringvirkninger

<FlowCards :step="$clicks" />

<!--
Slik forplanter én teknisk hendelse seg.

[click] Uten en fungerende Git og pakkebrønn, enten de er nede eller bare ustabile, stopper patching, utrulling og automasjon.

[click] Applikasjonene kjører, men de kan ikke patches eller oppgraderes.

[click] Det gir to direkte konsekvenser: sårbarheter blir stående åpne, og feil tar lengre tid å rette.

[click] Og risikoen vokser for hver time og dag.
-->

---
# Slide nr: 34
layout: two-cols-header
ratio: "45%"
---

# Risikobildet – foreløpig vurdering

::left::

<RiskMatrix :step="$clicks >= 3 ? 2 : $clicks >= 1 ? 1 : 0" />

::right::

<div v-click="1" class="mb-5">
  <div class="text-xl font-bold" style="color: var(--sp-danger)">I dag</div>
  Lav til middels sannsynlighet, men <b>kritisk</b> konsekvens
</div>

<div v-click="2" class="mb-5">
  <div class="text-xl font-bold" style="color: var(--sp-warning)">Hvorfor så høyt?</div>
  Én hendelse rammer sikkerhet, drift og helseforetakene samtidig
</div>

<div v-click="3">
  <div class="text-xl font-bold" style="color: var(--sp-success)">Med tiltak</div>
  Redundans, testet gjenoppretting og en tydelig førstelinje reduserer både sannsynlighet og konsekvens
</div>

<!--
Dette er vår foreløpige vurdering. Den bør kvalitetssikres i risikoprosessen.

[click] I dag: det skjer ikke ofte, men når det skjer, er konsekvensen kritisk.

[click] Grunnen er at én hendelse treffer alt på en gang.

[click] Med tiltakene vi foreslår, flytter vi oss ned i det grønne feltet.
-->

---
# Slide nr: 35
layout: section
transition: slide-up
---

# Del 6
## Hva anbefaler vi?

---
# Slide nr: 36
layout: two-cols-header
---

# Hvorfor ikke manuelle reserverutiner?

::left::

<div v-click>

## Det fungerer ikke i praksis

- Noe automasjon er helt avhengig av Git og pakkebrønnen, uten gode manuelle alternativer
- Det skalerer ikke: teknikerne må vedlikeholde og utføre både automasjon og manuelle rutiner
- Hverdagen bygger på automasjon, så manuelle rutiner blir nedprioritert

</div>

::right::

<div v-click>

## Det er heller ikke trygt

- Sjelden brukte rutiner blir utdaterte og gir falsk trygghet
- Omveier bryter sporbarhet og sikkerhetskontroll: hvem endret hva, og er pakken skannet?
- Manuelle endringer skaper avvik fra fasiten og gjør gjenopprettingen vanskeligere

</div>

<!--
Et naturlig spørsmål er: kan ikke hver tjeneste bare ha en manuell reserverutine?

[click] Det fungerer ikke i praksis. Noe automasjon er kritisk avhengig av at Git og pakkebrønnen fungerer, og finnes ikke i manuell form. Det skalerer heller ikke, fordi hver tekniker i tillegg til automasjonen må vedlikeholde og utføre manuelle prosesser. Og i hverdagen vil man prioritere å levere mer, så de manuelle rutinene blir nedprioritert.

[click] Det er heller ikke trygt. Rutiner som sjelden brukes blir utdaterte og gir falsk trygghet. Manuelle omveier mister sporbarhet og sikkerhetskontroll. Og manuelle endringer skaper avvik fra fasiten, som gjør gjenopprettingen vanskeligere.
-->

---
# Slide nr: 37
layout: default
---

# Hva lønner seg?

<div class="compare">
  <div class="card">
    <carbon-document-multiple-01 class="icon" />
    <b>Flere manuelle rutiner</b>
  </div>
  <div class="lt">&lt;</div>
  <div class="card">
    <carbon-layers class="icon" />
    <b>Én robust grunnmur</b>
  </div>
</div>

<h4 class="summary">Det er bedre å gjøre grunnmuren robust enn å vedlikeholde manuelle rutiner for hver tjeneste</h4>

<style>
.compare {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
}
.compare .card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 16px;
  border-radius: 14px;
  border-top: 4px solid var(--card-color);
  background: color-mix(in srgb, var(--card-color) 10%, transparent);
  text-align: center;
  --card-color: var(--sp-primary);
}
.compare .card b {
  font-size: 1.5rem;
}
.compare .icon {
  font-size: 3rem;
  color: var(--card-color);
}
.compare .lt {
  font-size: 6rem;
  font-weight: bold;
  line-height: 1;
  color: var(--sp-primary);
}
.summary {
  margin-top: 40px;
  text-align: center;
}
</style>

<!--
Oppsummert: krav om å vedlikeholde manuelle rutiner for hver tjeneste er en dårlig idé.

[click] På den ene siden har vi mange manuelle rutiner, én for hver tjeneste.
[click] De er verdt mindre enn
[click] én robust grunnmur.
[click] Det er mye mer lønnsomt å gjøre Git og pakkebrønnen robuste.
-->

---
# Slide nr: 38
layout: default
---

# Våre anbefalinger

<div class="cards">
  <div v-click class="card">
    <carbon-warning-alt class="icon" />
    <b>Klassifiser som kritisk</b>
    <span>Når de stopper, stopper alt som bygger på dem</span>
  </div>
  <div v-click class="card">
    <carbon-renew class="icon" />
    <b>Høy tilgjengelighet</b>
    <span>Redundans og testet gjenoppretting</span>
  </div>
  <div v-click class="card">
    <carbon-dashboard class="icon" />
    <b>Overvåking og varsling</b>
    <span>Oppdage feil før brukerne gjør det, døgnet rundt</span>
  </div>
  <div v-click class="card">
    <carbon-help-desk class="icon" />
    <b>Førstelinje og selvbetjening</b>
    <span>Dokumentasjon og automasjon</span>
  </div>
</div>

<style>
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.cards .card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 16px;
  border-radius: 14px;
  border-top: 4px solid var(--sp-primary);
  background: color-mix(in srgb, var(--sp-primary) 10%, transparent);
  line-height: 1.3;
}
.cards .card b {
  font-size: 1.15rem;
}
.cards .card span {
  font-size: 0.95rem;
  opacity: 0.85;
}
.cards .icon {
  font-size: 2.2rem;
  color: var(--sp-primary);
}
</style>

<!--
Fem konkrete anbefalinger.

[click] Klassifiser dem som kritisk infrastruktur. Når Git og pakkebrønnen stopper, stopper alt som bygger på dem.
[click] Bygg redundans, og test at gjenoppretting faktisk fungerer.
[click] Overvåk tjenestene og sørg for varsling døgnet rundt, slik at vi oppdager feil før brukerne gjør det.
[click] Gi konsumentene dokumentasjon og selvbetjening, og gi driftssenteret dokumentasjon og automasjon slik at de kan være førstelinje.
[click] Og velg en robust grunnmur fremfor manuelle reserverutiner per tjeneste.
-->

---
# Slide nr: 40
layout: statement
---

# Grunnmuren må være like robust som det vi bygger på den

<!--
Det er budskapet å ta med seg. Vi bygger stadig mer oppå Git og pakkebrønnen, og da må de tåle belastningen.
-->

---
# Slide nr: 41
layout: end
---

# Takk!

## Spørsmål?
