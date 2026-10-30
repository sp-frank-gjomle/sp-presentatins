---
name: sykehuspartner-slides
description: 'Create and edit Slidev presentations in the Sykehuspartner design (themes/sykehuspartner). Use when: scaffolding a new presentation/deck, adding, editing or redesigning slides, choosing slide components (cards, flow, timeline, pipeline, agenda, admonitions, SVG diagrams), or verifying slides with slidev build and PNG screenshots.'
argument-hint: 'Describe the deck or slide, e.g. "ny presentasjon om backup" or "legg til en slide om X i automation"'
---

# Sykehuspartner slides

Decks live in `presentations/<deck>/slides.md` and use the shared local Slidev theme in
[themes/sykehuspartner](../../../themes/sykehuspartner/). The theme supplies the
1920×1080 canvas, colors, logo, footer, page numbers, the animation toggle (key `A`), and
all CSS components. Every `presentations/*/slides.md` is published to GitHub Pages
automatically by `.github/workflows/deploy-pages.yml`.

- Component catalog with copy-paste snippets: [components.md](./references/components.md)
- Starter deck: [assets/slides.md](./assets/slides.md)
- Visual gallery: [example.md](../../../themes/sykehuspartner/example.md) (a buildable deck)
- Real example: [presentations/automation/slides.md](../../../presentations/automation/slides.md)

## Ground rules

- **Language: Norwegian bokmål** for all slide text, unless the user asks otherwise.
- **Never guess content.** If the topic, audience, key messages, facts or numbers are
  unclear, ask the user. Don't invent statistics. Label illustrations as such.
- Reuse existing components. Don't add inline hex colors for UI chrome; use theme variables.
- Don't edit the theme for a one-off need. Put deck-specific CSS in
  `presentations/<deck>/style.css`, which Slidev loads automatically after the theme. Change
  `themes/sykehuspartner/` only for reusable improvements, and only after confirming with
  the user, because the change affects every deck. If you add a reusable component, also
  add it to `example.md` and `references/components.md`.

## Slide anatomy

```md
---
layout: default
topic: Kapittelnavn
---

# Overskrift

<div class="content">
…components from references/components.md…
</div>
```

- `layout: cover` is for the title slide and the closing slide. It shows the large logo
  and no footer. Cover markup: `# Tittel`, `## Undertittel`, an optional
  `<p class="muted" style="font-size:34px;margin-top:10px">…</p>`. Closing slide: wrap
  the content in `<div class="center">` with blank lines around the Markdown.
- `layout: default` is for all other slides. Exactly one `# h1` title (≤ ~40 characters so it fits on one line).
- `topic:` (optional) is appended to the footer: `<deck title> · <topic>`. Use the agenda item name.
- All content goes inside `<div class="content">`. Inside HTML blocks, write raw HTML
  with no blank lines (a blank line switches back to Markdown parsing).
- Add `reveal` to blocks that should animate in.
- Density: the usable area is about 1720×850px under the title. Aim for ≤ 6 bullets, ≤ 6
  cards, and ≤ 2 stacked component rows per slide. Split the slide rather than shrink text.
- SVG diagrams: follow the SVG rules in components.md. Only whitelisted `font-size`
  values work, and marker ids must be unique in the deck.

## Procedure A – new presentation

1. Ask for anything missing: deck folder name (kebab-case, e.g. `backup-strategi`),
   title, subtitle, audience, approximate number of slides, and the outline or key messages.
2. Create `presentations/<deck>/slides.md` from [assets/slides.md](./assets/slides.md).
   Replace every UPPERCASE placeholder. Keep `theme: ../../themes/sykehuspartner`.
   Deck-wide settings (canvas, dark mode, `routerMode: hash`, fonts, transition) come from the
   theme's `package.json` and must not be repeated.
3. Write the slides (Procedure B, step 2) following the outline: cover → agenda →
   one section per agenda item (with `topic:`) → optional discussion → closing cover.
4. Add npm scripts to the root `package.json`, matching the existing ones:
   `"dev:<deck>": "slidev presentations/<deck>/slides.md"`, plus `build:<deck>` and
   `export:<deck>` with `slidev build` / `slidev export`.
5. Add the deck's Pages URL to the list in `README.md`
   (`https://sp-frank-gjomle.github.io/sp-presentatins/<deck>/`).
6. Verify (Procedure C).

## Procedure B – add or edit slides

1. Read the deck's `slides.md` and identify where the slide goes. Match the existing
   `topic:` values, agenda items and tone. If the slide changes the agenda, update the agenda slide.
2. Pick the component that fits the message:
   - Sequence or process → `flow` (3–5 nodes), `timeline` (3–6 steps), `steps` (vertical), `pipeline` (CI/CD)
   - Parallel points → `card-grid`, or `card` in `columns-2-top` / `columns-3-top`
   - Before/after or comparison → two cards in `columns-2-top` (red/green)
   - Key takeaway → `admonition` (tip/info/warning)
   - Architecture or relations → SVG diagram
   - Proportions → `bars` + `legend`
   - Plain list → `ul` with `reveal` on each `li`
3. Write the slide using the snippets in [components.md](./references/components.md).
4. Verify (Procedure C).

## Procedure C – verify

Run the commands from the repo root. If you can't run terminal commands, give the
exact commands to the user and ask them to run them and report the output.

1. **Build** (catches Markdown, Vue and layout errors):
   ```bash
   npx slidev build presentations/<deck>/slides.md --out /tmp/sp-build/<deck>
   ```
2. **Screenshots** (catches overflow, overlap and wrong sizes). This needs Playwright
   Chromium once per environment, installed without touching `package.json`, the same way as CI:
   ```bash
   node -e "require.resolve('playwright-chromium')" 2>/dev/null || npm install --no-save playwright-chromium
   npx playwright-core install --with-deps chromium
   ```
   Then export the changed slides (`--range` takes e.g. `3`, `3-5` or `2,7`). The output
   folder is wiped first, and `--wait` lets the reveal animations finish:
   ```bash
   npx slidev export presentations/<deck>/slides.md --format png --range <n> --wait 2000 --timeout 120000 --output /tmp/sp-shots/<deck>
   ```
   The files are `/tmp/sp-shots/<deck>/<slideNo>.png`. Open each one and check:
   - nothing is cut off at the bottom or right, and nothing overlaps the footer, page number or logo
   - text is readable, the title is on one line, and there are no stray Markdown artifacts
   - SVG text is the intended size (oversized SVG text means a non-whitelisted `font-size`)
3. Fix any issue and repeat. Then report which slides changed, and remind the user they can
   preview with `npm run dev:<deck>`.
