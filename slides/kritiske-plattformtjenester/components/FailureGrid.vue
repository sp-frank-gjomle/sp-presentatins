<script setup lang="ts">
import { useNav } from '@slidev/client'
import { failures } from './failures'

// Kategori i vises når step > i. Siste steg viser bunnteksten.
withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()
const items = failures.filter(f => f.id !== 'down')
</script>

<template>
  <div class="fg" :class="{ live: !isPrintMode }">
    <div class="legend">
      <span class="ok"><span class="i-carbon:checkmark-filled" /> Tjenesten svarer</span>
      <span class="bad"><span class="i-carbon:close-filled" /> men noe fungerer ikke</span>
    </div>
    <div class="grid">
      <div v-for="(f, i) in items" :key="f.id" class="cat" :class="{ pending: step <= i }">
        <span :class="f.icon" class="ic" />
        <b>{{ f.title }}</b>
        <ul>
          <li v-for="e in f.examples" :key="e">{{ e }}</li>
        </ul>
        <small>{{ f.noticed }}</small>
      </div>
    </div>
    <div class="caption" :class="{ pending: step <= items.length }">
      Vanskeligere å oppdage, og vanskeligere å feilsøke, enn at tjenesten er nede
    </div>
  </div>
</template>

<style scoped>
.legend {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 1.05rem;
}
.legend > span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.legend .ok {
  color: var(--sp-success);
}
.legend .bad {
  color: var(--sp-danger);
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.cat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  padding: 16px 12px 12px;
  border-radius: 14px;
  border-top: 4px solid var(--sp-primary);
  background: color-mix(in srgb, var(--sp-primary) 10%, transparent);
  line-height: 1.25;
}
.cat b {
  font-size: 1.05rem;
}
.ic {
  font-size: 2.2rem;
  color: var(--sp-primary);
}
.cat ul {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  flex: 1;
}
.cat li {
  font-size: 0.85rem;
  margin: 0 0 6px;
  padding: 6px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
}
.cat small {
  font-size: 0.75rem;
  opacity: 0.8;
  font-style: italic;
}
.caption {
  margin-top: 18px;
  padding: 10px 16px;
  border-radius: 10px;
  border: 2px solid var(--sp-warning);
  color: var(--sp-warning);
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
}
.pending {
  opacity: 0;
}
.live .cat,
.live .caption {
  transition: opacity 0.5s;
}
</style>
