---
theme: default
title: Automasjon i drift og vedlikehold
info: |
  ## Automasjon i drift og vedlikehold
  Hva, hvorfor og hvordan – GitLab CI/CD, Ansible, Ansible AWX og PowerShell DSC.

  Konvertert fra HTML-presentasjonen til Slidev. Fargepalett og stil er basert
  på sykehuspartner-marp-theme.css (sykehuspartner-v1, invert).
htmlAttrs:
  lang: no
colorSchema: dark
routerMode: hash
canvasWidth: 1920
aspectRatio: 16/9
transition: fade
fonts:
  provider: none
drawings:
  persist: false
layout: cover
---

# Automasjon i drift<br>og vedlikehold

## Hva, hvorfor og hvordan

<p class="muted" style="font-size:34px;margin-top:10px">GitLab CI/CD · Ansible · Ansible AWX · PowerShell DSC</p>

---
layout: default
---

# Agenda

<div class="content">
<div class="agenda">
<div class="item reveal"><div class="num">1</div>Hva er automasjon?</div>
<div class="item reveal"><div class="num">2</div>Hvorfor automatiserer vi?</div>
<div class="item reveal"><div class="num">3</div>Teknologiene vi bruker</div>
<div class="item reveal"><div class="num">4</div>Effekter av automasjon</div>
<div class="item reveal"><div class="num">5</div>Onboarding</div>
</div>
</div>

---
layout: default
topic: Hva er automasjon?
---

# Hva er automasjon?

<div class="content">
<p class="reveal" style="font-size:38px;margin-bottom:36px">Vi beskriver oppgaver og ønsket tilstand som <strong>kode</strong> – og lar maskinene utføre dem, likt hver gang.</p>
<div class="flow">
<div class="node reveal" style="--c:var(--sp-light)"><div class="badge" style="--c:var(--sp-blue)">📝</div><b>Beskriv</b><span>Ønsket tilstand eller oppgave skrives som kode</span></div>
<div class="arrow">➜</div>
<div class="node reveal" style="--c:var(--git)"><div class="badge" style="--c:var(--git)">🗂️</div><b>Versjoner</b><span>Koden lagres og gjennomgås i Git</span></div>
<div class="arrow">➜</div>
<div class="node reveal" style="--c:var(--warn)"><div class="badge" style="--c:var(--warn)">▶</div><b>Utfør</b><span>GitLab CI/CD eller AWX ruller koden ut på serverne</span></div>
<div class="arrow">➜</div>
<div class="node reveal" style="--c:var(--ok)"><div class="badge" style="--c:#2e7d32">✓</div><b>Resultat</b><span>Samme resultat – på én eller hundre servere</span></div>
</div>
<div class="columns-2-top" style="margin-top:40px;gap:26px">
<div class="card accent reveal" style="--c:var(--ansible)"><h4>▶️ Ansible: steg for steg</h4><p>Playbooken sier <strong style="color:#fff">hva som skal gjøres</strong>, i rekkefølge. Ansible kobler seg til over SSH eller WinRM og utfører stegene. Brukes til både oppgaver (patching, sertifikater) og konfigurasjon.</p></div>
<div class="card accent reveal" style="--c:#5391fe"><h4>🎯 PowerShell DSC: desired state</h4><p>Konfigurasjonen sier <strong style="color:#fff">hvordan serveren skal se ut</strong>, ikke hvordan den kommer dit. Runneren pusher den over WinRM, og LCM på serveren tester og retter avvik.</p></div>
</div>
</div>

---
layout: default
topic: Hva er automasjon?
---

# Samme resultat hver gang

