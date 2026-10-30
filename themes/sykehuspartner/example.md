---
theme: ./
title: Sykehuspartner-tema
info: |
  Komponentgalleri for Sykehuspartner-temaet. Hver slide viser én byggekloss.
  Kjør med `npx slidev themes/sykehuspartner/example.md`.
drawings:
  persist: false
layout: cover
---

# Tittel på presentasjonen<br>over to linjer

## Undertittel

<p class="muted" style="font-size:34px;margin-top:10px">Stikkord · Stikkord · Stikkord</p>

---
layout: default
---

# Agenda

<div class="content">
<div class="agenda">
<div class="item reveal"><div class="num">1</div>Første tema</div>
<div class="item reveal"><div class="num">2</div>Andre tema</div>
<div class="item reveal"><div class="num">3</div>Tredje tema</div>
</div>
</div>

---
layout: default
topic: Tekst
---

# Punktliste og admonitions

<div class="content">
<ul>
<li class="reveal"><strong>Uthevet</strong> – vanlig tekst i 35px</li>
<li class="reveal">Kort, konkrete punkter – maks 5–6 per slide</li>
</ul>
<div class="columns-3-top" style="margin-top:40px;gap:26px">
<div class="admonition tip reveal">Tips / positivt</div>
<div class="admonition info reveal">Informasjon</div>
<div class="admonition warning reveal">Advarsel</div>
</div>
<p class="xs muted" style="margin-top:20px">Fotnote med .xs og .muted</p>
</div>

---
layout: default
topic: Kort
---

# Kort i to kolonner

<div class="content">
<div class="columns-2-top">
<div class="card accent reveal" style="--c:var(--ok)"><h4>📈 Kort med aksentfarge</h4><p>Kort tekst i 28px, dempet farge.</p></div>
<div class="card accent reveal" style="--c:var(--warn)"><h4>🚀 Kort med aksentfarge</h4><p>Bruk --c for å sette farge på toppkanten.</p></div>
</div>
<div class="columns-2-top" style="margin-top:30px">
<div class="card reveal" style="border-color:#f4433666">
<h3 style="color:#ff7a7a">✋ Før</h3>
<ul class="small"><li>Sammenligning – negativ side</li><li>Punkt to</li></ul>
</div>
<div class="card reveal" style="border-color:#4caf5066">
<h3 style="color:#7bf77f">⚙️ Etter</h3>
<ul class="small"><li>Sammenligning – positiv side</li><li>Punkt to</li></ul>
</div>
</div>
</div>

---
layout: default
topic: Kort
---

# Kortrutenett

<div class="content">
<div class="card-grid">
<div class="card accent reveal" style="--c:var(--git)"><div class="badge" style="--c:var(--git)">A</div><h4>Første</h4><p>Alle kort i rutenettet har lik størrelse</p></div>
<div class="card accent reveal" style="--c:var(--vscode)"><div class="badge" style="--c:var(--vscode)">B</div><h4>Andre</h4><p>Badge med tekst, initialer eller emoji</p></div>
<div class="card accent reveal" style="--c:var(--proget)"><div class="badge" style="--c:var(--proget)">C</div><h4>Tredje</h4><p>Antall kolonner settes med --cols</p></div>
</div>
</div>

---
layout: default
topic: Prosess
---

# Flyt

<div class="content">
<div class="flow">
<div class="node reveal" style="--c:var(--sp-light)"><div class="badge" style="--c:var(--sp-blue)">📝</div><b>Steg 1</b><span>Kort beskrivelse</span></div>
<div class="arrow">➜</div>
<div class="node reveal" style="--c:var(--git)"><div class="badge" style="--c:var(--git)">🗂️</div><b>Steg 2</b><span>Kort beskrivelse</span></div>
<div class="arrow">➜</div>
<div class="node reveal" style="--c:var(--warn)"><div class="badge" style="--c:var(--warn)">▶</div><b>Steg 3</b><span>Kort beskrivelse</span></div>
<div class="arrow">➜</div>
<div class="node reveal" style="--c:var(--ok)"><div class="badge" style="--c:#2e7d32">✓</div><b>Resultat</b><span>Kort beskrivelse</span></div>
</div>
</div>

---
layout: default
topic: Prosess
---

# Tidslinje

<div class="content">
<div class="timeline" style="--cols:4">
<div class="step reveal" style="--c:var(--sp-light)"><div class="circle">🗓️</div><b>Planlegg</b><span>Kort beskrivelse</span></div>
<div class="step reveal" style="--c:var(--warn)"><div class="circle">⬇️</div><b>Utfør</b><span>Kort beskrivelse</span></div>
<div class="step reveal" style="--c:var(--warn)"><div class="circle">🔄</div><b>Kontroller</b><span>Kort beskrivelse</span></div>
<div class="step reveal" style="--c:var(--ok)"><div class="circle">✅</div><b>Ferdig</b><span>Kort beskrivelse</span></div>
</div>
</div>

