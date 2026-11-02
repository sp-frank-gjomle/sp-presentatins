<script setup lang="ts">
import { useNav } from '@slidev/client'
import { apps, core, tools } from './stack'
import CrossBadge from './CrossBadge.vue'

// step 0: stabilt, step 1: grunnmuren tas ut
const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()

const layers = [
  { id: 'apps', name: 'Applikasjoner', hint: 'Det brukerne møter', items: apps },
  { id: 'tools', name: 'Verktøy', hint: 'Endrer og vedlikeholder', items: tools },
  { id: 'core', name: 'Grunnmur', hint: 'Fasit og programvare', items: core },
]

function state(id: string) {
  if (props.step === 0) return 'ok'
  return id === 'apps' ? 'warn' : 'down'
}
</script>

<template>
  <div class="stack" :class="{ live: !isPrintMode }">
    <div v-for="l in layers" :key="l.id" class="layer">
      <div class="lname">
        <b>{{ l.name }}</b>
        <small>{{ l.hint }}</small>
      </div>
      <div class="boxes">
        <div v-for="it in l.items" :key="it.id" class="box" :class="state(l.id)">
          <span class="icon" :class="it.icon" />
          <span class="name">{{ it.name }}</span>
          <CrossBadge v-if="step > 0 && l.id === 'core'" class="x" />
        </div>
      </div>
    </div>
    <div class="caption" :class="step > 0 ? 'bad' : 'good'">
      {{ step === 0 ? 'Alt hviler på grunnmuren' : 'Grunnmuren er borte: applikasjonene kjører, men kan ikke vedlikeholdes' }}
    </div>
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.layer {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  gap: 16px;
}
.lname {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.lname b {
  font-size: 1.1rem;
  color: var(--sp-primary);
}
.lname small {
  opacity: 0.7;
  font-size: 0.8rem;
}
.boxes {
  display: flex;
  gap: 10px;
}
.box {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  padding: 14px 8px;
  border-radius: 10px;
  border: 2px solid var(--sp-success);
  background: color-mix(in srgb, var(--sp-success) 12%, transparent);
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.2;
}
.box.down {
  border-color: var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 22%, transparent);
}
.box.warn {
  border-color: var(--sp-warning);
  background: color-mix(in srgb, var(--sp-warning) 16%, transparent);
}
.icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}
.x {
  position: absolute;
  top: -14px;
  right: -10px;
}
.caption {
  margin-top: 6px;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 1.15rem;
  font-weight: 700;
  text-align: center;
}
.caption.good {
  border: 2px solid var(--sp-success);
  color: var(--sp-success);
}
.caption.bad {
  border: 2px solid var(--sp-danger);
  color: var(--sp-danger);
}
.live .box,
.live .caption {
  transition: background 0.6s, border-color 0.6s, color 0.6s;
}
</style>