<div class="content">
<div style="display:grid;grid-template-columns:1fr 260px 1fr;align-items:center;gap:30px">
<div class="reveal">
<h4 style="color:#ff7a7a">Før: configuration drift</h4>
<div class="servers">
<div class="srv"><span class="ico">🖥️</span>srv-01<br><span class="state">OK</span></div>
<div class="srv bad"><span class="ico">🖥️</span>srv-02<br><span class="state">Avvik</span></div>
<div class="srv bad"><span class="ico">🖥️</span>srv-03<br><span class="state">Avvik</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-04<br><span class="state">OK</span></div>
<div class="srv bad"><span class="ico">🖥️</span>srv-05<br><span class="state">Avvik</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-06<br><span class="state">OK</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-07<br><span class="state">OK</span></div>
<div class="srv bad"><span class="ico">🖥️</span>srv-08<br><span class="state">Avvik</span></div>
</div>
</div>
<div class="reveal" style="text-align:center">
<div class="badge" style="--c:var(--ansible);width:140px;height:140px;font-size:60px;border-radius:50%">▶</div>
<div class="small">Kjør automasjonen</div>
</div>
<div class="reveal">
<h4 style="color:#7bf77f">Etter: desired state</h4>
<div class="servers">
<div class="srv"><span class="ico">🖥️</span>srv-01<br><span class="state">OK</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-02<br><span class="state">Rettet</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-03<br><span class="state">Rettet</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-04<br><span class="state">OK</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-05<br><span class="state">Rettet</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-06<br><span class="state">OK</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-07<br><span class="state">OK</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-08<br><span class="state">Rettet</span></div>
</div>
</div>
</div>
<div class="admonition info reveal" style="margin-top:44px">
<strong>Idempotent:</strong> koden kan kjøres om og om igjen – den endrer kun det som avviker.
</div>
</div>

---
layout: default
topic: Hvorfor automatiserer vi?
---

# Hvorfor automatiserer vi?

<div class="content">
<div class="columns-2-top">
<div class="card reveal" style="border-color:#f4433666">
<h3 style="color:#ff7a7a">✋ Manuell drift</h3>
<ul class="small">
<li>Klikk og kommandoer – én server om gangen</li>
<li>Kunnskap sitter i hodet på enkeltpersoner</li>
<li>Ulik konfigurasjon på «like» servere</li>
<li>Vanskelig å vite <em>hvem</em> endret <em>hva</em> og <em>når</em></li>
<li>Vedlikehold på kveldstid med mange manuelle steg</li>
</ul>
</div>
<div class="card reveal" style="border-color:#4caf5066">
<h3 style="color:#7bf77f">⚙️ Automatisert drift</h3>
<ul class="small">
<li>Samme kode kjøres mot mange servere samtidig</li>
<li>Kunnskap ligger i Git – tilgjengelig for alle</li>
<li>Konsistent konfigurasjon (desired state)</li>
<li>Full sporbarhet via commits og merge requests</li>
<li>Vedlikehold på kveldstid med automasjon vi trigger selv</li>
</ul>
</div>
</div>
<svg viewBox="0 0 1720 120" style="width:100%;margin-top:30px" class="reveal">
<defs>
<linearGradient id="g1" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="1660" y2="0"><stop offset="0" stop-color="#f44336"/><stop offset="1" stop-color="#4caf50"/></linearGradient>
<marker id="ah1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#4caf50"/></marker>
</defs>
<line x1="40" y1="60" x2="1660" y2="60" stroke="url(#g1)" stroke-width="10" marker-end="url(#ah1)" class="draw"/>
<text x="40" y="30" fill="#ff7a7a" font-size="28">Reaktiv · manuell · personavhengig</text>
<text x="1660" y="110" fill="#7bf77f" font-size="28" text-anchor="end">Proaktiv · standardisert · sporbar</text>
</svg>
</div>

---
layout: default
topic: Hvorfor automatiserer vi?
---

# Formål og strategisk forankring

<div class="content">
<div class="card accent reveal" style="--c:var(--sp-light);text-align:center;padding:34px 40px">
<h3 style="margin:0 0 .3em;font-size:56px">
<span style="color:#ff7a7a">ClickOps</span>
<span style="color:var(--sp-light)">→</span>
<span style="color:#7bf77f">DevSecOps</span>
</h3>
<p style="font-size:32px">Gjennom standardisert automasjon som gir <strong style="color:#fff">forutsigbar kvalitet</strong>, <strong style="color:#fff">lavere risiko</strong> og <strong style="color:#fff">felles kompetanse</strong>.</p>
</div>
<h3 class="reveal" style="margin:40px 0 20px">Støtter Sykehuspartners <span style="color:var(--sp-light)">Shift left</span>-strategi</h3>
<div class="columns-2-top">
<div class="card accent reveal" style="--c:var(--ok)">
<h4>📈 Økt produktivitet</h4>
<p>Færre manuelle oppgaver, bedre driftskvalitet</p>
</div>
<div class="card accent reveal" style="--c:var(--warn)">
<h4>🚀 Økt adopsjonshastighet</h4>
<p>Felles metodikk gjør det enklere å ta i bruk ny teknologi</p>
</div>
</div>
</div>

