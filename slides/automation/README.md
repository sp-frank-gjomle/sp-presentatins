# Automasjon i drift og vedlikehold

Hva, hvorfor og hvordan vi automatiserer drift med GitLab CI/CD, Ansible, Ansible AWX og
PowerShell DSC. For driftsteknikere og ledere.

## Run the presentation

```bash
cd slides
npm ci
npm run dev -- automation/slides.md
```

Open http://localhost:3030 (presenter view: http://localhost:3030/presenter).

`A` toggles the animations and `P` toggles drawing mode.

## Export

Requires `playwright-chromium` (installed with `npm ci`, then run
`npx playwright-core install chromium` once).

```bash
npx slidev export automation/slides.md --format pdf  --output dist/automation.pdf
npx slidev export automation/slides.md --format pptx --output dist/automation.pptx
```
