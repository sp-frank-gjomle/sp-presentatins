# sp-presentatins

Repo for my presentations, built with [Slidev](https://sli.dev/). Each
presentation lives in its own directory under `presentations/`.

## Getting started

Install dependencies:

```bash
npm install
```

Start the "Automasjon i drift og vedlikehold" presentation (converted from HTML):

```bash
npm run dev:automation
```

Add future presentations as separate directories under `presentations/`.

To run another presentation in its own directory, for example
`presentations/my-talk/slides.md`, use:

```bash
npx slidev presentations/my-talk/slides.md
npx slidev build presentations/my-talk/slides.md
npx slidev export presentations/my-talk/slides.md
```

## Build and export

```bash
npm run build:automation
npm run export:automation
```

## Publish to GitHub Pages

`.github/workflows/deploy-pages.yml` builds every `presentations/*/slides.md`
on each push to `main` and deploys them to GitHub Pages, with a landing page
listing all decks:

- https://sp-frank-gjomle.github.io/sp-presentatins/
- https://sp-frank-gjomle.github.io/sp-presentatins/automation/

Enable it once under **Settings → Pages → Source: GitHub Actions**. Decks use
`routerMode: hash` so direct slide links (e.g. `/automation/#/5`) work on Pages.
New decks added under `presentations/` are published automatically.

The workflow also exports each deck to PDF and PPTX with `slidev export`
(using Playwright Chromium, which CI installs with `--no-save`). The landing page
links to the exports, for example
`https://sp-frank-gjomle.github.io/sp-presentatins/automation/automation.pdf`.
They are also attached to each workflow run as the `presentation-exports`
artifact. To export locally, run `npm i -D playwright-chromium` once first.

## Theme and template

All decks use the shared local theme in `themes/sykehuspartner/` (Sykehuspartner design,
based on `sykehuspartner-marp-theme.css`). A deck opts in with
`theme: ../../themes/sykehuspartner` in its headmatter. The theme provides:

- `package.json` holds the deck defaults: 1920x1080 canvas (`canvasWidth`), dark mode,
  `routerMode: hash`, fonts, `lang: no` and the fade transition
- `styles/sykehuspartner.css` holds colors and all components (cards, flow, timeline,
  pipeline, agenda, admonitions, …)
- `slide-bottom.vue` renders the logo, the footer (deck `title`, plus the slide's `topic`) and the page number
- `custom-nav-controls.vue` and `animations.ts` add the animation toggle (key `A`)
- `example.md` is a gallery of every component: `npx slidev themes/sykehuspartner/example.md`

Changes to the theme affect every deck. Put deck-specific CSS in
`presentations/<deck>/style.css`.

## Creating slides with Copilot

- **`slide-designer` agent** (`.github/agents/slide-designer.agent.md`): pick it in the
  Copilot Chat agent picker and describe the deck or slide you want. It can scaffold new
  decks and add or edit slides, and it checks its work with `slidev build` and PNG screenshots.
- **`sykehuspartner-slides` skill** (`.github/skills/sykehuspartner-slides/`) holds the design rules,
  the component catalog and the starter deck. It loads automatically for slide work, or invoke it with
  `/sykehuspartner-slides`.
