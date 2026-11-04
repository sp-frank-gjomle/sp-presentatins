# sp-presentatins

Repo for my presentations, built with [Slidev](https://sli.dev/). Each
presentation lives in its own directory under `slides/`.

## Getting started

Install dependencies:

```bash
npm install --prefix slides
```

Start the "Automasjon i drift og vedlikehold" presentation (runs Slidev from `slides/`):

```bash
npm run dev:automation
```

Start the "Byggteknisk – Automation workshop" presentation:

```bash
npm run dev:byggteknisk
```

The dev server runs with `--remote` so it listens on `0.0.0.0` instead of only `localhost`.
This is needed in GitHub Codespaces: open the forwarded port 3030 from the **Ports** tab
(the `*.app.github.dev` URL), not `http://localhost:3030`.

Add future presentations as separate directories under `slides/`.

To run another presentation in its own directory, for example
`slides/my-talk/slides.md`, use:

```bash
cd slides
npx slidev my-talk/slides.md
npx slidev build my-talk/slides.md
npx slidev export my-talk/slides.md
```

## Build and export

```bash
npm run build:automation
npm run export:automation
```

## Publish to GitHub Pages

`.github/workflows/deploy-pages.yml` builds every `slides/*/slides.md`
(using the dependencies in `slides/package.json`) on each push to `main` and deploys them to GitHub Pages, with a landing page
listing all decks:

- https://sp-frank-gjomle.github.io/sp-presentatins/
- https://sp-frank-gjomle.github.io/sp-presentatins/automation/

Enable it once under **Settings → Pages → Source: GitHub Actions**. Decks use
`routerMode: hash` so direct slide links (e.g. `/automation/#/5`) work on Pages.
New decks added under `slides/` are published automatically.

The workflow also exports each deck to PDF and PPTX with `slidev export`
(using Playwright Chromium from `slides/` devDependencies). The landing page
links to the exports, for example
`https://sp-frank-gjomle.github.io/sp-presentatins/automation/automation.pdf`.
They are also attached to each workflow run as the `presentation-exports`
artifact. Playwright Chromium is a devDependency of `slides/`; to export locally,
run `npx playwright-core install chromium` once from `slides/`.

Pull requests run the same build and export but do not deploy. To test a PR before
merging, open its workflow run and download the `presentation-exports` artifact
(PDF/PPTX) or the `site-preview` artifact. Unzip `site-preview` and serve it with
`npx serve <folder>` to click through the decks.

## Theme and template

All decks use the published `@sp-days-framework/slidev-theme-sykehuspartner` package
(`theme: "@sp-days-framework/slidev-theme-sykehuspartner"` in the headmatter, installed in
`slides/package.json`). Its documentation ships with the package in
`slides/node_modules/@sp-days-framework/slidev-theme-sykehuspartner/docs/`.

The theme provides layouts, logo, colors (`--sp-primary`, `--sp-success`, `--sp-warning`,
`--sp-danger`, `--sp-info`) and typography on a 980x552 canvas. Deck-specific parts live in the
deck folder, for example in `slides/automation/`:

- `style.css` holds the deck's components (cards, flow, timeline, pipeline, agenda,
  admonitions, …), sized for the 980x552 canvas and colored with the theme variables
- `global-top.vue` renders the page number and `slide-bottom.vue` the footer (deck `title`,
  plus the slide's `topic`)
- `custom-nav-controls.vue` and `animations.ts` add the animation toggle (key `A`) and the
  drawing hotkey (key `P`)

`themes/sykehuspartner/` is the earlier local theme (1920x1080, based on
`sykehuspartner-marp-theme.css`). No deck uses it anymore.

## Drawing live on slides

Every deck has Slidev's [drawing](https://sli.dev/features/drawing) feature turned on through
the `drawings:` block in its headmatter. Slidev reads this setting only from the deck, not
from theme defaults, so each new deck needs the block (the starter deck includes it). It works
in `npm run dev:<deck>` and on GitHub Pages.

- Press `P` or click the pen icon in the nav bar (bottom left) to show the drawing toolbar.
  Press `Esc` or `P` to hide it.
- In drawing mode, `S` selects the pen, `L` a line, `A` an arrow, `R` a rectangle and `E` an
  ellipse. `1`–`7` pick a color, `C` clears the slide, and `Ctrl+Z` / `Ctrl+Shift+Z` undo and redo.
  The `A` animation toggle is paused while drawing mode is on.
- A stylus draws even when drawing mode is off.
- Drawings sync live between the presenter view (`/#/presenter/1`) and the audience view.
  On Pages, both windows must be in the same browser. To let the audience follow on their own
  devices, present from the dev server with a password:
  `cd slides && npx slidev <deck>/slides.md --open false --remote <password>`.
- Drawings are not saved (`persist: false`), so they are gone after a reload and are not
  included in the PDF/PPTX exports. `presenterOnly: true` would allow drawing only from the presenter view.

## Creating slides with Copilot

- **`slide-designer` agent** (`.github/agents/slide-designer.agent.md`): pick it in the
  Copilot Chat agent picker and describe the deck or slide you want. It can scaffold new
  decks and add or edit slides, and it checks its work with `slidev build` and PNG screenshots.
- **`slidev-sykehuspartner` skill** (`.github/skills/slidev-sykehuspartner/`) sets up Slidev with
  the Sykehuspartner theme and covers layouts, components and exports. It loads automatically for
  slide work, or invoke it with `/slidev-sykehuspartner`.