---
layout: default
topic: Teknologi
---

# Teknologiene vi bruker

<div class="content">
<svg viewBox="0 0 1720 520" style="width:100%">
<defs>
<marker id="ah5" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#6cace4"/></marker>
</defs>
<rect x="0" y="140" width="380" height="240" rx="20" fill="#2a1508" stroke="#fc6d26" stroke-width="4"/>
<text x="190" y="210" fill="#fff" font-size="34" font-weight="800" text-anchor="middle">GitLab-repoer</text>
<text x="190" y="260" fill="#9da7b3" font-size="24" text-anchor="middle">Playbooks · roles</text>
<text x="190" y="295" fill="#9da7b3" font-size="24" text-anchor="middle">inventory · DSC-konfig</text>
<text x="190" y="345" fill="#fcb48a" font-size="24" text-anchor="middle">Én kilde til sannhet</text>
<g stroke="#6cace4" stroke-width="5" fill="none" marker-end="url(#ah5)" class="draw">
<path d="M380 220 C 470 220, 470 130, 556 130"/>
<path d="M380 300 C 470 300, 470 390, 556 390"/>
<path d="M1160 130 C 1250 130, 1250 220, 1336 220"/>
<path d="M1160 390 C 1250 390, 1250 300, 1336 300"/>
</g>
<text x="470" y="245" fill="#6cace4" font-size="22" text-anchor="middle">pipeline</text>
<text x="470" y="290" fill="#6cace4" font-size="22" text-anchor="middle">project</text>
<rect x="560" y="10" width="600" height="240" rx="20" fill="#161b22" stroke="#fc6d26" stroke-width="4"/>
<text x="860" y="64" fill="#fff" font-size="36" font-weight="800" text-anchor="middle">GitLab CI/CD</text>
<rect x="590" y="100" width="260" height="120" rx="14" fill="#2a0d0d" stroke="#ee0000" stroke-width="3"/>
<text x="720" y="152" fill="#fff" font-size="32" font-weight="700" text-anchor="middle">Ansible</text>
<text x="720" y="190" fill="#ff9a9a" font-size="22" text-anchor="middle">primærverktøy</text>
<rect x="870" y="100" width="260" height="120" rx="14" fill="#0a2550" stroke="#5391fe" stroke-width="3"/>
<text x="1000" y="152" fill="#fff" font-size="28" font-weight="700" text-anchor="middle">PowerShell DSC</text>
<text x="1000" y="190" fill="#9cc0ff" font-size="22" text-anchor="middle">enkelte Windows-miljøer</text>
<rect x="560" y="290" width="600" height="220" rx="20" fill="#1d1530" stroke="#a371f7" stroke-width="4"/>
<text x="860" y="350" fill="#fff" font-size="36" font-weight="800" text-anchor="middle">Ansible AWX</text>
<text x="860" y="405" fill="#d2b8ff" font-size="24" text-anchor="middle">Job templates basert på GitLab-repoer</text>
<text x="860" y="455" fill="#9da7b3" font-size="24" text-anchor="middle">Eksempel: sertifikatfornyelse</text>
<rect x="1340" y="140" width="380" height="240" rx="20" fill="#122a14" stroke="#4caf50" stroke-width="4"/>
<text x="1530" y="210" fill="#fff" font-size="34" font-weight="800" text-anchor="middle">🖥️ Servere</text>
<text x="1530" y="270" fill="#9da7b3" font-size="24" text-anchor="middle">🐧 Linux (SSH)</text>
<text x="1530" y="310" fill="#9da7b3" font-size="24" text-anchor="middle">🪟 Windows (WinRM)</text>
</svg>
<div class="admonition info reveal" style="margin-top:30px">
<strong>Ansible</strong> er primærverktøyet. Støtteverktøy: <strong>Git</strong>, <strong>VS Code</strong> og <strong>ProGet</strong>.
</div>
</div>

---
layout: default
topic: Teknologi
---

# Alt starter i Git: fra idé til main

