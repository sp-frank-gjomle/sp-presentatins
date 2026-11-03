# Byggteknisk – Automation workshop

Heldagsworkshop (ca. 09–15) for Byggteknisk: VS Code og Git, GitLab og dokumentasjon i Git,
GitLab Runner, ProGet og Ansible – med demoer og en enkel hands-on der deltakerne kloner
demo-repoet, lager en branch og kjører en pipeline som pinger en Windows-testserver.

## Run the presentation

```bash
cd slides
npm ci
npm run dev -- byggteknisk-workshop/slides.md
```

Or from the repo root: `npm run dev:byggteknisk`.

Open http://localhost:3030 (presenter view: http://localhost:3030/presenter).

`A` toggles the animations and `P` toggles drawing mode.

## Export

Requires `playwright-chromium` (installed with `npm ci`, then run
`npx playwright-core install chromium` once).

```bash
npx slidev export byggteknisk-workshop/slides.md --format pdf  --output dist/byggteknisk-workshop.pdf
npx slidev export byggteknisk-workshop/slides.md --format pptx --output dist/byggteknisk-workshop.pptx
```

## Components

- `BigPicture` – the toolchain overview. `focus="vscode|gitlab|runner|proget|ansible"` highlights one part.
- `GitAreas` – working directory → staging → local repo → GitLab, driven by `:step="$clicks"`.
- `VscodeAnatomy` – sketch of the VS Code window with numbered areas, driven by `:step="$clicks"`.
- `SourceControlMock` – sketch of the Source Control view.
- `DemoCard` – demo checklist (`title`, `items`).
