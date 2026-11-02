---
name: slidev-sykehuspartner
description: "Set up Slidev with the Sykehuspartner theme in any repository, and create or edit decks by following the theme documentation shipped inside the npm package. Use when: installing Slidev, adding the Sykehuspartner Slidev theme, creating a new Slidev deck, editing an existing deck, choosing theme layouts, building custom slide components, rendering/exporting slides to PNG/PDF/PPTX, checking slides visually."
argument-hint: "What you need, e.g. 'install Slidev in ./slides', 'create a deck about X in slides/my-talk/' or 'add a slide about Y to slides/my-talk'"
---

# Slidev + Sykehuspartner theme

This skill sets up [Slidev](https://sli.dev) with
`@sp-days-framework/slidev-theme-sykehuspartner` and builds decks that follow
the documentation **shipped inside the installed theme package**.

Use it both to **create new decks** and to **edit existing ones**.

## Key paths

`<slides-dir>` is the folder that contains the Slidev `package.json`. It can be
the repo root or a subfolder such as `slides/`. If the repo already has one,
use it. Otherwise ask the user which folder to use.

| What | Path |
| --- | --- |
| Slidev project | `<slides-dir>/package.json` |
| Decks | `<slides-dir>/<deck>/slides.md` (assets in the same folder) |
| Deck components | `<slides-dir>/<deck>/components/*.vue` (auto-imported in that deck) |
| Deck README | `<slides-dir>/<deck>/README.md` |
| Temp renders | `<slides-dir>/.slides-preview/<deck>/` (git-ignored) |
| Exports (PDF/PPTX) | `<slides-dir>/dist/` (git-ignored) |
| Theme docs (source of truth) | `<slides-dir>/node_modules/@sp-days-framework/slidev-theme-sykehuspartner/docs/` |

---

## Step 1: Detect the existing setup

1. Search the repo for a `package.json` that already lists `@slidev/cli` or
   `@sp-days-framework/slidev-theme-sykehuspartner`. If you find one, use its
   folder as `<slides-dir>`.
2. Check the Node version with `node --version`. It must be **>= 22.12.0**. If
   it's lower, stop and tell the user.
3. If `<slides-dir>` exists but `node_modules` is missing, run `npm ci` in
   `<slides-dir>`.
4. Check if export support is installed: `playwright-chromium` in
   `package.json`. If not, see [Export support](#export-support-optional).
5. Make sure `<slides-dir>/.gitignore` exists with the entries from Step 2.
6. **Editing an existing deck?** Read its `slides.md`, `components/`,
   `README.md` and any `global-top.vue` / `uno.config.ts` first. Keep the
   deck's established style, language and component conventions. Then continue
   at Step 3.

## Step 2: Install Slidev and the theme (new setup only)

If `<slides-dir>/package.json` doesn't exist yet:

```bash
mkdir -p <slides-dir> && cd <slides-dir>
npm init -y
npm pkg set type=module private=true engines.node=">=22.12.0"
```

Install the core dependencies. This is enough to view and present the deck
with `npm run dev`:

```bash
npm install -D @slidev/cli @slidev/types \
  @sp-days-framework/slidev-theme-sykehuspartner \
  @iconify-json/carbon @iconify-json/vscode-icons @iconify-json/simple-icons
```

- The `@iconify-json/*` packages provide `<carbon-*/>`, `<vscode-icons-*/>`
  and `<simple-icons-*/>` icons.
- Pin exact versions for reproducible builds. Remove the `^` in
  `package.json` and commit `package-lock.json`. After that, use `npm ci`
  instead of `npm install`.

Add the scripts:

```bash
npm pkg set scripts.dev="slidev --open false"
npm pkg set scripts.build="slidev build"
npm pkg set scripts.export="slidev export"
```

Create `<slides-dir>/.gitignore` so that temporary renders and exports never
get committed:

```gitignore
node_modules/
.slidev/
.slides-preview/
dist/
*.pdf
*.pptx
slides-export.*
```

### Export support (optional)

Exporting to **PNG, PDF and PPTX** needs `playwright-chromium`, which also
downloads a Chromium browser. Without it you can still view and present the
deck with `npm run dev`, but **the agent can't render slides for visual
inspection**.

If it's missing, explain this to the user and **ask** whether to install it.
Only install it if they say yes:

```bash
npm install -D playwright-chromium
```

If the user says no, skip Step 6 and say in the final summary that the slides
were not inspected visually.

## Step 3: Read the theme docs (mandatory)

The docs folder ships with the installed theme version, so it always matches
what renders. **Read the docs before writing slides. Don't rely on memory or
on older decks.**

Read these files in
`node_modules/@sp-days-framework/slidev-theme-sykehuspartner/docs/`, in this order:

1. `install.mdx`: installation and basic headmatter.
2. `index.mdx`: an overview of all layouts.
3. `advanced-configuration.mdx`: headmatter options, image paths, custom
   styling.
4. The doc for **each layout you plan to use**:
   - `section/`: cover, intro, section, end
   - `content/`: default, center, full
   - `multi-column/`: two-cols, two-cols-header, three-cols, three-cols-header
   - `image/`: image, image-left, image-right
   - `special/`: about-me, fact, quote, statement
5. `code-highlighting.mdx` and `code-block-icons.mdx` if the deck has code.
6. `changelog.mdx` after a theme upgrade, to catch breaking changes.

Rules:

- Use only the layouts and parameters documented there.
- If the docs and your assumptions disagree, follow the docs.
- Slidev built-ins (line highlighting `{2-3}`, `v-click`, Mermaid, icons) also
  work. See https://sli.dev/guide/syntax.

## Step 4: Create or edit the deck

### Brief (new decks)

Before you write a new deck, ask the user about anything that's unclear:

- **Audience**: for example leaders, developers or a mixed audience.
- **Language** of the slides and speaker notes.
- **Length**: number of minutes or slides.
- **Delivery**: presented live in a room, shared over Teams, or sent as a
  PDF/PPTX handout. This decides how much animation and how many click steps
  make sense.

### Headmatter

Create `<slides-dir>/<deck>/slides.md`. Use a kebab-case folder name.

```yaml
---
theme: "@sp-days-framework/slidev-theme-sykehuspartner"
title: <Title>
colorSchema: dark
transition: fade
layout: cover
---

# <Title>
## <Subtitle>
```

A suggested flow (adapt it to the content):

`cover` → optional `about-me` → agenda (`default`) → for each topic, a
`section` slide followed by content slides → `statement`/`center` for a demo →
takeaways (`fact`/`default`) → `end`.

### Design rules

- One idea per slide: at most 6 bullets or about 60 words. Split slides rather
  than shrinking text.
- Start each content slide with a single `# Title`.
- Prefer visuals (Mermaid diagrams, code, images, columns, custom components)
  over long bullet lists.
- Keep code blocks to about 15 lines per slide and use line highlighting.
- Reference images with relative paths, e.g. `![](./diagram.png)` or
  `imageSrc: ./diagram.png`.
- Never write `{{ }}` in slide content. Vue evaluates it as an expression.
- Put speaker notes in an HTML comment `<!-- ... -->` at the end of a slide.
  Mark click steps in the notes with `[click]`.
- Don't modify the theme. If a slide needs custom CSS, add a `<style>` block
  to that slide.

## Step 5: Custom components

You're free to create Vue components for the deck when a layout plus markdown
isn't enough. They can be single-use (for example one diagram) or reusable in
the deck (for example a warning badge).

Put them in `<slides-dir>/<deck>/components/`. Slidev auto-imports them for
that deck, so use them directly in `slides.md` as `<MyComponent />`.

### Dependencies: build with what's already there

Adding npm packages is the **last option**. Build the component from scratch
with what's already available before you consider a new package:

- Vue 3 (`<script setup lang="ts">`), plain HTML, CSS and inline SVG
- UnoCSS utility classes and Iconify icons (`i-carbon:...` classes or
  `<carbon-... />` components)
- Slidev built-ins: `v-click`, `v-motion`, `$clicks`, `$frontmatter`,
  `useNav()` from `@slidev/client`, Mermaid and Shiki

Exceptions and rules:

- Extra `@iconify-json/*` icon packs may be added without asking.
- For **any other package**, ask the user first and explain why it's
  needed. Before asking, check the package:
  - `npm view <pkg>` for the latest version, publish date, maintainers and
    repository
  - weekly downloads, and that it links to a real, active source repository
  - no unexpected `preinstall`/`postinstall` scripts, and no typosquat name
  - `npm audit` after installing
- If the user approves, install the latest version and pin it exactly.

### Conventions

- **Click steps**: give the component a `step` prop and drive it from the
  slide, for example `<MyDiagram :step="$clicks" />`. Set `clicks: N` in the
  slide frontmatter. This keeps the logic in one place and works with
  `--with-clicks` exports.
- **Colours**: use the theme variables (`var(--sp-primary)`,
  `var(--sp-success)`, `var(--sp-warning)`, `var(--sp-danger)`,
  `var(--sp-info)` and so on) instead of hard-coded hex values. Mix tints with
  `color-mix(in srgb, var(--sp-danger) 14%, transparent)`.
- **Data**: put shared data (lists of systems, steps and so on) in a `.ts` file
  next to the components. UnoCSS doesn't scan `.ts` files, so add icon classes
  used there to a `safelist` in `<deck>/uno.config.ts`:

  ```ts
  import { defineConfig } from 'unocss'
  import { items } from './components/data'

  export default defineConfig({
    safelist: items.map(i => i.icon),
  })
  ```

- **Size**: the slide canvas is 980×552 px. Design the component to fit inside
  a content slide under the title.
- **Export**: the component must show a sensible final state in PDF/PPTX/PNG.
  Turn off animations in print mode:

  ```vue
  <script setup lang="ts">
  import { useNav } from '@slidev/client'
  const { isPrintMode } = useNav()
  </script>

  <template>
    <div class="diagram" :class="{ live: !isPrintMode }">...</div>
  </template>
  ```

  Then only add `transition`/`animation` rules under `.live`.

### Animations

Animations are fine, but think about how the slide looks when it's **exported
to PDF/PPTX** (no animation) and when it's **shared over Teams** (low frame
rate):

- Good: fade-in, opacity changes, colour changes, highlights, and elements that
  appear in place. Keep transitions short (at most about 400 ms).
- Avoid: big or fast movement, sliding or flying elements, zooming, and
  looping or continuous animations. They stutter badly over screen sharing.
- Every click step should also make sense as a still image.

### Reusable components and layouts

If you make a component that would be useful in other decks, or the deck needs
a layout the theme doesn't have, suggest in the final summary that the user
opens a PR to
[helse-sorost/sp-days-framework](https://github.com/helse-sorost/sp-days-framework).
Before a component goes upstream, it needs generic text (nothing specific to
this deck), theme colours only, and documented props.

## Step 6: Render the slides and check them visually

This needs [export support](#export-support-optional). Look at the rendered
deck, not only the markdown.

```bash
cd <slides-dir>
rm -rf .slides-preview/<deck>
npx slidev export <deck>/slides.md --format png --scale 1 --output .slides-preview/<deck>
```

- `--scale 1` renders at 980×552, which is enough for inspection and much
  cheaper to view than the default (1960×1104).
- Add `--range 3,7-9` to render only the slides you changed.
- Add `--with-clicks` to capture every click step. Use it for the final pass
  on slides with click steps or components with a `step` prop.
- In a devcontainer or CI with a system Chrome, add
  `--executable-path "$CHROME_PATH"`.
- Always pass `--output`. Without it, Slidev writes files like
  `slides-export.pptx` into the current folder.
- The warning `Failed to patch FloatingVue` is harmless.

**View every rendered PNG** and check for:

- text or code that overflows the slide or gets clipped
- overlapping elements, or empty or broken slides
- the wrong layout for the content
- text that is too small or has low contrast
- missing images or icons, or □ boxes for missing glyphs
- components that look wrong as a still image (missing final state)

Fix problems by splitting slides, trimming text, or changing the layout (don't
shrink fonts). Then export again. Stop after at most 3 rounds and report
anything that's still wrong.

## Step 7: Write the deck README

Create or update `<slides-dir>/<deck>/README.md`. Keep it short. Its purpose is
to make it easy to remember which folder to `cd` into and what to run.

````markdown
# <Title>

<One or two sentences about what the deck is about and who it's for.>

## Run the presentation

```bash
cd <slides-dir>
npm ci
npm run dev -- <deck>/slides.md
```

Open http://localhost:3030 (presenter view: http://localhost:3030/presenter).

## Export

Requires `playwright-chromium` (installed with `npm ci` if it's in
`package.json`).

```bash
npx slidev export <deck>/slides.md --format pdf  --output dist/<deck>.pdf
npx slidev export <deck>/slides.md --format pptx --output dist/<deck>.pptx
```
````

Leave out the Export section if export support isn't installed.

## Step 8: View and export

```bash
cd <slides-dir>
npm run dev -- <deck>/slides.md          # http://localhost:3030 (presenter: /presenter)
npx slidev export <deck>/slides.md --format pdf  --output dist/<deck>.pdf
npx slidev export <deck>/slides.md --format pptx --output dist/<deck>.pptx
npm run build -- <deck>/slides.md        # static SPA in dist/
```

PDF and PPTX exports show each slide in its final state. Add `--with-clicks`
to get one page per click step.

## Final summary

Tell the user:

- the deck path and slide count
- the README path
- any rendering issues that are still unresolved, or that visual inspection
  was skipped because export support isn't installed
- new packages that were added, if any
- components or layouts that could be worth a PR to
  [helse-sorost/sp-days-framework](https://github.com/helse-sorost/sp-days-framework)
- the command to view the deck locally (from Step 8)