<div class="content">
<svg viewBox="0 0 1720 330" style="width:100%">
<defs>
<marker id="ah2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#6cace4"/></marker>
</defs>
<line x1="40" y1="250" x2="1660" y2="250" stroke="#6cace4" stroke-width="8" marker-end="url(#ah2)"/>
<text x="40" y="310" fill="#9da7b3" font-size="28">main</text>
<path d="M260 250 C 330 250, 330 90, 420 90 L 1150 90 C 1240 90, 1240 250, 1320 250" fill="none" stroke="#fc6d26" stroke-width="8" class="draw"/>
<text x="440" y="50" fill="#fc6d26" font-size="28">feature/patch-rhel9</text>
<g fill="#0d1117" stroke-width="7">
<circle cx="120" cy="250" r="22" stroke="#6cace4"/>
<circle cx="260" cy="250" r="22" stroke="#6cace4"/>
<circle cx="520" cy="90" r="22" stroke="#fc6d26"/>
<circle cx="720" cy="90" r="22" stroke="#fc6d26"/>
<circle cx="920" cy="90" r="22" stroke="#fc6d26"/>
<circle cx="1320" cy="250" r="30" stroke="#4caf50" fill="#1e4620"/>
</g>
<text x="1320" y="260" fill="#fff" font-size="28" text-anchor="middle">✓</text>
<g font-size="24" fill="#9da7b3" text-anchor="middle">
<text x="520" y="145">commit</text><text x="720" y="145">commit</text><text x="920" y="145">commit</text>
<text x="1320" y="310" fill="#7bf77f">merge</text>
</g>
<rect x="1000" y="150" width="250" height="60" rx="30" fill="#161b22" stroke="#fc6d26" stroke-width="3"/>
<text x="1125" y="190" fill="#fff" font-size="26" text-anchor="middle">Merge request</text>
</svg>
<div class="columns-4-top" style="margin-top:30px;gap:22px">
<div class="card reveal"><h4>1 · Branch</h4><p>Ny gren for hver endring – main er alltid stabil</p></div>
<div class="card reveal"><h4>2 · Commit</h4><p>Små, beskrivende commits fra VS Code</p></div>
<div class="card reveal"><h4>3 · Merge request</h4><p>Malverk for MR, pipeline kjører automatisk</p></div>
<div class="card reveal"><h4>4 · Review</h4><p>Peer review – fire øyne før endringen går ut</p></div>
</div>
</div>

---
layout: default
topic: Teknologi
---

# GitLab CI/CD

<div class="content">
<p class="reveal" style="margin-bottom:40px">En <strong>pipeline</strong> kjører automatisk ved hver endring – validerer, tester og ruller ut koden med <strong>Ansible</strong> eller <strong>PowerShell DSC</strong>.</p>
<div class="pipeline" style="grid-template-columns: repeat(4, 1fr)">
<div class="stage reveal" style="--c:var(--sp-light)">
<div class="head">Validate</div>
<div class="job"><span class="dot">✓</span>yamllint</div>
<div class="job"><span class="dot">✓</span>ansible-lint</div>
<div class="job"><span class="dot">✓</span>PSScriptAnalyzer</div>
</div>
<div class="stage reveal" style="--c:var(--warn)">
<div class="head">Test</div>
<div class="job"><span class="dot">✓</span>syntax-check</div>
<div class="job"><span class="dot">✓</span>check mode</div>
</div>
<div class="stage reveal" style="--c:var(--gitlab)">
<div class="head">Deploy test</div>
<div class="job"><span class="dot">✓</span>test / qa</div>
</div>
<div class="stage reveal" style="--c:var(--ok)">
<div class="head">Deploy prod</div>
<div class="job manual"><span class="dot">▶</span>prod (manuell)</div>
</div>
</div>
<div class="columns-2-top reveal" style="margin-top:40px;gap:26px">
<div class="admonition tip">Feil fanges i pipelinen – <strong>ikke</strong> i produksjon.</div>
<div class="admonition info">Prod trigges <strong>manuelt</strong> av oss i vedlikeholdsvinduet.</div>
</div>
<p class="xs muted" style="margin-top:14px">Forenklet eksempel – ikke alle steg og jobber brukes i alle repositories. Runnerne henter pakker og assets fra ProGet ved behov.</p>
</div>

---
layout: default
topic: Teknologi
---

