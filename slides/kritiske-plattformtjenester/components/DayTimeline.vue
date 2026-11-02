<script setup lang="ts">
import { useNav } from '@slidev/client'

// Viser hendelser på en tidslinje. Hendelse i vises når step > i.
// Ved mange hendelser (dense) får kortene bredde over to kolonner, siden de ligger vekselvis over og under linjen.
withDefaults(defineProps<{
  items: { time: string; title: string; who: string; severity?: 'good' | 'warn' | 'bad' }[]
  line?: 'green' | 'gradient'
  step?: number
}>(), { step: 0, line: 'gradient' })
const { isPrintMode } = useNav()
</script>

<template>
  <div class="timeline" :class="{ live: !isPrintMode, dense: items.length > 4 }">
    <div class="line" :class="line" />
    <div class="items" :style="{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }">
      <div
        v-for="(it, i) in items"
        :key="i"
        class="item"
        :class="[i % 2 === 0 ? 'up' : 'down', it.severity ?? 'warn', { shown: step > i }]"
      >
        <div class="card">
          <div class="time">{{ it.time }}</div>
          <div class="title">{{ it.title }}</div>
          <div class="who">{{ it.who }}</div>
        </div>
        <div class="dot" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  position: relative;
  height: 340px;
}
.line {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--sp-success), var(--sp-warning) 50%, var(--sp-danger));
}
.line.green {
  background: var(--sp-success);
}
.items {
  position: absolute;
  inset: 0 70px;
  display: grid;
  gap: 10px;
}
.item {
  position: relative;
  opacity: 0;
}
.item.shown {
  opacity: 1;
}
/* Stiplet strek mellom kule og kort */
.item::before {
  content: '';
  position: absolute;
  left: 50%;
  width: 0;
  height: 42px;
  border-left: 2px dashed rgba(255, 255, 255, 0.75);
}
.item.up::before {
  bottom: 50%;
}
.item.down::before {
  top: 50%;
}
.dot {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border-radius: 50%;
  background: var(--sp-warning);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--sp-warning) 30%, transparent);
}
.good .dot {
  background: var(--sp-success);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--sp-success) 30%, transparent);
}
.bad .dot {
  background: var(--sp-danger);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--sp-danger) 30%, transparent);
}
.card {
  position: absolute;
  left: 0;
  right: 0;
  padding: 8px 10px;
  border-radius: 10px;
  border-left: 4px solid var(--sp-warning);
  background: color-mix(in srgb, var(--sp-warning) 10%, transparent);
  line-height: 1.25;
}
.good .card {
  border-left-color: var(--sp-success);
  background: color-mix(in srgb, var(--sp-success) 12%, transparent);
}
.bad .card {
  border-left-color: var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 12%, transparent);
}
.up .card {
  bottom: calc(50% + 42px);
}
.down .card {
  top: calc(50% + 42px);
}
.dense .card {
  left: -20%;
  right: -20%;
}
.live .item {
  transition: opacity 0.5s;
}
.time {
  font-family: monospace;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--sp-primary);
}
.title {
  font-weight: 700;
  font-size: 0.9rem;
  margin: 2px 0;
}
.who {
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>
