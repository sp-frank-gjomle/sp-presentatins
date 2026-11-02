<script setup lang="ts">
import { useNav } from '@slidev/client'
import { apps, impact } from './stack'
import type { Scenario } from './stack'

// step 1: Git nede, step 2: pakkebrønn nede, step 3: begge nede. Kolonner vises etter hvert.
withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()

const cols: { key: Scenario; title: string }[] = [
  { key: 'git', title: 'Git nede' },
  { key: 'pkg', title: 'Pakkebrønn nede' },
  { key: 'both', title: 'Begge nede' },
]
</script>

<template>
  <div class="wrap" :class="{ live: !isPrintMode }">
    <div class="grid">
      <div class="head" />
      <div v-for="(c, i) in cols" :key="c.key" class="head" :class="{ pending: step <= i }">{{ c.title }}</div>

      <template v-for="a in apps" :key="a.id">
        <div class="app">
          <span class="icon" :class="a.icon" />
          <div>
            <div class="name">{{ a.name }}</div>
            <div class="sub">{{ a.sub }}</div>
          </div>
        </div>
        <div v-for="(c, i) in cols" :key="c.key" class="cell" :class="[impact[a.id][c.key].level, { pending: step <= i }]">
          {{ impact[a.id][c.key].text }}
        </div>
      </template>
    </div>
    <div class="legend">
      <span class="dot stop" /> Vedlikehold stopper
      <span class="dot manual" /> Mulig, men krever manuell vei
    </div>
  </div>
</template>

<style scoped>
.lead {
  margin-bottom: 14px;
  font-size: 1rem;
  opacity: 0.85;
}
.grid {
  display: grid;
  grid-template-columns: 220px repeat(3, 1fr);
  gap: 10px;
}
.head {
  font-weight: 800;
  font-size: 1rem;
  color: var(--sp-primary);
  text-align: center;
}
.app {
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon {
  font-size: 1.6rem;
  color: var(--sp-primary);
}
.name {
  font-weight: 800;
  font-size: 1.1rem;
}
.sub {
  font-size: 0.75rem;
  opacity: 0.75;
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 14px 10px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.25;
}
.cell.stop {
  border: 2px solid var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 18%, transparent);
}
.cell.manual {
  border: 2px solid var(--sp-warning);
  background: color-mix(in srgb, var(--sp-warning) 14%, transparent);
}
.pending {
  opacity: 0;
}
.live .head,
.live .cell {
  transition: opacity 0.5s;
}
.legend {
  margin-top: 16px;
  font-size: 0.85rem;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: 8px;
}
.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 12px;
}
.dot.stop {
  background: var(--sp-danger);
}
.dot.manual {
  background: var(--sp-warning);
}
</style>