# Ansible – primærverktøyet

<div class="content">
<p class="reveal" style="margin-bottom:24px">Beskriver ønsket tilstand i lesbar YAML og utfører den <strong>agentløst</strong> mot Linux og Windows.</p>
<svg viewBox="0 0 1720 600" style="width:100%">
<defs>
<marker id="ah3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#6cace4"/></marker>
</defs>
<g font-size="30" fill="#fff">
<rect x="0" y="40" width="400" height="120" rx="16" fill="#161b22" stroke="#30363d" stroke-width="2"/>
<text x="30" y="92" font-weight="700">📋 Inventory</text><text x="30" y="134" font-size="23" fill="#9da7b3">Hvilke servere – gruppert per miljø</text>
<rect x="0" y="200" width="400" height="120" rx="16" fill="#161b22" stroke="#30363d" stroke-width="2"/>
<text x="30" y="252" font-weight="700">▶️ Playbooks</text><text x="30" y="294" font-size="23" fill="#9da7b3">Hva som skal gjøres – i rekkefølge</text>
<rect x="0" y="360" width="400" height="120" rx="16" fill="#161b22" stroke="#30363d" stroke-width="2"/>
<text x="30" y="412" font-weight="700">🧩 Roles</text><text x="30" y="454" font-size="23" fill="#9da7b3">Gjenbrukbare byggeklosser</text>
</g>
<g stroke="#6cace4" stroke-width="5" fill="none" marker-end="url(#ah3)" class="draw">
<path d="M400 100 C 520 100, 520 230, 640 230"/>
<path d="M400 260 C 520 260, 520 230, 640 230"/>
<path d="M400 420 C 520 420, 520 230, 640 230"/>
</g>
<rect x="650" y="90" width="430" height="280" rx="24" fill="#2a0d0d" stroke="#ee0000" stroke-width="4"/>
<text x="865" y="175" fill="#fff" font-size="40" font-weight="800" text-anchor="middle">Ansible</text>
<text x="865" y="225" fill="#ff9a9a" font-size="26" text-anchor="middle">kjøres fra GitLab CI/CD</text>
<text x="865" y="265" fill="#ff9a9a" font-size="26" text-anchor="middle">eller en AWX job template</text>
<text x="865" y="330" fill="#9da7b3" font-size="23" text-anchor="middle">Agentløst – ingenting å installere</text>
<rect x="650" y="450" width="430" height="140" rx="18" fill="#0f2530" stroke="#3fa7d6" stroke-width="3" stroke-dasharray="12 8"/>
<text x="865" y="500" fill="#fff" font-size="32" font-weight="700" text-anchor="middle">📦 ProGet</text>
<text x="865" y="538" fill="#9da7b3" font-size="22" text-anchor="middle">Pakker og assets: images, runnere,</text>
<text x="865" y="568" fill="#9da7b3" font-size="22" text-anchor="middle">msi/exe/zip, Linux-pakker</text>
<path d="M865 450 L865 382" stroke="#3fa7d6" stroke-width="5" stroke-dasharray="10 8" marker-end="url(#ah3)"/>
<g stroke="#4caf50" stroke-width="5" fill="none" marker-end="url(#ah3)" class="draw">
<path d="M1080 190 C 1200 190, 1200 140, 1320 140"/>
<path d="M1080 270 C 1200 270, 1200 460, 1320 460"/>
</g>
<text x="1170" y="140" fill="#7bf77f" font-size="26" text-anchor="middle">SSH</text>
<text x="1170" y="445" fill="#7bf77f" font-size="26" text-anchor="middle">WinRM</text>
<g font-size="30" fill="#fff">
<rect x="1330" y="50" width="390" height="180" rx="16" fill="#161b22" stroke="#4caf50" stroke-width="3"/>
<text x="1360" y="115" font-weight="700">🐧 Linux-servere</text>
<text x="1360" y="160" font-size="23" fill="#9da7b3">RHEL · patching · tjenester</text>
<text x="1360" y="195" font-size="23" fill="#9da7b3">konfigurasjon · sertifikater</text>
<rect x="1330" y="370" width="390" height="180" rx="16" fill="#161b22" stroke="#4caf50" stroke-width="3"/>
<text x="1360" y="435" font-weight="700">🪟 Windows-servere</text>
<text x="1360" y="480" font-size="23" fill="#9da7b3">Windows Update · IIS</text>
<text x="1360" y="515" font-size="23" fill="#9da7b3">registry · features</text>
</g>
</svg>
</div>

