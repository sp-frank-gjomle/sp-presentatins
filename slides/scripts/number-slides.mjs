import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Setter «# Slide nr: N» som første linje i frontmatter for hver slide i decken.
// Bruk: npm run number [-- <deck>/slides.md]
const target = process.argv[2] ?? 'kritiske-plattformtjenester/slides.md'
const file = fileURLToPath(new URL(`../${target}`, import.meta.url))
const lines = readFileSync(file, 'utf8').split('\n')

const out = []
let inFence = false
let inFrontmatter = false
let slide = 0

for (const line of lines) {
  if (/^\s*(```|~~~)/.test(line)) inFence = !inFence

  if (!inFence && line.trim() === '---') {
    inFrontmatter = !inFrontmatter
    out.push(line)
    if (inFrontmatter) {
      slide++
      out.push(`# Slide nr: ${slide}`)
    }
    continue
  }
  if (inFrontmatter && /^#\s*Slide nr:/.test(line)) continue
  out.push(line)
}

writeFileSync(file, out.join('\n'))
console.log(`Nummererte ${slide} slides i ${target}`)
