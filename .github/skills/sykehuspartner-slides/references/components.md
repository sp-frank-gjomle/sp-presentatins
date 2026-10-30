# Sykehuspartner theme – component catalog

Visual reference: [example.md](../../../../themes/sykehuspartner/example.md). Each section
below matches a slide there, and the real-world use is in
[presentations/automation/slides.md](../../../../presentations/automation/slides.md).
Styles: [sykehuspartner.css](../../../../themes/sykehuspartner/styles/sykehuspartner.css).

All snippets go inside `<div class="content">…</div>` on a `layout: default` slide.
Write raw HTML with **no blank lines inside a block**, or Markdown will break it up.

## Colors

Use CSS variables, never new hex colors for UI chrome:

| Variable | Use |
|---|---|
| `--sp-blue` `#023f84`, `--sp-light` `#6cace4`, `--sp-pale` `#cee7ff` | Brand |
| `--ok` (green), `--warn` (yellow), `--danger` (red) | Status |
| `--bg` / `--bg-2` / `--bg-3`, `--border`, `--fg`, `--muted` | Surfaces and text |
| `--gitlab`, `--git`, `--proget`, `--vscode`, `--ansible`, `--pwsh` | Product accents |

Positive/negative text: `#7bf77f` / `#ff7a7a`. Bar fills: `#2e7d32` / `#b23a30`.
Many components take an accent via inline `style="--c:var(--ok)"`.

## Text utilities

`.muted` (grey), `.small` (28px), `.xs` (24px). Body text is 35px; `h1` 90px (slide
title, one per slide), `h2` 70px, `h3` 50px, `h4` 40px (card titles, light blue).

## Layout helpers

| Class | Effect |
|---|---|
| `.content` | Fills the slide under the title, centers vertically. **Always wrap content in it.** |
| `.columns-2-top` / `.columns-2-center` | 2 columns, top/center aligned, 3rem gap |
| `.columns-3-top`, `.columns-4-top` | 3 / 4 columns |

Spacing between blocks: inline `style="margin-top:30px"` (typical 20–56px).

## Bullet list

```html
<ul>
<li class="reveal"><strong>Nøkkelord</strong> – forklaring</li>
<li class="reveal">Punkt</li>
</ul>
```

Use `<ul class="small">` inside cards.

## Admonition

```html
<div class="admonition tip reveal">Positiv melding</div>
<div class="admonition info reveal"><strong>Merk:</strong> informasjon</div>
<div class="admonition warning reveal">Advarsel</div>
```

## Card

```html
<div class="card reveal"><h4>⏱️ Tittel</h4><p>Kort tekst</p></div>
<div class="card accent reveal" style="--c:var(--ok)"><h4>📈 Tittel</h4><p>Kort tekst</p></div>
```

Before/after comparison: two `.card` in `.columns-2-top`, with
`style="border-color:#f4433666"` / `#4caf5066`, an `<h3>` colored `#ff7a7a` / `#7bf77f`,
and a `<ul class="small">`.

## Card grid (equal-size cards, 556×280px)

```html
<div class="card-grid">
<div class="card accent reveal" style="--c:var(--git)"><div class="badge" style="--c:var(--git)">A</div><h4>Tittel</h4><p>Tekst</p></div>
…
</div>
```

3 columns by default. Use `style="--cols:2"` for 2. Max 3 columns, so 6 cards over 2 rows.
For 4 columns of free-height cards, use a plain grid instead:
`<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px">`.

## Badge

`<div class="badge" style="--c:var(--sp-blue)">📝</div>`: an 84px rounded square with an emoji
or 1–2 letters. It's smaller inside `.card-grid`.

## Agenda

```html
<div class="agenda">
<div class="item reveal"><div class="num">1</div>Tema</div>
</div>
```

## Flow (horizontal process, 3–5 nodes)

```html
<div class="flow">
<div class="node reveal" style="--c:var(--sp-light)"><div class="badge" style="--c:var(--sp-blue)">📝</div><b>Steg</b><span>Beskrivelse</span></div>
<div class="arrow">➜</div>
<div class="node reveal" style="--c:var(--ok)"><div class="badge" style="--c:#2e7d32">✓</div><b>Resultat</b><span>Beskrivelse</span></div>
</div>
```

## Timeline (3–6 steps)

```html
<div class="timeline" style="--cols:4">
<div class="step reveal" style="--c:var(--sp-light)"><div class="circle">🗓️</div><b>Steg</b><span>Beskrivelse</span></div>
</div>
```

`--cols` must equal the number of steps (6 by default).

## Pipeline (CI/CD stages)

```html
<div class="pipeline" style="--cols:4">
<div class="stage reveal" style="--c:var(--sp-light)">
<div class="head">Validate</div>
<div class="job"><span class="dot">✓</span>jobbnavn</div>
<div class="job manual"><span class="dot">▶</span>manuell jobb</div>
</div>
</div>
```

## Numbered steps (vertical)

```html
<div class="steps">
<div class="s reveal"><div class="n">1</div><div><strong>Steg</strong> – forklaring</div></div>
</div>
```

## Bars and legend

```html
<div class="bars">
<div class="bar-row"><span>Før</span>
<div class="bar"><div style="width:70%;background:#b23a30">Tekst</div><div style="width:30%;background:#2e7d32">Tekst</div></div>
</div>
</div>
<div class="legend"><span><i style="background:#b23a30"></i>Kategori</span></div>
```

Mark illustrative numbers with `<p class="xs muted">Illustrasjon – ikke målte tall.</p>`.

## Status grid (4 columns)

```html
<div class="servers">
<div class="srv"><span class="ico">🖥️</span>navn<br><span class="state">OK</span></div>
<div class="srv bad"><span class="ico">🖥️</span>navn<br><span class="state">Avvik</span></div>
</div>
```

## SVG diagrams

Use these for architecture and relationship diagrams that the components above can't express.

- `<svg viewBox="0 0 1720 H" style="width:100%">`. 1720 is the content width, so 1 unit = 1px.
  Keep `H` such that title + SVG + other content fit in 1080px (usually ≤ 600).
- **`font-size` must be one of** 20, 22, 23, 24, 26, 27, 28, 30, 32, 34, 36, 40, and
  `opacity` only `.5`. Slidev's UnoCSS attributify rewrites other values (e.g. 28 → 7rem).
  If you need another value, add a matching `svg [font-size="N"] { font-size: Npx; }`
  rule in `sykehuspartner.css`.
- Boxes: `rect rx="16–20"`, fill a dark tint (`#161b22`, `#2a1508`, `#1d1530`, `#122a14`,
  `#0a2550`, `#2a0d0d`), stroke an accent, `stroke-width="3–4"`.
- Text: titles `fill="#fff" font-weight="800"`, subtitles `fill="#9da7b3"`, `text-anchor="middle"`.
- Arrows: a `<marker>` in `<defs>`. **Marker/gradient ids must be unique across the whole
  deck** (all slides share one DOM). Use a slide-specific prefix, e.g. `id="ah-git-1"`.
- Add `class="draw"` to a `<g>` of paths/lines to animate them being drawn.

## Animation

- Add `class="reveal"` to each block that should rise in. Siblings are staggered by
  `:nth-child` (up to 11).
- `.draw` on SVG strokes.
- Do not use Slidev `v-click`. Animations are pure CSS and can be toggled with key `A`.