---
layout: default
topic: Teknologi
---

# PowerShell DSC

<div class="content">
<div class="columns-2-center">
<div>
<ul>
<li class="reveal"><strong>Desired State Configuration</strong> – beskriv <em>hvordan</em> serveren skal se ut, ikke hvordan du kommer dit</li>
<li class="reveal">Kjøres fra <strong>GitLab CI/CD</strong> via en PowerShell runner</li>
<li class="reveal"><strong>Supplement til Ansible</strong> – brukes i enkelte Windows-miljøer der det passer best</li>
<li class="reveal">Pakker og assets hentes fra <strong>ProGet</strong></li>
</ul>
</div>
<svg viewBox="0 0 700 620" style="width:100%">
<defs>
<marker id="ah4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#5391fe"/></marker>
</defs>
<circle cx="350" cy="320" r="210" fill="none" stroke="#5391fe" stroke-width="6" stroke-dasharray="30 18" opacity=".5"/>
<g stroke="#5391fe" stroke-width="6" fill="none" marker-end="url(#ah4)">
<path d="M440 135 A 210 210 0 0 1 555 380"/>
<path d="M500 480 A 210 210 0 0 1 200 480"/>
<path d="M145 380 A 210 210 0 0 1 260 135"/>
</g>
<circle cx="350" cy="320" r="110" fill="#0a2550" stroke="#5391fe" stroke-width="4"/>
<text x="350" y="310" fill="#fff" font-size="34" font-weight="800" text-anchor="middle">Desired</text>
<text x="350" y="352" fill="#fff" font-size="34" font-weight="800" text-anchor="middle">state</text>
<g font-size="30" text-anchor="middle">
<circle cx="350" cy="110" r="70" fill="#161b22" stroke="#5391fe" stroke-width="4"/>
<text x="350" y="105" fill="#fff" font-weight="700">Test</text><text x="350" y="138" fill="#9da7b3" font-size="20">Er det riktig?</text>
<circle cx="560" cy="470" r="70" fill="#161b22" stroke="#e9d416" stroke-width="4"/>
<text x="560" y="465" fill="#fff" font-weight="700">Set</text><text x="560" y="498" fill="#9da7b3" font-size="20">Rett avvik</text>
<circle cx="140" cy="470" r="70" fill="#161b22" stroke="#4caf50" stroke-width="4"/>
<text x="140" y="465" fill="#fff" font-weight="700">Get</text><text x="140" y="498" fill="#9da7b3" font-size="20">Rapporter</text>
</g>
</svg>
</div>
</div>

---
layout: default
topic: Teknologi
---

# Ansible AWX

<div class="content">
<div class="columns-2-center">
<div>
<ul>
<li class="reveal"><strong>Web-grensesnitt</strong> for å kjøre Ansible</li>
<li class="reveal"><strong>Job templates</strong> samler playbook, inventory og credentials</li>
<li class="reveal">Koden hentes fra <strong>GitLab-repoer</strong> – samme kode og arbeidsflyt som ellers</li>
<li class="reveal"><strong>Logg og historikk</strong> for hver kjøring</li>
</ul>
<div class="admonition tip reveal" style="margin-top:36px">Eksempel: <strong>sertifikatfornyelse</strong></div>
</div>
<svg viewBox="0 0 700 660" style="width:100%;height:640px">
<defs>
<marker id="ah6" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#a371f7"/></marker>
</defs>
<rect x="150" y="0" width="400" height="90" rx="16" fill="#2a1508" stroke="#fc6d26" stroke-width="3"/>
<text x="350" y="56" fill="#fff" font-size="30" font-weight="700" text-anchor="middle">📁 GitLab-repo</text>
<g stroke="#a371f7" stroke-width="5" fill="none" marker-end="url(#ah6)">
<path d="M350 92 L350 140"/>
<path d="M350 422 L350 466"/>
<path d="M350 538 L350 582"/>
</g>
<text x="372" y="124" fill="#d2b8ff" font-size="22">project</text>
<rect x="60" y="150" width="580" height="270" rx="20" fill="#1d1530" stroke="#a371f7" stroke-width="4"/>
<text x="350" y="200" fill="#fff" font-size="32" font-weight="800" text-anchor="middle">Job template</text>
<g font-size="26" fill="#fff">
<rect x="100" y="222" width="500" height="50" rx="10" fill="#161b22" stroke="#30363d" stroke-width="2"/>
<text x="125" y="256">▶️ Playbook</text>
<rect x="100" y="282" width="500" height="50" rx="10" fill="#161b22" stroke="#30363d" stroke-width="2"/>
<text x="125" y="316">📋 Inventory</text>
<rect x="100" y="342" width="500" height="50" rx="10" fill="#161b22" stroke="#30363d" stroke-width="2"/>
<text x="125" y="376">🔑 Credentials</text>
</g>
<rect x="230" y="474" width="240" height="60" rx="30" fill="#1e4620" stroke="#4caf50" stroke-width="3"/>
<text x="350" y="514" fill="#fff" font-size="28" font-weight="700" text-anchor="middle">▶ Launch</text>
<rect x="150" y="590" width="400" height="66" rx="16" fill="#161b22" stroke="#4caf50" stroke-width="3"/>
<text x="350" y="633" fill="#fff" font-size="28" font-weight="700" text-anchor="middle">🖥️ Servere</text>
</svg>
</div>
</div>

