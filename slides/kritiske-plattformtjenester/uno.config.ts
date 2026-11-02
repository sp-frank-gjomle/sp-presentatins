import { defineConfig } from 'unocss'
import { failures } from './components/failures'
import { apps, core, tools } from './components/stack'

// Ikonene i stack.ts og failures.ts ligger i .ts-filer som UnoCSS ikke skanner
export default defineConfig({
  safelist: [...core, ...tools, ...apps, ...failures].map(i => i.icon),
})