---
layout: default
topic: Prosess
---

# Pipeline

<div class="content">
<div class="pipeline" style="--cols:3">
<div class="stage reveal" style="--c:var(--sp-light)">
<div class="head">Validate</div>
<div class="job"><span class="dot">✓</span>lint</div>
<div class="job"><span class="dot">✓</span>analyse</div>
</div>
<div class="stage reveal" style="--c:var(--warn)">
<div class="head">Test</div>
<div class="job"><span class="dot">✓</span>test</div>
</div>
<div class="stage reveal" style="--c:var(--ok)">
<div class="head">Deploy</div>
<div class="job manual"><span class="dot">▶</span>prod (manuell)</div>
</div>
</div>
</div>

---
layout: default
topic: Prosess
---

# Nummererte steg

<div class="content">
<div class="steps">
<div class="s reveal"><div class="n">1</div><div><strong>Første</strong> – kort forklaring</div></div>
<div class="s reveal"><div class="n">2</div><div><strong>Andre</strong> – kort forklaring</div></div>
<div class="s reveal"><div class="n">3</div><div><strong>Tredje</strong> – kort forklaring</div></div>
</div>
</div>

---
layout: default
topic: Data
---

# Stolper og statusrutenett

<div class="content">
<div class="columns-2-center">
<div class="bars reveal">
<div class="bar-row"><span>Før</span>
<div class="bar"><div style="width:70%;background:#b23a30">70 %</div><div style="width:30%;background:#2e7d32">30 %</div></div>
</div>
<div class="bar-row"><span>Etter</span>
<div class="bar"><div style="width:30%;background:#b23a30">30 %</div><div style="width:70%;background:#2e7d32">70 %</div></div>
</div>
<div class="legend"><span><i style="background:#b23a30"></i>Kategori A</span><span><i style="background:#2e7d32"></i>Kategori B</span></div>
</div>
<div class="servers reveal">
<div class="srv"><span class="ico">🖥️</span>srv-01<br><span class="state">OK</span></div>
<div class="srv bad"><span class="ico">🖥️</span>srv-02<br><span class="state">Avvik</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-03<br><span class="state">OK</span></div>
<div class="srv"><span class="ico">🖥️</span>srv-04<br><span class="state">OK</span></div>
</div>
</div>
</div>

---
layout: default
topic: Diagram
---

# SVG-diagram

<div class="content">
<svg viewBox="0 0 1720 300" style="width:100%">
<defs>
<marker id="ex-ah1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#6cace4"/></marker>
</defs>
<rect x="0" y="60" width="420" height="180" rx="20" fill="#161b22" stroke="#fc6d26" stroke-width="4"/>
<text x="210" y="140" fill="#fff" font-size="34" font-weight="800" text-anchor="middle">Kilde</text>
<text x="210" y="190" fill="#9da7b3" font-size="24" text-anchor="middle">Undertekst</text>
<g stroke="#6cace4" stroke-width="5" fill="none" marker-end="url(#ex-ah1)" class="draw">
<path d="M420 150 L 646 150"/>
<path d="M1070 150 L 1296 150"/>
</g>
<rect x="650" y="60" width="420" height="180" rx="20" fill="#1d1530" stroke="#a371f7" stroke-width="4"/>
<text x="860" y="140" fill="#fff" font-size="34" font-weight="800" text-anchor="middle">Behandling</text>
<text x="860" y="190" fill="#d2b8ff" font-size="24" text-anchor="middle">Undertekst</text>
<rect x="1300" y="60" width="420" height="180" rx="20" fill="#122a14" stroke="#4caf50" stroke-width="4"/>
<text x="1510" y="140" fill="#fff" font-size="34" font-weight="800" text-anchor="middle">Resultat</text>
<text x="1510" y="190" fill="#9da7b3" font-size="24" text-anchor="middle">Undertekst</text>
</svg>
<div class="admonition info reveal" style="margin-top:30px">
SVG tegnes i 1720px bredde (innholdsbredden). Bruk kun font-size-verdier som finnes i temaets CSS.
</div>
</div>

---
layout: default
---

# Til diskusjon

<div class="content">
<h2 style="font-size:56px">Spørsmål til salen?</h2>
<div class="card-grid" style="margin-top:20px">
<div class="card accent reveal"><div class="badge">⏳</div><h4>Spørsmål 1</h4><p>Kort formulert spørsmål</p></div>
<div class="card accent reveal"><div class="badge">🚧</div><h4>Spørsmål 2</h4><p>Kort formulert spørsmål</p></div>
<div class="card accent reveal"><div class="badge">🧰</div><h4>Spørsmål 3</h4><p>Kort formulert spørsmål</p></div>
</div>
</div>

---
layout: cover
---

<div class="center">

# Takk for oppmerksomheten

## Spørsmål?

</div>