---
layout: default
topic: Teknologi
---

# Støtteverktøy

<div class="content">
<div class="card-grid">
<div class="card accent reveal" style="--c:var(--git)"><div class="badge" style="--c:var(--git)">Git</div><h4>Git</h4><p>Versjonskontroll – full historikk og mulighet for rollback</p></div>
<div class="card accent reveal" style="--c:var(--vscode)"><div class="badge" style="--c:var(--vscode)">VS</div><h4>VS Code</h4><p>Editor med extensions for Ansible, YAML, PowerShell og GitLab</p></div>
<div class="card accent reveal" style="--c:var(--proget)"><div class="badge" style="--c:var(--proget)">PG</div><h4>ProGet</h4><p>Pakker og assets: images, runnere, msi/exe/zip og Linux-pakker</p></div>
</div>
<div class="admonition info reveal" style="margin-top:36px;width:1720px;align-self:center">
ProGet er ikke et steg i flyten – runnerne og serverne henter pakker derfra ved behov.
</div>
</div>

---
layout: default
topic: Effekter
---

# I praksis: automatisert patching

<div class="content">
<div class="timeline">
<div class="step reveal" style="--c:var(--sp-light)"><div class="circle">🗓️</div><b>Planlegg</b><span>Vedlikeholdsvindu og servergrupper fra inventory</span></div>
<div class="step reveal" style="--c:var(--sp-light)"><div class="circle">👆</div><b>Trigger</b><span>Vi starter pipelinen manuelt i prod</span></div>
<div class="step reveal" style="--c:var(--warn)"><div class="circle">⬇️</div><b>Patch</b><span>Automatisert med Ansible / PowerShell</span></div>
<div class="step reveal" style="--c:var(--warn)"><div class="circle">🔄</div><b>Restart</b><span>Kontrollert, i fast rekkefølge</span></div>
<div class="step reveal" style="--c:var(--ok)"><div class="circle">✅</div><b>Verifiser</b><span>Tjenester oppe igjen</span></div>
<div class="step reveal" style="--c:var(--ok)"><div class="circle">👀</div><b>Følg opp</b><span>Vi følger med og håndterer avvik</span></div>
</div>
<div class="columns-3-top" style="margin-top:56px;gap:26px">
<div class="admonition tip reveal">Mindre rom for menneskelige feil</div>
<div class="admonition tip reveal">Samme prosess hver gang</div>
<div class="admonition tip reveal">Vi har kontrollen – vi trigger selv</div>
</div>
<div class="admonition info reveal" style="margin-top:30px">
I dag: vedlikehold på kveldstid med automasjon vi starter selv – <strong>ikke</strong> full hands-off.
</div>
</div>

---
layout: default
topic: Effekter
---

# Effekter av automasjon

