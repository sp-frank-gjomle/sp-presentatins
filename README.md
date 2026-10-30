# sp-presentatins

Repo for my presentations, built with [Slidev](https://sli.dev/). Each
presentation lives in its own directory under `presentations/`.

## Getting started

Install dependencies:

```bash
npm install
```

Start the AdmApp Automasjon presentation:

```bash
npm run dev:admapp-automasjon
```

Start the "Automasjon i drift og vedlikehold" presentation (converted from HTML):

```bash
npm run dev:automation
```

Edit `presentations/admapp-automasjon/slides.md` to update its slides. Add future
presentations as separate directories under `presentations/`.
The supplied deck referenced image files not present in this repository, so the
cover uses a Carbon icon and the pipeline slide uses a native Slidev diagram.
Two-column slides use `two-cols-header` with explicit `::left::` and `::right::`
slots so the title spans both columns and their content stays aligned.

To run another presentation in its own directory, for example
`presentations/my-talk/slides.md`, use:

```bash
npx slidev presentations/my-talk/slides.md
npx slidev build presentations/my-talk/slides.md
npx slidev export presentations/my-talk/slides.md
```

## Build and export

```bash
npm run build:admapp-automasjon
npm run export:admapp-automasjon
npm run build:automation
npm run export:automation
```

`presentations/automation/` uses a 1920x1080 canvas (`canvasWidth`) so the
original HTML/CSS carries over 1:1. `style.css` holds the theme and
`slide-bottom.vue` renders the logo, footer and page number.
