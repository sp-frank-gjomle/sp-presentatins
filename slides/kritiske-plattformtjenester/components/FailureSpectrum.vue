<script setup lang="ts">
import { useNav } from '@slidev/client'
import { failures } from './failures'

// «Nede» vises alltid. Kategori i (etter «nede») vises når step >= i.
withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()
</script>

<template>
  <div class="spec" :class="{ live: !isPrintMode }">
    <div class="bar" />
    <div class="items" :style="{ gridTemplateColumns: `repeat(${failures.length}, 1fr)` }">
      <div
        v-for="(f, i) in failures"
        :key="f.id"
        class="item"
        :class="[i % 2 === 0 ? 'up' : 'down', f.id === 'down' ? 'bad' : 'warn', { pending: step < i }]"
      >
        <div class="card">
          <div class="head"><span :class="f.icon" class="ic" /> <b>{{ f.title }}</b></div>
          <div v-for="e in f.examples" :key="e" class="ex">{{ e }}</div>
          <small>{{ f.noticed }}</small>
        </div>
        <div class="dot" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.spec {
  position: relative;
  height: 380px;
}
.bar {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 6px;
  margin-top: -3px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--sp-danger), var(--sp-warning) 40%, color-mix(in srgb, var(--sp-warning) 30%, transparent));
}
.bar::before,
.bar::after {
  position: absolute;
  top: 12px;
  font-size: 0.75rem;
  opacity: 0.75;
  white-space: nowrap;
}
.bar::before {
  content: '← Lett å oppdage';
  left: 0;
}
.bar::after {
  content: 'Vanskelig å oppdage →';
  right: 0;
}
.items {
  position: absolute;
  inset: 0 10px;
  display: grid;
  gap: 10px;
}
.item {
  position: relative;
}
.item::before {
  content: '';
  position: absolute;
  left: 50%;
  height: 34px;
  border-left: 2px dashed rgba(255, 255, 255, 0.6);
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
.bad .dot {
  background: var(--sp-danger);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--sp-danger) 30%, transparent);
}
.card {
  position: absolute;
  left: -22%;
  right: -22%;
  padding: 8px 10px;
  border-radius: 10px;
  border-left: 4px solid var(--sp-warning);
  background: color-mix(in srgb, var(--sp-warning) 10%, #0d1117);
  line-height: 1.2;
}
.bad .card {
  border-left-color: var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 14%, #0d1117);
}
.item:first-child .card {
  left: 0;
  right: -44%;
}
.item:last-child .card {
  left: -44%;
  right: 0;
}
.up .card {
  bottom: calc(50% + 34px);
}
.down .card {
  top: calc(50% + 34px);
}
.head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  font-size: 0.95rem;
}
.ic {
  flex-shrink: 0;
  font-size: 1.3rem;
  color: var(--sp-warning);
}
.bad .ic {
  color: var(--sp-danger);
}
.ex {
  font-size: 0.78rem;
  margin: 2px 0;
}
.ex::before {
  content: '• ';
  opacity: 0.6;
}
.card small {
  display: block;
  margin-top: 4px;
  font-size: 0.72rem;
  font-style: italic;
  opacity: 0.75;
}
.pending {
  opacity: 0;
}
.live .item {
  transition: opacity 0.5s;
}
</style>