<div class="content">
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px">
<div class="card reveal"><h4>⏱️ Tid</h4><p>Mindre tid på repetitive oppgaver</p></div>
<div class="card reveal"><h4>🛡️ Kvalitet</h4><p>Færre menneskelige feil</p></div>
<div class="card reveal"><h4>🔁 Konsistens</h4><p>Lik konfigurasjon på tvers av miljøer</p></div>
<div class="card reveal"><h4>🔎 Sporbarhet</h4><p>Alle endringer er versjonskontrollert</p></div>
<div class="card reveal"><h4>🧠 Kompetanse</h4><p>Kunnskapsdeling gjennom kode</p></div>
<div class="card reveal"><h4>🚀 Proaktiv drift</h4><p>Mer tid til forbedring</p></div>
<div class="card accent reveal" style="--c:var(--git);grid-column:span 2"><h4>📝 Selvdokumentert</h4><p>Koden i Git <em>er</em> dokumentasjonen – alltid oppdatert, med historikk for hva som ble endret, av hvem og hvorfor</p></div>
</div>
<div class="columns-2-center reveal" style="margin-top:36px">
<div class="bars">
<div class="bar-row"><span>Før</span>
<div class="bar"><div style="width:70%;background:#b23a30">Manuelt / reaktivt</div><div style="width:30%;background:#2e7d32">Proaktivt</div></div>
</div>
<div class="bar-row"><span>Etter</span>
<div class="bar"><div style="width:30%;background:#b23a30">Manuelt</div><div style="width:70%;background:#2e7d32">Proaktivt / forbedring</div></div>
</div>
</div>
<div>
<h4>Hvor går tiden?</h4>
<div class="legend"><span><i style="background:#b23a30"></i>Manuelt og reaktivt arbeid</span><span><i style="background:#2e7d32"></i>Proaktivt arbeid</span></div>
<p class="xs muted" style="margin-top:14px">Illustrasjon av ambisjonen – ikke målte tall.</p>
</div>
</div>
</div>

---
layout: default
topic: Onboarding
---

# Onboarding

<div class="content">
<div class="columns-2-top">
<div>
<h3>Kom i gang</h3>
<div class="steps">
<div class="s reveal"><div class="n">1</div><div><strong>Tilgang</strong> – GitLab, ProGet og relevante repositories</div></div>
<div class="s reveal"><div class="n">2</div><div><strong>GitHub Copilot</strong> – krever tilgang til Helse Sør-Øst sitt GitHub-område</div></div>
<div class="s reveal"><div class="n">3</div><div><strong>Verktøy</strong> – installer VS Code og nødvendige extensions</div></div>
<div class="s reveal"><div class="n">4</div><div><strong>Konfigurasjon</strong> – sett opp Git og SSH-nøkler</div></div>
<div class="s reveal"><div class="n">5</div><div><strong>Dokumentasjon</strong> – les retningslinjer og best practices</div></div>
</div>
</div>
<div>
<h3>Ressurser – åpent og tilgjengelig!</h3>
<div class="card reveal" style="margin-bottom:20px"><h4>📖 Dokumentasjon</h4><p><a href="https://gitlab.sikt.sykehuspartner.no/admapp-automasjon/admapp-documentation" target="_blank">admapp-documentation</a></p></div>
<div class="card reveal" style="margin-bottom:20px"><h4>🧩 Malverk</h4><p><a href="https://gitlab.sikt.sykehuspartner.no/admapp-automasjon/admapp-templates" target="_blank">admapp-templates</a></p></div>
<div class="card reveal"><h4>🎓 Ansible Days (kurs)</h4><p>Tilgjengelig i GitHub – søk tilgang i BAT</p></div>
</div>
</div>
</div>

---
layout: default
---

# Til diskusjon

<div class="content">
<h2 style="font-size:56px">Hvor står vi?</h2>
<div class="card-grid" style="margin-top:20px">
<div class="card accent reveal"><div class="badge">⏳</div><h4>Tidstyver</h4><p>Hvilke oppgaver bruker du mest tid på i dag?</p></div>
<div class="card accent reveal"><div class="badge">🚧</div><h4>Hindringer</h4><p>Hva hindrer deg i å starte med automatisering?</p></div>
<div class="card accent reveal"><div class="badge">🧰</div><h4>Behov</h4><p>Hva trenger du for å komme i gang?</p></div>
</div>
</div>

---
layout: cover
---

<div class="center">

# Takk for oppmerksomheten

## Spørsmål?

</div>
